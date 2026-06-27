# Epic 2 Knowledge Domain Discovery Report

Metadata:

| Field | Value |
| --- | --- |
| id | `epic2-knowledge-domain-discovery-report` |
| class | `advisory` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Discovery report for proposing Epic 2 domain-brain structure; does not create canonical domain policy by itself. |
| domain | Epic 2 planning |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Report ID: `MAKDOLAN::EPIC2::PHASE0::KNOWLEDGE-DOMAIN-DISCOVERY`

## 1. Executive Summary

AI Brain is ready to start Epic 2 Phase 0 domain planning. The current repository has strong canonical sources for product scope, architecture, recommendation logic, data strategy, validation, AI Brain governance, and certification state. It also has enough module and script indexing to let agents retrieve the right sources without relying on stale generated context.

The strongest current domains are Product, Architecture, Development, Testing, and Memory/Governance. UX is usable but still depends on upcoming controlled user testing. Design, Operations, and Business are less mature because they have planning notes and constraints but not dedicated operating artifacts, ownership models, or post-MVP decision records.

The main Epic 2 risk is not missing raw information. It is that current knowledge is spread across `docs/`, `project-context/`, `knowledge-base/`, `.ai/brain/knowledge/`, `.ai/brain/governance/`, certification reports, and generated indexes. Domain brains should solve that by creating thin, reference-first domain entrypoints. They should not duplicate canonical docs or create a parallel source of truth.

Recommended next prompt: `[MAKDOLAN::EPIC2::PRODUCT-BRAIN::FRAMEWORK]`. Product should go first because all other domain brains depend on stable product boundaries, out-of-scope rules, user-testing interpretation, and future backlog intake rules.

## 2. Knowledge Source Inventory

