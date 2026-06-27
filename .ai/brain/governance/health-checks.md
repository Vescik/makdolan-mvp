# AI Brain Health Checks

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-health-checks` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines local AI Brain health checks, secret scan scope, metadata validation, registry validation, and generated artifact freshness rules. |
| domain | AI Brain validation |
| created | 2026-06-26 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-26 |

## Purpose

AI Brain health checks make Sprint 0 governance visible and testable without adding remote services or heavy process. They are local, deterministic, report-only checks.

The primary command is:

```bash
npm run brain:health
```

By default, freshness checks use the current local runtime date. To reproduce a historical freshness run, pass an explicit calendar date:

```bash
npm run brain:health -- --as-of=YYYY-MM-DD
```

This command does not modify files, read `.env.local`, use network access, enable automation, or upload content.

## Health Check Scope

`brain:health` checks:

- Core canonical AI Brain metadata, including agent startup, adapter, governance, knowledge, and certification docs.
- Template metadata for active `.ai/brain/templates/*.md` scaffolds.
- Review finding registry rows.
- Generated artifact freshness signals.
- Conservative local path/reference validity in active operating docs.
- AI Brain and generated text for common secret patterns.

It does not replace:

- `bash scripts/diff-gate.sh`
- app validation
- human review
- product/architecture decision approval
- release readiness checks

## Metadata Backfill Guidance

Core canonical AI Brain docs should include a `Metadata:` table near the top of the file.

Required fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable lowercase identifier. |
| `class` | `canonical`, `generated`, `advisory`, `memory`, `archive`, `template`, or `adapter`. |
| `owner` | Maintainer role or accountable group. |
| `status` | `active`, `draft`, `superseded`, or `archived`. |
| `authority` | What the file is allowed to decide. |
| `domain` | Knowledge area. |
| `created` | Creation date or `unknown`. |
| `last_reviewed` | Last review date. |
| `review_after` | Freshness review date. |

Sprint 1 applies this expectation to:

- `.ai/brain/agent-start.md`
- `.ai/brain/README.md`
- `.ai/brain/adapters/*.md`
- `.ai/brain/certification/*.md`
- `.ai/brain/knowledge/*.md`
- `.ai/brain/governance/*.md`

As of CERT-06, `brain:health` also validates metadata for every active Markdown file under `.ai/brain/templates/`.

Later sprints may expand metadata validation to loop harness files, memory entries, and docs outside `.ai/brain/`.

## Archive And Template Metadata

Archive files should use:

- `class`: `archive`
- `status`: `archived`
- `authority`: "Historical reference only; not active guidance."
- `superseded_by`: when known

Template files under `.ai/brain/templates/*.md` must use:

- `class`: `template`
- `status`: `active`
- `authority`: "Scaffold only; does not define current project state."
- `review_after`: when template quality should be checked

All active AI Brain templates are expected to include `id`, `class`, `owner`, `status`, `authority`, `domain`, `created`, `last_reviewed`, and `review_after`. Use grandfathering only when a file is historical, archived, or intentionally not an active scaffold; otherwise backfill the metadata.

## Review Finding Registry Validation

The registry at `.ai/brain/governance/review-finding-registry.md` must keep accepted findings machine-readable enough for lightweight validation.

Each `MGA-*` row must include:

- Valid ID: `MGA-01`, `MGA-02`, etc.
- Severity: `Critical`, `High`, `Medium`, or `Low`.
- Status: `proposed`, `accepted`, `in_progress`, `implemented`, `deferred`, `rejected`, or `superseded`.
- Source review.
- Finding text.
- Owner/area.
- Dependencies field.
- Recommended sprint.
- Evidence/resolution.

Registry validation does not approve product, architecture, release, credential, dependency, or automation decisions.

## Generated Artifact Freshness Validation

The health check detects:

- Missing generated index outputs.
- Context packs older than the lifecycle policy allows.
- Context packs whose generated date cannot be inferred from filename.
- Planning reports without obvious date/generated metadata near the top.

Current policy:

- Context packs older than 14 days are stale.
- Context packs older than 30 days are expired.
- Impact reports follow the same freshness expectation as context packs.
- Planning reports should include a date, generated timestamp, or metadata.

The health check reports stale generated artifacts, but it does not delete or rewrite them.

Use `--as-of=YYYY-MM-DD` when you need deterministic replay of a prior health result, such as validating Sprint 1 behavior with `--as-of=2026-06-26`. Invalid or non-calendar dates must fail without modifying files.

## Local Path And Reference Validation

`brain:health` validates obvious local references in active operating docs. It checks Markdown links and inline-code paths that point to repository files or directories.

Validated roots and exact files:

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

Limitations:

- It ignores external URLs, anchor-only links, query/fragment suffixes, globs such as `*.md`, and fenced code blocks.
- It does not validate historical planning reports, advisory review reports, generated indexes, or context packs because those files often preserve old findings or intentionally mention missing paths.
- It does not validate semantic correctness of a reference; it only checks whether the referenced local path exists.

If a local reference fails:

1. Fix the path if the referenced file or directory exists elsewhere.
2. Create the referenced doc only when it is genuinely required by the source-of-truth map.
3. If the reference is intentionally historical, move it to an advisory/generated artifact or rewrite it so it is not presented as active operating guidance.
4. Re-run `npm run brain:health`.

## Generated Text Secret Scan

`brain:health` scans local text files only. It does not scan ignored local secret files such as `.env.local`.

Scan scope:

- `.ai/brain/agent-start.md`
- `.ai/brain/adapters/`
- `.ai/brain/certification/`
- `.ai/brain/context-packs/`
- `.ai/brain/governance/`
- `.ai/brain/index/`
- `.ai/brain/knowledge/`
- `.ai/brain/memory/`
- `.ai/brain/planning/`
- `.ai/brain/reviews/`
- `docs/`
- `project-context/`
- `knowledge-base/`
- `AGENTS.md`
- `README.md`

Detected patterns include common OpenAI, GitHub, AWS, Slack, and private-key formats.

If a possible secret is detected:

1. Do not quote the secret value.
2. Remove it from generated files or docs.
3. Rotate the credential if exposure is plausible.
4. Re-run `npm run brain:health`.
5. Document the incident without copying the secret.

## Result Semantics

| Result | Meaning |
| --- | --- |
| `PASS` | No errors or warnings. |
| `PASS WITH WARNINGS` | No blocking errors, but freshness or non-critical quality warnings exist. |
| `FAIL` | Missing required metadata, invalid registry row, missing index output, or possible secret pattern found. |

Warnings should be triaged, but they do not automatically block docs-only work.

## When To Run

Run `npm run brain:health`:

- Before closing AI Brain governance work.
- Before starting an Epic boundary.
- After adding review findings.
- After creating many generated artifacts.
- Before enabling any automation.

Run `bash scripts/diff-gate.sh` separately for full repository validation.
