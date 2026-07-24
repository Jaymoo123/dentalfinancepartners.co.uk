"""
Stage 2: per-domain classification for SERP winnability analysis.

Tier order (first hit wins):
  1. static_lists in classify_data.json (exact match, or "*.suffix" endswith)
  2. hand_labels + overrides (merged from expansion_research CLASS_MAP)
  3. heuristics over title+snippet context, relative to the spec's terms
  4. UNKNOWN (LLM fallback is a stub; pre-seeded cache/llm_domains.json honoured)

SPECIALIST is always judged relative to spec provider/niche terms, never
hardcoded to accounting.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

from optimisation_engine.niche_screener.common import PKG_DIR, CACHE_DIR, cache_put

DATA_PATH = PKG_DIR / "classify_data.json"
LLM_CACHE_PATH = CACHE_DIR / "llm_domains.json"

SERVICE_LANGUAGE = re.compile(
    r"\b(accountant|adviser|advisor|advice|services?|specialists?|experts?|firm"
    r"|consultants?|solicitors?|we help|our clients|contact us|get a quote"
    r"|book a|free consultation|fees?|pricing)\b"
)


def _load_data() -> dict:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def _static_lookup(domain: str, static_lists: dict) -> str | None:
    for cls, entries in static_lists.items():
        for e in entries:
            if e.startswith("*."):
                suf = e[1:]  # ".gov.uk"
                if domain.endswith(suf) or domain == suf[1:]:
                    return cls
            elif domain == e:
                return cls
    return None


def _spec_terms(spec: dict) -> list[str]:
    terms = set()
    for t in spec.get("provider_terms", []):
        terms.add(t.lower())
    for w in re.findall(r"[a-z]{4,}", spec.get("vertical", "").lower()):
        terms.add(w)
    for s in spec.get("pain_seeds", []):
        for w in re.findall(r"[a-z]{5,}", s.lower()):
            terms.add(w)
    return sorted(terms)


def _heuristic(domain: str, ctx: dict, terms: list[str]) -> tuple[str, str] | None:
    """Returns (class, confidence) or None. Needs >=2 signals for SPECIALIST."""
    text = f"{ctx.get('title') or ''} {ctx.get('snippet') or ''}".lower()
    name = domain.split(".", 1)[0]
    niche_in_domain = any(t.replace(" ", "") in name for t in terms)
    niche_in_text = any(t in text for t in terms)
    service = bool(SERVICE_LANGUAGE.search(text)) or bool(SERVICE_LANGUAGE.search(name))
    signals = sum([niche_in_domain, niche_in_text, service])
    if (niche_in_domain or niche_in_text) and service and signals >= 2:
        return "SPECIALIST", "med"
    if service and not (niche_in_domain or niche_in_text):
        return "GENERALIST", "med"
    return None


def llm_classify_batch(domains: list[str], context: dict) -> dict:
    """LLM fallback hook. Not wired yet: pre-seed cache/llm_domains.json
    ({domain: {"class": X, "confidence": "low|med|high"}}) for manual entries."""
    raise NotImplementedError(
        "LLM domain classification is not wired. Pre-seed entries in "
        f"{LLM_CACHE_PATH} as {{domain: {{'class': ..., 'confidence': ...}}}} "
        "or classify these domains by hand: " + ", ".join(domains[:20])
    )


def classify_domains(
    domains: list[str], spec: dict, run_id: str, context: dict | None = None
) -> dict:
    data = _load_data()
    static_lists = data["static_lists"]
    hand = {**data.get("hand_labels", {}), **data.get("overrides", {})}
    llm_cache = {}
    if LLM_CACHE_PATH.exists():
        llm_cache = json.loads(LLM_CACHE_PATH.read_text(encoding="utf-8"))
    context = context or {}
    terms = _spec_terms(spec)

    classes: dict[str, dict] = {}
    llm_n = 0
    for domain in sorted(set(d for d in domains if d)):
        cls = _static_lookup(domain, static_lists)
        if cls:
            classes[domain] = {"class": cls, "tier": 1, "confidence": "high"}
            continue
        if domain in hand:
            classes[domain] = {"class": hand[domain], "tier": 2, "confidence": "high"}
            continue
        h = _heuristic(domain, context.get(domain, {}), terms)
        if h:
            classes[domain] = {"class": h[0], "tier": 3, "confidence": h[1]}
            continue
        if domain in llm_cache:
            entry = llm_cache[domain]
            classes[domain] = {
                "class": entry["class"], "tier": 4,
                "confidence": entry.get("confidence", "low"),
            }
            llm_n += 1
            continue
        classes[domain] = {"class": "UNKNOWN", "tier": 4, "confidence": "low"}

    n = max(len(classes), 1)
    unknown = sum(1 for v in classes.values() if v["class"] == "UNKNOWN")
    out = {
        "classes": classes,
        "unknown_rate": unknown / n,
        "llm_share": llm_n / n,
    }
    cache_put(run_id, spec["name"], "classify", out)
    return out


if __name__ == "__main__":
    import shutil
    spec = {
        "name": "wills-probate",
        "vertical": "Wills, probate and estate planning",
        "provider_terms": ["probate solicitor", "will writer"],
        "pain_seeds": ["probate cost", "inheritance tax"],
        "regulatory_gate": "none",
    }
    rid = "run_selfcheck_classify"
    ctx = {
        "probatespecialists.co.uk": {
            "title": "Probate Specialists | Fixed fee probate services",
            "snippet": "Our expert probate solicitors help executors. Contact us for a free consultation.",
        },
        "smithandco.co.uk": {
            "title": "Smith & Co | Legal services",
            "snippet": "Full-service firm. Contact us for advice and fees.",
        },
        "randomblog.net": {"title": "My thoughts", "snippet": "musings on life"},
    }
    res = classify_domains(
        ["gov.uk", "hmcts.gov.uk", "reddit.com", "taxassist.co.uk",
         "optimiseaccountants.co.uk", "probatespecialists.co.uk",
         "smithandco.co.uk", "randomblog.net"],
        spec, rid, context=ctx,
    )
    c = res["classes"]
    assert c["gov.uk"]["class"] == "GOV_EDU" and c["gov.uk"]["tier"] == 1
    assert c["hmcts.gov.uk"]["class"] == "GOV_EDU"
    assert c["reddit.com"]["class"] == "UGC"
    assert c["taxassist.co.uk"]["tier"] == 1  # static NATIONAL_BRAND beats hand label
    assert c["optimiseaccountants.co.uk"] == {"class": "SPECIALIST", "tier": 2, "confidence": "high"}
    assert c["probatespecialists.co.uk"]["class"] == "SPECIALIST" and c["probatespecialists.co.uk"]["tier"] == 3
    assert c["smithandco.co.uk"]["class"] == "GENERALIST"
    assert c["randomblog.net"]["class"] == "UNKNOWN"
    assert 0 < res["unknown_rate"] < 1 and res["llm_share"] == 0
    try:
        llm_classify_batch(["x.com"], {})
        raise AssertionError("stub should raise")
    except NotImplementedError:
        pass
    shutil.rmtree(CACHE_DIR / rid, ignore_errors=True)
    print("classify.py self-check OK")
