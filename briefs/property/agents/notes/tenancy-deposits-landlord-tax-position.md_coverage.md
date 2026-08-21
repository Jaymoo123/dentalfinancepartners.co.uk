# Coverage note: `tenancy-deposits-landlord-tax-position` (agents1 page 4)

Written 2026-08-21 with the page. Required by
`PACK_tenancy-deposits-landlord-tax-position.md` §7 criterion 12 and DOSSIER.md §9.

**No house_positions lock exists for the tax treatment of tenancy deposits.** Every tax position on
the page was verified against the HMRC Property Income Manual on gov.uk at write time. The register
in §3 below is the deliverable that lets QA factual re-derive each one. Anything that could not be
verified at the manual is in §4 and is not on the page.

## 1. Equity

**ZERO.** Net-new slug, no prior Google or Bing rows, nothing to protect. No page on the site covered
deposit tax treatment before this one. `deposit-buy-to-let-2026-mortgage-requirements` is a mortgage
deposit page, a different meaning of the word, and is neither linked nor mentioned.

## 2. Keywords assigned, placed and declined

Volumes from `briefs/property/agents/ledger.csv` (Google Ads UK `search_volume`, DataForSEO, pulled
2026-08-21).

| Keyword | Vol/mo | Placed where |
|---|---:|---|
| `tenancy deposit tax treatment` | 0 | metaTitle, title, H1 ("Tenancy Deposit Tax Treatment: The Landlord's Position") and in body |
| `is a tenancy deposit taxable income` | 0 | FAQ question 1, near-verbatim ("Is a tenancy deposit taxable income?") |
| `deposit deductions tax landlord` | 0 | FAQ question 6, natural phrasing ("Deposit deductions are taxed on the landlord, not on the agency that holds the money") |
| `client money protection letting agents` | 10 | One definitional sentence only, plus the scope sentence. Not a ranking target |

**Stated plainly, per DOSSIER.md §10: this page has no measured demand to win.** Three of the four
assigned terms carry no recorded Google Ads volume; the fourth carries 10 a month and is assigned for
definitional scope only. DOSSIER.md §7 grades the page C (whitespace, zero measured).

**No keyword at or above 50/mo is assigned to this slug**, so there is no high-volume decline to
record here. The page takes nothing from any sibling.

Two limitations carried forward from DOSSIER.md §11 and not hidden: no DataForSEO Labs harvest was
run for this cluster, so the term universe is seed-listed rather than exhaustive; and Google Ads "no
volume" means below the reporting floor, not literally zero searches.

## 3. Property Income Manual register: position, paragraph, verified date

All fetched from `https://www.gov.uk/hmrc-internal-manuals/property-income-manual/<para>` on
**2026-08-21**. PIM1051, PIM1052, PIM1094 and PIM1092 each show "Updated: 21 May 2026" on gov.uk.

