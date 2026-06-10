# Wave 5 Stage 1 Candidates (Reasoning-First Selection)

Date: 2026-05-23
Sub-agent: Wave 5 Stage 1 reasoning agent per NETNEW_PROGRAM §16.18 + §16.19
Buckets locked by user 2026-05-23:
 - **A = VAT (re-clustered, topical-gap framing).** Source: `docs/property/wave5_vat_recluster_2026-05-23.md` enumerated gap themes.
 - **B = Devolved property tax: Welsh LTT + Scottish LBTT + ADS.** Source: `docs/property/topic_gaps_final.md` SDLT - Scottish / Welsh equivalents section (12 net-new candidates).
 - **C = Joint ownership + Form 17 + spouse-mechanics.** Source: `docs/property/topic_gaps_final.md` Joint ownership & Form 17 tax planning (4 candidates) + Trusts and beneficial ownership (declaration of trust, 2 candidates) + reasoning expansion from Wave 2 Stage 2 AUTHORITY_GAP.

Total: 30 candidates (10 A + 10 B + 10 C).

Discipline: reasoning per §16.18 (no script-driven similarity selection); closest-existing identified by topical adjacency (not Jaccard); cross-bucket pair-relations enumerated explicitly per §16.32.

---

## Bucket A — VAT (re-clustered, topical-gap framing)

Existing on-site VAT inventory (6 pages — all candidates must differentiate against these AND each other):
1. `landlord-vat-registration-when-required` — when a landlord must register; standard rate / exempt distinction.
2. `togc-vat-property-letting-business` — transfer of going concern relief.
3. `toms-vat-serviced-accommodation` — Tour Operators Margin Scheme for SA.
4. `vat-on-new-builds-residential-property` — 0% rate on new-builds.
5. `diy-housebuilders-vat-refund-scheme` — DIY refund scheme.
6. `domestic-reverse-charge-construction-vat-landlords` — reverse charge on construction services.

### A1 — `vat-option-to-tax-commercial-property-mechanics-election-revocation`

- **Bucket position:** A1
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** Option-to-tax (OTT) is the foundational mechanic for commercial property VAT, and has zero on-site coverage. This page anchors the OTT cluster: VAT 1614A election form, 6-month cooling-off window, "real estate election" vs single-property OTT, anti-avoidance disapplications under VATA 1994 Sch 10 para 12-17, and the 20-year revocation rule. Distinct from any existing residential-VAT page (residential lettings are exempt; OTT is for commercial). Distinct from A2 (CGS, which is the downstream adjustment mechanism) by being the upstream entry-decision page.
- **Closest existing:** `landlord-vat-registration-when-required` (registration mechanic only, no OTT depth); `togc-vat-property-letting-business` (TOGC interacts with OTT under VATA 1994 Sch 10 para 36 — disapplication if buyer not OTT-matched; this page links out to TOGC for that wrinkle); `domestic-reverse-charge-construction-vat-landlords` (reverse-charge on services, separate from OTT on land).
- **Cross-bucket cannibal flag:** None. OTT is England/Wales/Scotland statute (VATA is UK-wide, devolved-tax B-bucket is land-transaction-tax, not VAT).
- **Stage 2 brief seed:** Competitor URL: taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax + ukpropertyaccountants.co.uk OTT pages. Authority links: VATA 1994 Sch 10, HMRC VAT Notice 742A (Opting to tax land and buildings), VAT 1614A form. Worked-example angle: landlord acquiring a £750k commercial unit from an OTT vendor — comparison of OTT-on / OTT-off impact on cash-flow at acquisition + recoverable input tax + downstream rental exemption-or-standard-rate.
- **Wave priority signal:** HIGH (canonical entry-point; zero cannibal risk; deep competitor coverage with no on-site competitor; high commercial intent).

### A2 — `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics`

- **Bucket position:** A2
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** Capital Goods Scheme (CGS) is the 10-year input-tax adjustment regime that applies to land/buildings ≥ £250k VAT-exclusive (or £50k for computers/aircraft, not relevant here). Zero on-site coverage. CGS is the downstream mechanism that bites OTT-on commercial property: if the use of the property changes during the 10-interval period (taxable to exempt or vice versa), CGS recalculates the input-tax recovery. Distinct from A1 (OTT, the upstream election) by being the ongoing-adjustment regime. Distinct from A3 (partial-exemption) by operating on a single specified asset over a fixed period, not a portfolio-wide allocation.
- **Closest existing:** None on-site. `landlord-vat-registration-when-required` is the closest by category but covers registration mechanics, not CGS.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: taxaccountant.co.uk/vat-the-capital-goods-scheme-for-property-businesses. Authority links: VAT Regulations 1995 reg 112-116, HMRC VAT Notice 706/2 (Capital Goods Scheme), HMRC Partial Exemption Manual PE63000+. Worked-example angle: developer acquires £1.5m commercial unit in interval 1 (full taxable use, 100% recovery), changes to mixed-use in interval 5 (50% adjustment downward), sells in interval 8 (final-interval adjustment). Walk the 10 intervals with input-tax claw figures.
- **Wave priority signal:** HIGH (canonical commercial-VAT mechanic; zero cannibal risk; competitor coverage real).

### A3 — `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method`

- **Bucket position:** A3
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Partial exemption is the input-tax allocation regime for mixed-supplies portfolios. Zero on-site coverage. Landlords holding both residential (exempt) and commercial (taxable, if OTT) suffer the partial-exemption trap: residual input tax must be apportioned, and the de-minimis test must be applied each VAT period. This page anchors the partial-exemption mechanic for property: the standard method, the override (special method approval), the £625/month + 50% de-minimis test, and the annual adjustment. Distinct from A2 (CGS) by allocating residual input tax across a portfolio, not adjusting one asset's recovery over time. Distinct from A1 (OTT) by being the necessary downstream consequence of OTT-on-some-but-not-all property.
- **Closest existing:** None on-site. `landlord-vat-registration-when-required` touches the exempt/taxable distinction at registration depth only.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: taxaccountant.co.uk/vat-the-partial-exemption-trap + taxaccountant.co.uk/vat-partial-exemption-and-input-tax-recovery. Authority links: VAT Regulations 1995 reg 99-102, HMRC VAT Notice 706 (Partial Exemption), HMRC Partial Exemption Manual PE10000+. Worked-example angle: landlord with 4 BTL residential properties (exempt) + 2 OTT commercial units (taxable) + £15k overhead VAT each year; standard-method apportionment + de-minimis test at quarterly periods + annual adjustment showing recoverable swing.
- **Wave priority signal:** HIGH (operational mechanic for portfolio landlords mixing residential + commercial; competitor coverage real; no on-site coverage).

### A4 — `vat-mixed-use-property-purchase-residential-commercial-element-apportionment`

