---
name: food-data-strategy
description: Use for planning restaurant/menu data acquisition, seed data, Google Places usage, user-submitted prices, partnerships, scraping policy, data freshness, and compliance risks.
---

# Food Data Strategy Skill

Use this skill when the task involves acquiring, storing, verifying, or updating restaurant and menu data.

## Data source priority

1. Controlled seed data for MVP.
2. Google Places or maps APIs for restaurant discovery.
3. User-submitted price observations.
4. Restaurant self-service panel.
5. Official APIs and partnerships.
6. Scraping only as a risky research option requiring legal review.

## Required data

- restaurant brand
- outlet/place id
- address/location
- menu item name
- estimated price
- tags
- portion size
- source
- last verified date
- confidence

## Required docs

- docs/data/DATA_STRATEGY.md
- docs/data/MENU_SEED_FORMAT.md
- docs/data/PRICE_VERIFICATION_PROCESS.md
- docs/data/SCRAPING_POLICY.md

## Rules

- Do not make production scraping the primary data source.
- Do not store data without source and freshness metadata.
- Mark prices as estimated unless verified.
- Prefer a small reliable dataset over a large unreliable one for MVP.
