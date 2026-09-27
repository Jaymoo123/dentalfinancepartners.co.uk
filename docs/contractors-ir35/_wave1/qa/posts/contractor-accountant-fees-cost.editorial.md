# Track B editorial and claims QA: contractor-accountant-fees-cost

Post: `docs/contractors-ir35/_wave1/posts/contractor-accountant-fees-cost.md`
Spec: `docs/_engines/WAVE1_POST_QA_BRIEF.md` Track B, LEADS_250 §13 S4b.
Sameness corpus: the seven other files in `docs/contractors-ir35/_wave1/posts/` plus the two
newest in `contractors-ir35/web/content/blog/` (`contractor-day-rate-to-take-home.md`,
`switching-umbrella-to-limited-company.md`). 9 files compared, 8-gram sweep plus read.
Reviewed 2026-09-27. Track A PASS (1 edit) kept intact.
Standing constraint for this post: no pricing of our own; fee figures only as survey-attributed
market ranges or removed. Track A had already removed them all; none was reintroduced.

## Findings

| # | Check | Verdict | Note |
|---|---|---|---|
| 1 | Verbatim or near-verbatim sentences shared with a sibling | FAIL then FIXED | One hit. FAQ 4's MTD threshold sentence was near-identical to FAQ 3 of `first-contract-outside-ir35-checklist.md` (19 words differing only by "above" against "over"). Fixed, see E2. After the fix the 8-gram sweep across all 9 files returns only frontmatter boilerplate (`author`, `generator`, the shared Pexels URL parameters, the date keys) |
| 2 | Pipeline leakage | FAIL then FIXED | Two hits, both self-referential editorial process aimed at the reader. A whole body paragraph explained that the page "previously carried a monthly market range", that it was "an editorial estimate with no published source behind it", and that "this site does not quote its own prices". FAQ 1 opened "There is no single figure, and this site does not publish one". Both are the QA process leaking onto the page. Fixed, see E3 and E4 |
| 3 | Title and H1 honest against the body | FAIL then FIXED | `title` and `h1` both read "What Should a Contractor Accountant Cost in 2026/27?" on a page that, correctly, never gives a cost. A headline that asks a price question and refuses it is the kind of page a reader bounces from. Retitled to cover rather than cost, see E1. `metaTitle` was already framed that way ("What a Fee Should Buy") so the two now agree. Slug, canonical, `date` and `category` untouched |
| 4 | H2s answer-first | PARTIAL then FIXED | Five H2s, all question-shaped, all answered in the first sentence. One was clumsy English rather than a question a reader would ask: "What should a fee buy at 2026/27 obligations?". Reworded, see E5 |
| 5 | Intro answers with numbers | PASS after E3 | The opening paragraph answers the decision in the first clause (scope first, fee second) and names the four items quotes differ on. The replacement second paragraph now carries the £90,000 VAT entry point and the CT600 and RTI obligations, so the intro block reaches numbers where before it reached an apology |
| 6 | AI tells | PASS | Swept for delve, moreover, furthermore, crucial, robust, landscape, navigate, seamless, comprehensive, holistic, ultimately, "it is important to", "when it comes to", "not just X but Y", "in conclusion", "the bottom line". Zero hits. No list-announcement openers |
| 7 | Em-dashes | PASS | Zero |
| 8 | Markdown in the body | PASS | Raw HTML only: `<p>`, `<h2>`, `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, `<ul>`, `<li>`, `<a>`. No shortcodes, no CTA markup |
| 9 | Thin or padded sections | PASS | Five sections. The package-shape table carries four rows of genuinely different scope; the six-question list is the densest part of the page and is the reason to read it. No section restates another. The removed paragraph was the only padding |
| 10 | Banned claims | PASS | Zero hits, case-insensitive, for chartered, ICAEW, ACCA, CIOT, "our accountants", "we advise", "we recommend", advice, advise, guarantee, regulated, award. No named people, no named firms, no provider verdicts. The MSC paragraph stays framed as risk management |
| 11 | Pricing of our own | PASS | No pound figure attached to a fee anywhere. Every money figure left on the page is statutory (£90,000 VAT, £50,000 / £30,000 / £20,000 MTD) or a rate (10.75%, 35.75%). No survey-attributed range was added, because none was available to attribute |
| 12 | Body 800 to 1,200 words | PASS | 1,082 (was 1,070). Net change is small: one paragraph swapped for another, one FAQ expanded, one redundant parenthetical trimmed |
| 13 | `metaTitle` 60 or fewer | PASS | 49, unchanged |
| 14 | `metaDescription` 155 or fewer | PASS | 153, unchanged |
| 15 | Internal links, five or fewer | PASS | Exactly 5, unchanged from Track A which verified each target on disk |
| 16 | FAQ answers | PASS | 6 FAQs, 68 / 69 / 64 / 98 / 77 / 68 words. None restates its question |
| 17 | `summary` 40 to 60 words | PASS | 55, unchanged |
| 18 | British English | PASS | No American spellings. UK statutory terminology throughout |
| 19 | YAML re-validated after editing | PASS | Parses, 20 keys, `updatedDate` and `dateModified` both present as the contractors loader requires |

No figure, rate, date or rule was changed.

## Edit log

| # | Where | Change | Reason |
|---|---|---|---|
| E1 | `title` and `h1` | "What Should a Contractor Accountant Cost in 2026/27?" to "What Should a Contractor Accountant Fee Cover in 2026/27?" | The page must not price and does not price. The old headline promised a number in the first line and never paid it off. Cover is what the page actually delivers, keeps the fee query intent, and matches the existing `metaTitle` |
| E2 | FAQ 4, "Does a contractor accountant handle MTD for Income Tax?" | Answer rewritten around the fee question (is the quarterly work inside the fee or billed on top), thresholds restated in a different construction | The old answer was near-verbatim with FAQ 3 of `first-contract-outside-ir35-checklist.md`. Same three thresholds, same three dates, same "generally outside it" point, all intact and unchanged in substance |
| E3 | Body, second paragraph | Removed the paragraph explaining that the range had been removed and that the site does not quote prices. Replaced with a paragraph saying why no single figure answers the question, carrying the £90,000 VAT entry point, the CT600 and RTI payroll | Reader-facing confession of our own editorial process, and the only padded paragraph on the page. The replacement makes the same point as substance instead of as housekeeping |
| E4 | FAQ 1, opening clause | "There is no single figure, and this site does not publish one." to "There is no single figure to quote." | Same leakage in miniature. The rest of the answer, which is the useful scope-against-scope instruction, is untouched |
| E5 | H2 3 | "What should a fee buy at 2026/27 obligations?" to "What should the fee cover for 2026/27?" | Not a sentence a reader would say. Section body and its answer-first opening line unchanged |
| E6 | Body, obligations paragraph | Dropped "(compulsory once turnover passes the £90,000 threshold)" | The £90,000 threshold now sits in the intro after E3. Repeating it two paragraphs later is padding. The figure survives on the page |

6 edits in Track B. Track A's 1 edit untouched, so 7 edits stand on the file in total.

## Manager notes

1. **Title changed, by judgement.** E1 alters `title` and `h1` but not `slug`, `canonical`, `date` or `category`, so nothing routing-related moves. Flagging it because Track A recorded the frontmatter as PASS and a title change is normally out of Track B's lane. If the manager wants the cost framing kept for the query, the page needs a survey-attributed market range to justify it, and there is none on file.
2. **No survey source for contractor accountancy fees exists in the repo.** The pricing was removed rather than attributed because nothing was available to attribute it to. If a published survey is ever sourced, this page is the natural home for the range and the H1 could go back to cost.
3. **Carried from Track A, unresolved.** `house_positions.md` §13 still carries `[UNVERIFIED - reviewer check]` on whether an FTT judgment has landed in the MSC test cases. This post says they "remain undecided as at September 2026". If a judgment has landed, this page and every other citing page need the status line updated.

## Final measurements

- Body: **1,082 words** (800 to 1,200 band)
- `metaTitle`: 49 characters (60 or fewer)
- `metaDescription`: 153 characters (155 or fewer)
- `summary`: 55 words (40 to 60)
- FAQ answers: 68, 69, 64, 98, 77, 68 words
- Internal links: 5 (five or fewer)
- Em-dashes: 0
- YAML re-validated after the last edit: parses, 20 keys

VERDICT: PASS
