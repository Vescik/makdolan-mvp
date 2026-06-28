# Agent Handoff Packet Template

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-template-agent-handoff-packet` |
| class | `template` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Provides a reusable scaffold for transferring AI Brain task context between agents or sessions. |
| domain | AI Brain agent platform |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this template when pausing, resuming, or transferring work between agents or sessions. Keep it concise, source-linked, and free of secrets.

## Task

- Task name:
- Objective:
- Requested by:
- Date:
- Agent/runtime:

## Current Phase

`DISCOVER`, `PLAN`, `EXECUTE`, `VERIFY`, or `ITERATE`.

Current status:

## Source Files Read

- `path/to/file`: reason read and key fact.

## Decisions Made

- Decision:
- Source/evidence:
- Why it matters:

## Assumptions

- Assumption:
- Confidence:
- How to verify:

## Changed Files

- `path/to/file`: change summary.

## Commands Run

| Command | Result | Key Output Or Evidence |
| --- | --- | --- |
| `command` | PASS/FAIL/SKIPPED | Evidence or skip reason. |

## Validation Evidence

- Validation status:
- Required checks completed:
- Checks skipped and why:
- Follow-up validation needed:

## Unresolved Risks

- Risk:
- Impact:
- Recommended mitigation:

## Next Action

The next agent or maintainer should:

1. 
2. 
3. 

## Stop Conditions

Stop and ask for guidance if:

- 
- 
- 

## Handoff Notes

- Do not include `.env.local`, secrets, tokens, credentials, authorization headers, private user data, payment data, raw chat transcripts, or full source dumps.
- Re-check generated artifact freshness before relying on context packs, impact reports, indexes, or planning artifacts.
- Re-run validation if files changed after this packet was written.
