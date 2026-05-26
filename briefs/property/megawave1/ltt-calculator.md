# MegaWave 1 brief: ltt-calculator

**Site:** property
**Bucket:** B (SDLT — Scottish / Welsh equivalents)
**Session:** B
**Batch:** M1-B-B2
**Pick ID:** B11
**Brief type:** Net-new page (calculator-walkthrough format)
**Stage:** 2 (full brief — Stage 1 seed extended 2026-05-26; Welsh LTT 2026/27 band tables anchored to HP §23.1-§23.3 locked positions)
**Source markdown path on launch:** `Property/web/content/blog/ltt-calculator.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ltt-calculator

---

## Manager pre-decisions

- **Suggested slug:** `ltt-calculator` (retain verbatim — matches SERP query and mirrors the existing site calculator-walkthrough pages: `property-capital-gains-tax-calculator`, `section-24-calculator`, `rental-yield-calculator-guide-uk-landlords`, `vat-calculator`).
- **Suggested category:** `property-types-and-specialist-tax` (matches the Wave 5 welsh-ltt-* family).
- **Bucket:** B (SDLT — Scottish / Welsh equivalents, Welsh-side calculator).
- **Cannibalisation classification:** distinct page format from the Wave 5 rates page; sits alongside as the calculator-walkthrough sibling. **Mandatory differentiation discipline below.**

### Cannibalisation differentiator (CRITICAL — read before writing)

Existing pages:
- `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (Wave 5) — the rate-table reference page.
- `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5) — higher-rates depth.

THIS new page (B11) is the **calculator-walkthrough page**: a do-the-sum walkthrough that performs the LTT calculation step by step for the buyer's most likely purchase patterns. The format mirrors the existing site calculator-walkthrough pages (`property-capital-gains-tax-calculator`, `section-24-calculator`, etc.) — prose-walkthrough that does the math longhand on the page, NOT an interactive JavaScript widget.

**Hard rule:** B11 must explicitly cross-link the Wave 5 rates-and-bands page as "the rate-table reference" in the opening section. B11 does NOT re-explain the underlying statutory framework or the higher-rates attribution rules (those belong on the Wave 5 mechanics page and on B8). B11's territory is: the band-by-band calculation walkthrough for the four most likely purchase patterns, with multiple worked examples.

### Framing differentiator (Stage 2, 2026-05-26)

This page is the **calculator-walkthrough page for Welsh LTT**. Audience: a buyer at the pre-completion modelling stage who wants to know "what LTT will I pay on a £X purchase?" The buyer is not looking for statute or case-law; they want the band-by-band working with the running total shown. The page is the do-the-sum landing page for the most common buyer queries.

The distinguishing angle is **the calculator-walkthrough format**:

1. **Input-gathering framework.** Four diagnostic inputs: (a) purchase price; (b) property type (residential / non-residential / mixed-use); (c) buyer already owns another dwelling (y/n); (d) replacement of main residence within 36 months (y/n).
2. **Step-by-step band-by-band calculation.** For each rate table (main residential / higher residential / non-residential), the page walks the calculation longhand with the running total shown. Each band's calculation shown explicitly.
3. **Higher-rates standalone-band-structure** (CRITICAL anti-templating point per HP §23.11 do-not-write). The Welsh higher rates are a STANDALONE band structure starting at 5% from £1, NOT a flat surcharge on top of standard bands. This is the most common error in competitor content and the calculator-walkthrough must explicitly close down the surcharge-on-top mistake.
4. **Post-calculation refund-route reminder.** Where the buyer expects to sell their previous main residence within 36 months, the page surfaces the LTTA 2017 Sch 5 para 23 refund route briefly and cross-links to the Wave 5 mechanics page and to B8 / B9 for deeper treatment.

**Stage 1b HP-lock note:** No new HP lock needed; B11 uses the existing §23.1-§23.3 rate tables and the §23.11 do-not-write (standalone band structure) discipline.

**Pool-thinness disclosure:** competitor LTT calculator pages exist (uklandlordtax.co.uk; the official WRA calculator at lttcalculator.wra.gov.wales) but most are interactive widgets or shallow band-table references. The defensible point for B11 is **the longhand walkthrough format + four-pattern coverage + the explicit standalone-band-structure pedagogy that closes down the most common competitor error**.

---

## Competitor URLs (Stage 2 populated 2026-05-26; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard `httpx + BeautifulSoup`. Extract treatment of: (a) Welsh LTT main and higher-rate bands (verify against gov.wales at write time — rate-by-reference per §16.27); (b) the standalone-band-structure of the higher rates (flag any competitor framing as "surcharge on top" — that is the §23.11 drift); (c) the £225,000 nil band advantage over SDLT; (d) the MDR minimum-rate floor (3% from 13 February 2026); (e) cross-border apportionment treatment.

- https://uklandlordtax.co.uk/calculators/ltt-calculator/
- https://lttcalculator.wra.gov.wales/ (authoritative WRA calculator — primary verification reference)
- https://www.gov.wales/land-transaction-tax-rates-and-bands
- https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- https://www.capitallaw.co.uk/insights/welsh-ltt-calculator/
- https://www.masonhayes.co.uk/site/news/welsh-ltt-rates-calculator/
- https://www.hughjames.com/news/welsh-stamp-duty-calculator/

**Borrowable patterns (subject to verification):** WRA published worked examples on band-by-band calculation; competitor input-gathering frameworks (verify the standalone-band-structure on higher rates is correctly represented).

**Reliability notes:**
- lttcalculator.wra.gov.wales is authoritative for current band tables and calculation logic; sessions writing B11 must verify their worked examples against the WRA calculator output.
- ukpropertyaccountants.co.uk / Welsh law firm briefings: variable on the higher-rates standalone structure framing; flag any "5% surcharge on top of standard bands" framing.

---

## GSC data

*Net-new page; primary topical queries expected: "Welsh LTT calculator", "Wales stamp duty calculator", "LTT 2026 calculator", "Welsh land transaction tax calculation", "LTT higher rates calculator", "Welsh second home stamp duty calculator", "LTT first time buyer Wales calculator", "Welsh commercial property stamp duty calculator".*

---

## Closest existing pages (cannibalisation context)

- **`welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (Wave 5, mandatory rate-table reference)** — the rates reference companion. **Mandatory cross-link** in opening + closing as "the rate-table reference".
- `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics` (Wave 5) — higher-rates depth; cross-link.
- `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition` (Wave 5) — MDR for the 2+ dwellings worked example.
- Sibling MW1 picks: B8 (Welsh higher-rates family-and-trust attribution); B9 (Welsh dwelling-suitability for the non-residential rate path); B7 (Scottish-side parallel for cross-border buyers).
- Other site calculator-walkthrough pages (format precedent): `property-capital-gains-tax-calculator`, `section-24-calculator`, `rental-yield-calculator-guide-uk-landlords`, `vat-calculator`. Cross-link as "other property tax calculators" in footer.

