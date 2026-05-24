# Track 2 Phase 3 — Worktree REDIRECTS discovery log

Append-only. Worktree REDIRECTS sub-agent appends execution-time discoveries here. Manager reads at Phase 3 close + feeds into post-Phase-3 backlog.

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_redirects.md` only.

**Format:** `D-R<N> | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

**Tags:** `INTERNAL_LINK_PATCH_COUNT` (record total patches per slug — informs F-11 INVISIBLE-page internal-link-footprint pattern across the program), `MIDDLEWARE_FORMAT_LEARNING` (any wrinkle in the DUPLICATE_REDIRECTS map structure worth recording for future redirect bundles), `BUILD_QUIRK`, `SITEMAP_DELTA` (confirm expected -5 and -1 sitemap entry drops), `CANONICAL_HEALTH_CHECK` (any issue surfaced at the canonical target read at step 3 of pre-redirect verification).

**monitored_pages staging entries (REQUIRED at bundle end):**
Append 6 lines, one per redirect:
`monitored_pages row needed: source=<slug>, target=<canonical>, tracking_type=redirect_post, redirect_date=<today>, window=90d`

**F-16 cluster collapse closure entry (REQUIRED at bundle end):**
Append a single entry: `F-16 cluster collapse COMPLETE — 5-page collapse to cgt-payment-deadlines-property-sales-2026; B2-A3 standalone redirect to cgt-selling-buy-to-let-property-calculation-guide. Recommend manager mark F-16 RESOLVED in track2_site_wide_flags.md resolution log + close §7 Batch 1 + Batch 2 in-flight tables in Cannibalisation Index.`

**Lift verification entries (REQUIRED before any source deletion):**
Append 3 lines confirming the F-15 / D-11 / D-12 lifts survive on the worktree branch:
- `F-15 lift verified at worktree branch — Worked example 2a present in cgt-calculation-selling-buy-to-let-property-step-by-step.md`
- `D-11 lift verified at worktree branch — Filing without digital access H3 + 0300 200 3300 present in cgt-payment-deadlines-property-sales-2026.md`
- `D-12 lift verified at worktree branch — Capital Losses on Disposal H2 + TMA 1970 s.43 cite present in cgt-selling-buy-to-let-property-calculation-guide.md`

---

## Worktree REDIRECTS execution close — 2026-05-24 PM

### Lift verifications (pre-redirect)

- `F-15 lift verified at worktree branch — Worked example 2a present in cgt-calculation-selling-buy-to-let-property-step-by-step.md` (line 134 H2 "Worked example 2a: large gain with a small unused basic-rate band" — confirmed)
- `D-11 lift verified at worktree branch — Filing without digital access H3 + 0300 200 3300 present in cgt-payment-deadlines-property-sales-2026.md` (lines 101 + 109 — confirmed; F-13 back-patch also confirmed present at line 73)
- `D-12 lift verified at worktree branch — Capital Losses on Disposal H2 + TMA 1970 s.43 cite present in cgt-selling-buy-to-let-property-calculation-guide.md` (line 116 H2 + s.43 cite within section body — confirmed)

### Discoveries (D-R numbering)

`D-R1 | 2026-05-24 PM | INTERNAL_LINK_PATCH_COUNT | 5 of 6 source slugs (B1-B1, B1-B2, B1-B3, B2-A1, B2-A2 — the entire 60-day-CGT cluster) had ZERO cross-references in any other markdown / src .ts / src .tsx / data file anywhere in Property/web. Total internal-link patches across Commit 1 (5 redirects): 0. Total internal-link patches across Commit 2 (B2-A3 only): 2 (across 2 markdown files: temporary-non-residence-5-year-cgt-recapture-property.md + landlords-considering-selling-portfolio-rra-2025-tax-implications.md, both referencing the B2-A3 slug as a "CGT on selling a rental property" guide pointer). Dispatch-prompt expectation was ~10-30 hits across the 5 slugs combined; actual was 0 + 2 = 2 total. F-11 INVISIBLE-page pattern is BROADER than first hypothesised: invisible pages are not only invisible to SERPs but also marginalised in the internal-link graph itself — orphan-by-design rather than orphan-by-circumstance. This validates the cluster-collapse-by-redirect approach: no equity is leaked at the link-graph level because no equity was ever invested in these pages by internal navigation.`

`D-R2 | 2026-05-24 PM | MIDDLEWARE_FORMAT_LEARNING | The middleware.ts DUPLICATE_REDIRECTS map check (lines 471-473 for old flat /blog/[slug] format; lines 491-495 for nested /blog/category/[slug] format) executes BEFORE the SLUG_TO_CATEGORY_MAP check (lines 475-478). 4 of the 6 source slugs (60-day-cgt-reporting-property-sales-rule, how-to-report-property-sale-hmrc-60-days, report-property-sale-hmrc-60-days-guide, 60-day-cgt-reporting-property-sales-complete-guide) were already in SLUG_TO_CATEGORY_MAP (capital-gains-tax category) — adding them to DUPLICATE_REDIRECTS overrides cleanly since DUPLICATE_REDIRECTS is checked first. Did NOT remove the now-unreachable SLUG_TO_CATEGORY_MAP entries to keep the commit surgical per dispatch protocol; manager can clean up at a later housekeeping commit if desired (harmless either way — dead code path).`

