# contractors-ir35 (Contractor Tax Accountants) — site state

Last re-measured **2026-09-12** (phase 0 of the design port). Every number below carries
the command that derives it. The previous edition of this file was last touched
2026-06-17 and had drifted badly; see "What was wrong" at the foot.

LIVE at https://www.contractortaxaccountants.co.uk. The 7th estate site, the first BORN
on the standardised grid (machinery composed before launch rather than retrofitted).
Built via `docs/_engines/SITE_SPINUP.md`.

---

## ⚡ PICKUP — port status DERIVED FROM GIT (2026-09-12)

Do not trust the prose below this block over git. These three commands are the authority
(playbook T38). Re-run them before acting.

```
git tag -l 'port-*'
git log --oneline -20 -- contractors-ir35/
git status --porcelain docs/contractors-ir35/
```

**What they show, run 2026-09-12:**

- `git tag -l 'port-*'` lists 32 tags: construction-cis phase0-6, dentists phase1-6,
  generalist phase1-6, medical phase1-6, solicitors phase0-6.
  **ZERO `port-contractors-ir35-*` tags exist. No port phase is tagged for this site.**
- `git log --oneline -20 -- contractors-ir35/` has **two** port commits on top:
  - `6d0155b6` fix(contractors-ir35): figures by arithmetic, the blog index, chart data
    (2026-09-12 22:07) — carries F2, F5, F6 and P1-DATA
  - `1340c74d` fix(contractors-ir35): phase 0 claims audit, serious tier
    (2026-09-12 22:01) — carries F1, F3, F4 and the P0-A/B/C/D/E artefacts
  - below those, `18b4f25f` (2026-09-09), which is what production serves.
- `git status --porcelain docs/contractors-ir35/` is **not clean**:
  `M docs/contractors-ir35/_port/F1_RESOURCES_FIX.md`,
  `?? docs/contractors-ir35/DESIGN_DELTA.md`,
  `?? docs/contractors-ir35/_port/PHASE_PLAN.md`.
  The site tree is also dirty: `M contractors-ir35/web/content/resources/ir35.md`,
  `M .../resources/structure.md`, `M .../src/app/globals.css`, and three untracked tests
  (`src/tests/calculator-crawl-path.test.ts`, `hub-article-crawl-path.test.ts`,
  `nav-active-state.test.ts`). Other agents are working this tree right now.

