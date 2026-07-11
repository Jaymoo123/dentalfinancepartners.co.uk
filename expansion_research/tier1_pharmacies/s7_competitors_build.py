"""R3 tier1 pharmacies — build competitors.json from verify evidence + Claude tier judgments.

Pattern: tier1_hospitality/s7_competitors_build.py. Evidence strings quote fetched pages
(raw/verify_evidence.json / raw/refetch_2026-07-11*.json) unless marked search-verified
(live web search 2026-07-11, own fetch blocked).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "rxvirtualfinance.co.uk": ("Title: 'Best UK Pharmacy Accountant for Accounting, Tax & Virtual FD'; H1 'Virtual Pharmacy Accountant'. Top SERP hit-count in our sweep (17 hits).", "fetch"),
    "pharmatax.co.uk": ("Title: 'Pharmatax: Pharmacy Accountants | Accountants for Pharmacy'; H1s 'Pharmacy Specialist', 'Pharmacy Accountants'.", "fetch"),
    "pharmacyaccountants.co.uk": ("Exact-match domain. Own apex fetch failed (SSL hostname mismatch); www refetch 200: 'Pharmacy Accountants | Guiding pharmacies towards financial wellness', 166 pharmacy mentions. Sitemap = 2-page brochure site.", "fetch"),
    "pharmacistaccountants.co.uk": ("Title: 'Pharmacist Accountant | Accountants for Locum Pharmacists' — the locum-pharmacist specialist. 8-URL sitemap (services/pricing/resources).", "fetch"),
    "hutchingsaccountants.com": ("Title: 'Pharmacy Accountants | Hutchings Accountants - Accountancy Services for Pharmacy Businesses'; dedicated pharmacy-buyers + pharmacy-sellers pages. Accountancy arm of the Hutchings broker group.", "fetch"),
    "stetsonaccountants.co.uk": ("Title/H1: 'Accountants For Pharmacists UK - Tax, VAT & Payroll'. ~2,000-URL programmatic location sitemap — the niche's SEO-aggressive player (savure.co.uk pattern).", "fetch"),
    "accountant4pharmacists.co.uk": ("Exact-match domain; own fetch blocked (resolves to private IP). Live web search 2026-07-11: 'Salhan Pharmacists - Accounting for Pharmacists' — Salhan Accountants' pharmacist microsite.", "search"),
}
SECTION = {
    "lanop.co.uk": ("Own fetch 403 (Cloudflare). Search-verified 2026-07-11: dedicated page 'Accountants for Pharmacists in UK | Tax & NHS Income' (/accountants-for-pharmacists/), FP34/NHS-reimbursement language. 12 SERP hits.", "search"),
    "3esaccountants.co.uk": ("Own fetch 403. Search-verified 2026-07-11: dedicated 'Pharmacy accountants in the UK' page (/pharmacy-accountants/) + pharmacy blog content; NHS contract negotiation pitch. 12 SERP hits.", "search"),
    "sial-accountants.co.uk": ("Homepage: 'Specialist Accountants for Doctors... Medical, Dental, Opticians, Pharmacists'. 11 SERP hits.", "fetch"),
    "kudosaccounting.co.uk": ("Title: 'Medical Accountants | Specialist Healthcare Accounting Services'; healthcare payroll service page. 11 SERP hits.", "fetch"),
    "a2zaccounting.co.uk": ("Chartered online firm; /industries/healthcare/ sector page. 14 SERP hits.", "fetch"),
    "hawsons.co.uk": ("Sheffield chartered firm; 'Healthcare & Medical Accountants' sector page (pharmacy listed).", "fetch"),
    "hazlewoods.co.uk": ("Top-35 firm; healthcare sector expertise page (long-standing pharmacy team).", "fetch"),
    "shreemaccountants.co.uk": ("Dedicated page: 'Pharmacy Accountants UK | Up to £200/mo OFF | Shreem Accountants' — discount-led SEO play.", "fetch"),
    "mmba.co.uk": ("Chartered firm; /sectors/medical-accountants/ page.", "fetch"),
    "larking-gowen.co.uk": ("Large East Anglia firm; medical-accounting industry page.", "fetch"),
    "accountingin.co.uk": ("Online firm; 'Healthcare Accountants UK' page.", "fetch"),
    "ctmp.co.uk": ("Croydon chartered firm; /sectors/healthcare page.", "fetch"),
    "diamondaccounts.co.uk": ("Brighton/Eastbourne firm; healthcare sector page.", "fetch"),
    "raaccountants.com": ("'Healthcare, Franchise & SME Specialists'; healthcare sector page.", "fetch"),
    "pkpi.uk": ("PKPI Chartered Accountants; dedicated /pharmacies page (dental-led healthcare firm).", "fetch"),
    "azlaccounting.solutions": ("London SME firm; medical-and-healthcare industry page.", "fetch"),
    "xitax.co.uk": ("Leicestershire firm; dedicated page 'Pharmacy Accountants - Xitax' (/pharmacy/).", "fetch"),
    "rsbc.uk": ("Contractor-accountancy firm; health-and-well-being 'who we work with' page.", "fetch"),
    "samera.co.uk": ("Dental/healthcare finance group; 'Services for Pharmacists' page + pharmacy sales arm.", "fetch"),
    "allenbyaccountants.co.uk": ("London firm; 'Medical Accountants London' sector page.", "fetch"),
    "clearcutaccounting.co.uk": ("Manchester firm; medical-accountants service page.", "fetch"),
    "abmcharteredaccountants.com": ("Canary Wharf firm; NHS-pension sector page.", "fetch"),
    "arb.accountants": ("Southend/Essex firm; medical-accountants page.", "fetch"),
    "mazekey.co.uk": ("Remote/hybrid UK firm; dedicated 'Pharmacists' page (/pharmacists/).", "fetch"),
    "forwardlooking.uk": ("Derby firm; dedicated page 'Accountant for Pharmacies in Derby and East Midlands area' (/expertise/pharmacies/).", "fetch"),
    "aequitasaccountants.co.uk": ("Pinner firm; pharmacy specialist-sector page (/services/specialist-sectors/pharmacy).", "fetch"),
    "pkpiglobal.com": ("PKPI global site; dedicated /pharmacies/ page.", "fetch"),
    "fkca.co.uk": ("Foxley Kingham (Luton); FK Medical division (dental/medical specialisms).", "fetch"),
    "cruseburke.co.uk": ("London firm; healthcare bookkeeping/accountants pages.", "fetch"),
    "goforma.com": ("Online contractor firm; medical-accountants page.", "fetch"),
    "nexusaccounting.co.uk": ("Online firm; medical-professionals page.", "fetch"),
    "lovewell-blake.co.uk": ("Top-50 East Anglia firm; healthcare sector page; search 2026-07-11 also surfaced a dedicated /pharmacy-accountants page.", "fetch"),
    "xeinadin.com": ("National consolidator; healthcare-businesses industry page; search 2026-07-11 surfaced dedicated /industries/healthcare-businesses/pharmacists/ page. Also absorbed Silver Levene (former pharmacy specialist — silverlevene.co.uk pharmacy URLs now 301 to Xeinadin London office page, refetch_2026-07-11c.json).", "fetch"),
}
# Pharmacy sales brokers/valuers: own the buying/selling SERPs but sell brokerage, not
# accountancy. Tracked because the purchase/sale event is our highest-value lead moment.
ADJACENT = {
    "hutchings-pharmacy-sales.com": ("'Hutchings - the UK's leading Pharmacy sales agents'; 266-URL sitemap of pharmacies-for-sale listings.", "fetch"),
    "modiplus-pharmacysales.co.uk": ("'Pharmacy Business Sales | Modiplus' — broker arm of Modi Plus accountants; selling-your-pharmacy page.", "fetch"),
    "pharmacysalesuk.com": ("'Pharmacy Sales UK' — pharmacy sales listings site.", "fetch"),
}

out = []
for tier, table in (("DEDICATED", DEDICATED), ("SECTION", SECTION), ("ADJACENT_BROKER", ADJACENT)):
    for dom, (why, src) in table.items():
        r = ev.get(dom) or ev.get("www." + dom, {})
        out.append({"domain": dom, "tier": tier, "verified_via": src,
                    "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                    "evidence": why,
                    "homepage_title": (r.get("homepage") or {}).get("title"),
                    "service_page": (r.get("service_page") or {}).get("url")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-11", "dedicated": len(DEDICATED),
                "section": len(SECTION), "adjacent_broker": len(ADJACENT),
                "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION),
      "adjacent", len(ADJACENT), "total", len(out))
