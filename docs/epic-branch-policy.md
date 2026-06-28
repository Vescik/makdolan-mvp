# Epic Branch Delivery Policy

## Purpose

Makdolan uses epic-based delivery. Each epic runs on a dedicated local branch and advances through named phases. Codex must certify each local phase before publishing the branch or updating a GitHub PR.

This policy defines the official repository rules for:

- Epic branch naming.
- Phase naming.
- Local AI phase certificates.
- PR update gates.
- Remote GitHub merge gates.
- Final epic release certification.
- GitHub Release creation.

The policy is anchored in AI Brain workflow rules: local certificates are created by Codex/AI Brain review of the local branch state, while GitHub Actions and remote Codex review remain the authoritative merge gates.

## Naming Conventions

### Epic Branches

Use:

```text
epic/<epic-id>-<short-slug>
```

Examples:

```text
epic/billing-v2
epic/onboarding-redesign
epic/payments-webhooks
```

Rules:

- Create the epic branch locally from current `main`.
- Keep phase work on the same epic branch unless a maintainer explicitly approves a split.
- Do not use a phase branch as a substitute for the epic branch unless the repository owner changes this policy.

### Phases

Use:

```text
phase-01-<short-slug>
phase-02-<short-slug>
phase-03-<short-slug>
```

Rules:

- Use two-digit phase numbers.
- Keep phase slugs short and descriptive.
- Phase names describe the local delivery checkpoint, not a GitHub Release.

### Certificates

Use:

```text
docs/epics/<epic-id>/certificates/phase-01-certificate.json
docs/epics/<epic-id>/certificates/phase-02-certificate.json
docs/epics/<epic-id>/certificates/final-release-certificate.json
```

Rules:

- Store certificates under the matching epic directory.
- One phase certificate exists per phase.
- One final release certificate exists per completed epic.
- Certificate files are review evidence. They do not replace GitHub branch protection or CI.

## Lifecycle

### 1. Start Epic

Before implementation:

1. Confirm the epic ID and short slug.
2. Update local `main`.
3. Create a local epic branch from `main`.
4. Identify initial phase names and expected certificate paths.
5. Anchor the epic in AI Brain by reading relevant source-of-truth docs and, when appropriate, creating planning context under `.ai/brain/` or `docs/epics/<epic-id>/`.

Example:

```bash
git switch main
git pull --ff-only
git switch -c epic/billing-v2
```

Preferred helper:

```bash
./scripts/start-epic.sh <epic-id> <short-slug> <target-version>
```

Example:

```bash
./scripts/start-epic.sh billing-v2 billing-v2 v1.4.0
```

The helper performs the local start-epic sequence:

- Verifies the working tree is clean.
- Verifies the current branch is `main`.
- Pulls latest `main` with `git pull --ff-only`.
- Creates `epic/<epic-id>-<short-slug>`.
- Copies `docs/epics/_template/` to `docs/epics/<epic-id>/`.
- Fills the epic ID, branch name, short slug, and target version placeholders.
- Ensures `docs/epics/<epic-id>/certificates/` exists.
- Creates the initial local commit:

```text
epic(<epic-id>): start epic workspace
```

The helper intentionally does not push, create a PR, create a GitHub Release, or bypass local checks. A local phase certificate is still required before Codex may push or update a GitHub PR.

### 2. Implement Local Phase

For each phase:

1. Work locally on the epic branch.
2. Keep changes scoped to the phase objective.
3. Run the applicable validation profile from `.ai/brain/governance/validation-profiles.md`.
4. Preserve validation evidence.
5. Update relevant AI Brain memory, planning, or knowledge artifacts when the phase creates durable context.

### 3. Certify Local Phase

Before Codex pushes or updates a PR, Codex must produce a local AI phase certificate.

The certificate means:

- Codex reviewed the current local branch state.
- Codex checked the current branch name.
- Codex checked the current `HEAD` SHA.
- Codex checked tests, lint, build, and risk.
- Codex returned `PASS` or `FAIL`.

Required certificate shape:

- Use the complete local phase certificate schema in `docs/local-phase-certification.md`.
- Store the certificate under `docs/epics/<epic-id>/certificates/` using the filename pattern `phase-NN-certificate.json`.
- Before pushing or updating a PR, verify the certificate with:

```bash
./scripts/check-phase-certificate.sh <epic-id> <phase-number>
```

Certificate rules:

- `PASS` allows Codex to push the branch or update the GitHub PR.
- `FAIL` blocks push or PR update until issues are fixed and the phase is certified again.
- A certificate must refer to the exact phase-work SHA being certified. If the certificate is committed for PR evidence, it must be committed in a certificate-only commit whose parent is the certified phase-work SHA.
- If new commits are added after a `PASS`, the phase must be recertified before publication.
- Any P0/P1 issue, failing test, uncommitted change outside the certificate file being checked, missing phase documentation, secret exposure, unsafe migration, stale certificate, certificate mismatch, or mixed source change in a certificate commit blocks publication.
- Local certificates are advisory publication gates, not authoritative merge gates.

### 4. Push Or Update PR After Local PASS

Codex may push or update the GitHub PR only after the current local phase certificate returns `PASS`.

Rules:

- Do not push an uncertified phase.
- Do not update a PR from a local branch whose latest `HEAD` SHA is not covered by a `PASS` certificate.
- Do not bypass branch protection.
- Do not force-push shared epic branches unless a maintainer explicitly approves recovery work.

### 5. Run Remote GitHub Gates

After GitHub receives the branch:

- GitHub Actions must run CI.
- Remote Codex review must run when configured.
- Epic PRs use `.github/workflows/epic-pr-review.yml` for the remote `epic_pr_codex_gate`.
- Required repository checks must pass.
- Required human review or branch protection rules must pass.

Remote PR certificate meaning:

- GitHub received the branch.
- GitHub Actions ran CI against the PR merge commit.
- GitHub Actions ran Codex review with `openai/codex-action@v1`.
- The remote gate checked branch policy, committed phase certificate evidence, CI status, security risk, migration risk, deployment risk, release notes, and rollback notes.
- The remote gate produced a structured verdict with `verdict`, `blocking_findings`, and `merge_allowed`.
- Required checks passed, including `epic_pr_codex_gate`.

GitHub checks are authoritative merge gates. A local phase certificate can allow a push/PR update, but it cannot approve a merge by itself.

Branch protection for `main` should require these checks before merge:

- `Verify mobile and web / verify`
- `epic_pr_codex_gate`

Bootstrap sequencing:

- If `epic_pr_codex_gate` is being introduced for the first time, merge `.github/workflows/epic-pr-review.yml` to `main` under the existing protected branch process before adding `epic_pr_codex_gate` to required branch protection checks.
- Do not require a GitHub check before the workflow that creates that check exists on `main`; doing so can block the PR that introduces the gate.

The `epic_pr_codex_gate` check fails unless CI passes, Codex review completes, Codex returns `PASS`, `merge_allowed` is `true`, and `blocking_findings` is empty. The workflow intentionally does not use `pull_request_target`, create a GitHub Release, merge the PR, push commits, bypass branch protection, or replace required human review.

### 6. Merge PR

Merge only when:

- Local phase certificates for included phase work exist and returned `PASS`.
- GitHub Actions required checks passed.
- Remote Codex review passed when configured.
- Branch protection requirements are satisfied.
- Required human review, if any, is complete.

Codex must not bypass branch protection, required checks, required review, or repository owner approval boundaries.

### 7. Final Release Certification

Run final release certification only after the full epic is complete and the epic PR is merged to `main`.

The final release certificate means:

- Full epic scope is complete.
- All phases are certified.
- Remote PR checks passed.
- Epic PR was merged to `main`.
- Release notes are ready.
- Rollback notes are ready.
- Codex returned `PASS` for release readiness.

Final certificate path:

```text
docs/epics/<epic-id>/certificates/final-release-certificate.json
```

The final release certificate must reference:

- Epic ID.
- Merge commit or final `main` commit SHA.
- Included phase certificate paths.
- PR URL.
- CI/check results.
- Release notes path or content summary.
- Rollback notes path or content summary.
- Final verdict: `PASS` or `FAIL`.

Manual workflow:

Use `.github/workflows/final-epic-certification.yml` from the GitHub Actions UI. The workflow name is `final-epic-certification`.

Required inputs:

- `epic_id`: epic workspace ID, for example `billing-v2`.
- `version`: release version, for example `v1.4.0`.
- `target_branch`: branch to certify, usually `main`.
- `epic_branch`: optional source epic branch, for example `epic/billing-v2-billing-v2`.

The workflow:

- Checks out the requested target branch.
- Collects epic documentation from the active epic workspace.
- Verifies phase certificates under the epic workspace's `certificates/` directory.
- Requires every phase certificate to be `PASS`, have `push_allowed: true`, have no blocking findings, and reference a commit present in repository history.
- Runs typecheck, lint, tests, and web build.
- Runs final Codex certification with `openai/codex-action@v1`.
- Writes `final-release-certificate.json` to the epic workspace's `certificates/` directory in the workflow workspace.
- Uploads the final certificate as a workflow artifact.
- Runs the required `final_epic_certification_gate`.

