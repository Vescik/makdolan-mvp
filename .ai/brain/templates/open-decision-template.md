# Open Decision Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-open-decision` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for open decision entries; does not define current project state. |
| domain | AI Brain memory |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this format for `.ai/brain/memory/open-decisions.md` when a decision needs approval, product input, or later technical resolution.

## Table Row Format

```markdown
| Decision title | Open | Concise note with owner or trigger for resolution. Memory ID: `memory-decision-YYYY-MM-DD-decision-title`. Created: YYYY-MM-DD. Last reviewed: YYYY-MM-DD. Review after: YYYY-MM-DD. Source evidence: `path/to/source.md`. Supersedes: none. Superseded by: none. |
```

## Detail Format

Use a short detail section when the table row needs context:

```markdown
### Decision Title

- Status: Open
- Needed by: sprint, milestone, or trigger.
- Options:
  - Option A: tradeoff.
  - Option B: tradeoff.
- Current assumption: what Codex may assume until resolved.
- Resolution owner: human owner, team, or "Product/engineering".
```

## Rules

- Do not silently decide scope, release, dependency, automation, credential, data, or production behavior questions.
- Keep the note compact and decision-oriented.
- Use only these lifecycle statuses: `Open`, `Needs owner`, `Deferred`, `Resolved`, or `Superseded`.
- Include source evidence and review timing for new decision rows when practical.
- Resolve or remove stale open decisions during phase closeout.
