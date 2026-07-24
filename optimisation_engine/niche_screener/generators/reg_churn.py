"""
Discovery Generator 2: regulatory-churn mining.

Find UK verticals about to receive a regulatory demand shock: a rule change
that forces a large lay population to act, with money attached (the pattern
behind MTD for landlords, Renters' Rights, pensions-into-IHT).

Sources (free, no auth, throttled 1 req/s, raw pulls cached):
  - gov.uk Search API: consultations, last N months
  - legislation.gov.uk new-legislation Atom feed: recent UK SIs

Pipeline:
  1. fetch + cache raw pulls to generators/raw_reg_churn/<date>/
  2. keyword screen (money/compliance terms) -> screened.json
  3. MTD-test judgments: the JUDGMENTS table below is filled by the operator
     (Claude, acting as classifier with a fixed rubric) after reviewing
     screened.json. The script never invents verdicts.
  4. emit candidate records per common.py schema + out/ summary table.

Run (free APIs, owner-approved):
  python -m optimisation_engine.niche_screener.generators.reg_churn [--months 24] [--limit N] [--dry-run]

Self-check (no network):
  python -m optimisation_engine.niche_screener.generators.reg_churn --selfcheck
"""
from __future__ import annotations

import argparse
import json
import re
import time
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import httpx

from optimisation_engine.niche_screener import common

GENERATOR = "reg-churn"
COHORT = "2026-07"

RAW_DIR = common.PKG_DIR / "generators" / "raw_reg_churn"

GOVUK_SEARCH = "https://www.gov.uk/api/search.json"
LEG_NEW_FEED = "https://www.legislation.gov.uk/new/uksi/data.feed"

ATOM_NS = {"a": "http://www.w3.org/2005/Atom"}

# Money/compliance keyword screen. Cheap first pass; the MTD test does the judging.
SCREEN_RE = re.compile(
    r"\b(tax|fee|fees|levy|licence|license|licensing|mandatory|mandat\w+|compulsory"
    r"|threshold|penalt\w+|fine|fines|landlord|tenant|employer|employee|pension"
    r"|energy|vehicle|driver|motoring|safety|deadline|register|registration"
    r"|charge|charges|duty|allowance|permit|certificat\w+|inspection|ban|banned)\b",
    re.IGNORECASE,
)

# Obviously banned territory (personal injury / claims management).
BANNED_RE = re.compile(r"\b(personal injury|claims? management|whiplash)\b", re.IGNORECASE)

_last_req = 0.0


def _throttled_get(client: httpx.Client, url: str, params: dict | None = None) -> httpx.Response:
    global _last_req
    wait = 1.0 - (time.monotonic() - _last_req)
    if wait > 0:
        time.sleep(wait)
    resp = client.get(url, params=params)
    _last_req = time.monotonic()
    resp.raise_for_status()
    return resp


def fetch_consultations(client: httpx.Client, raw_dir: Path, months: int) -> list[dict]:
    """Paginate gov.uk search API for consultations newer than the cutoff."""
    cutoff = (datetime.now(timezone.utc) - timedelta(days=months * 30)).date().isoformat()
    items: list[dict] = []
    start, page = 0, 0
    while True:
        cache = raw_dir / f"govuk_consultations_p{page}.json"
        if cache.exists() and json.loads(cache.read_text(encoding="utf-8")).get("total"):
            data = json.loads(cache.read_text(encoding="utf-8"))
        else:
            resp = _throttled_get(client, GOVUK_SEARCH, params={
                # ponytail: plain "consultation" returns total 0 on the live API;
                # the real document types are these three
                "filter_content_store_document_type": [
                    "open_consultation", "closed_consultation", "consultation_outcome"],
                "fields": "title,description,link,public_timestamp",
                "order": "-public_timestamp",
                "count": 100,
                "start": start,
            })
            data = resp.json()
            cache.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
        results = data.get("results", [])
        if not results:
            break
        done = False
        for r in results:
            ts = (r.get("public_timestamp") or "")[:10]
            if ts and ts < cutoff:
                done = True
                break
            items.append({
                "source": "govuk-consultation",
                "title": r.get("title") or "",
                "description": r.get("description") or "",
                "url": "https://www.gov.uk" + (r.get("link") or ""),
                "date": ts,
            })
        if done:
            break
        start += 100
        page += 1
        if page > 60:  # ponytail: hard cap, raise if 24 months ever exceeds 6k consultations
            break
    return items


