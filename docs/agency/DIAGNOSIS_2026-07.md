# Agency Site Diagnosis — 2026-07 (medical-playbook replay)

## RESUME HERE — LOCAL FIX WAVE COMPLETE 2026-07-08, BUILD GREEN (466/466). AT OWNER DEPLOY GATE.
- **Root cause (final, post-F8):** crawl-budget/authority starvation on a weak young domain. Quality fork DISPROVEN by direct review of all 26 crawled-not-indexed pages (0 need strengthening → `f8_cohort_assessment.md`). NOT discovery (sitemap fetched daily), NOT linking, NOT penalties/noindex/firewall (pre-gate PASS).
- **Done locally (uncommitted, undeployed):** F1 blog-index SSR (306 links), F2 sitemap lastmod pin, F3 Organization sameAs (Companies House), F6 CIS glossary removed, F9 BADR/CGT 14 corrections (NIC was already clean), F10 van-post CTAs x2, F14 og:images (19 /agencies/* + calculators) + BADR calc default year 2026/27.
- **OWNER GATE (all shipping actions):** (1) sign off deploy of the above; (2) F4: Vercel dashboard → Domains → set apex redirect Permanent 308; (3) F5: GSC UI sitemap resubmit + Request Indexing on ~10 core pages + glance at Security & Manual Actions (API can't see it); (4) after deploy: IndexNow submit.
- **Open backlog:** F7 orphan cross-linking (Batch C, low priority — linking not the lever); F8 marginal items only (see assessment top-5); F11 faceless off-site authority = THE growth lever now; F16 content wave GATED on index recovery; F17 NEW: calculator fleet tax-year rollover to 2026/27 (needs verified params per calc; only BADR default fixed); F13 CLOSED (Bing AI endpoint does not exist on api.svc — probed 6 method names, all 404); `remittance-basis-dubai` FIG review deferred.
- **Monitoring:** baseline 2026-07-08 = indexed 18/433, ~32 impr/day, 2 clicks/51d, leads 0. Verdicts at 14d (~07-22) and 28d (~08-05) per synthesis §monitoring; failure test = indexed ≤25 at 28d post-deploy ⇒ authority wall confirmed, escalate F11.
- Plan: `~/.claude/plans/the-other-day-we-proud-finch.md`

## Invariants
1. **Fresh-data rule (owner, 2026-07-08):** no visitor/traffic conclusion from stored Supabase snapshots. Re-pull GSC + Bing first; every lane cites data-through dates.
2. Read-only diagnostics; idempotent; outputs in `.cache/agency_diag/` (uncommitted) + `docs/agency/` (committed).
3. Fable architects/integrates only; Sonnet agents execute; Opus judges/synthesises.
4. One-variable fix sequencing: discovery batch ships alone; content/SSR changes ship after, outside the signal window.
5. Deploy + GSC-UI actions gated on owner sign-off.

## Data-trust header
| Feed | Data-through (refreshed 2026-07-08) | Status |
|---|---|---|
| gsc_query_data (agency) | **2026-07-06** (+184 rows) | FRESH — `python -m optimisation_engine.ingestion.ingest_gsc_queries agency --days 50` |
| gsc_page_performance | **2026-07-06** (+136 rows) | FRESH — `...ingest_gsc_pages agency --days 50` |
| bing_query_data | **2026-07-08** (+126 rows) | FRESH — `python -m optimisation_engine.clients.bing_query_client agency` |
| ga4_page_data | empty | expected (GA4 not configured; first-party analytics only) |
| bing_ai_performance | empty | BLOCKED estate-wide: `GetAiPerformance` 404s (wrong method name in bing_query_client.py, maybe `GetCopilotStats`) → backlog item |
| first-party web_sessions/web_events | live | 307 sessions / 39 human; leads(source='agency') = 0 all-time |
| sites row | sc-domain:agencyfounderfinance.co.uk | OK — GSC API property live (DNS-verified) |

All battery lanes cite these dates.

## Battery results (one line each; full detail in docs/agency/*.md + .cache/agency_diag/)
- **B1 Google** (data→2026-07-06): 51d = 1,908 impr / 2 clicks / 40 of 433 pages with data (9.2%); trend FLAT; homepage pos 51; generalist same window = 10x impr / 13x pages / 26x clicks. Verdict: structural discovery failure, not youth. → `google_read.md`
- **B2 Bing** (data→2026-07-08): 150 impr / 1 click / 18 pages; CTR 0.7% vs medical 9.9%; zero commercial "agency accountant" head-term presence; content ranks like generic tax advice. → `bing_read.md`
- **B3 Index coverage** (swept 2026-07-08, 433/433, no quota hit): indexed 18 (4.2%) / crawled-not-indexed 26 / discovered-not-indexed 214 (49%) / unknown 175 (40%). Homepage indexed; /agencies/* 1 of 20; fundamentals/guides/calculators/founder-stories/locations = 0 indexed; /blog hub unknown. ~22 pages indexed-then-deindexed (quality triage). Orphan/unknown correlation NONE (inverse). Root cause: crawl-priority/quality rejection on weak-authority young domain, NOT discovery, NOT internal linking. → `index_coverage.md`
- **B4 Technical/AI**: 4 HIGH — AG-T-001 blog index JS-only (0/306 post links in server HTML), AG-T-002 sitemap `new Date()` lastmod churn (118 URLs), AG-T-003 Organization missing sameAs, AG-T-004 apex 307→should be 308. +3 MED / 2 LOW / 6 INFO. → `technical_sweep.md`
- **B5 Leads**: funnel dies at CONVERSION. 107 human sessions (accelerating 28→79 Jun→Jul), 1 form_start, 0 submits ever; 50% of human entries on one generic vans post with no CTA path to form; honeypot SAFE (enquiry_ref, not Property's company_url bug); email trigger covers agency. → `lead_read.md`
- **B6 Opportunity**: 5 clusters (PR-vertical strengthen, AIA calculator, exit/BADR, MTD Xero, UAE corp tax); ALL gated behind index recovery. → `opportunity_read.md`
- **B7 Inlinks**: 163/439 routes (37%) editorial orphans — glossary 25/25, guides 8/8, founder-stories 10/10, locations 7/7, calculators 7/8, agencies 11/19; related-posts = same-category echo chambers; 0 broken links. → `inlink_read.md`

## Step ledger
- 2026-07-08 P5 pre-gate: PASS — no manual-action evidence (API can't fully see; owner UI check bundled with F5 gate), sitemap lastDownloaded TODAY (2026-07-08, no medical-style staleness), Googlebot 200s + vercel.json clean, zero noindex. → `.cache/agency_diag/pregate_checks.json`
- 2026-07-08 P5 AGY-F9 (manager-direct): employer NIC already correct (15%/£5,000 everywhere — memory hit-list of ~45 was stale). Applied 14 BADR/CGT corrections across 7 files (10%→18% BADR residue, 20%→24% CGT-above-BADR, one wrong £150k→£60k calc). Encoding verified. `remittance-basis-dubai` FIG flag DEFERRED (needs FIG-regime research, not a patch).
- 2026-07-08 P2: tools ready. index_coverage.py needs no changes (`python -m optimisation_engine.snapshot.index_coverage agency --skip-bing`; sitemap = 433 URLs). New `scripts/agency/lead_attribution.py` + `40_lead_attribution.sql` (first-party web_sessions/web_events, no GA4). RAW: leads(source='agency') = 0 all-time; web_sessions = 307 total / 39 human / 302 unique visitors.
- 2026-07-08 P0: ledger created; `.cache/agency_diag/` created; `scripts/agency/00_staleness.sql` cloned + run; sites row verified. Empty niche.config verification fields = non-blocker (DNS-verified property confirmed).

## Known smells (pre-battery, unconfirmed)
- 90d to 2026-06-12: 828 impressions / 0 clicks / 20 pages with signal (STALE figure — re-measure)
- ~45 posts stale employer NIC 13.8%/£9,100; 2 pages 10% BADR; `remittance-basis-dubai` FIG flag
- sitemap.ts lastmod churn? llms.txt correctness? blog-index SSR depth (306 posts)? — B4 verifies
- Newsletter retired; net-new/rewrite engines never onboarded
