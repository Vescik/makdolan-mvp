# How To Write Good Goals

A good Codex `/goal` is specific enough that another session can finish it without guessing product intent, safe enough to keep scope contained, and measurable enough to verify.

## Goal Quality Checklist

Before starting, make sure the goal answers:

- What exact outcome should exist?
- Who or what benefits from the outcome?
- Which files or directories may change?
- Which files, directories, commands, or behaviors are forbidden?
- How will success be measured?
- Which commands will prove the work?
- What should make the agent stop and ask?
- Who or what reviews the result before done?
- Which memory files must be updated?

## Objective Rules

Write objectives as concrete outcomes.

Good pattern:

```text
Implement [specific capability] in [specific module/screen] so [specific user/developer] can [specific action/result].
```

Refactor pattern:

```text
Refactor [specific module] to [specific structure] while preserving [specific behavior/API].
```

Bug fix pattern:

```text
Fix [specific defect] so [specific input/action] produces [expected result].
```

## Done Criteria Rules

Done criteria must be observable. Prefer:

- File paths.
- Test names.
- Commands.
- User-visible states.
- Exact accepted/blocked inputs.
- Specific docs sections or headings.

Do not rely on subjective quality claims without a measurable check.

## Scope Rules

Allowed scope should name files, directories, and behavior changes. Forbidden scope should be equally explicit.

Always forbid secrets, credentials, production deployments, store releases, payments, database migrations, dependency changes, and generated build artifacts unless the goal explicitly approves one of them.

## Validation Rules

Every goal needs validation evidence. Use a table:

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `command` | Pass/Fail/Skipped | Key output or reason | Follow-up |

For app behavior, start with:

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

For docs-only work, use:

```bash
git diff --check
```

Add targeted checks when the goal names a specific file, test suite, heading, or route.

## Review Rules

Every goal needs review before done. For small tasks, the implementing agent can perform a self-review and report it. For high-risk tasks, use maker-checker review.

Review must check:

- Allowed and forbidden scope.
- Done criteria.
- Validation evidence.
- iOS, Android, and Web impact.
- Security and privacy impact.
- Memory updates.
