# Product Requirements Document

## Product Summary

Makdolan helps users decide what to eat nearby when they have a specific budget and want a quick suggestion. The user starts with a budget, then can choose simple preferences such as chicken, burger, pizza, kebab, vegetarian, small meal, filling meal, or something quick. The app returns food ideas from mock/seed data that fit the budget and preference context.

MVP focus: validate whether users want budget-first food decision help.

MVP non-goal: ordering, checkout, payments, delivery tracking, subscriptions, production scraping, full authentication, restaurant owner tools, nutrition/macros, social features, or AI chat as the main interface.

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.

## Target Users

- Students.
- Young working people.
- Users who want to make a quick food decision nearby.

Primary user thought:

> I do not know what to eat, I have a specific budget, and I want a quick suggestion.

## Core User Problem

The main emotional problem is: "I do not know what to eat."

The product answer is: "Enter your budget and simple preferences, and get food ideas that fit."

Budget remains the main functional differentiator, but user-facing positioning should focus on decision help rather than strict money saving. Makdolan should not feel like a generic random food picker; budget must remain central to filtering and ranking.

## Test Market

The MVP focuses on Rzeszow as the first test market.

Seed/mock data should include:

- Popular chains: McDonald's, KFC, Burger King, and Subway if useful.
- Local-style categories: kebab, pizza, and lunch bar / simple local food.

## MVP Goals

- Let users enter a budget first.
- Let users choose simple preferences after budget input.
- Recommend product-level food options for dine-in or pickup-style usage.
- Rank recommendations using budget fit, preference match, internal distance/location context, restaurant availability, portion match, and internal price reliability.
- Show a simple list of food ideas with estimated item prices and simple tags.
- Keep internal reliability fields for scoring, tests, and future data quality improvements.

## MVP Success Metrics

| Metric | Target Signal |
|---|---|
| Budget search completion rate | Users submit budget-first searches successfully. |
| Recommendation usefulness | Users open details or mark suggestions useful once feedback exists. |
| Decision speed | Users can move from budget input to a recommendation list quickly. |
| Coverage gap rate | No-results frequency decreases as seed data improves. |
| Repeat usage | Users return for additional quick food decisions. |

## Functional Requirements

### Budget-First Search

- First screen starts with budget input.
- User can enter a budget amount.
- Currency defaults to `PLN` for the Rzeszow test market.
- User can use a mocked/default location or manual location in Sprint 1.
- User can set simple preferences after budget input.

### Preferences

MVP preferences:

- Chicken.
- Burger.
- Pizza.
- Kebab.
- Vegetarian.
- Small meal.
- Filling meal.
- Something quick.

### Recommendations

- System returns recommendations ranked by deterministic scoring.
- MVP result cards show only:
  - Restaurant or brand name.
  - Menu item name.
  - Estimated item price.
  - 1 to 3 simple matching tags such as `chicken`, `burger`, `pizza`, `kebab`, `small`, `filling`, `vegetarian`, or `quick`.
- Do not show distance in MVP result cards.
- Do not expose confidence score, price source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, or price observation details in MVP UI.
- User-facing copy may say "estimated price" and "price may vary by location."

### Fulfillment

- MVP recommendations are product-level options for dine-in or pickup-style usage.
- Prices refer to the food item only.
- Do not calculate delivery fees.
- Do not integrate delivery ordering.
- Do not show delivery pricing.
- Do not depend on delivery platforms.

### Data And Reliability

- Use controlled mock/seed data for Sprint 1.
- Keep `source`, `sourceUrl`, `lastVerifiedAt`, `confidence`, price observation metadata, and scoring breakdown internally.
- Google Places is postponed for Sprint 1. Later it may be used only for restaurant/place discovery, not guaranteed menu prices.
- Production scraping is not allowed as the production core.

## Non-Functional Requirements

- Responsive Web, iOS, and Android support through the chosen Expo React Native stack.
- Fast local interaction for budget input, preference selection, results, and details.
- No secret values in logs or repo.
- Accessible forms, buttons, and recommendation cards.
- Deterministic scoring that can be unit tested without UI or network calls.

## Acceptance Criteria

- A user can enter a budget first.
- A user can choose simple preferences.
- A user can see a simple ranked list of food ideas for the Rzeszow mock/seed market.
- Each result card avoids internal technical fields and shows only the approved MVP card fields.
- Budget remains central to filtering and ranking.
- MVP docs explicitly exclude ordering, payments, subscriptions, production scraping, full authentication, delivery fee calculation, nutrition/macros, social features, AI chat as the main interface, and distance display in MVP result cards.
