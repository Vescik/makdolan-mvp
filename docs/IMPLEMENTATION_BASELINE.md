# Implementation Baseline

This document is the source of truth for Sprint 1 implementation of the Makdolan MVP.

It converts the product, data, scoring, and architecture planning documents into the first working implementation target. It intentionally avoids app-store release work, real provider integrations, ordering, payments, production scraping, and full backend buildout.

## 1. MVP Goal

Build the first working cross-platform Makdolan app that lets a user enter a food budget, choose or mock a location, select basic preferences, and receive ranked nearby food recommendations from mock/seed menu data.

The first working version must prove the core loop:

1. User enters a budget.
2. User provides a location or uses a mocked default location.
3. User selects optional food/meal preferences.
4. App scores local seed menu items deterministically.
5. App shows ranked recommendations.
6. User can open a recommendation details screen.
7. Each recommendation explains why it was shown.

The Sprint 1 success criterion is a usable local prototype on iOS, Android, and Web surfaces, not a production data platform.

## 2. MVP Scope

Sprint 1 includes only:

- Budget input with currency fixed to `PLN` unless a simple selector already exists.
- Location input or mocked location.
- Basic preference selection.
- Mock/seed menu data in local TypeScript files.
- Deterministic recommendation scoring.
- Ranked recommendation results.
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
- Production scraping.
- Full authentication.
- Restaurant owner panel.
- Restaurant self-service tools.
- Nutrition/macros.
- Advanced AI personalization.
- ML or collaborative filtering.
- Real delivery fee calculation.
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

- User location.
- Restaurant outlet distance.
- Restaurant open status.
- Restaurant rating.
- Google Places IDs.
- Recommendation request/result persistence.
- User preferences.
- Feedback persistence.

Mocked data must be clearly local and must not imply real-time accuracy.

### Required Seed Data

Seed data should include:

- `RestaurantBrand` records for common chains and at least one local restaurant.
- `RestaurantOutlet` records with city, address, distance or coordinates, rating, and open status.
- `MenuItem` records with price, currency, tags, portion size, source, `lastVerifiedAt`, and `confidence`.

Every menu price shown in a recommendation must include:

- `source`
- `lastVerifiedAt`
- `confidence`

### Google Places

Google Places is postponed for Sprint 1. If any provider interface is created, it must be a mock/stub and must not make network calls.

Later, Google Places may be used only for restaurant/place discovery, deduplication, location, address, open status, and rating metadata. It must not be treated as guaranteed menu price data.

### Scraping

Scraping is not allowed as the production core. Do not create scraping code, scraping jobs, scraped datasets, or scraper-oriented abstractions in Sprint 1.

Scraping can only be discussed as isolated research after legal/compliance review, as defined in `docs/data/SCRAPING_POLICY.md`.

## 6. First Screens

### `HomeBudgetScreen`

Purpose: collect the minimum search input.

Required behavior:

- Enter budget amount.
- Use fixed/default currency `PLN` unless a simple selector exists.
- Enter manual location or use a mocked default such as `Warsaw Centrum`.
- Navigate to preferences or directly to results with defaults.

### `PreferencesScreen`

Purpose: collect optional search preferences.

Required behavior:

- Toggle basic food tags: `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `healthy`.
- Toggle meal size tags or controls: `smallMeal`, `fillingMeal`.
- Select fulfillment mode: `pickup`, `delivery`, `dineIn`.
- Continue to results.

### `RecommendationResultsScreen`

Purpose: show ranked results.

Required behavior:

- Show food item, restaurant, estimated price, distance, score or confidence summary, and reasons.
- Sort by deterministic score.
- Show helpful no-results state.
- Navigate to recommendation details.

### `RecommendationDetailsScreen`

Purpose: explain a selected recommendation.

Required behavior:

- Show item name, restaurant/outlet, price, distance, tags, fulfillment modes, confidence, and `lastVerifiedAt`.
- Show score explanation/reasons.
- Clearly state that price is estimated and may vary unless confidence/source supports stronger wording.

### `ProfilePreferencesScreen` Or Simple Settings Screen

Purpose: provide a place for saved/default preference UI without requiring full auth.

Required behavior:

- Display or edit local/mock defaults for tags, portion size, distance, and fulfillment mode.
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
- `distanceKm` or `latitude` and `longitude`
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
- `latitude` and `longitude`, or mocked coordinates
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

## 8. First Scoring Implementation

The first scoring function must follow `docs/data/SCORING_MODEL.md`.

### Function Shape

Implement a pure function that accepts:

- A `RecommendationRequest`.
- A list of candidate outlet/item pairs.

Return:

- Ranked `RecommendationResult[]`.
- Score breakdown for each result.
- Human-readable reasons for each result.

The function must not call network APIs, maps APIs, OpenAI, payment providers, scraping code, or UI components.

### Candidate Filtering

Before scoring:

1. Remove closed restaurants when `isOpenNow=false`.
2. Remove items with currency different from the request currency.
3. Remove items outside `maxDistanceKm`.
4. Remove items that do not support selected fulfillment mode.
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

### Component Rules

- `budgetFit`: `0.0` if over budget; otherwise use `0.75 + ((budget - price) / budget) * 0.25`, clamped to `0.0..1.0`.
- `preferenceMatch`: `0.75` if no selected tags; otherwise matched selected tags divided by selected tag count. Excluded tags filter candidates out before scoring.
- `distanceScore`: use either bucket scoring or `1 - (distanceKm / maxDistanceKm)`, clamped. Prefer the continuous formula first because it is simpler to test.
- `restaurantRating`: provider rating divided by `5`; use neutral `0.6` if unknown.
- `portionScore`: `1.0` exact match, `0.7` compatible match, `0.35` poor match, `0.75` if no preference.
- `freshnessScore`: combine `confidence` and age from `lastVerifiedAt`:

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

Generate reasons from scoring data only. Examples:

- "Fits your 25 PLN budget"
- "Matches chicken preference"
- "Close to your location"
- "Pickup available"
- "Recently verified"
- "Price is estimated and may vary"

Do not generate explanations using AI in Sprint 1.

## 9. Mock Data Requirements

Sprint 1 mock data must include at least:

- 3 restaurant brands.
- 3 restaurant outlets.
- 8 menu items.
- Items across budgets around 15 PLN, 25 PLN, and 40 PLN.
- Tags covering `chicken`, `burger`, `pizza`, `vegetarian`, `smallMeal`, and `fillingMeal`.
- At least one closed outlet or unavailable candidate for filter tests.
- At least one stale or lower-confidence item for freshness tests.

Suggested initial brands:

- McDonald's
- KFC
- Local kebab restaurant

Suggested item mix:

| Item | Brand | Target Budget | Tags |
|---|---|---:|---|
| Cheeseburger | McDonald's | 15 PLN | `burger`, `smallMeal`, `pickup`, `dineIn` |
| Small fries | McDonald's | 15 PLN | `vegetarian`, `smallMeal`, `pickup`, `dineIn` |
| Chicken sandwich | KFC | 25 PLN | `chicken`, `smallMeal`, `pickup`, `dineIn` |
| Chicken wrap | KFC | 25 PLN | `chicken`, `smallMeal`, `pickup` |
| Small kebab | Local kebab | 25 PLN | `kebab`, `fillingMeal`, `pickup`, `dineIn` |
| Vegetarian pizza slice | Local pizza or kebab venue | 15 PLN | `pizza`, `vegetarian`, `smallMeal` |
| Medium pizza | Local pizza venue | 40 PLN | `pizza`, `fillingMeal`, `pickup`, `delivery` |
| Kebab plate | Local kebab | 40 PLN | `kebab`, `fillingMeal`, `pickup`, `dineIn` |

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
- Budget, location/mock location, and preferences can produce a `RecommendationRequest`.
- Mock data includes the required brand/outlet/menu coverage.
- Deterministic scoring returns ranked `RecommendationResult` records.
- Results screen shows ranked cards with price, restaurant, distance, confidence/freshness, and reasons.
- Details screen explains a selected recommendation.
- No-results state is useful.
- Scoring tests cover over-budget, tag match, excluded tags, distance, stale price, confidence, and no-results fallback.
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
- Local mock data with at least 3 restaurant brands, 3 outlets, and 8 menu items.
- Domain types for:
  - `RestaurantBrand`
  - `RestaurantOutlet`
  - `MenuItem`
  - `UserPreference`
  - `RecommendationRequest`
  - `RecommendationResult`
- Deterministic scoring function matching `docs/data/SCORING_MODEL.md`.
- Basic tests for scoring edge cases.

Do not connect real APIs.
Do not implement ordering.
Do not implement payments or subscriptions.
Do not implement scraping.
Do not require full authentication.

Verify:

- `npm install`
- `npm run typecheck`
- `npm test`
- `npm run lint`
- `npm run build:web`

Update docs only if implementation discovers a concrete mismatch with this baseline.
