# Medical — program state (living heartbeat)

The single living state doc for the Medical site (Medical Accountants UK). The
methodology lives in the shared engines (`docs/_engines/NETNEW_PROGRAM.md`,
`REWRITE_PROGRAM.md`, `ENGINE_MAP_AND_ONBOARDING.md`); this doc holds only the
site-specific WHAT and the heartbeat. Ground-truth facts live in
`docs/medical/house_positions.md`, never here.

Last updated: 2026-07-17.

## Heartbeat 2026-07 (diagnosis + fix wave + early check)
- 2026-07-06: full SEO/indexing diagnosis (`DIAGNOSIS_2026-07_SYNTHESIS.md`) — root cause Google discovery failure (103/112 never crawled). Fix wave SHIPPED same day (6d0c1930 + 4702b8bd): sitemap lastmod pinned, llms.txt de-phantomed, blog SSR all posts, orphans cross-linked, 5 new posts (corpus now 78). Deployed dpl_HHomcnfjnDbC9bRB9A3878r7HdST.
- 2026-07-17 EARLY CHECK (fresh GSC + Bing + 40-URL inspection sample): PARTIALLY WORKING. All 5 new posts "Submitted and indexed" (4 earning impressions); sitemap re-downloaded 07-09 (97→117 URLs, 0 errors); impressions 42→68.8/day, clicks ~1.2/day; Bing 38→43 pages / 706→945 impr / 70→90 clicks; "gp accountants" pos 54.5→49.0. BUT all legacy core pages + all 24 sampled previously-unknown URLs STILL "unknown to Google" (~11/117 indexed). Action: confirm owner actually did GSC-UI Request Indexing (MED-F2); if done and still unknown at ~28d, authority-wall branch triggers (pivot to faceless off-site authority). No hard watch windows (owner call 2026-07-17) — check anytime.
- UNDEPLOYED: /research routes (commit 4aa24075, 404 live) + gap-fill pillar `private-practice-incorporation-complete-guide` (f7dda599, currently 301s to medical-practice-incorporation-step-by-step live).

