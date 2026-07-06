# Source manifest — NHSBSA (NHS Pension Scheme) corroboration

**Program:** NHS Pension Annual Allowance Burden Index (`/research/...`, medicalaccounts.co.uk).
**Role of this source set:** the NHS-specific corroboration layer (Property precedent = Land Registry HPI context source). The stable annual **spine** of the index is HMRC Pension Schemes Statistics (see the sibling manifest `SOURCE_MANIFEST_HMRC.md`). NHSBSA sources here supply (a) NHS Pension Scheme **member counts** by year and (b) an NHS-scheme-specific read on **how many members' pension growth exceeded the annual allowance** and **how many hold a Scheme Pays record**, split practitioner vs officer.
**Verified by:** P1.b data-source agent (Opus), 2026-07-06. All figures below were read directly from the downloaded raw files with python (pypdf / openpyxl), not from page summaries or model memory.

**VERDICT: PARTIAL (usable, with hard constraints).**
- Member counts: **PASS** — fully verified in the annual report and accounts, 3 years, exact pages.
- NHS-specific AA-charge / Scheme Pays counts: **PASS on existence, but NOT from the annual report.** They come from an NHSBSA **FOI open dataset** (FOI-02228), which is (i) an ad-hoc FOI response, not a recurring statistical publication; (ii) undercounted for the two most recent years by NHSBSA's own admission; (iii) **counts only — no monetary £ value** of NHS AA charges or Scheme Pays is published. The handover's phrase "Scheme Pays elections and values" is only **half** met: election/record *counts* yes, *£ values* no (the £ spine must come from HMRC).

---

## Scheme scope (read before using any figure)
- The NHSBSA administers the **NHS Pension Scheme for England and Wales** (verified verbatim, 2024-25 accounts, PDF p.11: "administration of the NHS Pension Scheme for England and Wales"). Scotland (SPPA) and Northern Ireland (HSC) run **separate** schemes and are **out of scope**. Any headline must say "England and Wales".

---

## SOURCE A1 — NHS Pension Scheme Annual Report and Accounts (member counts) — PASS

**What it is:** the audited scheme accounts, laid before Parliament (HC numbers). Contains a "3.3 Membership statistics (movement in year)" table: active / deferred / pensions-in-payment opening balance, joiners, leavers, closing balance. This is the clean member-count series.

**Licence:** Crown copyright, **Open Government Licence v3.0** (verified verbatim, 2024-25 PDF p.4: "This publication is licensed under the terms of the Open Government Licence v3.0"). ISBN + HC number present. Usable.

**Cadence:** annual, published ~July–September for the year ending the prior 31 March (e.g. 2024-25 published July 2025). **Latest published year at verification: 2024-25 (year ending 31 March 2025).**

**Downloaded raw files** (all in `.cache/medical_research/`):
| local file | HC | year | source URL |
|---|---|---|---|
| `nhs_pension_accounts_2024-25.pdf` | HC 1136 | 2024-25 | https://www.nhsbsa.nhs.uk/sites/default/files/2025-07/HC%201136%20NHS%20Pension%20Scheme%20Annual%20Report%20and%20Accounts%202024-2025.pdf |
| `nhs_pension_accounts_2023-24.pdf` | HC 50 | 2023-24 | https://www.nhsbsa.nhs.uk/sites/default/files/2024-08/NHS%20Pension%20Scheme%20Accounts%202023-24.pdf |
| `nhs_pension_accounts_2022-23.pdf` | — | 2022-23 | https://www.nhsbsa.nhs.uk/sites/default/files/2023-09/NHS%20Pensions%20Annual%20Report%20and%20Accounts%202022-2023.pdf |

GOV.UK landing (collection): https://www.gov.uk/government/publications/nhs-pension-scheme-annual-report-and-accounts-2024-to-2025
NHSBSA index of all years: https://www.nhsbsa.nhs.uk/information-about-nhs-pensions/nhs-pension-scheme-accounts-and-valuation-reports
GOV.UK asset mirror (2024-25): https://assets.publishing.service.gov.uk/media/687a5e455f0f5104b9806baa/nhs-pension-scheme-annual-report-and-accounts-2024-to-2025.pdf

