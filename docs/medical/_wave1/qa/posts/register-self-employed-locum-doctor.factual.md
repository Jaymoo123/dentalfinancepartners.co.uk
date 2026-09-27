# Track A factual QA: register-self-employed-locum-doctor

Reviewed 2026-09-27 (Opus). Sources: `docs/medical/house_positions.md` §1, §2.C, §8, §9;
gov.uk and PCSE where the house positions are silent. Spec: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S4b.

## Assertions

| # | Location | Assertion | Authority | Verdict |
|---|---|---|---|---|
| 1 | FM metaDescription, KT1, FAQ1, body intro, H2.1 | Tell HMRC by 5 October following the end of the tax year the first paid session fell in | gov.uk "Register for Self Assessment" / "you must tell HMRC by 5 October" | CORRECT |
| 2 | FAQ1, body intro, H2.1 | June 2026 session sits in 2026/27, year ends 5 April 2027, deadline 5 October 2027 | arithmetic on the 6 April to 5 April tax year | CORRECT |
| 3 | KT1, FAQ2, H2.1 | Register once income from the work exceeds £1,000 in a tax year; the test is income, not profit | gov.uk sole-trader registration / £1,000 trading allowance | CORRECT |
| 4 | H2.1 | A first session in April gives about eighteen months; a March session barely seven | arithmetic to 5 October | CORRECTED (was "barely six") |
| 5 | FAQ3, H2.2, KT2 | Registration produces a Unique Taxpayer Reference, ten digits, issued by post, via the self assessment service with a Government Gateway account | gov.uk self assessment registration | CORRECT |
| 6 | FAQ1 | "Registering earlier costs nothing and starts nothing" | contradicted by FAQ3 and gov.uk (a registered record attracts a notice to file) | CORRECTED |
| 7 | FAQ4, H2.3, intro | Online return and the tax both due 31 January following the tax year; paper 31 October; 2025/26 = 31 Oct 2026 paper, 31 Jan 2027 online | gov.uk Self Assessment deadlines | CORRECT |
| 8 | KT2, FAQ4, H2.3 | Payments on account where the bill exceeds £1,000 and less than 80% was collected at source, on 31 January and 31 July, each half the previous year's liability | HP §8; TMA 1970 s.59A | CORRECT |
| 9 | H2.3 | The first January covers the balancing payment and the first payment on account together | TMA 1970 s.59A/s.59B | CORRECT |
| 10 | KT4, H2.3 | Class 4 NIC 6% on profits £12,570 to £50,270, 2% above, 2026/27 | HP §8 (gov.uk, "Tax year 2026 to 2027") | CORRECT |
| 11 | KT4, H2.3 | Class 2 no longer a required payment; profits at or above the small profits threshold treated as paid, record protected | HP §8 (from 6 Apr 2024) | CORRECT |
| 12 | H2.3 | Voluntary Class 2 £3.65 a week for those below the threshold | HP §8 (2026/27) | CORRECT |
| 13 | Intro, H2.2 | A salaried NHS post continues under PAYE and Class 1; the return reports both sources | HP §1 | CORRECT |
| 14 | KT3, FAQ5, H2.4, intro | Form A approved by the practice, Form B to PCSE, work ended more than 10 weeks ago cannot be pensioned and the form is rejected | HP §2.C (PCSE, verbatim) | CORRECT |
| 15 | FAQ5, H2.4 | Contributions paid over no later than the seventh day of the following month | HP §2.C (PCSE) | CORRECT |
| 16 | KT3, H2.4 | A missed window is lost accrual, not a late filing penalty | HP §2.C | CORRECT |
| 17 | H2.4 | Type 2 self assessment for salaried or solo GP income, 28 February a year in arrears, 2025/26 due 28 February 2027 | HP §2.C (PCSE) | CORRECT |
| 18 | H2.4 | Tiers sit on pensionable pay and were uplifted from 1 April 2026 | HP §2.C | CORRECT (no tier figures quoted, correctly) |
| 19 | FAQ6, H2.5 | MTD for Income Tax by gross qualifying income (trading and property before expenses), tested on the prior year's return: £50,000 from 6 Apr 2026, £30,000 from 6 Apr 2027, £20,000 from 6 Apr 2028 | HP §9 | CORRECT |
| 20 | FAQ6, H2.5 | First tranche is live now, most full-time locums already in scope; employment income alone does not count; limited companies outside the regime | HP §9 (present tense required) | CORRECT |
| 21 | KT5, H2.6 | Keep income and expense records at least five years after the 31 January deadline of the year they relate to | gov.uk business records for the self-employed | CORRECT |
| 22 | H2.6 list | AMAP 55p a mile for the first 10,000 business miles in 2026/27, 25p after; home to first site is commuting | HP §8 | CORRECT |
| 23 | H2.6 list | Indemnity, GMC retention, Royal College and BMA subscriptions and course fees are the records to keep | HP §8 (deductible status locked) | CORRECT; no GMC fee figure stated, as HP §8 requires |
| 24 | H2.6 list | Equipment usually goes through capital allowances rather than straight expensing | HP §8 / §7 | CORRECT |
| 25 | Whole post | No penalty amounts stated anywhere | spec | CORRECT (none present) |

No UNSOURCED figures were found, so nothing was removed. No STALE year tags: every rate is
tagged or framed 2026/27 and matches the 2026-08-26 currency pass.

## Structural checks

- Frontmatter per S4b: all required keys present; `metaTitle` 43 chars (≤ 60), `metaDescription` 147 (≤ 155), `summary` 51 words (40 to 60), `faqs` 6 (4 to 6), `keyTakeaways` 5 (3 to 5), `generator: claude-opus`, `dateModified` = `date`, category "Locum Tax" is a live Medical label, canonical is the Medical flat form. YAML re-parsed clean after the edits.
- Body is raw HTML, no markdown headings and no markdown links. No em-dashes. Body 1,085 words, inside 800 to 1,200 (unchanged by the edits).
- Four internal links, all flat `/blog/<slug>` as Medical requires, under the five-link cap. Three resolve in `Medical/web/content/blog/`. `/blog/salaried-gp-locum-work-tax` exists only at `docs/medical/_wave1/posts/salaried-gp-locum-work-tax.md` and resolves once that post is integrated. Accepted per the brief; the integrator must move both files in the same batch or this link 404s.

## Edit log

1. FAQ1: "Registering earlier costs nothing and starts nothing." to "Registering earlier costs nothing, though from that point HMRC expects a return for each year." Reason: WRONG and self-contradicting, registration does start a filing obligation (FAQ3 says so).
2. H2.1: "a session in March barely six" to "a session in March barely seven". Reason: WRONG arithmetic, March 2027 to 5 October 2027 is about seven months.

VERDICT: PASS
