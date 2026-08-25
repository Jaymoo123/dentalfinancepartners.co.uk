#!/usr/bin/env python3
"""
Email the state-check findings - but only when the ALARM/BLIND set CHANGES.

The dedup is the point. A monitor that emails the same alarm every day trains
its one reader to ignore it (the proven fate of risk-manager, disabled with
"re-enable when alerting is wired to a destination that gets read"). So:

  - stable key = sorted ALARM/BLIND finding names from out/run.json
  - email only when the key differs from the last-emailed key, or the last
    email was more than REMIND_DAYS ago (a standing alarm gets one weekly nudge)
  - the key + timestamp live in out/ (restored by the workflow's cache), so
    the memory survives between runs

Sends via the Resend REST API. Missing RESEND_API_KEY/TRIPWIRE_NOTIFY_TO is
reported loudly to the log and exits 0 (the workflow's red-run GitHub email
remains the backstop; this script must never fail the run).
"""
from __future__ import annotations

import datetime as dt
import json
import os
import sys
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
RUN = OUT / "run.json"
STATE = OUT / "last_emailed_alarms.json"
REMIND_DAYS = 7
EMAIL_STATUSES = {"ALARM", "BLIND"}


def main() -> int:
    if not RUN.exists():
        print("state_check_email: out/run.json missing (check crashed?); nothing to email")
        return 0
    data = json.loads(RUN.read_text(encoding="utf-8"))
    findings = data.get("findings", [])
    alarms = sorted(f["name"] for f in findings if f.get("status") in EMAIL_STATUSES)
    key = "|".join(alarms)

    prev = {"key": None, "at": None}
    if STATE.exists():
        try:
            prev = json.loads(STATE.read_text(encoding="utf-8"))
        except Exception:
            pass

    now = dt.datetime.now(dt.timezone.utc)
    stale = True
    if prev.get("at"):
        try:
            last = dt.datetime.fromisoformat(prev["at"])
            stale = (now - last).days >= REMIND_DAYS
        except ValueError:
            pass

    if key == prev.get("key") and not stale:
        print(f"state_check_email: alarm set unchanged ({len(alarms)} alarm(s)); no email")
        return 0
    if not alarms and prev.get("key") in (None, ""):
        print("state_check_email: no alarms, none before; no email")
        return 0

    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    to = os.environ.get("TRIPWIRE_NOTIFY_TO", "").strip()
    sender = os.environ.get("RESEND_FROM_EMAIL", "").strip()
    if not (api_key and to and sender):
        print("state_check_email: ALERT would send but RESEND_API_KEY / "
              "TRIPWIRE_NOTIFY_TO / RESEND_FROM_EMAIL not set. Red-run email is "
              "the only signal until those secrets land.")
        return 0

    lines = [
        f"{f['status']:8} {f.get('lane','-'):11} {f['name']}\n         {f.get('detail','')}"
        for f in findings
        if f.get("status") in EMAIL_STATUSES
    ]
    if alarms:
        subject = f"[state-check] {len(alarms)} alarm(s): {', '.join(alarms[:3])}" + (
            "…" if len(alarms) > 3 else "")
        body = ("The ALARM/BLIND set changed (or the weekly reminder is due).\n\n"
                + "\n".join(lines)
                + "\n\nFull findings: the state-check-snapshot artifact on this run.")
    else:
        subject = "[state-check] all clear (previous alarms resolved)"
        body = f"Previously alarming: {prev.get('key')}\nNow: no ALARM/BLIND findings."

    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"from": sender, "to": [to], "subject": subject, "text": body},
        timeout=30,
    )
    if r.status_code >= 300:
        print(f"state_check_email: Resend send FAILED {r.status_code} {r.text[:200]}")
        return 0
    STATE.write_text(json.dumps({"key": key, "at": now.isoformat()}), encoding="utf-8")
    print(f"state_check_email: sent '{subject}' to {to}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
