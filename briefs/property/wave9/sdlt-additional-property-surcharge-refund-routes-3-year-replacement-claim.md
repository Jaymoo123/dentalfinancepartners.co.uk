# Wave 9 brief: sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim

**Site:** property
**Bucket:** A (SDLT — MDR abolition + 5% surcharge mechanics + mixed-use rates line)
**Session:** A
**Pick ID:** A2
**Brief type:** Net-new page
**Stage:** 2 (full brief — Stage 1b HP-lock §1.I closed; framing + URLs + FAQ + worked examples + authority links populated 2026-05-25)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-additional-property-surcharge-refund-routes-3-year-replacement-claim`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (SDLT — 5% surcharge mechanics)
- **Cannibalisation classification:** partial overlap (top score 0.36 against `sdlt-5-percent-surcharge-refund-claim-process`) — **mandatory differentiation discipline below**.

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing page `sdlt-5-percent-surcharge-refund-claim-process` covers the **HOW-TO-CLAIM PROCESS** (the SDLT refund form mechanics, the 12-month claim window from disposal, the documentation HMRC requires). It is a process / form / window page.

THIS new page (A2) is deliberately ORTHOGONAL and covers the **REFUND ROUTES architecture** (the SCENARIOS that trigger refund eligibility) plus the **3-year replacement-window MECHANICS** (the statutory architecture of Sch 4ZA paras 3(6)-(7B) plus the chain-break, probate, divorce, repossession edge cases). It is a scenarios / eligibility / edge-cases page.

**Hard rule:** A2 must explicitly cross-link the existing process page as "the practical claim form companion" and must NOT re-explain the SDLT refund form mechanics. A2's territory is: which scenarios qualify; how the 3-year window starts and ends; what counts as "previous main residence" disposal for the refund; sale-delay scenarios (probate, divorce, chain-break, repossession); married-couple aggregation edge cases on the disposal-side.

### Framing differentiator (Stage 2, 2026-05-25)

> A landlord and second-home-buyer walk-through of the SDLT additional-dwellings surcharge refund architecture under FA 2003 Schedule 4ZA. **Current rate is 5% (raised from 3% by FA 2025 s.51(1)-(2) effective 31 October 2024 — note: the Autumn 2024 Budget rate change was enacted by FA 2025 c.8, NOT FA 2024; per HP §1.I Stage 1b correction of the §1 main historical 3% reference and of the Wave 9 Stage 1 seed's "F(No.2)A 2024" attribution).** Verified at https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA on 2026-05-25 per HP §1.I lock. The page covers four things the existing claim-process companion does NOT: (a) the **refund ROUTES** — discrete scenarios that trigger eligibility (replacement of main residence with sale-delay of old PPR; chain-break sale where old PPR disposal lags new PPR purchase; divorce-driven property splits where the leaving spouse retains a residual interest pending decree; probate-delayed disposal of inherited old PPR; repossession-route disposal of old PPR); (b) the **3-year replacement-window mechanics** under Sch 4ZA **para 3(7A)(a)** ("the period of three years beginning with the day after the effective date" of the higher-rate transaction; per HP §1.I lock — verify verbatim at write time per §16.35), plus the discretionary HMRC extension route under Sch 4ZA **para 3(7B)** for exceptional circumstances (typically COVID-era delays, conveyancing-chain failure, market freeze); (c) the **refund claim window mechanics** — within 12 months of the disposal of the prior residence OR within 12 months of the SDLT return filing date, whichever is LATER (the dual-clock that catches buyers who think only the disposal date matters); (d) the **married-couple + civil-partner aggregation edge cases on the disposal side** — spousal aggregation under Sch 4ZA para 9 means BOTH spouses must have disposed of their respective interests in the old main residence for the refund to be eligible; the "previous main residence" must have been the only-or-main residence at some point in the three years before the new acquisition of BOTH spouses (cross-link existing `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` for the purchase-side aggregation). Page is NOT a how-to-claim-process page (existing companion handles that); it IS an eligibility-routes + 3-year-clock + edge-cases page.

**Stage 1b HP-lock note:** HP §1.I locked 2026-05-25 (commit 9285495) closes F-2 from Wave 9 Stage 1b. The §1.I lock contains the **critical Stage 1b correction**: the 3%-to-5% rate change is **FA 2025 s.51(1)-(2)**, NOT FA 2024 / F(No.2)A 2024. The Autumn 2024 Budget on 30 October 2024 was enacted in the following parliamentary session as FA 2025 c.8. Per §1.I "practical writing rule for A2": lead with the 5% current rate + statutory authority (correcting any "still 3%" confusion); then the 3-year window mechanic + statutory anchor (para 3(7A)(a)); then the refund claim mechanics + time limits; then the exceptional-circumstances extension route. Cross-link the existing process page for the basic process; A2 is the architecture + edge-case page.

**Pool-thinness disclosure:** Competitor coverage of the 5% surcharge refund is heavily skewed to the claim-form / 12-month-deadline angle. The defensible point for A2 is the **scenarios architecture** (chain-break, probate, divorce, repossession) combined with the spousal-aggregation-on-disposal-side edge cases + the para 3(7B) exceptional-circumstances extension route. Plus the corrected statutory attribution (FA 2025 s.51, not FA 2024) — many competitor pages still attribute the 5% rate to FA(No.2) 2024 or are unclear on the enacting statute; A2's statutory precision is a defensible point.

---

## Competitor URLs (Stage 2 populated 2026-05-25; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) statutory attribution of the 3%-to-5% rate change (FA 2025 s.51 vs FA(No.2) 2024 — flag misattribution); (b) 3-year clock start date (acquisition effective date per FA 2003 s.119 vs completion vs SDLT filing date — verify against statute); (c) spousal-aggregation-on-disposal-side edge case (most competitors omit); (d) discretionary HMRC extension under para 3(7B) (most omit); (e) probate / divorce / repossession scenario treatment (typically thin); (f) refund-claim window dual-clock (12 months from disposal OR 12 months from SDLT filing, whichever later — easy to misframe as 12 months from disposal only). Flag any "surcharge is 3%" misframes for the drift-catch list — this is a common stale-content pattern on pre-October-2024 pages.

- https://www.saffery.com/insights/articles/sdlt-additional-rate-refund/
- https://www.bdo.co.uk/en-gb/insights/tax/property/sdlt-higher-rate-additional-dwellings
- https://www.forbesdawson.co.uk/insights/sdlt-additional-property-surcharge-refund/
- https://www.boodlehatfield.com/insights/sdlt-second-home-surcharge-refunds/
- https://www.cornerstonetax.co.uk/sdlt-second-home-surcharge-refund/

**Borrowable patterns (subject to verification):** competitor scenario-walkthroughs (chain-break, divorce, probate — verify the statutory analysis is correct); competitor 3-year-clock diagrams (verify the start-date is acquisition effective date per FA 2003 s.119).

**Reliability notes:**
- Saffery / BDO / Forbes Dawson / Boodle Hatfield are reliable for statutory framing; typically thinner on the para 3(7B) extension route and spousal-aggregation-on-disposal-side edge cases.
- Cornerstone Tax / Patrick Cannon / Stamp Duty Claims: aggressive claims-firm content; surface for SERP/competitor mapping but **flag any "you may be entitled to a refund of £X" framing** that overstates eligibility. PTP voice discipline (per HP framing) is the conservative-realism position, not the aggressive-claim posture.

---

## GSC data

*Net-new page; primary topical queries expected: "SDLT 5% surcharge refund", "second home stamp duty refund routes", "3 year replacement of main residence SDLT", "SDLT refund chain break", "SDLT refund divorce", "SDLT additional rate refund window", "SDLT extension exceptional circumstances HMRC", "stamp duty surcharge refund probate".*

---

## Closest existing pages (cannibalisation context)

From `wave9_cannibalisation_check.md`:
- **`sdlt-5-percent-surcharge-refund-claim-process` (0.36 — partial overlap)** — the HOW-TO-CLAIM-PROCESS companion. **Mandatory cross-link** as "the practical claim form companion"; A2 does NOT re-explain the claim form. A2 covers scenarios + 3-year window + edge cases.
- `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers` (0.16) — Scottish ADS companion (separate jurisdiction; LBTT ADS is 8% post-5-December-2024 per HP §1; mention for cross-border buyers).
- `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics` (0.15) — Welsh LTT separate regime; coincidental "refund" keyword.
- `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` (0.15) — **purchase-side spousal-aggregation companion**; A2 covers DISPOSAL-side aggregation. Cross-link explicitly.

**Cannibalisation discipline:**
- **Hard cross-link** to `sdlt-5-percent-surcharge-refund-claim-process` (claim form companion) in opening + closing.
- **Hard cross-link** to `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` (purchase-side aggregation companion) in the spousal-aggregation H2.
- Cross-link Scottish ADS page for cross-border buyers.
- Vary persona figures from the existing process page (do not re-use the same chain-break-couple example; pick fresh personas — divorce-driven, probate-delayed, repossession).

---

## Redirect overlap (on launch)

No existing slug matches A2's scope. **Session to scan `middleware.ts` for any `surcharge-refund` or `additional-dwelling-refund` token redirects pre-launch; if found, repoint to A2.**

---

## Authority links worth considering (Stage 2 populated 2026-05-25; session selects 6-8)

**Statutory (legislation.gov.uk):**
- FA 2003 Schedule 4ZA (Higher rates for additional dwellings — full text): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA
- FA 2003 Sch 4ZA para 3 (Condition C, the "previous main residence" replacement test, incl. paras 3(6)-(7B)): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA/paragraph/3
- FA 2003 Sch 4ZA para 8 (refund claim mechanics where prior PPR sold within window): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA/paragraph/8
- FA 2003 Sch 4ZA para 9 (joint-purchaser + spouse / civil-partner aggregation): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA/paragraph/9
- FA 2025 s.51 (3%-to-5% rate change effective 31 October 2024 per HP §1.I correction; verify enacting Act and section): https://www.legislation.gov.uk/ukpga/2025/8/section/51
- FA 2003 s.80 (return amendment time-limit interaction with Sch 4ZA refund window): https://www.legislation.gov.uk/ukpga/2003/14/section/80
- FA 2003 s.119 (effective date — load-bearing for 3-year clock start): https://www.legislation.gov.uk/ukpga/2003/14/section/119
- FA 2003 Sch 11A (overpayment relief — adapted by Sch 4ZA refund regime): https://www.legislation.gov.uk/ukpga/2003/14/schedule/11A

**HMRC manuals + guidance:**
- HMRC SDLT Manual SDLTM09730+ (higher rates for additional dwellings): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm09730
- HMRC SDLT Manual SDLTM09750+ (replacement of main residence + refund): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm09750
- HMRC SDLT Manual SDLTM09812+ (spouse / civil-partner cases for additional-dwellings surcharge): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax/sdltm09812
- gov.uk: apply for SDLT refund on additional property surcharge: https://www.gov.uk/government/publications/stamp-duty-land-tax-apply-for-a-repayment-of-the-higher-rates-for-additional-properties
- gov.uk SDLT calculator (current rates including surcharge): https://www.gov.uk/stamp-duty-land-tax

**Professional-body commentary (verify currency at fetch):**
- CIOT response on the FA 2025 surcharge increase (consultation + commencement): https://www.tax.org.uk/
- ICAEW Tax Faculty briefing on additional-dwellings surcharge refund routes: https://www.icaew.com/insights/tax-news

**Cross-references in house_positions.md:**
- **§1.I primary anchor** (Wave 9 Stage 1b lock 2026-05-25 — 5% surcharge correction to FA 2025 s.51 + refund routes + 3-year-window + para 3(7B) extension).
- §1.D (Wave 7 lock) — Sch 3 para 3 spouse/civil-partner transfer-on-divorce exemption (adjacent but separate; sessions must not conflate Sch 3 para 3 dissolution exemption with Sch 4ZA refund mechanics).
- §1 main text — historic 3% rate framing (pre-§1.I); §1.I supersedes for current rate.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify FA 2025 s.51(1)-(2) as the enacting statute for the 3%-to-5% rate change (per HP §1.I correction): https://www.legislation.gov.uk/ukpga/2025/8/section/51
- Verify FA 2003 Sch 4ZA para 3(7A)(a) verbatim text on the 3-year window: https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA/paragraph/3
- Verify FA 2003 Sch 4ZA para 3(7B) on the exceptional-circumstances HMRC extension route.
- Verify FA 2003 Sch 4ZA para 8 refund-claim mechanics; verify Sch 4ZA para 9 spousal-aggregation provisions.
- Verify FA 2003 s.80 amendment time-limit (12 months from filing date) interaction with Sch 4ZA refund window — the dual-clock framing.
- Verify FA 2003 s.119 effective-date definition (3-year clock starts on effective date of higher-rate transaction).
- Verify the current Table A rates (5%/7%/10%/15%/17%) per HP §1.I against gov.uk SDLT calculator at write time per §16.27 rate-by-reference.
- Verify HMRC SDLTM09730+, SDLTM09750+, SDLTM09812+ current state.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, specific. Exact figures, named legislation, statutory paragraph references.
- Anonymised personas only.
- **Tone discipline (per HP §1.I framing):** present refund eligibility as conditional on meeting statutory tests. Do NOT use aggressive claims-firm framing ("you may be entitled to a refund of £X" / "thousands of buyers overpay"). PTP's positioning is the eligibility-architecture-realism position.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise replacement-of-main-residence buyer + recently-divorced spouse + executor / personal representative + chain-break frustrated buyer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the 3-year clock mechanics section (planning-intent for buyers mid-acquisition).
  - After the chain-break / probate / divorce scenarios section (high-intent: frustrated chain-break or probate buyer).
  - After the spousal-aggregation-on-disposal section (high-intent: divorce-context buyer).
- Vary opening; do NOT lead with "The 5% additional dwellings surcharge...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. See **Draft FAQ entries** section below.

### Cannibalisation
- Cross-link `sdlt-5-percent-surcharge-refund-claim-process` (claim form companion).
- Cross-link `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules` (purchase-side companion).
- Cross-link Scottish ADS page (cross-border).

### House positions
- §1.I primary anchor (now LOCKED, Wave 9 Stage 1b).
- §1.D secondary anchor (Sch 3 para 3 divorce-exemption — adjacent but distinct).

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **refund-routes + 3-year-clock-mechanics + para 3(7B) extension + spousal-aggregation-on-disposal + dual-clock claim window** architecture. Write to it.
- Vary H2s from the existing process companion; structure around scenarios-and-edge-cases, NOT around "How to fill in the refund form".

---

## Draft FAQ entries (Stage 2 populated 2026-05-25; session may rewrite or expand)

Target 10-12 FAQs. Draft set below; session adapts wording, ensures no duplication of body H2/H3 phrasing, and expands or contracts as needed for FAQPage schema cleanliness.

1. **What is the current SDLT additional-dwellings surcharge rate?**
   The surcharge is **5%** on top of standard residential rates, applied to the full consideration. The rate was raised from 3% to 5% by FA 2025 s.51(1)-(2) effective for transactions with an effective date on or after 31 October 2024. Note: the Autumn 2024 Budget on 30 October 2024 was enacted in the following parliamentary session as Finance Act 2025 (c. 8), not Finance Act 2024.

2. **When does the 3-year window for a refund start?**
   The window starts the day after the **effective date** of the higher-rate transaction per FA 2003 Sch 4ZA para 3(7A)(a). "Effective date" under FA 2003 s.119 is the earlier of completion or substantial performance. The disposal of the prior main residence must happen within that 3-year window for the refund to be available (subject to the discretionary HMRC extension at para 3(7B)).

3. **Can I get an extension if my old home does not sell within the 3-year window?**
   Yes, but the extension is **discretionary and exceptional**. FA 2003 Sch 4ZA para 3(7B) allows HMRC to extend the period where the prior residence could not be sold within the standard window due to **exceptional circumstances**. Examples HMRC has accepted: COVID-era market closure, conveyancing-chain collapse just before completion, force-majeure events. Routine market delay or buyer choice to hold the property is NOT exceptional. Extension requires an application; not granted automatically.

4. **What counts as disposal of the previous main residence?**
   A genuine transfer of beneficial interest. Sale to a third party with completion is the standard case. Transfer to a spouse on divorce is a disposal for these purposes (subject to the divorce / dissolution mechanics under Sch 3 para 3, which sit alongside Sch 4ZA — sessions writing notes the separate operating fields). Gift to a family member is a disposal if effective transfer of beneficial ownership occurs. Repossession by a lender is a disposal (occurring on the lender's sale, not on the repossession order). Abandonment or dereliction without transfer is NOT a disposal.

5. **My old home is delayed on probate. Does the refund still apply?**
   The 3-year clock runs from the effective date of the new acquisition regardless of probate delay on the old PPR. If probate-delayed sale of the old PPR completes within the 3-year window, the refund is available. If the delay pushes the disposal beyond 3 years, the para 3(7B) discretionary extension may be available where the probate delay is documented as outside the buyer's control (typical exceptional-circumstances territory). Speak to an SDLT adviser early; do not assume automatic relief.

6. **I am married. Do both my spouse and I need to dispose of the old home?**
   Yes. FA 2003 Sch 4ZA para 9 aggregates spouses and civil partners for the additional-dwellings surcharge. Both spouses must have disposed of their respective interests in the old main residence for the replacement-of-main-residence refund to be available. If one spouse retains a residual interest in the old PPR (common in divorce-pending scenarios), the refund may be denied or partial. The "previous main residence" test under Sch 4ZA para 3 also applies to BOTH spouses — both must have used the old PPR as their only-or-main residence at some point in the relevant three-year period before the new acquisition.

7. **What is the time limit for actually claiming the refund?**
   The refund claim must be made within **12 months of the disposal of the prior main residence** OR within **12 months of the filing date of the original SDLT return**, whichever is **LATER**. This dual-clock catches buyers who think only the disposal date matters. Sch 4ZA para 8 + FA 2003 Sch 11A overpayment-relief regime applies. Late claims past the dual-clock outer limit are time-barred (with limited discretionary HMRC consideration).

8. **Does the chain-break / failure-to-sell scenario qualify automatically?**
   No. The refund is available if the old PPR is **actually disposed of** within the 3-year window. A chain-break that delays sale within the 3-year window is fine — refund follows the eventual sale. A chain-break that defers sale beyond 3 years requires the para 3(7B) discretionary extension; HMRC may accept (chain failure is documented exceptional cause in HMRC guidance), but it is application-based, not automatic.

9. **What about divorce-pending cases where my spouse retains an interest in the old home?**
   The spousal-aggregation rule (Sch 4ZA para 9) requires BOTH spouses to have disposed of their interests for the refund. In divorce-pending cases, the practical question is: at what point does the leaving spouse cease to have a relevant interest in the old PPR? The Sch 3 para 3 dissolution exemption (per HP §1.D) operates alongside Sch 4ZA para 9 but does not collapse the aggregation. Specialist advice essential; the timing of decree absolute + the financial-remedies settlement order matter materially.

10. **I bought my new home in 2023 and paid the 3% surcharge. My old home sold in 2025. What refund applies?**
    The refund is computed on the surcharge rate that applied at the effective date of the higher-rate transaction (your 2023 purchase, which was the 3% rate, not the 5% rate that took effect 31 October 2024). The refund equals the surcharge SDLT actually paid on the higher-rate transaction; rate changes that postdate the original transaction do not retrospectively uplift the refund.

11. **What is the difference between a Sch 4ZA refund and an amended SDLT return under FA 2003 s.80?**
    They are different routes. FA 2003 s.80 is the standard 12-month return-amendment window from the filing date. Sch 4ZA refund is a separate statutory route for the additional-dwellings refund specifically (12 months from disposal OR 12 months from filing, whichever is later). If a buyer needs to amend the SDLT return for other reasons within 12 months of filing, that is s.80; if a buyer is claiming the Sch 4ZA refund following an eventual disposal of the old PPR, that is the Sch 4ZA route.

12. **What evidence do I need for a Sch 4ZA refund claim?**
    Standard pack: (a) sale completion statement for the old main residence (date + consideration + buyer); (b) SDLT5 certificate for the higher-rate transaction; (c) evidence that the disposed property was your (and your spouse's, if married) only-or-main residence at some point in the relevant three-year period (utility bills, council tax records, electoral roll, GP registration, employment correspondence at the property address); (d) documentation of any exceptional circumstances if claiming a para 3(7B) extension. HMRC may request further evidence on enquiry; the burden of proof is on the buyer to evidence the "previous main residence" status of the disposed property.

---

## Worked examples (Stage 2 drafted 2026-05-25; session may adapt personas + figures)

Three illustrative scenarios. Use anonymised personas (no real names; sector + persona-type only). Vary persona figures from the existing claim-process companion page.

### Worked example 1: chain-break refund win within the 3-year window

A couple ("Buyers D and E") complete on a £650k replacement main residence on 15 March 2024 (effective date). Their old PPR (£420k) was due to complete on 12 March 2024 but the onward-chain buyer pulled out three days before. Buyers D and E proceed with the new purchase and pay surcharge SDLT at 3% (£12,600 on top of standard SDLT — note the transaction was pre-31-October-2024 so the 3% rate applied). The old PPR re-lists immediately and completes on 28 October 2024.

- **Test:** disposal of old PPR (28 October 2024) is within the 3-year window beginning on 16 March 2024 (day after the effective date per Sch 4ZA para 3(7A)(a)).
- **Result:** refund of the £12,600 surcharge is available. Claim window: 12 months from disposal (so by 27 October 2025) OR 12 months from filing date of the original SDLT return, whichever is LATER.
- **Operational point:** standard refund route. Evidence pack: sale completion statement for the old PPR; SDLT5 for the new purchase; main-residence evidence for the old PPR (utility bills, council tax, electoral roll). No para 3(7B) extension needed.

### Worked example 2: divorce-pending sale-delay, spousal-aggregation block

A separating couple ("Buyers F and G") complete on a £580k new home for Buyer F on 10 January 2025 (effective date; post-31-October-2024 so the 5% rate applies; surcharge SDLT £29,000). Buyer G remains in the old PPR pending decree absolute. The old PPR is in joint legal ownership (50/50). The financial-remedies order, transferring Buyer G's interest in the new house and Buyer F's interest in the old PPR, is finalised in November 2026 (22 months after the new acquisition). The old PPR is then sold to a third party in March 2027 (26 months after the new acquisition).

- **Test:** disposal of Buyer F's interest in the old PPR occurred in November 2026 (financial-remedies order transferring legal title). Disposal of Buyer G's interest in the old PPR (eventual sale to third party) occurred in March 2027.
- **Result:** under Sch 4ZA para 9 spousal aggregation, BOTH spouses must dispose of their interests. The November 2026 inter-spouse transfer is Buyer F's disposal; the March 2027 third-party sale is Buyer G's disposal. Both occur within the 3-year window (3 years from 11 January 2025 = 10 January 2028). Refund of the £29,000 surcharge is available.
- **Operational point:** the spousal-aggregation discipline (Sch 4ZA para 9 + the divorce-dissolution interaction under Sch 3 para 3 per HP §1.D) requires careful sequencing. Had the third-party sale slipped to February 2028 (within window) versus March 2028 (outside window), the timing analysis would matter materially. Specialist sequencing advice essential at the financial-remedies stage.

### Worked example 3: probate-delayed sale, para 3(7B) extension required

A buyer ("Buyer H") inherits her father's house in early 2023 (his death; grant of probate June 2023). She moves in as her only-or-main residence in October 2023. She acquires a new main residence on 5 April 2024 (effective date; pre-31-October-2024 so 3% surcharge rate applies; surcharge SDLT £15,000 on a £500k purchase). The inherited property has been subject to a delayed estate-administration dispute (sibling beneficiary contested aspects of the will), preventing sale. The dispute resolves in August 2027 and the inherited property is sold in October 2027 (30 months after the new acquisition; the 3-year window closed on 4 April 2027).

- **Test:** disposal of the old PPR (October 2027) is OUTSIDE the standard 3-year window (closed 4 April 2027 per Sch 4ZA para 3(7A)(a)).
- **Result:** standard refund route NOT available. Buyer H must apply for a Sch 4ZA para 3(7B) discretionary HMRC extension citing the contested-estate-administration dispute as exceptional circumstances. Outcome depends on HMRC discretion; documented inability-to-sell due to litigation outside the buyer's control is the type of case the para 3(7B) extension was designed for, but no statutory right.
- **Operational point:** the para 3(7B) extension is the safety-valve for cases like this, but it is **discretionary** and application-based. Apply EARLY (do not wait until the 3-year window expires); provide full evidence of the exceptional circumstances; engage specialist representation if HMRC initially refuses. Routine market delay (the old PPR did not sell at the asking price) is NOT exceptional under the case-law and guidance position; genuinely-out-of-buyer's-control delays are.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §1.I primary mandatory; §1.D secondary (do not conflate); §16.35 per-write verification on FA 2025 s.51, FA 2003 Sch 4ZA paras 3, 8, 9, 11, FA 2003 s.80, s.119, and HMRC SDLTM09730+/SDLTM09750+/SDLTM09812+ current state.

## Session-side watcher pattern

Standard per NETNEW_PROGRAM §8.4. After raising any Q at `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_A.md` (absolute path; per §16.15 + §16.37 critical discipline), arm a single Monitor task watching for STATUS flip to answered. Continue working on another page meanwhile.

---

## Per-page work-log (session fills during work)

### Decisions
- Final slug:
- Final category:
- H1 chosen:
- Meta title chosen (<=62 chars):
- Meta description (<=158 chars):
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

### Flags raised to wave9_site_wide_flags.md
-

### 2-3 sentence summary
-
