# AI Brain Certification Backlog

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-certification-backlog` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Tracks open certification conditions and follow-up backlog items; review finding registry remains the source for accepted Epic 1.5 MGA findings. |
| domain | AI Brain certification |
| created | 2026-06-26 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-26 |

Backlog ID: `MAKDOLAN::AI-BRAIN::EPIC1::CERTIFICATION-BACKLOG`

Date: 2026-06-27

Purpose: Track the conditions and follow-up work required by the Epic 1 AI Brain certification.

Current certification status: **CERTIFIED** for the current single-repo Epic 2 planning scope.

Current blocking certification conditions: **none**.

Deferred future-trigger items remain tracked below, but they are not current certification blockers.

## Priority Summary

| Priority | Items |
| --- | --- |
| Critical | None open. `CERT-01` implemented on 2026-06-27. |
| High | None open. `CERT-02`, `CERT-03`, `CERT-04`, and `CERT-08` implemented on 2026-06-27. |
| Medium | None open. `CERT-05` implemented with grandfathered historical memory; `CERT-06` implemented on 2026-06-27; `CERT-07` deferred until a second repository exists or is planned. |
| Low | `CERT-09` and `CERT-10` deferred to normal Epic 2 improvement work. |

## Dependency Status Model

Use these statuses for certification dependency cleanup:

| Status | Meaning |
| --- | --- |
| `Implemented` | Definition of done is complete and validation evidence exists. |
| `Partially implemented` | Material risk was reduced, but at least one definition-of-done item remains. |
| `Accepted non-blocking condition` | Risk is real and tracked, but does not block Epic 2 while its trigger is absent. |
| `Deferred` | Work is intentionally postponed until an explicit future trigger. |
| `Open` | Work is required and neither implemented nor accepted/deferred. |

## Certification Dependency Index

| ID | Severity | Status | Owner/Area | Source Report | Dependencies | Resolution / Evidence | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CERT-01` | Critical | Implemented | AI Brain validation | `EPIC1_CERTIFICATION_REPORT.md` | None | Runtime/as-of health freshness implemented and validated in `.ai/brain/planning/CERT_01_HEALTH_CHECK_FRESHNESS_FIX_REPORT.md`. | No action unless freshness policy changes. |
| `CERT-02` | High | Implemented | AI Brain platform | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-08` | `MGA-01`, `MGA-06` | Agent-neutral core/adapters implemented and validated in `.ai/brain/planning/CERT_02_AGENT_NEUTRAL_CORE_ADAPTERS_REPORT.md`. | Add dedicated non-Codex adapters only when generic guidance proves insufficient. |
| `CERT-03` | High | Implemented | Validation | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-10` | `MGA-01`, `MGA-05` | Validation profiles implemented and validated in `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`. | Keep profiles current when commands or release path changes. |
| `CERT-04` | High | Implemented | AI Brain tooling | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-11` | `MGA-05`, `MGA-06` | `npm run brain:smoke` implemented and validated in `.ai/brain/planning/CERT_04_AI_BRAIN_SCRIPT_SMOKE_CHECKS_REPORT.md`. | Add smoke coverage when new helper scripts are added. |
| `CERT-05` | Medium | Implemented with grandfathered historical memory | AI Brain memory | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-07` | `MGA-07` | Memory helper enforcement, new-memory health validation, open-decision status validation, and historical grandfathering implemented in `.ai/brain/planning/CERT_05_MEMORY_ENFORCEMENT_REPORT.md`. | Backfill older entries only when materially edited, superseded, or promoted into canonical docs. |
| `CERT-06` | Medium | Implemented | AI Brain retrieval/validation | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-05`, `MGA-06` | `MGA-01`, `MGA-05` | Template metadata is backfilled, direct health/search scope includes certification artifacts, and `brain:health` validates active local references. Evidence is recorded in `.ai/brain/planning/CERT_06_TEMPLATE_METADATA_REFERENCE_VALIDATION_REPORT.md`. | No action unless template/reference policy changes. |
| `CERT-07` | Medium | Deferred | AI Brain scale | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-15` | `MGA-01`, `MGA-06`, future multi-repo need | Single-repo architecture remains valid for current Makdolan repo; registry already defers `MGA-15`. | Implement before creating or onboarding a second repository. |
| `CERT-08` | High | Implemented | Automation governance | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-12` | `MGA-04`, `MGA-05`, `MGA-12` | Report-only activation validation implemented in `.ai/brain/governance/automation-activation-validation.md`, `.ai/brain/scripts/validate-automation-activation.mjs`, and `.ai/brain/planning/CERT_08_AUTOMATION_ACTIVATION_VALIDATION_REPORT.md`. | Run `npm run brain:automation:check` against an activation record before enabling any automation. |
| `CERT-09` | Low | Deferred | Architecture governance | `EPIC1_CERTIFICATION_REPORT.md` | Current certification report | ADR is useful but not required for current Epic 2 planning operation. | Add ADR during normal Epic 2 architecture documentation work. |
| `CERT-10` | Low | Deferred | Developer experience | `EPIC1_CERTIFICATION_REPORT.md`, `MGA-16` | `MGA-09` | First-hour onboarding and command guidance exist; visual aids remain optional improvement. | Add compact architecture diagram and troubleshooting guide when onboarding friction appears. |

## Backlog

### CERT-01: Fix Health-Check Freshness Date Handling

Priority: Critical

Status: Implemented on 2026-06-27

Problem: `.ai/brain/scripts/health-check.mjs` previously set `TODAY` to `2026-06-26T00:00:00.000Z`.

Why it matters: Generated artifact freshness must age naturally. A fixed date can let stale context packs and planning artifacts continue passing health checks after the certification date.

Impact: High. This affects trust in `npm run brain:health`.

Implementation effort: Low.

Dependencies: None.

Recommended sprint: Epic 2 Hardening Sprint 2, first task.

Definition of done:

- Health check uses runtime date or an explicit `--as-of` option.
- Existing Sprint 1 behavior remains reproducible when `--as-of=2026-06-26` is used.
- `npm run brain:health` passes.
- `git diff --check` passes.

Resolution evidence:

- `.ai/brain/scripts/health-check.mjs` now defaults freshness checks to the current local runtime date.
- `npm run brain:health -- --as-of=2026-06-26`: PASS.
- `npm run brain:health -- --as-of=2026-07-27`: PASS WITH WARNINGS, correctly reporting expired 2026-06-26 context packs.
- `node .ai/brain/scripts/health-check.mjs --as-of=invalid-date`: expected failure with a clear validation message.

### CERT-02: Complete Agent-Neutral Core And Adapters

Priority: High

Status: Implemented on 2026-06-27

Problem: AI Brain is portable at the content level but still operationally Codex-first.

Why it matters: Epic 2 may use Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, and future agents. They need the same core contract without inheriting Codex-specific assumptions.

Impact: High. Reduces handoff failure and prompt coupling.

Implementation effort: Medium.

Dependencies: `MGA-01`, `MGA-06`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Agent-neutral startup contract exists.
- Agent-neutral handoff packet exists.
- Codex-specific setup is explicitly classified as an adapter.
- Adapter guidance exists for at least Codex plus generic Markdown-reading agents.
- No remote services, MCP server, embeddings, or vector database are introduced.

Resolution evidence:

- `.ai/brain/agent-start.md` now defines the agent-neutral startup contract, source hierarchy, startup checklist, safety rules, validation expectations, memory expectations, generated artifact handling, and handoff requirements.
- `.ai/brain/adapters/README.md`, `.ai/brain/adapters/codex.md`, and `.ai/brain/adapters/generic-agent.md` classify Codex and generic Markdown-reading agents as adapters over the neutral core.
- `.ai/brain/templates/agent-handoff-packet-template.md` defines the agent-neutral handoff packet.
- `AGENTS.md`, `.ai/brain/README.md`, `.ai/brain/knowledge/agent-session-start.md`, `.ai/brain/index/README.md`, and `.ai/brain/governance/source-of-truth-map.md` now point to the neutral core and adapter model.
- Reusable context/impact generator wording now uses agent-neutral language; smoke outputs confirmed new context packs and impact reports no longer emit Codex-only startup text.
- Completion evidence is recorded in `.ai/brain/planning/CERT_02_AGENT_NEUTRAL_CORE_ADAPTERS_REPORT.md`.

### CERT-03: Add Change-Scope Validation Profiles

Priority: High

Status: Implemented on 2026-06-27

Problem: AI Brain has strong full validation through `bash scripts/diff-gate.sh`, but scoped validation profiles are not formalized.

Why it matters: At Epic 2 scale, one validation model for every task will either be too slow or too weak.

Impact: High. Improves reliability and developer throughput.

Implementation effort: Medium.

Dependencies: `MGA-05`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Validation profiles exist for docs-only, AI Brain governance, domain logic, UI/screens, navigation, scripts/tooling, security/privacy, release-sensitive work, and full confidence gate.
- Each profile includes commands, when to use, when to escalate, and skipped-check wording.
- `AGENTS.md` and `.ai/brain/knowledge/testing-map.md` reference the profiles.

Resolution evidence:

- `.ai/brain/governance/validation-profiles.md` now defines the nine required validation profiles, including commands, usage triggers, escalation triggers, skipped-check wording, and evidence expectations.
- `AGENTS.md` now instructs agents to choose the applicable validation profile and escalate when the profile requires it.
- `.ai/brain/knowledge/testing-map.md` now points to the canonical profile document and keeps only a compact summary table.
- `.ai/brain/governance/developer-onboarding.md`, `.ai/brain/governance/source-of-truth-map.md`, `.ai/brain/README.md`, and `.ai/brain/index/README.md` now make validation profiles discoverable.
- Completion evidence is recorded in `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`.

### CERT-04: Add AI Brain Script Tests And Smoke Checks

Priority: High

Status: Implemented on 2026-06-27

Problem: AI Brain helper scripts are now platform code but do not have dedicated tests.

Why it matters: Script regressions can corrupt indexes, omit relevant files, create misleading impact reports, or weaken health checks while app tests still pass.

Impact: High.

Implementation effort: Medium.

Dependencies: `MGA-05`, `MGA-06`.

Recommended sprint: Epic 2 Hardening Sprint 2.

Definition of done:

- Add focused tests or smoke checks for `brain:index`, `brain:search`, `brain:impact`, `brain:context`, `brain:health`, and `brain:memory:update`.
- Cover argument parsing, output paths, generated output shape, exclusion rules, duplicate refusal, and expected failures.
- Include at least one search-quality smoke query.
- Add command documentation and validation evidence.

Resolution evidence:

- `npm run brain:smoke` now runs `.ai/brain/scripts/smoke-check.mjs` against isolated temporary fixture repositories.
- Smoke coverage includes `create-context-pack.mjs`, `create-repo-index.mjs`, `search-brain.mjs`, `analyze-impact.mjs`, `health-check.mjs`, and `update-memory.mjs`.
- Smoke assertions cover argument parsing, output paths, generated output shape, exclusion behavior, duplicate refusal, expected failures, secret scan failure without printing the secret value, and a search-quality query.
- `.ai/brain/scripts/README.md` documents the `brain:smoke` command, isolation model, coverage, behavior, and failure behavior.
- Completion evidence is recorded in `.ai/brain/planning/CERT_04_AI_BRAIN_SCRIPT_SMOKE_CHECKS_REPORT.md`.

### CERT-05: Strengthen Memory Enforcement

Priority: Medium

Status: Implemented with grandfathered historical memory on 2026-06-27

Problem: The memory integrity model exists, but historical entries and helper-generated entries do not consistently include status, provenance, review, follow-ups, and supersession fields.

Why it matters: Memory influences future sessions and can become operational misinformation when stale.

Impact: Medium.

Implementation effort: Medium.

Dependencies: `MGA-07`.

Recommended sprint: Epic 2 Hardening Sprint 2 or 3.

Definition of done:

- Memory helper supports status and source evidence fields.
- New implementation history entries include status/provenance consistently.
- Open decisions use clear status values.
- Health check or a memory-specific check reports malformed new memory entries.
- Historical entries are either backfilled or explicitly grandfathered.

Resolution evidence:

- `.ai/brain/scripts/update-memory.mjs` now generates memory ID, lifecycle status, created, last reviewed, review after, source evidence, validation evidence, review evidence, supersedes, and superseded-by fields where applicable.
- Implementation and decision helper entries now require `--source-evidence`; invalid memory IDs, statuses, and date fields fail fast.
- `.ai/brain/scripts/health-check.mjs` now validates implementation-history entries from the `CERT-05 memory enforcement hardening` boundary forward and validates open-decision lifecycle status values.
- Historical implementation-history entries before `2026-06-27: CERT-05 memory enforcement hardening` are explicitly grandfathered instead of aggressively rewritten.
- `.ai/brain/governance/memory-integrity-model.md`, `.ai/brain/memory/memory-update-checklist.md`, `.ai/brain/scripts/README.md`, AGENTS.md, and memory templates document the safe update model.
- Completion evidence is recorded in `.ai/brain/planning/CERT_05_MEMORY_ENFORCEMENT_REPORT.md`.

### CERT-06: Backfill Template Metadata And Add Docs/Certification Reference Validation

Priority: Medium

Status: Implemented on 2026-06-27

Problem: Template metadata expectations exist, but templates are not fully backfilled. Local path/link validation is also not implemented. The new `.ai/brain/certification/` directory is indexed, but current direct `brain:health` and `brain:search` scan scopes do not include certification docs.

Why it matters: Templates shape future work, and certification artifacts are part of Epic readiness evidence. Broken paths, stale templates, or unscanned certification docs create recurring workflow errors.

Impact: Medium.

Implementation effort: Low to Medium.

Dependencies: `MGA-01`, `MGA-05`.

Recommended sprint: Epic 2 Hardening Sprint 2 or 3.

Definition of done:

- `.ai/brain/templates/*.md` have template metadata or an accepted grandfathering rule.
- Local path/reference validation is documented or implemented.
- `.ai/brain/certification/` is included in direct AI Brain validation/search scope or explicitly documented as index-only.
- `npm run brain:health` or a related local check reports missing required template/certification metadata when policy requires it.

Resolution evidence:

- Direct `brain:search` text scope now includes `.ai/brain/agent-start.md`, `.ai/brain/adapters/`, `.ai/brain/certification/`, `.ai/brain/governance/`, `.ai/brain/planning/`, and `.ai/brain/reviews/`.
- `brain:health` metadata scope now includes agent startup, adapter, certification, and validation profile docs.
- `brain:health` generated-text secret scanning now includes adapter and certification docs and skips missing optional standalone scan files safely.
- All active `.ai/brain/templates/*.md` files now include metadata with `class` set to `template` and `status` set to `active`.
- `brain:health` now validates template metadata for active templates and fails when template metadata is missing or misclassified.
- `brain:health` now validates conservative local references in active operating docs, including known repo-root prefixes and relative Markdown links.
- Local reference validation intentionally skips historical planning reports, advisory review reports, generated indexes, and context packs to avoid false positives from preserved historical findings.
- Completion evidence is recorded in `.ai/brain/planning/CERT_06_TEMPLATE_METADATA_REFERENCE_VALIDATION_REPORT.md`.

### CERT-07: Define Multi-Repo And Repo-Profile Trigger Criteria

Priority: Medium

Status: Deferred until a second repository exists or is planned

Problem: AI Brain currently assumes a single repository.

Why it matters: The certification scale assumption includes 500k LOC and multiple repositories. Without repo identity, ownership, and retrieval boundaries, AI Brain knowledge can fragment.

Impact: Medium now, high when a second repository exists.

Implementation effort: Medium.

Dependencies: `MGA-01`, `MGA-06`, future multi-repo need.

Recommended sprint: Before creating or onboarding a second repository.

Definition of done:

- Define when a repo profile is required.
- Define minimum repo profile fields: repo id, owner, purpose, canonical docs, validation commands, AI Brain location, and cross-repo dependencies.
- Define how local indexes remain separate or are summarized.
- Do not add remote federation until there is measured need.

Current resolution state:

- Deferred by trigger.
- Current Makdolan work remains single-repository, so this does not block Epic 2 planning.
- Must be resolved before creating or onboarding a second repository.

### CERT-08: Keep Automation Report-Only Until Activation Validation Exists

Priority: High

Status: Implemented on 2026-06-27

Problem: Automation policy and activation checklist exist, but activation validation is not implemented.

Why it matters: Unsafe automation can modify source, dependencies, release settings, credentials, product decisions, or architecture decisions without enough control.

Impact: High.

Implementation effort: Medium.

Dependencies: `MGA-04`, `MGA-05`, `MGA-12`.

Recommended sprint: Before enabling any new automation.

Definition of done:

- Automation activation checklist can be validated manually or by a local report-only script.
- First-run review is required and documented.
- Output paths are approved.
- Write scope is report-only unless explicit approval exists.
- Disable/rollback path is documented.

Resolution evidence:

- `.ai/brain/governance/automation-activation-validation.md` defines the report-only validation gate required before automation activation.
- `.ai/brain/templates/automation-activation-record-template.md` provides the activation record format.
- `npm run brain:automation:check` validates activation records with `.ai/brain/scripts/validate-automation-activation.mjs`.
- The validator requires owner, purpose, trigger, cadence, sandbox, network, secrets, output path, write scope, validation, stop conditions, rollback/disable path, first-run review, data exposure, and approval record fields.
- The validator blocks missing fields, placeholders, `danger-full-access`, required secrets, unsafe output paths, missing rollback/review/safety stops, local data exposure violations, and forbidden capabilities such as deployment, production API calls, database migration, credential rotation, auto-merge, destructive deletion, and dependency mutation.
- `npm run brain:smoke` covers safe and unsafe activation record scenarios.
- No automation was enabled.
- Completion evidence is recorded in `.ai/brain/planning/CERT_08_AUTOMATION_ACTIVATION_VALIDATION_REPORT.md`.

### CERT-09: Add AI Brain Architecture ADR

Priority: Low

Status: Deferred to normal Epic 2 architecture documentation work

Problem: AI Brain has strong governance docs but no compact architecture decision record explaining why the local Markdown/script architecture was chosen.

Why it matters: Future maintainers need to know what is stable, what is non-goal, and when heavier infrastructure would be justified.

Impact: Low to Medium.

Implementation effort: Low.

Dependencies: Current certification report.

Recommended sprint: Epic 2 Sprint 2 or 3.

Definition of done:

- ADR documents purpose, non-goals, boundaries, local-first decision, generated artifact policy, validation model, and evolution triggers.

Current resolution state:

- Deferred.
- Current certification, source-of-truth, lifecycle, retrieval, and validation docs provide enough operating evidence for Epic 2 planning.

### CERT-10: Add Visual Architecture And Troubleshooting Aids

Priority: Low

Status: Deferred to normal Epic 2 developer experience work

Problem: AI Brain has good text maps but limited visual architecture and troubleshooting support.

Why it matters: Visual aids reduce onboarding time and prevent repeated setup questions.

Impact: Low.

Implementation effort: Low.

Dependencies: `MGA-09`.

Recommended sprint: Epic 2 Sprint 2 or 3.

Definition of done:

- Add a compact AI Brain architecture diagram.
- Add troubleshooting notes for Node, Expo web, generated `dist/`, `.env.local` hygiene, missing simulator paths, and health-check failures.

Current resolution state:

- Deferred.
- First-hour onboarding, command cheat sheet, workflow modes, and script docs already cover current operational needs.

## Non-Goals

Do not treat this backlog as approval to:

- Add remote services.
- Add vector databases.
- Add embeddings.
- Add an MCP server.
- Enable automation.
- Change app behavior.
- Change product scope.
- Perform release, deployment, credential, payment, auth, or database operations.

## Review Cadence

Review this backlog:

- Before starting Epic 2 Hardening Sprint 2.
- Before enabling automation.
- Before a second repository is introduced.
- Before using AI Brain as a multi-agent handoff system.
- Before promoting any AI Brain helper script output to a stable machine contract.
