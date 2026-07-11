"""R3 tier1 care — Stage 6: fetch + confirm every house-position citation URL is live.

Writes raw/citation_checks.json. A position only enters HOUSE_POSITIONS_OUTLINE.md if its
URL passes here. Adapted from tier1_hospitality/s6_citation_check.py.
"""
import json
import re
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

CITATIONS: dict[str, list[str]] = {
    # VAT — welfare exemption + grouping litigation state
    "https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012":
        ["welfare", "exempt", "state-regulated"],
    "https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2025-the-use-of-vat-grouping-within-the-care-industry/use-of-vat-grouping-within-the-care-industry":
        ["VAT grouping", "care"],
    "https://www.gov.uk/vat-registration":
        ["90,000", "register"],
    "https://www.gov.uk/guidance/partial-exemption-vat-notice-706":
        ["partial exemption"],
    # NMW / sleep-ins / travel time
    "https://www.gov.uk/national-minimum-wage-rates":
        ["National Living Wage", "21"],
    "https://www.gov.uk/guidance/calculating-the-minimum-wage/working-hours-for-which-the-minimum-wage-must-be-paid":
        ["sleep-in", "travelling"],
    "https://www.supremecourt.uk/cases/uksc-2018-0160":
        ["Mencap", "Tomlinson-Blake"],
    # Employer NIC / payroll ground truth
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027":
        ["15%", "5,000"],
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026":
        ["15%", "5,000"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    "https://www.gov.uk/expenses-and-benefits-business-travel-mileage":
        ["mileage", "approved"],
    # Immigration / care workforce
    "https://www.gov.uk/health-care-worker-visa/eligibility":
        ["care", "visa"],
    "https://www.gov.uk/uk-visa-sponsorship-employers":
        ["sponsor licence"],
    # Capital allowances / CT
    "https://www.gov.uk/capital-allowances/annual-investment-allowance":
        ["1 million", "Annual Investment Allowance"],
    "https://www.gov.uk/work-out-capital-allowances/rates-and-pools":
        ["writing down", "main rate"],
    "https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings":
        ["Structures and Buildings", "3%"],
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "small profits rate"],
    # CGT / sale
    "https://www.gov.uk/business-asset-disposal-relief":
        ["Business Asset Disposal Relief", "1 million"],
    "https://www.gov.uk/capital-gains-tax/rates":
        ["Capital Gains Tax", "24%"],
    # Business rates
    "https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief":
        ["12,000", "small business rate relief"],
    "https://www.gov.uk/introduction-to-business-rates":
        ["rateable value"],
    # MTD / cash basis
    "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax":
        ["Making Tax Digital", "50,000"],
    # CQC — registration, oversight, data downloads (data-asset feasibility)
    "https://www.cqc.org.uk/guidance-providers/registration":
        ["register", "provider"],
    "https://www.cqc.org.uk/guidance-providers/registration/financial-viability-statements":
        ["financial viability"],
    "https://www.cqc.org.uk/about-us/transparency/using-cqc-data":
        ["data", "download"],
    "https://www.cqc.org.uk/guidance-providers/market-oversight":
        ["market oversight"],
    # Funding mix — FNC / CHC / LA
    "https://www.gov.uk/government/news/better-community-care-thanks-to-nursing-funding-boost":
        ["nursing", "267.68"],
    "https://www.gov.uk/government/publications/national-framework-for-nhs-continuing-healthcare-and-nhs-funded-nursing-care":
        ["continuing healthcare"],
    "https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2024-to-2025":
        ["market sustainability"],
    "https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance":
        ["care and support"],
    # Data-asset backup sources
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["87", "Standard industrial classification"],
    "https://www.gov.uk/government/collections/monthly-insolvency-statistics":
        ["insolvency"],
    # Skills for Care workforce data (asset context)
    "https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx":
        ["workforce"],
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
