# Makdolan Project Context

Last updated: 2026-06-25  
Current status: Sprint 1 completed and merged to `main` in commit `d90a22a Complete Sprint 1 MVP foundation`.

Use this file as copy-paste context for a new ChatGPT/Codex session before starting Product Checkpoint 2 or Sprint 2.

## 1. Project Overview

Makdolan is a cross-platform iOS, Android, and Web app that helps users decide what food they can eat nearby within a specific budget.

The core user problem is: "I do not know what to eat, I have a specific budget, and I want a quick suggestion."

The product answer is: enter a budget and simple preferences, then get food ideas that fit. The MVP is positioned around decision help first, with budget as the main functional differentiator. It must not become a generic random food picker.

## 2. Approved Product Decision Board v1

- Target users: students, young working people, and people who want a quick nearby food decision.
- Main emotional problem: "I do not know what to eat."
- Budget remains central to filtering and ranking.
- First test market: Rzeszow. Code and seed data currently use ASCII `Rzeszow`.
- MVP recommends product-level food options for dine-in or pickup-style usage.
- MVP prices are item prices only.
- No delivery fee calculation, delivery ordering, delivery platform dependency, or delivery pricing in MVP.
- No ordering, payments, subscriptions, premium, production scraping, full auth, restaurant owner panel, social features, nutrition/macros, or AI chat as the main interface in MVP.
- Sprint 1 tag vocabulary is locked to: `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`.

## 3. Current Implementation Status After Sprint 1

Existing screens:

- `HomeBudgetScreen`: budget input, location input defaulting to `Rzeszow`, navigation to preferences.
- `PreferencesScreen`: selectable Sprint 1 tags.
- `RecommendationResultsScreen`: ranked recommendation list from local mock data and deterministic scoring.
- `RecommendationDetailsScreen`: simple item details.
- `ProfilePreferencesScreen`: placeholder for local preference defaults; no account or cloud sync.

Working user flow:

1. User opens the app.
2. User enters a budget.
3. User keeps or edits location, currently defaulted to `Rzeszow`.
4. User selects zero or more simple preference tags.
5. User sees ranked mock recommendations.
6. User opens a recommendation details screen.

Mock data status:

- Mock menu data is separated from UI in `src/domain/recommendations/mockRecommendations.ts`.
- Seed brands include McDonald's, KFC, Burger King, Rzeszow Kebab, Rzeszow Pizza, and Bar Domowy.
- There are at least 12 menu items across low, medium, and higher MVP budgets around 15 PLN, 25 PLN, and 40 PLN.
- Mock outlets are Rzeszow/test-market data. Warsaw data should not be reintroduced.
- Burger King exists in seed data but its current mock outlet is closed, so it is filtered out of active recommendations.

Scoring status:

- Local deterministic scoring exists in `src/domain/recommendations/scoring.ts`.
- Main functions include `scoreRecommendations`, `rankRecommendations`, `getRecommendationResponse`, `scoreCandidate`, and `toRecommendationCard`.
- Scoring uses budget fit, preference match, neutralized distance score, restaurant rating, portion score, and freshness score.
- Distance is kept internal/neutralized for Sprint 1 and is not shown in MVP UI.
- Safe fallback state exists when no recommendations match.
- AI is not used as the primary ranking engine.

Tests status:

- Vitest tests exist in `src/domain/recommendations/scoring.test.ts`.
- Tests cover mock data coverage, Sprint 1 tag contract, fulfillment limits, active/open/in-budget filtering, budget ranking, matching tags, excluded tags, closed outlets, low confidence, stale/low confidence scoring, score sorting, no-result fallback, and UI card mapping that hides internal fields.

Not implemented yet:

- Real Google Places integration.
- Backend/API.
- Database or migrations.
- Auth or persisted user profiles.
- Anonymous search persistence or analytics.
- User-submitted price observations.
- Restaurant owner panel.
- Ordering, payments, subscriptions, premium, delivery, delivery fees, scraping, nutrition/macros, advanced AI personalization, and production monitoring.
- Native iOS/Android runtime smoke checks are unknown / verify in repo or CI.
- Automated browser E2E tests are not implemented yet.

## 4. UI Rules

MVP result cards may show only:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- 1 to 3 matching/simple tags.

MVP recommendation details may show:

- Restaurant or brand name.
- Menu item name.
- Estimated item price.
- Visible tags.
- Simple note: "Estimated price may vary by location."

Do not show these in MVP result cards or details:

- Distance.
- Raw score.
- Confidence.
- Source.
- `sourceUrl`.
- `lastVerifiedAt`.
- Scoring breakdown.
- Price observation details.

User-facing copy can say "estimated price" or "price may vary by location".

## 5. Internal Data Rules

These fields may exist internally in types, mock data, scoring, tests, and future admin tooling:

- `source`.
- `sourceUrl`.
- `lastVerifiedAt`.
- `confidence`.
- `scoreBreakdown`.
- Price observation metadata.

Every price-like value should retain source, freshness, and confidence metadata internally. These fields are reliability and debugging data, not primary MVP UI content.

## 6. Current Technical Stack

- Frontend: Expo React Native with TypeScript.
- Routing: Expo Router.
- Web target: React Native Web through Expo.
- Mobile targets: iOS and Android through Expo; native runtime verification is unknown / verify in repo.
- Backend for Sprint 1: none.
- Data storage for Sprint 1: local TypeScript seed/mock data only.
- Package manager: npm with `package-lock.json`.
- Tests: Vitest.
- Static checks: TypeScript and ESLint.

Known `package.json` scripts:

- `npm run start`: Expo start.
- `npm run web`: Expo web dev server.
- `npm run android`: Expo Android start.
- `npm run ios`: Expo iOS start.
- `npm run typecheck`: `tsc --noEmit`.
- `npm test`: `vitest run`.
- `npm run lint`: `eslint .`.
- `npm run build` / `npm run build:web`: `expo export --platform web`.

## 7. Codex Workflow

For non-trivial work, use the repository build loop:

1. Discover: read product decisions, implementation baseline, relevant docs, code, tests, and current git state.
2. Plan: make a small plan with affected files, verification, and risks before editing.
3. Execute: make focused changes only.
4. Verify: run relevant TypeScript, tests, lint, build, and smoke checks.
5. Iterate/Learn: update docs/reviews/context when behavior changes.

Do not implement new scope before updating or confirming product/architecture docs when the work changes product behavior.

## 8. Current Phase

Sprint 1 is completed.

Next phase should be Product Checkpoint 2 and Sprint 2 planning, unless a newer checkpoint document already exists. As of this context update, `docs/product/PRODUCT_CHECKPOINT_2.md` is unknown / verify in repo; it was not present during discovery.

Recommended Sprint 2 directions from the Sprint 1 review:

- Product Checkpoint 2 MVP flow review.
- UX polish for empty states and the recommendation flow.
- Data quality improvements for Rzeszow seed data.
- Local persistence only if it remains aligned with the privacy decision.
- Web smoke/E2E checks before deeper feature work.

## 9. Commit Policy

- Commit after each verified phase.
- Do not start a new phase with uncommitted changes unless the changes are intentionally parked and clearly documented.
- Keep commits scoped to the phase or checkpoint being completed.
- Before pushing, run the relevant verification commands and check `git status`.

## 10. Useful Stage Keys

Use these keys for future prompts and review checkpoints:

- `[MAKDOLAN::PRODUCT::PC2::MVP-FLOW-REVIEW]`
- `[MAKDOLAN::SPRINT2::S2A::UX-POLISH]`
- `[MAKDOLAN::SPRINT2::S2B::DATA-QUALITY]`
- `[MAKDOLAN::SPRINT2::S2C::LOCAL-PERSISTENCE]`
- `[MAKDOLAN::REVIEW::SPRINT2::CHECKPOINT]`

## 11. Useful Current Files

- Product decisions: `docs/product/PRODUCT_DECISIONS.md`.
- Sprint 1 baseline: `docs/IMPLEMENTATION_BASELINE.md`.
- Sprint 1 review: `docs/reviews/SPRINT_1_REVIEW.md`.
- Data model: `docs/data/DATABASE_MODEL.md`.
- Scoring model: `docs/data/SCORING_MODEL.md`.
- Mock data: `src/domain/recommendations/mockRecommendations.ts`.
- Scoring implementation: `src/domain/recommendations/scoring.ts`.
- Recommendation types: `src/domain/recommendations/types.ts`.
- Scoring tests: `src/domain/recommendations/scoring.test.ts`.
