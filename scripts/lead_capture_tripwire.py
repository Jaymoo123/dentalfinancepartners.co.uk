#!/usr/bin/env python3
"""Lead-capture tripwire for the Property site (run on a schedule).

SELF-TRIAGING BY DESIGN (2026-08-16). The heuristic alone fired 4 red runs a day
across a normal quiet weekend (weekend submit rate is 0-1/day vs 3-6 on weekdays),
so the heuristic no longer decides anything on its own: it only decides whether to
spend a synthetic probe. The PROBE decides.

  1) BUNDLE check (DETERMINISTIC): fetch the live production page and confirm the
     inlined NEXT_PUBLIC_SUPABASE_URL is not corrupted with a trailing CR/LF. The
     exact 2026-06-24 failure mode — a bad env paste silently broke every
     client-side lead insert.

  2) FLATLINE check (HEURISTIC, noisy on purpose): >= FORM_START_FLOOR form_starts
     with ZERO lead_submitted in WINDOW_HOURS. Treated as a SUSPICION, never a
     verdict.

  3) PROBE (DETERMINISTIC, only runs when 2 trips): submit a test-flagged lead
     through the real server route the live form posts to, then delete the row.
     Probe OK => the suspicion was a FALSE ALARM (quiet period, not breakage) and
     the run stays green. Probe FAILS => capture is genuinely broken.

Escalation: NO email from here, ever (4 uninformative mails/day is how a monitor
gets ignored). The run goes red only on a genuine P0. Everything else is written
to the GitHub step summary and re-run by the weekly caretaker, which is the layer
that reasons about it and emails only when the finding set changes.

Exit 1 only on P0 (bundle corrupted, or the probe cannot submit a lead). Exit 0 on
a false alarm, a healthy run, or an inconclusive one.

Env (GitHub Actions secrets / local .env):
  SUPABASE_URL, SUPABASE_KEY (or SUPABASE_SERVICE_ROLE_KEY)  -- data queries + probe cleanup
Tunables: TRIPWIRE_WINDOW_HOURS (24), TRIPWIRE_FORM_START_FLOOR (5),
          TRIPWIRE_SITE (property), TRIPWIRE_BASE_URL, TRIPWIRE_NO_PROBE (1 = skip).
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
# UTC hours in which the paid probe may run. The workflow fires at 00/06/12/18,
# so {0} means once a day. Widen to {0,6,12,18} once the route stops charging
# for test leads.
PROBE_HOURS = {int(h) for h in os.environ.get("TRIPWIRE_PROBE_HOURS", "0").split(",") if h.strip()}

SUPABASE_URL = (os.environ.get("SUPABASE_URL") or f"https://{REF}.supabase.co").strip().rstrip("/")
SERVICE_KEY = (os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY") or "").strip()


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
            # Expected, and it is the healthy state. Every lead surface posts to
            # /api/leads/submit now, so no client-side Supabase config is shipped
            # and the 2026-06-24 class (corrupted NEXT_PUBLIC_* paste breaking
            # client inserts) is unreachable by construction. The scan is kept as a
            # regression guard: if this marker ever comes BACK, a client insert path
            # has been reintroduced and the corruption class is live again.
            r = httpx.post(BASE + "/api/leads/submit", json={}, timeout=30)
            if r.status_code == 400 and "error" in r.text:
                return True, (
                    "no client-side Supabase config shipped (server-route capture, as intended); "
                    "/api/leads/submit healthy (400 validation)"
                )
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


def probe_submit():
    """(ok, detail). Submit a test-flagged lead through the REAL server route the
    live form posts to, then delete it. This is the arbiter: it distinguishes a
    quiet period from a broken submit path, which no traffic statistic can.

    Non-polluting: source='test' sets is_test, which the notify trigger skips and
    the operator email/dashboard/billing exclude; the row is deleted (child rows
    cascade) and the fixed probe email means the 24h dedupe caps the blast radius
    at one row even if a delete ever fails.

    Non-BILLING is a separate problem and the payload is chosen for it. The submit
    route runs verifyLead on every lead: a parseable UK number costs a Twilio
    Lookup and, where EMAIL_VERIFY_API_KEY is set, the address costs a ZeroBounce
    credit. A monitor that quietly spends money four times a day is its own
    incident, so the phone is deliberately unparseable by toE164UK (11 digits, no
    leading 0 or +, so `digits(phone) >= 10` still passes validation but the
    lookup short-circuits before Twilio). The email still costs a credit until the
    route-level is_test skip ships, which is why the probe is capped to once a day
    below. Remove PROBE_HOURS once that deploy lands.
    """
    payload = {
        "source": "test",
        "qa": True,
        "skip_verification": True,  # honoured only for test leads; see the route
        "full_name": "Tripwire Probe",
        "email": "tripwire-probe@example.com",
        "phone": "99999999999",
        "role": "Landlord",
        "message": "Automated lead-capture tripwire probe, please ignore.",
    }
    try:
        r = httpx.post(f"{BASE}/api/leads/submit", json=payload, timeout=60)
        body = r.json() if r.headers.get("content-type", "").startswith("application/json") else {}
    except Exception as e:
        return False, f"probe POST to /api/leads/submit failed: {e}"

    lead_id = body.get("leadId") if isinstance(body, dict) else None
    if lead_id and SERVICE_KEY:
        try:
            httpx.delete(
                f"{SUPABASE_URL}/rest/v1/leads",
                params={"id": f"eq.{lead_id}"},
                headers={"apikey": SERVICE_KEY, "Authorization": f"Bearer {SERVICE_KEY}"},
                timeout=30,
            )
        except Exception as e:
            print(f"[tripwire] probe cleanup failed (row is is_test, harmless): {e}")

    if r.status_code == 200 and isinstance(body, dict) and body.get("success"):
        return True, "synthetic lead accepted end-to-end (row written, then removed)"
    return False, f"/api/leads/submit rejected a valid lead: HTTP {r.status_code} {r.text[:160]!r}"


def summary(lines) -> None:
    """Persist the verdict where it can be read later without an email: the run's
    step summary (kept with the run for 90 days) and stdout for the caretaker."""
    text = "\n".join(lines)
    print(text)
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if path:
        try:
            with open(path, "a", encoding="utf-8") as fh:
                fh.write(text + "\n")
        except Exception:
            pass


def main() -> None:
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    out = [f"### {SITE} lead-capture tripwire — {now}"]
    p0 = []

    bundle_ok, bundle_detail = check_bundle()
    out.append(f"- bundle: {'OK' if bundle_ok else 'FAIL'} - {bundle_detail}")
    if not bundle_ok:
        p0.append(f"Bundle: {bundle_detail}")

    stats = {}
    flat_ok = True
    if SERVICE_KEY:
        try:
            flat_ok, flat_detail, stats = check_flatline()
            out.append(f"- flatline: {'OK' if flat_ok else 'SUSPECT'} - {flat_detail}")
        except Exception as e:
            out.append(f"- flatline: SKIPPED (query error: {e})")
    else:
        out.append("- flatline: SKIPPED (no Supabase service key in env)")

    # The probe only runs when the heuristic is suspicious AND at most once a day
    # (see probe_submit: it still costs an email-verification credit until the
    # route-level is_test skip is deployed). The 6-hourly bundle check already
    # catches a dead route in between, so the cap only delays confirmation of the
    # rarer "route answers but cannot insert" case.
    probe_window = datetime.datetime.now(datetime.timezone.utc).hour in PROBE_HOURS
    if not flat_ok and probe_window and os.environ.get("TRIPWIRE_NO_PROBE") != "1":
        probe_ok, probe_detail = probe_submit()
        out.append(f"- probe: {'OK' if probe_ok else 'FAIL'} - {probe_detail}")
        if probe_ok:
            out.append(
                "- **verdict: FALSE ALARM** - capture verified working; the flatline is a"
                " quiet period (weekend/overnight submit rate is 0-1/day). No action."
            )
        else:
            p0.append(f"Probe: {probe_detail} (flatline corroborated)")
    elif not flat_ok:
        why = "TRIPWIRE_NO_PROBE=1" if os.environ.get("TRIPWIRE_NO_PROBE") == "1" else (
            f"outside the once-a-day probe window (UTC hours {sorted(PROBE_HOURS)})"
        )
        out.append(f"- probe: SKIPPED ({why}) - flatline unarbitrated, deferred")

    if stats:
        out.append(f"- stats: `{json.dumps(stats)}`")

    if p0:
        out.append("- **verdict: P0, lead capture is BROKEN**")
        out += [f"  - {a}" for a in p0]
        out.append(
            f"- next: submit the form at {BASE}/contact, then check the Property Vercel env"
            " (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) for a trailing newline."
        )
        summary(out)
        sys.exit(1)  # the ONLY red run: a verified broken money path

    if flat_ok:
        out.append("- **verdict: healthy**")
    summary(out)
    sys.exit(0)


if __name__ == "__main__":
    main()
