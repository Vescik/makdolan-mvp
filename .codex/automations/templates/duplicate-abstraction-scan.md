# Duplicate Abstraction Scan

Status: Disabled template.

## Purpose

Identify repeated domain, UI, validation, or tooling patterns that may deserve consolidation, without refactoring automatically.

## Suggested Cadence

Biweekly or before a refactor planning session.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only`.
- Network: off.

## Prompt Template

```text
Run a Makdolan duplicate abstraction scan.

Scope:
- Inspect src/, app/, scripts/, .ai/brain/scripts/, tests, and docs that describe module boundaries.
- Look for repeated logic, repeated test setup, duplicated validation rules, or near-identical workflow docs.
- Prefer evidence over broad refactor opinions.
- Do not refactor or edit files.

Safety:
- No production API calls.
- No external messages.
- No deleting files.
- No source changes.
- Draft PR only if a human explicitly asks.

Report:
- duplicate candidates,
- exact files and short rationale,
- why consolidation may or may not be worth it,
- suggested goal contract for any proposed refactor,
- validation commands run.

Stop if assessing duplication would require broad source dumps, private data, or speculative product interpretation.
```

## Validation

- `git status --short`
- `git diff --check`
- `test -f .ai/brain/index/repo-map.json`
- `test -f .ai/brain/index/module-map.md`
- Optional source search commands such as `rg "function|const|export" src app`

## Stop Conditions

- Proposed consolidation would change product behavior.
- Candidate duplication is not supported by file-path evidence.
- Refactor would require new dependencies or architecture changes.
- Local source state is too dirty to distinguish user work from stable code.

## Output

Advisory report only.

## Activation Criteria

- Refactor owner assigned.
- Team agrees automation findings are planning inputs only.
- No automatic edits.
- Human sign-off recorded.
