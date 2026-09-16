# contractors-ir35 (Contractor Tax Accountants) — site state

Last re-measured **2026-09-12** (phase 0 of the design port). Every number below carries
the command that derives it. The previous edition of this file was last touched
2026-06-17 and had drifted badly; see "What was wrong" at the foot.

LIVE at https://www.contractortaxaccountants.co.uk. The 7th estate site, the first BORN
on the standardised grid (machinery composed before launch rather than retrofitted).
Built via `docs/_engines/SITE_SPINUP.md`.

---

**DEPLOYED to production 2026-09-16 from `90fbea9c` (port + uplift + header CTA fix + favicon).**

## ⚡ PICKUP — port status DERIVED FROM GIT (2026-09-12)

**Git is the authority for what is built. Re-derive before planning:**
```
git tag -l 'port-*'
git log --oneline -20 -- contractors-ir35/
git status --porcelain docs/contractors-ir35/
python scripts/port_preflight.py
```

Derived state at 2026-09-14: **PORT COMPLETE. Phases 0 to 6 built, independently reviewed,
gap-fixed, gated and tagged. PLUS a design uplift on top (`569d3304`, UNTAGGED)** - see the
uplift section below, which is the end of the work on this site.

| Item | State |
|---|---|
| Phase 0 (baseline + claims audit) | COMPLETE, serious tier fixed and committed |
| Phase 1 (chrome) | BUILT, REVIEWED (`P1-8`), gap-fixed, TAGGED (`4d7bea00`) |
| Phase 2 (blog subsystem) | BUILT, REVIEWED (`P2-8`), TAGGED (`e3d0ff7d`) |
| Phase 3 (glossary, locations, research, resources) | BUILT, REVIEWED (`R3`, FAITHFUL-WITH-GAPS), gaps closed, TAGGED (`3d718b71`) |
| Phase 4 (calculators, embed, premium) | BUILT, REVIEWED (`R4`, FAITHFUL-WITH-GAPS), gaps closed, TAGGED (`3d718b71`) |
| Phase 5 (homepage, services, pillars) | BUILT, REVIEWED (`R56`, FAITHFUL-WITH-GAPS), gap was an owner ruling, TAGGED (`3d718b71`) |
| Phase 6 (secondary, post-submit, legal) | BUILT, REVIEWED (`R56`, **FAITHFUL**), TAGGED (`3d718b71`) |
| Verification lists | EXECUTED (`V1`): 198 items, 175 PASS, 8 CANNOT-RUN, 2 real defects, both fixed |
| Pushed | YES, 2026-09-16 |
| Deployed | YES, 2026-09-16 (`90fbea9c`) |

Phase tags 3 to 6 deliberately point at the REVIEWED and gap-fixed commit, not at the build
commit `7bcab0e8`, because those phases were not complete until their gaps were closed.

**REMAINING WORK: none from the port/uplift. DEPLOYED 2026-09-16 (`90fbea9c`).**

**Verification standing (build newer than every source edit):** `next build` exit 0, vitest
448/448, tsc and eslint clean, `check_dependency_closure.py` OK across 19 sites,
`predeploy_gate.py` PASS. Sweep 154/154 URLs clean, 0 dead links, 0 LINK-FLOOR breaches, 0
`data-cta` regressions, 0 dash regressions, 3300 internal links (2755 pre-port), 514 `data-cta`
(219 pre-port). Browser gate 0 overflow, 0 anchor; the only 16 contrast reports are the two
independently confirmed false-positive classes (the hidden honeypot label, and the hero over its
dark gradient which measures 7.97 and 7.05 against real pixels).

The gate's one pricing warning is a FALSE POSITIVE: it is a third-party umbrella company's margin
inside advice about comparing quotes, not our own fee.

**P5-8 was NOT unbuilt.** Two reviewers filed the ten location copy blocks as missing. They exist
for all ten cities, authored pre-port in `b88561992`, and are genuinely city-specific. A builder's
note of "left untouched" was misread as "empty". Fourth instance this port of a defect two agents
agreed on that did not exist.

**Verification standing at close** (build newer than every source edit, BUILD_ID 23:00:41
against newest source 22:57:47): `next build` exit 0, vitest 448/448, tsc and eslint clean,
sweep 154/154 URLs clean with 0 dead links, 0 link-floor breaches, 0 data-cta regressions,
0 dash regressions, internal links 3260, data-cta 433.

**Servers: none. All killed at close, verified with `netstat`.** Nine scratch `.mjs` files a
stopped agent left in `contractors-ir35/web/` were deleted; the tree is clean.

## 2026-09-14: DESIGN UPLIFT (`569d3304`), a distinct phase AFTER the port

