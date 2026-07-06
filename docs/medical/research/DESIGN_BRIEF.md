# P2 Design Brief: Annual Allowance Pension Tax Index

**Asset:** faceless, citable, open-data research report on the annual allowance pension tax burden, mirroring Property's UK Landlord Tax Index anatomy, at a new `/research/...` route on www.medicalaccounts.co.uk.
**Author:** P2 design architect (Opus). **Date:** 2026-07-06.
**Binding inputs:** `RESEARCH_ASSET_HANDOVER.md`, `RESEARCH_ASSET_STATE.md` (§2 P1-traps + §3 six gate constraints), `SOURCE_MANIFEST_HMRC.md`, `SOURCE_MANIFEST_NHSBSA.md`, `house_positions.md`.
**Status of this brief:** the single source of truth for P3 build lanes A/B/C. Section 7 (DATA CONTRACT) is **LOCKED**: lanes may not deviate. Everything else is prescriptive; lanes implement, they do not re-decide.

**Every figure in this brief traces to a manifest.** See §13 (figure provenance) for the line-by-line trace an adversarial skeptic can check. No figure is asserted that is not in a manifest, with one explicit, flagged class of exception: the intermediate HMRC table rows that lane A extracts deterministically from the ODS via the manifest parse recipe (§7c, §13).

---

## 0. Non-negotiable copy rules (apply to every string any lane writes)

1. UK English. **No em-dashes anywhere** (use commas, parentheses, full stops, middle dots).
2. **Faceless.** No named people, no "our expert", no Person JSON-LD. Attribution is always "Medical Accountants UK analysis of HMRC and NHSBSA data".
3. **Never call the SA excess-contributions column a "tax charge".** It is "pension savings above the annual allowance" / "excess contributions". Only the AfT / Scheme Pays value is a genuine charge value.
4. **Label whole-market vs NHS-specific on every figure.** HMRC figures = "all UK registered pension schemes". NHSBSA/FOI figures = "NHS Pension Scheme (England and Wales)".
5. **No freshness claims.** No "updated this month", no monthly language. Cadence is "annual, HMRC publishes each July; next edition Summer 2026".
6. **Absolute counts stated plainly** (e.g. "46,135 members"), never as a rate the data cannot support (no per-1,000-doctors metric in v1).
7. Facts that overlap `house_positions.md` must match it exactly (AA £60,000, taper floor £10,000, threshold income £200,000, adjusted income £260,000, Scheme Pays mandatory where charge > £2,000 and input > £60,000, 31 July deadline). Historical allowance values (£215,000, £40,000) are used only year-tagged as past figures, never presented as the current allowance. See §12.
8. MED-F7 freeze respected: homepage, GP-partner post, LeadForm, /contact are not edited. The report **uses** the existing `LeadForm` component unchanged.

---

## 1. NAMING DECISION (locked)

| field | value |
|---|---|
| **URL slug** | `/research/annual-allowance-pension-tax-index` |
| **H1** | `The annual allowance and NHS doctors: pension tax charges across UK registered pension schemes` |
| **Short display name** (eyebrow, breadcrumb, index-card title, Dataset name root) | `Annual Allowance Pension Tax Index` |
| **Page meta title** (≤60) | `Annual Allowance Pension Tax Index \| NHS & UK data` (50 chars) |

**Reasoning (4 sentences).** The recurring pound spine of this report is HMRC Table 7, which covers all UK registered pension schemes, so a name of the form "NHS Pension ... Index" would overclaim that the money figures are NHS-specific and would fail the §3 gate constraint (5); I have therefore dropped "NHS Pension" from the slug and made the display name whole-market ("Annual Allowance Pension Tax Index"). NHS relevance is still foregrounded honestly in the H1 and throughout the copy, because doctors are, on HMRC's own qualitative statement, a large share of annual allowance charges, the FOI layer is genuinely NHS-specific, and the 2022/23 reporting artefact is public-service (McCloud) driven. Keeping the slug on the new keyword territory "annual allowance pension tax" also avoids cannibalising the site's existing NHS-pension pages (`/nhs-pension`, `/calculators/nhs-pension-annual-allowance`, `/blog/nhs-pension-annual-allowance-complete-guide`), which already own the "NHS pension annual allowance" query at a different (advisory, not data) intent. The honesty fix therefore lives in the name and in per-figure labelling, not in hiding NHS relevance, which the audience and topical fit require.

**Hero subhead (hero paragraph, exact copy for lane B):**
> A sourced read on how annual allowance pension tax has grown in the UK. The recurring money series is HMRC data for all UK registered pension schemes. A separate NHS layer, from NHSBSA Freedom of Information data for the England and Wales scheme, shows how doctors sit within it. Built entirely from official open data. Annual data, published by HMRC each July, so the latest figures are around two tax years behind.

---

## 2. HERO STATS (exactly 4)

