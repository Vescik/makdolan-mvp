#!/usr/bin/env node
/* global console */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_DIR = path.join(".ai", "brain", "context-packs");
const REPO_MAP_PATH = path.join(".ai", "brain", "index", "repo-map.json");
const MODULE_MAP_PATH = path.join(".ai", "brain", "index", "module-map.md");
const TESTING_MAP_PATH = path.join(".ai", "brain", "knowledge", "testing-map.md");
const MAX_ITEMS = 10;

const AREA_RULES = [
  {
    area: "AI Brain tooling",
    tokens: ["ai", "brain", "context", "index", "search", "impact", "goal", "contract", "memory", "agent", "codex"],
    modulePrefixes: [".ai/brain"],
    docs: [".ai/brain/scripts/README.md", ".ai/brain/index/README.md", ".ai/brain/memory/implementation-history.md"],
    risks: ["AI Brain docs and generated context can become stale if scripts are not rerun after changes."],
    validation: ["npm run brain:index", "npm run lint", "git diff --check"],
  },
  {
    area: "Recommendation domain",
    tokens: ["recommendation", "recommendations", "scoring", "score", "rank", "reason", "chip", "tag", "menu", "price"],
    modulePrefixes: ["src/domain/recommendations"],
    docs: ["docs/data/SCORING_MODEL.md", "docs/architecture/ADR-0003-recommendation-engine.md", ".ai/brain/knowledge/module-catalog.md"],
    risks: ["Recommendation changes can alter ranking behavior across iOS, Android, and Web because the domain logic is shared."],
    validation: ["npm test", "npm run typecheck", "npm run lint"],
  },
  {
    area: "Budget and screen flow",
    tokens: ["budget", "screen", "form", "input", "preference", "results", "details", "profile", "route", "navigation"],
    modulePrefixes: ["src/screens", "app"],
    docs: ["docs/product/PRD.md", "docs/testing/MANUAL_SMOKE_CHECKLIST.md", ".ai/brain/knowledge/testing-map.md"],
    risks: ["UI and route changes can regress responsive Web behavior or native navigation expectations."],
    validation: ["npm run typecheck", "npm test", "npm run lint", "npm run build:web"],
  },
  {
    area: "Documentation and planning",
    tokens: ["doc", "docs", "documentation", "readme", "prd", "architecture", "decision", "plan", "sprint"],
    modulePrefixes: ["docs", "project-context", "knowledge-base", ".ai/brain/knowledge", ".ai/brain/planning"],
    docs: ["docs/VERIFY_MATRIX.md", ".ai/brain/knowledge/sdlc-flow.md", ".ai/brain/templates/impact-analysis-template.md"],
    risks: ["Documentation changes can conflict with source-of-truth docs if they duplicate instead of link and summarize."],
    validation: ["git diff --check"],
  },
  {
    area: "Testing and validation",
    tokens: ["test", "tests", "vitest", "validation", "verify", "lint", "typecheck", "build"],
    modulePrefixes: ["src", "scripts", ".github/workflows", ".ai/brain/scripts"],
    docs: ["docs/VERIFY_MATRIX.md", ".ai/brain/knowledge/testing-map.md"],
    risks: ["Validation changes can create false confidence if skipped checks are not reported with reasons."],
    validation: ["npm test", "npm run typecheck", "npm run lint", "npm run build:web"],
  },
  {
    area: "CI and automation",
    tokens: ["ci", "workflow", "github", "automation", "hook", "script", "pipeline"],
    modulePrefixes: [".github/workflows", "scripts", ".codex", ".ai/brain/scripts"],
    docs: ["docs/CODEX_PIPELINE_SETUP.md", ".ai/brain/loop-harness/automation-policy.md", ".ai/brain/scripts/README.md"],
    risks: ["Automation changes can fail silently without safe secret handling and explicit skip behavior."],
    validation: ["npm run lint", "git diff --check"],
  },
  {
    area: "Security and privacy",
    tokens: ["secret", "secrets", "token", "auth", "privacy", "credential", "payment", "location", "user data"],
    modulePrefixes: ["project-context", "docs", ".codex/hooks"],
    docs: ["project-context/SECURITY_PRIVACY.md", ".ai/brain/loop-harness/permissions-policy.md", ".ai/brain/knowledge/known-risks.md"],
    risks: ["Security/privacy work requires explicit notes and must not read or persist `.env.local`, tokens, or private user data."],
    validation: ["npm run lint", "git diff --check"],
  },
];

function usage() {
  return `Usage:
  npm run brain:impact -- "change description"
`;
}

function parseArgs(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    return { help: true, description: "" };
  }

  return {
    help: false,
    description: argv.join(" ").trim(),
  };
}

function tokenize(value) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length > 1),
    ),
  );
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || "impact-analysis";
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function includesAny(haystack, needles) {
  return needles.some((needle) => haystack.includes(needle));
}

function scoreRule(rule, tokens, description) {
  const normalized = description.toLowerCase();
  let score = 0;
  for (const token of rule.tokens) {
    if (normalized.includes(token)) score += 8;
    if (tokens.includes(token)) score += 4;
  }
  return score;
}

function scoreFile(file, tokens, matchedRules) {
  const haystack = `${file.path} ${file.module || ""} ${(file.categories || []).join(" ")}`.toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (haystack.includes(token)) score += 6;
  }

  for (const rule of matchedRules) {
    if (rule.modulePrefixes.some((prefix) => file.path.startsWith(prefix))) score += 12;
    if (includesAny(haystack, rule.tokens)) score += 5;
  }

  return score;
}

