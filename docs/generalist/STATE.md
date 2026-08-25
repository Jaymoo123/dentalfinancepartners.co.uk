# Generalist (Holloway Davies) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** www.hollowaydavies.co.uk · Vercel project `holloway-davies` · site_key `generalist` · brand: distinct generalist design system (off-white + ink + orange, Geist Sans), james-holloway byline (credential designation removed 2026-06-29).

> **2026-07-19 — C1 metas + C2 expand committed, NOT deployed:** 5-page query-ledger meta batch + construction-accounting-software expand (43323c0a; fabricated software pricing caught + fixed in QA). Awaiting deploy word. Log: `docs/_engines/logs/SESSION_2026-07-19_GROWTH_DAY1.md`.

> **LATEST (2026-06-30, local / UNDEPLOYED):** active **Property-standard PARITY programme** — full handover in **`docs/generalist/PARITY_PROGRAMME_HANDOVER.md`**. Done this run: Waves 0-2 + GEO schema/code; site-wide credential strip; **full factual-accuracy remediation COMPLETE** (356 audited, 281 corrected + 3 fabrications rewritten on-URL); **Wave 3 + 3b GEO keyTakeaways backfill COMPLETE** — answer-boxes now on ALL 356 audited posts (Wave 3 = 74 clean, committed `1e60bf37`; Wave 3b = 282 now-corrected, run `wf_377cb19e-2ad`, incl. regenerating 5 stale pilot boxes); build green, `npm test` 33/33, render/schema verified. Records: `wave3_geo_2026-06-30.md`. **Wave 3b's QA flagged ~60 residual BODY issues** (stale-as-current figures the 1st remediation missed; answer-boxes clean) → `wave3b_body_issues_2026-06-30.md` = **remediation round 2 (manager-direct, owner steer pending).** Then Wave 4 GEN-R2 rewrites (needs fresh GSC pull) or deploy (gated). **Spend posture relaxed 2026-06-30 (owner upgraded); still no waste.**

## Stage 0 diagnosis 2026-08-25 (Track 2 / R.5)

**Binding constraint: ELIGIBILITY (position), not indexation, not conversion, not corpus.**
Google crawls and indexes the corpus and shows it heavily (52,772 impressions / 90d) but
almost never on page 1 for the demand-carrying families, so clicks are 222 / 90d
(CTR 0.42%). The funnel behind the click converts fine; the site just does not rank
where the volume is. Track 2 work here should be the §5.0a optimisation baseline
(corpus has NEVER had one) plus cluster deepening on the families below, before any
net-new volume.

All numbers from fresh API pulls 2026-08-25 (never stored snapshots; `gsc_query_data`
not used, no SUMs of it). Raw outputs saved to session scratchpad
`generalist_stage0/` (gsc_90d.json, bing.json, sitemap_urls.txt; scratch, not repo).

### Search reality (fresh pulls)
- **GSC** (OAuth API, property `sc-domain:hollowaydavies.co.uk`, window 2026-05-27 to
  2026-08-25, **data through 2026-08-23**, date-dimension = unsampled):
  **222 clicks, 52,772 impressions / 90d.** Query dim: 2,182 rows (sampled; reference
  only). Page dim: 625 pages with >=1 impression.
- **Bing** (`GetRankAndTrafficStats`, site truth per the top-N trap memo; data through
  2026-08-23, 96 daily rows): **1,717 clicks, 122,934 impressions / 90d-ish window.**
  Bing out-clicks Google ~8x on this site. 1,202 queries in GetQueryStats (top-N),
  665 pages in GetPageStats.

### Indexation check — PASS
- Sitemap (`/sitemap.xml`, fetched live 2026-08-25): **729 URLs**, of which 429 blog.
- **619 / 729 sitemap URLs (85%) earned >=1 GSC impression in 90d**; blog: 371/429 (86%).
- Corpus on disk: **418 posts** (`generalist/web/content/blog`, .md count), not the
  "448+" sometimes quoted. Sitemap blog count 429 (11 extra = category/route pages).
- Verdict: Google IS crawling and surfacing the corpus. This is not the agency/medical
  indexation pattern. No remediation-first exception applies.

### Conversion funnel — NOT the constraint
- **Leads `source='generalist'` (NOT 'general'; 'general' has 0 rows ever — the memory
  saying 'general' is stale), test-excluded per migration 20260819000003:**
  **15 leads / 90d** (Jun 4, Jul 4, Aug 7). Supabase Mgmt API, project dhlxwmvmkrfnmcgjbntk.
- `estate_kpis('2026-08-23'..now)` (post bot-gate, only trustworthy window): 167
  sessions, 146 humans, 103 engaged, 1 lead in ~2 days. 90d KPI figures
  (2,825 sessions, 15 leads) are pre-gate inflated on the traffic side; leads are real.
