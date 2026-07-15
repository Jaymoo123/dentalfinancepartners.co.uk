# R3 deep-research dossier — Retail and independent shops accountancy (Tier-2)

Date: 2026-07-15. Branch expansion/phase-0. R2 prior: "weak field, thin differentiation".
Zero paid API calls (no Serper, no DataForSEO); DDG + Google Autocomplete + direct fetch
+ sitemaps only. See r3_call_plan.md for the full call ledger.

## Index

- Summary and verdict pointer
- Competitor field (detail in COMPETITORS.md, data in competitors.json)
- Demand signal (autocomplete)
- Topic pool (topic_pool.json, topic_pool_final.json)
- THE WALL: bricks-and-mortar retail vs the ecommerce site
- The second wall problem: retail vs the generalist site
- Anomalies / limitations (honest record)
- TODO — paid pulls

## Summary

The field is exactly as R2 called it. **Zero dedicated UK retail-accountancy specialist
sites exist** (0 of 108 fetch-verified candidates); the accountancy competition is 22
generalist/regional firms with a retail sector landing page. The SERPs for the niche's
adjacent money terms are owned by non-accountants: franchise directories, EPOS software
vendors, and business-for-sale marketplaces. Barriers to entry are therefore low.

But the demand signal is weak and the topic surface is thin once cleaned. Autocomplete
produced 1,273 unique suggestions of which only ~128 are accountancy-flavoured, and the
final pool of 570 clusters degrades badly on inspection: roughly 55 clusters are consumer
noise (post office savings accounts, hacked shop logins), 40 are ecommerce-adjacent, and
a large share of the remainder is non-UK (Indian shop profit margins) or consumer-side.
Honest usable UK provider-side surface: **roughly 150-180 page-level clusters**, versus
659 for the care niche on the identical method. Verdict and reasoning: VERDICT.md
(CONDITIONAL, leaning NO-GO as a standalone site).

## Competitor field (condensed)

- DEDICATED: 0 verified. Closest were ecommerce-first firms (sterlinxglobal) or firms
  selling shop bookkeeping spreadsheets (livingstones).
- SECTION: 22 verified generalist firms with retail sector pages (competitors.json).
- Adjacent SERP owners: franchise directories (franchisedirect, franchise-uk, thebfa),
  EPOS vendors (swanretail, eposdirect, expertmarket, xero), business-transfer
  marketplaces (business-sale.com, businessesforsale).
- Notable: our own generalist site hollowaydavies.co.uk surfaced organically for
  "accountants for independent shops" (correctly excluded by the estate filter). The
  estate already ranks in this niche without a niche site.

## Demand signal

675 autocomplete probes, 1,273 unique suggestions. Hire-intent heads ("retail
accountant", "accountant for shop") do autocomplete, so real but modest demand exists.
The dominant suggestion mass is consumer/ops queries (profit margin of X shop, post
office accounts, EPOS product names) and franchise-directory intent. Volumes are null
everywhere (no paid pulls); nothing here quantifies demand, it only shapes it.

## Topic pool

- Raw scoped pool: 1,029 terms (autocomplete + 10 rival sitemaps, 7,291 URLs).
- Estate dedupe vs 3,407-row augmented inventory (all 8 legacy sites + all 7 new
  expansion builds incl. ecommerce): 2 exact drops ("what is business rates relief",
  "cafes and coffee shops" - hospitality), 2 fuzzy drops (business-rates-relief
  variants), 67 borderline pairs reviewed - all sorted-token difflib false positives
  (e.g. "accountant for shop" vs "gp accountant"), none are true dupes.
- After junk sweep: 916 terms -> **570 page-level clusters** (greedy, 0.85), of which
  40 flagged ecommerce-adjacent, ~55 consumer noise, and a further long tail of non-UK
  or non-finance terms. Usable core estimate 150-180 clusters. All volumes null.

The low estate-dupe count (4 of 937) is genuine: the estate has almost no
bricks-and-mortar retail content. The niche is empty on our side too.

## THE WALL: bricks-and-mortar retail vs the ecommerce site

The ecommerce site (UK online sellers) owns: Amazon/Shopify/eBay/Etsy/marketplace
sellers, dropshipping, IOSS/OSS, deemed supplier, the £135 import rule, settlement/payout
reconciliation, platform reporting rules, VAT threshold gross-vs-payout, MTD ITSA for
online sellers, sole-trader-vs-ltd for online sellers, trading allowance, COGS/inventory
basics, cash-vs-accruals stock, flat-rate-scheme-wrong-for-sellers.

A retail site's defensible non-overlapping surface is real and specific:

1. **Retail VAT schemes** (point of sale, apportionment 1/2, direct calculation 1/2,
   bespoke): these exist BECAUSE a till cannot itemise VAT per sale. Online platforms
   itemise everything, so the ecommerce site will never need these pages. Cleanest wall.
2. **Mixed-rate food VAT at the till** (hot/cold, eat-in/takeaway edge cases for
   convenience stores and food shops).
3. **Business rates**, RHL relief, small business rates relief for premises. Online
   sellers have no shopfront.
4. **EPOS-to-books**: Z-reads, till reconciliation, cash floats, till shortages,
   shrinkage and stock-loss accounting.
5. **Cash business HMRC scrutiny** (cash economy compliance, takings records).
6. **Premises economics**: rent, VAT on shop rent, lease incentives, shop fit-out
   capital allowances.
7. **Buying/selling a shop**: goodwill, TUPE of shop staff, stock at valuation, BADR.
8. **Franchisee accounting** (franchise fee treatment, franchisor reporting).
9. **Sub-trade pages**: convenience store, newsagent, off-licence, butcher, florist,
   garden centre, forecourt.

Overlap zone to police (route to ecommerce or share nothing): any "online/marketplace/
Shopify/click-and-collect online" angle, inventory/COGS fundamentals (already written on
ecommerce), VAT registration threshold mechanics, MTD ITSA, sole-trader-vs-ltd. A
shop-owner version of these would need a genuinely premises-anchored angle or should not
be written. The market itself does not draw this wall (hawsons, jermyn, sterlinx all run
combined retail+ecommerce pages), which means SERP intent on generic "retail accountant"
queries will keep pulling the two sites toward each other.

**Conclusion on the wall: drawable and defensible.** Items 1-9 are structurally
bricks-and-mortar and enough for a full launch core (services + /for/* + 40-60 posts).
The wall against ecommerce is NOT the binding constraint.

## The second wall problem: retail vs the generalist site

The binding constraint is the generalist wall. "Accountant for a shop" is close to the
definition of a generalist small-business client; the estate's generalist site already
surfaces for these queries, and 2 of our 4 estate dupe hits were generalist/hospitality
pages. Most of the usable pool (business rates, payroll, margins, buying a business) is
content the generalist site could publish without brand strain. A retail niche site would
be differentiated mainly by packaging, not by subject matter, which is R2's "thin
differentiation" restated with evidence.

## Anomalies / limitations (honest record)

- SERP evidence is DDG-only (Serper quota exhausted since the care run; no paid calls
  permitted). Google SERPs may differ, especially local-pack behaviour on "accountant
  for shop" queries.
- 29 of 108 fetch-verifies were bot-blocked or failed (403/202/0). None showed
  dedicated-specialist signals in snippets, but classifications for those are UNVERIFIED.
  taxassist.co.uk (blocked) is a national franchise network that certainly serves
  shopkeepers; treat as a strong SECTION-class presence.
- 111 low-signal single-hit survivors were not fetch-verified (judged from snippets as
  directories/generic firms). A dedicated specialist hiding there is unlikely but not
  impossible.
- All volumes/KD/CPC are null. No demand figures are claimed anywhere in this dossier.
- estate_blog_topics inventory is the 2026-07-11 care-run snapshot plus a fresh harvest
  of the new site dirs; any estate topics added after that in Supabase only are unseen.

## TODO — paid pulls (deferred keyword list)

When paid calls unlock, pull volumes/KD/CPC (DataForSEO Labs, gl=GB) for:

- retail accountant / retail accountants uk / accountant for retail business
- accountant for shop / shop accountant / accountants for independent shops
- convenience store accountant / newsagent accountant / off licence accountant
- franchise accountant / accountants for franchisees
- retail vat scheme / point of sale vat scheme / vat apportionment scheme /
  direct calculation vat scheme / bespoke retail scheme
- vat on food shop sales / takeaway vat rules
- business rates small shop / retail hospitality leisure relief
- epos accounting / till reconciliation / retail stock accounting / retail method
  of accounting / shrinkage accounting
- buying a convenience store / selling a shop business tax / goodwill shop valuation
- cash business hmrc investigation
- plus ranked-keywords pulls for: apexaccountants.tax, armstrongwatson.co.uk,
  sterlinxglobal.com, allenbyaccountants.co.uk, atozaccountants.co.uk (retail paths)