**Status statement:** phase 0 complete; serious content tier fixed and committed; **no
port phase tags for this site**; nothing pushed (`git log --oneline origin/main..HEAD | wc -l`
= **101** commits ahead of `origin/main`); nothing deployed; production serves
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac` (2026-09-09), per `P0B_DEPLOY_BASELINE.md`.

**Brief correction:** the briefing named `1340c74d` as the single serious-tier commit.
Git shows **two**: `1340c74d` and the later `6d0155b6`. Everything else in the briefed
status reproduces.

Phase 0 artefacts live in `docs/contractors-ir35/_port/`. Read them, do not restate them:

| Artefact | Covers |
|---|---|
| `P0A_INVENTORY.md` | routes, components, capture surfaces, shared-vs-local, nav, blog frontmatter |
| `P0B_DEPLOY_BASELINE.md` | production SHA, auto-deploy posture, link floor, DB baselines |
| `P0C1_CLAIMS_LEDGER.md` | figures and arithmetic claims |
| `P0C2_CLAIMS_LEDGER.md` | promises, evidence and compliance claims |
| `P0C3_PUBLIC_ASSETS.md` | public and downloadable asset audit |
| `P0D_CSS_A11Y.md` | CSS and accessibility hazards |
| `P0E_CRAWL_INTEGRITY.md` | crawl and link integrity baseline |
| `sweep_baseline.json` | link floor, 157 URLs at SHA `18b4f25f` |
| `PHASE0_PACKAGES.md` | phase 0 work packages, family B sizing |
| `PHASE_PLAN.md` (untracked) | phases 1 to 6 plan |
| `F1`–`F6` `_FIX.md` | the serious-tier fixes actually applied |

---

## Measured inventory (2026-09-12)

All commands run from `contractors-ir35/web` unless stated.

| Fact | Value | Command |
|---|---|---|
| Blog posts | **62** | `ls content/blog/*.md \| wc -l` |
| Blog categories in config | **7** | `python -c "import json;print(len(json.load(open('../niche.config.json'))['content_strategy']['categories']))"` |
| Categories used by posts | **7, agreeing exactly with the config** | `grep -h '^category:' content/blog/*.md \| sed 's/category: *//' \| sort -u` |
| `page.tsx` files | **34** | `find src/app -name page.tsx \| wc -l` |
| Route handlers (`route.ts`/`.tsx`) | **24** | `find src/app -name 'route.ts' -o -name 'route.tsx' \| wc -l` |
| All files under `src/app` | **67** | `find src/app -type f \| wc -l` |
| Components | **37 files (36 `.tsx` + `ui/layout-utils.ts`)** | `find src/components -type f \| wc -l` |
| Dead components | **1: `blog/ExitIntentModal.tsx`** (0 importers, 0 mounts) | `grep -rn "import.*ExitIntentModal" src \| wc -l`; `grep -rn "<ExitIntentModal" src \| wc -l` |
| Live capture surfaces | **10** (StickyCTA, SpecialistWidget, ReturningBar, DeepScrollModal, InlineMiniLeadForm, NextStepOffer, CalcResultCta, MobileToolSlot, ResultGateModal, ResourceGate) | see `P0A_INVENTORY.md` §4 |
| Calculators | **10**, all generic, `BESPOKE` is empty | `grep -c 'Calculator,\|Checker,\|Indicator,' src/lib/calculators/registry.ts`; read `GENERIC` array |
| Location pages | **10** | `grep -cE '^    "slug": "' 'src/app/locations/[slug]/data.ts'` |
| `/for/[slug]` pages | **10** | `grep -cE '^    slug: "' src/data/contractor-types.ts` |
| Glossary terms | **38** | `grep -cE '^    slug: "' 'src/app/glossary/[slug]/data.ts'` |
| Gated resource topics | **3** (`ir35`, `structure`, `pay-planning`) | `grep -oE 'slug: "[a-z0-9-]+"' src/lib/resources/registry.ts` |
| Research data assets | **3** (`uk-contractor-index`, `uk-contractor-insolvency-index`, `uk-contractor-survival-index`), each with its own `data/route.ts` | `ls src/app/research` |
| Nav items | **5, flat, no children** | `python -c "import json;print(json.load(open('../niche.config.json'))['navigation'])"` |
| Footer links | **9** | same, `footer_links` |
| **Redirect map** | **NONE.** `next.config.ts` declares no `redirects()`; there is no `vercel.json` in `contractors-ir35/` | `grep -n redirect next.config.ts`; `ls contractors-ir35/vercel.json` |
| Framework | Next.js `^15.5.14`, React `^19.1.0`, Tailwind `^4` | `grep -n '"next"\|"react"\|"tailwindcss"' package.json` |
| Design family | **B** | `docs/contractors-ir35/_port/PHASE0_PACKAGES.md:3` |

`niche.config.json` lives at `contractors-ir35/niche.config.json`, **not** under `web/`.
`src/config/site.ts` is a pure pass-through of it, so the two cannot disagree.

## Consent model — as the code actually behaves

**There is no consent checkbox on this site.** The previous edition of this file claimed
"rendered consent checkbox (LD-04)"; the code contradicts it.

- `grep -rn 'type="checkbox"' src/components/forms src/components/blog src/components/resources`
  returns **zero hits**.
- `src/components/forms/LeadForm.tsx:369-378` renders the wording as a **notice**, with the
  comment "Data-sharing acknowledgement (legitimate interests, not consent): submitting the
  enquiry is the affirmative act, so this is shown as a notice, not a tick-box."
- `LeadForm.tsx:132` posts `consent_given: true` unconditionally, with `consent_text`
  recording the exact wording shown as the audit trail.

Analytics posture is **opt-out**, declared at `src/app/layout.tsx:97` (`posture="opt-out"`),
`storagePrefix="cfp"` (line 96, FROZEN). GA4 is gated behind `ConsentedScripts`
(`layout.tsx:100`) and the measurement id is **empty**, so GA4 renders nothing today
(`niche.config.json` `seo.google_analytics_id` = `""`).

## Live data layer (queried 2026-09-12, prod Supabase REST)

| Fact | Value |
|---|---|
| `sites` row | `site_key=contractors-ir35`, `display_name=Contractor Tax Accountants`, `domain=www.contractortaxaccountants.co.uk`, `active=true` |
| `gsc_property_url` | `sc-domain:contractortaxaccountants.co.uk` (set) |
| `bing_property_url` | **NULL.** Bing pulls do not resolve from the registry for this site |
| `monitored_pages` | **8 rows, all `monitor_until=2026-10-06`, all `rewrite_type=net_new`, `rewrite_date=2026-07-08`. 4 `active`** (`contractor-pension-schemes-sipp`, `engineering-contractors`, `ir35-status`, `it-contractors`) **and 4 `flagged`** (`__home`, `contractor-accountant-fees-cost`, `members-voluntary-liquidation`, `personal-service-company`) |
| `blog_topics` | **1,257 rows**, **1,117 used**, 140 open |
| `leads` where `source='contractors-ir35'` | **6** |
| `web_events` where `site_key='contractors-ir35'` | **5,427** |

