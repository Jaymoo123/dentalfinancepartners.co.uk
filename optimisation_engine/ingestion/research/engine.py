"""Research data ingestion engine -- config-driven orchestrator.

Replaces ingest_landlord_data.py / ingest_construction_data.py /
ingest_contractor_data.py with one engine driven by NicheConfig.

Usage:
  python -m optimisation_engine.ingestion.research.engine --site property --pilot --no-supabase
  python -m optimisation_engine.ingestion.research.engine --site construction-cis --execute --no-supabase
  python -m optimisation_engine.ingestion.research.engine --site property --execute
"""
from __future__ import annotations

import argparse
import csv
import importlib
import json
import os
import sys
import tempfile
from datetime import date
from typing import Any

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

from .cache import cache_insert, cache_lookup, cached_months_set, rows_from_cache
from .companies_house import fetch_segmented_incorporations, month_windows
from .niches import NICHE_CONFIGS
from .snapshot import build_snapshot


def _load_fetcher(dotted_path: str):
    """Resolve 'pkg.mod.func' to the callable."""
    mod_path, fn_name = dotted_path.rsplit(".", 1)
    mod = importlib.import_module(mod_path)
    return getattr(mod, fn_name)


def _call_secondary(fetcher_path: str, start_month: str) -> Any:
    """Call a secondary fetcher with start_month if it accepts it."""
    fn = _load_fetcher(fetcher_path)
    try:
        return fn(start_month)
    except TypeError:
        return fn()


def upsert(table: str, rows: list[dict[str, Any]], conflict: str) -> int:
    import httpx
    if not rows:
        return 0
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    total = 0
    for i in range(0, len(rows), 500):
        chunk = rows[i : i + 500]
        import httpx as _httpx
        r = _httpx.post(url, headers=headers, params={"on_conflict": conflict}, json=chunk, timeout=30.0)
        if r.status_code >= 400:
            raise RuntimeError(f"{table} upsert failed: {r.status_code} {r.text[:300]}")
        total += len(chunk)
    return total


def _self_check(snapshot: dict[str, Any], cfg_provisional_months: int) -> list[str]:
    """Generic structural invariants. Returns list of failures (empty = pass)."""
    failures = []
    monthly = snapshot.get("incorporations", {}).get("monthly", [])
    if not monthly:
        failures.append("incorporations.monthly is empty")
        return failures
    months = [r["month"] for r in monthly]
    if months != sorted(months):
        failures.append("incorporations.monthly months not monotonically increasing")
    for r in monthly:
        for k, v in r.items():
            if k != "month" and isinstance(v, (int, float)) and v < 0:
                failures.append(f"negative count: month={r['month']} key={k} value={v}")
    # Provisional tail present
    prov = snapshot.get("meta", {}).get("provisional_months", [])
    if cfg_provisional_months > 0 and not prov:
        failures.append("provisional_months list is empty but provisional_months > 0")
    return failures


