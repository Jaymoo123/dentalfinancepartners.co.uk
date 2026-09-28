# Ecommerce Finance parity research (2026-09-28)

Domain `www.ecommercefinance.co.uk`, Vercel project `prj_CI2NpSbvJGUEMatL2bVbOYIgxrNc`
(`docs/ecommerce/STATE.md`). Launched: **yes**, live and serving 200s. Live status: the
deployed content is **older than the design port**. `curl -sI https://www.ecommercefinance.co.uk/`
returns `Age: 443961` seconds against a fetch at 2026-09-28 15:48 UTC, which back-dates the
current build to roughly 2026-09-23. Every design-port commit (`9c02e16a` phase 1 through
`db787d73` "close the port" and `1aca7e5e` blog lead capture) lands 2026-09-26 to 2026-09-27,
so none of it is live. Confirmed directly: `git show 1aca7e5e --stat` added
`InlineMiniLeadForm` to ecommerce blog posts, but
`curl -sL https://www.ecommercefinance.co.uk/blog/business-structure-and-tax` renders
**zero** `<form>` tags. Memory's "NOT deployed" note is correct; `docs/ecommerce/STATE.md`'s
"DEPLOY HELD" line is stale in the other direction (it predates the fact that the site went
live at all, on an older, pre-port build), both need updating once the owner acts.

All source-level rows below (P, most L, G, C, D) are graded against **HEAD**, which is what a
deploy would ship next. Rows that depend on what is actually rendered (I1, I4, and the D7/D3
mobile checks) are graded against the **live** site and flagged where HEAD would fix them.

## Verdict in three lines

