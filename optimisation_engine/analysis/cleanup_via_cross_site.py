"""
Propagate cross_site_relevance_v2 rejections into the opportunities table.

For every 'proposed' opportunity, look up its primary_query in
dataforseo_keyword_data. If the keyword exists there with relevant_sites=[]
(meaning v2 rejected it), mark the opportunity as 'rejected' with notes
copied from cross_site_rationale.

This is the bridge between the keyword-level rescore and the opportunity
backlog.
"""
from __future__ import annotations

import os
import sys
from collections import defaultdict
from datetime import datetime

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def run(*, dry_run: bool = False) -> dict:
    # Pull all rejected keywords (relevant_sites=[] + cross_site_rationale set)
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    rejected_kws: dict[str, str] = {}
    offset = 0
    while True:
        r = httpx.get(
            url,
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
            params={
                "select": "related_keyword,cross_site_rationale",
                "relevant_sites": "eq.{}",
                "cross_site_rationale": "not.is.null",
                "limit": "1000",
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        for row in batch:
            kw = (row.get("related_keyword") or "").strip().lower()
            if kw:
                rejected_kws[kw] = row.get("cross_site_rationale") or "rejected by cross_site_relevance_v2"
        if len(batch) < 1000:
            break
        offset += 1000

    print(f"Loaded {len(rejected_kws)} keywords rejected by v2")

    # Pull all proposed opportunities
    opps_url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    proposed: list[dict] = []
    offset = 0
    while True:
        r = httpx.get(
            opps_url,
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
            params={
                "select": "id,site_key,primary_query,score",
                "status": "eq.proposed",
                "limit": "500",
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        proposed.extend(batch)
        if len(batch) < 500:
            break
        offset += 500

    print(f"Loaded {len(proposed)} proposed opportunities")

    to_reject: list[tuple[str, str, str, str]] = []
    for opp in proposed:
        q = (opp.get("primary_query") or "").strip().lower()
        if q and q in rejected_kws:
            to_reject.append((opp["id"], opp["site_key"], q, rejected_kws[q]))

    by_site: dict[str, int] = defaultdict(int)
    for _id, site, _q, _r in to_reject:
        by_site[site] += 1

    print(f"\nWill reject {len(to_reject)} opportunities (via v2 cross-site)")
    for site in sorted(by_site):
        print(f"  {site:11s} {by_site[site]}")

    if dry_run:
        print("\nSample (10):")
        for _id, site, q, reason in to_reject[:10]:
            print(f"  [{site}] {q!r}  reason={reason[:80]!r}")
        return {"would_reject": len(to_reject), "by_site": dict(by_site)}

    rejected = 0
    for opp_id, _site, _q, reason in to_reject:
        patch = {
            "status": "rejected",
            "notes": f"auto-rejected: cross_site_relevance_v2: {reason}"[:1000],
            "reviewed_by": "cross_site_relevance_v2",
            "reviewed_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        r = httpx.patch(
            opps_url,
            headers={**_headers(), "Prefer": "return=minimal"},
            params={"id": f"eq.{opp_id}"},
            json=patch,
            timeout=15.0,
        )
        if r.status_code < 300:
            rejected += 1
    print(f"\nApplied: {rejected} opportunities marked as rejected")
    return {"rejected": rejected, "by_site": dict(by_site)}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    run(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
