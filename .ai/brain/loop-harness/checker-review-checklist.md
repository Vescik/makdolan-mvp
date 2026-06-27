# Checker Review Checklist

Use this checklist during checker review. It is intentionally concrete so a Checker can approve or reject completion without relying on broad opinion.

## Inputs

- Goal contract:
- Context pack or impact analysis:
- Diff or commit:
- Validation evidence:
- Memory update files:

## Scope

- Allowed files changed:
- Forbidden files untouched:
- Product scope unchanged or explicitly approved:
- No unapproved dependencies, CI changes, release settings, secrets, credentials, payments, authentication, or migrations:

## Correctness

- Implementation satisfies each done criterion:
- Edge cases from the goal contract are covered:
- No obvious regression in adjacent flows:
- Error, empty, loading, or denied states considered when relevant:

## Architecture Fit

- Shared domain logic remains outside platform UI where practical:
- Existing module boundaries are respected:
- New abstractions are justified by real complexity:
- iOS, Android, and Web impact is documented:

## Tests And Validation

- `bash scripts/diff-gate.sh` run or narrower validation justified:
- Targeted tests added or updated for changed behavior:
- Skipped checks have clear scope/environment reasons:
- Failed checks were fixed and rerun, or blockers are documented:

## Security And Privacy

- No secrets, tokens, credentials, auth headers, `.env.local`, or private user data were read into docs or logs:
- User-submitted data is treated as untrusted when relevant:
- Security/privacy note exists for auth, payment, location, or personal-data changes:

## Docs And Memory

- User-facing or developer-facing docs updated when behavior/workflow changed:
- `.ai/brain/memory/implementation-history.md` updated for meaningful changes:
- `.ai/brain/memory/open-decisions.md` updated for deferred decisions:
- Generated AI Brain index refreshed when scripts/docs structure changed:

## Decision

- Decision: `Approved`, `Approved with follow-ups`, or `Rejected`.
- Required fixes before approval:
- Non-blocking follow-ups:
- Reviewer:
- Date:
