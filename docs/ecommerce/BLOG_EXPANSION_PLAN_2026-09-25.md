# Ecommerce Finance: net-new content architecture and build plan

Date: 2026-09-25. Site: www.ecommercefinance.co.uk. Company: Ashfield Trading Ltd.
This plan commissions writing. It writes none.

## Executive summary

1. We are building 49 new pages and tools for the online-seller accountancy site, and
   deepening 21 pages that already exist rather than writing new ones next to them.
2. The single biggest thing people search for in this niche is the EORI number, the
   import and export reference every UK seller needs. It is roughly 17,660 searches a
   month and we have no page on it at all.
3. The second biggest is VAT rates in other countries, about 20,150 searches a month,
   and no site in the group covers it.
4. The best performing thing on the site today is not an article, it is the research
   tool. So four of the 49 assets are tools, not writing.
5. Four short commercial pages carry the money. "Amazon accountant uk" is 3,600
   searches a month and nobody is defending it, including us.
6. We are deliberately not chasing general UK tax topics. Those belong to the
   generalist brand by a ruling made in July, and two thirds of that demand collides
   with pages the group already owns.
7. Every keyword we found has been given a home: 1,007 of the 1,039 usable pool
   phrases and all 116 proven niche keywords are assigned to a named page, as the main
   target, a heading, or a question at the foot of the page.
8. Work is cut into three waves. Wave one is a single block of 12 pages plus 3 tools,
   all about importing, exporting and EORI, and it is the test of whether the whole
   approach works.
9. Success is measured per block, not per page: the middle page of the block must
   reach 200 impressions in 90 days. Below 100 and we stop rather than scale.
10. Google and Bing currently show this site for completely different searches with no
    overlap at all, so the two engine readings are reported separately and never added
    together.

---

## 1. Evidence base and what each source is allowed to prove

| Source | Used for | Weight |
|---|---|---|
| `DEMAND_BASELINE_2026-09-25.md` | What the live site earns today, which pages carry it, the Google/Bing split | Strong. Live API pulls. |
| `COMPETITOR_HARVEST_EXTENDED_2026-09-25.md` | The 8 proven subjects and the plateau verdict | Strong for subject shape. |
| `gap_register_v2_2026-09-25.json` | Every volume and difficulty figure quoted below | Strong. Named per row. |
| `pool_classified_2026-09-25.json` | Variant phrasings, FAQ questions, subject coverage | Weak for volume, strong for phrasing. 763 of 1,039 KEEP rows have no measurable volume. |
| `ESTATE_FENCE_CHECK_2026-09-25.md` | What we may not write | Binding. Every DIRECT CONFLICT and OVERLAP respected. |
| `house_positions.md` | Every tax figure a page may state | Binding. Positions 1 to 22. |
| `NETNEW_PROGRAM.md` 5.2, 8.2, 8.3, 8.4 | Page spec, selection rules, measurement | Binding. 8.3 spec used (800 to 1,200 words), not the 5.2 floor. |

Every volume figure in this document is a row in `gap_register_v2_2026-09-25.json`
unless it says "pool" (from `pool_classified_2026-09-25.json`, unmeasured) or names
another source. Difficulty is that register's `kd` field.

Two figures in the brief are restated here because the register disagrees with the
headline and the register wins. The harvest report groups the EORI subject at 17,660 a
month across 36 in-band keywords. The register also contains "eori number" at 14,800 a
month and "number eori" at 14,800, both outside the 100 to 5,000 band and therefore
excluded from that 17,660. The real head term is larger than the subject total the
harvest quotes. It is also harder (kd 31 against a subject median of 12.5). Both are
planned for, with the in-band keywords as the realistic targets and the head term as
the pillar's ambition rather than its promise.

---

## 2. Pillar and cluster architecture

Six clusters. All six map onto the site's existing six content categories. **A seventh
category is not needed.** The pool sweep invented one ("Ecommerce Accounting Services")
for 8 rows about the firm's own service positioning, but those queries belong on
`/services` and `/for` routes, which are not blog categories at all. Adding a seventh
blog category to hold 8 rows would be building a shelf for one book.

### Cluster 1. Importing, exporting and EORI

Category: VAT and Cross-Border Selling.
Pillar: **new page needed**, `/vat/eori-number-explained`. Nothing on the site is about
EORI. House position 11 states the GB/XI distinction in two sentences and no page
expands it. The closest existing pages are `/vat/135-import-rule` (a VAT valuation rule,
not a registration identifier) and `/for/dropshippers` (a hire page).
Spokes: apply, find, GB versus XI, seller-scoped "do I need one", the checker tool, the
import duty calculator, import VAT and duty, low value consignments, importing from
China, exporting and zero rating.

### Cluster 2. EU VAT rates and country reference

Category: VAT and Cross-Border Selling.
Pillar: **new page needed**, `/vat/eu-vat-rates-for-uk-sellers`, with the rates tool as
its data spine. The fence check found zero estate coverage of VAT rates by country
(20,150 a month, verdict CLEAR). `/services/selling-into-the-eu` is a hire page that
earns 1,064 impressions at average position 78.4, which is the shape of a page Google
has decided is not the answer. It stays as the commercial page and links in.
Spokes: the tool, Ireland as the single largest country (24,500 a month in-band across
72 keywords in the assignment map).

### Cluster 3. Marketplace and platform tax

Category: Amazon and Marketplace Selling, plus Platform Reporting and HMRC Letters.
Pillar: **existing page becomes the pillar**, `/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules`.
It already holds the regime. It has zero recorded impressions, which is a question about
indexation, not a reason to write a second one.
Spokes: Vinted, eBay VAT and invoices, Amazon fees, Amazon VAT number, TikTok Shop,
Shopify VAT setup, multi-channel books, settlement reconciliation, returns and refunds.

