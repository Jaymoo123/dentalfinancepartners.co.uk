"""
Stage 2: pure scoring over cached stages. ZERO network calls.

Each component reports {"raw","normalised","weighted","is_null","inputs_n","note"}.
NULL discipline per common.py: totals are a [min, max] range, never a midpoint.
"""
from __future__ import annotations

import math
import re
import statistics

from optimisation_engine.niche_screener.common import (
    URGENCY_PATTERNS,
    WEIGHTS,
    cache_get,
    cache_put,
)

CALC_PATTERNS = re.compile(r"\b(calculator|checker|how much|estimate|work out)\b")


def _clip(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))


def _component(raw, normalised, weight, *, is_null=False, inputs_n=0, note=""):
    return {
        "raw": raw,
        "normalised": None if is_null else round(normalised, 4),
        "weighted": None if is_null else round(normalised * weight, 4),
        "is_null": is_null,
        "inputs_n": inputs_n,
        "note": note,
    }


def _null(weight, note, inputs_n=0):
    return _component(None, 0.0, weight, is_null=True, inputs_n=inputs_n, note=note)


def score_niche(spec: dict, run_id: str) -> dict:
    niche = spec["name"]
    universe = cache_get(run_id, niche, "universe") or {"queries": []}
    volumes = cache_get(run_id, niche, "volumes") or {"volumes": {}, "coverage": 0.0}
    serps = cache_get(run_id, niche, "serps") or {"serps": {}, "aio_share_diy": None}
    classify = cache_get(run_id, niche, "classify") or {"classes": {}, "llm_share": 0.0}
    gates = cache_get(run_id, niche, "gates") or {}

    vols = volumes.get("volumes", {})
    coverage = float(volumes.get("coverage", 0.0))
    queries = universe.get("queries", [])
    diy_queries = [e["q"] for e in queries if e.get("intent") == "DIY"]
    all_queries = [e["q"] for e in queries]

    def vol_of(q):
        v = (vols.get(q) or {}).get("search_volume")
        return int(v) if v else 0

    components = {}

    # --- diy_pain_demand -----------------------------------------------------
    w = WEIGHTS["diy_pain_demand"]
    if coverage < 0.30:
        components["diy_pain_demand"] = _null(w, f"volumes coverage {coverage:.2f} < 0.30")
    else:
        scored = [(q, vol_of(q)) for q in diy_queries if vol_of(q) >= 10]
        vw = sum(min(v, 2000) for _, v in scored)
        norm = _clip(math.log10(vw + 1) / 5)
        total_diy_vol = sum(v for _, v in scored)
        urgency_vol = sum(v for q, v in scored if URGENCY_PATTERNS.search(q.lower()))
        note = f"vw={vw}"
        if total_diy_vol and urgency_vol / total_diy_vol >= 0.10:
            norm = _clip(norm + 0.1)
            note += f"; urgency bonus ({urgency_vol}/{total_diy_vol})"
        components["diy_pain_demand"] = _component(vw, norm, w, inputs_n=len(scored), note=note)

    # --- longtail_winnability ------------------------------------------------
    w = WEIGHTS["longtail_winnability"]
    classes = classify.get("classes", {})
    llm_share = float(classify.get("llm_share", 0.0))
    fetched_diy = [
        s for s in serps.get("serps", {}).values()
        if s.get("intent") == "DIY" and s.get("fetched")
    ]
    if len(fetched_diy) < 25:
        components["longtail_winnability"] = _null(
            w, f"only {len(fetched_diy)} fetched DIY SERPs < 25", inputs_n=len(fetched_diy))
    elif llm_share > 0.4:
        components["longtail_winnability"] = _null(
            w, f"llm_share {llm_share:.2f} > 0.4, no override", inputs_n=len(fetched_diy))
    else:
        thinness_vals, weak_vals = [], []
        for s in fetched_diy:
            top10 = s.get("organic", [])[:10]
            if not top10:
                continue
            cls = [classes.get(o["domain"], {}).get("class", "UNKNOWN") for o in top10]
            thinness_vals.append(1 - cls.count("SPECIALIST") / 10)
            weak_vals.append(sum(1 for c in cls if c in ("UGC", "INFO")) / len(cls))
        mean_thin = statistics.mean(thinness_vals)
        mean_weak = statistics.mean(weak_vals)
        norm = _clip(0.7 * mean_thin + 0.3 * mean_weak)
        n = len(thinness_vals)
        std = statistics.stdev(thinness_vals) if n > 1 else 0.0
        ci95 = 1.96 * std / math.sqrt(n) if n else 0.0
        components["longtail_winnability"] = _component(
            {"mean_thinness": round(mean_thin, 4), "mean_weak_share": round(mean_weak, 4),
             "thinness_ci95": round(ci95, 4)},
            norm, w, inputs_n=n,
            note=f"thinness {mean_thin:.2f} +/- {ci95:.2f} (95% CI)")

    # --- rule_churn ----------------------------------------------------------
    w = WEIGHTS["rule_churn"]
    monthly = {q: (vols.get(q) or {}).get("monthly_searches") or [] for q in all_queries}
    with_monthly = {q: m for q, m in monthly.items() if len(m) >= 12}
    if len(with_monthly) < 20:
        components["rule_churn"] = _null(
            w, f"only {len(with_monthly)} queries with >=12 monthly points < 20",
            inputs_n=len(with_monthly))
    else:
        spikes = 0
        for m in with_monthly.values():
            vals = [x.get("search_volume", 0) if isinstance(x, dict) else x for x in m]
            med = statistics.median(vals)
            if med > 0 and max(vals) >= 3 * med:
                spikes += 1
        norm = min(spikes / 5, 1.0)
        note = f"spike_count={spikes}"
        if (spec.get("event_hypothesis") or {}).get("date"):
            norm = min(norm + 0.3, 1.0)
            note += "; event date bonus"
        components["rule_churn"] = _component(spikes, norm, w, inputs_n=len(with_monthly), note=note)

    # --- calculator_demand ---------------------------------------------------
    w = WEIGHTS["calculator_demand"]
    if coverage < 0.30:
        components["calculator_demand"] = _null(w, f"volumes coverage {coverage:.2f} < 0.30")
    else:
        calc_qs = [q for q in all_queries if CALC_PATTERNS.search(q.lower())]
        v = sum(vol_of(q) for q in calc_qs)
        components["calculator_demand"] = _component(
            v, _clip(math.log10(v + 1) / 4), w, inputs_n=len(calc_qs), note=f"calc vol={v}")

    # --- buyer_market_depth --------------------------------------------------
    w = WEIGHTS["buyer_market_depth"]
    g1 = gates.get("G1") or {}
    g1_status = str(g1.get("verdict", g1.get("status", ""))).upper()
    ev = g1.get("evidence") or {}
    if g1_status in ("PARK", "PARKED"):
        components["buyer_market_depth"] = _null(w, "G1 PARKED")
    elif ev.get("override"):
        # Documented buyer relationship (e.g. executed lead-purchase deal).
        # Depth 0.6: proven but single/dual buyer, not a broker marketplace.
        components["buyer_market_depth"] = _component(
            {"override": ev["override"]}, 0.6, w, inputs_n=1, note="documented buyer override")
    else:
        brokers = len(ev.get("serp_seller_domains") or []) or ev.get("broker_count", 0) or 0
        ch_firms = ev.get("ch_firm_count", g1.get("ch_firm_count")) or 0
        commercial = [
            s for s in serps.get("serps", {}).values()
            if s.get("intent") == "DELEGATION" and s.get("fetched")
        ]
        ads = [s.get("ads_count", 0) for s in commercial]
        mean_ads = statistics.mean(ads) if ads else 0.0
        norm = min(brokers * 0.15 + mean_ads * 0.1 + (0.3 if ch_firms > 500 else 0.0), 1.0)
        components["buyer_market_depth"] = _component(
            {"brokers": brokers, "mean_ads": round(mean_ads, 2), "ch_firms": ch_firms},
            norm, w, inputs_n=len(commercial),
            note=f"brokers={brokers}, mean_ads={mean_ads:.1f}, ch_firms={ch_firms}")

    # --- aio_exposure (penalty) ----------------------------------------------
    share = serps.get("aio_share_diy")
    if share is None:
        components["aio_exposure"] = _null(-10, "no serps stage / aio share unknown")
    else:
        pen_norm = _clip((share - 0.2) / 0.6)
        comp = _component(share, pen_norm, 1, note=f"aio share {share:.2f}")
        comp["weighted"] = round(-10 * pen_norm, 4)
        components["aio_exposure"] = comp

    # --- new_domain_viability ------------------------------------------------
    components["new_domain_viability"] = _null(
        WEIGHTS["new_domain_viability"], "needs bulk_ranks/whois - not yet wired")

    # --- totals --------------------------------------------------------------
    total = sum(c["weighted"] for c in components.values() if not c["is_null"])
    total_min = total
    total_max = total
    for name, c in components.items():
        if not c["is_null"]:
            continue
        if name == "aio_exposure":
            total_min += -10  # unknown AIO could be fully saturated
        else:
            total_max += WEIGHTS[name]

    out = {
        "components": components,
        "total": round(total, 2),
        "total_min": round(total_min, 2),
        "total_max": round(total_max, 2),
        "complete": all(not c["is_null"] for c in components.values()),
    }
    unknown_rate = float(classify.get("unknown_rate", 0.0))
    if unknown_rate > 0.2:
        print(f"[score] PROVISIONAL (unknown_rate={unknown_rate:.2f}): total={out['total']} is not league-comparable")
    cache_put(run_id, niche, "score", out)
    return out