function unique(items) {
  return Array.from(new Set(items)).filter(Boolean).sort();
}

function bullet(items, emptyText = "- None suggested by this heuristic.") {
  if (items.length === 0) return emptyText;
  return items.map((item) => `- ${item}`).join("\n");
}

function codeBullet(items, emptyText = "- None suggested by this heuristic.") {
  if (items.length === 0) return emptyText;
  return items.map((item) => `- \`${item}\``).join("\n");
}

function relatedTests(files, allFiles) {
  const directTests = files.filter((file) => file.categories?.includes("test")).map((file) => file.path);
  const sourceModules = new Set(files.map((file) => file.module));
  const moduleTests = allFiles
    .filter((file) => file.categories?.includes("test") && sourceModules.has(file.module))
    .map((file) => file.path);

  return unique([...directTests, ...moduleTests]);
}

function validationCommands(matchedRules, likelyFiles) {
  const commands = new Set();
  for (const rule of matchedRules) {
    for (const command of rule.validation) commands.add(command);
  }

  const touchesAppOrSrc = likelyFiles.some((file) => file.path.startsWith("app/") || file.path.startsWith("src/"));
  const touchesDocsOnly = likelyFiles.length > 0 && likelyFiles.every((file) => file.categories?.includes("doc") || file.path.startsWith(".ai/brain/"));

  if (touchesAppOrSrc) {
    commands.add("npm run typecheck");
    commands.add("npm test");
    commands.add("npm run lint");
    commands.add("npm run build:web");
  } else if (touchesDocsOnly) {
    commands.add("git diff --check");
  }

  if (commands.size === 0) {
    commands.add("npm run lint");
    commands.add("git diff --check");
  }

  return Array.from(commands);
}

function renderAnalysis({ description, matchedRules, likelyFiles, relatedTestFiles, docsToUpdate, risks, commands, outputPath }) {
  const modules = unique(likelyFiles.map((file) => file.module)).slice(0, MAX_ITEMS);
  const filePaths = likelyFiles.map((file) => file.path).slice(0, MAX_ITEMS);

  return `# Impact Analysis

Input: ${description}

Generated by: \`npm run brain:impact\`

Output path: \`${outputPath}\`

## Confidence Note

This is heuristic pre-implementation guidance based on keyword matching against the repo index, module map, testing map, and known AI Brain rules. It is not a certainty claim. Codex must still inspect the referenced files before planning or editing.

## Likely Affected Areas

${bullet(matchedRules.map((rule) => `${rule.area} (keyword match)`))}

## Likely Affected Modules

${codeBullet(modules)}

## Likely Affected Files

${codeBullet(filePaths)}

## Related Tests

${codeBullet(relatedTestFiles.slice(0, MAX_ITEMS))}

## Documentation To Check Or Update

${codeBullet(docsToUpdate.slice(0, MAX_ITEMS))}

## Risks

${bullet(risks)}

## Recommended Validation Commands

${commands.map((command) => `- \`${command}\``).join("\n")}

## Suggested Next Inspection Steps

1. Read the likely affected files above.
2. Read the documentation listed above.
3. Confirm allowed and forbidden files in a goal contract if the change is multi-step.
4. Adjust validation commands after real discovery.

## Source Inputs Used

- \`.ai/brain/index/repo-map.json\`
- \`.ai/brain/index/module-map.md\`
- \`.ai/brain/knowledge/testing-map.md\`
`;
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    console.log(usage());
    return;
  }

  if (!parsed.description) {
    console.error("Missing change description.");
    console.error(usage());
    process.exit(1);
  }

  const root = process.cwd();
  const repoMap = JSON.parse(await readFile(path.join(root, REPO_MAP_PATH), "utf8"));
  await readFile(path.join(root, MODULE_MAP_PATH), "utf8");
  await readFile(path.join(root, TESTING_MAP_PATH), "utf8");

  const tokens = tokenize(parsed.description);
  const scoredRules = AREA_RULES.map((rule) => ({ rule, score: scoreRule(rule, tokens, parsed.description) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.area.localeCompare(b.rule.area));

  const matchedRules = scoredRules.length > 0 ? scoredRules.map((entry) => entry.rule) : [AREA_RULES.find((rule) => rule.area === "Documentation and planning")];
  const allFiles = Array.isArray(repoMap.files) ? repoMap.files : [];
  const likelyFiles = allFiles
    .map((file) => ({ file, score: scoreFile(file, tokens, matchedRules) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.file.path.localeCompare(b.file.path))
    .map((entry) => entry.file)
    .slice(0, MAX_ITEMS);

  const relatedTestFiles = relatedTests(likelyFiles, allFiles);
  const docsToUpdate = unique(matchedRules.flatMap((rule) => rule.docs));
  const risks = unique([
    "Heuristic analysis can miss files whose names do not share the task vocabulary.",
    ...matchedRules.flatMap((rule) => rule.risks),
  ]);
  const commands = validationCommands(matchedRules, likelyFiles);

  const outDir = path.join(root, OUTPUT_DIR);
  const outFile = `${timestamp()}-impact-${slugify(parsed.description)}.md`;
  const outputPath = path.join(OUTPUT_DIR, outFile).split(path.sep).join("/");
  const absoluteOutputPath = path.join(outDir, outFile);

  await mkdir(outDir, { recursive: true });
  await writeFile(
    absoluteOutputPath,
    renderAnalysis({
      description: parsed.description,
      matchedRules,
      likelyFiles,
      relatedTestFiles,
      docsToUpdate,
      risks,
      commands,
      outputPath,
    }),
    "utf8",
  );

  console.log(outputPath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
