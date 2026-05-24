# Track 2 brief: how-to-report-property-sale-hmrc-60-days

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket A (CGT reporting cluster-collapse continuation, F-16)
**Source markdown path:** `Property/web/content/blog/how-to-report-property-sale-hmrc-60-days.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/how-to-report-property-sale-hmrc-60-days
**Stage 1 priority:** L (zero GSC in 90-day window; 12 GA4 sessions with 65.8% bounce rate confirms invisible-search-visibility status; cluster cannibalisation against the rewritten Session C #23 canonical that holds the 60-day-CGT-reporting query space)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (the rewritten Session C #23 sibling, shipped 2026-05-21, which holds ~262 impressions across 20 queries in the 90-day window and was already confirmed as the canonical absorbing the Batch 1 Sub-bucket B trio — B1-B1, B1-B2, B1-B3 — into the same redirect target). F-16 continuation candidate per `track2_site_wide_flags.md` 2026-05-23 22:00Z.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-payment-deadlines-property-sales-2026`. The slug `how-to-report-property-sale-hmrc-60-days` carries the operational-walkthrough framing ("how to") but the rewritten canonical already covers the operational walkthrough in its §"The 60-day return" + §"What the 60-day return contains" sections. The legacy page adds no semantic angle the canonical doesn't already cover better.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against the rewritten canonical + against the intra-pair B2-A2 partner `report-property-sale-hmrc-60-days-guide`) + `INVISIBLE` (secondary — page has zero GSC signal in 90-day window per F-11 INVISIBLE pattern, despite 12 GA4 sessions almost entirely from internal-link traffic with 65.8% bounce) + `STALE_FACTUAL` (tertiary — wrong penalty framing in FAQ #1 conflates late-payment surcharge with late-filing penalties + stale company corporation tax rate in body §"Company Ownership" + 2025/26 year-stamp on AEA). After redirect the body STALE issues evaporate; the redirect is the fix.
- **"Why this rewrite" angle:** there is no rewrite worth doing. The canonical `cgt-payment-deadlines-property-sales-2026` shipped 2026-05-21 already holds the cluster with: the dual penalty-clock table (late-filing vs late-payment), the in-scope-seller table, the 12 FAQs, the worked timeline (Wednesday 17 June 2026 example), the dual UK-resident-vs-non-resident asymmetry handling, and aside CTAs. Rewriting this page in place would re-create the cannibalisation that Batch 1 Sub-bucket B's collapse of 3 slugs into the canonical was designed to resolve. The right action is to extend the cluster collapse: redirect this slug (plus intra-pair B2-A2 to the same canonical) and consolidate the (negligible) link equity in one execution-time commit.

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map`:** no row — page has never been parsed by the competitor pipeline. (Same pattern as Batch 1 Sub-bucket B's B1-B1: pages with no `page_content_map` row tend to be those the SERP-runner never selected, consistent with the zero-impression GSC profile.)

**Filesystem source read (`Property/web/content/blog/how-to-report-property-sale-hmrc-60-days.md`):**
- Date: 2026-04-10. No `dateModified` — never re-touched since first publish.
- Title (h1 + title field both): "How to Report a Property Sale to HMRC Within 60 Days: Complete Guide 2026"
- metaTitle: "Report Property Sale HMRC 60 Days: Complete Guide 2026" (53 chars — under cap)
- metaDescription: "Step-by-step guide to reporting property sales to HMRC within 60 days. CGT online reporting deadlines, forms, penalties, and compliance requirements." (148 chars — near cap)
- Body word count (eyeballed from source): ~1,800-1,900 words.
- 9 H2 sections + 7 H3 sub-sections (`Who Must Report a Property Sale to HMRC`, `CGT Online Reporting: The HMRC Property Disposal Form` with `Accessing the Online Service` + `Information Required for the Form` H3s, `CGT Calculation and Payment` with `Payment Methods and Deadlines` H3, `Step-by-Step Reporting Process` with 6 step H3s, `Special Cases and Ownership Structures` with `Joint Ownership` + `Company Ownership` + `Trusts and Non-Residents` H3s, `Penalties for Late Reporting` with `Reasonable Excuse` H3, `Common Mistakes to Avoid`, `What Happens After Reporting` with `Amendments and Corrections` H3, `Getting Professional Help`, `Planning for Future Disposals`).
- Frontmatter `faqs:` array: 4 FAQs.
- 0 worked examples — page is workflow-explanatory only, no numerical calculation example.
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations).
- Internal links: 4 (PRR pillar, CGT pillar, property accountant services, complete property investment tax guide).
- No schema-attached `reviewedBy` or `sourcesVerifiedAt`. Plain editorial framing.

**House-position drift visible in source (multiple HIGH-severity, all resolved by REDIRECT not REWRITE):**
- **FAQ #1** asserts: *"HMRC charges an automatic penalty of 5% of the tax due (minimum £300) for late reporting. After 6 months, an additional 5% penalty applies (minimum £300). Even if no tax is due, the minimum penalty is £300, rising to £600 after 6 months."* This is **wrong**. The actual late-filing schedule per §5 LOCKED + the canonical's dual-table format: £100 fixed + £10/day from day 91 (cap £900) + £300 (or 5% if higher) at 6 months + £300 (or 5% if higher) at 12 months. The 5% / £300 minimum figures in the FAQ describe a hybrid that conflates the late-payment surcharge (5% at day 91 / day 181 / day 365) with the late-filing fixed penalties. The FAQ as written would mislead a reader about the actual £100 initial penalty.
- **Body §"Penalties for Late Reporting"** (lines 153-161) repeats the same FAQ #1 framing in slightly different language: *"Initial penalty: 5% of tax due (minimum £300) / After 6 months: Additional 5% of tax due (minimum £300)"* — same conflation as the FAQ.
- **Body §"Company Ownership"** (line 145) asserts: *"Companies do not use the residential property disposal service. Corporate property disposals are reported through Corporation Tax returns (with corporation tax at 19% for profits up to £250k and 25% for profits above this threshold)"*. The 19%/25% rates are correct but the £250k threshold is incorrect — the small-profits rate of 19% applies up to £50,000 (full main rate of 25% applies from £250,000); between £50,000 and £250,000 marginal relief applies. The way the source paragraph reads ("19% for profits up to £250k") suggests no profits up to £250k pay the main rate, which is materially wrong.
- **Body §"CGT Calculation and Payment"** (lines 78-83) and the metaTitle both year-stamp as "2026" but the body §"CGT Calculation and Payment" then references *"annual exempt amount for 2025/26 is £3,000"* — figure correct numerically (per §5 LOCKED) but year-stamp obsolete for a 2026 page.
- **FAQ #2** asserts: *"No, the 60-day property disposal reporting must be done online through HMRC's digital service. Paper forms are not accepted for this reporting requirement."* Per the ATT users' guide (verified live 2026-05-24, last updated 7 January 2026), HMRC does in fact accept paper returns for the small subset of taxpayers who are digitally excluded (unrepresented taxpayers without Government Gateway credentials who request paper PPDCGT forms). The FAQ as written is too absolute — the canonical handles this nuance better but the legacy FAQ misleads digitally-excluded sellers about their route.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug how-to-report-property-sale-hmrc-60-days --days 90`.**