### Cluster 4. Hire pages (commercial)

Category: routes, not a blog category.
Pillar: **existing page becomes the pillar**, `/for/amazon-sellers`, rebuilt to own
"amazon accountant uk" (3,600 a month, difficulty 0). It currently sits at position
56.4 on 163 impressions.
Spokes: new `/for/ebay-sellers`, new `/for/etsy-sellers`, rebuilt `/for/shopify-sellers`,
new `/services/ecommerce-accounting`, new `/services/ecommerce-bookkeeping`, and one
blog post on choosing an ecommerce accountant.

### Cluster 5. VAT admin for sellers

Category: VAT and Cross-Border Selling, plus Making Tax Digital and Self Assessment.
Pillar: **existing page becomes the pillar**, `/services/ecommerce-vat-compliance`.
Spokes: VAT certificate, VAT invoice requirements, the VAT number checker tool, MTD for
VAT, first Self Assessment return, reclaiming import VAT through the C79.

### Cluster 6. Bookkeeping, inventory and money

Category: Bookkeeping and Inventory, plus Business Structure and Tax.
Pillar: **existing page becomes the pillar**, `/blog/bookkeeping-and-inventory/cogs-inventory-basics`.
It absorbs 198 pool rows on its own, the largest single absorption in the plan, because
the pool's 175 near-identical "cogs formula" phrasings are one page's worth of variant
wording, not 175 pages.
Spokes: inventory valuation methods, stock in transit, allowable expenses, FX and
multi-currency, accounting software connections, business bank account, capital
allowances, selling the business, switching accountant, the fee data asset, VAT red
flags, digital products.

---

## 3. The page table

49 assets. Priority tiers: **T1** has a measured in-band target keyword and a peer
ranking; **T2** has measured volume but thinner or harder; **T3** is pool-only or gap-only
evidence with no measured volume, planned but explicitly unproven.

Volume column is the in-band (100 to 5,000 a month) sum of the keywords assigned to that
page in the assignment map, with the primary target named. "Closest existing page" is the
cannibalisation check required by rule 4 of section 8.2.

### Cluster 1: importing, exporting and EORI (wave 1)

| # | Slug | Working title | Primary target (vol/kd) | Absorbed in-band vol | Type | Closest existing page and why this is not it | Tier |
|---|---|---|---|---|---|---|---|
| 1 | `/tools/eori-number-checker` | EORI Number Checker: Validate a GB, XI or EU EORI | eori number checker (6,600/13) | 9,160 across 38 kw | tool | None. No tool on the site touches customs identifiers. | T1 |
| 2 | `/vat/eori-number-explained` | What Is an EORI Number and Do You Need One to Sell Online? | eori number (14,800/31), eori (3,600/24) | 14,690 across 46 kw | hub (pillar) | `/vat/135-import-rule` is a VAT valuation threshold, not an identifier. No overlap of subject. | T1 |
| 3 | `/vat/how-to-apply-for-an-eori-number` | How to Apply for an EORI Number (and How Long It Takes) | apply for eori number (1,600/25) | 6,440 across 23 kw | blog | Page 2 explains what it is. This is the procedure. Split follows the query split in the register. | T1 |
| 4 | `/vat/find-your-eori-number` | Where to Find Your EORI Number | how to find my eori number (320/24) | 860 across 11 kw | blog | Distinct intent from apply. Thin on its own; merge into page 2 if the wave-1 read is weak. | T2 |
| 5 | `/vat/gb-and-xi-eori-numbers` | GB and XI EORI Numbers: Which One You Need | xi eori number (320/8) | 1,000 across 7 kw | blog | House position 11 is the ground truth. No page expands it. | T2 |
| 6 | `/blog/.../do-i-need-an-eori-number-to-sell-online` | Do You Need an EORI Number to Sell on Amazon, eBay or Shopify? | pool rows only | pool | blog | Seller-scoped version of page 2. Written only if pages 2 and 3 read well at 28 days. | T3 |
| 7 | `/tools/import-duty-and-vat-calculator` | UK Import Duty and VAT Calculator | uk import duty calculator (4,400/23) | part of 52,590 across 179 kw | tool | The site has 4 calculators, none touching customs. | T1 |
| 8 | `/vat/import-vat-and-duty-on-goods-you-buy-to-resell` | Import VAT and Duty on Stock You Buy to Resell | import tax uk (2,900/60) | 52,590 across 179 kw (shared with 7) | hub | `/vat/postponed-vat-margin-scheme` covers how to account for import VAT, not when it arises or what duty is. **Fence query, see section 8.** | T2 |
| 9 | `/vat/low-value-consignments-and-de-minimis` | Low Value Consignments and the De Minimis Rules | vat de minimis rules (110/0) | 330 across 4 kw | blog | `/vat/135-import-rule` is the UK £135 rule. This is the wider de minimis picture including the EU €150 ceiling. Named as a gap by the pool sweep. | T2 |
| 10 | `/blog/.../importing-stock-from-china-uk-vat-and-duty` | Importing Stock From China: The VAT and Duty You Will Pay | import from china (480/1) | 2,740 across 31 kw | blog | Nothing on the site covers sourcing imports. | T2 |
| 11 | `/blog/.../exporting-goods-zero-rating-and-evidence` | Exporting Goods From the UK: Zero Rating and the Evidence You Must Keep | zero rate vat (590/7) | 6,000 across 38 kw | blog | House position 5. No page states it. | T2 |
| 12 | `/blog/.../ioss-intermediary-uk-how-to-appoint-one` | IOSS Intermediary UK: What It Costs and How to Appoint One | ioss intermediary uk (181 impressions at position 24.7, GSC) | see note | blog | `/vat/ioss-vs-oss` explains the schemes. This is the intermediary appointment, which is where the live impressions already sit unclicked. | T1 |
| 13 | `/tools/vat-rates-by-country` | VAT Rates by Country: UK Seller Reference | french vat (1,000/12), vat rate in ireland (1,300/0) | 76,180 across 427 kw | tool | None. Fence verdict CLEAR. | T1 |
| 14 | `/vat/eu-vat-rates-for-uk-sellers` | EU VAT Rates for UK Sellers: What Applies Where | vat check eu (1,600/28) | 11,410 across 58 kw | hub | `/services/selling-into-the-eu` is a hire page at position 78.4. This is reference content feeding the tool. | T1 |
| 15 | `/vat/selling-to-ireland-from-the-uk` | Selling to Ireland From the UK: VAT, Rates and Paperwork | vat rate in ireland (1,300/0) | 24,500 across 72 kw | blog | Ireland is the largest single country in the CLEAR bucket and the closest EU market. No existing page names a country. | T1 |