def fetch_new_sis(client: httpx.Client, raw_dir: Path, months: int, page_cap: int = 60) -> list[dict]:
    """Follow the legislation.gov.uk new-UKSI Atom feed's next links back in time."""
    cutoff = (datetime.now(timezone.utc) - timedelta(days=months * 30)).date().isoformat()
    items: list[dict] = []
    url: str | None = LEG_NEW_FEED
    page = 0
    while url and page < page_cap:
        cache = raw_dir / f"leg_uksi_p{page}.xml"
        if cache.exists():
            text = cache.read_text(encoding="utf-8")
        else:
            resp = _throttled_get(client, url)
            text = resp.text
            cache.write_text(text, encoding="utf-8")
        root = ET.fromstring(text)
        oldest = None
        for entry in root.findall("a:entry", ATOM_NS):
            title = (entry.findtext("a:title", "", ATOM_NS) or "").strip()
            summary = (entry.findtext("a:summary", "", ATOM_NS) or "").strip()
            published = (entry.findtext("a:published", "", ATOM_NS)
                         or entry.findtext("a:updated", "", ATOM_NS) or "")[:10]
            link = ""
            for ln in entry.findall("a:link", ATOM_NS):
                if ln.get("rel") in (None, "alternate"):
                    link = ln.get("href") or ""
                    break
            oldest = published or oldest
            if published and published < cutoff:
                continue
            items.append({
                "source": "uksi",
                "title": title,
                "description": summary,
                "url": link,
                "date": published,
            })
        url = None
        for ln in root.findall("a:link", ATOM_NS):
            if ln.get("rel") == "next":
                url = ln.get("href")
                break
        if oldest and oldest < cutoff:
            break
        page += 1
    return items


def screen(items: list[dict]) -> list[dict]:
    return [i for i in items if SCREEN_RE.search(f"{i['title']} {i['description']}")]


def seed_queries_from_title(title: str) -> list[str]:
    """Extract seed queries from an item title, never invented. Lowercased title
    with instrument boilerplate stripped, plus the full title."""
    t = title.lower().strip()
    stripped = re.sub(
        r"\b(the|regulations?|order|rules|\(amendment\)|amendment|consultation"
        r"|\(no\.?\s*\d+\))\b|\b(19|20)\d{2}\b", " ", t)
    stripped = re.sub(r"[^a-z0-9&' ]+", " ", stripped)
    stripped = re.sub(r"\s+", " ", stripped).strip()
    out = [t]
    if stripped and stripped != t:
        out.append(stripped)
    return out


