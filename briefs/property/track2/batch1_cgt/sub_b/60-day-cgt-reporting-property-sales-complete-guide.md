# Track 2 brief: 60-day-cgt-reporting-property-sales-complete-guide

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket B (CGT disposal + reporting)
**Source markdown path:** `Property/web/content/blog/60-day-cgt-reporting-property-sales-complete-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-complete-guide
**Stage 1 priority:** L (zero GSC + 2 bounced GA4 sessions = invisible page; cannibalised by sibling slug variants and the rewritten canonical)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (the rewritten Session C #23 sibling, shipped 2026-05-21, which dominates the entire 60-day-CGT-reporting query cluster with ~262 impressions / 90 days vs this page's 0 impressions). Intra-pair partner `60-day-cgt-reporting-property-sales-rule` (B1-B2) also REDIRECT-PROPOSED to the same canonical. Three-way cluster collapse to one canonical.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-payment-deadlines-property-sales-2026`. This slug is structurally a duplicate of both B1-B2 (`60-day-cgt-reporting-property-sales-rule`) and the already-rewritten sibling. Three "60-day CGT reporting" pages on one CGT category folder is the textbook cannibalisation symptom.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against rewritten sibling and intra-pair B1-B2) + `INVISIBLE` (secondary — page has zero GSC signal in 90-day window per F-11 invisible-page pattern). Same INVISIBLE pattern documented in airbnb trial T1 and all 3 Sub-bucket A pages (F-11).
- **"Why this rewrite" angle:** there is no rewrite worth doing. The redirect target already exists, is newer (2026-05-21), is meaningfully more comprehensive (in-scope-seller table + 12 FAQs + worked timeline + dual penalty-clock table + aside CTAs), and dominates the impression share that the legacy page and its sibling B1-B2 are not capturing. Rewriting this page would re-create the cluster cannibalisation that Wave's 2026-05-21 rewrite pass intentionally resolved by writing the canonical at `cgt-payment-deadlines-property-sales-2026`. The right action is to consolidate the cluster: redirect this slug + B1-B2 to the canonical, leave the canonical as the sole sibling for the reporting/payment-deadline intent.

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map`:** no row — page has never been parsed by the competitor pipeline. (Pages without a `page_content_map` row tend to be those that the SERP-runner never selected, consistent with the zero-impression GSC profile.)

**Filesystem source read (`Property/web/content/blog/60-day-cgt-reporting-property-sales-complete-guide.md`):**
- Date: 2026-04-10 (no `dateModified` — never re-touched).
- Title: "What Is the 60 Day CGT Reporting Rule for Property Sales?"
- metaTitle: "60-Day CGT Reporting for Property: Full UK Guide" (53 chars)
- metaDescription: "Everything UK landlords need to know about the 60 day CGT reporting rule. Deadlines, penalties, exemptions and step-by-step reporting process." (146 chars)
- Body word count (eyeballed from source): ~2,000 words
- 12 H2 sections + 6 H3 sub-sections (`Who Must Follow…`, `Key Exemptions…`, `Mixed-Use Property Complications`, `What Must Be Reported and How to Calculate CGT`, `Required Supporting Information`, `Basic CGT Calculation Steps`, `Example: 60 Day CGT Calculation`, `The 60 Day Reporting Process Step-by-Step` with 4 step H3s, `Penalties for Missing the 60 Day Deadline`, `Reasonable Excuse Defence`, `Special Considerations for Different Property Types` with 3 H3s, `Non-Resident Landlord Complications`, `Common Mistakes to Avoid` with 3 H3s, `Getting Professional Help with 60 Day Reporting`, `Future Changes and Planning Considerations`, `Key Takeaways for Landlords`)
- Frontmatter `faqs:` array: 2 FAQs only (sparse).
- 1 worked example (Sarah, Birmingham £74k gain → £17,040 CGT). Uses 2025/26 framing — fine as far as it goes but the canonical uses 2026/27 framing.
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citations).
- Internal links: 4 (CGT pillar, BTL Ltd Co guide, PRR pillar, property accountant services).
- No schema-attached `reviewedBy` or `sourcesVerifiedAt`. Plain editorial framing.

**House-position drift visible in source:**
- FAQ #1 says: *"if you made neither a gain nor a loss on the property sale, you don't need to report within 60 days. However, if you made a capital loss, you should report it to carry forward against future gains. The 60-day requirement only applies when there's a gain to report."* This is **partially correct for UK residents but materially WRONG for non-UK residents** per house position §17.4 (LOCKED 2026-05-22). Non-UK residents must file the 60-day return for **every** UK land disposal regardless of whether tax is due (verified gov.uk 2026-05-22). The page does cover this elsewhere in the body, but the FAQ as written would mislead a non-resident reader.
- Body line 80: AEA stated as "£3,000 for 2025/26". Numerically still correct for 2026/27 (per §5 LOCKED) but the year-stamp is stale.
- Body penalty schedule omits the "5% of tax due at 6 and 12 months" tax-geared penalty layer (per §5 LOCKED penalty schedule). Lists only the fixed £100 / £300 / £300 + 5%-at-12-months figures.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug 60-day-cgt-reporting-property-sales-complete-guide --days 90`.**

