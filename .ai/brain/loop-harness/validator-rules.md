# Validator Rules

Validation evidence is required before a task is considered done.

## What Counts

- Exact command run.
- Pass/fail result.
- Important output or error summary.
- Explanation for skipped checks.
- Follow-up action for failures or unavailable tools.

## One-Command Gate

Use the diff gate before marking meaningful work done:

```bash
bash scripts/diff-gate.sh
```

The gate first runs `git diff --check`, `git diff --cached --check`, and an untracked-file whitespace check. It then discovers available validation scripts and runs them without fix flags. For the current npm project it runs available typecheck, lint, tests, and web build commands. It exits non-zero if any command fails, if project tooling is unavailable, or if no app validation command runs for a detected app project.

Use it as:

- Manual command before final response.
- Codex hook candidate for a future `Stop` or pre-review hook.
- Pre-review validation before asking for human review or opening a PR.

The diff gate does not modify source files. If a future lint fix mode is added, it must be explicit, documented, and never run by default.

## App Code Changes

Default validation set:

```bash
bash scripts/diff-gate.sh
```

The expanded command set is:

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Narrower validation is acceptable only when the change is clearly limited and the skipped checks are explained.

## Docs-Only Changes

Use available text validation:

```bash
git diff --check
find .ai/brain -type f -name '*.md' -print
```

For docs-only changes, `bash scripts/diff-gate.sh` is still preferred before final review when practical. If skipped because the change is intentionally docs-only and fast feedback is needed, state that app validation was skipped and run `git diff --check`.

Also inspect that required docs exist and are useful. If no markdown lint or link checker exists, report that gap rather than pretending it ran.

## Failed Checks

Fix and rerun when feasible. If not feasible, report:

- Command.
- Failure.
- Likely cause.
- Next action.

If `scripts/diff-gate.sh` fails, do not mark the task done. Fix the failing check or report the exact failing command and blocker.
