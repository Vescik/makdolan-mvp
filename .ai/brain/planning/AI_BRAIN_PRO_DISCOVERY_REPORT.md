# AI Brain Pro Discovery Report

Generated: 2026-06-26

Scope: Phase 0 discovery only. No application behavior changes were made.

## Executive Summary

Makdolan is a TypeScript Expo React Native application targeting iOS, Android, and Web through Expo Router and React Native Web. The repository already has a mature local Codex operating layer: `AGENTS.md`, `.codex/config.toml`, project subagent definitions, prompt hooks, reusable `.agents/skills`, GitHub verification workflows, and documentation for the SDLC loop.

AI Brain Pro should build on that existing operating layer rather than replace it. The safest next step is to add a repository-local `.ai/brain/` knowledge and planning system that indexes project context, captures phase plans and decisions, and orchestrates Codex workflows through existing skills, hooks, and CI gates.

## Current Repo Structure Summary

Evidence:

- `package.json`
- `package-lock.json`
- `app/`
- `src/`
- `docs/`
- `knowledge-base/`
- `project-context/`
- `prompts/`
- `scripts/`
- `.codex/`
- `.agents/`
- `.github/workflows/`
- `AGENTS.md`

Observed structure:

| Path | Purpose |
|---|---|
| `app/` | Expo Router routes: root layout, budget home, preferences, results, profile preferences, recommendation detail route. |
| `src/domain/recommendations/` | Shared deterministic recommendation domain logic, mock recommendation data, scoring, reason chips, tag labels, and unit tests. |
| `src/screens/` | Cross-platform screen components and budget validation tests. |
| `src/ui/` | Shared UI shell, button, and text components. |
| `docs/` | Product, architecture, data, testing, roadmap, Codex pipeline, connector, and review documentation. |
| `knowledge-base/` | Durable architecture notes, decision index, and glossary. |
| `project-context/` | Product brief, tech stack, security/privacy, and test strategy. |
| `prompts/` | Repeatable lifecycle prompts for bootstrap, discover, plan, execute, verify, iterate/learn. |
| `scripts/` | Local Codex loop, context collection, and verification helper scripts. |
| `.codex/` | Project-scoped Codex config, subagent definitions, hooks, rules, and state. |
| `.agents/` | Local reusable skills and plugin marketplace metadata. |
| `.github/workflows/` | CI verification plus optional Codex nightly discovery and PR review workflows. |
| `dist/` | Existing Expo web export output; should be treated as generated output unless explicitly required. |
| `node_modules/` | Installed dependencies. |

Platform shape:

- iOS target: Expo script exists, but no native `ios/` folder is present.
- Android target: Expo script exists, but no native `android/` folder is present.
- Web target: Expo web export is configured and `dist/` exists.

## Stack And Package Manager

Detected package manager:

- npm, based on `package-lock.json`.

Detected app stack:

- Expo `~56.0.12`
- Expo Router `~56.2.11`
- React `19.2.3`
- React Native `0.85.3`
- React Native Web `^0.21.2`
- TypeScript `~6.0.3`
- ESLint `^9.39.2`
- Vitest `^4.0.15`

Available scripts from `package.json`:

| Script | Command | Use |
|---|---|---|
| `start` | `expo start` | Expo dev server. |
| `android` | `expo start --android` | Android simulator/device dev start. |
| `ios` | `expo start --ios` | iOS simulator dev start. |
| `web` | `expo start --web` | Web dev start. |
| `typecheck` | `tsc --noEmit` | TypeScript validation. |
| `test` | `vitest run` | Unit tests. |
| `lint` | `eslint .` | Static linting. |
| `build` | `expo export --platform web` | Web export build. |
| `build:web` | `expo export --platform web` | Web export build alias. |

## AGENTS.md Status

`AGENTS.md` exists at the repository root. It defines the project mission, default Codex lifecycle, cross-platform rules, security/privacy rules, verification command discovery, and review guidelines.

AI Brain Pro should respect `AGENTS.md` as the top-level stable instruction source. Any future AI Brain Pro rules should be added to `AGENTS.md` only if they become stable recurring repository policy.

