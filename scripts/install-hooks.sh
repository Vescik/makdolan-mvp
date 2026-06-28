#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  ./scripts/install-hooks.sh

Installs Makdolan local git hooks into .git/hooks.

Installed hooks:
  pre-push  Blocks epic/* branch pushes unless the latest local phase
            certificate is PASS and matches the current HEAD or a
            certificate-only HEAD commit.

This installer does not push, call external APIs, create commits, or create
GitHub releases.
USAGE
}

fail() {
  printf 'install-hooks: %s\n' "$1" >&2
  exit 1
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$#" -ne 0 ]]; then
  usage >&2
  exit 2
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "must be run inside a git repository"
cd "$REPO_ROOT"

SOURCE_HOOK="scripts/hooks/pre-push"
TARGET_HOOK=".git/hooks/pre-push"

[[ -f "$SOURCE_HOOK" ]] || fail "missing source hook: $SOURCE_HOOK"
mkdir -p ".git/hooks"

if [[ -e "$TARGET_HOOK" ]] && ! cmp -s "$SOURCE_HOOK" "$TARGET_HOOK"; then
  BACKUP_HOOK="${TARGET_HOOK}.bak.$(date -u +%Y%m%dT%H%M%SZ)"
  cp "$TARGET_HOOK" "$BACKUP_HOOK"
  printf 'install-hooks: backed up existing pre-push hook to %s\n' "$BACKUP_HOOK"
fi

cp "$SOURCE_HOOK" "$TARGET_HOOK"
chmod +x "$TARGET_HOOK"

cat <<INSTALLED
install-hooks: installed $TARGET_HOOK

Epic branch pushes now require the latest local phase certificate to PASS and
match the current HEAD or a certificate-only HEAD commit.

Uninstall:
  rm .git/hooks/pre-push

This installer did not push, call external APIs, create commits, or create a
GitHub Release.
INSTALLED