| # | Position as written on the page | Governing paragraph | Verified |
|---|---|---|---|
| 1 | A deposit is a receipt category of a property business, but is not brought into income when taken | **PIM1051** (Income chargeable: overview; lists "deposits/bonds taken from tenants (see final paragraph below)" among receipts, routing within PIM1051 itself) | 2026-08-21 |
| 2 | While it sits in a protection scheme the deposit is still legally the tenant's, so under the cash basis it is recognised only when the landlord becomes legally entitled to retain it | **PIM1094** (Cash basis for landlords: receipts and expenses; verbatim "the amount of the deposit is still legally held by the tenant and not the landlord, the deposit or a part of it is only recognised as a receipt under the cash basis when the landlord becomes legally entitled to retain that amount") + Example 3 (Mr F, £1,100 deposit not income in 2019-20; £300 retained is income in 2020-21; £800 refunded never income) | 2026-08-21 |
| 3 | For a landlord not on the cash basis, the deposit is deferred and matched with the cost of the services or repairs it was taken to cover | **PIM1052** (Income chargeable: deposits or bonds taken from tenants; verbatim "deposits should be recognised in accordance with generally accepted accounting practice, normally by being deferred and matched with the costs of providing the services or carrying out repairs") | 2026-08-21 |
| 4 | A deposit refunded to the tenant is excluded from the receipts of the property business, so a deposit returned in full is a tax non-event | **PIM1052** (verbatim "To the extent that a deposit taken from a tenant or licensee exceeds the relevant costs, and is subsequently refunded, it should be excluded from the receipts of the property business") + PIM1094 Example 3 | 2026-08-21 |
| 5 | Amounts not refunded at the end of the tenancy are income at that point, so far as not already recognised. This is the page's core position | **PIM1052** (verbatim "Deposits, bonds and similar which are not refunded at the end of a tenancy should be included as income at that point to the extent that they have not already been recognised") | 2026-08-21 |
| 6 | The timing trigger under the cash basis is legal entitlement (deduction agreed, awarded or settled), not the movement of cash out of the scheme | **PIM1094** (entitlement wording above; Mr F becomes "legally entitled to the £300 at this time" and brings it in for that year) | 2026-08-21 |
| 7 | The manual applies one rule to non-refunded amounts and does not separate a retention for unpaid rent from one for damage or cleaning | **PIM1052** (single rule, no character split anywhere on the paragraph) | 2026-08-21 |
| 8 | A repair funded by the retention is deductible where it is revenue; painting and decorating, mending broken doors and windows, treating damp and rot are repairs | **PIM2025** (Deductions: repairs: overview; repairs are revenue expenses deductible in computing property business profits, with that example list) | 2026-08-21 |
| 9 | Capital spend (an improvement rather than a restoration) cannot be deducted from rental profits | **PIM2030** (Deductions: repairs: is it capital?; verbatim "capital expenditure cannot be deducted in computing the profits of a property business"; improvement versus restoring to previous condition, and the modern-materials rule) | 2026-08-21 |
| 10 | A retention kept with no work done is income with nothing to set against it | **PIM1052** (income arises on non-refund, with no condition that the money be spent) read with **PIM2025** (a deduction requires actual repair expenditure) | 2026-08-21 |
| 11 | The retention can fall in one tax year and the work in another | **PIM1092** + **PIM1094** (cash basis: receipts and expenses accounted for when money is received or paid) read with **PIM1010** (Basis of assessment and time apportionment; the basis period for a property business is the tax year) | 2026-08-21 |
| 12 | Lawfully due advance rent is rent, and the year it falls into depends on the basis: cash basis = year of receipt; GAAP = recognised as earned and apportioned to the tax year | **PIM1092** (verbatim "property business receipts and expenses are accounted for when money is received or paid, not on the date the income is earned or expenses incurred") + **PIM1010** (apportionment to the tax year) | 2026-08-21 |
| 13 | The cash basis applies by default to a property business run by individuals or partnerships with receipts of £150,000 or less (the only pound figure in the body) | **PIM1092** (Cash basis for landlords: overview; £150,000 default threshold since 2017-18, proportionally reduced for part-year, election out to GAAP within one year of the filing date) | 2026-08-21 |
| 14 | The landlord, not the agency, is the person taxed; rent received as agent is not the agent's income | **PIM1030** (Who receives property income?; ITTOIA 2005 s.271 "the person receiving or entitled to the profits", and verbatim "Receiving rent as agent of another person does not mean the agent receives the income for tax purposes") | 2026-08-21 |

**Correction to the pack's starting points, logged.** DOSSIER.md §6 nominated PIM1051 and PIM2510 as
candidates. PIM1051 is correct as an entry point but is only an overview. **PIM2510 is not on point
at all: it is "Beginning and end of a property business: cessation".** PIM1058, the next paragraph
in the PIM1050 contents, is "Local authority grants & other contributions" and is not it either. The
governing paragraph is **PIM1052**, found from the PIM1050 contents page. The pack said its two candidates were
starting points and not findings; that was correct.

### Positions taken from house_positions, no PIM verification required (pack §6c)

| Position | Lock |
|---|---|
| Advance rent restricted on two layers from 1 May 2026: pre-tenancy via the Tenant Fees Act 2019 amendment (prohibited payment, narrow carve-outs); during the tenancy via the Housing Act 1988 insertion (term of no effect), carve-outs for an initial rent in an initial 28 day period and rent in a permitted pre-tenancy period | house_positions §20.8 (incl. F-16 correction 2026-05-23) |
| The 1 May 2026 wave applies to private (non-social-housing) assured tenancies; social housing follows in a later phase, expectation not a commenced date | house_positions §20.12 (SI 2026/421 reg 2 carve-out, re-verified 2026-08-21) |
| "Landlords can demand 6 months rent upfront" is a do-not-write | house_positions §20.13 |
| The Act is the Renters' Rights Act 2025, never "2026" | house_positions §26.8 |
| The deposit cap sits in the Tenant Fees Act 2019 permitted-payment list; detail belongs to the pet-rights page | pack §6c; the page states the cap exists and links, and does not restate it |

