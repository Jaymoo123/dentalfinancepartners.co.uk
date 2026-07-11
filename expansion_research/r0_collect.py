"""R0 research preconditions collector (expansion plan, Workstream B).

Read-only: exports query corpora from Supabase (SELECT only), checks the FREE
DataForSEO account endpoint, and fetches live sitemaps. No Supabase writes,
no paid API calls. Re-runnable.
"""
import base64
import csv
import gzip
import io
import json
import os
import re
import sys

import httpx
from dotenv import load_dotenv

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(ROOT, ".env"))
OUT = os.path.dirname(os.path.abspath(__file__))

SITES = {  # site_key -> canonical domain (from */niche.config.json)
    "property": "www.propertytaxpartners.co.uk",
    "dentists": "www.dentalfinancepartners.co.uk",
    "medical": "www.medicalaccounts.co.uk",
    "solicitors": "www.accountsforlawyers.co.uk",
    "generalist": "www.hollowaydavies.co.uk",
    "agency": "www.agencyfounderfinance.co.uk",
    "contractors-ir35": "www.contractortaxaccountants.co.uk",
    "construction-cis": "www.tradetaxspecialists.co.uk",
}

MGMT_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"


def mgmt_select(sql: str) -> list[dict]:
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {os.getenv('SUPABASE_ACCESS_TOKEN')}",
                 "Content-Type": "application/json"},
        json={"query": sql},
        timeout=120,
    )
    r.raise_for_status()
    return r.json()


# ---- 1. DataForSEO free credential check (direct GET; ponytail: skips the
# client's api_cost_log insert because this run must not write to Supabase) ----
def check_dataforseo() -> str:
    login, pw = os.getenv("DATAFORSEO_API_LOGIN"), os.getenv("DATAFORSEO_API_PASSWORD")
    if not login or not pw:
        return "FAIL: DATAFORSEO_API_LOGIN/PASSWORD not set in .env"
    tok = base64.b64encode(f"{login}:{pw}".encode()).decode()
    try:
        r = httpx.get("https://api.dataforseo.com/v3/appendix/user_data",
                      headers={"Authorization": f"Basic {tok}"}, timeout=60)
    except Exception as e:
        return f"FAIL: {type(e).__name__}: {e}"
    line = f"HTTP {r.status_code}"
    if r.status_code == 200:
        try:
            res = r.json()["tasks"][0]["result"][0]
            money = res.get("money", {})
            line += (f"; task status={r.json()['tasks'][0].get('status_message')}"
                     f"; balance={money.get('balance')} {money.get('currency', '')}"
                     f"; login={res.get('login')}")
        except Exception as e:
            line += f"; parse error: {e}; body[:300]={r.text[:300]}"
    else:
        line += f"; body[:300]={r.text[:300]}"
    return line


# ---- 2. 28d query corpora per site (Supabase export) ----
def export_corpora() -> dict[str, dict]:
    report = {}
    for key in SITES:
        rows = []
        for src, table in (("gsc", "gsc_query_data"), ("bing", "bing_query_data")):
            try:
                data = mgmt_select(
                    f"select query, sum(impressions) impressions, sum(clicks) clicks "
                    f"from {table} where site_key='{key}' "
                    f"and date >= current_date - 28 group by 1 order by 2 desc"
                )
            except Exception as e:
                report.setdefault(key, {})[f"{src}_error"] = str(e)
                data = []
            for d in data:
                rows.append([d["query"], d["impressions"], d["clicks"], src])
            report.setdefault(key, {})[src] = len(data)
        path = os.path.join(OUT, "corpora", f"{key}_queries.csv")
        with open(path, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["query", "impressions", "clicks", "source"])
            w.writerows(rows)
        report[key]["total"] = len(rows)
    return report


# ---- 3. Own-estate exclusion list (live sitemaps) ----
LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>")


def fetch(url: str) -> str:
    r = httpx.get(url, timeout=30, follow_redirects=True,
                  headers={"User-Agent": "Mozilla/5.0 (estate-research)"})
    r.raise_for_status()
    if url.endswith(".gz") or r.headers.get("content-type", "").endswith("gzip"):
        return gzip.decompress(r.content).decode("utf-8", "replace")
    return r.text


def sitemap_urls(domain: str) -> tuple[list[str], str | None]:
    """Return (page urls, error). Follows one level of sitemap index."""
    try:
        body = fetch(f"https://{domain}/sitemap.xml")
    except Exception as e:
        return [], f"{type(e).__name__}: {e}"
    locs = LOC_RE.findall(body)
    if "<sitemapindex" in body:
        pages = []
        for sm in locs:
            try:
                pages += LOC_RE.findall(fetch(sm))
            except Exception as e:
                return pages, f"child sitemap {sm}: {e}"
        return pages, None
    return locs, None


def build_exclusion() -> dict:
    out = {"generated": "2026-07-11", "sites": {}}
    for key, dom in SITES.items():
        bare = dom.removeprefix("www.")
        urls, err = sitemap_urls(dom)
        out["sites"][key] = {
            "canonical_domain": dom,
            "domains": sorted({dom, bare, f"www.{bare}"}),
            "sitemap_url_count": len(urls),
            "sitemap_error": err,
            "urls": urls,
        }
    return out


if __name__ == "__main__":
    dfs = check_dataforseo()
    print("DataForSEO:", dfs)
    corp = export_corpora()
    print("Corpora:", json.dumps(corp, indent=1))
    excl = build_exclusion()
    with open(os.path.join(OUT, "own_estate_exclusion.json"), "w", encoding="utf-8") as f:
        json.dump(excl, f, indent=1)
    for k, v in excl["sites"].items():
        print(f"sitemap {k}: {v['sitemap_url_count']} urls, error={v['sitemap_error']}")
    with open(os.path.join(OUT, "dataforseo_check.txt"), "w", encoding="utf-8") as f:
        f.write(dfs + "\n")
