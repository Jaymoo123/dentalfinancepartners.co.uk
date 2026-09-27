# Track A factual QA: supported-living-company-structure-before-framework-bid

Date: 2026-09-27. Verdict: **PASS** (2 edits applied in place).
Sources: `docs/care/house_positions.md` first, primary law where silent.

## Assertion table

| # | Assertion | Source | Grade |
|---|---|---|---|
| 1 | CT 19% to £50,000, 25% above £250,000, marginal relief between | HP18 | CORRECT |
| 2 | Thresholds divided by number of associated companies | HP18 | CORRECT |
| 3 | Two associated companies reach main rate at £125,000 | HP18 arithmetic (£250,000 / 2) | CORRECT |
| 4 | Dormant holdco generally outside the associated company count | CTA 2010 s.18E (HP silent) | CORRECT |
| 5 | Propco/opco separation can break BADR eligibility | HP19 | CORRECT |
| 6 | Dividends 10.75% / 35.75% / 39.35% above £500 allowance from 6 April 2026 | HP28 | CORRECT |
| 7 | Personal care by a CQC-registered provider is exempt welfare; input VAT irrecoverable | HP1 | CORRECT |
| 8 | Revenue and Customs Brief 2/2025: VAT grouping with an unregulated entity is avoidance; HMRC refuses new registrations and removes existing members | HP2 | CORRECT |
| 9 | £90,000 registration threshold counts taxable turnover only; exempt care fees excluded | HP3 | CORRECT |
| 10 | Partial exemption de minimis test | HP4 | **STALE / incomplete, FIXED** — post stated only the £625 monthly average limb; HP4 is a two-part test |
| 11 | NLW £12.71 an hour, 21 and over, from 1 April 2026 | HP7 | CORRECT |
| 12 | Employer NIC 15% above the £5,000 secondary threshold | HP11 | CORRECT |
| 13 | Employment Allowance up to £10,500 | HP12 | CORRECT |
| 14 | Personal care is a regulated activity; carrying it on unregistered is a criminal offence under the Health and Social Care Act 2008 | HP21 | CORRECT |
| 15 | CQC registration attaches to a named legal person, so it does not follow a reorganisation into another company | HP21 plus CQC registration guidance | CORRECT |
| 16 | Accommodation-only support with no personal care sits outside CQC registration | CQC scope of registration | CORRECT |
| 17 | Procurement Act 2023 s.22: conditions of participation only if a proportionate means | legislation.gov.uk s.22(1), s.22(5) | **WRONG wording, FIXED** — post said "proportionate means of establishing"; the Act says "ensuring" |
| 18 | s.22: no audited annual accounts from a supplier not required to have them | s.22(3)(a), verified on legislation.gov.uk | CORRECT |
| 19 | s.22: insurance cannot be required to be in place before award | s.22(3)(b), verified on legislation.gov.uk | CORRECT |

### Procurement Act 2023 s.22, verified text (legislation.gov.uk, fetched 2026-09-27)

- s.22(1): conditions may be set only if the authority is satisfied they are "a proportionate means of ensuring that suppliers have" the legal and financial capacity or technical ability to perform the contract.
- s.22(3)(a): conditions may not "require the submission of audited annual accounts, except from suppliers who are, or were, required to have the accounts audited in accordance with Part 16 of the Companies Act 2006 or an overseas equivalent."
- s.22(3)(b): may not require insurance relating to performance of the contract to be in place before award.
- s.22(5): proportionality is judged against the nature, complexity and cost of the contract.

Both statements in the post are within the statute. No overstatement found.

## Edits made (2)

1. Body, "Which entity should the bid be submitted in?": "proportionate means of **establishing**" to "proportionate means of **ensuring**", matching s.22(1).
2. Body, "Does a group structure improve the VAT position?": de minimis now carries both limbs, "met only where exempt input tax averages no more than £625 a month and is less than half of total input tax in the period" (HP4).

## Figures removed

None. No unsourced figure found.

## Link check (5 of a maximum 5)

| Link | Target | Status |
|---|---|---|
| `/for/supported-living` | `care/web/src/data/care-hubs.ts` slug `supported-living` | OK |
| `/services/care-vat-review` | `care/web/src/data/care-services.ts` slug `care-vat-review` | OK |
| `/blog/payroll-and-workforce-costs/care-worker-pay-rates-2026-27` | `care/web/content/blog/care-worker-pay-rates-2026-27.md`, category "Payroll and Workforce Costs" | OK |
| `/blog/business-structure-and-acquisition/care-structure-before-cqc` | sibling `docs/care/_wave1/posts/care-structure-before-cqc.md`, category "Business Structure and Acquisition" | OK, ships only when that sibling ships |
| `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` | `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md`, category "CQC and Financial Compliance" | OK |

## Frontmatter

YAML re-parses clean, 15 keys. date, dateModified and updatedDate all "2026-09-27" (care loader reads `updatedDate`; both set). category verbatim. canonical matches the category slug. metaTitle 56, metaDescription 153. summary 55 words. 6 FAQs, 5 key takeaways. No em-dash, no TODO, no "(HP..)" leakage.

Body word count after edits: 1,175.

## Notes for Track B

- The de minimis sentence grew by about 20 words and the body now sits at 1,175, near the 1,200 ceiling. Trim padding elsewhere, not this sentence.
- Key takeaway 5 and the second paragraph under the first H2 both carry the s.22 audited-accounts and insurance limits. Deliberate, factually correct, but check it does not read as a repeat.
- FAQ 3 and the H2 "Does a group structure improve the VAT position?" both summarise RCB 2/2025. Wording differs; confirm it is not near-verbatim.
