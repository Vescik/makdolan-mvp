# ADR-0001: Cross-Platform Stack for MVP

Date: 2026-06-23
Status: Proposed

## Context

The MVP helps users find nearby food options that fit a specific budget, location, and preference set. It must support iOS, Android, and Web without implementing ordering in the first release.

The product needs:

- Fast MVP delivery by a solo founder.
- Shared product behavior across iOS, Android, and Web.
- Location and map support.
- API access for nearby place discovery, seed menu data, user-submitted price observations, and recommendation logic.
- A maintainable codebase that Codex can inspect, modify, and verify reliably.
- A path to payments or subscriptions after MVP validation.

Current repository state: no application stack has been implemented yet. Existing planning context is limited to the user-provided product brief and placeholder project files under `project-context/`.

## Options Considered

| Option | Summary |
|---|---|
| Expo React Native + TypeScript | One React Native codebase targeting iOS, Android, and Web through Expo and React Native Web. |
| Flutter | One Dart/Flutter codebase targeting iOS, Android, and Web with a consistent UI layer. |
| Next.js web + separate mobile app | Best-in-class web app plus a distinct mobile app, likely React Native or native later. |
| Capacitor/Ionic | Web app packaged into native shells using Capacitor, commonly with Ionic UI components. |

## Evaluation

| Criterion | Expo React Native + TypeScript | Flutter | Next.js web + separate mobile app | Capacitor/Ionic |
|---|---|---|---|---|
| Speed of MVP delivery | High. Expo removes much native setup and TypeScript ecosystem is broad. | Medium-high. Productive framework, but Dart/Flutter-specific patterns add learning cost if not already known. | Low-medium. Fast web, but separate mobile app doubles surface area. | High for web-first MVP, medium for polished native feel. |
| iOS / Android / Web support | Strong for iOS/Android; good enough web for MVP if UI is built responsively and tested. | Strong iOS/Android; web is viable but can feel less native to browser expectations. | Excellent web; mobile depends on a second app stack. | Good web reuse; native support is wrapper-based and can be limiting for mobile UX. |
| Maps/location integration | Strong. Expo Location plus native/web map libraries are well supported. | Strong. Mature location/map plugins, but web parity needs care. | Strong on web; mobile maps/location must be solved again separately. | Good for web maps and basic device location; advanced native map behavior can become awkward. |
| Backend/API complexity | Moderate and clean. Shared TypeScript types can span client and backend. | Moderate. Backend likely separate TypeScript/Python/Go, with less type sharing. | Higher overall because web and mobile clients need shared contracts and duplicated integration work. | Moderate. Web-centric API contracts are simple, but native shell quirks add testing needs. |
| Codex maintainability | High. TypeScript, React, Expo, and file-based routing are easy to inspect and refactor incrementally. | Medium-high. Structured codebase, but Dart/Flutter patterns are less aligned with existing web/backend TypeScript tooling. | Medium. More repos/apps and duplicated concepts increase Codex context load. | Medium-high for simple web app; lower if native plugins and web/native edge cases accumulate. |
| Long-term scalability | High for MVP-to-growth if platform abstractions are kept clean. Some advanced native features may need custom modules later. | High for product UI consistency and performance. Hiring/ecosystem fit may be narrower depending on market. | High at scale for web plus dedicated mobile teams, but premature for MVP. | Medium. Scales for content/forms/tools, less ideal for native-heavy consumer apps. |
| Payment/subscription support | Good. Stripe for web checkout; RevenueCat or native IAP for app stores when needed. | Good. Stripe and RevenueCat/plugin options exist. | Excellent web payments; mobile subscriptions still require separate mobile implementation. | Good for web checkout; native IAP possible but more wrapper/plugin-dependent. |
| Solo founder developer experience | Strong. One language, fast iteration, Expo Go/dev builds, broad examples. | Good if founder likes Flutter/Dart; otherwise ecosystem switch slows iteration. | Weak for MVP unless web-only validation is enough. More app surfaces to own. | Good for web-first founders, but mobile UX tradeoffs may show quickly. |

## Decision

Use **Expo React Native + TypeScript** for the MVP.

Recommended MVP stack:

- Client: Expo, React Native, TypeScript, Expo Router.
- Web target: React Native Web through Expo, with explicit responsive layout testing.
- State/data: TanStack Query for server state; lightweight local state with React context or Zustand only when needed.
- Backend/API: TypeScript API service or backend-as-a-service initially, with clear REST/JSON contracts.
- Database: PostgreSQL with geospatial support where possible, such as PostGIS through a managed provider.
- Maps/location: Expo Location for device location; Google Maps Platform, Mapbox, or another approved provider based on pricing and regional coverage.
- Payments later: Stripe for web checkout and customer portal; RevenueCat or platform-native in-app purchase flow if mobile subscriptions become part of the roadmap.

