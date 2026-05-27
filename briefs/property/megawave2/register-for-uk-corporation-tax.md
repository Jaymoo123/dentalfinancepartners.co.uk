---
slug: register-for-uk-corporation-tax
category: incorporation-and-company-structures
intent: A landlord (or accountant) with a newly-incorporated property LtdCo wants the practical step-by-step guide to UK CORPORATION TAX REGISTRATION — the FA 2004 s.55 + TMA 1970 + CTA 2009 / CTA 2010 notification framework, what "coming within the charge to corporation tax" means for a property LtdCo (acquisition of first property; first rental income; first commercial activity), the 3-month notification window, the practical CT41G / online HMRC registration mechanics, the UTR generation + first accounting period definition + first CT600 timing, the dormant-company exemption (HMRC self-defined dormancy), the failure-to-notify penalties under FA 2008 Sch 41, the ECCTA-side ID verification overlay, the iXBRL tagging-from-first-accounts requirement, and the multi-SPV / group considerations. Distinct from the broader incorporation-mechanics page (A1 M2-A-B1) and from the LtdCo entity pillar (A20 M2-A-B2); this page is the CT-REGISTRATION operational entry-point handbook.
---

# Register for UK Corporation Tax: The Step-by-Step Practical Guide for Property Limited Companies (2026/27)

## Statutory anchor

- **Primary (the notification obligation — the load-bearing statute):** **FA 2004 s.55 (notice of coming within the charge to corporation tax)** — operative provision requiring a UK-resident company that comes within the charge to corporation tax to give written notice to HMRC within **3 months** of doing so (RUN session verifies precise wording at write time per §16.35; verify any post-FA 2024 / 2025 / 2026 amendments). Cross-reference Sch 18 FA 1998 + TMA 1970 self-assessment framework. Failure triggers penalties under FA 2008 Sch 41 (failure to notify). **Operative for property LtdCo:** the 3-month clock starts on the company coming "within the charge" — typically the EARLIER of (a) acquisition of first property investment, (b) first rental income receipt, (c) first commercial activity (e.g., consultancy fee, interest received), or (d) the company actively trading. The 3-month window is NOT 3 months from incorporation — incorporation alone does not put the company within the charge if it remains dormant.
- **Primary (the charge to corporation tax — definitional):** CTA 2010 s.2 — the charge to corporation tax is on profits of companies; s.3 sets the scope. CTA 2009 Part 4 (UK property businesses) ss.202-291 covers property income — operative for property LtdCo (per §21.A architecture lock — CT three-figure framework FA 2021 architecture post-1-April-2023). **Operative consequence:** the property LtdCo is within the charge from the moment it has property income or other profits within scope; the notification obligation is triggered by being within the charge, not by the company's existence.
- **Primary (HMRC registration mechanics — the operative process):**
  - **Default route (post-incorporation):** Companies House notifies HMRC of new incorporations electronically; HMRC issues a CT UTR (Unique Taxpayer Reference) automatically to the registered office address within ~14 days. The CT UTR is the company's HMRC identifier; required for all CT filings.
  - **HMRC CT online registration (post-UTR):** the company (or its accountant via agent authority) registers for Corporation Tax online via the HMRC Business Tax Account (Government Gateway login) — providing date of becoming chargeable + nature of activity (property letting / investment / development) + first accounting reference date + main contact details.
  - **Form CT41G (legacy / paper):** previously the operative HMRC notification form; largely superseded by the online registration route. RUN session verifies whether CT41G remains operative at write time (HMRC has progressively retired paper forms in favour of online).
  - **Directors filing:** the obligation sits on the company; the directors carry the responsibility. Penalty exposure under FA 2008 Sch 41 is on the company; persistent / fraudulent default can expose directors personally under CA 2006 + the general law.
- **Primary (the dormant-company exemption — operative for property LtdCo holding-pattern):** HMRC operative dormancy framework — a company is "dormant" for CT purposes if it has no significant accounting transactions in the accounting period (HMRC operative definition; distinct from the CA 2006 s.1169 "dormant" company definition for accounts purposes). **Operative for property LtdCo:** newly-incorporated property LtdCo waiting to acquire its first property can be dormant; HMRC does not require CT filing until the company comes within the charge. **Critical operational requirement:** the company must NOTIFY HMRC of dormancy — HMRC default presumes the company is active and will issue a "Notice to file CT600" without active dormancy notification. **The dormancy notification is itself an operational obligation** — RUN session verifies current HMRC operative dormancy notification mechanic at write time per §16.35.
- **Primary (the failure-to-notify penalty regime — the cost of missing the 3-month window):** **FA 2008 Sch 41** — failure-to-notify penalties.
  - **Behaviour-based penalty calculation:** non-deliberate failure with reasonable excuse = 0%; non-deliberate without reasonable excuse = 30% of potential lost revenue (10% if disclosed unprompted; 30% if prompted); deliberate but not concealed = 70% (35% if unprompted disclosure); deliberate and concealed = 100% (50% if unprompted disclosure). RUN session verifies current calibration per FA 2024 / FA 2025 / FA 2026 amendments at write time per §16.27.
  - **Daily penalties** for continued failure under TMA 1970 s.93 framework. RUN session verifies current calibration.
  - **Operative for property LtdCo:** typical scenario is small property LtdCo with one or two properties failing to notify within 3 months of first rental income → late notification disclosed via accountant 12-18 months later → penalty calculated on CT liability for the period from chargeable-date to notification date.
