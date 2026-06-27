# Makdolan AI Brain Agent Platform Review

Date: 2026-06-26

Role: AI Agent Platform Engineer

Scope: Review whether AI Brain can support Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, and future LLM agents. This review covers portability, prompt independence, context quality, interoperability, session startup, context retrieval, memory model, tool usage, future MCP compatibility, and places where the current platform is overly coupled to one model or agent runtime.

This is a review artifact only. It does not implement new functionality.

## Executive Summary

AI Brain is portable in intent but Codex-centric in implementation. The strongest parts are the repository-local Markdown knowledge base, deterministic Node scripts, local validation commands, and source-of-truth discipline. These can be used by nearly any capable coding agent.

The weak point is orchestration. AI Brain currently assumes Codex concepts in its startup path, goal mode, hooks, subagents, worktrees, automation templates, review commands, CI AI workflows, and naming. That is acceptable for the first platform implementation, but it will block clean use by ChatGPT, Claude Code, GitHub Copilot, Gemini, and future agents unless the platform is split into a neutral core plus adapter layers.

Recommended direction: make `.ai/brain/` the vendor-neutral operating core and move Codex-specific runtime behavior into explicit adapters. The neutral core should define task contracts, context bundles, memory schemas, tool manifests, validation contracts, and MCP/resource contracts in agent-independent language. Codex, Claude Code, Copilot, Gemini, and ChatGPT should each consume the same contracts through thin adapter documents or scripts.

## Overall Assessment

| Area | Current State | Portability Assessment |
|---|---|---|
| Portability | Partial | Markdown and npm scripts are portable; `.codex/`, `/goal`, hooks, and `codex review` are not. |
| Prompt independence | Partial | Good templates exist, but several outputs say "paste into Codex" or assume Codex behavior. |
| Context quality | Strong | Product, architecture, module, risk, testing, and memory context are well organized. |
| Interoperability | Weak to Partial | Humans and Codex can use it well; other agents lack adapter instructions and contracts. |
| Session startup | Codex-biased | `AGENTS.md` and `agent-session-start.md` are useful, but startup references Codex-specific files and expectations. |
| Context retrieval | Moderate | `brain:search` and repo index work offline, but output is unstructured text and keyword-only. |
| Memory model | Moderate | Memory is clear, but not schema-backed or agent-neutral in language. |
| Tool usage | Codex-biased | Safety rules are good, but sandbox, hook, goal, worktree, and review concepts map directly to Codex. |
| Future MCP compatibility | Early | Docs mention MCP, but no agent-neutral MCP manifest, resource map, or tool contract exists. |

## What Is Already Agent-Portable

- Markdown knowledge files under `.ai/brain/knowledge/` can be read by any agent.
- Source-of-truth docs under `docs/`, `project-context/`, and `knowledge-base/` are not tied to a single model.
- npm scripts such as `brain:index`, `brain:search`, `brain:impact`, `brain:context`, and `brain:memory:update` are runtime-portable as long as the agent can run shell commands.
- Validation commands are standard repository commands, not model-specific commands.
- Goal contract templates are mostly agent-neutral if `/goal` language is treated as optional.
- Maker/checker flow can work with any reviewer model or human if the Codex-specific section is isolated.
- Memory files are plain Markdown and therefore portable at the storage layer.
- Security rules and scope boundaries are broadly applicable to any agent.

## Over-Coupling Inventory

### `AGENTS.md`

Coupling:

- The mission says "Codex must optimize..." rather than "Agents must optimize..."
- The default lifecycle is titled "Default Codex lifecycle."
- AI Brain rules mention creating a "Codex `/goal`" and `codex review --uncommitted`.
- Memory and done rules are written as Codex obligations.

Impact:

- Other agents may treat `AGENTS.md` as a Codex-only instruction file or ignore parts that do not match their runtime.
- GitHub Copilot, Claude Code, ChatGPT, and Gemini do not necessarily understand `/goal`, Codex review, or Codex-specific hooks.

Recommendation:

- Keep `AGENTS.md` for Codex compatibility, but introduce an agent-neutral `.ai/brain/agent-start.md` or `.ai/brain/agent-contract.md` as the canonical cross-agent instruction source. `AGENTS.md` should become one adapter that points Codex to the neutral contract.

### `.ai/brain/knowledge/agent-session-start.md`

