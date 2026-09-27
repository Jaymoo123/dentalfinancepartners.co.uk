# Track B editorial and claims QA: salaried-gp-locum-work-tax

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b and the
S4a QA paragraph. Track A (factual) passed with 1 edit; that edit is retained unchanged.
Sameness baseline: the other nine files in `docs/medical/_wave1/posts/` and the five newest
posts in `Medical/web/content/blog/`.

## 1. Checks

| # | Check | Finding | Verdict |
|---|---|---|---|
| 1 | First paragraph answers the decision with the numbers | Opens on the three consequences: 5 October registration (June 2026 session to 5 October 2027), 40% plus 2% Class 4 on stacked profit, Form A/Form B within 10 weeks, and the company verdict. No throat clearing. | PASS |
| 2 | Body 800 to 1,200 words | 1,199 after edit 2 | PASS |
| 3 | Question-shaped `<h2>`s, answer first | All six are questions; each section opens with the answer ("You register as a sole trader...", "Roughly 58 pence...", "Once your prior year's liability exceeded £1,000...", "Through the GP locum forms, and quickly.", "For part-time locum work on top of a salaried post, usually not.", "Register now rather than at the deadline.") | PASS |
| 4 | AI tells | No stock opener, no "in today's", no "it's important to note", no "crucial"/"landscape"/"navigating"/"delve", no listicle rhythm. Headings are real questions the reader asks, not rhetorical framing. | PASS |
| 4b | Sentences shared verbatim with a sibling | One found: "Contributions are paid over no later than the seventh day of the following month." shared with `register-self-employed-locum-doctor.md` (body and FAQ 5). The surrounding FAQ answer was also near-verbatim with that sibling's FAQ 5. Both rewritten, see edits 1 and 2. | FIXED |
| 5 | Thin or padded sections | Shortest section (payments on account) is two sentences but fully answers the heading and carries the 1.5x arithmetic; no padding anywhere. FAQ answers 72, 77, 81, 72, 66, 80 words, all inside 40 to 120, none restating the question. `summary` 55 words, inside 40 to 60. | PASS |
| 6 | Banned claims, case-insensitive | Case-insensitive scan for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, guarantee, turnaround: zero hits. No personal names, no prices of our own, no turnaround promise. Closing line says "have a specialist review", not "our team advises". | PASS |
| 7 | No em-dashes, British English, one current tax year | 0 em-dashes, 0 en-dashes. British spellings throughout. 2026/27 is the only tax year the rates lead on; other years appear only as dated deadlines and commencement dates. | PASS |
| 8 | Frontmatter per S4b | `metaTitle` 50 chars, `metaDescription` 144 chars, `h1` present and matches `title`, `summary` 55 words, `author` "Medical Accountants UK Editorial Team", `canonical` Medical flat form, `category` "Locum Tax" on the list, `generator` `claude-opus`, `faqs` 6, `keyTakeaways` 5. | PASS |
| 9 | Raw HTML body, links, calculator | No markdown markers in the body. Four `/blog/<slug>` links, all flat, all on disk in `Medical/web/content/blog/`, plus one calculator link, five in total at the cap. `/calculators/locum-tax-calculator` matches `locum-tax-calculator.ts` in `Medical/web/src/lib/tools/configs/`. | PASS |
| 10 | Pipeline leakage | No wave, batch, brief, prompt or QA references in frontmatter or body. | PASS |

## 2. Edit log

| # | Location | Before | After | Reason |
|---|---|---|---|---|
| 1 | Frontmatter, FAQ 3 answer | "Freelance GP locum work is pensioned through the locum forms: the practice approves Form A, Form B then goes to PCSE, and PCSE states that work which ended more than 10 weeks ago cannot be pensioned and the form will be rejected. Contributions are paid over no later than the seventh day of the following month. A missed window is lost accrual, not a late-filing penalty." | "The route is the locum forms: your practice signs off Form A, and Form B is the one that actually reaches PCSE. PCSE will reject anything covering work that finished more than 10 weeks earlier, and the contributions themselves must be with the scheme by the seventh day of the month after. Nothing here can be put right afterwards, because the accrual is never created rather than created late." | Sameness. The answer was near-verbatim with FAQ 5 of `register-self-employed-locum-doctor.md`, including one sentence shared exactly. Reworded; every figure, date and rule unchanged (10 weeks, seventh day, rejection, lost accrual). Answer 78 to 81 words, still in range. |
| 2 | Body, pension section | "Contributions are paid over no later than the seventh day of the following month." | "Contributions must reach the scheme by the seventh day of the month after." | Same verbatim sentence shared with the sibling's body. Reworded, no figure changed. Also returned the body from 1,202 to 1,199 words after edit 1's knock-on. |

Edits: 2. Removals: 0. Figures, rates, dates and rules changed: 0.

## 3. Final measurements

- Body word count: 1,199 (limit 800 to 1,200)
- `metaTitle`: 50 characters (limit 60)
- `metaDescription`: 144 characters (limit 155)
- `summary`: 55 words (range 40 to 60)
- `faqs`: 6 (range 4 to 6), answers 72 / 77 / 81 / 72 / 66 / 80 words
- `keyTakeaways`: 5 (range 3 to 5)
- Internal links: 5 (4 blog, 1 calculator), at the cap, all resolving on disk
- YAML: re-validated with `yaml.safe_load` after both edits, parses clean

VERDICT: PASS
