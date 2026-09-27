# Editorial and claims QA (Track B) — grant-making-trusts-and-foundations

File: `docs/charities/_wave1/grant-making-trusts-and-foundations.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a (QA Track B, Writers)
Companion: `grant-making-trusts-and-foundations.factual.md` (Track A, PASS, 0 edits)
Reviewed 2026-09-27.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside first 150 words of `intro` | PASS. Intro is 112 words in total and the buyer's shape ("You hold an endowment, you invest it, and you give the income away") plus the tax position land in the first three sentences. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | PASS. 1,194 after edits (1,197 on my count before; Track A counted 1,199 with a slightly different tokeniser, both inside band). |
| 3 | AI tells and sameness | FIXED, see edit log. The page carried five instances of the estate's two stock openers, more than any sibling in `_wave1`. Reduced to one. |
| 4 | Thin or padded sections | PASS. Challenge bodies 60 to 70 words, howWeHelp bodies 43 to 55, no filler paragraph and no section carrying a single idea stretched. |
| 5 | FAQ answers: no restating the question, 40 to 120 words | PASS. Seven answers, 58 to 71 words, every one opening on the answer ("Generally no", "Sometimes", "It lets trustees", "It depends on gross income") rather than echoing the question. |
| 6 | Banned claims, case-insensitive | PASS. Zero hits for chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, personal names, prices or fees, advice/advise, turnaround promises. One first-person delivery claim ("We prepare … and file") was removed anyway, see edit 5. |
| 7 | No em-dashes, British English, current rules | PASS. Zero em-dashes. Spellings British throughout (recognised, authorise, organisations, minuting). Rules current per Track A. |
| 8 | `metaTitle` ≤ 60, `metaDescription` ≤ 160 | PASS. 46 and 149. |
| 9 | Internal links: at most five, relative, exist on disk, all anchors | PASS. Four links, all relative, all `<a href="...">text</a>`, all verified on disk by Track A (SORP 2026 post, trustees' annual report guide, annual return guide, independent examination vs audit checker). |
| 10 | Pipeline leakage | PASS. The only build-side strings (`house_positions.md`) sit in the `sources` array, which the spec requires and the template does not render. No leakage in any rendered field. |

### Sameness detail

Across the seven `docs/charities/_wave1/*.json` pages before this pass: "A specialist reviews" 7 uses, "Your accountant prepares" 6 uses. This page alone held 2 and 1 of those plus "A specialist reads" and "Your accountant drafts", so four of its five howWeHelp bodies and its intro closer all opened on the same two formulas. The live rows in `charities/web/src/data/charity-types.ts` use neither formula, so the sameness is confined to the wave, which makes varying this page cheap and worth doing.

Listicle rhythm: challenges and howWeHelp both run five items of near-identical length, which is the template's shape rather than a defect, and the bodies differ in construction (statute-led, process-led, consequence-led), so no rewrite was made.

The intro does not carry the "You get A, B and C" closer; its closer was the stock specialist line instead, now varied.

## Edit log

| # | Location | Before | After | Why |
|---|---|---|---|---|
| 1 | `intro`, final sentence | "A specialist reviews that alongside the annual return and the trustees' annual report." | "All of it has to hold together before the annual return and the trustees' annual report go in." | Stock closer, shared with six sibling pages. Same meaning, no service formula. |
| 2 | `challenges[3]`, final sentence | "Undisclosed connected grants are a common first-examination finding." | Cut. | Unsourced qualitative claim flagged by Track A (#12). Cutting is cheaper than sourcing it and frees words at the ceiling. The preceding sentence already carries the point. |
| 3 | `howWeHelp[0]`, opener | "Your accountant prepares the accounts on the basis that fits the charity: receipts and payments…" | "Which framework applies is settled first: receipts and payments…" | Stock opener. No figure, rule or framework changed. |
| 4 | `howWeHelp[2]`, final sentence | "Your accountant drafts notes showing who received what, on what terms." | "The notes then show who received what, on what terms." | Second stock opener in the same section list. |
| 5 | `howWeHelp[3]`, opener | "We prepare the trustees' annual report and the annual return figures, and file within the ten months allowed." | "Figures for the annual return and the trustees' annual report come together in one pass, filed within the ten months allowed." | The only first-person delivery claim on the page and out of voice with every sibling. Ten-month deadline preserved verbatim. |
| 6 | `howWeHelp[4]`, second sentence | "A specialist reviews the income mix and the portfolio for anything outside those exemptions, confirms whether a return is due, and flags loans or investments that would count as non-charitable expenditure." | "The income mix and the portfolio are checked for anything falling outside those exemptions, a view taken on whether a return is due, and any loan or investment that would count as non-charitable expenditure flagged." | Fifth stock-formula instance. One instance of the formula now remains on the page ("A specialist reads the trust deed…", `howWeHelp[1]`), which is deliberate: the spec's voice rule wants the page to say what a specialist reviews. |

Edits made: 6. No figure, rate, date, statute reference or rule was changed. No suspected factual errors beyond the one Track A already recorded (the designated-land narrowing on the 25% borrowing power, items #3 and #21 of the factual review); edit 2 freed six words, not enough to add that caveat and keep the band comfortable, so it stays a note rather than a change.

## Final state

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,194** (band 800 to 1,200).
- `metaTitle` 46 characters (limit 60). `metaDescription` 149 characters (limit 160).
- Internal links: 4 (limit 5), all relative anchors, all on disk.
- Em-dashes: 0.
- JSON re-validated after the edits: parses.

VERDICT: PASS
