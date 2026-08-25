# PACK N4: net-new — manufacturing costing, work in progress and year-end stock

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **cost-build-up-led**). Second surface of the manufacturing hub,
and the only one in this cluster attacking a head set where the incumbent already ranks top-10.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `manufacturing-costing-and-stock-uk` (writer may refine).
- Grade NET-NEW. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- C1 gate: row 73, no C1 restriction. CLEAR.
- Ground truth: **§3** (corporation tax, the profit the costing feeds), **§2** and **§2.A**
  (unincorporated profit, tax-year basis), **§8** (capital allowances, because depreciation absorbed
  into unit cost is not the tax deduction), **§7** (VAT).
- **GROUND-TRUTH GATE: CLEARED 2026-08-25.** The stock and work-in-progress position is now locked
  at **`house_positions.md` §21.8** (tax follows the accounts, ITTOIA 2005 s.25(1) / CTA 2009
  s.46(1); lower of cost and net realisable value per BIM33135; production-overhead absorption,
  fixed on normal capacity and variable on actual usage; LIFO barred; the three types of WIP per
  BIM33020; long-term contracts as a revenue-recognition question; the depreciation add-back and
  capital-allowance substitution bridge; the cash-basis default and the accruals assumption).
  Write to §21.8 and stay inside its five **open-questions fences**, in particular: do not assert
  the post-2026 FRS 102 Section 23 revenue treatment, do not cite ss.31A to 31D as the live
  cash-basis provisions, do not quote a statutory definition of trading stock, and do not touch
  stock appropriations or *Sharkey v Wernher*. Unincorporated worked examples must carry the
  accruals assumption sentence (§21.8.5).

## 2. Equity register

None (net-new). N3 owns the hire framing; this page owns the arithmetic.

## 3. Market keyword slice (ledger, ~170/mo plus a theory tail)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| manufacturing cost | 170 | **skynet p9** |
| cost to manufacture | 170 | **skynet p10** |
| costing for manufacturing | 170 | **skynet p10** |
| manufacturing costing | 170 | skynet p11 |
| manufacturing costs | 170 | skynet p19 |
| reduce manufacturing costs / reducing manufacturing costs | 30 x2 | **skynet p7 / p9** |
| reduce cost in manufacturing / reduce costs in manufacturing | 30 x2 | skynet p9 / p7 |
| reduce manufacturing cost | 30 | skynet p8 |

~170/mo deduplicated plus the reduce-cost tail. **This is the only head set in the cluster where the
incumbent is genuinely top-10**, and it is the same 1,400-word page across all of it.

**Student and DIY contamination is measured** in tier1's TOPICS.md for this exact head set. The
qualified slice only: the page addresses a UK factory owner computing a real unit cost that feeds a
real tax return, not a student learning absorption costing. Screen every heading against that.

## 4. Competitor teardown (fetched 2026-08-25, free)

**skynetaccounting.co.uk `/common-manufacturing-accounting-issues/`** — H1 "10 Common Manufacturing
Accounting Issues (and How To Fix Them)". **~1,400 words, and it is the best-ranked page in the
entire cluster (p7-11 across this head set).** Its own firm's 2,100-word service page ranks p11-29.
Length is not the lever; the numbered named-problem structure is.

Structure: context-first opener ("Accounting in a factory is very different from normal business
accounting. Factories have to manage raw materials, labour, machinery, overheads, and taxes, all
while making sure every product is profitable."), then ten named problems as H2s (Capital
Expenditure, Revenue Recognition, Tax Compliance and Planning, Cost Allocation, Inventory Valuation
and Control, Getting the Product Cost Right, Lack of Tracking Manufacturing Efficiencies, Not
Getting Expert Advice, Not Budgeting Accurately, Weak Cash Flow Forecast), then an FAQ block and
"Final Thoughts".

**Its complete numeric content is £50,000 (a machinery cost, used illustratively) and 10% (an
efficiency variance). Neither is computed through. There is no worked example.** A page that names
"Getting the Product Cost Right" as a problem and never computes a product cost is the whole
opportunity.

## 5. Whitespace

- **The cost actually built.** One product's cost assembled line by line: direct materials, direct
  labour at a real hourly cost including employer NIC and pension, machine hours, an overhead
  absorption rate derived on the page, then scrap and rework. Every figure re-derivable. The
  incumbent names the problem and never solves it.
