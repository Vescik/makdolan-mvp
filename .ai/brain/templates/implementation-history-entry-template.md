# Implementation History Entry Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-implementation-history-entry` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for implementation history entries; does not define current project state. |
| domain | AI Brain memory |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Copy this format into `.ai/brain/memory/implementation-history.md` when a meaningful change is complete.

```markdown
## YYYY-MM-DD: Change Title

- Memory ID: `memory-implementation-YYYY-MM-DD-change-title`.
- Status: `active`.
- Created: YYYY-MM-DD.
- Last reviewed: YYYY-MM-DD.
- Review after: YYYY-MM-DD.
- Changed: concise summary of completed work.
- Why it matters: future-facing reason this change should be remembered.
- Source evidence: `path/to/report.md`, `path/to/source.md`, or command evidence.
- Files or areas: `path/one`, `path/two`.
- Validation: `command`: PASS, FAIL with reason, or SKIPPED with reason.
- Review: reviewer, `codex review --uncommitted`, human review, or reason review was not required.
- Supersedes: none.
- Superseded by: none.
- Scope notes: no app source behavior changed, no dependencies added, no automation enabled, or other relevant boundary.
- Follow-ups: open decisions or next actions, if any.
```

## Rules

- Record outcomes, not raw working notes.
- Prefer links and paths over copied source code.
- Include source evidence and lifecycle fields for entries after the CERT-05 memory enforcement boundary.
- Include validation evidence before marking work complete.
- Move unresolved assumptions to `.ai/brain/memory/open-decisions.md`.
