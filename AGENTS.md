# AGENTS.md

## Project mission

Build a production-quality cross-platform product deployable to **iOS, Android, and Web**. Codex must optimize for maintainability, testability, accessibility, security, and release readiness across all platforms.

## Project overview

Makdolan is a budget-first food decision helper. Users enter a food budget, choose simple preferences, and receive ranked food recommendations from controlled Rzeszow MVP data. The product is built with Expo React Native, TypeScript, Expo Router, React Native Web, deterministic local recommendation logic, Vitest, and ESLint.

Current MVP boundaries:

- Budget-first search and recommendation flow are in scope.
- iOS, Android, and Web are first-class targets.
- Local mock/seed data and deterministic scoring are the current implementation baseline.
- Ordering, checkout, payments, production scraping, full authentication, delivery tracking, nutrition/macros, social features, and AI chat as the main user interface are out of scope unless explicitly approved in a later product decision.

Important local context:

- Treat this file as the Codex-facing adapter entrypoint for AI Brain. The agent-neutral startup contract lives at `.ai/brain/agent-start.md`.
- Start new large sessions by reading `.ai/brain/knowledge/agent-session-start.md`.
- Read `.ai/brain/README.md` for AI Brain Pro structure and usage.
- Read `.ai/brain/adapters/codex.md` for how Codex maps to the agent-neutral AI Brain contract.
- Use `.ai/brain/governance/source-of-truth-map.md` to resolve canonical, generated, advisory, memory, archive, template, and adapter file status.
- Use `.ai/brain/governance/security-preflight.md` before large, ambiguous, security-sensitive, automation-related, AI Brain governance, or multi-file work.
- Use `.ai/brain/governance/developer-onboarding.md` for the first-hour path, command cheat sheet, and task-size workflow modes.
- Use `project-context/`, `docs/`, and `knowledge-base/` as source material for product and architecture facts.

## Development commands

Use npm. The lockfile is `package-lock.json`.

```bash
npm install
npm run web
npm run ios
npm run android
```

Command purposes:

- `npm run web`: start the Expo web target.
- `npm run ios`: start the Expo iOS target when simulator tooling is available.
- `npm run android`: start the Expo Android target when simulator/device tooling is available.
- `npm run start`: start the generic Expo dev server.

## Testing commands

Choose the applicable validation profile from `.ai/brain/governance/validation-profiles.md`, then run the smallest profile that fully covers the change. Escalate when the profile says to escalate, and never finish without validation evidence.

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Use the repo helper when unsure:

```bash
bash scripts/verify-local.sh
```

Use the strict AI Brain validation gate before marking meaningful work done:

```bash
bash scripts/diff-gate.sh
```

For meaningful AI Brain governance, generated artifact, review registry, memory, retrieval, or onboarding changes, also run:

```bash
npm run brain:health
```

Validation notes:

- `npm run build:web` writes Expo web export output to `dist/`.
- No native `ios/` or `android/` project folder is currently present, so native production build validation requires a future Expo/EAS or native build path.
- For docs-only changes, use the docs-only validation profile and state explicitly when app checks are skipped because app behavior did not change.

## Default Codex lifecycle

For every non-trivial task Codex must follow this loop:

1. **Discover**
   - Read the relevant product brief, architecture notes, issue/user story, acceptance criteria, and existing code.
   - Identify the current stack before assuming one. Check for `pubspec.yaml`, `package.json`, `ios/`, `android/`, `apps/`, `packages/`, `web/`, `src/`, and CI workflows.
   - Map affected screens, services, state management, navigation, API calls, persistence, tests, and build targets.
   - Record unknowns. Make reasonable assumptions only when the task is still safe and reversible.

2. **Plan**
   - Produce a concise plan before editing code.
   - Include affected files, implementation steps, tests to run, platform-specific risks, migration/rollback notes, and definition of done.
   - Prefer the smallest change that satisfies the acceptance criteria.

3. **Execute**
   - Make focused changes only.
   - Do not rewrite architecture, rename folders, change dependencies, or alter CI unless the plan explicitly requires it.
   - Preserve existing coding style and naming conventions.
   - When adding dependencies, explain why and prefer existing dependencies first.

