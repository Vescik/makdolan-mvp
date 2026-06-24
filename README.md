# Makdolan MVP

Makdolan is a cross-platform Expo React Native app for iOS, Android, and Web. Sprint 1 helps a user enter a food budget, choose simple preferences, and see ranked food ideas from local Rzeszow mock data.

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

## Verify

```bash
npm run typecheck
npm test
npm run lint
npm run build:web
```

## Sprint 1 Scope

- Budget-first local flow.
- Rzeszow mock data.
- Simple tags: `chicken`, `burger`, `pizza`, `kebab`, `vegetarian`, `small`, `filling`, `quick`.
- Deterministic local recommendation scoring.
- Result cards with brand, item name, estimated price, and visible tags only.

The current app keeps reliability metadata and scoring details inside domain code and tests, not in result or detail screens.
