# Wave 3 site-wide flags

Append-only. Each flag uses format `F-N | YYYY-MM-DD HH:MMZ | TAG | session | summary` plus optional sub-bullets.

Tags: HOUSE_POSITION_CONFLICT, CANNIBAL, INTERNAL_LINK, SCHEMA, REDIRECT, POSITIONING, BUILD_BLOCKER, CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL.

---

## F-1 | 2026-05-22 22:00Z | REDIRECT + INTERNAL_LINK | manager (Stage 1 review) | Existing `renters-rights-act-2026-tax-implications-landlords` page rewrite + site-wide RRA 2026 citation back-patch

Two coupled hygiene items, **NOT Wave 3 net-new** (do these on the legacy-rebuild track between Wave 3 close and Wave 4 launch, or as a standalone pass when the user authorises):

1. **Rewrite the existing page** `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md` to reflect the actual RRA 2025 (2025 c. 26, Royal Assent 27 October 2025). The current page uses "in-passage" / "implementation from May 2026" framings that are now superseded. Depth target: anchor on house_positions §20 (RRA Wave 3 extension). Citation must use 2025 c. 26. Frontmatter slug stays at `renters-rights-act-2026-tax-implications-landlords` to preserve any organic signal (no redirect needed for the existing page itself); inside the page, the title + h1 + body update to RRA 2025.
   - Optional: 301-redirect `/renters-rights-act-2026-tax-implications-landlords` -> a new `/renters-rights-act-2025-tax-implications-landlords` slug if a clean-citation slug is preferred. Trade-off: redirect preserves equity at cost of one extra middleware entry. Defer the slug decision to whoever picks up the rewrite.

2. **Site-wide RRA-2026 citation back-patch sweep.** Other existing Property pages (city pages, landlord-essentials pillars, tax-essentials guides) may reference "RRA 2026" or "Renters Rights Act 2026" in body copy. Run a `grep -rn "Renters Rights Act 2026\|RRA 2026\|renters' rights act 2026"` across `Property/web/content/blog/*.md` and replace with the correct citation (RRA 2025, 2025 c. 26, Royal Assent 27 October 2025). One commit batch.

Why this is parked here, not in Wave 3 net-new: both items are LEGACY rewrites against existing pages, distinct from Wave 3's net-new-page mandate. The original C1 brief (`renters-rights-act-2025-tax-implications-comprehensive-update`) was swapped out to free that slot for a genuine net-new (`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`). See `docs/property/wave3_candidates_selected.md` C1 entry for the swap rationale.

---

## F-2 | 2026-05-22 23:00Z | POSITIONING | Stage 2 ATED sub-agent | Category mismatch in Wave 3 ATED briefs vs existing inventory

All four existing ATED pages on main sit under `incorporation-and-company-structures`:
- `ated-complete-guide-2026-27`
- `ated-15-percent-flat-rate-sdlt-interaction`
- `ated-rental-property-relief-mechanics`
- `ated-late-filing-penalties-mechanics`

Wave 3 brief manager-pre-fills suggest `property-types-and-specialist-tax` as the category for all 10 ATED Session A briefs. Writing the new pages into a different category from the existing inventory will fragment the ATED cluster (separate category index pages, weaker internal-link clustering, weaker topical authority signal).

Per-brief recommendation logged in each Wave 3 Session A brief's "Closest existing pages" block: session SHOULD override to `incorporation-and-company-structures` and log the override in their work-log. Manager arbitration may differ — flag is informational, sessions retain category-override authority per Wave 1 calibration.

## F-3 | 2026-05-22 23:00Z | CANNIBAL (watchpoint, not active) | Stage 2 ATED sub-agent | Three Wave 3 ATED briefs carry high cannibalisation risk against existing pillar `ated-complete-guide-2026-27`

Watchpoints documented in each brief's Closest existing pages block. Not blocking; sessions retain authority to differentiate.