**Cannibalisation discipline:**
- **Hard cross-link** to Wave 5 rates-and-bands page in opening + closing.
- Cross-link Wave 5 higher-rates mechanics page for deeper attribution treatment.
- Cross-link sibling B8 / B9 MW1 picks for attribution edge cases / dwelling-suitability respectively.
- Cross-link cross-jurisdictional `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide` and SDLT calculator pages once for cross-border buyer.

---

## Redirect overlap (on launch)

No existing slug matches `ltt-calculator`. **Session to scan `Property/web/middleware.ts` for any `welsh-ltt-calculator` / `ltt-rates-calculator` / `wales-stamp-duty-calculator` token redirects pre-launch; if found, repoint to B11.**

---

## Authority links worth considering (Stage 2 populated 2026-05-26; session selects 6-8)

**Statutory (legislation.gov.uk):**
- LTTA 2017 s.24 (regulations specifying residential tax bands and tax rates): https://www.legislation.gov.uk/anaw/2017/1/section/24
- LTTA 2017 s.25 (regulations specifying non-residential tax bands and tax rates): https://www.legislation.gov.uk/anaw/2017/1/section/25
- LTTA 2017 s.72 (meaning of residential property — feeds into which table applies): https://www.legislation.gov.uk/anaw/2017/1/section/72
- LTTA 2017 Schedule 5 (higher rates residential property transactions): https://www.legislation.gov.uk/anaw/2017/1/schedule/5
- LTTA 2017 s.10 (effective date): https://www.legislation.gov.uk/anaw/2017/1/section/10
- LTTA 2017 s.41 (return filing — 30 days): https://www.legislation.gov.uk/anaw/2017/1/section/41
- Land Transaction Tax (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024 (higher-rates +1pp uplift, 11 December 2024)

**Welsh Government / Welsh Revenue Authority (authoritative):**
- **lttcalculator.wra.gov.wales (authoritative WRA calculator — primary verification reference)**: https://lttcalculator.wra.gov.wales/
- gov.wales LTT rates and bands: https://www.gov.wales/land-transaction-tax-rates-and-bands
- gov.wales LTT calculation technical guidance: https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- gov.wales higher-rates technical guidance: https://www.gov.wales/higher-rates-purchases-residential-property-technical-guidance

**Cross-references in house_positions.md:**
- **§23.1 primary anchor** (main residential rates 2026/27 — 0% to £225,000; 6% £225,001-£400,000; 7.5% £400,001-£750,000; 10% £750,001-£1,500,000; 12% above).
- **§23.2 primary anchor** (higher residential rates 2026/27 — 5% to £180,000; 8.5% £180,001-£250,000; 10% £250,001-£400,000; 12.5% £400,001-£750,000; 15% £750,001-£1,500,000; 17% above; standalone band structure).
- **§23.3** (non-residential rates 2026/27 — 0% to £225,000; 1% £225,001-£250,000; 5% £250,001-£1,000,000; 6% above; MDR retention with subsidiary-dwelling carve-out from 7 Feb 2025 + 3% minimum effective rate from 13 Feb 2026).
- **§23.11 do-not-write** (higher rates NOT a flat surcharge on standard bands — load-bearing for B11 anti-templating).
- §23.8 (cross-jurisdictional comparison — for the cross-border buyer pointer).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):**
- Verify Welsh LTT main residential bands 2026/27 against gov.wales at write time (rate-by-reference per §16.27 / §16.35) — bands fed by HP §23.1 lock but rate-table publication may change at WG budget cycle.
- Verify Welsh LTT higher residential bands 2026/27 (HP §23.2 lock + 11 December 2024 uplift) against gov.wales at write time.
- Verify Welsh LTT non-residential bands 2026/27 (HP §23.3 lock) at write time.
- Verify MDR minimum-rate floor at 3% from 13 February 2026 against gov.wales.
- Verify each worked-example calculation against lttcalculator.wra.gov.wales (the authoritative WRA calculator).
- Verify the standalone-band-structure of higher rates per §23.11 do-not-write.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, middle dots only.
- Practical, numeric. Plain calculation walk-through, not a statute treatise.
- Anonymised personas only.
- **Tone discipline:** the page is a do-the-sum walkthrough, not a marketing exercise. Avoid "save thousands" framing; lead with the calculation itself.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate in body.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise pre-completion buyer + buyer-already-owns-another-property + commercial-property buyer + cross-border (English buying in Wales) buyer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the "main residence worked example" H2 (mid-intent: standard buyer modelling).
  - After the "higher-rates standalone-band walkthrough" H2 (high-intent: second-home buyer about to incur higher rates).
  - After the "MDR / multi-dwelling calculation" H2 (high-intent: portfolio buyer).
