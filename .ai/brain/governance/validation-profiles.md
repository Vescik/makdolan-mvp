# AI Brain Validation Profiles

Metadata:

| Field | Value |
| --- | --- |
| id | `ai-brain-validation-profiles` |
| class | `canonical` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Defines change-scope validation profiles, escalation rules, skipped-check wording, and evidence expectations. |
| domain | AI Brain validation |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Use this document to choose validation for Makdolan work. It formalizes the difference between narrow checks, AI Brain governance checks, and the full local confidence gate.

This document does not add new commands, CI behavior, automation, release behavior, remote services, dependencies, MCP servers, embeddings, or vector databases. It maps existing local commands to change scope.

## Selection Rules

1. Start with the narrowest profile that fully covers the changed files and risk.
2. Escalate when the profile's escalation triggers apply.
3. When multiple profiles apply, use the stricter profile.
4. Use the full confidence gate for certification, hardening, release-sensitive, security-sensitive, broad, or uncertain work.
5. Record command, result, key output, skipped checks, and follow-up in the final response or planning/report artifact.

Do not use skipped-check wording to avoid relevant validation. Skips are allowed only when the profile explains why the check is not applicable or cannot run locally.

## Evidence Format

Validation evidence should include:

| Field | Required | Meaning |
| --- | --- | --- |
| Command | Yes | Exact command that ran, or exact check performed. |
| Result | Yes | `PASS`, `FAIL`, `SKIPPED`, or `EXPECTED FAIL`. |
| Key output | Yes | Important result lines, counts, generated file path, or failure reason. |
| Scope reason | Yes | Why this profile was sufficient or why it escalated. |
| Follow-up | When relevant | What remains for CI, native devices, release, or human review. |

## Profiles

### Profile: Docs-Only

Use when:

- Only Markdown or plain text docs changed.
- No source code, tests, package scripts, app config, build config, route files, release config, generated indexes, secrets policy, validation policy, or automation behavior changed.

Required commands:

```bash
git diff --check
```

Additional checks when relevant:

```bash
npm run brain:health
npm run brain:search -- "relevant query" --limit=5
```

Escalate when:

- Docs change canonical governance, validation policy, security policy, release policy, product scope, architecture, or AI Brain source-of-truth.
- Docs include generated artifacts that need freshness or secret scanning.
- The change affects developer workflow, commands, or completion criteria.

Skipped-check wording:

`Skipped app validation because this is a docs-only change: no source code, tests, package scripts, app config, routes, build config, or runtime behavior changed. Validated with git diff --check and targeted file inspection.`

Completion evidence:

- Changed docs listed.
- `git diff --check` result.
- Explanation for skipped app validation.

### Profile: AI Brain Governance

Use when:

- Changes affect `.ai/brain/governance/`, `.ai/brain/README.md`, `.ai/brain/agent-start.md`, `.ai/brain/adapters/`, memory rules, review registry, source-of-truth, lifecycle policy, retrieval contracts, validation policy, planning reports, or certification reports.

Required commands:

```bash
npm run brain:health
npm run brain:index
git diff --check
```

Required for meaningful governance changes:

```bash
bash scripts/diff-gate.sh
```

Escalate when:

- The change modifies helper scripts or generated output shape.
- The change affects security, automation, release, memory integrity, review registry, or source-of-truth rules.
- New generated artifacts are added.

Skipped-check wording:

`Skipped app-specific validation only if no app source, tests, routes, package scripts, app config, or build config changed. AI Brain governance was validated with npm run brain:health, npm run brain:index, git diff --check, and any required full gate.`

Completion evidence:

- AI Brain docs or generated artifacts changed.
- `npm run brain:health` result.
- `npm run brain:index` result when indexes or discoverability changed.
- Full gate result for meaningful governance changes.

### Profile: Domain Logic

Use when:

- Changes affect deterministic recommendation logic, budget validation, scoring, filters, data normalization, domain types, or controlled seed assumptions.

Required commands:

```bash
npm run typecheck
npm test
git diff --check
```

Recommended when domain changes are user-facing or shared:

```bash
npm run lint
npm run build:web
bash scripts/diff-gate.sh
```

Escalate when:

- Shared scoring behavior changes.
- Product decisions, seed data shape, or test fixtures change.
- Cross-platform UI consumes new domain states.
- The change touches pricing, privacy, location, auth, payment, or external data.

Skipped-check wording:

`Skipped UI/manual smoke because this change is limited to domain logic and was covered by targeted tests plus typecheck. Run web/mobile smoke if screens or navigation consume new states.`

Completion evidence:

- Relevant domain files and tests.
- Test count or targeted test output.
- Typecheck result.
- Escalation decision.

### Profile: UI/Screens

Use when:

- Changes affect screens, shared UI components, visual states, accessibility labels, copy visible in app UI, layout, responsive behavior, or platform-specific UI branches.

Required commands:

```bash
npm run typecheck
npm run lint
npm test
npm run build:web
git diff --check
```

Recommended when a dev server is used:

```bash
npm run web
```

Manual evidence:

- Web responsive smoke check when UI layout changed.
- Note whether iOS/Android simulator verification was available.

Escalate when:

- Navigation, app shell, shared UI primitives, accessibility, platform-specific code, or cross-platform layout changes.
- New user-facing flows are introduced.

Skipped-check wording:

`Skipped native simulator validation because no native ios/ or android/ project folder is present and local simulator validation was not required for this docs/app slice. Web export passed; run Expo iOS/Android smoke when simulator tooling is available if the changed UI is platform-sensitive.`

Completion evidence:

- Commands run.
- Web build or smoke evidence.
- Native validation status or skip reason.

### Profile: Navigation/Routes

Use when:

- Changes affect Expo Router files, route names, linking, navigation state, redirects, screen composition, or entrypoints.

Required commands:

```bash
npm run typecheck
npm run lint
npm run build:web
git diff --check
```

Recommended:

```bash
npm test
bash scripts/diff-gate.sh
```

Manual evidence:

- Route smoke check on web when routes changed.
- Note iOS/Android route smoke availability.

Escalate when:

- Initial route, deep links, protected routes, tabs/stacks, or cross-platform navigation behavior changes.
- Route changes affect release or onboarding paths.

Skipped-check wording:

`Skipped native route smoke because local native project/simulator validation is unavailable. Web route smoke and build passed; native route smoke remains required before release if platform-sensitive navigation changed.`

Completion evidence:

- Route files changed.
- Build result.
- Route smoke or skip reason.

### Profile: Scripts/Tooling

Use when:

- Changes affect local scripts, package scripts, validation helpers, AI Brain generators, index/search/impact/context helpers, build tooling, lint config, TypeScript config, or test config.

Required commands:

```bash
node --check path/to/changed-script.mjs
git diff --check
```

Required when package scripts or broad validation helpers change:

```bash
bash scripts/diff-gate.sh
```

Required smoke checks:

- Run the changed script in a representative report-only or safe mode.
- For AI Brain helpers, run the relevant `npm run brain:*` command.

Escalate when:

- The script can modify files, delete files, call network, read secrets, change validation gates, or generate artifacts used by agents.
- Package scripts changed before running broad validation.

Skipped-check wording:

`Skipped app runtime smoke because the change is limited to local tooling. Script syntax and representative safe-mode execution passed; full gate was run when validation or package-script behavior changed.`

Completion evidence:

- Syntax result for changed scripts.
- Safe-mode or representative command output.
- Full gate result when validation behavior or package scripts changed.

### Profile: Security/Privacy

Use when:

- Changes touch secrets, permissions, auth, payment, private user data, location, logging, generated artifact secret scanning, automation permissions, shell execution, dependency trust, or data retention.

Required commands:

```bash
npm run brain:health
git diff --check
```

Required review:

- Security preflight evidence.
- Negative-path review.
- Secret/logging review.
- Recovery or rollback note.

Required when app or scripts changed:

```bash
bash scripts/diff-gate.sh
```

Escalate when:

- Any credential, deployment, release, database, auth, payment, destructive operation, or production data is involved.
- `.env.local` or secrets would need to be inspected.

