# AI Brain Security Review

Review ID: `MAKDOLAN::AI-BRAIN::EPIC1.5::SECURITY-REVIEW`

Role: Security Architect

Date: 2026-06-26

Scope: AI Brain permissions, Codex project configuration, hooks, automation policy, memory model, generated artifacts, shell execution, repository safety, accidental destructive actions, data integrity, reliability, and recovery strategies.

Non-goal: This review does not change permissions, enable hooks, modify automation, edit scripts, rotate credentials, or implement security controls.

## Executive Summary

Makdolan's AI Brain security posture is intentionally conservative at the repository policy level. The project config recommends `workspace-write`, `approval_policy = "on-request"`, and network disabled by default. Hooks are limited to prompt secret scanning and a non-blocking verification reminder. Automation policy explicitly forbids deployments, releases, credential operations, database migrations, dependency changes, external messages, and source mutation without approval.

The main risks are not from current active automation. They come from boundary drift: sessions can run with broader permissions than the repository recommends, shell commands are still powerful inside the workspace, generated AI Brain artifacts can become stale or misleading, memory writes are append-oriented without strong integrity controls, and future automations could become too privileged if activation criteria are bypassed.

The highest-priority security improvements should be policy and validation improvements rather than new infrastructure: permission preflight checks, generated artifact classification, AI Brain integrity checks, safer shell command wrappers, memory entry lifecycle rules, and recovery runbooks.

## Current Security Baseline

| Area | Current state | Assessment |
| --- | --- | --- |
| Permissions | `.codex/config.toml` recommends `workspace-write`, user approval, network off. | Strong baseline, but runtime sessions can still be broader than config. |
| Hooks | Prompt secret scan and non-blocking stop reminder. | Narrow and appropriate. Secret scan is best-effort only. |
| Automation | Disabled templates plus explicit activation criteria and stop conditions. | Strong governance if followed. |
| CI | GitHub workflows run verification and optional Codex review/discovery gated by `OPENAI_API_KEY`. | Useful, but external AI workflows need strict data exposure review. |
| Memory | Markdown memory files and helper script. | Readable, but weak integrity, lifecycle, and concurrency controls. |
| Generated artifacts | Indexes and context packs under `.ai/brain/`. | Helpful, but need authority/freshness classification. |
| Shell execution | Local scripts use shell commands for validation; diff gate calls npm scripts. | Necessary, but broad shell execution needs guardrails and recovery. |
| Repository safety | Rules prompt for selected destructive/release commands. | Good start, but command coverage is incomplete. |

## Strengths

### Low: Safe Defaults Are Documented

The repository documents safe default permissions: `workspace-write`, `approval_policy = "on-request"`, and network disabled in workspace-write mode.

WHY: Clear permission defaults reduce accidental escalation and make deviations easier to identify.

### Low: Hooks Are Narrow

Current hooks do not deploy, push, install dependencies, call external APIs, rewrite source files, or run expensive validation automatically.

WHY: Hooks run implicitly, so they should remain narrow and predictable.

### Medium: Automation Policy Is Explicit

The automation policy requires owners, manual testing, sandbox/network posture, validation, stop conditions, rollback, and human sign-off before activation.

WHY: Future automation risk is controlled primarily by activation discipline.

### Medium: Secret Handling Policy Exists

Project instructions and AI Brain templates explicitly warn against reading, copying, printing, or persisting `.env.local`, tokens, credentials, private user data, and authorization headers.

WHY: Preventing secret ingestion into prompts, memory, and reports is the most important AI-agent security control.

### Medium: Validation Gate Avoids Fix Commands

`scripts/diff-gate.sh` is validation-only and does not run package-manager fix commands or mutate source files intentionally.

WHY: Validation automation is safer when it observes rather than remediates.

## Findings

### High: Runtime Permissions Can Exceed Repository Policy

The repository recommends `workspace-write` with network off, but actual agent sessions or desktop contexts can run with unrestricted filesystem and network access. Repository policy does not automatically enforce the active runtime mode.

