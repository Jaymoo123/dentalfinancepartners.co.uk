"""Property commercial-capture baseline: one read, one JSON, reproducible.

This is the Phase 0 instrument for
`docs/_engines/PROPERTY_COMMERCIAL_PLAN_2026-08-05.md`. Every number quoted in
the ceiling analysis and the scope doc comes from here, so the 28-day reads are
a diff against a committed baseline rather than a re-derivation from scratch.

Run:
  python scripts/property_commercial_baseline.py                 # all sections
  python scripts/property_commercial_baseline.py --section bing  # one section
  python scripts/property_commercial_baseline.py --out out/baseline_2026-09-02.json

Sections: gsc, bing, channels, leads, keywords, all (default).
`--section keywords` costs DataForSEO credits (~$0.05); the rest are free.

TRAPS THIS SCRIPT ENCODES (do not "simplify" these away):
  * GSC site totals MUST come from the empty/date-dimension aggregate. Summing
    the query dimension undercounts ~5x (memory: gsc_query_sum_undercount).
  * Bing site totals MUST come from GetRankAndTrafficStats. GetQueryStats is a
    truncated top-N slice biased to high-CTR queries; summing it gave an 8x
    inflated CTR (memory: bing_query_stats_topn_trap). GetPageStats is the
    reliable per-page source.
  * Session counts must exclude is_bot and is_embed, or July doubles.
"""
from __future__ import annotations

import argparse
import collections
import json
import os
import re
import sys
from datetime import date, datetime, timedelta, timezone

import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

GSC_SITE = "sc-domain:propertytaxpartners.co.uk"
BING_SITE = "https://propertytaxpartners.co.uk/"
BING_BASE = "https://ssl.bing.com/webmaster/api.svc/json"
SUPABASE_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"

# Intent buckets. COMMERCIAL wants a provider; FORMCODE wants gov.uk (or an
# official rate table) and is structurally unwinnable, so it must never be
# counted as headroom. FORMCODE is tested first so a rate-table query cannot
# be claimed as commercial (precedence swapped 2026-08-05).
#
# 2026-08-05 validation (expansion_research/_prop_audit_2026_08_05/
# bucket_validation.md, 100-query hand classification against GSC 90d):
# accuracy 73/100, every error is real commercial/form leaking into the
# informational residue. Fix applied here per that doc's recommendation:
# widen FORMCODE for devolved/official rate lookups (Revenue Scotland, LBTT,
# ATED, bare "rates YYYY", annual exempt amount), pluralise the
# COMMERCIAL service tokens, add "software" as a commercial (buying-intent)
# token, and test FORMCODE first. Closes 25 of the 27 sample errors.
COMMERCIAL_RE = re.compile(
    r"\b(accountant|accountants|accountancy|advisor|advisors|adviser|advisers|advice|"
    r"specialist|specialists|firm|service|services|help|near me|cost|fee|fees|price|"
    r"quote|hire|best|software)\b", re.I)
FORMCODE_RE = re.compile(
    r"\b(sa\d{3}|nrl\d?|ct\d{3}|p\d{2}d?|is\d+\w*|form|hmrc|gov\.?uk|helpline|"
    r"login|sign in|deadline|manual|revenue scotland|lbtt|ated|"
    r"annual exempt)\b|\brates?\b.*20\d\d", re.I)
# Refinement 2026-08-05 (post-review): bare "allowance" dropped (it swallowed
# winnable informational queries like "property allowance explained"), and
# COMMERCIAL now wins when both regexes match, so the rates catch-all cannot
# steal "cgt rates accountant 2027"-shaped queries.


def _sql(query: str) -> list[dict]:
    token = os.getenv("SUPABASE_ACCESS_TOKEN", "")
    r = httpx.post(SUPABASE_URL,
                   headers={"Authorization": f"Bearer {token}",
                            "Content-Type": "application/json",
                            "User-Agent": "property-baseline/1.0"},
                   json={"query": query}, timeout=90.0)
    r.raise_for_status()
    return r.json()


def _bing(method: str, **params) -> list[dict]:
    key = os.getenv("BING_WEBMASTER_API_KEY", "")
    r = httpx.get(f"{BING_BASE}/{method}",
                  params={"apikey": key, "siteUrl": BING_SITE, **params}, timeout=60.0)
    r.raise_for_status()
    return r.json().get("d") or []


def _bing_date(s: str) -> date:
    ms = int(re.search(r"/Date\((-?\d+)", s).group(1))
    return datetime.fromtimestamp(ms / 1000, tz=timezone.utc).date()