Coupling:

- The file is useful and mostly neutral, but it starts from `AGENTS.md`, which is Codex-centric.
- The checklist assumes the same instruction hierarchy for every agent.

Impact:

- Agents without `AGENTS.md` convention need a clearer direct entrypoint.

Recommendation:

- Rename conceptually to "agent session start" and add an "Agent Runtime Notes" section with variants for Codex, ChatGPT, Claude Code, Copilot, Gemini, and generic CLI agents.

### `.ai/brain/README.md`

Coupling:

- It says AI Brain helps "Codex and human maintainers" instead of "agents and human maintainers."

Impact:

- The platform identity is narrower than the user's stated multi-agent target.

Recommendation:

- Make the README vendor-neutral and add a short adapter map that points to `.codex/`, future `.claude/`, future Copilot instructions, future Gemini instructions, and MCP manifests.

### `.ai/brain/templates/context-pack-template.md`

Coupling:

- It says "paste into Codex" and has "Notes For Codex."

Impact:

- Context packs are one of the most reusable artifacts, but their wording discourages use by non-Codex agents.

Recommendation:

- Rename the section to "Notes For Agents" and define target-neutral context-pack rules. Adapter-specific paste instructions can live in separate files such as `.ai/brain/adapters/codex.md` and `.ai/brain/adapters/chatgpt.md`.

### `.ai/brain/scripts/create-context-pack.mjs`

Coupling:

- Generated packs say "paste this into Codex to start discovery."
- Likely files include `AGENTS.md` as the primary repository rules file.

Impact:

- Every generated context pack bakes in Codex as the assumed consumer.

Recommendation:

- Add an `--agent=` option or generate neutral language by default. The default should be "paste or load this into an agent session." Agent-specific formatting should be optional.

### `.ai/brain/scripts/analyze-impact.mjs`

Coupling:

- Generated impact analysis says "Codex must still inspect..."
- AREA_RULES include "AI Brain tooling" tokens with `codex` as a primary token and `.codex` as likely module prefix.

Impact:

- Impact analysis over-identifies Codex files for generic AI Brain work and reinforces Codex as the only execution agent.

Recommendation:

- Split "AI Brain core" rules from "Codex adapter" rules. Use agent-neutral wording in output and include adapter-specific files only when the planned change mentions Codex or touches `.codex/`.

### `.ai/brain/scripts/create-repo-index.mjs`

Coupling:

- Important config patterns include `.codex/` and `.agents/skills/`.
- Module names classify `.codex` and `.agents` but not other agent surfaces.
- Important file names include `AGENTS.md`, but not future neutral instruction names.

Impact:

- The index treats Codex as a first-class platform module and has no comparable representation for Claude Code, Copilot, Gemini, ChatGPT, MCP, or neutral agent adapters.

Recommendation:

- Add an agent-adapter classification model: `ai-brain-core`, `agent-adapter-codex`, `agent-adapter-claude`, `agent-adapter-copilot`, `agent-adapter-gemini`, `agent-adapter-chatgpt`, `mcp-contracts`. Make the index schema explicit rather than path-hardcoded.

### `.ai/brain/scripts/search-brain.mjs`

Coupling:

- Search targets include `AGENTS.md` but not a neutral agent contract.
- Search output is free-text, not a machine-readable resource response that multiple agents can consume.

Impact:

- It works for humans and shell-capable agents but is less suitable for MCP resource retrieval or agents that need structured context.

Recommendation:

- Keep text output, but add `--json` with path, title/headings, snippets, score, source type, freshness, and recommended next reads. This will support MCP and model-agnostic retrieval.

### `.ai/brain/loop-harness/codex-setup.md`

Coupling:

- The entire file is a Codex adapter, which is appropriate.

Impact:

- The problem is not that it exists; the problem is that there are no equivalent adapters for other agents.

Recommendation:

- Move or mirror it under `.ai/brain/adapters/codex.md`. Add placeholder adapter contracts for ChatGPT, Claude Code, GitHub Copilot, Gemini, and generic agents.

### `.ai/brain/loop-harness/permissions-policy.md`

Coupling:

- Uses Codex-specific mode names: `workspace-write`, `read-only`, `danger-full-access`, approval policy, and Codex network config.

Impact:

- The safety model is good, but other agents use different permission concepts. Claude Code, Copilot, ChatGPT, and Gemini may not expose identical sandbox names.

Recommendation:

- Split into two layers: an agent-neutral capability policy and per-agent mappings. The neutral layer should define capabilities such as read repo files, write workspace files, run shell commands, use network, mutate git, call external APIs, read secrets, deploy, and use MCP tools.

### `.ai/brain/loop-harness/maker-checker-flow.md`

Coupling:

- Has a Codex Review Command section with `codex review --uncommitted`.
- Cross-tool review exists but is secondary.

Impact:

- Other agents can use the process, but the local preferred checker is Codex.

Recommendation:

- Make the main maker/checker flow agent-neutral. Move Codex review command into a "Codex adapter" subsection and add equivalent adapter slots for Claude Code review, ChatGPT review, Copilot PR review, Gemini review, and human review.

### `.ai/brain/loop-harness/worktree-policy.md`

Coupling:

- Uses "Codex-managed worktrees," "Codex Handoff," and `codex/` branch prefix.

Impact:

- Worktree isolation is broadly useful, but the policy currently assumes Codex owns background automation.

Recommendation:

- Define neutral "agent-managed worktrees" and reserve prefixes by runtime: `codex/`, `claude/`, `copilot/`, `gemini/`, `chatgpt/`, or a neutral `agent/` prefix. The core policy should not depend on Codex Handoff.

### `.ai/brain/loop-harness/automation-policy.md`

Coupling:

- Existing automation is described as `.codex/hooks.json`, `.codex/automations/templates/`, Codex nightly discovery, and Codex PR review.
- Hook review references Codex hook review.

Impact:

- Automation safety guidance is useful but not portable to GitHub Copilot, Claude Code, ChatGPT tasks, Gemini, or MCP servers.

Recommendation:

- Create a neutral automation policy with adapter mappings. Distinguish GitHub Actions, local hooks, MCP scheduled tools, agent-native automations, and human-run scripts.

### `.ai/brain/loop-harness/how-to-write-good-goals.md`

Coupling:

- Defines goals as "Codex `/goal`" prompts.

Impact:

- The concept is broadly useful, but the slash command is Codex-specific.

Recommendation:

- Rename the concept to "goal contract" in the neutral core and document `/goal` as only one execution method.

### `.ai/brain/knowledge/module-catalog.md`

Coupling:

- Lists `.codex/` as project-scoped Codex policy and `.agents/skills/` as local reusable Codex skills.

Impact:

- Accurate today, but it does not model agent adapters or neutral AI Brain modules.

Recommendation:

- Add a section that distinguishes AI Brain core modules from agent-runtime adapters.

### `.ai/brain/memory/*`

Coupling:

- Memory docs say memory helps the next "Codex session."
- Implementation history repeatedly records Codex-specific setup as core AI Brain work.

Impact:

- Storage is portable, but language and historical framing are Codex-specific.

Recommendation:

- Make future memory entries agent-neutral where possible. Add optional metadata fields: `agent_runtime`, `tool_surface`, `adapter`, `source_context`, `validation`, and `reviewer`.

### `.github/workflows/codex-pr-review.yml` and `.github/workflows/codex-nightly-discovery.yml`

Coupling:

- Workflows depend on `openai/codex-action@v1` and `OPENAI_API_KEY`.

Impact:

- These workflows are not portable to Claude, Copilot, Gemini, or generic MCP agents. They are valid Codex adapters, not AI Brain core infrastructure.

Recommendation:

- Rename conceptually as Codex adapter workflows and define a neutral CI interface for AI review reports. Keep them non-blocking until signal quality is measured.

### `.codex/`

Coupling:

- Entire directory is Codex-specific by design: config, hooks, rules, subagents, state, automations.

Impact:

- This is appropriate as an adapter. It becomes a problem only when AI Brain core docs treat `.codex/` as the universal agent runtime.

Recommendation:

- Keep `.codex/` as a Codex adapter. Do not delete it. Add sibling or neutral adapter documentation for other tools rather than forcing all agents into Codex semantics.

### `.agents/skills/`

Coupling:

- Skills are local Codex skills in current usage. Some descriptions explicitly say "for Codex."

Impact:

- The skill content is useful, but other platforms may not load this format.

Recommendation:

- Promote reusable skill content into neutral playbooks under `.ai/brain/playbooks/`, then generate or mirror agent-native skill formats from those playbooks.

### `scripts/codex-loop.sh` and `scripts/collect-context.sh`

Coupling:

- `codex-loop.sh` hardcodes `codex exec` and writes under `.codex/runs`.
- `collect-context.sh` writes under `.codex/context`.

Impact:

- These are not portable orchestration commands.

Recommendation:

- Treat them as Codex adapter scripts. Add a neutral `scripts/agent-context.sh` or `npm run brain:bundle` that writes under `.ai/brain/generated/` and can be consumed by any agent.

## Review By Required Dimension

### Portability

What works:

- Plain Markdown, npm scripts, shell commands, and local repo structure are highly portable.
- Validation commands are tool-agnostic.
- Source docs are not model-dependent.

What fails portability:

- Codex-specific files are interwoven with core AI Brain docs.
- Context packs and impact outputs name Codex as the consumer.
- Hooks, goals, subagents, worktrees, and review commands assume Codex.

Architecture changes:

- Establish `.ai/brain/core/` for neutral policies and `.ai/brain/adapters/` for runtime-specific mappings.
- Move Codex-specific guidance from generic harness docs into `.ai/brain/adapters/codex.md`.
- Define a neutral agent capability model independent of any sandbox naming.

### Prompt Independence

What works:

- Goal contracts, impact templates, review templates, and memory templates reduce reliance on improvised prompts.
- Context packs point to source files instead of dumping full source.

What fails prompt independence:

- Many instructions rely on a specific agent reading and obeying prose.
- Context packs are not schema-backed.
- There is no minimum required context contract for agents with smaller context windows.

Architecture changes:

- Add schema-backed artifacts for context packs, goal contracts, impact analyses, and memory entries.
- Provide both Markdown and JSON outputs.
- Add "must-read" and "optional-read" sections with token budgets and freshness metadata.

### Context Quality

What works:

- Product, architecture, module, testing, risk, and memory docs are strong.
- Repo index and search improve discoverability.
- Known risks and product boundaries are repeatedly stated.

Weaknesses:

- Context packs are generic and Codex-framed.
- Search is keyword-only and can miss semantic relationships.
- Generated context has no freshness or confidence metadata beyond timestamps.

Architecture changes:

- Add context quality metadata: source authority, generated time, last verified time, confidence, stale-after policy, and source-of-truth class.
- Add JSON retrieval results and optional embeddings later.
- Separate durable source context from task-local generated context.

### Interoperability

What works:

- Any agent that can read files and run shell commands can use much of AI Brain.
- Cross-tool review is acknowledged in maker/checker flow.

Weaknesses:

- There are no explicit instructions for ChatGPT, Claude Code, GitHub Copilot, Gemini, or generic agents.
- No common exchange format exists for handoff between agents.
- No agent-output contract exists for plans, reviews, validation evidence, or memory updates.

Architecture changes:

- Add `.ai/brain/contracts/` with `task-contract`, `context-pack`, `validation-evidence`, `review-report`, and `memory-entry` schemas.
- Add `.ai/brain/adapters/{codex,chatgpt,claude-code,copilot,gemini,generic}.md`.
- Define a common handoff packet format that any agent can read and update.

### Session Startup

What works:

- Startup checklist exists.
- `AGENTS.md` gives a clear project overview and validation rules.
- AI Brain README explains directory purpose.

Weaknesses:

- Startup is Codex-first and assumes `AGENTS.md` discovery.
- No startup variants exist for ChatGPT, Claude Code, Copilot, Gemini, or MCP clients.
- No compact "universal bootstrap" exists for agents without repository instruction loading.

Architecture changes:

- Create `.ai/brain/agent-start.md` as the universal entrypoint.
- Create adapter startup files:
  - `.ai/brain/adapters/codex.md`
  - `.ai/brain/adapters/chatgpt.md`
  - `.ai/brain/adapters/claude-code.md`
  - `.ai/brain/adapters/github-copilot.md`
  - `.ai/brain/adapters/gemini.md`
  - `.ai/brain/adapters/generic-agent.md`
- Keep each adapter short and make the neutral core authoritative.

### Context Retrieval

What works:

- `brain:search` works offline.
- Repo index gives file/module inventory.
- Impact analyzer provides likely affected areas.