**Aggregate: 0 impressions / 0 clicks / 0 queries in 90-day window.** Page is functionally invisible to Google for the 60-day-CGT-reporting query cluster.

**GA4 engagement signal:** 2 sessions / 2 active users / 0 engaged sessions / 0.0s average session duration / bounce rate 100% / 0 conversions. The 2 sessions are likely internal-link traffic from the BTL Ltd Co guide that links back to this page; users bounce immediately.

**Comparison with the redirect target `cgt-payment-deadlines-property-sales-2026` (real GSC data, same 90-day window, pulled at the same time):**

| Metric | This page (B1-B1) | Redirect target |
|---|---|---|
| Total impressions | 0 | ~262 |
| Total clicks | 0 | 0 |
| Distinct queries | 0 | 20 |
| Top query | (none) | "hmrc cgt reporting deadlines 2026" (85 imp / pos 10.81) |
| Number of queries at top-3 positions | 0 | 9 |
| GA4 sessions | 2 (bounced) | 2 (1 engaged) |

**Pattern analysis:** the redirect target captures the queries this page never reached. Across the full SERP, Google has selected the canonical (`cgt-payment-deadlines-property-sales-2026`) as the deadline-cluster representative; this page and its B1-B2 sibling are being deduplicated out of the result set. Redirecting this slug consolidates the (negligible) link equity into the canonical without disturbing the queries that already work.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL.** Three pages with overlapping intent (`60-day-cgt-reporting-property-sales-complete-guide`, `60-day-cgt-reporting-property-sales-rule`, `cgt-payment-deadlines-property-sales-2026`) target the same query space. Google has resolved the cannibalisation in our favour by selecting the third (rewritten 2026-05-21) as the canonical. Continuing to host the legacy two slugs perpetuates the issue and risks a future Google re-pivot to one of the weaker pages.

**Secondary: INVISIBLE (per F-6 / F-11 gap-mode discovery).** Zero GSC impressions in 90 days is the same pattern as the airbnb trial T1 and all 3 Sub-bucket A pages. INVISIBLE pages cannot be tuned to specific queries; their improvement lever is either (a) foundational rewrite to bid for new query space, or (b) consolidation into a stronger sibling. Here the stronger sibling already exists — consolidate.

**Tertiary: STALE_FACTUAL (minor).** FAQ #1's loss-reporting framing is wrong for non-residents per §17.4. AEA year-stamp 2025/26 (still numerically correct for 2026/27 but year-stamp obsolete). Penalty schedule incomplete (omits the tax-geared 5%-at-6-months layer per §5).

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-complete-guide` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` in `Property/web/src/middleware.ts`.
2. **Delete source markdown** at execution time (move to `_redirected/` or just remove — Next.js build will not error since middleware handles the path).
3. **Update `monitored_pages` Supabase row** (if exists for this slug) to mark `redirect_date` + `redirect_target_slug` for the 90-day post-redirect regression detector. If no row exists, insert one with `tracking_type = redirect_post` so the detector watches the canonical's signal for any drop attributable to the consolidation.
4. **Verify no internal links to this slug remain** anywhere in `Property/web/content/blog/*.md` or `Property/web/src/**/*.tsx`. Update any survivors to point to the canonical. (Cursory scan: most CGT-related internal-link patterns point to the pillar `capital-gains-tax-property-complete-guide-uk`, not to this slug, so the survivor count should be low.)

