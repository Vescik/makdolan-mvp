# Open Decision Template

Use this format for `.ai/brain/memory/open-decisions.md` when a decision needs approval, product input, or later technical resolution.

## Table Row Format

```markdown
| Decision title | Open | Concise note with owner or trigger for resolution. |
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
- Resolve or remove stale open decisions during phase closeout.
