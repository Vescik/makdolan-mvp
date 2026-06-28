# Epic 2 Readiness Report

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::EPIC2-READINESS`

Date: 2026-06-26

Source: Consolidated from `.ai/brain/reviews/MASTER_GAP_ANALYSIS.md` and the full Epic 1.5 review corpus.

## Readiness Decision

Verdict: **NEEDS HARDENING**

AI Brain is not blocked by missing core capability. It has enough structure to support small and medium repository tasks today. It is not ready to be the primary Epic 2 operating layer for broad, multi-agent, long-lived execution until a short hardening backlog is completed.

## Decision Options

| Option | Applicability |
| --- | --- |
| READY | Not applicable. Too many governance, freshness, and security controls are still advisory. |
| READY WITH MINOR CHANGES | Not applicable. Required changes are not large, but they are foundational rather than cosmetic. |
| NEEDS HARDENING | Selected. The platform is usable but needs authority, lifecycle, validation, and security hardening before Epic 2. |
| NOT READY | Not applicable. AI Brain has working scripts, docs, validation, and workflow structure. It does not require a rebuild. |

## Objective Evidence: Ready Areas

AI Brain has meaningful Epic 2 foundations:

- `AGENTS.md` defines repository mission, commands, validation, cross-platform expectations, security rules, and AI Brain usage.
- `.ai/brain/README.md` defines AI Brain purpose, directory structure, and source-of-truth boundaries.
- `.ai/brain/knowledge/agent-session-start.md` provides a task startup checklist.
- `.ai/brain/knowledge/module-catalog.md` maps routes, screens, domain logic, tests, workflow, and CI.
- `.ai/brain/knowledge/testing-map.md` maps change scope to validation commands.
- `.ai/brain/scripts/README.md` documents helper scripts, inputs, outputs, and failure behavior.
- `npm run brain:context` exists for context-pack generation.
- `npm run brain:index` exists for deterministic repo indexing.
- `npm run brain:search` exists for local keyword search.
- `npm run brain:impact` exists for heuristic impact analysis.
- `npm run brain:memory:update` exists for structured memory entry creation.
- `bash scripts/diff-gate.sh` provides a strong validation gate.
- `.github/workflows/verify-mobile-web.yml` runs core CI checks.
- `.codex/automations/templates/` contains disabled, policy-controlled automation templates.
- `.ai/brain/loop-harness/automation-policy.md`, `permissions-policy.md`, and `stop-conditions.md` define safety boundaries.

Validation evidence from the Epic 1.5 review work:

- `git diff --check`: passed.
- Targeted coverage checks for review artifacts: passed.
- `bash scripts/diff-gate.sh`: passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test`: 28 tests passed.
- `npm run build:web`: passed.

## Objective Evidence: Not Ready Areas

AI Brain is not yet ready for Epic 2 because these controls are missing or only advisory:

1. No enforceable source-of-truth or authority contract.

Evidence: Reviews repeatedly identify overlap between `docs/`, `project-context/`, `knowledge-base/`, `.ai/brain/knowledge/`, `.ai/brain/memory/`, generated context packs, and review reports.

2. No generated artifact lifecycle or freshness model.

Evidence: Context packs, review artifacts, generated indexes, and impact reports do not consistently declare source commit, expiry, authority, generated status, or retention rules.

3. No review finding registry.

Evidence: Eight review reports now contain many recommendations, but there is no stable ID/status/owner mechanism to track accepted work.

4. Security controls are documented but not fully validated.

Evidence: Permissions policy exists, but runtime mode can exceed policy; secret scan is prompt-only; automation activation is procedural; shell guardrails cover only a small command subset.

5. Memory lacks lifecycle integrity.

Evidence: Memory helper appends Markdown entries but durable memory does not yet have stable IDs, lifecycle status, provenance, supersession, archive policy, or concurrency controls.

6. Search and context retrieval are not authority-aware.

Evidence: `brain:search` is local keyword search without structured authority/freshness ranking or JSON contract.

7. AI Brain is still Codex-centric.

Evidence: Codex-specific setup, hooks, agents, CI workflows, and goal terminology are useful but not yet separated from an agent-neutral core.

8. New developer onboarding is too dense.

Evidence: A new developer can run the app quickly, but cannot confidently learn the full AI Brain workflow in one hour without a curated guide.

9. Validation is strong but not yet scope-aware enough.

Evidence: Full diff gate works, but docs-only, AI Brain-only, security, release, and future large-repo validation profiles are not formalized.

10. AI Brain scripts lack dedicated tests and health checks.

Evidence: Helper scripts exist and are documented, but no dedicated test suite validates script behavior, output contracts, stale docs, metadata, or search quality.

## Hardening Backlog Before Epic 2

These items should be completed before Epic 2 begins if Epic 2 will rely on AI Brain for planning, reviews, multi-agent work, or durable memory.

### H0-01: Authority And Source-Of-Truth Contract

Severity: Critical

Problem: Canonical, generated, advisory, memory, archive, and template files are not clearly classified.

Why it matters: Agents need to know which files win when sources conflict.

Impact: Reduces stale-context risk, improves onboarding, enables validation and search ranking.

Implementation complexity: Medium.

Dependencies: None.

Recommended sprint: Epic 2 Hardening Sprint 0.

Definition of done:

- Source-of-truth map exists.
- AI Brain file classes are defined.
- Core docs declare authority/status/owner at least in a simple table or metadata block.

### H0-02: Generated Artifact Lifecycle And Freshness

Severity: Critical

Problem: Generated indexes, context packs, reports, and review outputs can remain searchable without freshness or retention rules.

Why it matters: Stale generated artifacts can mislead future agents.

Impact: Improves data integrity and retrieval trust.

