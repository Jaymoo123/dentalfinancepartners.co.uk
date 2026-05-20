"""Phase 1 RLS audit using the rls_audit RPC.

Prerequisite: migration 20260520000003_add_rls_audit_rpc.sql must be applied
to the target Supabase project. Apply via:
  - Supabase dashboard SQL editor (paste migration contents and run)
  - Or `npx supabase db push --linked` after supabase login + link

The RPC returns per-table policy metadata (no row data).
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
    "Content-Type": "application/json",
}


def main() -> None:
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/rpc/rls_audit"
    r = requests.post(url, headers=HEADERS, json={}, timeout=15)

    if r.status_code == 404 or "PGRST" in (r.text or ""):
        print("[NOT FOUND] rls_audit RPC does not exist on this project.")
        print(
            "Apply migration first: supabase/migrations/"
            "20260520000003_add_rls_audit_rpc.sql"
        )
        print("\nApplication options:")
        print("  1. Supabase dashboard > SQL Editor: paste migration, run")
        print("  2. `npx supabase db push --linked` after login + link")
        sys.exit(1)

    if r.status_code != 200:
        print(f"[FAIL] status={r.status_code} body={r.text[:400]}")
        sys.exit(1)

    rows = r.json()
    print(f"Found {len(rows)} tables in public schema.\n")

    has_rls = [r_ for r_ in rows if r_["rls_enabled"]]
    no_rls = [r_ for r_ in rows if not r_["rls_enabled"]]
    no_policies = [r_ for r_ in rows if r_["policy_count"] == 0 and r_["rls_enabled"]]

    print(f"Tables with RLS ENABLED: {len(has_rls)}")
    for row in has_rls:
        print(f"  [RLS] {row['table_name']}: {row['policy_count']} policies")

    print(f"\nTables WITHOUT RLS enabled (GAP): {len(no_rls)}")
    for row in no_rls:
        print(f"  [NO-RLS] {row['table_name']}")

    if no_policies:
        print(f"\nTables with RLS enabled but ZERO policies (effectively locked): {len(no_policies)}")
        for row in no_policies:
            print(f"  [LOCKED] {row['table_name']}")

    out_path = Path(__file__).parent.parent / "docs" / "phase1_rls_audit.json"
    out_path.write_text(json.dumps(rows, indent=2, default=str), encoding="utf-8")
    print(f"\nFull output written to: {out_path}")


if __name__ == "__main__":
    main()
