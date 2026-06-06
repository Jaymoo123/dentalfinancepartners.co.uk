"""
Multi-signal bot SCORING for first-party analytics data quality.

This is the trust-the-dashboard layer. The crude reclassifier (bot_reclassifier.py)
only catches two impossible patterns (flood / clock-faking). This module scores
EVERY recent session human-vs-bot from all available behavioural signals so that
the human-only rollup views (which filter is_bot=false) are not polluted by
scrapers, headless crawlers, monitors, and scripted traffic that emit "events"
but never behave like a person.

It is NOT a lead-form gate. It only classifies sessions for analytics quality and
writes web_sessions.{bot_score, is_bot, bot_reason}.

----------------------------------------------------------------------------------
DESIGN: transparent weighted score, HIGH PRECISION
----------------------------------------------------------------------------------
We deliberately bias toward NOT flagging real humans (false negatives are cheap —
a few bot sessions leak in; false positives are expensive — we discard real
behaviour). So:

  * Every signal is a continuous "bot-likelihood contribution" in [0, weight].
  * The score is a weighted sum normalised to [0, 1]. Higher = more bot-like.
  * Genuine human signals (engagement pings after first input, scroll depth,
    frustration clicks, form interaction, jittery timing) push the score DOWN via
    a "humanity credit" so anyone who clearly behaved like a person is protected
    even if one mechanical signal looks odd.
  * is_bot = score >= THRESHOLD (default 0.60) — a session has to look bot-like on
    MULTIPLE independent axes to cross it.
  * The two original deterministic rules (flood, impossible-engagement) remain as
    a hard FLOOR: if either fires, the session is a bot regardless of score. This
    guarantees we never regress vs the old reclassifier.
  * STICKY ingest verdict: ingest_web_events OR-merges is_bot and never clears it,
    so a session ingest (or a UA bot_reason) already called a bot is NEVER demoted
    to human here — we only ever promote.
  * SCRIPTED-HEARTBEAT escalation: a session with many events that trips >=3
    independent bot axes AND earned zero humanity credit is flagged even if no
    single hard rule fired (catches the monotone clockwork emitter under flood
    size). Humans never hit this because any real interaction earns credit.

----------------------------------------------------------------------------------
FEATURE SET + WEIGHTS  (each contributes 0..weight to the raw bot-likelihood)
----------------------------------------------------------------------------------
  W_IMPOSSIBLE_ENGAGE  0.35  engaged_ms wildly exceeds wall-clock duration
                             (clock faking / emulator) — ramps in over the slack.
  W_FLOOD_RATE         0.25  events-per-second far above what a human can drive.
  W_LOW_VARIETY        0.20  very few DISTINCT event types for many events
                             (bots spam one kind; humans naturally vary).
  W_TIMING_REGULAR     0.20  near-constant inter-event intervals (low jitter =
                             scripted). Humans are bursty/irregular.
  W_NO_HUMAN_SIGNAL    0.20  no genuine pointer/keyboard/scroll/engagement event
                             at all despite emitting events.
  W_UA                 0.30  UA already flagged bot-ish at ingest (ua_missing /
                             ua_pattern / ua_no_mozilla in bot_reason) or unknown
                             ua_family — strong prior.
  W_ZERO_DWELL_BURST   0.15  many events with ~zero engaged time and ~zero wall
                             time (instant scripted burst).

  HUMANITY CREDIT (subtracted, capped):
  C_PER_HUMAN_SIGNAL   0.10  per DISTINCT genuine-human event type present,
  C_HUMAN_CAP          0.35  capped — a clearly-human session gets a big discount.
  C_FRUSTRATION        0.15  rage_click / dead_click present (frustration is a
                             uniquely human tell; bots don't get frustrated).
  C_FORM               0.10  real form interaction (focus/start/submit).

  RAW_MAX = sum of positive weights (used to normalise to [0,1]).

Anything with too little evidence to judge (almost no events, no timing data) is
left UNFLAGGED — we never invent a bot from absence of data.

Run:
  python -m optimisation_engine.analysis.bot_scorer property --dry-run
  python -m optimisation_engine.analysis.bot_scorer property            # writes
"""
from __future__ import annotations