Note on #12: this is a GSC-impression target, not a register target. It is the single
cheapest win in the whole dataset (181 impressions already earned at position 24.7,
zero clicks). It is in wave 1 because it tests whether comparison-shaped and
procedure-shaped pages lift a subject we are already eligible for.

### Cluster 2: marketplace and platform tax (wave 2)

| # | Slug | Working title | Primary target (vol/kd) | Absorbed in-band vol | Type | Closest existing page and why this is not it | Tier |
|---|---|---|---|---|---|---|---|
| 16 | `/blog/.../vinted-tax-uk` | Vinted Tax UK: When Selling Becomes Taxable | vinted tax rules (590/0) | 5,340 across 35 kw | blog | `/blog/.../ebay-tax-rules-uk` is eBay-shaped; `/for/marketplace-sellers` is a hire page with zero impressions. Vinted is its own 4,010-a-month subject in the harvest. | T1 |
| 17 | `/blog/.../ebay-vat-and-vat-invoices` | eBay VAT and VAT Invoices: How to Get One and What It Shows | ebay vat receipt (170/38) | 3,100 across 28 kw | blog | `/blog/.../ebay-tax-rules-uk` is income tax and trading status. This is VAT and invoicing. Different subject on the same platform. | T2 |
| 18 | `/blog/.../amazon-seller-fees-uk` | Amazon Seller Fees UK: What They Cost and How They Are Taxed | amazon fba fees (480/29) | 3,040 across 29 kw | blog | `/blog/.../is-it-worth-selling-on-amazon-uk` is survival data; `/vat/vat-on-marketplace-fees` is the reverse charge. Neither lists what the fees are. | T1 |
| 19 | `/blog/.../amazon-vat-number-seller-central` | Adding Your VAT Number to Amazon Seller Central | vat number amazon (170/0) | 2,170 across 14 kw | blog | Nothing on the site covers platform VAT settings. | T2 |
| 20 | `/blog/.../tiktok-shop-tax-uk` | TikTok Shop Tax UK: What You Owe and When | tiktok shop fees (170/0) | 960 across 15 kw, 25 pool | blog | `/for/marketplace-sellers` names TikTok in one line. | T2 |
| 21 | `/blog/.../shopify-vat-setup-uk` | Setting Up VAT on Your Shopify Store (UK) | pool-led, 61 pool rows | 0 measured | blog | `/for/shopify-sellers` is a hire page. This is the configuration question. | T3 |
| 22 | `/blog/.../multi-channel-seller-one-set-of-books` | Selling on Three Platforms, Keeping One Set of Books | pool-led, 12 pool rows | 0 measured | blog | `/services/settlement-payout-reconciliation` is the service. This is the method. | T3 |
| 23 | `/blog/.../reconcile-an-amazon-settlement-report` | How to Reconcile an Amazon Settlement Report, Line by Line | pool-led, 21 pool rows | 430 across 3 kw | blog | `/services/settlement-payout-reconciliation` sells the work. This shows the work. Genuine risk of overlap; the service page must be trimmed to selling and this page must hold the method. | T2 |
| 24 | `/blog/.../returns-refunds-and-chargebacks-in-your-accounts` | Returns, Refunds and Chargebacks in Your Accounts | pool-led | 0 measured | blog | Not covered anywhere. | T3 |

### Cluster 3: hire pages (wave 2)

