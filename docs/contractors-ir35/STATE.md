# contractors-ir35 (Contractor Tax Accountants) — site state

Last updated 2026-06-17 (launch build COMMITTED to main; domain connected; deploy is the only remaining gated step). The 7th estate site, the first BORN on the standardised grid (machinery composed before launch rather than retrofitted). Built to deploy-ready via `docs/_engines/SITE_SPINUP.md`; **NOT YET DEPLOYED — the Vercel `--prod` deploy is the single user-enforced gate.**

## ⚡ RESUME HERE (next manager)

The full launch build is **done, verified, and committed** (2026-06-17). Everything that can be done pre-deploy is done; the only outstanding work is the deploy itself plus the post-deploy operator battery.

Verified state at commit:
- **`npm run build` GREEN — 153 static pages**; **`vitest` 39/39 pass** (incl. IR35 take-home goldens: outside £71,821 / inside £69,890)
- **`spinup_site_check.py contractors-ir35` = 12 PASS / 0 GAP** (incl. `09-vercel-link`; `11-ga4-config` INFO is the expected post-domain operator item)
- Domain `www.contractortaxaccountants.co.uk` connected to the Vercel project; `NEXT_PUBLIC_SITE_URL` updated in Vercel production env (operator, 2026-06-17)

**Outstanding, in order:** the DEPLOY DAY RUNBOOK below (deploy is gated to the user — do NOT automate `vercel deploy --prod`).

## Identity

- site_key `contractors-ir35` · display **"Contractor Tax Accountants"** · domain `www.contractortaxaccountants.co.uk` (bought; exact-match keyword domain; head term "contractor accountant(s)" locked in `MONEY_KEYWORDS.md`)
- Rebranded 2026-06-16 from "Contractor Finance Partners" everywhere (niche.config, 50 blog `author:`, blog_generator site config, docs, CI; prod `sites` row UPDATEd via migration `20260616000001`). Engine maps (gsc/bing/indexnow) carry the new host in the working tree but their commit is held — see "Uncommitted / entangled" below.
- Brand: petrol/cyan primary `#0e7490` + amber accent (`#b45309` on white / `#fbbf24` on dark); CTA wordmark + icon at `web/public/brand/`. Spec in `DESIGN_MEMO_2026-06.md`
- Storage prefix **`cfp` FROZEN** (estate registry: ptp/dfp/ma/afl/aff/hd/cfp)
- Niche economics: CPC £28.12 (highest of all 7), all-specialist SERP; quality is the strategy

## Machinery (all composed; build green 153 pages, 39 tests)

- Analytics SDK (ConsentProvider/AnalyticsProvider/ConsentedScripts, opt-out posture), storagePrefix `cfp`; /api/track via createTrackHandler({ siteKey }), no key literals (PF-07)
- /admin/analytics console (shared cookie auth, ADMIN_DASHBOARD_KEY via timingSafeEqual) + /api/admin/login + /api/og (brand colours from config)
- buildSecurityHeaders; validateNicheConfig; assertFrontmatter; feed.xml + llms-full.txt
- LeadForm: rendered consent checkbox (LD-04), honeypot, visitor stitching, source `contractors-ir35`
- Blog apparatus (Dentists-pattern): /blog + /blog/[category]/[slug], canonical `/blog/{category-slug}/{slug}`
- CI: in the build matrix. Vitest wired into `npm test`

## Net-new surfaces (added 2026-06-16, mirrored from construction-cis, cyan, HP-accurate)

- **6 calculators** on a golden-tested 2026/27 tax engine `web/src/lib/calculators/tax2026.ts` (outside/inside IR35 take-home, umbrella-vs-limited, dividend tax, corp tax, salary-dividend) + embed + gallery
- **IR35 glossary** (DefinedTerm schema) at /glossary
- **10 location pages** (remote-national framing, no fake offices) at /locations/[slug]
- **UK Contractor Index** research/data-PR asset at /research/uk-contractor-index — real Companies House crawl (`optimisation_engine/ingestion/ingest_contractor_data.py`; IT consultancy SIC 62020 +43.1% 2016→25, all contractor sectors +64.1%, 136,515 TTM); Article+Dataset JSON-LD + CSV export
- **AEO/GEO to the Property standard**: robots.ts 40-bot AI allow-list + Disallow /api/; rich `public/llms.txt` + enhanced llms-full header; full schema suite (Organization+WebSite entity graph site-wide, FAQPage, HowTo, DefinedTerm, LocalBusiness, Dataset, Article, speakable `.tldr`); BlogPostRenderer FAQ JSON-LD; all routes SSG

## Data layer (live prod, verified)

- `sites` registry row + `sites_site_key_check` + `leads_source_valid` include the key (migrations `20260613000001/2` applied 2026-06-12; rebrand `20260616000001` applied 2026-06-16)
- blog_topics: 644 seeded; 225 marked used (`mark_used_wave2.py --apply` done), 419 open
- Engine maps registered: GSC `_SITE_URL_MAP`, Bing `DEFAULT_SITE_URL`, IndexNow (key `fc84f134…` + public file `web/public/fc84f134ebf231eaec2e26e2646a4ede.txt`, host `www.contractortaxaccountants.co.uk` in `indexing/config.py`). GA4 + GSC enablement = post-domain operator items

## Content

- HP-LOCKED ground truth: `house_positions.md` (17 sections, FA 2026-verified). Standing flag: Churchill Knight/Boox MSC litigation undecided (hearings Jun + Nov 2026) — re-check §13 before citing
- 50 blog pages (15 wave-1 + 35 wave-2), all through the full QA chain; Pexels images backfilled. Trackers `WAVE1_TRACKER.md` / `WAVE2_TRACKER.md`
- Writing model DECIDED 2026-06-12: Sonnet volume / Opus pillars+judging+repairs / Haiku banned from content (`BAKEOFF_2026-06.md`, memory feedback_no_deepseek_opus_only)
- Money-keyword map LOCKED: `MONEY_KEYWORDS.md`; FA-2026 stale-figure sweep done (dividend 10.75/35.75, thresholds £15m/£7.5m)
- 10 static /for/[type] pages + services/ir35-status landing pages, petrol-reskinned and money-keyword-optimised
- QA at launch: predeploy_gate PASS; Opus accuracy judge SHIP across calculators/glossary/research (0 critical/high); keyword_placement 50/50; word-count 50/50; meta descriptions ≤165 (residual = brand-suffix title length, acceptable)

## DEPLOY DAY RUNBOOK (the only remaining work)

Already done: Vercel project `contractortaxaccountants` (id `prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`) in the estate team (slug `sitenudge-projects` = team_XF9WAygZX7SGk9Fo4tOAnihH); production env vars set incl. `NEXT_PUBLIC_SITE_URL=https://www.contractortaxaccountants.co.uk` (updated 2026-06-17); domain attached; `.vercel/project.json` linked. ADMIN_DASHBOARD_KEY value: `.cache/cfp_admin_key.txt` (hand to operator, then delete the file).

1. Dashboard (operator, ~20s): project Settings → Build and Deployment → Framework Preset **Next.js**, Root Directory **contractors-ir35/web** (null framework = the estate 404 trap). **Confirm this before deploying.**
2. Deploy from REPO ROOT with `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` env override (never from inside the site dir), `vercel deploy --prod`. Local `vercel build` from inside web/ mis-resolves paths (vercel.json installCommand does `cd ../..`) — cloud build with rootDirectory is the proven path. **User-enforced gate — do not automate.**
3. Live battery: `node scripts/an01_browser_pass.mjs https://www.contractortaxaccountants.co.uk cfp` (opt-out stops beacons) · console auth runtime check (/api/admin/login 303-wrong-key / cookie on right key / authed dashboard renders) · ingest verify (web_events rows site_key='contractors-ir35') · headers probe · feed.xml + llms-full.txt 200s
4. **Test lead (Ahmad protection)**: before submitting, `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;` (keep `stitch_lead_to_session_trg` ON — it is under test). Submit form, verify row + consent fields + stitching, then re-enable both triggers and DELETE the test row. The notify route CCs ahmadtirmizey@reflexaccounting.co.uk on EVERY leads insert (no source filter), hence the trigger window
5. GA4 property → measurement id → `niche.config.json` seo.google_analytics_id + `optimisation_engine/clients/ga4_config.py` → redeploy. GSC domain property + verification → niche.config + enable in gsc config. Bing import from GSC. **Then upload sitemap (`/sitemap.xml`) in GSC** (operator does this)
6. IndexNow submit the new URLs; register wave-1 pages in monitored_pages
7. Set the real phone (currently placeholder `+44 20 0000 0000` in niche.config contact)
8. `python scripts/spinup_site_check.py contractors-ir35` → expect all-PASS

## Committed vs uncommitted (2026-06-17)

**Committed to main** (the self-contained launch build): the whole `contractors-ir35/` tree, `docs/contractors-ir35/`, `sites/contractors-ir35.json`, the experiments registry `packages/web-shared/experiments/registries/contractors.ts`, migration `20260616000001_rebrand_contractors_ir35.sql`, the Contractor Index crawler `optimisation_engine/ingestion/ingest_contractor_data.py`, and the blog_generator `site_configs/contractors_ir35.py` rebrand.

**Held back (entangled with other in-flight estate workstreams — commit with their batches):** the shared engine-map rebrand + registrations in `.github/workflows/ci-build-test.yml`, `optimisation_engine/indexing/config.py`, `clients/gsc_page_client.py`, `clients/bing_query_client.py` (also carries the new GEO Track-B Bing AI fetcher), `blog_generator/cli.py`, `blog_generator/routing_safety.py`, `scripts/frontmatter_lint.py`, `scripts/blog_image_backfill.py`. These mix in construction-cis registrations + the GEO program and are not needed for the deploy (the live build reads niche.config). The contractors host values exist in these files in the working tree; nothing about the deploy depends on committing them.

## Parked / post-launch

- Calculators fleet expansion; experiments composition (personalization needs IntentProvider port + live probes); wave 3 (419 pool topics remain); GSC/GA4-dependent engines; Serper topic enrichment
- Estate-wide deepseek llm_provider value sweep in the other blog configs (stale, path unused) — fold into the volume-model decision
