# Property Wave 2 — Session C discovery log (append-only)

Observations that don't require immediate action but feed future waves and the Track 2 sweep over legacy pages. Append-only.

## Categories

- `ADJACENT_TOPIC` — competitor covers something we don't, not in topic_gaps_final.md
- `CALCULATOR_IDEA` — interactive widget worth building (IHT estate calculator, residence-test day-counter, etc)
- `COMPONENT_IDEA` — UI pattern from competitors worth borrowing
- `EXISTING_PAGE_STALE` — existing Property page with stale figures / framings (feeds Track 2 sweep)
- `EXISTING_PAGE_LINK_OPPORTUNITY` — existing page that should link to your new page
- `AUTHORITY_GAP` — HMRC manual / legislation never cited on our site
- `CROSS_NICHE_LINK` — Property topic that bridges to dentists / medical / solicitors / contractors-ir35
- `SERP_FEATURE` — featured snippet / rich answer / knowledge panel competitors win
- `INTERNAL_RESEARCH` — question you couldn't answer with public sources

## Format

```
### [D-N] [YYYY-MM-DD] [CATEGORY] Title
- **Page being worked on:** <slug>
- **Observation:** <text>
- **Why it matters:** <text>
- **Suggested next action:** <text or "no action — observation only">
```

---

### [D-1] [2026-05-22] [CALCULATOR_IDEA] SRT day-counter widget
- **Page being worked on:** leaving-uk-landlord-12-month-pre-departure-checklist (C1)
- **Observation:** Competitor sites (uklandlordtax, landlordstax) describe SRT but none offer an interactive day counter or "what's my likely outcome" tool. A simple widget that takes UK days planned + workdays + ties and returns the SRT outcome would draw traffic on long-tail queries ("am I uk tax resident if I spend X days").
- **Why it matters:** SRT is the single most-searched expat-landlord question. A widget creates featured-snippet-worthy structured output and qualifies the user for the contact form.
- **Suggested next action:** Add to calculators backlog for the post-Wave-2 build-out cycle.

### [D-2] [2026-05-22] [ADJACENT_TOPIC] Pension contribution position after non-residence
- **Page being worked on:** C1
- **Observation:** Tax relief on UK pension contributions ends when you become non-resident, with a £3,600 gross transitional allowance. None of our existing pages cover this specifically for landlord cases, and competitor specialists do not either. Strong content gap for an action-led page sitting between "Leaving the UK" and "pension planning while abroad".
- **Why it matters:** Wealthy expat landlords often want to keep contributing to a SIPP for IHT reasons and discover post-departure that they can't. Single page could rank for the long-tail and route to advisers.
- **Suggested next action:** Candidate for Wave 3 or a "non-resident-specific pension" page; not in topic_gaps_final.md.

### [D-3] [2026-05-22] [EXISTING_PAGE_LINK_OPPORTUNITY] Existing expat-obligations page should link to new C1
- **Page being worked on:** C1
- **Observation:** Existing `uk-property-income-expats-tax-obligations-explained.md` is the descriptive companion; should back-link to C1 as the action-led pillar. Same flag captured as F-2 in wave2_site_wide_flags.md; logged here for the post-wave linking sweep so it isn't lost.
- **Why it matters:** Bidirectional pillar pairing strengthens both pages' topical authority and improves user paths.
- **Suggested next action:** Post-wave manager edit to add the back-link.


### [D-4] [2026-05-22] [ADJACENT_TOPIC] CGT event I1 election guide
- **Page being worked on:** C7 (moving-to-australia-uk-rental-property-tax-pathway)
- **Observation:** Section 104-160 ITAA 1997 CGT event I1 (deemed disposal on ceasing Australian tax residence, with election to defer Australian CGT to actual sale) is a high-stakes Australian-departure decision for the UK-landlord cohort. No competitor specialist covers the election mechanics in any depth; ATO guidance is technical and dispersed. A dedicated "CGT event I1: the deemed disposal election for departing Australian residents with UK property" page would draw long-tail traffic and complement C7.
- **Why it matters:** Many UK landlords on multi-year Australian assignments end up making (or failing to make) the I1 election with five-figure consequences. The decision interacts with the 50% discount denial schedule and the UK NRCGT cycle in ways that competitor sites don't unpack.
- **Suggested next action:** Wave 3 candidate; not in topic_gaps_final.md but earns its place as a 90th-percentile expat-landlord question.

