# wills-probate (Estate Planning Specialists) site state

Last updated 2026-09-28 (phase 0 parity). **The site is LIVE.** Every line below
this block that says "not deployed", "no Vercel project", "pre-launch" or
"placeholder brand" is stale and kept only as history.

## 2026-09-28 - truth block (silent-sites agent)

- **Live since 2026-09-25 23:17:47 UTC**, `www.estateplanningspecialists.co.uk`. Exactly one READY
  production deployment ever: `dpl_8vWqYziuzdftcRdE2Hz8nRSQayWJ`, commit `b86a990a`. Vercel project
  `estate-planning-specialists`, id `prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G`. The launch rode an unrelated
  commit ("drop the daily nurture digest cron"), which is why nothing in the repo recorded it.
- **Search Console has data.** 90 days to 2026-09-27: **1,135 impressions, 2 clicks**, 113 pages,
  520 queries, all of it since 2026-09-26. 09-26 = 285 impressions, 09-27 = 850 and 2 clicks. Top
  pages are all blog: executor fees, the 7-year gift rule, the probate application form (1 click at
  position 29.8), Scottish intestacy (1 click at position 7.0). Query demand skews to free-will
  intent the site does not sell.
- **Bing: registered and verified, zero rows.** `GetRankAndTrafficStats`, `GetQueryStats` and
  `GetPageStats` all return an empty set. Nothing to fix.
- **Our own analytics and leads are both dead, one cause: the Vercel project has ZERO environment
  variables.** No `SUPABASE_URL`, no `SUPABASE_SERVICE_ROLE_KEY`, so
  `packages/web-shared/analytics/server/createTrackHandler.ts:199-206` logs and returns 204 on every
  beacon, and `packages/web-shared/leads/server/createLeadSubmitHandler.ts:144-145` cannot insert a
  lead. The other 15 estate projects carry 21 to 39 keys each. This is config, not code: nothing in
  `wills-probate/web` is wrong on that path.
- **Database side is ready.** `sites` carries `wills-probate` / `www.estateplanningspecialists.co.uk`
  / `active = true`; `leads_source_valid` accepts `wills-probate`. Migration `20260724000001` is not
  in `supabase_migrations.schema_migrations` but its effects are live, so it was applied out of band.
  0 rows in `web_sessions`, 0 in `leads`, both explained by the missing env.
- What the parity research found (`docs/wills-probate/PARITY_RESEARCH_2026-09-28.md`): content
  complete (146 posts, calculators, intent kit, sticky CTA, AI-crawler allowlist all present); the
  design port was never run (0 tags, 0 `web-shared/design` imports); `public/llms.txt` still says
  "STUB (pre-launch) ... nothing here should be cited" on a live site; "partner network" caveat copy
  on `/contact` and `/complete`; og:image and publisher logo 404; `lead-nurture.ts` holds cumulative
  hours (`0,0,4,24,48,96,168,264`) in the gap field; no FAQPage on calculator pages.
- **Phase 0 is changing**: positioning to the firm voice, llms.txt rewritten on Property's model,
  `entity` key added, lead kit on every money page, gate removal, schema and canonicals, og:image,
  nurture timing to `0,0,4,20,24,48,72,96`, AdSense and GA4 wiring. Detail:
  `docs/wills-probate/PHASE0_2026-09-28.md`.
- **Fix list not owned by the builder** (manager or owner): (1) set the env vars on
  `prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G` from the `charities` baseline, production and preview, then
  redeploy, because env changes need one; (2) after that deploy, visit the site once and confirm
  `web_sessions` has a row, not just that the keys exist; (3) seed `monitored_pages`, currently zero
  rows, starting with the 113 pages GSC already sees; (4) no schema work, both migrations are live;
  (5) GA4 property and AdSense approval sit with the plumbing agent. Full detail:
  `docs/_engines/PHASE0_SILENT_SITES_2026-09-28.md`.

---

## History below (pre-launch, retained)

Last updated 2026-08-04 (CONTENT BUILD COMPLETE, 146 posts; Phase-6 code prep
DONE; remaining = owner externals at G1).

brand_locked: true

