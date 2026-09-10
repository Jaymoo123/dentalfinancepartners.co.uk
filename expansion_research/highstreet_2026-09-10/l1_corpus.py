"""High-street map, Leg 1: keyword corpus per niche (PAID, DataForSEO Labs keyword_ideas).

Owner approved ~$20 for the whole six-leg run on 2026-09-10.

Resumable: a niche whose raw/corpus/<id>.json already exists is skipped, so a
failed batch can be re-run without re-paying for what already landed.

Usage:
    python l1_corpus.py            # every niche not yet pulled
    python l1_corpus.py 1 22       # only niche ids 1 and 22 (the cost probe)
"""
from __future__ import annotations

import csv
import json
import sys
import time
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.dataforseo_client import DataForSEOClient

OUT = HERE / "raw" / "corpus"
LIMIT = 700  # rows per niche


def niches() -> list[dict]:
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        return list(csv.DictReader(f, delimiter="\t"))


def seeds_for(n: dict) -> list[str]:
    core = n["seed_core"]
    return [
        f"{core} accountant",
        f"accountant for {core}",
        f"{core} tax",
        n["mechanic_seed"],
    ]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    wanted = {a for a in sys.argv[1:]}
    client = DataForSEOClient()
    spent = 0.0
    done = 0

    for n in niches():
        if wanted and n["id"] not in wanted:
            continue
        dest = OUT / f"{n['id']}.json"
        if dest.exists():
            continue
        seeds = seeds_for(n)
        try:
            # ponytail: site_key=None - api_cost_log.site_key FKs public.sites,
            # and "highstreet" is not a site. Same trap as r2d_volumes_run.py.
            body = client.keyword_ideas(seeds, site_key=None, limit=LIMIT)
        except Exception as e:  # noqa: BLE001 - one dead niche must not kill the batch
            print(f"[{n['id']}] FAILED {n['name']}: {e}", flush=True)
            continue
        cost = float(body.get("cost", 0.0))
        spent += cost
        rows = body.get("tasks", [{}])[0].get("result", [{}])
        items = (rows[0] or {}).get("items") or [] if rows else []
        dest.write_text(
            json.dumps({"niche": n, "seeds": seeds, "cost": cost, "body": body}),
            encoding="utf-8",
        )
        done += 1
        print(f"[{n['id']}] {n['name']}: {len(items)} kw, ${cost:.4f} "
              f"(run total ${spent:.4f})", flush=True)
        time.sleep(0.3)

    print(f"\nDONE. {done} niches pulled this run, ${spent:.4f} spent.")


if __name__ == "__main__":
    main()