**No body rewrite, no FAQ expansion, no metaTitle test.** All of those efforts at the canonical, not here.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Notes |
|---|---|---|---|---|---|
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK | ~8,500-9,000 | 0 (embedded throughout) | Schedule 2 of Finance Act 2019 | **Authoritative best-in-class.** 12 major sections covering rules / HMRC guidance / agent authorisation / paper returns / unrepresented taxpayers / amendments / SA interaction / trusts / estates / non-residents / practical points. Last updated 7 January 2026. The canonical's depth target. |
| https://rayneressex.com/news/hmrc-confirms-cgt-uk-property-return-filing-requirements/ | 200 OK | ~320 | 0 | HMRC Agent Update Issue 95 | Thin newsroom article on the SA-vs-60-day filing exception. Niche; not comparator depth. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK | ~450 | 0 | None | The gov.uk service page for non-residential / overseas reporting (sibling to the residential 60-day service page). |

**Competitor depth context:** the att.org.uk users' guide is 4-7× the canonical's word count. The canonical (`cgt-payment-deadlines-property-sales-2026`) at ~2,500 words is materially shallower than the best-in-class authority. This raises a future-batch question about whether the canonical itself merits a depth-up rewrite, separate from the immediate redirect decision. Flagged to manager as **discovery F-14** below; out-of-scope for this brief.

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE. Listed above for context on what the redirect target's depth ceiling would be if a future rewrite targets it.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-23 PM post-Wave-5 merge).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | 60-day-cgt-reporting-property-sales-complete-guide | REDIRECT-PROPOSED (this brief) | redirect to canonical |
| Residual (intra) | 60-day-cgt-reporting-property-sales-rule (B1-B2) | REDIRECT-PROPOSED (B1-B2 brief) | redirect to same canonical |
| Residual (intra) | cgt-reporting-deadlines-property-2026 (B1-B3) | REDIRECT-PROPOSED (B1-B3 brief) | redirect to same canonical |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | **CANONICAL** | absorbs redirects from B1-B1, B1-B2, B1-B3 |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | Unaffected — pillar covers comprehensive policy; deadlines page is its child. Forward-link from canonical already exists. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics sibling | Unaffected — different cluster anchor (mechanics vs deadlines). |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | Unaffected — different cluster anchor (calculation steps vs deadlines). |
| Trial (gold reference) | cgt-rates-property-2026-27-current-rates-explained (T4) | Rates+planning sibling | Unaffected — different cluster (rates vs deadlines). |
| Residual (related) | how-to-report-property-sale-hmrc-60-days | likely future REDIRECT to same canonical | Out of scope for Batch 1 (not in B-bucket); flagged for future batch. |
| Residual (related) | report-property-sale-hmrc-60-days-guide | likely future REDIRECT to same canonical | Same as above. |
| Wave 5 (shipped) | — | — | No collisions — Wave 5's VAT / Devolved / Form 17 buckets are orthogonal to CGT-deadlines cluster. |
| Wave 6 (in-flight) | — | — | No collisions — Wave 6 buckets (LtdCo extraction / Trusts / Capital allowances) are orthogonal to CGT-deadlines cluster. |

**Conclusion:** REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026`. No FLAG-MANAGER. Cluster resolution requires three concurrent redirects (B1-B1, B1-B2, B1-B3) handled as a single execution-time commit so the canonical doesn't briefly have a redirect-loop or split-equity intermediate state.

---

## Closest existing pages (Stage 2)

After redirect, the survivor sibling map for the 60-day-CGT-reporting topic on `propertytaxpartners.co.uk`:

- **Canonical (this redirect's target):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **Parent pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (existing back-link from canonical; reciprocal forward-link from canonical already present per Session C #47 brief)
- **Disposal mechanics sibling:** `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances` (orthogonal — disposal mechanics, references deadlines briefly with forward-link to canonical)
- **Calculation walkthrough sibling:** `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` (orthogonal — calculation steps, references deadlines briefly)
- **AEA depth sibling:** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27` (orthogonal — AEA-specific)
- **Rates + planning sibling:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (orthogonal — rates-and-planning, has §"Record Keeping, Returns and Deadlines" that forward-links to canonical per gold-reference brief)
- **Gifting reliefs sibling:** `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` (orthogonal — gifting reliefs)
- **PRR sibling:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (residual, future REWRITE candidate)

