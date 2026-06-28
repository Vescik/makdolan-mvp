# AI Brain Scalability Review

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::SCALABILITY-REVIEW`

Role: Distinguished Software Engineer

Date: 2026-06-26

Scope: AI Brain Pro under `.ai/brain/`, its supporting scripts, memory model, generated indexes, context packs, validation expectations, and likely evolution under a future operating model with 300k+ LOC, multiple repositories, 40 developers, many AI agents, and several years of development.

Non-goal: This review does not implement optimizations or change runtime behavior.

## Executive Summary

AI Brain is appropriately lightweight for the current repository. Its Markdown-first knowledge model, local Node scripts, generated repo map, deterministic search helper, and memory files are easy to inspect and maintain while the project is small.

The same design will not scale linearly to a 300k+ LOC, multi-repository, multi-agent environment without additional contracts. The major future bottlenecks are not raw CPU yet. They are authority, freshness, indexing scope, search quality, concurrent memory updates, generated artifact growth, and agent context overload.

The correct next step is not to introduce a distributed search service, vector database, or enterprise knowledge platform immediately. The future-proof move is to add stable contracts now: metadata, schema versions, ownership, lifecycle states, freshness checks, generated artifact boundaries, structured search outputs, and affected-scope validation. Those contracts preserve the current simplicity while making later migration to stronger storage and retrieval layers straightforward.

## Current Scalability Posture

| Area | Current posture | Scale readiness |
| --- | --- | --- |
| Repository scale | Works for the current small Expo repository and docs set. | Not ready for 300k+ LOC without sharding, affected-scope scanning, and stronger file classification. |
| Multi-repo support | Repository-local `.ai/brain/` works well as a single-repo operating layer. | No explicit repo identity, federation, dependency graph, or shared knowledge contract. |
| Indexing | `create-repo-index.mjs` performs a full local scan and writes generated Markdown/JSON indexes. | Good starter design, but lacks incremental indexing, schema versions, content hashes, freshness checks, and metadata extraction. |
| Search | `search-brain.mjs` linearly scans fixed Markdown/JSON targets and path hints. | Acceptable now, but will degrade in latency, relevance, and context quality as docs and memory grow. |
| Memory | Markdown memory files are human-readable and easy to update. | Append-heavy files will create merge conflicts, stale recall, unbounded growth, and weak machine retrieval. |
| Validation | `scripts/diff-gate.sh` gives a strong broad local gate. | Broad gates become expensive and noisy at 300k+ LOC unless scoped validation and repo-specific policies exist. |
| Architecture evolution | Current docs describe AI Brain purpose, structure, risks, SDLC flow, and session startup. | Needs governance mechanisms so future agents can discover canonical sources, deprecated content, ownership, and review cycles. |

## Strengths

### Low Operational Complexity

Severity: Low

AI Brain uses repository-local files and Node scripts. There is no service dependency, database, credential requirement, network dependency, or complex bootstrap path.

Why this matters: Simple local operation is valuable for agent portability. Codex, Claude Code, Copilot, Gemini, and future agents can all read Markdown and JSON without provider-specific infrastructure.

### Human-Readable Knowledge Layer

Severity: Low

Markdown files make project knowledge inspectable in normal review workflows. Developers can understand and modify the system without specialized tools.

Why this matters: At 40 developers, knowledge systems fail when only platform owners can understand them. AI Brain starts from a format that product, engineering, QA, and release stakeholders can review.

### Generated Index Boundary Exists

Severity: Medium

AI Brain already separates generated index files under `.ai/brain/index/` and excludes some generated or noisy files from scanning.

Why this matters: This is a useful foundation for scale because generated artifacts can be regenerated and should not become authoritative memory.

### Validation Culture Is Explicit

Severity: Medium

The repository instructions define validation expectations, diff gates, and when to use local checks.

Why this matters: Future scale problems are often caused by inconsistent gates. AI Brain already treats validation as part of completion rather than a separate optional step.

### Current Scripts Are Easy To Replace Later

Severity: Low

The current index and search scripts are small, local, and convention-based.

Why this matters: Because the scripts are not deeply embedded in application runtime behavior, they can evolve into stronger indexing/search infrastructure without product-facing migration risk.

## Key Weaknesses

### High: Indexing Is Whole-Repository And Non-Incremental

The current repo indexer scans the repository from scratch and rewrites generated outputs. That is acceptable at current size, but it becomes costly and noisy with 300k+ LOC, many generated files, multiple packages, and frequent agent-triggered updates.

Why this matters: Whole-repo scans encourage agents to either run expensive global commands too often or skip indexing entirely. Both outcomes reduce trust in the knowledge layer.

Recommended improvement: Add an index manifest with schema version, generated timestamp, repo ID, file count, content hashes, excluded paths, and source commit. Later, use content hashes or mtimes for incremental updates.

WHY: A manifest gives agents a cheap way to detect stale indexes and creates the migration path to incremental indexing without replacing the current Markdown/JSON outputs immediately.

### High: Search Is Linear, Keyword-Only, And Scope-Blind

The current search helper reads fixed Markdown/JSON targets and scores text matches at query time. It does not rank by authority, freshness, lifecycle state, ownership, platform, domain, or task phase.

Why this matters: As knowledge grows, the biggest failure mode will not be "no results." It will be plausible but stale or non-canonical results being fed into agents.

Recommended improvement: Introduce structured search records with fields for `path`, `repo_id`, `title`, `headings`, `tags`, `authority`, `status`, `owner`, `updated_at`, `canonical_source`, and `generated`.

WHY: Relevance at scale requires metadata. A keyword engine can still be used, but it must know which files are canonical, current, deprecated, generated, or historical.

### High: Memory Growth Is Append-Oriented Without Lifecycle Control

Implementation history and open decisions are append-friendly Markdown files. This is excellent for early-stage traceability but weak for long-running multi-agent work.

Why this matters: Over several years, memory files will accumulate resolved decisions, outdated assumptions, duplicate entries, and merge conflicts. Agents will waste context on history that is no longer operationally useful.

Recommended improvement: Split memory into active, durable, and archive layers. Keep current Markdown summaries, but add structured entries with IDs, dates, owners, domains, status, supersedes/superseded_by links, and review dates.

WHY: Memory must be both readable and machine-retrievable. Lifecycle metadata lets agents retrieve current operating facts without losing historical traceability.

### High: Multi-Repository Identity Is Missing

AI Brain currently assumes a single repository-local context. It does not define repository IDs, repo roles, cross-repo ownership, dependency relationships, or federation rules.

Why this matters: In a multi-repo environment, "the repo" stops being a meaningful unit. Agents need to know which repository owns product docs, shared domain logic, mobile app code, backend services, release infrastructure, and AI Brain governance.

Recommended improvement: Define a future workspace registry such as `ai-brain-workspace.json` at the workspace level and `.ai/brain/repo-profile.json` per repository.

WHY: Repo identity is a low-cost contract that prevents cross-repo ambiguity before heavier tooling is needed.

### High: Validation Gates Are Too Broad For Future Scale

The current diff gate is valuable because it runs broad checks. At 300k+ LOC and multiple repositories, always running every local check will become slow, flaky, or skipped.

Why this matters: A gate that is too expensive becomes a ceremonial policy. Agents and developers will work around it when speed pressure rises.

Recommended improvement: Keep the full gate as the release-grade option, but add affected-scope validation modes that map changed files to relevant test, lint, typecheck, docs, and build commands.

WHY: The platform needs both confidence and throughput. Scoped validation keeps routine changes fast while preserving full verification for release, architecture, shared domain, and high-risk changes.

### Medium: Generated Context Packs Can Accumulate Without Retention Policy

Timestamped context packs are useful for task startup, but they can become stale, numerous, and misleading if retained indefinitely without lifecycle metadata.

Why this matters: Agents may retrieve old task-specific context and treat it as current architecture guidance.

Recommended improvement: Add lifecycle fields to generated context packs: `generated_at`, `source_commit`, `task`, `phase`, `expires_at` or `valid_until`, `generated_by`, and `source_files`.

WHY: Context packs are maps, not source of truth. Explicit validity boundaries prevent old maps from competing with current documents.

### Medium: Review Findings Are Not Connected To A Backlog

Architecture, SDLC, agent, knowledge, and scalability reviews create high-value recommendations, but review documents alone do not ensure follow-through.

Why this matters: At scale, untracked recommendations become hidden technical debt. Future agents may repeat the same reviews rather than executing a prioritized improvement roadmap.

Recommended improvement: Add a review finding index with stable IDs, severity, status, owner, target artifact, and follow-up link.

WHY: A finding registry turns review output into manageable work without requiring immediate implementation.

### Medium: Search Does Not Support Retrieval Budgets

AI agents have limited prompt context. The current search returns useful snippets, but it does not define token budgets, summary levels, or task-phase-specific retrieval order.

Why this matters: With many agents and a large knowledge base, prompt overload becomes a scalability bottleneck. Agents will either miss important facts or over-read irrelevant material.

Recommended improvement: Define retrieval profiles such as `startup`, `architecture`, `implementation`, `release`, `incident`, and `review`, each with ordered sources and maximum result budgets.

WHY: Retrieval profiles make context assembly predictable and prevent agents from treating every task as a full repository rediscovery.

### Medium: Taxonomy Is Path-Based More Than Domain-Based

The current module classification relies heavily on file paths such as `src/`, `app/`, `docs/`, and `.ai/brain/`.

Why this matters: Path-based classification is fragile once the project has multiple apps, services, packages, ownership areas, and generated docs.

Recommended improvement: Add domain tags and ownership metadata independent of path. Examples: `product`, `recommendations`, `mobile`, `web`, `release`, `security`, `data`, `ai-brain`, `observability`.

WHY: Paths change as architecture evolves. Domain metadata lets search, validation, and ownership survive folder refactors.

### Medium: Concurrency Model Is Undefined

Multiple agents updating Markdown memory, context packs, and review files can create duplicate content, merge conflicts, and inconsistent status.

Why this matters: A 40-developer, many-agent environment needs predictable write ownership. Otherwise the knowledge layer becomes noisy and adversarial to collaboration.

Recommended improvement: Define write ownership rules. For example, agents may append task-local generated artifacts, but only specific workflows may update canonical memory, review indexes, or source-of-truth docs.

WHY: Human-readable files scale only when write paths are disciplined.

### Low: Current Performance Metrics Are Not Captured

AI Brain scripts do not emit durable timing, file count, skipped count, or search latency metrics.

Why this matters: Without simple measurements, the team will not know when local scripts have crossed from "simple and fine" into "slow enough to avoid."

Recommended improvement: Have index/search scripts print and optionally persist lightweight operational metrics.

WHY: Measurements let the team delay heavier infrastructure until thresholds are actually reached.

## Bottlenecks Before They Happen

### Bottleneck 1: Whole-Repo Scan Time

Expected failure mode: Index generation gets slower as repositories accumulate source files, docs, generated outputs, fixtures, snapshots, and package directories.

Risk: High

Early signal:

- `brain:index` consistently exceeds 30 seconds.
- Generated index diffs become large and hard to review.
- Agents skip index regeneration because it feels expensive.

Recommendation:

Add manifest-based indexing first, then incremental indexing if needed.

WHY: Manifest metadata is useful immediately and avoids committing to a storage backend too early.

### Bottleneck 2: Search Result Quality

Expected failure mode: Keyword matches return stale plans, old context packs, archived decisions, or generated summaries before canonical documents.

Risk: High

Early signal:

- Agents cite outdated context in plans.
- Developers correct the same stale assumptions repeatedly.
- Search results include many generated or historical files for normal startup queries.

Recommendation:

Rank by authority and freshness before adding semantic search.

WHY: Semantic search can make stale content easier to find. Authority metadata must come first.

### Bottleneck 3: Memory File Merge Conflicts

Expected failure mode: Multiple agents append to the same Markdown memory files and produce frequent conflicts or duplicate entries.

Risk: High

Early signal:

- Repeated conflicts in `.ai/brain/memory/implementation-history.md`.
- Duplicate decisions with slightly different wording.
- Agents add new memory instead of updating existing entries.

Recommendation:

Use stable IDs and append-only structured event files by period or domain, then generate readable rollups.

WHY: Smaller append targets reduce conflicts, while generated rollups preserve current readability.

### Bottleneck 4: Context Pack Sprawl

Expected failure mode: Context packs grow without expiry and become a second knowledge base.

Risk: Medium

Early signal:

- Context packs outnumber canonical knowledge documents.
- Search results frequently surface old context packs.
- Agents cite context packs as source of truth.

Recommendation:

Treat context packs as generated, task-scoped, and expirable.

WHY: Context packs should accelerate task startup, not compete with maintained documentation.

### Bottleneck 5: Validation Throughput

Expected failure mode: Full local validation becomes too slow for routine changes, so developers and agents skip it or run partial checks inconsistently.

Risk: High

Early signal:

- Diff gate exceeds 10 minutes for common changes.
- Teams ask for frequent exceptions.
- CI becomes the first place basic issues are detected.

Recommendation:

Introduce affected-scope validation with escalation rules for shared domain, release, security, architecture, and cross-platform changes.

WHY: A scalable engineering system needs fast local confidence and strict release confidence.

### Bottleneck 6: Multi-Repo Knowledge Drift

Expected failure mode: Each repository develops its own AI Brain conventions, causing inconsistent startup behavior, memory formats, and review quality.

Risk: High

Early signal:

- Different repos define incompatible `.ai/brain/` structures.
- Agents require repo-specific prompt knowledge.
- Cross-repo changes miss product or release constraints.

Recommendation:

Define a shared AI Brain core contract and allow repo-local extensions.

WHY: Standard contracts enable portability while preserving local autonomy.

### Bottleneck 7: Prompt Context Saturation

Expected failure mode: Agents read too much context and still miss important constraints because the context is not prioritized.

Risk: Medium

Early signal:

- Startup instructions become long enough that agents skip them.
- Reviews repeat known facts instead of finding new risks.
- Agent outputs mix current decisions with historical notes.

Recommendation:

Create retrieval profiles and summary tiers.

WHY: Agents need the right context, not maximum context.

### Bottleneck 8: Ownership Ambiguity

Expected failure mode: No one knows who owns stale files, generated indexes, review recommendations, memory cleanup, or taxonomy updates.

Risk: Medium

Early signal:

- Review dates lapse.
- Conflicting docs stay unresolved.
- Agents keep adding new docs rather than updating canonical ones.

Recommendation:

Add owner and review cadence metadata to canonical knowledge files.

WHY: Ownership is the cheapest scalability tool for long-lived knowledge.

## Future-Proof Architecture

### Recommended Layering

AI Brain should evolve into layered architecture without losing its current local-first design.

1. Source-of-truth layer

Canonical product, architecture, release, testing, and operational documents live in `docs/`, `project-context/`, `knowledge-base/`, and selected `.ai/brain/knowledge/` files.

WHY: Canonical knowledge needs stable ownership and review, not ad hoc generated summaries.

2. AI Brain core contract layer

Shared schemas define metadata, lifecycle state, authority, memory entries, review findings, validation evidence, and handoff packets.

WHY: A contract layer makes the system portable across agents and repositories.

3. Indexing layer

Indexers generate per-repo manifests, file catalogs, module maps, symbol hints, and search records.

WHY: Generated indexes should be replaceable implementation details, not hand-maintained knowledge.

4. Retrieval layer

Search starts with structured keyword retrieval, then can evolve to SQLite FTS or another local full-text index. Semantic retrieval should be optional and authority-aware.

WHY: Most near-term value comes from better metadata and ranking, not embeddings.

5. Memory layer

Memory stores durable decisions, implementation history, open questions, incident lessons, and review outcomes with lifecycle status.

WHY: Memory should reduce repeated rediscovery and prevent old assumptions from masquerading as current decisions.

6. Agent adapter layer

Adapters translate AI Brain contracts into Codex, ChatGPT, Claude Code, Copilot, Gemini, and future agent startup formats.

WHY: The platform should not depend on one agent's prompt conventions.

7. MCP/resource API layer

Future MCP resources expose read-only knowledge, search, indexes, and task context packets. Write tools should be added cautiously with validation and ownership controls.

WHY: MCP compatibility gives agents interoperable access without forcing every agent to parse repository internals.

### Multi-Repo Topology

Recommended future model:

- `ai-brain-workspace.json`: workspace-level registry of repositories, roles, owners, dependency relationships, and canonical knowledge locations.
- `.ai/brain/repo-profile.json`: per-repo identity, platform targets, package manager, validation commands, owned domains, and source-of-truth links.
- Per-repo indexes: local generated artifacts remain close to the code they describe.
- Federated index: an optional generated aggregate index points to per-repo records without copying all content.
- Shared contract package: schemas, templates, and validation rules are versioned centrally.

WHY: This model keeps each repository autonomous while enabling cross-repo discovery and governance.

### Index Record Contract

Recommended future index record fields:

```json
{
  "schema_version": "1.0",
  "repo_id": "makdolan-app",
  "path": "src/domain/recommendations.ts",
  "content_hash": "sha256:...",
  "size_bytes": 12345,
  "mtime": "2026-06-26T00:00:00.000Z",
  "kind": "source",
  "domain": ["recommendations", "product"],
  "platform": ["ios", "android", "web"],
  "authority": "implementation",
  "status": "current",
  "owner": "team-or-role",
  "generated": false,
  "canonical_source": null,
  "headings": [],
  "symbols": [],
  "depends_on": []
}
```

WHY: This is enough structure for better search, impact analysis, ownership, stale-content checks, and future federation without requiring heavyweight infrastructure now.

### Memory Architecture

Recommended future memory model:

- Active memory: current decisions, open risks, current release notes, active incidents.
- Durable memory: accepted architecture decisions, stable product decisions, platform constraints.
- Historical memory: implementation history, resolved decisions, old sprint summaries.
- Generated rollups: readable summaries created from structured entries.
- Archive policy: old entries move to yearly or domain archives after review.

WHY: Memory must stay small enough for agents to retrieve and large enough to preserve institutional knowledge.

### Search Architecture

Recommended evolution:

1. Current: linear Markdown/JSON search for small repo use.
2. Near-term: structured search records with metadata-aware ranking.
3. Mid-term: local full-text index using SQLite FTS, Tantivy, or equivalent.
4. Later: optional semantic index, only after authority and freshness metadata are reliable.

WHY: Better ranking and lifecycle control solve the immediate scale risks. Semantic retrieval is valuable later, but it amplifies stale or duplicated knowledge if introduced too early.

### Validation Architecture

Recommended future validation modes:

- `docs`: file existence, Markdown lint where available, link checks, required heading checks, `git diff --check`.
- `app-local`: typecheck, lint, tests, web build for app code.
- `domain`: focused unit tests plus cross-platform smoke checks for shared logic.
- `release`: full local gate plus CI release gates.
- `multi-repo`: affected repository graph validation.
- `ai-brain`: schema validation, index freshness, memory lifecycle checks, search smoke tests.

WHY: Scale requires choosing the right confidence level for the change type instead of treating every change identically.

## Do Not Optimize Prematurely

The following should not be introduced immediately unless clear thresholds are met:

- Vector database.
- Centralized knowledge microservice.
- Distributed job queue for indexing.
- Graph database.
- Mandatory remote AI Brain service.
- Automatic cross-repo rewriting by agents.
- Blocking AI review for every small docs change.
- Heavy document management workflow that makes Markdown hard to edit.

WHY: The current system is small enough that operational complexity would cost more than it saves. The next improvements should strengthen contracts and metadata, not infrastructure.

## Practical Scale Triggers

Use these thresholds to decide when to evolve the architecture:

| Trigger | Recommended response |
| --- | --- |
| `brain:index` exceeds 30 seconds in normal use | Add incremental indexing using content hashes or mtimes. |
| `brain:search` exceeds 2 seconds for common queries | Add precomputed search records or local FTS. |
| Search returns stale content in repeated tasks | Add authority/freshness ranking before semantic search. |
| Memory files exceed 1 MB or 500 active entries | Split memory by domain/period and add lifecycle metadata. |
| Weekly merge conflicts in AI Brain memory | Move to structured append-only event files and generated rollups. |
| More than 3 repositories use AI Brain | Add workspace registry and repo profiles. |
| More than 5 recurring agents use AI Brain | Add agent-neutral handoff packets and startup profiles. |
| Diff gate exceeds 10 minutes for common changes | Add affected-scope validation modes. |
| Review recommendations repeat across reviews | Add finding IDs and a review finding index. |
| Generated context packs outnumber canonical docs | Add retention rules and exclude expired generated content from search. |

## Recommended Improvements

### High: Add AI Brain Metadata Front Matter

Add standard metadata to canonical AI Brain knowledge files and future review artifacts.

Recommended fields:

- `id`
- `title`
- `owner`
- `status`
- `authority`
- `domain`
- `review_after`
- `last_reviewed`
- `source_of_truth`
- `supersedes`

WHY: Metadata lets agents rank, filter, and validate knowledge without guessing from filenames.

### High: Add Index Schema Versioning And Freshness Checks

Generated index files should identify their schema, generator version, source commit, generated timestamp, and scanned roots.

WHY: Agents need to know whether an index can be trusted before using it for impact analysis or search.

### High: Add Structured Search Output

Keep human-readable search output, but add JSON output for agents and future MCP tools.

WHY: Agent interoperability depends on structured data. Free-form terminal text is brittle across models.

### High: Define Generated Artifact Policy

Define which AI Brain files are canonical, generated, temporary, archived, or task-scoped.

WHY: Search and memory quality depend on not confusing generated convenience artifacts with maintained source-of-truth documents.

### High: Introduce Review Finding IDs

Every review finding should have a stable ID, severity, status, owner, and follow-up field.

WHY: Stable IDs allow findings to move from review documents into backlog, implementation, and verification workflows.

### Medium: Add Affected-Scope Validation Mapping

Map changed paths to recommended validation commands and escalation rules.

WHY: The platform can maintain validation discipline at scale only if routine checks are fast enough to run consistently.

### Medium: Add Memory Lifecycle States

Use states such as `active`, `resolved`, `superseded`, `archived`, and `needs-review`.

WHY: Agents need to distinguish current constraints from historical notes.

### Medium: Add Repository Profiles

Each future repository should declare its role, owned domains, package manager, validation commands, platform targets, and canonical docs.

WHY: Multi-repo AI agents need deterministic startup context and validation rules per repository.

### Medium: Add Search Relevance Tiers

Search should prefer current canonical documents, then maintained summaries, then active memory, then historical memory, then generated artifacts.

WHY: Relevance order prevents agents from overvaluing old context packs or stale review notes.

### Medium: Add Operational Metrics To AI Brain Scripts

Index and search scripts should report file count, skipped count, elapsed time, output paths, and warning counts.

WHY: Lightweight metrics identify bottlenecks early without adding a monitoring platform.

### Low: Add Optional Local FTS Backend Later

When linear search becomes slow, add a local full-text backend such as SQLite FTS.

WHY: Local FTS preserves offline operation and avoids the operational burden of a remote service.

### Low: Add Semantic Retrieval Only After Metadata Is Reliable

Embeddings can help with discovery once authority, freshness, and lifecycle fields exist.

WHY: Semantic retrieval without governance makes stale or duplicated content more persuasive.

## Overengineering Risks

### Medium: Building Enterprise Search Too Early

Adding vector databases, remote indexing services, or multi-service orchestration now would create cost and maintenance overhead before the content volume demands it.

WHY: The immediate problem is not search infrastructure. It is lack of metadata, authority, and lifecycle contracts.

### Medium: Making AI Brain Too Rigid

Heavy schemas can discourage developers from updating docs.

WHY: Knowledge systems only work when updates are easy. Metadata should be minimal, validated, and template-supported.

### Low: Treating All Reviews As Blocking Gates

Making every review finding a hard blocker would slow routine work and train developers to avoid review workflows.

WHY: Findings need severity, ownership, and status, not automatic blanket enforcement.

## Underengineering Risks

### High: No Freshness Enforcement

Without stale-content checks, old decisions and generated context will remain searchable forever.

WHY: Stale knowledge is worse than missing knowledge because agents may use it confidently.

### High: No Multi-Repo Contract

Without repo identity and federation rules, each repository will invent its own AI Brain conventions.

WHY: Inconsistent conventions destroy agent portability and increase onboarding cost.

### High: No Concurrency Strategy

Many agents writing to the same Markdown memory files will create conflicts and duplication.

WHY: Collaboration scale requires write-path design, even if storage remains simple.

### Medium: No Search Quality Tests

Search can regress silently as documents grow.

WHY: Agents depend on search results during discovery. Poor retrieval creates poor implementation and review outcomes.

### Medium: No Retention Policy

Context packs, reviews, and memory entries can grow without bound.

WHY: Unbounded knowledge growth increases retrieval noise and repository churn.

## Missing Modules For Scale

### High: AI Brain Schema Validator

A validator should check metadata, required fields, generated index freshness, memory lifecycle states, and review finding structure.

WHY: Contracts are only useful if drift is detected automatically.

### High: Review Finding Registry

A registry should track findings across architecture, SDLC, agent, knowledge, scalability, security, release, and incident reviews.

WHY: Reviews should produce a managed improvement backlog, not isolated documents.

### High: Workspace Registry

A workspace-level registry should describe all repositories, owners, roles, dependencies, and canonical knowledge roots.

WHY: Multi-repo scale requires a map before agents can reason safely across repositories.

### Medium: Retrieval Profile Catalog

Profiles should define what an agent reads for startup, architecture review, feature implementation, release readiness, incident response, and knowledge updates.

WHY: Context loading needs to be predictable and bounded.

### Medium: Memory Compaction And Archive Tool

A tool should summarize old memory, preserve links to source entries, and move stale entries to archives.

WHY: Human-readable memory will otherwise become too large for daily use.

### Medium: AI Brain Health Report

A generated report should show stale files, missing owners, overdue reviews, index age, search latency, memory size, and generated artifact count.

WHY: Platform health needs visible leading indicators before bottlenecks become failures.

### Low: Local Full-Text Index

Add local FTS only when linear search crosses the performance threshold.

WHY: This is a useful future module, but metadata and freshness should come first.

## Architecture Evolution Roadmap

### Phase 0: Current State

Markdown-first knowledge, local scripts, generated repo index, simple search, append memory, strong broad validation gate.

Recommended posture: Keep this model while the repo is small.

### Phase 1: Contract Hardening

Add metadata templates, schema versions, freshness checks, review finding IDs, JSON search output, generated artifact policy, and basic script metrics.

WHY: This phase creates scale readiness without changing the operating model.

### Phase 2: Single-Repo Scale

Add incremental indexing, search records, scoped validation, memory lifecycle states, memory archives, and search quality tests.

WHY: This phase handles growth inside one large repository.

### Phase 3: Multi-Repo Federation

Add workspace registry, repo profiles, per-repo indexes, federated search, cross-repo impact hints, and shared AI Brain contract versioning.

WHY: This phase handles multiple repositories without centralizing all content prematurely.

### Phase 4: Multi-Agent Platform

Expose read-only MCP resources, agent-neutral context packets, retrieval profiles, structured handoff packets, and optional semantic retrieval.

WHY: This phase makes AI Brain a portable platform for many agent types while preserving governance.

### Phase 5: Enterprise Knowledge Operations

Add governance dashboards, ownership review workflows, incident knowledge ingestion, release evidence archives, and deeper observability.

WHY: This phase should happen only after volume and organizational complexity justify it.

## Recommended Near-Term Actions

1. Define metadata front matter for AI Brain canonical documents and review artifacts.

WHY: This is the smallest change that improves search quality, ownership, lifecycle management, and future federation.

2. Add schema and freshness metadata to generated indexes.

WHY: Agents need to know whether generated context reflects the current repo.

3. Add JSON output mode to search.

WHY: Structured retrieval is required for future MCP compatibility and model-independent agent workflows.

4. Create a review finding registry.

WHY: Existing review documents contain durable recommendations that should be trackable over time.

5. Define generated artifact retention rules.

WHY: Generated context packs and indexes should not become stale pseudo-source-of-truth files.

6. Add a basic AI Brain health check.

WHY: Early health signals prevent premature infrastructure while exposing real scale pressure.

7. Design affected-scope validation before the repo becomes large.

WHY: Validation discipline is easier to preserve if scoped gates exist before full gates become painful.

## Final Assessment

AI Brain is well-sized for the current Makdolan repository, but its current architecture is intentionally simple and will not survive 300k+ LOC, multiple repositories, 40 developers, and many agents without stronger contracts.

The future-proof path is incremental:

- Keep Markdown and local scripts now.
- Add metadata, schema versions, lifecycle states, and freshness checks next.
- Add incremental indexing and structured retrieval when scale indicators justify it.
- Add multi-repo federation and MCP resources only after the core contracts are stable.

The highest-risk future bottleneck is not performance in isolation. It is stale, duplicated, non-authoritative knowledge being retrieved confidently by agents. Solving that requires governance metadata before heavier search infrastructure.
