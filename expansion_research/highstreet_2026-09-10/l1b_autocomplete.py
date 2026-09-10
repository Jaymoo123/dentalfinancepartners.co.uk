"""High-street map, Leg 1 (rebuilt): discovery via Google Autocomplete. FREE.

Why this replaced the paid keyword_ideas pull: keyword_ideas returns category-level
ideas, so a butcher seed came back dominated by generic "accountant" terms (8 of 700
keywords contained "butcher"). keyword_suggestions returns keywords containing the
seed, but seeded on the bare trade noun it returns consumer intent ("butcher near me")
and the accounting slice is buried past the row limit.

Autocomplete is what people actually type, it is free, and seeded on the accounting
templates it only ever returns accounting phrasings of the trade. It is discovery only:
volumes come from the paid Google Ads pull in leg 2.

Method is r1_autocomplete_sweep.py: template x (blank + a-z), en-GB, uk.
Resumable per niche: raw/autocomplete/<id>.json is skipped if present.
"""
from __future__ import annotations

import csv
import json
import string
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import httpx

HERE = Path(__file__).parent
OUT = HERE / "raw" / "autocomplete"
CHARS = [""] + list(string.ascii_lowercase)
WORKERS = 6


def templates(n: dict) -> list[str]:
    core = n["seed_core"]
    return [
        f"{core} accountant ",
        f"accountant for {core} ",
        f"{core} tax ",
        f"{core} vat ",
        n["mechanic_seed"] + " ",
    ]


def autocomplete(client: httpx.Client, query: str) -> list[str]:
    for _ in range(3):
        try:
            r = client.get(
                "http://suggestqueries.google.com/complete/search",
                params={"client": "firefox", "q": query, "hl": "en-GB", "gl": "uk"},
                timeout=8.0,
            )
            if r.status_code == 200:
                data = r.json()
                if isinstance(data, list) and len(data) >= 2 and isinstance(data[1], list):
                    return [s.strip().lower() for s in data[1]
                            if isinstance(s, str) and s.strip()]
                return []
            time.sleep(1.5)
        except Exception:  # noqa: BLE001
            time.sleep(1.0)
    return []


def run_niche(n: dict) -> tuple[str, int]:
    dest = OUT / f"{n['id']}.json"
    if dest.exists():
        return n["id"], -1
    results: dict[str, list[str]] = {}
    with httpx.Client() as client:
        for base in templates(n):
            for ch in CHARS:
                q = base + ch
                results[q] = autocomplete(client, q)
                time.sleep(0.15)
    uniq = sorted({s for v in results.values() for s in v})
    dest.write_text(json.dumps({"niche": n, "results": results, "unique": uniq}),
                    encoding="utf-8")
    return n["id"], len(uniq)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        niches = list(csv.DictReader(f, delimiter="\t"))
    wanted = set(sys.argv[1:])
    if wanted:
        niches = [n for n in niches if n["id"] in wanted]

    done = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        for nid, count in ex.map(run_niche, niches):
            if count >= 0:
                done += 1
                print(f"[{nid}] {count} unique suggestions", flush=True)

    print(f"\nDONE. {done} niches swept.")


if __name__ == "__main__":
    main()
