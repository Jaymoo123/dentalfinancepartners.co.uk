"""Property change-aware meta analysis (read-only).

Implements the v2 methodology (docs/_engines/META_PROGRAM.md):
  - NEW / CHANGED / CONTROL cohort decomposition of site-level deltas
  - difference-in-differences vs the untouched-control drift ratio (per position band)
  - per-intervention pre/post windows with overlap truncation + grace period
  - position-conditional CTR via pooled expected-CTR curve residuals (query level)
  - retained / gained / lost query sets with control-churn calibration
  - verdicts {insufficient-data, immature, confounded, clean-loss, clean-win, neutral}
  - routing {hold, propose-meta, revert-candidate, needs-position-not-meta}
  - placebo self-check: control pages through the same pipeline with a fake ship date

Inputs: .cache/meta_program/property/intervention_ledger.json (run meta_property_ledger.py first),
        docs/_engines/property_frozen_pages.md (hard-fails if missing/empty),
        Supabase gsc_page_performance + gsc_query_data (Google only; Bing is directional, unwindowable).

Output: .cache/meta_program/property/analysis.json + console summary.

Usage: python scripts/meta_property_analysis.py
"""
from __future__ import annotations

import json
import math
import re
import sys
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from optimisation_engine.competitor._db import _sql  # noqa: E402
from optimisation_engine.analysis.query_ledger import (  # noqa: E402
    canon, check_freshness, build_expected_ctr_curve, GSC_LAG_DAYS,
    BRAND_TOKENS,
)

SITE = "property"
LEDGER = ROOT / ".cache" / "meta_program" / SITE / "intervention_ledger.json"
FROZEN = ROOT / "docs" / "_engines" / "property_frozen_pages.md"
OUT = ROOT / ".cache" / "meta_program" / SITE / "analysis.json"

WINDOW = 28          # days per window
GRACE = 3            # days after ship excluded (recrawl latency)
MIN_TRUNC = 14       # truncated window shorter than this -> confounded
PRE_MIN_IMPR = 30    # floor for any impression verdict
PRE_POS_IMPR = 100   # floor for position claims
MATURE_DAYS = 90     # page younger than this at ship -> immature
IMPR_DELTA = 0.25    # +/-25% adjusted delta for win/loss
POS_LOSS = 3.0       # weighted-position worsening for loss
DEEP_POS = 15.0      # weighted position beyond which meta cannot help
QUERY_MIN_IMPR = 5   # query membership threshold per window
GAIN_VS_CONTROL = 2.0
CONTROL_MIN_PAGES = 20
CONTROL_MIN_IMPR = 500
VOLATILE_LOG_R = 0.2
# Google algo update dates to cross-check window volatility (maintain manually).
ALGO_UPDATES = ["2026-06-30"]  # June 2026 core update (approx); add as announced

META_TYPES = {"title_meta_rewrite", "meta_frontmatter_edit"}
BRAND = BRAND_TOKENS.get(SITE, [])

# position bands for control drift
def band(pos: float) -> str:
    if pos <= 10:
        return "1-10"
    if pos <= 20:
        return "11-20"
    return "21+"


def expected_ctr(curve: dict, pos: float) -> float:
    if pos <= 10:
        key = str(max(1, min(10, round(pos))))
    elif pos <= 15:
        key = "11-15"
    elif pos <= 20:
        key = "16-20"
    else:
        key = "21+"
    entry = curve.get(key)
    return float(entry["expected_ctr"]) if entry else 0.0


def wilson(clicks: int, impr: int, z: float = 1.96) -> tuple[float, float]:
    if impr == 0:
        return (0.0, 0.0)
    p = clicks / impr
    d = 1 + z * z / impr
    c = p + z * z / (2 * impr)
    m = z * math.sqrt((p * (1 - p) + z * z / (4 * impr)) / impr)
    return ((c - m) / d, (c + m) / d)


def is_brand(q: str) -> bool:
    return any(t in q for t in BRAND)


def d(s: str) -> date:
    return date.fromisoformat(s[:10])


def _sql_retry(q: str, tries: int = 4) -> list[dict]:
    import time
    for a in range(tries):
        try:
            return _sql(q)
        except Exception:
            if a == tries - 1:
                raise
            time.sleep(3 * (a + 1))
    return []