| Path | Description | Current class | Proposed domain | Authority | Freshness | Recommended action |
| --- | --- | --- | --- | --- | --- | --- |
| `AGENTS.md` | Codex-facing repository and AI Brain adapter entrypoint. | adapter/canonical for Codex behavior | Cross-domain, Development, AI Agent | High for Codex runtime rules. | Current, updated with agent-neutral startup and validation guidance. | Reference from domain brains for workflow rules; do not duplicate. |
| `.ai/brain/agent-start.md` | Agent-neutral startup contract. | canonical | Cross-domain, AI Agent | High for all agent sessions. | Current. | Use as universal domain-brain startup entrypoint. |
| `.ai/brain/README.md` | AI Brain structure, purpose, directory map, usage model. | canonical | Cross-domain | High for AI Brain layout. | Current. | Reference from all future domain brain `README.md` files. |
| `.ai/brain/adapters/` | Codex and generic-agent adapter guidance. | adapter | AI Agent, Development | High for runtime-specific behavior only. | Current. | Keep as runtime layer; do not let adapter rules override domain source-of-truth. |
| `.ai/brain/governance/source-of-truth-map.md` | File classification, authority hierarchy, metadata model. | canonical | Cross-domain, Knowledge Governance | High. | Current. | Use to classify every domain-brain source. |
| `.ai/brain/governance/artifact-lifecycle-policy.md` | Generated/advisory artifact freshness and retention rules. | canonical | Knowledge Governance, Operations | High. | Current. | Reference in domain-brain generated index and report rules. |
| `.ai/brain/governance/retrieval-contracts.md` | Search, impact, context, index retrieval contracts. | canonical | Cross-domain, Development | High. | Current. | Use for future domain-brain retrieval output expectations. |
| `.ai/brain/governance/memory-integrity-model.md` | Memory lifecycle, provenance, grandfathering, validation. | canonical | Memory | High. | Current. | Use as memory domain authority. |
| `.ai/brain/governance/validation-profiles.md` | Change-scope validation profiles and evidence format. | canonical | Testing, Development, Operations | High. | Current. | Reference from Testing Brain and every domain workflow. |
| `.ai/brain/governance/developer-onboarding.md` | First-hour guide and task-size workflow modes. | canonical | Development, DX | High. | Current. | Use as Development/DX domain seed. |
| `.ai/brain/governance/security-preflight.md` | Security/session startup preflight. | canonical | Operations, Security | High. | Current. | Reference for all security-sensitive domain work. |
| `.ai/brain/governance/automation-activation-validation.md` | Activation checklist before any automation is enabled. | canonical | Operations, Automation | High for automation activation. | Current. | Keep as blocker gate; Operations Brain should point here. |
| `.ai/brain/governance/review-finding-registry.md` | Accepted/deferred review finding status. | canonical | Governance, Cross-domain | High for review recommendations. | Current after certification cleanup. | Use before promoting review findings into domain backlog. |
| `.ai/brain/certification/CERTIFICATION_BACKLOG.md` | Certification dependency status. | canonical | Governance, Operations | High for certification conditions. | Current; states certified for single-repo Epic 2 planning scope. | Reference in Epic 2 readiness gates. |
| `.ai/brain/certification/FINAL_CERTIFICATION_CLEAN_RECHECK.md` | Independent final cleanup recheck. | advisory | Governance, Operations | Medium; evidence report, not policy. | Current. | Use as evidence that Epic 2 Phase 0 may proceed. |
| `.ai/brain/certification/*.md` | Certification reports, backlog, certificates, rechecks. | canonical/advisory mix | Governance | High when classified by source-of-truth map. | Current with historical reports present. | Future domain brains should cite current backlog/certificate, not older superseded status lines. |
| `.ai/brain/planning/*.md` | Sprint, hardening, certification, and planning reports. | advisory or memory depending content | Cross-domain | Medium. | Mixed; current reports are useful, older reports may be superseded. | Use as evidence only after checking current backlog/registry. |
| `.ai/brain/reviews/*.md` | Architecture, SDLC, agent, knowledge, scalability, automation, security, DX reviews. | advisory | Cross-domain | Low until accepted in registry. | Historical but retained. | Use only through registry/backlog for accepted findings. |
| `.ai/brain/knowledge/*.md` | Stable summaries for product, architecture, module catalog, testing, risks, SDLC. | canonical summaries | Product, Architecture, Development, Testing | Medium-high; source docs still win. | Current. | Domain brains should reference as summary layer and link to canonical `docs/`. |
| `.ai/brain/memory/` | Implementation history, open decisions, sprint summaries. | memory | Memory, Cross-domain | Medium; advisory operating history. | Current with CERT-05 grandfathering. | Domain brains may reference memory for history but not override source docs. |
| `.ai/brain/index/` | Generated repo map, file catalog, module map, index README. | generated plus canonical README | Cross-domain retrieval | Navigation aid only for generated files. | Current after index regeneration. | Regenerate after domain-brain changes. |
| `.ai/brain/context-packs/` | Generated context packs and impact reports. | generated | Cross-domain retrieval | Low; task-start maps only. | Mixed; freshness must be checked. | Do not use as source of truth; regenerate for new tasks if needed. |
| `.ai/brain/scripts/` | Local AI Brain helper scripts and docs. | tooling/canonical docs | Development, Testing, Operations | High for local AI Brain helper behavior. | Current; smoke checks exist. | Operations/Testing brains should reference `brain:health`, `brain:smoke`, `brain:index`, `brain:search`. |
| `.ai/brain/templates/` | Reusable templates for goals, reviews, handoff, reports. | template | Cross-domain | Scaffold only. | Current with metadata validation. | Domain brains may reuse templates but should not treat them as current state. |
| `README.md` | Product overview, setup, MVP boundaries, validation commands. | canonical project README | Product, Development | High for project overview. | Current. | Use as first product/development orientation source. |
| `docs/product/PRODUCT_DECISIONS.md` | Approved MVP product decisions. | canonical | Product | Highest product authority. | Current, approved 2026-06-24. | Product Brain should make this the top product source. |
| `docs/product/MVP_SCOPE.md` | In-scope/out-of-scope MVP boundaries and release criteria. | canonical | Product | High. | Current. | Product Brain should reference for scope guardrails. |
| `docs/product/PRD.md` | Product requirements and success metrics. | canonical | Product, Business | High. | Current. | Use for Product Brain and Business Brain metric seed. |
| `docs/product/USER_STORIES.md` | User stories and acceptance criteria. | canonical | Product, UX, Testing | High. | Current. | Link to UX and Testing Brain acceptance criteria. |
| `docs/product/PRODUCT_CHECKPOINT_3.md` | MVP readiness and controlled user testing decision. | advisory/current readiness | Product, UX, Testing | Medium-high for readiness evidence. | Current as of 2026-06-26. | Use to plan first user test; do not override `PRODUCT_DECISIONS.md`. |
| `docs/product/SPRINT_3_BACKLOG_CANDIDATES.md` | Candidate backlog after user testing. | advisory | Product, UX | Medium; explicitly not committed scope. | Current. | Product Brain should classify as intake candidates only. |
| `docs/product/MONETIZATION_PLAN.md` | MVP monetization stance and future options. | canonical/advisory business planning | Business | Medium; MVP stance is clear, future models speculative. | Current. | Business Brain should mark future monetization as needs-business-decision. |
| `project-context/PRODUCT_BRIEF.md` | Original/compact product brief. | canonical supporting source | Product, Business | High, but product decisions may supersede details. | Current enough. | Reference for origin context and metrics; reconcile through product decisions. |
| `project-context/SECURITY_PRIVACY.md` | Security/privacy constraints. | canonical | Security, Operations | High. | Current. | Operations/Security Brain should reference. |
| `project-context/TECH_STACK.md` | Stack recommendation pointer. | canonical supporting source | Architecture, Development | Medium; ADR has more detail. | Current but says status proposed. | Use ADR-0001 as stronger source; keep this as context. |
| `project-context/TEST_STRATEGY.md` | Generic test pyramid and critical paths. | canonical supporting source | Testing | Medium; broad and brief. | Current but sparse. | Testing Brain should reference, then rely on validation profiles and actual tests. |
| `docs/architecture/ARCHITECTURE.md` | Long-term architecture overview and future services. | canonical | Architecture | High for direction, but includes future components not yet implemented. | Current. | Architecture Brain must clearly separate current local MVP from future API/service direction. |
| `docs/architecture/ADR-0001-cross-platform-stack.md` | Expo React Native + TypeScript stack decision. | canonical ADR, status proposed | Architecture, Development | High for stack rationale. | Current. | Consider accepting/finalizing status in later architecture work if still true. |
| `docs/architecture/ADR-0002-data-sources.md` | Data source decision. | canonical ADR | Architecture, Data | High. | Current. | Include in Architecture/Data domain source map. |
| `docs/architecture/ADR-0003-recommendation-engine.md` | Recommendation engine decision. | canonical ADR | Architecture, Development | High. | Current. | Include in Architecture and Development brains. |
| `docs/data/SCORING_MODEL.md` | Deterministic scoring model and hidden/internal fields. | canonical | Development, Product, Testing | High. | Current. | Development Brain should link directly; Product Brain should cite hidden-field boundaries. |
| `docs/data/DATA_STRATEGY.md` | Data source priority, confidence, stale-data strategy, legal risks. | canonical | Architecture, Operations, Business | High. | Current. | Operations/Data domain should reference before any data expansion. |
| `docs/data/MENU_SEED_FORMAT.md` | Seed data structure expectations. | canonical | Development, Testing, Data | High. | Current. | Use for seed-data validation and future data brain. |
| `docs/data/DATABASE_MODEL.md` | Future data model. | canonical/advisory future architecture | Architecture, Operations | Medium; current app is local-only. | Current enough. | Mark as future architecture until backend/database scope is approved. |
| `docs/data/PRICE_VERIFICATION_PROCESS.md` | Price freshness and verification process. | canonical future process | Operations, Data | Medium-high. | Current. | Use for Operations/Data Brain; not implemented as runtime workflow yet. |
| `docs/data/SCRAPING_POLICY.md` | Scraping limitations and legal review stance. | canonical | Security, Operations, Business | High. | Current. | Keep as hard guardrail before data acquisition work. |
| `docs/testing/MANUAL_SMOKE_CHECKLIST.md` | Manual budget-to-detail smoke checklist. | canonical/testing checklist | Testing, UX | High for current MVP smoke. | Current. | Testing Brain should use as manual validation source. |
| `docs/testing/USER_TESTING_PLAN.md` | Controlled 3-5 user test plan. | canonical/advisory test plan | UX, Product | High for first controlled test. | Current. | UX Brain should use as first research artifact. |
| `docs/testing/USER_TEST_FEEDBACK_TEMPLATE.md` | Feedback capture template. | template/planning | UX, Product | Medium. | Current. | Use for controlled user tests; results still need captured artifact. |
| `docs/reviews/*.md` | Sprint/data/scoring reviews. | advisory | Product, Testing, Architecture | Medium when current. | Mixed. | Use as supporting evidence, not canonical policy. |
| `docs/roadmap/*.md` | MVP roadmap and future planning. | advisory/planning | Product, Business | Medium-low until accepted. | Mixed. | Product Brain should distinguish committed MVP from future roadmap. |
| `knowledge-base/README.md`, `knowledge-base/architecture.md`, `knowledge-base/domain-glossary.md`, `knowledge-base/decisions/index.md` | Compact knowledge-base summaries and glossary. | canonical/supporting summaries | Cross-domain | Medium; source docs win. | Current enough. | Use as onboarding aids, not as final decision source. |
| `app/` | Expo Router entrypoints and route files. | source code | Development, UX | Highest for implemented route behavior. | Current. | Development/UX brains should map routes to user flows. |
| `src/domain/recommendations/` | Current deterministic recommendation domain logic and tests. | source code/tests | Development, Product, Testing | Highest for implemented recommendation behavior. | Current. | Development Brain should point agents here before scoring changes. |
| `src/screens/` | Current screen implementation and budget validation tests. | source code/tests | UX, Development, Testing | Highest for implemented UI behavior. | Current. | UX Brain should map screens to product flows and testing checklist. |
| `src/ui/` | Shared UI primitives. | source code | Design, Development | High for implemented UI primitives. | Current. | Design Brain needs a thin source map here but also a future design-system decision. |
| `scripts/verify-local.sh`, `scripts/diff-gate.sh` | Local app/repo validation helpers. | tooling | Testing, Operations | High for validation behavior. | Current. | Testing/Operations brains should reference. |
| `.github/workflows/verify-mobile-web.yml` | CI for typecheck, tests, lint, and web build; iOS placeholder disabled. | tooling/config | Testing, Operations | High for current CI behavior. | Current. | Operations Brain should mark native CI/release as future decision. |
| `.github/` issue/PR/CODEOWNERS/dependabot files | Collaboration and maintenance workflow. | tooling/config | Operations, Maintenance | Medium-high. | Current. | Operations Brain should include as repo maintenance sources. |
| `.codex/` | Codex agents, hooks, automations templates, local rules. | adapter/tooling | AI Agent, Operations | High for Codex only; automation disabled unless activated. | Current. | Reference via Codex adapter; do not generalize to all agents. |