- Vary opening; lead with the pre-completion buyer-decision moment ("You are about to buy a property in Wales and want to know what LTT you will pay"), NOT with "LTT was introduced...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Cross-link Wave 5 rates page (mandatory rate-table reference) in opening + closing.
- Cross-link Wave 5 higher-rates page for deeper attribution.
- Cross-link B8 / B9 / B7 MW1 picks once each for orthogonal depth.

### House positions
- §23.1 + §23.2 + §23.3 primary anchors (rate tables).
- §23.11 do-not-write (standalone band structure — anti-templating critical).
- §23.8 cross-jurisdictional pointer.

### Quality bar
- Word count: 2,400-3,000 (calculator walkthroughs run shorter than statute-led pages).
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the **calculator-walkthrough format + four-pattern coverage + the explicit standalone-band-structure pedagogy + the post-calculation refund-route reminder**. Write to it.
- Lead with the buyer's pre-completion modelling moment, NOT with regime-history.
- DO NOT frame higher rates as "5% surcharge on top" — this is the §23.11 critical anti-templating error.

---

## Draft FAQ entries (Stage 2 populated 2026-05-26; session may rewrite or expand)

Target 10-12 FAQs.

1. **What is Welsh Land Transaction Tax and when does it apply?**
   Welsh LTT is the property-transfer tax that replaced SDLT in Wales from 1 April 2018, administered by the Welsh Revenue Authority. It applies to acquisitions of "land in Wales" — the location of the property determines the jurisdiction (LTTA 2017 s.10 effective date is substantial performance or completion). Wales-resident or non-Wales-resident buyers all pay LTT on Welsh land; English-resident buyers buying English land pay SDLT.

