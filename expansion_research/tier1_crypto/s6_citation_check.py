"""R3 tier1 crypto — Stage 6: fetch + confirm every house-position citation URL is live.

Cloned from tier1_startups_tech/s6_citation_check.py.
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
    # Core HMRC guidance
    "https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-sell-cryptoassets":
        ["Capital Gains Tax", "cryptoassets"],
    "https://www.gov.uk/guidance/check-if-you-need-to-pay-tax-when-you-receive-cryptoassets":
        ["Income Tax", "mining"],
    # CGT rates + AEA
    "https://www.gov.uk/capital-gains-tax/rates":
        ["24%", "18%"],
    "https://www.gov.uk/capital-gains-tax/allowances":
        ["3,000"],
    "https://www.gov.uk/capital-gains-tax/reporting-and-paying-capital-gains-tax":
        ["Self Assessment"],
    "https://www.gov.uk/capital-gains-tax/losses":
        ["losses"],
    "https://www.gov.uk/capital-gains-tax/gifts":
        ["spouse"],
    # Cryptoassets Manual
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual":
        ["Cryptoassets Manual"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22200":
        ["pool"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22250":
        ["same day"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22300":
        ["fork"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto20250":
        ["trade"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21150":
        ["mining"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21200":
        ["staking"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto21250":
        ["airdrop"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto61000":
        ["DeFi", "lending"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22400":
        ["private keys"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22500":
        ["negligible value"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto25000":
        ["Inheritance Tax"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto45000":
        ["VAT"],
    "https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto42000":
        ["employment"],
    # Disclosure / compliance
    "https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets":
        ["disclosure", "cryptoasset"],
    "https://www.gov.uk/guidance/collecting-cryptoasset-user-and-transaction-data":
        ["2026", "cryptoasset"],
    # Trading-status / day-trader / forex content lane
    "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim20205":
        ["badges of trade"],
    "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim22015":
        ["betting"],
    "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg78300":
        ["currency"],
    "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income":
        ["1,000", "trading"],
    # Income tax / SA scaffolding
    "https://www.gov.uk/income-tax-rates":
        ["45%", "40%"],
    "https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return":
        ["tax return"],
    "https://www.gov.uk/register-for-self-assessment":
        ["5 October"],
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
    bad = [u for u, r in out.items() if r.get("status") != 200 or not r.get("phrases_found")]
    print(f"\n{len(out)} checked, {len(bad)} failing/empty: {bad}")


if __name__ == "__main__":
    main()
