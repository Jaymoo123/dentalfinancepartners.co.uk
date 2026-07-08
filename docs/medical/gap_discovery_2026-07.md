# Gap Discovery 2026-07 — medical

Generated: 2026-07-08  
Triage candidates (WRONG_PAGE + UNSERVED): 62  
Branded excluded: 0  
SERP_SERVED (improve-existing): 25  
Pillar-overlap excluded: 3  
Below impressions floor (<5/28d) omitted: 24  
**New-page candidates: 10**

---

## Recommended for review (new-page candidates)

| # | Query | Impr | Class | SERP | Score | Overlap | Nearest existing | Top competitor |
|---|-------|------|-------|------|-------|---------|-----------------|----------------|
| 1 | medical accountants uk | 223 | WRONG_PAGE | winnable-likely | 167.25 | 0.25 | medical practice incorporation step by s | medicsmoney.co.uk |
| 2 | gp practice accountants | 138 | WRONG_PAGE | winnable-likely | 98.57 | 0.286 | gp-practice-merger-accounts-tax-explaine | dains.com |
| 3 | specialist medical accountants | 74 | WRONG_PAGE | winnable-likely | 55.5 | 0.25 | gp-accountant-birmingham | sandisoneasson.co.uk |
| 4 | medical accountants | 21 | WRONG_PAGE | winnable-likely | 15.75 | 0.25 | medical practice incorporation step by s | bw-medical.co.uk |
| 5 | accounting specialists for medical professionals | 23 | WRONG_PAGE | winnable-likely | 14.38 | 0.375 | accountant-accounting-services | medicsmoney.co.uk |
| 6 | accountants for nhs doctors | 12 | WRONG_PAGE | winnable-likely | 9.0 | 0.25 | nhs-pension-partial-retirement-doctors-g | bw-medical.co.uk |
| 7 | accountants for gp practices | 8 | WRONG_PAGE | winnable-likely | 5.71 | 0.286 | gp-vat-registration | medicsmoney.co.uk |
| 8 | chartered accountants for gps | 5 | WRONG_PAGE | winnable-likely | 4.29 | 0.143 | dispensing-practice-income-accounts-tax | larking-gowen.co.uk |
| 9 | pension allance pension "email address" | 5 | WRONG_PAGE | winnable-likely | 4.29 | 0.143 | nhs pension for locums form a form b | lusha.com |
| 10 | accounting for doctors | 6 | WRONG_PAGE | winnable-likely | 4.0 | 0.333 | gp-accounting | xeinadin.com |

---

## Auto-excluded: SERP_SERVED (improve-existing lane)

We already rank for these — focus on improving the existing page, not creating a new one.

| Query | Impr | Our URL | Our position |
|-------|------|---------|--------------|
| gp accountants | 1340 | https://www.medicalaccounts.co.uk/ | 7 |
| gp accountant | 93 | https://www.medicalaccounts.co.uk/ | 3 |
| medical accountants birmingham | 20 | https://www.medicalaccounts.co.uk/locations/birmingham | 2 |
| medical accounting | 20 | https://www.medicalaccounts.co.uk/services | 11 |
| gp accounts specialists | 16 | https://www.medicalaccounts.co.uk/ | 1 |
| gp partnership goodwill valuation | 14 | https://www.medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity | 1 |
| medical accountants london | 12 | https://www.medicalaccounts.co.uk/locations/london | 2 |
| medical accountant birmingham | 8 | https://www.medicalaccounts.co.uk/locations/birmingham | 3 |
| gp partner expenses | 6 | https://www.medicalaccounts.co.uk/blog/gp-expense-sharing-vs-full-partnership | 4 |
| medical accounts | 4 | https://www.medicalaccounts.co.uk/services | 1 |
| healthcare accountants near me | 3 | https://www.medicalaccounts.co.uk/locations/birmingham | 4 |
| how much to buy into a gp partnership | 3 | https://www.medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity | 9 |
| accountants for gp | 3 | https://www.medicalaccounts.co.uk/ | 7 |
| how much does it cost to buy into a gp partnership | 3 | https://www.medicalaccounts.co.uk/blog/buying-into-gp-partnership-capital-parity | 7 |
| accountants for locum doctors | 3 | https://www.medicalaccounts.co.uk/for-locum-doctors | 3 |
| medical accounting uk | 2 | https://www.medicalaccounts.co.uk/services | 9 |
| medical accountants manchester | 2 | (near-duplicate of a served query) | 0 |
| medical accountants sheffield | 1 | https://www.medicalaccounts.co.uk/blog/gp-accountant-sheffield | 5 |
| gp tax | 1 | https://www.medicalaccounts.co.uk/blog/gp-tax-and-accounts | 3 |
| medical accountant manchester | 1 | https://www.medicalaccounts.co.uk/locations/manchester | 1 |
| medical accountants leeds | 1 | https://www.medicalaccounts.co.uk/locations/leeds | 6 |
| doctors pensions annual allowance | 1 | https://www.medicalaccounts.co.uk/blog/nhs-pension-annual-allowance-complete-gui | 2 |
| locum doctor accountant | 1 | (near-duplicate of a served query) | 0 |
| healthcare accountants uk | 1 | (near-duplicate of a served query) | 0 |
| doctors pension annual allowance | 1 | (near-duplicate of a served query) | 0 |