4. **Verify**
   - Run the most relevant available checks.
   - At minimum, attempt lint/static analysis, tests, and a web build when applicable.
   - For mobile changes, verify iOS/Android build paths when available. If local OS prevents iOS verification, say so and provide the exact command to run on macOS CI.
   - If a check fails, fix the issue and rerun. If it still fails because of missing credentials/tools/environment, report exact command, error, and next action.

5. **Iterate / Learn**
   - Update tests and docs when behavior changes.
   - Update `knowledge-base/` for durable product/architecture facts.
   - Update `.ai/brain/memory/` after meaningful implementation, planning, or workflow changes.
   - Update `AGENTS.md` only for recurring mistakes or stable repository rules.
   - End with a short summary: changed files, verification results, risks, follow-ups.

In short: **DISCOVER -> PLAN -> EXECUTE -> VERIFY -> ITERATE**.

## AI Brain Pro usage rules

AI Brain Pro is the repository-local SDLC intelligence layer under `.ai/brain/`. It is for planning, project memory, workflow control, and context packaging. It is not a product-facing AI feature and must not expand MVP scope by itself.

Use AI Brain before large implementation:

- Read `.ai/brain/agent-start.md` as the agent-neutral startup contract.
- Use `.ai/brain/adapters/codex.md` for Codex-specific runtime behavior.
- Read `.ai/brain/knowledge/agent-session-start.md` at the start of large or ambiguous tasks.
- Run the security/session preflight in `.ai/brain/governance/security-preflight.md` before large, ambiguous, security-sensitive, automation-related, AI Brain governance, or multi-file work.
- Check `.ai/brain/governance/source-of-truth-map.md` before relying on generated, advisory, memory, archive, template, or adapter files.
- Use `.ai/brain/governance/developer-onboarding.md` to choose tiny, small, medium, major, or security/release-sensitive workflow modes.
- Use `.ai/brain/governance/validation-profiles.md` to choose docs-only, AI Brain governance, domain logic, UI/screens, navigation/routes, scripts/tooling, security/privacy, release-sensitive, or full confidence validation.
- Read the relevant files in `.ai/brain/knowledge/` before changing architecture, data flow, validation policy, or cross-platform behavior.
- Create or update a context pack under `.ai/brain/context-packs/` before broad implementation work when startup context would otherwise be scattered. Use `npm run brain:context -- "Task name" --phase=DISCOVER` as the deterministic helper.
- Use `.ai/brain/loop-harness/goal-contract-template.md` for multi-step goals, high-risk work, or tasks with unclear acceptance criteria.
- Use `.ai/brain/loop-harness/how-to-write-good-goals.md` and the goal templates in `.ai/brain/templates/` when creating a Codex `/goal` or manual agent loop.
- Use `.ai/brain/templates/impact-analysis-template.md` before changes that touch shared domain logic, navigation, persistence, API contracts, CI, secrets, permissions, or release behavior.

Goal contracts must include:

- Objective.
- Done when criteria.
- Validation commands.
- Allowed scope and forbidden scope.
- Stop conditions.
- Review requirement before done.
- Memory update requirement.

Maker-checker review is required for larger changes:

- Use `.ai/brain/loop-harness/maker-checker-flow.md` for major tasks, cross-platform behavior changes, shared domain logic, validation/CI/tooling changes, architecture/data/security/release changes, or broad multi-file edits.
- Maker must provide the goal contract, context pack or impact analysis when relevant, diff, validation evidence, and memory updates.
- Checker must review against `.ai/brain/templates/checker-review-template.md` and may reject completion with specific required fixes.
- `codex review --uncommitted` is the local Codex checker option when available. Compare the output against the AI Brain goal contract and checker template.
- External model or human review is allowed if it uses the same goal-contract checklist and excludes secrets, `.env.local`, credentials, private user data, and unnecessary full source dumps.

AI Brain memory rules:

- Meaningful changes require a memory update. Use `.ai/brain/memory/memory-update-checklist.md` to route the update.
- Completed implementation, workflow, validation, automation, architecture, or AI Brain changes go to `.ai/brain/memory/implementation-history.md`.
- Unresolved assumptions, deferred decisions, approval needs, or scope questions go to `.ai/brain/memory/open-decisions.md`.
- Add sprint summaries under `.ai/brain/memory/sprint-summaries/` when a sprint, milestone, or AI Brain phase is completed.
- Use `npm run brain:memory:update` when helpful to scaffold or append structured memory entries, then review the result.
- New memory after the CERT-05 boundary must include memory ID, lifecycle status, source evidence, validation evidence when applicable, review timing, and supersession fields; historical entries before that boundary are grandfathered unless materially edited.
- Do not copy secrets, private user data, `.env.local` values, credentials, tokens, or raw chat transcripts into AI Brain files.
- Memory should capture decisions, outcomes, validation evidence, and durable context; it should not duplicate full code or random working notes.

Scope boundaries:

- Respect the user's requested phase and acceptance criteria.
- Do not implement app behavior during discovery or planning phases.
- Do not treat context packs as source of truth; they are task-start maps and must be followed by repo inspection.
- Do not treat review reports as accepted policy unless the finding is accepted in `.ai/brain/governance/review-finding-registry.md`.
- Follow `.ai/brain/governance/artifact-lifecycle-policy.md` for generated artifact freshness, context-pack retention, and advisory report handling.
- Follow `.ai/brain/governance/retrieval-contracts.md` before changing AI Brain index, search, impact, or context output shape.
- Follow `.ai/brain/governance/memory-integrity-model.md` before changing memory rules or recording durable memory.
- Do not add dependencies, change CI, change release settings, create migrations, or enable networked automation unless the plan explicitly requires it and the user has approved risky operations.
- Keep `.ai/brain/` focused on durable operating context; keep product and architecture source-of-truth docs in `docs/`, `project-context/`, and `knowledge-base/`.

Done means validated:

- No task is done without validation evidence.
- For meaningful implementation, workflow, or tooling changes, use the applicable validation profile and run `bash scripts/diff-gate.sh` before final response when the profile escalates to the full confidence gate.
- No major task is done without checker review, or an explicit reason why separate checker review was not required.
- For goal-contract work, validation evidence must use command, result, key output or skipped reason, and follow-up.
- If a check is skipped, explain exactly why it was not relevant or could not run.
- If validation fails, fix and rerun when feasible; otherwise report the failing command, important output, and next action.

## Cross-platform engineering rules

- Treat iOS, Android, and Web as first-class targets. Avoid mobile-only assumptions unless the feature is explicitly mobile-only.
- Keep UI responsive. Web layouts must not stretch mobile forms across the full viewport.
- Use platform-specific UI patterns only behind a clear abstraction.
- Keep shared domain logic out of platform UI code where possible.
- Avoid hardcoded secrets, tokens, app IDs, bundle IDs, API keys, and environment-specific URLs.
- Do not commit generated build artifacts.
- Do not silently disable tests, lint rules, type checks, or CI gates.

## Security and privacy rules

- Never log tokens, passwords, refresh tokens, authorization headers, payment data, or private user data.
- Prefer environment variables and secure secret stores over checked-in config.
- Any authentication, payment, location, or personal-data feature must include a security/privacy note in the plan.
- For destructive operations, database migrations, production deployments, store releases, and credential changes: request explicit approval.

## Verification command discovery

Before inventing commands, inspect the repo:

- Flutter/Dart: `pubspec.yaml`, `flutter --version`, `flutter analyze`, `flutter test`, `flutter build web`.
- React Native / Expo / Web: `package.json`, lockfile, `pnpm/yarn/npm`, `expo`, `react-native`, `vite`, `next`, `jest`, `vitest`, `playwright`.
- Native iOS: `ios/*.xcworkspace`, `xcodebuild`, Fastlane.
- Native Android: `android/gradlew`, Gradle tasks.

Use `scripts/verify-local.sh` when unsure.

## Review guidelines

When reviewing changes, prioritize:

1. Real correctness bugs.
2. Platform regressions on iOS, Android, or Web.
3. Missing tests for changed behavior.
4. Security/privacy issues.
5. Release/build breakage.
6. Accessibility regressions.

Avoid noisy style-only comments unless the style issue hides a real defect.
