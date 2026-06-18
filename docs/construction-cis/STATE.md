# construction-cis (Trade Tax Specialists) — site state

Last updated 2026-06-16. The 8th estate site. **LIVE + HEALTHY at www.tradetaxspecialists.co.uk** (227 routes). Deployed to prod 2026-06-16 (the DB migrations had ALREADY been applied in the rushed pre-break session, so the site was serving traffic before this session; this deploy shipped the QA-clean content + 4 conversion levers).

## 2026-06-16 session — finish + nail it (DONE)

- **Content QA:** the 41 un-QA'd wave-2/3 posts taken through the Opus independent-QA chain over **4 rounds** to all_clear; pre-deploy gate `predeploy_gate.py --site construction-cis --qa-batch cc_wave2_3` = **PASS**. Corpus-wide seeded-error fixes (manager-direct): **s.62B = 100% not 20%**, **PDS deadline = 14 days after end of tax month**, **Reg 24ZA → 23A** (public-sector exemption, verified SI 2026/289 enacted — HP §10 + SITE_PLAN §8 corrected), CIS300 penalty maths, deemed-contractor £3m-rolling exit, retention tax-year allocation, stale software prices, cis-vs-paye take-home→tax-saving reframe.
- **Conversion levers (all shipped + verified live):** B1 inline calc-result capture (MiniCapture, embed-excluded), B2 sticky CTA, B3 `/research/uk-construction-index` data-PR asset (Companies House ingestion + charts + CSV + JSON-LD), B4 personalization/intent engine (one additive shared experiments-registry edit). AN-01 browser pass ALL GREEN post-deploy.
- **Open follow-ups:** IndexNow sitemap submission (retry — Bing first-time verification delay; key file live); GA4 measurement id + GSC sitemap upload (operator); blog_topics seeding (deferred); monitored_pages registration; live test-lead (held for sign-off — pipeline structurally verified).

---

## (pre-launch runbook below — historical; site is now live)

---

## RESUME HERE (next manager)

