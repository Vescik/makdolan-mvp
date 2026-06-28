# Epic 2 Hardening Sprint 1 Report

Report ID: `MAKDOLAN::AI-BRAIN::EPIC2-HARDENING::SPRINT1`

Date: 2026-06-26

Status: Complete.

## Objective

Complete Epic 2 Hardening Sprint 1 by making Sprint 0 governance testable and usable:

- `MGA-05`: AI Brain validation and health checks.
- Generated-text secret scan.
- Metadata backfill strategy and application for core canonical AI Brain docs.
- Review finding registry validation.
- Generated artifact freshness checks.
- `MGA-06`: Structured retrieval contracts.
- `MGA-07`: Memory integrity model.
- `MGA-09`: Developer onboarding and workflow modes.

## Completed Backlog Items

### MGA-05: AI Brain Validation And Health Checks

Completed.

What changed:

- Added `.ai/brain/governance/health-checks.md`.
- Added local report-only script `.ai/brain/scripts/health-check.mjs`.
- Added package command `npm run brain:health`.
- Health check validates metadata, review finding registry rows, generated artifact freshness, and generated-text secret scan scope.

### Generated-Text Secret Scan

Completed.

What changed:

- `npm run brain:health` scans generated AI Brain artifacts, memory, reviews, planning reports, docs, project context, knowledge-base text, `AGENTS.md`, and `README.md`.
- Scan is local, report-only, no-network, and does not read `.env.local`.
- Secret values are never printed by the script; findings are reported by path/pattern type only.

### Metadata Backfill Strategy

Completed.

What changed:

- `.ai/brain/governance/health-checks.md` defines required metadata fields.
- `.ai/brain/governance/source-of-truth-map.md` now defines archive and template metadata expectations.
- Metadata was applied to:
  - `.ai/brain/README.md`
  - `.ai/brain/knowledge/agent-session-start.md`
  - `.ai/brain/knowledge/architecture-principles.md`
  - `.ai/brain/knowledge/known-risks.md`
  - `.ai/brain/knowledge/module-catalog.md`
  - `.ai/brain/knowledge/product-decisions.md`
  - `.ai/brain/knowledge/project-overview.md`
  - `.ai/brain/knowledge/sdlc-flow.md`
  - `.ai/brain/knowledge/testing-map.md`
  - all current `.ai/brain/governance/*.md` files.

### Review Finding Registry Validation

Completed.

What changed:

- `npm run brain:health` validates `MGA-*` rows for ID shape, severity, status, source review, finding text, owner/area, dependencies, recommended sprint, and evidence/resolution.
- `.ai/brain/governance/review-finding-registry.md` now marks `MGA-05`, `MGA-06`, `MGA-07`, and `MGA-09` as implemented.

### Generated Artifact Freshness Checks

Completed.

What changed:

- `npm run brain:health` checks required generated index outputs.
- It detects stale or expired context packs by filename date.
- It detects planning reports with missing date/generated metadata near the top.
- A minimal date/status header was added to `.ai/brain/planning/AI_BRAIN_PRO_FINAL_VERIFICATION_GOAL_CONTRACT.md` to satisfy the freshness check.

### MGA-06: Structured Retrieval Contracts

Completed.

What changed:

- Added `.ai/brain/governance/retrieval-contracts.md`.
- Defined shared retrieval record shape.
- Defined contracts for `brain:index`, `brain:search`, `brain:impact`, and `brain:context`.
- Defined retrieval profiles for startup, product, architecture, implementation, review, security, and release.
- Explicitly deferred vector databases, embeddings, MCP resources, and remote search.

### MGA-07: Memory Integrity Model

Completed.

What changed:

- Added `.ai/brain/governance/memory-integrity-model.md`.
- Defined memory statuses: `active`, `resolved`, `superseded`, `archived`, and `needs-review`.
- Defined provenance expectations and recommended entry shapes.
- Updated `.ai/brain/memory/memory-update-checklist.md` to reference the memory integrity model and `brain:health`.

### MGA-09: Developer Onboarding And Workflow Modes

Completed.

What changed:

- Added `.ai/brain/governance/developer-onboarding.md`.
- Defined first-hour onboarding guide.
- Added command cheat sheet.
- Defined task-size workflow modes: tiny, small, medium, major, and security/release-sensitive.
- Updated startup, index, README, and AGENTS references.

