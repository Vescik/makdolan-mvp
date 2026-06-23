# Product Brief

## Product idea

The app helps users decide what food they can eat nearby within a specific budget. Users enter an amount, location, and optional preferences such as chicken, burger, pizza, small meal, filling meal, vegetarian, healthy, pickup, delivery, or dine-in. The app recommends nearby food options using controlled seed prices, restaurant discovery, and user-submitted price observations.

## Platforms

- iOS: yes
- Android: yes
- Web: yes

## MVP scope

1. Budget/location/preference search.
2. Nearby food recommendations with price confidence and freshness.
3. User feedback and price observations.

## Out of scope for MVP

- Ordering, checkout, delivery tracking, and production scraping as a primary data source.

## Non-functional requirements

- Performance: searches should feel interactive with provider-aware caching where allowed.
- Security: no secrets in repo or logs; user observations are untrusted input.
- Offline support: not required for MVP beyond graceful error states.
- Accessibility: forms and recommendation cards must be usable with keyboard/screen readers on Web and native accessibility APIs on mobile.
- Analytics: track searches, no-results, recommendation usefulness, and price feedback.
