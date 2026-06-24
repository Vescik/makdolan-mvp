# MVP Scope

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

## In Scope

- Budget-first food recommendation search.
- Rzeszow as the first test market.
- Location input or mocked/default location for Sprint 1.
- Preference filters:
  - chicken
  - burger
  - pizza
  - kebab
  - vegetarian
  - small meal
  - filling meal
  - something quick
- Product-level food options for dine-in or pickup-style usage.
- Controlled mock/seed menu data for popular chains and local-style categories.
- Deterministic recommendation scoring.
- Simple recommendation result list.
- Recommendation details screen.
- Simple recommendation reasons and tags.
- Internal tracking of `source`, `sourceUrl`, `lastVerifiedAt`, `confidence`, price observation metadata, and scoring breakdown.

## Seed Coverage

Seed/mock data should include popular chains:

- McDonald's
- KFC
- Burger King
- Subway, if useful

Seed/mock data should also include local-style categories:

- kebab
- pizza
- lunch bar / simple local food

## Result Card Scope

MVP result cards show only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- 1 to 3 simple matching tags, for example `chicken`, `burger`, `pizza`, `kebab`, `small`, `filling`, `vegetarian`, or `quick`.

MVP result cards must not show:

- Distance.
- Confidence score.
- Price source.
- `sourceUrl`.
- `lastVerifiedAt`.
- Scoring breakdown.
- Price observation details.

User-facing price copy may say:

- "Estimated price"
- "Price may vary by location"

## Out Of Scope

- Ordering, basket, checkout, delivery tracking, or refunds.
- Payments.
- Subscriptions.
- Premium, paywalls, or recommendation/search limits.
- Production scraping.
- Full authentication.
- Restaurant owner panel.
- Restaurant self-service tools.
- Delivery fee calculation.
- Delivery platform integration.
- Delivery pricing.
- Real-time menu availability.
- Nutrition/macros.
- Social features.
- AI chat as the main interface.
- Distance display in MVP result cards.
- Full restaurant menu coverage.
- Multi-city operations dashboard.

## MVP Release Criteria

- Users can run a budget-first search on iOS, Android, and Web.
- Rzeszow mock/seed data returns useful recommendations.
- Result cards follow the approved simple MVP card format.
- Budget remains central to filtering and ranking.
- Price data fields exist internally for reliability without being exposed as primary MVP UI.
- No-results states are clear and useful.
- Legal/compliance stance on data sources is documented.

## Rollback Criteria

- If location permission or location UX slows launch, use mocked/default Rzeszow location and manual location only.
- If price data confidence is too low, limit recommendations to controlled seed data and use simple "price may vary by location" copy.
- If Web quality lags mobile quality, ship mobile-first MVP with a responsive Web beta rather than a separate web stack.
