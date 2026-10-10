"""Stage 03: fresh GSC (Google API) and Bing queries and pages for one site.

Inputs: link_engine config (gsc_property, bing_site), env GSC_SERVICE_ACCOUNT_JSON,
        BING_WEBMASTER_API_KEY. Never reads Supabase gsc_query_data.
Outputs (stages/): 03_gsc_query_page.csv, 03_gsc_page.csv, 03_bing_query.csv,
        03_bing_page.csv, each with a .meta.json sidecar.
Window: 90 days ending run_date - 3 days (GSC final data lag).
Cost: free (GSC and Bing APIs). Query-level rows are privacy-thresholded, so the
        (query,page) sums are lower than the page-level totals; both are in the meta.
Order: run this BEFORE universe.py (universe reads 03_gsc_query_page.csv).
Fresh mode: --data-state all [--end-date YYYY-MM-DD] pulls the 90 days ending on the latest date GSC returns
        (detected from the date dimension over the last 5 days) and writes 03b_gsc_query_page_fresh.csv,
        03b_gsc_page_fresh.csv and 03b_gsc_daily_moneypages.csv (last 30 days, owner/conversion pages of
        06_families.csv). Last 1-3 days are partial/provisional. Skips Bing. Default (final) outputs are untouched.
"""
from __future__ import annotations

import argparse
from datetime import date, timedelta

from common import (bing_date, bing_get, gsc_service, load_site, read_csv, run_date, run_dir,
                    script_meta, write_csv)

ROW_LIMIT = 25000


def gsc_rows(svc, prop: str, start: str, end: str, dims: list[str], data_state: str = "final") -> list[dict]:
    """Paginate searchanalytics.query until a page returns < ROW_LIMIT rows."""
    out, start_row = [], 0
    while True:
        body = {"startDate": start, "endDate": end, "dimensions": dims, "rowLimit": ROW_LIMIT,
                "startRow": start_row, "dataState": data_state}
        rows = svc.searchanalytics().query(siteUrl=prop, body=body).execute().get("rows", [])
        for r in rows:
            d = dict(zip(dims, r["keys"]))
            d.update(clicks=r["clicks"], impressions=r["impressions"],
                     ctr=round(r["ctr"], 6), position=round(r["position"], 2))
            out.append(d)
        if len(rows) < ROW_LIMIT:
            return out
        start_row += ROW_LIMIT


def latest_date(svc, prop: str, today: date) -> str:
    """Latest date GSC returns with dataState=all, from the date dimension over the last 5 days."""
    rows = gsc_rows(svc, prop, str(today - timedelta(days=4)), str(today), ["date"], "all")
    return max(r["date"] for r in rows)


