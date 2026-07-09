"""Read-only survey of Property behaviour data for blue-sky CRO exploration."""
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


def sql(q: str):
    r = httpx.post(MGMT_URL, headers={"Authorization": f"Bearer {TOKEN}",
                                      "Content-Type": "application/json",
                                      "User-Agent": "behaviour-survey/1.0"},
                   json={"query": q}, timeout=90.0)
    r.raise_for_status()
    return r.json()


def show(title, q):
    print(f"\n===== {title} =====")
    try:
        for row in sql(q):
            print(json.dumps(row, default=str))
    except Exception as e:
        print(f"ERROR: {e}")


show("event volume by type (human, all time)", """
    select e.event_name, count(*) n, count(distinct e.session_id) sessions
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false
    group by 1 order by n desc
""")

show("human sessions per week + events", """
    select date_trunc('week', s.started_at)::date wk,
           count(*) sessions,
           sum(s.event_count) events,
           count(*) filter (where s.page_views > 1) multi_page
    from web_sessions s where s.is_bot = false
    group by 1 order by 1
""")

show("scroll depth distribution (human)", """
    select e.props->>'depth' depth, count(*) n
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false and e.event_name = 'scroll_depth'
    group by 1 order by n desc limit 12
""")

show("engagement_time sample props keys", """
    select distinct jsonb_object_keys(e.props) k
    from web_events e where e.event_name in ('engagement_time','scroll_depth','cta_click','rage_click','dead_click')
    limit 40
""")

show("top pages by human sessions (30d)", """
    select e.page_path, count(distinct e.session_id) sessions,
           count(*) filter (where e.event_name='cta_click') cta_clicks,
           count(*) filter (where e.event_name like 'form_%') form_events
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false and e.created_at > now() - interval '30 days'
    group by 1 order by sessions desc limit 15
""")

show("rage/dead clicks by page (all time, human)", """
    select e.page_path, e.event_name, count(*) n
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false and e.event_name in ('rage_click','dead_click')
    group by 1,2 order by n desc limit 15
""")

show("sessions with a lead vs without: events per session", """
    select (s.session_id in (select session_id from leads where session_id is not null)) converted,
           count(*) sessions,
           round(avg(s.event_count),1) avg_events,
           round(avg(s.page_views),1) avg_pages,
           round(avg(s.duration_seconds)) avg_dur_s
    from web_sessions s where s.is_bot = false
    group by 1
""")

show("returning visitors (multi-session)", """
    select sessions_per_visitor, count(*) visitors from (
      select visitor_id, count(*) sessions_per_visitor
      from web_sessions where is_bot = false group by 1
    ) t group by 1 order by 1 limit 10
""")
