# Automation Policy

Automation must be designed before it is enabled.

## Existing Automation

- `.codex/hooks.json` runs prompt secret scanning and a non-blocking stop verification reminder.
- `.codex/automations/templates/` stores disabled automation templates. These are not active jobs.
- `.github/workflows/verify-mobile-web.yml` runs install, typecheck, tests, lint, and web build.
- `.github/workflows/codex-nightly-discovery.yml` can run Codex discovery when `OPENAI_API_KEY` is configured.
- `.github/workflows/codex-pr-review.yml` can run Codex PR review when `OPENAI_API_KEY` is configured.

## Hook Policy

Hooks are allowed only when they are:

- Documented with purpose, trigger, command, timeout, permissions, and failure behavior.
- Safe to run repeatedly.
- Reviewed and trusted through Codex hook review before use.
- Scoped to repository-local checks unless external access is explicitly approved.

Hooks must not be enabled by default when they:

- Deploy, push, publish, release, migrate, or rotate credentials.
- Call external systems or upload repository data.
- Modify source files without a clear opt-in.
- Run expensive validation on every stop without developer approval.

Project hooks should use git-root-based paths when possible:

```json
"command": "bash \"$(git rev-parse --show-toplevel)/scripts/diff-gate.sh\""
```

This avoids ambiguity when Codex is started from a subdirectory.

## Diff-Gate Hook Candidate

`bash scripts/diff-gate.sh` is the preferred manual validation gate before final review. It is also a candidate for a future `Stop` hook, but it is not enabled as a blocking hook by default because it can run typecheck, lint, tests, and web build.

Safe opt-in process:

1. Confirm the developer wants automatic validation on stop.
2. Add a documented `Stop` hook with a long enough timeout.
3. Run `/hooks` and review/trust the changed hook definition.
4. Confirm failure output is visible and does not silently mark work complete.
5. Revert the hook if it slows ordinary sessions too much.

## Rules For New Automation

- Document purpose, trigger, permissions, secrets, failure behavior, and rollback before enabling.
- Use least privilege.
- Skip safely when required secrets are absent.
- Do not deploy, push, release, migrate, or change credentials without explicit approval.
- Keep generated reports concise and linked to source files.
- Prefer Codex-managed worktrees for recurring scans in this Git repository.
- Store draft prompts as disabled templates before creating active jobs.
- Test prompts manually before scheduling.
- Review the first few runs for noise and false positives.

## Disabled Templates

The approved disabled template set is:

- Daily codebase health scan.
- Dependency audit.
- Stale docs scan.
- Duplicate abstraction scan.
- Architecture drift scan.
- Test coverage suggestion scan.

Templates live under:

```text
.codex/automations/templates/
```

They may be copied into Codex automation setup only after activation criteria are satisfied. The presence of a template is not approval to run it.

## Activation Criteria

Before activating any automation:

- A human owner is named.
- The prompt has been tested manually in a normal Codex thread.
- The intended sandbox, network policy, worktree mode, cadence, and output location are documented.
- The automation has validation commands and stop conditions.
- The automation is read-only unless report-writing is explicitly approved.
- The first run is reviewed by a human before any follow-up action.
- The automation has a clear disable/rollback path.
- Human sign-off is recorded.

Use `.ai/brain/governance/security-preflight.md` as the canonical automation activation checklist and `.ai/brain/governance/automation-activation-validation.md` as the validation gate. Before activation, create an activation record and run:

```bash
npm run brain:automation:check -- path/to/automation-activation-record.md
```

If any required checklist field is missing or the validator fails, activation is blocked.

## Required Safety Rules

All automations must obey:

- No production API calls.
- No sending emails, Slack messages, notifications, or external messages.
- No deleting files without explicit approval.
- No dependency installation or upgrades without explicit approval.
- No credential creation, rotation, reading, or persistence.
- No database migrations, payment operations, app store actions, or deployments.
- Draft PR only when explicitly requested; never auto-merge.
- Human sign-off required before activation and before acting on findings.

## AI Brain Automation

AI Brain automation should update reports or memory only when the source of truth is clear. It should not silently rewrite product decisions, architecture decisions, or `AGENTS.md`.

AI Brain automation reports are generated artifacts. They must follow `.ai/brain/governance/artifact-lifecycle-policy.md` and remain advisory unless accepted into `.ai/brain/governance/review-finding-registry.md`.

## Dangerous Automation

Dangerous automation requires explicit human opt-in in the task or approval flow. This includes:

- `danger-full-access`.
- Default network access.
- Automatic dependency installation.
- Automatic git push or pull request creation.
- Deployment or app store release commands.
- Database migrations or destructive data commands.
- Hooks that mutate source, credentials, product decisions, or architecture decisions.

## Stop Conditions

Stop an automation run and report instead of continuing when:

- The run needs secrets, `.env.local`, credentials, private user data, or production data.
- The run needs network access but network was not approved.
- The checkout has unrelated local changes and no worktree isolation is available.
- A finding requires product or architecture interpretation not present in source-of-truth docs.
- A command would modify source, dependencies, CI, release settings, or generated build output outside the approved report path.
- Validation fails and the fix is outside the automation's approved scope.
