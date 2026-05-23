# Wave 5 VAT Cluster Re-Clustering (Property Token Filter)

Date: 2026-05-23
Sub-agent: VAT re-clustering per NETNEW_PROGRAM §3 inter-wave queue item 1
Source data:
  - docs/property/topic_gaps_delta_2026-05-23.md (cluster table + first 30 rows visible)
  - briefs/property/_topic_gaps_delta_2026-05-23.json (full payload — 2,362 net-new rows, 296 in VAT cluster)
  - Property blog corpus at Property/web/content/blog/*vat* (existing cannibalisation surface)

Raw candidate count: **296**
Pass-filter candidate count: **36** (34 strong + 2 soft-include with manager flag)
Rejection count: **260**
Filter version: property-domain reasoning per §16.18 (no scripted Jaccard / token-overlap selection)

---

## Bucket viability assessment

**MARGINAL — bordering on VIABLE.**

36 candidates pass the property-VAT filter, comfortably enough in raw count for a Wave-5 VAT bucket of ~10 pages. BUT the distribution is heavily lopsided:

- 8 of 36 are the same business-accounting.co.uk template repeated across "landlords / holiday-lets / letting-agents / property-management / housing-associations" surface forms. They collapse to ~4 underlying topics ("VAT threshold for landlords", "VAT threshold for holiday-let operators", "VAT registration benefits for letting agents", "VAT for property management companies").
- True property-VAT sub-themes with reasonable depth are: **option-to-tax** (1 strong candidate, but it is a major topic with deep house-position need), **partial-exemption** (3 candidates), **sa-vat / TOMS** (4 candidates), **conversion-zero-rate** (2 candidates), **vat-on-rental** (6 candidates, mostly duplicate angles), **developer-vat** (1 candidate), **commercial-vat / capital-goods-scheme / mixed-use / cladding** (3 candidates), **other-property-vat umbrella / dilapidations / letting-agent angles** (8 candidates).
- Existing-on-site cannibalisation surface is **high**: the Property site already has landlord-vat-registration-when-required.md, togc-vat-property-letting-business.md, toms-vat-serviced-accommodation.md, vat-on-new-builds-residential-property.md, diy-housebuilders-vat-refund-scheme.md, domestic-reverse-charge-construction-vat-landlords.md. A Wave-5 VAT bucket must avoid these 6 slugs and angle into adjacent gaps.

**Recommendation:** A Wave-5 VAT bucket of 10 pages is feasible if the brief author writes to the *gaps* visible after subtracting the on-site corpus, primarily:

1. Option-to-tax mechanics + revocation + 20-year rule (zero on-site coverage)
2. Capital Goods Scheme for property (zero on-site coverage)
3. VAT partial-exemption for mixed-portfolio landlords (zero on-site coverage)
4. VAT on mixed-use property purchases (zero on-site coverage)
5. VAT on commercial-property sales when seller has opted to tax (zero on-site coverage)
6. Dilapidations + VAT (zero on-site coverage)
7. VAT on long-term hotel / aparthotel stays (deepens existing TOMS page)
8. VAT pre-registration input-tax recovery for property developers (zero on-site coverage)
9. VAT and the cladding-remediation crisis (topical, zero on-site)
10. VAT on property-conversion (residential-to-commercial / commercial-to-residential) — fills the conversion-zero-rate gap

Most of these are inferred from gaps + topic adjacency rather than from candidate count, because the competitor cluster is so badly polluted that raw count doesn't reflect topical viability.

**Verdict: MARGINAL pivoting to VIABLE if the brief author treats this as a topical-gap exercise rather than a competitor-mimic exercise.** If the brief author wants to mirror competitor pages 1:1, this bucket is NOT VIABLE — too few clean candidates after dedup.

---

## Pass-filter candidates (sorted by sub-theme + priority signal)

### option-to-tax (1 candidate)

1. vat-on-property-purchases-when-the-seller-opted-to-tax — https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — best_existing 0.23 — cannibalisation: NONE on-site — high priority, single canonical option-to-tax entry-point in the cluster

### togc (0 candidates)

No new TOGC candidates passed the filter — existing on-site togc-vat-property-letting-business.md covers this. **No Wave 5 entry recommended** unless brief author wants a TOGC variant page (e.g. TOGC for serviced accommodation, TOGC on commercial portfolio sale).

### partial-exemption (3 candidates)

1. vat-the-partial-exemption-trap — https://www.taxaccountant.co.uk/vat-the-partial-exemption-trap/ — best_existing 0.17 — cannibalisation: NONE on-site
2. vat-partial-exemption-and-input-tax-recovery — https://www.taxaccountant.co.uk/vat-partial-exemption-and-input-tax-recovery/ — best_existing 0.25 — cannibalisation: NONE on-site
3. vat-partial-exemption (glossary) — https://www.business-accounting.co.uk/glossary/vat-partial-exemption — best_existing 0.25 — cannibalisation: NONE on-site (glossary stub, may not be worth dedicated page; merge into 1+2)

### sa-vat / TOMS / serviced-accommodation (4 candidates)

1. vat-analysis-for-agent-and-principal-roles-in-serviced-accommodation — https://www.ukpropertyaccountants.co.uk/vat-analysis-for-agent-and-principal-roles-in-serviced-accommodation/ — best_existing 0.27 — cannibalisation: toms-vat-serviced-accommodation.md (adjacent but different angle, agent-vs-principal is a TOMS variant)
2. leased-apartments-sub-let-on-airbnb-vat-toms-or-not — https://uklandlordtax.co.uk/leased-apartments-sub-let-on-airbnb-vat-toms-or-not/ — best_existing 0.17 — cannibalisation: toms-vat-serviced-accommodation.md (adjacent, sub-let-Airbnb is a niche variant)
3. the-toms-vat-scheme-another-attack-by-hmrc-foiled — https://www.property-tax-advice.co.uk/knowledge-centre/the-toms-vat-scheme-another-attack-by-hmrc-foiled/ — best_existing 0.18 — cannibalisation: toms-vat-serviced-accommodation.md (case-study angle to existing TOMS page)
4. vat-on-long-term-hotel-stays — https://www.geraldedelman.com/insights/vat-on-long-term-hotel-stays/ — best_existing 0.20 — cannibalisation: toms-vat-serviced-accommodation.md (28-day rule overlap, distinct topical angle)

### holiday-let-vat (3 candidates)

1. benefits-vat-registration-holiday-lets — https://www.business-accounting.co.uk/blog/benefits-vat-registration-holiday-lets — best_existing 0.25 — cannibalisation: NONE on-site
2. holiday-lets-vat-registration — https://www.business-accounting.co.uk/blog/holiday-lets-vat-registration — best_existing 0.29 — cannibalisation: dupe of #1 above + adjacent to landlord-vat-registration-when-required.md
3. vat-threshold-holiday-lets-uk — https://www.business-accounting.co.uk/blog/vat-threshold-holiday-lets-uk — best_existing 0.20 — cannibalisation: same business-accounting template family

### conversion-zero-rate (2 candidates)

1. vat-property-conversion-guide — https://uklandlordtax.co.uk/vat-property-conversion-guide/ — best_existing 0.29 — cannibalisation: NONE on-site (canonical conversion-zero-rate entry; complements vat-on-new-builds-residential-property.md)
2. vat-on-construction-industry-an-overview — https://www.taxaccountant.co.uk/vat-on-construction-industry-an-overview/ — best_existing 0.20 — cannibalisation: adjacent to domestic-reverse-charge-construction-vat-landlords.md and vat-on-new-builds-residential-property.md (umbrella page risk)

### developer-vat (1 candidate)

1. can-i-reclaim-vat-on-property-development-costs — https://www.towerstone.co.uk/can-i-reclaim-vat-on-property-development-costs — best_existing 0.27 — cannibalisation: NONE on-site (canonical developer input-tax page)

### commercial-vat / capital-goods-scheme / mixed-use / cladding (3 candidates)

1. vat-the-capital-goods-scheme-for-property-businesses — https://www.taxaccountant.co.uk/vat-the-capital-goods-scheme-for-property-businesses/ — best_existing 0.20 — cannibalisation: NONE on-site (CGS is property-specific, high-depth-need)
2. how-does-vat-work-on-mixed-use-properties — https://www.towerstone.co.uk/how-does-vat-work-on-mixed-use-properties — best_existing 0.20 — cannibalisation: NONE on-site
3. vat-and-the-cladding-crisis-a-missed-opportunity-for-relief — https://www.geraldedelman.com/insights/vat-and-the-cladding-crisis-a-missed-opportunity-for-relief/ — best_existing 0.13 — cannibalisation: NONE on-site (cladding-remediation is property-VAT topical)

### vat-on-rental / landlord-vat (6 candidates)

1. vat-on-rental-income-essential-insights-for-landlords-and-investors — https://www.ukpropertyaccountants.co.uk/vat-on-rental-income-essential-insights-for-landlords-and-investors/ — best_existing 0.21 — cannibalisation: landlord-vat-registration-when-required.md (overlap, but covers rental-income, not registration)
2. vat-registered-property-business-pros-and-cons-for-landlords — https://www.ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords/ — best_existing 0.27 — cannibalisation: landlord-vat-registration-when-required.md (overlap on the decision-to-register angle)
3. property-portfolios-and-vat — https://www.rpgcrouchchapman.co.uk/resources/blog/property-portfolios-and-vat/ — best_existing 0.29 — cannibalisation: landlord-vat-registration-when-required.md (overlap, portfolio angle differentiates)
4. is-there-vat-on-rent — https://www.towerstone.co.uk/is-there-vat-on-rent — best_existing 0.22 — cannibalisation: dupe of #1 (entry-point query, could be redirect-or-merge target)
5. landlords-register-for-vat — https://www.business-accounting.co.uk/blog/landlords-register-for-vat — best_existing 0.25 — cannibalisation: landlord-vat-registration-when-required.md (clear duplicate, REJECT in practice)
6. vat-threshold-landlords-uk — https://www.business-accounting.co.uk/blog/vat-threshold-landlords-uk — best_existing 0.29 — cannibalisation: landlord-vat-registration-when-required.md (threshold angle = partial overlap, could differentiate)

### other-property-vat (umbrella / dilapidations / letting-agent angles) (8 candidates)

1. dilapidations-demystified-accounting-tax-and-vat-implications — https://bhp.co.uk/news-events/blog/dilapidations-demystified-accounting-tax-and-vat-implications/ — best_existing 0.25 — cannibalisation: NONE on-site (dilapidations + VAT is high-priority commercial-lease gap)
2. vat-land-and-property-issues — https://www.geraldedelman.com/insights/vat-land-and-property-issues/ — best_existing 0.25 — cannibalisation: umbrella for whole bucket (consider as pillar candidate)
3. vat-and-property-dispelling-myths-and-avoiding-common-mistakes — https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — best_existing 0.18 — cannibalisation: NONE on-site (myths-page format, useful entry-point)
4. non-refundable-deposits-and-vat — https://www.geraldedelman.com/insights/non-refundable-deposits-and-vat/ — best_existing 0.17 — cannibalisation: NONE on-site (deposit treatment is property-deposit-relevant)
5. vat-registration-benefits-landlords — https://www.business-accounting.co.uk/blog/vat-registration-benefits-landlords — best_existing 0.29 — cannibalisation: landlord-vat-registration-when-required.md (clear overlap, REJECT in practice or merge as Q-and-A subsection)
6. vat-registration-benefits-letting-agents — https://www.business-accounting.co.uk/blog/vat-registration-benefits-letting-agents — best_existing 0.25 — cannibalisation: NONE on-site (but letting-agent audience is narrow, soft include)
7. letting-agents-vat-registration — https://www.business-accounting.co.uk/blog/letting-agents-vat-registration — best_existing 0.29 — cannibalisation: dupe of #6
8. vat-registration-benefits-property-management — https://www.business-accounting.co.uk/blog/vat-registration-benefits-property-management — best_existing 0.29 — cannibalisation: NONE on-site (property-management-co audience)

### Soft-include with manager judgement flag (2 candidates)

1. vat-temporary-reduced-rate-hospitality-holiday-accommodation-and-attractions — https://ciot-att.lndo.site/vat-temporary-reduced-rate-hospitality-holiday-accommodation-and-attractions — best_existing 0.18 — historic-rate-cut explainer, FHL-adjacent. Possibly stale (relates to 2020-21 Covid-era reduced rate). Manager flag: include only if Wave 5 brief author wants a historic VAT rates on holiday accommodation backgrounder.
2. vat-threshold-property-management-companies-uk — https://www.business-accounting.co.uk/blog/vat-threshold-property-management-companies-uk — best_existing 0.25 — narrow property-management-co audience, could pad bucket but low-priority versus core gaps. Manager flag: include only if Wave 5 brief author wants property-management-firm audience coverage.

---

## Rejected with reason (audit trail)

(Counts grouped by reject reason — full per-row reject list is implicit in "everything in the 296 not listed above". The 260 rejects group as:)

| Reject reason | Approx count |
|---|---:|
| **business-accounting.co.uk non-property template army** (vat-threshold-* / vat-registration-benefits-* / *-vat-registration for non-property industries: beauty, takeaways, dog-groomers, ebay, amazon, AI, tech, SaaS, restaurants, etc.) | ~140 |
| **business-accounting.co.uk VAT-accountant-city pages** (vat-accountant-cambridge / leeds / manchester / etc., city template, non-property-specific) | ~20 |
| **Generic VAT business-accountancy content** (cash accounting scheme, flat rate scheme, returns prep, compliance, registration helpline, food, cryptocurrency, ebay sellers, etc.) | ~30 |
| **Uber court cases / ride-share VAT** (rows 285, 288, plus 68, 71) | 4 |
| **NHS locum doctors VAT** (rows 11, 223) | 2 |
| **Childcare / nursery VAT** (rows 70/198, plus business-accounting.co.uk childcare-providers) | ~4 |
| **AI / tech / SaaS / fintech / Shopify VAT** (rows 16-19, 31-38, 109, 113, 114, 211, plus saas-companies-vat, web-development-companies-vat) | ~15 |
| **Charity / not-for-profit / academy / education / museums-galleries / private-schools VAT** (rows 79, 192, 193, 203, 208, 213, 250, 268, plus HMRC museums-galleries-energy story) | ~12 |
| **Solicitor / law-firm client-account VAT** (rows 67, 201, 230) | 3 |
| **Vehicle leasing / cars / vans / mobile phones / EV charging VAT** (rows 72, 106, 188, 202, 241, 246, 266) | 7 |
| **EU / cross-border / Intrastat / VAT MOSS / digital services** (rows 207, 225, 226, 236, 259, 260, 269) | 7 |
| **HMRC enforcement / inspections / penalty regime / 11.4bn fraud / dispute / 75k case / refunds-blocked / VAT debt British Telecom / weekends-bank-holidays-deadline** (rows 63, 64, 66, 69, 195, 199, 209, 233, 286, 291, 294) | ~11 |
| **TOMS / tour-operator non-property variants** (row 284 golf-holidays-worldwide, row 295 tour-operator-services case analysis) | 2 |
| **Generic / brand / image-banner files** (rows 256-264 from taxpartnersuk.com, vat-img-1, vat-img-2, vat-services-img, vat-resignation-banner, CMS asset URLs not articles) | 9 |
| **Misc non-property VAT** (period pants, festive season, membership cards, payments holiday, PPE relief, electric vehicles, postponed accounting, second-hand-goods margin scheme, place-of-supply-for-services, retail schemes, payback-clawback, holding companies, food, relocation expenses, etc.) | ~30 |
| **Xero / software / digital-VAT** (rows 196, 216) | 2 |
| **Provestor (landlord software-specific)** (row 219, borderline; treated as reject in final view due to vendor-tie) | 1 |

**Total rejects: ~260** (the residual after subtracting 36 pass-filter candidates from 296).

---

## Top sub-themes by candidate count (post-filter)

1. **other-property-vat (umbrella)** — 8 candidates (but mostly low-priority pads)
2. **vat-on-rental** — 6 candidates (heavy internal duplication)
3. **sa-vat / TOMS** — 4 candidates (existing TOMS on-site is partial dedup)
4. **partial-exemption** — 3 candidates
5. **holiday-let-vat** — 3 candidates (high template duplication)
6. **commercial-vat / mixed-use / cladding** — 3 candidates (all high-priority, distinct topics)
7. **conversion-zero-rate** — 2 candidates
8. **option-to-tax** — 1 candidate (but topically the highest-priority gap)
9. **developer-vat** — 1 candidate
10. **togc** — 0 candidates (existing on-site coverage closes this)

---

## Notes for Wave 5 brief author

- Do **NOT** select on raw candidate count. The bucket is heavily polluted by non-property business-accounting.co.uk template farms.
- **DO** select on topical gap relative to existing on-site VAT corpus (6 pages listed at top of this report).
- **Best 10 Wave 5 page targets** (combining surfaced candidates + on-site gap analysis): option-to-tax mechanics, option-to-tax 20-year revocation, Capital Goods Scheme for property, partial-exemption for mixed landlords, VAT on mixed-use property purchases, dilapidations + VAT, VAT on property conversion (resi-to-commercial / commercial-to-resi), VAT pre-registration input-tax for developers, VAT on long-term hotel/aparthotel stays (TOMS deepening), and VAT and cladding-remediation relief.
- If brief author needs more candidates, the **partial-overlap VAT cluster (64 candidates)** at line 672 of topic_gaps_delta_2026-05-23.md is unanalysed here and may yield more property-specific gems. Recommend running this same filter against that smaller pool as a Wave 5 follow-up sub-task before final bucket selection.
