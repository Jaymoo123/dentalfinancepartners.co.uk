"""Enrich existing blog_topics rows with DataForSEO search_volume + keyword_difficulty.

Re-deciles priority for the site after update.

Usage:
  python scripts/enrich_blog_topics.py <site_key> [--all] [--apply] [--limit N]

  Default: --only-null (rows where search_volume IS NULL), dry run (no paid calls).
  --all    Override: enrich ALL rows for the site, even if already enriched.
  --apply  Actually run paid DataForSEO calls and write UPDATEs to Supabase.
  --limit  Cap keyword count (safety; applied before batching).

Without --apply this is a pure dry-run: only SELECTs + prints counts. Zero paid calls.
"""
from __future__ import annotations

import argparse
import math
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

import httpx

SUPABASE_ACCESS_TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
MGMT_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"

# ponytail: same connection approach as _expansion_sql.py
def sql(query: str) -> list[dict]:
    r = httpx.post(
        MGMT_URL,
        headers={
            "Authorization": f"Bearer {SUPABASE_ACCESS_TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "enrich_blog_topics",
        },
        json={"query": query},
        timeout=120,
    )
    r.raise_for_status()
    return r.json()


CHUNK = 200  # google_ads search_volume rejects the whole task on large/odd batches (643 failed, 120 ok)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Enrich blog_topics with DataForSEO volumes.")
    p.add_argument("site_key", help="e.g. contractors-ir35, dentists, agency")
    p.add_argument("--all", dest="all_rows", action="store_true",
                   help="Enrich all rows, not just null search_volume")
    p.add_argument("--apply", action="store_true",
                   help="Run paid calls + write UPDATEs. Without this = dry run.")
    p.add_argument("--limit", type=int, default=None,
                   help="Cap keyword count (safety).")
    return p.parse_args()


def select_rows(site_key: str, only_null: bool) -> list[dict]:
    null_filter = "AND search_volume IS NULL" if only_null else ""
    q = f"""
        SELECT id, primary_keyword, topic
        FROM blog_topics
        WHERE site_key = '{site_key}' {null_filter}
        ORDER BY id
    """
    return sql(q)


def build_kw_map(rows: list[dict]) -> tuple[list[str], dict[str, list[int]]]:
    """Return deduplicated keyword list and mapping keyword_lower -> [row_id, ...]."""
    kw_to_ids: dict[str, list[int]] = defaultdict(list)
    kw_display: dict[str, str] = {}  # lower -> display form (first seen)
    for row in rows:
        kw = (row.get("primary_keyword") or row.get("topic") or "").strip()
        if not kw:
            continue
        lower = kw.lower()
        kw_to_ids[lower].append(row["id"])
        if lower not in kw_display:
            kw_display[lower] = kw
    # Return in stable order; display form used for API calls
    ordered = list(kw_display.values())
    return ordered, {k.lower(): v for k, v in kw_to_ids.items()}


def estimate_cost(n_keywords: int) -> float:
    """Estimate total cost: SV + bulk_KD per chunk."""
    n_chunks = math.ceil(n_keywords / CHUNK)
    # SV: $0.075 base + $0.0015 per kw per chunk
    sv_cost = n_chunks * 0.075 + n_keywords * 0.0015
    # bulk_KD: $0.01 flat per task (up to 1000 kw) per chunk
    kd_cost = n_chunks * 0.01
    return sv_cost + kd_cost


