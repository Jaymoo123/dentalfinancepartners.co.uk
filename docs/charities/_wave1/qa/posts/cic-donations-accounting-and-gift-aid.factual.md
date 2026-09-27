# Track A factual QA: cic-donations-accounting-and-gift-aid

Date: 2026-09-27. Reviewer: Track A (Opus), adversarial.
Verdict: **PASS** (after 5 in-place edits). Final body word count: 1,200.

## Assertions graded

Tie-breaker order: `docs/charities/house_positions.md` (HP) first, primary law where silent.

| # | Assertion | Grade | Source |
|---|---|---|---|
| 1 | A CIC can lawfully receive donations but gets no Gift Aid and no charity rate relief | CORRECT | HP22 ("CICs get no charity tax reliefs (no Gift Aid on income, no charity rate relief)") |
| 2 | Gift Aid is worth 25p per £1, so £100 becomes £125 | CORRECT | HP14 |
| 3 | Higher rate donor recovers the difference between their rate and basic rate on the gross gift via Self Assessment | CORRECT | HP20 |
| 4 | ITA 2007 s.416 makes a gift a qualifying donation only where an individual makes a monetary payment to a charity, subject to conditions on repayment, deductibility and donor benefits | CORRECT | legislation.gov.uk ITA 2007 s.416, "Meaning of qualifying donation": gift to a charity by an individual, Conditions A to F plus EA (money payment, not repayable, not payroll giving, not otherwise deductible, not conditional on the charity acquiring property, not a social investment waiver, benefits within limits) |
| 5 | FA 2010 Sch 6 supplies the cross-tax definition: established for charitable purposes only, plus the jurisdiction, registration and management conditions | CORRECT | legislation.gov.uk FA 2010 Sch 6 para 1(1), paras 2 to 4 |
| 6 | "A CIC fails at the first hurdle **and the third** ... it is registered at Companies House ... rather than on the register of charities" | **WRONG, fixed** | Sch 6 para 3 registration condition only bites on a body that is *required* to register under Charities Act 2011 s.29. A CIC carries no such requirement, so it does not fail para 3. The failure is para 1(1)(a) alone, and it is statutory: Companies (Audit, Investigations and Community Enterprise) Act 2004 s.26(3), a CIC established for charitable purposes "is to be treated as not being so established", is not an English or Northern Ireland charity, and must not be entered in the Scottish Charity Register |
| 7 | keyTakeaway: Sch 6 "requires charitable purposes only **and registration as a charity**" | **WRONG, fixed** | Same as #6. Sch 6 has no positive requirement to be on the register of charities |
| 8 | FAQ 2: "it is not on the register of charities. It fails the definition as a matter of law" | **WRONG (reasoning), fixed** | Same as #6. Non-registration is a consequence, not the definitional ground |
| 9 | CTA 2010 s.189 allows qualifying charitable donations as a deduction from total profits | CORRECT | legislation.gov.uk CTA 2010 s.189(1). Note the s.189(3) cap (deduction limited to the amount that reduces taxable total profits to nil) is not stated in the post; not required, and not misleading by omission |
| 10 | CTA 2010 s.190 defines qualifying charitable donations as "the qualifying payments to charity in Chapter 2" | **STALE / incomplete, fixed** | s.190 covers Chapter 2 qualifying payments **and** Chapter 3 amounts (certain disposals of investments to charity). Body now names both; a payment to a CIC is outside both |
| 11 | A company donating to a CIC gets no s.189 deduction | CORRECT | Follows from #5, #6, #9, #10 |
| 12 | Sponsorship or advertising is consideration for a supply: deductible to the payer on trading principles, and a taxable supply for VAT in the CIC's hands | CORRECT | Ordinary VATA/trading principles; consistent with HP22 framing. No rate or threshold figure asserted |
| 13 | Charitable rate relief "of up to 80% off the rates bill" | CORRECT | HP21 ("up to 80% off", discretionary top-up). Post does not claim the discretionary top-up as automatic |
| 14 | A CIC has no charity law concept of restricted funds, so a project restriction binds contractually | CORRECT | HP22, HP27 (a CIC is not a charity, so charity law fund concepts do not apply). No SORP claim made |
| 15 | Every CIC files a community interest report with its accounts, which must account for how assets and profits were applied | CORRECT | HP24; `charity-types.ts` CIC page carries the same position |
| 16 | No CIC34 filing fee figure stated | CORRECT (correctly omitted) | HP24 FLAG: fee amount unverified, must not be stated on site. The post says only that a filing fee applies elsewhere in the estate; this post states no fee at all |
| 17 | Conversion to a charity or CIO opens Gift Aid and rate relief, must respect the asset lock, brings registration, trustee duties and fixed objects | CORRECT | HP19, HP21, HP23, HP25 |
| 18 | No pricing, no named people, no "chartered"/"ICAEW"/"we advise" | CORRECT | Body uses "a specialist review", permitted phrasing |

