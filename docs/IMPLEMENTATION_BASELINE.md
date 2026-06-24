# Implementation Baseline

This document is the source of truth for Sprint 1 implementation of the Makdolan MVP.

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

It converts the product, data, scoring, and architecture planning documents into the first working implementation target. It intentionally avoids app-store release work, real provider integrations, ordering, payments, production scraping, full authentication, delivery fee calculation, and full backend buildout.

## 1. MVP Goal

Build the first working cross-platform Makdolan app that helps a user answer:

> I do not know what to eat, I have a specific budget, and I want a quick suggestion.

The user enters a budget first, optionally selects simple preferences, and receives food ideas from Rzeszow mock/seed data that fit the budget.

The first working version must prove the core loop:

1. User enters a budget.
2. User uses mocked/default Rzeszow location or manual location.
3. User selects optional simple preferences.
4. App scores local seed menu items deterministically.
5. App shows a simple ranked recommendation list.
6. User can open a recommendation details screen.
7. Each recommendation uses simple user-facing tags without exposing internal reliability fields.

The Sprint 1 success criterion is a usable local prototype on iOS, Android, and Web surfaces, not a production data platform.

## 2. MVP Scope

Sprint 1 includes only:

- Budget input as the first screen.
- Currency fixed to `PLN`.
- Rzeszow mocked/default location or manual location.
- Basic preference selection:
  - `chicken`
  - `burger`
  - `pizza`
  - `kebab`
  - `vegetarian`
  - `small`
  - `filling`
  - `quick`
- Mock/seed menu data in local TypeScript files.
- Product-level food options for dine-in or pickup-style usage.
- Deterministic recommendation scoring.
- Simple ranked recommendation results.
- Recommendation details.
- Simple explanation why each item was recommended.

The implementation should keep all domain logic testable outside UI components.

## 3. Non-MVP Scope

Sprint 1 explicitly excludes:

- Real ordering.
- Basket/cart.
- Checkout.
- Payments.
- Subscriptions.
- Premium, paywalls, or recommendation/search limits.
- Production scraping.
- Full authentication.
- Restaurant owner panel.
- Restaurant self-service tools.
- Nutrition/macros.
- Advanced AI personalization.
- AI chat as the main interface.
- ML or collaborative filtering.
- Delivery fee calculation.
- Delivery ordering integration.
- Delivery pricing.
- Real-time menu availability.
- Distance display in MVP result cards.
- Real Google Places calls.
- Full backend/API implementation unless separately approved.
- Database migrations unless separately approved.

## 4. Selected Stack

The selected stack follows `docs/architecture/ADR-0001-cross-platform-stack.md`.

| Area | Sprint 1 Choice |
|---|---|
| Frontend | Expo React Native + TypeScript. |
| Routing | Expo Router. |
| Mobile delivery | One Expo app targeting iOS and Android. |
| Web delivery | React Native Web through Expo. |
| Backend | None required for Sprint 1. Use local mock/seed data and pure domain functions. |
| Future backend path | TypeScript API service or backend-as-a-service with explicit REST/JSON contracts. |
| Data storage | Local TypeScript seed data in Sprint 1. Future path: PostgreSQL with geospatial support/PostGIS where available. |
| Testing | Vitest for deterministic scoring/domain tests. Add UI tests later when flows stabilize. |
| Lint/static checks | ESLint and TypeScript. |
| Package manager | npm with `package-lock.json`. |

Do not add a new framework, backend, database, or state library in Sprint 1 unless the implementation cannot meet this baseline without it.

## 5. Data Source Rules

### Mockable Data

Sprint 1 may mock:

- Rzeszow user location.
- Restaurant outlet distance for internal ranking.
- Restaurant open status.
- Restaurant rating.
- Google Places IDs.
- Recommendation request/result persistence.
- User preferences.
- Feedback persistence.

Mocked data must be clearly local and must not imply real-time accuracy.

### Required Seed Data

Seed data should include:

- `RestaurantBrand` records for popular chains and local-style categories in Rzeszow.
- `RestaurantOutlet` records with city, address, internal distance or coordinates, rating, and open status.
- `MenuItem` records with price, currency, tags, portion size, source, `lastVerifiedAt`, and `confidence`.

Every menu price used internally must include:

- `source`
- `lastVerifiedAt`
- `confidence`

These reliability fields are system data. Do not show them in MVP result cards.

### Google Places

Google Places is postponed for Sprint 1. If any provider interface is created, it must be a mock/stub and must not make network calls.

Later, Google Places may be used only for restaurant/place discovery, deduplication, location, address, open status, and rating metadata. It must not be treated as guaranteed menu price data.

### Scraping

Scraping is not allowed as the production core. Do not create scraping code, scraping jobs, scraped datasets, or scraper-oriented abstractions in Sprint 1.

Scraping can only be discussed as isolated research after legal/compliance review, as defined in `docs/data/SCRAPING_POLICY.md`.

## 6. First Screens

### `HomeBudgetScreen`

Purpose: collect the budget first.

Required behavior:

- Enter budget amount.
- Use fixed/default currency `PLN`.
- Use mocked/default Rzeszow location or manual location.
- Navigate to preferences or directly to results with defaults.

### `PreferencesScreen`

Purpose: collect optional simple preferences.

Required behavior:

- Toggle simple tags: `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`.
- Continue to results.

Do not expose advanced filters, delivery filters, nutrition/macros, or premium-only filters in Sprint 1.

### `RecommendationResultsScreen`

Purpose: show a simple ranked result list.

Each MVP result card shows only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- 1 to 3 simple matching tags.

Result cards must not show:

- Distance.
- Confidence score.
- Price source.
- `sourceUrl`.
- `lastVerifiedAt`.
- Scoring breakdown.
- Price observation details.

User-facing copy may say:

- "Estimated price"
- "Price may vary by location"

### `RecommendationDetailsScreen`

Purpose: show enough detail to help the user decide.

Required behavior:

- Show restaurant or brand name.
- Show menu item name.
- Show estimated item price.
- Show simple matching tags.
- Show the note: "Estimated price may vary by location."

Do not expose internal scoring breakdown, confidence score, source metadata, `lastVerifiedAt`, `sourceUrl`, or price observation details in Sprint 1.

### `ProfilePreferencesScreen` Or Simple Settings Screen

Purpose: provide a place for local/default preference UI without requiring full auth.

Required behavior:

- Display or edit local/mock defaults for simple tags and portion preference.
- Do not require real account creation.
- Do not imply cloud sync unless auth/backend exists.

## 7. First Domain Objects

The first implementation should use the minimum domain objects below. These names should match `docs/data/DATABASE_MODEL.md`.

### `RestaurantBrand`

Minimum fields:

- `id`
- `name`
- `normalizedName`
- `type`

### `RestaurantOutlet`

Minimum fields:

- `id`
- `brandId`
- `name`
- `address`
- `city`
- internal `distanceKm` for ranking against the mocked Rzeszow market
- `rating`
- `isOpenNow`

### `MenuItem`

Minimum fields:

- `id`
- `brandId`
- `name`
- `category`
- `tags`
- `portionSize`
- `basePrice`
- `currency`
- `source`
- `lastVerifiedAt`
- `confidence`
- `fulfillmentModes`

### `UserPreference`

Minimum fields:

- `preferredTags`
- `excludedTags`
- `preferredPortionSize`
- `maxDistanceKm`
- `preferredFulfillmentMode`

This can be local-only in Sprint 1.

### `RecommendationRequest`

Minimum fields:

- `budget`
- `currency`
- `locationLabel`
- `testMarket` or city-level location label such as `Rzeszow`
- `selectedTags`
- `excludedTags`
- `preferredPortionSize`
- `maxDistanceKm`
- `fulfillmentMode`

### `RecommendationResult`

Minimum fields:

- `id`
- `menuItemId`
- `outletId`
- `estimatedTotalPrice`
- `score`
- `scoreBreakdown`
- `reason` or `reasons`
- `confidence`
- `displayTags`

`score`, `scoreBreakdown`, and `confidence` are internal fields. Do not show them on MVP result cards.

## 8. First Scoring Implementation

The first scoring function must follow `docs/data/SCORING_MODEL.md`.

### Function Shape

Implement a pure function that accepts:

- A `RecommendationRequest`.
- A list of candidate outlet/item pairs.

Return:

- Ranked `RecommendationResult[]`.
- Internal score breakdown for each result.
- Simple reasons/tags for each result.

The function must not call network APIs, maps APIs, OpenAI, payment providers, delivery platforms, scraping code, or UI components.

### Candidate Filtering

Before scoring:

1. Remove closed restaurants when `isOpenNow=false`.
2. Remove items with currency different from the request currency.
3. Remove items outside internal `maxDistanceKm`.
4. Remove items that do not support selected dine-in/pickup-style fulfillment mode, if selected.
5. Remove items containing excluded tags.
6. Remove items above budget from normal results.
7. Remove items with very low confidence, especially if alternatives exist.

Sprint 1 should keep primary results strictly within budget. A "slightly over budget" section is not part of Sprint 1.

### Score Formula

Each component must be normalized from `0.0` to `1.0`.

```text
score =
  budgetFit * 35
+ preferenceMatch * 25
+ distanceScore * 15
+ restaurantRating * 10
+ portionScore * 10
+ freshnessScore * 5
```

The score is internal system data and must not be shown on MVP result cards.

### Component Rules

- `budgetFit`: `0.0` if over budget; otherwise use `0.75 + ((budget - price) / budget) * 0.25`, clamped to `0.0..1.0`.
- `preferenceMatch`: `0.75` if no selected tags; otherwise matched selected tags divided by selected tag count. Excluded tags filter candidates out before scoring.
- `distanceScore`: use internal `1 - (distanceKm / maxDistanceKm)`, clamped. Distance is not shown on MVP result cards.
- `restaurantRating`: provider rating divided by `5`; use neutral `0.6` if unknown.
- `portionScore`: `1.0` exact match, `0.7` compatible match, `0.35` poor match, `0.75` if no preference.
- `freshnessScore`: combine internal `confidence` and age from `lastVerifiedAt`:

```text
confidenceScore = confidence / 100
freshnessScore = confidenceScore * 0.65 + ageScore * 0.35
```

Age score:

| Age | Score |
|---|---:|
| 0 to 14 days | 1.0 |
| 15 to 30 days | 0.7 |
| 31 to 60 days | 0.4 |
| More than 60 days | 0.15 |

### Explanation Rules

Generate reasons from scoring data only. Approved examples:

- "Fits your 25 PLN budget"
- "Matches chicken"
- "Good for a small meal"
- "Good for a filling meal"
- "Something quick"
- "Estimated price"
- "Price may vary by location"

Do not generate explanations using AI in Sprint 1.

## 9. Mock Data Requirements

Sprint 1 mock data must include at least:

- 4 restaurant brands.
- 4 restaurant outlets.
- 8 menu items.
- Items across budgets around 15 PLN, 25 PLN, and 40 PLN.
- Tags covering `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, and `quick`.
- At least one closed outlet or unavailable candidate for filter tests.
- At least one stale or lower-confidence item for freshness tests.

Suggested initial brands:

- McDonald's.
- KFC.
- Burger King.
- Subway, if useful.
- Rzeszow local kebab.
- Rzeszow local pizza.
- Rzeszow lunch bar / simple local food.

Suggested item mix:

| Item | Brand/category | Target Budget | Tags |
|---|---|---:|---|
| Cheeseburger | McDonald's | 15 PLN | `burger`, `small`, `quick` |
| Small fries | McDonald's | 15 PLN | `vegetarian`, `small`, `quick` |
| Small chicken box | KFC | 25 PLN | `chicken`, `filling`, `quick` |
| Chicken wrap | KFC | 25 PLN | `chicken`, `small`, `quick` |
| Small kebab | Rzeszow local kebab | 25 PLN | `kebab`, `filling`, `quick` |
| Vegetarian pizza slice | Rzeszow local pizza | 15 PLN | `pizza`, `vegetarian`, `small` |
| Medium pizza | Rzeszow local pizza | 40 PLN | `pizza`, `filling` |
| Lunch set | Rzeszow lunch bar | 40 PLN | `filling`, `quick` |

Every mock `MenuItem` must include:

- `basePrice`
- `currency`
- `source`
- `lastVerifiedAt`
- `confidence`

## 10. Verification Commands

Expected local verification for Sprint 1:

```bash
npm install
npm run typecheck
npm test
npm run lint
npm run build:web
```

If unsure which checks apply, run:

```bash
bash scripts/verify-local.sh
```

Optional local app smoke checks:

```bash
npm run web
npm run ios
npm run android
```

Use iOS/Android commands only when the local environment has the required simulator/emulator tooling. Web build is the minimum cross-platform artifact check available locally.

## 11. Definition Of Done For Sprint 1

Sprint 1 is done when:

- App shell routes exist for all first screens.
- Budget, Rzeszow mock/manual location, and preferences can produce a `RecommendationRequest`.
- Mock data includes the required brand/outlet/menu coverage.
- Deterministic scoring returns ranked `RecommendationResult` records.
- Results screen shows simple cards with restaurant/brand name, menu item name, estimated item price, and 1 to 3 matching tags.
- Result cards do not show distance, confidence, source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, or observation details.
- Details screen shows approved item information without exposing internal reliability fields.
- No-results state is useful.
- Scoring tests cover over-budget, tag match, excluded tags, internal distance, stale price, confidence, and no-results fallback.
- TypeScript, tests, lint, and web build pass.

## Next Codex Task

Use the build-loop skill.

Implement Sprint 1 from `docs/IMPLEMENTATION_BASELINE.md`.

Build:

- Expo React Native TypeScript app structure if missing.
- Routes and screens:
  - `HomeBudgetScreen`
  - `PreferencesScreen`
  - `RecommendationResultsScreen`
  - `RecommendationDetailsScreen`
  - `ProfilePreferencesScreen` or simple settings screen
- Local Rzeszow mock data with at least 4 restaurant brands, 4 outlets, and 8 menu items.
- Domain types for:
  - `RestaurantBrand`
  - `RestaurantOutlet`
  - `MenuItem`
  - `UserPreference`
  - `RecommendationRequest`
  - `RecommendationResult`
- Deterministic scoring function matching `docs/data/SCORING_MODEL.md`.
- Basic tests for scoring edge cases.
- Result card view model that exposes only restaurant/brand name, menu item name, estimated item price, and 1 to 3 simple matching tags.

Do not connect real APIs.
Do not implement ordering.
Do not implement payments or subscriptions.
Do not implement premium limits.
Do not implement scraping.
Do not require full authentication.
Do not show distance in MVP result cards.
Do not expose confidence, source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, or price observation details in MVP result cards.

Verify:

- `npm install`
- `npm run typecheck`
- `npm test`
- `npm run lint`
- `npm run build:web`

Update docs only if implementation discovers a concrete mismatch with this baseline.