**Aggregate: 0 impressions / 0 clicks / 0 queries in 90-day window.** Page is functionally invisible to Google for the 60-day-CGT-reporting query cluster.

**GA4 engagement signal (REAL data from `ga4_page_data`):** 12 sessions / 10 active users / 4 engaged sessions / engagement rate 34.2% / bounce rate 65.8% / average session duration 20.6 seconds / 0 conversions. The 12 sessions are **higher than the Batch 1 Sub-bucket B B1-B1 baseline** (2 sessions / 2 bounced), which suggests this page has slightly more internal-link traffic than B1-B1 — likely from the legacy 60-day-CGT cluster cross-references. The 20.6s average duration with 65.8% bounce rate paints the same pattern as B1-B1: short skim-and-leave behaviour consistent with users who clicked an internal link expecting deeper coverage and exited within seconds. None of the GA4 traffic converted.

**Comparison with the redirect target `cgt-payment-deadlines-property-sales-2026` (real GSC data, same 90-day window, pulled at the same time):**

| Metric | This page (B2-A1) | Redirect target |
|---|---|---|
| Total impressions | 0 | ~262 |
| Total clicks | 0 | 0 |
| Distinct queries | 0 | 20 |
| Top query | (none) | "hmrc cgt reporting deadlines 2026" (85 imp / pos 10.81) |
| Number of queries at top-3 positions | 0 | 9 |
| GA4 sessions | 12 (8 bounced, 4 engaged at 20.6s avg) | 2 (1 engaged) |

