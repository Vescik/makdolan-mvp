# Makdolan AI Brain Knowledge Review

Date: 2026-06-26

Role: Knowledge Management Architect

Scope: Review AI Brain as an enterprise knowledge platform. This review covers discoverability, duplication, missing knowledge, outdated knowledge risks, ownership, lifecycle, indexing, taxonomy, metadata, searchability, and tacit knowledge that still exists only in developers' heads.

This is a review artifact only. It does not implement new functionality.

## Executive Summary

AI Brain is already useful as a repository-local knowledge layer. It has a sensible directory structure, a startup checklist, stable knowledge summaries, memory files, templates, generated indexes, and search scripts. It is strong enough to reduce cold-start cost for Codex sessions and human maintainers.

It is not yet an enterprise-grade knowledge platform. The core weaknesses are knowledge authority, metadata, ownership, lifecycle, and freshness. There are many documents with overlapping facts, but no enforceable source-of-truth map, no owner model, no review cadence, no metadata schema, no stale-content checks, no link validation, and no knowledge quality metrics.

The highest-risk knowledge problem is not absence of documents. It is that important facts exist in too many places with no machine-verifiable hierarchy. As the product grows, the system could give agents confident but stale answers.

## Current Knowledge Landscape

| Area | Current Assets | Assessment |
|---|---|---|
| Product source of truth | `docs/product/PRODUCT_DECISIONS.md`, `docs/product/PRD.md`, `docs/product/MVP_SCOPE.md`, `project-context/PRODUCT_BRIEF.md` | Strong coverage, overlapping summaries. |
| Architecture source of truth | `docs/architecture/`, `knowledge-base/architecture.md`, `.ai/brain/knowledge/architecture-principles.md` | Useful but split across durable docs and AI Brain summaries. |
| Data/scoring knowledge | `docs/data/`, `docs/reviews/DATA_AND_SCORING_REVIEW.md`, domain tests | Strong planning-level docs; production data operation knowledge still missing. |
| Operating workflow | `AGENTS.md`, `.ai/brain/knowledge/sdlc-flow.md`, `.ai/brain/loop-harness/`, `.agents/skills/` | Strong, but duplicated and Codex-heavy. |
| Memory | `.ai/brain/memory/implementation-history.md`, `open-decisions.md`, sprint summaries folder | Good start; lacks structured metadata and ownership. |
| Indexing | `.ai/brain/index/repo-map.json`, `file-catalog.md`, `module-map.md` | Useful generated inventory; freshness not enforced. |
| Search | `npm run brain:search` | Helpful keyword search; no semantic search, no JSON output, no authority ranking. |
| Reviews | `.ai/brain/reviews/*.md`, `docs/reviews/*.md` | Useful analysis artifacts; lifecycle/status not defined. |

## Strengths

- AI Brain separates stable knowledge, memory, templates, planning, context packs, and indexes.
- Source-of-truth boundaries are documented at a high level.
- Startup checklist gives agents a clear discovery path.
- Knowledge summaries link back to source documents instead of copying full documents.
- The repository has meaningful product, data, architecture, security, and testing docs.
- Generated indexes make broad repository orientation faster.
- Memory update rules correctly reject raw chat logs, secrets, full source dumps, and temporary notes.
- Open decisions are explicitly tracked.
- Prior reviews have already identified freshness, ownership, generated artifact, and source-of-truth risks.

## Discoverability

### What Works

- `.ai/brain/knowledge/agent-session-start.md` is a clear starting point.
- `.ai/brain/index/README.md` lists key AI Brain, source, and memory files.
- `npm run brain:search` searches AI Brain, docs, project context, knowledge base, and selected source/test filenames.
- `module-catalog.md`, `file-catalog.md`, and `module-map.md` make the repository easier to scan.
- Context packs provide task-start discovery bundles.

### Gaps