- **Bucket position:** A4
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** VAT on mixed-use property acquisitions (flat-over-shop, live-work units, hotel-with-retail-ground-floor) requires apportionment of consideration between zero-rated residential, exempt residential lettings, and standard-rated commercial. Zero on-site coverage. This page covers the apportionment methodology (floor area, market value, professional valuation), the OTT trap when the commercial element is opted, and the interaction with SDLT mixed-use rates. Distinct from A1 (OTT) by being the apportionment-at-acquisition page; A1 is the OTT-election page on commercial property generally.
- **Closest existing:** None on-site directly. Existing SDLT mixed-use pages (`sdlt-9-residential-mixed-use-classification`) overlap on SDLT but not VAT.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: towerstone.co.uk/how-does-vat-work-on-mixed-use-properties. Authority links: VATA 1994 Sch 9 Group 1 (land exemption), Sch 8 Group 5 (zero-rated new-build), HMRC VAT Notice 708 (Buildings and construction). Worked-example angle: £950k flat-over-shop purchase (60% residential / 40% commercial by floor area); OTT-on-shop allocation impact; SDLT-vs-VAT cross-reference flag.
- **Wave priority signal:** MEDIUM-HIGH (specialist topic; high search intent for boundary cases; complements existing SDLT mixed-use content).

### A5 — `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages`

- **Bucket position:** A5
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Dilapidations payments at lease end raise a recurring VAT question: are they damages (outside scope of VAT) or consideration for a taxable supply (standard-rated, if landlord OTT-on)? HMRC's position changed (Brief 12/20 of 2020) to a "look-through to the underlying contract" test. Zero on-site coverage. This page anchors the dilapidations-VAT mechanic: the pre-2020 vs post-2020 HMRC view, the supply-vs-damages test, evidence requirements, and downstream CGT capital-vs-revenue overlay. Distinct from A1 (OTT mechanics) by being applied to a specific lease-end transaction type.
- **Closest existing:** None on-site directly. Existing commercial-lease pages do not cover the VAT angle.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: bhp.co.uk/news-events/blog/dilapidations-demystified-accounting-tax-and-vat-implications + geraldedelman.com/insights/vat-and-property-issues. Authority links: HMRC VAT Brief 12/2020, VATA 1994 s.5, HMRC VAT Manual VATSC. Worked-example angle: £45k dilapidations payment at lease end (commercial unit OTT-on); pre-2020 damages treatment vs post-2020 look-through-to-contract; lease-clause drafting to clarify VAT treatment.
- **Wave priority signal:** MEDIUM (niche but high-intent for commercial landlords; competitor coverage real).

### A6 — `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate`

- **Bucket position:** A6
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** VAT on conversion projects is a high-intent topic with three reliefs: zero-rate on conversion of non-residential to residential (VATA 1994 Sch 8 Group 5 Item 1(b)), 5% reduced-rate on conversion of residential to multiple-occupancy (Sch 7A Group 6), and 5% reduced-rate on renovation of empty residential property. Zero on-site coverage (existing `vat-on-new-builds-residential-property` covers new-builds only, distinct mechanic). This page anchors the conversion-VAT cluster, distinct from A1 (OTT on commercial), A4 (mixed-use acquisition), and the existing new-build page.
- **Closest existing:** `vat-on-new-builds-residential-property` (adjacent: new-build is 0%, conversion is 0% under different schedule item — link to as sibling); `diy-housebuilders-vat-refund-scheme` (adjacent: DIY scheme covers self-conversion projects too).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: uklandlordtax.co.uk/vat-property-conversion-guide + taxaccountant.co.uk/vat-on-construction-industry-an-overview. Authority links: VATA 1994 Sch 8 Group 5 Item 1(b), Sch 7A Group 6, Sch 7A Group 7, HMRC VAT Notice 708 (Building and construction), HMRC VAT Notice 719 (DIY refund). Worked-example angle: commercial-to-residential conversion of a £400k office block; 0%-rate certification + DIY-vs-developer route choice + sale-or-let post-conversion VAT treatment.
- **Wave priority signal:** HIGH (high-intent conversion landlord persona; complements existing new-build page).

### A7 — `vat-developer-pre-registration-input-tax-recovery-property-development-projects`

- **Bucket position:** A7
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** Property developers incur substantial VAT-able costs before VAT registration: feasibility studies, planning consultancy, professional fees, deposits on land. Pre-registration input-tax recovery rules (VAT Regulations 1995 reg 111) allow recovery of goods within 4 years and services within 6 months pre-registration, subject to ongoing-business test. Zero on-site coverage. This page anchors the developer pre-registration mechanic, distinct from A1 (OTT) and A2 (CGS) by being the input-tax recovery rules for the pre-development phase specifically.
- **Closest existing:** None on-site. `landlord-vat-registration-when-required` covers when-to-register but not pre-registration recovery.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: towerstone.co.uk/can-i-reclaim-vat-on-property-development-costs. Authority links: VAT Regulations 1995 reg 111, HMRC VAT Notice 700 chapter 11 (Input tax: when can it be recovered), HMRC VAT Manual VIT32000+. Worked-example angle: developer registers November 2026; pre-registration £35k planning + survey costs (6-month services window) + £8k goods deposits (4-year goods window); recoverable + non-recoverable breakdown.
- **Wave priority signal:** HIGH (high-intent developer cohort; canonical mechanic; competitor coverage real).

### A8 — `vat-toms-long-term-stays-hotel-aparthotel-28-day-rule-mechanics`

- **Bucket position:** A8
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** TOMS for long-term hotel / aparthotel stays raises the 28-day rule: stays of 28+ days move from standard-rated short-stay accommodation to a reduced-VAT rate from day 29 onwards (VATA 1994 s.50A + Sch 4A para 9). Existing on-site `toms-vat-serviced-accommodation` covers TOMS framework only; this page adds the 28-day rule mechanic, the aparthotel cohort, and the long-term-stay treatment. Distinct from the existing TOMS page by being the long-stay deepening, not the framework page.
- **Closest existing:** `toms-vat-serviced-accommodation` (adjacent — this page is the long-stay deepening; cross-link as deeper variant).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: geraldedelman.com/insights/vat-on-long-term-hotel-stays + property-tax-advice.co.uk/knowledge-centre/the-toms-vat-scheme-another-attack-by-hmrc-foiled. Authority links: VATA 1994 s.50A + Sch 4A para 9, HMRC VAT Notice 709/3 (Hotels and holiday accommodation). Worked-example angle: aparthotel guest stays 45 days; days 1-28 standard rate; days 29-45 reduced rate on 20% of consideration; total VAT collected vs total consideration apportionment.
- **Wave priority signal:** MEDIUM-HIGH (deepens existing TOMS page; long-stay cohort underserved).

### A9 — `vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics`

