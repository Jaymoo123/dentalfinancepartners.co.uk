# Contractor Tax Accountants (contractors-ir35) parity research (2026-09-28)

Domain `www.contractortaxaccountants.co.uk`. Vercel project `contractor-finance-partners`
(`prj_AJhtTBB8SMdKluzfCNvwCCqU1yii`). Launched yes. Live: `curl -sI https://www.contractortaxaccountants.co.uk/`
returns `200`; `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` all `200` (checked
2026-09-28).

## Verdict in three lines

Source is the estate's most complete build (design port all 6 phases + uplift tagged, 9 calculators
with FAQPage each, full intent/lead kit, AccountingService schema with `sameAs`/`parentOrganization`/
`knowsAbout`, 67 posts, 0 validator errors) but production lags HEAD by three commits and the live
site still speaks in the pre-ruling "specialist partner network" voice with "a specialist reviews"
caveats scattered through `contractor-types.ts`, the privacy policy and SMS copy. The three biggest
gaps: (1) the 09-28 positioning-ruling fixes (`d4a68b95`, `63087d14`, `815ae7de`) are committed but
**not deployed** (production is on `a796de63`); (2) the calculator result gate (`ResultGateModal`)
still shows an interstitial in blog placement, unlike Property's gate-removed standard; (3) the blog
category CTA is dead code (`categorySlug` received, never used), so blog posts show generic free-call
copy the ruling has already moved past elsewhere.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | firm-first entity sentence | Present, firm-first, names Ashfield Trading Ltd 16358723 | NONE | `contractors-ir35/niche.config.json:3` |
| P2 | no caveat phrases on prospect surfaces | "specialist partner network" in `privacy-policy/page.tsx:153,187,251` (exempt, consent/privacy) and `config/site.ts:12,17,55` (consent text, exempt); "a specialist reviews" in `data/contractor-types.ts` 14 places (sector FAQ/body copy, prospect-facing, NOT exempt); SMS copy `config/lead-nurture.ts:336` "a specialist will call you" | S | Ruling-fix commits (`d4a68b95`,`63087d14`,`815ae7de`) touched home/about/contact/services/for pages and the Organization node but not `data/contractor-types.ts`, so the sector-page body copy still reads as referral, not firm |
| P3 | "free first call, then fixed fee" | 91 hits of "free first call/call/review/consultation" across `web/src` + config | NONE | `grep -rniE "free first call\|free call\|free review\|free consultation"` = 91; matches the 09-28 ruling wording per `815ae7de` commit body |
| P4 | promise removed / backed by nurture | 6 hits of "24 hours"/"within 24 hours" remain | XS | `grep -rniE "within 24 hours\|same working day\|24 hours"` = 6, none in nurture emails (checked `lead-nurture.ts`) |
| P5 | AccountingService, firm-first, sameAs, parentOrganization | Same: `lib/schema.ts:70` `organizationType: "AccountingService"`, `:82` `knowsAbout`, `:87` `sameAs`, `:94` `parentOrganization` | NONE | `contractors-ir35/web/src/lib/schema.ts:70-94`; STATE.md 09-28 entry said the S5-built node was "plain Organization" at build time but HEAD now shows AccountingService (commit `d4a68b95`, not yet deployed, see I2) |
| P6 | firm-first llms.txt | Firm-first opening, names entity, no caveat in first section | NONE | `contractors-ir35/web/public/llms.txt:1-9` |
| L1 | foot lead form on home/about/services/segment/service/blog/calculators/contact | `LeadForm.tsx` present; used via shared `LeadCTAPanel` on the page types listed in the config import (`for/[slug]/page.tsx`, `page.tsx`, `services/page.tsx`, `about/page.tsx`, `contact/page.tsx`) | NONE | `grep -rl "web-shared/design" web/src` = 31 files; did not individually verify every route mounts it, see Questions |
| L2 | inline_mini, mobile_tool, calc_result_form, calc_result, resource_block, calc_page_footer, blog_short_resource | `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`, `MobileToolSlot.tsx`, `MiniCapture.tsx`, `ResourceGate.tsx` all present | NONE | file list above |
| L3 | one form under result, no gate, no popup, no PDF offer (gate removed 09-27) | `ResultGateModal.tsx` still exists and is wired into `PremiumCalculator.tsx`; gated when `placement === "blog" && !isConverted()`, shows once per session | S | `components/calculators/premium/PremiumCalculator.tsx:27,42-43,499-502,538`; Property's gate was removed 09-27 per brief section 1, this site's was not |
| L4 | 6 calculators | 9 generic tools + 4 premium configs, each has an FAQ export | NONE (exceeds Property) | `ls web/src/lib/calculators/tools` = 9 files; `grep -c faq` = 1 per file, all 10 (9 generic incl. `ir35-status-indicator` + premium wrap counted once) |
| L5 | chat widget present | `SpecialistWidget.tsx` present, mentions Aswatax | ? | Did not trace mount points/auto-open behaviour; see Questions |
| L6 | intent engine: provider, returning bar, deep-scroll modal | `IntentProvider.tsx`, `ReturningBar.tsx`, `DeepScrollModal.tsx`, plus a `NextStepOffer.tsx` Property does not have | NONE (unique addition, see below) | `web/src/components/intent/` listing |
| L7 | sticky CTA + hero CTA from niche.config `cta` | `StickyCTA.tsx` present; `niche.config.json` `cta.sticky_primary/secondary/button` present | NONE | `web/src/components/ui/StickyCTA.tsx`; `niche.config.json:105-109` |
| L8 | thank-you, complete, /book tokened, Aswatax message | All three routes exist (`app/thank-you`, `app/complete`, `app/book`); Aswatax referenced in `thank-you/page.tsx`, `LeadForm.tsx`, `SpecialistWidget.tsx` | NONE | file listing + grep above |
| L9 | delayHours = gaps, firm/caveated voice, SMS ack | `lead-nurture.ts` gaps `0,0,4,20,24,48,72,96` on the contactability sequence, matching Property exactly; header comment wrongly calls them "cumulative" (stale comment, values are correct); voice mostly firm ("we", "our team") but SMS at line 336 says "a specialist will call you" | XS | `grep -n delayHours config/lead-nurture.ts` lines 292-418; comment at lines 14-15 is misleading but not load-bearing |
| L10 | category-driven blog CTA, no dead code | `BlogPostRenderer.tsx` receives `categorySlug` but does not use it for CTA selection; `ctaCopyForCategory` imported only by the hub route, not the post renderer | S | STATE.md 09-28 entry names this exact defect: "blog category CTAs are dead code... the renderer already receives categorySlug... and never uses it" |
| L11 | shared consent text | Identical verbatim to Property's | NONE | `config/site.ts:17` here vs `Property/web/src/config/site.ts:39`, same string |
| L12 | source identifier accepted by DB CHECK | `source: "contractors-ir35"` sent by `api/leads/submit/route.ts:28,67`; memory's known CHECK list is dentists/property/medical/solicitors/general/agency, which does NOT include "contractors-ir35" | ? | Could not read the live Supabase CHECK constraint from the repo; flagging as a question, not asserting failure |
| G1 | AI-crawler allowlist | 50+ named bots incl. GPTBot, ClaudeBot family, PerplexityBot, etc.; disallow `/thank-you`, `/admin`, `/api/`; host line set | NONE | `web/src/app/robots.ts:14-91`; live `curl -s .../robots.txt` confirms `Disallow: /thank-you`, `/admin`, `/api/` |
| G2 | shared builder, sameAs, parentOrganization, knowsAbout | Present, see P5; builder is `lib/schema.ts`, not the shared `packages/web-shared/schema/organization.ts` | XS | site has its own `lib/schema.ts` rather than importing the shared builder; did not diff field-for-field against the shared builder's output |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | `lib/schema.ts` exports `Service`, `FAQPage`, `BreadcrumbList` builders (lines 44,166,205); breadcrumb schema added to `for`/`services` per STATE.md commit `8a520b16` | NONE | `lib/schema.ts:44,166,205`; STATE.md 09-27 entry |
| G4 | BlogPosting, author Organization/Person, real dateModified | Author is "Contractor Tax Accountants Editorial Team" (Organization-style byline) on all posts checked; only 8 of 67 posts carry `dateModified`, 0 carry `reviewedAt` | M | `grep -l dateModified web/content/blog/*.md` = 8; `grep -l reviewedAt` = 0 |
| G5 | firm-first, UTM-tagged, lists audiences/services/calculators | `public/llms.txt` firm-first opening confirmed; did not verify UTM tags on every link | XS | `public/llms.txt:1-9` read; full link audit not done, see Questions |
| G6 | buildLlmsFullRoute, post count, size | `web/src/app/llms-full.txt` exists as a route; did not confirm it uses the shared `buildLlmsFullRoute` helper or check size against the 19.07 MB ISR ceiling | ? | file exists (`ls app`); live `curl -sI .../llms-full.txt` = 200; size not checked |
| G7 | lastModified real/omitted, hreflang, new routes included | `web/src/app/sitemap.ts` exists; live 200 | ? | did not open the file to check `lastModified` semantics; see Questions |
| G8 | canonical-hub fix present | `git log --since=2026-09-26 --grep=canonical --stat -- contractors-ir35` shows one hit (`44490175`), but it fixes an unrelated audience-template lowercasing bug, not the estate canonical-hub defect described in the brief | ? | commit message: "audience template no longer lowercases the title into headings"; the estate-wide canonical-hub fix pattern was not found under this path, cannot confirm this site ever carried or fixed that specific defect |
| G9 | noindex correct, /embed rule | `/embed/[slug]` route exists; did not check for stray noindex tags | ? | not checked, see Questions |
| G10 | gsc_config.py entry, IndexNow key, Bing verified | `agents/config/gsc_config.py:177-183` has a `contractors-ir35` entry; no IndexNow key file found under `web/public`; no `submit_indexnow.py` found scoped to this site (only Property has its own copy per brief); Bing verification unknown | M | `grep -n contractors-ir35 agents/config/gsc_config.py` hit; `find contractors-ir35 -iname "*indexnow*"` = no results |
| G11 | 09-27 AI-assistant naming baseline coverage | Not checked against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 in this pass | ? | not read in this session, see Questions |
| C1 | posts total, recent, newest | 67 posts total; 17 with mtime after 2026-07-30; newest `winding-up-taar-contractor-same-trade.md` (Sep 27) | NONE | `find web/content/blog -maxdepth 1 -type f` = 67; `-newermt 2026-07-30` = 17 |
| C2 | house_positions.md exists | Exists, last touched 2026-09-27, 21 `##` sections | NONE | `git log -1 --format=%ad -- docs/contractors-ir35/house_positions.md` = 2026-09-27; `grep -c "^##"` = 21 |
| C3 | COVERAGE_MAP_2026-09.md exists | Exists, last touched 2026-09-27 | NONE | `docs/contractors-ir35/COVERAGE_MAP_2026-09.md` present |
| C4 | Service+FAQPage+breadcrumb+form+stat tiles on segment pages | `/for/[slug]` dynamic route from `data/contractor-types.ts`; STATE.md confirms breadcrumb schema and per-count stat/card grids added 09-27/28 | NONE | STATE.md 09-28 "Render" entry: "audience stat and card grids follow their item count, no orphan tile" |
| C5 | /services/* and money pages | `app/services/page.tsx` present; did not enumerate a `/services/*` subtree (this site appears to use a single services page plus calculators/ir35-status rather than per-service routes) | ? | `ls app` shows `services` as one route, not a directory of subpages; flagging as a structural difference, not graded as a defect without checking Property's own `/services` shape |
| C6 | validator pass/fail | `python scripts/validate_blog_content.py --site contractors-ir35` = 0 errors, 82 warnings (all "legacy, unchanged": missing canonical URL, meta length) | S | full run output captured 2026-09-28, tail shown: "PASS: 67 posts validated, 0 errors... TOTAL: 0 errors, 82 warnings" |
| C7 | dateModified/reviewedAt presence | 8/67 posts carry `dateModified`, 0 carry `reviewedAt` | M | grep counts above |
| C8 | byline model | "Contractor Tax Accountants Editorial Team", Organization-style, no named person | NONE | `grep -h "^author:" web/content/blog/*.md \| sort -u` = one value |
| C9 | link health audit | No site-specific link audit tool found under `contractors-ir35/`; did not run an estate-wide one | ? | `find contractors-ir35 -iname "*link*audit*"` style search returned nothing; see Questions |
| D1 | port tags + web-shared/design import count | Tags `port-contractors-ir35-phase1` through `phase6` and `-uplift` all present; 31 files import `web-shared/design` | NONE | `git tag -l 'port-contractors-ir35-*'`; `grep -rl "web-shared/design" web/src \| wc -l` = 31 |
| D2 | prose-standard.css imported | Yes | NONE | `web/src/app/globals.css:13` `@import "../../../../packages/site-styles/prose-standard.css"` |
| D3 | header CTA hides below 1024 | Not rendered-DOM checked this pass; STATE.md 09-16 deploy note lists "header CTA fix" as part of that deploy | ? | STATE.md line 11: "DEPLOYED to production 2026-09-16 from 90fbea9c (port + uplift + header CTA fix + favicon)"; not independently re-verified |
| D4 | favicon, og:image not SVG, metadataBase | `app/icon.svg` exists (favicon), but `openGraph.images` uses `siteConfig.publisherLogoUrl` = `/brand/icon-alt.png` (PNG), not SVG | NONE | `niche.config.json` `brand.publisher_logo_url`; `layout.tsx:46-53` uses that PNG for OG/Twitter images, only the favicon itself is SVG (normal, not the defect the brief flags) |
| D5 | fonts | Not independently checked this pass | ? | see Questions |
| D6 | stat tiles literal-value support | STATE.md 09-28 entry: "the four-stat band stacks to one column at 390 because `sm:grid-cols-2` starts at 640. Property uses `grid-cols-2`", a real, currently-open layout gap, still valid per that entry, not a screenshot artefact | S | STATE.md text quoted verbatim above |
| D7 | 390px scrollWidth, real emulation | Not re-run this pass (no puppeteer session); STATE.md 09-28 entry says a true-emulation re-test returned `scrollWidth` exactly 390 with zero overflow, superseding an earlier false-positive clipping report, and explicitly warns off Edge `--window-size` results | ? | STATE.md text: "Re-tested with true emulation, this site returns document scrollWidth exactly 390 and zero overflowing elements", taking this as the most recent verified reading rather than re-running, per rule 7's own warning about fake clipping |
| D8 | playbook 9.1 kit-adoption gate | Not re-run this pass | ? | see Questions |
| I1 | live status | All checked routes 200 (`/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`) | NONE | curl output above |
| I2 | Vercel project, deploy vs HEAD | Project `contractor-finance-partners`; STATE.md says production deployed from `a796de63`; HEAD is 3 commits ahead on files touching this site (`d4a68b95`, `63087d14`, `815ae7de`) | M | `git log --oneline a796de63..HEAD -- contractors-ir35/` = 3 commits; these are exactly the 09-28-evening positioning-ruling commits, so the fixes described under P2/P5 above exist in the repo but are **not yet live** |
| I3 | tests | 19 test files under `web/src` | NONE | `find web/src -iname "*.test.ts*" \| wc -l` = 19 |
| I4 | GA4 CSP, consent banner | Live CSP header `connect-src` includes `*.google-analytics.com` (covers `region1.google-analytics.com`); did not confirm a separate consent-banner component | XS | `curl -sI` live response, `Content-Security-Policy` header captured 2026-09-28 |
| I5 | env/flags read | Only `process.env.NEXT_PUBLIC_SITE_URL` found via the grep pattern the brief specifies; no `getFlag`/`site_flags` usage found in this codebase | ? | grep run, see command; may mean flags are read a different way this pass did not catch |
| I6 | monitored_pages rows | STATE.md: "8 rows registered 2026-07-08 and 4 are armed to 2026-10-06" | NONE (per STATE.md, not independently re-queried) | docs/contractors-ir35/STATE.md, "What was wrong" table and point 4 |
| I7 | STATE.md exists, newest entry, contradictions | Exists, newest entry 2026-09-28 (Leads-250 S5 close, NOT deployed); does not contradict the tags (design port fully tagged, matches D1) or the code (its own dead-code and gate findings match what this pass independently found via grep) | NONE | docs/contractors-ir35/STATE.md, entries dated 2026-09-28 |

## Unique to this site

- `NextStepOffer.tsx` in the intent kit, Property's section-1 inventory does not list this
  component; contractors-ir35 has it in `web/src/components/intent/`.
- 9 generic calculators plus 4 premium configs, more than Property's 6.
- STATE.md itself is unusually detailed and self-critical (it names its own defects with file:line
  evidence), which made much of this pass verifiable against a second source.

## Shares Property's open defects

- The 24-hour promise still appears (6 places), same class of defect as Property's ~115, just far
  smaller in scale.
- `ResultGateModal` interstitial in blog calculator placement is the opposite direction from
  Property (Property removed its gate 09-27; this site still has one).

## Questions (missing data, not findings)

- L1: did not confirm every page type (calculators, contact) individually mounts the foot lead
  form versus only home/about/services/segment/blog.
- L5: chat widget auto-open behaviour not traced.
- L12: whether the live Supabase leads table CHECK constraint accepts `source = 'contractors-ir35'`
 , could not read the constraint from the repo.
- G5/G6/G7/G9/G11: llms.txt UTM-tag completeness, llms-full.txt builder/size, sitemap.ts
  `lastModified` semantics, noindex/`/embed` rule, and 09-27 AI-naming-baseline coverage were not
  opened this pass.
- C5: whether the single `/services` page (versus a `/services/*` subtree) is itself a gap against
  Property's shape was not resolved, Property's own `/services` shape was not read in this pass.
- C9: no link-health audit tool found under this site; unclear if one exists estate-wide that
  covers it.
- D3, D5, D8: header-CTA breakpoint, font loading, and the playbook 9.1 kit-adoption gate numbers
  were not independently re-run this pass; taken from STATE.md/git history where cited.

## Commands and files read

- `contractors-ir35/niche.config.json`, `web/src/config/site.ts`, `web/src/config/lead-nurture.ts`,
  `web/src/lib/schema.ts`, `web/src/app/robots.ts`, `web/src/app/layout.tsx`,
  `web/src/data/contractor-types.ts` (grep only), `docs/contractors-ir35/STATE.md`
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" contractors-ir35/web/src contractors-ir35/niche.config.json contractors-ir35/web/public`
- `grep -rniE "free (first call|consultation|review)"` and `"within 24 hours|same working day"` counts
- `find contractors-ir35/web/src/lib/calculators/tools`, `find .../premium`
- `git tag -l 'port-contractors-ir35-*'`; `grep -rl "web-shared/design" web/src | wc -l`
- `python scripts/validate_blog_content.py --site contractors-ir35`
- `git log --since=2026-09-26 --grep=canonical --stat -- contractors-ir35`
- `git log --oneline a796de63..HEAD -- contractors-ir35/`
- `curl -sI https://www.contractortaxaccountants.co.uk/`, `/robots.txt`, `/llms.txt`,
  `/llms-full.txt`, `/sitemap.xml` (GET only, 2026-09-28)
- `grep -n contractors-ir35 agents/config/gsc_config.py`
- `find contractors-ir35/web/content/blog -maxdepth 1 -type f -newermt 2026-07-30`

---

# Wave 2 reader pass (2026-09-28, rendered pages)

Control first: `https://www.gov.uk` rendered with the same `puppeteer-core` `page.emulate`
(390x844, `deviceScaleFactor: 3`, `isMobile: true`, `hasTouch: true`) returned
`document.documentElement.scrollWidth = 390`, `clientWidth = 390`, zero overflowing elements.
Every 390 number below comes from that same code path. Nine pages rendered at 1280 and at 390:
home, /about, /services, /for/it-contractors, /for/engineering-contractors, the blog post
/blog/ir35-status/what-is-ir35, /calculators/outside-ir35-take-home-calculator, /contact, /book.
The sitemap carries no `/services/<slug>` pages at all, only the `/services` hub, so no service
page could be rendered. Property has four.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | Header CTA "Book a free first call" pointing at `/contact`, 187x40 px and `display: flex` at 1280; absent from the rendered header at 390, where only the logo and a 48 px menu button remain. Correct behaviour, confirmed in the DOM rather than from the class list. | `getBoundingClientRect` over every `header a,button` at both widths |
| D5 | `GeistSans`, with `GeistSans Fallback`, applied to `body`. Property uses Plus Jakarta Sans, so the two sites do not share a typeface. | `getComputedStyle(document.body).fontFamily` |
| D6 | Not settled. The stat band was not isolated in this pass, so wave 1's `sm:grid-cols-2` finding from STATE.md is neither confirmed nor refuted here. | |
| D7 | `scrollWidth = 390` on all nine pages, zero real overflow. Every element past the right edge is an offscreen honeypot or sr-only block at -9999px. This confirms the STATE.md 09-28 true-emulation re-test independently. | per-page `scrollWidth`, plus a parent `overflowX` walk on every offending element |
| D8 | Not run (a source-side gate, not a rendered-page check). | |
| G7 G8 G9 | Not settleable from the rendered page; unchanged from the inventory. | |
| L3 | On the calculator page at `page` placement no gate and no modal appeared. Three forms render: two `Continue` mini captures and the full `Request a callback` form carrying `sourceUrl` as a hidden field. Wave 1's reading is right that the gate is scoped to blog placement. | `querySelectorAll('form')` field and hidden-input dump on /calculators/outside-ir35-take-home-calculator |
| L8 | **`/book` renders zero `<form>` elements.** It does render the booking prose, "Pick a day and a time window that suits you. An accountant will call you then, no obligation.", immediately followed by "This page needs the personal link from your email or text message." The footer link `<a href="/book">` on every page is untokened, so a prospect who clicks it reaches that dead state. | rendered DOM of `https://www.contractortaxaccountants.co.uk/book`; `footer a[href="/book"]` on all nine pages |
| L4 | Not settled per calculator by one read. | |

## Reader findings

The writing is clean: zero em-dashes in visible body text on all nine pages, zero US spellings,
none of the eight AI-tell phrases, and every title agrees with its h1. Three things are real. The
site still speaks the pre-ruling voice in body copy, with "A specialist reviews your contract and
actual working practices" on the homepage and "A specialist will be in touch." as the closing
line of the lead panel on home and both segment pages. There is no sticky CTA at 390, so the only
persistent mobile prompt is the chat widget. And no form field shows a visible focus ring. CTA
contrast is fine here, 5.36:1, better than Property's.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | /book | zero `<form>` elements while the page promises a day and time | `querySelectorAll('form').length === 0`; "Pick a day and a time window that suits you." | S |
| BLOCKER | all 9 | footer "Book a consultation" points at an untokened `/book` | `footer a[href="/book"]` on every page | XS |
| BLOCKER | all 9 | no visible focus indicator on the first form field | focused `fullName` on /contact: `outlineStyle: "none"`, `boxShadow: "none"`, border colour unchanged, `:focus-visible` true | S |
| FIX | home, /for/engineering-contractors | rule 8 caveat in prospect-facing body copy | "A specialist reviews your contract and actual working practices, not just the paperwork." and "A specialist reviews your contract and working practices against the three key tests: control, substitution and mutuality of obligation." (home); "A specialist reviews your contract against the three key tests, with specific knowledge of how engineering roles typically work in practice." (for2) | S |
| FIX | home, both /for/ pages | rule 8 caveat as the closing line, identical on three pages | "A specialist will be in touch. Your details are stored securely." | XS |
| FIX | all 9 at 390 | no sticky CTA in the DOM at 390; Property has one | fixed and sticky elements at 390 on home: the sticky header and one chat widget only | S |
| FIX | site | no `/services/<slug>` pages exist, only the hub, so there is no service-page layer to grade against Property's four | sitemap.xml has zero `/services/` child URLs | L |
| NIT | blog post | longest paragraph 169 words, the highest of the four sites read | measured on the rendered post, 62 paragraphs | S |
| NIT | /for/it-contractors | first paragraph restates the situation for 121 words before answering | "You write software, run data platforms or manage cloud infrastructure, and you invoice a day rate through your own limited company." | M |

Design numbers, 1280 and 390:

| Page | sw@390 | real overflow | header CTA 1280 / 390 | forms | sticky CTA at 390 | chat at 390 |
|---|---|---|---|---|---|---|
| home | 390 | 0 | visible / hidden | 1 | no | yes, "The quickest way to get a straight answe...", 178 px |
| /about | 390 | 0 | visible / hidden | 1 | no | yes |
| /services | 390 | 0 | visible / hidden | 1 | no | yes |
| /for/ pages (2) | 390 | 0 | visible / hidden | 1 | no | yes |
| blog post | 390 | 0 | visible / hidden | 3 | no | yes |
| calculator | 390 | 0 | visible / hidden | 3 | no | yes |
| /contact | 390 | 0 | visible / hidden | 1 | no | yes |
| /book | 390 | 0 | visible / hidden | 0 | no | yes |
| gov.uk control | 390 | 0 | n/a | n/a | n/a | n/a |

Body text contrast 18.93:1, the best of the four sites (gov.uk control 21:1). Primary CTA white on
`rgb(14, 116, 144)` measures 5.36:1, a clear AA pass and better than Property's 3.65:1. Every
visible form field carries a label; the only unlabelled fields are the offscreen honeypots. No
`<img>` is missing an `alt`. One `<main>`, one `<h1>` per page. Footer entity line matches
Property's shape: "Contractor Tax Accountants is a trading name of Ashfield Trading Ltd...", then
the copyright line.

Sameness:

| Comparison | Result |
|---|---|
| lead-panel closing line, within site | identical on home, /for/it-contractors, /for/engineering-contractors: "A specialist will be in touch. Your details are stored securely." |
| that closing line against Property's | different wording, same function; Property says "We respond within 24 hours and store your details securely..." |
| consent sentence against Property's | verbatim identical, including "a firm from our specialist partner network" |
| /for/ opening paragraphs, within site | distinct per audience, genuinely written |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| D7 "?" carried over from STATE.md | Now measured directly, not inherited: 390 on all nine pages, zero real overflow, against a valid gov.uk control. | above |
| D3 "?" | Settled from the rendered DOM: visible at 1280, gone at 390. | above |
| L8 "NONE ... all three routes exist" | Route existence is not the test. `/book` renders zero forms and tells the visitor it needs a personal link, so the lead path dead-ends exactly as it does on Property. The gap is not NONE. | rendered DOM |
| P2, caveats "scattered through `contractor-types.ts`, the privacy policy and SMS copy" | Understated. The caveat also renders on the **homepage** twice and as the lead-panel closing line on three pages, which is the most prospect-facing position on the site. | quoted above |
| L7 sticky CTA | No sticky CTA is present in the DOM at 390 on any page rendered. | fixed and sticky element dump at 390 |

### Addendum: the /book template across the four wave 2 sites

The same `/book` template renders on Property, care, charities and contractors-ir35, with only the
specialist label swapped, and none of the four renders a `<form>`. contractors-ir35 has the best
copy of the four under rule 8: "An accountant will call you then, no obligation." Property says "A
property tax specialist will call you then", care says "A care sector accounts specialist", and
charities says "A charity finance specialist". Fixing the dead booking route is therefore one
shared template change, not four, and contractors-ir35's wording is the one to keep.
