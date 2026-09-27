# Track A factual QA: salaried-gp-locum-work-tax

Reviewed 2026-09-27 against `docs/medical/house_positions.md` (§1, §1.A, §2.B, §2.C, §5, §8, §9)
and, where the house positions are silent, primary sources on gov.uk, legislation.gov.uk and
pcse.england.nhs.uk. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b and the
S4a QA paragraph.

## 1. Frontmatter and mechanical checks (S4b)

| Check | Finding | Verdict |
|---|---|---|
| Required keys (`slug`, `title`, `date`, `category`, `metaDescription`) | all present | CORRECT |
| Wave keys (`metaTitle`, `h1`, `summary`, `author`, `canonical`, `dateModified`, `faqs`, `keyTakeaways`, `generator`) | all present | CORRECT |
| `metaTitle` ≤ 60 | 50 characters | CORRECT |
| `metaDescription` ≤ 155 | 144 characters | CORRECT |
| `summary` 40 to 60 words | 55 words, answers the question | CORRECT |
| `faqs` 4 to 6 | 6 | CORRECT |
| `keyTakeaways` 3 to 5 | 5 | CORRECT |
| `author` | "Medical Accountants UK Editorial Team", matches newest live Medical post | CORRECT |
| `canonical` | `https://www.medicalaccounts.co.uk/blog/salaried-gp-locum-work-tax`, Medical flat form | CORRECT |
| `category` | "Locum Tax", on the Medical list verbatim | CORRECT |
| `generator` | `claude-opus` | CORRECT |
| `dateModified` = `date` on a new post | both 2026-09-27 | CORRECT |
| Body raw HTML, no markdown | no `##`, `**` or `- ` markers; `<p>`, `<h2>`, `<table>` only | CORRECT |
| Internal links, at most five, flat `/blog/<slug>`, on disk | 4 blog links + 1 calculator link; all four `.md` files present in `Medical/web/content/blog/` | CORRECT |
| Calculator slug | `/calculators/locum-tax-calculator`; `locum-tax-calculator.ts` present in `Medical/web/src/lib/tools/configs/` with matching `slug` | CORRECT |
| Body length 800 to 1,200 words | 1,200 after the edit below, at the upper bound | CORRECT |
| No em-dashes | none | CORRECT |
| YAML parses | re-validated with `yaml.safe_load` after the edit | CORRECT |

## 2. Assertions

### Frontmatter (summary, keyTakeaways, faqs)

| # | Assertion | Source | Verdict |
|---|---|---|---|
| F1 | Register for self assessment by 5 October following the tax year of the first session | gov.uk "Register for Self Assessment"; deadline echoed in §8 machinery | CORRECT |
| F2 | First session June 2026 sits in 2026/27, year ends 5 April 2027, register by 5 October 2027 | arithmetic on F1 | CORRECT |
| F3 | Late notification "could get a penalty" | gov.uk wording | CORRECT |
| F4 | Locum profit stacks on salary, taxed at 40% plus 2% Class 4 for most salaried GPs | HP §5 (40% band £50,271 to £125,140), HP §8 (Class 4 2% above £50,270) | CORRECT |
| F5 | Class 2 no longer a required payment from 6 April 2024 | HP §8 | CORRECT |
| F6 | Payments on account once prior-year liability exceeds £1,000 and less than 80% collected at source | HP §8 (TMA 1970 s.59A) | CORRECT |
| F7 | Form A approved by the practice, Form B to PCSE within 10 weeks; a miss is lost accrual, not lateness | HP §2.C, PCSE verbatim 10-week rule | CORRECT |
| F8 | Contributions paid over no later than the seventh day of the following month | HP §2.C, PCSE verbatim | CORRECT |
| F9 | At 2026/27 rates a company rarely pays for itself on part-time locum income | HP §5 headline point | CORRECT |
| F10 | Dividends are not NHS pensionable | HP §2.C incorporation trap, HP §5 | CORRECT |
| F11 | Gross locum income above £50,000 is in MTD for Income Tax from 6 April 2026; a company is not | HP §9 (£50k from 6 Apr 2026; limited companies out) | CORRECT |
| F12 | Above £100,000 the personal allowance tapers | HP §5 ("personal allowance £12,570, tapered above £100,000") | CORRECT |
| F13 | CT 19% on profits up to £50,000 | HP §5 | CORRECT |
| F14 | Dividends 35.75% in the higher band, £500 allowance, 2026/27 | HP §5, gov.uk tax-on-dividends | CORRECT |
| F15 | Public-sector hirer or agency as fee-payer determines status and operates PAYE/NIC, Chapter 10 Part 2 ITEPA 2003 | HP §1.A | CORRECT |
| F16 | Inside IR35 the company is paid net, so salary/dividend planning is unavailable on that income | HP §1.A | CORRECT |
| F17 | MTD £50,000 from 6 Apr 2026, £30,000 from 6 Apr 2027, £20,000 from 6 Apr 2028, tested on the prior year's return | HP §9 | CORRECT |
| F18 | Salaried employment income alone does not bring you into MTD | HP §9 | CORRECT |

### Body

