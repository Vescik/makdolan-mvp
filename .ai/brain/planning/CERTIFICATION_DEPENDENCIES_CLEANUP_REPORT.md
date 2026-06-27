# Certification Dependencies Cleanup Report

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-certification-dependencies-cleanup-report` |
| class | `advisory` |
| owner | AI Brain maintainers |
| status | `superseded` |
| authority | Historical cleanup report; superseded by the clean certification recheck and current certification backlog. |
| domain | AI Brain certification |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |
| superseded_by | `.ai/brain/certification/EPIC1_CLEAN_CERTIFICATION_RECHECK.md` |

Date: 2026-06-27

Supersession note: This report recorded an intermediate cleanup state. The current certification decision is `CERTIFIED` in `.ai/brain/certification/EPIC1_CLEAN_CERTIFICATION_RECHECK.md`, `.ai/brain/certification/EPIC1_CERTIFICATION_REPORT.md`, `.ai/brain/certification/EPIC2_READINESS_CERTIFICATE.md`, and `.ai/brain/certification/CERTIFICATION_BACKLOG.md`.

## Scope

This cleanup reviewed remaining AI Brain certification dependencies after `CERT-01` through `CERT-04` were implemented.

No application behavior, release behavior, remote service, MCP server, embeddings, vector database, cloud workflow, credential workflow, dependency behavior, or automation activation was changed.

## Sources Reviewed

- `AGENTS.md`
- `.ai/brain/README.md`
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`
- `.ai/brain/certification/EPIC1_CERTIFICATION_REPORT.md`
- `.ai/brain/certification/EPIC2_READINESS_CERTIFICATE.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/governance/health-checks.md`
- `.ai/brain/governance/retrieval-contracts.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/scripts/README.md`
- `.ai/brain/scripts/search-brain.mjs`
- `.ai/brain/scripts/health-check.mjs`
- `.ai/brain/scripts/smoke-check.mjs`
- Prior hardening and certification planning reports under `.ai/brain/planning/`

Discovery also ran:

- `npm run brain:health`
- `npm run brain:search -- "certification dependency" --limit=8`
- `npm run brain:impact -- "certification dependency cleanup"`
- `rg` over certification, planning, reviews, governance, knowledge, scripts, `AGENTS.md`, and `package.json`

## Findings

| ID | Classification | Evidence | Cleanup Decision |
| --- | --- | --- | --- |
| `CERT-01` | Implemented | Completion report and backlog evidence show runtime/as-of freshness handling. | No action. |
| `CERT-02` | Implemented | Agent-neutral startup/adapters and completion report exist. | No action. |
| `CERT-03` | Implemented | Validation profiles and completion report exist. | No action. |
| `CERT-04` | Implemented | `npm run brain:smoke` and completion report exist. | No action. |
| `CERT-05` | Accepted non-blocking condition | Memory integrity model exists; helper enforcement and historical retrofit remain absent. Current memory volume is small and canonical docs remain authoritative. | Keep tracked. Implement before memory becomes large, heavily shared, or authoritative for planning. |
| `CERT-06` | Partially implemented | Discovery confirmed direct `brain:search` found certification content mostly through generated index artifacts. | Expanded direct search/health scope for agent startup, adapters, certification, governance, planning, and review docs. Template metadata/reference validation remains open. |
| `CERT-07` | Deferred | Current repository is still single-repo; registry already deferred `MGA-15`. | Keep deferred until a second repository exists or is planned. |
| `CERT-08` | Accepted non-blocking condition | Automation activation validation is absent, but no automation is being enabled and current policy keeps automation report-only. | Keep as blocking precondition before any automation activation. Registry `MGA-12` moved to deferred until activation is requested. |
| `CERT-09` | Deferred | Architecture rationale exists across certification/source-of-truth/lifecycle/retrieval/validation docs; compact ADR still useful but non-blocking. | Defer to normal Epic 2 architecture documentation. |
| `CERT-10` | Deferred | First-hour onboarding, command cheat sheet, workflow modes, and script docs exist; visual aid is helpful but not blocking. | Defer to normal Epic 2 developer experience work. Registry `MGA-16` moved to deferred. |

## Implemented Cleanup

1. Direct search scope now includes:
   - `.ai/brain/agent-start.md`
   - `.ai/brain/adapters/`
   - `.ai/brain/certification/`
   - `.ai/brain/governance/`
   - `.ai/brain/planning/`
   - `.ai/brain/reviews/`

