# AI Brain Memory Integrity Model

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-memory-integrity-model` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines AI Brain memory statuses, provenance, lifecycle, and integrity rules. |
| domain | AI Brain memory |
| created | 2026-06-26 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

## Purpose

AI Brain memory helps future sessions avoid rediscovery. It must not become an unreviewed instruction sink.

This model defines how memory entries should carry status, provenance, and validation evidence.

## Memory Classes

| Class | Location | Purpose |
| --- | --- | --- |
| Implementation history | `.ai/brain/memory/implementation-history.md` | Completed meaningful changes and validation evidence. |
| Open decisions | `.ai/brain/memory/open-decisions.md` | Unresolved choices requiring approval or later resolution. |
| Sprint summaries | `.ai/brain/memory/sprint-summaries/` | Milestone closeout and next-session orientation. |
| Durable knowledge | `docs/`, `project-context/`, `knowledge-base/` | Canonical product/architecture facts, not task memory. |

## Status Values

New memory entries should use one of these statuses when practical:

| Status | Meaning |
| --- | --- |
| `active` | Current and relevant. |
| `resolved` | Completed or no longer open. |
| `superseded` | Replaced by a later entry or canonical document. |
| `archived` | Historical only. |
| `needs-review` | Useful but requires owner review before relying on it. |

## Provenance Fields

Memory should capture:

- Memory ID.
- Date and short title.
- Status.
- Created date.
- Last reviewed date.
- Review-after date.
- Source evidence: files, planning artifacts, review findings, or commands.
- Validation evidence when applicable.
- Review evidence when required.
- Supersedes and superseded-by values when replacing older memory.

Do not capture:

- Raw chat transcripts.
- Full source code.
- Secret values.
- `.env.local` values.
- Credentials, tokens, authorization headers, private user data, payment data, or production identifiers.

## Recommended Entry Shape

```markdown
## YYYY-MM-DD: Short title

- Memory ID: `memory-implementation-YYYY-MM-DD-short-title`.
- Status: `active`.
- Created: YYYY-MM-DD.
- Last reviewed: YYYY-MM-DD.
- Review after: YYYY-MM-DD.
- Changed: one-sentence summary.
- Source evidence: `path/to/file.md`, `path/to/report.md`.
- Files or areas: `path/one`, `path/two`.
- Validation: command/result.
- Review: checker/human/none with reason.
- Supersedes: none.
- Superseded by: none.
- Memory note: why future sessions should care.
```

## Open Decision Shape

Open decisions should include:

- Stable title.
- Status: `Open`, `Needs owner`, `Deferred`, `Resolved`, or `Superseded`.
- Decision needed.
- Owner or area.
- Source evidence.
- Date opened.
- Review date.
- Supersedes and superseded-by values when relevant.

Open-decision lifecycle status values are case-sensitive. Use only `Open`, `Needs owner`, `Deferred`, `Resolved`, or `Superseded`.

## CERT-05 Enforcement Boundary

Historical memory entries before `2026-06-27: CERT-05 memory enforcement hardening` are grandfathered. They should not be rewritten aggressively because they are advisory history and canonical docs remain the source of truth.

Starting with the CERT-05 boundary entry:

- New implementation history entries must include the recommended entry shape above.
- `npm run brain:memory:update` generates memory ID, status, created, last reviewed, review after, source evidence, validation, review, supersedes, and superseded-by fields for implementation entries.
- `npm run brain:health` validates implementation history entries from the CERT-05 boundary forward.
- `npm run brain:health` validates open-decision lifecycle status values in `.ai/brain/memory/open-decisions.md`.
- Historical entries should be backfilled only when they are materially edited, superseded, or promoted into canonical documentation.

## Integrity Rules

1. Memory does not override canonical docs.
2. If memory conflicts with canonical docs, canonical docs win and memory should be corrected or superseded.
3. Do not delete inaccurate memory silently; mark it superseded or add a correction.
4. Use memory for outcomes and durable context, not random working notes.
5. Run `npm run brain:health` after broad AI Brain memory/governance changes.
6. Run `npm run brain:index` after meaningful AI Brain docs, scripts, memory, or planning changes.
7. Treat memory as advisory operating history. It must point to source evidence and must not override source-of-truth docs.

## Sprint 1 Scope

Sprint 1 defines the memory integrity model and updates routing guidance. It does not require rewriting all historical memory entries.

Future work:

- Add archive/compaction workflow.
- Add generated memory rollups if needed.
