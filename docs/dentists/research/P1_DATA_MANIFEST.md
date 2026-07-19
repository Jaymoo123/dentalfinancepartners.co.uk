# P1 Data-Source Manifest — Dental Pay & Tax Index

**Flagship:** Dentists (Dental Finance Partners) — clones the medical research-asset factory (`docs/medical/RESEARCH_ASSET_STATE.md` P1→P4 pipeline).
**Verified:** 2026-07-19 (all sources live-checked). **Status: AWAITING OWNER SIGN-OFF.**

## Sources (all OGL v3.0 — free to republish with attribution)

| Source | Publisher | Latest edition | Cadence | Key fields |
|---|---|---|---|---|
| Dental Earnings and Expenses Estimates | NHS Digital | 2023/24 (pub 31 Jul 2025; next 30 Jul 2026) | Annual (July) | Taxable income by practitioner type/region/FT-PT, itemised expenses, NHS-vs-private split |
| English Contractor Monthly General Dental Activity | NHSBSA Open Data | Apr 2026 (pub 15 Jul 2026) | Monthly, 2-mo lag | UDA counts, FP17 forms, contract-level activity |
| ONS ASHE Table 14 (SOC 2215 Dental practitioners) | ONS | 2025 provisional (pub 23 Oct 2025) | Annual (autumn) | Gross earnings, paid hours, by sex/FT-PT |
| NHS Dental Statistics — England | NHSBSA | 2024-25 | Annual (July) | Workforce counts, GDS contract activity, regional |
| DDRB 53rd Report 2025 | DHSC | 22 May 2025 | Annual | Corroboration layer only (cites NHS Digital) |

URLs: digital.nhs.uk/data-and-information/publications/statistical/dental-earnings-and-expenses-estimates · opendata.nhsbsa.net/dataset/english-contractor-monthly-general-dental-activity · ons.gov.uk (ASHE table 14) · nhsbsa.nhs.uk/statistical-collections/dental-england · gov.uk DDRB 53rd report.

## Proposed index metrics (v1)
1. Average taxable income, self-employed dentists, by nation + trend 2016/17→2023/24 (2023/24: England £78,200 +3.2%; Scotland £90,600 −1.4%; Wales £79,900 flat; NI £77,000 −2.4%).
2. Providing Performer vs Associate income split.
3. NHS vs private income mix trend (coverage varies by year — check data dictionary per edition).
4. Expense ratio (expenses ÷ gross income) over time, itemised premises/staff/supplies.
5. UDA volume per practitioner trend (workload proxy, policy-banding caveat).
6. Regional disparity view (by nation, never UK-aggregated — coding differs).
7. (Optional) effective tax-burden estimate via ASHE cross-check — imputation, v2 candidate.

## Required caveats (data-honesty)
- 12-18 month lag (NHS Digital July publications); NHSBSA 2-month lag.
- Self-employed sample only (excludes salaried/corporate dentists).
- NHS/private split not present in all years/roles.
- UDA = workload proxy, not income; banding is policy-set.
- HMRC does NOT publish dentist-level SA breakdowns; the NHS Digital matched-HMRC series IS the dentist-specific source.
- Watch 2024/25 edition (Jul 2026) for a step change from HMRC associate-status reclassification.

## Attribution line
"Dental Finance Partners analysis of NHS Digital, NHSBSA and ONS open data, Open Government Licence v3.0. Free to use with a link."
(Corrected from research draft which mis-attributed to the medical brand.)

## Headline stats (journalist-ready)
1. Self-employed dentists in England averaged £78,200 taxable income in 2023/24 (+3.2% YoY) but real-terms earnings have fallen since 2017/18.
2. Regional gap: Scotland £90,600 (−1.4%) vs NI £77,000 (−2.4%); England up, three nations flat-to-down.
3. Operating costs consume a growing share of practice income; 64% of practices report unfilled vacancies (BDA 2025, context only, non-OGL).

## Owner sign-off checklist
- [ ] Approve 5 sources for v1
- [ ] Approve metric set (1-6; 7 deferred)
- [ ] Confirm OGL attribution line
- [ ] Approve 3 headline stats
- [ ] Green-light P2 locked design brief → P3 3-lane build → P4 recompute-QA

Update promise: refreshed each NHS Digital July publication; next July 2026.
