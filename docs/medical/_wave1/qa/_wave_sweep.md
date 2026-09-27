# Wave 1 editorial sweep, five Medical audience pages

Date: 2026-09-27. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 13, S4a.
Model report: `docs/property/_wave1/qa/_wave_sweep.md`.
Scope: the five `docs/medical/_wave1/*.json` files only. No commit, no database, no code.
The four live hubs (`Medical/web/src/app/for-consultants|for-gps|for-junior-doctors|for-locum-doctors/page.tsx`)
were read for the sameness scan and for intro construction, and were not touched.
No figure, rate, date or rule was changed on any page.

## What changed, per page

| Page | Change |
|---|---|
| gp-partners | Intro opener off "You are ..." (three of the five started that way). `challenges1` Class 4 and Class 2 wording reworded, `challenges2` Type 1 deadline sentence reworded, both to clear the twelve shared sequences with salaried-gps. `challenges2` contribution-band uplift sentence reworded to clear three shared with the live `/for-locum-doctors`. `faq3` NHS Act 2006 shareholder-condition sentence reworded to clear four shared with medical-companies. `challenges4` "Price one risk" became "Weigh one risk" and the trailing "not the price" in `faq5` was cut, so no page carries a banned-token false positive. |
| medical-companies | `challenges0` corporation-tax clause and `challenges1` off-payroll sentence reworded to clear fifteen shared sequences with the live `/for-locum-doctors`. `faq0` dividend-rate-rise clause reworded to clear three shared with the live `/for-consultants`. `challenges2` closing sentence shortened to hold the word band, which was 1,203 before the sweep. |
| nhs-doctors | `challenges4` link swapped from `/for-gps` to the new sibling `/for-gp-partners`, which is where partner-level profit-share work belongs; the link count stays at five. `challenges2` mileage clause and `faq3` 10-week sentence reworded to clear six shared sequences with the live `/for-locum-doctors`. |
| retiring-doctors | Intro opener off "You are ..."; intro closer reworded off the "X, and Y decides the order" construction it shared with salaried-gps. `challenges2` and `faq2` taper sentences reworded to clear thirteen shared sequences with the live `/for-gps`. |
| salaried-gps | `challenges1` annual allowance and pension input sentences, and the `challenges2` and `faq2` mileage clauses, reworded to clear sixteen shared sequences with nhs-doctors. `challenges3` and `faq3` freelance locum and 10-week sentences, and the `challenges5` corporation tax and dividend clause, reworded to clear thirteen shared with the live `/for-locum-doctors` and four with `/for-consultants`. |

### Consent sentence

