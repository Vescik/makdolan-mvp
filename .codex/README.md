# Project Codex Setup

This directory contains Makdolan project-scoped Codex configuration. Codex loads these files only when the repository is trusted.

## Current Layout

| Path | Purpose |
|---|---|
| `.codex/config.toml` | Project defaults for sandboxing, approval policy, model behavior, subagents, network access, and disabled MCP examples. |
| `.codex/hooks.json` | Project lifecycle hooks. Current hooks are limited to prompt secret scanning and a non-blocking stop reminder. |
| `.codex/hooks/` | Hook scripts used by `hooks.json`. |
| `.codex/automations/` | Disabled automation templates and activation policy. Nothing here runs automatically. |
| `.codex/agents/` | Project subagent role definitions for discovery, planning, execution, verification, and release review. |
| `.codex/rules/default.rules` | Command rules that prompt before destructive or release-sensitive commands. |
| `.codex/state/` | Local hook state. Do not treat it as product source of truth. |

## Safe Defaults

The project default is intentionally conservative:

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "user"

[sandbox_workspace_write]
network_access = false
```

This lets Codex edit files inside the trusted workspace and run local validation, while keeping network access off and asking before crossing the sandbox boundary.

## Permission Modes

Use `read-only` for:

- Discovery, audits, architecture review, and security review.
- Reviewing unfamiliar branches or untrusted code.
- Tasks that should not edit files.

Use `workspace-write` for:

- Normal implementation inside this repository.
- Documentation updates under `.ai/brain/`, `docs/`, or `project-context/`.
- Local validation such as `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build:web`, and `bash scripts/diff-gate.sh`.

Avoid `danger-full-access` for normal Makdolan work. Use it only in an isolated environment when a human has explicitly approved the risk and the task cannot be completed with narrower access.

## Network Policy

Default project network access is off. Enable network only for a scoped reason, such as fetching official documentation, downloading dependencies during setup, or interacting with an approved MCP/app connector.

Do not enable broad network access for:

- Routine implementation.
- Running tests that should work offline.
- Reading untrusted web pages into a coding session.
- Any task involving secrets, credentials, private user data, payments, authentication, or release systems.

For one-off CLI runs that need network in `workspace-write`, prefer an explicit override instead of changing project defaults:

```bash
codex -c sandbox_workspace_write.network_access=true
```

## Hooks

Project hooks are enabled by Codex only after the project config is trusted and the hook definitions are reviewed. Use `/hooks` in Codex CLI to inspect, trust, or disable project hooks.

Current hooks:

- `UserPromptSubmit`: scans prompt text for obvious secret/token patterns.
- `Stop`: writes `.codex/state/last-stop-reminder.md` as a non-blocking reminder to include validation evidence.

Do not add hooks that deploy, push, migrate data, rotate credentials, call external services, or modify source files without explicit human approval.

## Diff-Gate Hook Candidate

`bash scripts/diff-gate.sh` is the repository validation gate, but it is not wired as an automatic blocking hook by default. Running it on every stop can be expensive because it runs typecheck, lint, tests, and web build.

Opt-in sample for a local `Stop` hook after human approval:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash \"$(git rev-parse --show-toplevel)/scripts/diff-gate.sh\"",
            "timeout": 900,
            "statusMessage": "Running AI Brain diff gate"
          }
        ]
      }
    ]
  }
}
```

Before enabling this hook, confirm that the runtime can tolerate repeated builds and that failures will be visible to the developer.

## Goal Mode

Use Codex `/goal` for larger AI Brain loops after writing a measurable goal contract.

Recommended flow:

1. Draft the goal from `.ai/brain/loop-harness/goal-contract-template.md`.
2. Use `/goal <objective>` in Codex.
3. Keep the detailed contract in a file and point Codex at it.
4. Run maker/checker review before marking the goal complete.

If `/goal` is not available in the slash command list, enable goals in Codex:

```toml
[features]
goals = true
```

Or run:

```bash
codex features enable goals
```

Do not use goal mode to bypass scope boundaries. The goal still needs validation evidence, memory updates when meaningful, and checker review for major work.

## Automation Templates

Disabled templates live under:

```text
.codex/automations/templates/
```

They cover recurring health, dependency, documentation, duplication, architecture, and test-suggestion scans. They are not active jobs.

Before enabling any automation:

- test the prompt manually,
- prefer a Codex-managed worktree,
- keep network off unless explicitly approved,
- require human sign-off,
- create draft PRs only when requested,
- never auto-merge,
- never call production APIs,
- never send external messages,
- never delete files without explicit approval.