Third of four sites through the kit-adoption uplift the owner approved after seeing crypto.
**Committed, UNTAGGED, not pushed, not deployed** at the time of writing. Every
`port-contractors-ir35-phase*` tag predates this commit, so a checkout by tag is missing the
whole uplift; the end of the work is `569d3304` (`git log --oneline -3 -- contractors-ir35/`).
[deployed 2026-09-16, 90fbea9c]

This site already had the webfont, so the gap was the primitives, the backdrop and the
eyebrows.

**What was done**

- **The live defect, and it is structural to this brand.** The focus ring was the brand
  cyan, which is ALSO the dark band ground, so it measured **~1.0 against itself** and
  **2.59** on the `/locations/[slug]` hero gradient, which does host buttons. Replaced with
  `#0891b2` from the site's own ramp, which clears the 3.0 graphic floor on every flat
  ground and every gradient stop that hosts a control. **It was proved that no single
  colour can clear 3.0 on both white and the cyan bands**, so the third colour is the only
  correct answer rather than a preference. Do not "restore the brand colour" here.
- **29 elements hand-rolled their own focus outline**, bypassing the module entirely: 11
  hand-rolled buttons duplicating `btnPrimary`, 18 rings on live controls. All now route
  through the recipe. The guard was rewritten to **walk every `.tsx` under `src/app` and
  `src/components` programmatically, with a guards-the-guard assertion**
  (`contractors-ir35/web/src/tests/focus-ring.test.ts`), because the old guard pinned the
  shared recipes only and **passed the whole time those 29 bypasses existed**. That test is
  now the shape §9.1 row 8 tells other sites to copy.
- **A defect nobody was looking for, fixed by adopting the kit's on-dark button:** the
  hand-rolled ghost button on the homepage hero used `border-white/30`, **2.47** at the copy
  column's right edge, under the 3.0 floor for a button's only visible boundary. The kit's
  `border-white/40` measures **3.20**.
- A **status-fork backdrop**: a chain of engagements entering a determination node and
  splitting into the two statuses, **both legs drawn identically on purpose**, because
  weighting one would assert an answer the site's whole product says depends on the
  contract. Mounted on 18 content heroes plus the homepage and the six kit `SlimHero`
  pages. **Declined on `/locations/[slug]`**, where the gradient exposes the most
  photograph exactly where the texture would sit.
- **Eyebrows**: this site hand-rolled its own in two module-scope constants, which is why
  the gate's grep saw zero of them. 17 call sites now use the kit component.
- Also fixed: a genuine h1-to-h3 heading skip on `/blog`, the skip link's hand-rolled brand
  colour, and 8 widget controls with no focus ring at all, one of which is the only
  focusable element on the site sitting on a brand-cyan ground and needed an explicit white
  ring (`components/support/SpecialistWidget.tsx:384`, the site's one remaining non-token
  ring and it is deliberate).

**The correction worth keeping: a comment is a claim, never evidence.** A package reported
`.section-label` and `.eyebrow` as UNLAYERED rules that no utility could override, and the
manager relayed it. **Both are, and always had been, inside `@layer components`.** What
actually existed was **15 source comments asserting the false claim**. The comments were
fixed; no CSS moved. Two of those comments still sit on
`contractors-ir35/web/src/app/page.tsx:156,163`, correctly now, and they are why the raw
§9.1 row 5 grep reports `section-label=2` on a homepage that has none.

**Verification, against one build at the uplift close** (`569d3304` commit body): 24
page-loads at four widths, **zero overflow, zero anchor gaps, zero ring bypasses in
source**, backdrop rendering on homepage, about and research, `tsc` clean, **456 tests**.
The four contrast rows the instrument flagged are **one element at four widths**, proven an
artefact at the element: its scrim is a sibling absolute div rather than an ancestor, so
background resolution falls back to white and reports 1.00 where the real composite is
about 7.0 against the worst-case photograph.

**Left open by this uplift.** No new OWNER decision came out of this site; the decisions
open at port close (the shared header cascade defect and the rest, listed below) are
unchanged. One documentation item: this site's kit declines say "NOT the kit FaqSection"
without naming the kit file path, so §9.1 row 2a counts **0 declines** on a site that
declined correctly. Naming the path makes the counter-rule auditable.

### Owner decisions open at close (bundle these, do not drip)
1. The shared header fix. A cascade collision in `packages/web-shared` meant the header CTA
   never hid, so CTA and burger both rendered below 1024px and the wordmark wrapped at 390px.
   **Property reproduced it**, confirmed in its own built CSS byte order, so the estate-wide
   chrome fix recorded as landing 2026-08-23 never took effect anywhere. **The kit-level fix
   landed in `017cea0e` (`btnPrimaryBase` split in `packages/web-shared/design/layout-utils.ts`)
   and is live estate-wide; the site-local override that used to sit in this site's
   `globals.css` was deleted in that same commit.**
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
