"""R3 tier1 hospitality — build competitors.json from verify evidence + Claude tier judgments."""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "paperchase.ac": ("Hospitality-only global firm, 35+ yrs, 450+ brands (Zuma, The Fat Duck). Own fetch 403; verified via live web search 2026-07-11 (title: 'Paperchase | Hospitality Accounting for Restaurants & Hotels').", "search"),
    "hlwa.co.uk": ("Homepage H1: 'Chartered Hospitality Accountants Bristol'. Red-team-named.", "fetch"),
    "innspiredaccountancy.co.uk": ("Title: 'Innspired Accountancy - Pub Accountants for Licensed Trade'. Red-team-named.", "fetch"),
    "inn-control.co.uk": ("H1: 'Specialist Restaurant & Pub Accountants to the Licensed Trade'. 159-URL sitemap incl. pub/restaurant blog.", "fetch"),
    "innscribeuk.com": ("Title: 'Licensed Trade Accountancy Services | UK, Nationwide'. Claims 'over 800' clients.", "fetch"),
    "roslyns.co.uk": ("H1: 'We are the leading provider of business services to the hospitality sector'. Pub webinars, stocktaking, payroll.", "fetch"),
    "solutions4caterers.co.uk": ("Title: 'Hospitality Accountants | Solutions 4 Caterers'; 'Serving hospitality since 2003'. Part of Hospitality Solutions Group.", "fetch"),
    "accountingchefs.com": ("'Your Trusted Partner for Comprehensive Restaurant Accounting and Finance Management'. Restaurant cash-flow service pages.", "fetch"),
    "accurise.net": ("Title: 'Hospitality Accounting, Payroll & Multi-Entity Software Specialists'. Multi-site operators ('Run 20 sites like you only have 2').", "fetch"),
    "savure.co.uk": ("Title: 'UK Bookkeeping Services For Restaurants, Pubs & Hospitality'. 2,000-URL programmatic sitemap (location pages) - SEO-aggressive.", "fetch"),
    "thehospitalityaccountants.com": ("Exact-match brand; North Wales, UK-wide; hotels/restaurants/cafes/pubs/holiday lets. Own fetch failed (status 0); verified via live web search 2026-07-11.", "search"),
    "merrantiaccounting.com": ("Red-team-named. Dedicated 'Accountants for Takeaways' + 'Accountants for Restaurants' pages, from GBP25/mo. Own fetch 202 (bot-blocked); verified via live web search 2026-07-11.", "search"),
    "hayhursts.net": ("Southampton firm with dedicated 'Pubs & Licensed Trades' practice ('Hayhursts are Specialists').", "fetch"),
    "tipsandtroncs.co.uk": ("Tronc-only specialist: 'Troncs Explained', 'Tronc Scheme Savings', a tronc calculator, managed tronc service.", "fetch"),
    "troncbox.com": ("'The UK's number one Troncmaster by WMT Troncmaster Services' - WMT's tronc product; owns troncmaster SERPs.", "fetch"),
}
SECTION = {
    "perrysaccountants.co.uk": "Red-team-named. Chartered firm (London & Kent) with 'Hotel and Hospitality Accountants' sector page.",
    "tajaccountants.co.uk": "Red-team-named. London firm; dedicated 'Restaurant & Takeaway Accountants' page ('daily takings' language).",
    "xeinadin.com": "National consolidator; dedicated 'Accountants for Bars, Pubs & Clubs' industry page + hospitality page.",
    "alexander.co.uk": "Manchester chartered firm; /sectors/hospitality/ 'Hospitality Accounting & Tax Advice'.",
    "rousepartners.co.uk": "Award-winning firm; /hospitality-accountants/ page; hospitality-and-food specialism listed.",
    "hawsons.co.uk": "Sheffield chartered firm; 'Leisure & Hospitality Accountants' sector page.",
    "mooreks.co.uk": "Moore Kingston Smith; hospitality & leisure sector; homepage led with 'Tipping changes you can't ignore' (July 2026).",
    "buzzacott.co.uk": "Large London firm; dedicated Troncmaster Services page ('Fair & Compliant Tip Management') - owns tronc advice SERPs.",
    "haysmac.com": "Top-30 firm; hospitality sector team; ranks for TOMS accountant queries.",
    "aab.uk": "AAB group; dedicated 'Hotel Accounting Services' page.",
    "bishopfleming.co.uk": "Top-30 firm; 'Food and Drink' + 'Hospitality and Leisure' sector pages.",
    "e2eaccounting.co.uk": "Multi-sector online firm; 'Hospitality Accountants' expertise page; 8 queries hit across our sweep - heavy SEO player.",
    "fusionaccountants.co.uk": "London online firm; 'Restaurant and Hospitality Accountants' page.",
    "prysm.financial": "London firm; 'Specialist Restaurant & Hospitality Accountants' key sector page.",
    "auditox-accountancy.uk": "SEO-led online firm; 'Tax Accountants For Restaurants & Takeaways' + pubs/bars pages.",
    "loyals.uk": "London firm; hospitality page pitched 'Tronc-ready, multi-site, EPOS-integrated'.",
    "ltaccounting.uk": "Online firm; 'Hospitality Accountants | Pub | Restaurant | Hotel' page.",
    "yourtaxhelp.co.uk": "Online fixed-fee firm; 'Accountant for Restaurants, Cafes & Takeaways' page; ranked across guesthouse/B&B queries.",
    "dsburge.co.uk": "Surrey/London chartered firm; 'Accountants for Restaurants' page (restaurants & cafes sector).",
    "jkaccountants.com": "TaxAssist franchise (Wanstead); 'Accountants for Restaurants in London' + restaurant & takeaway industry page.",
    "btbaccountants.co.uk": "Middlesbrough firm; 'Accountants for Restaurants | Accountancy for Chefs' page.",
    "swift-accountants.co.uk": "Online fixed-fee firm; 'Hospitality Accountants' page; ranked for hotel/guesthouse queries.",
    "aceaccountax.co.uk": "Milton Keynes firm; 'Hospitality Accountants UK' page.",
    "ac-accounts.co.uk": "Manchester chartered firm; 'Accountants For Hospitality Businesses' sector page.",
    "coxhinkins.co.uk": "Oxford firm; 'Specialist Hospitality Accountants in UK' page.",
    "abmcharteredaccountants.com": "Canary Wharf firm; 'Accountants for Hospitality Businesses UK | Hotels Accounting London' page.",
    "a2zaccounting.co.uk": "Online chartered firm; /industries/hospitality/ 'Improve Profit & Save Tax'.",
    "mhaccounting.org.uk": "Online firm; 'Hospitality Accountant | Cafe, Bar, Hotel, Restaurant' sector page.",
    "apexaccountants.tax": "Online tax firm; 'Accountants for Food and Beverages' sector page.",
    "goringsaccountants.co.uk": "London firm; 'Accountant Restaurant Pub' page.",
    "companies999.co.uk": "Online firm; 'Restaurant & Hospitality Accountant UK' page.",
    "livingstonesaccountants.co.uk": "Highest SERP hit-count in our sweep (13 hits, 9 queries); food/hospitality/leisure product category incl. leisure accountants.",
    "pulse-accountants.co.uk": "Tech-led firm; hospitality sector page; ranked for hospitality VAT advice.",
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
    out.append({"domain": dom, "tier": "SECTION", "verified_via": "fetch",
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title"),
                "service_page": (r.get("service_page") or {}).get("url")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-11", "dedicated": len(DEDICATED),
                "section": len(SECTION), "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION), "total", len(out))
