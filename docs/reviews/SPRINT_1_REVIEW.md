# Sprint 1 Review

Date: 2026-06-25

## Scope Reviewed

This review checked the current Sprint 1 app against:

- `docs/product/PRODUCT_DECISIONS.md`
- `docs/IMPLEMENTATION_BASELINE.md`
- Sprint 1A through Sprint 1D implementation work

## Findings

### Product Alignment

- The first screen starts with budget input.
- The app uses Rzeszow as the Sprint 1 test market.
- Preferences are limited to the approved Sprint 1 vocabulary:
  - `chicken`
  - `burger`
  - `pizza`
  - `kebab`
  - `vegetarian`
  - `small`
  - `filling`
  - `quick`
- Search state is local/transient.
- Mock recommendation data is separated from UI code.
- The deterministic recommendation engine is implemented and covered by tests.

### UI Exposure

Result cards show only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- 1 to 3 visible tags.

Recommendation details show only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- Visible tags.
- The note that estimated price may vary by location.

Internal reliability and ranking fields remain in domain code and tests only.

### Data And Scoring

- Mock data includes McDonald's, KFC, Burger King, local kebab, pizza, and lunch bar categories.
- Mock data has more than 12 menu items across low, medium, and higher Sprint 1 budgets.
- Prices track `source`, `sourceUrl`, `lastVerifiedAt`, and `confidence` internally.
- Scoring is deterministic and non-AI-based.
- Tests cover data contract, budget filtering, tag matching, excluded tags, stale/low-confidence prices, ranking order, fallback behavior, and card mapping.

## Fixes Made In This Review

- Removed excluded-scope explanatory copy from the local preferences screen so the in-app UI stays focused on the MVP flow.
- Replaced the generic starter README with Makdolan-specific install, run, and verification instructions.

## Verification

Required checks for this review:

- TypeScript check.
- Unit tests.
- Lint.
- Web export.
- Web start smoke check.
- UI/source grep for hidden fields and old test-market data.

## Remaining Issues

- Native iOS and Android runtime checks still need simulator/emulator verification before release-oriented work.
- Sprint 1 still has no automated browser/UI test for the full budget-to-detail path.
- Some internal docs intentionally mention post-MVP exclusions and future directions; these are acceptable as documentation context, not app behavior.

## Recommended Sprint 2 Tasks

- Add a lightweight end-to-end web smoke test for the budget, preference, result, and details path.
- Improve empty-state UX after observing real test-user behavior.
- Add local preference defaults only if users repeatedly search with the same tags.
- Prepare a provider boundary for future place discovery without making network calls in Sprint 1.
- Add native iOS and Android smoke checks once simulator/emulator tooling is available.
