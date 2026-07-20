"""Comprehensive Property traffic + lead eval.

Triangulates INDEPENDENT data sources to separate a real traffic drop from a
measurement artifact:
  - web_sessions  : first-party, written server-side via /api/track (service
                    role) -> independent of the client-side lead-capture break.
                    Split total/human/bot to catch bot-classifier artifacts.
  - GSC           : Google organic ground truth (server-side, ~2-3d lag).
  - GA4           : Google session pipeline (daily + channel).
  - leads         : conversion outcome.

Windows: last 42 days daily, plus W0 (last 7d) vs W1 (prior 7d) vs W3 (7d, 4wk ago).
"""
from __future__ import annotations
import os, sys, json
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

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
MGMT_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"
SITE = "property"
GSC_PROP = "sc-domain:propertytaxpartners.co.uk"

TODAY = date.today()


def sql(q: str):
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json",
                 "User-Agent": "traffic-eval/1.0"},
        json={"query": q}, timeout=90.0,
    )
    r.raise_for_status()
    return r.json()


def hr(t):
    print("\n" + "=" * 78)
    print(t)
    print("=" * 78)


# ---------------------------------------------------------------------------
# 1. FIRST-PARTY web_sessions  (the independent traffic measure)
# ---------------------------------------------------------------------------
hr("1. FIRST-PARTY web_sessions (server-side /api/track -> independent of lead break)")
print("Daily, last 42d. London day buckets. site_key=property, is_embed=false.\n")
print(f"{'day':<12}{'total':>7}{'human':>7}{'bot':>7}{'visitors':>9}{'bot%':>7}")
try:
    rows = sql(f"""
        with s as (
          select (started_at at time zone 'Europe/London')::date as d,
                 session_id, visitor_id, is_bot
          from web_sessions
          where site_key='{SITE}' and coalesce(is_embed,false)=false
            and started_at >= (now() - interval '42 days')
        )
        select d::text as d,
               count(*) total,
               count(*) filter (where not is_bot) human,
               count(*) filter (where is_bot) bot,
               count(distinct visitor_id) filter (where not is_bot) visitors
        from s group by d order by d
    """)
    for r in rows:
        tot = int(r['total']); bot = int(r['bot'])
        botpct = (100.0*bot/tot) if tot else 0
        print(f"{r['d']:<12}{tot:>7}{int(r['human']):>7}{bot:>7}{int(r['visitors']):>9}{botpct:>6.0f}%")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

# 7-day window comparison (human sessions + distinct visitors)
hr("1b. web_sessions 7-day windows (human only)")
try:
    rows = sql(f"""
        with s as (
          select started_at, session_id, visitor_id
          from web_sessions
          where site_key='{SITE}' and coalesce(is_embed,false)=false and not is_bot
        )
        select 'W0 last 7d'  lbl, count(*) sess, count(distinct visitor_id) vis
          from s where started_at >= now()-interval '7 days'
        union all
        select 'W1 prior 7d', count(*), count(distinct visitor_id)
          from s where started_at >= now()-interval '14 days' and started_at < now()-interval '7 days'
        union all
        select 'W2 wk 2-3',   count(*), count(distinct visitor_id)
          from s where started_at >= now()-interval '21 days' and started_at < now()-interval '14 days'
        union all
        select 'W3 wk 3-4',   count(*), count(distinct visitor_id)
          from s where started_at >= now()-interval '28 days' and started_at < now()-interval '21 days'
        order by lbl
    """)
    print(f"{'window':<14}{'human sess':>12}{'visitors':>10}")
    for r in rows:
        print(f"{r['lbl']:<14}{int(r['sess']):>12}{int(r['vis']):>10}")
except Exception as e:
    print(f"ERROR: {e}")

