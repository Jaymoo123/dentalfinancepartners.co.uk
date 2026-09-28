# Medical Accountants UK parity research (2026-09-28)

Domain: https://www.medicalaccounts.co.uk. Vercel project `prj_50vByZ3rqXQQwCUeENUTBbNBB41n`
(`docs/medical/STATE.md:1259`). Launched yes. Live status: homepage, robots.txt, llms.txt,
llms-full.txt and sitemap.xml all return 200 (curl -sI, 2026-09-28).

## Verdict in three lines

Medical's machine layer (schema, robots, sitemap, llms files, nurture cadence, consent text) is
close to Property's and in a few places slightly ahead. The three biggest gaps: (1) every one of
Medical's 9 segment pages carries zero Service/FAQPage/BreadcrumbList schema, where Property's
equivalent pages carry all three; (2) Medical's calculator result is still hidden behind a modal
gate (`ResultGateModal`) that Property removed on 2026-09-27, the single clearest live behavioural
gap; (3) content volume is 93 posts against Property's 806, with no dedicated `/services/*`
sub-pages, which is the acknowledged programme-scale gap already named in the leads-250 plan.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `niche.config.json` `entity.firm`, firm-first, no caveat (`Property/niche.config.json:2-5`) | Same shape, firm-first (`Medical/niche.config.json:2-5`) | NONE | Structurally identical |
| P2 | 15 files hit on caveat phrases; mostly exempt surfaces, but "a specialist reviews" appears in `data/audiences.ts` segment-page body copy (8+ instances, e.g. lines 73, 81, 173, 383) | 7 files hit; 2 prospect-facing: `app/for-medical-companies/page.tsx:78`, `app/for-nhs-doctors/page.tsx:78` ("A specialist reviews...") | S | Same defect class as Property, smaller scale (2 vs 8+); neither site clean against the 09-28 ruling |
| P3 | Dozens of hits, site-wide "free consultation/call" CTA (`app/page.tsx`, `about`, `contact`, `book`, all calculators, nurture emails) | Zero hits for "free consultation"/"free first call"/"free review" anywhere in `web/src` or `web/public` | L | Medical has no free-call offer language at all |
| P4 | ~30+ hits, "24-hour response"/"same working day" stat tiles on nearly every page type, `llms.txt:18`; brief already flags this as unbacked by nurture | Zero hits either phrase; `llms.txt` says "We reply promptly" instead | L | Opposite failure mode: Medical makes no time-bound promise at all (not over-promising, just silent) |
| P5 | `lib/organization-schema.ts`, `AccountingService`, firm-first description, `sameAs`, `parentOrganization` (Ashfield Trading Ltd 16358723), `knowsAbout` | Same shared builder, same shape, `Medical/web/src/lib/organization-schema.ts` | NONE | Structurally identical |
| P6 | `public/llms.txt:1-5` firm-first, no caveat | `Medical/web/public/llms.txt:1-5` firm-first, same shape | NONE | Both clean |
| L1 | Foot lead form on home, /services, every `/for/[slug]`, blog post foot | Form confirmed on home, about, blog hubs, calculators, contact, locations, guides, nhs-pension, research, services, complete, thank-you. Not confirmed on the 9 static `/for-*` pages (no hit in grep) | S/M | Needs a direct per-file check of the 9 `for-*` pages, flagged not confirmed either way |
| L2 | Ids: `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` | Has `inline_mini`, `mobile_tool`, `blog_short_resource`, `resource_block`, `calc_result`; missing `calc_page_footer`; has an extra `calc_result_gate` id | S | Extra id ties to L3 gate finding |
| L3 | `ResultGate.tsx` is a pass-through since 09-27 (owner decision), no modal, no PDF offer, one inline form under the result | `Medical/web/src/components/tools/ResultGate.tsx:26,119` still renders `ResultGateModal`, wired into `CalculatorClient.tsx` and `premium/PremiumCalculator.tsx` | L | Medical never received the 09-27 gate-removal change; clearest live parity defect |
| L4 | 6 route dirs plus premium tools and /embed | 9-10 calculator configs under `lib/tools/configs/`, single dynamic route `app/calculators/[slug]/page.tsx`; no `FAQPage` schema found anywhere under `app/calculators` or `lib/tools`; no cite-this mechanism anywhere on the site | M | More raw calculators than Property but none carry FAQPage or cite-this |
| L5 | `SpecialistWidget` mounted globally, `app/layout.tsx:12,139` | Component exists (`components/support/SpecialistWidget.tsx`), auto-open timers coded (10s desktop/8s mobile), but the only render site found is `app/admin/analytics/page.tsx`; no import in `Medical/web/src/app/layout.tsx` | L | Appears built but not wired into any public page per source; needs a live-site check |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal`, `lib/intent/` | Full parallel set present and mounted in `Medical/web/src/app/layout.tsx:11-12,112-113` | NONE | Matches, including test file |
| L7 | `components/ui/StickyCTA.tsx` on homepage; hero CTA from `niche.config.json` `cta` | Component exists, but only render site found is `app/admin/analytics/page.tsx`, same pattern as L5; hero CTA copy confirmed from `Medical/niche.config.json:222+` | M | StickyCTA mounting on public pages unconfirmed/likely missing; hero copy source fine |
| L8 | `/thank-you`, `/complete`, `/book` (`BookingPicker`, `DetailsForm`); Aswatax message | All three routes present; Aswatax message confirmed at `app/thank-you/page.tsx:132,143` and `SpecialistWidget.tsx:412` | NONE | Full post-submit kit present |
| L9 | `config/lead-nurture.ts`, `delayHours` gaps `0,0,4,20,24,48,72,96` then `0,24,48,168` | Identical sequence, `Medical/web/src/config/lead-nurture.ts:368-515,597-673`; no caveat language in nurture copy; SMS ack at `app/api/leads/inbound/twilio/route.ts` | NONE | Byte-for-byte structural match |
| L10 | `BlogPostRenderer.tsx` with `CTA_BY_CATEGORY`, category-driven | `categorySlug` prop actively consumed (`topicForBlogSlug`, `blogCtaFor`, breadcrumb, capture components, `messagePrefix`); no dead code | NONE | Category-driven, fully wired |
| L11 | `config/site.ts:39` consent sentence | `Medical/web/src/config/site.ts:25`, verbatim identical | NONE | Exempt surface anyway, matches exactly |
| L12 | n/a | `source: "medical"` in `app/api/leads/submit/route.ts:32` | NONE | "medical" is in the DB CHECK constraint list |
| G1 | 48 bots, single list, disallow `["/thank-you"]`, no `host` line | 48 bots split training/retrieval, disallow includes `/api/,/thank-you,/complete,/book,/admin,/embed`, has `host` line | NONE | Medical arguably ahead here |
| G2 | Shared builder, `AccountingService`, one node per page | Same shared builder, same shape, one node per page in `app/layout.tsx` | NONE | Structurally identical |
| G3 | `/for/[slug]/page.tsx` has Service + FAQPage JSON-LD plus `Breadcrumb` component emitting BreadcrumbList | `services/page.tsx` has Service + FAQPage; all 9 static `for-*/page.tsx` return zero hits for `FAQPage`, `BreadcrumbList`, `JsonLd` | L | Template-level fix, one shared change applied across 9 files |
| G4 | `author`/`dateModified` from frontmatter via `lib/blog.ts`, BlogPosting builder | `author: Organization` (`#organization` id), `dateModified` falls back to `date`, `lib/schema.ts:222-286` | NONE | Same pattern |
| G5 | Static `llms.txt`, firm-first, UTM-tagged | Static, firm-first, 47 UTM-tagged links (vs Property's 84, proportional to fewer services/posts), includes "Cornerstone Guides" section | NONE | Content volume gap tracked separately at C1/C5 |
| G6 | `buildLlmsFullRoute`, force-static, 806 posts listed, ~17MB | Same builder/route shape, one section (blog), lists 93 posts | NONE | Mechanism matches; size tracks C1 |
| G7 | Real/omitted `lastModified`, no `new Date()` churn, hreflang on every entry | Explicit stable date constants, comment confirms no build-time churn, hreflang applied, post `lastModified` real | NONE | Arguably more careful than Property's snippet |
| G8 | Canonical-hub fix (`bb297ab2f`) touched care, construction-cis, hospitality, startups-tech | Neither Medical nor Property in that commit's file list; every route sets its own `alternates.canonical`, root default never fires | NONE | Medical never carried the defect |
| G9 | n/a | noindex correctly scoped to admin/analytics, book, complete, embed, thank-you (7 files); `/embed` also in robots disallow | NONE | Belt and braces, no leaks found |
| G10 | Own `pipeline/submit_indexnow.py` | `agents/config/gsc_config.py:76-90` has a correct "medical" entry; no `pipeline/` directory and no `submit_indexnow.py` anywhere under `Medical/`; Bing verification unknown from repo | M | IndexNow script simply absent, mechanical build (copy Property's pattern) |
| G11 | n/a | `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` covers Medical extensively (lines 33, 40, 71, 130, 144-166, 174, 264) | N/A | Covered, not a gap |
| C1 | 806 posts | 93 posts; 15 with `date >= 2026-07-30`; newest post 2026-09-27 | L | Headline content-volume gap, programme scale |
| C2 | n/a | `docs/medical/house_positions.md` exists, last edit 2026-09-01, 43 sections | NONE | Exists; ~4 weeks stale, worth a refresh, not structural |
| C3 | n/a | `docs/medical/COVERAGE_MAP_2026-09.md`, `coverage_map_2026-09.json`, `index_coverage.md` all exist | NONE | Present |
| C4 | Dynamic `/for/[slug]`, 15 pages, Service+FAQPage+breadcrumb+form+stat tiles | Static `for-*` routes, 9 pages, stat tiles present, schema absent (same defect as G3) | M | Route-shape difference is cosmetic; missing schema is the real defect, already counted at G3 |
| C5 | 4 dedicated `/services/*` sub-pages plus 24+ money-page static paths | One services hub page only; `/nhs-pension`, `/calculators`, `/free-practice-health-check`, `/medical-guides`, `/research`, `/resources`, `/locations` | L | No dedicated `/services/*` sub-pages; already named in leads-250 plan item A3 |
| C6 | n/a | `python scripts/validate_blog_content.py --site Medical`: PASS, 93 posts, 0 errors, 0 warnings | NONE | Note: site arg is case-sensitive, `Medical` not `medical` |
| C7 | `dateModified` in 754/806 (~93%), `reviewedAt` in 582/806 (~72%) | `dateModified` in 26/93 (28%), `reviewedAt` in 0/93 (0%) | M | Mechanical backfill, not a rewrite |
| C8 | "Property Tax Partners Editorial Team" byline, no named people | "Medical Accountants UK Editorial Team" byline, no named people | NONE | Identical model |
| C9 | `track2_link_audit.py --site Property`: 0 hard 404s, 1 soft 301-hop | Own adapted auditor `scripts/medical_flat_link_audit.py` (built because Medical uses flat routing): 0 hard 404s across 93 posts, 8 categories, 26 top-routes, 5 locations | NONE | Correctly-adapted variant, both clean |
| D1 | Property is the design standard itself (source of the kit) | Tags `port-medical-phase1..phase6` all present, plus post-port fix `87295b2e3`; `web-shared/design` imported in 37 files; no separate uplift commit (Medical was not one of the 4 uplifted sites per `DESIGN_PORT_PLAYBOOK.md:19-24`) | NONE | Port complete, passes kit-adoption gate (D8) without needing an uplift |
| D2 | Does not import `prose-standard.css` (hand-authored) | Imports it at `globals.css:7` with a comment (blog/guide pages need `.prose`) | N/A | Correct kit fix for a ported site; Property doesn't need it |
| D3 | `SiteHeader.tsx:310` hides CTA below `lg` | Uses shared kit `SiteHeader.tsx` via `PageShell.tsx:8,46-75`; identical `hidden...lg:inline-flex` breakpoint (line 473) | NONE | Estate-wide fix from 09-16, present |
| D4 | `favicon.ico`, `icon.png`, `apple-icon.png`, `metadataBase`, `openGraph` | Only `icon.svg`; no `favicon.ico`, no `apple-icon.png`; `metadataBase` set (`layout.tsx:34`); og:image file extension not resolved (sourced from `niche.brand.publisher_logo_url`) | S | Missing favicon.ico/apple-icon.png confirmed; og:image SVG status is a question, not confirmed |
| D5 | `Plus_Jakarta_Sans` via `next/font/google` | Same font, same loader (`layout.tsx:2,19`) | NONE | Identical |
| D6 | Site-local `StatsCounter.tsx` | Shared `web-shared/design/marketing/StatsCounter.tsx` now has explicit `value?: string` field with a comment naming the "28 February rendered as 0" bug fix; Medical's own homepage stats are derived counts, not dates, so don't currently hit the bug | NONE | Fix is in the shared component; the memory-flagged bug is resolved |
| D7 | n/a | Real puppeteer `isMobile:true` emulation (not the 440px trap); gov.uk control `scrollWidth=390` pass; Medical home, `/for-gps`, `/calculators` all `scrollWidth=390, innerWidth=390, overflow=false` | NONE | Live-measured on 3 of 4 requested page types; blog-post page not tested (script error), untested not assumed clean |
| D8 | Playbook §9.1 gate, generalist reference 16/142, crypto post-uplift 6/18 | Kit adopted 14 distinct/69 call sites; marker row, eyebrow ratio, webfont, backdrop, ring-token rows all pass; row 7 (gradient grounds, 4 files) needs a live contrast measurement not performed; row 8 (ring-guard "guards-the-guard") fails as literally specified, no matching test file | XS | One self-check row technically fails; five-minute look needed at whether Medical's ring-guard test matches the corrected pattern |
| I1 | n/a | curl -sI: homepage, robots.txt, llms.txt, llms-full.txt, sitemap.xml all 200 | NONE | Live and serving |
| I2 | n/a | `docs/medical/STATE.md:1259` project id + last recorded deploy `dpl_HHomcnfjnDbC9bRB9A3878r7HdST` (2026-07-06), but live homepage HTML already shows the 09-16 design port markers (`copper`, `StatsCounter`), so that deploy pointer is stale | ? | STATE.md's deploy record predates what's actually live; did not compute a commit count from a known-stale reference point |
| I3 | n/a | 20 test files under `Medical/web/src` (leads, calculators, contrast, intent engine, nav, port-guards, result-gate); CI: `.github/workflows/ci-build-test.yml`, `content-quality-check.yml`, `daily-content-pipeline.yml` reference Medical | NONE | Reasonable coverage and CI presence |
| I4 | n/a | `components/analytics/GoogleAnalytics.tsx`, `ConsentToggle.tsx` present; live CSP includes `https://*.google-analytics.com` (covers region1), shared builder `web-shared/lib/security-headers.ts:83-88` | NONE | GA4 + consent + CSP all present |
| I5 | n/a | `grep -rn "getFlag\|site_flags\|process\.env\.NEXT_PUBLIC_"` returns one hit only (`NEXT_PUBLIC_SITE_URL`); no `getFlag`/`site_flags` usage found | ? | Either flags aren't used on this site or are read via `niche.config.json` instead of env; not chased further |
| I6 | n/a | Unknown from repo, cannot read Supabase; STATE.md references 19 monitored rows (frozen) as past evidence only | ? | Current live state not verifiable from repo |
| I7 | n/a | `docs/medical/STATE.md` exists, 1811 lines, newest section 2026-09-12 (claims-audit remediation, says deployed 09-16 per line 1642/1644); its closing line literally says "production still serves the pre-port design and the pre-audit copy" | ? | Contradicted by live evidence (port markers already live); STATE.md's closing line is stale and should be corrected |

## Unique to this site

- Robots.ts splits crawlers into `trainingBots`/`retrievalBots` and carries a `host` line and a
  tighter disallow list (`/api/`, `/complete`, `/admin`, `/embed`), Property has neither the
  split nor the host line (`Medical/web/src/app/robots.ts:33-127`).
- Sitemap uses named dated constants (`CRO_WAVE`, `STATIC`, `RESEARCH_DATE`, `RESOURCES_DATE`,
  `WAVE1_DATE`) with an explicit comment against `new Date()` churn (`sitemap.ts:9-10`).
- A purpose-built link auditor, `scripts/medical_flat_link_audit.py`, exists specifically because
  Medical uses flat `/blog/<slug>` routing where the shared `track2_link_audit.py` would
  false-positive every post link as a 404.
- `calc_result_gate` mini-capture id and `ResultGateModal` component are unique to Medical (see
  L2/L3), this is not a feature Property has, it is the pre-09-27 behaviour Property removed.

## Shares Property's open defects

- P2 caveat language ("a specialist reviews") on prospect-facing pages, same class as Property's,
  smaller scale (2 files vs 8+).
- The `/book` dead-end and identical-closer defects named in the brief for Property were not
  separately re-verified for Medical in this pass (not in section 2's row list); flagged as a gap
  in this research rather than a confirmed finding.

## Questions (missing data, not findings)

- L1: do the 9 static `/for-*` pages actually mount the foot lead form? Grep did not confirm
  either way, needs a direct per-file read.
- L5/L7: are `SpecialistWidget` and `StickyCTA` genuinely unmounted on all public pages, or only
  missed by grep (e.g. rendered through a wrapper)? Needs a live DOM check on
  medicalaccounts.co.uk.
- D4: does `niche.brand.publisher_logo_url` resolve to an SVG (the brief's stated og:image defect)
  or a raster image? Not resolved in this pass.
- D7: 390px scrollWidth on a blog-post page was not measured (script error after three page types
  already passed); treat as untested, not clean.
- D8 row 7: the four flagged gradient-ground files were not contrast-measured stop by stop.
- I2/I7: STATE.md's last recorded deploy (2026-07-06) and its closing "not deployed" line both
  appear to predate the 09-16 design-port rollout that live evidence shows is already serving.
  The actual current deployed commit against HEAD was not computed because the STATE.md reference
  point is known-stale.
- I5: is the near-total absence of `getFlag`/`site_flags` reads in Medical's code intentional
  (flags read via `niche.config.json` instead) or a real gap versus how Property/other sites gate
  features?
- I6: monitored_pages current state cannot be read from the repo (Supabase access not available
  to this research).
- G10: Bing Webmaster verification status for Medical is unknown from the repo.

## Commands and files read

- `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md` (full)
- `Medical/niche.config.json`, `Property/niche.config.json`
- `Medical/web/src/lib/organization-schema.ts`, `Property/web/src/lib/organization-schema.ts`
- `Medical/web/public/llms.txt`, `Property/web/public/llms.txt`
- `Medical/web/src/app/robots.ts`, `Property/web/src/app/robots.ts`
- `Medical/web/src/app/sitemap.ts`
- `Medical/web/src/config/lead-nurture.ts`, `Property/web/src/config/lead-nurture.ts`
- `Medical/web/src/config/site.ts`, `Property/web/src/config/site.ts`
- `Medical/web/src/components/tools/ResultGate.tsx`, `Property/web/src/components/calculators/ResultGate.tsx`
- `Medical/web/src/components/support/SpecialistWidget.tsx`, `Medical/web/src/app/layout.tsx`
- `Medical/web/src/components/ui/StickyCTA.tsx`
- `Medical/web/src/app/for-*/page.tsx` (9 segment pages), `Medical/web/src/app/services/page.tsx`
- `Medical/web/src/lib/schema.ts`, `Medical/web/src/components/blog/BlogPostRenderer.tsx`
- `agents/config/gsc_config.py`
- `docs/medical/house_positions.md`, `docs/medical/COVERAGE_MAP_2026-09.md`,
  `docs/medical/coverage_map_2026-09.json`, `docs/medical/index_coverage.md`
- `docs/medical/STATE.md`
- `scripts/validate_blog_content.py --site Medical`
- `scripts/medical_flat_link_audit.py`, `Property` `track2_link_audit.py --site Property`
- `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 gate, run against Medical
- `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md`
- `packages/web-shared/design/marketing/StatsCounter.tsx`,
  `packages/web-shared/design/chrome/SiteHeader.tsx`, `packages/web-shared/lib/security-headers.ts`
- `git tag -l 'port-medical-*'`, `git log --oneline --all -- Medical/`,
  `git log --since=2026-09-26 --grep=canonical --stat`
- `curl -sI https://www.medicalaccounts.co.uk/` and `/robots.txt`, `/llms.txt`, `/llms-full.txt`,
  `/sitemap.xml`
- `puppeteer-core` real mobile emulation against Medical home, `/for-gps`, `/calculators`, and
  `https://www.gov.uk` (control)
- `Medical/web/src` test files (20 `.test.ts`/`.test.tsx`), `.github/workflows/*.yml`

---

# WAVE 2 READER (2026-09-28)

Rendered with `puppeteer-core` (repo root) against Chromium
`ms-playwright/chromium-1223/chrome-win64/chrome.exe`, `page.emulate` with
`isMobile: true`, `hasTouch: true`, 390x844, `deviceScaleFactor: 3`.

**Control: https://www.gov.uk rendered with the same code returns
`document.documentElement.scrollWidth` = 390 at 390 and 1280 at 1280, with zero
overflowing elements.** Every 390 number below is measured against that control.

Pages rendered: `/`, `/about`, `/services`, `/for-gps`, `/for-consultants`,
`/blog/private-practice-tax-nhs-and-private-income`,
`/calculators/locum-tax-calculator`, `/contact`, `/book`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA "Book a call" `getBoundingClientRect` 172x40 visible at 1280; at 390 `display: none`, 0x0 | rendered DOM, all 9 pages |
| D5 | `Plus Jakarta Sans`, `Plus Jakarta Sans Fallback` applied to `body`; loaded via `next/font/google` | `getComputedStyle(document.body).fontFamily`; gate row 3 |
| D6 | No live date-as-zero bug. Homepage stat tiles render literals "Medical only", "10", "4" | curl home, `text-3xl font-bold text-[var(--copper-deep)]` tiles |
| D7 | `scrollWidth` = 390 on every page rendered. The only elements past the viewport are the offscreen spam honeypot inputs at `left: -9999px` | rendered DOM; control 390 |
| D8 | Gate 9.1: row1 layout-utils=1, row2 kit=**14 distinct / 69 call sites**, row2a declined=0, row2b adopted=5, row3 webfont=`next/font/google`, row4 backdrop=1, row5 Eyebrow=11 / section-label=0, row6 rings=0 lines, row7 gradients=4 files, row8 walks=4 **guards-the-guard=0**. Markers ping=0 stats=2 backdrop=3 rounded-full=1. **Only row 8 fails** | block from `DESIGN_PORT_PLAYBOOK.md` 9.1 run verbatim |
| G3 | Segment pages DO carry schema: `/for-gps` serves 7 `"@type":"Service"`, 1 `FAQPage`, 1 `BreadcrumbList`, 1 `AccountingService` | curl `https://www.medicalaccounts.co.uk/for-gps` |
| G7 | `lastmod` is frozen: every entry in the sitemap reads `2026-06-03T00:00:00.000Z` | curl sitemap.xml |
| G8 | Canonical is self-referencing and correct: `/for-gps` points at `https://www.medicalaccounts.co.uk/for-gps` | curl |
| G9 | PASS. `/embed/locum-tax-calculator` serves `robots: noindex`, HTTP 200, and no `/embed` URL is in the sitemap | curl |
| L1 | Foot lead form mounts on `/`, `/about`, `/services`, `/for-gps`, `/for-consultants`, blog post, calculator, `/contact` (1 form, 11 inputs, each page). NOT on `/book` (0 forms) | rendered `document.querySelectorAll('form')` |
| L3 | **FAIL. Zero `calc_result` form in the served HTML of `/calculators/locum-tax-calculator`.** The page serves exactly one form, the foot panel. The result capture is not in the page at all | curl grep for `id="calc_result*"` returns nothing; rendered forms = 1 |
| L4 | 10 calculator URLs in the sitemap | `grep -c '/calculators/'` on the sitemap |
| L8 | `/book` renders **zero** forms at 1280 and 390, but the copy is honest about it: "This page needs the personal link from your email or text message." | rendered DOM |
| Widgets | **SpecialistWidget IS in the live DOM** on all 9 pages: `div.fixed.bottom-24.right-4.z-[55]`, copy "The quickest way to get a straight answer is one of our spec...". **StickyCTA is NOT in the live DOM** on any page | rendered DOM plus curl on home |

## Reader findings

Medical reads and renders better than any other site in this reader set. Writing
is clean: zero em-dashes, zero US spellings, one AI tell across nine pages, and
every page answers in its first paragraph.

The two real defects are mechanical: the calculator result has no form under it,
and no form input shows a focus ring.

Everything else is a nit. There is no mobile layout problem on this site at all.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | `/calculators/locum-tax-calculator` | No lead form under the calculator result. Property removed its gate on 09-27 and puts one form there | rendered forms = 1 (foot panel only); no `calc_result` id in served HTML | S |
| FIX | all 9 pages | No visible focus ring on the first form input. After `.focus()`, `outlineStyle: "none"` and `boxShadow: "rgba(0,0,0,0) 0px 0px 0px 0px"` | rendered `getComputedStyle` | S |
| FIX | sitemap | Every `lastmod` is `2026-06-03T00:00:00.000Z`, roughly four months stale on a site that has shipped content since | curl sitemap.xml | XS |
| FIX | `/for-nhs-doctors`, `/for-medical-companies` | Prospect-facing "A specialist reviews ..." survives, twice per page, against the 09-28 ruling | curl: "A specialist reviews the pension input amount on your statement, tests whether tapering bites..." | XS |
| FIX | `/llms.txt` line 52 | "Who operates the site, the referral model, and what happens after an enquiry." Machine-facing, and it calls the model a referral | curl /llms.txt | XS |
| NIT | `/services` | One AI tell, "in today's", once | rendered body text | XS |
| NIT | blog post | Longest paragraph 152 words; the two `enquiry_ref` honeypot inputs carry no label | rendered | XS |
| NIT | home at 390 | Card title "NHS Pension Annual Allowance Calculator" is ink `rgb(0,27,61)` on copper `rgb(160,98,43)` = 3.49:1. Passes AA as large text, fails as normal text | computed, opaque background | XS |
| NIT | site-wide | Property mounts `StickyCTA` on its homepage; Medical mounts none anywhere | rendered DOM | S |

### Design numbers

| Page | sw@1280 | sw@390 | hdr CTA @1280 | hdr CTA @390 | body contrast | header CTA contrast | forms | unlabelled inputs |
|---|---|---|---|---|---|---|---|---|
| `/` | 1280 | 390 | 172x40 visible | display:none, 0x0 | 17.83 | 4.91 | 1 | 0 |
| `/about` | 1280 | 390 | visible | none | 9.92 | 4.91 | 1 | 0 |
| `/services` | 1280 | 390 | visible | none | 17.15 | 4.91 | 1 | 0 |
| `/for-gps` | 1280 | 390 | visible | none | 17.15 | 4.91 | 1 | 0 |
| `/for-consultants` | 1280 | 390 | visible | none | 17.15 | 4.91 | 1 | 0 |
| blog post | 1280 | 390 | visible | none | 7.25 | 4.91 | 3 | 2 |
| calculator | 1280 | 390 | visible | none | 17.15 | 4.91 | 1 | 0 |
| `/contact` | 1280 | 390 | visible | none | 9.92 | 4.91 | 1 | 0 |
| `/book` | 1280 | 390 | visible | none | 7.58 | 4.91 | 0 | 0 |

Zero images without `alt` and zero broken images on all nine pages. Zero
em-dashes, zero en-dashes, zero US spellings, zero placeholder phone numbers or
emails. The blog body is `.article-body.prose-blog`, not `.prose`, so a
`.prose p` probe finds nothing; the prose rules arrive through `prose-blog`.

### Sameness

| Comparison | Result |
|---|---|
| Segment-page closers within Medical | DIFFERENT. `/for-gps` closes on GP-specific cards, `/for-consultants` on consultant cards |
| Service page vs home | `/services` and `/` share one three-card close: "Free tools for doctors who want instant estimates before speaking to anyone." / "For GPs, locums, and consultants who want specialist advice on a specific area." / "End-to-end medical accounting for practice owners and consultants with complex structures." |
| Against Property's shared close | NOT shared. Property's `/for/` pages and `/services` all end on the same three lines, quoted from `/for/selling-a-buy-to-let` and `/for/non-resident-landlords`: "A couple of sentences helps us prepare properly for your call." / "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose." / "We respond within 24 hours and store your details securely." Medical carries line 2 only, inside the form, which is the exempt consent sentence |
| Answer in the first paragraph | YES on all 9 pages |
| h1 and title agree with the page promise | YES on all 9 pages |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| I7: STATE.md closes with "production still serves the pre-port design and the pre-audit copy" | Confirmed stale. Live pages serve `Plus Jakarta Sans`, `--copper-deep` tokens, `Eyebrow` and 14 distinct kit components | rendered DOM, gate row 2 |
| D8 "not run, would almost certainly fail" | Run. Medical PASSES 9 of the 10 rows. Only row 8 fails, `guards-the-guard=0` while `walks=4` | gate block above |
| L3 "hidden behind a modal gate" | True but understated: no `calc_result` form is served at all, so the form is not merely behind a gate, it is absent from the page | curl plus rendered DOM |
| P4 "no 24-hour promise found" | The homepage serves zero "within 24 hours" / "one working day" strings. Medical is the only site in this set with none | curl home, grep count = 0 |
