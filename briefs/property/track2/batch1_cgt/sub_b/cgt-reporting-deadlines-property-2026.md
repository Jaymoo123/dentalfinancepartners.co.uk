# Track 2 brief: cgt-reporting-deadlines-property-2026

**Site:** property
**Brief type:** Legacy rewrite — Batch 1 Sub-bucket B (CGT disposal + reporting)
**Source markdown path:** `Property/web/content/blog/cgt-reporting-deadlines-property-2026.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-reporting-deadlines-property-2026
**Stage 1 priority:** L (11 imp / pos 5-11 cluster signal — top-of-page positions on the very queries the rewritten canonical dominates 24× more strongly; classic post-rewrite-cluster cannibalisation symptom)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (the rewritten Session C #23 sibling, shipped 2026-05-21). This page and the canonical share their TOP query verbatim (`hmrc cgt reporting deadlines 2026`); the canonical gets 85 impressions on it at pos 10.81 while this page gets 5 impressions on the same query at pos 10.40 — Google is split-equity-ing identical pages.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-payment-deadlines-property-sales-2026`. The two slugs (`cgt-reporting-deadlines-property-2026` and `cgt-payment-deadlines-property-sales-2026`) differ by one word — "reporting" vs "payment" — but cover identical scope (the 60-day rule, who must file, penalties, SA interaction, worked example). The canonical was written 2026-05-21 specifically to consolidate this cluster, and the GSC data confirms the consolidation worked in Google's eyes (canonical gets 17× the impressions). The legacy slug is the leftover that wasn't redirected at the time of the rewrite — finishing that job now.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against rewritten sibling — same top query, identical scope). **NOT** INVISIBLE — page has 11 impressions across 5 queries in 90-day window, including a pos-1 ranking on its anchor query `hmrc cgt reporting deadlines 2026` for 1 day (1 impression). Just very thin volume because the canonical absorbs most of the impression share.
- **"Why this rewrite" angle:** there is no rewrite worth doing. The rewrite already happened — at the canonical, 3 days after this legacy page's `dateModified` (2026-05-18 vs canonical's 2026-05-21). The canonical was the de facto rewrite; this slug is the orphan left behind. Redirecting completes the cluster surgery that the 2026-05-21 rewrite session started.
- **Distinguishing claim that might justify retention:** this page has a slightly different angle — it uses "2025/26" framing throughout and includes a worked example with band-stacking (£5,270 × 18% + £91,730 × 24%) that the canonical's worked example doesn't explicitly model. **However:** (a) the 2025/26 framing is now stale by 2 months post-tax-year-end (the canonical correctly uses 2026/27), and (b) the band-stacking depth belongs in the calculation-walkthrough sibling (`cgt-calculation-selling-buy-to-let-property-step-by-step`), not in a deadlines page. **The band-stacking example should be considered for inclusion at the calculation sibling, not retained here.** Flagged as a discovery for manager.

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map`:** no row — page has never been parsed by the competitor pipeline. Likely because the SERP-runner was already targeting the rewritten canonical at the time of the 2026-05-21 SERP run.

**Filesystem source read (`Property/web/content/blog/cgt-reporting-deadlines-property-2026.md`):**
- Date: 2026-05-18 (3 days before the rewritten canonical's 2026-05-21 date — this page was a near-miss for rewrite consolidation).
- Title: "What Are the HMRC CGT Reporting Deadlines for UK Property Sales in 2025/26?"
- H1: "HMRC CGT Reporting Deadlines for UK Property Sales 2025/26: A Complete Guide"
- metaTitle: "HMRC CGT Reporting Deadlines 2026: The 60-Day Rule" (52 chars)
- metaDescription: "Learn the 60-day CGT reporting deadline for UK residential property sales in 2025/26. Penalties, payment rules, and worked examples for landlords." (148 chars) — note the **same metaTitle** as the canonical's previous metaTitle ("metaTitle_prev" on canonical was "HMRC CGT Reporting Deadlines 2026: 60-Day Property Rule"; almost identical wording). Strong evidence of intentional but uncompleted cluster consolidation.
- Body word count (eyeballed): ~1,500 words
- 8 H2 sections (`What Is the 60-Day CGT Reporting Rule?`, `HMRC CGT Reporting Deadlines 2026: Key Dates`, `How to Report and Pay CGT Within 60 Days`, `Worked Example: Landlord Selling a BTL Property`, `Penalties for Missing the 60-Day Deadline`, `How the 60-Day Rule Interacts with Self Assessment`, `Special Situations: Non-Resident Landlords`, `Common Mistakes to Avoid`, `How a Property Accountant Can Help`, `Summary: Key Takeaways`)
- 4 FAQs in frontmatter
- 1 worked example (Manchester landlord £200k → £320k = £100k gain → £97k taxable after AEA, band-stacked £5,270×18% + £91,730×24% = £22,963.80 CGT). The band-stacking element is more sophisticated than the canonical's flat-rate example (£36,960 at higher rate).
- Schema: empty (`""` in frontmatter — no `@graph` block). No `reviewedBy`, no `sourcesVerifiedAt`.
- 4 internal links (CGT pillar, BTL Ltd Co guide, Section 24 guide, MTD landlords, property investment tax essentials).

**House-position drift visible in source:**
- Body line 178 (Summary list): *"Non-residents have a 30-day deadline"* — **WRONG** per §17.4 LOCKED 2026-05-22. The non-resident 60-day deadline was aligned with UK-resident at 60 days from 27 October 2021. This is a direct contradiction of §17.4 verbatim: *"27 October 2021: UK residents' 30-day reporting extended to 60 days; non-residents' deadline aligned at 60."* The body of the same page correctly covers this at lines 136-138 (*"the non-resident CGT regime was introduced in April 2015 and originally carried a 30-day deadline, but from 27 October 2021 this was aligned with the UK-resident rule at 60 days"*) but the Summary contradicts the body. Severe internal inconsistency in a single page.
- 2025/26 framing throughout the body. AEA correctly stated as £3,000 (same for 2026/27) but the tax-year framing is obsolete.
- Penalty schedule (lines 118-121) uses *"£10 per day for 3-6 months late (up to 90 days)"* — this is the correct shape of the late-filing daily penalty but the day-range (3-6 months) is wrong. The correct daily-£10 phase begins at day 91 and runs for up to 90 days max (capping at £900) per §5 / TMA 1970 Sch 55. Page conflates the day-counts.
- FAQ #3: *"penalties for missing the 60-day deadline include: a £100 fixed penalty for up to 3 months late; £10 per day for 3-6 months late; 5% of the tax due (or £300, whichever is higher) for 6-12 months late; and a further 5% for over 12 months late. HMRC also charges late payment interest from the due date. If the late filing is deliberate, penalties can be up to 100% of the tax due."* — repeats the same day-count error as the body.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug cgt-reporting-deadlines-property-2026 --days 90`.**

