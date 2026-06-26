# Makdolan MVP

Makdolan is a budget-first food decision helper for users who do not know what to eat. It is built with Expo React Native and targets iOS, Android, and Web.

The current MVP flow is local-first:

1. Enter a food budget.
2. Choose optional simple preferences.
3. Review ranked recommendations from Rzeszow mock data.
4. Open a recommendation detail screen.

Ranking is deterministic local logic. AI, ordering, payments, accounts, delivery fees, maps, scraping, and backend APIs are out of scope for the current MVP.

## Requirements

- Node.js 24 or compatible current LTS.
- npm.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run web
```

Optional native starts when simulator tooling is available:

```bash
npm run ios
npm run android
```

## Current MVP Scope

- Test market: Rzeszow only.
- Data source: local mock/seed data only.
- Result cards show brand or restaurant name, item name, estimated price, visible tags, and safe UX-only reason chips.
- Recommendation details show the same user-safe recommendation information.
- Internal metadata such as score, confidence, source, `sourceUrl`, `lastVerifiedAt`, distance, and scoring breakdown stays out of the UI.

Mock data is intentionally small and handcrafted. It is useful for testing the MVP flow and budget bands, but it is not production-verified menu data.

## Verify

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

For the full manual app check, use:

```text
docs/testing/MANUAL_SMOKE_CHECKLIST.md
```

CI should run the same core checks with `npm ci` on pull requests and pushes to `main`.
