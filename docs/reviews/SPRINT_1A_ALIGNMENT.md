# Sprint 1A Alignment Review

Date: 2026-06-24

## Purpose

This review records the alignment pass that updated the current Makdolan skeleton to match Product Decision Board v1 before deeper Sprint 1 implementation.

## What Was Misaligned

- Mock data used Warsaw/test-generic restaurant locations instead of the approved Rzeszow test market.
- Seed tags included values outside the Sprint 1 vocabulary, including `healthy` and `sandwich`.
- The app still modeled delivery as a selectable fulfillment mode.
- Result cards exposed internal ranking or reliability data that should not be user-facing in MVP.
- Detail screens exposed internal data such as source, verification date, confidence, and ranking details.
- Some user-facing copy implied functionality that is outside Sprint 1.

## What Was Fixed

- Replaced mock data with Rzeszow-focused restaurant brands, outlets, and menu items.
- Limited visible and seed tag vocabulary to:
  - `chicken`
  - `burger`
  - `pizza`
  - `kebab`
  - `vegetarian`
  - `small`
  - `filling`
  - `quick`
- Removed delivery as a Sprint 1 fulfillment mode.
- Kept item price as `MenuItem.basePrice` for Sprint 1 instead of adding outlet-level price tables.
- Updated result cards to show only:
  - restaurant or brand name
  - menu item name
  - estimated item price
  - 1 to 3 simple matching tags
- Updated detail screen content to show only restaurant/item/price/tags/simple reasons plus the note that estimated price may vary by location.
- Kept internal metadata such as source, source URL, last verified date, confidence, and ranking details inside domain data/types/tests only.
- Confirmed `docs/IMPLEMENTATION_BASELINE.md` and `docs/product/PRODUCT_DECISIONS.md` already describe the Sprint 1A constraints.

## Deferred Decisions

The following items remain post-Sprint-1 decisions and were not implemented:

- Aggregated analytics for anonymous searches.
- Rounded versus exact location strategy.
- Outlet-level pricing.
- Expansion beyond Rzeszow.
- User-submitted price observations.
- Price-change threshold rules.
- Auth-based preference persistence.
- Real provider integrations for place discovery.
- Backend search persistence.

## Verification Notes

The alignment should be verified with:

- TypeScript check.
- Domain tests.
- Lint, if configured.
- Web start smoke check, if available.
- UI-layer search confirming no visible screen references to hidden Sprint 1 data fields.
