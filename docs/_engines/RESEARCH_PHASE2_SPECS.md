# Research-Authority Phase 2: per-site build specs (batch 1)

Scouted 2026-07-20. Confirmed sources, formats, licences, flagship picks. Build the proven
universal template (CH formations-by-SIC, insolvency-by-SIC-section, ONS Business Demography
survival, seasonality, Payment Practices) PLUS the niche-specific register asset. Sequential
per site, deploy-gated. Calculators excluded (owner not interested).

## Dentists (Dental Finance Partners, dentalfinancepartners.co.uk, prj_f3tGDR4zozATcYOSLMmCqO2ZInNV)
GREENFIELD (no existing research asset). SIC 86230 dental practice (~18,481 active cos).
- FLAGSHIP: **NHS Dental Activity Recovery Index** - NHSBSA English Contractor Monthly General
  Dental Activity, CSV, OGL, 2016-now, UDAs/COTs by band/ICB/region.
  https://opendata.nhsbsa.net/dataset/english-contractor-monthly-general-dental-activity
  (2024/25: 73m UDAs, 35m COTs, 24,655 dentists w/ NHS activity). "Dental deserts" narrative.
- NHS Dentist Earnings & Expenses: CSV/XLSX, OGL. https://files.digital.nhs.uk/DB/6E7A10/dentearexp_202324_csv.csv
  (England median net £78,200 2023/24). Associate income tracker.
- CQC dental locations: monthly CSV, OGL (practice density / dental-desert map).
- CH formations SIC 86230 (engine niche config) + seasonality. Insolvency = Section Q (coarse, caveat, low insolvency).
- GDC registrant stats = PDF only (131,680 registrants; intl>UK joiners 2025) - manual/defer.

## charities (Trustee Tax, trusteetax.co.uk)
DEEPEN existing live index /research/uk-small-charity-finance-index (finance-index.ts + CSV live, gen 2026-07-11).
Spine: Charity Commission E&W full-register ZIP (JSON+TXT tables, daily, OGL). 185,377 charities + 185,672 removed.
https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download
All buildable_now from the ALREADY-downloaded extract (join more tables, no new source):
- Cause/classification income heatmap (charity_classification + annual_return_history).
- Charity survival/longevity curves (date_of_registration + date_of_removal; richer than ONS demography).
- Regional density + income map (charity_area_of_operation).
- Scrutiny-band cliff-edge monitor (~8-12k charities within 10% below £25k/£100k/£250k/£1m thresholds) = direct lead-gen.
- Reserves-health signal by cause (annual_return_partb).
Supplementary: OSCR (Scotland, OGL download+API). CCNI (NI) = no confirmed bulk, omit. CICs already in index.
Universal PPR/seasonality/insolvency N/A (charities not wound up via CH).

## Solicitors (Accounts for Lawyers, accountsforlawyers.co.uk, prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9)
SIC 69101 barristers / 69102 solicitors (~12,079 cos) / 69109. LLPs + Ltd on CH; partnerships/sole invisible.
- FLAGSHIP: **LLP-vs-Ltd law-firm incorporation shift 2011-2026** - CH bulk CSV (CompanyCategory distinguishes
  LLP vs Ltd), OGL. https://download.companieshouse.gov.uk/en_output.html . SRA: incorporated 20%(2011)->58.7%(2026),
  LLP 15.9%, partnerships shrinking 10.2%. The profession's structural story; no clean public series exists.
- SRA regulated-firm structure trend (HTML scrape, monthly to 2010). LICENCE: SRA custom, NOT OGL - aggregate
  stats + attribution OK; NO named-firm rankings (reputational-damage clause). https://www.sra.org.uk/sra/research-publications/regulated-community-statistics/data/solicitor_firms/
- Solicitor roll growth (218,036 on roll / 177,841 practising). ABS growth. Barrister pop (BSB, licence unconfirmed - check).
- ONS Business Demography survival SIC group 69 (XLSX, OGL). Insolvency = Section M aggregate (legal not isolable, caveat).
- CH filed accounts (XBRL, SIC 69102) = turnover/profit, medium effort, defer.

## Build order: dental first (cleanest greenfield showcase, machine-readable CSV, strong narrative),
then charities (deepen existing), then legal (CH bulk parse heavier). One site fully, deploy-gated, before next.