The site consent wording (`Medical/web/src/config/site.ts`, `leadConsentText`: "To answer
your enquiry, your details may be shared with a firm from our specialist partner network
...") does not appear in any `intro`, `challenges`, `howWeHelp` or `faqs` body on any of
the five. Nothing to remove. The template renders it in the form.

### Repeated openers

Counting body openers across `challenges` and `howWeHelp`: "A specialist reviews" opens
two bodies (medical-companies `howWeHelp0`, nhs-doctors `howWeHelp1`), "A specialist from
the partner network" opens one (salaried-gps `howWeHelp0`), and "Your accountant prepares"
opens none (nhs-doctors uses it mid-sentence inside `howWeHelp0`). No page has two
consecutive items with the same opener, and no opener runs on more than half the set.
No change was needed here.

### Link syntax and targets

Every internal link in every body string is `<a href="/path">text</a>`. No bare
parenthesised paths anywhere in the rendered fields. 22 anchors in total, all resolved on
disk:

- 11 blog hrefs against `Medical/web/content/blog/<slug>.md` (Medical blog paths are flat), all present;
- 4 calculator hrefs (`nhs-pension-scheme-pays`, `gp-partner-drawings-planner`,
  `private-practice-incorporation`, `nhs-pension-annual-allowance`) against the `slug`
  field in `Medical/web/src/lib/tools/configs/*.ts`, all present;
- 6 hub hrefs against `Medical/web/src/app/for-*/page.tsx`, all present;
- 1 hub href to the new sibling `/for-gp-partners`, which does not exist yet and is built
  by the integrator with the rest of this wave.

Links per page: nhs-doctors 5, gp-partners 5, medical-companies 4, retiring-doctors 4,
salaried-gps 4. The nhs-doctors umbrella was already at the five-link ceiling, so the new
sibling went in by swapping out `/for-gps`, not by adding a sixth.

## Sameness scan

Method: all 8-word sequences across `intro`, `challenges`, `howWeHelp` and `faqs` (titles
and questions included), tags stripped, lower-cased, punctuation stripped, compared for
every one of the 10 pairs within the five and every one of the 20 pairs against the four
live hubs. Excluded as shared by design: statute names and citations (NHS Act 2006,
Finance Act 2004, Finance Act 2022, ITEPA 2003, ITTOIA 2005, CTA 2009, CTA 2010, TMA 1970).
The consent sentence appears nowhere and needed no exclusion.

Before the sweep, ten pairs exceeded two shared sequences:

| Pair | Shared | Cause | Fix |
|---|---|---|---|
| nhs-doctors / salaried-gps | 16 | the annual allowance and taper sentence, "pension input amount, the capitalised growth in your benefits", the mileage clause | reworded on salaried-gps (nhs-doctors is the umbrella and keeps the canonical wording); mileage reworded on both, so neither collides with the live hub either |
| medical-companies / live for-locum-doctors | 15 | off-payroll dates and the Status Determination Statement sentence, the corporation-tax band clause | reworded on medical-companies |
| retiring-doctors / live for-gps | 13 | the taper sentence, in both `challenges2` and `faq2` | reworded on retiring-doctors, twice, same rule |
| salaried-gps / live for-locum-doctors | 13 | the freelance locum pensioning sentence, the 10-week sentence, the dividend-rate clause | reworded on salaried-gps |
| gp-partners / salaried-gps | 12 | Class 4 band wording, "Class 2 stopped being a required payment", "28 February a year in arrears" | reworded on gp-partners |
| nhs-doctors / live for-locum-doctors | 6 | the mileage clause, the 10-week sentence | reworded on nhs-doctors |
| gp-partners / medical-companies | 4 | the NHS Act 2006 shareholder conditions, worded identically | reworded on gp-partners |
| salaried-gps / live for-consultants | 4 | dividend rates and the corporation-tax band clause | reworded on salaried-gps |
| gp-partners / live for-locum-doctors | 3 | "bands uplifted each 1 April by the previous September's CPI" | reworded on gp-partners |
| medical-companies / live for-consultants | 3 | "the dividend rate rise on 6 April 2026 narrowed it further" | reworded on medical-companies |

After the sweep, the highest remaining count on any pair is two:

| Pair | Shared | Left as is because |
|---|---|---|
| gp-partners / nhs-doctors | 2 | the payments-on-account test ("£1,000 ... less than 80% was collected at source"), TMA 1970 s.59A |
| nhs-doctors / live for-gps | 2 | "the annual allowance is £60,000 for 2026/27" |
| nhs-doctors / retiring-doctors | 1 | "the increase in the capitalised value of your" |

**No pair, within the five or against the four live hubs, shares more than two 8-word sequences.**

## Invariants after the sweep

| Page | Words | metaTitle | metaDesc | Links | All anchors | em-dash | Banned claims | JSON |
|---|---:|---:|---:|---:|---|---|---|---|
| gp-partners | 1,198 | 52 | 152 | 5 | yes | none | none | parses |
| medical-companies | 1,199 | 46 | 155 | 4 | yes | none | none | parses |
| nhs-doctors | 1,195 | 43 | 148 | 5 | yes | none | none | parses |
| retiring-doctors | 1,200 | 48 | 151 | 4 | yes | none | none | parses |
| salaried-gps | 1,198 | 49 | 157 | 4 | yes | none | none | parses |

Word count is across `intro`, `challenges`, `howWeHelp` and `faqs`, titles and questions
included, tags stripped. Band 800 to 1,200: all five inside it, and two sit close to the
ceiling, so any later addition needs an offsetting trim. `metaTitle` limit 60,
`metaDescription` limit 160: all inside. The banned-claim sweep covered chartered, ICAEW,
ACCA, CIOT, "our accountants", "we are accountants", "our team", award, regulated, advice,
advise, adviser, advisory, prices and fee quotes, and personal names: no hit on any page.

## Note for the integrator

`/for-gp-partners` is referenced from nhs-doctors `challenges4` and does not exist on disk
yet. The five pages are built together as sibling `/for-<slug>` routes, so it resolves at
build. If the gp-partners page is dropped from the wave, that link has to go back to
`/for-gps`.

VERDICT: READY
