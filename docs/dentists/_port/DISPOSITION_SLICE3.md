# DENTISTS PORT BLUEPRINT — SLICE 3: HOMEPAGE, PILLARS, LOCATIONS, ONE-OFFS, LEGAL, RETIREMENTS

Companion to SLICE1 (chrome/tokens/blog) and SLICE2 (templates/hubs/calculators).
Standing conversions from SLICE1 §0 apply to every row.
Surveyed 2026-09-11, every file opened.

---

## A. THE ONE-OFF SURFACE MAP

| File | Lines | Phase | Disposition |
|---|---|---|---|
| `app/page.tsx` | 677 | 5 | PORT (rebuild) |
| `app/for-associates/page.tsx` | 134 | 5 | PORT (data only) |
| `app/for-locum-dentists/page.tsx` | 134 | 5 | PORT (data only) |
| `app/for-practice-buyers/page.tsx` | 134 | 5 | PORT (data only) |
| `app/for-principals/page.tsx` | 138 | 5 | PORT (data only) |
| `components/audience/AudienceStageLayout.tsx` | 251 | 5 | PORT (the real edit point for all four) |
| `app/locations/[slug]/page.tsx` | 214 | 5 | PORT |
| `app/locations/page.tsx` | 72 | 5 | PORT |
| `app/services/page.tsx` | 400 | 3b | PORT |
| `app/about/page.tsx` | 81 | 6 | PORT |
| `app/contact/page.tsx` | 71 | 6 | PORT |
| `app/thank-you/page.tsx` | 180 | 6 | PORT |
| `app/complete/page.tsx` | 128 | 6 | PORT |
| `app/book/page.tsx` | 58 | 6 | PORT or RETIRE (§D) |
| `app/research/page.tsx` | 118 | 6 | PORT |
| `app/research/*/page.tsx` x4 | 62-232 each | 6 | PORT |
| `app/research/*/data/route.ts` x4 | — | — | LEAVE (JSON APIs, no design surface) |
| `app/free-practice-health-check/page.tsx` | 261 | 6 | PORT |
| `components/health-check/Wizard.tsx` | 879 | 6 | PORT (restyle only, never retime) |
| `app/privacy-policy/page.tsx` | 249 | 6 | PORT + compliance check |
| `app/terms/page.tsx` | 141 | 6 | PORT |
| `app/cookie-policy/page.tsx` | 171 | 6 | PORT + compliance check |
| `app/not-found.tsx`, `error.tsx`, `global-error.tsx` | — | 6 | PORT |
| `app/feed.xml/route.ts`, `llms-full.txt/route.ts`, `sitemap.ts`, `robots.ts` | — | — | LEAVE |
| `app/api/og/route.tsx`, `blog/[category]/[slug]/opengraph-image.tsx` | — | 6 | PORT (the `#2563eb` defect, SLICE1 §E.1) |
| `app/admin/analytics/**` x5 | — | — | **LEAVE** |

---

## B. `app/page.tsx` (677 lines) — the homepage

Rendered order today, with line anchors:

| # | Section | Line | Note |
|---|---|---|---|
| 1 | JSON-LD (Service, AccountingService, FAQPage, BreadcrumbList; Organization+WebSite ship from layout) | :244-252 | already conforming, KEEP |
| 2 | `.hero-brand` navy hero: `BrandLogoHero` + `display-serif` h1 + 2 CTAs | :253-290 | `hero_primary` (:272) / `hero_secondary` (:281), both carry `data-cta-placement="hero"` |
| 3 | Proof strip | :291-298 | — |
| 4 | Band on `--background` | :299-318 | — |
| 5 | `TestimonialSlider` band | :319-330 | 114-line local component |
| 6 | Band | :331-373 | — |
| 7 | Band | :374-394 | — |
| 8 | Band | :395-411 | — |
| 9 | Band | :412-430 | — |
| 10 | `#how-we-work` (`scroll-mt-24`) | :431-464 | the hero secondary CTA's target |
| 11 | Band | :465-510 | ends with a comparison `<table>` |
| 12 | Closing panel A, **packages variant only** | :510-551 | `home_cta_primary` / `home_cta_secondary` + `LeadForm` |
| 13 | Closing panel B, **leadgen variant** (the live one) | :553-589 | `LeadForm submitLabel="Send enquiry"` |
| 14 | Navy band | :590-641 | `!packagesMode` branch at :600 |
| 15 | FAQ "Frequently asked." | :642-676 | hand-rolled |