- **Bucket position:** A9
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** Cladding remediation costs post-Grenfell have a specific VAT regime: VATA 1994 Sch 8 Group 5 Item 4A (introduced FA 2022) zero-rates qualifying remediation works on residential buildings ≥ 11 metres. Zero on-site coverage despite high topical relevance (Building Safety Act 2022 enforcement ongoing). This page anchors the cladding-VAT relief mechanism: scope, qualifying works, certification, interaction with Building Safety Levy. Distinct from A6 (conversion) by being a defined remediation relief on existing residential stock.
- **Closest existing:** None on-site. `vat-on-new-builds-residential-property` adjacent but covers new builds, not remediation on existing stock.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: geraldedelman.com/insights/vat-and-the-cladding-crisis-a-missed-opportunity-for-relief. Authority links: VATA 1994 Sch 8 Group 5 Item 4A, Building Safety Act 2022, HMRC VAT Notice 708 (relevant chapter post-2022 update). Worked-example angle: leaseholder remediation pass-through; freeholder funding £2.4m cladding works on a 16-floor residential block; 0%-rated qualifying works vs ineligible enabling works; recharge to leaseholders mechanic.
- **Wave priority signal:** MEDIUM (highly topical; underserved competitor coverage; landlord/freeholder cohort).

### A10 — `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework`

- **Bucket position:** A10
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Decision-framework page on whether residential and commercial rental income is in/out of VAT. Residential lettings are exempt under VATA 1994 Sch 9 Group 1 Item 1 (no OTT route — Sch 10 para 5 disapplies OTT on dwellings). Commercial lettings are exempt by default but standard-rated if OTT exercised. This page acts as the umbrella decision-tree distinct from the depth pages: A1 (OTT mechanics depth), A3 (partial exemption operational), the existing `landlord-vat-registration-when-required` (registration depth). It serves the high-volume "is rent vat-able" search-intent cohort while linking out to A1 + A3 for depth.
- **Closest existing:** `landlord-vat-registration-when-required` (overlap on registration angle; this page is decision-framework, the existing page is the registration mechanic — clear differentiation but flag for explicit cross-link to avoid templating risk).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URLs: ukpropertyaccountants.co.uk/vat-on-rental-income-essential-insights-for-landlords-and-investors + towerstone.co.uk/is-there-vat-on-rent. Authority links: VATA 1994 Sch 9 Group 1, Sch 10 para 5 (OTT-disapplication on dwellings), HMRC VAT Notice 742 (Land and property). Worked-example angle: landlord with 5-property portfolio (3 residential lettings + 1 commercial shop OTT-on + 1 storage unit OTT-off); registration test + per-supply VAT treatment + portfolio decision flow.
- **Wave priority signal:** HIGH (high search volume; serves entry-level query before depth pages; risk: must explicitly differentiate from existing registration page in brief).

---

## Bucket B — Devolved property tax: Welsh LTT + Scottish LBTT + ADS

Existing on-site devolved-tax inventory: **zero pages**. Cross-checked Glob for `*welsh*`, `*scottish*`, `*lbtt*`, `*ltt*` returned no on-site matches. Cannibal surface is therefore against general SDLT pages (England rates) where they implicitly assume England; flag for England-vs-devolved differentiation on each candidate.

Existing SDLT pages closest by topical proximity: `sdlt-bands-rates-2026-27-residential` (England rates), `sdlt-5-percent-surcharge-refund-claim-process` (England), `sdlt-non-resident-2-percent-surcharge` (England), `sdlt-9-residential-mixed-use-classification` (England), `sdlt-multiple-dwellings-relief-abolition-impact-bulk-buyers-2024-2025` (England, abolished from 1 June 2024).

Split decided by topical-lane cleanness: 5 Welsh LTT + 5 Scottish LBTT (plus ADS as part of LBTT lane). Mirrors the topic_gaps_final.md 12-candidate split.

### B1 — `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers`

- **Bucket position:** B1
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Foundational LTT page for Welsh property buyers: 2026-27 main residential bands (0% to £225k, 6% £225k-£400k, 7.5% £400k-£750k, 10% £750k-£1.5m, 12% over £1.5m per Welsh Revenue Authority 2024-25 update). Distinct from any SDLT page by being Welsh-statute (LTTA 2017, Welsh Revenue Authority administered) not HMRC + Finance Act 2003. No on-site coverage. Anchors the Welsh-LTT cluster as the entry-point rates page.
- **Closest existing:** `sdlt-bands-rates-2026-27-residential` (cross-link as sibling — England equivalent; explicit "if you're buying in Wales, this page; if in England, SDLT page"); `2027-property-income-tax-rates-landlords-uk` (cross-link to income-tax pillar).
- **Cross-bucket cannibal flag:** None internal. External: explicit cross-link to England-SDLT counterpart needed.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/land-transaction-tax-a-complete-guide. Authority links: LTTA 2017 (Land Transaction Tax and Anti-avoidance of Devolved Taxes (Wales) Act 2017), Welsh Revenue Authority LTT guidance, LTTA 2017 Sch 5 + Sch 6 (residential rates). Worked-example angle: £350k Welsh BTL purchase by individual + by company (with 5% surcharge); £750k Welsh second-home; comparison vs identical England SDLT.
- **Wave priority signal:** HIGH (zero on-site coverage; canonical entry-point; complements existing England SDLT pillar).

### B2 — `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics`

