# U27 — limited-company-buy-to-let-allowable-expenses

## 1. Unit facts

- Type: NEW blog post
- Category: Incorporation & Company Structures
- Slug: `limited-company-buy-to-let-allowable-expenses`
- Hub: HUB 4, run-the-company (child of the `/spv-company` pillar, P1, per `PAGE_MAP.md` §5)
- Priority: P1
- Verdict rationale (`page_map.csv` U27): "Real gap. Every existing expense page on disk is
  INDIVIDUAL-landlord-side. The company side (full finance-cost deduction, pre-trading
  expenditure s.61 CTA 2009, capital allowances, director costs) has no host. High
  commercial relevance and it is the natural post-formation second visit."

## 2. Dominant query + full variant list

**Dominant query (owns the H1):** limited company buy to let allowable expenses

Tag every variant below into the outline as an H2 or FAQ entry, in the user's own words
(source: `page_map.csv` U27 `query_variants` + `questions_corpus.csv` matches).

| Tag | Phrasing | Source |
|---|---|---|
| action | limited company buy to let expenses | page_map.csv U27 |
| question | what can i claim through my property company | page_map.csv U27 |
| cost/technical | limited company rental property capital allowances | page_map.csv U27 + questions_corpus:679 |
| question | are mortgage interest costs fully deductible in a company | page_map.csv U27 |
| question | can i pay myself a management fee from my spv | page_map.csv U27 |
| question | are formation costs tax deductible | page_map.csv U27 |
| question | what expenses can an spv claim | page_map.csv U27 |
| action | buy to let limited company expenses | questions_corpus.csv:516 |
| conversational | property limited company allowable expenses | questions_corpus.csv:716 |
| question | is property management fee tax deductible | questions_corpus.csv:429 |
| question | property management fees tax deductible (uk) | questions_corpus.csv:1564-1565 |

