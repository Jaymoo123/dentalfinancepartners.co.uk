# Flagship brief: UK Care Provider Index (Care Home Tax)

No research slug in nav yet; propose `/research/care-provider-index`. Audience: care home owners/directors, domiciliary agencies, supported living operators.

## 1. Candidate dataset
CQC (Care Quality Commission) public data: the "care directory with ratings" CSV (updated roughly monthly) plus registration/deregistration data covering every registered provider and location in England, with service type, beds, ratings, registration dates. Genuinely public and recurring. Confidence: high. Caveat: England only (Scotland/Wales have separate regulators, out of scope for v1).

## 2. Source and licensing
- CQC publishes under OGL terms with attribution to CQC required. Verify exact licence wording on the download page before build (flagged: CQC has its own reuse statement; owner to confirm).
- Supplements (OGL): Companies House SIC 87xxx/88xxx incorporations; Skills for Care workforce estimates (annual, check reuse terms before use).

## 3. Asset shape
- `src/data/care-provider-index.json`; page with Article + Dataset JSON-LD, CSV route.
- Metrics: monthly new registrations vs deregistrations; active locations by service type; ratings distribution over time; beds trend; regional splits.

## 4. Refresh plan
Monthly. Script sketch: download CQC directory CSV, diff against prior month for registrations/deregistrations, aggregate by type/region/rating, emit snapshot JSON + CSV.

## 5. OWNER SIGN-OFF GATE
- [ ] Approve CQC as source and confirm its reuse/licence wording
- [ ] Approve England-only scope and on-page disclosure of it
- [ ] Approve aggregates-only rule: never name or rank individual homes
- [ ] Confirm claims exposure acceptable (ratings commentary stays statistical, no provider criticism)
- [ ] Approve monthly refresh promise

## 6. Verdict
**VIABLE.** Recurring public regulator dataset, tight audience fit. One open check: exact CQC reuse terms, resolved at the sign-off gate.