# By channel: W0 vs W1
hr("1c. web_sessions by CHANNEL  (W0 last7d vs W1 prior7d, human only)")
try:
    rows = sql(f"""
        with s as (
          select started_at, visitor_id,
            case
              when utm_medium ilike 'cpc' or utm_medium ilike '%paid%' then 'Paid'
              when referrer_host is null or referrer_host='' then 'Direct'
              when referrer_host ilike '%google%' then 'Organic Google'
              when referrer_host ilike '%bing%' or referrer_host ilike '%duckduckgo%'
                   or referrer_host ilike '%yahoo%' or referrer_host ilike '%ecosia%' then 'Organic Other'
              when referrer_host ilike '%facebook%' or referrer_host ilike '%instagram%'
                   or referrer_host ilike '%linkedin%' or referrer_host ilike '%t.co%'
                   or referrer_host ilike '%reddit%' then 'Social'
              when referrer_host ilike '%propertytaxpartner%' then 'Internal'
              else 'Referral'
            end channel
          from web_sessions
          where site_key='{SITE}' and coalesce(is_embed,false)=false and not is_bot
            and started_at >= now()-interval '14 days'
        )
        select channel,
          count(distinct visitor_id) filter (where started_at>=now()-interval '7 days') w0,
          count(distinct visitor_id) filter (where started_at< now()-interval '7 days') w1
        from s group by channel order by w1 desc, w0 desc
    """)
    print(f"{'channel':<18}{'W0 vis':>8}{'W1 vis':>8}{'delta':>8}")
    for r in rows:
        w0=int(r['w0']); w1=int(r['w1'])
        print(f"{r['channel']:<18}{w0:>8}{w1:>8}{w0-w1:>+8}")
except Exception as e:
    print(f"ERROR: {e}")

# Top referrer hosts W0 vs W1
hr("1d. web_sessions top referrer_host (visitors, W0 vs W1, human)")
try:
    rows = sql(f"""
        with s as (
          select started_at, visitor_id, coalesce(nullif(referrer_host,''),'(direct)') rh
          from web_sessions
          where site_key='{SITE}' and coalesce(is_embed,false)=false and not is_bot
            and started_at >= now()-interval '14 days'
        )
        select rh,
          count(distinct visitor_id) filter (where started_at>=now()-interval '7 days') w0,
          count(distinct visitor_id) filter (where started_at< now()-interval '7 days') w1
        from s group by rh order by (count(distinct visitor_id)) desc limit 15
    """)
    print(f"{'referrer_host':<32}{'W0':>6}{'W1':>6}")
    for r in rows:
        print(f"{str(r['rh'])[:31]:<32}{int(r['w0']):>6}{int(r['w1']):>6}")
except Exception as e:
    print(f"ERROR: {e}")

# Country split
hr("1e. web_sessions GB vs non-GB (human visitors, W0 vs W1)")
try:
    rows = sql(f"""
        with s as (
          select started_at, visitor_id, case when country='GB' then 'GB' else coalesce(country,'(null)') end c
          from web_sessions
          where site_key='{SITE}' and coalesce(is_embed,false)=false and not is_bot
            and started_at >= now()-interval '14 days'
        )
        select c,
          count(distinct visitor_id) filter (where started_at>=now()-interval '7 days') w0,
          count(distinct visitor_id) filter (where started_at< now()-interval '7 days') w1
        from s group by c order by w1 desc limit 12
    """)
    print(f"{'country':<12}{'W0':>6}{'W1':>6}")
    for r in rows:
        print(f"{str(r['c']):<12}{int(r['w0']):>6}{int(r['w1']):>6}")
except Exception as e:
    print(f"ERROR: {e}")

# ---------------------------------------------------------------------------
# 2. KEY FUNNEL EVENTS daily (from web_events) - lead question
# ---------------------------------------------------------------------------
hr("2. web_events funnel signals daily (human, last 21d)")
print(f"{'day':<12}{'page_view':>10}{'form_start':>11}{'form_submit':>12}{'lead_sub':>9}")
try:
    rows = sql(f"""
        with e as (
          select (ts at time zone 'Europe/London')::date d, event_name
          from web_events
          where site_key='{SITE}' and coalesce(is_bot,false)=false
            and ts >= now()-interval '21 days'
            and event_name in ('page_view','form_start','form_submit','lead_submitted')
        )
        select d::text d,
          count(*) filter (where event_name='page_view') pv,
          count(*) filter (where event_name='form_start') fs,
          count(*) filter (where event_name='form_submit') fsub,
          count(*) filter (where event_name='lead_submitted') ls
        from e group by d order by d
    """)
    for r in rows:
        print(f"{r['d']:<12}{int(r['pv']):>10}{int(r['fs']):>11}{int(r['fsub']):>12}{int(r['ls']):>9}")
