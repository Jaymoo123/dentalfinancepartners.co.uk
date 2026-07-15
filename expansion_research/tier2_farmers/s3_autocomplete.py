"""R3 tier2 farmers — Stage 3: Google Autocomplete expansion (free).

Farming-sector seeds x (blank + a-z). Writes raw/autocomplete_raw.json.
Adapted from tier1_hospitality/s3_autocomplete.py.
"""
import json
import string
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

SEEDS = [
    "farm accountant",
    "farm accountants ",
    "agricultural accountant",
    "agricultural accountants ",
    "rural accountants ",
    "accountant for farmers ",
    "farmers tax ",
    "farm tax ",
    "farmers averaging ",
    "herd basis ",
    "agricultural property relief ",
    "farm inheritance tax ",
    "farm succession ",
    "farm vat ",
    "farm diversification ",
    "farm bookkeeping ",
    "farm payroll ",
    "farm business tenancy ",
    "tenant farmer ",
    "contract farming ",
    "selling farmland tax ",
    "farm partnership ",
    "farm subsidies tax ",
    "smallholding tax ",
    "hobby farm tax ",
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