import sys
from datetime import datetime, timedelta, timezone
from statistics import median
from typing import Any

import httpx

from optimisation_engine.config import SUPABASE_KEY, SUPABASE_URL

# Reuse the crude deterministic rules as a hard floor (never regress).
from optimisation_engine.analysis.bot_reclassifier import (
    _parse,
    _suspect,
    reconcile_lead_sessions,
)

# ---------------------------------------------------------------------------
# Weights (documented above). Tweak here; the score stays transparent because
# every contribution is reported in the reason string.
# ---------------------------------------------------------------------------
W_IMPOSSIBLE_ENGAGE = 0.35
W_FLOOD_RATE = 0.25
W_LOW_VARIETY = 0.20
W_TIMING_REGULAR = 0.20
W_NO_HUMAN_SIGNAL = 0.20
W_UA = 0.30
W_ZERO_DWELL_BURST = 0.15

C_PER_HUMAN_SIGNAL = 0.10
C_HUMAN_CAP = 0.35
C_FRUSTRATION = 0.15
C_FORM = 0.10

RAW_MAX = (
    W_IMPOSSIBLE_ENGAGE
    + W_FLOOD_RATE
    + W_LOW_VARIETY
    + W_TIMING_REGULAR
    + W_NO_HUMAN_SIGNAL
    + W_UA
    + W_ZERO_DWELL_BURST
)

# is_bot threshold on the normalised [0,1] score. Conservative on purpose: a
# session has to look bot-like on several axes to reach it.
DEFAULT_THRESHOLD = 0.60

# Below this many events we don't have enough evidence to score confidently;
# such sessions keep their existing classification (still subject to the floor).
MIN_EVENTS_TO_SCORE = 3

# Event names that PROVE a human was driving (mirror of the client taxonomy's
# INTERACTION_EVENTS). engagement_time is included because the client only emits
# it AFTER a genuine pointer/keyboard/touch/scroll input this session.
HUMAN_SIGNAL_EVENTS = frozenset(
    {
        "engagement_time",
        "scroll_depth",
        "section_view",
        "element_click",
        "cta_click",
        "custom_interaction",
        "outbound_click",
        "contact_click",
        "calc_view",
        "calc_input_change",
        "calc_computed",
        "calc_result_viewed",
        "calc_copy",
        "calc_share",
        "embed_cta_click",
        "form_start",
        "form_field_focus",
        "form_submit",
        "lead_submitted",
        "personalization_clicked",
        "support_opened",
    }
)
FRUSTRATION_EVENTS = frozenset({"rage_click", "dead_click"})
FORM_EVENTS = frozenset({"form_start", "form_field_focus", "form_submit", "lead_submitted"})

# bot_reason substrings produced at ingest by detectBot() that we treat as a
# strong UA prior.
UA_BOT_REASONS = ("ua_missing", "ua_pattern", "ua_no_mozilla", "botid")


