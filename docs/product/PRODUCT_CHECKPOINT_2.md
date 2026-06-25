# Product Checkpoint 2: MVP Flow Review

Date: 2026-06-25
Status: Recommended Sprint 2 direction pending human approval

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.
Implementation source: Sprint 1 app flow, `docs/IMPLEMENTATION_BASELINE.md`, and `docs/reviews/SPRINT_1_REVIEW.md`.

## Checkpoint Summary

Sprint 1 successfully proves the core local MVP loop:

1. User enters a budget first.
2. User keeps or edits the default Rzeszow location.
3. User selects optional simple preference tags.
4. App ranks local mock recommendations with deterministic scoring.
5. User sees in-budget recommendation cards.
6. User can open recommendation details.

The app still matches Product Decision Board v1. Budget remains central to filtering and ranking, the app uses local Rzeszow mock data, and the UI does not expose raw score, confidence, source, `sourceUrl`, `lastVerifiedAt`, distance, or scoring breakdown.

Product Checkpoint 2 recommendation: Sprint 2 should not expand the MVP feature set. It should make the existing flow easier to understand, more useful as a decision tool, and more verifiable across Web, iOS, and Android.

## Product Findings

- The core user problem is clear in the docs: "I do not know what to eat, I have a specific budget, and I want a quick suggestion."
- The app flow supports that problem, but the first screen currently frames the product as a Sprint 1 skeleton instead of a user-facing decision helper.
- Budget is central enough in behavior because recommendations are filtered by `budgetAmount`, sorted with budget fit as the largest score component, and displayed with estimated item price.
- The first screen is simple but could be more focused. The secondary "Profile preferences" action competes with the main budget-to-results path before local preferences are useful.
- Preferences are understandable at the data level, but the UI uses raw lowercase tags. Target users may understand labels faster if Sprint 2 maps tags to friendlier labels such as "Small meal" and "Something quick" while preserving the internal tag values.
- Result cards are useful with only restaurant or brand, item name, estimated price, and 1 to 3 tags. They are intentionally minimal and do not leak internal reliability data.
- The app is more than a randomizer because it filters by budget, filters closed outlets, prioritizes selected tags, and uses deterministic scoring. However, users cannot yet see why an option was ranked, so the experience may still feel opaque.
- Sprint 2 should add simple visible decision reason chips. These must be UX chips only, not scoring explanations.
- Distance should remain hidden in Sprint 2. It is useful internally for ranking and future provider work, but showing it now would raise accuracy expectations that mock data cannot satisfy.

## UX Issues

- Home screen copy says "Sprint 1 skeleton uses local Rzeszow mock data only." That is useful for developers but weak for user testing.
- The first screen has no explicit validation feedback for empty, zero, negative, or non-numeric budget input. Invalid values silently fall back to the default budget on results.
- The location field is editable, but Sprint 1 data is Rzeszow-only. A non-Rzeszow entry still uses Rzeszow mock results, which can confuse users.
- Preference chips use raw internal tag labels. `small`, `filling`, and `quick` would be clearer as user-facing labels.
- Result cards do not show visible decision reasons yet. Tags help, but they do not clearly answer "why this item?"
- Recommendation details repeat basic data but do not add much decision value beyond the card.
- Empty state copy is safe, but it is plain and has no action controls to adjust budget or preferences.
- The local preferences screen is a placeholder and should not be promoted from the first screen unless Sprint 2 implements useful local defaults.

## Data Quality Issues

- Current Rzeszow seed data is sufficient for local MVP testing, with chain and local-style coverage across low, medium, and higher budgets.
- The dataset is still small and handcrafted. It can validate flow mechanics, but not real recommendation usefulness.
- Some brand names are intentionally generic local placeholders, such as Rzeszow Kebab and Rzeszow Pizza. That is acceptable for mock flow testing but weaker for realistic user feedback.
- Burger King exists in seed data, but its outlet is closed, so it does not appear in active results. This is useful for testing filtering but reduces visible chain variety.
- Subway is listed as optional in product docs and is not present in current seed data. This is acceptable, but Sprint 2 should decide whether it is useful for coverage.
- Price values have internal source, freshness, and confidence metadata, but there is no separate seed-data validation command or import format yet.
- Budget coverage exists around 15 PLN, 25 PLN, and 40 PLN, but Sprint 2 should test common real user budgets such as 10, 15, 20, 25, 30, and 40 PLN.

## Technical Issues Affecting Product Quality