Weaknesses:

- Output is primarily human-readable text.
- No MCP resource API exists.
- No `--json` output exists.
- Search target list is hardcoded.
- Retrieval does not rank by source authority or freshness.

Architecture changes:

- Add `brain:search --json`.
- Add `brain:context --json`.
- Add `brain:index` schema versioning.
- Add MCP resources for knowledge files, memory, module map, repo map, and search results.
- Add a retrieval manifest listing sources, authority level, and stale-after windows.

### Memory Model

What works:

- Memory categories are useful: implementation history, open decisions, sprint summaries.
- Memory rules warn against secrets and raw chat.
- Memory helper provides structured appends.

Weaknesses:

- Markdown-only memory is hard for agents to query reliably.
- Memory entries do not include structured fields for agent runtime, source, confidence, tags, owner, or expiry.
- Language references Codex sessions rather than agent sessions.

Architecture changes:

- Keep Markdown for humans, but add machine-readable sidecars or front matter.
- Add fields: `type`, `date`, `status`, `agent_runtime`, `adapter`, `source_files`, `validation`, `review`, `decisions`, `follow_ups`, `expires_or_review_after`.
- Add memory query command with JSON output.

### Tool Usage

What works:

- Safety policies are thoughtful.
- Validation commands are explicit.
- Dangerous operations require approval.

Weaknesses:

- Tool usage policies map to Codex sandbox names and hooks.
- No generic tool capability matrix exists.
- No per-agent "what tools can this agent safely use" mapping exists.

Architecture changes:

- Define a neutral capability matrix:
  - read files
  - write files
  - run shell
  - run tests
  - use network
  - access browser
  - access GitHub
  - use MCP tools
  - mutate external systems
  - deploy
  - read secrets
- Then map each agent runtime to those capabilities.

### Future MCP Compatibility

What works:

- `.codex/config.toml` includes disabled MCP examples.
- `docs/CONNECTORS_AND_MCP.md` defines good MCP principles.
- Security docs mention least-privilege tokens for MCP/connectors.

Weaknesses:

- No MCP server/resource contract exists for AI Brain.
- No MCP-safe context boundaries are defined.
- No resource templates exist for task context, memory, search, validation, or reviews.
- MCP is documented as a Codex configuration feature rather than an agent-neutral integration layer.

Architecture changes:

- Add `.ai/brain/mcp/manifest.md` or `.ai/brain/mcp/resources.json`.
- Define read-only resources:
  - `brain://knowledge/{name}`
  - `brain://memory/implementation-history`
  - `brain://memory/open-decisions`
  - `brain://index/repo-map`
  - `brain://search?q=...`
  - `brain://task-context/{id}`
  - `brain://validation/latest`
- Define write-capable tools only after explicit approval:
  - create context pack
  - append memory entry
  - create review report
  - create open decision
- Keep secrets and `.env.local` out of MCP resources by design.

## Target Architecture

Recommended structure:

```text
.ai/brain/
  core/
    agent-contract.md
    lifecycle.md
    capability-policy.md
    context-policy.md
    memory-policy.md
    validation-policy.md
    review-policy.md
  contracts/
    context-pack.schema.json
    goal-contract.schema.json
    impact-analysis.schema.json
    validation-evidence.schema.json
    review-report.schema.json
    memory-entry.schema.json
    handoff-packet.schema.json
  adapters/
    codex.md
    chatgpt.md
    claude-code.md
    github-copilot.md
    gemini.md
    generic-agent.md
  playbooks/
    discovery.md
    planning.md
    execution.md
    verification.md
    release-readiness.md
    knowledge-maintenance.md
  mcp/
    resources.md
    tools.md
    security.md
  generated/
    context-packs/
    impact-analyses/
    indexes/
```

Principles:

- AI Brain core should never require Codex-specific features.
- Agent adapters should be thin and disposable.
- Generated artifacts should be clearly separated from durable operating knowledge.
- Every core artifact should have a human-readable Markdown form and, where useful, a machine-readable JSON/schema form.
- MCP should consume the same contracts as local scripts.

## Recommended Architecture Changes

### 1. Split AI Brain core from agent adapters

Why:

- Codex is currently both the primary runtime and the implicit architecture. That prevents clean adoption by Claude Code, Copilot, Gemini, ChatGPT, or future agents.

