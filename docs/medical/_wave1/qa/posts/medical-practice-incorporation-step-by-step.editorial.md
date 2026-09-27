# Editorial and claims QA (Track B): medical-practice-incorporation-step-by-step

File: `docs/medical/_wave1/posts/medical-practice-incorporation-step-by-step.md`
Extends live post: `Medical/web/content/blog/medical-practice-incorporation-step-by-step.md`
Reviewed 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4b plus the S4a QA paragraph.
Track A (factual) PASSED with 1 edit; that edit is preserved untouched.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS. Opens with the recommendation in bold, then 19/25 percent corporation tax, 10.75/35.75/39.35 percent dividend tax, the £500 allowance, 20/40/45 percent income tax, Class 4 at 6 and 2 percent, and the 6 April 2026 change. |
| 2 | Body 800 to 1,200 words | FAIL on arrival at 1,272. FIXED to **1,198**. |
| 3 | Question-shaped `<h2>`s, answer in the first sentence | PASS. All six H2s are questions; each opening sentence answers it ("Neither...", "It costs you the accrual...", "No, and this is the boundary...", "It removes the advantage entirely...", "In eight steps...", "Stay a sole trader if..."). |
| 4 | AI tells | PASS. No stock openers, no "in today's", no "it's important to note", no "when it comes to", no listicle rhythm. The question headings are the S4b house shape, not a tell. Two low-value connective sentences were cut as filler (see edits 6 and 8). |
| 5 | Thin or padded sections; FAQ answers restating the question; answers 40 to 120 words; summary 40 to 60 words | FAQ 1 was 125 words, over the band. FIXED to 118. All six now 79 to 118. No section thin; no FAQ answer restates its question (each opens with the verdict). `summary` 55 words and answers the decision (stay a sole trader while profit is modest and drawn; incorporate when retaining, splitting or de-pensioning). PASS after edits. |
| 6 | Banned claims (case-insensitive) | PASS. No chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, own prices or fees, "advice", "advise". The only money figures are HMRC/Companies House amounts. "Usually registered within 24 hours" is the Companies House service fact verified in Track A, not a turnaround promise by us, and it is a figure, so it was left alone. No turnaround promise of our own anywhere; the one vague timing sentence ("Allow several weeks end to end") was cut. |
| 7 | No em-dashes, British English, one current tax year leads | PASS. Zero em-dashes. British spellings throughout (organisation, licence, novate; no -ize forms). 2026/27 is the only tax year led on. |
| 8 | Frontmatter per S4b | PASS. 19 keys. `metaTitle` 49 (≤ 60); `metaDescription` 144 (≤ 155); `h1` present and equal to the title; `summary` 55 words; `author` "Medical Accountants UK Editorial Team"; `canonical` the Medical flat form `.../blog/medical-practice-incorporation-step-by-step`; `dateModified` 2026-09-27 bumped against `date` 2026-04-01; `category` "Incorporation & Company Structures", on the Medical list; `generator: claude-opus`; `faqs` 6 (band 4 to 6); `keyTakeaways` 5 (band 3 to 5). PARTIAL-row rule honoured: slug, canonical, date and category unchanged. |
| 9 | Raw HTML body, internal links | PASS. No markdown syntax, no shortcodes, no CTA markup. Five links, the cap: four flat `/blog/<slug>` (gp-limited-company-tax-benefits-drawbacks, private-practice-tax-nhs-and-private-income, incorporation-relief-private-medical-practice-s162, salary-vs-dividend-medical-limited-company-2026), each present in `Medical/web/content/blog/`; plus `/calculators/private-practice-incorporation`, whose slug is declared in `Medical/web/src/lib/tools/configs/incorporation-calculator.ts:7`. |
| 10 | Pipeline leakage | PASS. No wave, row, map, brief, prompt or QA vocabulary in the rendered text. |

## Edit log

All ten edits are wording only. No figure, rate, date, rule, statute reference, heading or link was changed, and nothing was cut from the step list or the table.

1. FAQ 1: "Only in specific circumstances, and not because of the headline rates." to "Only in specific circumstances." Brought the answer from 125 to 118 words, inside the band; the "headline rates" point is made twice more in the same answer.
2. H2.1 opener: dropped "which is why the comparison has to be run on your own numbers", already the job of the calculator sentence at the end of the section.
3. H2.1 body: "Read the fourth row twice, because it is where the real difference sits. A sole trader is..." to "The fourth row is where the real difference sits: a sole trader is...". Instruction to the reader replaced by the point itself.
4. H2.1 link sentence: dropped "in more detail" after "side by side".
5. H2.2: "Which side of this you sit on depends on your role, and the split is clean." to "Which side you sit on depends on your role." The clean split is then demonstrated in the next two sentences.
6. H2.2 close: cut "Never look at the tax saving in isolation." Filler restating the paragraph.
7. H2.3: cut the trailing clause "because the company is not performing NHS primary medical services", which restates the s.86(3) rule given in full in the paragraph above.
8. H2.5 intro: cut "Allow several weeks end to end, with the formation itself the quickest part." Vague and the closest thing in the piece to a turnaround statement.
9. H2.5 step 2: cut "so start it first".
10. Closing paragraph: cut "and your accountant prepares the transfer agreement and the filings that follow", which duplicates steps 3 and 8 of the list directly above.

Duplication between the body and the FAQs was reviewed deliberately: FAQs 1, 3, 4 and 5 cover the same ground as H2.1 to H2.4, which the coverage-page shape intends, but the FAQ answers carry the figures and the body sections carry the reasoning, so the overlap is not word-for-word and both sides were left to stand.

Total edits: 10.

## Final measurements

- Body word count: **1,198** (band 800 to 1,200).
- `metaTitle` 49 characters (≤ 60).
- `metaDescription` 144 characters (≤ 155).
- `summary` 55 words (band 40 to 60).
- FAQ answer words: 118, 86, 98, 96, 79, 88 (band 40 to 120).
- Frontmatter re-parsed as YAML after the edits: valid, 19 keys.

VERDICT: PASS
