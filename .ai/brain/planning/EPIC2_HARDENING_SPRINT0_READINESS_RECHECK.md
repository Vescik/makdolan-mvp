# Epic 2 Hardening Sprint 0 Readiness Recheck

Review ID: `MAKDOLAN::AI-BRAIN::EPIC2-HARDENING::SPRINT0-READINESS-RECHECK`

Date: 2026-06-26

Role: Independent AI Brain reviewer

Verdict: **PASS WITH MINOR GAPS**

## Scope

This recheck reviewed whether Epic 2 Hardening Sprint 0 truly completed the Critical backlog items:

- `H0-01 / MGA-01`: Authority and source-of-truth contract.
- `H0-02 / MGA-02`: Generated artifact lifecycle and freshness.
- `H0-03 / MGA-03`: Review finding registry.
- `H0-04 / MGA-04`: Security preflight and guardrails.

No implementation changes were made as part of this recheck. This document is advisory review output.

## Sources Reviewed

- `.ai/brain/planning/EPIC2_HARDENING_SPRINT0_REPORT.md`
- `.ai/brain/reviews/MASTER_GAP_ANALYSIS.md`
- `.ai/brain/planning/EPIC2_READINESS_REPORT.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/artifact-lifecycle-policy.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/governance/security-preflight.md`
- `AGENTS.md`
- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/context-packs/README.md`
- `.ai/brain/index/README.md`
- `.ai/brain/loop-harness/automation-policy.md`
- `.ai/brain/loop-harness/permissions-policy.md`
- Regenerated AI Brain index files under `.ai/brain/index/`

## Verdict Rationale

Sprint 0 materially completed the Critical backlog. The new governance layer is present, discoverable, and wired into the main AI Brain startup paths. The four H0 items are complete enough for AI Brain to proceed to Epic 2 Hardening Sprint 1.

The verdict is not a clean `PASS` because a few exact-language gaps remain:

- Existing core canonical docs are referenced by the metadata model but are not yet backfilled with explicit metadata tables.
- Archive and template artifacts are classified, but their metadata model is less explicit than canonical/generated/advisory/memory.
- Generated-text secret scan is defined as hygiene and recovery guidance, but not yet as a concrete report-only scan command or checklist output.

These are minor gaps because Sprint 0 explicitly avoided validator scripts and broad retrofits. They should be carried into Sprint 1, not treated as blockers for proceeding.

## H0-01 Recheck: Authority And Source-Of-Truth Contract

Status: **Pass with minor gap**

### Evidence

`.ai/brain/governance/source-of-truth-map.md` exists and includes:

- Metadata table declaring `class = canonical`, owner, status, authority, domain, dates, and review cadence.
- File classification model for `canonical`, `generated`, `advisory`, `memory`, `archive`, `template`, and `adapter`.
- Metadata model for canonical, generated, advisory, and memory artifacts.
- Source-of-truth map across top-level agent behavior, AI Brain usage, governance, generated artifacts, review findings, security, product scope, architecture, data/scoring, validation, automation, memory, and planning.
- Conflict resolution rules.
- Acceptance rules for review findings.

The authority contract is discoverable from:

- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/index/README.md`
- `AGENTS.md`

### Missing Items

- Existing canonical docs such as `AGENTS.md`, `.ai/brain/README.md`, and `.ai/brain/knowledge/*.md` do not yet have explicit owner/status/authority metadata blocks.
- The metadata model does not yet define separate required metadata fields for `archive` and `template` classes, although those classes are defined in the classification model.

### Risk

Low to medium. Future agents can use the source-of-truth map today, but automated metadata validation in Sprint 1 will need clearer coverage for legacy canonical docs, archive files, and templates.

### Recommended Next Action

Carry metadata backfill and archive/template metadata clarification into `MGA-05` / Hardening Sprint 1 health checks.

## H0-02 Recheck: Generated Artifact Lifecycle And Freshness

Status: **Pass**

### Evidence

`.ai/brain/governance/artifact-lifecycle-policy.md` exists and includes:

- Artifact classes for repo index outputs, context packs, impact reports, review reports, master gap analysis, readiness reports, sprint completion reports, automation reports, and templates.
- Freshness rules for repo indexes, context packs, impact reports, review reports, readiness reports, and automation reports.
- Context pack freshness and retention policy.
- Generated artifact metadata expectations.
- Usage rules requiring canonical source verification.
- Automation report rules.
- Recovery rules for stale/wrong artifacts and sensitive data.
- Explicit out-of-scope list preventing vector DBs, embeddings, MCP servers, remote services, automated deletion, and validator scripts during Sprint 0.

The lifecycle policy is discoverable from:

- `.ai/brain/context-packs/README.md`
- `.ai/brain/index/README.md`
- `.ai/brain/README.md`
- `AGENTS.md`

The AI Brain index was regenerated and reports 204 files across 68 directories in the Sprint 0 report.

### Missing Items

No Sprint 0-blocking missing item.

Existing generated artifacts were not retroactively rewritten with metadata, but the policy explicitly says existing generated artifacts are not retroactively invalid.

### Risk

Low. The policy is sufficient for Sprint 0. Sprint 1 should add health checks so freshness expectations become visible instead of purely manual.

### Recommended Next Action

Implement `MGA-05` health checks in Sprint 1 to report stale context packs, index age, missing generated metadata, and broken local references.

## H0-03 Recheck: Review Finding Registry

Status: **Pass**

### Evidence

