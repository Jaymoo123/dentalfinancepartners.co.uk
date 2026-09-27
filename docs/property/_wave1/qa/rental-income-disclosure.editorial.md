# Track B editorial and claims QA - rental-income-disclosure

Page: `docs/property/_wave1/rental-income-disclosure.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` S4a (row shape, QA, Writers).
Date: 2026-09-27. Reviewer: QA Track B (Opus). Track A PASSED, both of its edits preserved.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Buyer's situation answered in first 150 words of `intro` | PASS. Sentence 1 names the situation (undeclared rental income, letter arrived or coming forward first). The penalty-floor fork, the route fork, the behaviour fork and the deliverable all land inside 137 words, so the whole intro sits under the limit. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs | PASS. 1,199 (tag markup excluded, the count method used on the sibling pages). Was 1,199 before; the link conversion and rewrites were made word-neutral by two deliberate trims, see edits 8 and 9. Nothing was padded. |
| 3 | AI tells and sameness across the other 14 wave 1 pages | Two shared sentence openers found and fixed (edits 6 and 7). No verbatim sentence in this page appears in any sibling. One wave-level pattern noted below, not edited. |
| 4 | Thin or padded sections | PASS. Challenge bodies 66 to 80 words, howWeHelp 47 to 55, each carrying distinct substance (route, years, penalty bands, reconstruction, interest; then review, notification, computation, mitigation). No section restates another. |
| 5 | FAQ answers: not restating the question, 40 to 120 words | PASS. Six answers, 57 to 68 words. All answer first ("It usually lowers the penalty floor", "It depends on behaviour, not on the campaign", "Reconstruction is normal", "Often yes, but the disclosure is then prompted"). None reopens with the question. |
| 6 | Banned claims, case-insensitive | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal name / price / turnaround promise. No "advice" or "advise" anywhere. "agent fees" appears once, as a landlord's deductible cost, not a charge for the work. **No promised HMRC outcome**: the page hedges every outcome ("usually lowers", "often yes", "decides case by case", "argued, not filled in"), and states plainly that only the Contractual Disclosure Facility carries criminal immunity. |
| 7 | No em-dashes, British English, 2026/27 leads | PASS after edit 5. No em-dash or en-dash. "acknowledgment" (US-leaning) changed to "acknowledgement" in both places. No tax year is quoted on this page: the content is statute-window and penalty-band based, so there is nothing stale to lead on. |
| 8 | Meta lengths | PASS. `metaTitle` 46 chars. `metaDescription` 156 chars, opens on the reader's situation and names both disclosure routes. |
| 9 | Internal links | PASS after edits 1 to 4 and the calculator link. Five links, the maximum, all relative, all verified on disk (four blog posts under `Property/web/content/blog/`, and `rental-income-tax-calculator` registered in `Property/web/src/lib/calculators/registry.ts`). All five were markdown, the only page in the wave written that way; all converted to `<a href="...">text</a>`, which is what the other 14 pages use. |
| 10 | Pipeline leakage | PASS. No HP anchors, section signs, TODOs or build instructions in any rendered field. House-position references appear only in the non-rendered `sources` array, as the spec intends. |

## Sameness detail

- `howWeHelp[0]` opened "A specialist from the partner network reviews what income was received", the same opener as four siblings (couples-splitting, gifting, moving-property, landlord-retirement). Rewritten, and the partner-network fact moved to `howWeHelp[1]` so the page still states the model once, just not in the stock opening slot (edits 6 and 7).
- `challenges[0]` opened "The Let Property Campaign is open to residential landlords", the same opener as first-time-and-accidental-landlords. Reordered to lead on the landlord, not the scheme name.
- Not edited, wave-level: this page closes the intro with the "You get A, B and C" triad used by most of the wave. Consistent with the ruling recorded on `selling-a-buy-to-let.editorial.md`, it is the wave's house pattern and should be varied across the set or not at all. Flagged for the manager.
- No "This page is for you" stock line on this page. No listicle rhythm; challenge and FAQ headings are situation-specific and share no template with the siblings.

## Edit log

1. `challenges[0].body`: markdown link to the disclosure mechanics guide converted to `<a href="/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026">disclosure mechanics guide</a>`.
2. `challenges[1].body`: markdown link converted to an anchor (discovery assessments post). Same target.
3. `challenges[4].body`: markdown link converted to an anchor (rental income tax calculator). Same target.
4. `faqs[3].answer` and `faqs[5].answer`: markdown links converted to anchors (nudge letter playbook, Code of Practice 9 post). Same targets.
5. `stats[2].label` and `howWeHelp[1].body`: "acknowledgment" to "acknowledgement", British English. No meaning change.
6. `challenges[0].body`: "The Let Property Campaign is open to residential landlords, UK resident and non-UK resident, with undisclosed rental income." to "Residential landlords, UK resident and non-UK resident, with undisclosed rental income can use the Let Property Campaign." Removes a sibling-shared opener. Minus 1 word, no change to who is eligible.
7. `howWeHelp[0].body` and `howWeHelp[1].body`: "A specialist from the partner network reviews what income was received" to "That review covers what income was received" (the challenge title already says it is the first review), and "Your accountant prepares and submits the notification" to "A specialist firm from the partner network prepares and submits the notification". Net effect: the stock opener is gone, the partner-network model is still stated once.
8. `howWeHelp[1].body`: "Notifying does not itself create penalty exposure" to "Notifying does not create penalty exposure", and "so the computation and the payment position are ready in time" to "so the computation and payment position are ready in time". Trims to stay inside the band after edit 7.
9. `howWeHelp[3].body`: "The penalty band is argued, not simply filled in" to "The penalty band is argued, not filled in". Same trim purpose.

No figure, rate, date, statute reference or rule was changed. No suspected factual errors found for the manager; Track A's two edits are intact.

## Result

Final word count: 1,199 (band 800 to 1,200).
`metaTitle`: 46 chars. `metaDescription`: 156 chars.
JSON re-validated as parsing after every edit.

VERDICT: PASS
