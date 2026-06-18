"""Apply the two contractors-ir35 registration migrations to prod (P1.3)."""
import json
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REF = "dhlxwmvmkrfnmcgjbntk"

MIGRATIONS = [
    "20260613000001_add_contractors_ir35_to_sites.sql",
    "20260613000002_add_contractors_ir35_to_leads_source.sql",
]

VERIFY = (
    "SELECT conname, pg_get_constraintdef(oid) AS def FROM pg_constraint "
    "WHERE conname IN ('sites_site_key_check','leads_source_valid'); "
)
VERIFY_ROW = (
    "SELECT site_key, display_name, domain, blog_topics_table, active "
    "FROM sites WHERE site_key = 'contractors-ir35'"
)


def load_env(key: str) -> str:
    for line in (ROOT / ".env").read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith(key + "="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit(f"{key} not found in .env")


TOKEN = load_env("SUPABASE_ACCESS_TOKEN")


def run_sql(sql: str) -> tuple[bool, str]:
    url = f"https://api.supabase.com/v1/projects/{REF}/database/query"
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": "accounting-network-migrator/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return True, resp.read().decode("utf-8")[:800]
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode('utf-8')[:800]}"


for name in MIGRATIONS:
    sql = (ROOT / "supabase" / "migrations" / name).read_text(encoding="utf-8")
    ok, out = run_sql(sql)
    print(f"{'PASS' if ok else 'FAIL'} {name}\n  {out}\n")
    if not ok:
        raise SystemExit(1)

for label, q in [("constraints", VERIFY), ("row", VERIFY_ROW)]:
    ok, out = run_sql(q)
    print(f"VERIFY {label}: {out}\n")