if __name__ == "__main__":
    import shutil
    from optimisation_engine.niche_screener.common import CACHE_DIR, cache_put as put

    rid, niche = "run_selfcheck_score", "test-niche"
    spec = {"name": niche, "provider_terms": ["solicitor"], "pain_seeds": ["probate cost"],
            "regulatory_gate": "none", "event_hypothesis": {"what": "fee change", "date": "2026-10-01"}}

    diy_qs = [f"probate penalty question {i}" for i in range(30)]
    queries = [{"q": q, "intent": "DIY", "source": "seed"} for q in diy_qs]
    queries += [{"q": "probate cost calculator", "intent": "DIY", "source": "seed"}]
    queries += [{"q": f"probate solicitor {i}", "intent": "DELEGATION", "source": "seed"} for i in range(5)]
    put(rid, niche, "universe", {"queries": queries})

    monthly = [{"search_volume": 100}] * 11 + [{"search_volume": 400}]
    vols = {q: {"search_volume": 200, "monthly_searches": monthly} for q in diy_qs}
    vols["probate cost calculator"] = {"search_volume": 500, "monthly_searches": monthly}
    put(rid, niche, "volumes", {"volumes": vols, "coverage": 0.8})

    organic = [{"position": i + 1, "domain": d, "title": "", "link": "", "snippet": ""}
               for i, d in enumerate(["spec1.co.uk", "gen1.co.uk", "reddit.com"] + [f"g{i}.co.uk" for i in range(7)])]
    serp_entries = {q: {"organic": organic, "has_aio": (i < 15), "fetched": True, "intent": "DIY"}
                    for i, q in enumerate(diy_qs)}
    for i in range(5):
        serp_entries[f"probate solicitor {i}"] = {
            "organic": organic, "has_aio": False, "fetched": True, "intent": "DELEGATION", "ads_count": 3}
    put(rid, niche, "serps", {"serps": serp_entries, "fetched_count": 35, "requested": 35, "aio_share_diy": 0.5})

    classes = {"spec1.co.uk": {"class": "SPECIALIST", "tier": 2, "confidence": "high"},
               "gen1.co.uk": {"class": "GENERALIST", "tier": 2, "confidence": "high"},
               "reddit.com": {"class": "UGC", "tier": 1, "confidence": "high"}}
    for i in range(7):
        classes[f"g{i}.co.uk"] = {"class": "GENERALIST", "tier": 3, "confidence": "med"}
    put(rid, niche, "classify", {"classes": classes, "unknown_rate": 0.0, "llm_share": 0.0})

    put(rid, niche, "gates", {"G0": "PASS", "G1": {"status": "PASS", "evidence": {"broker_count": 3, "ch_firm_count": 600}},
                              "G2": "PASS", "G3": "PASS", "G4": "PASS", "overall": "PASS"})

    res = score_niche(spec, rid)
    c = res["components"]
    d = c["diy_pain_demand"]
    assert not d["is_null"] and "urgency bonus" in d["note"], d  # penalty queries dominate volume
    lw = c["longtail_winnability"]
    assert not lw["is_null"] and abs(lw["raw"]["mean_thinness"] - 0.9) < 1e-6
    assert abs(lw["raw"]["mean_weak_share"] - 0.1) < 1e-6
    assert abs(lw["normalised"] - (0.7 * 0.9 + 0.3 * 0.1)) < 1e-6
    rc = c["rule_churn"]
    assert not rc["is_null"] and rc["raw"] == 31 and rc["normalised"] == 1.0  # spikes capped + event bonus
    cd = c["calculator_demand"]
    assert cd["raw"] == 500
    bm = c["buyer_market_depth"]
    assert not bm["is_null"] and abs(bm["normalised"] - 1.0) < 1e-6  # 0.45+0.3+0.3 capped
    ae = c["aio_exposure"]
    assert abs(ae["weighted"] - (-5.0)) < 1e-6  # share 0.5 -> (0.5-0.2)/0.6 = 0.5 -> -5
    nd = c["new_domain_viability"]
    assert nd["is_null"]
    assert not res["complete"]
    assert res["total_min"] == res["total"] and res["total_max"] == round(res["total"] + 5, 2)

    # NULL paths: wipe volumes coverage
    put(rid, niche, "volumes", {"volumes": {}, "coverage": 0.1})
    res2 = score_niche(spec, rid)
    assert res2["components"]["diy_pain_demand"]["is_null"]
    assert res2["components"]["calculator_demand"]["is_null"]
    assert res2["components"]["rule_churn"]["is_null"]

    shutil.rmtree(CACHE_DIR / rid, ignore_errors=True)
    print("score.py self-check OK")