Implementation complexity: Medium.

Dependencies: `H0-01`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Definition of done:

- Generated artifact policy exists.
- Context pack retention/expiry guidance exists.
- Index freshness expectation is documented.

### H0-03: Review Finding Registry

Severity: Critical

Problem: Review recommendations are spread across long reports with no status or ownership.

Why it matters: Epic 2 needs a backlog, not another set of advisory documents.

Impact: Creates trackable work and prevents duplicate recommendations.

Implementation complexity: Low to Medium.

Dependencies: `H0-01`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Definition of done:

- Review finding ID format exists.
- Registry captures finding, severity, source review, status, owner/area, dependencies, and recommended sprint.
- Master gap analysis items are entered or mapped.

### H0-04: Security Preflight And Guardrails

Severity: Critical

Problem: Permission, shell, secret, automation, and generated-artifact safety rules exist but are not validated at task start or automation activation.

Why it matters: Epic 2 will likely involve more agents and more generated artifacts.

Impact: Reduces risk of accidental destructive actions, secret leakage, and overpowered automation.

Implementation complexity: Medium.

Dependencies: `H0-01`, `H0-02`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Definition of done:

- Session startup includes permission/network preflight.
- Generated text secret scan is defined or available as a report-only check.
- Automation activation checklist has required fields and fail-closed guidance.
- Recovery playbooks are linked from security workflow docs.

### H1-01: AI Brain Health Check

Severity: High

Problem: There is no single command or report that checks AI Brain metadata, index freshness, stale docs, generated artifacts, and review registry consistency.

Why it matters: Manual governance will drift.

Impact: Gives maintainers objective readiness signals.

Implementation complexity: Medium.

Dependencies: `H0-01`, `H0-02`, `H0-03`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Definition of done:

- Health check criteria are documented.
- A manual or scripted health report can be produced.
- Missing metadata, stale generated files, and broken local references are visible.

### H1-02: Structured Retrieval Outputs

Severity: High

Problem: Search and impact outputs are mostly human-readable and not authority-aware.

Why it matters: Multi-agent workflows need structured context packets and predictable retrieval.

Impact: Improves interoperability and context quality.

Implementation complexity: Medium.

Dependencies: `H0-01`, `H0-02`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Definition of done:

- Search/index/impact output contracts are defined.
- JSON output mode or equivalent machine-readable record shape is planned or implemented.
- Retrieval profiles are documented.

### H1-03: Memory Integrity Upgrade

Severity: High

Problem: Memory entries do not have lifecycle state, source evidence, supersession, or archive rules.

Why it matters: Memory influences future agent behavior.

Impact: Reduces stale-memory and conflicting-decision risk.

Implementation complexity: Medium.

Dependencies: `H0-01`, `H0-03`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Definition of done:

- Memory entry states are defined.
- Memory update checklist explains active/resolved/superseded/archive behavior.
- New memory entries can reference source evidence and validation.

### H1-04: First-Day Developer Guide

Severity: High

Problem: New developers can run the app, but the AI Brain workflow has no curated first-hour path.

Why it matters: Epic 2 needs maintainers to use the workflow consistently.

Impact: Improves onboarding and reduces incorrect process application.

Implementation complexity: Low.

Dependencies: `H0-01`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Definition of done:

- First-hour checklist exists.
- Command cheat sheet exists.
- Task-size workflow modes are documented.
- Reference-only vs required docs are clear.

### H2-01: Agent-Neutral Contract And Handoff

Severity: High

Problem: AI Brain is still Codex-first in operating conventions.

Why it matters: Epic 2 platform goals include multiple LLM agents.

Impact: Improves portability and future MCP compatibility.

Implementation complexity: Medium to High.

Dependencies: `H1-02`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Core AI Brain contracts are agent-neutral.
- Codex-specific behavior is documented as an adapter.
- Handoff packet format exists.

### H2-02: Change-Scope Validation Profiles

Severity: High

Problem: Validation is either broad or ad hoc; docs-only and AI Brain-only changes need clearer gates.

Why it matters: Epic 2 needs both velocity and reliable evidence.

Impact: Reduces skipped checks and overvalidation.

Implementation complexity: Medium.

Dependencies: `H1-01`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Validation profiles exist for docs, app, domain, UI, security, release, and AI Brain changes.
- Changed-path mapping is documented.
- Full diff gate remains the high-confidence option.

### H2-03: AI Brain Script Tests And Metrics

Severity: Medium

Problem: Helper scripts do not have dedicated tests or performance/freshness metrics.

Why it matters: AI Brain scripts are now platform code.

Impact: Reduces tool regression risk.

Implementation complexity: Medium.

Dependencies: `H1-01`, `H1-02`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Script behavior has smoke or unit tests.
- Search/index helper output shape is checked.
- Script metrics include file count/output path/elapsed time where useful.

## Epic 2 Go/No-Go Criteria

AI Brain can enter Epic 2 when:

- All `H0` items are complete.
- No Critical findings remain open without an explicit accepted risk.
- The review finding registry is the source for Epic 2 AI Brain backlog.
- Startup docs direct agents to canonical context and permission preflight.
- Generated artifacts have lifecycle/freshness rules.
- Validation evidence for the hardening changes passes.

AI Brain should not enter broad Epic 2 multi-agent execution when:

- Review findings remain untracked.
- Generated artifacts still lack authority/freshness classification.
- Security preflight remains only implicit.
- New contributors cannot identify required vs reference docs.

## Final Readiness Statement

AI Brain is operationally useful, but Epic 2 should begin with a hardening sprint. The platform is not "not ready"; it does not need a reset. It needs foundational governance and validation controls before it becomes the main coordination layer for larger work.

Final verdict: **NEEDS HARDENING**.
