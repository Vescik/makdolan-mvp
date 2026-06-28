#!/usr/bin/env node
/* global console */
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const REQUIRED_FIELDS = [
  "Owner",
  "Purpose",
  "Trigger",
  "Cadence",
  "Sandbox",
  "Network",
  "Secrets",
  "Output path",
  "Write scope",
  "Validation",
  "Stop conditions",
  "Rollback/disable path",
  "First-run review",
  "Data exposure",
  "Approval record",
];

const EMPTY_VALUES = new Set(["", "none", "n/a", "na", "tbd", "todo", "unknown"]);

function usage() {
  return `Usage:
  npm run brain:automation:check -- path/to/automation-activation-record.md
  npm run brain:automation:check -- --file=path/to/automation-activation-record.md

Options:
  --file=PATH  Markdown activation record to validate.
  --help       Show this help text.

Mode:
  Report-only. This command does not enable automation or modify files.`;
}

function normalizeField(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function cleanCell(value) {
  return value
    .replace(/`/g, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isEmpty(value) {
  return EMPTY_VALUES.has(cleanCell(value).toLowerCase());
}

function parseArgs(args) {
  const options = {
    file: "",
    help: false,
  };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg.startsWith("--file=")) {
      options.file = arg.slice("--file=".length).trim();
      continue;
    }

    if (!arg.startsWith("--") && !options.file) {
      options.file = arg;
      continue;
    }

    throw new Error(`Unsupported argument: ${arg}`);
  }

  return options;
}

function parseChecklistTable(text) {
  const fields = new Map();
  const aliases = new Map(REQUIRED_FIELDS.map((field) => [normalizeField(field), field]));

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith("|")) continue;
    if (/^\|\s*-+/.test(line)) continue;

    const cells = line.split("|").slice(1, -1).map(cleanCell);
    if (cells.length < 2) continue;

    const [rawField, ...answerCells] = cells;
    const field = aliases.get(normalizeField(rawField));
    if (!field) continue;
    if (normalizeField(rawField) === "field") continue;

    fields.set(field, answerCells.join(" | ").trim());
  }

  return fields;
}

function containsAny(value, tokens) {
  const lower = value.toLowerCase();
  return tokens.some((token) => lower.includes(token));
}

function validateFields(fields) {
  const errors = [];
  const warnings = [];

  for (const field of REQUIRED_FIELDS) {
    if (!fields.has(field)) {
      errors.push(`Missing required checklist field: ${field}.`);
      continue;
    }

    if (isEmpty(fields.get(field))) {
      errors.push(`${field}: answer is empty or placeholder.`);
    }
  }

  const owner = fields.get("Owner") || "";
  if (containsAny(owner, ["codex", "agent only", "automation"])) {
    errors.push("Owner: must name a human owner or accountable human role, not only an agent or automation.");
  }

  const sandbox = fields.get("Sandbox") || "";
  if (!containsAny(sandbox, ["read-only", "workspace-write"])) {
    errors.push("Sandbox: must specify read-only or workspace-write.");
  }
  if (containsAny(sandbox, ["danger-full-access", "full access"])) {
    errors.push("Sandbox: danger-full-access is not allowed for certification-safe automation activation.");
  }

  const network = fields.get("Network") || "";
  if (!containsAny(network, ["off", "disabled"]) && !containsAny(network, ["approved", "explicit"])) {
    errors.push("Network: must be off/disabled or include explicit approval wording.");
  }

  const secrets = fields.get("Secrets") || "";
  if (!containsAny(secrets, ["none", "not required", "no secrets"])) {
    errors.push("Secrets: activation validation is blocked unless required secrets are explicitly none.");
  }

  const outputPath = fields.get("Output path") || "";
  const writeScope = fields.get("Write scope") || "";
  const isReadOnly = containsAny(writeScope, ["read-only", "read only"]);
  const isReportOnly = containsAny(writeScope, ["report-only", "report only"]);
  const hasApprovedMutation = containsAny(writeScope, ["explicit approval", "approved mutation"]);

  if (!isReadOnly && !isReportOnly && !hasApprovedMutation) {
    errors.push("Write scope: must be read-only, report-only, or explicitly approved mutation.");
  }

  if (hasApprovedMutation) {
    warnings.push("Write scope: explicit mutation approval requires human review outside this report-only validator.");
  }

  if (!isReadOnly) {
    if (
      !outputPath.startsWith(".ai/brain/context-packs/")
      && !outputPath.startsWith(".ai/brain/planning/")
      && !outputPath.startsWith(".ai/brain/reviews/")
    ) {
      errors.push("Output path: report-writing automation must use an approved AI Brain report path.");
    }
  }

  const validation = fields.get("Validation") || "";
  if (!containsAny(validation, ["git status", "git diff", "brain:health", "brain:smoke", "diff-gate", "typecheck", "test", "lint"])) {
    warnings.push("Validation: no known local validation command is named.");
  }

  const stopConditions = fields.get("Stop conditions") || "";
  if (!containsAny(stopConditions, ["secrets", "credentials", "production", "destructive", "approval", "network"])) {
    errors.push("Stop conditions: must include safety stops for secrets, credentials, production/destructive work, network, or approval needs.");
  }

  const rollback = fields.get("Rollback/disable path") || "";
  if (!containsAny(rollback, ["disable", "rollback", "delete scheduled", "remove hook", "archive"])) {
    errors.push("Rollback/disable path: must describe how to disable or roll back the automation.");
  }

  const firstRunReview = fields.get("First-run review") || "";
  if (!containsAny(firstRunReview, ["human", "owner", "review required", "manual review"])) {
    errors.push("First-run review: must require human/manual review before acting on findings.");
  }

  const dataExposure = fields.get("Data exposure") || "";
  if (!containsAny(dataExposure, ["none", "local only", "no data leaves"])) {
    errors.push("Data exposure: must state that no data leaves the local checkout for certification-safe activation.");
  }

  const approvalRecord = fields.get("Approval record") || "";
  if (!containsAny(approvalRecord, [".ai/brain/", "issue", "pull request", "pr", "signed", "human"])) {
    errors.push("Approval record: must identify where human sign-off is recorded.");
  }

  const forbiddenText = Array.from(fields.values()).join(" ").toLowerCase();
  for (const forbidden of [
    "deploy",
    "production api",
    "database migration",
    "credential rotation",
    "auto-merge",
    "delete files",
    "npm install",
    "npm update",
    "audit fix",
  ]) {
    if (forbiddenText.includes(forbidden)) {
      errors.push(`Activation record contains forbidden automation capability: ${forbidden}.`);
    }
  }

  return { errors, warnings };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  if (!options.file) {
    throw new Error(`Missing activation record path.\n${usage()}`);
  }

  const filePath = path.resolve(ROOT, options.file);
  const relativePath = path.relative(ROOT, filePath).split(path.sep).join("/");
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Activation record must be inside the current repository.");
  }

  const text = await readFile(filePath, "utf8");
  const fields = parseChecklistTable(text);
  const result = validateFields(fields);

  console.log("AI Brain automation activation validation");
  console.log(`Record: ${relativePath}`);
  console.log("Mode: report-only; no files are modified and no automation is enabled.");

  console.log("\n==> Checklist");
  for (const field of REQUIRED_FIELDS) {
    console.log(`${fields.has(field) ? "PASS" : "FAIL"} ${field}`);
  }

  console.log("\n==> Findings");
  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log("PASS");
  } else {
    for (const error of result.errors) console.log(`ERROR: ${error}`);
    for (const warning of result.warnings) console.log(`WARN: ${warning}`);
  }

  console.log("\n==> Summary");
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  if (result.errors.length > 0) {
    console.error("RESULT: FAIL");
    process.exit(1);
  }

  console.log(result.warnings.length > 0 ? "RESULT: PASS WITH WARNINGS" : "RESULT: PASS");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
