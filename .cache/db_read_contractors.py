"""Read-only live-DB state read for contractors-ir35 registration (P0.4)."""
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
    body = json.dumps({"query": sql}).encode("utf-8")
    req = urllib.request.Request(
        url, data=body, method="POST",
        headers={
            "Authorization": f"Bearer {load_env('SUPABASE_ACCESS_TOKEN')}",
            "Content-Type": "application/json",
            "User-Agent": "accounting-network-migrator/1.0",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8")


QUERIES = {
    "check_constraints": (
        "SELECT conrelid::regclass::text AS tbl, conname, pg_get_constraintdef(oid) AS def "
        "FROM pg_constraint WHERE conrelid IN ('public.sites'::regclass, 'public.leads'::regclass) "
        "AND contype = 'c' ORDER BY tbl, conname"
    ),
    "sites_rows": (
        "SELECT site_key, display_name, domain, gsc_property_url, bing_property_url, "
        "content_dir, blog_topics_table, active FROM public.sites ORDER BY site_key"
    ),
    "blog_topics_count": (
        "SELECT site_key, count(*) FROM public.blog_topics GROUP BY site_key ORDER BY site_key"
    ),
}

for name, sql in QUERIES.items():
    print(f"=== {name} ===")
    print(run_sql(sql))
    print()