| # | Slug | Working title | Primary target (vol/kd) | Absorbed in-band vol | Type | New or extension | Tier |
|---|---|---|---|---|---|---|---|
| 25 | `/for/amazon-sellers` | Amazon Accountant UK | amazon accountant uk (3,600/0) | 4,580 across 15 kw, 50 pool | hub | **Extension.** Page exists at position 56.4. Its meta title already reads "Amazon FBA Accountants UK" but the page is built around FBA mechanics, not the hire query. Rebuild the opening and the title to answer "who do I hire". | T1 |
| 26 | `/for/ebay-sellers` | eBay Accountant UK | ebay accountant (110/0) | 440 across 4 kw, 8 pool | hub | **New.** Currently folded into `/for/marketplace-sellers`, which has zero recorded impressions. Splitting eBay out gives the query its own title. | T1 |
| 27 | `/for/shopify-sellers` | Shopify Accountant UK | shopify accountants (210/0) | 6,970 across 14 kw, 54 pool | hub | **Extension.** Exists, meta title already close. Rebuild for the hire query. | T1 |
| 28 | `/for/etsy-sellers` | Etsy Accountant UK | no measured volume | 22 pool | hub | **New.** Parallel to 26. Etsy is the site's second strongest blog subject (500 impressions at position 11.1) with no hire page of its own. | T3 |
| 29 | `/services/ecommerce-accounting` | Ecommerce Accountant UK | ecommerce accountants (720/3), ecommerce accountant (390/2) | 3,320 across 22 kw, 84 pool | service | **New.** `/services/ecommerce-vat-compliance` is VAT only. This is the full-service page the head term wants. | T1 |
| 30 | `/services/ecommerce-bookkeeping` | Ecommerce Bookkeeping Services | pool-led, 30 pool rows | 0 measured | service | **New.** Generic "bookkeeping" is fenced to the generalist brand; this page is scoped to seller bookkeeping only. | T2 |
| 31 | `/blog/.../how-to-choose-an-ecommerce-accountant` | How to Choose an Accountant for Your Online Shop | pool-led, 24 pool rows | 0 measured | blog | **New.** Bottom-of-funnel, feeds 25 to 30. | T2 |

### Cluster 4: VAT admin for sellers (wave 3)

| # | Slug | Working title | Primary target (vol/kd) | Absorbed in-band vol | Type | Closest existing page | Tier |
|---|---|---|---|---|---|---|---|
| 32 | `/tools/vat-number-checker` | Check a UK or EU VAT Number | vat number check (33,100/44) | 34,370 across 87 kw | tool | None. **Fence query, see section 8.** | T1 |
| 33 | `/vat/vat-certificate` | VAT Certificate: What It Is and How to Download Yours | vat certificate (1,900/1) | 4,470 across 22 kw | blog | None. Fence verdict CLEAR. | T1 |
| 34 | `/vat/vat-invoice-requirements-for-sellers` | What a VAT Invoice Must Show | vat invoice (1,000/13) | 8,470 across 46 kw | blog | None. Fence verdict CLEAR. | T1 |
| 35 | `/blog/.../mtd-for-vat-for-online-sellers` | Making Tax Digital for VAT: What Online Sellers Must Do | pool-led, 4 pool rows | 0 measured | blog | `/blog/.../mtd-itsa-online-sellers` is income tax MTD. Different regime, different dates. | T2 |
| 36 | `/blog/.../self-assessment-for-online-sellers` | Your First Self Assessment Return as an Online Seller | pool-led, 3 pool rows | 0 measured | blog | `/blog/.../trading-allowance-online-sellers` covers whether you must file. This covers filing. | T2 |
| 37 | `/blog/.../reclaiming-import-vat-the-c79` | Reclaiming Import VAT: the C79 and Your VAT Return | part of cluster 1 keyword set | see #8 | blog | `/vat/postponed-vat-margin-scheme` covers PVA, the alternative to paying at the border. The C79 route is not covered. | T2 |

### Cluster 5: bookkeeping, inventory and money (wave 3)

| # | Slug | Working title | Evidence | Type | Closest existing page | Tier |
|---|---|---|---|---|---|---|
| 38 | `/blog/.../inventory-valuation-methods-uk-sellers` | FIFO, Average Cost and What HMRC Accepts | 48 pool rows | blog | `/blog/.../cogs-inventory-basics` states lower of cost and NRV. Methods are not covered. | T2 |
| 39 | `/blog/.../stock-in-transit-and-fba-inventory-at-year-end` | Stock in Transit and FBA Inventory at Year End | pool-led | blog | Not covered. | T3 |
| 40 | `/blog/.../allowable-expenses-for-online-sellers` | What an Online Seller Can Actually Claim | 5 pool rows | blog | Not covered. Must stay seller-scoped; generic expenses are fenced. | T2 |
| 41 | `/blog/.../multi-currency-and-fx-for-online-sellers` | Multi-Currency Sales and FX Gains: How They Hit Your Tax | 1 pool row, named gap in the pool sweep | blog | Not covered. | T3 |
| 42 | `/blog/.../ecommerce-accounting-software-what-connects-to-what` | Connecting Your Shop to Your Books | 2 pool rows | blog | Not covered. **Xero and QuickBooks are fenced; this page compares connectors, not ledgers.** | T3 |
| 43 | `/blog/.../business-bank-account-for-online-sellers` | Do You Need a Separate Bank Account to Sell Online? | 1 pool row | blog | Not covered. | T3 |
| 44 | `/blog/.../capital-allowances-on-seller-equipment` | Claiming for Racking, Printers and Packing Kit | 1 pool row, house position 22 | blog | Not covered. | T3 |

### Cluster 6: growth, exit and data (wave 3)

| # | Slug | Working title | Evidence | Type | Closest existing page | Tier |
|---|---|---|---|---|---|---|
| 45 | `/blog/.../selling-your-ecommerce-business` | Selling Your Online Shop: the Tax on the Way Out | named gap in the pool sweep | blog | Not covered. Capital gains generally is fenced; disposal of a seller business is not. **Fence query, see section 8.** | T3 |
| 46 | `/blog/.../switching-accountant-as-an-online-seller` | Changing Accountant Mid-Year as an Online Seller | named gap in the pool sweep | blog | Not covered. | T3 |
| 47 | `/research/marketplace-fee-index` | UK Marketplace Fee Index: What Amazon, eBay and Etsy Actually Charge | ebay selling fees (3,600/26), shopify fees (4,400/13), amazon fba fees (480/29) | data asset | `/research/online-seller-index` is Companies House data. This is fee data. The two research pages are the site's strongest assets, so a third is the highest-confidence bet in the plan. | T1 |
| 48 | `/blog/.../vat-red-flags-for-online-sellers` | The VAT Mistakes That Get Online Sellers Caught | 99 pool rows routed to the VAT compliance pillar; this page takes the mistake-shaped ones | blog | `/services/ecommerce-vat-compliance` sells the fix. | T2 |
| 49 | `/blog/.../vat-on-digital-products-and-downloads` | VAT on Digital Products and Downloads | pool-led | blog | Not covered. Relevant to Etsy digital sellers and print on demand. | T3 |

