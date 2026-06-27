# AI Brain Automation Review

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::AUTOMATION-REVIEW`

Role: AI Workflow Engineer

Date: 2026-06-26

Scope: Manual AI Brain and repository workflow processes across discovery, planning, context packaging, indexing, impact analysis, validation, review, memory, knowledge management, CI, release readiness, incident response, and automation governance.

Non-goal: Do not implement automation. This review does not enable hooks, create scheduled jobs, modify workflows, or implement automation.

## Executive Summary

Makdolan already has a strong foundation for automation: deterministic AI Brain scripts, CI validation, conservative Codex hook policy, disabled automation templates, and explicit safety rules. The current system is intentionally manual-first, which is correct for early-stage workflow design.

The highest-value automation opportunities are read-only or report-writing workflows that reduce repeated human triage without changing source code. The safest next automations are stale documentation scans, AI Brain index freshness checks, review finding tracking, daily health reports, and scoped validation recommendations.

The processes that should remain human-controlled are product decisions, architecture decisions, release approvals, dependency upgrades, credential changes, deployment, incident communications, and any automatic source edits.

The main automation risk is not lack of tooling. It is enabling noisy or overpowered automation before ownership, output location, stop conditions, and review workflows are clear.

## Existing Automation Baseline

| Existing mechanism | Current state | Notes |
| --- | --- | --- |
| `.github/workflows/verify-mobile-web.yml` | Active CI | Runs install, typecheck, tests, lint, and web build on PRs and pushes to `main`. |
| `.github/workflows/codex-nightly-discovery.yml` | Active workflow, gated by `OPENAI_API_KEY` | Scheduled and manual Codex discovery report, read-only prompt. |
| `.github/workflows/codex-pr-review.yml` | Active workflow, gated by `OPENAI_API_KEY` | Codex PR review focused on high-severity issues. |
| `.codex/hooks.json` | Local hooks | Secret scan on prompt submit and non-blocking stop reminder. |
| `scripts/diff-gate.sh` | Manual validation gate | Strong local validation, not enabled as a blocking hook. |
| `npm run brain:index` | Manual helper | Generates repo index artifacts. |
| `npm run brain:search` | Manual helper | Searches AI Brain and source docs. |
| `npm run brain:context` | Manual helper | Creates task context packs. |
| `npm run brain:impact` | Manual helper | Creates heuristic impact reports. |
| `npm run brain:memory:update` | Manual helper | Appends structured memory entries. |
| `.codex/automations/templates/` | Disabled templates | Useful automation candidates, intentionally inactive. |

## Automation Principles

1. Automate observation before action.

WHY: Read-only scans and report generation reduce manual effort without creating hidden product, architecture, or release changes.

2. Automate checks before fixes.

WHY: Automatic remediation is risky when product scope, architecture boundaries, and cross-platform behavior are still controlled by human decisions.

3. Automate repeatable evidence capture.

WHY: Humans should not repeatedly assemble the same validation, freshness, and context evidence by hand.

4. Keep approval on irreversible or externally visible operations.

WHY: Deployments, releases, dependency changes, credentials, migrations, and external communications can cause damage outside the repo.

5. Prefer local, deterministic automation first.

WHY: Local scripts are portable across agents and safer than networked services while the project is still evolving.

## Priority Scale

| Priority | Meaning |
| --- | --- |
| P0 | Automate next once ownership and output path are approved. Low risk, high repeatability. |
| P1 | Automate soon after metadata or validation prerequisites exist. |
| P2 | Automate later when scale or frequency justifies it. |
| P3 | Keep mostly human-led; automation should only assist with evidence collection. |

## Highest-Priority Opportunities

| Priority | Process | Automation type | Why |
| --- | --- | --- | --- |
| P0 | AI Brain index freshness check | Read-only/report | Prevents agents from using stale generated context. |
| P0 | Stale docs scan | Read-only/report | Documentation drift is likely and already has a disabled template. |
| P0 | Review finding registry generation | Report/index | Turns review artifacts into trackable work without implementing fixes. |
| P0 | Daily codebase health scan | Read-only/report | Consolidates validation, docs, and risk signals. |
| P0 | Memory update reminder/check | Read-only/report | Catches missing memory updates without rewriting decisions. |
| P1 | Scoped validation recommendation | Report | Helps choose validation commands based on changed files. |
| P1 | Architecture drift scan | Read-only/report | Already templated; useful before release or broad changes. |
| P1 | Test coverage suggestion scan | Read-only/report | Helps prioritize tests without generating speculative tests. |
| P1 | Dependency audit | Read-only/report | Useful if strictly separated from dependency upgrades. |
| P2 | Multi-agent handoff packet generation | Report | Valuable once multiple agents routinely share work. |
| P2 | Incident readiness scan | Read-only/report | More useful once live operations exist. |
| P3 | Deployment/release actions | Human-approved execution | Too risky for autonomous automation at current maturity. |

## Manual Process Review

### 1. Agent Session Startup

Current manual process: The agent reads `AGENTS.md`, `.ai/brain/knowledge/agent-session-start.md`, relevant knowledge files, and source docs before work.

Can it become automated? Yes, partially.

Priority: P1

When: After retrieval profiles and source authority metadata exist.

How: Generate a startup packet that lists required files for task type, phase, affected domain, and platform. The packet should link to canonical files rather than copy full content.

Prerequisites:

- Retrieval profile definitions.
- Metadata for canonical docs.
- Clear distinction between generated context and source of truth.

Risks:

- Agents may over-trust generated summaries.
- Startup packets may miss unusual task context.
- Automation could hide source conflicts that a human or agent should notice.

WHY: Startup context is repetitive, but full automation before metadata exists can make context quality worse.

### 2. Repository Discovery

Current manual process: Agents inspect `package.json`, folder structure, CI, scripts, and docs to understand the stack.

Can it become automated? Yes.

Priority: P0

When: Now, as a read-only freshness/report check around the existing repo index.

How: Run `npm run brain:index` manually or in an approved report-writing automation, then check whether generated index artifacts are current and complete.

Prerequisites:

- Owner approval for generated index updates or report-only mode.
- Defined freshness criteria.
- Stop condition when the checkout has unrelated work.

Risks:

- Generated index churn.
- False confidence if index scope excludes important files.
- Report noise if every small folder change is treated as architecture drift.

WHY: Repository discovery is already deterministic enough to automate safely as observation.

### 3. AI Brain Index Freshness

Current manual process: Humans or agents decide when to regenerate `.ai/brain/index/`.

Can it become automated? Yes.

Priority: P0

When: Immediately as a read-only check; later as approved generated-file update.

How: Compare tracked source file mtimes or git diff paths against generated index metadata. Until metadata exists, run `npm run brain:index` in a temporary worktree and report whether outputs differ.

Prerequisites:

- Generated artifact policy.
- Index schema version and generated timestamp.
- Decision on whether automation may write generated index files.

Risks:

- Generated artifact churn in PRs.
- Expensive checks at larger scale.
- Agents may treat index freshness as equivalent to knowledge freshness.

WHY: Stale indexes directly reduce search, impact analysis, and session startup quality.

### 4. Context Pack Creation

Current manual process: Agents create context packs for broad or ambiguous tasks using `npm run brain:context`.

Can it become automated? Yes, partially.

Priority: P1

When: When task metadata is available from an issue, prompt, or goal contract.

How: Generate a context pack skeleton from task title, phase, affected domain, and linked issue. Keep it concise and require agent confirmation before using it as task context.

Prerequisites:

- Task type taxonomy.
- Context pack retention policy.
- Generated context validity fields.

Risks:

- Context pack sprawl.
- Repeated generic packs with low value.
- Old packs appearing in search as current guidance.

WHY: Pack creation is repetitive, but it should remain a task-start aid rather than a source of truth.

### 5. Impact Analysis

Current manual process: Agents run or manually perform impact analysis before shared domain, navigation, persistence, API, CI, release, security, or architecture changes.

Can it become automated? Yes, partially.

Priority: P1

When: After index freshness is reliable.

How: Use `npm run brain:impact -- "<change>"` to generate a report, then require direct repo inspection before implementation.

Prerequisites:

- Fresh repo index.
- Better area mapping for modules and tests.
- Output disclaimer that results are heuristic.

Risks:

- False negatives for hidden coupling.
- False positives causing unnecessary validation work.
- Agents treating heuristic output as authoritative.

WHY: Impact analysis is valuable automation, but it must remain advisory.

### 6. Goal Contract Creation

Current manual process: Agents fill templates for larger goals, including done criteria, scope, validation, stop conditions, review, and memory updates.

Can it become automated? Yes, partially.

Priority: P1

When: After goal templates have stable required fields and task taxonomy exists.

How: Generate a draft goal contract from issue/prompt text, then require human or agent review before execution.

Prerequisites:

- Required-field validator.
- Task type mapping to templates.
- Clear ownership of approved scope.

Risks:

- Boilerplate contracts that do not reflect real risk.
- Missing forbidden scope.
- Automated done criteria that are too vague.

WHY: Drafting can be automated; acceptance of scope should remain human or lead-agent controlled.

### 7. Planning Review

Current manual process: Agent writes a plan and checks it against product, architecture, platform, security, and validation constraints.

Can it become automated? Yes, as a checklist/report.

Priority: P1

When: After goal contract fields and review templates are validated.

How: Run a plan-quality check that verifies affected files, validation commands, platform risks, rollback, and security/privacy notes are present.

Prerequisites:

- Plan schema or required headings.
- Path-to-risk mapping.
- Validation command catalog.

Risks:

- Checklist compliance without real design quality.
- False sense of completeness.
- Noise on small tasks.

WHY: Automation can catch missing sections, but it cannot fully judge architecture tradeoffs.

### 8. Maker-Checker Review

Current manual process: Larger changes require checker review using AI Brain templates or `codex review --uncommitted` when available.

Can it become automated? Yes, partially.

Priority: P1

When: For PRs and high-risk local changes after output expectations are stable.

How: Use a checker prompt that compares diff, goal contract, validation evidence, and memory updates. CI already has Codex PR review as a gated workflow.

Prerequisites:

- Goal contracts consistently present for major work.
- Review severity policy.
- Safe handling of secrets and local ignored files.

Risks:

- Noisy reviews.
- Missed domain-specific issues.
- Overblocking low-risk changes.

WHY: Automated review is useful for finding gaps, but final approval should remain human for major decisions.

### 9. Pull Request Review

Current manual process: Humans review PRs; Codex PR review can run when configured.

Can it become automated? Already partially automated.

Priority: P1

When: Continue using for PRs once `OPENAI_API_KEY` is configured and findings are monitored for quality.

How: Keep automated review focused on P0/P1 correctness, security/privacy, test gaps, cross-platform regressions, and build breakage.

Prerequisites:

- Secret configured in GitHub.
- Human review remains required.
- Noise monitoring for the first runs.

Risks:

- Review comments may be too broad or duplicative.
- Model may miss project-specific context.
- Pull request permissions must remain least-privilege.

WHY: PR review automation is valuable only when it improves signal, not when it replaces ownership.

### 10. Local Validation

Current manual process: Agents run `git diff --check`, relevant app checks, or `bash scripts/diff-gate.sh`.

Can it become automated? Yes, but cautiously.

Priority: P0 for report/reminder; P2 for blocking hooks.

When: Reminder/check can be immediate. Blocking stop hook should wait until the team accepts runtime cost.

How: Keep the current non-blocking stop reminder. Optionally add a report that says whether diff gate was run for meaningful work. Enable blocking `Stop` hook only after explicit local opt-in.

Prerequisites:

- Developer opt-in for blocking hooks.
- Timeout and failure visibility.
- Escape hatch for docs-only or long-running sessions.

Risks:

- Slow stop hooks.
- Repeated web builds.
- Developers disabling hooks due to friction.

WHY: Validation evidence should be enforced culturally first; blocking automation must not make routine work painful.

### 11. CI Validation

Current manual process: CI runs on PRs and `main`; humans inspect failures.

Can it become automated? Already automated for web and Node checks.

Priority: P0 to preserve; P2 to extend.

When: Extend when native iOS/Android build paths or EAS configuration exist.

How: Add native build jobs, artifact checks, and release readiness gates only when credentials and build strategy are approved.

Prerequisites:

- Native build configuration.
- Secret management.
- Cost/time expectations.

Risks:

- CI cost growth.
- Flaky native builds.
- Credential exposure if configured carelessly.

WHY: CI should grow with actual release paths, not ahead of them.

### 12. Docs-Only Validation

Current manual process: Agents manually decide which docs checks are enough.

Can it become automated? Yes.

Priority: P0

When: Now, as a docs validation profile.

How: Validate file existence, required headings, `git diff --check`, generated index freshness, and selected links. Avoid running full app build for every docs-only change unless repository policy requires it.

Prerequisites:

- Docs validation command or script.
- Required heading patterns for review artifacts.
- Link validation scope.

Risks:

- Overly strict formatting rules can slow documentation work.
- Link checks can become noisy if external links are included.

WHY: Docs-only work is frequent in AI Brain; validation should be cheap and consistent.

### 13. Memory Update Routing

Current manual process: Agents decide whether to update implementation history, open decisions, or sprint summaries after meaningful work.

Can it become automated? Yes, as detection and draft generation.

Priority: P0

When: Immediately as a reminder/check; later as draft memory entry generation.

How: Detect meaningful changed paths and report whether memory update was likely required. Optionally generate a draft memory entry that a human or agent reviews.

Prerequisites:

- Memory update policy encoded as rules.
- Stable memory entry schema.
- Duplicate detection.

Risks:

- Low-value memory spam.
- Duplicated history.
- Agents recording incorrect decisions as durable memory.

WHY: Missing memory updates weaken AI Brain, but writing durable memory should remain reviewed.

### 14. Implementation History Updates

Current manual process: Agents append implementation entries using templates or `npm run brain:memory:update`.

Can it become automated? Yes, partially.

Priority: P1

When: After memory schema includes IDs, affected files, validation evidence, and source commit.

How: Generate a draft entry from git diff, validation commands, and final summary; require review before commit.

Prerequisites:

- Structured memory fields.
- Validation evidence capture.
- Clear rule for docs-only changes.

Risks:

- Capturing too much low-level detail.
- Incorrect summaries.
- Memory conflicts when multiple agents write simultaneously.

WHY: Drafting history is automatable; deciding what is durable remains judgment-based.

### 15. Open Decision Tracking

Current manual process: Agents manually add unresolved assumptions or deferred decisions.

Can it become automated? Yes, partially.

Priority: P1

When: After open-decision IDs, owners, and status fields are introduced.

How: Scan plans, reviews, and final summaries for phrases such as "deferred", "assumption", "approval needed", and propose open-decision entries.

Prerequisites:

- Decision schema.
- Owner/status fields.
- Review cadence.

Risks:

- False positives from ordinary caveats.
- Open decisions with no owner.
- Stale unresolved items.

WHY: Automation can detect candidates, but humans must own decisions.

### 16. Sprint Summary Creation

Current manual process: Humans or agents create sprint summaries after milestones.

Can it become automated? Yes.

Priority: P2

When: When sprint cadence and milestone boundaries are stable.

How: Generate a draft summary from implementation history, merged PRs, validation results, and review findings.

Prerequisites:

- Stable sprint calendar or milestone labels.
- PR/commit conventions.
- Memory entries with dates and domains.

Risks:

- Summaries can become generic.
- Important product context may be absent from git history.
- Requires human review for accuracy.

WHY: Sprint summaries are periodic and evidence-based, but interpretation still needs ownership.

### 17. Knowledge Base Updates

Current manual process: Agents decide when durable product or architecture facts belong in `knowledge-base/`.

Can it become automated? Partially.

Priority: P2

When: After source-of-truth boundaries and metadata are stricter.

How: Detect changed product/architecture docs and propose knowledge-base updates or stale entries.

Prerequisites:

- Canonical source mapping.
- Owner metadata.
- Freshness checks.

Risks:

- Duplicating source documents.
- Capturing transient implementation details as durable knowledge.
- Overwriting nuanced product decisions.

WHY: Knowledge-base maintenance needs judgment about durability and authority.

### 18. Stale Documentation Detection

Current manual process: Humans notice stale docs during work or reviews.

Can it become automated? Yes.

Priority: P0

When: Now, using the disabled stale-docs scan template after manual test runs.

How: Compare docs, package scripts, repo index, AI Brain policies, and source paths. Report missing files, obsolete commands, stale scope boundaries, and outdated validation guidance.

Prerequisites:

- Human owner.
- First manual run reviewed for noise.
- Report output path and retention policy.

Risks:

- False positives where docs intentionally describe future plans.
- Conflicting source-of-truth docs may require human decisions.
- Too many findings can reduce trust.

WHY: Stale documentation is a recurring, high-cost manual discovery problem.

### 19. Architecture Drift Detection

Current manual process: Humans compare implementation with architecture principles and ADRs.

Can it become automated? Yes, as advisory reporting.

Priority: P1

When: Weekly during active development or before release readiness.

How: Use the disabled architecture drift scan template to compare source/module layout against documented architecture.

Prerequisites:

- Architecture owner.
- Current architecture docs.
- Fresh repo index.

Risks:

- Overreporting intentional local deviations.
- Missing runtime behavior drift.
- Findings may require architecture decisions.

WHY: Drift scans are valuable, but changes should be planned through goal contracts.

### 20. Dependency Audit

Current manual process: Humans inspect dependencies, audits, and package drift.

Can it become automated? Yes, read-only.

Priority: P1

When: Weekly or before release readiness.

How: Run local metadata checks and optionally `npm audit` only when network is approved. Do not run fix/update commands.

Prerequisites:

- Dependency owner.
- Network policy decision.
- Explicit prohibition on lockfile mutation.

Risks:

- Network dependency.
- Noisy vulnerability reports.
- Pressure to auto-upgrade packages without regression planning.

WHY: Audit findings are automatable; remediation is not.

### 21. Duplicate Abstraction Detection

Current manual process: Humans notice repeated patterns during implementation and review.

Can it become automated? Yes, advisory only.

Priority: P2

When: Biweekly or before planned refactor work.

How: Run source searches and heuristic analysis for repeated domain, UI, validation, or tooling patterns.

Prerequisites:

- Refactor owner.
- Agreement that findings are planning inputs only.
- Fresh repo index.

Risks:

- Premature abstraction.
- False positives from intentionally duplicated simple logic.
- Refactor pressure without product value.

WHY: Duplication scans should inform refactor planning, not create automatic refactors.

### 22. Test Coverage Suggestions

Current manual process: Humans infer missing tests from changed behavior and risk areas.

Can it become automated? Yes, advisory only.

Priority: P1

When: Weekly, before release readiness, or after broad feature work.

How: Compare tests, changed source paths, testing map, and implementation history; suggest targeted tests for domain logic, validation, error states, and cross-platform risk.

Prerequisites:

- Test owner.
- Clear expected behavior docs.
- Current test map.

Risks:

- Speculative test suggestions.
- Suggestions requiring undocumented behavior.
- Overemphasis on count instead of risk coverage.

WHY: Test gap detection is repetitive, but test design still requires domain intent.

### 23. Review Finding Tracking

Current manual process: Review artifacts contain findings, but follow-up status is manual and spread across documents.

Can it become automated? Yes.

Priority: P0

When: Now, as a generated index/report.

How: Parse `.ai/brain/reviews/*.md` for headings, severities, priorities, recommendations, and status fields once a finding format is standardized.

Prerequisites:

- Stable review finding ID format.
- Status taxonomy.
- Owner or target area field.

Risks:

- Parsing inconsistent Markdown.
- Treating recommendations as committed roadmap.
- Duplicate findings across reviews.

WHY: Reviews only create durable value when findings become trackable.

### 24. Release Readiness Review

Current manual process: Humans assess validation, scope, app readiness, platform gaps, documentation, and unresolved decisions.

Can it become automated? Partially.

Priority: P2

When: Before releases, after release criteria are formalized.

How: Generate a release readiness report from CI, local validation, open decisions, known risks, test map, docs, and release checklist.

Prerequisites:

- Release readiness criteria.
- Native build path or explicit placeholder status.
- Ownership for go/no-go decision.

Risks:

- Automating approval rather than evidence collection.
- Missing manual QA findings.
- Native platform gaps hidden by web-only validation.

WHY: Release automation should collect evidence; humans should make release decisions.

### 25. Deployment

Current manual process: Deployment is not yet a production workflow in the MVP repo.

Can it become automated? Not now; later with approval.

Priority: P3

When: After hosting, environments, secrets, rollback, and release ownership are defined.

How: Use CI/CD with protected environments, manual approvals, and rollback procedures.

Prerequisites:

- Deployment target.
- Secret management.
- Rollback process.
- Observability.
- Release owner.

Risks:

- Production outage.
- Secret exposure.
- Publishing wrong build.
- Scope expansion beyond MVP.

WHY: Deployment changes are externally visible and should remain human-approved until production operations mature.

### 26. Native iOS/Android Build Readiness

Current manual process: Native production validation is acknowledged as future work because no native `ios/` or `android/` folders exist.

Can it become automated? Later.

Priority: P2

When: When EAS or native build configuration exists.

How: Add CI jobs for iOS and Android build validation, simulator smoke tests, or EAS build checks.

Prerequisites:

- Apple/Android signing strategy.
- EAS or native build setup.
- CI secrets.
- Cost expectations.

Risks:

- Flaky mobile builds.
- Secret mishandling.
- Expensive CI runs.

WHY: Mobile is first-class, but automation needs real build infrastructure.

### 27. Incident Response

Current manual process: Incident response is mostly future-facing because the MVP is not yet running production operations.

Can it become automated? Partially, later.

Priority: P2

When: After production deployment, observability, and support channels exist.

How: Automate incident report templates, evidence collection, uptime/log summaries, and post-incident memory updates. Do not automate external incident communications without approval.

Prerequisites:

- Monitoring/logging.
- Incident severity model.
- On-call or owner assignment.
- Customer/support communication policy.

Risks:

- Incorrect incident classification.
- Leakage of sensitive logs.
- Premature external messaging.

WHY: Incident automation is useful for evidence collection, not for judgment or communication at current maturity.

### 28. Security Prompt Secret Scanning

Current manual process: Agents and users avoid secrets; local hook scans prompts for obvious tokens.

Can it become automated? Already partially automated.

Priority: P0 to preserve; P1 to improve.

When: Continue now. Improve when patterns or false positives are observed.

How: Keep prompt scanning non-destructive and local. Add repository secret scanning in CI only if it avoids reading ignored local files and has clear failure behavior.

Prerequisites:

- Pattern review.
- False positive handling.
- Secret incident response guidance.

Risks:

- False positives blocking work.
- False negatives causing false confidence.
- Accidentally logging secrets in scanner output.

WHY: Secret scanning is high value, but scanner behavior must never expose the secret it detects.

### 29. Security And Privacy Review

Current manual process: Humans inspect new auth, payment, location, personal-data, or networked features for risks.

Can it become automated? Partially.

Priority: P2

When: When features touch sensitive data or networked systems.

How: Run a security/privacy checklist against changed files, docs, and plans. Require human review for sensitive features.

Prerequisites:

- Security/privacy checklist.
- Sensitive path detection.
- Data classification guidance.

Risks:

- Checklist passing without real threat modeling.
- Missing product-specific privacy concerns.
- Overblocking non-sensitive changes.

WHY: Automation can flag risk areas, but privacy/security decisions require accountability.

### 30. Product Scope Guardrails

Current manual process: Agents read MVP boundaries and avoid out-of-scope features.

Can it become automated? Partially.

Priority: P1

When: After product scope docs have metadata and stable keywords.

How: Run a scope drift scan that flags changes or plans mentioning checkout, payments, auth, scraping, nutrition, social, delivery tracking, or AI chat as primary UI.

Prerequisites:

- Canonical scope boundary file.
- Approved exception process.
- False-positive handling.

Risks:

- Overblocking legitimate future decisions.
- Keyword-only detection missing indirect scope expansion.

WHY: Scope drift is a common AI-agent failure mode and is cheap to detect.

### 31. Data And Seed Consistency Checks

Current manual process: Humans ensure mock/seed data and documentation remain aligned with product boundaries and scoring assumptions.

Can it become automated? Yes.

Priority: P1

When: When seed data schema and scoring docs are stable.

How: Validate seed data shape, required fields, price ranges, duplicate IDs, and alignment with documented scoring constraints.

Prerequisites:

- Formal seed data schema.
- Known valid ranges.
- Test fixture ownership.

Risks:

- Overfitting checks to current MVP data.
- Blocking legitimate future data expansion.

WHY: Deterministic recommendation quality depends on clean controlled data.

### 32. Manual Smoke Testing

Current manual process: Humans follow manual smoke checklists for user-facing flows.

Can it become automated? Partially.

Priority: P2

When: When the UI flow stabilizes and browser/mobile test tooling is selected.

How: Add Playwright or Expo-compatible smoke tests for budget entry, preference selection, recommendations, and favorite flows when appropriate.

Prerequisites:

- Stable UI selectors/test IDs.
- Browser/mobile test strategy.
- CI runtime budget.

Risks:

- Flaky UI tests.
- Test maintenance cost.
- Over-automating before UX stabilizes.

WHY: Smoke automation is valuable once flows stabilize, but manual exploratory testing remains useful.

### 33. Accessibility Checks

Current manual process: Accessibility is part of engineering judgment and review.

Can it become automated? Partially.

Priority: P2

When: As UI coverage grows.

How: Add static linting, web accessibility checks, and targeted manual checklist prompts for React Native accessibility labels, focus, touch targets, and contrast.

Prerequisites:

- Accessibility checklist.
- Test tooling decision.
- UI component conventions.

Risks:

- Web-only tools may miss native accessibility issues.
- Automated checks cannot validate full screen reader experience.

WHY: Accessibility automation catches regressions but cannot replace manual assistive technology checks.

### 34. Documentation Link And File Reference Checks

Current manual process: Humans notice broken file references and outdated command names.

Can it become automated? Yes.

Priority: P0

When: Now for local file references; later for external links if network is approved.

How: Scan Markdown for repository-relative paths, command references, and required files. Compare against `rg --files` and `package.json` scripts.

Prerequisites:

- Decision on link syntax conventions.
- External link network policy.
- Generated file exclusion rules.

Risks:

- False positives in examples.
- External link flakiness.

WHY: Broken references degrade agent startup and human onboarding quickly.

### 35. Ownership And Review Cadence

Current manual process: Humans infer owners and review dates from context, if at all.

Can it become automated? Partially.

Priority: P1

When: After metadata front matter is adopted.

How: Generate a report of missing owners, overdue review dates, stale canonical docs, and orphaned review findings.

Prerequisites:

- Owner metadata.
- Review cadence fields.
- Status taxonomy.

Risks:

- Assigning ownership without team agreement.
- Too many overdue warnings.

WHY: Automation can surface governance gaps but cannot assign accountability by itself.

### 36. Multi-Agent Handoff

Current manual process: Agents summarize work in final responses or context packs.

Can it become automated? Yes, partially.

Priority: P2

When: Once multiple agents routinely work on the same goals.

How: Generate handoff packets with objective, current state, changed files, validation, unresolved decisions, and next recommended action.

Prerequisites:

- Handoff packet schema.
- Goal contract IDs.
- Validation evidence capture.

Risks:

- Handoff packets becoming stale.
- Agents treating incomplete work as complete.
- Sensitive data accidentally included.

WHY: Structured handoff improves continuity, but final responsibility remains with the receiving agent or human.

### 37. Automation Template Activation

Current manual process: Humans manually test and approve disabled templates before activation.

Can it become automated? No for approval; yes for checklist validation.

Priority: P1

When: Before enabling any recurring automation.

How: Validate that a template has owner, cadence, sandbox, network policy, output path, validation, stop conditions, and rollback path.

Prerequisites:

- Template schema.
- Approval record location.
- Human owner.

Risks:

- Automating approval would bypass governance.
- Incomplete safety review.

WHY: The activation decision must remain human, but completeness checks can be automated.

### 38. Automation Output Review

Current manual process: Humans read automation findings and decide whether to ignore, schedule, create a goal, update memory, or open a draft PR.

Can it become automated? Partially.

Priority: P1

When: After report structure is standardized.

How: Generate a triage index of open automation findings with source report, severity, owner, and recommended next action.

Prerequisites:

- Finding ID format.
- Status workflow.
- Report retention policy.

Risks:

- Backlog spam.
- Findings treated as obligations without prioritization.

WHY: Triage indexing reduces lost findings while preserving human prioritization.

### 39. Release Note Generation

Current manual process: Humans summarize changes for releases.

Can it become automated? Partially.

Priority: P2

When: After commit/PR conventions and release cadence are stable.

How: Draft release notes from merged PRs, implementation history, user-facing changes, and known limitations.

Prerequisites:

- Release labels or changelog conventions.
- Product owner review.
- Exclusion rules for internal-only changes.

Risks:

- Overstating user-facing impact.
- Missing breaking or platform-specific notes.

WHY: Draft generation saves time, but release communication needs product review.

### 40. Incident Postmortem Memory Update

Current manual process: Future incident lessons would be captured manually.

Can it become automated? Partially, later.

Priority: P2

When: After incident workflow exists.

How: Generate draft memory entries from incident reports, root cause, mitigation, validation, and follow-ups.

Prerequisites:

- Incident template.
- Sensitive-data redaction rules.
- Owner approval.

Risks:

- Capturing private user data.
- Misstating root cause.
- Publishing incomplete conclusions.

WHY: Incident memory is important, but accuracy and privacy matter more than speed.

## Processes That Should Not Be Fully Automated

| Process | Automation stance | WHY |
| --- | --- | --- |
| Product scope approval | Human decision | Scope changes affect strategy and user commitments. |
| Architecture decision approval | Human/lead approval | ADRs encode long-term tradeoffs that require accountability. |
| Dependency upgrades | Human-approved implementation | Upgrades can introduce regressions and lockfile churn. |
| Credential creation/rotation | Human-controlled secure workflow | Mistakes can expose or break systems. |
| Production deployment | Human-approved gate | External user impact and rollback responsibility require ownership. |
| App store release | Human-approved gate | Store releases are irreversible or slow to correct. |
| Database migration | Human-approved gate | Data loss and downtime risks are too high. |
| Payment/auth changes | Human-approved implementation and review | Security, privacy, and legal risk. |
| External communications | Human-owned | Messaging must be accurate and context-aware. |
| Automatic source refactors | Human-approved goal | Refactors require design intent and validation. |
| Automatic product doc rewrites | Human-approved edit | Docs may encode deliberate decisions not inferable from code. |

## Recommended Automation Roadmap

### Phase 1: Safe Observation

Priority: P0

Automate or standardize:

- AI Brain index freshness report.
- Stale docs scan.
- Docs/file reference check.
- Review finding registry.
- Memory update required/not-required check.
- Daily codebase health report in a worktree.

WHY: These reduce repeated manual discovery and create no product/runtime behavior changes.

### Phase 2: Structured Workflow Assistance

Priority: P1

Automate or standardize:

- Draft goal contract generation.
- Plan completeness checks.
- Scoped validation recommendations.
- Architecture drift scan.
- Test coverage suggestion scan.
- Dependency audit report.
- Product scope drift scan.
- Automation template completeness validator.

WHY: These improve process quality while keeping implementation decisions human-controlled.

### Phase 3: Scale And Multi-Agent Coordination

Priority: P2

Automate or standardize:

- Multi-agent handoff packets.
- Sprint summary drafts.
- Release readiness evidence reports.
- Native build checks after build infrastructure exists.
- Incident readiness and postmortem memory drafts.
- Accessibility and smoke-test automation after UI patterns stabilize.

WHY: These become valuable as the team, platform, and release process grow.

### Phase 4: Controlled Execution

Priority: P3

Automate only with explicit approval:

- Deployment.
- Release.
- Dependency remediation PRs.
- Source code changes from automation findings.
- External notifications.

WHY: These operations change real systems or project direction and require accountable approval.

## Prerequisites Before Enabling More Automation

1. Finding ID schema.

WHY: Automation reports need stable references for triage and follow-up.

2. Metadata front matter for canonical AI Brain files.

WHY: Automation needs owner, status, authority, and review cadence to avoid stale or ownerless findings.

3. Generated artifact policy.

WHY: Automations must know where they can write reports and which files are source of truth.

4. Report retention policy.

WHY: Automated reports can become noise and stale context if retained indefinitely.

5. Scoped validation catalog.

WHY: Automations should recommend the smallest defensible validation set for each change type.

6. Human ownership map.

WHY: Automation without owners produces orphaned findings.

7. Stop condition templates.

WHY: Every automation must know when to stop rather than improvise.

8. Secret and privacy redaction rules.

WHY: Reports and memory must never capture secrets, credentials, `.env.local` values, or private user data.

## Key Risks

### High: Noisy Automation

Automations that produce too many vague findings will be ignored.

Mitigation: Require first manual runs, severity rules, concise reports, and owner review before activation.

### High: Automation With Too Much Write Power

Source-modifying automation can rewrite docs, code, or decisions without sufficient context.

Mitigation: Start with read-only scans and report-writing in approved paths only.

### High: Stale Reports Becoming Knowledge

Generated reports can appear authoritative if they stay searchable forever.

Mitigation: Add generated artifact metadata, retention rules, and search ranking that prefers canonical sources.

### Medium: Secret Exposure

Automation may accidentally read or report ignored files, environment values, logs, or credentials.

Mitigation: Keep network and secret access off by default. Never read `.env.local` contents. Redact suspicious values in outputs.

### Medium: False Confidence

Passing automated checks can hide missing exploratory testing, product review, or architecture judgment.

Mitigation: Label automations as evidence collectors, not final approvers.

### Medium: Runtime Cost

Blocking hooks and broad validation can slow local work.

Mitigation: Keep expensive checks opt-in or scoped by change type.

## Final Recommendation

Makdolan should automate manual AI Brain workflows in this order:

1. Read-only freshness and drift detection.
2. Report generation for docs, review findings, memory gaps, and codebase health.
3. Draft generation for goal contracts, handoffs, sprint summaries, and release evidence.
4. Scoped validation recommendations.
5. Controlled execution only after explicit human approval and production readiness.

The platform should not automate fixes, releases, deployments, dependency upgrades, credential operations, product decisions, or architecture decisions at this stage.

The near-term automation strategy should be conservative: reduce human discovery burden, preserve human accountability, and make future automation safer by adding metadata, ownership, finding IDs, and retention rules first.