## 3. Domain Readiness Matrix

| Domain | Source availability | Clarity | Freshness | Agent readiness | Ready state | Missing knowledge | First artifact |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Product | 9 | 9 | 9 | 8 | Ready | Actual controlled user-test results, approved Sprint 3 scope after feedback. | `Product Brain README + source map` |
| UX | 7 | 7 | 8 | 7 | Partially ready | User-test findings, interaction-flow map, accessibility findings, native smoke observations. | `UX Brain flow map` |
| Design | 4 | 4 | 5 | 4 | Needs-review | Design principles, component usage rules, visual source of truth, screenshot baseline, accessibility/design tokens. | `Design Brain source map and open decisions` |
| Architecture | 9 | 8 | 8 | 8 | Ready | ADR status cleanup, clear current-vs-future service boundary, release architecture once production path is chosen. | `Architecture Brain decision index` |
| Development | 8 | 8 | 8 | 8 | Ready | More feature ownership conventions as codebase grows, route/component dependency map. | `Development Brain module map` |
| Testing | 8 | 8 | 8 | 8 | Ready with gaps | Automated browser E2E, recorded iOS/Android smoke, native release build path. | `Testing Brain validation map` |
| Operations | 6 | 6 | 7 | 6 | Partially ready | Release process, incident response, data operations runbooks, production ownership, activation records for any future automation. | `Operations Brain runbook index` |
| Business | 5 | 6 | 7 | 5 | Partially ready | Validated demand metrics, monetization hypothesis, pricing experiments, restaurant partnership stance. | `Business Brain assumptions and metrics map` |
| Memory | 8 | 8 | 8 | 8 | Ready | Historical memory remains grandfathered; future compaction/archive workflow is deferred. | `Memory Brain lifecycle index` |
| Cross-domain | 7 | 7 | 8 | 7 | Partially ready | Stable relationship map, domain ownership, domain-brain directory standard. | `Cross-domain relationship map` |