- There is no single "knowledge portal" that explains the authority hierarchy, freshness rules, and where each knowledge type belongs.
- Generated indexes and durable knowledge sit close together and can appear equally authoritative.
- File discovery is path-based, not topic-based.
- Search results do not explain whether a result is source-of-truth, derivative, generated, historical, or stale.
- New reviews are discoverable by path but not integrated into the index README or knowledge taxonomy.

### Recommendations

- Add a knowledge portal document such as `.ai/brain/knowledge-map.md` that maps each knowledge domain to its authoritative source, summaries, generated aids, owners, and refresh cadence.
- Add source authority labels to search/index output: authoritative, summary, generated, memory, historical, adapter/runtime, or review.
- Add a review index under `.ai/brain/reviews/README.md` with status, date, owner, and follow-up links.

## Knowledge Duplication

### Current Duplication Patterns

- MVP scope appears in `AGENTS.md`, `.ai/brain/knowledge/product-decisions.md`, `docs/product/PRODUCT_DECISIONS.md`, `docs/product/MVP_SCOPE.md`, `docs/product/PRD.md`, and `project-context/PRODUCT_BRIEF.md`.
- Architecture facts appear in `docs/architecture/`, `knowledge-base/architecture.md`, `.ai/brain/knowledge/architecture-principles.md`, and review artifacts.
- Validation commands appear in `AGENTS.md`, `.ai/brain/knowledge/testing-map.md`, `.ai/brain/loop-harness/validator-rules.md`, `docs/VERIFY_MATRIX.md`, and goal templates.
- AI Brain lifecycle rules appear in `AGENTS.md`, `.ai/brain/README.md`, `.ai/brain/knowledge/sdlc-flow.md`, goal templates, loop harness files, and local skills.
- Context pack and impact analysis output repeat core constraints and validation commands.

### Why This Matters

Some duplication is useful because agents need compact summaries. The risk is unmanaged duplication. If the product scope changes, it is unclear which copies must update and which should stay historical.

### Recommendations

- Classify duplicates as one of:
  - `canonical`: source of truth.
  - `summary`: must link to canonical source and update when canonical changes.
  - `historical`: must not be updated except with archival notes.
  - `generated`: reproducible and should not be hand-edited.
  - `runtime`: tool-specific instructions.
- Add a "Canonical Source" line to AI Brain knowledge summary files.
- Add a "Derived From" line to generated context packs and reviews where applicable.
- Add a stale-docs check that flags repeated key claims across files: MVP non-goals, validation commands, platform targets, data source policy, and AI Brain scope.

## Missing Knowledge

### Missing Enterprise KM Modules

- Knowledge ownership matrix.
- Knowledge lifecycle policy.
- Metadata schema for knowledge files.
- Source authority taxonomy.
- Review cadence and freshness windows.
- Stale knowledge escalation path.
- Knowledge quality metrics.
- Knowledge retirement/archive policy.
- Decision lifecycle from proposed -> approved -> superseded -> retired.
- Structured handoff packet.
- Incident/postmortem knowledge capture.
- Release/deployment knowledge capture.
- UX research and user feedback synthesis.
- Data operations runbooks for seed data review, price verification, and abuse handling.

### Missing Product/Engineering Knowledge

- Who owns product decisions, architecture decisions, data strategy, release readiness, and AI Brain governance.
- How to decide when a fact belongs in `docs/`, `project-context/`, `knowledge-base/`, `.ai/brain/knowledge/`, or `.ai/brain/memory/`.
- How to retire obsolete context packs and generated reports.
- How to reconcile conflicts between source docs and AI Brain summaries.
- How to capture learnings from user testing into durable product decisions.
- How to capture design rationale beyond screen-level implementation.
- How to capture local setup failures and environment-specific fixes.

### Recommendations

- Add `.ai/brain/knowledge/ownership-matrix.md`.
- Add `.ai/brain/knowledge/lifecycle-policy.md`.
- Add `.ai/brain/knowledge/source-authority.md`.
- Add `.ai/brain/templates/knowledge-entry-template.md`.
- Add `.ai/brain/templates/knowledge-review-template.md`.
- Add a lightweight "knowledge capture request" template for tacit knowledge.

