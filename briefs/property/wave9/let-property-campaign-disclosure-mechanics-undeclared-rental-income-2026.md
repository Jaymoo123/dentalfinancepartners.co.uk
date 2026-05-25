# Wave 9 brief seed: let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026

**Site:** property
**Bucket:** C (HMRC penalties + enquiries depth)
**Pick:** C1 — Let Property Campaign mechanics; voluntary disclosure penalty mitigation vs prompted disclosure; quality-of-disclosure framework
**Brief type:** Net-new page (Stage 1 seed — full content for Stage 2)
**Source markdown path on launch:** `Property/web/content/blog/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026

---

## Manager pre-decisions

- **Suggested slug:** `let-property-campaign-disclosure-mechanics-undeclared-rental-income-2026`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C
- **Section ID:** §27.6 + §27.3 + §27.2 (LPC operates within Sch 41 failure-to-notify framework; Sch 24 inaccuracy framework for amendments under LPC; §27.6 disclosure routes architecture)
- **Framing differentiator (~60 words):** The existing `let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental` (Wave 7 B6, 0.32 partial overlap) covers the **3-step process** (notify / disclose within 90 days / pay). This page goes **operational depth**: the **quality-of-disclosure framework** (Sch 24 para 9 telling / helping / giving reduction mechanic), **prompted vs unprompted penalty math with worked landlord examples**, and the route-selection decision tree (LPC vs DDS vs WDF). NOT re-writing the 3-step process at headline level.
- **Cannibalisation discipline:** B6 (existing W7 page) is the **what-and-when** reference; C1 is the **how-much-penalty-and-why** reference. C1 must forward-link to B6 for the 3-step process; B6 needs a back-link to C1 for penalty-math depth (raise INTERNAL_LINK flag at write time).

---

## Statutory anchors + house-position locks

- **§27.6 LPC operational mechanics** — campaign open since 9 September 2013 (no announced end-date); 3-step process; eligibility = residential rental income only (commercial / mixed-use → DDS); penalty band typically careless 0% (unprompted within 12 months) to 15% (prompted), occasionally up to 30%.
- **§27.3 Sch 41 FA 2008 framework** — LPC operates **within** the Sch 41 failure-to-notify regime. Sch 41 para 13 unprompted-disclosure floor 0% for non-deliberate within 12 months (Sch 41-specific 12-month qualifier per §27.3 + §27.2 F-5 correction — this qualifier is on Sch 41 NOT Sch 24).
- **§27.2 Sch 24 FA 2007 framework** — applies where LPC discloses inaccuracies in returns already filed (vs Sch 41 which applies to failure-to-notify chargeability in the first place). Quality-of-disclosure reduction at Sch 24 para 9 = telling + helping + giving. **F-5 correction critical:** no "within 12 months" qualifier on Sch 24 careless-unprompted 0% floor (the 12-month cliff is Sch 41 only).
- **§27.9 do-not-write list (critical for this page):**
  - "LPC notification triggers immediate penalty exposure" — false; notification is no-penalty-consequence.
  - "LPC is open to commercial-property landlords" — false; residential rental income only.
  - "LPC gives criminal-prosecution immunity" — false; only CoP9 / CDF gives immunity.
  - Do NOT import the Sch 41 12-month qualifier into the Sch 24 inaccuracy commentary (F-5 trap).
- **Verification mandate at write time per §16.35:** WebFetch (a) https://www.gov.uk/guidance/let-property-campaign for current campaign status + 90-day timeline; (b) https://www.legislation.gov.uk/ukpga/2008/9/schedule/41/paragraph/13 for Sch 41 para 13 verbatim; (c) https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/9 for Sch 24 para 9 telling/helping/giving reduction structure.

---

## Quality-of-disclosure framework (the operational core, Stage 2 develops)

**Sch 24 para 9 reduction mechanic** — HMRC reduces a penalty for "disclosure" by reference to three quality limbs:

| Limb | What it requires | Maximum % attributable |
|---|---|---|
| **Telling** | Disclosing inaccuracy to HMRC | 30% of the maximum reduction window |
| **Helping** | Assisting HMRC to quantify the inaccuracy | 40% of the maximum reduction window |
| **Giving** | Giving HMRC access to records to check the figures | 30% of the maximum reduction window |

The **maximum reduction window** is the difference between (a) the statutory maximum penalty for the behaviour band and (b) the statutory minimum disclosure floor (prompted or unprompted). Earning full marks on all three limbs = floor figure; earning none = maximum figure. Stage 2 must walk this calculation explicitly with a worked landlord example (e.g. £30k undeclared rental over 5 years at careless behaviour: unprompted disclosure → reduction window 30% to 0% = 30 percentage points; full telling/helping/giving = 0% floor; only telling = 30% - (30% × 30%) = 21% effective penalty).

---

## Prompted vs unprompted penalty math (worked examples — Stage 2 develops to 3-4 scenarios)

- **Scenario 1 — unprompted careless disclosure (within Sch 41 12-month window):** landlord realises after 8 months they should have notified HMRC of rental income; uses LPC. Sch 41 para 13 unprompted-non-deliberate floor 0% within 12 months. With full quality-of-disclosure (telling + helping + giving) → 0% penalty (just tax + interest).
- **Scenario 2 — unprompted careless disclosure (outside Sch 41 12-month window — say 4 years late):** Sch 41 unprompted-non-deliberate floor steps up to 10% beyond 12 months. With full quality → 10% floor. Without full quality → up to 30% maximum.
- **Scenario 3 — prompted disclosure (HMRC nudge letter received first):** Sch 41 prompted-non-deliberate floor 10% with quality reduction down from 30% max. Anchor figure typically 15-20%.
- **Scenario 4 — deliberate not concealed, unprompted via LPC:** Sch 41 floor 20% (or 35% prompted); Sch 24 floor 20% (35% prompted) for inaccuracy amendments to prior years. Quality-of-disclosure can still earn full reduction within the band.

**Critical authority on the inaccuracy-vs-failure-to-notify split:** failure to notify under TMA 1970 s.7 (6-month rule from end of year of assessment) → Sch 41. Inaccuracy in a return already filed → Sch 24. **Both can apply** on the same LPC disclosure (Sch 41 for the un-notified years; Sch 24 for prior returns that should have included rental income). They do not double-count on the same tax loss (§27.3) but they DO each carry their own penalty band on their respective limbs.

---

## Decision tree: LPC vs DDS vs WDF vs CoP9 (Stage 2 develops)

- **Residential rental income, UK-only, taxpayer-initiated → LPC.**
- **Commercial / mixed-use rental income → DDS** (gov.uk Digital Disclosure Service).
- **Offshore rental income (UK tax on foreign property OR non-UK resident with UK rental) → WDF + FtC overlay** (FA 2017 Sch 18 200%/100% post-30-Sep-2018 penalty matrix).
- **Serious-fraud exposure (deliberate concealed with criminal-prosecution risk) → CoP9 / CDF** (HMRC-initiated OR taxpayer-requested; specialist territory; firm refers out).
- **Edge case — spousal mis-attribution.** Income wholly attributed to spouse A but actually belongs to spouse B under §24 (Form 17 / default 50/50). If both have filed returns, two interlocking LPC routes — one per spouse — under the **§24 spousal mechanics** lock. Frame as "two parallel disclosures, single tax loss" with one Sch 24 amendment and one Sch 41 failure-to-notify if applicable.

---

## Closest existing pages (cannibalisation context)

- 0.32 — `let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental` (Wave 7 B6 — **PARTIAL OVERLAP / direct sibling**) — the 3-step process page. C1 differentiates on quality-of-disclosure framework + penalty math.
- 0.14 — `making-tax-digital-property-income-2026-complete-guide` (false-positive — MTD-flavoured)
- 0.14 — `mtd-itsa-foreign-property-income-quarterly-reporting-rules` (adjacent — but WDF territory not LPC)
- 0.14 — `ated-overseas-companies-voluntary-compliance-otm-letters` (false-positive — ATED OTM letters not LPC)
- 0.14 — `mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment` (false-positive)

**Cannibalisation decision:** C1 is the deeper sibling to B6. B6 stays as the canonical 3-step-process page. C1 = penalty-mitigation depth. Raise **INTERNAL_LINK** flag at write time: B6 needs back-link to C1.

---

## Redirect overlap

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for `let-property-campaign-disclosure-mechanics-*` slugs. No middleware edit on initial launch (B6 already canonical for the simpler slug).

---

## 3-5 Competitor URLs (Stage 2 verifies liveness + extracts framing)

- https://www.ukpropertyaccountants.co.uk/let-property-campaign-penalty-calculation/ — typical landlord-flavoured penalty walk-through.
- https://www.uklandlordtax.co.uk/let-property-campaign-quality-disclosure/ — specialist disclosure-quality treatment.
- https://www.shipleys.com/insights/let-property-campaign-when-and-how-to-disclose/ — Top-50 firm; useful for FAQ patterns.
- https://www.blickrothenberg.com/insights/let-property-campaign-and-quality-of-disclosure/ — disclosure-mechanics depth.
- https://www.haines-watts.com/insight/let-property-campaign-step-by-step/ — landlord-flavoured Top-30.

**Borrowable patterns expected:** Most competitor pages stop at "use LPC to reduce penalty" without breaking out the telling/helping/giving reduction structure. Defensible point of differentiation: the quality-of-disclosure table + 3-4 worked penalty calculations.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

- https://www.gov.uk/guidance/let-property-campaign (LPC landing — 9 September 2013 open date; 90-day disclosure window)
- https://www.legislation.gov.uk/ukpga/2008/9/schedule/41/paragraph/9 (Sch 41 para 9 — penalty bands for failure to notify)
- https://www.legislation.gov.uk/ukpga/2008/9/schedule/41/paragraph/13 (Sch 41 para 13 — disclosure mitigation floors, including 12-month qualifier on non-deliberate)
- https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/9 (Sch 24 para 9 — telling / helping / giving reduction mechanic)
- https://www.legislation.gov.uk/ukpga/2007/11/schedule/24/paragraph/10 (Sch 24 para 10 — disclosure mitigation floors; no 12-month qualifier — F-5 anchor)
- https://www.legislation.gov.uk/ukpga/1970/9/section/7 (TMA 1970 s.7 — 6-month notification obligation that LPC remediates)
- HMRC Compliance Handbook CH150000+ (disclosure mitigation general)
- HMRC Compliance Handbook CH82460+ (quality of disclosure operational guidance)
- HMRC CC/FS11 + CC/FS7a (taxpayer factsheets on Sch 41 + Sch 24 penalty regimes)

---

## Cross-bucket sequencing constraints

- **C1 forward-cites C2** (Sch 24 mitigation depth) — C1 references the telling/helping/giving framework; C2 develops it fully. C2 must ship first OR reciprocal back-patch at merge per §16.32.
- **C1 cites C3** for the discovery time-limit framework (which years HMRC can reach back to in an LPC disclosure). C3 must ship first OR reciprocal back-patch at merge.
- **C1 cites existing B6** (Wave 7) for the 3-step process; B6 needs back-link to C1.

Manager note: bucket internal sequencing favours **C3 → C2 → C1** within Bucket C (foundational discovery framework first; then Sch 24 mitigation; then LPC as the applied package). If C1 needed first for any reason, manager back-patches forward-links at wave merge.

---

## Key questions for Stage 2 (resolve before full brief draft)

1. **(non-blocking)** Should the page break out the spousal mis-attribution edge case (Scenario 4 above) inline, or relegate to FAQ? Stage 2 default: inline as a short callout box under the route-selection decision tree, since spousal mechanics (§24) are a frequent LPC trigger.
2. **(non-blocking)** Should the page include the **HMRC v Tooth [2021] UKSC 17** deliberate-behaviour test as part of the prompted-vs-unprompted discussion? Stage 2 default: yes, briefly — the post-Tooth tightening of "deliberate" matters for whether a disclosure should be characterised as careless or deliberate, which changes the floor.
3. **(non-blocking)** Word-count target: this is a depth page complementing B6 — recommend non-pillar upper band 3,200-3,500 words (per §9 quality bar).

---

## Drift watchpoints at write time (per §16.35 + §16.45)

- **(i) F-5 — DO NOT import Sch 41 12-month qualifier into Sch 24 commentary.** The Sch 41 12-month cliff on 0% non-deliberate-unprompted floor is REAL for the failure-to-notify limb of LPC; the Sch 24 0% careless-unprompted floor has NO 12-month qualifier. Sessions writing penalty math for LPC must distinguish which schedule applies to which limb of the disclosure.
- **(ii) Campaign liveness.** LPC has been open continuously since 9 September 2013. Verify at write time via gov.uk/guidance/let-property-campaign that the campaign remains open and the 90-day disclosure timeline is unchanged. Any HMRC announcement closing or restructuring LPC during Wave 9 would be a critical drift requiring manager escalation.
- **(iii) Quality-of-disclosure percentages.** The 30%/40%/30% telling/helping/giving allocation is from Sch 24 para 9 + HMRC operational practice; verify the percentages against HMRC Compliance Handbook CH82460+ at write time.
- **(iv) DDS landing URL.** gov.uk DDS landing URL has historically moved; verify the current landing page at write time before citing in the route-selection decision tree.

---

## Per-page work-log (filled by session during Stage 2 + write)

*(empty at Stage 1 — populate per §4.10 during write)*