Security risk: An agent may read or modify files outside intended workspace boundaries, use network unexpectedly, or perform privileged filesystem operations.

Data integrity risk: Broad access increases the blast radius of accidental writes, deletes, or generated artifact placement.

Reliability risk: Work may depend on local state outside the repository and become non-reproducible.

Recovery strategy:

- Stop the session if a command would cross repository boundaries.
- Inspect `git status --short` and untracked files.
- Restore unintended repository changes from git.
- For possible secret exposure, assume compromise and rotate affected credentials.
- Re-run validation in the recommended narrower mode before trusting results.

Recommendation:

Add a permission preflight checklist to AI Brain startup and security-sensitive task templates.

WHY: Agents need to compare active runtime permissions against repository policy before executing commands, especially during audits, automation work, and security reviews.

### High: Shell Execution Is Broad Inside The Workspace

Local workflows rely on shell execution for validation, indexing, git checks, and npm scripts. The current command rules prompt for `rm -rf`, `git push`, and selected Fastlane release commands, but many destructive or integrity-sensitive commands are not explicitly covered.

Security risk: Commands such as `find ... -delete`, `git clean -fd`, `npm audit fix`, `npm update`, `mv`, `truncate`, `chmod -R`, `curl | sh`, or custom scripts could alter the repository or environment unexpectedly.

Data integrity risk: Generated files, memory, docs, lockfiles, or source files could be overwritten without a clean audit trail.

Reliability risk: Local validation may pass after unintended dependency or generated output changes.

Recovery strategy:

- Use `git status --short` and `git diff --stat` immediately after suspicious shell activity.
- Use git to inspect and selectively restore unintended tracked-file edits.
- Remove unintended generated artifacts only after confirming they are generated and not user work.
- Reinstall dependencies with the lockfile if dependency state was modified.
- Re-run `bash scripts/diff-gate.sh`.

Recommendation:

Expand command guardrails for high-risk command families and document safe alternatives.

WHY: `rm -rf` is not the only destructive path. AI-agent safety needs intent-based guardrails for dependency mutation, recursive deletion, release commands, credential commands, and arbitrary networked installers.

### High: Secret Scan Hook Is Best-Effort And Prompt-Only

The prompt hook detects common patterns such as OpenAI-style keys, GitHub tokens, AWS access keys, and private key headers. It does not scan generated files, command output, memory updates, CI logs, or all possible token formats.

Security risk: Secrets can still enter `.ai/brain/`, generated reports, terminal logs, or model context through command output or copied files.

Data integrity risk: Once a secret is written into memory or reviews, later agents may propagate it.

Reliability risk: False confidence in secret scanning can weaken human vigilance.

Recovery strategy:

- If a secret may have been exposed, do not quote it in reports.
- Remove it from files and history according to repository policy.
- Rotate the credential at the provider.
- Review generated artifacts and memory files for propagation.
- Add a post-incident memory entry without including the secret value.

Recommendation:

Treat the hook as a warning layer, not a complete secret prevention system. Add optional repository secret scanning for tracked and generated text outputs.

WHY: AI workflows create many text artifacts. Prompt scanning alone does not protect memory, generated reports, or command output.

### High: Generated Artifacts Lack Trust Boundaries

Context packs, index files, impact reports, and review artifacts can influence future agents. They are generated or agent-authored, but not all have metadata showing authority, freshness, source commit, owner, or expiry.

Security risk: Agents may follow stale or unreviewed instructions embedded in generated files.

Data integrity risk: Generated artifacts can conflict with source-of-truth docs and create knowledge drift.

Reliability risk: Future tasks may use outdated context packs or review recommendations as current operating rules.

Recovery strategy:

- Prefer source-of-truth docs when generated artifacts conflict.
- Regenerate indexes from current repository state.
- Archive or delete expired generated context only with approval and after checking git status.
- Record superseded findings instead of silently rewriting history.

Recommendation:

