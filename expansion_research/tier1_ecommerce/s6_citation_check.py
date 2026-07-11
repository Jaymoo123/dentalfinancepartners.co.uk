"""R3 tier1 ecommerce — Stage 6: fetch + confirm every house-position citation URL is live.

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
    # VAT — registration + schemes
    "https://www.gov.uk/vat-registration":
        ["90,000", "register"],
    "https://www.gov.uk/vat-flat-rate-scheme":
        ["Flat Rate", "16.5"],
    "https://www.gov.uk/vat-margin-schemes":
        ["margin", "second-hand"],
    # Marketplace-collected VAT + imports (the technical core of the niche)
    "https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces":
        ["online marketplace", "135"],
    "https://www.gov.uk/guidance/vat-and-overseas-goods-sold-directly-to-customers-in-the-uk":
        ["135", "consignment"],
    "https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return":
        ["import VAT", "postponed"],
    "https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703":
        ["zero-rate", "export"],
    "https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a":
        ["place of supply", "reverse charge"],
    # EU-side schemes as they apply to UK/NI sellers
    "https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme":
        ["Import One Stop Shop", "150"],
    "https://www.gov.uk/guidance/register-to-report-and-pay-vat-on-distance-sales-of-goods-from-northern-ireland-to-the-eu":
        ["One Stop Shop", "Northern Ireland"],
    "https://www.gov.uk/eori":
        ["EORI", "import"],
    # HMRC visibility of sellers — platform reporting + side-hustle campaign
    "https://www.gov.uk/guidance/reporting-rules-for-digital-platforms":
        ["digital platform", "report"],
    "https://www.gov.uk/guidance/check-if-you-need-to-tell-hmrc-about-your-income-from-online-platforms":
        ["online", "tell HMRC"],
    "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income":
        ["1,000", "trading"],
    # Income tax / structure
    "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax":
        ["Making Tax Digital", "50,000"],
    "https://www.gov.uk/simpler-income-tax-cash-basis":
        ["cash basis"],
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "small profits rate"],
    "https://www.gov.uk/tax-on-dividends":
        ["dividend", "allowance"],
    "https://www.legislation.gov.uk/ukpga/2026/11/section/4/enacted":
        ["dividend"],
    # Capital allowances — FA 2026 ground truth
    "https://www.gov.uk/capital-allowances/annual-investment-allowance":
        ["1 million", "Annual Investment Allowance"],
    "https://www.gov.uk/work-out-capital-allowances/rates-and-pools":
        ["writing down", "main rate"],
    "https://www.legislation.gov.uk/ukpga/2026/11/section/28/enacted":
        ["writing-down"],
    "https://www.legislation.gov.uk/ukpga/2026/11/section/29/enacted":
        ["first-year"],
    # Payroll / NIC / mileage ground truth
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027":
        ["15%", "5,000"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    "https://www.gov.uk/expenses-and-benefits-business-travel-mileage":
        ["mileage", "approved"],
    # Stock / inventory valuation
    "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115":
        ["stock", "valuation"],
    # Exit / CGT
    "https://www.gov.uk/business-asset-disposal-relief":
        ["Business Asset Disposal Relief", "1 million"],
    # Data-asset feasibility sources
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["47910", "Standard industrial classification"],
    "https://www.gov.uk/government/collections/monthly-insolvency-statistics":
        ["insolvency"],
    "https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi":
        ["internet", "retail"],
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