Scoring meaning: `0` means absent or unusable, `5` means usable but incomplete, and `10` means complete, current, clear, and easy for agents to retrieve without ambiguity.

## 4. Duplicate And Conflict Map

| Area | Duplicate or conflict | Evidence | Recommended handling |
| --- | --- | --- | --- |
| Product scope | Product boundaries appear in `README.md`, `project-context/PRODUCT_BRIEF.md`, `docs/product/PRD.md`, `docs/product/MVP_SCOPE.md`, `docs/product/PRODUCT_DECISIONS.md`, and `.ai/brain/knowledge/product-decisions.md`. | `PRODUCT_DECISIONS.md` says it is the product source of truth; source-of-truth map says product docs win over AI Brain summaries. | Product Brain should reference `PRODUCT_DECISIONS.md` first, then link summaries. Do not copy scope text into every domain. |
| MVP readiness | `PRODUCT_CHECKPOINT_3.md`, `USER_TESTING_PLAN.md`, `SPRINT_3_BACKLOG_CANDIDATES.md`, and review docs all discuss next steps. | Checkpoint says controlled user testing is ready; Sprint 3 candidates are explicitly not committed scope. | Treat checkpoint/testing plan as current readiness evidence and Sprint 3 candidates as backlog intake only. |
| Architecture current vs future | `ARCHITECTURE.md` describes future APIs/services, while current source is local Expo app with mock data. | Module catalog and source tree show no backend/API/database. | Architecture Brain must tag future services as planned architecture, not current implementation. |
| ADR status | `ADR-0001-cross-platform-stack.md` and `project-context/TECH_STACK.md` still use proposed language even though implementation uses Expo React Native. | Current `package.json`, `app/`, `src/`, and CI are Expo/TypeScript. | Later architecture cleanup should decide whether to mark ADR-0001 accepted. Not blocking Phase 0. |
| Validation guidance | Validation commands appear in `AGENTS.md`, `.ai/brain/knowledge/testing-map.md`, `.ai/brain/governance/validation-profiles.md`, `README.md`, and CI workflow files. | Validation profiles state they define detailed profile behavior; testing map is compact summary. | Testing Brain should make validation profiles the canonical command-selection source and link CI as execution evidence. |
| Review reports vs accepted policy | `.ai/brain/reviews/*.md` include many recommendations, but not all are policy. | Source-of-truth map says review reports are advisory unless accepted in registry. | Domain brains must read review-finding registry before adopting review recommendations. |
| Certification status over time | Older planning/review reports may mention conditional or hardening-needed status, while current backlog says certified. | `CERTIFICATION_BACKLOG.md` says `CERTIFIED` and no blocking conditions; final recheck says PASS/proceed. | Certification Brain/governance references should point to current backlog and certificate before older history. |
| Generated artifacts | Context packs, impact reports, and index files can look authoritative. | Artifact lifecycle policy says generated artifacts are navigation aids. | Domain brains should use generated files for discovery only and inspect canonical sources directly. |
| Artifact lifecycle path naming | Some prompts refer to `.ai/brain/governance/artifact-lifecycle.md`, but the actual canonical file is `.ai/brain/governance/artifact-lifecycle-policy.md`. | File inventory confirms only `artifact-lifecycle-policy.md` exists. | Treat the actual file as canonical; optionally add an alias note in later docs if this causes repeated confusion. |
| Testing docs path naming | Some lists may expect `docs/testing/TEST_STRATEGY.md`, but current test strategy lives in `project-context/TEST_STRATEGY.md`; detailed testing docs are under `docs/testing/`. | File inventory confirms the current paths. | Testing Brain should normalize path references and avoid broken links. |
| Business scope | Monetization plan lists future options while product decisions prohibit premium, subscriptions, and limits in MVP. | `PRODUCT_DECISIONS.md` and `MONETIZATION_PLAN.md` agree no monetization in MVP. | Business Brain should classify monetization options as future hypotheses until a business decision is approved. |

