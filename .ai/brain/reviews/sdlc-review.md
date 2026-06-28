# Makdolan AI Brain SDLC Review

Date: 2026-06-26

Role: Staff Software Engineering Manager

Scope: Review whether AI Brain supports the complete software development lifecycle for Makdolan. This assessment covers the current repository-local AI Brain platform, Codex setup, skills, templates, scripts, CI workflows, validation helpers, memory system, and supporting documentation.

This is a review artifact only. It does not implement new functionality.

## Executive Summary

AI Brain strongly supports the early and middle engineering phases: discovery, planning, architecture awareness, scoped development, validation, review, and knowledge capture. It gives agents a disciplined way to start with context, keep scope visible, validate work, and preserve useful memory.

The platform is weaker after code merges and before/after production operation. Deployment, release, maintenance, incident response, UX research, and design quality are mostly handled through checklists, disabled templates, or implied human judgment. That is acceptable for the current MVP stage, but it is not yet a complete SDLC operating system.

The main management risk is process theater: AI Brain has many good instructions, but several important controls still rely on a human or agent remembering to do the right thing. The next maturity step should be selective automation and clearer ownership, not more templates.

## Overall Maturity

| SDLC Phase | Current Support | Summary |
|---|---|---|
| Discovery | Strong | Clear session-start, repo index, search, context packs, impact analysis, and source-doc routing. |
| Planning | Strong | Goal contracts, impact templates, validation plans, stop conditions, and scope boundaries are well defined. |
| UX | Partial | Manual smoke checklist and product docs exist, but no repeatable UX research or usability evidence loop. |
| Design | Partial | Product boundaries and UI notes exist, but no design system, design review gate, or visual QA automation. |
| Architecture | Strong | Architecture principles, ADRs, module catalog, architecture review, and drift-scan template exist. |
| Development | Moderate | Good execution guidance and validation gates, but no full task-tier model or automation for enforcing required steps. |
| Testing | Moderate to Strong | Unit tests, lint, typecheck, web build, diff gate, and testing map exist; E2E/mobile/docs checks are missing. |
| Review | Strong but human-heavy | Maker/checker flow, PR review workflow, review templates, and Codex review path exist, but enforcement is manual. |
| Deployment | Weak | Web build exists; actual hosting, deploy environments, rollback, and deployment automation are not defined. |
| Release | Weak to Partial | Release-readiness skill and docs exist, but no EAS/native release path, versioning workflow, or release checklist gate. |
| Maintenance | Partial | Memory, disabled recurring scans, Dependabot config, and validation gates exist; ownership/cadence is not active. |
| Incident response | Weak | Stop conditions and safety policies exist, but no incident lifecycle, runbooks, severity model, or postmortem flow. |
| Knowledge management | Strong but drift-prone | Memory, knowledge, index, search, and templates exist; freshness and source-of-truth enforcement are missing. |

## Discovery

### What works?

- AI Brain has a clear discovery entrypoint through `.ai/brain/knowledge/agent-session-start.md`.
- The system tells agents to read source docs, architecture notes, module catalogs, testing maps, and known risks before planning.
- `npm run brain:index` and generated index files help map the repository quickly.
- `npm run brain:search` gives an offline way to find relevant docs and source filenames.
- `npm run brain:context` creates task-specific context packs that summarize likely source material without copying full code.
- The local `discovery` skill is focused and correctly read-only.

### What is missing?

- There is no required discovery evidence schema that can be machine-validated.
- Context packs do not prove the referenced files were actually read after generation.
- Discovery does not yet include structured UX, analytics, customer feedback, production telemetry, or incident history inputs.
- Generated indexes do not appear to have an enforced freshness check.

### What should be automated?

- A freshness check that fails when `.ai/brain/index/` is stale after source, docs, script, or package changes.
- A lightweight discovery report validator that checks for source docs read, affected files, tests, platform impact, security impact, and assumptions.
- A recurring stale-docs or architecture-drift scan once a human owner is assigned.

### What still depends too much on humans?

- Choosing which documents matter for a task.
- Recognizing when a context pack is too generic to be sufficient.
- Deciding whether discovery is complete enough to plan.
- Remembering to include UX, release, privacy, and mobile platform impacts when the task is not obviously about those areas.

## Planning

### What works?

- Goal contracts define objective, done criteria, allowed scope, forbidden scope, validation, stop conditions, review, and memory updates.
- Specialized templates exist for feature, refactor, bug fix, docs, and test work.
- Impact analysis templates force platform, data, test, security, release, compatibility, rollback, and validation thinking.
- Stop conditions are explicit and conservative.
- The local `planning` skill asks for acceptance criteria, affected files, platform matrix, security/privacy notes, rollback, and definition of done.

### What is missing?