1. **A2 `ated-rates-2026-27-bands-table-worked-examples`** — pillar already carries the 2026/27 band table verbatim in FAQ + body. Discipline: A2 must be reference / calculator-shaped with materially deeper per-band worked examples + CPI mechanic + PRBC walkthrough. If H2 outline mirrors pillar's "Annual Charges" section, raise CANNIBAL at write-time.
2. **A4 `ated-relief-related-persons-market-rent-test`** — existing `ated-rental-property-relief-mechanics` covers s.1122 CTA 2010 connected-person test and the "market rent does not cure connection" point in FAQ form. Discipline: A4 must be 8-12 scenario-driven family-letting cases with HMRC's stance; do NOT re-cover the statutory test in narrative form.
3. **A10 `ated-six-step-compliance-walkthrough-uk-non-natural-persons`** — process walkthrough overlaps with pillar's operational sections. Discipline: each step is one short paragraph plus cross-link to relevant Wave 3 sibling or pillar; the value is the SEQUENCE, not the depth. SCHEMA flag candidate (HowTo schema).

## F-4 | 2026-05-22 23:00Z | INTERNAL_LINK (suggested back-links from existing to new) | Stage 2 ATED sub-agent | Wave 3 ATED additions warrant back-link patches from existing pillar / mechanics pages

After Wave 3 Session A ships and lands on main, the following existing pages should be back-patched with forward-links to the new pages (per Wave 2 F-XX pattern of session-time cross-link flagging + post-merge batch application):

- `ated-complete-guide-2026-27` (pillar): FAQ "How is the property value for ATED determined?" should link forward to **A7** (valuation rules). FAQ "Can I claim the relief retrospectively if I missed it on the original return?" should link forward to **A5** (amendment). FAQ "How do I appeal an ATED penalty?" should link forward to **A9** (appeals).
- `ated-rental-property-relief-mechanics`: should link forward to **A3** (clawback) and **A4** (related-persons / market-rent).
- `ated-late-filing-penalties-mechanics`: FAQ on appeals should link forward to **A9** (appeals deep-dive).
- `buy-to-let-limited-company-complete-guide-uk`: should link forward to **A1** (ATED overview) at the "company holding > £500k residential" decision point.

Sessions writing A1 / A3 / A4 / A5 / A7 / A9 should pre-fill these forward-link suggestions in their work-log F-XX flags for clean batch application post-merge.

## F-5 | 2026-05-22 23:00Z | FACTUAL (verification passed) | Stage 2 ATED sub-agent | House position §18.1 band figures verified against gov.uk

Cross-checked house position §18.1 2025/26 and 2026/27 ATED bands against gov.uk (https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics) and ukpropertyaccountants.co.uk/ated-rates.

**2026/27 figures verified — no discrepancy:**

| Band | House §18.1 | gov.uk | UKPA |
|---|---|---|---|
| £500,001 to £1m | £4,600 | £4,600 | £4,600 |
| £1m to £2m | £9,450 | £9,450 | £9,450 |
| £2m to £5m | £32,200 | £32,200 | £32,200 |
| £5m to £10m | £75,450 | £75,450 | £75,450 |
| £10m to £20m | £151,450 | £151,450 | £151,450 |
| Over £20m | £303,450 | £303,450 | £303,450 |

House position §18.1 is locked and trusted. No HOUSE_POSITION_CONFLICT raised. §18.4 30 April return deadline also confirmed against gov.uk. §18.5 1 April 2027 next-revaluation date confirmed against gov.uk and competitor sources.

---

## F-6 | 2026-05-22 23:30Z | HOUSE_POSITION_CONFLICT (resolved + locked) | Stage 2 MTD ITSA sub-agent | §19.7 late-payment day-triggers corrected from 31/46/91 to 15/30/31

