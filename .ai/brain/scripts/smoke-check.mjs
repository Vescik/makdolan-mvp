#!/usr/bin/env node
/* global console */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = process.cwd();
const SCRIPT_DIR = path.join(REPO_ROOT, ".ai", "brain", "scripts");
const NODE = process.execPath;
const HEALTH_METADATA_FILES = [
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

function scriptPath(scriptName) {
  return path.join(SCRIPT_DIR, scriptName);
}

function normalizeOutput(result) {
  return `${result.stdout || ""}${result.stderr || ""}`;
}

function runScript(root, scriptName, args = []) {
  return spawnSync(NODE, [scriptPath(scriptName), ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function expectPass(result, label) {
  assert.equal(result.status, 0, `${label} failed:\n${normalizeOutput(result)}`);
  return normalizeOutput(result);
}

function expectFail(result, label) {
  assert.notEqual(result.status, 0, `${label} unexpectedly passed:\n${normalizeOutput(result)}`);
  return normalizeOutput(result);
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

async function writeFixtureFile(root, relativePath, content) {
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content, "utf8");
}

async function readFixtureFile(root, relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function withFixture(name, callback) {
  const root = await mkdtemp(path.join(os.tmpdir(), `ai-brain-${name}-`));
  try {
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function metadataDoc(id, className = "canonical", authority = "Fixture authority.", domain = "AI Brain smoke") {
  return `# ${id}

Metadata:

| Field | Value |
| --- | --- |
| id | \`${id}\` |
| class | \`${className}\` |
| owner | AI Brain smoke tests |
| status | \`active\` |
| authority | ${authority} |
| domain | ${domain} |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

## Body

Fixture content for local smoke validation.
`;
}

function reviewRegistryDoc() {
  return `# Review Finding Registry

Metadata:

| Field | Value |
| --- | --- |
| id | \`ai-brain-review-finding-registry\` |
| class | \`canonical\` |
| owner | AI Brain smoke tests |
| status | \`active\` |
| authority | Fixture review registry. |
| domain | AI Brain governance |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

## Registry

| ID | Severity | Status | Source | Finding | Owner/Area | Dependencies | Recommended Sprint | Evidence / Resolution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| \`MGA-01\` | Critical | implemented | \`MASTER_GAP_ANALYSIS.md\` | Fixture finding | AI Brain smoke | None | Smoke sprint | Implemented by smoke fixture evidence. |
`;
}

async function seedPackage(root) {
  await writeFixtureFile(
    root,
    "package.json",
    JSON.stringify(
      {
        name: "ai-brain-smoke-fixture",
        private: true,
        scripts: {
          typecheck: "tsc --noEmit",
          test: "vitest run",
          "brain:index": "node .ai/brain/scripts/create-repo-index.mjs",
        },
      },
      null,
      2,
    ),
  );
}

async function seedIndexInputs(root) {
  await seedPackage(root);
  await writeFixtureFile(root, ".ai/brain/index/.gitkeep", "");
  await writeFixtureFile(root, "src/domain/recommendations/scoring.ts", "export const score = 1;\n");
  await writeFixtureFile(root, "src/domain/recommendations/scoring.test.ts", "export const testName = 'scoring';\n");
  await writeFixtureFile(root, "docs/product/PRD.md", "# Product Requirements\n\nBudget recommendation validation.\n");
  await writeFixtureFile(root, "node_modules/ignored.js", "module.exports = true;\n");
  await writeFixtureFile(root, "dist/ignored.js", "console.log('ignored');\n");
  await writeFixtureFile(root, ".env.local", "SHOULD_NOT_BE_INDEXED=true\n");
  await writeFixtureFile(root, "package-lock.json", "{}\n");
  await writeFixtureFile(root, ".ai/brain/context-packs/2026-06-27T00-00-00-000Z-generated.md", "# Generated\n");
}

async function seedSearchFixture(root) {
  await writeFixtureFile(
    root,
    ".ai/brain/knowledge/testing-map.md",
    "# Testing Map\n\nBudget validation smoke anchor for AI Brain search quality.\n",
  );
  await writeFixtureFile(
    root,
    ".ai/brain/index/repo-map.json",
    JSON.stringify(
      {
        files: [
          {
            path: "src/screens/budgetValidation.test.ts",
            module: "src/screens/budgetValidation.test.ts",
            categories: ["test"],
          },
        ],
      },
      null,
      2,
    ),
  );
}

async function seedImpactFixture(root) {
  await writeFixtureFile(
    root,
    ".ai/brain/index/repo-map.json",
    JSON.stringify(
      {
        files: [
          {
            path: "src/domain/recommendations/scoring.ts",
            module: "src/domain/recommendations",
            categories: ["source"],
          },
          {
            path: "src/domain/recommendations/scoring.test.ts",
            module: "src/domain/recommendations",
            categories: ["test"],
          },
          {
            path: ".ai/brain/scripts/search-brain.mjs",
            module: ".ai/brain/scripts",
            categories: ["source", "important"],
          },
        ],
      },
      null,
      2,
    ),
  );
  await writeFixtureFile(root, ".ai/brain/index/module-map.md", "# Module Map\n\n- src/domain/recommendations\n");
  await writeFixtureFile(root, ".ai/brain/knowledge/testing-map.md", "# Testing Map\n\nUse validation profiles.\n");
}

async function seedHealthFixture(root, { includeSecret = false, includeBrokenReference = false } = {}) {
  for (const file of HEALTH_METADATA_FILES) {
    if (file === ".ai/brain/governance/review-finding-registry.md") {
      await writeFixtureFile(root, file, reviewRegistryDoc());
      continue;
    }

    const id = path.basename(file, path.extname(file)).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    await writeFixtureFile(root, file, metadataDoc(`smoke-${id}`));
  }

  await writeFixtureFile(root, ".ai/brain/index/repo-map.json", JSON.stringify({ files: [] }, null, 2));
  await writeFixtureFile(root, ".ai/brain/index/file-catalog.md", "# File Catalog\n");
  await writeFixtureFile(root, ".ai/brain/index/module-map.md", "# Module Map\n");
  await writeFixtureFile(root, ".ai/brain/templates/smoke-template.md", metadataDoc("smoke-template", "template"));
  await writeFixtureFile(root, ".ai/brain/context-packs/2026-06-27-smoke.md", "# Context Pack\n\nGenerated: 2026-06-27\n");
  await writeFixtureFile(root, ".ai/brain/planning/smoke-report.md", "# Smoke Report\n\nDate: 2026-06-27\n");
  await writeFixtureFile(
    root,
    ".ai/brain/memory/implementation-history.md",
    `# Implementation History

## 2026-06-27: CERT-05 memory enforcement hardening

- Memory ID: \`memory-implementation-2026-06-27-cert-05-memory-enforcement-hardening\`.
- Status: \`active\`.
- Created: 2026-06-27.
- Last reviewed: 2026-06-27.
- Review after: 2026-07-27.
- Changed: Fixture memory boundary for smoke validation.
- Source evidence: smoke fixture.
- Validation: health-check smoke: PASS.
- Review: smoke fixture.
- Supersedes: none.
- Superseded by: none.
- Memory note: fixture entry for health smoke.
`,
  );
  await writeFixtureFile(
    root,
    ".ai/brain/memory/open-decisions.md",
    "# Open Decisions\n\n## Current Open Decisions\n\n| Decision | Status | Notes |\n| --- | --- | --- |\n| Smoke decision | Open | Fixture decision. |\n\n## Resolved Decisions\n",
  );
  await writeFixtureFile(root, "AGENTS.md", "# Agents\n\nNo secrets.\n");
  await writeFixtureFile(root, "README.md", "# Fixture\n\nNo secrets.\n");

  if (includeSecret) {
    await writeFixtureFile(
      root,
      ".ai/brain/planning/secret-report.md",
      "# Secret Report\n\nDate: 2026-06-27\n\nsk-testSmokeSecretValue1234567890\n",
    );
  }

  if (includeBrokenReference) {
    await writeFixtureFile(
      root,
      ".ai/brain/governance/broken-reference.md",
      `${metadataDoc("smoke-broken-reference")}\nReference to \`.ai/brain/missing-reference.md\` should fail.\n`,
    );
  }
}

async function seedMemoryFixture(root) {
  await writeFixtureFile(root, ".ai/brain/memory/implementation-history.md", "# Implementation History\n");
  await writeFixtureFile(
    root,
    ".ai/brain/memory/open-decisions.md",
    "# Open Decisions\n\n| Decision | Status | Notes |\n| --- | --- | --- |\n\n## Resolved Decisions\n",
  );
}

async function smokeContextPack() {
  await withFixture("context", async (root) => {
    const output = expectPass(
      runScript(root, "create-context-pack.mjs", ["Smoke Context", "--phase=PLAN", "--summary=Smoke summary"]),
      "context pack generation",
    );

    const generatedPath = output.trim().split(/\r?\n/).at(-1);
    assert.ok(generatedPath, "context generator should print output path");
    assert.equal(await exists(generatedPath), true, "context pack output path should exist");

    const content = await readFile(generatedPath, "utf8");
    assert.match(content, /# Context Pack: Smoke Context/);
    assert.match(content, /Compact purpose: load this into an agent session/);
    assert.match(content, /## SDLC Phase\n\nPLAN/);
    assert.match(content, /Smoke summary/);

    const missingTask = expectFail(runScript(root, "create-context-pack.mjs"), "context missing task");
    assert.match(missingTask, /Missing task name or summary/);

    const badPhase = expectFail(
      runScript(root, "create-context-pack.mjs", ["Smoke Context", "--phase=BAD"]),
      "context invalid phase",
    );
    assert.match(badPhase, /Unsupported phase: BAD/);
  });
}

async function smokeRepoIndex() {
  await withFixture("index", async (root) => {
    await seedIndexInputs(root);

    const output = expectPass(runScript(root, "create-repo-index.mjs"), "repo index generation");
    assert.match(output, /Indexed /);
    assert.equal(await exists(path.join(root, ".ai/brain/index/repo-map.json")), true);
    assert.equal(await exists(path.join(root, ".ai/brain/index/file-catalog.md")), true);
    assert.equal(await exists(path.join(root, ".ai/brain/index/module-map.md")), true);

    const repoMap = JSON.parse(await readFixtureFile(root, ".ai/brain/index/repo-map.json"));
    const indexedPaths = repoMap.files.map((file) => file.path);
    assert.ok(indexedPaths.includes("src/domain/recommendations/scoring.ts"));
    assert.ok(indexedPaths.includes("src/domain/recommendations/scoring.test.ts"));
    assert.ok(!indexedPaths.some((item) => item.startsWith("node_modules/")));
    assert.ok(!indexedPaths.some((item) => item.startsWith("dist/")));
    assert.ok(!indexedPaths.includes(".env.local"));
    assert.ok(!indexedPaths.includes("package-lock.json"));
    assert.ok(!indexedPaths.some((item) => item.startsWith(".ai/brain/context-packs/2026-06-27T")));

    const catalog = await readFixtureFile(root, ".ai/brain/index/file-catalog.md");
    assert.match(catalog, /`brain:index`: `node \.ai\/brain\/scripts\/create-repo-index\.mjs`/);
  });
}

async function smokeSearch() {
  await withFixture("search", async (root) => {
    await seedSearchFixture(root);

    const output = expectPass(runScript(root, "search-brain.mjs", ["budget validation", "--limit=5"]), "search quality");
    assert.match(output, /# AI Brain Search/);
    assert.match(output, /\.ai\/brain\/knowledge\/testing-map\.md/);
    assert.match(output, /budget validation/i);

    const missingQuery = expectFail(runScript(root, "search-brain.mjs"), "search missing query");
    assert.match(missingQuery, /Missing search query/);
  });
}

async function smokeImpact() {
  await withFixture("impact", async (root) => {
    await seedImpactFixture(root);

    const output = expectPass(
      runScript(root, "analyze-impact.mjs", ["recommendation scoring validation"]),
      "impact analysis generation",
    );
    const outputPath = output.trim().split(/\r?\n/).at(-1);
    assert.ok(outputPath, "impact analyzer should print output path");
    assert.equal(await exists(path.join(root, outputPath)), true, "impact report output should exist");

    const report = await readFixtureFile(root, outputPath);
    assert.match(report, /Input: recommendation scoring validation/);
    assert.match(report, /Recommendation domain/);
    assert.match(report, /src\/domain\/recommendations\/scoring\.ts/);
    assert.match(report, /Recommended Validation Commands/);

    const missingDescription = expectFail(runScript(root, "analyze-impact.mjs"), "impact missing description");
    assert.match(missingDescription, /Missing change description/);
  });

  await withFixture("impact-missing-index", async (root) => {
    const missingIndex = expectFail(runScript(root, "analyze-impact.mjs", ["recommendation scoring"]), "impact missing index");
    assert.match(missingIndex, /repo-map\.json/);
  });
}

async function smokeHealth() {
  await withFixture("health", async (root) => {
    await seedHealthFixture(root);

    const output = expectPass(runScript(root, "health-check.mjs", ["--as-of=2026-06-27"]), "health pass");
    assert.match(output, /RESULT: PASS/);
    assert.match(output, /==> template metadata\nPASS/);
    assert.match(output, /==> memory integrity\nPASS/);
    assert.match(output, /==> local references\nPASS/);
    assert.match(output, /Scanned files for local references:/);
    assert.match(output, /Scanned text files for secrets:/);

    const invalidDate = expectFail(runScript(root, "health-check.mjs", ["--as-of=invalid-date"]), "health invalid date");
    assert.match(invalidDate, /Invalid --as-of value "invalid-date"/);
  });

  await withFixture("health-secret", async (root) => {
    await seedHealthFixture(root, { includeSecret: true });

    const result = expectFail(runScript(root, "health-check.mjs", ["--as-of=2026-06-27"]), "health secret scan");
    assert.match(result, /possible OpenAI style API key detected/);
    assert.doesNotMatch(result, /sk-testSmokeSecretValue1234567890/);
  });

  await withFixture("health-reference", async (root) => {
    await seedHealthFixture(root, { includeBrokenReference: true });

    const result = expectFail(runScript(root, "health-check.mjs", ["--as-of=2026-06-27"]), "health local reference");
    assert.match(result, /local reference is missing: \.ai\/brain\/missing-reference\.md/);
  });
}

async function smokeAutomationActivationValidation() {
  await withFixture("automation-activation", async (root) => {
    await writeFixtureFile(
      root,
      ".ai/brain/planning/safe-automation-record.md",
      `# Automation Activation Record: Smoke Scan

| Field | Required answer |
| --- | --- |
| Owner | Engineering owner. |
| Purpose | Report stale docs candidates. |
| Trigger | Manual test run before scheduling. |
| Cadence | Weekly after approval. |
| Sandbox | read-only. |
| Network | off. |
| Secrets | none. |
| Output path | .ai/brain/context-packs/YYYY-MM-DD-smoke-scan.md. |
| Write scope | report-only. |
| Validation | git status --short; git diff --check; npm run brain:health. |
| Stop conditions | Stop for secrets, credentials, production data, destructive commands, network needs, or missing approval. |
| Rollback/disable path | Disable the schedule and archive generated reports. |
| First-run review | Human manual review required before acting on findings. |
| Data exposure | No data leaves the local checkout. |
| Approval record | .ai/brain/planning/safe-automation-record.md records human sign-off. |
`,
    );

    const output = expectPass(
      runScript(root, "validate-automation-activation.mjs", [".ai/brain/planning/safe-automation-record.md"]),
      "automation activation validation pass",
    );
    assert.match(output, /RESULT: PASS/);

    await writeFixtureFile(
      root,
      ".ai/brain/planning/unsafe-automation-record.md",
      `# Automation Activation Record: Unsafe Scan

| Field | Required answer |
| --- | --- |
| Owner | Codex automation. |
| Purpose | Deploy production automatically. |
| Trigger | Schedule. |
| Cadence | Daily. |
| Sandbox | danger-full-access. |
| Network | enabled. |
| Secrets | production token. |
| Output path | dist/report.md. |
| Write scope | mutate source. |
| Validation | none. |
| Stop conditions | none. |
| Rollback/disable path | none. |
| First-run review | none. |
| Data exposure | upload repository data. |
| Approval record | none. |
`,
    );

    const failure = expectFail(
      runScript(root, "validate-automation-activation.mjs", [".ai/brain/planning/unsafe-automation-record.md"]),
      "automation activation validation failure",
    );
    assert.match(failure, /RESULT: FAIL/);
    assert.match(failure, /danger-full-access/);
    assert.match(failure, /Secrets:/);
  });
}

async function smokeMemoryUpdate() {
  await withFixture("memory", async (root) => {
    await seedMemoryFixture(root);

    const dryRun = expectPass(
      runScript(root, "update-memory.mjs", [
        "--type=implementation",
        "--title=Smoke memory",
        "--summary=Dry run summary",
        "--source-evidence=smoke fixture",
        "--validation=git diff --check: PASS",
        "--dry-run",
      ]),
      "memory dry run",
    );
    assert.match(dryRun, /Smoke memory/);
    assert.match(dryRun, /Memory ID: `memory-implementation-/);
    assert.match(dryRun, /Status: `active`/);
    assert.match(dryRun, /Source evidence: smoke fixture/);

    const beforeDryRun = await readFixtureFile(root, ".ai/brain/memory/implementation-history.md");
    assert.doesNotMatch(beforeDryRun, /Dry run summary/);

    const appendOutput = expectPass(
      runScript(root, "update-memory.mjs", [
        "--type=implementation",
        "--title=Smoke memory",
        "--summary=Append summary",
        "--source-evidence=smoke fixture",
        "--validation=git diff --check: PASS",
      ]),
      "memory implementation append",
    );
    assert.match(appendOutput, /\.ai\/brain\/memory\/implementation-history\.md/);

    const history = await readFixtureFile(root, ".ai/brain/memory/implementation-history.md");
    assert.match(history, /Append summary/);
    assert.match(history, /Review after: \d{4}-\d{2}-\d{2}\./);

    const duplicate = expectFail(
      runScript(root, "update-memory.mjs", [
        "--type=implementation",
        "--title=Smoke memory",
        "--summary=Duplicate summary",
        "--source-evidence=smoke fixture",
      ]),
      "memory duplicate refusal",
    );
    assert.match(duplicate, /Refusing to add duplicate memory entry/);

    const decisionOutput = expectPass(
      runScript(root, "update-memory.mjs", [
        "--type=decision",
        "--title=Smoke decision",
        "--summary=Decision summary",
        "--source-evidence=smoke fixture",
        "--status=Open",
      ]),
      "memory decision append",
    );
    assert.match(decisionOutput, /\.ai\/brain\/memory\/open-decisions\.md/);

    const decisions = await readFixtureFile(root, ".ai/brain/memory/open-decisions.md");
    assert.match(decisions, /Smoke decision/);
    assert.match(decisions, /Memory ID: memory-decision-/);

    const sprintOutput = expectPass(
      runScript(root, "update-memory.mjs", [
        "--type=sprint",
        "--title=Smoke sprint",
        "--summary=Sprint summary",
        "--source-evidence=smoke fixture",
        "--validation=brain:smoke: PASS",
      ]),
      "memory sprint summary",
    );
    assert.match(sprintOutput, /\.ai\/brain\/memory\/sprint-summaries\/\d{4}-\d{2}-\d{2}-smoke-sprint\.md/);
  });
}

const SMOKES = [
  ["create-context-pack", smokeContextPack],
  ["create-repo-index", smokeRepoIndex],
  ["search-brain", smokeSearch],
  ["analyze-impact", smokeImpact],
  ["health-check", smokeHealth],
  ["validate-automation-activation", smokeAutomationActivationValidation],
  ["update-memory", smokeMemoryUpdate],
];

async function main() {
  console.log("AI Brain script smoke checks");
  console.log(`Root: ${REPO_ROOT}`);
  console.log("Mode: isolated temporary fixtures; no repository files are modified by smoke scenarios.");

  for (const [name, smoke] of SMOKES) {
    await smoke();
    console.log(`[brain-smoke] PASS: ${name}`);
  }

  console.log(`\nRESULT: PASS (${SMOKES.length} smoke groups)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : String(error));
  console.error("\nRESULT: FAIL");
  process.exit(1);
});
