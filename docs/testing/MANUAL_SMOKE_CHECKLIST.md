# Manual Smoke Checklist

Use this checklist before Product Checkpoint 3 or first user testing. It covers the current local MVP only: budget input -> preferences -> ranked recommendations -> details.

## Setup

- [ ] Run `npm install` or `npm ci`.
- [ ] Run `npm run web`.
- [ ] Open the web app at the local Expo URL.
- [ ] Confirm the app is using the Rzeszow MVP copy and local mock data only.

## Budget Input

- [ ] The first screen asks for a food budget before preferences or results.
- [ ] A valid budget such as `20` allows continuing to preferences.
- [ ] Empty input shows a visible validation error.
- [ ] `0`, negative values, and non-numeric values show visible validation errors.
- [ ] Very high but valid numeric input still allows the flow without exposing non-MVP features.

## Preference Selection

- [ ] Preference chips use user-facing labels, not raw developer labels.
- [ ] Selecting no preferences still allows recommendations.
- [ ] Selecting `Kurczak`, `Burger`, `Pizza`, `Kebab`, `Wegetariańskie`, `Mały posiłek`, `Sycące`, or `Szybka opcja` produces a stable result flow.
- [ ] The local profile preferences entry remains de-emphasized and does not block the MVP flow.

## Result Cards

- [ ] Results are ranked and all visible prices fit the submitted budget.
- [ ] Each result card shows brand or restaurant name.
- [ ] Each result card shows menu item name.
- [ ] Each result card shows estimated item price.
- [ ] Each result card shows 1-3 visible tags where available.
- [ ] Each result card shows no more than 3 reason chips.
- [ ] Reason chips are simple UX labels such as budget fit, preference match, quick, filling, small, vegetarian, or cheap option.
- [ ] Cards stay compact and readable on desktop and narrow mobile widths.

## Details Screen

- [ ] Opening a result navigates to a detail screen for the same item.
- [ ] Details show brand or restaurant name, item name, estimated price, visible tags, and safe reason chips.
- [ ] Details explain that the item may fit without exposing scoring internals.
- [ ] Back navigation returns to the result list.

## Empty State

- [ ] A restrictive budget or preference combination shows a clear empty state.
- [ ] Empty state copy suggests adjusting budget or preferences.
- [ ] Empty state does not introduce ordering, delivery, account, map, or AI behavior.

## Hidden Fields

Confirm the UI does not show:

- [ ] Raw score.
- [ ] Confidence.
- [ ] Source.
- [ ] `sourceUrl`.
- [ ] `lastVerifiedAt`.
- [ ] Exact distance or distance in kilometers.
- [ ] Scoring breakdown.
- [ ] Price observation metadata.

## Rzeszow-Only Behavior

- [ ] The app copy is clear that the MVP market is Rzeszow.
- [ ] Results come from local Rzeszow mock data.
- [ ] The app does not imply live availability, live prices, delivery coverage, or map accuracy.

## Responsive Checks

- [ ] Web desktop width around 1280 px: main flow is centered, readable, and not stretched awkwardly.
- [ ] Web tablet width around 768 px: forms, chips, cards, and details fit without overlap.
- [ ] Web mobile width around 390 px: text wraps cleanly, chips remain tappable, and card content does not overflow.
- [ ] Orientation or width changes do not lose entered state during the current flow.

## Native Smoke Placeholders

Run these when simulator or emulator tooling is available:

- [ ] `npm run ios` starts the app in an iOS simulator.
- [ ] iOS budget -> preferences -> results -> details flow works.
- [ ] `npm run android` starts the app in an Android emulator.
- [ ] Android budget -> preferences -> results -> details flow works.

If native tooling is unavailable, record that explicitly in the checkpoint notes.

## Automation Status

- Unit/domain tests cover scoring, tag labels, reason chips, budget validation, hidden-field protection, and seed data quality.
- GitHub Actions should run `npm ci`, `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build:web`.
- Web E2E is deferred. The repo does not currently include Playwright, Cypress, or an existing browser test harness, and adding one would be a separate test-infrastructure task.