Stage 2 MTD ITSA sub-agent verified §19.7 against the gov.uk Spring Statement 2025 HTML document. The locked position had the correct doubled percentages (3% / 3% / 10%) but the wrong day-triggers (31 / 46 / 91 = legacy FA 2021 Sch 26 schedule). The Spring Statement 2025 reform accelerated **both** percentages AND day-triggers; the corrected position is **3% from day 15, +3% from day 30, +10% per annum from day 31**. Verified verbatim from `https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html`.

**§19.7 has been corrected with a Correction logged 2026-05-22 stamp. §3 has also been corrected (one-line summary).** Sessions writing penalty content for MTD ITSA (especially B6 HMRC-letter and B8 six-changes overview but applicable to all 10 MTD briefs that mention penalty mechanics) MUST use 15 / 30 / 31 day-triggers with 3% / 3% / 10% percentages. The legacy 31 / 46 / 91 schedule at 2% / 2% / 4% remains for non-MTD income tax + VAT only.

This is the §5.2 correction process working as designed: factual catch via downstream verification, manager updates house_positions, broadcasts via wave3_site_wide_flags so sessions on read pick up the corrected position.

---

(further flags appended below as sessions discover items during write-up)

---

## F-7 | 2026-05-22 21:41Z | INTERNAL_LINK (deferred back-patch) | Session C (C1) | C1 needs forward-link back-patches to C5, C6, C9 once those siblings exist on branch

C1 (`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`) was written before its three Session-C siblings that it would naturally forward-link to. In-text mentions are present but without hyperlinks; once the targets exist on branch they should be re-linked:

- C1 body mentions "forthcoming sibling pages on PRS Database and Ombudsman registration mechanics (pre-enrolment compliance) and Decent Homes Standard PRS compliance" → re-link to `/blog/landlord-tax-essentials/prs-database-landlord-ombudsman-registration-requirements` (C6) and `/blog/landlord-tax-essentials/decent-homes-standard-prs-landlord-compliance-checklist` (C5) once those exist.
- C1 Scenario 3 mentions "the portfolio-disposal CGT mechanics are covered in our forthcoming companion page" → re-link to `/blog/landlord-tax-essentials/landlords-considering-selling-portfolio-rra-2025-tax-implications` (C9) once that exists.

Session C will handle the back-patch as a small follow-up commit at end of session (after C5, C6, C9 are written), or it can be picked up in the post-merge cross-link batch alongside any other forward-link patches.

**F-7 extension 2026-05-22 22:30Z (C5 write):** C5 (`decent-homes-standard-prs-landlord-compliance-checklist`) emits a forward-link to C6 (`/blog/landlord-tax-essentials/prs-database-landlord-ombudsman-registration-requirements`) in its intro cross-link block. The link will resolve once C6 commits in this session. Confirms the back-patch queue is correctly sized at: C1 → {C5, C6, C9}; C5 → {C6}. End-of-session back-patch sweep should verify all four targets resolve after C6 and C9 land.

**F-7 extension 2026-05-22 22:55Z (C6 write):** C6 (`prs-database-landlord-ombudsman-registration-requirements`) emits a forward-link to C9 (`/blog/landlord-tax-essentials/landlords-considering-selling-portfolio-rra-2025-tax-implications`) in §"What to Do Now" point 6. C5 → C6 forward-link now resolves bidirectionally (no longer pending). Updated back-patch queue: C1 → {C9}; C6 → {C9}. Both targets close out when C9 commits later in session. End-of-session sweep should verify two C9 inbound links resolve.

---

(further flags appended below as sessions discover items during write-up)

---

## F-7 | 2026-05-22 21:50Z | EXISTING_PAGE_STALE | Session B (during B1) | mtd-rental-income-threshold-exemptions has three factual errors that should be back-patched

While writing B1 (mtd-itsa-qualifying-income-test-gross-vs-net) and reading the closest-existing pillar `mtd-rental-income-threshold-exemptions` for cross-link discipline, surfaced three concrete factual errors in that page. All three need a back-patch pass before the Wave 3 merge to main lands and Google indexes the new MTD ITSA cluster.

