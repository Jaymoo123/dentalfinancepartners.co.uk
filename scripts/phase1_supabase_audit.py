"""Phase 1 read-only Supabase schema audit.

Queries the public schema for: all tables, per-table row counts, column lists,
and RLS policies. Output captured to docs/MULTI_SITE_INFRASTRUCTURE.md for the
infrastructure refactor.

Read-only. No writes. Safe to run repeatedly.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).parent.parent))
from shared_supabase_config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

import requests  # noqa: E402

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

# Use Postgres meta endpoint via RPC if available, else fall back to PostgREST
# introspection. Supabase exposes a SQL endpoint at /rest/v1/rpc for stored
# procedures, and pg_meta via the management API. We'll try the postgrest
# OPTIONS approach first (introspection), then PostgREST `/?select=*&limit=0`
# per known table.


def list_tables_via_pg_meta() -> list[dict[str, Any]]:
    """Try the Supabase pg_meta endpoint (admin only)."""
    base = SUPABASE_URL.rstrip("/")
    # pg_meta is at /pg/tables (admin)
    candidates = [
        f"{base}/pg/tables?schema=public",
        f"{base}/rest/v1/?select=__tables",
    ]
    for url in candidates:
        try:
            r = requests.get(url, headers=HEADERS, timeout=10)
            if r.status_code == 200:
                return r.json()
        except Exception:
            continue
    return []


def query_rpc(name: str, params: dict[str, Any] | None = None) -> Any:
    base = SUPABASE_URL.rstrip("/")
    url = f"{base}/rest/v1/rpc/{name}"
    r = requests.post(url, headers=HEADERS, json=params or {}, timeout=15)
    if r.status_code in (200, 201, 204):
        try:
            return r.json()
        except Exception:
            return None
    return {"error": r.status_code, "body": r.text[:400]}


def probe_known_tables() -> dict[str, dict[str, Any]]:
    """Probe each known table for existence + row count via PostgREST head/range."""
    base = SUPABASE_URL.rstrip("/")
    known = [
        # Confirmed multi-site (shared) tables
        "leads",
        "sites",
        "gsc_query_data",
        "bing_query_data",
        "dataforseo_keyword_data",
        "dataforseo_competitor_data",
        "api_cost_log",
        "optimisation_changes",
        "optimisation_opportunities",
        "apply_attempts",
        "meta_performance",
        # Per-site (need consolidation in Phase 4)
        "blog_topics_dentists",
        "blog_topics_property",
        "blog_topics_medical",
        "blog_topics_solicitors",
        "blog_topics_agency",
        "blog_topics_generalist",
        # Other tables mentioned in memory/code
        "gsc_page_performance",
        "blog_optimizations",
        "gsc_indexing_issues",
        "engine_flags",  # planned for Phase 5, probably doesn't exist yet
    ]
    out: dict[str, dict[str, Any]] = {}
    for tbl in known:
        url = f"{base}/rest/v1/{tbl}?select=*"
        headers = {**HEADERS, "Range-Unit": "items", "Range": "0-0", "Prefer": "count=exact"}
        try:
            r = requests.get(url, headers=headers, timeout=10)
            if r.status_code in (200, 206):
                # Content-Range: items 0-0/N
                cr = r.headers.get("Content-Range", "")
                total = cr.split("/")[-1] if "/" in cr else "?"
                # Sample row to get column names
                sample = r.json()
                cols = list(sample[0].keys()) if sample else []
                out[tbl] = {"exists": True, "row_count": total, "columns": cols}
            elif r.status_code == 404:
                out[tbl] = {"exists": False}
            else:
                out[tbl] = {"exists": "?", "status": r.status_code, "body": r.text[:200]}
        except Exception as e:
            out[tbl] = {"error": str(e)}
    return out


def main() -> None:
    print("=" * 70)
    print("PHASE 1: SUPABASE READ-ONLY SCHEMA AUDIT")
    print("=" * 70)
    print(f"Project: {SUPABASE_URL}")
    print()

    print("[1/2] Probing known tables for existence + row counts + columns...")
    table_info = probe_known_tables()

    # Categorise
    exists = {k: v for k, v in table_info.items() if v.get("exists") is True}
    missing = {k: v for k, v in table_info.items() if v.get("exists") is False}
    errors = {k: v for k, v in table_info.items() if "error" in v or v.get("exists") == "?"}

    print(f"\n  Tables that exist: {len(exists)}")
    for tbl, info in exists.items():
        cols_preview = ", ".join(info["columns"][:6])
        more = f" +{len(info['columns']) - 6} more" if len(info["columns"]) > 6 else ""
        print(f"    [OK]{tbl}: {info['row_count']} rows, cols: {cols_preview}{more}")

    print(f"\n  Tables missing (404): {len(missing)}")
    for tbl in missing:
        print(f"    [MISSING]{tbl}")

    if errors:
        print(f"\n  Tables with errors: {len(errors)}")
        for tbl, info in errors.items():
            print(f"    ? {tbl}: {info}")

    print("\n[2/2] Attempting RLS policy listing via pg_meta...")
    rls = query_rpc("get_rls_policies") if False else None  # placeholder
    # PostgREST doesn't expose pg_policies by default; we'd need a custom RPC.
    # For now, document that RLS listing requires either the Supabase dashboard
    # or a custom RPC, and leave it as a manual gate.
    print("  RLS policy enumeration via PostgREST is not available by default.")
    print("  Options:")
    print("    a) Use Supabase dashboard > Authentication > Policies (manual)")
    print("    b) Create a SECURITY DEFINER RPC that returns pg_policies (Phase 1 sub-task)")
    print("    c) Connect via direct psql with PostgreSQL connection string")

    # Save raw JSON output for follow-up
    out_path = Path(__file__).parent.parent / "docs" / "phase1_supabase_audit.json"
    out_path.write_text(json.dumps(table_info, indent=2, default=str), encoding="utf-8")
    print(f"\n  Full output written to: {out_path}")

    print("\n" + "=" * 70)
    print("AUDIT COMPLETE — see docs/phase1_supabase_audit.json")
    print("=" * 70)


if __name__ == "__main__":
    main()
