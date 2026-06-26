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
- Writes concise sections that point Codex toward files and docs to inspect.

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

- `.ai/brain/knowledge/`
- `.ai/brain/memory/`
- `.ai/brain/index/`
- `.ai/brain/context-packs/`
- `.ai/brain/loop-harness/`
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

## `update-memory.mjs`

Creates or appends structured AI Brain memory entries.

Usage from the repository root:

```bash
npm run brain:memory:update -- --type=implementation --title="Short title" --summary="What changed." --validation="git diff --check: PASS"
npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What remains unresolved."
npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="What was completed."
```

Output:

- `--type=implementation` appends a dated entry to `.ai/brain/memory/implementation-history.md`.
- `--type=decision` adds a row to `.ai/brain/memory/open-decisions.md`.
- `--type=sprint` creates a dated file under `.ai/brain/memory/sprint-summaries/`.

Behavior:

- Uses only Node.js built-in modules.
- Requires a title and summary so generated memory is not empty.
- Refuses duplicate implementation headings, duplicate open-decision rows, and existing sprint summary filenames.
- Does not inspect source code, read secrets, use network access, or copy full diffs.

Failure behavior:

- Exits non-zero when required arguments are missing.
- Exits non-zero when a duplicate entry would be created.
- Exits non-zero when expected memory markers are missing.

Rules for future scripts:

- Prefer simple local checks over networked automation.
- Do not read `.env.local` or credential files.
- Keep scripts deterministic and safe to run from the repository root.
- Document inputs, outputs, and failure behavior.
- Add validation evidence when a script is introduced or changed.
