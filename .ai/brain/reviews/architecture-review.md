# Makdolan AI Brain Architecture Review

Date: 2026-06-26

Review scope: Epic 1.5 architecture review after completion of Epic 1 AI Brain Platform. This is a read-only architecture assessment of the repository structure, app architecture, AI Brain operating layer, Codex configuration, scripts, documentation, and validation workflows. No product functionality is implemented by this review.

Reviewer stance: Principal Software Architect and AI Platform Engineer, evaluating whether this platform can support Makdolan for the next 5+ years.

## Executive Assessment

Makdolan has a strong early architecture foundation. The product code is small, the domain logic is separate from screens, validation is already treated as a first-class workflow, and the AI Brain layer gives future agents concrete operating context instead of relying on ad hoc chat memory.

The main architectural concern is not the Expo app itself. The larger risk is that AI Brain has quickly become a platform made of many documents, generated indexes, scripts, hooks, workflows, skills, templates, and memory files, but it does not yet have the same engineering contracts expected from durable platform software. The result is a useful system with real leverage, but also several drift, ownership, and false-confidence risks.

No Critical issues were found. The system is viable, but several High issues should be addressed before AI Brain becomes the default operating substrate for long-running implementation work.

## Reviewed Areas

- App routes: `app/`
- Screens and UI primitives: `src/screens/`, `src/ui/`
- Recommendation domain logic: `src/domain/recommendations/`
- AI Brain knowledge, planning, context packs, loop harness, memory, scripts, templates, and index: `.ai/brain/`
- Codex configuration, hooks, agents, rules, and automation templates: `.codex/`
- Local reusable skills: `.agents/skills/`
- CI workflows: `.github/workflows/`
- Product, architecture, data, and validation documentation: `docs/`, `project-context/`, `knowledge-base/`
- Package scripts and local validation helpers: `package.json`, `scripts/`

## Strengths

- The app has a simple and defensible separation between file-based routes, screen components, shared UI primitives, and deterministic recommendation domain logic.
- Recommendation logic is currently testable, local, deterministic, and not coupled to a model provider or remote service.
- Product boundaries are explicit. AI chat, checkout, payments, scraping, auth, and full commerce scope are clearly out of MVP scope.
- Cross-platform intent is documented consistently across `AGENTS.md`, architecture docs, testing docs, and AI Brain knowledge files.
- Validation is treated as part of done, not as optional cleanup. `scripts/diff-gate.sh` is a good foundation for consistent local checks.
- The AI Brain folder has a clear top-level taxonomy: knowledge, planning, context packs, loop harness, templates, memory, index, and scripts.
- Security posture is conservative for the current phase: secrets are excluded by `.gitignore`, secret scanning hooks exist, and docs repeatedly warn against copying credentials into memory.
- CI already validates typecheck, tests, lint, and web export on pull requests and pushes to `main`.
- The system avoids adding product-facing AI behavior. AI Brain is correctly positioned as SDLC infrastructure.

## Findings And Recommendations

### High: Source-of-truth boundaries are documented but not enforceable

Finding: The repository has many overlapping places for durable facts: `AGENTS.md`, `.ai/brain/knowledge/`, `.ai/brain/memory/`, `.ai/brain/planning/`, `.ai/brain/templates/`, `.codex/`, `.agents/skills/`, `docs/`, `project-context/`, and `knowledge-base/`. The boundaries are described, but there is no machine-checkable ownership model, staleness policy, or conflict detection.

Risk: Over a 5+ year horizon, agent behavior will become inconsistent if instructions drift. A future Codex session may follow an outdated AI Brain catalog while product docs or source code have moved on.

Recommendation: Create a documentation ownership and freshness model. At minimum, define which directories are authoritative for product, architecture, workflow, memory, generated artifacts, and local runtime config; add a CI check that verifies required files exist, generated indexes are fresh, and source-of-truth files do not contain contradictory key scope statements. Why: documentation is now part of the platform runtime, so it needs contracts comparable to code.

