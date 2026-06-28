#!/usr/bin/env node
/* global console */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const REQUIRED_METADATA_FILES = [
  ".ai/brain/agent-start.md",
  ".ai/brain/README.md",
  ".ai/brain/adapters/README.md",
  ".ai/brain/adapters/codex.md",
  ".ai/brain/adapters/generic-agent.md",
  ".ai/brain/certification/CERTIFICATION_BACKLOG.md",
  ".ai/brain/certification/EPIC1_CERTIFICATION_REPORT.md",
  ".ai/brain/certification/EPIC2_READINESS_CERTIFICATE.md",
  ".ai/brain/knowledge/agent-session-start.md",
  ".ai/brain/knowledge/architecture-principles.md",
  ".ai/brain/knowledge/known-risks.md",
  ".ai/brain/knowledge/module-catalog.md",
  ".ai/brain/knowledge/product-decisions.md",
  ".ai/brain/knowledge/project-overview.md",
  ".ai/brain/knowledge/sdlc-flow.md",
  ".ai/brain/knowledge/testing-map.md",
  ".ai/brain/governance/source-of-truth-map.md",
  ".ai/brain/governance/artifact-lifecycle-policy.md",
  ".ai/brain/governance/review-finding-registry.md",
  ".ai/brain/governance/security-preflight.md",
  ".ai/brain/governance/automation-activation-validation.md",
  ".ai/brain/governance/health-checks.md",
  ".ai/brain/governance/retrieval-contracts.md",
  ".ai/brain/governance/memory-integrity-model.md",
  ".ai/brain/governance/developer-onboarding.md",
  ".ai/brain/governance/validation-profiles.md",
];

const TEMPLATE_METADATA_ROOT = ".ai/brain/templates";

const REQUIRED_METADATA_FIELDS = [
  "id",
  "class",
  "owner",
  "status",
  "authority",
  "domain",
  "created",
  "last_reviewed",
  "review_after",
];

const TEXT_SCAN_ROOTS = [
  ".ai/brain/adapters",
  ".ai/brain/certification",
  ".ai/brain/context-packs",
  ".ai/brain/governance",
  ".ai/brain/index",
  ".ai/brain/knowledge",
  ".ai/brain/memory",
  ".ai/brain/planning",
  ".ai/brain/reviews",
  "docs",
  "project-context",
  "knowledge-base",
];

const TEXT_SCAN_FILES = [".ai/brain/agent-start.md", "AGENTS.md", "README.md"];
const TEXT_EXTENSIONS = new Set([".md", ".mdx", ".json", ".txt", ".yml", ".yaml"]);
const REFERENCE_SCAN_ROOTS = [
  ".ai/brain/adapters",
  ".ai/brain/certification",
  ".ai/brain/governance",
  ".ai/brain/knowledge",
  ".ai/brain/templates",
];
const REFERENCE_SCAN_FILES = [
  ".ai/brain/agent-start.md",
  ".ai/brain/README.md",
  ".ai/brain/scripts/README.md",
  "AGENTS.md",
  "README.md",
];
const REFERENCE_PREFIXES = [
  ".ai/brain/",
  "docs/",
  "project-context/",
  "knowledge-base/",
  "scripts/",
  ".github/",
];
const REFERENCE_EXACT_PATHS = new Set(["AGENTS.md", "README.md", "package.json"]);

const SECRET_PATTERNS = [
  { name: "OpenAI style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g },
  { name: "GitHub classic token", pattern: /\bghp_[A-Za-z0-9_]{20,}\b/g },
  { name: "GitHub fine-grained token", pattern: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  { name: "AWS access key", pattern: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: "Slack bot token", pattern: /\bxoxb-[A-Za-z0-9-]{20,}\b/g },
  { name: "Private key header", pattern: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
];

const REGISTRY_PATH = ".ai/brain/governance/review-finding-registry.md";
const VALID_STATUSES = new Set(["proposed", "accepted", "in_progress", "implemented", "deferred", "rejected", "superseded"]);
const VALID_SEVERITIES = new Set(["Critical", "High", "Medium", "Low"]);
const IMPLEMENTATION_HISTORY_PATH = ".ai/brain/memory/implementation-history.md";
const OPEN_DECISIONS_PATH = ".ai/brain/memory/open-decisions.md";
const MEMORY_ENFORCEMENT_BOUNDARY_TITLE = "CERT-05 memory enforcement hardening";
const MEMORY_STATUSES = new Set(["active", "resolved", "superseded", "archived", "needs-review"]);
const DECISION_STATUSES = new Set(["Open", "Needs owner", "Deferred", "Resolved", "Superseded"]);
const REQUIRED_IMPLEMENTATION_MEMORY_FIELDS = [
  "Memory ID",
  "Status",
  "Created",
  "Last reviewed",
  "Review after",
  "Source evidence",
  "Validation",
  "Review",
  "Supersedes",
  "Superseded by",
];

function usage() {
  return `Usage:
  npm run brain:health
  npm run brain:health -- --as-of=YYYY-MM-DD

Options:
  --as-of=YYYY-MM-DD  Evaluate generated artifact freshness as of this calendar date.
  --help              Show this help text.`;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseAsOfDate(value) {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(`Invalid --as-of value "${value}". Expected YYYY-MM-DD.`);
  }

  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime())
    || date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) {
    throw new Error(`Invalid --as-of value "${value}". Expected a real calendar date.`);
  }

  return date;
}

function parseArgs(args) {
  const options = {
    asOfDate: startOfLocalDay(new Date()),
    help: false,
  };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg.startsWith("--as-of=")) {
      options.asOfDate = parseAsOfDate(arg.slice("--as-of=".length));
      continue;
    }

    throw new Error(`Unknown option "${arg}".\n${usage()}`);
  }

  return options;
}

