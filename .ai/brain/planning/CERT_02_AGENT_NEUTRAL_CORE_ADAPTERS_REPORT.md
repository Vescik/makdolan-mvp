# CERT-02 Agent-Neutral Core And Adapters Report

Metadata:

| Field | Value |
| --- | --- |
| id | `cert-02-agent-neutral-core-adapters-report` |
| class | `memory` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Records completion evidence for CERT-02; certification backlog remains the status source. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Report ID: `MAKDOLAN::AI-BRAIN::CERT-02::AGENT-NEUTRAL-CORE-ADAPTERS-REPORT`

Date: 2026-06-27

Status: Complete.

## Objective

Complete `CERT-02: Agent-neutral core and adapters` by separating AI Brain's durable operating contract from Codex-specific runtime behavior while keeping Codex fully supported as an adapter.

## Scope

Implemented docs/tooling hardening only.

No app behavior, dependency, remote service, MCP server, embedding, vector database, automation activation, release, deployment, credential, database, auth, payment, or product-scope behavior was introduced.

## Phase Completion

| Phase | Status | Evidence |
| --- | --- | --- |
| Phase 0: Discovery and impact | Complete | Ran `npm run brain:impact -- "CERT-02 agent-neutral core and adapters"` during discovery and again after generator wording changes for final evidence. |
| Phase 1: Core contract and adapters | Complete | Added `.ai/brain/agent-start.md`, `.ai/brain/adapters/README.md`, `.ai/brain/adapters/codex.md`, and `.ai/brain/adapters/generic-agent.md`. |
| Phase 2: Neutral reusable wording | Complete | Updated context-pack template, context-pack README, context-pack generator, and impact analyzer wording from Codex-only to agent-neutral language. |
| Phase 3: Certification closeout | Complete | Updated certification backlog, memory, report, and regenerated AI Brain index. |

## Completed Acceptance Criteria

- Agent-neutral startup contract exists at `.ai/brain/agent-start.md`.
- Codex-specific behavior is documented as adapter behavior in `.ai/brain/adapters/codex.md`.
- Generic agent guidance exists in `.ai/brain/adapters/generic-agent.md`.
- Adapter catalog exists in `.ai/brain/adapters/README.md`.
- Agent-neutral handoff packet template exists at `.ai/brain/templates/agent-handoff-packet-template.md`.
- AI Brain entrypoints now reference the neutral startup contract and adapter model.
- Reusable context-pack and impact analyzer outputs use agent-neutral wording.
- `CERT-02` is marked implemented in `.ai/brain/certification/CERTIFICATION_BACKLOG.md`.
- AI Brain index and memory are updated.

## Changed Files

- `.ai/brain/agent-start.md`
- `.ai/brain/adapters/README.md`
- `.ai/brain/adapters/codex.md`
- `.ai/brain/adapters/generic-agent.md`
- `.ai/brain/templates/agent-handoff-packet-template.md`
- `.ai/brain/README.md`
- `.ai/brain/knowledge/agent-session-start.md`
- `.ai/brain/index/README.md`
- `AGENTS.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/templates/context-pack-template.md`
- `.ai/brain/context-packs/README.md`
- `.ai/brain/scripts/create-context-pack.mjs`
- `.ai/brain/scripts/analyze-impact.mjs`
- `.ai/brain/context-packs/2026-06-26T22-51-40-715Z-cert-02-agent-neutral-smoke.md`
- `.ai/brain/context-packs/2026-06-26T22-51-46-449Z-impact-cert-02-agent-neutral-core-and-adapters.md`
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md`
- `.ai/brain/planning/CERT_02_AGENT_NEUTRAL_CORE_ADAPTERS_REPORT.md`
- `.ai/brain/memory/implementation-history.md`
- `.ai/brain/index/repo-map.json`
- `.ai/brain/index/file-catalog.md`
- `.ai/brain/index/module-map.md`

## Validation Evidence

| Command | Result | Evidence |
| --- | --- | --- |
| `node --check .ai/brain/scripts/create-context-pack.mjs` | PASS | Script syntax check completed without output. |
| `node --check .ai/brain/scripts/analyze-impact.mjs` | PASS | Script syntax check completed without output. |
| `npm run brain:context -- "CERT-02 agent-neutral smoke" --phase=DISCOVER` | PASS | Generated `.ai/brain/context-packs/2026-06-26T22-51-40-715Z-cert-02-agent-neutral-smoke.md` with `load this into an agent session` wording and agent-neutral startup files. |
| `npm run brain:impact -- "CERT-02 agent-neutral core and adapters"` | PASS | Generated `.ai/brain/context-packs/2026-06-26T22-51-46-449Z-impact-cert-02-agent-neutral-core-and-adapters.md` with `The agent must still inspect` wording. |
| `npm run brain:index` | PASS | Regenerated AI Brain index; indexed 224 files across 70 directories. |
| `npm run brain:search -- "agent-neutral startup" --limit=5` | PASS | Top matches included the generated CERT-02 smoke context pack, implementation memory, `AGENTS.md`, `.ai/brain/knowledge/agent-session-start.md`, and `.ai/brain/README.md`. |
| `npm run brain:health` | PASS | Report-only health check passed with 0 errors and 0 warnings; generated-text secret scan covered 101 files. |
| `git diff --check` | PASS | Diff hygiene passed. |
| `bash scripts/diff-gate.sh` | PASS | Ran 7 validation commands: diff hygiene, staged diff hygiene, untracked hygiene, typecheck, lint, tests, and web build. Tests passed: 4 files, 28 tests. Web export completed to `dist/`. |

## Remaining Risks

- Dedicated adapters for ChatGPT, Claude Code, GitHub Copilot, and Gemini are intentionally deferred. They should be added only when generic guidance causes repeated ambiguity or runtime behavior materially differs.
- Direct AI Brain health/search scope for certification and adapter docs remains a separate `CERT-06` backlog concern unless later work chooses to broaden scan roots.
- Historical generated context packs still contain older Codex wording by design. They were not rewritten because generated artifact lifecycle policy discourages editing history in place.

## Next Recommended Action

Proceed to the next open certification condition after final validation and commit:

- `CERT-03`: Change-scope validation profiles.
- `CERT-04`: AI Brain script tests and smoke checks.
- `CERT-08`: Keep automation report-only until activation validation exists.
