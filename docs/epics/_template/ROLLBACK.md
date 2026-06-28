# Rollback Plan

## Rollback Strategy

Describe how the epic can be rolled back if release validation or production use reveals a blocking issue.

| Scenario | Rollback action | Owner | Expected time |
| --- | --- | --- | --- |
| `<scenario>` | `<rollback-action>` | `<owner>` | `<duration>` |

## Database Rollback Notes

| Item | Applies? | Notes |
| --- | --- | --- |
| Database migration rollback | no | `<notes>` |
| Data repair or backfill reversal | no | `<notes>` |
| Data backup needed | no | `<notes>` |

## Feature Flag Rollback Notes

| Flag | Applies? | Rollback value | Notes |
| --- | --- | --- | --- |
| `<flag-name>` | no | `<value>` | `<notes>` |

## Deployment Rollback Notes

| Platform | Rollback action | Notes |
| --- | --- | --- |
| Web | `<action>` | `<notes>` |
| iOS | `<action-or-not-applicable>` | `<notes>` |
| Android | `<action-or-not-applicable>` | `<notes>` |

## Manual Recovery Notes

| Recovery step | Owner | Evidence |
| --- | --- | --- |
| `<step>` | `<owner>` | `<evidence>` |

## Rollback Validation

| Check | Required? | Evidence |
| --- | --- | --- |
| Rollback path reviewed | yes | `<evidence>` |
| Data safety reviewed | when applicable | `<evidence>` |
| Release notes align with rollback notes | yes | `<evidence>` |
