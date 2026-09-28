# Crypto Tax Partners parity research (2026-09-28)

Domain `www.cryptotaxpartners.co.uk`. Vercel project not confirmed from repo (no `vercel.json`
project id; `docs/crypto/STATE.md` does not name one). Launched: yes. Live status: `curl -sI`
returns `200 OK` (checked 2026-09-28).

## Verdict in three lines

Crypto has the design port and a design uplift (both live since 2026-09-16) but not the lead
kit: the "for" and "services" hub pages carry no capture surface at all (a code comment says
so), there is no chat widget, no intent engine, no sticky CTA, and the site is missing from the
GSC and IndexNow plumbing entirely. The three biggest gaps: (1) four prospect-facing pages
(complete, thank-you, contact, plus the shared consent-adjacent copy) still render "specialist
firm from our partner network" caveat language, now a defect under the 2026-09-28 positioning
ruling; (2) segment (`/for`) and service pages have no lead form, no Service schema, no
BreadcrumbList, by explicit design choice recorded in the code; (3) GA4 is wired through the
shared analytics provider but `google_analytics_id` is blank in `niche.config.json`, so no GA4
hit fires, and the site has zero entries in `agents/config/gsc_config.py` and no IndexNow key.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity` key present | absent | S | `Property/niche.config.json:2` has `"entity"`; `grep -n '"entity"' crypto/niche.config.json` returns nothing |
| P2 | rare/none (Property has its own caveat in a code comment, not rendered copy) | 4 surfaces render "specialist firm from our partner network" / "a specialist firm... may contact you" | M | `crypto/web/src/app/complete/page.tsx:96,117`, `crypto/web/src/app/contact/page.tsx:61`, `crypto/web/src/app/thank-you/page.tsx:75`. `crypto/niche.config.json:6` also carries `"partner": {"name": "regulated firms in our specialist partner network"}`. Privacy-policy occurrences (`privacy-policy/page.tsx:97,132,205`) and `config/site.ts:15` `leadConsentText` are the consent sentence, exempt under rule 8 |
| P3 | "free consultation" language across CTAs | "free review" / "free call" present, 7 hits | NONE | `crypto/web/src/app/book/page.tsx:21,36`, `BookingPicker.tsx:160`, `lead-nurture.ts:349,417,464,647` |
| P4 | 24h promise ~115 times, no nurture backing | 0 hits for "within 24 hours" / "same working day" | NONE (crypto does not share this defect) | `grep -rniE "within 24 hours|same working day" crypto/web/src` = 0 matches |
| P5 | `AccountingService` firm-first, shared builder | hand-rolled `buildOrganizationJsonLd()`, `@type: ["ProfessionalService", niche.seo.organization_type]` where `organization_type` = `"AccountingService"`; no `parentOrganization` field | S | `crypto/web/src/lib/schema.ts:9-44`; `crypto/niche.config.json:66` sets `organization_type: "AccountingService"`; `sameAs` present (Companies House only, one entry) |
| P6 | firm-first opening, UTM-tagged links | firm-first opening lines, but zero UTM tags | S | `crypto/web/public/llms.txt:1-4` reads "Crypto Tax Partners... Specialist UK tax accountants..." (firm-first); `grep -c "utm_source=chatgpt" crypto/web/public/llms.txt` = 0 |
| L1 | mounted on home, about, services, segment, service, blog post, calculators, contact | mounted on home, about, services (hub), contact, blog post; NOT mounted on `/for/[slug]` or `/services/[slug]` (segment/service detail pages) or `/calculators/[slug]` | M | `grep -rl "LeadForm\|LeadCTAPanel" crypto/web/src/app` = about, blog post, contact, home, services (hub) only; `TopicPageLayout.tsx:191-193` code comment: "A LINK to /contact, not an embedded form: these routes carry no capture surface today and adding one is an owner decision" |
| L2 | shared ids across `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` | `InlineMiniLeadForm.tsx` and `CalcResultCta.tsx` exist; no evidence of `mobile_tool`, `resource_block`, `calc_page_footer`, `blog_short_resource` ids in crypto source | S | `grep -rl` for those id strings under `crypto/web/src` returns only `calculators/[slug]/page.tsx`, `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`, `role-labels.ts` |
| L3 | one form under result, no gate, no popup | `CalcResultCta.tsx` present, no `ResultGate.tsx` equivalent found | NONE (looks consistent) | `find crypto/web/src/components/calculators -iname "*Gate*"` = none |
| L4 | 6 route dirs + premium + `/embed` | one dynamic route `calculators/[slug]`, plus `/embed/[slug]`; no fixed route count determinable without reading the slug data file | ? | `find crypto/web/src/app/calculators -maxdepth 1 -type d` = only `[slug]`; did not enumerate the calculator data file's entries in this pass |
| L5 | `SpecialistWidget.tsx`, chat widget | not found anywhere in crypto source | L | `find crypto/web/src/components -iname "*widget*" -o -iname "*Specialist*"` = no results |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | not found | L | `find crypto/web/src/components/intent crypto/web/src/lib/intent` = no results |
| L7 | `StickyCTA.tsx` on homepage | not found | M | `find crypto/web/src/components/ui -iname "*sticky*"` = no results |
| L8 | thank-you, complete, `/book` tokened, Aswatax message | all three routes exist (`app/thank-you`, `app/complete`, `app/book`), Aswatax message present on thank-you (`page.tsx:95,106`) and in `LeadForm.tsx:416`, but thank-you/complete both also carry the P2 caveat copy | S | see P2 evidence; `find crypto/web/src/app -maxdepth 1 -type d` shows all three routes exist |
| L9 | `delayHours` = gaps, firm voice, SMS ack | `lead-nurture.ts` present, 14 `delayHours` entries starting `0, 0, 4, 24, 48…`, same gap convention as Property; nurture copy itself carries no "partner network" phrase (0 hits) | XS | `crypto/web/src/config/lead-nurture.ts:340-408`; `grep -c "partner network\|specialist firm from our" crypto/web/src/config/lead-nurture.ts` = 0 |
| L10 | `CTA_BY_CATEGORY`, category-driven | no `CTA_BY_CATEGORY` or `categorySlug` pattern found in `components/blog` | ? | `grep -rn "CTA_BY_CATEGORY\|categorySlug" crypto/web/src/components/blog/*.tsx` = no matches; could not confirm the blog CTA mechanism without reading `BlogPostRenderer` equivalent in full, which this pass did not do |
| L11 | shared consent sentence | identical text to Property, word for word | NONE | `crypto/web/src/config/site.ts:15` vs `Property/web/src/config/site.ts:39`, same string |
| L12 | source in `dentists/property/medical/solicitors/general/agency` CHECK list | `crypto` NOT in that memory-recorded list; code sends `source: "crypto"` | ? | `crypto/web/src/app/api/leads/submit/route.ts:28` `createLeadSubmitHandler({ source: "crypto" })`; whether the DB CHECK constraint accepts `"crypto"` cannot be determined from the repo, question for the data/ops read |
| G1 | large AI-crawler allowlist | same allowlist shape, ~50 bots, disallow `/thank-you`, `/admin` | NONE | `crypto/web/src/app/robots.ts:7-77` |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout`, one node per page | hand-rolled (`lib/schema.ts`), `sameAs` (Companies House only), `knowsAbout` present (10 items), no `parentOrganization` (Ashfield Trading Ltd 16358723) anywhere in the JSON-LD | M | `crypto/web/src/lib/schema.ts:9-44`; `grep -rl "web-shared/schema" crypto/web/src` = 0 files |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | only FAQPage on `/for/[slug]` and `/services/[slug]` (via shared `TopicPageLayout`); no Service schema, no BreadcrumbList JSON-LD | M | `crypto/web/src/components/templates/TopicPageLayout.tsx:3,162` imports/calls only `buildFaqJsonLd`; no `Service` or `BreadcrumbList` type anywhere in that file |
| G4 | BlogPosting with author, real `dateModified` | no `BlogPosting` builder called anywhere; `llms-full.txt/route.ts:91` text claims "BlogPosting on individual posts" but the blog post page only renders `post.schema` (custom, per-post) or FAQ/HowTo JSON-LD | L | `grep -rn "BlogPosting" crypto/web/src` = only the llms-full.txt prose line, no code that emits it; `blog/[category]/[slug]/page.tsx:95-103` |
| G5 | route or static, firm-first, UTM tags | static `public/llms.txt`, firm-first, audiences/services/calculators listed, no UTM tags | S | see P6 |
| G6 | `buildLlmsFullRoute`, post count listed, size | `src/app/llms-full.txt/route.ts` exists (dynamic route, 7.3 KB in `.next` output), separate from `public/llms.txt`; whether it uses the shared `buildLlmsFullRoute` helper was not confirmed | ? | `crypto/web/src/app/llms-full.txt/route.ts` exists; did not diff its import against `packages/web-shared/content/llmsFull.ts` in this pass |
| G7 | real/omitted `lastModified`, hreflang | every static route uses build-time `now`, not a real per-page date; posts use `post.updatedDate \|\| post.date` | S | `crypto/web/src/app/sitemap.ts:13-56`, `lastModified: now` on 11 static routes |
| G8 | canonical-hub fix (09-26/27) not a crypto commit; site already self-canonicals | `/blog` and `/blog/[category]` both set `alternates: { canonical: ... }` | NONE | `crypto/web/src/app/blog/page.tsx:12`, `blog/[category]/page.tsx:31`; `git log --since=2026-09-26 --grep=canonical --oneline` shows no crypto-touching commit, and none was needed |
| G9 | noindex on flow pages, `/embed` rule | 3 token-gated flow routes (`confirm`, `forwarded`, `optout`) render `<meta name="robots" content="noindex">`; `/book` has no breadcrumb by design (noindex flow page per comment) but robots.ts does not list `/book`, `/complete` or `/embed` in its `disallow` | S | `crypto/web/src/app/api/leads/{confirm,forwarded,optout}/[token]/route.ts`; `crypto/web/src/app/robots.ts:73` `disallow = ["/thank-you", "/admin"]` only, `/book`, `/complete` are not disallowed despite being noindex flow pages |
| G10 | entry in `gsc_config.py`, IndexNow key, Bing verified | no entry | L | `grep -n "crypto" agents/config/gsc_config.py` = no match; `find crypto -iname "submit_indexnow.py"` and `find crypto/web/public -iname "*indexnow*"` = no results; Bing verification unknown from repo |
| G11 | 09-27 AI-assistant naming baseline | not checked in this pass; brief says N/A if the baseline doc does not cover this site | ? | did not open `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 in this pass |
| C1 | 806 posts | 19 posts, newest dated 2026-07-15, none >= 2026-07-30 | L | `find crypto/web/content/blog -iname "*.md" \| wc -l` = 19; `grep -h "^date:" crypto/web/content/blog/*.md \| sort -u` newest = `2026-07-15` |
| C2 | exists | exists, 337 lines, last edited 2026-09-14 | NONE | `docs/crypto/house_positions.md`, `git log -1 --format=%ad -- docs/crypto/house_positions.md` = 2026-09-14 |
| C3 | exists | not found | S | `find docs/crypto -iname "*coverage*"` = no results |
| C4 | `/for/[slug]` dynamic, Property template | `/for/[slug]` dynamic, 8 hub pages, does NOT follow Property's template (no form, no Service/BreadcrumbList schema, see L1/G3) | M | `grep -c "slug:" crypto/web/src/data/crypto-hubs.ts` = 8 |
| C5 | list of services/money pages | `/services` hub + `/services/[slug]`, 7 services in `crypto-services.ts`; same template gap as C4 | S | `grep -c "slug:" crypto/web/src/data/crypto-services.ts` = 7 |
| C6 | pass/fail counts | site unsupported by the validator | N/A | `python scripts/validate_blog_content.py --site crypto` errors: `invalid choice: 'crypto' (choose from Property, Dentists, Medical, Solicitors, contractors-ir35, care, charities)` |
| C7 | `dateModified`/`reviewedAt` present | neither field appears in any post frontmatter | L | `grep -l "dateModified\|reviewedAt\|updatedDate" crypto/web/content/blog/*.md` = 0 files |
| C8 | byline model | `author: ""` (empty string) in every post checked; no named people | S | `can-hmrc-track-crypto-wallets.md:4` `author: ""` |
| C9 | link audit tool | none found under `crypto/` `scripts/` or `pipeline/` | ? | did not locate a crypto-specific link-audit script in this pass; report "no audit tool found" |
| D1 | design standard | tags present: `port-crypto-phase0` through `phase6`, `port-crypto-complete`, `port-crypto-uplift`; 20 files import `web-shared/design`; kit-adoption gate (§9.1) run live, 6 distinct kit components imported at 18 call sites, 1 backdrop, Eyebrow used 10x with 0 `section-label` leftovers | NONE | `git tag -l 'port-crypto-*'`; gate commands run 2026-09-28, see full numbers below |
| D2 | imported from `globals.css` | imported | NONE | `crypto/web/src/app/globals.css:9` `@import "../../../../packages/site-styles/prose-standard.css"` |
| D3 | hides below 1024 | shared `SiteHeader.tsx` used via `PageShell`, CTA box hidden `lg:hidden` below 1024, matches the estate-wide 09-16 fix | NONE | `packages/web-shared/design/chrome/SiteHeader.tsx:414,480,493`; `crypto/web/src/app/layout.tsx:10,100` uses `buildPrimaryNav()` + `PageShell` |
| D4 | favicon, non-SVG og:image, `metadataBase` | favicon is `icon.svg` (SVG favicon, distinct from the og:image defect the brief flags); og:image is the dynamic `/api/og` route (not a static SVG); `metadataBase` set | XS | `crypto/web/src/app/icon.svg`; `layout.tsx:72,77` `metadataBase: new URL(siteUrl)`, `images: [{url: "/api/og"...}]` |
| D5 | Geist Sans | Geist Sans + Geist Mono via `next/font` | NONE | `crypto/web/src/app/layout.tsx:2-3` |
| D6 | literal-value support for dates/ranges | no `StatsCounter` or stat-tile component found in `crypto/web/src/components` | ? | `find crypto/web/src/components -iname "*StatsCounter*" -o -iname "*stat-tile*"` = no results; may use a shared stat component not searched by this name |
| D7 | 390px real emulation | not run in this pass (no `puppeteer-core` launch performed; time did not permit a live render check) | ? | not attempted; flag for a follow-up pass with real `page.emulate` per rule 7 |
| D8 | gate run, numbers reported | run 2026-09-28: layout-utils=2, kit adopted=6 distinct/18 call sites, kit declined(comment)=1, homepage marketing adopted=1/declined=0, webfont=geist/font/mono geist/font/sans next/font, backdrop=1, eyebrow ratio=10 Eyebrow / 0 section-label | NONE (passes) | commands run verbatim from `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 with `DIR=crypto`, 2026-09-28 |
| I1 | live | `200 OK` on `/`; `/robots.txt` 200, `/llms.txt` 200, `/llms-full.txt` 200, `/sitemap.xml` 200 | NONE | `curl -sI` / `curl -so /dev/null -w "%{http_code}"` run 2026-09-28 against `www.cryptotaxpartners.co.uk` |
| I2 | project id + deploy date in STATE.md | STATE.md says deployed 2026-09-16 from `90fbea9c`; ONE commit since then touches crypto (`1aca7e5e`, 2026-09-27, "lead capture on blog posts for startups-tech, ecommerce, crypto") that is NOT reflected in STATE.md and is presumably undeployed | S | `git log --since=2026-09-16 --oneline -- crypto/` = 1 commit; `git show -s --format="%h %ad" 1aca7e5e` = 2026-09-27; no Vercel project id found in repo for crypto |
| I3 | test coverage + CI | 8 `.test.ts(x)` files under `crypto/web/src`; `.github/workflows/ci-build-test.yml` and `bot-scorer.yml` reference "crypto" (not confirmed as crypto-site-specific vs the general term) | ? | `find crypto/web/src -iname "*.test.ts*" \| wc -l` = 8; did not open the workflow files to confirm the match is the site and not another use of the word "crypto" |
| I4 | GA4 present, CSP includes region1, consent banner | GA4 wired through shared `AnalyticsProvider`/`ConsentedScripts` (same as Property), CSP header comes from shared `packages/web-shared/lib/security-headers.ts` which already includes the `region1.google-analytics.com` fix; BUT `niche.config.json` `google_analytics_id` is an empty string, so no measurement ID is passed and no GA4 hit will fire | M | `crypto/web/src/app/layout.tsx:5-7,93-94`; `crypto/niche.config.json:67` `"google_analytics_id": ""` vs `Property/niche.config.json:204` `"G-B5MCP5NGMY"` |
| I5 | flags/env read | not enumerated in this pass | ? | did not run the `getFlag\|site_flags\|process.env.NEXT_PUBLIC_` grep for crypto in this pass |
| I6 | monitored_pages rows | unknown from repo | ? | Supabase not queried in this pass |
| I7 | STATE.md exists, contradicts code? | exists, newest dated 2026-09-16; contradicts the 1aca7e5e finding above (post-09-16 crypto commit not mentioned) | S | `docs/crypto/STATE.md`; see I2 |

## Unique to this site

- `TopicPageLayout.tsx:189-192` carries an explicit code comment recording the "no capture
  surface" decision on `/for` and `/services` detail pages as deliberate, not an oversight , 
  Property has no equivalent comment because it has the form.
- Crypto's kit-adoption gate (D8) numbers are strong post-uplift (6 distinct kit imports, 18
  call sites, near-zero comment noise), which the playbook itself (`DESIGN_PORT_PLAYBOOK.md`
  section 9.1) records as the worked example that FAILED the gate before the uplift and passed
  after it, crypto is the site the gate was built to catch.
- `robots.ts:73` disallows only `/thank-you` and `/admin`, leaving `/book`, `/complete` and the
  noindex-flagged token routes (`confirm`, `forwarded`, `optout`) crawlable by `allow: "/"` even
  though the pages themselves carry per-page noindex meta tags (except `/book` and `/complete`,
  which carry no noindex tag at all despite being flow pages).

## Shares Property's open defects

- None of the three named Property defects (dead `/book` link, 24h promise with no nurture
  backing, identical 3-line segment-page closers) were found on crypto: `/book` renders
  `BookingPicker.tsx`, a real tokened form (L8); the 24h promise has zero hits (P4); and the
  8 `/for/[slug]` closers pull per-hub `ctaHeading`/`ctaBody` props rather than one shared
  three-line block, though this was not diffed line-by-line for uniqueness across all 8.

## Questions (missing data, not findings)

- Does the leads DB `CHECK` constraint accept `source = "crypto"` (L12)? Cannot be determined
  from the repo; code sends it regardless of whether it lands.
- L4: exact calculator count and whether each carries FAQPage/cite-this, only the route
  structure was checked, not the underlying slug data file's contents.
- L10: the blog CTA mechanism (category-driven or fixed) was not confirmed; no
  `CTA_BY_CATEGORY` pattern found but the actual renderer was not read in full.
- G6: whether `llms-full.txt/route.ts` uses the shared `buildLlmsFullRoute` helper.
- G11: whether the 2026-09-27 AI-assistant naming baseline covers crypto.
- C9: whether any link-audit tool exists for crypto outside `scripts/`/`pipeline/` naming
  conventions checked.
- D6: whether crypto has a stat-tile component under a name this pass did not search.
- D7: 390px real-emulation check not run; needs a `puppeteer-core` pass per brief rule 7.
- I3: whether the CI workflow "crypto" match is this site or unrelated.
- I5/I6: env flags and `monitored_pages` rows not checked (Supabase/prod not queried).
- I2/G10: no Vercel project id or Bing verification status found in the repo for crypto.

## Commands and files read

- `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md` (full)
- `docs/crypto/STATE.md`, `docs/crypto/house_positions.md` (dates only)
- `crypto/niche.config.json`, `Property/niche.config.json` (diff read)
- `crypto/web/src/config/site.ts`, `Property/web/src/config/site.ts` (leadConsentText diff)
- `crypto/web/src/lib/schema.ts`, `crypto/web/src/app/robots.ts`, `crypto/web/src/app/sitemap.ts`
- `crypto/web/src/app/{complete,thank-you,contact,book}/page.tsx`
- `crypto/web/src/components/templates/TopicPageLayout.tsx`
- `crypto/web/src/app/for/[slug]/page.tsx`, `crypto/web/src/app/services/[slug]/page.tsx`
- `crypto/web/src/app/blog/[category]/[slug]/page.tsx`, `crypto/web/src/app/blog/page.tsx`
- `crypto/web/src/config/lead-nurture.ts`, `crypto/web/src/app/api/leads/submit/route.ts`
- `crypto/web/src/app/layout.tsx`, `packages/web-shared/design/chrome/SiteHeader.tsx`
- `packages/web-shared/lib/security-headers.ts`, `agents/config/gsc_config.py`
- `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 (gate commands run against `DIR=crypto`)
- `git tag -l 'port-crypto-*'`; `git log --since=2026-09-26 --grep=canonical --oneline`;
  `git log --since=2026-09-16 --oneline -- crypto/`; `git show -s 1aca7e5e`
- `curl -sI https://www.cryptotaxpartners.co.uk/`, plus `/robots.txt`, `/llms.txt`,
  `/llms-full.txt`, `/sitemap.xml` status checks (2026-09-28)
- `python scripts/validate_blog_content.py --site crypto` (errored, site unsupported)
- `find` / `grep` over `crypto/web/content/blog/*.md` for dates, author, dateModified

---

# WAVE 2 READER (2026-09-28)

Rendered with `puppeteer-core` (repo root) against Chromium
`ms-playwright/chromium-1223/chrome-win64/chrome.exe`, `page.emulate` with
`isMobile: true`, `hasTouch: true`, 390x844, `deviceScaleFactor: 3`.

**Control: https://www.gov.uk rendered with the same code returns
`document.documentElement.scrollWidth` = 390 at 390 and 1280 at 1280, zero
overflowing elements.** Every 390 number below sits against that control.

Pages rendered: `/`, `/about`, `/services/hmrc-disclosure`,
`/services/crypto-self-assessment`, `/for/investors`, `/for/miners`,
`/blog/staking-mining-and-airdrops/staking-rewards-tax-two-step`,
`/calculators/crypto-cgt-estimator`, `/contact`, `/book`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA "Get in touch" 131x40 visible at 1280; `display: none`, 0x0 at 390 | rendered DOM, all pages |
| D5 | `GeistSans`, `GeistSans Fallback` applied to `body`; loaded via `geist/font/sans` and `geist/font/mono` | `getComputedStyle(document.body)`; gate row 3 |
| D6 | No `StatsCounter` and no stat strip on the homepage. Comment-stripped marker `stats=0`. The playbook records this as a measured decline, not a defect | gate marker row |
| D7 | `scrollWidth` = 390 on every page rendered. The wide tables on `/` and the blog post sit inside scroll containers (`table.min-w-[28rem]` reaching 465 and 486 px) so the page itself does not scroll sideways | rendered DOM; control 390 |
| D8 | Gate 9.1: row1 layout-utils=**2**, row2 kit=**6 distinct / 18 call sites**, row2a declined=1, row2b adopted=1, row3 webfont=`geist/font/sans` + `geist/font/mono`, row4 backdrop=1, row5 Eyebrow=10 / section-label=0, row6 **4 coloured ring lines to read**, row7 2 gradient files, row8 **walks=0 guards=0**. Markers ping=0 stats=0 backdrop=3 rounded-full=1. Matches the post-uplift numbers the playbook records | gate block run verbatim |
| G3 | Segment and service pages carry `FAQPage` (1) and `BreadcrumbList` (1) but **zero `"@type":"Service"` and zero `AccountingService`** | curl `/for/investors` |
| G6 | `/llms-full.txt` serves 200 | curl |
| G7 | `lastmod` real and recent: `2026-09-23T12:28:40.789Z` | curl sitemap.xml |
| G8 | Canonical self-referencing and correct on `/for/investors` | curl |
| G9 | PASS. `/embed/crypto-cgt-estimator` serves `robots: noindex, nofollow`, HTTP 200, and no `/embed` URL appears in the sitemap | curl |
| L2 | Calculator page serves both `calc_result` and `calc_page_footer` capture ids | curl grep `id="calc_result-*"`, `id="calc_page_footer-*"` |
| L3 | **PASS, and ahead of Medical.** `/calculators/crypto-cgt-estimator` renders 2 forms, `calc_result` directly under the result and `calc_page_footer` at the foot. No gate, no modal, no PDF offer in the DOM | rendered forms = 2 |
| L4 | 4 calculator URLs in the sitemap | grep on sitemap |
| L8 | `/book` renders zero forms at 1280 and 390. Copy explains the missing token: "This page needs the personal link from your email or text message." | rendered DOM |
| L10 | Blog post renders **zero** forms and zero mini captures. There is no blog capture mechanism live at all, category-driven or fixed | rendered DOM on the staking post |

## Reader findings

Crypto's writing and machine layer are good and its calculator is the best in
this reader set. The lead kit is the hole: four of the ten pages rendered carry
no form at all, including every service page, every segment page and the blog
post, where Property mounts a form on all of them.

Two writing defects are visible to a buyer. The segment pages close on a
template that pastes the slug into a sentence, producing "your investors
situation" and "your miners situation". And `/contact` still tells the prospect a
partner-network firm will read the enquiry.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | `/about`, `/services/hmrc-disclosure`, `/services/crypto-self-assessment`, `/for/investors`, `/for/miners`, blog post | Zero `<form>` elements. Six of the ten pages rendered have no way to convert | rendered `document.querySelectorAll('form').length` = 0 on each | M |
| BLOCKER | `/for/investors`, `/for/miners` | Slug pasted into the closing sentence: "Tell us about your investors situation and we will explain what is involved" and "Tell us about your miners situation..." | rendered body text, last content paragraph | S |
| FIX | `/contact` | Prospect-facing, not the consent sentence: "A specialist firm from our partner network reads your enquiry" in the "What to expect" list | rendered body text | XS |
| FIX | `/for/*` and `/services/*` | Zero `"@type":"Service"` and zero `AccountingService` node, where Medical serves 7 and 1 on the same page type | curl | S |
| FIX | `/calculators/crypto-cgt-estimator` | No focus ring on the first input: `outlineStyle: "none"`, `boxShadow: "none"` | rendered `getComputedStyle` after `.focus()` | S |
| FIX | site-wide | No chat widget and no sticky CTA in the DOM on any page. Property mounts `SpecialistWidget` estate-wide and `StickyCTA` on home | rendered DOM | M |
| NIT | `/book` | "A crypto tax specialist will call you then" reads as a third party rather than the firm | rendered body text | XS |
| NIT | `/calculators/crypto-cgt-estimator` | Title duplicated: "Crypto CGT Calculator 2026/27 \| Crypto Tax Partners \| Crypto Tax Partners" | `document.title` | XS |
| NIT | blog post, `/` | Tables reach 465 to 486 px inside a 390 viewport. They are in scroll containers so the page does not break, but the reader must swipe them | rendered `getBoundingClientRect` | XS |

### Design numbers

| Page | sw@1280 | sw@390 | hdr CTA @1280 | hdr CTA @390 | body contrast | CTA contrast | forms |
|---|---|---|---|---|---|---|---|
| `/` | 1280 | 390 | 131x40 visible | none, 0x0 | 14.02 | 17.11 | 1 |
| `/about` | 1280 | 390 | visible | none | 11.51 | 17.11 | 0 |
| `/services/hmrc-disclosure` | 1280 | 390 | visible | none | 11.51 | 17.11 | 0 |
| `/services/crypto-self-assessment` | 1280 | 390 | visible | none | 11.51 | 17.11 | 0 |
| `/for/investors` | 1280 | 390 | visible | none | 11.51 | 17.11 | 0 |
| `/for/miners` | 1280 | 390 | visible | none | 11.51 | 17.11 | 0 |
| blog post | 1280 | 390 | visible | none | 7.25 | 17.11 | 0 |
| calculator | 1280 | 390 | visible | none | 11.51 | 17.11 | 2 |
| `/contact` | 1280 | 390 | visible | none | 11.51 | 17.11 | 1 |
| `/book` | 1280 | 390 | visible | none | 17.11 | 17.11 | 0 |

Zero em-dashes, zero en-dashes, zero US spellings, zero AI-tell phrases, zero
images without `alt`, zero broken images, zero placeholder phones or emails, zero
unlabelled visible inputs. The blog post's `.prose p` has rules applied:
`margin-bottom: 20px`, `font-size: 18px`. Longest paragraph 109 words
(`/services/hmrc-disclosure`). Every page rendered answers in its first
paragraph, and every h1 matches its title promise.

### Sameness

| Comparison | Result |
|---|---|
| Segment-page closers within crypto | SAME TEMPLATE, slug-substituted: "Tell us about your investors situation and we will explain what is involved" / "Tell us about your miners situation and we will explain what is involved" |
| Service-page closers within crypto | SAME final line on both: "Tell us about your situation and we will come back to you." |
| Against Property's shared close | NOT shared. Property ends every `/for/` and `/services` page on the same three lines: "A couple of sentences helps us prepare properly for your call." / "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." / "We respond within 24 hours and store your details securely." Crypto carries line 2 only, on the calculator and contact forms, where it is the exempt consent sentence |
| Against startups-tech | The "Tell us about your <slug> situation" template and the two-form calculator pattern are shared with startups-tech, which produces "your saas companies situation". One fix closes both sites |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| L4 "no fixed route count determinable" | 4 calculator URLs are live | sitemap |
| L10 "could not confirm the blog CTA mechanism" | There is none live. The blog post serves zero forms and zero capture ids | rendered DOM |
| D6 "no StatsCounter found, may use a shared component" | Correct, and it is a recorded decline, not a miss. Comment-stripped marker `stats=0`; the playbook 9.1 counter-rule names the crypto `StatsCounter` decline explicitly | gate block |
| D7 "not run, flag for follow-up" | Run. `scrollWidth` = 390 on all ten pages against a verified 390 control. No mobile layout defect | rendered DOM |
| G6 "whether it uses `buildLlmsFullRoute` was not confirmed" | Still unconfirmed at source, but the route serves 200 live | curl |
| `/for/crypto-investors` implied as a slug | No such page. `/for/crypto-investors` returns the 404 page with h1 "Page not found". The live slugs are `/for/investors`, `/for/miners` and so on | rendered DOM |
