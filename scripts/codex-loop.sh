#!/usr/bin/env bash
set -euo pipefail

TASK="${*:-}"
if [ -z "$TASK" ]; then
  echo "Usage: scripts/codex-loop.sh '<task/user story/bug>'" >&2
  exit 1
fi

mkdir -p .codex/runs
RUN_ID="$(date +%Y%m%d-%H%M%S)"
OUT_DIR=".codex/runs/$RUN_ID"
mkdir -p "$OUT_DIR"

echo "Task: $TASK" | tee "$OUT_DIR/task.txt"

codex exec --sandbox read-only -c approval_policy=never \
  "Use the discovery skill. Discover this task without editing files: $TASK" \
  | tee "$OUT_DIR/01-discovery.md"

codex exec --sandbox read-only -c approval_policy=never \
  "Use the planning skill. Build a plan from $OUT_DIR/01-discovery.md for task: $TASK. Do not edit files." \
  | tee "$OUT_DIR/02-plan.md"

codex exec --sandbox workspace-write -c approval_policy=never \
  "Use the execution skill. Implement the plan in $OUT_DIR/02-plan.md for task: $TASK. Keep changes focused." \
  | tee "$OUT_DIR/03-execute.md"

codex exec --sandbox workspace-write -c approval_policy=never \
  "Use the verification skill. Verify the current changes for task: $TASK. Run relevant checks and report exact commands/results." \
  | tee "$OUT_DIR/04-verify.md"

codex exec --sandbox workspace-write -c approval_policy=never \
  "Use the knowledge-maintainer skill. Based on $OUT_DIR/04-verify.md, update docs/knowledge only if stable facts changed. Summarize remaining risks and suggest a commit message." \
  | tee "$OUT_DIR/05-iterate-learn.md"

echo "Codex loop output: $OUT_DIR"