`.ai/brain/governance/review-finding-registry.md` exists and includes:

- Metadata table declaring canonical authority.
- Purpose statement that Epic 1.5 review reports are advisory unless findings are accepted in the registry.
- Status values: `proposed`, `accepted`, `in_progress`, `implemented`, `deferred`, `rejected`, `superseded`.
- Severity values: `Critical`, `High`, `Medium`, `Low`.
- Registry rows for `MGA-01` through `MGA-18`.
- `MGA-01` through `MGA-04` marked `implemented`.
- Later Sprint 1/Sprint 2/later items marked `accepted` or `deferred`.
- Registry maintenance rules.

The registry is referenced from:

- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/index/README.md`
- `AGENTS.md`

### Missing Items

No Sprint 0-blocking missing item.

### Risk

Low. The registry is readable and sufficient for Sprint 0. It is still manually maintained, but automation/validation was intentionally deferred.

### Recommended Next Action

In Sprint 1, add a health check that confirms all accepted review findings have valid IDs, statuses, dependencies, and recommended sprint fields.

## H0-04 Recheck: Security Preflight And Guardrails

Status: **Pass with minor gap**

### Evidence

`.ai/brain/governance/security-preflight.md` exists and includes:

- Metadata table declaring canonical authority.
- Session startup preflight covering scope, active permissions, network posture, secrets, repository state, artifact class, source authority, validation expectation, and stop conditions.
- Shell execution guardrails for deletion, git publication/history changes, dependency mutation, networked installers, release/deployment, credentials, and database/payment/auth operations.
- Generated-text secret hygiene.
- Recovery triggers and recovery steps.
- Automation activation checklist with owner, purpose, trigger, cadence, sandbox, network, secrets, output path, write scope, validation, stop conditions, rollback, first-run review, data exposure, and approval record.
- Activation block conditions.
- Sprint 0 stance forbidding automation enablement, remote services, vector DBs, embeddings, MCP servers, automated deletion, and app behavior changes.

The preflight is referenced from:

- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/loop-harness/permissions-policy.md`
- `.ai/brain/loop-harness/automation-policy.md`
- `.ai/brain/README.md`
- `AGENTS.md`

### Missing Items

- `EPIC2_READINESS_REPORT.md` asked for generated text secret scan to be "defined or available as a report-only check." Sprint 0 defines generated-text secret hygiene and recovery actions, but it does not define a concrete report-only scan command, checklist output, or exact file scope.

### Risk

Medium. The governance rule is clear enough for manual operation, but secret detection remains procedural until Sprint 1 or later adds a check or explicit scan workflow.

### Recommended Next Action

In Sprint 1, define a report-only generated-text secret scan scope covering AI Brain generated artifacts, memory, reviews, planning reports, and docs. It can initially be a documented checklist or local script; it should not upload content or require network access.

## Cross-Cutting Evidence

### Discoverability

The new governance documents are linked from the main startup path:

- `.ai/brain/README.md` tells agents to run the security preflight and use the source-of-truth map.
- `.ai/brain/knowledge/agent-session-start.md` adds preflight and source-of-truth checks before reading generated/advisory files.
- `.ai/brain/index/README.md` includes the governance files in `Start Here` and `Governance`.
- `AGENTS.md` now instructs large sessions to use the source-of-truth map, security preflight, artifact lifecycle policy, and finding registry.

### Scope Control

The Sprint 0 completion report states:

- No app behavior changed.
- No automation was enabled.
- No vector database, embeddings, MCP server, or remote service was added.
- No review reports were deleted.

This is consistent with the inspected files.

### Validation Evidence

The Sprint 0 completion report records:

- `npm run brain:index`: PASS.
- `git diff --check`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run test`: PASS, 28 tests.
- `npm run build:web`: PASS.
- `bash scripts/diff-gate.sh`: PASS.

This recheck did not rerun the full app validation before writing this report, because the task is an advisory review and no app behavior was changed.

## Missing Items Summary

| Gap | Severity | Blocking? | Recommended owner |
| --- | --- | --- | --- |
| Legacy canonical docs are not backfilled with explicit metadata tables. | Low | No | Hardening Sprint 1 / AI Brain validation |
| Archive and template metadata are classified but not modeled as explicitly as canonical/generated/advisory/memory. | Low | No | Hardening Sprint 1 / AI Brain validation |
| Generated-text secret scan is guidance, not yet a concrete report-only check or command. | Medium | No for Sprint 0; should be prioritized in Sprint 1 | Hardening Sprint 1 / security health check |

## Risks

- Manual governance can still drift until `MGA-05` adds AI Brain validation and health checks.
- Secret hygiene depends on agent behavior until a generated-text scan is implemented.
- Existing generated artifacts remain valid only as historical/generated artifacts; they were not retroactively annotated with metadata.
- Review finding registry status is manually maintained and can become stale without Sprint 1 checks.

## Recommended Next Action

Proceed to **Epic 2 Hardening Sprint 1**.

Sprint 1 should prioritize:

1. `MGA-05`: AI Brain validation and health checks.
2. Generated-text secret scan as a report-only local check or explicit checklist workflow.
3. Metadata backfill strategy for core canonical docs.
4. Review finding registry validation.
5. Generated artifact freshness checks.

Do not re-open Sprint 0 unless a maintainer decides that the exact metadata backfill or secret-scan command must be included before Sprint 1 begins. Based on the reviewed evidence, Sprint 0 satisfies its Critical goals with minor follow-up gaps.
