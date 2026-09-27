# Track A factual QA: supported-living-contract-forecast

Date: 2026-09-27. Reviewer: Opus, adversarial pass.
Source of truth: `docs/care/house_positions.md` (positions cited as HP<n>), primary law where silent.

## Verdict: PASS

1 edit made (one unsourced figure removed). No WRONG or STALE assertion found.

## Assertion table

| # | Assertion (location) | Grade | Authority |
|---|---|---|---|
| 1 | NLW £12.71 for 21 and over from 1 April 2026 (summary, takeaway 2, intro, H2 "fully loaded", table) | CORRECT | HP7 |
| 2 | £10.85 for 18 to 20 (H2 "fully loaded") | CORRECT | HP7 |
| 3 | £8.00 for under-18s and first-year apprentices (H2 "fully loaded") | CORRECT | HP7 (apprentice rate = under 19, or 19+ in first year; the post's shorthand is accurate) |
| 4 | Employer NIC 15% on pay above the £5,000 annual secondary threshold (summary, takeaway 2, FAQ 3, intro, H2, table) | CORRECT | HP11 |
| 5 | £5,000 a year "which is £96 a week" (H2 "fully loaded") | CORRECT | HP11 states £96 weekly / £417 monthly |
| 6 | Model NIC per head, not as a blanket percentage of payroll (H2 "fully loaded", table, following paragraph) | CORRECT | HP11 explicitly recommends per-head modelling |
| 7 | Holiday accrual 12.07% of hours worked for irregular-hours staff (summary, takeaway 2, FAQ 3, intro, table) | CORRECT | HP10 |
| 8 | Employment Allowance up to £10,500 a year, eligible businesses, business-level not per contract (takeaway 3, H2 "fully loaded") | CORRECT | HP12 |
| 9 | AMAP 55p a mile, first 10,000 business miles, from 6 April 2026 (H2 "fully loaded", table) | CORRECT | HP8 |
| 10 | Inter-call travel is working time for NMW in a dispersed service (H2 "fully loaded") | CORRECT | HP6 |
| 11 | Sleep-ins: NMW only for time awake for the purposes of working, sleeping facilities provided; Royal Mencap Society v Tomlinson-Blake (FAQ 4) | CORRECT | HP5 (Supreme Court, [2021] UKSC 8) |
| 12 | Support services from a CQC-registered provider are VAT exempt under the welfare group; input VAT is a permanent cost (takeaway 5, FAQ 6, H2 "tax and structure") | CORRECT | HP1 (VATA 1994 Sch 9 Group 7) |
| 13 | Where the provider also makes taxable supplies, a partial exemption calculation decides recovery (FAQ 6) | CORRECT | HP4 |
| 14 | Corporation tax 19% up to £50,000, 25% above £250,000, marginal relief between (H2 "tax and structure") | CORRECT | HP18 |
| 15 | Associated company rules reduce those thresholds where an opco sits with a propco (H2 "tax and structure") | CORRECT | HP18 |
| 16 | LA fee levels sit inside Care Act 2014 statutory guidance and the market sustainability framework; a basis for a fee review, not a guaranteed uplift (FAQ 5, H2 "tax and structure") | CORRECT | HP26 |
| 17 | England is the default; Scotland, Wales and Northern Ireland differ (closing paragraph) | CORRECT | house positions preamble |
| 18 | "The gross rate is roughly three quarters of the answer" (H2 "fully loaded") | UNSOURCED | no house position; the true share moves with rota age mix, pension and the non-chargeable uplift. REMOVED |

## Worked example, arithmetic checked line by line

The example is explicitly labelled: "The figures below are an example for illustration, not a rate any commissioner has agreed." Every figure in it is either a locked statutory rate or a clearly labelled assumption. No commissioner rate, no price, no invented cost per hour.

| Line | Value | Check |
|---|---|---|
| Contracted support hours a week | 400 | Labelled assumption (package schedule). Round illustrative figure, no source claimed. OK |
| Paid hours a week | 448 | Stated as contracted hours plus 12%. 400 x 1.12 = 448 exactly. CORRECT |
| Gross pay rate an hour | £12.71 | HP7, statutory. CORRECT |
| Employer National Insurance | 15% above £5,000 a year | HP11, statutory. Shown as a rate, not a derived pound figure, so nothing to recompute. CORRECT |
| Holiday accrual | 12.07% of hours worked | HP10, statutory shorthand. CORRECT |
| Pension, sleep-ins, mileage | separate lines, 55p a mile | HP8 for mileage; the other two are labelled as assumption lines with no figure asserted. CORRECT |

The table deliberately stops at the bridge and does not publish a total loaded cost per hour. That is the right call: a total would need pension and awake-hours assumptions that are not locked anywhere, and it would read as a rate rather than an example. No arithmetic defect found.

## Internal links, all five verified on disk

| Link | Target | Status |
|---|---|---|
| /blog/payroll-and-workforce-costs/care-worker-pay-rates-2026-27 | `care/web/content/blog/care-worker-pay-rates-2026-27.md`, category "Payroll and Workforce Costs" | OK, slug and category path match |
| /blog/payroll-and-workforce-costs/sleep-in-pay-travel-time-nmw | `care/web/content/blog/sleep-in-pay-travel-time-nmw.md`, category "Payroll and Workforce Costs" | OK |
| /blog/care-home-accounts-and-funding/agency-staff-cost-control-occupancy | `care/web/content/blog/agency-staff-cost-control-occupancy.md`, category "Care Home Accounts and Funding" | OK |
| /blog/business-structure-and-acquisition/care-business-survival-rates | `care/web/content/blog/care-business-survival-rates.md`, category "Business Structure and Acquisition" | OK |
| /for/supported-living | `care/web/src/data/care-hubs.ts` line 153, `slug: "supported-living"` | OK |

Five links, which is the cap and not over it. No calculator is linked, per the map row instruction that no tool exists for this topic.

## Frontmatter

All required keys present. `date`, `dateModified` and `updatedDate` are all "2026-09-27" (the care loader reads `updatedDate`; both are set as the brief requires). Category "Care Home Accounts and Funding" is verbatim from the list and slugifies to `care-home-accounts-and-funding`, which matches the canonical URL. metaTitle 56 characters (cap 60), metaDescription 136 characters (cap 155), summary 56 words (band 40 to 60), 5 keyTakeaways (band 3 to 5), 6 FAQs (band 4 to 6), author and generator correct. YAML re-parsed clean after the edit.

## Edits made

1. H2 "What goes into a fully loaded cost per hour?", first sentence: "The gross rate is roughly three quarters of the answer" changed to "The gross rate is only the start of the answer". The fraction was an unsourced quantification; the paragraph's substance is unchanged and no statutory figure was touched.

## Figures removed

- "roughly three quarters" (the proportion of loaded cost represented by the gross rate). No house position and no primary source supports a single fraction.

## Notes for Track B

- Body word count 1085, inside the 800 to 1,200 band. There is roughly 285 words of trimming headroom before the floor, but do not trim the worked example or the statutory paragraphs.
- No em-dashes, no markdown in the body, no pipeline leakage, and no banned claim strings ("chartered", "ICAEW", "our accountants", "we advise", "advice") present. Checked mechanically.
- Sibling overlap risk is highest with `supported-living-company-structure-before-framework-bid.md` (both carry a structure and associated-company paragraph) and with `cost-to-set-up-a-care-agency.md` (both carry the pay stack). The pay-stack facts must stay identical in substance; differentiate by wording and framing only.
- Royal Mencap Society v Tomlinson-Blake is a case citation, not a named person in the banned sense. HP5 names it. Keep it.
- The CQC-registration VAT exemption framing appears three times (takeaway 5, FAQ 6, body). Deduplicate for style if wanted, but the fact must survive in at least one place.

## Manager action needed elsewhere

None.
