"""
CLI for the shared blog generator.

  python -m optimisation_engine.blog_generator --site dentists
  python -m optimisation_engine.blog_generator --site agency --topic "vat for agencies"
  python -m optimisation_engine.blog_generator --site property --dry-run
"""
from __future__ import annotations

import argparse
import json
import sys

from optimisation_engine.blog_generator.generate import generate_blog_for


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(prog="optimisation_engine.blog_generator")
    p.add_argument(
        "--site",
        required=True,
        choices=["dentists", "property", "medical", "solicitors", "agency", "generalist"],
        help="Which niche site to generate for.",
    )
    p.add_argument(
        "--topic",
        default=None,
        help="Specific topic keyword to generate. Defaults to next-priority unused topic.",
    )
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Generate and validate but don't write the file or mark the topic done.",
    )
    p.add_argument(
        "--skip-mark-done",
        action="store_true",
        help="Write the file but don't mark the topic done in Supabase.",
    )
    p.add_argument(
        "--json",
        action="store_true",
        help="Print the result summary as JSON instead of human text.",
    )
    args = p.parse_args(argv)

    result = generate_blog_for(
        args.site,
        topic_keyword=args.topic,
        dry_run=args.dry_run,
        skip_mark_done=args.skip_mark_done,
    )

    if args.json:
        print(json.dumps(result, indent=2, default=str))

    if result.get("status") in ("blocked", "no_topics"):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
