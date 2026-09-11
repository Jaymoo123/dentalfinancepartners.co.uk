---
slug: retail-vat-schemes-uk
tier: blog
category: "VAT and Making Tax Digital"
route: /blog/vat-and-making-tax-digital/retail-vat-schemes-uk
intent: EXTENSION of a live page, not a new page. Widen an already-complete retail schemes page so it also owns the bare head term "retail scheme", and lift it to pillar depth. No new URL.
---
# Extension brief: `retail-vat-schemes-uk.md`, so it also owns "retail scheme"

> **THIS IS NOT A NEW PAGE. Do not create a file. Do not create a slug `retail-scheme`.** The pick `retail-scheme` was resolved to `decision: "extend"` at Stage 1b, target `generalist/web/content/blog/retail-vat-schemes-uk.md`. The live page is more complete than the pick and publishing a competitor to it would put two of our URLs into one result set. Edit the live file in place. Raw-HTML body, no em-dashes, faceless.

## Target queries (REQUIRED PHRASINGS, NOT SUGGESTIONS)

This is binding. The phrasing must appear naturally in the live page after the extension, in a heading, in body prose or in an FAQ question, in the words people typed. **It may not be split out into another page, and this brief exists precisely because someone proposed exactly that.**

- retail scheme

Head query: "retail scheme". Volume 150/mo. Mechanic: `stock-and-wip`. The live page currently uses the plural, qualified phrasing ("retail VAT schemes") throughout and never the bare singular term. That is the whole gap.

## Asset type + play

Narrow, surgical widening. The live page already runs point of sale, apportionment and direct calculation over one shop's identical quarter and gives three different VAT bills, which is better than anything the pick would have produced. The only things it lacks are the bare head term, the statutory hook, one disambiguation, and FAQ depth.

**Target total after extension: 4,000 to 4,300 body words** (currently 3,185; pillar range is 3,500 to 4,500, so add roughly 850 to 1,100 words). Do not pad to reach it. If the additions below come in at 850, stop there.

## Dedup evidence

- **The page being extended is itself the dedup evidence.** Stage 1b verdict: DEEPEN. `generalist/web/content/blog/retail-vat-schemes-uk.md` already owns point of sale, apportionment, direct calculation, the £1m and £130m gates, the daily gross takings record, the EPOS-as-accounting-record angle and the not-the-flat-rate-scheme distinction.
- **`vat-retail-export-scheme.md` (new this wave)**: similar name, unrelated subject. The extension adds the one-sentence disambiguation and a link. Bidirectional.
- **`flat-rate-vat-vs-standard-vat.md` and `vat-flat-rate-scheme-explained.md`**: the live page already fences against these in its "not the flat rate scheme" H2. Do not duplicate that fence.

## What to ADD (and only this)

1. **Own the bare term.** Add an early H2 headed **"What is a retail scheme?"**, placed immediately after the existing opening H2 "The three schemes as a live choice". Roughly 200 words. Define the bare term: a retail scheme is a permitted method of working out how much output VAT sits inside gross takings when a business cannot issue a VAT invoice for every sale. Say who needs one (a shop selling at more than one rate, over the counter, to customers who do not want invoices) and who does not (a business that invoices every sale). The phrase "retail scheme", singular and unqualified, must appear in the H2 and at least twice in the prose of that section.

2. **Add the statutory hook the page currently lacks.** One or two sentences inside the new section: retail schemes sit in the **Value Added Tax Regulations 1995 (S.I. 1995/2518), regulations 66 to 75**, as set out in **VAT Notice 727**. The live page cites Notice 727 but never the regulations. Cite **regulations 66 to 75** specifically, not "Part IX".

3. **Add a short disambiguation section**, roughly 150 words, headed to make the confusion explicit: a retail scheme under Notice 727 is **not** the VAT Retail Export Scheme. One is a method of computing your own output VAT; the other was a visitor refund scheme, **withdrawn in Great Britain on 1 January 2021 and surviving only in Northern Ireland**. Link `vat-retail-export-scheme.md`. This is a new sibling page and the link is bidirectional.

4. **Add a boundary table.** The live page has no boundary table and the page anatomy requires one. Place it inside or directly after the new "What is a retail scheme?" section. **Two columns: "You need a retail scheme" against "You do not need a retail scheme".** Minimum four trade-anchored row pairs:

| You need a retail scheme | You do not need a retail scheme |
|---|---|
| A village shop selling zero-rated groceries and standard-rated confectionery over one till | A wholesaler invoicing every trade customer at a stated rate |
| A newsagent selling zero-rated newspapers alongside standard-rated drinks and tobacco | A plumber invoicing each job individually |
| A garden centre selling standard-rated plants and pots alongside zero-rated seeds and food | A B2B printer raising an invoice per order |
| A pharmacy mixing zero-rated dispensed drugs with standard-rated retail lines | A single-rate takeaway where every sale is standard-rated |
| A pet shop selling standard-rated pet food alongside zero-rated animal feed lines | A business below the £90,000 threshold and not registered |

Put a sentence under it: a retail scheme is needed because of **mixed rates plus untraceable individual sales**. One without the other does not require one.