Skipped-check wording:

`Skipped secret value inspection by design. Validation checked references and secret-handling behavior without reading or copying .env.local, credentials, tokens, auth headers, payment data, or private user data.`

Completion evidence:

- Security preflight result.
- Secret/logging review summary without secret values.
- Recovery or rollback note.
- Relevant validation commands.

### Profile: Release-Sensitive

Use when:

- Changes affect deployment, release configuration, app identifiers, store metadata, environment variables, production builds, CI release gates, EAS/native build paths, migration paths, or rollback procedures.

Required commands:

```bash
bash scripts/diff-gate.sh
git diff --check
```

Required evidence:

- Explicit approval for release, credential, deployment, migration, or destructive actions.
- Release/readiness checklist.
- Rollback plan.
- Environment/credential handling note without exposing values.

Escalate when:

- Native production builds are required but local native project folders or EAS config are absent.
- Store, production, credential, or database state would change.

Skipped-check wording:

`Skipped production release execution because this validation is local-only and no explicit release approval was granted. Release-sensitive changes require approved release validation before deployment or store submission.`

Completion evidence:

- Approval evidence when required.
- Diff gate result.
- Release-readiness or rollback note.
- Explicit non-deployment statement when release execution is skipped.

### Profile: Full Confidence Gate

Use when:

- The change is meaningful, cross-cutting, shared, high-risk, or uncertain.
- The applicable narrower profile escalates.
- Completing a certification, hardening, release, architecture, security, or validation-policy task.

Required command:

```bash
bash scripts/diff-gate.sh
```

Optional additions:

```bash
npm run brain:health
npm run brain:search -- "relevant query" --limit=5
npm run brain:impact -- "change description"
```

Escalate when:

- Full gate fails.
- Native release confidence is needed.
- External credentials, deployment, or production state are involved.

Skipped-check wording:

`Full local gate passed. Native production validation remains out of scope locally because this repository currently has no checked-in ios/ or android/ native project folders; use the approved future Expo/EAS or native CI path before production release.`

Completion evidence:

- `bash scripts/diff-gate.sh` result.
- Test count, build result, and skipped checks from the gate output.
- Any additional AI Brain or release evidence required by the task.

## Escalation Matrix

| Trigger | Escalate To |
| --- | --- |
| Any source code, app config, package script, route, test, or build config changed from a docs-only task | Matching app/tooling profile |
| Canonical AI Brain governance, validation, source-of-truth, security, or lifecycle changed | AI Brain Governance plus Full Confidence Gate |
| Shared domain behavior changed | Domain Logic, usually Full Confidence Gate |
| UI or route behavior changed | UI/Screens or Navigation/Routes |
| Script can write files, run package commands, or influence generated agent context | Scripts/Tooling plus Full Confidence Gate |
| Secrets, auth, payment, private data, permissions, shell execution, or automation affected | Security/Privacy |
| Deployment, release, credentials, migrations, production data, or destructive actions involved | Release-Sensitive plus explicit approval |
| Validation uncertainty remains | Full Confidence Gate |

## Examples

| Change | Profile |
| --- | --- |
| Fix typo in a product doc | Docs-Only |
| Update `.ai/brain/governance/source-of-truth-map.md` | AI Brain Governance plus Full Confidence Gate |
| Change recommendation scoring | Domain Logic plus Full Confidence Gate if shared behavior changes |
| Adjust a screen layout | UI/Screens |
| Add an Expo route | Navigation/Routes |
| Modify `.ai/brain/scripts/analyze-impact.mjs` | Scripts/Tooling |
| Update secret scanning guidance | Security/Privacy plus AI Brain Governance |
| Change release configuration | Release-Sensitive |

## Maintenance Rules

- Update this document when a new recurring validation scope appears.
- Keep commands aligned with `package.json`, `scripts/diff-gate.sh`, and `.ai/brain/knowledge/testing-map.md`.
- Do not add command references that do not exist unless the document labels them as future work.
- Keep `testing-map.md` as the compact quick-reference and this file as the detailed contract.
