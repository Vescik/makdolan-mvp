# ADR-0003: MVP Recommendation Engine

Date: 2026-06-23
Status: Proposed

## Context

The MVP must recommend nearby food options that fit a user budget and optional preferences. It should be explainable, testable, and resilient to incomplete data.

## Decision

Use a deterministic scoring engine for MVP rather than an ML model.

Initial score inputs:

- Budget fit.
- Distance.
- Preference tag match.
- Price confidence.
- Freshness.
- Availability channel match.
- Restaurant open status when available.
- Basic quality signal such as rating/review count when available.

## Rationale

A deterministic engine is faster to build, easier to debug, and easier for Codex to test. It also supports transparent explanations such as "fits your budget", "nearby", "recently verified", or "matches pizza and pickup".

ML ranking should wait until the product has enough search, click, feedback, and correction data to train or evaluate meaningfully.

## Suggested Scoring Model

Use a weighted score with guardrails:

- Exclude inactive or rejected items.
- Exclude prices above budget unless showing a clearly labeled "slightly over budget" section.
- Strongly prefer items at or below budget.
- Lower scores for stale or low-confidence prices.
- Boost exact preference matches.
- Penalize distance beyond the user's practical radius.

The exact weights should be configurable and covered by unit tests.

## Explanation Requirements

Each recommendation should be able to explain its rank with short reasons:

- "Under your budget"
- "Nearby"
- "Matches chicken"
- "Recently verified"
- "Price may vary"

## Consequences

Positive:

- Fast to implement.
- Easy to test across iOS, Android, and Web.
- Works with sparse seed data.
- Transparent to users and operators.

Negative:

- Less personalized than ML.
- Weight tuning requires iteration.
- May need market-specific adjustments as data grows.

## Acceptance Criteria

- Recommendation logic can be unit tested without UI.
- Score calculation is deterministic for the same inputs.
- Low-confidence data is not ranked as if it were verified.
- No-results and low-results states are explicit.
- The engine can incorporate user feedback later without a rewrite.