Classify AI Brain artifacts as `canonical`, `generated`, `advisory`, `memory`, or `archive`, with freshness and source metadata.

WHY: Security and reliability depend on knowing which documents are authoritative and which are convenience outputs.

### High: Memory Integrity Controls Are Weak

AI Brain memory is human-readable Markdown updated by append/insert helpers. Entries do not have stable IDs, provenance, source commit, signer/author, lifecycle status, or strong duplicate/supersession controls.

Security risk: Malicious or mistaken entries can become durable instructions for future agents.

Data integrity risk: Conflicting memory entries can accumulate without clear resolution.

Reliability risk: Agents may retrieve old assumptions as current decisions.

Recovery strategy:

- Compare memory entries against source-of-truth docs before acting on them.
- Mark inaccurate entries as superseded rather than deleting without trace.
- Use git history to recover previous memory state.
- Add a corrected memory entry with explicit source evidence.

Recommendation:

Add structured memory metadata and review status before memory volume grows.

WHY: Memory is an instruction surface. It needs integrity controls similar to other long-lived operational knowledge.

### High: Automation Activation Depends On Human Discipline

The automation policy is strong, but enforcement is mostly procedural. Disabled templates could be copied into active automations without machine validation of owner, sandbox, network policy, output path, stop conditions, and rollback.

Security risk: Overprivileged automation may call external systems, write files, or operate on dirty checkouts.

Data integrity risk: Recurring automation may generate noisy reports or modify files outside approved paths.

Reliability risk: Scheduled jobs can fail silently, produce stale reports, or create worktree conflicts.

Recovery strategy:

- Disable the automation immediately.
- Preserve the run output for audit.
- Inspect affected worktree and generated files.
- Revert unauthorized changes.
- Review whether secrets, external systems, or private data were touched.

Recommendation:

Require an automation activation checklist and validator before enabling any scheduled or hook-based automation.

WHY: Automation risk comes from repeated execution. Activation should fail closed when required safety fields are missing.

### Medium: CI AI Workflows May Send Repository Context To External AI

Codex nightly discovery and PR review workflows use `openai/codex-action@v1` when `OPENAI_API_KEY` is configured. These workflows are useful but introduce external model processing of repository context.

Security risk: Sensitive repository content could be sent to an external AI service if future private data or secrets enter tracked files.

Data integrity risk: AI-generated review comments may be treated as authoritative without human verification.

Reliability risk: Workflows depend on external service availability and action behavior.

Recovery strategy:

- Disable or skip the workflows by removing the secret or changing workflow triggers.
- Review recent workflow logs and comments.
- If sensitive data was exposed, rotate affected credentials and follow provider incident response.
- Require human review before acting on findings.

Recommendation:

Document data exposure boundaries for AI CI workflows and keep permissions minimal.

WHY: External AI review is a security boundary, not just a productivity tool.

### Medium: Diff Gate Runs Broad Project Scripts

`scripts/diff-gate.sh` runs package scripts such as typecheck, lint, tests, and web build. It intentionally does not fix issues, but it executes project-defined commands.

Security risk: If package scripts are modified maliciously or accidentally, the diff gate will execute the modified commands.

Data integrity risk: Build commands can generate output such as `dist/`; untracked hygiene checks may interact with new files.

Reliability risk: Broad validation may fail due to environment changes unrelated to the task.

Recovery strategy:

- Inspect `package.json` script diffs before running broad gates on untrusted branches.
- Run validation in a clean worktree for untrusted changes.
- Remove generated build output from tracked changes unless intentionally included.
- Re-run after restoring package scripts.

Recommendation:

For untrusted branches, inspect package scripts before running diff gate or use a restricted validation profile.

WHY: A validation script is only as safe as the commands it delegates to.

### Medium: Generated Build Output Can Pollute Repository State

`npm run build:web` writes to `dist/`. Current git hygiene should prevent committing generated build output, but repeated validation can still create local noise.

Security risk: Generated output could accidentally include environment-derived data if build configuration changes in the future.

