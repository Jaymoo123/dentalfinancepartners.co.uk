"""Honeypot health monitor (Property) — make the lead-drop "negative" visible.

WHY: the lead-form honeypot field was renamed company_url -> enquiry_ref on
2026-06-25 to stop browser autofill / password managers silently dropping real
human submits (see memory: property_leadform_honeypot_silent_drop). This script
makes the result observable: it watches the honeypot-trip event that the Step-1
diagnostic now emits and tells us, plainly, whether real humans are still being
blocked after the rename — and whether leads are still flowing.

The honeypot trip = web_events row where event_name='form_error' and
props.error_kind='honeypot'. We split each trip three ways using the session:
  - REAL HUMAN  : human_confirmed AND NOT is_bot   <- the false positive we killed
  - ambiguous   : human_confirmed AND is_bot       (bot flag is noisy; could be real)
  - bot         : NOT human_confirmed              (honeypot working as intended)

ALARM if any REAL-HUMAN trip happens strictly after RENAME_DEPLOY_TS — that means
autofill is somehow still tripping the field, or a new filler appeared: investigate.

READ-ONLY: queries prod via the Supabase Management API (same path as scripts/_q.py).
No writes, no DDL. Usage:
    python scripts/honeypot_health.py
    python scripts/honeypot_health.py --days 30 --since "2026-06-25 13:00:00+00"
"""
import argparse
import os
import sys

import httpx
from dotenv import load_dotenv

load_dotenv()
PROJECT_REF = "dhlxwmvmkrfnmcgjbntk"
URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

# The rename deploy (dpl_7SJnbhHrHxf5uN7XS6Y4dxjFNNPh, aliased to www.propertytaxpartners.co.uk).
# Real-human honeypot trips after this instant are the regression signal. Tune if redeployed.
RENAME_DEPLOY_TS = "2026-06-25 13:00:00+00"
PROPERTY_SOURCE = "property"


def q(query: str):
    token = os.environ["SUPABASE_ACCESS_TOKEN"]
    r = httpx.post(
        URL,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"query": query},
        timeout=120,
    )
    if r.status_code not in (200, 201):
        print(f"SQL ERROR {r.status_code}: {r.text[:800]}", file=sys.stderr)
        sys.exit(2)
    return r.json()


def main() -> int:
    ap = argparse.ArgumentParser(description="Property honeypot-trip health monitor (read-only).")
    ap.add_argument("--days", type=int, default=21, help="look-back window for the daily table")
    ap.add_argument("--since", default=RENAME_DEPLOY_TS, help="rename deploy instant; trips after this raise the alarm")
    args = ap.parse_args()

    # 1) Daily honeypot trips, split human/ambiguous/bot.
    daily = q(f"""
        select date(e.ts) as day,
               count(*) as trips,
               count(*) filter (where s.human_confirmed and not coalesce(s.is_bot,false)) as real_humans,
               count(*) filter (where s.human_confirmed and coalesce(s.is_bot,false))     as ambiguous,
               count(*) filter (where not coalesce(s.human_confirmed,false))              as bots,
               count(distinct e.session_id) filter (where s.human_confirmed and not coalesce(s.is_bot,false)) as humans_hit
        from web_events e
        left join web_sessions s on s.session_id = e.session_id
        where e.event_name = 'form_error' and e.props->>'error_kind' = 'honeypot'
          and e.ts > now() - interval '{args.days} days'
        group by 1 order by 1 desc;
    """)

    # 2) The alarm: REAL-HUMAN trips strictly after the rename deploy.
    alarm = q(f"""
        select to_char(e.ts,'YYYY-MM-DD HH24:MI') as t,
               e.props->>'form_id' as form_id, e.page_path, e.session_id
        from web_events e
        left join web_sessions s on s.session_id = e.session_id
        where e.event_name = 'form_error' and e.props->>'error_kind' = 'honeypot'
          and s.human_confirmed and not coalesce(s.is_bot,false)
          and e.ts > '{args.since}'
        order by e.ts desc;
    """)

    # 3) Happy-path guardrail: Property leads per day (a cliff here = something broke upstream).
    leads = q(f"""
        select date(created_at) as day, count(*) as leads
        from leads
        where source = '{PROPERTY_SOURCE}' and created_at > now() - interval '14 days'
        group by 1 order by 1 desc;
    """)

    print("=" * 72)
    print("PROPERTY HONEYPOT HEALTH  (rename company_url -> enquiry_ref, 2026-06-25)")
    print(f"  diagnostic event: form_error / error_kind='honeypot'   window: {args.days}d")
    print(f"  alarm boundary (rename deploy): {args.since}")
    print("=" * 72)

    print("\nHoneypot trips per day  [real_humans = the false positives we are killing]")
    print(f"  {'day':<12}{'trips':>7}{'real_humans':>13}{'ambiguous':>11}{'bots':>6}{'humans_hit':>12}")
    for row in daily:
        print(f"  {row['day']:<12}{row['trips']:>7}{row['real_humans']:>13}"
              f"{row['ambiguous']:>11}{row['bots']:>6}{row['humans_hit']:>12}")
    if not daily:
        print("  (no honeypot trips recorded in window)")

    print("\nProperty leads per day  [happy-path guardrail]")
    for row in leads:
        print(f"  {row['day']:<12}{row['leads']:>5}")
    if not leads:
        print("  (no Property leads in last 14d)")

    print("\n" + "-" * 72)
    if alarm:
        print(f"ALARM: {len(alarm)} REAL-HUMAN honeypot trip(s) AFTER the rename deploy.")
        print("       The rename should have stopped these. A real human is still being")
        print("       silently dropped — investigate (autofill still hitting enquiry_ref?")
        print("       a new filler? a different surface?).")
        for row in alarm:
            print(f"   - {row['t']}  {row['form_id']:<16} {row['page_path']}")
        print("-" * 72)
        return 1
    print("PASS: no real-human honeypot trips since the rename deploy.")
    print("      (Pre-deploy trips above are the baseline we fixed; they should not recur.)")
    print("-" * 72)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