## 5. Proposed Domain Brain Architecture

The domain-brain architecture should be thin, local-first, Markdown-readable, and reference-based. It should organize knowledge without replacing the canonical source hierarchy.

Proposed future layout:

```text
.ai/brain/domains/
  README.md
  cross-domain/
    relationships.md
    open-decisions.md
  product/
    README.md
    source-map.md
    decision-index.md
    backlog-intake.md
  ux/
    README.md
    flow-map.md
    research-index.md
  design/
    README.md
    source-map.md
    open-decisions.md
  architecture/
    README.md
    decision-index.md
    current-vs-future.md
  development/
    README.md
    module-map.md
    workflow-map.md
  testing/
    README.md
    validation-map.md
    manual-smoke-map.md
  operations/
    README.md
    runbook-index.md
    release-readiness-map.md
  business/
    README.md
    assumptions.md
    metrics-map.md
  memory/
    README.md
    lifecycle-map.md
```

Recommended rules:

- Every domain `README.md` starts with authority boundaries: canonical sources, advisory sources, generated aids, and stop conditions.
- Every domain has a `source-map.md` or equivalent that links to existing docs instead of copying their content.
- Domain brains may summarize, route, and relate knowledge; they must not override `docs/`, `project-context/`, `knowledge-base/`, AI Brain governance, source code, or tests.
- New domain files should include the metadata table required by `.ai/brain/governance/source-of-truth-map.md`.
- Domain brains should use `needs-review` when the repository has a source but the source is incomplete, stale, proposed, or not yet validated by real user or release evidence.
- Generated domain indexes, if added later, should be clearly marked `generated` and regenerated through local scripts.

