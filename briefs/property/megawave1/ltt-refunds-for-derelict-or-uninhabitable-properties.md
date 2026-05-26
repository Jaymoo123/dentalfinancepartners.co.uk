# MegaWave 1 brief: ltt-refunds-for-derelict-or-uninhabitable-properties

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B9
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; LTTA 2017 s.72 + Bewley/Hyman/Mudan/MHB/Brown post-Bewley narrowing line verified against §1.C Wave 7 HP lock and legislation.gov.uk)
**Source markdown path on launch:** `Property/web/content/blog/ltt-refunds-for-derelict-or-uninhabitable-properties.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ltt-refunds-for-derelict-or-uninhabitable-properties
**Cross-references:** F-50 (CROSS_BUCKET / intentional pre-purchase + post-completion pair with the Wave 5 refund-mechanics companion).

---

## Manager pre-decisions

- **Suggested slug:** `ltt-refunds-for-derelict-or-uninhabitable-properties` (retain verbatim).
- **Suggested category:** `property-types-and-specialist-tax` (matches the Wave 5 sister page exactly).
- **Bucket:** B (SDLT — Scottish / Welsh equivalents, Welsh-side).
- **Cannibalisation classification:** intentional pair with `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics` (Wave 5). F-50 logged the pair as a deliberate two-page set. **Mandatory differentiation discipline below.**

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing page `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics` (Wave 5) is the **post-completion refund-mechanics page**: written for the buyer who has ALREADY paid LTT at residential rates and now wants to claim a refund. It covers the TCMA 2016 s.41 / s.63 / s.78 routes, the WRA evidence pack at the claim stage, the review and Welsh tribunal pathway, and a £180k derelict cottage worked example.

THIS new page (B9) is the **pre-purchase classification page**: written for the buyer at the point of the purchase decision (or immediately pre-completion), asking the prior question "is my property suitable for use as a dwelling under LTTA 2017 s.72 at all?" and "should I file the LTT return at non-residential rates from the outset, or pay residential and reclaim?"

**Hard rule:** B9 must explicitly cross-link the Wave 5 refund-mechanics page as "the post-completion refund-mechanics companion" in the opening section. The two pages are an intentional pre-purchase + post-completion pair (F-50). B9 does NOT re-explain the WRA claim form mechanics, the s.41 amendment route mechanics, or the £180k cottage worked example. B9's territory is: the s.72 dwelling-suitability substantive test + the surveyor evidence pack + the strategic-choice framework + the post-Bewley narrowing line.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **pre-purchase classification page** for derelict / uninhabitable Welsh properties. Audience: a buyer about to acquire a derelict cottage, abandoned farmhouse, fire-damaged or asbestos-contaminated property in Wales who is deciding (i) whether to file the LTT return at non-residential rates from the outset, (ii) whether to commission a pre-purchase RICS Building Survey scoped specifically to support dwelling-suitability analysis, and (iii) whether to challenge the conventional residential classification at all.

The distinguishing angle is **the pre-purchase decision and the surveyor evidence pack**, decomposed across four sub-questions:

1. **The s.72 dwelling-suitability substantive test.** LTTA 2017 s.72(1)(a) defines residential property as "a building that is used or suitable for use as a dwelling, or is in the process of being constructed or adapted for such use". The "suitable for use" test is the operative threshold; for derelict / uninhabitable acquisitions, the question is whether the building at the effective date retains its essential dwelling characteristics. Welsh tribunals are sparse on s.72 itself but draw on the SDLT comparator line (Bewley, Hyman, Mudan, MHB, Brown) — Welsh statute is materially identical in this respect to FA 2003 s.116(1)(a).

2. **The post-Bewley narrowing line (per HP §1.C).** Bewley v HMRC [2019] UKFTT 65 (TC) established the narrow exception for substantially structurally dangerous / contaminated / requiring complete reconstruction properties. Hyman (CA), Mudan (UT), MHB and Brown subsequently narrowed Bewley. The operational test as at 2026 is restrictive: "would a surveyor, on the effective date, certify the property as dangerous to occupy and requiring complete reconstruction of major elements?" Run-of-the-mill "fixer-upper" purchases do NOT qualify. Welsh tribunals are likely to follow this line absent contrary Welsh authority; the page must NOT overstate Bewley availability.

3. **Surveyor evidence pack scoped for tax purposes.** The page walks the buyer through what a properly-scoped RICS Building Survey should evidence for a Bewley-style filing: structural integrity (sound roof, weather-tight walls, foundation integrity), essential rooms (kitchen, bathroom — presence and functionality, not just condition), services (electricity, water, sewerage — connected and functional, not just installed), contamination (asbestos surveys for properties built before 2000, mould assessments where applicable), and any local-authority condemnation or prohibition orders.

4. **Strategic choice: file non-residential at outset versus file residential and reclaim.** The two operational routes are distinct on enquiry-risk profile, cash-flow timing, and evidential burden. B9 walks the trade-off explicitly: filing non-residential is faster for cash flow (returns lower tax at the outset) but defends a position against likely WRA enquiry from day one; filing residential and reclaiming under TCMA 2016 s.41 / s.63 means cash outlay for typically 4-18 months but typically attracts less enquiry friction (WRA is less likely to challenge a downstream refund claim than an upstream non-residential filing). The right answer depends on the strength of evidence at completion, the WRA's known position on similar properties, the buyer's cash-flow tolerance, and the intended use post-renovation.

**Stage 1b HP-lock note:** No new HP lock required for B9; the Bewley / post-Bewley line is locked at §1.C (Wave 7 lock) for SDLT and the Welsh comparator follows directly from s.72 + the SDLT case-law line. Stage 1b conductor may consider extending §1.C with a one-paragraph "Welsh comparator note" if conductor judges material at wave-close.

**Pool-thinness disclosure:** Welsh competitor coverage of dwelling-suitability is thin compared to the SDLT-side coverage. Capital Law / Hugh James / Mason Hayes / Berry Smith Welsh tax-team briefings exist but rarely walk the pre-purchase decision framework. The defensible point for B9 is **the pre-purchase decision discipline + the surveyor evidence-pack specifics + the explicit post-Bewley narrowing line applied to LTT**.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) LTTA 2017 s.72 verbatim dwelling-suitability test; (b) the post-Bewley narrowing line as applied to Welsh LTT (flag any competitor overstating Bewley availability); (c) surveyor evidence-pack guidance (specific structural / contamination / services criteria); (d) the strategic-choice framework (file non-residential at outset versus file residential and reclaim); (e) any Welsh tribunal s.72 decisions identified.

- https://www.ukpropertyaccountants.co.uk/ltt-refunds-for-derelict-or-uninhabitable-properties/
- https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- https://www.capitallaw.co.uk/insights/welsh-ltt-derelict-property/
- https://www.hughjames.com/news/ltt-uninhabitable-property-refund/
- https://www.masonhayes.co.uk/site/news/welsh-ltt-derelict-property/
- https://www.berry-smith.co.uk/news/welsh-ltt-derelict-purchase/

**Borrowable patterns (subject to verification):** competitor surveyor-checklist patterns; pre-purchase decision-framework structures (verify post-Bewley narrowing is correctly stated before borrowing).

**Reliability notes:**
- gov.wales technical guidance pages authoritative for WRA published interpretation.
- ukpropertyaccountants.co.uk: canonical SERP competitor; verify post-Bewley narrowing claims against statute + case-law line before citing.
- Welsh law-firm briefings: variable quality; flag any "Bewley is widely available" framing as drift.

---

## GSC data

*Net-new page; primary topical queries expected: "Welsh LTT derelict property", "LTT non residential rate derelict", "LTTA 2017 s.72 dwelling suitable for use", "Welsh LTT Bewley test", "uninhabitable property Welsh LTT", "Wales stamp duty derelict farmhouse", "LTT refund derelict property surveyor evidence", "LTT non-residential pre-purchase classification".*

---

## Closest existing pages (cannibalisation context)

- **`welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics` (Wave 5, deliberate pair)** — the post-completion refund-mechanics companion. **Mandatory cross-link** in opening + closing as "the post-completion refund-mechanics companion".
- `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (Wave 5) — main rates; light cross-link in the rate-calculation worked-example.
- `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5) — higher rates; cross-link to surface "non-residential classification removes higher-rates exposure" point.
- `sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords` (Wave 7) — SDLT-side Bewley page; cross-link for the cross-jurisdictional comparator (Welsh statute is functionally identical to FA 2003 s.116(1)(a)).
- Sibling MW1 picks: B7 (Scottish ADS edge cases); B8 (Welsh higher-rates attribution); B11 `ltt-calculator` (rate utility).

**Cannibalisation discipline:**
- **Hard cross-link** to Wave 5 refund-mechanics page in opening + closing.
- Cross-link Wave 5 higher-rates page once to surface the non-residential classification interaction with higher rates (no Sch 5 engagement on non-residential).
- Cross-link Wave 7 SDLT Bewley page as cross-jurisdictional comparator.
- Vary worked-example price points from the Wave 5 page (which used £180k); B9 should use a £350,000 derelict farmhouse / £420,000 chapel-conversion / similar fresh persona.

---

## Redirect overlap (on launch)

No existing slug matches B9's scope. **Session to scan `Property/web/middleware.ts` for any `welsh-ltt-derelict` / `ltt-uninhabitable-property` / `welsh-non-residential-derelict` token redirects pre-launch; if found, repoint to B9.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 7-10)

**Statutory (legislation.gov.uk):**
- LTTA 2017 s.72 (meaning of residential property — primary dwelling-suitability anchor): https://www.legislation.gov.uk/anaw/2017/1/section/72
- LTTA 2017 s.24 (residential rate-setting): https://www.legislation.gov.uk/anaw/2017/1/section/24
- LTTA 2017 s.25 (non-residential rate-setting): https://www.legislation.gov.uk/anaw/2017/1/section/25
- LTTA 2017 s.10 (effective date — substantial performance test): https://www.legislation.gov.uk/anaw/2017/1/section/10
- LTTA 2017 s.41 (return filing — 30 days): https://www.legislation.gov.uk/anaw/2017/1/section/41
- TCMA 2016 s.41 (amendment of tax return by taxpayer — 12-month route): https://www.legislation.gov.uk/anaw/2016/6/section/41
- TCMA 2016 s.63 (claim for relief in respect of double assessment to devolved tax): https://www.legislation.gov.uk/anaw/2016/6/section/63
- TCMA 2016 s.78 (4-year overpayment-claim long-stop): https://www.legislation.gov.uk/anaw/2016/6/section/78
- TCMA 2016 ss.172-184 (Welsh Revenue Authority review and Welsh tribunal appeal route): https://www.legislation.gov.uk/anaw/2016/6/contents

**SDLT comparator case-law (cited but distinguished — Welsh tribunals apply LTTA 2017 s.72, not FA 2003 s.116):**
- P N Bewley Ltd v HMRC [2019] UKFTT 65 (TC) TC07097 (the leading authority on substantially uninhabitable / dangerous properties)
- Hyman & Goodfellow v HMRC [2021] UKUT 68 (TCC) / [2022] EWCA Civ 185 (Upper Tribunal and Court of Appeal: post-Bewley narrowing on "suitable for use" interpretation)
- Mudan v HMRC [2023] UKFTT 317 / [2024] UKUT (TCC) (further narrowing on unmodernised but structurally intact properties)
- MHB Ltd v HMRC (unmodernised condition does not bring within Bewley)
- Brown v HMRC [2024] UKFTT (continuing the narrowing trajectory)

**Welsh Government / WRA technical guidance:**
- WRA LTT technical guidance landing: https://www.gov.wales/land-transaction-tax-technical-guidance
- WRA dwelling / non-residential classification guidance: https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- WRA returns and amendments: https://www.gov.wales/file-land-transaction-tax-return

**RICS surveyor guidance (for the evidence-pack section):**
- RICS Home Survey Standard: https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/building-surveying-standards/home-survey-standard
- RICS asbestos in commercial and residential property: https://www.rics.org/

**Cross-references in house_positions.md:**
- **§1.C primary anchor** (Wave 7 lock — Bewley test + post-Bewley narrowing via Hyman / Mudan / MHB / Brown; functionally identical to Welsh s.72 territory).
- §23.1-§23.3 (Welsh LTT framework — main residential bands, higher rates, MDR, non-residential bands).
- §23.11 do-not-write (the Welsh test is not identical to SDLT in citation, only in operational test; do not conflate the statutory anchors).
- §1.J (Wave 9 lock — residential-vs-mixed-use case-law trilogy; light reference for the broader classification-line family).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify LTTA 2017 s.72 verbatim against legislation.gov.uk before citing in body.
- Verify TCMA 2016 ss.41, 63, 78, 172-184 verbatim section headings before citing.
- Verify Welsh residential and non-residential band tables against gov.wales at write time (rate-by-reference per §16.27 / §16.35).
- Verify FA 2003 s.116(1)(a) for the SDLT comparator citation (the substantive test is identical to LTTA s.72(1)(a)).
- Verify each Bewley-line case citation (Bewley TC07097; Hyman UT [2021] UKUT 68 / CA [2022] EWCA Civ 185; Mudan FTT [2023] UKFTT 317; MHB; Brown [2024] UKFTT) against bailii.org / taxbar.com at write time.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.
- **Tone discipline:** Bewley is presented as a NARROW exception, not as a routine route. Do NOT use aggressive claims-firm framing ("save thousands on your derelict purchase"). The page must explicitly close down the over-stated Bewley framing prevalent on competitor pages.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise pre-purchase buyer + cross-border English/Welsh buyer + RICS surveyor referral + chapel-conversion / barn-conversion / derelict-farmhouse buyer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "s.72 dwelling-suitability test" H2 (high-intent: pre-purchase buyer assessing).
  - After the "post-Bewley narrowing line" H2 (high-intent: buyer with marginal-case property considering challenge).
  - After the "strategic choice framework" H2 (high-intent: buyer at filing decision point).
- Vary opening; lead with the buyer's pre-purchase decision moment ("You are about to buy a derelict cottage in Wales..."), NOT with "LTT applies to property purchases...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Cross-link Wave 5 `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics` (post-completion refund-mechanics companion) in opening + closing.
- Cross-link Wave 7 `sdlt-bewley-uninhabitable-property-test-non-residential-rates-landlords` for SDLT-side comparator.
- Cross-link Wave 5 `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` for the non-residential-classification removes higher-rates point.

### House positions
- §1.C primary anchor (Bewley + post-Bewley narrowing).
- §23.1-§23.3 secondary (Welsh framework).
- §23.11 do-not-write enforcement.

### Quality bar
- Word count: 2,800-3,400.
- FAQs: 10-12.
- New external authority links: 7-10.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **pre-purchase classification + s.72 substantive test + surveyor evidence pack + strategic choice framework + post-Bewley narrowing line as applied to LTT**. Write to it.
- Vary H2s from the Wave 5 refund-mechanics page (which leads on claim form + evidence-pack + worked example). B9 should lead on the pre-purchase decision hook + s.72 substantive test + the four-question evidence walkthrough + the strategic choice.
- Lead with the buyer's pre-purchase decision moment, NOT with regime-history.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs.

1. **My property is derelict. Can I file the LTT return at non-residential rates from the outset?**
   Potentially yes, but the property must meet the LTTA 2017 s.72 dwelling-suitability test on the side of "not suitable for use as a dwelling" at the effective date. The test is restrictive (see post-Bewley narrowing FAQ). Filing non-residential at the outset means defending the position against likely WRA enquiry from day one; many buyers prefer to file residential and claim a refund via TCMA 2016 s.41 amendment if the property does qualify. The strategic-choice analysis depends on the strength of evidence at completion.

2. **What does "suitable for use as a dwelling" actually mean for LTT?**
   LTTA 2017 s.72(1)(a) defines residential property as a building "used or suitable for use as a dwelling". The "suitable for use" test is objective and tested at the effective date of the transaction. The property must retain its essential dwelling characteristics: sound roof, weather-tight walls, basic functional rooms (kitchen, bathroom), structural integrity, and habitable services (electricity, water, sewerage). The test is NOT buyer-intention-dependent; what the buyer plans to do with the property post-completion does not affect the s.72 classification.

3. **Does an unmodernised property qualify as non-residential under the Bewley test?**
   Generally no. The post-Bewley narrowing line (Hyman, Mudan, MHB, Brown) holds that unmodernised condition does NOT take a property outside the dwelling definition. Dated decor, kitchens requiring replacement, electrical wiring from the 1970s, broken windows, paintwork in poor condition: all of these remain within the residential rate. Bewley applies only to properties substantially structurally dangerous, contaminated (asbestos, mould requiring removal), or requiring complete reconstruction of major elements.

4. **What kind of property does qualify for non-residential treatment?**
   Genuinely structurally-dangerous properties (roof collapsed; structural movement requiring complete reconstruction; foundations failed); contaminated properties (asbestos throughout requiring removal pre-occupation; substantial mould requiring structural intervention); properties subject to local-authority condemnation or prohibition notices; properties with services so failed that they cannot be made habitable without reconstruction. The threshold is "would a surveyor, on the effective date, certify the property as dangerous to occupy and requiring complete reconstruction of major elements?".

5. **What evidence do I need to support a non-residential classification?**
   A properly-scoped RICS Building Survey with explicit dwelling-suitability reasoning (NOT just a general "in poor condition" report); photographs at the effective date; EICR / gas safety reports showing services condition; asbestos surveys (for pre-2000 properties); any local-authority condemnation or prohibition orders; documentation of the necessary reconstruction works (architects' or surveyors' opinions on the scope of works required to make the property habitable).

6. **Should I file non-residential at the outset or pay residential and reclaim later?**
   Strategic choice. Filing non-residential at outset is faster (returns lower tax immediately) but defends against likely WRA enquiry from day one. Filing residential and reclaiming under TCMA 2016 s.41 (12-month amendment) or s.78 (4-year overpayment) means cash outlay but typically less enquiry friction. The right answer depends on (a) strength of evidence at completion, (b) WRA's known position on similar properties, (c) buyer's cash-flow tolerance, and (d) intended post-renovation use. Specialist advice essential.

7. **What is the non-residential LTT rate, and what's the saving on a £350,000 derelict farmhouse?**
   Non-residential LTT bands (2026/27): 0% to £225,000; 1% £225,001 to £250,000; 5% £250,001 to £1,000,000; 6% above. On a £350,000 purchase: £225,000 at 0% + £25,000 at 1% + £100,000 at 5% = £5,250. Residential rates (counterfactual, main residence buyer): £225,000 at 0% + £125,000 at 6% = £7,500. Higher-rates buyer: substantially more (around £25,000). The non-residential saving is material but varies by purchase price and buyer profile.

8. **How does dwelling-suitability interact with the higher-rates regime under Sch 5?**
   If the property is classified non-residential under s.72, the Sch 5 higher-rates regime does NOT engage at all. Higher rates apply only to RESIDENTIAL transactions. For a buyer who already owns a dwelling, non-residential classification removes both the residential rate AND the higher-rates surcharge, materially compounding the saving. This interaction is one of the strongest arguments for pursuing non-residential classification on a marginal-case derelict acquisition.

9. **What are the time limits for amending the LTT return to non-residential?**
   Three windows: (a) Initial return at outset, file within 30 days of effective date under LTTA 2017 s.41. (b) Amendment of residential return to non-residential, within 12 months of filing under TCMA 2016 s.41. (c) Overpayment claim where amendment window closed, within 4 years of filing under TCMA 2016 s.78. Post-4-year claims are time-barred. Filing earlier in the cycle preserves more remedy options.

10. **What if WRA refuses my non-residential filing or refund claim?**
    First step: request a review by WRA under TCMA 2016. The review decision is appealable to the Welsh Tax Tribunal (Tax Chamber) under TCMA 2016 ss.172-184 within 30 days of the review decision. Onward appeal on points of law to the Upper Tribunal (Tax and Chancery) and ultimately to the higher courts. The 30-day appeal window is strict; late appeals require a reasonable-excuse application.

11. **Is there Welsh tribunal authority on s.72 dwelling-suitability that I can rely on?**
    Welsh tribunal authority on s.72 is currently sparse. Welsh tribunals are likely to follow the SDLT comparator line (Bewley, Hyman, Mudan, MHB, Brown) given that LTTA 2017 s.72(1)(a) is functionally identical to FA 2003 s.116(1)(a) on the "suitable for use" limb. Where a Welsh tribunal decision exists on the specific facts of the buyer's case, it takes primary precedence; absent that, the SDLT comparator authority is the operational guide.

12. **How does the position differ from SDLT (England) or LBTT (Scotland) on a cross-border purchase?**
    The substantive dwelling-suitability test under LTTA 2017 s.72(1)(a) (Wales), FA 2003 s.116(1)(a) (England/NI), and LBTT(S)A 2013 s.59(1)(a) (Scotland) is functionally identical, all three turn on "suitable for use as a dwelling" at the effective date. Differences sit in procedural mechanics (return filing window, refund route, review and appeal pathway, time limits) and in rate tables. Welsh tribunal jurisdiction sits in the Welsh Tax Tribunal; English in the FTT (Tax Chamber); Scottish in the FTT for Scotland (Tax Chamber).

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt personas + figures)

Three illustrative scenarios. Use anonymised personas (no real names; persona-type only). Vary worked-example price points from the Wave 5 refund-mechanics page (which used £180k).

### Worked example 1: derelict farmhouse, non-residential filing at outset succeeds

A buyer ("Buyer R") purchases a £350,000 derelict farmhouse in rural Powys on 1 May 2026 (effective date). The property has a collapsed section of roof, no functioning kitchen or bathroom (both removed by a prior owner), services disconnected for 8+ years, asbestos throughout the original 1950s extension (full asbestos survey commissioned pre-purchase shows category 1 asbestos requiring full removal). A RICS Building Survey commissioned 3 weeks before completion concludes the property is "not suitable for occupation as a dwelling in its current condition" and would require "substantial reconstruction of major elements" before habitable.

- **Test:** LTTA 2017 s.72(1)(a) "suitable for use as a dwelling" fails on the effective date evidence. The post-Bewley narrowing line is satisfied (structural collapse + asbestos contamination + services failure + RICS dwelling-suitability finding); this is NOT a fixer-upper case but a Bewley-bracket case.
- **Result:** Buyer R files the LTT return at non-residential rates from the outset. Non-residential LTT: £225,000 at 0% + £25,000 at 1% + £100,000 at 5% = £5,250. Counterfactual residential rate (Buyer R has a separate main residence in Cardiff so higher rates would engage): £180,000 at 5% + £70,000 at 8.5% + £100,000 at 10% = £24,950. Saving: £19,700.
- **Operational point:** clean non-residential filing succeeds because the evidence pack is comprehensive (RICS report; asbestos survey; photographs; contemporaneous notes). WRA opens a routine enquiry; Buyer R provides the evidence pack and the position is sustained. Specialist representation engaged pre-completion to scope the surveyor instruction.

### Worked example 2: fixer-upper purchase, non-residential filing FAILS

A buyer ("Buyer S") purchases a £280,000 unmodernised semi-detached house in Newport on 15 April 2026 (effective date). The kitchen units are dated and need replacing; the bathroom is original 1970s but functional; the boiler is 25 years old and inefficient (still working at completion); the electrical wiring is 1970s but compliant with the relevant standards for the period; the decor throughout is dated. A surveyor's report describes the property as "in poor condition, requiring substantial renovation".

- **Test:** LTTA 2017 s.72(1)(a) "suitable for use as a dwelling" is satisfied on the effective date evidence. The property has a functional kitchen (dated but in place), functional bathroom (original but working), connected and operational services. Per the post-Bewley narrowing line (Hyman / Mudan / MHB / Brown), unmodernised condition does NOT bring within Bewley. The property is residential.
- **Result:** Buyer S's hypothetical non-residential filing would fail. Correct filing is at residential rates: £225,000 at 0% + £55,000 at 6% = £3,300 (main residence). If Buyer S had filed non-residential and WRA opened an enquiry, the position would be reversed with interest on the underpayment under TCMA 2016 plus potential penalty under TCMA 2016 Sch — sessions writing must surface that non-residential filing on a fixer-upper carries enquiry + penalty risk.
- **Operational point:** the post-Bewley narrowing is the critical guard. Aggressive non-residential filing on a fixer-upper is not the right play and exposes the buyer to material downstream cost. Specialist advice before the filing decision is essential to distinguish Bewley territory from fixer-upper territory.

### Worked example 3: marginal-case chapel conversion, file-residential-and-reclaim path

A buyer ("Buyer T") purchases a £420,000 derelict former Methodist chapel in Carmarthenshire on 1 March 2026 (effective date). The chapel has been unoccupied since 2008. The roof is intact but the building has never been residential (no kitchen, no bathroom, only one services connection). The intended use post-completion is conversion to a single dwelling. A pre-purchase surveyor's report concludes the property is "in the process of being constructed or adapted for use as a dwelling" — capturing the s.72(1)(a) alternative limb. The buyer faces a finely-balanced decision.

- **Test:** s.72(1)(a) operates in two limbs: (i) "used or suitable for use as a dwelling" and (ii) "in the process of being constructed or adapted for such use". Limb (ii) catches properties under conversion; limb (i) catches existing dwelling-suitable properties. The chapel is arguably under limb (ii) IF the conversion process has commenced before the effective date (planning permission granted + architect engaged + first works contracted). If conversion has not commenced, the property is non-residential at the effective date.
- **Result:** Buyer T's surveyor concludes the conversion process had not yet commenced at the effective date (planning permission granted but no contractor engaged, no first works on site). Buyer T files the LTT return at non-residential rates: £225,000 at 0% + £25,000 at 1% + £170,000 at 5% = £8,750. WRA opens an enquiry. Buyer T's evidence pack (RICS report; planning permission documentation showing pre-commencement state; photographs of empty chapel; absence of contractor engagement) supports the non-residential position. Position sustained.
- **Operational point:** s.72(1)(a) limb (ii) is a finely-balanced point on conversion projects. The timing of "in the process of being constructed or adapted" matters materially. Pre-purchase surveyor evidence on the state of the conversion at the effective date is the load-bearing piece of the file. Buyer T could alternatively have filed residential and reclaimed under TCMA 2016 s.41 — the trade-off is cash flow versus enquiry exposure.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9. Key per-page anchors: §1.C (Wave 7 Bewley lock) primary; §23.1-§23.3 secondary; §16.35 per-write verification on LTTA 2017 s.72 verbatim + each Bewley-line case citation.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/megawave1_questions_session_B.md` (absolute path), arm a single Monitor task watching for STATUS flip to answered.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title (≤62 chars):
- Meta description (≤158 chars):
- Why these vs other options:

### Competitor URLs fetched + key takeaway per URL
-

### Existing-page review (overlap, differentiation decision)
-

### Citations added
-

### Internal links added
-

### Inline CTA placements
-

### Build attempts (pass/fail)
-

### Verification (six checks)
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### monitored_pages registration
-

### Flags raised to megawave1_site_wide_flags.md
-

### 2-3 sentence summary
-
