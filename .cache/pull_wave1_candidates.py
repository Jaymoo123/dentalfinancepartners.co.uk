"""Pull wave-1 candidate topics for contractors-ir35 (manager slice)."""
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


rows = json.loads(run_sql(
    "SELECT topic, category, content_tier, primary_keyword, publish_priority, slug "
    "FROM blog_topics WHERE site_key='contractors-ir35' "
    "ORDER BY publish_priority DESC NULLS LAST, content_tier ASC, created_at ASC "
    "LIMIT 45"
))
for r in rows:
    print(f"[{r['content_tier']:7}] [{r['category']:30}] prio={r.get('publish_priority')} :: {r['topic']}")
