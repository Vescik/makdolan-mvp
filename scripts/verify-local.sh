#!/usr/bin/env bash
set -u

print_step() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }
run_if_exists() {
  local cmd="$1"
  print_step "$cmd"
  bash -lc "$cmd"
}

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

FAILED=0

if [ -f "pubspec.yaml" ]; then
  print_step "Detected Flutter/Dart project"
  command -v flutter >/dev/null 2>&1 && run_if_exists "flutter analyze" || echo "flutter not found; skipping analyze"
  command -v flutter >/dev/null 2>&1 && run_if_exists "flutter test" || echo "flutter not found; skipping tests"
  command -v flutter >/dev/null 2>&1 && run_if_exists "flutter build web --release" || echo "flutter not found; skipping web build"
fi

if [ -f "package.json" ]; then
  print_step "Detected Node/JS project"
  PM="npm"
  [ -f "pnpm-lock.yaml" ] && PM="pnpm"
  [ -f "yarn.lock" ] && PM="yarn"

  if command -v "$PM" >/dev/null 2>&1; then
    node -e "const p=require('./package.json'); const s=p.scripts||{}; for (const k of ['lint','typecheck','test','build']) if (s[k]) console.log(k)" > /tmp/project-scripts.txt
    grep -q '^lint$' /tmp/project-scripts.txt && run_if_exists "$PM run lint" || echo "no lint script"
    grep -q '^typecheck$' /tmp/project-scripts.txt && run_if_exists "$PM run typecheck" || echo "no typecheck script"
    grep -q '^test$' /tmp/project-scripts.txt && run_if_exists "$PM test" || echo "no test script"
    grep -q '^build$' /tmp/project-scripts.txt && run_if_exists "$PM run build" || echo "no build script"
  else
    echo "$PM not found; skipping Node checks"
  fi
fi

if [ -x "android/gradlew" ]; then
  print_step "Detected Android Gradle project"
  (cd android && ./gradlew test) || FAILED=1
fi

if [ -d "ios" ]; then
  print_step "Detected iOS folder"
  if [[ "$(uname)" == "Darwin" ]] && command -v xcodebuild >/dev/null 2>&1; then
    echo "Run project-specific xcodebuild command here after scheme/workspace discovery."
    find ios -maxdepth 2 \( -name "*.xcworkspace" -o -name "*.xcodeproj" \) -print
  else
    echo "iOS verification requires macOS/Xcode or macOS CI. Skipping locally."
  fi
fi

exit "$FAILED"