- **Bucket position:** B2
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Welsh LTT higher rates apply on additional dwellings (second homes, BTL purchases). Welsh higher rates are a **standalone band structure** (NOT a flat top-up on main residential rates like the SDLT 5% additional dwellings surcharge), uplifted 1pp across all bands from 11 December 2024 to **5% / 8.5% / 10% / 12.5% / 15% / 17%** (LTT (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024 — see §23.2). Distinct from B1 (main residential rates) by being the higher-rates table. Distinct from English SDLT 5% additional dwellings surcharge by being a standalone band structure (Welsh statute LTTA 2017 Sch 5) rather than a flat surcharge.
- **Closest existing:** B1 (sibling — main rates page); `sdlt-bands-rates-2026-27-residential` (England equivalent for comparative context).
- **Cross-bucket cannibal flag:** B1 ↔ B2 (close sibling pages — flag for explicit content boundary in briefs: B1 covers main rates only, B2 covers higher-rates surcharge only).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/higher-rates-of-land-transaction-tax-a-complete-guide + ukpropertyaccountants.co.uk/ltt-higher-rates-for-spouses-minor-children-and-trust-interests. Authority links: LTTA 2017 Sch 5 + Sch 6, Welsh Revenue Authority higher rates guidance. Worked-example angle: £280k second home Welsh purchase; existing main home in England (replacement question); spousal aggregation rule (LTTA mirrors SDLT spousal-aggregation but with Welsh wrinkles).
- **Wave priority signal:** HIGH (high-intent BTL Welsh cohort; complement to B1).

### B3 — `welsh-ltt-multiple-dwellings-relief-bulk-purchases-mechanics-survives-vs-sdlt-abolition`

- **Bucket position:** B3
- **Category:** `incorporation-and-company-structures`
- **Framing differentiator:** Multiple Dwellings Relief (MDR) was abolished for SDLT from 1 June 2024 (FA 2024) — but Welsh LTT retains MDR (LTTA 2017 Sch 13). This page anchors the live MDR mechanic that bulk-buyer landlords lost in England but still have in Wales. Distinct from any on-site SDLT page by covering the live Welsh relief. Distinct from B1 + B2 by being a specific relief rather than the rates / surcharge mechanic.
- **Closest existing:** `sdlt-multiple-dwellings-relief-abolition-impact-bulk-buyers-2024-2025` (England MDR abolition — cross-link as the contrast/parallel page); B1 (Welsh rates pillar).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk LTT bulk-purchase content. Authority links: LTTA 2017 Sch 13 (Multiple Dwellings Relief), Welsh Revenue Authority MDR guidance, contrast with FA 2024 (SDLT MDR abolition). Worked-example angle: 4-property Welsh portfolio purchase £900k total; MDR claim (mean-consideration calc) + saving vs no-MDR + parallel England scenario showing MDR no longer available.
- **Wave priority signal:** HIGH (significant tax saving for Welsh bulk buyers; topical contrast against abolished England equivalent).

### B4 — `welsh-ltt-first-time-buyer-relief-mechanics-eligibility-comparison-england-scotland`

- **Bucket position:** B4
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Welsh LTT has NO first-time-buyer relief (unlike SDLT and LBTT). This is a counter-intuitive position landlords advising first-time-buyer family members must know. This page covers why (Welsh policy choice from LTT introduction in 2018), the comparison against SDLT FTB relief (£625k cap) and LBTT FTB relief (£175k threshold), and the implications for cross-border family planning. Distinct from B1 by being the FTB-specific counter-point.
- **Closest existing:** B1 (sibling); `sdlt-first-time-buyer-relief-uk` (existing SDLT first-time-buyer page — link out as England contrast).
- **Cross-bucket cannibal flag:** B4 ↔ B7 (Scottish LBTT FTB relief — close sibling within bucket B; flag explicit cross-link).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/essential-guide-for-first-time-homebuyers-in-scotland (Scottish parallel) + Welsh Revenue Authority FAQ. Authority links: LTTA 2017 (absence of FTB provisions), Welsh Government policy statements. Worked-example angle: family in Cardiff helping daughter buy first home £220k Welsh vs same purchase England (FTB relief) vs Scotland (FTB relief); comparative net LTT/SDLT/LBTT.
- **Wave priority signal:** MEDIUM-HIGH (counter-intuitive position; high search-intent for cross-border buyers).

### B5 — `welsh-ltt-derelict-uninhabitable-property-refund-relief-claim-mechanics`

- **Bucket position:** B5
- **Category:** `property-types-and-specialist-tax`
- **Framing differentiator:** Welsh LTT has a specific refund route for derelict/uninhabitable properties: a buyer who pays LTT at residential rates can claim a refund and re-classify as non-residential where the property is genuinely uninhabitable at completion (LTTA 2017 + Welsh Revenue Authority refund guidance). Zero on-site coverage. Distinct from any SDLT mixed-use page (SDLT P N Bewley UT case is the England parallel but different statute); distinct from B1 by being a specific refund mechanic. Direct lift from topic_gaps_final.md candidate `ltt-refunds-for-derelict-or-uninhabitable-properties`.
- **Closest existing:** `sdlt-9-residential-mixed-use-classification` (England parallel via Bewley test — cross-link for comparative context).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/ltt-refunds-for-derelict-or-uninhabitable-properties. Authority links: LTTA 2017, Welsh Revenue Authority refund mechanism guidance, Welsh Tribunal LTT decisions. Worked-example angle: £180k derelict cottage purchase initially taxed as residential; uninhabitability evidence (no kitchen, no bathroom, structural damage); refund claim process + 4-year time-limit + downstream non-residential rates calculation.
- **Wave priority signal:** MEDIUM (niche but high-saving topic; competitor coverage real).

### B6 — `scottish-lbtt-rates-bands-2026-27-residential-buyers-complete-guide`

- **Bucket position:** B6
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Foundational LBTT page for Scottish property buyers: 2026-27 main residential bands (0% to £145k, 2% £145k-£250k, 5% £250k-£325k, 10% £325k-£750k, 12% over £750k per Revenue Scotland). Distinct from any SDLT/LTT page by being Scottish-statute (LBTTA 2013, Revenue Scotland administered). Anchors the LBTT cluster as the entry-point rates page; parallel role to B1 in the Welsh sub-bucket.
- **Closest existing:** `sdlt-bands-rates-2026-27-residential` (cross-link); B1 (cross-bucket sibling — Welsh equivalent).
- **Cross-bucket cannibal flag:** B6 ↔ B1 (parallel structure across devolved regimes — flag for explicit Welsh-vs-Scottish comparative cross-links; minor templating risk to be mitigated by per-page differentiator).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/lbtt-review-in-scotland + Revenue Scotland LBTT main guidance. Authority links: LBTTA 2013 (Land and Buildings Transaction Tax (Scotland) Act 2013), Revenue Scotland LBTT rates and bands guidance. Worked-example angle: £350k Scottish BTL purchase by individual + by company (with ADS); £750k Scottish second-home; comparison vs identical England SDLT and Welsh LTT.
- **Wave priority signal:** HIGH (zero on-site coverage; canonical entry-point).

### B7 — `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers`

- **Bucket position:** B7
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Additional Dwelling Supplement (ADS) is Scotland's parallel to SDLT 5% additional dwellings surcharge. ADS rate increased to 8% from 5 December 2024 (Scottish Budget); £40k threshold applies. Zero on-site coverage. Distinct from B6 (main rates) by being the BTL/second-home surcharge mechanic. Distinct from English SDLT surcharge by separate statute + different rate (Scottish ADS 8% vs English 5%); replacement-window is now 36 months in both jurisdictions (Scotland extended by Coronavirus (Scotland) (No.2) Act 2020 and made permanent; harmonised with England's 3-year SDLT refund window).
- **Closest existing:** B6 (sibling — main rates page); `sdlt-5-percent-surcharge-refund-claim-process` (England equivalent — cross-link as parallel surcharge mechanism).
- **Cross-bucket cannibal flag:** B7 ↔ B2 (Scottish ADS vs Welsh higher rates — close parallel within bucket B; flag).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/limits-on-ads-repayment-ftt-clarifies-disposal-in-replacement-of-main-residence + Revenue Scotland ADS guidance. Authority links: LBTTA 2013 Sch 2A (ADS), Revenue Scotland ADS guidance, Scottish Budget 2024-25 (rate increase to 8%). Worked-example angle: £280k Scottish second home; ADS 8% on full consideration (not just over threshold like SDLT); 36-month replacement-of-main-residence window (harmonised with England's 3-year SDLT refund window per Coronavirus (Scotland) (No.2) Act 2020); repayment claim mechanics.
- **Wave priority signal:** HIGH (recently increased rate = high-intent timing).

### B8 — `scottish-lbtt-first-time-buyer-relief-eligibility-mechanics`

- **Bucket position:** B8
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Scottish LBTT first-time-buyer relief: £175k threshold (raised from £145k in 2018) by Revenue Scotland. Effectively, FTB pays no LBTT on first £175k of consideration. Distinct from B6 (rates page) by being the FTB-specific relief. Distinct from B4 (Welsh FTB-absence) by being the active Scottish relief. Direct topical match to topic_gaps_final.md candidate `essential-guide-for-first-time-homebuyers-in-scotland`.
- **Closest existing:** B6 (sibling); B4 (cross-bucket sibling — Welsh absence-of-FTB).
- **Cross-bucket cannibal flag:** B8 ↔ B4 (FTB parallel; flag for explicit comparative section in each).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/essential-guide-for-first-time-homebuyers-in-scotland. Authority links: LBTTA 2013 + Revenue Scotland FTB relief guidance. Worked-example angle: £210k Edinburgh FTB purchase; relief calc + qualifying conditions (must be only/main residence intended) + joint-buyer rules (one not FTB = relief lost).
- **Wave priority signal:** MEDIUM-HIGH (canonical Scottish FTB page; complements B4).

### B9 — `scottish-lbtt-corporate-buyer-15-percent-flat-rate-or-ads-pathway-decision`

- **Bucket position:** B9
- **Category:** `incorporation-and-company-structures`
- **Framing differentiator:** Scottish LBTT for corporate buyers: Scotland does NOT have an equivalent of England's 15% SDLT flat rate on £500k+ enveloped dwellings (FA 2003 Sch 4A). Corporate BTL acquisitions in Scotland use LBTT main rates + ADS 8% surcharge regardless of value. This page covers the corporate-buyer pathway (ADS-applies-to-all-corporate-buyers, no de-minimis exemption), the absence of equivalent to s.116(7) FA 2003 six-dwellings rule, and ATED-LBTT-RoE interaction for overseas corporates. Distinct from B6 + B7 by being the corporate-specific page; distinct from England's 15% SDLT pages.
- **Closest existing:** `ated-15-percent-flat-rate-sdlt-interaction` (England-specific — cross-link as the parallel-not-applicable contrast); `sdlt-corporate-buyer-non-natural-person-15-percent-rate` (England-specific — cross-link).
- **Cross-bucket cannibal flag:** None internal. External cross-link to England SDLT corporate pages flagged.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/lbtt-acquisition-relief-when-corporate-takeovers-reduce-tax. Authority links: LBTTA 2013 (corporate buyer mechanics + absence of equivalent 15% rate), Revenue Scotland corporate-buyer guidance, ATED Part 3 FA 2013 (UK-wide). Worked-example angle: £650k Scottish residential property bought via SPV; ADS 8% applies + main LBTT bands + no equivalent of England's 15% flat rate; ATED still applies (UK-wide); comparison against identical purchase via English SPV.
- **Wave priority signal:** MEDIUM (niche but high-value cohort: overseas + SPV buyers).

### B10 — `scottish-lbtt-bare-trust-acquisition-relief-corporate-restructuring-mechanics`

- **Bucket position:** B10
- **Category:** `incorporation-and-company-structures`
- **Framing differentiator:** LBTT has a specific bare-trust relief mechanic (LBTTA 2013 + Revenue Scotland guidance) for transactions where the buyer is a bare trustee acting for a beneficiary. Separately, LBTT acquisition relief reduces LBTT on corporate-takeover transactions involving Scottish property. This page combines two niche LBTT reliefs into a single coverage page for the corporate / trust corporate-restructure cohort. Distinct from B9 (corporate-buyer rates) by being the relief mechanics on specific transaction types.
- **Closest existing:** B9 (sibling); existing `transferring-property-spv-tax-treatment` (England parallel for general corporate property transfers — cross-link for context).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/bare-trusts-and-lbtt-relief-availability + ukpropertyaccountants.co.uk/lbtt-acquisition-relief-when-corporate-takeovers-reduce-tax. Authority links: LBTTA 2013 (bare trust + acquisition relief), Revenue Scotland tribunal decisions (Archer UK Ltd v Revenue Scotland). Worked-example angle: BTL portfolio incorporation into Scottish SPV; acquisition relief claim mechanics; separately, bare-trust nominee structure for minor child beneficiary; both worked.
- **Wave priority signal:** MEDIUM (specialist but high-value cohort: Scottish corporate-restructure clients).

---

## Bucket C — Joint ownership + Form 17 + spouse-mechanics

Existing on-site joint-ownership / spouse inventory:
1. `section-24-joint-property-ownership-tax-split` — **FACTUAL ISSUE FLAGGED — see Site-wide flags F-1 in `wave5_site_wide_flags.md`.** Page contains incorrect Form 17 framing ("regardless of actual ownership percentages") which contradicts the actual rule (Form 17 elects to ACTUAL beneficial interest, overriding only the default 50/50). Will need back-patch as part of Wave 5 hygiene.
2. `cgt-property-transfer-spouse` — no-gain-no-loss spousal transfer mechanic.
3. `mtd-itsa-jointly-owned-property-threshold-split` (Wave 3 B3, correctly handles Form 17) — MTD-specific joint-owner threshold mechanic.
4. `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) — quarterly operational mechanics.
5. `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (Wave 4 C2) — IHT spouse exemption + transferable NRB/RNRB.
6. `alphabet-shares-property-spv-dividend-splitting-spouse-children` (Wave 4 A2) — alphabet shares + s.624 boundary.

**AUTHORITY_GAP from Wave 2 Stage 2:** no Form 17 dedicated page on-site. This bucket closes that gap.

### C1 — `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation`

- **Bucket position:** C1
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Foundational Form 17 dedicated page (closes Wave 2 Stage 2 AUTHORITY_GAP). Covers the Form 17 mechanic in full: ITA 2007 s.836 default 50/50 spousal rule, s.837 election to actual-beneficial-interest split via Form 17, 60-day filing window from beneficial-interest declaration, revocation mechanic (only on change of beneficial interest or end of joint ownership), evidence requirements (Land Registry / declaration of trust). Anchors the Form 17 cluster as the canonical mechanic page. Distinct from Wave 3 B3 `mtd-itsa-jointly-owned-property-threshold-split` (applied to MTD), Wave 4 B1 (applied to MTD quarterly operations), `section-24-joint-property-ownership-tax-split` (applied to S24 — and also incorrect, flagged for back-patch). This page is the Form 17 mechanic page that all applied pages link back to.
- **Closest existing:** `section-24-joint-property-ownership-tax-split` (existing applied page — FACTUAL ISSUE flagged; this page provides the correct mechanic and the existing applied page back-patches to align); `mtd-itsa-jointly-owned-property-threshold-split` (Wave 3 applied — cross-link as sibling-applied); `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 applied — cross-link).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties + uklandlordtax.co.uk/jointly-owned-property. Authority links: ITA 2007 s.836 + s.837, HMRC Form 17, HMRC TSEM (Trust Settlements and Estates Manual) TSEM9810+, HMRC PIM (Property Income Manual) PIM1030 on jointly-let property. Worked-example angle: 90/10 beneficial ownership (Land Registry); Form 17 filed January 2026 with 60-day window evidenced by November 2025 declaration of trust; covers spouse + civil partner; covers what happens if Form 17 NOT filed (deemed 50/50 takes over) including S24 + MTD + CGT implications.
- **Wave priority signal:** HIGH (canonical mechanic page; closes Wave 2 AUTHORITY_GAP; will be cited by 4+ existing pages).

### C2 — `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords`

- **Bucket position:** C2
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Foundational page on legal ownership structure choice: joint tenancy vs tenants in common. Joint tenancy = unity of title, possession, interest, time + right of survivorship overrides will. Tenants in common = separate shares + no automatic survivorship + share passes by will. Tax consequences are downstream: tenants in common can hold unequal beneficial shares (Form 17 lever C1 covers), joint tenants always 50/50, and the death-of-co-owner mechanic is fundamentally different. Distinct from C1 (Form 17 mechanic, which is the spouse-only override) by being the underlying property-law choice. Distinct from C7 (CGT main-residence) by being the structural-tax page not the relief page.
- **Closest existing:** `cgt-property-transfer-spouse` (touches joint-ownership at margin); C1 (sibling).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: alexander-ene.co.uk/joint-tenants-or-tenants-in-common.htm + uklandlordtax.co.uk/jointly-owned-property. Authority links: Law of Property Act 1925 s.36, Trusts of Land and Appointment of Trustees Act 1996 (TLATA), HMRC TSEM9800+. Worked-example angle: Smith couple choosing structure for £600k Manchester BTL portfolio — joint tenants (survivorship overrides will, equal-shares only, Form 17 cannot reach below 50/50) vs tenants in common 50/50 (will-driven, future Form 17 to 70/30 available) vs tenants in common 70/30 (with declaration of trust + Form 17 immediately).
- **Wave priority signal:** HIGH (foundational page underpins multiple downstream pages).

### C3 — `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17`

- **Bucket position:** C3
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** A declaration of trust is the documentary evidence of beneficial ownership unequal to legal ownership. The 90/10 / 70/30 / 60/40 declared shares that Form 17 requires must be evidenced by a contemporaneous declaration of trust (or Land Registry record of unequal tenants-in-common). This page is the declaration-of-trust mechanic: drafting, execution, registration considerations, evidence requirements, what HMRC checks. Distinct from C1 (Form 17 election, which is the tax-side filing) by being the underlying property-law document. Distinct from C2 (joint vs TIC, which is the legal-ownership structure choice) by being the beneficial-shares document.
- **Closest existing:** C1 (sibling); C2 (sibling). Direct topical match to topic_gaps_final.md `declaration-of-trust` + `what-is-a-declaration-of-trust` candidates.
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: uklandlordtax.co.uk/declaration-of-trust + uklandlordtax.co.uk/what-is-a-declaration-of-trust. Authority links: Trustee Act 2000, TLATA 1996, HMRC TSEM, Land Registry RX1 restriction guidance. Worked-example angle: Khan couple acquiring £450k Birmingham BTL — Land Registry holds joint legal title, declaration of trust executed at completion establishing 80/20 beneficial split (wife is higher-rate taxpayer holding 20%, husband basic-rate holding 80%); document drafting + execution + Form 17 filing.
- **Wave priority signal:** HIGH (canonical document mechanic; underpins C1 + C2 + downstream applied pages).

### C4 — `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision`

- **Bucket position:** C4
- **Category:** `section-24-and-tax-relief`
- **Framing differentiator:** Applied decision-framework page: when does it pay for spouses to file Form 17 to override the default 50/50? Decision math: spouse marginal rate differential, basic-rate vs higher-rate threshold, S24 finance-cost restriction interaction (lower-rate spouse keeps 20% relief efficacy), MTD threshold consideration, and downstream CGT base-cost implications. Applied page — links to C1 (mechanic), C3 (declaration of trust), the existing (to-be-corrected) `section-24-joint-property-ownership-tax-split` page. Distinct from C1 by being the applied tax-planning decision.
- **Closest existing:** `section-24-joint-property-ownership-tax-split` (existing — but FACTUAL ISSUE; this page provides the correct applied framework once the existing page back-patches); C1 (mechanic).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties + propertyaccountant.co.uk/tax-saving-jointly-held-assets. Authority links: ITA 2007 s.836 + s.837, ITTOIA 2005 s.272 (property income), s.272A (S24 mechanic). Worked-example angle: husband higher-rate, wife basic-rate, £30k gross rent + £12k mortgage interest; 50/50 default income calc + S24 + total tax vs 90/10 wife-favoured Form 17 (no S24 cliff for wife, full basic-rate relief on 90% interest) — net saving £3,400/yr.
- **Wave priority signal:** HIGH (high-intent applied page; canonical use case for Form 17 cluster).

### C5 — `civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality`

- **Bucket position:** C5
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Civil partners are treated identically to married spouses for property income tax purposes (Civil Partnership Act 2004 + tax legislation parallels). This page covers the equality of treatment, the Form 17 mechanic for civil partners, the s.836 deemed 50/50 default, and the historical context (pre-2004 same-sex partners did NOT have this treatment). Distinct from C1 by being civil-partner-specific (though the mechanic is the same — the differentiation is around CPA 2004 framing + persona). Worth a standalone page because the search query "civil partnership joint property tax" is distinct from "married couples form 17".
- **Closest existing:** C1 (sibling — Form 17 mechanic).
- **Cross-bucket cannibal flag:** C5 ↔ C1 (close sibling — flag for explicit content boundary in briefs: C1 is general spouse + civil-partner Form 17 mechanic; C5 is civil-partner-specific applied page covering the cohort + edge cases like CPA 2004 dissolution + interaction with overseas civil partnerships).
- **Stage 2 brief seed:** Competitor URL: not in topic_gaps_final.md directly; reasoned expansion — Wave 5 sub-agent identifies via reasoning. Authority links: Civil Partnership Act 2004, ITA 2007 s.836, Equality Act 2010, HMRC TSEM9820+. Worked-example angle: civil-partnered landlord couple with £450k jointly-held BTL portfolio; Form 17 election from 70/30 split + 60-day window mechanic + treatment on dissolution + interaction with overseas civil partnership (recognition under FA 2005 + 2014 same-sex marriage).
- **Wave priority signal:** MEDIUM (smaller cohort but underserved; closes equality-of-coverage gap).

### C6 — `unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share`

- **Bucket position:** C6
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** Unmarried co-owners (cohabiting partners, siblings, parent-and-adult-child, friends) do NOT have access to Form 17 (which is spouse + civil-partner only under s.836/837). Their rental income split follows actual beneficial ownership from the start, evidenced by declaration of trust or Land Registry record. Distinct from C1 (spouse-only mechanic) by being the non-spouse cohort. Distinct from C3 (declaration of trust mechanic) by being the cohort-specific applied page.
- **Closest existing:** C1 (cross-link sibling — the contrast page); C3 (sibling — declaration of trust mechanic).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties. Authority links: ITA 2007 s.836 (NOT applicable to non-spouses), HMRC PIM1030 (jointly-let property income for non-spouses), HMRC TSEM9810+. Worked-example angle: cohabiting couple (Davies + Patel) buy £420k Bristol BTL — 70/30 beneficial split by capital contribution; Form 17 unavailable; declaration of trust + Land Registry tenants-in-common record sufficient evidence; income reported per actual share with no 60-day election cycle.
- **Wave priority signal:** MEDIUM-HIGH (real cohort, no on-site coverage, distinct from C1).

### C7 — `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics`

- **Bucket position:** C7
- **Category:** `capital-gains-tax`
- **Framing differentiator:** CGT Private Residence Relief (PRR) on jointly-owned main residence: TCGA 1992 s.222-226, each owner claims relief on their share; the s.222(5) PRA election (Principal Residence Election) can be made by spouses to nominate one of multiple residences and applies symmetrically across the couple's CGT liability. Distinct from C1 (Form 17 income-tax mechanic) by being the CGT relief mechanic. Distinct from `cgt-property-transfer-spouse` (no-gain-no-loss transfer between spouses) by being the relief calculation on disposal to third party.
- **Closest existing:** `cgt-property-transfer-spouse` (sibling — applied at transfer); existing `cgt-main-residence-election-two-properties` (PRA election applied to two residences — cross-link as sibling).
- **Cross-bucket cannibal flag:** None.
- **Stage 2 brief seed:** Competitor URL: reasoned expansion (topic_gaps_final.md doesn't have direct candidate, but PRR + joint ownership is high-search-volume). Authority links: TCGA 1992 s.222 + s.223 + s.225, HMRC CGT manual CG64200+. Worked-example angle: Patel couple disposing £950k joint main home after 12-year ownership; one period (5 years) was let to nephew; PRR + lettings relief (post-2020 reform) per owner share + £6k AEA each; total CGT calc 50/50 + Form 17 not applicable to capital disposals (Form 17 income-only, see C1).
- **Wave priority signal:** MEDIUM-HIGH (high-search-volume CGT scenario; complements existing PRA page).

### C8 — `iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt`

- **Bucket position:** C8
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** IHT treatment of jointly-held property is structurally affected by joint-tenancy vs tenancy-in-common. Joint tenancy = survivorship passes whole property to survivor (spouse exemption applies but uses no NRB on first death — full £325k NRB and full £175k RNRB transfer to survivor). Tenants in common = each share passes by will, can use first-death NRB by directing share to non-spouse via will or DoV. Wave 4 C2 covered the spouse exemption + transferable allowances mechanic; this page is the structural-ownership-choice page. Distinct from C2 (general joint vs TIC page) by being the IHT-focused depth. Distinct from Wave 4 C2 by being the choice-of-structure page rather than the second-death-window mechanic.
- **Closest existing:** Wave 4 C2 `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (sibling — cross-link); C2 (general joint vs TIC sibling); existing IHT estate-planning pages from Wave 4.
- **Cross-bucket cannibal flag:** None. (Within-bucket close to C2 — flagged.)
- **Stage 2 brief seed:** Competitor URL: alexander-ene.co.uk/joint-tenants-or-tenants-in-common.htm + ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties. Authority links: IHTA 1984 s.18 (spouse exemption) + s.5 (joint property), HMRC IHTM15011+ (joint property), Law of Property Act 1925 s.36, HMRC IHTM43000+ (transferable NRB). Worked-example angle: Khan couple with £1.4m portfolio (£600k own home + £800k BTL portfolio); joint tenants on home + tenants in common 50/50 on BTL; first death scenario + NRB usage on TIC BTL share by directing to children + RNRB taper + downstream second-death calc. Comparison: same portfolio held all-joint vs all-TIC.
- **Wave priority signal:** HIGH (structural choice with significant IHT consequences; complements Wave 4 IHT bucket).

### C9 — `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`

- **Bucket position:** C9
- **Category:** `landlord-tax-essentials`
- **Framing differentiator:** SDLT 5% additional dwellings surcharge with joint owners triggers spousal aggregation (FA 2003 Sch 4ZA para 9): a buyer married to/civil-partnered to someone with another residential property anywhere in the world treats that as their own for the surcharge test. Joint owners (married + non-married) each test the surcharge separately, but the spousal aggregation always brings additional properties of the other spouse into scope. Distinct from existing `sdlt-5-percent-surcharge-refund-claim-process` (refund mechanic) by being the joint-owner application mechanic. Distinct from C1 by being SDLT-applied (one-off charge) not income-tax (annual).
- **Closest existing:** `sdlt-5-percent-surcharge-refund-claim-process` (sibling — refund mechanic, applied page).
- **Cross-bucket cannibal flag:** C9 ↔ B2 (Welsh LTT higher rates) + C9 ↔ B7 (Scottish ADS) — devolved-regime parallels are different statutes but the SAME spousal-aggregation question arises; flag for explicit cross-link from C9 to B2 + B7 once they ship (per §16.32 sequencing: B2 + B7 should ship before C9 OR C9 launch-prompt should explicitly reference B2/B7 once available).
- **Stage 2 brief seed:** Competitor URL: ukpropertyaccountants.co.uk/how-owning-property-abroad-leads-higher-stamp-duty-rates + reasoned expansion. Authority links: FA 2003 Sch 4ZA para 3 + 4 + 9 (spousal aggregation), HMRC SDLTM (SDLT Manual) SDLTM07750+, HMRC SDLT Surcharge guidance. Worked-example angle: Smith couple — husband owns existing flat in Spain (£180k), wife buying £420k UK BTL in own name. Wife's first UK property purchase BUT 5% surcharge applies due to spousal aggregation (husband's Spain flat counts). Comparison: same purchase by unmarried co-owners — Spain-property partner triggers surcharge, UK-only partner does not (surcharge on individual share basis).
- **Wave priority signal:** HIGH (very common scenario; high search-volume; complements existing surcharge refund page).

