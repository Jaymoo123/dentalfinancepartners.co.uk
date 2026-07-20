# ponytail: one-off Phase-1 runner for the query ledger; paginated GSC pulls + Bing snapshot for 7 older sites
from __future__ import annotations

import sys
from datetime import date, timedelta

sys.path.insert(0, r"C:\Users\user\Documents\Accounting")

from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
from optimisation_engine.clients.gsc_page_client import GSCPageFetcher
from optimisation_engine.clients.bing_query_client import BingQueryFetcher
SITES = ["property", "dentists", "solicitors", "medical", "generalist", "agency", "construction-cis"]
DAYS = 90
CHUNK_DAYS = 15  # ponytail: 15-day windows keep every site under the 25k row cap; shrink if a window saturates


def pull_gsc_query(site_key: str) -> int:
    f = GSCQueryFetcher(site_key)
    end = date.today()
    start = end - timedelta(days=DAYS)
    total = 0
    win_start = start
    while win_start <= end:
        win_end = min(win_start + timedelta(days=CHUNK_DAYS - 1), end)
        start_row = 0
        while True:
            body = {
                "startDate": win_start.strftime("%Y-%m-%d"),
                "endDate": win_end.strftime("%Y-%m-%d"),
                "dimensions": ["page", "query", "date"],
                "rowLimit": 25000,
                "startRow": start_row,
            }
            resp = (
                f.gsc_client.service.searchanalytics()
                .query(siteUrl=f.site["gsc_property_url"], body=body)
                .execute()
            )
            rows = resp.get("rows", [])
            if not rows:
                break
            total += f._upsert(rows)
            if len(rows) < 25000:
                break
            start_row += len(rows)
            print(f"[GSC-Q] {site_key} window {win_start}..{win_end} paginating startRow={start_row}", flush=True)
        win_start = win_end + timedelta(days=1)
    print(f"[GSC-Q] {site_key} TOTAL upserted {total}", flush=True)
    return total


def main() -> None:
    summary = {}
    for site in SITES:
        try:
            q = pull_gsc_query(site)
        except Exception as exc:
            print(f"[GSC-Q] {site} FAILED: {exc}", flush=True)
            q = -1
        try:
            p = GSCPageFetcher(site).fetch_and_store(days=DAYS)
        except Exception as exc:
            print(f"[GSC-P] {site} FAILED: {exc}", flush=True)
            p = -1
        summary[site] = (q, p)
    # Bing after GSC (slow: per-page throttle)
    for site in SITES:
        try:
            b = BingQueryFetcher(site).fetch_and_store()
        except Exception as exc:
            print(f"[BING] {site} FAILED: {exc}", flush=True)
            b = -1
        summary[site] = summary[site] + (b,)
    print("SUMMARY site=(gsc_query, gsc_page, bing):", summary, flush=True)
    assert all(v[0] > 0 and v[1] > 0 for v in summary.values()), "a GSC pull failed"


if __name__ == "__main__":
    main()
