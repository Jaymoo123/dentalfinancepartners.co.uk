# MegaWave 1 brief: ltt-higher-rates-for-spouses-minor-children-and-trust-interests

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B8
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; LTTA 2017 Sch 5 paras 5, 8 verified at legislation.gov.uk; minor-children attribution divergence from SDLT Sch 4ZA para 12 confirmed)
**Source markdown path on launch:** `Property/web/content/blog/ltt-higher-rates-for-spouses-minor-children-and-trust-interests.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ltt-higher-rates-for-spouses-minor-children-and-trust-interests

---

## Manager pre-decisions

- **Suggested slug:** `ltt-higher-rates-for-spouses-minor-children-and-trust-interests` (retain verbatim to match the long-tail SERP query).
- **Suggested category:** `property-types-and-specialist-tax` (matches the Wave 5 welsh-ltt-* family).
- **Bucket:** B (SDLT — Scottish / Welsh equivalents, Welsh-side).
- **Cannibalisation classification:** partial overlap with Wave 5 `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics`. **Mandatory differentiation discipline below.**

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing page `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5) covers the **headline Welsh higher-rates mechanics**: standalone band structure 5%/8.5%/10%/12.5%/15%/17% from 11 December 2024, £40,000 threshold, 3-year replacement-of-main-residence rule, basic spousal aggregation, corporate-buyer treatment. It is the rate-and-bands landing page for the buyer asking "what are the Welsh higher rates?".

THIS new page (B8) is deliberately ORTHOGONAL and covers the **attribution and aggregation patterns** that catch buyers out: spouse-or-civil-partner aggregation in tenants-in-common and joint-tenant variants (LTTA 2017 Sch 5 para 5(4)-(6)); the **minor-children attribution gap** versus SDLT (LTTA 2017 Sch 5 has no direct equivalent of FA 2003 Sch 4ZA para 12, verified 2026-05-26 — divergence from SDLT confirmed as Stage 2 catch); bare-trust attribution where the buyer is the beneficiary; discretionary-settlement attribution where the buyer has an interest in possession.

**Hard rule:** B8 must explicitly cross-link the Wave 5 mechanics page as "the rate-and-bands companion" in the opening section. B8 does NOT re-explain the higher-rates band table, the £40,000 threshold, or the replacement-of-main-residence window. B8's territory is: the four attribution patterns + the SDLT/LTT divergence on minor children + the joint-buyer combinations.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **family-and-trust attribution deep-cut** for Welsh LTT higher rates. Audience: a buyer purchasing residential property in Wales who is asking "does my spouse's separately-owned BTL count?", "does the property I bought for my teenage daughter count?", "I'm the beneficiary of a bare trust over my parents' house, does that count?". The Wave 5 mechanics page treats spousal aggregation as one item in a list of rules; B8 is built around the attribution patterns, with the statutory anchor cited per pattern.

The distinguishing angle is **four patterns where attribution is decided by Welsh statute that diverges from SDLT in non-obvious ways**:

1. **Spouse / civil partner aggregation under LTTA 2017 Sch 5 para 5(4)-(6) plus the "living together" test.** Where the buyer and the buyer's spouse or civil partner are "living together" and taken together hold a relevant interest in another dwelling, para 5(4)-(6) operates a beneficial-share aggregation formula. The "living together" test (sub-paragraph or interpretation provision in Sch 5 — Stage 2 must confirm exact paragraph at write time) excludes court-ordered separation and de facto permanent separation. Cohabitants who are not married or civil-partnered are NOT aggregated under para 5 (a material divergence from the ADS para 6 + para 8A position in Scotland).

2. **The minor-children attribution GAP — material divergence from SDLT.** SDLT FA 2003 Sch 4ZA para 12 attributes a minor child's (under-18) dwelling to the parent for the additional-dwellings test. **Welsh LTT Sch 5 does NOT contain a direct equivalent** (verified 2026-05-26 against legislation.gov.uk/anaw/2017/1/schedule/5; the visible paragraph index has no minor-children attribution provision). Practical consequence: a Welsh parent buying a second home where their teenage child happens to own (or have a dwelling beneficially held for them via a bare trust) is potentially NOT caught by direct attribution. **Attribution may still operate indirectly via bare-trust / settlement routes (see pattern 3 below) but the direct statutory rule is absent.** This is a NEW HP LOCK CANDIDATE flagged in the seed; B8 surfaces the divergence explicitly.