## Existing Documentation Map

Project context:

| File | Notes |
|---|---|
| `project-context/PRODUCT_BRIEF.md` | Defines budget-first food decision product, iOS/Android/Web targets, MVP scope, security, accessibility, analytics expectations. |
| `project-context/TECH_STACK.md` | Names Expo React Native + TypeScript as the recommended cross-platform stack. |
| `project-context/SECURITY_PRIVACY.md` | Security and privacy rules for secrets, user data, and observations. |
| `project-context/TEST_STRATEGY.md` | Test pyramid and critical-path testing direction. |

Product docs:

| File | Notes |
|---|---|
| `docs/product/PRD.md` | MVP product requirements, Rzeszow market, budget-first flow, explicit non-goals including AI chat as main interface. |
| `docs/product/MVP_SCOPE.md` | MVP scope, seed coverage, result card scope, release and rollback criteria. |
| `docs/product/PRODUCT_DECISIONS.md` | Product decision board and approved UX/data boundaries. |
| `docs/product/PRODUCT_CHECKPOINT_2.md` | MVP flow review and Sprint 2 recommendations. |
| `docs/product/PRODUCT_CHECKPOINT_3.md` | MVP readiness, user testing plan, Sprint 3 recommendations. |
| `docs/product/SPRINT_3_BACKLOG_CANDIDATES.md` | Backlog candidates and do-not-do-yet boundaries. |
| `docs/product/USER_STORIES.md` | User stories for search, preferences, recommendations, feedback, and data operations. |
| `docs/product/MONETIZATION_PLAN.md` | Monetization stance and payment implications. |

Architecture and data:

| File | Notes |
|---|---|
| `docs/architecture/ARCHITECTURE.md` | Target architecture: Expo app, recommendation API, discovery service, menu data, price verification, feedback, admin tools. |
| `docs/architecture/ADR-0001-cross-platform-stack.md` | Decision record for Expo React Native + TypeScript. |
| `docs/architecture/ADR-0002-data-sources.md` | Data source decision; controlled seed data and restricted scraping. |
| `docs/architecture/ADR-0003-recommendation-engine.md` | MVP recommendation engine decision and acceptance criteria. |
| `docs/data/DATABASE_MODEL.md` | Planned data model and relationships. |
| `docs/data/DATA_STRATEGY.md` | Data acquisition phases and quality strategy. |
| `docs/data/MENU_SEED_FORMAT.md` | Seed data format and validation rules. |
| `docs/data/PRICE_VERIFICATION_PROCESS.md` | Price confidence and review process. |
| `docs/data/SCORING_MODEL.md` | Detailed deterministic scoring model. |
| `docs/data/SCRAPING_POLICY.md` | Production scraping restrictions and approval requirements. |

Testing and release:

| File | Notes |
|---|---|
| `docs/VERIFY_MATRIX.md` | Scope-based required checks. |
| `docs/testing/MANUAL_SMOKE_CHECKLIST.md` | Manual web/native smoke checklist. |
| `docs/testing/USER_TESTING_PLAN.md` | Controlled user testing plan. |
| `docs/testing/USER_TEST_FEEDBACK_TEMPLATE.md` | User test feedback artifact. |

Codex and workflow:

| File | Notes |
|---|---|
| `docs/CODEX_PIPELINE_SETUP.md` | Recommended layered Codex architecture. |
| `docs/CONNECTORS_AND_MCP.md` | Connector and MCP guidance. |
| `docs/GITHUB_SETUP.md` | GitHub setup notes. |
| `docs/FEATURE_PLAN_TEMPLATE.md` | Planning template for feature work. |
| `docs/ARCHITECTURE_DECISION_TEMPLATE.md` | ADR template. |
| `docs/project/MAKDOLAN_PROJECT_CONTEXT.md` | Consolidated current project context and stage keys. |
| `prompts/*.md` | Lifecycle prompt library for discovery, planning, execution, verification, and learning. |

Knowledge base:

| File | Notes |
|---|---|
| `knowledge-base/README.md` | Purpose of durable knowledge. |
| `knowledge-base/architecture.md` | Durable architecture facts. |
| `knowledge-base/domain-glossary.md` | Domain vocabulary. |
| `knowledge-base/decisions/index.md` | Decision index. |

## AI, Automation, And Codex Folders

Existing folders:

- `.codex/`
- `.agents/`

Missing before this report:

- `.ai/`

Created for this discovery deliverable:

- `.ai/brain/planning/AI_BRAIN_PRO_DISCOVERY_REPORT.md`

Automation-related files found:

| File | Purpose |
|---|---|
| `.codex/hooks.json` | Registers prompt secret scan and stop verification reminder hooks. |
| `.codex/hooks/user_prompt_secret_scan.py` | Blocks obvious secret/token/private key patterns in prompts. |
| `.codex/hooks/stop_verify_guard.py` | Writes a non-blocking verification reminder under `.codex/state/`. |
| `.codex/rules/default.rules` | Prompts before destructive deletion, git push, and mobile store deploy commands. |
| `.github/workflows/verify-mobile-web.yml` | CI for npm install, typecheck, tests, lint, and web build. |
| `.github/workflows/codex-nightly-discovery.yml` | Optional scheduled Codex discovery via `openai/codex-action@v1`. |
| `.github/workflows/codex-pr-review.yml` | Optional Codex PR review via `openai/codex-action@v1`. |
| `scripts/codex-loop.sh` | Local Codex lifecycle helper. |
| `scripts/collect-context.sh` | Local context collection helper. |
| `scripts/verify-local.sh` | Local verification script. |

No dedicated automation folder such as `.ai/brain/automations/` or `automations/` existed before this discovery.

## Supported Codex Features Found

Codex CLI:

- Executable: `/Users/dmachowski/.local/bin/codex`
- Version: `codex-cli 0.142.0`

Project Codex configuration:

- `.codex/config.toml` sets `sandbox_mode = "workspace-write"` and `approval_policy = "on-request"` for trusted local repository use.
- `.codex/config.toml` sets `network_access = false` under `sandbox_workspace_write`.
- `.codex/config.toml` defines agent limits: `max_threads = 6`, `max_depth = 1`, `job_max_runtime_seconds = 1800`.
- `.codex/config.toml` includes a disabled `context7` MCP server placeholder.

Subagents:

| Agent file | Role |
|---|---|
| `.codex/agents/discovery-architect.toml` | Read-only discovery and risk mapping. |
| `.codex/agents/planner.toml` | Read-only implementation planning. |
| `.codex/agents/executor.toml` | Focused implementation after planning. |
| `.codex/agents/verifier.toml` | Verification and release checks. |
| `.codex/agents/release-engineer.toml` | Release readiness and deployment gate review. |

Local skills:

- `build-loop`
- `discovery`
- `planning`
- `execution`
- `verification`
- `knowledge-maintainer`
- `release-readiness`
- `mobile-web-delivery`
- `food-data-strategy`
- `recommendation-engine`

Codex feature flags observed through `codex features list`:

| Feature | Stage | State |
|---|---|---|
| `goals` | stable | true |
| `hooks` | stable | true |
| `apps` | stable | true |
| `browser_use` | stable | true |
| `browser_use_external` | stable | true |
| `in_app_browser` | stable | true |
| `image_generation` | stable | true |
| `multi_agent` | stable | true |
| `plugins` | stable | true |
| `auto_compaction` | stable | true |
| `memories` | experimental | true |
| `workspace_dependencies` | stable | true |
| `shell_tool` | stable | true |
| `unified_exec` | stable | true |

Goal support:

- `codex features list` reports `goals` as `stable true`.
- `/goal` is an interactive slash-command style feature, so it does not appear as a normal `codex --help` subcommand.
- The current Codex desktop/runtime also exposes goal-oriented tools in the active tool surface.
- Conclusion: goal support appears available; no feature enablement is indicated by local CLI feature flags.

## Recommended AI Brain Pro Architecture

Recommended principle: AI Brain Pro should be a repo-local SDLC intelligence layer, not product-facing AI and not a replacement for the app's deterministic recommendation engine.