1. **Exit-period inconsistency.** One FAQ ("What happens if my rental income fluctuates around the threshold?") gives "three consecutive tax years" (correct, per house position §19.5). Another FAQ ("I had £55,000 of rent in 2024-25 but only £35,000 in 2025-26. Am I in MTD?") gives "two consecutive tax years". The house position is **three** consecutive tax years; the second FAQ is wrong.
2. **Quarterly deadline error.** The FAQ "What are the MTD quarterly deadlines for property income?" lists deadlines as "5 August, 5 November, 5 February, 5 May". The correct deadlines (house position §19.6 + gov.uk guidance) are **7 August, 7 November, 7 February, 7 May**. Wrong by two days across all four quarters.
3. **Penalty rate error.** Same page closes with "Late payment penalties on the underlying tax remain separate: 2% of unpaid tax at 15 days, another 2% at 30 days, and interest on top from the original due date." This is the legacy non-MTD schedule. Per house position §19.7 (corrected 2026-05-22, F-6 above), MTD ITSA late-payment penalties from 6 April 2026 are **3% from day 15, a further 3% from day 30, and 10% per annum from day 31**. The 2%/2%/4% schedule continues for non-MTD income tax + VAT only.

Recommended action: small targeted back-patch of the three FAQ answers on `mtd-rental-income-threshold-exemptions` to match the house positions. Not urgent enough to block Wave 3, but should not ship to production with the contradicting figures sitting in the closest neighbour page.

---

## F-8 | 2026-05-22 21:55Z | INTERNAL_LINK | Session A (A1 write) | Back-link patch suggestion to A1 from BTL Ltd-Co pillar

Per F-4 manager pre-fill, the `buy-to-let-limited-company-complete-guide-uk` pillar should be back-patched with a forward-link to A1 (`ated-overview-companies-holding-uk-residential-property-2026-27`) at the "company holding > £500k residential" decision point inside the pillar. Apply during post-merge cross-link batch (Wave 2 F-XX back-patch flow). A1 already links FROM BTL Ltd-Co context inward; the missing direction is BTL pillar -> A1 forward.

---

## F-9 | 2026-05-22 23:25Z | EXISTING_PAGE_STALE (scope expansion of F-7) | Session B (during B8) | Same deadline / penalty errors on quarterly-reporting + penalties pages, not only on the exemptions pillar

Discovered while writing B8 (mtd-itsa-overview-six-changes-residential-landlords) and reading the two CANNIBAL-WATCH-adjacent existing pages. The same factual drift flagged in F-7 against `mtd-rental-income-threshold-exemptions` also appears verbatim on:

1. **`mtd-quarterly-reporting-landlords-step-by-step-guide`** — quarterly deadlines listed as "5 August, 5 November, 5 February, 5 May" (one-month-after-quarter-end) in both FAQ and body. Correct deadlines per gov.uk "Send quarterly updates" page (verified 2026-05-22) and house position §19.6 are "7 August, 7 November, 7 February, 7 May" (one-month-and-seven-days after quarter-end).
2. **`mtd-penalties-landlords-miss-deadline`** — same deadlines repeated in the quarterly-update section. Likely also carries the 2%/2%/4% legacy late-payment schedule rather than the Spring Statement 2025 accelerated 3%/3%/10% at 15/30/31 days; quick read suggests the page predates the Spring Statement 2025 reform entirely.

Treat F-7 + F-9 as a single batch back-patch covering three existing pages (exemptions pillar, quarterly-reporting guide, penalties page). The errors propagate from a common 2024-vintage HMRC interpretation that the industry has carried forward; competitor sites (including ukpropertyaccountants.co.uk) also use the wrong "5th of month" deadlines, suggesting the drift is industry-wide, not just our pages.

