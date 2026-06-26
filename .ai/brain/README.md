# AI Brain Pro

AI Brain Pro is Makdolan's repository-local SDLC intelligence layer. It helps Codex and human maintainers start work with the right context, plan large changes safely, preserve useful project memory, and keep validation evidence attached to meaningful work.

AI Brain Pro is not a product-facing AI feature. It must not change the MVP product scope by itself, and it must not introduce AI chat into the user experience unless a later product decision explicitly approves that work.

## How To Use

For any large, ambiguous, or cross-platform task:

1. Read `knowledge/agent-session-start.md`.
2. Read the relevant knowledge files for the affected area.
3. Create or follow a goal contract from `loop-harness/goal-contract-template.md`.
4. Use the SDLC loop: discover, plan, execute, verify, iterate.
5. Update `memory/` after meaningful changes.

For small one-file fixes, use judgment. You still need validation evidence, but you do not need to create a full goal contract unless the change is risky.

## Directory Map

| Path | Purpose |
|---|---|
| `planning/` | Discovery reports, implementation plans, and phase plans. |
| `knowledge/` | Stable project operating context for new Codex sessions. |
| `loop-harness/` | Rules and templates for goal contracts, validation, permissions, automation, and stop conditions. |
| `context-packs/` | Focused bundles of links and summaries for a task area. |
| `templates/` | Reusable Markdown templates for planning and review artifacts. |
| `memory/` | Implementation history, open decisions, and sprint summaries. |
| `index/` | Navigational index for AI Brain files and source documents. |
| `scripts/` | Future home for helper scripts; currently documentation-only. |

## Source Of Truth Boundaries

- `AGENTS.md` is the top-level instruction file for Codex behavior.
- `docs/` and `project-context/` are source material for product, architecture, data, and testing decisions.
- `knowledge-base/` stores durable product and architecture facts.
- `.ai/brain/` stores operating context, planning artifacts, session memory, and workflow guardrails.

Do not duplicate whole documents into AI Brain files. Summarize, link, and preserve the source path.
