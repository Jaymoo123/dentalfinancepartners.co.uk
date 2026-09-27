# Track A factual QA: portfolio-landlords-incorporating-a-partnership

File: `docs/property/_wave1/portfolio-landlords-incorporating-a-partnership.json`
Reviewed 2026-09-27. Tie-breaker `docs/property/house_positions.md` (HP below); primary law on
legislation.gov.uk where HP is silent.
Body word count 1,198 after edits (band 800 to 1,200). metaTitle 55 chars, metaDescription 147 chars.
No em-dashes. JSON re-parsed clean after every edit.

## Assertions

| # | Section | Assertion | Source | Verdict |
|---|---|---|---|---|
| 1 | intro | Partnership SDLT treatment sits in FA 2003 Schedule 15 | HP 1, 1.A | CORRECT |
| 2 | intro | Section 162 incorporation relief covers the capital gain | HP 5 | CORRECT |
| 3 | intro | Both reliefs turn on whether a partnership genuinely exists and for how long | HP 1.A (genuine-partnership requirement), HP 11.C | CORRECT |
| 4 | stats | 2 years genuine operation is the working safe harbour before a Sch 15 transfer | HP 1.A (evidential threshold post-Project Blue, 2 years with filed returns) | CORRECT |
| 5 | stats | 3-year anti-withdrawal window on capital taken out | HP 1.A (Sch 15 para 17A; HP 1.F: not 7 years) | CORRECT after edit 1 (see note A) |
| 6 | stats | 5% additional dwellings surcharge where partnership treatment does not apply | HP 1 (3% to 5% for transactions on or after 31 Oct 2024) | CORRECT |
| 7 | stats | 6 dwellings is the point at which one transaction is non-residential for SDLT | HP 1 (s.116(7) FA 2003, automatic deeming, not an election) | CORRECT |
| 8 | challenge 1 | Joint ownership of let property does not by itself create a partnership | HP 11.C.2 (PA 1890 s.2(1) negative) | CORRECT |
| 9 | challenge 1 | PA 1890 asks for a business carried on in common with a view of profit | HP 11.C.1 (s.1 four cumulative tests) | CORRECT |
| 10 | challenge 1 | Supporting record is SA800 returns, partnership accounts, joint borrowing, an agreement | HP 1.A, HP 11.C.5 (SA800 obligation, TMA 1970 s.12AA) | CORRECT |
| 11 | challenge 1 | Around two years of genuine operation is the working safe harbour | HP 1.A | CORRECT |
| 12 | challenge 1 | Link `/blog/incorporation-and-company-structures/does-your-business-qualify-as-a-partnership` | file on disk, category "Incorporation & Company Structures" | CORRECT |
| 13 | challenge 2 | On a transfer out of a partnership to a connected company, chargeable consideration = market value reduced by the sum of the lower proportions | HP 1 and 1.A (Sch 15 para 18, SLP at para 20; para 10/12 is the mirror transfer-in rule) | CORRECT |
| 14 | challenge 2 | SLP can reach 100% and the stamp duty falls to nil | HP 1.A ("100% SLP = zero chargeable consideration") | CORRECT |
| 15 | challenge 2 | Residual balance charged at residential rates plus the 5% surcharge | HP 1 rate table, but HP 1 six-dwellings rule displaces it on a 6+ dwelling transaction | WRONG as written, fixed (edit 2) |
| 16 | challenge 2 | The calculation turns on income profit shares, not capital or voting shares | HP 1.A (Sch 15 para 34), HP 1.F do-not-write | CORRECT |
| 17 | challenge 2 | Links to the Sch 15 blog and `/calculators/stamp-duty-calculator` | blog file on disk; `Property/web/src/app/calculators/stamp-duty-calculator` exists | CORRECT |
| 18 | challenge 3 | s.162 rolls the gain into the shares; business as a going concern, all assets other than cash | HP 5 (TCGA 1992 s.162) | CORRECT |
| 19 | challenge 3 | Letting is not automatically a business; evidence is active management | HP 5 (Ramsay v HMRC [2013] threshold) | CORRECT |
| 20 | challenge 3 | For transfers on or after 6 April 2026 the relief must be claimed, by the first anniversary of the 31 January following the tax year of transfer | HP 5 (new TCGA 1992 s.162(1)(b); FA 2026 s.39 repealed the s.162A election) | CORRECT |
| 21 | challenge 3 | Link `/blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords` | file on disk, same category | CORRECT |
| 22 | challenge 4 | BTL mortgages do not travel; each charged property needs consent or a company facility, usually with personal guarantees | HP silent; lending-market practice, no figure asserted | UNSOURCED (non-numeric, note B) |
| 23 | challenge 5 | Inside a company the finance cost restriction stops biting | HP 4 (s.24 restricts individuals' finance costs, not companies) | CORRECT |
| 24 | challenge 5 | CT 19% up to £50,000, 25% above £250,000, marginal band between | HP 21.4 and 21.A (SPR £50k, main rate £250k, 26.5% effective marginal) | CORRECT |
| 25 | challenge 5 | DLA credit created on incorporation draws tax free until exhausted | HP 21.1 (credit balances, repayment order, DLA exhaustion trap) | CORRECT |
| 26 | challenge 5 | Dividends 10.75% / 35.75% / 39.35% for 2026/27, against 8.75% and 33.75% on the first two bands before | HP 21.4 (F-20 correction) | CORRECT |
| 27 | howWeHelp 2 | SLP prepared from income profit shares as they stand | HP 1.A (para 34) | CORRECT |
| 28 | howWeHelp 2 | Link `/calculators/incorporation-cost-calculator` | `Property/web/src/app/calculators/incorporation-cost-calculator` exists | CORRECT |
| 29 | howWeHelp 3 | s.162 claim diarised alongside land transaction returns, partnership cessation return, personal returns, company first period | HP 5 (claim deadline), HP 11.C.5 | CORRECT |
| 30 | howWeHelp 3 | Director and PSC identity verification and the first confirmation statement | HP 11 and 11.A (ECCTA 2023, ID verification, ACSP route) | CORRECT |
| 31 | howWeHelp 4 | Three-year rule applied to the drawings plan | HP 1.A: para 17A bites on capital withdrawn from the partnership after a Sch 15 transfer, not on company DLA drawings | WRONG as written, fixed (edit 4) |
| 32 | faq 1 | Joint ownership is expressly not a partnership under PA 1890; HMRC guidance follows | HP 11.C.2 and 11.C.4 (BIM72015, PIM1030) | CORRECT |
| 33 | faq 2 | No statutory period, around two years with filed partnership returns is the working safe harbour; shorter invites enquiry on a paper-arrangement line | HP 1.A (s.75A enquiry attack, SDLTM09050+ is the Ramsay manual) | CORRECT |
| 34 | faq 3 | Chargeable consideration can fall to nil where partners are connected with each other and with the company | HP 1.A | CORRECT |
| 35 | faq 3 | Residual charged at residential rates plus the 5% surcharge | as #15 | WRONG as written, fixed (edit 5) |
| 36 | faq 3 | Cohabiting couples are not connected here | HP 1.A and 1.F (CTA 2010 s.1122) | CORRECT |
| 37 | faq 4 | s.162 can apply to a lettings partnership; question of evidence not property count; claim required from 6 April 2026 | HP 5 | CORRECT |
| 38 | faq 5 | Mortgages do not move; company borrows in its own name; ERCs, valuations, fees, timetable drives completion | HP silent; practice, no figure asserted | UNSOURCED (non-numeric, note B) |

Note A. Stat 2 originally read "capital taken out after a partnership transfer", which on a page about
a transfer out to a company reads as company drawings. Para 17A is the transfer-in safeguard, so the
label was narrowed to capital taken out of the partnership.

Note B. Lender and refinancing statements carry no figure and no legal rule. HP is silent and no primary
source exists for market practice. Left in place, consistent with the treatment in the sibling Track A
reviews for this wave; nothing numeric rests on them.

No STALE items. Every tax-year-sensitive figure is the 2026/27 position: 5% surcharge not 3%, dividends
at 10.75% / 35.75% / 39.35%, CT 19% / 25% with the marginal band, s.162 stated as claim-required rather
than automatic, and no reference to abolished MDR.

## Sources array

The array covers the page. Checks made:

- HP sections cited all exist and say what the array says they say: §1, §1.A, §5, §11.C, §21.1 and
  §21.4, §11 and §11.A.
- §1.A is correctly cited for paras 10-20 and 34, which includes the paras 18-20 transfer-out rule this
  page actually relies on. No para 10 misquote in the body.
- The six-dwellings rule (s.116(7)) is cited at line 1 and now carries weight in the body after edits 2
  and 5; previously the stat was sourced but unsupported anywhere in the prose.
- FA 2003 Sch 15 on legislation.gov.uk is cited directly.
- Nothing in the body rests on a source absent from the array.

## Edit log

1. `stats[1].label`: "capital taken out after a partnership transfer" to "capital taken out of the
   partnership after a Schedule 15 transfer". Reason: para 17A is the transfer-in anti-withdrawal
   safeguard (HP 1.A).
2. `challenges[1].body`: "Otherwise the balance is charged at residential rates plus the 5% surcharge."
   to "Otherwise the balance is chargeable at residential rates plus the 5% surcharge, or at
   non-residential rates where six or more dwellings move together." Reason: s.116(7) FA 2003 deems 6+
   dwellings non-residential automatically (HP 1), and this page's audience is 10 to 40 properties.
3. `challenges[3].body`: removed the sentence "Early repayment charges, valuations and arrangement fees
   land in the same window as the stamp duty, and the lending timetable usually sets the completion
   date." Reason: unsourced practice claim repeated almost verbatim in faq 5, and removing it kept the
   page inside the 1,200-word band after edits 2, 4 and 5.
4. `howWeHelp[3].body`: "and checks the plan against the three-year anti-withdrawal rule" to "and checks
   any capital withdrawn from the partnership against the three-year para 17A rule". Reason: as edit 1;
   drawing down a director's loan account is not a para 17A qualifying event.
5. `faqs[2].answer`: same six-dwellings qualification as edit 2.

5 edits. JSON re-validated after the batch: parses, 1,198 body words, metaTitle 55, metaDescription 147.

VERDICT: PASS
