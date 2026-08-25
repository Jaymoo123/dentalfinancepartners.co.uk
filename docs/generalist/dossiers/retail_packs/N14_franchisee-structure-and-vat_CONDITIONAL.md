# PACK N14: net-new CONDITIONAL — franchisee structure and VAT

Derived 2026-08-25 from FROZEN dossier `../retail_product_2026-08-25.md` only. Reads with
`language_spec.md` (lead structure: **structure-fork-led**). Third surface of the franchisee spine,
and **conditional on a fold decision that has not been made.**

## 0. CONDITIONAL — one open decision, and it is a fold decision, not a quality gate

The dossier is explicit (§3 and §6): **N14 ships as its own page, or folds into N12, depending on
whether the D1 franchise.accountant ranked-keyword harvest shows one consensus page or two.**

| Gate | What it is | Where recorded | Clears when |
|---|---|---|---|
| **D1 fold decision** | The ranked-keyword pull for franchise.accountant was blocked by the DataForSEO daily budget gate at $4.9874 of $5.00. Without it, whether the market treats franchisee structure and VAT as a separate page or as part of the pillar is unknown. | dossier §9 delta D1; §3 and §6 N14 rows | D1 runs, then the consensus map is re-read |

**Unlike N7, this pack is not blocked from writing.** The ground truth exists (§21.5, §1, §7), the
C1 position is clear and the content is safe to write today. The only open question is **where the
content lives**. If D1 shows one consensus page, this pack's §5 whitespace becomes a section inside
N12 and this pack is retired as a standalone; the content is not lost and **no redirect is ever
created**, because nothing will have shipped to redirect from.

**Coverage over selection note:** the fold decision is a market-shape decision, not a volume
decision. Volume is not a gate here or anywhere in this cluster.

## 1. Target and permission level

- NET-NEW page, conditional. Proposed slug: `franchisee-limited-company-or-sole-trader` (writer may
  refine).
- Grade NET-NEW CONDITIONAL. Revert path: delete pre-deploy; post-deploy enters `monitored_pages`.
- C1 gate: row 82, no C1 restriction. CLEAR.
- Ground truth: **§1** (sole trader, partnership, limited company), **§21.5** (franchise fees, and
  the company-versus-sole-trader asymmetry that makes this fork non-generic), **§7** (VAT,
  registration and the flat rate scheme's limited-cost-trader rule), **§4** (profit extraction,
  salary and dividends and the employer-NIC position), **§3** (corporation tax), **§2**
  (sole-trader profit and Class 4), **§9** (payroll).
- **Open-question gate at write (§21 open question 3):** CIRD verification of the intangibles route,
  as for N13. This page's fork turns partly on that asymmetry, so the same hedge applies to the same
  sentences.

## 2. Equity register

None (net-new).

## 3. Market keyword slice (ledger, inside the row-82 family)

No ledger row is assigned specifically to this surface. Target phrasings, unmeasured but named:
should a franchisee be a limited company; sole trader or limited company franchise; VAT on the
franchise marketing fund; do franchisees need to register for VAT; franchisee VAT on royalties.
Measurement is delta **D1** and delta **D4** (free expansions not run for this family).

## 4. Competitor teardown (fetched 2026-08-25, free)

- **franchise.accountant** (DEDICATED specialist, ~1,200 words) has an H3 **"Dividend vs. Salary Tax
  Efficiency"** and an H3 **"VAT Planning & Reclaim"**, which is the closest anything in the field
  comes to this page's subject. Both are service bullets. **The page states no figure of any kind:
  no threshold, no rate, no band.** It does not mention the initial franchise fee, so it cannot
  reach the asymmetry that makes the franchisee structure question different from the generic one.
- **livingstonesaccountants.co.uk franchise article** (p9-13) covers "Tax Treatment of Franchise
  Payments" and "Managing Multi-Location Franchise Accounting" but **no structure fork at all**, and
  its only nod at VAT is listing "VAT treatment of franchise royalties" as a consideration it never
  answers.
- Positions for franchise.accountant are unmeasured (D1); it is field evidence, not a rank-weighted
  winner.

## 5. Whitespace

- **A structure fork that is genuinely franchisee-specific rather than a generic sole-trader-versus-
  company page.** The generic comparison already exists across the estate and must not be rebuilt
  (see fences). What is specific to a franchisee, and unpublished anywhere in the field:
  - the **initial fee asymmetry**: a company may reach relief through the corporate intangibles
    regime; a sole trader gets no amortisation route and waits for CGT base cost on disposal
    (hedged per the gate);
  - the **franchise agreement often names the franchisee**, so changing structure mid-term is a
    contractual event with a transfer fee, not just a tax election;
  - **resale**: most franchise agreements control who the business can be sold to, which changes
    what the exit is worth and how BADR applies.