## 6. Cross-Domain Relationship Draft

| Relationship | Source domain | Target domain | Current evidence | Notes |
| --- | --- | --- | --- | --- |
| Product scope drives UX flows. | Product | UX | `PRODUCT_DECISIONS.md`, `MVP_SCOPE.md`, `USER_STORIES.md`, current screens. | UX changes must preserve budget-first flow and MVP exclusions. |
| Product scope drives scoring visibility. | Product | Development, Testing | `PRODUCT_DECISIONS.md`, `SCORING_MODEL.md`, hidden-field tests. | Internal scoring fields remain hidden in MVP UI. |
| UX research drives Sprint 3 backlog. | UX | Product, Development | `USER_TESTING_PLAN.md`, `SPRINT_3_BACKLOG_CANDIDATES.md`. | Candidate items need user-test evidence before promotion. |
| Architecture constrains implementation. | Architecture | Development, Operations | `ADR-0001`, `ARCHITECTURE.md`, module catalog. | Current implementation is local Expo app; future backend/data services are not implemented. |
| Data strategy constrains product trust. | Data/Architecture | Product, Business, Operations | `DATA_STRATEGY.md`, `SCRAPING_POLICY.md`, `PRICE_VERIFICATION_PROCESS.md`. | Public testing needs a clearer data reliability stance. |
| Testing gates domain changes. | Testing | All domains | `validation-profiles.md`, `testing-map.md`, `diff-gate.sh`, CI workflow. | Domain brain creation should run AI Brain governance validation. |
| Operations controls automation and release. | Operations | Development, Testing, Security | `automation-activation-validation.md`, `.github/workflows/`, `.codex/automations/README.md`. | Automation remains disabled until activation criteria pass. |
| Business hypotheses must not expand MVP scope. | Business | Product, Architecture | `MONETIZATION_PLAN.md`, `PRODUCT_DECISIONS.md`. | Paid features remain future hypotheses. |
| Memory records outcomes, not authority. | Memory | All domains | `memory-integrity-model.md`, `memory-update-checklist.md`. | Domain brains may cite memory for history but canonical sources win. |
| AI Agent support shapes how knowledge is consumed. | AI Agent | All domains | `agent-start.md`, adapters, retrieval contracts. | Domain brains should be Markdown-readable and agent-neutral. |

## 7. Epic 2 Execution Plan

