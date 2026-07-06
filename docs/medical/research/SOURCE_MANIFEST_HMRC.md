# SOURCE MANIFEST — HMRC Private Pension Statistics (Annual Allowance)

**Purpose:** P1 data-source verification for the *NHS Pension Annual Allowance Burden Index* (www.medicalaccounts.co.uk). This manifest is the single source of truth for the HMRC (all-registered-schemes) leg of the index. An NHS-specific corroboration source is a separate agent's job.

**Verification date:** 2026-07-06
**Verdict:** PASS (with one precision caveat — see §7 "value of AA charges via SA does not exist").
**Verified by:** parsing the actual downloaded files with python/pandas, not page summaries or training data.

---

## 1. Publication location (the old URL had moved)

- **Old/handover URL (DEAD, HTTP 404):** `https://www.gov.uk/government/statistics/registered-pension-schemes-statistical-analysis`
- **LIVE publication page:** https://www.gov.uk/government/statistics/personal-and-stakeholder-pensions-statistics
  - Title on page: *"Private pension statistics"* (a.k.a. "Personal and stakeholder pensions statistics"). Status: **Accredited official statistics**.
  - **Last updated: 31 July 2025.** First published 30 September 2021.
- **Collection page:** https://www.gov.uk/government/collections/personal-pensions-statistics
- **Commentary (HTML):** https://www.gov.uk/government/statistics/personal-and-stakeholder-pensions-statistics/private-pension-statistics-commentary
- **Quality report:** https://www.gov.uk/government/statistics/quality-report-personal-pensions-statistics

The publication no longer ships one `pensiontaxrelief.xlsx`. It is split into per-table **ODS** files plus machine-readable **"tidy data" CSVs** and a `Metadata.csv`.

## 2. Licence

**Open Government Licence v3.0** (stated on the publication page). The ODS cover sheet adds: *"Bulletin is Crown copyright. Information may be used provided that the source is acknowledged."* OGL v3.0 → **usable for our purposes.** Required attribution: "Source: HMRC Private pension statistics (July 2025), Open Government Licence v3.0."

## 3. Update cadence

- **Frequency: Annual.** Release month: **July** (this edition July 2025; ODS cover sheet, Table 7).
- **Next release: "Summer 2026"** (per ODS cover sheet). So the next edition (adding tax year 2024 to 2025 provisional, and firming 2023 to 2024) is due ~July 2026 — plan an index refresh then.
- Statistical contact: personaltax.statistics@hmrc.gov.uk (A Sivanenthiran / M Jennings, HMRC).

## 4. Files downloaded (saved under `.cache/medical_research/`, original filenames kept)

| Local file | Direct URL (downloaded 2026-07-06) | Role |
|---|---|---|
| `Tables_7_and_8.ods` | https://assets.publishing.service.gov.uk/media/68874aa52f4f3f3c34bbec24/Tables_7_and_8.ods | **PRIMARY — AA (Table 7) + LTA (Table 8), human-formatted with provisional/revised flags + footnotes** |
| `TidyData_Tables_7_and_8.csv` | https://assets.publishing.service.gov.uk/media/68874d2bbe2291b14d11af8a/Tables_7_and_8.csv | **PRIMARY machine-readable — AA + LTA long/tidy format (flags stripped)** |
| `Metadata.csv` | https://assets.publishing.service.gov.uk/media/68874ca31e72aed40611af7b/Metadata.csv | Column dictionary for all tidy CSVs |
| `Table_6.ods` | https://assets.publishing.service.gov.uk/media/68765e86352c290d20dcaeb6/Table_6.ods | Cost of pension tax **relief** (NOT AA charges) |
| `TidyData_Table_6.csv` | https://assets.publishing.service.gov.uk/media/687a2912a5561a5a7e726b6a/Table_6.csv | Relief, tidy |
| `TidyData_Tables_6_1_and_6_2.csv` | https://assets.publishing.service.gov.uk/media/687a294e312ee8a5f0806b6d/Tables_6_1_and_6_2.csv | Relief by scheme sector/DB-DC/tax rate, tidy |
| `Table_2.ods` | https://assets.publishing.service.gov.uk/media/68765e7888da2e5804bb6a78/Table_2.ods | Personal pension contributions (context) |
| `Table_9.ods` | https://assets.publishing.service.gov.uk/media/68765e9d39d0452326e28ed6/Table_9.ods | Flexible ("freedoms") payments (context) |

