# Wave 6 discovery log — Session B

**Created:** 2026-05-23 PM.

Discovery log format (one block per discovery):
```
## D-N {DISCOVERY_TYPE} — {one-line headline}
**Surfaced at:** {timestamp + which page you were writing}
**Detail:** {what you found / what is interesting}
**Recommendation:** {what should happen with it — future wave bucket idea? site-wide back-patch? calculator? component? cross-site link?}
```

Discovery types per NETNEW_PROGRAM §13.4:
- ADJACENT_TOPIC — competitor covers something we do not, not in topic_gaps
- CALCULATOR_IDEA, COMPONENT_IDEA — interactive tool / UI component idea
- EXISTING_PAGE_STALE — existing page with stale figures/framing
- EXISTING_PAGE_LINK_OPPORTUNITY — existing page should link to your new page
- AUTHORITY_GAP — HMRC manual / legislation never cited on our site
- CROSS_NICHE_LINK — opportunity to cross-link to dentists/medical/solicitors/agency
- OTHER — anything else worth recording

Discovery logs are FYI; no action needed at session time. Manager reads at wave end, feeds future waves and Track 2 sweep.

---

(Sessions append discoveries below this line.)

## D-1 AUTHORITY_GAP — TCGA 1992 s.169E (settlor definition) is not cited on any existing Property site page
**Surfaced at:** 2026-05-23 while writing B4 step 7 (statute verification)
**Detail:** A `grep -r "169E" Property/web/content/blog/` finds zero references on the site. s.169E is the operative settlor definition for the entire ss.169B-169G holdover-block regime. Existing trust-related pages (Wave 4 C10, Wave 1 C7) reference "ss.169B to 169G" as a range but do not pinpoint s.169E. This is an authority gap; the same gap exists in most competitor content (older pre-FA-2009 numbering put settlor content elsewhere in s.169G subsections, leading to confusion).
**Recommendation:** B4 introduces s.169E in dedicated H3 + FAQ; future B-cluster pages (B7 especially) should cite s.169E by name when they touch the settlor-interested CGT mechanic, building the site's internal coherence on the correct statute. Manager could also batch-update existing C10 + FIC vs Trust pages at wave merge to pin the s.169E citation.

## D-2 AUTHORITY_GAP — HMRC CG34700 (settlor trusts overview) is not currently cited on any Property page
**Surfaced at:** 2026-05-23 while writing B4 step 7
**Detail:** A `grep -r "CG34700\|cg34700" Property/web/content/blog/` finds zero hits. CG34700 is the HMRC Capital Gains Manual entry-point for settlor-interested trusts and is the canonical HMRC citation for s.169B / s.169F practice. We are missing the authority signal across the entire trust cluster. B4 now cites CG34700 inline; B7 / B2 / B3 should also cite where relevant. Cross-niche dentists/medical/solicitors sites unlikely to need this manual citation (lead-gen sites with simpler tax content) but worth a check at wave end.
**Recommendation:** Use CG34700 as an authority anchor on B7 + B5 + B3 to deepen the cluster's authority signal. Mention to manager as a citation-coverage gap.

## D-3 EXISTING_PAGE_STALE — Wave 4 C10 "frozen until April 2030" is one year behind current gov.uk position (5 April 2031)
**Surfaced at:** 2026-05-23 while writing B4 step 5 (close-existing-pages review)
**Detail:** See F-3 in `wave6_site_wide_flags.md` for full flag detail. Cross-listed here per discovery log discipline. NRB freeze extended one year beyond what C10 currently states.
**Recommendation:** Wave-merge text patch on C10 (two occurrences).

## D-4 ADJACENT_TOPIC — competitor pieces (Mark McLaughlin canonical) treat "settlor as exceptional-hardship beneficiary" cases in depth; site does not address this directly
**Surfaced at:** 2026-05-23 while writing B4 step 4 (competitor fetch)
**Detail:** McLaughlin's canonical settlor-interested piece walks the case-law-driven analysis of contingent-benefit clauses (Rogge case re settlor-paid interest on trustee loan; Kent Settlement case re rent paid to trustees). HMRC's manual at CG34700 onwards takes a hard line. The "case-by-case factual analysis" of contingent-benefit clauses is a substantive sub-topic that we could deepen on a dedicated page (e.g. "What counts as a settlor-interested arrangement: a case-law walkthrough"). B4 addresses this at the FAQ + Crawford-case level but does not walk the case law in detail. Worth considering as a Track 2 deepen-existing-page candidate or future net-new.
**Recommendation:** Track 2 candidate — deepen B4 with a case-law subsection once GSC traffic surfaces. Lower priority than the bucket completion.