The port at HEAD closes most of the kit gap against Property on paper, but none of it is live,
so today's visitor gets the pre-port site: no design-port chrome, GA4 id blank, phone number
still the `+44 20 0000 0000` placeholder, no IndexNow key, no GSC config entry, and (per repo
grep) no chat widget or intent engine at HEAD either, so live and HEAD agree on that one gap.
Three biggest gaps: (1) **the deploy gap itself**, a genuinely-built port sitting undeployed
for two days is pure risk with zero benefit; (2) **chat widget and intent engine are absent
from the codebase entirely**, not just undeployed, an L-size build Property has and ecommerce
does not; (3) **stale positioning language survives on post-submit pages**, `complete/page.tsx`
and `thank-you/page.tsx` both say "a specialist firm from our partner network" with no Aswatax
name attached, which is the caveated voice rule 8 now treats as a defect, sitting right next to
the correctly-named Aswatax sentence two lines below it.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | n/a (reference) | No `entity` key in `ecommerce/niche.config.json`; closest is `partner_network.name` = "regulated firms in our specialist partner network" (`ecommerce/niche.config.json:6`) | S | Caveat framing baked into config, not an entity/identity key |
| P2 | n/a (reference) | 9 hits for "partner network" etc across `ecommerce/web/src` and `niche.config.json` (`grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants"`). Surfaces: privacy policy (allowed, unchanged by rule 8), `config/site.ts` `leadConsentText` (allowed), `lib/calculators/site.ts` (allowed, consent copy), **`complete/page.tsx:111,135`** and **`thank-you/page.tsx:137`** (generic "specialist firm from our partner network", no Aswatax name, these are prospect-facing post-submit pages and not the sanctioned Aswatax sentence) | M | 3 of 9 hits are on surfaces the ruling treats as defects; the rest are consent/privacy text the ruling explicitly leaves alone |
| P3 | n/a (reference) | "Free review"/"free consultation" language, 21 hits, e.g. `book/page.tsx:16,49`, `complete/page.tsx:21,136`; also a code comment at `for/[slug]/page.tsx:243` describing an eyebrow default of "Free consultation" | NONE | Same shape as Property, not a defect |
| P4 | n/a (reference) | "within 24 hours" / similar, 10 hits: `contact/page.tsx:9,56`, `for/[slug]/page.tsx:273`, `llms-full.txt/route.ts:17`, `services/[slug]/page.tsx:272`, `vat/[slug]/page.tsx:254`, `LeadForm.tsx:484,511`, `niche.config.json:93,98` | NONE (shares Property's open defect) | `lead-nurture.ts` `delayHours` sequence is `0,0,4,24,48,96,168,264` (`ecommerce/web/src/config/lead-nurture.ts:305-442`), gaps not cumulative per the trap note in memory; no step is an email that itself promises or fulfils "24 hours", same unbacked-promise shape Property has |
| P5 | AccountingService, firm-first, shared builder | `organizationJsonLd` in `ecommerce/web/src/lib/*` (found via grep, line ~61-64) sets `"@type": ["ProfessionalService", niche.seo.organization_type]` and `niche.config.json:63` sets `organization_type: "AccountingService"`, so the rendered type array is `["ProfessionalService","AccountingService"]`, matches Property's type once resolved | XS | Not the shared `packages/web-shared/schema/organization.ts` builder by inspection of the import path (hand-rolled in `ecommerce/web/src/lib`); worth a follow-up read to confirm parity of `sameAs`/`parentOrganization`/`knowsAbout` fields, not just `@type` |
| P6 | firm-first opening, UTM-tagged links | `curl -s https://www.ecommercefinance.co.uk/llms.txt` opens "Ecommerce Finance is a UK accountancy practice focused exclusively on ecommerce and marketplace selling", firm-first, no caveat. `grep -o "utm_[a-z_=&a-z]*"` on the live file returns **zero** matches | S | Firm-first voice correct; the UTM tagging Property's row calls out (`utm_source=chatgpt&utm_medium=llms`) is absent here |
| L1 | mounts on home, about, services, segment, service, blog post, calculators, contact | `LeadForm.tsx` referenced across `for/[slug]`, `services/[slug]`, `vat/[slug]`, `contact`, blog post template (per `1aca7e5e` diff) | NONE at HEAD | Not verified live (see deploy gap); source-level parity looks right |
| L2 | 7 shared mini-capture ids | `InlineMiniLeadForm.tsx` newly added to ecommerce at HEAD (`1aca7e5e`, "Ecommerce had no MiniCapture at all; ported from crypto") | S at HEAD, was L before | Confirms the pre-HEAD site had none of this; fixed only in the undeployed commit |
| L3 | one form under result, no gate, no PDF offer | Not independently verified this pass; `calculators/[slug]/page.tsx` present, no PDF-offer or gate string found in the quick grep pass | ? | Needs a direct read of `ResultCaptureForm`-equivalent in ecommerce; not confirmed either way |
| L4 | 6 calculator routes + premium + embed | `calculators/page.tsx` + `calculators/[slug]/page.tsx` (generic, `generateStaticParams` from `genericTools()`); `/embed` route exists (`ecommerce/web/src/app/embed`) | ? | Count of distinct calculator tools not enumerated this pass; FAQPage/cite-this per calculator not checked |
| L5 | `SpecialistWidget.tsx` chat widget | `grep -rln "SpecialistWidget\|ChatWidget" ecommerce/web/src/components` returns nothing | L | No chat widget component anywhere in the ecommerce source tree, not just undeployed |
| L6 | `IntentProvider`, `ReturningBar`, `DeepScrollModal` | `grep -rln "IntentProvider\|ReturningBar\|DeepScrollModal" ecommerce/web/src` returns nothing | L | Same as L5, absent from source entirely |
| L7 | sticky CTA + hero CTA from config | `niche.config.json:93` `sticky_secondary`, `:98` `cta_body` exist; hero CTA copy sourced from config as Property does | XS | Copy source pattern matches; component-level sticky CTA presence not independently screenshotted (see D7/I1 caveat) |
| L8 | thank-you, complete, `/book` tokened, Aswatax message | All three routes exist (`app/thank-you`, `app/complete`, `app/book`); Aswatax named correctly in `thank-you/page.tsx:170,181` and `LeadForm.tsx:487`; `complete/page.tsx` uses a booking token (`mintLeadToken(verdict.leadId, "book")`) | S | Mechanism present and mostly right; see P2 for the un-named "partner network" sentences sitting alongside the correctly-named Aswatax ones on the same two pages |
| L9 | file present, `delayHours` = gaps, firm voice, SMS ack | `config/lead-nurture.ts` present, two sequences with `delayHours` 0,0,4,24,48,96,168,264 and 0,24,48,168; `api/cron/lead-nurture` + `lead-nurture-digest` cron routes exist; `nurture-control.ts`, `nurture-health.ts` present, so an operational health-check layer exists that was not confirmed for other sites | NONE | Structurally matches Property's shape (gaps not cumulative); voice of the actual email bodies not read this pass |
| L10 | category-driven CTA mechanism | Blog CTA wiring only reached ecommerce in the undeployed `1aca7e5e` commit ("LeadForm after the body... InlineMiniLeadForm after the second H2") | S at HEAD | Pre-HEAD (i.e. live) ecommerce blog posts render **zero** `<form>` tags at all, confirmed directly on `/blog/business-structure-and-tax` |
| L11 | `leadConsentText` in `config/site.ts` | `ecommerce/web/src/config/site.ts:12`: "To answer your enquiry, your details may be shared with a firm from our specialist partner network who will contact you. If that firm is unable to help, your details may be passed to another firm in the network for the same purpose. By submitting this enquiry you confirm you understand this." Also duplicated near-verbatim in `lib/calculators/site.ts:11` | ? | Not diffed word-for-word against Property's consent text this pass; rule 8 exempts consent text from the positioning ruling either way, so this is a housekeeping/duplication note, not a defect |
| L12 | CHECK constraint accepts the site's source string | `api/leads/submit/route.ts:28`: `createLeadSubmitHandler({ source: "ecommerce" })`. `supabase/migrations/20260723000001_add_ashfield_to_leads_and_sites.sql` added `ecommerce` to `leads_source_valid` alongside hospitality, crypto, pharmacies, startups-tech, care | NONE | Memory's CHECK-constraint list (dentists/property/medical/solicitors/general/agency) is out of date; `ecommerce` is a valid source as of 2026-07-23, migration comment confirms it |
| G1 | AI-crawler allowlist, disallow list, host line | Live `/robots.txt`: 49 `User-Agent` blocks incl. GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Google-Extended, TelegramBot, all `Disallow: /thank-you`, `/admin`, `/api/`; `Host:` and `Sitemap:` lines present | NONE | Matches the estate pattern; built from `ecommerce/web/src/app/robots.ts:84-92` |
| G2 | shared builder, `sameAs`, `parentOrganization`, `knowsAbout`, one node per page | Hand-rolled `organizationJsonLd` object (not the `packages/web-shared/schema/organization.ts` import by grep), fields not individually confirmed this pass | ? | Needs a direct read to confirm `sameAs`/`parentOrganization`/`knowsAbout` presence; type array is right (see P5) |
| G3 | Service + FAQPage + BreadcrumbList on segment/service pages | Not directly confirmed; `for/[slug]/page.tsx` and `services/[slug]/page.tsx` exist and are the right shape of route | ? | Schema presence not grepped this pass |
| G4 | BlogPosting, `author` as Org/Person, real `dateModified` | Not confirmed this pass; blog is dynamic (DB-backed, no static post files under `app/blog`) | ? | Would need a DB read or a rendered-page check |
| G5 | route-based, firm-first, UTM-tagged, lists services/calculators | Live `/llms.txt` is firm-first (see P6) and lists Services and "Seller hubs (by platform)" sections; **no UTM tags found** | S | Content shape right, UTM tagging missing (same finding as P6) |
| G6 | `buildLlmsFullRoute`, post count listed, under the 19.07 MB ISR ceiling | `ecommerce/web/src/app/llms-full.txt/route.ts` exists as a route (not static); live file is 172,441 bytes (~0.17 MB), nowhere near the ceiling | NONE | Comfortably under Property's known near-ceiling problem |
| G7 | real/omitted `lastModified`, hreflang rule, new routes included | `ecommerce/web/src/app/sitemap.ts` exists; live sitemap lists 51 URLs, 20 of them `/blog/*` | ? | `lastModified` behaviour (real vs `now`) not read from source this pass |
| G8 | canonical-hub fix present | `git log --since=2026-09-26 --grep=canonical --stat` not run against ecommerce paths specifically this pass | ? | Flag for a follow-up: brief names this as a recent cross-site fix, ecommerce's canonical handling on hub pages (`/for`, `/services`, `/vat`) not individually checked |
| G9 | noindex correct, `/embed` rule | `robots.ts` disallow list is `/thank-you`, `/admin`, `/api/`; `/embed` is not disallowed at the robots level, consistent with Property's row 1 note that `/embed` exists as a backlink surface, not blocked | NONE | No stray noindex found in the grep pass |
| G10 | GSC config entry, IndexNow key, Bing verified | `grep -n "ecommerce" agents/config/gsc_config.py` returns **nothing**; `find ecommerce -iname "*indexnow*"` returns **nothing**; Bing verification unknown from repo | L | No GSC monitoring config and no IndexNow submission path exist for this site at all, live or otherwise |
| G11 | covered by 2026-09-27 AI-naming baseline | Not read this pass (`docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6) | ? | Marking N/A pending that file being read; did not open it to keep this pass in budget |
| C1 | posts total, recent dates | Live sitemap shows 20 `/blog/*` URLs; STATE.md's 2026-07-15 entry says 8 launch blogs + 4 wave-2 = 12, so the blog corpus has grown since the last STATE.md note; exact `date` field freshness not queried (blog is DB-backed, not files) | ? | Would need a DB read for precise "posts with date >= 2026-07-30" |
| C2 | exists, edited, sectioned | `docs/ecommerce/house_positions.md` exists, 27 positions per STATE.md's S5 line, locked 2026-07-15, sectioned A. VAT (registration/schemes/marketplace) onward | NONE | Present and substantial |
| C3 | coverage map | `docs/ecommerce/COVERAGE_MAP_2026-09.md` not present by that name; `docs/ecommerce/POOL_INTEGRITY_2026-09-25.md`, `keyword_assignment_map_2026-09-25.json`, `pool_classified_2026-09-25.json` exist as the closest equivalents | S | No file with the exact coverage-map name; adjacent pool/keyword-mapping docs exist instead |
| C4 | `/for/[slug]` dynamic, Service+FAQ+breadcrumb+form+stat tiles | `ecommerce/web/src/app/for/[slug]/page.tsx` dynamic route, 4 hubs in `data/for.ts` (amazon-sellers, shopify-sellers, marketplace-sellers, dropshippers) vs Property's 15 | M | Right shape, far fewer hubs than Property (4 vs 15); template conformance (schema/stat tiles) not verified this pass |
| C5 | `/services/*` and money pages | 6 services in `data/services.ts`; `/vat/[slug]` hub is an ecommerce-specific addition (IOSS/OSS/135-import content per house_positions.md) Property does not have | NONE | Ecommerce has an extra money-page category (`/vat/*`) beyond Property's shape |
| C6 | validator pass/fail | `python scripts/validate_blog_content.py --site ecommerce` fails immediately: `error: argument --site: invalid choice... (choose from Property, Dentists, Medical, Solicitors, contractors-ir35, care, charities)` | L | Site is **unsupported** by the estate content validator; no automated QA path exists for ecommerce blog content |
| C7 | `dateModified`/`reviewedAt` on posts | Not confirmed this pass (DB-backed content, no static frontmatter files to grep) | ? | Needs a rendered-page or DB check |
| C8 | byline model | Not confirmed this pass | ? | Not grepped; flag for follow-up |
| C9 | link audit tool | No `scripts/` or ecommerce-specific link-audit tool found in the quick pass (`find` for `*link*audit*` under `ecommerce` returned nothing checked) | ? | Did not exhaustively search; report as "no audit tool found" rather than "confirmed absent" |
| D1 | port tag, `web-shared/design` import count | `git tag -l 'port-ecommerce-*'` returns 8 tags (phase0 through phase6 plus `port-ecommerce-complete`, dated 2026-09-26); `grep -rl "web-shared/design" ecommerce/web/src \| wc -l` = **31** files | NONE at HEAD, but undeployed | Port is real and substantial at HEAD; zero of it is live (see verdict) |
| D2 | `prose-standard.css` imported | `ecommerce/web/src/app/globals.css:6`: `@import "../../../../packages/site-styles/prose-standard.css";`, with an inline comment correcting an earlier wrong claim that nothing defines `.prose` | NONE | Present and correctly wired at HEAD |
| D3 | header CTA hides below 1024 | Not checked live (site predates the port and puppeteer was not run this pass); source-level Tailwind breakpoint classes not individually grepped | ? | Graded from nothing; flag for the design-reader wave |
| D4 | favicon set, `og:image` not SVG, `metadataBase` | Live `og:image` resolves to `/api/og` (a dynamic route, not a static SVG); favicon presence on live not individually screenshotted | XS | og:image mechanism matches Property's non-SVG standard |
| D5 | fonts | Not checked this pass | ? | Not grepped |
| D6 | StatsCounter/stat tiles literal-value support | Not checked this pass | ? | Not grepped |
| D7 | 390px scrollWidth with real emulation | Not run this pass; puppeteer-core was not exercised (would need `npm install` risk or an existing local install not confirmed) | ? | No finding either way; explicitly not graded rather than guessed |
| D8 | playbook 9.1 kit-adoption gate | Not run this pass | ? | Flag for a follow-up pass with the playbook open |
| I1 | live status, key routes 200 | `curl -sI /` = 200; `/robots.txt` = 200 (49 UA blocks); `/llms.txt` = 200; `/llms-full.txt` = 200 (172,441 bytes); `/sitemap.xml` = 200 (51 URLs) | NONE | All five surfaces live and serving |
| I2 | Vercel project id, deploy date vs HEAD | Project id `prj_CI2NpSbvJGUEMatL2bVbOYIgxrNc` from STATE.md; STATE.md's launch checklist still shows S7 (Vercel deploy) and S8 unchecked, i.e. **STATE.md has not been updated since before the site went live**, contradicted by the live 200s; `Age` header backdates the current deploy to roughly 2026-09-23, 8 commits and 2-3 days behind HEAD's design-port work | L | STATE.md is stale in a way that hides the deploy gap; the file says "DEPLOY HELD" while the site has in fact been live (on an older build) for days |
| I3 | test coverage, CI | `find ecommerce/web/src -iname "*.test.ts" -o -iname "*.test.tsx" \| wc -l` = 7 | ? | No `.github/workflows` grep run this pass to confirm a CI job covers ecommerce specifically |
| I4 | GA4 present, CSP allows `region1.google-analytics.com`, consent banner | `niche.config.json:65` `google_analytics_id: ""` (empty); live homepage HTML has no `G-` measurement id; no CSP header seen on `curl -sI /` at all | L | GA4 is not configured; the site has been live for days with no analytics running |
| I5 | flags read by the code | Not exhaustively grepped this pass | ? | Flag for follow-up |
| I6 | monitored_pages rows | Not checked (no Supabase read this pass) | ? | Unknown from repo |
| I7 | STATE.md exists, newest entry date, contradictions | `docs/ecommerce/STATE.md` exists; its Launch-state checklist (S7/S8 unchecked, "DEPLOY HELD") and its External-steps list (phone number, GA4, domain DNS all shown as still-to-do) **contradict** the live site, which has a real domain and is serving 200s, just with the placeholder phone and blank GA4 id still shipped as STATE.md warned they would be if launched early | L | STATE.md predicted exactly this failure mode and was not updated when it happened |

## Unique to this site

- `/vat/[slug]` hub (IOSS/OSS/135-import-rule content) is a money-page category Property does not have (C5).
- `nurture-health.ts` and a `lead-nurture-digest` cron route exist; an operational health-check layer for the nurture pipeline that was not found by name on other sites checked this pass.
- house_positions.md documents a deliberately-declined opportunity: IOSS/OSS content is flagged in `docs/ecommerce/STATE.md` as "partly a dead end, and the prize was overstated", with the reasoning kept in the doc rather than silently dropped.

## Shares Property's open defects

- The unbacked "within 24 hours" promise (P4): 10 occurrences, no nurture step is itself the promised reply, same shape as Property's known defect.
- Generic "partner network" caveat language surfacing on prospect-facing surfaces post-ruling (P2): `complete/page.tsx` and `thank-you/page.tsx`, the same pattern the 09-28 ruling targets estate-wide.

## Questions (missing data, not findings)

- Is `packages/web-shared/schema/organization.ts` actually the source of `organizationJsonLd`, or is it hand-rolled with equivalent fields? (G2, P5) Not confirmed either way.
- Exact calculator count and per-calculator FAQPage/cite-this coverage (L4).
- Blog post `date`/`dateModified`/`reviewedAt` freshness, blog is DB-backed with no static frontmatter files, so this needs a DB or rendered-page check, not a repo grep (C1, C7).
- Byline model (C8), header CTA breakpoint behaviour (D3), 390px real-emulation results (D7), design-port-gate numbers (D8), none run this pass, budget and the pre-port live state made them lower priority than confirming the deploy gap itself.
- G11 AI-naming baseline coverage, `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 8/T6 not opened this pass.
- G8 canonical-hub fix, not checked against ecommerce's hub pages specifically.

## Commands and files read

- `git tag -l 'port-ecommerce-*'`, `git log --oneline -5 -- ecommerce/web`, `git log --oneline port-ecommerce-complete..HEAD -- ecommerce/web`
- `git log --format="%h %cd %s" --date=iso -- ecommerce/web` (port commit dates)
- `git show 1aca7e5e --stat`
- `cat docs/ecommerce/STATE.md`, `head docs/ecommerce/house_positions.md`
- `curl -sI https://www.ecommercefinance.co.uk/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`
- `curl -sL https://www.ecommercefinance.co.uk/blog/business-structure-and-tax` (zero `<form>` tags)
- `grep -rniE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" ecommerce/web/src ecommerce/web/public ecommerce/niche.config.json`
- `grep -rniE "free (consultation|first call|review)"`, `grep -rniE "within 24 hours|same working day"` over `ecommerce/web/src`
- `grep -n "delayHours" ecommerce/web/src/config/lead-nurture.ts`
- `grep -n "organization_type" ecommerce/niche.config.json`; grep for `organizationJsonLd`
- `grep -rl "web-shared/design" ecommerce/web/src | wc -l`; `grep -n "prose-standard" ecommerce/web/src/app/globals.css`
- `grep -rn "leads_source_valid" supabase/migrations/*.sql` (constraint history)
- `python scripts/validate_blog_content.py --site ecommerce` (unsupported site)
- `grep -n "ecommerce" agents/config/gsc_config.py`; `find ecommerce -iname "*indexnow*"`
- `find ecommerce/web/src -iname "*.test.ts*" | wc -l`
- `grep -n "phone\|google_analytics_id" ecommerce/niche.config.json`

---

# Wave 2 reader append (2026-09-28)

Control, per brief rule 7: `https://www.gov.uk` rendered with the same `puppeteer-core`
`page.emulate` code (390x844, deviceScaleFactor 3, isMobile, hasTouch) gives
`document.documentElement.scrollWidth = 390`, zero overflowing elements. Real emulation confirmed.

**Everything in this section describes what is LIVE**, which wave 1 established is a build from
about 2026-09-23, before the design port. I have not read HEAD except where a row says so, and I
have built nothing. Pages rendered: `/`, `/about`, `/services/ecommerce-vat-compliance`,
`/for/amazon-sellers`, `/blog/vat-and-cross-border-selling/vat-threshold-gross-vs-payout`,
`/calculators/vat-threshold-tracker`, `/contact`, plus `/book`, `/thank-you`, and all 4 `/for/*`
and 4 `/services/*` pages for the sameness check.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | FAIL live. The only header CTA is a plain text link "Contact", 49x19 px, and it is visible at **both** 1280 (x=1135) and 390 (x=325). Nothing hides, and there is no button-shaped header CTA at all | rendered `getBoundingClientRect` on both viewports, all 7 pages |
| D5 | Live body font is the system stack: `ui-sans-serif, system-ui, -apple-system, sans-serif`. Geist is imported at HEAD (`ecommerce/web/src/app/layout.tsx:2,141`) but is not live | `getComputedStyle(document.body).fontFamily` live on all 7 pages |
| D6 | `StatsCounter` is referenced at HEAD in `about/page.tsx`, `calculators/[slug]/page.tsx`, `cookie-policy/page.tsx`; no stat tiles render on the live `/about`, which has 6 paragraphs and no tiles | `grep -rl StatsCounter ecommerce/web/src`; rendered `/about` |
| D7 | 390 `scrollWidth` = 390 on 6 of 7 pages. **`/for/amazon-sellers` = 461**, caused by the escaped-HTML defect below: the literal text `href="https://www.gov.uk/guidance/vat-and-overseas-goods-sold-to-customers-in-the-uk-using-online-marketplaces">establishment` is one unbreakable word | rendered; three longest "words" on the page are all literal href strings |
| D8 | 9.1 gate **at HEAD** (not live): row1 layout-utils=6; row2 kit adopted = **7 distinct / 40 call sites**; 2a declined=159; 2b homepage marketing adopted=3 declined=16; row3 webfont geist sans; row4 backdrop=1; row5 Eyebrow=7 section-label=0; row6 zero non-token focus rings; row7 two gradient files; row8 walks=1 guards=1. This is genuine adoption, the generalist pattern, and none of it is live | section 9.1 block run verbatim, read-only |
| G3 | FAQPage YES on `/for/*`, `/services/*` and calculators. **No `Service` node and no `BreadcrumbList` on any of them** | `curl` plus `grep -o` per URL |
| G7 | `lastModified: now`, build time, on every route | `ecommerce/web/src/app/sitemap.ts:14-17` |
| G8 | **Partly present live.** `/for` and `/services` hubs both serve `rel="canonical" href="https://www.ecommercefinance.co.uk"`, the homepage. Every child page (`/for/amazon-sellers`, `/about`, `/vat/ioss-vs-oss`, calculators, blog posts) sets its own correctly. Source cause: `layout.tsx:110` still sets `canonical: siteUrl`, and the two hub pages at HEAD now override it, so the fix exists and is undeployed | canonical sweep on 9 URLs; `grep -n canonical ecommerce/web/src/app/{layout,for/page,services/page}.tsx` |
| G9 | No stray `noindex` on public pages; only `/admin/*` and token API routes. `/embed` not blocked | `grep -rn "noindex\|index: false" ecommerce/web/src/app` |
| L3 | **FAIL live.** `/calculators/vat-threshold-tracker` renders **zero `<form>` elements**. There is no form under the result, no gate and no PDF offer, because there is no capture at all | rendered `document.querySelectorAll('form').length` = 0 |
| L4 | **4 calculators** live: seller-take-home-calculator, vat-threshold-tracker, sole-trader-vs-ltd-sellers, side-hustle-tax-checker. FAQPage and WebApplication present on the one sampled | live sitemap `grep -c '/calculators/'` = 4; schema greps |
| L8 | `/book` with no token renders **zero forms** and says "This page needs the personal link from your email or text message." Same dead end as Property. `/thank-you` renders and ends on "Ready to book a time that works for you?" | rendered |

## Reader findings

Today's visitor cannot become a lead on any page except the home page and `/contact`: the four
segment pages, the four service pages, the five `/vat` pages, the blog post and the calculator all
render zero forms. On top of that, fifteen live pages print raw HTML markup as visible body text,
which is the single most damaging thing I found across my four sites because a prospect reads it as
a broken website rather than a specialist firm. The writing itself is good and firm-voiced, with no
em-dashes and no US spellings, and the positioning is already clean on the pages I rendered.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | 15 live pages | Raw HTML anchor markup renders as visible text in body copy. `/for/amazon-sellers` shows 25 occurrences, including `<a href="/vat/vat-on-marketplace-fees">VAT on Amazon's fees</a>` and `<a href="https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a">Notice 741A</a>` inside the opening paragraph | `document.body.innerText` matched against `/<a href=[^>]*>[^<]*<\/a>/g`: /for/amazon-sellers 25, /for/dropshippers 39 raw, /for/marketplace-sellers 35, /for/shopify-sellers 32, /vat/ioss-vs-oss 19, /vat/postponed-vat-margin-scheme 16, /vat/135-import-rule 14, /vat/vat-on-marketplace-fees 12, /vat/deemed-supplier-establishment 11, /services/selling-into-the-eu 7, /services/hmrc-letter-online-sales 5, /services/ecommerce-vat-compliance 3, plus 3 calculators | M |
| BLOCKER | /about, 4 `/for/*`, 4 `/services/*`, 5 `/vat/*`, blog post, calculator | Zero `<form>` elements. Every money page and every segment page is a dead end; only `/` and `/contact` capture, and both with a 3-field form | rendered form counts: home 1, /contact 1, everything else 0 |
| BLOCKER | every page | Primary CTA fails WCAG AA: white text on `rgb(201,134,27)` amber computes **3.04**, against the 4.5 floor. This is the exact ratio memory records for the brand amber as "decoration only", now in use as the button ground | `getComputedStyle` with canvas-resolved colour, home page "Continue" button and hero "Speak to a seller tax specialist" |
| BLOCKER | /for and /services hubs | Both canonicalise to the homepage live, so the two hubs are de-indexed by their own tag | `curl` canonical extraction |
| FIX | /about | Body text contrast **2.48** (grey `oklch(0.708 0 0)` on `oklch(0.985 0 0)`), well under AA | `getComputedStyle` on the longest paragraph |
| FIX | all 4 `/for/*` | Closing line injects the URL slug into English: "Tell us about your **amazon sellers** situation and we will reply within 24 hours." Same on shopify-sellers, marketplace-sellers, dropshippers, lower-cased and unpunctuated | rendered closers on all 4 pages |
| FIX | header, all pages | No header CTA button; the only header action is a 19 px text link that does not hide at 390 | rendered rects |
| FIX | /book | Untokened `/book` renders zero forms, Property's defect shared; and it says "A specialist will call you then, no obligation.", a literal rule-8 phrase | rendered `/book` |
| FIX | blog post, /contact, every service and segment closer | "We reply within 24 hours" on 10+ surfaces with no nurture email that delivers it, Property's unbacked promise shared | rendered closers; inventory P4 |
| FIX | all pages | No sticky CTA, no chat widget, no intent layer in the live DOM. A scan of every `position: fixed` element on the home page returns nothing | rendered fixed-element scan |
| FIX | all `/for/*` and `/services/*` | No `BreadcrumbList` and no `Service` node; Property has both | schema greps |
| FIX | all | Sitemap `lastModified` is build time on every route | `sitemap.ts:14-17` |
| NIT | /, blog post, /services/ecommerce-vat-compliance | "crucial" once on each, the only AI-tell word on the site | rendered innerText |
| NIT | /about, /services, /for | Every page closes on the Ashfield Trading Ltd registered-office block as the last body paragraph, with no call to action after it, because there is no `<main>` landmark and no foot CTA panel | rendered: `document.querySelector('main')` is null on every page |
| NIT | /contact | Focus ring on the first input is the browser default (`outline: 1px auto`), not a design token | `getComputedStyle` after `.focus()` |
| NIT | /calculators/vat-threshold-tracker | No `<h1>` at all on the page | rendered `document.querySelectorAll('h1')` = `[]` |

### Design numbers (page x metric)

| Page | sw 1280 | sw 390 | hdr CTA 1280 / 390 | body contrast | CTA contrast | forms | longest para (words) |
|---|---|---|---|---|---|---|---|
| gov.uk control | 1280 | **390** | n/a | n/a | 3.91 | n/a | n/a |
| / | 1280 | 390 | 1 / 1 | 9.93 | **3.04** | 1 | 71 |
| /about | 1280 | 390 | 1 / 1 | **2.48** | 3.04 | 0 | 29 |
| /services/ecommerce-vat-compliance | 1280 | 390 | 1 / 1 | 7.49 | 5.68 | 0 | 68 |
| /for/amazon-sellers | 1280 | **461** | 1 / 1 | 5.68 | 5.68 | 0 | 97 |
| blog post | 1280 | 390 | 1 / 1 | 10.35 | 3.04 | 0 | 75 |
| /calculators/vat-threshold-tracker | 1280 | 390 | 1 / 1 | 7.58 | n/a | 0 | 75 |
| /contact | 1280 | 390 | 1 / 1 | 20.99 | **3.04** | 1 | 11 |

Zero em-dashes and zero en-dashes in visible body text on all 7 pages. No US spellings.
No images anywhere, so no missing alt text. No placeholder phone numbers or emails visible on the
pages rendered (wave 1's `+44 20 0000 0000` note is a config value, not rendered text on these
seven pages). `.prose` works: `.prose p` on the blog post computes `margin-bottom: 20px`,
`font-size: 18px`, `line-height: 31.5px`, so `prose-standard.css` is live and applied. Footer CTA
target is `/contact`, which does render a form.

### Sameness

| Scope | Result |
|---|---|
| Within site, 4 `/for/*` closers | **Not identical**, each is bespoke, but all four end on the same templated slug sentence pattern |
| Within site, 4 `/services/*` closers | **Not identical**, each bespoke, all four end on "Tell us about your situation and we will reply within 24 hours." |
| Against Property's `/for/` close | **Different.** Property closes with "A couple of sentences helps us prepare properly for your call." then consent then the 24-hour and text-message line. Ecommerce has no consent sentence and no form on its segment pages at all, so there is nothing to compare structurally |
| Foot form | Only two forms exist live, on `/` and `/contact`, both 3 inputs, no `form_id` exposed in the DOM |

## Corrections to the inventory

| Row | Wave 1 said | Correction | Evidence |
|---|---|---|---|
| L1 | "NONE at HEAD", mounts on for/services/vat/contact/blog | True at HEAD, but the live reading is far worse than "not verified live": **zero forms** on all four `/for/*`, all four `/services/*`, all five `/vat/*`, the blog post and the calculator. Only `/` and `/contact` capture | rendered form counts on 13 live URLs |
| G8 | "?" | Settled: `/for` and `/services` hubs canonicalise to the homepage live; all child pages are correct | canonical sweep |
| D4 | "og:image resolves to /api/og, matches Property's non-SVG standard", XS | No change to that, but add that there is no `<main>` landmark on any page, so the document has no primary content region | rendered |
| P2 | 3 of 9 caveat hits are defects, on `/complete` and `/thank-you` | On the pages I could render read-only, `/thank-you` now shows **no** generic partner-network sentence; its visible tail is the spam-folder line and "Ready to book a time that works for you?". `/complete` needs a token so I could not render it, and that row stays open | rendered `/thank-you` innerText |
| C4 | 4 hubs, "template conformance not verified" | Verified: the 4 hubs carry FAQPage but no Service node, no BreadcrumbList, no form and no stat tiles, so they do not follow Property's template | schema greps plus rendered form counts |