- **Primary (the first accounting period + first CT600 — operational rhythm):** CTA 2009 ss.9-12 (accounting periods for corporation tax purposes). **Operative architecture:**
  - **First accounting period:** runs from date company comes within the charge to the company's first accounting reference date (or 12 months from the chargeable-date, whichever is earlier; longer-than-12-month accounts split into two CT periods).
  - **CT600 filing deadline:** 12 months from end of CT accounting period (FA 1998 Sch 18 para 14).
  - **CT payment deadline:** 9 months + 1 day after end of CT accounting period for non-QIP companies; quarterly instalments under CTA 2010 s.59E + Sch 17 where profits > £1.5m (single company; threshold reduced per associated companies) — most property LtdCos non-QIP.
  - **First accounts filing:** Companies House accounts within 21 months of incorporation; subsequent 9 months from accounting reference date.
- **Primary (the iXBRL tagging requirement from first accounts):** FA 2009 + HMRC operative requirements — UK companies must file CT600 + accounts + tax computation in iXBRL (Inline eXtensible Business Reporting Language) tagged format. **Operative for property LtdCo:** even the smallest single-SPV property LtdCo must file iXBRL-tagged accounts + computation. Accountancy software handles this automatically; manual filing requires specific tagged-document preparation. **Common trap:** new property LtdCo using basic bookkeeping software without iXBRL capability — first CT600 filing fails HMRC validation; refile with proper tagging required.
- **Primary (the ECCTA-side ID verification overlay — operational layer):** ECCTA 2023 Part 1 (per §11.A lock) — ID verification mandatory for new director appointments from 18 November 2025; verification via ACSP (Authorised Corporate Service Provider) framework. **Operative for new property LtdCo:** at incorporation (Companies House side), the new director(s) must be ID-verified; the CT-registration side does not require separate HMRC ID verification BUT the HMRC Business Tax Account login (Government Gateway) requires standard HMRC verification. The two verification frameworks are distinct but both operative. Cross-reference §11.A + A20 pillar + existing `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos`.
- **Primary (multi-SPV / group registration considerations):** each SPV is a separate company for CT-registration purposes; each must register for CT independently upon coming within the charge. **Operative consequences (per §21.8 multi-company group operation lock):**
  - **Group registration:** there is NO group CT registration in UK CT framework — each company registers separately; CT computations are per-company; group relief is via CT600 election (CTA 2010 s.131 — basic test per §21.8.1).
  - **Group payments arrangement:** companies in a group can elect to make group payment for QIP-CT under FA 1998 Sch 18 (group payment arrangement) — common for large groups; rare for property-SPV multi-portfolio setups.
  - **VAT group registration:** distinct from CT; available to corporate groups with common control (VATA 1994 s.43); operative for portfolios with mixed VAT-able commercial property.
  - **Associated-company gating for marginal relief (CTA 2010 ss.18D-J per §21.8.4):** even though each SPV registers separately for CT, the associated-company test dilutes the £50k / £250k marginal relief thresholds across the group. Cross-reference A5 M2-A-B1 marginal-relief depth + A8 M2-A-B2 group relief eligibility.
- **Primary (the trading vs investment characterisation — operational gating):** CTA 2010 ss.1124-1126 + ITTOIA 2005 s.5 + extensive case-law (per §28 Wave 8 transactions-in-UK-land cluster + §21.8.6 trading-vs-investment line for group purposes). **Operative for CT-registration:** the nature-of-activity declaration on registration (property letting / investment / development) feeds into HMRC's expectations of the company's CT600 + computation; misclassification can trigger HMRC compliance enquiry. RUN session cross-links to existing trading-vs-investment site coverage.
- **House position reference:** §21 (Ltd Co + FIC family — entity-choice anchor); §21.4 (rate stack 2026/27 with F-19 + F-20 corrections); §21.1 (DLA + s.455); §21.8 (multi-company group operation — MW2 mini-lock); §21.A (CT three-figure framework FA 2021 architecture); §11 + §11.A (Companies House + ECCTA); §1.M (post-MDR-abolition SDLT cross-reference). **No NEW HP lock requested by this pick** — CT-registration mechanics are operational-process material; existing locks cover substantive CT architecture.

## Framing differentiator (anti-templating, anti-cannibalisation)

This page is the **CT-REGISTRATION OPERATIONAL ENTRY-POINT HANDBOOK** — the step-by-step practical guide for newly-incorporated property LtdCo to complete CT registration correctly. Closest existing pages on our site:

- `limited-companies` (A20 M2-A-B2 — broadest LtdCo cluster pillar; sits ABOVE this page).
- `a-complete-guide-on-incorporating-a-company-in-uk` (A1 M2-A-B1 — incorporation mechanics; CT registration is a SUB-STEP within the broader incorporation journey).
- `landlord-incorporation-step-by-step-guide-uk` (existing — landlord-incorporation walkthrough; CT registration is one operational step within the walkthrough).
- `accountant-corporation-tax-property-companies` — accountancy-services oriented page.
- `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos` — ECCTA-side ID verification specialist (cross-link for ECCTA overlay).
- `limited-companies-and-btl-properties` (this batch sibling — operational handbook for running a BTL LtdCo; references CT-registration as an entry-point operational step).

