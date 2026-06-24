# Scoring Model

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

## Purpose

Makdolan MVP recommendations must be deterministic, testable, and explainable. The same input data should always produce the same ranking, and a junior developer should be able to understand why each item scored higher or lower.

The MVP must not use AI as the primary ranking engine. AI may later help write friendlier explanations or personalized copy, but the core ranking should remain a deterministic function of budget, simple preferences, restaurant availability, internal location context, portion size, price confidence, and freshness.

Budget remains central to filtering and ranking, but user-facing positioning is decision help: "I do not know what to eat."

## Inputs

The recommendation engine receives a user request and a list of candidate food items from controlled seed data, mock/local menu data, user observations, or later approved official/partner sources.

### User Request Inputs

| Input | Type | Description |
|---|---|---|
| `budget` | number | Maximum amount the user wants to spend. |
| `currency` | string | ISO currency code. Sprint 1 defaults to `PLN`. |
| `userLocation` | latitude/longitude, manual area, or mocked Rzeszow location | Used internally to calculate restaurant distance. Distance is not shown on MVP result cards. |
| `maxDistanceKm` | number | Internal maximum search radius. |
| `selectedTags` | string[] | Desired tags such as `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`. |
| `excludedTags` | string[] | Tags the user wants to avoid. |
| `portionSizePreference` | enum, optional | `smallMeal` or `fillingMeal` for Sprint 1; additional values can be added later. |
| `fulfillmentMode` | enum, optional | Sprint 1 is dine-in/pickup-style only. Do not calculate or show delivery fees. |

### Candidate Inputs

| Input | Type | Description |
|---|---|---|
| `restaurantAvailability` | boolean/unknown | Whether the outlet is currently open or available. |
| `restaurantRating` | number/unknown | External rating, usually normalized from a 0 to 5 provider scale. |
| `distanceKm` | number | Internal distance between user and outlet. Used for ranking/filtering, not shown on MVP result cards. |
| `menuItemPrice` | number | Estimated food item price only. Delivery fees are not included. |
| `currency` | string | Candidate price currency. |
| `itemTags` | string[] | Tags assigned to the menu item. |
| `portionSize` | enum | Item portion size. |
| `fulfillmentModes` | enum[] | Supported dine-in/pickup-style modes for this item/outlet. |
| `priceConfidence` | integer | Internal `0` to `100` confidence for the price. Not shown on MVP result cards. |
| `lastVerifiedAt` | date/datetime | Internal last time the price was checked or accepted. Not shown on MVP result cards. |

## Candidate Filtering

Hard filters remove bad candidates before scoring. This keeps the ranking simple and prevents clearly unsuitable items from appearing as normal recommendations.

Apply these filters in order:

1. Remove unavailable restaurants when `restaurantAvailability=false`.
2. Remove candidates with a different currency than the request.
3. Remove items outside `maxDistanceKm`.
4. Remove items that do not support the selected dine-in/pickup-style mode, when one is selected.
5. Remove items containing any `excludedTags`.
6. Remove items clearly above budget unless an explicit over-budget tolerance is enabled in a later version.
7. Remove items with very low confidence when alternatives exist.

Budget tolerance:

- Default MVP behavior: primary results must be at or below budget.
- Optional later behavior: allow a small tolerance only in a separately labeled "slightly over budget" section.
- Never mix over-budget items into the normal "within budget" list without clear copy.

Confidence filtering:

- `priceConfidence < 20`: hide from normal results if any better-confidence options exist.
- `20 <= priceConfidence < 50`: can appear when options are limited, but rank lower and use "price may vary by location" copy.
- `priceConfidence >= 50`: eligible for normal ranking.

## Scoring Formula

Each component is normalized from `0.0` to `1.0`.

```text
score =
  budgetFit * 35
+ preferenceMatch * 25
+ distanceScore * 15
+ restaurantRating * 10
+ portionScore * 10
+ freshnessScore * 5
```

The maximum score is `100`. Keep these weights configurable in code so the team can tune them without changing the algorithm shape.

The score and score breakdown are internal system data. Do not show them on MVP result cards.

## Score Components

### `budgetFit`

Measures how well the item fits the user's budget.

Rules:

- `1.0` if the item fits well within budget.
- Lower score if the price is close to the budget limit.
- `0.0` or a strong penalty if the item is above budget.

Simple MVP implementation:

