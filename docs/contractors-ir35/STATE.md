# contractors-ir35 (Contractor Tax Accountants) — site state

Last updated 2026-06-17 (**DEPLOYED + LIVE**). The 7th estate site, the first BORN on the standardised grid (machinery composed before launch rather than retrofitted). Built via `docs/_engines/SITE_SPINUP.md`; **LIVE at https://www.contractortaxaccountants.co.uk** (deployment `dpl_2yVWFsReapZveud5KYwsMj8hfD9W`, 2026-06-17).

## ⚡ RESUME HERE (next manager)

Launch build committed (`b8856199`) and **DEPLOYED 2026-06-17**. Live verification all green: all key routes 200 (home/calculator/research/glossary/location/blog/robots/sitemap/feed/llms), homepage serves real content (not the 404 trap), sitemap base URL = production domain, security headers present, **analytics ingest confirmed (21 web_events rows under site_key `contractors-ir35` → SERVICE_ROLE env set, /admin/analytics + estate console connected)**, an01 browser-pass ALL GREEN. Pre-deploy: build 153 pages green, vitest 39/39, spinup 12 PASS/0 GAP.

**Outstanding post-deploy items** (see "Post-deploy" section below): test-lead (Ahmad-protected), GA4, GSC/Bing props + sitemap upload, IndexNow + monitored_pages, real phone.

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

## DEPLOY — DONE 2026-06-17 (record + gotchas for the next site)

Deployed live with `VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=prj_AJhtTBB8SMdKluzfCNvwCCqU1yii vercel deploy --prod --yes` from the **repo root** (the repo-root `.vercel` points at Property, hence the env overrides). Build 43s, deployment `dpl_2yVWFsReapZveud5KYwsMj8hfD9W`, aliased to the production domain.

**Gotchas hit (this was the FIRST real deploy of a fresh monorepo Vercel project — fix these up-front next time):** the project existed but had never deployed, so its config was incomplete. The CLI's OAuth token is **rejected by the v9 projects settings API** (`invalidToken`), and the CLI has no command for these — so all three had to be toggled in the dashboard (or set with a real `VERCEL_TOKEN`):
1. Framework Preset `Other` → **Next.js**
2. Root Directory `.` → **contractors-ir35/web**
3. **"Include files outside the root directory in the build step" → ON.** Without it, only the rootDir subtree is copied into the build, so the `cd ../.. && npm install` step overshoots to `/` and npm dies with `Tracker "idealTree" already exists` (debug log shows `cwd /`). This is the non-obvious one — the 6 live sites have it on via auto workspace detection, which a fresh API-set project does not trigger.

Env already set: SUPABASE pair, SERVICE_ROLE, ADMIN_DASHBOARD_KEY, `NEXT_PUBLIC_SITE_URL=https://www.contractortaxaccountants.co.uk`. Project still NAMED `contractor-finance-partners` (cosmetic; rename optional). ADMIN_DASHBOARD_KEY value: `.cache/cfp_admin_key.txt` (hand to operator, then delete).

**Live verification done:** routes 200, headers, sitemap domain, an01 browser-pass ALL GREEN, web_events ingest confirmed (21 rows).

## Post-deploy — still open

1. **Test lead (Ahmad protection)**: before submitting, `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;` (keep `stitch_lead_to_session_trg` ON — under test). Submit form, verify row + consent fields + stitching, re-enable both triggers, DELETE the test row. Notify route CCs ahmadtirmizey@reflexaccounting.co.uk on EVERY leads insert (no source filter), hence the trigger window
2. GA4 property → measurement id → `niche.config.json` seo.google_analytics_id + `optimisation_engine/clients/ga4_config.py` → redeploy. GSC domain property + verification → niche.config + enable in gsc config. Bing import from GSC. **Upload sitemap (`/sitemap.xml`) in GSC**
3. IndexNow: DONE 2026-06-17 (`python -m optimisation_engine.indexing.submit_indexnow --site contractors-ir35 --from-sitemap` → 136 URLs, HTTP 202). Re-run after content changes.
4. monitored_pages — **DEFERRED on purpose.** Dry-run 2026-06-17 showed all 15 wave-1 baselines = 0 (no GSC/Bing history yet); the detector freezes the baseline at registration and only alerts on *drops*, so a 0 baseline is inert. Re-run once real rankings exist (~28d post-index, ≈2026-07-15) with: `python scripts/register_monitored_batch.py --site contractors-ir35 --slugs what-is-ir35 inside-ir35 outside-ir35 limited-company-vs-umbrella-contractor psc-limited-company-contractor-tax contractor-expenses-allowable-guide contractor-pension-employer-contributions how-to-choose-contractor-accountant off-payroll-working-rules-private-sector sds-status-determination-statement ir35-small-company-exemption flat-rate-vat-limited-cost-trader travel-expenses-inside-ir35 umbrella-company-holiday-pay contractor-pension-carry-forward --commit`
5. Set the real phone (placeholder `+44 20 0000 0000` in niche.config contact)
6. Optional: rename the Vercel project to match the brand; commit held-back shared engine-map registrations with the construction-cis/GEO batch

## Committed vs uncommitted (2026-06-17)

**Committed to main** (the self-contained launch build): the whole `contractors-ir35/` tree, `docs/contractors-ir35/`, `sites/contractors-ir35.json`, the experiments registry `packages/web-shared/experiments/registries/contractors.ts`, migration `20260616000001_rebrand_contractors_ir35.sql`, the Contractor Index crawler `optimisation_engine/ingestion/ingest_contractor_data.py`, and the blog_generator `site_configs/contractors_ir35.py` rebrand.

**Held back (entangled with other in-flight estate workstreams — commit with their batches):** the shared engine-map rebrand + registrations in `.github/workflows/ci-build-test.yml`, `optimisation_engine/indexing/config.py`, `clients/gsc_page_client.py`, `clients/bing_query_client.py` (also carries the new GEO Track-B Bing AI fetcher), `blog_generator/cli.py`, `blog_generator/routing_safety.py`, `scripts/frontmatter_lint.py`, `scripts/blog_image_backfill.py`. These mix in construction-cis registrations + the GEO program and are not needed for the deploy (the live build reads niche.config). The contractors host values exist in these files in the working tree; nothing about the deploy depends on committing them.

## Parked / post-launch

- Calculators fleet expansion; experiments composition (personalization needs IntentProvider port + live probes); wave 3 (419 pool topics remain); GSC/GA4-dependent engines; Serper topic enrichment
- Estate-wide deepseek llm_provider value sweep in the other blog configs (stale, path unused) — fold into the volume-model decision
