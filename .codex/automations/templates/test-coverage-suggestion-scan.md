# Test Coverage Suggestion Scan

Status: Disabled template.

## Purpose

Suggest targeted test coverage improvements for high-risk modules without changing tests automatically.

## Suggested Cadence

Weekly, before release-readiness review, or after broad feature work.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only`.
- Network: off.

## Prompt Template

```text
Run a Makdolan test coverage suggestion scan.

Scope:
- Read .ai/brain/knowledge/testing-map.md, package.json, vitest config, existing tests, src/, app/, and recent implementation history.
- Identify behavior with weak or missing tests.
- Prioritize domain logic, scoring, validation, error states, and cross-platform risk.
- Do not add or edit tests automatically.

Safety:
- No production API calls.
- No emails or external messages.
- No deleting files.
- No source or test changes.
- Draft PR only if a human explicitly asks.

Report:
- suggested test additions,
- impacted files,
- rationale and risk,
- likely commands to validate,
- proposed goal contracts for test hardening.

Stop if suggestions require undocumented product behavior or unavailable external services.
```

## Validation

- `git status --short`
- `git diff --check`
- `npm run test`
- `npm run typecheck`
- Optional: `npm run brain:search -- "testing"`

## Stop Conditions

- Expected behavior is undocumented and cannot be inferred safely.
- Suggested tests require credentials, network, or production data.
- Test hardening would require changing app behavior.
- Existing tests are failing before any suggested work.

## Output

Advisory report only.

## Activation Criteria

- Test owner assigned.
- First manual run reviewed for useful prioritization.
- Team agrees no automatic test edits.
- Human sign-off recorded.