def fresh(a, le, st) -> None:
    svc = gsc_service()
    prop = le["gsc_property"]
    through = a.end_date or latest_date(svc, prop, date.today())
    end = date.fromisoformat(through)
    start = end - timedelta(days=89)
    base = {"site": a.site, "data_through": through, "window": f"{start}..{through}", "dataState": "all",
            "partial_last_days": "last 1-3 days are provisional/partial (dataState all)", **script_meta()}
    src = f"GSC searchanalytics {prop} dataState=all"
    qp = gsc_rows(svc, prop, str(start), through, ["query", "page"], "all")
    pg = gsc_rows(svc, prop, str(start), through, ["page"], "all")
    tot = {"page_clicks_sum": sum(r["clicks"] for r in pg), "page_impressions_sum": sum(r["impressions"] for r in pg)}
    note = "dataState all: includes fresh partial days; query-level rows are privacy-thresholded"
    write_csv(st / "03b_gsc_query_page_fresh.csv", qp, ["query", "page", "clicks", "impressions", "ctr", "position"],
              {**base, "source": src + " dims=query,page", "note": note, "page_level_totals": tot})
    write_csv(st / "03b_gsc_page_fresh.csv", pg, ["page", "clicks", "impressions", "ctr", "position"],
              {**base, "source": src + " dims=page", **tot, "note": note})
    money = {r["owner_page"] for r in read_csv(st / "06_families.csv") if r.get("rank", "").isdigit()
             and not r["owner_page"].startswith("GAP")}
    money |= {r["conversion_page"] for r in read_csv(st / "06_families.csv") if r.get("rank", "").isdigit()
              and r["conversion_page"] and not r["conversion_page"].startswith("GAP")}
    dstart = end - timedelta(days=29)
    host = "https://www." + le["domain"]
    daily = [{"date": r["date"], "path": r["page"].replace(host, "").rstrip("/") or "/", "page": r["page"],
              "clicks": r["clicks"], "impressions": r["impressions"], "position": r["position"]}
             for r in gsc_rows(svc, prop, str(dstart), through, ["date", "page"], "all")
             if (r["page"].replace(host, "").rstrip("/") or "/") in money]
    daily.sort(key=lambda r: (r["path"], r["date"]))
    write_csv(st / "03b_gsc_daily_moneypages.csv", daily, ["date", "path", "page", "clicks", "impressions", "position"],
              {**{**base, "window": f"{dstart}..{through}"}, "source": src + " dims=date,page", "n_pages": len(money),
               "note": "owner_page + conversion_page of ranked families in 06_families.csv; " + note})
    print(f"fresh: through {through} (dataState all); query_page {len(qp)}, page {len(pg)}, daily money rows {len(daily)} for {len(money)} pages")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--data-state", choices=["final", "all"], default="final")
    ap.add_argument("--end-date", help="YYYY-MM-DD; default final: run minus 3, all: latest date GSC returns")
    a = ap.parse_args()
    le = load_site(a.site)["link_engine"]
    st = run_dir(a.site, a.run) / "stages"
    if a.data_state == "all":
        return fresh(a, le, st)
    if a.end_date:
        raise SystemExit("--end-date without --data-state all is not supported (would overwrite the final files)")
    through = run_date(a.run) - timedelta(days=3)
    start = through - timedelta(days=89)
    win = f"{start}..{through}"
    base = {"site": a.site, "data_through": str(through), "window": win, **script_meta()}

    svc = gsc_service()
    qp = gsc_rows(svc, le["gsc_property"], str(start), str(through), ["query", "page"])
    pg = gsc_rows(svc, le["gsc_property"], str(start), str(through), ["page"])
    tot = {"page_clicks_sum": sum(r["clicks"] for r in pg),
           "page_impressions_sum": sum(r["impressions"] for r in pg)}
    qsum = {"query_page_clicks_sum": sum(r["clicks"] for r in qp),
            "query_page_impressions_sum": sum(r["impressions"] for r in qp)}
    note = "query-level rows are privacy-thresholded; (query,page) sums are expected to be below page totals"
    src = f"GSC searchanalytics {le['gsc_property']} dataState=final"
    write_csv(st / "03_gsc_query_page.csv", qp, ["query", "page", "clicks", "impressions", "ctr", "position"],
              {**base, "source": src + " dims=query,page", **qsum, **{"page_level_totals": tot}, "note": note})
    write_csv(st / "03_gsc_page.csv", pg, ["page", "clicks", "impressions", "ctr", "position"],
              {**base, "source": src + " dims=page", **tot, "note": note})

    # Bing: GetQueryStats / GetPageStats return a rolling window of weekly rows (Date field).
    for method, fname, label in (("GetQueryStats", "03_bing_query.csv", "query"),
                                 ("GetPageStats", "03_bing_page.csv", "page")):
        raw = bing_get(method, siteUrl=le["bing_site"]) or []
        rows = [{label: r.get("Query", ""), "date": bing_date(r.get("Date")),
                 "impressions": r.get("Impressions", 0), "clicks": r.get("Clicks", 0),
                 "avg_impression_position": r.get("AvgImpressionPosition"),
                 "avg_click_position": r.get("AvgClickPosition")} for r in raw]
        dates = sorted(r["date"] for r in rows if r["date"])
        bwin = f"{dates[0]}..{dates[-1]}" if dates else "unknown"
        write_csv(st / fname, rows,
                  [label, "date", "impressions", "clicks", "avg_impression_position", "avg_click_position"],
                  {**base, "source": f"Bing Webmaster {method} {le['bing_site']}",
                   "data_through": dates[-1] if dates else None, "window": bwin,
                   "note": "Bing returns its own date range (weekly rows); page-stats .Query holds the URL"})
        print(f"{fname}: {len(rows)} rows, bing date range {bwin}")
    print(f"gsc window {win}; query_page rows {len(qp)}, page rows {len(pg)}; {tot}; {qsum}")


if __name__ == "__main__":
    main()
