# Solicitors (Accounts for Lawyers) parity research (2026-09-28)

Domain `www.accountsforlawyers.co.uk`. Vercel project `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9`
(`Solicitors/.vercel/project.json`, per `docs/solicitors/STATE.md` line 1140). Launched: yes.
Live status: `curl -sI https://www.accountsforlawyers.co.uk/` returned `200 OK`; robots.txt,
llms.txt, llms-full.txt and sitemap.xml all returned 200.

## Verdict in three lines

Structurally this site has the full Property kit (lead form, mini captures, calculators, chat
widget, intent engine, sticky CTA, nurture, blog CTAs, AI-crawler robots, llms.txt/llms-full.txt,
research pages, design port all 6 phases tagged and live) and is not behind on plumbing. But it
fails the single biggest thing the 09-28 evening ruling tests for: this site was deliberately
built as a lead-gen referral service ("we connect solicitors... with regulated accountancy
firms"), not as the firm, and that voice is load-bearing across `niche.config.json`, the
Organization schema, `about`, `services`, `sra-compliance`, calculators, research pages, the
blog CTA, `thank-you`/`complete`, SMS/email nurture, the chat opener, the FAQ and `llms.txt`, 22
files carry "partner network" language, more than any other row in this report. The three
biggest gaps: (1) no firm-first `entity` block and a hand-rolled Organization schema typed
`Organization` (not `AccountingService`) with no `parentOrganization`, unlike Property's shared
builder; (2) the referral-service voice on 22 prospect- and lead-facing files, explicitly
re-affirmed as intentional in `docs/solicitors/STATE.md` (2026-09-12 entry, matching pre-ruling
legal wording) and now a defect under rule 8; (3) audience pages are four static `/for-*`
routes with no Service/FAQPage/BreadcrumbList schema, not Property's `/for/[slug]` template.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity` key present, firm-first | absent | L | `Solicitors/niche.config.json` keys: niche_id, display_name, legal_name, company, partner, domain, tagline, description, brand, contact, navigation, footer_links, locations, content_strategy, seo, lead_form, cta, blog, shared_components_version, last_sync. No `entity` key. |
| P2 | 0 caveat phrases on prospect surfaces | 22 files | L | `grep -rliE "not an accountancy practice\|partner network\|referral network\|a specialist reviews\|we are not accountants\|regulated accountancy firms\|regulated firms in" Solicitors/web/src Solicitors/niche.config.json Solicitors/web/public` = 22 files. Prospect-facing hits: `app/about/page.tsx:19,23,30,101,115`; `app/services/page.tsx:166,171,186`; `app/services/[slug]/data.ts:100,507`; `app/sra-compliance/page.tsx:47`; `app/calculators/[slug]/page.tsx:137`; `app/calculators/law-firm-sale-cgt/page.tsx:149`; `app/tools/equity-partner-buy-in/page.tsx:418`; `app/blog/structure-incorporation/page.tsx:114`; `app/blog/page.tsx:147`; `app/solicitor-guides/page.tsx:143`; `app/complete/page.tsx:114,139`; `app/thank-you/page.tsx:98`; `config/lead-nurture.ts:383,400,433,586` (SMS + email); `lib/assistant/opener.ts:67` (chat widget); `lib/support/faq.ts:19`; `public/llms.txt:3,5`; `niche.config.json:18,24`. Not flagged: `privacy-policy/page.tsx` and `config/site.ts` consent text, both exempt under rule 8. |
| P3 | "free consultation" present, no gate defect | present, unqualified | NONE | `niche.config.json` `cta.variants.leadgen`: "Book free consultation" (hero), "Book your free consultation" (home_cta), matches Property's pattern; `variant` is set to `"leadgen"` not `"packages"`. |
| P4 | 24h promise count + nurture backing | not found in this grep | ? | `grep -rniE "within 24 hours\|same working day"` on `Solicitors/web/src` returned no hits in the surfaces checked; not exhaustively swept beyond the files already read. Treat as "not observed", not "confirmed absent". |
| P5 | Organization JSON-LD, shared builder, AccountingService, firm-first description | hand-rolled, `@type: "Organization"`, caveated description | M | `Solicitors/web/src/lib/organization-schema.ts:1-42` imports only `@/config/site`, not `packages/web-shared/schema/organization.ts`. `@type: "Organization"` (line 6), not `AccountingService`. `description: siteConfig.description` (line 24) resolves to the caveated `niche.config.json` `description` field ("We connect solicitors, law firms and legal practitioners with regulated accountancy firms..."). No `parentOrganization` field, though `legalName`/`alternateName`/`sameAs` (Companies House link) are present. |
| P6 | firm-first opening lines | caveated opening lines | L | `Solicitors/web/public/llms.txt:1-5`: "> Specialist UK service connecting solicitors, law firms, and legal practices with regulated accountancy firms." and "Accounts for Lawyers is a UK specialist service that connects law firms with regulated accountancy firms..." |
| L1 | foot lead form on home/about/services/segment/service/blog/calculators/contact | present on all of those | NONE | `grep -rl "LeadCTAPanel\|LeadForm" Solicitors/web/src/app` hits home (`page.tsx`), `about`, `services`, `services/[slug]`, `contact`, `blog` index + 6 category pages, `calculators/[slug]`, `calculators/law-firm-sale-cgt`, `locations`, `locations/[slug]`, `solicitor-guides`, `solicitor-guides/[slug]`, `sra-compliance`, `book`, `complete`, `thank-you`, `tools/equity-partner-buy-in`. |
| L2 | mini capture ids present | present | NONE | `InlineMiniLeadForm.tsx`, `ResourceGate.tsx`, `CalcResultCta.tsx`, `premium/MobileToolSlot.tsx` all exist under `Solicitors/web/src/components`. |
| L3 | one form under calc result, no gate/popup/PDF offer | ? | ? | Not independently verified rendered; `CalcResultCta.tsx` exists but its content (single form vs gate) was not read line by line. Question, not a finding. |
| L4 | 6 calculator route dirs + premium + /embed | 2 static route dirs (`law-firm-sale-cgt`, `[slug]`) plus `/embed/[slug]` and `/tools/*` | S | `find Solicitors/web/src/app/calculators -maxdepth 1 -type d` = `law-firm-sale-cgt`, `[slug]`. `llms.txt` lists 13 named calculators, all served through the dynamic `[slug]` route plus the one static CGT page, so calculator count is comparable in substance (13) even though the route shape differs from Property's per-tool dirs. FAQPage/cite-this presence per calculator not individually checked. |
| L5 | chat widget present | present | NONE | `Solicitors/web/src/components/support/SpecialistWidget.tsx` exists. Auto-open behaviour not read. |
| L6 | intent engine (provider, returning bar, deep-scroll modal) | present | NONE | `Solicitors/web/src/components/intent/`: `IntentProvider.tsx`, `ReturningBar.tsx`, `DeepScrollModal.tsx`, plus `NextStepOffer.tsx` (extra vs the brief's list). |
| L7 | sticky CTA + hero CTA, copy from niche.config.json | present | NONE | `niche.config.json` `cta.sticky_primary`/`sticky_secondary`/`sticky_button` and `cta.variants.leadgen.hero_primary` exist and are wired the same shape as Property's. |
| L8 | thank-you, complete, /book, Aswatax message | present, but wording is "specialist firm from our partner network" not firm-voice | S | `app/thank-you/page.tsx:98`, `app/complete/page.tsx:114,139` both use partner-network phrasing (see P2). Whether this is literally the Aswatax handoff message (exempt) or a defect layered on top of it was not distinguished; flagged under P2, not double-counted here as its own defect beyond the routing shape existing correctly. |
| L9 | nurture file, `delayHours` gaps, firm voice, SMS ack | file present, `delayHours` are gaps (matches Property's pattern), voice is caveated | S | `Solicitors/web/src/config/lead-nurture.ts` `delayHours`: `0,0,4,24,48,96,168,264` (first sequence) and `0,24,48,168` (second), gap style, consistent with Property. SMS/email copy at lines 383, 400, 433, 586 says "a specialist from our partner network will call you", caveated, counted under P2. |
| L10 | blog CTAs, category-driven | category-driven via `niche.config.json` `cta.variants.leadgen.blog` | NONE | `cta_heading`/`cta_body`/`cta_button` keys present; not checked for dead `categorySlug` prop. |
| L11 | consent text from `site.ts`, diff against Property | word-for-word identical to Property's | NONE | Both `Solicitors/web/src/config/site.ts:19` and `Property/web/src/config/site.ts:39` read: "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this." Identical, and the consent sentence is exempt from rule 8. |
| L12 | lead source in `/api/leads/submit`, DB CHECK acceptance | `source: "solicitors"` | NONE | `Solicitors/web/src/app/api/leads/submit/route.ts:28,67`: `createLeadSubmitHandler({ source: "solicitors" })`, default `"solicitors"`. "solicitors" is in the memory-recorded CHECK list (dentists/property/medical/solicitors/general/agency). |
| G1 | AI-crawler allowlist, host line | present, matches Property's pattern | NONE | `Solicitors/web/src/app/robots.ts` mirrors Property's structure per its own comment ("Mirrors the Property gold-standard robots.ts"): 19 training bots, 26 retrieval bots, `disallow: ["/api/", "/thank-you"]`, `host` line set. |
| G2 | shared builder, sameAs, parentOrganization, knowsAbout | hand-rolled, sameAs present, parentOrganization absent, knowsAbout present | M | See P5. `sameAs` links to the Companies House record; `knowsAbout` lists 8 legal-sector topics; `parentOrganization` field is not populated (the shared builder supports it, this site's hand-rolled version has no equivalent field at all). Rendered once, in `layout.tsx` presumably (not independently confirmed which pages). |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | not found on the 4 audience pages | M | `grep -l "buildService\|FAQPage\|BreadcrumbList" Solicitors/web/src/app/for-partners/page.tsx Solicitors/web/src/app/for-junior-solicitors/page.tsx Solicitors/web/src/app/for-locum-solicitors/page.tsx Solicitors/web/src/app/for-firm-buyers/page.tsx` returned no matches. `/services` and `/services/[slug]` not separately checked for this row. |
| G4 | BlogPosting, author Organization/Person, real dateModified | present, author typed Person ("Editorial Team") | XS | `Solicitors/web/src/lib/schema.ts:107-110`: `author: { "@type": "Person", name: "${siteConfig.name} Editorial Team" }`. Property's own comment (`Property/web/src/lib/schema.ts:75`) notes it deliberately avoids "a fictitious Editorial Team Person" in favour of the real Organization builder, so this is a real difference, not a wash. `dateModified` truthfulness not checked. |
| G5 | llms.txt firm-first, UTM tags, lists audiences/services/calculators | route present, UTM tags present, content lists everything, but opening lines are caveated | S | `Solicitors/web/public/llms.txt` (static file, not confirmed as a route like Property's) carries `utm_source=chatgpt&utm_medium=llms` throughout, lists cornerstone guides, key facts, 13 calculators, 8 guides, 5 services, 3 research pages, 7 blog categories, 4 audience pages and key pages. Caveated opening lines counted under P6. |
| G6 | `buildLlmsFullRoute`, post count, size vs 19.07MB ceiling | route live, 2,871,593 bytes (2.7 MB) | NONE | `curl` to `https://www.accountsforlawyers.co.uk/llms-full.txt` returned 200, size 2,871,593 bytes, well under the 19.07 MB ISR ceiling that affects Property. Whether it's built via `buildLlmsFullRoute` from `web-shared` not confirmed (file is `Solicitors/web/src/app/llms-full.txt`, a route dir, so likely a route not a static file). |
| G7 | `lastModified` real or omitted, hreflang | mostly `new Date()` (build-time now), blog posts use real `post.date` | S | `grep -n "lastModified" Solicitors/web/src/app/sitemap.ts` (path inferred): 6 of 7 entries use `new Date()` (build-time "now", the defect class Property's brief flags as wrong), 1 entry (blog posts) uses `post.date ? new Date(post.date) : new Date()`. hreflang not checked. |
| G8 | canonical-hub fix present or not needed | no canonical-related commits touch this site since 09-26 | ? | `git log --since=2026-09-26 --grep=canonical --stat --oneline -- Solicitors/` returned nothing. Either the site never had the defect, or the estate-wide fix commit did not touch Solicitors files. Not enough evidence to grade; recorded as a question. |
| G9 | noindex correct, `/embed` rule | `/embed/[slug]` route exists; noindex not checked | ? | Route present; no noindex meta grep run for this report. |
| G10 | `gsc_config.py` entry, IndexNow, Bing verified | IndexNow key provisioned per STATE.md, GSC likely configured | S | `docs/solicitors/STATE.md` line ~1168 records an IndexNow key (`b5e67f1...`) provisioned and hosted at the domain root, verified live, 33 URLs submitted in June. `agents/config/gsc_config.py` entry not independently grepped this session. Bing Webmaster verification status: unknown from repo. |
| G11 | 2026-09-27 AI-naming baseline coverage | not checked | ? | `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 was not read this session; cannot say whether Solicitors is covered. |
| C1 | posts total, recent count, newest date | 214 markdown files under `content/` | S | `find Solicitors/web/content -iname "*.md*"` = 214 (mix of `blog`, `resources`, `solicitor-guides` subfolders). Count of posts with `date >= 2026-07-30` and newest post date not individually extracted this session. |
| C2 | `house_positions.md` exists, last edit, section count | exists, last edited 2026-07-19 | S | `docs/solicitors/house_positions.md`, mtime `2026-07-19 13:18:43`. Stale relative to today (2026-09-28), roughly 10 weeks old; section count not counted. |
| C3 | coverage map exists | not found in `docs/solicitors/` listing | M | `ls docs/solicitors` lists no `COVERAGE_MAP_2026-09.md` or similarly named file. |
| C4 | `/for/[slug]` dynamic, Property template | 4 static routes (`for-firm-buyers`, `for-junior-solicitors`, `for-locum-solicitors`, `for-partners`), not the dynamic template | M | `find Solicitors/web/src/app -maxdepth 1 -type d -name "for-*"` = 4 directories, no `for/[slug]`. Schema absence confirmed under G3. |
| C5 | `/services/*` and money pages list | `/services` index + `/services/[slug]` dynamic, plus `sra-compliance`, `uk-solicitor-tax-rates`, `specialist-vs-generalist-accountant`, `law-firm-chart-of-accounts-template`, `free-firm-health-check` as standalone money/decision pages | NONE | Directory listing under `Solicitors/web/src/app` (see tree captured this session). |
| C6 | validator pass/fail counts | site is supported, not run | ? | `scripts/validate_blog_content.py` `SITES` dict includes `"Solicitors"` (domain `accountsforlawyers.co.uk`, `url_style: "nested"`, author "Accounts for Lawyers Editorial Team"). Not run this session (read-only scope did not include running it; would have been safe as read-only but was skipped for time). |
| C7 | `dateModified`/`reviewedAt` on posts | not checked | ? | Frontmatter fields not sampled this session. |
| C8 | byline model | "Editorial Team" via a fictitious Person schema type | S | See G4. `AuthorByline.tsx` referenced in `docs/solicitors/STATE.md` as an "editorial-team monogram... NO fabricated ICAEW reviewer per the no-invented-reviewer rule", so the display byline is honest; the JSON-LD `author.@type` is nonetheless `Person`, which is a schema-accuracy gap regardless of display honesty. |
| C9 | link audit, HARD 404 count | STATE.md records disputed audit results, not independently re-run | ? | `docs/solicitors/STATE.md` (2026-06 entries) records `predeploy_gate --site solicitors` reporting HARD FAIL (80) attributed to an auditor bug (`&` slugify mismatch), with the corpus independently verified at 0 broken internal `/blog` links via route-form checking. Not re-run this session; treat the "0 broken" claim as unverified but plausible given the detailed methodology note. |
| D1 | port tags, `web-shared/design` import count | all 6 phases tagged | NONE | `git tag -l 'port-solicitors-*'` = `port-solicitors-phase0` through `phase6`. Import count not run this session. |
| D2 | `prose-standard.css` imported from `globals.css` | not imported by that name; a different shared stylesheet is imported | S | `Solicitors/web/src/app/globals.css` imports `@accounting-network/web-shared/design/globals-standard.css`, not `packages/site-styles/prose-standard.css`. Whether `globals-standard.css` itself pulls in prose-standard was not traced further. |
| D3 | header CTA hides below 1024 | not checked | ? | No rendered DOM check run this session. |
| D4 | favicon, og:image, metadataBase | favicon confirmed matches header mark (commit `9e43db45` "favicons that match each site's header mark") | S | Recent commit title only; SVG-vs-raster og:image and `metadataBase` not individually checked. |
| D5 | fonts | not checked | ? | Not sampled this session. |
| D6 | StatsCounter literal-value support | not checked | ? | Not sampled this session. |
| D7 | 390px real emulation | not run | ? | No puppeteer-core run this session; out of scope for the time available. Recorded as a question per rule 5's evidence bar, not assumed passing. |
| D8 | playbook 9.1 kit-adoption gate numbers | not run | ? | Not run this session. |
| I1 | live status codes | all 200 | NONE | See report header; home, robots.txt, llms.txt, llms-full.txt, sitemap.xml all 200. |
| I2 | Vercel project id, last deploy vs HEAD | project `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9`, production SHA `435cc12e` deployed 2026-08-24; commits since then | S | `docs/solicitors/STATE.md` line 1122-1128 records production SHA `435cc12e` (read 2026-08-25) with 0 commits ahead on the design-port branch at that time. `git log --oneline -10 -- Solicitors/` shows commits after that date (AdSense, favicons, lead evidence fix, VAT-regime fix) not yet confirmed deployed, count of commits since 2026-08-24 not run as `git log --since` this session. |
| I3 | test count, CI coverage | 18 test files | NONE | `find Solicitors/web/src -iname "*.test.ts*"` = 18. CI workflow grep not run this session. |
| I4 | GA4, CSP, consent banner | GA4 `G-N6ZPRB3DSQ` recorded in STATE.md; CSP/consent not independently checked | S | `docs/solicitors/STATE.md`: "GA4: `G-N6ZPRB3DSQ`". `components/analytics/` presumably mirrors the estate-wide CSP fix (`981a604e`) referenced in memory as applied "on all sites" 2026-09-23, but this site's CSP header was not curl'd this session. |
| I5 | env/flag reads | not checked | ? | Not grepped this session. |
| I6 | monitored_pages rows | unknown from repo | ? | Supabase not queried this session (read-only repo scope). STATE.md references monitored_pages registrations for past waves (to 2026-10-06/10-07) but current row state is unknown. |
| I7 | STATE.md exists, newest entry date, contradictions | exists, last updated 2026-09-12, and its 2026-09-12 entry explicitly locks in the caveated "partner network" wording as the deliberate, legally-matched positioning | L | `docs/solicitors/STATE.md` header: "Last updated: 2026-09-12." The CLAIMS AUDIT REMEDIATION entry for that date states the fix approach was to "match what the site already publishes legally" (terms/privacy already disclose the referral model), i.e. it treats referral-network voice as correct. The 2026-09-28 evening ruling (brief rule 8) reverses this: the brand IS the firm on prospect-facing surfaces now. STATE.md has not been updated to reflect the ruling and actively documents the opposite of current policy. |

## Unique to this site

- Four SRA-specific tools not present on Property's kit list: COLP/COFA compliance checker,
  client-account interest calculator, SRA client-account reserve calculator, and a dedicated
  `law-firm-sale-cgt` calculator route (`Solicitors/web/src/app/calculators/law-firm-sale-cgt/`).
- Three research pages (`uk-legal-incorporation-index`, `law-firm-survival-index`,
  `uk-solicitor-profession-structure`) built on SRA Regulated Community Statistics and Law
  Society data, a genuinely different, sector-specific data asset Property does not have.
- Nurture SMS and reply-to-YES email flow references "a specialist from our partner network"
  explicitly by name in-message, which is a live extension of the P2 defect into an active
  communication channel, not just static copy.
- A `packages` CTA variant (`niche.config.json` `cta.variants.packages`) exists and is fully
  built out (pricing-led hero, "£49/mo" copy, `/pricing` links) even though `cta.variant` is
  currently set to `"leadgen"`. This is dead-but-ready configuration, not a defect, but worth
  flagging since it does not exist on Property's kit at all.

## Shares Property's open defects

- Not independently confirmed: whether footer "Book a consultation" points at an untokened
  `/book` with zero forms (Property's known defect). `app/book/page.tsx` exists and does mount
  a `LeadForm`/`LeadCTAPanel` per the L1 grep, which suggests Solicitors' `/book` is NOT empty,
  unlike Property's, but the footer link itself and whether it's tokened were not checked.
- The "24-hour promise with no nurture backing" defect was searched for and not found in the
  surfaces checked (P4); cannot confirm either way that it's shared or avoided.
- The `lastModified: new Date()` build-time-now pattern in `sitemap.ts` (G7) is the same class
  of defect the brief describes for the estate generally, present on 6 of 7 sitemap entries.

## Questions (missing data, not findings)

- Whether the P8/L8 "partner network" wording in `thank-you`/`complete` is literally the
  Aswatax post-submit message (exempt under rule 8) or a separate defect layered on top of it.
- G8: whether the estate-wide canonical-hub fix was ever needed on this site, or simply never
  applied.
- G9, G11, D3, D5, D6, D7, D8, I5, I6: not checked this session, time-boxed out.
- C1 exact newest-post date and >=2026-07-30 count; C7 `dateModified`/`reviewedAt` presence;
  C9 current (re-verified) broken-link count.
- I2 exact count of commits since the 2026-08-24 production deploy that touch `Solicitors/`.
- Whether `docs/solicitors/house_positions.md`'s 2026-07-19 staleness has since been
  superseded by an uncommitted or unlogged pass.

## Commands and files read

- `find Solicitors/web/src -maxdepth 3 -type d`, `find . -iname "niche.config.json"`
- `node -e "require('./Solicitors/niche.config.json')"` (keys, `entity`, `cta`, `description`,
  `partner`, `company`)
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|
  we are not accountants|regulated accountancy firms|regulated firms in" Solicitors/web/src
  Solicitors/niche.config.json Solicitors/web/public`
- `Solicitors/web/src/lib/organization-schema.ts`, `Property/web/src/lib/organization-schema.ts`,
  `packages/web-shared/schema/organization.ts`, `Solicitors/web/src/config/site.ts`,
  `Property/web/src/config/site.ts`
- `Solicitors/web/public/llms.txt` (full read), `Solicitors/web/src/app/robots.ts` (full read)
- `grep -rl "LeadCTAPanel|LeadForm" Solicitors/web/src/app`
- `grep -rn "inline_mini|mobile_tool|calc_result_form|calc_result|resource_block|
  calc_page_footer|blog_short_resource" Solicitors/web/src`
- `find Solicitors/web/src/components/support`, `ls Solicitors/web/src/components/intent`
- `find Solicitors/web/src/app/calculators -maxdepth 1 -type d`
- `grep -n "delayHours" Solicitors/web/src/config/lead-nurture.ts`
- `Solicitors/web/src/app/api/leads/submit/route.ts`
- `find Solicitors/web/content -iname "*.md*" | wc -l`
- `docs/solicitors/house_positions.md` (mtime, tail)
- `git tag -l 'port-solicitors-*'`
- `Solicitors/web/src/app/globals.css`
- `git log --since=2026-09-26 --grep=canonical --stat --oneline -- Solicitors/`
- `curl -sI https://www.accountsforlawyers.co.uk/`; `curl -s -o /dev/null -w "%{http_code}"` on
  `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`
- `curl -s https://www.accountsforlawyers.co.uk/llms-full.txt` (size)
- `find Solicitors/web/src -iname "*.test.ts*" | wc -l`
- `scripts/validate_blog_content.py` (`SITES` dict, not executed)
- `grep -l "buildService|FAQPage|BreadcrumbList"` on the four `/for-*` audience pages
- `Solicitors/web/src/lib/schema.ts` (author block)
- `docs/solicitors/STATE.md` (head, tail, and the 2026-08-24/2026-09-12 entries)
- `git log --oneline -10 -- Solicitors/`

---

# Wave 2 reader pass (2026-09-28)

Rendered with `puppeteer-core` (repo root) on Chromium `ms-playwright/chromium-1223`.
Mobile = `page.emulate` viewport 390x844, `deviceScaleFactor: 3`, `isMobile: true`,
`hasTouch: true`, iPhone UA. **Control: `https://www.gov.uk` under the same code returns
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing
elements**, so the emulation is honest and the 390 numbers below are real. Pages rendered:
`/`, `/about`, `/services`, `/for-partners`,
`/blog/practice-finance-cash-flow/xero-for-solicitors`,
`/calculators/partnership-vs-llp-take-home`, `/contact`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA visible at 1280, hidden at 390 | Rendered `getBoundingClientRect`: at 1280 "Contact" 88x38 and "Book a call" 121x40 visible; at 390 both 0x0 and not visible. Same on all seven pages |
| D5 | Plus Jakarta Sans, via `next/font/google` | Applied body `font-family` is "Plus Jakarta Sans", "Plus Jakarta Sans Fallback" on all seven pages |
| D6 | The site deliberately declines `StatsCounter`, with the reason written at the call site | `Solicitors/web/src/app/page.tsx:204`: "are not numeric, so StatsCounter cannot carry them without new copy". This is a legitimate measured decline under the playbook counter-rule, not a gap |
| D7 | `scrollWidth = 390` on all seven pages, no overflowing elements on any | Real emulation, all seven pages, zero selectors past the viewport edge. The best 390 result of the four sites I read |
| D8 | 1=1; 2=8 distinct / 37 call sites; 2a=0; 2b adopted=2 declined=0; 3=`next/font/google`; 4=1; 5=Eyebrow 9, section-label 0; 6=1 ring line; 7=1 gradient file; 8=walks 3, guards-the-guard 0. Markers ping 0, stats 0, backdrop 3, rounded-full 3 | Section 9.1 block run verbatim. Rows 1, 2, 2b, 3, 4, 5 pass. **Row 8 half-fails: three test files walk the corpus but none carries the "guards the guard" assertion**, so the walk could silently find nothing |
| G7 | Live sitemap newest `lastmod` is 2026-09-24, not today | `curl /sitemap.xml` distinct dates end at 2026-09-24, so the deployed build predates today. The build-time `new Date()` pattern in source still stands as a defect, it just is not visible as today's date right now |
| G8 | Defect ABSENT. Hub canonicals self-reference | `/` to `/`, `/blog` to `/blog`, `/calculators` to `/calculators`, `/services` to `/services` |
| G9 | Correct. `noindex` only on `/embed/*` | The four hub pages carry no `noindex`; `/embed/salary-dividend-optimiser` does. NIT: that embed page canonicals to the homepage, not itself |
| L3 | Two forms on the calculator page, one a 6-input capture, and no gate copy served | Rendered form count 2 (6 and 11 inputs). A grep of the served HTML for "no thanks", "unlock", "show me the result", "PDF" and "download" returns no hits, though `backdrop-blur` is present. A client gate after a calculation cannot be ruled out by GET |
| L4 | 13 calculators | Live sitemap: partnership-vs-llp-take-home, fa-2014-salaried-member, llp-profit-share-allocation, law-firm-valuation, sra-client-account-reserve, indemnity-premium-estimator, colp-cofa-checker, solicitor-hourly-rate-benchmark, law-firm-sale-cgt, vat-disbursements-classifier, client-account-interest, partner-tax-reserve, practice-cashflow-runway |
| L8 | **`/book` is a dead end and DOES share Property's defect** | Rendered `/book` returns 200 with a form count of 0 and zero inputs, under an h1 reading "Book your free review call" |

## Reader findings

The homepage renders with no `h1` at all, which is the single worst thing I found on any of
the four sites and is a ten-minute fix. Positioning is the second problem: eighteen
prospect-facing sentences across five pages say a matched third party does the work, and
the homepage strapline is literally "Specialist accountancy matching for UK solicitors and
law firms". Third, the writing has not been swept: seven em-dashes on `/for-partners`,
three on `/services`, and American spellings on the homepage.

Everything structural is good. Nothing overflows at 390 on any page, the header CTA hides
correctly, contrast passes comfortably.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | home | No `h1` in the rendered DOM | `document.querySelector('h1')` returns empty text at both 1280 and 390. The page-title promise is carried only by the `<title>` and a paragraph | XS |
| BLOCKER | home | 5 caveat sentences, including the first line under the hero | "Specialist accountancy matching for UK solicitors and law firms"; "The specialist accountant we match you with keeps your practice finances compliant"; "Clear, accessible service Fixed fees, no jargon, and direct access to the solicitor accountant we match you with." | M |
| BLOCKER | /about | 4 caveat sentences, and the `h1` itself is the caveat | h1 = "Specialist accountancy matching for solicitors and law firms"; body: "We match you with an accountancy firm from our partner network"; "We'll introduce you to the right partner firm, with no obligation." | M |
| BLOCKER | /services | 6 caveat sentences | "What we do is connect you with an appropriately qualified independent reporting accountant from our specialist partner network"; "Our partner network covers solicitors and law firms nationally"; "The partner firm we match you with models the conversion economics" | M |
| BLOCKER | /book | Renders zero forms under the heading "Book your free review call" | rendered form count 0, inputs 0 | S |
| FIX | /for-partners | 7 em-dashes in visible body text | count of U+2014 in `body.innerText` = 7 | XS |
| FIX | /services | 3 em-dashes in visible body text | count of U+2014 = 3 | XS |
| FIX | home | American spellings in visible body text: "optimized", "specialize", "specialized" | "keeps your practice finances compliant and your personal tax position optimized"; "When you work with accountants who specialize in the legal sector" | XS |
| FIX | /about | American spelling "specialize" | in visible body text | XS |
| FIX | /for-partners | Caveat inside the page's own promise | "The partner firm we match you with does all three." | XS |
| FIX | /calculators/partnership-vs-llp-take-home | Caveat under the result | "A firm from our partner network models the full picture as part of the advisory work." | XS |
| FIX | blog post, calculator | One `enquiry_ref` input with no label and no `aria-label` on each | rendered unlabelled list: `enquiry_ref` | XS |
| FIX | site-wide | Footer has no booking or consultation link at all | rendered footer link scan for "book", "consult", "call" returns an empty list on all seven pages | S |
| FIX | site-wide | Focus indication is a 2px ring at 25 per cent alpha plus a border colour change, `outline-style: none` | Tab to `input[name=fullName]`, `:focus-visible` matches, outline `none 1px`, border moves to `rgb(71,85,105)` | XS |
| NIT | /calculators/partnership-vs-llp-take-home | Longest paragraph 151 words, the longest of any page on any of the four sites | rendered paragraph word count | S |
| NIT | blog post | One AI tell | "robust" in visible body text | XS |
| NIT | /about, /contact | Both open on a "Whether you are A, B or C" construction rather than the answer | "/contact": "Whether you're a sole practitioner managing SRA compliance, a law firm partner navigating LLP conversion, or a COFA ensuring client money rules are met, we're here to help." | XS |
| NIT | site-wide | Playbook 9.1 row 8 half-fails, walks present but no guards-the-guard assertion | walks 3, guards-the-guard 0 | XS |

Writing, measured: **em-dashes 0 on home, about, blog post, calculator and contact; 3 on
/services; 7 on /for-partners. US spellings on home (3 distinct) and about (1). AI tells 1
("robust", blog post).** Readability: the answer is in the first paragraph on /services,
/for-partners, the calculator and the blog post; home, /about and /contact open on a
"whether you are" sweep instead. h1 and title agree on every page that has an h1; the
homepage has none.

### Design numbers

| Page | sw 1280 | sw 390 | overflow at 390 | body contrast | CTA contrast | forms | sticky at 390 | chat |
|---|---|---|---|---|---|---|---|---|
| / | 1280 | 390 | none | 17.06 | 5.84 | 1 | 2 | none |
| /about | 1280 | 390 | none | 17.06 | 5.84 | 1 | 2 | none |
| /services | 1280 | 390 | none | 17.06 | 5.84 | 1 | 2 | none |
| /for-partners | 1280 | 390 | none | 17.06 | 5.84 | 1 | 2 | none |
| blog post | 1280 | 390 | none | 17.06 | 5.84 | 2 | 2 | none |
| /calculators/partnership-vs-llp-take-home | 1280 | 390 | none | 17.06 | 5.84 | 2 | 2 | none |
| /contact | 1280 | 390 | none | 17.06 | 5.84 | 1 | 2 | none |

CTA contrast 5.84 clears AA for both normal and large text. No chat widget in the rendered
DOM on any page. Images without alt: 0 on all seven pages.

### Sameness

| Comparison | Result |
|---|---|
| Segment page closers within the site | Different. All four `/for-*` pages close on their own wording, though all four use a "30-minute scoping call" opener in the close |
| Service page closers within the site | Only `/services` exists as a hub; its close is "30-minute scoping call. We'll tell you which engagement tier fits, what the fee would be, and which partner firm is the right match." |
| Against Property's shared close | Not shared. Property's `/for/` pages all close on "Free first call, then a fixed fee in writing" and "Book a free first call. No obligation, no hard sell. If we take the work on, you get a fixed fee in writing before anything starts." Solicitors uses "30-minute scoping call" instead, consistently across four pages |

## Corrections to the inventory

1. **L8 "S"**, sized on wording alone, understates it: rendered `/book` returns zero forms,
   so Solicitors shares Property's dead `/book` defect as well as the caveat wording.
2. **D6 "?"** closes as a legitimate measured decline, not unknown. The reason is written at
   `Solicitors/web/src/app/page.tsx:204`.
3. **G8 "?"** closes as defect-absent: hub canonicals self-reference live.
4. **G9 "?"** closes as correct: `noindex` only on `/embed/*`.
5. Wave 1 records no writing-quality or `h1` check, so the missing homepage `h1`, the ten
   em-dashes and the four American spellings are new and none of them is in the gap table.
