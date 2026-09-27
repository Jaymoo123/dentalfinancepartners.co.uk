# Track A factual QA: cqc-registration-domiciliary-care-finance

Date: 2026-09-27. Reviewer: Opus. Verdict: **PASS**. Edits made: 0. Figures removed: 0. Final body word count: 1,129.

## Sources used
- `docs/care/house_positions.md` (HP1, HP21, HP22, HP23 relevant; **HP is silent on CQC fee amounts**)
- Live: https://www.cqc.org.uk/guidance-providers/fees/provider-fees-payable-social-care-services (fetched 2026-09-27; page last updated 10 June 2024; scheme labelled 2024/25)
- Code: `care/web/src/lib/calculators/tools/cqc-fee-calculator.ts`

## Assertion table

| # | Assertion | Grade | Evidence |
|---|---|---|---|
| 1 | Community social care fee = £239 per location + £54.305 per service user | CORRECT | Live CQC page states verbatim "£239 + (number of service users × 54.305)". Matches `COMMUNITY_BASE = 239`, `COMMUNITY_PER_USER = 54.305`. HP silent. |
| 2 | Cap £92,558 | CORRECT | Live CQC page; `COMMUNITY_CAP = 92558`. |
| 3 | Cap reached at 1,700 service users or more | CORRECT | Live CQC page; `COMMUNITY_CAP_THRESHOLD = 1700`. |
| 4 | Fee charged per registered location | CORRECT | Live page and `calcCqcFee` (`feePerLoc * locs`). |
| 5 | Scheme label "2024/25", described as "the current published scheme" | CORRECT and CURRENT | CQC page carries the 2024/25 label and has not been superseded; last updated 10 June 2024, still the live fee page on 2026-09-27. The post hedges correctly ("labelled 2024/25", "should be checked before each budget cycle"). Same hedge as the calculator's `CQC_FEE_SCHEME_NOTE`. Not STALE, but re-verify each budget cycle. |
| 6 | Residential services banded by registered places, not by formula | CORRECT | `RESIDENTIAL_BANDS` in the calculator; live page bands residential by registered places. |
| 7 | Annual, not one-off, charge | CORRECT | CQC fee scheme is an annual regulatory fee. |
| 8 | New providers submit a financial viability statement on CQC's template, normally prepared or validated by an accountant | CORRECT | HP22 verbatim. |
| 9 | Welfare services by a CQC-registered (state-regulated) provider are VAT exempt | CORRECT | HP1, VATA 1994 Sch 9 Group 7. |
| 10 | Exemption attaches from date registration is **approved**, not from application | CORRECT | HP1 source note: "exemption applies from the date of CQC registration approval, not during the application period". |
| 11 | A business making only exempt supplies cannot register for VAT or recover input tax; set-up VAT is a permanent cost | CORRECT | HP1 and HP3 (exempt fees do not count toward the registration threshold). |
| 12 | Carrying on a regulated activity without registration is a criminal offence under the Health and Social Care Act 2008 | CORRECT | HSCA 2008 s10; HP21 (registration mandatory before regulated activity). |
| 13 | CQC fee is deductible as an ordinary business expense of the trade | CORRECT | Wholly and exclusively, CTA 2009 s54; no HP conflict. |
| 14 | Largest providers subject to CQC market oversight under the Care Act 2014, must notify material financial changes; single-location agency not in scope | CORRECT | HP23 verbatim, including the scale-threshold qualifier. |
| 15 | Scotland = Care Inspectorate, Wales = Care Inspectorate Wales, NI = RQIA, each with own scheme; CQC figures England only | CORRECT | HP line 7 (England default, devolved regimes flagged not mixed). |
| 16 | Adding a location / regulated activity / changing registered manager = a variation requiring application and approval | CORRECT | CQC registration guidance; no figure asserted, no lead time claimed. |
| 17 | No unsourced figure anywhere in the post | PASS | Every number in the post is either the CQC formula (verified live) or absent; the hours-ramp and working-capital passages deliberately carry no figures. |

## Internal links (all verified on disk)
| Link | Target | Exists |
|---|---|---|
| `/calculators/cqc-fee-calculator` | `care/web/src/lib/calculators/tools/cqc-fee-calculator.ts`, registered in `registry.ts` | yes |
| `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` | `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md`, category "CQC and Financial Compliance" | yes, slug path matches |
| `/blog/cqc-and-financial-compliance/cqc-registration-timeline-cash-burn-before-trading` | `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`, same category | yes |
| `/blog/vat-and-welfare-exemption/care-home-vat-exemption-edge-cases` | `care/web/content/blog/care-home-vat-exemption-edge-cases.md`, category "VAT and Welfare Exemption" | yes |
| `/for/domiciliary-care` | `care/web/src/data/care-hubs.ts` line 82 | yes |

Five internal links, at the cap, none over.

## Frontmatter
YAML re-parsed clean, 15 keys. `date`, `dateModified` and `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set as the brief requires). metaTitle 55 chars, metaDescription 149 chars, summary 53 words, 6 FAQs, 5 key takeaways, canonical path matches the category slug. No em-dashes in the file.

## Notes for Track B
- **Verbatim overlap with `cost-to-set-up-a-care-agency.md`**: both posts publish the same formula. Not sentence-identical, but two clauses are near-verbatim and should be differentiated:
  - "CQC's invoice to you is the definitive figure" (this post) vs "CQC's own invoice is the definitive figure" (sibling, FAQ) vs "CQC's invoice to you is the definitive amount" (sibling, body).
  - Both posts link `/calculators/cqc-fee-calculator` with near-identical anchor sentences ("runs the calculation for a given service type and size" vs "runs the formula for community, residential and nurses agency registrations").
  - The cap sentence structure ("capped at £92,558 ... 1,700 or more service users") recurs in both. Track B should let one post own the formula in full and have the other state it once and cross-link.
  - Do not change any of the figures while differentiating: all are verified.
- No pipeline leakage, no HP codes, no banned claims, no markdown in the body found during the factual pass.
