"""One-shot Bing veto audit for Property, 2026-08-05. See task list in session.
Saves 4 JSON files to expansion_research/_prop_audit_2026_08_05/.
"""
from __future__ import annotations
import collections, json, os, re, sys
from datetime import date, datetime, timezone

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)
from dotenv import load_dotenv
load_dotenv(os.path.join(ROOT, ".env"))

BING_SITE = "https://propertytaxpartners.co.uk/"
BING_BASE = "https://ssl.bing.com/webmaster/api.svc/json"
BING_KEY = os.getenv("BING_WEBMASTER_API_KEY", "")
OUT = os.path.join(ROOT, "expansion_research", "_prop_audit_2026_08_05")
os.makedirs(OUT, exist_ok=True)

SUPABASE_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
SUPABASE_TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")


def _bing(method: str, **params):
    r = httpx.get(f"{BING_BASE}/{method}", params={"apikey": BING_KEY, "siteUrl": BING_SITE, **params}, timeout=60.0)
    r.raise_for_status()
    return r.json().get("d") or []


def _bing_date(s: str) -> date:
    m = re.search(r"/Date\((-?\d+)", s)
    return datetime.fromtimestamp(int(m.group(1)) / 1000, tz=timezone.utc).date()


def _sql(query: str):
    r = httpx.post(SUPABASE_URL,
                    headers={"Authorization": f"Bearer {SUPABASE_TOKEN}", "Content-Type": "application/json"},
                    json={"query": query}, timeout=90.0)
    r.raise_for_status()
    return r.json()


def save(name, obj):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, default=str)
    print("saved", path)


def task1_site_totals():
    rows = _bing("GetRankAndTrafficStats")
    parsed = []
    for r in rows:
        d = _bing_date(r["Date"])
        parsed.append({"date": str(d), "impressions": r.get("Impressions", 0),
                        "clicks": r.get("Clicks", 0), "avgPosition": r.get("AvgClickPosition") or r.get("AvgImpressionPosition")})
    parsed.sort(key=lambda x: x["date"])

    monthly = collections.defaultdict(lambda: [0, 0, 0, 0])  # impr, clicks, days, hasAvgPosField
    for p in parsed:
        m = p["date"][:7]
        monthly[m][0] += p["impressions"]
        monthly[m][1] += p["clicks"]
        monthly[m][2] += 1
        if p["avgPosition"] is not None:
            monthly[m][3] += 1

    import calendar
    monthly_out = {}
    for m, (impr, clk, days, has_pos) in sorted(monthly.items()):
        y, mo = map(int, m.split("-"))
        days_in_month = calendar.monthrange(y, mo)[1]
        monthly_out[m] = {
            "impressions": impr, "clicks": clk,
            "ctr_pct": round(clk / impr * 100, 2) if impr else None,
            "days_present": days, "days_in_month": days_in_month,
            "full_month": days == days_in_month,
        }

    window_rows = [p for p in parsed if "2026-05-17" <= p["date"] <= "2026-08-03"]
    window_impr = sum(p["impressions"] for p in window_rows)
    window_clicks = sum(p["clicks"] for p in window_rows)
    monthly_sum_impr = sum(v["impressions"] for k, v in monthly_out.items() if k in ("2026-05", "2026-06", "2026-07"))
    monthly_sum_clicks = sum(v["clicks"] for k, v in monthly_out.items() if k in ("2026-05", "2026-06", "2026-07"))

    avg_pos_present = any(p["avgPosition"] is not None for p in parsed)

    out = {
        "raw_row_count": len(parsed),
        "date_range_available": [parsed[0]["date"], parsed[-1]["date"]] if parsed else None,
        "monthly": monthly_out,
        "claimed_window": {"range": "2026-05-17..08-03", "impressions": 139458, "clicks": 3497, "ctr_pct": 2.51},
        "measured_window_05-17_to_08-03": {"impressions": window_impr, "clicks": window_clicks,
                                            "ctr_pct": round(window_clicks / window_impr * 100, 2) if window_impr else None,
                                            "n_days_in_window": len(window_rows)},
        "claimed_monthly": {"05": {"impressions": 15543, "clicks": 396},
                             "06": {"impressions": 51966, "clicks": 1280},
                             "07": {"impressions": 67141, "clicks": 1692}},
        "measured_monthly_partial_calendar_months": {
            "05": monthly_out.get("2026-05"), "06": monthly_out.get("2026-06"), "07": monthly_out.get("2026-07")},
        "monthly_sum_05_06_07": {"impressions": monthly_sum_impr, "clicks": monthly_sum_clicks},
        "gap_window_vs_monthlysum": {
            "impressions_gap": window_impr - monthly_sum_impr if window_rows else None,
            "note": "claimed monthly figures are 05,06,07 FULL-CALENDAR-MONTH sums but claimed window is 05-17..08-03 "
                    "(partial May, partial Aug, all June+July) -- these are NOT the same date ranges, so a gap is "
                    "structurally expected regardless of data accuracy. Compare like-for-like instead: measured window "
                    "sum above vs claimed window total 139458/3497."},
        "avg_position_field_present_in_api": avg_pos_present,
        "avg_position_verdict": "UNVERIFIABLE: GetRankAndTrafficStats returns no avg-position field on this account" if not avg_pos_present
                                 else "verified: see per-day avgPosition values",
    }
    save("bing_site_totals.json", out)
    return out


