# CERT-03 Change-Scope Validation Profiles Plan

Metadata:

| Field | Value |
| --- | --- |
| id | `cert-03-change-scope-validation-profiles-plan` |
| class | `memory` |
| owner | AI Brain maintainers |
| status | `active` |
| authority | Plans implementation of CERT-03; certification backlog remains the status source. |
| domain | AI Brain validation |
| created | 2026-06-27 |
| last_reviewed | 2026-06-27 |
| review_after | 2026-07-27 |

Plan ID: `MAKDOLAN::AI-BRAIN::CERT-03::CHANGE-SCOPE-VALIDATION-PROFILES-PLAN`

Date: 2026-06-27

Status: Ready for implementation.

## Objective

Implement `CERT-03: Add Change-Scope Validation Profiles` by formalizing validation profiles that map change scope to required commands, escalation triggers, skipped-check wording, and completion evidence.

This is docs/governance hardening. It must not change application behavior, package dependencies, CI behavior, release automation, remote services, MCP servers, embeddings, vector databases, credentials, auth, payment, database, or deployment behavior.

## Source Requirement

Source: `.ai/brain/certification/CERTIFICATION_BACKLOG.md`

`CERT-03` definition of done:

- Validation profiles exist for docs-only, AI Brain governance, domain logic, UI/screens, navigation, scripts/tooling, security/privacy, release-sensitive work, and full confidence gate.
- Each profile includes commands, when to use, when to escalate, and skipped-check wording.
- `AGENTS.md` and `.ai/brain/knowledge/testing-map.md` reference the profiles.

Dependencies:

- `MGA-05`: AI Brain validation and health checks.

## Current State Evidence

- `AGENTS.md` defines validation culture and the full gate, but does not provide a formal profile catalog.
- `.ai/brain/knowledge/testing-map.md` contains a small scope-based validation table, but lacks escalation triggers and standard skipped-check wording.
- `.ai/brain/governance/developer-onboarding.md` defines workflow modes, but does not map each mode to a validation profile.
- `.ai/brain/governance/health-checks.md` defines `npm run brain:health`, but explicitly says it does not replace app validation or `bash scripts/diff-gate.sh`.
- `scripts/diff-gate.sh` is the existing full local gate and runs diff hygiene, staged diff hygiene, untracked file hygiene, typecheck, lint, tests, and web build when scripts exist.
- Fresh impact artifact: `.ai/brain/context-packs/2026-06-26T22-59-12-478Z-impact-cert-03-change-scope-validation-profiles.md`.

## Proposed Deliverables

### Required New Document

Create `.ai/brain/governance/validation-profiles.md`.

Metadata:

- `class`: `canonical`
- `domain`: `AI Brain validation`
- `authority`: Defines change-scope validation profiles, escalation rules, skipped-check wording, and evidence expectations.

The document should contain:

- Purpose and non-goals.
- Profile selection rules.
- Common evidence format.
- Required validation profiles.
- Escalation matrix.
- Standard skipped-check wording.
- Examples for common Makdolan changes.
- Maintenance rules.

### Required Updates

Update these files:

- `AGENTS.md`
  - Reference `.ai/brain/governance/validation-profiles.md`.
  - Replace broad "smallest relevant validation set" ambiguity with "choose the applicable validation profile; escalate when triggers apply."
  - Preserve `bash scripts/diff-gate.sh` as the full confidence gate.

- `.ai/brain/knowledge/testing-map.md`
  - Point to the canonical validation profiles document.
  - Keep a compact summary table.
  - Avoid duplicating the full profile definitions.

- `.ai/brain/governance/source-of-truth-map.md`
  - Add validation profiles as a canonical validation source.
  - Clarify that `scripts/diff-gate.sh` remains the executable full local gate.

- `.ai/brain/governance/developer-onboarding.md`
  - Map task-size workflow modes to validation profiles.
  - Keep the first-hour guide lightweight.

- `.ai/brain/README.md`
  - Add validation profiles to the source-of-truth boundaries or how-to-use path.

- `.ai/brain/index/README.md`
  - Add validation profiles to Start Here or Governance.

