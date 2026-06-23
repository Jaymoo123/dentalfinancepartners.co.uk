# Property — Monitored-Pages SEO Evaluation (2026-06-21)

> Evaluation of the historical rewrite / keyword / meta work via the `monitored_pages` watch.
> Method: refreshed GSC (to 2026-06-19) + Bing (snapshot 2026-06-21), matched pre/post windows
> per page, then a 4-agent adversarial verification workflow (Bing attribution, Google regression
> root-cause, 0%-CTR diagnosis, methodology audit) + synthesis. Run via `scripts/_mp_evaluate.py`
> + `scripts/_q.py` (READ-only Supabase Management API). Raw output: `_mp_eval_out.json`,
> workflow result in the session transcript dir.

## Scope monitored
471 active `monitored_pages` for property: **451 rewrites + 20 redirects**, rewrite dates
2026-05-21 → 06-03, monitor_until 2026-08-19 → 09-01. None flagged by the regression detector.
Cohorts: A = 21-25 May (118 rewrites, incl. the 52-page 2026-05-21 cleanup), B = 29-30 May (28),
C = 01-03 Jun (39, the Track-2 finals).

## Headline verdict
The work **is** coming along, but the two engines tell different stories and the optimistic
first read was corrected by the audit:

- **Bing — paying off in real clicks NOW, but it's breadth not rank-lift.** Site-level
  2026-05-30 → 06-21: **1,548 → 6,872 impressions, 111 → 546 clicks**, holding pos ~5 / CTR ~8%.
  Real page-1 clicks on section-24, CGT, incorporation, MTD pages. BUT decomposition shows the
  42 like-for-like pages were **flat on stable page+query pairs** (impr +8.7%, clicks −8%,
  position essentially unmoved; 583 of 664 pairs static). The 3–5× growth = **more pages indexed
  (36% of impr growth) + more queries attributed to existing pages**, not the rewrites pushing
  rankings up. Caveat: Bing snapshots are not provably equal-length windows (confidence: medium).
  Don't credit the headline ~5× as a *ranking* win — but the clicks are bankable today.

- **Google — climbing but overstated ~2× and still pre-click.** The weighted figures reproduce
  (Cohort A 40.6 → 18.3; all rewrites 35.1 → 21.8) but are **inflated by survivorship/composition**:
  of 183 rewrites with GSC data only 61 have BOTH windows; 45 pre-only pages (avg ~pos 46) drop out
  of the post average while 77 post-only pages (avg ~pos 13, **many actually net-new Track-1/Wave-2
  pages, not the same page climbing**) drag the post pool down. Honest like-for-like: Cohort A
  **~36.6 → 25.3 weighted (~40 → ~33 unweighted); median page moved ~0**; effect concentrated in a
  minority of Cohort-A pages; Cohort B impressions fell ~40% and **Cohort C (the Track-2 finals)
  slightly regressed 53.3 → 62.5**. Decisively: **gains land in the page 2-3 dead zone → ~1.45
  Google clicks/week sitewide.** Leading indicator, not yet a traffic outcome.

- **Redirects — clean.** Old source slugs dropped to ~0 impressions, no leakage; 20 redirects
  behaving as designed.

**Safe headline to report:** "Early signal that rewritten pages are gaining impressions and modest
rank on a subset of pages; converting to real clicks on Bing; not yet on Google (page 2-3 +
zero-click SERPs); too composition-driven to claim a broad demonstrable Google rank climb."

## The one real regression
**`peterborough-property-accountant-specialist-tax-services`** — an established page-1 local page
(pos 9.8 → 12.9 → 13.8 → 23.5 → 29.3 → **47.5**), monotonic decline starting right after the
2026-05-21 rewrite, full Cohort-A window elapsed (NOT a maturation dip). Likely the rewrite diluted
local-intent signals. **Action:** git-diff pre/post content; restore city name in title/H1/intro +
NAP/service specifics; compare to a sibling local page that held rank to isolate page-specific vs
estate-wide local volatility. Recheck 7-10 days. Severity: medium. This is the only secondary that
should NOT be dismissed as noise.

