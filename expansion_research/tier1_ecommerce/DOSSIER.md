# R3 deep-research dossier — Ecommerce / Amazon sellers accountancy (Tier-1)

Date: 2026-07-12 (session started 2026-07-11). Branch: expansion/phase-0. Run constraint
honoured: **zero DataForSEO calls, $0 paid spend, no spend-guard changes**. Serper account
out of credits estate-wide; one probe confirmed (400), sweep is DDG-only (see anomalies).

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 82 verified players (14 DEDICATED + 47 SECTION + 21 ADJACENT), evidence quotes, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 4,163 raw → 3,160 final keywords → 2,331 page-level clusters; 0.29% estate hard-dupe rate + 40 flagged generalist conflicts (measured) |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | NARROWER-DEEPER architecture: 4 /for/* hubs + /vat/ depth cluster, 14 pages + 3 tools + 1 asset (volumes/KD explicitly unavailable this run) |
| [CALCULATORS.md](CALCULATORS.md) | 9 candidates, 3 launch-tier; heavy rival tool precedent verified (fee calculators saturated; fee+tax JOINED calculators vacant) |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Online Seller Business Index (CH SIC 47910 + ONS internet-retail series) — all sources fetched live this run |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 25 positions, 32/32 citations fetched live with anchor phrases (incl. FA 2026 s.4/s.28/s.29 on legislation.gov.uk) |
| [r3_call_plan.md](r3_call_plan.md) | Call plan + measured actuals ($0.00 paid) |
| [CHECKER_REPORT.md](CHECKER_REPORT.md) | Independent verification 2026-07-12: VERIFIED-WITH-CORRECTIONS (4 minor, all applied back into these files) |
| s1–s7 scripts + raw/ | Re-runnable pipeline (s2 resumable; s5b = judged finalise) + all raw evidence |

## Summary

- **Field verdict: HARDEST OF THE PROGRAM, as R2 predicted — VIABLE ONLY AS A
  NARROWER-DEEPER ENTRY, and it should build LAST.** 14 dedicated ecommerce-accountancy
  brands verified live (three+ exact-match domains taken; the leader founded 2012 with its
  own software; several with 100–250-page content hubs), 47 section-tier firms, **plus a
  layer no other niche has: 21 adjacent non-accountant SERP owners** (A2X and Link My
  Books' 868-URL content arm, an entire cross-border-VAT-agency industry on the OSS/IOSS
  queries, three standalone calculator sites incl. a 1,375-URL programmatic one, and
  HMRC's own side-hustle campaign occupying the DIY end).
- **A broad assault is not credible; a wedge entry is.** Verified-vacant wedges: (1)
  fee+VAT+income-tax JOINED calculators (tool sites stop at fees, firms stop at prose);
  (2) the CH SIC-47910 data asset (no rival runs anything like it — sitemaps checked);
  (3) UK-seller-first marketplace-VAT edge cases (deemed supplier/establishment, VAT on
  fees, £135 rule) where the SaaS arms can't credibly hold tax positions; (4) the
  HMRC-platform-report response service — **service-level vacant only** (checker
  2026-07-12: 3 rival blog posts on platform reporting exist — syncaccountants,
  socialcommerceaccountants ×2 — so the content side is contested even here).
  LAUNCH_CORE is deliberately smaller than care's (14 pages vs 22) with depth
  concentrated in /vat/.
- **"Park/deprioritise" was seriously considered and rejected on the evidence**: lead value
  is real (R2: 2,000/mo head family, CPC £35-44), the wedges are evidence-checked rather
  than hoped-for (checker audit: 2 cleanly vacant, 1 narrow, 1 service-level only), and
  the data asset gives faceless PR a clear shot. But the honest
  expectation is a long authority ramp on HIRE terms, and if the owner wants to cut one
  Tier-1 niche, this is the cut. **Build last, exactly as R2 sequenced.**
- **Estate adjacency is a live conflict, unique to this niche**: the generalist site
  (hollowaydavies.co.uk) ranked in our own DDG sweep and owns six live "Accountant For
  [ecommerce segment]" pages = this niche's HIRE head terms. 8 of the 12 hard pool drops (1 exact + 7 of 11
  fuzzy) and all 40 flagged conflicts trace to those pages (0.29% hard-dupe rate measured,
  but concentrated exactly on the money terms). Owner gate below.
- **≥3 genuine verified rivals**: yes, ×4.7 (14 dedicated) — the opposite of a thin-field
  concern.

## Anomalies / limitations (honest record)

1. **Serper quota exhausted (persisting from the care run)**: single probe returned 400
   "Bad Request" (credits); by plan no further attempts were burned. SERP sweep is DDG-only;
   Google-side positions are under-sampled and a Google re-sweep belongs in the paid pulls.
2. **No volumes/KD/CPC anywhere in this dossier** (zero DataForSEO by rule). All demand
   claims are family-size/precedent-based and marked as such. This matters MORE here than
   in care: the narrower-deeper call should be volume-re-scored before the R4 gate.
3. **Residual pool noise is higher than care's**: two mega-sitemaps (osome 1,630 URLs,
   ecomcalctools 1,375) are programmatic and pass scope on platform tokens; measured
   surviving examples in TOPICS.md. Page-level verify at write time is mandatory; the
   writer-ready estimate (500–800 of 2,331 clusters) is deliberately conservative.
4. **10 candidate firm domains stayed unverifiable** (bot-blocked, not search-recovered)
   and were excluded from competitors.json rather than guessed at (list in COMPETITORS.md).
5. **estate_blog_topics.json is the shared 2,035-row snapshot** used by the care/crypto/
   pharmacies dossiers (copied, not re-pulled) — consistent across R3 siblings, but it
   predates any additions after that snapshot; the s5 gate also checks live sitemap slugs
   from own_estate_exclusion.json, which is where the generalist collisions were caught.
6. **s5 ran ~40 minutes** (4,163 pool × 7,905 estate titles of difflib) — the harness
   auto-backgrounded the launch command; no orphaned jobs remain (completion verified,
   output file on disk). All other stages ran foreground.
7. One citation URL was remapped mid-run (gov.uk OSS-Union register 404 → the live
   NI-distance-sales register page); the passing 32/32 set is what raw/citation_checks.json
   records, and the failed attempt is preserved in r3_call_plan.md.

## Spend record

| Item | Cost |
|---|---|
| DataForSEO | **$0.00 (zero calls; guard untouched)** |
| Serper | $0.00 (1 probe attempt, 400 no-credits) |
| DDG (36), autocomplete (972), 160 fetch-verifies, 22 sitemap crawls, 33 citation fetches (32 pass + 1 remapped 404) | $0 |
| **Total** | **$0.00** |

## Open questions (for owner / R4 gate)

1. **The generalist wall (the big one)**: hollowaydavies.co.uk has six live ecommerce HIRE
   pages that ARE this niche's head terms. Options: (a) migrate/301 them to the new site at
   launch (cleanest, but touches a live site = STOP-condition territory needing explicit
   sign-off); (b) fence the new site off the exact HIRE phrasings and lead with the /vat/
   + tools wedge (no live-site touch, weaker head play); (c) park the niche and let
   generalist keep serving it shallowly. Decision required before any content generation.
2. **Build-last confirmation**: R2 sequenced ecommerce last with "the most ambitious asset
   plan"; this run confirms both. If Tier-1 capacity shrinks, this is the niche to cut.
3. **Volume re-score before R4**: given the narrower-deeper call rests on wedge economics,
   run the paid pulls below BEFORE brand/domain lock rather than after (cheap, ~$0.45).
4. **TikTok Shop hub**: fold into the marketplace hub at launch (current plan) or break out
   if the paid pull shows a distinct query family with volume?

## TODO — paid pulls (exact DataForSEO tasks, when the daily guard resets)

All via `DataForSEOClient._post_paid` → CostTracker + api_cost_log, site_key NULL,
UK location 2826. Estimated total ≈ $0.45 at config rates (mirrors care actuals $0.2520
for a smaller set).

1. `dataforseo_labs/google/keyword_suggestions/live` × 9 seeds, limit 200:
   "ecommerce accountant", "amazon seller accountant", "amazon fba accountant",
   "shopify accountant", "amazon seller vat", "side hustle tax", "ioss registration",
   "amazon settlement report", "tiktok shop tax". (~9 × $0.03 = $0.27)
2. `dataforseo_labs/google/ranked_keywords/live` × 3 rivals, limit 500:
   **yourecommerceaccountant.co.uk** (most SERP-visible dedicated firm),
   **ecommerceaccountants.co.uk** (exact-match incumbent, 242 URLs),
   **linkmybooks.com** (the SaaS content arm — measures the informational ceiling).
   (~3 × $0.06 = $0.18)
3. Optional 4th ranked pull: **marginwise.co.uk** or **ecomcalctools.com** (calculator-site
   keyword surface for the tool-fleet spec, mirroring the care-calculator.co.uk pull).
4. Re-score LAUNCH_CORE picks + CALCULATORS launch tier with returned volumes/KD/CPC;
   re-run s5b with volume-desc cluster seeding; decide the TikTok Shop hub question.
5. After Serper top-up: re-run `s1_serp_collect.py` for Google-side positions and diff
   survivors vs this run's DDG-only candidates.json.
