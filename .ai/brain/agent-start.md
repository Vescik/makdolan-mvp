# AI Brain Agent Start

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-agent-start` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines the agent-neutral startup contract for AI Brain sessions across supported agent runtimes. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

This is the universal startup contract for AI Brain. Use it before large, ambiguous, cross-platform, security-sensitive, governance, or multi-file work regardless of whether the runtime is Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, or a future Markdown-reading agent.

Runtime-specific behavior belongs in `.ai/brain/adapters/`. The adapter may add operational details, but it must not override canonical source-of-truth, security, lifecycle, validation, or memory rules.

## Source Hierarchy

Use sources in this order when they conflict:

1. Canonical repository and AI Brain governance files:
   - `.ai/brain/governance/source-of-truth-map.md`
   - `.ai/brain/governance/security-preflight.md`
   - `.ai/brain/governance/artifact-lifecycle-policy.md`
   - `.ai/brain/governance/retrieval-contracts.md`
   - `.ai/brain/governance/memory-integrity-model.md`
   - `.ai/brain/governance/developer-onboarding.md`
2. Product, architecture, data, security, and validation source documents:
   - `docs/`
   - `project-context/`
   - `knowledge-base/`
3. Active AI Brain knowledge summaries:
   - `.ai/brain/knowledge/*.md`
4. Runtime adapter instructions:
   - `.ai/brain/adapters/*.md`
   - `AGENTS.md` for Codex-facing repository behavior
5. Generated, advisory, memory, archive, and template artifacts only after checking their class, status, freshness, and authority.

Review reports are advisory until accepted in `.ai/brain/governance/review-finding-registry.md`. Context packs and impact reports are generated navigation aids, not source of truth.

## Startup Checklist

1. Identify the active agent runtime and read the matching adapter:
   - Codex: `.ai/brain/adapters/codex.md`
   - Any Markdown-reading shell-capable agent without a dedicated adapter: `.ai/brain/adapters/generic-agent.md`
2. Read `.ai/brain/README.md` for the AI Brain directory map and usage model.
3. Run the security/session preflight from `.ai/brain/governance/security-preflight.md`.
4. Use `.ai/brain/governance/source-of-truth-map.md` to classify target files before relying on them.
5. Choose a workflow mode from `.ai/brain/governance/developer-onboarding.md`.
6. Read `.ai/brain/knowledge/agent-session-start.md` for Makdolan-specific startup context.
7. Read the relevant source documents and inspect affected code or docs directly before planning edits.
8. Create or use a context pack when startup context would otherwise be scattered.
9. Plan before editing unless the task is a tiny, low-risk direct command or read-only answer.
10. Capture a handoff packet before stopping mid-task or transferring work to another agent.

## Safety Rules

- Do not read, print, summarize, copy, or persist `.env.local`, credentials, tokens, authorization headers, private user data, payment data, or secret values.
- Do not enable automations, hooks with side effects, remote services, MCP servers, vector databases, embeddings, deployment flows, credential changes, migrations, auth, payment, or release behavior unless the user explicitly approves that scope.
- Do not treat generated artifacts as current without checking freshness and source commit where available.
- Do not treat advisory reviews as mandatory work unless their findings are accepted in the review finding registry.
- Do not modify application behavior during discovery, planning, review, or certification tasks unless the task explicitly changes into implementation.
- Use the smallest local, deterministic validation path that fits the change, then escalate when risk or blast radius requires it.

## Validation Expectations

Use `.ai/brain/knowledge/testing-map.md` and `.ai/brain/governance/developer-onboarding.md` to choose validation commands.

For meaningful AI Brain governance, generated artifact, retrieval, memory, certification, or onboarding changes, run:

```bash
npm run brain:health
git diff --check
bash scripts/diff-gate.sh
```

For docs-only changes, app build checks may be skipped only when the final report states why app behavior did not change. For script changes, run syntax checks and a representative smoke command for the changed script.

## Memory Expectations

Update `.ai/brain/memory/` after meaningful implementation, workflow, validation, governance, certification, or AI Brain changes.

Use:

- `.ai/brain/governance/memory-integrity-model.md` for memory status and provenance.
- `.ai/brain/memory/memory-update-checklist.md` for routing.
- `.ai/brain/memory/implementation-history.md` for completed implementation or governance changes.
- `.ai/brain/memory/open-decisions.md` for unresolved assumptions, deferred decisions, approval needs, or scope questions.

Memory should record durable decisions, outcomes, validation evidence, and follow-ups. It must not duplicate full source files, raw chat transcripts, or secrets.

## Generated Artifact Handling

Generated artifacts include context packs, impact reports, repo indexes, file catalogs, module maps, and generated planning reports. Before using them:

1. Check the class and freshness policy in `.ai/brain/governance/artifact-lifecycle-policy.md`.
2. Confirm whether the artifact is current enough for the task.
3. Follow links to canonical sources and inspect those sources directly.
4. Regenerate instead of manually editing generated files when the generator owns the content.
5. Do not rewrite historical generated artifacts unless the task explicitly approves it.

## Handoff Requirements

Use `.ai/brain/templates/agent-handoff-packet-template.md` whenever work is paused, transferred, resumed by a different agent, or at risk of losing context.

The handoff must include:

- Task and objective.
- Current SDLC phase.
- Source files read.
- Decisions made.
- Assumptions.
- Changed files.
- Commands run.
- Validation evidence.
- Unresolved risks.
- Next action.
- Stop conditions.

Handoff packets should be concise and source-linked. They are operational context, not source of truth.
