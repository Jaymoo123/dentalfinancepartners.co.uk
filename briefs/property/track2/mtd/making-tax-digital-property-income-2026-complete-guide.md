# Track 2 brief: making-tax-digital-property-income-2026-complete-guide

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (REWRITE; re-cut as the operational MTD pillar)
**Source markdown path:** `Property/web/content/blog/making-tax-digital-property-income-2026-complete-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide
**Stage 1 priority:** H, compliance page with confirmed reader-misleading stale facts (wrong penalty regime, abandoned £10k threshold, wrong quarterly deadlines) plus two pricing leaks; the misinformation risk alone makes this a top-priority fix in the MTD cluster.
**Stage 1 date:** 2026-05-31
**Stage 2 enrichment date:** 2026-05-31 (source read in full; house positions §3 + §19 LOCKED 2026-05-22/05-27 cross-checked; sibling cluster + canonical paths verified on filesystem; competitor depth targets carried from diagnosis pending live re-fetch at execution per §16.31)
**Cannibalisation status:** REWRITE with sharp hub-and-spoke differentiation (NOT a collapse; rewrite-only per memory feedback_rewrite_only_no_collapse)

> **Gold-reference brief.** This page is the END-TO-END OPERATIONAL property-landlord MTD pillar. It must defer to and forward-link the narrow-intent siblings rather than restate them. The sibling `mtd-itsa-overview-six-changes-residential-landlords` (dated 2026-05-22) remains the short "what is changing" explainer; this page becomes the full-lifecycle operational guide with the worked numerical examples the overview deliberately lacks.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `making-tax-digital-property-income-2026-complete-guide`. The slug carries the "complete guide" hub identifier the diagnosis wants this page to own. No redirect proposed (rewrite-only per memory note; the engine's collapse path is overridden to REWRITE).
- **Category:** `Making Tax Digital (MTD)` (kept). Canonical stays `/blog/making-tax-digital-mtd/<slug>` (verified against the seven sibling canonicals on filesystem 2026-05-31).
- **Gap-mode tag:** `STALE_FACTS` (primary, compliance-misleading) + `PRICING_LEAK` (hard-rule violation) + `THIN_DEPTH` + `STRUCTURE` + `CANNIBAL` (hub-vs-spoke positioning) + `INVISIBLE` (near-zero current GSC pickup on the long-tail this page should own).
- **"Why this rewrite" angle:** The current page is the single most factually dangerous MTD page in the corpus. It asserts the LEGACY Self Assessment penalty regime (£100 day-one + £300 at 3/6 months + 5%/£300 at 12 months) on a compliance page where readers will plan around it; it states an exemption at "gross property income under £10,000 annually" (a threshold abandoned in 2022 and never implemented); it gives the WRONG quarterly deadlines (5th-of-month instead of 7th); it carries a stale £85,000 VAT framing; and it leaks two prices (software "£10-50 monthly", professional fees "£100-300 per quarter"). The fix is not a meta tweak: the body must be re-cut from a generic "what is MTD" explainer (which now duplicates the modern overview sibling) into the operational lifecycle pillar that walks a landlord from "am I in scope?" through registration, digital records, the four quarterly updates, EoPS + final declaration, to penalties, with worked numerical examples at each stage and a hub-and-spoke forward-link to every narrow-intent sibling. Body lift from ~1,640 words to ~3,400 with a deadlines reference table, a points-vs-£200 penalty reference table, a legacy-vs-MTD comparison table, and 4-5 worked examples.

---

## Current page snapshot (Stage 2, source markdown read in full 2026-05-31)

**Frontmatter:**
- `title`: "Making Tax Digital for Property Income 2026: Complete Landlord Guide"
- `metaTitle`: "MTD for rental income: quarterly deadlines & penalties 2026" (58 chars)
- `metaDescription`: 270+ chars (OVER the 158 limit; bloated by inline threshold parentheticals), must be rewritten short.
- `metaTitle_prev` / `metaDescription_prev` present, evidence of a prior meta-rewrite pass (the old meta still referenced "£10k").
- `author`: "Property Tax Partners Editorial Team"
- `reviewedBy` / `reviewerCredentials`: ABSENT (the corpus standard is `reviewedBy: "ICAEW Qualified Senior Reviewer"`; this page is missing the reviewer block entirely, E-E-A-T gap to fix).
- `faqs:` array = 4 entries. FAQ #3 leaks software pricing ("£10-50 monthly") and names products; FAQ #4 states the WRONG (legacy) penalty schedule.

**Body (~1,640 words):**
- H2 outline: (1) What Is Making Tax Digital for Property Income? (2) Who Must Use MTD for Property Income from 2026? + H3 Who Is Exempt (3) MTD Quarterly Reporting and Deadlines + H3 Quarterly Deadlines + H3 EOPS (4) MTD-Compatible Software and Digital Record-Keeping + H3 Software Features + H3 Digital Links (5) MTD Property Penalties and Compliance + H3 Late Filing + H3 Accuracy (6) Preparing for MTD (Steps 1-4) (7) Impact on Investment Decisions (8) Looking Beyond 2026.
- 0 worked numerical examples (only a one-line "£12,000 income / £8,000 expenses" illustration of the gross test).
- 0 outbound authority links (no gov.uk / legislation.gov.uk / HMRC manual citations).
- Internal links: 6 (one is a near-dupe self-reference to `making-tax-digital-landlords-april-2026-deadline` under a misleading "MTD for property income" anchor at body line 61, REMOVE per diagnosis; reconcile that near-duplicate at a later cluster audit).
- Schema present: FAQPage auto-emitted from frontmatter; no reviewer Person, no HowTo.
- Last meaningful edit (`date`): 2026-04-10.

**Confirmed stale / leaking lines (each must be fixed):**
| # | Location | Current (wrong) | Correct (house position) |
|---|---|---|---|
| 1 | FAQ #4 + body H3 "Late Filing Penalties" | "£100 fixed penalty from day one; +£300 at 3 and 6 months; 5%/£300 at 12 months" | Points-based: 1 point per missed quarterly update; £200 at the 4-point threshold; points reset on the dual-condition test (§19.7 + §19.19) |
| 2 | Body H3 "Who Is Exempt" + implied in FAQ #2 | "Gross property income under £10,000 annually" exemption | £10,000 abandoned 2022, never implemented; mandate is £50,000 / £30,000 / £20,000 (§3, §19.8) |
| 3 | Body H3 "Quarterly Reporting Deadlines" | "Due by 5 August / 5 November / 5 February / 5 May" | 7 August / 7 November / 7 February / 7 May (§19.6) |
| 4 | Body line 34 | "VAT-registered businesses with turnover over £85,000 must use MTD" | VAT registration threshold £90,000 from April 2024; MTD for VAT applies to ALL VAT-registered businesses regardless of turnover |
| 5 | Body H3 "End of Period Statement" | Treats EoPS as the sole year-end close | EoPS and final declaration are distinct, both due 31 January (§19.6) |
| 6 | FAQ #3 + body | Software "£10-50 monthly" | PRICING LEAK, strip; describe free-vs-paid landscape without numbers; forward-link software siblings |
| 7 | Body "Step 4" | Professional fees "£100-300 per quarter" | PRICING LEAK (Decision E), strip; route to discovery-call CTA |
| 8 | Body "digital links" list | "Copy and paste (limited circumstances)" listed as acceptable | Copy-paste is NOT a digital link (§19.14) |
| 9 | Body H3 EoPS / records | "preserved for at least five years" | 7-year retention under TMA 1970 s.12B for MTD digital records (§19.16) |

---

## GSC angle (last 90 days), to be pulled at execution

Per §16.42, this page is in the legacy cohort and the diagnosis classes it `INVISIBLE` on the long-tail it should own. The diagnosis supplied these page-level signals (pull fresh `gsc_query_data` + `bing_query_data` at execution to confirm; the points-based engine already captured them):

| Query | source | impr | pos |
|---|---:|---:|---|
| making tax digital reporting requirements property costs | gsc | 2 | 2.0 |
| hmrc - quarterly reporting of property income | gsc | 1 | 9.0 |
| making tax digital property income 2026 complete guide (page-level, Bing) | bing | 3 | 5.5 |

**Read:** Google impressions are near-zero (2 + 1), so there is no CTR-fail to recover; this is `INVISIBLE`, the page is not surfacing for the broad "complete guide / everything landlords need to know / step-by-step MTD property income" long-tail it is positioned to own, partly because the body currently duplicates the narrow overview sibling rather than offering the operational depth that wins the hub query. Bing already places the page at pos 5.5 on the exact "complete guide" string (3 impr), which validates the hub-intent thesis. Realistic post-rewrite target: capture the operational long-tail (adjacent queries below, all currently 0 impr) by being the deepest end-to-end page in the cluster, while forwarding narrow intent to the spokes so the cluster does not cannibalise itself.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS at compliance-critical magnitude.** Nine confirmed wrong/leaking facts (table above), three of which (penalty regime, £10k exemption, wrong deadlines) are actively reader-misleading on a page people will plan compliance around. This is the load-bearing fix and the rewrite's first job. The penalty regime in particular is the canonical risk_notes item: §19.7 LOCKED points-based late-submission (1 point/update, £200 at 4-point threshold, reset on §19.19 dual-condition) plus the Spring Statement 2025 accelerated late-PAYMENT schedule (3% at day 15, +3% at day 30, +10% p.a. from day 31).

**Secondary: PRICING_LEAK (hard-rule violation, Decision E).** Software "£10-50 monthly" and professional fees "£100-300 per quarter" both breach the lead-gen handoff model. Strip both; the "is it worth the saving vs penalties" framing must go too (a soft fee comparison is still a pricing-leak per Decision E).

**Tertiary: CANNIBAL (hub-vs-spoke).** Post-2026-05-22 the corpus gained the modern overview sibling that owns "the six headline changes" with correct penalties and 9 FAQs. The current page's first two H2s now duplicate that overview. The rewrite must NOT restate the six-changes framing; it pivots to the operational lifecycle and hub-and-spokes to the narrow owners.

**Also: THIN_DEPTH + STRUCTURE + INVISIBLE.** 1,640 words / 0 worked examples / 0 authority links / 0 reference tables / missing reviewer block vs a competitor depth ceiling of ~3,500-4,000 words with full lifecycle + key-dates + FAQ. The thinness is why the page is INVISIBLE on the operational long-tail.

**Load-bearing fix sequence (ordered by ROI / risk):**
1. **Correct the nine stale/leaking facts** (penalty regime, £10k, deadlines, VAT, EoPS-vs-final-declaration, copy-paste, retention) and strip both prices. Highest risk; do first.
2. **Re-cut the body into the operational lifecycle pillar** (assess scope -> register via Government Gateway + ASA -> keep digital records -> four quarterly updates -> EoPS + final declaration -> penalties), deferring narrow intent to siblings.
3. **Add the three reference tables + 4-5 worked examples** (see content plan).
4. **Add the reviewer block** (`reviewedBy: "ICAEW Qualified Senior Reviewer"` + credentials) and 5-7 authority links.
5. **Hub-and-spoke internal links** to every narrow-intent sibling; remove the misleading line-61 self-reference.
6. **Rewrite metaTitle (<=62) + metaDescription (<=158)** around the "complete / step-by-step operational guide" angle the siblings do not target.
7. **SI-number discipline:** cite the live instrument SI 2026/336 (in force 1 April 2026), NOT the revoked SI 2021/1076, per §19.18; verify reg numbers at write time.

---

## Competitor URLs (Stage 2, carried from diagnosis; RE-FETCH + status-check + date-stamp at execution per §16.31)

| URL | Expected status | Depth signal | Borrow / differentiate |
|---|---|---|---|
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step | 200 (authority) | The source-of-truth users want | LINK OUT to convert irrecoverable authority-intent impressions; do not try to out-rank gov.uk on "what is MTD" |
| https://www.landlordstudio.com/uk-blog/making-tax-digital-for-landlords | 200 | ~3,500 words, 10 H2s, 6-step registration, points-based penalties, full lifecycle | DEPTH MATCH-TARGET, match the lifecycle completeness; beat it with worked examples + correct accelerated late-payment schedule + reference tables |
| https://www.ukpropertyaccountants.co.uk/making-tax-digital-knowledge-every-landlord-must-have/ | 200 | ~3,500-4,000 words, FAQ, 7 H2s, nudge-letters + key-dates + VAT | Borrow the key-dates + HMRC nudge-letter framing; differentiate with our points-based penalty table + joint-owner worked example |
| https://www.freeagent.com/guides/making-tax-digital/mtd-what-landlords-need-to-know/ | 200 | ~1,800 words; confirms correct quarterly deadlines (7 Aug / 7 Nov / 7 Feb / 7 May) | Use as deadline cross-check (independent confirmation of the 7th-of-month dates); do not hard-code FreeAgent as the software pick |

**Competitor depth ceiling:** ~3,500-4,000 words, lifecycle coverage, key-dates, FAQ, but no points-based penalty TABLE and no joint-owner / gross-test worked examples at our planned specificity. Our ~3,400-word target with 3 reference tables + 4-5 worked examples + 5-7 verified statute/HMRC citations + reviewer block is best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (re-read for the MTD cluster at brief draft; this page is the hub, siblings are the spokes).

| Source | Slug | Intent owned | Resolution |
|---|---|---|---|
| Residual (own) | making-tax-digital-property-income-2026-complete-guide | "complete / step-by-step operational guide" hub | REWRITE in place as the operational pillar |
| Modern sibling (2026-05-22) | mtd-itsa-overview-six-changes-residential-landlords | "what is changing" short explainer (six headline changes) | DO NOT duplicate the six-changes framing; forward-link as the short overview; this page is the long operational counterpart |
| Sibling | mtd-rental-income-threshold-exemptions | threshold / exemption intent (Bing pos 3.6, 8 clicks) | Defer threshold detail; summarise + forward-link as the threshold owner |
| Sibling | what-is-qualifying-income-for-mtd / mtd-itsa-qualifying-income-test-gross-vs-net | qualifying-income gross-vs-net | Summarise the gross test in the "assess scope" step; forward-link for the deep test |
| Sibling | how-to-register-mtd-landlord-step-by-step-guide | registration (Bing pos 4.5, 3 clicks) | Cover registration at hub level (Government Gateway + ASA); forward-link the step-by-step owner |
| Sibling | mtd-quarterly-reporting-landlords-step-by-step-guide / mtd-quarterly-deadlines-2026-2027-landlords | quarterly mechanics / dates | Hub gives the deadline table + one update walkthrough; forward-link the mechanics + dates owners |
| Sibling | mtd-penalties-landlords-miss-deadline / mtd-penalties-exemptions-and-what-to-watch | penalties | Hub gives the corrected points + late-payment tables; forward-link the penalty deep-dives |
| Sibling | best-mtd-software-landlords-2026 / mtd-software-landlords-free-vs-paid-options-compared | software | Hub describes the compatible-software landscape (no product hard-coding, no prices); forward-link the software owners |
| Sibling | mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly | agent-managed portfolios | One paragraph (landlord is the filer, §19.13); forward-link |
| Near-duplicate (cluster audit) | making-tax-digital-landlords-april-2026-deadline | overlaps the hub | REMOVE the in-body line-61 self-reference under the wrong anchor; flag the near-duplicate for a later cluster audit (do not reconcile in this brief) |

**Conclusion:** REWRITE in place as the operational pillar. No REDIRECT/collapse (rewrite-only per memory). The distinct query targets this page should own that the siblings do NOT: "complete guide" / "everything landlords need to know" / "step-by-step MTD property income" long-tail, plus the digital-records + digital-links operational depth presented end-to-end.

---

## Closest existing pages (Stage 2, all verified on filesystem 2026-05-31, canonical `/blog/making-tax-digital-mtd/`)

Hub-and-spoke forward-links (each spoke keeps its narrow intent; the hub links out to it):
- `mtd-itsa-overview-six-changes-residential-landlords`, short overview counterpart (bidirectional)
- `mtd-rental-income-threshold-exemptions`, threshold/exemption owner
- `what-is-qualifying-income-for-mtd` + `mtd-itsa-qualifying-income-test-gross-vs-net`, qualifying-income owners
- `how-to-register-mtd-landlord-step-by-step-guide`, registration owner
- `mtd-quarterly-reporting-landlords-step-by-step-guide` + `mtd-quarterly-deadlines-2026-2027-landlords`, quarterly mechanics + dates owners
- `mtd-penalties-landlords-miss-deadline` + `mtd-penalties-exemptions-and-what-to-watch`, penalty owners
- `best-mtd-software-landlords-2026` + `mtd-software-landlords-free-vs-paid-options-compared`, software owners
- `mtd-itsa-letting-agent-managed-portfolio-who-files-quarterly`, agent-managed owner
- `mtd-itsa-jointly-owned-property-threshold-split` / `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse`, joint-owner owners (cross-link from the joint-owner worked example)

Cross-category links: `buy-to-let-limited-company-complete-guide-uk` (Ltd Co is outside MTD ITSA), `claim-mortgage-interest-rental-property-uk-section-24` (finance-cost categorisation in digital records), `/services` or `how-to-choose-a-property-accountant` (CTA destination, no pricing).

**Remove:** the body line-61 link to `making-tax-digital-landlords-april-2026-deadline` (misleading anchor + near-dupe).

---

## House-position references (Stage 1, all LOCKED; cite by section number, never paraphrase)

- **§3 MTD ITSA applicability** [LOCKED 2026-05-22]: thresholds £50,000 (6 Apr 2026) / £30,000 (6 Apr 2027) / £20,000 (6 Apr 2028); Ltd Cos outside; GP partnerships deferred (date TBC); joint owners test their share of gross.
- **§19.1 Mandate timeline** [LOCKED 2026-05-22]: reference-year tests (2024/25 return for the Apr 2026 cohort, etc.); obligation is the taxpayer's regardless of HMRC letter.
- **§19.2 Qualifying income** [LOCKED]: gross turnover + gross rents before deductions; aggregated for the test; the £52,000-gross / £12,000-net "in scope" worked case.
- **§19.3 Excluded categories** [LOCKED]: Ltd Cos, partnerships (deferred), LLPs, trustees, non-resident interaction with NRL (§17.5).
- **§19.4 Joint-property owners** [LOCKED]: share-of-gross test; Form 17 75/25 brings the 75% spouse in earlier (default 50/50 per ITA 2007 s.836).
- **§19.5 Exit / income-drop** [LOCKED]: three-consecutive-years-below to exit; voluntary opt-in from 6 Apr 2025 pilot / 6 Apr 2026 general.
- **§19.6 Software + quarterly cycle** [LOCKED]: HMRC-recognised compatible software (do NOT hard-code product names); spreadsheet+bridging acceptable; deadlines 7 Aug / 7 Nov / 7 Feb / 7 May; EoPS + final declaration both 31 January; calendar-quarter election available.
- **§19.7 Penalty regime** [LOCKED 2026-05-22]: points-based late-submission (1 point/update, £200 at 4-point threshold, reset after 24 months); late-payment accelerated 3% day 15 / +3% day 30 / +10% p.a. day 31 (Spring Statement 2025).
- **§19.8 Abandoned £10,000 threshold** [LOCKED]: never implemented; do not write "lowered from £10,000".
- **§19.10 ASA mechanics** [LOCKED 2026-05-23]: Agent Services Account mandatory route; Government Gateway client authorisation flow; joint owners authorise separately.
- **§19.13 Letting-agent managed portfolio** [LOCKED 2026-05-23]: landlord is the filer; gross-collected (not net-of-fees) is the reported income.
- **§19.14 Digital-link rule** [LOCKED 2026-05-23]: copy-paste / re-keying NOT a digital link; cell references / API / scripted CSV import ARE.
- **§19.16 Digital-records evidence + retention** [LOCKED 2026-05-23]: 7-year retention (TMA 1970 s.12B); what HMRC accepts as digital records.
- **§19.18 SI 2021/1076 -> SI 2026/336 migration** [LOCKED 2026-05-27]: cite the LIVE instrument SI 2026/336 (in force 1 Apr 2026); SI 2021/1076 is revoked and appropriate only in historical/migration context; verify new reg numbers at write time (reg 25 qualifying income, reg 27 threshold, reg 18 exclusion notice, reg 24 exit rule; others "verify Stage 2").
- **§19.19 Points reset dual-condition** [LOCKED 2026-05-27]: reset needs (a) 12-month compliance period AND (b) all submissions due in the preceding 24 months made; points regime sits at FA 2021 Sch 24 (NOT FA 2007 Sch 24).
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict, multiple, compliance-grade.** This is the highest-conflict MTD brief in Track 2 to date. The published page contradicts §19.7 (penalty regime entirely wrong), §3/§19.8 (£10k exemption asserted), §19.6 (wrong deadlines + EoPS/final-declaration conflation), §19.14 (copy-paste listed as a digital link), §19.16 (5-year not 7-year retention), and §13 (two pricing leaks). Correcting these is the rewrite's first job, before any depth/structure work.

Flag to `track2_site_wide_flags.md` as:
- **F-[next] | 2026-05-31 | HIGH | making-tax-digital-property-income-2026-complete-guide | STALE_FACTS | Legacy SA penalty regime asserted (£100 day-one / £300 at 3+6mo / 5% at 12mo) on a compliance page. House §19.7 LOCKED points-based (£200 at 4-point threshold) + accelerated late-payment 3%/3%/10% at day 15/30/31. Reader-misleading; fully rewritten.**
- **F-[next] | 2026-05-31 | HIGH | making-tax-digital-property-income-2026-complete-guide | STALE_FACTS | £10,000 exemption asserted (body + FAQ). House §3/§19.8: abandoned 2022, never implemented; mandate £50k/£30k/£20k. Exemption row stripped.**
- **F-[next] | 2026-05-31 | MEDIUM | making-tax-digital-property-income-2026-complete-guide | STALE_FACTS | Wrong quarterly deadlines (5th-of-month). House §19.6 + FreeAgent: 7 Aug / 7 Nov / 7 Feb / 7 May.**
- **F-[next] | 2026-05-31 | MEDIUM | making-tax-digital-property-income-2026-complete-guide | PRICING_LEAK | Software "£10-50 monthly" + fees "£100-300 per quarter" (Decision E). Stripped; routed to discovery-call CTA + software siblings.**
- **F-[next] | 2026-05-31 | LOW | making-tax-digital-property-income-2026-complete-guide | CANNIBAL | In-body line-61 link to near-dupe making-tax-digital-landlords-april-2026-deadline under misleading anchor; removed; near-dupe flagged for later cluster audit.**

---

## Authority links worth considering (Stage 2, verify all at execution per §16.31; verify Royal Assent / SI in-force status per F-37 Bill-vs-enacted pattern)

| URL | Verification note | Use case |
|---|---|---|
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step | Authority cross-reference (link-out to convert authority-intent) | Primary gov.uk MTD step-by-step |
| https://www.legislation.gov.uk/uksi/2026/336/contents | LIVE instrument (in force 1 Apr 2026), cite this, NOT SI 2021/1076 (revoked) per §19.18; verify reg numbers at write time | Operative MTD digital-obligations regulations |
| https://www.legislation.gov.uk/ukpga/2021/26 (Finance Act 2021) | Sch 24 = points-based late submission; Sch 26 = late payment. Verify FA 2025 amendments / Spring Statement 2025 enacted status at write time (F-37 pattern) | Penalty-regime statute spine |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | Verbatim source for 3% day-15 / +3% day-30 / +10% p.a. day-31 (per §19.7 verification note) | Accelerated late-payment schedule |
| https://www.legislation.gov.uk/ukpga/1970/9/section/12B (TMA 1970 s.12B) | 7-year record retention | Digital-records retention |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 (ITTOIA 2005 s.272) | UK property business definition | "What counts as property income" |
| https://www.legislation.gov.uk/ukpga/2007/3/section/836 (ITA 2007 s.836) | Default 50/50 spouse split | Joint-owner worked example |
| https://www.gov.uk/government/collections/find-software-thats-compatible-with-making-tax-digital-for-income-tax | Compatible-software list (do NOT hard-code product names) | Software landscape paragraph |

(Execution session cites 5-7.)

---

## Content plan (section-by-section to ~3,400 words)

**Intro (~140 words):** Operational pillar framing. "If you are a landlord with gross rents over the threshold, here is the whole MTD ITSA lifecycle, start to finish, with the numbers." Set this page apart from the short overview sibling in one sentence and forward-link it. State the in-force instrument is SI 2026/336.

**H2 1, Are you in scope? The 60-second gross-income test (~360 words).** The §19.2 gross (not net) test; aggregation of trade + rents; reference-year mechanic (§19.1); the HMRC letter is a courtesy, not the trigger. **Worked Example 1:** the £52,000-gross / £40,000-deductions / £12,000-net landlord who is IN scope at the Apr 2026 mandate (the net-low/gross-high trap). Summarise + forward-link the threshold and qualifying-income siblings. Exemptions handled honestly: Ltd Cos out (§19.3), partnerships deferred, non-residents interact with NRL, and explicitly state the £10,000 figure was abandoned in 2022 and never applied (kills the stale fact and pre-empts the competitor confusion).

**H2 2, Reference table: who is mandated and when (REQUIRED TABLE, thresholds/dates reference).**
Plain HTML table, no pricing. Columns: `Mandate date | Mandatory for | Gross qualifying-income threshold | Reference tax-year tested`. Rows: 6 Apr 2026 / sole traders + landlords / over £50,000 / 2024-25 return; 6 Apr 2027 / over £30,000 / 2025-26 return; 6 Apr 2028 / over £20,000 / 2026-27 return. (Source §19.1.)

**H2 3, Registering: Government Gateway, MTD sign-up, and the ASA (~340 words).** Sign-up via Government Gateway; agent route via the Agent Services Account (§19.10), Government Gateway client-authorisation flow, joint owners authorise separately. Hub-level only; forward-link the step-by-step registration sibling. One `<aside>` CTA here (discovery call, no pricing).

**H2 4, Keeping digital records and the digital-link rule (~430 words).** What HMRC accepts as a digital record (§19.16: app receipt photos, bank-feed CSV/API, software entries); the SA105 category discipline (gross rental, agent fees, repairs, insurance, council tax, finance costs, other); the digital-link definition (§19.14), acceptable: cell references/formulae, linked tables, API, scripted CSV; NOT acceptable: copy-paste / manual re-keying / screen-reading (corrects the current page's wrong "copy and paste (limited circumstances)" line). 7-year retention under TMA 1970 s.12B (corrects the "five years" error). Software landscape: HMRC-recognised compatible software OR spreadsheet + recognised bridging; NO product names, NO prices; forward-link the two software siblings.

**H2 5, The four quarterly updates: periods, deadlines, and a worked submission (~430 words).** Cumulative cash-basis update mechanics; calendar-quarter election option. **REQUIRED TABLE, deadlines reference** (below). **Worked Example 2:** a single-property landlord's Q1 update (gross rent received 6 Apr-5 Jul, allowable expenses paid in-period, the cumulative figure submitted by 7 Aug). Forward-link the quarterly-mechanics + deadlines siblings.

**H2 6, Reference table: quarterly update deadlines 2026/27 (REQUIRED TABLE, deadlines reference).**
Plain HTML table. Columns: `Update period | Standard period dates | Submission deadline`. Rows: Q1 / 6 Apr-5 Jul / 7 Aug; Q2 / 6 Jul-5 Oct / 7 Nov; Q3 / 6 Oct-5 Jan / 7 Feb; Q4 / 6 Jan-5 Apr / 7 May; End-of-Period Statement / full tax year / 31 Jan following; Final declaration / all income / 31 Jan following. (Source §19.6; corrects the 5th-of-month error.)

**H2 7, Closing the year: EoPS vs the final declaration (~300 words).** The distinction the current page conflates (§19.6): EoPS crystallises each business/portfolio's profit after adjustments; the final declaration is the wider annual return across all income (employment, dividends, savings, pension, property), filed digitally and replacing the old SA100. Both due 31 January. Foreign tax credit / NRL claimed at final declaration (§19.11). Forward-link the comparison sibling.

**H2 8, Penalties: the points-based late-submission cycle and accelerated late-payment schedule (~420 words).** The corrected §19.7 regime. **REQUIRED TABLE, penalty reference** (below). Points reset dual-condition (§19.19). Statute spine: points regime FA 2021 Sch 24 (not FA 2007 Sch 24); late payment FA 2021 Sch 26 as accelerated by Spring Statement 2025 (verify FA 2025 enacted status at write time). **Worked Example 3:** a landlord who misses two quarterly updates (2 points, no penalty yet) vs one who reaches 4 points (£200, then £200 per further late update). Forward-link the two penalty siblings.

**H2 9, Reference table: legacy SA vs MTD ITSA penalties (REQUIRED COMPARISON TABLE).**
Plain HTML side-by-side. Columns: `Aspect | Legacy Self Assessment (pre-MTD) | MTD ITSA (from 6 Apr 2026)`. Rows: Late submission / £100 fixed + escalating / points-based (1 point/update, £200 at 4-point threshold); Late payment trigger days / 31-46-91 / 15-30-31; Late payment rates / 2% / 2% / 4% p.a. / 3% / 3% / 10% p.a.; Year-end filing / SA100 / final declaration via software; Records / paper allowed / digital-link required. (This is the comparison the diagnosis flags as essential; it also directly replaces the wrong legacy-penalty section.)

**H2 10, Special situations landlords ask about (~330 words).** Short, hub-level, each forward-linking the owner: joint owners (**Worked Example 4:** £100,000 gross rent held 50/50 -> each tests £50,000, both in scope at the boundary; Form 17 75/25 brings the 75% spouse in earlier, §19.4, ITA 2007 s.836); letting-agent-managed portfolios (landlord is the filer, report gross-collected not net-of-fees, §19.13); mid-year cessation / selling the last property (§19.15, CGT 60-day return runs in parallel); foreign property (§19.11). Forward-link joint-owner, agent-managed, and cessation siblings.

**H2 11, Your MTD readiness checklist (~250 words).** Operational close: confirm scope, pick recognised software or bridging, digitise records into SA105 categories, register / authorise agent via ASA, diarise the four deadlines + 31 Jan close. One `<aside>` CTA (discovery call). NO pricing anywhere; route any "what does help cost" instinct to the accountant page without numbers.

**FAQs (10-14, frontmatter `faqs:` array; auto-emitted as FAQPage).** Each targets a specific operational query verbatim, none duplicating the overview sibling's nine. Required FAQ coverage: do landlords need MTD for income tax 2026; MTD ITSA landlord requirements 2026; quarterly update deadlines property income 2026; MTD property income penalties points-based; end of period statement vs final declaration; digital record-keeping rules; reporting requirements including property costs; HMRC quarterly reporting of property income. (See Query-coverage plan for the exact assignment.)

**Voice / hard-rule reminders for the writer:** NO em-dashes (use commas, parentheses, full stops, middle dots). NO pricing or soft fee comparisons. Anonymised social proof only. Raw HTML in markdown body (`<p>`, `<h2>`, `<table>`), not markdown headings (per memory blog_page_rendering_html_in_frontmatter). LeadForm auto-injected by `BlogPostRenderer.tsx`, do not duplicate; 1-3 inline `<aside>` CTAs only. No Tailwind classes in body. Tables are plain semantic HTML.

---

## Query-coverage plan

One row per target_queries[] item; each query assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---:|---:|---:|---|
| making tax digital property income 2026 (complete guide for landlords) | primary | - | - | metaTitle + H1 |
| making tax digital reporting requirements property costs | gsc | 2 | 2 | H2 4 (digital records / SA105 cost categories) |
| hmrc - quarterly reporting of property income | gsc | 1 | 9 | H2 5 (four quarterly updates) |
| making tax digital property income 2026 complete guide (page-level, Bing) | bing | 3 | 5.5 | H1 (operational pillar framing) |
| mtd for landlords complete guide 2026 | adjacent | 0 | 0 | Intro (operational lifecycle hub statement) |
| making tax digital property income quarterly updates | adjacent | 0 | 0 | H2 6 (deadlines reference table) |
| mtd itsa landlord requirements 2026 | adjacent | 0 | 0 | H2 2 (mandate reference table) |
| mtd property income digital record keeping rules | adjacent | 0 | 0 | FAQ (digital record-keeping rules) |
| mtd quarterly update deadlines property income 2026 | adjacent | 0 | 0 | FAQ (quarterly update deadlines) |
| mtd property income penalties points based | adjacent | 0 | 0 | H2 8 (points-based penalties) |
| end of period statement vs final declaration landlord | adjacent | 0 | 0 | H2 7 (EoPS vs final declaration) |
| do landlords need mtd for income tax 2026 | adjacent | 0 | 0 | FAQ #1 (do landlords need MTD for income tax 2026) |

---

## Meta plan

- **metaTitle (<=62):** `MTD for Property Income 2026: Complete Landlord Guide` (53 chars)
- **metaDescription (<=158):** `The full Making Tax Digital lifecycle for landlords: scope, registering, digital records, the four quarterly updates, EoPS, final declaration, penalties.` (155 chars)
- **h1:** `Making Tax Digital for Property Income 2026: A Complete Landlord Guide`
- **summary:** `The end-to-end operational guide to Making Tax Digital for Income Tax for property landlords from 6 April 2026: how to test whether you are in scope on gross rents, register through Government Gateway and the Agent Services Account, keep compliant digital records, file the four quarterly updates by 7 August, 7 November, 7 February and 7 May, close the year with the end-of-period statement and final declaration, and stay clear of the points-based late-submission and accelerated late-payment penalties.`

(No em-dashes in any meta field. No pricing. metaDescription replaces the current 270-char bloated version.)

---

## Schema plan

- **Reviewer name:** `ICAEW Qualified Senior Reviewer` (the established Property-corpus reviewer entity; anonymised credentials-based, consistent with the lead-gen no-named-real-people model, confirmed as the corpus standard across existing blog frontmatter).
- **Reviewer credentials (`reviewerCredentials`):** `ICAEW Chartered Accountant, property tax specialist` (emitted as `reviewedBy.jobTitle` in JSON-LD per `Property/web/src/lib/schema.ts`).
- **reviewedAt:** set to dateModified (2026-05-30).
- **author:** `Property Tax Partners Editorial Team` (kept).
- **howTo:** `false`. This is an operational guide with embedded steps, but the step-by-step HowTo intent is owned by the registration and quarterly-reporting siblings (which forward-link out). Keeping HowTo on the spokes, not the hub, avoids HowTo-schema duplication across the cluster. Hub emits Article + FAQPage only.
- **dateModified:** `2026-05-30`.
- **JSON-LD blocks emitted:** `BlogPosting`/`Article` (with `reviewedBy` Person now populated) + `FAQPage` (auto-emitted from the `faqs:` frontmatter array by `buildBlogPostingJsonLd`). NO HowTo block. Do not hand-add FAQ schema in the body.

---

## 19-step workflow (legacy-rewrite adaptation, Track 2 deltas at steps 9/12/13)

1. Read `house_positions.md` §3 + §19 (all sub-sections, esp. §19.6, §19.7, §19.8, §19.14, §19.16, §19.18, §19.19) in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / then execution status).
3. Read this brief end-to-end.
4. **Verify at write time (F-37 Bill-vs-enacted discipline):** (a) SI 2026/336 in force + current reg numbers on legislation.gov.uk; (b) FA 2021 Sch 24 / Sch 26 + whether the Spring Statement 2025 acceleration is enacted via FA 2025 or still cite the Spring Statement HTML; (c) the £50k/£30k/£20k schedule + 7th-of-month deadlines on gov.uk.
5. Re-fetch the 4 competitor URLs (200 check, date-stamp; replace any dead URL).
6. Read the current source markdown in full + the modern overview sibling to lock the differentiation boundary.
7. Read the spoke siblings' first screens to set forward-link anchors and avoid restating their depth.
8. Plan outline: 11 H2s, 3 reference tables + 1 comparison table, 4-5 worked examples, 10-14 FAQs, ~3,400 body words.
9. **Rewrite markdown at existing path** (NOT new file). Keep slug + canonical + `date`; set `dateModified`/`reviewedAt` = 2026-05-30; add `reviewedBy` + `reviewerCredentials`; rewrite metaTitle (<=62) + metaDescription (<=158); replace the 4 FAQs with 10-14 corrected ones; remove the line-61 self-reference.
10. Build: `cd Property/web && npm run build`. Must pass.
11. Six checks + Track 2 extras: FAQ schema count = frontmatter length; em-dash count = 0; Tailwind class count = 0; metaTitle <= 62; metaDescription <= 158; all internal links resolve; **pricing check** (`£[0-9]` returns 0 fee/software-cost matches in body + FAQs); **stale-fact check** (no "£10,000 threshold", no "5 August/November/February/May", no "£100 fixed penalty", no "£85,000", no SI 2021/1076 as live instrument).
12. Confirm no redirect needed (none, rewrite-only; slug kept as the hub).
13. Update/insert `monitored_pages` row; 180-day window (INVISIBLE baseline per F-11) from rewrite date.
14. Commit on `main` (tracker edits to main repo file via absolute paths only): `Track 2A: rewrite making-tax-digital-property-income-2026-complete-guide (stale-penalty + pricing-leak fix; operational MTD pillar)`.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Append discoveries / flags to `track2_site_wide_flags.md` (the 5 F-flags above).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log inter-batch discoveries (near-dupe cluster-audit recommendation for `making-tax-digital-landlords-april-2026-deadline`).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

### House-position alignment
- §3 / §19.1 thresholds + reference years: __
- §19.6 deadlines (7th-of-month) + EoPS/final-declaration split: __
- §19.7 / §19.19 penalties (points + accelerated late-payment) + FA 2021 Sch 24/Sch 26: __
- §19.8 £10k stale fact removed: __
- §19.14 copy-paste-not-a-digital-link corrected: __
- §19.16 7-year retention corrected: __
- §19.18 SI 2026/336 cited (not 2021/1076); reg numbers verified at write: __
- §13 pricing leaks removed (software + fees): __

### Comparison: before vs after
- Word count: 1,640 → __ (target ~3,400)
- H2 count: 8 → __ (target 11)
- FAQ count: 4 → __ (target 10-14)
- Worked examples: 0 → __ (target 4-5)
- Reference/comparison tables: 0 → __ (target 4)
- Authority links: 0 → __ (target 5-7)
- Reviewer block: absent → __ (added)
- Inline CTAs: 0 → __ (target 2)

### Bill-vs-enacted / SI verification (load-bearing)
- SI 2026/336 in force + reg numbers: __
- FA 2025 acceleration enacted or Spring Statement HTML cited: __

### Flags raised
- F-flags from brief (stale penalty / £10k / deadlines / pricing / cannibal self-ref): __ confirmed
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
