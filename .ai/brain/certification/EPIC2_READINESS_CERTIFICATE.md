# Epic 2 Readiness Certificate

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-epic2-readiness-certificate` |
| class | `canonical` |
| owner | Architecture Review Board |
| status | `active` |
| authority | Defines the current Epic 2 readiness certification decision and certification conditions for AI Brain. |
| domain | AI Brain certification |
| created | 2026-06-26 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Certificate ID: `MAKDOLAN::AI-BRAIN::EPIC2::READINESS-CERTIFICATE`

Date: 2026-06-27

Decision: **CERTIFIED**

Certified system: AI Brain repository-local SDLC intelligence platform.

Certified scope: Use AI Brain as the foundation for Epic 2 discovery, planning, impact analysis, goal contracts, review preparation, validation routing, memory updates, and governance.

Excluded scope: Autonomous mutation, remote services, vector databases, embeddings, MCP servers, cloud dependencies, release automation, credential operations, deployment, production data operations, and multi-repo orchestration.

## Certification Statement

AI Brain is certified to become the primary SDLC intelligence platform for Makdolan Epic 2 within the certified scope above.

The platform is ready because it has:

- A top-level operating contract in `AGENTS.md`.
- A clear AI Brain purpose and directory map in `.ai/brain/README.md`.
- A startup workflow in `.ai/brain/knowledge/agent-session-start.md`.
- A source-of-truth and file classification model in `.ai/brain/governance/source-of-truth-map.md`.
- A generated artifact lifecycle policy in `.ai/brain/governance/artifact-lifecycle-policy.md`.
- A review finding registry in `.ai/brain/governance/review-finding-registry.md`.
- A security preflight and automation activation checklist in `.ai/brain/governance/security-preflight.md`.
- A local health check in `.ai/brain/governance/health-checks.md` and `.ai/brain/scripts/health-check.mjs`.
- Retrieval contracts in `.ai/brain/governance/retrieval-contracts.md`.
- A memory integrity model in `.ai/brain/governance/memory-integrity-model.md`.
- A first-hour developer guide and workflow modes in `.ai/brain/governance/developer-onboarding.md`.
- Deterministic local helper scripts documented in `.ai/brain/scripts/README.md`.
- Prior Sprint 0 and Sprint 1 readiness rechecks with `PASS WITH MINOR GAPS` verdicts.
- Implemented certification conditions `CERT-01` through `CERT-06` and `CERT-08`.
- Explicit future-trigger deferrals for multi-repo support, ADR, and visual troubleshooting aids that do not block current Epic 2 planning.

## Certification Conditions

All required certification conditions for the current Epic 2 planning scope are satisfied:

1. Satisfied on 2026-06-27: fix health-check date handling before relying on freshness results after 2026-06-26.
2. Satisfied on 2026-06-27: complete agent-neutral core/adapters before broad multi-agent handoff.
3. Satisfied on 2026-06-27: add scoped validation profiles before scaling Epic 2 change volume.
4. Satisfied on 2026-06-27: add AI Brain script tests and smoke checks before treating helper outputs as stable contracts.
5. Satisfied on 2026-06-27: strengthen memory enforcement, with historical memory explicitly grandfathered.
6. Satisfied on 2026-06-27: backfill template metadata and add docs/certification reference validation.
7. Satisfied on 2026-06-27: keep automation report-only until activation validation and human approval are in place.

Deferred future-trigger items remain tracked in `.ai/brain/certification/CERTIFICATION_BACKLOG.md`, but they are not certification blockers for the current single-repo Epic 2 planning scope:

- `CERT-07`: implement before creating or onboarding a second repository.
- `CERT-09`: add ADR during normal Epic 2 architecture documentation work.
- `CERT-10`: add visual architecture/troubleshooting aids when onboarding friction or documentation scale requires them.

## Approved Usage

AI Brain may be used for Epic 2:

- As the planning layer.
- As a discovery and context retrieval layer.
- As a goal-contract and workflow control layer.
- As a source-of-truth resolver.
- As a review finding and hardening backlog tracker.
- As a memory and decision recall layer.
- As a validation evidence router.

## Restricted Usage

This certificate does not approve:

- Autonomous remediation.
- Autonomous dependency changes.
- Autonomous CI/release/deployment changes.
- Autonomous credential or secret handling.
- Production incident response without human review.
- Multi-repo federation.
- Tool-agnostic agent orchestration beyond the implemented neutral core, Codex adapter, and generic Markdown-reading agent adapter.

## Evidence Summary

| Evidence | Result |
| --- | --- |
| Sprint 0 report | Critical governance items completed. |
| Sprint 0 readiness recheck | `PASS WITH MINOR GAPS`. |
| Sprint 1 report | Health, retrieval, memory, and onboarding items completed. |
| Sprint 1 readiness recheck | `PASS WITH MINOR GAPS`. |
| Review finding registry | Critical items implemented; Sprint 2 items accepted. |
| Certification backlog | No open Critical, High, Medium, or Low certification blockers for current scope; future-trigger deferrals are tracked separately. |
| Health check | Available as `npm run brain:health`; final certification run passed. |
| Smoke checks | Available as `npm run brain:smoke`; final certification run passed with seven smoke groups. |
| Automation activation validation | Available as `npm run brain:automation:check`; CERT-08 implemented without enabling automation. |
| Full validation gate | Final certification run passed `bash scripts/diff-gate.sh`. |

## Expiry And Review

Review this certificate before:

- Starting a new Epic after Epic 2.
- Enabling any automation.
- Adding a second repository.
- Introducing remote retrieval, MCP, embeddings, vector databases, or cloud dependencies.
- Promoting AI Brain from planning support to autonomous execution support.

Certificate status: **Active certified**
