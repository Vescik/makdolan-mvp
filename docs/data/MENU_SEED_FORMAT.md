# Menu Seed Format

## Purpose

The menu seed format defines the controlled data used to launch and test the MVP before partnerships or restaurant self-service exist. It should be small, reviewable, versioned, and easy to load into the application database.

## Format

Use UTF-8 CSV or JSON for the initial seed. CSV is easier for manual editing; JSON is easier for nested fields. The source of truth should be one format per import batch.

Recommended MVP format: CSV for manual curation, converted to normalized database rows during import.

## Required Fields

| Field | Type | Required | Description |
|---|---:|---:|---|
| `seed_id` | string | yes | Stable internal ID for the seed item. |
| `restaurant_match_name` | string | yes | Chain or local restaurant name used for matching. |
| `restaurant_scope` | string | yes | `chain`, `local_test_city`, or `regional`. |
| `country_code` | string | yes | ISO country code for price/currency context. |
| `city` | string | no | Required for local test city rows. |
| `item_name` | string | yes | User-facing food item name. |
| `category` | string | yes | Main category such as burger, chicken, pizza, kebab, sandwich, salad. |
| `tags` | string array | yes | Preference tags used by recommendation filters. |
| `portion_size` | string | yes | `snack`, `small_meal`, `regular_meal`, or `filling_meal`. |
| `availability_channels` | string array | yes | `pickup`, `delivery`, `dine_in`, or `unknown`. |
| `price_amount` | decimal | yes | Numeric price amount. |
| `currency` | string | yes | ISO currency code. |
| `tax_included` | boolean | yes | Whether displayed price includes tax/VAT. |
| `source_type` | string | yes | `manual_seed`, `user_observation`, `partner`, `official_api`. |
| `source_note` | string | yes | Human-readable source note without secrets or private data. |
| `last_verified_at` | date | yes | Date the price was last checked. |
| `confidence_score` | integer | yes | 0 to 100. |
| `active` | boolean | yes | Whether the item can appear in recommendations. |

## Optional Fields

| Field | Type | Description |
|---|---:|---|
| `google_place_id` | string | Optional direct mapping to a specific restaurant location. |
| `brand_key` | string | Normalized chain key such as `mcdonalds` or `kfc`. |
| `calorie_band` | string | Optional rough nutrition band, not exact nutrition data. |
| `dietary_flags` | string array | Vegetarian, vegan, halal, spicy, healthy, etc. |
| `image_url` | string | Optional licensed or first-party image URL. |
| `review_required` | boolean | Whether the row needs manual review before launch. |

## Example CSV

```csv
seed_id,restaurant_match_name,restaurant_scope,country_code,city,item_name,category,tags,portion_size,availability_channels,price_amount,currency,tax_included,source_type,source_note,last_verified_at,confidence_score,active
seed_mcd_001,McDonald's,chain,PL,,Cheeseburger,burger,"burger;small_meal",small_meal,"pickup;dine_in",7.90,PLN,true,manual_seed,"Manual seed for MVP validation",2026-06-23,70,true
seed_kebab_001,Local Kebab Test,local_test_city,PL,Warsaw,Small kebab,kebab,"kebab;filling_meal",filling_meal,"pickup;dine_in",18.00,PLN,true,manual_seed,"Local test city observation",2026-06-23,65,true
```

## Example JSON

```json
{
  "seed_id": "seed_subway_001",
  "restaurant_match_name": "Subway",
  "restaurant_scope": "chain",
  "country_code": "PL",
  "city": null,
  "item_name": "6-inch sub",
  "category": "sandwich",
  "tags": ["sandwich", "small_meal", "healthy"],
  "portion_size": "small_meal",
  "availability_channels": ["pickup", "dine_in"],
  "price_amount": 16.99,
  "currency": "PLN",
  "tax_included": true,
  "source_type": "manual_seed",
  "source_note": "Manual seed for MVP validation",
  "last_verified_at": "2026-06-23",
  "confidence_score": 70,
  "active": true
}
```

## Validation Rules

- `price_amount` must be greater than `0`.
- `currency` must match the user's market or the restaurant location.
- `confidence_score` must be between `0` and `100`.
- `last_verified_at` cannot be in the future.
- `tags` must use the controlled preference vocabulary.
- `active=false` rows may be imported but must not be recommended.
- Rows from research or unreviewed sources must not exceed medium confidence.

## Controlled Preference Vocabulary

Initial tags:

- `burger`
- `chicken`
- `pizza`
- `kebab`
- `sandwich`
- `small_meal`
- `filling_meal`
- `vegetarian`
- `healthy`
- `pickup`
- `delivery`
- `dine_in`
- `budget`

Add new tags only when they improve recommendation behavior or user filtering.