5. **Take the FAQ block from 6 to between 10 and 14.** The live `faqs:` frontmatter has exactly 6 entries and the count must match what the page presents, so update both together. Add, phrased as typed: *What is a retail scheme? · Do I have to use a retail scheme? · Which retail scheme is best for a small shop? · Can I change retail scheme? (the live page has a "joining, changing and leaving" H2 to draw on) · Is a retail scheme the same as the VAT Retail Export Scheme? · Is a retail scheme the same as the flat rate scheme? · What turnover can I use a retail scheme up to? · Do I need HMRC's permission to use a retail scheme?*

6. **Date-tag the limits at write time.** The live page carries "limits confirmed against the notice on 25 August 2026" in two places. Re-check against Notice 727 and update the date, or leave the existing date if not re-checked. **Do not change a limit figure.**

## What NOT to touch

- **Do not change the slug, the canonical URL, the route, the title, the H1, the image or the imageCredit block.** The page is live and indexed.
- **Do not rewrite the worked quarter.** The three answers (point of sale £7,000, apportionment £7,142.86, direct calculation £7,250) are the page's best asset and are internally consistent. Leave every figure alone.
- **Do not touch the six existing FAQ answers.** Add new entries only.
- **Do not touch the existing keyTakeaways**, except to add at most one line for the new bare-term section if the extension genuinely warrants it.
- **Do not restructure the existing 14 H2s or reorder them.** The additions slot in; nothing moves.
- **Do not "correct" the Point of Sale limit.** The live page already says point of sale is available up to £130 million, which is right. **And do not treat `house_positions.md` §21.4's wording, "no turnover cap below the bespoke line", as an error: it is CORRECT and means there is no £1 million cap, point of sale being usable up to the £130 million bespoke line.** Do not edit `house_positions.md` and do not raise it as a defect.
- **Do not add stock valuation content.** The pick carries the `stock-and-wip` mechanic label, which is a loose research label. The live page already has a "Stock, and what a retail scheme does not do" H2 and that is the correct depth. HP 21.8 stock material belongs elsewhere.

## Figures mapped to HP

Everything the extension adds traces to a locked anchor. Nothing new is introduced.

- **Retail schemes sit in the VAT Regulations 1995 (S.I. 1995/2518) regulations 66 to 75, as set out in Notice 727** - `STAGE_1B_HP_LOCK_DRAFTS_A.md` Anchor 6, LOCKED. **Narrow to regulations 66 to 75; do not cite "Part IX".**
- **Point of Sale £130 million; Apportionment 1 £1 million; Apportionment 2 £130 million; Direct Calculation 1 £1 million; Direct Calculation 2 £130 million; bespoke mandatory above £130 million. All tax-exclusive retail turnover** - Anchor 6, LOCKED (Notice 727 paras 3.2, 3.5.1, 3.6.1, 3.7.1, 3.8) and HP 21.4.
- **What each scheme does mechanically** (point of sale identifies the rate at the till; apportionment splits takings by the VAT-inclusive value of purchases at each rate; direct calculation marks the minority-rate goods up to expected selling prices) - Anchor 6 and HP 21.4, LOCKED.
- **VAT RES withdrawn in Great Britain 1 January 2021, surviving only in Northern Ireland** - Anchor 6, LOCKED. One sentence only, for the disambiguation.
- **£90,000 registration, £88,000 deregistration, 20% standard, 5% reduced, MTD for VAT since April 2022** - HP 7. All already on the live page.

**HP GAPS (do NOT invent, omit or link gov.uk):**
1. **No locked position on HMRC permission, notification or the mechanics of switching schemes mid-year.** The live page has a "joining, changing and leaving" H2; the new FAQ on changing schemes must not go beyond what that section already says. **Do not add a notification period, a minimum usage period or a permission requirement.** If the FAQ cannot be answered from existing page content, link Notice 727 and stop.
2. **Bespoke scheme negotiation with HMRC is not locked** beyond "mandatory above £130 million". Do not describe the process.
3. **The Notice 727 daily gross takings retention detail** is already on the live page. Do not add to it or restate a retention period not already there.
4. **No locked position on retail schemes interacting with the margin scheme, second-hand goods, or catering adjustments.** Omit all three.
5. **Excise fence, permanent (HP 21.9.7 and the shared rules).** The newsagent and village shop examples sit near tobacco and alcohol. **Do not state any alcohol duty rate, duty stamp rule, Small Producer Relief or draught relief position.** One neutral sentence plus a gov.uk link is the ceiling, with no rate or threshold. Keep the rows on VAT rates only.

## Internal links to add (all VERIFIED to exist in `generalist/web/content/blog/`)

**Add out:** `vat-retail-export-scheme.md` (new this wave, the disambiguation), `zero-rated-vat.md` (the rate boundary the mixed-rate shop is splitting on), `vat-exemption.md` (one sentence: a shop with exempt sales as well as mixed rates is into partial exemption, which a retail scheme does not solve).
**Already on the page, leave alone:** the existing flat rate and cash accounting cross-references.
**In:** `vat-retail-export-scheme.md` links back here.

## Hallucination danger zones

- Never create a new page or a `retail-scheme` slug.
- Never change a worked figure in the live quarter.
- Never change the Point of Sale limit, and never flag HP 21.4's wording as wrong.
- Never cite "VAT Regulations 1995 Part IX"; cite regulations 66 to 75.
- Never let the FAQ count and the `faqs:` frontmatter count diverge.
- Never add an excise rate or threshold.
- No fee figures.
