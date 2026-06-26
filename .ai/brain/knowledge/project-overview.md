# Project Overview

Makdolan is a budget-first food decision helper for users who know how much they want to spend but do not know what to eat. The current MVP helps users enter a budget, choose simple preferences, and see ranked food ideas from controlled Rzeszow mock/seed data.

## Product Shape

- Primary problem: help users make a quick food decision.
- Primary differentiator: budget is central to filtering and ranking.
- First market: Rzeszow.
- Current data mode: local controlled seed/mock data.
- Current ranking mode: deterministic local scoring.

## Platforms

Makdolan targets:

- iOS through Expo React Native.
- Android through Expo React Native.
- Web through Expo and React Native Web.

No native `ios/` or `android/` folders are currently present, so native production build validation needs a future Expo/EAS or native build strategy.

## Current Code Areas

| Area | Purpose |
|---|---|
| `app/` | Expo Router routes and navigation entry points. |
| `src/screens/` | Cross-platform screen components. |
| `src/domain/recommendations/` | Recommendation types, mock data, scoring, reason chips, labels, and tests. |
| `src/ui/` | Shared UI primitives and shell components. |
| `docs/` | Product, architecture, data, testing, roadmap, and workflow documentation. |
| `project-context/` | Product brief, security/privacy, test strategy, and tech stack context. |
| `knowledge-base/` | Durable architecture and domain knowledge. |

## Current Non-Goals

The MVP excludes ordering, checkout, payments, delivery tracking, production scraping as a core data source, full authentication, restaurant owner tooling, nutrition/macros, social features, and AI chat as the main interface.