## 4. Positions DECLINED, with the reason

Each of these was available to write and is not on the page.

1. **"The retention adds to the CGT base cost."** PIM2030 confirms capital expenditure cannot be
   deducted in computing property business profits and points to capital allowances; it does **not**
   state the capital gains base-cost consequence, and that consequence lives in TCGA rather than the
   Property Income Manual. Declined for want of a PIM paragraph. The page says only that capital
   spend cannot be deducted from rental profits.
2. **"A retention for unpaid rent is rent; a retention for damage is a different category."** PIM1052
   applies one rule to everything not refunded and draws no such distinction. The page states the
   manual's single rule and adds only that the reason for the deduction affects what can be set
   against it, not whether it is income. Declined as an unsupported split rather than blurred.
3. **The "contingent liability to repay" reasoning** offered in the pack §6b point 2 as the technical
   basis. The manual's actual reasons are different and are the ones written: under the cash basis
   the money is still legally the tenant's until entitlement (PIM1094); under GAAP it is deferred and
   matched (PIM1052). The pack's gloss is not in the manual and was not used.
4. **"Deposit protection scheme deadlines and the adjudication process are unchanged."** Both are
   housing-law statements, neither is in the Property Income Manual and neither is locked in
   house_positions. Declined. The "what has not changed" block was built instead from the four
   verified tax non-changes (returned deposit is nothing; scheme money is still the tenant's; the tax
   point is still the end of the tenancy; the landlord is still the taxpayer) plus the locked Tenant
   Fees Act 2019 cap deferral.
5. **Any treatment of the landlord's own labour** on cleaning or making good funded by a retention.
   Not verified at the manual, not written.
6. **Any deposit sum, adjudication statistic or percentage.** None is locked and none was invented.
   The single pound figure on the page is the £150,000 cash-basis threshold from PIM1092, placed in
   the sentence about what the reader does.
7. **Agency-side client money.** Client money protection is defined in one sentence and scoped out in
   one sentence, per the pack's fixed constraint and the DOSSIER.md §1 owner ruling. No scheme
   comparison, no membership mechanics, no client-account handling, no compliance advice.

## 5. Differentiation boundaries against the adjacent pages

No existing page was edited (DOSSIER.md §3 blanket rule). All links are outbound only.

| Sibling | Boundary held on this page |
|---|---|
| `deposit-buy-to-let-2026-mortgage-requirements` | Mortgage deposits. Different meaning of the word. **Not linked and not mentioned**, to avoid confusing the two |
| `pet-rights-tenancy-landlord-refusal-reasonable-grounds` | Owns the Tenant Fees Act 2019 permitted-payment list and the deposit cap. This page states the cap is a regulatory rule, defers in one sentence and links. The cap arithmetic is not re-derived |
| `what-repairs-can-landlords-deduct-from-rental-income` | Owns repairs deductibility. This page covers only the interaction with a deposit retention, then links |
| `capital-vs-revenue-expenditure-landlord-uk` | Owns the capital/revenue split. Named in one clause, linked, not rebuilt |
| `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` | Commercial dilapidations and VAT. One contrast clause ("a different animal with their own VAT question"), then link. No analysis imported |
| `a-complete-guide-to-periodic-tenancy` | HARD FROZEN (armed to 2026-11-16). Linked once, never touched |
| `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` | FROZEN (armed to 2026-08-22). **Not linked from here**; page 5 in this cluster handles the relationship |

## 6. Register, self-measured on body prose only

Frontmatter (title, summary, metaDescription, `faqs:`) excluded, per `_language_spec.md` §1.