### C10 — `retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure`

- **Bucket position:** C10
- **Category:** `portfolio-management`
- **Framing differentiator:** Applied retirement-planning page: as one spouse retires (marginal rate drops to PA-only or basic-rate), the other remains higher-rate (continued earnings). Form 17 shift from 50/50 to (e.g.) 90/10 toward retired spouse moves rental income to lower-rate hands. Mechanics: declaration of trust amendment, Form 17 re-filing, 60-day window, evidence discipline, and CGT implications of NOT transferring legal title (Form 17 + DoT does NOT trigger CGT because beneficial interest is being declared, not transferred — but if beneficial interest actually shifts, CGT s.58 spouse no-gain-no-loss applies). Distinct from C4 (Form 17 decision framework, general) by being the retirement-stage applied page. Distinct from C1 (mechanic) by being the persona-led applied page.
- **Closest existing:** C4 (sibling — general decision framework); C1 (mechanic); existing `cgt-property-transfer-spouse` (cross-link for CGT angle).
- **Cross-bucket cannibal flag:** None internal. Cross-link to Wave 4 A8 (FIC retirement decumulation) for the FIC-route alternative.
- **Stage 2 brief seed:** Competitor URL: reasoned expansion. Authority links: ITA 2007 s.836 + s.837, TCGA 1992 s.58, HMRC TSEM, retirement-planning HMRC PIM. Worked-example angle: Hollis couple — husband retires age 64, wife continues consulting £85k/yr to age 70. Portfolio: £45k gross rent, £18k mortgage interest. Pre-retirement 50/50 Form 17 default = wife's higher-rate liability ~£11k + husband basic-rate ~£4.4k = total £15.4k. Post-retirement Form 17 amended to 80/20 husband-favoured + declaration of trust amendment + 60-day filing = husband basic-rate ~£8.4k + wife higher-rate ~£3.1k = total £11.5k. Annual saving £3.9k across 6-year transition.
- **Wave priority signal:** MEDIUM-HIGH (high-value retirement persona; applied page; complements Wave 4 retirement-cohort content).