Post-redirect the cluster is well-shaped: one deadline canonical, six topical siblings, one parent pillar. No further cluster surgery needed in this batch.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs the 60-day rule itself (line 113 of `house_positions.md`: *"UK residents must file a CGT-on-UK-property return AND pay the tax within 60 days of completion where CGT is due"*). The redirect target asserts this correctly; this page's FAQ #1 framing has a partial-truth issue (correct for UK residents, wrong for non-residents). §5's "Do not write" list explicitly forbids: *"60-day applies to all UK residents' disposals regardless of tax due (only where tax is due)"*. The legacy page is technically on-position for UK residents but the FAQ wording reads as a universal rule.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22, verified gov.uk]: §17.4 NRCGT 60-day return applies to **every** non-resident UK land disposal regardless of whether tax is due. The legacy page covers this in body §"Non-Resident Landlord Complications" but the FAQ-level summary undermines it. The redirect target covers this asymmetry explicitly in its first H2 table and FAQ #1 — another reason to consolidate.
- **§19 MTD for ITSA** [LOCKED 2026-05-22]: §19.15 confirms the CGT 60-day return runs in parallel with MTD cessation reporting (separate obligations). Not in scope here directly but for the canonical's sibling-link routing.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY at execution per §16.22 Bill-vs-enacted drift]: NOT applicable to this brief — the April 2027 surcharge is on rental income, not CGT. CGT rates stay at 18%/24% (§5). No hedge needed in the redirect brief.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts in source (low severity, since the recommendation is REDIRECT not REWRITE):**

1. **FAQ #1 wording** (line 17 of source) treats "no need to report if loss" as a universal rule, missing the non-resident asymmetry per §17.4. The redirect to the canonical resolves this (canonical handles it explicitly).
2. **AEA year-stamp** (line 80 of source) "£3,000 for 2025/26" — figure correct, year-stamp obsolete; resolved by redirect.
3. **Penalty schedule** (lines 134-142 of source) omits the tax-geared 5%-at-6-months layer per §5; resolved by redirect.

These conflicts are noted not as Phase 2 patch tasks for this slug (the slug is going away) but as **discovery flags** for the manager to consider whether the canonical's framing also drifts on any of these points. Spot-check of the canonical (from the source read above) confirms it handles #1, #3 correctly, and uses 2026/27 framing for #2. **No back-patch needed at the canonical for these three points.**

**Separate critical drift catch — at the canonical, NOT at this page (logged as F-13 in `track2_site_wide_flags.md`):** the canonical at `cgt-payment-deadlines-property-sales-2026` cites *"the statutory framework sits in Schedule 2 to the Finance Act 2019 (now within sections 222 to 233 of the Finance Act 2019, as amended)"*. Per WebFetch verification of `https://www.legislation.gov.uk/ukpga/2019/1/schedule/2` at brief-drafting time, Schedule 2 to FA 2019 is titled "Returns for disposals of UK land etc" and remains the operative provision (60-day extension via FA 2022). FA 2019 has roughly 94 sections; there are no "sections 222 to 233" in FA 2019 and UK statute drafting does not renumber schedules into the body of an Act. The canonical's parenthetical citation reads as hallucinated. **This is the 10th-consecutive-Bill-vs-enacted-Act-pattern drift in the program** (F-6 §19.7, F-11 §20.7, F-12 + F-13 §20.10/§20.5, F-18 §15.4, F-19+F-20, F-5 cgt-rates, plus the Wave 6 Stage 2A catches). Flag F-13 raised so the manager can either back-patch the canonical or queue it for Phase 2.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | **200 OK + content verified 2026-05-23.** Title "Returns for disposals of UK land etc". Paragraph 3: *"on or before the 60th day following the day of the completion of the disposal"* (as amended by FA 2022). | The correct statutory citation for the 60-day return. Used by the canonical's back-patch if F-13 is actioned; not directly needed in this redirect brief. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK | gov.uk service page (covers the non-residential / overseas reporting via SA; sibling page handles residential 60-day). Referenced from canonical's body. |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK | ATT users' guide — best-in-class authority comparator. Cited in F-14 discovery for canonical depth-target question. |