except Exception as e:
    print(f"ERROR: {e}")

# ---------------------------------------------------------------------------
# 3. LEADS daily
# ---------------------------------------------------------------------------
hr("3. leads daily (source=property, last 42d)")
try:
    rows = sql(f"""
        select (created_at at time zone 'Europe/London')::date::text d, count(*) n,
               count(*) filter (where coalesce(status,'')='test') tests
        from leads
        where source='{SITE}' and created_at >= now()-interval '42 days'
        group by 1 order by 1
    """)
    if not rows:
        print("  (no property leads in 42d)")
    for r in rows:
        print(f"  {r['d']}  leads={int(r['n'])}  (test={int(r['tests'])})")
    tot = sql(f"""
        select count(*) filter (where created_at>=now()-interval '7 days') w0,
               count(*) filter (where created_at>=now()-interval '14 days' and created_at<now()-interval '7 days') w1,
               count(*) filter (where created_at>=now()-interval '28 days' and created_at<now()-interval '14 days') w23
        from leads where source='{SITE}' and coalesce(status,'') <> 'test'
    """)[0]
    print(f"\n  NON-TEST leads: W0 last7d={tot['w0']}  W1 prior7d={tot['w1']}  W2-3(wk2-4 14d)={tot['w23']}")
except Exception as e:
    print(f"ERROR: {e}")

# ---------------------------------------------------------------------------
# 4. GSC daily (Google organic ground truth)
# ---------------------------------------------------------------------------
hr("4. GSC daily clicks/impressions (Google organic, ~2-3d lag)")
try:
    from agents.utils.gsc_client_oauth import GSCClient
    gsc = GSCClient()
    start = (TODAY - timedelta(days=42)).strftime("%Y-%m-%d")
    end = TODAY.strftime("%Y-%m-%d")
    resp = gsc.service.searchanalytics().query(
        siteUrl=GSC_PROP,
        body={"startDate": start, "endDate": end, "dimensions": ["date"], "rowLimit": 100},
    ).execute()
    grows = resp.get("rows", [])
    print(f"{'day':<12}{'clicks':>8}{'impr':>9}{'ctr%':>7}{'pos':>7}")
    series = []
    for r in grows:
        d = r["keys"][0]; clk=r.get("clicks",0); imp=r.get("impressions",0)
        ctr=r.get("ctr",0)*100; pos=r.get("position",0)
        series.append((d, clk, imp))
        print(f"{d:<12}{clk:>8.0f}{imp:>9.0f}{ctr:>6.1f}%{pos:>7.1f}")
    # window sums
    def wsum(lo, hi):
        c=i=0
        for d,clk,imp in series:
            dd=datetime.strptime(d,"%Y-%m-%d").date()
            if lo<=dd<hi: c+=clk; i+=imp
        return c,i
    w0=wsum(TODAY-timedelta(days=7), TODAY+timedelta(days=1))
    w1=wsum(TODAY-timedelta(days=14), TODAY-timedelta(days=7))
    w3=wsum(TODAY-timedelta(days=35), TODAY-timedelta(days=28))
    print(f"\n  clicks/impr  W0 last7d={w0[0]:.0f}/{w0[1]:.0f}  W1 prior7d={w1[0]:.0f}/{w1[1]:.0f}  W~4wk-ago={w3[0]:.0f}/{w3[1]:.0f}")
    print("  (NOTE: most recent 2-3 days are usually incomplete in GSC.)")
except Exception as e:
    import traceback; traceback.print_exc()
    print(f"GSC ERROR: {type(e).__name__}: {e}")

