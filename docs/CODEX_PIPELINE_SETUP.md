# Codex Pipeline Setup Guide

## Target architecture

Use a layered setup:

1. `AGENTS.md` for stable repo rules.
2. `.codex/config.toml` for local/project execution policy, sandbox, MCP config, and subagent limits.
3. `.codex/agents/*.toml` for narrow subagents.
4. `.agents/skills/*` for repeatable workflows.
5. Optional plugin package when the workflow should be shared between projects.
6. GitHub Actions for deterministic verification and optional Codex PR review.

## Why this shape

- `AGENTS.md` keeps Codex aligned with repository conventions.
- Skills keep repeated workflows reusable without bloating every prompt.
- Subagents are useful for parallel discovery/review, but should not be used for every tiny change.
- Hooks and CI provide deterministic guardrails; they should not replace normal tests.
- MCP/connectors should be added only where they provide real context or actions.

## First commands

```bash
# From repo root
codex "Summarize active instruction files and project config."

# Check MCP status in interactive Codex
/mcp

# Check plugin list in interactive Codex
/plugins

# Run local verifier
bash scripts/verify-local.sh
```

## Suggested first Codex prompt

```text
Use the build-loop skill.
Task: bootstrap the project structure for a cross-platform iOS, Android, and Web app.
Discover the current repo first. If no stack exists, compare Flutter, Expo/React Native, and web-first Capacitor only at a high level, then recommend one based on the files already present and the product constraints.
Plan before editing. Execute only the minimal bootstrap. Verify with available commands. Update knowledge-base with the chosen architecture decision.
```

## Permission profiles

Default local work:

- `sandbox_mode = "workspace-write"`
- `approval_policy = "on-request"`

CI/non-interactive work:

- Prefer read-only for review.
- Use workspace-write only for patching in isolated branches.
- Do not use full access outside a disposable runner/container.

## Step 5: Iterate / Learn

This is not optional. After verification, Codex should:

- Fix failed checks when possible.
- Write down what could not be verified.
- Update tests/docs.
- Update stable project knowledge.
- Suggest one clean commit message.
