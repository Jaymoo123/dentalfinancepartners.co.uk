"""R1 alphabet sweep of Google Autocomplete for accounting-niche patterns.

Standalone (no Supabase). Writes expansion_research/r1_autocomplete_raw.json:
{pattern_query: [suggestions...]}. Rate-limited 200ms.
"""
import json
import os
import string
import time

import httpx

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "r1_autocomplete_raw.json")

BASES = [
    "accountants for ",
    "accountant for ",
    "tax advisor for ",
    "bookkeeping for ",
    "specialist accountant ",
]
CHARS = [""] + list(string.ascii_lowercase) + list(string.digits)


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
    results: dict[str, list[str]] = {}
    total = 0
    with httpx.Client() as client:
        for base in BASES:
            for ch in CHARS:
                q = base + ch
                sugg = autocomplete(q, client)
                results[q] = sugg
                total += len(sugg)
                time.sleep(0.2)
            print(f"done base={base!r}")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"generated": time.strftime("%Y-%m-%d"), "queries": len(results), "results": results}, f, indent=1)
    uniq = {s for v in results.values() for s in v}
    print(f"{len(results)} queries, {total} suggestions, {len(uniq)} unique -> {OUT}")


if __name__ == "__main__":
    main()