> Media-asset IDs are edition-specific and will change at the Summer-2026 release. Always re-resolve links from the publication page, then keep the ODS as the archival copy.

---

## 5. THE table for the index — Table 7 (Pensions annual allowance statistics)

### 5a. ODS layout — `Tables_7_and_8.ods`, sheet `Table_7_Annual_Allowance`
- Sheet names in the workbook: `Cover_sheet`, `Contents`, `Notes`, `Table_7_Annual_Allowance`, `Table_8_Lifetime_Allowance`.
- On sheet `Table_7_Annual_Allowance` (0-indexed rows):
  - Rows 0–6: title + inline footnotes.
  - **Header row = index 7** (i.e. the 8th row). Six columns, verbatim:
    1. `Tax Year`
    2. `Standard annual allowance (£)`
    3. `Number of annual allowance charges reported by the scheme through the Accounting for Tax return`  ← **Scheme Pays count**
    4. `Total value of annual allowance charges reported by the scheme through the Accounting for Tax return (£ million)`  ← **Scheme Pays value**
    5. `Number of individuals reporting pension contributions exceeding their annual allowance through Self Assessment`
    6. `Total value of pension contributions exceeding the annual allowance reported through Self Assessment (£ million)`
  - **Data rows = index 8–25** (18 tax years, 2006 to 2007 → 2023 to 2024).
  - Row 26 = "End of worksheet".
- Cell markers in the `Tax Year` cell: `[revised]` (2016 to 2017 … 2022 to 2023) and `[provisional]` (2023 to 2024). AfT columns before Scheme Pays existed read `[not applicable]`.
- Rounding: counts to nearest 10; values to nearest £1 million.

### 5b. Tidy CSV layout — `TidyData_Tables_7_and_8.csv` (UTF-8 with BOM)
- 90 rows × 9 cols. Columns: `tax_year, allowance_type, reporting_method, payment_method, allowance_value, number_of_charges, value_of_charges, individuals_reporting_excess_contributions, value_of_excess_contributions`.
- `allowance_type` ∈ {`Annual`, `Lifetime`}. Filter `Annual` → 36 rows.
- `reporting_method` ∈ {`Self assessment`, `Accounting for Tax return`}. For Annual, `payment_method` is always `Not applicable` (lump/non-lump only applies to LTA).
- **Long format, one metric-set per reporting method per year:**
  - `reporting_method == "Accounting for Tax return"` rows carry `number_of_charges` + `value_of_charges` (Scheme Pays); the SA metrics are `[z]`.
  - `reporting_method == "Self assessment"` rows carry `individuals_reporting_excess_contributions` + `value_of_excess_contributions`; the charge metrics are `[z]`.
- `[z]` = not applicable / not available (matches the ODS `[not applicable]` and the "no SA charge value" rule).
- **WARNING:** the tidy CSV `tax_year` is clean text ("2023 to 2024") — the `[provisional]`/`[revised]` flags are **stripped**. To flag provisional/revised you must read the ODS, or apply the rule in §6.