| # | Assertion | Source | Verdict |
|---|---|---|---|
| B1 | A paid session outside the contract makes you a sole trader alongside employment | HP §1 (GP locum = sole trader SA103) | CORRECT |
| B2 | Salaried pay, tax and Class 1 continue unchanged; the return reports both | HP §1 (salaried GP = employee, PAYE, Class 1) | CORRECT |
| B3 | Return and payment due 31 January after the tax year ends; June 2026 work not declared until January 2028, nearly nineteen months | gov.uk self-assessment deadlines; arithmetic (Jun 2026 to Jan 2028 = 19 months) | CORRECT |
| B4 | "Roughly 58 pence" kept per locum pound | 100% less 40% income tax less 2% Class 4 = 58% | CORRECT |
| B5 | 40% between £50,270 and £125,140, 45% above, 2026/27 | HP §5, gov.uk income-tax-rates | CORRECT |
| B6 | Class 4 6% between £12,570 and £50,270, 2% above | HP §8 | CORRECT |
| B7 | Deductible: private/non-NHS indemnity, GMC retention fee, List 3 subscriptions, relevant CPD, travel between engagements | HP §8, including the CNSGP nuance | CORRECT |
| B8 | No GMC fee figure stated | HP §8 hard rule (fee amount UNVERIFIED, no page may state one) | CORRECT (compliant) |
| B9 | Mileage 55p first 10,000 miles, 25p after, risen from 45p on 6 April 2026 | HP §8, gov.uk AMAP 2026/27 | CORRECT |
| B10 | Home to first site of the day is commuting | HP §8 | CORRECT |
| B11 | Payments on account: trigger, 31 January and 31 July, each 50% of prior-year liability, on top of the balancing payment | HP §8 | CORRECT |
| B12 | "Around one and a half times the tax you expected" in the first serious year | balancing payment (100%) + first POA (50%) = 1.5x | CORRECT |
| B13 | PCSE 10-week rule, forms rejected after 10 weeks, no appeal, accrual not created | HP §2.C verbatim PCSE quote | CORRECT |
| B14 | Tier bands 2026/27: 5.2% to £13,259, 6.5% to £28,854, 8.3% to £35,155, 9.8% to £52,778, 10.7% to £67,668, 12.5% above | HP §2.C table, verified at NHS Employers 2026-08-26 | CORRECT |
| B15 | Rates unchanged, bands moved 1 April 2026; a table can be corrected in-year | HP §2.C | CORRECT |
| B16 | Type 2 self-assessment, 28 February deadline a year in arrears, 2025/26 due 28 February 2027 | HP §2.C (PCSE) | CORRECT |
| B17 | Annual allowance £60,000 for 2026/27, tested across both posts | HP §2.B | CORRECT |
| B18 | In a DB scheme the measure is capitalised growth (pension input amount), not contributions paid | HP §2.B | CORRECT |
| B19 | Unused allowance carries forward from the previous three tax years | HP §2.B | CORRECT |
| B20 | Taper referred to without figures ("where the annual allowance taper is in play") | HP §2.B; no figure asserted, so nothing to source | CORRECT |
| B21 | Table: sole trader "IR35 does not apply, there is no intermediary" | HP §1 | CORRECT |
| B22 | Table: employer NIC 15% above the £5,000 secondary threshold, no Employment Allowance for a sole director | HP §5 | CORRECT |
| B23 | Table: company out of MTD because MTD for ITSA is an income tax regime | HP §9 | CORRECT |
| B24 | Company admin: accounts, CT return, confirmation statement, payroll | Companies Act filing plus CT600; no figures asserted | CORRECT |
| B25 | Company case is stronger for non-pensionable private or medico-legal work, retained profits, or managing the taper | HP §5 headline point (real drivers named there) | CORRECT |
| B26 | Status determination for NHS Trust work sits with the hirer under Chapter 10 Part 2 ITEPA 2003 | HP §1.A | CORRECT |
| B27 | "Set a reminder eight weeks after each block" | practice advice derived from the 10-week rule, not a claimed rule | CORRECT |

No WRONG, no STALE and no UNSOURCED figure found. Nothing was removed.

## 3. Edit log

| # | Location | Before | After | Reason |
|---|---|---|---|---|
| 1 | Body, opening paragraph | "Form A and Form B have to reach PCSE within 10 weeks of the work ending." | "Form A has to be approved by the practice and Form B has to reach PCSE within 10 weeks of the work ending." | HP §2.C: Form A is approved by the practice before Form B is submitted to PCSE. The original implied both forms are sent to PCSE, which the keyTakeaway and the pension section already state correctly. One-clause precision fix. |

Edits: 1. Removals: 0.

## 4. Notes for the editorial track (not defects)

- The MTD keyTakeaway says "gross locum income above £50,000". Qualifying income is gross
  trading plus property income tested on the prior year's return; the FAQ states this fully, so
  the takeaway is a fair shorthand rather than an error.
- The IR35 FAQ says the hirer or fee-payer "determines status and operates PAYE". Strictly the
  hirer determines and the fee-payer deducts; HP §1.A allows the compressed form for a chain.

VERDICT: PASS
