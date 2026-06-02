"""Page-signal extraction for the core-page engine.

Thin wrapper over the ONE sanctioned extractor, deep_extract.extract_page_signals
(never page_parser.py — it has known H1/schema/FAQ bugs). Extracts our core page
plus the page-1 competitor pages, recording fetch/robots failures so the brief
can note "could not fetch".
"""
from __future__ import annotations

from optimisation_engine.competitor.deep_extract import extract_page_signals


COMPETITOR_CAP = 12


def extract_our_page(cfg: dict) -> dict | None:
    """Extract live signals for our core page (the deployed URL)."""
    return extract_page_signals(cfg["page_url"])


def extract_competitors(competitors: list[dict], *, cap: int = COMPETITOR_CAP) -> dict:
    """Extract signals for up to `cap` competitor URLs.

    Returns {extracted: [...ok signals...], failed: [{url, reason}], attempted: n}.
    """
    extracted: list[dict] = []
    failed: list[dict] = []
    attempted = 0
    for comp in competitors[:cap]:
        url = comp.get("url")
        if not url:
            continue
        attempted += 1
        sig = extract_page_signals(url)
        if not sig or sig.get("error") or sig.get("status") != 200:
            reason = (sig or {}).get("error") or f"status={(sig or {}).get('status')}"
            failed.append({"url": url, "domain": comp.get("domain"), "reason": reason})
            continue
        # Carry the SERP context through onto the signal record.
        sig["serp_terms"] = comp.get("terms", [])
        sig["serp_best_position"] = comp.get("best_position")
        sig["serp_page_type"] = comp.get("page_type")
        extracted.append(sig)
    return {"extracted": extracted, "failed": failed, "attempted": attempted}