Proposed directory architecture:

```text
.ai/
  brain/
    README.md
    config/
      brain.config.md
      source-map.md
    planning/
      AI_BRAIN_PRO_DISCOVERY_REPORT.md
      phase-1-plan.md
      phase-2-plan.md
    memory/
      repo-profile.md
      product-profile.md
      architecture-profile.md
      validation-profile.md
      codex-profile.md
    decisions/
      index.md
      ADR-AIBRAIN-0001-architecture.md
    runs/
      YYYY-MM-DD-run-id.md
    prompts/
      discover.md
      plan.md
      execute.md
      verify.md
      learn.md
    automations/
      README.md
      nightly-discovery.md
      pr-review.md
    metrics/
      validation-history.md
      risk-register.md
```

Recommended logical components:

| Component | Responsibility | Source of truth |
|---|---|---|
| Brain index | Maps repo docs, code areas, skills, validation gates, and open risks. | `.ai/brain/memory/*.md` |
| Planning workspace | Stores phase reports, implementation plans, acceptance criteria, and rollback notes. | `.ai/brain/planning/*.md` |
| Decision log | Captures AI Brain-specific architecture decisions without polluting app ADRs. | `.ai/brain/decisions/*.md` |
| Run ledger | Records important Codex sessions, commands run, skipped checks, and outcomes. | `.ai/brain/runs/*.md` |
| Prompt library | Wraps existing `prompts/` with AI Brain Pro-specific inputs and outputs. | `.ai/brain/prompts/*.md` |
| Automation notes | Documents optional scheduled/CI automations before changing workflows. | `.ai/brain/automations/*.md` |
| Risk register | Tracks implementation, privacy, release, and process risks across phases. | `.ai/brain/metrics/risk-register.md` |

Integration with existing Codex layer:

- Keep `AGENTS.md` as stable repo policy.
- Keep `.codex/config.toml` as execution policy.
- Keep `.codex/agents/*.toml` as runnable agent roles.
- Keep `.agents/skills/*` as reusable workflow instructions.
- Use `.ai/brain/` for generated context, plans, phase reports, run history, and AI Brain-specific decisions.
- Update `knowledge-base/` only when a product or architecture fact becomes durable beyond AI Brain Pro.

Recommended guardrails:

- AI Brain Pro must not introduce app-facing AI chat into the MVP, because `docs/product/PRD.md` explicitly excludes AI chat as the main interface.
- AI Brain Pro must not read, summarize, or persist secrets from `.env.local`.
- AI Brain Pro should default to read-only discovery and planning phases.
- Any automation that calls external APIs, changes credentials, pushes code, deploys, or opens PRs must require explicit approval.
- Any new CI workflow that uses `OPENAI_API_KEY` must have a skip path when the secret is unavailable, matching existing Codex workflows.

## Missing Prerequisites

Missing or incomplete for AI Brain Pro implementation:

- No prior `.ai/brain/` architecture or schema existed.
- No AI Brain Pro-specific acceptance criteria existed before this report.
- No explicit run ledger exists for Codex/AI Brain sessions.
- No AI Brain-specific risk register exists.
- No AI Brain-specific decision records exist.
- No dedicated automation design docs exist under `.ai/brain/automations/`.
- No markdown lint or docs link checker script is configured for pure documentation changes.
- `context7` MCP is present only as a disabled placeholder.
- GitHub Codex workflows require `OPENAI_API_KEY` repository secret to do real work.
- No native `ios/` or `android/` projects exist, so mobile build validation is limited to Expo starts until native/EAS build paths are configured.
- No EAS configuration was observed for production mobile builds.

Sensitive local files:

- `.env.local` exists. It was not read during this discovery and should remain excluded from AI Brain memory.

## Safe Validation Commands

Primary local checks:

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

Repo helper:

```bash
bash scripts/verify-local.sh
```

CI-equivalent install and verification:

```bash
npm ci
npm run typecheck
npm test
npm run lint
npm run build:web
```

Development starts:

```bash
npm run web
npm run ios
npm run android
```

