# MVP Scope

## In Scope

- Budget-based food recommendation search.
- Current location and manual location input.
- Preference filters:
  - chicken
  - burger
  - pizza
  - kebab
  - sandwich
  - small meal
  - filling meal
  - vegetarian
  - healthy
  - pickup
  - delivery
  - dine-in
- Nearby restaurant discovery through Google Places.
- Controlled seed menu/price data for popular chains and one local test city.
- User-submitted price observations and feedback.
- Recommendation confidence and freshness messaging.
- Basic analytics for searches, results, and feedback.

## Out Of Scope

- Ordering, basket, checkout, payments, delivery tracking, or refunds.
- Restaurant POS integration.
- Full restaurant menu coverage.
- Production scraping as a primary data source.
- Loyalty programs.
- Personalized nutrition plans.
- Social features.
- Restaurant advertising marketplace.
- Multi-city operations dashboard beyond basic seed/feedback review.

## MVP Release Criteria

- Users can run a search on iOS, Android, and Web.
- At least one test city has useful seeded recommendations.
- Popular chain seed data can be matched to nearby Google Places results.
- Users can submit feedback on recommendation quality and price accuracy.
- No-results states are clear and useful.
- Legal/compliance stance on data sources is documented.

## Rollback Criteria

- If location permissions or provider costs block launch, support manual location and bounded test-city search first.
- If price data confidence is too low, limit recommendations to verified seed data and explicitly label coverage limits.
- If Web quality lags mobile quality, ship mobile-first MVP with a responsive Web beta rather than a separate web stack.

