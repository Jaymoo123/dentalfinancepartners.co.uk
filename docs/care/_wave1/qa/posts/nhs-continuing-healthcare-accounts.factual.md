# Track A factual QA: nhs-continuing-healthcare-accounts

Date: 2026-09-27. Grader: Opus, adversarial. Sources: `docs/care/house_positions.md` (positions 1, 3, 4, 24, 25), nhs.uk NHS continuing healthcare guide (fetched 2026-09-27), VATA 1994 Sch 9 Group 7.

**Verdict: PASS.** 0 edits. Body 1,129 words.

## Assertions

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | Where a resident is eligible for CHC the NHS funds the full package of care, nursing and personal care | HP25 | CORRECT |
| 2 | The provider's supply is to the responsible NHS body, not to the individual or the local authority | HP25 | CORRECT |
| 3 | FNC is a flat weekly NHS payment to nursing homes where the resident does not qualify for full CHC | HP24 | CORRECT |
| 4 | FNC standard weekly rate £267.68 from 1 April 2026 | HP24 (up from £254.06) | CORRECT |
| 5 | FNC higher weekly rate £368.24 from 1 April 2026 | HP24 | CORRECT |
| 6 | FNC and CHC are mutually exclusive, so the FNC payment stops on a CHC award | HP24 ("does not qualify for full NHS continuing healthcare") read with HP25 (CHC funds the whole package). HP25 also warns against conflating the two | CORRECT |
| 7 | CHC is not a top-up; it replaces the funding arrangement | HP25 | CORRECT |
| 8 | FNC is paid at the standard or higher rate regardless of the home's own fee level, and must be accounted for separately from LA and self-funder income | HP24 | CORRECT |
| 9 | The care and support package is normally reviewed within 3 months of the award and at least annually after that | nhs.uk, verbatim: "your needs and support package will normally be reviewed within 3 months and thereafter at least annually". Checked at source this pass | CORRECT |
| 10 | A review considers continued eligibility, so eligibility can change if needs change | nhs.uk CHC guide (review of needs and eligibility); consistent with HP25 framing | CORRECT |
| 11 | Welfare services from a CQC-registered provider are exempt under Group 7 of Sch 9 VATA 1994 | HP1 | CORRECT |
| 12 | The exemption follows the nature of the supply, not the identity of the payer, so CHC income is exempt like LA and self-funder fees | HP1; HP25 notes CHC "alters the VAT analysis" only in that the supply is made to the NHS, not that it becomes taxable. No taxable treatment asserted | CORRECT |
| 13 | Input VAT attributable to an exempt placement is unrecoverable; exemption is a cost not a perk | HP1 | CORRECT |
| 14 | Only taxable turnover counts to the £90,000 registration threshold; exempt care fees do not, so a wholly exempt home with millions of turnover need not register | HP3 (same framing and illustration) | CORRECT |
| 15 | De minimis allows full recovery only where exempt input tax averages no more than £625 a month and is less than half of total input tax | HP4, both limbs, same figures | CORRECT |
| 16 | Most nursing homes will not meet the de minimis test | HP4 ("will rarely meet the de minimis threshold") | CORRECT |
| 17 | A CHC award changes neither de minimis limb | Follows from 12 and 15: the supply stays exempt, so neither the £625 average nor the 50% limb moves | CORRECT |
| 18 | Retrospective/previously unassessed-period awards create a double recognition risk needing a credit note and replacement invoice in the same period | Accounting treatment, no figure or rule asserted; consistent with the CHC national framework's retrospective redress route (HP25 source) | CORRECT |
| 19 | On withdrawal the home returns to invoicing the LA or the resident with FNC on top | HP24 + HP25 read together; conditional on continuing nursing need, which the copy leaves open | CORRECT |
| 20 | England is the default; CHC, FNC and LA charging run under different frameworks and rates in Scotland, Wales and NI, and £267.68 cannot be read across | HP default-jurisdiction rule; HP24 rate is an English rate | CORRECT |

No WRONG, no STALE, no UNSOURCED. Nothing removed. No figure appears in the post that is not in HP24, HP3 or HP4.

## Internal links (all 5 verified on disk)

| Link | Target | Status |
|---|---|---|
| `/blog/fees-fnc-and-local-authority-rates/fnc-chc-la-fee-mix-accounting` | `care/web/content/blog/fnc-chc-la-fee-mix-accounting.md`, category "Fees, FNC and Local Authority Rates" | OK, category slugifies to the path |
| `/calculators/funded-nursing-care-fee-mix-calculator` | `care/web/src/lib/calculators/tools/fnc-fee-mix.ts`, `slug: "funded-nursing-care-fee-mix-calculator"`, imported in `registry.ts` | OK |
| `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` | `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare Exemption" | OK |
| `/services/care-vat-review` | `care/web/src/data/care-services.ts`, slug `care-vat-review` | OK |
| `/blog/care-home-accounts-and-funding/agency-staff-cost-control-occupancy` | `care/web/content/blog/agency-staff-cost-control-occupancy.md`, category "Care Home Accounts and Funding" | OK |

At the five-link cap, not over it.

## Frontmatter

YAML parses. `date`, `dateModified`, `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set). metaTitle 47 chars, metaDescription 144 chars, summary 53 words, 6 FAQs, 5 key takeaways, category "Care Home Accounts and Funding" verbatim from the brief, canonical path matches the category slug. No em-dashes anywhere in the file.

## Notes for Track B

- Heavy overlap risk with the live sibling `fnc-chc-la-fee-mix-accounting`, which covers the same FNC/CHC boundary and the same £267.68 figure. Check for verbatim sentences, particularly the FNC-versus-CHC contrast paragraph and the comparison table rows.
- The £90,000 threshold FAQ and the "exemption is a cost" framing are shared with `vat-on-domiciliary-care` and `care-personal-assistant-vat-registration` in this wave. Check the FAQs are not word-for-word across the three.
- Takeaways 1 and 2 restate the summary and the intro closely. Check they are not word-for-word.
- Body 1,129 words, 71 under the ceiling. There is a little room, but the FNC rate sentence, the £625 test and the Scotland/Wales/NI paragraph are load-bearing and must not be trimmed.
- "a specialist reviews" and "your accountant prepares" both appear in the required house phrasings. Leave them.
