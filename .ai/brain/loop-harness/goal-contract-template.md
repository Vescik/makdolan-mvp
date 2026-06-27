# Goal Contract Template

Use this contract before starting a Codex `/goal`, a manual multi-step agent loop, or any implementation with unclear scope. The contract turns a request into measurable work with explicit validation and stop rules.

Copy this file into a planning artifact or paste the filled sections into the goal prompt.

## Goal Title

`[AREA] short imperative title`

Example: `Recommendations: add budget edge-case tests`

## Objective

State one concrete outcome in one or two sentences.

Good objectives name the artifact or behavior that will exist after the work. They avoid subjective wording and include the user-visible or developer-visible result.

## Done When

List measurable success criteria. Each item must be observable through code, docs, tests, command output, or review.

- Criterion 1:
- Criterion 2:
- Criterion 3:

Use numbers, file paths, commands, or expected states where possible. Avoid broad quality claims without evidence.

## Allowed Scope

Files, directories, commands, and behaviors the agent may touch:

- Allowed files:
- Allowed directories:
- Allowed commands:
- Allowed behavior changes:

## Forbidden Scope

Files, directories, commands, and behaviors the agent must not touch:

- Forbidden files:
- Forbidden directories:
- Forbidden commands:
- Forbidden behavior changes:

Default forbidden scope unless explicitly approved:

- `.env.local` and credential stores.
- Secrets, tokens, API keys, authorization headers, and private user data.
- Production deployment, store release, payment, authentication, or database migration behavior.
- Dependency installation or package changes.
- Generated build output such as `dist/`, unless the goal explicitly requires build artifact updates.

## Discovery Evidence Required

Before editing, collect and summarize:

- Product/source docs read:
- Architecture/data docs read:
- Existing code paths inspected:
- Existing tests inspected:
- Platform impact: iOS / Android / Web:
- Security/privacy impact:
- Unknowns and assumptions:

## Plan

1. Step with affected files.
2. Step with affected files.
3. Step with affected files.

The plan must be small enough to validate in the current session. Split the goal if the plan crosses unrelated modules or needs separate approval.

## Validation Commands

Required commands for this goal:

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Docs-only alternative, when no app behavior changes:

```bash
git diff --check
find .ai/brain -type f -name '*.md' -print
```

Add targeted commands here:

```bash
# command
```

## Validation Evidence Format

Record validation in this format:

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `command` | Pass/Fail/Skipped | Key output or reason | Fixes or follow-up |

Rules:

- A skipped check needs a reason tied to scope or environment.
- A failed check needs the important error and next action.
- A passing result needs enough output summary to show the command actually ran.

## Stop Conditions

Stop and ask for direction before:

- Expanding product scope or changing MVP boundaries.
- Editing forbidden files or directories.
- Adding, removing, or upgrading dependencies.
- Changing CI, release, signing, deployment, credential, payment, authentication, or database behavior.
- Reading or persisting secrets.
- Running destructive commands.
- Continuing after repeated validation failure caused by unclear requirements or environment constraints.
- Making assumptions that could affect iOS, Android, Web, security, privacy, or release readiness.

## Review Required Before Done

Review is required before the goal is complete.

Review checklist:

- Scope matches allowed/forbidden files.
- Done criteria are satisfied with evidence.
- Validation evidence is recorded.
- Platform impact is addressed for iOS, Android, and Web.
- Security/privacy notes are addressed.
- Memory updates are complete or explicitly not needed.

For high-risk changes, use maker-checker review from `maker-checker-flow.md`.

## Memory Update Required

Memory update is required when the goal changes implementation, workflow, architecture, validation policy, product behavior, or accepted risk.

Update as applicable:

- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/memory/open-decisions.md`
- `.ai/brain/memory/sprint-summaries/`
- `knowledge-base/` for durable product or architecture facts
- `AGENTS.md` only for stable recurring repository rules

If no memory update is needed, state why in the final response.

## Final Response Requirements

End with:

- Changed files.
- Validation commands and results.
- Skipped checks and reasons.
- Risks or follow-ups.
- Memory updates performed.