### [D-5] [2026-05-22] [EXISTING_PAGE_LINK_OPPORTUNITY] C6 (Dubai) should back-link to C7 (Australia) for symmetric/asymmetric contrast
- **Page being worked on:** C7
- **Observation:** Same content as F-18; logged here for the post-wave linking sweep so it isn't lost. C7 forward-links to C6 already; C6 has no back-link to C7. Adding the back-link strengthens the "compare your destination treaty type" reader path materially.
- **Why it matters:** Decision-stage readers comparing destination jurisdictions value sibling comparisons more than competitor cards do.
- **Suggested next action:** Wave-2 merge mechanical edit.

### [D-6] [2026-05-22] [COMPETITOR_GAP] No specialist competitor covers temporary resident concession (s.768-910 ITAA 1997) for UK landlords
- **Page being worked on:** C7
- **Observation:** The temporary resident concession is the single biggest tax variable for the UK-on-secondment-to-Australia cohort, often worth four to five figures per year of saved Australian tax for the visa-holder period. Competitor specialists (uklandlordtax, similar) do not cover the concession at all; their pages treat all Australian residence as full-tax residence. Major content gap.
- **Why it matters:** Suggests strong differentiation potential for C7 as it ranks; also suggests a follow-on page on the concession specifically (visa subclasses, spouse-status traps, partial-year arithmetic) for Wave 3.
- **Suggested next action:** Hold for Wave 3 evaluation; check 90-day GSC signal on C7 to confirm demand before committing.

### [D-7] [2026-05-22] [COMPETITOR_GAP] No specialist competitor explicitly maps FIG scope to UK source vs foreign source for property investors
- **Page being worked on:** C8 (non-dom-reform-april-2025-fig-regime-property-investors)
- **Observation:** Competitor coverage of the April 2025 reform (landlordstax.co.uk, ukpropertyaccountants.co.uk, and the major firm websites including some Big 4) typically explains FIG as "no UK tax on foreign income for 4 years" without explicitly carving out UK rental income on UK property. For a property investor specifically, the UK-source vs foreign-source distinction is the most important thing on the page; competitor treatment leaves the reader unclear whether their London BTL is in or out of FIG. C8 leads on this distinction explicitly.
- **Why it matters:** Strong differentiation for C8 as it ranks; suggests a follow-on page on "FIG scope for cross-border portfolios" might earn organic traffic in Wave 3.
- **Suggested next action:** Hold for Wave 3 evaluation; check 90-day GSC signal on C8 to confirm demand before committing.

### [D-8] [2026-05-22] [HOUSE_POSITION_REFINEMENT] §17.6 should be refined to capture Autumn Budget 2024 TRF extension
- **Page being worked on:** C8
- **Observation:** Same content as F-19, logged here for the post-wave house-positions maintenance pass so the refinement isn't lost. §17.6 currently reflects the Spring Budget 2024 design (2 years at 12%); needs to add the third year at 15% per Autumn Budget 2024.
- **Why it matters:** Future Wave 3 / 4 pages referencing the TRF should default to the accurate 3-year schedule.
- **Suggested next action:** Manager refines §17.6 on next house-positions pass.

### [D-9] [2026-05-22] [ADJACENT_TOPIC] FIG personal-allowance surrender cost-benefit calculator
- **Page being worked on:** C8
- **Observation:** The FIG election surrenders the personal allowance (£12,570 in 2026/27) and CGT annual exempt amount (£3,000). For inbound investors with modest foreign portfolios (sub-£25,000 of foreign income), the election is often not worth making. A simple calculator that takes foreign income + UK income + marginal rate and returns "FIG worth it / not worth it / depends on year-5 plan" would draw long-tail traffic.
- **Why it matters:** FIG cost-benefit is the most-asked practical FIG question once eligibility is established. Widget would qualify users for the contact form.
- **Suggested next action:** Add to calculators backlog for post-Wave-2 build-out cycle.

