# Verification Matrix

Use this matrix after every change.

| Scope | Required checks |
|---|---|
| Pure docs | markdown lint if available, links if available |
| Shared logic | unit tests, typecheck/analyze, relevant integration tests |
| UI | component/widget tests, accessibility review, responsive web smoke check |
| Auth/security | unit tests, negative-path tests, log/secret review |
| API/persistence | contract tests, migration checks, rollback note |
| iOS | build/test on macOS CI or local macOS |
| Android | Gradle/Flutter/Expo Android build where available |
| Web | production web build and smoke route check |
