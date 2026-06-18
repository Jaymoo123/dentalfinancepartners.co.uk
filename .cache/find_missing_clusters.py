"""Find the FRS-VAT and carry-forward topic rows."""
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
    raise SystemExit(f"{key} not found")


def run_sql(sql: str) -> list:
    url = f"https://api.supabase.com/v1/projects/{REF}/database/query"
    req = urllib.request.Request(
        url, data=json.dumps({"query": sql}).encode(), method="POST",
        headers={"Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
                 "Content-Type": "application/json",
                 "User-Agent": "accounting-network-migrator/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode())


for pat in ["%limited cost%", "%flat rate%", "%carry forward%", "%carry-forward%"]:
    rows = run_sql(
        "SELECT topic, category, content_tier FROM blog_topics "
        f"WHERE site_key='contractors-ir35' AND used=false AND topic ILIKE '{pat}' LIMIT 12")
    print(f"[{pat}] -> {len(rows)}")
    for r in rows:
        print(f"   {r['content_tier']:7} [{r['category']}] {r['topic']}")
