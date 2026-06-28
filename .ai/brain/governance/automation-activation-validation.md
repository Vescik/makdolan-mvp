# AI Brain Automation Activation Validation

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-automation-activation-validation` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines the report-only validation gate required before enabling AI Brain or Codex automations. |
| domain | AI Brain automation governance |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

## Purpose

This document implements the CERT-08 activation validation condition without enabling automation.

Automation remains disabled unless a human owner creates an activation record, validates it locally, reviews the first run, and records explicit sign-off.

## Activation Record

Before enabling any automation, create a Markdown activation record from:

```text
.ai/brain/templates/automation-activation-record-template.md
```

The record must answer every field from `.ai/brain/governance/security-preflight.md`:

| Field | Requirement |
| --- | --- |
| Owner | Human owner or accountable human role. |
| Purpose | What the automation detects or reports. |
| Trigger | Manual, schedule, PR, hook, or other trigger. |
| Cadence | How often it runs, if scheduled. |
| Sandbox | `read-only` preferred; `workspace-write` only for approved report paths. |
| Network | Off by default; explicit approval wording if enabled. |
| Secrets | Must be `none` for certification-safe activation. |
| Output path | Approved local report path. |
| Write scope | `read-only`, `report-only`, or explicitly approved mutation. |
| Validation | Commands or checks that prove output is safe/useful. |
| Stop conditions | Conditions that halt instead of continuing. |
| Rollback/disable path | How to disable the automation and revert outputs. |
| First-run review | Human/manual review required before acting on findings. |
| Data exposure | Must state that no data leaves the local checkout for certification-safe activation. |
| Approval record | Where human sign-off is recorded. |

## Local Validation

Run the report-only validator before activation:

```bash
npm run brain:automation:check -- path/to/automation-activation-record.md
```

The validator:

- Reads one Markdown activation record inside the repository.
- Checks that every required checklist field is present and non-placeholder.
- Requires a human owner.
- Blocks `danger-full-access`.
- Requires network to be off/disabled or explicitly approved.
- Blocks activation records that require secrets.
- Requires write scope to be read-only, report-only, or explicitly approved mutation.
- Requires report-writing output paths to stay under approved AI Brain report locations.
- Requires first-run human review, rollback/disable path, stop conditions, and data exposure statements.
- Fails records that mention forbidden capabilities such as deployment, production API calls, database migration, credential rotation, auto-merge, destructive deletion, or dependency mutation.

The validator does not:

- Enable automation.
- Schedule anything.
- Modify files.
- Read `.env.local`.
- Use network access.
- Prove that an automation is useful; a human first-run review still decides that.

## Activation Decision Rule

Automation may be enabled only when all are true:

- The activation record exists and passes `npm run brain:automation:check`.
- A human owner signs off in the approval record.
- The first run is manually reviewed before acting on findings.
- Output path and retention are accepted.
- Disable/rollback path is documented.
- Scope remains read-only or report-only unless explicit human approval authorizes mutation.

If any item is missing, automation stays disabled.

## Certification Boundary

CERT-08 is satisfied by this local validation gate and documentation.

This does not certify autonomous mutation, dependency changes, deployment, release, credential operations, production incident response, or remote automation. Those require separate explicit approval and validation before use.
