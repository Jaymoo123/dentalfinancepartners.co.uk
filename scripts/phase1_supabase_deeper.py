"""Deeper Phase 1 audit: sites table contents + per-table column schemas."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from shared_supabase_config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

import requests  # noqa: E402

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}


def fetch_all(table: str, limit: int = 1000) -> list[dict]:
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}?select=*&limit={limit}"
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    return r.json()


def fetch_columns(table: str) -> list[str]:
    """Fetch one row to get column names."""
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}?select=*&limit=1"
    r = requests.get(url, headers=HEADERS, timeout=10)
    if r.status_code in (200, 206) and r.json():
        return list(r.json()[0].keys())
    return []


def main() -> None:
    print("=" * 70)
    print("PHASE 1: DEEPER SCHEMA AUDIT")
    print("=" * 70)

    print("\n[1] Sites table contents (full):")
    sites = fetch_all("sites")
    for s in sites:
        print(f"  - site_key={s.get('site_key')!r}")
        for k, v in s.items():
            if k != "site_key":
                vstr = str(v)[:80]
                print(f"      {k}: {vstr}")
        print()

    print("[2] Per-site blog_topics_* table column schemas:")
    for tbl in [
        "blog_topics_dentists",
        "blog_topics_property",
        "blog_topics_medical",
        "blog_topics_solicitors",
        "blog_topics_agency",
        "blog_topics_generalist",
    ]:
        cols = fetch_columns(tbl)
        print(f"  {tbl} ({len(cols)} columns):")
        print(f"    {', '.join(cols)}")
        print()

    print("[3] Leads table sample (anonymised — emails/phones partially redacted):")
    leads = fetch_all("leads", limit=20)
    print(f"  Total leads in DB: {len(leads)}")
    print(f"  Sources represented: {sorted(set(l.get('source', '?') for l in leads))}")
    print(f"  Columns: {list(leads[0].keys()) if leads else 'empty'}")
    print()

    print("[4] Sites registered in sites table vs sites known to exist:")
    registered = {s.get("site_key") for s in sites}
    known = {"dentists", "property", "medical", "solicitors", "agency", "generalist", "general"}
    print(f"  Registered: {sorted(registered)}")
    print(f"  Expected: {sorted(known)}")
    print(f"  Missing from sites table: {sorted(known - registered)}")
    print(f"  Unexpected in sites table: {sorted(registered - known)}")

    # Save raw JSON for follow-up
    out = {
        "sites": sites,
        "blog_topics_schemas": {
            tbl: fetch_columns(tbl)
            for tbl in [
                "blog_topics_dentists",
                "blog_topics_property",
                "blog_topics_medical",
                "blog_topics_solicitors",
                "blog_topics_agency",
                "blog_topics_generalist",
            ]
        },
        "leads_count": len(leads),
        "leads_sources": sorted(set(l.get("source", "?") for l in leads)),
    }
    out_path = Path(__file__).parent.parent / "docs" / "phase1_supabase_deeper.json"
    out_path.write_text(json.dumps(out, indent=2, default=str), encoding="utf-8")
    print(f"\n  Saved: {out_path}")


if __name__ == "__main__":
    main()