### Why 49 and not 60

The budget allows 50 to 60. The honest number is 49 because the evidence runs out. Of
the 49, 14 are already T3, meaning pool-only or gap-only evidence with no measured
volume behind them. Adding 11 more would mean adding pages with weaker evidence than
the weakest one already on the list. The competitor harvest's plateau verdict is the
reason: 25 vendor domains carrying 11,199 extra keywords added exactly zero new
ecommerce-topical subjects. The niche is genuinely narrow. The extra budget is better
spent on the 21 extensions in section 4, which put the same words in front of readers
on pages that already have crawl history.

---

## 4. The extensions: 21 existing pages that absorb demand instead of being duplicated

Rule 4 of section 8.2 says that if a page of ours is already the subject, the action is
extend, not write. These are the extensions, with what they absorb.

| Existing page | Absorbs | Work |
|---|---|---|
| `/blog/.../ebay-tax-rules-uk` | 151 register kw, 41,760 in-band vol, 45 pool rows | Add H2s for "how much can you sell on eBay before paying tax" (480/0) and the eBay fee stack (3,600/26 family). Largest single absorption of measured volume in the plan. |
| `/blog/.../cogs-inventory-basics` | 198 pool rows | Add the "cogs formula" phrasings as H2s and FAQs. The 175 near-duplicates are one page's variant wording. |
| `/services/ecommerce-vat-compliance` | 99 pool rows | Becomes the cluster 5 pillar. Add an FAQ block of seller VAT questions. |
| `/vat/ioss-vs-oss` | 28 register kw, 79 pool rows | Rework to comparison shape. 33 queries sit at position 11 to 30 with zero clicks, mostly "difference between IOSS and OSS". This is the cheapest single fix on the site. |
| `/services/selling-into-the-eu` | 1,064 impressions at position 78.4 | Trim to a hire page and hand reference content to assets 13 and 14. |
| `/vat/postponed-vat-margin-scheme` | 51 register kw, 16,060 in-band vol | Add "postponed vat statement" (1,900/0) as an H2. |
| `/services/hmrc-letter-online-sales` | 44 register kw, 13,640 in-band vol | Add voluntary disclosure (590/0) as an H2. |
| `/blog/.../flat-rate-scheme-wrong-for-sellers` | 12 register kw, 12,980 in-band vol | Add the scheme-name phrasings. Note: the limited-cost claim on this page was reversed and fixed in port phase 0; re-verify before touching. |
| `/blog/.../etsy-fees-vat-and-tax` | 37 register kw, 9,820 in-band vol, 22 pool rows | Add Etsy fee-schedule H2s. |
| `/blog/.../cash-vs-accruals-stock` | 17 register kw, 8,080 in-band vol | Add accrual-terminology phrasings. |
| `/vat/135-import-rule` | shares cluster 1 demand | Add internal links to assets 8 and 9; add the EU €150 contrast. |
| `/for/shopify-sellers` | 14 register kw, 6,970 in-band vol, 54 pool | See asset 27. |
| `/blog/.../mtd-itsa-online-sellers` | 15 register kw, 6,280 in-band vol | Add "mtd for income tax" head phrasings. |
| `/vat/vat-on-marketplace-fees` | 32 register kw, 5,770 in-band vol | Add "is there VAT on Amazon Prime" (140/0) as an FAQ. |
| `/for/amazon-sellers` | 15 register kw, 4,580 in-band vol, 50 pool | See asset 25. |
| `/blog/.../trading-allowance-online-sellers` | 8 register kw, 2,810 in-band vol, 43 pool | Add side-hustle phrasings and the personal allowance interaction named as a pool gap. |
| `/blog/.../platform-reporting-rules` | 30 pool rows | Add the 31 January reporting calendar, named as a pool gap. Check indexation first: this page has zero recorded impressions. |
| `/blog/.../sole-trader-vs-ltd-online-sellers` | 41 pool rows | Add seller-scoped incorporation phrasings only. Generic incorporation is fenced. |
| `/for/dropshippers` | 21 pool rows | Check indexation first: zero recorded impressions. |
| `/blog/.../vat-threshold-gross-vs-payout` | 4 pool rows | Seller-scoped registration phrasings only. |
| `/blog/.../print-on-demand-tax-uk` | 1 register kw, 1 pool row | Already at position 7.7 with 6 clicks. Light touch only. |
| `/blog/.../online-seller-formation-trends` | 2 register kw, 2 pool rows | Data is five months stale per the site state doc. Refresh before extending. |

Two of these pages (`platform-reporting-rules`, `/for/dropshippers`) and two more
(`online-seller-survival-odds`, `/for/marketplace-sellers`) record zero impressions in
the GSC page pull. The demand baseline flags this as a question, not a finding. **Check
indexation before spending writing time on them.**

---

## 5. The keyword assignment map

Every `uk_relevant` keyword in the gap register and every KEEP row in the classified
pool has been given exactly one disposition. The row-level output is
`docs/ecommerce/keyword_assignment_map_2026-09-25.json`, which lists each keyword with
its page or its one-word unassigned reason, so the assignment can be checked rather
than believed.