### High: AI Brain scripts are platform code but have no dedicated tests

Finding: `.ai/brain/scripts/*.mjs` implements context-pack generation, repo indexing, search, impact analysis, and memory updates. These tools influence planning and validation, but there are no fixture-based tests for argument parsing, output paths, exclusion rules, duplicate prevention, generated Markdown shape, or failure behavior.

Risk: A small script regression could silently corrupt memory, omit important files from discovery, recommend wrong validation commands, or produce misleading context packs. Because these tools guide agents, the failure mode is bad decisions rather than obvious runtime crashes.

Recommendation: Add a focused test module for AI Brain scripts using temporary fixture repositories and golden output assertions. Why: these scripts are the control plane for future AI-assisted work; their contracts should be stable, versioned, and automatically verified.

### High: Generated and historical AI Brain artifacts are mixed with durable source files

Finding: `.ai/brain/index/*.md`, `.ai/brain/index/repo-map.json`, and timestamped `.ai/brain/context-packs/*.md` are checked-in or present alongside hand-authored knowledge. Some generated context packs are intentionally excluded from future indexing, but the repository still treats generated artifacts and durable architecture knowledge as peers.

Risk: Future sessions may mistake a stale context pack or generated index for current truth. This creates hidden technical debt because the content looks authoritative but may only describe a past task or past repository state.

Recommendation: Split AI Brain artifacts into `generated/` or mark them with stricter headers, then decide which generated files are tracked. For tracked indexes, enforce freshness in CI with `npm run brain:index` followed by a clean diff check. For context packs, prefer ignoring them or archiving only milestone packs with explicit status. Why: generated working context should not compete with durable knowledge for authority.

### High: Mobile release architecture is still aspirational

Finding: The app is built on Expo React Native and treats iOS, Android, and Web as first-class targets in docs, but the production mobile build path is not implemented. CI has a web export and an `ios-build-placeholder` disabled with `if: false`; no EAS profile, native release workflow, permission matrix, app signing policy, or store metadata plan exists yet.

Risk: The architecture can support cross-platform delivery conceptually, but release readiness for iOS and Android is unproven. This can hide platform-specific regressions until late in the product cycle.

Recommendation: Add a dedicated release architecture module before the first serious mobile milestone: EAS build profiles, platform environment strategy, permission inventory, store configuration ownership, native smoke checklist, and CI gates that at least validate Expo config and prebuild assumptions. Why: cross-platform architecture is only real when each target has a repeatable build and release path.

### High: AI Brain governance depends on human discipline more than system constraints

Finding: The lifecycle requires discover, plan, execute, verify, memory updates, and maker-checker review. The instructions are strong, but many controls are advisory: memory updates are manual, checker review is manual or optional for small tasks, context packs do not guarantee follow-up inspection, and hooks are non-blocking.

Risk: The platform may produce the appearance of rigor without guaranteeing it. As the team grows, inconsistent adherence will create uneven quality and unreliable institutional memory.

Recommendation: Convert the highest-value governance rules into lightweight checks: required review artifact templates for major PR labels, CI validation for AI Brain freshness, a PR checklist tied to validation evidence, and optional local commands that verify memory/update requirements for files touched. Why: a 5-year platform needs repeatable mechanisms, not just good instructions.

### Medium: The app has good domain separation, but no application/service boundary yet

Finding: Routes delegate to screens, and recommendation scoring lives in `src/domain/recommendations/`. However, screens directly import `mockRecommendations` and call scoring functions. There is no application-layer use case, repository interface, or data provider boundary between UI and local seed data.

Risk: This is acceptable for the MVP, but the first move from mock data to seed files, local storage, API calls, user observations, or partner data will likely touch screens and domain code together.

Recommendation: Before adding real data sources, introduce a small application layer such as `src/features/recommendations/` or `src/application/recommendations/` that owns search input normalization, candidate loading, and response assembly. Why: the domain can stay deterministic while UI remains insulated from future data-source complexity.

