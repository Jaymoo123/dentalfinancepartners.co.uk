"""Form drop-off vs fill eval, post multi-step deploy (2026-07-09)."""
from __future__ import annotations
import os, json, sys
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
                                      "User-Agent": "form-dropoff/1.0"},
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


SITE = sys.argv[1] if len(sys.argv) > 1 else "property"  # ponytail: positional site key
J = f"join web_sessions s on s.session_id=e.session_id where s.is_bot=false and s.site_key='{SITE}'"

show("funnel per form_id x flow since deploy (2026-07-09)", f"""
    select e.props->>'form_id' form_id, e.props->>'flow' flow, e.event_name,
           count(distinct e.session_id) sessions, count(*) events
    from web_events e {J}
      and e.ts >= '2026-07-09T21:40:00Z'
      and e.event_name in ('form_start','form_step_view','form_step_complete','form_step_back','form_error','form_submit','lead_submitted')
    group by 1,2,3 order by 1,2,3
""")

show("step-level detail since deploy", f"""
    select e.props->>'form_id' form_id, e.event_name, e.props->>'step_id' step_id,
           count(distinct e.session_id) sessions
    from web_events e {J}
      and e.ts >= '2026-07-09T21:40:00Z'
      and e.event_name in ('form_step_view','form_step_complete','form_step_back','form_error')
    group by 1,2,3 order by 1,3,2
""")

show("form_error kinds since deploy", f"""
    select e.props->>'form_id' form_id, e.props->>'error_kind' kind, e.props->>'step' step, count(*) n
    from web_events e {J}
      and e.ts >= '2026-07-09T21:40:00Z' and e.event_name='form_error'
    group by 1,2,3 order by 4 desc
""")

show("pre-deploy 28d baseline: starts vs submits per form_id", f"""
    select e.props->>'form_id' form_id,
           count(distinct e.session_id) filter (where e.event_name='form_start') starts,
           count(distinct e.session_id) filter (where e.event_name='form_submit') submits
    from web_events e {J}
      and e.ts >= '2026-06-11' and e.ts < '2026-07-09T21:40:00Z'
      and e.event_name in ('form_start','form_submit')
    group by 1 order by 2 desc
""")

show("post-deploy: starts vs submits per form_id", f"""
    select e.props->>'form_id' form_id,
           count(distinct e.session_id) filter (where e.event_name='form_start') starts,
           count(distinct e.session_id) filter (where e.event_name='form_submit') submits
    from web_events e {J}
      and e.ts >= '2026-07-09T21:40:00Z'
      and e.event_name in ('form_start','form_submit')
    group by 1 order by 2 desc
""")
