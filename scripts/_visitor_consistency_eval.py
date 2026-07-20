"""Read-only diagnostic: WHY the console's visitor/session numbers disagree.

Reproduces each dashboard surface's numbers for TODAY (UTC) directly from the
live RPCs, then decomposes the Property "event-anchored vs session-anchored"
visitor gap (the 51-vs-32 / estate 64-vs-45 discrepancy) into its causes:
  - returning / midnight-spanning  (session started before 00:00 UTC today)
  - bot-flag divergence            (web_sessions.is_bot=true but web_events.is_bot=false)
  - orphan / other

Also enumerates the finest 15-minute buckets today to locate the reported
"~27 visitors in 10 minutes" spike and shows who those visitors were.

READ-ONLY: only SELECTs and STABLE function calls via the Supabase Management API.
Mirrors the sql() pattern in scripts/_traffic_eval.py.
"""
from __future__ import annotations
import os, sys
from datetime import datetime, timezone
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

if not TOKEN:
    print("ERROR: SUPABASE_ACCESS_TOKEN not set in .env — cannot run diagnostic.")
    sys.exit(1)

# Today's UTC window, matching the dashboard's Date.UTC(y,m,d) -> 00:00Z boundary.
NOW = datetime.now(timezone.utc)
START = NOW.replace(hour=0, minute=0, second=0, microsecond=0)
NOW_ISO = NOW.strftime("%Y-%m-%dT%H:%M:%S+00:00")
START_ISO = START.strftime("%Y-%m-%dT%H:%M:%S+00:00")


def sql(q: str):
    r = httpx.post(
        MGMT_URL,
        headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json",
                 "User-Agent": "visitor-consistency-eval/1.0"},
        json={"query": q}, timeout=90.0,
    )
    r.raise_for_status()
    return r.json()


def hr(t):
    print("\n" + "=" * 78)
    print(t)
    print("=" * 78)


print(f"UTC window: [{START_ISO}, {NOW_ISO})   (today since 00:00 UTC)")

# ---------------------------------------------------------------------------
# 0. Reproduce EXACTLY what each dashboard surface shows, from the live RPCs.
# ---------------------------------------------------------------------------
hr("0. Live RPC reproduction of each surface (today, GB)")

try:
    rows = sql(f"""
        select site_key, sessions, humans
        from estate_kpis('{START_ISO}'::timestamptz, '{NOW_ISO}'::timestamptz, null, 'GB')
        order by humans desc
    """)
    est_sess = sum(int(r['sessions']) for r in rows)
    est_hum = sum(int(r['humans']) for r in rows)
    prop = next((r for r in rows if r['site_key'] == SITE), None)
    print("estate_kpis()  [CARDS, session-anchored]:")
    print(f"  ESTATE cards  -> sessions={est_sess}  visitors={est_hum}   (dashboard shows 51 / 45)")
    if prop:
        print(f"  PROPERTY card -> sessions={int(prop['sessions'])}  visitors={int(prop['humans'])}   (dashboard shows 36 / 32)")
    print("  per-site humans:", {r['site_key']: int(r['humans']) for r in rows})
except Exception as e:
    print(f"estate_kpis ERROR: {type(e).__name__}: {e}")

try:
    rows = sql(f"""
        select coalesce(sum(sessions),0) sessions, coalesce(sum(humans),0) humans
        from estate_timeseries('1 day', '{START_ISO}'::timestamptz, '{NOW_ISO}'::timestamptz, 'GB')
    """)
    r = rows[0]
    print("\nestate_timeseries('1 day')  [ESTATE CHART, event-anchored]:")
    print(f"  ESTATE chart today -> sessions={int(r['sessions'])}  visitors={int(r['humans'])}   (dashboard shows 51 / 64)")
except Exception as e:
    print(f"estate_timeseries ERROR: {type(e).__name__}: {e}")

try:
    rows = sql(f"""
        select coalesce(sum(sessions),0) sessions, coalesce(sum(humans),0) humans
        from web_timeseries('{SITE}', '1 day', '{START_ISO}'::timestamptz, '{NOW_ISO}'::timestamptz, 'GB')
    """)
    r = rows[0]
    print("\nweb_timeseries('property','1 day')  [PROPERTY CHART, event-anchored]:")
    print(f"  PROPERTY chart today -> sessions={int(r['sessions'])}  visitors={int(r['humans'])}   (dashboard shows ~51)")
except Exception as e:
    print(f"web_timeseries ERROR: {type(e).__name__}: {e}")

