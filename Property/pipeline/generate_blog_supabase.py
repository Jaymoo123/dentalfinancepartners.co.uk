"""
DEPRECATED — thin shim around the consolidated blog generator.

The full implementation now lives at
  optimisation_engine/blog_generator/

Prefer the new CLI for new automation:
  python -m optimisation_engine.blog_generator --site property

This shim is kept so existing callers continue to work without changes.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator import generate_blog_for


def main() -> int:
    result = generate_blog_for("property")
    if result.get("status") == "ok":
        print(f"[OK] {result['path']}")
        return 0
    print(f"[{result.get('status', 'error').upper()}] {result.get('message') or result.get('issues')}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
