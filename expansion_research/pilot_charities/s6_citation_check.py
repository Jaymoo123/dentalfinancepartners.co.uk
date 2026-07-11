"""R3 pilot charities — Stage 6: fetch + confirm every house-position citation URL is live.

Writes raw/citation_checks.json: {url: {status, final_url, title, matched_phrases}}.
A position only enters HOUSE_POSITIONS_OUTLINE.md if its URL passes here.
"""
import json
import re
import time
from pathlib import Path

import httpx

HERE = Path(__file__).parent

# url -> phrases we expect on the page (case-insensitive; any-match recorded per phrase)
CITATIONS: dict[str, list[str]] = {
    # Charity Commission / gov.uk accounting + examination
    "https://www.gov.uk/guidance/charity-reporting-and-accounting-the-essentials-november-2016-cc15d":
        ["independent examination", "audit", "1 million"],
    "https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31":
        ["independent examination", "25,000"],
    "https://www.gov.uk/guidance/prepare-a-charity-annual-return":
        ["annual return", "10,000"],
    "https://www.gov.uk/guidance/how-to-register-your-charity-cc21b":
        ["5,000", "register"],
    "https://www.gov.uk/government/publications/charity-commission-guidance-charities-act-2022":
        ["Charities Act 2022"],
    "https://www.gov.uk/guidance/charities-act-2022-implementation-plan":
        ["Charities Act 2022", "permanent endowment"],
    # HMRC charity tax
    "https://www.gov.uk/charities-and-tax":
        ["tax relief", "charit"],
    "https://www.gov.uk/claim-gift-aid":
        ["Gift Aid", "25p"],
    "https://www.gov.uk/claim-gift-aid/small-donations-scheme":
        ["small donations", "8,000"],
    "https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations":
        ["GASDS", "30"],
    "https://www.gov.uk/guidance/charities-and-trading":
        ["trading", "80,000"],
    "https://www.gov.uk/vat-charities":
        ["VAT", "charit"],
    "https://www.gov.uk/guidance/vat-reliefs-for-charities-notice-7011":
        ["relief", "advertis"],
    "https://www.gov.uk/apply-for-business-rate-relief/charitable-rate-relief":
        ["80%", "relief"],
    "https://www.gov.uk/guidance/gift-aid-what-donations-charities-and-cascs-can-claim-on":
        ["Gift Aid", "benefit"],
    "https://www.gov.uk/tax-relief-charity-donations":
        ["higher rate", "Gift Aid"],
    "https://www.gov.uk/government/publications/charities-detailed-guidance-notes/chapter-3-gift-aid":
        ["Gift Aid", "declaration"],
    # CIC regulator
    "https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies":
        ["community interest compan"],
    "https://www.gov.uk/government/publications/community-interest-companies-annual-reports":
        ["CIC34", "annual"],
    "https://www.gov.uk/government/publications/community-interest-companies-chapter-6-the-asset-lock":
        ["asset lock"],
    # Structures
    "https://www.gov.uk/guidance/charity-types-how-to-choose-a-structure":
        ["charitable incorporated organisation", "structure"],
    # SORP
    "https://www.charitysorp.org/":
        ["SORP"],
    "https://www.gov.uk/government/news/critical-updates-to-charity-accounting-rules-published":
        ["SORP"],
    # OSCR (Scotland)
    "https://www.oscr.org.uk/guidance-and-forms/independent-examination-guidance/":
        ["independent examination"],
    # Data sources for the research asset
    "https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download":
        ["download", "register"],
    "https://download.companieshouse.gov.uk/en_output.html":
        ["download", "company"],
    # Fundraising events VAT/tax exemption
    "https://www.gov.uk/guidance/charity-fundraising-events-exemptions":
        ["fundraising", "exempt"],
    # Employment Allowance (charity payroll)
    "https://www.gov.uk/claim-employment-allowance":
        ["Employment Allowance", "10,500"],
    # Retail Gift Aid (charity shops)
    "https://www.gov.uk/government/publications/charities-detailed-guidance-notes/chapter-3-gift-aid#chapter-342-standard-method-of-operating-the-retail-gift-aid-process":
        ["retail gift aid"],
    # Gift Aid declarations
    "https://www.gov.uk/guidance/gift-aid-declarations-claiming-tax-back-on-donations":
        ["declaration"],
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
