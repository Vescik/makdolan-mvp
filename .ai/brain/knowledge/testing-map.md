# Testing Map

Use this map to choose validation commands.

## Primary Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

## Helper Command

```bash
bash scripts/verify-local.sh
```

The helper detects Node projects and runs available scripts in this order: lint, typecheck, test, build.

## Scope-Based Validation

| Change scope | Expected validation |
|---|---|
| Domain logic | Relevant Vitest tests, full `npm test`, typecheck. |
| UI/screens | Typecheck, tests where available, lint, web build, manual responsive smoke if running the app. |
| Navigation/routes | Typecheck, lint, web build, route smoke check. |
| Docs only | Required-file/content check, `git diff --check`; app checks may be skipped with explanation. |
| CI/scripts | Run or dry-run changed scripts where safe; inspect workflow syntax and explain unavailable credentials. |
| Security/privacy | Negative-path review, log/secret review, relevant tests. |

## Platform Notes

- Web has a production export command: `npm run build:web`.
- iOS and Android currently use Expo dev start commands only.
- No native `ios/` or `android/` folders were present during AI Brain Phase 0 discovery.