2. **What are the 2026/27 main residential rates and bands?**
   Walk the table: 0% on the first £225,000; 6% on £225,001 to £400,000; 7.5% on £400,001 to £750,000; 10% on £750,001 to £1,500,000; 12% above £1,500,000. Verify against gov.wales at the effective date as Welsh Government may amend rates at the budget cycle.

3. **What are the 2026/27 higher residential rates?**
   The higher rates apply where the buyer (or any joint buyer) owns another dwelling at the effective date. The table: 5% on the first £180,000; 8.5% on £180,001 to £250,000; 10% on £250,001 to £400,000; 12.5% on £400,001 to £750,000; 15% on £750,001 to £1,500,000; 17% above. **The higher rates are a STANDALONE band structure, NOT a flat surcharge stacked on the main rates.** This is the most common error in competitor content — a £400,000 higher-rates purchase is calculated on the standalone bands above, not as "main rates plus 5%".

4. **What are the 2026/27 non-residential rates?**
   0% on the first £225,000; 1% on £225,001 to £250,000; 5% on £250,001 to £1,000,000; 6% above £1,000,000. Non-residential rates apply to commercial property, mixed-use property, and (under LTTA 2017 s.72) buildings not "suitable for use as a dwelling" at the effective date. The non-residential top rate (6%) is materially lower than the residential top rate (12% or 17% higher rates), so the residential / non-residential classification line is heavily contested for marginal-case purchases.

5. **How is the calculation done band by band on a £350,000 main-residence purchase?**
   £225,000 at 0% = £0; £125,000 at 6% = £7,500. Total LTT = **£7,500**. The £225,000 Welsh nil band is materially higher than SDLT's £125,000 nil band, so a typical starter purchase costs less in Wales than in England.

6. **How is the calculation done on a £350,000 higher-rates purchase (buyer already owns a dwelling)?**
   Using the standalone higher-rates table: £180,000 at 5% = £9,000; £70,000 at 8.5% = £5,950; £100,000 at 10% = £10,000. Total higher-rates LTT = **£24,950**. Note: the £225,000 nil-band advantage of the main rates does NOT apply to higher-rates buyers — a common mistake. The higher-rates calculation starts from £1.

7. **Is there first-time-buyer relief in Wales?**
   No, not as a separate relief regime. The £225,000 nil band in the main residential rates already covers most starter purchases — a first-time buyer purchasing at £200,000 pays £0 LTT. A first-time buyer purchasing at £350,000 pays £7,500 per the worked example above (materially less than the SDLT bill on the same price would be). Wales chose the higher nil band route rather than a separately-defined FTB relief.

8. **How is the calculation done on a £600,000 commercial property purchase?**
   Using the non-residential table: £225,000 at 0% = £0; £25,000 at 1% = £250; £350,000 at 5% = £17,500. Total LTT = **£17,750**. The £225,000 non-residential nil band matches the residential nil band, so the saving on commercial property versus residential property accrues principally above £225,000.

