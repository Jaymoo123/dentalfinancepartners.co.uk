"""Preview which blog_topics rows would be marked used at wave-1 close."""
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


PILLARS = [
    "IR35 explained: the complete guide for UK contractors",
    "Inside IR35: what it means and how it affects your pay",
    "Outside IR35: how to protect your status and structure your affairs",
    "Umbrella vs limited company: which is right for your contracting career",
    "Limited company contractor tax: the complete guide",
    "Contractor expenses: what you can and cannot claim",
    "Contractor pension: using your PSC to build retirement savings",
    "How to choose a contractor accountant in the UK",
    "Off-payroll working rules: a contractor's guide to the April 2021 changes",
]
CLUSTER_PATTERNS = [
    "%status determination statement%",
    "%small company exemption%",
    "%flat rate vat%limited cost%",
    "%travel expenses inside ir35%",
    "%umbrella%holiday pay%",
    "%pension carry forward%",
]
VARIANT_PATTERNS = [
    "%ir35 explained%", "what is ir35%", "what is inside ir35%",
    "what is outside ir35%", "how does ir35%", "how does ir3535%",
    "what is the ir35 rule%", "ir35 rules explained%", "hmrc ir35 explained%",
    "what is ir35 contract%", "what is ir35 contractor%", "what is ir35 tax%",
    "what is ir35 status%", "what is ir35 rules%", "what is ir35 in simple%",
    "what is ir35 uk%", "what is inside ir35 and outside%", "what is outside ir35%",
]

pl = ", ".join("'" + p.replace("'", "''") + "'" for p in PILLARS)
print("=== PILLARS (exact match) ===")
for r in run_sql(f"SELECT topic FROM blog_topics WHERE site_key='contractors-ir35' AND topic IN ({pl})"):
    print(" ", r["topic"])

print("\n=== CLUSTERS (pattern match) ===")
for pat in CLUSTER_PATTERNS:
    rows = run_sql(
        "SELECT topic, content_tier FROM blog_topics WHERE site_key='contractors-ir35' "
        f"AND used = false AND topic ILIKE '{pat}' ORDER BY topic LIMIT 10")
    print(f"  [{pat}] -> {len(rows)} rows")
    for r in rows:
        print(f"      {r['content_tier']:7} {r['topic']}")

vp = " OR ".join(f"topic ILIKE '{p}'" for p in VARIANT_PATTERNS)
rows = run_sql(
    "SELECT topic FROM blog_topics WHERE site_key='contractors-ir35' AND used=false "
    f"AND ({vp}) ORDER BY topic")
print(f"\n=== VARIANT CLUSTER ({len(rows)} rows) ===")
for r in rows:
    print(" ", r["topic"])
