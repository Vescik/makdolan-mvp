# Context Pack: CERT-02 agent-neutral smoke

Generated: 2026-06-26T22:51:40.714Z

Compact purpose: load this into an agent session to start discovery. This pack points to source material; it does not replace reading the repository.

## Task Summary

CERT-02 agent-neutral smoke

## SDLC Phase

DISCOVER

## Relevant Product Decisions

- Budget-first food decision flow remains the MVP center.
- Rzeszow controlled seed/mock data is the current implementation baseline.
- AI Brain Pro is an SDLC support layer, not a user-facing AI feature.
- Source paths to inspect:
  - `docs/product/PRD.md`
  - `docs/product/PRODUCT_DECISIONS.md`
  - `docs/product/MVP_SCOPE.md`
  - `.ai/brain/knowledge/product-decisions.md`

## Relevant Modules

- App routes: `app/`
- Screens: `src/screens/`
- Recommendation domain logic: `src/domain/recommendations/`
- Shared UI: `src/ui/`
- AI Brain docs and memory: `.ai/brain/`

## Likely Files To Inspect

- `.ai/brain/agent-start.md`: agent-neutral startup contract.
- `.ai/brain/adapters/README.md`: runtime adapter catalog.
- `AGENTS.md`: Codex-facing repository rules, commands, AI Brain usage, validation expectations.
- `.ai/brain/knowledge/agent-session-start.md`: Makdolan session-start checklist.
- `.ai/brain/knowledge/module-catalog.md`: current code map.
- `.ai/brain/knowledge/testing-map.md`: validation command selection.
- `.ai/brain/knowledge/known-risks.md`: stable risks to consider.
- Add task-specific files here before implementation:
  - `path/to/file`: reason.

## Implementation Constraints

- Do not dump full source code into this context pack.
- Do not read or copy `.env.local`, secrets, tokens, credentials, authorization headers, or private user data.
- Respect the requested SDLC phase; do not implement during discovery or planning.
- Do not add dependencies, change CI, alter release settings, or touch generated output unless the goal explicitly allows it.
- Keep iOS, Android, and Web impact visible in the plan.

## Validation Commands

Default app validation:

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

Add targeted validation here:

```bash
# command
```

## Risks

- Scope drift: confirm allowed and forbidden files before editing.
- Product drift: avoid adding out-of-scope MVP features without approval.
- Validation gap: record skipped checks with reasons.
- Generated output noise: avoid changing `dist/` unless required.

## Test Suggestions

- Identify existing tests near affected modules before adding new tests.
- Prefer deterministic unit tests for recommendation domain logic.
- For UI changes, include web responsive smoke checks when a dev server is used.
- Add task-specific test scenarios here:
  - Scenario:

## Memory Update Checklist

- Update `.ai/brain/memory/implementation-history.md` if implementation, workflow, validation policy, or accepted risk changes.
- Update `.ai/brain/memory/open-decisions.md` if a decision is deferred.
- Add a sprint summary under `.ai/brain/memory/sprint-summaries/` when a sprint or phase completes.
- Update `knowledge-base/` only for durable product or architecture facts.

## Next Discovery Steps

1. Read the linked source docs.
2. Inspect task-specific files.
3. Write a goal contract if the task is multi-step or risky.
4. Plan before editing.
