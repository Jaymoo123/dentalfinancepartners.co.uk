# Factual QA (Track A): `docs/medical/_wave1/nhs-doctors.json`

Reviewed 2026-09-27. Tie-breaker `docs/medical/house_positions.md` (HP), then primary law.
Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13, S4a, "QA".

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | stats | Pension annual allowance £60,000, 2026/27 | HP §2.B; gov.uk pension-schemes-rates (2026 to 2027) | CORRECT |
| 2 | stats | Adjusted income £260,000 where tapering starts | HP §2.B | CORRECT |
| 3 | stats | 10 weeks to pension freelance locum work | HP §2.C (PCSE, verbatim 10-week rule) | CORRECT |
| 4 | stats | Mileage 55p first 10,000 business miles 2026/27 | HP §8; AMAP 2026/27 | CORRECT |
| 5 | intro | Type 1 certificate exists; Form B carries a ten-week clock | HP §2.C | CORRECT |
| 6 | intro | Annual allowance taper behaves as described (no figure) | HP §2.B | CORRECT |
| 7 | ch1 | AA £60,000 for 2026/27 | HP §2.B | CORRECT |
| 8 | ch1 | Taper where threshold income > £200,000 and adjusted income > £260,000 | HP §2.B (both limbs, AND) | CORRECT |
| 9 | ch1 | Reduces £1 for every £2 above, floor £10,000 | HP §2.B | CORRECT |
| 10 | ch1 | DB measure is the pension input amount, capitalised growth, not contributions | HP §2.B | CORRECT |
| 11 | ch1 | Unused allowance carries forward three years | HP §2.B | CORRECT |
| 12 | ch1 | NHSBSA statements often late and revised | HP §2.D (the reason the 2 May limb exists) | CORRECT |
| 13 | ch1 | Link `/calculators/nhs-pension-scheme-pays` | `Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` present, `calculators/[slug]` route present | CORRECT |
| 14 | ch2 | NHS pay has tax and Class 1 at source | HP §1 (salaried GP / consultant PAYE Class 1) | CORRECT |
| 15 | ch2 | Class 4 at 6% to £50,270, 2% above | HP §8 | CORRECT |
| 16 | ch2 | "Only NHS employment is pensionable" | HP §2.C: GP practitioner income (Type 1/Type 2/locum) is pensionable and is not employment | WRONG, corrected (E1) |
| 17 | ch2 | Dividends from a company build no NHS accrual | HP §2.C | CORRECT |
| 18 | ch2 | Link `/for-consultants` | `Medical/web/src/app/for-consultants/` exists | CORRECT |
| 19 | ch3 | Statutory registration fees deductible against salary | HP §12 (ITEPA 2003 s.343) | CORRECT |
| 20 | ch3 | Subscriptions to List 3 bodies | HP §12 (s.344; List 3 used only for approval, as here) | CORRECT |
| 21 | ch3 | BMA relief restricted to 85% | HP §12, List 3 entry verbatim | CORRECT |
| 22 | ch3 | "the flat rate for your occupational group" with no single figure | HP §11, §11.A (no single NHS rate; do not state one) | CORRECT |
| 23 | ch3 | Indemnity for private and non-clinical cover | HP §8 (CNSGP covers NHS GP clinical negligence) | CORRECT |
| 24 | ch3 | Mileage 55p then 25p, 2026/27 | HP §8 | CORRECT |
| 25 | ch3 | Home to first site is commuting | HP §8 | CORRECT |
| 26 | ch4 | Freelance GP locum: Form A approved by practice, then Form B to PCSE | HP §2.C | CORRECT |
| 27 | ch4 | Work ended more than ten weeks ago cannot be pensioned; accrual lost, not a penalty | HP §2.C verbatim | CORRECT |
| 28 | ch4 | Partners file Type 1 Annual Certificate, salaried/solo GPs Type 2 self assessment | HP §2.C | CORRECT |
| 29 | ch4 | Both by 28 February a year in arrears | HP §2.C (PCSE, verified 2026-08-26) | CORRECT |
| 30 | ch4 | Link `/for-locum-doctors` | directory exists | CORRECT |
| 31 | ch5 | GP partner taxed on profit share, not drawings | HP §1 | CORRECT |
| 32 | ch5 | Practice files SA800, share to partnership pages, Class 4 on top | HP §1, §8 | CORRECT |
| 33 | ch5 | Practice income reconciled to PCSE, notional rent included | HP §3, §4 (premises, notional/cost rent) | CORRECT |
| 34 | ch5 | Link `/for-gps` | directory exists | CORRECT |
| 35 | hw1 | P60/P45, SA800 share, one return, Class 4 and student loan checked | HP §1, §8 | CORRECT |
| 36 | hw2 | Mandatory and voluntary Scheme Pays; election deadline; extended limb where a revised statement is issued on or after 2 May | HP §2.D (FA 2004 s.237BA; earlier of 3 months or 6 years) | CORRECT |
| 37 | hw3 | Correct flat rate for occupational group rather than a generic figure; each subscription checked against List 3 | HP §11, §11.A, §12 | CORRECT |
| 38 | hw4 | Corporation tax, 2026/27 dividend rates, cost of a company, NHS accrual given up (no figures) | HP §5, §2.C; dividend 2026/27 10.75/35.75/39.35 not quoted | CORRECT |
| 39 | hw4 | Ten-week locum window tracked | HP §2.C | CORRECT |
| 40 | faq1 | Return needed once income arrives PAYE has not dealt with | TMA 1970 s.7 | CORRECT |
| 41 | faq1 | Registration by 5 October after the tax year; return by the following 31 January | TMA 1970 s.7; gov.uk register-for-self-assessment. HP silent | CORRECT (source added, E3) |
| 42 | faq1 | Payments on account where "the balance" exceeds £1,000 and less than 80% collected at source | HP §8: the test is the **prior year's liability**, not the balancing payment | WRONG, corrected (E2) |
| 43 | faq1 | Half again that January, half on 31 July | HP §8; TMA 1970 s.59A | CORRECT |
| 44 | faq1 | Link `/for-junior-doctors` | directory exists | CORRECT |
| 45 | faq2 | Pension input amount is the increase in capitalised value; pay award can breach £60,000 with contributions unchanged | HP §2.B | CORRECT |
| 46 | faq2 | Taper above £200,000 / £260,000 to a £10,000 floor | HP §2.B | CORRECT |
| 47 | faq3 | Dividends not pensionable; consultant private work never pensionable however structured | HP §2.C | CORRECT |
| 48 | faq3 | "the practitioner routes for GPs" are pensionable | HP §2.C | CORRECT |
| 49 | faq4 | PCSE will not pension work ended more than 10 weeks ago; late forms rejected; accrual gone | HP §2.C verbatim | CORRECT |
| 50 | faq5 | Navigational only, no factual assertion | n/a | CORRECT |

