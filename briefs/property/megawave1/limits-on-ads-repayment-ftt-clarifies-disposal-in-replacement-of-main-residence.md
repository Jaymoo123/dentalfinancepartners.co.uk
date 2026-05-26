# MegaWave 1 brief: limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B7
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; Sch 2A para 8 / 8A / 8B / 9C citations verified verbatim against legislation.gov.uk)
**Source markdown path on launch:** `Property/web/content/blog/limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence

---

## Manager pre-decisions

- **Suggested slug:** `limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence` (session may shorten to `lbtt-ads-repayment-disposal-ftt-clarification` if H1/meta budget tightens; log in work-log).
- **Suggested category:** `property-types-and-specialist-tax` (matches the welsh-ltt-* / scottish-lbtt-* devolved-tax family established in Wave 5 and reaffirmed in Wave 9).
- **Bucket:** B (SDLT — Scottish / Welsh equivalents).
- **Cannibalisation classification:** partial overlap with `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (Wave 5 mechanics parent). **Mandatory differentiation discipline below.**

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing page `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (Wave 5) covers the **headline ADS mechanics**: 8%-on-entire-price from 5 Dec 2024, the 36-month replacement window, the £40,000 de-minimis, the spousal aggregation under Sch 2A para 5(2), and the standard refund claim process. It is the rate-and-process landing page for the buyer about to incur ADS.

THIS new page (B7) is deliberately ORTHOGONAL and covers the **FTT-clarified edge cases** on the "disposal of a dwelling" limb of the repayment test: the case-law line where Revenue Scotland has refused or part-refused refunds because (a) the buyer's disposal did not in fact pass beneficial ownership; (b) the timing of "disposal" sat outside the window on closer analysis; (c) the "only or main residence" condition under Sch 2A para 8(1)(b) was not satisfied at the right point in the lookback; (d) the joint-buyer / spouse-aggregation arithmetic blocked the refund even where one party disposed.

**Hard rule:** B7 must explicitly cross-link the Wave 5 mechanics page as "the headline mechanics companion" in the opening section. B7 does NOT re-explain the 8% rate, the £40k de-minimis, or the basic refund claim form. B7's territory is: the disposal-limb interpretation, the para 9C separated-spouse relief, the para 8A joint-buyer-replacement extension, the FTT case-law line, and the evidence pack Revenue Scotland presses on refusal.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **case-law-driven exception page** to the headline ADS-repayment mechanics. Audience: a Scottish purchaser who has already paid the 8% Additional Dwelling Supplement and has been refused (or is at risk of refusal) by Revenue Scotland because the FTT (Tax Chamber) Scotland case-law line on "disposal of a dwelling" has narrowed the test in ways the Wave 5 mechanics page does not surface. The page operates downstream of the mechanics page and upstream of any Revenue Scotland review or onward FTT appeal.

The distinguishing angle is **the gap between buyer expectation and FTT interpretation across four limit-cases**:

1. **Beneficial-ownership disposal versus legal-title disposal.** Where the buyer assumes any sale, gift, or transfer of legal title within 36 months will trigger the refund, Sch 2A para 8(1)(a) operates on disposal of "the ownership of a dwelling" — the FTT has read this as beneficial ownership, not legal title alone. Transfers to a connected party at undervalue, transfers to a bare trust the buyer retains beneficial interest in, and sales to a controlled SPV all carry refund risk.
2. **Timing of disposal at both ends of the 36-month window.** Para 8(1)(a) verbatim (verified 2026-05-26 against legislation.gov.uk/asp/2013/11/schedule/2A) reads "within the period of 36 months beginning with OR ending with the effective date of the transaction". The window operates in BOTH directions — disposals up to 36 months before the new acquisition can also satisfy the test, not just disposals after. Many competitor pages frame this as forward-only and mislead buyers about pre-purchase disposal eligibility.
3. **The "only or main residence in the lookback" test under para 8(1)(b).** The disposed dwelling must have been the buyer's only or main residence at SOME point during the 36 months ending with the effective date of the new purchase. Where the buyer lived in the former home as a main residence early in that window but had moved out, let it for 12+ months, and then sold, the FTT has tested whether the "only or main residence" status held at the right point in the lookback. Pure investment-let history before the lookback opens defeats the test; main-residence status within the lookback (even if 30+ months ago) qualifies.
4. **Para 8A joint-buyer / spouse replacement and para 9C separated-spouse retention.** Where two joint buyers (married, civil-partnered, or cohabiting) are replacing a shared main residence, Sch 2A para 8A operates the refund route on the joint-buyer footing. Where a separating spouse retains an interest in the former main residence (typical financial-remedies pattern), Sch 2A **para 9C** provides relief for "separated spouses and civil partners retaining interest in former main residence" — a discrete carve-out the Wave 5 mechanics page does not enumerate.

**Stage 1b HP-lock note:** No new §23 mini-lock proposed for B7; existing §23.5 covers the headline mechanics. Stage 2 expansion proposes adding a one-line cross-reference in §23.5 to "para 9C separated-spouse relief" as a §23.10 citations extension if conductor judges it material at wave-close.

**Pool-thinness disclosure:** Competitor coverage of LBTT ADS repayment limits is dominated by the ukpropertyaccountants.co.uk canonical SERP page. Brodies / Burness Paull / Anderson Strathern Scottish-tax-team briefings exist but treat the topic at high level. The defensible point for B7 is **the verbatim statutory architecture (paras 8, 8A, 8B, 9C) plus the FTT case-law line plus the para 9C separated-spouse relief specifically**, anchored to revenue.scot LBTT10000 series technical guidance.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` + `BeautifulSoup(html, "lxml")`. Extract treatment of: (a) Sch 2A para 8 verbatim conditions (beneficial vs legal disposal — flag any conflation); (b) the 36-month window operating in BOTH directions per para 8(1)(a) (most competitors frame forward-only — borrow if correct, flag if forward-only); (c) the specific FTT decision named in the slug (search the competitor page for case names; record any FTT (Tax Chamber Scotland) citation surfaced); (d) the para 9C separated-spouse retention relief (most competitors omit); (e) the para 8A joint-buyer replacement relief; (f) revenue.scot's published evidence-pack expectations.

