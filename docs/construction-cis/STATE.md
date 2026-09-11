# construction-cis (Trade Tax Specialists) — site state

## PICKUP BLOCK (read this first) - design port, 2026-09-11

**Where it stands.** The Property-standard design port is at **PHASE 2 BUILT AND REVIEWED,
NOTHING DEPLOYED.** Phase 0 artefacts are committed at `4d2bfeaa` and live in
`docs/construction-cis/_port/` (README, BRAND_LAYER, three DISPOSITION slices, LIVE_DEFECTS,
FUNNEL_BASELINE, link_baseline.json, sweep_baseline.json, browser_baseline.json) plus the brand
contract at `docs/construction-cis/DESIGN_DELTA.md`. Over 3,000 lines of file-by-file spec. Read
the slices before touching code: they are the spec, this file is the state.

**Phase 1 is COMPLETE.** Token layer, chrome and the guard suite, committed at `405faf37` and
tagged `port-construction-cis-phase1`. The brand ramp is in, so kit components emitting `primary-*`
classes now render. Nothing from phase 1 is deployed either: deploy is owner-gated, every time.

**Phase 2 is BUILT AND REVIEWED but NOT COMMITTED at the time of writing** (the blog family: the
`/blog` index, the 8 category hubs and the 82-route article template). The plan it was built
against is `_port/PHASE2_PLAN.md`. The manager holds the commit; if you are reading this after it
landed, find it with `git log --oneline -- construction-cis/` above `405faf37`.

**What phase 2 achieved, measured.**
- `/blog` articles crawlable from their own index: **12 of 82 to 82 of 82**. Baseline evidence is
  `_port/PHASE2_PLAN.md` section 1a. The sliced grid became a `hidden`-attribute grid, per
  `DESIGN_SYSTEM.md` section 4e.
- `/blog` page weight: **2,309,255 to 277,429 bytes, an 88% drop**, by projecting the post list to
  its card fields instead of spreading every article's full `contentHtml` into the client payload.
- `/blog` gained a real capture surface. It had none.
- All **82 of 82** articles gained a per-category enquiry section, each verified present with its
  anchor and its accessible label.
- The five locked `data-cta` triples came through **byte-identical at 246 / 246 / 109 / 18 / 1**,
  with two additive new ids.
- Tests **412 to 417**, then higher again with the gap fixes. Build green at **275 pages**. Sweep
  **246 of 246 routes clean**, zero dead internal links, zero link-floor breaches.

**The larger half of phase 2 was NOT design work.** It closed live defects:
- A blog post overstating the **12-month CIS penalty as 100% of deductions**, where the tier is
  £300 or 5%.
- A banned turnaround promise that turned out to be far wider than filed. `_port/LIVE_DEFECTS.md`
  records the re-swept truth as **23 breaches across 19 files, all 23 now closed** (TD-13, TD-14,
  TD-14b, TD-14c). Four soft "shortly" / "Speak soon" instances survive in **transactional email**
  valedictions, deliberately left and out of scope.
- **A test that was asserting the banned promise**, so the suite would have gone red if anyone
  removed it.
- The **refund-average claim restated with attribution** on the homepage, `/cis-refund`, both
  search snippets, the calculator, **33 trade-page stat tiles** (TD-33, 18 of them uncaveated) and
  **10 city pages** that had published it as our own clients' results (TD-10). Residual tier, still
  open and low priority: instances that are hedged as typical or illustrative, which house
  positions section 13 permits, but carry no source. Logged as **TD-34**.
- An **invisible button label measuring 1.00 contrast** on most articles.
- The **8 topic hubs still shipping full article bodies**.

**Open owner decisions, plain language.**
1. The ground-truth penalty phrase contradicts itself and leaves out one statutory tier. Needs his
   word on the wording before anything cites it.
2. The header call-to-action renders below its breakpoint. Fixing it shifts what the analytics
   count, so the before and after will not compare cleanly.
3. **79 routes still end dark-on-dark. Tracked as blocking.**
4. The tick and numeral colours.
5. The designer credit.
6. The four soft "shortly" / "Speak soon" lines in transactional email, deliberately left.

**What is next. Phase 3: the article and pillar templates, plus hubs and indexes.** Scope is
`/for` and its **45** trade pages, `/glossary` and its **50** terms, `/locations` and its **25**
cities, and `/resources`. The numbered execution order for the whole port is
`_port/DISPOSITION_SLICE3.md` section 10. Note that the **79 dark-on-dark routes are mostly
glossary and locations**, so phase 3 closes most of that blocking item as a side effect.

