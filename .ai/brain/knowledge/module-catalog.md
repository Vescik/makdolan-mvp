# Module Catalog

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-module-catalog` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Maps current app modules, tests, workflow files, and CI entry points for discovery. |
| domain | Code discovery |
| created | 2026-06-26 |
| last_reviewed | 2026-06-26 |
| review_after | 2026-07-26 |

This catalog helps new sessions find the right code and docs quickly.

## App Routes

| Path | Responsibility |
|---|---|
| `app/_layout.tsx` | Expo Router layout. |
| `app/index.tsx` | Entry route for budget-first flow. |
| `app/preferences.tsx` | Preference selection route. |
| `app/results.tsx` | Recommendation results route. |
| `app/profile/preferences.tsx` | Profile preference route. |
| `app/recommendations/[id].tsx` | Recommendation detail route. |

## Domain Logic

| Path | Responsibility |
|---|---|
| `src/domain/recommendations/types.ts` | Domain types for recommendations. |
| `src/domain/recommendations/mockRecommendations.ts` | Current controlled recommendation data. |
| `src/domain/recommendations/scoring.ts` | Deterministic scoring. |
| `src/domain/recommendations/reasonChips.ts` | User-safe reason chips. |
| `src/domain/recommendations/tagLabels.ts` | Tag labeling. |

## Screens And UI

| Path | Responsibility |
|---|---|
| `src/screens/HomeBudgetScreen.tsx` | Budget entry screen. |
| `src/screens/PreferencesScreen.tsx` | Preference selection screen. |
| `src/screens/RecommendationResultsScreen.tsx` | Results list screen. |
| `src/screens/RecommendationDetailsScreen.tsx` | Details screen. |
| `src/screens/ProfilePreferencesScreen.tsx` | Profile preference screen. |
| `src/ui/` | Shared shell, button, and text primitives. |

## Tests

| Path | Responsibility |
|---|---|
| `src/domain/recommendations/*.test.ts` | Recommendation domain tests. |
| `src/screens/budgetValidation.test.ts` | Budget input validation tests. |
| `vitest.config.ts` | Vitest configuration. |

## Workflow And CI

| Path | Responsibility |
|---|---|
| `scripts/verify-local.sh` | Local verification helper. |
| `.github/workflows/verify-mobile-web.yml` | CI for typecheck, tests, lint, and web build. |
| `.codex/` | Project-scoped Codex policy, agents, hooks, and rules. |
| `.agents/skills/` | Local reusable Codex skills. |
