# Track A factual QA: `inherited-property` (Property, Wave 1)

QA date 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Tie-breaker: `docs/property/house_positions.md` (sections 39, 39.A, 5, 22.2, 15, 4);
primary law where house positions is silent.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | PR residential CGT rate 24%, 2026/27 | HP 39.A ("gov.uk states trustees/PRs pay 24% from 6 April 2026, citable for 2026/27 only"); HP 5 | CORRECT |
| 2 | stats | Estate AEA 3,000 pounds, year of death plus two following tax years | HP 39 ("PRs get the annual exempt amount (3,000) for the year of death + two following tax years, then nil"); HP 5 AEA 3,000; statutory basis TCGA 1992 s.1K(7) per HP 39.A | CORRECT |
| 3 | stats / FAQ 1 / howWeHelp 3 | 60 days to report and pay CGT on a UK residential disposal where tax is due | HP 5; HP 39 (Sch 2 FA 2019, CG30540) | CORRECT |
| 4 | stats / challenge 4 / FAQ 4 / howWeHelp 4 | Two years from death to redirect by deed of variation | HP 22.2 (IHTA 1984 s.142, TCGA 1992 s.62(6)) | CORRECT |
| 5 | challenge 1 | Death is not a disposal; PRs acquire at market value at death; the legatee takes that base cost | HP 39 (TCGA 1992 s.62(1), s.62(4)) | CORRECT |
| 6 | challenge 1 | Only growth after death is taxable; a low probate value trades IHT down for CGT up | HP 39 read with TCGA 1992 s.274 | CORRECT |
| 7 | challenge 2 | Estate AEA runs for the year of death and the two following years only | HP 39, HP 39.A | CORRECT |
| 8 | challenge 2 | Beneficiaries each get their own AEA; a basic rate taxpayer may fall in the lower band | HP 39.A ("assenting to beneficiaries first gives each beneficiary their own AEA and possibly the 18% band"); HP 5 (18%/24%) | CORRECT |
| 9 | challenge 3 / FAQ 3 | Rent before the asset passes is the estate's; after, the beneficiaries' in their shares | General estate income law (ITTOIA 2005 Pt 5 Ch 6, TSEM7000); HP silent | CORRECT (not in `sources`, see G1) |
| 10 | challenge 3 | A beneficiary receiving rent usually registers for self assessment | TMA 1970 s.7; HP silent. No figure or date asserted | CORRECT |
| 11 | challenge 3 | Mortgage interest on a let residential property is a basic rate reducer, not a deduction from profit | HP 4 (section 24, 20% reducer for 2026/27) | CORRECT |
| 12 | challenge 4 / FAQ 5 | With more than one PR, a sale of the land or a contract for one needs all PRs to concur unless probate was granted to only some named executors | HP 39.A (AEA 1925 s.2(2)) | CORRECT |
| 13 | challenge 4 | A variation reads back for IHT and CGT with the right elections | HP 22.2 (s.142 IHTA 1984 plus s.62(6) TCGA 1992, election required) | CORRECT |
| 14 | challenge 4 | Must be for no consideration, otherwise it is a gift with its own seven year clock | HP 22.2 (no consideration rule; without the election it is a fresh PET) with HP 15.2 (seven year clock) | CORRECT |
| 15 | howWeHelp 1 | Where the property has since sold for less, check whether substituting the sale price beats what it costs the base cost | HP 39 (IHTA 1984 s.191 with TCGA 1992 s.274) | CORRECT |
| 16 | FAQ 1 | No 60 day return for a UK resident where the gain is fully covered by PRR, losses or the AEA | HP 5 ("Where the gain is fully covered by PRR, losses, or the AEA, no 60-day filing is required for UK residents") | CORRECT |
| 17 | FAQ 1 | The gain still appears on the self assessment return, so the two filings are not alternatives | HP 5. As drafted the clause attached to the no-return case, which is not what HP says | WRONG as drafted, corrected at E2 |
| 18 | FAQ 2 | PRs selling land within three years of death below the probate figure may substitute the sale price for IHT | HP 39 ("IHTA 1984 s.191 ... within THREE YEARS of death"; the four year figure in s.191(1A) is the claim deadline, not the sale window, and the page does not conflate them) | CORRECT |
| 19 | FAQ 2 | An ascertained IHT value becomes the CGT base cost, so the claim removes the capital loss | HP 39 (TCGA 1992 s.274) | CORRECT |
| 20 | FAQ 5 | The property devolves on the PRs, not on the beneficiaries | HP 39.A (AEA 1925 s.1(1), s.1(3)) | CORRECT |
| 21 | FAQ 5 | gov.uk is explicit that you should not market the property before the grant | HP 39.A (gov.uk "Applying for probate", quoted verbatim in HP; there is no statutory pre-grant sale bar and the page does not assert one) | CORRECT |
| 22 | FAQ 5 | "Inheritance tax normally has to be paid before the grant issues" | HP 39.A quotes gov.uk as "You'll normally have to start paying Inheritance Tax before probate is granted". The page overstated it as paid in full | WRONG, corrected at E1 |
| 23 | metaTitle / metaDescription | 48 and 132 characters | S4a caps of 60 and 160 | CORRECT |
| 24 | whole page | Word band 800 to 1,200 across intro, challenges, howWeHelp and faqs | 1,200 after the edits (1,197 before) | CORRECT, at the ceiling |