**Owner decisions already taken 2026-09-11, do not re-ask.**
- Brand stays orange (`#f97316` = orange-500). Warning and penalty semantics move OFF orange.
- All six phases run. **Deploy is owner-gated, every time.**
- Warning ladder T-W1 = red-600 / pink-700 / blue-700 / indigo-900 plus on-dark twins. Four steps,
  evidenced from this site's own penalty content. See DESIGN_DELTA section 1.
- `/admin/analytics/**` is EXEMPT from the port and from the ramp sweep (Medical M-L11 precedent).

**What not to re-measure, and what not to trust.**
- Production SHA `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, from the Vercel production TARGET,
  not the deployments listing. **This was true at phase 0 and is no longer true:** phase 1
  (`405faf37`) is committed and phase 2 is in the working tree, neither deployed, so the working
  tree is now AHEAD of production for `construction-cis/`. The SHA is still the right production
  reference to diff against.
- Baseline: 246 routes, 5,301 internal links, 620 `data-cta`, 36 dashes, 246/246 routes clean,
  0 dead internal links. Build green at 275 pages. Phase 2 re-measured the sweep and the build and
  they still read 246/246 clean and 275 pages, so this line is a live check, not just a baseline.
- **The dash target is 2, not 0.** The sweep regex counts en-dashes too, and 2 of the 36 are
  legitimate numeric ranges that `LIVE_DEFECTS.md` TD-28 protects. All 36 sit on 6 calculator
  pages.
- Corpus, counted at source: **45** trade types (a `grep -c 'slug:'` wrongly gives 47 because two
  lines are `slug: string` annotations), **12** calculators with `BESPOKE` empty, **82** blog posts
  across 8 categories, **50** glossary terms, **25** locations, **3** published resource guides.
  The older counts further down this file are STALE and struck through.
- Property does NOT consume the kit chrome. Only `generalist` and `Solicitors` do. Trade runs its
  own local header and footer, as Property does. Any reasoning of the form "the kit default
  protects Property" is about a two-consumer set, not the estate.
- `StatsBar` here is a pure server component printing a literal string, so Generalist's count-up
  SSR defect does NOT reproduce. Do not "fix" it.
- The 4 research pages carry no `role="img"` and no `aria-hidden` wrapper, so that defect does not
  reproduce either. `PremiumBarChart.tsx` DOES (TD-K2, byte-identical on Medical).
- `browser_check.mjs` resolved every colour on this site (0 unparseable), so trap 25 does not
  reproduce here. Note that Git Bash mangles bare route arguments into Windows paths: pass
  `MSYS_NO_PATHCONV=1` and quote them as `"//"`.
- `python` works on this machine; `python3` is a Microsoft Store stub.

**Live defects found that are NOT design work: 37, plus 2 in the shared kit.** Full catalogue with
file and line in `_port/LIVE_DEFECTS.md` (TD-01 to TD-35, with TD-14b and TD-14c, plus TD-K1 and
TD-K2), where TD-31 and TD-32 were raised by slice 3 and TD-33, TD-34 and TD-35 by the phase-2
sweeps. The count was 32 before phase 2. The ones that matter most:
1. `priceRange: "££"` publishes our own fee band in JSON-LD on 26 surfaces, and the same line
   is forked in `packages/web-shared/schema/local-business.ts:127`, so fixing one end alone leaves
   it live.
2. A "30% of the tax lost" director penalty on 3 surfaces plus a calculator, which
   `house_positions.md` bans BY NAME as a corrected fabrication. The same lines also misattribute
   it to "Finance Bill 2026".
3. A third-party marketing refund average republished as OUR client base's average on 10 city
   pages. **CLOSED 2026-09-11** (TD-10), along with 33 trade-page stat tiles the prose sweep never
   saw (TD-33). The hedged-but-unsourced remainder is TD-34, open and low priority.
4. `s.62B` given as 20% where it is 100%, and the 12-month CIS300 penalty as 100% where it is 5%.
   Note: the 2026-06-16 session below records s.62B as fixed. It is live again, or was never fully
   swept. Re-verify rather than assume.
5. `DetailsForm.tsx:192` tells the user "we only use this to arrange your free review" on the page
   that collects their phone number, against a privacy policy disclosing sharing with up to six
   firms.
6. **Every primary button on the site is white on orange-500 at 2.80:1**, below even the 3:1
   graphics floor, on every page. Article links measure 3.16, the eyebrow 2.68, the footer fine
   print 2.42. Measured two independent ways, hand-computed and instrument.
7. The burger appears below 1024px but the drawer is `md:hidden`, so **navigation is unreachable
   between 768px and 1023px.** Verified against the rendered DOM.
8. `/blog` server HTML carries **12 of 82** articles, because the list slices behind button
   pagination. The blog is 54% of this site's traffic. **CLOSED in phase 2: 82 of 82.**
9. `StickyCTA.tsx:147` ships `data-cta-id`, which `autoCapture.ts` does not match, so the site's
   only persistent site-wide CTA has never once recorded a click.

**Conversion reality, and it reorders the work.** Post bot-gate, 19 days to 2026-09-11: **203 clean
sessions, and 3 leads in the site's entire history** (first 2026-08-17). 4.93 leads per 1,000
sessions against Property's 10.80. The leak is sessions-to-form-start, 0.99% against Property's
6.16%, a 6.2x gap, and NOT start-to-complete. By family: blog articles 110 sessions and ZERO
completions; CIS template pages 27 sessions with 28 download clicks; `/for/[slug]` 24 sessions and
zero form views; **the homepage got 4 sessions and the three service pillars got 1 between them.**
So the homepage rebuild stays in scope but is NOT the centrepiece, and the blog plus the template
family carry the upside. Forms DO already exist on `/for/[slug]` and `/cis-invoice-template`: the
defect is that the hero CTAs leave the page and the form sits below the FAQ.

**An estate-wide analytics finding, not specific to this site.** `web_events.is_bot` does NOT
inherit `web_sessions.is_bot`: 18.2% of this site's nominal sessions and 9.0% of Property's are
flagged bot on the session row and clean on the event rows. Every figure above uses the strict
both-flags-clean definition. Medical's `_port/FUNNEL_BASELINE.md` numbers are loose-definition and
are inflated by this.

**Known fragile test, not a port defect.** `src/tests/lead-submit-route.test.ts` does a cold dynamic
import taking 4.64s against a 5s timeout. It fails under concurrent load and passes isolated. I
reddened it once myself by running the suite during a build. Raising its timeout is a leftover, not
port work.

---


Last updated 2026-06-16. The 8th estate site. **LIVE + HEALTHY at www.tradetaxspecialists.co.uk** (227 routes). Deployed to prod 2026-06-16 (the DB migrations had ALREADY been applied in the rushed pre-break session, so the site was serving traffic before this session; this deploy shipped the QA-clean content + 4 conversion levers).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **30 commits** were on
the branch and not in `origin/main`.

**All 30 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'construction-cis/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'construction-cis/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## 2026-06-16 session — finish + nail it (DONE)

- **Content QA:** the 41 un-QA'd wave-2/3 posts taken through the Opus independent-QA chain over **4 rounds** to all_clear; pre-deploy gate `predeploy_gate.py --site construction-cis --qa-batch cc_wave2_3` = **PASS**. Corpus-wide seeded-error fixes (manager-direct): **s.62B = 100% not 20%**, **PDS deadline = 14 days after end of tax month**, **Reg 24ZA → 23A** (public-sector exemption, verified SI 2026/289 enacted — HP §10 + SITE_PLAN §8 corrected), CIS300 penalty maths, deemed-contractor £3m-rolling exit, retention tax-year allocation, stale software prices, cis-vs-paye take-home→tax-saving reframe.
- **Conversion levers (all shipped + verified live):** B1 inline calc-result capture (MiniCapture, embed-excluded), B2 sticky CTA, B3 `/research/uk-construction-index` data-PR asset (Companies House ingestion + charts + CSV + JSON-LD), B4 personalization/intent engine (one additive shared experiments-registry edit). AN-01 browser pass ALL GREEN post-deploy.
- **Open follow-ups:** IndexNow sitemap submission (retry — Bing first-time verification delay; key file live); GA4 measurement id + GSC sitemap upload (operator); ~~blog_topics seeding (deferred)~~ **DONE 2026-07-14: 299-cluster pool seeded from GSC+Bing+DataForSEO, 221 net-new vs 208 live pages — see docs/_engines/CONTENT_GAP_ENRICHMENT.md**; monitored_pages registration; live test-lead (held for sign-off — pipeline structurally verified).

---

## (pre-launch runbook below — historical; site is now live)

---

## RESUME HERE (next manager)

~~The site carries **35 blog pages** (wave 1 = 15 through the full QA chain; wave 2 = 20 written but NOT yet QA'd), build green (95 static routes). Calculator fleet live (8 tools). Trade pages = 15.~~ **STALE. Corrected 2026-09-11: 82 posts, 12 calculators, 45 trade pages, build green at 275 pages. See the PICKUP BLOCK at the top of this file.** Schema layer fully wired. llms-full.txt includes calculator fleet.

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