**Pattern analysis:** the redirect target captures the queries this page never reached. Google has already resolved the cannibalisation by deduplicating this page out of the 60-day-CGT-reporting result set entirely. The 12 GA4 sessions are entirely internal-link traffic (no organic referral signal in GSC); redirecting consolidates the (zero) search equity into the canonical without disturbing the queries that already work. The slightly higher GA4 session count vs B1-B1 indicates this page is reached more often via internal cross-references, which is an internal-link-survey task at execution (more aggressive grep needed for internal links to update, see Load-bearing fix step 4).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL.** This page, intra-pair B2-A2 (`report-property-sale-hmrc-60-days-guide`), and the rewritten canonical (`cgt-payment-deadlines-property-sales-2026`) all chase the same 60-day-CGT-reporting query space. Google has already resolved the cannibalisation in our favour by selecting the canonical (262 imp at pos 1-11) as the cluster representative; this page and B2-A2 are being deduplicated out of the result set entirely (0 imp each). Continuing to host both legacy slugs perpetuates the issue and risks a future Google re-pivot to one of the weaker pages — particularly as the legacy pages contain factual drift (penalty framing, company tax rate, year-stamp) that the canonical resolves correctly.

**Secondary: INVISIBLE (per F-6 / F-11 gap-mode discovery).** Zero GSC impressions in 90 days is the same pattern as the airbnb trial T1, all 3 Batch 1 Sub-bucket A pages, and Batch 1 B1-B1. INVISIBLE pages cannot be tuned to specific queries; their improvement lever is either (a) foundational rewrite to bid for new query space, or (b) consolidation into a stronger sibling. Here the stronger sibling already exists — consolidate. **Note:** the 12 GA4 sessions (vs B1-B1's 2) means this page has a slightly bigger internal-link footprint to clean up at execution.

**Tertiary: STALE_FACTUAL (HIGH severity but resolved by REDIRECT not REWRITE).** Four discrete factual drift issues catalogued in Section 4 above: (1) FAQ #1 penalty schedule conflation, (2) body §"Penalties for Late Reporting" same conflation, (3) §"Company Ownership" wrong corporation tax £250k threshold framing, (4) AEA year-stamp 2025/26 on a 2026 page. None require body fixing because the page is going away; flagged as discovery items below to confirm the canonical handles each correctly.

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/how-to-report-property-sale-hmrc-60-days` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` in `Property/web/src/middleware.ts`.
2. **Delete (or move to `_redirected/`) the source markdown** at execution time. Next.js build will not error since middleware handles the path.
3. **Update or insert `monitored_pages` Supabase row** (if exists for this slug) to mark `redirect_date` + `redirect_target_slug` for the 90-day post-redirect regression detector. If no row exists, insert with `tracking_type = redirect_post` so the detector watches the canonical's signal for any drop attributable to the consolidation.
4. **Internal-link survey at this slug — more aggressive than B1-B1's at the canonical commit.** This page has 12 GA4 sessions in 90 days (vs B1-B1's 2), which means the internal-link footprint is non-trivial. Grep `Property/web/content/blog/*.md` and `Property/web/src/**/*.tsx` for `how-to-report-property-sale-hmrc-60-days` and update each occurrence to the canonical slug. Likely candidates based on cluster topology: PRR pillar, CGT pillar, complete property investment tax guide, property accountant services page, and any 60-day-CGT cluster internal cross-references.
5. **Bundle with B2-A2** (`report-property-sale-hmrc-60-days-guide`) redirect as one commit so the canonical absorbs equity from both slugs in a single deployment. B2-A3 (different canonical) gets a separate commit per the Sub-bucket A return summary.

