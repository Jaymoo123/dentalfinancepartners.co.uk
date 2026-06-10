# Wave 5 site-wide flags

Append-only. Each flag uses format `F-N | YYYY-MM-DD HH:MMZ | TAG | session | summary` plus optional sub-bullets.

Tags: HOUSE_POSITION_CONFLICT, CANNIBAL, INTERNAL_LINK, SCHEMA, REDIRECT, POSITIONING, BUILD_BLOCKER, CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL.

---

## F-1 | 2026-05-23 PM | FACTUAL + INTERNAL_LINK | Stage 1 reasoning agent | Existing `section-24-joint-property-ownership-tax-split` page has incorrect Form 17 framing

Pre-Wave-5 discovery — surfaced during Bucket C candidate reasoning against existing on-site joint-ownership inventory.

**Issue:** Existing page `Property/web/content/blog/section-24-joint-property-ownership-tax-split.md` lines 17-19 + 39-43 + 78 state Form 17 lets married couples elect to split income "regardless of actual ownership percentages":
> "Yes, married couples and civil partners can elect to split rental income and expenses 50/50 using Form 17, regardless of actual ownership percentages."
> "The Form 17 election allows married couples to split all income from jointly owned property equally, even if one spouse owns 90% and the other owns 10%."

This contradicts ITA 2007 s.836/837 (the actual rule):
- s.836 default: spousal income on jointly held property is deemed split 50/50.
- s.837 election (via Form 17): elects to actual beneficial interest share, NOT to an arbitrary chosen split. Form 17 requires evidence of actual beneficial ownership (declaration of trust or Land Registry tenants-in-common with declared shares).

The correct framing is preserved in the Wave 3 page `mtd-itsa-jointly-owned-property-threshold-split.md` (lines 30, 36, 42, 46): "Form 17 requires the elected split to match actual beneficial ownership, evidenced by a contemporaneous declaration of trust."

**Action items (manager review per §16.19):**
1. **Back-patch existing page** before or during Wave 5 launch. Rewrite Form 17 framing on lines 17-19 + 39-43 + 78 of `section-24-joint-property-ownership-tax-split.md` to match correct ITA 2007 s.836/837 mechanic.
2. **Lock Form 17 mechanic into house_positions.md** as new sub-section §23 (recommended) in pre-Wave-5 prep. Sessions C will write Wave 5 C-bucket pages against this locked position; new pages will cite §23.
3. **Coordinate with Wave 5 C1** (`form-17-declaration-beneficial-interest-property-mechanics-filing-revocation`): Wave 5 C1 is the dedicated Form 17 mechanic page that closes the Wave 2 Stage 2 AUTHORITY_GAP. Once C1 ships, the back-patched `section-24-joint-property-ownership-tax-split` should cross-link to C1 as the upstream mechanic page.

**HOUSE_POSITION_CONFLICT signal severity:** MEDIUM. Form 17 mechanic is not currently in house_positions.md (no formal locked position contradicted), but §19.4 MTD joint-property discussion implicitly assumes correct Form 17 framing. Wave 5 prep is the right window to lock the position formally.

---

## HOUSE_POSITION_CONFLICT

### F-B7-1 | 2026-05-23 21:30Z | HOUSE_POSITION_CONFLICT | Session B (B7) | §23.5 cites wrong paragraph for Scottish ADS joint-buyer aggregation

§23.5 (Scottish LBTT, ADS, locked 2026-05-23) currently states:

> "Joint buyers: if any joint buyer meets the ADS conditions, ADS applies to the whole transaction (LBTT(S)A 2013 Sch 2A para 4, mirroring SDLT Sch 4ZA para 2(3), see §24.5)."

Per-write verification per §16.35 via WebFetch of legislation.gov.uk/asp/2013/11/schedule/2A at 2026-05-23 (during B7 write) confirms:

- **Sch 2A para 4(2)** is the **8% rate provision** (as amended 5.12.2024).
- **Sch 2A para 5(2)** is the **joint-buyer aggregation rule**: "[the conditions] are satisfied if they are satisfied in relation to any one of, or more than one of, the buyers."

The substantive position in §23.5 is correct (joint-buyer aggregation does mean any joint buyer's existing dwelling triggers ADS on the whole transaction), but the paragraph cite is wrong.

**Action taken in B7:** cites Sch 2A para 5(2) for joint-buyer aggregation throughout the page, including in the dedicated H2 section and in the FAQ. Does NOT cite Sch 2A para 4 for joint-buyer aggregation.

**Suggested action for manager:** in the next house_positions update, correct §23.5 joint-buyer cite from "Sch 2A para 4" to "Sch 2A para 5(2)". The Sch 4ZA para 2(3) SDLT cross-reference cite in the same paragraph appears to be correct (Sch 4ZA para 2(3) is the SDLT joint-buyer aggregation rule), so only the Scottish-side cite needs patching.

**Sessions A and C impact:** none (their buckets do not touch ADS aggregation mechanics). Future Wave 5 Session B pages B8-B10 will use the corrected Sch 2A para 5(2) cite throughout.

Severity: LOW for shipped pages on the program (no on-site Wave 1-4 page cites Sch 2A para 4 for joint-buyer aggregation — Scottish ADS has had zero on-site coverage until this wave); MEDIUM for §23 as a locked house position (the mis-cite reduces confidence in §23.5 if discovered by future readers). Recommend prompt patch.

---

## CANNIBAL

(empty — append as flags arise)

---

## INTERNAL_LINK

(empty — append as flags arise. Note: F-1 above also carries INTERNAL_LINK component for the eventual cross-link from back-patched S24 page to Wave 5 C1.)

## F-2 | 2026-05-23 PM | INTERNAL_LINK | Session A (A1) | landlord-vat-registration-when-required should back-link to A1 on the OTT section

`Property/web/content/blog/landlord-vat-registration-when-required.md` covers OTT at registration depth only (~1 FAQ + 2 paragraphs). Now that A1 (`vat-option-to-tax-commercial-property-mechanics-election-revocation`) is the canonical depth page on the OTT mechanic, the existing page's "The Option to Tax (Commercial Property)" H2 section and the related FAQ should carry an in-body link to A1 for the depth read. A1 already forward-links to the existing page in Related Reading. Suggested action: insert one inline `<a>` link near the end of the existing page's OTT H2 section. Severity: low (no incorrect framing, just missing depth cross-link).

---

## SCHEMA

(empty — append as flags arise)

---

## REDIRECT

(empty — append as flags arise)

---

## POSITIONING

(empty — append as flags arise)

---

## BUILD_BLOCKER

(empty — append as flags arise)

---

## FACTUAL

(F-1 above is the seed entry; append as further flags arise)

## F-3 | 2026-05-23 PM | FACTUAL | Session A (A1) | landlord-vat-registration-when-required imprecise on 80% connected-party rule

Existing `Property/web/content/blog/landlord-vat-registration-when-required.md` describes the connected-party 80% rule as automatic disapplication under VATA 1994 Sch 10 paras 12-17:

> "The option to tax is automatically disapplied (reverting to exempt) where: The tenant is connected to the landlord, AND The tenant is not entitled to recover at least 80% of the VAT it pays. VATA 1994 Sch 10 paras 12-17 set out the detail."

The mechanic is a touch more nuanced. Sch 10 paras 12-17 are the developer "exempt land test" anti-avoidance: option disapplied where the grantor was a developer (or financier or connected occupier) AND the land was expected to be used for non-eligible purposes. The 80% threshold is embedded inside the "eligible purposes" test under Sch 10 para 16 (and the building occupation conditions in para 15A) and is the threshold at which a connected occupier counts as occupying for eligible purposes.

A1 (`vat-option-to-tax-commercial-property-mechanics-election-revocation`) carries the depth treatment ("Developer Anti-Avoidance" H3 + connected-party FAQ), and is forward-linked from the entry-level page. Severity: LOW. The existing page's framing is acceptable for an entry-level VAT registration explanation and is not actively misleading; the deeper mechanic now lives in A1.

Suggested action (low priority, can wait until a future content refresh): replace the existing page's two-line summary of the 80% rule with a one-line pointer to A1 plus a one-line note that the disapplication operates via the exempt-land test rather than as a stand-alone 80%-test rule.

## F-4 | 2026-05-23 PM | HOUSE_POSITION_CORRECTION | Session C (C1) | §24.1 cites ITTOIA 2005 s.282 incorrectly as the property-income parallel for jointly owned dwellings

§24.1 (locked 2026-05-23 today) states:

> "Property income specifically: ITTOIA 2005 s.282, the property-income parallel for jointly owned dwellings, operates the same 50/50 default."

Per-write verification per §16.35 against legislation.gov.uk on 2026-05-23 (during C1 write):

> ITTOIA 2005 s.282 is titled "Assignments for profit of lease granted at undervalue" and deals with the computation of the chargeable receipt where a short lease granted at undervalue is later assigned at a profit. It has no connection to the spouse / civil partner 50/50 income rule.

The operating statutory provision for the 50/50 spouse joint-income default is ITA 2007 s.836 alone. The s.836 rule is general (it applies to all jointly held property income for spouses, including property income) and does not need a property-income-specific parallel. PIM1030 confirms HMRC's working position is grounded in s.836 (not s.282).

**Action taken in C1:** cites only ITA 2007 s.836 and s.837 for the income split rule. Does NOT cite ITTOIA 2005 s.282.

**Suggested action for manager:** in the next house_positions update, remove the second bullet of §24.1 ("Property income specifically: ITTOIA 2005 s.282 ...") and the parenthetical "ITTOIA 2005 s.282 (property-income 50/50 default)" from §24.9 citations. Sister-cite for property-income context if needed is PIM1030, not ITTOIA s.282.

**Sessions A and B impact:** none (their buckets do not touch the s.282 / s.836 area). Future Session C pages C2-C10 will avoid citing ITTOIA 2005 s.282; they will cite ITA 2007 s.836 / s.837 + PIM1030 for the 50/50 rule. C5 and C6 are the most relevant.

Severity: LOW for end-user content (no on-site page cites s.282; the back-patched section-24 cousin already cites s.836). Severity: MEDIUM for §24 as a locked house position; the mis-cite reduces confidence in §24 if discovered downstream. Recommend prompt patch.

## F-5 | 2026-05-23 PM | EXISTING_PAGE_STALE | Session C (C5) | alexander-ene.co.uk civil-partnership pages serve generic homepage content

The Stage-2 verified URLs for the C5 brief (civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality) all returned the alexander-ene.co.uk homepage at fetch time, not the civil-partnership tax articles that the brief described as the strongest competitor coverage:

- `https://www.alexander-ene.co.uk/civil-partnership-tax.htm`
- `https://www.alexander-ene.co.uk/civil-partner-property-tax.htm`
- `https://www.alexander-ene.co.uk/civil-partnership-property.htm`

All three URLs returned the same generic Alexander Ene firm homepage at fetch time on 2026-05-23 PM (during C5 write), despite Stage-2 liveness verification on the same morning. The pattern parallels D-1 (Farnell Clarke redirect) and D-2 (Deloitte taxscape 404) from C1, although in this case the URLs respond 200 rather than redirecting or 404-ing — content has simply been replaced by the homepage.

Operational impact: minimal for C5 write (the ukpropertyaccountants.co.uk fallback URL plus the in-house position in §24 was sufficient to write the page).

Forward note: drop the alexander-ene.co.uk URL set from civil-partner / spouse-mechanics competitor seed lists for future Track 2 sweeps or Wave 6 candidate reasoning. The firm appears to have replaced the article URLs with a homepage redirect or migrated to a new CMS that does not surface the original civil-partnership content. Logged in discovery log as D-5.

Severity: LOW (no on-site content depends on alexander-ene.co.uk citations).

## F-6 | 2026-05-23 PM | INTERNAL_LINK | Session A (A6) | vat-on-new-builds-residential-property should back-link to A6 on the 5% conversion section

Existing `Property/web/content/blog/vat-on-new-builds-residential-property.md` covers the Sch 8 Group 5 Item 1(a) new-build mechanic in depth and touches the 5% conversion rate in one FAQ + one paragraph (around lines 29-30 of the existing file). Now that A6 (`vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate`) is the canonical depth page on the three conversion reliefs (Sch 8 Group 5 Item 1(b) zero-rate + Sch 7A Group 6 + Group 7), the existing page should carry an in-body link to A6 on the 5% conversion paragraph and on the FAQ answer that mentions Group 6/7. A6 already forward-links to the existing new-build page in Related Reading.

Suggested action: insert one or two inline `<a>` links from the existing page's 5% conversion FAQ answer and the conversion paragraph to A6. Severity: LOW (no incorrect framing on the existing page; just missing depth cross-link).

## F-7 | 2026-05-23 PM | INTERNAL_LINK | Session A (A8) | toms-vat-serviced-accommodation should back-link to A8 for 28-day-rule depth

Existing `Property/web/content/blog/toms-vat-serviced-accommodation.md` covers the TOMS framework. Now that A8 (`vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics`) is the canonical depth page on the VATA 1994 Sch 6 paragraph 9 reduced-value rule for long stays, the existing TOMS page should back-link to A8 on any section discussing long-stay treatment or post-Sonder reclassification (operators moving out of TOMS into the standard regime engage the 28-day rule directly). A8 already forward-links to the existing TOMS page bi-directionally. Suggested action: insert one inline `<a>` link near the existing page's long-stay or Sonder section. Severity: LOW.

## F-8 | 2026-05-23 PM | BRIEF_CORRECTION + FACTUAL | Session A (A8) | A8 brief mis-cites VATA 1994 s.50A + Sch 4A para 9 for the long-stay reduced-value rule

The A8 brief (`briefs/property/wave5/vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics.md`) Stage 2 framing differentiator and Authority Links section both cite the long-stay reduced-value rule as "VATA 1994 s.50A combined with Sch 4A para 9" (s.50A is TOMS; Sch 4A is place-of-supply rules).

Per-write §16.35 verification against legislation.gov.uk and Notice 709/3 on 2026-05-23 during A8 write-up confirms the correct statutory anchor is **VATA 1994 Schedule 6 paragraph 9** ("Valuation: special cases"). Paragraph 9(2) provides: "the value of so much of the supply as is in excess of 4 weeks shall be taken to be reduced to such part thereof as is attributable to facilities other than the right to occupy the accommodation." Notice 709/3 confirms the day-29 start, the 20 percent facilities floor, and the actual-value override.

**Action taken in A8:** cites VATA 1994 Sch 6 paragraph 9 throughout. Does NOT cite the brief's incorrect "s.50A + Sch 4A para 9" reference.

**Suggested action for manager:** (1) patch the A8 brief at `briefs/property/wave5/vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics.md` to replace the Sch 4A para 9 reference with Sch 6 para 9; (2) audit any other Wave 5 / Wave 6 briefs in the VAT-accommodation area to ensure the same mis-cite has not propagated; (3) consider locking the Sch 6 para 9 reference in a Notice 709/3 section of house_positions.md so future briefs in the area carry the correct anchor.

**Cross-bucket impact:** none directly (Bucket B and Bucket C do not touch hotel-accommodation VAT). The Sonder Europe UT 2025 citation in the brief is correct.

Severity: MEDIUM for accuracy of any future page generated from the same brief without per-write verification; LOW for A8 itself (caught and corrected at write time per §16.35).

## F-9 | 2026-05-23 PM | BRIEF_CORRECTION + FACTUAL (significant) | Session A (A9) | A9 brief asserts a cladding-remediation VAT zero-rate that does not exist

The A9 brief (`briefs/property/wave5/vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics.md`) framing differentiator states:

> "HMRC has confirmed a zero-rating treatment for qualifying remediation works on residential buildings ≥ 11 metres where the remediation is to remove or replace combustible cladding"

and references "Sch 8 Group 5 Item 4A". The slug suffix "section-30a-mechanics" implies a statutory section 30A that does not exist in any of VATA 1994, Building Safety Act 2022, or related construction-VAT statutes.

Per-write §16.35 verification at write time confirms:
- VAT Notice 708 contains NO dedicated section on cladding remediation (confirmed via direct fetch and search at write time on 2026-05-23)
- VATA 1994 Sch 8 Group 5 has NO Item 4A creating a cladding-remediation zero-rate
- Cladding remediation on existing residential buildings is **standard-rated at 20 percent** by default
- The only zero-rate route is the Notice 708 paragraph 3.3.3 snagging rule (continuation of original new-build contract by the original contractor) — narrow and rarely applicable to post-Grenfell retrofit programmes
- Building Safety Act 2022 Schedule 8 provides leaseholder cost-protection (qualifying leaseholders pay nothing for cladding works, paragraph 8 absolute carve-out) but does NOT create a VAT relief

**Action taken in A9:** page reframed to set out the actual VAT position. Title is "Cladding Remediation VAT: The Standard 20%, the Snagging Exception, and the Building Safety Act Waterfall". Editorial note explicitly flags the §16.35 catch. Content emphasises the absence of a cladding-VAT relief and explains the BSA 2022 cost-bearing framework. The page does NOT propagate the brief's incorrect "relief" framing.

**Suggested action for manager:**
1. Patch the A9 brief framing differentiator at `briefs/property/wave5/vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics.md` to remove the incorrect zero-rating assertion and the "Item 4A" reference.
2. Audit Stage 2 brief generation for any other VAT-relief assertions that may have been made without statutory verification.
3. Consider locking a "no general cladding-remediation VAT relief exists in current UK statute" position in house_positions.md to prevent future drift.
4. Strongly consider adding a "statutory-citation cross-check" gate to the Stage 2 manager-review protocol per D-21 process-improvement note.

**Cross-bucket impact:** none directly (Buckets B and C do not touch cladding-VAT). However, this is the second §16.35 brief-correction catch in Bucket A (F-8 was Sch 4A para 9 -> Sch 6 para 9 on A8; F-9 is the more significant assertion-of-a-relief-that-does-not-exist on A9). Pattern suggests Stage 2 statutory-verification protocol needs strengthening before Wave 6.

Severity: HIGH for accuracy if the brief's framing had been propagated into the page as written; LOW for A9 itself (page corrects the framing and provides accurate practitioner-facing content). The page commits the freeholder to budgeting at 20 percent VAT rather than budgeting at zero — a £400k difference on a £2m programme is material.

## F-10 | 2026-05-23 PM | INTERNAL_LINK | Session A (A10) | landlord-vat-registration-when-required should back-link to A10 as the upstream classification framework

Existing `Property/web/content/blog/landlord-vat-registration-when-required.md` is the operational when-must-you-register page. Now that A10 (`vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework`) is the canonical umbrella decision-framework page for the per-stream VAT classification question (what VAT treatment applies to my rent before the registration question arises), the existing page should back-link to A10 near the opening as the upstream classification framework. A10 forward-links to the existing page in its registration H2 and in Related Reading. Suggested action: insert one inline `<a>` link near the existing page's opening summary (after the "Residential rental income is VAT-exempt..." line) pointing to A10 for the full per-stream framework. Severity: LOW. This pair (A10 + existing landlord-VAT-registration) closes the cluster cleanly: A10 is upstream classification, existing is operational registration mechanic.

## [SESSION_A_COMPLETE] | 2026-05-23 PM | Session A | All 10 VAT topical-gap pages shipped (A1-A10)

All 10 Session A pages (A1 to A10) are committed on branch `property-wave5-a`. Cumulative branch state on completion:

- A1 (17eee6b): vat-option-to-tax-commercial-property-mechanics-election-revocation, 3,158 body words
- A2 (258c92d): vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics, 2,926 body words
- A3 (11ff4e9): vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method, 2,843 body words
- A4 (01af8ef): vat-mixed-use-property-purchase-residential-commercial-element-apportionment, 2,517 body words
- A5 (c7c0544): vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages, 2,830 body words
- A6 (cd62712): vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate, 2,797 body words
- A7 (8f058c8): vat-developer-pre-registration-input-tax-recovery-property-development-projects, 2,615 body words
- A8 (b764192): vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics, 2,646 body words
- A9 (dae3b8c): vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics, 2,578 body words
- A10 (31b1b03): vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework, 3,163 body words

Cumulative: ~28,073 body words across the 10 pages, 121 FAQs total, all within the 2,500-3,500 / 10-14 per-page bars (except A4 at 2,517 and A9 at 2,578 which are at floor; padded where below floor at write time).

**Flags raised by Session A across the bucket:**
- F-2 (INTERNAL_LINK, A1): existing landlord-vat-registration page should back-link to A1 on OTT section
- F-3 (FACTUAL, A1): existing landlord-vat-registration imprecise on 80% connected-party rule (low priority)
- F-6 (INTERNAL_LINK, A6): existing vat-on-new-builds page should back-link to A6 on 5% conversion section
- F-7 (INTERNAL_LINK, A8): existing TOMS page should back-link to A8 for 28-day rule depth
- F-8 (BRIEF_CORRECTION, A8): A8 brief mis-cited Sch 4A para 9; correct anchor is Sch 6 para 9 (caught at §16.35 per-write)
- F-9 (BRIEF_CORRECTION + FACTUAL significant, A9): A9 brief asserted a cladding-remediation VAT zero-rate that does not exist in statute or HMRC guidance; page reframed to actual position (caught at §16.35 per-write)
- F-10 (INTERNAL_LINK, A10): existing landlord-vat-registration page should back-link to A10 as upstream classification framework

**Manager actions pending at bucket-merge:**
1. **Brief corrections (F-8 + F-9).** Patch the A8 brief (Sch 4A para 9 → Sch 6 para 9) and the A9 brief (remove incorrect zero-rate assertion + Item 4A reference) before any future content generation from these briefs. Audit other Wave 5/6 briefs in the VAT-accommodation and cladding areas for similar mis-citations.
2. **Process improvement (D-21 + D-23).** Consider adding a "statutory-citation cross-check" step to the Stage 2 manager-review protocol per the §16.35 catches in F-8 and F-9. Two consecutive brief mis-citations in one bucket suggests the Stage 2 brief-generation pipeline may need strengthening on statutory verification before Wave 6.
3. **House position locks.** Consider locking in house_positions.md: (a) the absence of a general cladding-remediation VAT relief (so future briefs do not re-assert one); (b) the Notice 709/3 Sch 6 para 9 long-stay reduced-value rule (so the F-8 mis-citation does not recur).
4. **Existing-page back-links (F-2 + F-3 + F-6 + F-7 + F-10).** Insert in-body forward links from five existing on-site pages to the appropriate Wave 5 A-bucket depth pages at bucket-merge.

**Cross-bucket lessons noted from Sessions B and C during Session A work:**
- Session C's parallel pattern of catching brief mis-citations (F-4 ITTOIA s.282) reinforces that per-write §16.35 verification is now the most reliable backstop against brief-generation drift, and Stage 2 statutory verification is genuinely necessary as a Wave 6 process improvement.
- Session B's F-marker for B5 BRIEF_ERROR (LTTA 2017 s.34 → TCMA 2016 s.41) is a third independent confirmation of the same brief-quality pattern across all three buckets in this wave.

Session A ready for manager review + bucket-merge to main.

## [SESSION_C_COMPLETE] | 2026-05-23 PM | Session C | All 10 Form 17 + joint-ownership + spouse-mechanics pages shipped

All 10 Session C pages (C1 to C10) are committed on branch `property-wave5-c`. Cumulative branch state on completion:

- C1 (b8fcc81): form-17-declaration-beneficial-interest-property-mechanics-filing-revocation, 3,445 body words
- C2 (9747b13): joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords, 3,147 body words
- C3 (c2b6d5d): declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17, 2,879 body words
- C4 (4de4af0): unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision, 2,525 body words
- C5 (47a3ee7): civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality, 3,146 body words
- C6 (ea286ef): unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share, 2,805 body words
- C7 (1badb93): cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics, 2,611 body words
- C8 (a69617a): iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt, 2,563 body words
- C9 (45f8f53): second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules, 2,597 body words
- C10 (df4cc79): retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure, 2,693 body words

Cumulative: ~28,400 body words across the 10 pages, 138 FAQs total, all within the 2,500-3,500 / 10-14 per-page bars.

**Flags raised by Session C:**
- F-4 (HOUSE_POSITION_CORRECTION): §24.1 ITTOIA 2005 s.282 mis-cite as the property-income parallel for jointly owned dwellings. Recommend remove from §24.1 + §24.9 at next house_positions update.
- F-5 (EXISTING_PAGE_STALE): alexander-ene.co.uk URL set (civil-partnership, unmarried-couples, IHT-jointly-owned, retirement-planning, SDLT-on-second-properties) serves generic homepage content. Recommend drop from Property competitor seed lists.

**Manager actions pending at bucket-merge:**
1. **§16.32 forward-link hyperlinks in C9.** C9 (SDLT spousal aggregation) contains plain-text forward-link references to B2 (Welsh LTT higher rates) and B7 (Scottish ADS) at the time of writing. Once B2 + B7 are committed on Session B's branch, the manager should insert hyperlinks in C9's "Welsh LTT equivalent" and "Scottish ADS equivalent" sections.
2. **§16.32 forward-link hyperlink in C5.** C5 (civil partnerships Form 17) contains a forward-link reference to C1 in plain text inside the body; the hyperlink is already present (C1 shipped before C5 within Session C), so no manager action required, but worth confirming during merge review.
3. **House position §24.1 patch per F-4.** Remove the ITTOIA 2005 s.282 reference from §24.1 + §24.9 citations.
4. **Existing-page back-links per D-4.** Five existing on-site pages (section-24-joint-property-ownership-tax-split, mtd-itsa-jointly-owned-property-threshold-split, mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse, cgt-property-transfer-spouse, alphabet-shares-property-spv-dividend-splitting-spouse-children) should back-link to C1 once Session C merges to main.

**Slug change in C9:** C9 was published with slug `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` (dropped the brief-suggested "3-percent" infix because the surcharge rate has been 5% since 31 October 2024; embedding the old rate in the URL would have created stale-figure rot). Brief slug mismatch logged here for tracker hygiene.

**Cross-bucket lessons absorbed from Sessions A and B during Session C work:**
- Session A's F-8 + F-9 (brief mis-citation of statutory provisions for VAT topics) reinforced the §16.35 per-write verification discipline. Session C applied per-write verification consistently and caught the F-4 §24.1 ITTOIA s.282 mis-cite on the same pattern.
- Session B's pattern of writing devolved-tax pages with cross-jurisdiction comparison tables informed C9's structure for the Welsh + Scottish equivalent sections.

Session C ready for manager review + bucket-merge to main.

---

## [SESSION_B_COMPLETE] 2026-05-23 — continuation Session B closing summary

This continuation Session B closed B4-B10 (the prior Session B continuation closed B1-B3 and surfaced the §16.15 worktree-vs-main tracker-edit issue addressed via the manager Q-1 answer).

### Final Session B state
- **All 10 pages committed on `property-wave5-b`.** Per-page commits: 92a488f (B1), 2a63a1a (B2), b81e0d7 (B3), 223c4c5 (B4), 8d753d2 (B5), 05caf62 (B6), 3ab3e07 (B7), 4454414 (B8), c74d3e2 (B9), 7b44ba2 (B10).
- **monitored_pages registrations:** B1 188, B2 190, B3 195, B4 203, B5 209, B6 212, B7 213, B8 214, B9 215, B10 216.
- **Cumulative body words (B4-B10):** 20,311. All within brief targets after self-calibration adjustments.
- **§16.32 sequencing satisfied:** B2 (Welsh higher rates spousal aggregation under LTTA 2017 Sch 5 para 25) and B7 (Scottish ADS joint-buyer aggregation under LBTT(S)A 2013 Sch 2A para 5(2)) both on branch ahead of C9. C9 already shipped per Session C complete status; manager hyperlinks at bucket-merge.

### Flags raised by this continuation
- **F-B7-1 HOUSE_POSITION_CONFLICT:** §23.5 cites Sch 2A para 4 for joint-buyer aggregation; verbatim WebFetch confirms para 4(2) is the 8% rate provision and joint-buyer aggregation sits at Sch 2A para 5(2). Severity MEDIUM for the locked house position.

### Brief errors caught at write time (lower-severity, logged for brief-template fixes)
- **B5 BRIEF_ERROR:** brief cited "LTTA 2017 s.34" for return amendment; s.34 is in fact unit trust schemes. Correct citations: TCMA 2016 s.41 (12-month amendment), s.63 (overpayment relief), s.78 (4-year time limit). B5 uses correct cites on-page; logged as discovery D-11.
- **B10 BRIEF_ERROR:** brief implied FA 2003 Sch 7 Part 2 for Scottish acquisition relief; this is the England parallel. Scottish acquisition relief sits at LBTT(S)A 2013 Sch 11 (titled "Reconstruction relief and acquisition relief"). B10 uses correct cite on-page.

The Sessions A / B / C combined pattern of brief errors caught at write time (A8 Sch 4A→Sch 6, A9 non-existent cladding zero-rate, B5 LTTA 2017 s.34→TCMA 2016 s.41, B10 FA 2003 Sch 7→LBTT(S)A 2013 Sch 11) suggests a systematic Stage-1-brief-template review is worth scheduling pre-Wave 6: the per-write-verification per §16.35 is catching these but the briefs should be cleaner upstream.

### Stale-slug corrections applied in main tracker
- **B7:** was `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers-six-percent` (legacy 6% rate suffix); corrected to `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` matching actual brief filename + current 8% rate.
- **B8:** was `scottish-lbtt-first-time-buyer-relief-145k-threshold-eligibility-mechanics` (legacy £145k threshold suffix; relief is actually £175k uplift on £145k main nil); corrected to `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics` matching actual brief filename.

### Personas (manager Q-1 PASS persona-refinement note applied)
The Welsh sub-bucket (B1-B5) used Welsh surnames Davies, Williams-Hughes, Jones, Evans-Thomas, Jones-Edwards, Davies Holdings, Williams-Hughes Estates (from B1-B3), then Morgan, Pugh, Owen, Pritchard, Powell (introduced in B4 per Q-1 note), then Lloyd, Vaughan Properties Ltd (in B5). The Scottish sub-bucket (B6-B10) used Scottish surnames Macleod, McGregor, Stewart, Sinclair, Cameron-Ross, Fraser Properties Ltd, Lennon, Macleod-Scott, Robertson, Highland Properties Ltd, Caledonian Investments Ltd, Macleod Holdings Ltd, Cameron-Stewart Holdings Ltd. No persona reuse across pages within identical scenarios; reuses (Macleod, Williams-Hughes, Pugh) sit in distinct fictional households.

Session B ready for manager review + bucket-merge to main.
