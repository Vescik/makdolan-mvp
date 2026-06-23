# Test Strategy

## Test pyramid

- Unit tests for pure logic.
- Component/widget tests for UI behavior.
- Integration tests for API/persistence flows.
- E2E/smoke tests for critical paths.
- CI build checks for iOS, Android, Web.

## Critical paths

1. App launches.
2. User can authenticate or enter main flow.
3. Core user action succeeds.
4. Error and offline states are understandable.
