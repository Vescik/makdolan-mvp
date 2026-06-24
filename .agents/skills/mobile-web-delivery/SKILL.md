---
name: mobile-web-delivery
description: Use for planning and implementing cross-platform iOS, Android, and Web delivery. Compares Expo React Native, Flutter, Capacitor/Ionic, and web-first architectures. Produces architecture decisions, tradeoffs, release strategy, and implementation plans.
---

# Mobile/Web Delivery Skill

Use this skill when the task involves delivering one product across iOS, Android, and Web.

## Workflow

1. Discover existing project structure, framework, package manager, and platform targets.
2. Identify whether the project already has mobile/web architecture decisions.
3. Compare viable approaches only when the stack is not already decided:
   - Expo React Native + TypeScript
   - Flutter
   - Capacitor/Ionic
   - Web-first Next.js plus separate mobile shell
4. Recommend one stack with clear tradeoffs.
5. Produce or update architecture docs before implementing code.
6. Verify that the selected stack supports:
   - iOS
   - Android
   - Web
   - location permissions
   - maps/deep links
   - authentication
   - subscriptions/payments
   - CI/CD
7. For implementation tasks, make minimal changes and verify locally.

## Required outputs for planning tasks

- docs/architecture/ADR-0001-cross-platform-stack.md
- docs/architecture/ARCHITECTURE.md
- docs/roadmap/ROADMAP.md

## Rules

- Do not implement app code before the architecture decision is documented.
- Prefer Expo React Native + TypeScript for fast MVP delivery unless the repo already uses another stack.
- Keep web support realistic; do not assume all native APIs work on web without fallbacks.
- Always include verification commands.
