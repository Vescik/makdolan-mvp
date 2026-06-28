# Permissions Policy

Makdolan work should be safe by default.

## Recommended Codex Mode

Default project mode:

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "user"

[sandbox_workspace_write]
network_access = false
```

This is the recommended baseline for normal implementation because it permits scoped local edits and validation while preserving approval boundaries.

Before large, ambiguous, security-sensitive, automation-related, or AI Brain governance work, run the session preflight in `.ai/brain/governance/security-preflight.md`.

## When To Use Read-Only

Use `read-only` for:

- Discovery, audits, reviews, and planning.
- Inspecting unfamiliar or untrusted changes.
- Security/privacy analysis.
- Any task where the user explicitly says not to modify files.

Read-only mode is not a substitute for secret hygiene. Do not read or print secrets just because the filesystem is read-only.

## When To Use Workspace-Write

Use `workspace-write` for:

- Focused implementation inside the repository.
- AI Brain documentation and memory updates.
- Running local validation.
- Creating context packs, repo indexes, or impact reports.

Keep writable scope limited to the repository unless the user explicitly approves additional writable roots.

## When Not To Use Full Access

Do not use `danger-full-access` for routine Makdolan work. It removes filesystem and network sandbox boundaries.

Avoid full access when:

- The task can be completed with `workspace-write`.
- The task involves secrets, credentials, private data, payments, authentication, or release systems.
- The branch or repository state is unfamiliar.
- The operation could deploy, push, migrate, delete, or alter external systems.

Full access requires explicit human approval and should be limited to isolated environments where the risk is understood.

## Allowed Without Extra Approval

- Reading repository files.
- Editing scoped documentation or source files requested by the task.
- Running local validation commands.
- Creating planning artifacts under `.ai/brain/`.

## Requires Explicit Approval

- Destructive operations such as recursive deletion outside a clearly generated local artifact.
- Database migrations or destructive data changes.
- Production deployments.
- Store release actions.
- Credential creation, rotation, or storage changes.
- Payment, authentication, or private user data changes.
- Git push when not explicitly requested.
- Networked automation that calls external systems.

## Network Access

Network is off by default for project workspace-write sessions.

Allowed only with explicit task need:

- Official documentation lookup.
- Dependency installation or update when the task explicitly approves it.
- Approved MCP/app connector use.
- Release or deployment commands only after explicit release approval.

Forbidden without approval:

- Posting repository data to external services.
- Reading untrusted web content into a coding session.
- Downloading arbitrary scripts.
- Sending source code, secrets, `.env.local`, credentials, tokens, private user data, or build logs containing sensitive data to external systems.

Use narrow one-off overrides instead of changing project defaults:

```bash
codex -c sandbox_workspace_write.network_access=true
```

## Secrets

Never read, print, summarize, or persist secrets from `.env.local` or any credential store. Use environment variable names and setup instructions without exposing values.

## Approval Boundary

If a task needs to cross these boundaries, stop and ask for approval before acting:

- Change Codex sandbox or approval policy.
- Enable a project hook that modifies files or runs long validation automatically.
- Enable network access by default.
- Add an MCP server that can read private data or mutate external systems.
- Change release, deployment, credential, payment, authentication, or database settings.

Also stop when runtime permissions are broader than the task requires and the next command would cross repository, network, credential, release, or destructive-operation boundaries.
