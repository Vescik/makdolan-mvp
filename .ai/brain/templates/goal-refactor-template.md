# Goal Template: Refactor

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-goal-refactor` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for refactor goal contracts; does not define current project state. |
| domain | AI Brain goal contracts |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this when structure changes but intended behavior stays the same.

## Objective

Refactor `[module/component/service]` to `[specific structural outcome]` while preserving `[named behavior/API/output]`.

## Done When

- Public behavior and user-visible output for `[named flow]` are unchanged.
- The refactored code has `[specific property: fewer duplicate branches, extracted pure function, clearer module boundary, typed interface]`.
- Existing tests still pass or targeted regression tests are added.
- No unrelated formatting or architecture changes are included.

## Validation Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Add targeted checks:

```bash
# npm test -- path-or-pattern
```

## Allowed Scope

- Allowed files:
- Allowed directories:
- Allowed internal APIs:
- Allowed tests/docs:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

Default forbidden unless approved: product copy changes, navigation changes, dependency changes, CI, secrets, deployment, database migrations, and generated output.

## Stop Conditions

- Stop if preserving behavior requires product interpretation.
- Stop if the refactor expands into unrelated modules.
- Stop if tests reveal existing behavior is unclear and no source of truth exists.
- Stop if a dependency or architecture change becomes necessary.

## Review Requirement

Review required before done:

- Diff is structurally scoped.
- Behavior preservation is backed by tests or clear validation.
- No unrelated churn is present.
- Platform impact is unchanged or documented.

## Memory Update Requirement

Update `.ai/brain/memory/implementation-history.md` if the refactor changes module boundaries or future implementation guidance. Update `knowledge/module-catalog.md` or `knowledge-base/architecture.md` only if the durable module map changes.

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `npm run typecheck` |  |  |  |
| `npm test` |  |  |  |
| `npm run lint` |  |  |  |
| `npm run build:web` |  |  |  |
