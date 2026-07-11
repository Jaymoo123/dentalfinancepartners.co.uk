"""R3 tier1 startups — Stage 6: fetch + confirm every house-position citation URL is live.

Cloned from pilot_charities/s6_citation_check.py.
Writes raw/citation_checks.json. A position only enters HOUSE_POSITIONS_OUTLINE.md
if its URL passes here.
"""
import json
import re
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

CITATIONS: dict[str, list[str]] = {
    # R&D — merged scheme + ERIS
    "https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief":
        ["merged scheme", "research and development"],
    "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies":
        ["merged scheme", "20%", "1 April 2024"],
    "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises":
        ["merged scheme", "intensive", "14.5"],
    "https://www.gov.uk/guidance/research-and-development-tax-relief-advance-assurance":
        ["advance assurance"],
    "https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief":
        ["additional information", "R&D"],
    "https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief":
        ["claim notification", "6 months"],
    "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird100000":
        ["R&D"],
    # SEIS
    "https://www.gov.uk/guidance/venture-capital-schemes-apply-to-use-the-seed-enterprise-investment-scheme":
        ["250,000", "advance assurance"],
    "https://www.gov.uk/guidance/seed-enterprise-investment-scheme-background":
        ["50%", "200,000"],
    # EIS
    "https://www.gov.uk/guidance/venture-capital-schemes-apply-for-the-enterprise-investment-scheme":
        ["5 million", "12 million"],
    "https://www.gov.uk/guidance/venture-capital-schemes-tax-relief-for-investors":
        ["30%", "Enterprise Investment Scheme"],
    # Advance assurance
    "https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance":
        ["advance assurance"],
    # EMI
    "https://www.gov.uk/tax-employee-share-schemes/enterprise-management-incentives-emis":
        ["250,000", "Enterprise Management Incentive"],
    "https://www.gov.uk/guidance/submit-your-employment-related-securities-ers-return":
        ["6 July", "employment related securities"],
    "https://www.gov.uk/hmrc-internal-manuals/employee-tax-advantaged-share-scheme-user-manual/etassum52030":
        ["30", "gross assets"],
    # CSOP / unapproved
    "https://www.gov.uk/tax-employee-share-schemes/company-share-option-plan":
        ["60,000", "Company Share Option Plan"],
    "https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm30450":
        ["431", "election"],
    # BADR / CGT
    "https://www.gov.uk/business-asset-disposal-relief":
        ["Business Asset Disposal Relief", "14%"],
    "https://www.gov.uk/capital-gains-tax/rates":
        ["Capital Gains Tax", "24%"],
    # CT + marginal relief
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "19%", "Marginal Relief"],
    "https://www.gov.uk/guidance/corporation-tax-marginal-relief":
        ["Marginal Relief", "250,000"],
    # Dividends + income tax
    "https://www.gov.uk/tax-on-dividends":
        ["dividend", "500"],
    # Employer NIC + Employment Allowance
    "https://www.gov.uk/national-insurance-rates-letters":
        ["15%"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    # VAT registration
    "https://www.gov.uk/register-for-vat":
        ["90,000"],
    # Share-for-share / reorganisations
    "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg52521":
        ["135", "exchange"],
    # Pre-trading expenditure
    "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46351":
        ["seven years", "pre-trading"],
    # Off-payroll (defer to sibling site)
    "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35":
        ["off-payroll", "IR35"],
    # Loss relief
    "https://www.gov.uk/guidance/corporation-tax-calculating-and-claiming-a-loss":
        ["loss", "carry forward"],
    # Data asset sources
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://developer.company-information.service.gov.uk/":
        ["API"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["SIC", "62"],
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