---

## Cross-bucket cannibal pair-relations summary (per §16.32 sequencing-constraint review)

| Pair | Type | Action |
|---|---|---|
| **B1 ↔ B6** | Parallel within-B: Welsh main rates vs Scottish main rates | Mitigated by per-page differentiator (Welsh statute LTTA 2017 vs Scottish LBTTA 2013) + explicit comparative cross-link in each. NOT a sequencing constraint, but flag for templating-risk monitoring in briefs. |
| **B2 ↔ B7** | Parallel within-B: Welsh higher rates vs Scottish ADS | Same as B1↔B6. Mitigated by differentiator + cross-link. |
| **B4 ↔ B8** | Parallel within-B: Welsh FTB-absence vs Scottish FTB-relief | Mitigated by differentiator (B4 is absence-of-relief framing, B8 is presence-of-relief framing) + explicit comparative section in each. |
| **C1 ↔ C5** | Parallel within-C: Form 17 mechanic (general spouse + civil-partner) vs Form 17 civil-partner-specific applied | C5 is civil-partner-cohort applied page that links back to C1 for mechanic. C1 must ship first (or simultaneously) for C5 to cite. **§16.32 SEQUENCING SIGNAL: C1 before C5.** |
| **C9 ↔ B2 + B7** | SDLT-vs-devolved spousal-aggregation parallels | C9 is England-SDLT-applied; B2 + B7 are devolved equivalents. **§16.32 SEQUENCING SIGNAL: B2 + B7 should ship before C9 OR C9's launch prompt explicitly notes B2/B7 are forthcoming siblings (in case of session sequencing). If buckets ship in parallel via sessions A/B/C, C9 includes forward-link placeholders to B2/B7 that the manager hyperlinks at merge.** |
| **C8 ↔ Wave 4 C2** | Within-C and against prior wave: structural choice IHT page vs second-death-window mechanic | Wave 4 C2 already on `main`. C8 explicitly cites Wave 4 C2 as the downstream mechanic. Differentiator boundary: C8 is choice-of-structure (JT vs TIC), Wave 4 C2 is the second-death window calc. |
| **C10 ↔ Wave 4 A8** | Cross-wave: Form-17 retirement applied vs FIC retirement decumulation | Both are retirement-stage applied pages but different vehicles (Form 17 = individual ownership; A8 = FIC corporate). C10 cross-links A8 as the "alternative route via FIC" sibling. |
| **A6 ↔ existing `vat-on-new-builds-residential-property` + `diy-housebuilders-vat-refund-scheme`** | VAT conversion vs new-build | All three sit in the construction-VAT cluster; A6 must explicitly differentiate: new-build is original construction (Group 5 Item 1(a)), conversion is change-of-use (Group 5 Item 1(b)), DIY is taxpayer-mode-of-claim. |