Recommended action: single PR rewriting the relevant FAQ answers and body sections across all three pages to use the correct 7-of-month deadlines and the Spring Statement 2025 corrected penalty schedule. Stage with the post-Wave-3 merge cleanup batch.

---

## F-10 | 2026-05-22 (during B6) | SCHEMA | Session B (during B6) | HowTo schema candidate for action-plan pages

The B6 page (mtd-itsa-letter-from-hmrc-what-to-do-next) contains a "Timeline pressure" section with a 5-row action-plan table indexed by day-bands (Day 0-2, Day 3-5, Day 6-10, Day 11-30, Day 30+ to mandate date). This maps naturally to HowTo schema, which would surface the action plan as a rich result in Google SERPs.

This is a NON-BLOCKING flag for orchestrator assessment post-merge:
1. Whether to add HowTo schema emission to the blog template for pages that match an action-plan-table pattern (would need a frontmatter signal like `howTo: true` or auto-detection of a day/step-indexed table).
2. Whether other Wave 3 / Wave 2 / legacy pages have similar action-plan patterns that would benefit (e.g. A10 ATED six-step compliance walkthrough was flagged at brief time as a HowTo candidate; B6 is now the second; the post-merge cleanup batch might surface a third or fourth across legacy pages).

Recommended action: defer to post-Wave-3 schema audit. The page works without HowTo schema; this is an SEO upside, not a correctness issue.

---

## F-11 | 2026-05-22 23:15Z | HOUSE_POSITION_CONFLICT (legislation supersedes) | Session C (during C7) | §20.7 pet damage insurance + tribunal route are NOT in the enacted Act

While writing C7 (pet rights) I verified section 11 of the Renters' Rights Act 2025 directly against legislation.gov.uk. The enacted section 11 inserts new sections 16A and 16B (only) into the Housing Act 1988. House_positions §20.7 carries two specific statements that are NOT supported by the enacted text:

1. **"Landlords can require pet damage insurance as a condition of consent."** The original Bill carried a pet damage insurance provision (drafted as a permitted exception to the Tenant Fees Act 2019). This provision was **removed during passage** and is NOT present in 16A, 16B, or anywhere else in the enacted RRA 2025. The combined effect of (a) the enacted ss.16A/16B saying nothing about insurance and (b) the Tenant Fees Act 2019 prohibition on charges beyond the prescribed list is that a landlord CANNOT make pet insurance a consent condition. The tenant can take out pet insurance voluntarily, but it cannot be required.

2. **"Tribunal route exists for tenants whose request is refused without reasonable grounds."** The enacted section 16B(5) provides for **court** remedy (specific performance) only, not a tribunal route at FTT Property Chamber. Tenants must apply to the County Court if they wish to challenge an unreasonable refusal.

Both items are also affected: §20.7 lists "building insurance constraint" and "layout / size unsuitability" among reasonable refusal grounds. The enacted s.16B(4) narrows reasonable refusal to **superior-landlord-agreement breach or superior-landlord refusal after reasonable efforts** only. The Bill's broader "reasonable refusal" categories appear to have been replaced by this much narrower test. Landlords cannot refuse on general building-insurance or layout grounds under the enacted Act; only superior-landlord-agreement constraints support a reasonable refusal in the statutory text.

