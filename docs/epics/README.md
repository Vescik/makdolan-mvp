# Epic Workspaces

Makdolan epics use a local documentation workspace as durable memory for Codex and humans. The workspace records epic scope, phases, acceptance gates, release notes, rollback notes, risks, and certificates.

Use the template in `docs/epics/_template/` when starting a new epic. Do not create a real epic workspace until the epic ID and branch are known.

## Workspace Structure

```text
docs/epics/<epic-id>/
  EPIC.md
  PHASES.md
  ACCEPTANCE.md
  RELEASE_NOTES.md
  ROLLBACK.md
  RISK_REGISTER.md
  certificates/
    .gitkeep
```

## Create A New Epic Workspace

Preferred local helper:

```bash
./scripts/start-epic.sh <epic-id> <short-slug> <target-version>
```

The helper creates the local epic branch from `main`, copies this template, fills obvious placeholders, creates the certificates directory, and commits the new workspace. It does not push, open a PR, create a GitHub Release, or bypass checks.

Manual fallback:

1. Choose the epic ID and branch name using `docs/epic-branch-policy.md`.
2. Copy the template:

```bash
cp -R docs/epics/_template docs/epics/<epic-id>
```

3. Replace placeholders in each Markdown file.
4. Keep the workspace updated as the epic progresses.
5. Store local phase certificates under:

```text
docs/epics/<epic-id>/certificates/
```

## Source-Of-Truth Rules

- `EPIC.md` is the local source of truth for epic identity, goal, scope, owner, target release, and branch.
- `PHASES.md` is the local source of truth for phase plan and phase status.
- `ACCEPTANCE.md` is the local source of truth for epic-level completion gates.
- `RELEASE_NOTES.md` is the release-note draft for final epic certification.
- `ROLLBACK.md` is the rollback/recovery draft for final epic certification.
- `RISK_REGISTER.md` is the active epic risk log.
- `certificates/` stores local phase certificates and the final release certificate.

AI Brain remains the repository-local SDLC intelligence layer. Epic workspaces should reference AI Brain validation, source-of-truth, and memory rules instead of duplicating them.

## Codex Usage

Before working on an epic, Codex should read:

- `AGENTS.md`
- `.ai/brain/agent-start.md`
- `.ai/brain/governance/source-of-truth-map.md`
- `.ai/brain/governance/validation-profiles.md`
- `docs/epic-branch-policy.md`
- the active epic workspace under `docs/epics/`

After meaningful phase work, Codex should update the active epic workspace and AI Brain memory when the change creates durable context.
