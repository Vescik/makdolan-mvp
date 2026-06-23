# Price Verification Process

## Purpose

The MVP must be honest about price uncertainty. Price verification exists to keep recommendations useful without pretending the app has real-time menu accuracy.

## Verification States

| State | Meaning | Recommendation Behavior |
|---|---|---|
| `verified` | Recent trusted source or manual review. | Rank normally. |
| `observed` | User submitted or imported from a lower-confidence source. | Rank with caution and monitor feedback. |
| `stale` | Last verification is outside freshness window. | Lower confidence and ask for confirmation. |
| `conflicting` | Recent observations disagree materially. | Deprioritize and queue for review. |
| `rejected` | Known bad, abusive, or unsupported data. | Do not recommend. |

## Freshness Windows

| Source | Freshness Window | Notes |
|---|---:|---|
| Manual seed for popular chains | 30 days | Review faster if users report mismatches. |
| Manual seed for local test city | 14 to 30 days | Shorter window for volatile local businesses. |
| User observation | 14 days for high confidence contribution | Older observations remain history but decay. |
| Restaurant self-service | 30 days | Later phase; shorter if restaurant edits often. |
| Official API / partner | Per provider update contract | Later phase. |

## User Observation Flow

Users can submit:

- Correct price confirmation.
- New observed price.
- Item unavailable.
- Restaurant closed or wrong location.
- Preference mismatch.

MVP submissions should capture:

- Menu item ID or suggested item name.
- Observed price and currency.
- Restaurant/place ID.
- Optional note.
- Timestamp.
- Coarse location context.
- Abuse-prevention metadata, kept minimal.

Do not require receipt/photo upload for MVP. A photo workflow can be added later if moderation quality requires it.

## Confidence Updates

Start with this simple scoring approach:

| Event | Suggested Effect |
|---|---|
| Manual review confirms price | Set 80 to 95 based on source quality. |
| Recent trusted seed row | Start 60 to 75. |
| One user submits matching price | Add small confidence increase. |
| Multiple users submit same price | Add larger confidence increase. |
| User submits materially different price | Lower confidence and mark for review. |
| Item reported unavailable | Lower confidence; queue if repeated. |
| Price exceeds freshness window | Decay confidence over time. |
| Suspicious user behavior | Ignore or quarantine observation. |

Material difference threshold for MVP:

- Absolute difference greater than a small local threshold, such as `2 PLN`.
- Or relative difference greater than `15%`.

Tune thresholds by market and currency.

## Review Queue

Prioritize manual review when:

- A recommended item receives repeated "price wrong" feedback.
- An item has high search/impression volume and medium or low confidence.
- User observations conflict.
- A restaurant appears frequently but has no verified budget items.
- Data is close to the user's entered budget and could change the recommendation outcome.

## Anti-Abuse Controls

- Rate-limit observations by user/device/IP where legally appropriate.
- Track submitter reputation without exposing it publicly.
- Quarantine extreme price changes.
- Require moderation before user-submitted new items become broadly visible.
- Keep audit history for every price change.

## User-Facing Transparency

Recommendations should avoid absolute guarantees.

Use copy patterns such as:

- "Recently verified"
- "Price may vary"
- "Based on user observation"
- "Last checked 3 weeks ago"

Do not say a user can definitely buy an item at a price unless the source contract supports that claim.

## Acceptance Criteria

- Every price has a verification state and confidence score.
- Stale prices are automatically downgraded.
- User feedback can improve data quality without bypassing moderation.
- The system can explain why a price is trusted, stale, or hidden.
- Incorrect data can be reverted or rejected.

