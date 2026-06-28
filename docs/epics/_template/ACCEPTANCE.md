# Epic Acceptance

## Definition Of Done

The epic is done only when every applicable item below is complete and supported by evidence.

- [ ] All approved scope in `EPIC.md` is complete.
- [ ] All phases in `PHASES.md` are complete.
- [ ] Every phase has a local certificate with `PASS`.
- [ ] Required GitHub PR checks passed.
- [ ] Required remote Codex review passed.
- [ ] Required human review passed, if applicable.
- [ ] Documentation is updated.
- [ ] Release notes are ready.
- [ ] Rollback notes are ready.
- [ ] Final release certificate has `PASS`.

## Required CI Checks

| Check | Required? | Evidence |
| --- | --- | --- |
| `npm run typecheck` | yes | `<evidence>` |
| `npm run lint` | yes | `<evidence>` |
| `npm run test` | yes | `<evidence>` |
| `npm run build:web` | yes for web/app changes | `<evidence>` |
| GitHub Actions required checks | yes | `<evidence>` |
| Remote Codex review | when configured | `<evidence>` |

## Required Security Checks

| Check | Required? | Evidence |
| --- | --- | --- |
| Security preflight reviewed | yes | `<evidence>` |
| No secrets committed | yes | `<evidence>` |
| Generated text secret scan | when AI Brain/docs/generated artifacts changed | `<evidence>` |
| Auth/payment/database/release risk reviewed | when applicable | `<evidence>` |
| Rollback/recovery reviewed | yes | `<evidence>` |

## Required Documentation

| Document | Required? | Status | Notes |
| --- | --- | --- | --- |
| `EPIC.md` | yes | `draft` | `<notes>` |
| `PHASES.md` | yes | `draft` | `<notes>` |
| `ACCEPTANCE.md` | yes | `draft` | `<notes>` |
| `RELEASE_NOTES.md` | yes | `draft` | `<notes>` |
| `ROLLBACK.md` | yes | `draft` | `<notes>` |
| `RISK_REGISTER.md` | yes | `draft` | `<notes>` |
| AI Brain memory update | when meaningful durable context changed | `not-started` | `<notes>` |

## Required Release Notes

- [ ] User-facing changes are documented.
- [ ] Developer-facing changes are documented.
- [ ] Breaking changes are documented or explicitly marked none.
- [ ] Migration notes are documented or explicitly marked none.
- [ ] Known limitations are documented.

## Required Rollback Notes

- [ ] Rollback strategy is documented.
- [ ] Database rollback notes are documented or explicitly marked not applicable.
- [ ] Feature flag rollback notes are documented or explicitly marked not applicable.
- [ ] Deployment rollback notes are documented or explicitly marked not applicable.
- [ ] Manual recovery notes are documented.

## Final Acceptance Decision

| Field | Value |
| --- | --- |
| Final verdict | `not-certified` |
| Final release certificate | `certificates/final-release-certificate.json` |
| Decision date | `<date>` |
| Decision owner | `<owner-or-role>` |