2. Health-check metadata scope now includes:
   - Agent startup docs.
   - Adapter docs.
   - Certification docs.
   - Validation profiles.

3. Generated-text secret scan scope now includes:
   - Adapter docs.
   - Certification docs.
   - `.ai/brain/agent-start.md`.

4. Smoke-check fixtures now match the broader health metadata requirements.

5. Certification backlog now includes:
   - A status model.
   - A certification dependency index with severity, status, owner/area, source report, dependencies, evidence, and next action.
   - Explicit resolution state for `CERT-05` through `CERT-10`.

6. Epic 2 readiness certificate now reflects satisfied, partial, and accepted non-blocking conditions.

7. Review finding registry now classifies:
   - `MGA-12` as deferred until automation activation is requested.
   - `MGA-16` as deferred until normal Epic 2 DX work or onboarding friction justifies it.

## Remaining Conditions

### Accepted Non-Blocking

| ID | Why Accepted | Trigger That Makes It Blocking |
| --- | --- | --- |
| `CERT-05` | Current memory remains secondary to canonical docs and is not yet large enough to justify retroactive enforcement work. | Memory becomes large, heavily shared, or treated as authoritative planning input. |
| `CERT-08` | No automation is being enabled; existing policy keeps automation report-only. | Any request to enable automation, scheduled mutation, repo-writing workflow, dependency automation, release automation, credential workflow, or autonomous remediation. |

### Partial

| ID | Completed | Still Missing |
| --- | --- | --- |
| `CERT-06` | Certification, governance, planning, review, adapter, and startup docs are now directly searched/scanned. | Template metadata backfill or grandfathering rule; local path/reference validation or explicit manual policy. |

### Deferred

| ID | Deferred Until |
| --- | --- |
| `CERT-07` | A second repository exists or is planned. |
| `CERT-09` | Normal Epic 2 architecture documentation work. |
| `CERT-10` | Normal Epic 2 developer experience work or evidence of onboarding friction. |

## Readiness Result

AI Brain remains **CERTIFIED WITH CONDITIONS**.

Evidence supports proceeding with Epic 2 planning because:

- Critical and high implementation conditions `CERT-01` through `CERT-04` are implemented.
- The remaining High condition, `CERT-08`, is trigger-gated and no automation is being enabled.
- Direct discovery of certification dependencies is improved through local search and health-check scope.
- Remaining gaps are explicit, classified, and tied to concrete future triggers.

AI Brain is not yet unconditionally certified because:

- Memory enforcement is not complete.
- Template metadata/reference validation is not complete.
- Automation activation validation is not implemented.
- Multi-repo trigger criteria are not defined.
- ADR and visual troubleshooting aids remain deferred improvements.

## Validation Evidence

| Command | Result | Key Output |
| --- | --- | --- |
| `node --check .ai/brain/scripts/search-brain.mjs` | PASS | Script parsed successfully. |
| `node --check .ai/brain/scripts/health-check.mjs` | PASS | Script parsed successfully. |
| `node --check .ai/brain/scripts/smoke-check.mjs` | PASS | Script parsed successfully. |
| `npm run brain:smoke` | PASS | Six smoke groups passed: context, index, search, impact, health, memory. |
| `npm run brain:health` | PASS | 0 errors, 0 warnings, 116 scanned files after final report, memory, and generated-artifact cleanup. |
| `npm run brain:index` | PASS | Indexed 230 files across 70 directories. |
| `npm run brain:search -- "certification dependency" --limit=8` | PASS | Top direct matches include `.ai/brain/certification/CERTIFICATION_BACKLOG.md`, `.ai/brain/memory/implementation-history.md`, and this cleanup report. |
| `npm run brain:impact -- "certification dependency cleanup"` | PASS | Generated `.ai/brain/context-packs/2026-06-27T09-22-25-475Z-impact-certification-dependency-cleanup.md`. |
| `git diff --check` | PASS | No whitespace errors. |
| `npm run typecheck` | PASS | `tsc --noEmit` completed successfully. |
| `npm run lint` | PASS | `eslint .` completed successfully. |
| `npm run test` | PASS | 4 test files and 28 tests passed. |
| `npm run build:web` | PASS | Expo web export completed to `dist/`; output printed `.env.local` and environment variable names only. |
| `bash scripts/diff-gate.sh` | PASS | Full local gate completed after final report, memory, and index updates. |