Data integrity risk: Developers may accidentally stage generated files or compare stale build output.

Reliability risk: Local build artifacts can confuse scans and search if exclusion rules drift.

Recovery strategy:

- Confirm `dist/` remains ignored or excluded.
- Delete generated build output only when sure it is not user-authored.
- Re-run build from a clean checkout when validating release behavior.

Recommendation:

Keep generated build output excluded from AI Brain indexes and review artifacts.

WHY: Build artifacts are reproducible outputs, not durable source knowledge.

### Medium: Context Packs Can Capture Sensitive Task Details

Context packs are designed not to copy source or secrets, but their task names and summaries are user-provided and written into files.

Security risk: A task title or summary could include credentials, private data, incident details, or sensitive business context.

Data integrity risk: Sensitive or inaccurate task summaries can persist and appear in search results.

Reliability risk: Old task packs can mislead agents after the task is complete.

Recovery strategy:

- Remove sensitive context pack content from the working tree.
- Rotate any exposed secret.
- Add a sanitized replacement if the task context is still needed.
- Archive or expire old packs.

Recommendation:

Add a pre-write warning or validation rule for context pack inputs.

WHY: Generated files are still repository artifacts. Inputs need the same secret hygiene as prompts.

### Medium: Review Artifacts Can Become Policy Without Approval

Security, architecture, automation, knowledge, and scalability reviews contain recommendations but are not necessarily accepted decisions.

Security risk: Agents may follow recommendations that change security posture without approval.

Data integrity risk: Reviews may conflict with canonical policy files.

Reliability risk: Multiple reviews can produce overlapping or contradictory guidance.

Recovery strategy:

- Treat review findings as advisory until promoted to canonical docs or tracked decisions.
- Create follow-up decisions for accepted changes.
- Mark rejected or superseded findings explicitly.

Recommendation:

Add review finding status and owner metadata.

WHY: Security recommendations need lifecycle state so future agents know what is advisory versus adopted policy.

### Medium: Local Hook Trust Is A Supply Chain Surface

Project hooks execute local Python scripts after the repository is trusted. Current scripts are simple, but hooks are a general execution mechanism.

Security risk: A malicious hook change could execute arbitrary commands during prompt submission or stop.

Data integrity risk: Hooks could modify files without clear user intent.

Reliability risk: Broken hooks can interrupt normal agent workflows.

Recovery strategy:

- Review hook diffs before trusting project hooks.
- Disable hooks if behavior is suspicious.
- Inspect `.codex/hooks.json` and `.codex/hooks/`.
- Restore known-good hook files from git.

Recommendation:

Require hook review for any hook diff and keep hooks small, deterministic, and repository-local.

WHY: Hooks run implicitly and should be treated like privileged workflow code.

### Medium: MCP Configuration Examples Could Become Privileged Integrations

`.codex/config.toml` includes disabled MCP examples. Future MCP servers may read private data or mutate external systems.

Security risk: Enabling MCP tools can expand data access and external mutation capability.

Data integrity risk: Tools may modify GitHub, issue trackers, cloud services, or knowledge systems.

Reliability risk: External tool failures can block workflows or produce partial changes.

Recovery strategy:

- Disable the MCP server.
- Revoke or rotate its credentials if needed.
- Audit external actions performed by the tool.
- Restore repository state from git if local files changed.

Recommendation:

Require a connector threat model before enabling MCP servers with external access.

WHY: MCP turns agent prompts into tool calls across trust boundaries.

### Low: Stop Reminder Hook Is Non-Blocking

The stop hook writes a reminder and exits 0 even if validation was not performed.

Security risk: Low direct security risk.

Data integrity risk: Work may be finalized without required validation if humans ignore the reminder.

Reliability risk: Broken changes can pass local workflow until CI.

Recovery strategy:

- Run `bash scripts/diff-gate.sh` before finalizing meaningful work.
- Use CI as a backstop.
- For high-risk changes, use maker-checker review.

