# Editorial and claims QA (Track B): `docs/medical/_wave1/nhs-doctors.json`

Reviewed 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13, S4a ("QA",
"Writers"). Track A (`nhs-doctors.factual.md`) PASSED with 4 edits; all four are intact and
untouched here. No figure, rate, date or rule was changed by this pass.

Sameness baseline read: the other four `docs/medical/_wave1/*.json` rows and the live
`AudienceStage` objects in `Medical/web/src/app/for-{consultants,gps,junior-doctors,locum-doctors}/page.tsx`.

## Findings

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 94 words; the multi-source NHS doctor position is stated in the first sentence and exemplified in the next four. |
| 2 | Word band 800 to 1,200 across intro, challenges, howWeHelp, faqs, titles and questions included | PASS. 1,191 (was 1,199, one word of headroom, now eight). |
| 3 | AI tells and sameness | TWO FIXED. (a) Four of the five wave-1 medical rows opened "You are ..."; this one did too. (b) The intro closed on a three-item triad ("what a Type 1 certificate is, why a Form B ..., and how the ... taper behaves"), the same closer shape as `salaried-gps.json`. Both rewritten. No "You get A, B and C" closer anywhere. Section titles, challenge framing and FAQ questions are distinct from all four siblings and from the four live pages (the live pages are third person and service-listed; these are second person and situation-led, which is the intended wave-1 voice, not sameness). |
| 4 | Thin or padded sections; FAQ answers restating the question; answers 40 to 120 words | ONE FIXED. `howWeHelp[2]` was 38 words, under the floor and the thinnest block on the page; extended by 9 words of method, no new claim or rule. All five FAQ answers now 52 to 89 words, none restates its question. `faqs[4]` ("Which page should I read next?") is routing copy, which is this umbrella page's job, and is kept. |
| 5 | Banned claims (case-insensitive) | ONE FIXED. "award" appeared twice in `faqs[1]` ("a pay award, a merit award"). Replaced with "a pay uplift", which carries the same meaning and asserts no rule. No chartered / ICAEW / ACCA / CIOT / "our accountants" / "we are accountants" / "our team" / "regulated" / personal names / prices or fees / "advice" / "advise" / turnaround promise anywhere. "Your accountant" and "A specialist" are house phrasings already used in `medical-companies.json` and `gp-partners.json` and are not on the list. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash. British spellings throughout ("specialist", "capitalised", "practise/practice" used correctly). Every rate and threshold on the page is stated as 2026/27. |
| 7 | `metaTitle` ≤ 60, `metaDescription` ≤ 160 | PASS. 43 and 148. |
| 8 | Internal links: at most five, relative, exist on disk, all `<a href="...">text</a>` | PASS at the cap. Exactly five, all relative anchors: `/calculators/nhs-pension-scheme-pays` (`Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` behind `app/calculators/[slug]`), `/for-consultants`, `/for-locum-doctors`, `/for-gps`, `/for-junior-doctors` (all four directories present). |
| 9 | Pipeline leakage | PASS. No wave, map, agent, house-positions or QA reference in any rendered field; the `sources` array is the non-rendered field the spec provides for it. |

## Linking one of the four new pages

**None added, and none should be.** The page is already at the five-link cap with the four
existing hubs plus the Scheme Pays calculator, and the four new wave-1 pages
(`/for-gp-partners`, `/for-salaried-gps`, `/for-retiring-doctors`, `/for-medical-companies`)
do not exist on disk yet, so any of them would fail the "each exists" check today. If a slot
is freed later, `/for-gp-partners` is the strongest candidate: `challenges[4]` and the
partnership half of the intro point at it, and it currently routes to the practice-level
`/for-gps` page instead. That is a cross-page sweep decision, not a single-page edit.

## Edit log

| # | Location | Before | After | Why |
|---|---|---|---|---|
| B1 | `intro`, first sentence | "You are an NHS doctor with money arriving from more than one place." | "As an NHS doctor, your money arrives from more than one place." | Stock opener. Four of the five wave-1 medical rows began "You are ...". Audience still named in the first four words. |
| B2 | `intro`, last sentence | "That needs someone who knows what a Type 1 certificate is, why a Form B carries a ten-week clock, and how the annual allowance taper behaves." | "That needs someone who already knows why a Form B carries a ten-week clock." | Triad closer, listicle rhythm, and the same closer shape as `salaried-gps.json`. The Type 1 certificate and the taper are both covered at length in `challenges`, so nothing is lost. |
| B3 | `faqs[1].answer` | "so a pay award, a merit award or a move up the scale can push it" | "so a pay uplift or a move up the scale can push it" | Banned string "award", twice. Same meaning, no rule or figure touched. |
| B4 | `howWeHelp[2].body` | "... Earlier returns are amended where an under-claim is material." | "... Earlier returns are amended where an under-claim is material, with the evidence for each claim gathered first." | Section was 38 words, under the answer floor and the thinnest block on the page. Method only, no new claim. |

## Suspected errors noted, not changed

None. No figure, rate, date or rule on the page looked wrong on this pass, and Track A had
already corrected the two that were.

## Final numbers

- Word count across intro, challenges, howWeHelp and faqs, titles and questions included: **1,191** (band 800 to 1,200)
- `metaTitle`: **43** characters (limit 60)
- `metaDescription`: **148** characters (limit 160)
- Internal links: **5** (cap 5), all relative anchors, all targets present on disk
- JSON re-validated after the edits: parses, all eleven top-level keys intact

VERDICT: PASS
