# Impact Analysis Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-impact-analysis` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for impact analysis reports; does not define current project state. |
| domain | AI Brain impact analysis |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this before changing shared logic, navigation, persistence, API contracts, CI, security/privacy behavior, permissions, or release paths.

## Proposed Change

Describe the change.

## Affected Areas

| Area | Impact |
|---|---|
| Product | |
| iOS | |
| Android | |
| Web | |
| Domain logic | |
| Data | |
| Tests | |
| Security/privacy | |
| Release/build | |

## Compatibility

- Backward compatibility:
- Migration needed:
- Rollback path:

## Validation Plan

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

## Decision

- Proceed:
- Defer:
- Needs approval:
