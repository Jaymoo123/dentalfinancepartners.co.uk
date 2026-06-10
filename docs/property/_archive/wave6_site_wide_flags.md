# Wave 6 site-wide flags

**Created:** 2026-05-23 PM. Sessions append to this file (NOT to worktree-branch copies, per §16.15).

Flag format (one block per flag):
```
## F-N {FLAG_TYPE} — {one-line headline}
**Session:** A / B / C
**Page:** {slug}
**Surfaced at:** {timestamp + which step of 19-step workflow}
**Detail:** {what is wrong / what needs attention}
**Action proposed:** {session-proposed fix, if any}
**Manager status:** [open / acknowledged / resolved at commit X / deferred to inter-wave queue]
```

Flag types per NETNEW_PROGRAM §13.2:
- HOUSE_POSITION_CONFLICT — competitor evidence contradicts house position
- CANNIBAL — two sibling pages overlap
- INTERNAL_LINK — existing page should link to new page
- SCHEMA — non-default schema type might help SERP
- REDIRECT — redirect action taken or not taken
- POSITIONING — brand / lead-gen positioning question
- BUILD_BLOCKER — build breaking from non-own-page cause
- CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL — also valid
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line.)

## F-1 EXISTING_PAGE_STALE — `extracting-money-from-property-limited-company` cites the wrong Act for the MVL TAAR
**Session:** A
**Page:** A4 (mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment)
**Surfaced at:** 2026-05-23 step 5 (read closest existing pages before writing A4)
**Detail:** `Property/web/content/blog/extracting-money-from-property-limited-company.md` line 38 (FAQ "When does a members' voluntary liquidation make sense as an extraction route?") cites "sections 396B and 404A of the Income Tax Act 2007". This is the wrong-Act drift Stage 2 §16.36 flagged for A4. ITA 2007 s.396B does not exist (404 at legislation.gov.uk). The correct cite is **ITTOIA 2005 s.396B "Distributions in a winding up"**, inserted by FA 2016 with effect from 6 April 2016. Also, "s.404A" appears to be invented; the s.396B TAAR has no statutory companion. Verified at https://www.legislation.gov.uk/ukpga/2005/5/section/396B on 2026-05-23.
**Action proposed:** At wave merge, edit the FAQ to read "section 396B of the Income Tax (Trading and Other Income) Act 2005, inserted by Finance Act 2016 with effect from 6 April 2016". Remove the "and 404A" reference (no such section). This is a pre-Wave-6 stale-cite carry-over; the page was Wave 1 / Wave 4 timeframe and predates Stage 2 drift catches.
**Manager status:** open

## F-2 CROSS_BUCKET_BACKLINK — A4 needs C2 forward-link at wave merge
**Session:** A
**Page:** A4 (mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment)
**Surfaced at:** 2026-05-23 step 17 (after commit bb0f825)
**Detail:** A4's H2 "Distribution in specie of plant fixtures: the capital allowances interaction" forward-links to "our forthcoming balancing-allowance-on-disposal page" (the Wave 6 C2 page). The link target in body text is descriptive prose rather than a `<a href>` because C2's slug is not on-site at A4-write-time. Per §16.32 cross-bucket sequencing: A4 ships first (now done); C2 needs to add an `<a href>` back-link from its CAA Event 8 / s.61 disposal-value section to A4's distribution-in-specie subsection. At wave merge, manager (a) adds an explicit `<a href>` in A4's distribution-in-specie subsection pointing to C2's slug, and (b) confirms C2 has the reciprocal back-link.
**Action proposed:** Wave-merge mechanical patch. The A4 paragraph to amend reads "is on our forthcoming balancing-allowance-on-disposal page" — replace with `<a href="/blog/property-types-and-specialist-tax/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics">our balancing-allowance-on-disposal guide</a>`.
**Manager status:** open

## F-6 INTERNAL_LINK — Wave 1 B7 should back-link to A1 as umbrella multi-year sequencer
**Session:** A
**Page:** A1 (extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27)
**Surfaced at:** 2026-05-23 step 17 (after commit 39c0150)
**Detail:** Wave 1 B7 (`Property/web/content/blog/extracting-money-from-property-limited-company.md`) is the per-route mechanics list (salary, dividend, employer pension, DLA repayment with worked £40k extraction example). It does not currently link to a multi-year sequencer above it. A1 is now that sequencer. Readers landing on B7 looking for multi-year planning context would benefit from a forward link to A1.
**Action proposed:** At wave merge, add one sentence near the opening of B7: "For the multi-year sequencing umbrella above this per-route mechanics list (DLA exhaustion timing, dividend-band cliff planning, founder-age zones), see our <a href='/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27'>extraction sequence pillar</a>."
**Manager status:** open

## F-7 INTERNAL_LINK — Wave 4 A5 should back-link to A1 for the multi-year frame
**Session:** A
**Page:** A1 (extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27)
**Surfaced at:** 2026-05-23 step 17
**Detail:** Wave 4 A5 (`salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md`) is the single-year point-in-time marginal-rate analysis. A1 is the multi-year sequencer above it. A5's opening or closing paragraph should forward-link A1 so readers needing the multi-year frame can navigate without back-tracking.
**Action proposed:** At wave merge, add at the end of A5's opener: "For the multi-year sequencing umbrella above this single-year analysis (DLA exhaustion, dividend-band cliff, founder-age zones), see our <a href='/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27'>extraction sequence pillar</a>."
**Manager status:** open

## F-8 REDIRECT — Legacy `property-company-profit-extraction-salary-vs-dividends` slug should repoint to A1
**Session:** A
**Page:** A1 (extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27)
**Surfaced at:** 2026-05-23 step 12 (Stage 2 brief flagged this; confirmed at write time)
**Detail:** Stage 2 scan of `Property/web/src/middleware.ts` identified existing `property-company-profit-extraction-salary-vs-dividends` slug currently redirecting to the `incorporation-and-company-structures` category page. With A1 now live as the canonical extraction pillar, the legacy slug should redirect to A1 for clearer signal to readers and search.
**Action proposed:** At wave merge, edit `Property/web/src/middleware.ts` line ~110 to repoint `property-company-profit-extraction-salary-vs-dividends` from category-page redirect to A1's full URL `/blog/incorporation-and-company-structures/extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27`.
**Manager status:** open

## F-9 EXISTING_PAGE_STALE (CRITICAL, SITE-WIDE) — s.455 charge rate now 35.75% (not 33.75%) for loans made on or after 6 April 2026
**Session:** A
**Page:** A2 (directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d)
**Surfaced at:** 2026-05-23 step 7 (§16.35 per-write verification on s.455 rate citation in A2)
**Detail:** CTA 2010 s.455 rate is not a fixed percentage. It references "the dividend upper rate specified in section 8(2) of ITA 2007 for the tax year" in which the loan is made. ITA 2007 s.8(2) was substituted by Finance Act 2026 s.4(1)(b) to read "the dividend upper rate is 35.75%", with effect for tax year 2026/27 onwards. Verified at https://www.legislation.gov.uk/ukpga/2007/3/section/8 on 2026-05-23.

**Consequence: s.455 charge rate moved from 33.75% to 35.75% on 6 April 2026**, automatically, by reference. No separate amendment to s.455 was needed.

**Pages and house positions known to carry the stale 33.75% figure:**
- House position §21.1 (DLA mechanics): "s.455 CTA 2010 charge at 33.75% on amounts unpaid 9 months after year-end". Stale for loans made 6 April 2026 onwards.
- A4 §16.35 verification log: lists "s.455 rate 33.75%" as locked.
- Wave 1 B1 / Wave 4 A1 / extracting-money-from-property-limited-company / any other property-site page citing the s.455 rate as a flat 33.75%.

**Action proposed:** At wave merge: (1) update house position §21.1 to read "s.455 CTA 2010 charge at the dividend upper rate per ITA 2007 s.8(2); 33.75% for loans made before 6 April 2026; 35.75% for loans made on or after 6 April 2026 (per FA 2026 s.4(1)(b) substitution of s.8(2))"; (2) sweep all pre-Wave-6 sister pages for "s.455...33.75%" and add a tax-year tag rather than a flat percentage; (3) propagate to Wave 4 A1 (DLA repayment strategy), Wave 1 B1 (DLA mechanics), Wave 1 B7 (extracting-money), Wave 4 A5 (salary-vs-dividends), Wave 6 A1 + A4 brief verification logs.

**Pattern significance:** This is the 11th consecutive Bill-vs-enacted-Act / Wave-of-locked-rate-vs-current-rate drift catch the program has surfaced (§16.27 / §16.30 / §16.35 / §16.38 / §16.40 / §21.4 F-19 / §21.4 F-20). The lesson is consistent: rate-by-reference statutes (s.455 → ITA 2007 s.8(2); s.464A → same) require write-time verification of the referenced rate, not the headline citation. Sessions cannot rely on house position locks for rates that reference other statutes.
**Manager status:** open

## F-10 EXISTING_PAGE_STALE — pre-Wave-6 sister pages likely cite ss.464C / 464D as live anti-bed-and-breakfast rules
**Session:** A
**Page:** A2 (directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d)
**Surfaced at:** 2026-05-23 step 5 (closest-existing review before writing A2)
**Detail:** CTA 2010 Part 10 Chapter 3B (including ss.464C and 464D) was omitted in full by FA 2025 s.81(3)(b)-(4) with effect from 30 October 2024. The omitted sections used to provide the £5,000 30-day repay-and-redraw rule and the £15,000 anti-arrangement rule. Pre-Wave-6 sister pages (Wave 1 B1 DLA mechanics, Wave 4 A1 DLA repayment strategy, possibly Wave 1 B7 extracting-money) likely still describe these as live statutory tests. Any reference to "the 30-day rule" or "£15,000 anti-arrangement test" in DLA-context pages on the property site needs reframing for the post-FA-2025 architecture.
**Action proposed:** At wave merge, search the property content directory for tokens `464C`, `464D`, `30-day rule`, `£15,000.*anti-arrangement`, and reframe each occurrence either as "the now-omitted s.464C 30-day rule" (historical reference) or "the residual s.464A arrangement-benefit charge" (current architecture), depending on context. A2 is the master reference page; sister pages should back-link to A2 for the post-FA-2025 framework.
**Manager status:** open