## The CGT "regression" is a 301-lag artifact — HOLD
`cgt-payment-deadlines-property-sales-2026` reads as 5.5 → 37.2 but is the **canonical target of a
deliberate 5-page CGT cluster collapse** (commit `39053e7a`; `middleware.ts` L460-464 all 301 → it;
source `.md` deleted). The redirect source `cgt-reporting-deadlines-property-2026` got indexed by
Google as the redirect deployed (~21 May) and still holds pos ~11 for the anchor queries — so the
cluster authority is intact but mis-attributed to the soon-to-be-dropped source URL. **Bing already
consolidated correctly** (target 83 impr @ pos 6.8 with clicks; sources stale). **Action:** do NOT
edit/revert. (1) Submit the 5 redirected source URLs for re-crawl (IndexNow / GSC URL Inspection)
to speed Google's 301 processing. (2) Restore exact-match `HMRC CGT Reporting Deadlines 2026` to the
target metaTitle (the rewrite stripped it; `metaTitle_prev` had it). **Re-verify ~2026-07-05:**
source URLs should fall out of Google's index and the target climb toward pos ~10; if source still
pos ~11 with target pos 30+ then, escalate (possible canonical/indexing conflict).

## Why page-1 pages get 0% CTR on Google (the "new optimisation" question)
Five most-impressed pages rank Google pos 3-9 with ~0% CTR while the **same URLs earn 8-21% on
Bing**. Diagnosis is NOT weak metas:

| Page | Google pos / CTR | Bing CTR | Diagnosis | Lever |
|---|---|---|---|---|
| cgt-rates-property-2026-27 | 5.3 / 0% | 8.6% | zero-click SERP | GEO/snippet capture |
| cgt-annual-exempt-amount-3000 | 7.0 / 0% | 2.3% | zero-click SERP | GEO/snippet capture |
| welsh-land-transaction-tax-ltt | **3.3 / 0%** | 2.3% | zero-click SERP (textbook) | GEO/snippet capture |
| scottish-lbtt-rates-bands | 7.1 / 0.1% | (thin) | mixed (34% non-res demand) | **net-new non-res page** + GEO |
| sdlt-transfer-property-company-cost | 9.1 / 0% | **21.2%** | meta + position | **genuine meta win** |

Google matches these against **answer-embedded, source-named queries** ("...18% 24%", "...£3000",
"gov.uk", "hmrc", "revenue scotland") that Google answers in-SERP via AI Overviews / featured
snippets / official listings. A third-party blog at pos 3-7 is structurally invisible. Bing surfaces
fewer zero-click answer features, so the identical pages convert there. **welsh-ltt at pos ~3 with
0 clicks is the proof the meta is fine and the SERP feature is the wall.**

