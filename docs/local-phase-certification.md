# Local Phase Certification

Makdolan uses local phase certificates as advisory publication gates. A phase certificate proves Codex reviewed the current local epic branch state and decided whether it is safe to push or update the GitHub PR for that phase.

Local phase certificates do not replace GitHub Actions, branch protection, remote Codex review, or required human review. They only control whether local work is ready to publish.

## Certificate Path

Store each certificate under the active epic workspace using this path pattern:

```text
docs/epics/<epic-id>/certificates/phase-NN-certificate.json
```

Example:

```text
docs/epics/billing-v2/certificates/phase-01-certificate.json
```

## Certificate JSON Schema

Use this shape for every local phase certificate:

```json
{
  "certificate_type": "local_phase_certificate",
  "verdict": "PASS",
  "epic_id": "billing-v2",
  "phase": "phase-01",
  "branch": "epic/billing-v2-billing-v2",
  "head_sha": "current git HEAD SHA",
  "base_branch": "main",
  "base_sha": "main SHA used as phase base",
  "created_at": "2026-06-28T19:00:00Z",
  "summary": "Short summary of reviewed phase work.",
  "tests_run": [
    "npm run typecheck: PASS",
    "npm run lint: PASS",
    "npm run test: PASS",
    "npm run build:web: PASS"
  ],
  "files_reviewed": [
    "src/example.ts",
    "docs/epics/billing-v2/PHASES.md"
  ],
  "blocking_findings": [],
  "non_blocking_notes": [
    "Documented follow-up that does not block publication."
  ],
  "push_allowed": true
}
```

Field requirements:

| Field | Required value |
| --- | --- |
| `certificate_type` | Must be `local_phase_certificate`. |
| `verdict` | Must be `PASS` or `FAIL`. |
| `epic_id` | Must match the epic workspace directory. |
| `phase` | Must match `phase-<number>`, for example `phase-01`. |
| `branch` | Must match the local epic branch being certified. |
| `head_sha` | Must equal the certified phase-work commit SHA. Before the certificate is committed, this is the current `git rev-parse HEAD`; after a certificate-only commit, this is the parent of current `HEAD`. |
| `base_branch` | Must be `main` unless repository policy changes. |
| `base_sha` | Must record the base `main` SHA reviewed for the phase. |
| `created_at` | Must be an ISO-8601 timestamp. |
| `summary` | Must explain what phase work was reviewed. |
| `tests_run` | Must list local checks that passed, failed, or were explicitly unavailable. |
| `files_reviewed` | Must list material files reviewed for the certificate. |
| `blocking_findings` | Must list every P0/P1 issue. Empty array is required for `PASS`. |
| `non_blocking_notes` | Must list non-blocking risks, follow-ups, skips, or caveats. |
| `push_allowed` | Must be `true` only when publication is allowed. |

## PASS Rules

A certificate may return `PASS` only when all of these are true:

- `verdict` is `PASS`.
- `push_allowed` is `true`.
- `blocking_findings` is an empty array.
- `head_sha` equals the certified phase-work commit.
- The current branch is the certified `epic/*` branch.
- Local tests, lint, build, and applicable AI Brain checks passed, or missing checks are explicitly documented in `tests_run` and `non_blocking_notes`.
- Phase notes in `docs/epics/<epic-id>/PHASES.md` are current.
- Release notes in `docs/epics/<epic-id>/RELEASE_NOTES.md` are updated when user-facing or developer-facing release content changed.
- Rollback notes in `docs/epics/<epic-id>/ROLLBACK.md` are updated when rollback or recovery behavior is relevant.
- The working tree has no uncommitted changes outside the certificate file being checked.
- If the certificate is not committed yet, `head_sha` equals current local `HEAD`.
- If the certificate is committed for PR evidence, current local `HEAD` is a certificate-only commit and `head_sha` equals its parent commit.

## FAIL Rules

A certificate must return `FAIL` when any of these are true:

- Any P0 or P1 issue exists.
- Any required local test, lint, build, or validation command failed.
- The working tree has uncommitted changes outside the certificate file being checked.
- Phase documentation is missing or stale.
- Secret exposure is found or suspected.
- A migration, destructive action, release change, or rollback-sensitive change is unsafe or not reviewed.
- The certificate does not match the current branch or `HEAD`.

## Checker Script

Use the checker before pushing or updating a GitHub PR:

```bash
./scripts/check-phase-certificate.sh <epic-id> <phase-number>
```

Examples:

```bash
./scripts/check-phase-certificate.sh billing-v2 01
./scripts/check-phase-certificate.sh billing-v2 phase-01
```

The checker verifies:

- The current branch matches `epic/*`.
- The working tree has no uncommitted changes outside the certificate file being checked.
- The certificate file exists.
- `certificate_type` is `local_phase_certificate`.
- `epic_id` matches the command argument.
- `phase` matches the command argument.
- `branch` matches the current branch.
- `base_branch` is `main`.
- `verdict` is `PASS`.
- `push_allowed` is `true`.
- `head_sha` equals current `HEAD`, or equals the parent of current `HEAD` when current `HEAD` is a certificate-only commit.
- `blocking_findings` is an empty array.

The checker supports two safe states:

- Local pre-publication state: the certificate file may be uncommitted or modified, but it must certify the exact current `HEAD`. This lets Codex check phase work before publication.
- PR evidence state: the certificate may be committed in a certificate-only commit. In that case, the certificate `head_sha` must equal the parent commit, and the certificate commit must change only that certificate file.

Any other uncommitted change blocks push readiness.

The checker does not create certificates, run tests, call external APIs, push to GitHub, open a PR, merge a PR, create a GitHub Release, or bypass branch protection.

## Required Workflow

1. Finish and commit the local phase work.
2. Review the current branch state.
3. Run the relevant validation profile from `.ai/brain/governance/validation-profiles.md`.
4. Update phase, release, rollback, and risk notes when relevant.
5. Create or update the phase certificate for the exact current phase-work `HEAD`.
6. To include the certificate as PR evidence, commit only the certificate file in a separate certificate commit.
7. Run:

```bash
./scripts/check-phase-certificate.sh <epic-id> <phase-number>
```

8. Push or update the GitHub PR only when the checker passes.

If any new phase-work commit is added after a passing certificate, create a new certificate for the new phase-work `HEAD` before pushing. If a separate certificate-only commit is used, do not mix source changes into that commit.

## Optional Pre-Push Hook

Developers may install the local pre-push hook to enforce the same certificate gate automatically before `git push`.

Install:

```bash
./scripts/install-hooks.sh
```

Uninstall:

```bash
rm .git/hooks/pre-push
```

The installed hook runs only for branches matching `epic/*`. Non-epic branches are allowed without a phase certificate check.

For `epic/*` branches, the hook:

- Detects the current branch.
- Infers the epic ID by first checking `git config makdolan.epicId`, then matching the branch slug against existing directories under `docs/epics/`.
- Finds the latest `phase-NN-certificate.json` under the matching epic workspace's `certificates/` directory.
- Calls `./scripts/check-phase-certificate.sh <epic-id> <phase-number>`.
- Blocks push when the latest certificate is missing, stale, not `PASS`, has `push_allowed` other than `true`, or has blocking findings.

If the branch name is ambiguous or the epic workspace cannot be inferred, configure the epic ID explicitly:

```bash
git config makdolan.epicId <epic-id>
```

The hook does not call OpenAI, call GitHub, mutate files, create commits, push automatically, create PRs, create releases, or bypass branch protection. It is an optional local safety gate; GitHub Actions, remote review, branch protection, and required human review remain authoritative merge gates.
