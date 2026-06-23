# AGENTS.md

## Project mission

Build a production-quality cross-platform product deployable to **iOS, Android, and Web**. Codex must optimize for maintainability, testability, accessibility, security, and release readiness across all platforms.

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
   - Update `AGENTS.md` only for recurring mistakes or stable repository rules.
   - End with a short summary: changed files, verification results, risks, follow-ups.

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
