# Track A factual QA: cost-to-set-up-a-care-agency

Reviewer: Opus. Date: 2026-09-27. Site: care.
Sources: `docs/care/house_positions.md` (HP1-HP30), `care/web/src/lib/calculators/tools/cqc-fee-calculator.ts`, cqc.org.uk fee scheme page (fetched 2026-09-27), primary law where house positions are silent.

## Verdict: PASS

2 edits, both rule-wording. No figure was wrong, stale or unsourced. Final body word count 1,057 (in range 800 to 1,200).

## Assertion table

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | Carrying on a regulated activity before CQC registration is granted is a criminal offence, Health and Social Care Act 2008 | HP21 | CORRECT |
| 2 | Registration takes effect from the date granted, not the date applied | HP1 note (exemption applies from the date of CQC registration approval, not during the application period) | CORRECT (edited, see E1) |
| 3 | CQC community social care fee = £239 + £54.305 per service user, per location | calculator `COMMUNITY_BASE` / `COMMUNITY_PER_USER`; cqc.org.uk fee page, verbatim "£239 + (number of service users x 54.305)" | CORRECT |
| 4 | Cap £92,558, applies at 1,700 or more service users at a location | calculator `COMMUNITY_CAP` / `COMMUNITY_CAP_THRESHOLD`; cqc.org.uk "maximum fee of £92,558 (1,700 service users or more)" | CORRECT |
| 5 | Fee charged per location then added together | calculator `calcCqcFee` community branch (`feePerLoc * locs`) | CORRECT |
| 6 | Scheme year is 2024/25 and still the current published scheme | calculator `CQC_FEE_SCHEME_YEAR`; cqc.org.uk page still labels 2024/25 as at 2026-09-27 | CORRECT |
| 7 | CQC's invoice is the definitive figure | calculator header comment and tool note; CQC page | CORRECT |
| 8 | The CQC fee is recurring annual, not a one-off | calculator explainer; HP21 context | CORRECT |
| 9 | National Living Wage £12.71 an hour, 21 and over, from 1 April 2026 | HP7 | CORRECT |
| 10 | £10.85 an hour for 18 to 20 | HP7 | CORRECT |
| 11 | Employer NIC 15% above the £5,000 a year secondary threshold | HP11 | CORRECT |
| 12 | Secondary threshold equals £96 a week | HP11 | CORRECT |
| 13 | Employment Allowance up to £10,500 a year | HP12 | CORRECT |
| 14 | The allowance often removes the employer NIC bill entirely for a small agency | HP12 (explicit) | CORRECT |
| 15 | Travel between one client and the next is working time for NMW | HP6 | CORRECT |
| 16 | AMAP 55p a mile, first 10,000 business miles, from 6 April 2026 | HP8 | CORRECT |
| 17 | Holiday accrues for irregular-hours workers at 12.07% of hours worked in a pay period | HP10 | CORRECT |
| 18 | Rota-based self-employed carers who cannot substitute are employees in substance; HMRC audit concentrated there | HP9 | CORRECT |
| 19 | Welfare services by a CQC-registered provider are exempt under Group 7, Schedule 9, VATA 1994 | HP1 | CORRECT |
| 20 | An exempt supplier cannot recover input VAT, so the VAT is a permanent cost | HP1 | CORRECT |
| 21 | Exempt income does not count towards the £90,000 threshold, which tests taxable turnover only | HP3 | CORRECT |
| 22 | Partial exemption de minimis: £625 a month average and less than half of total input tax | HP4 | CORRECT (edited, see E2) |
| 23 | AIA 100% on up to £1,000,000 of qualifying plant and machinery a year | HP15 | CORRECT |
| 24 | Expenditure in the seven years before trading is treated as incurred on the first day of trading | House positions silent; CAA 2001 s.12 | CORRECT |
| 25 | New provider applications require a financial viability statement | HP22 | CORRECT |
| 26 | Scotland, Wales and NI register with Care Inspectorate, CIW and RQIA, each with its own fee scheme | HP default-jurisdiction rule; mirrored in the calculator's UK-coverage FAQ | CORRECT |
| 27 | Minimum wage, NIC, VAT and capital allowances are UK-wide | HP7, HP11, HP1, HP15 | CORRECT |
| 28 | CQC publishes no minimum opening capital; the FVS tests cover to the point fee income overtakes cost (FAQ 6) | HP22 and the CQC FVS template; framed as what the statement tests, no figure asserted | CORRECT |