Rendered as 4 `Stat` blocks under the H1 (mirror Property's `grid-cols-2 sm:grid-cols-4`). All values are pre-computed into `data.headline` (no client arithmetic).

| # | value (display) | label (one line) | source + year | flag |
|---|---|---|---|---|
| 1 | **£350m** | annual allowance charges settled through schemes' Accounting for Tax returns (Scheme Pays) in 2023/24, across all UK registered pension schemes | HMRC Private pension statistics, Table 7, 2023/24 | **[provisional]** |
| 2 | **56,270** | individuals who reported pension savings above the annual allowance through Self Assessment, at the 2021/22 peak (all UK registered schemes) | HMRC Private pension statistics, Table 7, 2021/22 | [revised] |
| 3 | **46,135** | NHS Pension Scheme officer members in England and Wales whose pension growth exceeded the standard annual allowance in 2021/22 (NHSBSA FOI snapshot) | NHSBSA FOI-02228, 2021/22 | FOI snapshot |
| 4 | **£215k → £60k** | the standard annual allowance in 2006/07 versus 2023/24: the cap has fallen while charges climbed (all UK schemes) | HMRC Private pension statistics, Table 7 | £60k year [provisional] |

Notes for lane B: show the `[provisional]` flag on stat 1 as a small superscript or a trailing "(provisional)" in the qualifier, not as a separate visual system. Stat 4's value string is literally `£215k → £60k` (use a middle dot or arrow glyph `→`, which is allowed; it is not an em-dash).

---

## 3. CHART SET (4 charts)

All charts use recharts through the shadcn `ChartContainer` pattern (see §11 build-infra: lane B ports `chart.tsx` + `--chart-*` vars first). Component file: `Medical/web/src/components/research/AaIndexCharts.tsx`. The server page passes plain serialisable arrays only. Brand palette: `--chart-1` navy (primary), `--chart-2` copper (accent), `--chart-3` navy-light (provisional/secondary), `--chart-4` copper-light, `--chart-5` slate.

### Chart 1: `scheme-pays-value` (the money spine, whole-market)
- **Export:** `SchemePaysValueChart({ series })`.
- **Type:** Bar.
- **Series:** `hmrc.series` filtered to rows where `aft_charges_value_gbp_m != null`, i.e. **2012/13 → 2023/24 (12 bars)**. `x = tax_year`, `y = aft_charges_value_gbp_m`.
- **Axis units:** y = £ million (`tickFormatter` → `£{v}m`). x = tax year.
- **Colour rule:** all bars `--chart-1` except the `provisional` row (2023/24) rendered `--chart-3` with a distinct fill (the provisional treatment).
- **Required annotations:** (a) the 2023/24 bar carries a provisional marker + legend note "2023/24 provisional"; (b) caption footnote: "Scheme Pays reporting through the Accounting for Tax return began in 2012/13, so this series does not extend earlier. The PODS digital service (from 2020/21) improved reporting and may lift later years." **Do NOT plot before 2012/13.**

### Chart 2: `sa-individuals` (Self Assessment disclosure, whole-market)
- **Export:** `SaIndividualsChart({ series })`.
- **Type:** Bar (discrete annual bars, so no line implies smooth continuity across the definitional breaks).
- **Series:** `hmrc.series`, all rows **2006/07 → 2023/24 (18 bars)**. `x = tax_year`, `y = sa_individuals_over_aa_n`.
- **Axis units:** y = number of individuals (`toLocaleString("en-GB")`). x = tax year.
- **Colour rule:** bars `--chart-1`; the 2022/23 and 2023/24 bars `--chart-3` to visually mark the artefact/provisional years.
- **Required annotations (all three, per P1-traps and the task):**
  1. **2016/17 taper-widening note:** a `ReferenceLine`/marker or caption line: "From 2016/17 this count also includes members caught by the tapered allowance and the money purchase allowance, a definitional widening (visible step up), not purely a behavioural rise."
  2. **2022/23 McCloud artefact note:** marker + caption: "The 2022/23 fall (56,270 in 2021/22 to 34,190) is a reporting artefact: public-service (McCloud) members were told to report 2022/23 charges through HMRC's public service pension adjustment service instead of Self Assessment. It is not a real fall in the burden."
  3. **2023/24 provisional marker** on that bar + legend note.

### Chart 3: `nhs-exceeded` (the NHS-specific layer, England and Wales)
- **Export:** `NhsExceededChart({ series })`.
- **Type:** grouped Bar (two series side by side).
- **Series:** `nhs.exceeded_aa`, **2015/16 → 2021/22 ONLY (7 year-groups)**. Two bars per year: `practitioner_exceeded` (`--chart-1`) and `officer_exceeded` (`--chart-2`). `x = tax_year`.
- **Axis units:** y = number of members. x = tax year.
- **Hard rule:** the array in the JSON for this chart contains only 2015/16–2021/22 (see §7c). 2022/23 and 2023/24 are excluded at the data layer, so the chart cannot accidentally render them. **Never chart 2022/23 or 2023/24 from FOI-02228.**
- **Required annotations:** caption: "NHS Pension Scheme, England and Wales. A point-in-time NHSBSA Freedom of Information snapshot (data as at 26 September 2024, on the pre-McCloud-rollback basis). Counts members whose pension growth exceeded the standard annual allowance only, so members caught by the taper are not included. The 2021/22 officer spike (46,135) reflects that year's high CPI revaluation of the 2015 scheme." Legend labels: "Practitioners (GPs)", "Officers (hospital doctors and others)".

### Chart 4: `allowance-path` (the policy driver, whole-market)
- **Export:** `AllowancePathChart({ series })`.
- **Type:** Line, `type="stepAfter"` (a step chart: the allowance is a policy level, not a smooth trend).
- **Series:** `hmrc.series`, all rows **2006/07 → 2023/24**. `x = tax_year`, `y = standard_aa_gbp`.
- **Axis units:** y = £ (`tickFormatter` → `£{Math.round(v/1000)}k`). x = tax year.
- **Colour:** single line `--chart-2` (copper), width 2.5.
- **Required annotations:** caption: "The standard annual allowance, set by policy. It fell from £215,000 (2006/07) to £40,000, then rose to £60,000 from 2023/24. Falling allowances, not just larger pensions, drove the rise in charges. All UK schemes." Mark the 2023/24 point provisional in the caption only (the £60,000 level itself is a legislated figure; the provisional flag is on the accompanying charge data, not the allowance).

**Chart honesty guardrails (bind lane B):** never merge Scheme Pays and SA into one line; never draw Scheme Pays value before 2012/13; never draw the NHS series past 2021/22; never sum AfT + SA.

---

## 4. BREAKDOWN TABLE

Primary breakdown = the full HMRC Table 7 series (whole-market), in the "By year" section. A secondary NHS table sits inside the NHS chart section.

### 4a. Primary table: HMRC Table 7 (all UK registered pension schemes)
Source array: `hmrc.series` (all 18 rows, 2006/07 → 2023/24, ascending).

| column header (exact) | field | format |
|---|---|---|
| Tax year | `tax_year` | text, e.g. "2006/07" |
| Standard annual allowance | `standard_aa_gbp` | `fmtGBP` |
| Scheme Pays charges (AfT) | `aft_charges_n` | `fmtInt`, "n/a" when null |
| Value of Scheme Pays charges | `aft_charges_value_gbp_m` | `fmtGBPm` (£m), "n/a" when null |
| Individuals over AA via Self Assessment | `sa_individuals_over_aa_n` | `fmtInt` |
| Value of contributions in excess of AA (Self Assessment) | `sa_excess_value_gbp_m` | `fmtGBPm` (£m) |
| Status | derived from `provisional`/`revised` | "Provisional" / "Revised" / "" |

Table caption (exact): "All UK registered pension schemes (HMRC). Scheme Pays (Accounting for Tax) columns begin in 2012/13, marked n/a before then. The Self Assessment value column is contributions above the allowance, not a tax charge. The 2022/23 fall in the Self Assessment count is a McCloud reporting artefact (public-service members reported via HMRC's adjustment service, see the Self Assessment section above), not a real decline. Counts rounded to the nearest 10, values to the nearest £1 million."

### 4b. Secondary table: NHS FOI (England and Wales)
Source array: `nhs.exceeded_aa` (7 rows, 2015/16 → 2021/22).

| column header | field |
|---|---|
| Tax year | `tax_year` |
| Practitioners over standard AA | `practitioner_exceeded` |
| Officers over standard AA | `officer_exceeded` |
| Total over standard AA | `total_exceeded` |

Caption: "NHS Pension Scheme, England and Wales (NHSBSA FOI-02228). Members whose pension growth exceeded the standard annual allowance. Point-in-time snapshot; standard allowance only (excludes taper cases); 2022/23 and 2023/24 omitted because they were not yet fully calculated at the snapshot date."

### 4c. Optional role-split callout (not a time series)
`nhs_role_split_2019_20` (FOI-02711) may render as a short inline list under the NHS section: "In 2019/20, GPs registered 8,239 Scheme Pays election forms and hospital doctors 9,745, together about 90% of the roughly 19,900 forms that year (NHSBSA FOI-02711, submission-date basis, England and Wales)." Label clearly as a single-year illustration on a different counting basis from the table above, so it is not tied into any trend.

---

## 5. KEY FACTS BOX (7 bullets, exact copy)

Rendered as the plain-language, LLM-extractable box directly under the hero (Property's "Key facts" pattern, copper-tinted for medical brand). Each bullet is self-contained and quotable, with the whole-market vs NHS scope stated inline.

1. Across all UK registered pension schemes, £350m of annual allowance charges were settled through pension schemes' Accounting for Tax returns (Scheme Pays) in 2023/24, provisional (HMRC).
2. The value of annual allowance charges paid through Scheme Pays rose from £64m in 2016/17 to £350m in 2023/24 (provisional), across all UK registered pension schemes (HMRC).
3. The number of people reporting pension savings above the annual allowance through Self Assessment peaked at 56,270 in 2021/22, up from 18,720 in 2016/17, across all UK registered schemes (HMRC). This is a count of individuals, not a tax charge value.
4. The standard annual allowance was cut from £215,000 in 2006/07 to £40,000 for most of the 2016/17 to 2022/23 period, then raised to £60,000 from 2023/24, so more savers were pulled over the threshold even before pensions grew (HMRC).
5. In the NHS Pension Scheme for England and Wales, 46,135 officer members (hospital doctors and other non-practitioner staff) had pension growth above the standard annual allowance in 2021/22, alongside 7,991 practitioners (GPs), on an NHSBSA Freedom of Information snapshot.
6. The 2021/22 NHS spike reflects that year's high CPI revaluation of the 2015 pension scheme, which inflated members' measured pension growth. It is a mechanical effect of how defined-benefit growth is calculated, not a change in pay.
7. Reported charges appear to fall in 2022/23, but this is a reporting artefact: NHS and other public-service members were directed to report 2022/23 annual allowance charges through HMRC's public service pension adjustment service (the McCloud remedy route) rather than Self Assessment. The underlying burden did not fall.

**Attribution line (exact, closes the box):**
> Source: Medical Accountants UK analysis of HMRC Private pension statistics (July 2025) and NHSBSA data, all under the Open Government Licence v3.0. Free to cite with attribution to Medical Accountants UK. This page is a data summary and not tax advice on any individual situation.

---

## 6. FAQ (7 Q&A, exact draft copy)

Passed to `buildFaqPage` (see §8) as `{ question, answer }` objects, and rendered visually in the FAQ section.

1. **Q: Does an annual allowance charge mean a doctor has to leave the NHS pension scheme?**
   A: No. An annual allowance charge is a tax charge on pension growth above the allowance in a year, and it does not remove the member from the scheme or stop future accrual. Many members settle the charge through Scheme Pays, where the NHS scheme pays the charge to HMRC in exchange for a permanent, actuarially assessed reduction in that member's benefits. The figures in this report are gross counts of members and charges, so a member appearing in one year is still an active or deferred member of the scheme.

2. **Q: Why does this data lag by around two years?**
   A: HMRC publishes its Private pension statistics once a year, each July, and the newest tax year it covers is around 18 to 24 months behind because annual allowance charges are reported through Self Assessment and through schemes' Accounting for Tax returns, which are filed and processed after the tax year ends. The July 2025 edition used here reaches the 2023/24 tax year, and that year is still marked provisional. The next edition is due in summer 2026.

3. **Q: What changed in 2023/24?**
   A: The standard annual allowance rose from £40,000 to £60,000 from 6 April 2023, and the minimum tapered allowance rose from £4,000 to £10,000. A higher allowance means fewer members breach it, which is one reason Self Assessment counts fall in 2023/24. Because 2023/24 also overlaps the McCloud reporting change, the two effects should be read together, not treated as a single clean trend.

4. **Q: What is Scheme Pays?**
   A: Scheme Pays lets a pension scheme settle a member's annual allowance charge with HMRC, so the member does not have to fund it from cash, in exchange for a permanent reduction in their scheme benefits. In the NHS scheme, mandatory Scheme Pays is available where the charge is more than £2,000 and the member's pension input in the NHS scheme alone exceeds the £60,000 standard allowance; a charge driven only by the taper below £60,000 is voluntary Scheme Pays. The election deadline is 31 July in the year after the year the charge relates to, so a 2025/26 charge must be elected by 31 July 2027. The money series in this report is HMRC's national count of charges reported and paid this way, across all UK registered pension schemes.

5. **Q: Why did reported charges fall in 2022/23?**
   A: The fall is a reporting artefact, not a real decline. For 2022/23, public-service pension members, a group that includes NHS doctors, were directed to report their annual allowance position through HMRC's public service pension adjustment service, set up for the McCloud remedy, rather than through Self Assessment. That pulled a large block of charges out of the Self Assessment count, which dropped from 56,270 individuals in 2021/22 to 34,190. The underlying burden did not fall; it was recorded elsewhere.

6. **Q: Is this an NHS-specific dataset?**
   A: Partly. The recurring money and count series comes from HMRC and covers all UK registered pension schemes, not the NHS alone, although HMRC states that a significant share of annual allowance charges come from public-service scheme members. The NHS-specific layer comes from NHSBSA Freedom of Information data for the England and Wales scheme, which counts how many practitioner and officer members had pension growth above the standard allowance. We keep the two clearly separate throughout, and we do not present a national money figure as if it were NHS-only.

7. **Q: Can I use these figures?**
   A: Yes. Every source here is published under the Open Government Licence v3.0. You are free to cite the figures and download the underlying data, with attribution to Medical Accountants UK. If you are a doctor trying to work out your own annual allowance position, our NHS pension annual allowance calculator models your pension input against the £60,000 allowance and the taper, and we can review your position directly.

---

## 7. LOCKED DATA CONTRACT (lanes may NOT deviate)

File is `Medical/web/src/data/nhs-aa-index.json`. Lane A produces it; lane B consumes it read-only. Field names, nesting and types below are binding. All money-value fields are in £ million except `standard_aa_gbp` (whole pounds). Counts are integers or null. Tax years are strings in `YYYY/YY` form (e.g. `"2021/22"`).

### 7a. JSON schema (exact shape)

```json
{
  "meta": {
    "generated_at": "2026-07-06",
    "retrieved_date": "2026-07-06",
    "hmrc_publication_date": "2025-07-31",
    "hmrc_edition": "July 2025",
    "latest_year": "2023/24",
    "provisional_years": ["2023/24"],
    "revised_years": ["2016/17","2017/18","2018/19","2019/20","2020/21","2021/22","2022/23"],
    "foi_snapshot_date": "2024-09-26",
    "foi_safe_window": ["2015/16","2016/17","2017/18","2018/19","2019/20","2020/21","2021/22"],
    "nhs_scope": "England and Wales",
    "temporal_coverage": "2006-04-06/2024-04-05",
    "license": "Open Government Licence v3.0",
    "license_url": "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    "update_cadence": "Annual. HMRC publishes each July; the next edition is due Summer 2026.",
    "next_release": "Summer 2026",
    "sources": [
      { "name": "Private pension statistics (Table 7, annual allowance)", "publisher": "HM Revenue and Customs", "url": "https://www.gov.uk/government/statistics/personal-and-stakeholder-pensions-statistics", "licence": "OGL v3.0" },
      { "name": "NHS Pension Scheme Annual Report and Accounts 2024-25 (membership, section 3.3)", "publisher": "NHS Business Services Authority", "url": "https://www.nhsbsa.nhs.uk/information-about-nhs-pensions/nhs-pension-scheme-accounts-and-valuation-reports", "licence": "OGL v3.0" },
      { "name": "FOI-02228: members exceeding the annual allowance and Scheme Pays records", "publisher": "NHS Business Services Authority", "url": "https://opendata.nhsbsa.net/dataset/foi-02228", "licence": "OGL v3.0" },
      { "name": "FOI-02711: Scheme Pays election forms 2019/20 by role", "publisher": "NHS Business Services Authority", "url": "https://opendata.nhsbsa.net/dataset/foi-02711", "licence": "OGL v3.0" }
    ],
    "notes": "The recurring money and count series is HMRC data for all UK registered pension schemes; there is no NHS split in that source. The NHS layer is an NHSBSA FOI snapshot for the England and Wales scheme. The Self Assessment value column is contributions above the allowance, not a tax charge. Scheme Pays (Accounting for Tax) values begin in 2012/13. FOI figures for 2022/23 and 2023/24 are excluded as undercounted at the snapshot date."
  },

  "hmrc": {
    "series": [
      { "tax_year": "2006/07", "standard_aa_gbp": 215000, "aft_charges_n": null, "aft_charges_value_gbp_m": null, "sa_individuals_over_aa_n": 140, "sa_excess_value_gbp_m": 2, "provisional": false, "revised": false }
      /* ... lane A fills all 18 rows 2006/07 -> 2023/24 from the ODS via the HMRC manifest §10 parse recipe.
         Verified anchor rows the skeptic and lane A must reproduce exactly (from HMRC manifest §5c):
           2016/17: standard_aa_gbp 40000, aft_charges_n 2940,  aft_charges_value_gbp_m 64,  sa_individuals_over_aa_n 18720, sa_excess_value_gbp_m 584,  revised true
           2019/20: standard_aa_gbp 40000, aft_charges_n 21630, aft_charges_value_gbp_m 256, sa_individuals_over_aa_n 45210, sa_excess_value_gbp_m 1011, revised true
           2021/22: standard_aa_gbp 40000, aft_charges_n 50590, aft_charges_value_gbp_m 328, sa_individuals_over_aa_n 56270, sa_excess_value_gbp_m 1288, revised true
           2022/23: standard_aa_gbp 40000, aft_charges_n 54920, aft_charges_value_gbp_m 348, sa_individuals_over_aa_n 34190, sa_excess_value_gbp_m 728,  revised true
           2023/24: standard_aa_gbp 60000, aft_charges_n 49590, aft_charges_value_gbp_m 350, sa_individuals_over_aa_n 23370, sa_excess_value_gbp_m 466,  provisional true
         aft_charges_n and aft_charges_value_gbp_m are null for 2006/07-2011/12 (AfT begins 2012/13). */
    ]
  },

  "nhs": {
    "foi_reference": "FOI-02228",
    "snapshot_date": "2024-09-26",
    "scope": "England and Wales",
    "basis": "Standard annual allowance only; pre-McCloud-rollback (members in the 2015 scheme).",
    "exceeded_aa": [
      { "tax_year": "2015/16", "practitioner_exceeded": 3111, "officer_exceeded": 12562, "total_exceeded": 15673, "practitioner_scheme_pays_records": 292,  "officer_scheme_pays_records": 222 },
      { "tax_year": "2016/17", "practitioner_exceeded": 8996, "officer_exceeded": 20817, "total_exceeded": 29813, "practitioner_scheme_pays_records": 1892, "officer_scheme_pays_records": 1286 },
      { "tax_year": "2017/18", "practitioner_exceeded": 9251, "officer_exceeded": 18776, "total_exceeded": 28027, "practitioner_scheme_pays_records": 3630, "officer_scheme_pays_records": 3162 },
      { "tax_year": "2018/19", "practitioner_exceeded": 6637, "officer_exceeded": 13259, "total_exceeded": 19896, "practitioner_scheme_pays_records": 3646, "officer_scheme_pays_records": 3805 },
      { "tax_year": "2019/20", "practitioner_exceeded": 6925, "officer_exceeded": 19130, "total_exceeded": 26055, "practitioner_scheme_pays_records": 9356, "officer_scheme_pays_records": 10476 },
      { "tax_year": "2020/21", "practitioner_exceeded": 6200, "officer_exceeded": 23289, "total_exceeded": 29489, "practitioner_scheme_pays_records": 4962, "officer_scheme_pays_records": 4902 },
      { "tax_year": "2021/22", "practitioner_exceeded": 7991, "officer_exceeded": 46135, "total_exceeded": 54126, "practitioner_scheme_pays_records": 6424, "officer_scheme_pays_records": 7639 }
    ]
  },

  "nhs_role_split_2019_20": {
    "foi_reference": "FOI-02711",
    "basis": "Scheme Pays election forms registered in 2019/20 (submission-date basis).",
    "scope": "England and Wales",
    "rows": [
      { "employment_type": "GP",                "scheme_pays_forms": 8239, "applied_aa_compensation": 6611 },
      { "employment_type": "Hospital Doctor",   "scheme_pays_forms": 9745, "applied_aa_compensation": 8344 },
      { "employment_type": "Officer",           "scheme_pays_forms": 890,  "applied_aa_compensation": 345  },
      { "employment_type": "GDP (dentist)",     "scheme_pays_forms": 442,  "applied_aa_compensation": 255  },
      { "employment_type": "Special Class Nurse","scheme_pays_forms": 190, "applied_aa_compensation": 152  },
      { "employment_type": "Non-SC Nurse",      "scheme_pays_forms": 319,  "applied_aa_compensation": 232  },
      { "employment_type": "Hospital Dentist",  "scheme_pays_forms": 26,   "applied_aa_compensation": 24   }
    ]
  },

  "member_counts": {
    "scope": "England and Wales",
    "source": "NHS Pension Scheme Annual Report and Accounts, section 3.3 movement table (closing figures).",
    "rows": [
      { "as_at": "2023-03-31", "active": 1815310, "deferred": 772560, "pensions_in_payment": 1098388 },
      { "as_at": "2024-03-31", "active": 1868523, "deferred": 802262, "pensions_in_payment": 1145617 },
      { "as_at": "2025-03-31", "active": 1872287, "deferred": 845020, "pensions_in_payment": 1199771 }
    ]
  },

  "headline": {
    "scheme_pays_value_latest_gbp_m": 350,
    "scheme_pays_value_latest_year": "2023/24",
    "scheme_pays_value_2016_17_gbp_m": 64,
    "sa_peak_individuals": 56270,
    "sa_peak_year": "2021/22",
    "sa_2016_17_individuals": 18720,
    "nhs_officer_peak_2021_22": 46135,
    "nhs_practitioner_2021_22": 7991,
    "aa_2006_07_gbp": 215000,
    "aa_latest_gbp": 60000,
    "aa_latest_year": "2023/24",
    "member_active_latest": 1872287,
    "member_active_latest_as_at": "2025-03-31"
  }
}
```

Lane A validation rule: `headline` values must be recomputed from the arrays, not hand-typed, and must equal the anchor figures above (a `--dry-run` self-check asserts `scheme_pays_value_latest_gbp_m == series[last].aft_charges_value_gbp_m == 350`, `sa_peak == max(sa_individuals_over_aa_n) == 56270`, `nhs_officer_peak_2021_22 == 46135`). The build fails if any assertion fails.

### 7b. TypeScript interface: `Medical/web/src/lib/research/nhs-aa-index.ts`

```ts
export interface AaIndexSnapshot {
  meta: {
    generated_at: string;
    retrieved_date: string;
    hmrc_publication_date: string;
    hmrc_edition: string;
    latest_year: string;
    provisional_years: string[];
    revised_years: string[];
    foi_snapshot_date: string;
    foi_safe_window: string[];
    nhs_scope: string;
    temporal_coverage: string;
    license: string;
    license_url: string;
    update_cadence: string;
    next_release: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
    notes: string;
  };
  hmrc: {
    series: Array<{
      tax_year: string;
      standard_aa_gbp: number;
      aft_charges_n: number | null;
      aft_charges_value_gbp_m: number | null;
      sa_individuals_over_aa_n: number;
      sa_excess_value_gbp_m: number;
      provisional: boolean;
      revised: boolean;
    }>;
  };
  nhs: {
    foi_reference: string;
    snapshot_date: string;
    scope: string;
    basis: string;
    exceeded_aa: Array<{
      tax_year: string;
      practitioner_exceeded: number;
      officer_exceeded: number;
      total_exceeded: number;
      practitioner_scheme_pays_records: number;
      officer_scheme_pays_records: number;
    }>;
  };
  nhs_role_split_2019_20: {
    foi_reference: string;
    basis: string;
    scope: string;
    rows: Array<{ employment_type: string; scheme_pays_forms: number; applied_aa_compensation: number }>;
  };
  member_counts: {
    scope: string;
    source: string;
    rows: Array<{ as_at: string; active: number; deferred: number; pensions_in_payment: number }>;
  };
  headline: {
    scheme_pays_value_latest_gbp_m: number;
    scheme_pays_value_latest_year: string;
    scheme_pays_value_2016_17_gbp_m: number;
    sa_peak_individuals: number;
    sa_peak_year: string;
    sa_2016_17_individuals: number;
    nhs_officer_peak_2021_22: number;
    nhs_practitioner_2021_22: number;
    aa_2006_07_gbp: number;
    aa_latest_gbp: number;
    aa_latest_year: string;
    member_active_latest: number;
    member_active_latest_as_at: string;
  };
}

// Formatter signatures (implement in the same file):
export function fmtInt(n: number | null | undefined): string;   // "46,135"; "n/a" when null
export function fmtGBP(n: number | null | undefined): string;    // "£60,000"; "n/a" when null
export function fmtGBPm(n: number | null | undefined): string;   // "£350m"; "n/a" when null
export function fmtGBPk(n: number | null | undefined): string;   // "£215k" (axis/compact)
export function taxYearLabel(ty: string): string;                // identity passthrough, reserved for future formatting
```

`fmtInt`/`fmtGBP` bodies match Property's `landlord-index.ts` exactly (`Math.round(n).toLocaleString("en-GB")`). `fmtGBPm` returns `` `£${Math.round(n)}m` ``. `fmtGBPk` returns `` `£${Math.round(n/1000)}k` ``.

### 7c. CSV download spec: `Medical/web/src/app/research/annual-allowance-pension-tax-index/data/route.ts`
`export const dynamic = "force-static";`. Imports the same snapshot JSON, so page and CSV can never drift. The CSV is the **HMRC whole-market spine** (the journalist artifact); the NHS FOI source is downloadable at NHSBSA and is linked in the methodology, so it is not duplicated into this CSV.

- **Column headers (row order = header first, then rows):**
  `tax_year,standard_annual_allowance_gbp,scheme_pays_charges_n,scheme_pays_charge_value_gbp_m,sa_individuals_over_aa_n,sa_excess_contributions_value_gbp_m,status`
- **Row order:** `hmrc.series` in ascending tax-year order (2006/07 first, 2023/24 last).
- **Cell rules:** null AfT cells render empty (`""`). `status` = `provisional` | `revised` | empty.
- **Header comment block (prepended, each line starts `#`):**
  ```
  # Annual Allowance Pension Tax Index: annual allowance charges across all UK registered pension schemes
  # Source: HMRC Private pension statistics, Table 7 (July 2025 edition). Open Government Licence v3.0.
  # Whole-market (all UK registered schemes), NOT NHS-only. NHS-specific figures: see NHSBSA FOI-02228.
  # scheme_pays_* columns begin in 2012/13 (Accounting for Tax); earlier years are blank.
  # sa_excess_contributions_value_gbp_m is contributions ABOVE the allowance, NOT a tax charge.
  # 2022/23 Self Assessment counts are depressed by McCloud reporting moving to HMRC's adjustment service.
  # status=provisional (2023/24) or revised (2016/17-2022/23).
  # Free to reuse with attribution to Medical Accountants UK (medicalaccounts.co.uk).
  ```
- **Response headers:** `content-type: text/csv; charset=utf-8`; `content-disposition: attachment; filename="annual-allowance-pension-tax-index.csv"`; `cache-control: public, max-age=3600`.
- Trailing newline appended (mirror Property `csv + "\n"`).

---

## 8. JSON-LD SPEC

Three blocks emitted from the report `page.tsx` (lane B), each via `<script type="application/ld+json">`. Article and Dataset are hand-written inline objects (mirror Property). FAQPage uses the medical shared helper. **No Person entities anywhere.** (The `Breadcrumb` component already emits its own `BreadcrumbList` JSON-LD; do not duplicate it.)

### 8a. Article
```ts
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Annual Allowance Pension Tax Index",
  description: "How annual allowance pension tax charges have grown across UK registered pension schemes (HMRC), with an NHS Pension Scheme lens on doctors.",
  inLanguage: "en-GB",
  datePublished: "2026-07-06",
  dateModified: meta.generated_at,
  author: { "@type": "Organization", name: siteConfig.name },      // "Medical Accountants UK"
  publisher: { "@type": "Organization", name: siteConfig.name },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/research/annual-allowance-pension-tax-index` },
};
```
(If the medical site exposes an Organization `@id` anchor equivalent to Property's `#organization`, lane B may reference it instead of an inline Organization; a plain inline Organization with `name` is acceptable and faceless.)

