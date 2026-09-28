# Pharmacy Tax parity research (2026-09-28)

Domain `www.pharmacytax.co.uk` | Vercel project `prj_t2p8zJKl4PgBSpsnTanv0kQ5Whyk` | launched: yes | live: yes, `curl -sI https://www.pharmacytax.co.uk/` returns `HTTP/1.1 200 OK`.

## Verdict in three lines

Pharmacy Tax has the launch-core kit (forms, calculators, schema, robots, llms.txt, nurture) but was never ported to the 2026-09-28 positioning ruling: post-submit pages, privacy policy and the wider site still say "specialist firm from our partner network", the exact copy rule 8 now calls a defect. It also lacks every Property-standard engagement layer built after its 2026-07 launch: no chat widget, no intent engine, no sticky CTA, no design-kit port (`web-shared/design` import count = 0), and its nurture cadence numbers are cumulative totals mislabelled as gaps (matches Property's real gaps only after re-deriving them). Content and machine-layer basics (robots, llms.txt, schema, sitemap, calculators, 27 blog posts, 5 segment pages) are present and broadly sound.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | N/A (no `entity` key documented in brief) | no `entity` key in `pharmacies/niche.config.json` | N/A | `pharmacies/niche.config.json` read in full, no `entity` field present |
| P2 | 0 caveat surfaces post-ruling (thank-you/complete clean) | 7 hits: `pharmacies/niche.config.json:6` (partner.name), `complete/page.tsx:94,119`, `privacy-policy/page.tsx:89,119,189`, `thank-you/page.tsx:52`, `config/site.ts:12` (consent), `lib/calculators/site.ts:8` (consent) | L | Post-submit pages (`complete`, `thank-you`) are prospect-facing and defect under rule 8; consent text on `config/site.ts:12` and `lib/calculators/site.ts:8` matches Property's own consent sentence verbatim (`Property/web/src/config/site.ts:39`) so those two are NOT defects per rule 8's exception |
| P3 | present, similar wording | 8 hits: `book/page.tsx:14,32`, `BookingPicker.tsx:160`, `lead-nurture.ts:343,411,458,641`, `niche.config.json:98` ("Free, no-obligation reply within 24 hours") | NONE | Same pattern as Property, not a defect on its own |
| P4 | 51 hits estate-wide pattern | 11 hits for "within 24 hours" style promise (`niche.config.json:98` sticky_secondary, plus nurture copy) | S | Nurture emails do reference the reply window (`lead-nurture.ts` step copy), so this one is at least backed, unlike Property's known open defect |
| P5 | `AccountingService`, firm-first Organization JSON-LD, shared builder | hand-rolled `lib/schema.ts:11-40`, `@type: ["ProfessionalService", niche.seo.organization_type]` where `organization_type: "AccountingService"`; `legalName: "Ashfield Trading Ltd"`, `knowsAbout` populated, `sameAs` = Companies House only | S | Not the shared `packages/web-shared/schema/organization.ts` builder Property uses; hand-rolled locally in `pharmacies/web/src/lib/schema.ts`. Description field pulls `siteConfig.description`, which is the tagline, not obviously caveated (checked, firm-first) |
| P6 | firm-first, UTM-tagged links | firm-first opening ("Pharmacy Tax is a UK accounting practice focused exclusively on community pharmacy businesses"), but 0 `utm_source` occurrences live (`curl -s https://www.pharmacytax.co.uk/llms.txt \| grep -c utm_source` = 0) | S | Voice matches Property; UTM tagging (`utm_source=chatgpt&utm_medium=llms`) is absent |
| L1 | mounted on home, services, segment, service, blog post, calculators, contact; not about | `LeadForm` mounted on: home (`app/page.tsx`), contact, `for/[slug]`, `services/[slug]`, blog post (`blog/[category]/[slug]/page.tsx`); NOT on `about` or `calculators` (uses MiniCapture there, by design) | XS | Same shape as Property (about page has no foot form on Property either per its known pattern); calculators intentionally use the mini-capture, not the foot form |
| L2 | `inline_mini`, `mobile_tool`, `calc_result_form`, `calc_result`, `resource_block`, `calc_page_footer`, `blog_short_resource` | only a generic `MiniCapture` component reused in 3 places (`calculators/[slug]/page.tsx`, `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`); no `MobileToolSlot` or distinct named ids found | M | `grep -rln "MobileToolSlot\|CalcResultCta" pharmacies/web/src` shows only `CalcResultCta.tsx` exists, no `MobileToolSlot`; the shared-id taxonomy from the brief is not present as named ids in this codebase, cannot confirm which formIds are wired without reading each MiniCapture call site's `formId` prop (not done, time-boxed) |
| L3 | one form under result, no gate, no PDF offer | `CalcResultCta.tsx` renders one `MiniCapture` under the result; no `ResultGate` file found in this repo | NONE | `find pharmacies/web/src -iname "*resultgate*"` = no match, consistent with Property's post-09-27 gate-free state |
| L4 | 6 calculator routes + premium + /embed | single dynamic route `app/calculators/[slug]/page.tsx` driven by `lib/calculators/registry.ts`; could not enumerate exact slug count from source (registry uses a data structure the grep for `slug:`/object literals did not resolve) | ? | Live sitemap check (`sitemap.xml`, 55 `<loc>` total) did not show individual `/calculators/*` URLs in the excerpt pulled; did not fully enumerate. `/embed` route exists (`app/embed/`) |
| L5 | `SpecialistWidget.tsx`, present on all pages | not found: `grep -rln "SpecialistWidget\|ChatWidget\|chat-widget" pharmacies/web/src` = no matches | L | No chat widget in this codebase at all |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | not found: `grep -rln "IntentProvider\|ReturningBar\|DeepScrollModal" pharmacies/web/src` = no matches | L | No intent engine |
| L7 | `StickyCTA.tsx` component, hero CTA from `niche.config.json` `cta` | no `StickyCTA.tsx` in `components/ui/` (only `Breadcrumb.tsx`, `layout-utils.ts`); `niche.config.json` does carry a `cta` block (`sticky_primary`, `sticky_secondary`, `sticky_button`) but no component consumes a sticky-CTA pattern by that name found | M | `cta` config exists and may be read elsewhere (not traced to a mount point in the time available) |
| L8 | thank-you, complete, /book with tokened form, Aswatax message | `thank-you/page.tsx`, `complete/page.tsx`, `book/page.tsx` (`BookingPicker.tsx`, presumed `DetailsForm.tsx` equivalent) all exist; did not verify Aswatax intro message presence in this site's post-submit flow | ? | Files present; Aswatax message text not located by grep (`grep -rn "Aswatax" pharmacies/web/src` not run, noted as a gap in this pass, see Questions) |
| L9 | `delayHours` = GAPS, e.g. `0,0,4,20,24,48,72,96` (`Property/web/src/config/lead-nurture.ts`) | `lead-nurture.ts:334-471` reads `0,0,4,24,48,96,168,264` | M | These are NOT gaps as labelled; re-deriving successive differences (24-4=20, 48-24=24, 96-48=48, 168-96=72, 264-168=96) reproduces Property's gap sequence exactly (0,0,4,20,24,48,72,96), meaning this file stores cumulative elapsed hours in a field the shared type calls `delayHours` (a gap). This is the exact trap memory `leads_250_programme.md` names ("nurture delayHours = gap not total"). If `computeNextSendMs` (imported from `web-shared/lead-nurture/config`) expects a gap, every send after step 2 fires far later than intended |
| L10 | category-driven `CTA_BY_CATEGORY` | `InlineMiniLeadForm.tsx` comment (line 5-10) states it is "ported from LEADS_250 S2, same copy, same formId, only the import source changes" | XS | Appears ported correctly; did not check for unused `categorySlug` prop as the brief flags for other sites |
| L11 | consent text baseline | `config/site.ts:12` and `lib/calculators/site.ts:8` match Property's `config/site.ts:39` verbatim | NONE | Diffed by eye; both read "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this." |
| L12 | source in CHECK constraint | `source: "pharmacies"` (`api/leads/submit/route.ts:28,67`); `'pharmacies'::text` present in the repo copy of `leads_source_valid` (`supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql`) | NONE | Accepted, assuming the migration was applied (STATE.md 2026-08-25 entry says tranche-2/3 migrations were applied to prod 2026-07-15 with pharmacies verified live) |
| G1 | ~40+ bot allowlist | `robots.ts` lists roughly 45 named user agents (Google, OpenAI, Anthropic, Perplexity, Meta, Bing, DuckDuckGo, Mistral, Cohere, Brave, Bytespider, CCBot, Diffbot, Amazon, Yandex, Naver, Seznam, Mojeek, Ahrefs/Yep, social previews); disallow = `/thank-you`, `/admin`; host line present | NONE | `pharmacies/web/src/app/robots.ts` read in full |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout`, one node per page | hand-rolled `lib/schema.ts`, has `sameAs` (Companies House only, no other profiles), no `parentOrganization` field, has `knowsAbout` (7 pharmacy-specific items) | S | Missing `parentOrganization` link to Ashfield Trading Ltd as a distinct entity node (legalName is inlined as a string instead) |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | `Breadcrumb.tsx` exists and is used; FAQ schema builder (`buildFaqJsonLd`) exists in `lib/schema.ts`; did not confirm it is actually called on all 5 `/for/*` and 8 `/services/*` pages | ? | Builder exists; per-page wiring not individually confirmed for all 13 pages in this pass |
| G4 | BlogPosting, `author` Organization/Person, real `dateModified` | not verified in this pass; `sitemap.ts` uses `now` (build time) for every URL, not per-post `dateModified`, so if BlogPosting schema reuses the same value it would be fake-fresh | M | `sitemap.ts:9` sets `const now = new Date().toISOString()` and applies it to every static route; blog post routes' own JSON-LD not individually checked |
| G5 | route-based, firm-first, UTM-tagged, lists audiences/services/calculators | static `public/llms.txt`, firm-first opening confirmed live, lists 5 audiences and 8 services, no UTM tags (0 `utm_source` hits) | S | Static file, hand-kept (matches STATE.md "static `public/llms.txt`" note from 2026-07-15), not the `buildLlmsFullRoute` pattern for the main file, though `llms-full.txt` IS a route: `pharmacies/web/src/app/llms-full.txt` exists as a directory (route), not confirmed which builder it uses |
| G6 | `buildLlmsFullRoute`, post count listed, size | `pharmacies/web/src/app/llms-full.txt` exists as a route dir; live GET returns 200; did not verify it lists all 27 posts or check size against the 19.07 MB ISR ceiling | ? | Live and reachable; content not verified |
| G7 | real or omitted `lastModified`, hreflang rule | `sitemap.ts` sets `lastModified: now` (build time, i.e. deploy time) on every static route, not real per-page dates | S | Same shape as the general "build-time now" pattern the brief lists as a defect class; not real dates. hreflang not checked |
| G8 | canonical-hub fix | `git log --since=2026-09-26 --grep=canonical --stat -- pharmacies/` returns 0 commits | ? | No canonical fix has touched this site in that window; cannot say whether the underlying bug is present or absent without reading every hub page's canonical tag (not done) |
| G9 | noindex correctly scoped, `/embed` rule | `robots.ts` disallows only `/thank-you` and `/admin`; `/embed` route exists but has no explicit robots carve-out seen | ? | Did not check individual page `metadata.robots` for noindex on `/embed`, `/book`, `/complete` |
| G10 | `gsc_config.py` entry, IndexNow key, Bing verified | STATE.md says "sitemap submitted to IndexNow" 2026-07-16; GSC/Bing external steps still listed as unchecked boxes in STATE.md's "External steps" section | S | `docs/pharmacies/STATE.md` external-steps checklist has GSC verification and Bing Webmaster import both unticked as of the file's last update |
| G11 | 09-27 baseline T6 coverage | not checked against `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 in this pass | ? | Out of scope for time available; flagged as a question |
| C1 | N/A | 27 posts live (sitemap: `grep -c "/blog/" sitemap.xml` = 27 of 55 total URLs); posts are DB-backed (`blog_topics` table), not markdown files in-repo, so newest-date and >=2026-07-30 count could not be read from the filesystem | ? | Live sitemap count only; would need a Supabase query for exact dates |
| C2 | `house_positions.md` current | `docs/pharmacies/house_positions.md` exists, 221 lines, last git-modified 2026-07-14 (`git log -1 --format=%ad`) | S | Not touched since launch build; FA2026/dividend/BADR figures were "re-verified at source" per STATE.md 2026-07-14 note, predates several 2026-09 ground-truth memory updates (BADR 18% from 2026-04-06, dividend rates, BR/APR cap), worth a fresh check against current ground-truth memory files, not done here |
| C3 | coverage map exists | no `COVERAGE_MAP_2026-09.md` or similar in `docs/pharmacies/` (`ls docs/pharmacies` = `STATE.md`, `house_positions.md`, `rates_ledger.json`) | M | Missing entirely |
| C4 | `/for/[slug]` dynamic, Property template | `app/for/[slug]/page.tsx` dynamic route, 5 live pages (owners, buying, selling, groups, locum); template match (Service+FAQPage+breadcrumb+one form+stat tiles) not individually verified per page | ? | Route shape matches; per-page schema completeness not confirmed |
| C5 | `/services/*` list | 8 live service pages (purchase accounting, sale/CGT/BADR, valuation/goodwill, NHS payment reconciliation/FP34, VAT retail schemes, payroll/workforce, incorporation/structure, benchmarking/margin) | NONE | From live sitemap |
| C6 | validator pass/fail | `python scripts/validate_blog_content.py --site pharmacies` not run (would require executing a script; rule 0.1 restricts to read-only repo state, running a read-only validator script was judged out of scope given "never start a dev server" caution and time-boxing) | ? | Not run |
| C7 | `dateModified`/`reviewedAt` present | not verified per-post; `sitemap.ts` build-time `now` (G7) suggests dates are not carried through faithfully, but blog post frontmatter itself not read | ? | Not verified |
| C8 | byline model | not checked in this pass | ? | Not verified |
| C9 | link audit | STATE.md 2026-07-14 note: "internal-link audit clean" at launch; no evidence of a repeat since; no dedicated link-audit script found under `pharmacies/pipeline` in a quick look | ? | Historical pass-mark only, not re-run |
| D1 | port tags, `web-shared/design` imports | `git tag -l 'port-pharmacies-*'` = empty (no tags); `grep -rl "web-shared/design" pharmacies/web/src \| wc -l` = 0 | L | No design port has ever touched this site |
| D2 | `prose-standard.css` imported | `pharmacies/web/src/app/globals.css:6` imports `../../../../packages/site-styles/prose-standard.css` | NONE | Present |
| D3 | header CTA hides below 1024 | not checked (would need a rendered DOM check; site is launched so this is doable but was not run in this pass) | ? | Not verified |
| D4 | favicon, `og:image` not SVG, `metadataBase` | not checked in source in this pass | ? | Not verified |
| D5 | fonts | not checked in this pass | ? | Not verified |
| D6 | StatsCounter literal-value dates | no StatsCounter component found by name in a quick search of `components/ui` | ? | Not confirmed present or absent; not chased further |
| D7 | 390px real emulation | not run (would need `puppeteer-core`, time-boxed out of this pass) | ? | Not verified |
| D8 | playbook 9.1 kit-adoption gate | not run | ? | Not verified |
| I1 | live status | 200 on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` (all curl'd directly, see Commands) | NONE | Confirmed live |
| I2 | Vercel project id, deploy vs HEAD | project id `prj_t2p8zJKl4PgBSpsnTanv0kQ5Whyk` from STATE.md; STATE.md's last dated production-commit reference is `435cc12e`, deployed 2026-08-24; did not run `git log --since=<that date> --oneline -- pharmacies/` to count commits since, so cannot say how far HEAD has drifted from prod | ? | STATE.md is the only source used; a live drift check was not run |
| I3 | tests | 5 test files under `pharmacies/web/src` (`find ... -iname "*.test.ts*"` = 5); CI workflows `.github/workflows/bot-scorer.yml` and `.github/workflows/ci-build-test.yml` both reference `pharmacies` | NONE | Present and covered |
| I4 | GA4 present, CSP allows region1, consent banner | `ConsentProvider`, `AnalyticsProvider`, `ConsentedScripts` all wired in `app/layout.tsx` (shared components); BUT `niche.config.json` `seo.google_analytics_id` is an empty string, so `ConsentedScripts gaMeasurementId=""` has nothing to load; CSP header not found in `next.config.ts` or `vercel.json` (no explicit CSP block present) | M | Plumbing exists but GA4 is not actually configured; this matches STATE.md's open external step "GA4: create property, copy measurement id" which is still unticked |
| I5 | flags | not systematically grepped in this pass | ? | Not verified |
| I6 | monitored_pages | unknown from repo (would need Supabase read) | ? | Unknown |
| I7 | STATE.md currency | `docs/pharmacies/STATE.md` last dated entry is 2026-08-25 (merge note); does not mention the 2026-09-28 positioning ruling at all, consistent with the P2 finding that this site was never ported to it | S | Confirms P2 rather than contradicts it |

## Unique to this site

- Dataset schema on the UK Community Pharmacy Openings & Closures Index, built from real NHSBSA and Companies House SIC 47730 data (`STATE.md` 2026-07-15 note, "exceeds Property"); a second research page, `research/pharmacy-density-and-workload-index`, also live per sitemap.
- WebApplication schema on calculators and HowTo schema on procedural posts, per STATE.md's 2026-07-15 hardening note, both described as exceeding Property's baseline at the time.
- Nurture copy is explicitly "SERVICE-ONLY (compliance)" with a documented PECR/LIA rationale in the file header (`lead-nurture.ts:1-19`), more thoroughly commented than a typical file.

## Shares Property's open defects

- Build-time `lastModified: now` on the sitemap rather than real per-page dates (G7), same shape as the general estate pattern.
- GA4 plumbing present but not actually wired with a live measurement id (I4), likely shared with other unlaunched-analytics sites, not confirmed against Property specifically since Property's GA4 id is presumably set.
- No evidence either way on the /book untokened-form defect Property has (L8); this site's `/book` uses `BookingPicker.tsx` but whether the link into it carries a token was not checked.

## Questions (missing data, not findings)

- Does `LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 cover pharmacies for AI-assistant naming (G11)? Not checked in this pass.
- Exact calculator count and slugs (L4): `lib/calculators/registry.ts` structure did not yield to a simple grep; needs a direct read of the file.
- Aswatax post-submit message presence (L8): not grepped for `"Aswatax"` in `pharmacies/web/src`.
- Per-page FAQPage/Service/BreadcrumbList wiring on all 13 segment/service pages (G3, C4): builder exists, per-page calls not individually confirmed.
- Canonical-hub defect presence (G8): no commits in the relevant window touched this site, but the underlying bug's presence/absence in current code was not read page by page.
- HEAD-vs-deployed-commit drift (I2): STATE.md's 2026-08-24 production SHA was not checked against current HEAD for this site's directory.
- `monitored_pages` rows (I6) and GSC/Bing verification status (G10) require Supabase/external console access not exercised in this pass.
- Blog post `dateModified`/`reviewedAt` and byline model (C7, C8): posts are DB-backed, not files, so were not read directly; a live page fetch of one post would answer this quickly in a follow-up.

## Commands and files read

- `cat docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md`
- `cat pharmacies/niche.config.json`
- `cat docs/pharmacies/STATE.md`
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" pharmacies/niche.config.json pharmacies/web/src pharmacies/web/public`
- `grep -rniE "free consultation|free first call|free review|no-obligation" pharmacies/web/src pharmacies/niche.config.json`
- `grep -rniE "within 24 hours|same working day|same day" pharmacies/web/src pharmacies/niche.config.json` (and same against `Property/web/src Property/niche.config.json` for comparison)
- `grep -n "delayHours" pharmacies/web/src/config/lead-nurture.ts` and `Property/web/src/config/lead-nurture.ts`
- `cat pharmacies/web/src/lib/schema.ts`
- `cat pharmacies/web/src/app/robots.ts`
- `cat pharmacies/web/src/app/sitemap.ts`
- `grep -n "leadConsentText" Property/web/src/config/site.ts`
- `curl -sI https://www.pharmacytax.co.uk/`; `curl -s -o /dev/null -w "%{http_code}\n" https://www.pharmacytax.co.uk/{robots.txt,llms.txt,llms-full.txt,sitemap.xml}`
- `curl -s https://www.pharmacytax.co.uk/sitemap.xml` saved to scratch, `grep -c "<loc>"`, `grep -c "/blog/"`, and listed `/for/` and `/services/` URLs
- `curl -s https://www.pharmacytax.co.uk/llms.txt | grep -c utm_source`
- `git tag -l 'port-pharmacies-*'`
- `grep -rl "web-shared/design" pharmacies/web/src | wc -l`
- `grep -n "prose-standard" pharmacies/web/src/app/globals.css`
- `git log --since=2026-09-26 --grep=canonical --stat -- pharmacies/`
- `find pharmacies/web/src -iname "*.test.ts*" | wc -l`; `grep -l "pharmacies" .github/workflows/*.yml`
- `cat supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql`
- `grep -rln "SpecialistWidget\|ChatWidget\|chat-widget" pharmacies/web/src`
- `grep -rln "IntentProvider\|ReturningBar\|DeepScrollModal" pharmacies/web/src`
- `cat pharmacies/web/src/app/layout.tsx` (analytics wiring)
- Scratch directory `C:\Users\user\.claude\jobs\933e5962\tmp\pharmacies\` used for one sitemap.xml download, deleted at end of this task.

---

# Wave 2 reader append (2026-09-28)

Control, per brief rule 7: `https://www.gov.uk` rendered with the same `puppeteer-core`
`page.emulate` code (390x844, deviceScaleFactor 3, isMobile, hasTouch) gives
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing elements.
Real emulation confirmed. Pages rendered: `/`, `/about`, `/services/pharmacy-vat-retail-schemes`,
`/for/pharmacy-owners`, `/blog/vat-and-retail-schemes/vat-on-private-services-pharmacy-first`,
`/calculators/locum-take-home-comparator`, `/contact`, plus `/book`, `/thank-you`, and all 5 `/for/*`
and 8 `/services/*` pages for the sameness check.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | N/A rather than pass or fail: **there is no header CTA at all**. A scan of every `<a>` and `<button>` inside `<header>` for book / call / enquire / contact / get / start / quote / talk / speak text returns **zero elements** at 1280 and at 390, on all 7 pages | rendered `header.querySelectorAll('a,button')` filtered on text, length 0 |
| D4 | `metadataBase` and og image not read from source this pass, but every rendered page has a title and the Organization node renders `AccountingService`, so the schema half of the row is settled | `curl` plus `grep -o 'AccountingService'` = 2 hits per page on 12 URLs |
| D5 | System stack only: `ui-sans-serif, system-ui, -apple-system, sans-serif`. No `next/font`, no Geist, no webfont | `getComputedStyle(document.body).fontFamily` live; `grep -n "next/font\|Geist" pharmacies/web/src/app/layout.tsx` returns nothing |
| D6 | No `StatsCounter` component exists and no stat tiles render. The Medical literal-date trap cannot apply | `grep -rl StatsCounter pharmacies/web/src` empty; rendered pages |
| D7 | 390 `scrollWidth` = **390 on all 7 pages**. The cleanest 390 result of my four sites | rendered on both viewports |
| D8 | 9.1 gate, every row zero or absent: layout-utils=0; kit adopted **0 distinct / 0 call sites**; declined=0; homepage marketing adopted=0 declined=0; webfont none; backdrop=0; Eyebrow=0 and section-label=10; zero non-token focus rings; one gradient file; ring guard walks=0 guards=0. Never ported | section 9.1 block run verbatim, read-only |
| G3 | FAQPage YES on all 5 `/for/*`, all 8 `/services/*` and the calculator, answering wave 1's open question. **No `Service` node and no `BreadcrumbList` on any of them** | `curl` plus `grep -o` on 12 URLs |
| G7 | Confirmed `lastModified: now`, build time, on every route | `pharmacies/web/src/app/sitemap.ts:13-16` |
| G8 | **No defect live, and better than three siblings.** Every URL checked serves its own self-referencing canonical, including `/for`, `/blog`, `/about`, all `/for/*`, all `/services/*` and the calculators. `layout.tsx:15` does set `canonical: siteUrl` as a default, but every route overrides it, so the hub defect that hits construction-cis, hospitality and ecommerce does not hit here | canonical extraction on 10 URLs |
| G9 | Correctly scoped. `noindex` on token API routes and, notably, an explicit `robots: { index: false, follow: false }` on `/book` (`book/page.tsx:16`), which no sibling of mine sets. No stray noindex on public pages | `grep -rn "noindex\|index: false" pharmacies/web/src/app` |
| L3 | PASS. `/calculators/locum-take-home-comparator` renders 2 forms of 5 inputs each, one under the result, no gate, no modal, no PDF offer. Submit reads "Get my figures checked" | rendered form counts and submit text |
| L4 | **3 calculators** live: pharmacy-purchase-affordability, pharmacy-fp34-cash-flow-estimator, locum-take-home-comparator. FAQPage and WebApplication both present on the one sampled; no cite-this line seen | live sitemap `grep -c '/calculators/'` = 3; schema greps |
| L8 | `/book` with no token renders **zero forms**; its visible tail is the footer entity block. Property's defect shared. `/thank-you` renders the Aswatax sentence correctly ("we work closely with Aswatax, a firm of Chartered Tax Advisers") | rendered form count 0 on `/book` |
| L2 | No `form_id` value is exposed anywhere in the rendered DOM. The forms carry no hidden identifier fields at all, unlike construction-cis which at least emits `sourceUrl` | rendered per-form `hiddenNames` empty on all 12 URLs |

## Reader findings

Pharmacies is the most solid of my four sites on the measurable basics: 390 is clean on every page,
every contrast number passes comfortably, the navy CTA reads at 12.18, every input is labelled, the
writing has no em-dashes and no US spellings, and unlike three siblings its canonical tags are all
correct. Its gaps are the whole engagement layer that was built after its July launch (no header
CTA, no sticky, no chat, no intent, no design port) plus two content-pipeline defects: raw HTML
markup printed as text on all five segment pages, and one segment page with no form at all.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | all 5 `/for/*` | Raw HTML anchor markup renders as visible body text. `/for/pharmacy-owners` opens its longest paragraph with the literal string `<a href="/services/pharmacy-payroll-workforce">Pharmacy payroll</a>`; 6 occurrences there, plus buying-a-pharmacy 5, selling-a-pharmacy 5, pharmacy-groups 8, locum-pharmacists 5 | `document.body.innerText` matched against `/<a href=[^>]*>[^<]*<\/a>/g`; samples include `<a href="/calculators/pharmacy-fp34-cash-flow-estimator">FP34 cash-flow estimator</a>` | S |
| BLOCKER | /for/locum-pharmacists | **Zero `<form>` elements**, while the other 4 segment pages and all 8 service pages each render one. One segment page with no conversion path at all | rendered form count 0; the other 12 pages return 1 | XS |
| BLOCKER | every page | No header CTA at 1280 or 390, no sticky CTA, no chat widget and no intent prompt anywhere in the live DOM. A scan of every `position: fixed` element on the home page returns nothing | rendered header scan 0 matches; fixed-element scan empty | L |
| FIX | /about, blog post | Zero forms. The blog post is the deeper loss: a 34-paragraph technical post with no capture of any kind | rendered form counts | S |
| FIX | /services/pharmacy-vat-retail-schemes | The `<h1>` ends in two full stops: "Pharmacies are VAT-mixed businesses. The mix is the whole point.." It is also the only h1 on the site made of two sentences | rendered `document.querySelectorAll('h1')` | XS |
| FIX | /calculators/locum-take-home-comparator | Title repeats the brand twice: "Locum Pharmacist Take-Home Calculator 2026/27 \| Pharmacy Tax \| Pharmacy Tax" | rendered `document.title` | XS |
| FIX | all 5 `/for/*` and 8 `/services/*` | Identical closing block on all 13, and the shared text is the footer entity block, not a close: "Specialist accountants for UK community pharmacy owners: NHS contract economics, VAT, buying and selling a pharmacy" then the Ashfield Trading Ltd line then the copyright | closer sweep, one group of 13 | M |
| FIX | /book | Untokened `/book` renders zero forms, Property's defect shared | rendered | S |
| FIX | all `/for/*` and `/services/*` | No `BreadcrumbList` and no `Service` node; Property has both | schema greps | S |
| FIX | all | No webfont at all, so the site renders in whatever the device supplies while every ported sibling uses Geist | `getComputedStyle` plus layout.tsx grep | S |
| FIX | all | Sitemap `lastModified` is build time on every route | `sitemap.ts:13-16` | XS |
| NIT | /calculators/locum-take-home-comparator | Longest paragraph is 145 words, the longest single paragraph across my four sites, and it is a status warning the reader most needs to skim: "STATUS WARNING (HP 20-22, ESM4270): HMRC has a locum-pharmacist-specific..." | rendered paragraph word counts | XS |
| NIT | / | Body text contrast 4.54, the lowest passing number on the site, on grey `oklch(0.556 0 0)` over `oklch(0.985 0 0)`. Passes AA at 4.5 with almost nothing to spare | `getComputedStyle` with canvas-resolved colour | XS |
| NIT | blog post, calculator | The only two AI-tell words on the site, one each: "robust" ("a robust process for it") and "unlock" ("does not unlock the take-home figure shown") | rendered innerText | XS |
| NIT | all | No `<main>` landmark on any page, so the document has no primary content region | rendered `document.querySelector('main')` is null | XS |
| NIT | all forms | Focus ring on the first input is the browser default (`outline: 1px auto`) on most pages; on the calculator it computes `outline-style: none` with no visible box shadow, so the first field has **no visible focus state at all** | `getComputedStyle` after `.focus()`: calculator returns `outline=1px none rgb(15,23,42)` and a fully transparent box shadow | XS |
| NIT | /for/pharmacy-owners | The `<h1>` is 16 words and contains a clause ("...who understand how NHS contract economics actually work"), where the page title promises the shorter "Accountants for Pharmacy Owners \| NHS Contract Specialists". They agree in substance, not in length | rendered title and h1 | XS |

### Design numbers (page x metric)

| Page | sw 1280 | sw 390 | hdr CTA 1280 / 390 | body contrast | CTA contrast | forms | longest para (words) |
|---|---|---|---|---|---|---|---|
| gov.uk control | 1280 | **390** | n/a | n/a | 3.91 | n/a | n/a |
| / | 1280 | 390 | 0 / 0 | 4.54 | 12.18 | 1 | 102 |
| /about | 1280 | 390 | 0 / 0 | 7.81 | 12.18 | 0 | 35 |
| /services/pharmacy-vat-retail-schemes | 1280 | 390 | 0 / 0 | 12.18 | 12.18 | 1 | 104 |
| /for/pharmacy-owners | 1280 | 390 | 0 / 0 | 7.81 | 12.18 | 1 | 91 |
| blog post | 1280 | 390 | 0 / 0 | 10.35 | n/a | 0 | 85 |
| calculator | 1280 | 390 | 0 / 0 | 6.78 | 12.18 | 2 | 145 |
| /contact | 1280 | 390 | 0 / 0 | n/a | 12.18 | 1 | 11 |

Contrast computed from `getComputedStyle` with each colour resolved through a 1x1 canvas, so
`oklch()` and `oklab()` values convert properly. Every measured value passes WCAG AA; the navy CTA
(white on `rgb(15,58,74)`) is the strongest on any of my four sites at 12.18. Zero em-dashes and zero
en-dashes in visible body text on all 7 pages; no US spellings ("optimisation" is the British form).
No images anywhere, so no missing alt text. Every form input has a label or `aria-label`.
No placeholder phone numbers or emails, and no `tel:` or `mailto:` links. `.prose` **does** have rules
applied: `.prose p` on the blog post computes `margin-bottom: 20px`, `font-size: 18px`,
`line-height: 31.5px`, which confirms `prose-standard.css` is live here. The homepage comparison table
overflows to `right=401` but sits inside a `div` with `overflow-x: auto`, which is correct.
Footer CTA target is `/contact`, which does render a form.

### Sameness

| Scope | Result |
|---|---|
| Within site, 5 `/for/*` and 8 `/services/*` closers | **Identical across all 13**, and the shared text is the footer entity block, not a close |
| Against Property's `/for/` close | **Different in substance.** Property closes with "A couple of sentences helps us prepare properly for your call." then the consent sentence then "We respond within 24 hours and store your details securely. You will get a text and email from us straight away. A quick reply confirms your callback." Pharmacies has a form on its segment pages but no closing copy attached to it, so the page ends on the footer |
| Foot form | One 6-input form on `/`, `/contact`, each `/services/*` and 4 of 5 `/for/*`; 2 forms of 5 inputs on the calculator; no `form_id` and no hidden fields exposed anywhere |
| Consent sentence | Visible verbatim on the calculator form, matching Property's word for word, and exempt under rule 8 |

## Corrections to the inventory

| Row | Wave 1 said | Correction | Evidence |
|---|---|---|---|
| G8 | "?", could not say whether the canonical defect is present | Settled: **no defect**. Every one of 10 URLs checked, hubs included, self-references. Pharmacies is the only one of my four sites that is clean here | canonical sweep |
| G3, C4 | "?", FAQPage builder exists, per-page wiring not confirmed on all 13 pages | Confirmed wired: FAQPage renders on all 5 `/for/*`, all 8 `/services/*` and the calculator. But Service and BreadcrumbList are absent on all 13, so the pages do **not** follow Property's template | schema greps on 12 URLs |
| L1 | "XS", same shape as Property, `LeadForm` on `/for/[slug]` | Nearly true, with one exception wave 1's file-level grep could not see: **`/for/locum-pharmacists` renders zero forms** while the other four do | rendered form counts on all 5 |
| L8 | "?", Aswatax message presence not verified | Confirmed present and correctly named on `/thank-you`. Also confirmed `/book` renders zero forms without a token, so this site does share Property's `/book` dead end | rendered |
| C1 / C7 | posts are DB-backed, dates not readable from the filesystem | Still open for dates, but the rendered blog post does apply `.prose` styling correctly, which closes the D2-adjacent half of that worry | rendered computed styles |
| D7 | "?" | Settled: 390 on all 7 pages, with the gov.uk control at 390 | rendered |