No WRONG. No STALE. No UNSOURCED figures, so none removed.

## Edits made

E1. Body, "Why is the setup cost a cash question" section. Replaced "care delivered during the application window cannot be invoiced retrospectively" with "registration takes effect from the date it is granted rather than from the date you applied". The original was an unsourced consequence claim about invoicing; the replacement is the position HP1 actually supports. Same effect for the reader, no figure changed.

E2. Body, VAT section. The de minimis test was stated on one limb only ("once exempt input tax exceeds the de minimis limit of £625 a month"). HP4 carries a two-part test. It now reads: full recovery only where exempt input tax averages no more than £625 a month and is less than half of total input tax in the period. No figure changed, a missing condition added.

## Internal links, all four exist

| Link | Target on disk | Status |
|---|---|---|
| `/blog/cqc-and-financial-compliance/cqc-registration-timeline-cash-burn-before-trading` | `care/web/content/blog/cqc-registration-timeline-cash-burn-before-trading.md`, category "CQC and Financial Compliance" slugifies to the path | OK |
| `/calculators/cqc-fee-calculator` | `care/web/src/lib/calculators/tools/cqc-fee-calculator.ts`, `slug: "cqc-fee-calculator"` | OK |
| `/calculators/true-cost-care-hour-calculator` | `care/web/src/lib/calculators/tools/true-cost-care-hour.ts`, `slug: "true-cost-care-hour-calculator"` (the file name differs from the slug; the slug is what routes) | OK |
| `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` | `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md`, category "CQC and Financial Compliance" | OK |

Four links, under the cap of five.

## Frontmatter

YAML re-validated after both edits. slug, title, date, dateModified, updatedDate, category, metaTitle, metaDescription, h1, summary, author, canonical, generator, keyTakeaways, faqs all present.

- category "CQC and Financial Compliance", verbatim from the brief's list.
- canonical `https://www.carehometax.co.uk/blog/cqc-and-financial-compliance/cost-to-set-up-a-care-agency`, matches the slugify rule.
- metaTitle 37 characters (limit 60). metaDescription 153 characters (limit 155).
- summary 60 words (band 40 to 60, at the top of the band).
- faqs 6 (band 4 to 6). keyTakeaways 5 (band 3 to 5).
- Both `updatedDate` and `dateModified` set to 2026-09-27, as the brief requires for the care loader.
- No em-dashes, no markdown in the body, one tax year throughout.

## Notes for Track B

1. The summary is 60 words, exactly at the ceiling. An editorial rewrite must not push it over.
2. metaDescription is 153 of 155 characters. Almost no slack.
3. The body opens with "Setting up a care agency costs whatever it costs to keep the business alive", which may read as a hedge before the numbers arrive. The numbers do arrive in the same paragraph. Editorial call, not factual.
4. Sibling overlap risk: `how-to-start-a-domiciliary-care-agency-money-decisions`, `cqc-registration-domiciliary-care-finance` and `vat-on-domiciliary-care` all restate the CQC community fee formula and the welfare exemption. Those are house positions and must not be changed. If de-duplication is needed, vary the sentence, never the figure.
5. "We model that window separately" and "Our CQC fee calculator" are first person plural. Not on the banned list, but worth checking for consistency across the wave.
6. Word count is 1,057 after the two edits, leaving 143 words of headroom.

## Manager items

None. No estate-level defect found. The calculator, the house positions and the live CQC page agree with each other and with the post.
