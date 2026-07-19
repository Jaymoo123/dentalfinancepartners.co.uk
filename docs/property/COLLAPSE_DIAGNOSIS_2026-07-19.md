# Property collapse diagnosis — 2026-07-19

Follow-up to `META_PROGRAM_REGISTER_2026-07-19.md` §3 (68 collapsed pages,
~19k impressions/28d off peak). Method: segment → live/technical check → GSC
URL Inspection sweep → Bing cross-engine control → query-destination trace →
site-trajectory. All read-only; no changes made.

## Verdict (short)

**This is Google pruning an over-published corpus, and it is currently
NET-POSITIVE.** Weekly clicks accelerated 51 → 162 (late May → last week) while
ranking-page breadth halved (610 → ~377). Google deindexed duplicative/thin
pages and concentrated equity on survivors, which now rank and convert better.
No technical failure, no penalty behaviour, no action needed on the core trend
except monitoring. A handful of genuine defects below.

## Evidence chain

1. **Segmentation of the 68**: 19 deliberate 301 consolidations (fine in
   principle), 1 true 404, 48 live-200 pages that lost rankings.
2. **Technical**: zero noindex, zero canonical mismatches on all 48. Not
   technical.
3. **URL Inspection (all 48 + 16 redirect targets + 10 healthy controls)**:
   - 23/48 live-collapsed = **"Crawled - currently not indexed"** (Google
     deindexed; google-canonical = self, so not a canonical takeover)
   - 25/48 still indexed, rank-demoted
   - 10/10 healthy controls indexed (sweep is sane)
   - **5/16 redirect targets NOT indexed** — those consolidations dumped
     equity into dead ends (real defect, list below)
4. **Bing control**: deindexed pages still rank fine on Bing (tax-sell 385,
   cgt-rates 326 impr latest snapshot) → pages are technically and
   content-wise servable; the demotion is a Google index-selection decision.
5. **Query destinations**: only the CGT cluster consolidated internally
   (queries moved to `capital-gains-tax-property-complete-guide-uk`, at worse
   positions for now). Most deindexed pages' queries left the site entirely —
   consistent with Google dropping near-duplicate/overlapping coverage rather
   than re-routing it (the corpus has known heavy topical overlap; gap
   discovery measured ~47% dupe rate estate-wide).
6. **Trajectory**: breadth fell steadily (not one cliff): pages/week 610
   (06-15) → 588 → 565 → 478 → 377, while impressions HELD (12-19k/wk) and
   clicks ROSE every week: 51, 72, 53, 73, 76, 121, 145, **162**. Timing
   overlaps the June core-update window; the collapse "event" in the meta
   analysis was the leading edge of a rolling prune.

## Interpretation

Publishing velocity (269 new pages inside one 8-week window; multiple sibling
pages per intent, e.g. 5+ CGT-rates/sale variants) tripped Google's
deduplication/quality selection. Google kept the best page per intent and
dropped the rest from the index. Clicks doubling through the prune says the
survivors are the right pages. The 19k "lost" impressions were largely
low-value duplicate-coverage impressions.

## Defects to fix (owner word, small and surgical)

1. **5 unindexed redirect targets** (redirects point at pages Google hasn't
   indexed): see `.cache/meta_program/property/index_inspection.json`
   → `redirect_targets` with coverage "Crawled - currently not indexed".
   Action: Request Indexing + add internal links from indexed pages.
2. **1 true 404**: `/blog/portfolio-management/landlord-tax-return-complete-guide-2026`
   — page was recategorised to `landlord-tax-essentials` with NO redirect from
   the old category path. Add a 301. (Check for the same pattern on other
   recategorised pages before shipping — one-line audit script.)
3. **Meta program interaction**: the 2 held proposals (cgt-rates,
   single-person-council-tax) stay held. cgt-rates is deindexed; new meta
   cannot help a page Google won't index. If the CGT cluster matters, the
   decision is differentiate-or-consolidate (per the data-gated consolidation
   rule: owner per-cluster approval + Bing veto — NB Bing still monetises
   these pages, so consolidation has a real Bing cost).

## What NOT to do

- No mass Request Indexing of the 23 deindexed pages — "crawled, not indexed"
  is a quality decision, resubmission without change does nothing.
- No panic rewrites; clicks are the KPI and they are at an all-time high.
- No new near-duplicate publishing into already-covered intents (this is what
  triggered the prune). Future waves must pass the dupe gates hard.

## Shipped 2026-07-19 (owner approved "ship all of it")

- 4 meta pairs applied via `meta_apply.py --execute` with new `META_APPLY_SKIP_STAMP=1`
  flag (title/desc/_prev only, no dateModified/EEAT churn): ated-guide, welsh-ltt-rates,
  directors-loan s.455, sdlt-transfer-company. Audit rows written; pages already in
  monitored_pages. Re-analyse ≥2026-08-20.
- Generic recategorisation redirect added to `Property/web/src/middleware.ts`
  (wrong-category nested URLs 301 to the correct category; map verified 0 mismatches
  vs frontmatter). Fixes the landlord-tax-return 404 and the whole pattern.
- **Owner manual step — GSC Request Indexing (API cannot do this), 5 URLs:**
  1. /blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances
  2. /blog/capital-gains-tax/principal-private-residence-relief-landlords
  3. /blog/incorporation-and-company-structures/incorporation-existing-portfolios-phased-approach
  4. /blog/incorporation-and-company-structures/limited-company-vs-personal-ownership-tax-comparison-2026
  5. /blog/property-accountant-services/birmingham-property-accountant

## Monitoring

Weekly: clicks (primary), pages-with-impressions count, and the collapse
detector in `scripts/meta_property_analysis.py`. Escalate only if clicks turn
down alongside continued breadth loss — that would mean the prune is eating
into good pages.
