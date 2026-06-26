# Implementation History Entry Template

Copy this format into `.ai/brain/memory/implementation-history.md` when a meaningful change is complete.

```markdown
## YYYY-MM-DD: Change Title

- Changed: concise summary of completed work.
- Why it matters: future-facing reason this change should be remembered.
- Files or areas: `path/one`, `path/two`.
- Validation: `command`: PASS, FAIL with reason, or SKIPPED with reason.
- Review: reviewer, `codex review --uncommitted`, human review, or reason review was not required.
- Scope notes: no app source behavior changed, no dependencies added, no automation enabled, or other relevant boundary.
- Follow-ups: open decisions or next actions, if any.
```

## Rules

- Record outcomes, not raw working notes.
- Prefer links and paths over copied source code.
- Include validation evidence before marking work complete.
- Move unresolved assumptions to `.ai/brain/memory/open-decisions.md`.