---

## Auto-excluded: branded queries

Contain a competitor domain name-stem — not worth targeting.

| Query | Impr |
|-------|------|

---

## Auto-excluded: pillar overlap

Jaccard ≥ 0.3 against a pillar/core page.

| Query | Impr | Nearest pillar |
|-------|------|----------------|
| what is a gp partner | 20 | gp-partnership-tax-complete-guide |
| gp practice accountant | 10 | gp-accountant-services-complete-guide |
| gp accounts | 7 | gp-partnership-tax-complete-guide |

---

## Verdict key
- **winnable-likely**: ≥2 non-authority competitors in top 10, no gov/nhs/wiki wall at 1-3
- **review**: manual judgment needed

## Next steps
1. Sonnet judgment pass (Phase C2) — cluster near-dupes, resolve WRONG_PAGE ambiguity
2. Owner approval
3. `python -m optimisation_engine.discovery.batch_builder --site medical --commit-topics`

---

## Sonnet review (2026-07-08)

**Watch window reminder:** medical just completed an indexing-fix wave (92% of pages were never crawled by Google). All recommendations below are **provisional - do not ship until watch window closes (~2026-08-03)**. Build briefs now; publish after the watch verdict.

---

### Clustering and deduplication pass

The 10 auto-candidates split into four intent clusters:

**Cluster A: "Who are you?" brand/category queries (candidates 1, 3, 4, 5)**
- "medical accountants uk" (223 impr), "specialist medical accountants" (74 impr), "medical accountants" (21 impr), "accounting specialists for medical professionals" (23 impr)
- These are all landing-page queries, not blog queries. They want a firm homepage / about / services page, not an article. Creating a new blog page for any of these is the wrong format and will not win. The correct fix is homepage + /services page optimisation (improve-existing, not new page). Kill as new-page candidates.

**Cluster B: "Find me a GP accountant by specialism" service queries (candidates 2, 7, 8)**
- "gp practice accountants" (138 impr), "accountants for gp practices" (8 impr), "chartered accountants for gps" (5 impr)
- These are also commercial/navigational queries. SERP rows (from serp_checks.json) at positions 1-5 are: practiceindex directory, hawsons.co.uk, r-m-t.co.uk, aisma.org.uk, medicsmoney.co.uk. These are authority-branded results. Positions 6-12 include bw-medical.co.uk, sial-accountants.co.uk. The target page intent is a service/landing page, not a blog post. We already have /for-gp-practices (or equivalent) and /services. These belong in the improve-existing lane, not net-new blog pages. Kill as new-page candidates.

**Candidate 6: "accountants for nhs doctors" (12 impr)**
- SERP includes niche firms (bw-medical, synergy-tax, hawsons, nicholsmedical). No gov/nhs wall. However, intent is again a service/directory page. Our /for-locum-doctors and /for-gp-practices already partially address this. Best resolved by adding a `/for-hospital-doctors` or `/for-nhs-doctors` landing page (not a blog post). Flag as improve-existing / service-page gap.