def url_variants(p: str) -> list[str]:
    """DB rows may be stored www or non-www, trailing slash, and pre-recategorisation
    flat paths (/blog/<slug>) — the site moved to /blog/<category>/<slug> mid-May 2026."""
    outs = {p}
    parts = p.split("/blog/", 1)
    if len(parts) == 2 and "/" in parts[1]:
        outs.add(parts[0] + "/blog/" + parts[1].rsplit("/", 1)[-1])  # flat variant
    outs |= {u.replace("https://propertytaxpartners", "https://www.propertytaxpartners") for u in outs}
    outs |= {u + "/" for u in outs}
    return sorted(outs)


def _in_list(chunk: list[str]) -> str:
    return ", ".join("'" + v.replace("'", "''") + "'" for p in chunk for v in url_variants(p))


def page_window_stats(pages: list[str], start: date, end: date) -> dict[str, dict]:
    """Per-page impressions/clicks/wpos from gsc_page_performance over [start, end]."""
    out: dict[str, dict] = {}
    for i in range(0, len(pages), 100):
        chunk = pages[i:i + 100]
        urls = _in_list(chunk)
        rows = _sql_retry(f"""
            SELECT page_url, SUM(impressions) i, SUM(clicks) c,
                   SUM(position*impressions)/NULLIF(SUM(impressions),0) wpos
            FROM gsc_page_performance
            WHERE niche='{SITE}' AND date BETWEEN '{start}' AND '{end}'
              AND page_url IN ({urls})
            GROUP BY page_url""")
        for r in rows:
            u = canon(r["page_url"])
            prev = out.get(u)
            i2, c2 = int(r["i"] or 0), int(r["c"] or 0)
            w2 = float(r["wpos"]) if r["wpos"] is not None else None
            if prev:  # merge www/non-www duplicates, impression-weighted position
                ti = prev["i"] + i2
                if prev["wpos"] is not None and w2 is not None and ti:
                    w2 = (prev["wpos"] * prev["i"] + w2 * i2) / ti
                elif w2 is None:
                    w2 = prev["wpos"]
                i2, c2 = ti, prev["c"] + c2
            out[u] = {"i": i2, "c": c2, "wpos": w2}
    return out


def query_window_stats(pages: list[str], start: date, end: date) -> dict[str, dict[str, dict]]:
    """page -> query -> {i, c, wpos} over [start, end]. Brand queries excluded."""
    out: dict[str, dict[str, dict]] = defaultdict(dict)
    for i in range(0, len(pages), 40):
        chunk = pages[i:i + 40]
        urls = _in_list(chunk)
        rows = _sql_retry(f"""
            SELECT page_url, query, SUM(impressions) i, SUM(clicks) c,
                   SUM(position*impressions)/NULLIF(SUM(impressions),0) wpos
            FROM gsc_query_data
            WHERE site_key='{SITE}' AND date BETWEEN '{start}' AND '{end}'
              AND page_url IN ({urls})
            GROUP BY page_url, query""")
        for r in rows:
            q = (r["query"] or "").lower()
            if is_brand(q):
                continue
            u = canon(r["page_url"])
            prev = out[u].get(q)
            i2, c2 = int(r["i"] or 0), int(r["c"] or 0)
            w2 = float(r["wpos"]) if r["wpos"] is not None else None
            if prev:
                ti = prev["i"] + i2
                if prev["wpos"] is not None and w2 is not None and ti:
                    w2 = (prev["wpos"] * prev["i"] + w2 * i2) / ti
                elif w2 is None:
                    w2 = prev["wpos"]
                i2, c2 = ti, prev["c"] + c2
            out[u][q] = {"i": i2, "c": c2, "wpos": w2}
    return out


def residual_rate(qstats: dict[str, dict], curve: dict) -> tuple[float | None, int, float]:
    """(residual clicks per impression, impressions, expected clicks) query-by-query."""
    impr = sum(v["i"] for v in qstats.values())
    if impr == 0:
        return None, 0, 0.0
    exp = sum(expected_ctr(curve, v["wpos"]) * v["i"] for v in qstats.values() if v["wpos"] is not None)
    clicks = sum(v["c"] for v in qstats.values())
    return (clicks - exp) / impr, impr, exp


def load_frozen() -> set[str]:
    if not FROZEN.exists():
        raise SystemExit(f"[frozen] {FROZEN} missing — HARD FAIL (property safety gate).")
    urls = {canon(m) for m in re.findall(r"^\s*-\s*(https?://\S+)", FROZEN.read_text(encoding="utf-8"), re.M)}
    if not urls:
        raise SystemExit("[frozen] frozen list empty — HARD FAIL (property safety gate).")
    return urls


