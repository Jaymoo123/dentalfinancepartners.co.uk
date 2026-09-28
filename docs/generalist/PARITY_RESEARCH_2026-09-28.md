# Generalist (Holloway Davies) parity research (2026-09-28)

Domain `www.hollowaydavies.co.uk`, Vercel project `holloway-davies`. Launched yes, live
(home/robots/llms.txt/llms-full.txt/sitemap.xml all 200, checked live 2026-09-28).

## Verdict in three lines

Generalist has the full lead-kit machinery (forms, gate, intent engine, nurture, calculators,
design port through phase 6) but its whole prospect-facing voice is built as a **lead-gen
referral model** ("specialist partner network", editorial-not-advice framing), which the
2026-09-28 evening ruling now makes a positioning defect on every page that isn't consent,
privacy or terms. Second, the calculator result is still held behind a frosted-glass gate +
modal on every calculator; Property removed that gate estate-wide on 09-27 and generalist's own
code comment says it was "ported from Property" before that change, so it is now stale by one
owner decision, not a parity gap the site invented. Third, there is no segment-page layer at all
(no `/for/[slug]`, no audiences data file, no Service+FAQPage+Breadcrumb template) and no
`niche.config.json` `entity` key, so the machine-readable "who is this firm" story is thinner
than Property's on both the page layer and the schema layer.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | `entity.firm` present, firm-first paragraph | **missing entirely** | M | `node -e "console.log(require('./generalist/niche.config.json').entity)"` -> `undefined`; keys present are `niche_id, display_name, legal_name, company, partner, domain, tagline, description, brand, contact, navigation, footer_links, locations, content_strategy, seo, lead_form, cta, blog, shared_components_version, last_sync` (no `entity`) |
| P2 | none outside consent/privacy/terms (ruling 8) | "partner network" / "specialist reviews" caveats on **prospect-facing body copy**, not just consent | L | `generalist/web/src/app/complete/page.tsx:108,133,153,162` ("specialist firm from our partner network", "up to three/six in the profession"); `generalist/web/src/app/contact/page.tsx:139` ("regulated firms from the specialist partner network, up to six"); `docs/generalist/STATE.md` top: "advice comes from a qualified accountant on the partner team" (positioning statement, not just copy). Consent text itself (`config/site.ts:19`) matches Property's consent wording verbatim and is NOT a defect per rule 8 |
| P3 | "free consultation", firm-first ("We do the work") | 24 hits of "free review"/"free consultation"/"free first call" across book, complete, research pages, nurture, chat opener | NONE | count via grep; wording itself is fine, only the surrounding partner-network framing (P2) is the defect |
| P4 | count TBD by data agent; Property has ~115 unbacked promises (known defect) | 9 hits of "within 24 hours"/"same working day" in `web/src`; none checked against nurture email content | S | `grep -rniE "within 24 hours|same working day|24-hour" generalist/web/src \| wc -l` = 9; did not open every nurture email to confirm a matching promise -> "?" whether nurture backs it |
| P5 | `AccountingService`, firm-first, `sameAs` to CH, `parentOrganization` Ashfield | Same shared builder (`lib/organization-schema.ts` is a shim over `@/lib/schema.buildOrganization()`), adds `legalName`/`alternateName`/registered office and `sameAs` to Companies House | NONE | `generalist/web/src/lib/organization-schema.ts:1-35`; same shared builder as Property, not hand-rolled |
| P6 | firm-first opening, no caveat | Firm-first: "Holloway Davies is a UK accountancy practice serving limited company directors..." no partner-network caveat in the file itself | NONE | `generalist/web/public/llms.txt:1-6`, live-checked `curl https://www.hollowaydavies.co.uk/llms.txt` = 200. Note: this directly contradicts the partner-network framing on `/complete` and `/contact` (P2), the machine-facing story and the human-facing story disagree |
| L1 | mounted on home, services, every /for/[slug], blog post foot | `LeadForm`/`LeadCTAPanel` mounted on home, about, services, blog hub + category + post, calculators (index, [slug], employer-ni), contact, fundamentals, glossary (+[slug]), guides (+[slug], +download), locations (+[slug]), r-and-d-credits, research (+4 sub-pages), templates, uk-tax-rates | NONE | `grep -rl "LeadForm\|LeadCTAPanel" generalist/web/src/app generalist/web/src/components`; broader coverage than Property's list because generalist has no segment layer to separate out |
| L2 | `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` | has `inline_mini`, `mobile_tool`, `calc_result`, `resource_block`; **no `calc_result_form`, no `calc_page_footer`, no `blog_short_resource`**; instead has `calc_result_gate`/`result_gate` (Property retired this id) | M | `grep -rniE "inline_mini|mobile_tool|calc_result_form|calc_result|resource_block|calc_page_footer|blog_short_resource" generalist/web/src \| grep -o '"[a-z_]*"' \| sort -u` |
| L3 | exactly one form under the result, no gate, no popup, no PDF offer (removed 09-27) | **still gates**: `ResultGate.tsx` holds the result behind frosted glass + `ResultGateModal.tsx` popup on every calculator; diffed against Property's current file | L | `diff Property/web/src/components/calculators/ResultGate.tsx generalist/web/src/components/calculators/ResultGate.tsx`: Property's header comment now reads "never held (owner decision 2026-09-27): no popup... renders immediately... inline form beneath"; generalist's still reads "held behind the capture interstitial until the reader submits or skips. Ported from Property.", generalist is the pre-09-27 Property behaviour, not yet caught up |
| L4 | 6 route dirs + premium + /embed | 2 route dirs (`calculators/employer-ni-calculator`, `calculators/[slug]`) plus a premium calculator component tree; FAQPage/cite-this on each not individually audited | S | `find generalist/web/src/app/calculators -maxdepth 1 -type d`; fewer standalone route dirs than Property but a dynamic `[slug]` route may serve more than one calculator, did not enumerate slugs, so exact count is a "?" |
| L5 | `SpecialistWidget.tsx`, pages TBD | present: `generalist/web/src/components/support/SpecialistWidget.tsx`; which pages mount it and auto-open behaviour not traced | XS/? | file exists; mount-list not traced in this pass |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | present, plus an extra `NextStepOffer.tsx` and a fuller `lib/intent/` (`deriveTopic.ts`, `engine.ts`, `journeyModel.ts`, `labels.ts`, `taxonomy.ts`) not mirrored 1:1 in Property's file list from the brief | NONE | `ls generalist/web/src/components/intent generalist/web/src/lib/intent` |
| L7 | `StickyCTA.tsx` homepage, hero copy from `niche.config.json` `cta` | `StickyCTA` mounted in `app/page.tsx` and `components/layout/PageShell.tsx` (site-wide, not just home); `cta` key exists in `niche.config.json` | NONE/? | `grep -rl StickyCTA generalist/web/src`; broader mount than Property's homepage-only is a difference, not graded as a gap without knowing Property's actual footprint beyond the brief's one line |
| L8 | `/thank-you`, `/complete`, `/book` w/ tokened form, Aswatax message | `/thank-you`, `/complete`, `/book` (`BookingPicker.tsx`, `DetailsForm.tsx`) all present; Aswatax post-submit message presence not verified in this pass | S/? | `find generalist/web/src/app -maxdepth 1 -type d` shows `book`, `complete`, `thank-you`; did not grep the Aswatax intro string on this site, flagged as a question |
| L9 | `delayHours` = gaps, `0,0,4,20,24,48,72,96` | file present, `delayHours` sequence starts `0, 0, 4, 24, 48, 96, 168, 264` (from `config/lead-nurture.ts:285-410`), longer tail than Property's 96h ceiling, gap-vs-cumulative not independently re-derived beyond the trap already in memory (gaps, not totals) | S | `grep -n delayHours generalist/web/src/config/lead-nurture.ts \| head -10`; copy uses "free review" language, not caveated in the nurture body sampled |
| L10 | category-driven `CTA_BY_CATEGORY` | not independently traced in this pass (out of time budget); `BlogPostRenderer.tsx` and `InlineMiniLeadForm.tsx` both exist | ? | files present (`generalist/web/src/components/blog/BlogPostRenderer.tsx`, `InlineMiniLeadForm.tsx`); mechanism and dead-code check not done |
| L11 | Property consent text (baseline) | **identical verbatim** to Property's `leadConsentText` (`config/site.ts:19` both sites), confirmed by the site's own test file quoting Property's wording as the estate baseline | NONE | `generalist/web/src/tests/lead-payload.test.ts:61-70` explicitly compares against Property's exact string; both read "shared with a firm from our specialist partner network...", same across the estate, and per rule 8 this is NOT a defect (consent/privacy/terms carve-out) |
| L12 | source `property` | source `"generalist"` (`api/leads/submit/route.ts:28,67`), on the estate CHECK-constraint allowlist per memory (`generalist_lead_source_identifier.md`) | NONE | `generalist/web/src/app/api/leads/submit/route.ts:28` `createLeadSubmitHandler({ source: "generalist" })` |
| G1 | AI-crawler allowlist | full named allowlist: Googlebot family, GPTBot/OAI-SearchBot/ChatGPT-User, ClaudeBot/anthropic-ai/Claude-Web/Claude-SearchBot/Claude-User, PerplexityBot/Perplexity-User, Applebot, Meta bots | NONE | `generalist/web/src/app/robots.ts:1-40`, disallow list minimal (thank-you, /api/og, mutating /api/*) |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | shared builder confirmed (see P5); `parentOrganization`/`knowsAbout` presence not directly grepped in this pass, only the shim file read | S/? | did not open `@/lib/schema/organization` (the underlying builder) to confirm `parentOrganization`/`knowsAbout` render on generalist specifically vs just being available in the shared package |
| G3 | Service+FAQPage+Breadcrumb on segment/service pages | **no segment pages exist** (see C4); `/services` is a single static page, not `/for/[slug]` | L | `find generalist/web/src/app -iname "for" -o -iname "segment*"` = nothing; `find generalist/web/src/app/services -maxdepth 1` = one `page.tsx` |
| G4 | BlogPosting, author Org/Person, real `dateModified` | not verified in this pass (would need per-post JSON-LD read) | ? | not determined, would need to fetch a live post and inspect `<script type="application/ld+json">` |
| G5 | firm-first, UTM tags, lists audiences/services/calculators | firm-first, UTM tags present (`utm_source=chatgpt&utm_medium=llms`, plus Perplexity/Copilot instructions), lists cornerstone guides and key facts | NONE | `generalist/web/public/llms.txt:1-30` (live 200) |
| G6 | `buildLlmsFullRoute`, all posts, 17 MB vs 19.07 MB ceiling | route exists (`src/app/llms-full.txt`), live 200; size and post count not measured in this pass (would need a live fetch + byte count) | ? | route file exists; size unmeasured, flagged as a question, worth checking against the 19.07 MB ISR ceiling memory trap |
| G7 | `lastModified` real or omitted | **build-time `new Date()`** on several routes (home-equivalent, hub pages), real `post.date`/`guide.date` on posts/guides | S | `generalist/web/src/app/sitemap.ts:51,63,75,86,97`, lines 51/63/97 use `new Date()` (today, every build), lines 75/86 use the real content date when present |
| G8 | canonical-hub defect fixed 09-26 on 4 sites (care, contractors-ir35, ecommerce, construction-cis) | generalist **not in the fixed-commit's file list** | ? | `git show bb297ab2 --stat` touches `care/`, and (per commit message) contractors-ir35 + ecommerce (`286365a8`) + construction-cis; generalist absent from both commits, either generalist never had the root-`alternates.canonical` bug, or it has it unfixed; did not independently check `generalist/web/src/app/layout.tsx` for a root `alternates.canonical` to rule this out |
| G9 | noindex correct, `/embed` rule | not directly checked in this pass | ? | not determined |
| G10 | gsc_config entry, indexnow pipeline+key, Bing verified | `agents/config/gsc_config.py` has a `"generalist"` entry (site_key, content_dir, git_repo_path); `generalist/pipeline/submit_indexnow.py` exists; Bing verification status unknown from repo | S/? | `grep -n generalist agents/config/gsc_config.py:161-167`; `find generalist -iname submit_indexnow.py` |
| G11 | 09-27 AI-assistant naming baseline (LEADS_250 section 8/T6) | not opened in this pass to check whether it names generalist | ? | not determined |
| C1 | 806 posts | not counted, content lives outside the repo tree readable in this pass (no `content/blog` markdown corpus enumerated); `docs/generalist/STATE.md` references `content/blog/*.md` files individually (e.g. `accountant-for-churches-uk.md`) so posts likely live as files, but a full count was not run | ? | would need `find generalist/web/content/blog -iname "*.md" \| wc -l`, not run, flagged as a question, add to commands list below if resumed |
| C2 | exists | `docs/generalist/house_positions.md` exists, last modified 2026-09-11 (per filesystem timestamp) | NONE | `stat -c '%y' docs/generalist/house_positions.md` = `2026-09-11 11:46:21` |
| C3 | exists | **no `docs/generalist/COVERAGE_MAP_2026-09.md` or similarly named file** | S | `find docs/generalist -iname "*coverage*"` = empty; `ls docs/generalist/` lists 30+ other docs but no coverage map |
| C4 | `/for/[slug]`, 15 pages, Property template | **none**, no dynamic `/for/[slug]` route, no audiences data file | L | `find generalist/web/src/app -iname "for"` empty; `find generalist/web/src/data -iname "*audience*"` empty |
| C5 | `/services/*` list | one static `/services` page only, no sub-routes found | S | `find generalist/web/src/app/services -maxdepth 1` = single `page.tsx` |
| C6 | validator runs | `scripts/validate_blog_content.py` `SITES` dict has Property, Dentists, Medical, Solicitors (and others) but **no `generalist` key**, script unsupported for this site | N/A | `grep -n "^SITES" -A20 scripts/validate_blog_content.py:30-50`, no `Generalist`/`generalist` entry found in the keys read |
| C7 | `dateModified`/`reviewedAt` | not checked in this pass | ? | not determined |
| C8 | byline model | `docs/generalist/STATE.md` states "advice comes from a qualified accountant on the partner team" (positioning source: `src/app/terms/page.tsx:53`, `src/lib/team.ts`), editorial/team byline, not Property's firm-voice model | S | `docs/generalist/STATE.md` top block, 2026-09-12 entry |
| C9 | link audit tool | not run in this pass; `scripts/` was not exhaustively searched for a generalist-specific link checker | ? | not determined |
| D1 | Property is the design source | `port-generalist-phase1` through `port-generalist-phase6` all present (full port); `web-shared/design` imported in 48 files vs Property's 2 (Property is the bespoke source, not a "port" consumer, so this asymmetry is expected, not a gap) | NONE | `git tag -l 'port-generalist-*'` = 6 phases; `grep -rl "web-shared/design" generalist/web/src \| wc -l` = 48 |
| D2 | imported | `prose-standard.css` referenced in `generalist/web/src/app/globals.css` | NONE | `grep -n prose-standard generalist/web/src/app/globals.css` hit |
| D3 | hides below 1024 | not rendered-DOM checked in this pass (would need Puppeteer per rule 7) | ? | not determined, source-only pass |
| D4 | favicon set, no SVG og:image, metadataBase | `favicon.ico` and `icon.png` present (not SVG); `openGraph` block present in `layout.tsx`; `metadataBase` presence not directly confirmed | S/? | `find generalist/web/src/app -maxdepth 1 -iname "favicon*" -o -iname "icon*"` = `favicon.ico`, `icon.png`; did not grep `metadataBase` specifically |
| D5 | fonts TBD | not checked in this pass | ? | not determined |
| D6 | StatsCounter literal-value support | not checked in this pass | ? | not determined |
| D7 | `scrollWidth`=390 at real emulation | **not run**, no Puppeteer/browser session used in this text-only pass; rule 7's 390px trap means a plain curl/grep cannot answer this safely | ? | flagged as a question; needs a follow-up Puppeteer pass with the gov.uk control screenshot per brief rule 7 |
| D8 | playbook §9.1 gate numbers | not run in this pass | ? | not determined, needs `docs/_engines/DESIGN_PORT_PLAYBOOK.md` §9.1 block executed |
| I1 | live, all core routes 200 | confirmed 2026-09-28: home 200, `/robots.txt` 200, `/llms.txt` 200, `/llms-full.txt` 200, `/sitemap.xml` 200 | NONE | live `curl -s -o /dev/null -w "%{http_code}"` on each URL, run this session |
| I2 | Vercel project + deploy date | `docs/generalist/STATE.md` states production SHA `90fbea9c`, deployed 2026-09-16, Vercel project `holloway-davies`; HEAD has commits after that touching `generalist/` | S | `git log --since=2026-09-16 --oneline -- generalist/` returns 4 commits: `a796de63` (CI fix), `564092dc` (s.464ZA content fix, 14 posts), `153e5017` (AdSense meta tag), `7edc7fd3` (AdSense enabled), none of these are confirmed deployed past the 09-16 SHA in this pass |
| I3 | tests count | 23 `.test.ts(x)` files under `generalist/web/src`; CI workflow `ci-build-test.yml` covers generalist (`generalist\|https://www.hollowaydavies.co.uk` at line 57) | NONE | `find generalist/web/src -iname "*.test.ts*" \| wc -l` = 23; `grep -n generalist .github/workflows/ci-build-test.yml` hit |
| I4 | GA4 present, CSP allows `region1.google-analytics.com`, consent banner | `GoogleAnalytics.tsx` + `ConsentToggle.tsx` components exist; `next.config.ts:97-107` calls a shared `buildSecurityHeaders({ ga: true, supabase: true, ads: true, ... })` helper rather than a literal CSP string in this file, so the `region1.google-analytics.com` allowlist entry was **not directly visible by grep** in this repo location, likely lives inside the shared helper | S/? | `generalist/web/next.config.ts:97-107`; `grep -rn "region1.google-analytics.com"` found nothing under `generalist/web/src` or `next.config.ts` itself, needs a look inside the shared `buildSecurityHeaders` helper (not located in this pass) or a live response-header check |
| I5 | flags/env | not enumerated in this pass | ? | not determined |
| I6 | monitored_pages rows | unknown from repo (no Supabase read in this pass, per brief §I6 default) | ? | unknown from repo |
| I7 | STATE.md exists, newest entry, contradictions | exists, newest entry references 09-16 deploy plus a later untitled top block; one internal tension noted: STATE.md's editorial/"partner team" framing (C8) directly conflicts with the 09-28 ruling in brief rule 8, not a contradiction inside the file, but between the file and the new ruling | S | `docs/generalist/STATE.md:1-10` |

## Unique to this site

- AdSense is live on generalist (and Solicitors only, per `next.config.ts:97` comment); Property
  explicitly keeps `frame-src 'none'` for its Mediavine deal. This is a genuine business-model
  difference between the two sites, not a defect.
- `NextStepOffer.tsx` in the intent engine has no equivalent named in the brief's Property file
  list, may be an addition, may be parity, not determined which.
- Nurture sequence runs an extra two steps out to 264h (11 days) versus Property's 96h ceiling
  named in the brief; worth a question to the owner on whether that is deliberate for this
  colder, more editorial audience.

## Shares Property's open defects

- The consent-sentence wording (identical to Property's, confirmed by the site's own test file)
  is a shared trait, correctly carved out by rule 8 as NOT a defect.
- `sitemap.ts` uses build-time `new Date()` on several routes, the same class of defect the
  brief flags generically for G7 (not confirmed identical code, but the same pattern).
- Did not confirm or rule out the `/book` dead-end or the 115x unbacked-24h-promise pattern
  named as Property's known defects; flagged under P4/L8 above as open questions.

## Questions (missing data, not findings)

1. Does any nurture email actually back the 9 "within 24 hours" promises found in `web/src`? Not
   opened line by line.
2. Post count, `dateModified`/`reviewedAt` coverage, and byline detail (C1, C7), content corpus
   was not enumerated in this pass.
3. `llms-full.txt` live size against the 19.07 MB ISR ceiling, route confirmed live (200) but
   byte size not measured.
4. Does `generalist/web/src/app/layout.tsx` set a root `alternates.canonical`? Not checked, so
   G8 (canonical-hub defect) cannot be confirmed fixed or present.
5. D3/D6/D7/D8/D5 (header CTA breakpoint, StatsCounter values, 390px emulation, playbook §9.1
   gate, fonts), none run in this text-only pass; all need a Puppeteer session per rule 7.
6. Does the Aswatax post-submit message render on this site's `/complete` flow?
7. Where does `region1.google-analytics.com` actually get allow-listed for this site, inside
   the shared `buildSecurityHeaders` helper, not located in this pass?
8. G2's `parentOrganization`/`knowsAbout`, present on the shared builder, not confirmed to
   render specifically on generalist's pages.
9. G9 (noindex, `/embed` rule), G11 (AI-naming baseline coverage), I5 (env flags), I6
   (monitored_pages rows), C9 (link audit), not checked in this pass.

## Commands and files read

- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" generalist/web/src generalist/niche.config.json generalist/web/public`
- `grep -rniE "free consultation|free first call|free review" generalist/web/src | wc -l`
- `grep -rniE "within 24 hours|same working day|24-hour" generalist/web/src | wc -l`
- `node -e "console.log(require('./generalist/niche.config.json').entity)"` and `Object.keys(...)`
- `Read generalist/web/src/lib/organization-schema.ts`
- `Read generalist/web/public/llms.txt`
- `Read generalist/web/src/app/robots.ts`
- `diff Property/web/src/components/calculators/ResultGate.tsx generalist/web/src/components/calculators/ResultGate.tsx`
- `grep -n delayHours generalist/web/src/config/lead-nurture.ts`
- `git tag -l 'port-generalist-*'`
- `grep -rl "web-shared/design" generalist/web/src Property/web/src | wc -l`
- `git log --since=2026-09-26 --grep=canonical --oneline` and `git show bb297ab2 --stat`
- `curl -s -o /dev/null -w "%{http_code}" https://www.hollowaydavies.co.uk/{,robots.txt,llms.txt,llms-full.txt,sitemap.xml}` (live GETs, 2026-09-28)
- `git log --since=2026-09-16 --oneline -- generalist/`
- `find generalist/web/src -iname "*.test.ts*" | wc -l`
- `grep -n generalist .github/workflows/ci-build-test.yml agents/config/gsc_config.py`
- `Read docs/generalist/STATE.md` (head and tail)
- `grep -n "^SITES" -A20 scripts/validate_blog_content.py`
- `find generalist/web/src/app -iname "for"`, `find generalist/web/src/data -iname "*audience*"`, `find generalist/web/src/app/services -maxdepth 1`

---

# Wave 2 reader pass (2026-09-28)

Rendered with `puppeteer-core` (repo root) on Chromium `ms-playwright/chromium-1223`.
Mobile = `page.emulate` viewport 390x844, `deviceScaleFactor: 3`, `isMobile: true`,
`hasTouch: true`, iPhone UA. **Control: `https://www.gov.uk` under the same code returns
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing
elements**, so the emulation is honest. **This site has no segment pages**, confirmed live:
the sitemap contains no `/for/` or `/for-*` URL, so `/services` was read in their place, as
the brief directs. Pages rendered: `/`, `/about`, `/services`,
`/blog/bookkeeping-and-compliance/xero-accountant-uk-guide`,
`/calculators/salary-dividend-optimiser`, `/contact`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA visible at 1280, hidden at 390 | Rendered `getBoundingClientRect`: at 1280 "Contact" 79x38 and "Book a free call" 155x40 visible; at 390 both 0x0 and not visible. Same on all six pages |
| D5 | Geist Sans, via `geist/font` | Applied body `font-family` is `GeistSans, "GeistSans Fallback", system-ui, -apple-system, sans-serif`. This is the only one of the four sites on Property's typeface |
| D6 | Present and adopted, but the homepage and `/services` map the SAME data through two different mappers, and only one is safe for non-numeric values | `generalist/web/src/app/page.tsx:111-114` uses `/^([\d.]+)(.*)$/` with `Number(match?.[1] ?? 0)`, so a value not starting with a digit renders **0**. `generalist/web/src/app/services/page.tsx:51-57` guards it (`if (!match) return { target: 0, suffix: value, label }`) and also computes `decimals`. Today's `siteStats` values ("21", "378", "24h") all start with a digit so nothing renders 0 live, but the homepage carries the Medical defect latent |
| D7 | `scrollWidth = 390` on all six pages, no overflowing elements on any | Real emulation, six pages, zero selectors past the viewport edge |
| D8 | 1=1; 2=**16 distinct / 142 call sites**; 2a=0; 2b adopted=5 declined=0; 3=`geist/font/sans` and `geist/font/mono`; 4=1; 5=Eyebrow 3, section-label 0; 6=4 ring lines; 7=4 gradient files; 8=walks 1, guards-the-guard 0. Markers ping 1, stats 2, backdrop 3, rounded-full 4 | Section 9.1 block run verbatim. This is the reference number the playbook quotes for generalist and it still holds. Rows 1, 2, 2b, 3, 4, 5 pass. **Row 8 half-fails: the walk exists but carries no guards-the-guard assertion.** Row 6 prints four coloured rings that need a written reason each; row 7 prints four gradient files whose stops need measuring |
| G7 | The live sitemap carries today's date among its `lastmod` values | `curl /sitemap.xml` distinct dates include 2026-09-28, so the build-time stamp reaches production |
| G8 | Defect ABSENT. Hub canonicals self-reference | `/` to `/`, `/blog` to `/blog`, `/calculators` to `/calculators`, `/services` to `/services`. generalist did not need the 09-26 fix |
| G9 | Correct. `noindex` only on `/embed/*` | The four hub pages carry no `noindex`; `/embed/salary-dividend-optimiser` does. NIT: that embed page canonicals to the homepage, not itself |
| L3 | Corroborates wave 1. The calculator page serves three `backdrop-blur` occurrences, the frosted-glass shape of `ResultGate` | `curl /calculators/salary-dividend-optimiser \| grep -c backdrop-blur` = 3, against 1 on Dentists and 1 on digital-agency. Three forms render on initial load (6, 10 and 3 inputs). The gate itself only appears after a calculation, which a GET cannot trigger, so the source diff in the wave 1 row remains the primary evidence |
| L4 | 21 calculators | Live sitemap: salary-dividend-optimiser, take-home-pay-calculator, dividend-tax-2026-27, pension-contribution-optimiser, mileage-claim, employer-ni-calculator, associated-companies-ct, rd-tax-credit-estimator, capital-allowances-vehicle, vat-scheme-comparator, vat-threshold-checker, badr-cgt-calculator, cgt-60-day-reporter, sole-trader-vs-ltd, cis-subcontractor-deduction, p11d-bik-calculator, mtd-itsa-readiness, business-loan-calculator, asset-finance-calculator, eot-tax-saving-calculator, business-valuation-calculator. More than Property's six route dirs |
| L8 | **`/book` RENDERS A FORM here, so generalist does NOT share Property's dead-`/book` defect**, and the Aswatax line is present on both post-submit pages | Rendered `/book` returns 200 with 1 form and 3 inputs under "Book your free review call". `curl /thank-you` and `curl /complete` both carry "Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of advice, ..." |

## Reader findings

This is the strongest of the four sites on everything I can measure from the outside. The
voice is already the firm's: zero caveat sentences on five of six pages, and the one hit is
a simile, not a disclaimer. Geist is loaded, the kit adoption number is the estate's best,
nothing overflows at 390, and `/book` actually renders a form.

The three things to fix are small and all mechanical: a 24-hour promise printed on the
rendered pages with nothing in the report to say a nurture email backs it, four
unlabelled inputs in the homepage mini-calculator, and the weakest focus indication of the
four sites (no ring at all on the first `select`).

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| FIX | home, /services | A 24-hour promise is printed in the rendered copy, the same defect class Property carries | `/services` close: "24-hour response, usually same day"; "One named accountant will reply within one working day." Homepage stat strip: value "24h", label "Reply window" (`generalist/web/src/config/service-tiers.ts:68-72`). Whether a nurture email backs it is an ops question, not settled here | S |
| FIX | home | Four inputs in the mini-calculator widget carry no label and no `aria-label` | rendered unlabelled list at both 1280 and 390: `text`, `number`, `text`, `number` | XS |
| FIX | /contact | Focus indication on the first form control is a border colour change only, `box-shadow: none` and `outline-style: none` | Tab to `select[name=role]`, `:focus-visible` matches true, computed `outline: none 1px rgb(15,23,43)`, `box-shadow: none`, border `oklab(0.87 0 0) 1px`. The other three sites at least carry a 2px alpha ring | XS |
| FIX | blog post, calculator | One `enquiry_ref` input with no label and no `aria-label` on each | rendered unlabelled list: `enquiry_ref` | XS |
| FIX | home | The homepage `StatsCounter` mapper will render 0 for any stat value not starting with a digit, where `/services` guards the same data | the two mappers quoted at D6 above | XS |
| NIT | site-wide | No footer booking or consultation link found in the rendered DOM | footer link scan for "book", "consult", "call" returns an empty list on all six pages | S |
| NIT | home, blog post, calculator | Longest paragraph 114, 117 and 126 words | rendered paragraph word counts | S |
| NIT | /about | "with the depth a specialist firm would bring" reads as a comparison to a third party at a glance | on `/about`, the only phrase on the whole site that a caveat grep catches; it is a simile about depth, not a disclaimer, so it is not a positioning defect | XS |
| NIT | site-wide | Playbook 9.1 row 8 half-fails; row 6 prints four coloured focus rings and row 7 four gradient files, each needing a written reason or a measurement | walks 1, guards-the-guard 0 | S |

Writing, measured: **em-dashes 0 on all six pages. US spellings 0. AI tells 0 on all six
pages** (the only site of the four with none). Readability: the answer is in the first
paragraph on every one of the six pages, including the blog post, whose opening paragraph
answers the title question directly. h1 and title agree with the page promise on all six.
Jargon is glossed: `/about` expands "the four trading structures" inline as "(limited
company, sole trader, contractor, partnership)".

### Design numbers

| Page | sw 1280 | sw 390 | overflow at 390 | body contrast | CTA contrast | forms | sticky at 390 | chat |
|---|---|---|---|---|---|---|---|---|
| / | 1280 | 390 | none | 18.93 | 5.18 | 2 | 1 | none |
| /about | 1280 | 390 | none | 18.93 | 5.18 | 2 | 1 | none |
| /services | 1280 | 390 | none | 18.93 | 5.18 | 2 | 1 | none |
| blog post | 1280 | 390 | none | 18.93 | 5.18 | 3 | 1 | none |
| /calculators/salary-dividend-optimiser | 1280 | 390 | none | 18.93 | 5.18 | 3 | 1 | none |
| /contact | 1280 | 390 | none | 18.93 | 5.18 | 2 | 2 | none |

Body contrast 18.93 is the highest of the four sites; CTA contrast 5.18 the lowest of the
four but still clears AA. Images without alt: 0 on all six pages. No chat widget in the
rendered DOM on any page.

### Sameness

| Comparison | Result |
|---|---|
| Segment page closers | N/A, no segment pages exist |
| Service and about closers within the site | Different. `/services` closes "Tell us where the business sits today and which service lines you need. We come back with a fixed-fee quote..."; `/about` closes "Tell us where the business sits today. We'll come back with a plain note on what the engagement would look like and what it would cost." Same opening clause, different sentence |
| Against Property's shared close | Not shared. Property's `/for/` pages all close on "Free first call, then a fixed fee in writing" and "Book a free first call. No obligation, no hard sell. If we take the work on, you get a fixed fee in writing before anything starts." generalist reaches the same promise in its own words |

## Corrections to the inventory

1. **L8 "S/?"** closes better than wave 1 assumed on both halves: `/book` renders a form
   (1 form, 3 inputs), so generalist does NOT share Property's dead-`/book` defect, and the
   Aswatax line IS present on `/thank-you` and `/complete`.
2. **D6 "?"** closes as "present, adopted, and carrying a latent 0-for-non-numeric bug on
   the homepage mapper only". Wave 1 left it unknown.
3. **G8 "?"** closes as defect-absent rather than unfixed: hub canonicals self-reference live.
4. **G9 "?"** closes as correct: `noindex` only on `/embed/*`.
5. **L4** is 21 calculators, not "2 route dirs, count is a ?". The dynamic `[slug]` route
   serves 20 of them.
6. Wave 1 records no 24-hour-promise row outcome for the rendered pages. The promise is on
   `/services` and in the homepage stat strip, so P4 is not clean here.
