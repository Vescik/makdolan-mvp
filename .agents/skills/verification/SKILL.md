---
name: verification
description: Verify cross-platform changes with lint, tests, builds, smoke checks, and release gates.
---

Run available checks. Use `scripts/verify-local.sh` as a fallback.

Report:

- Exact command.
- Result: pass/fail/skipped.
- Important output.
- Fixes attempted.
- Remaining blockers.

Never claim success when a required check was not run.
