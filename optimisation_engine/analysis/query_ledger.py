"""
Query-level estate ledger (deterministic pass).

Per --site: builds docs/_engines/query_ledgers/<site>_ledger.json — for every
canonical page: top owning queries with 7d/21d/90d metrics, expected-CTR gap
(pooled 7-site curve), position-band mix, trajectory, cannibalisation partners,
watch-window HOLD flags, and ONE rule-based action (action_source=deterministic).
Plus an unowned_queries section (demand with no well-ranking page).

READ-ONLY everywhere: Supabase SELECTs + local doc reads only. No content edits,
no DB writes, no deploys. Ambiguous pages are left for the LLM pass (Phase 4).

Usage:
    python -m optimisation_engine.analysis.query_ledger --site property
    python -m optimisation_engine.analysis.query_ledger --site property --verify

Spec: .claude/plans/i-am-worried-about-lazy-puffin.md Phases 2-3.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, timedelta
from urllib.parse import urlsplit, urlunsplit

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from optimisation_engine.analysis.detectors_v2 import (  # noqa: E402
    detect_cannibalisation_v2,
    detect_content_refresh,
    detect_near_miss_expansion_v2,
)
from optimisation_engine.analysis.noise_filter import is_noisy  # noqa: E402
from optimisation_engine.analysis.time_stratified_view import (  # noqa: E402
    StratifiedPQ,
    aggregate_by_page,
    fetch_stratified,
)
from optimisation_engine.competitor._db import _sql  # noqa: E402

SITES = ["property", "dentists", "solicitors", "medical", "generalist", "agency", "construction-cis"]

GSC_LAG_DAYS = 2          # GSC reporting lag
FRESHNESS_MAX_LAG = 3     # max(date) must be within this many days of (today - lag)
CURVE_DAYS = 90
CURVE_MIN_BUCKET_IMPR = 500
UNDERPERFORMER_FACTOR = 0.5
UNDERPERFORMER_MIN_IMPR = 50
STRIKING_MIN_POS, STRIKING_MAX_POS = 8.0, 20.0
STRIKING_MIN_IMPR_90D = 50
REFRESH_MIN_PRIOR_21D_IMPR = 50
THIN_PAGE_IMPR_90D = 10   # below this with no signal -> ambiguous (too thin to call healthy)
UNOWNED_MIN_IMPR_90D = 30
UNOWNED_MIN_POS = 30.0
TOP_QUERIES_PER_PAGE = 10

# Watch-window close dates (plan-fixed)
WINDOW_CLOSE_META_BATCH2 = "2026-08-05"
WINDOW_CLOSE_MINIFORM = "2026-08-06"
WINDOW_CLOSE_GAP_PAGES = "2026-08-06"

META_BATCH2_SHIP_START, META_BATCH2_SHIP_END = "2026-07-05", "2026-07-12"

# ponytail: property miniform mini-forms render sitewide via 6 components; holding
# every property page would make the ledger useless. We hold the direct conversion
# surfaces only; the deploy_watch source hard-fails if the table itself is empty.
MINIFORM_HOLD_PREFIXES = ("/calculators", "/tools", "/resources", "/thank-you", "/contact")

WAVE10_TRACKER = os.path.join(ROOT, "docs", "property", "wave10_page_tracker.md")
PROP_AUDIT_JSON = os.path.join(ROOT, "expansion_research", "_prop_audit", "gsc_page_query.json")
OUT_DIR = os.path.join(ROOT, "docs", "_engines", "query_ledgers")

# Brand/navigational tokens per site (derived from trading names / domains).
BRAND_TOKENS: dict[str, list[str]] = {
    "property": ["property tax partners", "propertytaxpartners"],
    "dentists": ["dental finance partners", "dentalfinancepartners"],
    "solicitors": ["accounts for lawyers", "accountsforlawyers"],
    "medical": ["medical accounts", "medicalaccounts"],
    "generalist": ["holloway", "holloway davies", "hollowaydavies"],
    "agency": ["agency founder", "agencyfounder"],
    "construction-cis": ["trade tax", "tradetax", "trade tax specialists"],
}
ALL_BRAND_TOKENS = [t for toks in BRAND_TOKENS.values() for t in toks]

BUCKETS = [str(i) for i in range(1, 11)] + ["11-15", "16-20", "21+"]


# ---------------------------------------------------------------------------
# URL normalisation
# ---------------------------------------------------------------------------

def canon(url: str) -> str:
    """Canonical page key: https, non-www, no fragment, no trailing slash (except root)."""
    if not url:
        return url
    parts = urlsplit(url.strip())
    host = parts.netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    path = parts.path.rstrip("/") or "/"
    return urlunsplit(("https", host, path, parts.query, ""))


# ---------------------------------------------------------------------------
# Freshness gate
# ---------------------------------------------------------------------------

def check_freshness(site_key: str) -> str:
    rows = _sql(f"SELECT MAX(date) AS mx FROM gsc_query_data WHERE site_key='{site_key}'")
    mx = rows[0].get("mx") if rows else None
    if not mx:
        raise SystemExit(f"[freshness] no gsc_query_data rows for {site_key} — refusing to run.")
    max_date = date.fromisoformat(str(mx)[:10])
    expected = date.today() - timedelta(days=GSC_LAG_DAYS)
    lag = (expected - max_date).days
    if lag > FRESHNESS_MAX_LAG:
        raise SystemExit(
            f"[freshness] {site_key} gsc_query_data max(date)={max_date} is {lag}d behind "
            f"expected {expected} (allowance {FRESHNESS_MAX_LAG}d). Re-pull GSC first "
            f"(fresh-search-data rule) — refusing to run."
        )
    print(f"[freshness] {site_key} OK: max(date)={max_date} (lag {lag}d within {FRESHNESS_MAX_LAG}d)")
    return str(max_date)


# ---------------------------------------------------------------------------
# Expected-CTR curve (pooled across all 7 sites, 90d, brand/noise excluded)
# ---------------------------------------------------------------------------

def _bucket_key(pos: float) -> str:
    if pos < 10.5:
        return str(max(1, min(10, int(round(pos)))))
    if pos <= 15:
        return "11-15"
    if pos <= 20:
        return "16-20"
    return "21+"


def _is_branded(query: str) -> bool:
    q = query.lower()
    return any(tok in q for tok in ALL_BRAND_TOKENS)


def build_expected_ctr_curve() -> dict:
    """Pooled expected CTR per position bucket; <500-impr buckets interpolated."""
    site_list = ", ".join(f"'{s}'" for s in SITES)
    rows = _sql(f"""
        SELECT query,
               SUM(impressions) AS impressions, SUM(clicks) AS clicks,
               SUM(position * impressions) / NULLIF(SUM(impressions), 0) AS wpos
        FROM gsc_query_data
        WHERE site_key IN ({site_list})
          AND date > now() - interval '{CURVE_DAYS} days'
        GROUP BY query
    """)
    impr = defaultdict(int)
    clicks = defaultdict(int)
    for r in rows:
        q = r.get("query") or ""
        if is_noisy(q)[0] or _is_branded(q):
            continue
        pos = float(r.get("wpos") or 0)
        if pos <= 0:
            continue
        b = _bucket_key(pos)
        impr[b] += int(r.get("impressions") or 0)
        clicks[b] += int(r.get("clicks") or 0)

    raw = {b: (clicks[b] / impr[b] if impr[b] else None) for b in BUCKETS}
    curve: dict[str, dict] = {}
    valid_idx = [i for i, b in enumerate(BUCKETS) if impr[b] >= CURVE_MIN_BUCKET_IMPR and raw[b] is not None]
    for i, b in enumerate(BUCKETS):
        if i in valid_idx:
            curve[b] = {"expected_ctr": round(raw[b], 5), "impressions": impr[b], "interpolated": False}
            continue
        # interpolate from nearest valid neighbours (linear on bucket index)
        lower = max((j for j in valid_idx if j < i), default=None)
        upper = min((j for j in valid_idx if j > i), default=None)
        if lower is not None and upper is not None:
            lo, hi = raw[BUCKETS[lower]], raw[BUCKETS[upper]]
            frac = (i - lower) / (upper - lower)
            val = lo + (hi - lo) * frac
        elif lower is not None:
            val = raw[BUCKETS[lower]]
        elif upper is not None:
            val = raw[BUCKETS[upper]]
        else:
            val = 0.0
        curve[b] = {"expected_ctr": round(val or 0.0, 5), "impressions": impr[b], "interpolated": True}

    # ponytail: enforce monotone non-increasing by clipping to the running min —
    # single-query blips at low-volume buckets otherwise invert the curve; upgrade
    # to pool-adjacent-violators if bucket volumes ever get big enough to matter.
    running = None
    for b in BUCKETS:
        v = curve[b]["expected_ctr"]
        if running is not None and v > running:
            curve[b]["expected_ctr"] = running
            curve[b]["monotonic_clipped"] = True
        else:
            running = v
    return curve


def expected_ctr_at(curve: dict, pos: float) -> float:
    return curve[_bucket_key(pos)]["expected_ctr"]


# ---------------------------------------------------------------------------
# HOLD set
# ---------------------------------------------------------------------------

def build_hold_map(site_key: str, canonical_pages: list[str]) -> dict[str, list[dict]]:
    """canonical page -> list of {source, reason, window_close}. Hard-fails for property
    if a hold source is unreadable/empty."""
    holds: dict[str, list[dict]] = defaultdict(list)
    is_property = site_key == "property"

    # (a) deploy_watch (property miniform multistep)
    try:
        dw = _sql("SELECT watch_key, gate_day, status FROM deploy_watch")
    except Exception as exc:
        if is_property:
            raise SystemExit(f"[hold] deploy_watch unreadable ({exc}) — HARD FAIL for property.")
        dw = []
    if is_property and not dw:
        raise SystemExit("[hold] deploy_watch is empty — HARD FAIL for property (incomplete hold list).")
    miniform_active = any(r.get("watch_key") == "miniform_multistep" and r.get("status") == "pending" for r in dw)
    if is_property and miniform_active:
        for p in canonical_pages:
            path = urlsplit(p).path
            if path.startswith(MINIFORM_HOLD_PREFIXES):
                holds[p].append({
                    "source": "deploy_watch_miniform",
                    "reason": "property multistep mini-form watch open (day 14/28 gates pending)",
                    "window_close": WINDOW_CLOSE_MINIFORM,
                })

    # (b) SERP meta batch-2 pages. Source of truth: optimisation_changes audit rows
    # (title_meta_rewrite shipped 2026-07-08). Doc cross-check: SERP_META_PROGRAM.md
    # "2026-07-08 batch 2: solicitors 19, generalist 12, dentists 10" — property had NO
    # batch-2 pages, so an empty property subset is correct; only an unreadable source
    # hard-fails property.
    try:
        mrows = _sql(f"""
            SELECT target_url FROM optimisation_changes
            WHERE site_key='{site_key}' AND change_type='title_meta_rewrite'
              AND shipped_at::date BETWEEN '{META_BATCH2_SHIP_START}' AND '{META_BATCH2_SHIP_END}'
              AND target_url IS NOT NULL
        """)
    except Exception as exc:
        if is_property:
            raise SystemExit(f"[hold] meta batch-2 source unreadable ({exc}) — HARD FAIL for property.")
        mrows = []
    for r in mrows:
        holds[canon(r["target_url"])].append({
            "source": "serp_meta_batch2",
            "reason": "SERP meta batch-2 page under 28d outcome watch",
            "window_close": WINDOW_CLOSE_META_BATCH2,
        })

    # (c) gap-wave pages. Property: Wave-10 tracker slugs (11 live). Other sites'
    # gap-discovery pages are written but NOT deployed (GAP_FILL_WAVE_PLAN /
    # estate summary), so nothing live to hold.
    if is_property:
        try:
            with open(WAVE10_TRACKER, encoding="utf-8") as fh:
                tracker = fh.read()
        except OSError as exc:
            raise SystemExit(f"[hold] wave10 tracker unreadable ({exc}) — HARD FAIL for property.")
        slugs = re.findall(r"\|\s*\[.\]\s*\|\s*A\d+\s*\|\s*([a-z0-9-]+)\s*\|", tracker)
        if not slugs:
            raise SystemExit("[hold] wave10 tracker parsed to zero slugs — HARD FAIL for property.")
        for p in canonical_pages:
            slug = urlsplit(p).path.rstrip("/").rsplit("/", 1)[-1]
            if slug in slugs:
                holds[p].append({
                    "source": "gap_wave_pages",
                    "reason": "gap-discovery Wave 10 page in ranking-maturation watch",
                    "window_close": WINDOW_CLOSE_GAP_PAGES,
                })
        # slugs not yet in GSC still recorded so the invariant check knows them
        holds["_gap_slugs"] = slugs  # type: ignore[assignment]
    return holds


# ---------------------------------------------------------------------------
# Bing merge
# ---------------------------------------------------------------------------

def fetch_bing_by_page(site_key: str) -> dict[str, list[dict]]:
    try:
        rows = _sql(f"""
            SELECT page_url, query, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
                   ROUND(AVG(position)::numeric, 1) AS avg_position
            FROM bing_query_data
            WHERE site_key='{site_key}'
              AND date = (SELECT MAX(date) FROM bing_query_data WHERE site_key='{site_key}')
            GROUP BY page_url, query
        """)
    except Exception as exc:
        print(f"[bing] pull failed ({exc}); ledger will carry no Bing rows", file=sys.stderr)
        return {}
    out: dict[str, list[dict]] = defaultdict(list)
    for r in rows:
        out[canon(r["page_url"])].append({
            "query": r["query"],
            "impressions": int(r.get("impressions") or 0),
            "clicks": int(r.get("clicks") or 0),
            "position": float(r["avg_position"]) if r.get("avg_position") is not None else None,
            "source": "bing_snapshot",
        })
    for p in out:
        out[p].sort(key=lambda x: x["impressions"], reverse=True)
        out[p] = out[p][:TOP_QUERIES_PER_PAGE]
    return out


# ---------------------------------------------------------------------------
# Ledger build
# ---------------------------------------------------------------------------

def _win_dict(w) -> dict:
    return {
        "impressions": w.impressions,
        "clicks": w.clicks,
        "position": round(w.avg_position, 2) if w.avg_position else None,
    }


def _sampling_loss_pct(site_key: str) -> float | None:
    """Query-dimension sampling loss vs unthresholded gsc_page_performance totals."""
    try:
        q = _sql(f"""SELECT SUM(impressions) AS i FROM gsc_query_data
                     WHERE site_key='{site_key}' AND date > now() - interval '90 days'""")
        p = _sql(f"""SELECT SUM(impressions) AS i FROM gsc_page_performance
                     WHERE niche='{site_key}' AND date > now() - interval '90 days'""")
        qi, pi = int(q[0]["i"] or 0), int(p[0]["i"] or 0)
        if pi <= 0:
            return None
        return round(max(0.0, 1 - qi / pi) * 100, 1)
    except Exception:
        return None


MATURATION_DAYS = 28
MATURATION_WATCH_DAYS = 42  # hold until first_seen + 42d (4-8wk ranking maturation)


def fetch_page_dim(site_key: str) -> dict[str, dict]:
    """Unthresholded page-dimension totals + first-seen date, keyed by canonical URL.

    gsc_query_data drops privacy-thresholded queries, so recently shipped pages can
    have page-level impressions but zero query rows — invisible to the query ledger.
    This backfills them and drives the data-driven maturation hold.
    """
    try:
        rows = _sql(f"""SELECT page_url, MIN(date) AS first_seen,
                               SUM(impressions) AS i, SUM(clicks) AS c
                        FROM gsc_page_performance
                        WHERE niche='{site_key}' AND date > now() - interval '90 days'
                          AND impressions > 0
                        GROUP BY page_url""")
    except Exception:
        return {}
    out: dict[str, dict] = {}
    for r in rows:
        cp = canon(r["page_url"])
        cur = out.get(cp)
        if cur:
            cur["impressions_90d"] += int(r["i"] or 0)
            cur["clicks_90d"] += int(r["c"] or 0)
            cur["first_seen"] = min(cur["first_seen"], str(r["first_seen"]))
        else:
            out[cp] = {"first_seen": str(r["first_seen"]),
                       "impressions_90d": int(r["i"] or 0),
                       "clicks_90d": int(r["c"] or 0)}
    return out


def build_ledger(site_key: str) -> dict:
    max_date = check_freshness(site_key)
    print(f"[curve] building pooled expected-CTR curve ({len(SITES)} sites, {CURVE_DAYS}d)...")
    curve = build_expected_ctr_curve()

    stratified = fetch_stratified(site_key, older_days=90)
    if not stratified:
        raise SystemExit(f"no stratified GSC data for {site_key}")
    by_page_raw = aggregate_by_page(stratified)

    # Group stratified records under canonical pages, keep variants visible.
    pages: dict[str, dict] = {}
    for (page, q), rec in stratified.items():
        cp = canon(page)
        d = pages.setdefault(cp, {"variants": set(), "recs": defaultdict(list)})
        d["variants"].add(page)
        d["recs"][q].append(rec)

    canonical_pages = sorted(pages)
    holds = build_hold_map(site_key, canonical_pages)
    gap_slugs = holds.pop("_gap_slugs", [])
    bing = fetch_bing_by_page(site_key)

    # Data-driven maturation hold: any page whose first page-dim impression is
    # within MATURATION_DAYS gets held — catches recent ships no doc list names.
    page_dim = fetch_page_dim(site_key)
    maturation_cutoff = (date.today() - timedelta(days=MATURATION_DAYS)).isoformat()
    for cp, pd in page_dim.items():
        if pd["first_seen"] >= maturation_cutoff:
            close = (date.fromisoformat(pd["first_seen"])
                     + timedelta(days=MATURATION_WATCH_DAYS)).isoformat()
            holds.setdefault(cp, []).append({
                "source": "ranking_maturation",
                "reason": f"first GSC impression {pd['first_seen']} — ranking-maturation watch",
                "window_close": close,
            })

    # Detectors (called, not reimplemented) — canonical-mapped evidence sets.
    near_miss = {canon(o.target_url) for o in detect_near_miss_expansion_v2(site_key, by_page_raw) if o.target_url}
    refresh_det = {canon(o.target_url) for o in detect_content_refresh(site_key, by_page_raw) if o.target_url}
    cannib_partners: dict[str, dict[str, set]] = defaultdict(lambda: defaultdict(set))
    for opp in detect_cannibalisation_v2(site_key, stratified):
        comp = {canon(c["page"]) for c in (opp.supporting_data or {}).get("competing_pages", [])}
        if len(comp) < 2:
            continue  # www/fragment variants of one page, not real cannibalisation
        for p in comp:
            cannib_partners[p][opp.primary_query] |= comp - {p}

    ledger_pages = []
    for cp in canonical_pages:
        d = pages[cp]
        # merge per-query across URL variants
        merged: list[tuple[str, dict, StratifiedPQ]] = []
        page_impr_90 = page_clicks_90 = 0
        wpos_num = 0.0
        band_impr = defaultdict(int)
        for q, recs in d["recs"].items():
            i7 = sum(r.last_7d.impressions for r in recs)
            c7 = sum(r.last_7d.clicks for r in recs)
            i21 = sum(r.prior_21d.impressions for r in recs)
            c21 = sum(r.prior_21d.clicks for r in recs)
            io = sum(r.older.impressions for r in recs)
            co = sum(r.older.clicks for r in recs)
            i90, c90 = i7 + i21 + io, c7 + c21 + co
            # impressions-weighted position across windows/variants
            wn = wd = 0.0
            for r in recs:
                for w in (r.last_7d, r.prior_21d, r.older):
                    if w.impressions and w.avg_position:
                        wn += w.avg_position * w.impressions
                        wd += w.impressions
            pos90 = (wn / wd) if wd else None
            top_rec = max(recs, key=lambda r: r.total_impressions_28d + r.older.impressions)
            merged.append((q, {
                "i7": i7, "c7": c7, "i21": i21, "c21": c21, "i90": i90, "c90": c90,
                "pos90": pos90,
                "w7": _win_dict(top_rec.last_7d) if len(recs) == 1 else {"impressions": i7, "clicks": c7, "position": None},
            }, top_rec))
            page_impr_90 += i90
            page_clicks_90 += c90
            if pos90 and i90:
                wpos_num += pos90 * i90
                band_impr[_bucket_key(pos90)] += i90

        page_pos_90 = round(wpos_num / page_impr_90, 2) if page_impr_90 else None
        merged.sort(key=lambda t: t[1]["i90"], reverse=True)

        # page trajectory = trajectory of the top query + page-level 7d-vs-21d delta
        top_traj = merged[0][2].trajectory if merged else "trivial"
        i7_page = sum(m[1]["i7"] for m in merged)
        i21_page = sum(m[1]["i21"] for m in merged)
        prior_rate = i21_page / 21.0
        delta = ((i7_page / 7.0) - prior_rate) / prior_rate if prior_rate else None

        top_queries = []
        for q, m, rec in merged[:TOP_QUERIES_PER_PAGE]:
            exp = expected_ctr_at(curve, m["pos90"]) if m["pos90"] else None
            obs = (m["c90"] / m["i90"]) if m["i90"] else 0.0
            top_queries.append({
                "query": q,
                "trajectory": rec.trajectory,
                "last_7d": {"impressions": m["i7"], "clicks": m["c7"]},
                "prior_21d": {"impressions": m["i21"], "clicks": m["c21"]},
                "d90": {"impressions": m["i90"], "clicks": m["c90"],
                        "position": round(m["pos90"], 2) if m["pos90"] else None},
                "ctr_90d": round(obs, 5),
                "expected_ctr": exp,
                "ctr_gap": round(obs - exp, 5) if exp is not None else None,
            })

        band_mix = {b: round(band_impr[b] / page_impr_90, 3) for b in BUCKETS if band_impr[b]} if page_impr_90 else {}

        # --- signals ------------------------------------------------------
        signals = []
        if cannib_partners.get(cp):
            signals.append("consolidate_candidate")
        # striking distance: weighted pos 8-20 with >=50 impr 90d (or detector near-miss hit)
        if (page_pos_90 and STRIKING_MIN_POS <= page_pos_90 <= STRIKING_MAX_POS
                and page_impr_90 >= STRIKING_MIN_IMPR_90D) or cp in near_miss:
            signals.append("expand")
        # CTR underperformer at pos <= 10
        if page_pos_90 and page_pos_90 <= 10 and page_impr_90 >= UNDERPERFORMER_MIN_IMPR:
            exp = expected_ctr_at(curve, page_pos_90)
            obs = page_clicks_90 / page_impr_90 if page_impr_90 else 0.0
            if exp and obs < UNDERPERFORMER_FACTOR * exp:
                signals.append("meta_fix")
        # declining trajectory with enough prior signal (or detector refresh hit)
        if ((top_traj == "declining" or (delta is not None and delta <= -0.3))
                and i21_page >= REFRESH_MIN_PRIOR_21D_IMPR) or cp in refresh_det:
            signals.append("refresh")

        hold_entries = holds.get(cp, [])
        if hold_entries:
            action = "hold"
        elif len(set(signals)) >= 2:
            action = "ambiguous"
        elif signals:
            action = signals[0]
        elif page_impr_90 < THIN_PAGE_IMPR_90D:
            action = "ambiguous"
        else:
            action = "healthy"

        ledger_pages.append({
            "page": cp,
            "variants": sorted(d["variants"]),
            "impressions_90d": page_impr_90,
            "clicks_90d": page_clicks_90,
            "weighted_position_90d": page_pos_90,
            "band_mix": band_mix,
            "trajectory": top_traj,
            "trajectory_delta_pct": round(delta, 3) if delta is not None else None,
            "top_queries": top_queries,
            "bing_queries": bing.get(cp, []),
            "cannibalisation_partners": [
                {"query": q, "partners": sorted(ps)} for q, ps in sorted(cannib_partners.get(cp, {}).items())
            ],
            "hold": bool(hold_entries),
            "hold_reasons": hold_entries,
            "action": action,
            "action_source": "deterministic",
            "owner_approval_required": action == "consolidate_candidate",
            "signals": signals,
            "first_seen": page_dim.get(cp, {}).get("first_seen"),
        })

    # Query-invisible pages: page-dim impressions but zero query rows (privacy
    # thresholding on new/rare-query pages). Add thin entries so they're visible.
    seen_canon = {p["page"] for p in ledger_pages}
    for cp, pd in sorted(page_dim.items()):
        if cp in seen_canon:
            continue
        hold_entries = holds.get(cp, [])
        ledger_pages.append({
            "page": cp,
            "variants": [cp],
            "impressions_90d": pd["impressions_90d"],
            "clicks_90d": pd["clicks_90d"],
            "weighted_position_90d": None,
            "band_mix": {},
            "trajectory": None,
            "trajectory_delta_pct": None,
            "top_queries": [],
            "bing_queries": bing.get(cp, []),
            "cannibalisation_partners": [],
            "hold": bool(hold_entries),
            "hold_reasons": hold_entries,
            "action": "hold" if hold_entries else "ambiguous",
            "action_source": "deterministic",
            "owner_approval_required": False,
            "signals": ["query_data_thin"],
            "first_seen": pd["first_seen"],
        })

    ledger_pages.sort(key=lambda p: p["impressions_90d"], reverse=True)

    # --- unowned queries --------------------------------------------------
    best_pos_by_query: dict[str, float] = {}
    impr_by_query = defaultdict(int)
    for (page, q), rec in stratified.items():
        if is_noisy(q)[0] or _is_branded(q):
            continue
        for w in (rec.last_7d, rec.prior_21d, rec.older):
            impr_by_query[q] += w.impressions
            if w.impressions and w.avg_position:
                if q not in best_pos_by_query or w.avg_position < best_pos_by_query[q]:
                    best_pos_by_query[q] = w.avg_position
    unowned = [
        {"query": q, "impressions_90d": impr_by_query[q],
         "best_position": round(best_pos_by_query.get(q, 999.0), 1),
         "action": "new_page_target", "action_source": "deterministic"}
        for q in impr_by_query
        if impr_by_query[q] >= UNOWNED_MIN_IMPR_90D and best_pos_by_query.get(q, 999.0) > UNOWNED_MIN_POS
    ]
    unowned.sort(key=lambda u: u["impressions_90d"], reverse=True)

    action_counts = defaultdict(int)
    for p in ledger_pages:
        action_counts[p["action"]] += 1

    return {
        "metadata": {
            "site_key": site_key,
            "generated": date.today().isoformat(),
            "gsc_max_date": max_date,
            "gsc_lag_days": GSC_LAG_DAYS,
            "pages": len(ledger_pages),
            "action_counts": dict(action_counts),
            "sampling_loss_pct": _sampling_loss_pct(site_key),
            "expected_ctr_curve": curve,
            "gap_wave_slugs": gap_slugs,
            "notes": [
                "meta batch-2 hold source = optimisation_changes title_meta_rewrite rows "
                "shipped 2026-07-05..2026-07-12 (batch 2 = solicitors 19 / generalist 12 / "
                "dentists 10 per SERP_META_PROGRAM.md; property had no batch-2 pages).",
                "property miniform hold covers conversion-surface routes "
                f"{MINIFORM_HOLD_PREFIXES} while the deploy_watch miniform gates are pending.",
            ],
        },
        "pages": ledger_pages,
        "unowned_queries": unowned,
    }


def write_ledger(site_key: str) -> str:
    ledger = build_ledger(site_key)
    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{site_key}_ledger.json")
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(ledger, fh, indent=2, ensure_ascii=False)
    m = ledger["metadata"]
    print(f"\n[ledger] {site_key}: {m['pages']} pages -> {out_path}")
    print(f"[ledger] actions: {m['action_counts']}")
    print(f"[ledger] unowned queries: {len(ledger['unowned_queries'])}")
    print(f"[ledger] query-dimension sampling loss vs page totals: {m['sampling_loss_pct']}%")
    return out_path


# ---------------------------------------------------------------------------
# --verify (Phase 3)
# ---------------------------------------------------------------------------

def _independent_date_totals(site_key: str, days: int = 90) -> tuple[int, int] | None:
    """Independent ['date']-only GSC API pull (unsampled totals). Reuses the
    GSCQueryFetcher OAuth client; returns (impressions, clicks) or None."""
    try:
        from optimisation_engine.clients.gsc_query_client import GSCQueryFetcher
        fetcher = GSCQueryFetcher(site_key)
        body = {
            "startDate": (date.today() - timedelta(days=days)).isoformat(),
            "endDate": date.today().isoformat(),
            "dimensions": ["date"],
            "rowLimit": 5000,
        }
        resp = (fetcher.gsc_client.service.searchanalytics()
                .query(siteUrl=fetcher.site["gsc_property_url"], body=body).execute())
        rows = resp.get("rows", [])
        return (sum(int(r.get("impressions", 0)) for r in rows),
                sum(int(r.get("clicks", 0)) for r in rows))
    except Exception as exc:
        print(f"[verify] independent GSC pull unavailable: {exc}")
        return None


def _spot_checks(site_key: str, ledger: dict) -> list[str]:
    """3 known audit facts, loose ±30% tolerance. Only the ones for this site run."""
    fails: list[str] = []

    def find_query(substr_all: list[str]):
        for p in ledger["pages"]:
            for tq in p["top_queries"]:
                if all(s in tq["query"].lower() for s in substr_all):
                    return p, tq
        return None, None

    def within(val, target, tol=0.30):
        return val is not None and abs(val - target) <= tol * target

    if site_key == "property":
        p, tq = find_query(["connected", "part"])  # SDLT connected-party/parties
        if tq is None:
            fails.append("spot: property SDLT connected-party query not found in ledger")
        else:
            i, pos = tq["d90"]["impressions"], tq["d90"]["position"]
            if not within(i, 505):
                fails.append(f"spot: connected-party impr {i} not within 30% of 505")
            if not (pos and 8.6 * 0.7 <= pos <= 8.6 * 1.3):
                fails.append(f"spot: connected-party pos {pos} not ~8.6")
            print(f"[verify] spot connected-party: impr={i} pos={pos} (target ~505 / ~8.6)")
        p, tq = find_query(["stamp duty", "scotland"])
        if tq is None:
            fails.append("spot: 'stamp duty scotland' not found in ledger")
        else:
            if not (tq["d90"]["position"] and tq["d90"]["position"] <= 1.5):
                fails.append(f"spot: 'stamp duty scotland' pos {tq['d90']['position']} not ~1")
            if tq["d90"]["clicks"] != 0:
                fails.append(f"spot: 'stamp duty scotland' clicks {tq['d90']['clicks']} != 0")
            print(f"[verify] spot stamp-duty-scotland: pos={tq['d90']['position']} clicks={tq['d90']['clicks']}")
    if site_key == "dentists":
        page = next((p for p in ledger["pages"] if "software" in p["page"]), None)
        if page is None:
            fails.append("spot: dentists software page not found in ledger")
        else:
            pos = page["weighted_position_90d"]
            if not (pos and 7 <= pos <= 13):
                fails.append(f"spot: dentists software page pos {pos} not ~10")
            print(f"[verify] spot dentists-software: pos={pos} clicks={page['clicks_90d']}")
    return fails


def verify(site_key: str) -> int:
    out_path = os.path.join(OUT_DIR, f"{site_key}_ledger.json")
    if not os.path.exists(out_path):
        raise SystemExit(f"[verify] {out_path} missing — run the build first.")
    with open(out_path, encoding="utf-8") as fh:
        ledger = json.load(fh)

    failures: list[str] = []
    pages = ledger["pages"]

    # Invariant: exactly one action per page, from the enum
    valid = {"meta_fix", "expand", "refresh", "consolidate_candidate", "new_page_target",
             "hold", "healthy", "ambiguous"}
    for p in pages:
        if p.get("action") not in valid:
            failures.append(f"invariant: {p['page']} has invalid action {p.get('action')!r}")

    # Invariant: every held page carries action=hold
    for p in pages:
        if p.get("hold_reasons") and p["action"] != "hold":
            failures.append(f"invariant: {p['page']} has hold_reasons but action={p['action']}")
    if site_key == "property":
        gap_slugs = set(ledger["metadata"].get("gap_wave_slugs") or [])
        matched = 0
        for p in pages:
            slug = p["page"].rstrip("/").rsplit("/", 1)[-1]
            if slug in gap_slugs:
                matched += 1
                if p["action"] != "hold":
                    failures.append(f"invariant: gap-wave page {p['page']} not held")
        print(f"[verify] gap-wave slugs matched in ledger: {matched}/{len(gap_slugs)} "
              f"(unmatched = no GSC data yet)")

    # Invariant: every page first-seen within the maturation window must be held
    gen = date.fromisoformat(ledger["metadata"]["generated"])
    cutoff = (gen - timedelta(days=MATURATION_DAYS)).isoformat()
    for p in pages:
        fs = p.get("first_seen")
        if fs and fs >= cutoff and p["action"] != "hold":
            failures.append(f"invariant: {p['page']} first_seen {fs} (maturation) but "
                            f"action={p['action']}")

    # Invariant: expected-CTR curve roughly monotonic decreasing (15% slack per step)
    curve = ledger["metadata"]["expected_ctr_curve"]
    vals = [curve[b]["expected_ctr"] for b in BUCKETS]
    for i in range(1, len(vals)):
        if vals[i] > vals[i - 1] * 1.15 + 1e-9:
            failures.append(f"invariant: curve not monotonic-ish at bucket {BUCKETS[i]} "
                            f"({vals[i - 1]:.4f} -> {vals[i]:.4f})")

    # Sampling divergence vs independent ['date']-only pull (always printed)
    ledger_impr = sum(p["impressions_90d"] for p in pages)
    ledger_clicks = sum(p["clicks_90d"] for p in pages)
    ind = _independent_date_totals(site_key)
    if ind:
        ti, tc = ind
        div = abs(ti - ledger_impr) / ti * 100 if ti else 0.0
        print(f"[verify] totals: ledger impr={ledger_impr} clicks={ledger_clicks} | "
              f"GSC date-only impr={ti} clicks={tc} | divergence {div:.1f}%")
        if div > 15:
            print(f"[verify] FLAG: sampling divergence {div:.1f}% > 15% "
                  f"(query-dimension sampling loss — quantified, not hidden)")
    else:
        print(f"[verify] totals: ledger impr={ledger_impr} clicks={ledger_clicks} "
              f"(no independent pull; stored sampling_loss_pct="
              f"{ledger['metadata'].get('sampling_loss_pct')}%)")

    # Property cross-check vs audit snapshot
    if site_key == "property" and os.path.exists(PROP_AUDIT_JSON):
        with open(PROP_AUDIT_JSON, encoding="utf-8") as fh:
            audit = json.load(fh)
        audit_impr = sum(int(r.get("impressions", 0)) for r in audit)
        div = abs(audit_impr - ledger_impr) / audit_impr * 100 if audit_impr else 0.0
        print(f"[verify] _prop_audit cross-check: audit impr={audit_impr} vs ledger "
              f"{ledger_impr} ({div:.1f}% divergence; audit window differs, informational)")
    elif site_key == "property":
        failures.append(f"cross-check: {PROP_AUDIT_JSON} missing")

    failures += _spot_checks(site_key, ledger)

    if failures:
        print(f"\n[verify] {site_key}: {len(failures)} FAILURE(S)")
        for f in failures:
            print(f"  FAIL {f}")
        return 1
    print(f"\n[verify] {site_key}: all invariants + checks passed")
    return 0


# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="Query-level estate ledger (read-only).")
    parser.add_argument("--site", required=True, choices=SITES)
    parser.add_argument("--verify", action="store_true",
                        help="verify an already-built ledger instead of building")
    args = parser.parse_args()
    if args.verify:
        return verify(args.site)
    write_ledger(args.site)
    return 0


if __name__ == "__main__":
    sys.exit(main())