### How the assignment works

1. If the keyword carries no strong ecommerce token (a platform name, EORI, IOSS, OSS,
   VAT certificate, VAT invoice, VAT number check), it is first tested against the
   fence, the non-UK list and the off-service list. This ordering is deliberate: it is
   what stops "hm revenue and customs login" (1,220,000 a month) and the stamp duty
   family being swept into an import page by a loose word match.
2. Surviving keywords run through an ordered rule list, one rule per planned page, first
   match wins.
3. A set of pages whose subject has a generic twin owned by the generalist brand
   (self assessment, expenses, bookkeeping, software, bank account, MTD, capital
   allowances, switching accountant, business sale, ecommerce accounting) only accepts a
   keyword that also carries a seller or platform token. A generic version goes to the
   fence.
4. Pool KEEP rows that no rule matched fall back to their own category's pillar page, as
   variant phrasings and FAQ questions. 202 of the 1,007 assigned pool rows landed this
   way.

### The counts

**Classified pool (KEEP rows only):**

| Disposition | Rows | Share |
|---|---|---|
| Assigned to a page by rule | 805 | 77.5% |
| Assigned to a pillar by category fallback | 202 | 19.4% |
| Unassigned, reason "fenced" | 32 | 3.1% |
| **Total KEEP** | **1,039** | **100%** |

1,007 of 1,039 KEEP rows have a home. The 32 that do not are fenced (Xero recording,
inventory accounting standards, generic side-hustle expenses).

**Gap register, `uk_relevant` rows:**

| Disposition | Keywords | Monthly volume | Share of volume |
|---|---|---|---|
| Assigned to a planned or existing page | 1,683 | 886,210 | 3.5% |
| Unassigned: fenced | 5,458 | 9,714,140 | 38.7% |
| Unassigned: zero-relevance | 9,675 | 12,151,150 | 48.4% |
| Unassigned: off-service | 245 | 2,304,490 | 9.2% |
| Unassigned: non-UK | 265 | 56,420 | 0.2% |
| **Total** | **17,326** | **25,112,410** | **100%** |

**That 3.5% headline is the wrong denominator to judge the plan by, and here is why.**
The 25.1 million figure is the raw sum of every UK-relevant keyword any of 54 competitor
domains ranks for, including head terms like "hm revenue and customs login" at 1.22
million a month that no accountancy site of our class will ever win. The register's own
four-rule filter exists precisely to remove these. Against the filtered denominators:

| Denominator | Keywords | Volume | Assigned kw | Assigned volume | Share of volume assigned |
|---|---|---|---|---|---|
| All `uk_relevant` | 17,326 | 25,112,410 | 1,683 | 886,210 | 3.5% |
| `uk_relevant` in the realistic 100 to 5,000 band | 10,930 | 7,224,070 | 924 | 408,790 | 5.7% |
| Passing all four selection rules | 1,588 | 903,890 | 268 | 110,190 | 12.2% |
| Ecommerce-topical survivors | 116 | 38,570 | **116** | **38,570** | **100%** |

**Every one of the 116 proven ecommerce keywords is assigned.** That is the number the
plan should be judged on. The share falls as the denominator widens because the wider
denominators are mostly generalist-owned or irrelevant, which is the fence check's own
finding restated: of 337,820 searches a month across the 612 generic keywords it
examined, about 130,000 collide with a sister site outright and a further 85,000 sit
beside one.

### Where the unassigned volume actually goes

The 38.7% marked fenced is the money the owner is choosing to leave with the generalist
brand. Its largest components, from the fence check: accounting packages and services
(35,580/mo, DIRECT CONFLICT), general VAT rate and threshold (31,870, DIRECT CONFLICT),
Companies House identity verification (27,000, Property owns it), P800 (19,640), tax
codes (17,600), NI (16,620), VAT registration process (15,910), small business
accountant (13,550), UTR (8,550), Xero (7,200), mileage (3,440), CIS (3,500).

The 48.4% marked zero-relevance is not a near miss. Spot-checked top rows: "accountancy
company", "goods and services tax gst", "top business banking accounts", "high tax
bracket", "tax attorney", "hmrc name and shame list", "hmrc complaints". These are
general accountancy and personal finance terms that arrived in the register because 16
generalist UK accountancy firms were harvested as peer domains.

### Known noise in the map

The map is rule-based, so its errors are visible rather than hidden. Residual
misassignments spotted on inspection and left in with their volume counted, because
removing them one by one would be hand-tuning the evidence:

- `/vat/import-vat-and-duty...` still holds some generic customs administration rows.
- `/blog/.../platform-reporting-rules` holds two "report to HMRC anonymously" rows,
  which are tax-evasion reporting, a different subject.
- `/blog/.../ebay-tax-rules-uk` holds eBay fee-schedule rows that will in practice be
  written on asset 18.

The effect is that the assigned volume figures per page in section 3 are upper bounds,
not promises. Treat the keyword counts as more reliable than the volume sums.

---

## 6. The tools

Four tools. The case for building tools at all is measured, not assumed: the site's best
performing page is `/research/online-seller-index` at average position 8.2 holding 7 of
the site's 30 total clicks, ahead of every content page, and it is a data asset.

### Tool 1. EORI number checker