# GSC by country last 7d vs prior to see if GB organic specifically moved
hr("4b. GSC by country, last 7d vs prior 7d (clicks)")
try:
    def gsc_country(lo, hi):
        resp = gsc.service.searchanalytics().query(
            siteUrl=GSC_PROP,
            body={"startDate": lo, "endDate": hi, "dimensions": ["country"], "rowLimit": 20},
        ).execute()
        return {r["keys"][0]: r.get("clicks",0) for r in resp.get("rows", [])}
    lo0=(TODAY-timedelta(days=9)).strftime("%Y-%m-%d"); hi0=(TODAY-timedelta(days=3)).strftime("%Y-%m-%d")
    lo1=(TODAY-timedelta(days=16)).strftime("%Y-%m-%d"); hi1=(TODAY-timedelta(days=10)).strftime("%Y-%m-%d")
    c0=gsc_country(lo0,hi0); c1=gsc_country(lo1,hi1)
    print(f"  (W0={lo0}..{hi0}  vs  W1={lo1}..{hi1}; lag-safe windows)")
    print(f"{'country':<10}{'W0 clk':>8}{'W1 clk':>8}")
    for cc in sorted(set(c0)|set(c1), key=lambda k:-(c0.get(k,0)+c1.get(k,0)))[:8]:
        print(f"{cc:<10}{c0.get(cc,0):>8.0f}{c1.get(cc,0):>8.0f}")
except Exception as e:
    print(f"GSC country ERROR: {e}")

# ---------------------------------------------------------------------------
# 5. GA4 daily + channel
# ---------------------------------------------------------------------------
hr("5. GA4 daily sessions/users (Google session pipeline)")
try:
    from optimisation_engine.clients.ga4_client import run_report
    res = run_report(SITE, metrics=["sessions","activeUsers","screenPageViews"],
                     dimensions=["date"], date_ranges=[("42daysAgo","today")], limit=100)
    drows = sorted(res["rows"], key=lambda r: r["date"])
    print(f"{'day':<12}{'sessions':>9}{'users':>8}{'views':>8}")
    for r in drows:
        d=r["date"]; dd=f"{d[:4]}-{d[4:6]}-{d[6:]}"
        print(f"{dd:<12}{int(r['sessions']):>9}{int(r['activeUsers']):>8}{int(r['screenPageViews']):>8}")
except Exception as e:
    import traceback; traceback.print_exc()
    print(f"GA4 ERROR: {type(e).__name__}: {e}")

hr("5b. GA4 by channel, W0 last7d vs W1 prior7d (sessions)")
try:
    def ga4_chan(dr):
        res = run_report(SITE, metrics=["sessions","activeUsers"],
                         dimensions=["sessionDefaultChannelGroup"], date_ranges=[dr], limit=20)
        return {r["sessionDefaultChannelGroup"]: (int(r["sessions"]), int(r["activeUsers"])) for r in res["rows"]}
    w0=ga4_chan(("7daysAgo","today")); w1=ga4_chan(("14daysAgo","8daysAgo"))
    print(f"{'channel':<22}{'W0 sess':>8}{'W1 sess':>8}{'delta':>8}")
    for ch in sorted(set(w0)|set(w1), key=lambda k:-(w1.get(k,(0,0))[0])):
        a=w0.get(ch,(0,0))[0]; b=w1.get(ch,(0,0))[0]
        print(f"{ch[:21]:<22}{a:>8}{b:>8}{a-b:>+8}")
except Exception as e:
    print(f"GA4 channel ERROR: {e}")

hr("5c. GA4 top source/medium W0 vs W1 (sessions)")
try:
    def ga4_sm(dr):
        res = run_report(SITE, metrics=["sessions"], dimensions=["sessionSourceMedium"],
                         date_ranges=[dr], limit=30)
        return {r["sessionSourceMedium"]: int(r["sessions"]) for r in res["rows"]}
    w0=ga4_sm(("7daysAgo","today")); w1=ga4_sm(("14daysAgo","8daysAgo"))
    print(f"{'source/medium':<32}{'W0':>6}{'W1':>6}")
    for sm in sorted(set(w0)|set(w1), key=lambda k:-(w1.get(k,0)+w0.get(k,0)))[:15]:
        print(f"{sm[:31]:<32}{w0.get(sm,0):>6}{w1.get(sm,0):>6}")
except Exception as e:
    print(f"GA4 sm ERROR: {e}")

print("\n\nDONE.")
