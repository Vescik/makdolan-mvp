# Goal Template: Bug Fix

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-goal-bugfix` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for bug-fix goal contracts; does not define current project state. |
| domain | AI Brain goal contracts |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this when correcting a known defect.

## Objective

Fix `[bug summary]` so that `[specific input/action/state]` produces `[expected result]` instead of `[current incorrect result]`.

## Done When

- The failing scenario is reproduced or documented with exact steps.
- The fix changes only the minimum files needed for `[named bug]`.
- A regression test or targeted validation covers the scenario.
- Adjacent behavior listed in allowed scope still works.

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
- Allowed behavior changes:
- Allowed tests/docs:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

Default forbidden unless approved: broad rewrites, dependency changes, CI, secrets, deployment, database migrations, and generated output.

## Stop Conditions

- Stop if the bug cannot be reproduced and the expected behavior is not documented.
- Stop if the fix requires changing product scope.
- Stop if the bug points to a larger architecture issue outside the approved goal.
- Stop if validation cannot distinguish the fixed behavior from the broken behavior.

## Review Requirement

Review required before done:

- Root cause or likely cause is described.
- Regression coverage or targeted validation is present.
- Fix is scoped to the defect.
- Security/privacy and platform impact are checked.

## Memory Update Requirement

Update `.ai/brain/memory/implementation-history.md` when the bug fix affects user behavior, shared domain logic, validation policy, or future troubleshooting. Update `.ai/brain/memory/open-decisions.md` if the expected behavior remains partly unresolved.

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `npm run typecheck` |  |  |  |
| `npm test` |  |  |  |
| `npm run lint` |  |  |  |
| `npm run build:web` |  |  |  |
