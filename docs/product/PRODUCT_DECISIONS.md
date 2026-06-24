# Product Decisions

Version: v1
Date: 2026-06-24
Status: Approved

This document is the source of truth for MVP product decisions. If another planning document conflicts with this file, update the other document unless a new decision board supersedes this version.

## 1. Target Users

The MVP targets:

- Students.
- Young working people.
- Users who want to make a quick food decision nearby.

The main target user thinks:

> I do not know what to eat, I have a specific budget, and I want a quick suggestion.

## 2. Core Positioning

The main emotional problem is:

> I do not know what to eat.

The product answer is:

> Enter your budget and simple preferences, and get food ideas that fit.

Budget remains the main functional differentiator. User-facing positioning should focus on decision help rather than strict money saving.

The product must not feel like a generic random food picker. Budget must remain central to filtering and ranking.

## 3. Test Market And Coverage

The MVP focuses on Rzeszow as the first test market.

Seed/mock data should include popular chains such as:

- McDonald's.
- KFC.
- Burger King.
- Subway, if useful.

Seed/mock data should also include local-style categories so the app does not feel limited to chains:

- Kebab.
- Pizza.
- Lunch bar / simple local food.

## 4. Fulfillment

The MVP recommends product-level food options for dine-in or pickup-style usage.

Do not:

- Calculate delivery fees.
- Integrate delivery ordering.
- Show delivery pricing.
- Depend on delivery platforms.

Prices refer to the food item only.

## 5. First Screen

The first screen starts with budget input.

After budget input, the user can select simple preferences:

- Chicken.
- Burger.
- Pizza.
- Kebab.
- Vegetarian.
- Small meal.
- Filling meal.
- Something quick.

## 6. Results UX

The MVP shows a simple list of recommendations.

Each result card shows only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- 1 to 3 simple matching tags, for example:
  - `chicken`
  - `burger`
  - `pizza`
  - `kebab`
  - `small`
  - `filling`
  - `vegetarian`
  - `quick`

Do not show distance in MVP result cards.

Do not expose these technical/internal fields to the user in MVP:

- Confidence score.
- Price source.
- `sourceUrl`.
- `lastVerifiedAt`.
- Scoring breakdown.
- Price observation details.

These fields must still exist internally for reliability, tests, and future ranking improvements.

User-facing copy may only say simple things like:

- "Estimated price".
- "Price may vary by location".

## 7. Hidden System Data

The system should internally track:

- `source`.
- `sourceUrl` when available.
- `lastVerifiedAt`.
- `confidence`.
- Price observation metadata.
- Scoring breakdown if useful for tests and debugging.

These fields are system data, not primary user-facing UI.

## 8. Monetization

No premium, subscription, paywall, or recommendation limits in MVP.

The MVP must not limit the number of recommendations or searches.

Premium can be explored later through fake-door tests, but not in Sprint 1.

Future premium ideas may include:

- Promotion alerts.
- Advanced filters.
- Stronger personalization.
- Best value mode.
- Diet/nutrition filters.
- Saved history.
- Personalized food assistant.

## 9. Out Of Scope For MVP

Explicitly exclude:

- Ordering.
- Payments.
- Subscriptions.
- Production scraping.
- Full authentication.
- Restaurant owner panel.
- Delivery fee calculation.
- Real-time menu availability.
- Nutrition/macros.
- Social features.
- AI chat as the main interface.
- Distance display in MVP result cards.

## 10. Upgrade Direction

Future versions may expand from "I do not know what to eat" into:

- Best value for budget.
- Promotions.
- Personalization.
- Dietary filters.
- Distance-aware results.
- Delivery-aware results.
- Food assistant/chat experience.
- Restaurant partnerships.
