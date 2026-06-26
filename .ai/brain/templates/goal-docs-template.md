# Goal Template: Documentation Update

Use this for docs-only changes.

## Objective

Update `[doc path or doc set]` so that `[specific reader]` can understand `[specific process, decision, command, or architecture fact]`.

## Done When

- The updated docs name the source of truth or decision source.
- Instructions are actionable with exact paths, commands, or criteria.
- No app source behavior changes are included.
- Links or referenced paths are checked where feasible.

## Validation Commands

```bash
git diff --check
find .ai/brain -type f -name '*.md' -print
```

Add targeted checks:

```bash
# rg -n 'required phrase or heading' path
```

## Allowed Scope

- Allowed files:
- Allowed directories:
- Allowed documentation changes:

## Forbidden Scope

- Forbidden files:
- Forbidden directories:
- Forbidden behavior changes:
- Forbidden commands:

Default forbidden unless approved: app source edits, dependency changes, CI behavior changes, secrets, deployment settings, generated output, and package lock changes.

## Stop Conditions

- Stop if the documentation requires a product or architecture decision that has not been made.
- Stop if source-of-truth docs conflict and the conflict cannot be resolved locally.
- Stop if requested docs would expose secrets or private data.
- Stop if validation requires unavailable tooling and no fallback check is possible.

## Review Requirement

Review required before done:

- Docs answer the stated reader need.
- Headings and paths are accurate.
- Scope stayed docs-only.
- Skipped app checks are explained.

## Memory Update Requirement

Update `.ai/brain/memory/implementation-history.md` for meaningful workflow, planning, or architecture documentation changes. Update `.ai/brain/memory/open-decisions.md` for unresolved decisions. Do not update memory for trivial typo-only edits unless requested.

## Validation Evidence

| Command | Result | Evidence | Notes |
|---|---|---|---|
| `git diff --check` |  |  |  |
| `find .ai/brain -type f -name '*.md' -print` |  |  |  |
