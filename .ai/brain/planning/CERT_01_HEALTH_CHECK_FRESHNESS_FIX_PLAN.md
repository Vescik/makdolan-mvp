# CERT-01 Health Check Freshness Fix Plan

Metadata:

| Field | Value |
| --- | --- |
| id | `cert-01-health-check-freshness-fix-plan` |
| class | `advisory` |
| owner | AI Brain maintainers |
| status | `draft` |
| authority | Plans the CERT-01 fix; does not implement or supersede certification backlog conditions. |
| domain | AI Brain validation |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-04 |

Planning ID: `MAKDOLAN::AI-BRAIN::CERT-01::PLAN`

Date: 2026-06-27

Scope: Planning only. No implementation changes are made by this document.

## Objective

Plan how to resolve the first condition from the conditional Epic 1 certification: `CERT-01: Fix Health-Check Freshness Date Handling`.

The goal of the eventual implementation is to make `npm run brain:health` evaluate generated artifact freshness against the real current date by default, while preserving reproducible Sprint 1 behavior through an explicit `--as-of=2026-06-26` option.

## Source Evidence

| Source | Evidence |
| --- | --- |
| `.ai/brain/certification/CERTIFICATION_BACKLOG.md` | `CERT-01` is Critical, Open, first Sprint 2 task, and requires runtime date or explicit `--as-of`. |
| `.ai/brain/certification/EPIC1_CERTIFICATION_REPORT.md` | Certification is conditional because `brain:health` freshness uses a hard-coded date. |
| `.ai/brain/certification/EPIC2_READINESS_CERTIFICATE.md` | Required condition 1 says to fix date handling before relying on freshness results after 2026-06-26. |
| `.ai/brain/scripts/health-check.mjs` | Current implementation sets `const TODAY = new Date("2026-06-26T00:00:00.000Z");`. |
| `.ai/brain/governance/health-checks.md` | Health check must detect stale/expired context packs and generated artifact freshness signals. |

## Certification Gap List

| Priority | ID | Gap | Why it matters | Resolution track |
| --- | --- | --- | --- | --- |
| Critical | `CERT-01` | `brain:health` freshness date is hard-coded to 2026-06-26. | Freshness checks stop aging after certification date, creating false confidence. | Fix first. Add runtime date and reproducible `--as-of` option. |
| High | `CERT-02` | Agent-neutral core/adapters are not complete. | Multi-agent handoff can inherit Codex-specific assumptions. | Sprint 2 agent-platform hardening. |
| High | `CERT-03` | Scoped validation profiles are not formalized. | Full diff gate is too broad for every change and too coarse for some risks. | Sprint 2 validation hardening. |
| High | `CERT-04` | AI Brain scripts lack dedicated tests and smoke checks. | Script regressions can mislead future planning while app tests pass. | Sprint 2 tooling quality hardening. |
| High | `CERT-08` | Automation must remain report-only until activation validation exists. | Unsafe automation could mutate source, credentials, dependencies, release settings, or decisions. | Before enabling automation. |
| Medium | `CERT-05` | Memory model is defined but not fully enforced or backfilled. | Memory can drift into stale operational guidance. | Sprint 2 or 3 memory hardening. |
| Medium | `CERT-06` | Template metadata, certification search/health scope, and docs reference validation remain incomplete. | Workflow artifacts and certification evidence can become stale or hard to find. | Sprint 2 or 3 knowledge validation. |
| Medium | `CERT-07` | Multi-repo/repo-profile triggers are undefined. | Future multi-repo work can fragment authority and retrieval. | Before adding a second repo. |
| Low | `CERT-09` | AI Brain architecture ADR is missing. | Future maintainers need concise rationale and evolution triggers. | Epic 2 Sprint 2 or 3. |
| Low | `CERT-10` | Visual architecture and troubleshooting aids are missing. | Onboarding and debugging remain more text-heavy than necessary. | Epic 2 Sprint 2 or 3. |

## Selected First Area

First area: `CERT-01`.

Decision: Fix `CERT-01` before other certification backlog work because it directly affects whether `npm run brain:health` can be trusted after 2026-06-26.

## Detailed Fix Phases

