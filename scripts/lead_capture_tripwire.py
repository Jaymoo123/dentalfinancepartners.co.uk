#!/usr/bin/env python3
"""Lead-capture tripwire for the Property site (run on a schedule).

Two independent checks, either of which emails an alert to the operator:

  1) BUNDLE check (DETERMINISTIC, zero false positives): fetch the live production
     page and confirm the inlined NEXT_PUBLIC_SUPABASE_URL is not corrupted with a
     trailing CR/LF. This is the exact 2026-06-24 failure mode — a bad env paste
     silently broke every client-side lead insert. The bundle is the ground truth.

  2) FLATLINE check (HEURISTIC, tuned to avoid noise): if >= FORM_START_FLOOR
     `form_start` events happened on the form in the last WINDOW_HOURS but ZERO
     `lead_submitted` events landed, real people are reaching the form yet none
     complete -> a likely broken submit path. (The base lead rate is low and lumpy,
     so we key off form-STARTS-without-submits, not raw "0 leads", to avoid firing
     on normal quiet periods.)

Read-only against Supabase (service role via PostgREST). Sends via Resend.
Exit 1 if any check trips (so the CI run is visibly red too), else 0.

Env (GitHub Actions secrets / local .env):
  SUPABASE_URL, SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY)  -- data queries
  RESEND_API_KEY                                              -- alert email (optional; logs if unset)
  TRIPWIRE_NOTIFY_TO (default operator inbox), RESEND_FROM_EMAIL
Tunables: TRIPWIRE_WINDOW_HOURS (24), TRIPWIRE_FORM_START_FLOOR (5),
          TRIPWIRE_SITE (property), TRIPWIRE_BASE_URL.
"""
import datetime
import json
import os
import re
import sys

import httpx

try:  # local convenience; not installed in CI (env comes from the workflow)
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    pass

REF = "dhlxwmvmkrfnmcgjbntk"
SITE = os.environ.get("TRIPWIRE_SITE", "property")
BASE = os.environ.get("TRIPWIRE_BASE_URL", "https://www.propertytaxpartners.co.uk").rstrip("/")
WINDOW_HOURS = int(os.environ.get("TRIPWIRE_WINDOW_HOURS", "24"))
FORM_START_FLOOR = int(os.environ.get("TRIPWIRE_FORM_START_FLOOR", "5"))

SUPABASE_URL = (os.environ.get("SUPABASE_URL") or f"https://{REF}.supabase.co").strip().rstrip("/")
SERVICE_KEY = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY") or "").strip()
RESEND_API_KEY = (os.environ.get("RESEND_API_KEY") or "").strip()
FROM_EMAIL = (os.environ.get("RESEND_FROM_EMAIL") or "leads@propertytaxpartners.co.uk").strip()
NOTIFY_TO = (
    os.environ.get("TRIPWIRE_NOTIFY_TO")
    or os.environ.get("LEADS_NOTIFY_TO_PROPERTY")
    or "junayd@ashfieldtrading.com"
).strip()


def _since_iso(hours: int) -> str:
    return (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=hours)).isoformat()


def pg_count(table: str, filters: dict) -> int:
    """Exact row count via PostgREST (service role); fetches no rows."""
    headers = {
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Prefer": "count=exact",
        "Range-Unit": "items",
        "Range": "0-0",
    }
    r = httpx.get(f"{SUPABASE_URL}/rest/v1/{table}", params={**filters, "select": "*"}, headers=headers, timeout=30)
    r.raise_for_status()
    cr = r.headers.get("content-range", "")  # "0-0/123" or "*/0"
    total = cr.split("/")[-1] if "/" in cr else "0"
    return int(total) if total.isdigit() else 0


