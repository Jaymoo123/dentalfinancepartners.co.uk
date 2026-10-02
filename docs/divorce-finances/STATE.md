# divorce-finances (Divorce Finance Specialists) site state

Last updated 2026-09-28 (phase 0 parity). **The site is LIVE.** Every line below
this block that says "not deployed", "no Vercel project", "pre-launch" or
"placeholder brand" is stale and kept only as history.

## 2026-09-28 - truth block (silent-sites agent)

- **Live since 2026-09-25 23:21:35 UTC**, `www.divorcefinancespecialists.co.uk`. Exactly one READY
  production deployment ever: `dpl_HUvX1HdWB3BajBeuG2th1E24XsBw`, commit `b86a990a`. Vercel project
  `divorce-finance-specialists`, id `prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP`. The launch rode an unrelated
  commit ("drop the daily nurture digest cron"), which is why nothing in the repo recorded it.
- **Search Console has data.** 90 days to 2026-09-27: **196 impressions, 0 clicks**, 43 pages, 84
  queries, all of it since 2026-09-26. 09-26 = 46 impressions, 09-27 = 150. Top pages are all blog:
  adultery and financial settlement (11), high-net-worth Duxbury (6 at position 2.3), the settlement
  guide (4), cohabitation agreements (4), plus `/about` at position 93. Queries are clean commercial
  intent: clean break order cost, divorce and pensions, CMS top-up.
- **Bing: registered and verified, zero rows.** `GetRankAndTrafficStats`, `GetQueryStats` and
  `GetPageStats` all return an empty set. Nothing to fix.
- **Our own analytics and leads are both dead, one cause: the Vercel project has ZERO environment
  variables.** No `SUPABASE_URL`, no `SUPABASE_SERVICE_ROLE_KEY`, so
  `packages/web-shared/analytics/server/createTrackHandler.ts:199-206` logs and returns 204 on every
  beacon, and `packages/web-shared/leads/server/createLeadSubmitHandler.ts:144-145` cannot insert a
  lead. The other 15 estate projects carry 21 to 39 keys each. This is config, not code: nothing in
  `divorce-finances/web` is wrong on that path.
- **Database side is ready**, which answers the open question in the parity research directly:
  migration `20260803000002` is not in `supabase_migrations.schema_migrations` but its effects are
  live, so it was applied out of band. `sites` carries `divorce-finances` /
  `www.divorcefinancespecialists.co.uk` / `active = true`, and `leads_source_valid` accepts
  `divorce-finances`. So lead submission is not failing on the constraint, it is failing on the
  missing env. 0 rows in `web_sessions`, 0 in `leads`.
- What the parity research found (`docs/divorce-finances/PARITY_RESEARCH_2026-09-28.md`): content
  complete, lead kit and intent kit close to Property; zero design-port adoption (no
  `web-shared/design` imports, no port tags, no `prose-standard.css`); `public/llms.txt` still says
  "STUB (pre-launch)"; "partner network" prose on `/contact`, `/complete` and the privacy policy;
  `ResultGateModal.tsx` still gates a calculator result after Property removed its gate on 09-27;
  `/services` says "Full service detail is being built now"; `lead-nurture.ts` holds cumulative hours
  in the gap field and is written in the partner-firm voice; og:image 404.
- **Phase 0 is changing**: positioning to the firm voice with the solicitor introduction as a named
  step, llms.txt rewritten on Property's model, `entity` key, gate removal, lead kit coverage, schema
  and canonicals, og:image, nurture timing to `0,0,4,20,24,48,72,96`, the `/services` placeholder,
  AdSense and GA4 wiring. Detail: `docs/divorce-finances/PHASE0_2026-09-28.md`.