```text
if budget <= 0: 0.0
if price > budget: 0.0
remainingRatio = (budget - price) / budget
budgetFit = clamp(0.75 + remainingRatio * 0.25)
```

### `preferenceMatch`

Measures how well item tags match the selected tags.

Rules:

- If `excludedTags` overlap with `itemTags`, remove the candidate during filtering.
- If no `selectedTags` are provided, use a neutral score such as `0.75`.
- Otherwise: `matchedSelectedTags / selectedTags.length`.
- Matching can use category and tags, but the implementation should normalize everything into simple tags first.

Approved Sprint 1 user-facing tags:

- `chicken`
- `burger`
- `pizza`
- `kebab`
- `vegetarian`
- `small`
- `filling`
- `quick`

### `distanceScore`

Measures how close the restaurant is to the user's location. This is internal for MVP ranking/filtering. Do not show distance on MVP result cards.

Simple continuous formula:

```text
distanceScore = clamp(1 - (distanceKm / maxDistanceKm))
```

If `distanceKm` is unavailable in Sprint 1 mock data, use a neutral internal score such as `0.6`.

### `restaurantRating`

Uses external restaurant rating as a light quality signal. It should never dominate budget or preferences.

Rules:

- If provider rating is on a 0 to 5 scale: `restaurantRating = rating / 5`.
- Clamp to `0.0..1.0`.
- If rating is unknown, use a neutral score such as `0.6`.
- Do not exclude a restaurant only because rating is unknown.

### `portionScore`

Measures how well the item portion matches the user's requested meal size.

Rules:

- If no portion preference is selected, use neutral score `0.75`.
- Exact match: `1.0`.
- Compatible match: `0.7`.
- Poor match: `0.35`.

### `freshnessScore`

Combines internal price confidence and last verified date.

Rules:

```text
confidenceScore = clamp(priceConfidence / 100)
freshnessScore = clamp(confidenceScore * 0.65 + ageScore * 0.35)
```

Age score:

| Age Since `lastVerifiedAt` | `ageScore` |
|---|---:|
| 0 to 14 days | 1.0 |
| 15 to 30 days | 0.7 |
| 31 to 60 days | 0.4 |
| More than 60 days | 0.15 |

Stale or low-confidence prices should rank lower. MVP UI should only use simple wording such as "estimated price" or "price may vary by location."

## Tie-Breakers

When scores are equal or very close, use deterministic tie-breakers:

1. Higher internal `priceConfidence`.
2. Shorter internal `distanceKm`.
3. Lower `menuItemPrice`.
4. More recent internal `lastVerifiedAt`.
5. Higher `restaurantRating`.
6. Stable candidate ID.

## Recommendation Explanation

Every result should return a short reason string or reason array derived from scoring data.

Approved MVP explanation examples:

- "Fits your 25 PLN budget"
- "Matches chicken"
- "Good for a small meal"
- "Good for a filling meal"
- "Something quick"
- "Estimated price"
- "Price may vary by location"

Do not show these in MVP UI:

- Distance.
- Confidence score.
- Price source.
- `sourceUrl`.
- `lastVerifiedAt`.
- Scoring breakdown.
- Price observation details.
- AI-generated chat as the main interface.

## Edge Cases

### No Results Under Budget

Return a helpful fallback instead of an empty dead end:

- "No known options under 25 PLN in the current test data."
- Suggest increasing budget or removing filters.
- Do not show over-budget results in the normal MVP list.

### All Prices Stale

Show results only if confidence is not extremely low. Use simple copy: "price may vary by location."

### No Location Permission

Use manual or mocked Rzeszow location. Do not block the MVP flow only because device location is denied.

### Very Low Budget

Return no-results guidance and suggest increasing budget only when no seeded items fit.

### Conflicting Preferences

If selected and excluded tags conflict, excluded tags win. The UI should warn the user, and the engine should avoid returning excluded items.

### Same Item In Multiple Outlets

Score each outlet separately because availability, internal distance, rating, and price confidence can differ. The UI may collapse duplicates later.

### Delivery Fees Not Included

MVP prices refer to the food item only. Do not calculate delivery fees, show delivery pricing, or depend on delivery platforms.

### Closed Restaurant

If `restaurantAvailability=false`, filter the candidate out. If availability is unknown, allow it only with cautious internal handling and do not claim real-time availability.

### Unknown Rating

Use neutral rating score. Unknown rating must not hide a valid budget match.

## MVP Examples

### Example 1: Budget 25 PLN, Chicken

Request:

