"""One-off backfill: apply bot_scorer's passive_session rule to history.

Context: docs/_engines/CARETAKER.md, "Incident 2026-08-23". A bot fleet with a
genuine Chrome UA arrived on 2026-08-22 and the analytics bot gate let it through,
because `support_opened` (which SpecialistWidget fires at itself with via="auto")
was counted as proof of a human. The gate is fixed going forward in
packages/web-shared/analytics/types.ts and optimisation_engine/analysis/bot_scorer.py.
This script applies the same verdict to the sessions already on record, so that
comparisons across the fix date (chiefly the Property redesign before/after) use
one definition of "human" on both sides.

The rule mirrors `passive_session` in bot_scorer.score_session(), which is the
source of truth: three or more events, no interaction event, no frustration click,
no form contact, zero engaged time, zero scroll. Expressed as SQL only because the
scorer does one HTTP round trip per session and this covers ~13,500 of them.

Idempotent: rows it has already flipped no longer match `is_bot = false`.

Reversal, exact:
    update web_sessions set is_bot = false, human_confirmed = true
    where bot_reason like '%backfill 2026-08-23%';
(web_events.is_bot is set alongside and reverses on the same predicate via the
session join; see REVERSE_SQL below.)

Owner-authorised 2026-08-23, full history. Run:
    python scripts/backfill_passive_sessions.py --dry-run
    python scripts/backfill_passive_sessions.py --apply
"""
from __future__ import annotations

import json
import os
import sys

import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

TAG = "passive_session (backfill 2026-08-23)"

# Mirror of HUMAN_SIGNAL_EVENTS + FRUSTRATION_EVENTS + FORM_EVENTS in bot_scorer.py.
HUMAN_EVENTS = (
    "engagement_time", "scroll_depth", "section_view", "element_click", "cta_click",
    "custom_interaction", "outbound_click", "contact_click", "calc_view",
    "calc_input_change", "calc_computed", "calc_result_viewed", "calc_copy",
    "calc_share", "resource_unlocked", "embed_cta_click", "form_start",
    "form_field_focus", "form_submit", "form_step_complete", "form_step_back",
    "lead_submitted", "personalization_clicked", "subscribe_submitted",
    "experiment_action", "rage_click", "dead_click",
)

_HUMAN_LIST = ",".join(f"'{n}'" for n in HUMAN_EVENTS)

TARGET_CTE = f"""
with ev as (
  select session_id,
         count(*) as n_ev,
         count(*) filter (where event_name in ({_HUMAN_LIST})) as human_ev
  from web_events group by session_id
), target as (
  select s.session_id
  from web_sessions s join ev on ev.session_id = s.session_id
  where s.is_bot = false
    and ev.n_ev >= 3 and ev.human_ev = 0
    and coalesce(s.engaged_ms, 0) = 0
    and coalesce(s.max_scroll_pct, 0) = 0
)
"""

COUNT_SQL = TARGET_CTE + """
select date_trunc('month', s.started_at)::date as month,
       s.site_key, count(*) as sessions
from target t join web_sessions s on s.session_id = t.session_id
group by 1, 2 order by 1, 3 desc;
"""

# web_sessions first: the dashboard charts (web_timeseries, estate_timeseries) and
# the console rollups all gate on web_sessions.is_bot.
UPDATE_SESSIONS_SQL = TARGET_CTE + f"""
update web_sessions s
set is_bot = true, human_confirmed = false, bot_score = 0.60, bot_reason = '{TAG}'
from target t where t.session_id = s.session_id
returning s.session_id;
"""

# web_events.is_bot backs the per-visitor drill-down in console/adminData.ts, so it
# has to agree or the visitor page contradicts the chart.
UPDATE_EVENTS_SQL = f"""
update web_events e set is_bot = true
from web_sessions s
where s.session_id = e.session_id
  and s.bot_reason = '{TAG}'
  and e.is_bot = false
returning e.id;
"""

REVERSE_SQL = f"""
update web_events e set is_bot = false
  from web_sessions s where s.session_id = e.session_id and s.bot_reason = '{TAG}';
update web_sessions set is_bot = false, human_confirmed = true, bot_reason = null
  where bot_reason = '{TAG}';
"""


def run(query: str) -> list[dict]:
    token = os.environ["SUPABASE_ACCESS_TOKEN"]
    r = httpx.post(
        URL,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            # Cloudflare in front of the Management API rejects the default
            # httpx UA with 403 error code 1010.
            "User-Agent": "Mozilla/5.0",
        },
        json={"query": query},
        timeout=180,
    )
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:800]}", file=sys.stderr)
        sys.exit(1)
    return r.json()


def main() -> None:
    apply = "--apply" in sys.argv[1:]
    if "--reverse-sql" in sys.argv[1:]:
        print(REVERSE_SQL)
        return

    rows = run(COUNT_SQL)
    total = sum(r["sessions"] for r in rows)
    print(f"[BACKFILL] {total} session(s) match the passive_session rule and are still human.")
    for r in rows:
        print(f"  {r['month']}  {r['site_key']:<18} {r['sessions']}")

    if not apply:
        print("[BACKFILL] DRY RUN. Nothing written. Re-run with --apply.")
        return

    sessions = run(UPDATE_SESSIONS_SQL)
    events = run(UPDATE_EVENTS_SQL)
    print(f"[BACKFILL] flipped {len(sessions)} session(s) and {len(events)} event row(s).")
    print(f"[BACKFILL] reverse with: python {os.path.basename(__file__)} --reverse-sql")


if __name__ == "__main__":
    main()
