"""Intraday apples-to-apples test for the 'we'd be further ahead by this hour'
hypothesis.

1. Ingestion freshness  - is tracking live to the current minute?
2. Cumulative-to-same-cutoff - today vs last 14 days, weekday-labelled, and
   same-weekday (Thursday) baseline. Tests 'behind by this time of day'.
3. Hourly shape - human sessions by hour-of-day, last7 vs prev7 + today,
   to test 'mid-day surge has flattened'. Cross-checked with GA4 (independent
   of our Supabase tracking).
"""
from __future__ import annotations
import os, sys
from datetime import date, datetime, timedelta
import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path: sys.path.insert(0, ROOT)
try:
    from dotenv import load_dotenv; load_dotenv(os.path.join(ROOT, ".env"))
except ImportError: pass

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"
SITE = "property"

def sql(q):
    r = httpx.post(URL, headers={"Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json", "User-Agent": "x"}, json={"query": q}, timeout=90)
    r.raise_for_status(); return r.json()

def hr(t): print("\n" + "="*82 + f"\n{t}\n" + "="*82)

# ---------------------------------------------------------------------------
hr("0. INGESTION FRESHNESS - is tracking live right now?")
try:
    r = sql("""
      select
        (select now() at time zone 'UTC')::text                                   as now_utc,
        (select max(started_at) at time zone 'UTC' from web_sessions where site_key='property')::text as last_session,
        (select max(ts) at time zone 'UTC' from web_events where site_key='property')::text           as last_event,
        (select count(*) from web_sessions where site_key='property' and started_at >= now()-interval '60 minutes') as sess_last_60m,
        (select count(*) from web_events  where site_key='property' and ts >= now()-interval '60 minutes')          as evt_last_60m,
        (select count(*) from web_sessions where site_key='property' and not is_bot and started_at >= now()-interval '60 minutes') as human_sess_last_60m
    """)[0]
    for k,v in r.items(): print(f"  {k:<22} {v}")
except Exception as e: print("ERR", e)

# ---------------------------------------------------------------------------
hr("1. CUMULATIVE TO SAME TIME-OF-DAY CUTOFF (UTC). Today vs last 14 days.")
print("   'to_cut' = visitors/sessions from 00:00 UTC to the SAME elapsed offset as now.")
print("   'full'   = whole-day total (for today, full==to_cut).\n")
try:
    rows = sql("""
      with b as (select date_trunc('day', now()) td, (now()-date_trunc('day', now())) el)
      select to_char(gd,'YYYY-MM-DD') d, trim(to_char(gd,'Dy')) dow,
        count(distinct s.visitor_id) filter (where not s.is_bot) hum_full,
        count(distinct s.visitor_id) filter (where not s.is_bot and s.started_at < gd + (select el from b)) hum_cut,
        count(distinct s.session_id) filter (where not s.is_bot) sess_full,
        count(distinct s.session_id) filter (where not s.is_bot and s.started_at < gd + (select el from b)) sess_cut,
        count(distinct s.visitor_id) filter (where not s.is_bot and s.country='GB' and s.started_at < gd + (select el from b)) gb_cut
      from generate_series((select td from b)-interval '14 days', (select td from b), interval '1 day') gd
      left join web_sessions s on s.site_key='property' and coalesce(s.is_embed,false)=false
        and s.started_at >= gd and s.started_at < gd + interval '1 day'
      group by gd order by gd
    """)
    print(f"{'day':<12}{'dow':<5}{'hum@cut':>8}{'hum_full':>9}{'sess@cut':>9}{'GB@cut':>8}")
    for r in rows:
        print(f"{r['d']:<12}{r['dow']:<5}{int(r['hum_cut']):>8}{int(r['hum_full']):>9}{int(r['sess_cut']):>9}{int(r['gb_cut']):>8}")
    # Same-weekday baseline
    today_dow = rows[-1]['dow']
    same = [r for r in rows[:-1] if r['dow']==today_dow]
    if same:
        avg = sum(int(r['hum_cut']) for r in same)/len(same)
        gbavg = sum(int(r['gb_cut']) for r in same)/len(same)
        print(f"\n  Today ({today_dow}) hum@cut = {int(rows[-1]['hum_cut'])} | GB@cut = {int(rows[-1]['gb_cut'])}")
        print(f"  Prior {today_dow}s avg hum@cut = {avg:.0f} | GB@cut = {gbavg:.0f}  (n={len(same)}: {', '.join(r['d'] for r in same)})")
    # trailing-7 same-cutoff avg
    last7 = rows[-8:-1]
    a7 = sum(int(r['hum_cut']) for r in last7)/len(last7)
    print(f"  Trailing-7-day avg hum@cut = {a7:.0f}  (today vs this = {int(rows[-1]['hum_cut'])-a7:+.0f})")