function formatDate(date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function daysBetween(dateA, dateB) {
  return Math.floor((dateA.getTime() - dateB.getTime()) / 86400000);
}

async function readText(relativePath) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

async function pathExists(relativePath) {
  try {
    await stat(path.join(ROOT, relativePath));
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function absolutePathExists(absolutePath) {
  try {
    await stat(absolutePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function walk(relativePath) {
  const absolute = path.join(ROOT, relativePath);
  const entries = await readdir(absolute, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const child = toPosix(path.join(relativePath, entry.name));
    if (entry.isDirectory()) {
      files.push(...await walk(child));
      continue;
    }
    if (entry.isFile()) {
      files.push(child);
    }
  }

  return files;
}

function parseMetadata(text) {
  const lines = text.split(/\r?\n/);
  const metadataIndex = lines.findIndex((line) => line.trim() === "Metadata:");
  if (metadataIndex === -1) return null;

  const fields = new Map();
  for (let index = metadataIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    if (line.startsWith("## ")) break;
    const match = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (!match) continue;
    const field = match[1].trim();
    const value = match[2].trim();
    if (field !== "Field" && field !== "---") {
      fields.set(field.replace(/`/g, ""), value);
    }
  }

  return fields;
}

async function checkMetadata() {
  const errors = [];
  const warnings = [];

  for (const file of REQUIRED_METADATA_FILES) {
    if (!await pathExists(file)) {
      errors.push(`${file}: required canonical metadata file is missing.`);
      continue;
    }

    const metadata = parseMetadata(await readText(file));
    if (!metadata) {
      errors.push(`${file}: missing Metadata table.`);
      continue;
    }

    for (const field of REQUIRED_METADATA_FIELDS) {
      if (!metadata.has(field) || metadata.get(field) === "") {
        errors.push(`${file}: missing metadata field ${field}.`);
      }
    }

    if (metadata.get("status") && !["active", "draft", "superseded", "archived"].includes(metadata.get("status").replace(/`/g, ""))) {
      warnings.push(`${file}: status is not one of active, draft, superseded, archived.`);
    }
  }

  return { errors, warnings };
}

async function checkTemplateMetadata() {
  const errors = [];
  const warnings = [];

  if (!await pathExists(TEMPLATE_METADATA_ROOT)) {
    errors.push(`${TEMPLATE_METADATA_ROOT}: template directory is missing.`);
    return { errors, warnings };
  }

  const templateFiles = (await walk(TEMPLATE_METADATA_ROOT))
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  if (templateFiles.length === 0) {
    errors.push(`${TEMPLATE_METADATA_ROOT}: no Markdown templates found.`);
    return { errors, warnings };
  }

  for (const file of templateFiles) {
    const metadata = parseMetadata(await readText(file));
    if (!metadata) {
      errors.push(`${file}: missing Metadata table.`);
      continue;
    }

    for (const field of REQUIRED_METADATA_FIELDS) {
      if (!metadata.has(field) || metadata.get(field) === "") {
        errors.push(`${file}: missing metadata field ${field}.`);
      }
    }

    if (metadata.get("class")?.replace(/`/g, "") !== "template") {
      errors.push(`${file}: template metadata class must be template.`);
    }

    if (metadata.get("status")?.replace(/`/g, "") !== "active") {
      warnings.push(`${file}: template status is not active.`);
    }
  }

  return { errors, warnings };
}

function parseRegistryRows(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| `MGA-"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

async function checkRegistry() {
  const errors = [];
  const warnings = [];
  const text = await readText(REGISTRY_PATH);
  const rows = parseRegistryRows(text);
  const seen = new Set();

  if (rows.length === 0) {
    errors.push(`${REGISTRY_PATH}: no MGA finding rows found.`);
  }

  for (const row of rows) {
    const [idCell, severity, status, source, finding, owner, dependencies, sprint, evidence] = row;
    const id = idCell.replace(/`/g, "");

    if (!/^MGA-\d{2}$/.test(id)) errors.push(`${REGISTRY_PATH}: invalid finding ID ${id}.`);
    if (seen.has(id)) errors.push(`${REGISTRY_PATH}: duplicate finding ID ${id}.`);
    seen.add(id);

    if (!VALID_SEVERITIES.has(severity)) errors.push(`${id}: invalid severity ${severity}.`);
    if (!VALID_STATUSES.has(status)) errors.push(`${id}: invalid status ${status}.`);
    if (!source) errors.push(`${id}: missing source review.`);
    if (!finding) errors.push(`${id}: missing finding text.`);
    if (!owner) errors.push(`${id}: missing owner/area.`);
    if (!dependencies) errors.push(`${id}: missing dependencies field.`);
    if (!sprint) errors.push(`${id}: missing recommended sprint.`);
    if (!evidence) errors.push(`${id}: missing evidence/resolution.`);

    if ((status === "accepted" || status === "implemented") && evidence.toLowerCase().includes("backlog item") && status === "implemented") {
      warnings.push(`${id}: implemented finding still reads like backlog-only evidence.`);
    }
  }

  return { errors, warnings };
}

function cleanFieldValue(value) {
  return value
    .trim()
    .replace(/^`|`$/g, "")
    .replace(/\.$/, "")
    .replace(/^`|`$/g, "")
    .trim();
}

function firstListFieldValue(body, field) {
  const pattern = new RegExp(`^- ${field}:\\s*(.+)$`, "m");
  const match = body.match(pattern);
  if (!match) return null;
  return cleanFieldValue(match[1]);
}

function parseImplementationMemoryEntries(text) {
  const headingPattern = /^## (\d{4}-\d{2}-\d{2}): (.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingPattern.exec(text)) !== null) {
    headings.push({
      index: match.index,
      date: match[1],
      title: match[2],
    });
  }

  return headings.map((heading, index) => {
    const nextHeading = headings[index + 1];
    return {
      ...heading,
      body: text.slice(heading.index, nextHeading ? nextHeading.index : text.length),
    };
  });
}

function parseOpenDecisionRows(text) {
  const currentSection = text.split("\n## Resolved Decisions")[0] || text;
  return currentSection
    .split(/\r?\n/)
    .filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Decision | Status"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

async function checkMemoryIntegrity() {
  const errors = [];
  const warnings = [];

  if (!await pathExists(IMPLEMENTATION_HISTORY_PATH)) {
    errors.push(`${IMPLEMENTATION_HISTORY_PATH}: implementation history file is missing.`);
  } else {
    const entries = parseImplementationMemoryEntries(await readText(IMPLEMENTATION_HISTORY_PATH));
    const boundaryIndex = entries.findIndex((entry) => entry.title === MEMORY_ENFORCEMENT_BOUNDARY_TITLE);

    if (boundaryIndex === -1) {
      warnings.push(`${IMPLEMENTATION_HISTORY_PATH}: CERT-05 memory enforcement boundary is not present; historical entries are treated as grandfathered.`);
    } else {
      for (const entry of entries.slice(boundaryIndex)) {
        for (const field of REQUIRED_IMPLEMENTATION_MEMORY_FIELDS) {
          if (!firstListFieldValue(entry.body, field)) {
            errors.push(`${IMPLEMENTATION_HISTORY_PATH}: "${entry.date}: ${entry.title}" is missing ${field}.`);
          }
        }

        const memoryId = firstListFieldValue(entry.body, "Memory ID");
        if (memoryId && !/^memory-[a-z0-9-]+$/.test(memoryId)) {
          errors.push(`${IMPLEMENTATION_HISTORY_PATH}: "${entry.date}: ${entry.title}" has invalid Memory ID ${memoryId}.`);
        }

        const status = firstListFieldValue(entry.body, "Status");
        if (status && !MEMORY_STATUSES.has(status)) {
          errors.push(`${IMPLEMENTATION_HISTORY_PATH}: "${entry.date}: ${entry.title}" has invalid Status ${status}.`);
        }

        for (const field of ["Created", "Last reviewed", "Review after"]) {
          const value = firstListFieldValue(entry.body, field);
          if (value && !DATE_PATTERN.test(value)) {
            errors.push(`${IMPLEMENTATION_HISTORY_PATH}: "${entry.date}: ${entry.title}" has invalid ${field} date ${value}.`);
          }
        }

        for (const field of ["Source evidence", "Validation"]) {
          const value = firstListFieldValue(entry.body, field);
          if (value && /not recorded/i.test(value)) {
            errors.push(`${IMPLEMENTATION_HISTORY_PATH}: "${entry.date}: ${entry.title}" has placeholder ${field}.`);
          }
        }
      }
    }
  }

  if (!await pathExists(OPEN_DECISIONS_PATH)) {
    errors.push(`${OPEN_DECISIONS_PATH}: open decisions file is missing.`);
  } else {
    const rows = parseOpenDecisionRows(await readText(OPEN_DECISIONS_PATH));
    for (const row of rows) {
      const [decision, status] = row;
      if (!decision || !status) {
        errors.push(`${OPEN_DECISIONS_PATH}: malformed open decision row.`);
        continue;
      }
      if (!DECISION_STATUSES.has(status)) {
        errors.push(`${OPEN_DECISIONS_PATH}: "${decision}" has invalid lifecycle status ${status}.`);
      }
    }
  }

  return { errors, warnings };
}

function filenameDate(filePath) {
  const base = path.basename(filePath);
  const match = base.match(/^(\d{4}-\d{2}-\d{2})(?:T[^-]+)?/);
  if (!match) return null;
  return parseAsOfDate(match[1]);
}

async function checkFreshness(asOfDate) {
  const errors = [];
  const warnings = [];

  for (const file of [
    ".ai/brain/index/repo-map.json",
    ".ai/brain/index/file-catalog.md",
    ".ai/brain/index/module-map.md",
  ]) {
    if (!await pathExists(file)) {
      errors.push(`${file}: generated index output is missing.`);
    }
  }

  const contextPacks = await walk(".ai/brain/context-packs");
  for (const file of contextPacks.filter((item) => item.endsWith(".md") && item !== ".ai/brain/context-packs/README.md")) {
    const date = filenameDate(file);
    if (!date) {
      warnings.push(`${file}: cannot infer generated date from filename.`);
      continue;
    }
    const age = daysBetween(asOfDate, date);
    if (age > 30) warnings.push(`${file}: context pack is expired by policy (${age} days old).`);
    else if (age > 14) warnings.push(`${file}: context pack is stale by policy (${age} days old).`);
  }

  const planningReports = await walk(".ai/brain/planning");
  for (const file of planningReports.filter((item) => item.endsWith(".md") && item !== ".ai/brain/planning/README.md")) {
    const text = await readText(file);
    if (!/Date:|Generated:|created/i.test(text.slice(0, 800))) {
      warnings.push(`${file}: planning report has no obvious date/generated metadata near the top.`);
    }
  }

  return { errors, warnings };
}

async function textFilesToScan() {
  const files = [];
  for (const root of TEXT_SCAN_ROOTS) {
    if (!await pathExists(root)) continue;
    files.push(...await walk(root));
  }
  for (const file of TEXT_SCAN_FILES) {
    if (await pathExists(file)) files.push(file);
  }
  return files
    .filter((file) => TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .filter((file) => !file.includes("/node_modules/"))
    .sort((a, b) => a.localeCompare(b));
}

async function referenceFilesToScan() {
  const files = new Set();

  for (const root of REFERENCE_SCAN_ROOTS) {
    if (!await pathExists(root)) continue;
    for (const file of await walk(root)) files.add(file);
  }

  for (const file of REFERENCE_SCAN_FILES) {
    if (await pathExists(file)) files.add(file);
  }

  return Array.from(files)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function stripCodeFences(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");
}

function stripReferenceDecorators(value) {
  return value
    .trim()
    .replace(/^<|>$/g, "")
    .replace(/[),.;:]+$/g, "");
}

function withoutFragmentOrQuery(value) {
  return value.split("#")[0].split("?")[0].trim();
}

function isExternalReference(value) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");
}

function isKnownRootReference(value) {
  return REFERENCE_PREFIXES.some((prefix) => value.startsWith(prefix)) || REFERENCE_EXACT_PATHS.has(value);
}

function shouldSkipReference(value) {
  return (
    value === ""
    || value.startsWith("#")
    || isExternalReference(value)
    || value.includes("*")
    || value.includes("{")
    || value.includes("}")
    || value.includes("[")
    || value.includes("]")
    || /\s/.test(value)
  );
}

function normalizeReference(value) {
  return stripReferenceDecorators(withoutFragmentOrQuery(value));
}

function referenceToAbsolutePath(sourceFile, rawReference) {
  const reference = normalizeReference(rawReference);
  if (shouldSkipReference(reference)) return null;

  if (isKnownRootReference(reference)) {
    return {
      display: reference,
      absolutePath: path.resolve(ROOT, reference),
    };
  }

  if (reference.startsWith("./") || reference.startsWith("../")) {
    const sourceDir = path.dirname(path.resolve(ROOT, sourceFile));
    const absolutePath = path.resolve(sourceDir, reference);
    const relativeToRoot = path.relative(ROOT, absolutePath);
    if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) return null;
    return {
      display: toPosix(relativeToRoot),
      absolutePath,
    };
  }

  return null;
}

function markdownLinkReferences(text) {
  const references = [];
  const linkPattern = /!?\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    references.push(match[1]);
  }

  return references;
}

function inlineCodeReferences(text) {
  const references = [];
  const codePattern = /`([^`\n]+)`/g;
  let match;

  while ((match = codePattern.exec(text)) !== null) {
    const candidate = match[1].trim();
    if (isKnownRootReference(normalizeReference(candidate))) {
      references.push(candidate);
    }
  }

  return references;
}

async function checkLocalReferences() {
  const errors = [];
  const warnings = [];
  const files = await referenceFilesToScan();

  for (const file of files) {
    const text = stripCodeFences(await readText(file));
    const references = [
      ...markdownLinkReferences(text),
      ...inlineCodeReferences(text),
    ];
    const seen = new Set();

    for (const rawReference of references) {
      const resolved = referenceToAbsolutePath(file, rawReference);
      if (!resolved) continue;

      const dedupeKey = `${file}:${resolved.display}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      if (!await absolutePathExists(resolved.absolutePath)) {
        errors.push(`${file}: local reference is missing: ${resolved.display}.`);
      }
    }
  }

  return { errors, warnings, scannedFiles: files.length };
}