- **The bridge from unit cost to taxable profit**, which no competitor draws: absorbed depreciation
  is added back and capital allowances substituted; opening and closing stock and work in progress
  move taxable profit pound for pound; the year-end stock count is therefore a tax event, not a
  housekeeping chore.
- **Work in progress done properly** for a factory with part-finished batches at the year end,
  including the point that WIP carries absorbed production overhead and is not just materials.
- **Reduce-cost queries answered with arithmetic** rather than advice: showing which line of the
  build-up actually moves the number.

## 6. Fences (binding)

- **Stock and WIP ground truth = §21.8 (locked 2026-08-25).** Gate cleared. Every tax outcome that
  turns on a valuation policy traces to §21.8, and the §21.8 open-questions fences are binding.
- **Student intent screened out.** No "what is absorption costing" textbook section, no exam-style
  worked question, no comparison of marginal versus absorption costing as theory. Every calculation
  is a UK trading example with pounds and a tax consequence.
- **Estate wall:** capital allowances are summarised here only as the add-back-and-substitute point;
  the FA 2026 rate detail and the ordering rules belong to N5. Never restate N5's timeline.
- **Assignment split:** the hire framing is N3's, food and drink specifics are N6's, R&D is E1's.
- No software product recommendations or comparisons (EX-SOFTWARE is an excluded intent in the
  dossier, 980/mo, and it is a separate editorial call, not this cluster's).
- No house-position citations in reader copy (report only). No em-dashes. No "Final Thoughts"
  closer, no context-first opener, none of skynet's ten H2 phrasings reproduced.
- Rates date-tagged; 2025/26 bands and Class 4 carry the "still current when checked August 2026"
  hedge.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: manufacturing costing; manufacturing cost; cost to
   manufacture; costing for manufacturing; how to reduce manufacturing costs; how work in progress
   is valued at the year end; how stock affects taxable profit.
2. Figures, recomputable: a full unit-cost build-up (materials, labour, overhead absorption rate,
   machine hours, scrap) reaching a stated cost per unit; a year-end stock and WIP movement taken
   through to taxable profit; employer NIC 15% and the £5,000 secondary threshold inside the labour
   cost; corporation tax 25% / 19% with the £50,000 and £250,000 limits on the profit line. All
   date-tagged.
3. **At least two worked calculations**, the unit-cost build-up and the stock-to-profit bridge.
   This is the page's entire competitive claim.
4. Structure follows the cost-build-up lead for the opening 40%; a numbered named-problem spine is
   permitted (it is what ranks) but the ten problem names must all differ from skynet's.
5. Links: N3, N5, N6. Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
6. Stock and WIP ground truth: **§21.8, locked 2026-08-25, gate CLEARED**. Delivery report confirms
   every valuation-dependent sentence traces to §21.8 and breaches none of its open-questions fences.

## 8. Expectation

~170/mo plus tail, against an incumbent that is genuinely top-10 and genuinely thin. This is the
hardest ranking task in the cluster and the clearest quality gap: the incumbent ranks p7-11 with
1,400 words and two uncomputed numbers. Realistic: Google top-20 on the head set within a quarter,
top-10 on one or two reduce-cost phrasings sooner (they are 30/mo and lightly defended); Bing
earlier. Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger: zero impressions
across the head set at 90d post-index.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `accountant-for-amazon-fba-sellers-uk.md` | H2 "Stock Accounting and Valuation" | **Differentiate, do not collapse.** FBA page owns marketplace inventory (landed cost, FBA fees, multi-jurisdiction stock) and is untouched. N4 owns manufactured stock and work in progress: absorption, WIP, scrap. N4 uses no marketplace, ecommerce or reseller phrasing. Known cannibalisation-watch item, recorded. |
| `accountant-for-retail-shops-uk.md` (R1) | H2 "Stock Valuation and Year-End Accounts" | Differentiate: retail stock is bought-in goods at cost; N4 is manufactured stock carrying production overhead. R1's section stays retail-only and links to N4 for manufacturers. |
| `accountant-for-shopify-stores.md` | "Stock and Inventory: Tax Treatment" | Ecommerce wall. Untouched, no link. |
| N5 (this wave) | capital allowances | N4 states the add-back-and-substitute principle only; N5 owns the rates and ordering. |