- ~15 leads from ~1,939 search clicks (222 G + 1,717 B) is a healthy small-site rate;
  more page-1 positions is the lever, not funnel surgery. (Known LeadForm
  invisible-label bug still LIVE here per §5.0a item 7; fix in Stage 2, cheap.)

### Structure vs competitors (from GSC query data, no paid API)
Top poor-position families (impressions >=30, position >10, 90d):
1. **Construction/contractor accounting SOFTWARE** family, the biggest by far
   (~4,300 impr across ~10 variants, pos 20-31: "construction accounting software" 842i
   pos 27, "accounting software for construction" 685i pos 30, "contractor accounting
   software" 568i pos 25...). SERP is owned by software vendors (Xero/Sage/QuickBooks)
   and comparison/listicle sites; software intent, accountant-secondary. Also a
   cannibalisation-watch item: construction is construction-cis's niche (R.5 rule 4).
2. **CGT reporting 2026** ("hmrc cgt reporting requirements/deadlines 2026", 317i pos 13
   + 227i pos 18): winnable, publisher/firm-guide SERP, nearest to page 1.
3. **Service charge accounts/accounting** (207i pos 79 + 191i pos 71): specialist
   block-management accountants dominate; needs a real pillar or NO-PAGE.
4. **Xero vs QuickBooks UK** (240i pos 88 + 156i pos 81): comparison-site SERP, weak fit.
5. **ACCA vs ICAEW** family (~660i pos 22-26): professional bodies/education sites; info
   traffic, low commercial value.
6. **Local St Albans** ("corporation tax advisers st albans" 215i pos 51, "business
   advisers st albans" 193i pos 68): local firms + directories; local landing page gap.
7. **Plumbers accountant** (250i pos 32), **MTD for income tax** (220i pos 85),
   **fixed fee accounts** (207i pos 67), **incorporation accounting** (169i pos 39).

### Tooling gaps — CONFIRMED, not fixed (Stage 2/3 prerequisites)
1. `sites/generalist.discovery.json`: legacy schema, **no `lanes` /
   `lane_negative_tokens`** keys (candidate_pool silently skips the lane gate).
2. `sites/generalist.json` `paths.topicPool` = **null** (Property points at a
   nonexistent doc too; author the topic-pool doc as first Stage 3 artefact).
3. `scripts/track2_worklist.py` is a **Property REBUILD, not a flag pass**: hardcoded
   `docs/property/track2_universe_2026-05-23.md`, Property DONE-slug lists and
   Property cluster regexes (lines 22-57).

### Armed monitored windows — FROZEN, excluded from every sweep
`monitored_pages` site_key='generalist': **79 active rows with monitor_until in the
future (2026-09-10 to 2026-10-07)** + 109 already-flagged rows (expired from arming
purposes). The 79 are excluded from the Stage 2 equity sweep per §4.7; earliest
windows open 2026-09-10.

### Next (Stage 2, when authorised)
Optimisation baseline §5.0a on the existing 418-post corpus (house_positions currency
pass, corepage, SERP meta, equity-graded sweep minus the 79 frozen pages, GEO backfill
check, link hygiene, LeadForm label fix), then §5.1 discovery for the 28 C2 clusters.
DataForSEO balance ~$2.82 (08-25), pool run needs top-up (owner decision, open).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **44 commits** were on
the branch and not in `origin/main`.

**All 44 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'generalist/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'generalist/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Wave 4 net-new (gap-discovery batch) - WRITTEN + QA CLEAN 2026-07-09, AWAITING DEPLOY WORD

- First NET-NEW content wave (waves 0-3b were the parity/GEO programme). Source: gap discovery 2026-07 curated batch (13 topics; A13 company-car BIK STRUCK at page-level collision verify - limited-company-car-tax-relief-2025-26 already owns it, rejected in blog_topics, routed to rewrite/refresh).
- 12 pages written (single lane, batchSize 1, parallel worktree writers; COST-CONSCIOUS ADAPTATION: single combined brief pass per pick with full URL-liveness + statute-verify disciplines + one conductor gate, instead of the two-stage brief round - justified by the lighter statutory load).
- Slugs: cash-flow-management-small-business-uk, double-entry-bookkeeping-explained-uk, corporation-tax-paying-early-or-in-instalments-uk, do-i-need-a-separate-business-bank-account-uk, how-to-set-up-a-business-partnership-uk, what-is-a-balance-sheet-uk-sme, unique-taxpayer-reference-utr-uk, christmas-party-tax-rules-limited-company-uk, how-to-complete-and-submit-vat-return-uk, high-income-child-benefit-charge-business-owners-uk, late-payment-rules-small-business-uk, personal-tax-for-llp-members-uk.
- HP locks at gate: SS3.A CT payment timing/QIP (rates 2.75/7.75/3.50/6.25 + thresholds verified), SS6.A salaried-member BlueCrest [2026] UKSC 18 (conductor-verified at caselaw.nationalarchives.gov.uk). Base rate 3.75% triple-verified (2 HMRC definitions + BoE Dec 2025 minutes via QA).
- QA (4 agents + tone/GEO review): real catches fixed manager-direct - A3 QIP 4th-instalment 14 June->14 July + CT600-deadline boundary trim; A11 day-count parenthetical; A7 6 relative links -> absolute; A8 double-hyphen headings; A1/A6 GEO opener lifts; A6 writer itself caught the brief's stale CA 2006 thresholds (shipped verified 15m/7.5m/50). Verdicts 12/12 all_clear; predeploy gate PASS; link floor 0/0; build GREEN.
- monitored_pages registered (net_new, to 2026-10-07); blog_topics flipped written/used.
- NOTE: image fields intentionally empty - run scripts/blog_image_backfill.py for the 12 slugs around deploy.
- Backlog from this wave: F-20/F-220 AMAP 45p page (estate sweep), F-121/F-321 LLP-vs-Ltd BADR tense, F-280 reciprocal links, F-300 salary-dividend 2026/27 refresh, corpus twin-pairs (trial-balance identical H1 etc.) -> consolidation backlog (data-gated).
- >> NEXT: deploy on explicit owner word: ./scripts/deploy-and-index.ps1 -Site generalist, then IndexNow the 12 URLs.

## Corpus + structure (as of 2026-06-12)

- ~322 blog posts + fundamentals section (`generalist/web/content/blog` + `content/fundamentals`; 383 mapped slugs), 193 city pages, 7 PDF templates, `/blog/stage/*` navigation.
- Keyword intel: 199 topics in the blog_topics pool (config prompts still carry agency→generalist rewrite TODO).
- Experiments: `calc_promo_inline` LIVE (first generalist experiment, both arms verified in prod). Nurture engine composed but DORMANT (collect-only).

## Search/optimisation state

- **Data**: GSC + Bing query data flowing to Supabase. NOTE: GSC was never ingested for this site until 2026-06-12 (the table had 2 rows); always check ingestion recency before judging "no demand".
- **SERP meta program batch 1 + tail (2026-06-12)**: 61 pages re-titled/re-described from fresh 90d GSC + Bing query data (39 batch-1 + 22 tail covering every page ≥8 combined impressions), deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d outcome verdicts via weekly_run from ~2026-07-10.
- **SERP meta batch 2 (2026-07-08)**: 12 pages (fresh worklist minus batch-1 cooldown), Opus copy + Sonnet adversarial QA, DEPLOYED + IndexNow'd; monitored to 2026-10-06. One page PULLED from the batch: can-a-director-claim-badr-after-leaving-role-2-years-ago body cites a stale 14% BADR rate (needs factual fix before any meta pass). Estate readouts: docs/_engines/meta_batch1_verdicts_2026-07.md + OPPORTUNITY_READOUT_2026-07.md. Batch-1 26d pre-read: imp 2,931->4,027 but 0 Google clicks SITE-WIDE (7,656 imp since 06-12, 0 clicks); biggest content play = construction accounting software cluster (~1,800 imp on one page at pos 20-32, EXPAND).
- **Factual corrections shipped same day**: `confirmation-statement-late-penalty-companies-house` fully rewritten (page wrongly presented annual-accounts penalty bands as CS01 fines; GOV.UK-verified rewrite). AMAP 45p→55p (FA 2026, from 6 Apr 2026) corrected on `employee-mileage-45p-tax-free-rules` (rewritten, GOV.UK-verified), `can-i-claim-mileage-limited-company-director` and `accountant-for-delivery-drivers-uk` (back-patched incl. recomputed worked examples).
- **Content-gap follow-ups**: `docs/generalist/opportunity_register_meta_2026-06-12.md` (register only, no edits yet — 92 entries).

## Known pending

- ~~Wider FA-2026/AMAP stale-figure sweep across the rest of the corpus~~ **SUPERSEDED / DONE 2026-06-30**: full-corpus factual-accuracy remediation completed (all 356 unverified/legacy posts audited, 281 corrected + 3 fabrications rewritten, build green, UNDEPLOYED). See `PARITY_PROGRAMME_HANDOVER.md` §4c + `factual_audit_2026-06-30.md`.
- Net-new/rewrite content programs: not yet onboarded for this site (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).

## Blog audit + rewrite program (2026-06-12)

- Provenance: 363 claude-supabase (low confidence, originates from a monolithic snapshot commit) + 3 deepseek consolidated-generator pages.
- Blind quality audit: claude corpus is sound (3 a_star / 3 acceptable). The 3 deepseek pages showed the quality step-down the grader detected blind.
- Manager-direct back-patches committed: live CGT-rates page mid-sentence truncation completed; payroll pricing table removed + RTI penalty bands corrected (GBP200 for 10-49 employees); Employment Allowance single-director exclusion fixed.
- `docs/generalist/house_positions.md` AUTHORED: 13 sections, every load-bearing figure source-verified, adversarial Opus verification passed 22/22, LOCK-READY. Status: awaiting user lock before rewrite waves begin.
- HEADLINE FINDING: employer NIC is 15% above GBP5,000 secondary threshold from 6 Apr 2025; the corpus 13.8%/GBP9,100 figures are stale on approximately 57 pages (sweep queued, arithmetic changes, advisory-grade rework needed).
- Rewrite worklist: `docs/generalist/rewrite_worklist_2026-06-12.md`. Tier A+B = 26 pages (waves GEN-R1/R2); 10 executable immediately after HP lock, 16 in SERP meta cooldown until 2026-06-26; 344 pages on GSC-maturation watch.
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.

## Track 2 / R.5 progress 2026-08-25 (evening session)

- Stage 2 started: corepage homepage pass SHIPPED to main (`6c86fc28`), rewrite batch 1
  SHIPPED to main (`b6c151b8`): 8 top-ROI pages (Bing page 1 / Google invisible), full
  overhaul, dual-QA passed. Live factual errors found and fixed in the OLD pages: VAT FRS
  (7, incl. pandemic-era hotel rate and inverted 16.5% discount claim), dividend pair
  (3 arithmetic errors), NI page (false pension-entitlement implication).
- Stage 3 research COMPLETE for all 28 absorb niches: 6 family dossiers frozen (creative,
  trades_transport, care_education PROVISIONAL, personal_care_fitness, retail_product,
  specialist_professions) in `docs/generalist/dossiers/`. ~57 planned surfaces.
  house_positions.md sections 14-22 lock all families' ground truth.
- Deltas open: care_education D1 harvest (~$0.40) + small gate-blocked pulls (~$1 total),
  next budget day. Daily $5 DataForSEO gate was the binding constraint, respected by all
  agents; account balance ~$50.
- HELD BACK from rewriting (estate-assignment questions, owner bundle): forex-traders
  page (crypto site's ground, generalist out-ranks the pilot), dentistry-compliance
  (dentists' ground), 2x CGT-on-property pages (property site's ground).
- Next: remaining rewrite batches from the worklist (298 eligible), research packs +
  language pass per cluster, then net-new waves. Nothing deployed; all owner-gated.

## Track 2 / R.5 progress 2026-08-25 (late session, PAUSED here)

- Rewrite batches 1-3 SHIPPED to main: 30 legacy pages fully overhauled, dual-QA'd,
  fix lists applied (`b6c151b8`, `33ef519b`, `369dc4ee`). Live factual errors fixed
  across the corpus incl. wrong BIK band tables, inverted marginal-relief formula,
  fabricated FTR/HETV relief rates, stale AIA-reversion claims, wrong dividend
  arithmetic, plus the stale-figure class sweep (SPT, Companies House fees, 18 files).
- creative_performers wave COMPLETE end to end (`c4afb3d5`): 9 surfaces (4 reframe,
  3 net-new, 2 extend), dual-QA + all fixes applied. First of 6 niche waves DONE.
- trades_transport wave READY TO WRITE: packs + language spec frozen at
  docs/generalist/dossiers/trades_packs/ (9 packs; the SERP edge = zero worked
  examples anywhere in the field). NEXT ACTION: launch 9 Opus writers per pack,
  then dual-QA, exactly the creative-wave pattern.
- After trades: personal_care_fitness, retail_product, specialist_professions waves
  (dossiers frozen, packs not yet built); care_education needs its ~$0.40 D1 harvest
  (gate-blocked 08-25) before packs.
- Remaining rewrite worklist: ~270 lower-ROI pages (top-40 ROI set is done except
  the 4 held-back cross-site pages: forex-traders, dentistry-compliance, 2x
  CGT-on-property; owner decision pending).
- NOTHING DEPLOYED. Owner will deploy at end. Local commits ready to push.
- Note: research packs reference the 08-25 scratchpad GSC/Bing pulls; a resumed
  session should re-pull fresh data if more than ~a week has passed.
