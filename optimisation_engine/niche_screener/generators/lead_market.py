"""
Discovery Generator 1: lead-market mining.

Start from PROVEN lead buyers and work backwards: find UK verticals where
per-lead payment already exists. For each vertical phrase we run a small
query battery against Serper and look for organic results that advertise
leads for sale. A vertical becomes a candidate when at least 2 distinct
domains show lead-selling evidence.

Run (owner-approved, spends Serper quota):
  python -m optimisation_engine.niche_screener.generators.lead_market [--limit N] [--dry-run]

Self-check (no network):
  python -m optimisation_engine.niche_screener.generators.lead_market --selfcheck
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import date

import httpx

from optimisation_engine.niche_screener import common

GENERATOR = "lead-market"
COHORT = "2026-07"  # candidate_id suffix for this sweep cohort

# (vertical phrase, accounting_adjacent)
VERTICAL_PROBES: list[tuple[str, bool]] = [
    # legal
    ("probate", False),
    ("conveyancing", False),
    ("immigration solicitor", False),
    ("employment law", False),
    ("family law", False),
    ("divorce", False),
    ("leasehold extension", False),
    ("wills", False),
    ("lasting power of attorney", False),
    ("landlord eviction", False),
    # finance-adjacent
    ("mortgage", False),
    ("remortgage", False),
    ("equity release", False),
    ("bridging loan", False),
    ("insolvency", True),
    ("debt management", False),
    ("pension advice", False),
    ("pension transfer", False),
    ("life insurance", False),
    ("business insurance", False),
    ("invoice finance", True),
    ("r&d tax credits", True),
    ("bookkeeping", True),
    ("payroll services", True),
    # home / trade
    ("solar panel installation", False),
    ("boiler replacement", False),
    ("heat pump installation", False),
    ("damp proofing", False),
    ("roofing", False),
    ("double glazing windows", False),
    ("resin driveway", False),
    ("loft conversion", False),
    ("kitchen fitting", False),
    ("bathroom fitting", False),
    ("garden landscaping", False),
    ("electrician", False),
    ("plumber", False),
    ("epc assessment", False),
    ("pest control", False),
    ("scaffolding", False),
    # professional
    ("architect", False),
    ("planning consultant", False),
    ("hr consultancy", False),
    ("building surveyor", False),
    ("party wall surveyor", False),
    ("quantity surveyor", False),
    ("structural engineer", False),
    ("health and safety consultant", False),
    ("recruitment agency", False),
    # health (non-claims)
    ("dental implants", False),
    ("invisalign", False),
    ("hearing aids", False),
    ("private gp", False),
    ("laser eye surgery", False),
    ("physiotherapy", False),
    ("cosmetic surgery", False),
    # other
    ("care homes", False),
    ("home care", False),
    ("self storage", False),
    ("removals", False),
    ("private tutoring", False),
    ("funeral plans", False),
    ("wedding photography", False),
]

EVIDENCE_RE = re.compile(
    r"\b(per.lead|buy.{0,20}leads|leads? for sale|lead generation|£\s?\d+.{0,15}lead)\b",
    re.IGNORECASE,
)
PRICE_RE = re.compile(r"£\s?(\d{1,4})(?=[^£]{0,40}lead)", re.IGNORECASE)
BANNED_RE = re.compile(r"\b(injury|negligence|accident|claim)\b", re.IGNORECASE)
IAR_RE = re.compile(r"\b(mortgage|equity release|pension|insurance)\b", re.IGNORECASE)


def query_battery(vertical: str) -> list[str]:
    return [
        f"buy {vertical} leads uk",
        f'"{vertical} leads" price per lead',
        f"{vertical} lead generation pay per lead",
    ]


def extract_price(text: str) -> int | None:
    m = PRICE_RE.search(text)
    return int(m.group(1)) if m else None


def gate_for(vertical: str) -> str:
    if BANNED_RE.search(vertical):
        return "banned"
    if IAR_RE.search(vertical):
        return "IAR"
    return "unknown"


def evidence_from_organic(organic: list[dict]) -> list[dict]:
    """Filter organic results down to lead-selling evidence records."""
    out = []
    for item in organic:
        title = item.get("title") or ""
        snippet = item.get("snippet") or ""
        text = f"{title} {snippet}"
        if not EVIDENCE_RE.search(text):
            continue
        out.append({
            "type": "serp",
            "url": item.get("link") or "",
            "title": title,
            "excerpt": snippet[:300],
            "metric": {"price_gbp": extract_price(text)},
        })
    return out


def build_candidate(vertical: str, accounting_adjacent: bool, evidence: list[dict]) -> dict:
    slug = common.slugify(vertical)
    domains = sorted({common.domain_of(e["url"]) for e in evidence if e["url"]})
    seed_queries = sorted({e["title"].lower() for e in evidence if e.get("title")} | {vertical})
    return {
        "candidate_id": f"{slug}-leadmkt-{COHORT}",
        "vertical": vertical,
        "generator": GENERATOR,
        "evidence": [{k: v for k, v in e.items() if k != "title"} for e in evidence],
        "seed_queries": seed_queries,
        "buyer_hypothesis": {
            "who": f"UK {vertical} providers already paying per lead",
            "proof": f"{len(domains)} domains selling per-lead",
        },
        "regulatory_gate": gate_for(vertical),
        "accounting_adjacent": accounting_adjacent,
    }


def mine(
    verticals: list[str] | None = None,
    *,
    limit: int | None = None,
    site_key: str | None = "niche_screener_gen1",  # ponytail: None until sites row exists (migration 20260724000001)
) -> list[dict]:
    probes = [(v, aa) for v, aa in VERTICAL_PROBES if verticals is None or v in verticals]
    if limit is not None:
        probes = probes[:limit]

    from optimisation_engine.niche_screener.serp_fetch import fetch_serp

    candidates: list[dict] = []
    rows: list[tuple[str, int, list[int], str]] = []  # vertical, domain count, prices, gate

    for vertical, accounting_adjacent in probes:
        evidence: list[dict] = []
        seen_urls: set[str] = set()
        for q in query_battery(vertical):
            resp = None
            for attempt in (1, 2):
                try:
                    resp = fetch_serp(q, num=10, site_key=site_key)
                    break
                except httpx.HTTPError as exc:
                    if attempt == 2:
                        print(f"  [warn] {q!r} failed twice: {exc}")
            if not resp or not resp.get("fetched"):
                continue
            for e in evidence_from_organic(resp.get("organic", []) or []):
                if e["url"] and e["url"] not in seen_urls:
                    seen_urls.add(e["url"])
                    evidence.append(e)

        # ponytail: bark/checkatrade are marketplaces but each still counts as
        # one distinct-domain signal, so plain distinct-domain counting suffices
        domains = {common.domain_of(e["url"]) for e in evidence if e["url"]}
        prices = [e["metric"]["price_gbp"] for e in evidence if e["metric"]["price_gbp"]]
        rows.append((vertical, len(domains), prices, gate_for(vertical)))
        if len(domains) >= 2:
            cand = build_candidate(vertical, accounting_adjacent, evidence)
            candidates.append(cand)
            common.CANDIDATES_DIR.mkdir(parents=True, exist_ok=True)
            path = common.CANDIDATES_DIR / f"{cand['candidate_id']}.json"
            path.write_text(json.dumps(cand, indent=2, ensure_ascii=False), encoding="utf-8")
            print(f"  candidate: {cand['candidate_id']} ({len(domains)} domains)")
        else:
            print(f"  no candidate: {vertical} ({len(domains)} domains)")

    write_summary(rows)
    return candidates


def write_summary(rows: list[tuple[str, int, list[int], str]]) -> None:
    common.OUT_DIR.mkdir(parents=True, exist_ok=True)
    p = common.OUT_DIR / f"LEAD_MARKET_SWEEP_{date.today().isoformat()}.md"
    lines = [
        f"# Lead-market sweep {date.today().isoformat()}",
        "",
        "| Vertical | Evidence domains | Price signals (GBP) | Gate |",
        "|---|---|---|---|",
    ]
    for vertical, n, prices, gate in sorted(rows, key=lambda r: -r[1]):
        ps = ", ".join(str(x) for x in prices) or "-"
        lines.append(f"| {vertical} | {n} | {ps} | {gate} |")
    p.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"summary: {p}")


def _selfcheck() -> None:
    text = "Buy probate leads from £22 per lead"
    assert EVIDENCE_RE.search(text)
    assert extract_price(text) == 22
    assert extract_price("no prices here") is None
    assert not EVIDENCE_RE.search("How to write a will yourself")

    assert gate_for("personal injury") == "banned"
    assert gate_for("equity release") == "IAR"
    assert gate_for("probate") == "unknown"

    organic = [
        {"title": "Probate Leads For Sale", "link": "https://a.com/x", "snippet": "leads from £30 per lead"},
        {"title": "Guide to probate", "link": "https://b.com/y", "snippet": "how probate works"},
    ]
    ev = evidence_from_organic(organic)
    assert len(ev) == 1 and ev[0]["metric"]["price_gbp"] == 30

    # candidate dedup: same url counted once via seen_urls logic mirrored here
    cand = build_candidate("probate", False, ev + ev)
    assert cand["candidate_id"] == "probate-leadmkt-2026-07"
    assert cand["generator"] == "lead-market"
    assert "probate" in cand["seed_queries"]
    assert len(set(cand["seed_queries"])) == len(cand["seed_queries"])
    assert cand["buyer_hypothesis"]["proof"] == "1 domains selling per-lead"

    assert query_battery("solar")[0] == "buy solar leads uk"
    print("lead_market self-check OK")


def main() -> None:
    ap = argparse.ArgumentParser(description="Generator 1: lead-market mining")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--dry-run", action="store_true", help="print query battery, no network")
    ap.add_argument("--selfcheck", action="store_true", help="pure-logic asserts, no network")
    args = ap.parse_args()

    if args.selfcheck:
        _selfcheck()
        return
    if args.dry_run:
        probes = VERTICAL_PROBES[: args.limit] if args.limit else VERTICAL_PROBES
        for vertical, aa in probes:
            print(f"{vertical} (accounting_adjacent={aa}, gate={gate_for(vertical)})")
            for q in query_battery(vertical):
                print(f"  {q}")
        print(f"\n{len(probes)} verticals, {3 * len(probes)} queries")
        return
    mine(limit=args.limit)


if __name__ == "__main__":
    main()
