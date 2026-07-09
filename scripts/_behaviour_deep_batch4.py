"""Deep behaviour analysis batch 4: fix-ups."""
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


show("web_events columns", """
    select column_name from information_schema.columns
    where table_schema='public' and table_name='web_events' order by ordinal_position
""")

show("subscribe events all-time", """
    select e.event_name, count(*) from web_events e
    where e.event_name like 'subscribe%' group by 1
""")

show("second-page destinations from blog entries", """
    with pv as (
      select e.session_id, e.page_path, e.ts,
             row_number() over (partition by e.session_id order by e.ts) rn
      from web_events e join web_sessions s on s.session_id=e.session_id
      where s.is_bot=false and s.site_key='property'
        and e.event_name='page_view' and s.entry_path like '/blog/%')
    select case when p2.page_path like '/blog/%' then '(another blog post)'
                else p2.page_path end second_page, count(*) n
    from pv p1 join pv p2 on p2.session_id=p1.session_id and p1.rn=1 and p2.rn=2
    group by 1 order by 2 desc limit 15
""")

show("most-read sections (section_text, top 20)", """
    select left(e.props->>'section_text',55) sec, count(distinct e.session_id) n
    from web_events e join web_sessions s on s.session_id=e.session_id
    where s.is_bot=false and s.site_key='property' and e.event_name='section_view'
    group by 1 order by 2 desc limit 20
""")

show("gate_view -> resource_unlocked", """
    select e.event_name, count(*) from web_events e
    where e.event_name in ('gate_view','resource_unlocked') group by 1
""")