# ---------------------------------------------------------------------------
# MTD-test judgments. Filled by the operator after reviewing screened.json.
# Rubric (applied consistently, temperature-0 mindset):
#   PASS only if the instrument creates a COMPULSORY action for a LARGE
#   NON-PROFESSIONAL population, WITH money attached. Record affected
#   population (cite the source's own impact assessment where present),
#   commencement date if named, and the vertical it points at.
# Each entry: url -> judgment dict. Items screened but absent here, or with
# verdict "fail", appear in the summary as N with the reason.
# ---------------------------------------------------------------------------
JUDGMENTS: dict[str, dict] = {
    # filled 2026-07-24 from raw_reg_churn/2026-07-24/screened.json (569 screened items reviewed)
    "http://www.legislation.gov.uk/uksi/2026/336/made": {
        "verdict": "pass",
        "vertical": "MTD for income tax compliance (sole traders and landlords)",
        "population": "c. 2.9m sole traders and landlords phased in from April 2026 (HMRC MTD ITSA estimates; qualifying income over 50k first)",
        "commencement": "2026-04-06",
        "money": "compulsory quarterly digital filing, software cost, points-based late-submission penalties (paired SI uksi/2026/370)",
        "reason": "compulsory action, huge lay population, penalties attached; the archetype",
        "accounting_adjacent": True,
    },
    "https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment": {
        "verdict": "pass",
        "vertical": "pensions into IHT estate planning",
        "population": "HMRC impact assessment: c. 10,500 estates newly liable and c. 38,500 paying more IHT per year from 2027",
        "commencement": "2027-04-06",
        "money": "unused pension pots in scope of 40 percent IHT; reporting duties on personal representatives",
        "reason": "compulsory reporting and tax on a large lay population of retirees and executors, hard date",
        "accounting_adjacent": True,
    },
    "https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-information-sharing-regulations": {
        "verdict": "pass",
        "vertical": "pensions into IHT reporting (executors and schemes)",
        "population": "personal representatives of estates with pension wealth; c. 49,000 affected estates per year (HMRC figures)",
        "commencement": "2027-04-06",
        "money": "IHT due on pension pots; information duties between executors and schemes",
        "reason": "second instrument on the same shock; compulsory, money attached",
        "accounting_adjacent": True,
    },
    "http://www.legislation.gov.uk/uksi/2026/319/made": {
        "verdict": "pass",
        "vertical": "landlord compliance (Renters' Rights Act penalties)",
        "population": "c. 2.3m private landlords in England (English Private Landlord Survey scale)",
        "commencement": "unnamed",
        "money": "civil financial penalties for housing offences and banning-order breaches under the Renters' Rights framework",
        "reason": "compulsory compliance for a large lay landlord population, penalties attached",
        "accounting_adjacent": True,
    },
    "https://www.gov.uk/government/consultations/improving-the-energy-performance-of-privately-rented-homes-2025-update": {
        "verdict": "pass",
        "vertical": "landlord EPC upgrades (private rented MEES)",
        "population": "c. 2.5m privately rented homes below EPC C in England and Wales (consultation's own scope)",
        "commencement": "2030 (proposed EPC C for all private tenancies; 2028 for new tenancies)",
        "money": "retrofit cost per property up to a proposed 15,000 GBP cap, penalties for non-compliance",
        "reason": "compulsory upgrade spend for lay landlords, named dates",
        "accounting_adjacent": True,
    },
    "https://www.gov.uk/government/consultations/consultation-on-the-introduction-of-electric-vehicle-excise-duty-eved": {
        "verdict": "pass",
        "vertical": "EV per-mile road charging (eVED)",
        "population": "c. 1.5m+ battery-electric car owners in the UK, growing to millions by commencement",
        "commencement": "2028-04 (announced at Budget 2025 for April 2028)",
        "money": "per-mile charge on EVs (c. 3p per mile announced), mileage reporting obligation",
        "reason": "new compulsory tax and reporting duty on a large lay driver population",
        "accounting_adjacent": False,
    },
    "https://www.gov.uk/government/consultations/high-value-council-tax-surcharge": {
        "verdict": "pass",
        "vertical": "high value council tax surcharge (mansion surcharge)",
        "population": "c. 100,000+ homes valued over 2m GBP in England (govt estimate at Budget 2025)",
        "commencement": "2028-04",
        "money": "annual surcharge from c. 2,500 GBP rising with value; valuation challenge process",
        "reason": "compulsory annual charge on lay homeowners, hard date, appeal demand likely",
        "accounting_adjacent": True,
    },
    "https://www.gov.uk/government/consultations/introducing-mandatory-eyesight-testing-for-older-drivers": {
        "verdict": "pass",
        "vertical": "older driver licence renewal (mandatory eyesight tests)",
        "population": "c. 6m licence holders aged 70+ in Great Britain (DVLA scale)",
        "commencement": "unnamed",
        "money": "test cost at each 3-year renewal, risk of licence loss",
        "reason": "compulsory recurring action for a very large lay population, money attached",
        "accounting_adjacent": False,
    },
    "https://www.gov.uk/government/consultations/introducing-a-minimum-learning-period-for-learner-drivers": {
        "verdict": "pass",
        "vertical": "learner driver licensing reform (minimum learning period)",
        "population": "c. 1.5m provisional licence applicants per year (DVSA test volumes scale)",
        "commencement": "unnamed",
        "money": "extended lesson and insurance spend before test eligibility",
        "reason": "compulsory waiting period changes cost and planning for a large lay cohort",
        "accounting_adjacent": False,
    },
    "https://www.gov.uk/government/consultations/moving-to-commonhold-banning-leasehold-for-new-flats": {
        "verdict": "pass",
        "vertical": "leasehold to commonhold conversion",
        "population": "c. 5m leasehold homes in England (govt leasehold estimate cited in the reform programme)",
        "commencement": "unnamed (draft Leasehold and Commonhold Reform Bill)",
        "money": "service charges, conversion costs, ground rent and enfranchisement values in play",
        "reason": "structural change forcing decisions on a very large lay leaseholder population",
        "accounting_adjacent": False,
    },
    "https://www.gov.uk/government/consultations/strengthening-leaseholder-protections-over-charges-and-services-consultation": {
        "verdict": "pass",
        "vertical": "leaseholder service charge rights",
        "population": "c. 5m leaseholders in England (same estimate; billing transparency duties on all managing agents and freeholders)",
        "commencement": "unnamed (Leasehold and Freehold Reform Act 2024 secondary legislation)",
        "money": "standardised service charge demands, challenge rights, cost recovery limits",
        "reason": "money-attached rights shock for a large lay population; overlaps commonhold vertical",
        "accounting_adjacent": False,
    },
    "https://www.gov.uk/government/consultations/timely-payments-in-income-tax-self-assessment": {
        "verdict": "pass",
        "vertical": "self assessment timely payments (in-year income tax)",
        "population": "ITSA population of c. 12m filers, initially sole traders and landlords (consultation scope)",
        "commencement": "unnamed",
        "money": "earlier and more frequent income tax payment, cashflow impact, penalty regime",
        "reason": "compulsory payment-timing change for a very large lay population",
        "accounting_adjacent": True,
    },
    "http://www.legislation.gov.uk/uksi/2026/338/made": {
        "verdict": "pass",
        "vertical": "vaping duty compliance (retailers and importers)",
        "population": "tens of thousands of vape retailers and importers, largely small businesses",
        "commencement": "2026-10-01",
        "money": "new excise duty on vaping products, duty stamps regime, penalties",
        "reason": "compulsory duty and stamps for a mostly small-business population, hard date; weakest pass (business not consumer)",
        "accounting_adjacent": True,
    },
}