- There is no automated Web E2E or smoke test for the budget -> preferences -> results -> details path.
- Native iOS and Android runtime smoke checks are not recorded.
- Web responsiveness has not been captured with screenshots or a repeatable manual checklist.
- Current budget validation is permissive and fallback-based rather than user-visible.
- Recommendation details build their display card directly from the candidate instead of reusing the same card mapping as results, which can drift if card rules evolve.
- Internal decision reasons already exist in scoring, but they are not exposed through a dedicated safe UX-chip mapping.
- There is no seed-data validation helper to enforce approved tags, price ranges, active flags, fulfillment modes, and hidden metadata rules outside unit tests.

## Recommended Sprint 2 Scope

Sprint 2 should be a product-quality pass on the existing MVP flow:

- UX polish for the budget-first path.
- Friendly preference labels while keeping the locked internal tag vocabulary.
- User-visible decision reason chips that explain recommendations without exposing scoring internals.
- Better empty states and validation states.
- Rzeszow mock data quality improvements.
- Basic Web smoke/E2E or manual test coverage for the full flow.
- Responsive Web and native start checks where local tooling allows.

Decision reason chips should be limited to copy such as:

- `Fits your budget`
- `Matches chicken`
- `Quick option`
- `Filling`
- `Small meal`
- `Lower price`
- `Vegetarian`

Decision reason chips must not include or imply raw score, confidence, source, `sourceUrl`, `lastVerifiedAt`, scoring breakdown, exact distance, or price-observation details.

## Must Have / Should Have / Later

### Must Have

- Keep budget as the first input and primary filter.
- Add visible validation for invalid budget input.
- Replace prototype/developer copy on user-facing screens with MVP-friendly copy.
- Keep result cards within the approved MVP surface: restaurant or brand, item name, estimated price, and 1 to 3 simple tags.
- Add simple safe decision reason chips to result cards and/or details.
- Keep distance hidden from Sprint 2 UI.
- Add tests for any new decision-chip mapping to prove hidden internal fields stay out of UI.
- Add a basic full-flow Web smoke test or manual test checklist.

### Should Have

- Use friendlier preference labels while preserving internal tags.
- Improve empty states with clearer recovery actions.
- Improve recommendation details so they help the user decide, not just repeat the card.
- Expand Rzeszow mock data with more realistic local-style options and common budget bands.
- Add seed-data validation coverage for approved tags, fulfillment modes, and price metadata.
- Run and document responsive Web checks.
- Run and document iOS/Android smoke checks when simulator/emulator tooling is available.

### Later

- Local preference persistence for last budget and selected tags.
- Larger provider boundary for future place discovery.
- Real Google Places integration for place metadata only.
- Backend/API, database, migrations, analytics, and production monitoring.
- Real user feedback collection.
- Distance-aware UI after location accuracy and provider data are reliable.

## Explicit Out Of Scope For Sprint 2

- AI ranking as the core recommendation engine.
- AI chat as the main interface.
- Ordering, basket, checkout, or payments.
- Delivery fees, delivery ordering, delivery pricing, or delivery platform dependency.
- Premium features, subscriptions, paywalls, or recommendation limits.
- Full authentication, accounts, cloud sync, saved history, or analytics.
- Restaurant owner panel or self-service tooling.
- Production scraping, scraper jobs, or scraper-oriented architecture.
- Maps, route planning, or visible distance in result cards or details.
- Nutrition/macros and advanced dietary filtering.
- Production backend/API or database migrations unless separately approved.
- Expanding beyond the Rzeszow MVP market.

## Decisions Needing Human Approval

- Approve adding visible decision reason chips in Sprint 2 as UX-only labels.
- Decide whether reason chips should appear on result cards, recommendation details, or both.
- Approve the exact user-facing copy for reason chips and preference labels.
- Decide whether to keep, hide, or implement the local preferences screen in Sprint 2.
- Decide whether Subway should be added to Rzeszow seed data.
- Decide how realistic local restaurant names should be during MVP testing.
- Confirm whether Sprint 2 should include local persistence as stretch only, with no account, sync, history, or analytics.
- Confirm whether Product Checkpoint 2 approval is required before any Sprint 2 implementation begins.

## Recommended Next Codex Task Key

`[MAKDOLAN::SPRINT2::S2A::UX-POLISH]`

Recommended task framing:

Review Product Checkpoint 2, then implement Sprint 2A UX polish for the existing budget-first MVP flow only. Keep result cards and details free of internal scoring and reliability fields. Add simple UX-only decision reason chips, validation states, empty-state improvements, and matching tests without adding dependencies or expanding MVP scope.
