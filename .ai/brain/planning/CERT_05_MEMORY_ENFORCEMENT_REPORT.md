# CERT-05 Memory Enforcement Report

Date: 2026-06-27

## Summary

CERT-05 is implemented with grandfathered historical memory.

AI Brain now has enforceable memory integrity for new implementation-history entries while preserving older advisory history without aggressive rewriting. Canonical docs remain the source of truth; memory remains evidence-linked operating history.

## Completed Items

- Updated `.ai/brain/scripts/update-memory.mjs` so helper-generated memory includes memory ID, lifecycle status, created date, last reviewed date, review-after date, source evidence, validation evidence where applicable, review evidence, supersedes, and superseded-by fields.
- Required `--source-evidence` for implementation and decision helper entries.
- Added validation for memory IDs, status values, and date argument shape in the memory helper.
- Added report-only memory integrity validation to `.ai/brain/scripts/health-check.mjs`.
- Added open-decision lifecycle status validation to `npm run brain:health`.
- Updated `.ai/brain/scripts/smoke-check.mjs` so `npm run brain:smoke` covers the stricter helper output and health memory validation.
- Updated `.ai/brain/governance/memory-integrity-model.md` with the CERT-05 enforcement boundary and grandfathering policy.
- Updated `.ai/brain/memory/memory-update-checklist.md`, `.ai/brain/scripts/README.md`, `AGENTS.md`, `.ai/brain/templates/implementation-history-entry-template.md`, and `.ai/brain/templates/open-decision-template.md` to explain safe memory updates.
- Updated `.ai/brain/certification/CERTIFICATION_BACKLOG.md` to mark CERT-05 implemented with grandfathered historical memory.

## Grandfathering Rule

Historical entries before `2026-06-27: CERT-05 memory enforcement hardening` are grandfathered.

Why: rewriting older memory would create churn and could accidentally alter historical evidence. The safer model is to enforce structured memory from the CERT-05 boundary forward and backfill older entries only when they are materially edited, superseded, or promoted into canonical docs.

## Health Enforcement

`npm run brain:health` now checks:

- New implementation-history entries from the CERT-05 boundary forward contain required lifecycle and provenance fields.
- New implementation-history entries use valid memory IDs, statuses, and date fields.
- New implementation-history entries do not keep placeholder source evidence or validation fields.
- Open-decision rows use only `Open`, `Needs owner`, `Deferred`, `Resolved`, or `Superseded`.

## Validation Evidence

Final validation was run after script, docs, backlog, memory, and regenerated index updates.

- `node --check .ai/brain/scripts/update-memory.mjs`: PASS.
- `node --check .ai/brain/scripts/health-check.mjs`: PASS.
- `node --check .ai/brain/scripts/smoke-check.mjs`: PASS.
- `npm run brain:memory:update -- --help`: PASS.
- `npm run brain:smoke`: PASS, six smoke groups.
- `npm run brain:health`: PASS after the CERT-05 boundary memory entry was added.
- `npm run brain:index`: PASS after final docs and memory updates.
- `git diff --check`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run test`: PASS, 28 tests.
- `bash scripts/diff-gate.sh`: PASS.

## Remaining Risks

- Historical memory remains mixed-format by design. This is accepted because historical memory is advisory and canonical docs remain authoritative.
- The health check validates Markdown structure and required fields; it cannot prove semantic quality of source evidence or review evidence.
- Memory helper entries still require human review before relying on them as durable context.

## Certification Status

CERT-05 can move from accepted non-blocking condition to implemented with grandfathered historical memory.

Epic 1 certification can proceed with fewer conditions, subject to the remaining open certification backlog items.
