"""R3 tier1 hospitality — Stage 6: fetch + confirm every house-position citation URL is live.

Writes raw/citation_checks.json. A position only enters HOUSE_POSITIONS_OUTLINE.md if its
URL passes here. Adapted from pilot_charities/s6_citation_check.py.
"""
import json
import re
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

CITATIONS: dict[str, list[str]] = {
    # Food & catering VAT
    "https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091":
        ["hot", "takeaway", "standard-rated"],
    "https://www.gov.uk/guidance/food-products-and-vat-notice-70114":
        ["zero-rated", "confectionery"],
    "https://www.gov.uk/vat-registration":
        ["90,000", "register"],
    "https://www.gov.uk/vat-flat-rate-scheme":
        ["flat rate"],
    "https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7300":
        ["catering", "12.5"],
    # Tips / tronc
    "https://www.gov.uk/government/publications/e24-tips-gratuities-service-charges-and-troncs":
        ["tronc", "National Insurance"],
    "https://www.gov.uk/government/publications/distributing-tips-fairly-statutory-code-of-practice":
        ["tips", "code of practice"],
    "https://www.gov.uk/tips-at-work":
        ["tips", "tax"],
    # TOMS
    "https://www.gov.uk/guidance/tour-operators-margin-scheme-for-vat-notice-7095":
        ["margin scheme", "tour operator"],
    # AWRS
    "https://www.gov.uk/guidance/the-alcohol-wholesaler-registration-scheme-awrs":
        ["AWRS", "wholesaler"],
    "https://www.gov.uk/guidance/alcohol-duty-rates":
        ["Draught", "duty"],
    "https://www.gov.uk/guidance/alcohol-licensing":
        ["premises licence", "personal licence"],
    "https://www.gov.uk/guidance/machine-games-duty":
        ["Machine Games Duty"],
    # Business rates
    "https://www.gov.uk/apply-for-business-rate-relief/retail-hospitality-and-leisure-relief":
        ["hospitality", "relief"],
    "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief":
        ["12,000", "small business rate relief"],
    # Employment / payroll
    "https://www.gov.uk/national-minimum-wage-rates":
        ["National Living Wage", "21"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027":
        ["15%", "5,000"],
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026":
        ["15%", "5,000"],
    "https://www.gov.uk/employment-status/employee":
        ["employee"],
    # Income/CT & allowances
    "https://www.gov.uk/capital-allowances/annual-investment-allowance":
        ["1 million", "Annual Investment Allowance"],
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "small profits rate"],
    "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax":
        ["Making Tax Digital", "50,000"],
    "https://www.gov.uk/simpler-income-tax-cash-basis":
        ["cash basis"],
    # Guesthouse/B&B adjacency
    "https://www.gov.uk/rent-room-in-your-home/the-rent-a-room-scheme":
        ["7,500", "Rent a Room"],
    # Food business registration / hygiene (ops adjacency)
    "https://www.gov.uk/food-business-registration":
        ["register", "food business"],
    # Data-asset sources
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/search/advanced-company-search":
        ["advanced", "sic"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["56", "Standard industrial classification"],
    # Insolvency stats (asset context)
    "https://www.gov.uk/government/collections/monthly-insolvency-statistics":
        ["insolvency"],
}

UA = "Mozilla/5.0 (compatible; SEOResearchBot/1.0; +https://emplifex.com)"


def main() -> None:
    out = {}
    with httpx.Client(headers={"User-Agent": UA}, follow_redirects=True, timeout=30.0) as c:
        for url, phrases in CITATIONS.items():
            row: dict = {"phrases_expected": phrases}
            try:
                r = c.get(url)
                row["status"] = r.status_code
                row["final_url"] = str(r.url)
                text = r.text
                m = re.search(r"<title[^>]*>(.*?)</title>", text, re.I | re.S)
                row["title"] = re.sub(r"\s+", " ", m.group(1)).strip()[:150] if m else ""
                low = text.lower()
                row["phrases_found"] = [p for p in phrases if p.lower() in low]
            except Exception as e:
                row["status"] = "EXC"
                row["error"] = str(e)
            out[url] = row
            ok = row.get("status") == 200
            print(f"{'OK ' if ok else 'BAD'} {row.get('status')} {url} found={row.get('phrases_found')}")
            time.sleep(0.5)
    (HERE / "raw" / "citation_checks.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
    bad = [u for u, r in out.items() if r.get("status") != 200]
    print(f"\n{len(out)} checked, {len(bad)} failing: {bad}")


if __name__ == "__main__":
    main()