## F-11 INTERNAL_LINK — DLA mechanics + DLA repayment strategy pages should back-link to A2
**Session:** A
**Page:** A2 (directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d)
**Surfaced at:** 2026-05-23 step 17
**Detail:** Wave 1 B1 (`director-loan-account-property-company-mechanics.md`) and Wave 4 A1 (`btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction.md`) are the entry-mechanics and strategy pages for the DLA cluster. A2 is now the trap-deep-dive sibling. Both upstream pages should pick up a forward-link to A2 so the cluster cross-references properly.
**Action proposed:** At wave merge, add a one-sentence forward-link from B1 + A1 to A2: "For the post-FA-2025 anti-avoidance architecture and the safe-repayment patterns now that ss.464C and 464D are omitted, see our <a href='/blog/incorporation-and-company-structures/directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d'>DLA bed-and-breakfast trap deep-dive</a>."
**Manager status:** open

## F-3 EXISTING_PAGE_STALE — Wave 4 C10 (CLT discretionary trust page) says NRB frozen "until 5 April 2030"; current gov.uk position is 5 April 2031
**Session:** B
**Page:** B4 (settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules)
**Surfaced at:** 2026-05-23 step 5 (read closest existing pages before writing B4)
**Detail:** `Property/web/content/blog/iht-clt-property-discretionary-trust-20-percent-entry-charge.md` H2 "The 10-year periodic charge" paragraph reads "Available NRB at year 10 assumed at £325,000 (NRB frozen until April 2030 per Autumn Budget 2024 extension, may be uprated thereafter)". Current gov.uk IHT thresholds page (https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates) shows NRB "applies from 6 April 2009" through "5 April 2031". The freeze was extended by **one additional year** beyond what C10 assumes. Spring Statement 2025 or Autumn Budget 2024 likely introduced the extension; verified against gov.uk on 2026-05-23. C10's worked Patel year-10 projection is unaffected (still uses £325,000 NRB which is correct for the freeze window) but the calendar-end date in the text is stale by one year.
**Action proposed:** At wave merge, edit C10's text "frozen until April 2030" to "frozen until 5 April 2031" (two occurrences in the page; one in the H2 "10-year periodic charge" paragraph, one in the body about NRB-freeze). Pre-Wave-6 stale-cite carry-over; not a blocker for B4.
**Manager status:** open

## F-4 EXISTING_PAGE_STALE — brief's authority links describe s.169G as "settlor definition"; correct cite is s.169E
**Session:** B
**Page:** B4 (settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules)
**Surfaced at:** 2026-05-23 step 7 (verifying every statutory cite at write time per §16.35)
**Detail:** The Wave 6 B4 brief at `briefs/property/wave6/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules.md` line 79 lists "TCGA 1992 s.169G ('settlor' definition for ss.169B-169D)" in the authority links section. This is incorrect. s.169G's current verbatim text (verified at https://www.legislation.gov.uk/ukpga/1992/12/section/169G on 2026-05-23) is the **'arrangement' definition**: "In sections 169B to 169E 'arrangement' or 'arrangements' includes any scheme, agreement or understanding, whether or not legally enforceable." The **settlor definition** is at **s.169E** (verified at https://www.legislation.gov.uk/ukpga/1992/12/section/169E): "169E Meaning of 'settlor' in sections 169B to 169D and 169G... a person is a settlor in relation to a settlement if (a) he is an individual, and (b) the settled property consists of, or includes, property originating from him." Subsections (2)-(5) of s.169G were omitted by the Finance Act 2009 (effective 13 August 2009); the pre-2009 s.169G held some settlor-related material and older commentary (and presumably the brief's seed source) preserves the misattribution. B4 page addresses this in the body text (dedicated H3 "The s.169E settlor definition (NOT s.169G)") and in the relevant FAQ. Other Wave 6 B-cluster briefs may carry the same error; sessions B7 (which cross-refs ss.169B-169G) should verify before writing.
**Action proposed:** No action needed on B4 itself (page corrects in the body). At wave merge, the brief texts can be updated to swap s.169G → s.169E in any authority-link listings. Also worth checking other Wave 6 briefs for the same artefact.
**Manager status:** open

## F-5 INTERNAL_LINK — existing Wave 4 C10 page (CLT discretionary trust) should link back to B4 once merged
**Session:** B
**Page:** B4 (settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules)
**Surfaced at:** 2026-05-23 step 17
**Detail:** Wave 4 C10's H2 "The settlor-interested trust exclusion" (lines ~110-116 of the C10 markdown) explains the s.169B exclusion in summary and references the drafting fix at a high level. C10 does NOT currently link out to a deeper treatment because B4 did not exist when C10 was written. B4 is now the deeper treatment: three-statute interaction, three worked failure cases, drafting fix, unwinding playbook. C10 readers who are diagnosing whether their structure is caught would benefit from a forward link to B4. Reciprocal link from B4 → C10 is already in place (B4's "Where this page sits..." section + opening paragraph both link to C10).
**Action proposed:** At wave merge, add a one-sentence link in C10's "The settlor-interested trust exclusion" section: "For the deep treatment of the three-statute attribution stack (IT s.624 + CGT s.169B + IHT s.49(1A)) plus the unwinding playbook for trusts already in place, see our companion page <a href='/blog/incorporation-and-company-structures/settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules'>The Settlor-Interested Property Trust Three-Statute Trap</a>."
**Manager status:** open

## F-6 EXISTING_PAGE_STALE — `landlord-capital-allowances-tax-relief` tells residential landlords kitchens and boilers are AIA-claimable
**Session:** C
**Page:** C1 (capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework)
**Surfaced at:** 2026-05-23 step 5 (reading legacy CA cluster before writing C1)
**Detail:** `Property/web/content/blog/landlord-capital-allowances-tax-relief.md` H2 "What Equipment Qualifies for Capital Allowances?" / "Items That Typically Qualify" lists kitchen appliances (fridges, washing machines, dishwashers, cookers), heating systems (boilers, radiators, central heating systems), flooring (carpets, laminate, vinyl), bedroom furniture, electrical systems, bathroom fixtures and garden equipment as qualifying for landlord capital allowances. For an ordinary single-let residential property, none of these qualify under CAA 2001 s.35 (dwelling-house restriction) since 2013 (and arguably since 2008 with the integral features reform). The relief route for like-for-like replacement of domestic items is ITTOIA 2005 s.311A, not capital allowances. The page is broadly the cluster's worst pre-Wave-6 misframing and is on the canonical chain via middleware line 53 (`landlord-capital-allowances-maximizing-tax-relief` → `landlord-capital-allowances-tax-relief`). C1 is the structural replacement.
**Action proposed:** Post-launch hygiene queue. Two options: (a) update middleware lines 53 + new entry to repoint both `landlord-capital-allowances-maximizing-tax-relief` and `landlord-capital-allowances-tax-relief` → C1's canonical slug at `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`; (b) edit the page in place to add the s.35 dwelling-house restriction at the top with a "go to C1 for the current framework" CTA. (a) is the stronger move because the page's worked example ("£15,000 of qualifying equipment ... £6,000 in tax saved") is structurally wrong for residential, not just stale.
**Manager status:** open

## F-7 EXISTING_PAGE_STALE — middleware redirect chain `landlord-capital-allowances-maximizing-tax-relief` → `landlord-capital-allowances-tax-relief` needs repoint to C1 (post-launch)
**Session:** C
**Page:** C1 (capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework)
**Surfaced at:** 2026-05-23 step 12 (redirect overlap assessment)
**Detail:** `Property/web/src/middleware.ts` line 53 carries the legacy redirect `landlord-capital-allowances-maximizing-tax-relief` → `landlord-capital-allowances-tax-relief`. The brief instructs no middleware edit on initial C1 launch (legacy redirect cleanup is post-launch hygiene). At post-launch hygiene, the recommended chain is to repoint both legacy slugs to C1, and additionally consider repointing the six legacy AIA-named pages (`aia-capital-allowances`, `aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords`, `aia-allowance-uk-property-investors`, `what-is-aia-in-tax`, `can-you-claim-aia-on-second-hand-assets`) — these are all pre-FA(No.2)2023 framing and C4 will be the depth replacement for AIA, but C1 is the structural pillar.
**Action proposed:** Post-launch hygiene queue. Owner: manager at wave merge. Decision required: redirect-all-12-legacy-CA-pages-to-C1, or keep some on-site as applied/scenario spokes with updated CTAs to C1. Note C4 (AIA depth) ships in this same wave and is the natural AIA-redirect destination, not C1, for the six AIA-named slugs.
**Manager status:** open

## F-8 EXISTING_PAGE_STALE — SiteHeader sr-only span contains a literal em-dash in template chrome
**Session:** C
**Page:** C1 (capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework)
**Surfaced at:** 2026-05-23 step 11 (six-check verification on built HTML)
**Detail:** The Property site's header chrome includes a screen-reader-only span "Accountants UK [em-dash] Get your property tax sorted" emitted by the brand wordmark/tagline component. The em-dash (U+2014) appears in the built HTML output (offset ~5589 in the rendered C1 page; will appear identically on every page). Per the site-wide no-em-dash discipline (memory: feedback_no_em_dashes), this should be replaced with a comma, middle dot, or full stop. Content pages pass the verification because the rule is on user-facing copy in content; chrome may have been overlooked. Likely location: `Property/web/src/components/brand/BrandWordmarkHomeLink.tsx` or similar SiteHeader-adjacent component.
**Action proposed:** One-line component edit to replace the em-dash. Owner: anyone working on chrome next; this is not a wave-blocker. Suggested replacement: middle dot (·) or comma. C1 itself is unaffected because the em-dash is template, not content.
**Manager status:** open

