# Wave 1 editorial sweep, five contractors-ir35 audience pages

Date: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Model: `docs/property/_wave1/qa/_wave_sweep.md`.
Scope: the five `docs/contractors-ir35/_wave1/*.json` files only. No commit, no database, no code.
No figure, rate, date or rule was changed on any page.

Context: four of these rows are appended beside the live rows in
`contractors-ir35/web/src/data/contractor-types.ts`; `it-contractors` replaces the first live row.
The live file was read and included in the sameness scan.

## What changed, per page

| Page | Change |
|---|---|
| first-contract-outside-ir35 | Intro closer off the "A specialist checks A, sets B, and tells you C" triad. `howWeHelp1` opener varied off "A specialist reviews the written terms". |
| inside-ir35 | FAQ 5 closing clause reworded so it no longer shares the "the earliest a previously medium client drops out is 6 April 2027" sentence with first-contract-outside-ir35 FAQ 4. Same rule, same date. |
| ir35-contract-review | `challenges2` reworded on the Status Determination Statement and fee-payer sentence, which it shared almost verbatim with it-contractors `challenges0`. Same rule, no figure touched. |
| it-contractors | Challenge 3 and FAQ 3 differentiated: challenge 3 is now the assignment-rate arithmetic only (title "An umbrella rate is the cost of employing you"), and the keep-or-close decision sits solely in FAQ 3, which is unchanged. `howWeHelp0` opener varied off "A specialist reads". `howWeHelp1` filings list reworded to clear a two-sequence overlap with the live `legal-contractors` row. |
| umbrella-to-limited-company | `howWeHelp0` opener varied off "A specialist looks at". `challenges3` opener reworded off "A single director company with no other employees", shared with first-contract-outside-ir35 FAQ 2. |

### Intros

All five intros were read side by side. Before the sweep two closed on an
"A specialist <verb>" sentence and one of those also ran a three-part list. After the
sweep each intro closes on a different construction: a page-scope line
(first-contract), a test-the-determination line (inside-ir35), a who-decides line
(ir35-contract-review), a wording-versus-practice line (it-contractors), and the
specialist review plus the tax-year note (umbrella-to-limited-company). No two share
an opener either.

### Repeated openers

Counted across every `challenges` and `howWeHelp` body on the set.
Before: "A specialist reads/reviews/looks at" opened a body on all five pages
(four of them `howWeHelp0`). After: two, `inside-ir35` `howWeHelp0` ("A specialist reads
the statement") and `ir35-contract-review` `howWeHelp0` ("A specialist reviews the
contract"), which is the review page itself. "Your accountant prepares" appears nowhere
on this set. "A specialist from the partner network" appears nowhere on this set.
No page has two consecutive items sharing an opener.

### Consent sentence

Checked every `intro`, `challenges`, `howWeHelp` and `faqs` body on the five pages: the
consent wording appears in none of them. No removal needed. The template renders it in
the entity block and in the form.

## Links

24 internal links across the five pages, every one in `<a href="/path">text</a>` form;
anchor count equals href count on each page, and no other HTML tag appears in any body.
Every target resolved on disk:

- blog hrefs against `contractors-ir35/web/content/blog/<slug>.md`, with the frontmatter
  `category` slugified by `contractors-ir35/web/src/lib/blog.ts:slugifyCategory`
  (lower-case, drop brackets, `&` to `and`, spaces to hyphens); every path segment matched,
- calculator hrefs against `contractors-ir35/web/src/lib/calculators/` (all resolved to
  `tools/*.ts`).

No broken target, no bare path, no off-pattern href.

## Sameness scan

Method: all 8-word sequences across `intro`, `challenges`, `howWeHelp` and `faqs`
(titles and questions included), lower-cased, tags and punctuation stripped, compared
across all ten page pairs and against the live `contractor-types.ts` rows.

Excluded as shared-by-design (statutory or definitional wording that has one correct form):

- "Status Determination Statement", "client-led disagreement process", "reasonable care"
- "wholly and exclusively"
- "deemed employment payment"
- "small or wholly overseas with no UK connection"
- "where the end client is medium or large"
- "the small company thresholds rose for financial years beginning on or after 6 April 2025"
- "more than 40% of your working time there over a period exceeding 24 months" (temporary workplace rule)
- "registration is compulsory once VAT taxable turnover passes £90,000 in"
- "jointly and severally liable for PAYE" (FA 2026 s.24)
- "Apprenticeship Levy", "limited cost trader"

Before the sweep, four pairs and one live-row comparison exceeded two shared sequences:

| Pair | Shared | Cause | Fix |
|---|---:|---|---|
| first-contract-outside-ir35 / inside-ir35 | 4 | the "earliest a previously medium client drops out is 6 April 2027" sentence | reworded on inside-ir35 |
| first-contract-outside-ir35 / umbrella-to-limited-company | 4 | "a single director company with no other employees" plus the Employment Allowance clause | reworded on umbrella-to-limited-company |
| ir35-contract-review / it-contractors | 5 | the SDS and fee-payer sentence, worded identically | reworded on ir35-contract-review |
| it-contractors / umbrella-to-limited-company | 2 | employer NIC plus Apprenticeship Levy list | within tolerance, left |
| it-contractors / live `legal-contractors` row | 2 | "annual accounts, CT600, Companies House filings and self assessment" | reworded on it-contractors |

After the sweep: **no pair shares a single 8-word sequence outside the excluded list, and
no page shares one with any live row.**

## Invariants after the sweep

| Page | Words | metaTitle | metaDescription | Links | All anchors | Em-dash | Banned claims | JSON |
|---|---:|---:|---:|---:|---|---|---|---|
| first-contract-outside-ir35 | 1,180 | 42 | 157 | 4 | yes | none | none | parses |
| inside-ir35 | 1,198 | 52 | 157 | 5 | yes | none | none | parses |
| ir35-contract-review | 1,183 | 49 | 143 | 5 | yes | none | none | parses |
| it-contractors | 1,197 | 49 | 151 | 5 | yes | none | none | parses |
| umbrella-to-limited-company | 1,189 | 54 | 152 | 5 | yes | none | none | parses |

Words counted across `intro`, `challenges`, `howWeHelp` and `faqs` including titles and
questions, HTML tags stripped. Band 800 to 1,200: all five inside. `metaTitle` limit 60,
`metaDescription` limit 160: all five inside. Banned-claim scan covered chartered, ICAEW,
ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice,
advise, personal names and prices.

VERDICT: READY