## Is it time for new optimisations? PARTIALLY — yes targeted, no blanket meta program
Maturation window is effectively closed for decision-making (positions stable on real demand;
waiting won't convert page-2 informational rankings into clicks). But the dominant click-blocker is
the **zero-click Google SERP, not weak metas** — so pushing these pages through the standard
SERP-meta program would burn the 28-day verdict window and wrongly conclude "meta doesn't work for
Property." Onboard Property to optimisation now **with a pre-filter** that routes answer-embedded /
zero-click queries to a GEO track and reserves the meta program for genuine title+position fixes.

## Prioritized action plan
| # | Action | Engine | Priority | Effort |
|---|---|---|---|---|
| 1 | Fix stale factual figures from the 2026-06-19 audit (dividend rates, SDLT 15→17%, Wales-in-2027, WDA 18→14%, AMAP 45→55p) — accuracy/E-E-A-T + GEO citation eligibility | both | **P0** | med |
| 2 | Investigate + fix `peterborough-property-accountant...` (restore local anchors) | google | **P0** | med |
| 3 | HOLD the CGT cluster; accelerate 301 re-crawl (IndexNow) + restore exact-match metaTitle; re-verify 2026-07-05 | google | P1 | low |
| 4 | Route 4 CGT/LBTT/LTT rates pages to GEO/snippet-capture (liftable answer block + rates table + FAQ/HowTo schema); measure by AIO citation share | google | P1 | med |
| 5 | Enrol `sdlt-transfer-property-company-cost` as a genuine meta win (front-load "connected party / market value / cost"; on-page strengthening to lift off pos 9.1) | google | P1 | low |
| 6 | Build dedicated Scottish NON-residential/commercial LBTT page (~34% / 269 impr unmet demand) | google | P2 | high |
| 7 | Onboard Property to SERP-meta WITH a zero-click pre-filter; report rewrite success like-for-like (both-window, survivorship-excluded, net-new tagged out); next Bing pull with matched window lengths | both | P2 | med |

## Open watch items
- **CGT cluster fold-in:** re-verify ~2026-07-05.
- **peterborough:** recheck 7-10 days after fix.
- **Deep MTD/SA pages** (`mtd-software-landlords-free-vs-paid`, `best-mtd-software-landlords-2026`,
  `how-to-complete-landlord-self-assessment-filing-step-by-step-guide`): page-50+ churn on ~0-traffic
  pages, NOT regressions; re-evaluate ~2026-06-29. Flag the MTD pair for content-quality/consolidation.
- **Measurement hygiene going forward:** report rewrite outcomes like-for-like both-window with
  survivorship excluded + net-new pages tagged out of the rewrite cohort; run Bing pulls with matched
  window lengths before claiming lift.

## Methodology caveats (so this isn't over-read)
- GSC 2-3 day lag is NOT material (cap at max_date −0/−2/−4 all give ~18 post / ~40 pre).
- The headline weighting + survivorship made pre/post **non-comparable populations**; the honest
  metric is paired both-window.
- "All 185 rewrites" should be "all rewrites WITH data"; Cohort-A paired sample is tiny (n=33) →
  wide uncertainty. Avoid strong claims either way until a matched-window, survivorship-excluded
  re-pull.

---

# Follow-on diagnostic (same day) — "what are we doing wrong?"

Three parallel deep-dives (rewrite-craft controlled audit, channel strategy, measurement rebuild).
Two of this doc's earlier conclusions were **corrected** by the deeper look — recorded honestly below.

## Corrected: did the rewrites work? (honest scorecard now built)
Rebuilt scorecard: `scripts/property_honest_scorecard.sql` (run `python scripts/_q.py …`). Verified numbers:
- Of **451 "rewrites," only 232 are genuine** — 215 were net-new pages padding the cohort count.
- Of 232, only **56 are honestly measurable** (GSC impressions in BOTH their own 14-day pre and post
  window). 116 had no data; **45 dropped out post-rewrite (survivorship)**; 15 post-only.
- On those 56: **median same-page position delta = −0.68 (flat)**; weighted −4.59; mean −6.35 (inflated
  by a few movers); **33 improved vs 23 worsened** (coin flip); impressions 1814→1711; **clicks 0→1**.
- **Real bright spot:** Google **top-10 reach 10→17 (+7 paired pages)**.
- **The old headline ("40.6→18.0, +14 positions") overstated by ~3× (weighted) to ~20× (median)** —
  contaminated by survivorship + net-new pages + pooling different pre/post populations.

So: rewrites are **flat-to-marginally-positive on Google rank and not yet a traffic outcome.** Content
quality is NOT the problem (same pages convert 8-21% on Bing); they were the wrong **lever**.

## Corrected: the "signal-stripping" hypothesis is REFUTED
Controlled natural experiment — `peterborough` (declined) vs `nottingham`/`london`/`accounting-services`
(climbed), all location pages, all rewritten:
- The **climbers won by ADDING head-terms** (nottingham's pre-title "Accountants for Property Developers
  Nottingham" → "Property Accountant Nottingham 2026: BTL & HMO Tax" → its landlord+nottingham query
  cluster jumped 5→28 impr). Term-survival did NOT separate winners from the loser.
- **peterborough's "drop" is mostly noise** — it held pos ~9-16 for two weeks post-rewrite and only
  decayed from ~06-04 on **1-3 impressions/day** (the "47.5" tail is literally 1 impr/day). Downgrade
  from "the one real regression" to "a per-page title-template miss + a measurement mirage." Its only
  genuine defect: it broke the `Property Accountant {City}` title template its sibling cities kept.
- Real risk is **failing to ADD head-terms**, not stripping them. Rewrite engine title behaviour is
  sound-to-good on average (~1 of 10 pages had a title miss).

## What we're actually doing wrong (ranked)
1. **[HIGH] Wrong lever.** Biggest effort block = blanket content rewrites, a Google-shaped move that
   needs domain authority a young site lacks. Content quality isn't the bottleneck (Bing proves it), so
   rewrites land in the page 2-3 dead zone (~0 incremental Google clicks). The scarce cross-engine
   levers (GEO/AI-answer capture, off-site authority) are **built-but-switched-off or plan-only.**
2. **[HIGH] Dishonest measurement.** Scorecard inflated ~3×, hid survivorship, mixed 215 net-new into
   the cohort, used unequal Bing snapshot windows. We couldn't tell what worked, so we kept doing the
   thing that looked good on a broken dashboard. → fixed: `scripts/property_honest_scorecard.sql`.
3. **[MED] Two narrow process defects.** (a) no title-template consistency gate (peterborough);
   (b) the regression detector counts 301-redirect-lag + 1-3 impr/day noise as real declines.

## GEO/authority status (the under-used levers)
- **Authority: ~none built.** Repo grep found no backlink/referring-domain/outreach data source. Only
  shipped off-site asset = the one-time UK Landlord Tax Index (`/research/landlord-tax-index`); the
  planned live monthly index + distribution was never built.
- **GEO: built but off.** All 686 posts already emit BlogPosting + FAQPage JSON-LD via the live renderer
  fallback (better than the program's headline implied). MISSING: the richer E-E-A-T `@graph` (generator
  built, never applied) and a 40-60 word BLUF answer-box after H1 (exists on 1/686). The 4 zero-click
  rates pages are structurally close to citation-ready — gated on a cheap BLUF backfill + the @graph switch-on.

## STOP / START / CONTINUE
**STOP:** blanket Google rewrites; quoting the inflated scorecard ("+14 positions", "451 rewrites",
"Bing 5×"); treating raw Bing totals / pooled pre-vs-post as wins; flagging redirect-lag + 1-impr noise
as regressions.
**START:** switch ON the built E-E-A-T `@graph` + BLUF backfill on the 4 zero-click rates pages (highest
effort-to-return); harvest+convert the Bing/AI traffic that already exists (IndexNow-on-write, lead-CTA
tuning on top Bing pages — AI converts ~6% of leads vs Bing 0.4% / Google 1.7%); turn the Landlord Tax
Index into a live monthly embeddable asset (the only faceless authority path); run the honest scorecard
as the standing dashboard.
**CONTINUE:** the content-quality bar (it's good — just stop deploying it as a Google rank lever); the
few targeted Google fixes (peterborough title, CGT exact-match metaTitles, Scottish non-residential LBTT
net-new page); broad Bing indexation as a folded-in support move; the Track-B measurement instrumentation.

## Honest success criteria (young domain; Bing strongest; Google behind zero-click SERPs)
- **28d (REAL):** Google paired-cohort impressions +25% (now −6%); net +10 pages into Google top-10
  (baseline +7); owned snippet/AIO citation on ≥2 of the 4 rates pages; ≥7 leads/wk, ≥1 attributable to Bing.
- **90d (REAL):** Google paired weighted position ≤20 (from 27.1 — out of the dead zone); ≥10 Google
  clicks/wk; ≥10 leads/wk with a rising share traceable to rewritten landing pages.
- **VANITY (stop reporting):** raw Bing impression/click totals (breadth-inflated), "all 451 rewrites",
  any pooled pre-vs-post that mixes populations, raw short-term Google clicks.
