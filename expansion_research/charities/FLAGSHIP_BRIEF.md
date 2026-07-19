# Flagship brief: UK Small Charity Finance Index (Trustee Tax)

Slug already in nav: `/research/uk-small-charity-finance-index`. Audience: trustees, treasurers, CIC directors.

## 1. Candidate dataset
Charity Commission for England and Wales "Register of Charities" full data extract. Published as bulk downloads (JSON/ZIP, refreshed roughly monthly) covering every registered charity: income, expenditure, financial year end, activity classifications, trustee counts, registration and removal dates. This is a well-established, genuinely public bulk dataset. Confidence: high.

## 2. Source and licensing
- Publisher: Charity Commission (gov.uk). Licence: Open Government Licence v3, attribution required ("Contains information from the Charity Commission register").
- Optional supplements (all OGL): HMRC Gift Aid statistics (annual), Charity Commission annual report stats.

## 3. Asset shape (landlord-tax-index pattern)
- Snapshot JSON at `src/data/small-charity-finance-index.json`; page at `/research/uk-small-charity-finance-index` with Article + Dataset JSON-LD (OGL licence URI), CSV route at `/data`.
- Metrics: registrations vs removals per month; income-band distribution for sub 1m charities; median income and spend by band; late-filing proportion; regional splits.

## 4. Refresh plan
Monthly. Script sketch: download latest register extract, filter income < 1m, aggregate to bands/regions, emit snapshot JSON + append to CSV time series. Pure public bulk file, no API key.

## 5. OWNER SIGN-OFF GATE (before any build)
- [ ] Approve Charity Commission extract as the source (legitimacy verified by owner)
- [ ] Approve attribution wording and OGL compliance
- [ ] Approve headline metric definitions (income bands, "small charity" cut-off)
- [ ] Confirm claims exposure acceptable: aggregates only, no naming individual charities
- [ ] Approve monthly refresh promise on the public page

## 6. Verdict
**VIABLE.** Strong recurring public bulk source, OGL, clean fit to audience, direct analogue of the landlord index.