- **Fix list not owned by the builder** (manager or owner): (1) set the env vars on
  `prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP` from the `charities` baseline, production and preview, then
  redeploy, because env changes need one; (2) after that deploy, visit the site once and confirm
  `web_sessions` has a row, not just that the keys exist; (3) seed `monitored_pages`, currently zero
  rows, starting with the 43 pages GSC already sees; (4) no schema work, both migrations are live;
  (5) GA4 property and AdSense approval sit with the plumbing agent. Full detail:
  `docs/_engines/PHASE0_SILENT_SITES_2026-09-28.md`.

---

## History below (pre-launch, retained)

Last updated 2026-08-04 (waves 1-4 written, content COMPLETE; Phase 6 = deploy plumbing remaining).

brand_locked: true

Real brand and domain deferred to owner gate G1; all content bodies must stay
brand-agnostic (zero brand-name mentions) until then. Phases 0-5 complete on
`expansion/phase-0`: scaffold, staging integrated, fact-verify done, engine
registration, 5 calculators + 2 research assets + 4 pillars + 3 commercial
hubs. Phase 6 approved by owner 2026-07-28.

## 2026-08-25 — Port-branch merge: 22 commits now in main, site not deployed

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **22 commits** were on
the branch and not in `origin/main`; they are now in main.

This site has **no Vercel project** (verified 2026-08-25 by enumerating
`GET /v9/projects`: no project has rootDirectory `divorce-finances/web`), so nothing is
deployed and nothing ships. The commits land at whatever deploy G1 eventually triggers.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'divorce-finances/'`.

## Identity

- site_key `divorce-finances` | placeholder display name **TBD** | placeholder domain `www.placeholder-divorce-domain.example`
- IndexNow key registered in `optimisation_engine/indexing/config.py` (`4d2abeb261e1ca7875c6f16ee1257ac4`); public `<key>.txt` file NOT yet created (created at G1 rename, per the real domain)
- Real brand + domain: TBD at owner gate G1

## Content state (2026-08-03)

- Wave 1: 8 spokes, committed (Phase 5)
- Wave 2: 4 spokes, committed `3c0b8f99` (earlier "5 wave-2 spokes UNTRACKED" note is stale; resolved as 4 committed)
- Wave 3: 16 spokes, committed `e35d6d11`
- Table backfill on the 12 legacy (wave 1 + 2) posts: DONE
- Wave 4: 13 spokes written 2026-08-04 (joint debts, mortgage-during-separation, stay-at-home parent, litigant in person, settlement examples, checklist, adultery, inheritance, legal aid, Scotland, expert costs, money after divorce, financial abuse). Content build COMPLETE; no wave 5 planned.
- Live blog corpus: 45 posts in `divorce-finances/web/content/blog/` (4 pillars + 41 spokes)
- `optimisation_engine/blog_generator/site_configs/divorce_finances.py` `_INTERNAL_LINK_SLUGS` refreshed 2026-08-04 (45 posts + 3 hubs)

## Phase 6 remaining

Full owner runbook: `docs/divorce-finances/PHASE6_G1_RUNBOOK_2026-08-04.md`
(mirrors `docs/wills-probate/PHASE6_G1_RUNBOOK_2026-08-04.md`). All items
below verified code-ready 2026-08-04; nothing executed yet.

- [ ] Supabase migration APPLY (owner / SQL editor) — file exists:
      `supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql`
- [ ] Vercel project (Root Directory `divorce-finances/web`, org
      `team_XF9WAygZX7SGk9Fo4tOAnihH`)
- [ ] Test-lead cycle end to end
- [ ] G1: real brand + domain decision (shortlist ready, see below),
      MoneyHelper/FMCA external-link allowlist call, metadata swap, deploy

## Notes

- Jurisdiction default: England and Wales; state explicitly where Scotland differs.
- Prohibited-topics / hallucination-zone discipline enforced via
  `divorce_finances.py` site_config (mirrors the wills-probate build).

- 2026-10-02 Phase 0 pre-live gate (GEO programme): firm-voice, em-dash, pipeline-leak and engagement-claim sweep plus a rendered read at 1280/390 with fixes; local, committed, not deployed. Detail and open owner items: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 14.