No figure on the page is UNSOURCED or STALE. Checked for the known traps and none is present:
no GMC fee amount (HP §8 bans one), no single NHS uniform figure (HP §11.A), no £40,000 allowance
or £4,000 floor, no 9% Class 4, no 45p mileage, no Employment Allowance claim for a practice
(HP §8.A), no 23.7% employer rate misused (HP §2.C).

**Sources array.** Covers every load-bearing claim. One gap found and closed: the 5 October
registration and 31 January filing dates sat in `faqs` with no entry (HP is silent on both);
a TMA 1970 s.7 / gov.uk line was added.

**Internal links.** All five exist on disk: `Medical/web/src/app/for-consultants`, `for-gps`,
`for-junior-doctors`, `for-locum-doctors`, and the calculator slug
`Medical/web/src/lib/tools/configs/nhs-pension-scheme-pays.ts` behind `app/calculators/[slug]`.

## Edit log

| # | Location | Before | After | Why |
|---|---|---|---|---|
| E1 | `challenges[1].body` | "Only NHS employment is pensionable, so anything drawn..." | "Only NHS work is pensionable, and for GPs only through the practitioner routes, so anything drawn..." | HP §2.C: GP Type 1, Type 2 and freelance locum income is pensionable and is not employment. As written the sentence was wrong for three of the four roles the page serves. |
| E2 | `faqs[0].answer` | "where the balance exceeds £1,000" | "where the prior year's liability exceeds £1,000" | HP §8 and TMA 1970 s.59A: the £1,000 test is the prior year's income tax liability, not the balancing payment. |
| E3 | `sources` | no entry for the self assessment dates | added TMA 1970 s.7 + gov.uk line, flagged HP silent | Coverage gap in the sources array. |
| E4 | `intro` | trailing sentence "This page covers what every NHS role shares, then points you to yours." removed | removed | E1 took the page to 1,207 words against the 800 to 1,200 band; the sentence is duplicated by faq5. Now 1,199. |

No other prose changed. JSON re-parsed clean after the edits. Word count 1,199 (intro, challenge
and howWeHelp titles and bodies, FAQ questions and answers). metaTitle 43 chars, metaDescription
148 chars. No em-dashes.

VERDICT: PASS
