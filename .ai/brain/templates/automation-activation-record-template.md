# Automation Activation Record Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-automation-activation-record` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for automation activation review records; does not approve automation by itself. |
| domain | AI Brain automation governance |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Copy this format into a planning or review artifact before enabling any automation.

~~~markdown
# Automation Activation Record: Short Name

Date: YYYY-MM-DD

## Checklist

| Field | Required answer |
| --- | --- |
| Owner | Human owner or accountable human role. |
| Purpose | What the automation detects or reports. |
| Trigger | Manual, schedule, PR, hook, or other trigger. |
| Cadence | How often it runs, if scheduled. |
| Sandbox | `read-only` preferred; `workspace-write` only for approved report paths. |
| Network | `off`; use explicit approval wording if enabled. |
| Secrets | `none`. |
| Output path | Approved local report path, usually `.ai/brain/context-packs/YYYY-MM-DD-short-name.md`. |
| Write scope | `read-only` or `report-only`. |
| Validation | Commands or checks that prove output is safe/useful. |
| Stop conditions | Stop for secrets, credentials, production/destructive work, network needs, or approval needs. |
| Rollback/disable path | How to disable the schedule/hook and archive or remove generated outputs. |
| First-run review | Human/manual review required before acting on findings. |
| Data exposure | No data leaves the local checkout. |
| Approval record | Path, issue, PR, or signed note where human sign-off is recorded. |

## Validation

Run:

```bash
npm run brain:automation:check -- path/to/automation-activation-record.md
```

## Decision

- Activation decision: pending human sign-off.
- Approved scope: report-only unless explicitly approved otherwise.
- Follow-up owner: human owner or accountable role.
~~~

## Rules

- This template does not enable automation.
- Keep activation records in `.ai/brain/planning/`, `.ai/brain/reviews/`, or another approved local report path.
- Do not approve production API calls, credential work, deployment, release, database migration, payment operations, auto-merge, dependency mutation, or destructive file operations through this record.
