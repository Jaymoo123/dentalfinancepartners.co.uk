# Factual QA (Track A) - landlord-self-assessment-and-mtd

Reviewed 2026-09-27 against `docs/property/house_positions.md` (§3, §4, §19.x, §41) and
gov.uk / legislation.gov.uk where house positions is silent.

## Assertions

| # | Where | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro, stat 1, ch.1 | MTD from 6 April 2026, qualifying income above £50,000 | §3, §19.1 | CORRECT |
| 2 | stat 2, ch.1 | £30,000 from 6 April 2027, £20,000 from 6 April 2028 | §3, §19.1 | CORRECT |
| 3 | ch.1 | 6 April 2026 cohort tested on the 2024/25 return | §19.1 | CORRECT |
| 4 | intro, ch.1, faq.2 | Threshold tested on gross rents before deductions, trade turnover aggregated | §19.2 | CORRECT |
| 5 | ch.1, faq.2 | £52,000 rent, £40,000 costs, £12,000 profit, still in scope | §19.2 (verbatim example) | CORRECT |
| 6 | ch.1 | Limited companies outside MTD for Income Tax | §3, §19.3 | CORRECT |
| 7 | ch.1 | General partnerships deferred, no confirmed date | §3, §19.3 | CORRECT |
| 8 | ch.1 | HMRC writes to those in scope, obligation is the taxpayer's regardless | §19.1 | CORRECT |
| 9 | ch.2 | Quarters 6 Apr-5 Jul / 6 Jul-5 Oct / 6 Oct-5 Jan / 6 Jan-5 Apr | §19.6 table | CORRECT |
| 10 | ch.2, hw.3 | Deadlines 7 Aug, 7 Nov, 7 Feb, 7 May | §19.6 table | CORRECT |
| 11 | ch.2 | Quarterly update carries no tax calculation | §19.6 (submission-only obligation) | CORRECT |
| 12 | ch.2 | Quarterly update is a cumulative summary by category | house positions silent; HMRC cumulative-update design | UNSOURCED (accurate, non-numeric, retained) |
| 13 | ch.2, hw.4, faq.1 | EoPS and final declaration both due 31 January after year end | §19.6 table | CORRECT |
| 14 | stat 3, faq.1 | "5 filings" = 4 quarterly updates plus final declaration | §19.7 treats EoPS/final declaration as one annual obligation; §19.6 tables them as two rows | CORRECT (defensible; see note A) |
| 15 | ch.3, hw.4 | Mortgage interest not deducted, runs through the basic-rate finance-cost reducer | §4 | CORRECT |
| 16 | ch.3 | Gross rent = what the tenant paid; agent commission is an expense | §19.13 | CORRECT |
| 17 | ch.3 | SA105 category list (gross rents, agent fees, repairs, insurance, council tax, finance costs, other) | §19.14 | CORRECT |
| 18 | ch.4 | Register with HMRC by 5 October after the tax year | gov.uk "Self Assessment tax returns: Deadlines" | CORRECT |
| 19 | ch.4 | Paper 31 October, online return and payment 31 January, payment on account 31 July | gov.uk, as above | CORRECT |
| 20 | stat 4, ch.4, faq.5 | 1 point per miss, £200 on reaching 4 points, £200 each further miss at threshold | §19.7 (08-21 precision), §19.19 | CORRECT |
| 21 | faq.5 | Points clear only after 12 months compliance AND all submissions due in preceding 24 months made | §19.19 dual-condition test | CORRECT |
| 22 | ch.4, faq.5 | Late payment 3% day 15, 3% day 30, 10%/yr day 31, bounded to 2026/27 | §19.7 + Spring Statement 2025 | CORRECT (bounding present, as §19.7 requires) |
| 23 | ch.4 | First-year 30-day concession before the day-15 charge | §19.7(a) | ADDED (was missing; §19.7 instructs stating it to the April 2026 cohort) |
| 24 | ch.5, faq.3 | Joint owners test their own share of gross, not property total | §3, §19.4 | CORRECT |
| 25 | ch.5, faq.3 | £100,000 joint gross = £50,000 each on default 50/50 | §19.4 | CORRECT |
| 26 | ch.5, faq.3 | Form 17 75/25 brings the larger share in earlier | §19.4 | CORRECT |
| 27 | ch.5 | Letting agent does not file; the landlord is the filer | §19.13 | CORRECT |
| 28 | hw.2, faq.4 | Spreadsheet plus bridging acceptable if bridging is on HMRC's recognised list | §19.6, §19.14 | CORRECT |
| 29 | faq.4 | Digital link = cell reference, formula, linked table, API extract; copy-paste and re-keying not acceptable | §19.14 | CORRECT |
| 30 | hw.2 | Check software for foreign property fields | §19.11 | CORRECT |
| 31 | hw.3 | Calendar quarter-ends electable from 6 April 2026 | §19.6 | CORRECT |
| 32 | hw.4 | Capital allowances "where available" | §38 / CAA 2001 s.35 dwelling-house bar; hedged, not asserted | CORRECT |
| 33 | hw.4 | Property allowance "where it applies" | §41 (mutually exclusive with the s.24 reducer); hedged | CORRECT |
| 34 | intro, ch.3, faq.3 | Internal links: `/calculators/mtd-checker`, `/calculators/rental-income-tax-calculator`, `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` | `registry.ts` (both slugs), `Property/web/content/blog/` + `src/app/blog/making-tax-digital-mtd` | ALL EXIST |

No STALE items: no £10,000 threshold, no 2%/2%/4% legacy schedule, no 31/46/91 day triggers,
no SI 2021/1076 citation, no "reducer frozen at 20% in 2027/28".

### Note A - "5 filings"
§19.6 tables EoPS and final declaration as two rows; §19.7 counts them as one annual
obligation. The page is internally consistent (stat, ch.2 and faq.1 all say the same thing) and
describes both instruments in the body, so this is left as written rather than edited on an
ambiguity in the house positions.

### Note B - word band
Body runs 1,332 words against the 800-1,200 band in LEADS_250 §13 S4a. Factual QA does not
fail on length; flagged for Track B / the writer.

## Edit log

1. `challenges[3].body` - appended the §19.7(a) first-year concession clause to the late-payment
   sentence ("though in your first year under the new penalties you get 30 days from the due
   date before the day 15 charge applies"). Reason: §19.7 explicitly instructs stating it when
   writing to the April 2026 cohort, which is this page's audience; without it the day-15 figure
   misleads that cohort.
2. `sources[10]` - misattributed section id. Letting-agent / gross-collected rule is §19.13, not
   §19.12 (§19.12 is pension funds and rental property). Changed §19.12 to §19.13.
3. `sources[13]` - misattributed section id. The property allowance / s.24-reducer exclusivity
   rule is §41 (ITTOIA 2005 Part 6A), not §34 (allowable expenses and the home-office trap).
   Rewritten to cite §41.

Three edits. No figure, rate, date or statutory rule in the page body was wrong; no assertion
was removed. JSON re-validated after editing (parses).

### Sources array coverage
Covers every figure the page states. Two entries (§19.5 exit rule, §19.10 ASA) cite material the
page does not use - harmless, left in place.

VERDICT: PASS
