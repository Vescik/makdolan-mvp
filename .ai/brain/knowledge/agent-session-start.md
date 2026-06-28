# Agent Session Start

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-agent-session-start` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines startup sequence for large or ambiguous AI Brain sessions. |
| domain | AI Brain startup |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

Read this file at the start of large Makdolan tasks after `../agent-start.md`. This file adds Makdolan-specific operating context to the agent-neutral startup path.

## First Principles

Makdolan is a cross-platform Expo React Native app for iOS, Android, and Web. The MVP is a budget-first food decision helper for Rzeszow using controlled data and deterministic recommendation scoring.

AI Brain Pro is an SDLC support layer. It helps with planning, memory, validation, and workflow control. It is not a user-facing feature.

## Start Checklist

1. Read `../agent-start.md`.
2. Read the relevant adapter:
   - Codex: `../adapters/codex.md` and `AGENTS.md`.
   - Generic Markdown-reading agents: `../adapters/generic-agent.md`.
3. Read this file.
4. Run the security/session preflight:
   - Confirm task scope and whether the task is read-only, docs-only, implementation, automation, or release-sensitive.
   - Confirm active permissions and network posture are appropriate for the task.
   - Do not read, print, summarize, or persist `.env.local`, secrets, tokens, credentials, auth headers, private user data, or payment data.
   - Identify whether target files are canonical, generated, advisory, memory, archive, template, or adapter files.
   - Source: `../governance/security-preflight.md`
5. Use the source-of-truth map before relying on generated or advisory files:
   - Source: `../governance/source-of-truth-map.md`
   - Generated artifact rules: `../governance/artifact-lifecycle-policy.md`
   - Accepted review findings: `../governance/review-finding-registry.md`
6. Choose the task-size workflow mode when scope is unclear:
   - First-hour and workflow guide: `../governance/developer-onboarding.md`
7. Read the relevant AI Brain knowledge file:
   - Product scope: `knowledge/product-decisions.md`
   - Architecture: `knowledge/architecture-principles.md`
   - Code map: `knowledge/module-catalog.md`
   - Validation: `knowledge/testing-map.md`
   - Risks: `knowledge/known-risks.md`
8. Read the source docs linked from the relevant knowledge file.
9. Inspect the affected code before planning edits.

## Default Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Use `bash scripts/verify-local.sh` when unsure.

For meaningful AI Brain governance, generated artifact, review registry, memory, or onboarding changes:

```bash
npm run brain:health
```

## Rules To Keep In View

- Discover before planning.
- Plan before editing.
- Keep changes scoped to the request.
- Do not change app behavior during discovery or planning tasks.
- No task is done without validation evidence.
- Update `.ai/brain/memory/` after meaningful changes.
- Never copy `.env.local`, secrets, tokens, credentials, auth headers, or private user data into AI Brain files.
- Treat context packs, impact reports, and review reports as generated or advisory unless the source-of-truth map or finding registry says otherwise.
- Use `../governance/retrieval-contracts.md` when changing AI Brain index, search, impact, or context output shape.
- Use `../governance/memory-integrity-model.md` when changing memory rules or writing durable memory.