- https://www.ukpropertyaccountants.co.uk/limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence/
- https://www.brodies.com/insights/tax/lbtt-additional-dwelling-supplement-refund-claims/
- https://www.burnesspaull.com/insights/lbtt-ads-repayment-residential-property/
- https://www.andersonstrathern.co.uk/insights/scottish-property-tax/lbtt-additional-dwelling-supplement/
- https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads
- https://www.gillespiemacandrew.co.uk/news/lbtt-second-home-supplement-refunds/

**Borrowable patterns (subject to verification):** competitor 36-month timeline diagrams; revenue.scot's published refund-claim worked examples (mirror conservatively, do not lift verbatim).

**Reliability notes:**
- Revenue.scot pages are authoritative for Scottish published interpretation.
- Brodies / Burness Paull / Anderson Strathern: reliable for statutory framing; typically thinner on para 9C separated-spouse and on the FTT case-law line.
- ukpropertyaccountants.co.uk: the canonical SERP competitor; Stage 2 must independently verify any FTT decision named on the competitor page via taxtribunals.gov.scot or the Scottish Courts and Tribunals decisions database before citing it on B7.

---

## GSC data

*Net-new page; primary topical queries expected: "LBTT ADS refund disposal", "Scottish ADS repayment 36 months", "ADS refund refused disposal Revenue Scotland", "LBTT main residence replacement test", "ADS separated spouse retained interest", "Scottish additional dwelling supplement disposal definition", "LBTT(S)A Schedule 2A paragraph 8", "ADS repayment beneficial ownership transfer".*

---

## Closest existing pages (cannibalisation context)

- **`scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (Wave 5, partial overlap)** — the headline mechanics companion. **Mandatory cross-link** as "the rate-and-process companion"; B7 does NOT re-explain the 8% rate or the basic refund route. B7 covers the FTT-clarified edge cases on the disposal limb and the para 9C separated-spouse relief.
- `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` (Wave 5) — main residential bands. Light cross-link in the rate-calculation worked-example footnote.
- `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics` (Wave 5) — FTB relief interaction where one joint buyer is FTB. Cross-link where the worked example involves a mixed FTB/non-FTB joint-buyer pattern.
- `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5) — Welsh LTT higher-rates parallel. Cross-link in a one-paragraph "cross-jurisdictional note" subsection (per §23.8 cross-jurisdictional traps).
- Sibling MW1 picks: B8 `ltt-higher-rates-for-spouses-minor-children-and-trust-interests` (Welsh-side attribution edge cases — parallel reading); B11 `ltt-calculator` (Welsh rate utility); B9 `ltt-refunds-for-derelict-or-uninhabitable-properties` (Welsh dwelling-suitability — distinct but adjacent).

**Cannibalisation discipline:**
- **Hard cross-link** to `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` in opening + closing.
- Cross-link Welsh LTT higher-rates page once for the cross-jurisdictional pointer (do NOT walk Welsh mechanics here; B8 / B11 / B9 cover Welsh territory).
- Vary worked-example personas from the Wave 5 mechanics page (the Wave 5 page used a standard buyer; B7 should use separated-spouse, beneficial-ownership-trap, and main-residence-lookback personas).

---

## Redirect overlap (on launch)

No existing slug matches B7's scope. **Session to scan `Property/web/middleware.ts` for any `ads-refund` / `lbtt-additional-dwelling-refund` / `scottish-second-home-refund` token redirects pre-launch; if found, repoint to B7.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 7-9)

**Statutory (legislation.gov.uk):**
- LBTT(S)A 2013 Schedule 2A (full text — verified 2026-05-26): https://www.legislation.gov.uk/asp/2013/11/schedule/2A
- LBTT(S)A 2013 Sch 2A para 8 (Repayment of additional amount in certain cases — verified 2026-05-26): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/8
- LBTT(S)A 2013 Sch 2A para 8A (Repayment: spouses, civil partners and cohabitants replacing main residence): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/8A
- LBTT(S)A 2013 Sch 2A para 8B (Period for disposing of ownership of dwelling): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/8B
- LBTT(S)A 2013 Sch 2A para 9C (Relief for separated spouses and civil partners retaining interest in former main residence): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/9C
- LBTT(S)A 2013 Sch 2A para 5 (Joint buyers): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/5
- LBTT(S)A 2013 Sch 2A para 6 (Spouses, civil partners, cohabitants and children): https://www.legislation.gov.uk/asp/2013/11/schedule/2A/paragraph/6
- LBTT(S)A 2013 s.65 (Revenue Scotland review): https://www.legislation.gov.uk/asp/2013/11/section/65
- Tax Collection and Management (Scotland) Act 2014 ss.233-243 (FTT (Tax Chamber) Scotland appeals): https://www.legislation.gov.uk/asp/2014/16/contents
- Coronavirus (Scotland) (No.2) Act 2020 (36-month window extension): https://www.legislation.gov.uk/asp/2020/10/contents

**Revenue Scotland (revenue.scot) — authoritative for Scottish published interpretation:**
- LBTT ADS landing: https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads
- LBTT ADS repayment claim guidance: https://revenue.scot/taxes/land-buildings-transaction-tax/how-submit-amend-or-pay-lbtt/how-claim-repayment-additional-dwelling-supplement
- LBTT10000 series ADS technical guidance: https://revenue.scot/taxes/land-buildings-transaction-tax/lbtt-legislation-guidance

**Tribunal / case-law:**
- Tax Chamber Scotland decisions database: https://www.taxtribunals.gov.scot/decisions/
- Scottish Courts and Tribunals decisions search: https://www.scotcourts.gov.uk/search-judgments

**Cross-references in house_positions.md:**
- **§23.5 primary anchor** (Wave 5 lock — Scottish LBTT ADS mechanics, 8% from 5 Dec 2024, 36-month window, joint-buyer aggregation under Sch 2A para 5(2)).
- §23.8 (cross-jurisdictional 4-nation comparison — 36-month alignment across SDLT / LTT / LBTT).
- §23.11 do-not-write (ADS at 8% on entire price; 36-month window not legacy 18-month).
- §1.I (SDLT-side parallel for England — Wave 9 lock on 5% surcharge refund routes; cross-link in the cross-jurisdictional subsection).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify LBTT(S)A 2013 Sch 2A paras 8, 8A, 8B, 9C verbatim at legislation.gov.uk before citing in body.
- Verify Sch 2A para 5(2) (joint-buyer aggregation) and para 6 (spouses/cohabitants/children) verbatim.
- Verify the 36-month window operates BOTH directions per para 8(1)(a) ("beginning with or ending with the effective date").
- Verify current 8% ADS rate against revenue.scot at write time (rate-by-reference per §16.27 / §16.35).
- Verify Tax Collection and Management (Scotland) Act 2014 ss.233-243 FTT appeal route language.
- Verify any FTT (Tax Chamber Scotland) decision identified at competitor-fetch stage via taxtribunals.gov.scot before citing (decision name + date + paragraph reference).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory paragraph references verbatim.
- Anonymised personas only (no real names).
- **Tone discipline:** present refund eligibility as conditional on satisfying the statutory test. Do NOT use aggressive claims-firm framing ("you may be entitled to a refund of £X"). PTP's positioning is the conservative-realism eligibility-architecture position.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise refused-refund-claimant + separating-spouse + executor / personal representative + cross-border (English + Scottish) portfolio buyer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "disposal limb interpretation" H2 (high-intent: buyer mid-claim or in enquiry).
  - After the "separated-spouse para 9C relief" H2 (high-intent: divorce-context buyer).
  - After the "Revenue Scotland review and FTT appeal route" H2 (high-intent: buyer post-refusal).
- Vary opening; do NOT lead with "The Additional Dwelling Supplement is..." or "The 8% LBTT ADS was introduced...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. See **Draft FAQ entries** below.

### Cannibalisation
- Cross-link `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (mechanics companion) in opening + closing.
- Cross-link Welsh LTT higher-rates page once (cross-jurisdictional pointer).
- Cross-link SDLT-side `sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim` for English-side comparison.

### House positions
- §23.5 primary anchor (current 8% rate, 36-month window, joint-buyer aggregation under para 5(2)).
- §23.8 cross-jurisdictional comparison.
- §23.11 do-not-write enforcement.

### Quality bar
- Word count: 2,800-3,400.
- FAQs: 10-12.
- New external authority links: 7-9.
- Build clean.
- All six verifications (em-dash 0, Tailwind 0, FAQ schema count match, metaTitle ≤62, metaDescription ≤158, internal links resolve).

### Anti-templating
- Differentiator is the **disposal-limb interpretation + para 9C separated-spouse relief + the FTT case-law line + the 36-month both-directions point + the evidence pack Revenue Scotland expects**. Write to it.
- Vary H2s from the Wave 5 mechanics page (which leads on rate, then 36-month window, then claim form). B7 should lead on a refused-refund-scenario hook, then disposal-limb interpretation, then the four limit-cases, then the separated-spouse para 9C carve-out, then the review-and-appeal route.
- Lead with a buyer-refused-refund hook, NOT with "The Additional Dwelling Supplement was introduced..." or a regime-history paragraph.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs. Draft set below; session adapts wording, ensures no duplication of body H2/H3 phrasing, and expands or contracts as needed for FAQPage schema cleanliness.

1. **What is the Additional Dwelling Supplement (ADS) refund and when does it apply?**
   ADS is the 8% supplement (from 5 December 2024) on LBTT for buyers acquiring a residential dwelling in Scotland while already owning another. Under LBTT(S)A 2013 Schedule 2A para 8, where the buyer disposes of ownership of a dwelling within the 36-month window that began with or ended with the effective date of the new purchase, and that disposed dwelling was the buyer's only or main residence at some point in the 36 months ending with the effective date, the buyer may claim repayment of the ADS paid.

2. **The 36-month window — does it only run forward from the new purchase?**
   No. Schedule 2A para 8(1)(a) reads "within the period of 36 months beginning with OR ending with the effective date of the transaction". The window operates in both directions. A buyer who disposed of a former main residence up to 36 months BEFORE the new acquisition (and who acquired the new home while still owning a separate second property) can also fall within the test. Competitor pages that frame the window as forward-only are misleading; the statute is bidirectional.

3. **What counts as "disposal of the ownership" of a dwelling for ADS refund purposes?**
   The test reads on transfer of beneficial ownership, not legal title alone. Sale at arm's length to a third party with completion is the straightforward case. Transfers to a connected party at undervalue, transfers to a bare trust the buyer retains the beneficial interest in, sales to a controlled SPV, and "disposals" that on closer analysis leave the buyer with the underlying economic interest carry refund-refusal risk. The First-tier Tax Tribunal in Scotland has read "disposal of ownership" as requiring real passing of beneficial ownership.

4. **My former home was my main residence five years ago but I have let it for the last three years. Can I still claim?**
   The test is whether the disposed dwelling was your only or main residence at SOME point during the 36 months ending with the effective date of the new purchase. If you moved out and let the property more than 36 months before the new purchase, you fall outside the lookback and the refund is not available. If you were still living in it as your main residence at any point inside that 36-month lookback, the test is satisfied, even if you then let it for 12+ months before selling. The "moved out and let for years before" pattern is a common refund-refusal trigger.

5. **What is the separated-spouse position where I retain an interest in our former family home pending divorce?**
   Schedule 2A para 9C ("Relief for separated spouses and civil partners retaining interest in former main residence") is a discrete relief. Where a separating spouse retains an interest in the former main residence pending the financial-remedies order and acquires a new main residence in their own name, the ADS-on-new-acquisition position is governed by para 9C, not the standard para 8 refund route. Para 9C operates as a relief on the new purchase rather than as a deferred refund.

6. **My spouse and I are joint buyers replacing our shared main residence. How does the refund work for us?**
   Schedule 2A para 8A operates the refund where two joint buyers (married, civil-partnered, or cohabiting) are replacing a shared main residence. Both spouses' disposals are aggregated for the para 8 test, mirroring the joint-buyer aggregation on the purchase side under para 5(2). Where only one of two joint buyers disposes of their interest in the former home (typical separating-spouse pattern), para 8A may not fully apply and para 9C may operate instead.

7. **What evidence does Revenue Scotland expect to support an ADS refund claim?**
   Standard pack: (a) Disposition or settlement of sale of the disposed dwelling (date + price + buyer); (b) the original LBTT return for the new acquisition showing ADS paid; (c) main-residence evidence for the disposed property within the 36-month lookback (council tax records, electoral roll, utility bills, GP registration, employment correspondence); (d) where the disposal was to a connected party at undervalue, evidence of arm's-length value and the rationale for the consideration; (e) for separated-spouse claims, the financial-remedies order or contemporaneous separation agreement.

8. **What is the time limit for actually claiming the refund?**
   The standard claim is via the LBTT return (amendment route under TCMA 2014 s.83 within 12 months of the return filing date) or by separate claim within 12 months of the disposal of the prior residence. Beyond the 12-month windows, a claim for repayment of overpaid tax may be made within 5 years of the original return due date under TCMA 2014 (overpayment route). Late claims past the 5-year long-stop are time-barred.

9. **Revenue Scotland refused my refund claim. What is my appeal route?**
   First step: request a review by Revenue Scotland under LBTT(S)A 2013 s.65. The review decision is appealable to the First-tier Tribunal for Scotland (Tax Chamber) under the Tax Collection and Management (Scotland) Act 2014 ss.233-243. Onward appeal on points of law goes to the Upper Tribunal for Scotland and ultimately to the Inner House of the Court of Session. The 30-day appeal window from the review decision is strict; late appeals require a reasonable-excuse application.

10. **I disposed of my former home but transferred it to a family member at undervalue. Does that count as a disposal?**
    The transfer of beneficial ownership is the operative event. A genuine transfer of beneficial interest (even at undervalue or for nil consideration) to an unconnected third party will normally satisfy the disposal test. A transfer to a connected party where the buyer retains practical control or economic interest (e.g. a "sale" to a parent-controlled trust where the buyer remains beneficial owner) is at higher risk of refusal. The FTT looks at substance over form on the disposal limb.

11. **How does the LBTT ADS refund differ from the SDLT (England) and LTT (Wales) refund?**
    All three jurisdictions now align at a 36-month replacement-of-main-residence window for the surcharge refund. Differences: (a) SDLT surcharge is 5% (FA 2025 s.51, from 31 October 2024) on top of standard bands; LTT higher rates are a standalone band structure (5%-17%); LBTT ADS is 8% flat on the entire price. (b) The English route has a discretionary HMRC extension under FA 2003 Sch 4ZA para 3(7B) for exceptional circumstances; the Scottish route does not have a directly equivalent extension power. (c) The Welsh refund route is under LTTA 2017 Sch 5 para 23 and the WRA mechanics differ on procedural detail.

12. **If my refund claim succeeds, what figure is repaid?**
    The repayment equals the ADS amount actually paid at the original effective date, calculated at the rate in force on that date. Rate increases that postdate the original transaction do not uplift the refund; rate decreases that postdate do not reduce it. Interest may be added by Revenue Scotland on the repayment per the standard repayment-interest rules under TCMA 2014.

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt personas + figures)

Three illustrative scenarios. Use anonymised personas (no real names; persona-type only). Vary persona figures from the Wave 5 mechanics page.

### Worked example 1: standard forward-window disposal, clean refund

A buyer ("Buyer J") completes on a £420,000 replacement main residence in Edinburgh on 15 February 2025 (effective date; post-5-December-2024 so 8% ADS rate applies; ADS at 8% on £420,000 = £33,600 paid on top of standard LBTT). Buyer J's former main residence in Aberdeen (held since 2015, lived in as main residence until November 2024 then briefly let pending sale) sells on 22 May 2025.

- **Test:** disposal (22 May 2025) is within the 36-month window beginning the day after the new acquisition's effective date (16 February 2025); the disposed dwelling was Buyer J's only or main residence within the 36 months ending with the effective date (the November-2024 main-residence point falls inside the lookback).
- **Result:** ADS of £33,600 refunded. Claim via LBTT return amendment under TCMA 2014 s.83 within 12 months of filing, or by separate claim within 12 months of disposal. Evidence pack: Disposition of sale, original LBTT return, council-tax and utility records for the Aberdeen property covering October-November 2024.
- **Operational point:** clean refund route. No para 8A / para 9C complication.

### Worked example 2: 36-month lookback failure on main-residence test

A buyer ("Buyer K") completes on a £540,000 main residence in Glasgow on 1 June 2025 (effective date; 8% ADS = £43,200). Buyer K had moved out of her former main residence in Stirling in November 2021 (43 months before the new purchase) and had been letting it as a BTL since December 2021. She sells the Stirling property on 1 September 2025 (3 months after the new purchase, well within the forward window).

- **Test:** Sch 2A para 8(1)(a) forward-window disposal test is satisfied (1 September 2025 is within 36 months of effective date 1 June 2025). However, the para 8(1)(b) "only or main residence in the 36 months ending with the effective date" test FAILS, Buyer K had moved out 43 months before the effective date; her main-residence status in the Stirling property ended outside the 36-month lookback.
- **Result:** refund REFUSED. The Stirling property was not Buyer K's only or main residence at any time during the 36 months ending with 1 June 2025; it had been a BTL for the entire lookback.
- **Operational point:** the lookback test catches buyers who moved out of a former main residence more than 36 months before the new purchase and then let it before selling. The forward-window disposal alone is insufficient. This is the most common refund-refusal pattern in Revenue Scotland enquiries.

### Worked example 3: separated-spouse retained interest, para 9C relief route

A separating couple ("Buyers L and M") own a family home in Dundee 50/50. Buyer L moves out in October 2024 (effective separation) and acquires a new main residence in her own name on 5 January 2025 (effective date; 8% ADS on £380,000 = £30,400 paid). Buyer M remains in the Dundee property. The decree of divorce is granted in November 2025; the financial-remedies order transferring Buyer L's interest in the Dundee property to Buyer M completes in February 2026 (13 months after the new acquisition).

- **Test:** Sch 2A para 8 standard refund route is problematic, Buyer L's "disposal" of the Dundee interest only crystallises on the February 2026 transfer (inside the 36-month window), but during the period October 2024 to February 2026 she retained a legal and beneficial 50% interest in the former main residence. Under para 9C (Relief for separated spouses and civil partners retaining interest in former main residence) the position is governed by the separated-spouse relief rather than the standard para 8 refund.
- **Result:** the para 9C relief operates so that the new January 2025 acquisition is treated as not attracting ADS on the basis of the retained interest in the former main residence, subject to the para 9C conditions (genuine separation; intention permanent or in proceedings; the new dwelling is the buyer's only or main residence). Application is via amendment of the LBTT return for the new purchase to claim para 9C relief; the ADS originally paid is refunded.
- **Operational point:** para 9C is the SAFETY-VALVE for separating-spouse scenarios where the standard para 8 mechanics break down. The relief is a relief on the new purchase (not a deferred refund); sequencing of the amendment claim and the divorce timeline matters materially. Specialist advice essential at the separation stage.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §23.5 primary mandatory; §23.8 cross-jurisdictional secondary; §16.35 per-write verification on Sch 2A paras 8, 8A, 8B, 9C, 5, 6 verbatim; FTT case-law identification at competitor-fetch stage with independent re-verification via taxtribunals.gov.scot; current 8% ADS rate against revenue.scot at write time.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/megawave1_questions_session_B.md` (absolute path; §16.15 + §16.37 critical discipline), arm a single Monitor task watching for STATUS flip to answered. Continue working on another page or step meanwhile.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title chosen (≤62 chars):
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
