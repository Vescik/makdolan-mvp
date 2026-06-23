# Tech Stack

Codex must detect the real stack from repository files before editing.

## Candidate stacks

- Flutter: best when one codebase and consistent UI across iOS/Android/Web matter.
- Expo / React Native + Web: best when the team is already strong in TypeScript/React.
- Web-first + Capacitor: best when the app is primarily a web app wrapped for mobile.

## Chosen stack

Status: proposed

Decision link: `docs/architecture/ADR-0001-cross-platform-stack.md`

Recommendation: Expo React Native + TypeScript for iOS, Android, and Web MVP delivery.