## Site facts
- Brand: Medical Accountants UK · domain `www.medicalaccounts.co.uk`
- Vercel: project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n` (org `team_XF9WAygZX7SGk9Fo4tOAnihH`), project.json at `Medical/.vercel/project.json` (note: at `Medical/.vercel/`, not `Medical/web/.vercel/`; rootDirectory = `Medical/web`)
- GA4: `G-CQF7KFZ1P6` · IndexNow key `8ced3150f417cef04367b717f0d21dc1` (key file at `Medical/web/public/8ced3150f417cef04367b717f0d21dc1.txt`)
- GSC property: `sc-domain:medicalaccounts.co.uk` (canonical owned property; see Onboarding below)
- Audience: UK GPs, salaried/partner; hospital consultants; private-practice owners; locum doctors; junior/training doctors
- Existing corpus: 46 blog posts (GP-heavy, broad-but-shallow), 9 categories, `/for-{gps,consultants,locum-doctors,junior-doctors}`, `/free-practice-health-check`, `/calculators`, `/nhs-pension`, `/medical-guides`, `/services`, `/locations`

## Onboarding status (engine-readiness) — 2026-06-03

**Done**
- GSC property confirmed `sc-domain:medicalaccounts.co.uk` (the OAuth account owns it as siteOwner). The Supabase `sites.gsc_property_url` for medical was ALREADY correct; the only stale reference was the cosmetic `site_url` LABEL in `gsc_page_client._SITE_URL_MAP['medical']` (was the dead `medicalaccountants.co.uk`, one letter group off), now fixed. The query fetcher reads the Supabase value, so ingestion was already correct. Re-ingested 90d: 373 query rows.
- `sites/medical.json` wave-runner config created + validated (Get-SiteConfig 'medical' loads; buildDir, blogContentDir, housePositions, Vercel projectJson, siteConfigJson all resolve).
- IndexNow key generated + registered: `optimisation_engine/indexing/config.py` medical entry + key file in `Medical/web/public/`.
- Discovery: `sites/medical.discovery.json` authored (medical topic tokens + 24 topic buckets + news/evergreen patterns). Competitors SERP-derived via `derive_competitor_universe.py` (top by head-query frequency: medicsmoney, r-m-t, nicholsmedical, sial-accountants, bw-medical, sandisoneasson, ramsaybrown, hawsons, jcssutton, azets, medicaccountants, gpaccountant, +others). `topic_gap_finder.py` + `topic_gap_filter.py` produced `docs/medical/topic_gaps_first_cut.md`: **668 filtered gap topics across 25 buckets** (raw first cut, an upper bound; the genuine medical-specialist signal sits in NHS pension, BADR/CGT, buying-into/selling a practice, incorporation, PCN/ARRS, locum, premises, GP partnership; the bulk of the "Other"/VAT/payroll buckets is generalist noise from azets/hawsons/medicaccountants that the brief agent filters by reasoning).

**In progress**
- `docs/medical/house_positions.md` rebuild to dentists-grade (## N sections, Statutory hooks + HMRC anchors + Practical writing rule per section, Verification log, Citations index): authored by an Opus sub-agent that verifies every statute/rate at primary source. Replaces the older thin 2026-05-21 rewrite-era doc; preserves the medical-specific facts (NHS GP goodwill-sale prohibition since 1 Apr 2004, GP premises/notional-cost-rent, type 1/2 pension certification, LSA/LSDBA).

**Deferred / not on the net-new critical path**
- Bing: ingest before running the rewrite ROI worklist (net-new feeds off competitor crawls, not own organic, so not a blocker here).
- `SITE_RULES[medical]` (competitor/brief_for_opus.py) + `CORE_PAGES[medical]` (corepage/config.py): add when first running the rewrite / core-page engines for medical. The captured head family ("gp accountants", "medical accountants uk", "gp practice accountants") seeds the core-page engine later.
- Formal `/run-netnew-wave medical <wave>` conductor command: driving Wave 1 manually as conductor for now.

## Coordination note (parallel agents, one repo)
- A medical REWRITE agent is live in the MAIN tree at the same time. Net-new and rewrite SHARE one file: `docs/medical/house_positions.md` (rebuilt here to dentists-grade, a strict upgrade; rewrite sessions read it but do not write it). Net-new flag/tracker files are `wave1_*`-prefixed (per `sites/medical.json` naming) and do NOT collide with the rewrite agent's `page_rewrite_tracker.md` / `site_wide_flags.md`. Neither agent commits or deploys; the human reconciles + ships.

## Signal read (why net-new first)
Medical is indexed and earning impressions for its head family ("gp accountants" 844 impr, "medical accountants uk" 177, "gp practice accountants" 101, "gp accountant" 63, "specialist medical accountants" 45) but ranks page 5-9 (positions ~53-94) with 0 clicks in 90d (1,408 impr / 53 distinct queries). Own-site organic is too thin for the rewrite/core-page engines to bite yet; net-new (gap pool from competitor crawls + cannibal-checks against the 46 indexed posts) is the right lead engine to build topical depth. Same shape dentists had.

## Net-new program heartbeat
- Wave 1 (proving wave): 9 pages WRITTEN + VERIFIED 2026-06-03, awaiting user commit + deploy. Build GREEN (next build exit 0; all 9 new pages statically generated under /blog/[slug]). Flat-link floor 0 HARD 404 (corpus-wide), six-check floor passed (0 em-dashes in the 9). Clusters: A NHS pension beyond the AA basics (McCloud / Scheme Pays deep-dive / partial retirement, §2.A/§2.D/§2.E), B GP surgery premises (notional vs cost rent / last-man-standing / own-vs-rent, §4 premises), C practice sale, goodwill & CGT (NHS goodwill ban SI 2019/251 / private-practice BADR / s.162 incorporation relief, §4+§5). HP extended at the gate: FA 2026 s.39 makes s.162 a CLAIMED relief from 6 Apr 2026; Premises Costs Directions 2024 locked. NOT committed, NOT deployed.
- Wave 2 (18 net-new): WRITTEN + VERIFIED + SHIPPED 2026-06-03. 6 clusters: A GMS funding (Global Sum/Carr-Hill, QOF, enhanced services), B PCN/ARRS (Network Contract DES, ARRS reimbursement, clinical-director pay), C other income (dispensing zero-rate VAT, private/non-NHS, PCSE reconciliation), D partnership accounts (reading accounts, drawings vs profit, basis-period reform), E joining (capital buy-in/parity, mutual assessment, financing + ITA 2007 s.398 interest relief), F leaving/mergers (retiring/cessation, mergers, expense-sharing). HP extended at the gates: §6.A dispensing-drug VAT zero-rating (Sch 8 Group 12). FUTURE HP-lock candidates (deferred): basis-period reform, qualifying-loan-interest-relief.
- COMMITTED + DEPLOYED 2026-06-03: commit fa8400ab on main (medical-scoped: 27 net-new + 46 Track-2 rewrites + onboarding). Deployed to production via root-.vercel-swap + `vercel deploy --prod` from repo root; live + aliased at https://www.medicalaccounts.co.uk (new pages return 200). IndexNow: 73 URLs submitted (HTTP 202).
- Pages live (net-new): 27 (9 Wave 1 + 18 Wave 2). Corpus now 73 posts.
- Pipeline PROVEN end-to-end for medical: GSC fix -> discovery (668 pool) -> picks + cannib GREEN -> per-cluster briefs -> conductor HP-lock gate -> pages -> six-check + flat-link floor + green build -> commit + deploy + IndexNow. Scaled from 9 (Wave 1) to 18 (Wave 2).
- Wave 1 surfaced a rewrite-engine backlog (gp-vat-registration £85k + "private = standard VAT" error; becoming-gp-partner Class 4 9%; GMC fee £425; legacy em-dashes; gp-accountant-cost pricing) - see wave1_page_tracker EXISTING_PAGE_STALE list.
- Link tooling note: medical is FLAT-routed, so the shared nested auditor (track2_link_audit / predeploy_gate link check) reports false-positive HARD 404s; use scripts/medical_flat_link_audit.py (added this onboarding) for the real floor.

- SERP META BATCH 1 (2026-06-12): 18 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd; 90-day regression watch in monitored_pages (to 2026-09-10); engine + methodology in docs/_engines/SERP_META_PROGRAM.md; content-gap follow-ups in docs/medical/opportunity_register_meta_2026-06-12.md.
- TRACKING FIX (2026-07-08): medical monitored_pages rows had CATEGORISED page_url paths (/blog/<cat>/<slug>) but the live site serves FLAT routes (/blog/<slug>) — every monitoring join silently missed. All 18 rows + 10 audit-row URLs corrected to flat; scripts/register_monitored_batch.py now emits flat paths for medical automatically. If registering medical pages, page_url must be /blog/<slug>. Analysis-only this cycle (signal window open); Bing is the working channel (batch-1 pages 276->625 Bing imp); no meta batch until fix-wave checkpoints (~07-20/08-03) read out.

## Blog audit + rewrite program (2026-06-12)

- Provenance: 46 track2-rewritten + 27 opus-wave, ZERO deepseek-era posts. Medical is the most mature corpus in the estate.
- No rewrite candidates identified: the entire corpus was either Track-2 de-staled or opus-wave written; the quality floor is already met.
- Flat routing onboarded into all 4 track2 wf.js targets: writer and QA prompts branch to flat /blog/slug links; track2_link_audit.py gained a flat mode; verified 0 HARD / 0 SOFT on the current corpus.
- generator: frontmatter field backfilled on all 73 posts; all pipelines write it going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.