| Disposition | **PORT (rebuild to the 15-16 section standard)** | Phase 5 |
|---|---|---|

Reference: `Property/web/src/app/page.tsx` (537 lines), ordered
Hero `:239-278` → trust strip `:279-291` → `WhoWeAreSection` `:289` → `WhyChooseUsSection` `:292`
→ focus band `:295-324` → `WhatWeCoverSection` `:325` → `#calculators` `:328-359` →
`TestimonialsSection` `:361` → blog teaser `:364-419` → `#book` closing panel `:420-516` →
FAQ `:517-536`.

Required changes:
1. `StickyCTA` mounts HERE as the first child, and nowhere else (SLICE1 §A.3).
2. Hero: `BrandLogoHero` retires; the `.hero-brand` CSS becomes the `DentistsBackdrop` component.
   `display-serif` retires with Cormorant.
3. **`home_cta_primary` and `home_cta_secondary` have never fired.** They render only inside the
   `packagesMode` branch (`:510`), and the live variant is `leadgen`
   (`niche.config.json cta.variant`). Any conversion read that cites them is reading zeros.
   Keep the ids under the branch; do not promote them into the live panel.
4. Net-new `#calculators` band with a crawl-safe `CalculatorTabs` block + a literal
   `<a href="/calculators/uda-value">` and a "See all 13 calculators" link. There is no calculator
   surface on the homepage today, and this is the site's highest-authority page.
5. Net-new "Latest insights" band: 3 posts + view-all. Four crawl links from the homepage into a
   223-post corpus that it currently does not link to at all.