No existing page covers the CT-REGISTRATION operational entry-point in dedicated step-by-step depth — clean gap. The closest tangential pages cover BROADER topics (incorporation mechanics; landlord walkthrough; CT rates; entity pillar) without focused CT-registration operational depth.

Differentiator: this page is the CT-REGISTRATION OPERATIONAL HANDBOOK. Funnels generic-intent traffic ("how to register for corporation tax", "CT41G form", "CT registration UK", "3 month notification corporation tax", "dormant company HMRC", "register limited company for corporation tax property") to the right answer.

What this page must NOT do: restate the LtdCo entity pillar coverage (A20 covers); restate the incorporation mechanics (A1 covers); restate the CT rate / marginal-relief depth (A5 + existing CT rate pages cover); restate the trading-vs-investment line in depth; restate the ECCTA-side ID verification framework in depth (existing ECCTA page covers); restate the landlord-incorporation walkthrough.

The angle this page takes: a newly-incorporated property LtdCo (or its accountant) needs the step-by-step CT-registration handbook. The page meets them at the operational-process level.

Page structure: (1) what triggers the CT charge for a property LtdCo; (2) the 3-month notification window under FA 2004 s.55; (3) the dormant-company exemption and operational notification of dormancy; (4) the HMRC registration mechanics; (5) the failure-to-notify penalty regime; (6) the first accounting period + first CT600 + payment + filing deadlines; (7) iXBRL tagging requirement; (8) ECCTA ID verification overlay; (9) multi-SPV / group considerations; (10) common CT-registration mistakes for property LtdCo.

## Key questions this page must answer

1. What triggers the CT charge for a newly-incorporated property LtdCo?
2. What is the 3-month notification window under FA 2004 s.55?
3. What is the dormant-company exemption?
4. How does the HMRC CT registration work in practice?
5. What are the failure-to-notify penalties under FA 2008 Sch 41?
6. What is the first accounting period architecture?
7. What are the CT600 + accounts + payment deadlines?
8. What is the iXBRL tagging requirement?
9. How does the ECCTA ID verification overlay interact with CT registration?
10. How are multi-SPV / group setups handled for CT registration?
11. What is the trading-vs-investment characterisation at registration?
12. What are the common CT-registration mistakes for property LtdCo?

## Manager pre-decisions placeholder

- **Category routing:** `incorporation-and-company-structures`.
- **§11 + §21 + §11.A do-not-write list — RUN session MUST internalise:**
  - "The 3-month notification clock starts at incorporation" (FALSE — starts at coming within the charge; can be much later than incorporation).
  - "Incorporation alone triggers CT obligations" (FALSE — dormant company holds no CT obligation other than dormancy notification).
  - "The dormant exemption is automatic" (FALSE — operationally requires dormancy notification to HMRC).
  - "HMRC CT41G is the operative form" (LARGELY SUPERSEDED — online registration via Government Gateway is the operative route; RUN session verifies).
  - "Small property LtdCo doesn't need iXBRL tagging" (FALSE — all UK companies must file iXBRL-tagged CT600 + accounts + computation).
  - "Groups can register collectively for CT" (FALSE — no group CT registration; each company registers separately; group relief is by CT600 election).
  - "Associated companies don't matter for small SPVs" (FALSE — CTA 2010 ss.18D-J dilutes marginal-relief thresholds per §21.8.4).
  - "Dormant means no Companies House obligations" (FALSE — dormant accounts + confirmation statement still required at Companies House).
  - "The ECCTA ID verification covers HMRC registration" (FALSE — distinct frameworks; both required at distinct points).
  - "s.455 rate is 33.75%" (STALE for post-6-April-2026 loans per F-9 §21.1; current 35.75%).
  - "Dividend rates are 8.75%/33.75%/39.35%" (STALE per F-20 §21.4; current 10.75%/35.75%/39.35% from 6 April 2026).
- **Cross-link targets:**
  - Within MW2 Bucket A: `limited-companies` (A20 M2-A-B2 — LtdCo pillar above this page); `a-complete-guide-on-incorporating-a-company-in-uk` (A1 M2-A-B1 — incorporation mechanics); `directors-loan-accountsdla-uk-guide` (A19 M2-A-B1 — DLA depth); `corporation-tax-marginal-relief-uk-guide` (A5 M2-A-B1 — rate-stack + associated-company gating); `corporate-tax-planning-strategies-for-uk-clients` (A4 M2-A-B1 — pillar lever-map); `eligible-groups-for-group-relief-under-uk-corporation-tax` (A8 M2-A-B2 — group relief eligibility for multi-SPV); `limited-companies-and-btl-properties` (this batch — operational BTL LtdCo handbook); `llp-accounts` + `llp-and-taxation-benefits` + `partnership-partnership-agreement-roles-types-benefits` + `sole-trader-vs-partnership` (this batch — partnership entity-choice context).
  - To existing pages: `landlord-incorporation-step-by-step-guide-uk`; `accountant-corporation-tax-property-companies`; `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos`; `mtd-itsa-vs-limited-company-cohort-different-rules`; `incorporating-property-portfolio-uk-2026`; `buy-to-let-limited-company-complete-guide-uk`; `spv-property-investment-special-purpose-vehicle-guide`.

