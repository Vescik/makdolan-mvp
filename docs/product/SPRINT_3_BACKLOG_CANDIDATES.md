# Sprint 3 Backlog Candidates

Status: Candidate list for after first controlled user testing
Source: `docs/product/PRODUCT_CHECKPOINT_3.md` and `docs/testing/USER_TESTING_PLAN.md`

This is not a committed Sprint 3 scope. Promote items only after reviewing actual tester observations.

## Must Fix Before Broader Testing

- Resolve UX or copy issues that prevent users from completing budget -> preferences -> results -> details.
- Fix any budget validation state testers cannot understand or recover from.
- Fix any result-card confusion that makes the app feel like a randomizer.
- Fix reason-chip copy if testers misunderstand why recommendations were shown.
- Fix any UI issue that exposes or implies hidden internal fields such as raw score, confidence, source, `sourceUrl`, `lastVerifiedAt`, distance, or scoring breakdown.
- Run and record web manual smoke results.
- Run iOS and Android smoke checks before mobile user testing.

## Should Improve

- Refine preference labels if testers misunderstand `Sycące`, `Mały posiłek`, or `Szybka opcja`.
- Improve detail screen copy if testers say details do not add enough decision value.
- Improve empty-state recovery if testers do not know how to adjust budget or preferences.
- Improve seed data if testers say the dataset blocks flow feedback.
- Add a test-results summary document after the first 3-5 sessions.
- Add basic automated web E2E before broader/public testing if it can be introduced with low risk.
- Add responsive screenshot notes for desktop, tablet, and mobile widths.

## Later

- Local persistence for last budget and selected preferences, only if multiple testers ask for it or repeated-search behavior proves it useful.
- Larger Rzeszow dataset after feedback identifies missing categories or budget bands.
- Provider boundary for future place discovery.
- Production data reliability process before public testing.
- In-app feedback capture after manual feedback patterns are known.
- Analytics only after privacy and product requirements are approved.

## Do Not Do Yet

- AI ranking as the core recommendation engine.
- Production scraping or scraper jobs.
- Backend, API, database, or migrations.
- Auth, accounts, cloud sync, or saved history.
- Ordering, baskets, checkout, payments, delivery pricing, or delivery integrations.
- Maps, route planning, visible distance UI, or live location behavior.
- Restaurant owner panel.
- Premium, subscriptions, paywalls, or recommendation limits.
- Expansion outside Rzeszow.
- Public testing until user feedback and data reliability decisions are reviewed.

## Backlog Intake Rule

For each finding from `docs/testing/USER_TEST_FEEDBACK_TEMPLATE.md`, record:

- Evidence from at least one tester.
- Severity.
- Whether it blocks controlled testing, broader testing, or public testing.
- Recommended action.
- Whether the fix stays within MVP constraints.