## F-9 EXISTING_PAGE_STALE — `cgt-commercial-property-different-residential` quotes pre-30-October-2024 non-residential CGT rates (10%/20%)
**Session:** C
**Page:** C2 (balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics)
**Surfaced at:** 2026-05-23 step 5 (reading closest existing pages before writing C2)
**Detail:** `Property/web/content/blog/cgt-commercial-property-different-residential.md` (dated 2026-04-10, pre-Wave-5) opens its first FAQ with "commercial property typically faces lower CGT rates of 10% (basic rate) or 20% (higher rate) compared to residential property's 18%/24% rates". This is wrong as of 30 October 2024: per Finance (No. 2) Act 2024 s.7, the non-residential CGT rates for individuals rose to 18% (basic rate) and 24% (higher rate), aligning them with the residential rates which had already been at those levels (24% upper since 6 April 2024 per FA 2024 s.7). The page's "lower rate on commercial" framing is no longer correct for individuals; the only remaining material rate differential is between individuals (18%/24%) and trusts (24% across the board) and the BADR-eligible 10% (rising to 14% from April 2025 and 18% from April 2026). The page's framing of commercial as advantageous on rate is structurally wrong post-30-October-2024.
**Action proposed:** Post-launch hygiene queue. Page needs a rates rewrite of FAQ 1 + the H2 explaining the rate differential. The BADR-eligibility framing in FAQ 2 ("Can I claim Business Asset Disposal Relief on commercial property?") also needs an update: from April 2025 BADR rate stepped to 14%; from April 2026 BADR rate stepped to 18% per Autumn Budget 2024 announcements. Owner: anyone working on the CGT cluster next.
**Manager status:** open

