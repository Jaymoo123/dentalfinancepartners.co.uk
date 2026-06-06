"""
Daily bot reclassifier -- the backstop layer of the bot defence.

The /api/track endpoint tags obvious bots at write time (UA heuristics + Vercel
BotID hook). This job runs over recent web_sessions and flips is_bot=true on the
residue that slipped through, using conservative, HIGH-PRECISION rules so we
never wrongly discard a real human:

  A. flood        -- event_count >= 200 in a < 30s session (scripted firehose)
  B. impossible   -- engaged_ms exceeds wall-clock duration by a wide margin
                     (a clock-faking emulator, not a real reader)

Human-only rollups already require human_confirmed=true, so passive/no-interaction
sessions are excluded without any action here -- this job only targets sessions
that emitted interaction events yet behaved impossibly.

Run:  python -m optimisation_engine.analysis.bot_reclassifier property
"""
from __future__ import annotations

import sys
from datetime import datetime, timedelta, timezone
from typing import Any

import httpx

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def _parse(ts: str | None) -> datetime | None:
    if not ts:
        return None
    try:
        return datetime.fromisoformat(ts.replace("Z", "+00:00"))
    except ValueError:
        return None


def _suspect(row: dict) -> str | None:
    """Return a bot_reason if this human-confirmed session behaved impossibly."""
    started = _parse(row.get("started_at"))
    last = _parse(row.get("last_seen_at"))
    event_count = int(row.get("event_count") or 0)
    engaged_ms = int(row.get("engaged_ms") or 0)
    duration_s = (last - started).total_seconds() if started and last else 0.0

    # A. scripted flood
    if event_count >= 200 and duration_s < 30:
        return "reclassified_flood"
    # B. engagement exceeds wall-clock by > 60s of slack -> clock faking
    if engaged_ms > (duration_s * 1000) + 60_000:
        return "reclassified_impossible_engagement"
    return None


def reclassify_bots(site_key: str, *, days: int = 7) -> dict[str, Any]:
    """Scan recent non-bot, human-confirmed sessions and flag impossible ones."""
    since = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/web_sessions",
        headers=_headers(),
        params={
            "site_key": f"eq.{site_key}",
            "is_bot": "eq.false",
            "human_confirmed": "eq.true",
            "started_at": f"gte.{since}",
            "select": "session_id,started_at,last_seen_at,event_count,engaged_ms",
            "limit": "10000",
        },
        timeout=30.0,
    )
    r.raise_for_status()
    rows = r.json()

    flagged = 0
    for row in rows:
        reason = _suspect(row)
        if not reason:
            continue
        patch = httpx.patch(
            f"{SUPABASE_URL}/rest/v1/web_sessions",
            headers={**_headers(), "Content-Type": "application/json", "Prefer": "return=minimal"},
            params={"session_id": f"eq.{row['session_id']}"},
            json={"is_bot": True, "bot_reason": reason},
            timeout=20.0,
        )
        if patch.status_code in (200, 204):
            flagged += 1
        else:
            print(f"[RECLASSIFY] patch failed {row['session_id']}: {patch.status_code} {patch.text[:160]}")

    print(f"[RECLASSIFY] {site_key}: scanned {len(rows)} sessions, flagged {flagged} as bot")
    return {"site_key": site_key, "scanned": len(rows), "flagged": flagged}


if __name__ == "__main__":
    site = sys.argv[1] if len(sys.argv) > 1 else "property"
    print(reclassify_bots(site))
