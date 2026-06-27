# Open Decisions

Track decisions that should not be silently made by Codex.

## Entry Format

Use `.ai/brain/templates/open-decision-template.md` for new entries.

Every open decision should include a concise decision title, status, and note explaining what is unresolved, why it matters, and when or by whom it should be resolved. Move stale or completed items to `Resolved Decisions` during phase closeout.

## Current Open Decisions

| Decision | Status | Notes |
|---|---|---|
| Native production build path | Open | No native `ios/` or `android/` folders are present. Decide later whether to use Expo/EAS or checked-in native projects for release validation. |
| Markdown/docs validation tooling | Open | No markdown lint or link-check script is configured. Decide whether docs checks are worth adding after AI Brain structure stabilizes. |
| AI Brain automation enablement | Open | Existing Codex GitHub workflows are present. Additional AI Brain automation should be designed and approved before enabling. |

## Resolved Decisions

None yet.
