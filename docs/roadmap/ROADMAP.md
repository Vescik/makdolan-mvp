# Roadmap

## Phase 0: Planning And Validation Setup

Goals:

- Finalize product scope, stack, data strategy, and architecture.
- Define seed data format and verification process.
- Confirm Rzeszow as the initial test market.

Exit criteria:

- Planning docs approved.
- Stack ADR accepted.
- Data source and scraping policies documented.
- Product Decision Board v1 documented in `docs/product/PRODUCT_DECISIONS.md`.

## Phase 1: MVP Prototype

Goals:

- Ship initial Expo React Native + TypeScript skeleton with Web support.
- Build budget-first search with Rzeszow mocked/default location.
- Load controlled Rzeszow seed/mock menu data.
- Keep Google Places behind a future mock/stub provider only; do not connect real APIs in Sprint 1.
- Show simple recommendation cards with brand/restaurant, item, estimated item price, and 1 to 3 tags.
- Keep confidence, source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, and observation details internal.

Exit criteria:

- App shell routes exist for home budget entry, preferences, recommendation results, recommendation details, and profile preferences.
- Mock recommendation data and deterministic local scoring have unit tests.
- Users can search on iOS, Android, and Web.
- Rzeszow seed/mock data returns useful recommendations.
- Result cards do not show distance or internal reliability/scoring fields.
- Feedback can identify wrong prices and bad recommendations.

Next implementation steps:

- Replace route-param-only search state with a typed client state boundary.
- Add form validation and error states for budget and manual location.
- Add seed import fixtures based on `docs/data/MENU_SEED_FORMAT.md`.
- Align mock data to Rzeszow Product Decision Board v1 coverage.
- Add feedback capture UI for useful, not useful, price wrong, and unavailable.
- Add provider abstraction for future Google Places integration without connecting real APIs yet.

## Phase 2: Private Beta

Goals:

- Improve ranking from real feedback.
- Add review queue for stale/conflicting prices.
- Expand seed coverage to more chains and local restaurants.
- Add analytics dashboard for search demand and coverage gaps.

Exit criteria:

- Repeat usage and useful recommendation signals are measurable.
- Price mismatch rate is understood.
- Data operations process is sustainable for at least one city.

## Phase 3: Public MVP

Goals:

- Launch in one or more focused markets.
- Improve performance, accessibility, and app-store readiness.
- Add restaurant claim interest form or waitlist.
- Add support for high-demand categories and budgets.
- Consider distance-aware result display only after the MVP validates the simple card format.

Exit criteria:

- Core flows pass iOS, Android, and Web verification.
- Data freshness process is documented and staffed.
- Legal/compliance position remains acceptable.

## Phase 4: Monetization Experiments

Goals:

- Test restaurant self-service profiles.
- Evaluate featured verified budget items.
- Explore affiliate or partner links.
- Consider Stripe billing for restaurant tools.

Exit criteria:

- Monetization does not reduce recommendation trust.
- Clear conversion or willingness-to-pay signal exists.

## Phase 5: Scale

Goals:

- Add more cities.
- Add partnerships or official data integrations.
- Consider ML ranking after enough behavioral data exists.
- Explore best-value mode, promotions, dietary filters, delivery-aware results, and food assistant/chat experience after MVP validation.
- Mature operations, monitoring, moderation, and abuse prevention.

Exit criteria:

- New market launch playbook exists.
- Data quality metrics remain stable as coverage expands.