def check_bundle():
    """(ok, detail). ok=False if the inlined Supabase URL is corrupted/unverifiable."""
    try:
        chunks = set()
        for path in ("/", "/contact"):
            html = httpx.get(BASE + path, timeout=30, follow_redirects=True).text
            for m in re.finditer(r"/_next/static/[^\"'\\]+\.js", html):
                chunks.add(BASE + m.group(0))
        found = False
        marker = "supabase.co"
        for cu in chunks:
            try:
                t = httpx.get(cu, timeout=30).text
            except Exception:
                continue
            idx = t.find(marker)
            while idx != -1:
                found = True
                nxt = t[idx + len(marker): idx + len(marker) + 1]
                if nxt in ("\\", "\r", "\n"):  # clean is a quote; backslash/CRLF = corrupted
                    return False, f"inlined Supabase URL is CORRUPTED (trailing {nxt!r}) -> client lead capture is BROKEN"
                idx = t.find(marker, idx + 1)
        if not found:
            # ponytail: leads now submit via the server route, not an inlined client
            # Supabase URL — probe the API instead of failing on an absent marker.
            r = httpx.post(BASE + "/api/leads/submit", json={}, timeout=30)
            if r.status_code == 400 and "error" in r.text:
                return True, "no inlined Supabase URL (server-route capture); /api/leads/submit healthy (400 validation)"
            return False, f"/api/leads/submit unhealthy: HTTP {r.status_code} {r.text[:120]!r}"
        return True, "inlined Supabase URL is clean"
    except Exception as e:
        return False, f"bundle check error: {e}"


def check_flatline():
    """(ok, detail, stats). ok=False if form-starts happened but zero submits landed."""
    iso = _since_iso(WINDOW_HOURS)
    form_starts = pg_count("web_events", {"site_key": f"eq.{SITE}", "event_name": "eq.form_start", "is_bot": "eq.false", "ts": f"gte.{iso}"})
    submits = pg_count("web_events", {"site_key": f"eq.{SITE}", "event_name": "eq.lead_submitted", "is_bot": "eq.false", "ts": f"gte.{iso}"})
    human_sessions = pg_count("web_sessions", {"site_key": f"eq.{SITE}", "is_bot": "eq.false", "started_at": f"gte.{iso}"})
    leads = pg_count("leads", {"source": f"eq.{SITE}", "created_at": f"gte.{iso}"})
    stats = {"window_hours": WINDOW_HOURS, "form_starts": form_starts, "lead_submitted": submits, "leads": leads, "human_sessions": human_sessions}
    tripped = form_starts >= FORM_START_FLOOR and submits == 0
    detail = f"{form_starts} form-starts but {submits} submits ({leads} leads) across {human_sessions} human sessions in {WINDOW_HOURS}h"
    return (not tripped), detail, stats


def send_alert(subject: str, body: str) -> bool:
    if not RESEND_API_KEY:
        print(f"[tripwire] ALERT (email NOT sent — RESEND_API_KEY unset):\n  {subject}\n  {body}")
        return False
    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
        json={"from": f"Lead Tripwire <{FROM_EMAIL}>", "to": [NOTIFY_TO], "subject": subject, "text": body},
        timeout=30,
    )
    ok = r.status_code in (200, 201)
    print(f"[tripwire] email -> {NOTIFY_TO}: {r.status_code} {'OK' if ok else r.text[:200]}")
    return ok


def main() -> None:
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    alerts = []

    bundle_ok, bundle_detail = check_bundle()
    print(f"[tripwire] bundle: {'OK' if bundle_ok else 'FAIL'} -> {bundle_detail}")
    if not bundle_ok:
        alerts.append(("P0", f"Bundle: {bundle_detail}"))

    stats = {}
    if SERVICE_KEY:
        try:
            flat_ok, flat_detail, stats = check_flatline()
            print(f"[tripwire] flatline: {'OK' if flat_ok else 'FAIL'} -> {flat_detail}")
            if not flat_ok:
                alerts.append(("P1", f"Flatline: {flat_detail}"))
        except Exception as e:
            print(f"[tripwire] flatline: SKIPPED (query error: {e})")
    else:
        print("[tripwire] flatline: SKIPPED (no Supabase service key in env)")

    if alerts:
        sev = "P0" if any(a[0] == "P0" for a in alerts) else "P1"
        subject = f"[{sev}] {SITE} lead-capture tripwire tripped"
        body = (
            f"The {SITE} lead-capture tripwire fired at {now} (UTC).\n\n"
            + "\n".join(f"- [{a[0]}] {a[1]}" for a in alerts)
            + (f"\n\nStats: {json.dumps(stats)}" if stats else "")
            + f"\n\nNext: try submitting the form at {BASE}/contact, and check the Property Vercel env"
            + " (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) for a trailing newline.\n"
        )
        send_alert(subject, body)
        sys.exit(1)

    print("[tripwire] all checks healthy")
    sys.exit(0)


if __name__ == "__main__":
    main()
