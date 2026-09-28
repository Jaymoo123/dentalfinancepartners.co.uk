# Estate Planning Specialists (wills-probate) parity research (2026-09-28)

Domain `www.estateplanningspecialists.co.uk`. No Vercel project record in
`docs/wills-probate/STATE.md`, but the domain is **live**: `curl -sI` returns
`HTTP/1.1 200 OK` from `Server: Vercel`, real content (146-post corpus, brand
"Estate Planning Specialists", Ashfield Trading Ltd footer). STATE.md
(last updated 2026-08-25) says "no Vercel project ... nothing is deployed"
and is stale; commit `454030d0` (2026-09-26, "lock brand and domain at G1")
shipped it. This is the single biggest fact this report establishes: the
site is live and STATE.md is wrong.

## Verdict in three lines

Launched and content-complete (146 posts, calculators, schema, nurture), but
the deployed build is running stale code against HEAD (the 09-23 GA4 region
CSP fix is in source but absent from the live response headers), the design
port was never run (0 tags, 0 `web-shared/design` imports), and prospect-facing
copy on `/contact` and `/complete` still carries "partner network" caveat
language that the 2026-09-28 positioning ruling now treats as a defect.
Og:image/publisher logo 404s live. No documented Vercel project ID anywhere
in the repo despite being deployed.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | n/a | no `entity` key in `wills-probate/niche.config.json` | ? | key absent from the 91-line file (read in full) |
| P2 | none on prospect surfaces | caveat phrases present on `/contact` (`src/app/contact/page.tsx:35,56`), `/complete` (`src/app/complete/page.tsx:86,111`), `niche.config.json` (`partner.name`), `public/llms.txt` line 5; consent text in `src/config/site.ts:17` is the one exempt instance | M | contact page line 35 and complete page are descriptive prose, not the consent checkbox, so they read as defects under rule 8; `llms.txt` also states "Not a law firm, not an accountancy practice" outright |
| P3 | firm-first "free first call" | 13 hits of "free consultation/free first call/free review" across `src` | NONE | phrase itself is fine per rule 8 (free first call sets a paid-engagement expectation elsewhere in the estate); not evaluated for voice beyond count |
| P4 | 24h promise unbacked in Property too | 4 hits of "within 24 hours"/"same working day" in `src`; nurture step 0 fires synchronously so the promise has some backing, did not verify wording of the specific email | S | shares Property's open defect at smaller scale (4 vs ~115) |
| P5 | AccountingService, firm-first, shared builder | hand-rolled `src/lib/schema.ts:31` `"@type": ["ProfessionalService","AccountingService"]`, `description: siteConfig.description` (firm-first: "Estate Planning Specialists. Plain-English guidance...") | S | type and description look right but not built from `packages/web-shared/schema/organization.ts` |
| P6 | firm-first | `public/llms.txt` opens "STUB (pre-launch): the site is built but not yet published ... no citable public URLs yet" and says "Not a law firm, not an accountancy practice" | L | the file is factually wrong (site IS published) and carries the exact caveat rule 8 bans; served live right now at `/llms.txt` (curl 200) |
| L1 | mounts on home/services/segment/service/blog/calculators/contact | `src/components/forms/LeadForm.tsx` exists; did not enumerate every page-type mount in the time available | ? | see Questions |
| L2 | 7 shared ids | found `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`, `MobileToolSlot.tsx`, `ResourceGate.tsx` referencing capture ids; did not diff exact id strings against Property's 7 | S | `resource_block`-style gate exists as `ResourceGate.tsx` unlike Property's post-09-27 gate removal, worth checking whether this site still gates a PDF behind the form |
| L3 | one form, no gate, no PDF offer | `CalcResultCta.tsx` present but `ResourceGate.tsx` also present in `src/components/resources/` | ? | need to read `ResourceGate.tsx` to confirm it isn't gating the calculator result; not read this pass |
| L4 | 6 calculator routes + FAQPage | `src/app/calculators/page.tsx` + `[slug]` dynamic route (not enumerated by count); 0 files under `src/app/calculators` grep positive for `FAQPage` | M | FAQPage schema not found on calculator pages, unlike Property's spec |
| L5 | `SpecialistWidget.tsx` | `src/components/support/SpecialistWidget.tsx` exists | NONE | present, page coverage not checked |
| L6 | IntentProvider, ReturningBar, DeepScrollModal | all three present under `src/components/intent/` | NONE | present |
| L7 | `StickyCTA.tsx`, copy from niche config | `src/components/ui/StickyCTA.tsx` present, `niche.config.json` `cta.sticky_primary/secondary/button` populated | NONE | present |
| L8 | thank-you/complete/book + Aswatax | `/complete` exists and carries "partner network" language (own defect, see P2); did not confirm `/book` or Aswatax intro message text this pass | ? | see Questions |
| L9 | `delayHours` = gaps, e.g. 0,0,4,20,24,48,72,96 | `src/config/lead-nurture.ts` literal array is `0,0,4,24,48,96,168,264`, and the file's own header comment calls these **"Cumulative delay hours from step 0"** | M | this is the exact trap named in memory ("nurture delayHours = gap not total"); the shared `computeNextSendMs(fromMs, delayHours, …)` in `src/lib/leads/send-window.ts:218` adds `delayHours` to `fromMs` as a gap, if `fromMs` is rolled forward per step (as Property's usage implies), using cumulative totals as gaps would push every later step far out; could not find the calling loop that threads `fromMs` between steps in this repo to confirm rolling vs anchored-at-zero, so this is flagged, not proven |
| L10 | category-driven, no dead code | `BlogPostRenderer.tsx` and category hub present; did not check for the `categorySlug`-unused dead-code pattern this pass | ? | see Questions |
| L11 | Property's `leadConsentText` | wording differs (adjacent-professions "up to three... up to three" language is on `/contact` only, per `src/app/contact/page.tsx:56`; `src/config/site.ts:17` consent string is shorter, single-firm framing) | S | two different consent strings live in the same site (config default vs contact-page-specific); did not diff verbatim against Property's string |
| L12 | source in CHECK constraint | `source: "wills-probate"` sent from `src/app/api/leads/submit/route.ts:34,76`; `supabase/migrations/20260724000001_add_wills_probate_to_leads_and_sites.sql:12` adds `'wills-probate'` to the CHECK | NONE | the memory list of accepted sources is stale; this site has its own migration and is covered |
| G1 | AI-crawler allowlist | `src/app/robots.ts` explicitly allowlists Googlebot family, GPTBot/OAI-SearchBot/ChatGPT-User, ClaudeBot/anthropic-ai/Claude-Web/Claude-SearchBot/Claude-User, Perplexity (list continues past what was read) | NONE | present and detailed |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | `src/lib/schema.ts` is hand-rolled (not `packages/web-shared/schema/organization.ts`); has `sameAs` (line 41) and `knowsAbout` (line 64); did not confirm `parentOrganization` (Ashfield Trading Ltd) present | S | hand-rolled builder is the gap; content looks otherwise complete |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | not directly checked this pass | ? | see Questions |
| G4 | BlogPosting, Organization/Person author, real `dateModified` | not checked this pass | ? | see Questions |
| G5 | route-based, firm-first, UTM-tagged | `public/llms.txt` is a **static stub file**, not `buildLlmsFullRoute`-style, says pre-launch and carries the accountancy-practice caveat; UTM tagging described as "applies from launch" i.e. not active | L | wrong content is live right now; direct duplicate of P6 |
| G6 | `buildLlmsFullRoute`, post count, size | `src/app/llms-full.txt/route.ts:1` imports `buildLlmsFullRoute` from `@accounting-network/web-shared/content/llmsFull`, wired at line 34 | NONE | code matches the standard; live response not checked for post count/size this pass |
| G7 | real or omitted `lastModified` | `src/app/sitemap.ts` uses `lastModified: now` (build-time `now`, not real) on every static route (lines 14-18+) | S | matches the "build-time now" pattern the brief flags as a defect class, same as most sites |
| G8 | canonical-hub fix | `git log --since=2026-09-26 --grep=canonical --stat` returned nothing touching `wills-probate/` | ? | either this site never had the bug or was never patched; not distinguishable from the repo alone |
| G9 | noindex correct, `/embed` rule | not checked this pass | ? | see Questions |
| G10 | GSC config, IndexNow, Bing verified | `docs/wills-probate/STATE.md`: IndexNow key registered in `optimisation_engine/indexing/config.py` but "public `<key>.txt` file NOT yet created (created at G1 rename)"; G1 rename (`454030d0`) has now happened, so this file may still be missing | S | live: `curl -sI https://www.estateplanningspecialists.co.uk/37e0691c896359206d633a53c60877c0.txt` not tested this pass, worth a live check |
| G11 | 09-27 baseline covers it | not checked; brief doc not read this pass | ? | see Questions |
| C1 | n/a | 146 files under `wills-probate/web/content/`; STATE.md dated 2026-08-04 says "146 posts, all committed"; newest post date not sampled | S | count confirmed, date spread not sampled |
| C2 | `house_positions.md` | not present under `docs/wills-probate/` | L | no file of that name found |
| C3 | coverage map | not present under `docs/wills-probate/` | L | no file of that name found |
| C4 | `/for/[slug]` dynamic, Property template | navigation has "Who we help" -> `/for`; route shape not confirmed as dynamic `[slug]` this pass | ? | see Questions |
| C5 | `/services/*` list | `niche.config.json` navigation has no `/services` entry; site instead uses `/probate`, `/wills`, `/inheritance-tax`, `/lasting-power-of-attorney` as pillar pages | NONE | different structure, not necessarily a gap, needs a design decision not a grade |
| C6 | validator pass/fail | `python scripts/validate_blog_content.py --site wills-probate` fails: `invalid choice: 'wills-probate' (choose from Property, Dentists, Medical, Solicitors, contractors-ir35, care, charities)` | N/A | site unsupported by the validator |
| C7 | `dateModified`/`reviewedAt` | not checked this pass | ? | see Questions |
| C8 | byline model | not checked this pass | ? | see Questions |
| C9 | link audit | no site-specific audit script found under a quick look; not exhaustively searched | ? | see Questions |
| D1 | port tag + shared design imports | `git tag -l 'port-wills-probate-*'` returns nothing; `grep -rl "web-shared/design" wills-probate/web/src \| wc -l` = 0 | L | the design port has never touched this site, unlike Property/Medical/Generalist/construction-cis/crypto/charities/contractors-ir35 |
| D2 | `prose-standard.css` imported | not found in `src/app/globals.css` via grep this pass (grep returned nothing) | M | consistent with D1: kit not adopted |
| D3 | header CTA hides <1024 | commit `017cea0e` (2026-09-26) "header CTA actually hides below the desktop breakpoint, estate-wide" touched all sites per its message; not verified live on this site's DOM this pass | ? | see Questions |
| D4 | favicon set, non-SVG og:image, metadataBase | `metadataBase` present (`layout.tsx:26`); `openGraph.images` points at `siteConfig.publisherLogoUrl` = `/brand/icon-alt.png`, which **404s live** (`curl -sI https://www.estateplanningspecialists.co.uk/brand/icon-alt.png` -> 404); `public/brand/` directory does not exist in the repo at all | L | verified live defect: the OG image is broken on every shared link |
| D5 | fonts | not checked this pass | ? | see Questions |
| D6 | StatsCounter / literal-value stat tiles | not checked this pass | ? | see Questions |
| D7 | 390px scrollWidth, real emulation | not run this pass (requires puppeteer-core, out of scope for this inventory pass; site is launched so this is owed) | ? | see Questions, owed to wave 2 |
| D8 | playbook 9.1 gate numbers | not run this pass | ? | see Questions, owed to wave 2 |
| I1 | live status | **LIVE**: `/` 200, `/robots.txt` 200, `/llms.txt` 200 (content is a stale stub, see G5/P6), `/sitemap.xml` 200 | NONE | contradicts STATE.md's "not deployed" |
| I2 | Vercel project id, deploy vs HEAD | no Vercel project id found anywhere in the repo for this site (`docs/wills-probate/STATE.md` explicitly says none as of 08-25, and no later entry updates it); HEAD has 6 commits since 2026-09-01 touching `wills-probate/`, most recently `b86a990a` (2026-09-26); **but the live CSP response lacks `region1.google-analytics.com`**, which is in source (`packages/web-shared/lib/security-headers.ts` since commit `981a604e`, 2026-09-23) and correctly wired into this site's `next.config.ts:4,23` (`buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" })`) | L | deployed build is behind HEAD despite recent commits landing; UK GA4 traffic on this live site is very likely undercounted right now (same class of bug as `ga4_undercounts_uk_humans_trap` memory, unresolved here) |
| I3 | tests covering the site | `find wills-probate/web/src -iname "*.test.ts*"` = 7 files | NONE | some coverage exists |
| I4 | GA4 + CSP + consent | `AnalyticsProvider.tsx` present under `src/components/analytics/`; CSP present but stale (see I2); consent banner not confirmed this pass | M | tied to I2 finding |
| I5 | flags/env read | only `process.env.NEXT_PUBLIC_SITE_URL` found via grep for `getFlag\|site_flags\|process.env.NEXT_PUBLIC_`; no `calc_pdf_offer` or `LEAD_NURTURE_ENABLED`-style flag read in this site's source | ? | either this site has no flag-gated features or they're hardcoded; flag for ops agent |
| I6 | monitored_pages rows | unknown from repo (Supabase not queried this pass) | ? | see Questions |
| I7 | STATE.md currency | `docs/wills-probate/STATE.md` newest entry is 2026-08-25 and says "no Vercel project ... nothing is deployed"; this directly contradicts the live site and the 09-26 deploy commits | L | STATE.md needs a rewrite, it is actively misleading about launch status |

