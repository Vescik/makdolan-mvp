# SDLC Flow

Makdolan uses this loop for every non-trivial task:

```text
DISCOVER -> PLAN -> EXECUTE -> VERIFY -> ITERATE
```

## Discover

Read the relevant product brief, architecture notes, issue or prompt, acceptance criteria, and existing code. Identify stack, affected files, tests, build targets, platform risks, and unknowns before proposing changes.

## Plan

Create a concise plan before editing. Include affected files, implementation steps, validation commands, platform impact, security/privacy notes, rollback path, and definition of done.

For Codex `/goal` work or multi-step manual loops, create a goal contract from `.ai/brain/loop-harness/goal-contract-template.md`. Use one of the specialized templates under `.ai/brain/templates/` when the work is a feature, refactor, bug fix, docs update, or test hardening task.

A valid goal contract must include:

- Objective.
- Done when criteria.
- Validation commands.
- Allowed scope.
- Forbidden scope.
- Stop conditions.
- Review requirement.
- Memory update requirement.

## Execute

Make focused changes only. Preserve existing naming and style. Do not change dependencies, CI, release settings, or architecture unless the plan explicitly requires it.

## Verify

Run the most relevant available checks. For app code, expect typecheck, tests, lint, and web build unless there is a clear reason to narrow the set. For docs-only changes, run file presence/content checks and whitespace validation, and explain skipped app checks.

Record validation evidence as command, result, key output or skipped reason, and follow-up. A task is not done until the evidence matches the goal contract.

## Iterate

Fix validation failures when feasible. Update tests and docs when behavior changes. Update AI Brain memory after meaningful changes, and update `knowledge-base/` only for durable product or architecture facts.

Before final response, review the goal contract:

- Done criteria satisfied.
- Allowed/forbidden scope respected.
- Stop conditions did not trigger or were resolved with user approval.
- Validation evidence recorded.
- Memory update completed or explicitly not needed.
