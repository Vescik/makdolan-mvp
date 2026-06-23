# Connectors and MCP Plan

Use connectors/MCP only when they reduce manual context gathering or automate safe, repeatable actions.

## Recommended connectors

| Area | Recommended integration | Purpose | Approval level |
|---|---|---|---|
| GitHub | Codex GitHub integration or GitHub MCP | PR context, issues, branches, code review | Prompt before write/push |
| Project management | Linear/Jira/Azure DevOps MCP | Fetch user stories, acceptance criteria, comments | Read auto, write prompt |
| Documentation | Google Drive/Docs or Markdown KB | Product decisions, specs, release notes | Read auto, write prompt |
| Design | Figma MCP/plugin if used | UI specs, tokens, screens | Read auto |
| Browser | Chrome/Playwright MCP | Web smoke tests and UI debugging | Prompt for network/open-world |
| Mobile release | Fastlane via scripts, not direct agent magic | Build/sign/release automation | Always explicit approval |
| Observability | Sentry/Datadog MCP if used | Crash/error investigation | Read auto, write prompt |

## MCP principles

- Keep MCP tools narrow.
- Prefer read-only tools by default.
- Destructive actions require explicit approval.
- Do not expose production secrets directly to Codex.
- Use environment variables and least-privilege tokens.

## Example MCP commands

```bash
# Developer docs MCP example
codex mcp add context7 -- npx -y @upstash/context7-mcp

# List configured MCP servers
codex mcp list --json
```

## Azure DevOps example

If your work items live in Azure DevOps, expose a read-mostly MCP with tools like:

- `get_work_item(id)`
- `search_work_items(query)`
- `get_acceptance_criteria(id)`
- `add_design_note(id, markdown)` – approval required

Codex workflow:

1. Fetch user story.
2. Build a context pack.
3. Search knowledge base.
4. Discover code impact.
5. Plan and implement.