## Stage 2 research target list — VERIFIED URLs

### Authority URLs (RUN session WebFetches at write time per §16.35)

- **`https://www.legislation.gov.uk/ukpga/2004/12/section/55`** — FA 2004 s.55 (notice of coming within the charge to corporation tax). RUN session WebFetches verbatim wording at write time per §16.36 statutory-citation cross-check.
- **`https://www.legislation.gov.uk/ukpga/2008/9/schedule/41`** — FA 2008 Sch 41 (failure-to-notify penalty regime).
- **`https://www.legislation.gov.uk/ukpga/2009/4/part/4`** — CTA 2009 Part 4 (UK property businesses).
- **`https://www.legislation.gov.uk/ukpga/2009/4`** — CTA 2009 contents. RUN session WebFetches ss.9-12 (accounting periods) at write time.
- **`https://www.legislation.gov.uk/ukpga/2010/4/section/2`** — CTA 2010 s.2 (charge to CT); s.3 (scope); ss.18A-J (marginal relief); s.59E + Sch 17 (QIP); s.131 (group relief basic test); ss.1124-1126 (trading vs investment).
- **`https://www.legislation.gov.uk/ukpga/1970/9/section/86`** — TMA 1970 s.86 (interest on overdue tax); s.93 (daily penalties framework).
- **`https://www.legislation.gov.uk/ukpga/1998/36/schedule/18`** — FA 1998 Sch 18 (CT self-assessment framework; para 14 CT600 filing).
- **`https://www.legislation.gov.uk/ukpga/2006/46/section/1169`** — CA 2006 s.1169 (dormant company definition for ACCOUNTS purposes — distinct from HMRC operative dormancy for CT).
- **`https://www.legislation.gov.uk/ukpga/2023/56`** — ECCTA 2023 Part 1 (ID verification framework per §11.A lock).
- **HMRC manual + gov.uk operative anchors:**
  - **`https://www.gov.uk/limited-company-formation`** — gov.uk Limited company formation hub. RUN session navigates to CT registration page at write time.
  - **`https://www.gov.uk/corporation-tax/register-for-corporation-tax`** — gov.uk Corporation Tax registration operative walkthrough. RUN session WebFetches for current registration mechanic at write time.
  - **`https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm00000`** — HMRC Company Taxation Manual root.
  - **`https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch80000`** — HMRC Compliance Handbook CH80000+ (failure-to-notify penalties operative guidance).
  - **`https://www.gov.uk/government/publications/dormant-companies-and-corporation-tax-cta-2009-form-ct41g-dormant-company`** — gov.uk Dormant companies and Corporation Tax (RUN session verifies current URL slug + content at write time; HMRC has been progressively retiring legacy form URLs).
  - **`https://changestoukcompanylaw.campaign.gov.uk/`** — Companies House ECCTA reform campaign page (per §11.A F-12).

### Competitor URLs (session-side WebSearch at write time)

`<!-- competitor section: session-side WebSearch at write time required. Stage 2 dropped firm-domain attempts per Wave 8/9 dead-rate pattern. RUN session uses Google Search. Recommended queries: "register corporation tax UK property limited company 2026", "CT41G form HMRC corporation tax registration", "3 month notification corporation tax new company FA 2004", "dormant company HMRC corporation tax notification", "iXBRL CT600 property LtdCo first accounts". Aim 4-6 firm-side operational walkthroughs from Crunch, Quickbooks, Xero, IRIS, BDO + accountancy-firm step-by-step guides. -->`

### Case-law (RUN session uses sparingly)

- Generally limited case-law on CT-registration mechanics. FTT cases on failure-to-notify penalty disputes (reasonable-excuse defence raised) may be topical; RUN session reviews at write time.

## Worked-example data (RUN session uses these as canvas)

### Example 1 — The 3-month clock (the load-bearing operational reality)

**Singh Property Ltd** is incorporated 15 January 2026 via Companies House standard online formation. The Singh family is still searching for the right property; no acquisition occurs immediately.

- **Companies House notifies HMRC** of the incorporation electronically.
- **HMRC issues CT UTR** to the registered office address within ~14 days (~30 January 2026).
- **No CT obligations crystallise** yet — the company has no income, no commercial activity, no rental property.
- **1 April 2026:** Singh Property Ltd completes the purchase of its first BTL property. First rental income begins 15 April 2026. **Chargeable-date = 1 April 2026** (the EARLIER of acquisition + first rental income).
- **3-month notification window:** FA 2004 s.55 requires notification to HMRC within 3 months of chargeable-date → notify by **30 June 2026**.
- **Practical action:** Mr Singh (or his accountant via agent authority) logs into HMRC Business Tax Account on 1 April 2026 (operationally easier to do it immediately on the chargeable event), registers Singh Property Ltd for Corporation Tax, declares chargeable-date 1 April 2026, nature of activity "Property letting (UK property business)", first accounting reference date (default 31 January 2027 per incorporation anniversary; could be changed to 31 March 2027 to align with tax year).
- **Common mistake:** assuming the 3-month clock started at incorporation on 15 January 2026. Under that misunderstanding, notification by 14 April 2026 would have been "on time" — but the actual clock starts at chargeable-date, and notification by 30 June 2026 is "on time" with no penalty.

