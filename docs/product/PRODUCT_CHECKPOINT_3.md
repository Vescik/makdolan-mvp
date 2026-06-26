# Product Checkpoint 3: MVP Readiness And User Testing

Date: 2026-06-26
Status: Ready for first controlled user testing, not ready for public testing

Product decision source: `docs/product/PRODUCT_DECISIONS.md`.
Readiness sources: `README.md`, `docs/product/PRODUCT_CHECKPOINT_2.md`, `docs/reviews/SPRINT_1_REVIEW.md`, `docs/testing/MANUAL_SMOKE_CHECKLIST.md`, current Sprint 2 app flow, mock data, reason-chip mapping, and CI workflow.

## Checkpoint Summary

After Sprint 2, Makdolan is ready for a small controlled user test with 3-5 early users. The app has a complete local MVP loop:

1. User enters a food budget.
2. User selects optional simple preferences.
3. User sees ranked Rzeszow mock recommendations.
4. User opens recommendation details.

What is ready:

- Budget remains the first and central input.
- The app clearly frames Rzeszow as the current test market.
- Preferences use Polish user-facing labels instead of raw internal tags.
- Result cards show the approved MVP surface: brand or restaurant, item name, estimated price, visible tags, and safe UX-only reason chips.
- Recommendation details add simple decision context without exposing internal scoring or reliability fields.
- Invalid budget states and empty results have user-facing recovery paths.
- Rzeszow seed data now covers 8 brands, 8 outlets, and 27 menu items across common budget bands.
- Unit/domain tests cover scoring, budget validation, tag labels, reason chips, hidden-field protection, and seed-data quality.
- README, manual smoke checklist, and GitHub Actions verification are in place.

What is not ready yet:

- Automated browser E2E is not implemented.
- iOS and Android simulator/emulator smoke checks are still unrecorded.
- Mock prices are handcrafted seed data, not production-verified menu data.
- There is no backend, API, database, analytics, account, sync, or in-app feedback collection.
- Local persistence for the last budget and selected preferences is not implemented.

Readiness decision: proceed to first controlled user testing only. Do not treat the app as public-test ready until native smoke checks, user feedback handling, and a public-testing data stance are explicitly approved.

## MVP Readiness Assessment

Core problem clarity: ready enough for controlled testing.
The product now communicates the main problem: "I do not know what to eat in this budget." The first screen asks "Co zjeść w tym budżecie?" and makes the decision-helper value clearer than the Sprint 1 prototype copy.

Budget-first flow: ready.
Budget is the first action, invalid input is blocked with visible validation, and results are filtered to fit the submitted budget.

Rzeszow-only market clarity: ready for controlled testing.
The home, preferences, results, and details flow consistently refer to Rzeszow as the test market. This is clear enough if testers are briefed that data is mock/seed data, not live local coverage.

Preference clarity: ready.
Preferences use Polish labels: `Kurczak`, `Burger`, `Pizza`, `Kebab`, `Wegetariańskie`, `Mały posiłek`, `Sycące`, and `Szybka opcja`. These are understandable for early testing, though the exact wording should be validated with users.

Result card usefulness: ready.
Cards stay compact and focus on the decision: place/brand, item, estimated price, tags, and up to 3 reason chips. They do not show distance, raw score, confidence, source, `sourceUrl`, `lastVerifiedAt`, or scoring breakdown.

Decision reason chip usefulness: ready to validate.
Safe chips such as `W budżecie`, `Pasuje do: Kurczak`, `Szybka opcja`, `Sycące`, `Mały posiłek`, `Wegetariańskie`, and `Tania opcja` make the app feel less random without exposing scoring internals. User testing should check whether these chips are trusted and understood.

Detail screen usefulness: ready enough for controlled testing.
The detail screen repeats key recommendation information and adds "Dlaczego może pasować?" with safe reason chips. It is useful enough for MVP testing, though users may expect a next action later.

Empty states and validation: ready.
Invalid budgets produce visible errors. Empty results suggest changing budget or preferences. This is sufficient for testing basic comprehension and recovery.

Mock data usefulness: ready for flow testing, not real-market validation.
The current dataset is useful for testing decision flow, budget behavior, and tag matching. It should not be used to evaluate price accuracy, restaurant coverage, or live availability.

Web/mobile readiness: partially ready.
Web build and responsive manual checklist exist. Native starts are available through `npm run ios` and `npm run android`, but simulator/emulator smoke checks still need to be run and recorded.

CI/manual verification readiness: ready.
CI runs `npm ci`, `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build:web`. The manual smoke checklist covers the budget-to-detail flow, hidden fields, Rzeszow behavior, responsive checks, and native smoke placeholders.

## First User Testing Plan

Run a lightweight moderated test with 3-5 people. Keep the goal narrow: determine whether users understand the product, can complete the budget-first flow, and trust the recommendations enough to make a decision.

Target tester profile:

- Students or young working people.
- People who sometimes do not know what to eat.
- People who make budget-constrained food decisions.
- Ideally at least some testers familiar with Rzeszow, but the first test can include non-Rzeszow users if they are told the market is mocked.

Test setup:

- Use the web app locally or through a shared test build if available.
- Tell testers the app uses local mock Rzeszow data and estimated prices.
- Do not explain the scoring model.
- Ask testers to think aloud.
- Record observations manually in a notes document or spreadsheet.
- Do not collect sensitive personal data.

Tasks for testers:

- Complete the budget -> preferences -> results -> details flow.
- Try at least one invalid budget.
- Try a search with preferences.
- Try a search without preferences.
- Open at least one recommendation and explain why it may have been suggested.

Observation questions during the test:

- Do testers understand what the first screen asks them to do?
- Do they notice that the market is Rzeszow-only?
- Do they understand that prices are estimates?
- Do they understand preference labels without explanation?
- Do they use reason chips when deciding?
- Do they feel the recommendations are ranked or random?
- Do they know how to recover from an invalid budget or empty result?
- Do they expect ordering, maps, delivery, or accounts?

Post-test questions:

- What did you think Makdolan was for?
- Would you use this when you do not know what to eat?
- Did the budget input feel central to the experience?
- Which recommendation felt most useful, and why?
- Which labels or chips were confusing?
- Did anything look like live restaurant or delivery data?
- What would you need before trusting this in a real lunch/dinner decision?
- Would remembering your last budget or preferences help?

Success signals:

- Tester can describe Makdolan as a budget-first food decision helper.
- Tester completes the main flow without assistance.
- Tester understands that results fit the entered budget.
- Tester can explain at least one recommendation using visible tags or reason chips.
- Tester notices the Rzeszow-only and estimated-price context.
- Tester does not expect ordering, delivery, payment, account, map, or live availability inside this MVP.

Failure signals:

- Tester thinks the app is a randomizer.
- Tester misses the budget-first purpose.
- Tester does not trust or understand reason chips.
- Tester expects live prices, maps, delivery, or ordering.
- Tester cannot recover from invalid budget or empty results.
- Tester says the dataset feels too fake to evaluate even the flow.
- Tester wants persistence before completing repeated searches.

Manual feedback to collect:

- Tester profile: student, working person, Rzeszow familiarity, typical meal budget.
- Task completion notes.
- Exact confusing labels or copy.
- Budgets and preferences tried.
- Which cards were clicked and why.
- Whether reason chips helped.
- Whether mock data blocked useful feedback.
- Top 3 requested improvements.

## Suggested User Test Tasks

1. You have 20 PLN and want something quick. Find something to eat.
2. You have 15 PLN and want kebab or pizza. Check if anything fits.
3. Try an invalid budget and explain what happened.
4. Open a recommendation and explain why you think it was suggested.
5. Use the app without choosing preferences and describe whether results still make sense.
6. You have 40 PLN and want something filling. Find the best option and explain your choice.
7. Try to get no results, then recover by changing the budget or preferences.

## Decision Points Before Public Testing

- Decide whether manual testing is enough before automated E2E. Recommendation: manual testing is enough for 3-5 controlled users; add E2E before broader/public testing.
- Decide whether iOS/Android smoke checks are required before user testing. Recommendation: web-only controlled testing can start now; native testing should wait until simulator/emulator checks pass.
- Decide whether local persistence should be done before or after user feedback. Recommendation: collect feedback first; add persistence only if repeated searches make its value obvious.
- Decide whether feedback collection should be manual or implemented in-app. Recommendation: manual collection for the first 3-5 users; avoid analytics or in-app collection until the feedback shape is known.
- Decide whether dataset should remain mock-only during tests. Recommendation: keep mock-only but brief testers clearly; do not add production data ingestion or scraping before this test.
- Decide whether public testing can happen without real price verification. Recommendation: no; public testing needs a clearer data reliability stance.

## Sprint 3 Recommendations

### Must Have

- Run the controlled 3-5 user test and record observations.
- Create a lightweight manual feedback template or spreadsheet.
- Fix small UX/copy issues discovered during testing.
- Run and record the manual smoke checklist on web.
- Run iOS and Android smoke checks if simulator/emulator tooling is available.
- Keep all internal scoring, reliability, source, and distance fields hidden from UI.

### Should Have

- Add a basic automated web E2E smoke test for budget -> preferences -> results -> details if Playwright or another stable harness can be introduced with low risk.
- Improve seed data based on tester feedback about realism, budgets, categories, or labels.
- Add local persistence for last budget and selected preferences only if testers repeatedly ask for it.
- Add a short PC3 test-results document after the first user test.
- Tighten responsive checks with screenshots or recorded viewport notes.

### Later

- Build a provider boundary for future place discovery.
- Add real place metadata from approved providers.
- Add production data reliability process before public testing.
- Add analytics only after privacy/product requirements are approved.
- Add account, sync, history, maps, distance UI, ordering, or payments only after separate product approval.

## Explicit Out Of Scope For Sprint 3 Unless Separately Approved

- AI ranking as the core recommendation engine.
- AI chat as the main interface.
- Production scraping or scraper jobs.
- Production menu ingestion.
- Ordering, baskets, checkout, payments, delivery pricing, or delivery integrations.
- Authentication, accounts, cloud sync, saved history, or analytics.
- Restaurant owner panel.
- Maps, route planning, or visible distance UI.
- Backend/API/database/migrations.
- Premium, subscriptions, paywalls, or recommendation limits.
- Expansion outside Rzeszow.

## Human Approval Checklist

- Approve first controlled user testing with mock Rzeszow data.
- Approve tester profile and number of testers.
- Approve whether testing is web-only first or requires native smoke checks first.
- Approve manual feedback collection format.
- Approve whether local persistence is Sprint 3 stretch or deferred.
- Approve whether automated web E2E is required before broader testing.
- Approve whether dataset realism is good enough for controlled flow feedback.
- Approve that public testing is not the next step until user feedback and data reliability questions are resolved.

## Recommended Next Codex Task Key

`[MAKDOLAN::SPRINT3::S3A::USER-TESTING-FEEDBACK-LOOP]`

Recommended task framing:

Create a lightweight first-user-test package: manual feedback template, PC3 test-results document stub, and instructions for recording web/native smoke outcomes. Do not add product features, analytics, persistence, backend, E2E tooling, or production data unless separately approved.