def _headers() -> dict[str, str]:
    return {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


# ---------------------------------------------------------------------------
# Event fetching + summarisation
# ---------------------------------------------------------------------------
def _fetch_events(session_id: str, limit: int = 1000) -> list[dict]:
    """Pull this session's events (name + ts only) ordered by time."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/web_events",
        headers=_headers(),
        params={
            "session_id": f"eq.{session_id}",
            "select": "event_name,ts",
            "order": "ts.asc",
            "limit": str(limit),
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def summarise_events(events: list[dict]) -> dict[str, Any]:
    """Reduce a session's event stream to the features the scorer needs."""
    names: list[str] = [e.get("event_name") for e in events if e.get("event_name")]
    distinct = set(names)
    ts_list = [t for t in (_parse(e.get("ts")) for e in events) if t is not None]
    ts_list.sort()

    # Inter-event intervals (seconds) for timing-regularity analysis.
    gaps = [
        (ts_list[i] - ts_list[i - 1]).total_seconds() for i in range(1, len(ts_list))
    ]

    human_types = distinct & HUMAN_SIGNAL_EVENTS
    return {
        "n_events": len(names),
        "n_distinct": len(distinct),
        "distinct": distinct,
        "human_types": human_types,
        "n_human_types": len(human_types),
        "has_frustration": bool(distinct & FRUSTRATION_EVENTS),
        "has_form": bool(distinct & FORM_EVENTS),
        "gaps": gaps,
        "first_ts": ts_list[0] if ts_list else None,
        "last_ts": ts_list[-1] if ts_list else None,
    }


# ---------------------------------------------------------------------------
# Individual signal scorers (each returns a contribution in [0, weight])
# ---------------------------------------------------------------------------
def _timing_regularity_score(gaps: list[float]) -> float:
    """Low coefficient of variation on inter-event gaps => scripted cadence.

    Humans are jittery (CV typically > 0.5). A tight, near-constant cadence
    (CV < ~0.15) over enough events is a robot heartbeat. We need a handful of
    gaps to judge; otherwise return 0 (no evidence).
    """
    usable = [g for g in gaps if g >= 0]
    if len(usable) < 4:
        return 0.0
    m = sum(usable) / len(usable)
    if m <= 0:
        # All-simultaneous events -> handled by flood/zero-dwell, not here.
        return 0.0
    var = sum((g - m) ** 2 for g in usable) / len(usable)
    cv = (var**0.5) / m
    # Map CV in [0.15 .. 0.45] -> [1 .. 0]; below 0.15 = max bot-likeness.
    if cv <= 0.15:
        frac = 1.0
    elif cv >= 0.45:
        frac = 0.0
    else:
        frac = (0.45 - cv) / (0.45 - 0.15)
    return frac * W_TIMING_REGULAR


def _flood_rate_score(n_events: int, duration_s: float) -> float:
    """Events-per-second above human capability. A person can fire maybe a few
    events/sec at peak; sustained > ~8/s with many events is scripted."""
    if n_events < 10 or duration_s <= 0:
        return 0.0
    rate = n_events / duration_s
    if rate <= 8:
        return 0.0
    # Map rate 8..40 ev/s -> 0..1.
    frac = min(1.0, (rate - 8) / (40 - 8))
    return frac * W_FLOOD_RATE


def _impossible_engage_score(engaged_ms: int, duration_s: float) -> float:
    """engaged_ms exceeding wall-clock by a margin = faked clock. The hard rule
    fires at +60s of slack; this ramps the contribution in over 10..60s so a
    borderline emulator still gets weight without a single hard cliff."""
    slack_ms = engaged_ms - (duration_s * 1000)
    if slack_ms <= 10_000:
        return 0.0
    frac = min(1.0, (slack_ms - 10_000) / (60_000 - 10_000))
    return frac * W_IMPOSSIBLE_ENGAGE


def _low_variety_score(n_events: int, n_distinct: int) -> float:
    """Many events but very few DISTINCT types = monotone emitter."""
    if n_events < 8:
        return 0.0
    # 1 distinct type over many events is the worst case.
    if n_distinct <= 1:
        frac = 1.0
    elif n_distinct == 2:
        frac = 0.5
    elif n_distinct == 3:
        frac = 0.2
    else:
        frac = 0.0
    return frac * W_LOW_VARIETY


def _zero_dwell_burst_score(n_events: int, engaged_ms: int, duration_s: float) -> float:
    """Many events with ~no engaged time AND ~no wall time = instant burst."""
    if n_events < 8:
        return 0.0
    if engaged_ms <= 500 and duration_s <= 2.0:
        return W_ZERO_DWELL_BURST
    return 0.0


def _ua_score(bot_reason: str | None, ua_family: str | None) -> float:
    """UA prior from ingest-time detection / coarse family."""
    reason = (bot_reason or "").lower()
    if any(tag in reason for tag in UA_BOT_REASONS):
        return W_UA
    fam = (ua_family or "").strip().lower()
    if fam in ("", "unknown", "other"):
        # Unknown family is weakly suspicious, not damning.
        return 0.30 * W_UA
    return 0.0


# ---------------------------------------------------------------------------
# Combined scorer
# ---------------------------------------------------------------------------
def score_session(
    sess: dict, ev: dict[str, Any], *, threshold: float = DEFAULT_THRESHOLD
) -> dict[str, Any]:
    """Compute bot_score in [0,1], is_bot, and a human-readable reason.

    `sess` is a web_sessions row; `ev` is summarise_events() output for it.
    """
    started = _parse(sess.get("started_at"))
    last = _parse(sess.get("last_seen_at"))
    duration_s = (last - started).total_seconds() if started and last else 0.0
    if duration_s < 0:
        duration_s = 0.0
    engaged_ms = int(sess.get("engaged_ms") or 0)
    n_events = ev["n_events"] or int(sess.get("event_count") or 0)
    n_distinct = ev["n_distinct"]

    # ---- HARD FLOOR: original deterministic rules ----
    floor_reason = _suspect(sess)

    contributions: list[tuple[str, float]] = []

    def add(label: str, value: float) -> None:
        if value > 0.0001:
            contributions.append((label, round(value, 3)))

    add("impossible_engagement", _impossible_engage_score(engaged_ms, duration_s))
    add("flood_rate", _flood_rate_score(n_events, duration_s))
    add("low_event_variety", _low_variety_score(n_events, n_distinct))
    add("regular_timing", _timing_regularity_score(ev["gaps"]))
    add("zero_dwell_burst", _zero_dwell_burst_score(n_events, engaged_ms, duration_s))
    add("suspect_ua", _ua_score(sess.get("bot_reason"), sess.get("ua_family")))

    # No genuine human signal at all despite emitting events.
    if n_events >= MIN_EVENTS_TO_SCORE and ev["n_human_types"] == 0:
        add("no_human_signal", W_NO_HUMAN_SIGNAL)

    raw_bot = sum(v for _, v in contributions)

    # ---- HUMANITY CREDIT (push genuine humans down) ----
    credits: list[tuple[str, float]] = []

    def credit(label: str, value: float) -> None:
        if value > 0.0001:
            credits.append((label, round(value, 3)))

    human_credit = min(C_HUMAN_CAP, ev["n_human_types"] * C_PER_HUMAN_SIGNAL)
    credit(f"human_signals({ev['n_human_types']})", human_credit)
    if ev["has_frustration"]:
        credit("frustration_clicks", C_FRUSTRATION)
    if ev["has_form"]:
        credit("form_interaction", C_FORM)
    total_credit = sum(v for _, v in credits)

    raw = max(0.0, raw_bot - total_credit)
    score = round(min(1.0, raw / RAW_MAX) if RAW_MAX else 0.0, 4)

    # Multi-axis mechanical agreement with ZERO humanity is its own strong tell:
    # a session that emits many events but trips >=3 independent bot axes (e.g.
    # monotone type + clockwork timing + no human signal) and earned no humanity
    # credit is a scripted heartbeat even if no single hard rule fired.
    mechanical_axes = len(contributions)
    scripted_heartbeat = (
        n_events >= 8 and mechanical_axes >= 3 and total_credit <= 0.0001
    )

    # An ingest-time bot flag is STICKY (the ingest RPC OR-merges is_bot and never
    # clears it). We must mirror that: a session ingest already called a bot, or
    # whose bot_reason carries a UA-bot tag, can never be demoted to human here.
    already_bot = bool(sess.get("is_bot")) or any(
        tag in (sess.get("bot_reason") or "").lower() for tag in UA_BOT_REASONS
    )

    # ---- decision ----
    if floor_reason:
        is_bot = True
        score = max(score, threshold)  # floor implies bot-grade score
        decision_basis = f"floor:{floor_reason}"
    elif already_bot:
        is_bot = True
        decision_basis = "sticky_ingest_bot"
    elif scripted_heartbeat:
        is_bot = True
        score = max(score, threshold)
        decision_basis = "scripted_heartbeat"
    elif n_events < MIN_EVENTS_TO_SCORE:
        # Too little evidence: keep current classification, don't invent a bot.
        is_bot = bool(sess.get("is_bot"))
        decision_basis = "insufficient_evidence"
    else:
        is_bot = score >= threshold
        decision_basis = "score"

    # ---- reason string (top contributors, transparent) ----
    contributions.sort(key=lambda kv: kv[1], reverse=True)
    top = ", ".join(f"{k}={v}" for k, v in contributions[:4]) or "no_bot_signals"
    cred = ", ".join(f"-{k}={v}" for k, v in credits) if credits else "none"
    if floor_reason:
        reason = f"{floor_reason}; score={score} [{top}] credit[{cred}]"
    else:
        reason = f"score={score} ({decision_basis}) [{top}] credit[{cred}]"

    return {
        "bot_score": score,
        "is_bot": is_bot,
        "bot_reason": reason,
        "decision_basis": decision_basis,
        "contributions": contributions,
        "credits": credits,
    }


# ---------------------------------------------------------------------------
# Site-level reclassification
# ---------------------------------------------------------------------------
SESSION_SELECT = (
    "session_id,started_at,last_seen_at,event_count,engaged_ms,"
    "max_scroll_pct,device_type,ua_family,os_family,is_bot,bot_reason,"
    "botid_verified,human_confirmed"
)


def _fetch_sessions(site_key: str, since: str, limit: int = 10000) -> list[dict]:
    """Recent sessions for a site. We DELIBERATELY do not pre-filter on is_bot or
    human_confirmed: the score must be able to both promote a missed bot AND, in
    principle, leave a confirmed human alone. We do skip rows already marked bot
    by an immutable UA verdict to save work, but re-scoring them is harmless."""
    r = httpx.get(
        f"{SUPABASE_URL}/rest/v1/web_sessions",
        headers=_headers(),
        params={
            "site_key": f"eq.{site_key}",
            "started_at": f"gte.{since}",
            "select": SESSION_SELECT,
            "order": "started_at.desc",
            "limit": str(limit),
        },
        timeout=30.0,
    )
    r.raise_for_status()
    return r.json()


def _write_session(session_id: str, score: float, is_bot: bool, reason: str) -> bool:
    patch = httpx.patch(
        f"{SUPABASE_URL}/rest/v1/web_sessions",
        headers={
            **_headers(),
            "Content-Type": "application/json",
            "Prefer": "return=minimal",
        },
        params={"session_id": f"eq.{session_id}"},
        json={"bot_score": score, "is_bot": is_bot, "bot_reason": reason},
        timeout=20.0,
    )
    if patch.status_code in (200, 204):
        return True
    print(
        f"[SCORE] patch failed {session_id}: {patch.status_code} {patch.text[:160]}"
    )
    return False


def reclassify_bots_scored(
    site_key: str,
    *,
    days: int = 7,
    threshold: float = DEFAULT_THRESHOLD,
    dry_run: bool = False,
    reconcile: bool = True,
    max_print: int = 60,
) -> dict[str, Any]:
    """Score every recent session for `site_key` and (unless dry_run) persist
    bot_score + is_bot + bot_reason.

    Idempotent (writing the same score twice is a no-op) and resilient per-site
    (a site with no sessions/events simply yields zero changes). In dry_run mode
    NOTHING is written: it prints the proposed changes (session_id, score, reason,
    old->new is_bot) so the model can be validated before a live run.
    """
    if reconcile and not dry_run:
        # Conversion-stitch backstop (global, cheap). Skipped in dry-run so the
        # command is purely read-only and safe to run against any environment.
        try:
            reconcile_lead_sessions()
        except Exception as exc:  # noqa: BLE001
            print(f"[SCORE] reconcile skipped: {type(exc).__name__}: {exc}")

    since = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    try:
        sessions = _fetch_sessions(site_key, since)
    except Exception as exc:  # noqa: BLE001
        print(f"[SCORE] {site_key}: fetch sessions failed: {type(exc).__name__}: {exc}")
        return {"site_key": site_key, "scanned": 0, "changed": 0, "error": str(exc)}

    scanned = 0
    changed = 0
    new_bots = 0
    printed = 0
    if dry_run:
        print(
            f"[SCORE] DRY-RUN {site_key}: {len(sessions)} sessions in last {days}d, "
            f"threshold={threshold}"
        )

    for sess in sessions:
        sid = sess["session_id"]
        try:
            events = _fetch_events(sid)
        except Exception as exc:  # noqa: BLE001
            print(f"[SCORE] {sid}: fetch events failed: {type(exc).__name__}: {exc}")
            continue
        ev = summarise_events(events)
        scanned += 1

        verdict = score_session(sess, ev, threshold=threshold)
        old_is_bot = bool(sess.get("is_bot"))
        old_score = sess.get("bot_score")
        new_is_bot = verdict["is_bot"]
        new_score = verdict["bot_score"]

        # Did anything change? (is_bot flip, or score materially moved / first set)
        score_moved = old_score is None or abs(float(old_score) - new_score) >= 0.001
        flipped = old_is_bot != new_is_bot
        if not (flipped or score_moved):
            continue

        if dry_run:
            if printed < max_print:
                arrow = f"{old_is_bot}->{new_is_bot}"
                flag = " [FLIP]" if flipped else ""
                print(
                    f"  {sid}  score={new_score:.3f}  is_bot {arrow}{flag}\n"
                    f"      {verdict['bot_reason']}"
                )
                printed += 1
            changed += 1
            if flipped and new_is_bot:
                new_bots += 1
            continue

        if _write_session(sid, new_score, new_is_bot, verdict["bot_reason"]):
            changed += 1
            if flipped and new_is_bot:
                new_bots += 1

    mode = "DRY-RUN (no writes)" if dry_run else "wrote"
    if dry_run and changed > max_print:
        print(f"  ... (+{changed - max_print} more changes not printed)")
    print(
        f"[SCORE] {site_key}: scanned {scanned}, {mode} {changed} change(s), "
        f"{new_bots} newly flagged as bot"
    )
    return {
        "site_key": site_key,
        "scanned": scanned,
        "changed": changed,
        "new_bots": new_bots,
        "dry_run": dry_run,
    }


def _parse_args(argv: list[str]) -> dict[str, Any]:
    site = "property"
    dry_run = False
    days = 7
    threshold = DEFAULT_THRESHOLD
    for a in argv:
        if a in ("--dry-run", "--dry", "-n"):
            dry_run = True
        elif a.startswith("--days="):
            days = int(a.split("=", 1)[1])
        elif a.startswith("--threshold="):
            threshold = float(a.split("=", 1)[1])
        elif not a.startswith("-"):
            site = a
    return {"site": site, "dry_run": dry_run, "days": days, "threshold": threshold}


if __name__ == "__main__":
    args = _parse_args(sys.argv[1:])
    print(
        reclassify_bots_scored(
            args["site"],
            days=args["days"],
            threshold=args["threshold"],
            dry_run=args["dry_run"],
        )
    )
