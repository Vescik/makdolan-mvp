#!/usr/bin/env node
/* global console */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const VALID_TYPES = new Set(["implementation", "decision", "sprint"]);
const MEMORY_STATUSES = new Set(["active", "resolved", "superseded", "archived", "needs-review"]);
const DECISION_STATUSES = new Set(["Open", "Needs owner", "Deferred", "Resolved", "Superseded"]);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const IMPLEMENTATION_HISTORY_PATH = path.join(".ai", "brain", "memory", "implementation-history.md");
const OPEN_DECISIONS_PATH = path.join(".ai", "brain", "memory", "open-decisions.md");
const SPRINT_SUMMARIES_DIR = path.join(".ai", "brain", "memory", "sprint-summaries");

function usage() {
  return `Usage:
  npm run brain:memory:update -- --type=implementation --title="Short title" --summary="What changed." --source-evidence=".ai/brain/planning/report.md" --validation="git diff --check: PASS"
  npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What is unresolved." --source-evidence="AGENTS.md"
  npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="Closeout summary." --source-evidence=".ai/brain/planning/report.md"

Options:
  --type=implementation|decision|sprint
  --title="Short title"
  --summary="One sentence summary"
  --memory-id=memory-...             Optional stable memory ID; generated when omitted
  --status=active                    Memory status for implementation/sprint; decision status for decisions
  --source-evidence="path or command" Repeatable provenance evidence; required for implementation/decision
  --validation="command: result"      Repeatable for implementation and sprint entries
  --files="path/one,path/two"         Optional comma-separated paths or areas
  --review="review evidence"          Optional review evidence
  --supersedes=memory-id|none         Optional supersession source, defaults to none
  --superseded-by=memory-id|none      Optional supersession target, defaults to none
  --created=YYYY-MM-DD                Optional created date, defaults to today
  --last-reviewed=YYYY-MM-DD          Optional review date, defaults to created date
  --review-after=YYYY-MM-DD           Optional next review date, defaults to 30 days after created
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
    sourceEvidence: [],
    memoryId: "",
    review: "",
    status: "",
    supersedes: "none",
    supersededBy: "none",
    created: "",
    lastReviewed: "",
    reviewAfter: "",
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

    if (key === "source-evidence" || key === "source") {
      options.sourceEvidence.push(value);
      continue;
    }

    if (key === "files") {
      options.files = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    switch (key) {
      case "memory-id":
        options.memoryId = value;
        continue;
      case "superseded-by":
        options.supersededBy = value || "none";
        continue;
      case "last-reviewed":
        options.lastReviewed = value;
        continue;
      case "review-after":
        options.reviewAfter = value;
        continue;
      default:
        if (Object.hasOwn(options, key)) {
          options[key] = value;
          continue;
        }
    }

    throw new Error(`Unsupported option: --${key}`);
  }

  return options;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateValue, days) {
  const [year, month, day] = dateValue.split("-").map((part) => Number.parseInt(part, 10));
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
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

function evidenceLines(label, items) {
  if (items.length === 0) return `- ${label}: not recorded by helper.`;
  return items.map((item) => `- ${label}: ${item}.`).join("\n");
}

function validationLines(items) {
  if (items.length === 0) return "- Validation: not recorded by helper; add before marking done.";
  return items.map((item) => `- Validation: ${item}.`).join("\n");
}

function normalizeOptions(options) {
  const created = options.created || today();
  return {
    ...options,
    memoryId: options.memoryId || `memory-${options.type}-${created}-${slugify(options.title)}`,
    status: options.status || (options.type === "decision" ? "Open" : "active"),
    created,
    lastReviewed: options.lastReviewed || created,
    reviewAfter: options.reviewAfter || addDays(created, 30),
    supersedes: options.supersedes || "none",
    supersededBy: options.supersededBy || "none",
  };
}

function renderImplementationEntry(options) {
  return `## ${options.created}: ${options.title}

- Memory ID: \`${options.memoryId}\`.
- Status: \`${options.status}\`.
- Created: ${options.created}.
- Last reviewed: ${options.lastReviewed}.
- Review after: ${options.reviewAfter}.
- Changed: ${options.summary}
${evidenceLines("Source evidence", options.sourceEvidence)}
${asCodeList(options.files)}
${validationLines(options.validation)}
- Review: ${options.review || "not recorded by helper; add review evidence when required."}
- Supersedes: ${options.supersedes}.
- Superseded by: ${options.supersededBy}.
- Memory note: captured with \`npm run brain:memory:update\`.
`;
}

