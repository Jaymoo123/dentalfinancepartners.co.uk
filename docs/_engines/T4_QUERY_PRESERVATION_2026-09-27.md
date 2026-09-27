# T4 Query Preservation Check — 2026-09-27

Spec: LEADS_250_PROGRAMME_2026-09-27.md section 13, S5. Data pull only, no edits.

Data sources, pulled fresh (not from stored Supabase snapshots):
- GSC: `optimisation_engine/clients/gsc_query_client.py` GSCQueryFetcher, dimensions `[page, query]`, window **2026-06-29 to 2026-09-27** (90 days), matched to each URL by path (host prefix `www.` vs bare domain differs between GSC's indexed URL and the canonical, matched on path).
- Bing: `bing_query_client` (`BingQueryFetcher` / `BingWebmasterClient.get_page_query_stats`), per-page query stats. Bing's API returns a trailing aggregate with no queryable start date (see client docstring) — this is a snapshot pulled 2026-09-27, not a fixed 90-day window. Reported as-is; flagged below for any page where Bing returned nothing.

Threshold: every query with ≥1 click OR ≥10 impressions, either source. Coverage judged against the live post body (title, h1, h2, body copy, FAQ) in `<site>/web/content/blog/<slug>.md` — COVERED if the term or a clear synonym appears, MISSING otherwise.

---

## Medical (medicalaccounts.co.uk, flat `/blog/<slug>`)

### gp-vat-registration
16 qualifying queries (0 GSC — page has no GSC impressions in the window; 16 Bing).

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| has doctors table3 vat exemption been updated since may 2007 uk genyoutube | 2 | 1 | 3 | Bing | COVERED |
| general practice application of vat number | 1 | 1 | 3 | Bing | COVERED |
| vat exempt gp | 1 | 1 | 5 | Bing | COVERED |
| do doctors have to charge vat if over 90k | 1 | 1 | 3 | Bing | COVERED |
| mefical vat exempion rules | 1 | 1 | 1 | Bing | COVERED |
| are there many vat registered gp surgeries? | 1 | 2 | 8 | Bing | MISSING |
| gp vat exemption letter | 2 | 1 | 1 | Bing | MISSING |
| vat medical exemption for vat registration | 1 | 1 | 2 | Bing | COVERED |
| healthcare practice and vat registered | 1 | 1 | 2 | Bing | COVERED |
| how to register for health vat exemption | 1 | 1 | 3 | Bing | COVERED |
| gynecology and obstetrics and vat | 1 | 1 | 5 | Bing | MISSING |
| private practice vat exemption | 1 | 1 | 1 | Bing | COVERED |
| hertfordshire gp vat registered | 1 | 1 | 4 | Bing | MISSING |
| is a medical consutlancy activities vat registerd | 1 | 1 | 3 | Bing | COVERED |
| ent surgeon vat exempt and taxable turnover | 1 | 1 | 3 | Bing | COVERED |
| does a gp have vat exemption certificate uk | 1 | 1 | 1 | Bing | MISSING |

**16 queries, 11 covered, 5 missing:** are there many vat registered gp surgeries?; gp vat exemption letter; gynecology and obstetrics and vat; hertfordshire gp vat registered; does a gp have vat exemption certificate uk.

### medical-practice-incorporation-step-by-step
0 GSC rows, 3 Bing rows returned but none reached the ≥1 click / ≥10 impressions threshold.

**0 qualifying queries.**

### nhs-pension-partial-retirement-doctors-guide
0 GSC, 4 qualifying Bing queries.

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| what are rules for gps who draw pension but still work do thye have to have 10% less income how does this work for profit sharing gps | 2 | 1 | 1 | Bing | COVERED |
| what are rules for gps who draw pension but still work do thye have to have 10% less income | 1 | 1 | 1 | Bing | COVERED |
| does early retirement adjustment get applied if you take partial retirement from nhs | 1 | 2 | 6 | Bing | MISSING |
| nhs gp pension retire & return or partial retirement which is better tax wise | 1 | 2 | 2 | Bing | COVERED |

**4 queries, 3 covered, 1 missing:** does early retirement adjustment get applied if you take partial retirement from nhs.

### nhs-pension-scheme-pays-doctors-deadlines
1 GSC row, 3 qualifying Bing queries.

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| nhs pension for doctors | 0 | 19 | 42.5 | GSC | COVERED |
| nhs scheme pays deadline extension for 24/25 tax year? | 1 | 1 | 4 | Bing | COVERED |
| can scheme pays election be made if annual allowance statement is late nhs | 1 | 2 | 7 | Bing | COVERED |
| can scheme pays election be made if annual allowance statement is late | 1 | 1 | 3 | Bing | COVERED |

**4 queries, 4 covered, 0 missing.**

### nhs-uniform-tax-relief-laundry-allowance
0 GSC, 8 qualifying Bing queries.

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| howmuch ta relief for healthcare uniform rebate | 1 | 1 | 3 | Bing | COVERED |
| what is the uniform allowance for nhs doctors uk | 1 | 1 | 2 | Bing | COVERED |
| nhs uniform allowamce | 1 | 2 | 4 | Bing | COVERED |
| what is the flat rate uniform nhs tax allowance | 1 | 1 | 1 | Bing | COVERED |
| why are nhs doctors not included in the gov.uk uniform tax advice list ? | 1 | 1 | 1 | Bing | COVERED |
| can you claim uniform allowance if your employed by the nhs | 1 | 1 | 1 | Bing | COVERED |
| can you claim flat rate tax relief for coperate dress in nhs | 1 | 1 | 1 | Bing | COVERED |
| tax rebate healthcare uniform | 1 | 2 | 2 | Bing | COVERED |

**8 queries, 8 covered, 0 missing.**

---

## Contractors-IR35 (contractortaxaccountants.co.uk, `/blog/<category-slug>/<slug>`)

### contractor-accounting-basics/contractor-accountant-fees-cost
2 qualifying GSC queries, 0 qualifying Bing (2 rows returned, neither met threshold).

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| contractor accounting cost | 0 | 212 | 38.6 | GSC | COVERED |
| contractor accounting cost uk | 0 | 132 | 62.8 | GSC | COVERED |

**2 queries, 2 covered, 0 missing.**

### contractor-accounting-basics/first-contract-outside-ir35-checklist
0 GSC, 1 qualifying Bing query.

| Query | Clicks | Impr | Position | Source | Status |
|---|---|---|---|---|---|
| my first outside ir35 contract what do i need to set up | 1 | 1 | 1 | Bing | COVERED |

**1 query, 1 covered, 0 missing.**

### pension-and-dividends/contractor-pension-carry-forward
0 GSC, 0 Bing (Bing returned no rows at all for this URL — flagged per spec: Bing gives nothing per-URL for this page).

**0 qualifying queries.**

---

## Summary

| Post | Site | Queries | Covered | Missing |
|---|---|---|---|---|
| gp-vat-registration | medical | 16 | 11 | 5 |
| medical-practice-incorporation-step-by-step | medical | 0 | 0 | 0 |
| nhs-pension-partial-retirement-doctors-guide | medical | 4 | 3 | 1 |
| nhs-pension-scheme-pays-doctors-deadlines | medical | 4 | 4 | 0 |
| nhs-uniform-tax-relief-laundry-allowance | medical | 8 | 8 | 0 |
| contractor-accountant-fees-cost | contractors-ir35 | 2 | 2 | 0 |
| first-contract-outside-ir35-checklist | contractors-ir35 | 1 | 1 | 0 |
| contractor-pension-carry-forward | contractors-ir35 | 0 | 0 | 0 |

Missing terms, full list (7 across 2 posts):
- gp-vat-registration: are there many vat registered gp surgeries?; gp vat exemption letter; gynecology and obstetrics and vat; hertfordshire gp vat registered; does a gp have vat exemption certificate uk
- nhs-pension-partial-retirement-doctors-guide: does early retirement adjustment get applied if you take partial retirement from nhs
