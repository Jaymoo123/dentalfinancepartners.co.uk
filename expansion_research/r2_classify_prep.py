"""Split r2_serp_raw.json into batch files for sub-agent classification.

Pre-classifies mechanically certain domains (OWN-ESTATE, DIRECTORY, INFO) so
sub-agents only judge the SPECIALIST/GENERALIST ambiguity.
"""
from __future__ import annotations

import json
from pathlib import Path

HERE = Path(__file__).parent
BATCHES = 8

DIRECTORY_DOMAINS = {
    "yell.com", "bark.com", "unbiased.co.uk", "checkatrade.com", "trustpilot.com",
    "freeindex.co.uk", "thomsonlocal.com", "threebestrated.co.uk", "yelp.com",
    "yelp.co.uk", "cylex-uk.co.uk", "clutch.co", "find.icaew.com", "handpickedaccountants.co.uk",
    "expertsforexpats.com", "goodfirms.co", "sortlist.com", "trustatrader.com",
    "192.com", "scoot.co.uk", "misterwhat.co.uk", "hotfrog.co.uk", "accountingfirms.co.uk",
}
INFO_DOMAINS = {
    "gov.uk", "hmrc.gov.uk", "wikipedia.org", "reddit.com", "moneysavingexpert.com",
    "accountingweb.co.uk", "icaew.com", "acca.global", "quora.com", "youtube.com",
    "linkedin.com", "facebook.com", "instagram.com", "x.com", "twitter.com",
    "which.co.uk", "theguardian.com", "thetimes.com", "ft.com", "bbc.co.uk",
    "landlordzone.co.uk", "propertytribes.com", "property118.com", "ukbusinessforums.co.uk",
    "citizensadvice.org.uk", "litrg.org.uk", "taxaid.org.uk", "crunch.co.uk/knowledge",
    "medium.com", "mumsnet.com", "thestudentroom.co.uk", "glassdoor.co.uk", "indeed.com",
}


def load_estate() -> set[str]:
    ex = json.loads((HERE / "own_estate_exclusion.json").read_text(encoding="utf-8"))
    doms = set()
    for site in ex["sites"].values():
        for d in site["domains"]:
            doms.add(d.removeprefix("www."))
    return doms


def preclass(domain: str, estate: set[str]) -> str | None:
    d = domain.removeprefix("www.")
    if d in estate:
        return "OWN-ESTATE"
    if d in DIRECTORY_DOMAINS:
        return "DIRECTORY"
    if d in INFO_DOMAINS or d.endswith(".gov.uk") or d.endswith(".org.uk") and d in INFO_DOMAINS:
        return "INFO"
    return None


def main() -> None:
    raw = json.loads((HERE / "r2_serp_raw.json").read_text(encoding="utf-8"))
    estate = load_estate()
    nums = sorted(raw, key=int)
    per = -(-len(nums) // BATCHES)
    for b in range(BATCHES):
        chunk = nums[b * per:(b + 1) * per]
        out = {}
        for n in chunk:
            entry = raw[n]
            qs = {}
            for q, results in entry["queries"].items():
                rows = []
                for r in results:
                    pc = preclass(r["domain"], estate)
                    rows.append({
                        "position": r["position"], "domain": r["domain"],
                        "title": r["title"], "snippet": (r["snippet"] or "")[:220],
                        "class": pc,  # null = sub-agent must classify
                    })
                qs[q] = rows
            out[n] = {"niche": entry["niche"], "queries": qs}
        p = HERE / f"r2_class_batch_{b+1}_input.json"
        p.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
        print(p.name, len(chunk), "niches")


if __name__ == "__main__":
    main()
