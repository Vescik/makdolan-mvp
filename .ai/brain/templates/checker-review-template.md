# Checker Review Template

Use this template to review major work before marking it done. Review against the goal contract and validation evidence, not vague preference.

## Review Subject

- Goal or task:
- Diff, branch, PR, or commit:
- Maker:
- Checker:
- Date:

## Goal Contract Coverage

| Goal item | Evidence | Status |
|---|---|---|
| Objective satisfied |  | Pass/Fail |
| Done criteria satisfied |  | Pass/Fail |
| Allowed scope respected |  | Pass/Fail |
| Forbidden scope untouched |  | Pass/Fail |
| Stop conditions avoided or approved |  | Pass/Fail |
| Memory update requirement satisfied |  | Pass/Fail |

## Validation Evidence Review

| Command | Maker result | Checker assessment |
|---|---|---|
| `bash scripts/diff-gate.sh` |  | Pass/Fail/Skipped with reason |
| Targeted command |  | Pass/Fail/Skipped with reason |

## Architecture Fit

- Relevant architecture docs checked:
- Existing module patterns followed:
- Cross-platform iOS impact:
- Cross-platform Android impact:
- Web impact:
- Security/privacy impact:

## Tests Review

- Tests added or updated:
- Existing tests relevant to the change:
- Gaps or skipped tests:
- Required test fixes:

## Docs And Memory Review

- Docs updated:
- AI Brain memory updated:
- Open decisions recorded:
- Repo index regenerated when needed:

## Findings

List blocking findings first. Each rejected item must include a concrete required fix.

| Severity | File | Finding | Required fix |
|---|---|---|---|
| P0/P1/P2 | `path` | Description | Concrete action |

## Decision

Choose one:

- `Approved`
- `Approved with follow-ups`
- `Rejected`

Decision:

Required fixes before done:

- Item.

Non-blocking follow-ups:

- Item.

## Checker Notes

Short notes only. Avoid style-only comments unless style hides a real defect.