### 8b. Dataset
```ts
const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Annual Allowance Pension Tax Index: UK pension tax charges (HMRC) with an NHS Pension Scheme lens",
  description: "Annual counts and values of pension annual allowance charges across all UK registered pension schemes (HMRC Private pension statistics, Table 7), with an NHS Pension Scheme (England and Wales) corroboration layer from NHSBSA Freedom of Information data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: { "@type": "Organization", name: siteConfig.name },
  publisher: { "@type": "Organization", name: siteConfig.name },
  dateModified: meta.generated_at,
  temporalCoverage: "2006-04-06/2024-04-05",
  spatialCoverage: { "@type": "Country", name: "United Kingdom" },
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}/research/annual-allowance-pension-tax-index/data`,
    },
  ],
  variableMeasured: [
    "Annual allowance charges reported and paid via Scheme Pays (count and value), all UK registered schemes",
    "Individuals reporting pension savings above the annual allowance via Self Assessment",
    "Standard annual allowance by tax year",
    "NHS Pension Scheme members exceeding the standard annual allowance (England and Wales)",
  ],
};
```
`spatialCoverage` is United Kingdom because the primary dataset/CSV is the HMRC UK series; the NHS layer's England-and-Wales scope is stated in the description and methodology.

### 8c. FAQPage
```ts
import { buildFaqPage } from "@/lib/schema"; // FaqEntry = { question: string; answer: string }
// ...
{buildFaqPage(faqs) && (
  <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }} />
)}
```
`faqs` is the array from §6 (each `{ question, answer }`). Note the helper's shape is `{ question, answer }` (not Property's `q/a`), and its export name is **`buildFaqPage`** (re-exported from `@/lib/schema`; the handover's "buildFaqPageJsonLd" name does not exist on the medical site, corrected here).

---

## 9. METHODOLOGY SECTION OUTLINE

Section title "Methodology and sources". Prose paragraphs plus a linked source list plus the CSV link plus the how-to-cite block. Content:

**Sources and what was taken from each:**
- **HMRC Private pension statistics, Table 7 (annual allowance), July 2025 edition.** URL: https://www.gov.uk/government/statistics/personal-and-stakeholder-pensions-statistics . Taken: the standard annual allowance by year; the number and value of annual allowance charges reported through schemes' Accounting for Tax returns (Scheme Pays), 2012/13 onward; and the number of individuals reporting pension savings above the allowance through Self Assessment, plus the value of those excess contributions, 2006/07 onward. This is all UK registered pension schemes; there is no NHS split in this source.
- **NHSBSA FOI-02228.** URL: https://opendata.nhsbsa.net/dataset/foi-02228 . Taken: the number of NHS Pension Scheme (England and Wales) practitioner and officer members whose pension growth exceeded the standard annual allowance, 2015/16 to 2021/22. Used as a point-in-time snapshot only.
- **NHSBSA FOI-02711.** URL: https://opendata.nhsbsa.net/dataset/foi-02711 . Taken: the single-year 2019/20 split of Scheme Pays election forms by role (GPs, hospital doctors and others). Illustrative role colour only, on a different counting basis.
- **NHS Pension Scheme Annual Report and Accounts (section 3.3 movement table).** URL: https://www.nhsbsa.nhs.uk/information-about-nhs-pensions/nhs-pension-scheme-accounts-and-valuation-reports . Taken: closing active, deferred and pensioner member counts at 31 March 2023, 2024 and 2025 (England and Wales), as population context.

**Honesty caveats (must all appear):**
1. Annual data with a lag of roughly 18 to 24 months; HMRC publishes each July; the July 2025 edition reaches 2023/24, still provisional; next release summer 2026.
2. The Self Assessment money column is the value of contributions above the allowance, not a tax charge. HMRC does not publish a Self Assessment annual allowance charge value.
3. Scheme Pays (Accounting for Tax) charge values begin in 2012/13, so the money series does not extend earlier.
4. From 2016/17 the Self Assessment count also captures tapered and money-purchase allowance breaches, a definitional widening.
5. The 2022/23 fall in Self Assessment figures is a McCloud reporting artefact, not a real decline.
6. Counts are gross; an annual allowance charge does not mean a member left the scheme.
7. NHS figures are England and Wales only (Scotland and Northern Ireland run separate schemes). The FOI figures are a pre-McCloud-rollback snapshot, standard allowance only, with 2022/23 and 2023/24 excluded as undercounted at the snapshot date.
8. The HMRC series is all UK registered pension schemes, not NHS-only; the two layers are kept separate.

**Licence statement:** "All sources are published under the Open Government Licence v3.0. This report is Medical Accountants UK analysis of HMRC and NHSBSA data."

**How to cite (block):** "Cite as: Medical Accountants UK, Annual Allowance Pension Tax Index, analysis of HMRC Private pension statistics (July 2025) and NHSBSA data, 2026. Free to reuse with attribution."

**Update cadence promise:** "Reviewed on each HMRC annual publication (each July). This edition uses data to the 2023/24 tax year." No monthly language.

**CSV link:** "Download the HMRC annual allowance data (CSV)" → `/research/annual-allowance-pension-tax-index/data`.

Source list rendering mirrors Property (`meta.sources.map`, links `rel="nofollow"`, publisher in muted parentheses).

---

## 10. GEO PACKAGING TEXT

### 10a. llms.txt section (lane C adds under a new `## Original research and data` heading in `Medical/web/public/llms.txt`)
```
## Original research and data

- Annual Allowance Pension Tax Index: https://www.medicalaccounts.co.uk/research/annual-allowance-pension-tax-index
  Medical Accountants UK analysis of official open data on the pension annual allowance burden. Across all UK registered pension schemes (HMRC Private pension statistics, Table 7), the value of annual allowance charges settled through Scheme Pays reached £350m in 2023/24 (provisional), up from £64m in 2016/17, and Self Assessment reports of pension savings above the allowance peaked at 56,270 individuals in 2021/22. An NHS-specific layer (NHSBSA Freedom of Information data, England and Wales) shows 46,135 officer members exceeded the standard allowance in 2021/22. Annual data, published by HMRC each July, around two tax years in arrears. Downloadable CSV: https://www.medicalaccounts.co.uk/research/annual-allowance-pension-tax-index/data . Free to cite with attribution to Medical Accountants UK (Open Government Licence v3.0).

- Research index: https://www.medicalaccounts.co.uk/research
```