**Top 3 cross-bucket cannibal risks (highest priority for manager-review gate per §16.19):**

1. **C9 ↔ B2 + B7 (highest):** §16.32 sequencing constraint applies. Coordinate launch-prompt sequencing so devolved-regime pages exist before or concurrently with C9, OR C9 launch-prompt explicitly notes B2/B7 are forthcoming siblings.
2. **B1↔B6, B2↔B7, B4↔B8 (parallel within-B):** Three within-bucket parallel pairs introduce templating risk. Brief-level mitigation via explicit framing differentiator on each page (Welsh statute vs Scottish statute, statute citations distinct, worked examples distinct). Spot-check by manager after Session B's first 3 pages per §10 anti-templating discipline.
3. **C1↔C5 (sequencing):** C5 (civil-partner-cohort) depends on C1 (general mechanic) shipping first or simultaneously. §16.32 sequencing signal — bake into Session C launch prompt.

---

## House-position-conflict signals surfaced during reasoning (preliminary, manager review required)

1. **`section-24-joint-property-ownership-tax-split.md` — Form 17 framing incorrect.** Page lines 17-19 + 39-43 state Form 17 lets married couples elect to split "regardless of actual ownership percentages" — this contradicts ITA 2007 s.837 which requires Form 17 to declare ACTUAL beneficial interest, not arbitrary split. **HOUSE_POSITION_CONFLICT signal (no formal §15 + §19 conflict yet because Form 17 mechanic is not in house_positions.md as a locked position — but the §19.4 joint-property MTD discussion implicitly assumes correct Form 17 framing which the existing page contradicts).** Manager-review action: either (a) lock Form 17 mechanic into house_positions.md as a new sub-section §23 in pre-Wave-5 prep, AND back-patch the existing applied page; OR (b) treat as existing-page back-patch in Wave 5 hygiene queue without house position lock.

2. **No house-position-conflict signals against §21.4 (newly-patched figures).** No A-bucket or B-bucket or C-bucket candidates touch employer NI / dividend rates directly.

3. **No house-position-conflict signals against §19 MTD positions for C-bucket joint-ownership pages.** §19.4 already correctly handles joint-property threshold testing. C-bucket joint-ownership candidates that touch MTD (C4 + C10 reference MTD interaction; C1 + C2 + C6 are MTD-adjacent but not MTD-applied) align with §19.4 framing.

---

## Bucket viability + final candidate count

- **Bucket A (VAT):** 10 candidates emitted. Verdict: VIABLE per `wave5_vat_recluster_2026-05-23.md` topical-gap framing.
- **Bucket B (Devolved):** 10 candidates emitted. Verdict: VIABLE — zero on-site coverage + 12 strong candidates in topic_gaps_final.md.
- **Bucket C (Joint ownership + Form 17 + spouse):** 10 candidates emitted. Verdict: VIABLE — closes Wave 2 Stage 2 AUTHORITY_GAP + topic_gaps_final.md has 4 direct candidates + 2 declaration-of-trust candidates + reasoning expansion to 10.

**Total: 30 candidates across 3 buckets. Zero SKIPS.**
