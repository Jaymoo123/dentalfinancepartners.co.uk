---
slug: corporation-tax-marginal-relief-uk-guide
category: incorporation-and-company-structures
intent: A UK landlord or accountant searching this query wants a definitive guide to the corporation-tax marginal-relief mechanic introduced by FA 2021 (effective 1 April 2023) — the 19% / 26.5% / 25% three-figure framework, the £50k / £250k limits, the associated-companies divisor, the augmented-profits test, and the 3/200 formula. This is the generic guide layer (pillar / explainer) of the marginal-relief topic, framed primarily for property-LtdCo readers, with a forward link to the property-specific application page already on the site.
---

# Corporation Tax Marginal Relief: A Complete UK Guide (FA 2021 Framework, 2026/27)

## Statutory anchor

- **Primary:** CTA 2010 — s.3 (charge to CT); s.18A (small profits rate charge — 19% applies to UK-resident, non-CIHC companies with augmented profits at or below the lower limit); s.18B (marginal relief trigger — applies where augmented profits exceed the lower limit but not the upper limit); s.18C (the "ring fence" carve-out — does not apply outside oil and gas; sessions ignore for property context); **s.18D (marginal relief formula + standard fraction)** — image-bound on legislation.gov.uk per §16.44 (formula F = (U − A) × N/A × standard fraction). Standard fraction 3/200 confirmed gov.uk consumer guidance for 2026/27 per §21.A.
- **Primary:** CTA 2010 s.18E (associated-companies definition + divisor mechanic — the lower and upper limits are divided by (1 + N), where N = associated companies in the accounting period). s.450 (definition of "control" referenced from s.18E).
- **Primary:** CTA 2010 s.18L (augmented profits — the comparison figure for the threshold tests; = taxable total profits PLUS qualifying exempt distributions from non-group companies; distributions from 51% group companies excluded per s.18L(2)).
- **Supporting:** CTA 2010 s.18N (CIHC exclusion — close investment-holding companies are denied SPR + marginal relief and pay 25% main rate regardless of profit; relevant for property-investment companies where the qualifying-purpose carve-out at s.18N(2)(b) + s.18N(3) does NOT apply per §21.5 + §21.A drift catch).
- **Supporting:** FA 2021 c. 26 Sch 1 (the inserting Act for the post-1-April-2023 framework — paras 1-3 inserted CTA 2010 ss.18A-S; Sch 1 para 34 commencement = effect for financial year 2023 onwards).
- **House position reference:** §21.A primary (FA 2021 three-figure framework, associated-companies divisor, augmented-profits test, CIHC restatement — verified gov.uk 2026-05-25); §21.4 primary (2026/27 rate stack confirmation: SPR 19%, main 25%, marginal 26.5%); §21.5 (CIHC framework + qualifying-purpose carve-out — relevant where the writer must explain who is OUT of marginal-relief access).

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **generic UK pillar / explainer** of corporation tax marginal relief. Closest existing page:
- `corporation-tax-marginal-relief-property-companies.md` — property-specific application of the mechanic. Already covers worked examples in property-SPV context.

Differentiator: this page is the **explainer / pillar** layer (what marginal relief is, how the 3/200 formula works, the limits, the associated-companies divisor, augmented profits) for a UK-generic audience, with property-specific applications referenced through to the property-companies page. The existing property-companies page lives one layer down (specialist application).