### 10b. Sitemap entries (lane C adds to `Medical/web/src/app/sitemap.ts` `staticPaths`)
Add `"/research"` and `"/research/annual-allowance-pension-tax-index"` to `staticPaths`. Both inherit `changeFrequency: "monthly"` (the default branch, since neither is `/blog`) and `priority: 0.7`. Set their `lastModified` to a new stable constant `RESEARCH_DATE = new Date("2026-07-06")` (do not use `CRO_WAVE`/`STATIC`; add the constant so the research pages carry their own stable lastmod). Do not churn lastmod on rebuilds.

### 10c. Meta (report page)
- Title (≤60): `Annual Allowance Pension Tax Index | NHS & UK data` (50)
- Description (≤155): `How annual allowance pension tax charges grew across UK pension schemes (HMRC data), with an NHS Pension Scheme lens on doctors. Free to cite.` (~142)
- `alternates.canonical`: `${siteConfig.url}/research/annual-allowance-pension-tax-index`
- openGraph: type `article`, same title, description "Annual allowance charges across UK pension schemes, with an NHS Pension Scheme lens, from official open data."

### 10d. Meta (/research index page)
- Title (≤60): `Medical tax research and data | Medical Accountants UK` (54)
- Description (≤155): `Original, sourced data on NHS pensions, the annual allowance and doctors' tax, built from official open data. Free to read and cite with attribution.` (~149)
- `alternates.canonical`: `${siteConfig.url}/research`