## Unique to this site

- `public/llms.txt` is a live, publicly served stub that says the site is not yet published, while the site has been live and publishing real content since at least 2026-09-26. This is worse than a missing file: it actively tells AI crawlers not to cite the site.
- `src/app/complete/page.tsx` and `src/app/contact/page.tsx` carry "partner network" prose outside the consent text, which the 2026-09-28 positioning ruling (rule 8) now treats as a defect; this pattern was not seen called out this explicitly on other sites reviewed.
- `docs/wills-probate/STATE.md` is stale in a way that actively misstates launch status (says "no Vercel project", the site has one and is live), which is a bigger STATE-file problem than a normal missed update.
- `/brand/icon-alt.png` (the OG image / publisher logo) 404s live; the `public/brand/` directory does not exist in the repo, so this was never going to resolve even before deploy staleness.
- No `docs/wills-probate/house_positions.md` or coverage map of any name exists, unlike sites further along the estate.

## Shares Property's open defects

- Build-time `lastModified: now` on sitemap routes (G7), same pattern as most estate sites.
- 24-hour / same-working-day promise present (4 instances) without confirmed nurture backing beyond the synchronous step-0 email, a smaller version of Property's unbacked-promise defect.
- No FAQPage schema found on calculator pages, same shape as Property's known gaps in that area (not explicitly listed as a Property defect but the pattern recurs).

