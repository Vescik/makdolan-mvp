#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  ./scripts/start-epic.sh <epic-id> <short-slug> <target-version>

Example:
  ./scripts/start-epic.sh billing-v2 billing-v2 v1.4.0

Creates a local epic branch from main, copies docs/epics/_template to
docs/epics/<epic-id>, fills obvious placeholders, and commits the new
epic workspace.

This script does not push, open a PR, create a GitHub Release, or bypass
local checks.
USAGE
}

fail() {
  printf 'start-epic: %s\n' "$1" >&2
  exit 1
}

require_clean_worktree() {
  if [[ -n "$(git status --porcelain)" ]]; then
    git status --short
    fail "working tree must be clean before starting an epic"
  fi
}

replace_placeholders() {
  local file="$1"
  EPIC_ID="$EPIC_ID" \
    SHORT_SLUG="$SHORT_SLUG" \
    TARGET_VERSION="$TARGET_VERSION" \
    BRANCH_NAME="$BRANCH_NAME" \
    TARGET_BRANCH="main" \
  perl -0pi \
    -e 's/<epic-id>/$ENV{EPIC_ID}/g;' \
    -e 's/<short-slug>/$ENV{SHORT_SLUG}/g;' \
    -e 's/<target-release-version>/$ENV{TARGET_VERSION}/g;' \
    -e 's/<branch-name>/$ENV{BRANCH_NAME}/g;' \
    -e 's/<epic-branch-name>/$ENV{BRANCH_NAME}/g;' \
    -e 's/<target-branch>/$ENV{TARGET_BRANCH}/g;' \
    "$file"
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$#" -ne 3 ]]; then
  usage >&2
  exit 2
fi

EPIC_ID="$1"
SHORT_SLUG="$2"
TARGET_VERSION="$3"
BRANCH_NAME="epic/${EPIC_ID}-${SHORT_SLUG}"

[[ "$EPIC_ID" =~ ^[a-z0-9][a-z0-9-]*$ ]] || fail "epic-id must use lowercase letters, numbers, and hyphens"
[[ "$SHORT_SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]] || fail "short-slug must use lowercase letters, numbers, and hyphens"
[[ "$TARGET_VERSION" =~ ^[A-Za-z0-9][A-Za-z0-9._-]*$ ]] || fail "target-version contains unsupported characters"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "must be run inside a git repository"
cd "$REPO_ROOT"

TEMPLATE_DIR="docs/epics/_template"
EPIC_DIR="docs/epics/${EPIC_ID}"

[[ -d "$TEMPLATE_DIR" ]] || fail "missing template directory: $TEMPLATE_DIR"

require_clean_worktree

CURRENT_BRANCH="$(git branch --show-current)"
[[ "$CURRENT_BRANCH" == "main" ]] || fail "current branch must be main; found ${CURRENT_BRANCH:-detached HEAD}"

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  fail "branch already exists: $BRANCH_NAME"
fi

[[ ! -e "$EPIC_DIR" ]] || fail "epic workspace already exists: $EPIC_DIR"

printf 'Updating main...\n'
git pull --ff-only

printf 'Creating branch %s...\n' "$BRANCH_NAME"
git switch -c "$BRANCH_NAME"

printf 'Creating epic workspace %s...\n' "$EPIC_DIR"
mkdir -p "docs/epics"
cp -R "$TEMPLATE_DIR" "$EPIC_DIR"
mkdir -p "$EPIC_DIR/certificates"

while IFS= read -r -d '' file; do
  replace_placeholders "$file"
done < <(find "$EPIC_DIR" -type f -name '*.md' -print0)

git add "$EPIC_DIR"
git commit -m "epic(${EPIC_ID}): start epic workspace"

cat <<NEXT_STEPS

Epic workspace created.

Branch:
  $BRANCH_NAME

Workspace:
  $EPIC_DIR

Next steps:
  1. Fill remaining placeholders in $EPIC_DIR/EPIC.md.
  2. Define phases in $EPIC_DIR/PHASES.md.
  3. Keep release, rollback, risk, and acceptance docs current.
  4. Run local phase validation and create a phase certificate before pushing or opening/updating a PR.

No push, PR, or GitHub Release was created.
NEXT_STEPS
