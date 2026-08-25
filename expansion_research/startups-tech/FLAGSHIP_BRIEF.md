# Flagship brief: Startup Formation and Survival Index (Founder Tax Partners)

Slug already in nav: `/research/startup-formation-survival-index`. Audience: funded startups, SaaS founders, pre-seed to scaling.

## 1. Candidate dataset
Primary: Companies House bulk data (monthly snapshots, incorporation and dissolution feeds), filtered to tech SIC codes (62xxx software/IT, 63xxx information services, plus selected 58.2x/72.x). Public, free, recurring. Confidence: high.
Secondary (both OGL, annual): HMRC R&D tax credit statistics (claims volume and value by sector/size); ONS business demography (1 to 5 year survival rates by industry).

## 2. Source and licensing
- Companies House bulk products: free reuse, attribute Companies House.
- HMRC and ONS statistics: OGL v3.

## 3. Asset shape
- `src/data/startup-formation-survival-index.json`; page with Article + Dataset JSON-LD (OGL licence URI), CSV route.
- Metrics: monthly tech incorporations vs dissolutions; net formation trend vs all-sector baseline; regional hotspots; annual overlays of R&D claim volumes and survival-rate curves.

## 4. Refresh plan
Monthly for the Companies House layer; annual overlays refreshed when HMRC/ONS publish. Script sketch: reuse the landlord-index Companies House tooling, swap SIC filter, aggregate, emit snapshot JSON + CSV.

## 5. OWNER SIGN-OFF GATE
- [ ] Approve SIC-based "tech startup" definition (a registered company is not necessarily a funded startup; caveat on-page)
- [ ] Approve mixing monthly (CH) and annual (HMRC/ONS) cadences in one asset
- [ ] Approve survival-rate framing (ONS industry rates, not our own cohort tracking, in v1)
- [ ] Confirm claims exposure acceptable: aggregates only
- [ ] Approve monthly refresh promise

## 6. Verdict
**VIABLE.** Closest analogue to the shipped landlord index; same primary source, existing tooling largely reusable.
