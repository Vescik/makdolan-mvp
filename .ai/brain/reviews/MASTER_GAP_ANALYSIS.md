# AI Brain Master Gap Analysis

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::MASTER-GAP-ANALYSIS`

Date: 2026-06-26

Scope: Consolidated architecture assessment across all Epic 1.5 AI Brain review reports.

Non-goal: This document does not implement recommendations, enable automation, modify scripts, or change application behavior.

## Reports Reviewed

- `.ai/brain/reviews/architecture-review.md`
- `.ai/brain/reviews/sdlc-review.md`
- `.ai/brain/reviews/agent-review.md`
- `.ai/brain/reviews/knowledge-review.md`
- `.ai/brain/reviews/scalability-review.md`
- `.ai/brain/reviews/automation-review.md`
- `.ai/brain/reviews/security-review.md`
- `.ai/brain/reviews/dx-review.md`

## Consolidated Assessment

AI Brain is a useful repository-local SDLC layer today. It gives agents and developers a shared operating model, command surface, context-pack tooling, repo indexing, search, impact analysis, memory update workflow, validation gate, and safety policies.

The main gap is that AI Brain is still a documentation-and-script system whose rules are mostly advisory. Epic 2 will need stronger contracts before the system can scale safely: source authority, metadata, artifact classification, freshness checks, review finding tracking, structured outputs, memory lifecycle, security preflight, and first-day developer guidance.

No review identified a need to replace the current Markdown/local-script foundation immediately. The correct consolidation is to harden the existing model, not introduce a remote platform, vector database, full enterprise knowledge service, or automatic remediation.

## Duplicate Recommendations Removed

The reviews repeatedly recommended the same underlying changes using different wording. These have been merged as follows:

| Duplicate theme across reports | Consolidated recommendation |
| --- | --- |
| Source-of-truth map, authority metadata, documentation priority labels, canonical source boundaries | `MGA-01: Authority and source-of-truth contract` |
| Generated artifact policy, context-pack retention, stale generated reports, freshness metadata | `MGA-02: Artifact lifecycle and freshness model` |
| Review finding IDs, review backlog, advisory-vs-accepted status | `MGA-03: Review finding registry` |
| Memory metadata, lifecycle states, compaction, archive, concurrency | `MGA-04: Memory integrity model` |
| Schema validation, health report, docs validation, stale docs checks | `MGA-05: AI Brain validation and health checks` |
| Structured search output, JSON outputs, metadata-aware retrieval, prompt-independent context | `MGA-06: Structured retrieval contracts` |
| Codex coupling, agent-neutral startup, handoff packets, MCP future compatibility | `MGA-07: Agent-neutral core and adapters` |
| Permission preflight, secret scanning, shell guardrails, automation activation validation | `MGA-08: Security boundary hardening` |
| First-day onboarding, command cheat sheet, task-size workflows, docs priority labels | `MGA-09: Developer onboarding and workflow modes` |
| Scoped validation, docs-only validation, validation throughput | `MGA-10: Change-scope validation model` |
| AI Brain script tests, search quality tests, script metrics | `MGA-11: Tooling test coverage and metrics` |
| Deployment/release/native/incident response gaps | `MGA-12: Release and operations readiness evidence` |

## Conflicts Resolved

### Broad Diff Gate vs Scoped Validation

Resolution: Keep `bash scripts/diff-gate.sh` as the full confidence gate, but add scoped validation guidance for routine docs and low-risk changes.

WHY: Full validation is valuable, but it will become too slow and noisy if every change uses the same gate. Scoped validation should never remove the full gate for release, security, shared domain, architecture, CI, or broad changes.

### Automate More vs Keep Humans In Control

Resolution: Automate detection, evidence collection, and report generation first. Do not automate source fixes, dependency upgrades, release, deployment, credential operations, product decisions, architecture decisions, or external communications.

WHY: The automation review and security review agree that unsafe automation is a bigger near-term risk than insufficient automation.

### Add Search Infrastructure vs Avoid Premature Optimization

Resolution: Add metadata, structured records, freshness checks, and JSON outputs before adding full-text backends, embeddings, or remote search.

WHY: Better retrieval quality depends on authority and lifecycle metadata. A stronger search engine over stale content would amplify the wrong knowledge.

### Keep Codex-Specific Workflows vs Support All Agents

Resolution: Keep Codex adapter files, but define an agent-neutral AI Brain core contract and let Codex, ChatGPT, Claude Code, Copilot, Gemini, and future agents consume it through adapters.

WHY: The current repo is Codex-first, but the platform requirement is multi-agent portability.

### Update Memory Automatically vs Protect Knowledge Integrity

Resolution: Allow draft memory generation and missing-memory detection, but require reviewed durable memory writes for decisions, architecture, security, product scope, and release evidence.

WHY: Memory is an instruction surface. Low-friction updates are good; unreviewed durable knowledge is risky.

### Make AI Brain Comprehensive vs Keep Onboarding Lightweight

Resolution: Keep the full AI Brain system for major work, but add first-hour onboarding and task-size workflow modes.

WHY: The system can be rigorous without forcing every new developer or tiny change through the full process immediately.

## Priority Findings And Recommendations

### Critical

#### MGA-01: Authority And Source-Of-Truth Contract

Problem: Source-of-truth boundaries are documented but not enforceable. Product, architecture, testing, workflow, memory, knowledge-base, generated context, and review findings overlap without a machine-readable authority model.

Why it matters: Future agents can retrieve stale summaries, generated context packs, or advisory review recommendations and treat them as current policy.

Impact: High. This affects every AI Brain workflow: discovery, planning, search, memory, onboarding, review, and automation.

Implementation complexity: Medium.

Dependencies: None. This is the foundation for most other hardening work.

Recommended sprint: Epic 2 Hardening Sprint 0.

Recommended implementation direction:

- Define file classes: `canonical`, `generated`, `advisory`, `memory`, `archive`, `template`.
- Add a source-of-truth map for product, architecture, testing, release, security, AI Brain workflow, and historical memory.
- Add minimum metadata fields for canonical AI Brain documents: `id`, `owner`, `status`, `authority`, `domain`, `last_reviewed`, `review_after`.

#### MGA-02: Artifact Lifecycle And Freshness Model

Problem: Generated indexes, context packs, impact reports, reviews, and memory outputs do not consistently declare freshness, source commit, expiry, generated status, or retention rules.

Why it matters: AI Brain can accumulate stale generated artifacts that remain discoverable and appear authoritative.

Impact: High. Stale generated context is a direct reliability and security risk for AI agents.

Implementation complexity: Medium.

Dependencies: `MGA-01`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Recommended implementation direction:

- Define generated artifact policy.
- Add freshness fields to generated outputs where appropriate.
- Add retention rules for context packs and generated reports.
- Prefer canonical docs over generated artifacts in retrieval guidance.

#### MGA-03: Review Finding Registry

Problem: Eight review reports contain valuable recommendations, but findings are not tracked with stable IDs, status, owner, target area, or follow-up.

Why it matters: Without a registry, review findings become another long-form knowledge pile instead of a managed hardening backlog.

Impact: High. Epic 2 planning depends on knowing which recommendations are accepted, rejected, deferred, or implemented.

Implementation complexity: Low to Medium.

Dependencies: `MGA-01`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Recommended implementation direction:

- Create a finding ID format.
- Track fields: `id`, `source_review`, `severity`, `status`, `owner`, `target_area`, `recommended_sprint`, `dependencies`, `evidence`, `resolution`.
- Mark these Epic 1.5 review outputs as advisory until accepted.

#### MGA-04: Security Boundary Hardening

Problem: Security posture is documented, but enforcement is mostly procedural. Runtime permissions can exceed repository policy, shell execution remains broad, secret scanning is prompt-only, and automation activation is not machine-validated.

Why it matters: AI Brain is an agent operating layer. Permission drift, generated secret leakage, and overpowered automation can damage repository integrity or expose sensitive data.

Impact: High.

Implementation complexity: Medium.

Dependencies: `MGA-01`, partial dependency on `MGA-02`.

Recommended sprint: Epic 2 Hardening Sprint 0.

Recommended implementation direction:

- Add permission preflight to session startup.
- Add generated-text secret scan as report-only validation.
- Add automation activation checklist validation.
- Broaden destructive/dependency/release command guardrail guidance.
- Add recovery playbook references to startup/security docs.

### High

#### MGA-05: AI Brain Validation And Health Checks

Problem: AI Brain docs, metadata, indexes, generated artifacts, memory files, and review outputs do not have a dedicated validator or health report.

Why it matters: Once metadata and lifecycle rules exist, drift must be detected automatically. Manual discipline does not scale.

Impact: High for maintainability and trust.

Implementation complexity: Medium.

Dependencies: `MGA-01`, `MGA-02`, `MGA-03`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Recommended implementation direction:

- Add validation for required metadata.
- Check generated index freshness.
- Check stale/expired context packs.
- Check review finding registry consistency.
- Check broken local file references.
- Produce a concise AI Brain health report.

#### MGA-06: Structured Retrieval Contracts

Problem: Search is linear, keyword-only, mostly unstructured, and not authority-aware. Scripts primarily output human-readable text.

Why it matters: Multi-agent workflows need predictable, machine-readable retrieval results. Better search relevance requires metadata before heavier search infrastructure.

Impact: High for context quality and agent portability.

Implementation complexity: Medium.

Dependencies: `MGA-01`, `MGA-02`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Recommended implementation direction:

- Add JSON output modes to search, index, and impact helpers.
- Include authority, status, freshness, generated status, and source paths in records.
- Define retrieval profiles: startup, architecture, implementation, review, release, incident.
- Keep embeddings and vector storage out of scope until metadata is reliable.

#### MGA-07: Memory Integrity Model

Problem: Memory is append-oriented Markdown with limited lifecycle, provenance, duplicate handling, supersession, concurrency, or archive structure.

Why it matters: Memory influences future agents. Stale or conflicting memory can become operational misinformation.

Impact: High.

Implementation complexity: Medium.

Dependencies: `MGA-01`, `MGA-03`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Recommended implementation direction:

- Add memory entry IDs.
- Add status values: `active`, `resolved`, `superseded`, `archived`, `needs-review`.
- Add source evidence and validation fields.
- Define archive/compaction policy.
- Keep human-readable Markdown, but make entries structured enough to validate.

#### MGA-08: Agent-Neutral Core And Adapters

Problem: AI Brain is content-portable but operationally Codex-centric. Several workflows, templates, and CI jobs are tied to Codex conventions.

Why it matters: The stated platform target includes Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, and future agents.

Impact: High for portability and future MCP compatibility.

Implementation complexity: Medium to High.

Dependencies: `MGA-01`, `MGA-06`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Recommended implementation direction:

- Define AI Brain core contracts independent of Codex.
- Keep Codex-specific files as adapters.
- Add agent-neutral startup and handoff packet formats.
- Document adapter playbooks for target agents.
- Defer full MCP tooling until contracts are stable.

#### MGA-09: Developer Onboarding And Workflow Modes

Problem: The app is easy to start, but AI Brain creates a large reading surface with no curated first-hour guide or task-size workflow modes.

Why it matters: New developers can become productive in the app within one hour, but not in the full AI Brain operating model.

Impact: High for team scaling and correct process adoption.

Implementation complexity: Low to Medium.

Dependencies: `MGA-01`.

Recommended sprint: Epic 2 Hardening Sprint 1.

Recommended implementation direction:

- Add first-day onboarding guide.
- Add command cheat sheet.
- Add `read first / read later / reference / generated / advisory` labels.
- Add task-size workflows: tiny, small, medium, major, security/release-sensitive.
- Add good-first-task examples.

#### MGA-10: Change-Scope Validation Model

Problem: Validation is strong but not sufficiently scoped. Full diff gate is useful but can be too broad for docs-only changes and too coarse for future large-repo work.

Why it matters: If validation is too expensive, people and agents will skip it. If it is too narrow, regressions escape.

Impact: High for developer velocity and reliability.

Implementation complexity: Medium.

Dependencies: `MGA-01`, partial dependency on `MGA-05`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Recommended implementation direction:

- Define validation profiles: docs, app-local, domain, UI, security, release, AI Brain.
- Map changed paths to recommended validation commands.
- Keep `bash scripts/diff-gate.sh` as full confidence gate.
- Add docs-only checks and required-file checks.

### Medium

#### MGA-11: AI Brain Tooling Test Coverage And Metrics

Problem: AI Brain scripts are platform code but do not have dedicated tests, search quality checks, or operational metrics.

Why it matters: As AI Brain becomes part of the SDLC, helper script regressions can degrade every agent workflow.

Impact: Medium to High.

Implementation complexity: Medium.

Dependencies: `MGA-05`, `MGA-06`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Recommended implementation direction:

- Add focused tests for argument parsing, duplicate refusal, generated output shape, exclusion rules, and failure behavior.
- Add search smoke tests for common queries.
- Emit file counts, skipped counts, output paths, and elapsed times.

#### MGA-12: Automation Safety And Read-Only Scans

Problem: Many manual processes are candidates for automation, but safe activation requires ownership, validation, output control, stop conditions, and rollback.

Why it matters: Automation can reduce manual drift detection, but overpowered automation would create security and integrity risk.

Impact: Medium.

Implementation complexity: Medium.

Dependencies: `MGA-02`, `MGA-03`, `MGA-04`, `MGA-05`.

Recommended sprint: Epic 2 Hardening Sprint 3.

Recommended implementation direction:

- Start with read-only/reporting automations: stale docs, index freshness, review finding status, daily health.
- Keep source edits and remediation out of automation.
- Require activation validation and first-run review.

#### MGA-13: Release And Operations Readiness Evidence

Problem: Deployment, release, incident response, native iOS/Android production validation, and operational maintenance are not complete operating systems yet.

Why it matters: AI Brain can support planning and evidence collection, but it is not enough for production release governance.

Impact: Medium for Epic 2 unless Epic 2 includes production release or native release goals; high when release work begins.

Implementation complexity: Medium to High.

Dependencies: Product/release strategy, native build path, secrets policy, observability plan.

Recommended sprint: Epic 2 Sprint 3 or later, unless Epic 2 includes release work.

Recommended implementation direction:

- Add release readiness checklist.
- Keep native build placeholders explicit.
- Add incident template and postmortem memory workflow before production operations.
- Do not automate deployment or app store release yet.

#### MGA-14: Product, UX, Data, And Design Knowledge Capture

Problem: Several judgment-heavy areas still live partly in developer heads: product tradeoffs, data curation, recommendation tuning, UX rationale, design standards, and release judgment.

Why it matters: AI agents need durable rationale, not only current implementation facts.

Impact: Medium.

Implementation complexity: Medium.

Dependencies: `MGA-01`, product/design ownership.

Recommended sprint: Epic 2 Sprint 2 or 3.

Recommended implementation direction:

- Add concise decision logs for product, data curation, recommendation tuning, UX/design, and release judgment.
- Avoid duplicating full docs; capture rationale and links.

#### MGA-15: Future Multi-Repo And Scale Contracts

Problem: AI Brain assumes one repository. It has no repo identity, workspace registry, multi-repo ownership map, or federated index plan.

Why it matters: This is not blocking current repo work, but it will block future scale if multiple repositories appear.

Impact: Medium.

Implementation complexity: Medium.

Dependencies: `MGA-01`, `MGA-06`, future multi-repo need.

Recommended sprint: Epic 2 Sprint 4 or later.

Recommended implementation direction:

- Define a lightweight `repo-profile` concept.
- Defer full workspace registry until a second repository exists or is planned.

### Low

#### MGA-16: Visual Architecture And Troubleshooting Aids

Problem: The repo has good text maps but lacks a compact visual architecture diagram and first-day troubleshooting notes.

Why it matters: Visual and troubleshooting aids reduce onboarding interruptions.

Impact: Low to Medium.

Implementation complexity: Low.

Dependencies: `MGA-09`.

Recommended sprint: Epic 2 Sprint 2.

Recommended implementation direction:

- Add a route -> screen -> domain -> data -> test diagram.
- Add troubleshooting notes for Node, Expo web, simulator availability, build output, and `.env.local` hygiene.

#### MGA-17: Search Backend Evolution

Problem: Search is currently linear keyword search.

Why it matters: This is acceptable now but will not scale indefinitely.

Impact: Low today, higher later.

Implementation complexity: Medium to High if using full-text or semantic search.

Dependencies: `MGA-01`, `MGA-02`, `MGA-06`, real scale triggers.

Recommended sprint: Later, after Epic 2 unless search latency/relevance becomes a measured blocker.

Recommended implementation direction:

- Defer SQLite FTS, vector databases, and embeddings.
- Revisit only after metadata, JSON records, and search quality tests exist.

#### MGA-18: Native Release Automation

Problem: Native iOS/Android release automation is not configured.

Why it matters: The product targets iOS, Android, and Web, but native release automation requires signing, EAS/native build strategy, and release ownership.

Impact: Low for AI Brain Epic 2 hardening unless Epic 2 includes native release.

Implementation complexity: High.

Dependencies: Product release plan, Expo/EAS or native strategy, credentials, CI cost policy.

Recommended sprint: Later release-readiness epic.

Recommended implementation direction:

- Keep native gaps explicit.
- Do not treat native release automation as an AI Brain hardening prerequisite.

## Implementation Roadmap

### Epic 2 Hardening Sprint 0: Readiness Gate

Goal: Make AI Brain safe to use as the planning layer for Epic 2.

Required:

- `MGA-01`: Authority and source-of-truth contract.
- `MGA-02`: Artifact lifecycle and freshness model.
- `MGA-03`: Review finding registry.
- `MGA-04`: Security boundary hardening.

Exit criteria:

- Canonical vs generated vs advisory files are clear.
- Review findings have IDs and status.
- Startup includes permission/security preflight.
- Generated artifacts have retention/freshness rules.

### Epic 2 Hardening Sprint 1: Trust And Usability

Goal: Make AI Brain easier to use and harder to misuse.

Required:

- `MGA-05`: AI Brain validation and health checks.
- `MGA-06`: Structured retrieval contracts.
- `MGA-07`: Memory integrity model.
- `MGA-09`: Developer onboarding and workflow modes.

Exit criteria:

- First-day guide exists.
- Metadata can be validated.
- Search/index outputs have structured forms or defined contracts.
- Memory has lifecycle/status fields.

### Epic 2 Hardening Sprint 2: Agent And Validation Scale

Goal: Prepare AI Brain for multi-agent execution and larger change volume.

Required:

- `MGA-08`: Agent-neutral core and adapters.
- `MGA-10`: Change-scope validation model.
- `MGA-11`: AI Brain tooling test coverage and metrics.
- `MGA-16`: Visual architecture and troubleshooting aids.

Exit criteria:

- Codex-specific workflows are clearly adapters.
- Validation profiles exist.
- AI Brain scripts have basic tests or smoke checks.
- Onboarding includes visual system map.

### Epic 2 Sprint 3: Safe Automation And Operational Evidence

Goal: Add read-only automation and prepare for operational workflows.

Required if Epic 2 includes process automation:

- `MGA-12`: Automation safety and read-only scans.
- `MGA-13`: Release and operations readiness evidence.
- `MGA-14`: Product, UX, data, and design knowledge capture.

Exit criteria:

- Any automation is read-only/reporting unless explicitly approved.
- Release/incident gaps are documented with owners.
- Judgment-heavy knowledge has durable capture points.

### Later: Scale Infrastructure

Goal: Avoid premature optimization while preserving a path to scale.

Deferred:

- `MGA-15`: Future multi-repo and scale contracts.
- `MGA-17`: Search backend evolution.
- `MGA-18`: Native release automation.

Exit criteria:

- Triggered only by real multi-repo, search-latency, release, or scale pressure.

## Severity Summary

| Severity | Items |
| --- | --- |
| Critical | `MGA-01`, `MGA-02`, `MGA-03`, `MGA-04` |
| High | `MGA-05`, `MGA-06`, `MGA-07`, `MGA-08`, `MGA-09`, `MGA-10` |
| Medium | `MGA-11`, `MGA-12`, `MGA-13`, `MGA-14`, `MGA-15` |
| Low | `MGA-16`, `MGA-17`, `MGA-18` |

## Final Position

AI Brain should not start Epic 2 as-is if Epic 2 depends on AI Brain for broad planning, multi-agent execution, automation, or durable knowledge governance.

The platform does not need a rewrite. It needs a hardening pass focused on authority, lifecycle, validation, security, and onboarding. Once Epic 2 Hardening Sprint 0 is complete, AI Brain can be used for Epic 2 with controlled risk. Once Sprints 1 and 2 are complete, it becomes a much stronger multi-agent SDLC platform.
