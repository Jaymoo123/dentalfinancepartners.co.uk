# Crypto-tax accountancy — verified competitor landscape (R3)

Date: 2026-07-11. Method: 34 UK SERP queries (Serper gl=gb + DDG uk-en, `s1_serp_collect.py`,
raw in `raw/serp_raw.json`), script-filtered against `own_estate_exclusion.json` (0 estate
domains survived) and a directory/info blocklist (8 dropped at collect time). 162 survivor
domains all fetch-attempted (`s2_verify_fetch.py` → `raw/verify_evidence.json`: 123 fetched OK,
39 blocked/failed). The strategically important blocked domains (incl. both joint-top-hit
domains) were re-verified via live web search 2026-07-11, marked "search" below.

Verdict tiers: **DEDICATED** = the whole brand is crypto/digital-asset tax; **SECTION** = real
multi-sector firm (or tax chambers) with a dedicated crypto or crypto-ranking CGT page. Full
machine-readable list with evidence quotes: `competitors.json` (**53 rivals: 22 DEDICATED +
31 SECTION**).

## Headline read

This is the most DEDICATED-saturated field of any dossier so far: 22 crypto-only brands
verified live (hospitality had 15, and most of those were sub-trade splits). Exact-match
domains are near-exhausted (crypto-tax-accountant.co.uk, cryptotaxaccountant.uk,
cryptotaxation.co.uk, mycryptotaxadvisor.co.uk, ukcryptocurrencyaccountant.co.uk,
cryptoaccountantsuk.co.uk all live). On top of the firms sits a layer no other niche has:
**crypto tax SOFTWARE owns the head SERPs** — Koinly took joint-top hit count (17) in our
sweep, with Recap (12), CoinLedger, Blockpit, Coinpanda, Kryptos, CoinTracking and
tax.crypto.com all ranking. The software layer is not a lead rival but it caps the DIY-query
upside and simultaneously feeds the "software said X, is it right?" reconciliation demand
(the "koinly accountant" query returns firms, not software).

## DEDICATED specialists (22, all verified)

| Domain | Angle | Evidence (quoted from fetched page unless noted) |
|---|---|---|
| mycryptotax.co.uk | Crypto division of My Accountancy Team (CIMA); CryptoUK member | Joint-top 17 SERP hits. Fetch 403 → search-verified; sister mycryptotax.io fetched OK ("Specialist Crypto Tax Accountant and Crypto Tax experts UK", 187-URL sitemap) |
| hashtax.io | ACCA-registered, HMRC-specialist page | Title "Crypto Tax Accountant UK \| ACCA-Registered \| HashTax"; 113-URL sitemap |
| cryptax.uk | Chartered Tax Adviser brand | "Cryptax — UK Specialist Crypto Tax Advisers \| Chartered Tax Adviser" |
| knightbridgetax.com | CTA firm | "Knightbridge Tax \| UK Crypto Tax Specialists" |
| mynal2.co.uk | Myna (known crypto accountancy brand) | "Myna L2: UK Crypto Tax Specialists" |
| crypto-tax-accountant.co.uk | Exact-match + content volume | Title match; **870-URL sitemap** |
| drpaccountants.co.uk | SEO-aggressive | "Best Crypto Accountants UK"; **2,000-URL programmatic sitemap** (the Savure of this niche) |
| mindyourownbusiness.uk | Dedicated content brand | "Bitcoin Tax UK" title+H1; 375-URL content sitemap |
| cryptotaxdegens.com | Subscription/resource model | "The ultimate resource for UK Crypto Tax"; 89-URL sitemap |
| bitcoinaccountant.co.uk | Productised fixed fee | H1 "Effortless cryptocurrency tax return service for just £350" |
| certifiedcryptoaccountant.com | UK & US dual filing | "Crypto Accountant UK & US \| HMRC & IRS Crypto Tax Filing" |
| cryptocountancy.co.uk | London | "Crypto Tax Accountant \| CryptoCountancy - London UK" |
| ukcryptocurrencyaccountant.co.uk | Exact-match | H1 "UK Cryptocurrency Tax Specalists" (sic) |
| mycryptotaxadvisor.co.uk | Exact-match | "Crypto Tax Accountant UK \| My Crypto Tax Advisor" |
| cryptotaxsolution.co.uk | Exact-match | "Crypto Tax Solution - Crypto Accounting"; 72-URL sitemap |
| cryptoaccountantsuk.co.uk | Investigation-led | "Crypto accountants - Assisting with HMRC Investigations" |
| cryptoaccountants.live | ACCA, crypto-only + Web3/DAO services | Fetch 202 → search-verified (Trustpilot 5*, 42 reviews) |
| 7accountants.com | Crypto-led brand, UK/US | Fetch 403 → search-verified ("7 Crypto Tax Accountants & Advisors") |
| yourcryptoaccountant.co.uk | Segments investors/traders/business/DeFi | Fetch 202 → search-verified (has /crypto-trader-accountant/) |
| cryptotaxation.co.uk | Has own crypto tax calculator | Fetch 202 → search-verified (calculator page, CARF-updated) |
| cryptotaxaccountant.uk | Per-segment pages (day traders, devs) | Fetch 403 → search-verified |
| crypto-consultants.co.uk | Bitcoin tax specialists | Fetch 202 → search-verified (/crypto-tax-accountant) |

