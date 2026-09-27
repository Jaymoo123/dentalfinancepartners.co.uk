# Track B editorial and claims QA: alphabet-shares-contractor-company

Post: `docs/contractors-ir35/_wave1/posts/alphabet-shares-contractor-company.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b and the S4a QA paragraph
Sameness corpus: the other four files in `docs/contractors-ir35/_wave1/posts/` and the five
newest posts in `contractors-ir35/web/content/blog/` (10 files compared)
Reviewed: 2026-09-27. Track A PASS (4 edits) kept intact.

## Findings

| # | Check | Verdict | Note |
|---|---|---|---|
| 1 | First paragraph answers the decision with the numbers | PASS | Opens with the answer (spouse or civil partner, real ordinary share, outright gift), names the three failure modes, and closes on the 2026/27 arithmetic: £500 allowance, 10.75%, 35.75%, £50,270. No preamble |
| 2 | Body 800 to 1,200 words | PASS | 1,187 after the edit below (1,170 before) |
| 3 | Question-shaped `<h2>`s, answer in the first sentence | PARTIAL then FIXED | All six H2s are questions. Five led with the answer. "Where do alphabet shares fail?" opened with a count rather than an answer. Fixed, see E5 |
| 4 | AI tells | PASS | Swept for the standard register (delve, moreover, furthermore, crucial, robust, landscape, navigate, seamless, comprehensive, holistic, ultimately, "it is important to", "when it comes to", "not just X but Y", "in conclusion", "let's", "the bottom line"). Zero hits. The one list-announcement tell found is E5 |
| 5 | Sentences shared verbatim with a sibling | PASS | Zero verbatim sentences across the 10-file corpus. Eight-word overlaps are all unavoidable: the frontmatter `author`/`generator` lines, the statutory phrase "not wholly or substantially a right to income" (ITTOIA 2005 s.626 wording), "the point Jones v Garnett settled in 2007" (case name plus date), the anchor text "corporation tax for a contractor limited company", and "a company whose only employee is a single director" (the Employment Allowance restriction as the statute frames it). None is a lifted sentence, and the surrounding sentences differ in every case |
| 6 | Overlap of substance with the spouse post | PASS | The spouse post covers salary against shares and the s.58 no gain no loss point; this post covers share classes, waivers, minors and the s.626 income-only test. The shared s.626 ground is handled from a different angle in each, and the two cross-link |
| 7 | Thin or padded sections | PASS | Six sections, each carrying its own load. "When do alphabet shares hold?" is a one-line answer plus a five-row table, which is the shortest and is dense rather than thin. No section restates another |
| 8 | FAQ answers 40 to 120 words | PASS | 105, 107, 97, 99, 92, 84. Six FAQs, inside the 4 to 6 band |
| 9 | FAQ answers do not restate the question | PASS | Every answer opens on substance ("Alphabet shares are separate classes", "They work where", "Not usefully while they are minors", "They are the most exposed part", "It depends entirely on") |
| 10 | `summary` 40 to 60 words | PASS | 55 words, and it is the answer rather than a description of the post |
| 11 | Banned claims, case-insensitive | PASS | Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice, advise, turnaround, guarantee. No prices of our own. No personal names beyond the case name *Jones v Garnett*. The closing line is "a specialist reviews", per spec |
| 12 | Em-dashes | PASS | Zero em-dashes and zero en-dashes |
| 13 | British English | PASS | No American spellings. Terminology is UK statutory throughout (winding up, articles, stock transfer form, board minute, distributable reserves) |
| 14 | 2026/27 leads | PASS | The current year is named in the opening paragraph, in the H2 "How much does the split save at 2026/27 rates?", and in the takeaways. The only prior-year figure is 33.75%, correctly labelled "before 6 April 2026" |
| 15 | Frontmatter per S4b | PASS | 15 keys, all required ones present: `slug`, `title`, `date`, `category`, `metaDescription`, `metaTitle` (55 ≤ 60), `metaDescription` (153 ≤ 155), `h1`, `summary`, `author`, `canonical`, `dateModified`, `faqs` (6), `keyTakeaways` (5), `generator: claude-opus`. Canonical is the nested contractors form `/blog/limited-company-tax/<slug>`, matching `slugifyCategory("Limited Company Tax")`. `updatedDate: "2026-09-27"` present alongside `dateModified`, since the site loader reads `updatedDate` |
| 16 | Raw HTML body, no markdown | PASS | Only `<p>`, `<h2>`, `<ul>`, `<li>`, `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, `<strong>`, `<em>`, `<a>`. No markdown syntax, no shortcodes, no CTA markup |
| 17 | Internal links, at most five, on disk | PASS | Four links, all verified: `contractors-ir35/web/content/blog/corporation-tax-contractor-limited-company.md` and `director-salary-dividend-split-guide.md` (both `category: Limited Company Tax`, so the nested path is right), `dividend-tax-rates-contractors-2026.md` (`category: Pension and Dividends`, path matches), and `contractors-ir35/web/src/lib/calculators/tools/contractor-salary-dividend-calculator.ts` |
| 18 | Pipeline leakage | PASS | No wave, spec, house-positions, source-array, TODO or placeholder text anywhere. The only model reference is the required `generator: claude-opus` frontmatter key |

No figure, rate, date or rule was changed.

## Edit log

| # | Where | Change | Reason |
|---|---|---|---|
| E5 | "Where do alphabet shares fail?", opening paragraph | "Four situations account for most of the failures." to "In the share class, in the shareholder, in the waiver and in the size of the dividend. Those four account for most of the failures." | The section's H2 asks "where", and the old opener answered with a count rather than with the answer. It also read as the "here are four things" list announcement, the one AI tell in the piece. The new opener answers the question in its first clause and keeps the count |

1 edit in Track B. Track A's 4 edits left untouched, so 5 edits stand on the file in total.

## Final measurements

- Body: **1,187 words** (800 to 1,200 band)
- `metaTitle`: 55 characters (≤ 60)
- `metaDescription`: 153 characters (≤ 155)
- `summary`: 55 words (40 to 60)
- FAQ answers: 105, 107, 97, 99, 92, 84 words (40 to 120)
- YAML re-validated after the edit: parses, 15 keys, body 1,187 words, zero em-dashes

VERDICT: PASS
