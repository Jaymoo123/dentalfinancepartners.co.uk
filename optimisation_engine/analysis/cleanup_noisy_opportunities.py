"""
Retrospectively flag noisy opportunities as rejected.

Reads optimisation_opportunities WHERE status='proposed', runs each
primary_query through noise_filter.is_noisy(), and sets:
  status = 'rejected'
  notes = "auto-rejected: noise_filter category=<reason>"
  reviewed_by = 'noise_filter_v1'
  reviewed_at = now()

Idempotent: only touches 'proposed' rows. Re-runs are safe.
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

from optimisation_engine.analysis.noise_filter import is_noisy  # noqa: E402
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402


def _headers() -> dict[str, str]:
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }


def fetch_proposed() -> list[dict]:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    out: list[dict] = []
    offset = 0
    page = 500
    while True:
        r = httpx.get(
            url,
            headers=_headers(),
            params={
                "select": "id,site_key,opportunity_type,primary_query,score",
                "status": "eq.proposed",
                "limit": str(page),
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        out.extend(batch)
        if len(batch) < page:
            break
        offset += page
    return out


def reject_opportunity(opp_id: str, reason: str) -> bool:
    url = f"{SUPABASE_URL}/rest/v1/optimisation_opportunities"
    patch = {
        "status": "rejected",
        "notes": f"auto-rejected: noise_filter category={reason}",
        "reviewed_by": "noise_filter_v1",
        "reviewed_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    r = httpx.patch(
        url,
        headers={**_headers(), "Prefer": "return=minimal"},
        params={"id": f"eq.{opp_id}"},
        json=patch,
        timeout=15.0,
    )
    return r.status_code < 300


def run(*, dry_run: bool = False) -> dict:
    rows = fetch_proposed()
    print(f"Loaded {len(rows)} 'proposed' opportunities")

    rejected_by_reason: dict[str, int] = defaultdict(int)
    rejected_by_site: dict[str, int] = defaultdict(int)
    rejected_ids: list[tuple[str, str, str]] = []

    for row in rows:
        q = (row.get("primary_query") or "").strip()
        if not q:
            continue
        noisy, reason = is_noisy(q)
        if not noisy:
            continue
        rejected_by_reason[reason or "unknown"] += 1
        rejected_by_site[row["site_key"]] += 1
        rejected_ids.append((row["id"], row["site_key"], q))
        if not dry_run:
            reject_opportunity(row["id"], reason or "unknown")

    print(f"\n=== Cleanup result ({'DRY-RUN' if dry_run else 'APPLIED'}) ===")
    print(f"Total opportunities marked for rejection: {len(rejected_ids)}")
    print(f"\nBy site:")
    for site in sorted(rejected_by_site):
        print(f"  {site:11s} {rejected_by_site[site]}")
    print(f"\nBy reason:")
    for reason in sorted(rejected_by_reason):
        print(f"  {reason:25s} {rejected_by_reason[reason]}")
    print(f"\nSample rejected (first 10):")
    for _id, site, q in rejected_ids[:10]:
        print(f"  [{site}] {q!r}")
    return {"rejected": len(rejected_ids), "by_reason": dict(rejected_by_reason), "by_site": dict(rejected_by_site)}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    run(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