def compute_windows(url: str, ship: date, all_dates: list[date], today: date,
                    pre_anchor: date | None = None) -> dict:
    """Pre/post windows for one intervention (or burst: post from last edit,
    pre from before the first edit), truncated by neighbouring interventions."""
    flags: list[str] = []
    anchor = pre_anchor or ship
    post_start, post_end = ship + timedelta(days=GRACE + 1), ship + timedelta(days=GRACE + WINDOW)
    pre_end, pre_start = anchor - timedelta(days=2), anchor - timedelta(days=1 + WINDOW)
    data_edge = today - timedelta(days=GSC_LAG_DAYS)
    post_end = min(post_end, data_edge)
    for od in all_dates:
        if od == ship:
            continue
        if ship < od <= post_end:
            post_end = min(post_end, od - timedelta(days=1))
            flags.append("post_truncated")
        if pre_start <= od < ship:
            pre_start = max(pre_start, od + timedelta(days=GRACE + 1))
            flags.append("pre_truncated")
    return {"pre": (pre_start, pre_end), "post": (post_start, post_end), "flags": flags}


class StatsCache:
    """Batches (window -> pages) fetches so wave-shipped edits share one query."""

    def __init__(self) -> None:
        self.page: dict[tuple, dict[str, dict]] = {}
        self.query: dict[tuple, dict[str, dict]] = {}

    def prefetch(self, jobs: list[tuple[str, tuple[date, date]]]) -> None:
        by_win: dict[tuple, list[str]] = defaultdict(list)
        for url, win in jobs:
            if win[1] >= win[0]:
                by_win[win].append(url)
        for win, urls in by_win.items():
            urls = sorted(set(urls))
            self.page.setdefault(win, {}).update(page_window_stats(urls, *win))
            self.query.setdefault(win, {}).update(query_window_stats(urls, *win))

    def ps(self, url: str, win: tuple) -> dict:
        return self.page.get(win, {}).get(url, {"i": 0, "c": 0, "wpos": None})

    def qs(self, url: str, win: tuple) -> dict:
        return self.query.get(win, {}).get(url, {})


