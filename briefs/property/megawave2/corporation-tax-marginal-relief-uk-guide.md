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

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (WebFetch-verified live 2026-05-27, with verbatim text captured)

- **`https://www.legislation.gov.uk/ukpga/2010/4/section/18A`** — CTA 2010 s.18A (Standard small profits rate). **VERIFIED LIVE 2026-05-27. Verbatim conditions:** "Corporation tax is charged at the standard small profits rate on a company's taxable total profits of an accounting period which are not ring fence profits if — (a) the company is UK resident in the accounting period, (b) it is not a close investment-holding company in the period, and (c) its augmented profits of the accounting period do not exceed the lower limit." Also verbatim on the rate itself: "'the standard small profits rate' means a rate that — (a) is lower than the main rate, and (b) is set by Parliament for the financial year as the standard small profits rate." **Critical for RUN session:** s.18A does NOT set the rate value — the 19% figure comes from the annual Finance Act / rate-setting publication. RUN session cites s.18A for the qualifying conditions and the gov.uk rates publication for the 19% rate.

- **`https://www.legislation.gov.uk/ukpga/2010/4/section/18D`** — CTA 2010 s.18D (Marginal relief formula). **VERIFIED LIVE 2026-05-27.** Page exists; formula is **image-bound** (per §16.44 / WebFetch summarizer limitation — confirmed). RUN session must cite the formula F = (U − A) × (N / A) × (standard fraction) as the operative algebra, supported by the gov.uk consumer-rates publication for the 3/200 standard fraction value. Verbatim from the section body: "If C has one or more associated companies in the accounting period — (a) the lower limit is — [image] (b) the upper limit is — [image]" confirming the divisor-based limit-adjustment architecture is at this section.

- **`https://www.legislation.gov.uk/ukpga/2010/4/section/18E`** — CTA 2010 s.18E (Associated companies). **VERIFIED LIVE 2026-05-27. Verbatim test:** "For the purposes of this Part, a company is an associated company of another at any time when — (a) one of the two has control of the other, or (b) both are under the control of the same person or persons." Note: s.18E defines what constitutes an associated company. The DIVISOR mechanic (limits divided by 1 + N) operates through s.18D limit-adjustment provisions, not by an explicit s.18E divisor statement. RUN session frames this precisely.

- **`https://www.legislation.gov.uk/ukpga/2010/4/section/18N`** — CTA 2010 s.18N (Close investment-holding companies). **VERIFIED LIVE 2026-05-27. Verbatim permitted purposes (subsection 2):** s.18N(2) lists permitted purposes including "**for the purpose of carrying on a trade or trades on a commercial basis**" and "**for the purpose of making investments in land, or estates or interests in land**". The property-investment-in-land permitted purpose is the central protection for BTL-LtdCo / SPV operators. Where the company lets "wholly or mainly" to UNCONNECTED persons on commercial terms, the s.18N(3) connected-tenant exclusion does not catch and the company is OUT of CIHC. RUN session cites this verbatim; it is the single most-misunderstood provision in property-LtdCo CT and any drift here is high-impact.

- **`https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax`** — HMRC CT rates + allowances publication (verified live pick 4). **Verbatim rates 2026/27: SPR 19% (profits ≤ £50,000); main rate 25% (profits > £250,000); marginal relief with standard fraction 3/200 between £50k and £250k.** Rates consistent from 2023 through 2026. RUN session cites this as the operative rate-by-reference source per §16.27 + §16.42.

- **`https://www.gov.uk/marginal-relief-calculator`** — HMRC Marginal Relief Calculator pointer (verified live pick 4). RUN session shows readers how to validate worked examples in this page against HMRC's own calculator.

