# Architecture Drift Scan

Status: Disabled template.

## Purpose

Check whether implementation and tooling still match Makdolan architecture principles and AI Brain operating rules.

## Suggested Cadence

Weekly during active development or before release-readiness review.

## Recommended Run Mode

- Surface: standalone project automation.
- Checkout: Codex-managed worktree.
- Sandbox: `read-only`.
- Network: off.

## Prompt Template

```text
Run a Makdolan architecture drift scan.

Scope:
- Read AGENTS.md, docs/architecture/, project-context/, knowledge-base/, .ai/brain/knowledge/architecture-principles.md, .ai/brain/knowledge/module-catalog.md, and the generated repo index.
- Compare current source/module layout against documented architecture.
- Identify drift from cross-platform rules, domain boundaries, validation policy, security/privacy boundaries, and MVP scope.
- Do not change code or docs automatically.

Safety:
- No production API calls.
- No external messages.
- No deleting files.
- No dependency or CI changes.
- Draft PR only if a human explicitly asks.

Report:
- drift candidates with evidence,
- affected modules,
- risk level,
- recommended validation or discovery follow-up,
- whether a product/architecture decision is needed.

Stop if source-of-truth docs conflict or if a finding requires product interpretation that is not documented.
```

## Validation

- `git status --short`
- `git diff --check`
- `test -f .ai/brain/index/repo-map.json`
- `test -f .ai/brain/index/module-map.md`
- `npm run brain:impact -- "architecture drift scan follow-up"` only if writing a context pack is approved

## Stop Conditions

- Architecture docs conflict with product context.
- Drift cannot be tied to concrete files or commands.
- Assessment requires secrets, production data, or external APIs.
- Suggested fix would require changing product scope.

## Output

Advisory report only unless report writing is approved.

## Activation Criteria

- Architecture owner assigned.
- Baseline architecture docs reviewed.
- First manual run checked for false positives.
- Human sign-off recorded.
