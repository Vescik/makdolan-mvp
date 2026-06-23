# Scraping Policy

## Policy

Production scraping is not an approved primary data source for the MVP.

The MVP must prioritize:

1. Controlled seed data.
2. Google Places for nearby restaurant discovery.
3. User-submitted price observations.
4. Restaurant self-service data in later phases.
5. Official APIs or partnerships.

Scraping may only be considered as a risky research option after legal, compliance, and provider-terms review. It must not be used to populate production recommendations without explicit approval.

## Why Scraping Is Restricted

Restaurant and menu data can be protected by:

- Website terms of service.
- Copyright or database rights depending on jurisdiction.
- Anti-bot controls and access restrictions.
- Contractual restrictions from delivery marketplaces or menu platforms.
- Brand and trademark constraints.

Even when data is publicly visible, automated collection can create legal, operational, and reputational risk.

## Prohibited MVP Uses

Do not use scraping to:

- Populate the primary production menu dataset.
- Bypass official APIs, robots policies, authentication, or rate limits.
- Extract data from delivery platforms, marketplaces, or restaurant sites that prohibit automated access.
- Collect personal data, account data, order history, loyalty data, or private user content.
- Copy images, descriptions, or proprietary menu content into the app without rights.

## Allowed Research Uses

Scraping can be proposed only for limited research when all of these are true:

- A written research goal exists.
- Legal review approves the target and method.
- The target terms permit the activity or legal counsel accepts the risk.
- No authentication, paywall, bot mitigation bypass, or private data access is involved.
- Rate limits are conservative.
- Data is stored separately from production data.
- Research output is used for aggregate analysis, not direct production recommendations.

## Approval Checklist

Before any scraping research:

- [ ] Target site or source is documented.
- [ ] Terms of service reviewed.
- [ ] Robots and access restrictions reviewed.
- [ ] Jurisdiction and data rights reviewed.
- [ ] Data fields listed.
- [ ] Rate limits defined.
- [ ] Storage and retention defined.
- [ ] Legal/compliance owner approves.
- [ ] Product owner approves.
- [ ] Engineering owner approves.

## Safer Alternatives

- Manual controlled seed data.
- Restaurant self-service submissions.
- Official APIs.
- Partnerships with menu or POS providers.
- User-submitted observations.
- Public open-data sources where license terms explicitly permit use.

## Acceptance Criteria

- Scraping is not required for MVP launch.
- Any scraping research remains isolated from production recommendation data.
- No scraped data is shown to users unless legal approval and source rights are documented.
- Engineering work involving scraping requires an explicit approval record before implementation.