- **`https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03510`** — HMRC CTM03510 (CT rates / limits / fractions). **VERIFIED LIVE 2026-05-27**, updated 5 May 2026. Includes historic rate / limit / fraction tables (FY 1989-2014 historic SPR; the post-FA-2021 framework is at later CTM sections). RUN session cites for the historic context (FA 2014 abolition of original SPR; FA 2021 reinstatement effective 1 April 2023) but reads the actual current-year position from CTA 2010 s.18A + the gov.uk rates page.

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: session-side WebSearch at write time required. Stage 2 attempted firm-domain URLs in pick 4 (all 403 Cloudflare). RUN session uses Google Search. Recommended queries: "corporation tax marginal relief UK 2026 calculation", "associated companies divisor marginal relief", "augmented profits marginal relief". Aim 3-5 firm-side guides (Tax Adviser magazine, ICAEW, Tolley, Crowe). -->`

### HMRC + Companies House manual anchors

- HMRC CTM03000+ (CT rates) — RUN session WebFetches specific child pages at write time.
- HMRC CTM index pages for the post-FA-2021 framework.
- HMRC CT600 guidance on the marginal-relief calculation entry on the return.

### Case-law

Generally none for the mechanic. If RUN session finds tribunal cases on associated-companies determination (often the most-litigated area — control under s.450, dormant company exclusion, related employer aggregation) or on augmented-profits classification, cite.

### Legislation anchors (RUN session WebFetches at write time per §16.35)

- **CTA 2010 s.18A** — SPR conditions (verified above).
- **CTA 2010 s.18B** — marginal relief trigger.
- **CTA 2010 s.18D** — marginal relief formula (image-bound — cite via consumer-rates page).
- **CTA 2010 s.18E** — associated company definition (verified above).
- **CTA 2010 s.18L** — augmented profits.
- **CTA 2010 s.18N** — CIHC + qualifying purposes (verified above).
- **CTA 2010 s.450** — control definition.
- **FA 2021 c. 26 Sch 1** — the inserting Act for the post-1-April-2023 framework.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — Profit just over the lower limit (single company)

- **Company A** (UK resident, not CIHC, not ring-fence) has augmented profits **£60,000** for accounting period ending 31 March 2027.
- £60k exceeds £50k lower limit but is below £250k upper limit → marginal relief applies (s.18B trigger).
- Formula: F = (U − A) × (N / A) × (3/200) = (£250,000 − £60,000) × (£60,000 / £60,000) × (3/200) = £190,000 × 1 × 0.015 = **£2,850 marginal relief**.
- CT at main rate: £60,000 × 25% = £15,000. Less relief £2,850 = **£12,150 CT**. Effective rate = 20.25%.
- Cross-check: at £50k (lower limit) the effective rate would be 19% exactly; at £250k (upper limit) the effective rate is 25% exactly; at £60k the rate is just above 19% — confirms the cliff-smoothing is working.

### Example 2 — Mid-band

- **Company B** has augmented profits **£150,000**.
- F = (£250,000 − £150,000) × (£150,000 / £150,000) × (3/200) = £100,000 × 1 × 0.015 = **£1,500 marginal relief**.
- CT at 25%: £150,000 × 25% = £37,500. Less £1,500 = **£36,000 CT**. Effective rate 24.0%.

### Example 3 — Just below the upper limit (the 26.5% effective rate trap)

- **Company C** has augmented profits **£240,000** (close to upper limit).
- F = (£250,000 − £240,000) × (£240,000 / £240,000) × (3/200) = £10,000 × 0.015 = **£150 marginal relief**.
- CT at 25%: £240,000 × 25% = £60,000. Less £150 = **£59,850 CT**. Effective rate on the £240k = 24.94%.
- **The 26.5% effective rate insight:** if you compute the MARGINAL effective tax on the LAST POUND added to the company at £240k → £241k of profits, that pound saves £0 of marginal relief (already extinct at upper limit) but adds £0.25 CT plus £0.015 of marginal-relief erosion → about 26.5p of total CT per £1 added. The 26.5% is a MARGINAL rate on the last pound, NOT a flat rate on the whole band. RUN session must hold this distinction — this is one of the §21.A.2 do-not-write patterns to grep against.

### Example 4 — Associated companies divisor

- **Operator owns 4 SPVs**, all under common control (s.18E condition (b) — "both are under the control of the same person or persons"). Each SPV has £75,000 augmented profits.
- N + 1 = 4 (the company in question + 3 associated companies). Limits divide by 4: lower limit £12,500; upper limit £62,500.
- **£75,000 profits now exceed £62,500 new upper limit** for each SPV → each SPV pays main rate 25% on full £75k = £18,750 CT per SPV. Total group CT 4 × £18,750 = **£75,000**.
- **Counterfactual:** had the same £300,000 aggregate profit been held in ONE company with no associated companies, that company's £300,000 augmented profits would exceed even the un-divided upper limit (£250k), so main rate £75,000 anyway. **In this specific example fragmentation makes no difference**. The lesson: associated-companies divisor bites when individual-SPV profit lands in what would have been marginal-relief band before division but exceeds the divided limit. RUN session shows a second example where fragmentation costs CT (e.g., 4 SPVs each at £40k profit — undivided each would be SPR-only, divided each is mid-band marginal relief).

### Example 5 — Augmented profits via dividend receipt (s.18L)

- **Holding-co structure:** Mawell Holdings Ltd receives a £30,000 dividend from a non-group company (say, a 5% stake in an unrelated trading company). Mawell Holdings's taxable total profits are £40,000 (rental income from its directly-held BTL flats).
- **Augmented profits** for marginal-relief threshold purposes = TTP £40,000 + qualifying exempt distributions from non-group companies £30,000 = **£70,000**.
- £70,000 augmented profits exceed the £50,000 lower limit → marginal relief applies to the £40,000 TTP. The £30,000 dividend is itself CT-exempt (CTA 2009 Part 9A distribution exemption) but it COUNTS for the threshold test.
- Note: distributions from 51%+ group companies are EXCLUDED from augmented profits (s.18L(2)). RUN session cites this exclusion and distinguishes it from non-group dividends.

### §21.A.2 do-not-write GREP CHECK — RUN session must verify NONE of these patterns appear in the draft

1. "19% on first £250k" / "SPR up to £250k" — WRONG (SPR is up to £50k).
2. "25% on profits over £50k" — WRONG (main rate kicks in at £250k; £50k-£250k is marginal-relief band).
3. "19% CGT for companies" — WRONG (no SPR-equivalent for chargeable gains; gains within CT at the operative CT rate).
4. "each SPV gets its own £50k" — WRONG (associated-companies divisor under s.18E + s.18D shrinks each SPV's limit).
5. "dormant counts toward associated" — WRONG (dormant companies excluded from associated-company count where genuinely dormant; verify CTM specific child page for definition).
6. "FA 2014 abolished SPR permanently" — WRONG (FA 2021 reinstated SPR effective 1 April 2023; FA 2014 only abolished the pre-2014 single-rate framework).
7. "26.5% applied as a flat rate" — WRONG (26.5% is the MARGINAL rate on the last pound at top of band, NOT a flat band-rate).
8. "marginal relief is a tax credit" — WRONG (it is a reduction to the main-rate CT computation, not a refundable credit).

## FAQ expansion (RUN session polishes prose; 10-12 FAQs target)

1. **Q: What is corporation tax marginal relief, and what problem does it solve?**
   A: Marginal relief smooths the cliff between the small profits rate (19% on augmented profits up to £50,000) and the main rate (25% on augmented profits above £250,000). Without it, a company crossing the £50,000 threshold by £1 would pay 25% on the full profit instead of 19% — a six-percentage-point jump on every pound. Marginal relief applies between the limits and gives a reduction calculated under CTA 2010 s.18D using the formula F = (U − A) × (N / A) × (3/200), where U is the upper limit (£250,000 for a single company), A is augmented profits, N is taxable total profits, and 3/200 is the standard fraction set by Parliament. The relief reduces the CT bill smoothly across the band.

2. **Q: When did the current framework take effect?**
   A: The Finance Act 2021 inserted the current CTA 2010 ss.18A-S framework, effective for accounting periods beginning on or after **1 April 2023**. Before that, the UK had operated on a single main rate of 19% from 2017 (the original FA 2014 abolition of the pre-2014 SPR + the 2017 flattening removed marginal relief entirely). The post-FA-2021 framework reinstates a structurally different SPR and marginal-relief regime with a divisor mechanic for associated companies. Sessions writing this page must be careful: the FA 2014 abolition was NOT permanent. The current framework is the operative regime from 1 April 2023.

3. **Q: Who qualifies for marginal relief?**
   A: Per CTA 2010 s.18A (which sets the SPR conditions, and by extension informs the s.18B marginal-relief trigger), a company qualifies if it is: (a) UK resident in the accounting period; (b) NOT a close investment-holding company (CIHC) per s.18N; (c) NOT in oil-and-gas ring-fence territory (s.18C, not relevant to property landlords). The augmented profits must exceed the lower limit but not the upper limit. CIHCs are denied SPR and marginal relief and pay the main rate regardless of profit level — this is the most-important exclusion for property-investment companies that have any connected-party lettings.

4. **Q: How do you actually calculate the relief?**
   A: The formula is F = (U − A) × (N / A) × (standard fraction), where U is the upper limit (£250,000 for a single company), A is augmented profits, N is taxable total profits, and the standard fraction is 3/200 for the current framework. Worked example at £100,000 augmented profits: F = (£250,000 − £100,000) × (£100,000 / £100,000) × (3/200) = £150,000 × 1 × 0.015 = £2,250. CT at main rate £100,000 × 25% = £25,000. Less marginal relief £2,250 = £22,750 CT. Effective rate 22.75%. You can verify the calculation using HMRC's own Marginal Relief Calculator at `gov.uk/marginal-relief-calculator`.

5. **Q: What is the 26.5% effective marginal rate I've heard about?**
   A: 26.5% is the MARGINAL rate on the last pound of profit at the upper limit, NOT a flat rate applied across the band. It emerges from the algebra: at the upper limit the marginal-relief reduction extinguishes, so each additional pound of profit attracts the full 25% CT PLUS gives up about 1.5p of relief on the prior profit (the 3/200 standard fraction effect), giving an effective marginal cost of about 26.5p per £1 added at that point. Some commentary loosely refers to the "26.5% band rate" — this is incorrect and is a §21.A.2 do-not-write pattern. The actual EFFECTIVE rates across the band vary: at £50k it's 19%; at £150k it's 24.0%; at £240k it's about 24.94%. The 26.5% is the slope of the cost curve at the top, not a level rate.

6. **Q: How do the limits work for a single-company structure?**
   A: £50,000 lower limit; £250,000 upper limit. Below £50k, all profit attracts SPR 19%. Between £50k and £250k, marginal relief applies. Above £250k, all profit attracts main rate 25%. The £500 difference at the top makes a meaningful CT cost on the last £200k of profit.

7. **Q: How does the associated-companies divisor work for multi-company groups?**
   A: Where the company has one or more associated companies in the accounting period, the lower and upper limits are divided by 1 + N (where N is the number of associated companies). Per CTA 2010 s.18E, a company is associated with another when one controls the other, or both are under the control of the same person or persons. Worked example: 5 commonly-owned SPVs each see lower limit £10,000 (£50k / 5) and upper limit £50,000 (£250k / 5). An SPV with £100k profit would have been mid-band as a single company; in this 5-SPV group it now exceeds the £50k divided upper limit and pays main rate 25% on full profit.

8. **Q: What does "augmented profits" mean, and how can dividends push my company into a higher band?**
   A: Augmented profits per CTA 2010 s.18L = taxable total profits PLUS qualifying exempt distributions received from non-group companies. The CT charge itself is computed on taxable total profits only, but the THRESHOLD TEST uses augmented profits. So a company with £40k of rental profits that also receives a £20k dividend from a non-51% group company has £60k augmented profits — over the £50k lower limit → marginal relief band, even though the actual taxable total profits are only £40k. Distributions from 51%+ group companies are excluded from augmented profits (s.18L(2)).

9. **Q: Who is OUT of marginal relief entirely?**
   A: Three categories: (a) close investment-holding companies (CIHC) per s.18N — typically property-investment SPVs that fail the qualifying-purpose carve-out at s.18N(2) because they have substantial connected-party lettings; (b) ring-fence companies (oil and gas — not relevant to property); (c) non-UK-resident companies on UK profits (special rules apply). Property landlords should focus on (a). The s.18N(2) carve-out for "making investments in land, or estates or interests in land" PROTECTS most arm's-length BTL SPVs; the s.18N(3) connected-tenant exclusion catches the family-let-at-below-market trap.

10. **Q: How do I claim marginal relief on the CT600?**
    A: It is automatic in the CT600 computation — no separate election or claim is needed. HMRC's filing software (and most commercial CT-software) computes the relief based on the augmented profits figure and the associated-companies count you enter. You confirm the associated-companies count for the accounting period (this is the area HMRC most often queries on enquiry — make sure dormant exclusions are correctly applied). You do NOT need a paper claim or written election.

11. **Q: What are the common mis-calculations I should watch for?**
    A: (a) Using TTP instead of augmented profits in the threshold test — common with single-company holders who receive small dividends from minority investments; (b) Forgetting associated companies — typical when running multi-SPV portfolios and not realising siblings under the same individual's control count; (c) Treating 26.5% as a flat rate instead of a marginal slope; (d) Applying the limits without divisor for multi-SPV portfolios — §21.A.2 do-not-write; (e) Assuming dormant companies count toward associated — they are typically excluded where genuinely dormant.

12. **Q: How does this page differ from `corporation-tax-marginal-relief-property-companies`?**
    A: That existing page is the **property-specific application** — it walks through marginal relief in property-SPV worked examples, the CIHC-via-connected-tenant trap, and the multi-SPV-divisor scenario in depth. This page is the **generic UK pillar / explainer** — what is marginal relief, how does the s.18D formula work, who qualifies, who is out, written for a UK-generic audience including non-property businesses and accountants working across sectors. Reading sequence: come to this page if you're researching marginal relief generically; follow the link to the property-specific page for the property-LtdCo worked depth. The two pages are parent-child in the marginal-relief content cluster.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy.
- **Specific over generic.** Named legislation; specific section numbers.
- **No real names.** Anonymised personas (Company A / B / C in examples; or Mawell / Patel surnames).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer.
- **CSS in markdown:** semantic HTML only.
- **FAQs:** 10-14 entries in frontmatter `faqs:` array.
- **Anti-templating:** GENERIC PILLAR framing — mechanic-first explanation. Do NOT collapse into property-specific worked examples (those live on the child page).
- **§21.A.2 GREP discipline:** RUN session greps the draft against ALL 8 do-not-write patterns before commit (listed verbatim in the worked-example block above).
- **Quality bar (six checks).**

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp **§21.A primary**, §21.4 rate-stack, §21.5 CIHC depth).
2. Claim this page in wave tracker.
3. Read this brief.
4. Fetch + read competitor URLs via session-side WebSearch.
5. Read closest-existing: `corporation-tax-marginal-relief-property-companies` (property-application child), `corporation-tax-rates-property-companies-2026-27`, `corporation-tax-vs-income-tax-landlords-2027`.
6. Plan H2 / H3 outline — generic-pillar framing.
7. Verify factual claims per §16.35 (esp. rates from gov.uk; section verbatim from legislation.gov.uk — pre-verified above with quotes for s.18A, s.18E, s.18N).
8. Fetch hero image.
9. Write markdown.
10. Build clean.
11. Six verifications + **§21.A.2 grep check** (8 patterns).
12. Apply redirect repointing if needed.
13. Register in `monitored_pages`.
14. Commit on branch.
15. Fill per-page work-log.
16. Mark `✅ done` in tracker.
17. Append flags.
18. Append discoveries.
19. Claim next page.

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
