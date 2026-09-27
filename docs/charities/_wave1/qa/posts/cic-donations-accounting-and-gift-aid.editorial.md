# Track B editorial QA: cic-donations-accounting-and-gift-aid

Date: 2026-09-27. Reviewer: Track B (Opus), runs after Track A PASS.
Verdict: **PASS** (after 4 in-place edits). Final body word count: 1,199 (range 800 to 1,200).

Read for comparison: all four sibling posts in `docs/charities/_wave1/posts/`, the two newest published posts (`charities/web/content/blog/do-charities-pay-vat.md`, `who-can-do-an-independent-examination.md`), and the `cics` row in `charities/web/src/data/charity-types.ts` flagged by Track A.

## Checks

| Check | Result |
|---|---|
| Near-duplicate sentences vs `charity-types.ts` `cics` row | **2 FAILED, fixed** (see edits 1 and 2) |
| Near-duplicate vs sibling `_wave1` posts | PASS. Only shared item is the bare "25p for every £1" fact, which is a figure, not a sentence |
| Near-duplicate vs newest published posts | PASS |
| Internal FAQ/body repetition | FAILED via edit 1; FAQ 6 and the conversion paragraph carried the same four clauses in the same order. Now distinct wording and a different frame (trade-off list vs the three structural options) |
| AI tells | One flourish removed (edit 4). Nothing else |
| Em-dashes / en-dashes | 0 |
| Markdown in body | None. Raw HTML only (p, h2, ul, li, strong, a) |
| H2s answer-first | PASS after edit 3; every H2 is question-shaped and answered in its first sentence |
| Intro answers with numbers | PASS (£100 / £100 / £125 in the first sentence) |
| Thin or padded sections | None. Shortest section is "What does the donor lose?" at 77 words and it carries two distinct reliefs |
| Pipeline leakage | None |
| Banned claims (pricing, named people, chartered, ICAEW, our accountants, we advise, advice) | None. Uses "a specialist review", permitted |
| Body word count | 1,199 |
| metaTitle / metaDescription | 53 / 152 (caps 60 / 155) |
| Internal links | 5, at the cap, none added |
| Figures, rates, dates, rules | Untouched |
| YAML | Re-validated after the last edit. 6 FAQs, 5 keyTakeaways, summary 52 words |

## Edits made (4)

1. **FAQ 6 rewritten.** Was near-verbatim with the `cics` row's fifth challenge ("Charitable status opens Gift Aid and rate relief, and brings ... registration, trustee duties and restricted objects ... Test it against your own income mix: a CIC earning mainly contract income can gain less than the extra reporting costs"). Rewritten as a two-sided trade with no shared phrasing. Same facts, none changed.
2. **Body, funds paragraph.** "Income recognised in the wrong period distorts the reported result and the corporation tax computation at the same time" was near-verbatim with the same row's fourth challenge. Now "Recognise it a year early or late and the reported surplus and the taxable profit both move." Shorter by two words, which paid for edit 3.
3. **H2 "What to do next" to "What should you do next?"** The one H2 that was not question-shaped.
4. **Flourish removed.** "rather than a shared letterhead" (flagged by Track A as Track B's call) replaced with "an arrangement that only works where the two bodies are genuinely independent of each other". Plainer, same point.

## Notes for the manager

- Track A held the body at exactly 1,200, the cap. Both Track B body edits were net-negative on words by design; the post now sits at 1,199 with no headroom. Any later addition needs a matching cut.
- Internal links are at the cap of 5. Nothing can be added.
- The remaining substantive overlap with the `/for/cics` page is conceptual, not textual: both cover conversion and fund tracking, which is correct for a service page and its supporting post. The post goes deeper on the statutory reason; the page stays at outcome level. No further edit needed.
- Track A's own note stands and is not a Track B item: `house_positions.md` position 22 states "a CIC is not a charity" with no primary-law anchor. CAICE Act 2004 s.26(3) is that anchor.
- No figure, rate, date or rule was changed by Track B. No doubts raised on any of them.
