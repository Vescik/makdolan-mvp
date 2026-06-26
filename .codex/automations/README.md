# Codex Automation Templates

This folder stores disabled automation templates for Makdolan AI Brain workflows.

Nothing in this folder is an active scheduled job. These files are prompt and policy templates that a human can review, test manually, and copy into Codex automation setup only after explicit approval.

## Safety Baseline

All automation templates must follow these rules:

- No production API calls.
- No sending emails, Slack messages, push notifications, or external messages.
- No deleting files without explicit approval.
- No dependency installation unless the automation is specifically approved for that task.
- No credential creation, rotation, reading, or persistence.
- No production deployments, app store actions, database migrations, or payment operations.
- Draft PR only when explicitly requested; never auto-merge.
- Human sign-off is required before activation and before acting on findings.
- Prefer `read-only` for scans. Use `workspace-write` only when generating a local report in an approved worktree.
- Prefer Codex-managed worktrees for recurring scans so local unfinished work is not modified.

## Template Index

| Template | Purpose | Default state |
|---|---|---|
| `daily-codebase-health-scan.md` | Broad daily health triage across validation, docs, and risk signals. | Disabled |
| `dependency-audit.md` | Check dependency drift and audit output without changing packages. | Disabled |
| `stale-docs-scan.md` | Find docs likely out of sync with repo structure or scripts. | Disabled |
| `duplicate-abstraction-scan.md` | Identify repeated patterns that may deserve consolidation. | Disabled |
| `architecture-drift-scan.md` | Compare implementation shape against architecture principles. | Disabled |
| `test-coverage-suggestion-scan.md` | Suggest targeted tests for risk areas without editing tests. | Disabled |

## Activation Checklist

Before enabling any automation:

1. Run the template manually in a normal Codex thread.
2. Confirm the output is concise, useful, and does not create noisy findings.
3. Confirm sandbox mode, network access, and worktree choice.
4. Confirm no secrets or ignored local files are required.
5. Confirm validation commands and stop conditions are correct.
6. Confirm owner, cadence, and review workflow.
7. Get explicit human sign-off.

## Worktree Recommendation

Use a Codex-managed worktree for recurring automation runs in this Git repository. Worktrees isolate reports and exploratory changes from the local checkout.

Use local checkout only for one-off manual runs where the developer wants the report created directly in the current working tree.

## Output Location

If an automation writes a report, use:

```text
.ai/brain/context-packs/
```

Use timestamped filenames. Do not rewrite source-of-truth docs automatically.

## Review And Follow-Up

Findings from these templates are advisory. A human should decide whether to:

- ignore the finding,
- create a goal contract,
- schedule implementation,
- open a draft PR,
- update AI Brain memory,
- or archive the automation run.

Never auto-merge or auto-apply fixes from these templates.
