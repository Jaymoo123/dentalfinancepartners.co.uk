#!/usr/bin/env python3
"""
The day-14 and week-4 reads for the WP1 service pages (blueprint §9), written
to docs/property/commercial_recovery_2026-10-07/READ_<label>_<date>.md.
Nothing is mailed (R11).

Four sources, each optional so a missing credential degrades the read instead
of killing it:
  1. Search Console URL Inspection: last crawl date and index state per page.
  2. Search Console search analytics: impressions, clicks and position per page
     and for the head phrases, since the deploy date.
  3. Live Google UK SERPs (DataForSEO) for the 12 head terms: our best position
     and djh.co.uk's (blueprint §0.1a).
  4. Supabase: ChatGPT-referred sessions and leads landing on the three pages
     since the deploy date, against the 15 sessions / 4 leads per 28 days baseline.

Environment: GSC_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS;
DATAFORSEO_B64 (base64 of login:password); SUPABASE_ACCESS_TOKEN (and the
project URL the register script uses). Run from the repo root:
    python scripts/wp1_read.py --deploy-date 2026-10-13 --label D14
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
DOCS = ROOT / "docs/property/commercial_recovery_2026-10-07"
SITE = "https://www.propertytaxpartners.co.uk"
SC_PROPERTY = "sc-domain:propertytaxpartners.co.uk"
PAGES = {
    "/services/property-accountant": ["property accountant", "property accountants", "property tax accountant",
                                      "accountant for property investors", "specialist property accountant", "property accountants near me"],
    "/services/landlord-accountant": ["landlord accountant", "accountants for landlords", "buy to let accountant"],
    "/services/property-tax-advice": ["property tax advice", "property tax advisor", "property tax specialist"],
}
HEAD_TERMS = [t for ts in PAGES.values() for t in ts]
RIVAL = "djh.co.uk"
GIVE_UP_PAGES = ["/locations/bristol", "/locations/manchester", "/locations/birmingham",
                 "/blog/property-accountant-services/belfast-property-accountant-specialist-tax-services", "/landlord-tax"]


def section(title: str) -> list[str]:
    return ["", f"## {title}", ""]


def gsc_service():
    from agents.utils.gsc_client_oauth import GSCClient
    return GSCClient().service


def read_inspection(out: list[str]) -> dict:
    out += section("1. URL Inspection (crawl state)")
    res = {}
    try:
        svc = gsc_service()
        out.append("| Page | Last crawl | Verdict | Coverage | Canonical (Google) |")
        out.append("|---|---|---|---|---|")
        for path in PAGES:
            r = svc.urlInspection().index().inspect(body={"inspectionUrl": SITE + path, "siteUrl": SC_PROPERTY}).execute()
            ir = r.get("inspectionResult", {}).get("indexStatusResult", {})
            res[path] = ir
            out.append(f"| {path} | {ir.get('lastCrawlTime', '')[:10]} | {ir.get('verdict', '')} | {ir.get('coverageState', '')} | {ir.get('googleCanonical', '')} |")
    except Exception as e:  # noqa: BLE001
        out.append(f"Not available: {e}")
    return res


def read_search_console(out: list[str], start: str, end: str) -> dict:
    out += section(f"2. Search Console, {start} to {end}")
    res = {}
    try:
        svc = gsc_service()
        out.append("| Page | Impressions | Clicks | Position (impr-weighted) |")
        out.append("|---|---|---|---|")
        for path in PAGES:
            body = {"startDate": start, "endDate": end, "dimensions": ["page"],
                    "dimensionFilterGroups": [{"filters": [{"dimension": "page", "operator": "equals", "expression": SITE + path}]}], "rowLimit": 10}
            rows = svc.searchanalytics().query(siteUrl=SC_PROPERTY, body=body).execute().get("rows", [])
            imp = sum(r["impressions"] for r in rows)
            clk = sum(r["clicks"] for r in rows)
            pos = round(sum(r["position"] * r["impressions"] for r in rows) / imp, 1) if imp else None
            res[path] = {"impressions": imp, "clicks": clk, "position": pos}
            out.append(f"| {path} | {imp} | {clk} | {pos if pos is not None else ''} |")
        out.append("")
        out.append("| Head phrase | Page shown most | Impressions | Position | Other pages shown |")
        out.append("|---|---|---|---|---|")
        for term in HEAD_TERMS:
            body = {"startDate": start, "endDate": end, "dimensions": ["page"],
                    "dimensionFilterGroups": [{"filters": [{"dimension": "query", "operator": "equals", "expression": term}]}], "rowLimit": 25}
            rows = svc.searchanalytics().query(siteUrl=SC_PROPERTY, body=body).execute().get("rows", [])
            rows.sort(key=lambda r: -r["impressions"])
            if rows:
                top = rows[0]
                others = ", ".join(r["keys"][0].replace(SITE, "") for r in rows[1:4])
                out.append(f"| {term} | {top['keys'][0].replace(SITE, '')} | {top['impressions']} | {round(top['position'], 1)} | {others} |")
            else:
                out.append(f"| {term} | (not shown) | 0 | | |")
            res[term] = rows
    except Exception as e:  # noqa: BLE001
        out.append(f"Not available: {e}")
    return res


def read_serps(out: list[str]) -> dict:
    out += section("3. Live Google UK SERPs (DataForSEO), our best position and djh.co.uk")
    res = {}
    b64 = os.environ.get("DATAFORSEO_B64")
    if not b64:
        out.append("Not available: DATAFORSEO_B64 not set")
        return res
    try:
        import httpx
        out.append("| Term | Our best (page) | djh.co.uk | Top 3 |")
        out.append("|---|---|---|---|")
        for term in HEAD_TERMS:
            r = httpx.post("https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
                           headers={"Authorization": f"Basic {b64}"},
                           json=[{"keyword": term, "location_code": 2826, "language_code": "en", "device": "desktop", "depth": 10}], timeout=90)
            items = r.json()["tasks"][0]["result"][0].get("items", []) or []
            org = [i for i in items if i.get("type") == "organic"]
            ours = [(i["rank_group"], i["url"].replace(SITE, "")) for i in org if "propertytaxpartners.co.uk" in i.get("url", "")]
            rival = [i["rank_group"] for i in org if RIVAL in i.get("domain", "")]
            top3 = ", ".join(i.get("domain", "") for i in org[:3])
            res[term] = {"ours": ours, "rival": rival, "top3": top3}
            out.append(f"| {term} | {ours[0][0] if ours else 'none'} {ours[0][1] if ours else ''} | {rival[0] if rival else 'none'} | {top3} |")
    except Exception as e:  # noqa: BLE001
        out.append(f"Not available: {e}")
    return res


def read_supabase(out: list[str], start: str) -> dict:
    out += section("4. ChatGPT referrals and leads on the three pages (Supabase)")
    res = {}
    try:
        from scripts.register_monitored_batch import sql  # uses SUPABASE_ACCESS_TOKEN
        paths = "','".join(PAGES)
        rows = sql(f"""
            select entry_path, count(*) as sessions
            from web_sessions
            where site_key='property' and started_at >= '{start}'
              and (referrer ilike '%chatgpt%' or landing_url ilike '%utm_source=chatgpt%')
              and entry_path in ('{paths}')
            group by entry_path order by sessions desc;""")
        out.append("| Page | ChatGPT sessions since deploy |")
        out.append("|---|---|")
        for r in rows:
            out.append(f"| {r['entry_path']} | {r['sessions']} |")
        res["sessions"] = rows
        leads = sql(f"""
            select coalesce(extras->>'entry_path', '') as entry_path, count(*) as leads
            from leads where site_key='property' and created_at >= '{start}'
              and coalesce(extras->>'entry_path','') in ('{paths}')
            group by 1 order by 2 desc;""")
        out.append("")
        out.append("| Page | Leads since deploy (entry path) |")
        out.append("|---|---|")
        for r in leads:
            out.append(f"| {r['entry_path']} | {r['leads']} |")
        res["leads"] = leads
        out.append("")
        out.append("Baseline (BING_G, 28 days): property-tax-advice 15 ChatGPT sessions, 4 leads.")
    except Exception as e:  # noqa: BLE001
        out.append(f"Not available: {e} (the SQL column names are the ones used in BING_G; adjust if the schema differs)")
    return res


def verdict(out: list[str], label: str, insp: dict, sc: dict, serps: dict, deploy: dt.date) -> None:
    out += section("5. Verdict against blueprint §9")
    crawled = [p for p, ir in insp.items() if ir.get("lastCrawlTime", "")[:10] >= deploy.isoformat()]
    shown = [p for p in PAGES if sc.get(p, {}).get("impressions", 0) > 0]
    out.append(f"- Crawled after the deploy: {len(crawled)} of 3 ({', '.join(crawled) or 'none'}).")
    out.append(f"- Showing in Search Console for anything: {len(shown)} of 3 ({', '.join(shown) or 'none'}).")
    for path, terms in PAGES.items():
        head = terms[0]
        rows = sc.get(head, [])
        mine = [r for r in rows if r["keys"][0] == SITE + path]
        out.append(f"- `{path}` for \"{head}\": " + (f"shown {mine[0]['impressions']} times at position {round(mine[0]['position'], 1)}" if mine else "not shown; Google shows " + (rows[0]['keys'][0].replace(SITE, '') if rows else 'nothing of ours')))
    for term, r in serps.items():
        if r.get("ours") and r.get("rival"):
            out.append(f"- Live SERP \"{term}\": us {r['ours'][0][0]} vs djh.co.uk {r['rival'][0]} ({'ahead' if r['ours'][0][0] < r['rival'][0] else 'behind'}).")
    if label.upper() == "D14":
        ok = len(crawled) == 3 and all(any(r["keys"][0] == SITE + p for r in sc.get(t[0], [])) for p, t in PAGES.items())
        out.append("")
        out.append("**Day-14 gate:** " + ("PASS: all three crawled and each appears for its head phrase. Proceed to §6 step 13 (re-aim the give-up pages' titles)." if ok else
                                        "FAIL: not all three crawled or shown. Request indexing again, check the header links are in the HTML, check robots and sitemap, wait a further 14 days, change no copy."))
        out.append("Give-up pages to re-aim at step 13 (only after PASS): " + ", ".join(GIVE_UP_PAGES))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--deploy-date", required=True, help="YYYY-MM-DD of the production deploy")
    ap.add_argument("--label", default="D14", help="D14 or W4")
    ap.add_argument("--end", default=dt.date.today().isoformat())
    a = ap.parse_args()
    deploy = dt.date.fromisoformat(a.deploy_date)
    out = [f"# WP1 service pages read {a.label}, {a.end}", "",
           f"Deploy date {a.deploy_date}. Baselines (API, 90 days to 7 Oct 2026): property-accountant 1 impression / position 99, landlord-accountant 151 / 56, property-tax-advice 209 / 71, 0 clicks; Bristol page position 13 for \"property accountant\"; djh.co.uk #1 for \"property tax accountant\". Nothing mailed."]
    insp = read_inspection(out)
    sc = read_search_console(out, a.deploy_date, a.end)
    serps = read_serps(out)
    read_supabase(out, a.deploy_date)
    verdict(out, a.label, insp, sc, serps, deploy)
    path = DOCS / f"READ_{a.label}_{a.end}.md"
    path.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"wrote {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