---

## 11. RESEARCH INDEX PAGE CARD

The `/research` index (lane B) renders a `reports` array with one entry. Card content:

| field | value |
|---|---|
| `href` | `/research/annual-allowance-pension-tax-index` |
| `title` | `Annual Allowance Pension Tax Index` |
| primary `stat` | `£350m` |
| `statLabel` | `annual allowance charges settled via Scheme Pays in 2023/24 (all UK schemes, provisional)` |
| `blurb` (one sentence) | `How annual allowance pension tax has grown across UK registered pension schemes, with an NHS Pension Scheme lens on doctors, from HMRC and NHSBSA open data.` |
| `updated` | `Data to the 2023/24 tax year` (NOT a month; no freshness language) |

Three stat highlights to surface on the card (small stat row, optional but specified): `£350m` (Scheme Pays value 2023/24, all UK schemes), `56,270` (SA peak individuals 2021/22, all UK schemes), `46,135` (NHS officer members over the allowance 2021/22, England and Wales). Each with its whole-market/NHS scope label.

Hero copy for the /research index (mirror Property): H1 `Medical tax research and data`; subhead `Original, sourced reads on NHS pensions, the annual allowance and doctors' tax, built entirely from official open data. Free to read and cite with attribution.`

---

## 12. HOUSE-POSITIONS CROSS-CHECK

