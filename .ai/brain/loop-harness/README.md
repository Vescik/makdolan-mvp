# Loop Harness

The loop harness defines how AI Brain Pro controls larger work. It keeps multi-step tasks explicit, validated, and bounded.

Use these files when a task is broad, risky, ambiguous, or cross-platform:

| File | Purpose |
|---|---|
| `goal-contract-template.md` | Defines objective, scope, acceptance criteria, validation, and stop conditions. |
| `how-to-write-good-goals.md` | Explains how to write measurable Codex `/goal` prompts and manual loop contracts. |
| `validator-rules.md` | Explains what counts as validation evidence. |
| `maker-checker-flow.md` | Separates implementation from review/verification. |
| `permissions-policy.md` | Defines approval expectations for risky actions. |
| `worktree-policy.md` | Defines branch/worktree safety rules. |
| `automation-policy.md` | Defines how scheduled or external automation should behave. |
| `stop-conditions.md` | Defines when Codex should stop and ask for direction. |
| `cost-guardrails.md` | Defines network, dependency, API, and time-cost guardrails. |

The harness is procedural guidance. It should not override `AGENTS.md` or user instructions.
