# Retail and independent shops accountancy — verified competitor landscape (R3)

Date: 2026-07-15. Evidence: DDG SERPs (35 UK buyer-intent queries), direct fetch-verify of
108 candidate domains (raw/verify_evidence.json), sitemap crawls of the 10 strongest
sector rivals (raw/rival_sitemaps.json). Zero paid API calls. Classifications are
Claude judgments on fetched homepage + service-page evidence; bot-blocked domains are
marked UNVERIFIED, not guessed.

## Headline read

There is **no verified DEDICATED retail-accountancy specialist site in the UK**. Every
accountancy rival ranking for retail hire-intent queries is a generalist or regional firm
with a retail sector page (SECTION). The SERPs are instead heavily colonised by three
non-accountancy layers: franchise directories/brokerages, EPOS/POS software vendors, and
business-for-sale marketplaces. That matches the R2 prior ("weak field") exactly: entry
is easy because nobody owns the niche, but nobody owns it partly because "retail" hire
intent fragments into sub-trades (convenience, butcher, fashion, garden centre) and
partly because the highest-volume adjacent queries (franchise, EPOS, business rates)
are answered by non-accountants.

## DEDICATED specialists (0 verified)

None. Closest candidates, all rejected:

- sterlinxglobal.com: has a strong /retail-accountants/ page but the firm is positioned
  as an ecommerce/Amazon accountant first (1,629 URLs, ecommerce-heavy). SECTION.
- livingstonesaccountants.co.uk (7 SERP hits): general small-business firm selling
  shop/retail accounting *spreadsheet products*; not a dedicated retail practice. SECTION.
- 3esaccountants.co.uk (4 hits, all convenience-store queries): fetch blocked (403).
  DDG snippets present it as a general small-business firm with convenience-store
  landing pages. UNVERIFIED, likely SECTION.

## SECTION rivals (22 verified) — generalist firms with a retail sector page

| Domain | Retail surface (fetched) | Notes |
|---|---|---|
| apexaccountants.tax | /retail-and-consumer-goods | large content site, 2,219 URLs, many sector pages |
| sterlinxglobal.com | /retail-accountants/ | ecommerce-first firm, Liverpool |
| atozaccountants.co.uk | /retail-accountants/ | Birmingham small-biz firm, tiny site (24 URLs) |
| bluematrix.co.uk | /retail/ | "Expert Retail Accountants" landing page |
| allenbyaccountants.co.uk | /sectors/retail-accountants/ | London small-biz firm |
| jamestoddandco.co.uk | /retail/ | Chichester regional firm |
| armstrongwatson.co.uk | /sectors/independent-retail-accounting-services | large northern firm, dedicated *independent retail* page |
| alexander.co.uk | /sectors/retail-accountants-tax-advisors/ | Manchester firm |
| finance-equation.co.uk | /retail-accountants/ | London/Essex firm |
| diamondaccounts.co.uk | /sectors/franchise/ | franchise sector page ranks for retail queries |
| eraaconsulting.co.uk | /sectors-we-support/accountants-for-retail-businesses | |
| parsons.co.uk | /sectors/retail-accountants/ | |
| corientbs.co.uk | /expertise/retail-accountants/ | outsourcing provider, sells to practices |
| forrester-boyd.co.uk | /consumer-and-lifestyle/retail-accountancy-services | |
| assets.ltd.uk | /specialisms/retail | Reading firm |
| cliveowen.com | /our-sectors/retail/ | retail and wholesale |
| ross-brooke.co.uk (UHY) | /sectors-we-help/leisure-and-retail/ | leisure+retail combined |
| larking-gowen.co.uk | /what-we-offer/by-industry/retail-accounting/ | East Anglia |
| hawsons.co.uk | /sectors/retail-wholesale-ecommerce-accountants/ | note: retail+wholesale+ecommerce on ONE page |
| jermyn.co.uk | /accountancy/retail-and-e-commerce/ | retail+ecommerce combined |
| yrfaccountants.com | /specialist-sectors/retail-accounting-and-financial... | Bolton |
| phoenix-accountancy.co.uk | retail sector page (.asp legacy) | weak |

Pattern worth noting: several rivals (hawsons, jermyn, sterlinx) treat retail and
ecommerce as ONE combined sector page. The market itself does not draw the wall the
estate needs to draw.

## Adjacent (not accountancy rivals, but own key SERPs)

- Franchise layer: franchisedirect.co.uk, franchise-uk.co.uk, franchiseinfo.co.uk,
  findmyfranchise.co.uk, topfranchise.com, franchiseexpo.co.uk, thebfa.org (blocked),
  plus accountancy-franchise recruitment (taxassistfranchise, dnsaccountantsfranchise,
  taxaccountant.co.uk/franchise). "Franchise accountant" SERPs are dominated by
  directories and franchise-sale intent, not hire-an-accountant intent.
- EPOS/software layer: swanretail.co.uk, eposdirect, expertmarket.com, xero.com,
  askbiz.co. EPOS-accounting queries resolve to software comparisons.
- Business-transfer layer: business-sale.com, uk.businessesforsale.com (blocked),
  rightbiz/daltons (filtered as directories). Buy/sell-a-shop queries skew to listings.
- calcvat.co.uk: content site with a genuinely good retail VAT schemes guide; the main
  informational rival on retail-scheme queries.

## Dropped at judgment (sample)

bing.com (SERP artefact), epageuk.com + gbrbusiness.com + 1stdirectory (directories),
easybookkeepingspreadsheets.com (product store), statista/uk.coop/hays (info/jobs),
shopmerit (price comparison), emotional-intelligence...webbuzzfeed.com (spam),
ecommerceaccountants.co.uk (dedicated ECOMMERCE specialist — evidence for the wall
analysis in DOSSIER.md, not a bricks-and-mortar rival).

## Fetch failures not recovered (UNVERIFIED)

3esaccountants.co.uk, accountsandlegal.co.uk, bradleysaccountants.co.uk,
theaccountancy.co.uk, taxassist.co.uk (franchise network, certainly a SECTION-class
presence on the ground), accountingweb (info), franchiselocal, businessesforsale,
morriscrocker, thebfa.org, tolley (info), plus 202/JS-challenge sites (vanilla, petaccountant,
octane, mcc, bright-x, hayes). None showed dedicated-specialist signals in SERP snippets.
