# AI Brain Review Finding Registry

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-review-finding-registry` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Tracks accepted, deferred, rejected, and implemented review findings. |
| domain | AI Brain governance |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

## Purpose

Epic 1.5 review reports are advisory unless findings are accepted here. This registry converts selected recommendations into trackable AI Brain backlog items.

Do not treat a raw review recommendation as mandatory work until it appears in this registry with an accepted status.

## Status Values

| Status | Meaning |
| --- | --- |
| `proposed` | Finding exists in a review but is not accepted. |
| `accepted` | Finding is accepted into the backlog. |
| `in_progress` | Work has started. |
| `implemented` | Required work is complete and validated. |
| `deferred` | Accepted, but intentionally postponed. |
| `rejected` | Not accepted; keep rationale. |
| `superseded` | Replaced by another finding or decision. |

## Severity Values

- `Critical`: Must be addressed before AI Brain is the Epic 2 planning layer.
- `High`: Required for strong Epic 2 operation, but can follow Sprint 0.
- `Medium`: Important scale, automation, or quality improvement.
- `Low`: Helpful, non-blocking improvement.

## Registry

| ID | Severity | Status | Source | Finding | Owner/Area | Dependencies | Recommended Sprint | Evidence / Resolution |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `MGA-01` | Critical | implemented | `MASTER_GAP_ANALYSIS.md` | Authority and source-of-truth contract | AI Brain governance | None | Epic 2 Hardening Sprint 0 | Implemented by `.ai/brain/governance/source-of-truth-map.md` and README/startup updates. |
| `MGA-02` | Critical | implemented | `MASTER_GAP_ANALYSIS.md` | Generated artifact lifecycle and freshness model | AI Brain governance | `MGA-01` | Epic 2 Hardening Sprint 0 | Implemented by `.ai/brain/governance/artifact-lifecycle-policy.md` and context/index doc updates. |
| `MGA-03` | Critical | implemented | `MASTER_GAP_ANALYSIS.md` | Review finding registry | AI Brain governance | `MGA-01` | Epic 2 Hardening Sprint 0 | Implemented by this registry. |
| `MGA-04` | Critical | implemented | `MASTER_GAP_ANALYSIS.md` | Security boundary hardening | AI Brain governance/security | `MGA-01`, `MGA-02` | Epic 2 Hardening Sprint 0 | Implemented by `.ai/brain/governance/security-preflight.md`, automation checklist updates, and startup updates. |
| `MGA-05` | High | implemented | `MASTER_GAP_ANALYSIS.md` | AI Brain validation and health checks | AI Brain tooling | `MGA-01`, `MGA-02`, `MGA-03` | Epic 2 Hardening Sprint 1 | Implemented by `.ai/brain/governance/health-checks.md` and `npm run brain:health`. |
| `MGA-06` | High | implemented | `MASTER_GAP_ANALYSIS.md` | Structured retrieval contracts | AI Brain retrieval | `MGA-01`, `MGA-02` | Epic 2 Hardening Sprint 1 | Implemented by `.ai/brain/governance/retrieval-contracts.md`; JSON output implementation remains deferred. |
| `MGA-07` | High | implemented | `MASTER_GAP_ANALYSIS.md` | Memory integrity model | AI Brain memory | `MGA-01`, `MGA-03` | Epic 2 Hardening Sprint 1 | Implemented by `.ai/brain/governance/memory-integrity-model.md` and memory checklist updates; historical memory retrofit remains deferred. |
| `MGA-08` | High | implemented | `MASTER_GAP_ANALYSIS.md` | Agent-neutral core and adapters | AI Brain platform | `MGA-01`, `MGA-06` | Epic 2 Hardening Sprint 2 | Implemented by `.ai/brain/agent-start.md`, `.ai/brain/adapters/`, `.ai/brain/templates/agent-handoff-packet-template.md`, and `.ai/brain/planning/CERT_02_AGENT_NEUTRAL_CORE_ADAPTERS_REPORT.md`. |
| `MGA-09` | High | implemented | `MASTER_GAP_ANALYSIS.md` | Developer onboarding and workflow modes | Developer experience | `MGA-01` | Epic 2 Hardening Sprint 1 | Implemented by `.ai/brain/governance/developer-onboarding.md` and startup/index/README updates. |
| `MGA-10` | High | implemented | `MASTER_GAP_ANALYSIS.md` | Change-scope validation model | Validation | `MGA-01`, `MGA-05` | Epic 2 Hardening Sprint 2 | Implemented by `.ai/brain/governance/validation-profiles.md` and `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`. |
| `MGA-11` | Medium | implemented | `MASTER_GAP_ANALYSIS.md` | AI Brain tooling test coverage and metrics | AI Brain tooling | `MGA-05`, `MGA-06` | Epic 2 Hardening Sprint 2 | Implemented by `npm run brain:smoke`, `.ai/brain/scripts/smoke-check.mjs`, and `.ai/brain/planning/CERT_04_AI_BRAIN_SCRIPT_SMOKE_CHECKS_REPORT.md`. |
| `MGA-12` | Medium | implemented | `MASTER_GAP_ANALYSIS.md` | Automation safety and read-only scans | Automation governance | `MGA-02`, `MGA-03`, `MGA-04`, `MGA-05` | Before enabling automation | Implemented by `.ai/brain/governance/automation-activation-validation.md`, `npm run brain:automation:check`, smoke coverage, and `.ai/brain/planning/CERT_08_AUTOMATION_ACTIVATION_VALIDATION_REPORT.md`; no automation is enabled. |
| `MGA-13` | Medium | accepted | `MASTER_GAP_ANALYSIS.md` | Release and operations readiness evidence | Release/operations | Release strategy, native build path | Epic 2 Sprint 3 or later | Backlog item unless Epic 2 includes production release. |
| `MGA-14` | Medium | accepted | `MASTER_GAP_ANALYSIS.md` | Product, UX, data, and design knowledge capture | Knowledge management | `MGA-01`, product/design ownership | Epic 2 Sprint 2 or 3 | Backlog item for durable rationale capture. |
| `MGA-15` | Medium | deferred | `MASTER_GAP_ANALYSIS.md` | Future multi-repo and scale contracts | AI Brain scale | `MGA-01`, `MGA-06`, future multi-repo need | Later | Deferred until a second repository exists or is planned. |
| `MGA-16` | Low | deferred | `MASTER_GAP_ANALYSIS.md` | Visual architecture and troubleshooting aids | Developer experience | `MGA-09` | Epic 2 Sprint 2 or onboarding friction trigger | Deferred as `CERT-10`; first-hour onboarding and script docs cover current operational needs. |
| `MGA-17` | Low | deferred | `MASTER_GAP_ANALYSIS.md` | Search backend evolution | Retrieval/scale | `MGA-01`, `MGA-02`, `MGA-06`, measured scale pressure | Later | Defer SQLite FTS, embeddings, vector databases, and remote search. |
| `MGA-18` | Low | deferred | `MASTER_GAP_ANALYSIS.md` | Native release automation | Release engineering | Release plan, credentials, Expo/EAS or native strategy | Later release-readiness epic | Not an AI Brain Sprint 0 prerequisite. |

## Registry Maintenance Rules

- Add new accepted review findings here instead of scattering backlog state across review documents.
- Keep source review reports unchanged unless correcting factual errors.
- Mark findings `superseded` instead of deleting them.
- Use `rejected` only with a clear rationale.
- Review this registry before every Epic boundary and after each AI Brain hardening sprint.
- Do not use this registry to approve product scope, architecture decisions, release actions, credentials, or automation activation by itself.