## Questions (missing data, not findings)

- Does `ResourceGate.tsx` (`src/components/resources/`) gate the calculator result behind a form/PDF offer, which Property removed 09-27? Not read this pass.
- What does `fromMs` actually resolve to when `nextActionAt` is invoked for step N (submission time, fixed; or previous step's send time, rolling)? This determines whether the L9 cumulative-vs-gap literal is a live bug or intentional and correctly anchored. The calling loop was not found inside `wills-probate/web/src`; it may live in a cron/queue module not grepped this pass.
- `/book` route: exists, tokened, and carries the Aswatax post-submit message? Not confirmed.
- Live check of `https://www.estateplanningspecialists.co.uk/37e0691c896359206d633a53c60877c0.txt` (IndexNow key file) not run this pass.
- D3 (header CTA hiding below 1024), D5-D8 (fonts, stat tiles, 390px emulation, playbook 9.1 numbers), G3/G4/G9/G11, C4/C7-C9, I6 all need a dedicated pass (wave 2 reader or a longer wave 1 session); not reached in the time available.
- Whether `Age: 232167` on the live response (about 2.7 days) reflects genuine edge staleness or an unrelated CDN caching quirk unconnected to the CSP gap; worth a `vercel inspect`/deployment-log check by the ops agent rather than repeat curls.

## What launch needs

The site is **already live** at the real domain, so "launch" here means closing the gap between
what shipped and what STATE.md/the runbook assumed would happen at G1:

1. **Correct `docs/wills-probate/STATE.md`.** It still says "no Vercel project, nothing deployed" as of 08-25; it needs a new entry recording the actual G1 deploy (`454030d0`, 2026-09-26) and the live domain.
2. **Find or document the Vercel project id.** No project id exists anywhere in the repo for this site; whoever ran the G1 deploy needs to record it (mirrors the pattern documented for other sites' STATE.md `I2` rows) so future deploys and rollbacks are traceable.
3. **Force a redeploy so the live build matches HEAD.** The 2026-09-23 GA4 region CSP fix is in source and wired into this site's `next.config.ts`, but the live response does not carry `region1.google-analytics.com`. UK GA4 data is very likely undercounted right now. This needs a fresh production deploy, not a code change.
4. **Regenerate `public/llms.txt`.** It is a stub that tells crawlers the site is unpublished and repeats the "not an accountancy practice" caveat rule 8 now bans; it needs the real firm-first content Property's route-based approach uses.
5. **Fix the 404 on `/brand/icon-alt.png`.** The `public/brand/` directory does not exist in the repo; every shared link on this site currently shows a broken preview image.
6. **Resolve the P2 caveat language on `/contact` and `/complete`.** Both carry "partner network" prose beyond the consent checkbox; under the 09-28 ruling this needs the same firm-first voice pass other sites already got (see `815ae7de`, `63087d14` in recent commit history).
7. **Verify the IndexNow key file is live** (`/37e0691c896359206d633a53c60877c0.txt`) now that the real domain is attached, and confirm GSC + Bing Webmaster verification, both flagged as pending in STATE.md as of 08-04.
8. **Confirm the DB migration is actually applied in production**, not just written. STATE.md's checklist still shows "[ ] Migration apply (owner / SQL editor)" as unticked; leads are flowing on a live site, so this needs a direct database check, not a repo check.
9. **Run the design port.** Zero `port-wills-probate-*` tags and zero `web-shared/design` imports mean this site never got the kit that the estate's other measured wins (crypto, charities, contractors-ir35, construction-cis) are attributed to.
10. **Resolve the L9 nurture question.** Confirm whether `delayHours` in `src/config/lead-nurture.ts` are being consumed as gaps or as the cumulative totals the code comment claims; if the shared `computeNextSendMs` treats them as gaps, real send times may be running far later than the documented "11 days" cadence.
11. **Owed diagnostics**: run the 390px real-emulation check (D7), the playbook 9.1 kit-adoption gate (D8), and a fresh GSC/Bing/leads data read, none of which are possible from the repo alone.

## Commands and files read

- `curl -sI https://www.estateplanningspecialists.co.uk/` (+ `/robots.txt`, `/llms.txt`, `/sitemap.xml`, `/brand/icon-alt.png`, `/icon.svg`)
- `curl -s https://www.estateplanningspecialists.co.uk/ -o .../home.html` then grepped title and brand strings
- `wills-probate/niche.config.json` (full file)
- `wills-probate/web/src/config/{site.ts,niche-loader.ts,lead-nurture.ts}`
- `wills-probate/web/src/lib/{schema.ts,leads/send-window.ts,leads/enroll.ts}`
- `wills-probate/web/src/app/{robots.ts,sitemap.ts,layout.tsx,contact/page.tsx,complete/page.tsx}`
- `wills-probate/web/src/app/llms-full.txt/route.ts`, `wills-probate/web/public/llms.txt`
- `wills-probate/web/src/app/api/leads/submit/route.ts`
- `wills-probate/web/vercel.json`, `wills-probate/web/next.config.ts`
- `docs/wills-probate/STATE.md`
- `packages/web-shared/lib/security-headers.ts`
- `supabase/migrations/20260724000001_add_wills_probate_to_leads_and_sites.sql`
- `git tag -l 'port-wills-probate-*'`; `git log --since=2026-09-01 --oneline -- wills-probate/`; `git log -S"region1" -- packages/web-shared/lib/security-headers.ts`; `git log -1 -- wills-probate/web/src/config/lead-nurture.ts`
- `python scripts/validate_blog_content.py --site wills-probate` (unsupported site)
- `grep -rl "web-shared/design" wills-probate/web/src | wc -l` (0)
- `find wills-probate/web/content -iname "*.md"` (146)

---

# WAVE 2 READER (2026-09-28)

Rendered with `puppeteer-core` (repo root) against Chromium
`ms-playwright/chromium-1223/chrome-win64/chrome.exe`, `page.emulate` with
`isMobile: true`, `hasTouch: true`, 390x844, `deviceScaleFactor: 3`.

**Control: https://www.gov.uk rendered with the same code returns
`document.documentElement.scrollWidth` = 390 at 390 and 1280 at 1280, zero
overflowing elements.** Every 390 number below sits against that control.

Pages rendered: `/`, `/about`, `/services`, `/for/executors`,
`/for/surviving-spouses`,
`/blog/probate-process/wills-and-probate-solicitor-near-you`,
`/calculators/iht-threshold-calculator`, `/contact`, `/book`, `/complete`.
**The site is live and serving all of them.**

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA "Book a free call" 132x40 visible at 1280; `display: none`, 0x0 at 390 | rendered DOM, all 10 pages |
| D4 | **`og:image` is broken.** Home serves `og:image` = `https://www.estateplanningspecialists.co.uk/brand/icon-alt.png`, and that URL returns **HTTP 404** | `curl -sI /brand/icon-alt.png` |
| D5 | `GeistSans`, `GeistSans Fallback` applied to `body`; loaded via `geist/font/sans` and `geist/font/mono` | `getComputedStyle(document.body)`; gate row 3 |
| D6 | No `StatsCounter`, no stat strip, no decline comment. Markers all zero | gate marker row |
| D7 | `scrollWidth` = 390 on all 10 pages. No real page-level overflow. The blog hero image `img.object-cover.scale-105.blur-[2px]` reaches 400 but is clipped, and the rest are offscreen honeypots | rendered DOM; control 390 |
| D8 | Gate 9.1: row1 layout-utils **file does not exist**, row2 kit=**0 distinct / 0 call sites**, row2a declined=0, row2b **adopted=0 declined=0**, row3 webfont=`geist/font/sans` + `geist/font/mono` (PASS), row4 backdrop=**0**, row5 Eyebrow=**0** / section-label=**5**, row6 2 ring lines to read, row7 5 gradient files, row8 walks=0 guards=0. Markers ping=0 stats=0 backdrop=0 rounded-full=0. **Six rows fail** | gate block run verbatim |
| G3 | `FAQPage` (1) only on `/for/executors`. **Zero `Service`, zero `BreadcrumbList`, zero `AccountingService`** | curl |
| G7 | `lastmod` real and recent: `2026-09-25T23:18:38.004Z` | curl sitemap.xml |
| G8 | **FAIL, live. The canonical-hub defect is on this site.** `/about`, `/services`, `/for/executors` and `/for/surviving-spouses` all serve `<link rel="canonical" href="https://www.estateplanningspecialists.co.uk">`, pointing at the homepage. Blog posts and calculators are correct and self-referencing | curl on each URL |
| G9 | PASS. `/embed/iht-threshold-calculator` serves `robots: noindex, nofollow`, HTTP 200, and no `/embed` URL is in the sitemap | curl |
| L3 | **PASS.** `/calculators/iht-threshold-calculator` renders 2 forms, one with `calc_result` ids directly under the result plus the foot panel. `ResourceGate.tsx` is not gating it: no gate or modal in the DOM | rendered forms = 2; curl grep `id="calc_result-*"` |
| L4 | 7 calculator URLs in the sitemap | grep on sitemap |
| L8 | `/book` renders zero forms at 1280 and 390. `/complete` also renders zero forms. Both explain the missing token: "This page needs the personal link from your email or text message." No Aswatax line on either | rendered DOM |
| L10 | Blog post renders 2 forms (a short inline capture of 5 inputs plus the foot panel of 10). Blog capture is live | rendered DOM |
| Widgets | Chat widget IS in the live DOM on all 10 pages (`div.fixed.bottom-24.right-4.z-[55]`). A returning bar is in the DOM on `/for/executors`, the blog post, the calculator, `/contact`, `/book` and `/complete`: `div.fixed.inset-x-0.bottom-0.z-40.border-t.border-orange-700`, copy "Welcome back. Pick up where you left off, get this estate's ..." | rendered DOM |

## Reader findings

The build is in better shape than the inventory suggests: real font, real blog
capture, calculator form under the result, chat widget and returning bar all
live. Two things are badly wrong and both are live.

First, the canonical on `/about`, `/services` and every `/for/` page points at the
homepage, which tells Google to drop the whole segment layer.

Second, `/llms.txt` tells every AI crawler the site is pre-launch and must not be
cited, on a site that has been serving pages for weeks.

Positioning on this site is the old information-service model throughout. Per the
brief I report the wording and do not judge the model.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | `/about`, `/services`, `/for/executors`, `/for/surviving-spouses` | Canonical points at the homepage, not the page. Google is told these pages are duplicates of `/` | curl: `<link rel="canonical" href="https://www.estateplanningspecialists.co.uk">` on each | S |
| BLOCKER | `/llms.txt` | Line 5, machine-facing: "STUB (pre-launch): the site is built but not yet published at estateplanningspecialists.co.uk. There are no citable public URLs yet, so nothing here should be cited or indexed." The site is live | curl /llms.txt | XS |
| BLOCKER | `/llms.txt` line 7 | "Not a law firm, not an accountancy practice, and not a provider of legal, tax or financial advice. The site publishes general information and hands off to an independent specialist firm when an estate needs advice." | curl /llms.txt | XS |
| BLOCKER | all pages | `og:image` is `/brand/icon-alt.png`, which returns 404. Every share card is blank | `curl -sI` = `HTTP/1.1 404 Not Found` | XS |
| FIX | all pages | Primary CTA fails WCAG AA. White `#FFFFFF` on orange `#FF6900` = **2.89:1**, pixel-sampled from a screenshot of the button, not inferred. Applies to "Book a free call", "Use the free calculators", "Check your 2027 exposure", "Get connected with a specialist", "Browse all guides" | element screenshot, dominant pixel `255,105,0` against `255,255,255` | S |
| FIX | `/for/*`, `/services` | Zero `Service` and zero `BreadcrumbList` schema, where Medical serves 7 and 1 on the same page type | curl | S |
| FIX | site-wide | Design kit not adopted: 0 kit imports, no `layout-utils.ts`, no backdrop, 5 `section-label` and 0 `<Eyebrow>`. Webfont is the one row that passes | gate 9.1 | L |
| FIX | `/calculators/iht-threshold-calculator` | No focus ring on the first input: `outlineStyle: "none"`, `boxShadow: "none"`. Other pages do show a ring (`outlineStyle: "auto"`) | rendered `getComputedStyle` | S |
| FIX | blog post | Article opens on chrome, not the answer. First paragraph reads "8 min read / Published 24 July 2026" | rendered first paragraph | XS |
| NIT | blog post, calculator | One `enquiry_ref` honeypot input carries no label | rendered | XS |
| NIT | `/for/surviving-spouses`, `/for/executors` | The longest paragraph on the page is the consent sentence at 56 words, which means no body paragraph is long. Readability is good | rendered | n/a |

### Positioning wording, reported not judged

| Page | Sentence, verbatim |
|---|---|
| `/about` h1 | "A free information service for wills, probate and inheritance tax." |
| `/about` close | "Honesty about this matters to us. If you ask us to connect you with a specialist firm and you go on to use their services, we may receive a fee from that firm. This never changes what you pay, and it never changes what our guides and calculators say." |
| `/services` close | "We are an information service, not a law firm. Read more about how we work." |
| `/services` | "Through our partner firms, you can put in place periodic reviews of wills and estate structure..." |
| `/for/executors` | "If the estate turns out to be genuinely complex, with trusts, businesses or disputes, we can connect you with a vetted probate specialist. No pressure either way." |
| `/for/surviving-spouses` | "When you are ready, and only then, a vetted specialist can help you update your own will to match your new situation." |
| `/contact` | "If you have asked to be connected with a specialist, a vetted regulated firm from our partner network suited to your situation will contact you directly, usually within a few working days." |
| `/complete` | "Add the last detail we need and a vetted regulated firm from our partner network will be in touch to arrange your free probate review, no obligation." |
| `/book` | "A specialist will call you then, no obligation." |
| `/` footer | "Estate Planning Specialists is a trading name of Ashfield Trading Ltd. We provide information and tools, not legal or financial advice." |

The consent sentence ("To answer your enquiry, your details may be shared with a
firm from our specialist partner network who will contact you.") is exempt and is
not listed above.

### Design numbers

| Page | sw@1280 | sw@390 | hdr CTA @1280 | hdr CTA @390 | body contrast | orange CTA | forms |
|---|---|---|---|---|---|---|---|
| `/` | 1280 | 390 | 132x40 visible | none, 0x0 | 13.43 (pixel-sampled hero) | 2.89 | 1 |
| `/about` | 1280 | 390 | visible | none | 12.09 | 2.89 | 0 |
| `/services` | 1280 | 390 | visible | none | 9.87 | 2.89 | 0 |
| `/for/executors` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| `/for/surviving-spouses` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| blog post | 1280 | 390 | visible | none | 4.74 | 2.89 | 2 |
| calculator | 1280 | 390 | visible | none | 12.00 | 2.89 | 2 |
| `/contact` | 1280 | 390 | visible | none | 12.09 | 2.89 | 1 |
| `/book` | 1280 | 390 | visible | none | 10.36 | 2.89 | 0 |
| `/complete` | 1280 | 390 | visible | none | 10.36 | 2.89 | 0 |

Zero em-dashes, zero en-dashes, zero US spellings, zero AI-tell phrases, zero
images without `alt`, zero broken `<img>` elements in the DOM (the 404 is the
`og:image`, which no `<img>` loads), zero placeholder phones or emails. The
homepage hero paragraph computes as a low ratio from `getComputedStyle` because
its ground is painted behind it; pixel-sampled from a screenshot it is
**13.43:1** and passes, so the 1.48 a naive computation gives is an artefact and
is NOT reported as a defect.

### Sameness

| Comparison | Result |
|---|---|
| Segment-page closers within wills-probate | DIFFERENT. `/for/executors` closes on the guide walkthrough, `/for/surviving-spouses` on the 2027 pension change. Both share the final line "Run your own numbers on probate costs in a couple of minutes." |
| Against Property's shared close | NOT shared. Property ends every `/for/` and `/services` page on: "A couple of sentences helps us prepare properly for your call." / "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." / "We respond within 24 hours and store your details securely." wills-probate carries the consent sentence only |
| Against divorce-finances | Near-identical shell and copy pattern: same h1 formula ("A free information service for..."), same `/about` boundaries block, same "we may receive a fee from the firm we introduce you to" honesty paragraph, same orange 2.89:1 CTA, same 404 `og:image`, same homepage canonical defect. These two are one package, not two |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| P6 / llms.txt implied fine | `/llms.txt` is a pre-launch stub telling crawlers not to cite or index, live | curl |
| L3 "need to read `ResourceGate.tsx` to confirm it isn't gating the calculator result" | It is not. The calculator serves two forms, one under the result, no gate or modal in the DOM | rendered DOM |
| L8 "did not confirm `/book` or the Aswatax message" | `/book` and `/complete` both render zero forms and carry no Aswatax line | rendered DOM |
| L10 "did not check the blog CTA mechanism" | Blog capture is live: a 5-input inline capture plus the 10-input foot panel | rendered DOM |
| G8 "not distinguishable from the repo alone" | Distinguishable live, and it is a defect. `/about`, `/services` and both `/for/` pages canonicalise to the homepage | curl |
| D3 "not verified live" | Verified. Hides correctly at 390 | rendered DOM |
| D7 "owed to wave 2" | Run. 390 on all 10 pages, control 390. No mobile layout defect on this site | rendered DOM |
| D8 "not run" | Run. Six of ten rows fail; webfont is the notable pass | gate block |
| Memory "unlaunched" | Live and serving 189 sitemap URLs, `/about`, `/services`, `/for/*`, blog, calculators, `/book`, `/complete` | rendered DOM on all 10 |
