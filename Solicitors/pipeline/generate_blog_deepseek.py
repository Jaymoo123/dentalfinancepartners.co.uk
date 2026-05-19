"""
DEPRECATED — thin shim around the consolidated blog generator.

The full implementation now lives at
  optimisation_engine/blog_generator/

Prefer the new CLI:
  python -m optimisation_engine.blog_generator --site solicitors [--topic "..."] [--dry-run]
"""
import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from optimisation_engine.blog_generator import generate_blog_for


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--topic", default=None)
    parser.add_argument("--slug", default=None, help="DEPRECATED — use --topic.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=1)
    parser.add_argument("--skip-haiku", action="store_true", help="Ignored — set verify_with_haiku in site config.")
    args = parser.parse_args()

    if args.limit != 1:
        print(f"[WARN] --limit {args.limit} requested but consolidated generator runs one blog at a time.")

    result = generate_blog_for(
        "solicitors",
        topic_keyword=args.topic,
        dry_run=args.dry_run,
    )
    if result.get("status") == "ok":
        print(f"[OK] {result['path']}")
        return 0
    print(f"[{result.get('status', 'error').upper()}] {result.get('message') or result.get('issues')}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
