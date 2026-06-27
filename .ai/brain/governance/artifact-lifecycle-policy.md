# AI Brain Artifact Lifecycle Policy

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-artifact-lifecycle-policy` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines generated artifact lifecycle, freshness, retention, and usage rules. |
| domain | AI Brain governance |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

## Purpose

AI Brain creates useful generated artifacts: context packs, repo indexes, impact reports, review reports, health reports, and future automation reports. These artifacts help agents move faster, but they are not automatically source of truth.

This policy defines how generated artifacts are classified, used, refreshed, retained, and retired.

## Artifact Classes

| Artifact type | Class | Default authority | Typical location |
| --- | --- | --- | --- |
| Repo index outputs | `generated` | Navigation and discovery aid | `.ai/brain/index/repo-map.json`, `file-catalog.md`, `module-map.md` |
| Context packs | `generated` | Task-start map only | `.ai/brain/context-packs/` |
| Impact reports | `generated` | Heuristic planning aid only | `.ai/brain/context-packs/` |
| Review reports | `advisory` | Recommendation source only | `.ai/brain/reviews/` |
| Master gap analysis | `advisory` until accepted into registry | Consolidated recommendation source | `.ai/brain/reviews/MASTER_GAP_ANALYSIS.md` |
| Readiness reports | `advisory` until accepted into registry | Planning evidence | `.ai/brain/planning/` |
| Sprint completion reports | `memory` or `advisory` depending on content | Completion evidence | `.ai/brain/planning/` |
| Automation reports | `generated` | Advisory scan output only | `.ai/brain/context-packs/` or approved report path |
| Templates | `template` | Scaffold only | `.ai/brain/templates/` |

## Freshness Rules

| Artifact | Freshness expectation | Refresh before use when |
| --- | --- | --- |
| Repo index | Refresh after meaningful file structure, script, docs, or AI Brain changes. | Index output predates relevant changes or impact/search results feel wrong. |
| Context pack | Fresh for the task/session it was created for. | The task scope changes, linked files change, or it is older than 14 days. |
| Impact report | Fresh for the described planned change. | The planned change changes, repo index changes materially, or report is older than 14 days. |
| Review report | Advisory until superseded or accepted in registry. | A newer review or registry entry supersedes it. |
| Readiness report | Fresh for the epic/sprint gate it was created for. | Gate criteria change or a hardening sprint completes. |
| Automation report | Fresh for the run timestamp only. | Acting on findings after 7 days, or source files changed since the run. |

## Context Pack Freshness And Retention

Context packs are not source of truth.

Rules:

- Use context packs only as discovery maps.
- Read linked source files before planning or editing.
- Treat context packs older than 14 days as stale unless the task explicitly confirms they still apply.
- Treat context packs as expired after 30 days unless they are referenced by a planning artifact or sprint report.
- Do not update old context packs in place for new work. Create a new pack.
- Do not copy full source code, secrets, `.env.local`, credentials, private user data, or raw chat transcripts into context packs.

Retention:

- Active task context packs may remain under `.ai/brain/context-packs/`.
- Expired context packs should be ignored by planning unless explicitly cited for history.
- Do not delete existing context packs without explicit approval; archive/supersede policy can be implemented in a later sprint.

## Generated Artifact Metadata

New generated artifacts should include a metadata section when feasible:

| Field | Required | Notes |
| --- | --- | --- |
| `class` | Yes | Usually `generated`. |
| `generated_at` | Yes | ISO timestamp or date. |
| `generated_by` | Yes | Script, automation, or agent. |
| `task` | When task-scoped | Short task name. |
| `phase` | When SDLC-scoped | DISCOVER, PLAN, EXECUTE, VERIFY, ITERATE. |
| `source_files` | When known | Inputs or linked source files. |
| `source_commit` | When known | Git commit or `unknown`. |
| `valid_until` | When task-scoped | Date or policy reference. |
| `authority` | Yes | Usually "advisory" or "navigation aid". |

Existing generated artifacts are not retroactively invalid, but future agents must treat them according to this policy.

## Usage Rules

1. Never use generated artifacts as the only basis for implementation.
2. Confirm generated artifact claims against canonical docs and inspected source files.
3. Prefer current canonical docs over generated summaries.
4. Prefer accepted review registry items over raw review text.
5. Regenerate indexes before broad discovery when `.ai/brain/`, `docs/`, `project-context/`, `knowledge-base/`, `app/`, `src/`, scripts, or package commands changed.
6. Stop and report when a generated artifact conflicts with a canonical source.

## Automation Report Rules

Automation reports must:

- State they are advisory.
- Include run date, trigger, sandbox/network posture, output path, and stop conditions.
- Link to evidence instead of copying large source content.
- Avoid secrets, credentials, private user data, `.env.local`, and raw logs with sensitive values.
- Use an approved output path.

Automation reports must not:

- Rewrite source-of-truth docs automatically.
- Modify product or architecture decisions.
- Open, push, deploy, release, migrate, rotate credentials, or send external messages without explicit human approval.

## Recovery Rules

If a generated artifact is stale or wrong:

1. Do not silently treat it as current.
2. Check canonical sources.
3. Regenerate the artifact when safe.
4. If regeneration is not enough, record an open decision or review finding.
5. If sensitive data is present, remove it from the working tree, rotate affected credentials if needed, and document the incident without copying the secret value.

## Out Of Scope For Sprint 0

- No vector database.
- No embeddings.
- No MCP server.
- No remote service.
- No automated deletion of old artifacts.
- No generated artifact validator script unless a later sprint approves it.