6. FAQ → kit `FaqSection`, fed by the SAME array that feeds `buildFaqPage` (playbook T17).
7. The comparison table at `:465-510` → kit `ComparisonTable`, **mirrored locally** (the kit one
   hardcodes Property's copy and forces a "Most recommended" pill).
8. `TestimonialSlider` (114 lines, local): GATE 9 — are the quotes real and anonymisable? If they
   were invented, the band is OMITTED, never fabricated. Do not assume either way; check the
   source of the copy before restyling it.
9. Navy adjacency: the closing panel is navy and the ported footer is navy. Put the FAQ band last
   so navy never touches navy.

---

## C. THE FOUR `for-*` PILLARS

All four are **data-only files**. Each declares metadata, a stats array, stage/FAQ data, and
returns `<AudienceStageLayout data={data} />` (e.g. `for-associates/page.tsx:2,133`).

**`components/audience/AudienceStageLayout.tsx` (251 lines) is the single edit point for all
four pages.** Do not touch the four page files except for copy fixes.

Layout order: JSON-LD (FAQPage + BreadcrumbList) → navy hero with light Breadcrumb (`:57-77`) →
`--navy-soft` stats band (`:78-95`) → white stage sections (`:96-127`) → `--background` band
(`:128-160`) → white band with `LeadForm redirectOnSuccess={false} submitLabel="Book a free call"`
(`:161-181`) → FAQ `<dl>` (`:183-209`) → navy closing band (`:210+`).

| Disposition | **PORT** | Phase 5 |
|---|---|---|

- Anatomy is already close to the standard (navy hero, stats, sections, mid-page form, FAQ,
  closing band). This is the cheapest pillar port in the estate so far. Restyle, do not rebuild.
- `font-serif` x7 in this file.
- FAQ `<dl>` → kit `FaqSection`; the array already feeds `buildFaqPage` at `:45`. Make the single
  binding structural.
- **Copy check, not design:** `for-associates/page.tsx:20` renders a stat tile `{ value: "£0",
  label: "Hidden fees" }`. That is a claim about our own pricing. `for-locum-dentists:18` renders
  `{ value: "£80k+", label: "Typical Ltd-co break-even" }`, which is a threshold claim that must
  be re-derivable from `docs/dentists/house_positions.md` with a section reference. Both go to the
  factual QA track.

---

## D. LOCATIONS (2 pages + index)

`app/locations/[slug]/page.tsx` (214). City copy lives **inline in the page file** as a
`cityContent` object, not in a JSON data file. **The generalist unicode-escape trap (playbook T6)
does NOT apply to Dentists**: `£` is the literal character in every source file checked, and
`src/data/*.json` holds research datasets, not location copy. Sweep by rule anyway, but a literal
grep is valid here.

Renders: `AccountingService` JSON-LD **with `telephone` deliberately omitted** (comment at
`:106-108` — this is a considered compliance decision, KEEP IT) → Breadcrumb → `font-serif` h1 →
intro → 5 `font-serif` h2 sections → related articles → `CTASection`.

| Disposition | **PORT** | Phase 5 |
- Wrapped in `contentNarrow` (max-w-3xl) for its whole length: a location page is a marketing
  surface and needs the standard section rhythm, not a prose column.
- `CTASection` (54-line local component) retires into kit `LeadCTAPanel` across all its call
  sites (`locations/[slug]`, `locations/page.tsx:65`, `about/page.tsx:74`).
- Reference: `Property/web/src/app/locations/[slug]/page.tsx` is **1006 lines**. Do not port its
  scale; port its anatomy. Dentists has 2 locations, Property has many.

`app/locations/page.tsx` (72): Breadcrumb + `font-serif` h1 + 2 `card-premium` cards + CTASection.
**PORT**, phase 5.

---

## E. SERVICES INDEX — `app/services/page.tsx` (400 lines)

Navy hero (`:189`) → 4 banded sections (`:224`, `:241`, `:297`, `:329`) → navy closing band with
`LeadForm redirectOnSuccess={false} submitLabel="Book a free call"` (`:354-393`).

| Disposition | **PORT** | Phase 3b |
- **Two banned turnaround promises rendered here:** `:119` `title: "Response within 24 hours"`
  and `:384` `"Response within 24 hours of your enquiry"`, plus `:390` "We will be in touch within
  24 hours."
- It does not link to its own 5 sub-pages in any obvious block. Verify and, if true, add the
  children list; the kit footer's Services column derives from nav children, so the nav needs
  `/services` children for that column to render at all (SLICE1 §A.2 item 1).
- 6 `font-serif` headings.

---

## F. CAPTURE AND POST-SUBMIT SURFACES

| File | Renders | Disposition | Phase | Risk |
|---|---|---|---|---|
| `app/contact/page.tsx` (71) | `font-serif` h1, standfirst, optional packages paragraph, `LeadForm` | PORT | 6 | **`:38` and `:59` both promise "within one working day".** Banned. The `£29/mo` + `/pricing` paragraph at `:41-55` is behind `isPackagesMode` and does NOT render today; it is latent, not a live pricing breach. `/pricing` itself 308s to `/services` (`next.config.ts:24`), so `contact_pricing_link` is not a dead link. |
| `app/thank-you/page.tsx` (180) | 3 branches (booking / confirmed / thank you) + `BookingPicker`; `noindex, follow` | PORT | 6 | `data-cta="thankyou-return-article"` at `:171`. Branch logic and `isSafeReturnPath` KEEP EXACTLY. |
| `app/complete/page.tsx` (128) | token-verified missing-contact top-up + `DetailsForm`; `noindex, nofollow` | PORT | 6 | token verification is live nurture plumbing; restyle only |
| `app/book/page.tsx` (58) | `BookingPicker`; `noindex, nofollow` | see §H | 6 | zero inbound links |
| `components/forms/LeadForm.tsx` (448) | the site's primary capture | PORT (restyle) | 6 | **`:191` success state says "We will come back within one working day."** Banned, and it is on EVERY form on the site. **`leadConsentText` and any consent wording is NEVER changed as a side effect** (playbook T19; the 2026-08-24 incident cut mini-form leads from ~10/wk to 3.9/wk). |
| `components/blog/InlineMiniLeadForm.tsx` (25) | mid-scroll fallback capture on unmapped categories | PORT (restyle) | 2 | **`:20` blurb promises "will reply within 24 hours"** |
| `components/support/SpecialistWidget.tsx` (536) | fixed bottom-right widget, site-wide | PORT (restyle) | 6 | **`:375` "A specialist replies within one working day"**. **Never change its trigger, timing or audience.** |
| `components/intent/ReturningBar.tsx` (78), `DeepScrollModal.tsx` (137) | interruptive surfaces | PORT (restyle) | 6 | same rule. `DeepScrollModal` has a live experiment history (memory `property_behaviour_analytics`); do not remove it on an aggregate read. |
| `components/health-check/Wizard.tsx` (879) + `free-practice-health-check/page.tsx` (261) | the site's biggest lead magnet, linked from the header nav | PORT (restyle) | 6 | 879 lines of wizard state; restyle the shell and the steps, change no step, no field, no branch |

**Turnaround-promise total: 12 source instances, rendering on roughly every page of the site
(LeadForm success + SpecialistWidget are global).** This is the single largest content-rule breach
found, it is a live defect rather than design work, and it belongs in `docs/dentists/STATE.md`.

---

## G. LEGAL AND COMPLIANCE (phase 6)

| File | Lines | Disposition | Check |
|---|---|---|---|
| `app/privacy-policy/page.tsx` | 249 | PORT | every sentence checked against code that actually runs. `niche.config.json` sets `partner.name: "regulated firms in our specialist partner network"` with `privacy_policy_url: null` and `enquiry_retention_months: 24`; the page must match the real recipient caps (pool model = max 6 recipients) and the real retention. |
| `app/cookie-policy/page.tsx` | 171 | PORT | **Dentists genuinely runs GA4** (`G-273RJY0LZQ`, `layout.tsx:105`), so unlike generalist the GA cookie disclosure here is probably CORRECT. Verify, do not mirror generalist's fix. The page promises a "Do not track me" footer control; `ConsentToggle` fulfils it (`SiteFooter.tsx:65-71`) and **must survive the footer port** (SLICE1 §A.2 item 7). |
| `app/terms/page.tsx` | 141 | PORT | — |
| `app/not-found.tsx`, `error.tsx`, `global-error.tsx` | — | PORT | `global-error` renders outside the shell; it needs its own inline styling or it will render unstyled |

Locked: **no new disclosures on a site that lacks them**, GA4 stays opt-out (memory
`clarity_removed_pecr_decision`). The port adds no cookie banner, no consent modal, nothing.

---

## H. RETIREMENT CANDIDATES — RECOMMENDATIONS ONLY, EVERY DELETION IS AN OWNER GATE

Playbook T14: check GSC before choosing 404 vs redirect (`permanent: true` emits 308, which is
fine), count the link delta on a real page, and remember that **a link to a destination already
in the chrome adds zero unique links**.

Inbound-link counts below are literal `href="/…"` occurrences in `src/` and `content/`, multiplied
by the number of pages the containing template renders. Derivation in the receipt.

| Candidate | Inbound internal links | In chrome? | GSC | Recommendation |
|---|---|---|---|---|
| `components/blog/ExitIntentModal.tsx` (176 lines) | 0 imports; only a comment in `PageShell.tsx:4-5` | no | n/a (component) | **DELETE.** Already unmounted; `SpecialistWidget` subsumes it. No route, so no GSC question. The only true no-gate deletion on the list. |
| One of the two `CalcResultCta.tsx` (`components/calculators/` 28 lines, `components/tools/` 27) | establish which is imported | no | n/a | **DELETE the unimported one.** If both are imported, they are a T7 divergence waiting to happen; converge them. |
| `/book` | **0** | no | **needs a GSC read** | `robots: noindex, nofollow`, reachable only by a direct link nobody emits. Recommend **KEEP the route, do not link it**: it is the booking destination for nurture emails and the Telegram lead-ops flow, which are outside this repo's link graph. Deleting it would break those. Confirm before acting. |
| `/complete` | 0 | no | noindex | **KEEP.** Token-gated post-submit top-up; reached by email link. Zero links is correct by design. |
| `/thank-you` | 0 literal | no | `noindex, follow` | **KEEP.** Form redirect target. |
| `/embed` and `/embed/[slug]` (14 routes) | 0 | no | `robots: index: false` | **KEEP.** Partner distribution surface; the port fixes the chrome leak rather than retiring it. |
| `/about` | 1 link, in `BlogPostRenderer.tsx:317` → renders on **223 pages** | **no** | **needs a GSC read** | **KEEP and PROMOTE.** It is the E-E-A-T page, it has 223 inbound links, and it is in neither the header nav nor `footer_links`. The ported footer's Company column puts it in the chrome, which is the right fix. Note the T14 consequence: once `/about` is in the chrome, the byline link adds **zero** unique links to an article. |
| `/research` + 4 research pages | 11 links across 4 `content/` files | **no** | **needs a GSC read** | **KEEP and PROMOTE.** Four original data assets with their own JSON APIs, invisible from the chrome. Belongs in the footer Company column or a Resources column. |
| `/resources/[topic]` x6 | **3 links total** (`/resources/associate` x2, `/resources/principal` x1); **4 of the 6 have zero** | no | **needs a GSC read** | **KEEP, and build the missing `/resources` index.** `ls src/app/resources` = `[topic]` only: there is no hub. This is the largest orphan cluster on the site. Do not delete content that has no hub; give it one. |
| `/for-locum-dentists` | 4 `content/` links | no | **needs a GSC read** | KEEP. All four `for-*` pillars are absent from the nav; that is an IA question for the owner, not a port decision. |
| `/locations` + 2 city pages | `/locations` is in `niche.config footer_links` → chrome, every page; city pages 0 literal | yes (index) | **needs a GSC read** | KEEP. Two cities is thin, but expansion is a content decision. |
| The 5 static blog hub files | each is the canonical `/blog/<slug>` route | reachable from the blog index grid | **needs a GSC read** | **KEEP the routes.** SLICE1 §F.5 recommends converging their TEMPLATE while preserving their hand-written prose, which changes no URL. Deleting the files without moving the prose loses real content. GATE 5. |
| `components/ui/CTASection.tsx` (54) | 3 call sites | no | n/a | **DELETE after** the three call sites move to kit `LeadCTAPanel`. |
| `components/ui/Breadcrumb.tsx` (84) | many call sites | no | n/a | **DELETE after** migration to kit `primitives/Breadcrumb`; watch for double `BreadcrumbList` emission (SLICE1 §F.7). |
| `components/brand/BrandWordmarkHomeLink.tsx` (41), `BrandLogoHero.tsx` (26) | chrome + homepage hero | yes | n/a | **DELETE in phase 1/5** once the kit lockup lands; export `WORDMARK_TOP`/`WORDMARK_BOTTOM` from the file first. |
| `header_nav_secondary`, `header_mobile_secondary` `data-cta` ids | markup exists, renders nothing under the live `leadgen` variant | — | never fired | **RETIRE the ids**, record them as orphaned analytics ids in STATE.md. Nothing is lost because nothing was ever recorded. |
| `home_cta_primary`, `home_cta_secondary`, `contact_pricing_link` | render only inside `packagesMode` branches | — | never fired under the live variant | **KEEP under the branch.** They are not dead code, they are an unused variant. |

**Nothing on this list is deleted without the owner's word except the two component-level items
explicitly marked DELETE, and even those get reported.**

---

## I. `data-cta` INVENTORY (phase 0 obligation, field notes §1)

20 unique ids in `src/`. Classified by whether they can fire under the LIVE `leadgen` variant:

| Id | Can fire today | Where |
|---|---|---|
| `header-nav-cta`, `header-mobile-cta` | yes | `SiteHeader.tsx:101,169` |
| `header_nav_secondary`, `header_mobile_secondary` | **NO** (no `header_secondary` in the leadgen variant) | `SiteHeader.tsx:92,180` |
| `hero_primary`, `hero_secondary` | yes | `page.tsx:272,281` |
| `home_cta_primary`, `home_cta_secondary` | **NO** (packages branch only) | `page.tsx:526,535` |
| `contact_pricing_link` | **NO** (packages branch only) | `contact/page.tsx:47` |
| `cta-section-primary` | yes | `ui/CTASection.tsx` |
| `calculator-page-cta` | yes, but emits **no placement and no variant** | `calculators/[slug]/page.tsx:161` |
| `sticky_cta` | yes | `ui/StickyCTA.tsx:155` |
| `specialist_widget` | yes | `support/SpecialistWidget.tsx` |
| `returning_bar`, `returning_bar_close` | yes | `intent/ReturningBar.tsx` |
| `deep_scroll_modal`, `deep_scroll_close` | yes | `intent/DeepScrollModal.tsx` |
| `next_step` | yes | `intent/NextStepOffer.tsx` |
| `see_result` | yes | premium tools |
| `thankyou-return-article` | yes | `thank-you/page.tsx:171` |

**This is a source-derived classification, not a funnel read.** Pull recorded `cta_click` events
per id, post bot-gate (the gate landed 2026-08-23; anything spanning it is inflated), and mark
each id live / dormant / never-fired before phase 1 touches a component. The port is the cheapest
moment to instrument the ones that were never wired, and the most dangerous moment to rename one
that was.

---

## J. SLICE 3 OWNER GATES

9. **Testimonials.** Are `TestimonialSlider`'s quotes real and anonymisable? If not, the band is
   omitted, never fabricated.
10. **Turnaround promises.** 12 instances, effectively site-wide. Removing them changes capture
    copy on every form. Recommend removing (house rule), with the replacement wording shown to the
    owner before it ships.
11. **Nav IA: do the 4 `for-*` pillars and `/research` enter the chrome?** They are strong pages
    with almost no internal links. Recommend yes, in the footer, not the header.
12. **A `/resources` index.** 6 topic guides currently have no hub and 4 have no inbound link.
13. **Homepage capture surfaces:** `#calculators` band, latest-insights band. In-flow, not
    interruptive, but they are new surfaces.
14. **Retirements** (§H), every one of them.
