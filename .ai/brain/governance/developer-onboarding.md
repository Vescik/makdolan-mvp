# AI Brain Developer Onboarding And Workflow Modes

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-developer-onboarding` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines first-hour onboarding, command cheat sheet, and task-size workflow modes. |
| domain | Developer experience |
| created | 2026-06-26 |
| last_reviewed | 2026-06-28 |
| review_after | 2026-07-26 |

## Purpose

Makdolan should stay usable even as AI Brain becomes more rigorous. This guide gives a first-hour path and workflow modes so developers do not over-read or under-apply governance.

## First-Hour Developer Guide

### Minute 0-10: Install And Run

```bash
npm install
npm run web
```

Goal: see the app locally.

### Minute 10-20: Validate Baseline

```bash
npm test
npm run typecheck
```

Goal: confirm local setup works.

### Minute 20-30: Learn Product Boundaries

Read:

- `README.md`
- `docs/product/MVP_SCOPE.md`
- `.ai/brain/knowledge/product-decisions.md`

Goal: know what not to build.

### Minute 30-40: Learn The Code Map

Read:

- `.ai/brain/knowledge/module-catalog.md`

Inspect:

- `app/`
- `src/screens/`
- `src/domain/recommendations/`

Goal: know where changes belong.

### Minute 40-50: Learn Validation

Read:

- `.ai/brain/knowledge/testing-map.md`
- `.ai/brain/governance/validation-profiles.md`

Run:

```bash
npm run lint
npm run build:web
```

Goal: know the local confidence loop.

### Minute 50-60: Learn AI Brain Governance

Read:

- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/security-preflight.md`

Goal: know how to distinguish canonical, generated, advisory, memory, archive, template, and adapter files.

## Command Cheat Sheet

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Run web app | `npm run web` |
| Run iOS dev target | `npm run ios` |
| Run Android dev target | `npm run android` |
| Typecheck | `npm run typecheck` |
| Test | `npm test` |
| Lint | `npm run lint` |
| Lint GitHub workflows | `npm run lint:workflows` |
| Build web export | `npm run build:web` |
| Full local validation gate | `bash scripts/diff-gate.sh` |
| Validation profile guide | `.ai/brain/governance/validation-profiles.md` |
| Refresh AI Brain index | `npm run brain:index` |
| Search AI Brain | `npm run brain:search -- "query"` |
| Impact analysis | `npm run brain:impact -- "change description"` |
| Create context pack | `npm run brain:context -- "Task" --phase=DISCOVER` |
| AI Brain health check | `npm run brain:health` |
| Add memory entry | `npm run brain:memory:update -- --type=implementation --title="Title" --summary="Summary"` |
| Start an epic workspace | `./scripts/start-epic.sh <epic-id> <short-slug> <target-version>` |
| Check local phase certificate | `./scripts/check-phase-certificate.sh <epic-id> <phase-number>` |
| Install optional pre-push gate | `./scripts/install-hooks.sh` |

## Task-Size Workflow Modes

### Tiny

Use for typo fixes, wording tweaks, or single-doc clarifications.

Expected flow:

- Inspect target file.
- Edit directly.
- Use the Docs-Only validation profile unless code, config, policy, or generated artifacts changed.
- Explain why app checks were skipped if not run.

Do not create a goal contract unless the change affects policy, product scope, security, release, or validation.

### Small

Use for narrow app/docs changes with obvious scope.

Expected flow:

- Read relevant docs and files.
- Plan briefly.
- Edit focused files.
- Choose the applicable validation profile.
- Run relevant checks plus `git diff --check`.
- Run broader checks if app behavior changed.

### Medium

Use for multi-file app changes, AI Brain docs, validation policy, shared domain logic, or route/screen changes.

Expected flow:

- Run security preflight.
- Read source-of-truth map.
- Create context pack or impact analysis when context is scattered.
- Plan before edits.
- Choose the applicable validation profile, usually AI Brain Governance, Domain Logic, UI/Screens, Navigation/Routes, or Scripts/Tooling.
- Run relevant checks and usually `bash scripts/diff-gate.sh`.
- Update memory if meaningful.

### Major

Use for cross-platform behavior, architecture, data model, release, CI, security, automation, or broad AI Brain changes.

Expected flow:

- Run security preflight.
- Create or follow a goal contract.
- Use maker-checker review or explain why it was not run.
- Run `npm run brain:health` for AI Brain governance changes.
- Use the Full Confidence Gate validation profile and run `bash scripts/diff-gate.sh`.
- Update memory and planning reports.

### Security/Release-Sensitive

Use when the task touches secrets, permissions, auth, payment, deployment, release, production data, CI credentials, networked automation, or destructive operations.

Expected flow:

- Stop before crossing approval boundaries.
- Run security preflight.
- Use canonical security/privacy docs.
- Do not read or copy `.env.local`.
- Ask for explicit approval before release, credential, migration, deployment, or destructive actions.
- Use the Security/Privacy or Release-Sensitive validation profile.
- Keep validation and recovery evidence.

## Good First Tasks

- Add a recommendation-domain test within the current tag vocabulary.
- Clarify a docs-only workflow note and validate with `git diff --check`.
- Trace a budget-validation test into the implementation.
- Add a small reason-chip test if behavior is already documented.

## Notes

- AI Brain is not a product-facing AI feature.
- Review reports are advisory unless accepted in the review finding registry.
- Context packs are generated task-start maps, not source of truth.
- The full AI Brain process is for meaningful work; use the lighter modes for small changes.
