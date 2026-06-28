# AI Brain Retrieval Contracts

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-retrieval-contracts` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines structured retrieval output contracts for AI Brain index, search, impact, and context workflows. |
| domain | AI Brain retrieval |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

## Purpose

AI Brain retrieval must remain readable for humans and predictable for agents. Sprint 1 defines contracts before adding heavier search infrastructure.

Do not add vector databases, embeddings, MCP servers, remote services, or network-based retrieval as part of this contract.

## Shared Retrieval Record

Future structured outputs should use this shape where practical:

```json
{
  "schema_version": "1.0",
  "record_type": "search_result",
  "path": ".ai/brain/knowledge/testing-map.md",
  "class": "canonical",
  "authority": "validation guidance",
  "status": "active",
  "domain": ["validation", "ai-brain"],
  "source": "local",
  "generated": false,
  "freshness": {
    "generated_at": null,
    "last_reviewed": "2026-06-26",
    "review_after": "2026-07-26",
    "stale": false
  },
  "title": "Testing Map",
  "summary": "Scope-based validation guidance.",
  "snippets": [],
  "next_actions": []
}
```

## Command Contracts

### `npm run brain:index`

Current behavior: human-readable generated index files and `repo-map.json`.

Sprint 1 contract:

- Keep current outputs.
- Treat index outputs as `generated`.
- Prefer future schema fields for file class, generated timestamp, source roots, and schema version.
- Regenerate before broad discovery when AI Brain, docs, app, scripts, or package commands change.

### `npm run brain:search -- "query"`

Current behavior: deterministic local keyword search.

Sprint 1 contract:

- Output should remain human-readable.
- Direct text scope includes AI Brain startup, adapter, certification, governance, knowledge, memory, generated index, context pack, loop harness, planning, review, template, docs, project-context, knowledge-base, `AGENTS.md`, and `README.md` content.
- Future JSON mode should include query, results, path, title/headings, snippet, class, authority, status, and suggested next files.
- Search results are discovery aids, not source-of-truth decisions.
- Canonical files should rank ahead of generated/advisory files when equivalent relevance is available.

### `npm run brain:impact -- "change description"`

Current behavior: heuristic Markdown report under `.ai/brain/context-packs/`.

Sprint 1 contract:

- Impact reports remain generated and advisory.
- Future structured output should include planned change, matched areas, likely files, validation suggestions, risks, confidence, generated_at, source index, and stop conditions.
- Impact analysis must not replace direct repo inspection.

### `npm run brain:context -- "Task" --phase=DISCOVER`

Current behavior: generated context pack under `.ai/brain/context-packs/`.

Sprint 1 contract:

- Context packs remain task-start maps.
- Future context packs should include class, generated_at, generated_by, task, phase, valid_until, authority, and source files when feasible.
- Agents must read linked source docs before planning or editing.

## Retrieval Profiles

Use these profiles to limit context load.

| Profile | Read first | Then read | Avoid as primary source |
| --- | --- | --- | --- |
| Startup | `AGENTS.md`, `.ai/brain/README.md`, `agent-session-start.md`, governance docs | Relevant knowledge files | Old context packs |
| Product | Product docs and project context | AI Brain product summary | Review reports unless registry accepted |
| Architecture | ADRs and architecture docs | AI Brain architecture principles | Generated impact reports |
| Implementation | Module catalog, affected source/tests, testing map | Context pack if current | Historical sprint reports |
| Review | Goal/plan/diff/validation, registry, relevant canonical docs | Advisory review files | Generated summaries without source links |
| Security | Security preflight, AGENTS security rules, security/privacy docs | Security review findings in registry | Command output containing sensitive values |
| Release | Release docs/checklists when available | Readiness reports | Native assumptions without build evidence |

## Quality Rules

- Retrieval output must identify whether a result is canonical, generated, advisory, memory, archive, template, or adapter.
- Retrieval output should link to source paths instead of copying large source content.
- Retrieval should not include secrets, `.env.local`, credentials, private user data, or raw sensitive logs.
- Retrieval contracts are local-first and must work without network access.

## Deferred Work

Deferred to later hardening:

- JSON output implementation for `brain:search`.
- JSON output implementation for `brain:impact`.
- Authority-aware ranking.
- MCP resources.
- Embeddings, vector databases, or remote search.