def analyse_intervention(url: str, ship: date, windows: dict, cache: StatsCache,
                         birth: date | None, curve: dict, r_band: dict[str, float],
                         flags_global: list[str]) -> dict:
    """Stats and verdict for one meta intervention on one page (prefetched cache)."""
    res: dict = {"url": url, "ship": str(ship), "flags": list(flags_global) + windows["flags"]}
    (pre_start, pre_end), (post_start, post_end) = windows["pre"], windows["post"]
    res["pre"], res["post"] = [str(pre_start), str(pre_end)], [str(post_start), str(post_end)]
    pre_days = (pre_end - pre_start).days + 1
    post_days = (post_end - post_start).days + 1
    if any(pre_start <= d(a) <= post_end for a in ALGO_UPDATES):
        res["flags"].append("algo_update_in_window")

    ps = cache.ps(url, windows["pre"])
    qs_pre = cache.qs(url, windows["pre"])
    ps2 = cache.ps(url, windows["post"])
    qs_post = cache.qs(url, windows["post"])

    # normalise to per-28d rates for unequal windows
    pre_i = ps["i"] * WINDOW / max(pre_days, 1)
    post_i = ps2["i"] * WINDOW / max(post_days, 1)
    b = band(ps["wpos"]) if ps["wpos"] else "21+"
    adj_delta = post_i - pre_i * r_band.get(b, 1.0)
    adj_pct = adj_delta / pre_i if pre_i > 0 else None
    res["page_stats"] = {"pre": ps, "post": ps2, "pre_i_28d": round(pre_i, 1),
                         "post_i_28d": round(post_i, 1), "band": b,
                         "adj_delta_pct": round(adj_pct, 3) if adj_pct is not None else None}

    # query sets
    pq = {q for q, v in qs_pre.items() if v["i"] >= QUERY_MIN_IMPR}
    oq = {q for q, v in qs_post.items() if v["i"] >= QUERY_MIN_IMPR}
    res["queries"] = {"retained": len(pq & oq), "gained": sorted(oq - pq)[:15], "lost": sorted(pq - oq)[:15],
                      "n_gained": len(oq - pq), "n_lost": len(pq - oq)}

    # residuals
    rr_pre, i_pre, _ = residual_rate(qs_pre, curve)
    rr_post, i_post, exp_post = residual_rate(qs_post, curve)
    ctr_testable = False
    if rr_pre is not None and rr_post is not None:
        # binomial floor: expected clicks >= 5 both windows
        exp_pre = sum(expected_ctr(curve, v["wpos"]) * v["i"] for v in qs_pre.values() if v["wpos"] is not None)
        ctr_testable = exp_pre >= 5 and exp_post >= 5
        if ctr_testable:
            lo1, hi1 = wilson(sum(v["c"] for v in qs_pre.values()), i_pre)
            lo2, hi2 = wilson(sum(v["c"] for v in qs_post.values()), i_post)
            res["ctr_test"] = {"pre_ci": [round(lo1, 4), round(hi1, 4)],
                               "post_ci": [round(lo2, 4), round(hi2, 4)],
                               "significant": hi1 < lo2 or hi2 < lo1}
    res["residual"] = {"pre": round(rr_pre, 5) if rr_pre is not None else None,
                       "post": round(rr_post, 5) if rr_post is not None else None,
                       "testable": ctr_testable}

    # weighted position delta
    pos_delta = None
    if ps["wpos"] is not None and ps2["wpos"] is not None:
        pos_delta = ps2["wpos"] - ps["wpos"]
        res["page_stats"]["pos_delta"] = round(pos_delta, 1)

    # ---- verdict (ordered) ----
    if ps["i"] < PRE_MIN_IMPR or post_days < 7:
        verdict = "insufficient-data"
    elif birth and (ship - birth).days < MATURE_DAYS:
        verdict = "immature"
    elif ((post_days < MIN_TRUNC and "post_truncated" in res["flags"])
          or (pre_days < MIN_TRUNC and "pre_truncated" in res["flags"])
          or "control_weak" in res["flags"] or "window_volatile" in res["flags"]):
        verdict = "confounded"
    elif (adj_pct is not None and adj_pct <= -IMPR_DELTA and ps["i"] >= PRE_POS_IMPR) or \
         (pos_delta is not None and pos_delta > POS_LOSS and ps["i"] >= PRE_POS_IMPR):
        verdict = "clean-loss"
    elif (adj_pct is not None and adj_pct >= IMPR_DELTA
          and (pos_delta is None or pos_delta <= POS_LOSS)
          and ps2["c"] >= ps["c"] * min(post_days, pre_days) / max(pre_days, 1) * 0.5):
        verdict = "clean-win"
    else:
        verdict = "neutral"
    res["verdict"] = verdict
    return res