def task2_landlordtax():
    rows = _sql("""
        select query, page_url, sum(impressions) impressions, sum(clicks) clicks
        from bing_query_data
        where site_key = 'property' and query ilike '%landlord tax%'
        group by query, page_url
        order by impressions desc
    """)
    total_impr = sum(r["impressions"] for r in rows)
    total_clicks = sum(r["clicks"] for r in rows)
    out = {"row_count": len(rows), "total_impressions": total_impr, "total_clicks": total_clicks, "rows": rows}
    save("bing_landlordtax.json", out)
    return out


CITY_NAMES = ["london", "manchester", "birmingham", "bristol", "leeds", "nottingham", "leicester",
              "oxford", "peterborough", "belfast", "glasgow", "edinburgh", "cardiff", "sheffield",
              "liverpool", "newcastle"]


def task3_veto_citypages():
    like_clauses = " or ".join([f"page_url ilike '%{c}%'" for c in CITY_NAMES] + ["page_url ilike '%/locations/%'"])
    rows = _sql(f"""
        select page_url, sum(impressions) impressions, sum(clicks) clicks
        from bing_query_data
        where site_key = 'property' and ({like_clauses})
        group by page_url
        order by impressions desc
    """)
    for r in rows:
        r["veto_flag"] = (r["clicks"] >= 1) or (r["impressions"] >= 100)
    flagged = [r for r in rows if r["veto_flag"]]
    out = {"page_count": len(rows), "veto_flagged_count": len(flagged),
           "veto_threshold": ">=1 click OR >=100 impressions (90d aggregate as stored)",
           "pages": rows}
    save("bing_veto_citypages.json", out)
    return out


def task4_headterms():
    terms = ["property accountant", "landlord accountant", "accountant for landlords"]
    like_clauses = " or ".join([f"query ilike '%{t}%'" for t in terms])
    rows = _sql(f"""
        select query, page_url, sum(impressions) impressions, sum(clicks) clicks
        from bing_query_data
        where site_key = 'property' and ({like_clauses})
        group by query, page_url
        order by impressions desc
    """)
    pages = sorted(set(r["page_url"] for r in rows))
    total_impr = sum(r["impressions"] for r in rows)
    total_clicks = sum(r["clicks"] for r in rows)
    out = {"row_count": len(rows), "total_impressions": total_impr, "total_clicks": total_clicks,
           "distinct_pages_serving": pages, "rows": rows}
    save("bing_headterms.json", out)
    return out


def task5_pagestats_vs_total(site_total_impr: int):
    pages = _bing("GetPageStats")
    page_impr_sum = sum(p.get("Impressions", 0) for p in pages)
    shortfall_pct = round((1 - page_impr_sum / site_total_impr) * 100, 1) if site_total_impr else None
    out = {"page_count": len(pages), "sum_getpagestats_impressions": page_impr_sum,
           "getrankandtrafficstats_total_impressions_window": site_total_impr,
           "claimed": {"page_stats_sum": 89116, "site_total": 139458, "shortfall_pct_claimed": 36,
                       "claimed_characterization": "tracks closely"},
           "measured_shortfall_pct": shortfall_pct,
           "verdict": "shortfall >30% is a material gap not 'tracks closely'" if shortfall_pct and shortfall_pct > 15 else "roughly tracks"}
    save("bing_pagestats_vs_total.json", out)
    return out


if __name__ == "__main__":
    print("=== task1 site totals ===")
    t1 = task1_site_totals()
    print("=== task2 landlord tax ===")
    t2 = task2_landlordtax()
    print("=== task3 veto city pages ===")
    t3 = task3_veto_citypages()
    print("=== task4 head terms ===")
    t4 = task4_headterms()
    print("=== task5 pagestats vs total ===")
    # use full-available-window total from GetRankAndTrafficStats for the same window as claimed (05-17..08-03)
    window_total = t1["measured_window_05-17_to_08-03"]["impressions"]
    t5 = task5_pagestats_vs_total(window_total)

    print(json.dumps({
        "task1_window_impr": t1["measured_window_05-17_to_08-03"],
        "task2_landlordtax_total": {"impr": t2["total_impressions"], "clicks": t2["total_clicks"], "rows": t2["row_count"]},
        "task3_veto_flagged": t3["veto_flagged_count"], "task3_page_count": t3["page_count"],
        "task4_headterms_total": {"impr": t4["total_impressions"], "clicks": t4["total_clicks"]},
        "task5": {"page_sum": t5["sum_getpagestats_impressions"], "site_total": t5["getrankandtrafficstats_total_impressions_window"],
                   "shortfall_pct": t5["measured_shortfall_pct"]},
    }, indent=2))
