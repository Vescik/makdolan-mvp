# Dependency Audit

Status: Disabled template.

## Purpose

Check dependency risk and drift without installing, upgrading, or removing packages.

## Suggested Cadence

Weekly, or before release-readiness review.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only`.
- Network: off by default. Network may be enabled only for an explicitly approved package advisory lookup.

## Prompt Template

```text
Run a Makdolan dependency audit.

Scope:
- Inspect package.json and package-lock.json metadata.
- Identify package scripts related to validation.
- Run local npm audit only if it does not install or modify dependencies.
- Do not run npm install, npm update, npm audit fix, npm dedupe, or package manager write commands.

Safety:
- No production API calls.
- No external messages.
- No deleting files.
- No dependency changes.
- Draft PR only if a human explicitly asks.
- Human sign-off required before any dependency remediation.

Report:
- dependency risk summary,
- outdated or risky packages based on local metadata and approved commands,
- validation commands run,
- recommended remediation goal contracts.

Stop if the audit requires network access that was not approved, dependency installation, lockfile writes, secrets, or production credentials.
```

## Validation

- `git status --short`
- `git diff --check`
- `npm run typecheck`
- `npm run test`
- Optional, with approval: `npm audit --audit-level=moderate`

## Stop Conditions

- `npm audit` requires network and network was not approved.
- Any package manager command would alter `package.json` or lock files.
- Audit suggests dependency changes without human approval.
- Findings require production credentials or private package registry access.

## Output

Advisory report only. Do not edit dependencies.

## Activation Criteria

- Owner accepts dependency-review responsibility.
- Network posture chosen: offline-only or approved advisory lookup.
- Lockfile mutation is explicitly forbidden.
- Human sign-off recorded.
