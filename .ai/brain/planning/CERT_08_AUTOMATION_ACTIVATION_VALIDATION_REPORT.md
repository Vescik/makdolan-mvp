# CERT-08 Automation Activation Validation Report

Date: 2026-06-27

## Summary

CERT-08 is implemented.

AI Brain now has a local, report-only automation activation validation gate. Automation remains disabled unless a human owner creates an activation record, validates it locally, completes first-run review, and records sign-off.

No automation was enabled by this work.

## Completed Items

- Added `.ai/brain/governance/automation-activation-validation.md` as the canonical activation validation gate.
- Added `.ai/brain/templates/automation-activation-record-template.md` as the required activation record scaffold.
- Added `.ai/brain/scripts/validate-automation-activation.mjs`.
- Added `npm run brain:automation:check`.
- Updated `.ai/brain/governance/security-preflight.md` to point activation work to the validator.
- Updated `.ai/brain/loop-harness/automation-policy.md` and `.codex/automations/README.md` so disabled templates require an activation record and validator pass before enablement.
- Updated `.ai/brain/governance/source-of-truth-map.md` so automation governance includes the activation validation contract.
- Updated `.ai/brain/scripts/README.md` to document command behavior and failure behavior.
- Updated `.ai/brain/scripts/smoke-check.mjs` so `npm run brain:smoke` covers safe and unsafe activation record scenarios.
- Updated `.ai/brain/governance/review-finding-registry.md` to mark `MGA-12` implemented.
- Updated `.ai/brain/certification/CERTIFICATION_BACKLOG.md` to mark `CERT-08` implemented.

## Validator Behavior

`npm run brain:automation:check -- path/to/activation-record.md` validates:

- Owner.
- Purpose.
- Trigger.
- Cadence.
- Sandbox.
- Network stance.
- Secrets.
- Output path.
- Write scope.
- Validation commands.
- Stop conditions.
- Rollback/disable path.
- First-run review.
- Data exposure.
- Approval record.

The validator blocks:

- Missing checklist fields.
- Placeholder answers.
- Agent-only ownership.
- `danger-full-access`.
- Required secrets.
- Unsafe report output paths.
- Missing stop conditions.
- Missing rollback/disable path.
- Missing human first-run review.
- Data leaving the local checkout.
- Forbidden capabilities such as deployment, production API calls, database migration, credential rotation, auto-merge, destructive deletion, and dependency mutation.

## Certification Impact

This closes the final accepted non-blocking certification condition.

Deferred items remain future-triggered improvements, not certification blockers:

- `CERT-07`: deferred until a second repository exists or is planned.
- `CERT-09`: deferred to normal Epic 2 architecture documentation work.
- `CERT-10`: deferred to normal Epic 2 developer experience work.

## Validation Evidence

Final validation was run after script, docs, backlog, registry, memory, and regenerated index updates.

- `node --check .ai/brain/scripts/validate-automation-activation.mjs`: PASS.
- `node --check .ai/brain/scripts/smoke-check.mjs`: PASS.
- `node --check .ai/brain/scripts/health-check.mjs`: PASS.
- `npm run brain:automation:check -- --help`: PASS.
- `npm run brain:smoke`: PASS, seven smoke groups.
- `npm run brain:health`: PASS, 0 errors, 0 warnings.
- `npm run brain:index`: PASS, indexed 237 files across 70 directories.
- `npm run brain:search -- "Decision CERTIFIED clean certification" --limit=8`: PASS, results included `.ai/brain/certification/EPIC1_CLEAN_CERTIFICATION_RECHECK.md`, `.ai/brain/certification/EPIC1_CERTIFICATION_REPORT.md`, `.ai/brain/certification/EPIC2_READINESS_CERTIFICATE.md`, and `.ai/brain/certification/CERTIFICATION_BACKLOG.md`.
- `git diff --check`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run test`: PASS, 28 tests.
- `bash scripts/diff-gate.sh`: PASS, including typecheck, lint, tests, and web export.

## Remaining Risks

- The validator checks activation records, not live automation runtime behavior.
- Human sign-off and first-run review remain required before activation.
- Mutation, deployment, release, credential, dependency, production, payment, database, and auth automation remain outside clean Epic 1 certification scope unless separately approved and validated.

## Decision

CERT-08 can move from accepted non-blocking condition to implemented.