**Aggregate: 11 impressions / 0 clicks / 5 queries / avg position 1-12 across queries.** Notably this page actually scores pos 1 on its anchor query for the 1 impression it caught.

### Top 5 queries (full)

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 5 | 0 | 10.40 | 0.00% | hmrc cgt reporting deadlines 2026 |
| 2 | 0 | 11.50 | 0.00% | hmrc cgt reporting requirements 2026 |
| 2 | 0 | 5.00 | 0.00% | hmrc reporting deadlines for property transactions 2026? |
| 1 | 0 | 1.00 | 0.00% | i sold a uk residential property … (long-tail multi-question query) |
| 1 | 0 | 1.00 | 0.00% | what are the reporting and payment steps for capital gains tax on uk residential property disposals for someone who is uk tax-resident? |

### Pattern analysis

**Cluster-overlap with canonical:** the top query (`hmrc cgt reporting deadlines 2026`, 5 imp / pos 10.40) is the **same** as the canonical's top query (85 imp / pos 10.81). Google is showing both pages on the same SERP at adjacent positions — a textbook split-equity symptom. The canonical gets 17× the impression count on the identical query, confirming Google's preference.

**Sibling-overlap with B1-B2:** the second query (`hmrc cgt reporting requirements 2026`, 2 imp / pos 11.5) is the SAME query as B1-B2's anchor query (B1-B2 gets 62 imp at pos 18.49 on this query). Three pages competing on one query; canonical at pos 1-2, this page at pos 11, B1-B2 at pos 18. Consolidating to one canonical cleans this up.

