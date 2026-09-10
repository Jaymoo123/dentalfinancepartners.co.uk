"""High-street map, Leg 4: SERP structure per niche (PAID, ~$0.002 per query).

Answers the question the keyword numbers cannot: WHO holds page one. A head term
held by directories, forums and Reddit is winnable with one good page. A head term
held by ten established accountancy firms with deep sub-page coverage needs a cluster
or nothing at all.

Two queries per niche: the hire-intent head, and the tax mechanic.
Also accumulates rival domain frequency across every SERP, which is the input to
leg 5 (sitemap inventory of the domains that keep showing up).

Resumable: raw/serp/<id>_<slot>.json is skipped if it exists.
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

OUT = HERE / "raw" / "serp"


def niches() -> list[dict]:
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        return list(csv.DictReader(f, delimiter="\t"))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    wanted = set(sys.argv[1:])
    client = DataForSEOClient()
    spent = 0.0
    n_calls = 0

    for n in niches():
        if wanted and n["id"] not in wanted:
            continue
        queries = {
            "hire": f"{n['seed_core']} accountant",
            "mech": n["mechanic_seed"],
        }
        for slot, q in queries.items():
            dest = OUT / f"{n['id']}_{slot}.json"
            if dest.exists():
                continue
            try:
                # ponytail: site_key=None - api_cost_log.site_key FKs public.sites.
                body = client.serp_organic(site_key=None, query=q, depth=10)
            except Exception as e:  # noqa: BLE001
                print(f"[{n['id']}/{slot}] FAILED {q}: {e}", flush=True)
                continue
            cost = float(body.get("cost", 0.0))
            spent += cost
            n_calls += 1
            dest.write_text(
                json.dumps({"niche_id": n["id"], "name": n["name"], "slot": slot,
                            "query": q, "cost": cost, "body": body}),
                encoding="utf-8",
            )
            time.sleep(0.2)
        print(f"[{n['id']}] {n['name']} done (run total ${spent:.4f})", flush=True)

    print(f"\nDONE. {n_calls} SERPs, ${spent:.4f} spent.")


if __name__ == "__main__":
    main()
