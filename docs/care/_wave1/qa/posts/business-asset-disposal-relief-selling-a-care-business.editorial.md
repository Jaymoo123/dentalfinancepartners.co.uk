# Track B editorial QA: business-asset-disposal-relief-selling-a-care-business

Site: care. Date: 2026-09-27. Reviewer: Opus, editorial. Runs after Track A (verdict PASS, 4 edits).
Verdict: **PASS** (7 edits applied in place). Final body word count: 1,047.

Read for comparison: all 12 siblings in `docs/care/_wave1/posts/`, and the two newest live posts `care/web/content/blog/care-business-survival-rates.md` and `care-home-bed-supply-and-care-deserts.md`.

## Checks

| Check | Result |
|---|---|
| Verbatim or near-verbatim sentences shared with a sibling | None at sentence level. Sub-sentence clones found and fixed, see below |
| AI tells | 3 found, all rewritten |
| Em-dashes / en-dashes | 0 |
| Markdown in body | None, body is raw HTML |
| Thin or padded sections | None. Five H2s, each carries its own material |
| H2s answer-first | 2 of 5 were statements, both reshaped to questions with the answer in the first sentence |
| Intro answers with numbers | Yes: 18%, 24%, £1 million, £60,000, £140,000 in the opening paragraph |
| Pipeline leakage | None ("verify at build", "(HP", "TODO" all absent) |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | None. Closing line uses the approved "A specialist reviews" / "your accountant prepares" |
| Body word count 800 to 1,200 | 1,047 |
| metaTitle <= 60 | 47 |
| metaDescription <= 155 | 152 |
| Internal links <= 5 | 4 |
| YAML re-validated after editing | Parses, 15 keys, 6 FAQs, 5 key takeaways, summary 59 words |

## Duplication method and finding

Two passes. A sentence-level similarity sweep (normalised, ratio > 0.70) of every body and FAQ sentence against all 11 siblings and the full live `care/web/content/blog/` corpus returned zero hits. A 9-gram shingle sweep against the siblings then caught what sentence matching missed: two statutory rate clauses reproduced almost word for word across the wave.

- Corporation tax: "corporation tax at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief in between" appeared in this post twice (body H2-4, FAQ6) and in `care-structure-before-cqc`, `opening-a-childrens-home-finance`, `supported-living-company-structure-before-framework-bid` and `supported-living-contract-forecast`.
- Dividends: "10.75%, 35.75% or 39.35% from 6 April 2026" appeared here once and in four siblings.

Both rewritten here, figures untouched. After the rewrite the only remaining shingle overlap with any sibling is frontmatter boilerplate (the three 2026-09-27 dates, the author string, the canonical domain and category prefix), which is required by the brief.

## Edits (7)

1. H2-4 heading "Why the deal structure changes the answer more than the rate does" to "Does an asset sale or a share sale change what you keep?", with the answer moved into the first clause of the paragraph.
2. H2-5 heading "What to do with two years or more to run" to "What should you do with two years or more to run?".
3. Intro: removed the AI tell "That is the whole picture in one line, and it is a very different picture from the one most care sector exit plans were written against".
4. H2-2 closing paragraph: removed "Note what the narrowing gap does to the planning calculus" and the "not zero" flourish; rewritten as plain instruction.
5. H2-4 body: corporation tax and dividend clauses rephrased away from the wave-standard wording; "not a technicality" contrast softened.
6. FAQ6: same corporation tax clause rephrased.
7. KT3 and FAQ2: the £60,000 / £140,000 comparison reworded so the three places it appears (KT3, intro, FAQ2) no longer read as one sentence pasted three times. Track A's qualifier "the standard rate was already 24%" is preserved in all three.

No figure, rate, date, section reference or rule was changed. Word count moved 1,054 to 1,047.

## Manager notes

1. The corporation tax rate clause and the dividend rate clause are now near-identical across at least four other care wave 1 posts. I only de-cloned this one. If the wave ships as written, the pattern will read as templated across the category. Worth a sweep of the other four before publication.
2. `care-structure-before-cqc` already carries a paragraph covering BADR at 18% against 24%, the two-year condition and propco/opco breaking eligibility. It is differently worded so it is not a duplication fail, but the two posts overlap in substance. This post is the deeper treatment; consider having `care-structure-before-cqc` link here and cut its BADR paragraph to one line.
3. Track A's two open items still stand for `docs/care/house_positions.md`: the £1 million lifetime limit with the TCGA 1992 s.169N reference, and the £3,000 CGT annual exempt amount. Both are used in this post and neither is in house positions.