# ---------------------------------------------------------------------------
# 1. Property: the event set (E), the session-started set (S), and the delta.
# ---------------------------------------------------------------------------
hr("1. Property visitor sets — E (event-anchored) vs S (session-started)")
print("E = distinct visitor_id with a GB, event.is_bot=false event today (mirrors web_timeseries)")
print("S = distinct visitor_id with a GB, session.is_bot=false session STARTED today (mirrors estate_kpis)\n")
try:
    rows = sql(f"""
        with e as (
          select distinct e.visitor_id
          from web_events e
          join web_sessions ws on ws.session_id = e.session_id
          where e.site_key='{SITE}' and e.is_bot=false
            and e.ts >= '{START_ISO}'::timestamptz and e.ts < '{NOW_ISO}'::timestamptz
            and ws.country='GB'
        ),
        s as (
          select distinct visitor_id
          from web_sessions
          where site_key='{SITE}' and is_bot=false and country='GB'
            and started_at >= '{START_ISO}'::timestamptz and started_at < '{NOW_ISO}'::timestamptz
        )
        select
          (select count(*) from e) e_count,
          (select count(*) from s) s_count,
          (select count(*) from e where visitor_id not in (select visitor_id from s)) delta_count
    """)
    r = rows[0]
    print(f"  |E| event-anchored   = {int(r['e_count'])}   (should ~= 51)")
    print(f"  |S| session-started  = {int(r['s_count'])}   (should ~= 32)")
    print(f"  |E \\ S| delta        = {int(r['delta_count'])}   (should ~= 19)")
except Exception as e:
    print(f"set ERROR: {type(e).__name__}: {e}")

# ---------------------------------------------------------------------------
# 2. Classify each delta visitor (E but not S): WHY are they in the chart but
#    not the card?
# ---------------------------------------------------------------------------
hr("2. Delta visitors classified (in chart, not in card) — the cause of the gap")
try:
    rows = sql(f"""
        with e as (
          select distinct e.visitor_id
          from web_events e
          join web_sessions ws on ws.session_id = e.session_id
          where e.site_key='{SITE}' and e.is_bot=false
            and e.ts >= '{START_ISO}'::timestamptz and e.ts < '{NOW_ISO}'::timestamptz
            and ws.country='GB'
        ),
        s as (
          select distinct visitor_id
          from web_sessions
          where site_key='{SITE}' and is_bot=false and country='GB'
            and started_at >= '{START_ISO}'::timestamptz and started_at < '{NOW_ISO}'::timestamptz
        ),
        delta as (select visitor_id from e where visitor_id not in (select visitor_id from s)),
        -- per-visitor facts across ALL their property sessions
        facts as (
          select d.visitor_id,
                 bool_or(ws.is_bot) any_bot_session,
                 bool_and(ws.is_bot) all_sessions_bot,
                 bool_or(not ws.is_bot and ws.started_at >= '{START_ISO}'::timestamptz) nonbot_today,
                 bool_or(not ws.is_bot and ws.started_at <  '{START_ISO}'::timestamptz) nonbot_prior,
                 bool_or(ws.is_bot   and ws.started_at >= '{START_ISO}'::timestamptz) bot_today,
                 min(ws.started_at) first_session,
                 count(*) n_sessions,
                 max(ws.country) country,
                 max(ws.ua_family) ua_family,
                 max(ws.device_type) device_type,
                 max(ws.bot_reason) bot_reason,
                 max(ws.referrer_host) referrer_host
          from delta d
          join web_sessions ws on ws.visitor_id = d.visitor_id and ws.site_key='{SITE}'
          group by d.visitor_id
        )
        select
          case
            when all_sessions_bot then 'A) every session bot-flagged (bot-divergence)'
            when bot_today and not nonbot_today then 'B) today session bot-flagged (bot-divergence)'
            when nonbot_prior and not nonbot_today then 'C) returning (session started before today)'
            else 'D) other/orphan'
          end as cause,
          count(*) as visitors
        from facts
        group by cause order by visitors desc
    """)
    if not rows:
        print("  (no delta visitors)")
    for r in rows:
        print(f"  {int(r['visitors']):>3}  {r['cause']}")
except Exception as e:
    print(f"classify ERROR: {type(e).__name__}: {e}")

