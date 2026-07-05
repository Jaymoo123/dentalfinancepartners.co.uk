"""
Deliverable 2 — Backlink prospect list (arms the UK Landlord Tax Index outreach).

prospects = (union of competitor referring domains) - (our referring domains),
ranked by how many competitors a domain links to (3+ = property-tax-friendly
publisher) and the referring domain's authority (InLink Rank).

Reads raw/backlinks_refdomains_*.json. Out: backlink_prospects_<date>.csv

Run:  python -m scripts.seranking.build_backlink_prospects
"""
from __future__ import annotations

from datetime import date

from scripts.seranking._common import (
    raw_files, load, records, pick, to_num, domain_of, write_csv,
)

OWN = "propertytaxpartners"
DATA_PR_ANCHORS = ("data", "stat", "research", "report", "study", "index", "survey", "figures")


def _extract(rec: dict) -> dict:
    return {
        "ref_domain": domain_of(pick(rec, "domain", "ref_domain", "referring_domain", "from_domain", "host")),
        "inlink_rank": to_num(pick(rec, "inlink_rank", "domain_inlink_rank", "authority",
                                   "domain_authority", "dr", "trust")),
        "backlinks": to_num(pick(rec, "backlinks", "backlinks_count", "links")),
        "example_url": pick(rec, "url", "source_url", "example_url", "from_url"),
        "anchor": pick(rec, "anchor", "anchor_text", "text"),
    }


def main() -> int:
    files = raw_files("backlinks_refdomains")
    if not files:
        print("No raw/backlinks_refdomains_*.json yet. Run tier1 first.")
        return 1

    ours: set[str] = set()
    comp: dict[str, dict] = {}
    for path in files:
        is_own = OWN in path.name
        target = path.name.split("backlinks_refdomains_")[-1].split("_2")[0]
        for rec in records(load(path)):
            e = _extract(rec)
            rd = e["ref_domain"]
            if not rd:
                continue
            if is_own:
                ours.add(rd)
                continue
            slot = comp.setdefault(rd, {"ref_domain": rd, "competitors": set(),
                                        "inlink_rank": e["inlink_rank"], "example_url": e["example_url"],
                                        "data_pr": False})
            slot["competitors"].add(target)
            if e["inlink_rank"] and (slot["inlink_rank"] is None or e["inlink_rank"] > slot["inlink_rank"]):
                slot["inlink_rank"] = e["inlink_rank"]
            anchor = str(e["anchor"] or "").lower()
            if any(a in anchor for a in DATA_PR_ANCHORS):
                slot["data_pr"] = True

    rows = []
    for rd, s in comp.items():
        if rd in ours:
            continue  # already links to us
        rows.append({
            "referring_domain": rd,
            "links_to_N_competitors": len(s["competitors"]),
            "inlink_rank": s["inlink_rank"],
            "example_target_url": s["example_url"],
            "data_pr_warm": s["data_pr"],
            "competitors": ", ".join(sorted(s["competitors"])),
        })
    rows.sort(key=lambda r: (-(r["links_to_N_competitors"]), -(r["inlink_rank"] or 0)))
    out = write_csv(f"backlink_prospects_{date.today().isoformat()}.csv", rows, fieldnames=[
        "referring_domain", "links_to_N_competitors", "inlink_rank",
        "example_target_url", "data_pr_warm", "competitors"])
    print(f"Wrote {out}  ({len(rows)} prospect domains; {sum(r['links_to_N_competitors']>=3 for r in rows)} link to 3+ competitors)")
    for r in rows[:15]:
        print(f"  {r['links_to_N_competitors']}x comp  DR={r['inlink_rank']}  "
              f"{'[data-PR] ' if r['data_pr_warm'] else ''}{r['referring_domain']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