Notes:

- `npm ci` may modify `node_modules/` and requires dependency availability; avoid unless dependency state needs reset.
- `npm run build:web` writes Expo export output to `dist/`.
- iOS and Android scripts are dev starts, not production native build checks.
- There is no current native `ios/` or `android/` folder for direct `xcodebuild` or Gradle validation.

## Proposed Implementation Phases

### Phase 1: Brain Skeleton

Goal: Create the minimal `.ai/brain/` structure and conventions.

Deliverables:

- `.ai/brain/README.md`
- `.ai/brain/config/source-map.md`
- `.ai/brain/memory/repo-profile.md`
- `.ai/brain/memory/codex-profile.md`
- `.ai/brain/metrics/risk-register.md`
- `.ai/brain/runs/README.md`

Validation:

- Confirm no app source files changed.
- Run docs-only sanity checks available locally.
- If no markdown lint exists, report that gap explicitly.

### Phase 2: Memory Profiles

Goal: Convert existing project docs into compact, durable AI Brain memory without duplicating entire docs.

Deliverables:

- Product profile derived from `project-context/PRODUCT_BRIEF.md` and `docs/product/PRD.md`.
- Architecture profile derived from `docs/architecture/ARCHITECTURE.md` and ADRs.
- Validation profile derived from `docs/VERIFY_MATRIX.md`, `scripts/verify-local.sh`, and CI workflows.
- Data/profile notes derived from data strategy and scoring docs.

Validation:

- Cross-check profiles against source docs.
- Do not include secrets or environment-specific values.

### Phase 3: Brain Workflow Integration

Goal: Wire AI Brain Pro into existing Codex lifecycle without changing app behavior.

Deliverables:

- AI Brain-specific prompt wrappers under `.ai/brain/prompts/`.
- Run ledger template.
- Decision record template for AI Brain changes.
- Optional guidance for when to update `knowledge-base/` versus `.ai/brain/memory/`.

Validation:

- Dry-run the workflow on a docs-only scenario.
- Confirm `AGENTS.md` remains the top-level policy source.

### Phase 4: Automation Design

Goal: Design automations before enabling them.

Deliverables:

- `.ai/brain/automations/nightly-discovery.md`
- `.ai/brain/automations/pr-review.md`
- `.ai/brain/automations/local-stop-guard.md`
- Approval model for external API usage, PR actions, deployment, and credentials.

Validation:

- Compare against existing `.github/workflows/codex-nightly-discovery.yml` and `.github/workflows/codex-pr-review.yml`.
- Confirm workflows skip safely when secrets are missing.

### Phase 5: Optional Enforcement

Goal: Add deterministic guardrails only after the docs and workflow prove useful.

Candidate changes:

- Markdown lint/docs link check script.
- CI docs validation for `.ai/brain/`.
- Optional hook that reminds the agent to update AI Brain memory after approved phases.

Validation:

- Run `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build:web` if package scripts or app-adjacent files change.
- For docs-only guardrails, run the new docs check and the existing verifier if practical.

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| AI Brain Pro duplicates existing docs and becomes stale. | Conflicting project guidance. | Store summaries and source maps, not full copied docs; point back to source files. |
| AI Brain Pro conflicts with `AGENTS.md`. | Codex follows inconsistent rules. | Keep `AGENTS.md` authoritative for stable repo rules; use `.ai/brain/` for phase artifacts and memory. |
| Product-facing AI scope creep. | Violates MVP non-goals and may degrade user trust. | Keep AI Brain Pro SDLC-only unless a separately approved product feature changes scope. |
| Secret leakage into memory. | Security incident. | Exclude `.env.local`; keep secret scan hook; never persist tokens, auth headers, or private data. |
| Automation runs without credentials or approval. | Failing workflows or unintended external actions. | Follow existing workflow pattern that skips when `OPENAI_API_KEY` is absent; require explicit approval for deploys, pushes, credential changes. |
| Native release readiness is overestimated. | iOS/Android gaps hidden by web-only validation. | Record that no `ios/` or `android/` native folders exist; plan EAS/native build strategy separately. |
| Generated `dist/` creates review noise. | PR diffs become noisy. | Treat `dist/` as generated unless release process explicitly requires it. |
| AI Brain folder grows without validation. | Low-signal process overhead. | Add acceptance criteria and run ledger entries only for meaningful phases. |
| No docs lint/link check exists. | Broken planning docs can accumulate. | Add docs validation in a later phase if the repository wants enforceable documentation quality. |