def run_paid_pulls(
    site_key: str,
    keywords: list[str],
) -> tuple[dict[str, Optional[int]], dict[str, Optional[float]], dict[str, Optional[float]]]:
    """Call DataForSEO for SV + KD. Returns dicts keyed by keyword.lower().

    Only called when --apply is set.
    """
    from optimisation_engine.clients.dataforseo_client import DataForSEOClient
    from optimisation_engine.config import DATAFORSEO_LOCATION_CODE_UK, DATAFORSEO_LANGUAGE_CODE_EN

    client = DataForSEOClient()
    vol_map: dict[str, Optional[int]] = {}
    kd_map: dict[str, Optional[float]] = {}
    comp_map: dict[str, Optional[float]] = {}

    for i in range(0, len(keywords), CHUNK):
        chunk = keywords[i : i + CHUNK]
        chunk_label = f"{site_key}:enrich:{i}:{i+len(chunk)}"

        # google_ads rejects the WHOLE task if any keyword is >80 chars or >10 words.
        # Long/messy topic-title fallbacks are dropped here (they get search_volume=0).
        sv_chunk = [k for k in chunk
                    if len(k) <= 80 and len(k.split()) <= 10
                    and re.fullmatch(r"[a-z0-9 '\-]+", k.lower())]

        # 1. Search volume (google_ads)
        sv_resp = client._post_paid(
            "keywords_data/google_ads/search_volume/live",
            [{"keywords": sv_chunk, "location_code": DATAFORSEO_LOCATION_CODE_UK,
              "language_code": DATAFORSEO_LANGUAGE_CODE_EN}],
            site_key=site_key,
            expected_rows=len(sv_chunk),
            seed_keyword=chunk_label,
        ) if sv_chunk else {"tasks": [], "cost": 0}
        for task in sv_resp.get("tasks", []):
            for res in (task.get("result") or []):
                kw = (res.get("keyword") or "").lower()
                if kw:
                    vol_map[kw] = res.get("search_volume")
                    comp_map[kw] = res.get("competition")

        # 2. Bulk keyword difficulty (flat per task up to 1000)
        kd_resp = client.bulk_keyword_difficulty(site_key=site_key, keywords=chunk)
        for task in kd_resp.get("tasks", []):
            for res in (task.get("result") or []):
                for item in (res.get("items") or []):
                    kw = (item.get("keyword") or "").lower()
                    if kw:
                        kd_map[kw] = item.get("keyword_difficulty")

        print(f"  chunk {i//CHUNK + 1}: {len(chunk)} kw, "
              f"sv_cost=${sv_resp.get('cost', '?')}, kd_cost=${kd_resp.get('cost', '?')}")

    return vol_map, kd_map, comp_map


def apply_updates(
    rows: list[dict],
    kw_to_ids: dict[str, list[int]],
    vol_map: dict[str, Optional[int]],
    kd_map: dict[str, Optional[float]],
    comp_map: dict[str, Optional[float]],
) -> tuple[int, int]:
    """Write UPDATEs to blog_topics. Returns (updated_count, zero_vol_count)."""
    updated = 0
    zero_vol = 0
    tuples = []

    for row in rows:
        kw = (row.get("primary_keyword") or row.get("topic") or "").strip()
        if not kw:
            continue
        lower = kw.lower()
        vol = vol_map.get(lower)
        kd = kd_map.get(lower)
        comp = comp_map.get(lower)

        # Keywords with no DFS result -> set 0 so we don't re-pull forever
        sv_val = vol if vol is not None else 0
        if sv_val == 0:
            zero_vol += 1

        kd_val = "NULL" if kd is None else str(int(round(kd)))
        comp_val = "NULL" if comp is None else "'" + str(comp).replace("'", "''") + "'"
        rid = str(row["id"]).replace("'", "''")
        tuples.append(f"('{rid}', {sv_val}, {kd_val}, {comp_val})")
        updated += 1

    if not tuples:
        return 0, 0

    # Single bulk UPDATE via VALUES (id is text -> quote it)
    for i in range(0, len(tuples), 500):
        chunk = ",".join(tuples[i:i + 500])
        sql(f"""
            UPDATE blog_topics bt
            SET search_volume = v.sv,
                keyword_difficulty = COALESCE(v.kd, bt.keyword_difficulty),
                competition = COALESCE(v.comp, bt.competition),
                updated_at = now()
            FROM (VALUES {chunk}) AS v(id, sv, kd, comp)
            WHERE bt.id = v.id
        """)

    return updated, zero_vol


def redecile_priority(site_key: str) -> None:
    """Rank all rows for site by search_volume DESC, assign priority 1-10 by decile."""
    sql(f"""
        WITH ranked AS (
            SELECT id,
                   NTILE(10) OVER (ORDER BY search_volume DESC NULLS LAST) AS decile
            FROM blog_topics
            WHERE site_key = '{site_key}'
        )
        UPDATE blog_topics bt
        SET priority = ranked.decile
        FROM ranked
        WHERE bt.id = ranked.id
    """)


