# AI Brain Pro

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-readme` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines AI Brain purpose, usage, directory map, and source-of-truth boundaries. |
| domain | AI Brain governance |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

AI Brain Pro is Makdolan's repository-local SDLC intelligence layer. It helps AI agents and human maintainers start work with the right context, plan large changes safely, preserve useful project memory, and keep validation evidence attached to meaningful work.

AI Brain Pro is not a product-facing AI feature. It must not change the MVP product scope by itself, and it must not introduce AI chat into the user experience unless a later product decision explicitly approves that work.

## How To Use

For any large, ambiguous, or cross-platform task:

1. Read `agent-start.md`.
2. Read the relevant adapter under `adapters/`.
3. Read `knowledge/agent-session-start.md`.
4. Run the security/session preflight in `governance/security-preflight.md`.
5. Use `governance/source-of-truth-map.md` to identify canonical, generated, advisory, memory, archive, template, and adapter files.
6. Use `governance/developer-onboarding.md` for first-hour onboarding, command lookup, and task-size workflow mode selection.
7. Use `governance/validation-profiles.md` to choose the validation profile and escalation path.
8. Read the relevant knowledge files for the affected area.
9. Create or follow a goal contract from `loop-harness/goal-contract-template.md`.
10. Use the SDLC loop: discover, plan, execute, verify, iterate.
11. Run `npm run brain:health` for meaningful AI Brain governance, generated artifact, review registry, memory, or onboarding changes.
12. Update `memory/` after meaningful changes.

For small one-file fixes, use judgment. You still need validation evidence, but you do not need to create a full goal contract unless the change is risky.

## Directory Map

| Path | Purpose |
|---|---|
| `agent-start.md` | Agent-neutral startup contract for AI Brain sessions. |
| `adapters/` | Runtime-specific mappings for Codex and generic Markdown-reading agents. |
| `planning/` | Discovery reports, implementation plans, and phase plans. |
| `certification/` | Independent readiness certificates, certification reports, and certification backlog. |
| `governance/` | Source-of-truth map, artifact lifecycle policy, review finding registry, and security preflight. |
| `knowledge/` | Stable project operating context for new agent sessions. |
| `loop-harness/` | Rules and templates for goal contracts, validation, permissions, automation, and stop conditions. |
| `context-packs/` | Focused bundles of links and summaries for a task area. |
| `templates/` | Reusable Markdown templates for planning and review artifacts. |
| `memory/` | Implementation history, open decisions, and sprint summaries. |
| `index/` | Navigational index for AI Brain files and source documents. |
| `scripts/` | Deterministic local helper scripts for context packs, indexing, search, impact analysis, and memory updates. |

## Source Of Truth Boundaries

- `.ai/brain/agent-start.md` is the agent-neutral startup contract for AI Brain sessions.
- `.ai/brain/adapters/` maps the agent-neutral contract to runtime-specific behavior.
- `AGENTS.md` is the Codex-facing repository instruction file and Codex adapter entrypoint.
- `docs/` and `project-context/` are source material for product, architecture, data, and testing decisions.
- `knowledge-base/` stores durable product and architecture facts.
- `.ai/brain/` stores operating context, planning artifacts, session memory, and workflow guardrails.
- `.ai/brain/governance/source-of-truth-map.md` defines file classes, metadata expectations, and conflict resolution.
- `.ai/brain/governance/artifact-lifecycle-policy.md` defines generated artifact freshness and retention rules.
- `.ai/brain/governance/review-finding-registry.md` is the accepted backlog/status source for review recommendations.
- `.ai/brain/governance/security-preflight.md` defines session startup safety checks and automation activation requirements.
- `.ai/brain/governance/health-checks.md` defines local AI Brain health checks and generated-text secret scanning.
- `.ai/brain/governance/validation-profiles.md` defines change-scope validation profiles, escalation rules, skipped-check wording, and evidence expectations.
- `.ai/brain/governance/retrieval-contracts.md` defines structured retrieval contracts for index/search/impact/context workflows.
- `.ai/brain/governance/memory-integrity-model.md` defines memory statuses, provenance, and lifecycle expectations.
- `.ai/brain/governance/developer-onboarding.md` defines first-hour onboarding, command cheat sheet, and task-size workflow modes.

Do not duplicate whole documents into AI Brain files. Summarize, link, and preserve the source path.

Review reports under `.ai/brain/reviews/` are advisory unless a finding is accepted in `governance/review-finding-registry.md`.
