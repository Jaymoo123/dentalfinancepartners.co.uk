"""R3 tier1 crypto — build competitors.json from verify evidence + Claude tier judgments.

Same pattern as tier1_hospitality/s7_competitors_build.py. Evidence source:
raw/verify_evidence.json (162 SERP-surviving domains, 123 fetched OK / 39 blocked).
Blocked-but-strategically-important domains were re-verified via live web search
2026-07-11 (verified_via = "search"); everything else blocked stays out of this file
(remains in candidates.json). Software/exchanges/media/directories are NOT rivals
and are excluded here (see COMPETITORS.md drop log).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ev = json.loads((HERE / "raw" / "verify_evidence.json").read_text(encoding="utf-8"))

DEDICATED = {
    "mycryptotax.co.uk": ("Joint-top SERP presence (17 hits). 'My Crypto Tax' - dedicated crypto division of My Accountancy Team Ltd (CIMA), CryptoUK member since 2018. Own fetch 403; verified via live web search 2026-07-11 (title: 'Crypto Accountants & Tax Advisors | Crypto Tax Experts in UK'). Sister domain mycryptotax.io fetched OK (187-URL sitemap).", "search"),
    "cryptax.uk": ("Title: 'Cryptax - UK Specialist Crypto Tax Advisers | Chartered Tax Adviser'. H1: 'Crypto tax help from an expert.'", "fetch"),
    "hashtax.io": ("Title: 'Crypto Tax Accountant UK | ACCA-Registered | HashTax'; dedicated 'HMRC Crypto Tax Specialist' service page; 113-URL sitemap.", "fetch"),
    "ukcryptocurrencyaccountant.co.uk": ("H1: 'UK Cryptocurrency Tax Specalists' (sic). Exact-match domain.", "fetch"),
    "crypto-tax-accountant.co.uk": ("Title: 'Crypto Tax Accountant - Cryptocurrency Accountant UK Services'; 870-URL sitemap (heavy content play).", "fetch"),
    "cryptocountancy.co.uk": ("Title: 'Crypto Tax Accountant | CryptoCountancy - London UK'.", "fetch"),
    "cryptotaxdegens.com": ("Title: 'Crypto Tax Accountants | Cryptocurrency Tax Advisers | Crypto Tax Degens'. H1: 'The ultimate resource for UK Crypto Tax'; subscription model; 89-URL sitemap.", "fetch"),
    "bitcoinaccountant.co.uk": ("H1: 'Bitcoin Accountant; Effortless cryptocurrency tax return service for just GBP350'. Fixed-fee productised return.", "fetch"),
    "mycryptotaxadvisor.co.uk": ("Title: 'Crypto Tax Accountant UK | My Crypto Tax Advisor'.", "fetch"),
    "knightbridgetax.com": ("Title: 'Knightbridge Tax | UK Crypto Tax Specialists'. H1: 'Navigate crypto tax with confidence'; Chartered Tax Advisers; 33-URL sitemap.", "fetch"),
    "mynal2.co.uk": ("Title: 'Myna L2: UK Crypto Tax Specialists' (Myna - known UK crypto accountancy brand).", "fetch"),
    "cryptotaxsolution.co.uk": ("Title: 'Crypto Tax Solution - Crypto Accounting'; 72-URL sitemap.", "fetch"),
    "certifiedcryptoaccountant.com": ("Title: 'Crypto Accountant UK & US | HMRC & IRS Crypto Tax Filing'. H1: 'Specialist crypto tax accountants for UK and US investors.' 144 crypto mentions on page.", "fetch"),
    "cryptoaccountantsuk.co.uk": ("Title: 'Crypto accountants - Assisting with HMRC Investigations'. Investigation-led positioning.", "fetch"),
    "mindyourownbusiness.uk": ("Dedicated 'Bitcoin Tax UK' content brand (title + H1); 375-URL sitemap of bitcoin-tax content.", "fetch"),
    "drpaccountants.co.uk": ("Title/H1: 'Best Crypto Accountants UK - Affordable Tax & Advice Services'; 2,000-URL programmatic sitemap - the SEO-aggressive player of this niche.", "fetch"),
    "cryptoaccountants.live": ("4 SERP hits. 'Crypto Accountants UK | Crypto Tax & HMRC Experts' - ACCA-chartered, crypto-only (bookkeeping, formation, foundations/DAO treasury). Own fetch 202 (bot-blocked); verified via live web search 2026-07-11 (Trustpilot 5*, 42 reviews).", "search"),
    "7accountants.com": ("'7 Crypto Tax Accountants & Advisors' - crypto-led brand (crypto tax filing, DeFi/NFT reporting, mining, planning; UK/US). Own fetch 403; verified via live web search 2026-07-11.", "search"),
    "yourcryptoaccountant.co.uk": ("'Your Crypto Accountant' - crypto-only; segments investors / high-volume traders / businesses / DeFi users; quarterly position tracking. Own fetch 202; verified via live web search 2026-07-11 (incl. /crypto-trader-accountant/ page).", "search"),
    "cryptotaxation.co.uk": ("'Crypto Accounting Services | Crypto Tax Accountant UK'; has its own crypto tax calculator page (s104 pooling, CARF-updated). Own fetch 202; verified via live web search 2026-07-11.", "search"),
    "cryptotaxaccountant.uk": ("'Expert Crypto Tax Accountants in the UK for Tax Filing'; per-segment service pages (day traders, blockchain developers). Own fetch 403; verified via live web search 2026-07-11.", "search"),
    "crypto-consultants.co.uk": ("'Bitcoin Tax Specialists - Crypto Accountant UK' (/crypto-tax-accountant page). Own fetch 202; verified via live web search 2026-07-11.", "search"),
}
SECTION = {
    "uk.andersen.com": ("11 SERP hits. Andersen LLP - dedicated Crypto Tax and Accounting division; technical director Dion Seymour is ex-HMRC cryptoasset policy lead - the heavyweight in this field. Own fetch 202; verified via live web search 2026-07-11 (/crypto-tax-and-accounting/).", "search"),
    "lanop.co.uk": ("6 SERP hits. Lanop Business & Tax Advisors - /crypto-accountants/ service page + large crypto blog cluster (CGT allowance, same-day/30-day traps, loss harvesting). Own fetch 403; verified via live web search 2026-07-11.", "search"),
    "menzies.co.uk": ("Menzies LLP - crypto tax liability page + HMRC Cryptoasset Disclosure Facility page; crypto specialists + Tax Disputes team. Own fetch 403; verified via live web search 2026-07-11.", "search"),
    "gmprofessionalaccountants.co.uk": ("GM Professional Accountants - 'Crypto Accountants UK | Expert Cryptocurrency Tax Advice' sector page (/sector-based/accountants-for-cryptocurrency/). Own fetch 202; verified via live web search 2026-07-11.", "search"),
    "mmba.co.uk": ("Chartered firm; service page 'Crypto Accountant UK for Tax Advice & HMRC Reporting' (/services/cryptocurrency-tax-accountant/). 11 SERP hits.", "fetch"),
    "charltonbaker.co.uk": ("Chartered firm (Devizes/Bath/Bristol); dedicated /services/crypto-tax page 'Crypto Tax Accountant UK'. 7 SERP hits.", "fetch"),
    "alexander.co.uk": ("Alexander & Co (Manchester); CGT advice page ranks across 7 crypto queries in our sweep.", "fetch"),
    "hodgebakshi.com": ("Chartered firm (Cardiff); dedicated /crypto-tax page; 11 crypto mentions.", "fetch"),
    "mjkane.co.uk": ("MJ Kane (Belfast); HMRC Investigations page ranks on crypto investigation queries; 10 crypto mentions.", "fetch"),
    "ross-brooke.co.uk": ("UHY Ross Brooke; CGT page ranks on 4 crypto queries; 6 crypto mentions.", "fetch"),
    "123financials.com": ("London online firm; dedicated page 'Crypto Accountant UK - Hire Cryptocurrency Tax advisor' (/crypto-accountant-uk).", "fetch"),
    "rppaccounts.co.uk": ("Rawlinson Pryde & Partners (Bedford); 'Cryptocurrency Tax Advice UK' page under high-net-wealth services.", "fetch"),
    "sataxaccountants.co.uk": ("SA Tax Accountants (Milton Keynes); dedicated /crypto-accountants/ page.", "fetch"),
    "a-wise.co.uk": ("Online firm; 'Crypto Accountants UK From GBP10 Per Month' page (/accountancy-services/crypto-accountants/).", "fetch"),
    "goforma.com": ("GoForma online accountants; dedicated 'Crypto Self Assessment Tax Returns' page.", "fetch"),
    "bkl.co.uk": ("BKL (London); dedicated 'Crypto Tax Accountants' page (/services/tax/cryptocurrency-tax/).", "fetch"),
    "pearllemonaccountants.com": ("Pearl Lemon; dedicated 'Accountants for Crypto Traders' page.", "fetch"),
    "seperaaccounting.co.uk": ("Sepera Accounting; 'Cryptocurrency Tax' service page; 14 crypto mentions.", "fetch"),
    "etctax.co.uk": ("ETC Tax - specialist tax consultancy; CGT planning page; 9 crypto mentions; long-standing crypto advisory content.", "fetch"),
    "taxdisputes.co.uk": ("HMRC tax solicitors & barristers; ranks on 3 crypto investigation/disclosure queries - legal-side rival for the disclosure lane.", "fetch"),
    "patrickcannon.net": ("Tax barrister; dedicated 'Cryptocurrency Tax Investigations' practice page.", "fetch"),
    "cannonchambers.co.uk": ("Tax chambers; dedicated 'Cryptocurrency Tax Advice' expertise page.", "fetch"),
    "taxdisclosures.co.uk": ("Forte Tax Disclosures - disclosure specialists; ranks on undeclared-crypto queries; 4 crypto mentions.", "fetch"),
    "accountantsfortraders.co.uk": ("'Accountants for Traders' - dedicated to financial/day traders (adjacent trader-status lane rival).", "fetch"),
    "dsburge.co.uk": ("DS Burge & Co; CGT advice page ranks on crypto CGT queries; 5 crypto mentions.", "fetch"),
    "mytaxaccountant.co.uk": ("MTA personal tax; CGT accountant page on 2 crypto queries; 4 crypto mentions.", "fetch"),
    "auditox-accountancy.uk": ("Auditox; CGT accountants page; 7 crypto mentions.", "fetch"),
    "maxproaccountants.co.uk": ("MaxPro (South London); CGT advice page on 2 crypto queries; 6 crypto mentions.", "fetch"),
    "towerstone.co.uk": ("Towerstone; CGT accountant page; 3 crypto mentions.", "fetch"),
    "taxaccountant.co.uk": ("'Specialist Tax Consultants' brand; CGT service page ranks on crypto CGT query.", "fetch"),
    "taxfix.com": ("Taxfix (ex-TaxScouts) - accountant-assisted SA filing at scale; CGT rates calculator page ranks on crypto calculator queries.", "fetch"),
}

out = []
for tier, table in (("DEDICATED", DEDICATED), ("SECTION", SECTION)):
    for dom, (why, src) in table.items():
        r = ev.get(dom, {})
        out.append({"domain": dom, "tier": tier, "verified_via": src,
                    "serp_hits": r.get("hit_count", 0), "queries": r.get("queries", []),
                    "evidence": why,
                    "homepage_title": (r.get("homepage") or {}).get("title"),
                    "service_page": (r.get("service_page") or {}).get("url")})

(HERE / "competitors.json").write_text(
    json.dumps({"generated": "2026-07-11", "dedicated": len(DEDICATED),
                "section": len(SECTION), "rivals": out}, indent=1), encoding="utf-8")
print("dedicated", len(DEDICATED), "section", len(SECTION), "total", len(out))
assert all(r["domain"] in ev or r["verified_via"] == "search" for r in out)  # ponytail: self-check
