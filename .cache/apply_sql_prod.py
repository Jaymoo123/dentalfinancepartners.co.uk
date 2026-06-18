"""Run SQL against the prod Supabase project via the Management API.

  python .cache/apply_sql_prod.py --sql "SELECT ..."
  python .cache/apply_sql_prod.py --file supabase/migrations/XXX.sql

Reuses the documented prod ref + SUPABASE_ACCESS_TOKEN from .env.
"""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD_REF = "dhlxwmvmkrfnmcgjbntk"


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")


def run_sql(sql: str) -> tuple[bool, str]:
    token = load_env("SUPABASE_ACCESS_TOKEN")
    url = f"https://api.supabase.com/v1/projects/{PROD_REF}/database/query"
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "User-Agent": "accounting-network-migrator/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return True, resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8')[:800]}"
    except Exception as e:  # noqa: BLE001
        return False, f"{type(e).__name__}: {e}"


def main() -> None:
    args = sys.argv[1:]
    if not args:
        raise SystemExit("usage: --sql <SQL> | --file <path>")
    if args[0] == "--file":
        sql = (ROOT / args[1]).read_text(encoding="utf-8")
    elif args[0] == "--sql":
        sql = args[1]
    else:
        raise SystemExit("first arg must be --sql or --file")
    ok, msg = run_sql(sql)
    print("OK" if ok else "FAIL")
    print(msg)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
