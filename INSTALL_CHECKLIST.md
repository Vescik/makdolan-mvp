# Install Checklist

## Local Codex

- [ ] Install Codex CLI.
- [ ] Run `codex` and authenticate.
- [ ] Open repo root.
- [ ] Trust the project when prompted.
- [ ] Run `codex "Summarize active instruction files."`.
- [ ] Run `/mcp` and confirm no required MCP server is failing.
- [ ] Run `/plugins` and inspect local project plugin marketplace.
- [ ] Run `bash scripts/verify-local.sh`.

## GitHub

- [ ] Add `OPENAI_API_KEY` as GitHub repository secret if using Codex Action.
- [ ] Enable branch protection for `main`.
- [ ] Require `Verify mobile and web` workflow.
- [ ] Decide whether Codex PR review is automatic or only manual.

## Mobile release

- [ ] iOS bundle ID decided.
- [ ] Android application ID decided.
- [ ] Signing strategy documented.
- [ ] Fastlane/EAS/GitHub Actions release lane planned.
- [ ] Store deployment requires explicit human approval.
