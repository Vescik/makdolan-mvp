#!/usr/bin/env python3
"""Non-blocking Codex hook that leaves a verification reminder after a turn.
It intentionally exits 0 so it does not fight with Codex; CI remains the hard gate.
"""
from datetime import datetime, timezone
from pathlib import Path
import sys

try:
    out = Path('.codex/state')
    out.mkdir(parents=True, exist_ok=True)
    (out / 'last-stop-reminder.md').write_text(
        f"""# Last Codex stop reminder

Generated: {datetime.now(timezone.utc).isoformat()}

Before marking work done, ensure the final response includes:

- Changed files summary.
- Verification commands run.
- Pass/fail status.
- Known skipped checks and why.
- Follow-up risks.
""",
        encoding='utf-8'
    )
except OSError as error:
    print(f"Verification reminder skipped: {error}", file=sys.stderr)
sys.exit(0)
