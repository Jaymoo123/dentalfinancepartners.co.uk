"""Verify the Track B GEO measurement views on prod after migration."""
from __future__ import annotations
import json, urllib.request, urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROD = "dhlxwmvmkrfnmcgjbntk"

def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")

def q(token: str, sql: str):
    url = f"https://api.supabase.com/v1/projects/{PROD}/database/query"
    req = urllib.request.Request(url, data=json.dumps({"query": sql}).encode(),
        method="POST", headers={"Authorization": f"Bearer {token}",
        "Content-Type": "application/json", "Accept": "application/json",
        "User-Agent": "geo-verify/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return {"_error": f"HTTP {e.code}: {e.read().decode()[:400]}"}

CHECKS = {
    "channel_split (geo view, by macro+sub)": """
        SELECT CASE WHEN channel IN ('chatgpt','perplexity','copilot','claude','gemini','ai_other') THEN 'ai'
                    WHEN channel IN ('bing_family','google') THEN 'search' ELSE channel END AS macro,
               channel AS sub_channel, sum(sessions) AS sessions, sum(leads) AS leads
        FROM vw_channel_conversion_geo GROUP BY 1,2 ORDER BY sessions DESC NULLS LAST LIMIT 20;""",
    "macro view backwards-compat buckets": """
        SELECT channel, sum(sessions) AS sessions, sum(leads) AS leads
        FROM vw_channel_conversion_macro GROUP BY 1 ORDER BY sessions DESC NULLS LAST;""",
    "weekly leads view (recent weeks)": """
        SELECT week_start, channel, sub_channel, leads FROM vw_channel_leads_weekly
        ORDER BY week_start DESC, leads DESC LIMIT 15;""",
    "visitor_journey first-touch (row count + has referrer)": """
        SELECT count(*) AS rows, count(referrer_host) AS with_referrer FROM vw_visitor_journey;""",
    "probable_ai_direct row count": "SELECT count(*) AS rows FROM vw_probable_ai_direct;",
    "bing_ai_performance table exists": "SELECT count(*) AS rows FROM bing_ai_performance;",
}

def main():
    token = load_env("SUPABASE_ACCESS_TOKEN")
    for name, sql in CHECKS.items():
        res = q(token, sql)
        if isinstance(res, dict) and res.get("_error"):
            print(f"[FAIL] {name}\n       {res['_error']}")
        else:
            print(f"[OK]   {name}")
            print(f"       {json.dumps(res)[:600]}")

if __name__ == "__main__":
    main()