except Exception as e:
    import traceback; traceback.print_exc()

# ---------------------------------------------------------------------------
hr("2. HOURLY SHAPE (UTC hour). Avg human SESSIONS per hour-of-day. BST=UTC+1.")
print("   Tests 'mid-day surge has flattened'. last7 vs prev7, + today so far.\n")
try:
    rows = sql("""
      with h as (
        select extract(hour from started_at at time zone 'UTC')::int hr, (started_at at time zone 'UTC')::date d, count(*) c
        from web_sessions
        where site_key='property' and not is_bot and coalesce(is_embed,false)=false
          and started_at >= now()-interval '15 days'
        group by 1,2
      )
      select hr,
        round(avg(c) filter (where d >= (now()-interval '7 days')::date and d < (now())::date),1) last7,
        round(avg(c) filter (where d >= (now()-interval '14 days')::date and d < (now()-interval '7 days')::date),1) prev7,
        max(c) filter (where d = (now())::date) today
      from h group by hr order by hr
    """)
    print(f"{'hr(UTC)':<8}{'last7 avg':>10}{'prev7 avg':>10}{'today':>8}")
    for r in rows:
        t = '' if r['today'] is None else str(int(r['today']))
        l = '' if r['last7'] is None else f"{float(r['last7']):.1f}"
        p = '' if r['prev7'] is None else f"{float(r['prev7']):.1f}"
        bar = '#' * int(float(r['last7'] or 0))
        print(f"{int(r['hr']):<8}{l:>10}{p:>10}{t:>8}  {bar}")
except Exception as e:
    import traceback; traceback.print_exc()

# ---------------------------------------------------------------------------
hr("3. GA4 cross-check (independent pipeline): cumulative activeUsers by hour, last 6 days")
try:
    from optimisation_engine.clients.ga4_client import run_report
    res = run_report(SITE, metrics=["activeUsers","sessions"], dimensions=["dateHour"],
                     date_ranges=[("6daysAgo","today")], limit=300)
    # dateHour = YYYYMMDDHH (property timezone, UK = Europe/London)
    byday = {}
    for row in res["rows"]:
        dh = row["dateHour"]; d=dh[:8]; h=int(dh[8:10])
        byday.setdefault(d, {})[h] = int(row["activeUsers"])
    days = sorted(byday)
    # current local hour from latest data
    maxh = max(h for d in byday for h in byday[d] if d==days[-1]) if days else 0
    print(f"   GA4 property-local hour. Latest data hour today = {maxh}.")
    print(f"   Cumulative activeUsers through hour {maxh} each day:\n")
    print(f"{'day':<10}{'cume@hr'+str(maxh):>10}{'full-day':>10}")
    for d in days:
        cume = sum(v for h,v in byday[d].items() if h<=maxh)
        full = sum(byday[d].values())
        dd=f"{d[:4]}-{d[4:6]}-{d[6:]}"
        print(f"{dd:<10}{cume:>10}{full:>10}")
except Exception as e:
    import traceback; traceback.print_exc()

print("\nDONE.")
