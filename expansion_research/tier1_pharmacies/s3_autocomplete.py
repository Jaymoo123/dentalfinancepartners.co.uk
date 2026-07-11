"""R3 tier1 pharmacies — Stage 3a: Google Autocomplete expansion (free).

Pharmacy seeds x (blank + a-z) suffix sweep. Writes raw/autocomplete_raw.json.
Adapted from tier1_hospitality/s3_autocomplete.py.
"""
import json
import string
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

SEEDS = [
    "pharmacy accountant",
    "pharmacy accounting ",
    "accountants for pharmacists",
    "community pharmacy accountant",
    "pharmacist accountant",
    "buying a pharmacy ",
    "pharmacy purchase ",
    "selling a pharmacy ",
    "pharmacy valuation ",
    "pharmacy goodwill ",
    "pharmacy for sale ",
    "nhs pharmacy contract ",
    "pharmacy nhs payment ",
    "fp34 ",
    "drug tariff ",
    "category m ",
    "pharmacy vat ",
    "vat on prescriptions ",
    "pharmacy tax ",
    "pharmacy payroll ",
    "pharmacy bookkeeping ",
    "pharmacy profit ",
    "pharmacy margin ",
    "pharmacy wholesaler ",
    "pharmacy first ",
    "locum pharmacist tax ",
    "locum pharmacist limited company ",
    "locum pharmacist ir35 ",
    "locum pharmacist umbrella ",
    "locum pharmacist self employed ",
    "superintendent pharmacist ",
    "pharmacy incorporation ",
    "pharmacy capital allowances ",
    "pharmacy business rates ",
    "pharmacy stock valuation ",
]
CHARS = [""] + list(string.ascii_lowercase)


def autocomplete(query: str, client: httpx.Client) -> list[str]:
    try:
        r = client.get(
            "http://suggestqueries.google.com/complete/search",
            params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
            timeout=8.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        if isinstance(data, list) and len(data) >= 2 and isinstance(data[1], list):
            return [s.strip().lower() for s in data[1] if isinstance(s, str) and s.strip()]
    except Exception:
        pass
    return []


def main() -> None:
    out: dict[str, list[str]] = {}
    with httpx.Client() as client:
        for seed in SEEDS:
            for ch in CHARS:
                q = f"{seed}{ch}".strip()
                if q in out:
                    continue
                out[q] = autocomplete(q, client)
                time.sleep(0.2)
    uniq = sorted({s for v in out.values() for s in v})
    (HERE / "raw" / "autocomplete_raw.json").write_text(
        json.dumps({"queries": out, "unique_suggestions": uniq}, indent=1), encoding="utf-8")
    print(f"queries={len(out)} unique_suggestions={len(uniq)}")


if __name__ == "__main__":
    main()
