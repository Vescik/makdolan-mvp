# User Stories

## Search And Recommendation

### Story: Search By Budget Nearby

As a hungry user, I want to enter a budget and location so I can see food options I can likely afford nearby.

Acceptance criteria:

- User can enter a budget amount.
- User can use current location or manual location.
- Results are ranked by budget fit and distance.
- Results show estimated price, restaurant, and confidence.

### Story: Filter By Preferences

As a user with a craving or dietary preference, I want to filter by food type and meal size so results match what I want to eat.

Acceptance criteria:

- User can select one or more preference tags.
- Results prioritize matching tags.
- Empty states explain when no matching options are known.

### Story: Understand Price Reliability

As a user, I want to know whether a price is recent or uncertain so I can decide whether to trust the recommendation.

Acceptance criteria:

- Each recommendation displays confidence or freshness language.
- Low-confidence prices are visually and textually distinct.
- The app does not guarantee prices unless source rules support that claim.

## Feedback

### Story: Report Wrong Price

As a user, I want to report when a price is wrong so future recommendations improve.

Acceptance criteria:

- User can mark price wrong.
- User can submit the observed price.
- The observation is stored with source and timestamp.
- The price confidence updates through the verification process.

### Story: Report Bad Recommendation

As a user, I want to say why a recommendation was not useful so the app can improve ranking.

Acceptance criteria:

- User can report too far, unavailable, too expensive, wrong preference, or not interested.
- Feedback is associated with the recommendation shown.
- Feedback does not expose private user data in logs.

## Admin / Operations

### Story: Seed Menu Data

As an operator, I want to load controlled seed menu data so the MVP has useful initial recommendations.

Acceptance criteria:

- Seed rows include price, currency, source, last verification date, and confidence.
- Invalid rows are rejected before import.
- Seed data can be reviewed and replaced without code changes.

### Story: Review Stale Or Conflicting Prices

As an operator, I want to see stale or conflicting price data so I can decide what needs review.

Acceptance criteria:

- Items with stale, low-confidence, or conflicting observations can be identified.
- Reviewed items can be marked verified or rejected.
- The system keeps price change history.

