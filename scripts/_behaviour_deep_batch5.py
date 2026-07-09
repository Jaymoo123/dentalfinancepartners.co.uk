"""Batch 5: data-quality sensitivity check. GB vs all, zero-engagement pollution."""
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
                                      "User-Agent": "behaviour-dq/1.0"},
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


show("session quality strata (property, is_bot=false)", """
    select case
        when engaged_ms = 0 and event_count <= 3 then 'dead (0 engaged, <=3 events)'
        when engaged_ms = 0 then 'zero-engaged, some events'
        when engaged_ms < 10000 then 'under 10s'
        else 'engaged 10s+' end stratum,
      count(*) sessions,
      count(*) filter (where country='GB') gb,
      count(*) filter (where country is distinct from 'GB') non_gb,
      count(*) filter (where human_confirmed) human_confirmed,
      count(*) filter (where lead_id is not null) leads
    from web_sessions where is_bot=false and site_key='property'
    group by 1 order by 2 desc
""")

show("dead sessions: who are they (ua/country/entry)", """
    select coalesce(country,'?') c, coalesce(ua_family,'?') ua, count(*) n
    from web_sessions where is_bot=false and site_key='property'
      and engaged_ms=0 and event_count<=3
    group by 1,2 order by 3 desc limit 12
""")

show("human_confirmed x engaged: does human_confirmed already exclude dead?", """
    select human_confirmed, count(*) n,
      round(avg(engaged_ms)/1000) avg_eng_s,
      count(*) filter (where engaged_ms=0) zero_engaged
    from web_sessions where is_bot=false and site_key='property'
    group by 1
""")

show("KEY RATES: all vs GB-only vs GB+engaged (human_confirmed)", """
    with base as (select * from web_sessions where is_bot=false and site_key='property'),
    calc as (select distinct session_id from web_events where event_name='calc_computed'),
    res  as (select distinct session_id from web_events where event_name='calc_result_viewed'),
    frm  as (select distinct session_id from web_events where event_name in ('form_start','form_field_focus'))
    select seg, sessions, leads,
       round(100.0*leads/sessions,2) cvr_pct, calc_sessions, result_viewed, calc_to_form
    from (
      select 'ALL' seg, count(*) sessions,
        count(*) filter (where lead_id is not null) leads,
        count(*) filter (where session_id in (select session_id from calc)) calc_sessions,
        count(*) filter (where session_id in (select session_id from res)) result_viewed,
        count(*) filter (where session_id in (select session_id from calc) and session_id in (select session_id from frm)) calc_to_form
      from base
      union all
      select 'GB', count(*), count(*) filter (where lead_id is not null),
        count(*) filter (where session_id in (select session_id from calc)),
        count(*) filter (where session_id in (select session_id from res)),
        count(*) filter (where session_id in (select session_id from calc) and session_id in (select session_id from frm))
      from base where country='GB'
      union all
      select 'GB+engaged10s', count(*), count(*) filter (where lead_id is not null),
        count(*) filter (where session_id in (select session_id from calc)),
        count(*) filter (where session_id in (select session_id from res)),
        count(*) filter (where session_id in (select session_id from frm) and session_id in (select session_id from calc))
      from base where country='GB' and engaged_ms >= 10000
    ) t
""")

show("near-miss recomputed GB-only", """
    select count(distinct s.session_id) sessions, count(distinct s.visitor_id) visitors
    from web_sessions s
    where s.is_bot=false and s.site_key='property' and s.country='GB' and s.lead_id is null
      and (s.engaged_ms > 180000 or s.max_scroll_pct >= 90
           or s.session_id in (select e.session_id from web_events e
                where e.event_name in ('calc_computed','form_start','form_field_focus')))
""")

show("source CVR GB-only", """
    select coalesce(nullif(referrer_host,''),'(direct)') ref, count(*) sessions,
      round(avg(engaged_ms)/1000) eng_s,
      count(*) filter (where lead_id is not null) leads
    from web_sessions where is_bot=false and site_key='property' and country='GB'
    group by 1 having count(*)>=20 order by 2 desc limit 12
""")

show("interruption surfaces GB-only (shown vs acted)", """
    with gb as (select session_id from web_sessions where is_bot=false and site_key='property' and country='GB')
    select e.event_name, count(distinct e.session_id) sessions
    from web_events e join gb on gb.session_id=e.session_id
    where e.event_name in ('subscribe_view','exit_intent_shown','personalization_shown',
        'personalization_clicked','personalization_dismissed','cta_click','rage_click')
    group by 1 order by 2 desc
""")

show("dead-session share of blog entries (does 94%-single-page survive?)", """
    select country='GB' is_gb,
      count(*) sessions,
      count(*) filter (where engaged_ms>=10000) engaged10,
      round(100.0*count(*) filter (where exit_path is distinct from entry_path)/count(*),1) moved_on_all,
      round(100.0*count(*) filter (where exit_path is distinct from entry_path and engaged_ms>=10000)
        / nullif(count(*) filter (where engaged_ms>=10000),0),1) moved_on_engaged
    from web_sessions where is_bot=false and site_key='property' and entry_path like '/blog/%'
    group by 1
""")