**Route:** `/tools/eori-number-checker`.
**Does:** validates the format of a GB, XI or EU EORI number, explains what each part
means, and for EU and XI numbers performs a live validity check.
**Data source:** the European Commission's EORI validation service (the EOS system at
ec.europa.eu) is free and publicly queryable and covers EU and XI numbers.
**Honest flag on GB numbers:** HMRC operates a public "Check an EORI number" service on
tax.service.gov.uk, but **I could not verify that a documented, free, public API exists
behind it.** I am not assuming one does. Build the tool so that GB numbers get format
validation plus a clearly labelled link out to HMRC's own service, and treat a live GB
lookup as an upgrade to be added only if an API is confirmed. Do not ship a GB lookup
that screen-scrapes a government service.
**Schema:** WebApplication JSON-LD, the pattern already used on the site's four
calculators.
**Kept current:** format rules change rarely; the EU service is live. Review annually
alongside the rates ledger.

### Tool 2. VAT rates by country

**Route:** `/tools/vat-rates-by-country`.
**Does:** a searchable table of standard and reduced VAT rates for EU member states plus
the non-EU European markets UK sellers ship to, with the date each rate was last
confirmed and a note on which rate applies to distance sales.
**Data source:** the European Commission publishes VAT rates applied in member states
(Taxation and Customs Union, and the TEDB database). Free and reusable with attribution.
Non-EU rates (Switzerland, Norway) come from each national tax authority.
**Honest flag:** **no free real-time rates API was verified.** This is a maintained
dataset, not a feed. Budget a quarterly manual review, and stamp every row with the date
it was confirmed, exactly as the site already does on `/research/online-seller-index`.
If nobody will own the quarterly review, do not build it, because a stale tax rate table
is a claims-integrity incident waiting to happen.
**Schema:** Dataset JSON-LD (already proven on the research index) plus WebApplication.

### Tool 3. Import duty and VAT calculator

**Route:** `/tools/import-duty-and-vat-calculator`.
**Does:** given a commodity code, country of origin and consignment value, returns the
duty and import VAT due, and shows the postponed VAT accounting alternative.
**Data source:** the UK Integrated Online Tariff API on gov.uk, published under the Open
Government Licence, free.
**Honest flag:** the hard part is commodity code lookup, not the arithmetic. A seller who
does not know their code cannot use the tool. Ship with a code search that queries the
tariff API's own search endpoint, and if that proves unreliable, ship the calculator
with a manual code field and a link to the official search rather than guessing codes.
**Schema:** WebApplication.

### Tool 4. VAT number checker

**Route:** `/tools/vat-number-checker`.
**Does:** validates a UK or EU VAT registration number and returns the registered name
and address where the source provides it.
**Data source:** HMRC's "Check a UK VAT number" API on the HMRC Developer Hub is free and
public (registration required for a key). The EU VIES service is free and public for EU
numbers.
**Honest flag:** this is the one tool with a fence question over it. "vat number check"
and family total 34,370 a month in-band, but the fence check put "VAT
registration/deregistration process" in the OVERLAP bucket against the generalist brand,
and this tool sits next to it. **Do not build it until the owner rules.** See section 8.
**Schema:** WebApplication.

---

## 7. Waves and measurement

### Wave 1: cluster 1, importing, exporting and EORI. 12 content pages plus 3 tools.

Assets 1 to 15.

**Why this cluster.** Four reasons, in order of weight. It contains the single largest
proven subject in the niche (EORI, 46% of the winnable volume) and we have literally no
page on it, so it is a pure eligibility gap in the section 8.1 sense. It contains the
largest fence-CLEAR subject (VAT rates by country, 20,150 a month, no estate coverage).
It contains the cheapest existing win (the IOSS intermediary queries already earning 181
impressions at position 24.7 with zero clicks). And it sits in the category that already
carries 59% of the site's impressions, so if new pages cannot earn here, the selection
rule is wrong and we should find that out on 15 assets rather than 49.

**Cohort definition for measurement:** the 12 content pages. The 3 tools are measured
separately, because a tool and an article are not the same product and pooling them
would hide which one worked.

### Wave 2: clusters 2 and 3, marketplace pages and hire pages. 16 assets (16 to 31).

Rationale: once eligibility is proven, take the commercial terms, because
"amazon accountant uk" at 3,600 a month and difficulty 0 is worth more per visit than
any article in the plan and nobody is defending it.

### Wave 3: clusters 4, 5 and 6, VAT admin, bookkeeping and growth. 18 assets (32 to 49).

Rationale: the long tail and the depth work, including the 14 T3 assets whose evidence
is pool-only. This wave is the one to cut if wave 1 reads badly.

### Measurement, per section 8.4

Register all 49 in `monitored_pages` with both engines' baselines at zero at publish.

Counting from a build starting **2026-09-25** and assuming wave 1 publishes
**2026-10-09** (two weeks to write, review and deploy 15 assets):

| Read | Engine | Date |
|---|---|---|
| Wave 1 first read | Bing, 28 days | **2026-11-06** |
| Wave 1 second read | Google, 90 days | **2027-01-07** |

If wave 1 instead publishes on the day the build starts (2026-09-25), the reads fall on
2026-10-23 and 2026-12-24. The dates move with the publish date, not the start date.

Projected, and dependent on wave 1 passing:

| Wave | Assumed publish | Bing 28d | Google 90d |
|---|---|---|---|
| 2 | 2026-11-13 | 2026-12-11 | 2027-02-11 |
| 3 | 2027-01-15 | 2027-02-12 | 2027-04-15 |

**Success:** cohort median above 200 impressions at 90 days.
**Kill:** cohort median below 100 impressions at 90 days. The programme stops, it does
not scale.
**Base rate to beat:** 26% of existing pages reach 200+ impressions per 90 days; the
median reaches 54.

### The two engines measure different query sets and must never be pooled

