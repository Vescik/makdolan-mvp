# Architecture Notes

## Cross-Platform Stack

- Proposed MVP client stack: Expo React Native + TypeScript for iOS, Android, and Web.
- Decision record: `docs/architecture/ADR-0001-cross-platform-stack.md`.
- Rationale: fastest single-codebase path for a solo founder, strong location/map ecosystem, good Codex maintainability, and practical future payment support.
- Initial skeleton exists with Expo Router routes under `app/`, screens under `src/screens/`, shared UI under `src/ui/`, and recommendation domain logic under `src/domain/recommendations/`.
- Verification entrypoints: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `bash scripts/verify-local.sh`.

## Data Strategy

- Production MVP data must prioritize controlled seed data, Google Places restaurant discovery, user-submitted price observations, later restaurant self-service, and official APIs/partnerships.
- Production scraping is not an approved primary data source.
- Scraping is limited to risky research use after legal review and explicit approval.

## Recommendation Engine

- MVP recommendation engine should be deterministic and explainable.
- Initial ranking inputs: budget fit, distance, preference tags, price confidence, freshness, availability channel, open status, and basic quality signals.
- ML ranking should wait until enough search, click, feedback, and correction data exists.