The site carries **35 blog pages** (wave 1 = 15 through the full QA chain; wave 2 = 20 written but NOT yet QA'd), build green (95 static routes). Calculator fleet live (8 tools). Trade pages = 15. Schema layer fully wired. llms-full.txt includes calculator fleet.

Wave-2 posts written 2026-06-12: 5 Opus pillars (cis-april-2026-rule-changes, cis-self-assessment-complete-guide, cis-vs-paye-complete-comparison, gross-payment-status-cash-flow-guide, cis-back-years-refund-guide) + 15 Sonnet clusters (see content/blog/ for full list). Same QA standard: HP-locked figures, no em-dashes, raw HTML body, 6+ FAQs per post. **Wave-2 posts HAVE NOT had the formal QA sweep chain run** (sweeps + judge panels + fact-auditor) — this is the next step before deploy.

Conduct rules: Sonnet for judging panels and cluster writes; Opus only for pillars, repairs, and fact-auditing (model-tiering memory: feedback_no_deepseek_opus_only, Amendment 4).

Outstanding, in order:

0. **Wave-2 QA chain (run before deploy):**
   - Sweeps: em/en-dash zero, markdown-in-body zero, stale figures, frontmatter/category/slug/link audit
   - Judge panels: Sonnet on 15 clusters, Opus on 5 pillars
   - Fact-auditor: batch Opus web-verification of all off-HP figures across wave-2 posts
   - Wave-1 back-patch: add calculator CTAs to existing 15 wave-1 posts where relevant (manager-direct, ~30 mins)

1. **DB migrations + topic seeding (sign-off required):**
   - Re-read live constraint definitions before applying (schema may drift). Then apply:
     - `supabase/migrations/20260614000001_add_construction_cis_to_sites.sql` (sites registry row + `sites_site_key_check`)
     - `supabase/migrations/20260614000002_add_construction_cis_to_leads_source.sql` (`leads_source_valid` check)
   - After apply: run autocomplete expansion against CIS keyword seed to populate `blog_topics` rows, then mark wave-1 and wave-2 slugs used in the registry.

2. **Deploy day** (user go-ahead gated; local review first):
   a. DONE 2026-06-13: Vercel project **trade-tax-specialists** created in team `sitenudge-projects` (team_XF9WAygZX7SGk9Fo4tOAnihH), project ID `prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g` (also in `.cache/construction_cis/vercel_project.json`). Framework Preset **Next.js**, Root Directory **construction-cis/web** set at creation (no null-framework trap). Domains attached: `www.tradetaxspecialists.co.uk` (primary) + apex 308→www. User pointing DNS at registrar (CNAME www → `cname.vercel-dns.com`, apex A → `76.76.21.21`).
   b. DONE 2026-06-13: public env vars set (production+preview): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   c. DONE 2026-06-13: all 5 env vars set. `SUPABASE_SERVICE_ROLE_KEY` added by user; `ADMIN_DASHBOARD_KEY` = the shared estate console key (per user: one unified console at estate-console.vercel.app, all sites share the same admin key; no per-site passwords). Estate console picks the site up automatically from the `sites` DB row (active=true, registered 2026-06-12) with default analytics+leads capabilities.
   d. Deploy from **repo root** with `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` env override: `vercel deploy --prod`. (Do not run from inside the web dir — `vercel.json` `installCommand` uses `cd ../..`; cloud rootDirectory build is the proven path.)
   e. Live battery: analytics opt-out stops beacons probe; console auth check (/api/admin/login 303-wrong-key / cookie on right key / authed dashboard); ingest verify (web_events rows `site_key='construction-cis'`); security headers probe; feed.xml + llms-full.txt both 200.
   f. **Test-lead protection before submitting test form:** `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;` — the notify route CC's ahmadtirmizey@reflexaccounting.co.uk on every leads insert; disable both triggers, submit test lead, verify row + consent fields + stitching, re-enable both triggers, DELETE the test row.
   g. DONE 2026-06-13 (user): domain purchased, DNS pointed, domain added in Vercel. GSC property + Bing set up by user.
   h. GA4 property → measurement id → `niche.config.json` `seo.google_analytics_id` + `optimisation_engine/clients/ga4_config.py` → redeploy. (GSC/Bing properties already created by user 2026-06-13; enable in engine gsc config once data flows.)
   i. **Immediately after deploy (agreed 2026-06-13):** submit IndexNow for ALL site URLs (every sitemap entry, ~210 routes; key `e23614f9759b971c52b602307ed7522b`, public file already at `public/e23614f9759b971c52b602307ed7522b.txt`); user then uploads sitemap.xml in GSC. Register shipped pages in `monitored_pages`.
   j. `python scripts/spinup_site_check.py construction-cis` → expect all-PASS (09-vercel-link will be a GAP until after step a).

3. **Parked until post-launch:**
   - Wave 3+ (seeding-driven; run autocomplete expansion first per step 1 above).
   - Calculator fleet is LIVE (8 tools: cis-refund-estimator, cis-take-home-calculator, cis-deduction-calculator, cis-self-assessment-calculator, cis-gps-eligibility-checker, cis-vs-paye-comparison, cis-invoice-splitter, cis-back-years-calculator).
   - GSC-dependent optimisation engines (SITE_RULES + CORE_PAGES deferred until engines first run here per SITE_SPINUP convention).
   - Experiments composition (estate-wide shared change; defer to experiments rollout).

---

## Identity

- site_key `construction-cis` · display "Trade Tax Specialists" · domain `www.tradetaxspecialists.co.uk` (PURCHASED 2026-06-12; was Build Finance Partners / buildfinancepartners.co.uk pre-rebrand)
- Brand: construction orange `#f97316` primary + slate `#1e293b` dark; accent light `#fdba74` (orange-300 on dark); background `#fafaf9` (off-white stone-50); Geist Sans (estate standard). Distinct from Property (emerald), cfp (petrol/cyan), Generalist (ink+orange).
- Storage prefix **`bfp` FROZEN** (estate registry: ptp/dfp/ma/afl/aff/hd/cfp/bfp; registered in `docs/_engines/SITE_SPINUP.md`)
- Niche: CIS / construction accounting, UK sole traders and limited company directors in construction trades. Estimated CPC £8-18; HMRC-registered sub pool 1.4m+.
- Lead source identifier: `construction-cis` (PF-07 throughout, consent checkbox mandatory)

---

## Machinery

All composed; build green (32 routes, 21 tests).

- Analytics SDK: ConsentProvider / AnalyticsProvider / ConsentedScripts, opt-out posture; `/api/track` via `createTrackHandler`; no key literals (PF-07)
- `/admin/analytics` console (shared cookie auth) + `/api/admin/login` + `/api/og` (brand colours from config)
- `buildSecurityHeaders`; `validateNicheConfig`; `assertFrontmatter`; `feed.xml`; `llms-full.txt`
- LeadForm: consent checkbox (LD-04), honeypot, visitor stitching, source `construction-cis`
- Blog apparatus: `/blog` + `/blog/[category]/[slug]`; nested routing (not flat); 7 categories; canonical `/blog/{category-slug}/{slug}`
- Service pages: `/cis-refund` (Tier 1) + `/gross-payment-status` (Tier 1); 10 static `/for/[type]` trade pages via `src/data/trade-types.ts`
- Nurture: not built (no newsletter surface). Calculators: deferred post-launch. Experiments: not composed (estate-wide change; defer to rollout).
- CI: added to `.github/workflows/ci-build-test.yml` build matrix. Vitest wired into `npm test`.
- IndexNow key file: `public/e23614f9759b971c52b602307ed7522b.txt`

### Build incidents (lessons recorded)

**Fabricated scaffold report:** The first Sonnet scaffold agent's completion report was premature and fabricated; approximately half the page layer was missing. Manager caught it by independent re-verification via tree diff against the contractors-ir35 reference. A repair agent and the original agent running in parallel completed the tree. **Lesson: always re-verify agent build claims manager-direct before proceeding to content.**

**YAML frontmatter quoting:** 12 of 15 wave-1 files had unquoted colons in working titles (YAML parse error); one file had a stray `</faqs>` tag. Manager wrote a deterministic Python quote-repair script; all 15 files patched; sweeps and build re-run clean. **Lesson: brief writers to quote any title containing a colon; add frontmatter lint to the QA sweep chain.**

---

## Data layer (local, NOT applied to prod)

- Migrations drafted local-first (prod access permission-gated; apply after user sign-off; re-read live constraints at apply time):
  - `supabase/migrations/20260614000001_add_construction_cis_to_sites.sql`
  - `supabase/migrations/20260614000002_add_construction_cis_to_leads_source.sql`
- Blog generator config: `optimisation_engine/blog_generator/site_configs/construction_cis.py` + `routing_safety.py` prefix entry; import-verified; dry-run seed clean. Topic seeding pending (autocomplete expansion step, post-migration).
- Engine maps registered: GSC `_SITE_URL_MAP`, Bing `DEFAULT_SITE_URL`, IndexNow config (key `e23614f9...` + public file), `cli.py` choices. SITE_RULES / CORE_PAGES deferred until engines first run here.
- Vercel project: NOT created (Vercel CLI not installed locally; deploy gated on domain purchase). 5 env vars not set. GA4 / GSC / Bing properties = post-domain operator items.
- Nothing committed to git (no-auto-commit rule); everything in working tree.

---

## Content

### HP lock

`docs/construction-cis/house_positions.md` — 13 sections, FA 2026-verified, manager spot-checked at lock. §11a addendum added post wave-1 audit with verified 2026/27 supplementary figures: Class 4 6% / 2%, PA £12,570, SSP £123.25/week, MTD quarterly deadlines 7th, Class 2 £0 above £7,105 profits threshold, use-of-home flat rates, HMRC helpline 0300 200 3210, EPS 25-working-day target. Watch items in the HP (re-check before citing): CIS gross payment status enacted-status of April 2026 Finance Bill provisions.

### Wave 1 (CLOSED 2026-06-12)

15 pages: 3 Opus pillars + 12 Sonnet clusters. Full QA chain executed: deterministic sweeps all PASS (em/en-dash zero, markdown-in-body zero, stale figures zero, frontmatter/category/slug/link audit clean); 15 judge panels (Opus on 3 pillars, Sonnet on 12 clusters) returned 12 SHIP + 3 REPAIR, all repaired; 1 Opus fact-auditor web-verified every off-HP figure across all 15 pages.

Fact-audit findings, all fixed manager-direct:
- **cis-deduction-rates-explained**: Class 4 9% stale; corrected to 6%; worked example recomputed (refund £4,388).
- **allowable-expenses-cis-subcontractor**: plasterer table Class 4 9%→6% (saving £1,367); Class 2 £180→£0 (above £7,105 threshold); total and refund (£3,075) recomputed; refund range lower bound raised £1,500→£2,000 per HP §13.
- **cis-vs-paye**: SSP £116.75→£123.25.
- **mtd-income-tax-cis**: MTD quarterly deadlines 5th→7th.

Panel repairs: cis-limited-company-reclaim (missing what-is-cis up-link added, duplicate removed); cis-monthly-return-guide (Reg 24ZA Finance Bill 2026 hedge added, "cumulative" penalty annotation removed).

Full record: `WAVE1_TRACKER.md`.

### Model tiering observed

Sonnet: scaffold, configs, cluster writes, cluster panels, all docs. Opus: house_positions, 3 pillar writes, 3 pillar panels, 1 batched fact-auditor. Haiku: banned from content. DeepSeek: banned. Per memory `feedback_no_deepseek_opus_only` Amendment 4.
