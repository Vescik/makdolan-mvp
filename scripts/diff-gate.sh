#!/usr/bin/env bash
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

FAILED=0
RAN=0
APP_VALIDATION_REQUIRED=0
APP_VALIDATION_RAN=0
SKIPPED=()
FAILED_COMMANDS=()

print_header() {
  printf '\n\033[1m%s\033[0m\n' "$1"
}

mark_failed() {
  local cmd="$1"
  FAILED=1
  FAILED_COMMANDS+=("$cmd")
  printf '\n[diff-gate] FAIL: %s\n' "$cmd" >&2
}

run_gate() {
  local label="$1"
  local cmd="$2"
  print_header "==> ${label}: ${cmd}"
  RAN=$((RAN + 1))
  if bash -lc "$cmd"; then
    printf '[diff-gate] PASS: %s\n' "$cmd"
  else
    mark_failed "$cmd"
  fi
}

run_app_gate() {
  APP_VALIDATION_RAN=$((APP_VALIDATION_RAN + 1))
  run_gate "$1" "$2"
}

check_untracked_hygiene() {
  local found=0
  local failed=0
  local output
  local file

  while IFS= read -r -d '' file; do
    [ -f "$file" ] || continue
    found=1

    if [ -s "$file" ] && ! LC_ALL=C grep -Iq . "$file"; then
      printf '[diff-gate] Skipping binary untracked file: %s\n' "$file"
      continue
    fi

    output="$(git diff --no-index --check -- /dev/null "$file" 2>&1 || true)"
    if [ -n "$output" ]; then
      printf '%s\n' "$output" >&2
      failed=1
    fi
  done < <(git ls-files --others --exclude-standard -z)

  if [ "$found" -eq 0 ]; then
    printf '[diff-gate] No untracked files to check.\n'
  fi

  return "$failed"
}

export -f check_untracked_hygiene

script_exists() {
  local script="$1"
  node -e "const s=require('./package.json').scripts||{}; process.exit(s[process.argv[1]] ? 0 : 1)" "$script" >/dev/null 2>&1
}

detect_package_manager() {
  if [ -f "pnpm-lock.yaml" ]; then
    printf 'pnpm'
    return
  fi

  if [ -f "yarn.lock" ]; then
    printf 'yarn'
    return
  fi

  if [ -f "package-lock.json" ] || [ -f "package.json" ]; then
    printf 'npm'
    return
  fi

  printf ''
}

pm_run() {
  local pm="$1"
  local script="$2"

  case "$pm" in
    npm) printf 'npm run %s' "$script" ;;
    pnpm) printf 'pnpm run %s' "$script" ;;
    yarn) printf 'yarn %s' "$script" ;;
    *) return 1 ;;
  esac
}

print_header "AI Brain diff gate"
printf '[diff-gate] Root: %s\n' "$ROOT"
printf '[diff-gate] Mode: validation only; no fix commands are run.\n'

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  run_gate "diff hygiene" "git diff --check"
  run_gate "staged diff hygiene" "git diff --cached --check"
  run_gate "untracked file hygiene" "check_untracked_hygiene"
else
  SKIPPED+=("Not inside a git worktree; diff hygiene checks unavailable")
fi

if [ -f "package.json" ]; then
  APP_VALIDATION_REQUIRED=1
  PM="$(detect_package_manager)"
  if [ -z "$PM" ] || ! command -v "$PM" >/dev/null 2>&1; then
    mark_failed "Node package manager unavailable for package.json project"
  else
    printf '[diff-gate] Package manager: %s\n' "$PM"
    for script in typecheck lint test build:web build; do
      if script_exists "$script"; then
        if [ "$script" = "build" ] && script_exists "build:web"; then
          continue
        fi
        run_app_gate "$script" "$(pm_run "$PM" "$script")"
      else
        SKIPPED+=("No package script: $script")
      fi
    done
  fi
else
  SKIPPED+=("No package.json")
fi

if [ -f "pubspec.yaml" ]; then
  APP_VALIDATION_REQUIRED=1
  if command -v flutter >/dev/null 2>&1; then
    run_app_gate "flutter analyze" "flutter analyze"
    run_app_gate "flutter test" "flutter test"
    run_app_gate "flutter build web" "flutter build web"
  else
    mark_failed "Flutter project detected but flutter is unavailable"
  fi
fi

if [ -x "android/gradlew" ]; then
  APP_VALIDATION_REQUIRED=1
  run_app_gate "Android tests" "(cd android && ./gradlew test)"
fi

if [ -d "ios" ]; then
  APP_VALIDATION_REQUIRED=1
  if [[ "$(uname)" == "Darwin" ]] && command -v xcodebuild >/dev/null 2>&1; then
    mark_failed "iOS folder detected but project-specific xcodebuild command is not configured"
  else
    mark_failed "iOS folder detected but xcodebuild/macOS path is unavailable"
  fi
fi

print_header "==> Summary"
printf '[diff-gate] Commands run: %s\n' "$RAN"

if [ "${#SKIPPED[@]}" -gt 0 ]; then
  printf '[diff-gate] Skipped checks:\n'
  for item in "${SKIPPED[@]}"; do
    printf '  - %s\n' "$item"
  done
fi

if [ "$FAILED" -ne 0 ]; then
  printf '[diff-gate] Failed commands:\n' >&2
  for cmd in "${FAILED_COMMANDS[@]}"; do
    printf '  - %s\n' "$cmd" >&2
  done
  printf '[diff-gate] RESULT: FAIL\n' >&2
  exit 1
fi

if [ "$RAN" -eq 0 ]; then
  printf '[diff-gate] RESULT: FAIL - no validation commands were available.\n' >&2
  exit 1
fi

if [ "$APP_VALIDATION_REQUIRED" -eq 1 ] && [ "$APP_VALIDATION_RAN" -eq 0 ]; then
  printf '[diff-gate] RESULT: FAIL - project detected but no app validation commands ran.\n' >&2
  exit 1
fi

printf '[diff-gate] RESULT: PASS\n'