| Phase | Objective | Inputs | Outputs | Validation | Done when |
| --- | --- | --- | --- | --- | --- |
| Phase 0: Knowledge discovery | Inventory current knowledge and propose domain architecture. | This report's required reading and repo inspection. | `EPIC2_KNOWLEDGE_DISCOVERY_REPORT.md`. | `npm run brain:health`, `npm run brain:index`, targeted `brain:search`, `git diff --check`. | Report exists, gaps are marked, and next prompt is selected. |
| Phase 1: Product Brain framework | Create the first domain brain around product authority, scope, and backlog intake. | Product docs, PRD, MVP scope, checkpoint 3, user stories. | Product domain `README`, source map, decision index, backlog intake rules. | AI Brain governance profile plus targeted search. | Agents can answer "what is in scope?" from one product entrypoint without duplication. |
| Phase 2: UX and Design Brain foundations | Map current user flows and identify design gaps without inventing design decisions. | Screens, user-testing plan, manual smoke checklist, Sprint 3 candidates. | UX flow map, research index, Design source map, design open decisions. | AI Brain governance profile; app checks only if app files change. | UX/testing evidence and design unknowns are discoverable. |
| Phase 3: Architecture and Development Brains | Separate current implementation architecture from future architecture. | ADRs, architecture docs, data docs, module catalog, source tree. | Architecture decision index, current-vs-future map, development module/workflow map. | AI Brain governance profile; optional `npm run brain:impact`. | Agents know where code changes belong and which future services are not implemented. |
| Phase 4: Testing and Operations Brains | Centralize validation, CI, manual smoke, release and automation gates. | Validation profiles, testing docs, scripts, GitHub workflow, security preflight. | Testing validation map, manual smoke map, operations runbook index. | `npm run brain:health`, `npm run brain:smoke`, `git diff --check`; full gate if scripts change. | Agents can choose validation and avoid enabling automation/release paths accidentally. |
| Phase 5: Business and Memory Brains | Capture business assumptions and memory lifecycle boundaries. | Monetization plan, product metrics, memory model, memory files. | Business assumptions/metrics map, memory lifecycle map. | AI Brain governance profile. | Business hypotheses and memory authority are explicit. |
| Phase 6: Cross-domain relationship integration | Connect domain dependencies and open decisions. | All domain outputs. | Cross-domain relationships and domain open-decision register. | `brain:search` queries across domains, `brain:health`, `brain:index`. | Cross-domain impacts are discoverable before implementation. |
| Phase 7: Epic 2 domain certification | Verify domain brains are usable, non-duplicative, and governed. | Domain outputs, source-of-truth map, validation evidence. | Epic 2 domain readiness report/certificate. | Full confidence gate if governance/scripts changed. | Domain brains are ready for regular Epic 2 work. |

## 8. Open Decisions

| ID | Status | Decision needed | Evidence | Owner area | Recommended timing |
| --- | --- | --- | --- | --- | --- |
| `EPIC2-KD-OD-01` | needs-product-decision | Which Sprint 3 candidate items become committed work after controlled user testing? | `PRODUCT_CHECKPOINT_3.md`, `USER_TESTING_PLAN.md`, `SPRINT_3_BACKLOG_CANDIDATES.md`. | Product | After first 3-5 user tests. |
| `EPIC2-KD-OD-02` | needs-UX-decision | Whether local persistence, empty-state improvements, or reason-chip copy should be prioritized before broader testing. | `SPRINT_3_BACKLOG_CANDIDATES.md`, current screens, user-testing plan. | UX | After user-test summary. |
| `EPIC2-KD-OD-03` | needs-design-decision | What is the design source of truth for visual style, component usage, accessibility expectations, and screenshot baselines? | `src/ui/`, `src/screens/`, manual smoke checklist; no dedicated design-system doc found. | Design | Before broad UI polish. |
| `EPIC2-KD-OD-04` | needs-architecture-decision | Should ADR-0001 and stack status be marked accepted now that Expo React Native is implemented? | `ADR-0001`, `project-context/TECH_STACK.md`, `package.json`, current app tree. | Architecture | During Architecture Brain framework. |
| `EPIC2-KD-OD-05` | needs-architecture-decision | What exact domain-brain directory standard and metadata policy should be used before creating `.ai/brain/domains/`? | Source-of-truth map, this report. | Architecture/AI Brain governance | First domain-brain implementation prompt. |
| `EPIC2-KD-OD-06` | needs-business-decision | Which business metrics should be captured manually during controlled testing, and which monetization hypotheses remain out of scope? | `PRD.md`, `MONETIZATION_PLAN.md`, `PRODUCT_CHECKPOINT_3.md`. | Business | Before public testing or analytics work. |
| `EPIC2-KD-OD-07` | needs-release-decision | What is the native release validation path for iOS and Android before mobile user testing or public testing? | `MVP_SCOPE.md`, manual smoke checklist, CI workflow iOS placeholder. | Release/Operations | Before mobile controlled testing or public release. |
| `EPIC2-KD-OD-08` | needs-architecture-decision | Whether a dedicated Data Brain should exist separately from Architecture/Operations, given data strategy importance. | `DATA_STRATEGY.md`, `SCORING_MODEL.md`, `PRICE_VERIFICATION_PROCESS.md`, `SCRAPING_POLICY.md`. | Architecture/Data | Before data acquisition or backend work. |

