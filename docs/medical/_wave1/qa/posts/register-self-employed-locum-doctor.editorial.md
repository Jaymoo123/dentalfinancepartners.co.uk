# Track B editorial and claims QA: register-self-employed-locum-doctor

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b and the
S4a QA paragraph. Track A (factual) passed with 2 edits; both retained unchanged.
Sameness baseline: the other ten files in `docs/medical/_wave1/posts/` and the five newest
posts in `Medical/web/content/blog/`.

## 1. Checks

| # | Check | Finding | Verdict |
|---|---|---|---|
| 1 | First paragraph answers the question with the dates | Opens on the deadline itself (5 October after the tax year, worked through with a June 2026 session to 5 October 2027), then the UTR, the 31 January return and tax, payments on account, Class 4, and the 10-week pension clock. No throat clearing. | PASS |
| 2 | Body 800 to 1,200 words | 1,081 after the edits (was 1,085) | PASS |
| 3 | Question-shaped `<h2>`s, answer first | Six H2s, all questions. Each opens with the answer: "5 October after the end of the tax year, not 5 October after the session.", "Through the self assessment service on gov.uk...", "A return every year, filed online by 31 January...", "Registering with HMRC does nothing for your pension.", "It applies by gross qualifying income...", "Records of income and expenses, kept for at least five years...". | PASS |
| 4 | AI tells | No stock opener, no "in today's", no "it's important to note", no "crucial"/"landscape"/"navigating"/"delve"/"unlock". Headings are real reader questions. No three-item listicle rhythm; the one list is a records checklist that earns its form. | PASS |
| 4b | Sentences shared verbatim with a sibling | Five overlaps found with `salaried-gp-locum-work-tax.md` (one FAQ question and its opening answer sentence identical; the June 2026 worked example near-verbatim in two places; the summary opener; the MTD threshold sentence) and one with `doctors-returning-to-uk-tax-residence-split-year.md` (the "tell HMRC by 5 October following the end of the tax year your first paid session fell in" line, also echoed in keyTakeaway 1). The sibling's own editorial pass had already fixed the pension-sentence overlap on its side, so these were fixed here. See edits 1 to 6. Post-edit rescan: highest similarity to any sibling sentence is 0.78 and no sentence is shared verbatim. | FIXED |
| 5 | Thin or padded sections | Shortest section (records, before the list) is two sentences and the list carries the substance; no padded section. FAQ answers 74 / 65 / 61 / 72 / 80 / 69 words, all inside 40 to 120, none restating the question. `summary` 52 words, inside 40 to 60. | PASS |
| 6 | Banned claims, case-insensitive | Scan for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, guarantee: zero hits. No personal names, no prices of our own, no turnaround promise. Closing line is "a specialist reviews the registration date...". | PASS |
| 7 | No em-dashes, British English | 0 em-dashes, 0 en-dashes. British spellings throughout. 2026/27 leads on rates; other years appear only as dated deadlines and commencement dates. | PASS |
| 8 | Frontmatter per S4b | All required keys present. `metaTitle` 43 chars (≤ 60), `metaDescription` 147 (≤ 155), `h1` present and equal to `title`, `summary` 52 words, `author` "Medical Accountants UK Editorial Team", `canonical` the Medical flat form, `category` "Locum Tax" on the Medical list, `generator: claude-opus`, `dateModified` = `date`, `faqs` 6 (4 to 6), `keyTakeaways` 5 (3 to 5). | PASS |
| 9 | Raw HTML body, links | No markdown headings, lists or link syntax in the body. Four internal links, all flat `/blog/<slug>`, under the five cap. Three resolve in `Medical/web/content/blog/`; `/blog/salaried-gp-locum-work-tax` resolves to `docs/medical/_wave1/posts/salaried-gp-locum-work-tax.md`, accepted per the brief, and the integrator must move both files in the same batch or the link 404s. | PASS |
| 10 | Pipeline leakage | No wave, batch, brief, prompt, QA, TODO or placeholder references in frontmatter or body. | PASS |

## 2. Edit log