| Phase | Name | Purpose | Deliverables | Commit boundary |
| --- | --- | --- | --- | --- |
| Phase 0 | AI Brain discovery and impact | Confirm source evidence, current defect, affected files, and validation scope. | `brain:impact` report, reviewed plan, affected-file list. | No commit; discovery only. |
| Phase 1 | Health-check runtime date support | Replace the hard-coded date with runtime date handling and explicit `--as-of=YYYY-MM-DD`. | Updated `.ai/brain/scripts/health-check.mjs`, syntax check, as-of smoke checks. | Commit with Phase 2 because docs/backlog must describe the new behavior. |
| Phase 2 | Governance docs and certification backlog | Document default runtime-date behavior, document as-of replay mode, and mark `CERT-01` implemented with evidence. | Updated health-check docs, script README, certification backlog. | Commit with Phase 1 as the main fix phase. |
| Phase 3 | Memory, index, and validation closeout | Refresh generated AI Brain index, update memory, and run the full validation gate. | Updated memory/index artifacts and validation evidence. | Commit after validation passes. |

This plan intentionally does not bundle `CERT-02`, `CERT-03`, `CERT-04`, or automation validation work into the same phase group.

## Current Problem

`.ai/brain/scripts/health-check.mjs` calculates context-pack freshness using:

```js
const TODAY = new Date("2026-06-26T00:00:00.000Z");
```

`checkFreshness()` then computes context-pack age with `daysBetween(TODAY, date)`.

On 2026-06-27, a context pack created on 2026-06-26 should be one day old. The current implementation still treats it as zero days old because the comparison date is frozen.

## Gaps Inside CERT-01

| Priority | Gap | Impact | Recommended fix |
| --- | --- | --- | --- |
| Critical | Default freshness date is fixed. | Stale/expired generated artifacts may not be reported after 2026-06-26. | Replace fixed `TODAY` with runtime current date normalized to start of day. |
| High | No reproducible as-of mode. | Sprint 1 behavior cannot be intentionally reproduced after switching to runtime date. | Add `--as-of=YYYY-MM-DD` option and validate date format. |
| High | No targeted tests or smoke checks for freshness aging. | Future date regressions can reappear silently. | Add script-level test or smoke command that exercises `--as-of` against known dated context packs. |
| Medium | Health-check docs do not mention `--as-of`. | Maintainers will not know how to reproduce historical freshness runs. | Update `.ai/brain/governance/health-checks.md` and `.ai/brain/scripts/README.md`. |
| Medium | Certification backlog will remain Open unless updated after implementation. | Completed certification condition will still look unresolved. | Mark `CERT-01` resolved/implemented after validation, with evidence. |
| Medium | Generated index may not include updated docs after the fix. | Search/navigation can lag behind governance updates. | Run `npm run brain:index` after implementation. |

## Proposed Implementation Plan

### Step 1: Add Argument Parsing To Health Check

Affected file:

- `.ai/brain/scripts/health-check.mjs`

Implementation:

- Add a small `parseArgs(process.argv.slice(2))` function.
- Support only:
  - no arguments
  - `--as-of=YYYY-MM-DD`
  - optional `--help`
- Reject unknown options with a non-zero exit and concise usage text.
- Reject invalid dates with a non-zero exit.

Why:

- Keeps the script deterministic and local.
- Gives maintainers a stable way to reproduce historical checks.

### Step 2: Replace Fixed `TODAY`

Affected file:

- `.ai/brain/scripts/health-check.mjs`

Implementation:

- Remove `const TODAY = new Date("2026-06-26T00:00:00.000Z");`.
- Add `startOfUtcDay(date)` helper.
- Default to `startOfUtcDay(new Date())`.
- When `--as-of=YYYY-MM-DD` is passed, parse it as a local calendar date and validate that it is real.
- Pass the resolved `asOfDate` into `checkFreshness(asOfDate)` instead of using a module-level constant.
- Print the active as-of date near the top of the health-check output.

Why:

- Fixes false confidence while keeping output explainable.

### Step 3: Keep Existing Freshness Thresholds

Affected file:

- `.ai/brain/scripts/health-check.mjs`

Implementation:

- Do not change 14-day stale or 30-day expired thresholds.
- Do not change what counts as an error or warning.
- Do not change metadata, registry, or secret scan behavior.

Why:

- Keeps the fix narrow and reduces risk.

