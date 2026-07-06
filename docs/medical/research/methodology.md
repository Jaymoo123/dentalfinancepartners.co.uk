# Annual Allowance Pension Tax Index: methodology and sources

The Annual Allowance Pension Tax Index is a faceless, data-PR and GEO asset on
the Medical Accountants UK site: a transparent, sourced read on how the pension
annual allowance and its associated charges have grown across UK registered
pension schemes, with an NHS Pension Scheme lens on doctors. It is built
entirely from official open data, so every figure is independently verifiable.
Page: `/research/annual-allowance-pension-tax-index`.

---

## What it measures

The index has two clearly separated layers, which are never merged.

**Layer 1: whole-market spine (all UK registered pension schemes), from HMRC.**
The recurring annual series comes from HMRC Private pension statistics, Table 7.
It covers:

- The standard annual allowance by tax year (set by policy, 2006/07 onward).
- The number and value of annual allowance charges reported through pension
  schemes' Accounting for Tax (AfT) returns (Scheme Pays charges), 2012/13
  onward.
- The number of individuals reporting pension savings above the annual allowance
  through Self Assessment, plus the value of those excess contributions,
  2006/07 onward.

This is all UK registered pension schemes. HMRC does not publish an NHS-specific
split in this source.

**Layer 2: NHS-specific corroboration (England and Wales), from NHSBSA.**
A separate NHS layer comes from NHSBSA Freedom of Information data covering the
NHS Pension Scheme for England and Wales. It shows:

- How many practitioner (GP) and officer (hospital doctor and other) members had
  pension growth above the standard annual allowance, for each tax year in the
  safe usable window 2015/16 to 2021/22.
- A single-year 2019/20 role breakdown (GPs, hospital doctors and others) of
  Scheme Pays election forms, from a separate FOI release.
- NHS Pension Scheme active, deferred and pensioner member counts at 31 March
  2023, 2024 and 2025, from the audited annual report and accounts.

The two layers are always labelled separately in copy, charts and tables.
HMRC figures are labelled "all UK registered pension schemes". NHSBSA figures
are labelled "NHS Pension Scheme (England and Wales)".

---

## Sources and what was taken from each

### HMRC Private pension statistics, Table 7 (annual allowance), July 2025 edition

URL: https://www.gov.uk/government/statistics/personal-and-stakeholder-pensions-statistics

What was taken: the standard annual allowance by tax year (2006/07 to 2023/24);
the number and value of annual allowance charges reported through Accounting for
Tax returns (Scheme Pays), 2012/13 onward; and the number of individuals
reporting pension savings above the annual allowance through Self Assessment,
plus the value of those excess contributions (not a tax charge value), 2006/07
onward. The ODS file (`Tables_7_and_8.ods`, sheet `Table_7_Annual_Allowance`) is
the primary archival source; the machine-readable tidy CSV (`TidyData_Tables_7_and_8.csv`)
was used for cross-checking. The 2023/24 data row is marked provisional; 2016/17
to 2022/23 are marked revised.

Licence: Open Government Licence v3.0.
Required attribution: "Source: HMRC Private pension statistics (July 2025), OGL v3.0."

### NHSBSA FOI-02228: members exceeding the standard annual allowance + Scheme Pays records

URL: https://opendata.nhsbsa.net/dataset/foi-02228

What was taken: the number of NHS Pension Scheme (England and Wales) practitioner
and officer members whose pension growth exceeded the standard annual allowance
in each tax year 2015/16 to 2021/22, together with Scheme Pays record counts.
Used as a point-in-time snapshot only; data as of 26 September 2024, on the
pre-McCloud-rollback basis. The 2022/23 and 2023/24 rows from this dataset are
excluded because they were not yet fully calculated at the snapshot date (NHSBSA
verbatim: "the overall volume of members showing to have exceeded the annual
allowance is less than previously reported; the volume will increase as
calculations continue").

Licence: Open Government Licence v3.0.

### NHSBSA FOI-02711: Scheme Pays election forms 2019/20 by role

URL: https://opendata.nhsbsa.net/dataset/foi-02711

What was taken: the single-year 2019/20 breakdown of Scheme Pays election forms
by employment type (GPs, hospital doctors, officers, dentists, nurses), and the
subset who also applied for the 2019/20 AA Compensation Scheme. Used only as a
one-year illustrative role breakdown (not part of any time series). This dataset
counts forms registered on a submission-date basis, which does not tie out with
the tax-year basis used in FOI-02228; the two datasets are not combined.

Licence: Open Government Licence v3.0.

### NHS Pension Scheme Annual Report and Accounts (section 3.3 movement table)

URL: https://www.nhsbsa.nhs.uk/information-about-nhs-pensions/nhs-pension-scheme-accounts-and-valuation-reports

What was taken: closing active, deferred and pensions-in-payment member counts
at 31 March 2023, 2024 and 2025 (England and Wales), from the "3.3 Membership
statistics (movement in year)" table in the 2022-23, 2023-24 and 2024-25
audited accounts respectively. Used as population context only; only the closing
figure from each year's own report is used (opening balances are restated and
do not chain across reports).

Licence: Open Government Licence v3.0 (stated in each report).

