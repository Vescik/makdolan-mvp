# Architecture Principles

Use these principles when planning or reviewing Makdolan changes.

## Cross-Platform First

Treat iOS, Android, and Web as first-class targets. Shared domain logic should live outside platform UI code where possible. Platform-specific behavior should be isolated behind clear abstractions.

## Deterministic Core Logic

Recommendation ranking is deterministic and unit-testable. Do not move scoring into UI components or introduce network/model dependencies for the MVP ranking path without an approved architecture decision.

## User-Safe Presentation

Keep internal scoring, confidence, source, freshness, and review metadata available to domain logic and tests, but avoid exposing raw internal fields in MVP UI.

## Documentation Boundaries

- `docs/architecture/` contains architecture decisions and high-level design.
- `docs/data/` contains data model, seed format, scoring, and data quality policy.
- `knowledge-base/` stores durable architecture facts.
- `.ai/brain/` stores operating memory and planning context.

## Security And Privacy

Never persist secrets, credentials, tokens, authorization headers, private user data, or `.env.local` values in docs or memory. Treat user-submitted observations as untrusted input.

## Source Documents

- `docs/architecture/ARCHITECTURE.md`
- `docs/architecture/ADR-0001-cross-platform-stack.md`
- `docs/architecture/ADR-0002-data-sources.md`
- `docs/architecture/ADR-0003-recommendation-engine.md`
- `docs/data/SCORING_MODEL.md`
- `project-context/SECURITY_PRIVACY.md`
