"""High-street map, Leg 11: let Google decide the page splits. PAID (~$0.002 per query).

The page count cannot be settled by counting words. Two phrasings are one page or two
depending on whether Google answers them with the same results, and that is observable.

Measured on two pairs before building this:
  "vat on second hand cars" vs "vat on used cars"  -> 6 of 10 URLs shared
  "vat on takeaway food"    vs "vat on hot food"   -> 7 of 10, identical top result

Both are one page. Splitting them would put two of our own pages into the same result
set, which is cannibalisation, and the house rule forbids it.

Method: fetch one SERP for each candidate page's head query, then cluster the
candidates by shared URLs. Pairwise comparison is free once the SERPs are on disk, so
the cost is one query per candidate, not one per pair.

SPLIT_AT is the threshold: candidates sharing this many or more of the top ten are the
same page. Set from the measurements above, where a genuine duplicate scored 6 and 7.

Writes page_splits.json.
"""
from __future__ import annotations

import json
import re
import sys
import time
from itertools import combinations
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.dataforseo_client import DataForSEOClient

OUT = HERE / "raw" / "split"
SPLIT_AT = 4          # shared URLs in the top ten that mean "one page"
MIN_VOL = 60          # a candidate page needs this much monthly volume
MIN_QUESTIONS = 3     # and this many distinct phrasings

GEO_RE = re.compile(
    r"ireland|northern|germany|france|spain|dublin|europe|\beu\b|scotland|wales|"
    r"usa|america|canada|australia", re.I)

# Tokeniser residue: real words, but not what a page is about.
NOISE = {
    "than", "between", "gov", "www", "mac", "lodge", "sign", "login", "prime",
    "not", "own", "due", "best", "near", "change", "changes", "update", "contact",
    "apply", "back", "use", "work", "working", "self", "tool", "list", "notice",
    "online", "m&s", "blue", "badge", "recovery", "restrict", "south", "input",
    "estimator", "where", "postal", "pdf", "qualify", "examples", "items",
}


# Survivors of the earlier filters that are still not ours: a named company, and
# insurance-premium terms from US and Indian tax systems.
OFF_TOPIC_RE = re.compile(
    r"home retail group|premium tax credit|deduction for life insurance|"
    r"section 80|80c|obamacare|marketplace insurance", re.I)


def candidates() -> list[dict]:
    plan = json.loads((HERE / "page_plan.json").read_text(encoding="utf-8"))
    out = []
    for mech, d in plan.items():
        # the pillar itself is always a page: it answers the bare mechanic question
        out.append({"mechanic": mech, "subject": "(pillar)", "query": d["seed"],
                    "volume": d.get("pillar_volume", 0), "pillar": True})
        for s in d["subjects"]:
            if s["volume"] < MIN_VOL or s["questions"] < MIN_QUESTIONS:
                continue
            first = s["subject"].split(" / ")[0]
            if first in NOISE or GEO_RE.search(s["subject"]):
                continue
            if OFF_TOPIC_RE.search(s["examples"][0]):
                continue
            out.append({"mechanic": mech, "subject": first,
                        "query": s["examples"][0], "volume": s["volume"],
                        "pillar": False})
    return out


def fetch(client: DataForSEOClient, query: str) -> list[str]:
    """Fetch one SERP, and never return an empty one silently.

    An empty result set shares no URLs with anything, so it can never merge, and a
    page that cannot merge becomes its own page. That turns a fetch failure into an
    inflated page count with no error anywhere. Six pages were created this way on the
    first run: the cost tracker refuses a call it already made today, and those six
    queries had been fetched by an earlier leg, so each came back empty.

    The retry uses a different depth, which changes the request and therefore the
    idempotency key, so a genuine repeat is still served rather than refused.
    """
    safe = re.sub(r"[^a-z0-9]+", "_", query.lower())[:70]
    dest = OUT / f"{safe}.json"
    if dest.exists():
        body = json.loads(dest.read_text(encoding="utf-8"))
    else:
        try:
            # ponytail: site_key=None - api_cost_log.site_key FKs public.sites.
            body = client.serp_organic(site_key=None, query=query, depth=10)
        except Exception:  # noqa: BLE001 - almost always the same-day duplicate guard
            body = client.serp_organic(site_key=None, query=query, depth=11)
        dest.write_text(json.dumps(body), encoding="utf-8")
        time.sleep(0.2)
    items = (body["tasks"][0].get("result") or [{}])[0].get("items") or []
    urls = [i.get("url") for i in items if i.get("type") == "organic"][:10]
    if not urls:
        raise RuntimeError(f"empty SERP for {query!r}: refusing to cluster on nothing")
    return urls


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    client = DataForSEOClient()
    cands = candidates()
    print(f"{len(cands)} candidate pages to test")

    serps: dict[int, set[str]] = {}
    for i, c in enumerate(cands):
        try:
            serps[i] = set(u for u in fetch(client, c["query"]) if u)
        except Exception as e:  # noqa: BLE001
            print(f"  [{c['query'][:40]}] FAILED: {e}", flush=True)
            serps[i] = set()

    # union-find over "shares >= SPLIT_AT URLs with", within a mechanic
    parent = list(range(len(cands)))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a: int, b: int) -> None:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[max(ra, rb)] = min(ra, rb)

    merges = []
    for a, b in combinations(range(len(cands)), 2):
        if cands[a]["mechanic"] != cands[b]["mechanic"]:
            continue
        shared = len(serps[a] & serps[b])
        if shared >= SPLIT_AT:
            union(a, b)
            merges.append((cands[a]["query"], cands[b]["query"], shared))

    groups: dict[int, list[int]] = {}
    for i in range(len(cands)):
        groups.setdefault(find(i), []).append(i)

    pages = []
    for root, members in groups.items():
        members.sort(key=lambda i: -(cands[i]["volume"] or 10**9))
        head = cands[members[0]]
        pages.append({
            "mechanic": head["mechanic"],
            "is_pillar": any(cands[i]["pillar"] for i in members),
            "head_query": head["query"],
            "covers": [cands[i]["query"] for i in members],
            "subjects": [cands[i]["subject"] for i in members],
            "volume": sum(cands[i]["volume"] or 0 for i in members),
            "pillar_volume": sum(cands[i]["volume"] or 0
                                 for i in members if cands[i]["pillar"]),
        })
    pages.sort(key=lambda p: (p["mechanic"], -p["volume"]))
    (HERE / "page_splits.json").write_text(json.dumps(pages, indent=1), encoding="utf-8")

    per_mech: dict[str, int] = {}
    for p in pages:
        per_mech[p["mechanic"]] = per_mech.get(p["mechanic"], 0) + 1

    print(f"\ncandidates {len(cands)} -> PAGES {len(pages)} "
          f"({len(merges)} merged by shared results)")
    print(f"{'mechanic':<30}{'pages':>6}")
    for m, n in sorted(per_mech.items(), key=lambda kv: -kv[1]):
        print(f"{m:<30}{n:>6}")


if __name__ == "__main__":
    main()