---

## How the data is processed

**HMRC series.** The ODS file is parsed at the header row (row index 7) and the
18 data rows (2006/07 to 2023/24) are extracted. Counts round to the nearest 10;
values round to the nearest £1 million. The provisional and revised flags are
read directly from the ODS tax-year cell text, not inferred. AfT columns read
as not-applicable for 2006/07 to 2011/12 and are stored as null. The tidy CSV
is used for cross-checking but the ODS is the canonical source because it carries
the provisional/revised markers.

**NHS FOI series.** The NHSBSA FOI-02228 XLSX is parsed from the `Q. A and B`
sheet (two-row header). Practitioner and officer exceeded-AA columns are read
directly. Only the 2015/16 to 2021/22 rows are included in the published dataset;
the 2022/23 and 2023/24 rows are dropped at the data layer.

**CSV download.** The site publishes the HMRC whole-market spine as a downloadable
CSV at `/research/annual-allowance-pension-tax-index/data`. This file is generated
from the same JSON snapshot the page imports, so the page and the CSV can never
drift apart. The NHS FOI source is publicly available at NHSBSA and is linked
in the methodology rather than duplicated.

---

## Honesty caveats

The following caveats are first-class content, not fine print.

1. **Annual data with a lag of roughly 18 to 24 months.** HMRC publishes its
   Private pension statistics once a year, each July. The July 2025 edition used
   here reaches the 2023/24 tax year, which is still marked provisional. The next
   edition is due in summer 2026. There are no monthly or quarterly updates.

2. **The Self Assessment value column is excess contributions, not a tax charge.**
   HMRC explicitly states that estimates of the value of annual allowance charges
   via Self Assessment are not available (charges merge into total SA liability).
   The SA column labelled "value" is the value of pension savings above the
   allowance: excess contributions. Only the Accounting for Tax (Scheme Pays) path
   yields a published sterling value of actual charges settled.

3. **Scheme Pays (Accounting for Tax) charge data begins in 2012/13.** The
   Accounting for Tax charge number and value columns are not applicable for
   2006/07 to 2011/12. The money spine does not extend back before 2012/13.

4. **The Self Assessment individual count includes a definitional widening from
   2016/17.** From that year, the count also includes members caught by the
   tapered annual allowance (introduced 2016/17) and the money purchase annual
   allowance. This produces an apparent step-up in the count at 2016/17 that
   partly reflects a wider definition, not purely a behavioural rise in breaches.

5. **The 2022/23 fall in Self Assessment figures is a reporting artefact, not a
   real decline.** NHS and other public-service members were directed to report
   2022/23 annual allowance charges through HMRC's public service pension
   adjustment service (the McCloud remedy route) rather than through Self
   Assessment. That moved a large block of charges out of the SA count (56,270
   in 2021/22 to 34,190 in 2022/23). The underlying burden did not fall.

6. **Counts are gross; an annual allowance charge does not mean the member left
   the scheme.** The figures count members and charges, not exits. Many members
   settle a charge through Scheme Pays and remain active members of the scheme.

7. **NHS figures cover England and Wales only.** Scotland (SPPA) and Northern
   Ireland (HSC) run separate NHS pension schemes and are outside the scope of
   the NHSBSA data. The FOI figures are a pre-McCloud-rollback snapshot covering
   the standard annual allowance only (members caught by the taper alone are not
   in the exceeded-AA columns). The years 2022/23 and 2023/24 are excluded
   because they were not yet fully calculated at the snapshot date.

8. **The HMRC series is all UK registered pension schemes, not NHS-only.** HMRC
   states qualitatively that a significant share of annual allowance charges come
   from public-service scheme members, but there is no NHS breakdown in Table 7.
   The NHS corroboration layer is kept entirely separate; no national money figure
   is presented as if it were NHS-only.

---

## Licence

All sources are published under the Open Government Licence v3.0
(https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
This report is Medical Accountants UK analysis of HMRC and NHSBSA data.

---

## How to cite

> Medical Accountants UK, Annual Allowance Pension Tax Index, analysis of HMRC
> Private pension statistics (July 2025) and NHSBSA data, 2026. Free to reuse
> with attribution.

Download the HMRC annual allowance data (CSV):
https://www.medicalaccounts.co.uk/research/annual-allowance-pension-tax-index/data

---

## Update cadence

Reviewed on each HMRC annual publication (each July). This edition uses data to
the 2023/24 tax year. The next HMRC edition is due summer 2026 and will add the
2024/25 provisional year; the index will be refreshed at that point.

---

## Why faceless

The site does not name individual employees or claim named-expert endorsement.
Attribution is always "Medical Accountants UK analysis of HMRC and NHSBSA data".
This is a data release, not a branded opinion piece. The faceless approach means:

- Every assertion is traceable to a published official source, not a named
  spokesperson's view.
- The index can be updated and cited indefinitely without depending on any
  individual's continued association with the firm.
- It fits the Open Government Licence attribution requirement cleanly: the
  analysis is the firm's; the underlying data belongs to the Crown.

This approach mirrors the firm's other open-data assets and is consistent with
standard practice for data-PR assets on accountancy sites.
