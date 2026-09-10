"""High-street map, Leg 9: measured demand for the MECHANICS. PAID (~$0.10 per mechanic).

Legs 1 to 8 measured demand under trade names and found there is almost none: 157 of
176 trades have no measurable volume on "<trade> accountant". The demand sits on the
tax mechanic instead, and that is what a page would have to be built around.

So this leg measures the mechanics directly. keyword_suggestions returns every keyword
CONTAINING the seed phrase, with volume attached, which is exactly the question set a
mechanic page would have to answer.

The number of distinct priced questions per mechanic is the page count for that
mechanic. It is measured, not estimated.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT))

from dotenv import load_dotenv

load_dotenv(ROOT / ".env")

from optimisation_engine.clients.dataforseo_client import DataForSEOClient

OUT = HERE / "raw" / "mechanic"
LIMIT = 700

# The phrase a person actually types when they hit this mechanic. One seed per
# mechanic, chosen to be the phrase the whole question family contains.
SEEDS: dict[str, str] = {
    "food-vat-boundary": "vat on food",
    "cis-construction": "construction industry scheme",
    "health-exemption": "vat exemption",
    "margin-scheme": "vat margin scheme",
    "excise-duty": "alcohol duty",
    "gambling-duty": "machine games duty",
    "zero-rated-goods": "zero rated vat",
    "welfare-care-exemption": "vat exemption charity",
    "education-exemption": "vat on education",
    "funeral-exemption": "funeral costs",
    "sports-club-exemption": "vat on membership",
    "finance-insurance-exemption": "insurance premium tax",
    "land-property-exemption": "option to tax property",
    "supply-and-fit": "vat on labour",
    "passenger-transport": "vat on transport",
    "vehicle-trade": "vat on cars",
    "printed-matter": "vat on printing",
    "creative-reliefs": "theatre tax relief",
    "rd-credits": "r&d tax credits",
    "agriculture-apr": "agricultural property relief",
    "agent-vs-principal": "agent or principal",
    "chair-room-rental": "rent a chair",
    "tronc-tips": "tronc scheme",
    "household-employer": "nanny tax",
    "employment-status-ir35": "ir35 rules",
    "place-of-supply": "vat place of supply",
    "cash-business": "cash basis",
    "stock-and-wip": "retail scheme",
    "professional-practice": "partnership tax return",
    "licensed-premises": "employment status",
}

KEEP_RE = re.compile(
    r"\btax|\bvat\b|hmrc|account|bookkeep|duty|duties|relief|allowance|expense|"
    r"deduct|payroll|paye|\bnic\b|self.?assessment|invoice|profit|turnover|"
    r"threshold|scheme|\bcis\b|corporation|dividend|ir35|margin|exempt|"
    r"zero.?rated|claim|rebate|sole trader|limited company|incorporat|return",
    re.I)

JUNK_RE = re.compile(
    r"\bjobs?\b|salary|vacanc|career|\bcourse\b|degree|diploma|qualification|"
    r"australia|\bcanada\b|\busa\b|\bindia\b|dubai|\bgst\b|\birs\b|\bnz\b|"
    r"login|quickbooks|\bxero\b|\bsage\b|calculator app|\bexam\b", re.I)


# A seed phrase catches homonyms: "alcohol duty" also catches duty-free shopping,
# and "vat exemption" also catches the disabled-persons relief, which is a different
# mechanic wearing the same words. Each of these is excluded where it was observed.
EXCLUDE: dict[str, str] = {
    "excise-duty": r"duty.?free|airport|easyjet|ryanair|flight|holiday|"
                   r"allowance from|bringing|border|abroad|ferry|cruise",
    "health-exemption": r"disabled|disability|wheelchair|mobility|blind|"
                        r"chronic (sick|illness)|charity funded",
    "vehicle-trade": r"road tax|car tax|tax my|tax disc|company car (benefit|tax)|"
                     r"electric car tax|classic car",
    "cash-business": r"cash flow|cash isa|cashback|petty cash",
    "professional-practice": r"partnership (agreement|deed)|civil partnership|"
                             r"limited liability partnership registration",
    "employment-status-ir35": r"status determination statement template|"
                              r"ir35 calculator app",
    "household-employer": r"nanny cam|nanny share cost|nanny agency fee",
    "stock-and-wip": r"stock market|share dealing|stocks and shares",
    "land-property-exemption": r"council tax|stamp duty (calculator|refund)",
    "agriculture-apr": r"annual percentage rate|apr credit|loan apr",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    client = DataForSEOClient()
    spent = 0.0
    summary = []

    for mech, seed in SEEDS.items():
        dest = OUT / f"{mech}.json"
        if dest.exists():
            body = json.loads(dest.read_text(encoding="utf-8"))["body"]
        else:
            try:
                # ponytail: site_key=None - api_cost_log.site_key FKs public.sites.
                body = client.keyword_suggestions(
                    site_key=None, seed_keyword=seed, limit=LIMIT)
            except Exception as e:  # noqa: BLE001
                print(f"[{mech}] FAILED: {e}", flush=True)
                continue
            spent += float(body.get("cost", 0.0))
            dest.write_text(json.dumps({"mechanic": mech, "seed": seed, "body": body}),
                            encoding="utf-8")

        res = body["tasks"][0].get("result") or [{}]
        items = (res[0] or {}).get("items") or []
        rows = []
        seen_ms: set[str] = set()
        for it in items:
            kw = it.get("keyword") or ""
            if JUNK_RE.search(kw) or not KEEP_RE.search(kw):
                continue
            ex = EXCLUDE.get(mech)
            if ex and re.search(ex, kw, re.I):
                continue
            ki = it.get("keyword_info") or {}
            vol = ki.get("search_volume") or 0
            if vol:
                # C3 close-variant rule: identical 12-month arrays are one group
                key = json.dumps([(m.get("year"), m.get("month"), m.get("search_volume"))
                                  for m in ki.get("monthly_searches") or []])
                if key in seen_ms:
                    continue
                seen_ms.add(key)
            rows.append({"kw": kw, "vol": vol,
                         "kd": (it.get("keyword_properties") or {}).get(
                             "keyword_difficulty")})

        live = [r for r in rows if r["vol"]]
        live.sort(key=lambda r: -r["vol"])
        summary.append({
            "mechanic": mech,
            "seed": seed,
            "returned": len(items),
            "relevant": len(rows),
            "priced_questions": len(live),
            "volume": sum(r["vol"] for r in live),
            "top": live[:12],
        })
        print(f"{mech:<28} {len(live):>4} questions  {sum(r['vol'] for r in live):>7}/mo",
              flush=True)

    summary.sort(key=lambda s: -s["volume"])
    (HERE / "mechanic_demand.json").write_text(
        json.dumps(summary, indent=1), encoding="utf-8")
    print(f"\nDONE. ${spent:.4f} spent. "
          f"Total measured question volume: "
          f"{sum(s['volume'] for s in summary):,}/mo across "
          f"{sum(s['priced_questions'] for s in summary)} distinct questions.")


if __name__ == "__main__":
    main()