### Required Closeout Updates

After implementation and validation:

- Update `.ai/brain/certification/CERTIFICATION_BACKLOG.md` to mark `CERT-03` implemented with resolution evidence.
- Create `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`.
- Add a memory entry to `.ai/brain/memory/implementation-history.md`.
- Run `npm run brain:index`.

## Validation Profiles To Define

Each profile must include:

- Profile ID.
- Use when.
- Required commands.
- Optional commands.
- Escalate when.
- Standard skipped-check wording.
- Completion evidence required.

### Profile 1: Docs-Only

Use when:

- Only Markdown or text docs changed.
- No package scripts, source code, tests, app config, release config, generated indexes, secrets policy, validation policy, or automation behavior changed.

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

### Profile 2: AI Brain Governance

Use when:

- Changes affect `.ai/brain/governance/`, `.ai/brain/README.md`, `.ai/brain/agent-start.md`, `.ai/brain/adapters/`, memory rules, review registry, source-of-truth, lifecycle policy, retrieval contracts, or validation policy.

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

### Profile 3: Domain Logic

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

### Profile 4: UI/Screens

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

- Web responsive smoke check.
- Note whether iOS/Android simulator verification was available.

Escalate when:

- Navigation, app shell, shared UI primitives, accessibility, platform-specific code, or cross-platform layout changes.
- New user-facing flows are introduced.

Skipped-check wording:

`Skipped native simulator validation because no native ios/ or android/ project folder is present and local simulator validation was not required for this docs/app slice. Web export passed; run Expo iOS/Android smoke when simulator tooling is available if the changed UI is platform-sensitive.`

### Profile 5: Navigation/Routes

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

- Route smoke check on web.
- Note iOS/Android route smoke availability.

Escalate when:

- Initial route, deep links, protected routes, tabs/stacks, or cross-platform navigation behavior changes.
- Route changes affect release or onboarding paths.

Skipped-check wording:

`Skipped native route smoke because local native project/simulator validation is unavailable. Web route smoke and build passed; native route smoke remains required before release if platform-sensitive navigation changed.`

### Profile 6: Scripts/Tooling

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

### Profile 7: Security/Privacy

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

### Profile 8: Release-Sensitive

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

### Profile 9: Full Confidence Gate

Use when:

- Change is meaningful, cross-cutting, shared, high-risk, or uncertain.
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

## Implementation Phases

### Phase 0: Discovery And Impact

Tasks:

- Read `CERT-03` in `.ai/brain/certification/CERTIFICATION_BACKLOG.md`.
- Read `AGENTS.md`, `.ai/brain/knowledge/testing-map.md`, `.ai/brain/governance/developer-onboarding.md`, `.ai/brain/governance/health-checks.md`, `.ai/brain/governance/source-of-truth-map.md`, and `scripts/diff-gate.sh`.
- Generate impact analysis:

```bash
npm run brain:impact -- "CERT-03 change-scope validation profiles"
```

Done when:

- Affected files and constraints are confirmed.
- No code behavior changes are planned.

### Phase 1: Canonical Validation Profiles

Tasks:

- Add `.ai/brain/governance/validation-profiles.md`.
- Include all nine required profiles.
- Include standard evidence and skipped-check wording.
- Keep commands aligned to existing `package.json` scripts and `scripts/diff-gate.sh`.

Done when:

- The document is complete enough for an agent or developer to choose a profile without guessing.
- No new command or automation is introduced.

### Phase 2: Entrypoint References

Tasks:

- Update `AGENTS.md` to reference validation profiles.
- Update `.ai/brain/knowledge/testing-map.md` to summarize and link the canonical profile document.
- Update `.ai/brain/governance/developer-onboarding.md` to map workflow modes to validation profiles.
- Update `.ai/brain/governance/source-of-truth-map.md`, `.ai/brain/README.md`, and `.ai/brain/index/README.md` so validation profiles are discoverable.

Done when:

- `AGENTS.md` and testing map satisfy the explicit `CERT-03` definition of done.
- Other entrypoints point to the canonical profile document instead of duplicating it.

