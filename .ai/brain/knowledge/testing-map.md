# Testing Map

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-testing-map` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides the compact validation command map; detailed validation profiles are defined in `.ai/brain/governance/validation-profiles.md`. |
| domain | Validation |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

Use this map to choose validation commands quickly. For profile details, escalation triggers, skipped-check wording, and evidence expectations, use `../governance/validation-profiles.md`.

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

## Scope-Based Validation Summary

| Change scope | Profile | Expected validation summary |
|---|---|---|
| Docs only | Docs-Only | `git diff --check`; app checks may be skipped only with the standard profile wording. |
| AI Brain governance | AI Brain Governance | `npm run brain:health`, `npm run brain:index`, `git diff --check`; use full gate for meaningful governance changes. |
| Domain logic | Domain Logic | Relevant Vitest tests, `npm test`, typecheck, `git diff --check`; escalate when shared/user-facing. |
| UI/screens | UI/Screens | Typecheck, lint, tests, web build, diff hygiene, responsive smoke when layout changes. |
| Navigation/routes | Navigation/Routes | Typecheck, lint, web build, diff hygiene, route smoke when routes change. |
| Scripts/tooling | Scripts/Tooling | Syntax check changed scripts, run representative safe smoke command, diff hygiene, full gate for validation/package-script changes. |
| Security/privacy | Security/Privacy | Security preflight, secret/log review without secret values, `npm run brain:health`, diff hygiene, full gate when app/scripts changed. |
| Release-sensitive | Release-Sensitive | Explicit approval, rollback/recovery note, `bash scripts/diff-gate.sh`, and release-specific validation before deployment. |
| Broad or uncertain | Full Confidence Gate | `bash scripts/diff-gate.sh` plus any AI Brain or release checks the task requires. |

## Platform Notes

- Web has a production export command: `npm run build:web`.
- iOS and Android currently use Expo dev start commands only.
- No native `ios/` or `android/` folders were present during AI Brain Phase 0 discovery.