- Planning quality is not automatically checked.
- There is no canonical task-size tiering model, so small changes and major work can feel governed by the same process.
- Plans do not currently require named owners or decision makers for deferred items.
- Planning does not include capacity, sequencing, dependency mapping, or delivery forecast support.

### What should be automated?

- A plan lint/check command for required headings and required risk areas.
- A task tier classifier that recommends minimum AI Brain steps based on touched files and risk.
- Automatic plan prefill from `brain:impact`, repo index, and testing map.

### What still depends too much on humans?

- Determining whether a plan is small enough.
- Recognizing hidden coupling before execution.
- Deciding whether approval is needed for dependencies, CI, release paths, privacy, or product scope.
- Keeping follow-ups from becoming invisible after the plan is complete.

## UX

### What works?

- Product docs define the MVP as a budget-first food decision helper.
- The manual smoke checklist covers the core budget -> preferences -> results -> details flow.
- Product boundaries prevent UX drift into checkout, payments, delivery, auth, social, or AI chat.
- Result-card safety rules prevent exposing internal scoring and metadata to users.
- The app has basic accessibility labels and responsive web expectations.

### What is missing?

- There is no dedicated UX research loop inside AI Brain.
- No structured usability test repository exists beyond a feedback template and manual checklist.
- There is no funnel/journey health model, user task success metric, or pain-point backlog tied to AI Brain memory.
- Accessibility review is mentioned but not formalized as a gate.
- There is no UX debt register.

### What should be automated?

- A UX checklist validator for key flows, empty states, hidden internal fields, and responsive states.
- Screenshot-based smoke checks for web once a browser verification tool is adopted.
- A structured user feedback ingestion template that creates decisions or backlog candidates without expanding MVP scope automatically.

### What still depends too much on humans?

- Judging whether copy is understandable.
- Judging whether recommendations feel useful or trustworthy.
- Recognizing accessibility regressions beyond type/lint checks.
- Translating user feedback into product decisions without overreacting to small samples.

## Design

### What works?

- UI primitives exist under `src/ui/`.
- Screens use consistent simple visual patterns for panels, chips, typography, and buttons.
- Product and architecture docs keep the MVP UI focused on fast decisions rather than broad commerce.
- Manual smoke checklist includes responsive checks and hidden-field checks.

### What is missing?

- No design system or token module exists.
- No design review template exists for visual hierarchy, accessibility, responsive behavior, interaction states, and content quality.
- No visual regression, screenshot comparison, or mobile viewport QA automation exists.
- Design decisions are not captured as ADRs or durable UI principles.
- There is no explicit ownership of design debt.

### What should be automated?

- Visual smoke screenshots for desktop, tablet, and mobile web.
- A UI/design review checklist for changed screens.
- A static check or lint rule for obvious accessibility misses where feasible.
- A design-token drift check once tokens are introduced.

### What still depends too much on humans?

- Visual quality judgment.
- Whether a UI pattern should become a shared primitive.
- Whether a screen remains on-brand and focused.
- Manual responsive testing.

## Architecture

### What works?

- Architecture principles are documented in `.ai/brain/knowledge/architecture-principles.md`.
- Source architecture docs and ADRs exist under `docs/architecture/`.
- Module catalog and repo index support orientation.
- The architecture review identifies platform risks, source-of-truth drift, generated artifact policy, and missing release architecture.
- Disabled architecture-drift automation exists as a safe template.
- Maker/checker review requires architecture fit checks for major work.

### What is missing?

- AI Brain itself does not yet have an ADR.
- Architecture drift detection is not active.
- There is no enforced rule that ADRs must change when architecture changes.
- There is no dependency graph or module-boundary check.
- Generated indexes and durable architecture facts are not clearly separated.

### What should be automated?

- Architecture drift scan after broad changes or before release-readiness review.
- Generated index freshness check.
- Required ADR/open-decision prompt when touching architecture-sensitive files.
- Module boundary checks once app structure grows.

### What still depends too much on humans?

- Recognizing when a change is architectural.
- Deciding when an ADR is required.
- Interpreting conflicts between docs and code.
- Maintaining consistency between `.ai/brain/`, `docs/`, `project-context/`, and `knowledge-base/`.

## Development

### What works?

- Development commands and validation commands are documented in `AGENTS.md`.
- The execution guidance emphasizes focused changes, existing patterns, and small scoped edits.
- Local skills cover build-loop, execution, recommendation engine, mobile web delivery, and release readiness.
- Diff gate gives developers a single validation command before completion.
- Stop conditions protect against scope creep, secrets, destructive commands, and risky operations.

### What is missing?

- No task-tier model defines which AI Brain steps are mandatory for small, medium, and major changes.
- No automated guard checks whether required AI Brain artifacts exist for high-risk file changes.
- No standardized branch or PR workflow is fully enforced beyond docs.
- No developer onboarding checklist verifies local tool readiness end to end.