def main() -> None:
    check_freshness(SITE)
    frozen = load_frozen()
    ledger = json.loads(LEDGER.read_text(encoding="utf-8"))
    today = date.today()
    data_edge = today - timedelta(days=GSC_LAG_DAYS)
    curve = build_expected_ctr_curve()

    # ---------- cohorts for the global decomposition ----------
    POST = (data_edge - timedelta(days=WINDOW - 1), data_edge)
    PRE = (POST[0] - timedelta(days=WINDOW), POST[0] - timedelta(days=1))

    all_pages = list(ledger.keys())
    pre_stats = page_window_stats(all_pages, *PRE)
    post_stats = page_window_stats(all_pages, *POST)

    cohort: dict[str, str] = {}
    for u, entry in ledger.items():
        birth = d(entry["birth_date"]) if entry["birth_date"] else None
        ivs = [d(iv["date"]) for iv in entry["interventions"]]
        if (birth and birth > PRE[0]) or (u not in pre_stats and birth and (today - birth).days < 90):
            cohort[u] = "NEW"
        elif any(PRE[0] <= x <= POST[1] for x in ivs):
            cohort[u] = "CHANGED"
        elif u in pre_stats and birth and (PRE[0] - birth).days >= 45:
            # ponytail: 45d not the 90d spec bar — the whole corpus is <5 months old,
            # 90d leaves zero controls. NEW pages are still excluded and drift uses
            # the per-band median, which absorbs most maturation skew.
            cohort[u] = "CONTROL"
        else:
            cohort[u] = "OTHER"

    sums = defaultdict(lambda: {"pre": 0, "post": 0})
    for u in ledger:
        sums[cohort[u]]["pre"] += pre_stats.get(u, {}).get("i", 0)
        sums[cohort[u]]["post"] += post_stats.get(u, {}).get("i", 0)

    # control drift, per band + robust
    ctrl = [u for u, c in cohort.items() if c == "CONTROL"]
    global_flags: list[str] = []
    n_ctrl_impr = sums["CONTROL"]["pre"]
    if len(ctrl) < CONTROL_MIN_PAGES or n_ctrl_impr < CONTROL_MIN_IMPR:
        global_flags.append("control_weak")
    r_band: dict[str, float] = {}
    logs_all = []
    by_band = defaultdict(list)
    for u in ctrl:
        pi = pre_stats.get(u, {}).get("i", 0)
        po = post_stats.get(u, {}).get("i", 0)
        wp = pre_stats.get(u, {}).get("wpos")
        if pi >= 30 and po > 0:
            lr = math.log(po / pi)
            logs_all.append(lr)
            if wp:
                by_band[band(wp)].append(lr)
    r_all = math.exp(sorted(logs_all)[len(logs_all) // 2]) if logs_all else 1.0
    for b, ls in by_band.items():
        r_band[b] = math.exp(sorted(ls)[len(ls) // 2]) if len(ls) >= 5 else r_all
    for b in ["1-10", "11-20", "21+"]:
        r_band.setdefault(b, r_all)
    if abs(math.log(r_all)) > VOLATILE_LOG_R:
        global_flags.append("window_volatile")

    decomposition = {
        "windows": {"pre": [str(PRE[0]), str(PRE[1])], "post": [str(POST[0]), str(POST[1])]},
        "cohort_counts": {k: sum(1 for c in cohort.values() if c == k) for k in ["NEW", "CHANGED", "CONTROL", "OTHER"]},
        "impressions": {k: dict(v) for k, v in sums.items()},
        "control_drift": {"r_overall": round(r_all, 3), "r_band": {k: round(v, 3) for k, v in r_band.items()},
                          "n_control_pages": len(ctrl), "control_pre_impr": n_ctrl_impr},
        "flags": global_flags,
    }

    # ---------- per meta-intervention analysis ----------
    # Consecutive meta edits <=14d apart are one iterative pass (waves shipped
    # days apart); only the burst as a whole is measurable. Ship date = last edit.
    jobs = []  # (url, iv, windows)
    for u, entry in ledger.items():
        metas = sorted((iv for iv in entry["interventions"] if iv["type"] in META_TYPES),
                       key=lambda iv: iv["date"])
        if not metas:
            continue
        bursts: list[list[dict]] = []
        for iv in metas:
            if bursts and (d(iv["date"]) - d(bursts[-1][-1]["date"])).days <= MIN_TRUNC:
                bursts[-1].append(iv)
            else:
                bursts.append([iv])
        # non-meta interventions (and other bursts) still truncate windows
        for burst in bursts:
            ship = d(burst[-1]["date"])
            burst_dates = {d(iv["date"]) for iv in burst}
            other_dates = sorted({d(iv["date"]) for iv in entry["interventions"]} - burst_dates | {ship})
            iv = dict(burst[-1])
            if len(burst) > 1:
                iv["burst"] = [f"{b['date']}:{b['type']}" for b in burst]
                iv["note"] = f"burst of {len(burst)} edits {burst[0]['date']}..{burst[-1]['date']}"
            jobs.append((u, iv, compute_windows(u, ship, other_dates, today)))
    cache = StatsCache()
    cache.prefetch([(u, w["pre"]) for u, _, w in jobs] + [(u, w["post"]) for u, _, w in jobs])
    print(f"[prefetch] {len(jobs)} interventions across "
          f"{len({w['pre'] for _, _, w in jobs} | {w['post'] for _, _, w in jobs})} distinct windows")

    results = []
    for u, iv, w in jobs:
        entry = ledger[u]
        birth = d(entry["birth_date"]) if entry["birth_date"] else None
        if True:
            r = analyse_intervention(u, d(iv["date"]), w, cache, birth, curve, r_band, global_flags)
            r["type"], r["source"], r["ref"] = iv["type"], iv["source"], iv.get("ref")
            # routing
            wpos_now = post_stats.get(u, {}).get("wpos")
            if canon(u) in frozen:
                r["action"] = "hold-frozen"
            elif wpos_now is not None and wpos_now > DEEP_POS and r["verdict"] in ("neutral", "clean-win", "immature"):
                r["action"] = "needs-position-not-meta"
            elif r["verdict"] == "clean-loss" and iv["type"] == "title_meta_rewrite":
                r["action"] = "revert-candidate"
            elif r["verdict"] == "clean-loss":
                r["action"] = "revert-candidate"
            elif r["verdict"] == "clean-win":
                r["action"] = "hold-winner"
            else:
                r["action"] = "hold"
            results.append(r)

    # ---------- placebo self-check ----------
    placebo_ship = d("2026-05-21")  # median wave date; controls had no intervention
    placebo = []
    pw = compute_windows("", placebo_ship, [placebo_ship], today)
    cache.prefetch([(u, pw["pre"]) for u in ctrl[:40]] + [(u, pw["post"]) for u in ctrl[:40]])
    for u in ctrl[:40]:
        pr = analyse_intervention(u, placebo_ship, pw, cache,
                                  d(ledger[u]["birth_date"]) if ledger[u]["birth_date"] else None,
                                  curve, r_band, global_flags)
        placebo.append(pr["verdict"])
    placebo_summary = {v: placebo.count(v) for v in set(placebo)}

    # ---------- page-level collapse detector (attribution-agnostic) ----------
    # Cascading edits make per-intervention windows unattributable, but a page that
    # lost most of its traffic must surface regardless. Peak rolling-28d vs last-28d.
    collapse_rows = _sql(f"""
        WITH daily AS (
            SELECT page_url, date, SUM(impressions) i
            FROM gsc_page_performance WHERE niche='{SITE}' GROUP BY 1, 2
        ), rolled AS (
            SELECT page_url, date,
                   SUM(i) OVER (PARTITION BY page_url ORDER BY date
                                RANGE BETWEEN INTERVAL '27 days' PRECEDING AND CURRENT ROW) r28
            FROM daily
        ), cur AS (
            SELECT page_url, SUM(i) c FROM daily
            WHERE date > (SELECT MAX(date) FROM daily) - INTERVAL '28 days'
            GROUP BY page_url
        )
        SELECT r.page_url, MAX(r.r28) peak, COALESCE(MAX(c.c), 0) cur
        FROM rolled r LEFT JOIN cur c ON c.page_url = r.page_url
        GROUP BY r.page_url HAVING MAX(r.r28) >= 100""")
    collapsed = []
    for r in collapse_rows:
        peak, cur = int(r["peak"] or 0), int(r["cur"] or 0)
        if cur < peak * 0.4:
            u = canon(r["page_url"])
            entry = ledger.get(u, {"interventions": []})
            collapsed.append({
                "url": u, "peak_28d": peak, "current_28d": cur,
                "drop_pct": round(1 - cur / peak, 2),
                "interventions": [f"{iv['date']}:{iv['type']}" for iv in entry["interventions"]][-6:],
                "frozen": u in frozen,
            })
    collapsed.sort(key=lambda x: -x["peak_28d"])

    out = {"generated": str(today), "decomposition": decomposition,
           "interventions": results, "placebo": placebo_summary,
           "collapsed_pages": collapsed}
    OUT.write_text(json.dumps(out, indent=1), encoding="utf-8")

    # ---------- console summary ----------
    print(f"\n=== Site decomposition {PRE[0]}..{POST[1]} ===")
    for k in ["NEW", "CHANGED", "CONTROL", "OTHER"]:
        s = sums[k]
        print(f"  {k:8} pages={decomposition['cohort_counts'][k]:4} pre={s['pre']:7} post={s['post']:7}")
    print(f"  control drift r={r_all:.3f} bands={ {k: round(v,2) for k,v in r_band.items()} } flags={global_flags}")
    vc = defaultdict(int)
    ac = defaultdict(int)
    for r in results:
        vc[r["verdict"]] += 1
        ac[r["action"]] += 1
    print(f"\n=== {len(results)} meta interventions analysed ===")
    print("  verdicts:", dict(vc))
    print("  actions :", dict(ac))
    print("  placebo (should be ~neutral/insufficient):", placebo_summary)
    print(f"\n=== {len(collapsed)} collapsed pages (peak>=100/28d, now <40% of peak) ===")
    for cp in collapsed[:15]:
        fr = " [FROZEN]" if cp["frozen"] else ""
        print(f"  {cp['peak_28d']:5} -> {cp['current_28d']:5} ({cp['drop_pct']:.0%}){fr} {cp['url'].split('.uk')[-1][:70]}")
    print(f"\n-> {OUT}")


if __name__ == "__main__":
    main()
