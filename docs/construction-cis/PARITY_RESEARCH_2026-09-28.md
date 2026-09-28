# Trade Tax Specialists (construction-cis) parity research (2026-09-28)

Domain `www.tradetaxspecialists.co.uk`, Vercel project live, launched yes, live status 200 on
`/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` (checked 2026-09-28).

## Verdict in three lines

This site is furthest from Property on positioning, not on kit: the design port is complete
(phases 0-6 + uplift, deployed 09-16) and the lead/GEO/content machinery is present and
generally clean. The block is architectural: construction-cis runs a "pool model" where every
enquiry is explicitly handed to a "specialist partner network" of up to six regulated firms
(`web/src/config/site.ts:12-17`, `/privacy-policy` section 5), and this is load-bearing across
about, contact, complete, book and the consent text, not a stray phrase. The 2026-09-28 ruling
(rule 8) makes every one of those caveats a defect, but the 09-28 sweep commits
(`63087d14`, `815ae7de`) explicitly did not touch this site's own page strings, so nothing here
was reversed. Biggest gaps: (1) partner-network caveat on 5+ prospect-facing surfaces including
`/about`, `/contact`, `/complete`, all deliberate and documented (GATE 8, TD-13/14, DL-8); (2) no
Organization JSON-LD entity/firm-first description check possible without deciding whether the
pool model itself survives the ruling, since the schema, consent text and privacy policy are one
legal structure; (3) `prose-standard.css` not imported (only ten sibling sites are, this is not
one of them).

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | firm-first `entity` | no `entity` key; has `partner.name` = "regulated firms in our specialist partner network" | L | `construction-cis/niche.config.json:14-18` |
| P2 | 0 caveat hits | 6 files with "partner network" on prospect-facing surfaces: `about/page.tsx:127`, `complete/page.tsx:94,120,148`, `contact/page.tsx:153`, `config/site.ts:17` (consent text, allowed by rule 8's exception) | L | Rendered on About, Contact, Complete (post-submit, pre-Aswatax step), not exempted by rule 8, which only exempts consent/privacy/terms/Aswatax intro. `privacy-policy/page.tsx` is itself exempt |
| P3 | present | "free consultation"/"free review" 21 hits across the site (e.g. `complete/page.tsx:121` "free CIS review") | NONE | count only, not graded for tone |
| P4 | present, no nurture backing | 1 hit total (much lower than Property's ~115); need file+line to confirm it is not in nurture | XS | `grep -rniE "within 24 hours|same working day" web/src` = 1 hit; nurture emails checked (L9) carry no such promise |
| P5 | AccountingService, firm-first description | `siteConfig.description` from `niche.config.json` is used in Organization/WebSite schema (`lib/schema.ts:44,82`); description text is firm-voiced product copy ("We claim it back, then keep you compliant"), no caveat in the schema description itself, but `organizationType` in schema.ts is not shown as `AccountingService` explicitly (defaults via shared builder) | M | `web/src/lib/schema.ts:20` uses `opts.organizationType \|\| "ProfessionalService"`; did not find `AccountingService` literal passed at the call site in the time available, flagged as a question |
| P6 | firm-first | `public/llms.txt` opens "Trade Tax Specialists is a UK accountancy practice focused exclusively on the construction trades", firm-first, no partner-network caveat | NONE | `web/public/llms.txt:1-4`, UTM tags present (`utm_source=chatgpt&utm_medium=llms`) |
| L1 | mounted on home/about/services/segment/service/blog/calculators/contact | mounted on: about, blog, calculators/[slug], cis-invoice-template, cis-payment-deduction-statement-template, cis-refund, contact, for/[slug], glossary/[slug], glossary, gross-payment-status, locations/[slug], locations, home, services, thank-you | NONE | `grep -rl "LeadCTAPanel\|LeadForm" web/src/app`, 16 route files, broad coverage |
| L2 | inline_mini, mobile_tool, calc_result_form, calc_result, resource_block, calc_page_footer, blog_short_resource | `InlineMiniLeadForm.tsx`, `CalcResultCta.tsx`, `premium/MobileToolSlot.tsx`, `ResourceGate.tsx` present | S | did not confirm exact string ids match Property's shared-component names one for one; `calc_page_footer`/`blog_short_resource` id strings not located by name |
| L3 | one form, no gate, no popup, no PDF offer | `CalcResultCta.tsx` present under calculator results; `ResourceGate.tsx` also exists (resources, not calculators), need to confirm no gate remains on the calculator path itself | ? | could not confirm in the time available whether `ResourceGate` ever wraps a calculator result; flagged as a question |
| L4 | 6 route dirs + premium + /embed | `web/src/app/calculators/[slug]/page.tsx` + `page.tsx` (list) + `web/src/app/embed/` present; count of individual calculators not enumerated (dynamic `[slug]` routes, not one dir per tool) | ? | did not enumerate the calculator list/FAQPage coverage per tool; question |
| L5 | present, `SpecialistWidget.tsx` | present: `components/support/SpecialistWidget.tsx`, wired in `layout/PageShell.tsx`, has `lib/assistant/opener.ts` and `lib/support/faq.ts` | NONE | mounted via PageShell (site-wide chrome) |
| L6 | IntentProvider, ReturningBar, DeepScrollModal | present: `IntentProvider.tsx`, `ReturningBar.tsx`, `DeepScrollModal.tsx`, plus `HeroOffer.tsx`, `NextStepOffer.tsx` (extra vs Property's list), `lib/intent/{deriveTopic,engine,journeyModel,labels,taxonomy}.ts` | NONE | `web/src/components/intent/` full set present |
| L7 | StickyCTA, hero CTA from niche.config `cta` | did not confirm a `StickyCTA.tsx` equivalent exists on this site in the time available | ? | not located; question |
| L8 | thank-you, complete, /book tokened, Aswatax message | `/thank-you`, `/complete`, `/book` all present; `complete/page.tsx` uses `mintLeadToken` and `/book?t=${bookingToken}` (tokened); Aswatax message presence not independently re-verified here (memory says deployed + verified estate-wide 09-09) but `complete/page.tsx` copy is "partner network" voiced, not firm voiced, which sits before whatever Aswatax step follows | M | see P2; `web/src/app/complete/page.tsx:94-121` |
| L9 | file present, delayHours=gaps, firm voice, SMS ack | `config/lead-nurture.ts` present; `delayHours` values are sequential absolute-looking numbers (0,4,24,48,96,168,264 in one sequence; 0,24,48,168 in another) with a comment "Cadence: 0, 24, 48, 168 hours", read as gaps per the file's own framing, matches Property's convention; voice is explicitly "Faceless team voice (no named specialist), no credential claims", no partner-network caveat found in nurture copy | NONE | `web/src/config/lead-nurture.ts:18,241,434`; zero hits for "partner" in this file |
| L10 | category-driven, no dead code | not independently audited in the time available | ? | question |
| L11 | consent text estate-wide | this site's consent text is materially different from Property's: it discloses onward sharing to "a firm from our specialist partner network", with re-referral to "another firm in the network", Property's consent text (not re-read here) is understood from memory to be firm-voiced with no such onward-sharing clause | L | `web/src/config/site.ts:17`; this is the exempted consent surface per rule 8, so NOT itself a rule-8 defect, but the underlying business-model difference it discloses is what drives P1/P2/L8 |
| L12 | leads CHECK constraint list = dentists/property/medical/solicitors/general/agency | did not locate `/api/leads/submit` lead-source literal for this site in the time available | ? | question, `web/src/app/api` not read for this row |
| G1 | AI-crawler allowlist | present, named entries for Google, OpenAI (GPTBot, OAI-SearchBot, ChatGPT-User), Anthropic (ClaudeBot, anthropic-ai, Claude-Web, Claude-SearchBot, Claude-User), Perplexity, Apple, Meta | NONE | `web/src/app/robots.ts:1-40`, comment notes it "mirrors the contractors-ir35 surface" |
| G2 | shared builder, sameAs, parentOrganization, knowsAbout | uses `web/src/lib/schema.ts`, a local file (not confirmed as a direct import of `packages/web-shared/schema/organization.ts`); `parentOrganization`/Ashfield Trading Ltd presence not confirmed in schema output | ? | question, schema.ts exists locally in this site rather than obviously wrapping the shared builder; needs a follow-up read of the full file |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | `lib/faq-page-schema.ts` present; segment (`for/[slug]`) and service pages exist; breadcrumb presence not independently confirmed | ? | question |
| G4 | BlogPosting, Organization/Person author, real dateModified | not checked in the time available | ? | question |
| G5 | firm-first, UTM, lists audiences/services/calculators | `public/llms.txt` is a static file (not a route), Property's is `public/llms.txt` too per section 1, so this matches; firm-first confirmed (P6); lists cornerstone guides, not explicitly audiences/services/calculators sections | S | `web/public/llms.txt`, static, not `buildLlmsFullRoute`-style |
| G6 | route-generated, post count, size | `web/src/app/llms-full.txt` exists as an app route (matches Property's pattern of `src/app/llms-full.txt`); post count and file size not measured (live GET returned 200) | ? | question, size not measured against the 19.07 MB ISR ceiling |
| G7 | real/omitted lastModified, hreflang | `web/src/app/sitemap.ts` exists; contents not read in this pass | ? | question |
| G8 | canonical-hub fix | this site WAS in the canonical fix (`bb297ab2 fix(seo): stop /services and /for canonicalising to the homepage on four sites`), touching `about`, `cis-invoice-template`, `cis-refund`, `contact`, `cookie-policy`, `for/[slug]`, `for/page`, `gross-payment-status`, `layout.tsx`, `privacy-policy`, `services`, `terms` | NONE (fixed) | `git show --stat bb297ab2` lists 12 construction-cis files touched |
| G9 | no stray noindex, /embed rule | not checked in the time available | ? | question |
| G10 | gsc_config.py entry, IndexNow key, Bing verified | STATE.md records "Engine maps registered: GSC `_SITE_URL_MAP`, Bing `DEFAULT_SITE_URL`, IndexNow config (key `e23614f9...`)" as of an earlier (pre-domain) state entry that may now be stale given the site is live | ? | `docs/construction-cis/STATE.md` (older section, dated before the 09-16 deploy block), question whether this was updated post-launch |
| G11 | LEADS_250 09-27 baseline T6 coverage | not checked in the time available | ? | question |
| C1 | posts, recent dates | 82 markdown/mdx files under `construction-cis/web/content` counted by extension grep; exact `date >= 2026-07-30` count and newest date not extracted in this pass | ? | `find ... | wc -l` = 82; question on recency breakdown |
| C2 | house_positions.md | present, 17 `##` sections, last edit 2026-09-12 per file mtime and STATE.md ("13 sections, FA 2026-verified... §11a addendum added post wave-1 audit") | NONE | `docs/construction-cis/house_positions.md`, mtime 2026-09-12 |
| C3 | coverage map | not found by that name; `docs/construction-cis/` has `SITE_PLAN.md`, `TOOL_ROSTER.md`, `gap_discovery_2026-07.md`, `sitemap_gap_discovery_2026-07.md` instead, no `COVERAGE_MAP_2026-09.md` | M | `ls docs/construction-cis/`, no matching file |
| C4 | `/for/[slug]` dynamic, Property template | `web/src/app/for/[slug]/page.tsx` present, dynamic route matches Property's shape; template parity (Service+FAQPage+breadcrumb+one form+stat tiles) not verified line by line | S | file exists; content match unverified |
| C5 | list of `/services/*` and money pages | `services`, `cis-refund`, `gross-payment-status`, `cis-invoice-template`, `cis-payment-deduction-statement-template` present as top-level money pages | NONE | `web/src/app` directory listing |
| C6 | validator supported | `scripts/validate_blog_content.py --site` only accepts `{Property,Dentists,Medical,Solicitors,contractors-ir35,care,charities}`, construction-cis is NOT a supported choice | N/A | ran `--help`, site unsupported |
| C7 | dateModified/reviewedAt on posts | not checked in the time available | ? | question |
| C8 | byline model | nurture and site copy use "faceless team voice, no named specialist" per code comments; suggests Editorial Team/Organization model, not Person, but blog post frontmatter authors not directly read | ? | inferred from `lead-nurture.ts:18` comment, not confirmed on post frontmatter |
| C9 | link audit tool | not checked in the time available | ? | question |
| D1 | port standard | ALL 6 phases + uplift tagged and deployed: `port-construction-cis-phase0` through `phase6`, plus `port-construction-cis-uplift` (untagged commit `48312e2c` per STATE.md); `web-shared/design` imported in 27 files | NONE | `git tag -l 'port-construction-cis-*'`, `grep -rl "web-shared/design" web/src \| wc -l` = 27 |
| D2 | prose-standard.css imported | NOT imported, a code comment in `globals.css:295` states explicitly "construction-cis does NOT import packages/site-styles/prose-standard.css (only ten sibling sites do)" | S | `web/src/app/globals.css:293-297` |
| D3 | header CTA hides <1024 | not checked (no live render in this pass) | ? | question |
| D4 | favicon set, og:image not SVG, metadataBase | `metadataBase` present (`layout.tsx:27`); `openGraph.images` uses `siteConfig.publisherLogoUrl` = `/brand/icon-alt.png` (PNG per niche.config, not SVG) | NONE | `web/src/app/layout.tsx:27,46-53`; `niche.config.json` `brand.publisher_logo_url` |
| D5 | fonts | not checked in the time available | ? | question |
| D6 | StatsCounter literal-value support | not checked in the time available | ? | question |
| D7 | 390px real emulation | not run in this pass (would need puppeteer-core per rule 7) | ? | not attempted; question |
| D8 | playbook 9.1 kit-adoption gate | not run in this pass | ? | question, `docs/_engines/DESIGN_PORT_PLAYBOOK.md` section 9.1 not executed here |
| I1 | live status | all 200: `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` | NONE | curl -sI checks run 2026-09-28 |
| I2 | Vercel project, deploy date vs HEAD | STATE.md records deploy 2026-09-16 from `90fbea9c`; the canonical fix (`bb297ab2`) postdates that and touches this site, so at least one post-deploy commit is outstanding | S | `git log --since=2026-09-16 --oneline -- construction-cis/ | wc -l` not run precisely, but `bb297ab2` is confirmed newer and unshipped per this evidence alone |
| I3 | test file count | 27 test files under `web/src/**/*.test.ts(x)` | NONE | `find web/src -iname "*.test.ts*" | wc -l` = 27 |
| I4 | GA4, CSP, consent banner | not checked in the time available | ? | question |
| I5 | env/flags | not checked in the time available | ? | question |
| I6 | monitored_pages rows | unknown from repo (Supabase not queried) | ? | per brief, "unknown from repo" is an acceptable answer |
| I7 | STATE.md currency | STATE.md is current and self-correcting: its own PICKUP BLOCK explicitly warns it has gone stale three times before and tells the reader to re-verify with `git tag` / `port_preflight.py` rather than trust the table; last STATE.md commit 2026-09-16, consistent with the tag evidence found here | NONE | `docs/construction-cis/STATE.md:1-30`; `git log -3 -- docs/construction-cis/STATE.md` |

## Unique to this site

- The "pool model": enquiries are explicitly, contractually routed to up to six third-party
  regulated firms rather than serviced by the brand itself, documented at length across
  `/privacy-policy` section 5, `about/page.tsx`, `contact/page.tsx` and `complete/page.tsx`,
  with named change-control markers (GATE 8, GATE 5/TD-19, TD-13/TD-14, DL-8). This is not a
  stray copy defect; it is the site's actual lead-fulfilment architecture, and the 09-28 ruling
  (rule 8) is in direct tension with it. No other memory or brief section resolves whether the
  pool model itself is still the owner's intended structure for this site post-ruling.
- `llms.txt` is already firm-first ("Trade Tax Specialists is a UK accountancy practice...")
  even though the rendered pages are not, an internal inconsistency between the machine-facing
  surface and the human-facing surface that predates the ruling.
- Full six-phase design port plus a named uplift commit, all tagged, matching Property's design
  standard by the tag evidence, ahead of several sibling sites' documentation discipline.

## Shares Property's open defects

- Post-submit `/book` and `/complete` flow: present and tokened (`mintLeadToken`), so likely does
  NOT share Property's "untokened /book renders zero forms" defect, but this was not clicked
  through live, so treat as unconfirmed rather than cleared.
- The 24-hour promise: only 1 hit sitewide versus Property's ~115, so this site does not appear
  to share that defect at scale; the single hit's location was not isolated to confirm it is not
  in a nurture email (L9's own check of `lead-nurture.ts` found zero "24 hour" style text there).
- Identical segment-page closers: not checked (C4 template match unverified).

## Questions (missing data, not findings)

1. Does `web/src/lib/schema.ts` pass `organizationType: "AccountingService"` and
   `parentOrganization`/`sameAs` anywhere, or does it fall through to the `"ProfessionalService"`
   default? (P5, G2)
2. Is `ResourceGate.tsx` ever mounted on the calculator result path, which would violate L3's
   "no gate" rule, or is it resources-only? (L3)
3. Exact calculator count and per-calculator FAQPage/cite-this coverage. (L4)
4. Does a `StickyCTA` equivalent exist on this site? (L7)
5. What lead-source string does `/api/leads/submit` send for this site, and does the estate
   leads CHECK constraint (dentists/property/medical/solicitors/general/agency) accept it? (L12)
6. Post recency breakdown (count with `date >= 2026-07-30`, newest post date) and whether posts
   carry `dateModified`/`reviewedAt`. (C1, C7)
7. Is the IndexNow/Bing/GSC engine registration noted in STATE.md's pre-launch section still
   current now that the site has been live since 09-16? (G10)
8. 390px real-emulation and playbook 9.1 kit-adoption numbers were not run in this pass. (D7, D8)
9. Precise count of construction-cis commits since the 09-16 deploy that have not been
   re-deployed, beyond the one canonical-fix commit identified. (I2)

## Commands and files read

- `cat construction-cis/niche.config.json`
- `grep -rlE "not an accountancy practice|partner network|referral network|a specialist reviews|we are not accountants" construction-cis/web/src construction-cis/niche.config.json construction-cis/web/public`
- `sed -n` reads of `about/page.tsx`, `complete/page.tsx`, `contact/page.tsx`, `config/site.ts`
- `git show --stat 63087d14`, `git show --stat 815ae7de`, `git log --since=2026-09-26 --grep=canonical --stat`
- `cat construction-cis/web/src/lib/schema.ts` (partial), `construction-cis/web/public/llms.txt`
- `grep -rl "LeadCTAPanel\|LeadForm" construction-cis/web/src/app`
- `grep -rn "inline_mini\|mobile_tool\|calc_result_form\|..." construction-cis/web/src`
- `find construction-cis/web/src/components/intent construction-cis/web/src/lib/intent`
- `cat construction-cis/web/src/config/lead-nurture.ts` (grep for delayHours/voice/partner)
- `git tag -l 'port-construction-cis-*'`; `grep -rl "web-shared/design" construction-cis/web/src | wc -l`
- `find construction-cis/web -iname "*.mdx" -o -iname "*.md" | grep -i blog | wc -l`
- `cat construction-cis/web/src/app/robots.ts`
- `curl -sI https://www.tradetaxspecialists.co.uk/{,robots.txt,llms.txt,llms-full.txt,sitemap.xml}`
- `tail -30 docs/construction-cis/STATE.md`; `head -40 docs/construction-cis/STATE.md`
- `git log -3 --format="%ad %s" --date=short -- docs/construction-cis/STATE.md`
- `python scripts/validate_blog_content.py --help`
- `sed -n '40,60p' construction-cis/web/src/app/layout.tsx`
- `grep -n -B2 -A2 "prose-standard" construction-cis/web/src/app/globals.css`

---

# Wave 2 reader append (2026-09-28)

Control, per brief rule 7: `https://www.gov.uk` rendered with the same `puppeteer-core`
`page.emulate` code (390x844, deviceScaleFactor 3, isMobile, hasTouch) gives
`document.documentElement.scrollWidth = 390`, `window.innerWidth = 390`, zero overflowing
elements. Real emulation confirmed, so the 390 numbers below are trustworthy.
Pages rendered: `/`, `/about`, `/services`, `/for/plumbers`,
`/blog/software-and-tools/xero-cis-guide`, `/calculators/cis-deduction-calculator`, `/contact`,
plus `/book` and `/thank-you`, plus all 12 `/for/*` pages for the sameness check.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | PASS, best of the four sites. Two header CTAs visible at 1280 ("Contact" 87x38 at x=974, "Book a free call" 155x40 at x=1093), both gone at 390 | rendered `getBoundingClientRect`; `headerCtaVisible` = `[]` at 390 on all 7 pages |
| D5 | Geist Sans and Geist Mono via `geist/font`; body computes `GeistSans, "GeistSans Fallback", system-ui` | `construction-cis/web/src/app/layout.tsx:2,3,69`; `getComputedStyle(document.body).fontFamily` live |
| D6 | `StatsCounter` exists and is used on `/services` only; no literal-date rendering seen on the pages rendered, so the Medical "0 for dates" trap does not show here | `grep -rl StatsCounter construction-cis/web/src` = `app/services/page.tsx` |
| D7 | 390 `scrollWidth` = 390 on all 7 pages | see design numbers table |
| D8 | 9.1 gate: row1 layout-utils=1; row2 kit adopted = **2 distinct / 14 call sites**; 2a declined=6; 2b homepage marketing adopted=0 declined=1; row3 webfont geist sans+mono; row4 backdrop=1; row5 Eyebrow=9 section-label=0; row6 three non-token focus rings; row7 two gradient files; row8 walks=6 guards=1 | block from `DESIGN_PORT_PLAYBOOK.md` section 9.1 run verbatim, read-only |
| G3 | FAQPage YES on `/for/*` and calculators. **Service schema NO on `/for/*`** (only the `/services` hub carries 8 Service nodes). **BreadcrumbList NO on `/for/*`**; present on the `/services` hub and on calculators | `curl` plus `grep -o` for `"FAQPage"`, `"@type":"Service"`, `BreadcrumbList` per URL |
| G7 | `lastModified: now`, build time, on every static route. Not real per-page dates | `construction-cis/web/src/app/sitemap.ts:15-18` |
| G8 | **NOT fixed live.** Wave 1 read the commit, not the site. 50 of the first 60 sitemap URLs serve `<link rel="canonical" href="https://www.tradetaxspecialists.co.uk">`, the homepage: all 39 `/for/*` pages, `/services`, `/about`, `/contact`, `/cis-refund`, `/gross-payment-status`, both template pages, `/for`, and the three legal pages | `curl` each URL and extract `rel="canonical"`; `bb297ab2` is dated 09-27 and the site last deployed 09-16 |
| G9 | No stray `noindex` on public pages. `noindex` only on `/admin/*` and token API routes. `/embed` not blocked, matching Property | `grep -rn "noindex\|index: false" construction-cis/web/src/app` |
| L3 | PASS. `/calculators/cis-deduction-calculator` renders 3 forms: two 6-field mini captures and one 10-field foot form. No gate, no modal, no PDF offer, and the first mini sits under the result | rendered `document.querySelectorAll('form')`, field counts 6/6/10 |
| L4 | **12 calculators** live: cis-deduction, cis-gps-eligibility-checker, cis-refund-estimator, cis-self-assessment, cis-take-home, cis-invoice-splitter, cis-vs-paye-comparison, cis-back-years, cis-penalty, cis-reverse-charge-checker, trade-take-home, cis-sole-trader-vs-limited. FAQPage and WebApplication both present on the one sampled | `grep -c '/calculators/'` on the live sitemap = 12; schema greps above |
| L8 | `/book` with no token renders **zero forms** and says "This page needs the personal link from your email or text message." The same dead end as Property. `/thank-you` renders the Aswatax sentence correctly | rendered `document.querySelectorAll('form').length` = 0 on `/book` |
| L5 | Chat widget is live and **already open on page load** at 1280, a fixed panel at `bottom-24 right-4 z-[55]`. The only one of my four sites with a widget | rendered fixed-element scan |

## Reader findings

The kit is the best of my four sites and the writing is clean: zero em-dashes on every page
rendered, no US spellings, one weak word ("landscape", once, on the home page), and the answer
sits in the first paragraph everywhere except the segment and hub pages, where an eyebrow label
comes first. Two things overwhelm that. Live, 50 of 60 pages tell Google the homepage is the
canonical version of themselves, so the 39-page `/for/*` estate is invisible, and the fix is
already written and simply undeployed. And the pool-model voice sits on the prospect pages, not
only in the consent box: four separate sentences across home, /about, /services and /contact hand
the client to a third-party firm before they have submitted anything.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | 50 of 60 live URLs | Every page canonicalises to the homepage, so `/for/*` (39 pages), `/services`, `/about`, `/contact` and both templates are de-indexed by their own tag | `curl https://www.tradetaxspecialists.co.uk/for/plumbers` gives `rel="canonical" href="https://www.tradetaxspecialists.co.uk"` | XS to deploy; code fix `bb297ab2` already exists |
| BLOCKER | /contact | Rule 8 breach in the clearest place a prospect looks, under the heading "What happens after you send it": "Your enquiry goes to regulated firms in our specialist partner network, so a specialist can answer it." | rendered innerText, `/contact` | S |
| BLOCKER | /, /about, /services | Repeated three times: "The specialist firm you speak to sets its own fee and agrees it with you up front." A third party pricing the work, on three top pages (/about carries it twice) | rendered innerText | S |
| FIX | / | Trust row reads "A specialist CIS accountant gets in touch. Not a sales team, not a call centre." Third person about the person who calls, the "a specialist will call" pattern rule 8 names | rendered innerText, home trust strip | XS |
| FIX | /book | Footer CTA "Book a consultation" points at `/book`, which renders zero forms and tells the visitor to go and find an email. Property's exact defect, shared | rendered: `/book` forms = 0; footer link `Book a consultation -> /book` | S |
| FIX | /book | "A specialist will call you then, no obligation." A literal rule-8 phrase | rendered innerText, `/book` | XS |
| FIX | blog post | The comparison table overflows to `right=570` at 390 with **no scrolling ancestor** (`clip=null`), so the right-hand columns are unreachable on a phone. The home page table is correct, inside a `div` with `overflow-x:auto` | rendered: blog `TABLE r=570 clip=null` while page `scrollWidth` is 390; home `TABLE r=593 clip=DIV/auto` | S |
| FIX | all 12 `/for/*` | Identical three-line close on every page, the same Property defect: "Book a free call. We will talk through your CIS position, your deduction history and whether there is anything worth changing. No hard sell, no obligation." then the consent sentence, then "A specialist CIS accountant will be in touch." | all 12 pages hash to one group, see sameness table | M |
| FIX | all `/for/*` | No `BreadcrumbList` and no `Service` node on any segment page; Property has both | schema greps above | S |
| FIX | all | Sitemap `lastModified` is build time on every route, so every page looks freshly edited on every deploy | `sitemap.ts:15-18` | XS |
| NIT | blog post | One mini-capture input, `enquiry_ref`, has no label and no `aria-label`. Every other input on the site is labelled | rendered per-form `unlabelled` = `["enquiry_ref"]`, inline form only |  XS |
| NIT | / | "landscape" once ("the CIS landscape"), the only AI-tell word found on the whole site | rendered innerText | XS |
| NIT | all | Chat widget is already expanded on first paint at 1280 rather than waiting for intent | rendered fixed-element scan | XS |
| NIT | all | Focus ring on the first form input is the browser default (`outline: 1px auto`), not a design token, and three non-token `focus-visible:outline-*` classes exist in source | `getComputedStyle` after `.focus()`; 9.1 gate row 6 | XS |

### Design numbers (page x metric)

| Page | sw 1280 | sw 390 | hdr CTA 1280 / 390 | body text contrast | submit contrast | forms | longest para (words) |
|---|---|---|---|---|---|---|---|
| gov.uk control | 1280 | **390** | n/a | n/a | 3.91 | n/a | n/a |
| / | 1280 | 390 | 2 / 0 | 7.81 | 5.18 | 1 | 105 |
| /about | 1280 | 390 | 2 / 0 | 7.81 | 5.18 | 1 | 69 |
| /services | 1280 | 390 | 2 / 0 | 7.81 | 5.18 | 1 | 83 |
| /for/plumbers | 1280 | 390 | 2 / 0 | 12.09 | 5.18 | 1 | 60 |
| blog post | 1280 | 390 | 2 / 0 | 7.81 | 5.18 | 2 | 96 |
| calculator | 1280 | 390 | 2 / 0 | 10.36 | 5.18 | 3 | 81 |
| /contact | 1280 | 390 | 2 / 0 | 7.81 | 5.18 | 1 | 56 |

Contrast computed from `getComputedStyle` with each colour resolved through a 1x1 canvas, so
`oklch()` values convert properly. Every number passes WCAG AA for body text (4.5) and for the
orange CTA (white on `rgb(194,65,12)` = 5.18). Font applied: Geist Sans. No images at all, so no
missing alt text. No placeholder phone numbers or emails, and no `tel:` or `mailto:` links anywhere.
`.prose`: no `.prose p` exists on the blog post, consistent with the inventory's D2 row (this site
does not import `prose-standard.css`), yet the post still reads correctly because the article
styling is hand-rolled.

### Sameness

| Scope | Result |
|---|---|
| Within site, 12 `/for/*` closers | **Identical**, one group, all 12 |
| Within site, hub and money pages | `/services` closes with the same "fees agreed up front" block as home and /about |
| Against Property's `/for/` close | **Different wording, same structure.** Property: "A couple of sentences helps us prepare properly for your call." then consent, then "We respond within 24 hours and store your details securely. You will get a text and email from us straight away. A quick reply confirms your callback." construction-cis substitutes its own two lines around the same consent sentence |
| Foot form | One shared 10-field foot form on all 7 page types; the only hidden field is `sourceUrl`, and no `form_id` is exposed in the DOM on any page |

## Corrections to the inventory

| Row | Wave 1 said | Correction | Evidence |
|---|---|---|---|
| G8 | "NONE (fixed)" | False on the live site. The commit exists, the deploy does not. 50 of 60 live URLs canonicalise to the homepage | canonical sweep above |
| D1 | "`web-shared/design` imported in 27 files", read as full adoption | 27 files name a kit path, but only **2 distinct kit components are actually imported**, across 14 call sites, and the homepage marketing imports **zero**. The 9.1 gate reads this as the crypto pattern (reimplemented, not adopted), not the generalist pattern | 9.1 gate rows 2 and 2b |
| L3 | "?" | Settled PASS: three forms, no gate | rendered |
| L7 | "?", StickyCTA not located | A fixed bottom-right offer panel does mount at 390 on every page, and a fixed "Welcome back" bar appears on the calculator and /contact, so the sticky layer exists under different names | rendered sticky scan at 390 |
| L8 | "likely does NOT share Property's untokened /book defect" | It shares it exactly: `/book` with no token renders zero forms | rendered |
| P2 | "6 files with partner network" on about, complete, contact, consent | Under-counted the rendered surface. `/services` and the home page also carry it, in the fee sentence, and the home trust strip adds a third-person "a specialist gets in touch". Sweep by the rule, not the file list | rendered innerText on all 7 pages |