Placeholder brand "Probate Compass"; all content bodies brand-agnostic (zero
brand-name mentions); real brand and domain decided at G1 pre-deploy. Site
scaffolded + calculators + pillars + research assets committed on
`expansion/phase-0`. Content: **complete, 146 posts** across all 7 categories
(Probate Process, Making a Will, Inheritance Tax, Executors, Intestacy,
Pensions and IHT 2027, Power of Attorney); wave 4 batches B5/B6 plus QA and
figure-reconciliation fixes landed `fb66e0bd` through `3319bfc4`. The earlier
"23 cards unwritten" / "stray untracked post" state is stale: everything is
committed, tree clean. Provenance: 89 of 146 posts tag
`generator: claude-fable-5`; the other 57 carry no generator field. A quality
audit found the untagged posts meet the same bar (correct arithmetic,
primary paragraph-level citations, zero fabricated statistics, zero
em-dashes), so this is a policy question for the owner under the Opus-only
rule (see `PHASE6_G1_RUNBOOK_2026-08-04.md` section (d)), not a quality
remediation. Deploy still gated on owner G1 (brand + domain), which owner has
NOT yet released.

**Phase-6 code prep done 2026-08-04** (mirrors the divorce-finances pass):
migration verified apply-ready and storage-prefix-safe (`wpc`, not `bfp`);
`blog_generator` internal-link slug list was stale/empty, regenerated from
the full 146-post corpus; `tsc --noEmit` and `npm run build` both clean (210
static pages); 4 posts with `metaDescription` over 160 chars trimmed; nurture
confirmed fail-closed without `CRON_SECRET`. Full detail and G1 runbook:
`docs/wills-probate/PHASE6_G1_RUNBOOK_2026-08-04.md`.

## 2026-08-25 — Port-branch merge: 29 commits now in main, site not deployed

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **29 commits** were on
the branch and not in `origin/main`; they are now in main.

This site has **no Vercel project** (verified 2026-08-25 by enumerating
`GET /v9/projects`: no project has rootDirectory `wills-probate/web`), so nothing is
deployed and nothing ships. The commits land at whatever deploy G1 eventually triggers.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'wills-probate/'`.

## Identity

- site_key `wills-probate` | placeholder display name **"Probate Compass"** | placeholder domain `www.probate-compass-placeholder.co.uk`
- IndexNow key registered in `optimisation_engine/indexing/config.py` (`37e0691c896359206d633a53c60877c0`); public `<key>.txt` file NOT yet created (created at G1 rename, per the real domain)
- Real brand + domain: TBD at owner gate G1

## Status (per `docs/wills-probate/TOPIC_POOL_2026-07-24.md`)

Topic pool ranked and wave-bucketed: wave1=14, wave2=13, wave3=28, wave4=64.

- [x] Content/ops engine registration (this pass, 2026-07-24): routing_safety,
      blog_generator site_config, GSC/Bing client maps, IndexNow config,
      spinup_site + spinup_site_check registries, `sites/wills-probate.json`,
      CI build matrix entry
- [x] wills-probate/web scaffold
- [x] Topic pool -> blog_topics seed (site_key=wills-probate)
- [x] All waves complete: 146 posts, all committed, tree clean
- [x] Calculators + pillar pages + research assets build
- [x] Phase-6 code prep (2026-08-04): migration verified, blog_generator
      internal-link slugs regenerated, build verified, corpus spot-guard
      clean, runbook written
- [ ] Migration apply (owner / SQL editor)
- [ ] Vercel project + domain (gated on real brand/domain decision at G1 — HELD by owner 2026-07-28)
- [ ] Fable-authorship policy decision (owner, see PHASE6_G1_RUNBOOK section (d))
- [ ] Test-lead cycle end to end
- [ ] Request Indexing / GSC + Bing verification (post real-domain attach)

## Notes

- All statutory figures locked in `optimisation_engine/blog_generator/site_configs/wills_probate.py`
  (`hallucination_zones`) must be quoted verbatim in generated content.
- Prohibited topics: equity release, pension product recommendations/transfers,
  contentious probate legal strategy, personal injury, claims management.
- Jurisdiction default: England and Wales; state explicitly where Scotland differs.

- 2026-10-02 Phase 0 pre-live gate (GEO programme): firm-voice, em-dash, pipeline-leak and engagement-claim sweep plus a rendered read at 1280/390 with fixes; local, committed, not deployed. Detail and open owner items: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 14.