Change:

- Create a neutral core instruction layer and move Codex-specific behavior into `.ai/brain/adapters/codex.md`.

### 2. Add agent-neutral startup contract

Why:

- Session startup is the first portability point. If startup is Codex-specific, every downstream agent inherits that coupling.

Change:

- Add `.ai/brain/agent-start.md` with universal startup steps, source hierarchy, validation expectations, and safety rules. Keep `AGENTS.md` as the Codex adapter entrypoint.

### 3. Add structured contract schemas

Why:

- Markdown-only artifacts are readable but hard for multiple agents to validate consistently.

Change:

- Add JSON schemas or front matter contracts for context packs, goals, impact analysis, reviews, validation evidence, handoffs, and memory entries.

### 4. Make scripts output agent-neutral text and JSON

Why:

- Current scripts are useful but embed Codex wording and produce only human-readable output.

Change:

- Add `--json` to search, index, context, impact, and memory helpers. Replace "Codex must" language with "agent must" language by default.

### 5. Define a common handoff packet

Why:

- Multi-agent workflows need a predictable way to transfer context from one model/runtime to another.

Change:

- Create a handoff packet contract with task, scope, files read, assumptions, decisions, commands run, validation, remaining risks, and next action.

### 6. Create adapter playbooks for each target agent

Why:

- Different agents have different context loading, tool execution, and permission models.

Change:

- Add concise adapter docs for Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, and generic future agents. Each adapter should map AI Brain core concepts to that runtime's capabilities.

### 7. Build an MCP resource/tool plan around AI Brain contracts

Why:

- MCP is the likely path for cross-agent context retrieval and safe tool invocation.

Change:

- Define read-only MCP resources first. Add write tools only after schema validation, approval rules, and secret exclusions are in place.

### 8. Promote `.agents/skills` into neutral playbooks

Why:

- Skills are valuable but runtime-specific. Playbooks are reusable across agents.

Change:

- Store neutral playbooks in AI Brain and generate or mirror Codex skills, Claude commands, Copilot instructions, or Gemini prompts from them.

### 9. Introduce source authority and freshness metadata

Why:

- Different agents need to know what to trust when docs, generated context packs, and memory disagree.

Change:

- Mark sources as authoritative, derivative, generated, historical, or local runtime state. Add stale-after or review-after metadata for generated artifacts.

### 10. Keep vendor-specific CI isolated

Why:

- `openai/codex-action@v1` is useful but should not define the general AI review architecture.

Change:

- Treat Codex GitHub workflows as one AI review adapter. Define a neutral AI review output format that other providers can implement.

## Priority Roadmap

### Near Term

1. Write `.ai/brain/agent-start.md` as the universal agent bootstrap.
2. Add `.ai/brain/adapters/codex.md` and move Codex-specific guidance there conceptually.
3. Update future generated context/impact wording from "Codex" to "agent."
4. Add `--json` output to `brain:search`.
5. Define source authority labels for AI Brain docs, generated artifacts, memory, and product docs.

### Medium Term

1. Add schemas for context packs, goal contracts, validation evidence, review reports, and memory entries.
2. Add adapter docs for ChatGPT, Claude Code, GitHub Copilot, Gemini, and generic agents.
3. Create neutral playbooks from `.agents/skills`.
4. Add a handoff packet format.
5. Add search/retrieval freshness checks.

### Later

1. Expose AI Brain as MCP read-only resources.
2. Add approved MCP write tools for context packs and memory entries.
3. Add provider-neutral AI review report contracts.
4. Add semantic retrieval if keyword search becomes insufficient.

## Final Assessment

AI Brain can become a strong multi-agent platform, but it is not there yet. Today it is a Codex-first SDLC platform with portable content. The right evolution is not to remove Codex support; Codex should remain a high-quality adapter. The architectural change is to stop treating Codex as the core abstraction.

The future-proof model is:

- AI Brain core owns durable project context, lifecycle contracts, memory, validation policy, review policy, retrieval, and MCP resources.
- Agent adapters map that core into Codex, ChatGPT, Claude Code, GitHub Copilot, Gemini, and future LLM agents.
- Scripts and generated artifacts use agent-neutral language and machine-readable contracts.
- Vendor-specific tools remain optional adapters, not the platform foundation.
