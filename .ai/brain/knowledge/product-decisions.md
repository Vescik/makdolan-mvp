# Product Decisions

This file summarizes stable product boundaries for Codex sessions. Source docs remain under `docs/product/` and `project-context/`.

## Stable Decisions

- Makdolan starts with a budget-first flow.
- The MVP validates whether users want fast food decision help, not a complete restaurant commerce platform.
- Rzeszow is the first test market.
- Result cards should show user-safe information only: restaurant or brand name, item name, estimated item price, and simple tags/reasons.
- Internal metadata such as scoring breakdown, confidence, source URLs, price observation internals, and distance should not appear in MVP result cards.
- Prices are item estimates and may vary by location.
- Current recommendations use deterministic ranking, not an AI model.

## Explicit Product Boundaries

Do not add these without a new approved product decision:

- Ordering or checkout.
- Payments or subscriptions.
- Delivery tracking or delivery-fee calculations.
- Production scraping as the product data backbone.
- Full authentication.
- Restaurant owner tools.
- Nutrition/macros.
- Social features.
- AI chat as the main interface.

## Source Documents

- `project-context/PRODUCT_BRIEF.md`
- `docs/product/PRD.md`
- `docs/product/PRODUCT_DECISIONS.md`
- `docs/product/MVP_SCOPE.md`
- `docs/product/PRODUCT_CHECKPOINT_3.md`
