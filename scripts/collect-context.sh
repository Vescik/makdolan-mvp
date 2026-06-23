#!/usr/bin/env bash
set -euo pipefail
mkdir -p .codex/context
{
  echo "# Repository context"
  echo
  echo "## Git"
  git status --short || true
  echo
  echo "## Top-level files"
  find . -maxdepth 2 -type f \
    ! -path './.git/*' \
    ! -path './node_modules/*' \
    ! -path './build/*' \
    ! -path './dist/*' \
    | sort | sed 's#^./##' | head -300
  echo
  echo "## Package files"
  for f in package.json pubspec.yaml android/build.gradle ios/Podfile; do
    [ -f "$f" ] && echo "- $f"
  done
} > .codex/context/repo-context.md

echo ".codex/context/repo-context.md"
