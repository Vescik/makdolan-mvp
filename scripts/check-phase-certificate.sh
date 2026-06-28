#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  ./scripts/check-phase-certificate.sh <epic-id> <phase-number>

Examples:
  ./scripts/check-phase-certificate.sh billing-v2 01
  ./scripts/check-phase-certificate.sh billing-v2 phase-01

Checks whether the local phase certificate allows the current epic branch
HEAD to be pushed or used to update a GitHub PR.

This script does not call external APIs, push, create PRs, create releases,
or bypass branch protection.
USAGE
}

fail() {
  printf 'check-phase-certificate: %s\n' "$1" >&2
  exit 1
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$#" -ne 2 ]]; then
  usage >&2
  exit 2
fi

EPIC_ID="$1"
PHASE_INPUT="$2"

[[ "$EPIC_ID" =~ ^[a-z0-9][a-z0-9-]*$ ]] || fail "epic-id must use lowercase letters, numbers, and hyphens"

if [[ "$PHASE_INPUT" =~ ^phase-[0-9][0-9]$ ]]; then
  PHASE="phase-${PHASE_INPUT#phase-}"
elif [[ "$PHASE_INPUT" =~ ^[0-9][0-9]$ ]]; then
  PHASE="phase-${PHASE_INPUT}"
elif [[ "$PHASE_INPUT" =~ ^[0-9]$ ]]; then
  PHASE="phase-0${PHASE_INPUT}"
else
  fail "phase-number must be N, NN, or phase-NN, for example 1, 01, or phase-01"
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "must be run inside a git repository"
cd "$REPO_ROOT"

CURRENT_BRANCH="$(git branch --show-current)"
[[ -n "$CURRENT_BRANCH" ]] || fail "current branch is detached; expected epic/*"
[[ "$CURRENT_BRANCH" == epic/* ]] || fail "current branch must match epic/*; found $CURRENT_BRANCH"

CERT_PATH="docs/epics/${EPIC_ID}/certificates/${PHASE}-certificate.json"
[[ -f "$CERT_PATH" ]] || fail "missing certificate file: $CERT_PATH"

DIRTY_OUTSIDE_CERT=()
CERT_DIRTY="false"
while IFS= read -r status_line; do
  [[ -n "$status_line" ]] || continue
  status_path="${status_line:3}"
  if [[ "$status_path" != "$CERT_PATH" ]]; then
    DIRTY_OUTSIDE_CERT+=("$status_line")
  else
    CERT_DIRTY="true"
  fi
done < <(git status --porcelain --untracked-files=all)

if [[ "${#DIRTY_OUTSIDE_CERT[@]}" -gt 0 ]]; then
  printf '%s\n' "${DIRTY_OUTSIDE_CERT[@]}" >&2
  fail "working tree has uncommitted changes outside $CERT_PATH"
fi

CURRENT_HEAD="$(git rev-parse HEAD)"

node - "$CERT_PATH" "$EPIC_ID" "$PHASE" "$CURRENT_BRANCH" "$CURRENT_HEAD" "$CERT_DIRTY" <<'NODE'
const fs = require("fs");
const cp = require("child_process");

const [
  ,
  ,
  certPath,
  expectedEpicId,
  expectedPhase,
  expectedBranch,
  expectedHead,
  certDirty,
] = process.argv;

const fail = (message) => {
  console.error(`check-phase-certificate: ${message}`);
  process.exit(1);
};

let cert;
try {
  cert = JSON.parse(fs.readFileSync(certPath, "utf8"));
} catch (error) {
  fail(`certificate is not valid JSON: ${certPath}`);
}

const requireValue = (field) => {
  if (cert[field] === undefined || cert[field] === null || cert[field] === "") {
    fail(`certificate field '${field}' is required`);
  }
};

[
  "certificate_type",
  "verdict",
  "epic_id",
  "phase",
  "branch",
  "head_sha",
  "base_branch",
  "base_sha",
  "created_at",
  "summary",
  "tests_run",
  "files_reviewed",
  "blocking_findings",
  "non_blocking_notes",
  "push_allowed",
].forEach(requireValue);

if (cert.certificate_type !== "local_phase_certificate") {
  fail("certificate_type must be 'local_phase_certificate'");
}

if (cert.epic_id !== expectedEpicId) {
  fail(`epic_id must be '${expectedEpicId}', found '${cert.epic_id}'`);
}

if (cert.phase !== expectedPhase) {
  fail(`phase must be '${expectedPhase}', found '${cert.phase}'`);
}

if (cert.branch !== expectedBranch) {
  fail(`branch must match current branch '${expectedBranch}', found '${cert.branch}'`);
}

if (cert.base_branch !== "main") {
  fail(`base_branch must be 'main', found '${cert.base_branch}'`);
}

if (cert.verdict !== "PASS") {
  fail(`verdict must be 'PASS', found '${cert.verdict}'`);
}

if (cert.push_allowed !== true) {
  fail("push_allowed must be true");
}

const isCommitSha = (value) => /^[0-9a-f]{40}$/i.test(value);

const git = (args) => cp.execFileSync("git", args, { encoding: "utf8" }).trim();

const changedFiles = (base, head) => {
  const output = git(["diff", "--name-only", `${base}..${head}`]);
  return output ? output.split(/\r?\n/).filter(Boolean) : [];
};

const isCertificateOnlyCommit = () => {
  if (!isCommitSha(cert.head_sha)) return false;

  let parent;
  try {
    parent = git(["rev-parse", `${expectedHead}^`]);
  } catch {
    return false;
  }

  if (cert.head_sha !== parent) return false;

  const files = changedFiles(parent, expectedHead);
  return files.length === 1 && files[0] === certPath;
};

if (certDirty === "true") {
  if (cert.head_sha !== expectedHead) {
    fail(`dirty certificate must certify current HEAD '${expectedHead}', found '${cert.head_sha}'`);
  }
} else if (cert.head_sha !== expectedHead && !isCertificateOnlyCommit()) {
  fail(`head_sha must match current HEAD '${expectedHead}' or the parent of a certificate-only HEAD commit; found '${cert.head_sha}'`);
}

if (!Array.isArray(cert.blocking_findings)) {
  fail("blocking_findings must be an array");
}

if (cert.blocking_findings.length !== 0) {
  fail("blocking_findings must be empty for push readiness");
}

if (!Array.isArray(cert.tests_run)) {
  fail("tests_run must be an array");
}

if (cert.tests_run.length === 0) {
  fail("tests_run must include validation evidence or explicit skipped/unavailable checks");
}

if (!Array.isArray(cert.files_reviewed)) {
  fail("files_reviewed must be an array");
}

if (cert.files_reviewed.length === 0) {
  fail("files_reviewed must include reviewed files");
}

if (!Array.isArray(cert.non_blocking_notes)) {
  fail("non_blocking_notes must be an array");
}

console.log(`check-phase-certificate: PASS ${certPath}`);
console.log(`check-phase-certificate: push allowed for ${expectedBranch}@${expectedHead}`);
NODE