No measured search volume for this bucket (page_map.csv U27: "no measured volume, dense
question tail"). Justify the page on question density and commercial relevance, not a
volume figure. Do not invent one.

## 3. Our-data baseline

No rows for this unit in `our_queries.csv` (checked: no match on "allowable expense" or
"company expense" strings). This is a greenfield page with zero existing GSC/Bing
footprint to protect or build from. Treat every ranking claim post-publish as new data,
not a continuation of an existing trend.

## 4. Competitor coverage floor

Table-stakes competitor pages exist and must be beaten on depth, not matched (per
`competitor_urls.csv`):

- taxqube.co.uk — `allowable-expenses-for-limited-companies-what-you-can-and-cant-claim`
- provestor.co.uk — `help/mtd/key-concepts-rules/allowable-expenses`
- taxd.co.uk — `taxdpedia/allowable-expenses-for-limited-companies`
- uklandlordtax.co.uk — `allowable-expenses-guide`, `top-10-allowable-expenses-for-landlords`,
  `allowable-expenses-against-rental-income` (these three are individual-landlord framed;
  cite as evidence that generalist competitors blur the company/individual line, which is
  exactly the seam this page must not blur).

None of the found competitor URLs are company-specific and portfolio-level (s.61 CTA 2009
pre-trading, capital allowances mechanics, director-cost treatment). That is the whitespace.

## 5. Seam MUST-NOTs

**Seam 7 (`PAGE_MAP.md` §9.7):** This page owns COMPANY-SIDE deductions only:

- Full finance-cost deduction in the company (interest is deducted before Corporation Tax,
  no restriction — contrast individual landlords under Section 24).
- Pre-trading expenditure, s.61 CTA 2009 (costs incurred up to 7 years before trade
  commences, treated as incurred on day one of trade).
- Capital allowances at company level (main pool 14% WDA, 40% FYA, 6% special rate — see
  facts pack).
- Director costs: salary, pension contributions, management fees paid to a director-owned
  management company (must be commercially justified and at arm's length; HMRC will
  challenge inflated management fees as disguised extraction).

**It must NEVER:**
- Restate the Section 24 individual-landlord finance-cost-restriction argument. That
  belongs to `mortgage-interest-deductible-landlords-uk-2026.md` and
  `landlord-tax-deductions-uk-2026-complete-list.md`. Summarise the contrast in one or two
  sentences ("in your own name, Section 24 restricts interest relief to a 20% credit,
  rising to 22% from April 2027; in a company there is no such restriction") and link out.
- Duplicate the individual-landlord expense list (repairs, agent fees, insurance,
  travel) item by item. Where an expense category is genuinely identical in company and
  individual hands (e.g. letting agent fees, landlord insurance), name it once in a short
  "same either way" list and link to the individual page for the full treatment. The value
  of THIS page is the deductions and mechanics that differ, not a full re-list.

## 6. Facts pack (dated 2026-09-01, verified vs `docs/property/house_positions.md`)

- **Corporation Tax:** 19% small-profits rate on profits up to £50,000; 25% main rate
  above £250,000; marginal relief in between at an effective 26.5% on the slice, via the
  formula (U − A) × (N/A) × (3/200) (house_positions.md §CT, lines ~2732-2772). Do not
  assert a flat 26.5% rate — show the worked calculation.
- **Associated companies:** the £50k/£250k thresholds are divided by the number of
  associated companies (house_positions.md line 2741 example: 5 SPVs → £10k/£50k each).
  Relevant if the landlord runs multiple SPVs — flag it, do not model it in depth here.
- **Mortgage interest / finance costs:** fully deductible in a company before CT, with no
  restriction. Contrast: individual landlords get a Section 24 finance-cost tax-reducer
  credit only, 20% for 2026/27, rising to 22% from April 2027 (FA 2026; house_positions.md
  line 201, `property_2027_rates_ground_truth` memory).
- **Capital allowances (FA 2026, from 1 April 2026 CT / 6 April 2026 IT):** main-pool WDA
  cut from 18% to 14% (CAA 2001 s.56, substituted by FA 2026 s.28); new 40% FYA (s.29);
  special-rate pool 6%. A chargeable period straddling 1/6 April 2026 uses a hybrid,
  time-apportioned rate. Full expensing (100% FYA, CAA 2001 s.45S) is companies-only, not
  available to unincorporated landlords — a genuine company advantage, worth naming.
- **Dividend rates 2026/27 (for the extraction step after profit is retained/CT-paid):**
  ordinary 10.75%, upper 35.75%, additional 39.35% (ITA 2007 s.8 as amended by FA 2026
  s.4). Only the ordinary and upper rates changed in FA 2026; 39.35% was already in force.
- **s.455 close-company loan charge** (relevant if a director draws informally rather than
  via salary/dividend/expense): 35.75% on amounts unpaid 9 months after year-end, for
  loans made on or after 6 April 2026 (was 33.75% before). Mention as a one-line caution
  against treating expense claims as a director's-loan workaround; do not build it out,
  link to the extraction cluster (`director-loan-account-property-company-mechanics`).
- **BADR 18% from 6 April 2026** is NOT relevant to running-cost expenses (it is a
  disposal relief) — do not pull it into this page.

All figures must be re-verified against `docs/property/house_positions.md` at write time;
this pack is a starting point, not a substitute for the writer's own check.

## 7. Interlink spec

Verify every slug exists on disk before linking (`find content/blog -iname "<slug>*"`).

- **Up-link (required):** `/spv-company` (new pillar, once built) — hub navigation.
- **Contrast link, 1-2 sentences then link, never re-argue:**
  `mortgage-interest-deductible-landlords-uk-2026` (Section 24 individual-side finance
  costs) and `landlord-tax-deductions-uk-2026-complete-list` (full individual expense
  list). CONFIRMED ON DISK.
- **Capital allowances depth:** if a dedicated capital-allowances page exists for
  companies, link it; otherwise this page carries the company capital-allowances section
  itself (no dedicated page found on disk as of this brief — check again at write time,
  `super-deduction-130-percent-...md` and `writing-down-allowance-cars.md` exist but are
  not company-BTL-specific; use as supporting links for mechanics only).
- **Extraction / director costs:** `extracting-money-from-property-limited-company`,
  `director-loan-account-property-company-mechanics`,
  `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis` (slug corrected at brief
  review 2026-09-01 — the short form `salary-vs-dividends-property-spv` does NOT exist on
  disk and would have shipped a 404) — CONFIRMED cluster per `PAGE_MAP.md` §9 U31 note.
- **Running costs (sibling, not duplicate):** `property-company-running-costs-annual-budget`
  (owns the ANNUAL RUN RATE budget; this page owns WHICH costs are ALLOWABLE for tax —
  different questions, cross-link both ways).
- **Formation cost (sibling):** `spv-company-formation-cost-uk` (U03, year-one setup cost;
  this page is post-formation ongoing deductibility — cross-link).
- **Pre-trading:** if incorporation-mechanics pages mention s.61 CTA 2009, link across;
  otherwise this page is the first host of that fact and should be linked FROM
  `how-to-set-up-property-investment-company-uk-guide` (U02) when that page is rewritten.

## 8. Fresh outline

**H1:** Limited company buy to let allowable expenses

**H2 skeleton (from the variant list):**
1. What you can claim through a property company (direct answer, verdict-up-top style)
2. Finance costs: fully deductible, no Section 24 restriction (with the one-line contrast
   + link out)
3. Capital allowances in the company (main pool 14% WDA, 40% FYA, special rate 6%, full
   expensing for new/unused plant — worked example)
4. Pre-trading expenditure: s.61 CTA 2009 (costs before the company starts letting)
5. Director costs and management fees: salary, pension, arm's-length management fee
   (with the s.455 caution and a link to the extraction cluster)
6. Formation and professional costs (link to spv-company-formation-cost-uk for the
   year-one total; here, just the tax treatment)
7. Costs that are the same whether you're a company or an individual (short list + link
   out to the individual expense pages)
8. Comparison table: company vs individual landlord, side by side, on the 5-6 expense
   categories that differ (finance costs, capital allowances, formation costs, director
   costs, dividend/extraction tax as the "cost" of getting money out)
9. Worked example: a single BTL, £24,000 rent, £9,000 mortgage interest, £3,000 other
   costs, held in a company at CT marginal-relief band vs the same figures personally
   under Section 24 — use the SAME shared engine (`lib/incorporation.ts`,
   `computeSection24`, `corporationTax`) figures a writer can reuse from the calculator,
   do not hand-calculate divergent numbers.
10. FAQ (10-14 entries, one per variant plus natural follow-ups): what can i claim, is
    property management fee tax deductible, are formation costs tax deductible, can i pay
    myself a management fee, are mortgage interest costs fully deductible, what capital
    allowances can an spv claim, is my personal time as director an allowable expense,
    what happens if I don't have a genuine business justification for a management fee,
    do pre-trading costs need a specific claim, is landlord insurance different in a
    company, etc.
