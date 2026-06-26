# Context Packs

Context packs are compact task-start bundles. They help Codex load the right product decisions, modules, files, constraints, risks, tests, and memory checklist before implementation.

They do not replace repository inspection. A context pack should point to source files and docs, then Codex must still read the relevant files before planning or editing.

## When To Create One

Create a context pack when:

- A feature spans several docs and code areas.
- A refactor touches shared domain logic or navigation.
- A bug fix needs product, architecture, and test context.
- A sprint needs a compact implementation brief.
- A future session should repeat the same discovery path.

For tiny one-file changes, a context pack is optional.

## Scripted Workflow

Use the npm script from the repository root:

```bash
npm run brain:context -- "Short task name" --phase=DISCOVER
```

Optional summary:

```bash
npm run brain:context -- "Recommendation empty state" --phase=PLAN --summary="Prepare context for fixing the no-results recommendation flow."
```

The script creates a timestamped Markdown file under `.ai/brain/context-packs/`.

## Manual Workflow

If the script is unavailable:

1. Copy `.ai/brain/templates/context-pack-template.md`.
2. Save it as `.ai/brain/context-packs/YYYY-MM-DD-short-task-name.md`.
3. Fill in only concise summaries, source paths, validation commands, and risks.
4. Link to code and docs instead of pasting full source code.
5. Read the referenced files before implementation.

## What To Include

- Task summary.
- SDLC phase.
- Relevant product decisions.
- Relevant modules.
- Likely files to inspect.
- Implementation constraints.
- Validation commands.
- Risks.
- Test suggestions.
- Memory update checklist.

## What To Avoid

- Full source-code dumps.
- Secrets, tokens, credentials, authorization headers, `.env.local`, or private user data.
- Broad claims without source paths.
- Replacing discovery with assumptions.
