# Context Pack Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-context-pack` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for generated context packs; does not define current project state. |
| domain | AI Brain context packaging |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Keep context packs compact enough to load into an agent session. They should point to source files and decisions, not dump full source code.

## Task Summary

One or two sentences describing the task and expected outcome.

## SDLC Phase

`DISCOVER`, `PLAN`, `EXECUTE`, `VERIFY`, or `ITERATE`.

## Relevant Product Decisions

- Decision:
- Source path:
- Why it matters:

## Relevant Modules

- Module or area:
- Responsibility:
- Why it may be affected:

## Likely Files To Inspect

- `path/to/file`: reason to inspect.

## Implementation Constraints

- Constraint:
- Source:

## Validation Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Docs-only fallback:

```bash
git diff --check
```

## Risks

- Risk:
- Mitigation:

## Test Suggestions

- Test scenario:
- Existing or new test file:

## Memory Update Checklist

- Update `.ai/brain/memory/implementation-history.md` if implementation, workflow, validation policy, or accepted risk changes.
- Update `.ai/brain/memory/open-decisions.md` if a decision is deferred.
- Add a sprint summary under `.ai/brain/memory/sprint-summaries/` when a sprint or phase completes.
- Update `knowledge-base/` only for durable product or architecture facts.

## Notes For Agents

- Use this pack to start discovery; do not treat it as a replacement for reading the referenced files.
- Do not copy `.env.local`, secrets, tokens, credentials, authorization headers, private user data, or full source files into this pack.
