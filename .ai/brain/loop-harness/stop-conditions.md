# Stop Conditions

Stop and ask for direction when continuing would risk violating scope, safety, or correctness.

## Stop Immediately

- The requested change conflicts with explicit product or security rules.
- The task requires secrets, credentials, production deployment, store release, payment changes, or destructive data operations.
- Repository structure is unclear enough that a safe plan cannot be made.
- A required source document is missing and assumptions would be risky.
- Validation repeatedly fails for reasons unrelated to the intended change.
- `bash scripts/diff-gate.sh` fails and the failure cannot be fixed within the approved scope.

## Pause And Report

- The change requires adding a dependency.
- The work expands beyond the accepted phase.
- Existing user changes overlap with the target files and create ambiguity.
- Native mobile verification is required but no build path is available.
- The diff gate reports skipped checks that are material to the change.

## Continue With Notes

Continue with explicit assumptions when the risk is low, reversible, and documented in the plan.
