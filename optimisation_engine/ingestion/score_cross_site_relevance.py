"""
Run cross-site relevance scoring over every keyword in dataforseo_keyword_data
that hasn't been scored yet (cross_site_scored_at IS NULL).

Batches 50 keywords per DeepSeek call. Idempotent: re-running only scores
unscored rows. Updates the row in place with relevant_sites[], primary_site,
cross_site_rationale, cross_site_scored_at.
"""
from __future__ import annotations

import argparse
import os
import sys
from datetime import datetime

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402
from optimisation_engine.reasoning.cross_site_relevance import score_batch  # noqa: E402


def _supabase_headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def fetch_unscored(*, batch_size: int) -> list[dict]:
    """Fetch DISTINCT keywords that haven't been cross-site scored yet."""
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    params = {
        "select": "related_keyword",
        "related_keyword": "not.is.null",
        "cross_site_scored_at": "is.null",
        "limit": str(batch_size * 5),  # over-fetch then dedupe
    }
    r = httpx.get(url, headers=_supabase_headers(), params=params, timeout=30.0)
    r.raise_for_status()
    seen: set[str] = set()
    out: list[str] = []
    for row in r.json():
        kw = (row.get("related_keyword") or "").strip()
        if not kw or kw in seen:
            continue
        seen.add(kw)
        out.append(kw)
        if len(out) >= batch_size:
            break
    return out


def apply_batch_to_all_rows(*, keyword: str, relevant_sites: list[str], primary_site: str | None, rationale: str) -> int:
    """Update EVERY row matching this keyword (across all site_keys + endpoints)."""
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    patch = {
        "relevant_sites": relevant_sites,
        "primary_site": primary_site,
        "cross_site_rationale": rationale,
        "cross_site_scored_at": datetime.utcnow().isoformat(),
    }
    r = httpx.patch(
        url,
        headers={**_supabase_headers(), "Prefer": "return=minimal"},
        params={"related_keyword": f"eq.{keyword}"},
        json=patch,
        timeout=30.0,
    )
    if r.status_code >= 300:
        print(f"  [ERR] patch {keyword!r}: {r.status_code} {r.text[:200]}")
        return 0
    return 1


def run(*, batch_size: int = 30, max_batches: int = 0) -> dict:
    """Process all unscored keywords. max_batches=0 means unlimited."""
    total_scored = 0
    total_cost = 0.0
    batch_num = 0

    while True:
        kws = fetch_unscored(batch_size=batch_size)
        if not kws:
            print("No more unscored keywords. Done.")
            break
        batch_num += 1
        if max_batches and batch_num > max_batches:
            print(f"Reached max_batches={max_batches}. Stopping.")
            break

        print(f"\n=== Batch {batch_num}: {len(kws)} keywords ===")
        try:
            result = score_batch(kws)
        except Exception as exc:
            print(f"  [ERR] DeepSeek call failed: {exc}")
            # Don't mark these as scored — they'll be retried next run
            break

        total_cost += result.cost_usd
        if not result.auto_applicable:
            print(f"  [WARN] batch confidence {result.confidence} below threshold, notes: {result.notes}")
            # Still apply — the data is recorded but we flag low confidence
            # (Could alternatively skip the apply and retry, but cheap to just store)

        # Apply each result. Match by exact keyword.
        results = (result.output or {}).get("results") or []
        scored_this_batch = 0
        for r in results:
            kw = r.get("keyword")
            if not kw:
                continue
            sites = [s for s in (r.get("relevant_sites") or []) if s in {"agency", "property", "dentists", "generalist"}]
            primary = r.get("primary_site")
            if primary not in {"agency", "property", "dentists", "generalist"}:
                primary = None
            rationale = (r.get("rationale") or "")[:500]
            apply_batch_to_all_rows(
                keyword=kw,
                relevant_sites=sites,
                primary_site=primary,
                rationale=rationale,
            )
            scored_this_batch += 1

        total_scored += scored_this_batch
        print(f"  batch_cost=${result.cost_usd:.6f} confidence={result.confidence} scored={scored_this_batch}")

    print(f"\n=== Complete ===")
    print(f"  total keywords scored: {total_scored}")
    print(f"  total DeepSeek cost:   ${total_cost:.6f}")
    return {"total_scored": total_scored, "total_cost": total_cost}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=30)
    parser.add_argument("--max-batches", type=int, default=0, help="0 = unlimited")
    args = parser.parse_args()
    run(batch_size=args.batch_size, max_batches=args.max_batches)


if __name__ == "__main__":
    main()