**Parse method: hand-key from PDF (PDF-only table). Table = section "3.3 Membership statistics (movement in year)".**
- 2024-25 report: **PDF page index 11** (printed footer "12"). Read the closing lines.
- 2023-24 report: **PDF page index 11** (printed footer "Page 9").
- 2022-23 report: **PDF page index 11** (printed footer "Page 10").
(Text re-extractable with `pypdf`; the three `.txt` dumps are saved alongside the PDFs for the build agent.)

**VERIFIED VALUES — use the CLOSING figure for each 31 March:**

| At 31 March | Active members | Deferred members | Pensions in payment (incl. Compensation Scheme) | source report / PDF page |
|---|---|---|---|---|
| 2023 | 1,815,310 | 772,560 | 1,098,388 | 2022-23, p.11 |
| 2024 | 1,868,523 | 802,262 | 1,145,617 | 2023-24, p.11 |
| 2025 | 1,872,287 | 845,020 | 1,199,771 | 2024-25, p.11 |

Cross-check: active + deferred at 31 Mar 2025 = 2,717,307, matching the narrative "over 2.7 million active or deferred members" (2024-25 report). Active member trend corroborates the AA-burden story: the senior-doctor cohort inside a 1.87m-active, England-and-Wales DB scheme is the population exposed to AA charges.

**DISCONTINUITY — opening balances are restated; a date can carry two published values.** Note 1 in every report: the opening balance is retrospectively adjusted for late member-record updates. So closing(year N) does NOT equal opening(year N+1):
- 31 Mar 2024 **closing** = 1,868,523 (2023-24 report) vs 1 Apr 2024 **opening** = 1,853,195 (2024-25 report) → restated **down 15,328**.
- 31 Mar 2023 closing 1,815,310 vs 1 Apr 2023 opening 1,787,649 → restated **down 27,661**.
Rule for the build: quote only the **closing** figure for each 31 March from that year's own report; never subtract across reports.

**Second discontinuity (same date, different number, different source within the report).** Note 4 (2024-25): the membership figure at 31 March 2024 in the actuarial "Statement by the Actuary" (Tables A/B/C, extract taken Oct 2023) differs from the 3.3 movement table (extract taken Apr 2025). Use the **3.3 movement table** consistently; do not mix in the actuary's Table A/B/C counts (those exist for age/gender profiling as at the 31 Mar 2023 valuation date only).

---

## SOURCE A2 — NHSBSA FOI-02228: members exceeding the standard annual allowance + Scheme Pays record, by practitioner/officer, 2015/16–2023/24 — PASS on existence, CONSTRAINED

**What it is:** an NHSBSA **Freedom of Information response**, published as an open dataset on the NHSBSA Open Data Portal. This is the **only NHS-scheme-specific annual-allowance count series found** across multiple years. It answers: (a) how many scheme members' pension **growth exceeded the standard annual allowance** each tax year, split **Practitioner vs Officer**; and how many **have a Scheme Pays record**.

**Licence:** **OGL-UK-3.0** (Open Government Licence v3.0), stated on the dataset page. Usable.
**Cadence:** **NOT a recurring publication — ad-hoc FOI.** Portal "last updated" April 2025; data snapshot **as of 26 September 2024**. There is no guarantee a comparable refresh will exist next year. Treat as a **one-off corroboration snapshot**, not a live series.
**Coverage:** tax years **2015/16 to 2023/24** (9 rows), England & Wales scheme.

**Downloaded raw file:** `.cache/medical_research/nhsbsa_foi_02228_aa_schemepays.xlsx`
Dataset page: https://opendata.nhsbsa.net/dataset/foi-02228
Direct xlsx: https://opendata.nhsbsa.net/dataset/f19a5b07-c8a7-4e4f-afdc-5354fe64c085/resource/e845e0ee-ff16-4338-8aca-e1546c2e7ada/download/foi-02228-data.xlsx

**Parse method: openpyxl, single sheet.**
- Sheet name: **`Q. A and B`** (dims A1:G11).
- Two-row header. Row 1: merged group labels — **B1 = "Practitioner"**, **E1 = "Officer"**. Row 2 = column headers.
- Columns: **A = "Year End"** (tax year string e.g. `2015/16`); Practitioner block **B = "Exceeded AA Growth"**, **C = "Has a Scheme Pays Record"**, **D = "Exceeded AA Growth & Has a Scheme Pays Record"**; Officer block **E/F/G** = same three, respectively.
- Data rows 3–11 = 2015/16 … 2023/24.