```json
{
  "budget": 25,
  "currency": "PLN",
  "selectedTags": ["chicken"],
  "excludedTags": [],
  "portionSizePreference": null,
  "maxDistanceKm": 3,
  "fulfillmentMode": "pickup"
}
```

Candidate:

```json
{
  "restaurant": "KFC",
  "item": "Longer",
  "menuItemPrice": 12.99,
  "distanceKm": 0.8,
  "restaurantRating": 4.1,
  "itemTags": ["chicken", "small", "quick"],
  "portionSize": "smallMeal",
  "priceConfidence": 68,
  "lastVerifiedAt": "2026-06-23"
}
```

Expected card: restaurant name, item name, estimated item price, and tags such as `chicken`, `small`, `quick`.

### Example 2: Budget 15 PLN, Small Meal

Request:

```json
{
  "budget": 15,
  "currency": "PLN",
  "selectedTags": ["small"],
  "excludedTags": [],
  "portionSizePreference": "smallMeal",
  "maxDistanceKm": 2,
  "fulfillmentMode": "dineIn"
}
```

Candidate:

```json
{
  "restaurant": "McDonald's",
  "item": "Cheeseburger",
  "menuItemPrice": 7.9,
  "distanceKm": 0.4,
  "restaurantRating": 4.0,
  "itemTags": ["burger", "small", "quick"],
  "portionSize": "smallMeal",
  "priceConfidence": 70,
  "lastVerifiedAt": "2026-06-23"
}
```

Expected card: restaurant name, item name, estimated item price, and tags such as `burger`, `small`, `quick`.

### Example 3: Budget 40 PLN, Filling Meal

Request:

```json
{
  "budget": 40,
  "currency": "PLN",
  "selectedTags": ["kebab"],
  "excludedTags": [],
  "portionSizePreference": "fillingMeal",
  "maxDistanceKm": 3,
  "fulfillmentMode": "pickup"
}
```

Candidate:

```json
{
  "restaurant": "Rzeszow Kebab",
  "item": "Small Kebab",
  "menuItemPrice": 22,
  "distanceKm": 1.2,
  "restaurantRating": 4.4,
  "itemTags": ["kebab", "filling", "quick"],
  "portionSize": "fillingMeal",
  "priceConfidence": 65,
  "lastVerifiedAt": "2026-06-22"
}
```

Expected card: restaurant name, item name, estimated item price, and tags such as `kebab`, `filling`, `quick`.

## Tests To Implement Later

- Item over budget is excluded from normal results.
- Matching selected tags improves score.
- Excluded tags remove item.
- Internal distance can affect ranking without being shown on result cards.
- Stale price lowers score.
- Higher confidence improves score.
- No results returns helpful fallback.
- Closed restaurant is filtered out.
- Unknown rating receives neutral score and is not filtered out.
- Same item in two outlets ranks separately by internal distance and availability.
- Delivery fees are not included in item price.
- Conflicting selected/excluded tags respect exclusions.
- Same input and candidates produce deterministic ordering.
- Result-card view model excludes confidence, source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, observation details, and distance.

## Future Improvements

- Learn from user feedback after enough data exists.
- Add promotions and time-limited deals when source rights are clear.
- Add delivery fee calculation and minimum-order handling.
- Add nutrition/macros if the product validates health-focused use cases.
- Add personalized ranking based on saved preferences and repeat behavior.
- Add best value for budget mode.
- Add distance-aware result display.
- Add food assistant/chat experience.
- Consider collaborative filtering after meaningful search, click, and feedback volume exists.
- Use AI only for explanations or personalized copy. Do not use AI as the core scoring engine in MVP.

## Implementation Notes

- Keep scoring in shared domain logic, outside screen components.
- Keep all score components pure functions.
- Keep weights in one config object or constants block.
- Clamp every component to `0.0..1.0`.
- Return final `score` and score breakdown for tests/debugging.
- Return simple reasons/tags with each result so the UI can explain the recommendation without exposing internals.
- Do not call OpenAI, maps APIs, payment APIs, delivery platforms, or scraping code from the scoring function.

## Related Documents

- `docs/product/PRODUCT_DECISIONS.md`
- `docs/data/DATABASE_MODEL.md`
- `docs/data/DATA_STRATEGY.md`
- `docs/data/PRICE_VERIFICATION_PROCESS.md`
- `docs/architecture/ADR-0003-recommendation-engine.md`
- `docs/product/MVP_SCOPE.md`