## Acceptance Criteria For Next Phase

Phase 1 is ready to begin when all of the following are true:

- The team confirms AI Brain Pro is an SDLC/repository intelligence layer, not a user-facing AI product feature.
- The `.ai/brain/` skeleton is approved as the implementation target.
- `.env.local` and other secrets remain excluded from AI Brain memory.
- Existing `AGENTS.md`, `.codex/`, `.agents/`, `docs/`, and `knowledge-base/` roles remain unchanged unless explicitly planned.
- Phase 1 changes are limited to `.ai/brain/` documentation and templates.
- A docs-only verification approach is selected; if no markdown tooling exists, the phase report must say that explicitly.
- No dependency installation, network use, CI changes, or app source edits occur in Phase 1 unless separately approved.
- The next phase deliverable includes changed files, verification commands, skipped checks, risks, and follow-ups.

## Verification Performed For This Discovery

Commands run:

```bash
find . -maxdepth 2 -type d
find . -maxdepth 2 -type f
git status --short
sed -n '1,240p' package.json
find docs knowledge-base project-context prompts scripts .github .agents .codex -maxdepth 3 -type f
sed -n '1,240p' .codex/config.toml
sed -n '1,240p' .codex/hooks.json
command -v codex
codex --version
codex --help
find app src -maxdepth 4 -type f
find . -maxdepth 2 -name 'package-lock.json' -o -name 'yarn.lock' -o -name 'pnpm-lock.yaml' -o -name 'bun.lockb' -o -name 'bun.lock' -o -name 'pubspec.yaml' -o -name 'ios' -o -name 'android'
sed -n '1,240p' scripts/verify-local.sh
rg -n "goal|/goal|automation|hook|agent|AI Brain|brain" AGENTS.md docs knowledge-base project-context prompts scripts .codex .agents -S
codex features --help
codex features list
rg -n "^(#|##|###) " README.md AGENTS.md INSTALL_CHECKLIST.md docs knowledge-base project-context prompts
find . -maxdepth 3 -type d \( -name '.ai' -o -name '.codex' -o -name '.agents' -o -name '*automation*' -o -name '*automations*' \)
find . -maxdepth 4 -type f | rg -i 'automation|agent|codex|hook|brain|goal'
sed -n '1,220p' README.md
sed -n '1,240p' project-context/PRODUCT_BRIEF.md
sed -n '1,220p' project-context/TECH_STACK.md
sed -n '1,220p' docs/architecture/ARCHITECTURE.md
sed -n '1,220p' docs/product/PRD.md
sed -n '1,220p' docs/CODEX_PIPELINE_SETUP.md
sed -n '1,220p' .codex/agents/discovery-architect.toml
sed -n '1,220p' .codex/agents/planner.toml
sed -n '1,220p' .codex/agents/executor.toml
sed -n '1,220p' .codex/agents/verifier.toml
sed -n '1,220p' .codex/agents/release-engineer.toml
sed -n '1,220p' .codex/rules/default.rules
sed -n '1,240p' .codex/hooks/user_prompt_secret_scan.py
sed -n '1,240p' .codex/hooks/stop_verify_guard.py
sed -n '1,220p' .github/workflows/verify-mobile-web.yml
sed -n '1,220p' .github/workflows/codex-nightly-discovery.yml
sed -n '1,220p' .github/workflows/codex-pr-review.yml
sed -n '1,220p' docs/VERIFY_MATRIX.md
```

Not run:

- App validation commands such as `npm run typecheck`, `npm test`, `npm run lint`, or `npm run build:web`, because this was a discovery/reporting task with no app source changes.
- Network-dependent commands.
- Dependency installation commands.