3. **Bare trust attribution (general settlements / bare-trust framework).** Where the buyer is the beneficiary of a bare trust over a property, the beneficial-owner principle treats the buyer as owning that dwelling for the Sch 5 higher-rates test. The route is the general settlements framework rather than a specific Sch 5 paragraph; Welsh tribunals are sparse on the point but WRA published guidance and SDLT comparator authority hold the line.

4. **Discretionary settlement attribution — present interest in possession only.** Where the buyer is a beneficiary of a discretionary settlement that holds a dwelling, standard line is: no attribution unless the buyer has a present interest in possession (life interest, settled interest in possession by appointment, or a vested interest in the dwelling). Class beneficiaries of pure discretionary settlements are not attributed.

**Stage 1b HP-lock note:** The minor-children divergence finding is the NEW HP LOCK CANDIDATE flagged in the seed. Stage 1b conductor should consider locking the divergence centrally as a sub-section of §23 (e.g. §23.X "Welsh LTT family-and-trust attribution — divergences from SDLT Sch 4ZA"). The B8 page is the first MW1 surface to expose this question; future MW2 / MW3 surfaces on SDLT cluster pages would benefit from a central HP anchor.

**Pool-thinness disclosure:** Welsh competitor coverage of higher-rates attribution is thin. Mason Hayes / Capital Law / Hugh James / Berry Smith Welsh tax-team briefings cover the headline mechanics but rarely walk the four attribution patterns. The defensible point for B8 is **the verbatim Sch 5 para 5(4)-(6) mechanics + the explicit minor-children divergence finding + the bare-trust / settlement routes mapped to Sch 5**.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) LTTA 2017 Sch 5 para 5(4)-(6) verbatim spouse aggregation formula; (b) the "living together" test definition and source (Sch 5 interpretation paragraph); (c) ANY minor-children attribution claim (flag if a competitor asserts a direct attribution rule — likely a drift from SDLT); (d) bare-trust / settlement attribution treatment; (e) WRA published guidance on attribution.

- https://www.ukpropertyaccountants.co.uk/ltt-higher-rates-for-spouses-minor-children-and-trust-interests/
- https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance
- https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- https://www.masonhayes.co.uk/site/news/welsh-ltt-higher-rates-additional-properties/
- https://www.capitallaw.co.uk/insights/ltt-higher-rates-spousal-aggregation/
- https://www.hughjames.com/news/welsh-ltt-additional-property-tax-explained/

**Borrowable patterns (subject to verification):** WRA technical-guidance worked examples on para 5(4)-(6) aggregation; competitor four-pattern walkthroughs (verify the minor-children pattern against legislation.gov.uk before borrowing).

**Reliability notes:**
- gov.wales technical guidance pages are authoritative for WRA published interpretation.
- ukpropertyaccountants.co.uk: the canonical SERP competitor; verify the minor-children claim against statute before citing.
- Welsh accountancy / law firm briefings: variable quality on attribution edge cases; verify any minor-children claim independently.

---

## GSC data

*Net-new page; primary topical queries expected: "Welsh LTT spouse owns property higher rate", "LTT higher rates minor child dwelling", "Welsh LTT trust interest higher rate", "LTTA 2017 Schedule 5 paragraph 5", "Welsh LTT bare trust beneficiary", "LTT replacement main residence spouse", "Welsh higher rates attribution rules".*

---

## Closest existing pages (cannibalisation context)

- **`welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5, partial overlap)** — the rate-and-bands companion. **Mandatory cross-link** in opening + closing; B8 does NOT re-explain bands.
- `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (Wave 5) — main rates page; light cross-link.
- `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` (Wave 5) — MDR retention; not directly relevant but a Wave 5 sibling.
- Sibling MW1 picks: B7 `limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence` (Scottish-side ADS edge cases — parallel reading on aggregation discipline); B11 `ltt-calculator` (utility cross-link); B9 `ltt-refunds-for-derelict-or-uninhabitable-properties` (dwelling-suitability — distinct topic).

