"""Deep behaviour analysis batch 2: content engagement, surfaces, friction, calcs, forms."""
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

show("scroll funnel per top blog page (>=100 sessions w/ scroll)", f"""
    with se as (
      select e.page_path, e.session_id, max((e.props->>'pct')::int) mx
      from web_events e {J} and e.event_name='scroll_depth'
      group by 1,2)
    select page_path, count(*) scrollers,
      round(100.0*count(*) filter (where mx>=50)/count(*),1) pct_50,
      round(100.0*count(*) filter (where mx>=90)/count(*),1) pct_90
    from se group by 1 having count(*)>=80 order by scrollers desc limit 15
""")

show("most-read section topics (section_view props.section, top 25)", f"""
    select left(e.props->>'section',60) section, count(distinct e.session_id) sessions
    from web_events e {J} and e.event_name='section_view'
    group by 1 order by 2 desc limit 25
""")

show("interruption surfaces: shown vs acted", f"""
    select e.event_name, count(*) n, count(distinct e.session_id) sessions
    from web_events e {J} and e.event_name in
      ('exit_intent_shown','personalization_shown','personalization_clicked','personalization_dismissed',
       'subscribe_view','subscribe_submitted','support_opened','gate_view','resource_unlocked')
    group by 1 order by 2 desc
""")

show("personalization by placement/topic: shown vs clicked", f"""
    select coalesce(e.props->>'placement', e.props->>'kind', e.props->>'topic','?') key,
           count(*) filter (where e.event_name='personalization_shown') shown,
           count(*) filter (where e.event_name='personalization_clicked') clicked,
           count(*) filter (where e.event_name='personalization_dismissed') dismissed
    from web_events e {J} and e.event_name like 'personalization_%'
    group by 1 order by shown desc limit 12
""")

show("rage_click selectors (what element)", f"""
    select e.props->>'selector' sel, left(e.props->>'nearest_text',40) txt, count(*) n,
           count(distinct e.session_id) sessions
    from web_events e {J} and e.event_name='rage_click'
    group by 1,2 order by n desc limit 15
""")

show("client_error messages (top)", f"""
    select left(coalesce(e.props->>'message',e.props->>'error',''),80) msg, count(*) n
    from web_events e {J} and e.event_name='client_error'
    group by 1 order by 2 desc limit 10
""")

show("calculator funnel per slug", f"""
    select coalesce(e.props->>'calculator_slug',e.props->>'calculator',e.props->>'slug','?') calc,
      count(distinct e.session_id) filter (where e.event_name='calc_view') viewed,
      count(distinct e.session_id) filter (where e.event_name='calc_input_change') interacted,
      count(distinct e.session_id) filter (where e.event_name='calc_computed') computed,
      count(distinct e.session_id) filter (where e.event_name='calc_result_viewed') result_viewed
    from web_events e {J} and e.event_name like 'calc_%'
    group by 1 order by viewed desc limit 15
""")

show("calc sessions -> later form activity", f"""
    with cs as (select distinct e.session_id from web_events e {J} and e.event_name='calc_computed')
    select
      (select count(*) from cs) calc_sessions,
      (select count(distinct e2.session_id) from web_events e2 join cs on cs.session_id=e2.session_id
        where e2.event_name in ('form_start','form_field_focus')) went_to_form,
      (select count(distinct e2.session_id) from web_events e2 join cs on cs.session_id=e2.session_id
        where e2.event_name='lead_submitted') converted
""")

show("form field drop-off", """
    select * from vw_form_field_dropoff limit 20
""")

show("multi-step form step funnel", """
    select * from vw_form_step_funnel limit 20
""")

show("cta performance by cta_id", f"""
    select coalesce(e.props->>'cta_id','?') cta, coalesce(e.props->>'goal','') goal, count(*) clicks,
           count(distinct e.session_id) sessions
    from web_events e {J} and e.event_name='cta_click'
    group by 1,2 order by clicks desc limit 20
""")

show("exit intent: shown -> anything after (same session lead?)", f"""
    with ei as (select distinct e.session_id from web_events e {J} and e.event_name='exit_intent_shown')
    select (select count(*) from ei) shown_sessions,
      (select count(distinct e2.session_id) from web_events e2 join ei on ei.session_id=e2.session_id
        where e2.event_name in ('subscribe_submitted','lead_submitted','form_start')) acted_after
""")
