# ADR-0002: MVP Data Sources

Date: 2026-06-23
Status: Proposed

## Context

The app needs nearby restaurant discovery and menu price data. Restaurant discovery is available through official place APIs, but menu prices are often incomplete, stale, restricted, or unavailable through official channels.

## Decision

Use a layered data strategy:

1. Controlled seed data for popular chains and one local test city.
2. Google Places for nearby restaurant discovery.
3. User-submitted price observations.
4. Restaurant self-service panel in later phases.
5. Official APIs or partnerships.
6. Scraping only as legal-review research, not production data.

## Rationale

This prioritizes speed and compliance while keeping data quality visible. Controlled seed data lets the MVP launch with known examples. Google Places solves nearby discovery without pretending to provide menu prices. User observations validate demand and improve freshness. Partnerships and restaurant self-service become useful only after the MVP proves demand.

## Consequences

Positive:

- Lower legal and operational risk than production scraping.
- Clear provenance for every price.
- Good enough initial coverage for MVP validation.
- Supports gradual improvements through user feedback.

Negative:

- Initial coverage will be incomplete.
- Manual seed maintenance is required.
- Price confidence must be surfaced honestly.
- Google Places cost and terms must be monitored.

## Acceptance Criteria

- Every menu price has source type, last verification date, and confidence score.
- Google Places is used for restaurant discovery, not assumed price data.
- Scraping is not required for production launch.
- User observations do not become high-confidence data without corroboration or moderation.

