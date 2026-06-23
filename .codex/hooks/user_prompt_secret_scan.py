#!/usr/bin/env python3
"""Best-effort Codex hook: blocks obvious secret paste patterns in prompts.
The hook input schema can evolve, so this script treats stdin as opaque text.
"""
import re
import sys

text = sys.stdin.read() or ""
patterns = [
    r"sk-[A-Za-z0-9_\-]{20,}",
    r"ghp_[A-Za-z0-9_]{20,}",
    r"github_pat_[A-Za-z0-9_]{20,}",
    r"AKIA[0-9A-Z]{16}",
    r"-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----",
]
for pattern in patterns:
    if re.search(pattern, text):
        print("Blocked: prompt appears to contain a secret/token/private key. Remove it and use env vars or a secret manager.", file=sys.stderr)
        sys.exit(2)
sys.exit(0)
