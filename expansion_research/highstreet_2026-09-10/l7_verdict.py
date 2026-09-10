"""High-street map, Leg 7: the verdict table. FREE (joins every prior leg).

Inputs
  terms.json          leg 1  discovered terms per niche
  volumes.json        leg 2  real volume, CPC, competition, 12-month arrays
  containment.json    leg 6  our own published pages that already cover the trade
  raw/serp/*.json     leg 4  who holds page one
  rivals_by_niche.json leg 5 rival page inventory from sitemap crawls

Verdict, in the order the tests are applied:

  ABSORB      we already publish a page naming this trade. Deepen it, never duplicate it.
  CLUSTER N   >= 6 distinct priced intents with real volume. N = one page per ~3 intents,
              capped at 8, because beyond that the sub-intents stop being distinct.
  PAGE        1 to 5 priced intents with volume, or zero volume but an open SERP.
  GROUP       no measured volume anywhere and no open SERP. Still covered, as a row inside
              a shared group page. Under coverage over selection, low volume never means
              no build; it means a smaller surface.

Regulatory status is carried through untouched: a "caution" niche keeps its verdict but
is flagged so it cannot be built before the C1-style review.

Openness is the SERP signal: the share of page one NOT held by a UK accountancy firm.
High openness plus any demand is the strongest build case on the table.
"""
from __future__ import annotations

import csv
import json
import math
import re
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
SERP = HERE / "raw" / "serp"

HIRE_RE = re.compile(
    r"\baccountant|\baccountants|\baccountancy|book-?keep|tax adviser|tax advisor|"
    r"tax specialist|\bfirm\b", re.I)

# Page-one results that are NOT a UK accountancy firm competing for the term.
NON_RIVAL_RE = re.compile(
    r"reddit|youtube|facebook|linkedin|twitter|instagram|tiktok|quora|pinterest|"
    r"\.gov\.uk|service\.gov\.uk|wikipedia|amazon\.|ebay\.|"
    r"quickbooks|xero\.|sage\.|freeagent|freshbooks|clearbooks|zoho|"
    r"indeed|glassdoor|checkatrade|yell\.com|trustpilot|"
    # Trade press and technical reference publishers. They hold rankings but they do
    # not compete for the client, so a page they hold is open ground, not a rival.
    r"accountingweb|croneri|cronertaxwise|rossmartin|icaew\.|accaglobal|"
    r"taxadvisermagazine|lexisnexis|tolley|bloomsbury|litrg|taxation\.co\.uk|"
    r"simplybusiness|startups\.co\.uk|companieshouse|"
    r"\.au$|\.com\.au|\.nz$|\.ca$|\.in$|\.ie$|\.us$", re.I)


def load(name: str) -> dict:
    p = HERE / name
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}


def ms_key(ms: list[dict]) -> str:
    return json.dumps([(m.get("year"), m.get("month"), m.get("search_volume"))
                       for m in ms], sort_keys=True)


def serp_openness(nid: str) -> tuple[float | None, int]:
    """Share of organic page one not held by a UK accountancy firm, over both slots."""
    open_n = total = 0
    for slot in ("hire", "mech"):
        p = SERP / f"{nid}_{slot}.json"
        if not p.exists():
            continue
        d = json.loads(p.read_text(encoding="utf-8"))
        res = d["body"]["tasks"][0].get("result") or [{}]
        for it in (res[0] or {}).get("items") or []:
            if it.get("type") != "organic":
                continue
            dom = (it.get("domain") or "").lower()
            total += 1
            if NON_RIVAL_RE.search(dom):
                open_n += 1
    return (round(open_n / total, 2) if total else None), total


