"""R3 tier1 manufacturing — Stage 6: fetch + confirm every house-position citation URL is live.

Writes raw/citation_checks.json. A position only enters HOUSE_POSITIONS_OUTLINE.md if its
URL passes here. Adapted from tier1_care/s6_citation_check.py.
"""
import json
import re
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

CITATIONS: dict[str, list[str]] = {
    # Capital allowances — FA 2026 ground truth (WDA 18->14 s.28, 40% FYA s.29, special 6%)
    "https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted":
        ["writing-down allowances", "14%"],
    "https://www.legislation.gov.uk/ukpga/2026/11/section/29/enacted":
        ["first-year allowance", "40%"],
    "https://www.gov.uk/capital-allowances/annual-investment-allowance":
        ["1 million", "Annual Investment Allowance"],
    "https://www.gov.uk/work-out-capital-allowances/rates-and-pools":
        ["writing down", "main rate"],
    "https://www.gov.uk/capital-allowances/full-expensing":
        ["full expensing", "100%"],
    "https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings":
        ["Structures and Buildings", "3%"],
    # R&D relief (merged scheme) + Patent Box
    "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies":
        ["merged scheme", "expenditure credit"],
    "https://www.gov.uk/guidance/corporation-tax-research-and-development-rd-relief":
        ["Research and Development", "relief"],
    "https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief":
        ["claim notification", "6 months"],
    "https://www.gov.uk/guidance/corporation-tax-the-patent-box":
        ["Patent Box", "10%"],
    # Corporation tax
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "small profits rate"],
    # Employer payroll ground truth (NIC 15%/GBP5,000; Employment Allowance 10,500)
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027":
        ["15%", "5,000"],
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026":
        ["15%", "5,000"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    "https://www.gov.uk/expenses-and-benefits-business-travel-mileage":
        ["mileage", "approved"],
    "https://www.gov.uk/national-minimum-wage-rates":
        ["National Living Wage", "21"],
    # Apprenticeship levy (factory workforce)
    "https://www.gov.uk/guidance/pay-apprenticeship-levy":
        ["0.5%", "3 million"],
    # VAT — exports / imports
    "https://www.gov.uk/vat-registration":
        ["90,000", "register"],
    "https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703":
        ["zero rate", "export"],
    "https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return":
        ["postponed", "import VAT"],
    # Customs / trade / CBAM
    "https://www.gov.uk/guidance/using-inward-processing-to-process-or-repair-your-goods":
        ["inward processing"],
    "https://www.gov.uk/government/publications/factsheet-carbon-border-adjustment-mechanism-cbam/factsheet-carbon-border-adjustment-mechanism":
        ["carbon border adjustment mechanism", "2027"],
    # Stock/WIP accounting standard
    "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/":
        ["FRS 102"],
    # CGT / sale of business
    "https://www.gov.uk/business-asset-disposal-relief":
        ["Business Asset Disposal Relief", "1 million"],
    "https://www.gov.uk/capital-gains-tax/rates":
        ["Capital Gains Tax", "24%"],
    # Dividends ground truth (FA 2026 s.4)
    "https://www.legislation.gov.uk/ukpga/2026/11/section/4/enacted":
        ["dividend"],
    "https://www.gov.uk/tax-on-dividends":
        ["dividend allowance", "500"],
    # Business rates (factory premises) + energy intensive industries
    "https://www.gov.uk/introduction-to-business-rates":
        ["rateable value"],
    "https://www.gov.uk/government/publications/uk-emissions-trading-scheme-and-carbon-price-support-apply-for-compensation/compensation-for-the-indirect-costs-of-the-uk-ets-and-the-cps-mechanism-guidance-for-applicants":
        ["energy intensive"],
    # MTD
    "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax":
        ["Making Tax Digital", "50,000"],
    # Data-asset feasibility sources
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["Manufacture", "71121"],
    "https://www.gov.uk/government/collections/monthly-insolvency-statistics":
        ["insolvency"],
    "https://www.ons.gov.uk/businessindustryandtrade/manufacturingandproductionindustry":
        ["manufacturing"],
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
