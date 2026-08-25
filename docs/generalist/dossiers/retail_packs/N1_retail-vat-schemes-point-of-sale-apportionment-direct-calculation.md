# PACK N1: net-new — retail VAT schemes, tills, EPOS and cash records

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **scheme-selector-led**). Second page of the retail spine.

## 1. Target and permission level

- NET-NEW page. Proposed slug: `retail-vat-schemes-uk` (writer may refine to resolver conventions).
- Grade NET-NEW, everything writable. Revert path: delete pre-deploy; post-deploy enters
  `monitored_pages`.
- C1 gate: row 69 retail, no C1 restriction. CLEAR.
- Ground truth: **§21.4** (the three schemes, the £1m / £130m / bespoke gates, mixed-rate food as
  the classic case), **§7** (registration £90,000, deregistration £88,000, standard 20%, reduced 5%,
  MTD for VAT since April 2022, cash accounting £1.35m join / £1.6m leave, flat rate £150,000 and
  the 16.5% limited-cost-trader rate). §21 authored and locked 2026-08-25.
- **Rate-gate at write:** §21's practical writing rule requires the £1m / £130m scheme gates to be
  date-checked against Notice 727 at write time. Record the check in the delivery report.

## 2. Equity register

None (net-new). The pillar (R1) owns the hire framing; this page owns the arithmetic.

## 3. Market keyword slice (ledger, ~200/mo)

| Keyword | Vol/mo | Best peer |
|---|---|---|
| retail vat scheme | 140 | none ranking as a specialist |
| vat apportionment scheme | 20 | — |
| point of sale vat scheme | null volume | — |
| how to calculate vat for a shops business | GSC (ours) | — |
| till reconciliation | 40 | — |
| epos accounting | null volume | — |
| retail stock accounting | null volume | — |
| cash business hmrc investigation | null volume | — |

Peer-winnable ~200. Twelve of the twenty July retail head pulls returned null volume: sub-10/mo, not
zero intent (dossier §1 artefact 3, delta D6). Coverage over selection applies; volume is not a gate.

## 4. Competitor teardown (fetched 2026-08-25, free)

There is **no ranking specialist page on this topic**. The two pages that hold the retail field were
fetched and both fail on it:

- **lanop.co.uk `/retail-business/`** (p9-10 on the adjacent retail-accounting phrasings, ~2,100
  words): names **none** of the three schemes. Its nearest heading is "Sales Tax Compliance", which
  is the American term. It has a "Point Of Sale (POS) Accounting" H3 that covers till software, not
  the Point of Sale VAT scheme. Zero figures.
- **livingstonesaccountants.co.uk `/shop-accountants/`** (~2,100 words): no scheme named, no
  threshold stated, no figures at all.

gov.uk (Notice 727 and its sub-notices) owns the head terms and will keep them. The winnable ground
is the modified and operator-phrased variants, and the comparison gov.uk does not make.

## 5. Whitespace

- **The three schemes presented as a choice, with the arithmetic done.** Point of sale (identify the
  rate at the till), apportionment (split takings by the ratio of purchases at each rate), direct
  calculation (mark up minority-rate goods to expected selling prices), each with the turnover gate
  and a worked calculation on the same shop so the reader can see the VAT bill move between them.
  gov.uk explains each scheme separately and never compares them on one set of numbers. No
  accountancy competitor attempts it at all.
- **Mixed-rate food**, the classic case: zero-rated groceries against standard-rated confectionery
  and hot food, which is exactly where a convenience store or bakery counter gets the scheme choice
  wrong.
- **Till, EPOS and cash records as the evidential layer**: the scheme is only as good as the daily
  gross takings record, which is what HMRC examines. Answers `till reconciliation`,
  `epos accounting` and `cash business hmrc investigation` in one place, factually and without
  scaremongering.

## 6. Fences (binding)

- **Scheme choice is presented as a calculation, never as a recommendation to a named business
  type.** §21.4's rule: the choice materially moves the VAT bill, so show the maths and hand the
  decision to advice.
- **Flat Rate Scheme is not this page's ground.** It belongs to `vat-flat-rate-scheme-explained`.
  One sentence distinguishing a retail scheme (how you compute output VAT on mixed-rate takings)
  from the flat rate scheme (a different way of paying VAT altogether), then a link. Never restate
  the 16.5% limited-cost-trader rule here.
- **Cash accounting** likewise: one sentence plus the £1.35m / £1.6m figures if it earns its place,
  no section.
- `cash business hmrc investigation` is answered as record-keeping hygiene: what a good daily gross
  takings record contains and why HMRC asks for it. **No enforcement scaremongering, no penalty
  urgency, no "HMRC is targeting..." framing.**
- No house-position citations in reader copy (report only). Cite Notice 727 and the gov.uk retail
  schemes page by name instead. No em-dashes. All rates date-tagged.
- No online-selling or marketplace content (ecommerce wall).

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: retail vat scheme; vat apportionment scheme; point of sale
   vat scheme; direct calculation vat scheme; how to calculate VAT for a shop business; till
   reconciliation; EPOS accounting; retail stock accounting.
2. Figures, recomputable and date-tagged: Apportionment Scheme 1 and Direct Calculation Scheme 1 up
   to **£1 million** retail turnover; Scheme 2 up to **£130 million**; bespoke scheme mandatory
   above £130 million; standard rate 20%, reduced 5%, zero rate; VAT registration £90,000 and
   deregistration £88,000; MTD for VAT applying to all VAT-registered businesses since April 2022.
3. **Three worked calculations on one shop's identical takings**, one per scheme, every line
   re-derivable, showing a different output VAT figure per scheme. This is the page's whole reason
   to exist.
4. Structure follows the scheme-selector lead for the opening 40%. No H2 phrasing shared with R1 or
   N2. Question-form FAQ block present.
5. Links: R1, N2, N6 (mixed-rate food manufacturing side), the flat-rate VAT page. Resolver-clean,
   zero invented slugs. §4 floors plus coverage floor pass.
6. The £1m / £130m gate re-check against Notice 727 recorded in the delivery report.

## 8. Expectation

~200/mo against a field where **no accountancy page names the schemes at all** and gov.uk owns only
the exact heads. Realistic: Google top-10 on `retail vat scheme` plus one modified variant within a
quarter of indexing; Bing earlier; the three-way comparison is genuine first-mover surface.
Maturity caveat: net-new, judge at 28d Bing / 90d Google. Failure trigger: zero impressions across
all named phrasings at 90d post-index.

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| `vat-flat-rate-scheme-explained.md` | VAT scheme choice | Differentiate: retail schemes compute output VAT on mixed-rate takings; flat rate replaces the calculation entirely. One sentence and a link each way. Never collapse. |
| `accountant-for-retail-shops-uk.md` (R1) | existing H2 "VAT Schemes for Retail Shops" | **Live overlap.** R1's reframe thins that H2 to a pointer paragraph and N1 takes the depth. Both pages ship in the same wave, so the split must be enforced at QA on both files. |
| `accountant-for-amazon-fba-sellers-uk.md` | "VAT Registration and Compliance" | Marketplace VAT stays there; N1 carries no marketplace phrasing. Watch item. |
| `how-to-complete-and-submit-vat-return-uk.md`, `vat-calculator-uk.md` and the VAT calculator family | generic VAT mechanics | N1 is retail-scheme specific throughout; no generic "how to do a VAT return" section. Link, do not restate. |
