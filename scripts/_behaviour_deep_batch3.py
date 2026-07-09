"""Deep behaviour analysis batch 3: converters vs near-miss, journeys, fix-ups."""
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


J = "join web_sessions s on s.session_id=e.session_id where s.is_bot=false and s.site_key='property'"

show("section_view props keys", f"""
    select distinct jsonb_object_keys(e.props) k from web_events e
    where e.event_name='section_view' limit 15
""")

show("converter session anatomy (visitor-level)", """
    select v.converted, count(*) visitors,
           round(avg(v.total_sessions),1) avg_sessions,
           round(avg(v.total_engaged_ms)/1000) avg_engaged_s,
           round(avg(v.max_scroll_pct),1) avg_scroll
    from vw_visitor_journey v group by 1
""")

show("converted visitors: sessions before converting + entry paths", """
    select v.visitor_id, v.total_sessions, v.entry_paths, v.utm_sources
    from vw_visitor_journey v where v.converted limit 60
""")

show("converter sessions: which events appear (distinct sessions with lead)", f"""
    select e.event_name, count(distinct e.session_id) sess
    from web_events e {J} and s.lead_id is not null
    group by 1 order by 2 desc
""")

show("converters: entry template + referrer", f"""
    select case when s.entry_path='/' then '(home)'
                when s.entry_path like '/blog/%' then '/blog/*'
                else s.entry_path end tmpl,
           coalesce(nullif(s.referrer_host,''),'(direct)') ref, count(*) n
    from web_sessions s
    where s.is_bot=false and s.site_key='property' and s.lead_id is not null
    group by 1,2 order by 3 desc limit 20
""")

show("NEAR-MISS segment size: high intent, no lead", f"""
    select count(distinct s.session_id) sessions, count(distinct s.visitor_id) visitors
    from web_sessions s
    where s.is_bot=false and s.site_key='property' and s.lead_id is null
      and (s.engaged_ms > 180000 or s.max_scroll_pct >= 90
           or s.session_id in (select e.session_id from web_events e
                where e.event_name in ('calc_computed','form_start','form_field_focus')))
""")

show("near-miss: what they did (event mix)", f"""
    with nm as (
      select s.session_id from web_sessions s
      where s.is_bot=false and s.site_key='property' and s.lead_id is null
        and (s.engaged_ms > 180000 or s.max_scroll_pct >= 90
             or s.session_id in (select e.session_id from web_events e
                  where e.event_name in ('calc_computed','form_start')))
    )
    select e.event_name, count(distinct e.session_id) sess
    from web_events e join nm on nm.session_id=e.session_id
    where e.event_name in ('calc_computed','calc_result_viewed','form_start','form_field_focus',
                           'form_field_abandon','cta_click','contact_click','exit_intent_shown',
                           'personalization_shown','rage_click')
    group by 1 order by 2 desc
""")

show("form_start sessions: outcome", f"""
    with fs as (select distinct e.session_id from web_events e {J} and e.event_name='form_start')
    select (select count(*) from fs) started,
      (select count(distinct e2.session_id) from web_events e2 join fs on fs.session_id=e2.session_id
        where e2.event_name='form_submit') submitted,
      (select count(distinct e2.session_id) from web_events e2 join fs on fs.session_id=e2.session_id
        where e2.event_name='lead_submitted') lead_done
""")

show("second-page destinations from blog entries (multi-page sessions)", f"""
    with pv as (
      select e.session_id, e.page_path, e.created_at,
             row_number() over (partition by e.session_id order by e.created_at) rn
      from web_events e {J} and e.event_name='page_view' and s.entry_path like '/blog/%')
    select p2.page_path second_page, count(*) n
    from pv p1 join pv p2 on p2.session_id=p1.session_id and p1.rn=1 and p2.rn=2
    group by 1 order by 2 desc limit 15
""")

show("contact page: sessions, form starts, submits", f"""
    with cp as (select distinct e.session_id from web_events e {J} and e.page_path='/contact')
    select (select count(*) from cp) contact_sessions,
      (select count(distinct e2.session_id) from web_events e2 join cp on cp.session_id=e2.session_id
        where e2.event_name='form_field_focus' and e2.page_path='/contact') focused,
      (select count(distinct e2.session_id) from web_events e2 join cp on cp.session_id=e2.session_id
        where e2.event_name='lead_submitted') leads
""")

show("dwell per top page (engagement_time sum by page, top 15 by sessions)", f"""
    select e.page_path, count(distinct e.session_id) sessions,
           round(avg(t.ms)/1000,1) avg_engaged_s
    from (
      select session_id, page_path, sum((props->>'engaged_ms_delta')::numeric) ms
      from web_events where event_name='engagement_time' group by 1,2
    ) t join web_events e on e.session_id=t.session_id and e.page_path=t.page_path and e.event_name='page_view'
    join web_sessions s on s.session_id=e.session_id
    where s.is_bot=false and s.site_key='property'
    group by 1 order by 2 desc limit 15
""")

show("returning visitors: convert on which session number", f"""
    with ranked as (
      select s.visitor_id, s.session_id, s.lead_id,
             row_number() over (partition by s.visitor_id order by s.started_at) sn
      from web_sessions s where s.is_bot=false and s.site_key='property')
    select sn session_number, count(*) leads from ranked where lead_id is not null
    group by 1 order by 1
""")
