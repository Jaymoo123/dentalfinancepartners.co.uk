# Dental Finance Partners parity research (2026-09-28)

Domain `www.dentalfinancepartners.co.uk`, Vercel project `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV`
(`Dentists/web/.vercel/project.json`). Launched: yes. Live status: `/` 200, `/robots.txt` 200,
`/llms.txt` 200, `/llms-full.txt` 200, `/sitemap.xml` 200 (curl, 2026-09-28).

## Verdict in three lines

Dentists has the full Property kit mechanically (lead form, mini captures, calculators, chat,
intent engine, nurture, llms files, design port all six phases tagged) but has not absorbed the
2026-09-28 positioning ruling: 97 "partner network" caveat occurrences across 21 prospect-facing
files including the homepage, about, contact and thank-you pages, where Property (post-reversal)
now speaks firm-first. The three biggest gaps: (1) positioning voice, 97 caveat occurrences on
surfaces the ruling now calls defects (P2); (2) content is stale, newest blog post is 2026-06-04,
nothing published in the 07-30 cutoff window, no coverage map exists (C1/C3); (3) segment pages
are four static `/for-*` routes with no Service/FAQPage/BreadcrumbList schema, against Property's
15 dynamic `/for/[slug]` pages with full schema (C4/G3).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity` key present, firm-first paragraph | Missing entirely | L | `Dentists/niche.config.json` has no `entity` key (grepped, not present); `Property/niche.config.json:2-13` has it |
| P2 | 0 caveat phrases on prospect-facing surfaces (post-reversal) | 97 occurrences, 21 files | L | `grep -rniE "not an accountancy practice\|partner network\|referral network\|a specialist reviews\|we are not accountants"` over `Dentists/web/src` + `niche.config.json` + `public` = 97 hits, 21 files including `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/thank-you/page.tsx`, `app/blog/page.tsx`, `app/calculators/page.tsx`, `app/for-*/page.tsx`, `app/locations/[slug]/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/data.ts`, `lib/dental-guides.ts`, `lib/support/faq.ts`. Example: `about/page.tsx:71` "A specialist dental accountant from our partner network, not a generalist..." |
| P3 | free consultation/review language present, controlled | 33 occurrences across 9 files | S | `grep -rniE "free consultation\|free first call\|free review\|free health check"` = 33 hits; concentrated in `book/page.tsx`, `page.tsx`, `resources/[topic]/page.tsx`, `lead-nurture.ts`, `assistant/opener.ts`. Not obviously excessive but not diffed line-for-line against Property's count |
| P4 | ~115 occurrences (known Property defect, do not re-flag) | 1 occurrence | NONE | `grep -rniE "within 24 hours\|same working day\|24-hour"` = 1 hit, `calculators/[slug]/page.tsx`. Dentists does not share this Property defect. Nurture step 0 email instead promises "a specialist will call you" with no fixed hour count (`lead-nurture.ts:308-320`) |
| P5 | Shared builder, `AccountingService`, firm-first description, `knowsAbout`, sister `sameAs` | Hand-rolled, plain `Organization`, no `knowsAbout`, no sister-brand `sameAs` | M | `Dentists/web/src/lib/organization-schema.ts` builds the JSON-LD inline (`"@type": "Organization"`), imports nothing from `web-shared/schema`; `sameAs` is Companies House only, no sister brands; `description: siteConfig.description` (firm-first tone, fine) but no `knowsAbout`. Compare `Property/web/src/lib/organization-schema.ts:1-4,21-35` which imports `buildOrganization` from `@accounting-network/web-shared/schema`, sets `organizationType: "AccountingService"`, `knowsAbout` from the 15 audience titles plus 6 tax topics, `sameAs` with 4 sister-brand homepages. Note: a separate `AccountingService`-typed `LocalBusiness` node IS rendered elsewhere via `web-shared/schema/local-business.ts` `buildAccountingService`, called from the homepage and city pages (per `docs/dentists/STATE.md` 2026-09-12 entry), so the estate-level `AccountingService` type is not entirely absent, just not on the canonical Organization node |
| P6 | firm-first opening lines | Firm-first opening lines | NONE | `Dentists/web/public/llms.txt:1-5` opens "Dental Finance Partners is a UK accountancy practice focused exclusively on dental professionals", no partner-network caveat visible in the first 20 lines read |
| L1 | Mounted on home, services, segment, blog post foot, calculators | Mounted on home, blog, calculators, contact, dental-guides, research (4 pages), resources, services (2 variants) | S | `grep -rl "LeadForm\|LeadCTAPanel"` under `Dentists/web/src/app` returns 13 files; `about/page.tsx` and the four `for-*` segment pages are NOT in that list, so about and the audience pages do not mount the foot lead form (they may use a mini-capture instead, not separately confirmed) |
| L2 | `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` all exist | `inline_mini`, `mobile_tool`, `calc_result`, `resource_block` exist; `calc_result_form`, `calc_page_footer`, `blog_short_resource` not found | S | `grep -rnoE` for the 7 literal id strings under `Dentists/web/src` returns 4 of 7 ids, in `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`, `GateOrForm.tsx`, `MobileToolSlot.tsx` (x2) |
| L3 | one form under result, no gate, no popup, no PDF offer | `CalcResultCta.tsx` present, not read line-by-line for gate/popup absence | ? | File exists at `Dentists/web/src/components/calculators/CalcResultCta.tsx`; did not open the file to confirm no gate/popup/PDF offer given time, flag for a closer read |
| L4 | 6 route dirs plus premium tools and `/embed` | `calculators/` + `calculators/[slug]/`, plus `embed/[slug]/` exists | ? | Only one dynamic route dir found (`calculators/[slug]`), so the calculator count and FAQPage/cite-this presence per calculator was not enumerated individually; embed route exists (`app/embed/[slug]/page.tsx`) |
| L5 | `SpecialistWidget.tsx`, pages and auto-open behaviour documented | `SpecialistWidget.tsx` present | NONE (existence) | `Dentists/web/src/components/support/SpecialistWidget.tsx` exists; auto-open behaviour and page mount list not checked |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal`, `lib/intent/` | All present, plus `NextStepOffer.tsx` | NONE | `Dentists/web/src/components/intent/{DeepScrollModal,IntentProvider,NextStepOffer,ReturningBar}.tsx` and `lib/intent/{deriveTopic,engine,journeyModel,labels,taxonomy}.ts` all exist |
| L7 | `StickyCTA.tsx` on homepage, hero copy from `niche.config.json` `cta` | `StickyCTA.tsx` present, mounted in `PageShell.tsx` | NONE | `grep -rl "StickyCTA"` returns `components/layout/PageShell.tsx` and the component file itself |
| L8 | thank-you, complete, `/book` tokened, Aswatax message | thank-you and complete both carry the Aswatax sentence; `/book` exists | NONE | `thank-you/page.tsx:116,124` both read "we work closely with Aswatax, a firm of Chartered Tax Advisers"; did not confirm `/book` is tokened (query-param form) vs a dead end |
| L9 | `delayHours` = gaps, Property `0,0,4,20,24,48,72,96` | `delayHours` = gaps (comment confirms), Dentists `0,0,4,24,48,96,168,264` (8-step) plus a second 4-step sequence `0,24,48,168` | NONE | `lead-nurture.ts:302-303` comment: "8 steps. Delays from step 0: 0, 0, 4, 24, 48, 96, 168, 264 hours." matches the literal `delayHours` values read at lines 308-445; a second `STEPS`-like block at 527-603 runs `0,24,48,168`. Voice checked firm-first, no "partner network" string inside the nurture file. SMS ack path exists (`app/api/leads/inbound/twilio/route.ts`) |
| L10 | category-driven CTA, no dead code | Not individually verified | ? | `components/blog/InlineMiniLeadForm.tsx` and blog CTA components exist; did not diff for the `categorySlug`-unused dead-code pattern flagged for Property |
| L11 | `leadConsentText` verbatim | Verbatim identical | NONE | `Dentists/web/src/config/site.ts:19` and `Property/web/src/config/site.ts:39` are word-for-word identical, including the "specialist partner network" phrase, this is the consent sentence, exempt under rule 8 |
| L12 | source in the leads CHECK list | `source: "dentists"`, in the CHECK list | NONE | `app/api/leads/submit/route.ts:28,67` sends `source: "dentists"`; "dentists" is one of the six values memory records the DB CHECK constraint accepts |

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| G1 | AI-crawler allowlist, named training + retrieval blocks | Same structure present | NONE | `Dentists/web/src/app/robots.ts` has the identical TRAINING BOTS / RETRIEVAL BOTS comment structure and bot list (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot etc.), disallow `/api/`, `/thank-you`; file comment says "Mirrors the Property gold-standard robots.ts" |
| G2 | Shared builder, `AccountingService`, `knowsAbout`, `sameAs` sister brands | Hand-rolled, plain `Organization`, no `knowsAbout` on the canonical node | M | Same evidence as P5 |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | Not found on the segment pages checked | M | `grep -n "FAQPageSchema\|BreadcrumbList\|ServiceSchema\|Schema\|JsonLd"` on `app/for-associates/page.tsx` returned zero matches; the four `for-*` pages appear to carry no structured data at all, against Property's `/for/[slug]` template |
| G4 | `author` as Organization/Person, real `dateModified` | Not confirmed from `components/blog` grep | ? | `grep -rn "author"` under `components/blog` returned nothing that names Organization/Person explicitly; posts do carry `author: Dental Finance Partners Editorial Team` in frontmatter (see C8), but whether that renders into BlogPosting JSON-LD `author` was not traced into the schema-emitting component in the time available |
| G5 | route-based, firm-first, UTM tags | Static file, firm-first, UTM tags present | NONE (mechanism differs, output matches) | `public/llms.txt` is a static file (not a `route.ts`), opens firm-first, links carry `utm_source=chatgpt&utm_medium=llms` (confirmed in the first 20 lines read); Property's is presumably also route-based per section 1 but not diffed here, flagged as a minor mechanism difference, not a content gap |
| G6 | `buildLlmsFullRoute`, all posts listed | `buildLlmsFullRoute` used, `blog` dir only | NONE | `app/llms-full.txt/route.ts` imports `buildLlmsFullRoute` from `@accounting-network/web-shared/content/llmsFull`, `dynamic = "force-static"`, one section (`dir: "blog"`); live GET returned 200. Post count/size not measured live |
| G7 | real or omitted `lastModified`, hreflang rule | `lastModified: new Date()` (build-time now) on static routes, real post date on posts | S | `sitemap.ts:48,59,73,85` use `new Date()` (build-time, not real) for static routes; `sitemap.ts:98` uses `post.date ? new Date(post.date) : new Date()` for posts, which is correct. The static-route `new Date()` pattern is the "build-time now" anti-pattern the brief asks to distinguish from real/omitted |
| G8 | canonical-hub fix shape (09-26 commit) | No matching commit found | ? | `git log --since=2026-09-26 --grep=canonical --stat -- Dentists/` returned nothing; either Dentists never had the canonical-hub defect, or the fix has not been ported here. Not enough evidence to size the gap; flagged as a question |
| G9 | noindex only where appropriate | Restricted to admin/api/embed | NONE | `grep -rl "noindex"` under `app/` returns only `admin/analytics/*`, three `api/leads/*` token routes, and `embed/[slug]/page.tsx`, no noindex on a prospect-facing page found |
| G10 | GSC config entry, IndexNow key + script, Bing verified | Both present | NONE (Bing unknown) | `agents/config/gsc_config.py:43` has a `"dentists"` entry; `Dentists/pipeline/submit_indexnow.py` exists; key file `Dentists/web/public/0d90ff23794225ef49bd56fdaad369f1.txt` exists. Bing Webmaster verification status not checked (would need the Bing API, out of scope for repo research) |
| G11 | 09-27 AI-naming baseline covers this site | Not checked | ? | Did not open `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 to confirm Dentists is listed; leaving as a question rather than guessing |

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| C1 | 806 posts | 223 posts, newest dated 2026-06-04 | L | `find Dentists/web/content/blog -iname "*.md" \| wc -l` = 223; `grep -rhoE "^date: .*"` sorted descending, newest is `date: '2026-06-04'`. Zero posts with `date >= 2026-07-30`. Nothing published in nearly three months |
| C2 | `house_positions.md` present | Present | NONE | `docs/dentists/house_positions.md` exists, last modified 2026-09-11 per filesystem timestamp; section count not counted |
| C3 | `COVERAGE_MAP_2026-09.md` or equivalent | Not found | S | `find docs/dentists -iname "*coverage*"` returns nothing |
| C4 | `/for/[slug]` dynamic, 15 pages, Service+FAQPage+breadcrumb+form+stat tiles template | 4 static `/for-*` routes, no schema found (see G3) | L | `find Dentists/web/src/app -maxdepth 1 -iname "for-*"` returns `for-associates`, `for-locum-dentists`, `for-practice-buyers`, `for-principals`, static routes, not a `[slug]` dynamic pattern, roughly a quarter of Property's page count and missing the schema layer |
| C5 | list of `/services/*` and money pages | `services/page.tsx` + `services/[slug]/` dynamic route present | NONE (existence) | Not enumerated individually; dynamic `[slug]` pattern confirmed which is the correct shape |
| C6 | pass/fail via validator | Script supports `--site dentists` (dentists is one of the `SITES` keys) but was not executed | ? | `scripts/validate_blog_content.py --help`/source shows `--site` accepts `SITES.keys()`; did not run it live to avoid any write/side effect risk given the read-only constraint and time budget, flagged as a should-run, not a finding |
| C7 | `dateModified`/`reviewedAt` present | Not traced into rendered schema; frontmatter has `lastReviewed` on at least some posts | ? | STATE.md 2026-09-12 entry references `resources/associate.md` with `lastReviewed: "July 2025"`, so the field exists in at least some content, but whether it flows into BlogPosting `dateModified` was not confirmed in the time available |
| C8 | byline model | Organization-style byline | NONE | Posts carry `author: Dental Finance Partners Editorial Team` in frontmatter (checked `accountant-for-dentists.md:8`); no named individual found |
| C9 | link audit tool | None found | ? | No `scripts/` or `pipeline/` file under `Dentists/` matched a link-audit/404-checking grep; likely no dedicated tool, but not exhaustively searched |

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| D1 | Design standard itself | All 6 phases tagged | NONE | `git tag -l 'port-dentists-*'` returns `port-dentists-phase1` through `phase6`; `grep -rl "web-shared/design" Dentists/web/src \| wc -l` = 13 files |
| D2 | `prose-standard.css` imported | Not imported | S | `grep -n "prose-standard" Dentists/web/src/app/globals.css` returned no match |
| D3 | header CTA hides below 1024 | Not checked | ? | No dev server allowed under rule 0.1; would need a rendered-page check, deferred to the wave-2 reader pass |
| D4 | favicon set, non-SVG og:image, metadataBase | favicon.ico + icon.png present, og:image uses `siteConfig.publisherLogoUrl` (a PNG, `/brand/logo.png`), metadataBase present | NONE | `app/favicon.ico`, `app/icon.png` exist; `layout.tsx:56` sets `openGraph.images` to `siteConfig.publisherLogoUrl` not an SVG; `layout.tsx:33` sets `metadataBase: new URL(siteUrl)`. An unused `public/og-placeholder.svg` file exists but is not referenced in `layout.tsx`, so it is dead weight rather than a live SVG-og-image defect |
| D5 | Geist Sans | Plus Jakarta Sans, via `next/font/google` | XS | `layout.tsx:2` imports `Plus_Jakarta_Sans` from `next/font/google`, not Geist. A deliberate niche brand choice per `niche.config.json` `primary_color`, not necessarily a defect, but it is a difference from the Property standard worth an owner ruling |
| D6 | StatsCounter with literal-value support | No `StatsCounter` component found | ? | `grep -rl "StatsCounter" Dentists/web/src` returns nothing; the site may use a different stat-tile component not named `StatsCounter`, not confirmed either way |
| D7 | 390px real emulation, gov.uk control | Not run | ? | Requires `puppeteer-core` execution which was not run given the effort/time budget for this pass; deferred to the wave-2 reader pass which explicitly covers this |
| D8 | Playbook 9.1 kit-adoption gate numbers | Not run | ? | Did not execute the section 9.1 block from `docs/_engines/DESIGN_PORT_PLAYBOOK.md`; deferred |

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| I1 | live 200s | live 200s | NONE | curl `-o /dev/null -w "%{http_code}"` on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all returned 200 (2026-09-28) |
| I2 | Vercel project id, deploy history | Project `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV`, last documented deploy 2026-06-04 build `web-qrpjh13qx` | ? | `docs/dentists/STATE.md` records the 2026-06-04 deploy as the last one logged; `git log --since=2026-09-01 --oneline -- Dentists/` shows 19 commits since 09-01, so there is unreleased work in the repo if no deploy has happened since 06-04. Whether a more recent deploy occurred is unknown from the repo alone (STATE.md may simply be behind); flagged as a question for the ops read |
| I3 | test coverage, CI | 18 test files, no CI workflow scoped to Dentists | S | `find Dentists/web/src -iname "*.test.ts*" \| wc -l` = 18; `grep -rl "dentists" .github/workflows/*.yml` matched only `bot-scorer.yml` and `weekly-optimisation.yml`, neither of which is a build/test CI gate for this site specifically |
| I4 | GA4 component, CSP allows `region1.google-analytics.com`, consent banner | GA4 component and consent provider present; no CSP header configured at all | NONE (no CSP to block it) | `Dentists/web/src/components/analytics/GoogleAnalytics.tsx` exists; `ConsentProvider` is used in `layout.tsx`; `grep -rln "Content-Security-Policy"` across `next.config.ts`, `middleware.ts`, `vercel.json` found no CSP header defined anywhere in the Dentists repo, so there is nothing to block `region1.google-analytics.com` in the first place. This differs structurally from Property (which apparently sets a CSP that had to be patched); worth confirming this isn't itself a gap in a different direction (no CSP at all vs a correctly configured one) |
| I5 | flag/env reads | One flag read | NONE (thin) | `grep -rnoE "getFlag\(...\)\|process\.env\.NEXT_PUBLIC_[A-Z_]+"` under `src` found only `NEXT_PUBLIC_SITE_URL`; no `site_flags`/`getFlag` reads found, so an ops agent has little to check in prod env for this site specifically |
| I6 | monitored_pages rows | Unknown from repo | ? | Cannot read Supabase from this pass; unknown |
| I7 | `STATE.md` newest entry, contradictions | Newest entry 2026-09-12 (two escalated-claims fixes) | NONE | `docs/dentists/STATE.md` last entries dated 2026-09-12; content is internally consistent with the code read (e.g. the `local-business.ts` `AccountingService` note matches what was found independently at G2/P5); STATE.md predates the 09-28 positioning ruling so its own "page titles still assert firm identity... NOT changed" note is now the RIGHT direction under rule 8, not a problem, worth flagging to the owner that this STATE.md entry has been overtaken by the ruling in a good way |

## Unique to this site

- `packages` CTA variant is dormant estate-wide (all 6 sites carrying `cta.variants` sit on `leadgen`), not a Dentists-only issue; STATE.md 2026-09-12 entry explains the shared-validator blocker in detail.
- `local-business.ts` `buildAccountingService` renders a second, separately-typed `AccountingService` LocalBusiness node on the homepage and city pages, independent of the Organization node gap at P5/G2, this is shared code affecting other sites too, flagged in STATE.md as an estate-level decision, not touched here.
- An unreferenced `public/og-placeholder.svg` file exists but is dead code, not a live defect.
- STATE.md documents a working session's own arithmetic-error fixes (BADR rate, R&D relief figures, superannuation calculator) dated 2026-09-12 that are unrelated to this parity pass but show recent content-quality attention on the site despite the June content freeze.

## Shares Property's open defects

- Dormant `packages` CTA block: SHARED (see above), not Dentists-specific.
- Did not confirm whether `/book` renders zero forms the way Property's footer link does; `app/book/page.tsx` exists and `BookingPicker.tsx`/`DetailsForm.tsx` equivalents were not separately traced. Flagged as a question rather than assumed shared.
- The "24-hour promise with no nurture backing" defect does NOT appear to be shared (P4 = NONE, only 1 occurrence found, and it is not a blanket site-wide promise).
- The "all 15 segment pages share one three-line close" defect cannot be shared as stated because Dentists only has 4 segment pages and no schema was found on them at all (a different, arguably larger, gap: C4/G3).

## Questions (missing data, not findings)

1. Does `CalcResultCta.tsx` avoid a gate/popup/PDF offer (L3)? Not opened.
2. Exact calculator count and per-calculator FAQPage/cite-this presence (L4)? Only the route directory structure was checked.
3. Is `/book` tokened and does it render a form, or is it a dead end like Property's footer link (L8, shared-defect question)?
4. Does the canonical-hub fix from the 09-26 commit apply here, or did Dentists never have the defect (G8)?
5. Is Dentists covered by the 09-27 AI-naming baseline (G11)? Not opened.
6. Does BlogPosting JSON-LD actually set `author` as Organization/Person and a real `dateModified` (G4/C7)? Frontmatter has the fields; the schema-emission path was not traced.
7. When was the last Vercel production deploy for Dentists, does it postdate the 19 commits since 09-01 (I2)?
8. Is there a Supabase read available to check `monitored_pages` rows for this site (I6)?
9. Is the absence of any CSP header on Dentists itself something to flag, given every other site apparently needed a CSP patch for GA4 (I4)?

## Commands and files read

- `grep -rniE` over `Dentists/web/src`, `Dentists/niche.config.json`, `Dentists/web/public` for caveat phrases, free-consultation phrases, and 24-hour promise phrases.
- `grep -n "entity"/"partner"/"cta"` on `Dentists/niche.config.json` and `Property/niche.config.json`.
- Read `Dentists/web/src/lib/organization-schema.ts` and `Property/web/src/lib/organization-schema.ts` in full; grepped `packages/web-shared/schema/organization.ts`.
- Read `Dentists/web/src/app/robots.ts` (first 60 lines), `Dentists/web/src/app/llms-full.txt/route.ts` in full, `Dentists/web/public/llms.txt` (first 20 lines).
- `grep` on `Dentists/web/src/app/sitemap.ts` for `lastModified`/`hreflang`.
- `find`/`grep` for mini-capture ids, `LeadForm`/`LeadCTAPanel` mounts, `StickyCTA`, intent-engine files, support widget.
- Read `Dentists/web/src/config/lead-nurture.ts` (delayHours block, comment, voice check) and `Dentists/web/src/config/site.ts` (`leadConsentText`) against Property's equivalents.
- `Dentists/web/src/app/api/leads/submit/route.ts` for the lead `source` literal.
- `find`/`wc -l` on `Dentists/web/content/blog` for post count and newest `date:` frontmatter.
- `docs/dentists/STATE.md` (tail, full recent entries) and `docs/dentists/house_positions.md` (existence/timestamp only).
- `git tag -l 'port-dentists-*'`, `grep -rl "web-shared/design"`, `git log --since=2026-09-26 --grep=canonical --stat -- Dentists/`, `git log --since=2026-09-01 --oneline -- Dentists/`.
- `curl -sI`/`-w "%{http_code}"` on five live URLs under `https://www.dentalfinancepartners.co.uk`.
- `find Dentists/web/src -iname "*.test.ts*"`, `grep -rl "dentists" .github/workflows/*.yml`.
- `grep` for CSP header strings and `region1.google-analytics.com` across `next.config.ts`, `middleware.ts`, `vercel.json`.
- `agents/config/gsc_config.py` grep for a `dentists` entry; `find` for `submit_indexnow.py` and the IndexNow key file.
- `scripts/validate_blog_content.py` source read for `--site` support (not executed).

Scratch directory `C:\Users\user\.claude\jobs\933e5962\tmp\dentists\` was created but nothing was written into it; nothing to delete.

---

# Wave 2 reader pass (2026-09-28)

Rendered with `puppeteer-core` (repo root) on Chromium `ms-playwright/chromium-1223`.
Mobile = `page.emulate` viewport 390x844, `deviceScaleFactor: 3`, `isMobile: true`,
`hasTouch: true`, iPhone UA. **Control: `https://www.gov.uk` measured with the same code
returns `document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero
overflowing elements.** The emulation is therefore honest and every 390 number below is real.
Pages rendered: `/`, `/about`, `/services/dental-accountants`, `/for-associates`,
`/blog/practice-finance/dental-practice-profit-extraction-uk`,
`/calculators/associate-take-home`, `/contact`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA visible at 1280, hidden at 390 | Rendered `getBoundingClientRect` on header links and buttons: at 1280 "Contact" 88x38 and "Book a call" 121x40, both visible; at 390 both 0x0 and not visible. Same on all seven pages |
| D5 | Plus Jakarta Sans, via `next/font/google` | Applied body `font-family` is "Plus Jakarta Sans", "Plus Jakarta Sans Fallback" on all seven pages. Not Property's Geist |
| D6 | N/A, the site has no stat strip | `grep -rl StatsCounter Dentists/web/src` returns 0 files and no stat tiles render on the homepage. The Medical "0 for dates" defect class cannot occur here |
| D7 | `scrollWidth = 390` on all seven pages | Home, about, service, segment, post, calculator, contact all 390 under real emulation. One clipped element, see findings |
| D8 | 1=2; 2=4 distinct / 7 call sites; 2a=1; 2b adopted=2 declined=0; 3=`next/font/google`; 4=1; 5=Eyebrow 12, section-label 0; 6=1 ring line; 7=2 gradient files; 8=walks 0, guards-the-guard 0. Markers ping 0, stats 0, backdrop 3, rounded-full 1 | Section 9.1 block run verbatim from `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Rows 1, 2, 2b, 3, 4, 5 pass. **Row 8 FAILS: no focus-ring guard walks the corpus, which is the class that let 29 hand-rolled rings through on contractors-ir35** |
| G7 | The live sitemap carries today's date among its `lastmod` values | `curl /sitemap.xml` distinct dates include 2026-09-28, so the build-time stamp does reach production |
| G8 | Defect ABSENT. Hub canonicals self-reference | `/` to `/`, `/blog` to `/blog`, `/calculators` to `/calculators`, `/services` to `/services`. No port needed |
| G9 | Correct. `noindex` only on `/embed/*` | The four hub pages carry no `noindex`; `/embed/salary-dividend-optimiser` does |
| L3 | The calculator page renders three forms, one of them a 3-input capture beneath the tool, and no gate copy is served | Rendered form count 3, with 6, 3 and 10 inputs. A grep of the served HTML for "no thanks", "unlock", "show me the result", "PDF" and "download" returns no hits. A client-side gate appearing after a calculation cannot be ruled out by GET alone |
| L4 | 13 calculators | Live sitemap: uda-value, associate-take-home, practice-valuation, practice-purchase, practice-sale-cgt, locum-structure, principal-extraction, sdr-scotland, superannuation-contributions, equipment-capital-allowance, practice-owner-income-benchmark, dental-tax-deductions, nhs-pension-aa-taper |
| L8 | **`/book` is a dead end and DOES share Property's defect** | Rendered `/book` returns 200 with a form count of 0 and zero inputs, under an h1 reading "Book your free review call" |

## Reader findings

Mechanically this is the most complete of the four sites I read: the kit is adopted, the
header CTA hides correctly, nothing overflows the phone except one table, and contrast is
strong. What it says is the problem. Twenty-nine prospect-facing sentences across six of
the seven pages tell the reader that somebody else will do the work, which the 09-28 ruling
makes a defect, and the copy reads as a directory rather than a firm.

Second, the page a prospect reaches when they accept the invitation to book renders no form.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | home | 13 caveat sentences | Opening paragraph: "We put UK dentists in front of specialist dental accountants from our partner network." Also "A specialist from our partner network reviews your VAT position and advises accordingly." | M |
| BLOCKER | /for-associates | 8 caveat sentences, one inside a numbered process step | "02 Status review against the IR35 tests A specialist from our partner network looks at how the work actually runs" | M |
| BLOCKER | /services/dental-accountants | 5 caveat sentences, including the closing CTA | "A specialist from our partner network will review your current position, flag the immediate opportunities, and tell you honestly whether they are the right fit." | M |
| BLOCKER | /about | The one identity paragraph is itself the caveat | "A specialist dental accountant from our partner network, not a generalist who has never seen a UDA schedule." | S |
| BLOCKER | /book | Renders zero forms under the heading "Book your free review call" | rendered form count 0, inputs 0 | S |
| FIX | /contact | The post-submit explainer names the network | "Your enquiry goes to our specialist partner network rather than to a single in-house team." | XS |
| FIX | /calculators/associate-take-home | Capture copy caveats | "Tell us where you are and we will put you in front of a specialist dental accountant from our partner network." | XS |
| FIX | blog post | Table overflows the phone viewport and is clipped, not scrollable | at 390 the nodes `table`, `thead`, `tr`, `th`, `th`, `tbody`, `tr`, `td` all report a right edge past `innerWidth`, while `scrollWidth` stays 390, so columns are cut off with no way to reach them | S |
| FIX | blog post, calculator | Two `enquiry_ref` inputs carry no label and no `aria-label` | rendered unlabelled list: `enquiry_ref`, `enquiry_ref` | XS |
| FIX | site-wide | Focus indication on the first contact input is a 2px ring at 25 per cent alpha plus a border colour change, with `outline-style: none` | Tab to `input[name=fullName]`, `:focus-visible` matches, outline `none 1px`, box-shadow ring `oklab(0.69367 0.0138584 0.0845083 / 0.25) 0 0 0 2px`, border moves from `rgb(0,27,61)` to `rgb(184,151,93)` | XS |
| FIX | site-wide | Playbook 9.1 row 8 fails, no `readdirSync` focus-ring guard | walks 0, guards-the-guard 0 | S |
| NIT | blog post | One AI tell in visible body text | "unlock" | XS |
| NIT | service, segment, blog | Longest paragraph 75 words (service), 63 (segment), 135 (blog post) | rendered paragraph word counts | S |
| NIT | /embed/* | Canonical points at the homepage rather than itself | `<link rel="canonical" href="https://www.dentalfinancepartners.co.uk">` on `/embed/salary-dividend-optimiser` | XS |

Writing, measured: **em-dashes 0 on all seven pages, US spellings 0, AI tells 1** ("unlock",
blog post). Readability: the answer sits in the first paragraph on every page read except
the blog post, whose first paragraph is the byline strip "8 min read, Published 1 March
2026, Updated 3 June 2026". h1 and title agree with the page promise everywhere.

### Design numbers

| Page | sw 1280 | sw 390 | overflow at 390 | body contrast | CTA contrast | forms | sticky at 390 | chat |
|---|---|---|---|---|---|---|---|---|
| / | 1280 | 390 | none | 16.4 | 17.15 | 1 | 2 | none |
| /about | 1280 | 390 | none | 16.4 | 17.15 | 0 | 2 | none |
| /services/dental-accountants | 1280 | 390 | none | 16.4 | 17.15 | 1 | 2 | none |
| /for-associates | 1280 | 390 | none | 16.4 | 17.15 | 1 | 2 | none |
| blog post | 1280 | 390 | 8 table nodes | 16.4 | 17.15 | 3 | 2 | none |
| /calculators/associate-take-home | 1280 | 390 | none | 16.4 | 17.15 | 3 | 2 | none |
| /contact | 1280 | 390 | none | 16.4 | 17.15 | 1 | 2 | none |

Contrast computed from `getComputedStyle` colour against the nearest opaque ancestor
background. No chat widget was found in the rendered DOM on any of the seven pages, so L5
reads "component exists in source, mounts on none of the pages read". The only footer
booking-style link found points at `https://www.medicalaccounts.co.uk`, a sister brand,
rather than at a form on this site. `/about` renders no form at all.

### Sameness

| Comparison | Result |
|---|---|
| Segment page closers within the site | Different. The four `/for-*` pages each end on their own last card |
| Service page closers within the site | **Identical last line** on `/services/dental-accountants` and `/services/associate-tax`: "Say what you are dealing with and a dental specialist takes it from there." Both also open the close with "30-minute scoping call... A specialist from our partner network will..." |
| Against Property's shared close | Not shared. Property's `/for/` pages all close on "Free first call, then a fixed fee in writing" and "Book a free first call. No obligation, no hard sell. If we take the work on, you get a fixed fee in writing before anything starts." (quoted from `/for/selling-a-buy-to-let` and `/for/non-resident-landlords`). Dentists uses none of that wording |

## Corrections to the inventory

1. **L8 "NONE"** is wrong on the `/book` half. Rendered `/book` returns 200 with zero forms
   and zero inputs, so Dentists does share Property's dead `/book` defect. Wave 1 left it
   as a question; it is now a finding.
2. **"Shares Property's open defects"** says the identical-closers defect "cannot be
   shared". It is shared, on the SERVICE pages, which wave 1 did not read.
3. **D6 "?"** closes as N/A rather than unknown: there is no stat component at all.
4. **D8** now has numbers and row 8 of the gate FAILS. Wave 1 left the gate unrun, so the
   report currently reads as though the port were entirely clean.
5. **G8 "?"** closes as defect-absent rather than unported: hub canonicals self-reference live.
