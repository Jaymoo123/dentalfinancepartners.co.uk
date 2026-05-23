# Track 2 Batch 1 — Sub-bucket B discovery log

Append-only. Format + tags identical to Sub-bucket A discovery log.

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_discovery_log_batch1_sub_b.md` only.

---

## 2026-05-23 — Batch 1 Sub-bucket B run (Sub-agent B)

### D-1 | 2026-05-23 22:00Z | cluster-collapse-confirmed
All 3 candidates (B1-B1, B1-B2, B1-B3) resolved to **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`**. Cluster GSC totals (90-day): B1-B1 = 0 imp / 0 clk / 2 bounced GA4; B1-B2 = 107 imp / 0 clk / 12 queries pos 2.7-49; B1-B3 = 11 imp / 0 clk / 5 queries pos 1-12; canonical = 262 imp / 0 clk / 20 queries pos 1-11. Combined pre-redirect cluster ~380 imp at pos 10-18 split-equity. Canonical wins the cluster head-to-head on every shared query family.

### D-2 | 2026-05-23 22:00Z | intra-pair-resolution-B1-B1-vs-B1-B2
Intra-pair canonical analysis: B1-B2 stronger than B1-B1 by every available signal (107 imp vs 0, dateModified 2026-05-19 vs none, schema 6-block @graph vs schema empty, 4 FAQs vs 2 FAQs, ICAEW reviewer block present vs absent, prior metaTitle/metaDescription rewrite attempt evidenced via metaTitle_prev field vs no prior rewrite). **However** intra-pair resolution irrelevant because both pages REDIRECT to the third sibling (rewritten 2026-05-21 canonical) which dominates them both. Resolution logged for completeness.

### D-3 | 2026-05-23 22:00Z | F-13-canonical-statute-hallucination-detected
Mandatory §16.31 WebFetch verification of authority URLs surfaced a hallucinated statute citation IN THE REWRITTEN CANONICAL (`cgt-payment-deadlines-property-sales-2026`, shipped Session C #23 on 2026-05-21). Canonical body §"The 60-day clock" asserts: *"the statutory framework sits in Schedule 2 to the Finance Act 2019 (now within sections 222 to 233 of the Finance Act 2019, as amended)"*. WebFetch of `https://www.legislation.gov.uk/ukpga/2019/1/schedule/2` 2026-05-23 confirms Schedule 2 to FA 2019 is the operative provision (title: "Returns for disposals of UK land etc"; paragraph 3 contains the 60-day clock as amended by FA 2022). FA 2019 contains only ~94 sections — there are no sections 222-233 in FA 2019; schedules don't get renumbered into act-body sections. The "now within sections 222 to 233" parenthetical is hallucinated. **10th-consecutive Bill-vs-enacted-Act-pattern drift in the program; first to be caught at a shipped rewrite (vs the prior 9 caught at pre-launch).** Confirms §16.36 statutory-citation cross-check gate is load-bearing — had it been applied to Session C's brief generation, this would have been caught. Logged as F-13 in `track2_site_wide_flags.md`.

### D-4 | 2026-05-23 22:00Z | f-14-canonical-depth-vs-best-in-class
WebFetch of pos-1 SERP holder rayneressex.com (~320 words) and pos 1-2 reference ATT users' guide (~8,500-9,000 words) revealed the depth landscape: canonical's ~2,500 words sits comfortably between the two and outranks rayneressex on substance, but ATT is the upper-bound depth-target. SERP positions show canonical at pos 11.7 on its top query, suggesting Google's current ranking signal is not strongly word-count-correlated at this query class. **Canonical's mid-depth position is defensible** — no immediate canonical rewrite needed. F-14 raised in case a future-batch depth-up is considered.

### D-5 | 2026-05-23 22:00Z | b1-b3-band-stacking-worked-example-asset
B1-B3's source contains a worked example with explicit band-stacking (£5,270 unused basic rate × 18% + £91,730 × 24% = £22,963.80) that the canonical's worked example doesn't model (canonical uses flat-higher-rate £36,960). The band-stacking shape is more sophisticated and would belong in the calculation-walkthrough sibling (`cgt-calculation-selling-buy-to-let-property-step-by-step`), not in a deadlines page. Before B1-B3's source markdown gets deleted at execution, manager should decide whether to lift this worked example into the calculation sibling. F-15 raised.

### D-6 | 2026-05-23 22:00Z | three-further-cluster-collapse-candidates
Three further residual CGT-reporting slugs flagged for likely-future REDIRECT to the same canonical: (a) `how-to-report-property-sale-hmrc-60-days` (per cannib index §6); (b) `report-property-sale-hmrc-60-days-guide` (per §6); (c) `capital-gains-tax-selling-rental-property-uk` (potential overlap with `cgt-selling-buy-to-let-property-calculation-guide` rewritten sibling). Not in Batch 1 scope; recommend Phase 2 cluster-audit pass before commissioning further reporting/deadlines briefs (F-16 raised). Catching all candidates in one pass beats discovering serially.

### D-7 | 2026-05-23 22:00Z | redirect-bundle-execution-discipline
All 3 redirects should land in a **single commit** at execution time so the canonical absorbs equity from all three slugs in a single Vercel deployment — avoids any brief redirect-loop or split-equity intermediate state. The commit should:
- Add 3 middleware rules in `Property/web/src/middleware.ts`.
- Delete (or move to `_redirected/`) the 3 source markdowns.
- Patch any internal-link survivors across `Property/web/content/blog/*.md` + `Property/web/src/**/*.tsx` (cursory scan: B1-B2 referenced from MTD landlords page).
- Insert/update 3 `monitored_pages` rows with `tracking_type = redirect_post`, 90-day window.
- Commit message: `Track 2A: redirect 3 legacy 60-day-CGT pages to canonical (CANNIBAL cluster resolution)`.

### D-8 | 2026-05-23 22:00Z | template-padding-on-redirect-case (F-17)
The §4 brief template (designed for REWRITE briefs) overruns the body-content sections (Sections 4-12) for REDIRECT-PROPOSED cases — all 3 sub_b briefs ended up carrying "N/A — no rewrite" framing in Sections 7 + 8 + 11 + 12. Workflow section (Section 14) also collapses from 19 steps to ~10 redirect-specific steps. Briefs still readable but feel padded. Phase 2 manager consideration: add a compressed REDIRECT-PROPOSED template variant to `TRACK2_PROGRAM.md §4`. F-17 raised; not blocking.

### D-9 | 2026-05-23 22:00Z | invisible-page-count-now-5-of-7
Including B1-B1 (zero GSC), the running count of Track 2A residual pages with zero-GSC-in-90-days is now **5 of 7 investigated** (airbnb trial T1 + 3 Sub-bucket A pages + B1-B1). Per F-11 (Sub-bucket A discovery), this suggests a substantial sub-cohort in the residual 233 are functionally invisible to Google. **Implication for Sub-bucket B specifically:** B1-B1 was invisible whereas B1-B2 (107 imp) and B1-B3 (11 imp) were visible-but-cannibalised — the invisibility correlated with B1-B1 being the more generic slug ("complete-guide") while B1-B2 ("rule") and B1-B3 ("deadlines-2026") carried more specific anchor terms. Hypothesis for Phase 2 manager: generic-suffix slugs (`*-complete-guide`, `*-uk`, `*-2026`) may be more prone to Google deduplication than specific-suffix slugs. Worth a Phase 2 audit of slug-suffix vs visibility correlation in the residual pool.
