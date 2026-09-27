# Editorial and claims QA (Track B) — holiday-let-and-serviced-accommodation

Reviewed 2026-09-27 against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers"). Sibling set for the sameness check: the other 14 `docs/property/_wave1/*.json`.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered in first 150 words of `intro` | PASS. The whole intro is 128 words and the situation lands in sentence one. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | WAS 1,206 (over). FIXED, now 1,200. |
| 3 | AI tells and sameness across siblings | 3 defects found, all fixed (edits 1 to 3). |
| 4 | Thin or padded sections, FAQ answers | PASS. Challenge bodies 86 to 101 words, howWeHelp 43 to 54, FAQ answers 67 to 77, all inside 40 to 120. No FAQ answer restates its question. |
| 5 | Banned claims (case-insensitive) | PASS. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / award / regulated / personal name / price / fee-for-our-work / advice / advise / turnaround promise. The only "fee" is "cleaning and booking fees", which is the guest's payment measured for VAT, not our pricing. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. Zero em-dashes. British spelling throughout. The current-year figures are stated as 2026/27. |
| 7 | Meta lengths | PASS. `metaTitle` 47 of 60, `metaDescription` 154 of 160. |
| 8 | Internal links: at most five, relative, exist on disk, anchor markup | 5 links, all relative, all verified on disk by Track A. All five were bare paths in prose. Converted to `<a href="...">text</a>` (edits 4 to 8). |
| 9 | Pipeline leakage | PASS. No brief, map, wave, prompt or house-positions references in rendered fields. The `sources` array is the intended non-rendered field. |

### Sameness detail (check 3)

- "This page is for you if..." opened the intro. Two siblings (`landlord-retirement-and-succession`, `landlord-self-assessment-and-mtd`) use the same "This page is for..." construction. Removed; the intro now opens on direct address like the other twelve.
- "A specialist from our partner network" appeared in the intro and in three siblings (`landlord-self-assessment-and-mtd`, `portfolio-landlords-incorporating-a-partnership`, `selling-a-buy-to-let`). Cut to "A specialist".
- "You get ..." closed the intro, matching five siblings. Rewritten as "The output is ...".
- `howWeHelp` items 2 and 4 both opened "Your accountant prepares" verbatim, a phrase used in eleven siblings. Item 4 reopened on a different construction. Items 1 and 3 open "A specialist reviews" / "A specialist separates" but are not consecutive, so left.
- Listicle rhythm: challenges carry five distinct subjects with narrative bodies, not bullet stubs. No change needed.

## Edit log

1. `intro` — rewritten opening: "This page is for you if you let a cottage..." to "You let a cottage...". Direct address, removes the shared stock phrase.
2. `intro` — "A specialist from our partner network starts with three things:" to "A specialist starts with"; the enumerated "three things" framing dropped. Same three inputs listed, unchanged.
3. `intro` — closing "You get a written read of your 2026/27 position and the reliefs that survived." to "The output is a written read of your 2026/27 position and the reliefs that survived."
4. `challenges[0]` — bare path converted: "Fuller walkthrough at /blog/.../abolition-of-furnished-holiday-lettings-..." to `Fuller walkthrough in <a href="...">the FHL abolition guide</a>.`
5. `challenges[1]` — bare path converted to `<a href="/calculators/section-24-calculator">Section 24 calculator</a>`.
6. `challenges[2]` — bare path converted to `<a href="/calculators/capital-allowances-calculator">capital allowances calculator</a>`.
7. `howWeHelp[3]` — rewritten opening to break the duplicate "Your accountant prepares", and bare path converted to `<a href="/calculators/rental-income-tax-calculator">rental income tax calculator</a>`.
8. `faqs[4]` — bare path converted to `<a href="/blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed">the short-let income guide</a>`.
9. `challenges[0]` — "are taxed as an ordinary UK property business" to "are now an ordinary UK property business" (trim, meaning unchanged).
10. `challenges[0]` — "preserve capital gains relief for qualifying disposals whose trading period predates abolition" to "preserve capital gains relief where the trading period predates abolition" (trim).
11. `challenges[1]` — "a basic-rate credit against the tax bill rather than a deduction" to "a credit against the tax bill, not a deduction" (trim; the 20% basic-rate figure is stated in the preceding sentence and is untouched).
12. `challenges[2]` — "is not a capital allowances claim" to "is not a claim" (trim; the preceding clause already names the restriction).
13. `challenges[3]` — "Where several units run through different names, HMRC can direct that artificially separated businesses be treated as one." to "HMRC can direct that units split across different names are one business." (trim).
14. `howWeHelp[1]` — "identifies the month you would cross the threshold on current trading" to "identifies the month you would cross the threshold" (trim).
15. `challenges[0]` — anchor text "the guide to FHL abolition" to "the FHL abolition guide" (final one-word trim to hit the band).

No figure, rate, date or rule was changed. No suspected factual errors to report; Track A cleared all 34 assertions.

## Note for the integrator

No sibling in `_wave1` uses anchor markup; all fifteen were written with bare paths in prose. This page is now the only one with `<a href>` in body text, per the Track B brief. If the `for/[slug]` template (T1) renders these bodies as plain text rather than HTML, the anchors will show as literal markup and the convention must be settled estate-wide before the wave ships.

## Final numbers

- Word count across intro, challenges, howWeHelp, faqs: **1,200** (band 800 to 1,200)
- `metaTitle`: 47 characters (limit 60)
- `metaDescription`: 154 characters (limit 160)
- Internal links: 5 (limit 5), all relative, all anchors, all verified on disk
- JSON re-validated after every edit; parses.

VERDICT: PASS