Deriving command (all of the above): PostgREST `GET {SUPABASE_URL}/rest/v1/<table>?site_key=eq.contractors-ir35&select=...`
with `Prefer: count=exact`, credentials from repo-root `.env` (`SUPABASE_URL`, `SUPABASE_KEY`).
The `monitored_pages` column is `slug`, not `page_slug`.

## Identity

- site_key `contractors-ir35` · display **"Contractor Tax Accountants"** · domain
  `www.contractortaxaccountants.co.uk` (bought; exact-match keyword domain; head term
  "contractor accountant(s)" locked in `MONEY_KEYWORDS.md`)
- Rebranded 2026-06-16 from "Contractor Finance Partners" everywhere (niche.config, blog
  `author:`, blog_generator site config, docs, CI; prod `sites` row UPDATEd via migration
  `20260616000001`).
- Brand: petrol/cyan primary `#0e7490` + amber accent (`#b45309` on white / `#fbbf24` on
  dark); CTA wordmark + icon at `web/public/brand/`. Spec in `DESIGN_MEMO_2026-06.md`
- Storage prefix **`cfp` FROZEN** (estate registry: ptp/dfp/ma/afl/aff/hd/cfp)
- Niche economics: CPC £28.12 (highest of all 7), all-specialist SERP; quality is the strategy

## Machinery

- Analytics SDK (ConsentProvider/AnalyticsProvider/ConsentedScripts, opt-out posture),
  storagePrefix `cfp`; `/api/track` via `createTrackHandler({ siteKey })`, no key literals (PF-07)
- `/admin/analytics` console (shared cookie auth, ADMIN_DASHBOARD_KEY via `timingSafeEqual`)
  + `/api/admin/login` + `/api/og` (brand colours from config)
- `buildSecurityHeaders` (with `embedPrefix: "embed"` so `/embed/*` can be framed);
  `validateNicheConfig`; `assertFrontmatter`; `feed.xml` + `llms-full.txt`
- LeadForm: honeypot, visitor stitching, source `contractors-ir35`, consent **notice**
  (see "Consent model" above, not a checkbox)
- Blog apparatus (Dentists-pattern): `/blog` + `/blog/[category]/[slug]`, canonical
  `/blog/{category-slug}/{slug}`
- CI: in the build matrix. Vitest wired into `npm test`
- AEO/GEO to the Property standard: `robots.ts` 40-bot AI allow-list + Disallow `/api/`;
  rich `public/llms.txt`; schema suite (Organization+WebSite entity graph, FAQPage, HowTo,
  DefinedTerm, LocalBusiness, Dataset, Article, speakable `.tldr`); all routes SSG
- IndexNow key `fc84f134…` + public file `web/public/fc84f134ebf231eaec2e26e2646a4ede.txt`

## Content

- HP-LOCKED ground truth: `house_positions.md` (17 sections, FA 2026-verified). Standing
  flag: Churchill Knight/Boox MSC litigation undecided (hearings Jun + Nov 2026), re-check
  §13 before citing
- 62 blog posts, all through the full QA chain; Pexels images backfilled. Trackers
  `WAVE1_TRACKER.md` / `WAVE2_TRACKER.md` cover the first 50 only
- Frontmatter: every post carries title/slug/date/updatedDate/author/image/altText/
  imageCredit/category/metaTitle/metaDescription/h1/summary/keyTakeaways/sourcesVerifiedAt/
  faqs with real values. `schema` is present on 61 of 62 and **empty on all of them**;
  `BlogPostRenderer.tsx:57-61` falls through to generated FAQ JSON-LD, so this is correct
  behaviour, not a defect. Preserve the `?.trim() ||` fallback. `primaryKeyword` is on
  13 of 62 and **UNVERIFIED whether anything consumes it**.
- Writing model DECIDED 2026-06-12: Sonnet volume / Opus pillars+judging+repairs / Haiku
  banned from content (`BAKEOFF_2026-06.md`)
