# Track A factual QA: business-asset-disposal-relief-selling-a-care-business

Site: care. Date: 2026-09-27. Reviewer: Opus, adversarial.
Verdict: **PASS** (4 precision edits applied in place). Final body word count: 1,054.

Sources used: `docs/care/house_positions.md` (HP16, HP18, HP19, HP28), gov.uk `/business-asset-disposal-relief`, gov.uk `/capital-gains-tax/rates`, legislation.gov.uk TCGA 1992 s.169N. Fetched 2026-09-27.

## Assertion table

| # | Assertion | Where | Authority | Grade |
|---|---|---|---|---|
| 1 | BADR 18% on qualifying disposals from 6 April 2026 | title, summary, KT1, FAQ1, intro, H2-1 | HP19; gov.uk BADR "18% on all gains on qualifying assets disposed of from 6 April 2026"; TCGA s.169N(3) "The rate of capital gains tax in respect of that gain is 18%" | CORRECT |
| 2 | 14% for disposals 6 April 2025 to 5 April 2026 | KT1, FAQ1, H2-1 | HP19; gov.uk BADR verbatim | CORRECT |
| 3 | 10% for disposals on or before 5 April 2025 | KT1, FAQ1, H2-1 | HP19; gov.uk BADR verbatim | CORRECT |
| 4 | Standard higher-rate CGT 24% from 6 April 2026 | summary, KT3, intro, H2-2 | HP19; gov.uk CGT rates "24% on your gains from 6 April 2026" | CORRECT |
| 5 | BADR saving = 6 percentage points | summary, KT3, FAQ2, H2-2 | 24 less 18; HP19 states 6 points | CORRECT |
| 6 | Lifetime limit £1 million, TCGA 1992 s.169N | KT2, FAQ2, intro, H2-2 | HP19 silent; s.169N(4)/(4A) "exceeds £1 million" / "does not exceed £1 million" | CORRECT (primary law) |
| 7 | 10% rate understated tax by 8 percentage points | KT1 | 18 less 10 | CORRECT |
| 8 | 6 points on £1m = £60,000; on £400,000 = £24,000 | KT3, FAQ2, intro, H2-2 | arithmetic | CORRECT |
| 9 | £140,000 comparator at the 10% rate | KT3, intro, FAQ2 | true only against a 24% standard rate, which applied from 30 Oct 2024 to 5 Apr 2025; for most of the 10% era the standard rate was 20% (saving £100,000) | WRONG as stated, FIXED (qualified) |
| 10 | Disposal date fixes the rate; normally the date the contract becomes unconditional, not completion | FAQ1, H2-1 | TCGA 1992 s.28(1)-(2) | CORRECT |
| 11 | Two-year qualifying period ending with the disposal | KT4, FAQ4, H2-3 | HP19 "2 years of trading ownership"; gov.uk "for at least 2 years up to the date you sell your business" | CORRECT |
| 12 | 5% of ordinary share capital and voting rights, plus 5% of distributable profits and winding-up assets, or of proceeds on a sale of the whole ordinary share capital | FAQ4, H2-3 | gov.uk BADR: "at least 5% of both the shares [and] voting rights"; entitled to 5% of "profits... and assets on winding up" OR "disposal proceeds if the company is sold" | CORRECT |
| 13 | Must be an officer or employee, company must be a trading company or holding company of a trading group | FAQ4, H2-3 | gov.uk BADR "you're an employee or office holder of the company (or one in the same group)" | CORRECT |
| 14 | Three-year post-cessation window to dispose of business assets | KT5, FAQ5, H2-3 | gov.uk BADR "You must also dispose of your business assets within 3 years" | CORRECT |
| 15 | Propco/opco split can break eligibility (investment vs trading activity) | FAQ3, H2-3 | HP19 "propco/opco structures can break eligibility" | CORRECT |
| 16 | Annual exempt amount £3,000 for 2026-27, applied before the rate | H2-2 | HP silent; gov.uk CGT rates confirms £3,000 | CORRECT (primary source) |
| 17 | Gains above the lifetime limit taxed at standard rates: 24%, or 18% within an unused basic rate band | KT2, H2-2 | s.169N(4)-(4B) routes excess to s.1H; gov.uk CGT rates "18% on gains within the basic Income Tax band" | CORRECT |
| 18 | Corporation tax 19% up to £50,000, 25% above £250,000, marginal relief between | FAQ6, H2-4 | HP18 | CORRECT (FAQ6 omitted marginal relief, FIXED) |
| 19 | Dividend rates 10.75% / 35.75% / 39.35% from 6 April 2026 | H2-4 | HP28 | CORRECT |
| 20 | Capital allowance balancing charges can arise on an asset sale | H2-4 | HP16, CAA 2001 general | CORRECT, no figure asserted |

No UNSOURCED figures found. No figures removed.

## Edits made (4)

1. KT3: "rather than the £140,000 the old 10% rate delivered" to "against £140,000 when the rate was 10% and the standard rate was already 24%".
2. Intro: same qualification added to the £140,000 comparator.
3. FAQ2: same qualification added.
4. FAQ6: corporation tax sentence reordered and "with marginal relief between" added, matching HP18 and the body.

No figure, date, section reference or rule was changed in substance; edits 1 to 3 narrow an over-broad historical comparison, edit 4 completes a rate description.

## Internal links: all 4 resolve

- `/blog/business-structure-and-acquisition/capital-allowances-care-home-fit-out` -> `care/web/content/blog/capital-allowances-care-home-fit-out.md`, category "Business Structure and Acquisition", slugifies to path. OK.
- `/blog/fees-fnc-and-local-authority-rates/fnc-chc-la-fee-mix-accounting` -> `care/web/content/blog/fnc-chc-la-fee-mix-accounting.md`, category "Fees, FNC and Local Authority Rates", slugifies to path. OK.
- `/services/selling-a-care-home` -> `care/web/src/data/care-services.ts` slug present. OK.
- `/services/buying-a-care-home` -> `care/web/src/data/care-services.ts` slug present. OK.

4 internal links, under the 5 cap.

## Frontmatter

YAML re-validated after editing: parses, 15 keys. `date`, `dateModified` and `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set as the brief requires). Category "Business Structure and Acquisition" verbatim from the allowed list. Canonical matches the category slug plus post slug. metaTitle 47 chars, metaDescription 152 chars, summary 59 words, 6 FAQs, 5 key takeaways, generator "claude-opus", author "Care Home Tax Editorial Team". Zero em-dashes.

## Notes for Track B

- Body is 1,054 words, inside 800 to 1,200, so any trim must be balanced by keeping the figures.
- The £140,000 and £60,000 comparison now appears in three places (KT3, intro, FAQ2) with near-identical wording after the fix. That is a sameness risk inside one post. Vary the phrasing, do not drop the qualifier "and the standard rate was already 24%".
- Closing line uses the approved "A specialist reviews" and "your accountant prepares" formulation.
- Check overlap with `care-structure-before-cqc.md` and `supported-living-company-structure-before-framework-bid.md` on propco/opco and 5% shareholding wording.

## For the manager

- HP19 does not carry the £1 million lifetime limit or the s.169N reference. Sourced here from primary law. Worth adding to `docs/care/house_positions.md` position 19 so later posts do not re-derive it.
- House positions carry no CGT annual exempt amount. £3,000 for 2026-27 taken from gov.uk. Candidate for a new position.
