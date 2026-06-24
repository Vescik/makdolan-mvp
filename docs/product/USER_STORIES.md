# User Stories

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

## Search And Recommendation

### Story: Quick Food Decision By Budget

As a student or young working person, I want to enter my budget first so I can quickly get food ideas that fit.

Acceptance criteria:

- User can enter a budget amount on the first screen.
- Currency defaults to `PLN` for the Rzeszow MVP.
- User can continue with a mocked/default location or manual location.
- Results are filtered to food item prices that fit the budget.

### Story: Choose Simple Preferences

As a user who does not know what to eat, I want to choose simple preferences so suggestions feel relevant without requiring too much effort.

Acceptance criteria:

- User can select preferences such as chicken, burger, pizza, kebab, vegetarian, small meal, filling meal, or something quick.
- Results prioritize matching tags.
- Empty states explain when no matching options are known.

### Story: View Simple Recommendations

As a user making a quick food decision, I want a simple list of recommendations so I can choose without reading technical details.

Acceptance criteria:

- Each result card shows restaurant or brand name.
- Each result card shows menu item name.
- Each result card shows estimated item price.
- Each result card shows 1 to 3 simple matching tags.
- Result cards do not show distance, confidence score, price source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, or price observation details.
- User-facing copy can say "estimated price" or "price may vary by location."

### Story: Open Recommendation Details

As a user, I want to open a recommendation so I can see enough detail to decide whether it sounds good.

Acceptance criteria:

- Details show restaurant or brand name, menu item name, estimated item price, and matching tags.
- Details can show simple reasons such as "fits your budget" or "matches chicken."
- Details do not expose internal scoring breakdown, confidence score, source metadata, or price observation details in MVP.

## Feedback

### Story: Basic Recommendation Feedback

As a user, I want to say whether a suggestion was useful so future recommendations can improve.

Acceptance criteria:

- User can mark a recommendation useful or not useful when feedback UI exists.
- Feedback is associated with the recommendation shown.
- Feedback does not require full authentication in MVP.
- Feedback does not expose private user data in logs.

### Story: Price May Vary

As a user, I want to understand that prices are estimates so I do not treat recommendations as guaranteed ordering prices.

Acceptance criteria:

- The app uses simple copy such as "estimated price" or "price may vary by location."
- The app does not guarantee item price or availability.
- Internal fields such as `source`, `lastVerifiedAt`, and `confidence` remain available for reliability but are not primary MVP UI.

## Admin / Operations

### Story: Seed Rzeszow Menu Data

As an operator, I want to load controlled Rzeszow seed data so the MVP has useful initial recommendations.

Acceptance criteria:

- Seed data includes popular chains and local-style categories.
- Seed rows include price, currency, `source`, `lastVerifiedAt`, and `confidence`.
- Invalid rows are rejected before import.
- Seed data can be reviewed and replaced without code changes.

### Story: Review Data Quality Later

As an operator, I want internal metadata to support future data quality review without showing technical fields to users.

Acceptance criteria:

- Items can internally track source, confidence, freshness, and observation metadata.
- Internal metadata can support tests and debugging.
- User-facing MVP UI remains simple.