## Edits made (5)

1. keyTakeaway 2 rewritten: removed the false "requires ... registration as a charity"; now cites the CAICE Act 2004 s.26(3) treatment.
2. FAQ 2 answer: replaced the register-of-charities reasoning with the s.26(3) statutory bar.
3. Body, "Why does the Gift Aid claim fail?" paragraph 2: replaced "fails at the first hurdle and the third" with the single statutory failure, added a legislation.gov.uk link to CAICE Act 2004 s.26(3), and corrected "registered at Companies House with the Regulator ... rather than on the register of charities" to "regulated at Companies House by the Regulator ... not by the Charity Commission".
4. Body, donor paragraph: s.190 now names Chapter 2 payments **and** Chapter 3 disposals.
5. Two short trims (one in the s.26(3) sentence, one in "Is a donation to a CIC taxable income?") to hold the body at 1,200 words after edit 3 pushed it to 1,207.

## Figures removed

None. No unsourced figure was present. Every number in the post (25p per £1, £100/£125, 80%) traces to a house position.

## Internal links: all 5 verified on disk

| Link | Target | Status |
|---|---|---|
| `/blog/gift-aid/business-donations-to-charity-tax` | `charities/web/content/blog/business-donations-to-charity-tax.md`, category "Gift Aid" | OK, category slugifies to `gift-aid` |
| `/blog/cics-and-social-enterprises/cic-funding-and-grants` | `charities/web/content/blog/cic-funding-and-grants.md`, category "CICs and Social Enterprises" | OK |
| `/calculators/gift-aid-calculator` | `charities/web/src/lib/calculators/tools/gift-aid-calculator.ts` | OK |
| `/blog/cics-and-social-enterprises/cic-vs-charity` | `charities/web/content/blog/cic-vs-charity.md`, category "CICs and Social Enterprises" | OK |
| `/for/cics` | `charities/web/src/data/charity-types.ts`, slug "cics"; route `charities/web/src/app/for/[slug]` | OK |

Count is exactly 5, at the cap. Track B must not add a sixth.

External links (2 legislation.gov.uk, 1 gov.uk, 1 new legislation.gov.uk) are all allowed domains.

## Frontmatter

YAML re-validated after every edit and after the last. All required keys present. `date`, `dateModified` and `updatedDate` all "2026-09-27". `category` "CICs and Social Enterprises" is verbatim from the brief list and slugifies to the canonical path. metaTitle 53 chars (cap 60), metaDescription 152 chars (cap 155), summary 52 words (40 to 60), 6 FAQs (4 to 6), 5 keyTakeaways (3 to 5). Author and canonical per the charities brief. No em-dashes anywhere in the file.

## Notes for Track B

- Do not soften the s.26(3) sentence into "a CIC is not on the charity register". That was the defect Track A fixed; non-registration is the consequence, not the reason.
- Body is at exactly 1,200 words, the top of the range. Any addition needs a matching cut.
- Internal links are at the cap of 5.
- Overlap risk to check: `charity-types.ts` (the `/for/cics` page) carries near-identical sentences on conversion ("Charitable status opens Gift Aid and rate relief ... a CIC earning mainly contract income can gain less than the extra reporting costs") and on funder money ("income recognised in the wrong period distorts the result and the tax computation together"). Two passages in this post are close paraphrases of that page. Sibling `_wave1` posts do not overlap; the closest published blog neighbours are `cic-vs-charity` and `cic-funding-and-grants`.
- "an arrangement that needs genuine independence between the two bodies rather than a shared letterhead" reads as an editorial flourish; factually sound, Track B's call.

## Nothing for the manager to fix elsewhere

No house position needed changing. HP22 and HP24 both held. One improvement worth the manager's note rather than an edit: `house_positions.md` position 22 states the outcome ("a CIC is not a charity") but carries no primary-law anchor. CAICE Act 2004 s.26(3) is that anchor and could be added to the position.
