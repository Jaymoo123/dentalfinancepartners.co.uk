"""Stage 03c: Search Console URL Inspection for the pages that matter.

Inputs: stages/06_families.csv (ranked rows: owner_page + conversion_page, GAP excluded; guides that own a
        family are owner pages so are included), stages/10_assignments.csv (top 60 sources by source_value),
        link_engine config (gsc_property, domain), env GSC_SERVICE_ACCOUNT_JSON.
Outputs (stages/): 03c_url_inspection.csv (+ .meta.json) and 03c_url_inspection_summary.json.
Cost: free. URL Inspection API quota 2,000/day, 600/min; throttled to ~5 requests/s.
Summary: counts by coverageState, and lastCrawlTime for the /services/ pages versus --deploy-time.
"""
from __future__ import annotations

import argparse
import json
import time
from collections import Counter

from common import gsc_service, load_site, now_utc, read_csv, run_dir, script_meta, write_csv

FIELDS = ["url", "verdict", "coverageState", "indexingState", "lastCrawlTime", "crawledAs", "googleCanonical",
          "userCanonical", "robotsTxtState", "pageFetchState", "inspected_at"]
TOP_SOURCES = 60
INTERVAL = 0.2


def targets(st, domain: str) -> list[str]:
    fam = [r for r in read_csv(st / "06_families.csv") if r.get("rank", "").isdigit()]
    paths = {r[c] for r in fam for c in ("owner_page", "conversion_page") if r[c] and not r[c].startswith("GAP")}
    asg = sorted(read_csv(st / "10_assignments.csv"), key=lambda r: -float(r["source_value"] or 0))
    paths |= {r["source"] for r in asg[:TOP_SOURCES]}
    return [f"https://www.{domain}{p}" for p in sorted(paths)]


def inspect(svc, url: str, prop: str) -> dict:
    body = {"inspectionUrl": url, "siteUrl": prop, "languageCode": "en-GB"}
    for attempt in range(3):
        try:
            res = svc.urlInspection().index().inspect(body=body).execute()
            break
        except Exception as e:                                   # 429/5xx: back off, then record the error
            if attempt == 2:
                return {"url": url, "verdict": "ERROR", "coverageState": str(e)[:120], "inspected_at": now_utc()}
            time.sleep(2 * (attempt + 1))
    ix = res.get("inspectionResult", {}).get("indexStatusResult", {})
    return {"url": url, "verdict": ix.get("verdict", ""), "coverageState": ix.get("coverageState", ""),
            "indexingState": ix.get("indexingState", ""), "lastCrawlTime": ix.get("lastCrawlTime", ""),
            "crawledAs": ix.get("crawledAs", ""), "googleCanonical": ix.get("googleCanonical", ""),
            "userCanonical": ix.get("userCanonical", ""), "robotsTxtState": ix.get("robotsTxtState", ""),
            "pageFetchState": ix.get("pageFetchState", ""), "inspected_at": now_utc()}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--deploy-time", default="2026-10-09T12:51:00Z", help="compare /services/ lastCrawlTime to this")
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    st = run_dir(a.site, a.run) / "stages"
    urls = targets(st, le["domain"])
    svc = gsc_service()
    rows = []
    for u in urls:
        t0 = time.time()
        rows.append(inspect(svc, u, le["gsc_property"]))
        time.sleep(max(0, INTERVAL - (time.time() - t0)))
    write_csv(st / "03c_url_inspection.csv", rows, FIELDS,
              {"site": a.site, "source": f"GSC URL Inspection API {le['gsc_property']}", **script_meta(),
               "n_urls": len(urls)})
    deploy = a.deploy_time.replace("Z", "+00:00")
    svc_pages = {}
    for r in rows:
        if "/services/" in r["url"]:
            lc = r.get("lastCrawlTime", "")
            svc_pages[r["url"]] = {"lastCrawlTime": lc, "after_deploy": bool(lc) and lc.replace("Z", "+00:00") > deploy}
    summ = {"inspected": len(rows), "deploy_time": a.deploy_time,
            "by_coverageState": dict(Counter(r.get("coverageState", "") for r in rows).most_common()),
            "services_pages": svc_pages}
    (st / "03c_url_inspection_summary.json").write_text(json.dumps(summ, indent=2), encoding="utf-8")
    print(json.dumps(summ, indent=2))


if __name__ == "__main__":
    main()
