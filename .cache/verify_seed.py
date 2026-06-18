"""Verify contractors-ir35 blog_topics seed (SEED-VERIFIED gate)."""
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REF = "dhlxwmvmkrfnmcgjbntk"


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")


def run_sql(sql: str) -> str:
    url = f"https://api.supabase.com/v1/projects/{REF}/database/query"
    req = urllib.request.Request(
        url, data=json.dumps({"query": sql}).encode(), method="POST",
        headers={
            "Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
            "Content-Type": "application/json",
            "User-Agent": "accounting-network-migrator/1.0",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode()


print(run_sql(
    "SELECT category, content_tier, count(*) FROM blog_topics "
    "WHERE site_key='contractors-ir35' GROUP BY category, content_tier "
    "ORDER BY category, content_tier"
))
print(run_sql(
    "SELECT count(*) AS total, count(DISTINCT topic) AS distinct_topics, "
    "count(*) FILTER (WHERE used) AS used "
    "FROM blog_topics WHERE site_key='contractors-ir35'"
))
