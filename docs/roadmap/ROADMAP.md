# Roadmap

## Phase 0: Planning And Validation Setup

Goals:

- Finalize product scope, stack, data strategy, and architecture.
- Define seed data format and verification process.
- Select initial test city.

Exit criteria:

- Planning docs approved.
- Stack ADR accepted.
- Data source and scraping policies documented.

## Phase 1: MVP Prototype

Goals:

- Ship initial Expo React Native + TypeScript skeleton with Web support.
- Build budget/location/preference search.
- Load controlled seed menu data.
- Integrate nearby restaurant discovery.
- Show recommendation cards with confidence/freshness.
- Capture feedback and price observations.

Exit criteria:

- App shell routes exist for home budget entry, preferences, recommendation results, recommendation details, and profile preferences.
- Mock recommendation data and deterministic local scoring have unit tests.
- Users can search on iOS, Android, and Web.
- Test city returns useful recommendations.
- Feedback can identify wrong prices and bad recommendations.

Next implementation steps:

- Replace route-param-only search state with a typed client state boundary.
- Add form validation and error states for budget and manual location.
- Add seed import fixtures based on `docs/data/MENU_SEED_FORMAT.md`.
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
- Mature operations, monitoring, moderation, and abuse prevention.

Exit criteria:

- New market launch playbook exists.
- Data quality metrics remain stable as coverage expands.
