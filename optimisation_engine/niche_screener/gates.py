"""
Stage 1c: hard gates G0-G4 for a niche spec.

G0 regulatory (spec field, no API), G1 buyer market (Serper + optional
Companies House), G2 DIY demand and G3 head-lock and G4 churn (volumes cache).
Any PARK verdict parks the niche overall; missing volumes cache raises rather
than inventing a PASS. Cached as cache/<run_id>/<niche>/gates.json.
"""
from __future__ import annotations

import base64
import os
import re
import statistics

import httpx

from optimisation_engine.niche_screener import common

# Calibrate so property clears x3 and agency fails - calibration run pending.
G2_MIN = 3000
G2_VOLUME_CAP = 2000  # per-query cap so one head term cannot carry the gate
G3_DIY_SHARE_MIN = 0.25
G4_SPIKE_RATIO = 3.0
G4_MIN_SPIKING = 3

_LEAD_RE = re.compile(r"\b(leads?|per lead|lead generation)\b", re.I)
# ponytail: naive directory blocklist, extend when G1 false-positives appear
_DIRECTORY_DOMAINS = {
    "yell.com", "checkatrade.com", "trustpilot.com", "bark.com", "reddit.com",
    "quora.com", "fiverr.com", "upwork.com", "clutch.co", "linkedin.com",
}
CH_SEARCH_URL = "https://api.company-information.service.gov.uk/advanced-search/companies"


def check_buyer_market(spec: dict, run_id: str) -> dict:
    """G1: is anyone demonstrably buying/selling leads in this vertical?"""
    from optimisation_engine.niche_screener.serp_fetch import fetch_serp

    # Documented ground truth beats SERP inference (e.g. property: DJH pays
    # 85 GBP/lead under an executed agreement). Must cite its evidence.
    override = spec.get("buyer_market_override")
    if override:
        return {"verdict": "PASS", "evidence": {"override": override}}

    vertical = spec.get("vertical", spec["name"].replace("-", " "))
    queries = [
        f"buy {vertical} leads",
        f'"{vertical} leads" price',
        f"{vertical} pay per lead",
    ]
    sellers: dict[str, dict] = {}
    for q in queries:
        for item in fetch_serp(q, num=10, site_key=None)["organic"]:
            dom = item.get("domain") or common.domain_of(item.get("link") or "")
            if not dom or dom in _DIRECTORY_DOMAINS:
                continue
            text = f"{item.get('title') or ''} {item.get('snippet') or ''}"
            if _LEAD_RE.search(text):
                sellers.setdefault(dom, {"query": q, "title": item.get("title"), "link": item.get("link")})

    evidence: dict = {"serp_seller_domains": sorted(sellers), "serp_examples": list(sellers.values())[:5]}
    verdict = "PASS" if len(sellers) >= 2 else "PARK"

    # Optional Companies House branch: buyer entity depth.
    ch_key = os.environ.get("COMPANIES_HOUSE_API_KEY")
    sic_codes = spec.get("buyer_sic_codes") or []
    if ch_key and sic_codes:
        auth = base64.b64encode(f"{ch_key}:".encode()).decode()
        total = 0
        try:
            for sic in sic_codes:
                r = httpx.get(
                    CH_SEARCH_URL,
                    params={"sic_codes": sic, "company_status": "active", "size": 1},
                    headers={"Authorization": f"Basic {auth}"},
                    timeout=15.0,
                )
                r.raise_for_status()
                total += int(r.json().get("hits") or 0)
            evidence["companies_house_active_hits"] = total
            if total > 500:
                verdict = "PASS"
        except Exception as exc:
            evidence["companies_house_error"] = str(exc)

    return {"verdict": verdict, "evidence": evidence}


def g2_diy_demand(volumes: dict[str, dict], intents: dict[str, str]) -> dict:
    weighted = sum(
        min(v["search_volume"], G2_VOLUME_CAP)
        for q, v in volumes.items()
        if intents.get(q) == "DIY" and (v.get("search_volume") or 0) >= 10
    )
    return {
        "verdict": "PASS" if weighted >= G2_MIN else "FAIL",
        "evidence": {"volume_weighted_diy": weighted, "threshold": G2_MIN},
    }


def g3_head_lock(volumes: dict[str, dict], intents: dict[str, str]) -> dict:
    deleg = sum(v.get("search_volume") or 0 for q, v in volumes.items() if intents.get(q) == "DELEGATION")
    total = sum(v.get("search_volume") or 0 for v in volumes.values())
    diy = sum(v.get("search_volume") or 0 for q, v in volumes.items() if intents.get(q) == "DIY")
    share = diy / total if total else 0.0
    ok = deleg > 0 and share >= G3_DIY_SHARE_MIN
    return {
        "verdict": "PASS" if ok else "FAIL",
        "evidence": {"delegation_volume": deleg, "diy_share": round(share, 3), "total_volume": total},
    }