This decision optimizes for one product codebase, fast iteration, broad package availability, and strong Codex maintainability while keeping a realistic path to iOS, Android, and Web.

## Rationale

Expo React Native + TypeScript is the best fit for a budget-based nearby food recommendation MVP because the core product experience is interaction-heavy and mobile-first but still needs a usable web surface. The app will likely depend on permissions, location, maps, preference filters, recommendation cards, feedback capture, and repeated UI iteration. Expo gives a solo founder the shortest path to shipping these flows on iOS and Android while preserving a practical web target.

TypeScript is also the strongest maintainability choice for Codex-driven development in this repository. It keeps UI, API contracts, validation schemas, tests, and build tooling in one ecosystem. This matters because the recommendation engine, data ingestion rules, and user feedback flows should evolve quickly during MVP validation.

## Tradeoffs

- Expo Web is not as naturally web-native as Next.js. The MVP should avoid SEO-heavy public pages inside the app shell; marketing pages can be added later in Next.js if needed.
- Some advanced native features may require Expo development builds or custom native modules. This is acceptable because the MVP does not require ordering, deep native integrations, or complex background behavior.
- React Native Web requires disciplined responsive design and browser testing. Shared components should not assume mobile-only dimensions.
- App store payments are more complex than web Stripe checkout. Payments are not MVP scope, so the stack should support them later without optimizing around them now.

## Non-Selected Options

### Flutter

Flutter is a credible alternative for a single shared UI across iOS, Android, and Web. It is especially strong when visual consistency and custom UI performance matter. It is not the recommended MVP choice because this product benefits more from TypeScript ecosystem leverage, easier web/backend type sharing, and broader Codex maintainability for incremental product iteration.

### Next.js Web + Separate Mobile App

This is the strongest long-term choice if web SEO, public landing pages, and a dedicated mobile team become central. It is too heavy for this MVP because it introduces at least two app surfaces before product demand is validated. The team would need to duplicate recommendation UI, authentication, analytics, location behavior, and API integration across web and mobile.

### Capacitor/Ionic

Capacitor/Ionic is attractive for a web-first MVP with simple native wrappers. It is not the best default for this product because location and map-heavy consumer mobile UX will likely need more native polish than a wrapped web app provides. It remains a fallback if the founder decides the MVP should be web-first with only lightweight mobile shells.

## Acceptance Criteria

- The stack supports iOS, Android, and Web from one primary codebase.
- The MVP can request or accept a user location and show nearby food recommendations.
- The architecture supports official APIs, controlled seed data, and user-submitted price observations.
- The stack does not require production scraping as a primary data source.
- The stack supports future authentication, analytics, feedback loops, and payment/subscription experiments.
- The implementation path can be verified with lint, typecheck, tests, web build, and mobile build checks.

## Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Expo Web has UX gaps versus a dedicated web framework. | Keep the app UI focused and responsive; consider a separate Next.js marketing site later. |
| Maps provider pricing or API limits may affect unit economics. | Abstract the maps/place provider behind a service interface and track API usage from day one. |
| Menu price data may be incomplete or stale. | Start with controlled seed data and user-submitted price observations; show confidence/last-updated metadata. |
| Native permissions differ across iOS, Android, and Web. | Centralize location permission handling and test denied, approximate, and manual-location flows. |
| Future payment rules differ by platform. | Use Stripe only for web payments; evaluate RevenueCat/native IAP before mobile subscriptions. |
| Shared code can hide platform-specific regressions. | Maintain platform matrix verification for iOS, Android, and Web in CI as the app scaffold is added. |

## Verification Plan

When app code is added, verify with:

- TypeScript typecheck.
- Lint.
- Unit tests for recommendation logic.
- Component tests for budget/preference flows.
- Web production build.
- iOS and Android build checks through Expo/EAS or CI.
- Manual smoke tests for location allowed, location denied, manual location, and no-results states.

## Recommendation

Choose **Expo React Native + TypeScript** for the MVP.

It is the best balance for a solo founder validating a mobile-first, location-aware food recommendation product across iOS, Android, and Web. The main tradeoff is that Web will need disciplined responsive testing and may not match Next.js for SEO or content-heavy pages. That tradeoff is acceptable because the MVP’s critical path is recommendation utility, not ordering, SEO, or a large web content surface.