## D-5 COMPONENT_IDEA — three-statute-attribution-test interactive checker
**Surfaced at:** 2026-05-23 while writing B4 step 6 (page planning)
**Detail:** The three-statute attribution stack (s.624 / s.169B / s.49(1A)) lends itself to an interactive component: reader inputs their beneficiary class (checkbox: settlor, settlor's spouse, settlor's minor children, settlor's adult children, others), the component returns a three-light verdict (red / amber / green per statute). Would reduce the cognitive load of the cross-statute analysis and could be a strong conversion-trigger feature (high lead-quality readers actively diagnosing their own structure).
**Recommendation:** Wave 7+ component candidate. Manager / dev to scope. Not a blocker for Wave 6 close.

## D-6 AUTHORITY_GAP — HMRC IHTM42254 published practice on "class-membership IS reservation" is not cited on any existing Property page
**Surfaced at:** 2026-05-23 while writing B7 step 4 (HMRC manual fetch)
**Detail:** `grep -r "IHTM42254\|ihtm42254" Property/web/content/blog/` finds zero hits. IHTM42254's load-bearing sentence ("if a settlor transfers property to a discretionary trust of which they are a member of a class of potential beneficiaries, the settlor has reserved a benefit. This applies even if trustees might never actually distribute to the settlor") is the single most important HMRC published statement on the settlor-interest + GROB intersection. We had zero coverage before B7. The same sentence undermines the standard family-friend-solicitor advisory pattern. Other Wave 4 / Wave 2 GROB pages should be retrofitted to cite IHTM42254 at relevant points.
**Recommendation:** Wave-merge: add IHTM42254 citation to Wave 2 A2 GROB walkthrough (in the "trust gifts" or "discretionary class" sub-area). Add to Wave 4 C10 CLT page (in the "settlor-interested exclusion" section). Build cluster authority signal on the manual citation.

## D-7 AUTHORITY_GAP — SI 1987/1130 (Double Charges Relief Regulations) never cited on the site
**Surfaced at:** 2026-05-23 while writing B7 step 7
**Detail:** `grep -r "1987/1130\|Double Charges Relief" Property/web/content/blog/` finds zero hits. The regs are the standard partial-relief mechanism for GROB + lifetime-transfer double-counting on death. Any page that walks GROB on a previously-gifted asset (Wave 2 A2; Wave 4 C3; Wave 4 C10; Wave 6 B5) potentially benefits from a one-sentence reference to SI 1987/1130 Reg 5 or Reg 7, with link forward to B7 for the depth treatment of what relief does and does not cover.
**Recommendation:** Cross-link from existing GROB pages to B7's SI 1987/1130 walkthrough at wave merge.

## D-8 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 2 A2 + Wave 4 C3 + Wave 4 C10 all need link to B7 once merged
**Surfaced at:** 2026-05-23 while writing B7 step 17
**Detail:** B7 is the interaction page across (a) settlor-interest territory and (b) GROB territory. Three existing pages cover one side or the other in isolation. None currently links to a "what about when both apply" treatment because B7 did not exist. At wave merge the manager should add a one-sentence link from each existing page to B7. Reciprocal links from B7 → all three existing pages are already in place.
**Recommendation:** Wave-merge mechanical patches on Wave 2 A2, Wave 4 C3, Wave 4 C10 (one sentence each pointing to B7 for the interaction case).

## D-9 AUTHORITY_GAP — HMRC TSEM9170 (nominee = bare-trustee for income tax) not cited on Property site
**Surfaced at:** 2026-05-23 while writing B6 step 4 (competitor + manual fetch)
**Detail:** `grep -r "TSEM9170\|tsem9170" Property/web/content/blog/` finds B6 only (the page I just wrote). TSEM9170 is the canonical HMRC manual statement that a nominee arrangement is treated as a bare trust for income-tax purposes (and by extension that the rental income from a property held through a nominee company is the beneficial owner's income). Competitor practitioner content blurs the bare-trust vs nominee distinction; HMRC's manual gets it right. The manual citation is load-bearing for B6's "nominee company is a bare trust in corporate clothing" framing and would strengthen any other page touching nominee structures.
**Recommendation:** Wave-merge: consider citing TSEM9170 from existing pages that discuss nominee arrangements (Wave 5 C3 declaration-of-trust, any non-resident-landlord pages discussing UK property held via nominees). Track 2 cluster citation gap.

## D-10 ADJACENT_TOPIC — Saunders v Vautier (1841) rule referenced in B6 but not separately covered anywhere on site
**Surfaced at:** 2026-05-23 while writing B6 step 6 (planning)
**Detail:** The rule in Saunders v Vautier (1841 LR 4 Beav 115) gives an absolutely-entitled beneficiary of full age and capacity the right to call for trust property regardless of the settlor's original wishes. The rule is load-bearing for any structuring decision that uses a bare trust for an under-18 beneficiary (control returns to the beneficiary at age 18; the family should be comfortable with that). B6 references the rule but does not deep-walk it. A separate page could walk the Saunders v Vautier rule + the variant where multiple beneficiaries can collectively wind up the trust + the implications for IIP trusts where the IIP holder can call for capital + how trustees can structure powers to defer past majority within the formal-trust regime. The lever for traffic is "when does my child get the property" parental queries.
**Recommendation:** Track 2 net-new candidate. Add to inter-wave queue.

## D-11 ADJACENT_TOPIC — Register of Overseas Entities (RoE) mechanics
**Surfaced at:** 2026-05-23 while writing B6 step 7
**Detail:** Cross-list of F-13. RoE became live 1 August 2022 with substantial Companies House enforcement activity in 2023-2025. Site has no dedicated mechanics page. Catches overseas individuals using UK corporate vehicles to hold UK property and the related disclosure stack. Likely net-new inter-wave candidate.
**Recommendation:** Wave 7 or 8 candidate under non-resident-landlord / overseas-buyer cluster.

## D-12 COMPONENT_IDEA — three-arrangement structural decision tool
**Surfaced at:** 2026-05-23 while writing B6 step 6 (planning)
**Detail:** Interactive component: reader inputs (i) primary planning goal (IHT mitigation / asset protection / minor-child gift / overseas anonymity / declaration of unequal beneficial share / multi-generational hold), (ii) constraints (acceptable entry IHT? minor-child involved? high-risk profession in beneficiary's life? Land-Registry disclosure tolerance?). Component returns a recommended structure (bare trust / nominee company / formal discretionary trust / IPDI by will / FIC) with confidence rating and a forward-link to the relevant deep-treatment page. High conversion potential because the input fields force the reader to articulate their facts (high-quality lead signal). Pairs with the four-vehicle B1 pillar.
**Recommendation:** Wave 7+ component candidate. Manager / dev to scope. Not a blocker.

## D-13 AUTHORITY_GAP — McCall v HMRC [2009] NICA 12 not previously cited on Property site
**Surfaced at:** 2026-05-23 while writing B8 step 7 (§16.35 verification of s.165 holdover-relief restriction for BTL)
**Detail:** McCall is the Northern Ireland Court of Appeal authority on the s.105 IHT BPR investment-line for caravan-park-with-pitch-fees scenarios, parallel reasoning to s.165 CGT-side investment characterisation. Where B8 cites Pawson v HMRC [2013] for the s.165 investment-line, the McCall reasoning would deepen the citation chain for any future BPR-or-holdover dispute. Currently grep'd zero hits across `Property/web/content/blog/`.
**Recommendation:** Cite McCall alongside Pawson on any future page touching s.165 or s.105 investment-line. Track 2 citation gap.

## D-14 AUTHORITY_GAP — Ingram v IRC [1999] UKHL 47 cited only by Wave 6 pages (B1, B7, B8)
**Surfaced at:** 2026-05-23 while writing B8 step 7
**Detail:** Ingram is the canonical authority for the "share gift is not a gift of property under FA 1986 s.102" position that underpins the FIC-route IHT planning across the cluster. The case is cited by B1 (pillar), B7 (settlor-interest + GROB double-trap), and B8 (FIC route), all from Wave 6. No pre-Wave-6 page on the site cites Ingram. The pre-Wave-6 FIC content (Wave 1 C7, Wave 4 A9, the existing `family-investment-company-property-uk` page) all benefit from a one-sentence citation of Ingram to underpin the share-gift-escapes-GROB position.
**Recommendation:** Wave-merge: add Ingram citation to existing FIC pages (Wave 1 C7, Wave 4 A9, primary FIC explainer). Authority-signal cluster strengthening.

## D-15 ADJACENT_TOPIC — care-home means-test deprivation-of-assets under Care Act 2014
**Surfaced at:** 2026-05-23 while writing B8 step 6 (planning) and step 11 (verification)
**Detail:** B8's five-mistakes section flags the care-home means-test risk under the Care Act 2014 (England) and equivalent legislation in Scotland (Social Care (Self-directed Support) (Scotland) Act 2013), Wales (Social Services and Well-being (Wales) Act 2014), and Northern Ireland (Health and Personal Social Services Order 1972). The deprivation-of-assets rules have no fixed look-back period (unlike the IHT 7-year clock) and frequently bite on elderly-parent gifts. The site has no dedicated coverage of the means-test mechanism. Adjacent to property gifting; likely a net-new inter-wave candidate under elderly-parent estate-planning cluster.
**Recommendation:** Wave 7 or 8 candidate. Pair with a will-trust mechanics page for the same cohort.

## D-16 COMPONENT_IDEA — five-route gift-decision calculator
**Surfaced at:** 2026-05-23 while writing B8 step 6 (planning)
**Detail:** The five-route comparison in B8 (direct gift now / staged / bare trust / FIC / hold to death) lends itself to an interactive calculator. Inputs: property MV, latent gain, parent's age, parent's health proxy (e.g. self-rated 1-5), estate value relative to NRB+RNRB, beneficiary's circumstances. Outputs: Year-0 cost on each of the five routes; expected lifetime tax under survival-probability distribution (e.g. 7-year survival probability based on age + health). High lead-quality potential because inputs force the reader to articulate their facts; output enables the structuring conversation. Pairs with the four-vehicle B1 calculator if also built.
**Recommendation:** Wave 7+ component candidate. Specifically valuable because the Year-0 cost arithmetic in B8 is the kind of static comparison that an interactive tool genuinely improves on.

## D-17 ADJACENT_TOPIC — HICBC interaction with s.629 attribution
**Surfaced at:** 2026-05-23 while writing B9 step 6 (planning)
**Detail:** Parent's "adjusted net income" for High Income Child Benefit Charge purposes under ITEPA 2003 ss.681B-H includes income attributed under ITTOIA 2005 s.629. A parent at £45,000 of employment income who picks up £20,000 of attributed rental income via a parent-route minor-child gift becomes a £65,000 ANI parent, into the £60,000-£80,000 HICBC taper (post-FA 2024 uplift from £50,000-£60,000). Loses ~50% of child benefit. B9 surfaces this in the dedicated FAQ; competitor content largely ignores the interaction.
**Recommendation:** Adjacent topic for a future page; could be incorporated into a "HICBC for landlords" net-new under non-resident-landlord / child-benefit cluster. Pair with the s.629 attribution mechanic for a complete picture.

## D-18 EXISTING_PAGE_LINK_OPPORTUNITY — `section-24-child-benefit-high-income-charge-landlords` should cross-link to B9
**Surfaced at:** 2026-05-23 while writing B9 step 5 (closest-existing review)
**Detail:** Existing site page on Section 24 + child benefit interaction for landlords addresses the HICBC mechanic for direct landlord income but does not surface the s.629-attribution-into-HICBC interaction. B9 covers the s.629 attribution explicitly; the link from the existing page to B9 would surface a meaningful cost line for any parent considering a minor-child property gift.
**Recommendation:** Wave-merge: add a one-sentence forward-link from the existing s.24 + HICBC page to B9 in the "edge cases" or "adjacent income" section.

## D-19 ADJACENT_TOPIC — Scotland age-16 vs rest-of-UK age-18 capacity differences
**Surfaced at:** 2026-05-23 while writing B9 step 6 (planning)
**Detail:** Age of Legal Capacity (Scotland) Act 1991 gives 16-year-olds legal capacity in property matters in Scotland, against age 18 in England and Wales and Northern Ireland. The s.629 attribution rule uses the income-tax definition of "relevant child" (unmarried minor under 18 UK-wide); but the bare-trust legal-title mechanics and the Saunders v Vautier wind-up rule operate at age 16 in Scotland. A bare trust for a 16-year-old Scottish beneficiary therefore reaches the Saunders v Vautier wind-up point at 16, two years before s.629 attribution ceases. The interaction is rarely surfaced and would be useful as a Scotland-specific landlord-gift page.
**Recommendation:** Track 2 candidate. Pair with our existing Scottish LBTT cluster for the Scotland-specific property-investor cohort.

## D-20 AUTHORITY_GAP — HMRC IHTM12000 intestacy index not cited elsewhere on site
**Surfaced at:** 2026-05-23 while writing B10
**Detail:** `grep -r "IHTM12000" Property/web/content/blog/` finds B10 only. The IHTM12000 index is the canonical HMRC entry point for intestacy + IHT analysis. Other inheritance pages (Wave 2 A7, Wave 4 C5, Wave 4 C2) could usefully cross-reference IHTM12000 at the relevant points (executor application paragraph, DoV mechanic paragraph, spouse-exemption paragraph).
**Recommendation:** Wave-merge: add IHTM12000 citation to existing inheritance/IHT pages where the intestacy + IHT interaction surfaces. Cluster authority signal strengthening.

## D-21 ADJACENT_TOPIC — 1975 Act provision-for-family-and-dependants claims procedural depth
**Surfaced at:** 2026-05-23 while writing B10 (unmarried-cohabitant catastrophe section)
**Detail:** B10 surfaces the 1975 Act route for unmarried cohabitants in 1-2 paragraphs (s.1(1)(ba) claim, six-month deadline, discretionary outcome, cost range £30k-£60k, 18-30 month timeline). A dedicated procedural page could walk: claim categories under s.1 (spouse, former spouse, cohabitant, child, person-treated-as-child, person-maintained-immediately-before-death); standing test; "reasonable financial provision" test; the s.2-3 court orders available; the s.4 time-limit and extension jurisprudence; the costs-rules under CPR 57. Adjacent to property estates; would attract distressed-cohabitant cohort traffic.
**Recommendation:** Track 2 net-new candidate. Pair with B10 as the cohabitant-perspective companion.

## D-22 ADJACENT_TOPIC — NCPR 1987 r.22 administrator priority + Grant of Letters of Administration procedural mechanics
**Surfaced at:** 2026-05-23 while writing B10 (administration mechanics section)
**Detail:** B10 covers the NCPR 1987 r.22 priority order at H2 level. A dedicated procedural page could walk the application mechanics: HMCTS portal workflow, IHT400 vs IHT205 selection criteria, supporting evidence requirements, oath / statement-of-truth requirements, renunciation mechanics for higher-priority persons, sealed-copy distribution to banks and Land Registry, fees schedule (£300 from 1 April 2025 + sealed-copy fees). Useful for the executor-cohort doing the administration themselves rather than via a solicitor.
**Recommendation:** Track 2 candidate. Pair with B10 as the procedural-detail companion. May fit the "Landlord Tax Essentials" category better than "Incorporation and Company Structures".

## D-23 COMPONENT_IDEA — intestacy distribution calculator
**Surfaced at:** 2026-05-23 while writing B10 (worked scenarios)
**Detail:** The s.46 + s.47 statutory distribution can be reduced to an interactive calculator. Inputs: estate value, surviving spouse / civil partner Y/N, number of children, number of grandchildren of any predeceased children, surviving parents Y/N, surviving siblings Y/N. Outputs: each surviving relative's absolute or contingent entitlement under the current s.46 + s.47 framework with £322,000 statutory legacy. Pairs with the gov.uk intestacy tool but provides the rental-property-specific arithmetic that gov.uk's tool does not. High lead-quality potential (administrator cohort actively diagnosing a real estate).
**Recommendation:** Wave 7+ component candidate. Specifically valuable because the per-stirpes mechanics in s.47 are confusing to laypeople and an interactive tool clarifies the structure.