### 5c. Verified sample values (read directly from the files)
| Tax year | Std AA (£) | AfT charges (n) | AfT charge value (£m) | SA individuals over AA (n) | SA value of excess (£m) |
|---|---|---|---|---|---|
| 2006 to 2007 | 215,000 | [n/a] | [n/a] | 140 | 2 |
| 2016 to 2017 [revised] | 40,000 | 2,940 | 64 | 18,720 | 584 |
| 2019 to 2020 [revised] | 40,000 | 21,630 | 256 | 45,210 | 1,011 |
| 2021 to 2022 [revised] | 40,000 | 50,590 | 328 | 56,270 | 1,288 |
| 2022 to 2023 [revised] | 40,000 | 54,920 | 348 | 34,190 | 728 |
| **2023 to 2024 [provisional]** | **60,000** | **49,590** | **350** | **23,370** | **466** |

(Tidy CSV and ODS reconciled exactly on 2023-24 and 2021-22.)

## 6. Latest year & provisional/revised flags
- **Latest published tax year: 2023 to 2024** — marked **[provisional]** in Table 7 and Table 8.
- **2016 to 2017 through 2022 to 2023: [revised]**. 2006/07–2015/16: no marker (final).
- Parser rule if only using the tidy CSV: treat `tax_year == "2023 to 2024"` as provisional and `2016 to 2017`…`2022 to 2023` as revised (verified against the ODS on 2026-07-06). Re-check at the Summer-2026 edition, when 2024 to 2025 becomes the provisional year.

## 7. Discontinuities / methodology changes (MUST caveat in any chart)
1. **Scheme Pays (AfT) starts 2012/13.** Scheme Pays introduced in tax year 2011/12; AfT data only from **2012 to 2013**. AA charge **number/value** columns are `[not applicable]` for 2006/07–2011/12. Do NOT plot a continuous "value of AA charges" line back to 2006/07 — it starts 2012/13.
2. **"Value of AA charges via Self Assessment does NOT exist."** HMRC explicitly states (Notes) estimates are not available for the value of AA tax charges via SA (charges are merged into total SA liability). The SA columns give **number of individuals** exceeding AA and **value of contributions in excess** — the latter is *excess savings*, **NOT the tax charge**. Only the AfT/Scheme-Pays path yields a genuine "value of AA charges".
3. **Tapered AA from 2016/17.** From 2016/17 the SA "individuals exceeding AA" count also includes those breaching the **tapered AA** or **money-purchase AA (MPAA)** — a definitional widening that inflates the count vs earlier years (visible ~3x jump 2015/16→2016/17). Table 7 **cannot** be disaggregated by AA type (standard/tapered/MPAA).
4. **PODS digital service from Apr 2020** improved AfT reporting and **may have increased AfT figures from 2020/21** onwards (reporting-tool effect, not pure behaviour).
5. **McCloud / public service pensions remedy, 2022/23.** Affected members (a large share of AA charges come from public-service schemes, i.e. NHS) were told to report 2022/23 AA charges via the *"Calculate your public service pension scheme adjustment"* service instead of SA. This drove the **large 2022/23 YoY fall in SA count/value** (56,270→34,190 individuals; £1,288m→£728m). Highly relevant to an NHS narrative and a genuine data artefact, not a real decline in NHS burden.
6. **AA rise to £60,000 in 2023/24** drove the further SA decline (23,370 individuals). Framing, but overlaps the McCloud effect — separate them carefully.
7. **AfT vs SA period mismatch.** AfT year totals run **1 April–31 March**; SA aligns with the **6 April–5 April** tax year. There is a reporting **lag** between the two, they are **not mutually exclusive** (same person can appear in both/neither), and a single charge can land in different years across the two columns. Never sum AfT+SA as if additive.

## 8. NHS / public-sector split — NOT PRESENT (confirmed)
This publication is **all registered pension schemes**. Table 7 has **no NHS or public-sector breakdown**; it cannot be disaggregated by scheme, sector, or AA type. The Notes only *mention* qualitatively that "a significant number of AA charges come from public service scheme members" (context for the McCloud effect). Table 6.1/6.2 relief data has a `sector_scheme` filter, but that is *tax relief on contributions*, not AA charges, and does not give an NHS split. → **NHS-specific figures must come from the separate NHS/BSA/SPPA source, not here.** Use HMRC Table 7 as the national all-schemes backdrop only.

