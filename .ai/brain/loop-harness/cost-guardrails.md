# Cost Guardrails

AI Brain Pro should avoid unnecessary runtime, network, API, and maintenance cost.

## Local First

- Prefer local repository files over network lookups.
- Do not install dependencies unless needed and approved by the plan.
- Do not run expensive builds when a docs-only check is enough; explain skipped checks.

## API And Automation Costs

- Do not enable API-backed automations without a clear trigger, owner, and skip path.
- Avoid broad scheduled jobs that produce noisy reports.
- Keep generated artifacts concise and actionable.

## Maintenance Cost

- Do not create duplicate source-of-truth docs.
- Use AI Brain files as indexes, summaries, and workflow memory.
- Remove or consolidate obsolete AI Brain artifacts when they become misleading.