# Per-visitor detail for eyeballing (UA family / bot_reason / device / referrer)
hr("2b. Delta visitors — detail (are the bot-flagged ones real crawlers or false positives?)")
try:
    rows = sql(f"""
        with e as (
          select distinct e.visitor_id
          from web_events e
          join web_sessions ws on ws.session_id = e.session_id
          where e.site_key='{SITE}' and e.is_bot=false
            and e.ts >= '{START_ISO}'::timestamptz and e.ts < '{NOW_ISO}'::timestamptz
            and ws.country='GB'
        ),
        s as (
          select distinct visitor_id
          from web_sessions
          where site_key='{SITE}' and is_bot=false and country='GB'
            and started_at >= '{START_ISO}'::timestamptz and started_at < '{NOW_ISO}'::timestamptz
        ),
        delta as (select visitor_id from e where visitor_id not in (select visitor_id from s))
        select d.visitor_id,
               bool_or(ws.is_bot) any_bot,
               bool_and(ws.is_bot) all_bot,
               min(ws.started_at)::text first_session,
               count(distinct ws.session_id) n_sess,
               max(ws.ua_family) ua_family,
               max(ws.device_type) device,
               max(ws.bot_reason) bot_reason,
               max(coalesce(nullif(ws.referrer_host,''),'(direct)')) referrer,
               (select count(*) from web_events ev where ev.visitor_id=d.visitor_id and ev.site_key='{SITE}'
                  and ev.ts >= '{START_ISO}'::timestamptz and ev.ts < '{NOW_ISO}'::timestamptz) events_today
        from delta d
        join web_sessions ws on ws.visitor_id=d.visitor_id and ws.site_key='{SITE}'
        group by d.visitor_id
        order by all_bot desc, first_session
        limit 40
    """)
    print(f"{'visitor':<16}{'allbot':>7}{'sess':>5}{'evts':>5}  {'ua_family':<14}{'device':<9}{'bot_reason':<18}{'referrer':<20}{'first_session'}")
    for r in rows:
        vid = str(r['visitor_id'])[:15]
        print(f"{vid:<16}{str(r['all_bot']):>7}{int(r['n_sess']):>5}{int(r['events_today']):>5}  "
              f"{str(r['ua_family'] or '-')[:13]:<14}{str(r['device'] or '-')[:8]:<9}"
              f"{str(r['bot_reason'] or '-')[:17]:<18}{str(r['referrer'])[:19]:<20}{str(r['first_session'])[:19]}")
except Exception as e:
    print(f"detail ERROR: {type(e).__name__}: {e}")

# ---------------------------------------------------------------------------
# 3. The "27 visitors in ~10 min" spike — finest 15-min buckets today.
# ---------------------------------------------------------------------------
hr("3. Property 15-minute buckets today (locate the spike)")
try:
    rows = sql(f"""
        select bucket::text bucket, sessions, humans, events
        from web_timeseries('{SITE}', '15 minutes', '{START_ISO}'::timestamptz, '{NOW_ISO}'::timestamptz, 'GB')
        order by humans desc
        limit 8
    """)
    print("Top buckets by visitors (humans):")
    print(f"  {'bucket (UTC)':<22}{'visitors':>9}{'sessions':>9}{'events':>8}")
    for r in rows:
        print(f"  {r['bucket']:<22}{int(r['humans']):>9}{int(r['sessions']):>9}{int(r['events']):>8}")
    top = rows[0]['bucket'] if rows else None
except Exception as e:
    print(f"spike ERROR: {type(e).__name__}: {e}")
    top = None

# Also: what does the SAME 15-min window look like WITHOUT the country filter and
# with the SESSION-level bot gate — to see how much is non-GB / bot-flagged.
if top:
    hr(f"3b. Composition of the top 15-min bucket ({top})")
    try:
        rows = sql(f"""
            with b as (
              select e.visitor_id, e.session_id, ws.country, ws.is_bot session_bot, e.is_bot event_bot,
                     ws.ua_family, ws.device_type, ws.bot_reason
              from web_events e
              join web_sessions ws on ws.session_id = e.session_id
              where e.site_key='{SITE}'
                and e.ts >= '{top}'::timestamptz and e.ts < ('{top}'::timestamptz + interval '15 minutes')
            )
            select
              count(distinct visitor_id) all_visitors,
              count(distinct visitor_id) filter (where not event_bot) event_nonbot,
              count(distinct visitor_id) filter (where not event_bot and country='GB') event_nonbot_gb,
              count(distinct visitor_id) filter (where not session_bot and country='GB') session_nonbot_gb,
              count(distinct visitor_id) filter (where country='GB') gb_all,
              count(distinct visitor_id) filter (where country is distinct from 'GB') non_gb
            from b
        """)
        r = rows[0]
        print(f"  distinct visitors in bucket (all)              : {int(r['all_visitors'])}")
        print(f"  event.is_bot=false                             : {int(r['event_nonbot'])}")
        print(f"  event.is_bot=false AND country=GB (chart basis): {int(r['event_nonbot_gb'])}")
        print(f"  session.is_bot=false AND country=GB (clean)    : {int(r['session_nonbot_gb'])}")
        print(f"  GB (any bot flag)                              : {int(r['gb_all'])}")
        print(f"  non-GB                                         : {int(r['non_gb'])}")
    except Exception as e:
        print(f"bucket-composition ERROR: {type(e).__name__}: {e}")

print("\n\nDONE.")
