# UK SPV Incorporation Index, methodology

The UK SPV Incorporation Index is a monthly, direct count of UK property company
incorporations, built entirely from official open data so that every figure can
be re-derived by anyone with a Companies House API key. It is published by
Property Tax Partners at
`https://www.propertytaxpartners.co.uk/research/landlord-tax-index`.

This document states exactly what is counted, how it is counted, where the
method is weak, and how it differs from other published estimates. Nothing in
the Index depends on a private model, a survey, or an unpublished adjustment.

## 1. Definition: what we count

The Index counts **companies incorporated at Companies House whose recorded SIC
codes fall inside a fixed set of four real-estate codes**:

| SIC | Meaning | Role in the Index |
|-----|---------|-------------------|
| 68209 | Other letting and operating of own or leased real estate | **Headline series.** The standard buy-to-let SPV code |
| 68100 | Buying and selling of own real estate | Trading and developer companies |
| 68320 | Management of real estate on a fee or contract basis | Letting agents and managers |
| 68201 | Renting and operating of Housing Association real estate | Housing association letting |

Two series are published:

- **Headline series: SIC 68209 only.** This is the code the overwhelming
  majority of buy-to-let special purpose vehicles register under, and it is the
  line quoted in headline figures.
- **Union series: the deduplicated count across all four codes.** This is the
  wider "all property companies" line.

Each code is also published individually so that a reader can rebuild either
series, or construct a different one.

Source: Companies House Advanced Search API
(`/advanced-search/companies`), filtered on `sic_codes`, `incorporated_from` and
`incorporated_to`, one calendar month per query, reading the `hits` field as the
count. A 404 response is treated as zero, which is the documented Companies
House behaviour for a SIC and date combination with no companies.

## 2. The dedup rule, and why the series do not sum

A company may record up to four SIC codes. A company that records both 68209 and
68100 therefore appears in two of the per-SIC series.

The union is obtained from **one combined-SIC query per month**, passing all four
codes in a single `sic_codes` parameter. Companies House deduplicates within a
combined query: a company holding two of the four codes is returned once, not
twice.

**The four per-SIC series therefore do not sum to the union, by design.** Adding
them double-counts every multi-code company. Any reader reproducing the union
must issue the combined query rather than summing. The gap between the naive sum
and the published union is itself a measure of how many property companies carry
more than one of these codes.

## 3. Gross incorporations, and the net formation rate

**Monthly incorporation counts are gross.** A company incorporated in March 2016
and dissolved in 2021 is still counted in March 2016, because the Advanced Search
incorporation query returns companies of every status, dissolved included. The
gross series is therefore free of survivorship distortion: it does not shrink as
older cohorts die off.

Separately, the Index publishes a **net formation rate**:

```
net formation (month) = union incorporations (month) - union dissolutions (month)
```

Dissolutions are counted **by dissolution date**, not by incorporation date,
using the same Advanced Search endpoint with `company_status=dissolved` and
`dissolved_from` / `dissolved_to`, again as a single combined-SIC query so that
multi-code companies are counted once. A dissolution in a given month may relate
to a company incorporated in any earlier year; net formation is a measure of the
change in the live population in that month, not of cohort survival.

Latest settled month (June 2026): gross union 6,614 incorporations,
3,139 dissolutions, net formation +3,475.

## 4. The regional series

The Advanced Search API does not expose a usable geography filter for this
purpose, so the regional split comes from a different source: the **Companies
House Basic Company Data monthly bulk snapshot**
(`http://download.companieshouse.gov.uk/en_output.html`), a full extract of the
register published once a month.

Method:

1. Filter the snapshot to companies carrying any of the four SIC codes.
2. Take the registered-office postcode and reduce it to its **postcode area**,
   the leading letters (roughly 121 areas across the UK).
3. Map each postcode area to one of the **12 ITL1 regions** (nine English
   regions, plus Scotland, Wales and Northern Ireland), with an
   **"Other / unknown"** bucket for the Channel Islands, the Isle of Man, and
   blank or unparseable postcodes.
4. Group by incorporation month within the last 36 months.

Two honesty caveats apply, and both are material:

**(a) Survivorship.** The bulk file contains **only companies currently on the
live register**. Companies incorporated in the window and already dissolved are
absent. Bulk-derived monthly counts therefore run **below** the gross Advanced
Search series for the same months, and the shortfall grows with the age of the
month. Two consequences follow. First, the regional series is restricted to the
**last 36 months**, where attrition is smallest. Second, we publish the measured
ratio between the bulk-derived total and the Advanced Search gross total over the
same window, so a reader can see the size of the effect rather than infer it:
in the current release the bulk file captures 99.9% of gross formations for the
most recent settled month, 85.9% across the full 36-month window, and 70.6% for
the oldest six months of the window.