**No body rewrite, no FAQ expansion, no metaTitle test.** All of those efforts at the canonical, not here.

---

## Competitor URLs (Stage 2 — same query cluster as Batch 1 Sub-bucket B; reusing verified-2026-05-23 sweep)

| URL | Status | Word count | FAQs | Statute cites | Notes |
|---|---|---|---|---|---|
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | **200 OK + content verified 2026-05-24** (re-verified at Batch 2 brief drafting via fresh WebFetch). Last updated 7 January 2026. | ~8,500-9,000 | 0 (embedded throughout) | Finance Act 2019 Sch 2 (primary), Finance Bill 2021-22 (30→60 day extension for completion dates on/after 27 October 2021), TCGA 1992 references | **Authoritative best-in-class** for the 60-day cluster. 13 H2 sections including agent authorisation (digital handshake step-by-step), reporting without an agent, amendments, SA interaction, trusts, estates, non-residents, practical points. F-14 discovery from Batch 1 Sub-bucket B already flagged this as the depth-target for any future canonical-level depth-up rewrite (separate from this redirect work). |
| https://www.protax.org.uk/articles/capital-gains-tax-property-60-day-rule/ | Verified 200 OK at Batch 1 Sub-bucket B brief drafting 2026-05-23 (competitor SERPs row pos 1 for `hmrc cgt reporting deadlines 2026`). Re-verification at Batch 2 brief drafting blocked by WebFetch permission denial on this URL — flagged for manager spot-check at quality-gate close; status unchanged from Batch 1. | not re-measured | — | — | SERP pos-1 holder; modest depth (per Batch 1 brief context); not a depth comparator for the canonical. |
| https://www.ross-brooke.co.uk/what-we-do/capital-gains-tax/capital-gains-tax-reporting-residential-sales/ | Verified 200 OK at Batch 1 Sub-bucket B brief drafting 2026-05-23 (competitor SERPs row pos 2). Re-verification at Batch 2 brief drafting blocked by WebFetch permission denial — flagged for manager spot-check; status unchanged from Batch 1. | not re-measured | — | — | SERP pos-2 holder; modest depth; not a depth comparator. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax | **200 OK + content verified 2026-05-24** (fresh WebFetch at Batch 2 brief drafting). Confirms gov.uk service-page structure — the overview page is shallow on the 60-day deadline detail itself (deadline + penalty information lives on the linked sub-pages "Tell HMRC about Capital Gains Tax on UK property or land" and "If you have other capital gains to report"). Confirms non-resident reporting language: *"You must report all sales of property or land in the UK"* for non-residents. | shallow on this page (overview only) | 0 | None on overview | The deadline + penalty detail lives on the sub-pages; the overview page is hub-navigation. Useful as the authoritative landing-page reference for the canonical's external link, not as a depth comparator. |

