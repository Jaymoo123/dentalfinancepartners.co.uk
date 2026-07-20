"""Generic READ-only SQL runner against prod Supabase (Management API).
Usage:  python scripts/_q.py path/to/query.sql      # prints JSON rows
        echo "SELECT 1" | python scripts/_q.py -     # read SQL from stdin
Scratch helper for the monitored-pages evaluation. Safe: SELECT-only intended.
"""
import json, os, sys
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def run(query: str):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": query}, timeout=120)
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:800]}", file=sys.stderr)
        sys.exit(1)
    return r.json()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: python scripts/_q.py <file.sql|->", file=sys.stderr); sys.exit(2)
    src = sys.argv[1]
    q = sys.stdin.read() if src == "-" else open(src, encoding="utf-8").read()
    print(json.dumps(run(q), indent=2, default=str))