| fact used in copy | house_positions | verdict |
|---|---|---|
| Standard annual allowance = £60,000 (current, 2023/24 onward) | §2.B confirms £60,000 | confirms |
| Tapered allowance floor £10,000; threshold income £200,000; adjusted income £260,000 | §2.B confirms all three | confirms |
| MPAA £10,000 | §2.B confirms | confirms (not foregrounded, only in the taper note) |
| Scheme Pays mandatory where charge > £2,000 AND input > £60,000; taper-only = voluntary | §2.D confirms exactly | confirms (FAQ 4) |
| Scheme Pays election deadline 31 July in the year after the charge year (2025/26 → 31 July 2027) | §2.D confirms exactly | confirms (FAQ 4) |
| Scheme Pays = permanent actuarial benefit reduction, member stays in scheme | §2.D confirms mechanics | confirms (FAQ 1, 4) |
| Pension input amount (capitalised growth), not contributions, is measured for DB | §2.B confirms | confirms |
| Carry-forward of unused allowance over 3 years | §2.B confirms | not used in copy (available if needed) |
| Practitioner vs officer distinction in the NHS scheme | §2.C confirms | confirms (chart 3, key facts, FAQ 6) |
| NHS scheme is England and Wales; Scotland/NI separate | §2 / NHSBSA manifest confirm E&W | confirms |
| 2015 scheme is CARE; McCloud remedy period 1 Apr 2015 to 31 Mar 2022, rollback 1 Oct 2023 | §2, §2.A confirm | confirms (FAQ 5, chart 2 note) |
| McCloud reporting via HMRC public service pension adjustment service | §2.A references the Digital Remedy Service / HMRC route | confirms (consistent framing) |
| LTA abolished 6 Apr 2024 | §2.B confirms | not charted (Table 8 context only; not used in v1 copy) |
| Historical allowance £215,000 (2006/07) and £40,000 (2016/17-2022/23) | §2.B bans £40,000 as the CURRENT allowance | **resolved**: used only year-tagged as past figures, never as current advice; §2.B's ban is about presenting £40,000 as today's allowance, which this report never does. No conflict. |

