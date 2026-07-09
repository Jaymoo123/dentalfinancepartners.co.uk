"""Follow-up read-only survey (fixed columns)."""
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


show("web_sessions columns", """
    select column_name, data_type from information_schema.columns
    where table_schema='public' and table_name='web_sessions' order by ordinal_position
""")

show("scroll depth pct distribution", """
    select e.props->>'pct' pct, count(*) n
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false and e.event_name='scroll_depth'
    group by 1 order by n desc limit 10
""")

show("element_click sample (selector + nearest_text)", """
    select e.props->>'selector' sel, left(e.props->>'nearest_text',40) txt, count(*) n
    from web_events e join web_sessions s on s.session_id = e.session_id
    where s.is_bot = false and e.event_name='element_click'
    group by 1,2 order by n desc limit 20
""")

show("engagement_time totals per session (deciles)", """
    select percentile_cont(array[0.25,0.5,0.75,0.9,0.99]) within group (order by t.ms) deciles
    from (
      select e.session_id, max((e.props->>'cumulative_ms')::numeric) ms
      from web_events e join web_sessions s on s.session_id=e.session_id
      where s.is_bot=false and e.event_name='engagement_time'
      group by 1
    ) t
""")

show("converted vs not (session stats)", """
    select (l.session_id is not null) converted, count(*) n
    from web_sessions s
    left join (select distinct session_id from leads where session_id is not null) l
      on l.session_id = s.session_id
    where s.is_bot=false
    group by 1
""")
