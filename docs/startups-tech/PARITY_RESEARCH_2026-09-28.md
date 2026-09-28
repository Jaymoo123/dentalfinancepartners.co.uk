# Founder Tax Partners (startups-tech) parity research (2026-09-28)

Domain: www.foundertaxpartners.co.uk. Vercel project: live (per STATE.md and this GET check).
Launched: yes. Live status: `curl -sI https://www.foundertaxpartners.co.uk/` returns `200 OK`.

## Verdict in three lines

Live and structurally sound (schema, robots, llms.txt, nurture, calculators all present and
mostly firm-voiced), but it missed the 2026-09-28 positioning reversal entirely: "partner
network" caveats still render on contact, complete and thank-you, live-verified on /contact.
The three biggest gaps: (1) the positioning ruling was never applied here while five other
sites got it same-day (P2); (2) no design port at all, zero `web-shared/design` imports, zero
`port-startups-tech-*` tags (D1); (3) the lead kit is thin against Property's full kit: no chat
widget, no intent engine, only 3 of 7 mini-capture ids, foot form on 7 routes not on
about/services/for/calculators (L1, L2, L5, L6).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity` key present | absent | S | `grep -n '"entity"' startups-tech/niche.config.json` = no match; Property has it at line 2 |
| P2 | no caveats on prospect-facing surfaces (09-28 ruling) | "partner network" / "specialist firm from our partner network" on `/contact`, `/complete`, `/thank-you`, `DetailsForm.tsx` | L | `grep -rniE "partner network" startups-tech/web/src` hits `app/complete/page.tsx:94,119`, `app/contact/page.tsx:14`, `app/thank-you/page.tsx:54`, `components/forms/DetailsForm.tsx:116`; live-verified: `curl -s https://www.foundertaxpartners.co.uk/contact \| grep -i "partner network"` returns 2 hits. Property has none of these (same greps clean). The reversal commit (`63087d14`) and the checker-relax commit (`3753a3b7`) do not touch `startups-tech/` (`git show --stat <sha> \| grep startups` empty). This is a defect under rule 8; consent text and privacy policy wording are the exempted surfaces, not these |
| P3 | "free consultation" used, on-brand | 7 hits estate-style | NONE | `grep -rniE "free consultation\|free first call\|free review" startups-tech/web/src \| wc -l` = 7 |
| P4 | 24h promise, no nurture backing | "within 24 hours" x7, none in nurture copy (checked) | S | 7 hits in `web/src`; `grep -n "within 24 hours\|same working day" startups-tech/web/src/config/lead-nurture.ts` = no match, so this site shares Property's known defect (promise made, not backed by nurture) |
| P5 | shared builder, firm-first, `sameAs`/`parentOrganization`/`knowsAbout` | hand-rolled inline object in `layout.tsx:8`, no `sameAs`, no `parentOrganization`, no `knowsAbout` | M | `startups-tech/web/src/app/layout.tsx:8`: `{ "@context": ..., "@type": ["ProfessionalService","AccountingService"], "@id": ..., name, url, description, logo, areaServed: "GB" }`, not `lib/organization-schema.ts`, not the shared `packages/web-shared/schema/organization.ts` builder |
| P6 | firm-first | firm-first | NONE | `public/llms.txt` opens "Founder Tax Partners is a UK accountancy practice focused exclusively on funded and scaling technology companies", no caveat |
| L1 | mounted on home, about, services, segment, service, blog post, calculators, contact | mounted on home, contact, blog post, 4 research pages | M | `grep -rl "LeadForm\|LeadCTAPanel" startups-tech/web/src/app` = `page.tsx` (home), `contact/page.tsx`, `blog/[category]/[slug]/page.tsx`, 4 `research/*` pages. NOT on `about/`, `services/`, `for/[slug]/`, `calculators/[slug]/` (those use mini-capture ids instead, see L2) |
| L2 | 7 ids: `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` | 3 of 7 present: `calc_page_footer`, `inline_mini`, `calc_result` | S | `grep -rnoE '"(inline_mini\|mobile_tool\|calc_result_form\|calc_result\|resource_block\|calc_page_footer\|blog_short_resource)"' startups-tech/web/src \| sort -u` returns only those three. No `mobile_tool`, `calc_result_form`, `resource_block`, `blog_short_resource` |
| L3 | one form under result, no gate, no PDF | `CalcResultCta.tsx` present with `calc_result` id | ? | file exists (`components/calculators/CalcResultCta.tsx`) but did not open it to confirm single-form / no-gate / no-PDF; treat as open question |
| L4 | 6 route dirs + premium tools + `/embed` | 1 dynamic route (`calculators/[slug]/page.tsx`) + list page; `/embed` dir exists at site root | M | `find startups-tech/web/src/app/calculators -maxdepth 2` shows only `page.tsx` (list) and `[slug]/page.tsx` (one dynamic template for all calculators), versus Property's 6 separate route dirs. FAQPage/cite-this per calculator not individually checked, question |
| L5 | `SpecialistWidget.tsx` present | absent | L | `grep -rl "SpecialistWidget" startups-tech/web/src` = no match |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | absent | L | `grep -rl "IntentProvider\|ReturningBar\|DeepScrollModal" startups-tech/web/src` = no match |
| L7 | sticky CTA + hero CTA from `niche.config.json` `cta` | no `StickyCTA` found; hero copy comes from `niche.config.json` tagline/description, no dedicated `cta` key | S | `niche.config.json` has no `cta` key (only `tagline`/`description`); did not find a `StickyCTA` component in `startups-tech/web/src/components`, question whether a differently-named sticky CTA exists |
| L8 | thank-you, complete, tokened /book, Aswatax message | all present | NONE | `app/book/page.tsx` reads `searchParams.t` (signed lead token) and renders `BookingPicker` only if token present; `Aswatax` string present in `thank-you/page.tsx` and `components/forms/LeadForm.tsx` |
| L9 | file present, `delayHours` = gaps, firm voice, SMS ack | file present, two sequences (`startups_tech_contactability` 8 steps 0-168h, `startups_tech_detail_capture` 4 steps 0-168h), gap-style `delayHours` (0,0,4,24,48,96,168,264), no "partner network" wording in nurture copy | NONE | `web/src/config/lead-nurture.ts:308-470` and `:527-636`; `grep -n "partner network\|specialist firm" lead-nurture.ts` = no match, so nurture is clean of the P2 caveat even though other prospect surfaces are not |
| L10 | category-driven CTAs, some dead code | not directly inspected beyond `InlineMiniLeadForm` (`inline_mini` id) | ? | did not read `BlogPostRenderer` equivalent for this site to confirm category-driven mechanism or dead code, question |
| L11 | consent text, estate-wide | byte-identical wording (only a template-literal vs string-literal quoting difference) | NONE | `diff` of the `leadConsentText =` lines shows only backtick vs double-quote delimiters; text itself matches Property exactly |
| L12 | source in known CHECK list (dentists/property/medical/solicitors/general/agency) | code sends `source: "startups-tech"` | ? | `web/src/app/api/leads/submit/route.ts:28,67`: `createLeadSubmitHandler({ source: "startups-tech" })` and fallback `String(body.source ?? "startups-tech")`. "startups-tech" is not in the memory-recorded CHECK list; could not read the live DB constraint from the repo, question for the ops/data agent |
| G1 | AI crawler allowlist | 40+ named bots (Google, OpenAI, Anthropic, Perplexity, Meta, Bing, DuckDuckGo, Mistral, You.com, Cohere, Brave, Bytespider, CCBot, Diffbot, Amazon, Yandex, Naver, Seznam, Mojeek, Ahrefs, social previews), disallow `/thank-you`, `/admin`, host line set | NONE | `startups-tech/web/src/app/robots.ts` full contents read; matches or exceeds Property's stated allowlist pattern |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout`, per-page | hand-rolled, none of `sameAs`/`parentOrganization`/`knowsAbout`, one node in `layout.tsx` (site-wide) | M | see P5; same evidence, this is the GEO-layer restatement of the same gap |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | not directly inspected (schema per page not opened) | ? | question, did not open `for/[slug]/page.tsx` or `services/*` for schema blocks |
| G4 | `BlogPosting`, `author` Org/Person, real `dateModified` | not directly inspected; STATE.md 07-15 entry claims "Article dateModified" was added | ? | STATE.md line: "AI/GEO parity-or-greater: ... Article dateModified", claimed but not independently verified against post frontmatter in this pass |
| G5 | route or static, firm-first, UTM tags, audiences/services/calculators listed | static `public/llms.txt`, firm-first, lists 5 "who we help" audiences with links, no UTM tags checked | S | `head -15 startups-tech/web/public/llms.txt`: static file (not a route), content firm-first and lists audiences/services; did not verify `utm_source=chatgpt&utm_medium=llms` tagging on the links shown |
| G6 | `buildLlmsFullRoute`, all posts listed, under 19.07 MB | route file using the shared `buildLlmsFullRoute` builder | NONE | `web/src/app/llms-full.txt/route.ts:1-7`: `import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull"`; live `curl -sI` returns 200. Size not measured live (would need a full GET), minor question |
| G7 | real/omitted `lastModified`, hreflang, new routes included | not directly inspected | ? | question, did not open `sitemap.ts` |
| G8 | canonical-hub fix (`bb297ab2f`, 2026-09-27) | fix present | NONE | `git show --stat bb297ab2f` touches `startups-tech/web/src/app/for/page.tsx`, `layout.tsx`, `services/page.tsx`, this site carries the fix |
| G9 | noindex only where correct, `/embed` rule | `/embed` route dir exists at `startups-tech/web/src/app/embed`; noindex placement not checked | ? | question |
| G10 | GSC config entry, IndexNow key, Bing verified | not checked in this pass (out of scope for a repo-only inventory beyond a grep) | ? | `agents/config/gsc_config.py` and IndexNow key file not grepped this session, question, hand to ops read |
| G11 | 09-27 AI-assistant baseline coverage | not checked | ? | did not open `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 to confirm inclusion, question |
| C1 | 806 posts | 32 posts, no `date` field found >= 2026-07-30 in the quick frontmatter grep, STATE.md dated content additions from 2026-07-15/16 | L | `find startups-tech/web/content/blog -type f \| wc -l` (by listing) = 32 `.md` files; a `grep -h '"date"'` across the corpus returned no matches (frontmatter may use a different key or bare YAML, see question) |
| C2 | exists, dated, sectioned | exists, 305 lines, last git-committed 2026-07-15 | S | `docs/startups-tech/house_positions.md`, `git log -1 --format=%ad -- docs/startups-tech/house_positions.md` = 2026-07-15, over two months stale against Property's continuously-maintained file |
| C3 | `COVERAGE_MAP_2026-09.md` exists | absent | M | `find docs/startups-tech -iname "*coverage*"` = no match |
| C4 | `/for/[slug]` dynamic, Property template | `/for/[slug]` dynamic exists, template conformance (Service+FAQPage+breadcrumb+one form+stat tiles) not verified | ? | route shape matches (`app/for/[slug]/page.tsx`, `app/for/page.tsx` hub); did not open the template body to confirm the five elements |
| C5 | `/services/*` and money pages listed | `services/` dir exists, contents not enumerated in this pass | ? | question |
| C6 | validator pass/fail | site unsupported by the validator | N/A | `python scripts/validate_blog_content.py --site startups-tech` errors: `invalid choice: 'startups-tech' (choose from Property, Dentists, Medical, Solicitors, contractors-ir35, care, charities)` |
| C7 | `dateModified`/`reviewedAt` on posts | claimed present per STATE.md 07-15 entry ("Article dateModified"), not independently re-verified this pass | ? | see G4; same open item |
| C8 | byline model | not checked | ? | question |
| C9 | link audit tool | not checked; no `scripts/` link-audit specific to this site found in this pass | ? | question |
| D1 | design standard | 0 `port-startups-tech-*` tags, 0 `web-shared/design` imports in `web/src` | L | `git tag -l 'port-startups-tech-*'` = empty; `grep -rl "web-shared/design" startups-tech/web/src \| wc -l` = 0. No design port has been run on this site at all |
| D2 | `prose-standard.css` imported | imported | NONE | `startups-tech/web/src/app/globals.css:6`: `@import "../../../../packages/site-styles/prose-standard.css";` |
| D3 | header CTA hides < 1024 | not checked (would need rendered DOM, live or emulated) | ? | question, not run this pass |
| D4 | non-SVG og:image, favicon set, `metadataBase` | `og:image` via dynamic `/api/og` route (not SVG, matches standard), `icon.svg` present as tab icon, `metadataBase` set | NONE | `layout.tsx:11` `metadataBase: new URL(siteUrl)`; `openGraph.images` = `/api/og` (dynamic route, not a static SVG); `src/app/icon.svg` exists as the favicon source (per the estate favicon commit `9e43db45b`, "favicons that match each site's header mark", which touches multiple sites including likely this one, not individually confirmed) |
| D5 | fonts | not checked | ? | question |
| D6 | StatsCounter literal-value support | not checked | ? | question |
| D7 | 390px scrollWidth, real emulation | not run this pass (would require puppeteer-core with device emulation per rule 7) | ? | not attempted; flagging as a genuine gap in this inventory rather than guessing |
| D8 | playbook 9.1 kit-adoption gate | not run | ? | not run, D1 already shows 0 kit imports, so the gate would almost certainly fail, but the numeric run was not performed |
| I1 | live, all key routes 200 | live, all checked | NONE | `curl -sI https://www.foundertaxpartners.co.uk/` = 200; `/robots.txt` = 200 (40-bot allowlist visible); `/llms.txt` = 200; `/llms-full.txt` = 200; `/sitemap.xml` = 200 |
| I2 | Vercel project, deploy date vs HEAD | STATE.md's newest content entry is 2026-07-15/16, but 31 commits since then touch `startups-tech/` (crons, canonical fix, favicons, Aswatax, consent wording, article styling) | S | `git log --since=2026-07-16 --oneline -- startups-tech/ \| wc -l` = 31; STATE.md was not updated to reflect this activity (see I7) |
| I3 | test coverage | 8 test files | S | `find startups-tech/web/src -iname "*.test.ts*" \| wc -l` = 8; no count comparison to Property was run |
| I4 | GA4 present, CSP allows `region1.google-analytics.com`, consent banner | `AnalyticsProvider`/`ConsentProvider`/`ConsentedScripts` wired in `layout.tsx`; no CSP header set anywhere in the app (no `next.config.ts` headers, no `vercel.json` headers) | S | `grep -rln "Content-Security-Policy" startups-tech/web` = no match; live `curl -sI` shows no `content-security-policy` header at all. This means GA4 cannot be CSP-blocked here (no CSP to block it), unlike the `region1.google-analytics.com` trap that affected sites WITH a CSP, different shape of the same layer, worth a data-agent check that GA4 events are actually landing |
| I5 | flags/env read | crons for lead-nurture, lead-nurture-digest, lead-retention, lead-reconcile in `vercel.json`; `process.env`/`getFlag` usage not enumerated | ? | `startups-tech/web/vercel.json` crons listed; a full flag grep was not run this pass |
| I6 | monitored_pages rows | unknown from repo | ? | cannot read Supabase from this pass; hand to ops/data agent |
| I7 | STATE.md exists, newest entry date, contradicts code? | exists, newest entry 2026-07-15/16, external-steps checklist still shows domain purchase, GSC, Bing, GA4, phone number and brand assets as unchecked TODOs, but the site demonstrably has DNS/domain (live 200), and 31 commits of later work | L | `docs/startups-tech/STATE.md` tail shows unchecked boxes for "[ ] Buy the domain", "[ ] GSC ... verify", "[ ] Bing Webmaster", "[ ] GA4: create property", "[ ] Real phone number", "[ ] Brand assets", all contradicted by the site being live with a real domain, and the phone number in `niche.config.json` is still literally `"+44 20 0000 0000"` (placeholder), matching STATE.md's outstanding item, so at least that one line is honest and current |

## Unique to this site

- No CSP header configured anywhere in the app (`next.config.ts`, `vercel.json`, or live response headers), this is different from every other estate site checked in memory, which set a CSP that then blocked `region1.google-analytics.com`. Here there is nothing to block, but nothing to review either; worth a one-line check that GA4 events land, since it is a different failure mode from the documented trap.
- Placeholder phone number still live: `niche.config.json` `contact.phone` = `"+44 20 0000 0000"`, shipped to a live public site.
- Calculators are served from a single `[slug]` dynamic template rather than Property's 6 separate route directories, this is architecturally leaner, not necessarily worse, but it means FAQPage/cite-this coverage per calculator was not individually verifiable in this pass and should be spot-checked per slug.

## Shares Property's open defects

- The 24-hour promise pattern: "within 24 hours" appears 7 times in `web/src`, and the nurture sequence does not contain that wording, so if the promise is not met the same trust gap Property has exists here too (P4).
- `/book` behaviour is token-gated correctly here (unlike the footer defect noted for Property), so this specific Property defect is NOT shared, worth flagging as a positive delta rather than a shared defect.

## Questions (missing data, not findings)

1. L3, did not open `CalcResultCta.tsx`/`ResultGate` equivalent to confirm single-form, no-gate, no-PDF-offer on the calculator result.
2. G3, G4, G7, G9, schema on segment/service pages, BlogPosting `author`/`dateModified`, sitemap `lastModified` rule, and noindex placement were not individually opened this pass.
3. G10, `agents/config/gsc_config.py` entry, IndexNow key file, Bing Webmaster verification status not checked.
4. G11, whether the 09-27 AI-assistant naming baseline (`LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6) covers this site.
5. C1, blog frontmatter date field format differs from the `"date"` key the quick grep used; the 32-post count is solid (file count) but "posts with date >= 2026-07-30" could not be computed without reading each file's actual frontmatter key.
6. C4/C5/C8/C9, segment-page template conformance, `/services/*` page list, byline model, and internal link audit were not run.
7. D3, D5, D6, D7, D8, header CTA breakpoint, fonts, StatsCounter literal-value handling, real 390px emulation, and the numeric playbook 9.1 gate were not run this pass (D7/D8 require live browser emulation per rule 7, not attempted).
8. I5, I6, full env/flag enumeration and Supabase `monitored_pages` rows need a data/ops agent with DB access.
9. L12, whether the live `leads` table CHECK constraint actually accepts `source = 'startups-tech'`, given memory only lists dentists/property/medical/solicitors/general/agency as known-valid values.

## Commands and files read

- `startups-tech/web/niche.config.json`, `startups-tech/niche.config.json` (full)
- `startups-tech/web/src/config/site.ts`, `lead-nurture.ts` (excerpts, lines 1-50, 300-650)
- `startups-tech/web/src/app/layout.tsx` (schema block, metadata)
- `startups-tech/web/src/app/robots.ts` (full)
- `startups-tech/web/public/llms.txt` (head -15)
- `startups-tech/web/src/app/llms-full.txt/route.ts`
- `startups-tech/web/content/blog/*.md` (listing, 32 files)
- `docs/startups-tech/house_positions.md`, `docs/startups-tech/STATE.md` (tail)
- `startups-tech/web/next.config.ts`, `vercel.json`
- `startups-tech/web/src/app/book/page.tsx`
- `git log --since=2026-07-16 --oneline -- startups-tech/`
- `git show --stat 63087d14 / 815ae7de / 3753a3b7 / bb297ab2f | grep -i startups`
- `git tag -l 'port-startups-tech-*'`
- `grep -rniE "partner network|not an accountancy practice|referral network|a specialist reviews|we are not accountants" startups-tech/web/src startups-tech/niche.config.json startups-tech/web/public`
- `grep -rl "LeadForm\|LeadCTAPanel" startups-tech/web/src/app`
- `grep -rnoE` for mini-capture ids across `startups-tech/web/src`
- `grep -rl "SpecialistWidget\|IntentProvider\|ReturningBar\|DeepScrollModal" startups-tech/web/src`
- `grep -rl "web-shared/design" startups-tech/web/src`
- `python scripts/validate_blog_content.py --site startups-tech`
- `curl -sI https://www.foundertaxpartners.co.uk/` and `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`
- `curl -s https://www.foundertaxpartners.co.uk/contact` and `/thank-you` (grep for "partner network")

---

# WAVE 2 READER (2026-09-28)

Rendered with `puppeteer-core` (repo root) against Chromium
`ms-playwright/chromium-1223/chrome-win64/chrome.exe`, `page.emulate` with
`isMobile: true`, `hasTouch: true`, 390x844, `deviceScaleFactor: 3`.

**Control: https://www.gov.uk rendered with the same code returns
`document.documentElement.scrollWidth` = 390 at 390 and 1280 at 1280, zero
overflowing elements.** Every 390 number below sits against that control, so the
overflow findings here are real and not the Edge window-size trap.

Pages rendered: `/`, `/about`, `/services/rd-tax-claims`,
`/services/seis-eis-advance-assurance`, `/for/pre-seed-founders`,
`/for/saas-companies`, `/blog/share-schemes-and-emi/what-is-an-emi-scheme`,
`/calculators/rd-relief-estimator`, `/contact`, `/book`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | **N/A, there is no header CTA.** No link or button matching a CTA pattern exists inside `<header>` on any page rendered, at either width | rendered `header.querySelectorAll('a,button')` |
| D5 | **No webfont.** `body` computes to `ui-sans-serif, system-ui, -apple-system, sans-serif`. Gate row 3 returns empty: no `next/font` or `geist/font` import in `layout.tsx` | `getComputedStyle(document.body).fontFamily` |
| D6 | No `StatsCounter`, no stat strip, no decline comment. Comment-stripped markers all zero | gate marker row |
| D7 | **FAIL. Real page-level horizontal scroll.** `scrollWidth` = **417** on `/services/rd-tax-claims`, `/services/seis-eis-advance-assurance`, `/for/pre-seed-founders` and `/for/saas-companies`, and **592** on the blog post, against a control of 390 | rendered DOM |
| D8 | Gate 9.1: row1 layout-utils **file does not exist**, row2 kit=**0 distinct / 0 call sites**, row2a declined=0, row2b **adopted=0 declined=0**, row3 webfont **empty**, row4 backdrop=**0**, row5 Eyebrow=**0** / section-label=**9**, row6 0 ring lines, row7 1 gradient file, row8 walks=0 guards=0. Markers ping=0 stats=0 backdrop=0 rounded-full=0. **Seven of the ten rows fail, each a BLOCKER on its own** | gate block run verbatim |
| G3 | Segment pages carry `FAQPage` (1) only. **Zero `Service`, zero `BreadcrumbList`, zero `AccountingService`** | curl `/for/saas-companies` |
| G7 | `lastmod` real and recent: `2026-09-23T12:25:19.460Z` | curl sitemap.xml |
| G8 | Canonical self-referencing and correct on `/for/saas-companies` | curl |
| G9 | PASS. `/embed/rd-relief-estimator` serves `robots: noindex, nofollow`, HTTP 200, and no `/embed` URL is in the sitemap | curl |
| L3 | **PASS.** `/calculators/rd-relief-estimator` renders 2 forms, `calc_result` under the result and `calc_page_footer` at the foot. No gate, no modal, no PDF offer | rendered forms = 2; curl grep on the ids |
| L4 | 4 calculator URLs in the sitemap | grep on sitemap |
| L8 | `/book` renders zero forms at 1280 and 390. Copy explains the missing token | rendered DOM |
| L10 | Blog post renders **zero** forms and zero capture ids. No blog capture live | rendered DOM |
| C5 | Live service pages: `/services/rd-tax-claims`, `/services/seis-eis-advance-assurance`, plus the `/services` hub. Segment slugs: `/for/pre-seed-founders`, `/for/funded-startups`, `/for/saas-companies`, `/for/software-development-companies`, `/for/fintech-startups` | sitemap and `/llms.txt` |
| C8 | No byline visible on the blog post rendered; it closes on "Sources: gov.uk: EMI rules, gov.uk: CSOP, HMRC ERS manual." | rendered body text |

## Reader findings

This is the weakest site in the reader set and the gap is structural, not
cosmetic. It has adopted none of the design kit, loads no webfont, has no header
CTA, and its service and segment pages show raw HTML anchor markup to the reader
as visible text.

It also breaks the 390 viewport for real: four pages scroll to 417 px and the
blog post to 592, against a verified 390 control.

The lead kit is thin in the same shape as crypto: only home, contact and the
calculator carry a form. Everything else is a dead end.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | `/services/rd-tax-claims`, `/services/seis-eis-advance-assurance`, `/for/pre-seed-founders`, `/for/saas-companies` | Raw anchor markup rendered as visible text. The first paragraph of `/services/rd-tax-claims` reads: `For accounting periods beginning on or after 1 April 2024, there is one <a href="https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-large-companies">R&D expenditure credit at 20%</a>` | served HTML contains `&lt;a href=&quot;`; cause is `<a>` stored in `body` in `startups-tech/web/src/data/startups-services.ts` and `startups-hubs.ts`, rendered as a JSX text child at `startups-tech/web/src/app/services/[slug]/page.tsx:50,63`. This is the exact failure the playbook 9.1 counter-rule predicts for `CoverageCards` and `CardStack` | M |
| BLOCKER | 4 service and segment pages | `scrollWidth` 417 at a 390 viewport. Overflowing element is `article.border.border-neutral-200.border-l-4` at right edge 417, with its `h3` and `p` at 392 | rendered `getBoundingClientRect`, control 390 | S |
| BLOCKER | blog post | `scrollWidth` **592** at a 390 viewport. A bare `<table>` with no scroll wrapper reaches 592 | rendered DOM | S |
| BLOCKER | site-wide | No header CTA at any width. Property carries one at 1280 on every page | rendered `<header>` has no CTA element | S |
| BLOCKER | site-wide | Design kit not adopted at all: 0 kit imports, no `layout-utils.ts`, no backdrop, 9 `section-label` and 0 `<Eyebrow>`, and no webfont, so the site renders in the system stack. The playbook calls the missing webfont "the loudest unfinished template signal a non-technical eye reads" | gate 9.1 rows 1, 2, 2b, 3, 4, 5 | L |
| BLOCKER | `/about`, both `/services/*`, both `/for/*`, blog post | Zero `<form>` elements on seven of the ten pages rendered | rendered form count = 0 | M |
| FIX | `/contact` | Prospect-facing first sentence, not the consent line: "Tell us about your startup tax situation. A specialist firm from our partner network may contact you directly, and you will hear back within 24 hours." | rendered body text | XS |
| FIX | `/for/pre-seed-founders`, `/for/saas-companies` | Slug pasted into the closing sentence: "Tell us about your pre-seed founders situation and we will reply within 24 hours" and "Tell us about your saas companies situation..." | rendered body text | S |
| FIX | site-wide | No footer CTA at all. `footer a` matching book, consult, contact, call, get or start returns an empty list | rendered DOM | XS |
| FIX | `/services/seis-eis-advance-assurance` | Opens on a 190-word disclaimer paragraph instead of the answer: "This is a tax-compliance service only. We give guidance on qualifying for the schemes..." | rendered first paragraph | S |
| FIX | `/calculators/rd-relief-estimator` | No focus ring on the first input: `outlineStyle: "none"`, `boxShadow: "none"` | rendered `getComputedStyle` | S |
| FIX | site-wide | No chat widget, no sticky CTA, no returning bar in the DOM on any page | rendered DOM | M |
| NIT | `/about` | Body text contrast 6.29:1, the lowest on the site but passing AA | computed, opaque background | XS |

### Design numbers

| Page | sw@1280 | sw@390 | hdr CTA | body contrast | CTA contrast | forms | overflow selectors @390 |
|---|---|---|---|---|---|---|---|
| `/` | 1280 | 390 | none | 12.98 | 15.99 | 1 | tables at 465 inside scroll wrappers |
| `/about` | 1280 | 390 | none | 6.29 | 6.29 | 0 | none |
| `/services/rd-tax-claims` | 1280 | **417** | none | 6.29 | 6.29 | 0 | `article.border-l-4`@417, `h3`@392, `p`@392 |
| `/services/seis-eis-advance-assurance` | 1280 | 390 | none | 6.29 | 6.29 | 0 | none |
| `/for/pre-seed-founders` | 1280 | **417** | none | 6.29 | 6.29 | 0 | `article.border-l-4`@417 |
| `/for/saas-companies` | 1280 | **417** | none | 6.29 | 6.29 | 0 | `article.border-l-4`@417 |
| blog post | 1280 | **592** | none | 10.35 | n/a | 0 | bare `table`@592 |
| calculator | 1280 | 390 | none | 6.29 | 6.29 | 2 | honeypots only |
| `/contact` | 1280 | 390 | none | 7.81 | n/a | 1 | honeypots only |
| `/book` | 1280 | 390 | none | 7.81 | 6.29 | 0 | none |

Zero em-dashes, zero en-dashes, zero US spellings, zero AI-tell phrases, zero
images without `alt`, zero broken images, zero unlabelled visible inputs, zero
visible placeholder phones or emails on the rendered pages (`niche.config.json`
still holds `+44 20 0000 0000`, which wave 1 recorded, but it does not reach the
pages checked). `.prose p` on the blog post has rules: `margin-bottom: 20px`,
`font-size: 18px`. Longest paragraph 190 words
(`/services/seis-eis-advance-assurance`).

### Sameness

| Comparison | Result |
|---|---|
| Segment-page closers within startups-tech | SAME TEMPLATE, slug-substituted: "Tell us about your pre-seed founders situation and we will reply within 24 hours" / "Tell us about your saas companies situation and we will reply within 24 hours" |
| Service-page closers within startups-tech | IDENTICAL final line on both: "Tell us about your situation and we will reply within 24 hours." |
| Against Property's shared close | NOT shared. Property ends every `/for/` and `/services` page on: "A couple of sentences helps us prepare properly for your call." / "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." / "We respond within 24 hours and store your details securely." startups-tech carries only the consent sentence, on the two pages that have a form |
| Against crypto | The slug-substitution template, the two-form calculator, and the zero-form service and segment pages are shared with crypto. The same fix closes both |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| L3 "not opened, treat as open question" | PASS. Two forms on the calculator, `calc_result` under the result, `calc_page_footer` at the foot, no gate | rendered DOM, curl on the ids |
| D3 "not checked" | There is no header CTA to hide. The row is N/A, not a pass | rendered `<header>` |
| D5 "not checked" | No webfont. `ui-sans-serif, system-ui` on `body`, and gate row 3 is empty | rendered plus gate |
| D7 "not attempted" | Run and FAILING. 417 on four pages, 592 on the blog post, control 390 | rendered DOM |
| D8 "not run, would almost certainly fail" | Run. Seven of ten rows fail | gate block |
| G3 "not inspected" | `FAQPage` only. No `Service`, no `BreadcrumbList` | curl |
| I7 "phone number still `+44 20 0000 0000`" | Confirmed present in config, but it does not render on any of the ten pages checked | rendered text scan for placeholder patterns = none |
