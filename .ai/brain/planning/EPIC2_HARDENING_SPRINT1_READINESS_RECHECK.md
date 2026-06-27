# Epic 2 Hardening Sprint 1 Readiness Recheck

Review ID: `MAKDOLAN::AI-BRAIN::EPIC2-HARDENING::SPRINT1-READINESS-RECHECK`

Date: 2026-06-26

Role: Independent AI Brain governance reviewer

Verdict: **PASS WITH MINOR GAPS**

## Scope

This recheck reviewed whether Epic 2 Hardening Sprint 1 truly completed the requested backlog:

- `MGA-05`: AI Brain validation and health checks.
- Generated-text secret scan workflow.
- Metadata backfill strategy.
- Review finding registry validation.
- Generated artifact freshness checks.
- `MGA-06`: Structured retrieval contracts.
- `MGA-07`: Memory integrity model.
- `MGA-09`: Developer onboarding and workflow modes.

No product implementation or application behavior changes were made as part of this recheck. This document is advisory review output.

## Sources Reviewed

- `.ai/brain/planning/EPIC2_HARDENING_SPRINT1_REPORT.md`
- `.ai/brain/planning/EPIC2_HARDENING_SPRINT0_READINESS_RECHECK.md`
- `.ai/brain/reviews/MASTER_GAP_ANALYSIS.md`
- `.ai/brain/governance/health-checks.md`
- `.ai/brain/scripts/health-check.mjs`
- `.ai/brain/governance/retrieval-contracts.md`
- `.ai/brain/governance/memory-integrity-model.md`
- `.ai/brain/governance/developer-onboarding.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/security-preflight.md`
- `.ai/brain/memory/memory-update-checklist.md`
- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/index/README.md`
- `.ai/brain/scripts/README.md`
- `AGENTS.md`
- `package.json`

## Verdict Rationale

Sprint 1 materially completed the requested hardening backlog. The new health-check command exists, the governance documents are present, the review registry marks the Sprint 1 `MGA-*` items as implemented, and the main startup/onboarding paths now reference the new operating model.

The verdict is not a clean `PASS` because several Sprint 1 outputs are intentionally lightweight or contract-first:

- `brain:search` and `brain:impact` still do not emit structured JSON output; Sprint 1 defines the contract and defers implementation.
- The memory integrity model is defined, but historical memory entries and the memory update helper are not yet fully governed by the new status/provenance shape.
- Template metadata expectations are defined but not fully backfilled.
- `.ai/brain/scripts/health-check.mjs` pins `TODAY` to `2026-06-26`, which means future freshness checks will not naturally age unless the script is updated.

These gaps do not invalidate Sprint 1, but they should be addressed before AI Brain relies on health checks as a durable long-term gate.

## Backlog Recheck

| Item | Status | Objective evidence | Missing items | Risk |
| --- | --- | --- | --- | --- |
| `MGA-05` AI Brain validation and health checks | **Pass with minor gap** | `.ai/brain/governance/health-checks.md` defines scope, result semantics, metadata validation, registry validation, freshness validation, and generated-text secret scanning. `package.json` adds `npm run brain:health`, backed by `.ai/brain/scripts/health-check.mjs`. Sprint 1 report records `npm run brain:health` as `PASS` with zero warnings and 94 scanned text files. | Health check scope is intentionally fixed and lightweight. The script uses a hard-coded `TODAY = 2026-06-26`, so future freshness aging will be inaccurate. | Medium. The command is useful today, but the fixed date can hide stale context packs and planning artifacts after Sprint 1. |
| Generated-text secret scan workflow | **Pass** | `.ai/brain/governance/health-checks.md` defines local text scan scope across AI Brain context packs, governance, index, knowledge, memory, planning, reviews, docs, project context, knowledge-base, `AGENTS.md`, and `README.md`. `.ai/brain/scripts/health-check.mjs` defines text scan roots and common OpenAI, GitHub, AWS, Slack, and private-key patterns. The documented workflow says not to quote secret values and to rotate credentials if exposure is plausible. | No Sprint 1-blocking missing item. The scan is pattern-based and does not prove absence of every possible secret. | Low to medium. Pattern scans can produce false negatives and false positives, but this is acceptable for a local report-only hardening step. |
| Metadata backfill strategy | **Pass with minor gap** | `.ai/brain/governance/health-checks.md` defines required metadata fields: `id`, `class`, `owner`, `status`, `authority`, `domain`, `created`, `last_reviewed`, and `review_after`. Sprint 1 report states metadata was applied to `.ai/brain/README.md`, `.ai/brain/knowledge/*.md`, and current `.ai/brain/governance/*.md`. `.ai/brain/governance/source-of-truth-map.md` now includes archive and template metadata expectations. | Template metadata expectations are defined but not fully backfilled. Metadata validation does not yet cover every possible canonical-like file in the repository. | Low. Core AI Brain docs are covered; broader template and legacy coverage can be completed without blocking Sprint 2. |
| Review finding registry validation | **Pass** | `.ai/brain/governance/review-finding-registry.md` marks `MGA-05`, `MGA-06`, `MGA-07`, and `MGA-09` as `implemented`. `.ai/brain/scripts/health-check.mjs` includes registry validation for `MGA-*` row shape, severity, status, source review, finding, owner/area, dependencies, recommended sprint, and evidence/resolution. | No Sprint 1-blocking missing item. Cross-document proof that every implemented finding's evidence file exists is not yet exhaustive. | Low. The registry is materially more governable than Sprint 0 and is sufficient for Sprint 1. |
| Generated artifact freshness checks | **Pass with minor gap** | `.ai/brain/governance/health-checks.md` defines freshness validation for required generated index outputs, stale or expired context packs, filename date inference, and planning reports with missing date/generated metadata near the top. `.ai/brain/scripts/health-check.mjs` implements freshness checks and Sprint 1 report records a passing run. | Freshness age calculation is tied to the hard-coded `TODAY` value in the script. It should use runtime date or an explicit `--as-of` option. | Medium. Current checks pass, but the long-term value of freshness validation depends on fixing date handling. |
| `MGA-06` Structured retrieval contracts | **Pass with minor gap** | `.ai/brain/governance/retrieval-contracts.md` defines a shared retrieval record shape, command contracts for `brain:index`, `brain:search`, `brain:impact`, and `brain:context`, retrieval profiles, and quality rules. It explicitly preserves local-first operation and defers vector DBs, embeddings, MCP resources, and remote search. | JSON output for `brain:search` and `brain:impact` remains deferred. Authority-aware ranking is also deferred. | Medium. The architecture contract exists, but agents still consume human-readable retrieval output until later implementation work. |
| `MGA-07` Memory integrity model | **Pass with minor gap** | `.ai/brain/governance/memory-integrity-model.md` defines memory classes, statuses `active`, `resolved`, `superseded`, `archived`, `needs-review`, provenance fields, recommended entry shapes, and integrity rules. `.ai/brain/memory/memory-update-checklist.md` now references the model and tells agents to run `npm run brain:health` after meaningful AI Brain changes. | Historical memory entries were not rewritten to the new shape. The memory update helper does not appear to enforce status/provenance fields yet. | Low to medium. New memory has clearer guidance; old memory can still drift or conflict until retrofit/enforcement is added. |
| `MGA-09` Developer onboarding and workflow modes | **Pass** | `.ai/brain/governance/developer-onboarding.md` defines a first-hour developer guide, command cheat sheet, and task-size workflow modes for tiny, small, medium, major, and security/release-sensitive work. References were added in `AGENTS.md`, `.ai/brain/README.md`, `.ai/brain/knowledge/agent-session-start.md`, `.ai/brain/index/README.md`, and `.ai/brain/scripts/README.md`. | No Sprint 1-blocking missing item. | Low. The path is readable and discoverable enough for new developers and agents. |

## Cross-Cutting Evidence

### Discoverability

The Sprint 1 outputs are wired into the main AI Brain entry points:

- `AGENTS.md` references `npm run brain:health`, task-size workflow modes, retrieval contracts, and the memory integrity model.
- `.ai/brain/README.md` links health checks, retrieval contracts, memory integrity, and onboarding.
- `.ai/brain/knowledge/agent-session-start.md` includes `npm run brain:health` and directs agents to onboarding, retrieval, and memory governance.
- `.ai/brain/index/README.md` lists the new governance docs in the AI Brain index.
- `.ai/brain/scripts/README.md` documents `npm run brain:health`.

### Registry State

`.ai/brain/governance/review-finding-registry.md` now records:

- `MGA-05`: `implemented`
- `MGA-06`: `implemented`
- `MGA-07`: `implemented`
- `MGA-09`: `implemented`

The registry also keeps `MGA-08`, `MGA-10`, and `MGA-11` open for later hardening, which matches the remaining gaps listed in the Sprint 1 report.

### Validation Evidence From Sprint 1

The Sprint 1 completion report records:

- `npm run brain:health`: PASS, zero warnings, 94 scanned text files.
- `npm run brain:index`: PASS, 212 files across 68 directories.
- `npm run brain:search -- "security preflight"`: PASS.
- `npm run brain:impact -- "AI Brain health check"`: PASS.
- `git diff --check`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run test`: PASS, 28 tests.
- `npm run build:web`: PASS.
- `bash scripts/diff-gate.sh`: PASS.

This recheck did not rerun the full app validation before writing the report because the task is an advisory governance review and no app behavior changed.

## Missing Items Summary

| Gap | Severity | Blocking? | Recommended owner |
| --- | --- | --- | --- |
| Health check freshness uses hard-coded `TODAY = 2026-06-26` instead of runtime date or explicit `--as-of`. | Medium | No for Sprint 1, but should be fixed before relying on future freshness results. | Hardening Sprint 2 / AI Brain validation |
| `brain:search` and `brain:impact` structured JSON outputs are contract-only. | Medium | No; Sprint 1 asked for retrieval contracts and explicitly deferred implementation. | Hardening Sprint 2 or later retrieval tooling |
| Historical memory entries are not retrofitted to the new memory status/provenance shape. | Low | No | AI Brain memory maintenance |
| Memory update helper does not enforce the new memory integrity model. | Low | No | AI Brain tooling |
| Template metadata expectations are defined but templates are not fully backfilled. | Low | No | AI Brain metadata maintenance |
| Health check coverage is fixed-scope and does not replace full validation, human review, or source inspection. | Low | No | AI Brain validation |

## Risks

- Freshness checks can become misleading after 2026-06-26 because the script currently freezes the current date.
- Contract-first retrieval reduces ambiguity for future agents, but does not yet give agents machine-readable structured search or impact output.
- Memory guidance is improved, but old memory can still conflict with canonical docs until supersession and provenance are applied consistently.
- Pattern-based generated-text secret scanning is useful hygiene but cannot guarantee absence of all sensitive material.
- `brain:health` may be mistaken for a complete quality gate if users do not also run scoped validation and direct source review.

## Recommended Next Action

Proceed to **Epic 2 Hardening Sprint 2** with minor follow-up work.

Sprint 2 should prioritize:

1. Fix `brain:health` date handling by using runtime date or an explicit `--as-of` option.
2. Complete `MGA-08` agent-neutral core/adapters.
3. Complete `MGA-10` scoped validation profiles.
4. Decide whether structured JSON output for `brain:search` and `brain:impact` belongs in Sprint 2 or a later retrieval-tooling sprint.
5. Add lightweight enforcement or scaffolding for memory status/provenance in the memory update helper.
6. Backfill template metadata as a low-risk cleanup task.

Do not re-open Sprint 1 unless maintainers require future-date freshness accuracy before Sprint 2 begins. Based on the reviewed evidence, Sprint 1 satisfies its goals with minor gaps that are appropriate to carry forward.
