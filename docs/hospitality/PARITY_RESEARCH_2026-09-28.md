# Hospitality Tax parity research (2026-09-28)

Domain `www.hospitalitytax.co.uk`. Vercel project `prj_sQNit8s3hKwuFaHdkBQORKsHq3Vb`.
Launched: yes, live in production (`curl -sI https://www.hospitalitytax.co.uk/` returns
`200 OK`; `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all `200`). `docs/hospitality/STATE.md`
still says "DEPLOY IS HELD" and "brand working, not final" at the top, but the same file's
2026-08-25 entry proves production SHA `435cc12e` was live since 2026-07-16 and remains ahead;
the STATE.md header is stale, the deploy is real.

## Verdict in three lines

Hospitality has the mechanical lead kit (forms, nurture, calculators, schema, llms files, footer,
legal pages) but is still running the pre-ruling "partner network" referral model end to end,
which the 2026-09-28 evening ruling now makes a defect on every prospect-facing surface it
touches. The three biggest gaps: (1) the entire post-submit and consent path (`complete`,
`thank-you`, `privacy-policy`, consent text, calculator consent text) says "a specialist firm
from our partner network may contact you", not "we do the work"; (2) no chat widget, no intent
engine (returning bar / deep-scroll modal), no sticky CTA anywhere in the codebase, all present
on Property; (3) GA4 CSP is missing `region1.google-analytics.com` in `connect-src`, so UK
traffic is very likely undercounted here the same way it was estate-wide until the 09-23 fix
(`hospitality/web/vercel.json` CSP header has no `region1` entry).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity` key in niche.config.json states firm-first identity | no `entity` key at all in `hospitality/niche.config.json` (grepped for "entity", zero hits) | M | `hospitality/niche.config.json` |
| P2 | no caveat phrases on prospect surfaces | "partner network" / "specialist partner network" language on `complete`, `thank-you`, `privacy-policy` and in `config/site.ts` `leadConsentText` and `lib/calculators/site.ts` consent text | L | `hospitality/web/src/app/complete/page.tsx:94,119`; `thank-you/page.tsx:52`; `privacy-policy/page.tsx:88,124,195`; `config/site.ts:12`; `lib/calculators/site.ts:11`; `niche.config.json:6` |
| P3 | "free consultation/review" present, consistent | "Book your free review" / "free review call" on `/book`, `BookingPicker.tsx`, and 3 nurture messages | NONE | `web/src/app/book/page.tsx:14,32`; `components/forms/BookingPicker.tsx:160`; `config/lead-nurture.ts:344,459,643` |
| P4 | 24h promise widely present, no nurture email backs it (known Property defect) | 16 `delayHours` entries define the actual send cadence (0,0,4,24,48,96,168,264 for contactability; 0,24,48,168 for a second sequence); no literal "within 24 hours" promise text found in a grep of `web/src` and `niche.config.json` | NONE | `config/lead-nurture.ts:335-472` |
| P5 | `AccountingService`, firm-first description | `@type: ["ProfessionalService", niche.seo.organization_type]` where `organization_type` = `"AccountingService"` (so it IS AccountingService, via a two-value array); description comes from `siteConfig.description`, not read here for caveat wording | S | `web/src/lib/schema.ts:11-38`; `niche.config.json:88` |
| P6 | firm-first opening lines | `public/llms.txt` opens "Hospitality Tax is a UK accountancy practice focused exclusively on the hospitality sector", firm-first, no caveat, but this is inconsistent with the caveated live consent/post-submit copy (P2) | XS | `hospitality/web/public/llms.txt:1-5` |
| L1 | mounted on home, about, services, segment, service, blog post, calculators, contact | `LeadForm` mounted on `page.tsx` (home), `contact/page.tsx`, `blog/[category]/[slug]/page.tsx`, and the two `/research` index pages; NOT found on `about/page.tsx`, `services/page.tsx`, `services/[slug]/page.tsx`, `for/[slug]/page.tsx` (grep for `LeadForm\|MiniCapture\|CalcResultCta\|formId` on those four files returned nothing) | M | `grep -rl LeadForm hospitality/web/src/app` |
| L2 | 7 shared mini-capture ids | `calc_page_footer`, `inline_mini`, `calc_result` all present and wired; `mobile_tool` and `resource_block` referenced only in `role-labels.ts` display strings, no component instantiates them | S | `web/src/app/calculators/[slug]/page.tsx:108`; `components/blog/InlineMiniLeadForm.tsx:16`; `components/calculators/CalcResultCta.tsx:9`; `lib/leads/role-labels.ts:35-39` |
| L3 | one form under result, no gate, no PDF offer | `CalculatorClient.tsx` does not reference `CalcResultCta` or `MiniCapture` directly (grep empty); `CalcResultCta.tsx` exists as its own component with `formId="calc_result"`, need the render tree, not confirmed wired from the calculator page itself | ? | tried `grep -n "CalcResultCta\|MiniCapture" CalculatorClient.tsx`, empty; component exists but call site not located in this pass |
| L4 | 6 route dirs, premium tools, `/embed` | 3 calculators: tronc/tips PAYE+NIC, food & drink VAT checker, staff cost & rota margin (`lib/calculators/tools/{staff-cost,tronc,vat-checker}.ts`, each with a `.test.ts`); dynamic `/calculators/[slug]` route, no separate premium tier; `/embed/[slug]` exists | M | `find hospitality/web/src/lib/calculators/tools` |
| L5 | `SpecialistWidget` present | no chat widget anywhere in `web/src` (grep for `SpecialistWidget\|ChatWidget\|chat-widget` empty) | M | `grep -rl SpecialistWidget hospitality/web/src` = no output |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | none present (grep empty; only match anywhere was `lib/leads/reply-intent.ts`, an unrelated nurture-reply file) | M | `grep -rl "IntentProvider\|DeepScrollModal\|ReturningBar" hospitality/web/src` = no output |
| L7 | `StickyCTA` mounted on homepage, hero CTA from niche.config `cta` | no `StickyCTA` component anywhere (grep empty); hero CTA copy source not traced in this pass | M / ? | `grep -rl StickyCTA hospitality/web/src` = no output |
| L8 | thank-you, complete, tokened /book, Aswatax message | all four present: `/thank-you`, `/complete`, `/book` (`BookingPicker.tsx`, `DetailsForm.tsx` both exist), Aswatax mentioned in `thank-you/page.tsx:75,86` and `LeadForm.tsx:420` | NONE | files listed above |
| L9 | `delayHours` = gaps, 8 steps, firm voice, SMS ack | file present, gaps confirmed (comment at line 328 states "Delays from step 0: 0, 0, 4, 24, 48, 96, 168, 264 hours" matching the literal values); voice is warm/operator-specific ("floor comes first", "between lunch and evening service") but NOT firm-voice per rule 8, no partner-network caveat text found inside the nurture messages sampled, so nurture itself is clean, only the surrounding pages are caveated | S | `config/lead-nurture.ts:326-360` |
| L10 | category-driven CTA via `CTA_BY_CATEGORY` | `BlogCategoryHub`/`CTA_BY_CATEGORY`/`BlogSidebarCta` not present; only a plain `categorySlug` param used to filter posts in `lib/blog.ts:112,117`, and a single `InlineMiniLeadForm`, mechanism is simpler than Property's, not proven broken, but not category-driven CTA copy | S | `grep -n "categorySlug\|CTA_BY_CATEGORY\|BlogSidebarCta" hospitality/web/src` |
| L11 | Property's consent text (not reproduced here, diff by owner) | `leadConsentText` = "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose..." | L | `config/site.ts:12`; duplicated in `lib/calculators/site.ts:11` |
| L12 | source in CHECK constraint | `source: "hospitality"` sent by `/api/leads/submit` (`createLeadSubmitHandler({ source: "hospitality" })`); `hospitality` IS present in the current `leads_source_valid` CHECK constraint (migration `20260803000002_add_divorce_finances_to_leads_and_sites.sql:31-38`); this supersedes the memory note that only dentists/property/medical/solicitors/general/agency are valid, that list is stale | NONE | `web/src/app/api/leads/submit/route.ts:28,67`; `supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql:31-38` |
| G1 | large AI-crawler allowlist | 40-bot allowlist (Google, OpenAI, Anthropic, Perplexity, Apple, Meta, Bing, DuckDuckGo families all present in the list sampled) | NONE | `web/src/app/robots.ts:6-40` |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | hand-rolled `buildOrganizationJsonLd()` in `lib/schema.ts`, not the `packages/web-shared/schema/organization.ts` builder; has `legalName: "Ashfield Trading Ltd"`, `sameAs` = Companies House 16358723 only, 10-item `knowsAbout`; no `parentOrganization` field found in the function body | S | `web/src/lib/schema.ts:11-40` |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | `buildFaqJsonLd` and `buildBreadcrumbJsonLd` helpers exist in `lib/schema.ts`; whether `/for/[slug]` and `/services/[slug]` actually call them was not traced page-by-page in this pass | ? | helpers confirmed to exist, call sites not confirmed |
| G4 | `BlogPosting`, `dateModified` real | not traced in this pass; `getAllPosts()` exists in `lib/blog.ts:44` but schema emission from blog post pages not checked | ? | not checked, ran out of budget for this row |
| G5 | route/static, firm-first, UTM tags, hand-kept or derived | static `public/llms.txt`, firm-first opening (see P6), lists calculators and operator hubs, but links sampled (`/calculators`, `/for/restaurants` etc.) carry no visible `utm_source=chatgpt&utm_medium=llms` tag in the excerpt read | S | `web/public/llms.txt:1-16` |
| G6 | `buildLlmsFullRoute`, lists all posts | `src/app/llms-full.txt/route.ts` exists (a route, not static); live file is 401,899 bytes (~0.4 MB), well under the 19.07 MB ISR ceiling that is a Property-only problem | NONE | `curl -s https://www.hospitalitytax.co.uk/llms-full.txt \| wc -c` = 401899 |
| G7 | real/omitted `lastModified`, hreflang, new routes included | `sitemap.ts` uses `lastModified: now` (build-time `now`, not real per-page dates) on every route sampled, including `/blog` (daily) and static pages | S | `web/src/app/sitemap.ts:14-23` |
| G8 | canonical-hub fix shipped | hospitality was one of the four sites fixed in the 2026-09-27 canonical commit (`bb297ab2`); `/services` and `/for` now set their own canonical, root `alternates.canonical` removed | NONE (fixed) | `git log --since=2026-09-26 --grep=canonical --stat -- hospitality/` shows `bb297ab2` touching `for/page.tsx`, `layout.tsx`, `services/page.tsx` |
| G9 | noindex only where needed, `/embed` rule | `/embed/[slug]/page.tsx` exists; explicit `noindex` metadata on it not confirmed in this pass (grep for "noindex" across the two files checked returned nothing, meaning either it is absent or set elsewhere e.g. a shared layout) | ? | `grep -n noindex embed/[slug]/page.tsx robots.ts` = no output |
| G10 | GSC config entry, IndexNow key + script, Bing verified | `agents/config/gsc_config.py` has no "hospitality" match (grep clean), not registered there; an IndexNow key file `public/8a4e41b245878dc7f01421815bfda448.txt` IS present; Bing verification status unknown from repo | M / ? | `grep -l hospitality agents/config/gsc_config.py` = no match; `ls hospitality/web/public \| grep indexnow` found the key file by pattern |
| G11 | 09-27 baseline (leads-250 T6) covers this site | not checked against `LEADS_250_PROGRAMME_2026-09-27.md` section 8 in this pass | ? | not opened |
| C1 | large corpus | 24 blog-related files found under `web/src` (`find ... \| wc -l`); exact post count, dates, and newest post date not extracted from `lib/blog.ts`'s data source in this pass | ? | `find hospitality -iname "*.mdx"` = 24; per-post `date` field frontmatter not read |
| C2 | exists, dated | `docs/hospitality/house_positions.md` exists, states "Locked at pre-launch build (2026-07-12)" as its verification date, no later edit note found in the first 5 lines read | S | `docs/hospitality/house_positions.md:1-4` |
| C3 | exists | no `COVERAGE_MAP_2026-09.md` in `docs/hospitality/` (dir listing: STAGE_1B_HP_LOCK_DRAFTS.md, STATE.md, house_positions.md, rates_ledger.json, wave3_cannibalisation_check.md, no coverage map) | S | `ls docs/hospitality/` |
| C4 | `/for/[slug]` dynamic, Property template | `/for/[slug]/page.tsx` exists (dynamic), but L1 shows no lead form mounted on it directly, likely relies on a footer/global form only; template conformance (Service+FAQPage+breadcrumb+stat tiles) not verified | ? | route exists, template fidelity not checked |
| C5 | list of `/services/*` and money pages | `services/page.tsx` (hub) + `services/[slug]/page.tsx` (dynamic) present; specific slugs not enumerated in this pass | ? | not enumerated |
| C6 | pass/fail via validator | `scripts/validate_blog_content.py` has a fixed `SITES` dict (Property, Dentists, Medical, ... sampled); "Hospitality" was NOT found in a grep of the file, so the validator does not support this site as written | S | `grep -n "Hospitality\|hospitality" scripts/validate_blog_content.py` = no match |
| C7 | `dateModified`/`reviewedAt` present | not traced to post-level frontmatter in this pass | ? | not checked |
| C8 | byline model | not checked in this pass | ? | not checked |
| C9 | link audit tool | not checked in this pass; `wave3_cannibalisation_check.md` exists in `docs/hospitality/` but that is a cannibalisation check, not a link-health audit | ? | only file name matched, content not read |
| D1 | port tags, `web-shared/design` imports | `git tag -l 'port-hospitality-*'` and `git tag -l '*hospitality*'` both return nothing, this site has never been through the design port; `grep -rl "web-shared/design" hospitality/web/src` = 0 files (Property's shared design kit is not imported at all here) | L | tag commands empty; import count 0 |
| D2 | `prose-standard.css` imported | imported: `@import "../../../../packages/site-styles/prose-standard.css";` | NONE | `web/src/app/globals.css:6` |
| D3 | hides below 1024 | not checked (no header component located/read in this pass) | ? | not checked |
| D4 | favicon set, PNG og:image, metadataBase | `icon.svg` present (SVG favicon, not the og:image); actual `openGraph.images` uses `/api/og` (a dynamic PNG route via `api/og/route.tsx`), so the "SVG og:image is a defect" trap does NOT apply here; `metadataBase: new URL(siteUrl)` set | NONE | `web/src/app/layout.tsx:30,49-58`; `app/api/og/route.tsx` exists |
| D5 | Geist Sans | `globals.css` sets `font-family: ui-sans-serif, system-ui, -apple-system, sans-serif`, system font stack, not Geist Sans; no `next/font` import found in `layout.tsx` | S | `web/src/app/globals.css:26`; `grep -n "next/font\|Geist" layout.tsx` = no match |
| D6 | literal-value StatsCounter support | no `StatsCounter` component anywhere in `web/src` (grep empty) | ? / N/A | `grep -rl StatsCounter hospitality/web/src` = no output |
| D7 | 390px scrollWidth real emulation | not run, no `puppeteer-core` session launched in this pass (time-boxed inventory read, not the wave-2 reader task) | ? | not run, this is a wave-2 reader-agent task per brief section 4 |
| D8 | playbook 9.1 kit-adoption numbers | not run in this pass | ? | not run |
| I1 | live 200s | confirmed: `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all `200 OK` | NONE | curl output above |
| I2 | Vercel project + deploy vs HEAD | project `prj_sQNit8s3hKwuFaHdkBQORKsHq3Vb`; STATE.md's last confirmed prod SHA is `435cc12e` (2026-08-24); `git log --since=2026-08-25 --oneline -- hospitality/` returns 10 commits, latest dated 2026-09-27 (the canonical fix, G8), so main has commits after the last confirmed-deployed SHA; whether those 10 are actually live was not re-verified against the Vercel API in this pass | M / ? | `git log --oneline --since=2026-08-25 -- hospitality/ \| wc -l` = 10; last commit touching hospitality dated 2026-09-27 |
| I3 | test coverage | 6 `.test.ts` files under `web/src` (3 calculator golden tests + 3 others: `route.test.ts`, `lead-contactability-bridge.test.ts`, `lead-submit-verify.test.ts`) | S | `find hospitality/web/src -iname "*.test.ts*" \| wc -l` = 6 |
| I4 | GA4 present, CSP has `region1`, consent banner | `ConsentToggle.tsx` present, imports shared `@accounting-network/web-shared/analytics/consent`; live CSP header (`curl -sI` on the homepage) has NO `region1.google-analytics.com` in `connect-src` (`connect-src 'self' https://*.supabase.co` only), this is the same UK-undercount trap the estate fixed estate-wide on 09-23, hospitality appears to have been missed | M | live CSP header: `connect-src 'self' https://*.supabase.co` (no region1); `web/src/components/analytics/ConsentToggle.tsx:4` |
| I5 | flags/env read | code reads `process.env.NEXT_PUBLIC_SITE_URL` in three files; no `site_flags` or `getFlag` calls found in `web/src` | S | grep results above |
| I6 | monitored_pages rows | unknown from repo, Supabase not queried in this pass | ? | not checked, needs DB access |
| I7 | STATE.md newest entry vs code | newest dated entry is 2026-08-25 (the port-merge note); the top-of-file header block ("DEPLOY IS HELD") contradicts the 08-25 entry showing production live since 07-16, and the file has no entry for the 09-27 canonical fix (G8) despite that commit touching this site | M | `docs/hospitality/STATE.md` top block vs 2026-08-25 section vs `bb297ab2` commit not reflected |

## Unique to this site

- `/research/uk-hospitality-food-hygiene-map` and `/research/hospitality-openings-closures-index`
  with dedicated `/data/route.ts` API endpoints and chart components (`FsaHygieneCharts.tsx`,
  `HospitalityInsolvencyCharts.tsx`), a Dataset-schema research surface built from real
  Companies House and FSA pulls (per STATE.md), which Property does not have in this form.
- Machine Games Duty and tronc/troncmaster domain content, out of scope for any other site.

## Shares Property's open defects

- Not confirmed to share the `/book` dead-end defect: `/book/page.tsx` and `BookingPicker.tsx`
  both exist and appear to render an actual form (title "Book your free review", a submit button
  at `BookingPicker.tsx:160`), unlike Property's untokened dead `/book`. Not fully traced end to
  end (token handling not read).
- Three-line segment-page closer parity: not checked (C4 template fidelity is "?").
- 24-hour promise: NOT present here as a literal phrase (see P4), so this specific Property
  defect does not carry over.

## Questions (missing data, not findings)

- Is `/services/[slug]` and `/for/[slug]` actually missing a lead form, or does a global
  layout-level footer form cover them? L1 only checked the page files themselves.
- Does `CalcResultCta` actually render under calculator results (L3), or is it dead code?
- Is the 10 commits since 2026-08-25 (including the 09-27 canonical fix) actually deployed to
  production, or sitting on main only? STATE.md does not say.
- Bing Webmaster verification status for this site (G10), not visible from the repo.
- `monitored_pages` row count for hospitality (I6), needs Supabase access.
- Segment-page (`/for/[slug]`) template fidelity against Property's Service+FAQPage+breadcrumb
  standard (C4, G3), schema helper functions exist but call sites were not traced.
- Blog post count, dates, and byline model (C1, C7, C8), not extracted from `lib/blog.ts`'s
  actual data source in this pass.

## Commands and files read

- `curl -sI https://www.hospitalitytax.co.uk/{,robots.txt,llms.txt,llms-full.txt,sitemap.xml}`
- `curl -s https://www.hospitalitytax.co.uk/llms-full.txt | wc -c`
- `find hospitality/web/src -type f`
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" hospitality/web/src hospitality/niche.config.json hospitality/web/public`
- `grep -rniE "free consultation|free first call|free review"` and `"within 24 hours|same working day|same-day"` over `web/src` and `niche.config.json`
- `hospitality/web/src/lib/schema.ts`, `config/site.ts`, `config/lead-nurture.ts`, `lib/leads/role-labels.ts`
- `hospitality/web/src/app/robots.ts`, `sitemap.ts`, `layout.tsx`, `globals.css`
- `docs/hospitality/STATE.md`, `house_positions.md`, `ls docs/hospitality/`
- `supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql`
- `scripts/validate_blog_content.py` (SITES dict grep)
- `git tag -l 'port-hospitality-*'`, `git tag -l '*hospitality*'`
- `git log --since=2026-08-25 --oneline -- hospitality/`
- `git log --since=2026-09-26 --grep=canonical --stat -- hospitality/`
- `grep -rl "web-shared/design" hospitality/web/src`
- `find hospitality/web/src -iname "*.test.ts*"`
- `agents/config/gsc_config.py` (grep for "hospitality")
- `ls hospitality/web/public` (IndexNow key file pattern)

Scratch directory `C:\Users\user\.claude\jobs\933e5962\tmp\hospitality\` was created but nothing
was written to it (no local scratch files needed); nothing to delete beyond the empty directory
itself.

---

# Wave 2 reader append (2026-09-28)

Control, per brief rule 7: `https://www.gov.uk` rendered with the same `puppeteer-core`
`page.emulate` code (390x844, deviceScaleFactor 3, isMobile, hasTouch) gives
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing elements.
Real emulation confirmed. Pages rendered: `/`, `/about`, `/services/hospitality-vat`,
`/for/restaurants`, `/blog/hospitality-vat/vat-on-takeaway-food`,
`/calculators/tronc-tips-paye-nic-calculator`, `/contact`, plus `/book`, `/thank-you`, and all
6 `/for/*` and 5 `/services/*` pages for the sameness check.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | N/A rather than pass or fail: **there is no header CTA at all**. A scan of every `<a>` and `<button>` inside `<header>` for book / call / enquire / contact / get / start / quote / talk / speak text returns **zero elements** at 1280 and at 390, on all 7 pages | rendered `header.querySelectorAll('a,button')` filtered on text, length 0 |
| D5 | System stack only: `ui-sans-serif, system-ui, -apple-system, sans-serif`. No `next/font`, no Geist, no webfont | `getComputedStyle(document.body).fontFamily` live; `grep -n "next/font\|Geist" hospitality/web/src/app/layout.tsx` returns nothing |
| D6 | No `StatsCounter` component exists, and nothing resembling a stat tile renders on the pages read. The Medical literal-date trap cannot apply | `grep -rl StatsCounter hospitality/web/src` empty; rendered pages |
| D7 | 390 `scrollWidth` = 390 on 6 of 7 pages. **Blog post `/blog/hospitality-vat/vat-on-takeaway-food` = 436.** No single overflowing element could be isolated (the element scan returns zero unclipped offenders, `html` and `body` both `overflow-x: visible`, longest word is "chocolate-covered"), so I report the number and leave the cause open rather than guess | rendered on both viewports; diagnostic re-run at 390 |
| D8 | 9.1 gate, every row zero or absent: layout-utils=0; kit adopted **0 distinct / 0 call sites**; declined=0; homepage marketing adopted=0 declined=0; webfont none; backdrop=0; Eyebrow=0 and section-label=8; zero non-token focus rings; one gradient file; ring guard walks=0 guards=0. The site has never been near the kit | section 9.1 block run verbatim, read-only |
| G3 | FAQPage YES on `/for/*`, `/services/*` and the calculator. **No `Service` node and no `BreadcrumbList` on any of them.** `AccountingService` does render in the Organization node on every page | `curl` plus `grep -o` per URL |
| G7 | Confirmed `lastModified: now`, build time, on every route | `hospitality/web/src/app/sitemap.ts:14-17` |
| G8 | **Not fixed live.** `/for` and `/services` hubs both serve `rel="canonical" href="https://www.hospitalitytax.co.uk"`, the homepage. Child pages (`/for/restaurants`, `/about`, `/contact`, `/blog`) are correct. The `bb297ab2` fix touches exactly those two files and is undeployed | canonical sweep on 6 URLs; `grep -n canonical hospitality/web/src/app/{for,services}/page.tsx` shows the fix present at HEAD |
| G9 | No stray `noindex` on public pages; only `/admin/*` and the token API routes. `/embed/[slug]` carries no explicit noindex and is not in the robots disallow list, same as Property | `grep -rn "noindex\|index: false" hospitality/web/src/app` |
| L3 | PASS, and it answers wave 1's question: `CalcResultCta` is **not** dead code. `/calculators/tronc-tips-paye-nic-calculator` renders one form with a "Get my figures checked" submit button under the result. No gate, no modal, no PDF offer | rendered: 1 form, submit text "Get my figures checked" |
| L4 | **3 calculators** live: tronc-tips-paye-nic-calculator, food-drink-vat-rate-checker, staff-cost-rota-margin-calculator. FAQPage and WebApplication both present on the one sampled; no cite-this line seen | live sitemap `grep -c '/calculators/'` = 3; schema greps |
| L8 | `/book` with no token renders **zero forms**. Its visible tail is the footer entity block, so it does not even carry Property's "find the link in your email" explanation. `/thank-you` renders the Aswatax sentence correctly | rendered form count 0 on `/book` |
| L1 / C4 | Wave 1's open question settled: **there is no layout-level footer form.** `/about`, all 5 `/services/*` and all 6 `/for/*` render **zero `<form>` elements**. Forms exist only on `/`, `/contact` and the calculators | rendered `document.querySelectorAll('form').length` on 13 live URLs |

## Reader findings

Hospitality reads well and is written in a firm voice with no em-dashes and no US spellings, and
the answer is in the first paragraph on every page I rendered. The problem is not the words, it is
that eleven of its most commercial pages have nowhere to convert: the six segment pages and five
service pages render no form, no sticky CTA, no chat, no intent layer, and there is no header CTA
anywhere on the site. The last thing a prospect reads on a segment page is the registered-office
address. The positioning ruling is not the issue on the pages a prospect actually reaches: the only
partner-network sentence I could render is the consent text on the calculator, which rule 8 exempts.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | 6 `/for/*`, 5 `/services/*`, /about | Zero `<form>` elements, no sticky CTA, no chat widget, no intent prompt, and no header CTA, so eleven commercial pages have no conversion path at all except the nav link to `/contact` | rendered form counts 0 on 12 URLs; fixed-element scan on the home page returns nothing |
| BLOCKER | every page | No header CTA of any kind at 1280 or 390. Property's standard header CTA is the primary desktop conversion path | rendered header scan, 0 matches |
| BLOCKER | /for and /services hubs | Both canonicalise to the homepage live, de-indexing the two hubs by their own tag. The fix is written at HEAD and undeployed | `curl` canonical extraction |
| FIX | 6 live pages | Raw HTML anchor markup renders as visible body text: `/services/business-rates-relief` shows 4, including `<a href="/for/cafes-and-coffee-shops">cafes</a>` and `<a href="/for/takeaways">takeaways</a>`; also `/services` hub 1, `/services/tronc-scheme-setup` 2, `/services/hospitality-payroll` 2, `/services/hospitality-vat` 1, `/services/toms-advice` 2 | `document.body.innerText` matched against `/<a href=[^>]*>[^<]*<\/a>/g` per page | S |
| FIX | all 6 `/for/*` and 5 `/services/*` | Identical closing block, and it is the footer, not a close: "Hospitality Tax is a trading name of Ashfield Trading Ltd..." then the copyright line then "Specialist hospitality accountants. Editorial content only. Contact us for advice specific to your business." All 11 pages hash to one group | closer sweep, one group of 11 | M |
| FIX | all pages | "Editorial content only" as the final line on every page undercuts the firm voice the rest of the site uses, and reads as a disclaimer rather than an invitation | rendered innerText, every page | XS |
| FIX | /book | Untokened `/book` renders zero forms, Property's defect shared, and with no explanatory line | rendered | S |
| FIX | blog post | 390 `scrollWidth` = 436, so the page scrolls sideways on a phone. Cause not isolated | rendered, with the gov.uk control at 390 | S |
| FIX | all `/for/*` and `/services/*` | No `BreadcrumbList` and no `Service` node; Property has both | schema greps | S |
| FIX | all | No webfont at all, so the site renders in whatever the device supplies while every ported sibling uses Geist | `getComputedStyle` plus layout.tsx grep | S |
| FIX | all | Sitemap `lastModified` is build time on every route | `sitemap.ts:14-17` | XS |
| NIT | /services/hospitality-vat | Longest paragraph is 110 words, the longest on any page across my four sites, and it is the answer paragraph | rendered paragraph word counts | XS |
| NIT | / and /about | Both open with an "Because ..." sentence fragment as the first body paragraph on `/about`: "Because tronc and tips compliance ... are specific enough that general accounting experience is not the same as specialist experience." It answers the heading rather than standing alone | rendered innerText | XS |
| NIT | all | No `<main>` landmark on any page, so the document has no primary content region | rendered `document.querySelector('main')` is null | XS |
| NIT | /contact, calculator | Focus ring on the first input is the browser default (`outline: 1px auto`), not a design token | `getComputedStyle` after `.focus()` | XS |
| NIT | / | Jargon used without a gloss in the first screen: "TOMS", "tronc", "troncmaster". "Tronc" is glossed later; "TOMS" is not expanded anywhere on the home page | rendered innerText | XS |

### Design numbers (page x metric)

| Page | sw 1280 | sw 390 | hdr CTA 1280 / 390 | body contrast | CTA contrast | forms | longest para (words) |
|---|---|---|---|---|---|---|---|
| gov.uk control | 1280 | **390** | n/a | n/a | 3.91 | n/a | n/a |
| / | 1280 | 390 | 0 / 0 | 7.81 | 5.09 | 1 | 61 |
| /about | 1280 | 390 | 0 / 0 | 7.81 | 5.09 | 0 | 58 |
| /services/hospitality-vat | 1280 | 390 | 0 / 0 | 5.09 | 5.09 | 0 | 110 |
| /for/restaurants | 1280 | 390 | 0 / 0 | 7.49 | 5.09 | 0 | 77 |
| blog post | 1280 | **436** | 0 / 0 | 10.35 | n/a | 0 | 90 |
| calculator | 1280 | 390 | 0 / 0 | 10.35 | 5.09 | 1 | 72 |
| /contact | 1280 | 390 | 0 / 0 | n/a | 5.09 | 1 | 11 |

Contrast computed from `getComputedStyle` with each colour resolved through a 1x1 canvas, so
`oklch()` and `oklab()` values convert properly. Every measured value passes WCAG AA, including the
terracotta CTA (white on `rgb(176,83,47)` = 5.09). Zero em-dashes and zero en-dashes in visible body
text on all 7 pages; no US spellings; no AI-tell words found on any page. No images anywhere, so no
missing alt text. Every form input has a label or `aria-label`. No placeholder phone numbers or
emails, and no `tel:` or `mailto:` links. `.prose`: no `.prose p` node exists on the blog post, so
the computed-margin check cannot run there even though `globals.css:6` imports `prose-standard.css`.
The homepage comparison table overflows to `right=528` but sits inside a `div` with
`overflow-x: auto`, which is correct and not a defect. Footer CTA targets are `/contact` twice, and
`/contact` does render a form.

### Sameness

| Scope | Result |
|---|---|
| Within site, 6 `/for/*` and 5 `/services/*` closers | **Identical across all 11**, and the shared text is the footer entity block, not a close |
| Against Property's `/for/` close | **No comparison possible in substance.** Property closes with "A couple of sentences helps us prepare properly for your call." then the consent sentence then the 24-hour and text-message line, all attached to a form. Hospitality's segment pages have no form and no close |
| Foot form | Three forms exist live, on `/`, `/contact` and each calculator; 6 inputs each; no `form_id` exposed in the DOM |

## Corrections to the inventory

| Row | Wave 1 said | Correction | Evidence |
|---|---|---|---|
| L1 | "M", forms not found on 4 page files, open question whether a layout-level form covers them | Confirmed and worse: **12 live pages render zero forms**, not 4. All 6 `/for/*` and all 5 `/services/*` and `/about`. No layout-level form exists | rendered form counts on 13 URLs |
| L3 | "?", `CalcResultCta` call site not located, possibly dead code | Settled: it renders. The calculator page has one form under the result with a "Get my figures checked" button | rendered |
| G8 | "NONE (fixed)" | False on the live site. Both hubs still canonicalise to the homepage, because the 09-27 fix is undeployed | canonical sweep |
| D3 | "?" | Not a hide-behaviour question at all: there is no header CTA to hide | rendered header scan |
| D6 | "? / N/A" | Settled N/A, no StatsCounter and no stat tiles render | grep plus rendered |
| P2 | caveats on complete, thank-you, privacy, consent | On the pages a prospect reaches without a token, the only visible partner-network text is the consent sentence on the calculator form, which rule 8 exempts. `/thank-you` renders no generic caveat, only the named Aswatax sentence. `/complete` needs a token and stays unread | rendered innerText on 9 URLs |