## SECTION rivals (31) — the ones that shape strategy

Heavyweight: **Andersen LLP** (uk.andersen.com, 11 hits — dedicated crypto division whose
technical director Dion Seymour is HMRC's former cryptoasset policy lead; the authority
ceiling of this niche). Strong firms with dedicated crypto pages: **Lanop** (6 hits, big
crypto blog cluster), **Menzies** (crypto tax + Cryptoasset Disclosure Facility pages),
**MMBA** (11 hits), **Charlton Baker**, **Hodge Bakshi**, **BKL**, **GM Professional**.
A distinct **legal/disclosure flank** ranks on the investigation queries: taxdisputes.co.uk,
Patrick Cannon, Cannon Chambers, Forte Tax Disclosures — plus Menzies' disputes team. Online
volume firms colonise the rest: 123Financials, A-Wise (£10/mo), GoForma, Pearl Lemon, SA Tax,
Sepera, Auditox, Taxfix. Generalist CGT pages (Alexander & Co, UHY Ross Brooke, DS Burge, MTA,
MaxPro, Towerstone, taxaccountant.co.uk, ETC Tax) rank on crypto-CGT queries without crypto
pages — soft targets. Adjacent: accountantsfortraders.co.uk owns the day-trader lane.

## The software layer (not rivals, but they own the head SERPs)

koinly.io (17 hits, joint-top), recap.io (12, UK-based, publishes a full UK tax guide),
coinledger.io, blockpit.io, coinpanda.io, kryptos.io, cointracking.info, tax.crypto.com.
Implication: pure DIY head terms ("crypto tax uk", "crypto tax calculator uk") are
software-owned; the firm-site wins are the hire, disclosure, reconciliation ("koinly
accountant") and complex-case (DeFi/trader-status) intents. countdefi.com is a US CPA
(dropped, non-UK).

## Dropped at judgment (not accountancy rivals)

Exchanges/platforms (binance, kraken, kucoin, gemini, nexo, bitrue, bitget, 3commas,
photon-sol), crypto media (protos.com, news.bitcoin.com, bitcourier.co.uk, kryptomoney.com,
theindustryspread.com et al.), directories/engines (accountingfirms.co.uk, experlu.co.uk,
sourceforge.net, trustpilot, bing, linkedin), calculators/info sites (paytoolkit.co.uk,
savingtool.co.uk, taxyz.co.uk, moneyguide.org.uk, income-tax.co.uk), bodies/press (ICAS,
Deloitte TaxScape, thisismoney), an IT-support cluster and forex-education sites swept in by
trader queries, and a block of ~9 generalist firms (christian-co, newtax, gmsworld,
zanepartnership, branstonadams, numerallp et al.) that hit only via the same syndicated
July-2026 "FCA sets landmark" news article (0 crypto service mentions — incidental, dropped).
Weak fetched firms with 0 crypto mentions (magnusaccounting, protaxaccountant, dnsassociates,
taax, xactaccountants, debitam, crunch, ecommerceaccountants) were left in candidates.json but
excluded from competitors.json. Blocked and NOT search-verified (excluded, unverified):
theaccountancy.co.uk, streets.uk, richardsonlissack.co.uk, capitalgainstaxexpert.co.uk,
birminghamwealthmanagement.co.uk. Three domains resolve to private IPs (SSRF-blocked:
isetax.co.uk, citytaxdirect.co.uk, earegolding.com) — treated as dead/cloaked.

## Implications for the build (feeds LAUNCH_CORE.md)

1. Head hire-terms are CONTESTED by 22 dedicated brands; exact-match-domain plays are gone.
   Win = authority depth (house positions, HMRC-manual-cited content) + tools + the data
   asset, not brand-name SEO.
2. The **disclosure/nudge-letter lane is the highest-value open wedge**: contested by legal
   players and Menzies, but no dedicated brand owns "crypto nudge letter" content + a penalty
   estimator, and CARF (first HMRC data drop 2027) gives it a growing news tailwind.
3. **Software-reconciliation positioning** ("your Koinly report is wrong because...") is a
   differentiator only accountants can make; "koinly accountant" SERP is firm-listings, thin.
4. drpaccountants (2,000 programmatic URLs) and crypto-tax-accountant.co.uk (870) prove
   volume-content works here, but both are thin — the gold-standard bar beats them on quality,
   not quantity.
5. Nobody in the verified set publishes a research/data asset; the Crypto Tax Gap Index lane
   (DATA_ASSET.md) is open. Only cryptotaxation.co.uk and the software layer have calculators.
