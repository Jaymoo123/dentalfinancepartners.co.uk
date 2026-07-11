"""R3 tier1 pharmacies — Stage 6: fetch + confirm every house-position citation URL is live.

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
    # VAT — the pharmacy signature topic
    "https://www.gov.uk/guidance/health-professionals-pharmaceutical-products-and-vat-notice-70157":
        ["zero-rated", "prescription", "pharmacist"],
    "https://www.gov.uk/guidance/partial-exemption-vat-notice-706":
        ["partial exemption", "de minimis"],
    "https://www.gov.uk/hmrc-internal-manuals/vat-retail-schemes":
        ["retail scheme"],
    "https://www.gov.uk/vat-registration":
        ["90,000", "register"],
    # Locum pharmacist status / IR35
    "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm4270":
        ["pharmacist", "locum"],
    "https://www.gov.uk/guidance/understanding-off-payroll-working-ir35":
        ["off-payroll", "intermediary"],
    "https://www.gov.uk/guidance/check-employment-status-for-tax":
        ["employment status"],
    "https://www.gov.uk/employment-status/selfemployed-contractor":
        ["self-employed"],
    # Buying / selling — goodwill, CGT, SDLT, BADR
    "https://www.gov.uk/business-asset-disposal-relief":
        ["Business Asset Disposal Relief", "14%"],
    "https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets":
        ["goodwill", "relief"],
    "https://www.gov.uk/capital-gains-tax/rates":
        ["Capital Gains Tax", "24%"],
    "https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates":
        ["non-residential", "5%"],
    "https://www.gov.uk/guidance/stamp-duty-on-shares":
        ["0.5%", "shares"],
    # Capital allowances — fit-out
    "https://www.gov.uk/capital-allowances/annual-investment-allowance":
        ["1 million", "Annual Investment Allowance"],
    "https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings":
        ["structures and buildings", "3%"],
    "https://www.gov.uk/work-out-capital-allowances/rates-and-pools":
        ["writing down", "main rate"],
    # CT / income tax / payroll
    "https://www.gov.uk/corporation-tax-rates":
        ["25%", "small profits rate"],
    "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027":
        ["15%", "5,000"],
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance"],
    "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax":
        ["Making Tax Digital", "50,000"],
    "https://www.gov.uk/simpler-income-tax-cash-basis":
        ["cash basis"],
    # NHS contract / dispensing economics
    "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/drug-tariff":
        ["Drug Tariff"],
    "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/submitting-prescriptions":
        ["FP34"],
    "https://www.england.nhs.uk/community-pharmacy-contractual-framework/":
        ["Community Pharmacy Contractual Framework"],
    "https://www.england.nhs.uk/primary-care/pharmacy/pharmacy-services/pharmacy-first/":
        ["Pharmacy First"],
    "https://www.legislation.gov.uk/uksi/2013/349/contents":
        ["Pharmaceutical Services", "2013"],
    # Regulator (ownership/superintendent context)
    "https://www.pharmacyregulation.org/pharmacies":
        ["pharmac"],
    # Data-asset sources
    "https://opendata.nhsbsa.net/":
        ["Open Data", "NHSBSA"],
    "https://www.nhsbsa.nhs.uk/prescription-data/dispensing-data/dispensing-contractors-data":
        ["dispensing contractors"],
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    "https://resources.companieshouse.gov.uk/sic/":
        ["47730", "Standard industrial classification"],
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