- **The marketing or brand fund fee (MFF) VAT treatment as the tiebreaking worked example**, which
  is the dossier's own designation for this page. It is a real recurring cost, its VAT treatment is
  routinely misunderstood, and no competitor answers it.
- **VAT registration for a franchisee**, including whether the franchisor's brand-level turnover has
  anything to do with it (it does not) and why the flat rate scheme's limited-cost-trader rule
  catches service franchises.

## 6. Fences (binding)

- **Do not rebuild the generic sole-trader-versus-limited-company comparison.** The estate already
  owns that ground. This page states the generic position in a short paragraph, links out, and
  spends its length on the three franchisee-specific factors above. If the draft would read the same
  with the word "franchise" deleted, it has failed and must be folded into N12 instead. **This is
  the sharpest QA test in the pack.**
- **The intangibles route stays hedged until CIRD verification (§21 open question 3).**
- **No recommendation.** The page presents a fork with figures and names what each factor is worth.
  It does not tell a reader to incorporate.
- **No franchise-opportunity, brand-comparison or funding-product content.**
- **Reverse-intent screen** as on N12 and N13: this page serves franchisees, never buyers of an
  accountancy franchise.
- **Assignment split:** the hire framing is N12's; the fee mechanics are N13's (reference the
  result, never re-run N13's split table).
- No house-position citations in reader copy (report only): cite BIM57620, CTA 2009 Part 8 and the
  gov.uk VAT pages instead. No em-dashes. Rates date-tagged; **Class 4 6% and the £12,570 / £50,270
  bands carry the "2025/26 figures, still current when checked August 2026" hedge**, which matters
  more on this page than any other in the wave because the whole fork is computed from them.

## 7. Acceptance criteria (deterministic)

1. Queries answerable as H1, H2 or FAQ: should a franchisee be a limited company; sole trader or
   limited company as a franchisee; VAT on the franchise marketing fund; does a franchisee need to
   register for VAT; can I change my franchise from sole trader to a company.
2. Figures, date-tagged and recomputable: income tax bands £12,570 / £50,270 and Class 4 6% / 2%,
   all with the 2025/26 hedge; corporation tax 25% / 19% with the £50,000 and £250,000 limits;
   dividend rates 10.75% / 35.75% / 39.35% from 6 April 2026; employer NIC 15% and the £5,000
   secondary threshold; VAT £90,000 / £88,000 and 20%; flat rate scheme £150,000 eligibility and the
   16.5% limited-cost-trader rate; BADR 18% from 6 April 2026 on the resale point.
3. **One worked example computing the fork on identical profits both ways**, plus the marketing fund
   fee VAT treatment as the designated tiebreaker. Every line re-derivable.
4. The delete-the-word-franchise test passes: at least three sections are unintelligible without the
   franchise context.
5. Structure follows the structure-fork lead. No H2 phrasing shared with N12 or N13.
6. Links: N12, N13, the estate's existing sole-trader-versus-company page, the flat-rate VAT page.
   Resolver-clean, zero invented slugs. §4 floors plus coverage floor pass.
7. D1 fold decision recorded before the page is written, and §21 open question 3 status recorded.

## 8. Expectation

Conditional. If it ships: unmeasured phrasings inside a 140-300/mo family, against a specialist page
that raises the topic in two service bullets and states no figure. Realistic: long-tail impressions
on franchisee-structure and marketing-fund VAT phrasings within a quarter; it is a depth surface
serving the spine and is not expected to hold a head term. Bing earlier. Maturity caveat: net-new,
judge at 28d Bing / 90d Google, on impression breadth rather than position. Failure trigger: zero
impressions across all named phrasings at 90d post-index. **If the fold decision goes the other way,
none of this applies, the whitespace in §5 becomes two sections inside N12, and the franchisee spine
ships as two pages.**

## 9. Cannibalisation notes

| Existing page | Overlap | Resolution |
|---|---|---|
| the estate's existing sole-trader versus limited-company content, incl. `sole-trader-vs-limited-company-tax-calculator-company-car.md` | the generic structure comparison | **Highest cannibalisation risk in the franchisee spine, and the reason the delete-the-word-franchise test is an acceptance criterion.** N14 must not rebuild the generic comparison. Short paragraph, link out, franchisee-specific factors only. If it cannot pass that test, **fold into N12 rather than ship**, per the dossier. Never collapse by redirect. |
| `vat-flat-rate-scheme-explained.md`, `flat-rate-vat-vs-standard-vat.md` | flat rate scheme, limited-cost-trader rule | One sentence on why service franchises are usually limited cost businesses, then a link. Never restate the 16.5% analysis. |
| `corporation-tax-marginal-relief-2025-26.md` | corporation tax | Rates used in the worked example only; link for mechanics. |
| N12, N13 (this wave) | franchise spine | Assignment split enforced in §6. |
