"""Apply a .sql migration file to the estate Supabase project via the Management API.

Usage:
    python scripts/Database/apply_migration.py supabase/migrations/<file>.sql [--dry-run]

Prints the constraint/def verification block itself; the migration file's own
trailing "-- Verify after applying" comment tells you what to check.
"""
from __future__ import annotations

import os
import sys

import httpx
from dotenv import load_dotenv

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(os.path.join(ROOT, ".env"))

PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def run_sql(query: str) -> object:
    token = os.getenv("SUPABASE_ACCESS_TOKEN")
    if not token:
        raise RuntimeError("SUPABASE_ACCESS_TOKEN missing from root .env")
    resp = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=180,
    )
    resp.raise_for_status()
    return resp.json()


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry_run = "--dry-run" in sys.argv
    if not args:
        print(__doc__)
        return 2

    path = args[0] if os.path.isabs(args[0]) else os.path.join(ROOT, args[0])
    with open(path, encoding="utf-8") as fh:
        sql = fh.read()

    print(f"[migration] {os.path.basename(path)}  ({len(sql)} chars)")
    if dry_run:
        print(sql)
        return 0

    result = run_sql(sql)
    print(f"[migration] applied OK -> {result}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
