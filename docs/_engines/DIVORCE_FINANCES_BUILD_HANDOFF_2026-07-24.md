# Divorce-finances build handoff
Date: 2026-07-24. For a fresh agent continuing the build. Master process: `docs/_engines/SITE_BUILD_PLAYBOOK_2026-07-24.md` (read it in full first; all locked ground rules apply: Opus-only content on INHERITED model, faceless authority, brand DEFERRED to G1 never ask owner, wave batch size 1, no em/en dashes, coordination rules with the parallel wills-probate build on this same branch `expansion/phase-0`, never touch wills-probate/**).

## Owner directives given this session (live, binding)
- Wave-1 owner spot-check gate WAIVED: run waves 1-4 straight through without stopping.
- After waves: proceed directly to Phase 6 (nurture + Supabase migration + Vercel prep).
- Only remaining pause point: G1 (brand + domain + prod deploy sign-off).
- Fan out subagents for everything; keep manager context clean.

## State

### Phase 0 — COMPLETE, committed (753e5324 + 49e4826d)
- Research export: `optimisation_engine/niche_screener/out/divorce-finances_research_export/` (copied from cached run run_20260724T153514Z_137a71; out/ is gitignored, export exists on disk only).
- `docs/divorce-finances/TOPIC_POOL_2026-07-24.{json,md}` — 133 topics merged with competitor corpus; waves: 1=14, 2=40, 3=44, 4=35. Wave 1 = 7 heads + 7 strategic (5 retagged strategic-content, anchor to content/gov.uk tools).
- `COMPETITOR_CORPUS_2026-07-24.{md,json}` — 15 domains, 30 clusters; whitespace = money-mechanics (tax on divorce, worked examples, debt division).
- `CALCULATOR_DERIVATION_2026-07-24.md` — fleet of 5: divorce cost calculator, help-with-fees-checker (EX160), consent-order-cost-calculator, settlement-range-estimator, mediation-vs-solicitor-comparison. SKIPPED as tools (content only): child maintenance, spousal maintenance, pension sharing, house buyout, Form E, legal aid.
- `LEAD_REGULATORY_POSITION_2026-07-24.md` — VERDICT: PERMITTED. LASPO referral-fee ban = PI only; FCA CMC regime excludes family. Conditions: "we may receive a fee from the firm we introduce you to" disclosure beside consent checkbox; pensions information-only; NEVER build mis-sold-pension claims content; MIAM-bound referrals to FMCA-accredited mediators.
- `DATA_PR_SOURCES_2026-07-24.md` — 2 assets: UK Divorce and Financial Remedy Index (MoJ FCSQ) + UK Child Maintenance Tracker (DWP CMS). Pension sharing order volumes NOT publishable (MoJ withdrew table), no asset there.
- `FACT_VERIFICATION_QUEUE.md` — ~57 items queued (core copy 8, pillars 24, calculators 22, research 3). Known: calculators used CURRENT Help with Fees thresholds (£1,420/£2,145/£710, 50p taper, £4,250/£16,000 capital), not the derivation doc's stale pre-Nov-2023 figures; verify at Phase 3.

### Phase 1 — COMPLETE, committed 71ce5bb6
All exit criteria pass: build green, 45 site-local tests green, zero content pages, placeholders confined to niche.config.json, zero construction/cis refs. Key facts: site_key + lead source = `divorce-finances`; storage prefix `dvf`; placeholders display_name "PLACEHOLDER-DIVORCE-BRAND", domain "placeholder-divorce-domain.example"; company block = Ashfield Trading Ltd verbatim; partner null (in-house). Shared additive edits committed: root package.json workspaces (also carries the pending wills-probate line), experiments registry entry + divorce-finances.ts sibling. Deliberate deviations documented in the commit: composeLeadMessage keeps trade/subbieCount field names (estate-wide contract, user-visible prefixes neutralised); trade-types.ts filename kept empty (matches wills).

### Phase 2 — COMPLETE, committed in-repo at `divorce-finances/_staging/` (71ce5bb6; scratchpad copies are duplicates)
Staging root: `divorce-finances/_staging/`
- `divorce-calculators\` — divorce-finance.ts ground-truth module + format.ts + 5 tool files + registry.ts + tools.test.ts (27 tests passing via vitest.staging.config.ts; delete that staging config on port). MiniCapture comes free via shared Calculator renderer (tools carry ctaLabel).
- `divorce-research\` — both research assets: snapshot JSONs, CSVs, page.tsx + data/route.ts each, raw FCSQ zip + 25 CSVs in raw\ (working files, not deliverables). All figures parsed from primary CSVs.
- `divorce-pillars\` — 4 pillars (settlement guide 2,907w; cost of divorce 2,378w; pensions 2,636w info-only; consent/clean break 2,483w), wills-probate pillar format (frontmatter + HTML body), calculator cross-links by slug.
- `divorce-core-copy\` — 9 files: homepage, about, contact (fee disclosure + consent copy), thank-you, 4 /for pages (homeowners, business owners, separated parents money-only, over-50s), service-tiers (no pricing).
- All copy uses {{BRAND}} token only; no em/en dashes (grep-verified by each agent).
- Delete `_staging/` (and its raw\ working files) once Phase 3 integration lands.

## Next steps in order
1. Phase 3: integrate staged calculators/copy/research into site (Sonnet-tier agent); intent taxonomy category→tool mapping; sitemap; build + site-local vitest green (run vitest from site dir). Then Opus fact-verification pass over FACT_VERIFICATION_QUEUE (WebSearch, fix in place, tick with source URL), dash sweep, regulated-language sweep. Propagate corrected figures into engine SITE_CONFIG hallucination_zones. Commit.
3. Phase 4: engine registration (exact edit list in playbook; all additive; wills-probate build shares these files, commit promptly and small; include wills keys where lists are re-stated).
4. Phase 5: waves 1-4 NON-STOP (owner waived spot-check). Wave brief file + per-topic SERP briefs first; one Opus writer per topic; QA tracks A/B/C SEQUENTIAL after each wave; commit per wave.
5. Phase 6: nurture (two sequences), enrollLead, Supabase migration (re-read live constraint defs, include wills-probate keys), Vercel project (CLI not installed: `npm i -g vercel` first; Root Directory divorce-finances/web, team sitenudge-projects), spinup_site_check, test-lead cycle.
6. STOP at G1: present silent brand shortlist (prepare `docs/divorce-finances/BRAND_SHORTLIST_2026-07.md` before G1, mirror wills), domain, prod deploy sign-off.

## Coordination reminders
- Same working tree + branch as the wills-probate build; commit only divorce paths; `docs/*/**.json` are gitignored by root `*.json` rule, force-add pool/corpus style files (precedent set).
- Cluster pushes at session end (no push done this session).