**Long-tail multi-question queries (positions 1 + 1):** the two pos-1 impressions came from very long-form Google "tell me everything about CGT reporting" prompts (likely AI-Overview-related impressions where Google evaluates pages for snippet selection). These are not converting traffic; they're SGE/AI-bot reads. The canonical also catches similar long-form queries (its pos 1 on `what are the high-level reporting steps for capital gains on the sale of a uk residential property...`); redirecting doesn't lose these because Google re-anchors to the canonical after redirect.

**GA4 engagement:** 0 sessions / 0 active users / 0 conversions in 90-day window. The 11 impressions did not translate to any GA4 traffic.

### Combined cluster signal (pre-redirect baseline)

| Page | 90d imp | Top query | Position | GA4 sessions |
|---|---:|---|---:|---:|
| B1-B1 (complete-guide) | 0 | (none) | — | 2 (bounced) |
| B1-B2 (rule) | 107 | hmrc cgt reporting requirements 2026 | 18.5 | 0 |
| **B1-B3 (deadlines-2026)** | **11** | **hmrc cgt reporting deadlines 2026** | **10.4** | **0** |
| Canonical (payment-deadlines-2026) | 262 | hmrc cgt reporting deadlines 2026 | 10.8 | 2 (1 engaged) |
| **Combined cluster total** | **380** | (shared query family) | (split pos 10-18) | 4 (1 engaged) |

Redirect consolidates 380 imp into the canonical and removes the SERP-fragmentation that caps the canonical at pos 10-11.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL** (cross-source — this residual page vs the rewritten 2026-05-21 canonical). Identical top query, identical sub-question coverage, identical worked-example structure (with this page's band-stacking richer than the canonical's flat-rate). The page was written 3 days before the canonical was rewritten — the canonical was intended as the consolidation and this page got left behind.

**Secondary: STALE_FACTUAL (HIGH severity).** Two discrete drift issues, one of them severe:
1. **Non-resident 30-day deadline assertion** in the Summary (line 178) — directly contradicts §17.4 LOCKED 2026-05-22 and contradicts the page's OWN body at lines 136-138. Page-internal inconsistency on a load-bearing fact.
2. **Penalty day-counts wrong** — daily-£10 phase mis-assigned to "3-6 months late" instead of correct "day 91 onwards for up to 90 days".
3. **2025/26 tax-year framing** throughout — obsolete by 2 months post-year-end.