### [D-10] [2026-05-22] [SUBTLE_LANGUAGE] s.10A "5 years or less" includes exactly 5 complete tax years
- **Page being worked on:** C9 (returning-to-uk-after-non-residence-property-portfolio)
- **Observation:** The HMRC CG26540 wording "period of non-UK residence is 5 years or less" is inclusive: exactly 5 complete tax years of non-residence is within s.10A scope; only more than 5 complete tax years escapes. Competitor coverage often paraphrases this as "more than 5 years to escape" or "5 years to escape" interchangeably, creating ambiguity. The Naomi worked example in C9 puts a 5.5-year emigration borderline case on the page to surface the issue: 5 complete tax years (2022/23 to 2026/27) + 2 partial years = 5 complete tax years for the test, which is WITHIN s.10A scope.
- **Why it matters:** Returners planning a disposal in year 4 or 5 of non-residence often miscount the tax-year boundaries and assume they have escaped s.10A when they haven't. The 6th complete tax year is the genuine clean break.
- **Suggested next action:** Consider house position §17.3 refinement to add a worked-example sentence: "a 5.5-year departure-to-return period typically gives 5 complete tax years of non-residence, which is WITHIN s.10A scope".

### [D-11] [2026-05-22] [ADJACENT_TOPIC] Return-year SA timing calculator (Sept return vs April return)
- **Page being worked on:** C9
- **Observation:** A landlord returning in September 2026 vs April 2027 has very different return-year SA experiences: September return triggers split-year case analysis with mid-year accounting; April return aligns with the new UK tax year and avoids the split-year mechanic. The arithmetic difference can be material for s.10A recapture timing (deemed-arising in 2027/28 vs 2028/29) and for FIG election eligibility verification.
- **Why it matters:** Timing-of-return is a planning lever for the typical seconded landlord and competitor coverage does not surface it.
- **Suggested next action:** Wave 3 evaluation; not in topic_gaps_final.md.

### [D-12] [2026-05-22] [EXISTING_PAGE_LINK_OPPORTUNITY] C1 should back-link to C9 (bookend completion)
- **Page being worked on:** C9
- **Observation:** Same content as F-21; logged here for the post-wave linking sweep so it isn't lost. C9 → C1 link is in place; C1 → C9 link is the missing half of the bookend.
- **Why it matters:** Bookend pages are most valuable to readers when bidirectional.
- **Suggested next action:** Wave-2 merge mechanical edit.

### [D-13] [2026-05-22] [COMPETITOR_GAP] No specialist UK property tax site has a substantive indirect-disposal NRCGT page
- **Page being worked on:** C10 (nrcgt-indirect-disposal-property-rich-companies-shares)
- **Observation:** Competitor specialist firms (uklandlordtax, landlordstax, propertytaxsolutions) cover direct-disposal NRCGT but treat indirect disposal as a brief footnote or skip entirely. HMRC's own CG73920+ manual coverage is technical and not user-facing. The 75% / 25% / trading-exemption framework is functionally invisible on the open web in user-friendly form. Strong ranking opportunity for C10 once indexed.
- **Why it matters:** The non-resident SPV-shareholder cohort is small but high-value (HNW investors with offshore-structured UK property holdings). Differentiation potential for C10 is high; suggests potentially a Wave 3 follow-on page on multi-tier SPV exit modelling.
- **Suggested next action:** Hold for Wave 3 evaluation; check 90-day GSC signal on C10 to confirm demand before committing to a multi-tier-exit follow-on.

### [D-14] [2026-05-22] [HOUSE_POSITION_REFINEMENT] §17.4 could add C10 worked-example facts as a worked-example reference
- **Page being worked on:** C10
- **Observation:** §17.4 covers the indirect-disposal regime well at the conceptual level (75% / 25% / 6 April 2019) but lacks an illustrative example showing the magnitude of the rebasing-election impact. The Carla SPV worked example in C10 demonstrates a £146k tax-saving from the Sch 4AA default rebasing election versus the historic-gain alternative on a £1.2m gross gain. A house-position sentence noting "the Sch 4AA rebasing election is typically the most expensive single decision on an indirect-disposal NRCGT computation" would be a useful future-Wave anchor.
- **Why it matters:** Future Wave 3 / 4 pages touching indirect-disposal mechanics should default to flagging the rebasing election; house position is the tie-breaker.
- **Suggested next action:** Manager refines §17.4 on next house-positions pass to add the rebasing-election emphasis.