### Example 2 — Failure-to-notify penalty calculation

**Kapoor Properties Ltd** is incorporated June 2025; first property acquired August 2025 with first rental income same month. Chargeable-date = August 2025; notification due by November 2025.

- **What happens:** Mr Kapoor doesn't realise the registration obligation. The company doesn't notify HMRC. HMRC's electronic notification of incorporation flagged the company as "potentially dormant" pending further action.
- **Discovery:** Mr Kapoor's accountant prepares the first CT computation in May 2026 (10 months late). CT liability for August 2025 → March 2026 = £8,000 estimated.
- **Penalty calculation per FA 2008 Sch 41:**
  - Non-deliberate failure with no reasonable excuse (Mr Kapoor was a first-time company director and "didn't know" — HMRC may or may not accept this).
  - **Prompted disclosure** (HMRC was about to issue a Notice to file CT600 based on the dormancy expiry).
  - Penalty rate: 30% (non-deliberate, prompted) × £8,000 potential lost revenue = **£2,400 penalty**.
  - PLUS interest under TMA 1970 s.86 on the late-paid CT (current rate verify at write time per §16.27).
- **Unprompted disclosure scenario:** if Mr Kapoor's accountant had disclosed to HMRC BEFORE any compliance trigger, penalty rate would have been 10% × £8,000 = £800. Operative lesson: voluntary unprompted disclosure produces a 67% reduction in penalty quantum.

### Example 3 — Dormancy notification + dormancy lifecycle

**Mawell-Estate Family LtdCo:** incorporated December 2025 in anticipation of property acquisition. Market timing pushes acquisition out to April 2027 (16 months later).

- **Dormancy from incorporation to acquisition:** company is dormant for HMRC CT purposes (no significant accounting transactions per HMRC operative dormancy definition).
- **Operational requirement:** Mr Mawell-Estate (or accountant) notifies HMRC of dormancy via the HMRC Business Tax Account dormancy notification mechanic (RUN session verifies current process at write time).
- **HMRC response:** acknowledges dormancy; suspends "Notice to file CT600" requests until the company is no longer dormant.
- **Companies House side parallel obligations:**
  - **First dormant accounts** at Companies House within 21 months of incorporation = by September 2027 (dormant accounts under CA 2006 s.1169 simplified format).
  - **Confirmation statement** annually (CA 2006 ss.853A-853L).
  - **PSC register** maintained.
  - **ECCTA-related** registered email + appropriate registered office + ID verification per §11.A.
- **End of dormancy:** April 2027 acquisition triggers chargeable-date; 3-month notification window starts → notify HMRC by July 2027. Company exits dormancy; first CT accounting period runs April 2027 → first accounting reference date.

### Example 4 — Multi-SPV associated-company impact on CT registration

**Patel Property Group:** HoldCo + 4 SPV subsidiaries (each holding 2-3 properties). Each SPV incorporated separately; each has its own UTR; each registers for CT separately on its own chargeable-date.

- **CT registration per SPV:** each of the 5 entities registers separately. There is NO group CT registration.
- **Associated-company test (per §21.8.4 lock):** under CTA 2010 ss.18D-J, ALL 5 entities are associated (common control). Marginal-relief thresholds divided by 5: £50k upper / £250k lower divided by 5 = £10k / £50k per entity.
- **Per CT600 declaration:** each SPV declares "associated-companies count = 5" on its CT600. Common mistake: declaring 1 (own-company-only) when 5 is correct → CT computation uses wrong thresholds → underpayment of CT → eventual HMRC enquiry + assessment + interest + penalties.
- **Group relief CT600 election:** if one SPV has a loss-year and another a profit-year, the loss SPV can surrender the loss to the profit SPV via CT600 election (per §21.8.1 + CTA 2010 s.131). The election is done at CT600 stage; the registration mechanic itself doesn't capture this.
- **VAT group registration:** separate question from CT. If the SPVs are letting commercial property and electing standard-rate VAT, group VAT registration under VATA 1994 s.43 may be operationally efficient (single VAT return for the group). Distinct from CT framework.

### Example 5 — iXBRL tagging trap

**Verma Property Ltd:** first-time landlord using basic bookkeeping spreadsheet. Mr Verma prepares the first CT600 manually using PDF templates downloaded from HMRC; submits via HMRC Business Tax Account.

- **HMRC response:** filing rejected at validation. iXBRL tagging not present. Re-submission required in valid iXBRL format.
- **Practical implications:**
  - Manual iXBRL preparation is impractical without specialist software.
  - Mr Verma engages an accountant with proper accountancy software (e.g., Sage / Xero / IRIS / TaxCalc); accountant prepares the CT600 + accounts + computation in iXBRL-tagged format.
  - First CT600 filing successful at second attempt — but Mr Verma incurs accountancy fees + delays the filing.
