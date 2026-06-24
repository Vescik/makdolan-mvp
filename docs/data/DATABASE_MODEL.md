# Database Model

## Purpose

This document defines the implementation-ready conceptual data model for the Makdolan MVP. The model supports budget-based food recommendations using nearby restaurants, menu items, prices, user preferences, recommendation requests, recommendation results, and feedback.

It should guide future Prisma/Postgres schema work, TypeScript domain types, seed imports, and API contracts. It is not a migration file and does not connect real APIs.

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

## MVP Data Principles

- Start with controlled seed data for popular chains and one local test city.
- Use Google Places only for restaurant/place discovery, deduplication, location, open status, rating, and address metadata.
- Do not treat Google Places as a menu-price source unless a licensed provider field explicitly supports that use.
- Use Rzeszow as the first test market.
- Add user-submitted price observations after the seeded MVP flow works.
- Do not use production scraping as the primary data source.
- Every price used for recommendations must have `source`, `lastVerifiedAt`, and `confidence`.
- Treat prices as estimates unless the source contract supports stronger wording.
- Keep the recommendation engine deterministic and testable before introducing ML or AI personalization.
- Store only the minimum location and user data needed for search, feedback, and product validation.
- Keep reliability fields as hidden system data in MVP UI. Result cards must not expose `source`, `sourceUrl`, `lastVerifiedAt`, `confidence`, scoring breakdown, or price observation details.

## Naming And Type Conventions

The fields below use Prisma-friendly camelCase names. Types are conceptual and can map to Prisma/Postgres as `String`, `DateTime`, `Decimal`, `Float`, `Boolean`, `String[]`, enums, JSON, or relations.

Recommended shared enums:

| Enum | Initial Values |
|---|---|
| `RestaurantBrandType` | `chain`, `local`, `regional` |
| `PortionSize` | `snack`, `smallMeal`, `regularMeal`, `fillingMeal` |
| `FulfillmentMode` | `pickup`, `dineIn`, `delivery` |
| `PriceSource` | `manualSeed`, `userObservation`, `restaurantSelfService`, `partner`, `officialApi` |
| `FeedbackType` | `useful`, `notUseful`, `priceWrong`, `itemUnavailable`, `tooFar`, `tooExpensive`, `wrongPreference`, `notInterested` |

## Core Entities

### User

Represents a signed-in user when authentication exists. MVP can support anonymous searches before this table is fully used.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `email` | string, nullable/unique | User email for authenticated accounts. Nullable if anonymous users are supported separately. |
| `createdAt` | DateTime | Account creation timestamp. |
| `updatedAt` | DateTime | Last account update timestamp. |

### UserPreference

Stores saved default preferences for a user. MVP can mock this locally until authentication is implemented.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `userId` | UUID/string | Foreign key to `User.id`. |
| `preferredTags` | string[] | Preferred food tags such as `burger`, `chicken`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`. |
| `excludedTags` | string[] | Tags the user wants to avoid. |
| `preferredPortionSize` | PortionSize, nullable | Default portion preference. |
| `dietPreferences` | string[] | Future dietary preferences. Sprint 1 only uses `vegetarian` as a simple user-facing food tag. |
| `maxDistanceKm` | Float/Decimal, nullable | Default search radius. |
| `preferredFulfillmentMode` | FulfillmentMode, nullable | Default mode. Sprint 1 uses pickup/dine-in style only; delivery is a future value. |
| `createdAt` | DateTime | Creation timestamp. |
| `updatedAt` | DateTime | Last update timestamp. |

### RestaurantBrand

Represents a chain, regional brand, or local restaurant identity.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `name` | string | User-facing brand name, for example `McDonald's`. |
| `normalizedName` | string | Lowercase normalized key for matching, for example `mcdonalds`. |
| `type` | RestaurantBrandType | `chain`, `regional`, or `local`. |
| `websiteUrl` | string, nullable | Optional official website for review context. |
| `createdAt` | DateTime | Creation timestamp. |
| `updatedAt` | DateTime | Last update timestamp. |

### RestaurantOutlet

