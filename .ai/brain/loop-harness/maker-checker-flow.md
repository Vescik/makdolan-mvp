# Maker Checker Flow

Maker-checker review is required for major Makdolan tasks before the work is considered complete. Review is based on the goal contract and validation evidence, not vague preference.

Use this flow for changes that touch shared logic, validation, CI, architecture, data policy, permissions, release behavior, cross-platform UI behavior, generated AI Brain tooling, or more than one feature area.

Small docs-only edits and isolated one-file fixes may use self-review, but the final response still needs validation evidence and must explain why separate checker review was not needed.

## Maker Role

The Maker owns implementation within the approved goal contract.

Maker responsibilities:

- Read the context pack or create one when startup context is scattered.
- Read the goal contract and confirm allowed scope, forbidden scope, stop conditions, validation commands, review requirement, and memory update requirement.
- Inspect the referenced docs, code, tests, and generated AI Brain index before editing.
- Implement scoped changes only.
- Add or update tests/docs when behavior, tooling, workflow, or accepted risk changes.
- Run validation, preferably `bash scripts/diff-gate.sh` for meaningful work.
- Record validation evidence with command, result, key output, skipped checks, and follow-up.
- Update AI Brain memory when the change is meaningful.
- Hand the diff, goal contract, validation evidence, and memory updates to the Checker.

Maker must stop before changing product scope, dependencies, CI, release settings, secrets, credentials, payments, authentication, database migrations, or forbidden files unless the user explicitly approves that expansion.

## Checker Role

The Checker reviews whether the Maker can mark the goal done.

Checker responsibilities:

- Review the diff against the goal contract, not personal preference.
- Check that done criteria are satisfied with evidence.
- Check allowed and forbidden scope.
- Check validation evidence and skipped-check reasons.
- Check architecture fit against `docs/architecture/`, `.ai/brain/knowledge/architecture-principles.md`, and existing code patterns.
- Check tests: changed behavior has targeted tests or a justified validation path.
- Check security/privacy and cross-platform iOS, Android, and Web impact.
- Check that AI Brain memory/docs were updated when required.
- Reject completion with specific required fixes when evidence is missing or scope was exceeded.

## Checker Decision

The Checker must choose one:

- `Approved`: goal contract satisfied, validation evidence is adequate, and no blocking issues remain.
- `Approved with follow-ups`: goal is complete, but non-blocking follow-ups are listed with owner/context.
- `Rejected`: completion is blocked until specific fixes are made.

Rejected reviews must list required fixes as concrete items with file paths, missing evidence, or violated scope. Do not reject with broad opinions.

## Codex Review Command

Codex CLI supports non-interactive review. In this local setup, uncommitted review is available as:

```bash
codex review --uncommitted
```

For committed work:

```bash
codex review --commit <sha>
```

Use Codex review as a checker candidate when local policy and credentials allow it. Keep the goal contract and checker template open while reviewing the output, because this CLI version may not accept a custom prompt together with `--uncommitted`. Treat findings as review input; the Maker still needs to resolve or explicitly disposition blocking findings.

## Cross-Tool Review Option

If an external review model or human reviewer is preferred, provide only safe context:

- Goal contract.
- Context pack or impact analysis.
- Diff summary and relevant file paths.
- Validation evidence.
- Generated checker review template.

Do not provide secrets, `.env.local`, credentials, private user data, raw tokens, or unnecessary full source dumps. The external reviewer must use the same checklist and decision categories as the AI Brain checker flow.

## Required Artifacts

Before completion, major tasks should have:

- Goal contract or explicit acceptance criteria.
- Context pack or impact analysis when useful.
- Maker validation evidence.
- Checker review using `.ai/brain/templates/checker-review-template.md`.
- Memory updates or a clear statement that memory update was not needed.
