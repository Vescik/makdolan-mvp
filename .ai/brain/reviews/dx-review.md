# AI Brain Developer Experience Review

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::DX-REVIEW`

Role: Senior Developer Experience Engineer

Date: 2026-06-26

Scope: New-developer onboarding, discoverability, learning curve, commands, documentation, workflow, cognitive load, and the question: can a developer become productive within one hour?

Non-goal: This review does not change onboarding docs, scripts, templates, or application code.

## Executive Summary

A new developer can become productive in the Makdolan app within one hour for small, well-scoped tasks. The app itself is compact, the README is short, commands are standard npm scripts, the module catalog is clear, and the core product boundary is easy to understand.

A new developer is unlikely to become fully productive in the AI Brain operating model within one hour. The SDLC layer is powerful but dense: `AGENTS.md`, `.ai/brain/`, project docs, context packs, memory, templates, reviews, automation policy, and validation rules create a large reading surface. This is appropriate for long-term AI-assisted engineering, but the current onboarding path lacks a focused "first hour" route.

The biggest DX risk is cognitive load, not missing information. The repository contains a lot of useful guidance, but it is spread across many files with unclear priority for a human joining tomorrow.

## One-Hour Productivity Answer

Can someone become productive within one hour?

Answer: Yes for basic app contribution. No for confident end-to-end AI Brain workflow ownership.

Within one hour, a new developer can likely:

- Install dependencies.
- Run the web app.
- Run typecheck, tests, lint, and web build.
- Understand the core MVP flow.
- Find app routes, screens, domain logic, and tests.
- Make a narrow change with guidance from an existing developer or issue.

Within one hour, a new developer likely cannot:

- Confidently choose between all AI Brain planning, memory, context-pack, review, and loop-harness workflows.
- Know which documentation file is canonical when product, project-context, knowledge-base, AI Brain, and review files overlap.
- Understand the complete release, automation, security, and multi-agent governance model.
- Independently make a high-risk architecture, workflow, security, or cross-platform change.

WHY: The codebase is small and approachable, but the process layer is intentionally mature and requires a guided path.

## Current First-Hour Path

An effective new developer path currently looks like this:

1. Read `README.md`.
2. Run `npm install`.
3. Run `npm run web`.
4. Run `npm test`.
5. Read `docs/project/MAKDOLAN_PROJECT_CONTEXT.md`.
6. Read `.ai/brain/knowledge/module-catalog.md`.
7. Inspect `app/`, `src/screens/`, and `src/domain/recommendations/`.
8. Run `npm run typecheck`, `npm run lint`, and `npm run build:web`.

This works for app orientation.

The AI Brain path adds:

1. Read `AGENTS.md`.
2. Read `.ai/brain/knowledge/agent-session-start.md`.
3. Read relevant `.ai/brain/knowledge/` files.
4. Understand goal contracts.
5. Understand memory updates.
6. Understand context packs.
7. Understand diff gate expectations.
8. Understand maker-checker review.
9. Understand stop conditions and automation policy.

This is too much for an unguided first hour.

## Strengths

### Low: README Is Short And Practical

`README.md` gives the mission, current MVP flow, install command, run command, verification commands, and explicit out-of-scope items.

WHY: New developers need a fast path to a running app before reading deep architecture docs.

### Low: Standard npm Command Surface

The repository uses npm and exposes conventional scripts: `web`, `ios`, `android`, `typecheck`, `test`, `lint`, and `build:web`.

WHY: Familiar commands reduce setup friction and avoid package-manager ambiguity.

### Medium: App Structure Is Easy To Discover

`app/` contains Expo Router routes, `src/screens/` contains screens, `src/domain/recommendations/` contains domain logic, and `src/ui/` contains UI primitives.

WHY: The folder structure maps well to how a developer thinks about the product flow.

### Medium: Module Catalog Is Useful

`.ai/brain/knowledge/module-catalog.md` gives a concise map of routes, domain logic, screens, tests, workflow, and CI.

WHY: This is the closest thing to a practical new-developer code map.

### Medium: Testing Map Is Actionable

`.ai/brain/knowledge/testing-map.md` maps change scope to validation commands.

WHY: New developers can choose checks without reverse-engineering CI.

### Medium: AI Brain Scripts Have Good Usage Docs

`.ai/brain/scripts/README.md` explains `brain:context`, `brain:index`, `brain:search`, `brain:impact`, and `brain:memory:update`.

WHY: Script documentation lowers the risk of agents or humans misusing helper commands.

### Medium: Product Scope Is Repeated Clearly

The repo repeatedly states that ordering, payments, full auth, scraping, delivery, nutrition, social features, and AI chat as the main UI are out of scope.

WHY: Scope repetition helps prevent a common new-contributor failure mode: adding impressive but unapproved features.

## Weaknesses

### High: No Single Human `START_HERE` Path

There is no one-page human onboarding guide that says exactly what to read, what to run, what to ignore initially, and what success looks like after one hour.

WHY: `README.md` is good for app setup, while `AGENTS.md` and AI Brain docs are good for agent governance. A new human developer needs a curated bridge between them.

Recommendation:

Create `docs/START_HERE.md` or `docs/ONBOARDING.md` with a 60-minute checklist.

WHY: A guided first hour reduces cognitive load and prevents new developers from reading the deepest process docs before they have local confidence.

### High: AI Brain Has A Large Reading Surface

AI Brain currently includes knowledge files, loop harness docs, templates, context packs, memory, index outputs, scripts, and multiple long review artifacts. Recent review files alone are thousands of lines.

WHY: The volume is useful for maintainers, but overwhelming for someone joining tomorrow.

Recommendation:

Add a "read first / read later / reference only" classification for AI Brain files.

WHY: Not every AI Brain file should compete for first-day attention.

### High: Canonical Source Priority Is Not Obvious To New Developers

Product, architecture, testing, and workflow facts exist across `README.md`, `AGENTS.md`, `docs/`, `project-context/`, `knowledge-base/`, `.ai/brain/knowledge/`, `.ai/brain/memory/`, and `.ai/brain/reviews/`.

WHY: Duplicated or summarized knowledge helps agents but makes humans ask "which file wins?"

Recommendation:

Create a source-of-truth map with canonical owners for product scope, architecture, testing, release, security, AI Brain workflow, and historical memory.

WHY: New developers need to know where to edit durable facts and where to treat content as supporting context.

### High: Workflow Rules Are Dense For Small Changes

`AGENTS.md` defines a strong Discover -> Plan -> Execute -> Verify -> Iterate loop, AI Brain memory rules, maker-checker review, goal contracts, and diff-gate requirements.

WHY: This rigor is valuable, but a new developer making a small copy or styling fix may not know which rules apply.

Recommendation:

Add task-size guidance: tiny, small, medium, major, and security/release-sensitive workflows.

WHY: DX improves when developers know when they can use lightweight flow versus full goal-contract flow.

### Medium: Some Documentation Appears Stale Or Inconsistent

`.ai/brain/README.md` says `scripts/` is a "Future home for helper scripts; currently documentation-only," but helper scripts now exist. `docs/project/MAKDOLAN_PROJECT_CONTEXT.md` says Product Checkpoint 2 may be unknown even though related docs exist in the tree.

WHY: Small stale statements reduce trust in otherwise strong documentation.

Recommendation:

Run a regular stale-docs review and add a freshness date/status to core onboarding docs.

WHY: New developers rely heavily on docs during the first day; stale docs cause avoidable uncertainty.

### Medium: Command Choice Has Minor Friction

There are several overlapping validation paths: individual npm scripts, `scripts/verify-local.sh`, `scripts/diff-gate.sh`, CI, and docs-only validation expectations.

WHY: Choice is useful for experts but slows new developers.

Recommendation:

Add a command decision table with "use this first" defaults:

- New setup: `npm install`
- Run app: `npm run web`
- Fast confidence: `npm test`
- Before PR: `bash scripts/diff-gate.sh`
- Docs-only: `git diff --check` plus required-file checks

WHY: New developers need defaults before nuance.

### Medium: Native iOS/Android Readiness Is Ambiguous

The project targets iOS, Android, and Web, but native verification depends on Expo tooling and no native folders are present.

WHY: A new developer may assume iOS/Android production build verification exists because mobile is first-class.

Recommendation:

Add a short "Mobile reality today" section to onboarding docs.

WHY: Clarity prevents new contributors from overpromising native validation.

### Medium: Review Artifacts Are Not Triage-Friendly

The review files contain valuable findings, but a new developer cannot easily tell which findings are accepted, planned, rejected, duplicated, or advisory.

WHY: Long reviews without status create cognitive load and can look like an unbounded backlog.

Recommendation:

Create a review findings index with severity, status, owner, and target area.

WHY: New developers should not have to read every review to know the current improvement priorities.

### Low: No Visual Architecture Map

The module catalog is clear as a table, but there is no compact diagram showing product flow, route flow, and domain logic boundaries.

WHY: Visual maps accelerate onboarding for developers who learn by structure rather than prose.

Recommendation:

Add one simple architecture diagram for route -> screen -> domain -> mock data/test flow.

WHY: A diagram can compress several docs into a memorable mental model.

### Low: No Explicit "Good First Task" List

The repository has docs and backlog candidates, but no curated list of safe first tasks.

WHY: New developers become productive faster when the first contribution has low ambiguity and clear validation.

Recommendation:

Add 3-5 good first task examples with affected files and validation commands.

WHY: Practice tasks teach the workflow better than reading more process documentation.

## One-Hour Onboarding Assessment

| Dimension | Rating | Notes |
| --- | --- | --- |
| Setup | Strong | `npm install` and `npm run web` are straightforward. |
| App discoverability | Strong | Routes, screens, domain logic, and tests are easy to find. |
| Command clarity | Good | Commands exist and are documented, but validation paths overlap. |
| Product understanding | Good | MVP scope is repeated clearly. |
| Architecture understanding | Good for app, medium for AI Brain | App structure is simple; AI Brain architecture needs prioritization. |
| Workflow understanding | Medium | Strong process, but dense for first-day use. |
| Documentation trust | Medium | Mostly good, but stale statements exist. |
| Cognitive load | High | Many docs and review artifacts compete for attention. |
| One-hour productivity | Conditional | Yes for small app work; no for full governance mastery. |

## Recommended First-Hour Path

### Minute 0-10: Install And Run

```bash
npm install
npm run web
```

Goal: See the app locally.

WHY: Running software creates context faster than reading policy.

### Minute 10-20: Validate Baseline

```bash
npm test
npm run typecheck
```

Goal: Confirm local development environment works.

WHY: A new developer should know whether failures are local setup problems or code problems.

### Minute 20-30: Learn Product Boundary

Read:

- `README.md`
- `docs/product/MVP_SCOPE.md`
- `.ai/brain/knowledge/product-decisions.md`

Goal: Understand what not to build.

WHY: Scope control matters more than feature velocity in this MVP.

### Minute 30-40: Learn Code Map

Read:

- `.ai/brain/knowledge/module-catalog.md`

Inspect:

- `app/`
- `src/screens/`
- `src/domain/recommendations/`

Goal: Know where changes belong.

WHY: The folder map is compact enough to learn quickly.

### Minute 40-50: Learn Validation

Read:

- `.ai/brain/knowledge/testing-map.md`

Run:

```bash
npm run lint
npm run build:web
```

Goal: Know the local confidence loop.

WHY: Productive developers need to run the same checks CI expects.

### Minute 50-60: Make A Tiny Orientation Change Or Read A Test

Suggested safe orientation:

- Read `src/domain/recommendations/scoring.test.ts`.
- Trace one test into `src/domain/recommendations/scoring.ts`.
- Do not edit yet unless a mentor has assigned a small task.

Goal: Understand how behavior is expressed and protected.

WHY: Tests show product behavior more concretely than architecture prose.

## Recommended Improvements

### High: Create A First-Day Onboarding Guide

Add a short guide that says:

- What the app does.
- How to run it.
- What to read in the first hour.
- Which docs are reference-only.
- Which commands to run before PR.
- What not to build.
- Where to ask or record open decisions.

WHY: This turns a strong documentation set into an actual onboarding experience.

### High: Add Documentation Priority Labels

Classify docs as:

- Start here.
- Required for app work.
- Required for AI Brain work.
- Reference.
- Historical.
- Generated.
- Advisory review.

WHY: The biggest DX problem is not missing docs; it is knowing which docs matter now.

### High: Add A Source-Of-Truth Map

Define canonical files for:

- Product scope.
- Architecture.
- Data/scoring.
- Testing.
- Security/privacy.
- Release.
- AI Brain workflow.
- Memory/history.

WHY: New developers need to know where facts should be updated and which summaries are secondary.

### High: Add Task-Size Workflow Modes

Define lightweight workflows for:

- Tiny docs change.
- Small app fix.
- Feature change.
- Architecture/security/release-sensitive change.
- AI Brain workflow change.

WHY: Full SDLC rigor is appropriate for major work, but the path for small changes should be explicit.

### Medium: Add Command Cheat Sheet

Create a single command table:

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Run web | `npm run web` |
| Run tests | `npm test` |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Web build | `npm run build:web` |
| Full local gate | `bash scripts/diff-gate.sh` |
| Generate AI Brain index | `npm run brain:index` |
| Search AI Brain | `npm run brain:search -- "query"` |
| Generate context pack | `npm run brain:context -- "Task" --phase=DISCOVER` |

WHY: Command discovery should not require reading multiple files.

### Medium: Add A "Mobile Reality Today" Note

Explain that iOS and Android are first-class targets through Expo, but native production verification is not fully configured in this repo yet.

WHY: It prevents new developers from assuming native release gates exist.

### Medium: Add Good First Tasks

Examples:

- Add or adjust a recommendation reason-chip test.
- Improve copy in a non-critical screen.
- Add a docs clarification with docs-only validation.
- Add a mock data test case within existing tag vocabulary.

WHY: Good first tasks teach code layout, validation, and scope boundaries with low risk.

### Medium: Add Review Findings Index

Summarize review findings from architecture, SDLC, agent, knowledge, scalability, automation, security, and DX reviews.

WHY: New developers should see the current priority backlog without reading thousands of lines.

### Medium: Fix Stale Onboarding Statements

Update stale statements such as AI Brain scripts being "documentation-only" and any outdated project-context notes.

WHY: Small inconsistencies reduce confidence in docs during onboarding.

### Low: Add A Compact Architecture Diagram

Show:

```text
Expo Router routes -> screens -> recommendation domain -> mock data -> Vitest tests
```

WHY: A one-screen diagram helps developers build a mental model quickly.

### Low: Add Troubleshooting Notes

Cover common setup issues:

- Node version mismatch.
- Expo web bundling issue.
- Missing simulator tooling.
- Build writes to `dist/`.
- `.env.local` should not be read or copied.

WHY: Troubleshooting docs reduce first-day interruption load.

## Cognitive Load Analysis

### App Cognitive Load

Rating: Low to Medium

The app has a small number of routes, screens, domain files, and tests. A developer familiar with React Native and TypeScript can orient quickly.

Primary friction:

- Understanding exact MVP UI restrictions.
- Knowing which internal scoring fields must not appear in UI.
- Remembering iOS/Android/Web are all target platforms even when local work is web-first.

### AI Brain Cognitive Load

Rating: High

AI Brain has many useful concepts: context packs, memory, goal contracts, maker-checker flow, impact analysis, diff gate, automation policies, stop conditions, reviews, and source-of-truth boundaries.

Primary friction:

- Too many files compete for first-read priority.
- Workflow requirements vary by task size.
- Reviews are long and not yet indexed by status.
- Generated versus canonical files are not labeled strongly enough.

### Documentation Cognitive Load

Rating: Medium to High

The docs are rich, but the overlap between `docs/`, `project-context/`, `knowledge-base/`, and `.ai/brain/` requires judgment.

Primary friction:

- New developers need canonical-source rules.
- Historical docs and current docs sit near each other.
- Some AI Brain review artifacts are advisory but read like policy.

## DX Risks

### High: New Developers Over-Read Before Acting

The documentation set may cause a developer to spend the first hour reading process rather than running the app.

Mitigation:

Create a first-hour checklist that starts with running the app and tests.

### High: New Developers Under-Apply AI Brain Rules

The opposite failure is also possible: a developer may ignore AI Brain and miss validation, memory, or scope rules.

Mitigation:

Add task-size workflow modes and "when AI Brain is required" guidance.

### Medium: Stale Docs Reduce Trust

Small stale statements can make developers question which docs are current.

Mitigation:

Add freshness metadata and run stale-doc scans.

### Medium: Review Artifact Volume Looks Like Mandatory Reading

A new developer may interpret every review as required pre-work.

Mitigation:

Create a review findings index and label reviews as advisory unless accepted.

### Medium: Command Overlap Creates Decision Fatigue

Developers may wonder whether to run individual npm scripts, `verify-local`, or `diff-gate`.

Mitigation:

Add command defaults by task type.

## Final Assessment

Makdolan has enough structure for a new developer to become useful quickly, but not enough curation for them to become independently confident in one hour.

The codebase onboarding experience is good. The AI Brain onboarding experience is powerful but heavy.

Best answer:

- Productive on a small app task in one hour: yes.
- Productive on AI Brain governance, architecture, release, security, or workflow changes in one hour: no.
- Productive after one focused day with a curated first-day path: likely yes.

The highest-impact DX improvement is a one-page first-day guide that gives a strict read/run order, command cheat sheet, source-of-truth map, and task-size workflow modes.
