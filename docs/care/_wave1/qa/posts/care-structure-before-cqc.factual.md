# Factual QA (Track A): care-structure-before-cqc

File: `docs/care/_wave1/posts/care-structure-before-cqc.md`
Brief: `docs/_engines/WAVE1_POST_QA_BRIEF.md`, Track A. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` s13 S4b.
Tie-breaker: `docs/care/house_positions.md` (HP rows); primary source where house positions is silent.
Reviewed 2026-09-27.

## Verdict

**PASS.** 1 edit. Final body word count 1,105.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, h2 1, faq 1 | CQC registers a specific legal person: an individual, a partnership or an organisation such as a limited company | HP21; cqc.org.uk/guidance-providers/registration (HTTP 200) | CORRECT |
| 2 | h2 1 | Registration is mandatory before any regulated activity begins | HP21 | CORRECT |
| 3 | h2 1 | Carrying on a regulated activity unregistered is a criminal offence under the Health and Social Care Act 2008 | HP21 | CORRECT |
| 4 | intro, h2 2, faq 3 | Moving from individual provider to partnership or limited company is a change of business type, and you complete the provider application again with the relevant supporting documents | cqc.org.uk change-your-registered-business-type (fetched, page updated 15 July 2026): "You will need to complete the provider application again. This includes supplying the relevant supporting documents" | CORRECT |
| 5 | h2 2, kt 2, faq 3 | You must also send a completed insurance form and an additional information form for your sector | Same page: "You will also need to send us a completed insurance form and an additional information form for the sector you work in" | CORRECT |
| 6 | h2 2, faq 3 | Registered managers must apply to continue under the incoming provider, cancel, or remove the location | Same page, "Registered managers" section, three options verbatim | CORRECT |
| 7 | h2 2 | A period in which nobody can be providing care while unregistered | Same page: CQC checks "no one is providing care while unregistered" | CORRECT |
| 8 | intro, kt 3, h2 3, faq 4-equivalent | Corporation tax 19% up to £50,000, 25% above £250,000, marginal relief between | HP18 | CORRECT |
| 9 | intro, kt 4, h2 3 | Dividend tax 10.75%, 35.75%, 39.35% from 6 April 2026, above the £500 dividend allowance | HP28 | CORRECT |
| 10 | h2 3 | A sole trader or partner is taxed personally on the whole profit in the year earned, with Class 4 NIC on top (no rate asserted) | HP-silent; general income tax / NICA 1965 s.15 position, no figure | CORRECT |
| 11 | h2 3 | Associated company rules divide the £50,000 and £250,000 thresholds, so a propco/opco pair reaches 25% on lower profits | HP18 (associated company rules reduce thresholds proportionately) | CORRECT |
| 12 | kt 5, h2 4 | MTD for Income Tax catches sole traders and partners with combined self-employment and property income above £50,000 from 6 April 2026, threshold falling to £30,000 from April 2027 | HP27 (£50,000 from 6 Apr 2026, £30,000 from 6 Apr 2027) | CORRECT |
| 13 | h2 4 | Sole traders and ordinary partners are personally exposed to business debts | Partnership Act 1890 s.9; no figure | CORRECT |
| 14 | h2 5, faq 2 | New providers must submit a financial viability statement on CQC's template | HP22 | CORRECT |
| 15 | h2 6, faq 5 | The welfare exemption follows CQC registration, not entity type, and input VAT on the costs of exempt supplies is irrecoverable | HP1 | CORRECT |
| 16 | h2 6, faq 6 | Employer NIC 15% above the £5,000 secondary threshold | HP11 | CORRECT |
| 17 | h2 6, faq 6 | Employment Allowance of up to £10,500 for eligible employers | HP12 | CORRECT |
| 18 | h2 7 | BADR taxes qualifying gains at 18% for disposals from 6 April 2026, against the standard 24% higher rate | HP19 | CORRECT |
| 19 | h2 7 | Two years of qualifying trading ownership before the disposal | HP19 | CORRECT |
| 20 | h2 7 | Propco/opco separation can break BADR eligibility | HP19 | CORRECT |
| 21 | faq 6 | National Living Wage applies the same way to a sole trader employer and a company employer (no rate asserted) | HP7 (rate not quoted here, so nothing to go stale) | CORRECT |
| 22 | h2 4 | "The formation data across the sector shows incorporation is the dominant route" | `care-provider-formation-trends` counts Companies House incorporations only; it has no sole-trader denominator, so it cannot support a "dominant route" share claim | **UNSOURCED (fixed)** |

No WRONG. No STALE. One UNSOURCED claim, corrected rather than deleted because the surrounding sentence needed the link.

## Edits made

1. `h2 4` ("Are there reasons to stay unincorporated?"): replaced "shows incorporation is the dominant route, but it is not the only workable one" with "counts new care companies, not new sole traders, so it tells you incorporation is busy rather than that it is the only workable route." No figure, rate or date changed.

## Figures removed

None. Every number on the page is carried by an HP row.

## Links checked (all exist on disk)

| Target | Where | Category check |
|---|---|---|
| `/blog/business-structure-and-acquisition/care-provider-formation-trends` | `care/web/content/blog/care-provider-formation-trends.md` | category "Business Structure and Acquisition", slugifies to path |
| `/blog/care-home-accounts-and-funding/mtd-it-care-owner-operators` | `care/web/content/blog/mtd-it-care-owner-operators.md` | category "Care Home Accounts and Funding", matches |
| `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` | `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md` | category "CQC and Financial Compliance", matches |
| `/blog/cqc-and-financial-compliance/cqc-registration-requirements-financial-viability-leg` | `care/web/content/blog/cqc-registration-requirements-financial-viability-leg.md` | category "CQC and Financial Compliance", matches |
| `/for/care-startups` | `care/web/src/data/care-hubs.ts` line 287, `slug: "care-startups"` | hub exists |

Five internal links, at the cap. Two external links (cqc.org.uk registration guidance, gov.uk corporation-tax-rates, gov.uk tax-on-dividends: three in total), all inside the allowed domains and all resolving.

## Frontmatter

YAML parses after editing. All 15 required keys present. `date`, `dateModified` and `updatedDate` all "2026-09-27" (care loader reads `updatedDate`; both set as the brief requires). metaTitle 54 chars, metaDescription 151 chars, summary 55 words, 5 keyTakeaways, 6 faqs, category verbatim from the list, canonical path matches the slugified category.

## Notes for Track B

1. Intro asserts a limited company "is the wrapper lenders and local authority commissioners expect to contract with". No figure, so Track A leaves it, but it is an unevidenced sector generalisation: consider softening.
2. FAQ 6 answer opens "Not at all" and the h2 6 answer opens "No" on effectively the same point (VAT and payroll neutrality). Check for near-duplicate phrasing against the sibling post and against `care-franchisees.json`, which covers employer NIC, Employment Allowance and mileage in similar terms.
3. h2 3 and FAQ 4 both make the personal-liability point about ordinary partnerships. Possible repetition.
4. Body is 1,105 words, near the 1,200 ceiling; any Track B addition needs a matching trim.
5. No em-dashes, no markdown in the body, no pipeline leakage, no banned claims found in this pass.
