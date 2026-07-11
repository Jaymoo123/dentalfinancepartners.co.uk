"""R3 tier1 care — Stage 3: Google Autocomplete expansion (free).

Care-sector seeds x (blank + a-z). Writes raw/autocomplete_raw.json.
Adapted from tier1_hospitality/s3_autocomplete.py.
"""
import json
import string
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

SEEDS = [
    "care home accountant",
    "care home accounts ",
    "domiciliary care accountant",
    "care agency accountant",
    "nursing home accountant",
    "care home payroll ",
    "domiciliary care payroll ",
    "sleep in shift pay ",
    "care worker minimum wage ",
    "care home vat ",
    "domiciliary care vat ",
    "vat welfare services ",
    "buying a care home ",
    "selling a care home ",
    "care home valuation ",
    "care home mortgage ",
    "care home business ",
    "cqc registration ",
    "cqc financial viability ",
    "start a care agency ",
    "start a domiciliary care ",
    "funded nursing care ",
    "local authority care fees ",
    "care home fees increase ",
    "care home capital allowances ",
    "care home business rates ",
    "supported living business ",
    "childrens home business ",
    "care franchise ",
    "care worker sponsorship ",
    "care agency profit ",
    "care home staff costs ",
    "agency staff care home ",
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