def main() -> None:
    ap = argparse.ArgumentParser(description="Research data ingestion engine.")
    ap.add_argument("--site", required=True, help="site_key (e.g. property, construction-cis)")
    ap.add_argument("--pilot", action="store_true", help="Fetch + summarise + write to temp path; do not overwrite committed snapshot")
    ap.add_argument("--dry-run", action="store_true", help="Fetch + summarise; write nothing")
    ap.add_argument("--execute", action="store_true", help="Write snapshot to configured path (+ Supabase unless --no-supabase)")
    ap.add_argument("--months", type=int, default=132, help="Months of CH history (default 132)")
    ap.add_argument("--no-supabase", action="store_true", help="Skip Supabase cache reads/writes and table upserts")
    args = ap.parse_args()

    if not args.dry_run and not args.execute and not args.pilot:
        ap.error("pass --pilot, --dry-run, or --execute")

    cfg = NICHE_CONFIGS.get(args.site)
    if not cfg:
        ap.error(f"Unknown site '{args.site}'. Known: {', '.join(sorted(NICHE_CONFIGS))}")

    all_sics = list(cfg.sic_labels.keys())
    windows = month_windows(args.months)
    start_month = windows[0]["month"]
    print(
        f"=== {cfg.site_key}: {len(windows)} months ({windows[0]['month']} .. {windows[-1]['month']}) "
        f"x {len(all_sics)} SIC codes + 1 union = {len(windows) * (len(all_sics) + 1)} total CH calls ===",
        flush=True,
    )

    # Cache: load existing rows, skip settled months already cached
    cached_rows: list[dict[str, Any]] = []
    hit_months: set[str] = set()
    if not args.no_supabase:
        try:
            cached_rows = cache_lookup(cfg.site_key)
            hit_months = cached_months_set(cached_rows)
            print(f"  [cache] {len(cached_rows)} rows from Supabase cache ({len(hit_months)} months hit)", flush=True)
        except Exception as e:
            print(f"  [cache] lookup failed (continuing without cache): {e}", flush=True)

    # Fetch from CH (cache-aware)
    fresh_rows = fetch_segmented_incorporations(cfg, windows, hit_months if not args.no_supabase else None)

    # Merge cache + fresh rows
    all_rows = rows_from_cache(cached_rows, cfg.sic_labels) + fresh_rows

    incorp_through = windows[-1]["month"]

    # Secondary sources
    secondary_data: dict[str, Any] = {}
    _hpi_through_date: str | None = None
    for ss in cfg.secondary_sources:
        print(f"=== Secondary: {ss.label} ===", flush=True)
        try:
            result = _call_secondary(ss.fetcher, start_month)
            if result is not None:
                secondary_data[ss.key] = result
                if isinstance(result, dict) and "monthly" in result:
                    print(f"  {len(result['monthly'])} monthly rows", flush=True)
                elif isinstance(result, tuple):
                    # (rows, through) pattern from land_registry
                    rows_list, through = result
                    print(f"  {len(rows_list)} rows through {through}", flush=True)
                    secondary_data[ss.key] = {"rows": rows_list, "through": through}
            else:
                if not ss.optional:
                    raise RuntimeError(f"Non-optional secondary source {ss.key} returned None")
                print(f"  [optional] {ss.key} returned None, skipping", flush=True)
        except Exception as e:
            if ss.optional:
                print(f"  [optional] {ss.key} failed (continuing): {e}", flush=True)
            else:
                raise

    # For land_registry: reformat the (rows, through) into the house_prices structure
    # matching the oracle schema {regions, monthly, latest}
    if "land_registry" in secondary_data and isinstance(secondary_data["land_registry"], dict) and "rows" in secondary_data["land_registry"]:
        hpi = secondary_data["land_registry"]["rows"]
        hpi_through = secondary_data["land_registry"]["through"]
        # stash through-date; popped before build_snapshot, injected into meta after
        _hpi_through_date = hpi_through
        from .fetchers.land_registry import HPI_REGIONS
        hp_by_month: dict[str, dict[str, Any]] = {}
        hp_latest: dict[str, dict[str, Any]] = {}
        hp_latest_month = ""
        for r in hpi:
            if r["metric"] == "avg_price":
                hp_by_month.setdefault(r["month"], {})[r["region"]] = r["value"]
                if r["month"] > hp_latest_month:
                    hp_latest_month = r["month"]
        for r in hpi:
            if r["month"] == hp_latest_month:
                entry = hp_latest.setdefault(r["region"], {})
                entry["price" if r["metric"] == "avg_price" else "annual_change_pct"] = r["value"]
        hp_monthly = [{"month": m, **hp_by_month[m]} for m in sorted(hp_by_month)]
        secondary_data["land_registry"] = {
            "regions": HPI_REGIONS,
            "monthly": hp_monthly,
            "latest": hp_latest,
        }
        print(f"  parsed {len(hp_monthly)} monthly HPI rows; through {hpi_through}", flush=True)

    snapshot = build_snapshot(cfg, all_rows, incorp_through, secondary_data if secondary_data else None)

    # Inject land_registry through-date into meta.house_prices_through (oracle field)
    if _hpi_through_date:
        snapshot["meta"]["house_prices_through"] = _hpi_through_date

    # Print headline
    h = snapshot["headline"]
    pfx = cfg.headline_prefix
    print(f"\n=== Headline (settled data only) ===")
    print(f"  Last settled month: {h.get('last_settled_month')}")
    print(f"  {pfx}_cos_settled: {h.get(f'{pfx}_cos_settled')}")
    print(f"  {pfx}_cos_yoy_pct: {h.get(f'{pfx}_cos_yoy_pct')}%")
    print(f"  {pfx}_cos_ttm: {h.get(f'{pfx}_cos_ttm')}")
    print(f"  {cfg.union_ttm_key}: {h.get(cfg.union_ttm_key)}")
    print(f"  Provisional (excluded): {snapshot['meta']['provisional_months']}")
    if h.get("thin"):
        print("  WARNING: primary segment is THIN")

    # Self-check
    failures = _self_check(snapshot, cfg.provisional_months)
    if failures:
        print("\n[self-check] FAILED:")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)
    else:
        print("\n[self-check] PASS")

    if args.dry_run:
        print("\n[dry-run] no files or DB writes.")
        return

    # Determine output path
    if args.pilot:
        tmp = tempfile.NamedTemporaryFile(
            mode="w", suffix=f"_{cfg.site_key}_snapshot.json",
            delete=False, encoding="utf-8",
        )
        out_path = tmp.name
        tmp.close()
    else:
        out_path = cfg.snapshot_path

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)
    print(f"\n[snapshot] wrote {out_path}")

    # CSV alongside JSON
    csv_path = out_path.replace(".json", ".csv")
    monthly = snapshot["incorporations"]["monthly"]
    if monthly:
        fieldnames = list(monthly[0].keys())
        with open(csv_path, "w", newline="", encoding="utf-8") as cf:
            w = csv.DictWriter(cf, fieldnames=fieldnames)
            w.writeheader()
            w.writerows(monthly)
        print(f"[csv] wrote {csv_path}")

    # Cache write (fresh rows only)
    if not args.no_supabase and fresh_rows and args.execute:
        try:
            cache_insert(cfg.site_key, fresh_rows)
            print(f"[cache] inserted {len(fresh_rows)} rows")
        except Exception as e:
            print(f"[cache] insert failed (non-fatal): {e}", flush=True)

    # Supabase upsert (only under --execute)
    if args.execute and not args.no_supabase and cfg.supabase_table:
        # Strip fields not in the original DB schemas (division) before upsert
        db_rows = [
            {k: v for k, v in row.items() if k not in ("division", "sic_label")}
            for row in fresh_rows
        ]
        n = upsert(cfg.supabase_table, db_rows, "month,sic_code")
        print(f"[supabase] upserted {cfg.supabase_table}={n}")
    else:
        if args.execute:
            print("[supabase] skipped (--no-supabase or no table configured)")

    if args.pilot:
        print(f"\n[pilot] temp snapshot: {out_path}")
        print("[pilot] diff against committed oracle to verify parity")


if __name__ == "__main__":
    main()
