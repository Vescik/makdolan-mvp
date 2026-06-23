# Codex Mobile/Web Pipeline Starter

This starter configures Codex as an engineering pipeline for a project that targets **iOS, Android, and Web**.

Core loop:

1. **Discover** – inspect requirements, product context, repo structure, existing architecture, risks, and platform constraints.
2. **Plan** – create an implementation plan, verification matrix, affected files list, and rollback strategy.
3. **Execute** – make the smallest correct change, update tests/docs, avoid unrelated refactors.
4. **Verify** – run deterministic checks: lint, typecheck, tests, platform builds, smoke checks.
5. **Iterate / Learn** – fix verification failures, update durable knowledge, document decisions, and improve `AGENTS.md` only when repeated mistakes are observed.

## Recommended first install

```bash
# macOS / Linux
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

Then from the repository root:

```bash
codex "/init and then compare the generated AGENTS.md with the committed AGENTS.md. Keep the stricter rules from this repo."
```

## What is included

- `AGENTS.md` – durable repository guidance for Codex.
- `.codex/config.toml` – project-level Codex configuration.
- `.codex/agents/*.toml` – custom subagents for discovery, planning, execution, verification, release.
- `.agents/skills/*/SKILL.md` – reusable skills that Codex can invoke.
- `.agents/plugins/cross-platform-build-loop` – optional plugin package for sharing the workflow.
- `.github/workflows/*` – GitHub Actions examples for verification and Codex PR review.
- `scripts/codex-loop.sh` – local non-interactive loop runner.
- `scripts/verify-local.sh` – stack-aware local verifier.
- `docs/*` – setup guide, connector/MCP matrix, templates.

## Minimum rule

Do not ask Codex to “build the app” as one huge task. Feed it one feature, bug, or user story at a time and force it through the loop.

Good prompt:

```text
Use the build-loop skill. Implement the login screen for iOS, Android, and Web.
Discover the current stack first, then plan, execute, verify, and update docs.
Done when lint/tests/build checks pass or you clearly list the failing command and reason.
```

Bad prompt:

```text
Create my whole app and deploy it to stores.
```