9. **What happens when I replace my main residence — do the higher rates still apply?**
   The replacement-of-main-residence exception under LTTA 2017 Sch 5 para 8 may save the transaction. If you sell your previous main residence within the 3-year permitted period (beginning the day after the new purchase's effective date), the higher rates can be refunded. The 12 July 2024 amendments to Sch 5 introduced WRA discretion to extend the 3-year window in exceptional cases. Applications via amendment of the LTT return under TCMA 2016 s.41 within 12 months of filing, or by overpayment claim under s.78 within 4 years.

10. **How does Multiple Dwellings Relief (MDR) affect the calculation for a 2+ dwellings transaction?**
    MDR remains available in Wales (unlike SDLT, where MDR was abolished from 1 June 2024). For a transaction acquiring two or more dwellings, MDR averages the consideration across the dwellings and applies the rate table to the per-dwelling figure, then multiplies back up. The MDR minimum effective rate is **3% from 13 February 2026** (raised from 1% by the 2026 Welsh Regulations). MDR is NOT available where an individual buys a dwelling with one or more "subsidiary dwellings" and would otherwise pay LTT at the main residential rates (the 7 February 2025 main-residence-with-annexe carve-out).

11. **What if my property straddles the Wales/England border?**
    Cross-border transactions under LTTA 2017 Sch 22 require apportionment of the chargeable consideration between the two jurisdictions on a just-and-reasonable basis. A separate return is filed to HMRC (for the English portion) and the Welsh Revenue Authority (for the Welsh portion), each on the apportioned consideration. Each jurisdiction's higher-rates / additional-dwellings test is applied separately to its share.

12. **Where can I check my calculation against an authoritative source?**
    The official Welsh Revenue Authority LTT calculator is at `https://lttcalculator.wra.gov.wales/`. The WRA calculator is the authoritative reference for current bands and calculation logic; we recommend verifying any band-by-band calculation against the WRA calculator before completing a substantial purchase. The gov.wales technical guidance pages provide deeper walkthroughs of edge cases (replacement of main residence, higher-rates attribution, cross-border apportionment, MDR).

---

## Worked examples (Stage 2 drafted 2026-05-26; session may adapt personas + figures)

Four illustrative scenarios covering the most likely buyer patterns. Use anonymised personas (no real names).

### Worked example 1: £200,000 main-residence purchase (under nil band)

A buyer ("Buyer W") purchases a £200,000 first home in Carmarthen on 1 March 2026. Buyer W owns no other dwelling.

- **Test:** main residential rates apply (no higher-rates trigger).
- **Calculation:** £200,000 at 0% = **£0**.
- **Operational point:** the £225,000 Welsh nil band covers the entire purchase. Counterfactual SDLT calculation on the same purchase: £125,000 at 0% + £75,000 at 2% = £1,500. Welsh nil-band advantage = £1,500 saving.

### Worked example 2: £350,000 main-residence purchase (standard rates)

A buyer ("Buyer X") purchases a £350,000 main residence in Cardiff on 15 April 2026. Buyer X has just sold their previous main residence in the same week (clean replacement chain). Buyer X owns no other dwelling at the effective date.

- **Test:** main residential rates apply (no higher-rates trigger since the previous home has been sold).
- **Calculation:** £225,000 at 0% = £0; £125,000 at 6% = £7,500. Total = **£7,500**.
- **Operational point:** clean main-rates calculation. Standard worked example for a chain-completion buyer.

### Worked example 3: £350,000 higher-rates purchase (buyer owns BTL)

A buyer ("Buyer Y") purchases a £350,000 second residential property in Swansea on 1 May 2026 to use as a BTL. Buyer Y already owns her own main residence in Bristol.

- **Test:** higher rates apply (Buyer Y owns another dwelling at the effective date and is NOT replacing her main residence).
- **Calculation using STANDALONE higher-rates bands:** £180,000 at 5% = £9,000; £70,000 at 8.5% = £5,950; £100,000 at 10% = £10,000. Total = **£24,950**.
- **Operational point:** the standalone-band-structure means the calculation starts from £1 at the 5% rate, NOT from £225,000 with a 5% surcharge on top. A common competitor framing error would compute (£7,500 standard LTT) + (£17,500 of 5% surcharge on £350,000) = £25,000 — close to the correct figure on this purchase but with the wrong framing; on other price points the surcharge-on-top approach gives a materially different and incorrect result. ALWAYS use the standalone bands.

### Worked example 4: £600,000 non-residential (commercial) purchase

A buyer ("Buyer Z" — a small property investment company) purchases a £600,000 mixed-use property (commercial unit on the ground floor with a flat above) in Wrexham on 1 June 2026. The dominant character is commercial (>50% by value and floor area).

- **Test:** non-residential rates apply (mixed-use property attracts non-residential rates on the entire consideration).
- **Calculation using NON-RESIDENTIAL bands:** £225,000 at 0% = £0; £25,000 at 1% = £250; £350,000 at 5% = £17,500. Total = **£17,750**.
- **Operational point:** non-residential rates are materially lower than higher-rates residential. A purely-residential BTL purchase at £600,000 would attract higher-rates LTT of approximately £52,250 (per the standalone higher-rates table). Mixed-use classification (where genuinely mixed by character) saves £34,500 on this example. Note: aggressive mixed-use classification on a barely-mixed purchase is litigated heavily on the SDLT side (per the Hyman / Suterwalla / Horton Hall line at §1.J); WRA's enquiry stance on Welsh mixed-use is broadly equivalent.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9. Key per-page anchors: §23.1 + §23.2 + §23.3 primary (rate tables); §23.11 do-not-write (standalone band structure) anti-templating; §16.35 per-write verification on band tables against gov.wales + lttcalculator.wra.gov.wales at write time.

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
