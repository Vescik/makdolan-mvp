#!/usr/bin/env node
/* global console */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const VALID_PHASES = new Set(["DISCOVER", "PLAN", "EXECUTE", "VERIFY", "ITERATE"]);

function usage() {
  return `Usage:
  npm run brain:context -- "Short task name" --phase=DISCOVER
  npm run brain:context -- "Short task name" --phase=PLAN --summary="One sentence summary."
`;
}

function parseArgs(argv) {
  const positionals = [];
  const options = {
    phase: "DISCOVER",
    summary: "",
  };

  for (const arg of argv) {
    if (arg.startsWith("--phase=")) {
      options.phase = arg.slice("--phase=".length).trim().toUpperCase();
      continue;
    }

    if (arg.startsWith("--summary=")) {
      options.summary = arg.slice("--summary=".length).trim();
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    positionals.push(arg);
  }

  return {
    taskName: positionals.join(" ").trim(),
    ...options,
  };
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || "context-pack";
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function renderContextPack({ taskName, summary, phase, generatedAt }) {
  const taskSummary = summary || taskName;

  return `# Context Pack: ${taskName}

Generated: ${generatedAt}

Compact purpose: load this into an agent session to start discovery. This pack points to source material; it does not replace reading the repository.

## Task Summary

${taskSummary}

## SDLC Phase

${phase}

## Relevant Product Decisions

- Budget-first food decision flow remains the MVP center.
- Rzeszow controlled seed/mock data is the current implementation baseline.
- AI Brain Pro is an SDLC support layer, not a user-facing AI feature.
- Source paths to inspect:
  - \`docs/product/PRD.md\`
  - \`docs/product/PRODUCT_DECISIONS.md\`
  - \`docs/product/MVP_SCOPE.md\`
  - \`.ai/brain/knowledge/product-decisions.md\`

## Relevant Modules

- App routes: \`app/\`
- Screens: \`src/screens/\`
- Recommendation domain logic: \`src/domain/recommendations/\`
- Shared UI: \`src/ui/\`
- AI Brain docs and memory: \`.ai/brain/\`

## Likely Files To Inspect

- \`.ai/brain/agent-start.md\`: agent-neutral startup contract.
- \`.ai/brain/adapters/README.md\`: runtime adapter catalog.
- \`AGENTS.md\`: Codex-facing repository rules, commands, AI Brain usage, validation expectations.
- \`.ai/brain/knowledge/agent-session-start.md\`: Makdolan session-start checklist.
- \`.ai/brain/knowledge/module-catalog.md\`: current code map.
- \`.ai/brain/knowledge/testing-map.md\`: validation command selection.
- \`.ai/brain/knowledge/known-risks.md\`: stable risks to consider.
- Add task-specific files here before implementation:
  - \`path/to/file\`: reason.

## Implementation Constraints

- Do not dump full source code into this context pack.
- Do not read or copy \`.env.local\`, secrets, tokens, credentials, authorization headers, or private user data.
- Respect the requested SDLC phase; do not implement during discovery or planning.
- Do not add dependencies, change CI, alter release settings, or touch generated output unless the goal explicitly allows it.
- Keep iOS, Android, and Web impact visible in the plan.

## Validation Commands

Default app validation:

\`\`\`bash
npm run typecheck
npm test
npm run lint
npm run build:web
\`\`\`

Docs-only fallback:

\`\`\`bash
git diff --check
\`\`\`

Add targeted validation here:

\`\`\`bash
# command
\`\`\`

## Risks

- Scope drift: confirm allowed and forbidden files before editing.
- Product drift: avoid adding out-of-scope MVP features without approval.
- Validation gap: record skipped checks with reasons.
- Generated output noise: avoid changing \`dist/\` unless required.

## Test Suggestions

- Identify existing tests near affected modules before adding new tests.
- Prefer deterministic unit tests for recommendation domain logic.
- For UI changes, include web responsive smoke checks when a dev server is used.
- Add task-specific test scenarios here:
  - Scenario:

## Memory Update Checklist

- Update \`.ai/brain/memory/implementation-history.md\` if implementation, workflow, validation policy, or accepted risk changes.
- Update \`.ai/brain/memory/open-decisions.md\` if a decision is deferred.
- Add a sprint summary under \`.ai/brain/memory/sprint-summaries/\` when a sprint or phase completes.
- Update \`knowledge-base/\` only for durable product or architecture facts.

## Next Discovery Steps

1. Read the linked source docs.
2. Inspect task-specific files.
3. Write a goal contract if the task is multi-step or risky.
4. Plan before editing.
`;
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed.help) {
    console.log(usage());
    return;
  }

  if (!VALID_PHASES.has(parsed.phase)) {
    console.error(`Unsupported phase: ${parsed.phase}`);
    console.error(`Allowed phases: ${Array.from(VALID_PHASES).join(", ")}`);
    process.exit(1);
  }

  const taskName = parsed.taskName || parsed.summary;
  if (!taskName) {
    console.error("Missing task name or summary.");
    console.error(usage());
    process.exit(1);
  }

  const generatedAt = new Date().toISOString();
  const outDir = path.join(process.cwd(), ".ai", "brain", "context-packs");
  const fileName = `${timestamp()}-${slugify(taskName)}.md`;
  const outPath = path.join(outDir, fileName);

  await mkdir(outDir, { recursive: true });
  await writeFile(
    outPath,
    renderContextPack({
      taskName,
      summary: parsed.summary,
      phase: parsed.phase,
      generatedAt,
    }),
    "utf8",
  );

  console.log(outPath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
