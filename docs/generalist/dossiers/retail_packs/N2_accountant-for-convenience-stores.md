# PACK N2: net-new — accountant for convenience stores (with the buy or sell fork)

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **trading-week-led**). Third page of the retail spine, and the
most commercial retail sub-trade on the tier2 read.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `accountant-for-convenience-stores` (writer may refine).
- Grade NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- C1 gate: row 69, no C1 restriction. CLEAR. **Note the alcohol and tobacco trade brings no C1
  gate of its own in the niche map, but duty-suspended stock content is out of scope (see fences).**
- Ground truth: **§21.4** (retail schemes, mixed-rate), **§7** (VAT), **§9** (payroll, employer NIC
  15% and the £5,000 secondary threshold, auto-enrolment), **§2** / **§2.B** (sole-trader profit,
  self assessment, payments on account), **§1** (structure), **§5** (CGT and Business Asset Disposal
  Relief at 18% from 6 April 2026, for the sale fork), **§8** (capital allowances on chillers,
  shopfit and EPOS hardware).

## 2. Equity register

None (net-new), but this page inherits the cluster's **live local impressions**:
`convenience store accountants harrow` (5 impressions), `convenience store accountants milton
keynes` (1). Dossier delta **D5**: the page+query join has not been run, so it is unproven which URL
serves them. Run the join before this page is written. If they land on a location page, N2 must not
target those exact local phrasings; if they land nowhere, N2 takes them. Either way, **no location
page is touched from this pack.**

## 3. Market keyword slice (ledger, ~40/mo measured plus a null-volume tail)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| buying a convenience store | 40 | marketplaces, not accountants |
| convenience store accountant | null volume | 3esaccountants (UNVERIFIED), livingstones sub-pages |
| newsagent accountant | null volume | — |
| off licence accountant | null volume | — |
| selling a shop business tax | null volume | — |
| retail business valuation calculator | null volume | — |
| convenience store accountants harrow / milton keynes | GSC (ours) | — |

Measured ~40/mo plus six null-volume rows. **Coverage over selection: volume is not a gate.** The
tier2 read is that this is the most commercial retail sub-trade despite thin measurement, and the
live local impressions corroborate real intent.

## 4. Competitor teardown (fetched 2026-08-25, free)

No dedicated convenience-store accountancy page ranks. The field is the same two retail pages:

- **livingstonesaccountants.co.uk `/shop-accountants/`** (~2,100 words) is the closest thing to a
  sub-trade page in the field. It is a generic service page: "we specialise in offering bespoke
  accountancy services tailored to the unique needs of businesses across the UK", zero figures, no
  scheme named, an "Inventory Accounting Support" H3 that says nothing about wastage, shrinkage or
  duty stock.
- **lanop.co.uk `/retail-business/`**: no sub-trade treatment at all.
- The `buying a convenience store` head is held by business-sale marketplaces, not accountants, so
  the informational tax slice of that query is unoccupied. Dossier §2 grades the standalone
  buy/sell topic "thin: section, not page", which is why it folds in here rather than getting a page.

## 5. Whitespace

- **The sub-trade actually described.** Mixed-rate takings across a single till (newspapers,
  confectionery, hot food, alcohol, tobacco, lottery, PayPoint), wastage and shrinkage, staff
  hours across long opening, and the cash record. Nobody in the field writes any of it.
- **Agency versus principal on the concession lines.** Lottery commission, PayPoint, parcel points
  and mobile top-ups are commission income, not turnover, and treating them as turnover distorts
  both the VAT scheme calculation and the registration test. This is the single most useful thing
  the page can say and no competitor says it.
- **The buy-or-sell fork, tax-first**: what a buyer is actually buying (goodwill, stock at
  valuation, fixtures) versus a share purchase, and on the sale side the Business Asset Disposal
  Relief position at the dated rate. Answers `buying a convenience store` and `selling a shop
  business tax` informationally where the marketplaces answer commercially.
- A recomputable 2026/27 worked example: one store's week scaled to a year, taken to taxable profit.

## 6. Fences (binding)

- **Assignment split:** the retail scheme arithmetic is N1's (one paragraph plus a link here, never
  three worked calculations). The hire framing is R1's. This page is the sub-trade.
- **Duty-suspended goods, alcohol and tobacco duty mechanics, AWRS registration and the tobacco
  track-and-trace regime are OUT OF SCOPE.** They are excise ground, not covered in
  `house_positions.md`, and nothing may be asserted about them. One neutral sentence acknowledging
  a licensed store has excise obligations, with a gov.uk link, is the ceiling.
- **No business-valuation multiples.** `retail business valuation calculator` is answered by
  explaining what drives a shop's value and what the tax consequences of each deal shape are, never
  by publishing a multiple or a valuation figure.
- Business Asset Disposal Relief is stated at **18% from 6 April 2026** with the date tag, and the
  prior rates named as prior (14% for 2025/26, 10% before). Never a bare "10% BADR".
- No house-position citations in reader copy (report only). No em-dashes. Class 4 6% and the
  £12,570 / £50,270 bands carry the "2025/26 figures, still current when checked August 2026" hedge.
- No online-selling content (ecommerce wall). No "unique challenges" opener.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: convenience store accountant; newsagent accountant; off
   licence accountant; buying a convenience store (tax side); selling a shop business tax; what a
   shop is worth (framed per fences).
2. Figures, recomputable and date-tagged: VAT £90,000 / £88,000; employer NIC 15% and the £5,000
   secondary threshold; auto-enrolment thresholds; Annual Investment Allowance £1m and the 40%
   first-year allowance from 1 January 2026 on new chillers and shopfit plant; main-rate WDA 18% to
   14% from April 2026; BADR 18% from 6 April 2026 with the £1m lifetime limit; self-assessment
   dates 5 October, 31 January, 31 July and the payments-on-account 50% mechanic.
3. One full worked example (one store's trading week scaled to a year, through to taxable profit),
   every line re-derivable.
4. The agency-versus-principal treatment of lottery, PayPoint and top-up commission stated
   explicitly, with its effect on the VAT registration test.
5. Structure follows the trading-week lead for the opening 40%; the buy-or-sell fork closes the
   page. No H2 phrasing shared with R1 or N1.
6. Links: R1, N1. Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
7. D5 page+query join result recorded in the delivery report before writing.

## 8. Expectation

~40/mo measured plus a null-volume tail, in an unoccupied sub-trade field with live local
impressions already arriving. Realistic: Google top-10 on `convenience store accountant` and one
adjacent sub-trade phrasing within a quarter of indexing, given the field is empty; Bing earlier.
Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger: zero impressions across
all named sub-trade phrasings at 90d post-index. Recorded honestly: this is a coverage surface
first and a volume surface second, and it will not be judged on volume.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `accountant-for-retail-shops-uk.md` (R1) | retail pillar | Assignment split: pillar versus sub-trade, enforced on both files at QA. Dossier §6 records this note as resolved by the split. Never collapse. |
| N1 (this wave) | retail VAT schemes | One pointer paragraph only. |
| `how-to-sell-a-ecommerce-business.md` | selling a business | Different trade entirely; N2 carries no ecommerce phrasing. No link. |
| `accountant-for-amazon-fba-sellers-uk.md` | stock | Physical shopfloor stock and shrinkage only here; no marketplace phrasing. Watch item. |