**Downstream impact:**
- **C7 (this page, in progress)** is being written to the enacted Act, NOT to §20.7. The enacted-Act framing is materially different and more landlord-restrictive.
- **C8 (sibling, tenancy agreement template, todo)** must NOT include a pet-damage-insurance consent clause; the clause would be unenforceable under the Tenant Fees Act 2019. C8 should reflect the narrow refusal grounds in 16B(4) only.
- **F-1 legacy rewrite of `renters-rights-act-2026-tax-implications-landlords`** should track the corrected position when that rewrite happens.
- **§20.7 of house_positions should be corrected** to reflect the enacted Act (parallel to the F-6 §19.7 correction). Recommended new text: "Tenants gain a statutory right to request to keep a pet (RRA 2025 s.11, inserting HA 1988 ss.16A/16B, in force 1 May 2026). Landlord must respond in writing within 28 days (16A(1)(c)). Reasonable refusal is narrowly defined: only superior-landlord-agreement breach or superior-landlord refusal after reasonable efforts (16B(4)). Court remedy of specific performance on unreasonable refusal (16B(5)) — not a tribunal route. The Bill's pet damage insurance provision was removed during passage and is NOT in the enacted Act; landlords cannot require pet insurance as a consent condition (Tenant Fees Act 2019 prohibition on extra charges applies). Landlord's own insurance policy covering pet damage remains deductible as a normal landlord insurance expense."

This is the second §20-vs-enacted-Act drift in Wave 3 (after F-6 §19.7). Pattern: the locked house-positions were written in good faith but in places track the in-passage Bill drafting rather than the enacted Act. Recommended action: a §20 verification pass against the enacted Act before Wave 4 launch, focusing on the items that changed during passage (pet rights, advance-rent ban scope, possibly bidding-wars scope).

---

## F-12 | 2026-05-23 (during B7) | INTERNAL_LINK (verifier hardening) | Session B (during B7) | Standard 6-check verifier doesn't catch wrong-category internal links

While writing B7 (mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle), the initial draft contained two `/blog/[category]/[slug]` links where the `[category]` segment was wrong (used `making-tax-digital-mtd` for two pages whose actual frontmatter category puts them under `landlord-tax-essentials`). The standard "Internal links resolve" check only confirms that the slug-named markdown file exists; it does not confirm that the link's category-URL segment matches the file's frontmatter `category` field.

