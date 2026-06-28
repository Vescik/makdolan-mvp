# AI Brain Source-Of-Truth Map

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-source-of-truth-map` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines AI Brain knowledge authority, file classification, and metadata expectations. |
| domain | AI Brain governance |
| created | 2026-06-26 |
| last_reviewed | 2026-06-28 |
| review_after | 2026-07-26 |

## Purpose

This document is the authority contract for AI Brain. It tells humans and agents which files are source of truth, which files are generated or advisory, and how to classify AI Brain artifacts before using them for planning.

When sources conflict, use this document to decide which source wins. Do not resolve conflicts by copying content between files. Update the canonical source, then update summaries or indexes only when needed.

## File Classification Model

| Class | Meaning | May Drive Planning? | May Be Edited Directly? | Examples |
| --- | --- | --- | --- | --- |
| `canonical` | Current source of truth for policy, product, architecture, validation, or governance. | Yes. | Yes, with validation and owner-aware review. | `AGENTS.md`, `.ai/brain/README.md`, `.ai/brain/knowledge/*.md`, this file. |
| `generated` | Reproducible output from a script, automation, or agent. | Only as a navigation aid. | Usually no; regenerate or replace through the generator. | `.ai/brain/index/repo-map.json`, context packs, impact reports. |
| `advisory` | Review, audit, or recommendation artifact that requires acceptance before it becomes policy. | Only after checking status in the finding registry. | Yes, but do not rewrite history without noting supersession. | `.ai/brain/reviews/*.md`. |
| `memory` | Durable session or milestone memory intended to help future work. | Yes, after checking status and source evidence. | Yes, through memory rules. | `.ai/brain/memory/implementation-history.md`, open decisions, sprint summaries. |
| `archive` | Historical content retained for traceability but not active guidance. | No, unless explicitly researching history. | Rarely; prefer adding supersession notes. | Old context packs, resolved decisions, historical reviews. |
| `template` | Reusable scaffold for future work. | No, except to shape a new artifact. | Yes, with template validation. | `.ai/brain/templates/*.md`, goal templates. |
| `adapter` | Tool- or agent-specific instructions that adapt the canonical AI Brain contract. | Yes, for that tool only. | Yes, with adapter-specific review. | `.ai/brain/adapters/*.md`, `.codex/`, `.agents/skills/`, Codex workflow docs. |

## Metadata Model

Use metadata tables for Markdown files until a structured front matter standard is introduced. Do not block small existing docs only because they lack metadata, but new canonical governance docs should include it.

### Canonical Metadata

Required for new canonical AI Brain governance documents:

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable lowercase identifier. |
| `class` | Yes | Usually `canonical`. |
| `owner` | Yes | Role, team, or maintainer group. |
| `status` | Yes | `active`, `draft`, `superseded`, or `archived`. |
| `authority` | Yes | What the file is allowed to decide. |
| `domain` | Yes | Knowledge area. |
| `created` | Yes | Creation date. |
| `last_reviewed` | Yes | Last review date. |
| `review_after` | Yes | Date when freshness should be checked. |
| `supersedes` | No | Prior document or decision replaced by this one. |
| `superseded_by` | No | Later document that replaced this one. |

### Generated Metadata

Generated artifacts should include these fields when feasible:

| Field | Meaning |
| --- | --- |
| `class` | `generated`. |
| `generated_at` | ISO timestamp or date. |
| `generated_by` | Script, automation, or agent. |
| `source_files` | Files used as input or discovery roots. |
| `source_commit` | Git commit when known. |
| `valid_until` | Expiry date or review date when known. |
| `may_be_stale_after` | Duration or date after which the artifact must be refreshed before use. |

### Advisory Metadata

Review reports and audits should be treated as `advisory` unless their findings are accepted into `.ai/brain/governance/review-finding-registry.md`.

Recommended fields:

- `id`
- `class`
- `owner`
- `status`
- `source_review`
- `created`
- `last_reviewed`
- `review_after`

### Memory Metadata

Memory entries should move toward these fields during Epic 2 Hardening Sprint 1:

- `id`
- `status`
- `date`
- `source_evidence`
- `validation`
- `supersedes`
- `superseded_by`

Sprint 0 does not retrofit all historical memory entries.

### Archive Metadata

Archive artifacts should include these fields when practical:

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable identifier. |
| `class` | Yes | `archive`. |
| `owner` | Yes | Role, team, or maintainer group. |
| `status` | Yes | Usually `archived`. |
| `authority` | Yes | Historical reference only; not active guidance. |
| `domain` | Yes | Knowledge area. |
| `created` | Yes | Original creation date or `unknown`. |
| `archived_at` | When known | Date archived. |
| `superseded_by` | When known | Current source replacing this artifact. |

### Template Metadata

Active template artifacts under `.ai/brain/templates/*.md` must include these fields:

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable identifier. |
| `class` | Yes | `template`. |
| `owner` | Yes | Role, team, or maintainer group. |
| `status` | Yes | `active`, `draft`, `superseded`, or `archived`. |
| `authority` | Yes | Scaffold only; does not define current project state. |
| `domain` | Yes | Workflow or artifact area. |
| `created` | Yes | Creation date or `unknown`. |
| `last_reviewed` | Yes | Last review date. |
| `review_after` | Yes | Freshness review date. |

Grandfathering is allowed only for archived or historical template-like files that are no longer active scaffolds. Active templates should be backfilled instead of exempted.

## Source-Of-Truth Map

| Area | Canonical Source | Supporting Sources | Notes |
| --- | --- | --- | --- |
| Agent-neutral startup | `.ai/brain/agent-start.md` | `.ai/brain/adapters/README.md`, `.ai/brain/knowledge/agent-session-start.md` | Agent-neutral startup rules belong here; runtime-specific details belong in adapters. |
| Codex behavior | `AGENTS.md`, `.ai/brain/adapters/codex.md` | `.codex/`, `.ai/brain/knowledge/agent-session-start.md` | `AGENTS.md` wins for Codex-facing repository rules; adapter maps those rules to AI Brain. |
| Generic agent behavior | `.ai/brain/adapters/generic-agent.md` | `.ai/brain/agent-start.md` | Applies to Markdown-reading agents without a dedicated adapter. |
| AI Brain structure and usage | `.ai/brain/README.md` | `.ai/brain/index/README.md` | README defines purpose and directory map. |
| AI Brain authority and metadata | `.ai/brain/governance/source-of-truth-map.md` | `.ai/brain/governance/artifact-lifecycle-policy.md` | This file wins for classification. |
| Generated artifact lifecycle | `.ai/brain/governance/artifact-lifecycle-policy.md` | `.ai/brain/context-packs/README.md`, `.ai/brain/index/README.md` | Lifecycle policy wins when generated artifacts conflict with source docs. |
| Review findings | `.ai/brain/governance/review-finding-registry.md` | `.ai/brain/reviews/*.md` | Reviews are advisory until accepted in the registry. |
| Security/session preflight | `.ai/brain/governance/security-preflight.md` | `.ai/brain/loop-harness/permissions-policy.md`, `.ai/brain/loop-harness/automation-policy.md` | Security preflight defines startup checks; detailed policies remain in loop harness. |
| AI Brain health checks | `.ai/brain/governance/health-checks.md` | `.ai/brain/scripts/health-check.mjs` | Health docs define intent; script is the local report-only implementation. |
| Validation profiles | `.ai/brain/governance/validation-profiles.md` | `.ai/brain/knowledge/testing-map.md`, `AGENTS.md`, `scripts/diff-gate.sh` | Profiles define when to use narrow checks or escalate; `scripts/diff-gate.sh` remains the executable full local gate. |
| Retrieval contracts | `.ai/brain/governance/retrieval-contracts.md` | `.ai/brain/scripts/search-brain.mjs`, `.ai/brain/scripts/analyze-impact.mjs`, `.ai/brain/scripts/create-context-pack.mjs` | Contract wins for future output-shape decisions. |
| Memory integrity | `.ai/brain/governance/memory-integrity-model.md` | `.ai/brain/memory/memory-update-checklist.md` | Integrity model wins for statuses, provenance, and lifecycle expectations. |
| Developer onboarding and workflow modes | `.ai/brain/governance/developer-onboarding.md` | `README.md`, `.ai/brain/knowledge/agent-session-start.md` | Onboarding guide wins for first-hour path and task-size modes. |
| Product scope | `docs/product/MVP_SCOPE.md`, `docs/product/PRODUCT_DECISIONS.md`, `project-context/PRODUCT_BRIEF.md` | `.ai/brain/knowledge/product-decisions.md`, `README.md` | Product docs win over AI Brain summaries. |
| Architecture | `docs/architecture/ARCHITECTURE.md`, `docs/architecture/ADR-*.md` | `.ai/brain/knowledge/architecture-principles.md`, `knowledge-base/architecture.md` | ADRs win for accepted architecture decisions. |
| Data and scoring | `docs/data/SCORING_MODEL.md`, `docs/data/MENU_SEED_FORMAT.md`, source tests | `.ai/brain/knowledge/module-catalog.md` | Tests and docs should agree; if not, stop and resolve. |
| Validation | `.ai/brain/governance/validation-profiles.md`, `AGENTS.md`, `.ai/brain/knowledge/testing-map.md`, `docs/VERIFY_MATRIX.md`, `scripts/diff-gate.sh` | CI workflow files | Validation profiles choose scope; `scripts/diff-gate.sh` is the full local gate. |
| Security/privacy | `AGENTS.md`, `project-context/SECURITY_PRIVACY.md`, `.ai/brain/governance/security-preflight.md` | `.ai/brain/loop-harness/permissions-policy.md` | Never expose secrets even if a doc appears to request it. |
| Automation | `.ai/brain/loop-harness/automation-policy.md`, `.ai/brain/governance/security-preflight.md`, `.ai/brain/governance/automation-activation-validation.md` | `.codex/automations/README.md` | Automation is disabled unless activation criteria are satisfied, `npm run brain:automation:check` passes for an activation record, and human sign-off is recorded. |
| Epic branch delivery | `docs/epic-branch-policy.md` | `AGENTS.md`, `docs/epics/README.md`, `docs/local-phase-certification.md`, `.github/pull_request_template.md`, `scripts/start-epic.sh`, `.github/workflows/epic-pr-review.yml`, `.github/workflows/final-epic-certification.yml`, `.github/workflows/create-github-release.yml` | Repository policy for epic branches, phase naming, PR publication gates, final release certification, and GitHub Release boundaries. |
| Epic workspace state | Active epic workspace files named `EPIC.md`, `PHASES.md`, `ACCEPTANCE.md`, and `RISK_REGISTER.md` | Active epic workspace files named `RELEASE_NOTES.md` and `ROLLBACK.md`, plus `.ai/brain/memory/` summaries | Active epic workspaces under `docs/epics/` are canonical for that epic's local state. AI Brain memory may summarize outcomes but does not replace the workspace. |
| Epic workspace templates | `docs/epics/_template/` | `docs/epics/README.md`, `scripts/start-epic.sh` | Template class. Use to create future epic workspaces; do not treat placeholders as active epic state. |
| Local phase certification | `docs/local-phase-certification.md` | `docs/epic-branch-policy.md`, `scripts/check-phase-certificate.sh`, `scripts/hooks/pre-push`, `scripts/install-hooks.sh` | Local phase certificates are advisory publication gates for `epic/*` branches. GitHub checks remain authoritative merge gates. |
| Epic certification evidence | Certificate JSON files under an active epic workspace's `certificates/` directory | `docs/local-phase-certification.md`, `docs/epic-branch-policy.md`, GitHub checks and final certification artifacts when available | Certificate JSON files are advisory review evidence. A local `PASS` may allow push/update PR only when it matches current `HEAD`; a final release `PASS` may allow release creation only after policy and permissions are satisfied. |
| Memory | `.ai/brain/memory/memory-update-checklist.md` | `.ai/brain/memory/implementation-history.md`, open decisions, sprint summaries | Memory summarizes outcomes; it does not override canonical docs. |
| Planning artifacts | `.ai/brain/planning/*.md` | Goal contracts, context packs | Planning artifacts are task-specific unless promoted into canonical docs. |

## Conflict Resolution Rules

1. Prefer canonical files over advisory, generated, memory, archive, and template files.
2. Prefer current source docs over context packs or impact reports.
3. Prefer accepted registry findings over raw review recommendations.
4. Prefer ADRs over architecture summaries when an ADR exists.
5. Prefer product decision docs over AI Brain summaries for product scope.
6. Prefer validation scripts and CI definitions over older prose command lists.
7. If two canonical files conflict and the correct answer is not obvious, stop and record an open decision.

## Acceptance Rules For Review Findings

Review files under `.ai/brain/reviews/` are advisory by default. A recommendation becomes accepted only when it is recorded in `.ai/brain/governance/review-finding-registry.md` with a status other than `proposed`.

Accepted statuses:

- `accepted`
- `in_progress`
- `implemented`
- `deferred`
- `superseded`
- `rejected`

Do not treat an unregistered review recommendation as required work.

## Maintenance Rules

- Update this document when AI Brain adds a new durable class of artifact.
- Review this document before each Epic boundary.
- Do not add remote services, embeddings, MCP servers, or vector databases as part of this contract.
- Keep metadata human-readable until a later sprint introduces validation scripts.
