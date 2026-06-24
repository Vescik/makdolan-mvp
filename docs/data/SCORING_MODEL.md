# Scoring Model

## Purpose

Makdolan MVP recommendations must be deterministic, testable, and explainable. The same input data should always produce the same ranking, and a junior developer should be able to understand why each item scored higher or lower.

The MVP must not use AI as the primary ranking engine. AI may later help write friendlier explanations or personalized copy, but the core ranking should remain a deterministic function of budget, distance, tags, portion size, restaurant availability, price confidence, and freshness.

## Inputs

The recommendation engine receives a user request and a list of candidate food items from controlled seed data, mock/local menu data, user observations, or later approved official/partner sources.

### User Request Inputs

| Input | Type | Description |
|---|---|---|
| `budget` | number | Maximum amount the user wants to spend. |
| `currency` | string | ISO currency code such as `PLN`. Candidate prices must use the same currency. |
| `userLocation` | latitude/longitude or manual area | Location used to calculate restaurant distance. |
| `maxDistanceKm` | number | Maximum distance the user is willing to travel or search within. |
| `selectedTags` | string[] | Desired tags such as `chicken`, `burger`, `pizza`, `smallMeal`, `healthy`. |
| `excludedTags` | string[] | Tags the user wants to avoid, such as `meat`, `spicy`, or `deliveryOnly`. |
| `portionSizePreference` | enum, optional | `snack`, `smallMeal`, `regularMeal`, or `fillingMeal`. |
| `fulfillmentMode` | enum, optional | `pickup`, `delivery`, or `dineIn`. |

### Candidate Inputs

| Input | Type | Description |
|---|---|---|
| `restaurantAvailability` | boolean/unknown | Whether the outlet is currently open or available. |
| `restaurantRating` | number/unknown | External rating, usually normalized from a 0 to 5 provider scale. |
| `distanceKm` | number | Distance between user and outlet. |
| `menuItemPrice` | number | Estimated item price before optional fees. |
| `currency` | string | Candidate price currency. |
| `itemTags` | string[] | Tags assigned to the menu item. |
| `portionSize` | enum | Item portion size. |
| `fulfillmentModes` | enum[] | Supported modes for this item/outlet. |
| `priceConfidence` | integer | `0` to `100` confidence for the price. |
| `lastVerifiedAt` | date/datetime | Last time the price was checked or accepted. |

## Candidate Filtering

Hard filters remove bad candidates before scoring. This keeps the ranking simple and prevents clearly unsuitable items from appearing as normal recommendations.

Apply these filters in order:

1. Remove unavailable restaurants when `restaurantAvailability=false`.
2. Remove candidates with a different currency than the request.
3. Remove items outside `maxDistanceKm`.
4. Remove items that do not support the requested `fulfillmentMode`, when one is selected.
5. Remove items containing any `excludedTags`.
6. Remove items clearly above budget unless an explicit over-budget tolerance is enabled.
7. Remove items with very low confidence when alternatives exist.

Budget tolerance:

- Default MVP behavior: primary results must be at or below budget.
- Optional later behavior: allow a small tolerance, such as 5% or 2 PLN, only in a separately labeled "slightly over budget" section.
- Never mix over-budget items into the normal "within budget" list without clear copy.

Confidence filtering:

- `priceConfidence < 20`: hide from normal results if any better-confidence options exist.
- `20 <= priceConfidence < 50`: can appear when options are limited, but rank lower and show "price may vary".
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

This means an item exactly at budget still gets `0.75`, because it is valid but less flexible than a cheaper option.

### `preferenceMatch`

Measures how well item tags match the selected tags.

Rules:

- If `excludedTags` overlap with `itemTags`, remove the candidate during filtering.
- If no `selectedTags` are provided, use a neutral score such as `0.75`.
- Otherwise: `matchedSelectedTags / selectedTags.length`.
- Matching can use category and tags, but the implementation should normalize everything into tags first.

Examples:

| Selected Tags | Excluded Tags | Item Tags | Result |
|---|---|---|---|
| `chicken` | none | `chicken`, `smallMeal` | `1.0` |
| `chicken`, `healthy` | none | `chicken`, `sandwich` | `0.5` |
| `vegetarian` | `meat` | `kebab`, `meat` | filtered out |
| none | none | `burger` | `0.75` |

### `distanceScore`

Measures how close the restaurant is to the user's location.

Simple bucket model:

| Distance | Score |
|---|---:|
| 0 to 0.5 km | 1.0 |
| >0.5 to 1 km | 0.9 |
| >1 to 2 km | 0.75 |
| >2 to 3 km | 0.55 |
| >3 km but within max distance | 0.35 |
| Outside max distance | filtered out |

Alternative continuous formula:

```text
distanceScore = clamp(1 - (distanceKm / maxDistanceKm))
```

Use one approach consistently. The continuous formula is simpler to test; buckets are easier to explain.

### `restaurantRating`

Uses external restaurant rating as a light quality signal. It should never dominate budget, preferences, or distance.

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
- Compatible match: `0.7`, for example user asks for `fillingMeal` and item is `regularMeal`.
- Poor match: `0.35`, for example user asks for `fillingMeal` and item is `snack`.

### `freshnessScore`

Combines price confidence and last verified date.

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

Stale or low-confidence prices should rank lower and show uncertainty copy. They should never be presented as guaranteed.

## Tie-Breakers

When scores are equal or very close, use deterministic tie-breakers:

1. Higher `priceConfidence`.
2. Shorter `distanceKm`.
3. Lower `menuItemPrice`.
4. More recent `lastVerifiedAt`.
5. Higher `restaurantRating`.
6. Stable candidate ID.

## Recommendation Explanation

Every result should return a short reason string or reason array. Reasons must be derived from the same data used for scoring.

Examples:

- "Fits your 25 PLN budget"
- "Matches chicken preference"
- "Close to your location"
- "Pickup available"
- "Recently verified"
- "Price is estimated and may vary"
- "Last checked 3 weeks ago"

Do not use copy such as:

- "Guaranteed price"
- "Definitely available"
- "AI says this is best"

unless the product later has a verified source that supports those claims.

## Edge Cases

### No Results Under Budget

Return a helpful fallback instead of an empty dead end:

- "No known options under 25 PLN nearby."
- Suggest increasing budget, widening distance, or removing filters.
- Optionally show "slightly over budget" only if that mode is explicitly enabled.

### All Prices Stale

Show results with lower freshness scores only if confidence is not extremely low. Explain that prices may vary and ask for confirmation after the user views a result.

### No Location Permission

Use manual location input. Do not block the MVP flow only because device location is denied.

### Very Low Budget

If the user enters an unrealistically low budget, return no-results guidance and suggest nearby low-cost categories only when backed by data.

### Conflicting Preferences

If selected and excluded tags conflict, excluded tags win. The UI should warn the user, and the engine should avoid returning excluded items.

Example: selected `chicken`, excluded `meat` means chicken items should be filtered out.

### Same Item In Multiple Outlets

Score each outlet separately because distance, open status, rating, and price confidence can differ. Results may collapse duplicates in UI later, but the engine should treat outlet-item pairs as separate candidates.

### Delivery Fees Not Included

MVP item prices do not include delivery fees unless a verified fee source exists. Delivery results must show copy such as "Delivery fees not included" or avoid delivery-specific recommendations until fee logic exists.

### Closed Restaurant

If `restaurantAvailability=false`, filter the candidate out. If availability is unknown, allow it only with cautious copy such as "Opening hours not confirmed".

### Unknown Rating

Use neutral rating score. Unknown rating must not hide a valid budget match.

## MVP Examples

### Example 1: Budget 25 PLN, Chicken, Near Me

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
  "itemTags": ["chicken", "sandwich", "smallMeal"],
  "portionSize": "smallMeal",
  "priceConfidence": 68,
  "lastVerifiedAt": "2026-06-23"
}
```

Expected behavior: strong recommendation because it is under budget, matches chicken, nearby, and has medium confidence. Explanation: "Fits your 25 PLN budget, matches chicken preference, close to your location, price is estimated and may vary."

### Example 2: Budget 15 PLN, Small Meal

Request:

```json
{
  "budget": 15,
  "currency": "PLN",
  "selectedTags": ["smallMeal"],
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
  "itemTags": ["burger", "smallMeal", "dineIn"],
  "portionSize": "smallMeal",
  "priceConfidence": 70,
  "lastVerifiedAt": "2026-06-23"
}
```

Expected behavior: high score because it is well under budget, close, and matches portion preference. Explanation: "Fits your 15 PLN budget, close to your location, recently verified."

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
  "restaurant": "Centrum Kebab",
  "item": "Small Kebab",
  "menuItemPrice": 22,
  "distanceKm": 1.2,
  "restaurantRating": 4.4,
  "itemTags": ["kebab", "fillingMeal", "pickup"],
  "portionSize": "fillingMeal",
  "priceConfidence": 65,
  "lastVerifiedAt": "2026-06-22"
}
```

Expected behavior: high score because it fits budget, matches kebab and filling meal preferences, and is within distance. Explanation: "Fits your 40 PLN budget, matches kebab preference, filling meal, price is estimated and may vary."

## Tests To Implement Later

- Item over budget is excluded from normal results or penalized in a separately labeled over-budget mode.
- Matching selected tags improves score.
- Excluded tags remove item.
- Closer restaurant ranks higher when other factors are similar.
- Stale price lowers score.
- Higher confidence improves score.
- No results returns helpful fallback.
- Closed restaurant is filtered out.
- Unknown rating receives neutral score and is not filtered out.
- Same item in two outlets ranks separately by distance and availability.
- Delivery result shows that delivery fees are not included unless fee data exists.
- Conflicting selected/excluded tags respect exclusions.
- Same input and candidates produce deterministic ordering.

## Future Improvements

- Learn from user feedback after enough data exists.
- Add promotions and time-limited deals when source rights are clear.
- Add delivery fee calculation and minimum-order handling.
- Add nutrition/macros if the product validates health-focused use cases.
- Add personalized ranking based on saved preferences and repeat behavior.
- Consider collaborative filtering after meaningful search, click, and feedback volume exists.
- Use AI only for explanations or personalized copy. Do not use AI as the core scoring engine in MVP.

## Implementation Notes

- Keep scoring in shared domain logic, outside screen components.
- Keep all score components pure functions.
- Keep weights in one config object or constants block.
- Clamp every component to `0.0..1.0`.
- Return both final `score` and a score breakdown for debugging.
- Return reasons with each result so the UI can explain the recommendation.
- Do not call OpenAI, maps APIs, payment APIs, or scraping code from the scoring function.

## Related Documents

- `docs/data/DATABASE_MODEL.md`
- `docs/data/DATA_STRATEGY.md`
- `docs/data/PRICE_VERIFICATION_PROCESS.md`
- `docs/architecture/ADR-0003-recommendation-engine.md`
- `docs/product/MVP_SCOPE.md`
