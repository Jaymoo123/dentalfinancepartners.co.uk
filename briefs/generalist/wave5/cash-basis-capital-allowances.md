---
slug: cash-basis-capital-allowances
tier: extension
category: "Sole Trader and Self Employment"
route: /blog/sole-trader-and-self-employment/sole-trader-capital-allowances
intent: EXTENSION, minimal. The pick's scope is already written inside a live page. Add the statutory anchors, the missing half of the s.33A excluded list, and an addressable anchor for the head term. Nothing more.
---
# Brief: EXTENSION of `sole-trader-capital-allowances.md` (SMALL, and deliberately so)

> **This is not a new page.** Do not create `generalist/web/content/blog/cash-basis-capital-allowances.md`. Edit the live file `generalist/web/content/blog/sole-trader-capital-allowances.md`, specifically its existing `<h2>Capital Allowances Under the Cash Basis</h2>` section. No em-dashes. Raw-HTML body. Faceless.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This phrasing is binding. It must appear naturally as the extended section's own H2 or H3 on the live page, in the words people typed. **You may not split it into another page.** Flag in the Q&A file if you disagree and keep writing.

```
cash basis capital allowances
```

## IS THERE A REAL DELTA? Yes, but a small one. The honest answer.

The cannibalisation verdict was **DEEPEN**, with the body checked rather than the frontmatter. That check was right. The live page already carries, in full and correctly:

- no capital allowances system under the cash basis, full cost deducted as a business expense when paid
- no pool, no WDA schedule, and the result described as equivalent to 100% AIA
- disposal proceeds brought in as a business receipt
- the cars exception, including actual-cost-with-depreciation or the mileage alternative
- the 55p / 25p AMAP rates for 2026/27, date-tagged
- the cash basis as the default, with a correct link to the comparison page
- three FAQs and a summary bullet already covering the same ground

**So the pick's scope is substantially already written, and this brief must not pretend otherwise.** Padding it into a full page or a 1,000-word extension would produce restated content and risk contradicting what is already there.

**Recommendation: keep it as a small extension, roughly 250 to 400 new words. Do not drop it, and do not publish a page.** The genuine delta is three things the live section does not have, and one of them matters:

1. **The statutory anchors are missing entirely.** The section asserts the treatment with no source. Add **CAA 2001 s.1A** (allowances switched off except for cars, with the carve-out at s.1A(4)) and **ITTOIA 2005 s.33A** (capital expenditure under the cash basis). This is the real value: the page currently states a correct rule the reader cannot check.
2. **The s.33A excluded list stops at cars.** The live text treats cars as the only exception. s.33A also excludes **land, buildings, non-depreciating assets, financial assets, non-qualifying intangibles, and expenditure on acquiring or disposing of a business or part of a business**. A sole trader buying a lease, a shop, or another trader's business will otherwise read the live page and deduct something that is not deductible. This is a genuine correction, not a decoration.
3. **The head term is not addressable.** "cash basis capital allowances" appears nowhere as a heading, so the section cannot rank for it. Rename or re-cut the H2 to carry the phrasing, and give the section an `id` anchor so it can be linked and monitored.

If the writer finds themselves adding anything beyond those three, they have drifted. Stop and hand back to the conductor.

## What NOT to touch

- **Do not touch the AIA, WDA, FYA or SBA content.** HP §8 governs it and it is already correct, including WDA 18% falling to 14% from 6 April 2026 and the FA 2026 s.28 and s.29 citations.
- **Do not touch the 55p / 25p AMAP figures or their date-tag.** They are correct per HP §12.
- **Do not restate the cash basis default, eligibility or thresholds here.** `cash-basis` (new this wave) and `cash-basis-vs-accruals-sole-trader.md` own that. One link each.
- **Do not add a second worked example.** The section does not need one.
- **Do not change the page slug, canonical, title, H1 or category.**
- **Do not edit the existing three cash-basis FAQs** unless the s.33A correction makes one of them wrong, in which case correct only that clause and leave the `faqs:` count unchanged.

## BOUNDARY TABLE (mandatory, one small table inside the extended section)

Columns: **"Cash basis: deducted as an expense when paid"** against **"Stays capital, no deduction (ITTOIA 2005 s.33A)"**. Four trade-anchored row pairs minimum:

| Cash basis: deducted as an expense when paid | Stays capital, no deduction (s.33A) |
|---|---|
| A mechanic's £2,800 diagnostic rig | The mechanic's car, which remains in capital allowances (CAA 2001 s.1A(4)) |
| A cafe's £1,400 espresso machine | The premises the cafe buys, and the land under them |
| A joiner's £950 of power tools | The joiner's purchase of a retiring competitor's business |
| A salon's £700 of styling stations | A financial asset, or a non-qualifying intangible such as a purchased licence |

This table is the clearest form the s.33A correction can take and is the main reason the extension is worth doing.

## Figures mapped to HP

| Figure | Source |
|---|---|
| Capital allowances switched off under the cash basis **except for cars** | Stage 1B B §1.5, **CAA 2001 s.1A** and s.1A(4) https://www.legislation.gov.uk/ukpga/2001/2/section/1A |
| The s.33A excluded list: business acquisition and disposal, **cars**, land, non-depreciating assets, financial assets, non-qualifying intangibles | Stage 1B B §1.5, **ITTOIA 2005 s.33A** https://www.legislation.gov.uk/ukpga/2005/5/section/33A |
| Never say "claim AIA on the cash basis"; say the cost is deducted as an expense when paid | Stage 1B B §1.5 writing rule |
| AIA £1,000,000, WDA 18% to 14% from 6 April 2026 (IT), special rate 6%, cars excluded from AIA and the FYAs | HP **§8**. Already on the page. Do not restate. |
| AMAP 55p first 10,000 miles then 25p, 2026/27 | HP **§12**. Already on the page. Do not restate. |

**Never cite BIM70010.**

## HP GAPS (do NOT invent, omit or link gov.uk)

1. **The cash-basis car depreciation method** currently described on the live page (original cost minus estimated residual value over the period of business use) was **not verified in Stage 1B B**. Leave the existing wording as it stands; do not harden it, do not add a worked calculation for it, and do not cite a source for it.
2. **Transitional rules on entering or leaving the cash basis with assets in a pool** (FA 2024 Sch 10 paras 48-50) were not read. Do not describe them.
3. **The s.33A(14) definition of a car** takes its meaning from CAA 2001 Part 2. Name that and stop; do not import the VAT one-tonne payload test, which is a different definition for a different tax.
4. No fee figures, no named experts.

## Internal links

**Add out:** `cash-basis` (new this wave, the hub), `cash-basis-allowable-expenses` (new this wave, where capital spend under the cash basis sits alongside the rest of the expense rules).
**Already present and correct, do not disturb:** the existing link to `cash-basis-vs-accruals-sole-trader`.

## Target total after extension

Live body is **approximately 4,100 words**. Target after extension: **4,350 to 4,500 body words**. The page is already at pillar depth, so the extension is a precision edit, not a growth exercise. FAQ count unchanged unless a correction forces it; if it changes, the frontmatter `faqs:` count must match.
