"""Stage + insert monitored_pages rows for the 2026-05-29 CityService cluster-collapse.

8 weak/duplicate pages 301'd into 2 canonicals (after a lossless query-coverage lift).
Run this AT DEPLOY (when the redirects go live) so rewrite_date matches go-live and the
90-day regression watch starts correctly (per Track 2 Decision C).

Idempotent (skips slugs already present). Dry-run by default; pass --commit to insert.
Reuses the baseline logic from insert_monitored_pages.py (28-day pre-collapse GSC window).
"""
import os
import sys
import datetime
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

SITE = "property"
GO_LIVE = "2026-05-29"            # update to actual deploy date if later
MONITOR_DAYS = 90
BASELINE_WINDOW_DAYS = 28
BASELINE_START, BASELINE_END = "2026-05-01", "2026-05-28"

LONDON = "/blog/property-accountant-services/london-property-accountant"
WHATDOES = "/blog/property-accountant-services/what-does-a-property-accountant-do"

# source slug -> terminal canonical path
COLLAPSES = [
    ("property-specialist-accountant-london", LONDON),
    ("best-property-accountant-london", LONDON),
    ("what-services-buy-to-let-accountant", WHATDOES),
    ("online-property-accountant-remote-accounting", WHATDOES),
    ("property-accountant-services", WHATDOES),
    ("property-accountant-vs-general-accountant", WHATDOES),
    ("accountant-accounting-services", WHATDOES),
    ("what-should-property-investors-expect-from-specialist-accountants", WHATDOES),
]


def sql(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": q}, timeout=90)
    r.raise_for_status()
    return r.json()


def esc(v):
    return "NULL" if v is None else "'" + str(v).replace("'", "''") + "'"


def baseline(slug):
    row = sql(f"""
        SELECT COALESCE(SUM(clicks),0) clicks, COALESCE(SUM(impressions),0) impressions,
               CASE WHEN SUM(impressions)>0
                    THEN ROUND((SUM(position*impressions)/SUM(impressions))::numeric,2) ELSE NULL END pos
        FROM gsc_query_data WHERE site_key='{SITE}'
          AND date BETWEEN '{BASELINE_START}' AND '{BASELINE_END}' AND page_url LIKE '%/{slug}';
    """)[0]
    return int(row["clicks"]), int(row["impressions"]), row["pos"]


def main():
    commit = "--commit" in sys.argv
    monitor_until = (datetime.date.fromisoformat(GO_LIVE) + datetime.timedelta(days=MONITOR_DAYS)).isoformat()
    pulled = datetime.datetime.now(datetime.timezone.utc).isoformat()
    existing = {r["slug"] for r in sql(
        f"SELECT slug FROM monitored_pages WHERE site_key='{SITE}' AND slug IN ("
        + ",".join(esc(s) for s, _ in COLLAPSES) + ");")}

    rows = []
    for slug, target in COLLAPSES:
        if slug in existing:
            print(f"  SKIP(exists) {slug}"); continue
        clk, imp, pos = baseline(slug)
        rows.append((slug, target, clk, imp, pos))
        print(f"  INSERT redirect {slug} -> {target}  base=imp{imp}/clk{clk}/pos{pos}")

    if not rows:
        print("Nothing to insert."); return
    if not commit:
        print(f"\nDRY RUN ({len(rows)} rows). Re-run with --commit at deploy time."); return

    values = ",\n".join(
        f"({esc(SITE)},{esc(s)},{esc('/blog/'+s)},{esc(GO_LIVE)},{esc(monitor_until)},'redirect',"
        f"{esc(t)},{clk},{imp},{'NULL' if pos is None else pos},{BASELINE_WINDOW_DAYS},{esc(pulled)},'active',"
        f"{esc('Track 2 CityService cluster-collapse 2026-05-29; query coverage lifted into canonical first (lossless merge)')})"
        for s, t, clk, imp, pos in rows)
    sql(f"""INSERT INTO monitored_pages
        (site_key,slug,page_url,rewrite_date,monitor_until,rewrite_type,redirect_target,
         baseline_clicks,baseline_impressions,baseline_position,baseline_window_days,baseline_pulled_at,status,notes)
        VALUES {values};""")
    print(f"\nInserted {len(rows)} redirect-tracking rows. monitor_until={monitor_until}")


if __name__ == "__main__":
    main()