**(Execution session for the redirect commit doesn't need to cite any of these in body — there is no body. Listed for completeness against the §4 brief template.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules, lead-gen architecture, CSS in markdown, FAQs and schema, anti-templating discipline, quality bar, statute citation discipline, and the full §16 lessons inherit from `NETNEW_PROGRAM.md` + `competitor_rewrite_playbook.md`. For this REDIRECT-PROPOSED brief specifically, the only universal rules that apply at execution are:

- **§16.14** absolute-path tracker edits — applies to the execution-time `monitored_pages` row update + tracker mark-done.
- **§16.31** URL liveness — applied at brief-drafting time (gov.uk + legislation.gov.uk + 3 competitor URLs WebFetched).
- **§16.18** reasoning-first selection — applied at the cannibalisation decision (semantic comparison vs the canonical's GSC dominance, not Jaccard).
- **No em-dash discipline** — not applicable; no body content authored here.
- **Quality bar §4.3 six-check** — applied to this brief itself (FAQ/schema/em-dash count = N/A; metaTitle ≤ 62 chars = N/A; internal-link resolution = N/A; the only check that matters is "no redirect loops at the canonical" which is verified by the cannib table above).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the Wave 5 workflow with Track 2 deltas at steps 9 / 12 / 13. For a REDIRECT-PROPOSED brief, the execution-time workflow collapses to a short sequence (instead of the full 19 steps):

**REDIRECT execution workflow (compressed from Wave 5's 19 steps for the REDIRECT case):**

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed).
3. Verify the canonical (`cgt-payment-deadlines-property-sales-2026`) still exists and is the right redirect target. (Re-check at execution: was it merged to main? did Wave 7 touch it?)
4. Add 301 redirect in `Property/web/src/middleware.ts`: `/blog/capital-gains-tax/60-day-cgt-reporting-property-sales-complete-guide` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
5. Delete (or move to `_redirected/`) the source markdown at `Property/web/content/blog/60-day-cgt-reporting-property-sales-complete-guide.md`.
6. Grep for any internal links pointing to this slug across `Property/web/content/blog/*.md` and `Property/web/src/**/*.tsx`. Update each to the canonical.
7. Build site (`cd Property/web && npm run build`). Must pass. Confirm sitemap regenerates without the old slug.
8. Insert a `monitored_pages` row with `tracking_type = redirect_post`, `redirect_date = today`, `redirect_source_slug = 60-day-cgt-reporting-property-sales-complete-guide`, `redirect_target_slug = cgt-payment-deadlines-property-sales-2026`, 90-day window. (If a row already exists for this slug, update in place.)
9. Commit on `main`: `git commit -m "Track 2A: redirect 60-day-cgt-reporting-property-sales-complete-guide to canonical (CANNIBAL resolution)"`. Tracker edits to main repo file via absolute paths only.
10. Mark tracker ✅ executed.
11. Log to `track2_site_wide_flags.md` if anything surfaced during execution (e.g., a stale internal link from an unexpected file).

**Coordinate with the parallel B1-B2 and B1-B3 redirects:** all three should land in one commit so the canonical absorbs the equity in a single deployment.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's published content still factually current (cross-check date + §5 rates): __
- F-13 statute-citation drift at canonical resolved (or still queued)? __

### Redirect commit

- Middleware rule landed: __
- Source markdown removed/moved: __
- Internal-link survivors patched (file:line list): __
- Build pass: __
- monitored_pages row inserted: __
- Commit hash: __

### Post-redirect monitoring

- 30-day check: canonical's `hmrc cgt reporting requirements 2026` impressions trended +/- against baseline 62 imp: __
- 60-day check: canonical's deadline-cluster total impressions trended vs Wave 5 pre-redirect baseline (~262): __
- 90-day check: monitored_pages detector firing or quiet: __

### Flags raised during execution

- F-13 (carried from brief, canonical's hallucinated FA 2019 citation): resolved / queued / unresolved: __
- F-14 (discovery, canonical depth gap vs att.org.uk best-in-class): resolved / queued / unresolved: __
- Any new flags: __

### 2-3 sentence summary

- (populated at execution time)
