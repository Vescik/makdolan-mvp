# Goal Template: Test Hardening

Use this for adding or improving tests without changing intended product behavior.

## Objective

Harden tests for `[module/flow]` so that `[specific scenario or invariant]` is covered by `[test file or test suite]`.

## Done When

- New or updated tests cover the named scenario or invariant.
- Tests fail against the old broken or uncovered case when practical to demonstrate.
- Production behavior is unchanged unless explicitly allowed.
- The relevant test command and full validation command results are recorded.

## Validation Commands

```bash
npm test
npm run typecheck
npm run lint
npm run build:web
```

Add targeted checks:

```bash
# npm test -- path-or-pattern
```

## Allowed Scope

- Allowed test files:
- Allowed source files:
- Allowed docs:
- Allowed behavior changes:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

Default forbidden unless approved: product behavior changes, broad refactors, dependency changes, CI changes, secrets, deployment, database migrations, and generated output.

## Stop Conditions

- Stop if test hardening requires changing expected product behavior.
- Stop if the target behavior is not documented and cannot be inferred safely.
- Stop if the tests require unavailable services or credentials.
- Stop if adding tests exposes flaky timing, platform, or environment assumptions that need a separate fix.

## Review Requirement

Review required before done:

- Tests assert behavior, not implementation trivia.
- Test names describe the scenario.
- Failure mode is meaningful.
- Full validation or justified narrowed validation is recorded.

## Memory Update Requirement

Update `.ai/brain/memory/implementation-history.md` when test coverage changes release confidence, validation policy, or known risk. Update `.ai/brain/knowledge/testing-map.md` only if validation guidance changes.

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `npm test` |  |  |  |
| `npm run typecheck` |  |  |  |
| `npm run lint` |  |  |  |
| `npm run build:web` |  |  |  |
