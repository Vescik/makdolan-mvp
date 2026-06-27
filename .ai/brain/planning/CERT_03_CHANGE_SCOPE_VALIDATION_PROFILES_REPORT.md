# CERT-03 Change-Scope Validation Profiles Report

Metadata:

| Field | Value |
| --- | --- |
| id | `cert-03-change-scope-validation-profiles-report` |
| class | `memory` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Records completion evidence for CERT-03; certification backlog remains the status source. |
| domain | AI Brain validation |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Report ID: `MAKDOLAN::AI-BRAIN::CERT-03::CHANGE-SCOPE-VALIDATION-PROFILES-REPORT`

Date: 2026-06-27

Status: Complete.

## Objective

Complete `CERT-03: Add Change-Scope Validation Profiles` by formalizing validation profiles that map change scope to required commands, escalation triggers, skipped-check wording, and completion evidence.

## Scope

Implemented docs/governance hardening only.

No app behavior, package dependency, CI behavior, release automation, remote service, MCP server, embedding, vector database, credential, auth, payment, database, deployment, or automation behavior was introduced.

## Phase Completion

| Phase | Status | Evidence |
| --- | --- | --- |
| Phase 0: Discovery and impact | Complete | Used `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_PLAN.md` and existing impact artifact `.ai/brain/context-packs/2026-06-26T22-59-12-478Z-impact-cert-03-change-scope-validation-profiles.md`. |
| Phase 1: Canonical validation profiles | Complete | Added `.ai/brain/governance/validation-profiles.md` with all required profiles. |
| Phase 2: Entrypoint references | Complete | Updated `AGENTS.md`, `.ai/brain/knowledge/testing-map.md`, `.ai/brain/governance/developer-onboarding.md`, `.ai/brain/governance/source-of-truth-map.md`, `.ai/brain/README.md`, and `.ai/brain/index/README.md`. |
| Phase 3: Certification closeout | Complete | Updated certification backlog, memory, report, and regenerated AI Brain index. |

## Completed Acceptance Criteria

- Docs-only profile exists.
- AI Brain governance profile exists.
- Domain logic profile exists.
- UI/screens profile exists.
- Navigation/routes profile exists.
- Scripts/tooling profile exists.
- Security/privacy profile exists.
- Release-sensitive profile exists.
- Full confidence gate profile exists.
- Every profile includes commands, when to use, when to escalate, skipped-check wording, and evidence expectations.
- `AGENTS.md` references the validation profiles.
- `.ai/brain/knowledge/testing-map.md` references the validation profiles.
- AI Brain entrypoints make the profile document discoverable.
- `CERT-03` is marked implemented in `.ai/brain/certification/CERTIFICATION_BACKLOG.md`.

## Changed Files

- `.ai/brain/governance/validation-profiles.md`
- `AGENTS.md`
- `.ai/brain/knowledge/testing-map.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/developer-onboarding.md`
- `.ai/brain/README.md`
- `.ai/brain/index/README.md`
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`
- `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`
- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`

## Validation Evidence

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run brain:health` | PASS | Pre-closeout governance health check passed with 0 errors and 0 warnings; generated-text secret scan covered 104 files. |
| `git diff --check` | PASS | Pre-closeout diff hygiene passed. |
| `rg -n "validation-profiles\|Validation Profiles\|Docs-Only\|AI Brain Governance\|Full Confidence Gate" ...` | PASS | Confirmed profile definitions and entrypoint references. |
| `npm run brain:index` | PASS | Regenerated AI Brain index; indexed 227 files across 70 directories. |
| `npm run brain:search -- "validation profiles" --limit=5` | PASS | Top matches included implementation memory, CERT-03 impact report, `.ai/brain/knowledge/testing-map.md`, and `.ai/brain/README.md`, which reference `.ai/brain/governance/validation-profiles.md`. |
| `npm run brain:health` | PASS | Report-only health check passed with 0 errors and 0 warnings; generated-text secret scan covered 105 files. |
| `git diff --check` | PASS | Diff hygiene passed after index regeneration. |
| `bash scripts/diff-gate.sh` | PASS | Ran 7 validation commands: diff hygiene, staged diff hygiene, untracked hygiene, typecheck, lint, tests, and web build. Tests passed: 4 files, 28 tests. Web export completed to `dist/`. |

## Remaining Risks

- The profile system is currently documentation-only. It improves consistency but does not enforce command selection automatically.
- Direct `brain:search` scope still does not scan `.ai/brain/governance/` or `.ai/brain/planning/` directly; certification/planning/search coverage remains part of `CERT-06`.
- Native production validation remains outside local validation because the repository has no checked-in `ios/` or `android/` native project folders.

## Next Recommended Action

Proceed to the next open certification condition after final validation and commit:

- `CERT-04`: Add AI Brain script tests and smoke checks.
- `CERT-08`: Keep automation report-only until activation validation exists.