def _gsc(svc, dims: list[str], days: int, limit: int = 25000) -> list[dict]:
    end = date.today() - timedelta(days=3)  # GSC lags ~2-3 days
    start = end - timedelta(days=days)
    return svc.searchanalytics().query(siteUrl=GSC_SITE, body={
        "startDate": str(start), "endDate": str(end),
        "dimensions": dims, "rowLimit": limit}).execute().get("rows", [])


def section_gsc() -> dict:
    from agents.utils.gsc_client_oauth import GSCClient
    svc = GSCClient().service

    # Site totals: date dimension aggregate, NEVER the query-dimension sum.
    monthly: dict[str, list[int]] = collections.defaultdict(lambda: [0, 0])
    for r in _gsc(svc, ["date"], 365, 500):
        m = r["keys"][0][:7]
        monthly[m][0] += r["clicks"]
        monthly[m][1] += r["impressions"]

    qrows = _gsc(svc, ["query"], 90)
    buckets: dict[str, list] = collections.defaultdict(lambda: [0, 0, 0, 0.0])
    for r in qrows:
        q0 = r["keys"][0]
        b = ("commercial" if COMMERCIAL_RE.search(q0)
             else "form_hmrc_lookup" if FORMCODE_RE.search(q0)
             else "informational")
        buckets[b][0] += 1
        buckets[b][1] += r["impressions"]
        buckets[b][2] += r["clicks"]
        buckets[b][3] += r["position"] * r["impressions"]

    prows = _gsc(svc, ["page"], 90)
    return {
        "monthly_totals": {m: {"clicks": c, "impressions": i,
                               "ctr_pct": round(c / i * 100, 3) if i else 0}
                           for m, (c, i) in sorted(monthly.items())},
        "intent_buckets_90d": {
            b: {"queries": n, "impressions": i, "clicks": c,
                "ctr_pct": round(c / i * 100, 3) if i else 0,
                "avg_position": round(wp / i, 1) if i else 0}
            for b, (n, i, c, wp) in buckets.items()},
        "query_sample_note": "query-dimension rows are a SAMPLE; use monthly_totals for totals",
        "pages_with_impressions_90d": len(prows),
        "pages_over_100_impressions": sum(1 for r in prows if r["impressions"] >= 100),
        "pages_over_1000_impressions": sum(1 for r in prows if r["impressions"] >= 1000),
    }


def section_bing() -> dict:
    traffic = _bing("GetRankAndTrafficStats")
    monthly: dict[str, list[int]] = collections.defaultdict(lambda: [0, 0])
    for r in traffic:
        m = _bing_date(r["Date"]).strftime("%Y-%m")
        monthly[m][0] += r.get("Clicks") or 0
        monthly[m][1] += r.get("Impressions") or 0
    tot_c = sum(v[0] for v in monthly.values())
    tot_i = sum(v[1] for v in monthly.values())

    # Per-page: the input to the Bing veto in plan phase 2.3.
    pages = _bing("GetPageStats")
    return {
        "source": "GetRankAndTrafficStats (site totals) + GetPageStats (per page)",
        "warning": "NEVER sum GetQueryStats: it is a truncated top-N slice",
        "days": len(traffic),
        "total": {"clicks": tot_c, "impressions": tot_i,
                  "ctr_pct": round(tot_c / tot_i * 100, 3) if tot_i else 0},
        "monthly_totals": {m: {"clicks": c, "impressions": i,
                               "ctr_pct": round(c / i * 100, 3) if i else 0}
                           for m, (c, i) in sorted(monthly.items())},
        "pages": sorted(
            [{"url": p.get("Query"), "impressions": p.get("Impressions"),
              "clicks": p.get("Clicks"), "avg_position": p.get("AvgImpressionPosition")}
             for p in pages],
            key=lambda p: -(p["impressions"] or 0)),
    }


def section_channels() -> dict:
    base = ("site_key='property' and coalesce(is_bot,false)=false "
            "and coalesce(is_embed,false)=false")
    return {
        "sessions_by_month": _sql(f"""
            select date_trunc('month', started_at)::date m, count(*) sessions,
                   count(*) filter (where coalesce(engaged_ms,0) > 10000) engaged_10s
            from web_sessions where {base} group by 1 order by 1"""),
        "sessions_by_referrer_last_30d": _sql(f"""
            select coalesce(nullif(referrer_host,''),'(direct)') host, count(*) n
            from web_sessions where {base} and started_at > now() - interval '30 days'
            group by 1 order by n desc limit 25"""),
    }


def section_leads() -> dict:
    return {
        "by_site_by_month": _sql("""
            select source, date_trunc('month', created_at)::date m, count(*) n
            from leads where source <> 'test' and created_at > now() - interval '180 days'
            group by 1,2 order by 1,2"""),
        "property_by_entry_type": _sql("""
            select case when s.entry_path is null then '(unknown)'
                        when s.entry_path = '/' then 'homepage'
                        when s.entry_path like '/blog/%' then 'blog (informational)'
                        when s.entry_path like '/calculators/%' then 'calculator'
                        when s.entry_path like '/locations/%' then 'locations'
                        when s.entry_path like '/services%' then 'services'
                        else 'other' end page_type,
                   count(*) leads
            from leads l join web_sessions s on s.lead_id = l.id
            where l.source='property' group by 1 order by leads desc"""),
        "property_by_referrer": _sql("""
            select date_trunc('month', l.created_at)::date m,
                   coalesce(nullif(s.referrer_host,''),'(direct/unknown)') host, count(*) n
            from leads l left join web_sessions s on s.lead_id = l.id
            where l.source='property' group by 1,2 order by 1, n desc"""),
    }


def section_keywords() -> dict:
    """COSTS MONEY (~$0.05). Four-market volumes for the commercial cluster."""
    from optimisation_engine.clients.dataforseo_client import DataForSEOClient
    c = DataForSEOClient(timeout=180.0)
    markets = {"UK": 2826, "US": 2840, "Australia": 2036, "Canada": 2124}
    core = ["property accountant", "property accountants", "property tax accountant",
            "landlord accountant", "accountant for landlords", "rental property accountant",
            "investment property accountant", "property tax advisor", "property tax specialist",
            "real estate accountant", "real estate tax accountant", "rental property tax",
            "landlord tax", "property tax advice"]
    out: dict = {}
    for name, code in markets.items():
        res = c.search_volume(site_key="property", keywords=core, location_code=code)
        rows = (res.get("tasks") or [{}])[0].get("result") or []
        out[name] = {r.get("keyword"): {"volume": r.get("search_volume") or 0,
                                        "cpc": r.get("cpc") or 0} for r in rows}
    return out


SECTIONS = {"gsc": section_gsc, "bing": section_bing, "channels": section_channels,
            "leads": section_leads, "keywords": section_keywords}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--section", default="all", choices=[*SECTIONS, "all"])
    ap.add_argument("--out", default=None)
    ap.add_argument("--free-only", action="store_true",
                    help="skip the DataForSEO keywords section")
    args = ap.parse_args()

    names = list(SECTIONS) if args.section == "all" else [args.section]
    if args.free_only:
        names = [n for n in names if n != "keywords"]

    result: dict = {"generated": str(date.today()), "sections": {}}
    for name in names:
        try:
            result["sections"][name] = SECTIONS[name]()
            print(f"[baseline] {name}: ok")
        except Exception as exc:
            result["sections"][name] = {"__error__": f"{type(exc).__name__}: {exc}"}
            print(f"[baseline] {name}: ERROR {type(exc).__name__}: {exc}")

    out = args.out or os.path.join(ROOT, "out", f"property_baseline_{date.today()}.json")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=1, default=str)
    print(f"[baseline] wrote {out}")

    g = result["sections"].get("gsc") or {}
    b = result["sections"].get("bing") or {}
    if "intent_buckets_90d" in g:
        print("\nGSC intent buckets (90d sample):")
        for name, v in sorted(g["intent_buckets_90d"].items(), key=lambda x: -x[1]["impressions"]):
            print(f"  {name:<18} {v['impressions']:>7} impr {v['clicks']:>5} clicks "
                  f"{v['ctr_pct']:>6.2f}% pos {v['avg_position']}")
    if "total" in b:
        print(f"\nBing {b['days']}d total: {b['total']['impressions']} impr, "
              f"{b['total']['clicks']} clicks, {b['total']['ctr_pct']}% CTR")


def _selftest() -> None:
    """ponytail: smallest check that fails if the bucket regexes regress."""
    def bucket(q: str) -> str:
        if COMMERCIAL_RE.search(q):
            return "commercial"
        if FORMCODE_RE.search(q):
            return "form_hmrc_lookup"
        return "informational"

    assert bucket("revenue scotland non-residential lbtt rates 2026") == "form_hmrc_lookup"
    assert bucket("ated rates 2026/27") == "form_hmrc_lookup"
    assert bucket("uk cgt rates residential property 2026") == "form_hmrc_lookup"
    assert bucket("property accounting software uk") == "commercial"
    assert bucket("property tax specialists in london") == "commercial"
    assert bucket("cgt rates accountant 2027") == "commercial"
    assert bucket("property allowance explained") == "informational"
    assert bucket("how much rent do i need to declare") == "informational"
    print("[baseline] selftest: ok")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        _selftest()
    else:
        main()
