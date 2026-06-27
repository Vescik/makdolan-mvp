# CERT-06 Template Metadata Reference Validation Report

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-cert-06-template-metadata-reference-validation-report` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Records completion evidence for CERT-06; certification backlog remains the status source. |
| domain | AI Brain certification |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Date: 2026-06-27

Report ID: `MAKDOLAN::AI-BRAIN::CERT-06::TEMPLATE-METADATA-REFERENCE-VALIDATION`

## Scope

This report records completion of `CERT-06: Backfill Template Metadata And Add Docs/Certification Reference Validation`.

The work remained local-first and deterministic. It did not change application behavior, enable automation, add dependencies, add remote services, add embeddings, add a vector database, add an MCP server, change release behavior, or alter product scope.

## Discovery Findings

| Area | Finding | Action |
| --- | --- | --- |
| Template metadata | 13 active Markdown templates under `.ai/brain/templates/` lacked metadata. `agent-handoff-packet-template.md` already had compliant metadata. | Backfilled metadata on every active template. |
| Template classification | All `.ai/brain/templates/*.md` files are active scaffolds, not source-of-truth policy docs. | Classified all templates as `template` with `status` `active`; no grandfathering needed. |
| Health metadata scope | Certification docs were already in health metadata scope after certification dependency cleanup. | Preserved scope and added template metadata validation. |
| Secret scan scope | Certification docs and adapters were already scanned for generated-text secret patterns. | Preserved scope. |
| Search scope | Certification docs were already direct `brain:search` targets. | Preserved scope. |
| Index scope | `.ai/brain/certification/` and `.ai/brain/templates/` were already included in repo index output. | Regenerate index after changes. |
| Reference validation | `brain:health` did not validate missing local references. | Added conservative local reference validation. |

## Template Metadata Actions

Backfilled metadata on:

- `.ai/brain/templates/checker-review-template.md`
- `.ai/brain/templates/context-pack-template.md`
- `.ai/brain/templates/goal-bugfix-template.md`
- `.ai/brain/templates/goal-contract-template.md`
- `.ai/brain/templates/goal-docs-template.md`
- `.ai/brain/templates/goal-feature-template.md`
- `.ai/brain/templates/goal-refactor-template.md`
- `.ai/brain/templates/goal-test-template.md`
- `.ai/brain/templates/impact-analysis-template.md`
- `.ai/brain/templates/implementation-history-entry-template.md`
- `.ai/brain/templates/memory-update-template.md`
- `.ai/brain/templates/open-decision-template.md`
- `.ai/brain/templates/review-report-template.md`
- `.ai/brain/templates/sprint-summary-template.md`

Each active template now includes:

- `id`
- `class`
- `owner`
- `status`
- `authority`
- `domain`
- `created`
- `last_reviewed`
- `review_after`

Expected values:

- `class`: `template`
- `status`: `active`

No template was grandfathered.

## Reference Validation Behavior

`npm run brain:health` now validates obvious local references in active operating docs.

Validated references include:

- Markdown links to local files or directories.
- Inline-code paths that begin with known repo-root prefixes:
  - `.ai/brain/`
  - `docs/`
  - `project-context/`
  - `knowledge-base/`
  - `scripts/`
  - `.github/`
  - `AGENTS.md`
  - `README.md`
  - `package.json`

Reference validation scans:

- `.ai/brain/agent-start.md`
- `.ai/brain/README.md`
- `.ai/brain/scripts/README.md`
- `.ai/brain/adapters/`
- `.ai/brain/certification/`
- `.ai/brain/governance/`
- `.ai/brain/knowledge/`
- `.ai/brain/templates/`
- `AGENTS.md`
- `README.md`

Failures are blocking `brain:health` errors. The check is report-only and does not modify files.

## Limitations

The validator intentionally ignores:

- External URLs.
- Anchor-only links.
- Query and fragment suffixes after the local path is resolved.
- Globs such as `*.md`.
- Fenced code blocks.
- Historical planning reports.
- Advisory review reports.
- Generated indexes.
- Context packs and impact reports.

These exclusions avoid false positives from historical findings, examples, and generated/advisory artifacts. The validator checks local path existence only; it does not validate whether the referenced document is semantically correct for the surrounding sentence.

## Changed Files

- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`
- `.ai/brain/governance/health-checks.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/scripts/README.md`
- `.ai/brain/scripts/health-check.mjs`
- `.ai/brain/scripts/smoke-check.mjs`
- `.ai/brain/templates/*.md`
- `.ai/brain/planning/CERT_06_TEMPLATE_METADATA_REFERENCE_VALIDATION_REPORT.md`

Generated and memory closeout files are updated during verification.

## Validation Evidence

| Command | Result | Key Output |
| --- | --- | --- |
| `node --check .ai/brain/scripts/health-check.mjs` | PASS | Script parsed successfully. |
| `node --check .ai/brain/scripts/smoke-check.mjs` | PASS | Script parsed successfully. |
| `npm run brain:health` | PASS | Template metadata, local references, registry, freshness, metadata, and secret scan passed. |
| `npm run brain:smoke` | PASS | Six smoke groups passed, including health-check template metadata and missing-reference scenarios. |
| `npm run brain:index` | PASS | Indexed 231 files across 70 directories after final report and memory updates. |
| `npm run brain:search -- "certification backlog"` | PASS | Top match was `.ai/brain/certification/CERTIFICATION_BACKLOG.md`. |
| `npm run brain:impact -- "template metadata reference validation"` | PASS | Generated `.ai/brain/context-packs/2026-06-27T10-14-33-460Z-impact-template-metadata-reference-validation.md`. |
| `git diff --check` | PASS | No whitespace errors. |
| `npm run typecheck` | PASS | `tsc --noEmit` completed successfully. |
| `npm run lint` | PASS | `eslint .` completed successfully. |
| `npm run test` | PASS | 4 test files and 28 tests passed. |
| `npm run build:web` | PASS | Expo web export completed to `dist/`; output printed `.env.local` and environment variable names only. |
| `bash scripts/diff-gate.sh` | PASS | Full gate completed after final report, memory, and index updates. |

## Final CERT-06 Recommendation

Recommendation: `CERT-06` is implemented.

Rationale:

- Template metadata is backfilled.
- Template metadata validation is implemented in `brain:health`.
- Local path/reference validation is implemented in `brain:health`.
- Certification docs remain included in health metadata scope, secret scan scope, direct search scope, and repo index scope.
- Limitations are documented and conservative.
