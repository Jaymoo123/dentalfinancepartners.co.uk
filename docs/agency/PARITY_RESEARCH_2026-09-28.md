# Agency Founder Finance parity research (2026-09-28)

Domain: agencyfounderfinance.co.uk (`www.` canonical). Vercel project `agency-founder-finance`
(per STATE.md). Launched: yes. Live status: `curl -sI https://www.agencyfounderfinance.co.uk/`
returned `HTTP/1.1 200 OK` (2026-09-28). `/robots.txt`, `/llms.txt`, `/llms-full.txt`,
`/sitemap.xml` all returned 200.

Docs note: both `docs/digital-agency/` (one file, a 2026-06 frontmatter preflight note) and
`docs/agency/` (STATE.md plus the working diagnosis corpus) exist. `docs/agency/` holds
STATE.md, so this report is written there.

## Verdict in three lines

Agency has the full lead-capture and nurture plumbing (forms, mini-captures, intent engine,
chat widget, consent-gated GA4, organization/FAQ schema, llms.txt/llms-full.txt) built to a
level close to Property, and it is live. The three biggest gaps: it has never been through the
design port (no `port-digital-agency-*` or `port-agency-*` tag, zero `web-shared/design`
imports), its segment pages are three static one-off routes instead of Property's 15-page
`/for/[slug]` template with Service+FAQPage+BreadcrumbList schema, and the site is still
crawl-starved with a content corpus that stopped dated 2026-07-28 (no post newer than that,
zero posts in the >=2026-07-30 window) while GSC indexation sits at roughly 4% per the last
diagnosis. One pre-submit copy defect found: `/contact` still carries "specialist firm from
our partner network" ahead of the form (rule 8 defect); the equivalent wording on `/thank-you`
is the deliberate Aswatax-pattern post-submit disclosure (commit `18b4f25f3`) and is not a
defect; `/complete` carries the same post-submit wording but was not touched by that commit,
so it is flagged as a question rather than a finding either way.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | n/a (no `entity` key documented as standard) | No `entity` key in `digital-agency/niche.config.json` (grepped whole file for `"entity"`, no match) | N/A | Property's own `entity` key was not independently confirmed either; treat as unresolved estate-wide, not agency-specific |
| P2 | 0 pre-submit caveat instances (ruling 09-28) | 19 hits of caveat phrases across 8 files. Breakdown: `privacy-policy/page.tsx` (3, exempt, legal page), `Wizard.tsx` health-check consent text (2, exempt, consent), `lead-payload.test.ts` (test file, not a surface), `niche.config.json` `partner.name` (source string for consent text, exempt), `thank-you/page.tsx:81` (post-submit, confirmed deliberate Aswatax-pattern disclosure via `18b4f25f3`, exempt), `complete/page.tsx:94,119` (post-submit "partner network" wording, NOT confirmed as the sanctioned pattern, same commit did not touch this file), `contact/page.tsx:88` ("...specialist firm from our partner network may contact you directly", this is PRE-submit, prospect-facing copy on the contact page itself) | S | `contact/page.tsx:88` is a live defect under rule 8: caveat language sits on a prospect-facing page ahead of submission. `complete/page.tsx:94,119` is a question, not a confirmed finding |
| P3 | "free first call" language, e.g. hero CTA | 116 hits of "free health check" / "free call" / "free review" style copy across `web/src` and `niche.config.json`; sticky CTA copy is "Free Agency Finance Health Check" / "Claim free check" (`niche.config.json:271-274`) | NONE | Consistent with Property's "free first call" framing, no caveat attached |
| P4 | "within 24 hours" appears ~115 times, no nurture email backs it (known Property defect) | 15 hits across `contact/page.tsx`, `guides/[slug]/data.ts`, `services/page.tsx`, `ExitIntentModal.tsx`, `InlineMiniLeadForm.tsx`, `LeadForm.tsx`, `MiniCapture.tsx`, `config/lead-nurture.ts`, `lib/leads/aux-cron.ts`, `lib/leads/booking.ts` | ? | Did not read whether the actual nurture-email body text in `lead-nurture.ts` promises 24h delivery on a send that fires later than 24h; the config wires `delayHours` steps up to 264h (11 days), so at minimum some later touches would contradict an unqualified "24 hours" promise if one exists on-page. Not fully verified either way |
| P5 | Shared `organization.ts` builder, AccountingService, firm-first, `sameAs`, `parentOrganization`, `knowsAbout` | `digital-agency/web/src/lib/organization-schema.ts` is a documented backwards-compat shim that delegates to `./schema/organization.ts` ("canonical Organization schema... composable + canonical-@id'd"); no `web-shared` import found in either file, so this site's schema builder is its own local copy, not Property's shared package builder | S | Functionally similar in intent (single canonical builder, shim preserved for call-sites) but not verified to be the SAME shared package as Property's `packages/web-shared/schema/organization.ts`; did not diff field-by-field (`sameAs`, `parentOrganization`, `knowsAbout` presence unconfirmed) |
| P6 | Firm-first, UTM-tagged links | `public/llms.txt` opens firm-first ("Agency Founder Finance provides specialist accounting..."), lists key pages, cites 2026/27 rates; zero links carry `utm_source=chatgpt&utm_medium=llms` (`grep -c "utm_source=chatgpt"` = 0) | S | Voice matches the standard; the UTM tagging convention documented for Property is absent here |
| L1 | Foot lead form on home/services/segment/service/blog/calculators/contact | `LeadForm.tsx` exists in `components/forms/`; did not individually confirm mount points on every page type (home, about, services, `for-*`, calculator, blog post, contact) | ? | Confirmed the component exists and is imported estate-wide via `role-labels.ts` (`lead_form` surface id is tracked); page-by-page mount audit not completed in the time available |
| L2 | 7 mini-capture surface ids | Found 6 of 7 as tracked surface ids in `role-labels.ts`: `lead_form`, `exit_intent`/`exit_intent_form`, `inline_mini`, `calc_result`, `calc_result_gate`, `mobile_tool`, `resource_block`, `specialist_widget`, this is actually 8 distinct ids, a superset of Property's list; `calc_page_footer` and `blog_short_resource` (Property-specific ids) not present under those exact names | S | Different naming scheme, not necessarily missing functionality; `calc_result_gate` and `specialist_widget` are ids Property's list in the brief does not name |
| L3 | One form under the result, no gate, no PDF offer (gate removed 09-27) | `PremiumCalculator.tsx` still mounts `ResultGateModal.tsx`, a result-gate interstitial, but the modal's own header comment states an always-present escape hatch (X, backdrop, Esc, "No thanks" all reveal without capture), scoped to in-blog premium calculators only, and no PDF offer found (`grep -n "PDF\|pdf" PremiumUpgrade.tsx` = no hits) | M | This is a materially softer gate than what Property removed 09-27 (never blocks the result), but it is still a gate Property no longer has anywhere; whether the plain `/calculators/[slug]` route (non-premium) also gates was not separately confirmed |
| L4 | 6 static calculator route dirs + premium + `/embed` | One dynamic route `app/calculators/[slug]/page.tsx` plus `app/calculators/page.tsx` index, plus `app/embed/` | ? | Did not enumerate the slugs served by the dynamic route or check FAQPage/cite-this presence per calculator; dynamic-route architecture is a structural difference from Property's static-dir pattern, not inherently a gap |
| L5 | `SpecialistWidget.tsx`, mounted where | `components/support/SpecialistWidget.tsx` exists, imported in `app/layout.tsx` (mounted globally at layout level) | NONE | Same component name and global mount as Property's pattern implies |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | All three present under `components/intent/` and imported in `layout.tsx` | NONE | Full intent engine present |
| L7 | Sticky CTA + hero CTA from `niche.config.json` | `components/ui/StickyCTA.tsx` present; hero/sticky copy sourced from `niche.config.json` `cta` block (`sticky_primary`, `sticky_secondary`, `sticky_button`) | NONE | Matches Property's pattern |
| L8 | thank-you, complete, `/book`, Aswatax message | `app/thank-you`, `app/complete`, `app/book` all exist; `BookingPicker.tsx` and `DetailsForm.tsx` present in `components/forms/`; Aswatax-pattern message confirmed present on `/thank-you` (commit `18b4f25f3`) | XS | Present and largely matches; whether `/book` is tokened (renders a form vs Property's dead untokened `/book`, a known Property defect) not confirmed |
| L9 | `delayHours` = gaps, 8-step Property sequence, SMS ack | `config/lead-nurture.ts` defines at least two sequences: one running `0,0,4,24,48,96,168,264` and a second `0,24,48,168`; did not confirm gap-vs-cumulative semantics match Property's convention, or count total emails, or confirm SMS ack | ? | Structure exists and resembles Property's shape; semantics and SMS ack not independently verified |
| L10 | Category-driven blog CTA via `BlogCategoryHub`/`BlogSidebarCta`/`CTA_BY_CATEGORY` | No `BlogCategoryHub.tsx` or `BlogSidebarCta.tsx` found under `components/blog/`; blog components present are `AuthorByline.tsx`, `BlogListWithSearch.tsx`, `BlogPostCard.tsx`, `BlogPostRenderer.tsx`, `ExitIntentModal.tsx`, `FundamentalsRenderer.tsx`, `InlineMiniLeadForm.tsx` | M | Blog CTA mechanism here is `InlineMiniLeadForm` plus exit-intent, not Property's category-driven hub/sidebar pattern; did not check for dead code equivalent to Property's `categorySlug`-unused defect |
| L11 | Property's consent text, estate-wide diff | `config/site.ts` `leadConsentText`: "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this." | ? | Did not pull Property's exact string to diff word-for-word; this text is explicitly exempted from the positioning ruling (consent surface) regardless of wording |
| L12 | CHECK constraint accepts `dentists/property/medical/solicitors/general/agency` | Not independently confirmed which literal string `/api/leads/submit` sends for this site; `agency` is in the known-accepted list per memory | NONE (assumed) | Did not read the submit route source in this pass; flagging as assumed-fine off the memory note rather than fresh evidence |
| G1 | Explicit allowlist, Google/OpenAI/Anthropic/Perplexity/Apple/Meta bots | `robots.ts` explicitly allowlists Googlebot family, GPTBot/OAI-SearchBot/ChatGPT-User, ClaudeBot/anthropic-ai/Claude-Web/Claude-SearchBot/Claude-User, PerplexityBot/Perplexity-User, Applebot/Applebot-Extended, Meta-ExternalAgent/Meta-ExternalFetcher; disallow list deliberately minimal (thank-you, `/api/og`, mutating `/api/*`) | NONE | Matches the standard shape |
| G2 | Shared builder, `sameAs`, `parentOrganization`, `knowsAbout` | See P5: local `schema/organization.ts`, not confirmed as the shared `web-shared` package; field presence not confirmed | S | Same finding as P5 |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | Not confirmed page-by-page; `for-growth-stage`, `for-new-founders`, `for-pre-exit` exist as static routes (see C4) | ? | Did not open these route files to check schema composition in this pass |
| G4 | BlogPosting, `author` as Org/Person, real `dateModified` | Frontmatter shows `author: "Agency Founder Finance Editorial Team"` (Organization-style byline); 54 files carry `reviewedAt`/`dateModified` fields out of 306 posts | M | Only ~18% of posts carry review/modified dating; did not confirm whether BlogPosting JSON-LD actually renders these fields or whether the rest fall back to publish date |
| G5 | Route-based, firm-first, UTM-tagged | `public/llms.txt` is a static file (not a route), firm-first, lists commercial pages, no UTM tags (see P6) | S | Static vs Property's likely route-derived file is a maintenance difference, not itself a defect; missing UTM is the real gap |
| G6 | `buildLlmsFullRoute`, post count, size vs 19.07 MB ceiling | `app/llms-full.txt/route.ts` uses `buildLlmsFullRoute` from `@accounting-network/web-shared/content/llmsFull`, sections = fundamentals/blog/research, `revalidate: 3600` | NONE | Uses the same shared builder as the standard; size not measured against the ISR ceiling in this pass |
| G7 | Real or omitted `lastModified`, hreflang | `sitemap.ts` uses `STATIC_LAST_MOD` fallback for most routes, real `post.updatedDate`/`post.date` for blog/guide entries; hreflang present via a `hreflang()` helper applied per-URL | XS | Mixed: real dates for content, a static constant for structural pages, same pattern the brief treats as acceptable (not the "build-time now" defect) |
| G8 | Canonical-hub fix shape from late-Sept commits | `git log --since=2026-09-26 --grep=canonical --oneline -- digital-agency/` returned no commits | ? | Either this site never needed the canonical-hub fix (no hub-page canonical bug existed here) or it has not been applied; cannot distinguish from repo evidence alone |
| G9 | noindex nowhere it shouldn't be; `/embed` rule | `robots.ts` disallows `/thank-you`, `/api/og`, mutating `/api/*` only; `/embed` route exists under `app/embed/` | ? | Did not check for a page-level `noindex` meta tag sweep or confirm `/embed`'s own robots rule |
| G10 | GSC config entry, IndexNow + key, Bing verified | `agents/config/gsc_config.py:145` has an `"agency"` entry (`site_url: sc-domain:agencyfounderfinance.co.uk`, `site_key: agency`); `digital-agency/pipeline/submit_indexnow.py` exists | ? | IndexNow key file presence in `web/public/` and Bing Webmaster verification status not checked |
| G11 | 2026-09-27 AI-naming baseline coverage | Did not read `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 in this pass | ? | Not determined |
| C1 | 806 posts, recent dates | 306 posts total (`content/blog`); newest `date:` frontmatter found = 2026-07-28; 0 posts with `date >= 2026-07-30` found in a spot sample of the three most recent | L | Corpus is stale by about two months against the brief's cutoff; matches STATE.md's crawl-starvation diagnosis (18/433 indexed as of 2026-07-08) |
| C2 | `docs/property/house_positions.md` | `docs/agency/house_positions.md` exists | NONE | Present |
| C3 | `COVERAGE_MAP_2026-09.md` | No file by that name; `docs/agency/index_coverage.md` exists instead, dated to the 2026-07-08 diagnosis wave | S | Different filename/vintage, not the named coverage-map convention |
| C4 | `/for/[slug]` dynamic, 15 pages, Service+FAQPage+breadcrumb+form+stat-tiles template | Three static routes: `app/for-growth-stage`, `app/for-new-founders`, `app/for-pre-exit`; no `/for/[slug]` dynamic route or `data/audiences.ts`-style data source found | L | Static one-off pages instead of a scalable templated segment-page system; 3 pages vs Property's 15; template conformance (schema, form, stat tiles) not individually checked |
| C5 | `/services/*` and money pages | `app/services/page.tsx` is a single services page (not a `/services/*` directory); money-adjacent pages include `app/r-and-d-credits`, `app/incorporation`, `app/free-health-check`, six relocation pages (`dubai-relocation`, `cyprus-relocation`, `estonia-relocation`, `greece-relocation`, `italy-relocation`, `malta-relocation`, `portugal-relocation`, `singapore-relocation`, `switzerland-relocation`) | ? | Structurally different from Property's `/services/*` directory; not itself graded as a gap without knowing Property's exact page count for comparison |
| C6 | validator pass/fail counts | `scripts/validate_blog_content.py` `SITES` dict (line 30) lists `Property, Dentists, Medical, Solicitors, contractors-ir35, care, charities` only; `digital-agency`/`agency` is not a key | N/A | Site unsupported by the validator; could not run it |
| C7 | `dateModified`/`reviewedAt` presence | 54 of 306 posts (~18%) carry `reviewedAt`/`dateModified` fields (grep count) | M | Most of the corpus has no explicit review-dating field |
| C8 | Person / Editorial Team / Organization byline | `author: "Agency Founder Finance Editorial Team"` on all sampled posts (Organization-style, no named people found) | NONE | Consistent with the estate's Editorial Team convention |
| C9 | Link audit tool | No `scripts/` or `pipeline/` link-audit tool found specific to this site in the time available | ? | Not determined; did not search exhaustively |
| D1 | Port tag + `web-shared/design` imports | `git tag -l "port-digital-agency-*"` and `git tag -l "port-agency-*"` both returned nothing; `grep -rl "web-shared/design" digital-agency/web/src \| wc -l` = 0 | L | This site has not been through the design port programme at all |
| D2 | `prose-standard.css` import | `globals.css:6` imports `../../../../packages/site-styles/prose-standard.css` | NONE | Present despite no design port |
| D3 | Header CTA hides below 1024 | Not checked (would require a rendered DOM check; live-site browser pass not run in this session) | ? | Not determined |
| D4 | Favicon set, `og:image` not SVG, `metadataBase` | `public/favicon.ico` exists; `layout.tsx:67` has an `openGraph` block; `metadataBase: new URL(siteUrl)` set in `layout.tsx` metadata | XS | `og:image` file type/path not individually opened to confirm it is not SVG |
| D5 | Fonts | `Plus_Jakarta_Sans` from `next/font/google` (`layout.tsx:2,22-26`) | N/A | Different typeface choice from whatever Property uses (Geist Sans per the generalist design system note); not graded as a gap, a design decision |
| D6 | StatsCounter/stat-tile literal-value support | Not checked in this pass | ? | Not determined |
| D7 | 390px real-emulation scrollWidth | Not run: no puppeteer session launched in this pass (time budget); flagged per rule 7, source-only grading applied elsewhere in this table | ? | Requires a follow-up pass with `puppeteer-core` and a gov.uk control screenshot |
| D8 | Playbook 9.1 kit-adoption gate numbers | Not run in this pass | ? | Requires reading `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 and executing its check as written; not done here |
| I1 | Live status codes | `/` 200, `/robots.txt` 200, `/llms.txt` 200, `/llms-full.txt` 200, `/sitemap.xml` 200 (all `curl -sI`, 2026-09-28) | NONE | Fully live |
| I2 | Vercel project + deploy date vs HEAD | STATE.md names production SHA `435cc12e` deployed 2026-08-24, but three commits have landed for this dir since 08-25 (`51acda3b8`, `18b4f25f3`, `0349d5008`, most recent dated by content 2026-09-13-ish per `git log -1 --format=%cd -- digital-agency/` = 2026-09-13); STATE.md itself is not re-dated past 08-25 | S | STATE.md's deploy pointer is stale by at least those three commits; whether they have actually been deployed to Vercel was not checked (no Vercel API call made in this pass) |
| I3 | Test count, CI coverage | 9 `.test.ts(x)` files under `web/src`; `.github/workflows/ci-build-test.yml` references `digital-agency` | NONE | CI covers this site |
| I4 | GA4 present, CSP allows region1, consent banner | `layout.tsx` comment confirms a legacy `GoogleAnalytics.tsx` was removed in favour of `ConsentedScripts` inside `ConsentProvider` (both from `@accounting-network/web-shared/analytics/react/*`), gated on visitor consent; `ConsentToggle` present in footer per the comment; CSP itself built via shared `buildSecurityHeaders` from `web-shared/lib/security-headers`, not independently re-read for the literal `region1.google-analytics.com` string in this site's own config | XS | Analytics wiring is correctly consent-gated via the shared package (an improvement over the "unconditional GA4 in head" defect the comment describes fixing); STATE.md's "GA4 not configured" note is stale, should be corrected |
| I5 | site_flags / env flags read | Not enumerated in this pass (`grep getFlag\|site_flags\|process.env.NEXT_PUBLIC_` not run) | ? | Not determined |
| I6 | monitored_pages rows | Not checked (would require Supabase read) | ? | Unknown from repo |
| I7 | STATE.md currency | `docs/agency/STATE.md` newest entry is the 2026-08-25 port-merge note; three commits landed for this dir after that with no STATE.md update, and the file's own "GA4 not configured" note is contradicted by the current `layout.tsx` (see I4) | S | STATE.md needs a refresh: analytics note is stale, deploy pointer is a month old |

## Unique to this site

- Multi-jurisdiction relocation pages not seen described in Property's kit list: `dubai-relocation`, `cyprus-relocation`, `estonia-relocation`, `greece-relocation`, `italy-relocation`, `malta-relocation`, `portugal-relocation`, `singapore-relocation`, `switzerland-relocation`, a founder-relocation content set specific to this niche.
- A free-standing `free-health-check` flow (`Wizard.tsx` under `components/health-check/`) distinct from Property's calculator-first lead capture, with its own consent-text constant.
- `crunch-alternative`, `mazuma-vs`, `specialist-vs-generalist-accountant`, competitor-comparison pages, a page type not listed in Property's kit.
- `PremiumCalculator`/`PremiumUpgrade`/`ResultGateModal` tooling under `components/tools/premium/` is a more developed premium-calculator tier than the brief's description of Property's plain `ResultCaptureForm`/`ResultGate.tsx`, including a documented escape-hatch discipline and analytics event allowlisting not described for Property.

## Shares Property's open defects

- The `/complete` route (L8/P2) carries the same generic "partner network" wording pattern as the exempted `/thank-you` message, but was not part of the confirmed Aswatax-disclosure commit, this needs an owner or engine-level look rather than being assumed fine by analogy.
- STATE.md drift (I7) mirrors a pattern likely present estate-wide: per-site STATE.md files falling behind actual commits and actual production config.
- Did not confirm or rule out the footer `/book` dead-end defect described for Property (L8); `app/book` exists here but was not opened to check whether it renders a form.
- Did not confirm or rule out the "24-hour promise with no email backing it" defect (P4) here; the promise language exists (15 hits) but nurture-email body text was not read against it.

## Questions (missing data, not findings)

1. Is `complete/page.tsx`'s "partner network" wording the sanctioned Aswatax-pattern message, or a leftover pre-ruling caveat that needs the same fix `18b4f25f3` applied to `thank-you/page.tsx`?
2. Does this site's `schema/organization.ts` share code with Property's `packages/web-shared/schema/organization.ts`, or is it a genuinely separate implementation? Field-level diff (`sameAs`, `parentOrganization`, `knowsAbout`) not done.
3. Have the three commits since STATE.md's 08-25 snapshot (`51acda3b8`, `18b4f25f3`, `0349d5008`) actually deployed to the live Vercel production alias? Not checked against the Vercel API.
4. Do the `for-*` static segment pages and `/services` carry Service+FAQPage+BreadcrumbList schema at Property's level, and one form plus stat tiles? Not opened.
5. 390px real-emulation results, StatsCounter literal-date handling (D6), and the playbook 9.1 kit-adoption numbers (D8), none run in this pass; would need a follow-up with `puppeteer-core`.
6. Is IndexNow key file present under `web/public/` and is Bing Webmaster verified for this site? Not checked.
7. `site_flags`/env flag reads (I5) and `monitored_pages` rows (I6) not enumerated; would need a code grep and a Supabase read respectively.

## Commands and files read

- `cat digital-agency/niche.config.json` (partner, cta, brand sections; no `entity` key found)
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" digital-agency/web/src digital-agency/niche.config.json digital-agency/web/public` (19 hits, 8 files)
- `git show --stat 18b4f25f3` (confirms Aswatax disclosure touched `thank-you/page.tsx` and `LeadForm.tsx` only, not `complete/page.tsx`)
- `cat digital-agency/web/src/config/site.ts` (leadConsentText, resourceConsentText)
- `cat digital-agency/web/src/lib/organization-schema.ts`, `grep -n "web-shared" ...schema/organization.ts`
- `head -20 digital-agency/web/public/llms.txt`; `grep -c "utm_source=chatgpt" digital-agency/web/public/llms.txt` (0)
- `cat digital-agency/web/src/app/llms-full.txt/route.ts`
- `ls digital-agency/web/src/components/forms`, `.../support`, `.../blog`; `find ... -iname "*intent*" -o -iname "*sticky*"`
- `cat digital-agency/web/src/lib/leads/role-labels.ts` (mini-capture surface ids)
- `sed -n '1,50p' digital-agency/web/src/components/tools/premium/ResultGateModal.tsx`; `grep -n "PDF\|pdf" PremiumUpgrade.tsx`
- `cat digital-agency/web/src/app/robots.ts`
- `grep -n "lastModified\|hreflang" digital-agency/web/src/app/sitemap.ts`
- `git tag -l "port-digital-agency-*"`, `git tag -l "port-agency-*"`; `grep -rl "web-shared/design" digital-agency/web/src | wc -l` (0)
- `grep -n "prose-standard" digital-agency/web/src/app/globals.css`
- `curl -sI` on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`
- `grep -n "delayHours" digital-agency/web/src/config/lead-nurture.ts`
- `find digital-agency/web/content/blog -type f | wc -l` (306); `grep -h "^date:" *.md | sort -r | head -3` (newest 2026-07-28)
- `grep -rl "reviewedAt\|dateModified" digital-agency/web/content/blog/*.md | wc -l` (54)
- `grep -h "^author:" digital-agency/web/content/blog/*.md | sort -u`
- `find docs/agency -iname "house_positions*" -o -iname "*coverage*"`
- `git log --since=2026-08-25 --oneline -- digital-agency/` (3 commits); `git log -1 --format=%cd --date=short -- digital-agency/`
- `find digital-agency/web/src -iname "*.test.ts*" | wc -l` (9); `grep -rl "digital-agency" .github/workflows/`
- `sed -n '1,40p' digital-agency/web/src/app/layout.tsx` (GA4/consent wiring, IntentProvider/ReturningBar/DeepScrollModal/SpecialistWidget imports)
- `grep -n "^SITES" -A 40 scripts/validate_blog_content.py` (digital-agency not a supported key)
- `cat docs/agency/STATE.md` (tail 100 lines)
- Read `docs/_engines/ESTATE_PARITY_RESEARCH_BRIEF_2026-09-28.md` in full before starting

---

# Wave 2 reader pass (2026-09-28)

Rendered with `puppeteer-core` (repo root) on Chromium `ms-playwright/chromium-1223`.
Mobile = `page.emulate` viewport 390x844, `deviceScaleFactor: 3`, `isMobile: true`,
`hasTouch: true`, iPhone UA. **Control: `https://www.gov.uk` under the same code returns
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing
elements**, so the emulation is honest. Pages rendered: `/`, `/about`, `/services`,
`/for-growth-stage`, `/blog/incorporation-and-structure/when-to-incorporate-agency`,
`/calculators/agency-valuation`, `/contact`.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS. Header CTA visible at 1280, hidden at 390 | Rendered `getBoundingClientRect`: at 1280 "Contact" 88x38 and "Book consultation" 188x52 visible; at 390 both 0x0 and not visible. Same on all seven pages |
| D5 | Plus Jakarta Sans, via `next/font/google` | Applied body `font-family` is "Plus Jakarta Sans", "Plus Jakarta Sans Fallback" on all seven pages |
| D6 | N/A, the site has no stat component | `grep -rl StatsCounter digital-agency/web/src` returns 0 files and the comment-stripped homepage marker is `stats=0` |
| D7 | `scrollWidth = 390` on all seven pages. One image overflows and is clipped on the blog post | Real emulation. `img.object-cover.scale-110` reports a right edge past `innerWidth` at 390 while `scrollWidth` stays 390, so the image is cropped by the `scale-110` transform rather than scrolling |
| D8 | **THE GATE FAILS ON FOUR ROWS.** 1=**0**; 2=**0 distinct / 0 call sites**; 2a=0; 2b **adopted=0 declined=0**; 3=`next/font/google`; **4=0**; 5=Eyebrow 0, section-label 0; 6=2 ring lines; 7=**15 gradient files**; 8=walks 0, guards-the-guard 0. Markers ping 0, stats 0, backdrop 0, rounded-full 0 | Section 9.1 block run verbatim from `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Row 1 fail means every container, section and button recipe is a hand-rolled copy. Row 2 at 0 distinct is the playbook's explicit "has not adopted anything and does not close". Row 2b at adopted 0 / declined 0 is the fail case: no kit marketing component and nothing written down about why. Row 4 fail means no site backdrop component. The four-marker thermometer reads **0/0/0/0, which is exactly crypto's pre-uplift reading, the one the owner called "not there"**. **digital-agency has never been through the design port.** `git tag -l 'port-digital-agency-*'` returning nothing in wave 1 is consistent |
| G7 | The live sitemap's newest `lastmod` is 2026-07-28 | `curl /sitemap.xml` distinct dates end at 2026-07-28, so the deployed build is two months old and the static-constant pattern wave 1 found is what is live |
| G8 | Defect ABSENT. Hub canonicals self-reference | `/` to `/`, `/blog` to `/blog`, `/calculators` to `/calculators`, `/services` to `/services` |
| G9 | Correct. `noindex` only on `/embed/*` | The four hub pages carry no `noindex`; `/embed/salary-dividend-optimiser` does. NIT: that embed page canonicals to the homepage, not itself |
| L3 | Two forms on the calculator page at initial render, one a 5-input capture and one a 3-input capture, and no gate copy served | Rendered form count 2 (5 and 3 inputs) on `/calculators/agency-valuation`. A grep of the served HTML for "no thanks", "unlock", "show me the result", "PDF" and "download" returns no hits, and only one `backdrop-blur`, against three on generalist. The premium in-blog gate wave 1 found is a separate surface and could not be triggered by GET |
| L4 | 8 calculators | Live sitemap: salary-dividend-optimiser, rd-tax-credit-estimator, agency-valuation, badr-cgt-calculator, vat-scheme-comparator, pension-contribution-optimiser, take-home-pay-calculator, employer-ni-calculator. The smallest calculator set of the four sites, against Dentists 13, Solicitors 13, generalist 21 |
| L8 | **`/book` is a dead end and DOES share Property's defect.** The Aswatax line is present | Rendered `/book` returns 200 with a form count of 0 and zero inputs, under "Book your free review call". `curl /thank-you` and `curl /complete` both carry "Aswatax, a firm of Chartered Tax Advisers. If your enquiry needs that level of advice, ..." |
| G3 | The three `/for-*` pages all close on identical copy, which is the shape of a template without the schema | see the sameness table below; schema composition still needs a source read, so this row stays "?" on the schema question |

## Reader findings

The voice is right. One caveat sentence on seven pages, on `/contact`, and nothing else
needs rewriting for the 09-28 ruling. That makes this the second cleanest of the four on
positioning after generalist.

The design is the problem, and it is a programme rather than a fix. The playbook's
kit-adoption gate fails on four separate BLOCKER rows: no shared `layout-utils`, zero kit
components imported anywhere in the site, no kit marketing component and no recorded
decline, and no backdrop component. The four-marker thermometer reads 0/0/0/0, the same
reading the owner looked at on pre-uplift crypto and said it was not there.

Third, the three segment pages are word-for-word identical in their close, and fifteen
files carry gradients whose focus rings and controls have never been measured stop by stop.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | site-wide | Playbook 9.1 rows 1, 2, 2b and 4 all fail. The site has never been ported | layout-utils 0, kit adopted 0 distinct / 0 call sites, homepage marketing adopted 0 declined 0, backdrop 0, markers 0/0/0/0 | L |
| BLOCKER | site-wide | 15 files carry gradients and none of their stops has a measured ring or control contrast. Row 7 of the gate exists because a gradient `via` stop measured 1.98 on charities where two hero CTAs sat | `grep -rlE 'bg-gradient-to\|linear-gradient' digital-agency/web/src` = 15 files, against 2 on Dentists, 1 on Solicitors, 4 on generalist | M |
| BLOCKER | /book | Renders zero forms under the heading "Book your free review call" | rendered form count 0, inputs 0 | S |
| FIX | /for-new-founders, /for-growth-stage, /for-pre-exit | All three close on identical copy, twice over | every one ends "Want to read first? Our pillar guides cover the fundamentals in depth." then "60-min review with a specialist agency accountant. No obligation." | S |
| FIX | /contact | One caveat sentence | "A specialist firm from our partner network may contact you directly." | XS |
| FIX | blog post | An image overflows the phone viewport and is clipped by its own transform | at 390, `img.object-cover.scale-110` has a right edge past `innerWidth`; `scrollWidth` stays 390 so part of the image is simply cut | XS |
| FIX | home, /about, /services, /for-growth-stage, /contact, blog post, calculator | Every page carries at least one unlabelled `enquiry_ref` input; the blog post carries three | rendered unlabelled lists: `enquiry_ref` on five pages, three occurrences on the blog post, two on the calculator | XS |
| FIX | site-wide | Focus indication is a 2px ring at 25 per cent alpha plus a border change, `outline-style: none` | Tab to `select[name=role]` on `/contact`, `:focus-visible` matches, outline `none 1px`, box-shadow ring `oklab(0.511 0.0317755 -0.260066 / 0.25) 0 0 0 2px` | XS |
| FIX | site-wide | Playbook 9.1 row 8 fails, no `readdirSync` focus-ring guard | walks 0, guards-the-guard 0 | S |
| NIT | blog post | One AI tell at 1280 | "unlock" in visible body text; it is absent at 390, so it sits in a desktop-only block | XS |
| NIT | site-wide | No footer booking or consultation link in the rendered DOM | footer link scan for "book", "consult", "call" returns an empty list on all seven pages | S |
| NIT | /about, /services | Both titles repeat the brand name twice | "About Agency Founder Finance \| Specialist Agency Accountants for Founders \| Agency Founder Finance" | XS |
| NIT | /contact | The reply promise is one working day, which is a promise no nurture email was shown to back | "We aim to reply within one working day." | XS |
| NIT | /calculators/agency-valuation | The title says 2025 and the copy says "Indicative 2025 market ranges" on 2026-09-28 | rendered title "Agency Valuation Calculator 2025 \| Free UK Tool"; body "Indicative 2025 market ranges." | XS |

Writing, measured: **em-dashes 0 on all seven pages. US spellings 0. AI tells 1 ("unlock",
blog post, 1280 only).** Readability: the answer is in the first paragraph on home, /about,
/services, /for-growth-stage, the calculator and /contact; the blog post opens on the byline
strip "8 min read, Published 16 May 2026, Updated 17 May 2026". h1 and title agree with the
page promise on all seven pages. The homepage h1 "Accountants for marketing agencies and 18
other types." is the clearest firm-voice h1 of the four sites.

### Design numbers

| Page | sw 1280 | sw 390 | overflow at 390 | body contrast | CTA contrast | forms | sticky at 390 | chat |
|---|---|---|---|---|---|---|---|---|
| / | 1280 | 390 | none | 17.85 | 7.65 | 1 | 2 | none |
| /about | 1280 | 390 | none | 17.85 | 7.65 | 1 | 2 | none |
| /services | 1280 | 390 | none | 17.85 | 7.65 | 1 | 2 | none |
| /for-growth-stage | 1280 | 390 | none | 17.85 | 7.65 | 1 | 2 | none |
| blog post | 1280 | 390 | `img.object-cover.scale-110` | 17.85 | 7.65 | 3 | 2 | none |
| /calculators/agency-valuation | 1280 | 390 | none | 17.85 | 7.65 | 2 | 2 | none |
| /contact | 1280 | 390 | none | 17.85 | 7.65 | 1 | 2 | none |

CTA contrast 7.65 is the best of the four sites. Images without alt: 0 on all seven pages.
No chat widget in the rendered DOM on any page.

### Sameness

| Comparison | Result |
|---|---|
| Segment page closers within the site | **Identical across all three.** `/for-new-founders`, `/for-growth-stage` and `/for-pre-exit` each end on "Want to read first? Our pillar guides cover the fundamentals in depth." followed by "60-min review with a specialist agency accountant. No obligation." This is Property's identical-closers defect, reproduced on a smaller page set |
| Service page close | Different wording: "Book a free call. We will review your current situation and give you clear recommendations. No obligation, no hard sell." then the same "60-min review" line, so the shared line reaches four pages |
| Against Property's shared close | Partly shared in shape, not in words. Property closes "Free first call, then a fixed fee in writing" and "Book a free first call. No obligation, no hard sell. If we take the work on, you get a fixed fee in writing before anything starts." digital-agency's `/services` line "No obligation, no hard sell" is the same clause; the rest differs |

## Corrections to the inventory

1. **D8 "?"** is the important one. The gate fails on four BLOCKER rows and the marker row
   reads 0/0/0/0. Wave 1's report gives no sense that digital-agency is the one unported
   site of the four, and the gap table should carry that as an L on D1 and D8.
2. **L8 "XS"** understates it: rendered `/book` returns zero forms, so digital-agency shares
   Property's dead-`/book` defect. The Aswatax half of the row is confirmed correct.
3. **G3 "?"** is partly settled on the template question: all three `/for-*` pages render
   identical closing copy, so they are one template. The schema question is still open.
4. **G8 "?"** closes as defect-absent: hub canonicals self-reference live.
5. **G9 "?"** closes as correct: `noindex` only on `/embed/*`.
6. **L4 "?"** closes at 8 calculators, from the live sitemap.
7. **D5 "N/A"** is fine as a grading, but the font is Plus Jakarta Sans, the same as Dentists
   and Solicitors; only generalist runs Property's Geist.
