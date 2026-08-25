"""Stage 8: all-estate GSC cannibalisation + natural-host sweep.
Pulls query-dimension GSC for every owned property, then checks which sites already
rank for each candidate cluster stem. Shows inter-site overlap + the natural host.
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from datetime import date, timedelta

sys.path.insert(0, "C:/Users/user/Documents/Accounting")
from agents.utils.gsc_client_oauth import GSCClient  # noqa: E402

SITES = [
    "sc-domain:hollowaydavies.co.uk", "sc-domain:trusteetax.co.uk",
    "sc-domain:propertytaxpartners.co.uk", "sc-domain:dentalfinancepartners.co.uk",
    "sc-domain:tradetaxspecialists.co.uk", "sc-domain:carehometax.co.uk",
    "sc-domain:contractortaxaccountants.co.uk", "sc-domain:ecommercefinance.co.uk",
    "sc-domain:medicalaccounts.co.uk", "sc-domain:foundertaxpartners.co.uk",
    "sc-domain:agencyfounderfinance.co.uk", "sc-domain:hospitalitytax.co.uk",
    "sc-domain:pharmacytax.co.uk", "sc-domain:cryptotaxpartners.co.uk",
    "sc-domain:accountsforlawyers.co.uk",
]

STEMS = {
    "bridging": r"bridging",
    "development finance": r"development finance|development loan",
    "commercial mortgage": r"commercial mortgage",
    "invoice finance/factoring": r"invoice financ|factoring|invoice discount",
    "asset finance": r"asset finance",
    "business loan/unsecured": r"business loan|unsecured (business )?loan|working capital",
    "vat/tax loan": r"vat loan|tax loan|corporation tax loan",
    "merchant cash advance": r"merchant cash|cash advance",
    "capital allowances": r"capital allowance",
    "r&d tax": r"r&d|research and development tax|rd tax",
    "land remediation": r"land remediation",
    "EOT/employee ownership": r"employee ownership|\beot\b",
    "management buyout": r"management buyout|\bmbo\b",
    "business valuation/sale": r"business valuation|sell (my|a) business|value a business|selling a business",
    "van/plant finance": r"van finance|plant finance|digger|excavator|equipment finance",
    "cis rebate": r"cis (tax )?rebate|cis refund",
    "buy to let mortgage": r"buy to let mortgage|btl mortgage",
    "spv/ltd-co btl": r"\bspv\b|limited company buy to let|ltd company",
    "dental practice finance": r"dental practice (finance|loan)|goodwill.*dental|dental.*goodwill",
}


def short(site: str) -> str:
    return site.replace("sc-domain:", "").replace(".co.uk", "")


def fetch(client, site):
    end = date.today(); start = end - timedelta(days=120)
    try:
        resp = client.service.searchanalytics().query(siteUrl=site, body={
            "startDate": start.isoformat(), "endDate": end.isoformat(),
            "dimensions": ["query"], "rowLimit": 25000}).execute()
    except Exception as e:  # noqa: BLE001
        print(f"  {short(site)}: ERROR {str(e)[:80]}")
        return []
    return [(r["keys"][0].lower(), r.get("impressions", 0), round(r.get("position", 0), 1))
            for r in resp.get("rows", [])]


def main():
    client = GSCClient()
    corpus = {}
    for s in SITES:
        rows = fetch(client, s)
        corpus[short(s)] = rows
        print(f"  {short(s):<26} {len(rows)} queries")

    print("\n" + "=" * 90)
    print(f"{'cluster stem':<28}{'sites already ranking (impressions, best pos)':<62}")
    print("=" * 90)
    for label, rx in STEMS.items():
        pat = re.compile(rx, re.I)
        hits = []
        for site, rows in corpus.items():
            matched = [(q, i, p) for q, i, p in rows if pat.search(q)]
            if matched:
                impr = sum(m[1] for m in matched)
                bestpos = min(m[2] for m in matched)
                hits.append((impr, site, len(matched), bestpos))
        hits.sort(reverse=True)
        if hits:
            desc = "  ".join(f"{s}({im}i/{n}q/p{bp})" for im, s, n, bp in hits[:5])
        else:
            desc = "-- NONE (fully net-new to estate) --"
        print(f"{label:<28}{desc}")


if __name__ == "__main__":
    main()
