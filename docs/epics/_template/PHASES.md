# Epic Phases

Use this file to track phase planning, local certification status, and GitHub PR status.

## Phase Index

| Phase number | Phase name | Goal | Expected files/components | Acceptance criteria | Required tests | Local certificate status | GitHub PR status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `phase-01` | `<short-slug>` | `<goal>` | `<files-or-components>` | `<acceptance-summary>` | `<commands-or-checks>` | `not-started` | `not-opened` |

## Phase Template

### phase-01-<short-slug>

| Field | Value |
| --- | --- |
| Phase number | `phase-01` |
| Phase name | `<short-slug>` |
| Goal | `<goal>` |
| Owner | `<owner>` |
| Status | `planned` |
| Local certificate path | `certificates/phase-01-certificate.json` |
| GitHub PR URL | `<url-or-not-opened>` |

#### Expected Files Or Components

| Path or component | Expected change | Notes |
| --- | --- | --- |
| `<path-or-component>` | `<expected-change>` | `<notes>` |

#### Acceptance Criteria

- [ ] `<criterion>`

#### Required Tests

| Command or check | Required? | Expected result | Evidence |
| --- | --- | --- | --- |
| `npm run typecheck` | yes | `PASS` | `<evidence>` |
| `npm run lint` | yes | `PASS` | `<evidence>` |
| `npm run test` | yes | `PASS` | `<evidence>` |
| `npm run build:web` | when app/build behavior changed | `PASS` | `<evidence>` |
| `npm run brain:health` | when AI Brain, governance, memory, or generated artifacts changed | `PASS` | `<evidence>` |

#### Local Certificate Status

| Field | Value |
| --- | --- |
| Status | `not-started` |
| Certificate path | `certificates/phase-01-certificate.json` |
| Certified HEAD SHA | `<sha-or-none>` |
| Verdict | `not-certified` |
| Certified at | `<timestamp-or-none>` |

#### GitHub PR Status

| Field | Value |
| --- | --- |
| PR URL | `<url-or-not-opened>` |
| CI status | `not-run` |
| Remote Codex review | `not-run` |
| Merge status | `not-ready` |

#### Phase Notes

- `<note>`