- **Operative lesson:** even the smallest single-SPV property LtdCo must file iXBRL-tagged accounts + CT600 + computation. Plan for accountancy software cost + accountant fees from incorporation.

## FAQ expansion (RUN session polishes prose; 12 FAQs target)

1. **Q: When does a new property limited company need to register for corporation tax?**
   A: A UK company comes within the charge to corporation tax when it has profits within scope — for a property LtdCo, typically the earliest of (a) acquisition of first property investment, (b) first rental income receipt, (c) first commercial activity even if non-property, or (d) the company actively trading. Under FA 2004 s.55, the company must notify HMRC within 3 months of coming within the charge. The 3-month clock does NOT start at incorporation — incorporation alone does not put the company within the charge if it remains dormant.

2. **Q: What is the dormant-company exemption?**
   A: A newly-incorporated property LtdCo waiting to acquire its first property can be dormant for CT purposes if it has no significant accounting transactions. HMRC's operative dormancy definition is distinct from the CA 2006 s.1169 dormancy definition for ACCOUNTS purposes. **Critical:** dormancy is not automatic — the company must NOTIFY HMRC of dormancy via the HMRC Business Tax Account dormancy mechanic. Without notification, HMRC default presumes the company is active and will issue a Notice to file CT600. Dormant companies still have Companies House obligations (dormant accounts + confirmation statement + PSC register + ECCTA-compliance).

3. **Q: How does CT registration work in practice?**
   A: Two operative phases. **Phase 1 (automatic):** Companies House notifies HMRC of new incorporations electronically; HMRC issues a CT UTR to the registered office address within ~14 days. The UTR is the company's HMRC identifier for all CT filings. **Phase 2 (active registration on chargeable event):** the company (or its accountant via agent authority) logs into the HMRC Business Tax Account, registers for Corporation Tax online, provides date of becoming chargeable + nature of activity (property letting / investment / development) + first accounting reference date + contact details. Form CT41G is largely superseded; online registration is the operative route (verify current operative process at write time).

4. **Q: What happens if I miss the 3-month notification window?**
   A: FA 2008 Sch 41 failure-to-notify penalties apply. The penalty is behaviour-based and calculated on potential lost revenue (the CT liability for the period from chargeable-date to notification-date). Rates: non-deliberate failure with reasonable excuse = 0%; non-deliberate without reasonable excuse = 30% prompted / 10% unprompted disclosure; deliberate but not concealed = 70% prompted / 35% unprompted; deliberate and concealed = 100% prompted / 50% unprompted. Plus interest under TMA 1970 s.86 on the late-paid CT, plus potential daily penalties under TMA 1970 s.93. Voluntary unprompted disclosure typically produces a 67% reduction in penalty quantum.

5. **Q: What is the first accounting period for a new property LtdCo?**
   A: The first CT accounting period runs from the date the company comes within the charge to the company's first accounting reference date (ARD), capped at 12 months from the chargeable-date. Longer-than-12-month periods are split into two CT periods. The default ARD is the last day of the month of incorporation (e.g., incorporated 15 January 2026 → default ARD 31 January 2027), which can be changed under CA 2006 s.392 to align with the tax year (commonly 31 March).

6. **Q: What are the CT filing and payment deadlines?**
   A: **CT600 filing:** 12 months after end of CT accounting period (FA 1998 Sch 18 para 14). **CT payment:** 9 months + 1 day after end of CT accounting period for non-QIP companies. **Quarterly instalments (QIP)** under CTA 2010 s.59E + Sch 17 where profits exceed £1.5m for a single company; threshold reduced per associated companies under §21.8.4. Most property LtdCos are non-QIP. **First Companies House accounts:** within 21 months of incorporation; subsequent accounts within 9 months of accounting reference date.

7. **Q: Do I need to file in iXBRL format?**
   A: Yes — all UK companies, regardless of size, must file CT600 + accounts + tax computation in iXBRL-tagged format. Even the smallest single-SPV property LtdCo must comply. Manual iXBRL preparation is impractical; the company needs accountancy software (Sage, Xero, IRIS, TaxCalc, FreeAgent, etc) or an accountant with proper software. Common trap: new property LtdCo using basic bookkeeping software without iXBRL capability — first CT600 submission fails HMRC validation; refile required.

8. **Q: How does ECCTA ID verification interact with CT registration?**
   A: Two distinct verification frameworks. **Companies House side:** ECCTA 2023 Part 1 (per §11.A) requires ID verification for new director appointments from 18 November 2025, via the ACSP framework. **HMRC side:** the Business Tax Account login requires standard HMRC Government Gateway verification (post code, National Insurance number, recent payslip or passport or driving licence). Both are operative at distinct points: ECCTA verification at incorporation; HMRC verification at first Business Tax Account login. ECCTA verification does NOT discharge HMRC verification; both are required.