The `final_epic_certification_gate` fails unless the final certificate verdict is `PASS`, `release_allowed` is `true`, no blocking findings exist, validation passed, and the target SHA is clear.

This workflow intentionally does not create a GitHub Release, push commits, merge PRs, tag the repository, deploy, or bypass branch protection. A maintainer may create the GitHub Release only after the final certification artifact returns `PASS`.

Because the workflow does not push, the final certificate artifact must be added to the target branch through the normal protected-branch process before running `create-github-release`. The release workflow intentionally refuses to publish unless `docs/epics/<epic-id>/certificates/final-release-certificate.json` is present on `main` and matches the release inputs and target SHA.

### 8. Create GitHub Release

GitHub Release creation is allowed only after final release certification returns `PASS`.

Rules:

- Create one GitHub Release per final certified epic.
- Do not create a GitHub Release per commit.
- Do not create a GitHub Release per phase.
- Do not create a GitHub Release from an uncertified branch.
- Do not create a GitHub Release before the epic PR is merged to `main`.
- Do not create a GitHub Release without release notes and rollback notes.

Manual release workflow:

Use `.github/workflows/create-github-release.yml` from the GitHub Actions UI. The workflow name is `create-github-release`.

Required inputs:

- `epic_id`: epic workspace ID, for example `billing-v2`.
- `version`: release version and tag name, for example `v1.4.0`.
- `target_branch`: branch to release from. Current policy allows only `main`.

The workflow:

- Runs manually only with `workflow_dispatch`.
- Checks out the requested target branch.
- Refuses to continue unless `target_branch` is `main`.
- Locates `docs/epics/<epic-id>/certificates/final-release-certificate.json`.
- Verifies the final certificate is `PASS`, `release_allowed` is `true`, the version and target branch match the workflow inputs, `blocking_findings` is empty, and `target_sha` matches the checked-out `main` HEAD.
- Verifies the Git tag does not already exist.
- Creates tag `<version>`.
- Creates GitHub Release `Release <version> - <epic-id>`.
- Uses `docs/epics/<epic-id>/RELEASE_NOTES.md` as the release body source and appends rollback content from `docs/epics/<epic-id>/ROLLBACK.md`.
- Uploads `final-release-certificate.json` as a release asset.
- Uses only `GITHUB_TOKEN` with `contents: write`.
- Does not deploy to production.

This workflow must not run on `push` or `pull_request`, release from feature branches, release without a final certification `PASS`, release when certificate metadata does not match the inputs, or overwrite an existing tag.

## Gate Summary

| Gate | Scope | Verdict | Allows | Does not allow |
| --- | --- | --- | --- | --- |
| Local phase certificate | Local branch phase | `PASS` or `FAIL` | Push branch or update PR after `PASS` | Merge, release, branch-protection bypass |
| Remote PR checks | GitHub PR | GitHub check results | Merge when all required checks/reviews pass | GitHub Release by itself |
| Final release certificate | Full merged epic | `PASS` or `FAIL` | GitHub Release after `PASS` | Per-phase release, uncertified branch release, release creation by certification workflow |

## Codex Prohibitions

Codex must not:

- Push or update a PR for uncertified phase work.
- Treat a stale local phase certificate as valid for a new `HEAD` SHA.
- Merge a PR when required GitHub gates have not passed.
- Bypass branch protection.
- Disable tests, lint, CI, Codex review, or branch protection to make a PR mergeable.
- Create a GitHub Release from an uncertified branch.
- Create a GitHub Release before final release certification returns `PASS`.
- Create a GitHub Release per commit or per phase.

## Authority Model

Local phase certificates are advisory gates for publication readiness. They prove Codex reviewed the local branch state and found it safe to publish.

GitHub Actions, remote Codex review, branch protection, and required repository review are authoritative merge gates.

Final release certification is the release readiness gate. It is required before a GitHub Release, but it does not bypass repository permissions or owner approval.

## AI Brain Integration

Epic branch work should stay connected to AI Brain:

- Use `.ai/brain/governance/validation-profiles.md` to choose local validation.
- Use `.ai/brain/governance/security-preflight.md` for security-sensitive, release-sensitive, automation-related, or broad work.
- Use `.ai/brain/governance/source-of-truth-map.md` before relying on generated, advisory, memory, archive, template, or adapter files.
- Record durable implementation, validation, planning, or workflow changes in `.ai/brain/memory/` when meaningful.
- Keep certificates under `docs/epics/<epic-id>/certificates/` and reference them from planning or memory artifacts when they become durable project evidence.

This keeps new enhancements integrated with the repository's SDLC intelligence layer without making AI Brain a product-facing feature.
