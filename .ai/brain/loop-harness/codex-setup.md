# Codex Setup For AI Brain

This guide connects Makdolan's `.codex/` project configuration to the AI Brain loop harness.

## Current Project Setup

Detected project Codex files:

- `.codex/config.toml`
- `.codex/hooks.json`
- `.codex/hooks/stop_verify_guard.py`
- `.codex/hooks/user_prompt_secret_scan.py`
- `.codex/rules/default.rules`
- `.codex/agents/*.toml`

Codex CLI version observed during setup:

```text
codex-cli 0.142.0
```

## Recommended Baseline

Keep project sessions in `workspace-write` with approval on request and network disabled:

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "user"

[sandbox_workspace_write]
network_access = false
```

This is the best default for AI Brain work because Codex can edit repository files and run local checks while still asking before crossing the sandbox boundary.

## Read-Only Setup

Use read-only for discovery, planning, review, and security analysis:

```bash
codex --sandbox read-only --ask-for-approval on-request
```

Read-only is appropriate before large implementation when the agent should inspect:

- `AGENTS.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/planning/`
- `docs/`
- `project-context/`
- impacted source and test files

## Workspace-Write Setup

Use workspace-write for normal implementation and documentation updates:

```bash
codex --sandbox workspace-write --ask-for-approval on-request
```

Allowed work includes:

- Source edits inside the repo.
- AI Brain memory and context-pack updates.
- Running `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build:web`.
- Running `npm run brain:index`, `npm run brain:search`, and `npm run brain:impact`.
- Running `bash scripts/diff-gate.sh`.

## Full Access Policy

Do not use this for routine AI Brain or Makdolan work:

```bash
codex --sandbox danger-full-access --ask-for-approval never
```

Full access removes the normal filesystem and network boundary. It requires explicit human approval and should be limited to isolated environments.

## Network Access Policy

Project default:

```toml
[sandbox_workspace_write]
network_access = false
```

Use network only when the task explicitly needs it. Preferred examples:

- Official documentation lookup.
- Approved dependency installation.
- Approved MCP/app connector interaction.

Avoid network for:

- Routine implementation.
- Tests that should run offline.
- Untrusted web content.
- Any workflow that could expose source code, secrets, tokens, `.env.local`, credentials, private user data, or sensitive logs.

One-off override:

```bash
codex -c sandbox_workspace_write.network_access=true
```

Do not commit a default network-on project config without explicit approval.

## Hook Policy

Project hooks load only when the repository is trusted and hook definitions are reviewed. Use `/hooks` to inspect, trust, or disable hooks.

Current hooks are safe by default:

- `UserPromptSubmit`: best-effort secret pattern scan.
- `Stop`: non-blocking reminder to include validation evidence.

Do not enable dangerous hooks by default. Dangerous hooks include hooks that:

- Push, deploy, publish, or release.
- Run migrations or destructive data commands.
- Read or write credentials.
- Call external services.
- Modify source files automatically.

## Diff-Gate Hook Sample

Manual validation remains preferred:

```bash
bash scripts/diff-gate.sh
```

Optional `Stop` hook sample after human opt-in:

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

Do not enable this by default. It runs the full validation gate and may be too slow for every stop event.

If enabled:

1. Confirm the task author wants automatic stop validation.
2. Review the hook with `/hooks`.
3. Trust the hook only after reading the exact command.
4. Confirm failures are visible and block completion.
5. Disable it if it slows normal sessions or creates noisy failures.

## Goal Mode Setup

Use goal mode for large AI Brain loops:

```text
/goal Implement the accepted goal contract in .ai/brain/context-packs/<file>.md and do not mark done until validation and checker review pass.
```

Recommended goal-mode flow:

1. Draft the goal from `.ai/brain/loop-harness/goal-contract-template.md`.
2. Include measurable done criteria, allowed files, forbidden files, stop conditions, validation commands, review requirement, and memory update requirement.
3. Start with `/plan` if the goal is not yet precise.
4. Start goal mode with `/goal`.
5. Use `bash scripts/diff-gate.sh` before completion.
6. Use maker/checker review from `.ai/brain/loop-harness/maker-checker-flow.md`.

If `/goal` is missing, enable it:

```toml
[features]
goals = true
```

Or:

```bash
codex features enable goals
```

Goal mode does not override AI Brain scope boundaries. The agent must still stop for forbidden scope, missing prerequisites, failed validation, or reviewer rejection.

## Sample Project Config Snippet

This sample is safe to copy only after confirming it matches the desired local policy:

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "user"
model_reasoning_effort = "high"

[sandbox_workspace_write]
network_access = false

[features]
goals = true
hooks = true
```

Avoid adding `danger-full-access`, `approval_policy = "never"`, or `network_access = true` to project defaults.

## Validation Contract

Before marking a Codex setup or hook change complete:

```bash
git diff --check
python3 -m json.tool .codex/hooks.json >/dev/null
bash -n scripts/diff-gate.sh
npm run brain:index
```

For meaningful workflow changes, also run:

```bash
bash scripts/diff-gate.sh
```

If hooks are changed, run `/hooks` in an interactive Codex session to review/trust the new hook definitions.
