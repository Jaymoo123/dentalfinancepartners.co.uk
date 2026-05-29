"""Insert monitored_pages regression-watch rows via the Supabase Management API.

Closes Track 2 Decision C: the 22 Phase 3 pages (16 rewrites + 6 redirects)
went live in the 2026-05-29 MW3 deploy but were never registered for the
90-day regression watch. Baselines are computed from gsc_query_data over the
28-day pre-go-live window (the pages only went live 2026-05-29, so recent GSC
is a clean pre-change baseline).

Reusable: pass a different `entries` list + go_live_date for future batches.
Idempotent: skips slugs already present in monitored_pages for the site.

Usage: python scripts/insert_monitored_pages.py [--commit]
       (dry-run preview by default; pass --commit to actually insert)
"""
import os
import re
import sys
import json
import datetime
import pathlib
import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
TOKEN = os.environ["SUPABASE_ACCESS_TOKEN"]
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
BLOG_DIR = pathlib.Path("Property/web/content/blog")

SITE = "property"
GO_LIVE = "2026-05-29"            # MW3 deploy that took these pages live
MONITOR_DAYS = 90
BASELINE_WINDOW_DAYS = 28
BASELINE_START = "2026-05-01"     # 28-day pre-go-live window
BASELINE_END = "2026-05-28"

CANON_60DAY = "/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026"
CANON_BTL = "/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide"

# 16 REWRITES (slug only; category read from frontmatter)
REWRITES = [
    "cgt-deferral-strategies-property-investors-uk",
    "reduce-cgt-property-disposal-uk",
    "cgt-property-sold-loss-claim-capital-losses",
    "principal-private-residence-relief-landlords",
    "rollover-relief-property-landlords",
    "letting-relief-landlords-2026-changes",
    "cgt-divorce-property-transfer-tax-implications",
    "cgt-inherited-rental-property-calculation-uk",
    "cgt-property-transfer-spouse",
    "non-resident-cgt-uk-property-rates-reporting",
    "cgt-main-residence-election-two-properties",
    "cgt-commercial-property-different-residential",
    "airbnb-tax-uk-short-term-rental-income-taxed",
    "birmingham-property-accountant",
    "2027-property-tax-rates-section-24-relief-uk-landlords",
    "cgt-rates-property-2026-27-current-rates-explained",
]

# 6 REDIRECTS: (retired source slug -> canonical target path)
REDIRECTS = [
    ("60-day-cgt-reporting-property-sales-complete-guide", CANON_60DAY),
    ("60-day-cgt-reporting-property-sales-rule", CANON_60DAY),
    ("cgt-reporting-deadlines-property-2026", CANON_60DAY),
    ("how-to-report-property-sale-hmrc-60-days", CANON_60DAY),
    ("report-property-sale-hmrc-60-days-guide", CANON_60DAY),
    ("capital-gains-tax-selling-rental-property-uk", CANON_BTL),
]


def sql(query: str):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
                                 "Content-Type": "application/json"},
                   json={"query": query}, timeout=90)
    r.raise_for_status()
    return r.json()


def esc(v):
    if v is None:
        return "NULL"
    return "'" + str(v).replace("'", "''") + "'"


def slugify_category(cat: str) -> str:
    s = cat.lower().replace("(", "").replace(")", "").replace("&", "and")
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s.strip("-")


def category_slug_for(slug: str) -> str:
    f = BLOG_DIR / f"{slug}.md"
    if not f.exists():
        return "capital-gains-tax"  # fallback; all rewrites here are CGT-cluster
    text = f.read_text(encoding="utf-8")
    m = re.search(r"^category:\s*[\"']?(.+?)[\"']?\s*$", text, re.MULTILINE)
    return slugify_category(m.group(1)) if m else "capital-gains-tax"


def baseline_for(slug: str):
    """Impression-weighted baseline over the pre-go-live window for this page."""
    q = f"""
        SELECT COALESCE(SUM(clicks),0)      AS clicks,
               COALESCE(SUM(impressions),0) AS impressions,
               CASE WHEN SUM(impressions) > 0
                    THEN ROUND((SUM(position*impressions)/SUM(impressions))::numeric, 2)
                    ELSE NULL END           AS position
        FROM gsc_query_data
        WHERE site_key = '{SITE}'
          AND date BETWEEN '{BASELINE_START}' AND '{BASELINE_END}'
          AND page_url LIKE '%/{slug}';
    """
    row = sql(q)[0]
    return int(row["clicks"]), int(row["impressions"]), row["position"]


def build_rows():
    monitor_until = (datetime.date.fromisoformat(GO_LIVE)
                     + datetime.timedelta(days=MONITOR_DAYS)).isoformat()
    pulled_at = datetime.datetime.now(datetime.timezone.utc).isoformat()
    rows = []
    for slug in REWRITES:
        clk, imp, pos = baseline_for(slug)
        rows.append(dict(slug=slug, page_url=f"/blog/{category_slug_for(slug)}/{slug}",
                         rewrite_type="rewrite", redirect_target=None,
                         clicks=clk, impressions=imp, position=pos,
                         notes="Track 2 Phase 3 REWRITE (CGT cluster); went live in 2026-05-29 MW3 deploy"))
    for src, target in REDIRECTS:
        clk, imp, pos = baseline_for(src)
        rows.append(dict(slug=src, page_url=f"/blog/{src}",
                         rewrite_type="redirect", redirect_target=target,
                         clicks=clk, impressions=imp, position=pos,
                         notes=f"Track 2 Phase 3 REDIRECT; 301 to {target} in 2026-05-29 MW3 deploy"))
    return rows, monitor_until, pulled_at


def main():
    commit = "--commit" in sys.argv
    rows, monitor_until, pulled_at = build_rows()

    existing = {r["slug"] for r in sql(
        f"SELECT slug FROM monitored_pages WHERE site_key='{SITE}' AND slug IN ("
        + ",".join(esc(r["slug"]) for r in rows) + ");")}
    fresh = [r for r in rows if r["slug"] not in existing]

    print(f"{len(rows)} candidate rows | {len(existing)} already present | {len(fresh)} to insert\n")
    for r in rows:
        flag = "SKIP(exists)" if r["slug"] in existing else "INSERT"
        rtype = r["rewrite_type"]
        print(f"  [{flag}] {rtype:<8} {r['slug']}  base=imp{r['impressions']}/clk{r['clicks']}/pos{r['position']}")

    if not fresh:
        print("\nNothing to insert.")
        return
    if not commit:
        print("\nDRY RUN. Re-run with --commit to insert.")
        return

    values = ",\n".join(
        f"({esc(SITE)},{esc(r['slug'])},{esc(r['page_url'])},{esc(GO_LIVE)},"
        f"{esc(monitor_until)},{esc(r['rewrite_type'])},{esc(r['redirect_target'])},"
        f"{r['clicks']},{r['impressions']},"
        f"{'NULL' if r['position'] is None else r['position']},"
        f"{BASELINE_WINDOW_DAYS},{esc(pulled_at)},'active',{esc(r['notes'])})"
        for r in fresh)
    insert = f"""
        INSERT INTO monitored_pages
            (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type,
             redirect_target, baseline_clicks, baseline_impressions, baseline_position,
             baseline_window_days, baseline_pulled_at, status, notes)
        VALUES
        {values};
    """
    sql(insert)
    print(f"\nInserted {len(fresh)} rows. monitor_until={monitor_until}")


if __name__ == "__main__":
    main()
