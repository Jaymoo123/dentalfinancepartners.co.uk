"""
Stage 2: tripwire evaluation over cached stages. Read-only, no network.

hard_fails -> verdict FAILED; soft_flags only -> DEGRADED; clean -> OK.
"""
from __future__ import annotations

from optimisation_engine.niche_screener.common import cache_get


def evaluate(run_id: str, niche: str) -> dict:
    universe = cache_get(run_id, niche, "universe") or {}
    volumes = cache_get(run_id, niche, "volumes") or {}
    serps = cache_get(run_id, niche, "serps") or {}
    classify = cache_get(run_id, niche, "classify") or {}
    score = cache_get(run_id, niche, "score") or {}

    hard_fails: list[str] = []
    soft_flags: list[str] = []

    # A thin SERP on an obscure long-tail is a winnability signal, not a fetch
    # failure. Hard-fail only when thinness is systemic (fetch-layer problem).
    fetched_serps = [(q, s) for q, s in serps.get("serps", {}).items() if s.get("fetched")]
    thin = [q for q, s in fetched_serps if len(s.get("organic", [])) < 8]
    if fetched_serps and len(thin) / len(fetched_serps) > 0.20:
        hard_fails.append(
            f"{len(thin)}/{len(fetched_serps)} fetched SERPs with <8 organic results (e.g. {thin[0]!r})")
    elif thin:
        soft_flags.append(f"{len(thin)} thin SERPs (<8 organic), within tolerance")

    requested = serps.get("requested", 0)
    fetched = serps.get("fetched_count", 0)
    if requested and fetched / requested < 0.75:
        hard_fails.append(f"fetched/requested {fetched}/{requested} < 0.75")

    coverage = volumes.get("coverage")
    if coverage is not None and coverage < 0.30:
        hard_fails.append(f"volumes coverage {coverage:.2f} < 0.30")

    unknown_rate = classify.get("unknown_rate", 0.0)
    if unknown_rate > 0.05:
        soft_flags.append(f"classifier unknown_rate {unknown_rate:.2f} > 0.05")
    llm_share = classify.get("llm_share", 0.0)
    if llm_share > 0.4:
        soft_flags.append(f"llm_share {llm_share:.2f} > 0.4")
    ac_failures = universe.get("autocomplete_failures", 0)
    if ac_failures > 5:
        soft_flags.append(f"autocomplete_failures {ac_failures} > 5")
    for name, comp in (score.get("components") or {}).items():
        if comp.get("is_null"):
            soft_flags.append(f"component {name} is NULL: {comp.get('note', '')}")

    verdict = "FAILED" if hard_fails else ("DEGRADED" if soft_flags else "OK")
    return {"hard_fails": hard_fails, "soft_flags": soft_flags, "verdict": verdict}


if __name__ == "__main__":
    import shutil
    from optimisation_engine.niche_screener.common import CACHE_DIR, cache_put

    rid, niche = "run_selfcheck_tripwires", "test-niche"
    full = [{"position": i} for i in range(10)]
    cache_put(rid, niche, "universe", {"queries": [], "autocomplete_failures": 0})
    cache_put(rid, niche, "volumes", {"volumes": {}, "coverage": 0.8})
    cache_put(rid, niche, "serps", {"serps": {"q1": {"organic": full, "fetched": True, "intent": "DIY"}},
                                    "fetched_count": 1, "requested": 1, "aio_share_diy": 0.0})
    cache_put(rid, niche, "classify", {"classes": {}, "unknown_rate": 0.0, "llm_share": 0.0})
    cache_put(rid, niche, "score", {"components": {}})
    res = evaluate(rid, niche)
    assert res == {"hard_fails": [], "soft_flags": [], "verdict": "OK"}, res

    cache_put(rid, niche, "score", {"components": {"x": {"is_null": True, "note": "n"}}})
    cache_put(rid, niche, "classify", {"classes": {}, "unknown_rate": 0.1, "llm_share": 0.5})
    assert evaluate(rid, niche)["verdict"] == "DEGRADED"
    assert len(evaluate(rid, niche)["soft_flags"]) == 3

    cache_put(rid, niche, "serps", {"serps": {"q1": {"organic": full[:5], "fetched": True, "intent": "DIY"},
                                              "q2": {"organic": [], "fetched": False, "intent": "DIY"}},
                                    "fetched_count": 1, "requested": 2, "aio_share_diy": 0.0})
    cache_put(rid, niche, "volumes", {"volumes": {}, "coverage": 0.2})
    res = evaluate(rid, niche)
    assert res["verdict"] == "FAILED" and len(res["hard_fails"]) == 3, res

    shutil.rmtree(CACHE_DIR / rid, ignore_errors=True)
    print("tripwires.py self-check OK")