- Money-keyword map LOCKED: `MONEY_KEYWORDS.md`
- Location pages use remote-national framing, no fake offices (`locations/[slug]/data.ts`
  header comment states it explicitly)

## Deploy record (2026-06-17 launch) and gotchas

Vercel project `contractor-finance-partners` (`prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`),
org `team_XF9WAygZX7SGk9Fo4tOAnihH`, rootDirectory `contractors-ir35/web`.
Deploy from the **repo root** with both IDs as env overrides (the repo-root `.vercel`
points at Property). Launch deployment `dpl_2yVWFsReapZveud5KYwsMj8hfD9W`.

**Auto-deploy is OFF for this project**: `link: null`, so no git repo is connected and
nothing auto-deploys on push, regardless of `gitProviderOptions.createDeployments`.
Committing during the port is safe.

Gotchas from the first deploy of a fresh monorepo Vercel project (the CLI OAuth token is
rejected by the v9 projects settings API, so these need the dashboard or a real
`VERCEL_TOKEN`):
1. Framework Preset `Other` → **Next.js**
2. Root Directory `.` → **contractors-ir35/web**
3. **"Include files outside the root directory in the build step" → ON.** Without it the
   `cd ../.. && npm install` step overshoots to `/` and npm dies with
   `Tracker "idealTree" already exists`. This is the non-obvious one.

Env set: SUPABASE pair, SERVICE_ROLE, ADMIN_DASHBOARD_KEY,
`NEXT_PUBLIC_SITE_URL=https://www.contractortaxaccountants.co.uk`.
Project is still NAMED `contractor-finance-partners` (cosmetic).

## Still open

1. **Test lead (Ahmad protection)**: before submitting,
   `ALTER TABLE leads DISABLE TRIGGER leads_to_email_trg; ALTER TABLE leads DISABLE TRIGGER leads_to_enrich_trg;`
   (keep `stitch_lead_to_session_trg` ON). Submit, verify row + consent fields + stitching,
   re-enable both, DELETE the test row. The notify route CCs
   ahmadtirmizey@reflexaccounting.co.uk on EVERY leads insert, hence the trigger window.
   **UNVERIFIED whether this was ever done**; 6 real leads now exist, so the form works.
2. **GA4 still unset**: `seo.google_analytics_id` = `""`. GSC property IS registered
   (`sc-domain:contractortaxaccountants.co.uk`) but `seo.search_console_verification.google`
   in niche.config is still `""`. **Bing property is NULL in the `sites` registry** and
   should be filled; Bing is the stronger channel on several estate sites.
3. IndexNow: ran 2026-06-17 (136 URLs, HTTP 202). Re-run after content changes.
4. `monitored_pages`: **the old "DEFERRED on purpose" note was wrong.** 8 rows were
   registered 2026-07-08 and 4 are armed to 2026-10-06. If cutover lands before that date,
   restate the baselines at cutover so `data-cta`/form churn does not fire owner alarms.
5. Real phone still placeholder `+44 20 0000 0000` in `niche.config.json` contact.
6. Optional: rename the Vercel project to match the brand.
7. `blog/ExitIntentModal.tsx` is dead code. Deleting it is a cleanup; **mounting** it would
   add a capture surface the site does not currently have, which needs owner sign-off.

## Parked / post-launch

- Calculator fleet expansion; experiments composition (personalization needs IntentProvider
  port + live probes); wave 3 (140 pool topics remain); Serper topic enrichment

---

## What was wrong in the previous edition (corrected above)

| Claim | Was | Actually |
|---|---|---|
| Blog pages | "50 blog pages (15 wave-1 + 35 wave-2)" | **62** |
| Calculators | "**6 calculators**" | **10** |
| Research assets | one (UK Contractor Index) | **3** |
| LeadForm consent | "rendered consent checkbox (LD-04)" | **no checkbox exists**; a notice, `consent_given` hardcoded true |
| `monitored_pages` | "DEFERRED on purpose … re-run ~2026-07-15" | **8 rows registered 2026-07-08, 4 armed to 2026-10-06** |
| `blog_topics` | "644 seeded; 225 used, 419 open" | **1,257 / 1,117 used / 140 open** |
| Production SHA | `435cc12e` (2026-08-24) | **`18b4f25f`** (2026-09-09) |
| Held-back engine maps | "uncommitted, entangled" | **all committed**; `git status --porcelain` on those five paths is clean |
| `web_events` | "21 rows" (launch-day figure) | **5,427** |
| Build size | "153 pages" | **UNVERIFIED at HEAD**; the phase 0 link floor crawled **157 URLs** at SHA `18b4f25f` |
| Port status | no pickup block at all | see the PICKUP block at the top |

