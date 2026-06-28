# Scripts

This folder contains deterministic AI Brain helper scripts.

## `create-context-pack.mjs`

Creates a timestamped Markdown context pack under `.ai/brain/context-packs/`.

Usage from the repository root:

```bash
npm run brain:context -- "Short task name" --phase=DISCOVER
```

Optional summary:

```bash
npm run brain:context -- "Short task name" --phase=PLAN --summary="One sentence task summary."
```

Behavior:

- Uses only Node.js built-in modules.
- Does not read `.env.local` or credential files.
- Does not inspect or copy source code.
- Writes concise sections that point agents toward files and docs to inspect.

Failure behavior:

- Exits non-zero when no task name or summary is provided.
- Exits non-zero when an unsupported SDLC phase is supplied.

## `create-repo-index.mjs`

Scans the repository and writes deterministic index artifacts:

- `.ai/brain/index/repo-map.json`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`

Usage from the repository root:

```bash
npm run brain:index
```

Behavior:

- Uses only Node.js built-in modules.
- Excludes heavy and generated folders such as `node_modules`, `.git`, `.expo`, `dist`, `build`, `coverage`, `.next`, and `.turbo`.
- Excludes lock files from the file catalog while still detecting npm through `package.json`.
- Records paths, categories, package scripts, and module groupings.
- Does not read or copy app source file contents.
- Overwrites only the generated AI Brain index outputs.

Failure behavior:

- Exits non-zero if `package.json` cannot be read or output files cannot be written.

## `search-brain.mjs`

Runs lightweight local keyword search over AI Brain context and project documentation.

Usage from the repository root:

```bash
npm run brain:search -- "query"
npm run brain:search -- "query" --limit=5
```

Search scope:

- `.ai/brain/agent-start.md`
- `.ai/brain/adapters/`
- `.ai/brain/certification/`
- `.ai/brain/governance/`
- `.ai/brain/knowledge/`
- `.ai/brain/memory/`
- `.ai/brain/index/`
- `.ai/brain/context-packs/`
- `.ai/brain/loop-harness/`
- `.ai/brain/planning/`
- `.ai/brain/reviews/`
- `.ai/brain/templates/`
- `docs/`
- `project-context/`
- `knowledge-base/`
- `AGENTS.md`
- `README.md`
- selected `app/` and `src/` source/test filenames from `.ai/brain/index/repo-map.json`

Behavior:

- Uses simple deterministic keyword scoring.
- Returns top matches, file paths, short snippets, and suggested next files to inspect.
- Works offline and uses only Node.js built-in modules.
- Does not use embeddings, a vector database, network access, or source-code content dumping.

Failure behavior:

- Exits non-zero when no query is provided.
- If `repo-map.json` is missing, text search still runs and source filename hints are skipped.

## `analyze-impact.mjs`

Creates a lightweight heuristic impact analysis report for a planned change.

Usage from the repository root:

```bash
npm run brain:impact -- "change description"
```

Output:

- Saves a Markdown report under `.ai/brain/context-packs/`.
- Lists likely affected modules and files.
- Lists related tests.
- Lists documentation to check or update.
- Lists risks and recommended validation commands.

Behavior:

- Uses `.ai/brain/index/repo-map.json`, `.ai/brain/index/module-map.md`, `.ai/brain/knowledge/testing-map.md`, and keyword rules.
- Uses conservative language because results are heuristic.
- Does not read `.env.local`, use network access, embeddings, or a vector database.
- Does not replace direct repo inspection before implementation.

Failure behavior:

- Exits non-zero when no change description is provided.
- Exits non-zero if the generated repo index is missing; run `npm run brain:index` first.

## `health-check.mjs`

Runs local report-only AI Brain health checks.

Usage from the repository root:

```bash
npm run brain:health
npm run brain:health -- --as-of=2026-06-26
```

Checks:

- Required metadata on core canonical AI Brain docs, agent startup docs, adapter docs, and certification docs.
- Required template metadata on active `.ai/brain/templates/*.md` files.
- Review finding registry row shape.
- Memory integrity for new implementation-history entries after the CERT-05 boundary and open-decision lifecycle statuses.
- Generated index presence and generated artifact freshness signals.
- Conservative local path/reference validation for active operating docs.
- Generated and governance text for common secret/token/private-key patterns.

Behavior:

- Uses only Node.js built-in modules.
- Uses the current runtime date for freshness checks by default.
- Supports `--as-of=YYYY-MM-DD` to reproduce historical freshness checks.
- Does not read `.env.local` or credential files.
- Does not use network access.
- Does not modify files.
- Exits non-zero when required metadata is missing, template metadata is missing or misclassified, registry rows are invalid, new memory entries are malformed, generated index outputs are missing, active local references are broken, or possible secrets are detected.
- May report warnings for stale generated artifacts or other non-blocking quality issues.

Failure behavior:

- Exits non-zero for blocking errors.
- Exits non-zero for unknown options or invalid `--as-of` values.
- Prints report-only findings with paths and issue descriptions.
- Does not print secret values.

Reference validation:

- Checks Markdown links and inline-code paths that point to local repo paths such as `.ai/brain/`, `docs/`, `project-context/`, `knowledge-base/`, `scripts/`, `.github/`, `AGENTS.md`, `README.md`, and `package.json`.
- Ignores external URLs, anchor-only links, globs, and fenced code blocks.
- Skips historical planning reports, advisory review reports, generated indexes, and context packs to avoid false positives from preserved historical findings.

## `smoke-check.mjs`

Runs deterministic smoke checks for AI Brain helper scripts against temporary fixture repositories.

Usage from the repository root:

```bash
npm run brain:smoke
```

Coverage:

- `create-context-pack.mjs`
- `create-repo-index.mjs`
- `search-brain.mjs`
- `analyze-impact.mjs`
- `health-check.mjs`
- `validate-automation-activation.mjs`
- `update-memory.mjs`

Behavior:

- Uses only Node.js built-in modules.
- Creates isolated temporary fixture directories under the OS temp directory.
- Runs the real AI Brain scripts with fixture directories as `cwd`.
- Checks argument parsing, output paths, generated output shape, exclusion behavior, duplicate refusal, expected failures, and one search-quality query.
- Removes temporary fixture directories after each smoke group.
- Does not read `.env.local`, use network access, add dependencies, or modify repository-tracked files.

Failure behavior:

- Exits non-zero when any smoke assertion fails.
- Prints the failing smoke group and command output without printing secret values.

## `update-memory.mjs`

Creates or appends structured AI Brain memory entries.

Usage from the repository root:

```bash
npm run brain:memory:update -- --type=implementation --title="Short title" --summary="What changed." --source-evidence=".ai/brain/planning/report.md" --validation="git diff --check: PASS"
npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What remains unresolved." --source-evidence="AGENTS.md" --status=Open
npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="What was completed." --source-evidence=".ai/brain/planning/report.md"
```

Output:

- `--type=implementation` appends a dated entry to `.ai/brain/memory/implementation-history.md`.
- `--type=decision` adds a row to `.ai/brain/memory/open-decisions.md`.
- `--type=sprint` creates a dated file under `.ai/brain/memory/sprint-summaries/`.

Behavior:

- Uses only Node.js built-in modules.
- Requires a title and summary so generated memory is not empty.
- Generates `Memory ID`, `Status`, `Created`, `Last reviewed`, `Review after`, `Source evidence`, `Supersedes`, and `Superseded by` fields where they apply.
- Requires `--source-evidence` for implementation and decision entries.
- Uses implementation/sprint statuses `active`, `resolved`, `superseded`, `archived`, or `needs-review`.
- Uses decision statuses `Open`, `Needs owner`, `Deferred`, `Resolved`, or `Superseded`.
- Refuses duplicate implementation headings, duplicate open-decision rows, and existing sprint summary filenames.
- Does not inspect source code, read secrets, use network access, or copy full diffs.

Failure behavior:

- Exits non-zero when required arguments are missing.
- Exits non-zero when lifecycle status, memory ID, or date arguments are invalid.
- Exits non-zero when a duplicate entry would be created.
- Exits non-zero when expected memory markers are missing.

## `validate-automation-activation.mjs`

Validates a Markdown automation activation record before any automation is enabled.

Usage from the repository root:

```bash
npm run brain:automation:check -- path/to/automation-activation-record.md
npm run brain:automation:check -- --file=path/to/automation-activation-record.md
```

Behavior:

- Uses only Node.js built-in modules.
- Reads one activation record inside the repository.
- Checks the checklist fields from `.ai/brain/governance/security-preflight.md`.
- Requires human owner, approved sandbox, safe network stance, no secrets, approved output path, read-only or report-only scope, stop conditions, rollback/disable path, first-run human review, local-only data exposure, and approval record.
- Blocks forbidden automation capabilities such as deployment, production API calls, database migration, credential rotation, auto-merge, destructive deletion, and dependency mutation.
- Does not enable automation, schedule jobs, modify files, read `.env.local`, or use network access.

Failure behavior:

- Exits non-zero when the activation record is missing required fields, contains placeholders, requests unsafe capabilities, or is outside the repository.
- May report warnings when the record passes blocking checks but lacks recognizable local validation commands or includes explicitly approved mutation that still needs human review.

Rules for future scripts:

- Prefer simple local checks over networked automation.
- Do not read `.env.local` or credential files.
- Keep scripts deterministic and safe to run from the repository root.
- Document inputs, outputs, and failure behavior.
- Add validation evidence when a script is introduced or changed.