### Medium: Navigation state is encoded directly in route params

Finding: Budget and preference selections move through the flow as route params. This is simple and web-friendly, but there is no typed route contract module or search-session model.

Risk: As preferences, location, fulfillment mode, distance, exclusions, or saved defaults grow, params can become inconsistent across screens and difficult to validate.

Recommendation: Define a small typed search-flow contract with parse/serialize helpers and tests. Why: explicit contracts make deep links, reloads, validation, and cross-platform navigation easier to maintain.

### Medium: UI primitives are too thin for long-term cross-platform consistency

Finding: `src/ui/` contains useful primitives, but style tokens, spacing, colors, typography, card patterns, chip patterns, and error states are duplicated across screens. Accessibility behavior is partially present, but not centralized.

Risk: As screens multiply, visual and accessibility drift will appear quickly. Platform-specific interaction differences may get patched locally in each screen.

Recommendation: Add a minimal design-system layer only when the next UI expansion begins: tokens, form field primitives, chip/toggle primitives, panel/list primitives, loading/empty/error states, and accessibility defaults. Why: this keeps UI consistency scalable without prematurely building a large component library.

### Medium: AI Brain architecture lacks its own ADR

Finding: There are ADRs for stack, data sources, and recommendation engine, but no ADR for AI Brain itself. The platform now includes scripts, CI, hooks, skills, templates, memory, generated artifacts, and automation policies.

Risk: Future maintainers may not know which parts are experimental, which are stable contracts, or why the current folder taxonomy exists.

Recommendation: Add an ADR for AI Brain Platform architecture covering purpose, non-goals, module boundaries, generated artifact policy, validation expectations, and evolution path. Why: AI Brain is now architectural infrastructure and deserves the same decision record standard as product architecture.

### Medium: The impact-analysis and search tools can create false precision

Finding: `brain:search` and `brain:impact` are correctly labeled as heuristic, but their output is structured enough that future agents may over-trust it. The matching is path/token based and depends on the freshness of `repo-map.json`.

Risk: A missed file can produce an incomplete plan, especially after modules are renamed or new domains are added.

Recommendation: Add evaluation fixtures and confidence categories for AI Brain search/impact output, and require generated reports to state the repo-index timestamp or freshness status. Why: heuristic planning tools are useful only when their uncertainty is visible and calibrated.

### Medium: Goal contract and template concepts are duplicated

Finding: Goal contract templates exist under both `.ai/brain/loop-harness/` and `.ai/brain/templates/`. Related review and workflow checklists also exist in several places.

Risk: Templates can diverge. Agents may choose different goal formats and accidentally omit required fields.

Recommendation: Make one canonical template per artifact type and have secondary files link to it rather than duplicating structure. Why: governance templates must be boring and stable; duplication weakens the contract.

### Medium: Validation is strong for app code but incomplete for documentation/platform quality

Finding: `diff-gate.sh` runs diff hygiene, typecheck, lint, tests, and web build. It does not validate Markdown links, required AI Brain headers, template schema, generated index freshness, workflow YAML semantics beyond general lint side effects, or script behavior.

Risk: AI Brain can degrade while all app checks pass. Broken docs links or stale generated files are especially damaging because agents depend on them for discovery.

Recommendation: Add a docs/platform validation lane, initially with low-cost checks: Markdown link checking for local paths, required-file checks, `npm run brain:index` freshness, and script smoke tests. Why: once documentation guides execution, documentation correctness is a build concern.

### Medium: Codex automation and CI are tied to external action behavior without versioned contracts

Finding: `.github/workflows/codex-*.yml` depend on `openai/codex-action@v1` and repository secrets. The workflows skip safely when secrets are missing, but there is no documented expected output contract, retention policy, or fallback process when the action changes.

Risk: AI review and nightly discovery may silently become noisy, stale, or unavailable as external action behavior evolves.