**VERIFIED VALUES (read straight from the file). Members whose pension growth exceeded the *standard* annual allowance:**

| Tax year | Practitioner exceeded | Officer exceeded | Total exceeded | Practitioner w/ Scheme Pays record | Officer w/ Scheme Pays record |
|---|---|---|---|---|---|
| 2015/16 | 3,111 | 12,562 | 15,673 | 292 | 222 |
| 2016/17 | 8,996 | 20,817 | 29,813 | 1,892 | 1,286 |
| 2017/18 | 9,251 | 18,776 | 28,027 | 3,630 | 3,162 |
| 2018/19 | 6,637 | 13,259 | 19,896 | 3,646 | 3,805 |
| 2019/20 | 6,925 | 19,130 | 26,055 | 9,356 | 10,476 |
| 2020/21 | 6,200 | 23,289 | 29,489 | 4,962 | 4,902 |
| 2021/22 | 7,991 | 46,135 | 54,126 | 6,424 | 7,639 |
| 2022/23 | 6 | 27 | 33 | 1,637 | 597 |
| 2023/24 | 0 | 8 | 8 | 103 | 62 |

Sample values for cross-checking a rebuild: 2016/17 practitioner exceeded = **8,996**; 2021/22 officer exceeded = **46,135**; 2019/20 practitioner Scheme Pays records = **9,356**.

**CRITICAL DISCONTINUITIES / CAVEATS — the build agent MUST honour all of these:**
1. **Recent two years are radically undercounted, not a real decline.** 2022/23 (total 33) and 2023/24 (total 8) collapse to near-zero purely because the data was not yet calculated at the 26-Sep-2024 snapshot. NHSBSA verbatim: "significant validation checks have taken place to identify incomplete Annual Allowance (AA) records and remove them … the overall volume of members showing to have exceeded the annual allowance is less than previously reported … The volume will increase as calculations continue." **Never chart or narrate 2022/23 or 2023/24 from this dataset as a fall.** Safe usable window ≈ **2015/16 to 2021/22**.
2. **"Standard" allowance only — the definition of the bar changes across the series.** Rows count members over the *standard* annual allowance (£40,000 for 2015/16–2022/23; **£60,000 from 2023/24**, per house_positions §2.B). Members caught only by the *taper* (from 2016/17, threshold income >£110k then >£200k) are **not** in the "Exceeded AA Growth" columns. So this understates total AA exposure and the definition is not constant year-to-year.
3. **McCloud / pre-rollback basis.** NHSBSA verbatim: "The data used for this FOI is pre-rolled back data, when members were in the 2015 Scheme." AA figures will move again as remedy recalculations complete. Frame as a point-in-time snapshot.
4. **"Has a Scheme Pays Record" is counted on a different basis from "Exceeded AA Growth" and the two do not reconcile.** A Scheme Pays record can be logged in a year other than the growth year, and can exist for taper-driven (voluntary) charges. Hence 2019/20 shows more Scheme Pays records (9,356 practitioner) than members exceeding growth (6,925). Do not compute a "% who used Scheme Pays" by dividing these columns.
5. **Data completeness gap in the denominator population.** 18,815 active practitioners had at least one employment not updated to 31 March 2022 at the snapshot — a further reason recent counts are soft.
6. **Counts only. There is NO £ value here** — no total AA-charge £ and no Scheme Pays £ settled. NHS-specific monetary values are not published; the £ spine is HMRC.

---

## SOURCE A3 — NHSBSA FOI-02711: Scheme Pays election forms 2019/20 by role — supporting colour only

**What it is:** a second FOI dataset, a single-year breakdown of Scheme Pays election forms **registered in 2019/20**, by employment type, and how many of those also applied for the 2019/20 AA Compensation Scheme (the "2019/20 pension tax" NHS scheme that reimbursed AA charges that year).

