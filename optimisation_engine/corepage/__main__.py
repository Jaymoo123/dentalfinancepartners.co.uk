"""CLI for the core-page SEO optimisation engine.

    python -m optimisation_engine.corepage --site property --page homepage --dry-run
"""
from __future__ import annotations

import argparse
import json

from . import run_corepage_analysis


def main() -> None:
    ap = argparse.ArgumentParser(description="Core-page SEO analysis (Phase 1 data-gather).")
    ap.add_argument("--site", default="property", help="site_key (default: property)")
    ap.add_argument("--page", default="homepage", help="page_key (default: homepage)")
    ap.add_argument("--dry-run", action="store_true",
                    help="no GSC refresh, no Serper (paid) fallback, no DB writes; DDG + extract only")
    ap.add_argument("--skip-serps", action="store_true", help="skip competitor SERP fetch + extraction")
    ap.add_argument("--refresh-gsc", action="store_true",
                    help="refresh GSC query data (60d) before analysis (ignored under --dry-run)")
    args = ap.parse_args()

    summary = run_corepage_analysis(
        args.site, args.page,
        dry_run=args.dry_run,
        skip_serps=args.skip_serps,
        refresh_gsc=args.refresh_gsc,
    )
    print("\n=== SUMMARY ===")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
