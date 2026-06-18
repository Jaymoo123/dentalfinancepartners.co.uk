"""Mark wave-1 consumed blog_topics rows used (previewed first; wave-close bookkeeping)."""
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


def run_sql(sql: str) -> str:
    url = f"https://api.supabase.com/v1/projects/{REF}/database/query"
    req = urllib.request.Request(
        url, data=json.dumps({"query": sql}).encode(), method="POST",
        headers={"Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
                 "Content-Type": "application/json",
                 "User-Agent": "accounting-network-migrator/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode()


# topic (exact) -> slug of the page written from it
WRITTEN = {
    "IR35 explained: the complete guide for UK contractors": "what-is-ir35",
    "Inside IR35: what it means and how it affects your pay": "inside-ir35",
    "Outside IR35: how to protect your status and structure your affairs": "outside-ir35",
    "Umbrella vs limited company: which is right for your contracting career": "limited-company-vs-umbrella-contractor",
    "Limited company contractor tax: the complete guide": "psc-limited-company-contractor-tax",
    "Contractor expenses: what you can and cannot claim": "contractor-expenses-allowable-guide",
    "Contractor pension: using your PSC to build retirement savings": "contractor-pension-employer-contributions",
    "How to choose a contractor accountant in the UK": "how-to-choose-contractor-accountant",
    "Off-payroll working rules: a contractor's guide to the April 2021 changes": "off-payroll-working-rules-private-sector",
    "Status determination statement (SDS): your rights as a contractor": "sds-status-determination-statement",
    "IR35 small company exemption: who qualifies and what changes": "ir35-small-company-exemption",
    "Can i claim travel expenses inside ir35": "travel-expenses-inside-ir35",
    "Umbrella company holiday pay explained": "umbrella-company-holiday-pay",
}

VARIANT_PATTERNS = [
    "%ir35 explained%", "what is ir35%", "what is inside ir35%",
    "what is outside ir35%", "how does ir35%", "how does ir3535%",
    "what is the ir35 rule%", "ir35 rules explained%", "hmrc ir35 explained%",
    "what is ir35 contract%", "what is ir35 contractor%", "what is ir35 tax%",
    "what is ir35 status%", "what is ir35 rules%", "what is ir35 in simple%",
    "what is ir35 uk%", "what is inside ir35 and outside%", "what is outside ir35%",
]
EXEMPTION_VARIANTS = "topic ILIKE 'ir35 small company exemption%'"

for topic, slug in WRITTEN.items():
    t = topic.replace("'", "''")
    out = run_sql(
        f"UPDATE blog_topics SET used=true, used_at=now(), slug='{slug}', status='published' "
        f"WHERE site_key='contractors-ir35' AND topic='{t}' RETURNING topic"
    )
    print(f"written  {slug}: {out[:120]}")

vp = " OR ".join(f"topic ILIKE '{p}'" for p in VARIANT_PATTERNS)
out = run_sql(
    "UPDATE blog_topics SET used=true, used_at=now() "
    f"WHERE site_key='contractors-ir35' AND used=false AND (({vp}) OR {EXEMPTION_VARIANTS}) "
    "RETURNING topic"
)
n = len(json.loads(out))
print(f"variants marked used: {n}")

print(run_sql(
    "SELECT count(*) FILTER (WHERE used) AS used, count(*) AS total "
    "FROM blog_topics WHERE site_key='contractors-ir35'"))
