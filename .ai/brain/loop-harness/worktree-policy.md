# Worktree Policy

The repository may contain user changes. Codex must protect them.

## Strategy

Use the local checkout for foreground work that the developer is actively guiding.

Use Codex-managed worktrees for background or recurring automation. Worktrees isolate automation output from unfinished local changes and keep reviewable reports or draft branches separate from day-to-day work.

Do not create a permanent worktree unless a human explicitly wants a long-lived parallel environment.

## Rules

- Check `git status --short` before and after meaningful edits.
- Do not revert changes you did not make unless explicitly requested.
- Keep edits scoped to files required by the task.
- Do not use destructive git commands such as `git reset --hard` or `git checkout --` without explicit approval.
- Do not commit generated build artifacts unless the release process explicitly requires them.
- Do not delete worktrees manually unless the user explicitly approves the cleanup target.
- Do not assume ignored local files are present in a worktree.
- Do not copy `.env.local`, credentials, private data, or local-only secrets into a worktree unless the user explicitly approves a narrow `.worktreeinclude` entry.

## Automation Worktrees

Recurring scans should run in a Codex-managed worktree by default.

Use worktrees for:

- daily codebase health scans,
- dependency audits,
- stale docs scans,
- duplicate abstraction scans,
- architecture drift scans,
- test coverage suggestion scans,
- any automation that might write a report under `.ai/brain/context-packs/`.

Use the local checkout only when:

- the run is manual and one-off,
- the developer wants the report in the current checkout,
- `git status --short` is clean or the local changes are known to be related,
- the automation is read-only and will not write files.

## Branches And Draft PRs

When creating branches, use the `codex/` prefix unless the user asks for another naming convention.

Automation may create a branch only after human approval. If a PR is requested, open a draft PR only. Never auto-merge.

Do not check out the same branch in multiple worktrees. If a worktree branch needs local validation, use Codex Handoff or move the work intentionally instead of forcing checkout.

## Generated Output

`dist/` is produced by Expo web export. Treat it as generated output and avoid changing it during documentation or planning tasks.

Automation reports should use timestamped files under:

```text
.ai/brain/context-packs/
```

Do not silently rewrite source-of-truth docs, product decisions, architecture decisions, or `AGENTS.md`.

## Cleanup

Worktree cleanup requires care because it can discard unmerged work.

Before cleanup:

- confirm the associated thread/run is archived or no longer needed,
- confirm there is no uncommitted work worth preserving,
- confirm no branch is still checked out only in that worktree,
- prefer Codex app cleanup for Codex-managed worktrees.

Stop and ask before deleting a worktree, removing a branch, pruning worktrees, or deleting generated reports.

## Stop Conditions

Stop and ask for direction when:

- local checkout has unrelated uncommitted changes and no worktree is available,
- an automation needs ignored local files or secrets,
- a worktree run would need network access,
- a worktree run would modify source rather than write a report,
- branch ownership is unclear,
- cleanup could delete unreviewed work.