### Phase 3: Certification Closeout

Tasks:

- Update `.ai/brain/certification/CERTIFICATION_BACKLOG.md` only after validation passes.
- Add `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md`.
- Add memory entry in `.ai/brain/memory/implementation-history.md`.
- Regenerate index:

```bash
npm run brain:index
```

Done when:

- `CERT-03` is marked implemented with evidence.
- The closeout report records changed files, validation evidence, remaining risks, and next recommended certification condition.

## Test And Validation Plan

Run after Phase 1 and Phase 2 edits:

```bash
npm run brain:health
git diff --check
```

Run after closeout edits and index regeneration:

```bash
npm run brain:index
npm run brain:search -- "validation profiles" --limit=5
npm run brain:health
git diff --check
bash scripts/diff-gate.sh
```

Expected evidence:

- Search returns the validation profiles document or its entrypoint references.
- Health passes with 0 errors and 0 warnings.
- Diff gate passes typecheck, lint, tests, web build, and diff hygiene.

## Platform Matrix

| Platform | Expected Impact | Validation |
| --- | --- | --- |
| iOS | No app behavior change. Validation profiles clarify when iOS simulator/native validation is required or skipped. | No native run required for implementation; document skipped-check wording. |
| Android | No app behavior change. Validation profiles clarify when Android simulator/native validation is required or skipped. | No native run required for implementation; document skipped-check wording. |
| Web | No app behavior change. Full gate still validates web export when used. | `bash scripts/diff-gate.sh` includes `npm run build:web`. |

## Security And Privacy Notes

- Do not read or copy `.env.local`, credentials, tokens, authorization headers, payment data, or private user data.
- Security/privacy profile must explicitly prohibit secret value inspection.
- Release-sensitive profile must require explicit approval before release, deployment, credential, migration, or destructive work.
- No automation should be enabled.
- No networked service should be added.

## Risks And Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Profiles become too verbose and developers ignore them. | Medium | Keep `testing-map.md` as the compact summary and make `validation-profiles.md` the detailed reference. |
| Profiles weaken validation by normalizing skipped checks. | High | Require escalation triggers and standard skipped-check wording with explicit evidence. |
| Profiles duplicate commands across too many docs. | Medium | Make `validation-profiles.md` canonical and update other docs to link/summarize only. |
| Docs-only plan accidentally changes validation behavior. | Medium | Do not modify package scripts, diff gate, CI, or helper scripts in CERT-03 unless explicitly approved. |
| Native platform confidence is overstated. | High | Keep iOS/Android skipped-check wording explicit because no native project folders are currently present. |

## Rollback Strategy

This implementation is documentation-only.

Rollback steps:

1. Revert `.ai/brain/governance/validation-profiles.md`.
2. Revert references in `AGENTS.md`, testing map, onboarding, README, index README, and source-of-truth map.
3. Revert CERT-03 closeout report, certification backlog status, memory entry, and regenerated index if closeout had been completed.
4. Re-run `git diff --check` and `npm run brain:health`.

## Definition Of Done

CERT-03 is done only when:

- `.ai/brain/governance/validation-profiles.md` exists and defines the nine required profiles.
- Every profile includes commands, when to use, when to escalate, skipped-check wording, and evidence expectations.
- `AGENTS.md` references the validation profiles.
- `.ai/brain/knowledge/testing-map.md` references the validation profiles.
- AI Brain entrypoints make the profile document discoverable.
- `.ai/brain/certification/CERTIFICATION_BACKLOG.md` marks `CERT-03` implemented only after validation passes.
- `.ai/brain/planning/CERT_03_CHANGE_SCOPE_VALIDATION_PROFILES_REPORT.md` records completion evidence.
- `.ai/brain/memory/implementation-history.md` records durable memory.
- `npm run brain:index`, `npm run brain:search -- "validation profiles" --limit=5`, `npm run brain:health`, `git diff --check`, and `bash scripts/diff-gate.sh` pass.
- No app behavior, dependencies, automation, release, deployment, credential, database, auth, payment, MCP, embeddings, vector database, or remote service behavior changes are introduced.
