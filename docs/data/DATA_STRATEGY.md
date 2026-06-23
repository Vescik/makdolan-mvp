# MVP Data Strategy

## Purpose

The MVP needs enough reliable food availability and price data to recommend nearby meals within a user-entered budget. The goal is validation, not full market coverage.

The data strategy prioritizes controlled, explainable sources over broad but unreliable collection. Production scraping is not a primary data source.

## Data Source Priority

1. Controlled seed data for popular chains and one local test city.
2. Google Places for nearby restaurant discovery.
3. User-submitted price observations.
4. Restaurant self-service panel in later phases.
5. Official APIs or partnerships.
6. Scraping only as a risky research option requiring legal review.

## Data Needed For MVP

### Restaurant Discovery Data

| Field | Purpose | Source |
|---|---|---|
| Place ID | Stable external identifier for deduplication. | Google Places |
| Name | Restaurant display and matching to seed data. | Google Places |
| Address | User confidence and disambiguation. | Google Places |
| Latitude / longitude | Distance and nearby search. | Google Places |
| Business status | Hide closed or unavailable places. | Google Places |
| Opening hours summary | Help rank currently available options. | Google Places |
| Price level | Weak affordability signal when available. | Google Places |
| Rating / review count | Optional quality signal, not the primary ranking factor. | Google Places |
| Website / phone | Optional verification and feedback context. | Google Places |

### Food/Menu Price Data

| Field | Purpose | Source |
|---|---|---|
| Item name | User-facing recommendation label. | Seed data, user observations, later self-service |
| Item category | Preference matching such as burger, pizza, chicken, vegetarian, healthy. | Seed data |
| Item tags | Filtering and ranking. | Seed data, moderation |
| Base price | Budget fit. | Seed data, user observations |
| Currency | Correct budget comparison. | Seed data, user observations |
| Portion size | Distinguish snack, small meal, filling meal. | Seed data, moderation |
| Availability channel | Pickup, delivery, dine-in, unknown. | Seed data, user observations |
| Source type | Seed, user observation, partner, official API. | System |
| Last verified at | Stale data control. | System |
| Confidence score | Ranking and UI disclosure. | System |

### User Feedback Data

| Field | Purpose |
|---|---|
| Recommendation shown | Evaluate relevance. |
| User action | Useful, not useful, price wrong, unavailable, too far, preference mismatch. |
| Submitted price | Refresh price observations. |
| Optional photo/receipt flag | Future verification path; not required for MVP. |
| Approximate location context | Improve local coverage without storing precise history unnecessarily. |

## Data Not Needed For MVP

- Ordering, basket, checkout, delivery tracking, or courier data.
- Full restaurant menu coverage.
- Nutrition facts beyond simple user-facing tags such as healthy or vegetarian.
- Real-time inventory.
- Loyalty account integration.
- Payment card data.
- Persistent precise location history.
- Automated scraping pipelines.
- User identity beyond what is required for abuse prevention and feedback quality.

## Initial Coverage Plan

### Phase 0: Internal Seed Dataset

Create a manually curated seed dataset for:

- Popular chains likely to exist in many cities: McDonald's, KFC, Burger King, Subway, pizza chains, kebab chains where regionally relevant.
- One local test city with 20 to 50 manually entered restaurant/menu observations.
- Budget-friendly food categories: burger, chicken, pizza, kebab, sandwich, vegetarian, healthy, snack, small meal, filling meal.

Seed data should be intentionally limited and transparent. Each item must include source type, last verified date, and confidence score.

### Phase 1: Nearby Restaurant Discovery

Use Google Places to discover nearby restaurants around the user's entered location or current location. Store normalized place records and map them to seed/observed food items when possible.

Google Places should answer: "What restaurants are nearby?"

It should not be treated as the source of menu prices unless a specific official field or licensed partner source provides that data.

### Phase 2: User Price Observations

Let users report:

- Price is correct.
- Price is wrong.
- New observed price.
- Item unavailable.
- Restaurant closed or not relevant.

Use observations to update confidence, detect stale prices, and prioritize manual review.

### Phase 3: Restaurant Self-Service

After MVP validation, allow restaurants to claim or manage menu snippets, budget items, and availability. Treat restaurant-submitted data as higher confidence than anonymous user observations, but still subject to moderation and change history.

### Phase 4: Official APIs And Partnerships

Prioritize official or licensed data sources where available. Partnerships can improve freshness and coverage, but should be evaluated against cost, coverage, integration effort, and lock-in risk.

## Update Frequency

| Data Type | MVP Update Frequency | Notes |
|---|---|---|
| Google Places restaurant discovery | On user search, with caching | Cache by geohash/search area and respect provider terms. |
| Seed chain prices | Manual review every 30 days | More often for known volatile categories. |
| Local test city prices | Manual review every 14 to 30 days | Prioritize high-traffic or low-confidence items. |
| User observations | Accepted immediately as low/medium confidence | Higher confidence after corroboration or moderation. |
| Restaurant self-service data | Near real time after moderation rules | Later phase. |
| Official partner data | Per partner contract/API limits | Later phase. |

## Confidence Score

Each menu item price should expose an internal confidence score from `0` to `100`.

Recommended starting model:

| Signal | Impact |
|---|---|
| Official/partner source | Strong positive |
| Restaurant self-service source | Strong positive after claim verification |
| Recent manual seed verification | Positive |
| Multiple matching user observations | Positive |
| Recent conflicting observations | Negative |
| Price older than freshness window | Negative |
| Source is unreviewed or imported from research | Strong negative |

Suggested confidence bands:

| Score | Meaning | Product Behavior |
|---|---|---|
| 80-100 | High confidence | Can rank normally and show "recently verified". |
| 50-79 | Medium confidence | Can recommend with "price may vary" disclosure. |
| 20-49 | Low confidence | Use only when options are limited; ask for feedback. |
| 0-19 | Untrusted | Hide from recommendations unless manually reviewed. |

## Anti-Stale-Data Strategy

- Store `last_verified_at` and `source_type` for every price.
- Lower confidence automatically as data ages.
- Show price freshness language when confidence is medium or low.
- Prefer recently verified options when recommendations are otherwise similar.
- Ask for user confirmation after recommendations: "Was this price accurate?"
- Prioritize review queues by high search demand, stale data, conflicting observations, and high recommendation volume.
- Keep change history for prices so the system can detect suspicious jumps or abuse.

## Legal And Compliance Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Misuse of third-party provider data | API suspension or legal exposure. | Use official APIs according to terms; store/cache only what terms permit. |
| Scraping menus or prices without permission | Legal and operational risk. | Do not use scraping as production data source; require legal review for research. |
| Incorrect prices | User trust loss. | Show confidence/freshness, collect feedback, avoid ordering guarantees. |
| User-submitted abusive or fake prices | Poor recommendations and trust loss. | Rate limits, moderation, anomaly detection, source confidence. |
| Location privacy | Regulatory and trust risk. | Minimize storage, support manual location, avoid precise location history unless required. |
| Chain trademark/brand misuse | Brand/legal risk. | Use factual restaurant names and avoid implying partnership unless one exists. |

## Acceptance Criteria

- MVP can recommend food options using seed prices and nearby restaurant discovery.
- Price records include source, currency, last verification, and confidence.
- Google Places is used for nearby restaurant discovery, not as an assumed menu-price source.
- User feedback can improve price confidence without automatically making untrusted data authoritative.
- Scraping is documented only as a legal-review research option.
- Data strategy supports iOS, Android, and Web clients through the same API contract.

