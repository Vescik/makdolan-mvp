---
name: recommendation-engine
description: Use for designing or implementing the app's budget-based food recommendation logic, scoring model, domain model, ranking, explanations, stale price handling, and feedback loop.
---

# Recommendation Engine Skill

Use this skill when the task involves recommending food options based on budget, location, restaurant availability, user preferences, and menu data.

## Workflow

1. Discover existing domain model, database schema, mock data, and recommendation code.
2. Define the user input:
   - budget
   - location
   - distance limit
   - meal size
   - cuisine/type preferences
   - dietary preferences
   - pickup/delivery/dine-in mode
3. Define candidate data:
   - restaurant
   - outlet/location
   - menu item
   - price observation
   - availability
   - confidence score
4. Design scoring before coding.
5. Explain every recommendation in user-friendly language.
6. Account for stale or uncertain prices.
7. Add tests for ranking edge cases.

## Suggested scoring model

score =
  budgetFit * 35
+ preferenceMatch * 25
+ distanceScore * 15
+ ratingScore * 10
+ portionScore * 10
+ freshnessScore * 5

## Required docs

- docs/data/DATABASE_MODEL.md
- docs/data/SCORING_MODEL.md
- docs/architecture/ADR-0003-recommendation-engine.md

## Rules

- Do not use AI as the primary ranking engine for MVP.
- Use deterministic scoring first.
- AI can be used later to explain results or personalize copy.
- Always track price source, lastVerifiedAt, and confidence.
- Never present uncertain prices as guaranteed.
