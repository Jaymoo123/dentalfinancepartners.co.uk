# Coverage note: `claim-home-office-deduction-landlords` (FULL REWRITE, factual correction)

Rewritten 2026-08-21 by the Opus writer. **This page is OUTSIDE the rental cluster ledger.**
It is not one of the E/N picks in `briefs/property/rental/ledger.csv`, has no keyword pack in
`packs/`, and was never scoped in `_scope_pages.json`. It rides with the rental batch because
the batch's QA pass (`qa/FACTUAL_rentalbatch.md`, §34.2 adjudication and its out-of-scope
escalation) is what proved the live page wrong. Treat it as a factual-correction rewrite
travelling with the batch, not as a cluster deliverable.

Category "Landlord Tax Essentials", canonical
`https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/claim-home-office-deduction-landlords`.
Slug, canonical, category, `date`, image and imageCredit unchanged. Everything else reframed.
Body 2,975 words (voice_scan count). 9 H2 / 4 H3 / 12 FAQs / 2 tables.

---

## 1. Why the rewrite, and what was wrong

The 2026-05-27 version was built end to end on ITTOIA 2005 s.94H as a live route for a
property business. It is not one. 33 occurrences of s.94H or "flat rate" across the file,
including `metaDescription`, `summary`, FAQ 1, a whole H2 ("How to Claim the Simplified
Flat-Rate (ITTOIA 2005 s.94H)"), and six FAQs servicing a route a landlord cannot take.

The consumer-harm limb was the CGT FAQ, which offered the flat rate as the **first** escape
from the TCGA 1992 s.224(1) PPR restriction. A reader following it would have claimed a
deduction they were not entitled to **and** believed they had neutralised a capital gains
exposure they had not.

`docs/property/house_positions.md` §34 was corrected on 2026-08-21 ahead of this rewrite
(the QA note's explicit sequencing instruction: correct the lock first, or the page gets
rewritten against a wrong lock again). This page is written against the corrected §34/§34.2/§34.4.

No equity to protect: `_homeoffice_page_queries.json` (pulled 2026-08-21) shows **1 Google
impression, 0 clicks, 0 Bing** over 90 days. Hence full reframe permission on metaTitle, h1,
title, summary, altText and every H2.

---

## 2. Source checks (all performed live at write time, 2026-08-21)

| # | URL | What it confirmed |
|---|---|---|
| S1 | `https://www.legislation.gov.uk/ukpga/2005/5/section/94H` | Heading "Use of home for business purposes", **Part 2, Chapter 5A**. Subsection (1) verbatim: *"This section applies if, in calculating the profits of **a trade** of a person for a period, a deduction ('the standard deduction') would otherwise be allowable for the period in respect of (a) the use of the person's home for the purposes of the trade..."*. Table verbatim: 25 or more hours **£10.00**, 51 or more **£18.00**, 101 or more **£26.00**; hours are those "spent wholly and exclusively on qualifying work" |
| S2 | `https://www.legislation.gov.uk/ukpga/2005/5/section/272` | s.272(2) opening verbatim: *"In relation to a property business whose profits are calculated in accordance with GAAP, the provisions of Part 2 (trading income) which apply as a result of section 271E(1) are limited to the following"*. The **only** Chapter 5A rows are **s.94C** (corporate-partner exclusion) and **"sections 94D to 94G: expenditure on vehicles"**. **s.94H appears nowhere in the section.** s.272(1) omitted by F(No.2)A 2017 |
| S3 | `https://www.legislation.gov.uk/ukpga/2005/5/section/272ZA` | Cash-basis import table. Chapter 5A rows identical to S2: s.94C and "sections 94D to 94G: expenditure on vehicles". **s.94H absent.** Confirms the omission is not a GAAP/cash-basis artefact |
| S4 | `https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2100` | **PIM2100, last updated 21 May 2026.** The landlord-specific page for a landlord's own home. Verbatim quotes used on the page: *"Where a landlord genuinely runs the property business from home they may claim the extra business costs that they incur - such as the cost of extra lighting and heating"*; for a room set aside, *"a proportion of all fixed expenses referable to that room may be deducted"* with examples *"rent they pay to their own landlord for their home, repairs, property insurance - as well as lighting and heating"*; and the method standard *"It is impossible to lay down hard and fast rules because circumstances vary enormously. The aim is for the property business deductions to reflect the commercial use of the property in a fair and reasonable way."* **No flat rate or simplified-expenses scheme appears anywhere on the page.** Also confirms the home-loan-interest split provision is aimed at homes **partly let**, not at home offices (cross-ref PIM2050) |
| S5 | `https://www.gov.uk/simpler-income-tax-simplified-expenses` | Eligibility verbatim: *"Simplified expenses can be used by: sole traders, business partnerships that have no companies as partners"*, and *"cannot be used by limited companies or business partnerships involving a limited company"*. **Landlords and property businesses are not mentioned anywhere in the eligibility wording** |
| S6 | `https://www.legislation.gov.uk/ukpga/1992/12/section/224` | s.224(1): where part of a dwelling-house is used exclusively for the purpose of a trade or business, *"the gain shall be apportioned and sections 223 and 223B shall apply in relation to the part of the gain apportioned to the part which is not exclusively used for those purposes"* |
| S7 | `https://www.gov.uk/capital-gains-tax/rates` | Tax year stated **2026 to 2027**. Rates from 6 April 2026: **18%** within the basic-rate band, **24%** above it and for higher-rate taxpayers. **Annual exempt amount £3,000** for 2026/27 |
| S8 | `https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim01476` | **EIM01476, last updated 12 August 2026.** Verbatim: **"£6 per week or £26 per month for monthly paid employees"** from 6 April 2020 (previously £4 / £18, 2012-2020). Payable *"without the employer having to justify the amount paid"* and *"the employee does not have to keep any records to demonstrate the additional expenditure"*. Above the guideline rate, evidence of actual costs is required |

Repo ground truth cross-checked, not re-derived: `docs/property/house_positions.md` §34
(as corrected 2026-08-21), §34.2 (single route = s.34 actual-cost apportionment per PIM2100;
do-not-write = any flat-rate home-office claim for an unincorporated property business),
§34.3 (cross-tax discipline), §34.4 (Ltd Co route). `briefs/property/rental/qa/FACTUAL_rentalbatch.md`
§34.2 adjudication (four independent primary checks, matching S1-S5 above) and its out-of-scope
escalation. Sibling page `landlord-tax-deductions-uk-2026-complete-list` on disk already states
the corrected position, so the two pages now agree; no back-patch needed there.

---

## 3. Derivations (nothing below is quoted; each is arithmetic on the inputs shown)

Helen's household bills, 2026/27, illustrative for a four-bedroom house and labelled as such
under the table: electricity £960 + gas £840 + water £420 + broadband £336 + home insurance
£288 + council tax £2,196 = **£5,040**.

| Claim on page | Derivation |
|---|---|
| Business fraction **4.08%** | 1 room of 7 = 14.2857%; 10 hours of 35 = 28.5714%; product = 10/245 = 4.0816% |
| Deduction **£205.71** | £5,040 x 10/245 = £205.7142 |
| Worth **£82.29** at 40%, **£41.14** at 20% | £205.7142 x 0.4 = £82.2857; x 0.2 = £41.1428 |
| Flat rate would have been **£120**, i.e. **£85.71 less** | 10 hrs/wk ~ 43 hrs/month = the "25 or more" band, £10/month x 12 (S1). £205.71 - £120 = £85.71. Stated as a counterfactual the reader is told they cannot use |
| Tenant variant **£793.47** | (£5,040 + £14,400 rent) x 10/245 = £19,440 x 4.0816% = £793.469 |
| Exclusive-room claim **£720** | £5,040 / 7 (time fraction dropped, per PIM2100's proportion-of-fixed-expenses limb, S4) |
| Extra deduction **£514.29**, worth **£205.71** a year at 40%, **£2,057** over ten years | £720 - £205.71 = £514.29; x 0.4 = £205.714; x 10 = £2,057.14 |
| CGT: gain **£270,000** | £565,000 - £295,000 |
| Restricted fraction **1/14 (7.14%)** | 1 room of 7 x 10 years of 20 |
| Chargeable **£19,285.71**, taxable **£16,285.71**, CGT **£3,908.57** | £270,000/14 = £19,285.71; less £3,000 AEA (S7) = £16,285.71; x 24% (S7) = £3,908.57 |
| Net position **£1,851 down** | £2,057.14 saved - £3,908.57 paid = -£1,851.43 |
| With AEA already used: CGT **£4,628.57**, **£2,571 down** | £19,285.71 x 24% = £4,628.57; less £2,057.14 = -£2,571.43 |
| Ltd Co: company saves **£450** at 25% or **£342** at 19% on £1,800 rent | £1,800 x 0.25 / x 0.19 |
| Director pays **£432** at 40% or **£216** at 20% | (£1,800 - £720) x 0.4 / x 0.2 |
| Net **£18** a year (25%/40%), **£126** (19%/20%) | £450 - £432 = £18; £342 - £216 = £126 |
| £312 a year | £6 x 52 (S8) |
| 55p / 25p mileage | Held ground truth (`amap_mileage_55p_2026_ground_truth`), used only as the illustration of what s.272 **does** import (S2) |

---

## 4. Judgement calls recorded

1. **Statute discipline: 4 provisions named, plus PIM2100 and EIM01476 as guidance codes.**
   Body prose names **ITTOIA 2005 s.94H** (the trap), **section 272** (the import table, which
   is the proof), **ITTOIA 2005 s.34** (the gateway test) and **TCGA 1992 s.224(1)** (the CGT
   restriction). Each is a decision aid inside a sentence about what to do. s.272ZA was
   verified (S3) and deliberately **not named**, written as "the cash basis version of the same
   table reads identically", to hold the count at four. Statute-plus-manual
   density is **7 references in body prose, 2.4 per 1,000 words**, against the cluster cap of 4
   and the winner max of 3.9 (`_language_spec.md` rules 1-3); counting the external-sources link
   list at the foot of the page as well it is 12, or 4.0 per 1,000, still at the cap. s.224(1) originally appeared four times in the body and was
   cut to one plus the FAQs. No Royal Assent, no enactment dates, no amendment chains.
2. **ITEPA ss.316A-317 and CTA 2009 s.54 deliberately not cited.** §34.4 holds them, and they
   are the correct authorities, but neither changes a reader's decision: the director route is
   fully expressible as "your company can pay you £6 a week tax free" and "the company deducts
   the rent, you declare it". Citing them would have pushed statute to 6 provisions for no
   reader benefit. The mechanics per §34.4 are all present.
3. **The FA 2026 s.21 / new ITEPA s.360B claim on the old page was dropped, not carried.**
   The old version asserted that Finance Act 2026 s.21 removes the employee's own deduction for
   additional household costs. Nothing in `house_positions.md` or the briefs holds it (grep for
   "360B" across `docs/property` and `briefs/property` returns nothing), and it is not needed
   for any decision on this page, since the employer-paid route in S8 is unaffected either way.
   Unverified inherited claim, so it is gone rather than repeated.
4. **PIM2100's two limbs are presented as two limbs, and the condition on the second one is the
   page's whole argument.** HMRC offers the proportion-of-fixed-expenses claim for a room "set
   aside" for the business. That is the same characterisation that s.224(1) punishes. Rather
   than hide the tension, the page states it and prices it: the bigger claim is available, it
   is worth £514.29 a year more, and on the worked facts it loses £1,851 net. This is stronger
   than the old page's framing and it is the honest reading of S4 and S6 together.
5. **Council tax kept in the apportionment pot despite not being in PIM2100's example list.**
   S4's list ("rent... repairs, property insurance... lighting and heating") is expressly
   illustrative and sits under a "fair and reasonable" standard with no prescribed formula.
   Council tax is a fixed household cost of exactly the kind the limb describes. Recorded as a
   call rather than a quote: the page does not attribute the council tax line to HMRC.
6. **Home mortgage interest excluded, correcting a second error on the old page.** The old
   version listed "mortgage interest where part is business-attributable" as an apportionable
   home-office cost. S4 shows the PIM interest-splitting provision is aimed at a home partly
   **let**, not at a home office, and for an individual landlord residential finance costs are a
   20% reducer in any case. The page and FAQ 5 now say so.
7. **Correction-of-record angle placed at H3 rather than as its own H2.** The brief called for a
   LAFRA-style correction. The page opens by admitting its own May 2026 version repeated the
   error (one sentence, no self-flagellation), makes the correction the first H2, and puts the
   "where the £6 and the £26 actually come from" disambiguation in an H3 underneath it. The
   £26 collision between S1's top band and S8's monthly-paid equivalent is named explicitly,
   because that collision is the most likely origin of the error in the wider corpus.
8. **Garden office H3 added late to reach the word band and because it is the sharpest version
   of the trap.** A purpose-built garden room is the structure most likely to be genuinely
   exclusive. The build cost is stated as capital and non-deductible; running costs apportion
   normally; business rates and insurance flagged in one line. No capital allowances claim is
   made either way, which avoids the dwelling-related plant and machinery restriction entirely.
9. **Second person carries every figure** (`_language_spec.md` rule 10). Helen is confined to her
   own two worked-example blocks. No banned persona used: none of Priya, Yusuf, Tom, Marcus,
   Bev, Dele, Idris, Nadia, Sunita, Bola, Renata, Callum, Fergal, Dermot, Farah, Lars, Rafiq,
   Orla appears in the file (checked by regex).
10. **No closing hedge, no qualifier bullets, no `<aside>` blocks** (rules 12-13). The three
    `<aside>` CTA boxes on the old page are gone. The single CTA is a question H2, names one
    service (landlord tax review) and prices both failure modes. The old page's closing
    "verify against the current gov.uk guidance" hedge is gone.
11. **Both tables carry a tax-year label in the heading and a source line underneath** (rule 6).
    The bills table is labelled illustrative in its source line so no reader mistakes the
    household figures for published data.
12. **`date` left at 2026-05-27 per instruction; `dateModified` and `reviewedAt` set to
    2026-08-21.** `generator` added as `opus/netnew-rental-cluster`. `editorialNote` rewritten
    to record what was wrong, what proved it, and the statute budget.

---

## 5. Verification run (2026-08-21)

- `python scripts/voice_scan.py --site property --slug claim-home-office-deduction-landlords`
  -> **robot_score 9.6, band CLEAN**. S1 10 abstract-noun hits (2.43/1k, all of them either
  quoting HMRC's own "a landlord" wording or the phrase "individual landlord" used as a term of
  art), S2 0 meta-commentary, S3 0, S4 **0 em-dashes**, S5 0 signposting, S7 **0 americanisms**.
  S6 reports 2,975 body words against a 2,200 non-pillar ideal (+35%), which is inside the
  brief's mandated 2,800-3,300 range, so it is left as-is.
  (First pass scored 18.6 MINOR: one meta-commentary hit in `summary` ("This page covers...")
  and 12 abstract-noun hits. Both reduced; the summary now reads "Below: ...".)
- `python scripts/frontmatter_lint.py --check --site property` -> **764 file(s) valid**.
- Em-dashes across the whole file including frontmatter: **0**. En-dashes: **0**.
- `metaTitle` **53** chars (limit 60). `metaDescription` **153** chars (limit 155).
- 12 FAQs (brief range 10-14). Every answer is **25 words or more** and **contains a figure**
  (checked by script). Each answers independently without relying on the body.
- 9 H2s, every one either asks the reader's question or states the answer with its number in it
  (rule 9). Zero bare noun-label H2s.
- All arithmetic re-derived independently in Python after writing; one figure corrected
  (£82.28 -> £82.29, being 40% of £205.7142).
- 6 internal `/blog/<category>/<slug>` links, **all resolve on disk and all category segments
  match the target file's own canonical**: `capital-gains-tax-property-complete-guide-uk`
  (capital-gains-tax); `2027-tax-rates-incorporation-decision-property-landlords`
  (incorporation-and-company-structures); `sa105-property-income-form-2026-complete-guide`
  (landlord-tax-essentials); `mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence`
  (making-tax-digital-mtd); `landlord-tax-deductions-uk-2026-complete-list` and
  `rental-income-tax-uk-complete-guide-landlords` (section-24-and-tax-relief).
- 7 external links, all `rel="nofollow noopener" target="_blank"`, all gov.uk or
  legislation.gov.uk, all corresponding to S1-S8 above.
- No PropertyTaxPartners pricing on page.
- NOT committed, per instruction.