## Port pickup block (2026-09-12, end of session)

**Git is the authority for what is built. Re-derive before planning:**
```
git tag -l 'port-*'
git log --oneline -20 -- contractors-ir35/
git status --porcelain docs/contractors-ir35/
python scripts/port_preflight.py
```

Derived state at close of 2026-09-12:

| Item | State |
|---|---|
| Phase 0 (baseline + claims audit) | COMPLETE, serious tier fixed and committed |
| Phase 1 (chrome) | BUILT, REVIEWED, GAP-FIXED, TAGGED `port-contractors-ir35-phase1` |
| Phase 2 (blog subsystem) | BUILT and COMMITTED (`e3d0ff7d`), **NOT TAGGED, REVIEW NOT COMPLETE** |
| Phases 3 to 6 | NOT STARTED. Plan and packages in `_port/PHASE_PLAN.md`; the 14 template-less routes already have recorded anatomies in `_port/P3_ROUTE_ANATOMIES.md` |
| Pushed | NO. main is ahead of origin |
| Deployed | NO. Production still serves `18b4f25f` |

**THE ONE OUTSTANDING PIECE OF WORK, and do not skip it:** the phase 2 adversarial
fidelity review (P2-8) was launched and STOPPED PART-WAY at the owner's end of session.
Its report was never written, so `_port/P2-8_FIDELITY_REVIEW.md` does not exist and phase 2
is unreviewed and untagged. Its brief is reconstructable from `PHASE_PLAN.md` §H. Its FIRST
job is triaging **209 contrast findings** from `browser_check.mjs` on the current build.
Known at the moment it stopped: 0 overflow findings, 0 anchor findings, instrument
self-test passed, 0 unparseable colours, so the var() fallback failure mode is NOT in play.
Its last words were "Methods disagree. Let me settle it by looking at the actual rendered
pixels", so treat any partial conclusion as unsettled and re-derive.
Suspected real: `a "Run the numbers"` reported at 1.38 with colour cyan-800, which measures
7.27 on white, so the ground is either genuinely dark or unresolvable. Suspected false:
the honeypot `label "Leave blank"` at 1.00, and the homepage hero over its dark gradient.

**Verification standing at close** (build newer than every source edit, BUILD_ID 23:00:41
against newest source 22:57:47): `next build` exit 0, vitest 448/448, tsc and eslint clean,
sweep 154/154 URLs clean with 0 dead links, 0 link-floor breaches, 0 data-cta regressions,
0 dash regressions, internal links 3260, data-cta 433.

**Servers: none. All killed at close, verified with `netstat`.** Nine scratch `.mjs` files a
stopped agent left in `contractors-ir35/web/` were deleted; the tree is clean.

### Owner decisions open at close (bundle these, do not drip)
1. The shared header fix. A cascade collision in `packages/web-shared` means the header CTA
   never hides, so CTA and burger both render below 1024px and the wordmark wraps at 390px.
   **Property reproduces it**, confirmed in its own built CSS byte order, so the estate-wide
   chrome fix recorded as landing 2026-08-23 never took effect anywhere. Fixed site-locally
   here; the durable fix crosses 18 sites.
2. The timed promise in `packages/web-shared/leads/MiniCapture.tsx:627,707`, under six mounts
   on this site. The only timed promise still reaching users here.
3. ZeroBounce receives enquirer emails from the live submit path (`src/lib/leads/verify.ts`)
   and is not disclosed in the privacy policy.
4. Both umbrella workbooks cite an "HMRC list" of compliant umbrellas that does not exist.
   Owner ruled out spending time on the downloadable files, so this is report-only.
5. Property's own `niche.config.json` description publishes "Fixed fees, 24hr response", a fee
   claim and a turnaround promise, rendering in its footer and JSON-LD on every page.
6. The 6 design gates in `DESIGN_DELTA.md` §8 (wordmark icon and lockup among them).
7. The 21 OWNER DECISION rows in `_port/P0C2_CLAIMS_LEDGER.md`. Phase 6 packages P5-1 and
   P6-1 are blocked on these.
8. `/embed/[slug]` ships full site chrome and 24 internal links inside third-party iframes.

### Owner rulings already taken this session, do not re-ask
- "Free call" STAYS. Property uses free consultation and free review call in 61 places.
- Do not spend time fixing the downloadable workbooks.
- Site selection: contractors-ir35 was chosen over the two pre-launch sites.