Recommendation:

Keep the hook non-blocking by default, but add task-type-specific validation evidence checks before major completion.

WHY: Blocking every stop can be too expensive, but high-risk work needs stronger evidence.

### Low: Command Guardrails Are Pattern-Based

`.codex/rules/default.rules` guards selected command prefixes. Pattern rules are easy to understand but incomplete.

Security risk: Alternate destructive command forms may bypass prompts.

Data integrity risk: Accidental cleanup commands can remove useful local files.

Reliability risk: Safety depends on agent judgment for commands not listed.

Recovery strategy:

- Inspect git status after cleanup commands.
- Recover tracked files from git.
- Recover untracked files from backups or editor history when possible.

Recommendation:

Broaden command rule coverage over time based on observed near misses.

WHY: Pattern-based rules should evolve from real workflow risk, not speculative completeness.

## Risk Matrix

| Risk | Severity | Likelihood | Impact |
| --- | --- | --- | --- |
| Runtime permission escalation beyond repo policy | High | Medium | High |
| Secret exposure through generated files or command output | High | Medium | High |
| Overprivileged future automation | High | Medium | High |
| Stale generated artifacts guiding agents | High | High | Medium |
| Memory corruption or stale memory recall | High | Medium | Medium |
| Destructive shell command outside explicit guardrails | High | Low-Medium | High |
| CI AI workflow data exposure | Medium | Low-Medium | High |
| Package script mutation before validation | Medium | Low | High |
| Hook supply chain change | Medium | Low | High |
| Generated build artifact pollution | Medium | Medium | Medium |

## Data Integrity Risks

1. Memory entries can be appended with incorrect or stale information.

Recovery: Add correction or supersession entries, then link back to source-of-truth docs.

2. Generated indexes can be stale.

Recovery: Regenerate with `npm run brain:index` after verifying the checkout is clean enough.

3. Context packs can outlive their task.

Recovery: Archive or mark expired packs and prefer canonical docs in search.

4. Review artifacts can be mistaken for accepted policy.

Recovery: Promote accepted findings into canonical policy or decision files; mark advisory findings as pending.

5. Package scripts can be modified and then executed by validation.

Recovery: Review `package.json` diffs before running broad validation on untrusted changes.

6. Generated build output can appear in working tree.

Recovery: Confirm it is ignored/generated and remove or leave unstaged as appropriate.

## Reliability Risks

1. Hooks may fail silently or be ignored.

Recovery: Keep CI as the hard gate and run manual validation for important work.

2. External AI CI workflows depend on secrets and provider availability.

Recovery: Workflows skip when `OPENAI_API_KEY` is absent; human review and normal CI remain required.

3. Broad validation may be too slow as the repository grows.

Recovery: Add scoped validation profiles before broad gates become routinely skipped.

4. Automation reports may become noisy.

Recovery: Require first-run review, severity thresholds, retention policy, and owner assignment.

5. Multi-agent writes can conflict.

Recovery: Use separate worktrees, inspect git status, and avoid concurrent writes to canonical memory files.

## Repository Safety Controls To Preserve

- Keep network off by default in project workspace-write mode.
- Keep destructive, release, and push commands approval-gated.
- Keep automation disabled until explicitly approved.
- Keep hooks small and repository-local.
- Keep `.env.local` and credentials out of AI Brain scans and memory.
- Keep generated build output excluded from durable knowledge.
- Keep CI validation active for PRs and `main`.
- Keep human approval for product, architecture, release, dependency, credential, payment, auth, and data operations.

## Recommended Improvements

### High: Add Permission Preflight To AI Brain Startup

Add a startup checklist item requiring the agent to note active sandbox mode, network posture, and whether the task should be read-only.

WHY: Repository policy is only useful if agents notice when the active runtime is broader than expected.

### High: Add AI Brain Artifact Classification

Classify files as canonical, generated, advisory, memory, archive, or temporary.

WHY: Agents need to know whether a file is trusted policy, generated context, or historical evidence.