## Outdated Knowledge Risks

### Current Risks

- Generated index freshness is not enforced.
- AI Brain summaries can drift from source docs.
- Product scope appears in many places, increasing drift risk.
- Reviews contain recommendations but no status, owner, or resolution lifecycle.
- Context packs are timestamped and task-specific but can be mistaken for current source.
- `knowledge-base/architecture.md` is durable but concise enough that it may lag real architecture changes.
- `docs/IMPLEMENTATION_BASELINE.md` is labeled source of truth for Sprint 1 and may later conflict with current MVP implementation if not marked historical or superseded.
- Open decisions have no owner or review date.

### Recommendations

- Add metadata front matter to knowledge files:

```yaml
---
title:
knowledge_type:
authority: canonical|summary|generated|memory|historical|review
owner:
source_of_truth:
derived_from:
created:
last_reviewed:
review_after:
status: active|draft|superseded|archived
tags:
---
```

- Add a freshness validation command that checks `review_after`, missing owners, stale generated indexes, and broken local links.
- Mark historical artifacts explicitly so agents do not treat them as current operating guidance.

## Ownership

### Current State

- Documents mention human sign-off and owners in some templates, but most knowledge assets do not name an owner.
- Open decisions include status and notes but not owner, due date, or resolution trigger in the table itself.
- AI Brain has no named steward for taxonomy, freshness, review quality, or pruning.

### Risks

- Nobody is accountable for updating stale product summaries.
- Agents may update memory but not source-of-truth docs.
- Reviews may produce recommendations that never become tracked work.
- Open decisions may stay open indefinitely.

### Recommendations

- Define knowledge owner roles:
  - Product owner: product decisions, PRD, MVP scope.
  - Architecture owner: ADRs, architecture docs, module boundaries.
  - Data owner: data strategy, seed format, scoring, verification.
  - Release owner: release readiness, deployment, rollback.
  - AI Brain steward: knowledge taxonomy, memory, generated artifacts, adapter policy.
- Add owner and review date fields to open decisions.
- Require every review artifact to include "Recommended owner" for each high-priority follow-up.

## Lifecycle

### Current State

- AI Brain has implementation history and open decisions.
- Sprint summaries are supported but currently only have a README.
- Memory update checklist explains when to update memory.
- There is no lifecycle for reviews, generated context packs, stale summaries, or retired decisions.

### Missing Lifecycle States

- Draft.
- Active.
- Validated.
- Superseded.
- Archived.
- Historical reference.
- Actioned.
- Rejected.

### Recommendations

- Add lifecycle status to all knowledge artifacts.
- Create a "phase closeout" knowledge maintenance step:
  - update implementation history,
  - resolve or renew open decisions,
  - mark stale context packs,
  - update source docs,
  - regenerate index,
  - add sprint summary.
- Add a review follow-up tracker that converts review recommendations into open decisions or backlog candidates.

## Indexing

### Current State

- `brain:index` creates `repo-map.json`, `file-catalog.md`, and `module-map.md`.
- The index records path, size, category, and module.
- The generated catalog is useful for broad navigation.

### Gaps

- No schema version.
- No generated timestamp in `repo-map.json` visible in review output.
- No freshness enforcement.
- No source authority classification.
- No owner, tags, lifecycle, or canonical-source metadata.
- Generated context packs are intentionally excluded, but review artifacts are not clearly indexed as reviews because they were added after the last index.
- No relationship graph between source docs and summaries.

### Recommendations

- Add index schema version and generated timestamp.
- Add knowledge metadata extraction from front matter.
- Add a relationship index:
  - canonical source -> summaries,
  - ADR -> knowledge-base entry,
  - review -> follow-up decisions,
  - source doc -> tests/code modules.
- Add `npm run brain:index:check` that regenerates index in memory or temp output and fails when tracked index files are stale.

## Taxonomy

