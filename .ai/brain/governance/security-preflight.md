# AI Brain Security And Session Preflight

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-security-preflight` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines session-start security checks, shell guardrails, recovery triggers, and automation activation checklist. |
| domain | AI Brain security and automation governance |
| created | 2026-06-26 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

## Purpose

This preflight keeps AI Brain work safe before agents read deeply, edit files, run shell commands, or activate automation. It does not replace `.ai/brain/loop-harness/permissions-policy.md` or `.ai/brain/loop-harness/automation-policy.md`; it is the startup checklist that points to those policies.

## Session Startup Preflight

Run this check at the start of large, ambiguous, security-sensitive, automation-related, AI Brain governance, or multi-file tasks.

| Check | Required action |
| --- | --- |
| Scope | Confirm the task is implementation, review, planning, or docs-only. Respect explicit "do not implement" requests. |
| Active permissions | Compare the active runtime mode with repository policy: prefer `workspace-write`, user approval, network off. |
| Network posture | Keep network off unless the task explicitly needs approved docs, dependencies, connectors, release, or deployment access. |
| Secrets | Do not read, print, summarize, or persist `.env.local`, tokens, credentials, auth headers, private user data, or payment data. |
| Repository state | Run or inspect `git status --short` before risky edits when user changes may exist. Do not overwrite unrelated user work. |
| Artifact class | Identify whether target files are canonical, generated, advisory, memory, archive, template, or adapter. |
| Source authority | For product/architecture/security/release facts, read canonical sources instead of relying on generated or advisory artifacts. |
| Validation expectation | Identify whether full `bash scripts/diff-gate.sh` or a narrower justified validation set will be needed. |
| Stop conditions | Stop before destructive, release, credential, networked automation, database, payment, auth, or production operations without approval. |

## Shell Execution Guardrails

Prefer explicit, local, reversible commands. Treat these command families as approval-sensitive even when a rule does not prompt automatically:

- Recursive deletion or cleanup: `rm -rf`, `find ... -delete`, `git clean`, broad `mv`, broad `truncate`.
- Git publication/history changes: `git push`, force push, rebase of shared branches, history rewriting.
- Dependency mutation: `npm install`, `npm update`, `npm audit fix`, `npm dedupe`, lockfile writes.
- Networked installers: `curl | sh`, `wget | sh`, arbitrary downloaded scripts.
- Release/deployment: Fastlane, app store commands, hosting deploys, production build publication.
- Credentials: key creation, rotation, storage, copying, or printing.
- Database/payment/auth operations: migrations, destructive data commands, payment configuration, auth provider changes.

Safe default:

- Use read-only commands for discovery.
- Use `apply_patch` for manual file edits.
- Use validation commands that are documented in `AGENTS.md` or package scripts.
- Do not invent cleanup commands for generated files unless the generated status is clear and user work is protected.

## Generated Text Secret Hygiene

Generated text includes context packs, reviews, memory entries, reports, indexes, automation outputs, and final summaries.

Rules:

- Never include actual secret values.
- Mention environment variable names only when needed.
- If command output names `.env.local` or exported variable names without values, do not expand them.
- If a generated artifact contains a secret, stop, remove the secret from the working tree, rotate the credential if exposure occurred, and report without quoting the value.

Run the local report-only scan with:

```bash
npm run brain:health
```

The health check scans generated AI Brain artifacts, memory, reviews, planning reports, docs, project context, and knowledge-base text for common secret patterns without reading `.env.local` or using network access.

## Recovery Triggers

Stop and recover before continuing when:

- A command modified unexpected files.
- A generated artifact appears to contain sensitive data.
- A canonical source conflicts with an advisory or generated artifact.
- Runtime permissions are broader than expected for the task.
- Automation would write outside an approved report path.
- Validation fails for reasons outside the task scope.

Recovery steps:

1. Stop making further changes.
2. Inspect `git status --short`.
3. Inspect diffs before restoring anything.
4. Preserve unrelated user work.
5. Restore only unintended changes.
6. Rotate credentials if secrets were exposed.
7. Re-run relevant validation.
8. Record an open decision or memory entry if risk remains.

## Automation Activation Checklist

No automation may be enabled only because a template exists. Before activating any automation, all fields below must be documented and reviewed.

Use `.ai/brain/governance/automation-activation-validation.md` and run:

```bash
npm run brain:automation:check -- path/to/automation-activation-record.md
```

This validator is report-only. It checks the activation record but does not enable automation.

| Field | Required answer |
| --- | --- |
| Owner | Human owner or accountable role. |
| Purpose | What the automation detects or reports. |
| Trigger | Manual, schedule, PR, hook, or other trigger. |
| Cadence | How often it runs, if scheduled. |
| Sandbox | Read-only preferred; workspace-write only for approved report paths. |
| Network | Off by default; explicit reason if enabled. |
| Secrets | Required secrets, or explicit "none". |
| Output path | Approved local report path. |
| Write scope | Read-only, report-only, or explicitly approved mutation. |
| Validation | Commands or checks that prove output is safe/useful. |
| Stop conditions | Conditions that halt instead of continuing. |
| Rollback/disable path | How to disable the automation and revert outputs. |
| First-run review | Human review required before acting on findings. |
| Data exposure | What repository data leaves the local checkout, if any. |
| Approval record | Where human sign-off is recorded. |

Activation is blocked when:

- No owner exists.
- Network is required but not approved.
- The run needs secrets, `.env.local`, credentials, private user data, production data, deployment, release, database, payment, or auth access.
- The automation would mutate source, dependencies, CI, release settings, credentials, product decisions, architecture decisions, or generated build output without explicit approval.
- The checkout has unrelated changes and no isolated worktree is available.

## Approved Sprint 0 Stance

During Epic 2 Hardening Sprint 0:

- Do not enable automations.
- Do not add remote services.
- Do not add vector databases or embeddings.
- Do not add MCP servers.
- Do not automate deletion of old artifacts.
- Do not change app behavior.

Future sprints may add read-only or report-only automation only after this checklist is satisfied, `npm run brain:automation:check` passes for the activation record, and human sign-off is recorded.
