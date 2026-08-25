# Language spec — care_education cluster (one spec, all 6 packs inherit it)

Written 2026-08-25 per `REWRITE_PROGRAM.md` §9.11, from the ranking specialist pages actually
fetched for the pack teardowns. No paid calls: every measurement below comes from a real fetch on
2026-08-25, and the two pages that would not serve are named as unfetched rather than guessed at.

## 0. The measured sample (10 pages, 8 fetched, 2 refused)

| Page | Ranks for (D1) | Words | Fetch |
|---|---|---|---|
| `caservices.org.uk/` (homepage) | **p1** `accountants for childminders`, **p2** `childminding accountant` | **625** | OK |
| `caservices.org.uk/what-expenses-can-i-claim` | **p8** on all four childminder-expenses phrasings, p13 `childminder expenses list` | 1,226 | OK |
| `caservices.org.uk` blog, "HMRC confirmation: Childminder 10% wear and tear and MTD ITSA" (13 Jan 2026) | content layer, not a ranked row | 653 | OK |
| `swan-books.co.uk/accountants-for-childminders/` | p5 `childminding accountant`, p6 `accountants for childminders` | 1,847 | OK |
| `vanillaonlineaccountancy.co.uk/accountants-for-childminders/` | p8 on both childminder heads | **313** | OK |
| `wearegolding.com/daycare-nursery-accountants/` | p17 `nursery accounts`, p73 `childminding accountant` | 1,611 | OK |
| `tax-wise.co.uk/online-accountants-foster-carers/` | p104 `qualifying care relief 2024-25` | 1,040 | OK |
| `accountaxzone.com/qualifying-care-relief-scheme-uk/` | **p8** `qualifying care relief 2025/26` | ~3,200 | Refused a direct fetch (403 bot wall); fetched through the rendering fetcher instead. Headings, figures and word count are real, the raw HTML was not held |
| `accountaxzone.com/hmrc-self-assessment-tax-return-for-foster-carer/` | p21-p41 across 8 foster return rows | ~3,200 | Same 403, same workaround |
| `octopusfostering.co.uk/` | p41 `foster accountants` (170/mo, the family's biggest head) | not measured | **WOULD NOT FETCH.** HTTP 500, a WordPress error page, on 2026-08-25. Recorded as unfetched. No claim in this spec rests on it |

## 1. Measured answer patterns (what the winners actually do)

- **Length is not the lever, and this cluster proves it harder than any before it.** The p1 page in
  the childminder set is **625 words**. A 313-word page holds p8. A 1,847-word page with a full
  sell funnel holds p5-p6. A 1,611-word nursery page holds p17. Meanwhile both ~3,200-word
  accountaxzone pages sit p8 and p21-p41. Word count predicts nothing here. Do not write long to
  feel safe; write the answer and stop.
- **The field is running stale figures, and this is the single biggest structural gap.**
  Measured, not inferred:
  - `accountaxzone` QCR page, at **p8** on a query whose text says "2025/26", states the fixed
    amount as **£10,000** and weekly amounts as **£200 / £250**. Those are pre-April-2023 figures.
  - `tax-wise` states **£18,140 / £375 / £450** with no year tag at all. Those are 2023/24.
  - `accountaxzone`'s foster self-assessment page (3,200 words) states **no QCR figures at all**.
  - `caservices`' expenses page, at p8, tags its own mileage rates **"(June 2016)"** and gives
    45p / 25p / 24p accordingly.
  Correct, dated, current-year figures are therefore not a nice-to-have on these pages. They are
  the whole competitive position.
- **Nobody in the sample carries a correct worked example.** One page of ten has a worked
  calculation (the accountaxzone QCR page, one child aged 12 for 52 weeks) and it computes on the
  wrong numbers. A recomputable 2026/27 example with the current figures is unowned ground in
  every one of the six surfaces.
- **The query set is year-tagged and the pages are not.** Five of the six QCR rows carry an
  explicit year in the query (`2024/25`, `2024-25`, `2024 25`, `2025/26`, `2025 26`) and two of the
  foster rows do the same (`foster carer tax allowance 24/25`). Readers are searching for a dated
  answer. Pages that answer undated lose them. Put the year in the sentence, not just in a footer.
- **Ruling sentence first, with the reader's situation in it.** The pattern that works in this
  field: name who the reader is, then state the obligation or the number.
  `caservices`' foster page does it in one line ("Foster carers are classified as self-employed for
  tax purposes, meaning they are required to submit a Self Assessment tax return annually"), and it
  is the shape to copy. `accountaxzone` opens on a cliffhanger colon instead ("you've probably
  heard this before:") and it reads as content marketing.
- **Question-form H2s on the explainer pages, noun-phrase H2s on the service pages.** The two
  accountaxzone pages run question and step H2s and hold their best positions on informational
  queries. `swan-books` and `wearegolding` run noun-phrase service H2s. Our N2, N5 and all FAQ
  blocks use question H2s; N1, N3, N4 mix.
- **Second person, short declarative sentences, plain money.** This is the least tax-literate
  audience set on the site after the trades cluster: the reader is doing school runs and nappy
  changes, or is a foster carer who may owe nothing at all and does not know it. Every figure in
  pounds. Every acronym spelled out at first use (MTD ITSA, QCR, SA, DBS, PACEY, TFC).
- **Heading hierarchy is broken across the field and is free to win.** `caservices`' expenses page
  carries **three H1s** on one page; `vanillaonlineaccountancy` carries the **same H1 twice**.
  Clean single-H1 structure is a no-cost differentiator.

## 2. House voice constraints (binding)

- Plain cost-conscious British English, consumer register, reader in the sentence.
- **No em-dashes** anywhere in reader copy. Measured in the sample: `swan-books` 3, `wearegolding`
  1, `tax-wise` 1, both accountaxzone pages throughout. We do not.
- **No published house-position citations in reader copy.** No "(§19)", no "(HP19.1)", no
  "per our house position". The trades wave leaked 71 of these and QA had to strip them. Writers
  cite sections **in their build report only**. The reader sees gov.uk, HS236 and HMRC manual
  references, never our internal numbering.
- **No "this guide" / "in this article" openers.** No "unique financial challenges" filler
  (`wearegolding`'s "a unique set of financial pressures that most general accountants simply
  don't understand" is the specimen to avoid). No "older articles" openers, at all, anywhere in the
  cluster.
- **No AI tells:** no rule-of-three stacks, no "it's important to note", no mirrored "not only but
  also", no summarising closing sections, no cliffhanger colons.
- **A recomputable 2026/27 worked example on every page where the SERP lacks one**, which per §1 is
  every page. Show the arithmetic in full so a reader can redo it with their own numbers.
- **Every rate carries its tax year in the same sentence.** Never "the fixed amount is £20,440",
  always "the fixed amount is £20,440 for 2025/26". Where a figure is CPI-indexed and the source
  pages lag each other, say which source and which year.
- **The 2025/26-locked figures carry a dated currency tag.** Class 4 at 6%, the £12,570 personal
  allowance and the £50,270 higher-rate threshold are locked at 2025/26 values. In 2026/27 copy
  they appear with the tag **"still current when checked in August 2026"**, worded naturally, not
  as a bracketed code.
- **Coverage over selection.** Where measured Ads volume is thin or absent (the tutor slice
  returned zero rows in 3,853 harvested keywords; `nursery accounts` is a single 110/mo row), that
  downgrades the expectation set in each pack's §8. It never removes a surface. Missing volume is a
  reason to expect less, not a reason to build less.

## 3. Do-not-copy list (measured on the same sample)

- **`accountaxzone` QCR page (p8):** fixed amount **£10,000**, weekly **£200 / £250**, presented as
  2025/26. Pre-April-2023 figures. Copy the page's *structure* (step-by-step calculation, 9-question
  FAQ, "most foster carers pay no tax" honesty) and none of its numbers. Also barred: its
  "Strategic Tax Planning Opportunities" section, which includes **"4. Interaction with benefits"**
  and **"3. Spouse or household considerations"**. Benefits-interaction content is exactly the C1
  row 27 fence. We do not go there.
- **`accountaxzone` foster SA page:** 3,200 words on qualifying care relief mechanics with **zero
  figures**; "Which apps can help with Self Assessment" as an H2; "Why Generic Accountants Often
  Get This Wrong" as a competitor swipe. None of that.
- **`tax-wise`:** **£18,140 / £375 / £450** untagged (2023/24). Also "maximize your tax-free
  allowances" framing, American spelling, an accreditations block above the substance, and a
  WhatsApp contact H3. Never lead with credentials.
- **`caservices` expenses page:** rates tagged **"(June 2016)"**, 45p / 25p mileage, three H1s. The
  33% / 10% hours-apportionment table on it is directionally the right content and is worth
  answering properly; the rates and the structure are not models.
- **`caservices` homepage:** the p1 page, and its "Supporting Childcare Professionals" and "Our
  packages / Sole Trader / Partnerships / Company" blocks are pricing furniture, not content. What
  to learn from it: it is 625 words and it ranks first. What not to learn: it answers almost
  nothing.
- **`swan-books`:** "Caring for Your Finances While You Care for Children" H1 wordplay; a five-step
  "Our Process" funnel (Initial Consultation, Onboarding, Tailored Solutions, Regular Check-ins,
  Year-End Finalisation); "Ready to take your business to the next level?"; "Book a Call". Mid-page
  sell blocks are not our shape.
- **`vanillaonlineaccountancy`:** 313 words, duplicated H1, no figures. It ranks p8 because the
  niche is shallow, not because it is good. It is the proof that this field is winnable, not a
  template.
- **`wearegolding`:** "Your passion is nurturing children, not navigating spreadsheets" sloganeering;
  a 20-item service-list H3 wall; zero figures across 1,611 words; names VAT exemption without ever
  explaining that exempt means no input-VAT recovery. That omission is N3's opening.

## 4. Differentiation note — lead structures (assigned, so 6 parallel pages do not converge)

One lead structure per pack. The opening 40% of each page must follow it, and no two siblings may
share an H2 phrasing. These six are all new: none repeats a structure used by the creative or
trades waves (hub-led, process-led, Q&A-led, rules-first, table-led, example-led, comparison-led,
decision-led are all spent).

**Cumulative bans, binding here.** Persona names BANNED, do not use in worked examples: **Maya,
Amara, Jess, Daniel, Sophie, Priya, Roshan, Tomasz, Wes, Ruth.** Example cities BANNED:
**Manchester, Nottingham, Sheffield, Leeds, Bristol, Birmingham, Liverpool, Glasgow, Dundee,
Coventry, Carlisle, Wakefield, Croydon, Dover, Inverness.** Suggested clear names for this cluster,
one per page so no two examples share one: Bev (N1), Colette (N2), Gethin (N3), Yusuf (N4), Petra
(N5), Owen (E1). Suggested clear cities: Lancaster, Shrewsbury, Preston, Durham, Bangor,
Lincoln. **No "older articles" openers on any page.**

| Pack | Lead structure |
|---|---|
| N1 accountant for childminders | **Registration-timeline-led.** The page opens on the childminder's first year as a sequence of dated obligations (Ofsted or CIW or Care Inspectorate registration, the 5 October trigger, the first return) and the service framing hangs off the timeline. No comparison table in the opening 40% |
| N2 childminder expenses, wear and tear, MTD | **Regime-fork-led.** The MTD ITSA fork is the organising device from sentence one: outside MTD you have the agreed percentages, inside MTD you do not, and which one you are in depends on a date and a turnover figure. Every expense heading answers twice, once per side of the fork |
| N3 accountants for nurseries | **Income-stream-led.** Trace the money in first (parent fees, funded hours from the local authority, Tax-Free Childcare receipts), establish that all of it is taxable trading income, then turn to costs and land the VAT-exemption sting: exempt is not zero-rated, and you cannot recover input VAT |
| N4 accountant for foster carers | **Arithmetic-first.** The qualifying-amount sum is done in full, with current dated figures, before any prose about services or about us. The reader who owes nothing learns that in the first screen and is told so plainly |
| N5 qualifying care relief, year-tagged Q&A | **Dated-answer-block-led.** The page opens with a dated figures block: this tax year, last tax year, and one sentence on which one applies to the return you are filing right now. Machinery, election and examples follow. Every H2 is a question |
| E1 accountant for tutors (EXTEND) | **Additive append only.** New question H2s and FAQ entries bolted on. Existing H1, metaTitle and H2 order untouched |

Editorial QA checks each page against THIS spec and its assigned lead structure, not reviewer taste.
