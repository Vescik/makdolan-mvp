# CERT-04 AI Brain Script Smoke Checks Report

Metadata:

| Field | Value |
| --- | --- |
| id | `cert-04-ai-brain-script-smoke-checks-report` |
| class | `memory` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Records completion evidence for CERT-04; certification backlog remains the status source. |
| domain | AI Brain tooling |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Report ID: `MAKDOLAN::AI-BRAIN::CERT-04::SCRIPT-SMOKE-CHECKS-REPORT`

Date: 2026-06-27

Status: Complete.

## Objective

Complete `CERT-04: Add AI Brain Script Tests And Smoke Checks` by adding deterministic local smoke coverage for AI Brain helper scripts without adding dependencies, changing app behavior, or enabling automation.

## Scope

Implemented local AI Brain tooling validation only.

No app behavior, package dependency, CI behavior, release automation, remote service, MCP server, embedding, vector database, credential, auth, payment, database, deployment, or automation behavior was introduced.

## Phase Completion

| Phase | Status | Evidence |
| --- | --- | --- |
| Discovery and impact | Complete | Ran `npm run brain:impact -- "CERT-04 AI Brain script smoke checks"`, producing `.ai/brain/context-packs/2026-06-27T09-08-39-422Z-impact-cert-04-ai-brain-script-smoke-checks.md`. |
| Registry preflight | Complete | Updated `MGA-08` and `MGA-10` from `accepted` to `implemented` with existing CERT-02 and CERT-03 evidence. |
| Smoke runner | Complete | Added `.ai/brain/scripts/smoke-check.mjs` and `npm run brain:smoke`. |
| Documentation | Complete | Updated `.ai/brain/scripts/README.md` with `brain:smoke` usage, coverage, isolation behavior, and failure behavior. |
| Certification closeout | Complete | Updated registry, certification backlog, memory, report, and regenerated AI Brain index. |

## Completed Acceptance Criteria

- `brain:index` smoke coverage exists.
- `brain:search` smoke coverage exists.
- `brain:impact` smoke coverage exists.
- `brain:context` smoke coverage exists.
- `brain:health` smoke coverage exists.
- `brain:memory:update` smoke coverage exists.
- Argument parsing checks exist.
- Output path checks exist.
- Generated output shape checks exist.
- Exclusion-rule checks exist.
- Duplicate-refusal checks exist.
- Expected-failure checks exist.
- At least one search-quality smoke query exists.
- Command documentation and validation evidence are recorded.

## Changed Files

- `.ai/brain/scripts/smoke-check.mjs`
- `package.json`
- `.ai/brain/scripts/README.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`
- `.ai/brain/planning/CERT_04_AI_BRAIN_SCRIPT_SMOKE_CHECKS_REPORT.md`
- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`
- `.ai/brain/context-packs/2026-06-27T09-08-39-422Z-impact-cert-04-ai-brain-script-smoke-checks.md`

## Validation Evidence

| Command | Result | Evidence |
| --- | --- | --- |
| `node --check .ai/brain/scripts/smoke-check.mjs` | PASS | Script syntax check completed without output. |
| `npm run brain:smoke` | PASS | Six smoke groups passed: context, index, search, impact, health, and memory. |
| `npm run lint` | PASS | ESLint completed successfully after adding the smoke runner. |
| `git diff --check` | PASS | Diff hygiene passed after initial smoke-runner implementation. |
| `npm run brain:index` | PASS | Regenerated AI Brain index; indexed 229 files across 70 directories. |
| `npm run brain:search -- "AI Brain script smoke checks" --limit=5` | PASS | Top matches included implementation memory, CERT-04 impact report, and generated index references. |
| `npm run brain:health` | PASS | Report-only health check passed with 0 errors and 0 warnings; generated-text secret scan covered 107 files. |
| `git diff --check` | PASS | Diff hygiene passed after index regeneration. |
| `bash scripts/diff-gate.sh` | PASS | Ran 7 validation commands: diff hygiene, staged diff hygiene, untracked hygiene, typecheck, lint, tests, and web build. Tests passed: 4 files, 28 tests. Web export completed to `dist/`. |

## Remaining Risks

- Smoke checks are local deterministic smoke coverage, not exhaustive unit tests for every branch.
- The smoke runner validates script contracts through fixture repositories; it does not replace full repository validation.
- Direct `brain:search` scope still has known gaps tracked under `CERT-06`.

## Next Recommended Action

Proceed to the next open High certification condition after final validation and commit:

- `CERT-08`: Keep automation report-only until activation validation exists.