async function checkSecrets() {
  const errors = [];
  const warnings = [];
  const files = await textFilesToScan();

  for (const file of files) {
    const text = await readText(file);
    for (const { name, pattern } of SECRET_PATTERNS) {
      pattern.lastIndex = 0;
      const matches = [...text.matchAll(pattern)];
      if (matches.length > 0) {
        errors.push(`${file}: possible ${name} detected (${matches.length} match${matches.length === 1 ? "" : "es"}).`);
      }
    }
  }

  return { errors, warnings, scannedFiles: files.length };
}

function printSection(title, result) {
  console.log(`\n==> ${title}`);
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log("PASS");
    return;
  }

  for (const error of result.errors) console.log(`ERROR: ${error}`);
  for (const warning of result.warnings) console.log(`WARN: ${warning}`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  console.log("AI Brain health check");
  console.log(`Root: ${ROOT}`);
  console.log(`As of: ${formatDate(options.asOfDate)}`);
  console.log("Mode: report-only; no files are modified.");

  const metadata = await checkMetadata();
  const templateMetadata = await checkTemplateMetadata();
  const registry = await checkRegistry();
  const memoryIntegrity = await checkMemoryIntegrity();
  const freshness = await checkFreshness(options.asOfDate);
  const localReferences = await checkLocalReferences();
  const secrets = await checkSecrets();

  printSection("metadata", metadata);
  printSection("template metadata", templateMetadata);
  printSection("review finding registry", registry);
  printSection("memory integrity", memoryIntegrity);
  printSection("generated artifact freshness", freshness);
  printSection("local references", localReferences);
  console.log(`Scanned files for local references: ${localReferences.scannedFiles}`);
  printSection("generated text secret scan", secrets);
  console.log(`Scanned text files for secrets: ${secrets.scannedFiles}`);

  const errorCount =
    metadata.errors.length
    + templateMetadata.errors.length
    + registry.errors.length
    + memoryIntegrity.errors.length
    + freshness.errors.length
    + localReferences.errors.length
    + secrets.errors.length;
  const warningCount =
    metadata.warnings.length
    + templateMetadata.warnings.length
    + registry.warnings.length
    + memoryIntegrity.warnings.length
    + freshness.warnings.length
    + localReferences.warnings.length
    + secrets.warnings.length;

  console.log("\n==> Summary");
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${warningCount}`);

  if (errorCount > 0) {
    console.error("RESULT: FAIL");
    process.exit(1);
  }

  console.log(warningCount > 0 ? "RESULT: PASS WITH WARNINGS" : "RESULT: PASS");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
