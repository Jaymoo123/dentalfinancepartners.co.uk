# Track B editorial and claims QA: first-time-and-accidental-landlords

Page: `docs/property/_wave1/first-time-and-accidental-landlords.json`
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a ("QA", "Writers").
Siblings compared: the other 14 files in `docs/property/_wave1/`.
Reviewed 2026-09-27. Track A verdict on this page: PASS, 0 edits.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | Situation answered inside the first 150 words of `intro` | PASS. Intro is 123 words end to end; the situation is named in sentences one and two ("You did not plan to be a landlord... now your old home is let"), and the tax consequence lands in sentence three. |
| 2 | 800 to 1,200 words across intro, challenges, howWeHelp, faqs | PASS. 1,181 after edits (1,165 before; the two rewrites added 16). |
| 3 | AI tells and sameness across the 15 | Two repeated templates found and fixed (see edit log). No "This page is for you" (present on two siblings, not this one). No "You get A, B and C" triad closing the intro; this page closes on "the sequence, the dates that bite, and an introduction", which is distinct from all 14 siblings. Only two sentences duplicate a sibling verbatim, and both are the mandated `PARTNER_NETWORK_SENTENCE` consent wording from `Property/web/src/config/site.ts:39`, quoted verbatim by spec requirement. Left alone. |
| 4 | Thin or padded sections, FAQ answers restating the question, answers under 40 or over 120 words | PASS. FAQ answers 58, 60, 60, 60, 66. None opens by restating the question; each opens on the answer ("Yes, if...", "It depends on your costs", "It reduces relief over time", "From 6 April 2026...", "It is fixable"). Challenge bodies 60 to 87. howWeHelp bodies 38 to 50 after edits; the shortest was 30 before. No padding found. |
| 5 | Banned claims, case-insensitive | PASS. No "chartered", "ICAEW", "ACCA", "CIOT", "our accountants", "we are accountants", "our team", "award", "regulated", no personal name, no price or fee, no "advice" or "advise", no turnaround promise. The page uses "a specialist reviews" and "your accountant prepares", both permitted framings. |
| 6 | No em-dashes, British English, 2026/27 leads | PASS. No em-dash or en-dash anywhere in the file. British spellings throughout ("penalised", "recognised", "apportioned"). Every rate and threshold given for 2026/27 or with its own commencement date. |
| 7 | `metaTitle` 60, `metaDescription` 160 | PASS. metaTitle 49 characters, metaDescription 153. |
| 8 | Internal links: at most five, relative, exist on disk, written as anchors | PASS after edits. Exactly five, all relative, all five confirmed on disk by Track A. All five were markdown links and were converted to `<a href="...">text</a>`. |
| 9 | Pipeline leakage | PASS. No wave, agent, QA, prompt or file-path references in rendered fields. The `sources` array is spec-required and is not rendered by the template. |

## Edit log

Five link conversions and two rewrites. No figure, rate, date or rule was changed.

| # | Field | Before | After | Why |
|---|---|---|---|---|
| 1 | `challenges[0].body` | `[the accidental landlord guide](/blog/...)` and `[the first-time landlord guide](/blog/...)` | `<a href="/blog/...">the accidental landlord guide</a>` and `<a href="/blog/...">the first-time landlord guide</a>` | Check 8, markdown link to anchor. |
| 2 | `challenges[1].body` | `[rental income tax calculator](/calculators/rental-income-tax-calculator)` | anchor form, same href and text | Check 8. |
| 3 | `challenges[2].body` | `[Section 24 calculator](/calculators/section-24-calculator)` | anchor form, same href and text | Check 8. |
| 4 | `challenges[4].body` | `[MTD checker](/calculators/mtd-checker)` | anchor form, same href and text | Check 8. |
| 5 | `howWeHelp[1].body` | "A specialist reviews the rent, finance costs, repairs, agent fees, insurance and the pre-letting spending that is often missed, then compares the £1,000 allowance against real expenses for your year." | "The rent, finance costs, repairs, agent fees, insurance and the pre-letting spending that is often missed all go into one schedule, and the £1,000 allowance is then compared against real expenses on your own figures for the year." | Check 3. Three consecutive howWeHelp bodies opened on the identical five-word template "A specialist reviews", the highest count in the wave. Same content, same allowance figure, varied opening. Also lifts the section from 30 to 38 words, the thinnest block on the page. |
| 6 | `howWeHelp[2].body` | "A specialist reviews whether your gross figures put you in the April 2026, 2027 or 2028 cohort, and what your share is if the property is jointly owned. Your accountant prepares the digital records and the quarterly filing pattern in recognised software." | "Your gross figures decide whether you fall into the April 2026, 2027 or 2028 cohort, and a jointly owned property is tested on your share rather than the whole. From there the digital records and the quarterly filing pattern are set up in recognised software before the first quarter runs." | Check 3. Removes the third "A specialist reviews" and the second "Your accountant prepares" in the same section. Cohort dates, the joint-owner share rule and the software point are unchanged. |

After the edits "A specialist reviews" appears once and "Your accountant prepares" once, both in `howWeHelp[0]`.

## Notes, no edit made

1. `howWeHelp[3]` ("An introduction, not a sales process") is a consent and call-to-action block rather than a fourth substantive service point. Twelve of the fourteen siblings use a substantive fourth item; only `property-company-profit-extraction.json` does the same thing. The consent sentence is also rendered by the template through `PARTNER_NETWORK_SENTENCE`, so the page will carry it twice once built. Replacing the block would mean writing new substantive claims, which is outside Track B, so it is flagged for the integrator or a writer pass rather than fixed here. Not a fail on any listed criterion.
2. No suspected factual errors. Every figure matched Track A's verdict table and none was touched.

## Final numbers

- Words across intro, challenges, howWeHelp and faqs: **1,181** (band 800 to 1,200)
- `metaTitle`: **49** characters (limit 60)
- `metaDescription`: **153** characters (limit 160)
- Internal links: **5** (limit 5), all relative anchors, all on disk
- JSON re-validated after all six edits: parses

VERDICT: PASS
