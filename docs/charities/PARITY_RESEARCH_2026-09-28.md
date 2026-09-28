# Trustee Tax (charities) parity research (2026-09-28)

Domain `www.trusteetax.co.uk`, Vercel project (see `docs/charities/STATE.md`, unconfirmed id in
repo), launched yes, live status 200 OK (curl checked 2026-09-28).

## Verdict in three lines

Charities is close to Property on positioning and the lead-capture core (voice, consent text,
nurture cadence and the lead source constraint all match), and the design port is fully tagged
through uplift. The three biggest gaps: GA4 is not wired (`google_analytics_id` is empty, no
gtag on the live page, CSP has no `region1.google-analytics.com`), the calculator fleet is thin
(3 tools vs Property's 6+premium) and stacks two lead forms on one calculator page instead of
one, and `docs/charities/STATE.md` is stale by two and a half months and contradicts the shipped
state (still lists GA4/domain/phone as open "external steps" that are already done).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | firm-first `entity` block | present, firm-first | NONE | `charities/niche.config.json:2-14`, firm name, SORP/Gift Aid/VAT description, Ashfield Trading Ltd 16358723 |
| P2 | no caveat phrases prospect-facing | 3 "a specialist reviews" instances on service/type content; "partner network" only in consent/privacy (exempt) | S | `charities/web/src/data/charity-services.ts:468`, `charities/web/src/data/charity-types.ts:70,78,406`, all render on live `/services/*` and `/for/*` pages, prospect-facing, not consent/privacy/terms so not exempt under rule 8 |
| P3 | "free first call" language present | present, 5 occurrences incl. sticky CTA | NONE | `charities/niche.config.json` `cta.sticky_secondary` = "Free first call, then a fixed fee in writing" |
| P4 | no 24h promise defect | 0 occurrences of "within 24 hours" / "same working day" | NONE | grep across `web/src` and `niche.config.json`, zero hits |
| P5 | AccountingService, firm-first, shared builder | AccountingService via shared `buildOrganization()` | NONE | `charities/web/src/lib/schema.ts:33` `organizationType: "AccountingService"`, uses `buildOrganization`/`referencedOrganization` from web-shared, matches commit `d4a68b95` estate rollout |
| P6 | firm-first, UTM-tagged | live, 200 OK, not read in full | ? | `curl -sI https://www.trusteetax.co.uk/llms.txt` = 200; did not diff body against Property's UTM/firm-first template, flag for a follow-up read |
| L1 | mounted on home/about/services/segment/contact/blog | mounted on home, services/[slug], for/[slug], contact, blog post; NOT found on `about` or the `services` index page | S | grep `LeadForm\|LeadCTAPanel` across `web/src/app` returns `page.tsx` (home), `services/[slug]`, `for/[slug]`, `contact`, `blog/[category]/[slug]`; no hit in `about/page.tsx` or `services/page.tsx` |
| L2 | full id set | has `inline_mini`, `calc_result`, `calc_page_footer`; missing `mobile_tool`, `calc_result_form`(named `calc_result` here), `resource_block`, `blog_short_resource` | S | grep across `web/src/components` and `web/src/app` |
| L3 | exactly one form under the result | TWO forms on the calculator page: `CalcResultCta` (`calc_result`) directly under the result, AND a second `MiniCapture` (`calc_page_footer`) further down the same page after the FAQs | S | `charities/web/src/app/calculators/[slug]/page.tsx:90` (CalcResultCta under result) and `:126-136` (second MiniCapture, labelled in code as "existing capture surface, unchanged") |
| L4 | 6+ tools, FAQPage, cite-this | 3 tools (`gift-aid-calculator`, `independent-examination-audit-checker`, `gasds-calculator`); FAQPage schema present via `src/lib/calculators/schema.ts`; no cite-this found | M | `charities/web/src/lib/calculators/registry.ts:18-22`; grep for "cite-this/citeThis" returns nothing |
| L5 | present, some pages | not found | N/A (site does not have this layer) | no `*widget*`/`*specialist*` component under `src/components`; not a claimed gap unless the owner wants it, noting for completeness |
| L6 | IntentProvider, ReturningBar, DeepScrollModal | not found; only `src/lib/leads/reply-intent.ts` (an unrelated reply-classification helper, not the intent-engine UI) | N/A / L if wanted | no `*intent*` component under `src/components`, no `IntentProvider` |
| L7 | sticky CTA + hero CTA, copy from config | copy source present in `niche.config.json` `cta`; did not confirm a StickyCTA component mounts on the charities homepage | ? | `niche.config.json` has the `cta` block; `find src/components -iname "*sticky*"` returned nothing in this pass, needs a direct check |
| L8 | thank-you, complete, tokened /book, Aswatax message | `/thank-you`, `/complete`, `/book` routes all exist under `src/app`; Aswatax message not independently verified this pass | S/? | `find src/app -maxdepth 1` lists `book`, `complete`, `thank-you`; Aswatax intro message presence not grepped |
| L9 | gaps `0,0,4,20,24,48,72,96`, firm voice, SMS ack | identical gap sequence; explicit "faceless team voice", SMS via `/api/leads/inbound/twilio` present | NONE | `charities/web/src/config/lead-nurture.ts:303-440` matches `Property/web/src/config/lead-nurture.ts:443-599` exactly; SMS route `src/app/api/leads/inbound/twilio/route.ts` exists |
| L10 | category-driven `CTA_BY_CATEGORY` | one fixed block for every category, code comment admits it: "Until that lands, every category gets this one block" | S | `charities/web/src/components/blog/blog-cta.ts:1-16`, `BLOG_CTA` is a single constant, not a per-category map |
| L11 | estate-wide consent text | identical verbatim, "partner network" wording is the shared consent sentence (exempt under rule 8) | NONE | `charities/web/src/config/site.ts:19` byte-identical to `Property/web/src/config/site.ts:39` |
| L12 | source in DB CHECK | `source: "charities"` sent by `/api/leads/submit`; `charities` IS in `leads_source_valid` | NONE | `charities/web/src/app/api/leads/submit/route.ts:28,67`; migration `supabase/migrations/20260712000002_add_tranche_1_to_leads_source.sql:31` adds `'charities'` |
| G1 | AI-crawler allowlist | 40+ bot allowlist present (Google/OpenAI/Anthropic/Perplexity/Meta/Bing/Mistral/You.com/Cohere/Brave/Bytespider/Common Crawl), disallow `/thank-you`, `/admin`, `/api/` | NONE | `charities/web/src/app/robots.ts:11-60,87` |
| G2 | shared builder, sameAs, parentOrganization, knowsAbout | shared `buildOrganization`, `parentOrganization` block present at `:57` | NONE | `charities/web/src/lib/schema.ts:4-70` |
| G3 | Service+FAQPage+Breadcrumb on segment/service pages | present on `for/[slug]` (`buildFaqPage`, `buildService` imported) | NONE (not independently verified on `/services/[slug]`) | `charities/web/src/app/for/[slug]/page.tsx:12` imports `buildFaqPage, buildService` from `@accounting-network/web-shared/schema` |
| G4 | BlogPosting, author, real dateModified | some posts have blank `author: ""`, others `author: "Trustee Tax Editorial Team"`; `dateModified` present and dated | S | `charities/web/content/blog/annual-report-vs-annual-return.md` frontmatter, blank author; grep across all 32 posts shows mixed authorship |
| G5 | route, firm-first, UTM | live 200, static `public/llms.txt` per STATE.md note ("figures from rates_ledger, verified") | ? | not diffed against Property's UTM tagging convention this pass |
| G6 | `buildLlmsFullRoute`, post count, size | route exists at `src/app/llms-full.txt`, live 200; size and post count not read | ? | `curl -sI` 200 only; did not fetch body to check post count/size against 19.07 MB ceiling (moot at 32 posts) |
| G7 | real/build-time/omitted `lastModified`, hreflang | not checked this pass | ? | ran out of scope in this pass, flag for follow-up |
| G8 | canonical-hub fix present/absent | not checked this pass | ? | did not run the `git log --grep=canonical` check against charities' hub pages |
| G9 | noindex correct, `/embed` rule | `/embed` route exists (`find src/app` shows `embed`); CalcResultCta explicitly excluded from `/embed/[slug]` by design (component comment) | NONE (partial evidence) | `charities/web/src/components/calculators/CalcResultCta.tsx:8` "Only rendered for variant=\"page\", so /embed/[slug] is automatically excluded" |
| G10 | gsc_config entry, IndexNow script+key, Bing verified | `agents/config/gsc_config.py` has a `"charities"` entry; IndexNow KEY FILE exists in `public/` but the `submit_indexnow.py` SCRIPT does not exist under `charities/pipeline/`; Bing verification unknown | S | `agents/config/gsc_config.py:209-215`; `charities/web/public/e2d3a266cb49bd2ff8761a6db2a4d7a4.txt` present; `find charities/pipeline` shows only `build_deep_research.py` and `build_finance_index.py`, no indexnow script |
| G11 | covered by 09-27 T6 baseline | not checked this pass | ? | did not open `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 to confirm charities is listed |
| C1 | 806 posts | 32 posts, newest `2026-09-27`, 8 of 32 dated on/after 2026-07-30 | L (volume gap, not a code defect) | `charities/web/content/blog/*.md`, count and date grep this session |
| C2 | exists | `docs/charities/house_positions.md` exists, 175 lines, 8 `##` sections | NONE | file read |
| C3 | exists | `docs/charities/COVERAGE_MAP_2026-09.md` exists | NONE | file read |
| C4 | `/for/[slug]`, 15 pages, Property template | `/for/[slug]` dynamic route exists, data from `src/data/charity-types.ts`, 8 entries (`slug:` count) | S (fewer segments) | `charities/web/src/app/for/[slug]/page.tsx`, `grep -c "slug:" src/data/charity-types.ts` = 8 |
| C5 | list of `/services/*` | `src/data/charity-services.ts` drives `services/[slug]`; exact route count not enumerated | ? | did not run the route list this pass |
| C6 | pass/fail counts | not run | ? | `scripts/validate_blog_content.py --site charities` not executed this pass (read-only scope allowed running it but time did not permit; flag for follow-up) |
| C7 | dateModified/reviewedAt present | `dateModified` present on posts checked; no `reviewedAt` field found in frontmatter | S | grep of `content/blog/*.md` frontmatter keys found `date`, `dateModified`, no `reviewedAt` |
| C8 | Person/Editorial Team/Organization | mixed: `author: ""` on some posts, `"Trustee Tax Editorial Team"` on others | S | frontmatter grep across `content/blog/*.md` |
| C9 | link audit tool | not run this pass | ? | did not check `scripts/` for a charities-capable link auditor |
| D1 | port tags, uplift | full set: `port-charities-phase0` through `phase6` plus `port-charities-uplift`; 21 files import `web-shared/design` | NONE | `git tag -l 'port-charities-*'`; `grep -rl "web-shared/design" charities/web/src \| wc -l` = 21 |
| D2 | imported from globals.css | imported | NONE | `charities/web/src/app/globals.css:15` `@import "../../../../packages/site-styles/prose-standard.css"` |
| D3 | header CTA hides below 1024 | not checked (would need rendered DOM, not done this pass) | ? | source-only pass, no puppeteer run |
| D4 | favicon set, og:image PNG not SVG, metadataBase | **no favicon**: `/favicon.ico` and `/favicon.svg` both 404 live; `public/` has only the IndexNow key file and `llms.txt`, no favicon asset; og:image is a dynamic PNG route (`/api/og`), correct | S | `curl -sI https://www.trusteetax.co.uk/favicon.ico` = 404; `curl -sI .../favicon.svg` = 404; `charities/web/src/app/layout.tsx:24` comment confirms PNG-not-SVG intent for og:image |
| D5 | fonts | not diffed against Property this pass | ? | out of scope this pass |
| D6 | literal-value stat tiles | not checked this pass | ? | did not locate a StatsCounter equivalent on charities to test |
| D7 | 390px real emulation | not run (would need puppeteer-core launch, out of scope for this read-only inventory pass; the site is launched so this is owed) | ? | flagged for the wave-2 Opus reader pass per brief section 4 |
| D8 | playbook 9.1 kit-adoption gate | not run this pass | ? | flagged for follow-up, `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 not executed against charities in this pass |
| I1 | 200, all machine routes 200 | home 200, robots.txt 200, llms.txt 200, llms-full.txt 200, sitemap.xml 200 | NONE | curl -sI checks this session, all 200 |
| I2 | Vercel id, deploy vs HEAD | STATE.md gives no Vercel project id; recent commits (`815ae7de`, `63087d14`, `d4a68b95`, `91645ae4`, `ab6b01d1`, `bebbbda4` and others) touch `charities/` as recently as today 2026-09-28 and the live site already reflects the firm-voice ruling (entity block, no accountancy-practice caveat on the homepage) | S (missing project id, not missing deploy) | `git log --oneline -- charities/` shows same-day commits; live curl confirms the site is current, not stale, despite STATE.md silence |
| I3 | tests present | 8 test files under `charities/web/src` | NONE | `find charities/web/src -iname "*.test.ts*" \| wc -l` = 8 |
| I4 | GA4 present, CSP allows region1, consent banner | GA4 component (`ConsentedScripts`) exists in code but `niche.config.json` `seo.google_analytics_id` is an **empty string**; no `gtag`/`googletagmanager`/measurement id found in the live HTML; CSP header on the live site has no `region1.google-analytics.com` at all; a `ConsentToggle.tsx` component exists | **M, GA4 is not live** | `charities/niche.config.json:119` `"google_analytics_id": ""`; `curl -s https://www.trusteetax.co.uk/ \| grep -o "gtag\|googletagmanager\|G-[A-Z0-9]*"` = no matches; `curl -sI` CSP header has no analytics host |
| I5 | flags | no `getFlag`/`site_flags`/`NEXT_PUBLIC_*` feature-flag reads found beyond the standard `NEXT_PUBLIC_SITE_URL` | NONE found (nothing to check in prod) | grep across `src/lib` and `src/config` |
| I6 | monitored_pages rows | unknown from repo, cannot read Supabase in this pass | ? | flag for the ops agent (brief section 5) |
| I7 | STATE.md current | `docs/charities/STATE.md` newest dated entry is 2026-07-16 and lists GA4/domain/phone/DNS as still-open "external steps"; the domain is live, the site is deployed, and today's commits show the firm-voice ruling already applied, **STATE.md contradicts the shipped state and should be updated**, though GA4 specifically genuinely IS still open (matches I4) | M (docs debt) | `docs/charities/STATE.md` tail, cross-checked against `git log` and live curls |

## Unique to this site

- No favicon at all (Property has one; this is worse than Property's own defect list, which does
  not mention a missing favicon).
- Fixed single-block blog CTA with an explicit code comment admitting the per-category map has
  not landed yet (`src/components/blog/blog-cta.ts`), Property's `CTA_BY_CATEGORY` mechanism is
  not ported here.
- Two lead-capture forms stacked on one calculator page (result CTA plus a second footer
  MiniCapture) where Property's standard is exactly one form under the result.
- IndexNow key file is published in `public/` but the submission script itself does not exist
  under `charities/pipeline/`, so nothing can actually call it from this site's own pipeline.

## Shares Property's open defects

- Not independently confirmed this pass whether `/book` renders a working tokened form or is a
  dead end here too (L8, marked `?`); Property's known defect is the footer link, not `/book`
  itself, and charities' footer was not checked for the same link.
- The three-line segment-page close pattern was not diffed against charities' `for/[slug]` copy
  this pass (C4/L1 note taken, closer text not read).
- Mixed/blank blog author bylines (G4/C8) echo the estate-wide pattern rather than being unique
  to charities.

## Questions (missing data, not findings)

- Is GA4 intentionally unconfigured pending a "real phone number" / brand-assets gate per
  STATE.md, or has the property simply never been created? (I4)
- Does `/services/[slug]` mount a foot lead form and the same FAQPage/Breadcrumb schema as
  `/for/[slug]`? Not independently verified (L1, G3).
- Sticky CTA component: does one actually mount on the charities homepage, or does only the copy
  exist in config with no consumer? (L7)
- Bing Webmaster verification status for trusteetax.co.uk (G10), cannot check from the repo.
- `monitored_pages` row count for charities (I6), cannot check from the repo.
- G7 (sitemap `lastModified` rule), G8 (canonical-hub fix), G11 (09-27 T6 baseline coverage), D3,
  D5, D6, D7, D8, C5, C6, C9 were not run this pass, time-boxed inventory pass, not full coverage
  of every row; flagged rather than guessed.

## Commands and files read

- `cat docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md`
- `node -e "require('./charities/niche.config.json')"` (entity, domain, cta)
- `grep -rliE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" charities/web/src charities/niche.config.json charities/web/public`
- `charities/web/src/config/site.ts`, `charities/niche.config.json`, `charities/web/src/app/privacy-policy/page.tsx` (P2 detail)
- `charities/web/src/lib/schema.ts` (G2/P5)
- `charities/web/src/app/robots.ts` (G1)
- `charities/web/src/lib/calculators/registry.ts` (L4)
- `charities/web/src/app/calculators/[slug]/page.tsx`, `charities/web/src/components/calculators/CalcResultCta.tsx` (L3)
- `charities/web/src/components/blog/blog-cta.ts` (L10)
- `charities/web/src/config/lead-nurture.ts` vs `Property/web/src/config/lead-nurture.ts` (L9)
- `charities/web/src/app/api/leads/submit/route.ts`, `supabase/migrations/000_create_core_tables.sql`, `supabase/migrations/20260712000002_add_tranche_1_to_leads_source.sql` (L12)
- `charities/web/content/blog/*.md` frontmatter grep (C1, C7, C8)
- `docs/charities/house_positions.md`, `docs/charities/STATE.md`, `docs/charities/COVERAGE_MAP_2026-09.md` (C2, C3, I7)
- `git tag -l 'port-charities-*'`, `grep -rl "web-shared/design" charities/web/src | wc -l` (D1)
- `git log --oneline -- charities/` (I2)
- `find charities/web/src -iname "*.test.ts*" | wc -l`, `grep -rl "charities" .github/workflows/*.yml` (I3)
- `curl -sI https://www.trusteetax.co.uk/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/favicon.ico`, `/favicon.svg` (I1, D4)
- `curl -s https://www.trusteetax.co.uk/ | grep -o "gtag\|googletagmanager\|G-[A-Z0-9]*"` and CSP header check (I4)
- `agents/config/gsc_config.py` (G10), `find charities/pipeline` (G10)

---

# Wave 2 reader pass (2026-09-28, rendered pages)

Control first: `https://www.gov.uk` rendered with the same `puppeteer-core` `page.emulate`
(390x844, `deviceScaleFactor: 3`, `isMobile: true`, `hasTouch: true`) returned
`document.documentElement.scrollWidth = 390`, `clientWidth = 390`, zero overflowing elements.
Every 390 number below comes from that same code path. Eleven pages rendered at 1280 and at 390:
home, /about, /services, /services/independent-examination, /services/charity-accounts,
/for/cics, /for/social-enterprises, the blog post
/blog/independent-examination-and-audit/what-is-an-independent-examination,
/calculators/gift-aid-calculator, /contact, /book.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | Header CTA "Get in touch" pointing at `/contact`, 131x40 px and `display: flex` at 1280; absent from the rendered header at 390, where only the wordmark and a 48 px menu button remain. Correct behaviour, confirmed in the DOM rather than from the class list. Note the copy: Property says "Book consultation", charities says "Get in touch", which is the softest CTA of the four sites. | `getBoundingClientRect` over every `header a,button` at both widths |
| D5 | `GeistSans`, with `GeistSans Fallback`, then the system stack. Same as contractors-ir35; Property uses Plus Jakarta Sans. | `getComputedStyle(document.body).fontFamily` |
| D6 | No StatsCounter or stat-tile component rendered on any of the eleven pages, so the literal-value question does not arise on this site yet. | rendered DOM |
| D7 | `scrollWidth = 390` on all eleven pages, zero real overflow. The homepage has 37 elements past the right edge, but they are all one comparison table (`table.w-full.min-w-[32rem]`, right edge 528 px) and its descendants, and its parent `div` computes `overflow-x: auto`. That is a correctly wrapped wide table, not a defect. Everything else past the edge is an offscreen honeypot at -9999px. | per-page `scrollWidth`, plus a parent `overflowX` walk on every offending element |
| D8 | Not run (a source-side gate, not a rendered-page check). | |
| G7 G8 G9 | Not settleable from the rendered page; unchanged from the inventory. | |
| L3 | Confirmed live. Two forms on /calculators/gift-aid-calculator, buttons "Get my figures checked" and "Request a review", both `mt-5 grid gap-4 sm:grid-cols-2`, both white on `rgb(26, 92, 74)`. Wave 1's source read was right. Care shares the same duplicate pattern. | `querySelectorAll('form')` dump |
| L4 | Not settled per calculator by one read. | |
| L8 | **`/book` renders zero `<form>` elements.** It renders "Pick a day and a time window that suits you. A charity finance specialist will call you then, no obligation. If we take the work on, you get a fixed fee in writing before anything starts." then "This page needs the personal link from your email or text message." and a "Go to the contact form" link, but no picker and no form. The footer link `<a href="/book">` on every page is untokened, so a prospect who clicks it reaches that dead state. | rendered DOM of `https://www.trusteetax.co.uk/book`; `footer a[href="/book"]` on all eleven pages |

## Reader findings

Charities has the cleanest design numbers of the four and the weakest lead chrome. Zero em-dashes
in visible body text on all eleven pages, zero US spellings, every title agrees with its h1, and
the primary CTA contrast is the best on the estate at 7.85:1. Against that: the closing paragraph
of every segment and service page is one template with a plural slot, and the slot produces
ungrammatical sentences on the segment pages; there is no sticky CTA and no chat widget at 390;
the /about and /services pages carry no form at all; and the footer carries an "Editorial content
only." disclaimer that sits oddly beside a firm voice.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | all 11 | no visible focus indicator on the first form field | focused `message` on /contact: `outlineStyle: "none"`, `boxShadow: "none"`, border colour unchanged, `:focus-visible` true | S |
| BLOCKER | /book | zero `<form>` elements while the page invites the visitor to pick a day and time | `querySelectorAll('form').length === 0`; "Pick a day and a time window that suits you." | S |
| BLOCKER | all 11 | footer "Book a consultation" points at an untokened `/book` | `footer a[href="/book"]` on every page | XS |
| FIX | /for/cics, /for/social-enterprises | the templated closer fills a plural slot into a singular sentence and reads wrong | "Tell us about your community interest companies. We will explain what your organisation needs, in plain English, with no obligation." and "Tell us about your social enterprises." | XS |
| FIX | both /for/ and both service pages | one closer, four pages, word for word apart from the slot | "Tell us about your charity, CIC or social enterprise. We will explain what your organisation needs, in plain English, with no obligation." on both service pages | S |
| FIX | /for/cics | rule 8 caveat in prospect-facing body copy | "A specialist reviews how trading, contract and grant income has been recognised, checks allowable costs and capital claims..." and "Where Gift Aid is the reason you are asking, a specialist reviews your income mix and prepares a written CIC against charity or CIO comparison." | S |
| FIX | /book | rule 8 caveat in the booking promise | "A charity finance specialist will call you then, no obligation." | XS |
| FIX | footer, all 11 | "Charity accounts and compliance research. Editorial content only." reads as a disclaimer that the site is not the firm doing the work, which rule 8 now treats as a defect on a prospect-facing surface | rendered footer text | XS |
| FIX | /about, /services | zero `<form>` elements on both; Property mounts the foot lead form on both | `querySelectorAll('form').length === 0` on each | S |
| FIX | all 11 at 390 | no sticky CTA and no chat widget in the DOM; the only fixed or sticky element is the header | fixed element dump at 390 on home: one sticky header, nothing else | M |
| NIT | home | two soft AI tells | "how much Gift Aid their donors could unlock" and "covering the full compliance landscape" | XS |
| NIT | /services, /for/cics | first paragraph runs 148 and 145 words before the answer | "In England and Wales, charities with gross income between GBP 25,000 and GBP 1 million normally have their accounts independently examined rather than audited." | S |
| NIT | home, /contact | the step-1 lead form renders no consent sentence in the DOM. It may appear at step 2, which cannot be checked without submitting. | fields `enquiry_ref, role, message, situation, prompted, callGoal`; the sentence does render on the blog post and calculator | see Questions |

Design numbers, 1280 and 390:

| Page | sw@390 | real overflow | header CTA 1280 / 390 | forms | sticky CTA at 390 | chat at 390 |
|---|---|---|---|---|---|---|
| home | 390 | 0, wide table inside `overflow-x: auto` | visible / hidden | 1 | no | no |
| /about | 390 | 0 | visible / hidden | 0 | no | no |
| /services | 390 | 0 | visible / hidden | 0 | no | no |
| service pages (2) | 390 | 0 | visible / hidden | 1 | no | no |
| /for/ pages (2) | 390 | 0 | visible / hidden | 1 | no | no |
| blog post | 390 | 0 | visible / hidden | 2 | no | no |
| calculator | 390 | 0 | visible / hidden | 2 | no | no |
| /contact | 390 | 0 | visible / hidden | 1 | no | no |
| /book | 390 | 0 | visible / hidden | 0 | no | no |
| gov.uk control | 390 | 0 | n/a | n/a | n/a | n/a |

Body text contrast 17.85:1 on every page, against the gov.uk control's 21:1. Primary CTA white on
`oklch(0.428 0.072 171.066)` and on `rgb(26, 92, 74)` both measure 7.85:1, the best of the four
sites and more than double Property's 3.65:1. Every visible form field carries a label; the only
unlabelled field is the offscreen honeypot. No `<img>` is missing an `alt`. One `<main>` and one
`<h1>` per page.

Sameness:

| Comparison | Result |
|---|---|
| closer on both /for/ and both service pages | one template, four pages: "Tell us about your <slot>. We will explain what your organisation needs, in plain English, with no obligation." |
| that closer against Property's | different wording; Property's is "We respond within 24 hours and store your details securely..." on four of its pages, so both sites repeat one closer, in different words |
| consent sentence against Property's | verbatim identical on the blog post and calculator, absent at step 1 elsewhere |
| /book copy against Property's and care's | one template with a swapped specialist label: "A charity finance specialist will call you then" against Property's "A property tax specialist" and care's "A care sector accounts specialist" |
| opening paragraphs, within charities | distinct and well written per page, the content is not templated |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| L8 "S/? ... routes all exist, Aswatax message not verified" | `/book` renders zero forms and tells the visitor it needs a personal link, while the footer link to it is untokened. The post-submit booking path is not live for anyone arriving from the site. | rendered DOM |
| L7 "?" | Settled: no sticky CTA renders at 390 on any page; the only fixed or sticky element is the header. | fixed element dump at 390 |
| L5 "N/A, site does not have this layer" | Confirmed on the rendered page: no chat widget at 390 either. Worth treating as a gap rather than N/A, since Property and contractors-ir35 both run one. | fixed element dump at 390 |
| D3 "?", D5 "?", D6 "?", D7 "?" | All settled above. D7 in particular: the 37 overflowing elements on the homepage are one correctly wrapped table, not a mobile defect. Nobody should chase them. | above |
| L3 "S, two forms" | Confirmed live, and the same pattern renders on care, so it is a shared kit defect rather than a charities-only one. | form dumps on both sites |

## Questions from this pass

- Does the step-2 screen of the home and contact lead form render the consent sentence? It is
  absent at step 1 and the brief forbids submitting a form on a live site, so this could not be
  settled. It matters because the sentence is the consent basis for the whole lead flow.
