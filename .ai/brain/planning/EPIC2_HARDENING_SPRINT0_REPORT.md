# Epic 2 Hardening Sprint 0 Report

Report ID: `MAKDOLAN::AI-BRAIN::EPIC2-HARDENING::SPRINT0`

Date: 2026-06-26

Status: Complete.

## Objective

Complete the Critical backlog items from Epic 1.5 so AI Brain can safely become the planning layer for Epic 2.

Implemented backlog items:

- `H0-01 / MGA-01`: Authority and source-of-truth contract.
- `H0-02 / MGA-02`: Generated artifact lifecycle and freshness model.
- `H0-03 / MGA-03`: Review finding registry.
- `H0-04 / MGA-04`: Security preflight and guardrails.

## Completed Items

### H0-01 / MGA-01: Authority And Source-Of-Truth Contract

Completed.

What changed:

- Added `.ai/brain/governance/source-of-truth-map.md`.
- Defined AI Brain file classes: `canonical`, `generated`, `advisory`, `memory`, `archive`, `template`, and `adapter`.
- Defined metadata expectations for canonical, generated, advisory, and memory files.
- Added source-of-truth map across product, architecture, validation, security, automation, memory, planning, and reviews.
- Added conflict resolution rules.
- Updated AI Brain README, startup guidance, index, and AGENTS rules to point to the authority contract.

Why it matters:

AI Brain now has an explicit contract for which files are authoritative and how future agents should treat generated, advisory, memory, archive, template, and adapter files.

### H0-02 / MGA-02: Generated Artifact Lifecycle And Freshness Model

Completed.

What changed:

- Added `.ai/brain/governance/artifact-lifecycle-policy.md`.
- Defined lifecycle and freshness expectations for repo indexes, context packs, impact reports, review reports, readiness reports, automation reports, and templates.
- Defined context pack freshness and retention rules.
- Added generated artifact metadata expectations.
- Updated `.ai/brain/context-packs/README.md` and `.ai/brain/index/README.md` to point to the lifecycle policy.

Why it matters:

Generated artifacts are now explicitly treated as task-start, advisory, or navigation aids instead of implicit source-of-truth documents.

### H0-03 / MGA-03: Review Finding Registry

Completed.

What changed:

- Added `.ai/brain/governance/review-finding-registry.md`.
- Defined registry status values: `proposed`, `accepted`, `in_progress`, `implemented`, `deferred`, `rejected`, and `superseded`.
- Accepted and tracked consolidated findings from `MASTER_GAP_ANALYSIS.md`.
- Marked `MGA-01` through `MGA-04` as implemented by Sprint 0 artifacts.
- Kept future hardening items accepted or deferred with recommended sprint placement.
- Updated AGENTS and AI Brain README to state that review reports are advisory unless findings are accepted in the registry.

Why it matters:

Review reports no longer function as an unbounded advisory pile. Accepted work now has IDs, statuses, dependencies, owners/areas, and sprint placement.

### H0-04 / MGA-04: Security Preflight And Guardrails

Completed.

What changed:

- Added `.ai/brain/governance/security-preflight.md`.
- Defined session startup preflight for scope, permissions, network posture, secrets, repository state, artifact class, source authority, validation expectations, and stop conditions.
- Added shell execution guardrails for deletion, git publication, dependency mutation, networked installers, release/deployment, credentials, database/payment/auth operations.
- Added generated-text secret hygiene.
- Added recovery triggers and recovery steps.
- Added automation activation checklist.
- Updated `.ai/brain/knowledge/agent-session-start.md`, `.ai/brain/loop-harness/automation-policy.md`, `.ai/brain/loop-harness/permissions-policy.md`, and `AGENTS.md` to reference the preflight.

Why it matters:

Security and automation safety are now part of session startup instead of only deep policy references.

## Changed Files

Created:

- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/artifact-lifecycle-policy.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/governance/security-preflight.md`
- `.ai/brain/planning/EPIC2_HARDENING_SPRINT0_REPORT.md`
- `.ai/brain/memory/sprint-summaries/2026-06-26-epic-2-hardening-sprint-0.md`

Updated:

- `AGENTS.md`
- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/context-packs/README.md`
- `.ai/brain/index/README.md`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/loop-harness/automation-policy.md`
- `.ai/brain/loop-harness/permissions-policy.md`
- `.ai/brain/memory/implementation-history.md`

## Scope Control

No app behavior was changed.

No automation was enabled.

No vector database, embeddings, MCP server, or remote service was added.

No review reports were deleted.

Review reports remain advisory unless findings are accepted in `.ai/brain/governance/review-finding-registry.md`.

## Validation Evidence

Required commands completed:

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run brain:index` | PASS | Indexed 204 files across 68 directories after governance docs, report, and memory files were added. |
| `git diff --check` | PASS | No whitespace or diff hygiene errors reported. |
| `npm run typecheck` | PASS | `tsc --noEmit` completed successfully. |
| `npm run lint` | PASS | `eslint .` completed successfully. |
| `npm run test` | PASS | Vitest reported 4 test files passed and 28 tests passed. |
| `npm run build:web` | PASS | Expo web export completed successfully. Output mentioned `.env.local` and `OPENAI_API_KEY` name only; no secret value was printed. |
| `bash scripts/diff-gate.sh` | PASS | Diff hygiene, staged diff hygiene, untracked hygiene, typecheck, lint, tests, and web build all passed. |

## Remaining Risks

- Sprint 0 establishes governance contracts but does not yet add automated validation for metadata or freshness. That remains `MGA-05` / Hardening Sprint 1 work.
- Memory lifecycle metadata remains a Sprint 1 item; Sprint 0 only protects authority and review acceptance.
- Search remains keyword-based and not authority-aware; structured retrieval is still Sprint 1 work.
- Codex-specific adapter separation remains Sprint 2 work.
- Native release readiness remains later release-readiness work, not a Sprint 0 prerequisite.

## Epic 2 Readiness

AI Brain can proceed to Epic 2 Hardening Sprint 1.

Rationale:

- All Critical Sprint 0 backlog items are implemented.
- Required validation commands passed.
- The remaining risks are explicitly assigned to later hardening items in `.ai/brain/governance/review-finding-registry.md`.
- No app behavior, automation activation, remote services, vector database, embeddings, or MCP server were introduced.