| # | Location | Before | After | Reason |
|---|---|---|---|---|
| 1 | Frontmatter `summary`, first sentence | "Register for self assessment by 5 October following the end of the tax year your first paid locum session fell in." | "You must be registered for self assessment by the 5 October that follows the tax year containing your first paid locum session." | Sameness: near-verbatim with the `salaried-gp-locum-work-tax` summary opener. Rule and date unchanged; summary 51 to 52 words, still in range. |
| 2 | Frontmatter, FAQ 1 question | "When do I have to tell HMRC I have started locum work?" | "By when must I register for self assessment?" | Sameness: identical word for word with FAQ 1 of `salaried-gp-locum-work-tax`. |
| 3 | Frontmatter, FAQ 1 answer, first sentence | "By 5 October following the end of the tax year in which your first paid session fell." | "The 5 October that follows the tax year holding your first paid session." | Sameness: identical word for word with the sibling's FAQ 1 answer opener. Same rule. |
| 4 | Frontmatter, FAQ 1 answer, worked example | "A first session in June 2026 sits in the 2026/27 tax year, which ends on 5 April 2027, so registration is due by 5 October 2027." | "Work in June 2026 falls in 2026/27, a year that closes on 5 April 2027, which puts the deadline at 5 October 2027." | Sameness: near-verbatim with the sibling's worked example. Every date unchanged. Answer 81 to 74 words, still in range. |
| 5 | Frontmatter, FAQ 6 answer | "Making Tax Digital for Income Tax applies from 6 April 2026 where that figure exceeds £50,000, from 6 April 2027 above £30,000 and from 6 April 2028 above £20,000." | "The regime starts at £50,000 of that income on 6 April 2026, reaches £30,000 on 6 April 2027 and £20,000 on 6 April 2028." | Sameness: near-verbatim with the sibling's MTD sentence. Thresholds and commencement dates unchanged. Answer 74 to 69 words. |
| 6 | Body, intro paragraph, first two sentences | "Tell HMRC by 5 October following the end of the tax year in which your first paid locum session fell. A session in June 2026 sits in the 2026/27 tax year, which ends on 5 April 2027, so the deadline is 5 October 2027." | "Your registration deadline is the 5 October that follows the tax year holding your first paid locum session. Work in June 2026 falls in 2026/27, a year that closes on 5 April 2027, so you have until 5 October 2027." | Sameness: sentence one near-verbatim with `doctors-returning-to-uk-tax-residence-split-year`, sentence two near-verbatim with `salaried-gp-locum-work-tax`. Dates unchanged. |
| 7 | Frontmatter, keyTakeaway 1 | "Tell HMRC by 5 October following the end of the tax year in which your first paid locum session fell, and register once you earn more than £1,000 from the work in a tax year." | "Register by the 5 October that follows the tax year holding your first paid locum session, once you have earned more than £1,000 from the work in a tax year." | Same shared line as edit 6; also removed the doubled "register". Rule, date and threshold unchanged. |

Edits: 7. Removals: 0. Figures, rates, dates and rules changed: 0.

## 3. Note for the manager (not an edit here)

`docs/medical/_wave1/posts/salaried-gp-locum-work-tax.md` FAQ 1 still says "Registering early
costs nothing and starts nothing". Track A on this post found the same claim WRONG and corrected
it here, because a registered record attracts a notice to file. That sibling is outside this
review's scope and was not edited; it should be corrected before integration.

## 4. Final measurements

- Body word count: 1,081 (limit 800 to 1,200)
- `metaTitle`: 43 characters (limit 60)
- `metaDescription`: 147 characters (limit 155)
- `summary`: 52 words (range 40 to 60)
- `faqs`: 6 (range 4 to 6), answers 74 / 65 / 61 / 72 / 80 / 69 words
- `keyTakeaways`: 5 (range 3 to 5)
- Internal links: 4, all flat `/blog/<slug>`, under the cap of five
- Em-dashes: 0
- YAML: re-parsed with `yaml.safe_load` after all seven edits, parses clean, all 14 keys present

VERDICT: PASS