Recommendation: Document expected outputs and failure modes for Codex workflows, and keep them non-blocking until their signal quality is measured. Why: AI-based CI should augment engineering judgment without becoming an opaque release dependency.

### Medium: Security posture is documented, but no threat model exists for future data features

Finding: Security/privacy rules are clear for secrets and local docs. However, planned future areas include location, user observations, feedback, Google Places, and possibly auth or payments later. There is no threat model or privacy data inventory yet.

Risk: Early data architecture decisions can accidentally over-collect location or feedback data, making later privacy corrections expensive.

Recommendation: Create a lightweight threat model and data classification document before adding networked data, location persistence, authentication, or user submissions. Why: privacy architecture is cheapest before data starts flowing.

### Medium: Recommendation domain model is ahead of current implementation but below future production needs

Finding: Types already include price source, confidence, outlets, brands, fulfillment modes, and user preferences. That is a good direction. The missing pieces are versioned seed data, data validation, normalization rules, confidence provenance, and import boundaries.

Risk: The model may become harder to evolve if mock data remains TypeScript literals and production seed data arrives without schemas or migration rules.

Recommendation: Before expanding data coverage, define a seed data schema and validation command. Why: controlled data is the MVP baseline, and controlled data needs validation as much as code does.

### Low: Naming is mostly clear but not fully consistent

Finding: The same layer is described as AI Brain Pro, AI Brain Platform, AI Brain, SDLC layer, and operating context. These are understandable but inconsistent.

Risk: Naming inconsistency makes onboarding and search harder, especially for new contributors and agents.

Recommendation: Pick canonical naming for the platform and use aliases only in a glossary. Why: stable names reduce discovery friction and documentation drift.

### Low: Placeholder routes can become accidental architecture

Finding: `profile/preferences` exists but is intentionally hidden from the main flow. That is fine now, but placeholder routes tend to accumulate assumptions before they have user value.

Risk: Future work may build on the placeholder without an approved product decision for profile persistence or personalization.

Recommendation: Keep placeholder routes clearly marked as non-MVP or remove them until needed. Why: navigation surface area should reflect product commitments.

### Low: Localization is implicit

Finding: UI copy is Polish in screens while some domain reason strings and tests use English. There is no i18n boundary.

Risk: If the app remains Polish-only, this is acceptable. If future web/mobile growth needs multiple locales, copy will be scattered across screens and domain functions.

Recommendation: Decide whether the MVP is Polish-only. If multi-locale support becomes likely, move user-facing strings behind a small copy module before adding many screens. Why: localization gets expensive when copy is embedded deeply in UI and domain code.

### Low: Some deterministic test choices need future abstraction

Finding: Recommendation freshness uses a fixed reference date, which is good for deterministic tests. Over time, freshness will need explicit clock injection or batch recalculation semantics.

Risk: The current approach is safe for MVP but could become surprising when real data freshness matters.

Recommendation: Keep the fixed date for tests now, but introduce a clock/reference-date parameter when freshness becomes product-visible or data-driven. Why: production freshness needs controlled time semantics without making tests flaky.

## Hidden Technical Debt

- AI Brain has become a real platform without platform-level tests.
- Generated files and durable knowledge sit too close together.
- Documentation correctness is not validated at the same level as app code.
- Multiple workflow concepts exist: AGENTS lifecycle, AI Brain loop harness, Codex goal mode, local skills, Codex agents, CI workflows, and automation templates.
- Current app validation does not prove native mobile release readiness.
- Route params are doing the job of a search-session contract.
- Mock data is still embedded as code, which is fine for MVP but will become brittle as coverage expands.

## Overengineering

- The AI Brain process surface is large compared with the current app size. There are agents, skills, templates, context packs, generated indexes, loop harnesses, memory files, hooks, automation templates, and CI AI review workflows. Each piece is individually reasonable, but together they can create process weight before the product has many contributors.
- Maker/checker, goal contracts, impact analysis, context packs, and memory updates may be too heavy for small changes unless the team keeps a clear lightweight path.
- AI-driven nightly discovery and PR review are useful experiments, but they should remain advisory until signal quality is proven.