`D-R3 | 2026-05-24 PM | BUILD_QUIRK | Worktree had no node_modules at start — Next.js workspace deps are not auto-hoisted into a fresh worktree. Ran 'npm install --no-audit --no-fund' at the workspace root (Accounting-wt-property-track2-phase3-redirects/, not Property/web/) and the workspace install resolved the entire 'accounting-network' workspace including Property/web in 17s / 468 packages. This is a one-time per-worktree cost — future Phase 3+ worktrees will need the same install step if not pre-warmed. Recommend manager add a pre-flight 'npm install at worktree root' step to the worktree creation protocol so sub-agents don't burn context discovering this.`

`D-R4 | 2026-05-24 PM | SITEMAP_DELTA | Confirmed -5 after Commit 1 (488 .md remaining vs. 493 pre-bundle) and -1 after Commit 2 (487 .md remaining vs. 488 post-Commit-1). Build output 'generateStaticParams' enumerated 488 paths after Commit 1 and (implicitly) 487 after Commit 2 — both deltas correct. Middleware compiled at 40.6 kB after both commits.`

`D-R5 | 2026-05-24 PM | CANONICAL_HEALTH_CHECK | Both target canonicals confirmed healthy at worktree branch — cgt-payment-deadlines-property-sales-2026.md carries F-13 back-patch + D-11 digital-exclusion lift + structural integrity intact; cgt-selling-buy-to-let-property-calculation-guide.md carries D-12 lift (Capital Losses on Disposal H2 + TMA s.43 cite) intact. F-35 LOW finding from Batch 2 Sub-bucket A (BTL CGT calculation canonical carries 2025/26 year-stamp drift) was confirmed by spot-check during pre-redirect read — drift is real but does not block the redirect; flagged for separate rewrite-cohort year-stamp audit per F-35 already-logged recommendation.`

### monitored_pages staging (6 rows for manager batch-insert at close)

`monitored_pages row needed: source=60-day-cgt-reporting-property-sales-complete-guide, target=cgt-payment-deadlines-property-sales-2026, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`
`monitored_pages row needed: source=60-day-cgt-reporting-property-sales-rule, target=cgt-payment-deadlines-property-sales-2026, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`
`monitored_pages row needed: source=cgt-reporting-deadlines-property-2026, target=cgt-payment-deadlines-property-sales-2026, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`
`monitored_pages row needed: source=how-to-report-property-sale-hmrc-60-days, target=cgt-payment-deadlines-property-sales-2026, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`
`monitored_pages row needed: source=report-property-sale-hmrc-60-days-guide, target=cgt-payment-deadlines-property-sales-2026, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`
`monitored_pages row needed: source=capital-gains-tax-selling-rental-property-uk, target=cgt-selling-buy-to-let-property-calculation-guide, tracking_type=redirect_post, redirect_date=2026-05-24, window=90d`

### F-16 cluster collapse closure

`F-16 cluster collapse COMPLETE — 5-page collapse to cgt-payment-deadlines-property-sales-2026 (commit 39053e7); B2-A3 standalone redirect to cgt-selling-buy-to-let-property-calculation-guide (commit e2bd08f). Recommend manager mark F-16 RESOLVED in track2_site_wide_flags.md resolution log + close §7 Batch 1 + Batch 2 in-flight tables in Cannibalisation Index (track2_cannib_index_2026-05-23.md). Combined cluster-collapse arithmetic across the F-16 cohort: 5 legacy pages collapsed into 1 rewritten canonical = 5:1 consolidation ratio. The canonical now carries all the cluster's salvageable content (F-15 band-stacking example moved to calculation walkthrough sibling pre-redirect, D-11 paper-PPDCGT digitally-excluded route lifted in pre-redirect, F-13 hallucinated sections-222-to-233 cite back-patched on rewrite cohort, dual-table late-filing-vs-late-payment penalty schema preserved on canonical). The 60-day-CGT cluster is now fully consolidated — no further residual cluster work expected pre-Wave-8.`

### Worktree close summary

- Commit 1 hash: 39053e7 (5 redirects + 5 deletions + middleware edit)
- Commit 2 hash: e2bd08f (1 redirect + 1 deletion + 2 internal-link patches + middleware edit)
- Build status: PASS on both commits (middleware 40.6 kB; generateStaticParams 488 → 487 paths)
- Sitemap delta: -6 total across the bundle (493 → 487 markdown files)
- Lift verifications: all 3 (F-15 / D-11 / D-12) confirmed present on worktree branch before any source deletion
- Internal-link patches: 2 total across 2 files (both for B2-A3 source slug; zero for the 60-day cluster)
- F-16 cluster collapse: COMPLETE (5:1 consolidation)
- No flags raised by this worktree (zero pattern-level discoveries that didn't already exist as F-1 through F-38 in track2_site_wide_flags.md)
- Time taken: ~30 minutes (smaller than dispatch-prompt 2-3h estimate because internal-link footprint was much smaller than predicted — the surprise was upside-good)
- Open questions for manager: none

Branch: track2-phase3-redirects at HEAD e2bd08f, ready for manager merge to main per A → B → C → REDIRECTS merge order. Verified A/B/C already merged (commits 50269ba + 8d3dc93 + 9cf0743 visible on worktree base).