## Changed Files

Created:

- `.ai/brain/context-packs/2026-06-26T21-28-38-119Z-impact-ai-brain-health-check.md`
- `.ai/brain/governance/health-checks.md`
- `.ai/brain/governance/retrieval-contracts.md`
- `.ai/brain/governance/memory-integrity-model.md`
- `.ai/brain/governance/developer-onboarding.md`
- `.ai/brain/scripts/health-check.mjs`
- `.ai/brain/planning/EPIC2_HARDENING_SPRINT1_REPORT.md`

Updated:

- `AGENTS.md`
- `package.json`
- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/knowledge/architecture-principles.md`
- `.ai/brain/knowledge/known-risks.md`
- `.ai/brain/knowledge/module-catalog.md`
- `.ai/brain/knowledge/product-decisions.md`
- `.ai/brain/knowledge/project-overview.md`
- `.ai/brain/knowledge/sdlc-flow.md`
- `.ai/brain/knowledge/testing-map.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/security-preflight.md`
- `.ai/brain/governance/review-finding-registry.md`
- `.ai/brain/index/README.md`
- `.ai/brain/scripts/README.md`
- `.ai/brain/memory/memory-update-checklist.md`
- `.ai/brain/planning/AI_BRAIN_PRO_FINAL_VERIFICATION_GOAL_CONTRACT.md`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/memory/sprint-summaries/2026-06-26-epic-2-hardening-sprint-1.md`

## New Commands Added

| Command | Purpose |
| --- | --- |
| `npm run brain:health` | Runs local report-only AI Brain metadata, registry, freshness, and generated-text secret checks. |

## Scope Control

No app behavior was changed.

No automation was enabled.

No vector database, embeddings, MCP server, remote service, or network-based secret scanning was added.

No existing reports were deleted.

The health check is local-first, deterministic, and report-only.

## Validation Evidence

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run brain:health` | PASS | Final run passed metadata, registry, generated artifact freshness, and generated-text secret scan with zero warnings. It scanned 94 text files. |
| `npm run brain:index` | PASS | Final refresh indexed 212 files across 68 directories after Sprint 1 report and memory updates. |
| `npm run brain:search -- "security preflight"` | PASS | Top matches included `.ai/brain/README.md`, `.ai/brain/memory/implementation-history.md`, `AGENTS.md`, Sprint 0 memory, and `.ai/brain/governance/security-preflight.md` via repo map. |
| `npm run brain:impact -- "AI Brain health check"` | PASS | Created `.ai/brain/context-packs/2026-06-26T21-28-38-119Z-impact-ai-brain-health-check.md`. |
| `git diff --check` | PASS | No whitespace or diff hygiene errors reported. |
| `npm run typecheck` | PASS | `tsc --noEmit` completed successfully. |
| `npm run lint` | PASS | `eslint .` completed successfully. |
| `npm run test` | PASS | Vitest reported 4 test files passed and 28 tests passed. |
| `npm run build:web` | PASS | Expo web export completed successfully. Output mentioned `.env.local` and `OPENAI_API_KEY` name only; no secret value was printed. |
| `bash scripts/diff-gate.sh` | PASS | Diff hygiene, staged diff hygiene, untracked hygiene, typecheck, lint, tests, and web build all passed. |

## Remaining Gaps

- `brain:search` and `brain:impact` do not yet emit JSON structured output; Sprint 1 defines contracts and defers implementation.
- Historical memory entries were not rewritten to the new memory status/provenance shape.
- Template metadata expectations are defined, but templates are not yet fully backfilled.
- The health check is intentionally lightweight and does not replace human review or full repository validation.
- Scoped validation profiles remain a Sprint 2 item under `MGA-10`.
- Agent-neutral core/adapters remain a Sprint 2 item under `MGA-08`.

## Sprint 2 Readiness

AI Brain can proceed to Epic 2 Hardening Sprint 2.

Rationale:

- Sprint 1 backlog items are implemented.
- The new local health check passed without warnings.
- Required app and repository validation commands passed.
- Remaining gaps are assigned to later hardening work and are not Sprint 1 blockers.
