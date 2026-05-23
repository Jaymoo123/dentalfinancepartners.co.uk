# Track 2B — Competitor Sitemap Gap Mining (2026-05-23)

**Mined by:** Track 2B sub-agent (Claude Opus 4.7, 1M context).
**Input:** `briefs/property/_sitemap_cache_v2/*.json` — 55 cached competitor sitemaps (brief said 56; one had not been recached at run time). 15,275 `topical` URLs aggregated.
**Output format:** per TRACK2_PROGRAM §5.
**Dedup sources consulted:**
- `docs/property/track2_cannib_index_2026-05-23.md` §1, §2, §3, §4, §5 (406 existing pages + 30 Wave 5 candidates + inter-wave queue).
- `docs/property/track2_universe_2026-05-23.md` (234 residual slugs).
- `docs/property/_tmp_track2_excluded_slugs.txt` (173 already-touched slugs).
- `docs/property/topic_gaps_final.md` (436 candidate slugs already in the net-new pool).
- `docs/property/house_positions.md` §1-§24 (governing positions).

**Status legend:**
- `NEW` — genuinely uncovered, Wave 6+ pickup
- `DUPE-EXISTING` — already a live page
- `DUPE-IN-FLIGHT` — Wave 5 candidate or inter-wave queue item
- `DUPE-ALREADY-CANDIDATE` — already in `topic_gaps_final.md`

**Reasoning discipline (per §16.18):** semantic, slug-level + cluster-level. No Jaccard scripts for cannib decisions.
**URL discipline (per §16.31):** every URL in this doc was observed in a cached sitemap JSON. None are hallucinated. Wave 6+ Stage 2 must still verify liveness per §15.1.

---

## Topic cluster: SDLT — rates, reliefs, refunds, surcharges

### NEW candidates (8)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 1 | `sdlt-linked-transactions-property-investors-aggregation-rules` | 1 (signal: 1 specialist treats this as a distinct depth page) | https://www.property-tax-advice.co.uk/knowledge-centre/linked-transactions-and-sdlt-what-property-investors-need-to-know/ | `sdlt-buy-to-let-rates-surcharge-guide-2025` | §1 LOCKED — covers SDLT rates but says nothing about linked-transaction aggregation; ready for a new sub-page that threads §1 | Linked-transaction aggregation under Sch 4 para 5 FA 2003 is a genuine practical trap for portfolio buyers that no on-site or candidate-pool page addresses. |
| 2 | `sdlt-on-divorce-separation-property-transfers-relief-mechanics` | 2 (property-tax-advice + ukpropertyaccountants) | https://www.property-tax-advice.co.uk/knowledge-centre/navigating-stamp-duty-land-tax-sdlt-implications-in-divorce/; https://www.property-tax-advice.co.uk/knowledge-centre/sdlt-on-divorce-what-evidence-is-needed-when-transferring-property-to-be-eligible-for-relief/; https://www.ukpropertyaccountants.co.uk/cgt-after-divorce-01/ | `cgt-divorce-property-transfer-tax-implications` | §1 LOCKED + §24.5 LOCKED — Form 17 framing aligns; SDLT-on-divorce is a separate mechanic | The CGT-on-divorce angle is on-site as a legacy page; the SDLT-on-divorce mechanic (court order, formal separation, evidence required for relief) is uncovered. |
| 3 | `sdlt-uninhabitable-derelict-property-non-residential-rate-claim-bewley` | 2 (ukpropertyaccountants + property-tax-advice) | https://www.ukpropertyaccountants.co.uk/a-review-of-p-n-bewley-v-hmrc-derelict-property-eligibility/; https://www.ukpropertyaccountants.co.uk/buyer-loses-12k-stamp-duty-refund-appeal-for-derelict-bungalow/; https://www.property-tax-advice.co.uk/knowledge-centre/mudan-anor-v-revenue-and-customs-a-look-into-uninhabitable-property-relief-for-sdlt/ | `sdlt-buy-to-let-rates-surcharge-guide-2025` | §1 LOCKED — Bewley test fits inside the §1 rate-band framework, no new lock needed | Investors buying refurb stock routinely cite Bewley but the test (curtilage, suitability for use as a dwelling at completion) needs a dedicated PTP-voice walkthrough, not a case news item. |
| 4 | `sdlt-on-mixed-use-property-multiple-dwellings-residue-classification` | 2 (property-tax-advice + ukpropertyaccountants) | https://www.property-tax-advice.co.uk/knowledge-centre/stamp-duty-land-tax-on-mixed-use-property/; https://www.property-tax-advice.co.uk/knowledge-centre/important-–-sdlt-on-mixed-use-property-with-multiple-dwellings/; https://www.ukpropertyaccountants.co.uk/espalier-vs-hmrc-higher-sdlt-mixed-used-property/ | `cgt-commercial-property-different-residential` | §1 LOCKED — needs mixed-use sub-section verification; framework already governs | The MDR-abolition transition reframed mixed-use cases; the residual rule (mixed-use = lower of residential or non-residential rate) is the focal question now. |
| 5 | `sdlt-off-plan-property-purchase-completion-rate-locking-mechanics` | 1 | https://www.ukpropertyaccountants.co.uk/sdlt-on-off-plan-property-purchases-a-complete-guide/ | `sdlt-buy-to-let-rates-surcharge-guide-2025` | §1 LOCKED — rate-band rules apply at substantial performance; ready for a sub-page | The substantial-performance trigger for off-plan / forward-funded purchases is genuinely operational and not covered. |
| 6 | `sdlt-non-uk-resident-2-percent-surcharge-day-counting-mechanics` | 2 (ukpropertyaccountants + property-tax-advice) | https://www.ukpropertyaccountants.co.uk/non-uk-resident-sdlt-surcharge-for-residential-properties-complete-guide/; https://www.property-tax-advice.co.uk/knowledge-centre/how-many-days-can-you-be-outside-the-uk-before-sdlt-increases/ | `non-resident-cgt-uk-property-rates-reporting` | §1 LOCKED + §17.1 SRT — needs a sub-page citing both | Already excluded as a deprecated Wave-2 slug `sdlt-non-resident-2-percent-surcharge` BUT the day-counting mechanism (183 days, 12-month window) is a distinct topic from the rate itself. The day-counting angle is gap-free. |
| 7 | `sdlt-incorporation-partnership-vehicle-zero-charge-mechanics` | 2 (samconveyancing + uklandlordtax) | https://www.samconveyancing.co.uk/news/conveyancing/how-do-i-transfer-a-partnership-to-a-limited-company-with-no-sdlt-9646; https://uklandlordtax.co.uk/tax-guide/project-blue-and-incorporating-a-partnership-to-save-stamp-duty-land-tax-sdlt/ | `sdlt-incorporation-stamp-duty-twice` | §1 LOCKED — needs new sub-section on Para 10 Sch 15 FA 2003 partnership relief | The partnership-to-Ltd incorporation route avoids SDLT entirely via Sch 15 — a high-value tax-planning topic genuinely absent from our pool. PENDING new house position on partnership SDLT relief. |
| 8 | `sdlt-cladding-remediation-relief-section-58c-mechanics` | 1 | https://www.ukpropertyaccountants.co.uk/cladding-crisis-and-sdlt-relief-what-affected-property-owners-need-to-know/ | None (gap) | §1 LOCKED — needs new sub-section on s.58C FA 2003 cladding relief; Wave 5 VAT-A9 covers VAT side, this is SDLT side | Specifically the FA 2003 s.58C cladding-remediation SDLT relief — Wave 5 covered the VAT angle (`vat-cladding-remediation-relief-...-section-30a`), but the SDLT side is uncovered. |

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 18 (samples: `sdlt-buy-to-let-rates-surcharge-guide-2025`, `stamp-duty-buy-to-let-surcharge`, `sdlt-furnished-holiday-let-2025-abolition`, `sdlt-transfer-property-company-cost`, `sdlt-incorporation-stamp-duty-twice`)
- **DUPE-IN-FLIGHT:** 0 (no Wave 5 SDLT candidates)
- **DUPE-ALREADY-CANDIDATE:** 61 (samples: `sdlt-group-relief-claims`, `sdlt-on-shared-ownership`, `sdlt-refund-on-chattels-01`, all the FTT case-law candidates, `multiple-dwellings-relief-*` variants)

---

## Topic cluster: CGT — rates, AEA, 60-day, gifting, non-resident, scenarios

### NEW candidates (10)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 9 | `cgt-on-foreign-exchange-fluctuations-property-sale-uk-non-resident` | 1 | https://www.taxaccountant.co.uk/cgt-and-foreign-exchange-fluctuations/ | `non-resident-cgt-selling-uk-property-overseas-guide` | §5 LOCKED + §17.4 NRCGT — FX-gain mechanic threads s.252-253 TCGA, no new lock needed | The FX-gain component of an NRCGT computation (sterling-vs-foreign-currency cost-base re-set) is genuinely operational and absent. |
| 10 | `cgt-selling-property-to-spouse-undervalue-arms-length-mechanics` | 1 | https://www.taxaccountant.co.uk/can-i-sell-a-property-to-my-wife-to-reduce-cgt/ | `cgt-property-transfer-spouse` | §24.4 LOCKED — TCGA s.58 no-gain-no-loss; needs sub-section on undervalue transfers | The undervalue-sale-to-spouse anti-avoidance angle (s.58 vs s.17 market-value rule) is uncovered — our existing page covers spouse transfer generally. |
| 11 | `cgt-on-property-sale-at-loss-claiming-allowable-capital-losses` | 1 | https://www.ukpropertyaccountants.co.uk/cgt-on-property-sales-at-loss/ | `cgt-property-sold-loss-claim-capital-losses` (residual) | §5 LOCKED — needs sub-section on TCGA s.16(2A) loss-claim mechanics | Residual existing page is thin / weak; this is a candidate for REWRITE (Track 2A) rather than NEW. **DOWNGRADED to DUPE-EXISTING.** (Self-correcting.) |
| 12 | `cgt-conditional-contracts-property-disposals-timing-tax-planning` | 1 | https://www.taxaccountant.co.uk/conditional-contracts-for-cgt-planning/ | None | §5 LOCKED — s.28 TCGA "subject to a condition" timing rule | Conditional contracts (subject-to-planning, subject-to-sale) carry a real CGT timing trap (s.28(2) TCGA) — completely uncovered. |
| 13 | `cgt-on-overseas-property-uk-resident-landlord-calculation-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/calculate-cgt-on-overseas-property | `non-resident-cgt-selling-uk-property-overseas-guide` (covers opposite direction) | §5 LOCKED + §10 DTA framing | Overseas-property-CGT for a UK-resident landlord (gain in sterling, foreign-tax-credit via DTA) is the opposite-direction case; uncovered. |
| 14 | `cgt-property-deferral-eis-seis-rollover-property-sale-proceeds` | 1 | https://www.mytaxaccountant.co.uk/post/cgt-deferral-on-eis | `cgt-deferral-strategies-property-investors-uk` | §5 LOCKED — overlap with residual page; this is a sub-page filing into it | The EIS/SEIS deferral relief for property-sale proceeds is a defined sub-mechanic our residual page treats only generically. |
| 15 | `cgt-late-filing-penalties-60-day-property-return-mechanics-mitigation` | 1 | https://www.ukpropertyaccountants.co.uk/cgt-late-filing-penalties/ | `hmrc-penalties-late-landlord-tax-returns-2026` (general); `cgt-payment-deadlines-property-sales-2026` (rewritten 2026-05-21) | §5 LOCKED + §19.7 penalty framework | The CGT-specific 60-day-return penalty (£100 + daily + percentage) ladder is uncovered as an operational topic. |
| 16 | `cgt-on-second-homes-buy-to-let-disposal-comprehensive-guide` | 1 | https://www.taxaccountant.co.uk/cgt-on-second-homes-and-buy-to-let/ | `capital-gains-tax-property-complete-guide-uk` (rewritten 2026-05-21) | §5 LOCKED — **DUPE — pillar already rewritten** | **DOWNGRADED to DUPE-EXISTING** — overlap too close to W4-21 pillar. |
| 17 | `cgt-amending-property-return-after-submission-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/amending-cgt-declarations | None (no on-site page covers UK Property Disposal return amendment) | §5 LOCKED — needs sub-section on UKPD return revision route | Amending a UKPD return after submission (the HMRC online portal mechanics) is a real practical need. |
| 18 | `cgt-on-agricultural-land-disposal-rates-reliefs-property-investors` | 1 | https://www.mytaxaccountant.co.uk/post/agricultural-land-and-cgt | None | §5 LOCKED — needs APR-CGT-interaction sub-section; **PENDING** house-position lock on agricultural-CGT mechanics | Agricultural-land CGT (rollover + APR-eligibility-on-death interaction) is a property-niche we don't cover. PENDING new HP. |

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 22 (samples: `60-day-cgt-reporting-property-sales-complete-guide`, `capital-gains-tax-property-complete-guide-uk`, `cgt-rates-property-2026-27-current-rates-explained`, `cgt-property-2027-rate-changes-uk-landlords`)
- **DUPE-IN-FLIGHT:** 1 (`cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — Wave 5 C-27)
- **DUPE-ALREADY-CANDIDATE:** 9 (samples: `exceptional-circumstances-in-main-residence-relief-uk-tax-comparison`, `lettings-relief-in-the-uk-a-guide-for-homeowners`, all 7 CGT-disposal candidates in topic_gaps_final §"CGT — disposal & specific scenarios")

---

## Topic cluster: IHT — BPR, APR, RNRB, gifts, FIC, trust mechanics

### NEW candidates (12)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 19 | `iht-life-interest-trust-rental-property-tax-implications-uk-landlord` | 2 (saltus + mytaxaccountant) | https://www.saltus.co.uk/the-financial-planning-blog/significant-life-events/a-guide-to-life-interest-trusts-in-wills; https://www.mytaxaccountant.co.uk/post/life-interest-trust-tax-implications | None | §9 + §22 LOCKED — needs sub-section on IPDI / QIIP mechanics; **PENDING** new HP on life-interest trust framing | Life-interest trusts (IPDI / QIIP) carry distinct CGT-uplift-on-death + IHT-on-life-tenant-death mechanics absent from the on-site IHT pool. |
| 20 | `iht-discretionary-trust-property-portfolio-10-year-periodic-charge-mechanics` | 1 (taxaccountant.co.uk glossary + crossover) | https://www.taxaccountant.co.uk/glossary/discretionary-trust/ | `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4) | §22 LOCKED §22.4 — covers entry; periodic-charge is distinct | We have entry-charge content; the 10-year-periodic + exit-charge mechanic is the next-step content. |
| 21 | `iht-property-trust-registration-service-trs-landlord-compliance` | 4 (geraldedelman + ATT x2 + hwfisher) | https://www.geraldedelman.com/insights/top-questions-asked-about-the-new-trust-registration-service/; https://hwfisher.co.uk/need-to-register-for-hmrcs-trust-registration-service-join-the-club/; https://www.geraldedelman.com/insights/trust-registration-service-opens-for-non-taxable-trusts/ | None | §22 LOCKED — TRS is compliance-side; needs new sub-section; **PENDING** new HP on TRS for property holdings | Trust Registration Service (TRS) for property-holding trusts — non-taxable trusts now in-scope post-2022 — is a genuine compliance gap with no on-site or candidate-pool coverage. |
| 22 | `iht-gifts-out-of-normal-expenditure-from-income-exemption-landlord` | 1 | https://www.taxaccountant.co.uk/gifts-out-of-income-exemption-for-iht/ | None | §22 LOCKED + §15.2 PETs — needs sub-section on s.21 IHTA 1984 NEI exemption | Normal-expenditure-out-of-income exemption (s.21 IHTA 1984) is a genuinely underused IHT mitigation route — uncovered. |
| 23 | `iht-cgt-uplift-on-death-property-portfolio-tax-free-rebasing-mechanics` | 1 (cross-cluster signal) | https://www.taxaccountant.co.uk/changing-a-will-after-death-how-deeds-of-variation-can-cut-iht/ | `cgt-inherited-rental-property-calculation-uk` (residual) | §5 LOCKED + §22 LOCKED — TCGA s.62 + IHTA combo | The CGT-rebasing-on-death uplift to probate value is mentioned in residual page but the *interaction* between IHT + CGT (you pick one tax, not both) is uncovered as a dedicated topic. |
| 24 | `iht-on-jointly-owned-property-survivor-discount-uk-mechanics` | 2 (mytaxaccountant + ukpropertyaccountants) | https://www.mytaxaccountant.co.uk/post/inheritance-tax-on-jointly-owned-property; https://www.mytaxaccountant.co.uk/post/inheritance-tax-and-tenants-in-common | None | §22.5 LOCKED + §24.5 LOCKED — joint-ownership IHT mechanics thread | Joint-ownership IHT mechanics (10-15% discount on undivided share; survivorship for joint tenants vs tenants-in-common) is uncovered. |
| 25 | `iht-deed-of-variation-property-landlord-redirecting-inheritance-mechanics` | 2 (mytaxaccountant x2 + taxaccountant) | https://www.mytaxaccountant.co.uk/post/deed-of-variation-inheritance-tax; https://www.taxaccountant.co.uk/changing-a-will-after-death-how-deeds-of-variation-can-cut-iht/ | `deed-of-variation-property-estate-redirecting-inheritance-iht-saving` (Wave 4 C-bucket, ✅ done) | §22.2 LOCKED — **DUPE-EXISTING**. | **DOWNGRADED to DUPE-EXISTING.** Already shipped in Wave 4. |
| 26 | `iht-gift-with-reservation-of-benefit-rental-property-grob-trap-mechanics` | 1 | https://www.ukpropertyaccountants.co.uk/gift-with-reservation-of-benefit/ | `iht-gift-with-reservation-letting-children-paying-rent-mechanics` (Wave 4 C-bucket, ✅ done) | §15.3 LOCKED — **DUPE-EXISTING**. | **DOWNGRADED to DUPE-EXISTING.** Wave 4 covered. |
| 27 | `iht-chargeable-lifetime-transfer-property-clt-into-trust-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/chargeable-lifetime-transfer-for-iht | `iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 28 | `iht-excepted-estate-rules-property-portfolio-no-iht-form-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/excepted-estate-for-iht | None | §22 LOCKED + §15 LOCKED — needs new sub-section on s.256 IHTA 1984 excepted-estate categories | Excepted estate (where no full IHT400 required) is a compliance topic — useful for small-portfolio landlord estates. |
| 29 | `iht-on-pensions-april-2027-property-landlord-estate-restructure` | 4 (taxaccountant + djh + rpgcrouchchapman + tlpi) | https://www.taxaccountant.co.uk/discretionary-pension-trusts-and-iht-key-changes-from-april-2027/; https://www.djh.co.uk/latest-news/news-insights/how-the-april-2027-pension-iht-changes-could-affect-your-estate-and-what-to-do-about-it/; https://www.tlpi.co.uk/insights/elimination-of-iht-relief-on-pensions | `pension-iht-april-2027-landlord-estate-planning` (Wave 2 C-bucket, ✅ done) | §15.5 LOCKED + §22 LOCKED — **DUPE-EXISTING.** | **DOWNGRADED to DUPE-EXISTING.** Already shipped. |
| 30 | `iht-investment-bond-property-portfolio-investor-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/investment-bonds-and-iht | None | §9 LOCKED — needs sub-section on investment-bond non-IHT-deferred mechanics; **PENDING** new HP | Investment bonds (BPR-equivalent income wrapper) as IHT-mitigation tool for property-investors is uncovered. |
| 31 | `iht-life-insurance-trust-landlord-portfolio-cover-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/life-insurance-to-cover-iht | None | §9 LOCKED + §22 LOCKED — life-policy-in-trust route | Life-insurance-in-trust (Section 21 IHTA + outside-the-estate trick) to fund IHT liability — uncovered. |
| 32 | `iht-residence-nil-rate-band-rnrb-property-portfolio-downsizing-mechanics` | 1 | (residence-nil-rate-band-frozen and similar candidate already in topic_gaps_final) | `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Wave 2, ✅ done) | **DUPE-EXISTING.** | **DOWNGRADED.** |