def existing_slug_owners(slug: str) -> list[str]:
    """Candidate files from OTHER generators already claiming this slug."""
    if not common.CANDIDATES_DIR.exists():
        return []
    return sorted(
        p.name for p in common.CANDIDATES_DIR.glob(f"{slug}-*.json")
        if "-regchurn-" not in p.name
    )


def build_candidate(item: dict, j: dict) -> dict:
    slug = common.slugify(j["vertical"])[:60].rstrip("-")
    overlap = existing_slug_owners(slug)
    cand = {
        "candidate_id": f"{slug}-regchurn-{COHORT}",
        "vertical": j["vertical"],
        "generator": GENERATOR,
        "evidence": [{
            "type": "consultation" if item["source"] == "govuk-consultation" else "legislation",
            "url": item["url"],
            "excerpt": (item["description"] or item["title"])[:300],
            "metric": {},
        }],
        "seed_queries": seed_queries_from_title(item["title"]),
        "buyer_hypothesis": {
            "who": j["population"],
            "proof": f"stated in {item['url']}",
        },
        "event_hypothesis": {
            "what": j["money"],
            "date": j.get("commencement") or "unnamed",
            "source": item["url"],
        },
        "regulatory_gate": "banned" if BANNED_RE.search(item["title"] + " " + j["vertical"]) else "unknown",
        "accounting_adjacent": bool(j.get("accounting_adjacent")),
    }
    if overlap:
        cand["multi_generator_overlap"] = overlap  # gold: flag, do not skip silently
    return cand


def emit(screened: list[dict]) -> tuple[list[dict], list[tuple]]:
    candidates: list[dict] = []
    rows: list[tuple] = []  # vertical/title, instrument, date, population, money, Y/N reason
    seen_ids: set[str] = set()
    for item in screened:
        j = JUDGMENTS.get(item["url"])
        if not j or j["verdict"] != "pass":
            reason = j["reason"] if j else "no MTD-test pass (screened only)"
            rows.append((item["title"][:80], item["source"], item["date"], "-", "-", f"N: {reason}"))
            continue
        cand = build_candidate(item, j)
        rows.append((j["vertical"], item["source"], j.get("commencement") or "unnamed",
                     j["population"], j["money"], "Y"))
        if cand["candidate_id"] in seen_ids:
            continue
        seen_ids.add(cand["candidate_id"])
        candidates.append(cand)
        common.CANDIDATES_DIR.mkdir(parents=True, exist_ok=True)
        p = common.CANDIDATES_DIR / f"{cand['candidate_id']}.json"
        p.write_text(json.dumps(cand, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"  candidate: {cand['candidate_id']}"
              + (f" [OVERLAP: {cand['multi_generator_overlap']}]" if cand.get("multi_generator_overlap") else ""))
    return candidates, rows


def write_summary(rows: list[tuple], n_raw: int, n_screened: int) -> Path:
    common.OUT_DIR.mkdir(parents=True, exist_ok=True)
    p = common.OUT_DIR / f"REG_CHURN_SWEEP_{date.today().isoformat()}.md"
    lines = [
        f"# Regulatory-churn sweep {date.today().isoformat()}",
        "",
        f"Raw items pulled: {n_raw}. Passed keyword screen: {n_screened}. "
        f"Judged (MTD test): {len(JUDGMENTS)}.",
        "",
        "Coverage note: gov.uk consultations cover the full 24 months. The "
        "legislation.gov.uk new-UKSI feed hit the 60-page cap at 2025-09-22, so "
        "UKSI coverage is c. 10 months, not 24.",
        "",
        "| Vertical / title | Instrument | Commencement | Affected population | Money at stake | Candidate |",
        "|---|---|---|---|---|---|",
    ]
    for r in sorted(rows, key=lambda r: (not r[5].startswith("Y"), r[0])):
        lines.append("| " + " | ".join(str(x).replace("|", "/") for x in r) + " |")
    p.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"summary: {p}")
    return p


