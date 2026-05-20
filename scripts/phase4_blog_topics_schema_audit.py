"""Detailed schema + data-shape audit of all 6 blog_topics_* tables.

Reads one full sample row from each table to understand actual data types,
default values, and edge cases (NULL handling, JSON shape for arrays,
date formats etc.). This informs the union schema design for Phase 4.
"""
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
}


def fetch_sample(table: str) -> list[dict]:
    """Return 2 sample rows: one with used=True or status='published', one fresh."""
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}?select=*&limit=2"
    r = requests.get(url, headers=HEADERS, timeout=10)
    if r.status_code in (200, 206):
        return r.json()
    return []


def column_types_from_sample(rows: list[dict]) -> dict[str, str]:
    """Infer type from sample values."""
    if not rows:
        return {}
    types: dict[str, str] = {}
    for row in rows:
        for col, val in row.items():
            if col in types:
                continue
            if val is None:
                continue
            if isinstance(val, bool):
                types[col] = "boolean"
            elif isinstance(val, int):
                types[col] = "integer"
            elif isinstance(val, float):
                types[col] = "numeric"
            elif isinstance(val, (list, dict)):
                types[col] = "jsonb"
            elif isinstance(val, str):
                # detect timestamps
                if "T" in val and (val.endswith("Z") or "+" in val[-6:]):
                    types[col] = "timestamptz"
                elif len(val) == 10 and val[4] == "-" and val[7] == "-":
                    types[col] = "date"
                else:
                    types[col] = "text"
    return types


def main() -> None:
    tables = [
        "blog_topics_dentists",
        "blog_topics_property",
        "blog_topics_medical",
        "blog_topics_solicitors",
        "blog_topics_agency",
        "blog_topics_generalist",
    ]

    all_columns: dict[str, set[str]] = {}
    all_types: dict[str, dict[str, str]] = {}
    sample_data: dict[str, list[dict]] = {}

    for tbl in tables:
        rows = fetch_sample(tbl)
        sample_data[tbl] = rows
        if rows:
            all_columns[tbl] = set(rows[0].keys())
            all_types[tbl] = column_types_from_sample(rows)
        else:
            all_columns[tbl] = set()
            all_types[tbl] = {}

    # Union of all columns across all 6 tables
    union_cols = set().union(*all_columns.values())

    print("=" * 70)
    print(f"UNION COLUMN MATRIX: {len(union_cols)} unique columns across 6 tables")
    print("=" * 70)
    # Sorted matrix: column -> which tables have it, with type
    print(f"\n{'column':<25} | {'dentists':<10}|{'property':<10}|{'medical':<10}|{'solicit':<10}|{'agency':<10}|{'general':<10}")
    print("-" * 105)
    for col in sorted(union_cols):
        row = []
        for tbl in tables:
            short = tbl.replace("blog_topics_", "")[:9]
            if col in all_columns[tbl]:
                t = all_types[tbl].get(col, "?")
                row.append(f"{t:<10}")
            else:
                row.append(f"{'—':<10}")
        print(f"{col:<25} | {'|'.join(row)}")

    # Save raw
    out = Path(__file__).parent.parent / "docs" / "phase4_schema_audit.json"
    out.write_text(json.dumps({
        "columns_per_table": {k: sorted(v) for k, v in all_columns.items()},
        "types_per_table": all_types,
        "samples": sample_data,
    }, indent=2, default=str), encoding="utf-8")
    print(f"\nFull audit: {out}")


if __name__ == "__main__":
    main()
