# Context Pack Template

Keep context packs compact enough to paste into Codex. They should point to source files and decisions, not dump full source code.

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

## Notes For Codex

- Use this pack to start discovery; do not treat it as a replacement for reading the referenced files.
- Do not copy `.env.local`, secrets, tokens, credentials, authorization headers, private user data, or full source files into this pack.
