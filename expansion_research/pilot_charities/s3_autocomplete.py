"""R3 pilot charities — Stage 3a: Google Autocomplete expansion (free).

Charity-specific seeds x (blank + a-z) suffix sweep. Writes raw/autocomplete_raw.json.
"""
import json
import string
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

SEEDS = [
    "charity accountant",
    "charity accountants ",
    "accountants for charities ",
    "charity accounts ",
    "charity audit ",
    "independent examination ",
    "charity independent examination ",
    "gift aid ",
    "gift aid claim ",
    "charity vat ",
    "charity tax ",
    "charity sorp ",
    "cic accountant",
    "cic accounts ",
    "community interest company ",
    "social enterprise account",
    "charity trading subsidiary ",
    "charity gift aid ",
    "charity payroll ",
    "charity bookkeeping ",
    "charity annual return ",
    "church accounts ",
    "cio accounts ",
    "charity commission ",
    "gasds ",
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
