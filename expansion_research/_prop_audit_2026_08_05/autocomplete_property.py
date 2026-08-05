"""
Standalone Google Autocomplete expansion for UK property-tax terms.
Not wired to any site config; reference pattern only from generalist/pipeline/autocomplete_expand.py.

Run:
    python autocomplete_property.py
"""
import json
import re
import string
import time
from pathlib import Path

import httpx

OUT = Path(__file__).resolve().parent / "autocomplete_property.json"

SEEDS = [
    "property accountant", "landlord accountant", "landlord tax",
    "accountant for landlords", "buy to let accountant", "property tax",
    "rental property accountant", "property incorporation", "section 24",
    "landlord tax return", "non resident landlord", "property capital gains tax",
]

QUESTION_PREFIXES = ["how", "what", "when", "do i", "can i", "should i"]

# Property/tax relevance filter — drop obvious noise (games, unrelated brands, etc.)
RELEVANT_HINTS = re.compile(
    r"\b(tax|hmrc|landlord|rent|rental|property|accountant|account|"
    r"section 24|capital gains|cgt|incorporat|mortgage|sdlt|stamp duty|"
    r"self assessment|allowance|relief|limited company|ltd|buy to let|btl)\b",
    re.I,
)


def autocomplete(query: str, client: httpx.Client):
    try:
        r = client.get(
            "http://suggestqueries.google.com/complete/search",
            params={"client": "firefox", "q": query, "hl": "en", "gl": "gb"},
            timeout=8.0,
        )
        if r.status_code != 200:
            return []
        data = r.json()
        if isinstance(data, list) and len(data) > 1 and isinstance(data[1], list):
            return [s for s in data[1] if isinstance(s, str)]
    except Exception:
        return []
    return []


def normalise(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()


def build_query_plan(seed: str):
    """(query, source_pattern) pairs: bare, +letter a-z, question prefixes."""
    plan = [(seed, "bare")]
    for letter in string.ascii_lowercase:
        plan.append((f"{seed} {letter}", f"+letter:{letter}"))
    for prefix in QUESTION_PREFIXES:
        plan.append((f"{prefix} {seed}", f"question:{prefix}"))
    return plan


def main():
    candidates = {}  # normalised term -> {term, seed, source_pattern}
    errors = []
    total_queries = 0

    with httpx.Client() as client:
        for seed in SEEDS:
            plan = build_query_plan(seed)
            print(f"Seed: {seed!r} ({len(plan)} queries)")
            for query, pattern in plan:
                suggs = autocomplete(query, client)
                total_queries += 1
                if suggs is None:
                    errors.append({"query": query, "seed": seed})
                for s in suggs:
                    s_clean = s.strip()
                    if not s_clean or len(s_clean) < 5:
                        continue
                    if not RELEVANT_HINTS.search(s_clean):
                        continue
                    ns = normalise(s_clean)
                    if ns not in candidates:
                        candidates[ns] = {"term": s_clean, "seed": seed, "source_pattern": pattern}
                time.sleep(1.0)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps({"terms": list(candidates.values()), "errors": errors, "queries_made": total_queries}, indent=2),
        encoding="utf-8",
    )
    print(f"\nQueries made: {total_queries}")
    print(f"Unique relevant terms: {len(candidates)}")
    print(f"Errors: {len(errors)}")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
