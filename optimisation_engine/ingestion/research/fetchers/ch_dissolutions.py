"""Companies House monthly dissolution counts for the property SIC union.

Reuses companies_house.py's auth/backoff/month_windows plumbing (no copy-paste)
and mirrors the dissolved-companies query pattern proven in
ingest_construction_net_formation.py (company_status=dissolved +
dissolved_from/dissolved_to, one combined-SIC query per month -- deduplicated,
never sum per-SIC counts).
"""
from __future__ import annotations

import time
from typing import Any

import httpx

import optimisation_engine.config  # noqa: E402,F401  (triggers .env load)
from ..companies_house import CH_BASE, CH_KEY, CH_SLEEP_S, month_windows

PROPERTY_SIC_UNION = "68100,68201,68209,68320"


def _ch_dissolved_hits(client: httpx.Client, sic_codes: str, frm: str, to: str) -> int:
    """Count companies dissolved in [frm, to] for the given SIC code(s).

    Mirrors companies_house.ch_hits but queries company_status=dissolved +
    dissolved_from/dissolved_to. 404 -> 0 (confirmed CH behaviour for zero-hit
    SIC/date combinations).
    """
    params = {
        "sic_codes": sic_codes,
        "company_status": "dissolved",
        "dissolved_from": frm,
        "dissolved_to": to,
        "size": "1",
    }
    for attempt in range(4):
        r = client.get(f"{CH_BASE}/advanced-search/companies", params=params)
        if r.status_code == 429:
            wait = 60 * (attempt + 1)
            print(f"    [rate-limit] sleeping {wait}s ...", flush=True)
            time.sleep(wait)
            continue
        if r.status_code == 404:
            return 0
        r.raise_for_status()
        return int(r.json().get("hits", 0) or 0)
    raise RuntimeError(f"CH rate-limited repeatedly for {sic_codes} {frm}..{to}")


def fetch_dissolutions(start_month: str | None = None) -> dict[str, Any]:
    """Monthly dissolution counts for the property SIC union, from start_month
    (inclusive) through the last complete month. Falls back to 132 months of
    history if start_month is not given or impractical to align to.

    Never raises -- returns {"status": "error", "note": ...} on any failure so
    engine.py's optional=True secondary-source handling degrades gracefully.
    """
    try:
        if not CH_KEY:
            return {"status": "error", "note": "COMPANIES_HOUSE_API_KEY is not set"}

        windows = month_windows(132)
        if start_month:
            windows = [w for w in windows if w["month"] >= start_month] or windows

        monthly: list[dict[str, Any]] = []
        with httpx.Client(auth=(CH_KEY, ""), timeout=30.0, headers={"Accept": "application/json"}) as client:
            for w in windows:
                n = _ch_dissolved_hits(client, PROPERTY_SIC_UNION, w["frm"], w["to"])
                monthly.append({"month": w["month"], "dissolved": n})
                time.sleep(CH_SLEEP_S)

        return {
            "monthly": monthly,
            "status": "ok",
            "note": (
                "Companies House Advanced Search API, company_status=dissolved, "
                f"one combined-SIC query per month (union {PROPERTY_SIC_UNION}, deduplicated)."
            ),
        }
    except Exception as e:  # noqa: BLE001 -- optional source, never raise
        return {"status": "error", "note": f"{type(e).__name__}: {e}"}


def _demo() -> None:
    """Self-test: mocked client, proves return shape without network."""
    from unittest.mock import MagicMock, patch

    fake_resp = MagicMock(status_code=200)
    fake_resp.json.return_value = {"hits": 7}
    fake_resp.raise_for_status.return_value = None

    with patch("optimisation_engine.ingestion.research.fetchers.ch_dissolutions.CH_KEY", "fake-key"), \
         patch("httpx.Client") as mock_client_cls, \
         patch("time.sleep"):
        mock_client = MagicMock()
        mock_client.get.return_value = fake_resp
        mock_client_cls.return_value.__enter__.return_value = mock_client

        result = fetch_dissolutions("2026-07")

    assert result["status"] == "ok", result
    assert isinstance(result["monthly"], list) and result["monthly"], result
    assert set(result["monthly"][0]) == {"month", "dissolved"}
    assert all(r["dissolved"] == 7 for r in result["monthly"])
    assert "note" in result
    print("[self-check] PASS")


if __name__ == "__main__":
    _demo()