def run(months: int, limit: int | None) -> None:
    raw_dir = RAW_DIR / date.today().isoformat()
    raw_dir.mkdir(parents=True, exist_ok=True)
    screened_path = raw_dir / "screened.json"
    if screened_path.exists():
        screened = json.loads(screened_path.read_text(encoding="utf-8"))
        n_raw = json.loads((raw_dir / "meta.json").read_text(encoding="utf-8"))["n_raw"]
        print(f"reusing cached pull: {len(screened)} screened of {n_raw} raw")
    else:
        with httpx.Client(timeout=30, headers={"User-Agent": "niche-screener-reg-churn/1.0"},
                          follow_redirects=True) as client:
            items = fetch_consultations(client, raw_dir, months)
            items += fetch_new_sis(client, raw_dir, months)
        n_raw = len(items)
        screened = screen(items)
        screened_path.write_text(json.dumps(screened, indent=2, ensure_ascii=False), encoding="utf-8")
        (raw_dir / "meta.json").write_text(json.dumps({"n_raw": n_raw, "months": months}), encoding="utf-8")
        print(f"pulled {n_raw} raw items, {len(screened)} passed keyword screen -> {screened_path}")
    if limit is not None:
        screened = screened[:limit]
    candidates, rows = emit(screened)
    write_summary(rows, n_raw, len(screened))
    print(f"{len(candidates)} candidates emitted")


def _selfcheck() -> None:
    assert SCREEN_RE.search("New landlord licensing fees for HMOs")
    assert SCREEN_RE.search("Mandatory pension registration threshold")
    assert not SCREEN_RE.search("Departmental annual report and accounts summary of activities")
    assert BANNED_RE.search("Personal Injury discount rate review")
    assert not BANNED_RE.search("Landlord database fees")

    sq = seed_queries_from_title("The Renters' Rights (Landlord Database Fees) Regulations 2026")
    assert sq[0].startswith("the renters")
    assert any("landlord database fees" in q for q in sq)

    items = [
        {"source": "uksi", "title": "Vehicle levy order", "description": "", "url": "u1", "date": "2026-01-01"},
        {"source": "uksi", "title": "Annual report", "description": "", "url": "u2", "date": "2026-01-01"},
    ]
    assert [i["url"] for i in screen(items)] == ["u1"]

    item = {"source": "govuk-consultation", "title": "Landlord Database Fees consultation",
            "description": "Fees for the PRS database", "url": "https://x/y", "date": "2026-05-01"}
    j = {"verdict": "pass", "vertical": "landlord compliance", "population": "2.3m landlords",
         "commencement": "2026-10-01", "money": "fee + penalties", "reason": "r", "accounting_adjacent": True}
    cand = build_candidate(item, j)
    assert cand["candidate_id"] == "landlord-compliance-regchurn-2026-07"
    assert cand["generator"] == "reg-churn"
    assert cand["evidence"][0]["type"] == "consultation"
    assert cand["event_hypothesis"]["date"] == "2026-10-01"
    assert cand["regulatory_gate"] == "unknown"
    assert all(q for q in cand["seed_queries"])
    print("reg_churn self-check OK")


def main() -> None:
    ap = argparse.ArgumentParser(description="Generator 2: regulatory-churn mining")
    ap.add_argument("--months", type=int, default=24)
    ap.add_argument("--limit", type=int, default=None, help="cap screened items fed to emit")
    ap.add_argument("--dry-run", action="store_true", help="print planned pulls, no network")
    ap.add_argument("--selfcheck", action="store_true", help="pure-logic asserts, no network")
    args = ap.parse_args()

    if args.selfcheck:
        _selfcheck()
        return
    if args.dry_run:
        print(f"would pull: {GOVUK_SEARCH} (consultations, last {args.months} months, paginated)")
        print(f"would pull: {LEG_NEW_FEED} (follow next links, cutoff {args.months} months)")
        print(f"raw cache: {RAW_DIR / date.today().isoformat()}")
        print(f"judgments loaded: {len(JUDGMENTS)}")
        return
    run(args.months, args.limit)


if __name__ == "__main__":
    main()