function renderDecisionRow(options) {
  const note = [
    options.summary,
    `Memory ID: ${options.memoryId}`,
    `Created: ${options.created}`,
    `Last reviewed: ${options.lastReviewed}`,
    `Review after: ${options.reviewAfter}`,
    `Source evidence: ${options.sourceEvidence.join("; ")}`,
    `Supersedes: ${options.supersedes}`,
    `Superseded by: ${options.supersededBy}`,
  ].join(" ");

  return `| ${escapeTableCell(options.title)} | ${escapeTableCell(options.status)} | ${escapeTableCell(note)} |`;
}

function renderSprintSummary(options) {
  const validations = options.validation.length > 0 ? options.validation.map((item) => `- ${item}`).join("\n") : "- Not recorded by helper.";
  const files = options.files.length > 0 ? options.files.map((item) => `- \`${item}\``).join("\n") : "- Not recorded by helper.";
  const sourceEvidence = options.sourceEvidence.length > 0 ? options.sourceEvidence.map((item) => `- ${item}`).join("\n") : "- Not recorded by helper.";

  return `# ${options.title}

Generated: ${new Date().toISOString()}
Memory ID: ${options.memoryId}
Status: ${options.status}
Created: ${options.created}
Last reviewed: ${options.lastReviewed}
Review after: ${options.reviewAfter}

## Status

Completed

## Goals

- ${options.summary}

## Completed

${files}

## Validation

${validations}

## Source Evidence

${sourceEvidence}

## Decisions

- Decisions made: not recorded by helper.
- Open decisions added or resolved: not recorded by helper.

## Risks And Follow-Ups

- Not recorded by helper.

## Review Evidence

- ${options.review || "Not recorded by helper."}

## Supersession

- Supersedes: ${options.supersedes}.
- Superseded by: ${options.supersededBy}.

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
  const outPath = path.join(SPRINT_SUMMARIES_DIR, `${options.created}-${slugify(options.title)}.md`);

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
  if (!/^memory-[a-z0-9-]+$/.test(options.memoryId)) {
    throw new Error("Invalid --memory-id. Use lowercase letters, numbers, and hyphens, starting with memory-.");
  }

  for (const [field, value] of [
    ["--created", options.created],
    ["--last-reviewed", options.lastReviewed],
    ["--review-after", options.reviewAfter],
  ]) {
    if (!DATE_PATTERN.test(value)) throw new Error(`Invalid ${field}. Expected YYYY-MM-DD.`);
  }

  if (options.type === "decision") {
    if (!DECISION_STATUSES.has(options.status)) {
      throw new Error(`Invalid decision --status. Use one of: ${Array.from(DECISION_STATUSES).join(", ")}`);
    }
  } else if (!MEMORY_STATUSES.has(options.status)) {
    throw new Error(`Invalid memory --status. Use one of: ${Array.from(MEMORY_STATUSES).join(", ")}`);
  }

  if ((options.type === "implementation" || options.type === "decision") && options.sourceEvidence.length === 0) {
    throw new Error("--source-evidence is required for implementation and decision memory entries.");
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const normalizedOptions = normalizeOptions(options);
  validate(normalizedOptions);

  if (normalizedOptions.type === "implementation") {
    const entry = renderImplementationEntry(normalizedOptions);
    if (normalizedOptions.dryRun) {
      console.log(entry);
      return;
    }
    await appendUnique(IMPLEMENTATION_HISTORY_PATH, entry, `## ${normalizedOptions.created}: ${normalizedOptions.title}`);
    console.log(IMPLEMENTATION_HISTORY_PATH);
    return;
  }

  if (normalizedOptions.type === "decision") {
    const row = renderDecisionRow(normalizedOptions);
    if (normalizedOptions.dryRun) {
      console.log(row);
      return;
    }
    await insertDecisionRow(row);
    console.log(OPEN_DECISIONS_PATH);
    return;
  }

  const content = renderSprintSummary(normalizedOptions);
  if (normalizedOptions.dryRun) {
    console.log(content);
    return;
  }
  const outPath = await writeSprintSummary(normalizedOptions, content);
  console.log(outPath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
