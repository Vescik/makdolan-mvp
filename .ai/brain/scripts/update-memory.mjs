#!/usr/bin/env node
/* global console */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const VALID_TYPES = new Set(["implementation", "decision", "sprint"]);
const IMPLEMENTATION_HISTORY_PATH = path.join(".ai", "brain", "memory", "implementation-history.md");
const OPEN_DECISIONS_PATH = path.join(".ai", "brain", "memory", "open-decisions.md");
const SPRINT_SUMMARIES_DIR = path.join(".ai", "brain", "memory", "sprint-summaries");

function usage() {
  return `Usage:
  npm run brain:memory:update -- --type=implementation --title="Short title" --summary="What changed." --validation="git diff --check: PASS"
  npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What is unresolved."
  npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="Closeout summary."

Options:
  --type=implementation|decision|sprint
  --title="Short title"
  --summary="One sentence summary"
  --validation="command: result"      Repeatable for implementation and sprint entries
  --files="path/one,path/two"         Optional comma-separated paths or areas
  --review="review evidence"          Optional review evidence
  --status=Open                       Decision status, defaults to Open
  --dry-run                           Print output without writing files
`;
}

function parseArgs(argv) {
  const options = {
    type: "",
    title: "",
    summary: "",
    validation: [],
    files: [],
    review: "",
    status: "Open",
    dryRun: false,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    const separator = arg.indexOf("=");
    if (!arg.startsWith("--") || separator === -1) {
      throw new Error(`Unsupported argument: ${arg}`);
    }

    const key = arg.slice(2, separator);
    const value = arg.slice(separator + 1).trim();

    if (key === "validation") {
      options.validation.push(value);
      continue;
    }

    if (key === "files") {
      options.files = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    if (Object.hasOwn(options, key)) {
      options[key] = value;
      continue;
    }

    throw new Error(`Unsupported option: --${key}`);
  }

  return options;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || "memory-update";
}

function escapeTableCell(value) {
  return value.replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
}

function asCodeList(items) {
  if (items.length === 0) return "- Files or areas: not specified.";
  return `- Files or areas: ${items.map((item) => `\`${item}\``).join(", ")}.`;
}

function validationLines(items) {
  if (items.length === 0) return "- Validation: not recorded by helper; add before marking done.";
  return items.map((item) => `- Validation: ${item}.`).join("\n");
}

function renderImplementationEntry(options) {
  return `## ${today()}: ${options.title}

- Changed: ${options.summary}
${asCodeList(options.files)}
${validationLines(options.validation)}
- Review: ${options.review || "not recorded by helper; add review evidence when required."}
- Memory note: captured with \`npm run brain:memory:update\`.
`;
}

function renderDecisionRow(options) {
  return `| ${escapeTableCell(options.title)} | ${escapeTableCell(options.status || "Open")} | ${escapeTableCell(options.summary)} |`;
}

function renderSprintSummary(options) {
  const validations = options.validation.length > 0 ? options.validation.map((item) => `- ${item}`).join("\n") : "- Not recorded by helper.";
  const files = options.files.length > 0 ? options.files.map((item) => `- \`${item}\``).join("\n") : "- Not recorded by helper.";

  return `# ${options.title}

Generated: ${new Date().toISOString()}

## Status

Completed

## Goals

- ${options.summary}

## Completed

${files}

## Validation

${validations}

## Decisions

- Decisions made: not recorded by helper.
- Open decisions added or resolved: not recorded by helper.

## Risks And Follow-Ups

- Not recorded by helper.

## Review Evidence

- ${options.review || "Not recorded by helper."}

## Memory Updates

- Implementation history updated: not recorded by helper.
- Open decisions updated: not recorded by helper.
- Knowledge-base files updated: not recorded by helper.

## Notes For Next Session

- Read \`.ai/brain/memory/implementation-history.md\` and \`.ai/brain/memory/open-decisions.md\` before continuing related work.
`;
}

async function appendUnique(filePath, entry, duplicateNeedle) {
  const current = await readFile(filePath, "utf8");
  if (current.includes(duplicateNeedle)) {
    throw new Error(`Refusing to add duplicate memory entry containing: ${duplicateNeedle}`);
  }

  const next = `${current.trimEnd()}\n\n${entry.trimEnd()}\n`;
  await writeFile(filePath, next, "utf8");
}

async function insertDecisionRow(entry) {
  const current = await readFile(OPEN_DECISIONS_PATH, "utf8");
  if (current.includes(entry)) {
    throw new Error("Refusing to add duplicate open decision row.");
  }

  const marker = "\n## Resolved Decisions";
  const markerIndex = current.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find "## Resolved Decisions" marker in ${OPEN_DECISIONS_PATH}`);
  }

  const before = current.slice(0, markerIndex).trimEnd();
  const after = current.slice(markerIndex);
  await writeFile(OPEN_DECISIONS_PATH, `${before}\n${entry}\n${after}`, "utf8");
}

async function writeSprintSummary(options, content) {
  await mkdir(SPRINT_SUMMARIES_DIR, { recursive: true });
  const outPath = path.join(SPRINT_SUMMARIES_DIR, `${today()}-${slugify(options.title)}.md`);

  try {
    await readFile(outPath, "utf8");
    throw new Error(`Refusing to overwrite existing sprint summary: ${outPath}`);
  } catch (error) {
    if (error && error.code !== "ENOENT") throw error;
  }

  await writeFile(outPath, content, "utf8");
  return outPath;
}

function validate(options) {
  if (options.help) return;
  if (!VALID_TYPES.has(options.type)) {
    throw new Error(`Missing or unsupported --type. Use one of: ${Array.from(VALID_TYPES).join(", ")}`);
  }
  if (!options.title.trim()) throw new Error("Missing --title.");
  if (!options.summary.trim()) throw new Error("Missing --summary.");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  validate(options);

  if (options.type === "implementation") {
    const entry = renderImplementationEntry(options);
    if (options.dryRun) {
      console.log(entry);
      return;
    }
    await appendUnique(IMPLEMENTATION_HISTORY_PATH, entry, `## ${today()}: ${options.title}`);
    console.log(IMPLEMENTATION_HISTORY_PATH);
    return;
  }

  if (options.type === "decision") {
    const row = renderDecisionRow(options);
    if (options.dryRun) {
      console.log(row);
      return;
    }
    await insertDecisionRow(row);
    console.log(OPEN_DECISIONS_PATH);
    return;
  }

  const content = renderSprintSummary(options);
  if (options.dryRun) {
    console.log(content);
    return;
  }
  const outPath = await writeSprintSummary(options, content);
  console.log(outPath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
