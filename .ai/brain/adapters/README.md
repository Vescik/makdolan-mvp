# AI Brain Agent Adapters

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-agent-adapters-readme` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Catalogs AI Brain agent adapters and defines how runtime-specific instructions relate to the agent-neutral core. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Adapters map the agent-neutral AI Brain contract in `../agent-start.md` to a specific runtime or capability profile.

Adapters are thin. They may explain runtime commands, permissions, review tools, prompt entrypoints, and handoff mechanics. They must not redefine product scope, security policy, source-of-truth rules, generated artifact lifecycle, retrieval contracts, memory integrity, or validation expectations.

## Available Adapters

| Adapter | Runtime | Status | Use When |
| --- | --- | --- | --- |
| `codex.md` | Codex | Active | The session runs in Codex or uses Codex-specific tools, hooks, `/goal`, or `codex review --uncommitted`. |
| `generic-agent.md` | Generic Markdown-reading shell-capable agent | Active | The agent can read repository Markdown and optionally run local shell commands but has no dedicated adapter. |

ChatGPT, Claude Code, GitHub Copilot, Gemini, and future agents should use `generic-agent.md` until a dedicated adapter is accepted.

## Adapter Rules

- Start from `../agent-start.md`; then apply one runtime adapter.
- Keep runtime-specific words, command names, permission names, and tool names in adapter docs.
- Keep reusable templates, generated artifact text, and canonical AI Brain governance agent-neutral.
- Do not use an adapter to approve unsafe operations, bypass validation, or weaken secret handling.
- Add a dedicated adapter only when generic guidance causes repeated ambiguity or the runtime has materially different startup, validation, handoff, or permission behavior.

## Maintenance

Update this directory when:

- A new agent runtime becomes a regular Makdolan contributor.
- Runtime-specific behavior changes in a way that affects startup, safety, validation, memory, or handoff.
- Canonical AI Brain policy moves and adapters need refreshed links.
