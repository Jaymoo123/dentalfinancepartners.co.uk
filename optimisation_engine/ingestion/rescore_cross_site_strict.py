"""
Re-score every keyword in dataforseo_keyword_data through cross_site_relevance_v2.

Overwrites previous v1 scores. Stores reject_reason in cross_site_rationale
with prefix 'REJECTED:<reason>: <rationale>' when v2 says kept=false.

When kept=false, relevant_sites=[] + primary_site=null so detectors will
ignore these rows.
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

from optimisation_engine.analysis.noise_filter import is_noisy  # noqa: E402
from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402
from optimisation_engine.reasoning.cross_site_relevance_v2 import score_batch  # noqa: E402


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}", "Content-Type": "application/json"}


def fetch_all_keywords(*, batch_size: int = 30) -> list[str]:
    """Fetch distinct keywords. We re-score ALL (overwrite-mode), not just unscored."""
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    out: list[str] = []
    seen: set[str] = set()
    offset = 0
    page = 1000
    while True:
        r = httpx.get(
            url,
            headers={"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"},
            params={
                "select": "related_keyword",
                "related_keyword": "not.is.null",
                "limit": str(page),
                "offset": str(offset),
            },
            timeout=30.0,
        )
        r.raise_for_status()
        batch = r.json()
        for row in batch:
            kw = (row.get("related_keyword") or "").strip()
            if kw and kw.lower() not in seen:
                seen.add(kw.lower())
                out.append(kw)
        if len(batch) < page:
            break
        offset += page
    return out


def apply_to_all_rows(*, keyword: str, kept: bool, relevant_sites: list[str], primary_site: str | None, reject_reason: str | None, rationale: str) -> int:
    url = f"{SUPABASE_URL}/rest/v1/dataforseo_keyword_data"
    if kept:
        ration = (rationale or "")[:500]
    else:
        ration = f"REJECTED:{reject_reason}: {rationale}"[:500]
    patch = {
        "relevant_sites": relevant_sites if kept else [],
        "primary_site": primary_site if kept else None,
        "cross_site_rationale": ration,
        "cross_site_scored_at": datetime.utcnow().isoformat(),
    }
    r = httpx.patch(
        url,
        headers={**_headers(), "Prefer": "return=minimal"},
        params={"related_keyword": f"eq.{keyword}"},
        json=patch,
        timeout=30.0,
    )
    return 1 if r.status_code < 300 else 0


def run(*, batch_size: int = 30, max_batches: int = 0, pre_filter_noise: bool = True) -> dict:
    all_kws = fetch_all_keywords(batch_size=batch_size)

    # Pre-filter through the pattern-based noise_filter to save DeepSeek tokens
    # on obvious junk. v2 would reject these anyway but it's faster + cheaper
    # to handle them locally.
    if pre_filter_noise:
        keep: list[str] = []
        pre_rejected: list[tuple[str, str]] = []
        for kw in all_kws:
            noisy, reason = is_noisy(kw)
            if noisy:
                pre_rejected.append((kw, reason or "noise_filter"))
            else:
                keep.append(kw)
        print(f"Pre-filter (noise_filter): {len(pre_rejected)} rejected locally, {len(keep)} forwarded to DeepSeek")

        # Mark pre-rejected ones immediately
        for kw, reason in pre_rejected:
            apply_to_all_rows(
                keyword=kw, kept=False, relevant_sites=[], primary_site=None,
                reject_reason=reason, rationale="pre-filtered by noise_filter pattern match",
            )
        all_kws = keep
    else:
        pre_rejected = []

    total_scored = 0
    total_cost = 0.0
    total_kept = 0
    total_rejected = 0
    batch_num = 0

    while all_kws:
        batch_num += 1
        if max_batches and batch_num > max_batches:
            print(f"Reached max_batches={max_batches}. Stopping.")
            break

        kws = all_kws[:batch_size]
        all_kws = all_kws[batch_size:]
        print(f"\n=== Batch {batch_num}: {len(kws)} keywords (remaining queue: {len(all_kws)}) ===")
        try:
            result = score_batch(kws)
        except Exception as exc:
            print(f"  [ERR] DeepSeek call failed: {exc}")
            break

        total_cost += result.cost_usd
        if not result.auto_applicable:
            print(f"  [WARN] confidence={result.confidence}, notes={result.notes}")

        for r in (result.output or {}).get("results") or []:
            kw = r.get("keyword")
            if not kw:
                continue
            kept = bool(r.get("kept"))
            sites = [s for s in (r.get("relevant_sites") or []) if s in {"agency", "property", "dentists", "generalist"}]
            primary = r.get("primary_site")
            if primary not in {"agency", "property", "dentists", "generalist"}:
                primary = None
            reason = r.get("reject_reason")
            rationale = (r.get("rationale") or "")[:500]
            apply_to_all_rows(keyword=kw, kept=kept, relevant_sites=sites, primary_site=primary, reject_reason=reason, rationale=rationale)
            total_scored += 1
            if kept:
                total_kept += 1
            else:
                total_rejected += 1
        print(f"  batch_cost=${result.cost_usd:.6f} confidence={result.confidence} kept={sum(1 for r in (result.output or {}).get('results') or [] if r.get('kept'))}/{len(kws)}")

    print(f"\n=== Complete ===")
    print(f"  pre-filter rejected (local): {len(pre_rejected)}")
    print(f"  DeepSeek-scored:             {total_scored}")
    print(f"    kept:                      {total_kept}")
    print(f"    rejected:                  {total_rejected}")
    print(f"  total DeepSeek cost:         ${total_cost:.6f}")
    return {"pre_rejected": len(pre_rejected), "scored": total_scored, "kept": total_kept, "rejected": total_rejected, "cost": total_cost}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=30)
    parser.add_argument("--max-batches", type=int, default=0, help="0 = unlimited")
    parser.add_argument("--no-pre-filter", action="store_true")
    args = parser.parse_args()
    run(batch_size=args.batch_size, max_batches=args.max_batches, pre_filter_noise=not args.no_pre_filter)


if __name__ == "__main__":
    main()