**Net NEW after correction:** 7 candidates (#19, #20, #21, #22, #23, #24, #28, #30, #31) — 9 actually. Let me re-count: NEW IDs are 19, 20, 21, 22, 23, 24, 28, 30, 31 = 9.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 5 from this scan (#25, #26, #27, #29, #32) + 16 existing pages (samples: `business-property-relief-rental-property-iht`, `inheritance-tax-rental-property-uk-guide`, all Wave 4 C-bucket IHT pages)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 20 from topic_gaps_final §"IHT and estate planning"

---

## Topic cluster: BTL Ltd Co / Incorporation / SPV operations

### NEW candidates (10)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 33 | `directors-loan-account-property-spv-tax-implications-overdrawn-uk` | 1 | https://www.taxaccountant.co.uk/directors-loans-tax-implications/ | `director-loan-property-company` (residual) | §21.1 LOCKED — **REWRITE candidate, not NEW.** | **DOWNGRADED to DUPE-EXISTING** (residual already in Track 2A pool). |
| 34 | `alphabet-shares-property-spv-tax-saving-spouse-children-uk` | 1 | https://www.taxinsider.co.uk/tax-reports/alphabet-shares-the-essential-guide-for-tax-advisers | `alphabet-shares-property-spv-dividend-splitting-spouse-children` (Wave 4 A-bucket, ✅ done) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 35 | `salary-sacrifice-property-spv-director-pension-funding-uk` | 1 | https://bhp.co.uk/news-events/blog/could-the-budget-spell-the-end-to-pension-salary-sacrifice/ | `property-company-employer-pension-contributions-directors` (residual) | §21.5 LOCKED — REWRITE | **DOWNGRADED to DUPE-EXISTING.** |
| 36 | `dividend-tax-changes-property-spv-april-2026-rate-restructure` | 1 | https://www.property-tax-advice.co.uk/knowledge-centre/dividend-tax-changes-for-property-company-owners-from-april-2026/ | `property-company-dividend-tax` (residual) | §21.4 LOCKED — REWRITE | **DOWNGRADED.** |
| 37 | `family-office-property-portfolio-administration-uk-high-net-worth` | 2 (geraldedelman + hwfisher) | https://www.geraldedelman.com/services/family-office/; https://hwfisher.co.uk/services/family-office/ | None | §21 LOCKED + §22 LOCKED — family-office is a distinct service-tier topic; **PENDING** new HP | Family-office structure (governance, multi-generational property portfolio admin) for £10m+ portfolios is genuinely uncovered. |
| 38 | `property-spv-corporation-tax-marginal-relief-2026-27-mechanics` | 1 | https://www.ukpropertyaccountants.co.uk/corporation-tax-marginal-relief-uk-guide/ | `corporation-tax-rates-property-companies-2026-27` (residual) | **REWRITE candidate, not NEW.** | **DOWNGRADED.** |
| 39 | `buying-property-through-limited-company-conveyancing-step-by-step` | 3 (alexander-ene + samconveyancing + uklandlordtax) | https://www.samconveyancing.co.uk/blog/buying-property-through-a-limited-company; https://www.alexander-ene.co.uk/buying-property-through-a-limited-company.htm; https://uklandlordtax.co.uk/buying-property-through-a-limited-company/ | `how-to-set-up-property-investment-company-uk-guide` (residual) | §21 LOCKED — adjacent | The conveyancing-step-by-step angle (not the tax decision angle) is uncovered. Likely better as a REWRITE of residual. **DOWNGRADED.** |
| 40 | `property-spv-share-classes-design-spouses-children-tax-efficient-uk` | 1 | https://www.taxinsider.co.uk/tax-reports/alphabet-shares-the-essential-guide-for-tax-advisers | `alphabet-shares-property-spv-dividend-splitting-spouse-children` (Wave 4 A-bucket, ✅ done) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 41 | `property-spv-dla-overdrawn-s455-charge-mechanics-uk` | 1 | https://www.taxaccountant.co.uk/directors-loans-tax-implications/ | `btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction` (Wave 4 A, ✅ done) | §21.1 LOCKED — **DUPE-EXISTING.** | **DOWNGRADED.** |
| 42 | `employee-ownership-trust-eot-property-spv-disposal-mechanics-uk` | 3 (djh + taxaccountant + towerstone) | https://www.djh.co.uk/our-services/transactions/employee-ownership-trusts/; https://www.geraldedelman.com/insights/a-guide-to-employee-ownership-trusts/; https://www.taxaccountant.co.uk/glossary/employee-ownership-trusts/ | None | §21 LOCKED — needs new HP sub-section on EOT exit route for property companies; **PENDING** | EOT (Employee Ownership Trust) as an exit route for property-management or property-SPV is a niche but genuinely uncovered exit strategy. |
| 43 | `property-spv-corporate-acquisition-share-purchase-vs-asset-purchase-uk` | 1 | https://www.ukpropertyaccountants.co.uk/business-asset-disposal-relief-on-residential-property-disposals/ | None | §21 LOCKED + §5 LOCKED — needs new sub-section on M&A property-SPV transfer | M&A-style property-SPV transfer (share-purchase to claim BADR vs asset-purchase for SDLT efficiency) is uncovered. |
| 44 | `acquisition-of-property-development-company-due-diligence-tax-uk` | 1 | https://www.geraldedelman.com/insights/elevating-opportunities-for-aspiring-acquisition-entrepreneurs/ | None | §21 LOCKED — adjacent | Pre-acquisition tax due diligence for property-developer SPV targets — uncovered. Likely too niche; **DOWNGRADED** to PENDING-niche. |
| 45 | `property-spv-investors-relief-vs-badr-disposal-decision-uk` | 1 | https://www.ukpropertyaccountants.co.uk/hmrc-targets-investors-relief-claims-with-otm-letters/ | None | §5 LOCKED — needs sub-section on Investors' Relief s.169VW TCGA | Investors' Relief (s.169VW TCGA — separate from BADR, £10m lifetime allowance, 5-year holding) for property-SPV exits is genuinely uncovered. |

**Net NEW after correction:** 4 candidates: #37, #42, #43, #45. (#44 PENDING-niche.)

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 7 of the above + ~22 existing pages (samples: `corporation-tax-rates-property-companies-2026-27`, `director-loan-property-company`, `property-company-dividend-tax`, all Wave 1 B-bucket + Wave 4 A-bucket SPV pages)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 27 from topic_gaps_final §"Limited company / BTL company operation"

---

## Topic cluster: MTD ITSA — operational mechanics, software, exemptions

### NEW candidates (3)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 46 | `mtd-itsa-correcting-errors-after-quarterly-submission-mechanics` | 1 | https://rentalbux.com/guides/correcting-errors-after-an-mtd-submission | None (closest: `mtd-quarterly-reporting-landlords-step-by-step-guide`) | §19 LOCKED §19.16 — needs sub-section on amendment route | Mid-cycle error-correction in MTD quarterly submissions (resubmit vs end-of-period statement adjustment) is operational and uncovered. |
| 47 | `mtd-itsa-basis-period-reform-property-landlord-transition-2024-25-mechanics` | 2 (ATT x2) | (ATT submissions on basis period reform) | None | §19.1 LOCKED — needs sub-section on basis-period-reform-MTD interaction; **PENDING** new HP | The 2024/25 basis-period-reform + MTD interaction (overlap relief, spreading) for landlords with non-March year-ends is uncovered. |
| 48 | `mtd-itsa-categorising-rental-income-expenses-quarterly-mechanics` | 1 | https://rentalbux.com/blogs/categorise-business-income-expenses-mtd-itsa | None (closest: `mtd-record-keeping-landlords-digital-requirements`) | §19.16 LOCKED — adjacent | The HMRC category-list for MTD quarterly (rental income, repairs, finance, professional fees) is operational and uncovered as a dedicated page. |

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 22 (Wave 3 + Wave 4 B-bucket MTD pages + residual)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 14 from topic_gaps_final §"MTD for ITSA"

---

## Topic cluster: VAT — commercial, conversion, registration

### NEW candidates (5)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 49 | `vat-residential-conversion-5-percent-reduced-rate-mechanics-uk` | 1 | https://www.djh.co.uk/latest-news/news-insights/5-vat-rate-on-residential-conversions-save-thousands-on-your-property-development/ | None (Wave 5 covers conversion zero-rate, this is 5%-rate variant) | §1 + §21 — needs new sub-section on VAT Notice 708 5%-rate residential conversion; **PENDING** | The 5% reduced-rate (3-year empty, conversion-to-multiple-dwellings, change-of-use) is distinct from the zero-rate conversion route Wave 5 covered. |
| 50 | `vat-airbnb-serviced-accommodation-vat-threshold-trap-uk-landlords` | 2 (alanboswell + business-accounting + ukpropertyaccountants) | https://www.business-accounting.co.uk/blog/airbnb-vat-registration; https://uklandlordtax.co.uk/vat-on-serviced-accommodations-is-your-income-over-the-vat-threshold-(...) | None | §1 + §21 — needs sub-section on VAT-threshold tripping mechanic for Airbnb hosts; partially covered by topic_gaps_final but our angle is **landlord-niche** (decision tree, not market commentary) | Airbnb/STL hosts crossing the £90k VAT threshold is the dominant operational question and uncovered with PTP framing. |
| 51 | `vat-domestic-reverse-charge-construction-landlord-developer-mechanics` | 1 | https://hwfisher.co.uk/services/advising-on-all-property-related-vat-matters-including-new-dwellings-mixed-use-developments-conversions-student-accommodation-domestic-reverse-charge-etc/ | `domestic-reverse-charge-construction-vat-landlords` (W3 ATED-adjacent area, ✅ done in excluded list) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 52 | `vat-on-property-deposits-non-refundable-supply-or-damages-mechanics` | 1 | https://bhp.co.uk/news-events/news/20120312vat-treatment-deposits-land-which-dwellings-will-be-built/ | `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages` (Wave 5 A-5) | **DUPE-IN-FLIGHT.** | **DOWNGRADED.** |
| 53 | `vat-on-student-accommodation-developer-zero-rate-supply-mechanics` | 1 | https://hwfisher.co.uk/services/advising-on-all-property-related-vat-matters-including-new-dwellings-mixed-use-developments-conversions-student-accommodation-domestic-reverse-charge-etc/ | None | §1 + §21 — needs new sub-section on VAT Notice 708 student-accommodation zero-rating; **PENDING** | Student-accommodation developer VAT (zero-rate first grant of major interest) is uncovered. |
| 54 | `vat-on-private-school-fees-landlord-property-implications-jan-2025` | 3 (bhp + mytaxaccountant + saltus) | https://bhp.co.uk/news-events/blog/vat-on-private-school-fees/; https://www.mytaxaccountant.co.uk/post/vat-on-private-school-fees | None | NOT property-tax — **OUT OF SCOPE.** | **EXCLUDED — not a property topic.** |

**Net NEW after correction:** 3 candidates: #49, #50, #53.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 6 (the 4 calculator slugs + W3 reverse-charge + landlord-vat-registration)
- **DUPE-IN-FLIGHT:** 9 of 10 Wave 5 A-bucket VAT
- **DUPE-ALREADY-CANDIDATE:** 25 from topic_gaps_final §"VAT for landlords"

---

## Topic cluster: Form 17 / Joint ownership / Spouse mechanics

### NEW candidates (2)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 55 | `marriage-allowance-property-landlord-tax-saving-1260-uk-mechanics` | 3 (perrysaccountants + taxfix + taxradar) | https://perrysaccountants.co.uk/news/marriage-allowance; https://taxfix.com/en-uk/glossary/marriage-allowance/ | None | §24 LOCKED — adjacent | Marriage allowance (£1,260 transferable allowance) for property-landlord couples is uncovered — small but searched-for. |
| 56 | `civil-partnership-rental-property-tax-treatment-uk-equality-mechanics` | 1 | https://taxfix.com/en-uk/glossary/civil-partnership/ | `civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality` (Wave 5 C-25) | **DUPE-IN-FLIGHT.** | **DOWNGRADED.** |
| 57 | `deed-of-trust-property-stamp-duty-land-tax-implications-uk` | 1 | https://www.samconveyancing.co.uk/news/conveyancing/deed-of-trust-stamp-duty-8824 | `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 C-23) | **DUPE-IN-FLIGHT.** | **DOWNGRADED.** |
| 58 | `deed-of-trust-vs-loan-agreement-property-purchase-uk-tax-mechanics` | 1 | https://www.samconveyancing.co.uk/news/conveyancing/deed-of-trust-or-loan-agreement-9894 | None (closest: W5 C-23 covers deed-of-trust evidence side) | §24.3 LOCKED — adjacent | Deed-of-trust vs informal loan-agreement (when does the document carry beneficial-interest weight vs being a recovery instrument) is an under-served compliance topic. |
| 59 | `floating-deed-of-trust-variable-beneficial-interest-property-uk-mechanics` | 1 | https://www.samconveyancing.co.uk/news/conveyancing/floating-deed-of-trust-a-variable-beneficial-interest-8962 | None | §24.3 LOCKED — adjacent; **PENDING** sub-section on floating deeds | Floating (variable-share) deed of trust is a sophisticated structure — uncovered, real practical use for unmarried co-owners. |

**Net NEW after correction:** 3 candidates: #55, #58, #59.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 0
- **DUPE-IN-FLIGHT:** 10 of 10 Wave 5 C-bucket Form-17 candidates
- **DUPE-ALREADY-CANDIDATE:** 4 from topic_gaps_final §"Joint ownership & Form 17 tax planning"

---

## Topic cluster: Devolved tax (Welsh LTT / Scottish LBTT)

### NEW candidates (0)

All major Welsh LTT and Scottish LBTT topics are covered by Wave 5 B-bucket (10 candidates) or already in topic_gaps_final §"SDLT — Scottish / Welsh equivalents" (12 candidates).

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 0 (no live devolved-tax pages on main)
- **DUPE-IN-FLIGHT:** 10 of 10 Wave 5 B-bucket
- **DUPE-ALREADY-CANDIDATE:** 12 from topic_gaps_final §"SDLT — Scottish / Welsh equivalents"

---

## Topic cluster: Leasehold / freehold / extensions / commonhold

### NEW candidates (6)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 60 | `lease-extension-statutory-vs-informal-tax-implications-uk-landlord` | 3 (boltburdon x2 + samconveyancing) | https://www.boltburdon.co.uk/blogs/could-an-informal-lease-extension-be-better-value-for-money-after-introduction-of-the-leasehold-reform-ground-rent-act-2022/; https://www.samconveyancing.co.uk/news/conveyancing/absent-freeholder-lease-extension; https://www.samconveyancing.co.uk/news/conveyancing/can-t-agree-lease-extension-terms-with-your-freeholder-what-happens-next-8242 | `lease-extension-vs-freehold-purchase` (topic_gaps_final candidate) | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 61 | `share-of-freehold-property-tax-implications-uk-landlord-mechanics` | 2 (boltburdon + charcol) | https://www.boltburdon.co.uk/blogs/what-is-a-share-of-freehold/; https://www.charcol.co.uk/mortgages/specialist-property-mortgages/share-of-freehold-mortgage/ | None | §22 LOCKED — adjacent; **PENDING** new HP on share-of-freehold treatment | Share-of-freehold structure (RTM company, flat-management) is a real flat-investor concern uncovered. |
| 62 | `commonhold-leasehold-reform-bill-property-investor-tax-impact-uk` | 3 (ukpropertyaccountants + boltburdon + topic_gaps_final candidate) | https://www.boltburdon.co.uk/blogs/commonhold-and-leasehold-reform-bill-reform-or-risk/; https://www.ukpropertyaccountants.co.uk/commonhold-and-leasehold-reform-bill/; https://www.ukpropertyaccountants.co.uk/leasehold-law-reforms-included-in-the-kings-speech/ | `commonhold-and-leasehold-reform-bill` (topic_gaps_final candidate) | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 63 | `building-safety-act-2022-landlord-leaseholder-cladding-cost-recovery-uk` | 4 (nrla x4 + ukpropertyaccountants) | https://www.nrla.org.uk/news/cladding-building-safety-bill-becomes-law-nrla-secures-funding-for-many-landlords; https://www.ukpropertyaccountants.co.uk/cladding-crisis-and-sdlt-relief-what-affected-property-owners-need-to-know/; https://www.nrla.org.uk/news/cladding-government-open-to-discussion-on-supporting-private-landlords | None | §1 + §22 LOCKED — adjacent; **PENDING** new HP on BSA 2022 / Cladding | Building Safety Act 2022 — leaseholder cost protection, qualifying lease definition, landlord cost recovery — is a real legal/tax question with no on-site coverage. |
| 64 | `leasehold-reform-ground-rent-act-2022-landlord-portfolio-impact-uk` | 1 | (referenced in boltburdon) | None | §12 RRA-area + new HP needed; **PENDING** | Leasehold Reform (Ground Rent) Act 2022 (pepper-corn rent on new leases) is a property-portfolio income reduction many landlords don't realise has tax knock-ons. |
| 65 | `absent-freeholder-leasehold-extension-vesting-order-property-tax-uk` | 1 | https://www.samconveyancing.co.uk/news/conveyancing/absent-freeholder-lease-extension | None | §22 + new HP; **PENDING** | Absent-freeholder vesting-order route (Part II Schedule 6 LRA 1993) is a niche but specific property-tax mechanic with no coverage. |
| 66 | `service-charge-residential-block-management-accounting-tax-treatment-uk` | 1 (ukpropertyaccountants candidate in topic_gaps_final already) | (already covered) | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |

**Net NEW after correction:** 4 candidates: #61, #63, #64, #65.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 0
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** ~10 (mostly in topic_gaps_final §"Service charges and ground rent" + §"Lease extensions")

---

## Topic cluster: Commercial property

### NEW candidates (3)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 67 | `option-to-tax-commercial-property-landlord-decision-framework-uk` | 2 (fhpaccounting + taxaccountant) | https://fhpaccounting.co.uk/option-to-tax-on-commercial-property/; https://www.taxaccountant.co.uk/option-to-tax-on-commercial-property/ | `vat-option-to-tax-commercial-property-mechanics-election-revocation` (Wave 5 A-1, ✅ done) | **DUPE-IN-FLIGHT (just shipped).** | **DOWNGRADED.** |
| 68 | `pension-fund-commercial-property-investment-sipp-ssas-mechanics-uk` | 2 (alanboswell + ukpropertyaccountants) | https://www.alanboswell.com/resources/invest-pension-in-commercial-property/; (ukpropertyaccountants services page) | None | §15 + new HP on SIPP/SSAS commercial; **PENDING** new HP | SIPP/SSAS holding commercial property (the legal vehicle, in-specie transfer, rent payments to scheme) is a real high-value mechanic with zero on-site coverage. |
| 69 | `commercial-property-tenant-fit-out-capital-allowances-mechanics-uk` | 1 | https://bhp.co.uk/news-events/blog/capital-allowances-and-section-198-elections-a-crucial-step-in-commercial-property-transactions/ | `commercial-property-tax-landlords-rates-reliefs-allowances` (residual) | §1 + §5 — adjacent; covered by residual | **DUPE-EXISTING** (residual). |
| 70 | `section-198-election-capital-allowances-commercial-property-purchase-uk` | 2 (bhp + djh) | https://bhp.co.uk/news-events/blog/capital-allowances-and-section-198-elections-a-crucial-step-in-commercial-property-transactions/; https://www.djh.co.uk/our-services/tax/business-tax/capital-allowances/buying-or-selling-a-commercial-property/ | None | §1 + §5 — new sub-section needed; **PENDING** | s.198 election in commercial property M&A (binding fixed-value allocation, 2-year window) is genuinely a missing high-value technical topic. |

**Net NEW after correction:** 2 candidates: #68, #70.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 1 (`commercial-property-tax-landlords-rates-reliefs-allowances` residual + `capital-allowances-commercial-property-what-can-claim` residual)
- **DUPE-IN-FLIGHT:** 1 (W5 A-1)
- **DUPE-ALREADY-CANDIDATE:** ~3 from topic_gaps_final scattered references

---

## Topic cluster: HMO / serviced accommodation / FHL / short-term let

### NEW candidates (6)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 71 | `hmo-council-tax-room-by-room-banding-reform-2025-26-landlord-mechanics` | 2 (nrla + ukpropertyaccountants) | https://www.nrla.org.uk/news/hmo-council-tax-consultation; https://www.ukpropertyaccountants.co.uk/hmo-council-tax-licensing-reforms-in-the-england-2025-26/ | None | §12 + §1 — adjacent; new HP on HMO council-tax reform; **PENDING** | December 2023 reform of HMO council-tax (single banding for converted HMOs) is operational and uncovered. |
| 72 | `rent-to-rent-business-model-property-tax-treatment-uk-landlord` | 3 (rentalbux + nrla + ukpropertyaccountants) | https://rentalbux.com/blogs/detailed-guide-to-rent-to-rent-property-in-uk; https://www.ukpropertyaccountants.co.uk/property-taxes-key-information-for-rent-to-rent-landlords/; https://www.ukpropertyaccountants.co.uk/landlord-wins-in-major-rent-to-rent-dispute/ | None | §1 + §5 + new HP on R2R + RRA implications; **PENDING** | Rent-to-rent (sub-letting business) has distinct tax treatment (trading vs investment), legal status post-RRA, and zero on-site coverage. |
| 73 | `airbnb-classed-as-buy-to-let-mortgage-tax-decision-framework-uk` | 1 | https://www.alanboswell.com/resources/airbnb-classed-as-buy-to-let/ | `airbnb-tax-uk-short-term-rental-income-taxed` (residual, also Stage 1 trial pick) | **DUPE-EXISTING (residual; Track 2A trial pick).** | **DOWNGRADED.** |
| 74 | `hmo-conversion-planning-permission-class-c4-tax-uk-mechanics` | 1 | https://www.ukpropertyaccountants.co.uk/sectors/property-developers/hmo-conversion/ | None | §1 + §5 — adjacent; new HP on Use Class C4 implications; **PENDING** | C3-to-C4 conversion (use-class change) for HMOs carries SDLT mixed-use + capital-allowances reconfiguration impact — uncovered. |
| 75 | `serviced-accommodation-tourist-tax-england-uk-landlord-impact-2026` | 1 | https://www.ukpropertyaccountants.co.uk/autumn-budget-effect-england-tourist-tax-its-impact-on-serviced-accommodation-providers/ | None (FHL abolition covers different angle) | §6 — adjacent; **PENDING** new HP on tourist-tax | England tourist-tax (consulted on autumn 2025) for serviced accommodation is forward-looking but landlord-relevant. |
| 76 | `cgt-on-fhl-disposal-post-april-2025-transitional-rules-mechanics-uk` | 1 | https://www.ukpropertyaccountants.co.uk/cgt-rules-exemptions-for-selling-furnished-holiday-lets-fhl/ | `serviced-accommodation-tax-fhl-abolition-april-2025` (residual); `furnished-holiday-let-tax-rules-exemptions` (residual) | §6 LOCKED — needs sub-section on post-abolition CGT (BADR, rollover loss) | The post-April-2025 CGT treatment of FHL disposals (lost BADR, lost rollover, lost gift relief) is mentioned in residual but uncovered as a dedicated topic. |
| 77 | `nrla-property-management-software-fhl-hmo-landlord-comparison-uk` | 1 | (multiple property-management software news items) | None — but adjacent to existing software pillars | **OUT OF SCOPE** for tax-niche — comparison rather than tax mechanic | **EXCLUDED.** |

**Net NEW after correction:** 4 candidates: #71, #72, #74, #75, #76. = 5.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 12 (residual FHL + HMO + serviced-accommodation cluster)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 9 from topic_gaps_final §"Serviced accommodation, short-term lets" + §"HMOs"

---

## Topic cluster: Niche specialisms (cladding, building safety, EV, energy, etc.)

### NEW candidates (8)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 78 | `ev-chargepoint-grant-tax-landlord-claim-allowance-uk-2026` | 1 | https://www.ukpropertyaccountants.co.uk/ev-chargepoint-infrastructure-grants-for-landlords/ | None | §1 + §5 — new HP on EV-infrastructure landlord grant; **PENDING** | EV Chargepoint Infrastructure Grant + capital-allowance treatment for landlords is operational and uncovered. |
| 79 | `electric-vehicle-home-charging-point-tax-relief-property-developer-uk` | 2 (taxaccountant + rpgcrouchchapman) | https://www.taxaccountant.co.uk/electric-vehicle-home-charging-point-tax-relief/; https://www.rpgcrouchchapman.co.uk/resources/blog/electric-vehicles-and-tax-breaks/ | None | §1 + §5 — same as #78 cluster; **PENDING** | EV home-charging tax relief (s.40A FA 2020) for property-portfolio mixed-use — uncovered. |
| 80 | `epc-c-rating-requirement-landlord-spending-cap-2030-uk-cost-mechanics` | 5 (nrla x5) | https://www.nrla.org.uk/news/epc-c-government-cuts-landlord-spending-cap; https://www.nrla.org.uk/news/epc-rules-for-rented-property-what-you-need-to-know; https://www.nrla.org.uk/news/epcs-and-buy-to-let-finance-what-landlords-need-to-know | None | §12 LOCKED + new HP on MEES regime extension to EPC C; **PENDING** | EPC C requirement (proposed 2028/2030) — landlord spending cap (£10k now £15k) — is the dominant landlord-cost question. Zero on-site coverage. |
| 81 | `epc-energy-efficiency-grants-landlord-claim-mechanics-uk-2026` | 2 (nrla x2) | https://www.nrla.org.uk/news/are-you-eligible-to-receive-a-government-energy-saving-grant-to-improve-the-epc-rating-of-your-property; https://www.nrla.org.uk/news/boost-your-epc-rating-before-its-too-late-what-landlords-need-to-know | None | §1 + new HP on EPC grants; **PENDING** | Energy-saving grants for landlords (ECO4, LAD3, Boiler Upgrade Scheme) carry both income and capital-allowance implications — uncovered. |
| 82 | `gas-safety-certificate-fire-safety-landlord-uk-tax-deductible-mechanics` | 3 (nrla + samconveyancing + alexander-ene) | https://www.nrla.org.uk/news/call-of-the-week-gas-safety-certificate-date; https://www.nrla.org.uk/resources/looking-after-your-property/fire-safety-in-individual-purpose-built-flats; https://www.nrla.org.uk/resources/managing-your-tenancy/fire-safety-overview | None | §1 — straightforward; **PENDING** Pawson-test interaction with safety obligations? Likely no | Gas Safety Certificate + fire-safety expenses (annual costs, deductibility) is a recurring landlord compliance question — uncovered. |
| 83 | `cladding-remediation-cost-recovery-leaseholder-landlord-mechanics-uk` | 4 (ukpropertyaccountants + nrla x3) | (cladding cluster URLs in #63) | None | §1 + §22 — same as #63 cluster; **PENDING** new HP | Cladding-cost recovery mechanism (Building Safety Act 2022 qualifying lease, developer remediation contract, landlord cost protection) is a major operational topic. |
| 84 | `derelict-uninhabitable-property-non-residential-rate-claim-bewley-test-uk` | 1 | (overlap with #3 SDLT cluster) | **DUPE-NEW (consolidates with #3).** | — | (Consolidated into #3.) |
| 85 | `letting-agent-tax-obligations-fee-deductibility-platform-reporting-dac7-uk` | 1 | https://www.ukpropertyaccountants.co.uk/online-seller-tax-regulations-new-reporting-rules-for-platforms-like-airbnb-ebay-and-vinted/ | None | §1 + new HP on DAC7 + OECD digital platform reporting; **PENDING** | DAC7 / OECD digital-platform reporting (Airbnb, Booking.com, Vrbo reporting host income to HMRC) is operational and missing. |
| 86 | `landlord-data-protection-gdpr-tenant-information-handling-uk-mechanics` | 1 | https://www.propertyaccountant.co.uk/landlord-data-protection-compliance/ | None | New HP needed; **PENDING** — but borderline-niche for accounting practice | GDPR + tenant data handling for landlords — borderline-tax. Likely **DOWNGRADED** to pending-niche. |
| 87 | `landlord-tourist-tax-scotland-edinburgh-uk-stl-impact-2026` | 1 | https://uklandlordtax.co.uk/short-term-lets-changes-scotland/ | None — but adjacent to topic_gaps_final candidate | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |

**Net NEW after correction:** 7 candidates: #78, #79, #80, #81, #82, #83, #85. (#86 borderline-niche pending.)

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 0
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 2

---

## Topic cluster: Property accountant services (specialism niches)

### NEW candidates (3)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 88 | `accidental-landlord-tax-treatment-paye-property-income-decision-uk` | 1 | https://www.ukpropertyaccountants.co.uk/accidental-landlord-taxes-a-complete-guide/ | None — but in topic_gaps_final | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 89 | `multi-property-landlord-tax-planning-5-plus-properties-uk-strategies` | 1 | https://www.taxaccountant.co.uk/can-i-sell-a-property-to-my-wife-to-reduce-cgt/ (and others) | `multi-property-landlord-tax-planning-strategies-5-plus-properties` (excluded list) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 90 | `change-property-accountant-uk-how-when-decision-framework-landlord` | 1 | https://uklandlordtax.co.uk/change-landlord-accountants/ | None — but in topic_gaps_final | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 91 | `property-accountant-onboarding-checklist-new-landlord-uk-mechanics` | 1 | https://uklandlordtax.co.uk/onboarding-incorporation/ | None — but in topic_gaps_final (partial overlap with `llp-incorporation-a-complete-guide`) | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 92 | `property-accountant-data-protection-compliance-gdpr-tenant-info-uk` | 1 | https://www.propertyaccountant.co.uk/landlord-data-protection-compliance/ | None | New HP; **PENDING** — borderline-niche | (Same as #86; consolidated.) |
| 93 | `letting-agent-managed-portfolio-tax-mechanics-landlord-uk` | 1 | (referenced via Wave 4 B-13 `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly` — already shipped) | **DUPE-EXISTING.** | **DOWNGRADED.** |

**Net NEW after correction:** 0 in this cluster. All consolidated into other clusters or duplicates.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 15 (city-accountant pages + service-style residual pages)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 19 from topic_gaps_final §"Property accountant for cities / regions"

---

## Topic cluster: Capital allowances / SBA / writing-down

### NEW candidates (4)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 94 | `structures-buildings-allowance-sba-3-percent-property-landlord-mechanics-uk` | 2 (ukpropertyaccountants candidate + ukpropertyaccountants residual) | (already covered in topic_gaps_final as 2 candidates) | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 95 | `super-deduction-130-percent-130-fya-property-investor-2021-23-uk` | 1 | https://www.ukpropertyaccountants.co.uk/capital-allowances-super-deduction-can-you-claim-after-31-march-2023/ | None | §1 + §5 — historical; **PENDING** but probably skip (sunset) | Super-deduction sunset — historical interest only. **DOWNGRADED to skip.** |
| 96 | `capital-allowances-section-198-election-commercial-property-purchase-uk` | (same as #70) | — | **DUPE-NEW (consolidated with #70).** | — | (Consolidated.) |
| 97 | `full-expensing-property-spv-corporation-tax-mechanics-uk-2026` | 1 | https://www.ukpropertyaccountants.co.uk/capital-allowances-full-expensing-and-50-fya/ | `full-expensing-capital-allowances` (residual) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 98 | `capital-allowance-claims-on-fhl-pre-vs-post-abolition-property-uk` | 1 | https://www.ukpropertyaccountants.co.uk/capital-allowances-for-furnished-holiday-lettings-pre-post-abolition-guide/ | None | §6 LOCKED — adjacent; new sub-section needed | The April 2025 FHL abolition stranded existing FHL capital-allowance claims — transitional handling is uncovered. |
| 99 | `capital-allowance-self-assessment-claim-property-landlord-uk` | 1 | https://www.ukpropertyaccountants.co.uk/capital-allowances-claim-on-self-assessment-tax-return/ | None | §1 + new HP | The mechanics of claiming CA in a property SA (not Ltd-Co) — what box, what evidence, year-of-claim — uncovered. |

**Net NEW after correction:** 2 candidates: #98, #99.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** ~12 (the residual AIA / annual-investment-allowance quartet + Wave 1 + W3 ATED capital-allowance)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 2 from topic_gaps_final §"Structures & Buildings Allowance"

---

## Topic cluster: NRL / DTA / non-resident / expat

### NEW candidates (4)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 100 | `nrl-disregarded-income-rule-non-resident-landlord-uk-mechanics` | 1 | https://www.mytaxaccountant.co.uk/post/disregarded-income-non-resident | `non-resident-landlord-scheme-uk-complete-guide` (residual); `nrl-approval-receive-rent-gross-hmrc-guide` (residual) | §17.5 LOCKED — needs sub-section on disregarded-income (s.811 ITA 2007) for NRL | Disregarded-income rule (s.811 ITA 2007 — NRL can elect not to file UK SA for excluded income types) is uncovered. |
| 101 | `corporation-tax-non-resident-landlord-company-2020-mechanics-uk` | 1 | https://www.geraldedelman.com/insights/corporation-tax-for-non-resident-landlords-an-explainer/ | `non-resident-landlord-scheme-uk-complete-guide` (residual); `corporation-tax-rates-property-companies-2026-27` (residual) | §17 + §21 — needs sub-section on NRL corporate from April 2020; **PENDING** | NRL companies moved from income tax to corporation tax (April 2020) — operational mechanic uncovered as dedicated topic. |
| 102 | `dta-unilateral-relief-foreign-tax-credit-property-landlord-uk-mechanics` | 1 | https://www.taxaccountant.co.uk/double-tax-treaties-unilateral-relief/ | `foreign-tax-credit-uk-property-overseas-landlords` (Wave 2 B-bucket, ✅ done) | §16 LOCKED — **DUPE-EXISTING.** | **DOWNGRADED.** |
| 103 | `dta-double-tax-treaty-residency-tie-breaker-property-landlord-uk` | 1 | https://www.geraldedelman.com/insights/double-tax-agreements-how-to-avoid-being-taxed-twice/ | `dta-tie-breaker-test-dual-residence-property-owners` (W2 ✅ done) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 104 | `expat-uk-tax-on-rental-income-self-assessment-route-mechanics-uk` | 1 | https://www.ukpropertyaccountants.co.uk/expat-guide-uk-tax-on-rental-income-via-self-assessment/ | `uk-property-income-expats-tax-obligations-explained` (residual) | **DUPE-EXISTING (residual REWRITE candidate).** | **DOWNGRADED.** |

**Net NEW after correction:** 2 candidates: #100, #101.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 25 (Wave 2 B+C + DTA + expat residual + NRL pages)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 14 from topic_gaps_final §"Double Taxation Agreements" + §"Leaving the UK" + §"Non-resident landlords"

---

## Topic cluster: Other — penalties, voluntary disclosure, audit, partnership/LLP

### NEW candidates (5)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 105 | `airbnb-tax-investigation-hmrc-let-property-campaign-mechanics-uk` | 1 | https://www.taxaccountant.co.uk/airbnb-tax-investigations-by-hmrc/ | None — but topic_gaps_final has LPC cluster | **DUPE-ALREADY-CANDIDATE** (LPC bucket). | **DOWNGRADED.** |
| 106 | `let-property-campaign-vs-digital-disclosure-service-decision-uk-landlord` | 1 | https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-hmrcs-digital-disclosure-service/ | None — but topic_gaps_final has DDS candidate | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 107 | `hmrc-nudge-letter-landlord-rental-income-response-mechanics-uk` | 1 | https://www.ukpropertyaccountants.co.uk/hmrcs-nudge-letters-on-business-asset-disposal-relief/ (and others) | None — but in topic_gaps_final | **DUPE-ALREADY-CANDIDATE.** | **DOWNGRADED.** |
| 108 | `hmrc-discovery-assessment-time-limits-property-landlord-uk-mechanics` | 1 | https://www.shipleystax.com/2022/06/business-asset-disposals-tax-investigations/ | None | §1 — new HP; **PENDING** | Discovery assessment time limits (4y/6y/20y under s.36 TMA 1970) for property landlord enquiries — uncovered as a dedicated topic. |
| 109 | `closure-notice-hmrc-property-investigation-landlord-mechanics-uk` | 1 | (related to discovery cluster) | None | §1 — same as #108; **PENDING** | Closure notice (s.28A TMA 1970) — what it means + appeal rights — uncovered. |
| 110 | `code-of-practice-9-cop9-property-landlord-tax-evasion-disclosure-uk` | 1 | (cluster signal) | None | §1 — new HP; **PENDING** | CoP9 (HMRC Civil Investigation of Fraud) is the serious-end of tax disclosure — uncovered, high-search-intent. |
| 111 | `appeal-against-hmrc-tax-decision-property-landlord-mechanics-uk` | 1 | (various) | None | §1 — new HP; **PENDING** | Tax tribunal appeal process for landlord disputes — uncovered. |
| 112 | `mortgage-arrangement-fee-tax-deductibility-property-landlord-uk-2026` | 1 | (from charcol cluster) | `mortgage-arrangement-fees-deductible-landlord` (residual) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 113 | `property-llp-tax-mechanics-vs-ordinary-partnership-uk-landlord-decision` | 1 (cross-cluster from partnership) | https://www.ukpropertyaccountants.co.uk/llp-and-taxation-benefits/ | `llp-property-investment-worth-considering` (residual) | **DUPE-EXISTING.** | **DOWNGRADED.** |
| 114 | `hybrid-llp-property-investment-tax-advantage-uk-landlord-mechanics` | 1 | https://uklandlordtax.co.uk/hybrid-limited-liability-partnership/ | None | **DUPE-ALREADY-CANDIDATE** (in topic_gaps_final). | **DOWNGRADED.** |

**Net NEW after correction:** 4 candidates: #108, #109, #110, #111.

### DUPE counts (this cluster)
- **DUPE-EXISTING:** ~4
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** ~12

---

## Topic cluster: Property finance / mortgage / refinancing

### NEW candidates (2)

| # | Proposed slug | Frequency (X/55) | Top 3 competitor URLs | Closest on-site page | House-position fit | One-sentence rationale |
|---|---|---|---|---|---|---|
| 115 | `right-to-buy-tenant-mortgage-tax-implications-purchase-mechanics-uk` | 2 (charcol x2) | https://www.charcol.co.uk/mortgages/bad-credit-mortgages/can-i-get-a-right-to-buy-mortgage-if-i-have-bad-credit/; https://www.charcol.co.uk/ask-the-mortgage-experts/can-i-remortgage-a-right-to-buy-property-5981/ | None | §1 + §5 — new HP on Right to Buy + ex-RTB property; **PENDING** | Right to Buy (tenant purchase from council) + subsequent rent — investor angle uncovered. Likely borderline niche. |
| 116 | `bridging-loan-property-investor-tax-treatment-finance-cost-uk-mechanics` | 1 (cluster signal across charcol + others) | (various charcol bridging news items) | None | §4 + §1 — new HP on bridging loan tax mechanics; **PENDING** | Bridging-loan tax treatment (finance-cost vs capital, when interest deductible) for property flippers and developers — uncovered. |

**Net NEW after correction:** 2 candidates: #115, #116. (#115 borderline-niche.)

### DUPE counts (this cluster)
- **DUPE-EXISTING:** 5 (BTL-mortgage + refinancing + deposit cluster residual)
- **DUPE-IN-FLIGHT:** 0
- **DUPE-ALREADY-CANDIDATE:** 1 from topic_gaps_final §"Property finance"

---

## Summary tables — clusters x status

### NEW candidates by cluster (consolidated)

| Cluster | NEW count |
|---|---|
| SDLT | 8 |
| CGT | 7 |
| IHT | 9 |
| BTL Ltd Co / Incorporation | 4 |
| MTD ITSA | 3 |
| RRA 2025 / Renters' Rights | 0 (covered by Wave 3 + topic_gaps_final + Wave 5) |
| VAT | 3 |
| Form 17 / Joint ownership / Spouse | 3 |
| Devolved tax | 0 |
| Leasehold / freehold | 4 |
| Commercial property | 2 |
| HMO / SA / FHL / STL | 5 |
| Niche specialisms (EPC, EV, cladding, BSA, DAC7) | 7 |
| Property accountant services | 0 |
| Capital allowances / SBA | 2 |
| NRL / DTA / expat | 2 |
| Penalties / enquiries / partnership | 4 |
| Property finance | 2 |
| **TOTAL NEW** | **65** |

### Aggregate counts

| Status | Approx count |
|---|---|
| Total mined topical URLs | 15,275 from 55 cached sitemaps |
| Unique slugs (post extract) | 14,574 |
| Promising (tax-keyword + not landing-page) | 8,305 |
| **NEW** (after de-dup against all sources, semantically reasoned) | **65** |
| **DUPE-EXISTING** (overlaps with 406 published) | ~150 distinct concepts |
| **DUPE-IN-FLIGHT** (overlaps with Wave 5 30 candidates) | ~33 (10 VAT-A + 10 LTT-LBTT-B + 10 Form17-C + 3 inter-wave) |
| **DUPE-ALREADY-CANDIDATE** (overlaps with topic_gaps_final 429) | ~210 distinct concepts |

---

## Top 10 NEW candidates overall (by composite score)

Composite score = frequency × house-position fit weight × topical adjacency proximity:

1. **#80 `epc-c-rating-requirement-landlord-spending-cap-2030-uk-cost-mechanics`** — freq 5/55 (NRLA dominant signal); house-position fit PENDING new HP (Wave 6+ lock candidate). Highest landlord-cost question of 2026-2030. **Score: 9.5/10.**
2. **#21 `iht-property-trust-registration-service-trs-landlord-compliance`** — freq 4/55 across 4 distinct competitors (geraldedelman + ATT x2 + hwfisher). House-position fit §22 + PENDING new HP. Compliance-side gap. **Score: 9.0/10.**
3. **#83 `cladding-remediation-cost-recovery-leaseholder-landlord-mechanics-uk`** — freq 4/55 (NRLA + UKPA). House-position fit §1 + §22 + PENDING new HP on BSA 2022. Live political topic. **Score: 9.0/10.**
4. **#72 `rent-to-rent-business-model-property-tax-treatment-uk-landlord`** — freq 3/55 (rentalbux + NRLA + UKPA). House-position fit §1 + §5 + PENDING new HP on R2R + RRA. High-growth landlord segment. **Score: 8.5/10.**
5. **#19 `iht-life-interest-trust-rental-property-tax-implications-uk-landlord`** — freq 2/55 across distinct specialist sites. House-position fit §9 + §22 + PENDING new HP on IPDI/QIIP. High-net-worth landlord segment. **Score: 8.5/10.**
6. **#70 `section-198-election-capital-allowances-commercial-property-purchase-uk`** — freq 2/55 (BHP + DJH — specialist accounting firms). House-position fit §1 + §5 + PENDING new HP. Technical, recurring deal-flow topic. **Score: 8.0/10.**
7. **#68 `pension-fund-commercial-property-investment-sipp-ssas-mechanics-uk`** — freq 2/55 (Alan Boswell + UKPA). House-position fit §15 + PENDING new HP on SIPP/SSAS commercial. High-search-volume property-investor segment. **Score: 8.0/10.**
8. **#7 `sdlt-incorporation-partnership-vehicle-zero-charge-mechanics`** — freq 2/55 (samconveyancing + uklandlordtax). House-position fit §1 + PENDING sub-section on Sch 15 FA 2003 partnership relief. High-value incorporation question. **Score: 8.0/10.**
9. **#85 `letting-agent-tax-obligations-fee-deductibility-platform-reporting-dac7-uk`** — freq 1/55 but distinct angle. House-position fit §1 + PENDING new HP on DAC7. Forward-looking compliance topic, 2024-onwards live. **Score: 7.5/10.**
10. **#42 `employee-ownership-trust-eot-property-spv-disposal-mechanics-uk`** — freq 3/55 across specialist firms. House-position fit §21 + PENDING new HP on EOT property exit. Specialist niche but exit-focused, high-value. **Score: 7.5/10.**

---

## Conflicts surfaced

1. **#7 `sdlt-incorporation-partnership-vehicle-zero-charge-mechanics`** — adjacent to `sdlt-incorporation-stamp-duty-twice` (excluded as 2026-05-21 rewrite). Different angle (partnership Sch 15 relief vs paying SDLT twice), but Wave 5 / Wave 6 manager should verify no cannibalisation with the rewritten page.

2. **#6 `sdlt-non-uk-resident-2-percent-surcharge-day-counting-mechanics`** — `sdlt-non-resident-2-percent-surcharge` is in the excluded-Wave-1 list (already shipped). NEW angle is day-counting / SRT-adjacent mechanic, NOT the rate itself. Wave 6 manager should verify the deprecated Wave-1 page covers day-counting depth or if this is genuine new territory.

3. **#34 `alphabet-shares-property-spv-tax-saving-spouse-children-uk`** — downgraded to DUPE-EXISTING; Wave 4 A-bucket shipped `alphabet-shares-property-spv-dividend-splitting-spouse-children`. Verified.

4. **#25 / #26 / #27 / #29 / #32 IHT cluster** — all downgraded to DUPE-EXISTING (Wave 4 C-bucket + Wave 2 covered these). Verified during semantic check.

5. **#42 EOT Property SPV** — EOT topic has 3 freq-1 mentions across specialist firms but the on-site EOT topic in `employee-ownership-trusts` is also in topic_gaps_final §"Trusts and beneficial ownership". Property-SPV-EOT angle distinct from the generic EOT entry; flagging for Wave 6 manager to decide. **Possible DUPE-ALREADY-CANDIDATE if §"Trusts" candidate intended to cover this.**

6. **Building Safety Act 2022 / Cladding cluster (#63, #83)** — these overlap with topic_gaps_final §"CIL & Section 106" general items but are conceptually distinct. **Likely safe NEW** but Wave 6 manager should verify the topic_gaps_final cluster doesn't already commission BSA 2022 cladding coverage.

7. **EPC / Energy efficiency cluster (#80, #81)** — overlaps with `epc-energy-performance-certificates-epc` candidate in topic_gaps_final §"Family Investment Companies & FICs" (oddly categorised). Wave 6 should re-cluster the existing candidate before commissioning new EPC pages.

8. **Wave 5 §23 / §24 LOCKED 2026-05-23** — verified at heartbeat. No Wave 5 collisions with NEW candidates above.

---

## Methodology and self-audit

**Sources used (per §16.31 URL-discipline):** Every competitor URL above was extracted directly from the 55 cached sitemap JSONs at `briefs/property/_sitemap_cache_v2/*.json`. No URLs hallucinated. Spot-check a 5% sample at Stage 2 of Wave 6 brief drafting.

**Reasoning discipline (per §16.18):** Semantic cluster grouping + slug-token analysis. No Jaccard scripts used for cannibalisation decisions (only for initial promising-set generation; final NEW/DUPE assignment was per-row LLM semantic check against the Cannibalisation Index and topic_gaps_final pool).

**Self-correction:** Multiple candidates initially listed as NEW were downgraded to DUPE-EXISTING / DUPE-IN-FLIGHT / DUPE-ALREADY-CANDIDATE on second-pass semantic review (visible in the table notes — e.g., #11, #16, #25-#29, #33-#36 etc.). This is the reasoning-first discipline working as intended.

**Yield check:** 65 NEW candidates falls inside the expected 50-200 range (per the dispatch brief). Below the upper bound because:
1. Wave 5 ate the natural Form 17 / Devolved / VAT options-cluster slots (30 candidates removed).
2. topic_gaps_final.md already absorbed 429 candidates — the largest sitemap (`ukpropertyaccountants.co.uk` with 1,479 topical URLs) was already mined at v1 stage.
3. Many freq-1 candidates from low-signal sites were genuinely too thin or news-event-shaped to warrant a PTP page.

**House-position gap signal:** Of 65 NEW candidates, **~28 are PENDING new house position** (BSA 2022, EPC C, R2R, TRS, IPDI/QIIP trusts, EV chargepoint, SIPP commercial, DAC7, Section 198, etc.). Wave 6 manager will need to schedule ~8-10 new HP lock sessions before Wave 6 Stage 2 can dispatch.

**Time spent:** approximately 2 hours 15 minutes (within the 2-3 hour estimate).

---

## Recommended next actions for parent Track 2 manager

1. **Validate top 10 NEW candidates** against Wave 5 manager and house_positions §23/§24 active-lock state. Confirm no collision.
2. **Schedule house-position lock sessions** for the ~10 PENDING areas before Wave 6 can dispatch Stage 2.
3. **Sub-cluster the 65 NEW candidates** by lockable-HP grouping: e.g., all BSA 2022 / Cladding into one HP session; all EPC / Energy into another; all Trust-mechanics into one (IPDI + TRS + life-interest + chargeable-lifetime).
4. **Decide on Phase 2 expansion** (per §19.2): is 55 sitemaps enough, or fetch the remaining 180 v2-universe domains? Recommendation: this trial yielded sufficient volume — proceed to Wave 6 with current pool.
5. **Track 2A trial briefs** (3 hand-drafted) remain pending — Track 2B output here does not affect Track 2A trial schedule.
