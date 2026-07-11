"""R3 tier1 ecommerce — build competitors.json from verify evidence + Claude tier judgments.

Tier judgments made 2026-07-12 from raw/verify_evidence.json (fetch) plus live web
search where our fetch was bot-blocked (verified_via: search).
DEDICATED = whole firm/brand is ecommerce-seller accountancy/bookkeeping.
SECTION = real firm with a dedicated ecommerce/Amazon-seller service page.
ADJACENT = non-accountancy players who own SERP real estate in this niche
(SaaS content arms, VAT-compliance agencies, calculator sites) — mapped because in
this niche, unlike care, the adjacents are the STRONGEST content competitors.
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "yourecommerceaccountant.co.uk": ("Own fetch 202-blocked. Live search 2026-07-12: 'Ecommerce Accountants | Specialist Ecommerce Accounting UK' — founded 2012, Taunton; own software (eComLedger); fixed-fee packages; dedicated blog hub /expert-ecommerce-accountants-knowledge/. 19 SERP hits — the single most visible firm in our DDG sweep.", "search"),
    "ecommerceaccountants.co.uk": ("Exact-match domain. Title 'Ecommerce Accountants UK | Amazon, Shopify & DTC Specialists'; H1 'Specialist accountants for'; ACCA practice, Xero Platinum, 'trusted by 500+ businesses'. 242 sitemap URLs.", "fetch"),
    "elverecommerceaccountants.co.uk": ("Own fetch 403. Live search 2026-07-12: Elver E-Commerce Accountants, Wigan chartered firm, ecommerce-only, clients GBP500k-15m+ revenue, A2X partner, dedicated /a2x/, /pricing/, /bookkeeping/ pages.", "search"),
    "unicornaccounting.co.uk": ("Title 'Ecommerce Accountants UK | Save Tax & Scale Faster'; H1 'Ecommerce accountants'; ecommerce-only positioning; 255-URL post sitemap = large content arm.", "fetch"),
    "ecomaccountants.uk": ("Exact-match domain. Title 'Amazon FBA & VAT OSS | E-commerce Accountants UK'; H1 'E-commerce Accountants UK - Expert Online Sellers Tax Support'; 178 ecom mentions on homepage; /services/amazon-fba-accountants/.", "fetch"),
    "ecommaccountant.co.uk": ("Own fetch 202-blocked. Live search 2026-07-12: 'Ecommerce Accounting Services | Evara' — fixed-fee packages for Amazon/Shopify/eBay/Etsy/multi-channel; full ecommerce VAT incl. marketplace VAT + OSS/IOSS.", "search"),
    "e-accounts.co.uk": ("Own fetch 202-blocked. Live search 2026-07-12: eAccounts — online firm 'From GBP29/PM', Xero Platinum, dedicated /ecommerce-accountants/ + /amazon-accountants/ pages; TikTok Shop coverage. Ecommerce-led positioning.", "search"),
    "myecommerceaccountant.co.uk": ("Exact-match domain. Title 'My Ecommerce Accountant | Specialist Ecommerce Accounting UK'; H1 'ECOMMERCE SELLERS'; /amazon-accountant/ service page; 54 sitemap URLs.", "fetch"),
    "syncaccountants.co.uk": ("Title 'Sync Accountants: UK eCommerce Accountant Experts'; H1 'eCommerce Accountants: Expert Services for Online Businesses'; /accountants-for-amazon/; 114 sitemap URLs.", "fetch"),
    "sellerbookkeeping.co.uk": ("H1 'Specialist Ecommerce Bookkeeping for UK Amazon, eBay, Shopify & Multi-Channel Sellers'; bookkeeping-only dedicated brand; 135 ecom mentions.", "fetch"),
    "socialcommerceaccountants.com": ("H1 'Your Dad's Accountant Doesn't Understand eCommerce. We Do.' — UK ACCA firm for scaling DTC brands; Shopify/Amazon/TikTok Shop hubs + FREE TOOLS section; 123 sitemap URLs.", "fetch"),
    "ecommerceaccountants.uk": ("Surfaced via live search (not in our DDG top-10s): 'eCommerce Accountants UK | VAT Returns & Bookkeeping for Online Sellers'; 23 sitemap URLs.", "search"),
    "fzcoltd.com": ("H1 'Ecommerce accountants and Cross-Border VAT Experts.' — FZCO Accountants, London; global VAT + ecommerce compliance; 691 sitemap URLs (big content arm incl. multi-country VAT).", "fetch"),
    "nentara.com": ("Title 'UK Amazon Seller Accounting & VAT Resource' — content/resource site covering FBA VAT, payout reconciliation, inventory & COGS. Small (14 URLs) but is exactly the A*-content-site shape we would build.", "fetch"),
}

SECTION = {
    "e2eaccounting.co.uk": "13 SERP hits (2nd highest). Outsourced finance firm with /expertise/ecommerce-accountants/ + aggressive listicle SEO ('Top 10 eCommerce Accountants in the UK'). 166 sitemap URLs.",
    "a2zaccounting.co.uk": "Chartered firm; /industries/e-commerce-accountants-uk/ page; 6 SERP hits.",
    "unicornaccountants.co.uk": "London chartered firm (distinct from unicornaccounting.co.uk); /sectors/ecommerce-accountants page; 5 hits.",
    "business-accounting.co.uk": "Fixed-fee online firm; /who-we-work-with/ecommerce page; 5 hits.",
    "reflexaccounting.co.uk": "H1 lists Ecommerce among Property/SaaS specialisms; /who-we-serve/e-commerce-accountants/; 4 hits.",
    "fusionaccountants.co.uk": "London chartered firm; /ecommerce-accountants/ page; 4 hits.",
    "apexaccountants.tax": "Online tax firm; /online-store/ sector page; 4 hits.",
    "sterlinxglobal.com": "Liverpool firm with heavy Amazon/ecommerce + multi-country VAT focus (/amazon-uk-vat-services/); 1,628 sitemap URLs — borderline dedicated but also does UAE/USA/generic; kept SECTION.",
    "goforma.com": "Contractor/small-biz online firm; /accountants-for-ecommerce page. NOTE: also a contractors-ir35 rival — adjacency overlap runs both ways.",
    "osome.com": "VC-backed international online firm; /uk/ecommerce-accountants/ landing + huge content ops (1,630 sitemap URLs, multi-country); 3 hits.",
    "123financials.com": "London firm; /amazon-seller-accountant page; 3 hits.",
    "tax-wise.co.uk": "Online firm; /accountants-for-amazon-sellers page (surfaced in live search); 3 hits.",
    "sleek.com": "International online firm; /uk/ecommerce-accountant/ page; 3 hits.",
    "jpaccountant.info": "J&P Accountants, Manchester — 'Tax, VAT & Amazon Specialists'; /vat-services-on-amazon/; heavy China-seller cross-border VAT practice; 2 hits.",
    "zmartly.co.uk": "UK firm; /for/amazon-fba page; 2 hits.",
    "msaaccountants.co.uk": "/we-serve/ecommerce page; 2 hits.",
    "accotax.co.uk": "London chartered firm; ecommerce/shopify sector pages; 2 hits.",
    "theaccountancy.co.uk": "Own fetch 403. Live search 2026-07-12: The Accountancy Partnership — /industries/amazon-ecommerce-accountants 'From GBP24.50 per month'. Big online generalist with ecommerce page.",
    "archimediaaccounts.co.uk": "Own fetch 403. Live search 2026-07-12: Nottingham certified firm with a full /who-we-help/ecommerce-accountants/ tree: Amazon FBA, eBay, Etsy, Shopify, dropshippers sub-pages.",
    "gmprofessionalaccountants.co.uk": "Own fetch 202. Live search 2026-07-12: /accountants-for-amazon-sellers/ + amazon-fba-book-sellers pages. Also seen in care sweep — multi-niche SEO player.",
    "octaaccountants.co.uk": "/ecommerce-accountants/ page; 18 ecom mentions.",
    "allenbyaccountants.co.uk": "London firm; /sectors/ecommerce-accountants/ page.",
    "braant.co.uk": "London firm; /who-we-support/ecommerce-businesses/ page.",
    "thenumbersmith.co.uk": "/services/e-commerce-accountants page.",
    "cleveraccounts.com": "/ecommerce-accounting page.",
    "cloudaccountant.co.uk": "H1 names eCommerce Sellers as a core segment.",
    "xperttaxaccountants.co.uk": "/industries/ecommerce/ page.",
    "coxhinkins.co.uk": "Oxford firm; /amazon-seller-accountants/ page + 'Top 10 Ecommerce Accountants' listicle.",
    "ltaccounting.uk": "/ecommerce-accountants/ page.",
    "clearbookkeeping.co.uk": "/e-commerce-bookkeeping/ page (bookkeeper).",
    "fintechaccountancy.co.uk": "/e-commerce-bookkeeping/ page (bookkeeper).",
    "thetaxguys.co.uk": "/sectors/ecommerce-accountant/ page.",
    "a-wise.co.uk": "/accountants-for-shopify-etsy/ page.",
    "diamondaccounts.co.uk": "/sectors/ecommerce-businesses/ page.",
    "uk.meruaccounting.com": "/industries/amazon-sellers/ page (outsourcing).",
    "smallaccountants.co.uk": "services#ecommerce section.",
    "fslaccountancy.co.uk": "/services/ecommerce-accountants/ page.",
    "leraccountancy.co.uk": "/sectors/ecommerce/ page.",
    "gondalaccountancy.co.uk": "/ecommerce-accountants page.",
    "tajaccountants.co.uk": "/ebay-sellers-accountants/ page.",
    "abmcharteredaccountants.com": "/sectors/e-commerce/ page.",
    "taxvatreturn.co.uk": "/ecommerce page.",
    "touchstoneaccountancy.co.uk": "/ecommerce/ page.",
    "eraaconsulting.co.uk": "/ecommerce-accountants-uk-amazon-fba-shopify page.",
    "accusolveaccountants.com": "/ecommerce-accountants-london/ page.",
    "protax.org.uk": "/sectors/ecommerce/ page.",
    "corientbs.co.uk": "/expertise/ecommerce-accountant/ page (outsourcing to practices).",
}

ADJACENT = {
    "a2xaccounting.com": "SaaS (settlement→ledger). Owns 'ecommerce accountant directory' + certification course (a2x.teachable.com) + deep guide library. The single strongest content incumbent in the niche.",
    "linkmybooks.com": "SaaS (Amazon/eBay/Shopify/Etsy→Xero/QBO). 868 sitemap URLs — massive content arm owning bookkeeping/'best ecommerce accountant' listicle queries.",
    "goecom.co.uk": "UK SaaS: 'Duty, VAT and margin for your ecommerce store, handled' + public calculator suite (landed cost, import duty) — direct precedent for our calculator fleet.",
    "ukcalculator.com": "Generic UK calculator site already shipping an Amazon seller fee calculator.",
    "marginwise.co.uk": "'UK Marketplace Fee Calculator 2026' — a standalone tool site in this exact niche.",
    "ecomcalctools.com": "1,375-URL programmatic fee/profit calculator site (Amazon/Etsy/Shopify, multi-language) — the saturation ceiling for pure-calculator plays.",
    "simplyvat.com": "International VAT compliance agency; /ecommerce/ hub; owns cross-border VAT queries.",
    "vat.support": "EU VAT registration/compliance service; /ecommerce/ page.",
    "crossbordervat.com": "IOSS-specialist service for ecommerce sellers shipping into the EU.",
    "easproject.com": "EU/UK compliance automation SaaS; IOSS pages.",
    "simplevat.eu": "EU VAT compliance SaaS; /oss-ioss/ hub.",
    "taxology.co": "Automated VAT compliance for online sellers; /vat-oss/ hub.",
    "vat-digital.com": "EU VAT registration/returns for ecommerce sellers; /marketplace-sellers/ page.",
    "vatcalc.com": "VAT tech + news publisher; marketplace/ERP VAT content.",
    "eightx.co": "Fractional-CFO-for-ecommerce service (London mention, mostly N.American); content on ecommerce finance leadership.",
    "sellerbookkeeping.com": "US ecommerce bookkeeping firm (S-Corp/self-employment-tax tools) — US, ranks in DDG uk-en anyway; excluded from UK rival count.",
    "vovaeven.com": "Amazon FBA influencer/affiliate content site (software reviews).",
    "thepricegeek.com": "Ecommerce pricing-tool review site (incl. A2X review).",
    "shopkeeper.com": "Amazon profit-dashboard SaaS.",
    "blueonion.ai": "Ecommerce financial-data SaaS.",
    "avasam.com": "UK dropshipping platform with tax/VAT content.",
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
for dom, why in ADJACENT.items():
    r = ev.get(dom, {})
    out.append({"domain": dom, "tier": "ADJACENT", "verified_via": "fetch" if "homepage" in r else "search",
                "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                "evidence": why,
                "homepage_title": (r.get("homepage") or {}).get("title")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-12", "dedicated": len(DEDICATED),
                "section": len(SECTION), "adjacent": len(ADJACENT), "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION), "adjacent", len(ADJACENT), "total", len(out))
