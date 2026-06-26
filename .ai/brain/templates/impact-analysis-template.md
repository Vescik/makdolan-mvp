# Impact Analysis Template

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
