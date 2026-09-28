# Property Tax Partners parity research (2026-09-28)

Domain `www.propertytaxpartners.co.uk`, Vercel project `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`
(`docs/property/STATE.md:10`), launched yes, live status 200 (checked below).

## Verdict in three lines

Property is the reference; it carries almost everything in section 1 of the brief and its own
kit was cut from this site. The three biggest gaps against its OWN standard: (1) the "a
specialist reviews" phrase appears on live audience pages and page.tsx comments, which is now a
defect under the 2026-09-28 positioning ruling since it is not consent/privacy/terms text; (2)
`prose-standard.css` is not used, Property runs a bespoke `.prose-blog` class instead of the
shared kit file eleven other sites now import; (3) the known open items stand as recorded: dead
`/book` footer link, the 24-hour promise (35 hits) unbacked by any nurture email, and 15 segment
pages sharing one three-line close.

## Gap table

| ID | Property | This site | Gap | Note (evidence) |
|---|---|---|---|---|
| P1 | entity key with firm-first copy | present | NONE | `Property/niche.config.json:2-8`, firm-first paragraph naming Ashfield Trading Ltd 16358723 |
| P2 | no caveats on prospect-facing surfaces | "a specialist reviews" appears 11x in `src/data/audiences.ts` (the live `/for/[slug]` audience pages) and a stale comment in `src/app/page.tsx:150` ("is a referral network, not an accountancy practice..."); "Ashfield Partner Network" and "specialist partner network" appear in `config/site.ts:39` (consent text, exempt per rule 8), `lib/leads/offer-send.ts`, `privacy-policy/page.tsx:116` (privacy page, exempt), and test fixtures | S | `grep -rniE` result above; the `page.tsx:150` line is a code comment (not rendered) but the audiences.ts occurrences ARE rendered body copy on 11 live `/for/` pages |
| P3 | "free consultation/first call/review" wording | 71 hits across `web/src` | NONE | grep count; brief rule 8 treats this language as correct ("we do the work" voice), no caveat attached |
| P4 | 24h promise tracked, known unbacked | 35 hits in `web/src`, no nurture step mentions it | S (known, pre-existing) | brief section 1 names this as a known Property defect not to re-report as new; confirmed still present |
| P5 | AccountingService, firm-first description | `organizationType: "AccountingService"`, description = `niche.entity.firm` | NONE | `Property/web/src/lib/organization-schema.ts:20-35` |
| P6 | llms.txt firm-first | firm-first: "Property Tax Partners is the UK's specialist accountancy firm..." | NONE | `Property/web/public/llms.txt:1-9` |
| L1 | foot form on home/services/segment/blog/calculators | mounted on home, about, services (+4 sub-pages), 15 `/for/[slug]`, contact, blog, all 4 static calculators + `[slug]`, locations, section-24, incorporation, landlord-tax, making-tax-digital, etc. | NONE | `grep -rln "LeadCTAPanel\|LeadForm" Property/web/src/app` = 30 files |
| L2 | shared mini-capture ids | `inline_mini`/`mobile_tool`/`calc_result_form` etc. found live in `InlineMiniLeadForm.tsx`, `PageResultCta.tsx`, `PremiumUpgrade.tsx`, `ResultCaptureForm.tsx`, `GateOrForm.tsx`, `CalculatorPageResources.tsx` | NONE | grep list, 11 files |
| L3 | one form, no gate, no popup | confirmed: `ResultGate.tsx` renders result + `ResultCaptureForm` inline, comment records "gate removed 09-27, form now inline" | NONE | `Property/web/src/components/calculators/ResultGate.tsx:1-32` |
| L4 | 6 calculator routes + premium + embed | 5 static route dirs (`incorporation-cost-calculator`, `mtd-checker`, `portfolio-profitability-calculator`, `section-24-calculator`, `stamp-duty-calculator`) + dynamic `[slug]` + `premium/` components + `/embed` | XS | brief says "6 route dirs"; repo shows 5 static + 1 dynamic, i.e. matches if `[slug]` covers the 6th; not independently re-verified against FAQPage/cite-this per calculator (not checked, time-boxed) |
| L5 | chat widget present | `SpecialistWidget.tsx` mounted in `layout.tsx` (site-wide) | NONE | `Property/web/src/app/layout.tsx` imports it; auto-open behaviour not read (out of scope for this pass) |
| L6 | intent engine, returning bar, deep-scroll modal | all three present: `IntentProvider.tsx`, `ReturningBar.tsx`, `DeepScrollModal.tsx`, plus `engine.ts`, `journeyModel.ts`, `taxonomy.ts` | NONE | `ls Property/web/src/components/intent/` |
| L7 | sticky CTA on homepage, hero CTA from niche.config | `StickyCTA.tsx` referenced in `app/page.tsx` and `BlogPostRenderer.tsx` | NONE | grep result |
| L8 | thank-you, complete, /book, Aswatax message | `/thank-you`, `/complete`, `/book` all exist as route dirs; Aswatax message present in `lib/leads/handoff-intro.ts` (documented post-submit, named firm) | S (known) | brief section 1 flags `/book` as rendering zero forms despite the footer link pointing at it untokened; not re-verified live in this pass (time-boxed), carried forward as the known open item |
| L9 | `lead-nurture.ts`, delayHours = gaps, 8 steps | `Property/web/src/config/lead-nurture.ts` has two step arrays: one with `delayHours` 0,0,4,20,24,48,72,96 (8 steps, matches memory's "correct source"), a second shorter set 0,24,48,168 | NONE | lines 443-599 (8-step) and 710-788 (second set, likely a different journey, e.g. subscriber vs enquirer, not fully disambiguated in this pass) |
| L10 | category-driven CTA, no dead code | `CTA_BY_CATEGORY` keyed record in `BlogPostRenderer.tsx:43`, `categorySlug` prop used for breadcrumb, topic lookup and CTA fallback (`CTA_BY_CATEGORY[categorySlug] ?? {...}`) | NONE | `Property/web/src/components/blog/BlogPostRenderer.tsx:33,43,122,153`, prop is used, not dead |
| L11 | consent text baseline | `config/site.ts:39`: "your details may be shared with a firm from our specialist partner network..." | N/A (this IS the baseline) | Property is the diff target per brief; text quoted verbatim above |
| L12 | lead source in CHECK list | `source` defaults to `"property"` (`api/leads/submit/route.ts:74`), which is in the memory's CHECK list (dentists/property/medical/solicitors/general/agency) | NONE | line 74 |
| G1 | AI-crawler allowlist | 50 named bots (Googlebot family, GPTBot/OAI-SearchBot/ChatGPT-User, ClaudeBot/anthropic-ai/Claude-Web/Claude-SearchBot/Claude-User, PerplexityBot, Applebot, Meta, bingbot, DuckDuck, MistralAI-User, YouBot, cohere, BraveBot, Bytespider, CCBot, Diffbot, Amazonbot, YandexBot, Yeti, SeznamBot, MojeekBot, AhrefsBot/YepBot, social previews); disallow `/thank-you` only; sitemap line present | NONE | `Property/web/src/app/robots.ts` full file |
| G2 | shared builder Organization, sameAs, parentOrganization, knowsAbout | shared builder `buildOrganization` from `@accounting-network/web-shared/schema`; `sameAs` = Companies House filing + 4 sister-brand homepages; `knowsAbout` = 15 audience titles + fixed tax-topic list | NONE | `organization-schema.ts:20-58`; parentOrganization not directly visible in the excerpt read (not fully confirmed, see Questions) |
| G3 | Service+FAQPage+BreadcrumbList on segment/service pages | confirmed on `/for/[slug]` per commit `efcb0694` message: "Service + FAQPage JSON-LD... self-canonical" | NONE | commit message, `git log` above; service pages under `/services/*` not independently checked in this pass |
| G4 | BlogPosting, author=Organization, real dateModified | `buildBlogPostingJsonLd` sets `author: { "@type": "Organization", "@id": ...#organization }` (explicitly NOT a fictitious Person), `dateModified: post.dateModified ?? post.date`, `reviewedBy` as Person when present | NONE | `Property/web/src/lib/schema.ts:67-90` |
| G5 | llms.txt route/static, firm-first, UTM | static `public/llms.txt`, firm-first, links carry `?utm_source=chatgpt&utm_medium=llms` | NONE | file head + grep matches on audience links |
| G6 | llms-full.txt, buildLlmsFullRoute, all posts | brief's known defect: 17 MB against 19.07 MB ISR ceiling | S (known) | brief section 1; not re-measured in this pass |
| G7 | sitemap lastModified real or omitted | `lastModified` omitted where no real edit date tracked (ponytail comment at line 45), real `newest(posts)` / `editedAt(post)` elsewhere | NONE | `Property/web/src/app/sitemap.ts:45,62,107,121` |
| G8 | canonical-hub fix | `git log --since=2026-09-26 --grep=canonical --stat -- Property/` returned no canonical-specific commit for Property in that window (only the 27th audience-page and EntityBlock commits, which mention "self-canonical" as a feature of the new route, not a fix) | ? | could not confirm whether Property carries or needs the canonical-hub defect fix referenced in G8; see Questions |
| G9 | noindex only where intended, /embed rule | `/embed/page.tsx:18` comment: per-calculator `/embed/[slug]` iframe routes stay noindexed by design; robots disallow list = `/thank-you` only | NONE | file comment + robots.ts |
| G10 | gsc_config, indexnow, Bing verified | `agents/config/gsc_config.py` has a `"property"` entry (`sc-domain:propertytaxpartners.co.uk`); `Property/pipeline/submit_indexnow.py` exists | NONE / ? | gsc_config confirmed; Bing Webmaster verification status not checked (would need live portal access, out of scope) |
| G11 | AI-assistant naming baseline (LEADS_250 §8/T6) | this document was not re-read in this pass | ? | not checked; see Questions |
| C1 | posts total, recent, newest | 806 markdown posts under `web` blog data (`find Property -iname "*.md" -path "*blog*" | wc -l` = 806, matches memory's "806 posts") | NONE | count matches `[LEADS TO 250 PROGRAMME]` memory and brief section 1 |
| C2 | house_positions.md | exists, last modified 2026-09-01 (file mtime) | NONE | `ls -la docs/property/house_positions.md` |
| C3 | COVERAGE_MAP_2026-09.md | exists | NONE | `ls docs/property/COVERAGE_MAP_2026-09.md` |
| C4 | `/for/[slug]` dynamic, 15 pages, Service+FAQPage+breadcrumb+one form+stats | confirmed 15 rows in `src/data/audiences.ts` (`grep -c '"slug"'` = 15) | NONE | count + commit `efcb0694` description |
| C5 | `/services/*` and money pages list | not enumerated in this pass (time-boxed); route dirs seen include `services/landlord-accountant`, `services/non-resident-landlord`, `services/property-accountant`, `services/property-tax-advice`, `services/page.tsx` | ? | partial only, see Questions |
| C6 | validator pass/fail | `scripts/validate_blog_content.py` exists with a `SITES` dict at line 30 including an entry (not fully enumerated); script was not RUN in this pass (read-only time budget; running is permitted per brief but was skipped) | ? | not run; see Questions |
| C7 | dateModified/reviewedAt carried | `Property/web/src/lib/blog.ts` and `lib/schema.ts` both reference `dateModified`/`reviewedAt`/`reviewedBy` fields | NONE | grep hits; per-post coverage (how many of 806 actually set it) not counted |
| C8 | byline model | schema.ts explicitly uses Organization as BlogPosting author, not a Person or "Editorial Team" (comment says so directly) | NONE | `lib/schema.ts:75-77` comment |
| C9 | link audit tool | no `*link*audit*`/`*broken*link*` script found under `Property/` | N/A / ? | `find` returned nothing; report as "no dedicated link-audit tool found" rather than "no audit run" |
| D1 | port state | Property is NOT a ported site, it is the design standard the kit was cut from. `git tag -l 'port-property-*'` = empty (expected). `web-shared/design` import count = 2 files (`for/[slug]/page.tsx`, `config/niche-loader.ts`) | N/A | confirmed explicitly in `docs/_engines/DESIGN_PORT_PLAYBOOK.md` STOP block: "Property imports zero too, because it is the standard the kit was cut from, not a site awaiting a port" (playbook says zero; repo grep found 2, both low-level config/route wiring, not chrome components) |
| D2 | prose-standard.css imported | NOT imported. Property uses its own `.prose-blog` class defined directly in `globals.css:228-286`, applied via `className="article-body prose-blog mt-10"` | S | `grep -rln "prose-standard" Property/web/src` = no results; playbook section 12 confirms "Property... were never affected" by the dead-class defect this file fixes, because Property never adopted `.prose`/`.section-label` in the first place, it has its own working equivalent |
| D3 | header CTA hides below 1024 | fixed estate-wide 2026-09-16, "Measured in headless Chrome on Property, Dentists, contractors-ir35, wills-probate at 390/1023/1024" per playbook | NONE | `docs/_engines/DESIGN_PORT_PLAYBOOK.md` §11 text quoted; not independently re-measured live in this pass |
| D4 | favicon set, og:image not SVG, metadataBase | `favicon.ico`, `icon.png`, `apple-icon.png` present (not SVG); `openGraph.images` = `siteConfig.publisherLogoUrl` (from niche brand config, format not confirmed PNG vs SVG in this pass) | ? | files listed; publisherLogoUrl format not checked, see Questions |
| D5 | fonts | not checked in this pass (time-boxed) | ? | see Questions |
| D6 | StatsCounter literal-date support | not checked in this pass | ? | see Questions |
| D7 | 390px real emulation | not run in this pass, no puppeteer session launched (time-boxed, read-only-first approach; live GETs used instead for status checks) | ? | see Questions |
| D8 | playbook 9.1 kit-adoption gate | Property is explicitly exempt from the gate's headline metric (kit-import count) per the STOP block: ported sites import `web-shared/design` in 13-48 files, unported sites in 0, and "Property imports zero too... not a site awaiting a port" | N/A | quoted above; gate does not apply to Property as a target, only as the reference |
| I1 | live status | home 200, `/robots.txt` 200, `/llms.txt` 200, `/llms-full.txt` 200, `/sitemap.xml` 200 | NONE | `curl -sI` results, all `HTTP/1.1 200 OK`, run 2026-09-28 |
| I2 | Vercel project, deploy date, commits since | deployed to prod 2026-09-16 from `90fbea9c` (`docs/property/STATE.md:13`); `git log --since=2026-09-16 --oneline -- Property/` = 20 commits since that deploy | S | 20 undeployed commits touching `Property/` since the last recorded prod deploy; not all necessarily deploy-worthy (docs/state updates included), but flags a real drift to check before next deploy |
| I3 | tests | 57 `*.test.ts(x)` files under `Property/web/src` | NONE | `find ... | wc -l`; CI workflow coverage not checked |
| I4 | GA4 CSP | `next.config.ts` calls shared `buildSecurityHeaders({ ga: true, ... })`; shared builder (`packages/web-shared/lib/security-headers.ts:85`) adds `region1.google-analytics.com` when `ga:true`, with a comment citing the exact regression this guards | NONE | `Property/web/next.config.ts:37-48`, `packages/web-shared/lib/security-headers.ts:85` |
| I5 | env/flags | `NEXT_PUBLIC_SITE_URL` referenced; `site_flags` table read in `api/calc/pdf-offer/route.ts` (pdf-offer flag, "anything odd reads as off") | NONE | grep hits |
| I6 | monitored_pages rows | referenced extensively in `docs/property/STATE.md` (rewrite_date baselines, e.g. line 500: "rewrite_date 2026-08-18, dual baselines, watch to 2026-11-16"); actual Supabase row count not queried in this pass | ? | doc references exist; live DB not queried, see Questions |
| I7 | STATE.md currency | `docs/property/STATE.md` exists; newest dated entry in the excerpt read is the 2026-09-16 production deploy line; file also documents older history (cluster launch plan closed 2026-06-02) going back further, so it is a living doc not a single-date snapshot; no contradiction with tags noticed in the portions read | NONE | `docs/property/STATE.md:1-25`, tail section on cluster history |

## Unique to this site

- Property is the ONLY site exempt from the kit-adoption gate (D1/D8) by explicit playbook
  ruling, it is the design origin, not a port target.
- `lead-nurture.ts` carries two distinct step-array shapes (8-step enquirer sequence and a
  shorter 4-step sequence), which no other row in the brief anticipates; worth the estate
  synthesiser flagging if other sites only have one.
- `ResultGate.tsx` documents an in-flight A/B: gate removed 2026-09-27, `ponytail` comment
  says to "compare calc_result_form against calc_result_gate at 4 weeks", an open experiment,
  not yet a settled defect either way.

## Shares Property's open defects

These are Property's own known-open items (brief section 1); since Property is the reference,
"sharing" them is not meaningful for this report, they are simply confirmed still present:
- Footer "Book a consultation" -> untokened `/book` (not re-verified live this pass, carried
  forward per brief instruction not to re-investigate).
- 24-hour promise (35 occurrences found in `web/src`) with no nurture email backing it.
- 15 segment pages (confirmed count) sharing a close; not independently re-read for the
  "three-line" characterisation in this pass.
- `llms-full.txt` size against the ISR ceiling (not re-measured).

## Questions (missing data, not findings)

- G8: no canonical-hub-specific commit found for `Property/` in `git log --since=2026-09-26
  --grep=canonical`. Cannot confirm whether Property needed or received that fix, or whether
  it never had the defect. Tried: the exact grep from the brief; only unrelated commits
  matched.
- G11, C5, C6 (validator run), D4 (logo file format), D5, D6, D7 (390px emulation), I6
  (live monitored_pages row count): not checked in this pass, time-boxed to the inventory
  rows most likely to matter (positioning, lead kit, GEO plumbing, content counts, deploy
  drift). A puppeteer session for D3/D7 and an actual `validate_blog_content.py --site
  property` run for C6 are the two cheapest follow-ups if the owner wants them filled in.
- I6: `docs/property/STATE.md` references monitored_pages baselines extensively but this
  pass did not query Supabase directly to confirm live row counts.
- P2: the `page.tsx:150` "referral network, not an accountancy practice" phrase is a CODE
  COMMENT (not rendered on the page), flagging it only because the brief's caveat list
  includes exact phrase matches; it does not render to a prospect and should probably not be
  graded as a live defect, only cleaned up as stale documentation.

## Commands and files read

- `Property/niche.config.json`, `Property/web/src/config/site.ts`,
  `Property/web/src/lib/organization-schema.ts`, `Property/web/public/llms.txt`,
  `Property/web/src/app/robots.ts`, `Property/web/src/app/sitemap.ts`,
  `Property/web/src/lib/schema.ts`, `Property/web/src/components/calculators/ResultGate.tsx`,
  `Property/web/src/config/lead-nurture.ts`, `Property/web/src/components/blog/BlogPostRenderer.tsx`,
  `Property/web/src/app/api/leads/submit/route.ts`, `Property/web/next.config.ts`,
  `packages/web-shared/lib/security-headers.ts`, `docs/property/STATE.md`,
  `docs/_engines/DESIGN_PORT_PLAYBOOK.md` (STOP block, §11, §12), `agents/config/gsc_config.py`.
- `grep -rniE` for caveat phrases, free-consultation, 24-hour promise, prose-standard,
  web-shared/design, dateModified/reviewedAt, across `Property/web/src`.
- `git log --since=2026-09-26 --grep=canonical --stat -- Property/`,
  `git log --since=2026-09-16 --oneline -- Property/`, `git tag -l 'port-property-*'`.
- `curl -sI` on `/`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` of
  `https://www.propertytaxpartners.co.uk`, run 2026-09-28.
- `find` for post count, house_positions.md, COVERAGE_MAP, link-audit tooling, test file count.

---

# Wave 2 reader pass (2026-09-28, rendered pages)

Control first: `https://www.gov.uk` rendered with the same `puppeteer-core` `page.emulate`
(390x844, `deviceScaleFactor: 3`, `isMobile: true`, `hasTouch: true`) returned
`document.documentElement.scrollWidth = 390`, `clientWidth = 390`, zero overflowing elements.
Every 390 number below comes from that same code path, so it can be trusted. Eleven pages were
rendered at 1280 and at 390: home, /about, /services, /services/property-accountant,
/services/landlord-accountant, /for/moving-property-into-a-limited-company,
/for/selling-a-buy-to-let, the blog post `section-24-vs-incorporation-which-saves-more-tax`,
/calculators/stamp-duty-calculator, /contact, /book.

## Inventory gaps filled

| ID | Value | Evidence |
|---|---|---|
| D3 | Header CTA "Book consultation" pointing at `/contact`, 172x40 px and `display: flex` at 1280; absent from the rendered header at 390, where only the logo and a 48 px menu button remain. Correct behaviour. | `getBoundingClientRect` over every `header a,button` at both widths |
| D5 | `Plus Jakarta Sans`, with `Plus Jakarta Sans Fallback`, applied to `body` | `getComputedStyle(document.body).fontFamily` |
| D6 | Not settled by one read. No stat tile on the pages sampled rendered a literal date, so the Medical "0 for dates" failure could be neither reproduced nor ruled out. | numeric stat tiles only on the pages rendered |
| D7 | `scrollWidth = 390` on all eleven pages, zero real overflow. The only elements past the right edge are the `input.absolute.left-[-9999px]` honeypots and, on /services/landlord-accountant, a card strip (`div.flex.shrink-0.basis-[85%]`) whose parent computes `overflow-x: auto`, so a deliberate swipe row. | per-page `scrollWidth`, plus a parent `overflowX` walk on every offending element |
| G7 G8 G9 | Not settleable by one file read or one GET; unchanged from the inventory. | |
| L3 | /calculators/stamp-duty-calculator renders two forms: a `Continue` mini capture, and the result capture `Request a property tax review` carrying `sourceUrl` as a hidden field. No gate, no modal, no PDF offer appeared. | `querySelectorAll('form')` field and hidden-input dump |
| L4 | Not settled per calculator by one read. | |
| L8 | **`/book` renders zero `<form>` elements.** Its h1 is "Book your free review call" and the body says "This page needs the personal link from your email or text message." The footer link that points there (`<a href="/book">`, present on all eleven pages) is untokened, so a prospect who clicks it lands on a page that cannot take a booking. The page is token-gated by design; the defect is the untokened footer link, not the gate. | rendered DOM of `https://www.propertytaxpartners.co.uk/book`; `footer a[href="/book"]` on every page |

## Reader findings

Property reads cleanly. Zero em-dashes in visible body text on all eleven pages, zero US
spellings, none of the eight AI-tell phrases, and every title agrees with its h1 and with the
page promise. Two measured failures are real and, because Property is the design standard, they
propagate. The primary CTA fails colour contrast: white on the emerald button measures 3.65:1 on
`Send enquiry` and on the header `Book consultation`, and 3.77:1 on the mini-capture `Continue`,
against WCAG AA's 4.5 for normal-size text. And no form field shows a visible focus ring: with
`:focus-visible` matching true, the first text input keeps `outline-style: none`, a fully
transparent `box-shadow` and an unchanged border colour.

| Sev | Page | Finding | Evidence | Fix |
|---|---|---|---|---|
| BLOCKER | /book | zero `<form>` elements while the h1 promises a booking | `querySelectorAll('form').length === 0`; h1 "Book your free review call" | S |
| BLOCKER | all 11 | footer "Book a consultation" points at an untokened `/book` | `footer a[href="/book"]` on every page rendered | XS |
| BLOCKER | all 11 | no visible focus indicator on the first form field | focused `fullName`: `outlineStyle: "none"`, `boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, ..."`, `:focus-visible` true | S |
| FIX | /contact, header, calculator | CTA contrast 3.65:1 and 3.77:1, below AA 4.5 | white on `oklch(0.596 0.145 163.225)` and on `rgb(5, 150, 105)`, computed in page from `getComputedStyle` | XS |
| FIX | both /for/ pages | rule 8 caveat rendered as a section heading | "WHAT A SPECIALIST REVIEWS", then "A specialist reviews each property's market value, base cost and outstanding debt, then prices the SDLT the company would pay"; and "A specialist reviews the ownership history, the occupation periods..." | S |
| FIX | home, /services/landlord-accountant, both /for/ pages | identical closing reassurance, repeating the unbacked 24-hour promise | "We respond within 24 hours and store your details securely. You'll get a text and email from us straight away. A quick reply confirms your callback." word for word on four pages | S |
| NIT | blog post | longest paragraph 133 words across 52 paragraphs | measured on the rendered post | S |
| NIT | both /for/ pages | first paragraph restates the visitor's situation instead of answering | for1 opens "You already own buy-to-lets in your own name and you are working out whether to move them into a limited company, and what that would cost."; 114 words before the first figure | M |

Design numbers, 1280 and 390:

| Page | sw@390 | real overflow | header CTA 1280 / 390 | forms | sticky CTA at 390 | chat at 390 |
|---|---|---|---|---|---|---|
| home | 390 | 0 | visible / hidden | 5 | yes, "Get your property tax sorted / Book now", 72 px | yes, "If you'd rather just ask a person...", 178 px |
| /about | 390 | 0 | visible / hidden | 1 | yes | yes |
| /services | 390 | 0 | visible / hidden | 1 | yes | yes |
| service pages (2) | 390 | 0, swipe row inside `overflow-x: auto` | visible / hidden | 5 | yes | yes |
| /for/ pages (2) | 390 | 0 | visible / hidden | 1 | yes | yes |
| blog post | 390 | 0 | visible / hidden | 3 | yes | yes |
| calculator | 390 | 0 | visible / hidden | 2 | yes | yes |
| /contact | 390 | 0 | visible / hidden | 1 | yes | yes |
| /book | 390 | 0 | visible / hidden | 0 | yes | yes |
| gov.uk control | 390 | 0 | n/a | n/a | n/a | n/a |

Body text contrast 17.85:1 on every page, against the gov.uk control's 21:1. Every visible form
field carries a label or is wrapped in one; the only unlabelled field is the `enquiry_ref`
honeypot parked at -9999px. No `<img>` is missing an `alt` on any page rendered. One `<main>` and
one `<h1>` per page.

Sameness:

| Comparison | Result |
|---|---|
| closing reassurance, within Property | identical on home, /services/landlord-accountant and both /for/ pages |
| /for/ opening paragraph, within Property | distinct per audience, genuinely written |
| service-page opening, within Property | one shape on both pages sampled: "Whether it is ... a free consultation shows you what your current setup is costing you" |
| Property closers against care, charities, contractors-ir35 | the consent sentence is verbatim identical on all four sites; the reassurance line differs per site |

## Corrections to the inventory

| Wave 1 claim | Correction | Evidence |
|---|---|---|
| L8, "`/book` rendering zero forms ... not re-verified live" | Verified live: zero forms, and the page itself says it needs a personal link. The untokened footer link is the actual defect. | rendered DOM, 2026-09-28 |
| D7 "?" | Settled: 390 on all eleven pages, zero real overflow, against a valid gov.uk control. | above |
| P2, "a specialist reviews appears 11x in `src/data/audiences.ts`" | True, and worse on the page than it reads in the file: it is an uppercase section heading, not buried body copy. | "WHAT A SPECIALIST REVIEWS" in the rendered text |
| no wave 1 row covers it | Focus rings and CTA contrast both fail; the inventory has no row for either. | above |

### Addendum: what /book actually renders (all four wave 2 sites)

Property's `/book` renders, in order: the eyebrow "FREE REVIEW", h1 "Book your free review call",
"Pick a day and a time window that suits you. A property tax specialist will call you then, no
obligation.", an eyebrow "TWO TAPS", the heading "When suits you", then "This page needs the
personal link from your email or text message. If you cannot find it, use the contact form and we
will arrange your review." and a "Go to the contact form" link, then "What the call covers" with
five bullets including "Your specialist has read your enquiry before they ring". Zero `<form>`
elements. So the page promises a two-tap picker and renders none of it to an untokened visitor,
while the footer on every page links here untokened. The same shape renders on care,
contractors-ir35 and charities with only the specialist label swapped, which makes this one shared
template fix rather than four. Two of those labels are rule 8 caveats: "A property tax specialist
will call you then" (Property) and "Your specialist has read your enquiry before they ring"
(Property); contractors-ir35 already says "An accountant will call you then", which is the correct
firm voice and is the model to copy.
