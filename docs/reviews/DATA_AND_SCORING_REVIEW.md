# Data And Scoring Review

Date: 2026-06-24

## Scope

Reviewed consistency after adding:

- `docs/data/DATABASE_MODEL.md`
- `docs/data/SCORING_MODEL.md`

Files checked:

- `docs/product/PRD.md`
- `docs/product/MVP_SCOPE.md`
- `docs/data/DATA_STRATEGY.md`
- `docs/data/SCRAPING_POLICY.md`
- `docs/data/DATABASE_MODEL.md`
- `docs/data/SCORING_MODEL.md`
- `docs/architecture/ADR-0002-data-sources.md`
- `docs/architecture/ADR-0003-recommendation-engine.md`
- `docs/roadmap/ROADMAP.md`

`docs/IMPLEMENTATION_BASELINE.md` does not exist in this repo at the time of review.

## Review Results

| Check | Result | Notes |
|---|---|---|
| Data model supports the scoring model. | Pass | `RecommendationRequest`, `RestaurantOutlet`, `MenuItem`, `PriceObservation`, and `RecommendationResult` provide the budget, location, distance, tags, portion, fulfillment, rating, price, confidence, and freshness inputs required by `SCORING_MODEL.md`. |
| Scoring model supports MVP user stories. | Pass | Supports budget search, preference filters, confidence/freshness messaging, no-results states, and feedback-driven improvement. |
| Scraping is not described as the main production source. | Pass | `SCRAPING_POLICY.md`, `DATA_STRATEGY.md`, and ADR-0002 all restrict scraping to legal-review research. |
| Google Places is discovery-only, not guaranteed menu prices. | Pass | Docs consistently position Google Places for place discovery, deduplication, location, open status, address, and rating metadata. |
| MVP does not depend on auth, payments, real scraping, or full backend. | Pass | Auth and saved preferences can be mocked or postponed. Payments and ordering are out of scope. Scraping is prohibited for production recommendations. Backend persistence can be introduced later; scoring can run with local/mock data first. |
| Entity names are consistent. | Pass after small fix | `DATA_STRATEGY.md` and ADR-0002 now reference `MenuItem`, `PriceObservation`, `source`, `lastVerifiedAt`, and `confidence` to match `DATABASE_MODEL.md`. |
| Open decisions are listed. | Pass | `DATABASE_MODEL.md` includes open questions for anonymous request storage, location precision, local/outlet pricing, first market/currency, tag vocabulary, observation review, price-difference thresholds, and auth for preferences. |

## Changes Made

### `docs/data/DATA_STRATEGY.md`

- Added explicit mapping from food/menu price data to `RestaurantBrand`, `RestaurantOutlet`, `MenuItem`, and `PriceObservation`.
- Replaced older snake_case wording such as `last_verified_at` and `source_type` with the model names `lastVerifiedAt`, `source`, and `confidence`.
- Clarified that `PriceObservation` history supports stale-data review and abuse detection.

### `docs/architecture/ADR-0002-data-sources.md`

- Updated acceptance criteria to use the same price field names as `DATABASE_MODEL.md`: `source`, `lastVerifiedAt`, and `confidence`.

## Consistency Notes

- `SCORING_MODEL.md` uses `restaurantRating` as the score component name. ADR-0003 describes the same concept generically as a basic quality signal such as rating/review count. This is consistent and does not require a doc change.
- `DATABASE_MODEL.md` stores the MVP current price directly on `MenuItem.basePrice`. This intentionally avoids a separate price table until outlet-specific pricing needs are proven.
- `PriceObservation` is evidence and history. It should not automatically overwrite `MenuItem.basePrice` without verification or moderation.
- Delivery fees are explicitly not included in MVP item prices unless a verified fee source is added later.

## Open Decisions To Confirm Later

- Whether anonymous `RecommendationRequest` records should be persisted or only aggregated.
- Whether exact latitude/longitude should be stored, rounded, or kept transient.
- Whether `MenuItem.basePrice` is enough for MVP, or whether outlet-specific prices require a future `MenuItemPrice` table.
- First test market and default currency.
- Locked controlled tag vocabulary for seed data and filters.
- Moderation threshold for user-submitted price observations.
- Material price difference threshold by fixed amount, percentage, or both.
- Whether `UserPreference` needs authentication or should remain device-local for MVP.