Recommendation: Define task-size tiers with required and optional AI Brain steps. Why: a durable process must be scaled to risk; otherwise developers will either skip it or spend too much time maintaining process artifacts.

## Underengineering

- No AI Brain script test suite.
- No AI Brain ADR.
- No generated artifact freshness gate.
- No Markdown/link validation.
- No EAS/native release validation path.
- No data schema validation for controlled seed data.
- No application-layer boundary between UI and recommendation data retrieval.
- No typed navigation/search-session contract.
- No threat model for future location, feedback, user observation, or partner data flows.

## Missing Modules To Consider

- `docs/architecture/ADR-0004-ai-brain-platform.md`: decision record for AI Brain architecture and governance.
- `.ai/brain/tests/` or `test/ai-brain/`: fixture tests for scripts and generated artifacts.
- `.ai/brain/schemas/`: simple schemas for generated reports, memory entries, context packs, and review artifacts if the platform continues to grow.
- `src/application/recommendations/`: use-case boundary between screens and recommendation domain/data sources.
- `src/data/` or `src/infrastructure/seed-data/`: future controlled seed data loading and validation.
- `src/navigation/` or `src/features/search-flow/`: typed route param parsing and serialization.
- `src/ui/tokens.ts` and shared form/chip/list primitives: minimal UI consistency layer.
- `docs/security/THREAT_MODEL.md`: future data and integration threat model.
- `docs/release/MOBILE_RELEASE_PLAN.md`: EAS/native build and store-release architecture.

## Recommended Improvement Roadmap

### Near Term

- Add an ADR for AI Brain Platform architecture. Why: it freezes the rationale and boundaries while Epic 1 is still fresh.
- Add script tests for `brain:index`, `brain:search`, `brain:impact`, `brain:context`, and `brain:memory:update`. Why: these scripts are the operating control plane for future agent work.
- Decide generated artifact policy for indexes and context packs. Why: agents need to know what is current truth versus task history.
- Add local-doc validation for links, required files, and generated index freshness. Why: docs are executable context for the AI workflow.

### Medium Term

- Introduce a typed search-flow contract before expanding preferences/location. Why: it keeps route state stable across iOS, Android, and Web.
- Add a small application boundary for recommendation search. Why: it will absorb data-source changes without leaking infrastructure into screens.
- Define seed data schema and validation. Why: controlled local data is a product foundation, not just test fixture data.
- Create a lightweight UI system. Why: screen count will grow faster than quality can be maintained with duplicated styles.

### Later

- Add EAS/native release architecture and CI validation. Why: mobile-first claims need a repeatable release path.
- Add privacy threat modeling before user observations, location persistence, auth, or integrations. Why: data risk compounds over time.
- Measure AI CI signal quality before making AI review blocking. Why: opaque automated review should not become a release dependency until it is trusted.

## Severity Summary

| Severity | Count | Summary |
|---|---:|---|
| Critical | 0 | No immediate architecture blocker found. |
| High | 5 | Source-of-truth drift, untested AI Brain scripts, generated artifact ambiguity, mobile release gap, advisory-only governance. |
| Medium | 9 | Application boundaries, route contracts, UI system, AI Brain ADR, heuristic confidence, template duplication, documentation validation, external AI CI contracts, security/data modeling. |
| Low | 4 | Naming consistency, placeholder route hygiene, localization boundary, future clock abstraction. |

## Final Position

AI Brain is a promising foundation, but it should now be treated as production-adjacent platform infrastructure. The next architectural step is not more process surface. The next step is hardening: tests for the tools, freshness checks for generated context, a formal ADR, clearer artifact ownership, and a release path that proves iOS and Android are more than documented intentions.