## 9. Recommended Next Prompt

Recommended next prompt:

```md
[MAKDOLAN::EPIC2::PRODUCT-BRAIN::FRAMEWORK]

Act as a Principal Product Architect and AI Knowledge Architect.

Goal:
Create the Product Brain framework for Epic 2 without duplicating canonical product docs.

Required reading:
- AGENTS.md
- .ai/brain/agent-start.md
- .ai/brain/governance/source-of-truth-map.md
- .ai/brain/planning/EPIC2_KNOWLEDGE_DISCOVERY_REPORT.md
- docs/product/PRODUCT_DECISIONS.md
- docs/product/MVP_SCOPE.md
- docs/product/PRD.md
- docs/product/USER_STORIES.md
- docs/product/PRODUCT_CHECKPOINT_3.md
- docs/product/SPRINT_3_BACKLOG_CANDIDATES.md
- project-context/PRODUCT_BRIEF.md

Create a thin, reference-first Product Brain entrypoint that defines:
- product authority hierarchy
- MVP scope guardrails
- current user/problem model
- accepted and forbidden product directions
- backlog intake rules
- product open decisions
- relationship points to UX, Design, Architecture, Development, Testing, Operations, Business, and Memory

Constraints:
- Do not rewrite canonical product docs.
- Do not implement app behavior.
- Do not create other domain brains yet.
- Mark uncertain or post-testing items as needs-review.
- Use metadata required by AI Brain governance.

Validation:
- npm run brain:health
- npm run brain:index
- npm run brain:search -- "product decision"
- git diff --check
```

Why Product Brain first: Product has the strongest canonical source set and is the dependency root for UX, Design, Development, Testing, Business, and release decisions. Starting elsewhere would risk optimizing domain structure before stabilizing the scope guardrails that every other domain must obey.

## 10. Validation Evidence

Validation run on 2026-06-27:

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run brain:health` | PASS | 0 errors, 0 warnings; metadata, template metadata, registry, memory integrity, generated artifact freshness, local references, and generated-text secret scan passed. |
| `npm run brain:index` | PASS | Indexed 239 files across 70 directories and refreshed `.ai/brain/index/repo-map.json`, `.ai/brain/index/file-catalog.md`, and `.ai/brain/index/module-map.md`. |
| `npm run brain:search -- "product decision"` | PASS | Returned `.ai/brain/knowledge/product-decisions.md`, `docs/product/PRODUCT_DECISIONS.md`, and related product sources. |
| `npm run brain:search -- "UX"` | PASS | Returned UX-related review, product checkpoint, registry, and this discovery report. |
| `npm run brain:search -- "design"` | PASS | Returned design-related review findings and this discovery report, confirming Design remains a lower-maturity knowledge area. |
| `npm run brain:search -- "architecture"` | PASS | Returned `.ai/brain/knowledge/architecture-principles.md`, architecture review, `knowledge-base/architecture.md`, and `docs/architecture/ARCHITECTURE.md`. |
| `npm run brain:search -- "testing"` | PASS | Returned `docs/testing/USER_TESTING_PLAN.md`, `.ai/brain/knowledge/testing-map.md`, `PRODUCT_CHECKPOINT_3.md`, and manual smoke checklist. |
| `git diff --check` | PASS | No whitespace errors. |

Skipped app-specific validation because this is a docs-only planning discovery report: no app source, tests, package scripts, app config, routes, build config, dependencies, automation, release, credential, auth, payment, or database behavior changed.