### Current Taxonomy

- Directory-level taxonomy: planning, knowledge, loop-harness, context-packs, templates, memory, index, scripts, reviews.
- Source-doc taxonomy: product, architecture, data, testing, roadmap, reviews.
- Knowledge-base taxonomy: architecture, decisions, glossary.

### Gaps

- No topic taxonomy across the repository.
- No tag vocabulary for knowledge assets.
- No distinction between canonical, summary, generated, memory, review, runtime adapter, and historical artifacts in the taxonomy.
- No domain taxonomy for product, UX, data, recommendation, security, release, operations, AI Brain, and agent platform.

### Recommended Taxonomy

Use these top-level knowledge tags:

- `product`
- `architecture`
- `data`
- `recommendation-engine`
- `ux`
- `design`
- `testing`
- `release`
- `operations`
- `security-privacy`
- `ai-brain`
- `agent-platform`
- `workflow`
- `memory`
- `review`
- `generated`
- `historical`

Use these authority tags:

- `canonical`
- `summary`
- `derived`
- `generated`
- `memory`
- `review`
- `runtime-adapter`
- `historical`

## Metadata

### Current State

- Most files have headings and some dates.
- Reviews include date and role.
- Product decisions include version/date/status.
- Context packs include generated timestamp.
- Memory entries include date in heading.

### Gaps

- Metadata is inconsistent and mostly unstructured.
- Owner, status, review cadence, source authority, canonical source, tags, and supersession are missing.
- Search cannot use metadata because there is no schema.

### Recommendations

- Standardize front matter for all AI Brain knowledge, memory, review, and generated artifacts.
- Make metadata minimal but mandatory for new AI Brain artifacts:
  - `title`
  - `type`
  - `authority`
  - `status`
  - `owner`
  - `created`
  - `last_reviewed`
  - `review_after`
  - `canonical_source`
  - `tags`
- Update scripts to read and index this metadata.

## Searchability

### Current State

- Search is offline, simple, deterministic, and safe.
- It searches useful text targets and source filename hints.
- Results include score and snippets.

### Gaps

- Keyword matching misses synonyms and related concepts.
- No JSON output.
- No metadata-based filters.
- No authority ranking.
- No freshness ranking.
- No "search within canonical sources only."
- No query evaluation set to measure whether search returns useful results.

### Recommendations

- Add `--json`.
- Add filters such as `--tag=`, `--authority=`, `--type=`, `--fresh-only`, and `--canonical-only`.
- Boost canonical active sources over generated or historical artifacts.
- Add a small search evaluation suite with expected top results for common queries:
  - MVP scope,
  - scoring model,
  - validation commands,
  - AI Brain memory,
  - release readiness,
  - security/privacy,
  - data source policy,
  - agent portability.
- Consider semantic search later, after metadata and authority ranking exist.

## Knowledge Still In Developers' Heads

These are likely important facts that are not sufficiently captured in durable, searchable, owner-assigned form.

### Product Judgment

- Why Rzeszow was chosen beyond "first test market."
- What "useful recommendation" means in user-observable terms.
- What minimum seed coverage is enough for user testing.
- Which user segments matter most first: students, young workers, or broader budget-conscious users.
- When to expand beyond controlled seed data.

How to capture:

- Add a product assumptions log with assumption, evidence, owner, validation trigger, and decision date.
- Capture user-test learnings as structured decision updates, not only notes.

### Data Curation Judgment

- How seed menu items were selected.
- What makes a price trustworthy enough for MVP.
- How to resolve conflicting local price observations.
- Which chains/local categories matter for Rzeszow launch usefulness.
- Which data fields are mandatory now versus future-proofing.

How to capture:

- Add a seed data curation runbook.
- Add example accepted/rejected seed rows with rationale.
- Add data quality decision log tied to `docs/data/`.

### Recommendation Tuning Judgment