def main() -> None:
    with (HERE / "niches.tsv").open(encoding="utf-8") as f:
        spec = list(csv.DictReader(f, delimiter="\t"))

    terms = load("terms.json")
    vols = load("volumes.json")
    contain = load("containment.json")
    rivals = load("rivals_by_niche.json")
    # Real questions Google Ads refuses to price because they exceed ten words.
    # They carry no volume figure, so they never enter vol_total, but they are
    # counted, because a trade generating many of them is generating real questions.
    longq = load("long_questions.json")

    rows = []
    for n in spec:
        nid = n["id"]
        my_terms = terms.get(nid, [])

        # close-variant collapse: byte-identical 12-month arrays, volume > 0, counted once
        seen: set[str] = set()
        priced = []
        for t in sorted(my_terms, key=lambda x: -(vols.get(x, {}).get("volume") or 0)):
            v = vols.get(t) or {}
            vol = v.get("volume") or 0
            if vol:
                k = ms_key(v.get("monthly_searches") or [])
                if k in seen:
                    continue
                seen.add(k)
            priced.append({"kw": t, "vol": vol, "cpc": v.get("cpc"),
                           "comp": v.get("competition")})

        live = [p for p in priced if p["vol"]]
        vol_total = sum(p["vol"] for p in live)
        vol_hire = sum(p["vol"] for p in live if HIRE_RE.search(p["kw"]))
        openness, serp_n = serp_openness(nid)
        c = contain.get(nid) or {}
        r = rivals.get(nid) or {}

        # --- verdict ---
        flag = None
        if c.get("n_matches"):
            verdict, pages = "ABSORB", 0
        elif len(live) + len(longq.get(nid) or []) >= 6:
            verdict = "CLUSTER"
            pages = min(8, max(2, math.ceil(
                (len(live) + len(longq.get(nid) or [])) / 3)))
        elif live or longq.get(nid):
            verdict, pages = "PAGE", 1
        elif openness is not None and openness >= 0.5:
            verdict, pages = "PAGE", 1
            flag = "no measured volume, but page one is wide open"
        else:
            verdict, pages = "GROUP", 0

        if n["status"] == "caution":
            flag = ((flag + "; ") if flag else "") + "regulatory review required first"

        # host: our own corpus wins, else the generalist catch-all
        host = c.get("host_signal") or ("construction-cis" if n["category"] == "trades"
                                        else "generalist")

        rows.append({
            "id": nid,
            "name": n["name"],
            "category": n["category"],
            "status": n["status"],
            "verdict": verdict,
            "pages": pages,
            "host": host,
            "intents": len(live),
            "vol_total": vol_total,
            "vol_hire": vol_hire,
            "cpc_head": live[0]["cpc"] if live else None,
            "openness": openness,
            "serp_results": serp_n,
            "long_questions": len(longq.get(nid) or []),
            "own_pages": c.get("n_matches", 0),
            "rival_pages": r.get("rival_pages", 0),
            "rival_domains": r.get("rival_domains", 0),
            "flag": flag,
            "top_terms": [{"kw": p["kw"], "vol": p["vol"]} for p in live[:8]],
        })

    rows.sort(key=lambda x: (-x["vol_total"], -x["intents"]))
    (HERE / "verdicts.json").write_text(json.dumps(rows, indent=1), encoding="utf-8")

    with (HERE / "verdicts.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["id", "name", "category", "verdict", "pages", "host", "intents",
                    "long_questions", "vol_total", "vol_hire", "cpc_head", "openness",
                    "own_pages",
                    "rival_pages", "rival_domains", "status", "flag"])
        for r in rows:
            w.writerow([r[k] for k in ("id", "name", "category", "verdict", "pages",
                                       "host", "intents", "long_questions",
                                       "vol_total", "vol_hire",
                                       "cpc_head", "openness", "own_pages",
                                       "rival_pages", "rival_domains", "status",
                                       "flag")])

    print(f"{len(rows)} niches judged")
    print(Counter(r["verdict"] for r in rows).most_common())
    print(f"total new pages implied: {sum(r['pages'] for r in rows)}")
    print(Counter(r["host"] for r in rows).most_common(8))


if __name__ == "__main__":
    main()