Impact: a link built with the wrong category-URL would build clean (Next.js doesn't error on a hard-coded `<a href>` to a non-existent route), and ship as a 404 link in production. Caught at session-time verification only because I extended the verifier mid-page.

Recommended action: harden the standard 6-check verifier with a category-URL match check. Pseudo:
- For each `/blog/[cat]/[slug]` link, look up the file `Property/web/content/blog/<slug>.md`.
- Read its frontmatter `category` field.
- Map the category name to the expected category-URL using the same mapping that powers /blog/[category]/ index pages (Making Tax Digital (MTD) → making-tax-digital-mtd, Landlord Tax Essentials → landlord-tax-essentials, etc.).
- Fail the link if the URL `[cat]` does not match the expected category-URL.

Could be added to the build-side link validator OR to the per-page session verifier; either works. Non-blocking for Wave 3 but should be in place before Wave 4. Likely affects pages shipped in Wave 1 / Wave 2 too if internal-link cross-category routing wasn't audited; recommend a one-off audit pass across all live blog pages.

---

## F-14 | 2026-05-23 (during A10) | SCHEMA | Session A (A10 closer) | HowTo schema candidate for ATED six-step compliance walkthrough page

A10 (`ated-six-step-compliance-walkthrough-uk-non-natural-persons`) is structurally a HowTo page: the body is built around six explicit numbered operational steps (chargeable-person check, valuation, return preparation, submission and payment by 30 April, relief claim, ongoing monitoring), with a "Six Steps at a Glance" table summarising each step's decision and forward-link target. This is the cleanest HowTo-schema fit in the Property blog corpus so far, exceeding the B6 action-plan-table pattern flagged at F-10.

Recommended action (orchestrator decision post-merge):
1. Add HowTo schema emission to the blog template gated on a frontmatter `howTo: true` signal (or a body-pattern auto-detector if cheaper).
2. Backfill `howTo: true` on A10 + B6 + any legacy pages with step-indexed action plans (the post-merge cleanup batch surfaced two so far; a corpus sweep may find more).
3. The HowTo JSON-LD would emit on top of the existing Article + FAQPage + BreadcrumbList + Organization schemas; no conflict with current schemas. Schema.org HowTo step definitions map cleanly to the six H2 step headings already in the page.

Non-blocking for Wave 3. Page works without HowTo schema; this is an SEO upside (rich result eligibility for "how to" queries) not a correctness issue. Treats F-10 and F-14 as a single "HowTo schema rollout" workstream.

---

## F-13 | 2026-05-23 (during B10) | REDIRECT (executed) | Session B (during B10) | Re-pointed `mtd-10000-threshold-when-does-it-apply` redirect from exemptions to policy-history page

Executed on branch `property-wave3-b` as part of the B10 commit. The middleware.ts entry for the obsolete £10,000-threshold slug was previously pointing at `mtd-rental-income-threshold-exemptions`, which is the wrong target: a user searching the abandoned £10k threshold is asking the policy-history question ("what happened to the £10k threshold"), not the current-exemption question. The B10 policy-history page covers the abandoned threshold by design and is the natural landing.

**Change applied:**
- Before: `"mtd-10000-threshold-when-does-it-apply": "/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions"`
- After: `"mtd-10000-threshold-when-does-it-apply": "/blog/making-tax-digital-mtd/mtd-itsa-major-tax-reform-context-policy-history"`

Comment annotation added inline in middleware.ts noting the 2026-05-23 re-point and the F-1 / brief reference.

Already executed; no further action required at merge.

---

## [SESSION_B_COMPLETE] 2026-05-23 | Session B (MTD ITSA bucket, all 10 pages shipped)

All 10 MTD ITSA pages assigned to Session B are complete and committed on `property-wave3-b`. Final state:

| # | Slug | Commit | Words | FAQs | monitored_pages |
|---|---|---|---|---|---|
| B1 | mtd-itsa-qualifying-income-test-gross-vs-net | 70a303e | 3,196 | 12 | (prior session) |
| B2 | mtd-itsa-accidental-landlords-do-i-need-to-file-digitally | ed595db | 2,656 | 12 | (prior session) |
| B3 | mtd-itsa-jointly-owned-property-threshold-split | dff42ad | 2,532 | 13 | (prior session) |
| B4 | mtd-itsa-exit-rule-income-drops-three-year-test | 9d52572 | 2,242 | 14 | 136 |
| B5 | mtd-itsa-vs-limited-company-cohort-different-rules | 0c511b2 | 1,990 | 14 | 141 |
| B6 | mtd-itsa-letter-from-hmrc-what-to-do-next | 9bba702 | 1,964 | 14 | 143 |
| B7 | mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle | da1ec7c | 2,506 | 14 | 146 |
| B8 | mtd-itsa-overview-six-changes-residential-landlords | 053af20 | 2,213 | 13 | (prior session) |
| B9 | mtd-itsa-pilot-trial-volunteer-2025-26-experience | bd5c166 | 2,341 | 14 | 148 |
| B10 | mtd-itsa-major-tax-reform-context-policy-history | 54acb4b | 2,497 | 14 | 151 |

**Aggregate:** 24,137 body words across the 10 pages, 134 FAQs total, all 10 builds clean, all 10 with all six verifications passing.

**Session B flags raised across the bucket:** F-7 (existing exemptions pillar has 3 factual errors), F-9 (same errors propagate to quarterly-reporting + penalties pages), F-10 (HowTo schema candidate for B6 action-plan-table pattern), F-12 (category-URL verifier hardening recommended pre-Wave-4), F-13 (executed redirect re-point for mtd-10000-threshold-when-does-it-apply).

**Discoveries logged to wave3_discovery_log_session_B.md:** D-4 (AUTHORITY_GAP: no dedicated Form 17 page), D-5 (S24 page back-link opportunity to B3).

**House position discipline:** §19.7 15/30/31 + 3%/3%/10% late-payment regime held consistently across all pages; F-6 correction (logged 2026-05-22) was applied throughout. No new HOUSE_POSITION_CONFLICT raised by Session B.

**Word count discipline pattern:** B1-B3 mid-to-upper-range (2,532-3,196), B4-B6 deliberately at reference floor (1,964-2,242, justified per page in work-log Decisions blocks), B7-B10 returned to mid-depth (2,341-2,506). The B4-B6 floor cluster is a pattern worth flagging to the orchestrator for the post-merge review: each was individually justified (single-mechanic, comparison-cohort, action-checklist) but three consecutive floor pages reads as potential drift. Recommend a brief audit of B4-B6 content depth against competitor median during the post-merge review window; if any of the three would benefit from additional depth (worked examples, more cohorts), this can be added as a maintenance patch.

**CANNIBAL discipline:** B8 (CANNIBAL-WATCH vs quarterly-reporting pillar) and B10 (CANNIBAL-WATCH vs registration how-to) both held cleanly. The framing-differentiator-led approach worked: B8 stayed at the six-headline-changes overview floor; B10 stayed strictly in policy-history territory with no operational how-to content. No active CANNIBAL flag was triggered through the bucket.

**Cross-link density:** the B-bucket pages now interlink densely (most pages cross-link 7-11 others within the bucket plus cross-category links to incorporation, landlord-tax-essentials, expat-landlords, property-investment). This creates a strong topical-authority signature for the MTD ITSA cluster post-merge. The trigger-event page (B6) and the side-by-side comparison page (B7) are the natural front-doors to the cluster from search; both have the heaviest cross-link density.

Session B is closed. Ready for merge into main on the post-Wave-3 batch.

---

## [SESSION_C_COMPLETE] | 2026-05-23 01:00Z | Session C

All 10 Session C pages shipped on branch `property-wave3-c`:

| # | Slug | Commit | Words |
|---|---|---|---|
| C1 | rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence | 90c1f87 | 3,816 |
| C2 | section-21-abolition-uk-landlord-possession-guide-2026 | a6b3e49 | 2,798 |
| C3 | periodic-tenancy-default-ast-conversion-mechanics | d347276 | 2,330 |
| C4 | renters-rights-act-rent-increase-section-13-tribunal-route | 9ef647d | 2,569 |
| C5 | decent-homes-standard-prs-landlord-compliance-checklist | afadca6 | 3,637 |
| C6 | prs-database-landlord-ombudsman-registration-requirements | 1c1eb32 | 3,113 |
| C7 | pet-rights-tenancy-landlord-refusal-reasonable-grounds | 064bbfc | 3,118 |
| C8 | tenancy-agreement-template-rra-2025-compliant-clauses | f7d8139 | 3,216 |
| C9 | landlords-considering-selling-portfolio-rra-2025-tax-implications | ebbe960 | 2,580 |
| C10 | bidding-wars-asking-rent-cap-landlord-marketing-compliance | f461c81 | 2,518 |

Total Session C body content: 29,695 words across 10 pages. All FAQ counts in 12-14 band. All builds clean. monitored_pages rows inserted for all 10 (ids 132 from prior session, then 140 + 144 + 147 + 149 + 150 + 153 for C5-C10 in this session). F-7 forward-link queue (C1+C5+C6 → C9) fully closed by C9 commit. F-11 HOUSE_POSITION_CONFLICT raised on §20.7 (pet rights — three in-passage Bill items NOT in the enacted Act: pet damage insurance as consent condition; broader reasonable-refusal grounds; FTT tribunal route. C7 and C8 written to the enacted-Act position; C8's tenancy-template guidance reflects the F-11 corrected position throughout. Downstream impact note for the §20 verification pass before Wave 4 launch). F-1 legacy rewrite of `renters-rights-act-2026-tax-implications-landlords` parked for post-Wave-3 legacy-rebuild track per the original brief.

Session C is closed. Ready for merge into main on the post-Wave-3 batch.