- Why current scoring weights are acceptable.
- What ranking behavior is intentionally optimized versus incidental.
- What "too cheap" or "too low quality" means when budget is high.
- How reason chips should trade off truth, simplicity, and persuasion.

How to capture:

- Add recommendation tuning notes with test scenarios, expected ranking, rationale, and owner.
- Add a scoring change decision template.

### UX And Design Judgment

- What tone Makdolan should use in Polish copy.
- What UI density is appropriate for repeated food decisions.
- Which result-card details increase trust versus clutter.
- How much uncertainty copy is enough without making results feel unreliable.

How to capture:

- Add a UX principles file and copy guidelines.
- Add screenshot review notes or UI decision records after meaningful UI changes.

### Engineering Judgment

- When a task is "small enough" to skip context packs or maker-checker review.
- What constitutes a meaningful memory update.
- Which generated AI Brain files should be committed versus ignored.
- How to handle local `.env.local` during Expo builds without exposing secrets.

How to capture:

- Add task-tier rules.
- Add generated artifact policy.
- Add local environment hygiene notes that reference variable names only, not values.

### Release And Operations Judgment

- What web deployment target will be used.
- Whether mobile release will use EAS or checked-in native projects.
- What counts as release-blocking for MVP.
- How to roll back a bad release.
- Who owns incidents and post-release monitoring.

How to capture:

- Add release readiness and incident response knowledge modules before first production deployment.
- Convert native build path into an open decision with owner and resolution trigger.

### AI Brain Governance Judgment

- Who decides AI Brain taxonomy changes.
- Which reviews become backlog items.
- When to archive context packs.
- When to promote memory into source-of-truth docs.
- How non-Codex agents should consume AI Brain.

How to capture:

- Add AI Brain governance policy.
- Add review follow-up tracker.
- Add agent-platform source authority map.

## Recommended Knowledge Architecture

```text
.ai/brain/
  knowledge/
    knowledge-map.md
    source-authority.md
    ownership-matrix.md
    lifecycle-policy.md
    taxonomy.md
    metadata-schema.md
  memory/
    implementation-history.md
    open-decisions.md
    sprint-summaries/
  reviews/
    README.md
    *.md
  generated/
    index/
    context-packs/
    impact-analyses/
  scripts/
    search/index/memory helpers
```

Principles:

- Source-of-truth docs remain in `docs/`, `project-context/`, and `knowledge-base/`.
- AI Brain summaries must link to canonical sources.
- Generated artifacts must be clearly marked and separable.
- Reviews must have lifecycle status and follow-up ownership.
- Memory should capture decisions, outcomes, validation, and unresolved assumptions, not raw work logs.

## Priority Recommendations

### Near Term

1. Add a knowledge map that identifies canonical sources, summaries, memory, generated artifacts, and reviews.
2. Add metadata front matter to new AI Brain review and knowledge files.
3. Add a review index for `.ai/brain/reviews/`.
4. Add owner/review date fields to open decisions.
5. Add generated index freshness validation.

### Medium Term

1. Add source authority and lifecycle policies.
2. Add metadata extraction to `brain:index`.
3. Add `brain:search --json` and metadata filters.
4. Add local Markdown link validation.
5. Create a seed data curation runbook and recommendation tuning log.

### Later

1. Add semantic search only after metadata and authority ranking exist.
2. Add MCP read-only resources for knowledge, memory, index, and search.
3. Add knowledge quality metrics: stale files, owner coverage, open-decision age, broken links, unresolved review recommendations, search success rate.
4. Add enterprise-style archival and supersession workflows.

## Final Assessment

AI Brain is a strong early knowledge layer, but it is not yet an enterprise knowledge platform. It has many useful documents and generated aids, but the platform needs authority, metadata, ownership, lifecycle, and freshness controls before it can safely scale.

The most important shift is from "many helpful Markdown files" to "managed knowledge assets." Every important artifact should have an owner, status, canonical source, review cadence, and lifecycle. Without that, AI Brain will eventually become the thing it is trying to prevent: stale context that agents trust too much.