No unresolved conflicts. No escalation required on facts.

---

## 13. FIGURE PROVENANCE (for the adversarial skeptic)

Every figure asserted in hero/key-facts/FAQ/chart-annotations, traced to a manifest line:

| figure | where used | manifest source |
|---|---|---|
| £350m (2023/24 AfT value, provisional) | hero 1, key fact 1/2, index card, llms.txt | HMRC manifest §5c row 2023/24 = £350m [provisional] |
| £64m (2016/17 AfT value) | key fact 2 | HMRC manifest §5c row 2016/17 = £64m |
| 56,270 (2021/22 SA individuals, peak) | hero 2, key fact 3, chart 2, index card | HMRC manifest §5c row 2021/22 = 56,270 [revised] |
| 18,720 (2016/17 SA individuals) | key fact 3 | HMRC manifest §5c row 2016/17 = 18,720 |
| 34,190 (2022/23 SA individuals) | chart 2 note, FAQ 5 | HMRC manifest §5c/§7.5 row 2022/23 = 34,190 |
| £215,000 (2006/07 std AA) | hero 4, key fact 4, chart 4 | HMRC manifest §5c row 2006/07 = 215,000 |
| £40,000 (2016/17-2022/23 std AA) | key fact 4, chart 4 | HMRC manifest §5c (40,000 in the revised rows) |
| £60,000 (2023/24 std AA) | hero 4, key fact 4, FAQ 3 | HMRC manifest §5c row 2023/24 = 60,000; house_positions §2.B |
| £40k→£60k allowance change 6 Apr 2023; taper £4k→£10k | FAQ 3 | HMRC manifest §7.6 (AA to £60,000); house_positions §2.B (floor £10,000) |
| 46,135 (2021/22 NHS officer exceeded) | hero 3, key fact 5, chart 3, index card | NHSBSA manifest A2 table row 2021/22 officer = 46,135 |
| 7,991 (2021/22 NHS practitioner exceeded) | key fact 5, chart 3 | NHSBSA manifest A2 table row 2021/22 practitioner = 7,991 |
| CPI-revaluation cause of 2021/22 spike | key fact 6, chart 3 note | State doc §2 finding [P1.b]; NHSBSA manifest ("the CPI-revaluation spike") |
| McCloud 2022/23 reporting artefact | key fact 7, FAQ 5, chart 2 note | HMRC manifest §7.5; state doc §2 P1-trap (3) |
| AfT begins 2012/13 | chart 1, methodology, CSV | HMRC manifest §7.1 |
| SA value = excess contributions not a charge | table 4a, methodology, CSV, FAQ | HMRC manifest §7.2 |
| ~18-24 month lag, July publication, next Summer 2026 | subhead, FAQ 2, methodology | HMRC manifest §3 |
| 8,239 GP / 9,745 hospital-doctor 2019/20 Scheme Pays forms; ~19,900 total | §4c callout | NHSBSA manifest A3 table (FOI-02711) |
| 1,872,287 active members at 31 Mar 2025 (E&W) | headline block, methodology context | NHSBSA manifest A1 table |
| OGL v3.0 licence on all sources | attribution, methodology, JSON-LD, CSV | HMRC manifest §2; NHSBSA manifest A1/A2 licence lines |