The framing this page takes: a reader is researching "corporation tax marginal relief" generically — they may operate a property SPV but may also be a non-property business owner or accountant working across sectors. This page answers the mechanic question (what is the relief, how does it work, who qualifies, who doesn't, how is it calculated). It links to the property-companies page for the property-specific worked examples + the property-SPV-specific traps (associated-companies divisor across BTL SPVs, CIHC risk for family-tenant property).

Alternative framing the writer should NOT take: this is not a 2026/27 rates-only page (existing site has `corporation-tax-rates-property-companies-2026-27`); this is not a rates-comparison page (existing site has `corporation-tax-vs-income-tax-landlords-2027`); this is not the planning-pillar lever-map (sibling MW2 pick A4 covers that).

## Key questions this page must answer

1. What is corporation tax marginal relief, and what problem does it solve (the cliff between the small profits rate and the main rate)?
2. When did the FA 2021 framework take effect, and what was the legal position before then (FA 2014 abolition of original SPR; FA 2021 reinstating a structurally different SPR + marginal-relief regime effective 1 April 2023 per §21.A.2)?
3. Who qualifies for marginal relief: the UK-resident, non-CIHC, non-ring-fence company with augmented profits in the £50k-£250k band (with the associated-companies divisor applied)?
4. How is marginal relief calculated: walk through the s.18D formula F = (U − A) × N/A × (3/200), with worked examples at the boundary points and at the middle of the band?
5. What is the effective marginal rate (26.5%), and why does it emerge from the 3/200 standard fraction (the maths of the cliff smoothing)?
6. How do the limits work for a single-company structure (£50k lower, £250k upper)?
7. How does the associated-companies divisor (s.18E) change the limits for multi-company structures (limits divided by 1+N, where N = associated companies)? Worked example: 5 associated companies → £10k lower, £50k upper per company.
8. What is "augmented profits" (s.18L), and how can dividends received from non-group companies push a company into marginal relief or main rate?
9. Who is OUT of marginal relief: CIHCs (s.18N), ring-fence companies (oil & gas — irrelevant here), companies in liquidation in certain circumstances, non-UK-resident companies on UK profits (special rules)?
10. How do you report and claim marginal relief on CT600 — automatic in computation, no separate election?
11. What are the common mis-calculations (using TTP instead of augmented profits; missing associated companies; assuming the 26.5% is a directly applied rate; applying limits without divisor for multi-SPV portfolios per §21.A.2 do-not-write)?
12. Where does this connect to the wider CT planning picture for property landlords (forward link to `corporation-tax-marginal-relief-property-companies` for property-specific worked examples; to A4 for the planning lever map)?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures` (matches live route).
- **Worked-example numbers:** §21.A + §21.4 rates verified at HP-lock time (2026-05-25 / 2026-05-23). Stage 2 to re-verify gov.uk "Corporation Tax rates and allowances" + "Marginal Relief for Corporation Tax" calculator page at write time per §16.27 + §16.42 rate-by-reference discipline. Worked example expected at: (a) profit just over £50k showing relief reducing CT below the 25% line; (b) profit at £150k (middle of band) showing the 26.5% effective; (c) profit at £250k showing relief disappearing; (d) multi-SPV scenario with 5 associated companies showing limit shrinkage; (e) augmented-profits push from dividend receipt.
- **§21.A.2 do-not-write list — Stage 2 MUST internalise:** "19% on first £250k" / "SPR up to £250k" / "25% on profits over £50k" / "19% CGT for companies" / "each SPV gets its own £50k" / "dormant counts toward associated" / "FA 2014 abolished SPR permanently" / "26.5% applied as a flat rate" — these are the F-31 drift patterns that triggered the §21.A lock. Stage 2 reviewers must run a grep against the draft for each pattern.
- **Cross-link targets:**
  - Within MW2 Bucket A: `corporate-tax-planning-strategies-for-uk-clients` (A4 — pillar lever-map; sibling), `directors-loan-accountsdla-uk-guide` (A6 — extraction sibling), `eligible-groups-for-group-relief-under-uk-corporation-tax` (A8 — group-relief interaction), `register-for-uk-corporation-tax` (A17 — formation prereq).
  - To existing pages: `corporation-tax-marginal-relief-property-companies` (property-specific application — the direct child page), `corporation-tax-rates-property-companies-2026-27` (rates-only sibling), `corporation-tax-vs-income-tax-landlords-2027` (comparison sibling), `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis` (extraction sibling).

## Stage 2 research target list

- **Competitor pages to fetch (Stage 2 verifies live):** firm-side marginal-relief explainers (Crowe, BDO, Tax Adviser magazine, Tolley); gov.uk "Marginal Relief for Corporation Tax" page + calculator; HMRC CTM03700+ section. Stage 2 verifies URLs via `competitor_serps` + targeted search.
- **HMRC + Companies House manual anchors:**
  - HMRC CTM03000 (CT rates) + CTM03700+ (marginal relief specifically).
  - HMRC Marginal Relief Calculator (gov.uk) — explicitly cite + describe how to use.
  - HMRC CT600 guidance on the marginal-relief calculation entry.
- **Case-law to ground:** generally none for this mechanic; if Stage 2 finds tribunal cases on associated-companies determination or augmented-profits classification, cite.
- **Authority links to cite:**
  - legislation.gov.uk CTA 2010 ss.18A-S anchors (esp. s.18D image-bound formula + s.18E + s.18L).
  - legislation.gov.uk FA 2021 c. 26 Sch 1 (inserting Act).
  - gov.uk Marginal Relief Calculator + CT rates page.
  - HMRC CTM index pages.

## Universal rules + workflow stubs (Stage 2 fills)

[Stage 2 populates from NETNEW_PROGRAM §4 brief anatomy + §7 19-step workflow.]

## Work log (Stage 2 + RUN session populate)

[Stage 2 + RUN session record their work here.]

---

## Stage 1 seed work log

- **Stage 1 author:** MW2 Stage 1 Sub-Agent A (batch M2-A-B1) on 2026-05-26.
- **Cluster anchor:** Limited company / BTL company operation. Framing: generic UK pillar / explainer of marginal-relief mechanic, parent of the existing property-companies-specific application page. Funnels generic-intent traffic to the property-application page.
- **HP-lock alignment:** §21.A primary (the lock for this exact topic — FA 2021 framework, formulas, divisor, augmented profits, CIHC exclusion + the §21.A.2 do-not-write list of drift patterns). §21.4 secondary (2026/27 rate confirmation). §21.5 (CIHC depth for who's out).
- **§16.35 verification note:** all citations anchored to §21.A HP lock (verified gov.uk 2026-05-25). Stage 2 must re-verify rates at write time per §16.27 + §16.42 rate-by-reference discipline — gov.uk consumer guidance on rates + Marginal Relief Calculator are the live sources.
- **Cannibalisation reasoning:** clear differentiator from existing `corporation-tax-marginal-relief-property-companies` page — this is the generic pillar / explainer layer (mechanic-first framing), that's the property-specific application layer (worked-examples-first framing). Both pages co-exist as parent-child in the marginal-relief content cluster. Stage 2 must hold the generic-pillar framing tightly; if the property-specific worked examples crowd out the generic-mechanic explanation, refactor.
- **§21.A.2 drift-pattern compliance:** Stage 2 must grep the draft against all 8 drift patterns in the do-not-write list before commit — the F-31 site-wide STALE sweep at commit `195e895` already back-patched 65 pages for these patterns; new pages must not regress.
