"""Deep behaviour analysis batch 1: funnel, acquisition, device, time patterns. Read-only."""
from __future__ import annotations
import os, json
import httpx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except ImportError:
    pass

TOKEN = os.getenv("SUPABASE_ACCESS_TOKEN", "")
MGMT_URL = "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query"


def sql(q):
    r = httpx.post(MGMT_URL, headers={"Authorization": f"Bearer {TOKEN}",
                                      "Content-Type": "application/json",
                                      "User-Agent": "behaviour-deep/1.0"},
                   json={"query": q}, timeout=120.0)
    r.raise_for_status()
    return r.json()


def show(title, q):
    print(f"\n===== {title} =====")
    try:
        for row in sql(q):
            print(json.dumps(row, default=str))
    except Exception as e:
        print(f"ERROR: {e}")


HUMAN = "s.is_bot = false and s.site_key = 'property'"

show("weekly sessions/engagement/conversion trend", f"""
    select date_trunc('week', s.started_at)::date wk, count(*) sessions,
           round(avg(s.engaged_ms)/1000) avg_engaged_s,
           round(avg(s.max_scroll_pct),1) avg_scroll,
           count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN}
    group by 1 order by 1
""")

show("device x conversion", f"""
    select s.device_type, count(*) sessions,
           round(avg(s.engaged_ms)/1000) avg_engaged_s,
           round(avg(s.max_scroll_pct),1) avg_scroll,
           count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN} group by 1 order by 2 desc
""")

show("referrer_host x conversion (top 15)", f"""
    select coalesce(nullif(s.referrer_host,''),'(direct)') ref, count(*) sessions,
           round(avg(s.engaged_ms)/1000) avg_engaged_s,
           count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN} group by 1 order by 2 desc limit 15
""")

show("country split", f"""
    select coalesce(s.country,'?') c, count(*) n,
           count(*) filter (where s.lead_id is not null) leads,
           round(avg(s.engaged_ms)/1000) avg_engaged_s
    from web_sessions s where {HUMAN} group by 1 order by 2 desc limit 10
""")

show("entry_path template x depth (top 20)", f"""
    select case
             when s.entry_path = '/' then '(home)'
             when s.entry_path like '/blog/%' then '/blog/*'
             when s.entry_path like '/calculators%' then '/calculators/*'
             when s.entry_path like '/services%' then '/services/*'
             when s.entry_path like '/for/%' then '/for/*'
             when s.entry_path like '/research%' then '/research/*'
             else s.entry_path end tmpl,
           count(*) sessions,
           round(avg(s.engaged_ms)/1000) avg_engaged_s,
           round(avg(s.max_scroll_pct),1) avg_scroll,
           round(100.0*count(*) filter (where s.exit_path is distinct from s.entry_path)/count(*),1) pct_moved_on,
           count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN} group by 1 order by 2 desc limit 20
""")

show("top individual entry pages (30d)", f"""
    select s.entry_path, count(*) sessions,
           round(avg(s.engaged_ms)/1000) eng_s,
           round(avg(s.max_scroll_pct),1) scroll,
           round(100.0*count(*) filter (where s.exit_path is distinct from s.entry_path)/count(*),1) pct_moved_on
    from web_sessions s where {HUMAN} and s.started_at > now() - interval '30 days'
    group by 1 order by 2 desc limit 20
""")

show("hour-of-day (UK) x sessions/leads", f"""
    select extract(hour from s.started_at at time zone 'Europe/London')::int hr,
           count(*) sessions, count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN} group by 1 order by 1
""")

show("day-of-week x sessions/leads", f"""
    select to_char(s.started_at at time zone 'Europe/London','Dy') dow,
           count(*) sessions, count(*) filter (where s.lead_id is not null) leads
    from web_sessions s where {HUMAN} group by 1,extract(dow from s.started_at) order by extract(dow from s.started_at)
""")

show("pages-per-session distribution", f"""
    select least(pv,8) pages, count(*) sessions from (
      select e.session_id, count(*) pv from web_events e
      join web_sessions s on s.session_id=e.session_id
      where {HUMAN} and e.event_name='page_view' group by 1
    ) t group by 1 order by 1
""")

show("nested funnel v2 totals (all-time)", """
    select sum(sessions) sessions, sum(engaged) engaged, sum(clicked_form_cta) form_cta,
           sum(form_started) form_started, sum(converted) converted, sum(used_calculator) used_calc
    from vw_web_funnel_daily_v2
""")
