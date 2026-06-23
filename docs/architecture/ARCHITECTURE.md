# Architecture Overview

## Recommended Stack

- Client: Expo React Native + TypeScript.
- Routing: Expo Router.
- Web: React Native Web through Expo.
- Server state: TanStack Query.
- Local UI state: React context or Zustand when needed.
- Backend/API: TypeScript service or backend-as-a-service with explicit REST/JSON contracts.
- Database: PostgreSQL with geospatial support where available.
- Nearby discovery: Google Places.
- Maps/location: Expo Location plus a map provider selected by cost and regional coverage.

## High-Level Components

| Component | Responsibility |
|---|---|
| Cross-platform app | Budget form, location entry, preferences, recommendations, feedback. |
| Recommendation API | Validates search input, fetches nearby restaurants, matches menu data, ranks options. |
| Restaurant discovery service | Wraps Google Places and provider-specific caching rules. |
| Menu data service | Reads seed data, user observations, and future partner/self-service data. |
| Price verification service | Maintains confidence scores, freshness, and review states. |
| Feedback service | Stores usefulness and price accuracy signals. |
| Admin/review tools | Later internal tools for seed imports and stale/conflicting prices. |

## Core Data Flow

1. User enters budget, location, and optional preferences.
2. App sends normalized search request to API.
3. API resolves nearby restaurants through cached/provider-backed discovery.
4. API matches restaurants to known seed or observed menu items.
5. Recommendation engine scores options by budget fit, distance, preference match, availability channel, and price confidence.
6. App displays recommendations with confidence/freshness language.
7. User feedback updates observation and verification pipelines.

## Platform Notes

### iOS

- Handle precise vs approximate location.
- Provide manual location fallback.
- Plan future App Store payment rules before mobile subscriptions.

### Android

- Handle runtime location permission states.
- Test location denied, approximate/manual, and low-connectivity flows.

### Web

- Keep layouts responsive and form widths constrained.
- Browser geolocation must have manual fallback.
- Consider a separate marketing site only if SEO becomes important.

## Security And Privacy

- Do not log authorization headers, precise location history, or secret values.
- Store only the minimum location data needed for search and quality analysis.
- Use environment variables/secret stores for API keys.
- Treat user-submitted observations as untrusted input.
- Rate-limit feedback and observation endpoints.

## Verification Strategy

- Unit tests for recommendation scoring and confidence calculations.
- Contract tests for search and feedback APIs.
- Component tests for budget/preference forms.
- Web production build.
- iOS and Android build checks through Expo/EAS or CI once app code exists.