### Step 4: Add Targeted Freshness Validation

Affected files:

- Prefer a lightweight script test if the project already has a clear test location for scripts.
- If not adding formal tests in the first slice, document and run smoke checks.

Minimum smoke checks:

```bash
npm run brain:health -- --as-of=2026-06-26
npm run brain:health -- --as-of=2026-07-27
node .ai/brain/scripts/health-check.mjs --as-of=invalid-date
```

Expected results:

- `--as-of=2026-06-26`: reproduces Sprint 1 behavior.
- `--as-of=2026-07-27`: reports old context packs as stale or expired according to policy.
- invalid date: exits non-zero with a clear error.

Why:

- Proves the defect is fixed rather than only refactored.

### Step 5: Update Documentation

Affected files:

- `.ai/brain/governance/health-checks.md`
- `.ai/brain/scripts/README.md`
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`

Implementation:

- Document `npm run brain:health -- --as-of=YYYY-MM-DD`.
- Explain default runtime-date behavior.
- Mark `CERT-01` implemented only after validation passes.
- Add evidence in the backlog row or resolution text.

Why:

- Prevents the fix from becoming hidden script behavior.

### Step 6: Update Memory And Index

Affected files:

- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`

Implementation:

- Add memory entry after implementation and validation.
- Run `npm run brain:index` after docs/scripts/memory changes.

Why:

- Keeps AI Brain discovery current.

## Acceptance Criteria

The `CERT-01` fix is complete when:

- `health-check.mjs` no longer has a fixed certification-date `TODAY` constant.
- `npm run brain:health` uses the actual current date by default.
- `npm run brain:health -- --as-of=2026-06-26` reproduces Sprint 1 freshness behavior.
- Invalid `--as-of` values fail clearly and non-destructively.
- A future as-of date can trigger stale/expired warnings for older context packs.
- Health-check documentation includes default and as-of behavior.
- Certification backlog marks `CERT-01` complete with validation evidence.
- AI Brain index and memory are updated after implementation.

## Validation Plan

Required commands:

```bash
node --check .ai/brain/scripts/health-check.mjs
npm run brain:health
npm run brain:health -- --as-of=2026-06-26
npm run brain:health -- --as-of=2026-07-27
node .ai/brain/scripts/health-check.mjs --as-of=invalid-date
npm run brain:index
git diff --check
bash scripts/diff-gate.sh
```

Expected command handling:

- The invalid-date command must fail. Record it as expected failure if it exits non-zero with the intended validation message.
- `npm run brain:health -- --as-of=2026-07-27` may produce warnings. That is acceptable if warnings correspond to stale/expired generated artifacts and the script result semantics remain documented.

## Platform Matrix

| Platform | Impact | Validation |
| --- | --- | --- |
| iOS | No app behavior impact. | Covered by no source behavior change plus full diff gate. |
| Android | No app behavior impact. | Covered by no source behavior change plus full diff gate. |
| Web | No app behavior impact. | `npm run build:web` through `bash scripts/diff-gate.sh`. |
| AI Brain local tooling | Direct impact. | `node --check`, `npm run brain:health`, as-of smoke checks, `npm run brain:index`. |

## Security And Privacy Notes

- Do not read `.env.local`.
- Do not print secret values.
- Keep secret scanning behavior unchanged except for output date context if needed.
- Do not add dependencies, network access, remote services, vector databases, embeddings, MCP servers, or automation.
- Do not change app behavior.

## Rollback Strategy

If the implementation fails:

- Revert only the health-check/date-handling edits made for `CERT-01`.
- Leave certification backlog status as Open.
- Preserve unrelated AI Brain hardening and certification files.
- Record an open decision only if the desired date semantics become disputed.

## Definition Of Done

- `CERT-01` implementation passes all validation commands listed above.
- Documentation explains the default runtime date and `--as-of` mode.
- Certification backlog reflects `CERT-01` as implemented.
- Memory captures the outcome and validation evidence.
- No unrelated certification conditions are changed.

## Recommended Next Action

Proceed with a narrow implementation slice for `CERT-01` before starting `CERT-02`, `CERT-03`, or `CERT-04`.

Do not bundle this fix with agent adapters, scoped validation profiles, script test architecture, or automation validation. Those are separate certification conditions.
