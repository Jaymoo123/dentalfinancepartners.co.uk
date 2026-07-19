# Flagship brief: Pharmacy Openings and Closures Index (Pharmacy Tax)

Slug already in nav: `/research/pharmacy-openings-closures-index`. Audience: community pharmacy owners, buyers/sellers, groups, locums.

## 1. Candidate dataset
Primary: NHSBSA open data. The Consolidated Pharmaceutical List (all NHS community pharmacies in England, published quarterly-ish) supports openings/closures tracking by diffing releases; "Dispensing contractors' data" and Prescription Cost Analysis give monthly items dispensed and payment context. All genuinely public via the NHSBSA Open Data Portal. Confidence: high for England. Caveat: England only; Scotland/Wales/NI equivalents exist but are separate publications, out of scope v1.

## 2. Source and licensing
- NHSBSA Open Data Portal: OGL v3, attribute NHSBSA.
- Optional supplement: GPhC registered premises numbers (check reuse terms before including).

## 3. Asset shape
- `src/data/pharmacy-openings-closures-index.json`; page with Article + Dataset JSON-LD (OGL), CSV route.
- Metrics: active NHS pharmacies over time; openings vs closures per release; net change by region/ICB; average dispensing volume per pharmacy trend.

## 4. Refresh plan
Aligned to NHSBSA release cadence (treat as quarterly for the list, monthly for dispensing volumes). Script sketch: pull latest list, diff ODS codes vs prior release for openings/closures, join dispensing totals, emit snapshot JSON + CSV.

## 5. OWNER SIGN-OFF GATE
- [ ] Approve NHSBSA as source and England-only scope disclosure
- [ ] Approve closure methodology (list-diff can misread contract transfers/relocations as closures; caveat required)
- [ ] Approve aggregates-only rule: no naming individual pharmacies as "closed"
- [ ] Confirm claims exposure acceptable
- [ ] Approve refresh cadence promise matching NHSBSA releases, not a fixed monthly claim

## 6. Verdict
**VIABLE.** High-quality recurring public source; closures are a known press-worthy story in this niche. Main risk is the transfer-vs-closure methodology, handled at the gate.
