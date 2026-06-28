# MKD-VALIDATE-001 Epic Release Infrastructure Validation Report

Date: 2026-06-28

## Files changed

- `.ai/brain/planning/MKD_VALIDATE_001_EPIC_RELEASE_INFRASTRUCTURE_REPORT.md`
- `scripts/check-phase-certificate.sh`
- `scripts/hooks/pre-push`
- `scripts/install-hooks.sh`
- `docs/local-phase-certification.md`
- `docs/epic-branch-policy.md`
- `AGENTS.md`
- `.github/workflows/epic-pr-review.yml`
- `.github/pull_request_template.md`
- `.ai/brain/knowledge/sdlc-flow.md`
- `.ai/brain/index/`
- `.ai/brain/memory/implementation-history.md`

## Checks performed

- Parsed all workflow YAML files under `.github/workflows/`.
- Ran shell syntax validation for `scripts/*.sh` and `scripts/hooks/pre-push`.
- Inspected workflows for `pull_request_target`, automatic merge behavior, automatic release behavior, and deployment behavior.
- Inspected OpenAI key references and confirmed workflow usage relies on `${{ secrets.OPENAI_API_KEY }}`.
- Inspected release workflow permissions and confirmed `create-github-release` uses `contents: write`.
- Verified `create-github-release` is manual-only.
- Verified local phase certificate schema is documented in `docs/local-phase-certification.md`.
- Verified `scripts/check-phase-certificate.sh` and `scripts/hooks/pre-push` block stale certificates.
- Ran fixture checks for uncommitted current-HEAD certificates, committed certificate-only evidence, stale certificates, and mixed certificate/source commits.
- Ran AI Brain health, smoke, search, and index refresh.
- Ran local app validation through `scripts/verify-local.sh` and `scripts/diff-gate.sh`.

## Issues found

1. Certificate self-reference contradiction.
   - Local and remote policy wanted phase certificates to be PR evidence, but a committed certificate cannot contain its own final commit SHA.
   - Risk: teams could either push without committed certificate evidence or commit a certificate that every strict HEAD check treats as stale.

2. Final certification to release handoff was implicit.
   - Final certification uploads a certificate artifact but does not push it.
   - The release workflow correctly requires `final-release-certificate.json` to be present on `main`.
   - Risk: a maintainer could run release creation before the final certificate is committed to the target branch, causing avoidable release workflow failure.

## Issues fixed

1. Added an explicit certificate-only commit model.
   - A dirty local certificate must certify current `HEAD`.
   - A committed certificate is valid only when current `HEAD` changes only that certificate file and the certificate `head_sha` equals the parent commit.
   - Mixed source changes in the certificate commit are blocked.

2. Updated local checker and hook guidance.
   - `scripts/check-phase-certificate.sh` now validates both local pre-publication and committed certificate-only evidence states.
   - `scripts/hooks/pre-push` and `scripts/install-hooks.sh` now describe the certificate-only commit rule.

3. Updated durable policy and templates.
   - `docs/local-phase-certification.md`, `docs/epic-branch-policy.md`, `AGENTS.md`, `.github/workflows/epic-pr-review.yml`, and `.github/pull_request_template.md` now use the same certificate model.

4. Documented the final certificate handoff.
   - `docs/epic-branch-policy.md`, `AGENTS.md`, and `.ai/brain/knowledge/sdlc-flow.md` now state that the final certificate artifact must be present on `main` before `create-github-release` runs.

## Remaining manual GitHub settings

- Add `OPENAI_API_KEY` as a GitHub repository or organization secret before requiring Codex review/final certification workflows.
- Configure branch protection on `main` to require:
  - `Verify mobile and web / verify`
  - `epic_pr_codex_gate`
- Require appropriate human review for epic PRs if repository policy requires it.
- Run `final-epic-certification` manually after the epic is merged to `main`.
- Commit the final certificate artifact to `main` through the protected branch process before running `create-github-release`.
- Run `create-github-release` manually only after final certification `PASS`.

## Final operating flow

1. Start an epic with `./scripts/start-epic.sh <epic-id> <short-slug> <target-version>`.
2. Work phase by phase on `epic/<epic-id>-<short-slug>`.
3. Certify the local phase with Codex and create a phase certificate.
4. Optionally commit the phase certificate as a certificate-only commit for PR evidence.
5. Run `./scripts/check-phase-certificate.sh <epic-id> <phase-number>` before push or PR update.
6. Push/update the PR only after local phase certification passes.
7. Let GitHub CI and `epic_pr_codex_gate` review the epic PR.
8. Merge only after GitHub branch protection and required review gates pass.
9. Run `final-epic-certification` manually for the completed epic on `main`.
10. Add the final certificate artifact to `main` through the protected branch process.
11. Run `create-github-release` manually.
12. The release workflow publishes one GitHub Release only when the final certificate is `PASS`, `release_allowed` is `true`, metadata matches inputs, no blockers remain, and the tag does not already exist.

## Validation evidence

- `ruby YAML.load_file` for all `.github/workflows/*.yml`: PASS.
- `bash -n scripts/*.sh scripts/hooks/pre-push`: PASS.
- `./scripts/start-epic.sh --help`: PASS.
- `./scripts/check-phase-certificate.sh --help`: PASS.
- `./scripts/install-hooks.sh --help`: PASS.
- `scripts/hooks/pre-push` on current non-epic branch: PASS, allowed.
- `./scripts/check-phase-certificate.sh billing-v2 01` on current non-epic branch: EXPECTED FAIL.
- Certificate fixture: uncommitted current-HEAD certificate: PASS.
- Certificate fixture: committed certificate-only evidence: PASS.
- Certificate fixture: stale certificate after source commit: EXPECTED FAIL.
- Certificate fixture: mixed certificate/source commit: EXPECTED FAIL.
- `create-github-release` manual-only trigger check: PASS.
- `npm run brain:smoke`: PASS, 7 smoke groups.
- `npm run brain:health`: PASS, 0 errors, 0 warnings.
- `npm run brain:search -- "certificate-only commit" --limit=5`: PASS.
- `bash scripts/verify-local.sh`: PASS; lint, typecheck, 28 tests, and web export passed.
- `git diff --check`: PASS.
- `bash scripts/diff-gate.sh`: PASS.