### What should be automated?

- Pre-review check that maps touched files to required validation and review expectations.
- A local setup verification command that checks Node, npm, Expo scripts, Git hooks status, and ignored generated output.
- Optional task scaffolding that creates a goal contract from changed area and task type.

### What still depends too much on humans?

- Remembering to keep changes scoped.
- Knowing when not to add dependencies or modify CI.
- Deciding whether a change needs memory updates.
- Choosing targeted tests versus the full diff gate.

## Testing

### What works?

- Vitest tests cover recommendation domain behavior, tag labels, reason chips, and budget validation.
- `scripts/diff-gate.sh` runs diff hygiene, typecheck, lint, tests, and web build.
- Testing map explains validation expectations by change scope.
- Manual smoke checklist covers the current user flow.
- CI runs typecheck, tests, lint, and web build.

### What is missing?

- No UI component tests.
- No web E2E tests.
- No automated accessibility checks.
- No mobile simulator/emulator checks.
- No markdown/link validation.
- No tests for AI Brain scripts.
- No coverage threshold or coverage trend.

### What should be automated?

- AI Brain script tests.
- Markdown local-link validation.
- Web smoke tests for core routes and responsive widths.
- Accessibility checks for key screens.
- Coverage report or targeted gap scan for high-risk modules.

### What still depends too much on humans?

- Manual smoke testing.
- Deciding when missing tests are acceptable.
- Verifying iOS and Android behavior.
- Detecting broken docs links and stale generated files.

## Review

### What works?

- Maker/checker flow is well defined.
- Checker review template exists.
- `codex review --uncommitted` is documented as a local checker path.
- GitHub Codex PR review workflow exists and safely skips when `OPENAI_API_KEY` is missing.
- Review guidance prioritizes correctness, platform regressions, missing tests, security/privacy, release/build breakage, and accessibility.

### What is missing?

- Review is not enforced by CI for high-risk changes.
- There is no required review artifact check for major work.
- AI PR review output quality is not measured.
- There is no rule mapping changed files to required reviewer expertise.
- Inline architecture/design/security review gates are not automated.

### What should be automated?

- PR checklist validation for required validation evidence.
- CODEOWNERS or label-based routing for architecture, release, security, and product-scope changes.
- A non-blocking review artifact presence check for major AI Brain changes.
- Periodic review of AI PR review false positives and false negatives.

### What still depends too much on humans?

- Deciding whether a change is major.
- Running checker review locally.
- Interpreting Codex review findings.
- Enforcing memory updates after review.

## Deployment

### What works?

- Web build command exists: `npm run build:web`.
- CI proves the web export can be produced.
- Docs explicitly forbid deployment, publishing, and release operations without approval.
- Release-readiness skill reminds agents to review CI, env vars, secrets, web hosting output, rollback, and hotfix path.

### What is missing?

- No actual deployment target is defined.
- No environment strategy exists for preview, staging, and production.
- No deployment pipeline, rollback command, or deployment approval workflow exists.
- No hosting provider config exists.
- No post-deploy smoke check exists.

### What should be automated?

- Preview deployment once a hosting provider is chosen.
- Post-deploy smoke checks for core routes.
- Deployment metadata capture: commit SHA, build command, environment, URL, status, rollback target.
- Deployment readiness check that blocks missing environment or release notes.

### What still depends too much on humans?

- Choosing where and when to deploy.
- Verifying deployed behavior manually.
- Remembering rollback steps.
- Distinguishing build success from deploy success.

## Release

### What works?

- Release-readiness skill exists.
- GitHub setup docs recommend branch protection and required checks.
- The verification matrix identifies iOS, Android, and Web release checks.
- Architecture docs acknowledge future Expo/EAS or native build path needs.
- Product scope is well constrained for MVP release decisions.

### What is missing?

- No release checklist artifact exists for actual versioned releases.
- No versioning/build-number policy exists.
- No changelog or release notes process exists.
- No EAS config or native release path exists.
- No store signing, app metadata, permissions, or privacy disclosure workflow exists.
- No release approval or go/no-go process exists.

### What should be automated?

- Release readiness report generation from CI status, git status, version, build output, and known risks.
- Changelog/release note scaffold from merged PRs.
- EAS/native config checks when mobile release work starts.
- Web release smoke checklist tied to deployment environment.

### What still depends too much on humans?

- Deciding release readiness.
- Tracking mobile release prerequisites.
- Writing release notes.
- Ensuring security/privacy notes are complete before release.

## Maintenance

### What works?

- AI Brain memory records implementation history and phase completion.
- Open decisions file exists.
- Disabled automation templates cover daily health, dependency audit, stale docs, duplicate abstraction, architecture drift, and test coverage suggestions.
- Dependabot config exists.
- Validation commands are stable and easy to run.

