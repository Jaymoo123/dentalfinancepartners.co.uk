# Editorial and claims QA (Track B): closing-a-medical-limited-company

Post: `docs/medical/_wave1/posts/closing-a-medical-limited-company.md`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b + the S4a QA paragraph
Compared against: the other nine posts in `docs/medical/_wave1/posts/`, `docs/medical/_wave1/medical-companies.json`, the five newest posts in `Medical/web/content/blog/`
Reviewed: 2026-09-27
Track A state carried forward: PASS with edits E1 and E2, both kept unchanged.

## The ten checks

| # | Check | Verdict | Note |
|---|---|---|---|
| 1 | Answer-first opening | PASS | First sentence gives the £25,000 fork and the action; the whole lede is the answer, no throat-clearing |
| 2 | Body 800 to 1,200 words | PASS | 1,199 after edits (was 1,200). Every body edit was budgeted so the qualifier added in B3 did not push it over |
| 3 | Question-shaped H2s | PASS | All five are questions: "which route fits?", "Will the winding-up TAAR turn my capital distribution into income?", "Do I qualify for BADR on the distribution?", "What has to be cleaned up before the company closes?", "When should I start, and how does the tax year affect it?" |
| 4 | AI tells | PASS | Zero hits for the usual register (delve, navigate, crucial, landscape, comprehensive guide, moreover, furthermore, robust, leverage, seamless, testament, unlock, elevate, "it is important to note", "when it comes to"). Sentence lengths vary; no tricolon padding; no "In conclusion" |
| 5 | Verbatim overlap with siblings | PASS after B1 | One real collision found and removed: a ~48-word run shared with `medical-practice-incorporation-step-by-step.md` (the 9 months and 1 day / 12 months / £200 penalty passage) appeared near-identically in both files' FAQs. Reworded here. What remains is a single 8-word statutory date phrase ("is payable 9 months and 1 day after the") in a different sentence and a different section, plus the shared frontmatter author/generator lines, which are boilerplate by design |
| 6 | FAQ answers 40 to 120 words | PASS after B2 | Was 117 / 83 / **147** / 78 / 120 / 102. The TAAR answer breached the ceiling. Now 117 / 83 / 119 / 78 / 120 / 97, all in band |
| 7 | Summary 40 to 60 words | PASS | 52 words, unchanged |
| 8 | Banned claims | PASS | No "chartered", ICAEW, ACCA, CIOT, "our accountants", "our team", "award", "regulated", no named individuals, no prices or fees, no "advice"/"advise", no turnaround promise. The only occurrences of "our" are inside "four" and "your". The closing line is "A specialist reviews...", which is the permitted third-person form |
| 9 | Em-dashes and British English | PASS | Zero em-dashes. British spelling and conventions throughout (practise/licence not triggered; "organisation" forms absent; £ and percent handled consistently, symbols in body and words in FAQs as elsewhere in the wave) |
| 10 | Frontmatter per S4b, raw HTML, links, pipeline leakage | PASS | All 14 required keys present, YAML re-parsed clean after editing. metaTitle 52 chars, metaDescription 151 chars, 6 FAQs, 5 key takeaways. Body is raw HTML only (`p`, `h2`, `ul`, `li`, `table`, `tr`, `th`, `td`, `strong`, `a`); no markdown, no shortcodes, no CTA markup. Five internal links, all flat `/blog/<slug>`, all five targets confirmed on disk. No TODO, no placeholder, no model or prompt residue, no source-tool names, no research notes left in the file |

## Review suggestion carried out

The Track A review suggested qualifying the table's "24% without" as the higher-rate figure. Done as edit B3, at the row label rather than inside both cells, which costs three words instead of six and reads the same.

## Edit log

| ID | Location | Was | Now | Reason |
|---|---|---|---|---|
| B1 | FAQ 6 answer | "Corporation tax is payable 9 months and 1 day after the end of the accounting period, while the return itself is not due for 12 months, and that ordering is the one small-company directors most often get wrong. The first late-filing penalty on the return is £200, which is not the £100 Self Assessment figure." | "Payment runs ahead of filing, which is the ordering small-company directors most often get wrong: the tax falls due 9 months and 1 day after the period ends, and the return only at 12 months. Miss the return and the first penalty is £200, not the £100 Self Assessment figure." | Near-verbatim duplicate of the same passage in `medical-practice-incorporation-step-by-step.md`. Same figures, same ordering point, different sentences. Also -5 words |
| B2 | FAQ 3 answer | 147 words: "It is the targeted anti-avoidance rule at ITTOIA 2005 s.396B, inserted by Finance Act 2016 s.35 and applying to..."; the four conditions as full clauses; closing sentence "A consultant who liquidates a private-practice company and then picks up... is squarely within it." | 119 words: "It is ITTOIA 2005 s.396B, the targeted anti-avoidance rule, applying to distributions made on or after 6 April 2016."; the four conditions as compressed noun phrases; closing "Condition C is the live one for doctors: liquidate a private-practice company, then pick up private clinics or locum sessions inside two years through any vehicle, and you are caught." | Over the 120-word FAQ ceiling. No condition, date, percentage or rule was altered; the FA 2016 s.35 insertion point was dropped from the FAQ only, and still appears in full in the body |
| B3 | body, comparison table | `<td>Rate if it works</td>` | `<td>Rate if it works, higher rate</td>` | Track A review point: 24% is the higher and additional-rate CGT figure, not a universal one. Qualifying the row label covers both cells. +3 words |
| B4 | body, final-filings paragraph | "go to HMRC stated to be the final trading accounts" | "go to HMRC as the final trading accounts" | Word budget for B3. Meaning unchanged, -2 words |
| B5 | body, Condition C paragraph | "Retiring from clinical work altogether, or moving" | "Retiring from clinical work, or moving" | Word budget for B3. -1 word |
| B6 | keyTakeaway 5 | "filed, corporation tax is payable 9 months and 1 day after the period end," | "filed, the tax falls due 9 months and 1 day after the period end," | Broke the second instance of the overlapping run with the incorporation post. Figures untouched |

Edits: 6. Net body change -1 word (B3 +3, B4 -2, B5 -1, others frontmatter only). No figure, rate, date, statutory reference or rule was changed by any edit.

## Final measurements

- Body: 1,199 words (band 800 to 1,200)
- metaTitle: 52 characters (limit 60)
- metaDescription: 151 characters (limit 155)
- summary: 52 words (band 40 to 60)
- FAQ answers: 117, 83, 119, 78, 120, 97 words (band 40 to 120)
- keyTakeaways: 5 (band 3 to 5); faqs: 6 (band 4 to 6)
- Internal links: 5 (cap 5), all flat `/blog/<slug>`, all present on disk
- Em-dashes: 0
- YAML re-validated after editing: parses, all 14 required keys present

VERDICT: PASS