This is not a caution, it is a measured fact about this specific site. The demand
baseline compared 310 Google queries against 182 Bing queries and found **zero exact-text
overlap**. Google is finding the site for short head terms ("ioss intermediary", "ioss
uk") and ranking it at an impression-weighted average position of 29.6. Bing is finding
it for long conversational strings ("hmrc trading allowance £1000 online selling
freelance") and ranking it at 6.0.

Consequences for the reads:

- Report two numbers, always. A combined impression count is meaningless here because
  the two numbers describe different demand.
- The Bing 28-day read tests whether the pages get indexed and rank on long-tail
  phrasings. It is a **speed and phrasing** signal.
- The Google 90-day read tests whether the pages become eligible on head terms. It is
  the **eligibility** signal, and it is the one the success and kill thresholds in
  section 8.4 were calibrated against.
- A wave that passes on Bing and fails on Google has not passed. Do not let the earlier,
  friendlier number authorise the next wave on its own. **Owner decision needed:** does
  wave 2 start at the wave 1 Bing read on 2026-11-06, or wait for the Google read on
  2027-01-07? The programme doc's wording ("run ONE cohort before any second cohort is
  authorised") reads as the latter.

---

## 8. Fence queries for the owner

These are subjects where I judged the fence unclear. They are **not planned in**. Each
needs a yes or no before it is written.

1. **VAT number checker tool** (34,370/mo in-band, asset 32). The fence check verdict for
   the VAT certificate and VAT invoice family was CLEAR, but "VAT registration process"
   was OVERLAP against the generalist brand, and checking someone else's VAT number sits
   between the two. The seller-facing case is real: sellers check supplier and business
   customer numbers. Build here, build on generalist, or not at all?
2. **Generic import VAT, duty and customs** (part of 52,590/mo in-band, assets 7 and 8).
   The DEDUP audit names "generic import PVA/customs" as content that must stay
   generalist-owned. But importing stock is the core act of being an online seller and
   the generalist brand has no import content the fence check found. Does the seller
   framing clear the fence, or is the whole subject generalist's?
3. **Xero or QuickBooks for ecommerce** (named as a pool gap; Xero is 7,200/mo and a
   DIRECT CONFLICT). Asset 42 is scoped to connectors only and deliberately avoids
   naming a ledger as better. Is a seller-scoped software comparison allowed at all?
4. **Company formation cost for a seller** (named as a pool gap). Generic company
   formation is fenced. "How much to set up a limited company for my Amazon business" is
   seller-scoped. Allowed?
5. **Capital gains on selling the business** (asset 45). Generic capital gains is fenced
   and sits close to Property. Disposal of a trading online shop is not obviously either.
6. **Salary and dividend extraction for seller companies.** Explicitly fenced by the
   DEDUP audit. Not planned. Raising it only because the incorporation decision is 42%
   of the site's leads per the audience-intent memory, so the omission is deliberate and
   visible.
7. **Tax codes and P800** (17,600 and 19,640/mo, both in the fence check's CLEAR
   bucket). Genuinely unowned by the estate but nothing to do with running an online
   shop. Recommend leaving them, and if the volume is wanted, routing them to the
   generalist brand. Included here only so the choice is recorded rather than assumed.

---

## 9. Risks and open questions

**Could not verify.**

- Whether HMRC publishes a free public API for GB EORI validation. Tool 1 is specified
  around not having one.
- Whether a free real-time VAT rates feed exists for tool 2. Specified as a maintained
  dataset instead, with a quarterly owner.
- Whether the UK tariff API's commodity code search is good enough to carry tool 3's
  main input.
- Regional or cohort breakdowns of the Companies House data that could feed a fourth
  research asset. Not proposed, because the existing pull is aggregate only and the site
  state doc says cohort survival curves were deferred for want of a bulk snapshot.

**Open questions for whoever builds this.**

- Four existing pages record zero impressions. Indexation check needed before any of
  them is extended. This is a question, not a finding.
- The formation data behind `/research/online-seller-index` and its blog post is settled
  only through April 2026, five months stale. Refresh before extending either.
- `/research/online-seller-index` publishes 50,699 while the rest of the site publishes
  50,772 for the same 2021 quantity, measured differently. Both are disclosed. A third
  data asset (#47) adds a third surface where numbers must agree. Decide the display rule
  before building it.
- The port is at phase 0 of 6. These 49 assets will be written into a design that is
  scheduled to change under them. Sequencing decision needed: write first and port after,
  or port first.
- 14 of the 49 are T3, meaning no measured volume. If the wave 1 read is weak, cut T3
  before cutting anything else.

**Risks.**

- **Over-absorption.** Twenty-one extensions is a lot of editing on live pages that
  currently rank. Every extension is a chance to break something that works. The two
  pages already performing (`print-on-demand-tax-uk` at position 7.7,
  `trading-allowance-online-sellers` at position 8.9) should be touched lightly or not at
  all.
- **Tool maintenance.** Three of the four tools carry tax data that goes stale. Stale tax
  data on this estate is a claims-integrity incident, and there has already been one.
  Tools without a named owner for the refresh should not ship.
- **The EORI bet.** EORI is 46% of the winnable volume, so wave 1 is close to a
  single-subject bet. If EORI turns out to be an informational query that never converts
  to a lead, the plan will have produced traffic and no business. The commercial pages in
  wave 2 are the hedge, and they are the reason wave 2 is commercial rather than more
  content.
- **Difficulty on the head terms.** The EORI head term is kd 31 and "vat number check" is
  kd 44, both well above the subject medians. The in-band targets are winnable; the head
  terms may not be. Nothing in this plan should be read as promising the head term.