## 9. Bonus series available (not originally claimed)
- **Table 8 — Lifetime Allowance charges** (same ODS/CSV): number & value of LTA charges via AfT, split lump-sum (55%) / non-lump (25%) / all, **2006/07→2023/24**. Sample: 2021 to 2022 [revised] = 11,810 charges / £503m all; 2023 to 2024 [provisional] = 620 / £16m (collapse because LTA charge set to 0% in 2023/24, LTA abolished 2024/25). Good "the tax cap moved from LTA to AA" framing.
- **Table 6 / 6.1 / 6.2** — cost of pension tax relief; DB vs DC, by sector and tax rate. Context on the fiscal scale of pensions, not AA burden.
- **Table 2** — personal-pension contributions/members. **Table 9** — flexible ("pension freedoms") payments by quarter/age/gender.

---

## 10. PARSE RECIPE (deterministic — for the Sonnet build agent)

**Goal:** build the AA Burden Index time series (2006/07→latest) from HMRC Table 7.

**Preferred source: the ODS** (keeps provisional/revised flags in one row per year).
```python
import pandas as pd
df = pd.read_excel(
    ".cache/medical_research/Tables_7_and_8.ods",
    sheet_name="Table_7_Annual_Allowance",
    engine="odf", header=7)          # header row index 7
df = df.iloc[:18]                    # 18 data rows (drop "End of worksheet")
df.columns = ["tax_year","std_aa_gbp","aft_charges_n","aft_charges_value_gbp_m",
              "sa_individuals_over_aa_n","sa_excess_value_gbp_m"]
df["provisional"] = df["tax_year"].str.contains(r"\[provisional\]")
df["revised"]     = df["tax_year"].str.contains(r"\[revised\]")
df["tax_year"]    = df["tax_year"].str.replace(r"\s*\[.*\]","",regex=True).str.strip()
# AfT columns read "[not applicable]" for 2006/07–2011/12 -> coerce to NA
for c in ["aft_charges_n","aft_charges_value_gbp_m"]:
    df[c] = pd.to_numeric(df[c], errors="coerce")
```
- `engine="odf"` requires `pip install odfpy` (done in this environment).
- Units: `*_n` = counts (nearest 10); `*_value_gbp_m` / `*_excess_value_gbp_m` = £ million (nearest £1m); `std_aa_gbp` = pounds.

**Alt source: the tidy CSV** (`TidyData_Tables_7_and_8.csv`, encoding `utf-8-sig`), if you prefer long format — but you must re-apply provisional/revised flags per §6 (they are stripped). Filter `allowance_type=="Annual"`, then pivot on `reporting_method`: AfT rows → `number_of_charges`,`value_of_charges`; SA rows → `individuals_reporting_excess_contributions`,`value_of_excess_contributions`. `[z]` = NA.

**Index-construction guardrails (do not violate):**
- Two distinct series, never merged into one "AA charges" line:
  - **Scheme Pays burden** = AfT `number_of_charges` + `value_of_charges` (£m), **2012/13 onward only**.
  - **SA disclosure burden** = `individuals_over_aa` (count) + `value_of_excess` (£m of *excess contributions*, not charge), **2006/07 onward**.
- There is **no** "value of AA tax charges via SA". Do not compute, impute, or imply one.
- Do not add AfT + SA (overlapping populations; different reporting windows).
- Label 2023/24 provisional and 2016/17–2022/23 revised on every chart.
- Annotate 2016/17 (taper widens the SA count) and 2022/23 (McCloud pulls NHS charges out of SA) as methodology breaks, not organic movements.
- Attribute: "Source: HMRC Private pension statistics, July 2025 (OGL v3.0)."