### High: Add Secret Scan Coverage For Generated Text

Add a report-only scan over AI Brain generated artifacts, memory, reviews, and docs.

WHY: Prompt scanning does not protect repository artifacts created after a prompt is accepted.

### High: Add Automation Activation Validator

Validate owner, sandbox, network, output path, permissions, validation, rollback, and stop conditions before enabling scheduled automation.

WHY: Automation runs repeatedly and needs fail-closed governance.

### High: Add Memory Integrity Metadata

Add IDs, dates, status, source evidence, supersession, and owner/reviewer fields to durable memory entries.

WHY: Memory is an operational instruction source and should not be an unstructured append-only sink.

### Medium: Broaden Command Guardrails

Add guardrails for dependency mutation, recursive deletion variants, git cleanup commands, release commands, credential commands, and networked installers.

WHY: Destructive actions are not limited to `rm -rf`.

### Medium: Add Generated Index Freshness Checks

Generated index files should include source commit, generation time, schema version, and scanned roots.

WHY: Stale indexes are a data integrity risk for AI agents.

### Medium: Add Review Finding Lifecycle

Add statuses such as proposed, accepted, rejected, superseded, implemented, and archived.

WHY: Advisory review findings should not silently become policy.

### Medium: Add CI Workflow Data Exposure Notes

Document what repository content AI CI workflows can send to external AI services and how to disable them.

WHY: AI review workflows cross a data boundary and should be explicit.

### Low: Keep Stop Hook Non-Blocking For Now

Do not make full diff gate a default stop hook yet.

WHY: Expensive blocking hooks can train developers to disable safety controls. Use stronger gating only for high-risk tasks or explicit opt-in.

## Recovery Playbooks

### Accidental Source Or Documentation Modification

1. Stop making changes.
2. Run `git status --short`.
3. Inspect diffs for affected files.
4. Preserve user-authored changes.
5. Restore only unintended changes.
6. Run `git diff --check`.
7. Re-run relevant validation.

### Accidental Generated Artifact Modification

1. Identify whether the file is generated, advisory, memory, or canonical.
2. If generated, regenerate from current source if appropriate.
3. If advisory or memory, do not delete silently; mark corrected/superseded when the file has durable value.
4. Run untracked hygiene checks.

### Suspected Secret Exposure

1. Do not repeat or quote the secret.
2. Remove it from working files.
3. Rotate the credential at its provider.
4. Search generated AI Brain artifacts and memory for propagation.
5. Review git history if it was committed.
6. Document the incident without secret values.

### Suspicious Hook Behavior

1. Disable or stop trusting the hook.
2. Inspect `.codex/hooks.json` and `.codex/hooks/`.
3. Restore known-good hook files from git.
4. Check whether files were modified.
5. Re-run validation.

### Overprivileged Automation Run

1. Disable the automation.
2. Preserve logs and reports for audit.
3. Inspect local and external actions performed.
4. Revert unauthorized repository changes.
5. Rotate credentials if secrets or external systems were touched.
6. Require a new activation review before re-enabling.

### Failed Or Noisy AI CI Review

1. Treat findings as advisory.
2. Confirm normal CI status.
3. Review workflow logs.
4. Disable the secret or workflow if data exposure or noise is unacceptable.
5. Update the prompt or activation criteria before re-enabling.

## Final Assessment

AI Brain has a solid security posture for an early repository-local SDLC layer. The strongest controls are clear permission policy, network-off defaults, narrow hooks, disabled-by-default automation, explicit stop conditions, and validation culture.

The critical next security work is to make those controls enforceable and auditable as the platform grows. Prioritize permission preflight, artifact classification, secret scanning of generated text, automation activation validation, memory integrity metadata, and broader command guardrails.

Do not rush into fully automated remediation. The safe path is to automate detection, evidence capture, and recovery guidance first, while keeping approval on destructive actions, releases, credentials, dependencies, product decisions, and architecture decisions.