Represents a physical restaurant location that can be matched to menu items.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `brandId` | UUID/string | Foreign key to `RestaurantBrand.id`. |
| `googlePlaceId` | string, nullable/unique | Google Places ID for deduplication and discovery metadata. |
| `name` | string | Outlet display name. |
| `address` | string | Human-readable address. |
| `city` | string | City or test market. |
| `latitude` | Float/Decimal | Latitude for distance search. |
| `longitude` | Float/Decimal | Longitude for distance search. |
| `rating` | Float, nullable | Optional Google Places or partner rating. Used as a light ranking signal only. |
| `isOpenNow` | Boolean, nullable | Best-effort open status. Unknown should not be shown as guaranteed open. |
| `lastSyncedAt` | DateTime, nullable | Last time outlet metadata was synced from Google Places or another approved source. |
| `createdAt` | DateTime | Creation timestamp. |
| `updatedAt` | DateTime | Last update timestamp. |

### MenuItem

Represents a recommendable food item. For MVP, the current best-known price is stored directly on `MenuItem` to keep the schema simple. Historical or user-submitted prices are stored in `PriceObservation`.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `brandId` | UUID/string | Foreign key to `RestaurantBrand.id`. MVP menu items are usually brand-level or local-brand-level. |
| `name` | string | User-facing item name, for example `Cheeseburger`. |
| `description` | string, nullable | Short description when available from controlled seed data or approved source. |
| `category` | string/enum | Primary category such as `burger`, `chicken`, `pizza`, `kebab`, `sandwich`. |
| `tags` | string[] | Recommendation/filter tags such as `burger`, `chicken`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`. |
| `portionSize` | PortionSize | Portion classification used by scoring. |
| `basePrice` | Decimal | Current best-known estimated price. |
| `currency` | string | ISO currency code, for example `PLN`. |
| `calories` | integer, nullable | Optional rough calorie value. Not required for MVP recommendations. |
| `source` | PriceSource | Source of the current `basePrice`. |
| `sourceUrl` | string, nullable | Optional source reference. Do not store restricted scraped URLs as production evidence. |
| `lastVerifiedAt` | DateTime | Required. Date the current price was last checked or accepted. |
| `confidence` | integer | Required. `0` to `100`; values below `20` should not appear in normal recommendations. |
| `createdAt` | DateTime | Creation timestamp. |
| `updatedAt` | DateTime | Last update timestamp. |

Practical MVP rule: if the same brand has location-specific prices, create separate menu items for the local test city or add a future join table. Do not introduce complex price tables before the MVP needs them.

### PriceObservation

Represents a user, operator, or future restaurant-submitted price observation.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `menuItemId` | UUID/string | Foreign key to `MenuItem.id`. |
| `outletId` | UUID/string | Foreign key to `RestaurantOutlet.id`, identifying where the price was observed. |
| `observedPrice` | Decimal | Observed price value. |
| `currency` | string | ISO currency code. |
| `sourceType` | PriceSource/string | `userObservation`, `manualSeed`, `restaurantSelfService`, `partner`, or `officialApi`. |
| `sourceDescription` | string, nullable | Human-readable source note, for example `User reported in app`. No secrets or private data. |
| `observedAt` | DateTime | When the price was observed or submitted. |
| `confidence` | integer | `0` to `100`, representing trust in this specific observation. |
| `createdByUserId` | UUID/string, nullable | Foreign key to `User.id` when submitted by a signed-in user. Nullable for anonymous/operator imports. |

Practical MVP rule: observations do not automatically overwrite `MenuItem.basePrice`. They inform review queues, confidence changes, and stale-data handling.

### RecommendationRequest

Represents a submitted recommendation search.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `userId` | UUID/string, nullable | Foreign key to `User.id` for signed-in users. Nullable for anonymous MVP searches. |
| `budget` | Decimal | User-entered budget. |
| `currency` | string | ISO currency code. |
| `latitude` | Float/Decimal | Search latitude. Store with appropriate privacy controls. |
| `longitude` | Float/Decimal | Search longitude. Store with appropriate privacy controls. |
| `selectedTags` | string[] | Tags selected for the search. |
| `excludedTags` | string[] | Tags excluded for the search. |
| `preferredPortionSize` | PortionSize, nullable | Requested portion size. |
| `maxDistanceKm` | Float/Decimal | Search radius. |
| `fulfillmentMode` | FulfillmentMode, nullable | Requested fulfillment mode. Sprint 1 uses pickup/dine-in style only; delivery is future. |
| `createdAt` | DateTime | Search timestamp. |

MVP privacy note: exact request coordinates may be kept transiently or rounded unless analytics truly requires storage.

### RecommendationResult

Represents one scored result shown for a request.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `requestId` | UUID/string | Foreign key to `RecommendationRequest.id`. |
| `menuItemId` | UUID/string | Foreign key to `MenuItem.id`. |
| `outletId` | UUID/string | Foreign key to `RestaurantOutlet.id`. |
| `estimatedTotalPrice` | Decimal | Price used for ranking and display. Usually `MenuItem.basePrice` for MVP. |
| `score` | Float/Decimal | Deterministic recommendation score from `SCORING_MODEL.md`. |
| `reason` | string | Short explanation, for example `Fits your budget, matches chicken, price may vary by location`. |
| `confidence` | integer | Internal confidence for reliability, tests, and future ranking. Do not expose this value in MVP result cards. |
| `createdAt` | DateTime | Result creation timestamp. |

MVP rule: this table is useful for feedback and analytics, but results can be computed in memory until persistence is introduced.

### UserFeedback

Captures user feedback on a shown recommendation.

| Field | Type | Description |
|---|---|---|
| `id` | UUID/string | Primary key. |
| `userId` | UUID/string, nullable | Foreign key to `User.id`. Nullable for anonymous MVP feedback if allowed. |
| `recommendationResultId` | UUID/string | Foreign key to `RecommendationResult.id`. |
| `feedbackType` | FeedbackType | Feedback category. |
| `comment` | string, nullable | Optional short comment. Validate length and avoid sensitive data. |
| `createdAt` | DateTime | Feedback timestamp. |

## Relationships

- `User` 1:N `UserPreference`
- `RestaurantBrand` 1:N `RestaurantOutlet`
- `RestaurantBrand` 1:N `MenuItem`
- `MenuItem` 1:N `PriceObservation`
- `RestaurantOutlet` 1:N `PriceObservation`
- `RecommendationRequest` 1:N `RecommendationResult`
- `RecommendationResult` 1:N `UserFeedback`
- `User` 1:N `RecommendationRequest` when signed in
- `User` 1:N `UserFeedback` when signed in

## MVP vs Later

| Area | Required In MVP | Can Be Mocked In MVP | Postponed After MVP |
|---|---|---|---|
| Users | Anonymous or simple user identity for feedback if needed. | Full `User` auth and saved profile can be mocked locally. | Account management, social login, privacy export/delete tooling. |
| Preferences | Search-time selected tags, excluded tags, portion size, distance, fulfillment mode. | `UserPreference` persistence. | Advanced personalization and learned preferences. |
| Restaurants | `RestaurantBrand` and `RestaurantOutlet` seed records for Rzeszow chains and local-style categories. | Google Places sync can be mocked with local outlets. | Restaurant claim/self-service portal. |
| Menu items | Seeded `MenuItem` rows with price, tags, portion, source, `lastVerifiedAt`, confidence. | Descriptions. | Full menu catalogs, item images, modifiers, combos, nutrition/macros. |
| Price observations | Manual/operator observations for seed verification. | User-submitted observations until feedback flow exists. | Receipt/photo verification and automated moderation. |
| Recommendation requests/results | In-memory scoring for local MVP; persisted records if feedback needs exact result history. | Analytics storage. | ML training datasets and experimentation platform. |
| Feedback | Basic useful/not useful/price wrong categories. | Free-text comments can be disabled initially. | Reputation scoring and advanced review queues. |
| Data sources | Controlled seed data. | Google Places responses. | Official partnerships, restaurant self-service, licensed APIs. |
| Scraping | Not required. | None. | Research-only workflow after legal review. |

## Example Records

These examples show the intended shape. IDs are illustrative.

### Restaurant Brands

```json
[
  {
    "id": "brand_mcdonalds_pl",
    "name": "McDonald's",
    "normalizedName": "mcdonalds",
    "type": "chain",
    "websiteUrl": "https://mcdonalds.pl",
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  },
  {
    "id": "brand_kfc_pl",
    "name": "KFC",
    "normalizedName": "kfc",
    "type": "chain",
    "websiteUrl": "https://kfc.pl",
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  },
  {
    "id": "brand_local_kebab_rzeszow",
    "name": "Rzeszow Kebab",
    "normalizedName": "rzeszow-kebab",
    "type": "local",
    "websiteUrl": null,
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  }
]
```

### Restaurant Outlets

```json
[
  {
    "id": "outlet_mcd_rzeszow_001",
    "brandId": "brand_mcdonalds_pl",
    "googlePlaceId": "google_place_mcd_rzeszow_001",
    "name": "McDonald's Rzeszow Centrum",
    "address": "ul. 3 Maja 10, Rzeszow",
    "city": "Rzeszow",
    "latitude": 50.0412,
    "longitude": 21.9991,
    "rating": 4.1,
    "isOpenNow": true,
    "lastSyncedAt": "2026-06-24T09:00:00Z",
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  },
  {
    "id": "outlet_kebab_rzeszow_001",
    "brandId": "brand_local_kebab_rzeszow",
    "googlePlaceId": "google_place_kebab_rzeszow_001",
    "name": "Rzeszow Kebab",
    "address": "ul. Grunwaldzka 12, Rzeszow",
    "city": "Rzeszow",
    "latitude": 50.0379,
    "longitude": 22.0047,
    "rating": 4.4,
    "isOpenNow": true,
    "lastSyncedAt": "2026-06-24T09:00:00Z",
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  }
]
```

### Menu Items Within A 25 PLN Budget

```json
[
  {
    "id": "item_mcd_cheeseburger",
    "brandId": "brand_mcdonalds_pl",
    "name": "Cheeseburger",
    "description": "Small burger suitable for a quick budget meal.",
    "category": "burger",
    "tags": ["burger", "smallMeal", "pickup", "dineIn"],
    "portionSize": "smallMeal",
    "basePrice": 7.9,
    "currency": "PLN",
    "calories": null,
    "source": "manualSeed",
    "sourceUrl": null,
    "lastVerifiedAt": "2026-06-23T00:00:00Z",
    "confidence": 70,
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  },
  {
    "id": "item_kfc_longer",
    "brandId": "brand_kfc_pl",
    "name": "Longer",
    "description": "Budget chicken sandwich.",
    "category": "chicken",
    "tags": ["chicken", "sandwich", "smallMeal", "pickup", "dineIn"],
    "portionSize": "smallMeal",
    "basePrice": 12.99,
    "currency": "PLN",
    "calories": null,
    "source": "manualSeed",
    "sourceUrl": null,
    "lastVerifiedAt": "2026-06-23T00:00:00Z",
    "confidence": 68,
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  },
  {
    "id": "item_kebab_small",
    "brandId": "brand_local_kebab_rzeszow",
    "name": "Small Kebab",
    "description": "Local-style kebab option under 25 PLN.",
    "category": "kebab",
    "tags": ["kebab", "fillingMeal", "pickup", "dineIn"],
    "portionSize": "fillingMeal",
    "basePrice": 22.0,
    "currency": "PLN",
    "calories": null,
    "source": "manualSeed",
    "sourceUrl": null,
    "lastVerifiedAt": "2026-06-22T00:00:00Z",
    "confidence": 65,
    "createdAt": "2026-06-24T10:00:00Z",
    "updatedAt": "2026-06-24T10:00:00Z"
  }
]
```

### Recommendation Request And Result

```json
{
  "request": {
    "id": "req_25pln_chicken_rzeszow",
    "userId": null,
    "budget": 25.0,
    "currency": "PLN",
    "latitude": 50.0412,
    "longitude": 21.9991,
    "selectedTags": ["chicken"],
    "excludedTags": [],
    "preferredPortionSize": "smallMeal",
    "maxDistanceKm": 3,
    "fulfillmentMode": "pickup",
    "createdAt": "2026-06-24T12:00:00Z"
  },
  "result": {
    "id": "result_kfc_longer",
    "requestId": "req_25pln_chicken_rzeszow",
    "menuItemId": "item_kfc_longer",
    "outletId": "outlet_kfc_rzeszow_001",
    "estimatedTotalPrice": 12.99,
    "score": 84.2,
    "reason": "Fits your budget, matches chicken, price may vary by location",
    "confidence": 68,
    "createdAt": "2026-06-24T12:00:01Z"
  }
}
```

## Data Freshness

`lastVerifiedAt` records when the app last checked or accepted the current price. `confidence` records how much the system trusts that price from `0` to `100`.

Suggested confidence bands:

| Confidence | Meaning | Recommendation Behavior |
|---:|---|---|
| 80-100 | High confidence | Rank normally. This value remains internal in MVP UI. |
| 50-79 | Medium confidence | Rank normally but allow simple "price may vary by location" copy if needed. |
| 20-49 | Low confidence | Rank lower; use when better options are unavailable. |
| 0-19 | Untrusted | Hide from normal recommendations. |

Suggested stale behavior:

- Prices verified in the last 14 days are fresh.
- Prices from 15 to 30 days old can rank but should lose freshness score.
- Prices from 31 to 60 days old should rank lower and ask for confirmation.
- Prices older than 60 days should be treated as stale and usually require review before ranking.
- Repeated "price wrong" feedback should lower confidence and create a review task.

Stale data should affect ranking through the freshness/confidence component in `SCORING_MODEL.md`. It should also affect copy: never show stale or low-confidence prices as guaranteed. MVP user-facing copy should stay simple, such as "estimated price" or "price may vary by location."

## MVP UI Visibility

These fields must exist internally but are hidden from MVP result cards:

- `MenuItem.source`
- `MenuItem.sourceUrl`
- `MenuItem.lastVerifiedAt`
- `MenuItem.confidence`
- `PriceObservation` metadata
- `RecommendationResult.score` and score breakdown

MVP result cards show only restaurant or brand name, menu item name, estimated item price, and 1 to 3 simple matching tags.

## Indexing And Search Considerations

Future Postgres/Prisma implementation should plan for these indexes:

- Location: geospatial index on `RestaurantOutlet.latitude` and `RestaurantOutlet.longitude`, ideally PostGIS `geography`.
- Brand name: unique or indexed `RestaurantBrand.normalizedName`.
- Tags: GIN index or normalized join table for `MenuItem.tags` when filtering becomes expensive.
- Price: index on `MenuItem.currency`, `MenuItem.basePrice`, and `MenuItem.confidence`.
- Google Places: unique index on `RestaurantOutlet.googlePlaceId` where not null.
- Request/result analytics: indexes on `RecommendationRequest.createdAt`, `RecommendationResult.requestId`, and `UserFeedback.recommendationResultId`.

Do not over-optimize indexes before real query volume exists. The MVP only needs predictable schema design and clear future migration paths.

## Open Questions

- Should anonymous searches be persisted, or should `RecommendationRequest` store only aggregate analytics?
- Should exact latitude/longitude be stored, rounded, or kept only in memory for privacy?
- Should `MenuItem.basePrice` remain brand-level, or will local city/outlet prices require a dedicated `MenuItemPrice` table soon?
- Whether Rzeszow/PLN should remain the first test market after Sprint 1 or expand to another Polish city.
- What controlled tag vocabulary should be locked for the first MVP seed file?
- When should user-submitted observations become visible: immediately with low confidence, or only after review?
- What threshold should mark a price as materially different: fixed amount, percentage, or both?
- Should `UserPreference` require authentication, or should preferences stay device-local for MVP?

## Related Documents

- `docs/data/DATA_STRATEGY.md`
- `docs/data/MENU_SEED_FORMAT.md`
- `docs/data/PRICE_VERIFICATION_PROCESS.md`
- `docs/data/SCORING_MODEL.md`
- `docs/data/SCRAPING_POLICY.md`
- `docs/architecture/ADR-0002-data-sources.md`
- `docs/architecture/ADR-0003-recommendation-engine.md`