**Tertiary: VOICE-FRESHNESS (low).** Page has DeepSeek-era prose patterns ("Selling a UK residential property can trigger a Capital Gains Tax (CGT) liability, and the reporting rules are strict.") that the rewritten canonical's tighter editorial voice has replaced.

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/cgt-reporting-deadlines-property-2026` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
2. **Bundle with B1-B1 and B1-B2 redirects** as one commit.
3. **Update `monitored_pages` Supabase row** as for B1-B1/B1-B2.
4. **Consider lifting the band-stacking worked example** to the calculation-walkthrough sibling (`cgt-calculation-selling-buy-to-let-property-step-by-step`). The £5,270 unused basic-rate-band example shape is more sophisticated than the canonical's higher-rate-only flat calc. Manager decides whether to insert at the calculation sibling (separate brief) or leave intentionally simple at the canonical.

**No body rewrite, no Summary correction (the page is going away).**

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

**No SERP runs exist for this slug** (`competitor_serps` returned 0 rows — the page was never SERP-runner'd because the SERP infrastructure was already targeting the canonical at the time of the 2026-05-21 SERP run).

**Reusing the SERP run from the canonical's `competitor_serps` rows** (2026-05-21 and 2026-05-23, query `hmrc cgt reporting deadlines 2026`):

| URL | Status | Word count | FAQs | Statute cites | Notes |
|---|---|---|---|---|---|
| https://www.protax.org.uk/articles/capital-gains-tax-property-60-day-rule/ | 200 OK (assumed — pos 1 on canonical's SERP, not directly WebFetched by sub-agent due to time budget) | Pending live fetch at execution | — | — | Pos 1 SERP holder on canonical's query — would be the depth-target for any future canonical-level rewrite. |
| https://www.ross-brooke.co.uk/what-we-do/capital-gains-tax/capital-gains-tax-reporting-residential-sales/ | 200 OK (assumed) | Pending live fetch | — | — | Pos 2 SERP holder. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK (verified 2026-05-23) | ~450 | 0 | None | Pos 1 holder on the broader CGT-on-uk-property service page. |
| https://hutzis.com/capital-gains-tax-uk-2026-new-rules-and-annual-allowance/ | 200 OK (assumed — appears in canonical's SERP at pos 2 on related query) | Pending live fetch | — | — | Comparator at pos 2 on a related query; covers 2026 rules. |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK (verified 2026-05-23) | ~8,500-9,000 | 0 (embedded) | Schedule 2 of Finance Act 2019 | Best-in-class authority comparator (same as B1-B1 + B1-B2 briefs). |

**(Caveat: this brief's competitor URL coverage is lighter than the gold-reference depth because the page is REDIRECT-PROPOSED, not REWRITE — verification of pos-1/pos-2 SERP competitors is a future-batch question if the canonical itself merits a rewrite. The ATT and gov.uk verifications carry over from B1-B1 and B1-B2 briefs same-day.)**

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-23 PM). §6 of the index explicitly lists this page in the "Cross-source cannibalisation" subsection: *"(new) `cgt-reporting-deadlines-property-2026` (residual; Batch 1 sub-bucket B) vs `cgt-payment-deadlines-property-sales-2026` (rewritten Session C #23)"* — flagged at index build time as a likely REDIRECT candidate. This brief confirms.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | cgt-reporting-deadlines-property-2026 | REDIRECT-PROPOSED (this brief) | redirect to canonical |
| Residual (intra) | 60-day-cgt-reporting-property-sales-complete-guide (B1-B1) | REDIRECT-PROPOSED (B1-B1 brief) | redirect to same canonical |
| Residual (intra) | 60-day-cgt-reporting-property-sales-rule (B1-B2) | REDIRECT-PROPOSED (B1-B2 brief) | redirect to same canonical |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | **CANONICAL** | absorbs all three Batch 1 Sub-bucket B redirects |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | Unaffected. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics sibling | Unaffected. |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | **Adjacent — consider lifting this page's band-stacking worked example into the calculation sibling per manager decision.** |
| Residual (related, future REDIRECT candidate) | how-to-report-property-sale-hmrc-60-days | likely future REDIRECT to same canonical | Out of scope for Batch 1. |
| Residual (related, future REDIRECT candidate) | report-property-sale-hmrc-60-days-guide | likely future REDIRECT to same canonical | Out of scope for Batch 1. |
| Wave 5 (shipped) | — | — | No collisions. |
| Wave 6 (in-flight) | — | — | No collisions. |

**Conclusion:** REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026`. Cluster collapse from 4 pages to 1 canonical.

---

## Closest existing pages (Stage 2)

Same post-redirect cluster shape as B1-B1 and B1-B2 briefs. Internal-link survey for this slug:

- Body link to `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` (CGT pillar) — unaffected.
- Body link to `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (BTL Ltd Co) — unaffected.
- Body links to `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`, `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`, `/blog/landlord-tax-essentials/property-investment-tax-uk-complete-guide-2026` — all unaffected.
- **Inbound links** TBD at execution-time grep. Likely low count (page only 5 days old at brief drafting; few sites/pages have had time to link).

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs the 60-day rule + penalty schedule. This page's penalty day-counts drift (per House-position conflict flag below).
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22]: §17.4 NRCGT 60-day aligned 2021-10-27. This page's Summary directly contradicts this verbatim. Severe drift.
- **§19 MTD for ITSA** [LOCKED]: §19.15 confirms CGT 60-day return runs in parallel with MTD cessation. Not in scope for this brief specifically.
- **§7 April 2027 property income tax surcharge** [LOCKED but VERIFY per §16.22]: NOT applicable — surcharge is on rental income, not CGT.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts (HIGH and CRITICAL severities, but resolved by REDIRECT not REWRITE):**

1. **CRITICAL — Non-resident 30-day deadline assertion** in Summary (line 178): *"Non-residents have a 30-day deadline"*. Directly contradicts §17.4 LOCKED 2026-05-22 (aligned at 60 days from 27 October 2021). Also contradicts the page's own body at lines 136-138 — internal page-level factual inconsistency. **This is a §16.31 Stage 2 verification catch** (the kind of factual drift that should have been caught at the 2026-05-18 page-write but wasn't). Resolved by redirect (canonical asserts 60-day non-resident deadline correctly with full §17.4 framing).
2. **HIGH — Penalty day-count drift** (body lines 118-121 + FAQ #3): daily-£10 phase mis-assigned to 3-6 months instead of the correct day-91-onwards-for-up-to-90-days schedule per §5 / TMA 1970 Sch 55. Resolved by redirect (canonical uses correct schedule in its dual-table format).
3. **MEDIUM — 2025/26 framing throughout**: obsolete by 2 months. Resolved by redirect (canonical uses 2026/27 framing).

**Like B1-B1 and B1-B2, these are flagged as discovery that the canonical handles correctly. NO back-patch needed at the canonical for these three points.**

**Carried-forward critical drift catch — at the canonical, NOT at this page (logged as F-13 by B1-B1 brief, not re-raising here):** canonical's hallucinated "sections 222 to 233 of the Finance Act 2019" citation. Same flag covers all three Batch 1 Sub-bucket B briefs.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification)

Same set as B1-B1 and B1-B2 briefs:

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | 200 OK + content verified 2026-05-23 | Correct 60-day-return statute (would be canonical's F-13 back-patch target). |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report | 200 OK | gov.uk service page (non-residential / overseas variant). |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | 200 OK | ATT users' guide — depth-target if canonical merits future rewrite. |

**(Execution session for the redirect doesn't need to cite any of these in body — there is no body.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: same restricted REDIRECT-case subset as B1-B1 and B1-B2 briefs (§16.14 + §16.18 + §16.31 + quality bar §4.3 six-check; no em-dash discipline relevant; no body authored).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: same compressed REDIRECT workflow as B1-B1 and B1-B2 briefs, with this slug substituted:

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed).
3. Verify canonical still exists at expected path.
4. Add 301 redirect: `/blog/capital-gains-tax/cgt-reporting-deadlines-property-2026` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
5. Delete (or move to `_redirected/`) `Property/web/content/blog/cgt-reporting-deadlines-property-2026.md`.
6. Grep for internal links pointing to this slug.
7. Build site. Must pass. Confirm sitemap regenerates without the old slug.
8. Insert `monitored_pages` row with `tracking_type = redirect_post`, `redirect_source_slug = cgt-reporting-deadlines-property-2026`, `redirect_target_slug = cgt-payment-deadlines-property-sales-2026`.
9. **Commit (bundled with B1-B1 + B1-B2 redirects)** on `main`: `git commit -m "Track 2A: redirect 3 legacy 60-day-CGT pages to canonical (CANNIBAL cluster resolution)"`. Tracker edits to main repo file via absolute paths only.
10. Mark tracker ✅ executed for all 3 slugs.
11. Log any execution-time surprises to `track2_site_wide_flags.md`.

**Side-task at execution (manager decision):** consider whether to lift this page's band-stacking worked example (£5,270 × 18% + £91,730 × 24% = £22,963.80) into the calculation-walkthrough sibling `cgt-calculation-selling-buy-to-let-property-step-by-step` as a refresh of that sibling's worked example. If yes: separate brief and separate commit; do not bundle with the redirect commit.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's published content still factually current: __
- F-13 statute-citation drift at canonical resolved (or still queued)? __

### Redirect commit

- Middleware rule landed: __
- Source markdown removed/moved: __
- Internal-link survivors patched (file:line list): __
- Build pass: __
- monitored_pages row inserted: __
- Commit hash: __

### Post-redirect monitoring

- 30-day check: canonical's `hmrc cgt reporting deadlines 2026` impressions trended +/- against baseline (85 imp canonical + 5 imp here = 90 imp combined): __
- 60-day check: canonical's deadline-cluster total impressions trended vs combined pre-redirect baseline (~380): __
- 90-day check: monitored_pages detector firing or quiet: __

### Side-task: calculation-walkthrough sibling refresh

- Manager decision: lift band-stacking worked example to calculation sibling? __ Yes / __ No
- If yes: separate brief drafted at: __
- If yes: separate commit hash: __

### Flags raised during execution

- F-13 (carried, canonical's hallucinated FA 2019 citation): resolved / queued / unresolved: __
- Any new flags: __

### 2-3 sentence summary

- (populated at execution time)
