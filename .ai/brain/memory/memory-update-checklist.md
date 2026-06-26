# Memory Update Checklist

Use this checklist after meaningful implementation, workflow, validation, architecture, or product-scope changes. Memory should help the next Codex session understand what changed recently without copying full source code or chat transcripts.

## When Memory Is Required

Update memory when a task:

- Changes app behavior, shared domain logic, navigation, validation, release workflow, automation, Codex setup, or AI Brain operating rules.
- Completes an AI Brain phase, sprint, or planned milestone.
- Accepts a risk, defers a decision, or creates a follow-up that future sessions must not rediscover.
- Changes how work should be validated, reviewed, or scoped.

Memory is usually not required for:

- Tiny typo fixes that do not affect source-of-truth docs.
- Mechanical formatting changes with no future decision value.
- Generated artifacts that are already reproducible and do not change workflow.

## Required Routing

| Memory type | Destination | Use when |
|---|---|---|
| Implementation history | `.ai/brain/memory/implementation-history.md` | A meaningful change is completed and validated. |
| Open decision | `.ai/brain/memory/open-decisions.md` | A choice needs human approval, product input, or later architecture resolution. |
| Sprint or phase summary | `.ai/brain/memory/sprint-summaries/` | A sprint, milestone, or AI Brain phase needs a compact closeout. |
| Durable product or architecture fact | `knowledge-base/` or `docs/` | The fact is source-of-truth product or architecture knowledge, not just task memory. |

## Good Memory Entries

Good entries:

- State what changed and why it matters.
- Link to files or commands instead of copying large content.
- Record validation evidence in command/result form.
- Capture unresolved assumptions as open decisions.
- Mention scope boundaries, such as "No app source behavior changed," when relevant.

Avoid:

- Raw chat logs.
- Full source code dumps.
- Secrets, tokens, `.env.local` values, credentials, auth headers, private user data, payment data, or production identifiers.
- Vague notes such as "improved things" or "fixed stuff."

## Update Steps

1. Identify whether the change needs implementation history, open decision, sprint summary, or source-of-truth docs.
2. Add a concise implementation history entry after validation passes.
3. Add any deferred assumption, unresolved scope question, approval need, or risk acceptance to open decisions.
4. Add a sprint or phase summary when closing a named sprint, milestone, or AI Brain phase.
5. Run `npm run brain:index` if AI Brain docs, templates, memory, scripts, or indexes changed.
6. Include validation evidence in the final response.

## Optional Helper

Use the helper to scaffold or append common memory entries:

```bash
npm run brain:memory:update -- --type=implementation --title="Short change title" --summary="One sentence summary." --validation="git diff --check: PASS"
npm run brain:memory:update -- --type=decision --title="Decision title" --summary="What is unresolved and why."
npm run brain:memory:update -- --type=sprint --title="Sprint or phase name" --summary="Closeout summary."
```

The helper does not replace judgment. Review generated memory before considering the task complete.