**Competitor depth context:** unchanged from Batch 1 Sub-bucket B's analysis — ATT at ~8,500-9,000 words is the upper bound; SERP-leader rayneressex.com (noted as pos 1 alternate in Batch 1 B1-B2 brief) is ~320 words; the canonical at ~2,500 words is mid-depth and defensible at current pos 11.7. F-14 carries the depth-up question forward; this brief does not touch it.

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE. Listed above for context on what the redirect target's depth ceiling would be if a future rewrite targets it. **WebFetch permission denials on the 2 SERP-leader competitor URLs (protax + ross-brooke) at this batch drafting — Batch 1 verification stands; flag for manager 5% sample re-check at quality-gate close.**

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM for Batch 2 prep — see §0 entry).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | how-to-report-property-sale-hmrc-60-days | REDIRECT-PROPOSED (this brief) | redirect to canonical |
| Residual (intra) | report-property-sale-hmrc-60-days-guide (B2-A2) | REDIRECT-PROPOSED (B2-A2 brief, same sub-agent) | redirect to same canonical |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | **CANONICAL** | absorbs redirects from B2-A1, B2-A2 (and absorbed B1-B1, B1-B2, B1-B3 from Batch 1) |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | Unaffected — pillar covers comprehensive policy; deadlines page is its child. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics sibling | Unaffected — different cluster anchor (mechanics vs deadlines). |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | Unaffected — different cluster anchor (calculation steps vs deadlines). |
| Excluded (rewritten 2026-05-21) | cgt-selling-buy-to-let-property-calculation-guide (Session B #14) | BTL CGT calculation canonical | Unaffected — different cluster (BTL CGT calculation vs 60-day reporting). This is the redirect target for sibling B2-A3 in this Sub-bucket A, not for B2-A1 / B2-A2. |
| Trial (gold reference) | cgt-rates-property-2026-27-current-rates-explained (T4) | Rates+planning sibling | Unaffected — different cluster (rates vs deadlines). |
| Already redirected in Batch 1 | 60-day-cgt-reporting-property-sales-complete-guide (B1-B1) | REDIRECT-PROPOSED (Batch 1) | Same canonical — already in cluster collapse |
| Already redirected in Batch 1 | 60-day-cgt-reporting-property-sales-rule (B1-B2) | REDIRECT-PROPOSED (Batch 1) | Same canonical — already in cluster collapse |
| Already redirected in Batch 1 | cgt-reporting-deadlines-property-2026 (B1-B3) | REDIRECT-PROPOSED (Batch 1) | Same canonical — already in cluster collapse |
| Wave 5 (shipped 2026-05-23) | — | — | No collisions — Wave 5's VAT / Devolved / Form 17 buckets are orthogonal to CGT-deadlines cluster. |
| Wave 6 (shipped 2026-05-24) | — | — | No collisions — Wave 6 buckets (LtdCo extraction / Trusts / Capital allowances) are orthogonal to CGT-deadlines cluster. |
| Wave 7 (in prep) | — | — | No collisions — Wave 7 buckets are RRA/EPC/BSA + HMRC enquiry ops + TRS/trust depth. None touch 60-day CGT reporting. |

**Conclusion:** REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026`. No FLAG-MANAGER. Combined with Batch 1's 3 redirects + B2-A2 in this batch, this would complete a **5-way cluster collapse** to one canonical, which is the full F-16 cluster resolution. After this batch closes the 60-day-CGT reporting cluster is fully cannibalisation-clean (one canonical, five legacy redirects, zero residual slugs in the cluster).

---

## Closest existing pages (Stage 2)

After redirect, the survivor sibling map for the 60-day-CGT-reporting topic on `propertytaxpartners.co.uk`:

- **Canonical (this redirect's target):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **Parent pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **Disposal mechanics sibling:** `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances`
- **Calculation walkthrough sibling:** `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step`
- **BTL CGT calculation canonical (for sibling B2-A3 redirect):** `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide`
- **AEA depth sibling:** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27`
- **Rates + planning sibling:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (trial gold reference; CTR-FAIL parked for execution)
- **Gifting reliefs sibling:** `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk`
- **PRR sibling:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (residual; B2-B1 REWRITE in flight at this batch — coordinate at execution timing)

Post-redirect the cluster is well-shaped: one deadline canonical (now absorbing 5 redirected legacy slugs), six topical siblings (one of which is the BTL CGT calculation canonical absorbing B2-A3 separately), one parent pillar. No further cluster surgery needed in this batch for the 60-day-reporting space.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs the 60-day rule itself (line 113 of `house_positions.md`: *"UK residents must file a CGT-on-UK-property return AND pay the tax within 60 days of completion where CGT is due"*). The redirect target asserts this correctly; this page's FAQ #1 + body §"Penalties for Late Reporting" carry the wrong penalty-schedule framing that conflates late-payment surcharge with late-filing fixed penalties. §5's "Do not write" list explicitly forbids: *"60-day applies to all UK residents' disposals regardless of tax due (only where tax is due)"* — this page's body §"Who Must Report a Property Sale to HMRC" technically positions correctly for UK residents but the surrounding penalty paragraph misleads.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22, verified gov.uk]: §17.4 NRCGT 60-day return applies to **every** non-resident UK land disposal regardless of whether tax is due. The legacy page covers this in body §"Trusts and Non-Residents" *"Non-residents use the same online service but must report all disposals, even if no tax is due"* — this part is correct per §17.4. The asymmetry is handled adequately in the body but the FAQ structure undersells the dual-clock complexity.
- **§19 MTD for ITSA** [LOCKED 2026-05-22]: §19.15 confirms the CGT 60-day return runs in parallel with MTD cessation reporting (separate obligations). Not in scope here directly but for the canonical's sibling-link routing.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY at execution per §16.22 Bill-vs-enacted drift]: NOT applicable to this brief — the April 2027 surcharge is on rental income, not CGT. CGT rates stay at 18%/24% (§5). No hedge needed in the redirect brief.
- **§21 LtdCo + corporation tax mechanics**: relevant to flag because the source page's body §"Company Ownership" carries a stale/wrong corporation-tax-rate framing (suggests "19% for profits up to £250k" without marginal relief explanation). Not a primary §5 or §17 issue but a §21 drift — flagged below as a discovery item rather than back-patched at the legacy page (which is going away).

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts in source (HIGH severity, but all resolved by REDIRECT not REWRITE):**

1. **FAQ #1 penalty schedule** (line 17 of source) conflates late-filing fixed penalties with late-payment surcharge percentages, asserting *"5% of the tax due (minimum £300)"* as the initial penalty when the actual initial late-filing penalty is £100. The redirect to the canonical resolves this (canonical uses correct dual-table format from body §"Penalties for late filing and late payment").
2. **Body §"Penalties for Late Reporting"** (lines 153-161) repeats the FAQ #1 conflation in body form. Resolved by redirect.
3. **Body §"Company Ownership"** (line 145) misstates the corporation tax small-profits threshold as *"19% for profits up to £250k and 25% for profits above this threshold"* — the actual structure is 19% to £50k, 25% from £250k, marginal relief between. Not a §5 issue per se (CGT-not-CT page); a §21 / corporation-tax drift. Resolved by redirect (canonical doesn't carry company-ownership detail in this misleading form).
4. **AEA year-stamp** (line 85 of source) *"annual exempt amount for 2025/26 is £3,000"* — figure correct numerically per §5 LOCKED, year-stamp obsolete for a "Complete Guide 2026" page. Resolved by redirect (canonical uses 2026/27 framing throughout).
5. **FAQ #2 absolute "no paper forms"** assertion (line 19) conflicts with the ATT guide's noted paper-PPDCGT route for digitally-excluded sellers. Resolved by redirect (canonical handles "Trustees, personal representatives and non-UK residents have variations" in FAQ #5 implicitly covering digital alternatives, though the canonical does not explicitly walk paper PPDCGT either — see D-11 discovery below).

These conflicts are noted not as patch tasks for this slug (the slug is going away) but as **discovery flags** for the manager to consider whether the canonical's framing also drifts. Spot-check of the canonical (from `cgt-payment-deadlines-property-sales-2026.md` body read 2026-05-24) confirms it handles #1, #2, #4 correctly. #3 doesn't appear at the canonical (canonical doesn't carry the company-ownership angle in body), and #5 is partially covered but not exhaustively — flagged as D-11 in discovery log below as a minor depth opportunity for any future canonical depth-up rewrite (separate workstream).

**Critical drift catch carried from Batch 1 Sub-bucket B (already RESOLVED at canonical):** F-13 was raised at Batch 1 Sub-bucket B 2026-05-23 22:00Z against the canonical's hallucinated *"Schedule 2 to the Finance Act 2019 (now within sections 222 to 233 of the Finance Act 2019, as amended)"* citation. **RESOLVED 2026-05-24 00:15Z by manager** (commit `a103a04`) — canonical now reads the correct "(paragraph 3 sets the reporting and payment obligation, extended from 30 to 60 days by the Finance Act 2022)" per `track2_site_wide_flags.md` resolution log line 71. Re-verified at Batch 2 brief drafting: WebFetch 2026-05-24 of https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 confirms Schedule 2 to FA 2019 is titled "Returns for disposals of UK land etc"; paragraph 3 sets the 60-day deadline; FA 2022 c.3 s.23(2) inserted the 30→60 extension with effect 24 February 2022. Canonical's back-patched language is verbatim-accurate. No further canonical fix needed for this brief.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification 2026-05-24)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | **200 OK + content verified 2026-05-24.** Title "Returns for disposals of UK land etc". Paragraph 3: 60-day deadline post-FA 2022 amendment c.3 s.23(2) effective 24 February 2022. | The correct statutory citation for the 60-day return. Used by the canonical's back-patched language (F-13 resolution). Not directly needed in this redirect brief. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax | **200 OK + content verified 2026-05-24.** Service-page overview (deadline + penalty detail lives on the sub-pages "Tell HMRC about Capital Gains Tax on UK property or land if you're not a UK resident" + "If you have other capital gains to report"). Confirms non-resident language *"You must report all sales of property or land in the UK"*. | Referenced from canonical's body §"What the 60-day return contains" as the authoritative landing-page link. Not directly needed in this redirect brief. |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | **200 OK + content verified 2026-05-24.** Last updated 7 January 2026. ~8,500-9,000 words, 13 H2 sections. Cites FA 2019 Sch 2 + Finance Bill 2021-22 (30→60 extension) + TCGA 1992. | ATT users' guide — best-in-class authority comparator. Cited in F-14 discovery for canonical depth-target question. |
| https://www.legislation.gov.uk/ukpga/1970/9/section/43 | **200 OK + content verified 2026-05-24.** Operative wording: *"no claim for relief in respect of income tax or capital gains tax may be made more than 4 years after the end of the year of assessment to which it relates."* Most recent amendment 20 March 2025. | TMA 1970 s.43 4-year claim deadline — cited per launch prompt directive (Decision #2 PARTIALLY RESOLVED via wave6 flags addendum, awaiting Wave 7+ house-position lock at proposed §5.X). Not directly needed in this redirect brief itself (no body authored); flagged for canonical depth-up consideration via D-10 below. |

**(Execution session for the redirect commit doesn't need to cite any of these in body — there is no body. Listed for completeness against the §4 brief template + per launch prompt §7 directive to cite TMA 1970 s.43 directly from legislation.gov.uk for any brief touching the 4-year capital loss claim deadline.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules, lead-gen architecture, CSS in markdown, FAQs and schema, anti-templating discipline, quality bar, statute citation discipline, and the full §16 lessons inherit from `NETNEW_PROGRAM.md` + `competitor_rewrite_playbook.md`. For this REDIRECT-PROPOSED brief specifically, the only universal rules that apply at execution are:

- **§16.14** absolute-path tracker edits — applies to the execution-time `monitored_pages` row update + tracker mark-done.
- **§16.31** URL liveness — applied at brief-drafting time (4 verified at Batch 2 brief drafting via WebFetch 2026-05-24; 2 SERP-competitor URLs from Batch 1 carrying-forward, flagged for manager 5% sample re-check at quality-gate close).
- **§16.18** reasoning-first selection — applied at the cannibalisation decision (semantic comparison vs the canonical's GSC dominance, not Jaccard).
- **§16.36** statute citation cross-check gate — applied to F-13 resolution verification at canonical (verified back-patched language matches legislation.gov.uk fresh fetch).
- **§16.42** EXISTING_PAGE_STALE density at adjacent residual pages — three discovery items raised below per the Wave 6 close lesson pattern that residual CGT pages will surface STALE flags while being read for cannibalisation differentiation.
- **§16.44** WebFetch summarizer table-content trust — not applicable to this brief (no HTML tables in question; statute content is text not tabular).
- **No em-dash discipline** — not applicable; no body content authored here.
- **Quality bar §4.3 six-check** — applied to this brief itself (FAQ/schema/em-dash count = N/A; metaTitle ≤ 62 chars = N/A; internal-link resolution = N/A; the only checks that matter are "no redirect loops at the canonical" and "no broken internal links to this slug after deletion", both verified at execution time per workflow step 6).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the Wave 5 workflow with Track 2 deltas at steps 9 / 12 / 13. For a REDIRECT-PROPOSED brief, the execution-time workflow collapses to a short sequence (instead of the full 19 steps), following the Batch 1 Sub-bucket B compressed-REDIRECT template (per F-17 methodology refinement):

**REDIRECT execution workflow (compressed):**

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed). Tracker edits to main repo file via absolute paths only.
3. Verify the canonical (`cgt-payment-deadlines-property-sales-2026`) still exists and is the right redirect target. Confirm F-13 back-patched language still present (manager already verified 2026-05-24 00:15Z; re-check at execution).
4. Add 301 redirect in `Property/web/src/middleware.ts`: `/blog/capital-gains-tax/how-to-report-property-sale-hmrc-60-days` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
5. Delete (or move to `_redirected/`) the source markdown at `Property/web/content/blog/how-to-report-property-sale-hmrc-60-days.md`.
6. **Grep for internal links** pointing to this slug across `Property/web/content/blog/*.md` and `Property/web/src/**/*.tsx`. **Expect non-trivial hit count** (12 GA4 sessions in 90d implies internal-link traffic is non-zero). Update each survivor to the canonical slug. Common targets to check: PRR pillar, CGT pillar, complete property investment tax guide, property accountant services page, 60-day-CGT cluster cross-references.
7. Build site (`cd Property/web && npm run build`). Must pass. Confirm sitemap regenerates without the old slug.
8. Insert a `monitored_pages` row with `tracking_type = redirect_post`, `redirect_date = today`, `redirect_source_slug = how-to-report-property-sale-hmrc-60-days`, `redirect_target_slug = cgt-payment-deadlines-property-sales-2026`, 90-day window. (If a row already exists for this slug, update in place.)
9. **Commit (bundled with B2-A2 redirect)** on `main`: `git commit -m "Track 2A: redirect 2 legacy 60-day-CGT pages to canonical (Batch 2 CANNIBAL cluster resolution)"`. B2-A3 (different canonical) gets a separate commit. Tracker edits to main repo file via absolute paths only.
10. Mark tracker ✅ executed for both B2-A1 and B2-A2 slugs.
11. Log any execution-time surprises to `track2_site_wide_flags.md`.

**Coordinate with the parallel B2-A2 redirect:** bundle B2-A1 + B2-A2 in one commit; bundle B2-A3 (different canonical target) in a separate commit. Both commits can land in the same Phase 3 batch deploy. This isolates the 60-day-CGT cluster collapse from the BTL-CGT cluster collapse so monitored_pages can disaggregate the two signals.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's F-13 back-patched language still present (`paragraph 3 sets the reporting and payment obligation, extended from 30 to 60 days by the Finance Act 2022`): __
- Canonical's published content still factually current (cross-check date + §5 rates + post-Wave-7 sweep for any new patches): __
- monitored_pages baseline for canonical pulled: __ imp / __ clicks / __ queries

### Redirect commit (bundled with B2-A2)

- Middleware rule landed (B2-A1): __
- Middleware rule landed (B2-A2): __
- Source markdown removed/moved (B2-A1): __
- Source markdown removed/moved (B2-A2): __
- Internal-link survivors patched B2-A1 (file:line list — expect non-trivial count given 12 GA4 sessions baseline): __
- Internal-link survivors patched B2-A2 (file:line list): __
- Build pass: __
- monitored_pages row inserted (B2-A1): __
- monitored_pages row inserted (B2-A2): __
- Commit hash (bundled): __

### Post-redirect monitoring (3-page consolidated cluster: B1-B1/B2/B3 already + B2-A1/A2)

- 30-day check: canonical's `hmrc cgt reporting deadlines 2026` impressions trended +/- against baseline 85 imp + Batch 1 post-redirect lift + Batch 2 post-redirect lift: __
- 60-day check: canonical's deadline-cluster total impressions trended vs pre-redirect baseline (~262 + Batch 1 absorbed ~5 + this brief expected 0 net absorbing): __
- 90-day check: monitored_pages detector firing or quiet: __

### Flags raised during execution

- F-13 (carried from Batch 1, RESOLVED 2026-05-24 by manager): re-verified still resolved at execution: __
- F-14 (canonical depth gap vs att.org.uk best-in-class): resolved / queued / unresolved: __
- D-9, D-10, D-11 (discoveries from this brief, see discovery log): actioned / queued / dismissed: __
- Any new flags: __

### 2-3 sentence summary

- (populated at execution time)
