# GitHub Setup

## Current Local State

- Branch: `main`
- Local verification entrypoint: `bash scripts/verify-local.sh`
- Required Actions secret for Codex workflows: `OPENAI_API_KEY`

## One-Time Remote Setup

Run after GitHub CLI authentication is fixed:

```bash
gh auth login -h github.com
gh repo create Makdolan --private --source=. --remote=origin --push
gh secret set OPENAI_API_KEY --repo "$(gh repo view --json nameWithOwner -q .nameWithOwner)"
```

If the repository already exists:

```bash
git remote add origin git@github.com:<owner>/Makdolan.git
git push -u origin main
gh secret set OPENAI_API_KEY --repo <owner>/Makdolan
```

## Recommended Repository Settings

- Require pull requests before merging to `main`.
- Require the `Verify mobile and web` workflow before merge.
- Require at least one approval once more than one maintainer exists.
- Enable Dependabot alerts and GitHub Actions dependency updates.
- Keep `OPENAI_API_KEY` as a repository or organization secret; do not commit it.

## Branch Protection Command

After the first push, apply branch protection:

```bash
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/<owner>/Makdolan/branches/main/protection" \
  -f required_status_checks.strict=true \
  -f enforce_admins=true \
  -f required_pull_request_reviews.required_approving_review_count=1 \
  -F restrictions=null \
  -f required_status_checks.contexts[]="verify"
```

GitHub may show the required check as `verify` or as the workflow/job label after the first Actions run. If the API rejects the context, set branch protection from the repository Settings UI after the first successful run.