def priority_distribution(site_key: str) -> list[dict]:
    return sql(f"""
        SELECT priority, COUNT(*) AS cnt
        FROM blog_topics
        WHERE site_key = '{site_key}'
        GROUP BY priority
        ORDER BY priority
    """)


def top_keywords(site_key: str, n: int = 15) -> list[dict]:
    return sql(f"""
        SELECT primary_keyword, topic, search_volume, keyword_difficulty, priority
        FROM blog_topics
        WHERE site_key = '{site_key}'
          AND search_volume IS NOT NULL
          AND search_volume > 0
        ORDER BY search_volume DESC
        LIMIT {n}
    """)


def main() -> None:
    args = parse_args()
    only_null = not args.all_rows

    print(f"\n=== enrich_blog_topics: {args.site_key} ===")
    print(f"  mode      : {'DRY RUN (no paid calls)' if not args.apply else 'APPLY (paid calls + writes)'}")
    print(f"  filter    : {'search_volume IS NULL' if only_null else 'ALL rows'}")
    if args.limit:
        print(f"  limit     : {args.limit} keywords")

    # 1. SELECT
    rows = select_rows(args.site_key, only_null)
    print(f"\n  rows selected : {len(rows)}")

    if not rows:
        print("  Nothing to enrich. Done.")
        return

    # 2. Build keyword map
    keywords, kw_to_ids = build_kw_map(rows)
    if args.limit:
        keywords = keywords[: args.limit]
    print(f"  unique keywords: {len(keywords)}")

    # 3. Cost estimate
    est = estimate_cost(len(keywords))
    print(f"  estimated cost : ${est:.4f}")

    if not args.apply:
        print("\n--- DRY RUN: no paid calls made, no writes performed ---")
        print(f"Run with --apply to enrich {len(keywords)} keywords for {args.site_key}.")
        return

    # === APPLY PATH (paid) ===
    # ponytail: cache the pull to disk BEFORE writing, so a DB-write crash never re-costs a paid pull
    import json, os
    cache_path = f"expansion_research/_enrich_cache_{args.site_key}.json"
    if os.path.exists(cache_path):
        print(f"\nLoading cached pull from {cache_path} (no paid call)...")
        with open(cache_path) as f:
            c = json.load(f)
        vol_map, kd_map, comp_map = c["vol"], c["kd"], c["comp"]
    else:
        print("\nPulling DataForSEO data...")
        vol_map, kd_map, comp_map = run_paid_pulls(args.site_key, keywords)
        with open(cache_path, "w") as f:
            json.dump({"vol": vol_map, "kd": kd_map, "comp": comp_map}, f)
        print(f"  cached pull -> {cache_path}")

    print("Writing UPDATEs...")
    updated, zero_vol = apply_updates(rows, kw_to_ids, vol_map, kd_map, comp_map)

    print("Re-deciling priority...")
    redecile_priority(args.site_key)

    # Summary
    dist = priority_distribution(args.site_key)
    top = top_keywords(args.site_key)

    print(f"\n=== SUMMARY ===")
    print(f"  rows selected        : {len(rows)}")
    print(f"  unique keywords      : {len(keywords)}")
    print(f"  estimated cost       : ${est:.4f}")
    print(f"  rows updated         : {updated}")
    print(f"  zero-volume keywords : {zero_vol}")

    print(f"\n  Top 15 keywords by volume:")
    print(f"  {'keyword':<50} {'vol':>7}  {'KD':>4}  {'p':>2}")
    print(f"  {'-'*50} {'-------':>7}  {'----':>4}  {'--':>2}")
    for r in top:
        kw = (r.get("primary_keyword") or r.get("topic") or "")[:50]
        print(f"  {kw:<50} {r.get('search_volume') or 0:>7}  {r.get('keyword_difficulty') or '':>4}  {r.get('priority') or '':>2}")

    print(f"\n  Priority decile distribution:")
    for d in dist:
        print(f"    priority {d.get('priority') or 'NULL':>4}: {d.get('cnt'):>5} rows")


if __name__ == "__main__":
    main()