**Cannibalisation discipline:**
- **Hard cross-link** to Wave 5 mechanics page in opening + closing.
- Light cross-link to SDLT-side `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` for the cross-jurisdictional comparison (especially on the minor-children divergence).
- Cross-link B7 (Scottish ADS) once for the cohabitant aggregation contrast (LBTT para 6 catches cohabitants for some purposes; LTT Sch 5 para 5 does NOT).

---

## Redirect overlap (on launch)

No existing slug matches B8's scope. **Session to scan `Property/web/middleware.ts` for any `welsh-ltt-spouse` / `welsh-higher-rates-attribution` / `ltt-trust-interest` token redirects pre-launch; if found, repoint to B8.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 7-9)

**Statutory (legislation.gov.uk):**
- LTTA 2017 Schedule 5 (full text — verified 2026-05-26): https://www.legislation.gov.uk/anaw/2017/1/schedule/5
- LTTA 2017 Sch 5 para 5 (Buyer has a major interest in other dwelling — spouse/civil partner aggregation at sub-paras (4)-(6)): https://www.legislation.gov.uk/anaw/2017/1/schedule/5/paragraph/5
- LTTA 2017 Sch 5 para 8 (Replacement of main residence exception — including July 2024 inserted sub-paras (2A)-(2C) on permitted-period extension): https://www.legislation.gov.uk/anaw/2017/1/schedule/5/paragraph/8
- LTTA 2017 s.24 (regulations specifying tax bands and tax rates): https://www.legislation.gov.uk/anaw/2017/1/section/24
- LTTA 2017 s.72 (meaning of residential property): https://www.legislation.gov.uk/anaw/2017/1/section/72
- TCMA 2016 s.41 (amendment of tax return by taxpayer — 12-month route): https://www.legislation.gov.uk/anaw/2016/6/section/41
- TCMA 2016 s.63 (claim for relief in respect of double assessment): https://www.legislation.gov.uk/anaw/2016/6/section/63
- TCMA 2016 s.78 (general 4-year overpayment-claim long-stop): https://www.legislation.gov.uk/anaw/2016/6/section/78
- Land Transaction Tax (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024 (higher-rates +1pp uplift, 11 December 2024): https://www.legislation.gov.uk/wsi/2024/

**SDLT comparator (cited but distinguished):**
- FA 2003 Sch 4ZA para 12 (SDLT minor-children attribution — Welsh equivalent ABSENT; cite the SDLT provision to ground the divergence finding): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA/paragraph/12

**Welsh Government / Welsh Revenue Authority guidance:**
- WRA LTT technical guidance landing: https://www.gov.wales/land-transaction-tax-technical-guidance
- WRA higher-rates technical guidance: https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance
- WRA LTT calculator (authoritative reference): https://lttcalculator.wra.gov.wales/

**Cross-references in house_positions.md:**
- **§23.2 primary anchor** (Welsh higher-rates standalone band structure, 5%-17%).
- §23.3 (MDR retained, non-residential bands, other reliefs — light reference for context).
- §23.8 (cross-jurisdictional 4-nation comparison — key for the minor-children divergence point).
- §23.11 do-not-write (Welsh higher rates NOT a flat surcharge on standard bands — standalone structure).
- §1 main + §1.A-§1.F SDLT cluster (for the FA 2003 Sch 4ZA cross-jurisdictional comparator).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify LTTA 2017 Sch 5 paras 5, 8 verbatim against legislation.gov.uk before citing in body.
- **Verify the minor-children attribution gap explicitly** — re-read Sch 5 paragraph index in full at write time to confirm no direct attribution paragraph has been inserted by post-2026-05-26 regulations. Document the verification timestamp in the work-log.
- Verify FA 2003 Sch 4ZA para 12 verbatim for the SDLT comparator citation.
- Verify the "living together" test paragraph (Stage 2 placeholder seed cited "para 25(3)"; confirm exact paragraph number at write time as Sch 5 paragraph numbering may differ).
- Verify the para 8 replacement-of-main-residence permitted-period architecture including the 12 July 2024 inserted sub-paragraphs (2A)-(2C).
- Verify Welsh higher-rates band table against gov.wales at write time (rate-by-reference per §16.27 / §16.35).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory paragraph references verbatim.
- Anonymised personas only (no real names).
- **Tone discipline:** present attribution as a statutory consequence, not a tax-avoidance opportunity. The minor-children divergence finding is presented as a factual statutory point, NOT as a "Welsh loophole".

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise spouse-of-existing-landlord buyer + parent-purchasing-for-adult-child + bare-trust beneficiary + cross-jurisdictional (English + Welsh) portfolio buyer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "spouse aggregation" H2 (high-intent: buyer in active acquisition with married spouse owning property).
  - After the "minor-children divergence" H2 (high-intent: parent acquiring with teenage / minor child involvement).
  - After the "bare trust / settlement attribution" H2 (high-intent: trust-beneficiary buyer).
- Vary opening; do NOT lead with "Welsh LTT higher rates were introduced..." — lead with an attribution-pattern hook.

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. See **Draft FAQ entries** below.

### Cannibalisation
- Cross-link Wave 5 `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (mechanics companion) in opening + closing.
- Cross-link SDLT-side `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` for cross-jurisdictional comparison.
- Cross-link B7 (Scottish ADS) once for cohabitant-aggregation contrast.

### House positions
- §23.2 primary anchor (higher-rates band structure).
- §23.8 cross-jurisdictional comparison (load-bearing for the SDLT vs LTT divergence).
- §23.11 do-not-write enforcement.

### Quality bar
- Word count: 2,600-3,200.
- FAQs: 10-12.
- New external authority links: 7-9.
- Build clean.
- All six verifications (em-dash 0, Tailwind 0, FAQ schema count match, metaTitle ≤62, metaDescription ≤158, internal links resolve).

### Anti-templating
- Differentiator is the **four attribution patterns + the explicit SDLT/LTT minor-children divergence finding + the LTT-specific verbatim Sch 5 para 5(4)-(6) mechanics**. Write to it.
- Vary H2s from the Wave 5 mechanics page (which leads on rate, then bands, then replacement-of-main-residence). B8 should lead on the attribution-pattern hook ("Does your spouse's separately-owned BTL count against you? Does the property you bought for your teenage daughter count?"), then walk each pattern.
- Lead with attribution-pattern hook, NOT regime-history.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs.

1. **My spouse owns a separate BTL property in their sole name. If I buy a new main residence in my sole name, will the Welsh LTT higher rates apply?**
   Yes. LTTA 2017 Schedule 5 para 5(4)-(6) aggregates the property holdings of spouses and civil partners who are "living together" for the higher-rates test. Where you and your spouse, taken together, hold a relevant interest in another dwelling at the effective date of your purchase, the higher rates engage on your purchase even if you buy in your sole name.

2. **What does "living together" mean for the spouse aggregation test?**
   "Living together" is the cohabitation test in the standard divorce-and-tax-law sense. It excludes spouses or civil partners who are separated under a court order or who are separated in circumstances likely to be permanent. The factual indicators (continuing to share a household, joint finances, shared parenting arrangements) are the test; the legal status of the marriage / civil partnership matters less than the factual position at the effective date.

3. **Does Welsh LTT attribute my minor child's dwelling to me for the higher-rates test?**
   No, not directly. **LTTA 2017 Schedule 5 does NOT contain a direct minor-children attribution provision equivalent to FA 2003 Schedule 4ZA para 12 for SDLT** (verified against legislation.gov.uk on 2026-05-26). This is a material divergence between Welsh LTT and English/Northern Ireland SDLT. A Welsh parent purchasing where their teenage child happens to own a separate dwelling is NOT caught by direct statutory attribution. Indirect attribution may still operate via the bare-trust / settlement framework (see next FAQ).

4. **I bought a property for my teenage child and the legal title is in my name held on bare trust for them. How does Welsh LTT see this?**
   The bare-trust framework treats the beneficial owner (the child) as owning the dwelling for the purposes of the higher-rates test. As you are the legal title holder but NOT the beneficial owner, the dwelling does not count against you for your own subsequent purchases under the standard beneficial-ownership analysis. The position differs from SDLT where the direct attribution rule under Sch 4ZA para 12 catches the parent on a minor-children basis regardless of bare-trust structuring.

5. **I am the beneficiary of a bare trust over my parents' former home. Does that dwelling count against me?**
   Yes. As the beneficial owner under the bare trust, you are treated as owning the dwelling for the Schedule 5 higher-rates test. The legal title holder (the trustee) does not also count it; the dwelling attaches to the beneficial owner. Your next residential purchase in Wales would attract the higher rates unless an exception applies (e.g. replacement of main residence per Sch 5 para 8).

6. **I am a beneficiary of a discretionary settlement that holds a residential property. Does that count?**
   Not in the standard case. Pure discretionary beneficiaries (where the trustees have discretion over distributions among a class) do not have a present interest in the trust property and are not attributed the dwelling. The position changes where you have a vested or present interest in possession (life interest, settled interest by appointment, or a defined sub-class right to current enjoyment), then the dwelling attaches.

7. **I am a parent buying a property for my adult child to live in. Are the higher rates triggered?**
   The higher-rates test bites on YOUR property holdings, not your adult child's. If at the effective date of your purchase you (or your spouse, if aggregating) own another dwelling, the higher rates apply to your purchase regardless of who will occupy the new property. Post-purchase gift to the child, or letting at market rent to the child, does not retroactively remove the surcharge.

8. **My spouse and I are buying a property together. One of us is a first-time buyer and the other owns a separate dwelling. Does the higher rate apply?**
   Yes. Welsh LTT applies the higher rates where any joint buyer's holdings (aggregated with their spouse under Sch 5 para 5) trigger the test. The first-time-buyer status of one buyer does not save the transaction; in any case, Wales does not operate a separate first-time-buyer relief (the £225,000 nil band serves the function for FTBs at the lower end of the market).

9. **What if I am separated from my spouse who owns a BTL, does their dwelling still count against me?**
   It depends on whether you are "living together" at the effective date. If you are separated under a court order, OR separated in circumstances likely to be permanent (factual cohabitation has ended; intention is not to resume), the para 5 aggregation does NOT apply. The factual evidence (separate addresses, separate household finances, separation agreement, ongoing divorce proceedings) is the test. Self-described "separation" without factual indicators is unlikely to defeat WRA aggregation.

10. **My spouse holds a legal title as trustee of a bare trust for a third party (e.g. their parent). Does that dwelling count against me?**
    No. The legal-title-as-trustee position does not give your spouse beneficial ownership of the dwelling. The beneficial owner (the parent in this example) is the person to whom the dwelling attaches. Your spouse's trusteeship does not bring the dwelling into the aggregated holdings under Sch 5 para 5. Documentation of the trustee status (the bare trust deed; the absence of beneficial enjoyment) supports this position in any WRA enquiry.

11. **How do I claim a refund if I paid the higher rates and later sold my previous main residence within 36 months?**
    The replacement-of-main-residence refund operates under LTTA 2017 Sch 5 paras 8 and 23. Where the previous main residence is sold within the 3-year permitted period beginning the day after the new purchase's effective date, the higher rates can be refunded. Application is via amendment of the LTT return under TCMA 2016 s.41 within 12 months of filing, or by separate overpayment claim under s.78 within 4 years. The 12 July 2024 amendments to Sch 5 (sub-paras (2A)-(2C) on extended permitted period) introduced WRA discretion to extend the 3-year window in exceptional cases.

12. **How does Welsh LTT higher-rates attribution differ from SDLT?**
    Two material divergences: (a) **Minor-children attribution**, SDLT FA 2003 Sch 4ZA para 12 directly attributes a minor child's dwelling to the parent; Welsh LTT Sch 5 has no equivalent and relies on the indirect bare-trust / settlement route. (b) **Cohabitants**, SDLT and Welsh LTT both restrict spouse-aggregation to married / civil-partnered "living together" couples; unmarried cohabitants are NOT aggregated in either jurisdiction. (Contrast Scottish LBTT, which under Sch 2A para 6 captures cohabitants for some ADS purposes.) Cross-border buyers should map the rules per jurisdiction; do not assume identical treatment.

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt personas + figures)

Three illustrative scenarios. Use anonymised personas (no real names).

### Worked example 1: spouse aggregation catches sole-name purchase

A buyer ("Buyer N") purchases a £350,000 residential property in Cardiff in her sole name on 1 March 2026 (effective date). Her husband, separately, owns a £180,000 BTL in Newport (held in his sole name since 2015) and they live together in his Cardiff main residence (sold in February 2026 to fund part of the new purchase).

- **Test:** LTTA 2017 Sch 5 para 5(4)-(6) aggregates Buyer N's holdings with her husband's holdings. Their combined holdings at the effective date include the husband's Newport BTL (above the £40,000 threshold). The higher-rates test is engaged.
- **Result:** higher rates apply to Buyer N's £350,000 purchase. Using the higher-rates table (2026/27): £180,000 at 5% = £9,000; £70,000 at 8.5% = £5,950; £100,000 at 10% = £10,000. Total higher-rates LTT = £24,950.
- **Operational point:** the spouse-aggregation catches sole-name purchases. The replacement-of-main-residence rule (Sch 5 para 8) does NOT save this transaction because the disposed Cardiff property was JOINTLY held with the husband and the Newport BTL remains; aggregation continues until the BTL is disposed of or the spouses cease "living together".

### Worked example 2: minor-children divergence, Welsh purchase NOT caught where SDLT would catch

A parent ("Buyer P") in Wales purchases a £400,000 main residence in Swansea on 1 May 2026 (effective date). Buyer P does NOT personally own any other dwelling. However, Buyer P's 14-year-old daughter is the beneficial owner of a £150,000 cottage in Powys (held on bare trust by Buyer P's mother as trustee for the daughter; gifted by the grandmother in 2024).

- **Test under SDLT (counterfactual)**: FA 2003 Sch 4ZA para 12 would attribute the daughter's cottage to Buyer P (as the parent), triggering the 5% SDLT additional-dwellings surcharge on the Swansea purchase (£20,000 surcharge on top of standard SDLT).
- **Test under Welsh LTT (actual)**: LTTA 2017 Sch 5 has no direct minor-children attribution. The daughter is the beneficial owner; Buyer P is not the legal-title holder OR the beneficial owner of the cottage; the grandmother (as trustee) holds legal title but has no beneficial interest. Therefore, NO dwelling is attributable to Buyer P. The Swansea purchase attracts only the main residential rates: £225,000 at 0% + £175,000 at 6% = £10,500.
- **Operational point:** The minor-children divergence is material. The Welsh family-and-trust structure is materially more favourable than the equivalent English structure for parent-purchasing scenarios. Cross-border families and cross-border legal advisers must respect the jurisdictional difference. WRA published guidance should be consulted for any subsequent statutory amendment.

### Worked example 3: bare-trust beneficiary triggers higher rates

A buyer ("Buyer Q") purchases a £380,000 main residence in Llanelli on 15 June 2026 (effective date). Buyer Q is the named beneficiary of a bare trust over a £220,000 cottage in Conwy, established by his late father's will in 2019 (trustees are Buyer Q's mother and a family solicitor; Buyer Q is the sole beneficial owner; the dwelling is currently let to tenants).

- **Test:** the bare-trust beneficial-ownership principle treats Buyer Q as owning the Conwy cottage for the higher-rates test. The legal-title trustees do not also count it; the dwelling attaches solely to the beneficial owner (Buyer Q). The £220,000 cottage exceeds the £40,000 threshold; the higher-rates test engages.
- **Result:** higher rates apply on Buyer Q's Llanelli purchase. Higher-rates table: £180,000 at 5% = £9,000; £70,000 at 8.5% = £5,950; £130,000 at 10% = £13,000. Total higher-rates LTT = £27,950. Standard rates (counterfactual) would have been £225,000 at 0% + £155,000 at 6% = £9,300; the differential is £18,650.
- **Operational point:** beneficial ownership under bare trust triggers attribution. Replacement-of-main-residence relief (Sch 5 para 8) is unavailable because the Conwy cottage has been let for years and is not Buyer Q's main residence. The only way to avoid the higher rates would be a genuine disposal of the bare-trust beneficial interest (e.g. via deed of variation or assignment) pre-completion.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9. Key per-page anchors: §23.2 primary; §23.8 + §23.11 secondary; §16.35 per-write verification on Sch 5 paras 5 and 8 verbatim, on the minor-children attribution gap, and on FA 2003 Sch 4ZA para 12 for the comparator.

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
