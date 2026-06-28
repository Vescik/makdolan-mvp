# Codex Adapter

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-adapter-codex` |
| class | `adapter` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Maps the AI Brain agent-neutral startup contract to Codex runtime behavior. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this adapter when the session is running in Codex.

The durable core contract is `../agent-start.md`. This adapter explains how Codex-specific files, commands, permissions, and review flows apply that contract.

## Codex Entrypoints

| Codex Surface | Role |
| --- | --- |
| `../../../AGENTS.md` | Codex-facing repository instructions, lifecycle, validation, security, and project rules. |
| `../agent-start.md` | Agent-neutral AI Brain startup contract. |
| `../../../.codex/README.md` | Repository-local Codex setup notes when present. |
| `../../../.codex/config.toml` | Codex runtime configuration when present. |
| `../../../.codex/hooks.json` | Codex hook configuration when present. |
| `../../../.codex/agents/*.toml` | Codex subagent profiles when present. |
| `../loop-harness/*.md` | Goal, maker-checker, stop condition, automation, permission, and worktree policies. |

If `AGENTS.md` and AI Brain docs appear to conflict, use `../governance/source-of-truth-map.md` to classify the conflict. Stop and record an open decision when two active canonical sources disagree.

## Runtime Mapping

| AI Brain Concept | Codex Mapping |
| --- | --- |
| Agent-neutral startup | Read `../agent-start.md`, this adapter, then `../../../AGENTS.md`. |
| Security/session preflight | Follow `../governance/security-preflight.md` and the active Codex permission/network context. |
| Workflow mode | Use `../governance/developer-onboarding.md`; for multi-step work, use a goal contract. |
| Goal contracts | Use Codex `/goal` when available, or the manual templates in `../loop-harness/` and `../templates/`. |
| Maker-checker review | Use `../loop-harness/maker-checker-flow.md`; `codex review --uncommitted` is the local Codex checker option when available. |
| Permissions | Treat sandbox mode and approval policy as runtime constraints. Never escalate destructive, release, credential, automation, or networked work without explicit user approval. |
| Hooks | Treat `.codex/hooks.json` as adapter-level automation. Hooks remain subject to `../loop-harness/automation-policy.md` and `../governance/security-preflight.md`. |
| Handoff | Use `../templates/agent-handoff-packet-template.md` before pausing or transferring a Codex task. |

## Codex Safety Notes

- Do not treat Codex convenience tools as approval to bypass AI Brain governance.
- Do not paste secrets, `.env.local`, credentials, private data, or raw chat transcripts into AI Brain memory, planning, review, or generated artifacts.
- Do not enable automations or modify hooks unless the task explicitly approves that scope and the automation activation checklist is satisfied.
- Prefer local deterministic commands and existing npm scripts.
- For docs-only certification work, state explicitly when app validation is skipped because app behavior did not change.

## Codex Validation Notes

Use the repository commands in `../../../AGENTS.md`. For meaningful AI Brain changes, run:

```bash
npm run brain:health
git diff --check
bash scripts/diff-gate.sh
```

For larger or riskier Codex changes, include checker evidence from `codex review --uncommitted` when available, or document why separate checker review was not required.
