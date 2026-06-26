# Goal Template: Feature Implementation

Use this for a scoped product or developer-facing feature.

## Objective

Implement `[feature name]` so that `[specific user/developer]` can `[specific action]` in `[specific screen/module/workflow]`.

## Done When

- `[file or route]` supports `[specific behavior]`.
- Relevant state, validation, and error/empty states are covered.
- Existing behavior outside `[named scope]` is unchanged.
- Tests or documented validation cover the new behavior.

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
- Allowed docs/tests:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

Default forbidden unless approved: dependencies, CI, secrets, deployment, payments, authentication, database migrations, and generated build output.

## Stop Conditions

- Stop if the feature requires a product decision not already approved.
- Stop if native iOS/Android behavior differs and no platform rule exists.
- Stop if implementation needs a new dependency or external API.
- Stop if validation cannot cover the changed behavior.

## Review Requirement

Review required before done:

- User flow matches product docs and acceptance criteria.
- iOS, Android, and Web impact is addressed.
- Accessibility and responsive behavior are considered for UI changes.
- Security/privacy impact is noted.
- Validation evidence is present.

## Memory Update Requirement

Update `.ai/brain/memory/implementation-history.md` after completion. Update `.ai/brain/memory/open-decisions.md` if any decision is deferred. Update `knowledge-base/` only if the feature creates durable product or architecture facts.

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `npm run typecheck` |  |  |  |
| `npm test` |  |  |  |
| `npm run lint` |  |  |  |
| `npm run build:web` |  |  |  |
