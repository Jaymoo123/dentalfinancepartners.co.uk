# Generalist (Holloway Davies) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** www.hollowaydavies.co.uk · Vercel project `holloway-davies` · site_key `generalist` · brand: distinct generalist design system (off-white + ink + orange, Geist Sans), james-holloway byline (credential designation removed 2026-06-29).

> **LATEST (2026-06-30, local / UNDEPLOYED):** active **Property-standard PARITY programme** — full handover in **`docs/generalist/PARITY_PROGRAMME_HANDOVER.md`**. Done this run: Waves 0-2 + GEO schema/code; site-wide credential strip; **full factual-accuracy remediation COMPLETE** (356 audited, 281 corrected + 3 fabrications rewritten on-URL); **Wave 3 + 3b GEO keyTakeaways backfill COMPLETE** — answer-boxes now on ALL 356 audited posts (Wave 3 = 74 clean, committed `1e60bf37`; Wave 3b = 282 now-corrected, run `wf_377cb19e-2ad`, incl. regenerating 5 stale pilot boxes); build green, `npm test` 33/33, render/schema verified. Records: `wave3_geo_2026-06-30.md`. **Wave 3b's QA flagged ~60 residual BODY issues** (stale-as-current figures the 1st remediation missed; answer-boxes clean) → `wave3b_body_issues_2026-06-30.md` = **remediation round 2 (manager-direct, owner steer pending).** Then Wave 4 GEN-R2 rewrites (needs fresh GSC pull) or deploy (gated). **Spend posture relaxed 2026-06-30 (owner upgraded); still no waste.**

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
