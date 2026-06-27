# Makdolan Controlled User Testing Plan

Status: Ready to use for the first controlled MVP tests
Scope: Web-only controlled testing with 3-5 early users
Source: `docs/product/PRODUCT_CHECKPOINT_3.md`

## Purpose

Run a small moderated test to learn whether Makdolan helps people answer: "I do not know what to eat, I have a budget, and I want a quick suggestion."

This test should produce practical Sprint 3 backlog candidates, not a public-launch decision.

## What This Test Validates

- Whether users understand the first screen and budget-first flow.
- Whether users understand that Rzeszow is the current test market.
- Whether simple preferences are understandable.
- Whether result cards provide enough information to choose.
- Whether reason chips make recommendations feel useful rather than random.
- Whether the details screen adds enough decision value.
- Whether invalid budget and empty-result states are understandable.
- Whether users expect features that are intentionally out of scope.

## What This Test Does Not Validate

- Real restaurant coverage.
- Production menu accuracy.
- Live availability.
- Real price accuracy.
- Delivery, ordering, payments, accounts, maps, distance, or restaurant panels.
- Native iOS or Android readiness.
- Long-term retention or analytics.
- AI ranking quality.

## Target Tester Profile

Recruit 3-5 testers:

- Students or young working people.
- People who sometimes do not know what to eat.
- People who make food choices with a budget in mind.
- Preferably at least some people familiar with Rzeszow.

Do not over-recruit. The goal is to find obvious comprehension and decision-flow issues before broader testing.

## Test Format

- Moderated session.
- One tester at a time.
- Web app only for this first controlled round.
- 20-30 minutes per tester.
- Think-aloud encouraged.
- Manual notes only. No in-app feedback, analytics, recording, or account collection is required.

## Setup Steps

1. Confirm the branch/build being tested.
2. Run `npm run web` or open the shared web test URL.
3. Run through `docs/testing/MANUAL_SMOKE_CHECKLIST.md` before the first session.
4. Prepare one copy of `docs/testing/USER_TEST_FEEDBACK_TEMPLATE.md` per tester.
5. Give the tester the briefing below.
6. Ask the tester to share thoughts out loud.
7. Avoid explaining the UI unless the tester is fully blocked.

## Facilitator Script

Start:

"Thanks for testing this early version of Makdolan. I am testing whether the app helps you choose food when you have a budget and do not know what to eat. I am not testing you. If something is confusing, that is useful feedback."

During tasks:

"Please say what you are thinking as you use it. I may ask what you expected or why you chose something, but I will try not to guide you."

When the tester hesitates:

"What are you looking for now?"

"What did you expect this button/card/text to do?"

End:

"I will ask a few questions about what felt useful, confusing, or missing. The goal is to decide what to improve next."

## Tester Briefing

Tell each tester before tasks:

- This is an early MVP.
- The current test market is Rzeszow.
- The app uses local mock/seed data.
- Prices are estimated and may not match real restaurant prices.
- Ordering, payment, delivery, maps, and distance are not available.
- The goal is to test whether the app helps you choose food, not whether all restaurant data is production-accurate.
- Please think out loud and mention anything confusing or missing.

## Test Tasks

Ask testers to complete these without extra explanation:

1. You have 20 PLN and want something quick. Find something to eat.
2. You have 15 PLN and want kebab or pizza. Check what fits.
3. You have 30 PLN and want something filling. Pick one option.
4. Try an invalid budget and describe what happens.
5. Open a recommendation and explain why you think it was suggested.
6. Use the app without choosing preferences and say whether results still make sense.

Optional recovery task:

7. Try to get no results, then change budget or preferences to recover.

## Observation Checklist

Track whether the tester:

- Understands what the first screen is asking.
- Understands that budget comes first.
- Enters a valid budget without confusion.
- Understands validation errors for empty, zero, negative, or non-numeric input.
- Understands preferences and their labels.
- Notices that preferences are optional.
- Finds result cards useful.
- Understands estimated item price.
- Uses visible tags to decide.
- Uses reason chips to decide.
- Understands why a recommendation may fit.
- Opens details naturally.
- Finds the details screen useful.
- Understands empty/error recovery actions.
- Understands the Rzeszow-only limitation.
- Understands that data is mock/local seed data.
- Understands ordering/payment/delivery is unavailable.
- Hesitates at any point.
- Looks for something that is not present.
- Mentions repeated searches or wanting remembered preferences.

## Post-Test Questions

Ask after tasks:

- What did you think this app was for?
- Did the suggestions feel useful?
- Did the budget matter enough?
- Did the reason chips help you decide?
- Was anything confusing?
- Would you use this when you do not know what to eat?
- What would make this more useful?
- Did you expect ordering, maps, distance, or delivery?
- Would remembering your last budget or preferences help?
- Did the mock Rzeszow data stop you from giving useful feedback?

## Success Signals

- Tester describes Makdolan as a budget-first food decision helper.
- Tester completes the main flow without facilitator help.
- Tester understands that results fit the entered budget.
- Tester can explain at least one recommendation using visible tags or reason chips.
- Tester notices or accepts the Rzeszow/mock-data limitation.
- Tester does not mistake the MVP for ordering, payment, delivery, map, or live restaurant software.
- Tester can recover from invalid budget or empty result states.

## Failure Signals

- Tester thinks the app is a random food picker.
- Tester misses that budget is central.
- Tester does not understand preference labels.
- Tester does not understand reason chips.
- Tester cannot tell why a recommendation was shown.
- Tester expects live prices, real availability, ordering, delivery, maps, or distance.
- Tester cannot recover from errors or empty results.
- Tester says mock data makes the test impossible.

## How To Summarize Results

After all sessions, create a short summary with:

- Number of testers.
- Tester profiles.
- Devices/browsers used.
- Tasks completed without help.
- Most common confusion points.
- Positive signals.
- Negative signals.
- Direct quotes worth preserving.
- Top must-fix issues before broader testing.
- Should-improve items for Sprint 3.
- Later items that should not distract from MVP validation.

Use `docs/product/SPRINT_3_BACKLOG_CANDIDATES.md` to convert findings into candidate work.
