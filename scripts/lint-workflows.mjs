#!/usr/bin/env node
/* global console, process */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const workflowsDir = path.join(root, ".github", "workflows");

function listWorkflowFiles() {
  if (!fs.existsSync(workflowsDir)) {
    return [];
  }

  return fs
    .readdirSync(workflowsDir)
    .filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"))
    .sort()
    .map((file) => path.join(".github", "workflows", file));
}

function run(command, args) {
  return spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });
}

function commandExists(command) {
  const result = spawnSync("sh", ["-c", `command -v ${command} >/dev/null 2>&1`], {
    cwd: root,
    stdio: "ignore",
  });
  return result.status === 0;
}

const workflowFiles = listWorkflowFiles();

if (workflowFiles.length === 0) {
  console.log("No GitHub workflow files found.");
  process.exit(0);
}

if (commandExists("actionlint")) {
  const result = run("actionlint", workflowFiles);
  process.exit(result.status ?? 1);
}

console.log("actionlint is not installed; using pinned node-actionlint fallback.");
const result = run("npx", ["--yes", "node-actionlint@1.2.2", ...workflowFiles]);
process.exit(result.status ?? 1);
