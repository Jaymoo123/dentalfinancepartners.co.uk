"""
DEPRECATED — thin shim around the consolidated blog generator.

The full implementation now lives in the parent repo at
  optimisation_engine/blog_generator/

Prefer the new CLI for new automation:
  python -m optimisation_engine.blog_generator --site agency

This shim is kept so existing callers continue to work without changes.
Note: this site is a separate git repo. The parent repo containing the
consolidated generator must be on the same machine and on sys.path.
"""
import sys
from pathlib import Path

# Walk up two levels for Digital Agency repo, then one more to find the
# parent monorepo containing optimisation_engine/
SITE_ROOT = Path(__file__).resolve().parents[2]  # .../Accounting/Digital Agency
ACCOUNTING_ROOT = SITE_ROOT.parent                 # .../Accounting
if str(ACCOUNTING_ROOT) not in sys.path:
    sys.path.insert(0, str(ACCOUNTING_ROOT))

from optimisation_engine.blog_generator import generate_blog_for


def main() -> int:
    result = generate_blog_for("agency")
    if result.get("status") == "ok":
        print(f"[OK] {result['path']}")
        return 0
    print(f"[{result.get('status', 'error').upper()}] {result.get('message') or result.get('issues')}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
