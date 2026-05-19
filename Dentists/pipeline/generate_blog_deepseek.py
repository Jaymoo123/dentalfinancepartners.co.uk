"""
DEPRECATED — thin shim around the consolidated blog generator.

The full implementation now lives at
  optimisation_engine/blog_generator/

That module merges what this file used to do (DeepSeek generation
+ Haiku factual verification) into one pipeline driven by per-site
config. verify_with_haiku=True is already set on Dentists' site config.

Prefer the new CLI for new automation:
  python -m optimisation_engine.blog_generator --site dentists [--topic "..."] [--dry-run]

This shim preserves the simple "run once" entry point. The old --limit,
--cluster, --slug, --skip-haiku flags are not yet implemented in the
consolidated module; if you need them back, the original implementation
is in git history.
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
    parser.add_argument("--slug", default=None, help="DEPRECATED — use --topic instead.")
    parser.add_argument("--topic", default=None, help="Generate this specific topic keyword.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=1, help="Number of blogs to generate (currently only 1 supported).")
    parser.add_argument("--skip-haiku", action="store_true", help="Ignored — Haiku verifier is configured per-site.")
    args = parser.parse_args()

    if args.limit != 1:
        print(f"[WARN] --limit {args.limit} requested but consolidated generator runs one blog at a time. Generating 1.")

    result = generate_blog_for(
        "dentists",
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
