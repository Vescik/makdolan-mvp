# Monetization Plan

## MVP Position

The MVP should not optimize for monetization before validating demand. The first product goal is to prove that users repeatedly search for budget-based nearby food recommendations and provide useful price feedback.

No ordering or payment flow is in MVP scope.

## Potential Monetization Paths

| Path | Description | Timing | Risks |
|---|---|---|---|
| Featured budget deals | Restaurants pay to highlight verified affordable items. | Post-MVP | Must avoid degrading trust or relevance. |
| Restaurant self-service subscription | Restaurants pay for a claimed profile, menu snippets, and price freshness tools. | Post-validation | Requires sales/support and claim verification. |
| Affiliate/referral links | Link out to delivery, pickup, or booking partners. | Later | Availability and price mismatch risk. |
| Consumer premium | Users pay for advanced filters, saved preferences, alerts, or ad-free experience. | Later | Weak unless repeat usage is strong. |
| Data insights | Aggregated demand insights for restaurants. | Later | Privacy and aggregation requirements. |

## Recommended MVP Approach

- Do not charge users during initial validation.
- Do not sell paid placements until recommendation trust is measurable.
- Track demand by budget, category, location, and no-results gaps.
- Build the data model so restaurant self-service and partnerships can be added later.

## Payment Support Implications

The recommended Expo React Native + TypeScript stack can support:

- Stripe Checkout for Web subscriptions or B2B restaurant billing.
- RevenueCat or platform-native in-app purchases for future mobile consumer subscriptions.
- Server-side entitlement checks through the backend.

Payment provider setup should wait until monetization hypothesis is selected.

