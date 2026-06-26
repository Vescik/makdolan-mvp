# Goal Contract Template

Use `.ai/brain/loop-harness/goal-contract-template.md` as the canonical active-work template. This file is a short portable copy for prompts.

## Objective

Concrete outcome:

## Done When

- Observable criterion:
- Observable criterion:
- Observable criterion:

## Validation Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Docs-only alternative:

```bash
git diff --check
```

## Allowed Scope

- Allowed files:
- Allowed directories:
- Allowed behavior changes:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

## Stop Conditions

- Stop before expanding scope.
- Stop before touching secrets, credentials, deployments, payments, authentication, database migrations, dependency changes, or generated artifacts outside the goal.
- Stop when validation failure cannot be resolved within the approved scope.

## Review Requirement

Review required before done:

- Scope checked:
- Done criteria checked:
- Validation evidence checked:
- Platform/security/privacy impact checked:

## Memory Update Requirement

Memory update required:

- `.ai/brain/memory/implementation-history.md`:
- `.ai/brain/memory/open-decisions.md`:
- Sprint summary:
- Not needed because:

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `command` | Pass/Fail/Skipped | Key output or reason | Follow-up |