9. **Q: How does CT registration work for a multi-SPV property group?**
   A: There is NO group CT registration in the UK. Each SPV is a separate company for CT purposes; each registers separately on its own chargeable-date; each has its own UTR; each files its own CT600. Group relief (loss-sharing between profit and loss SPVs in the same group) is via CT600 election per §21.8.1 + CTA 2010 s.131, not at registration. Group payment arrangements for QIP are available under FA 1998 Sch 18 (rare for property SPVs). **Critical:** the associated-company test under CTA 2010 ss.18D-J dilutes the £50k / £250k marginal-relief thresholds across all associated companies — each SPV's CT600 must declare the correct associated-companies count (per §21.8.4 lock).

10. **Q: What is the trading-vs-investment characterisation at registration?**
    A: The nature-of-activity declaration on CT registration (property letting / investment / development) feeds into HMRC's expectations of the company's subsequent CT600 + computation. Most property LtdCos are investment (UK property business under CTA 2009 Part 4). Property development or flip-vehicle LtdCos may be trading (CTA 2009 Part 3 + trading-vs-investment line per CTA 2010 ss.1124-1126 + §21.8.6 + §28 trading-vs-investment cluster). Misclassification can trigger HMRC compliance enquiry. The line is fact-intensive and worth careful articulation at registration — cross-link to existing trading-vs-investment site coverage.

11. **Q: What are the common CT-registration mistakes for property LtdCo founders?**
    A: Six recurring patterns. (1) Missing the 3-month notification window assuming the clock starts at incorporation. (2) Failing to notify HMRC of dormancy and receiving a default Notice to file CT600 with subsequent late-filing exposure. (3) Filing the first CT600 without iXBRL tagging. (4) Mischaracterising property activity as trading when investment is the substance. (5) Forgetting the associated-company impact on group structures — declaring 1 associated company when 5 is correct. (6) Treating ECCTA Companies House ID verification as discharging HMRC Government Gateway verification — they are distinct, both required.

12. **Q: Should I use an accountant for CT registration?**
    A: For most property LtdCo founders, yes. The CT-registration mechanics are operationally straightforward, but the surrounding obligations (iXBRL tagging, first accounting period determination, dormancy notification, associated-company declarations for multi-SPV setups, ECCTA verification coordination) compound quickly. The fee for accountant CT-registration + first-year compliance setup is typically £500-£1,500; the cost of failure-to-notify penalties + interest + refile work for iXBRL failures can multiply this several times over. Accountancy software (Sage / Xero / IRIS / TaxCalc / FreeAgent) integrated with HMRC's online services is the standard route.

## Universal rules + workflow stubs (RUN session follows)

### Voice + style (verbatim per §4.8)

- **No em-dashes** in body copy.
- **Specific over generic.** Named statute (FA 2004 s.55; FA 2008 Sch 41; CTA 2009 ss.9-12 + Part 4; CTA 2010 s.2 + s.3 + ss.18A-J + s.59E + Sch 17 + s.131 + ss.1124-1126; TMA 1970 s.86 + s.93; FA 1998 Sch 18; FA 2009 iXBRL framework; CA 2006 s.1169; ECCTA 2023 Part 1); specific section numbers; anonymised personas.
- **No real names.** Anonymised personas (Singh, Kapoor, Mawell-Estate, Patel, Verma).
- **Lead-gen architecture:** `<LeadForm>` auto-injected at footer.
- **CSS in markdown:** semantic HTML only.
- **FAQs:** 12 entries in frontmatter `faqs:` array.
- **Anti-templating:** CT-REGISTRATION OPERATIONAL ENTRY-POINT framing. Do NOT collapse into A1 incorporation-mechanics restatement or A20 entity-pillar restatement. Lead with the 3-month-clock-starts-at-chargeable-date subtlety; this is the load-bearing operational content.
- **§21 cluster + §11.A do-not-write GREP discipline (RUN session greps draft against ALL):**
  - "3-month clock starts at incorporation" (FALSE).
  - "Incorporation alone triggers CT obligations" (FALSE).
  - "Dormant exemption is automatic" (FALSE).
  - "CT41G is the operative form" (LARGELY SUPERSEDED).
  - "Small LtdCo doesn't need iXBRL" (FALSE).
  - "Groups register collectively for CT" (FALSE).
  - "Associated companies don't matter for small SPVs" (FALSE).
  - "ECCTA covers HMRC verification" (FALSE — distinct).
  - "s.455 rate is 33.75%" (STALE for post-6-April-2026 loans per F-9).
  - "Dividend rates 8.75%/33.75%/39.35%" (STALE per F-20).
- **Quality bar (six checks):** 0 em-dashes; 0 Tailwind classes; FAQ count matches frontmatter; meta title ≤62; meta description ≤158; internal links resolve.

### 19-step workflow (verbatim per §7)

