# Generic Agent Adapter

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-adapter-generic-agent` |
| class | `adapter` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Maps the AI Brain agent-neutral startup contract to any Markdown-reading shell-capable agent without a dedicated adapter. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this adapter for ChatGPT, Claude Code, GitHub Copilot, Gemini, or future agents until a dedicated runtime adapter is accepted.

The durable core contract is `../agent-start.md`. This adapter assumes the agent can read Markdown files and may be able to run local shell commands with user approval.

## Minimum Capabilities

An agent can use AI Brain through this adapter when it can:

- Read repository files.
- Follow Markdown links and relative paths.
- Inspect relevant source code or documentation before planning edits.
- Record source paths for evidence.
- Either run local validation commands or ask a human/operator to run them and provide output.

If the agent cannot inspect files directly, it should not claim AI Brain readiness or implementation completion. It may prepare questions, a handoff packet, or a review checklist only.

## Startup Mapping

1. Read `../agent-start.md`.
2. Read `../README.md` for AI Brain structure.
3. Read `../governance/security-preflight.md`.
4. Read `../governance/source-of-truth-map.md`.
5. Read `../governance/developer-onboarding.md` and choose a workflow mode.
6. Read `../knowledge/agent-session-start.md` for Makdolan-specific context.
7. Read task-specific canonical docs and inspect affected files directly.
8. Use `../templates/agent-handoff-packet-template.md` if the session cannot finish the task.

## Permission Mapping

Use capability-based permissions instead of runtime-specific names:

| Capability | Rule |
| --- | --- |
| Read files | Allowed for relevant repository files except secrets, credentials, private data, and `.env.local`. |
| Edit files | Allowed only within task scope after planning. |
| Run commands | Use local deterministic validation commands; record command, result, and important output. |
| Network access | Avoid unless the user explicitly requests current external information or the task requires it. |
| Destructive action | Requires explicit approval and a rollback/recovery note. |
| Automation | Report-only until activation criteria are satisfied and explicitly approved. |

## Validation Mapping

If shell access is available, run the smallest relevant local command set from:

- `../knowledge/testing-map.md`
- `../governance/developer-onboarding.md`
- `../../../AGENTS.md`

If shell access is unavailable:

- List the exact commands the operator must run.
- Ask for command output.
- Mark validation as pending until evidence is provided.
- Do not mark implementation complete without validation evidence.

## Handoff Mapping

Before transferring work, fill out `../templates/agent-handoff-packet-template.md`.

The packet should include source files read, decisions, assumptions, changed files, commands, validation evidence, risks, next action, and stop conditions. Do not include secrets, private data, raw chat transcripts, or full source dumps.
