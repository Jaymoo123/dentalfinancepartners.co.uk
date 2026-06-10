"""
CLI for the competitor analysis engine.

Usage:
    # Phase 0: discovery calibration (run once per site, review output)
    python -m optimisation_engine.competitor --site property --discover

    # Full pipeline (SERP fetch + parse + gap analysis + briefs)
    python -m optimisation_engine.competitor --site property

    # Dev run: limit pages
    python -m optimisation_engine.competitor --site property --max-pages 5

    # Skip stages
    python -m optimisation_engine.competitor --site property --skip-serps
    python -m optimisation_engine.competitor --site property --skip-gaps --skip-briefs

    # All sites
    python -m optimisation_engine.competitor --all-sites
"""
from __future__ import annotations

import argparse
import json
import sys
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)


def main() -> None:
    parser = argparse.ArgumentParser(description="Competitor SERP Analysis Engine")
    parser.add_argument("--site", help="Site key (property / dentists / medical / solicitors / agency / generalist)")
    parser.add_argument("--all-sites", action="store_true", help="Run for all active sites")
    parser.add_argument("--discover", action="store_true", help="Run Phase 0 discovery calibration only")
    parser.add_argument("--n-queries", type=int, default=15, help="Number of queries for discovery (default: 15)")
    parser.add_argument("--n-competitors", type=int, default=3, help="Competitors per query (default: 3)")
    parser.add_argument("--max-pages", type=int, default=None, help="Limit pages processed")
    parser.add_argument("--skip-serps", action="store_true", help="Skip SERP fetch and page parsing")
    parser.add_argument("--skip-gaps", action="store_true", help="Skip gap analysis")
    parser.add_argument("--skip-briefs", action="store_true", help="Skip brief generation")
    args = parser.parse_args()

    if not args.site and not args.all_sites:
        parser.print_help()
        sys.exit(1)

    if args.all_sites:
        from optimisation_engine.config import PRIORITY_ORDER, get_sites
        sites = [s["site_key"] for s in get_sites(active_only=True)]
        sites.sort(key=lambda k: PRIORITY_ORDER.index(k) if k in PRIORITY_ORDER else 999)
    else:
        sites = [args.site]

    if args.discover:
        from optimisation_engine.competitor.discovery import run_discovery
        for site in sites:
            run_discovery(site, n_queries=args.n_queries, n_competitors=args.n_competitors)
        return

    from optimisation_engine.competitor import run_competitor_analysis
    all_results = {}
    for site in sites:
        print(f"\n{'='*70}")
        print(f"Competitor analysis: {site}")
        print(f"{'='*70}")
        result = run_competitor_analysis(
            site,
            max_pages=args.max_pages,
            skip_serps=args.skip_serps,
            skip_gaps=args.skip_gaps,
            skip_briefs=args.skip_briefs,
            n_competitors=args.n_competitors,
        )
        all_results[site] = result

    print("\n" + "=" * 70)
    print("Competitor analysis complete")
    print("=" * 70)
    print(json.dumps(all_results, indent=2, default=str)[:3000])


if __name__ == "__main__":
    main()