1. Read `house_positions.md` at session start (esp §21 + §21.4 + §21.1 + §21.8 + §21.A Ltd Co cluster; §11 + §11.A Companies House + ECCTA; §1.M post-MDR-abolition SDLT cross-reference).
2. Claim this page in wave tracker.
3. Read this brief.
4. Fetch + read competitor URLs via session-side WebSearch + gov.uk operative pages.
5. Read closest-existing pages: `landlord-incorporation-step-by-step-guide-uk`; `eccta-2023-id-verification-mandatory-companies-house-2025-2026-landlord-ltdcos`; `accountant-corporation-tax-property-companies`; `buy-to-let-limited-company-complete-guide-uk`; `spv-property-investment-special-purpose-vehicle-guide`; `mtd-itsa-vs-limited-company-cohort-different-rules`.
6. Plan H2 / H3 outline — operational entry-point handbook structure (ten sections per Framing differentiator).
7. Verify factual claims per §16.35 (esp current FA 2004 s.55 wording; FA 2008 Sch 41 current calibration; TMA 1970 s.86 current interest rate; gov.uk operative CT-registration walkthrough current URL + content; CT41G operational status; HMRC operative dormancy notification mechanic).
8. Fetch hero image.
9. Write markdown.
10. Build clean.
11. Six verifications + do-not-write GREP check (10 patterns above).
12. Apply redirect repointing if needed.
13. Register in `monitored_pages`.
14. Commit on branch.
15. Fill per-page work-log.
16. Mark ✅ done in tracker.
17. Append flags (no new flags expected; existing cluster locks in place).
18. Append discoveries.
19. Claim next page.

## Work log (Stage 2 + RUN session populate)

[RUN session records work here.]

---

## Stage 2 brief extension work log

- **Stage 2 author:** MW2 Stage 2 Sub-Agent A (batch M2-A-B3) on 2026-05-27.
- **Stage 1 seed status:** RECEIVED comprehensive seed. Brief now anchors to live §21 cluster + §11.A Wave 9 lock + §21.8 multi-company group operation lock.
- **Stage 2 extensions:** added (i) VERIFIED authority URL list per §16.31 + §16.36 patterns; (ii) competitor-research target queries; (iii) five worked examples grounding the CT-registration operational process; (iv) 12-FAQ expansion; (v) Universal rules + 19-step workflow stubs; (vi) do-not-write GREP discipline pattern list.
- **§16.36 statutory-citation cross-check:** verified key cites against legislation.gov.uk anchors. **FA 2004 s.55 (notice of coming within the charge to corporation tax)** — confirmed primary statutory anchor. **FA 2008 Sch 41 (failure-to-notify)** — confirmed. CTA 2009 Part 4 + ss.9-12 (accounting periods) — confirmed. CTA 2010 s.2 + s.3 + ss.18A-J + s.59E + Sch 17 + s.131 + ss.1124-1126 — confirmed. TMA 1970 s.86 + s.93 — confirmed. FA 1998 Sch 18 — confirmed. CA 2006 s.1169 — confirmed (accounts dormancy distinct from HMRC operative CT dormancy). No drift catches this brief.
- **§16.42 EXISTING_PAGE_STALE candidates surfaced:** none net-new this brief. HMRC has progressively retired the CT41G paper form; existing page references that say "use CT41G" may be stale and could be back-patched in future inter-wave queue; not blocking for this brief.
- **Cannibalisation reasoning held:** clean gap on the CT-REGISTRATION operational entry-point. Co-exists with A20 LtdCo pillar above + A1 incorporation mechanics + existing walkthrough + rate / relief specialists + ECCTA ID verification specialist. No CANNIBAL.
- **HP-lock alignment held:** §21 + §21.4 + §21.1 + §21.8 + §21.A; §11 + §11.A; §1.M cross-reference.
- **Forward-link discipline:** dense cross-link grid to MW2 Bucket A LtdCo cluster (A1 + A4 + A5 + A8 + A19 + A20 + this batch's siblings) + ECCTA + walkthrough + rate/relief specialists.
- **Operational note for RUN session:** §16.35 per-write verification mandatory for (a) current gov.uk CT-registration walkthrough URL + content (HMRC migrates URLs); (b) CT41G operational status (whether fully retired or still operative in edge cases); (c) FA 2008 Sch 41 current penalty calibration; (d) TMA 1970 s.86 current interest rate (linked to Bank of England base); (e) HMRC operative dormancy notification mechanic.

---

## Stage 1 seed work log

- **Stage 1 author:** MW2 Stage 1 Sub-Agent A (batch M2-A-B3) on 2026-05-26.
- **Cluster anchor:** Limited company / BTL company operation. Framing: CT-REGISTRATION OPERATIONAL ENTRY-POINT HANDBOOK.
- **HP-lock alignment at Stage 1:** §21 + §21.4 + §11 + §11.A + §3. No NEW HP lock requested.
- **§16.35 verification note at Stage 1:** core statutory cites stable. Operative HMRC CT-registration process (online vs CT41G), operative dormancy notification, FA 2008 Sch 41 penalty calibration, TMA 1970 s.86 interest rate, ECCTA Part 1 commencement (18 November 2025 per §11.A) — Stage 2 verifies all at write time.
- **Cannibalisation reasoning at Stage 1:** clean gap on the CT-REGISTRATION operational entry-point.
- **Anti-templating note for Stage 2:** highest risks are (a) collapse into A1 / A20 restatement; (b) stale CT41G mechanics if HMRC has fully sunset; (c) failing to surface the 3-month-clock-starts-at-chargeable-date subtlety; (d) failing to surface the dormancy-notification operational requirement; (e) understating failure-to-notify penalty risk; (f) missing iXBRL tagging; (g) conflating ECCTA ID verification with HMRC Government Gateway verification.
