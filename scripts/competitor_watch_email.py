#!/usr/bin/env python3
"""
Email this week's competitor-watch digest - but only when the finding-set
CHANGES. Same dedup mechanism as state_check_email.py (see that file for the
rationale): a monitor that emails the same thing every day trains its one
reader to ignore it.

  - stable key = sha256 of this week's discovery_log rows (site/kind/url)
  - email only when the key differs from the last-emailed key, or the last
    email was more than REMIND_DAYS ago (a standing finding-set gets one
    weekly nudge)
  - the key + timestamp live in out/ (same directory state_check_email uses),
    so the memory survives between runs

Digest content: defend items first (competitor published into a lane we
already cover), then net-new candidates, grouped by site / competitor / lane,
plus today's DataForSEO spend from api_cost_log.

Sends via the Resend REST API. Missing RESEND_API_KEY/TRIPWIRE_NOTIFY_TO/
RESEND_FROM_EMAIL is reported loudly to the log and exits 0 (this script must
never fail the caller).

Usage:
    python scripts/competitor_watch_email.py
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
import sys
from collections import defaultdict
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

try:
    from dotenv import load_dotenv
    load_dotenv(ROOT / ".env")
except ImportError:
    pass

from optimisation_engine.competitor._db import _sql  # noqa: E402

OUT = ROOT / "out"
STATE = OUT / "last_emailed_competitor_watch.json"
REMIND_DAYS = 7


def _is_missing_table(exc: Exception) -> bool:
    text = str(exc)
    resp = getattr(exc, "response", None)
    if resp is not None:
        try:
            text += " " + resp.text
        except Exception:
            pass
    return "does not exist" in text or "42P01" in text


def fetch_digest_rows() -> list[dict]:
    """This week's discovery_log rows, defend items first (highest score first
    within each kind)."""
    try:
        return _sql("""
            SELECT site_key, kind, payload
            FROM discovery_log
            WHERE week >= date_trunc('week', CURRENT_DATE)::date
              AND kind IN ('defend_lane', 'netnew_candidate')
            ORDER BY kind = 'netnew_candidate', (payload->>'score')::numeric DESC NULLS LAST
        """)
    except Exception as exc:
        if _is_missing_table(exc):
            print("competitor_watch_email: discovery_log missing — apply migration 20260815000001 first")
            return []
        raise


def _group_new_competitors(rows: list[dict]) -> list[str]:
    """discovery_log rows of kind netnew_candidate with payload.type ==
    'new_competitor' — auto-added competitor domains from competitor_watch's
    universe probe (detectors-triage doctrine: auto-add is fine, silent isn't)."""
    domains = [r for r in rows if (r.get("payload") or {}).get("type") == "new_competitor"]
    if not domains:
        return []
    lines = ["", f"NEW COMPETITOR DOMAINS AUTO-DETECTED ({len(domains)}):"]
    for r in domains:
        p = r["payload"]
        queries = ", ".join(p.get("queries") or [])
        lines.append(f"  {r['site_key']} / {p.get('domain')} — {queries}")
    return lines


def fetch_dfs_spend_today() -> float:
    try:
        rows = _sql("""
            SELECT COALESCE(SUM(cost_usd), 0) AS spend
            FROM api_cost_log
            WHERE api_provider = 'dataforseo' AND date_called = CURRENT_DATE
        """)
        return float(rows[0]["spend"]) if rows else 0.0
    except Exception as exc:
        print(f"competitor_watch_email: could not read api_cost_log: {exc}")
        return 0.0


def _group(items: list[dict]) -> list[str]:
    if not items:
        return ["  none"]
    by_site_domain: dict[str, dict[str, list[dict]]] = defaultdict(lambda: defaultdict(list))
    for r in items:
        p = r.get("payload") or {}
        key = f"{r['site_key']} / {p.get('competitor_domain') or '?'}"
        by_site_domain[key][p.get("lane") or "Other"].append(p)
    lines: list[str] = []
    for key in sorted(by_site_domain):
        lines.append(f"  {key}")
        for lane in sorted(by_site_domain[key]):
            for p in by_site_domain[key][lane]:
                lines.append(f"    [{lane}] {p.get('slug', '')} (score {p.get('score')}) {p.get('url', '')}")
    return lines


def build_digest(rows: list[dict]) -> tuple[str, str]:
    new_competitors = [r for r in rows if (r.get("payload") or {}).get("type") == "new_competitor"]
    defend = [r for r in rows if r["kind"] == "defend_lane"]
    netnew = [r for r in rows if r["kind"] == "netnew_candidate" and r not in new_competitors]

    lines = [f"Competitor watch digest — week of {dt.date.today().isoformat()}", ""]
    lines.append(f"DEFEND LANE ({len(defend)}) — competitors publishing into lanes we already cover:")
    lines += _group(defend)
    lines.append("")
    lines.append(f"NET-NEW CANDIDATES ({len(netnew)}):")
    lines += _group(netnew)
    lines += _group_new_competitors(new_competitors)
    lines.append("")
    lines.append(f"DataForSEO spend today: ${fetch_dfs_spend_today():.4f}")

    subject = f"[competitor-watch] {len(defend)} defend, {len(netnew)} net-new this week"
    if new_competitors:
        subject += f", {len(new_competitors)} new competitor domain(s)"
    return subject, "\n".join(lines)


def _stable_key(rows: list[dict]) -> str:
    fingerprints = sorted(
        f"{r['site_key']}:{r['kind']}:{(r.get('payload') or {}).get('url', '')}" for r in rows
    )
    return hashlib.sha256(json.dumps(fingerprints).encode()).hexdigest()


def main() -> int:
    rows = fetch_digest_rows()
    key = _stable_key(rows)

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
            stale = (now - dt.datetime.fromisoformat(prev["at"])).days >= REMIND_DAYS
        except ValueError:
            pass

    if key == prev.get("key") and not stale:
        print(f"competitor_watch_email: finding-set unchanged ({len(rows)} rows); no email")
        return 0
    if not rows and prev.get("key") in (None, ""):
        print("competitor_watch_email: no findings, none before; no email")
        return 0

    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    to = os.environ.get("TRIPWIRE_NOTIFY_TO", "").strip()
    sender = os.environ.get("RESEND_FROM_EMAIL", "").strip()
    if not (api_key and to and sender):
        print("competitor_watch_email: digest would send but RESEND_API_KEY / "
              "TRIPWIRE_NOTIFY_TO / RESEND_FROM_EMAIL not set.")
        return 0

    subject, body = build_digest(rows)
    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"from": sender, "to": [to], "subject": subject, "text": body},
        timeout=30,
    )
    if r.status_code >= 300:
        print(f"competitor_watch_email: Resend send FAILED {r.status_code} {r.text[:200]}")
        return 0
    OUT.mkdir(exist_ok=True)
    STATE.write_text(json.dumps({"key": key, "at": now.isoformat()}), encoding="utf-8")
    print(f"competitor_watch_email: sent '{subject}' to {to}")
    return 0


if __name__ == "__main__":
    # Self-check: pure helpers (build_digest also does one live api_cost_log read).
    assert _is_missing_table(Exception('relation "discovery_log" does not exist')) is True
    assert _is_missing_table(Exception("boom")) is False
    _rows = [
        {"site_key": "property", "kind": "defend_lane", "payload": {"url": "https://a", "lane": "CGT", "score": 1.2, "slug": "a"}},
        {"site_key": "property", "kind": "netnew_candidate", "payload": {"url": "https://b", "lane": "SDLT", "score": 0.8, "slug": "b"}},
    ]
    assert _stable_key(_rows) == _stable_key(list(reversed(_rows))), "key must be order-independent"
    _subject, _body = build_digest(_rows)
    assert "1 defend" in _subject and "1 net-new" in _subject, _subject
    assert "CGT" in _body and "SDLT" in _body, _body
    print("competitor_watch_email: self-check OK")
    sys.exit(main())