Regional counts should not be read as an alternative national total. They are
a distribution.

**(b) Postcode areas straddle region boundaries.** A postcode area is a postal
construct, not an administrative one, and several areas span an ITL1 boundary
(the areas around London and the Home Counties are the clearest cases). A small
share of companies is therefore attributed to a neighbouring region. The mapping
is deterministic and published, so the error is consistent month to month rather
than random, but it is real. **Regional figures are best read as shares and as
trends in shares, not as exact regional counts.**

Current leaders by share of the last twelve months' formations: London 35.3%,
North West 11.3%, South East 8.5%, West Midlands 8.5%.

## 5. Why our numbers differ from Hamptons

Hamptons publishes a widely quoted quarterly count of new buy-to-let companies.
Our figures differ, and they are meant to.

- **Definition.** Hamptons applies its own definition of what constitutes a
  buy-to-let company. The Index applies a fixed, published SIC filter and counts
  whatever the register contains under those codes. Neither definition is a
  superset of the other: ours will include property companies that are not
  buy-to-let vehicles, and will exclude buy-to-let vehicles registered under
  other codes.
- **Frequency.** Theirs is quarterly. Ours is monthly, refreshed monthly.
- **Construction.** Theirs is an estimate. Ours is a direct count of a published
  register, re-derivable from the same API by any third party.
- **Coverage.** The Index additionally publishes a net formation rate
  (incorporations less dissolutions) and a regional split, neither of which the
  quarterly series carries.

The two series are complementary. Hamptons has the longer-running and
better-known market read; the Index is the finer-grained, fully reproducible
count underneath it. Where the two disagree, the difference is a definitional
one, and both methods are published.

## 6. Provisional window

**The most recent two months are provisional and are excluded from every
headline figure.** Companies House indexes very recent incorporations with a
short lag, so the newest months under-count until the index catches up. On the
page these months render as a dashed tail. Headline claims are made on complete
calendar years and trailing twelve-month totals rather than single months, which
also removes the strong seasonality in incorporations (volumes dip sharply around
the turn of the calendar year).

Latest settled month in the current release: June 2026.

## 7. Known limits

These are limits of the source data, not of the processing, and they cannot be
corrected from within the Index.

- **SIC codes are self-reported.** They are chosen by the incorporator at
  formation and are rarely revised afterwards. A company's recorded code reflects
  intent at formation, not audited activity.
- **A property SPV may register under another code.** Some are incorporated
  under generic or holding-company codes and never appear in this Index. The
  headline series is a lower bound on buy-to-let SPV formation, not a census.
- **LLPs are effectively excluded.** Limited liability partnerships rarely file
  SIC codes, so they do not reliably appear in a SIC-filtered query. Property
  held through LLP structures is largely invisible here.
- **68201 is Housing Association letting.** It is published for completeness and
  forms part of the union, but it is a social housing code and is not part of the
  private landlord narrative. Readers building a private-landlord view should use
  the headline 68209 series, or the union less 68201.
- **A company is not a property.** The Index counts vehicles, not dwellings. One
  company may hold one property or fifty, and the register does not say which.

## 8. Refresh

```
python -m optimisation_engine.ingestion.ingest_landlord_data --execute        # JSON + Supabase
python -m optimisation_engine.ingestion.ingest_landlord_data --execute --no-supabase   # JSON only
```

This rewrites the committed snapshot
`Property/web/src/data/landlord-tax-index.json`, which the page imports at build
time, and upserts history into Supabase. The page text and the CSV download both
read the same snapshot, so they cannot drift apart. Cadence: monthly.

## 9. Licence, citation and data access

Companies House data is Crown copyright, published under the
**Open Government Licence v3.0**. The house price context series is HM Land
Registry UK House Price Index data, also under the Open Government Licence.

The Index itself (the selection, the definitions, the charts) is free to cite and
reproduce with attribution.

**How to cite:**

> Source: Property Tax Partners, UK SPV Incorporation Index, September 2026.
> https://www.propertytaxpartners.co.uk/research/landlord-tax-index

The full underlying series is downloadable as CSV from the page:
`https://www.propertytaxpartners.co.uk/research/landlord-tax-index/data`

There is no named spokesperson. This is a data release, attributable as
"analysis by Property Tax Partners of Companies House data".