**Candidate 9: "pension allance pension email address" (5 impr)**
- This is navigational noise (user looking for a pension provider's contact details). lusha.com at position 1 confirms it is not a content-winnable query. Reject. Data quality issue: the query string itself is garbled/misspelled.

**Candidate 10: "accounting for doctors" (6 impr)**
- SERP has xeinadin.com (large national firm) at the top. Also hawsons, nicholsmedical, others. Intent is a general landing page. 6 impressions is at the floor. Reject as too generic and too low-volume to justify a standalone page.

---

### Recommended pages (4 net-new blog candidates)

The WRONG_PAGE signal on the homepage for these queries means the site has real impressions but no destination. None are brand-new topic ideas; they are gaps where a deep-guide format can rank.

---

**1. Hospital doctors and NHS consultants: tax and accounts guide**
- Slug: `/blog/hospital-doctor-nhs-consultant-tax-guide`
- Primary queries: "hospital doctors" (multi-competitor coverage; "accounting for doctors" cluster), "nhs consultant tax", "hospital doctor tax return uk"
- Impressions signal: absorbed from the "accounting for doctors" (6 impr) and indirect demand; sitemap gap mining confirms 3-competitor coverage on "hospital-doctors" slug
- Cannibalisation note: `/for-locum-doctors` covers the locum lane; `/blog/locum-doctor-tax-complete-guide` covers locum tax. This page is distinct: employed/salaried hospital doctors (F2, SHO, registrar, SpR, consultant) with PAYE income, private practice income, and LtdCo structure decisions. Not covered anywhere in our 73-page inventory.
- SERP verdict: nicholsmedical, kudosaccounting, synergy-tax in top 10 alongside hawsons. Beatable niche firms. No NHS/gov wall at 1-3.
- Rationale: clear inventory gap, confirmed by 3-competitor sitemap coverage, material audience segment not addressed. High audience fit for a site targeting medical professionals broadly.
- **Provisional - do not ship until watch window closes (~2026-08-03)**

---

**2. Type 2 pension certificates for salaried GPs**
- Slug: `/blog/type-2-pension-certificate-salaried-gp-guide`
- Primary queries: "type 2 certificate salaried gp", "gp pensionable pay type 2", locum form A/B adjacent demand
- Impressions signal: indirect (locum form A/B queries already rank well for us; Type 2 is the salaried/PCSE parallel process with different mechanics)
- Cannibalisation note: `/blog/nhs-pension-for-locums-form-a-form-b` covers Type 1/locum forms. Type 2 certification is the employed-GP equivalent and is explicitly not covered. Confirmed gap: larking-gowen.co.uk has "type-2-certificates-for-salaried-gps" with no near-match in our inventory (J=0.09).
- SERP verdict: specialist medical accountant firms dominate this niche; NHSBSA/NHS Employers appear but not at positions 1-3. Winnable.
- Rationale: natural complement to our existing Form A/B content. Salaried GPs are a large sub-audience. One competitor page confirmed.
- **Provisional - do not ship until watch window closes (~2026-08-03)**

---

**3. MTD for GPs and medical practices: what you need to know**
- Slug: `/blog/making-tax-digital-gp-medical-practice-guide`
- Primary queries: "making tax digital gp practice", "mtd itsa doctors", "mtd medical practice"
- Impressions signal: "making-tax-digital-mtd" and "making-tax-digital-for-income-tax" appear as 2-domain sitemap gaps (larking-gowen, r-m-t). ITSA MTD launches April 2026 for self-employed earning above 50k; GPs are primary affected group.
- Cannibalisation note: no MTD-specific page in our inventory. `/blog/gp-accounting-software` touches Xero/cloud tools but not the MTD compliance obligation. Clean gap.
- SERP verdict: HMRC guidance appears but at lower positions than specialist sites. Niche accountant firms (nicholsmedical, sial) appear. Winnable.
- Rationale: evergreen regulatory topic, strong timeliness for 2026 given mandatory MTD ITSA timeline. Two-domain competitor coverage confirms demand.
- **Provisional - do not ship until watch window closes (~2026-08-03)**

---

**4. GPs moving abroad: UK tax when leaving the NHS**
- Slug: `/blog/gp-moving-abroad-uk-tax-residency-nhs-pension`
- Primary queries: "uk gps moving abroad", "doctors moving to dubai tax", "gp emigrating nhs pension"
- Impressions signal: nicholsmedical has "doctors-moving-to-dubai" and "uk-gps-moving-abroad" (confirmed sitemap gaps). Emerging query pattern from Bing/GSC data around international mobility.
- Cannibalisation note: no page in our inventory covers residency change, domicile, or emigration for GPs. NHS pension on leaving the UK is a specific regulatory area (preserved benefit vs. refund rules). Clean gap.
- SERP verdict: nicholsmedical, smallbusiness publishers, no NHS/gov wall. Winnable.
- Rationale: growing demand signal as doctor emigration rises post-contract disputes. One main competitor covering it. Low competition ceiling.
- **CAUTION (2026-07-08): differentiation required vs dentists site.** The dentists site has `dentist-leaving-uk-emigrating-tax-position.md` covering an emigrating dentist's tax position. This medical page must be clearly scoped to the GP/NHS-pension mechanics (preserved benefit elections, PCSE deregistration, NRLS registration for UK property if applicable) rather than general UK-tax-on-departure content. Shared estate readers should not see two near-identical emigration guides on different sites. Angle tightly around NHS pension and GP-specific registration obligations.
- **Provisional - do not ship until watch window closes (~2026-08-03)**

---

### Rejected candidates (summary)

| Candidate | Reason |
|-----------|--------|
| medical accountants uk (223 impr) | Landing/brand intent, not blog content. Improve /services and homepage. |
| gp practice accountants (138 impr) | Service directory intent. Improve /for-gp-practices landing page. |
| specialist medical accountants (74 impr) | Brand intent. Homepage optimisation. |
| accounting specialists for medical professionals (23 impr) | Morphological duplicate of above cluster. |
| medical accountants (21 impr) | Brand intent, landing page. Homepage. |
| accountants for nhs doctors (12 impr) | Service intent. New /for-hospital-doctors landing page, not a blog post. |
| accountants for gp practices (8 impr) | Duplicate of "gp practice accountants" cluster. |
| chartered accountants for gps (5 impr) | Same service-intent cluster. Too generic, floor-volume. |
| pension allance pension email address (5 impr) | Garbled navigational query. Not a content opportunity. |
| accounting for doctors (6 impr) | Too generic. Large national firms dominate. 6 impr is floor. |

---

### Improve-existing flags (from WRONG_PAGE analysis)

These are not new pages but require signal improvement on existing pages:

- "gp accounts" / "gp accounting" (7-10 impr) serving gp-accounting-guide at position 44-45: the guide needs internal link consolidation and on-page query alignment
- "gp partner expenses" (6 impr) serving gp-accounting-guide: should resolve to gp-tax-deductions-complete-list-2026 instead; cross-link or meta-redirect

---

### Data quality notes

- Candidate 9 ("pension allance pension email address") is a garbled query with lusha.com at position 1; it leaked into the candidate list despite being navigational noise. The impressions floor of 5/28d is too permissive for this kind of garbled query.
- Several WRONG_PAGE signals on the homepage (candidates 1, 2, 3, 4, 5) have average positions of 44-83: these are visibility without ranking, not genuine wrong-page signals. The homepage is simply too far back to serve anyone. They need a different fix (homepage/service page strengthening) not new blog pages.
- The "winnable-likely" SERP verdict is accurate: practiceindex.co.uk, hawsons.co.uk, and bw-medical.co.uk appear consistently but none are NHS/gov/wiki walls. An authoritative niche page can compete.

---

## Cross-estate ownership notes (2026-07-08)

- Med-4 (GPs moving abroad): must be differentiated from the dentists site's `dentist-leaving-uk-emigrating-tax-position.md`. Scope this page to NHS pension mechanics and GP-specific obligations, not generic UK departure tax.
- IT contractor queries that surface in medical GSC belong to the contractors-ir35 site; do not brief here.

---

### Honest count

- Auto-candidates: 10
- Morphological clusters resolved: 3 groups (brand/landing intent = 6 candidates killed)
- Net-new blog pages recommended: **4**
- Improve-existing flags raised: 2
- Rejected outright: 6
- All 4 recommendations: **provisional, hold until ~2026-08-03**