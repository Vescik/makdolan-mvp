# Daily Codebase Health Scan

Status: Disabled template.

## Purpose

Run a read-mostly daily scan that summarizes repository health signals without changing app behavior.

## Suggested Cadence

Daily on workdays, only after the template has been tested manually and approved.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only` preferred; `workspace-write` only if writing a report is approved.
- Network: off.

## Prompt Template

```text
Run the Makdolan daily codebase health scan.

Scope:
- Read AGENTS.md, .ai/brain/knowledge/agent-session-start.md, .ai/brain/index/README.md, package.json, docs/, project-context/, and recent AI Brain memory.
- Inspect git status and repo index.
- Run read-only checks when possible.

Do not modify application source code.
Do not call production APIs.
Do not send emails or external messages.
Do not delete files.
Do not create a PR unless explicitly instructed by a human.

Report:
- validation signals,
- stale or risky docs,
- drift from AI Brain policies,
- likely follow-up goals,
- exact commands run,
- skipped checks and reasons.

Stop if required context is missing, the repo is dirty in an unsafe way, network access is needed, secrets are required, or validation cannot run without changing project state.
```

## Validation

- `git status --short`
- `git diff --check`
- `test -f .ai/brain/index/repo-map.json`
- `test -f .ai/brain/index/file-catalog.md`
- Optional, if approved for the run: `bash scripts/diff-gate.sh`

## Stop Conditions

- Local checkout has unrelated uncommitted user work and no worktree is available.
- Scan needs network access.
- Scan needs secrets, `.env.local`, credentials, or production data.
- Any command would modify source or generated build output outside approved report paths.
- Findings imply app changes; create a goal contract instead of changing code.

## Output

Write a concise report only when `workspace-write` is approved:

```text
.ai/brain/context-packs/YYYY-MM-DD-daily-codebase-health-scan.md
```

Otherwise, report findings in the automation run only.

## Activation Criteria

- Human owner assigned.
- First three manual runs reviewed for noise.
- Worktree mode selected.
- Report retention policy agreed.
- Human sign-off recorded.
