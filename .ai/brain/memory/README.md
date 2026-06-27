# Memory

AI Brain memory records meaningful implementation history, open decisions, and sprint or phase summaries.

Memory is for durable project recall. It should capture decisions, outcomes, validation evidence, and unresolved assumptions that future Codex sessions should know. It should not duplicate full source code, raw chat, or temporary thinking.

## What Belongs Here

- Completed phase summaries.
- Important implementation history.
- Deferred decisions and approvals needed.
- Validation outcomes that future sessions should know.
- Accepted risks, scope boundaries, and review outcomes that affect future work.

## What Does Not Belong Here

- Secrets, credentials, tokens, auth headers, `.env.local` values, private user data, or raw chat transcripts.
- Full copies of source documents.
- Temporary notes that have no future value.
- Exhaustive diffs, copied source files, or generated output dumps.

## Files

| File | Purpose |
|---|---|
| `open-decisions.md` | Decisions requiring approval or future resolution. |
| `implementation-history.md` | Chronological summary of meaningful changes. |
| `sprint-summaries/` | One summary per sprint or phase. |
| `memory-update-checklist.md` | Routing checklist for deciding what memory to update. |

## Required Formats

Use the templates in `.ai/brain/templates/` when updating memory:

- `implementation-history-entry-template.md`
- `open-decision-template.md`
- `sprint-summary-template.md`
- `memory-update-template.md`

Implementation history entries should include what changed, why it matters, files or areas touched, validation evidence, review evidence when relevant, scope notes, and follow-ups.

Open decisions should stay decision-oriented: title, status, concise note, current assumption if needed, and resolution trigger or owner.

Sprint summaries should describe goals, completed work, validation, decisions, risks, review evidence, memory updates, and notes for the next session.

## Helper Command

The optional helper can append common entries or create a sprint summary:

```bash
npm run brain:memory:update -- --type=implementation --title="Short title" --summary="What changed." --validation="git diff --check: PASS"
npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What remains unresolved."
npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="What was completed."
```

Review generated memory before considering the task complete. The helper is intentionally small and does not decide what belongs in memory.
