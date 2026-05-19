"""
Ingest GSC page+query+date data for all (or one) active site.

Idempotent: re-running the same day merges duplicates via the UNIQUE
constraint on (site_key, page_url, query, date).
"""
from __future__ import annotations

import argparse
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher  # noqa: E402
from optimisation_engine.config import PRIORITY_ORDER, get_sites  # noqa: E402


def run(site_keys: list[str] | None = None, days: int = 28) -> dict[str, int]:
    if site_keys is None:
        site_keys = [s["site_key"] for s in get_sites(active_only=True)]
        site_keys.sort(key=lambda k: PRIORITY_ORDER.index(k) if k in PRIORITY_ORDER else 999)

    results: dict[str, int] = {}
    for site_key in site_keys:
        print(f"\n=== GSC query ingestion: {site_key} ===")
        try:
            fetcher = GSCQueryFetcher(site_key)
            inserted = fetcher.fetch_and_store(days=days)
            results[site_key] = inserted
        except Exception as exc:
            print(f"[ERROR] {site_key}: {exc}")
            results[site_key] = -1
    return results


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("site_keys", nargs="*", help="One or more site_keys; default = all active")
    parser.add_argument("--days", type=int, default=28)
    args = parser.parse_args()

    results = run(args.site_keys or None, days=args.days)
    print("\n=== Summary ===")
    for site_key, count in results.items():
        print(f"  {site_key:11s} {count}")


if __name__ == "__main__":
    main()
