# Agent Session Start

Read this file at the start of large Makdolan tasks.

## First Principles

Makdolan is a cross-platform Expo React Native app for iOS, Android, and Web. The MVP is a budget-first food decision helper for Rzeszow using controlled data and deterministic recommendation scoring.

AI Brain Pro is an SDLC support layer. It helps with planning, memory, validation, and workflow control. It is not a user-facing feature.

## Start Checklist

1. Read `AGENTS.md`.
2. Read this file.
3. Read the relevant AI Brain knowledge file:
   - Product scope: `knowledge/product-decisions.md`
   - Architecture: `knowledge/architecture-principles.md`
   - Code map: `knowledge/module-catalog.md`
   - Validation: `knowledge/testing-map.md`
   - Risks: `knowledge/known-risks.md`
4. Read the source docs linked from the relevant knowledge file.
5. Inspect the affected code before planning edits.

## Default Commands

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Use `bash scripts/verify-local.sh` when unsure.

## Rules To Keep In View

- Discover before planning.
- Plan before editing.
- Keep changes scoped to the request.
- Do not change app behavior during discovery or planning tasks.
- No task is done without validation evidence.
- Update `.ai/brain/memory/` after meaningful changes.
- Never copy `.env.local`, secrets, tokens, credentials, auth headers, or private user data into AI Brain files.
