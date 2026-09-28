# Care Home Tax parity research (2026-09-28)

Domain `www.carehometax.co.uk`, Vercel project `prj_PvJWStLGoG8bvzCQPLafY4nuMQAa`. Launched: yes.
Live status: home, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all `HTTP/1.1 200 OK`
(`curl -sI` on each, run 2026-09-28).

## Verdict in three lines

Care is close to the Property standard on the machine layer (schema, robots, llms.txt, nurture
gaps, canonical fix) and on positioning voice, because it was ported onto the same shared
builders in the 2026-09-28 LEADS_250 commits. The three biggest gaps: no chat widget and no
intent engine at all (L5/L6, whole layers missing, not weak); no sticky CTA component (L7); and
`docs/care/STATE.md` is stale to the point of contradiction, it still carries brand-not-locked
and `.invalid` placeholder language for a site that has been live on `carehometax.co.uk` since
at least August (I7).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | n/a (no `entity` caveat block) | `niche.config.json` `entity.firm` is firm-first: "Care Home Tax is a specialist accountancy firm for UK care providers... We do the work" | NONE | `care/niche.config.json` lines under `entity` |
| P2 | 0 prospect-facing caveats | 6 hits for the caveat regex, all in privacy-policy/consent (rule-8 exempt) except one: `care/web/src/data/care-hubs.ts:379` "A specialist reviews last year's income..." in hub body copy, prospect-facing | XS | `grep -rniE "not an accountancy practice\|partner network\|referral network\|a specialist reviews\|we are not accountants" care/web/src` |
| P3 | present | 12 hits for "free consultation/first call/review" across `web/src` | NONE | grep count, commit `815ae7de` (feat(estate): free first call sets paid-engagement expectation) touched care |
| P4 | ~115 occurrences, no nurture email backs it (known Property defect) | 14 occurrences of "within 24 hours"/"same working day" in `web/src`; `niche.config.json` `cta.sticky_secondary` = "Free, no-obligation reply within 24 hours"; nurture step 0 fires immediately so the promise is backed at send-0 | S | `grep -niE "24 hour\|within 24" care/web/src/config/lead-nurture.ts` returned nothing inside the step list itself, promise lives in copy not code; not independently verified against actual send timing |
| P5 | `AccountingService`, firm-first, shared builder | Same: `care/web/src/lib/schema.ts` calls `buildOrganization()` from `@accounting-network/web-shared/schema`, `organizationType: "AccountingService"`, `description: niche.entity?.firm` | NONE | `care/web/src/lib/schema.ts:19-56`, comment cites "LEADS_250 §13 T2/T5: ported onto the shared buildOrganization()" |
| P6 | firm-first opening | `care/web/public/llms.txt` opens "Care Home Tax is a specialist accountancy firm for UK care providers", no caveat | NONE | `care/web/public/llms.txt` lines 1-11 |
| L1 | mounted on home, about, services, segment, blog post foot; not on calculators (has its own) | `LeadForm`/`LeadCTAPanel` referenced in `about`, `blog/[category]/[slug]`, `contact`, `for/[slug]`, `page.tsx` (home), `research/*` (2 pages), `services/[slug]` | NONE | `grep -rl "LeadForm\|LeadCTAPanel" care/web/src/app` |
| L2 | 7 shared mini-capture ids | `MiniCapture`, `InlineMiniLeadForm`, `CalcResultCta` present and used on blog post, calculator result and blog inline; no `MobileToolSlot`/`resource_block`/`calc_page_footer` found by name | S | `grep -rln "MiniCapture\|InlineMiniLeadForm\|MobileToolSlot\|CalcResultCta\|ResultCaptureForm\|ResultGate" care/web/src`, no `MobileToolSlot` hit |
| L3 | one form under result, no gate, no PDF offer | `CalcResultCta.tsx` present, no `ResultGate` file, no "pdf" hit in `components/calculators` | NONE | `find care/web/src/components/calculators`; `grep -rn pdf care/web/src/components/calculators` empty |
| L4 | 6 route dirs + premium + embed | 5 calculator tools (`care-staffing-margin`, `cqc-fee-calculator`, `fnc-fee-mix`, `sleep-in-nmw`, `true-cost-care-hour`), single `[slug]` route, each has a `.test.ts`; FAQPage/cite-this per calculator not individually checked | S | `find care/web/src/lib/calculators/tools`; STATE.md S5 confirms 18/18 vitest green at build |
| L5 | `components/support/SpecialistWidget.tsx` | No chat widget component anywhere under `care/web/src` | L | `find care/web/src/components -iname "*widget*" -o -iname "*specialist*" -o -iname "*chat*"` returned nothing |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | Not present; only `lib/leads/reply-intent.ts` exists, which is about email/SMS reply parsing, not the on-page intent engine | L | `find care/web/src -iname "*intent*"` returns one unrelated file |
| L7 | `StickyCTA.tsx` on homepage | No sticky CTA component found under `care/web/src/components` | M | `find care/web/src/components -iname "*sticky*"` empty; `niche.config.json` still carries `cta.sticky_primary/secondary/button` strings, so the copy exists but nothing renders it as a sticky element that could be found |
| L8 | thank-you, complete, `/book` tokened, Aswatax message | `care/web/src/app/book`, `/thank-you`, `/complete` all exist with `page.tsx`; `BookingPicker.tsx`/`DetailsForm.tsx` present matching Property's components; Aswatax post-submit message presence not independently confirmed in this pass | S | `ls care/web/src/app/book care/web/src/app/thank-you care/web/src/app/complete`; `find care/web/src/components/forms` |
| L9 | `delayHours` gaps `0,0,4,20,24,48,72,96`, firm voice, SMS ack | `care/web/src/config/lead-nurture.ts` carries a step sequence with `delayHours` `0, 0, 4, 20, 24, 48, 72, 96` matching Property's gap pattern exactly, plus a second (shorter, 0/24/48/168) track; commit `63087d14` explicitly says "nurture gaps on four sites corrected to Property's" | NONE | `grep -n delayHours care/web/src/config/lead-nurture.ts` lines 344-481 |
| L10 | category-driven CTA, no dead code | `InlineMiniLeadForm` used in blog post render; `CTA_BY_CATEGORY`-style mechanism not independently traced line by line in this pass | ? | tried `grep -rn CTA_BY_CATEGORY care/web/src`, no hit, either a different name or fixed CTA; not resolved |
| L11 | consent text, owner-locked | Verbatim identical string to Property's `leadConsentText` (`"To answer your enquiry, your details may be shared with a firm from our specialist partner network..."`) | NONE | diff of `care/web/src/config/site.ts:15` vs `Property/web/src/config/site.ts:39`, byte-identical |
| L12 | `property` accepted by leads CHECK constraint | code sends `source: "care"` at `/api/leads/submit` per memory (`generalist_lead_source_identifier.md` lists dentists/property/medical/solicitors/general/agency as the known CHECK list; "care" is NOT in that memory's list) | ? | did not read the live Supabase CHECK constraint in this pass (read-only rule, no DB access used); flagged as a question, not confirmed broken since leads are visibly being generated per STATE.md and recent commits |
| G1 | ~50 AI/search bots, `/thank-you` + admin disallow | `care/web/src/app/robots.ts` lists the same bot families (Google, OpenAI, Anthropic, Perplexity, Apple, Meta, Bing, DuckDuckGo, Mistral, You.com, Cohere, Brave, Bytespider, CCBot, Diffbot, Amazon, Yandex, Naver, Seznam, Mojeek, Ahrefs/Yep, social previews), disallow `/thank-you`, `/admin` | NONE | `care/web/src/app/robots.ts` full read |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | Same shared builder; `sameAs` lists Companies House + the other 4 LEADS_250 brand homepages; `parentOrganization` Ashfield Trading Ltd 16358723; `knowsAbout` derived from `careHubs.map(h => h.title)` (not hand-picked) | NONE | `care/web/src/lib/schema.ts:39-56` |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | Not individually verified per page in this pass; `for/[slug]` and `services/[slug]` routes exist matching Property's shape | ? | file-shape match only, schema-per-page not traced |
| G4 | BlogPosting, author Org/Person, real `dateModified` | `buildBlogPostingJsonLd` wired through the same `organizationRef()`; 16/33 posts carry `updatedDate`, only 3 carry `sourcesVerifiedAt`; author field is blank string on legacy posts (validator WARN) | S | `grep -l "^updatedDate:" care/web/content/blog/*.md` = 16; `grep -l sourcesVerifiedAt` = 3; validator output below |
| G5 | route-based, firm-first, UTM-tagged, hand vs derived not specified | `care/web/public/llms.txt` is a static file (not a route), opens firm-first, contains "Attribution and traffic tagging" section | XS | `care/web/public/llms.txt` head |
| G6 | `buildLlmsFullRoute`, lists post count, size vs 19.07 MB ISR ceiling | `care/web/src/app/llms-full.txt/route.ts` calls `buildLlmsFullRoute` from the shared package, `dynamic = "force-static"`; size and exact post-count listing not measured live in this pass | ? | did not curl the full body to measure bytes; header check only confirmed 200 |
| G7 | real/omitted `lastModified`, hreflang rule | `care/web/src/app/sitemap.ts` exists; contents not read line by line this pass | ? | file located, not opened |
| G8 | canonical-hub fix | Care carries it: commit `bb297ab2f` "fix(seo): stop /services and /for canonicalising to the homepage on four sites" touches `care/web/src/app/for/page.tsx`, `layout.tsx`, `services/page.tsx` | NONE | `git log --since=2026-09-26 --grep=canonical --stat -- care/` |
| G9 | noindex correct, `/embed` rule | `care/web/src/app/embed/[slug]` route exists; noindex rules not individually audited | ? | route present only, not audited |
| G10 | gsc_config entry, IndexNow key, Bing verified | `agents/config/gsc_config.py` has a `"care"` entry (line 193, `site_key: "care"`); no IndexNow key file found under `care/web/public`; Bing verification unknown | S/? | `grep -n "\"care\"" agents/config/gsc_config.py`; `find care/web/public -iname "*indexnow*"` empty |
| G11 | 2026-09-27 baseline covers named sites | Not checked against the T6 list in this pass | ? | did not open `LEADS_250_PROGRAMME_2026-09-27.md` section 8 |
| C1 | 806 posts | 32 posts (`care/web/content/blog`, 33 files minus 1 non-post), newest `date: "2026-09-27"`, 13 posts dated `>=2026-07-30` | L (scale) | `for f in care/web/content/blog/*.md; do grep -m1 "^date:" "$f"; done \| sort \| tail -5` |
| C2 | exists | `docs/care/house_positions.md` exists, 199 lines, last content block confirms verification pass, all TODO-VERIFY resolved | NONE | file read |
| C3 | exists | `docs/care/COVERAGE_MAP_2026-09.md` exists, built to LEADS_250 spec, states "research only, nothing built/changed/deployed" | NONE | file head read |
| C4 | `/for/[slug]` dynamic, 15 pages, Service+FAQPage+breadcrumb+form+stat tiles | `care/web/src/data/care-hubs.ts` defines 9 hubs (`grep -c "slug:"`), same dynamic-route shape | S | count difference 9 vs 15; per-page schema completeness not verified |
| C5 | `/services/*` + money pages | `care/web/src/data/care-services.ts` exists, service pages render at `/services/[slug]`; list not enumerated | ? | file located, contents not enumerated |
| C6 | n/a | `python scripts/validate_blog_content.py --site care` runs and supports the site: `PASS: 32 posts validated, 0 errors`, 33 warnings (mostly legacy posts missing `author`/canonical, one metaDescription 1 char over 155) | S | full validator output captured 2026-09-28 |
| C7 | `dateModified`/`reviewedAt` pattern | Only 16/32 posts carry `updatedDate`, 3/32 carry `sourcesVerifiedAt`; the rest are "legacy, unchanged" per the validator | S | grep counts above |
| C8 | Person/Editorial/Org byline | Two author values found: `""` (blank, legacy posts) and `"Care Home Tax Editorial Team"` | XS | `for f in care/web/content/blog/*.md; do grep -m1 "^author:" "$f"; done \| sort -u` |
| C9 | link audit tool | Not run in this pass; STATE.md mentions "manager link-audit (1 invented slug fixed)" as a one-off historical QA step, not a standing tool | ? | no `scripts/` link-audit found for care specifically in this pass |
| D1 | design port standard, tags `port-<site>-*` | `git tag -l 'port-care-*'` returns nothing; `web-shared/design` import count = 3 (vs Property's 2); no uplift commit found | L | `git tag -l 'port-care-*'` empty; `grep -rl "web-shared/design" care/web/src \| wc -l` = 3 |
| D2 | imported | `care/web/src/app/globals.css:6` imports `../../../../packages/site-styles/prose-standard.css` | NONE | file read |
| D3 | hides below 1024 | Not rendered-DOM checked; header component not opened in this pass | ? | not determined |
| D4 | proper favicon, no SVG og:image, `metadataBase` set | `metadataBase: new URL(siteUrl)` present in `layout.tsx:21`; og:image served via `/api/og` route (`route.tsx` exists, dynamic PNG, not a static SVG), not the SVG defect; static favicon file presence not separately confirmed | XS | `care/web/src/app/layout.tsx:21,40-54`; `care/web/src/app/api/og/route.tsx` exists |
| D5 | shared fonts | `layout.tsx` does not import a font module directly; font loading likely lives in shared layout/CSS, not traced further | ? | grep for "font" in layout.tsx returned nothing, inconclusive |
| D6 | literal-value stat tile support | Not checked; no StatsCounter component located under `care/web/src/components` in searches so far | ? | not determined this pass |
| D7 | 390px real emulation | Not run, this pass used curl/grep only, no `puppeteer-core` launched (time-boxed; rule 2 forbids `npm install`/dev server, and a `page.emulate` check needs the built app or live site with a real browser tool, not available in this pass) | ? | not determined; flag for the wave-2 Opus reader who has browser tooling |
| D8 | playbook §9.1 gate numbers | Not run in this pass | ? | not determined |
| I1 | live | all live: `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all 200 | NONE | curl results above |
| I2 | Vercel project id, deploy date | project id `prj_PvJWStLGoG8bvzCQPLafY4nuMQAa` from `docs/care/STATE.md`; STATE.md's own recorded production SHA (`435cc12e`, 2026-08-24) is now stale, `git log --oneline -10 -- care/` shows at least 9 commits after that date touching care, the newest `815ae7de` today | S (docs debt) | `git log --oneline -10 -- care/`; STATE.md text |
| I3 | tests present, CI covers site | 8 `.test.ts(x)` files under `care/web/src`; `.github/workflows/ci-build-test.yml`, `caretaker.yml`, `bot-scorer.yml`, `lead-capture-tripwire.yml` all reference "care" | NONE | `find`/`grep` counts above |
| I4 | GA4 component, CSP header, consent banner | `layout.tsx` wires `ConsentProvider`, `AnalyticsProvider`, `ConsentedScripts` from the shared `@accounting-network/web-shared/analytics` package; CSP built by shared `packages/web-shared/lib/security-headers.ts` (comment there references `region1.google-analytics.com`), applied via `care/web/next.config.ts` importing `buildSecurityHeaders`; not confirmed on the live response headers in this pass | S | `care/web/src/app/layout.tsx:3-5`; `care/web/next.config.ts:4` |
| I5 | flags via `getFlag`/`site_flags`/`NEXT_PUBLIC_` | Only one `NEXT_PUBLIC_SITE_URL` env read found in `config/*.ts`; no `getFlag`/`site_flags` calls found there (may live elsewhere, e.g. API routes, not fully swept) | ? | `grep -rn "getFlag\|site_flags\|NEXT_PUBLIC_" care/web/src/config/*.ts` = 1 hit, narrow search |
| I6 | monitored_pages rows | Not checked, no Supabase read in this pass | ? | "unknown from repo" |
| I7 | `STATE.md` exists, contradictions | Exists, but its own Launch-state checklist is stale: still shows S7/S8 unchecked, "Brand: NOT LOCKED", domain `www.brand-tbd-care.invalid`, phone placeholder, all contradicted by the live site on `carehometax.co.uk` and 9+ commits since | L (docs debt, not a product gap) | `tail -60 docs/care/STATE.md` |

## Unique to this site

- `docs/care/COVERAGE_MAP_2026-09.md` and `docs/care/coverage_map_2026-09.json`, a machine-readable coverage map, which several other sites in the estate may not have; not compared here since that is out of scope for a single-site report.
- CQC-specific calculators (`cqc-fee-calculator`, `sleep-in-nmw`) and Dataset schema on the Care Provider Business Index, called out in STATE.md as exceeding Property's calculator set in domain specificity (not verified independently this pass, carried from STATE.md's own claim).

## Shares Property's open defects

- The 24-hour promise pattern: care repeats "within 24 hours" 14 times across `web/src` and in `niche.config.json`, the same shape as Property's known defect (P4), though unlike Property the nurture sequence's step 0 fires at `delayHours: 0` so an immediate send exists, whether it actually contains the 24-hour language was not read line by line.
- `/book` needs checking for the same "renders zero forms" defect Property has; `care/web/src/app/book/page.tsx` exists and `BookingPicker.tsx`/`DetailsForm.tsx` are present in `components/forms`, suggesting care's `/book` DOES render a form, unlike Property's, this is a difference, not a shared defect, but was not click-tested live.

## Questions (missing data, not findings)

- L12: does the Supabase `leads` table's CHECK constraint on `source` actually accept `"care"`? Memory (`generalist_lead_source_identifier.md`) lists only dentists/property/medical/solicitors/general/agency. Leads are visibly flowing per recent commits, so either the constraint was updated or care maps to one of those values in code; not resolved without a DB read, which this pass avoided under the read-only/no-POST rule.
- D7: no 390px real-emulation check was run (no `puppeteer-core` browser tool used this pass). Needs the wave-2 Opus reader with rendered-page access.
- D3, D5, D6, D8, G3, G7, G9, G11, I5, I6: file-located or partially checked but not read to completion; each needs a follow-up single-file read, listed under gap `?`.
- Whether `care`'s Aswatax post-submit intro message (memory: verified live on all 15 Vercel sites 09-09) is actually present on care's `/thank-you` or `/complete` page was not independently re-confirmed this pass, only the routes' existence.

## Commands and files read

- `care/niche.config.json`, `care/web/src/config/site.ts`, `care/web/src/config/niche-loader.ts`, `care/web/src/config/lead-nurture.ts`
- `care/web/src/lib/schema.ts`, `care/web/src/app/robots.ts`, `care/web/public/llms.txt`, `care/web/src/app/llms-full.txt/route.ts`
- `care/web/src/app/layout.tsx`, `care/web/src/app/globals.css`, `care/web/src/app/api/og/route.tsx`
- `care/web/src/data/care-hubs.ts`, `care/web/content/blog/*.md` (frontmatter scan)
- `docs/care/STATE.md`, `docs/care/house_positions.md`, `docs/care/COVERAGE_MAP_2026-09.md`
- `agents/config/gsc_config.py` (grep for `"care"`)
- `git log --oneline -10 -- care/`; `git log --since=2026-09-26 --grep=canonical --stat -- care/`; `git tag -l 'port-care-*'`
- `python scripts/validate_blog_content.py --site care`
- `curl -sI` on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` of `https://www.carehometax.co.uk`
- Property comparison files: `Property/web/src/config/site.ts` (consent text diff)
- Scratch directory `C:\Users\user\.claude\jobs\933e5962\tmp\care\` created and unused, deleted at close.

---

# Wave 2 reader pass (2026-09-28, rendered pages)

Control first: `https://www.gov.uk` rendered with the same `puppeteer-core` `page.emulate`
(390x844, `deviceScaleFactor: 3`, `isMobile: true`, `hasTouch: true`) returned
`document.documentElement.scrollWidth = 390`, `clientWidth = 390`, zero overflowing elements.
Every 390 number below comes from that same code path. Eleven pages rendered at 1280 and at 390:
home, /about, /services, /services/cqc-financial-viability-statement, /services/care-payroll,
/for/care-homes, /for/domiciliary-care, the blog post
/blog/payroll-and-workforce-costs/sponsoring-care-workers-true-cost,
/calculators/true-cost-care-hour-calculator, /contact, /book.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | **Care has no header CTA at all.** At 1280 the header contains only the wordmark and eight plain nav links (Services, For you, Calculators, Research, Blog, About, Contact), none with a button background. At 390 the header collapses to the wordmark plus a plain "Contact" text link. So the 1024 hide rule is moot: there is nothing to hide. Property has "Book consultation" as a filled button. | `getBoundingClientRect` and `getComputedStyle` over every `header a,button` at both widths; `header a[class*=bg-]` returns null |
| D5 | **No web font is applied.** `body` computes `ui-sans-serif, system-ui, -apple-system, sans-serif`, the Tailwind default stack. Property uses Plus Jakarta Sans; contractors-ir35 and charities use GeistSans. Care is the only one of the four with no brand typeface. | `getComputedStyle(document.body).fontFamily` |
| D6 | No StatsCounter or stat-tile component rendered on any of the eleven pages, so the literal-value question does not arise on this site yet. | rendered DOM |
| D7 | `scrollWidth = 390` on all eleven pages, zero real overflow. Every element past the right edge is an offscreen honeypot or sr-only block at -9999px. | per-page `scrollWidth`, plus a parent `overflowX` walk on every offending element |
| D8 | Not run (a source-side gate, not a rendered-page check). | |
| G3 G7 G8 G9 | Not settleable from the rendered page; unchanged from the inventory. | |
| L3 | **Two forms on the calculator page, not one.** Both render the same button, "Get my figures checked" and "Request a review", both `mt-5 grid gap-4 sm:grid-cols-2` with the same fields (`full_name`, `phone`, `email`, `message`, `enquiry_ref`) and the same consent sentence. This is the duplicate-capture pattern wave 1 flagged on charities; care shares it. | `querySelectorAll('form')` dump on /calculators/true-cost-care-hour-calculator |
| L4 | Not settled per calculator by one read. | |
| L8 | **`/book` renders zero `<form>` elements.** Its h1 is "Book your free review call", it renders the booking prose "Pick a day and a time window that suits you. A care sector accounts specialist will call you then, no obligation.", then "This page needs the personal link from your email or text message." and a "Go to the contact form" link, but no picker and no form. Care's footer also has **no** "Book a consultation" link, unlike Property, contractors-ir35 and charities, so nothing on the site points at this page. | rendered DOM of `https://www.carehometax.co.uk/book`; `footer a[href="/book"]` returns null on all eleven pages |

## Reader findings

Care is the quietest of the four on writing and the thinnest on kit. Zero em-dashes in visible
body text on all eleven pages, zero US spellings, none of the eight AI-tell phrases, every title
agrees with its h1, and the copy is specific and sector-literate (National Living Wage of GBP 12.71,
CQC's own template, sleep-in NMW). Almost none of the positioning caveats render: "a specialist
reviews" appears nowhere on the eleven pages, and the "specialist partner network" consent
sentence appears only on the blog post and the calculator. The gaps are structural. There is no
header CTA, no sticky CTA, no chat widget, no brand typeface, no lead form on /services, no
`<main>` landmark on the homepage, and two identical capture forms on the calculator page.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | all 11 | no visible focus indicator on the first form field | focused `message` on /contact: `outlineStyle: "none"`, `boxShadow: "none"`, border colour unchanged, `:focus-visible` true | S |
| BLOCKER | /book | zero `<form>` elements while the page invites the visitor to pick a day and time | `querySelectorAll('form').length === 0`; "Pick a day and a time window that suits you." | S |
| FIX | /book | rule 8 caveat in the booking promise | "A care sector accounts specialist will call you then, no obligation." | XS |
| BLOCKER | all 11 | no header CTA anywhere, at any width | `header a[class*=bg-]` null; only plain nav links measured | S |
| FIX | home | **no `<main>` landmark**. /contact and the other pages have one; the homepage does not. | `document.querySelectorAll('main').length === 0` on `https://www.carehometax.co.uk/`, `=== 1` on /contact | XS |
| FIX | /services | zero `<form>` elements on the services hub; Property mounts the foot lead form there | `querySelectorAll('form').length === 0` | XS |
| FIX | calculator | two identical capture forms on one page, same button, same fields, same consent | both `mt-5 grid gap-4 sm:grid-cols-2`, fields `full_name, phone, email, message, enquiry_ref` | XS |
| FIX | all 11 at 390 | no sticky CTA and no chat widget in the DOM; **zero** fixed or sticky elements at all, so the header does not even stick | fixed and sticky element dump at 390 on home returns `[]` | M |
| FIX | all 11 | no brand typeface, body falls back to the system stack | `ui-sans-serif, system-ui, -apple-system, sans-serif` | S |
| NIT | home, /contact | the step-1 lead form renders no consent sentence in the DOM. It may appear at step 2, which cannot be checked without submitting. | form fields `enquiry_ref, role, message, situation, prompted, callGoal`, `consent` match null; the sentence does render on the blog post and calculator | see Questions |
| NIT | /services/care-payroll | first paragraph 131 words before the answer | "Care payroll is not standard payroll. The sector has three compliance risks that a generic bureau routinely misses..." | S |

Design numbers, 1280 and 390:

| Page | sw@390 | real overflow | header CTA 1280 / 390 | forms | sticky CTA at 390 | chat at 390 |
|---|---|---|---|---|---|---|
| home | 390 | 0 | none exists / none exists | 1 | no | no |
| /about | 390 | 0 | none / none | 1 | no | no |
| /services | 390 | 0 | none / none | 0 | no | no |
| service pages (2) | 390 | 0 | none / none | 1 | no | no |
| /for/ pages (2) | 390 | 0 | none / none | 1 | no | no |
| blog post | 390 | 0 | none / none | 2 | no | no |
| calculator | 390 | 0 | none / none | 2 | no | no |
| /contact | 390 | 0 | none / none | 1 | no | no |
| /book | 390 | 0 | none / none | 0 | no | no |
| gov.uk control | 390 | 0 | n/a | n/a | n/a | n/a |

Body text contrast 17.85:1 on every page, against the gov.uk control's 21:1. Primary CTA white on
`rgb(125, 107, 158)` measures 4.70:1, an AA pass and better than Property's 3.65:1. Every visible
form field carries a label; the only unlabelled field is the offscreen honeypot. No `<img>` is
missing an `alt`. One `<h1>` per page. Footer renders the full entity line: "Care Home Tax is a
trading name of Ashfield Trading Ltd, a company registered in England and Wales (company no.
16358723). Registered office: 20 Ashfield Avenue, Shipley, Bradford, BD18 3AL." That is a company
disclosure, not a rule 8 caveat, and it carries no "partner network" or "not an accountancy
practice" wording.

Sameness:

| Comparison | Result |
|---|---|
| lead-panel closing line, within care | not comparable: no lead panel closer renders on /services, and no `<main>` on home, so the last paragraph of each page is the footer entity line on all of them |
| service and segment opening paragraphs, within care | distinct and specific per page, the strongest writing of the four sites read |
| consent sentence against Property's | verbatim identical on the blog post and calculator, absent at step 1 elsewhere |
| CTA copy against Property's | Property "Book consultation" and "Send enquiry"; care "Continue" and "Get my figures checked", no book-a-call language anywhere in the chrome |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| L3 "NONE ... `CalcResultCta.tsx` present, no `ResultGate`" | False as a parity grade. The calculator page renders **two** identical capture forms, the same duplicate pattern wave 1 called an S gap on charities. | form dump above |
| L1 "NONE ... mounted on home, about, services, segment, blog post foot" | /services renders zero forms. The hub is not covered. | `querySelectorAll('form').length === 0` on /services |
| L8 "S ... routes exist ... Aswatax message presence not confirmed" | `/book` renders zero forms and no copy at all beyond the h1, and nothing on the site links to it. Nothing about the post-submit path is live on this route. | rendered DOM |
| D3 "?" | Settled, and the answer is not "hides below 1024": there is no header CTA to hide. | header element dump at both widths |
| D5 "?" | Settled: no web font, system stack only. | computed `fontFamily` |
| L5 "L, no chat widget component" and L7 "M, no sticky CTA" | Confirmed on the rendered page, and stronger than the source read suggested: there are **zero** fixed or sticky elements at 390, so the header itself does not stick either. | fixed element dump at 390 |

## Questions from this pass

- Does the step-2 screen of the home and contact lead form render the consent sentence? It is
  absent at step 1 and the brief forbids submitting a form on a live site, so this could not be
  settled. It matters because the sentence is the consent basis for the whole lead flow.
