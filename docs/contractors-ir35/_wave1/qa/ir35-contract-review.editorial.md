# Track B editorial and claims QA: ir35-contract-review

Site: contractors-ir35. Page: `docs/contractors-ir35/_wave1/ir35-contract-review.json`.
Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a
("QA" and "Writers"). Compared for sameness against the four sibling wave 1 pages
(`first-contract-outside-ir35`, `inside-ir35`, `it-contractors`, `umbrella-to-limited-company`)
and the live rows in `contractors-ir35/web/src/data/contractor-types.ts`. Track A's three edits
were left in place.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 119 words; the situation (new or renewed contract, or a determination believed wrong) is named in sentence 1 and what a review does is answered by sentence 4. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included, anchor markup stripped | PASS. 1,177 after edits (1,199 before). |
| 3 | AI tells and sameness | Two found and fixed (edits 2 and 3). No stock opener, no "You get A, B and C" intro closer, no listicle rhythm. Intro opens "You have a ..." like two siblings, but that second-person situation opener is the site's established voice on the live `contractor-types.ts` rows, so it is convention, not sameness. Challenge and howWeHelp titles are distinct from every sibling's. |
| 4 | Thin or padded sections, FAQ answers restating the question, FAQ answers under 40 or over 120 words | PASS after edits. FAQ answers 65, 75, 69, 53, 66. None opens by restating the question. Shortest body is howWeHelp 4 at 32 words, in line with the siblings' howWeHelp blocks. |
| 5 | Banned claims, case-insensitive: chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "award", "regulated", personal names, prices or fees, "advice"/"advise", turnaround promises, promised outcome of a review | PASS after edit 1. No hit on any banned string. The only firm-shaped claim on the page was "your accountant prepares the amendments" (howWeHelp 3), unique to this page across all five wave 1 files and the live data file, now "a specialist prepares". "guarantee" appears twice and both times denies one. No turnaround time anywhere. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. No US spellings. 2026/27 leads in `metaDescription` and is the year named in challenge 3 ("For 2026/27, assume yours is in"). |
| 7 | `metaTitle` <= 60, `metaDescription` <= 160 | PASS. 49 and 143. |
| 8 | At most five internal links, relative, each exists on disk, all `<a href="...">text</a>` | PASS. Exactly five, all relative anchors, no bare URLs. Verified: `contractors-ir35/web/content/blog/{ir35-status-tests-explained,sds-status-determination-statement,challenge-ir35-determination-sds,ir35-contract-review-checklist}.md` and `contractors-ir35/web/src/lib/calculators/tools/ir35-status-indicator.ts`. |
| 9 | Pipeline leakage | PASS. No agent, wave, map, prompt or house-positions reference in rendered fields. The trailing `sources` array is required by S4a and is not rendered by the template. |

No figure, rate, date or rule was changed. No suspected factual error found; Track A's table
stands.

## Edit log

1. `howWeHelp[2].body`: "your accountant prepares the amendments" -> "a specialist prepares the
   amendments". Reason: implied firm claim and the page's only lapse out of the "a specialist"
   voice used everywhere else on it and across the four siblings. Word-neutral.
2. `challenges[4].body`: "HMRC's CEST tool shares that limit: HMRC backs a result where the
   inputs are accurate and match the working practices, but it does not bind a tribunal and its
   treatment of mutuality is narrower than the case law." -> "HMRC's CEST tool shares that
   limit, which is why a determination resting on it is not the last word either." Reason: near
   verbatim duplication of FAQ 2, which carries HMRC's full stand-behind stance; an AI tell and
   padding in a section whose subject is the review, not CEST. The factual stance is unchanged
   because FAQ 2 states all four conditions and both limits. Body 89 -> 71 words.
3. `faqs[0].answer`: "What you get is a reasoned position, the weak points identified, changes
   worth negotiating, and a dated record." -> "What you get instead is a reasoned position and a
   dated record of it." Reason: the same four-item list already appears in challenge 5 ("a
   reasoned read of your position, the terms and practices pulling the wrong way, wording worth
   renegotiating before signature, and a dated record"). Repeated list, repeated rhythm. Answer
   69 -> 65 words, still inside 40 to 120.

3 edits, all editorial. JSON re-parsed clean after the edits.

## Final numbers

- Word count: 1,177 (intro, challenge and howWeHelp titles and bodies, FAQ questions and
  answers; anchor markup stripped). 23 words of headroom under the 1,200 ceiling.
- `metaTitle` 49 characters. `metaDescription` 143 characters.
- Internal links: 5 of a maximum 5.

VERDICT: PASS
