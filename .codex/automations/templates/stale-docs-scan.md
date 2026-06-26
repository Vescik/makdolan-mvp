# Stale Docs Scan

Status: Disabled template.

## Purpose

Find documentation that may be out of date with the current repository structure, scripts, AI Brain policies, or product boundaries.

## Suggested Cadence

Weekly, or after substantial architecture/tooling changes.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only` preferred; `workspace-write` only if writing a report is approved.
- Network: off.

## Prompt Template

```text
Run a Makdolan stale docs scan.

Scope:
- Compare AGENTS.md, .ai/brain/, docs/, project-context/, knowledge-base/, package.json scripts, and generated repo index.
- Identify docs that mention missing files, obsolete commands, stale scope boundaries, or outdated validation guidance.
- Do not rewrite docs automatically.

Safety:
- No production API calls.
- No emails or external messages.
- No deleting files.
- No source code behavior changes.
- Draft PR only if a human explicitly asks.

Report:
- stale doc candidates with file paths,
- evidence for each candidate,
- suggested owner or next action,
- validation commands run,
- stop conditions encountered.

Stop if source-of-truth docs conflict and the conflict cannot be resolved from repo evidence.
```

## Validation

- `git status --short`
- `git diff --check`
- `test -f .ai/brain/index/repo-map.json`
- `test -f .ai/brain/index/file-catalog.md`
- `npm run brain:search -- "validation commands"`
- `npm run brain:search -- "MVP boundaries"`

## Stop Conditions

- Product or architecture sources conflict.
- Updating docs would require a product decision.
- Findings depend on private context not in the repository.
- The scan would need to read secrets or ignored local files.

## Output

If approved to write:

```text
.ai/brain/context-packs/YYYY-MM-DD-stale-docs-scan.md
```

Do not edit source-of-truth docs automatically.

## Activation Criteria

- Human owner assigned.
- First manual run confirms findings are actionable.
- Decision made on whether reports are written or only surfaced in Triage.
- Human sign-off recorded.
