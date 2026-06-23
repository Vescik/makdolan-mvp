# Security and Privacy

## Rules

- No secrets in repo.
- No sensitive data in logs.
- Use least-privilege tokens for MCP/connectors.
- Production deployments require explicit approval.

## Data inventory

| Data | Purpose | Storage | Retention | Risk |
|---|---|---|---|---|
| User search budget | Recommendation filtering | App/backend analytics | Short-lived or aggregated | Low |
| User location or manual location | Nearby discovery | Minimized; avoid precise history | Short-lived or aggregated | Medium |
| Preferences | Recommendation filtering | Search/session analytics | Aggregated | Low |
| Price observations | Data quality improvement | Application database | Retain with audit history | Medium |
| API keys | Provider access | Secret manager/env vars only | Rotated as needed | High |
