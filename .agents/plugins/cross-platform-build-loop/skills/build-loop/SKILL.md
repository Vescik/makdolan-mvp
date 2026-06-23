---
name: build-loop
description: Run a full Discover -> Plan -> Execute -> Verify -> Iterate/Learn lifecycle for cross-platform iOS, Android, and Web work.
---

Use this skill for any feature, bug fix, refactor, or release task that affects the app.

## Required lifecycle

1. Discover first. Identify stack, affected files, existing commands, risks, and unknowns.
2. Plan before edits. Include affected files, implementation steps, verification matrix, rollback, and definition of done.
3. Execute only the accepted/safe plan. Keep changes focused.
4. Verify using repo commands. Prefer `scripts/verify-local.sh` when command discovery is unclear.
5. Iterate/Learn. Fix verification failures, update tests/docs/knowledge, and summarize.

## Subagent usage

For large tasks, explicitly spawn:

- `discovery_architect` for repo and requirement mapping.
- `planner` for implementation plan.
- `executor` for focused edits.
- `verifier` for checks.
- `release_engineer` for CI/CD or store-readiness tasks.

Do not spawn agents for tiny one-file edits unless the user asks.

## Final response format

End with:

- What changed.
- Commands run and results.
- Platform coverage: iOS / Android / Web.
- Risks or skipped checks.
- Suggested next commit message.