### What is missing?

- Maintenance automations are disabled and have no assigned owners.
- No maintenance calendar or service-level expectation exists.
- No dependency update policy beyond general safety.
- No stale generated artifact cleanup policy exists.
- No test coverage trend or technical debt register exists.

### What should be automated?

- Weekly stale-docs and architecture-drift reports after manual calibration.
- Dependency audit reports that do not mutate dependencies.
- Test coverage suggestion scan.
- Generated artifact freshness and retention checks.

### What still depends too much on humans?

- Remembering to run recurring scans.
- Deciding which follow-ups matter.
- Keeping open decisions current.
- Cleaning up obsolete context packs and memory entries.

## Incident Response

### What works?

- Stop conditions are explicit for unsafe operations, secrets, production data, deployment, migrations, and unclear validation failures.
- Security/privacy docs emphasize not logging secrets or private user data.
- Diff gate and validation evidence help prevent some defects before merge.
- Automation policy forbids production API calls and release operations without approval.

### What is missing?

- No incident severity model exists.
- No incident runbook exists.
- No rollback/hotfix process exists.
- No production monitoring, alerting, logging, or ownership model exists.
- No post-incident review template exists.
- No customer/support communication flow exists.
- No data breach or privacy incident process exists.

### What should be automated?

- Incident report template generation.
- Post-incident action item tracking into memory/open decisions.
- Release and deployment metadata capture to support rollback.
- Monitoring and alerting only after real deployment targets exist.

### What still depends too much on humans?

- Detecting incidents.
- Classifying severity.
- Coordinating response roles.
- Capturing learnings after resolution.
- Knowing what was deployed and how to roll it back.

## Knowledge Management

### What works?

- AI Brain has a clear knowledge/memory split.
- Source-of-truth boundaries are documented.
- Memory update checklist explains what belongs in implementation history, open decisions, sprint summaries, and durable docs.
- `brain:search` helps find knowledge quickly.
- Repo index and module catalog help orient new sessions.
- Implementation history captures meaningful AI Brain phases with validation evidence.

### What is missing?

- Source-of-truth boundaries are not enforceable.
- Knowledge freshness is not validated.
- Generated context packs can be mistaken for current truth.
- There is no owner for pruning or archiving stale memory.
- There is no doc link checker.
- No semantic search or topic taxonomy exists beyond keyword search.

### What should be automated?

- Knowledge freshness checks.
- Local Markdown link validation.
- Generated index clean-diff validation.
- Stale memory/context-pack scan.
- Search quality tests for common onboarding and task queries.

### What still depends too much on humans?

- Updating memory after meaningful work.
- Resolving conflicts between docs.
- Deciding which facts belong in `docs/`, `knowledge-base/`, `.ai/brain/knowledge/`, or `.ai/brain/memory/`.
- Preventing knowledge bloat.

## Cross-Phase Gaps

| Gap | Impact |
|---|---|
| Human-heavy enforcement | AI Brain can be skipped or followed inconsistently under time pressure. |
| No task-tiering model | Small tasks may feel overprocessed; large tasks may still miss required controls. |
| Weak post-merge lifecycle | Deployment, release, operations, and incident response are mostly not implemented. |
| No AI Brain script tests | The platform tools can regress while app tests pass. |
| No documentation validation | Broken links, stale generated indexes, and contradictory docs can mislead agents. |
| Limited UX/design gates | Product quality depends heavily on manual judgment. |
| Mobile release gap | iOS and Android are first-class in intent but not yet proven in release mechanics. |

## Automation Priorities

1. Add AI Brain script tests. This protects the planning and knowledge tooling that agents rely on.
2. Add generated index freshness validation. This prevents stale repo maps from becoming misleading.
3. Add Markdown/local-link validation. This makes documentation quality measurable.
4. Add task-tier rules. This keeps the process lightweight for small changes and strict for risky work.
5. Add PR validation evidence checks. This turns review policy into a repeatable gate.
6. Add web smoke and accessibility checks for the core flow. This reduces UX/design reliance on manual checks.
7. Add release-readiness report generation when a deployment target exists. This bridges build validation and real release decisions.
8. Add incident and postmortem templates before production launch. This prepares the team before operational pressure exists.

## Management Assessment

AI Brain supports a disciplined engineering lifecycle, but it is not yet a complete SDLC platform. It is strongest as an agent operating system for context, planning, validation, review, and memory. It is weakest as an operational system for deployment, release, maintenance ownership, UX evidence, design governance, and incident response.

The recommended next step is to harden the current system rather than expand it broadly. Convert the highest-value human reminders into lightweight automated checks, assign owners to recurring maintenance processes, and add release/incident modules only when the product approaches real deployment. The goal should be fewer missed steps, not more documents.
