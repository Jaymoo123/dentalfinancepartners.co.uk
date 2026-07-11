"""R3 tier1 manufacturing — build competitors.json from verify evidence + Claude tier judgments.

Tier judgments made 2026-07-12 from raw/verify_evidence.json (fetch) plus live web
search where our fetch was bot-blocked (verified_via: search).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "skynetaccounting.co.uk": ("Whole brand is manufacturing/engineering-only. Homepage title 'Accountants For Manufacturing & Engineering Business Owners'; H1 'Driving Manufacturing Profit'; services = product costing accountant, manufacturing efficiency audit, virtual finance office for factory owners. Service page H1 'Manufacturing Accountant For Factory Owners'.", "fetch"),
}

SECTION = {
    # fetch-verified sector pages
    "chandlerandpartners.co.uk": "Worcester chartered firm; /industries/accountants-for-manufacturing-services page ('Manufacturing Accountants | Expert Accounting Services for UK Manufacturers'). 10 queries hit in our sweep.",
    "rousepartners.co.uk": "Award-winning Buckinghamshire firm; /manufacturing-accountants page, work 'led by a partner experienced in the manufacturing sector'. 6 queries hit.",
    "strivex.co.uk": "£1m-£15m-turnover specialist firm; sector nav includes Engineering & Industrial AND Manufacturing; /engineering-industrial/ H1 'Accountants for Engineering & Industrial Companies'. 6 queries hit.",
    "ac-accounts.co.uk": "A&C Chartered Accountants Manchester; /sectors/manufacturing-accountants/ H1 'Manufacturing Accountants'; family firm claiming decades in the sector. 6 queries hit.",
    "bhp.co.uk": "BHP Yorkshire (major regional); /specialist-teams/manufacturing/ team page + R&D/patent-box service pages. 5 queries hit.",
    "davidhoward.co.uk": "Surrey chartered firm; /industrial-manufacturing 'Accountants for Manufacturers' page. 4 queries hit.",
    "cottonsgroup.com": "Cottons Group (London/Northampton); /sectors/engineering-automotive/ + /sectors/manufacturing/ pages. 3 queries hit.",
    "braant.co.uk": "London firm; /who-we-support/manufacturing/ 'Accountants for Manufacturers' (stock, costing, R&D, payroll). 3 queries hit.",
    "parsons.co.uk": "Parsons Chartered Accountants; /sectors/manufacturing/ page (management reporting, cost analysis for manufacturers). 2 queries hit.",
    "sumer.co.uk": "Sumer Group (national SME consolidator); /sectors/manufacturers/ page. 2 queries hit.",
    "bryden-johnson.co.uk": "Croydon chartered firm; /manufacturing-transport-logistics-accountants/ page. 2 queries hit.",
    "smithbutler.co.uk": "Bradford firm; /sectors/accountants-for-manufacturing-companies/ page. 1 query hit.",
    "ross-brooke.co.uk": "UHY Ross Brooke (Newbury/Swindon); /sectors-we-help/accountants-for-manufacturing-engineering-companies page. 1 query hit.",
    "rickardluckin.co.uk": "Essex chartered firm; /sectors/manufacturing page. 1 query hit.",
    "leesaccountants.co.uk": "Norwich/London firm; /Sector/Manufacturing page. 1 query hit.",
    "knowleswarwick.com": "Sheffield firm; /who-we-help/engineering-accountants/ page. 1 query hit.",
    "eqaccountants.co.uk": "EQ Chartered Accountants (Scotland); /sectors/engineering-manufacturing/ page. 1 query hit.",
    "ensors.co.uk": "Ensors (East Anglia, large regional); /sectors/manufacturing-engineering/ page. 1 query hit.",
    "forrester-boyd.co.uk": "Lincolnshire chartered firm; /industrial-and-infrastructure/accountants-for-manufacturing page. 1 query hit.",
    "ctmp.co.uk": "Croydon chartered firm; /sectors/manufacturing page. 1 query hit.",
    "edwardsaccountants.co.uk": "Walsall firm; /industries/manufacturing-engineering/ page + capital-allowances service page. 2 queries hit.",
    "duncantoplis.co.uk": "Duncan & Toplis (East Midlands, large regional); /sectors/manufacturing-and-engineering/ specialist page. 1 query hit.",
    "aab.uk": "AAB group (national); /sectors/industrial-manufacturing/ page. Also seen in care + hospitality sweeps.",
    "mollan.co.uk": "York firm; /accountants-for-engineers/ page. 3 queries hit.",
    "auditox-accountancy.uk": "SEO-led online firm; /accountants-for-engineers/ page. Multi-niche programmatic player also seen in care + hospitality sweeps.",
    "numericaccounting.co.uk": "Salisbury/Southampton firm; /sectors/manufacturing/ 'dedicated manufacturing accounting team'. 1 query hit.",
    "insight-sa.com": "UK audit firm; /specialism/manufacturing page. 1 query hit.",
    "pearllemonaccountants.co.uk": "SEO-led firm; manufacturing services page + 'Top 10 UK Manufacturing Accountants' listicle it ranks with. Own fetch 403; live search 2026-07-12.",
    # bot-blocked, recovered by live search 2026-07-12
    "lanop.co.uk": "Own fetch 403. Live search 2026-07-12: /accounting-for-engineer/ 'Accountants for Engineers & Engineering Firms UK' (R&D, CIS, VAT). 5 queries hit — top engineering-accountant SEO player in our sweep.",
    "pkf-francisclark.co.uk": "Own fetch 403. Live search 2026-07-12: /sectors/accountants-for-manufacturing/ — 'more than 300 manufacturing and engineering businesses' as clients, dedicated team. 3 queries hit.",
    "mha.co.uk": "Own fetch 403. Live search 2026-07-12: /industries/manufacturing-distribution/manufacturing-engineering — national top-15 firm with 'specialist teams of manufacturing and engineering accountants'. 1 query hit.",
    "williamsoncroft.co.uk": "DDG returned a mangled domain string; live search 2026-07-12: /manufacturing/ 'Manufacturing Accountants | Sectors | Williamson & Croft' (Manchester/Liverpool).",
    # search-surfaced additions (rank-relevant, not in our DDG top-10s)
    "streets.uk": "Live search 2026-07-12: /sectors/manufacturing-accounting/ 'Manufacturing Accounting and Advisers for Engineering Services' (national top-40 firm).",
    "hurst.co.uk": "Live search 2026-07-12: /sectors/manufacturing-engineering — 'specialist advisors to many of the UK's foremost manufacturing and engineering businesses... since 1982'.",
    "azets.co.uk": "Live search 2026-07-12: /who-we-help/sectors/engineering-and-manufacturing/ (national top-10 SME firm).",
    "ljsaccountingservices.com": "Live search 2026-07-12: /sectors/manufacturing/ 'Accountants For Manufacturing' (Liverpool firm).",
    "bsassociate.co.uk": "Live search 2026-07-12: /manufacturing-companies.php 'Accountants for Manufacturing Industries, Factory'.",
}

out = []
for dom, (why, src) in DEDICATED.items():
    r = ev.get(dom, {})
    out.append({"domain": dom, "tier": "DEDICATED", "verified_via": src,
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title"),
                "service_page": (r.get("service_page") or {}).get("url")})
for dom, why in SECTION.items():
    r = ev.get(dom, {})
    src = "search" if ("live search" in why or "Live search" in why) else "fetch"
    out.append({"domain": dom, "tier": "SECTION", "verified_via": src,
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title"),
                "service_page": (r.get("service_page") or {}).get("url")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-12", "dedicated": len(DEDICATED),
                "section": len(SECTION), "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION), "total", len(out))