**Figures I could NOT verify in the manifests: none used in headline/key-facts/FAQ/annotations.** The only values not individually printed in the manifests are the intermediate HMRC table rows (2007/08-2015/16, 2017/18, 2018/19, 2020/21) that populate the full 18-row breakdown table and charts 1/2/4. These are not asserted in prose; lane A extracts them deterministically from `Tables_7_and_8.ods` via the HMRC manifest §10 parse recipe, and the P4 data-accuracy skeptic re-parses the ODS to confirm. The six anchor rows (2006/07, 2016/17, 2019/20, 2021/22, 2022/23, 2023/24) are hard-verified above and lane A's `--dry-run` self-check asserts them.

---

## 14. BUILD-INFRA ESCALATIONS (manager action / lane-B ownership addendum)

The state-doc file-ownership map did not anticipate that the medical site lacks Property's chart infrastructure. These are additive, non-overlapping, in-scope (`Medical/**` + root package-lock delta from a Medical workspace install), and assigned to **lane B** (no conflict with A or C):

1. **recharts is not a declared dependency** of `Medical/web/package.json` (it resolves today only via monorepo hoisting from Property, which is fragile). Lane B adds `"recharts": "^3.8.0"` to `Medical/web/package.json` and runs the workspace install (root `package-lock.json` delta allowed).
2. **`Medical/web/src/components/ui/chart.tsx` does not exist.** Lane B ports it verbatim from `Property/web/src/components/ui/chart.tsx` (it imports only `recharts` and `@/lib/utils` `cn`, both present on medical). New file.
3. **`--chart-1..5` CSS vars do not exist** in `Medical/web/src/app/globals.css`. Lane B adds them in the `:root` block, medical brand palette: `--chart-1:#001b3d` (navy), `--chart-2:#b87333` (copper), `--chart-3:#2d4a6f` (navy-light), `--chart-4:#cd8e5a` (copper-light), `--chart-5:#5c6b80` (slate), plus the `--color-chart-*` theme mappings if the tailwind theme block needs them (match Property's globals.css lines 105-109). This is the only globals.css edit; lanes A and C do not touch globals.css.
4. **Brand adaptation, not colour copy:** the report page must use medical tokens, not Property emerald. Map: Property `bg-slate-900` hero → medical navy (`bg-[#001b3d]` or the site hero treatment); Property `emerald-400` eyebrow → copper (`text-[var(--copper-light)]`); key-facts box emerald tint → copper tint (`border-[var(--copper)]/20 bg-[var(--copper)]/5`); CTA/links emerald → copper (`text-[var(--copper-strong)]`). Layout primitives reused as-is: `siteContainerLg`, `Breadcrumb`, `LeadForm` (unchanged, `redirectOnSuccess={false}`, `submitLabel="Request a review"`), `btnPrimary` where a button is wanted.
5. **Breadcrumb note:** the medical `Breadcrumb` auto-emits `BreadcrumbList` JSON-LD; do not add a second breadcrumb schema.
6. **CTA target:** the conversion block links to `/calculators/nhs-pension-annual-allowance` and `/nhs-pension` (both live), plus the `LeadForm`. Do not invent calculator slugs.

None of these are blockers; they are prerequisites lane B completes before the report page will build.

---

## 15. PAGE ANATOMY (assembly order for lane B, mirroring Property)

1. Three JSON-LD scripts (Article, Dataset, FAQPage): §8.
2. Hero (navy): breadcrumb → eyebrow "Annual Allowance Pension Tax Index" → H1 (§1) → subhead (§1) → 4 stat blocks (§2).
3. Key facts box (copper-tinted): 7 bullets + attribution line (§5).
4. Section "The money settled through Scheme Pays is climbing" → chart 1 (§3).
5. Section "Reports of pension savings above the allowance" → chart 2 (§3) + McCloud/taper/provisional notes.
6. Section "How the standard allowance has changed" → chart 4 (§3).
7. Section "Inside the NHS Pension Scheme (England and Wales)" → chart 3 (§3) + secondary NHS table (§4b) + role-split callout (§4c).
8. Section "The full HMRC series" → breakdown table (§4a).
9. Section "Methodology and sources" → §9 (prose + source list + CSV link + how-to-cite + cadence).
10. Conversion block (copper) → LeadForm + calculator links (§14.6).
11. FAQ section → 7 Q&A (§6).

---

*End of brief. Section 7 is LOCKED. Lanes A/B/C build to this document; deviations require manager sign-off.*