def is_spiking(monthly: list[dict]) -> bool:
    vols = [m.get("search_volume") for m in monthly if m.get("search_volume") is not None]
    if len(vols) < 12:
        return False
    med = statistics.median(vols)
    return med > 0 and max(vols) >= G4_SPIKE_RATIO * med


def g4_churn(volumes: dict[str, dict], spec: dict) -> dict:
    spiking = [q for q, v in volumes.items() if is_spiking(v.get("monthly_searches") or [])]
    event = spec.get("event_hypothesis") or {}
    has_event = bool(event.get("date"))
    ok = len(spiking) >= G4_MIN_SPIKING or has_event
    return {
        "verdict": "PASS" if ok else "FAIL",
        "evidence": {"spiking_queries": spiking[:20], "spiking_count": len(spiking),
                     "event_hypothesis_date": event.get("date")},
    }


def run_gates(spec: dict, run_id: str, *, site_key: str | None = None) -> dict:
    # ponytail: site_key None until sites row exists (migration 20260724000001, owner-applied)
    gates: dict[str, dict] = {}

    reg = spec["regulatory_gate"]
    g0_verdict = "FAIL" if reg == "banned" else ("PARK" if reg == "unknown" else "PASS")
    gates["G0"] = {"verdict": g0_verdict, "evidence": {"regulatory_gate": reg}}

    if g0_verdict == "FAIL":
        result = {**gates, "overall": "FAIL", "failed_gates": ["G0"]}
        common.cache_put(run_id, spec["name"], "gates", result)
        return result

    gates["G1"] = check_buyer_market(spec, run_id)

    vols_cache = common.cache_get(run_id, spec["name"], "volumes")
    universe = common.cache_get(run_id, spec["name"], "universe")
    if vols_cache is None or universe is None:
        raise RuntimeError(f"volumes/universe cache missing for run {run_id} / {spec['name']}; cannot gate")
    volumes = vols_cache["volumes"]
    intents = {r["q"]: r["intent"] for r in universe["queries"]}

    gates["G2"] = g2_diy_demand(volumes, intents)
    gates["G3"] = g3_head_lock(volumes, intents)
    gates["G4"] = g4_churn(volumes, spec)

    failed = [g for g, r in gates.items() if r["verdict"] == "FAIL"]
    parked = [g for g, r in gates.items() if r["verdict"] == "PARK"]
    overall = "FAIL" if failed else ("PARK" if parked else "PASS")
    result = {**gates, "overall": overall, "failed_gates": failed}
    common.cache_put(run_id, spec["name"], "gates", result)
    return result


if __name__ == "__main__":
    # Pure-logic self-checks, no network.
    intents = {"how much probate": "DIY", "big diy": "DIY", "tiny diy": "DIY",
               "probate solicitor": "DELEGATION"}
    vols = {
        "how much probate": {"search_volume": 1500, "monthly_searches": []},
        "big diy": {"search_volume": 5000, "monthly_searches": []},  # capped at 2000
        "tiny diy": {"search_volume": 5, "monthly_searches": []},    # below 10, excluded
        "probate solicitor": {"search_volume": 900, "monthly_searches": []},
    }
    g2 = g2_diy_demand(vols, intents)
    assert g2["evidence"]["volume_weighted_diy"] == 3500 and g2["verdict"] == "PASS"
    g2b = g2_diy_demand({"a": {"search_volume": 100}}, {"a": "DIY"})
    assert g2b["verdict"] == "FAIL"

    g3 = g3_head_lock(vols, intents)
    assert g3["verdict"] == "PASS"  # deleg 900 > 0, diy share 6505/7405 >= 0.25
    g3b = g3_head_lock({"a": {"search_volume": 100}}, {"a": "DIY"})
    assert g3b["verdict"] == "FAIL"  # no delegation volume

    flat = [{"year": 2025, "month": m, "search_volume": 100} for m in range(1, 13)]
    spike = flat[:-1] + [{"year": 2025, "month": 12, "search_volume": 400}]
    assert not is_spiking(flat)
    assert is_spiking(spike)
    assert not is_spiking(spike[:6])  # <12 months = no verdict
    g4 = g4_churn({"q1": {"monthly_searches": spike}}, {"event_hypothesis": {"what": "x", "date": "2026-04-06"}})
    assert g4["verdict"] == "PASS"  # event date rescues low spike count
    g4b = g4_churn({"q1": {"monthly_searches": flat}}, {})
    assert g4b["verdict"] == "FAIL"
    print("gates.py self-check OK")