**Licence:** NHSBSA Open Data Portal, OGL (same portal terms as A2). **Cadence:** ad-hoc FOI, **single year 2019/20 only.**
**Downloaded raw file:** `.cache/medical_research/nhsbsa_foi_02711_schemepays_2019-20.xlsx`
Dataset page: https://opendata.nhsbsa.net/dataset/foi-02711
Direct xlsx: https://opendata.nhsbsa.net/dataset/368b37a9-740c-4bed-98a3-90c1b36e5abe/resource/1d16b18e-2d70-4445-ac49-a98b26f410f4/download/foi02711.xlsx

**Parse method: openpyxl, sheet `Sheet1` (A1:C8), header row 1.** Columns: A = "Employment Type", B = "Registered a Scheme Pays Election form in 2019/20", C = "…and applied for 19/20 Annual Allowance Compensation Scheme".

**VERIFIED VALUES:**
| Employment type | SP election forms 2019/20 | of which applied for 19/20 AA Compensation |
|---|---|---|
| GP | 8,239 | 6,611 |
| Hospital Doctor | 9,745 | 8,344 |
| Officer | 890 | 345 |
| GDP (dentist) | 442 | 255 |
| Special Class Nurse | 190 | 152 |
| Non-SC Nurse | 319 | 232 |
| Hospital Dentist | 26 | 24 |

Usefulness: gives a **role split** (GPs + hospital doctors dominate: 8,239 + 9,745 ≈ 18k of ~19.9k forms) that A2's practitioner/officer split cannot. **Caveat:** counts forms *registered in 2019/20* (submission-date basis), which is a different basis again from A2's tax-year basis, so A2 and A3 will not tie out. Use A3 only as a one-year illustrative role breakdown, not part of any time series.

---

## SOURCE B (OPTIONAL) — NHS workforce denominators — AVAILABLE but RECOMMEND DEFER for v1

**Candidate:** NHS Workforce Statistics, NHS England Digital (formerly NHS Digital). Monthly HCHS staff incl. doctors by grade (Consultant is a grade). Landing: https://digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics ; latest verified release **March 2025** (page: /nhs-workforce-statistics/march-2025). Series runs **30 Sep 2009 → present** (stable, long). GP headcount/FTE is a **separate** quarterly release ("General Practice Workforce").

**Openness:** NHS England Digital statistical publications are Crown copyright under OGL; the March-2025 summary page did not print the licence line inline, so the build agent should confirm OGL on the specific data file's copyright/legal statement before citing (high confidence OGL, but confirm).

**Why DEFER (not a hard SKIP):**
- **Scope mismatch.** Workforce stats **Geographic Coverage: England** (verified on the page); the NHS Pension Scheme numerator is **England & Wales**. A "charges per 1,000 senior doctors" rate would divide an E&W numerator by an England denominator — imprecise and open to challenge on an A* asset.
- The summary page does not expose the Consultant-grade headcount inline (it is inside the detailed staff-group CSV); extracting a clean "senior doctors" denominator is extra work that adds a derived metric of secondary narrative value.
- The core burden story (counts of members over the AA, framed against the 2016 taper and 2021/22 CPI spike, with the HMRC £ spine) stands without it.

**Recommendation:** ship v1 without the derived per-1,000 metric; revisit in v2 only if a denominator is wanted, and if so restrict the numerator to England-comparable or state the scope caveat explicitly.

---

## Bottom line for the P1 gate / build
- **USE for member-count context:** Source A1 (annual report 3.3 table), OGL, latest 2024-25, closing figures only.
- **USE for NHS AA corroboration:** Source A2 (FOI-02228), OGL, **window 2015/16–2021/22 only**, counts only, framed as a point-in-time FOI snapshot, practitioner/officer split, with the 2021/22 officer spike (46,135) and the 2016/17 step-up flagged against the policy timeline. A3 = one-year role colour.
- **Do NOT claim:** an NHS-specific £ value of AA charges or Scheme Pays; a "live/updated-this-year" NHS AA series; any 2022/23–2023/24 NHS AA decline; a Scheme-Pays-uptake ratio from A2's two columns.
- **£ spine + the recurring annual series must come from HMRC** (sibling manifest). NHSBSA here is corroboration + member-population context, exactly the Property "context source" role.
