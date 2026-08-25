# Flagship brief: Hospitality Openings and Closures Index (Hospitality Tax)

Slug already in nav: `/research/hospitality-openings-closures-index`. Audience: pub, restaurant, hotel, cafe, takeaway owner-operators.

## 1. Candidate dataset
Primary: Companies House bulk data (free monthly snapshots plus incorporation/dissolution feeds), filtered to hospitality SIC codes (55xxx accommodation, 56xxx food and beverage). Public and reliable. Confidence: high.
Secondary: HMRC Alcohol Bulletin (monthly duty receipts and clearances, OGL); ONS business demography (annual births/deaths by industry, OGL). BBPA data is proprietary and must NOT be republished; do not use.

## 2. Source and licensing
- Companies House bulk products: free to reuse, attribution to Companies House expected.
- HMRC Alcohol Bulletin and ONS: OGL v3.

## 3. Asset shape
- `src/data/hospitality-openings-closures-index.json`; page with Article + Dataset JSON-LD, CSV route.
- Metrics: monthly incorporations vs dissolutions by SIC (pubs/restaurants/takeaways/hotels split); net change trend; regional splits from registered-office postcode; alcohol duty receipts overlay.

## 4. Refresh plan
Monthly. Script sketch: pull Companies House monthly snapshot or streaming feed, filter SICs, count incorporations/dissolutions, join Alcohol Bulletin figures, emit snapshot JSON + CSV.

## 5. OWNER SIGN-OFF GATE
- [ ] Approve Companies House SIC-count methodology (registered companies are a PROXY for trading premises; must be stated on-page)
- [ ] Approve exclusion of BBPA/CGA proprietary data
- [ ] Approve caveat copy: dormant/shelf companies and SIC misclassification noise
- [ ] Confirm claims exposure acceptable: aggregates only, no "X pubs closed" framed as premises counts
- [ ] Approve monthly refresh promise

## 6. Verdict
**VIABLE-WITH-CAVEATS.** Sources are solidly public, but company counts are not premises counts; the honest proxy framing must survive owner review or headlines will overclaim.