| Metric | Target (`_language_spec.md` §3, Explainer 5 row) | Measured |
|---|---|---|
| Words | 1,200 to 1,800 | **1,365** |
| Second person "you" per 1,000 | 12 or above | **13.2** (18 occurrences; 17.6 counting "your") |
| Citation-style references per 1,000 | 0 to 1 | **0.0** |
| Notice-name references per 1,000 | 5 to 10 | **5.1** (7: Renters' Rights Act 2025 x2, Tenant Fees Act 2019 x3, Housing Act 1988 x2) |
| Flesch reading ease | 45 or above | **69.1** |
| Mean sentence length | 18 words or below | **16.4** |
| Question headings | half or more of H2s | **5 of 7** |
| Tables | 1 maximum | **0** |
| FAQ | 5 or 6 | **6** |
| Em-dashes | zero | **0** (en-dashes also 0) |
| Pound figures | keep low, winner median 1 | **1** (£150,000, PIM1092) |
| First person "we / our / us" | not the register | **0** |

Scenario device used three times, per hard rule 9: the carpet retention, the six-months-up-front
request, and the three-year-old deposit sitting in the scheme. Close names the check-out report and
the deposit return statement, both of which the agency already produces. No service claim, no
pricing, no persona, no closing disclaimer, no shared CTA template with the rest of the batch.

## 7. QA fix round applied 2026-08-21

Factual verdict was **all_clear** (0 blockers, 3 advisories); QA re-derived all 14 register rows
independently and confirmed every one is supported by the paragraph cited. Applied since:

| Source | Change | New PIM position? |
|---|---|---|
| FACTUAL advisory 1 | The £800 carpet answer now carries "on the cash basis most landlords use", so the agreement-date trigger is not over-generalised across the cash/GAAP fork | No. Scopes register row 6 (PIM1094) to its own basis; row 3 (PIM1052) already carried the GAAP treatment |
| FACTUAL advisory 2 | FAQ 5 now reads "individuals or ordinary partnerships"; the body's "below that line" is now "at or below that line" | No. Tightens register row 13 to PIM1092's own exclusions (companies, LLPs, trustees, corporate firms) |
| FACTUAL advisory 3 | Added the `/for-letting-agents` hub backlink in the close, for cluster symmetry | No |
| FACTUAL coverage-note nit | Register row 1 and the correction paragraph now say PIM1051's deposits line routes within PIM1051 ("see final paragraph below"), not to PIM1058 | No |
| EDITORIAL 3.1 | The W8 lift "That is the short version. The detail matters because..." replaced with fresh phrasing | No |
| EDITORIAL adjudication 3 | H2 1 retitled from "The One-Line Answer" to "The Short Version" | No |
| EDITORIAL adjudication 5 | "What has not changed" lead-in varied off the batch template | No |
| EDITORIAL 3.6 | The "This page covers..." clause deleted from the `summary` frontmatter field | No |

**No tax position was added, widened or restated in this round.** Every change is a scoping clause,
a link or a phrasing swap, so the register in §3 stands unchanged at 14 rows.

**Second round, adjudicated by the coordinator and applied the same day:** EDITORIAL 3.3, all seven
H2s converted to sentence case to match the other five batch surfaces; 3.4, the three literal
"Answer:" markers dropped while keeping the question-then-answer scenario shape; 3.7, the
estate-standard `reviewedBy` / `reviewerCredentials` / `reviewedAt` block added, credentials written
in reader voice and specific to this page. **3.5 KEPT as written by adjudication: the pack constraint
wins.** The pack mandates one definitional CMP sentence plus one scope sentence and the page carries
exactly that, so changing it would need the pack amended rather than the page edited.

Neither round added a tax position. Measured after both rounds: 1,362 words, "you" 13.2 per 1,000,
Flesch 69.3, mean sentence 16.4, 5 of 7 question H2s, em-dashes 0.

## 8. Expected measured return

Approximately zero measured, by design, and stated before the work rather than after it. Success at
the 90-day read is any GSC impressions on deposit-tax-shaped queries or any Bing rows at all.
Page-level failure trigger: zero Bing rows **and** zero GSC impressions at the 90-day read means the
whitespace was whitespace, and no second page gets built in this topic on the same evidence.

Registration at deploy is standard `monitored_pages` inside the existing weekly detector. No new
monitor, cron, alert, digest or notification. Deploy is owner-triggered; nothing was deployed,
indexed or registered by this session.
