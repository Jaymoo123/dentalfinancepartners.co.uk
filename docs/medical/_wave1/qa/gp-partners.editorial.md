# Editorial and claims QA (Track B): `docs/medical/_wave1/gp-partners.json`

Reviewer: Opus editorial QA, 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4a, "QA" and "Writers".
Sameness set: the other four `docs/medical/_wave1/*.json` and the live `AudienceStage` objects in `Medical/web/src/app/for-*/page.tsx`, `for-gps` in particular.
No figure, rate, date or rule was changed.

## Findings

**1. Situation in the first 150 words of `intro`. PASS.**
The intro is 109 words, so the whole of it sits inside the window. The situation is answered in the first three sentences: joining or newly a partner, salary and PAYE stop, taxed on an allocated profit share whether or not drawn.

**2. Word band 800 to 1,200 across intro, challenges, howWeHelp and faqs, titles and questions included. PASS after edits.**
On entry 1,199 by this counter (Track A counted 1,202 on its own tokenisation, so the page was at or just over the ceiling either way). The sameness fix in finding 3 and the tier clause in finding 7 added 16 words, so four padding trims were taken to land back at **1,199**. Stat tiles excluded, per the field list in the spec.

**3. AI tells and sameness. ONE DEFECT, FIXED.**
All four `howWeHelp` bodies ran the same actor-verb formula, and two of them consecutively as the literal stock openers the spec names: item 2 opened "Your accountant prepares", item 3 opened "A specialist reviews". Items 2 and 3 were rewritten so the work is described without the stock agent; item 1 keeps "A specialist reconciles" and item 4 keeps "a specialist prepares", now non-consecutive, so the page does not read as uniformly agentless either.
Checked and clean: no "This page is for" opener; no "You get A, B and C" intro closer (the intro closes on a handoff line to `/for-gps`); challenge titles vary in shape across negation, plain statement, compound and question-fragment, so no listicle rhythm.
Cross-page sameness clean. `for-gps` is practice-level (PCSE reconciliation, Carr-Hill weighting, notional rent treatment, practice incorporation); this page is partner-level (drawings vs profit share, first self assessment, Type 1, buy-in, exit). The one overlap, the Type 1 / pension tier, is handled as the partner's own signature and deadline rather than the practice's process, and the intro explicitly hands the practice-level work to `/for-gps`. No shared sentences or near-duplicates with `salaried-gps`, `nhs-doctors`, `medical-companies` or `retiring-doctors`; `retiring-doctors` covers leaving via the pension routes, this page covers leaving via the capital account, and they do not restate each other.

**4. Thin or padded sections, FAQ answers. PASS.**
Challenges 73 to 85 words, howWeHelp 49 to 72, no thin or bloated section. FAQ answers 60 to 70 words, all inside the 40 to 120 band. No answer restates its question; every one opens on the answer.

**5. Banned claims, case-insensitive. PASS.**
Zero hits on chartered, ICAEW, ACCA, CIOT, "our accountants", "we are accountants", "our team", "award", "regulated", "advice", "advise". No personal names, no prices or fees, no turnaround promise. The work is described as what a specialist reviews or prepares, never as advice given.

**6. Em-dashes, British English, 2026/27 lead. PASS.**
No em-dash or en-dash anywhere in the file. British spelling throughout ("specialise" forms absent, no US variants found). Every dated figure leads 2026/27: the four stat tiles, Class 4 thresholds, the top pension tier, the CGT annual exempt amount. "self assessment" as a noun and "self-assessment" only as a modifier ("Type 2 self-assessment") is consistent and correct.

**7. Tier-table clause requested by Track A. ADDED.**
Track A noted that HP §2.C wants a page quoting a tier to say the table can be revised in-year, and left it to the editor if the trim allowed. It did: one clause added to howWeHelp item 3. No figure asserted with it.

**8. `metaTitle` and `metaDescription`. PASS.** 52 and 152 characters.

**9. Internal links. PASS.**
Five, the maximum. All relative, all `<a href="...">text</a>`, no other HTML tag in any rendered field. All five resolve on disk: `Medical/web/src/app/for-gps/page.tsx`; `Medical/web/content/blog/gp-partner-drawings-vs-profit-tax-reserving.md`; `.../financing-gp-partnership-buy-in-tax-relief.md`; `.../retiring-from-gp-partnership-tax-capital-account.md`; `/calculators/gp-partner-drawings-planner` resolves through `Medical/web/src/app/calculators/[slug]` and is registered in `Medical/web/src/lib/tools/registry.ts`.

**10. Pipeline leakage. PASS, with one note for the integrator.**
No rendered field mentions the map, the wave, house positions, the QA tracks or any agent. The `sources` array does carry QA-track commentary ("SOURCED AT PRIMARY LAW BY THE FACTUAL QA TRACK", "LEFT OUT: ..."), which is correct for `sources` since the spec states the template does not render it. The integrator must not map `sources` into the `AudienceStage` object.

**Suspected errors noted, none found.** No figure, rate, date or rule was touched, and nothing on the page looked wrong enough to flag back to Track A.

## Edit log

Five edits, all editorial, all in `howWeHelp` and one `faq` answer plus one `challenges` tail.

1. `howWeHelp[1].body` opener. Was "Your accountant prepares a monthly reserve figure from the expected profit share, the payments on account due and your pension tier, then revisits it once the accounts are final." Now "A monthly reserve figure comes off the expected profit share, the payments on account due and your pension tier, and is revisited once the accounts are final." Removes a banned-adjacent stock opener and the first half of the consecutive pair. Net minus 3 words.
2. `howWeHelp[2].body` opener plus the Track A clause. Was "A specialist reviews the pensionable profit figure against the accounts and the practice's Estimate of Pensionable Profits, confirms locum and solo income is included, and checks the tier applied in-year." Now "The pensionable profit figure is read against the accounts and the practice's Estimate of Pensionable Profits, locum and solo income confirmed as included, and the tier applied in-year tested. Tiers can be revised in-year, so the rate first applied is not always the final one." Removes the second half of the consecutive stock-opener pair and satisfies finding 7. Net plus 19 words.
3. `challenges[0].body` tail trimmed. Was "Reserving is easier once the shape is visible: <a ...>how drawings differ from profit</a> has the mechanics." Now "The mechanics are in <a ...>how drawings differ from profit</a>." Padding; the preceding sentences already make the reserving point. Link and anchor text unchanged. Net minus 7 words.
4. `faqs[0].answer` tail trimmed. Was "Your pension record splits too, moving from the Type 2 self-assessment for the salaried part to the Type 1 certificate for the partner part." Now "Your pension record splits at the same date, from the Type 2 self-assessment to the Type 1 certificate." The salaried and partner halves are already named in the two sentences immediately before it. Net minus 6 words.
5. `howWeHelp[3].body`, "including the CGT position: see <a ...>" to "including the CGT position, in <a ...>". Removes a colon-plus-"see" link handoff, the one link introduction on the page that read as a signpost rather than prose. Net minus 1 word.

## Final state

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,199** (band 800 to 1,200).
- `metaTitle` **52** characters (limit 60). `metaDescription` **152** characters (limit 160).
- Internal links: **5** of a maximum 5, all relative anchors, all resolving.
- JSON re-validated after every edit: `json.load` clean.

VERDICT: PASS
