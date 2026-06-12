# contractors-ir35 (Contractor Finance Partners) — site state

Last updated 2026-06-12. The 7th estate site, the first BORN on the standardised grid (machinery composed before launch rather than retrofitted). Built to deploy-ready in one session via `docs/_engines/SITE_SPINUP.md` (written from this launch); **NOT YET DEPLOYED — deploy deferred by user to a single window when the domain is purchased.**

## Identity

- site_key `contractors-ir35` · display "Contractor Finance Partners" · planned domain `www.contractor-finance-partners.co.uk` (NOT bought)
- Brand: petrol/cyan primary `#0e7490` + amber accent (`#b45309` on white / `#fbbf24` on dark), distinct from Property's emerald and from the SERP leader's teal; spec in `DESIGN_MEMO_2026-06.md`
- Storage prefix **`cfp` FROZEN** (estate registry: ptp/dfp/ma/afl/aff/hd/cfp)
- Niche economics: CPC £28.12 (highest of all 7), all-specialist SERP; quality is the strategy

## Machinery (all composed, build green 51 pages, 19 tests)

- Analytics SDK (ConsentProvider/AnalyticsProvider/ConsentedScripts, opt-out posture), /api/track via createTrackHandler, no key literals (PF-07)
- /admin/analytics console (shared cookie auth) + /api/admin/login + /api/og (brand colours from config)
- buildSecurityHeaders; validateNicheConfig; assertFrontmatter; feed.xml + llms-full.txt
- LeadForm: rendered consent checkbox (LD-04), honeypot, visitor stitching, source `contractors-ir35`
- Blog apparatus (Dentists-pattern): /blog + /blog/[category]/[slug], canonical `/blog/{category-slug}/{slug}`
- Nurture: **n/a** (no newsletter surface — recorded, not built). Tools/calculators: **deferred post-launch** (first quality project = signature IR35 take-home/deemed-payment calculator, goldens-first). Experiments: not composed (registry addition is a web-shared change; do at estate experiments rollout)
- CI: in the build matrix. Vitest wired into `npm test`

## Data layer (live prod, verified)

- `sites` registry row + `sites_site_key_check` + `leads_source_valid` include the key (migrations `20260613000001/2`, applied 2026-06-12)
- blog_topics: 644 seeded (Google autocomplete expansion), 61 marked used by wave 1, 583 open
- Engine maps registered: GSC `_SITE_URL_MAP`, Bing `DEFAULT_SITE_URL`, IndexNow (key `fc84f134...` + public file). GA4 + gsc enablement = post-domain operator items. SITE_RULES/CORE_PAGES deferred until those engines first run here

## Content

- HP-LOCKED ground truth: `house_positions.md` (17 sections, FA 2026-verified, manager spot-checked at lock). One standing flag: Churchill Knight/Boox MSC litigation undecided (hearings Jun + Nov 2026) — re-check §13 before citing
- Wave 1 CLOSED 2026-06-12: 15 pages (9 pillars + 6 clusters) + the flagship replacing the fixture post; full QA chain (deterministic validator → 5 blind Opus judges → 2nd-judge re-verification → 4 Opus repairs + manager back-patches); tracker `WAVE1_TRACKER.md`
- Writing-model bake-off: `BAKEOFF_2026-06.md`. Result: Sonnet qualified for volume (Opus pillars/judging), **Haiku disqualified from content** (5/6 drafts factually unsound). **Volume-model policy OPEN**: user proposed DeepSeek for sandbox-period volume; decision pending (see bake-off doc for the economics evidence)
- 10 static /for/[type] pages + services/ir35-status landing pages from the original scaffold (petrol-reskinned)

## DEPLOY DAY RUNBOOK (everything below is the only remaining work)

Already done: Vercel project `contractor-finance-partners` (id `prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`) in the estate team (slug `sitenudge-projects` = team_XF9WAygZX7SGk9Fo4tOAnihH); 5 production env vars set (SUPABASE pair, SERVICE_ROLE, ADMIN_DASHBOARD_KEY, NEXT_PUBLIC_SITE_URL). ADMIN_DASHBOARD_KEY value: `.cache/cfp_admin_key.txt` (hand to operator, then delete the file).

1. Dashboard (operator, ~20s): project Settings → Build and Deployment → Framework Preset **Next.js**, Root Directory **contractors-ir35/web** (null framework = the estate 404 trap)
2. Deploy from REPO ROOT with `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` env override (never from inside the site dir), `vercel deploy --prod`. Note: local `vercel build` from inside web/ mis-resolves paths because vercel.json's installCommand does `cd ../..` — cloud build with rootDirectory is the proven path
3. Live battery: `node scripts/an01_browser_pass.mjs <url> cfp` (opt-out stops beacons) · console auth runtime check (/api/admin/login 303-wrong-key / cookie on right key / authed dashboard renders) · ingest verify (web_events rows site_key='contractors-ir35') · headers probe · feed.xml + llms-full.txt 200s
4. **Test lead (Ahmad protection)**: before submitting, `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;` (keep `stitch_lead_to_session_trg` ON — it is under test). Submit form, verify row + consent fields + stitching, then re-enable both triggers and DELETE the test row. The notify route CC's ahmadtirmizey@reflexaccounting.co.uk on EVERY leads insert (no source filter), hence the trigger window. No Property allowlist change needed (notify formats any source)
5. Domain: buy → Vercel domain attach → DNS; update NEXT_PUBLIC_SITE_URL env + redeploy
6. GA4 property → measurement id → `niche.config.json` seo.google_analytics_id + `optimisation_engine/clients/ga4_config.py` → redeploy. GSC domain property + verification → niche.config + enable in gsc config. Bing import from GSC
7. IndexNow submit the new URLs; register wave-1 pages in monitored_pages
8. `python scripts/spinup_site_check.py contractors-ir35` → expect all-PASS (only 09-vercel-link GAP remains today)

## Parked / open

- Volume writing model (user DeepSeek proposal vs bake-off Sonnet verdict) — blocks nothing until next wave
- Estate-wide deepseek llm_provider value sweep in the other 6 blog configs (stale, python path unused) — fold into the volume-model decision
- Calculators fleet; experiments composition; GSC-dependent engines; Serper topic enrichment — all post-launch
- Local repo branch `contractors-ir35-launch` is redundant (cherry-picked to main); delete at will (branch -D is deny-listed for the agent)
