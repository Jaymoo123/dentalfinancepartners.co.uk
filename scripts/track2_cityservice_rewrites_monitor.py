"""Stage + insert monitored_pages rows for the CityService Tier-1 rewrites (2026-05-29).

13 legacy pages rewritten (de-leak, de-stale, depth). Run AT DEPLOY so rewrite_date
matches go-live and the 90-day regression watch starts correctly.

Idempotent (skips slugs already present). Dry-run by default; pass --commit to insert.
"""
import os
import re
import sys
import datetime
import pathlib
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
BLOG = pathlib.Path("Property/web/content/blog")

SITE = "property"
GO_LIVE = "2026-05-29"
MONITOR_DAYS = 90
BASELINE_WINDOW_DAYS = 28
BASELINE_START, BASELINE_END = "2026-05-01", "2026-05-28"

REWRITES = [
    "bristol-property-accountant",
    "property-accountant-milton-keynes-landlord-guide",
    "manchester-property-accountant",
    "property-accountant-salary-complete-guide",
    "property-accountant-stockport-landlords",
    "ipswich-property-accountant-tax-services-local-landlords",
    "derby-property-accountant-specialist-tax-services-local-landlords",
    "swindon-property-accountant-specialist-tax-services",
    "property-accountant-glasgow",
    "how-to-choose-a-property-accountant",
    "how-to-become-property-accountant",
    "accountant-payroll-services",
    "property-accountant-near-me",
]


def sql(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
                   json={"query": q}, timeout=90)
    r.raise_for_status()
    return r.json()


def esc(v):
    return "NULL" if v is None else "'" + str(v).replace("'", "''") + "'"


def slugify_cat(cat):
    s = cat.lower().replace("(", "").replace(")", "").replace("&", "and")
    return re.sub(r"-+", "-", re.sub(r"\s+", "-", s)).strip("-")


def page_url(slug):
    f = BLOG / f"{slug}.md"
    cat = "property-accountant-services"
    if f.exists():
        m = re.search(r"^category:\s*[\"']?(.+?)[\"']?\s*$", f.read_text(encoding="utf-8"), re.MULTILINE)
        if m:
            cat = slugify_cat(m.group(1))
    return f"/blog/{cat}/{slug}"


def baseline(slug):
    row = sql(f"""SELECT COALESCE(SUM(clicks),0) clicks, COALESCE(SUM(impressions),0) impressions,
        CASE WHEN SUM(impressions)>0 THEN ROUND((SUM(position*impressions)/SUM(impressions))::numeric,2) ELSE NULL END pos
        FROM gsc_query_data WHERE site_key='{SITE}' AND date BETWEEN '{BASELINE_START}' AND '{BASELINE_END}'
          AND page_url LIKE '%/{slug}';""")[0]
    return int(row["clicks"]), int(row["impressions"]), row["pos"]


def main():
    commit = "--commit" in sys.argv
    cli = [a for a in sys.argv[1:] if not a.startswith("--")]
    rewrites = cli if cli else REWRITES
    monitor_until = (datetime.date.fromisoformat(GO_LIVE) + datetime.timedelta(days=MONITOR_DAYS)).isoformat()
    pulled = datetime.datetime.now(datetime.timezone.utc).isoformat()
    existing = {r["slug"] for r in sql(
        f"SELECT slug FROM monitored_pages WHERE site_key='{SITE}' AND slug IN ("
        + ",".join(esc(s) for s in rewrites) + ");")}
    rows = []
    for slug in rewrites:
        if slug in existing:
            print(f"  SKIP(exists) {slug}"); continue
        clk, imp, pos = baseline(slug)
        rows.append((slug, page_url(slug), clk, imp, pos))
        print(f"  INSERT rewrite {slug}  base=imp{imp}/clk{clk}/pos{pos}")
    if not rows:
        print("Nothing to insert."); return
    if not commit:
        print(f"\nDRY RUN ({len(rows)} rows). Re-run with --commit at deploy time."); return
    values = ",\n".join(
        f"({esc(SITE)},{esc(s)},{esc(u)},{esc(GO_LIVE)},{esc(monitor_until)},'rewrite',NULL,"
        f"{clk},{imp},{'NULL' if pos is None else pos},{BASELINE_WINDOW_DAYS},{esc(pulled)},'active',"
        f"{esc('Track 2 CityService Tier-1 rewrite 2026-05-29 (de-leak + de-stale + depth)')})"
        for s, u, clk, imp, pos in rows)
    sql(f"""INSERT INTO monitored_pages
        (site_key,slug,page_url,rewrite_date,monitor_until,rewrite_type,redirect_target,
         baseline_clicks,baseline_impressions,baseline_position,baseline_window_days,baseline_pulled_at,status,notes)
        VALUES {values};""")
    print(f"\nInserted {len(rows)} rewrite-tracking rows. monitor_until={monitor_until}")


if __name__ == "__main__":
    main()