## F-10 BRIEF_DRIFT — C7 brief framing of HMO shared kitchens/bathrooms/lounges as qualifying "common parts" contradicts HMRC CA11520 + Hora Tevfik FTT 2019
**Session:** C
**Page:** C7 (hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property)
**Surfaced at:** 2026-05-23 step 7 (§16.35 per-write verification of s.35 + s.33A + WebFetch of HMRC CA11520 + Lovell Consulting's Tevfik writeup)
**Detail:** The C7 brief framing differentiator (line 19 of the brief) describes the s.35 common-parts carve-out as reaching "communal kitchens, communal bathrooms, communal lounges, fire-safety equipment, lifts..." in an HMO context. This is wrong on two authorities verified at write time: (a) **HMRC Capital Allowances Manual CA11520** states that an HMO with shared internal facilities is usually a single dwelling-house, and shared parts within it (hallways, stairs, landings, attics, basements) remain part of the dwelling-house — HMRC instructs officers to escalate any contrary claim to the Capital Allowances single point of contact; (b) **Hora Tevfik v HMRC (FTT 2019, TC07129)** confirmed HMRC's position that for an HMO with shared kitchen/bathroom/lounge, those shared rooms are within the single dwelling-house and s.35 bars the claim. The case accepted in principle that TRUE common parts of a multi-occupied building can fall outside s.35 — but the working scope is purpose-built blocks of self-contained flats with shared lobby/staircase/lift/risers, NOT HMOs with shared internal amenities. Tevfik's claim still failed because he couldn't apportion the spend; the burden of proof is on the landlord. C7 page was written to the CORRECT position (the Tevfik + CA11520 framing) rather than the brief's loose framing.
**Pattern significance:** This is a **brief-quality drift** (not a Bill-vs-enacted-Act drift). The brief Stage 2 author appears to have repeated a popular accounting-industry framing without verifying against HMRC's manual position or the Tevfik decision. Three other Wave 6 briefs may carry similar HMO-CA framings (worth a Stage 2 brief audit for C-bucket adjacent topics). The §16.35 per-write verification mandate caught this at write time as designed — without verification, the page would have shipped with the wrong scope and exposed every HMO landlord reader to s.35 challenge on enquiry.
**Action proposed:** No back-patch needed on C7 (page written to correct position). At wave merge, manager (a) updates the C7 brief's framing differentiator to align with the page (for audit-trail integrity); (b) audits the other Bucket C briefs (C1, C8 in particular) for similar HMO communal-amenity claim framings; (c) considers adding a §25.11 sub-position to house_positions.md codifying the HMO vs flats-block boundary explicitly. Also: existing page `Property/web/content/blog/hmo-capital-allowances-multi-tenant-landlords-claim.md` (the legacy predecessor) is the worst pre-Wave-6 misframing in the cluster — its "Items That Typically Qualify" list says kitchen appliances, washing machines, communal furniture, TVs in shared lounges all qualify for HMO landlords. Post-2013 reform (and especially post-Tevfik 2019) these are barred under s.35 for typical HMOs. Recommend post-launch redirect from the legacy slug to C7 plus an in-place rewrite of the legacy page or its deletion.
**Manager status:** open

## F-11 EXISTING_PAGE_STALE — legacy `hmo-capital-allowances-multi-tenant-landlords-claim` tells HMO landlords appliances + bedroom furniture qualify for AIA (wrong per CA11520 + Tevfik)
**Session:** C
**Page:** C7 (hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property)
**Surfaced at:** 2026-05-23 step 5 (closest-existing review before writing C7)
**Detail:** `Property/web/content/blog/hmo-capital-allowances-multi-tenant-landlords-claim.md` lists kitchen appliances (cookers, fridges, dishwashers, microwaves), washing machines + tumble dryers, communal sofas + dining tables, TVs in shared lounges, bedroom furniture (beds, mattresses, wardrobes, desks, office chairs) as qualifying for HMO capital allowances. Under HMRC CA11520 + Hora Tevfik FTT 2019, none of these qualify in a typical HMO (shared kitchen/bathroom HMO) — they are within the single dwelling-house and s.35 bars the claim. The relief route for replacements is ITTOIA 2005 s.311A on a revenue basis. The page is **structurally wrong**, not just stale. It risks every HMO landlord reading it making a s.35-exposed AIA claim. The page also has a stale 2026/27 framing that conflates HMO active-management with commercial characterisation, which is HMRC-policy-specific and does not change s.35.
**Action proposed:** Post-launch hygiene queue. Options: (a) repoint the legacy slug to C7 via middleware (cleanest); (b) edit the legacy page in place to remove the incorrect "Items That Typically Qualify" list and add an explicit s.35 + Tevfik warning section + CTA to C7; (c) delete the page. Option (a) is cleanest because the page's "Items That Typically Qualify" list is the load-bearing content and removing it leaves nothing. The legacy page predates the 2019 Tevfik decision and the post-2013 reform tightening, so the structural error is excusable historically but should not survive into 2026/27 advice. C7 is the structural replacement.
**Manager status:** open

## F-12 CROSS_BUCKET_BACKLINK — A7 ↔ C4 ↔ C5 bidirectional back-patches at wave merge
**Session:** A
**Page:** A7 (multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics)
**Surfaced at:** 2026-05-23 step 17 (after commit 4690351)
**Detail:** A7 forward-links Wave 6 C4 (`aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`) and Wave 6 C5 (`full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`) in its "AIA shared allowance" and "Full expensing intra-group transfer" H2 sections. C4 is now shipped on Session C's branch (per tracker — commit 72f04da). C4's work-log notes it has prose forward-link to A7. C5 is in progress on C-branch. Once C-branch and A-branch merge, the manager should confirm: (a) A7's `<a href>` to C4 resolves to live C4 page; (b) C4 has reciprocal `<a href>` back to A7's "AIA shared allowance" H2 (replacing any prose-only forward-link); (c) C5 on completion picks up the same bidirectional structure with A7. The §16.32 cross-bucket sequencing has worked as designed — both pages shipped without blocking each other, and the back-patch is mechanical at merge.
**Action proposed:** Wave-merge mechanical patches as above. A7's `<a href>` to C4 is already in place pointing to /blog/property-types-and-specialist-tax/aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010; manager confirms resolution. A7's `<a href>` to C5 is already in place; activates when C5 merges.
**Manager status:** open

## F-13 ADJACENT_TOPIC — Register of Overseas Entities (RoE, 1 August 2022) overlap with nominee-route for overseas property buyers
**Session:** B
**Page:** B6 (bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors)
**Surfaced at:** 2026-05-23 step 7 (during §16.35 verification of TRS + Companies House disclosure stack)
**Detail:** B6 references the Register of Overseas Entities at Companies House (effective 1 August 2022 under the Economic Crime (Transparency and Enforcement) Act 2022) as part of the disclosure stack faced by overseas buyers using UK nominee structures. The site does not appear to have a dedicated page on RoE registration mechanics for property holders. With the December 2022 / June 2023 enforcement deadlines now well past and Companies House actively pursuing non-registrants, plus continuing reforms under the Economic Crime and Corporate Transparency Act 2023 (which extended verification requirements), this is plausibly a net-new inter-wave page candidate (overseas-property-investor cohort).
**Pattern significance:** Low-priority surface; not a Wave 6 blocker. B6 handles the RoE reference at a "stack of disclosure obligations" level sufficient for the structural-decision page. A dedicated mechanics page would target a different reader (overseas individual / overseas corporate already buying or holding UK property and grappling with registration).
**Action proposed:** Inter-wave queue. Consider as Wave 7 or 8 candidate under a non-resident-landlord / overseas-buyer cluster.
**Manager status:** open

## F-14 INTERNAL_LINK — Wave 1 B7 should forward-link to A3 as POS depth page
**Session:** A
**Page:** A3 (property-spv-share-buyback-out-of-distributable-reserves-mechanics)
**Surfaced at:** 2026-05-23 step 17 (after commit e6f56dd)
**Detail:** Wave 1 B7 (`Property/web/content/blog/extracting-money-from-property-limited-company.md`) covers the four working extraction routes plus three "Specialist routes" (buyback, capital reduction, MVL) at one-paragraph depth each. B7's buyback paragraph at line 156 reads: "...Investment companies (most BTL SPVs) are not trading and cannot meet this condition. Property development trading companies can sometimes meet it." That paragraph is correct but stops at list level. A3 is now the depth page on the same mechanic. B7 readers who want the procedural mechanics, the worked scenarios, and the s.1033 detail would benefit from a forward link to A3. B7's FAQ at line 35 (5-line buyback Q+A) similarly should pick up an A3 forward-link.
**Action proposed:** At wave merge, add one sentence to B7's line-156 paragraph: "For the depth treatment of the s.1033 trade-benefit gate, the dividend-treatment default, the CA 2006 Pt 18 procedural mechanics, and worked scenarios for both outcomes, see our <a href='/blog/incorporation-and-company-structures/property-spv-share-buyback-out-of-distributable-reserves-mechanics'>property SPV share buyback guide</a>." A similar one-sentence link at the end of the B7 FAQ at line 35 would help with on-page SEO too.
**Manager status:** open

## F-15 INTERNAL_LINK — Wave 6 A4 (MVL, same branch) should pick up explicit href to A3 in the SSE/POS comparison
**Session:** A
**Page:** A3 (property-spv-share-buyback-out-of-distributable-reserves-mechanics)
**Surfaced at:** 2026-05-23 step 17 (after commit e6f56dd)
**Detail:** A4 (MVL, committed bb0f825 earlier on this branch) carries a "Comparison vs SSE-route and POS-route" subsection in its H2 spine item 9. At A4-write-time A3's slug was not yet on-site so A4 referenced POS as prose only. With A3 now on the same branch (commit e6f56dd), A4's comparison section should pick up an explicit `<a href>` to A3 to make the company-lifecycle pair (A3 = per-shareholder POS structural change; A4 = company-exit endpoint) explicit to the reader. Mechanical wave-merge patch; both pages will be live on the same merge commit.
**Action proposed:** At wave merge, edit A4's H2 "POS vs MVL" or comparison subsection (precise location to be confirmed at merge by manager) to replace the prose-only POS reference with `<a href="/blog/incorporation-and-company-structures/property-spv-share-buyback-out-of-distributable-reserves-mechanics">our property SPV share buyback guide</a>`. Reciprocal link from A3 → A4 is already in place in A3's opener and in A3's H2 "POS vs ongoing dividend extraction vs MVL final exit" section.
**Manager status:** open

## F-16 BRIEF_DRIFT — C9 brief misattributes 16% LRR credit rate to CTA 2009 s.1149; correct cite is s.1154
**Session:** C
**Page:** C9 (land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor)
**Surfaced at:** 2026-05-23 step 7 (§16.35 per-write verification on CTA 2009 Part 14 section attributions)
**Detail:** The C9 brief framing differentiator (line 19) describes "**Loss-making companies can surrender for a payable cash credit under CTA 2009 s.1149 at a rate equivalent to 16% of the unrelieved expenditure (so a £100k cleanup spend in a loss-making year yields a £16k payable credit)**". Two drift catches verified at write time against legislation.gov.uk: (a) **the 16% credit rate is at CTA 2009 s.1154 not s.1149**. s.1149 is the additional 50% deduction (which combined with s.1147's standard 100% deduction gives the headline 150% stack). The 16% rate is at s.1154(1) verbatim: "The amount of the land remediation tax credit to which a company is entitled for an accounting period is 16% of the amount of the qualifying land remediation loss for the period." The surrender entitlement is at s.1151; the loss calculation is at s.1152. (b) **The £100k → £16k math is wrong.** The qualifying land remediation loss under s.1152 is the lesser of the unrelieved loss attributable to the LRR deduction or 150% of qualifying expenditure. For £100k spend in a loss-making period: total deduction = 150% × £100k = £150k; QLRL = £150k (assuming the loss is fully attributable to LRR); credit = 16% × £150k = £24k, NOT £16k. The brief's second worked example (£80k spend, £80k × 150% = £120k loss, £120k × 16% = £19,200 credit) uses the CORRECT math, so the brief is internally inconsistent. C9 page uses correct math throughout (£100k spend → £24k credit; £80k spend → £19.2k credit; £180k profit-making spend → £67.5k CT saving via £270k deduction × 25%).
**Pattern significance:** This is a brief-quality drift on statutory section numbers + a downstream math error from following the wrong attribution. Stage 2 brief author appears to have conflated s.1149 (additional 50% deduction) with the cash credit mechanism. The §16.35 per-write verification mandate caught both at write time as designed.
**Action proposed:** At wave merge, manager (a) updates the C9 brief framing differentiator to cite s.1154 correctly and correct the £100k → £24k math; (b) audits whether the misattribution exists in any other published commentary on the property site (LRR is a thin coverage area on the existing site so unlikely, but worth a token-search); (c) considers whether the §16.36 brief-template statutory-citation cross-check gate should explicitly require verification of section attributions for credit-rate provisions (this is the second consecutive Wave 6 C-bucket brief with a section-attribution drift, after C5's non-existent s.45BB drift catch logged at D-10).
**Manager status:** open

## F-17 HOUSE_POSITION_EXTENSION — recommend §25.11 (or new §26) for Land Remediation Relief to anchor inter-wave consistency
**Session:** C
**Page:** C9 (land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor)
**Surfaced at:** 2026-05-23 step 1 (house positions read at session start; §25 covers CAA 2001 but has no LRR sub-position)
**Detail:** The Wave 6 §25 cluster locked on 2026-05-23 covers CAA 2001 capital allowances depth (qualifying activity gateway, P&M, AIA, SBA, FYAs, disposal mechanics, FHL transitional). LRR sits in CTA 2009 Part 14 and is a separate statute. The C9 brief notes this expressly and instructs sessions to lean on the CTA 2009 statutory text + CIRD60000 manual. However, the lack of a locked house position for LRR creates inter-wave consistency risk: a future wave touching brownfield development or contaminated-land issues will need a separate verification pass against legislation.gov.uk; competitor sources may contradict the §25 framing without a house position to anchor on. Sessions cannot easily flag a HOUSE_POSITION_CONFLICT for LRR because there is no locked position to conflict with.
**Action proposed:** At inter-wave queue, manager either (a) extend §25 with a new §25.11 sub-position covering the LRR architecture (150% rate via s.1147 + s.1149; 16% credit at s.1154; s.1150 polluter exclusion; s.1149(3)(b) 1 April 1998 derelict gateway; corporate-only constraint at s.1143; regime-agnostic across residential/commercial), with C9 as the primary cite; (b) create a new §26 dedicated to the CTA 2009 reliefs cluster (LRR + intangibles + R&D + similar) for future expansion; (c) defer until a future wave actually needs the depth and re-verify at that point. Recommended option is (a) for clean integration with the existing C-bucket cluster spine. Locking on §25.11 should reference the legislation.gov.uk text of CTA 2009 ss.1143, 1144, 1147, 1149, 1150, 1151, 1152, 1154 verified on 2026-05-23.
**Manager status:** open

## F-14 INTERNAL_LINK — Wave 4 C4 (mid-life-parent gifting) should back-link to B8 once merged
**Session:** B
**Page:** B8 (gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics)
**Surfaced at:** 2026-05-23 step 17
**Detail:** B8 is the adult-child-receiving-side companion to Wave 4 C4 (`iht-7-year-clock-property-gifting-mid-life-landlord-strategy`, which is parent-side 7-year-clock applied). The two pages address the same gift-event from opposite sides: C4 focuses on the parent's mid-life planning decision; B8 focuses on the five-route decision tree as seen by the receiving family. C4 readers who want to understand the receiving-side mechanics (or who want the FIC / hold-to-death alternatives) benefit from a forward-link to B8. B8 already forward-text-references C4 in the receiving-side framing; the reverse direction is a mechanical add at wave merge.
**Action proposed:** Wave-merge: add a one-sentence forward-link from Wave 4 C4 to B8 in the "alternatives" section (typically the "what if we cannot survive 7 years" sub-area).
**Manager status:** open

## F-15 EXISTING_PAGE_STALE — legacy `cgt-gifting-property-family-members-uk` is base-CGT-mechanic only; misses the five-route structural decision tree
**Session:** B
**Page:** B8 (gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics)
**Surfaced at:** 2026-05-23 step 5 (closest-existing review)
**Detail:** `Property/web/content/blog/cgt-gifting-property-family-members-uk.md` (in "Capital Gains Tax" category) walks the base CGT mechanic on family gifts but does not surface (a) the five-route structural decision tree, (b) the FIC alternative, (c) the hold-to-death-vs-gift-now arithmetic, or (d) the GROB-retained-rent trap. The legacy page reads as a primer; B8 is the structural-decision page that complements it. The legacy page is not factually wrong, but it is structurally incomplete relative to what an investor needs before making a real gift decision.
**Action proposed:** Option (a): rewrite the legacy page to point readers to B8 for the structural-decision angle while retaining the base-mechanic content for the simple "what CGT do I pay" query. Option (b): leave the legacy page as the base-mechanic anchor and add a one-paragraph forward-link to B8 for the decision-tree extension. Option (a) is cleaner but requires a touch on a page outside Wave 6 scope; option (b) is a wave-merge mechanical patch.
**Manager status:** open

## F-18 BRIEF_DRIFT (TRIPLE) - C10 super-deduction clawback brief contained three load-bearing drift catches
**Session:** C
**Page:** C10 (super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021)
**Surfaced at:** 2026-05-23 step 7 (16.35 per-write verification on FA 2021 super-deduction provisions)
**Detail:** The C10 brief framing differentiator contained three drift catches, all verified at write time against legislation.gov.uk:
1. **FA 2021 Sch 9 Part 2 clawback mechanism is wrong section attribution.** The super-deduction clawback is at FA 2021 s.12 (1.3x uplift on 130% main-rate super-deduction) and FA 2021 s.13 (1.0x mechanism on 50% SR allowance). Both sections sit in Part 1 Chapter 2 of FA 2021 dealing with temporary first-year allowances, not a Schedule 9 Part 2. FA 2021 Schedules cover other topics.
2. **1.3x clawback continues to apply on disposal indefinitely is wrong on temporal scope.** Section 12(6) verbatim: "If the disposal event occurs in a chargeable period that commenced before 1 April 2023 the amount of the balancing charge is the amount determined under subsection (3) multiplied by the relevant factor." The 1.3x uplift only applies where the chargeable period of the disposal COMMENCED before 1 April 2023. For most 2026/27 disposals by companies on normal accounting periods (which started after 1 April 2023), the uplift does NOT apply at all. Standard CAA 2001 s.61 1.0x mechanic governs.
3. **Brief worked example 100k integral features super-deducted in 2022 yielding 130k tax-deduction is wrong on two points.** (a) Integral features received the 50% SR allowance at FA 2021 s.9(3), NOT the 130% super-deduction at s.9(2) (s.9(2) was for main-pool plant; integral features are special-rate pool items). So a 100k integral-features spend yielded 50k SR allowance, not 130k super-deduction. (b) The disposal clawback for SR-allowance assets is at FA 2021 s.13 with a relevant factor of 1.0 (NOT 1.3).
**Pattern significance:** This is the third consecutive C-bucket brief with a statutory-citation drift (after C5 s.45BB at D-10 and C9 s.1149 vs s.1154 at F-16). Pattern concentrated in C-bucket because the cluster is brand-new (no prior wave touched CAA depth + adjacent reliefs). The 16.35 per-write verification mandate caught all three at write time as designed.
**Action proposed:** At wave merge, manager (a) updates C10 brief framing to cite FA 2021 s.12 + s.13 correctly, fix indefinitely framing to reflect the s.12(6) gate, and correct integral-features SR vs main-rate distinction; (b) considers Wave 7 audit of any other C-bucket sister briefs or future-wave briefs touching FA 2021; (c) given third C-bucket brief drift pattern, formally proposes a 16.41 lesson on statutory-section attribution drift as a distinct category from rate drift and date drift, with the 16.36 Stage 2 cross-check gate explicitly extended to cover section-number verification.
**Manager status:** open

## [SESSION_C_COMPLETE] All 10 pages shipped on property-wave6-c branch
**Session:** C
**Completion timestamp:** 2026-05-23
**Pages shipped (10 of 10):**
- C1 capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework (c7340f6, ~4900 words, MP 220)
- C2 balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics (d0f2931, 3440 words, MP 223)
- C3 structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward (44b830f, 3264 words, MP 226)
- C4 aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 (72f04da, 3185 words, MP 228)
- C5 full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 (5a85654, 3237 words, MP 231)
- C6 commercial-property-fixtures-claim-s198-election-purchase-mechanics (979f379, 3318 words, MP 233)
- C7 hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property (e7ce1f7, 3376 words, MP 235)
- C8 fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics (f803b4e, 2920 words, MP 238)
- C9 land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor (a5bc4e6, 2962 words, MP 239)
- C10 super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021 (1c64adc, 2561 words, MP 241)

**Totals:** ~33,163 body words; 123 FAQs; monitored_pages IDs 220, 223, 226, 228, 231, 233, 235, 238, 239, 241.

**Build status:** All 10 pages build clean. Final build at C10 commit shows 481 static pages (up from 471 baseline).

**Six-check verification across all 10:** 0 em-dashes; 0 en-dashes; 0 Tailwind utility classes; all metaTitle <=62 chars; all metaDescription <=158 chars; all FAQ counts in target ranges (10-14); all internal links resolve; all body words within (or justified above) brief target ranges per 16.16.

**16.35 drift catches during C7-C10 continuation:**
- C7: HMRC CA11520 + Hora Tevfik FTT 2019 confirm HMO shared kitchens/bathrooms within dwelling-house (brief framing wrong). F-10 + F-11 raised.
- C8: Citation discipline held - FA 2025 Sch 5 NOT FA 2024 Sch 5. Para 18 explicit s.35 carve-out for grandfathered expenditure. No drift catches.
- C9: Brief misattributed 16% LRR credit rate to s.1149 (correct s.1154); 100k to 16k math wrong (correct 24k). F-16 raised. F-17 recommended 25.11 house position extension.
- C10: Triple drift catch (Sch 9 Part 2 should be ss.12/13; 1.3x indefinitely should be only if disposal CP commenced before 1 April 2023 per s.12(6); integral features get SR allowance + s.13 1.0x NOT super-deduction + s.12 1.3x). F-18 raised.

**Brief-drift pattern:** Three consecutive C-bucket briefs (C5, C9, C10) contained statutory-section attribution drifts. Logged at D-10, D-15, F-18. Recommendation: 16.41 lesson on statutory-section attribution drift as distinct category; 16.36 cross-check gate explicit extension to section numbers.

**Cross-bucket sequencing at C-close:** A4 to C2 done (A4 first, C2 cites); A7 to C4 parallel back-patches at merge; A7 to C5 done; B4 + B7 to A10 unblocked (A10 not yet claimed).

**Session C ready for wave-close handover.** No open Q&A from Session C; tracker, flags, discovery log all up-to-date on main via absolute paths per 16.15 + 16.37 discipline.

## F-16 REDIRECT — Legacy `property-company-employer-pension-contributions-directors` should repoint to A5
**Session:** A
**Page:** A5 (property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics)
**Surfaced at:** 2026-05-23 step 12 (Stage 2 brief flagged this; confirmed at write time)
**Detail:** Stage 2 scan of `Property/web/src/middleware.ts` identified existing `property-company-employer-pension-contributions-directors` slug currently routed to the `incorporation-and-company-structures` category page. With A5 now live as the canonical employer-pension-extraction depth page (W&E gateway + post-FA-2024 LSA/LSDBA architecture), the legacy slug should redirect to A5's full URL. The legacy page also carries two material errors (LTA-abolition-date and tapered-AA-threshold conflation) covered in F-17.
**Action proposed:** At wave merge, edit `Property/web/src/middleware.ts` ~line 297 to repoint `property-company-employer-pension-contributions-directors` from category-page redirect to A5's full URL `/blog/incorporation-and-company-structures/property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics`. Optionally remove or archive the legacy page markdown.
**Manager status:** open

## F-17 EXISTING_PAGE_STALE — Legacy pension page carries two material LTA / tapered-AA errors
**Session:** A
**Page:** A5 (property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics)
**Surfaced at:** 2026-05-23 step 5 (read closest existing pages before writing A5)
**Detail:** `Property/web/content/blog/property-company-employer-pension-contributions-directors.md` carries two material errors that A5 supersedes: (a) line 42 reads "The lifetime allowance was abolished in April 2023" — this is wrong; the LTA *charge* was set to nil from April 2023 by FA 2023 s.18 but the LTA framework itself was not abolished. Finance Act 2024 Sch 9 Part 1 was the actual abolition, effective 6 April 2024, replacing the LTA with the LSA (£268,275) and LSDBA (£1,073,100); (b) line 40 reads "If your adjusted income exceeds £200,000, the allowance may be tapered down to a minimum of £10,000" — this conflates the two tapered-AA thresholds; the £200,000 is threshold income, the £260,000 is adjusted income, and BOTH must be exceeded for the taper to apply (per FA 2004 s.228ZA). A reader following the legacy page's guidance would mis-model their tapered AA position.
**Action proposed:** Resolved by F-16 if the legacy page is redirected to A5 (the structural replacement is the cleaner answer than in-place correction). If the legacy page is retained for transitional reasons, fix both errors: (a) "The LTA was replaced by the LSA and LSDBA from 6 April 2024 under FA 2024 Sch 9 Part 1"; (b) "Two thresholds must both be met for the tapered AA to apply: threshold income above £200,000 AND adjusted income above £260,000". Pre-Wave-6 stale-cite carry-over.
**Manager status:** open

## F-18 INTERNAL_LINK — Wave 4 A8 (FIC decumulation) + Wave 2 A9 (pension IHT 2027) should back-link to A5
**Session:** A
**Page:** A5 (property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics)
**Surfaced at:** 2026-05-23 step 17 (after commit 1e673fa)
**Detail:** A5 forward-links Wave 4 A8 (`fic-property-retirement-decumulation-mechanics-uk`) and Wave 2 A9 (`pension-iht-april-2027-landlord-estate-planning`) at the boundary points where accumulation hands off to decumulation and to death-IHT respectively. Neither A8 nor A9 currently back-links to A5 (A5 did not exist at A8/A9 write time). For a reader landing on A8 or A9 who needs the accumulation-phase mechanic, the missing back-link forces a search. Mechanical wave-merge patch.
**Action proposed:** At wave merge, add a one-sentence forward-link from A8 + A9 to A5: "For the accumulation-phase W&E gateway under CTA 2009 s.54 + the post-FA-2024 LSA/LSDBA architecture + worked contribution scenarios, see our <a href='/blog/incorporation-and-company-structures/property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics'>property SPV employer pension contributions guide</a>."
**Manager status:** open

## F-16 EXISTING_PAGE_STALE — site-wide sweep for stale £270,000 statutory legacy figure
**Session:** B
**Page:** B10 (intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough)
**Surfaced at:** 2026-05-23 step 17 (after commit dbaa59d)
**Detail:** The intestacy statutory legacy for a surviving spouse was uplifted from £270,000 to £322,000 by the Administration of Estates Act 1925 (Fixed Net Sum) Order 2023 (SI 2023/758) effective 26 July 2023. Any existing site page referencing the statutory legacy on intestacy that cites £270,000 or an earlier figure is stale by 19% understated. B10 surfaces this explicitly as a drift catch in its dedicated H2. The site-wide sweep at wave merge should grep `Property/web/content/blog/` for `£270,000` and `270,000` (plus older figures `£250,000` and `£125,000`) within intestacy / estate / inheritance context and patch in place. Likely candidates: Wave 2 A7 (general inheritance), Wave 4 C5 (DoV), any IHT-pillar pages discussing the spouse legacy mechanic.
**Action proposed:** Wave-merge mechanical sweep: `grep -rn '270,000\|250,000' Property/web/content/blog/ | grep -iE '(intestacy|statutory legacy|spouse exemption|widow|widower)'` and patch each hit to £322,000 with the SI 2023/758 reference.
**Manager status:** open

## [SESSION_B_COMPLETE] — Wave 6 Bucket B (Trusts + §24.7 + settlements + GROB) all 10 pages shipped
**Session:** B
**Pages:** B1 through B10 on property-wave6-b branch
**Completion timestamp:** 2026-05-23

| # | Slug | Commit | MP ID | Body words |
|---|---|---|---|---|
| B1 | putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack | 6851b1a | 224 | 3,894 |
| B2 | settlements-legislation-s624-s629-property-income-attribution-mechanics | c3dcd30 | 227 | 3,493 |
| B3 | interest-in-possession-iht-treatment-iipi-iht49a-life-tenant-rental-property | 2c11533 | 230 | 2,840 |
| B4 | settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules | 0060cbb | 219 | 5,731 |
| B5 | grob-s102-family-home-shared-occupation-s102b-uk-mechanics | 41614ae | 232 | 3,558 |
| B6 | bare-trust-vs-nominee-company-vs-formal-trust-decision-property-investors | 4c8eb19 | 237 | 4,406 |
| B7 | settlor-interested-property-trust-grob-interaction-double-trap-mechanics | 44d62d5 | 222 | 3,910 |
| B8 | gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics | 600bce5 | 240 | 4,098 |
| B9 | gifting-property-to-minor-children-bare-trust-mechanics-tax-traps | e0f7f1c | 243 | 3,844 |
| B10 | intestacy-mechanics-rental-property-portfolio-no-will-cohort-operational-walkthrough | dbaa59d | 244 | 4,429 |

**Total:** 10 pages, ~40,200 body words, 137 FAQs (~14 per page on average), 23 monitored_pages rows, 6 cross-bucket sequencing constraints honoured.

**Cross-bucket gates:** B4 + B7 shipped early (commits 0060cbb + 44d62d5); A10 (trust-owned SPV extraction) on the A-branch now has its trust-side context citation targets available.

**Flags raised this session:** F-3 (Wave 4 C10 stale NRB freeze date), F-4 (brief authority drift on s.169G vs s.169E), F-5 (Wave 4 C10 → B4 back-link), F-13 (RoE adjacent topic for nominee route), F-14 (Wave 4 C4 ↔ B8 back-link), F-15 (legacy `cgt-gifting-property-family-members-uk` extension), F-16 (site-wide £270,000 → £322,000 stale-cite sweep).

**Discoveries logged:** D-1 to D-23 across the 10 briefs covering AUTHORITY_GAP (TCGA s.169E, HMRC CG34700, IHTM42254, SI 1987/1130 Double Charges Relief, McCall v HMRC, Ingram v IRC, HMRC TSEM9170, IHTM12000), ADJACENT_TOPIC candidates (case-law walkthrough for contingent-benefit clauses, Saunders v Vautier rule, Register of Overseas Entities, care-home means-test, HICBC interaction with s.629, Scotland age-16 vs rest-of-UK age-18, 1975 Act claims procedural depth, NCPR 1987 r.22 mechanics), and COMPONENT_IDEA suggestions (three-statute attribution test, three-arrangement decision tool, five-route gift calculator, intestacy distribution calculator).

**Anti-templating discipline:** 10 pages used 10 distinct framing differentiators. B1 four-vehicle pillar / B2 s.624-vs-s.629 conceptual separation / B3 IIP architecture post-FA-2006 / B4 three-statute trifecta / B5 family-home GROB exits / B6 three-arrangement comparison / B7 settlor + GROB double-trap / B8 five-route decision tree / B9 radical-statutory-frame-difference / B10 statutory-order + administration mechanics. No templating drift detected at the page-3 self-check or at any subsequent point.

**§16.35 per-write verifications honoured:** every numeric tax figure on every page verified against legislation.gov.uk / gov.uk at write time. Key verifications: TCGA s.60 + s.165 + s.17 + s.62 + s.260 + s.286 verbatim; ITTOIA s.620 + s.624 + s.625 + s.626 + s.629 + s.629(3) + s.631 verbatim; IHTA s.43 + s.46 + s.47 + s.49 + s.49(1A) + s.49A + s.71A + s.102/102A/102B + s.142 + new s.48ZA (post-FA-2025); ITA 2007 s.466(3)(b)-(c) + s.467; MLR 2017 reg 45ZA; AEA 1925 s.46 + s.47 as amended by ITPA 2014; AEA (Fixed Net Sum) Order 2023 SI 2023/758 £322,000.

**Critical drift catches honoured:** (1) IHTA 1984 s.48(3)-(3F) OMITTED by FA 2025 s.45 from 6 April 2025; new s.48ZA long-term-resident test used wherever offshore-trust IHT mechanics surfaced; (2) ITTOIA 2005 s.624 (settlor-with-interest) and s.629 (minor-child) maintained as separate statutory mechanisms throughout, never conflated; (3) statutory legacy on intestacy at £322,000 (not £270,000) per SI 2023/758; (4) FHL abolition (FA 2025 Sch 5) closed s.165 holdover for residential lettings; (5) bare trust does NOT escape s.629 income attribution; (6) s.169E (not s.169G) is the settlor definition in TCGA 1992 Pt 5 Ch 5; (7) Pawson investment-line blocks s.165 holdover for BTL; (8) Ingram v IRC share-gifts-escape-GROB position cited consistently.

## F-19 INTERNAL_LINK — Wave 2 C1 (12-month pre-departure checklist) should back-link to A6 as SPV-extraction compressed sequence
**Session:** A
**Page:** A6 (time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window)
**Surfaced at:** 2026-05-23 step 17 (after commit 53d9c56)
**Detail:** Wave 2 C1 (`leaving-uk-landlord-12-month-pre-departure-checklist.md`, in `non-resident-landlord-tax` category) is the broader pre-departure operational checklist for outbound landlords (residence, SRT, lender consent, agent, sell-or-hold). A6 is the SPV-extraction-specific compressed sequence above and below it (DLA-first, dividend-bunching, s.10A / s.812 5-year recapture analysis on the dividend side). A6 forward-links C1 in its opener. C1 currently does not back-link to A6 (A6 did not exist at C1 write time). C1 readers running a property SPV (the dominant cohort C1 was written for) would benefit from a forward-link to A6's compressed-extraction-sequence depth at the point in C1's narrative where SPV-side actions are discussed.
**Action proposed:** At wave merge, add a one-sentence forward-link from C1 to A6 in its "portfolio strategy" or "9-to-6 months out" section: "If your portfolio is held via a property SPV rather than personally, the compressed-extraction-sequence for the SPV side (DLA-first, dividend-bunching, s.10A / s.812 5-year recapture trap) is in our <a href='/blog/incorporation-and-company-structures/time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window'>time-pressure SPV extraction guide</a>."
**Manager status:** open

## F-20 INTERNAL_LINK — Wave 2 A9 (April 2027 pension IHT) should back-link to A6 for terminal-illness compressed-window framing
**Session:** A
**Page:** A6 (time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window)
**Surfaced at:** 2026-05-23 step 17 (after commit 53d9c56)
**Detail:** A6's Scenario B (terminal illness) frames the April 2027 pension IHT pivot as a planning input for diagnoses in mid-2027+ with longer prognoses; pre-April-2027 deaths still benefit from the "use pension last" strategy. A6 forward-links Wave 2 A9 (`pension-iht-april-2027-landlord-estate-planning.md` in `landlord-tax-essentials`). A9 currently does not back-link to A6. Readers landing on A9 thinking about end-of-life pension extraction sequencing would benefit from a forward-link to A6's compressed-timeline applied analysis (W&E gateway on end-of-life contributions, s.415 DLA write-off taboo, IHTA s.18 spouse exemption discipline).
**Action proposed:** At wave merge, add a one-sentence forward-link from A9 to A6: "For the compressed-timeline applied sequence covering terminal-illness SPV extraction (the s.415 DLA write-off taboo, the W&E gateway on end-of-life contributions, the pre/post April 2027 pivot), see our <a href='/blog/incorporation-and-company-structures/time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window'>12-month time-pressure extraction guide</a>." Stack with F-18 (the A5 → A8 + A9 back-patch) at wave merge.
**Manager status:** open

## F-21 BRIEF_DRIFT — A8 brief named SDLTM33500 for Ramsay; that manual page covers partnership transfers, not anti-avoidance
**Session:** A
**Page:** A8 (extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds)
**Surfaced at:** 2026-05-23 step 7 (§16.35 per-write verification on the Ramsay manual citation)
**Detail:** The A8 brief authority list (line 74) cites "[HMRC SDLTM33500 (Ramsay anti-avoidance)](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm33500) — Ramsay framework". WebFetch verification at write time confirms SDLTM33500 is actually titled "Special provisions relating to partnerships: Transfers of a chargeable interest to a partnership Para 10" and covers "Sum of the lower proportions" calculations for partnership transfers, not anti-avoidance. The correct manual for SDLT anti-avoidance / scheme transactions is the **SDLTM09050+ range** covering FA 2003 s.75A, s.75B, s.75C (verified via SDLTM09050 WebFetch as "comprehensive table of contents with 38 linked sections addressing various aspects of the anti-avoidance rule"). The brief's authority misattribution is the third Wave 6 brief-quality drift caught after F-16 (C9 s.1149 vs s.1154) and F-18 (C10 super-deduction triple drift). Page A8 cites the correct SDLTM09050 + FA 2003 s.75A.
**Pattern significance:** Brief-quality drift on HMRC manual page numbers, distinct from rate drift and statutory-section drift but adjacent. The §16.35 per-write verification mandate caught it at write time as designed. **Fourth consecutive brief-quality drift catch across Wave 6** (after C9 s.1154, C10 triple drift, A8 SDLTM09050); brief author appears to be conflating manual-page numbers with adjacent topical sections.
**Action proposed:** At wave merge, manager (a) updates the A8 brief framing differentiator and authority list to cite SDLTM09050+ for s.75A (not SDLTM33500); (b) audits other Wave 6 briefs for SDLT manual-page citations to catch similar drifts; (c) considers extending the §16.36 brief-template statutory-citation cross-check gate to also verify HMRC manual page numbers, since the page-number drift pattern is now repeating across C-bucket and A-bucket briefs.
**Manager status:** open

## F-22 INTERNAL_LINK — Wave 4 A1 (DLA repayment strategy) should back-link to A8 as mid-build precursor
**Session:** A
**Page:** A8 (extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds)
**Surfaced at:** 2026-05-23 step 17 (after commit 539e6fa)
**Detail:** Wave 4 A1 (`btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction.md`) is the post-incorporation extraction strategy page covering DLA mechanics, repayment patterns, and tax-efficient drawdown. A8 is the mid-build precursor: it explains how the DLA credit balance gets created in the first place via the personal-then-sell-to-SPV route. A8 forward-links Wave 4 A1 for the post-creation extraction mechanics. The reverse direction is missing: Wave 4 A1 currently does not back-link to A8 (A8 did not exist at A1 write time). Readers landing on A1 needing the credit-balance-creation upstream context would benefit from a forward-link to A8.
**Action proposed:** At wave merge, add a one-sentence forward-link from Wave 4 A1 to A8 in its opener or in the "where does the DLA credit come from" introductory section: "For the mid-incorporation route that generates the DLA credit balance in the first place (re-mortgage personal property; buy in personal name; sell to SPV at MV; SDLT FA 2003 s.53 binding constraint), see our <a href='/blog/incorporation-and-company-structures/extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds'>mid-incorporation phase-2 extraction guide</a>." Stack with the existing F-11 (Wave 1 B1 + Wave 4 A1 → A2 back-link) batch at wave merge.
**Manager status:** open

## F-23 INTERNAL_LINK — Wave 1 B3 (SSE for property companies) should back-link to A9 as pre-sale-strip companion
**Session:** A
**Page:** A9 (pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount)
**Surfaced at:** 2026-05-23 step 17 (after commit 089f56c)
**Detail:** Wave 1 B3 (`substantial-shareholding-exemption-property-companies.md`) covers the SSE wrapper for corporate-shareholder share sales (TCGA 1992 Sch 7AC). A9 is the pre-sale-cash-strip mechanic that runs upstream of any share sale (SSE-eligible or individual-vendor). A9 forward-links B3 in its "SSE route interaction" section; the reverse link is missing. B3 readers planning a corporate-shareholder SSE-route exit would benefit from a forward-link to A9's cash-strip analysis, especially the cash-left-in route which interacts with the buyer-side post-completion inter-company dividend extraction.
**Action proposed:** At wave merge, add a one-sentence forward-link from B3 to A9 in its planning section: "For the upstream cash-strip mechanic that runs before any share sale (pre-sale dividend, pre-sale pension contribution, cash-left-in separate consideration with s.701 clearance), see our <a href='/blog/incorporation-and-company-structures/pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount'>pre-sale extraction guide</a>."
**Manager status:** open

## F-24 CROSS_BUCKET_BACKLINK — A8 → A9 prose forward-link needs <a href> back-patch at wave merge
**Session:** A
**Page:** A8 (extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds)
**Surfaced at:** 2026-05-23 step 17 (after A9 commit 089f56c)
**Detail:** A8 (committed 539e6fa earlier on this branch) carries two prose-only forward-references to A9 (in the "What happens to the DLA credit if I sell the SPV later?" FAQ and in the "Where this page sits in the bucket" footer). At A8-write-time A9's slug was not on-site so the references are descriptive prose with slug noted, not `<a href>`. With A9 now on the same branch (commit 089f56c), A8's prose references should pick up `<a href>` to A9's slug. Mechanical wave-merge patch; both pages will be live on the same merge commit. Reciprocal direction (A9 → A8) is not required because A9 does not naturally reference A8's mid-incorporation lever.
**Action proposed:** At wave merge, edit A8's prose at the two locations: (1) FAQ "What happens to the DLA credit if I sell the SPV later?" replace "covered in our forthcoming pre-sale extraction page at slug pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount" with `<a href="/blog/incorporation-and-company-structures/pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount">pre-sale extraction page</a>`; (2) footer "Where this page sits in the bucket" replace "the forthcoming pre-sale extraction page (slug pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount, shipping in the same wave on the A-branch)" with `<a href="/blog/incorporation-and-company-structures/pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount">pre-sale extraction page</a>`.
**Manager status:** open

## F-25 EXISTING_PAGE_STALE (CRITICAL, SITE-WIDE) — ITA 2007 s.491 trust standard rate band OMITTED by FA(No.2) 2023 from 6 April 2024; replaced by £500 trust tax-free amount
**Session:** A
**Page:** A10 (directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap)
**Surfaced at:** 2026-05-23 step 7 (§16.35 per-write verification on the trust standard rate band citation)
**Detail:** The A10 brief framing differentiator and authority list cite "ITA 2007 s.491 £1,000 standard rate band" as a load-bearing element of the trust-rate analysis. WebFetch verification at write time against https://www.legislation.gov.uk/ukpga/2007/3/section/491 returned: "Section 491 of the Income Tax Act 2007... no longer has effect... it was omitted from April 6, 2024, by the Finance (No. 2) Act 2023." The £1,000 trust standard rate band has been ABOLISHED for tax year 2024/25 onwards.

**What replaced it:** From 6 April 2024, discretionary trusts get a £500 trust tax-free amount (gov.uk's "trusts and income tax" page verified 2026-05-23: "Most trusts receive a tax-free amount (normally £500)"). Where a settlor has settled 5 or more trusts, the £500 amount is shared down to £100 per trust to prevent fragmentation. The replacement is in Sch 1A ITA 2007 inserted by FA(No.2) 2023; this is not a like-for-like replacement (the £500 is a tax-free amount where the £1,000 was a standard-rate band, taxing the first £1,000 at the basic / dividend ordinary rate rather than at the trust rate).

**Pages and house positions known to carry the stale £1,000 standard rate band figure:**
- A10 brief itself (line 93): explicit cite of "ITA 2007 s.491 — verify exact section at write time".
- Any property-site page covering discretionary trust income tax pre-Wave-6 will likely cite the £1,000 figure.
- House position §22.9 (settlements legislation) does not currently surface the £500 vs £1,000 distinction.
- Wave 6 B4 (settlor-interested trust trifecta) may carry the stale figure on the income-tax side if it pre-dates the verification.

**Action proposed:** At wave merge: (1) update A10 brief to cite the £500 trust tax-free amount post-2024 (not £1,000 standard rate band); (2) sweep all pre-Wave-6 sister pages for tokens "£1,000 trust standard rate band", "trust standard rate band", "ITA 2007 s.491"; reframe each occurrence; (3) add a §22.16 sub-position to house_positions.md explicitly recording the post-FA(No.2)-2023 £500 trust tax-free amount + 5+ trust fragmentation rule; (4) verify Wave 6 B4 + B7 income-tax-side coverage for the same drift; (5) consider whether the §16.36 brief-template statutory-citation cross-check gate should specifically flag rate-band abolitions for confirmation against gov.uk.

**Pattern significance:** This is the **12th+ consecutive Wave 6 Bill-vs-enacted-Act / abolished-section drift catch** (after F-9 s.455 35.75% via FA 2026, F-10 ss.464C/D omitted via FA 2025, F-16 C9 s.1154 cite, F-18 C10 triple drift, F-21 SDLTM page number, plus 6+ Stage 1b + Stage 2 catches). §16.27 / §16.30 / §16.35 / §16.38 / §16.40 / §16.41 pattern is now firmly load-bearing across the program.
**Manager status:** open

## F-26 CROSS_BUCKET_BACKLINK — A10 needs reciprocal back-links from B4 + B7 at wave merge
**Session:** A
**Page:** A10 (directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap)
**Surfaced at:** 2026-05-23 step 17 (after commit 4db7b5c)
**Detail:** A10 forward-links Wave 6 B4 (`settlor-interested-trust-iht-s49-1a-cgt-s169b-property-attribution-rules.md` in `incorporation-and-company-structures`) for the IHT-side and CGT-side of the s.624 attribution rule that A10 walks on the income-tax side. A10 forward-links Wave 6 B7 (`settlor-interested-property-trust-grob-interaction-double-trap-mechanics.md` in `incorporation-and-company-structures`) for the IHT depth on settlor-occupied property where the GROB / s.624 / s.169B triple-trap triggers. A10 also forward-links Wave 6 B1 (`putting-rental-property-into-a-trust-decision-pillar-iht-cgt-sdlt-stack.md`) for the four-vehicle structural choice context. None of B1, B4, B7 currently back-links to A10 (A10 did not exist at B-branch write time). Per §16.32 cross-bucket sequencing: A-branch and B-branch can ship in parallel and manager applies back-patches at wave merge; the seam pages (B-side IHT / A-side extraction) form natural reciprocal pairs.
**Action proposed:** At wave merge, add three reciprocal one-sentence forward-links: (1) B4 → A10 in its closing or "where this page sits" section: "For the income-tax side of the same s.624 / s.629 attribution rule applied to extraction from a trust-owned property SPV (the three-mechanic recalibration of dividend / salary / DLA / pension / buyback / MVL routes), see our <a href='/blog/incorporation-and-company-structures/directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap'>trust-owned SPV extraction page</a>."; (2) B7 → A10 similarly in the structural-failure or unwinding section; (3) B1 → A10 in the four-vehicle decision pillar's discretionary-trust section: "For the operational extraction mechanics once the discretionary trust holds the SPV (trust-rate dividend tax + settlor-attribution + salary-survives-intact), see our <a href='/blog/incorporation-and-company-structures/directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap'>trust-owned SPV extraction page</a>."
**Manager status:** open

## [SESSION_A_COMPLETE] — Wave 6 Bucket A (LtdCo extraction-sequence pillar) all 10 pages shipped
**Session:** A
**Pages:** A1 through A10 on property-wave6-a branch
**Completion timestamp:** 2026-05-23

| # | Slug | Commit | MP ID | Body words |
|---|---|---|---|---|
| A1 | extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27 | 39c0150 | 221 | 3,273 |
| A2 | directors-loan-repayment-bed-and-breakfast-trap-s464c-s464d | 753c523 | 225 | 2,890 |
| A3 | property-spv-share-buyback-out-of-distributable-reserves-mechanics | e6f56dd | 234 | 3,608 |
| A4 | mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment | bb0f825 | 218 | 3,651 |
| A5 | property-spv-employer-pension-contributions-wholly-and-exclusively-test-mechanics | 1e673fa | 242 | 3,343 |
| A6 | time-pressure-extraction-divorce-illness-emigration-sequence-12-month-window | 53d9c56 | 247 | 3,600 |
| A7 | multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics | 4690351 | 229 | 3,417 |
| A8 | extraction-while-incorporating-phase-2-acquisition-funded-by-personal-funds | 539e6fa | 248 | 3,043 |
| A9 | pre-sale-extraction-strip-cash-before-spv-share-sale-vs-buyer-discount | 089f56c | 249 | 2,993 |
| A10 | directors-of-trust-owned-spv-extraction-rules-settlor-interested-trap | 4db7b5c | 250 | 3,324 |

**Total:** 10 pages, 33,142 body words, 130 FAQs (avg 13 per page), 10 monitored_pages rows (218, 221, 225, 229, 234, 242, 247, 248, 249, 250).

**Build status:** All 10 pages build clean. Final A-branch build at A10 commit shows 481 static pages.

**Six-check verification across all 10:** 0 em-dashes; 0 en-dashes; 0 Tailwind utility classes; all metaTitle ≤ 62 chars; all metaDescription ≤ 158 chars; all FAQ counts within 11-14 target ranges; all internal links resolve (cross-bucket B-branch links to B1/B4/B7 will resolve at wave merge per §16.32); all body words within (or justified above) brief target ranges per §16.16.

**Cross-bucket sequencing honoured at A-close:**
- A4 → C2 done (A4 shipped first; C2 cited via prose at A4-time, F-2 back-patch at merge).
- A7 → C4 done (parallel; F-12 bidirectional back-patch at merge).
- A7 → C5 done (parallel; F-12 covers C5 too).
- B4 + B7 → A10 unblocked (B4 + B7 confirmed shipped on B-branch; A10 used `<a href>` cross-branch links because shipping confirmed at write time).
- A8 → A9 done (A8 used prose at A8-time; F-24 back-patch at merge).

**Within-bucket sequencing honoured:**
- A4 SHIPPED FIRST in A-branch (C2 cross-bucket dependency met).
- A7 shipped BEFORE A8/A9/A10 (within-bucket dependency met; A8/A9/A10 all forward-reference A7).
- A10 SHIPPED LAST in A-branch (B4 + B7 gate met).

**Anti-templating discipline:** 10 pages used 10 distinct framing differentiators. A1 multi-year sequencer / A2 post-FA-2025 DLA reframe / A3 POS depth with s.1033(2)(a) trade-benefit failure / A4 MVL CGT-vs-income / A5 W&E gateway for pension / A6 compressed-timeline 3-scenario / A7 HoldCo dividend conduit / A8 mid-incorporation phase-2 / A9 pre-sale TiS spine / A10 trust-overlay 3-mechanic. No templating drift detected at the page-3 self-check or at any subsequent point.

**§16.35 per-write verifications honoured:** every numeric tax figure on every page verified against legislation.gov.uk / gov.uk at write time. Key verifications: CTA 2010 s.455 35.75% rate from 6 April 2026 (via ITA 2007 s.8(2) substituted by FA 2026); CTA 2010 ss.464C/D OMITTED in full by FA 2025 from 30 October 2024; CTA 2009 s.54 W&E test + BIM46035 controlling-director framework; CTA 2010 s.1033(2)(a) trade-benefit gate; ITTOIA 2005 s.396B (NOT ITA 2007) MVL TAAR per FA 2016; FA(No.2) 2023 s.41 spouse NGNL extended window to third tax year; ITTOIA 2005 s.415 + CTA 2010 s.458 DLA write-off mechanics; TCGA 1992 s.10A + ITA 2007 s.812 temporary-non-residence 5-year recapture; FA 2003 s.53 connected-company SDLT MV deeming (NOT Sch 4 para 8); FA 2003 s.75A scheme-transaction anti-avoidance (HMRC SDLTM09050+, NOT SDLTM33500); CA 2006 ss.190-196 substantial property transactions; ITA 2007 ss.682-686 TiS counteraction (with s.686 fundamental-change-of-ownership triple-25% exclusion test); ITA 2007 s.701 30-day clearance windows; ITA 2007 s.479 + s.9 trust rates (39.35% dividend, 45% other, 47% property+savings from 2027/28); **ITA 2007 s.491 trust standard rate band OMITTED by FA(No.2) 2023 from 6 April 2024, replaced by £500 trust tax-free amount (£100 each for 5+ trusts).**

**Critical drift catches honoured / surfaced this session:** F-1 (extracting-money page wrong-Act cite for s.396B); F-2 (A4 → C2 cross-bucket back-patch); F-6 / F-7 / F-11 / F-14 / F-15 / F-18 / F-19 / F-20 / F-22 / F-23 (internal-link forward-patches); F-8 / F-16 (legacy slug redirects); **F-9 (s.455 35.75% rate stale across site, sister page sweep needed)**; **F-10 (ss.464C/D stale across DLA cluster, sister page sweep needed)**; F-12 (A7 ↔ C4 ↔ C5 cross-bucket back-patches); F-17 (legacy pension page LTA + tapered-AA errors); **F-21 (brief drift: SDLTM33500 ≠ Ramsay; correct is SDLTM09050)**; F-24 (A8 → A9 prose-to-href back-patch); F-26 (A10 ↔ B1/B4/B7 cross-bucket back-patches); **F-25 (s.491 trust standard rate band OMITTED, 12th+ consecutive drift catch)**.

**Brief-drift pattern across Wave 6:** Four consecutive A-bucket + C-bucket briefs with statutory-section / HMRC-manual-page attribution drifts caught at write time (C9 s.1149 vs s.1154; C10 FA 2021 ss.12/13 vs Sch 9 Pt 2; A8 SDLTM33500 vs SDLTM09050; A10 s.491 abolished). Recommendation feeds the existing §16.41 lesson on brief-template citation cross-check; manager should consider extending §16.36 brief-template gate to also verify (a) HMRC manual page numbers against current titles, (b) statutory-section identities against current legislation.gov.uk status (not just initial enactment), (c) rate-by-reference statutes against the referenced rate-setting section.

**Discoveries logged:** D-1 to D-26 across the 10 briefs covering AUTHORITY_GAP (ITA 2007 s.812 + ss.682-713 TiS framework + ITA 2007 s.701 clearance + HMRC CTM36340 + Insolvency Act 1986 Pt IV Ch III + HMRC BIM46035 + FA 2003 s.54 s.53 carve-outs); EXISTING_PAGE_STALE (multiple wrong-Act / wrong-section / stale-rate pages flagged for wave-merge sweep); EXISTING_PAGE_LINK_OPPORTUNITY (8 reciprocal-back-link patches); ADJACENT_TOPIC candidates (pre-divorce SPV valuation for matrimonial settlement; HMRC advance-clearance toolkit reference page; Pawson investment-line shared-gate reference page; portfolio-in-distress administration vs CVL vs LPA receivership); COMPONENT_IDEA suggestions (compressed-timeline failure-mode catalogue page); OTHER (workflow lessons + cross-branch link resolution patterns + recurring brief-drift pattern on manual page numbers).

**Session A ready for wave-close handover.** Tracker, flags, discovery log all up-to-date on main via absolute paths per §16.15 + §16.37 discipline. No open Q&A from Session A.

---

## [TRACK 2 POST-WAVE-6 INPUT — TMA 1970 s.43 4-year claim deadline house-position lock recommendation]

**Source:** Track 2 manager (cross-track), 2026-05-24.
**Origin flag:** `track2_site_wide_flags.md` F-10 (raised 2026-05-23 21:00Z during Batch 1 Sub-bucket A drafting of `cgt-property-sold-loss-claim-capital-losses`); reinforced by cross-residual drift audit (commit `7be7cb0`, 2026-05-24).
**Severity:** MEDIUM (gap site-wide on 6 affected pages, but not blocking any in-flight work).

**The gap.** Multiple residual + rewritten CGT pages omit the 4-year claim time limit for capital losses on disposal: **TMA 1970 s.43** + gov.uk/capital-gains-tax/losses verbatim: "you can claim up to 4 years after the end of the tax year that you disposed of the asset". The site's pages routinely conflate (a) the **claim deadline** (4 years after end-of-tax-year of disposal, TMA 1970 s.43) with (b) the **use deadline** (no time limit once a loss is claimed and carried forward) — leaving readers with ambiguous "no time limit on losses" assertions that are technically true for use-after-claim but dangerously incomplete on the claim itself.

**Affected pages identified by cross-residual drift audit (6):**
- 3 residual CGT pages on losses / disposals (within Track 2 Batch 2 + Batch 3 future scope; sub-agents will cite TMA 1970 s.43 directly from legislation.gov.uk in the meantime, per F-10 instruction)
- 3 rewritten 2026-05-21 CGT sibling pages (calculation walkthrough + payment-deadlines canonical + selling-buy-to-let calculation guide) — these would benefit from a one-sentence claim-deadline reminder linking the 4-year claim → no-limit-on-use pattern

**Recommended action (Wave 7+ house position lock, OR standalone hygiene sub-agent dispatch per §16.43 pattern):**
- Add a new sub-section under `house_positions.md` §5 (CGT 2026/27) — proposed `§5.X Capital loss claim mechanics (TMA 1970 s.43)` — locking the verbatim claim-deadline-vs-use-deadline distinction with the canonical four-year-after-end-of-tax-year framing.
- Companion site-wide back-patch on the 6 pages: 1-sentence insertion citing the new §5.X lock (small, mechanical — fits §16.43 sub-agent STALE-sweep dispatch pattern; ~10 minutes manager + ~15 minutes sub-agent run time).

**Why this is Wave-manager-level, not a Track 2 patch:**
Track 2 does NOT lock house positions (per `TRACK2_PROGRAM.md §6` deference rule + `TRACK2_MANAGER_PICKUP.md §1` exception list). Citation fixes (like F-18 Finance Act vs Finance (No.2) Act 2023) are Track 2 manager-callable; new position-shape locks are Wave-manager-callable.

**Verification anchors for the locking manager:**
- legislation.gov.uk: https://www.legislation.gov.uk/ukpga/1970/9/section/43 — TMA 1970 s.43 "Time limit for making claims" (currently in force; verify content at lock time per F-8 statute-content discipline)
- gov.uk consumer guidance: https://www.gov.uk/capital-gains-tax/losses — confirms the 4-year-after-end-of-tax-year framing in plain English

**Status:** open. Awaiting Wave 7+ manager pickup OR a standalone hygiene-batch sub-agent dispatch.
