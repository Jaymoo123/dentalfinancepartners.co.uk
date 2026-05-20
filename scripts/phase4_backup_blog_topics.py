"""Phase 4 step 0: backup every row from all 6 blog_topics_* tables to JSON.

Each backup is a logical snapshot — usable for re-INSERT if the old table is
still around, or for forensic inspection if it isn't. The original tables
remain in place for 30 days after migration (Phase 4 soak), so this backup
serves as both belt and braces.

Run before any DDL is applied. Idempotent (overwrites existing backup files).
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from shared_supabase_config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

import requests  # noqa: E402

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

TABLES = [
    "blog_topics_dentists",
    "blog_topics_property",
    "blog_topics_medical",
    "blog_topics_solicitors",
    "blog_topics_agency",
    "blog_topics_generalist",
]


def fetch_all(table: str) -> list[dict]:
    """Page through all rows (PostgREST max 1000 per request)."""
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/{table}?select=*"
    out: list[dict] = []
    offset = 0
    while True:
        headers = {**HEADERS, "Range": f"{offset}-{offset + 999}"}
        r = requests.get(url, headers=headers, timeout=30)
        if r.status_code not in (200, 206):
            raise RuntimeError(f"Fetch {table} offset={offset} failed: {r.status_code} {r.text[:200]}")
        rows = r.json()
        out.extend(rows)
        if len(rows) < 1000:
            break
        offset += 1000
    return out


def main() -> None:
    backup_dir = Path(__file__).parent.parent / "docs" / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")

    summary: dict[str, dict] = {}
    for table in TABLES:
        print(f"Backing up {table}...")
        rows = fetch_all(table)
        out_path = backup_dir / f"{table}_{timestamp}.json"
        out_path.write_text(json.dumps(rows, indent=2, default=str), encoding="utf-8")
        summary[table] = {"row_count": len(rows), "file": str(out_path.name)}
        print(f"  -> {len(rows)} rows -> {out_path.name}")

    summary_path = backup_dir / f"_summary_{timestamp}.json"
    summary_path.write_text(json.dumps({
        "timestamp_utc": timestamp,
        "tables": summary,
        "total_rows": sum(s["row_count"] for s in summary.values()),
    }, indent=2), encoding="utf-8")
    print(f"\nBackup summary: {summary_path}")
    print(f"Total rows backed up: {sum(s['row_count'] for s in summary.values())}")


if __name__ == "__main__":
    main()