No STALE items. No UNSOURCED figure with no source available, so nothing was removed.

## Internal links

| Link | On disk | Verdict |
|---|---|---|
| `/blog/capital-gains-tax/cgt-on-inherited-property-uk-probate-base-cost` | `Property/web/content/blog/cgt-on-inherited-property-uk-probate-base-cost.md`, `category: "Capital Gains Tax"` | CORRECT |
| `/blog/capital-gains-tax/inheriting-uk-rental-property-executors-step-by-step` | `Property/web/content/blog/inheriting-uk-rental-property-executors-step-by-step.md`, `category: "Capital Gains Tax"` | CORRECT |
| `/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving` | `Property/web/content/blog/deed-of-variation-property-estate-redirecting-inheritance-iht-saving.md`, `category: "Landlord Tax Essentials"` | CORRECT |
| `/calculators/capital-gains-tax-calculator` | `Property/web/src/lib/calculators/tools/capital-gains-tax-calculator.ts`, registered in `registry.ts`, served by `/calculators/[slug]` | CORRECT |
| `/calculators/rental-income-tax-calculator` | `Property/web/src/lib/calculators/tools/rental-income-tax-calculator.ts`, same route | CORRECT |

Both category segments match the slugified `category` frontmatter and an existing directory
under `Property/web/src/app/blog/`.

## Sources array

Nine entries. Every figure, rate, threshold, date and statutory rule on the page is covered:
s.62(1) and s.62(4) and the probate base cost; the PR AEA with s.1K(7); the 3,000 pound AEA
and the 24% PR rate with a gov.uk verification date; the 18% and 24% residential rates and the
60 day rule with the covered-gain carve-out; s.191 with s.274; AEA 1925 ss.1-2 with the gov.uk
marketing and pre-grant IHT lines; s.142 with s.62(6); and section 24 as a basic rate reducer.

Two gaps, both low risk, neither an unsupported figure:

- **G1.** The estate versus beneficiary split of rental income (challenge 3, FAQ 3) has no
  entry. It is settled law rather than a house position and no figure is asserted, so nothing
  is removed. The integrator can add ITTOIA 2005 Pt 5 Ch 6 / TSEM7000 if the array is meant to
  be exhaustive.
- **G2.** The seven year PET clock in challenge 4 rests on HP 15.2 but the array cites only
  22.2. Same treatment, no figure beyond "seven year", which 15.2 supports.

## Note for the integrator, not a defect

HP 39.A carries flag F-176: two live pages still cite the repealed TCGA 1992 s.3(7) for the PR
AEA, one of them `inheriting-uk-rental-property-executors-step-by-step`, which this page links
to. This page cites s.1K(7) correctly and is unaffected; the linked post is a separate
back-patch already tracked in house positions.

## Edit log

Three edits, each a figure or one-clause scope, all inside the JSON under review. No other file
was touched. The file re-parses as JSON after the edits and the word count is 1,200.

- **E1. FAQ 5, WRONG corrected.** "Inheritance tax normally has to be paid before the grant
  issues" becomes "Inheritance tax normally has to start being paid before the grant issues".
  Reason: HP 39.A quotes gov.uk as "start paying", and IHT on land can be paid by instalments
  under IHTA 1984 s.227, so paid in full before the grant is wrong.
- **E2. FAQ 1, WRONG corrected.** ". The gain still appears on the self assessment return"
  becomes ". Where one is due, the gain still appears on the self assessment return". Reason:
  as drafted the sentence read as though the self assessment entry follows the no-return case.
  HP 5 supports the statement only where the 60 day return is required.
- **E3. FAQ 2, length trim to hold the band.** "if the estate bore inheritance tax at all, and
  it has a cost" becomes "if the estate bore inheritance tax, and it has a cost". Reason: E1
  and E2 added six words to a page already at 1,197, and this returns it to the 1,200 ceiling.
  No change of meaning.

VERDICT: PASS
