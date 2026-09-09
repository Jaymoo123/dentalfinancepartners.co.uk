# PORT BLUEPRINT — SLICE 1: CHROME, HOMEPAGE, BLOG SUBSYSTEM

Generalist (`generalist/web`) to the Property standard. Binding spec: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §A-F (lines 693-1060), `docs/property/DESIGN_SYSTEM.md` §0. Investigated 2026-09-09 with every source file opened on both sides.

**Standing conversions applied in every row below** (stated once, not repeated):
- Brand ramp: emerald-600/700/800 in every quoted Property class becomes `primary-*` = orange ramp. Quoted classes keep Property's structure; swap only the colour token.
- Warning/duty semantics: any amber/orange used for "a duty bites" moves to the non-brand warning ramp per DESIGN_DELTA (orange is now the brand, so it can no longer carry alarm).
- Radius: `rounded-xl` (4px) is the only card/button radius. Generalist's current zero-radius idiom (`layout-utils.ts` btnPrimary has no radius class) and its `rounded-lg`/`rounded-2xl` instances are defects under A.2.
- Ground vocabulary: `bg-[#fafaf7]` / `neutral-*` grounds move to `bg-white` / `bg-slate-50` / dark per the ground contract. Cream survives only as the TopicHero/hub-hero surface.
- `sectionY` (`py-16 sm:py-20 lg:py-28`) becomes canonical `py-12 sm:py-16 lg:py-20`; blog/hub sections `py-16 sm:py-20`.
- Fonts stay Geist Sans / Geist Mono; type SCALE moves to A.3 verbatim; `font-semibold tracking-tight` headings become `font-bold` with letter-spacing from the base layer.
- Copy: no em-dashes; audience is "directors, owners and UK businesses", never "founders"; never the word "generalist"; never "Sidekick".

---

## A. SITE CHROME

### SiteHeader.tsx (261 lines, client, md: breakpoint nav, hover dropdown, cream bar)

| # | New (standard classes) | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Bar `sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm` + `paddingTop: max(0px, env(safe-area-inset-top))` | :57-62 cream `bg-[#fafaf7]/95 backdrop-blur` | ADOPT-STANDARD | B exact; translucent cream over a white body reads as a seam | none |
| 2 | Inner `siteContainerXl flex min-h-[3.25rem] sm:min-h-16 items-center justify-between gap-3 sm:gap-4 py-3` | :63-65 `siteContainerLg` + `min-h-14` | ADOPT-STANDARD | header bar is the one max-w-7xl surface (A.4) | none |
| 3 | Nav list `hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1`; item `px-3 py-2 text-sm font-bold border-b-2 xl:px-4`; active `border-primary-600 text-primary-700`; idle `border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300` | :68-126 `gap-8 md:flex`, `text-sm font-medium`, no underline rail | ADOPT-STANDARD | breakpoint band collision: nav appears at `md:` while burger hides at `md:`; spec puts BOTH at `lg:` (the 08-23 incident class) | none |
| 4 | Grouped dropdown = click-toggled `<button>`, panel `w-[38rem] max-h-[70vh] columns-2 rounded-xl border bg-white p-4 shadow-lg` + "View all" footer link; self-referential first child; Esc / outside mousedown / route-change close | :79-110 hover-only `group-hover:visible` `<Link>` trigger, `w-80` single column | ADOPT-STANDARD | tablets at lg: have no hover; a hover-only trigger is unreachable on touch | group label stays "Resources"; first child "All resources" -> /fundamentals |
| 5 | Primary CTA `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`, `data-cta="header_book"` | :139-147 `sm:inline-flex`, `text-xs`, `data-cta="header_nav_primary"` | ADOPT-STANDARD (id = GATE) | `sm:` is the exact incident breakpoint; text-xs below spec box. Any id rename pairs with a deploy-watch baseline restatement | label "Book a free call" kept |
| 6 | Secondary "Contact" at `xl:` only; nav's own Contact item `xl:hidden` | :129-138 `md:inline-flex`, always on, Contact appears TWICE from md: | ADOPT-STANDARD | live duplicate-link defect | none |
| 7 | Burger `h-12 w-12 touch-manipulation rounded-xl border-2 border-slate-200 bg-white lg:hidden` | :149-158 `h-11 w-11`, `border`, `md:hidden` | ADOPT-STANDARD | 44px under the 48px primary floor (A.8) | none |
| 8 | Drawer: scrim `bg-slate-900/50 backdrop-blur-[2px]`; panel `absolute right-0 top-0 h-[100dvh] w-[min(20rem,92vw)] border-l-4 border-primary-600 bg-white shadow-2xl`; active child `border-l-4` + `bg-primary-50 text-primary-900`; groups `ml-4 border-l border-slate-200`, labels `text-[11px] font-bold uppercase tracking-wider text-slate-500`; footer `border-t border-slate-200 p-3` with `${btnPrimary} w-full` `data-cta="header_book_mobile"` | :162-258 `w-[min(22rem,92vw)]`, no brand border, `border-b` per item, mono "Menu" eyebrow | ADOPT-STANDARD | drawer is the only nav below lg:; mono eyebrow is retired idiom | none |
| 9 | Active-state: top-level PREFIX match, children EXACT match | :74-75,201 prefix on both | ADOPT-STANDARD | guarded by kit `nav-active-state` | none |
| 10 | Nav from `niche.config.json navigation[]`; Calculators group built server-side via `buildPrimaryNav()` from the tool registry, passed as prop | :8,72 reads `siteConfig.nav` client-side; Calculators is a flat link | ADOPT-STANDARD | never hand-list calculators; footer derivation needs the same prop | none |
| — | Mono orange drawer eyebrow (:185-187) | | RETIRE | mono reserved for figures (A.3) | |

Wiring: `header_book` (/contact, header, form) · `header_book_mobile` (/contact, header_mobile, form) · `header_contact` (/contact, header, contact, xl: only); all carry `data-cta-variant`.
GATE: renaming `header_nav_primary/mobile_primary/nav_secondary` to canonical ids breaks 3 live `vw_cta_performance` rows — owner picks (recommend keeping generalist ids + recorded mapping, see Slice 3 §10.1).

### SiteFooter.tsx (79 lines, cream, 13-item thirds-split, newsletter col 1)

| # | New | Replaces | Verdict | Why |
|---|---|---|---|---|
| 1 | `relative overflow-hidden bg-slate-900 text-white` + motif; `siteContainerLg relative z-10 py-12 sm:py-16`; `grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16` | :18-20 cream `border-t`, `md:grid-cols-[1.4fr_1fr_1fr_1fr]` | ADOPT-STANDARD | C exact; a dark footer is what makes navy-never-touches-navy meaningful |
| 2 | Left: footer wordmark (primary-400 icon + rule, white) + description `max-w-md text-sm text-slate-300` | :22-31 mono legalName eyebrow + name + description | ADOPT-STANDARD | C |
| 3 | Right: `<nav aria-label="Footer"> grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4` — DERIVED columns: Services = children of /services (GATE: none exist in nav today), Resources = children of /fundamentals, Calculators = first tool of first 5 registry categories + All calculators, Company = About/Contact/Locations/Book. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` | :10-15,44-59 thirds-split of flat footer_links, no headings | ADOPT-STANDARD | flat splits go stale silently; derivation renders only routes that exist; raises the footer's link floor |
| 4 | Legal row `mt-10 pt-6 border-t border-white/10 space-y-4`: footer_links reduced to Privacy/Terms/Cookies, designer credit, legalDisclosure, © + ConsentToggle | :62-75 | ADOPT-STANDARD + KEEP payload | duplicate disclaimer sentence folds into legalDisclosure |
| 5 | Newsletter SignupForm STAYS in footer (sanctioned home), restyled to navy ground via an additive `newsletterSlot` prop on the kit footer (default null; never restyle a shared component) | :32-40 inline variant on light | KEEP-PAYLOAD-RESTYLE | owner demotion decision: footer + /newsletter are its homes |
| — | footer_links items 1-10 | :11 | RETIRE from config | they move into derived columns; both = every link twice |

### PageShell + layout.tsx
- Kit PageShell: `/embed/` bare-children bypass (generalist currently ships FULL CHROME inside partner iframes — live defect); root/skip-link conforming already (colour swap only); `nav` prop threaded.
- StickyCTA removed from PageShell (site-wide) and mounted on `app/page.tsx` only, matching Property (Property measured 586 shows / 1 click on blog and removed it there).
- layout.tsx: every provider + interruptive mount kept as-is (port all, add none); ADD the A.7 `<noscript>` `data-draw="off"` release block (load-bearing for 7 components); keep Geist wiring, add `@theme --font-sans: var(--font-geist-sans)`.
- DELETE dead `blog/ExitIntentModal.tsx` (162 shows / 0 leads precedent; do not rebuild).

### Wordmark (BrandWordmarkHomeLink.tsx, raster PNG today)
GATE: raster logo vs the B two-line typographic lockup (`text-[0.65rem] sm:text-xs tracking-[0.18em]` name / 2px primary rule / `text-[0.6rem] sm:text-[0.65rem] tracking-[0.32em]` descriptor; cap `max-w-[13rem] sm:max-w-none`; footer variant one step larger). Regardless of the gate: aria-label must equal the visible strings (currently carries an off-screen tagline, WCAG 2.5.3), and the width cap + `min-w-0` land.

---

## B. HOMEPAGE (page.tsx, 788 lines; 3.3% vs Property 8.8%)

Final rendered order (F.2), 16 sections:

1. `<StickyCTA/>` mounted here, first child (only page that mounts it).
2. JSON-LD set — already conforming (Organization+WebSite site-wide; WebPage, AccountingService, Service, BreadcrumbList, FAQPage at :309-318). KEEP.
3. NAVY MOTIF HERO `relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-slate-900` + backdrop; `max-w-3xl`; live-pulse badge (GATE 4: which live duty it names); h1 `text-3xl leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl` KEEPING current copy; standfirst `mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/90`; 5 trust badges ("Fixed fees agreed up front" / "One named accountant" / "24-hour response window" / "Cloud-first (Xero, QuickBooks, FreeAgent)" / "UK-wide, remote-first"). Replaces the cream `pt-20 pb-24 lg:pt-32 lg:pb-40` hero (:320-360).
4. Hero primary CTA -> `href="#book"` `data-cta="hero_book"` `${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`. Currently `/contact` (:339-346) — the single largest structural fix; there is no on-page form to scroll to at all today. Requires `niche.config.json cta.variants.leadgen.hero_primary.href` change.
5. Hero secondary -> `#calculators`, `${btnOnDark}` (currently /services).
6. STATS STRIP `border-b border-slate-200 bg-white py-5 sm:py-7` + kit StatsCounter, MERGING the two current duplicate proof bands (:362-393, hand-rolled band + shared StatsBar). MANDATORY copy fix: ":368 100+ UK businesses served" violates the no-served-claims rule (GATE 5: evidenced enquiry count or drop the tile).
7. ProblemStatement + PromptMarquee on slate-50, replacing the pull-quote block (:652-686, an attribution hazard under §0.9). Prompt set below.
8. WhoWeAre = manifesto copy (:687-703) re-set as Eyebrow + h2 + Prose + DrawnTickList (currently prose-only inside a max-w-3xl clamp — two contract violations).
9. WhyChooseUs = the fixed-fee explanation (:612-651) re-set; heading "Why UK business owners choose a fixed-fee accountant".
10. SERVICES GRID `bg-primary-50/60`, 4 glow cards `rounded-xl border border-primary-100 bg-white p-6` + icon badges. GATE 6: current `ServiceTiers featuredBadge="Most Popular"` (:395-407) is a pricing affordance under the live leadgen variant — pricing route or services grid, owner picks. If services: Year-end accounts and CT · VAT and MTD · Payroll, PAYE and pensions · Director pay and self assessment.
11. WhatWeCover = "what we handle" payload (:474-527) with every outbound link counted before/after (link floor); the sole-trader-vs-ltd decision table (:528-572) folds in as its ComparisonTable figure (stacked <md, `min-w-[36rem]` in overflow-x-auto, our column primary-edged, neutral minus for the other side) + ExampleFigureNote. "Who we help" segment cards (:408-473) merge here + into the marquee tags.
12. `#calculators` white + CalculatorTabs (explicit HOME_TABS list, Slice 2 §B) + literal `<a href="/calculators/salary-dividend-optimiser">` then "See all N calculators" `data-cta="home_calculators_all"`. Net-new (no calculator surface on the homepage today); satisfies the crawl-path guard.
13. TestimonialsSection navy. GATE 7: real anonymisable quotes exist or the band is OMITTED, never fabricated.
14. LATEST INSIGHTS slate-50 `divide-y` row list, 3 posts + View-all. Net-new; 4 crawl links from the site's highest-authority page into the corpus.
15. `#book` NAVY CLOSING `scroll-mt-24` + motif, `grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`: Eyebrow onDark + h2 + 3 proof rows with `h-12 w-12 rounded-xl` check badges left ("24-hour response, usually same day" / "Fixed fees, agreed before any work" / "One named accountant, not a team inbox"); white `rounded-xl p-6 sm:p-8 lg:p-10` card with `<LeadForm submitLabel="Request callback"/>` right. Replaces the light two-button band (:719-758) that has NO form. LeadForm ground re-verified rendered (invisible-label class).
16. FAQ kit FaqSection white, last (keeps the navy #book band off the navy footer). Array already feeds buildFaqPage at :316 — same-array rule becomes structural.

RETIRED: second navy "who we work with" typographic band (:573-611, duplicate job + navy adjacency), homepage newsletter section (:704-718, demotion), pull-quotes, old link-out final CTA. `home_cta_primary/secondary` ids retained only under the packages-variant branch (live analytics rows).

PromptMarquee set (10, unattributed, even length, FT-plain):
1. Structure — "I have been a sole trader for three years and I still do not know if I should be a limited company."
2. Director pay — "I take a bit of salary and a bit of dividend because someone told me to, and I have never checked the split."
3. VAT — "Turnover is creeping towards the VAT threshold and I do not know what happens the month I cross it."
4. Making Tax Digital — "I keep getting emails about Making Tax Digital and I cannot tell which of them apply to me."
5. Payroll — "I am about to take on my first employee and I have no idea what I am signing up for."
6. Corporation tax — "The company made more than I expected this year and now I am worried about the bill."
7. Bookkeeping — "My records are a bank feed and a shoebox, and year end is in eight weeks."
8. R&D — "We build our own software and people keep telling me there is a tax credit, but nobody will tell me if we qualify."
9. Accountant fit — "My accountant files the accounts and never once has told me anything I did not already know."
10. Exit — "I might sell in two years and I do not know what I should be doing now to make that go well."

---

## C. BLOG SUBSYSTEM

### C.1 BlogPostRenderer.tsx (368 lines; 13 Property blog-form leads vs 1 since 08-23)

New reading order (F.3), keeping generalist's 3-moment split + ToolIsland (ahead of Property):
1. ReadingProgress (kit path swap).
2. Article grid — already conforming (`max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12`).
3. Breadcrumb on white, category href keyed on SLUG (raw-frontmatter keying is Property's 57-post bug).
4. HEADER CARD `rounded-xl bg-slate-50 p-8 mt-6`: Eyebrow=category, h1 `text-3xl sm:text-4xl md:text-5xl`, meta pills (`inline-flex min-h-7 rounded-full bg-white px-3 py-1 text-xs font-semibold ring-1 ring-slate-200`; Updated pill in primary tint), summary `mt-5 text-base leading-7 text-slate-600`. REPLACES the 420-520px photo hero + `bg-slate-900/70` scrim (:85-169) — viewport tax + LCP cost; `post.image` becomes an in-body `rounded-xl` figure; photo-credit block retires with the hero.
5. Skip link `data-cta="blog_skip_to_form"` -> `#enquiry-form` (net-new canonical surface; current nearest link leaves for /contact).
6. Mobile TOC (kit).
7. keyTakeaways/TL;DR box KEPT VERBATIM (`#answer-box` GEO surface), restyled from `rounded-lg border-l-4 border-orange-600` to the standard card + eyebrow rule.
8. AuthorByline demoted from top-of-article block (:175-190) to header-card pill + end aside. E-E-A-T preserved twice; the answer takes the top position.
9. Body `.prose-blog` (17px/1.75/65ch, h2 with 4px primary left border) with tiered injection unchanged in logic (splitContentEarly premium -> gate; else InlineMiniLeadForm mid-scroll) + ADOPT aside-cta rewriting: every `<aside>` gains `<a class="aside-cta" href="#enquiry-form">Talk to a specialist -></a>`.
10. `#enquiry-form` `<section id="enquiry-form" class="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" aria-labelledby="enquiry-form-heading">` + motif; white card `mt-8 rounded-xl bg-white p-6 sm:p-8` with `LeadForm redirectOnSuccess={false}`. Current block (:323-334) has NO id, NO scroll-mt, NO aria, one generic CTA for 11 categories — the mechanism behind 13-vs-1.
11. Per-category CTA map `CTA_BY_CATEGORY` keyed on SLUG with fallback to `getActiveCta(niche).blog.*` + packages bypass; NOTE `slugifyCategory("R&D Tax Credits")` = `randd-tax-credits`; guard test asserts every category has a key. Full copy map in §F below.
12. FAQ kit FaqSection + buildFaqPage on the same array, replacing the hand-rolled `<dl>` (:289-303).
13. Author aside `rounded-xl` with reviewer branch (Reviewed by / credentials / Last reviewed when both fields present); fixes the broken class stack at :306.
14. Kit RelatedArticles replacing the bespoke border-l-4 row list (:336-355).
15. SIDEBAR: ONE `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` wrapper holding BlogSidebarCta (net-new navy card -> `#enquiry-form`, same ctaCopy object as the form so they cannot drift) then TableOfContents. Current sidebar is TOC only, unclamped.

RETIRED from articles: newsletter InlinePrompt (:283-287; sat at the highest-intent scroll depth; Property removed its equivalent on 16,290 views / 0 submits). GATE 8: CalcPromoCard (:228, live `calc_promo_inline` experiment — read out or kill; the ToolIsland does the same job with a real tool). GATE 9: NextStepOffer (:321, second closing offer immediately before the form; not in the estate capture inventory).

### C.2 FundamentalsRenderer.tsx (221 lines)
DELETE the file; pillar guides render through BlogPostRenderer `variant="pillar"` (breadcrumb trail, Article JSON-LD builder, eyebrow label, related-heading swaps). The two files are 90% duplicated and have ALREADY drifted (different CTA sources under the packages variant). Pillar guides gain the full capture anatomy (skip link, sidebar CTA, `#enquiry-form`, category map) they entirely lack today.

### C.3 /glossary/[slug] (122 lines, 550+ pages)
Header-card pattern on white (solid-orange category chip retired for Eyebrow + rule) · body unclamped (currently `max-w-3xl` wrapper double-clamps the 65ch prose) · closing `#book` LeadCTAPanel `redirectOnSuccess={false}` replacing the navy bare-button card (:86-96) whose only ask leaves the site · kit RelatedArticles for related terms · DefinedTerm JSON-LD kept + `inDefinedTermSet` added, Breadcrumb component emits the trail (currently missing).

### C.4 /blog index (154 lines; 0.10% conversion)
Navy motif index hero (min-h 300/350) + breadcrumb + CTAs `#book`/`#articles` · ONE merged filter band (stage + category chips at 48px `rounded-xl border` recipe; current chips 30px, and the stage taxonomy is hard-coded in THREE files — hoist to `lib/blog-stages.ts`) · library: kit BlogListWithSearch + HubArticleList (12 visible, rest `hidden`) + NumberedPagination, item type PROJECTED to `{slug,title,summary,category,categorySlug,date,readTime}` — the current `{...p}` spread at :35 ships the FULL `contentHtml` of ~700 posts to the browser (load-bearing payload defect) · net-new `#book` LeadCTAPanel (highest-traffic non-home page, zero capture today) · slate-50 category tail (navy never touches navy) · literal calculator bridge link. Newsletter card (:138-151) RETIRED. Add CollectionPage + BreadcrumbList JSON-LD (currently none).

### C.5 /blog/[category] x11 (156 lines)
Kit BlogCategoryHub, page becomes data-only:
1. Cream motif hero (fixes the duplicated eyebrow/h1 at :103-105) + CTAs `#enquiry-form`/`#articles`.
2. ESSENTIALS BRIEFING net-new (largest content deliverable in the slice: 11 hubs x 3-4 ruled sections; brief per hub = the duty / when it bites / what owners get wrong / what we would look at; FT-plain, second person; figures only if re-derivable from house_positions with a §-ref).
3. Library `#articles scroll-mt-24` slate-50, HubArticleList; fix: filter on `slugifyCategory(p.category) === category`, not raw label equality (:56) — spelling variants silently drop posts from their hub today; add a guard that every post lands in exactly one hub.
4. `#enquiry-form` LeadCTAPanel with the same per-category copy map (hub and post always agree).
5. Other-topics tail repositioned LAST, 48px chips.
Fix double BreadcrumbList: page emits buildBreadcrumb (:92) AND renders `<Breadcrumb>`; drop the page-level copy.

### C.6 /blog/stage + /blog/stage/[stage]
Navy index heroes · **em-dashes in `longIntro` at [stage]:49 and :64 REMOVED (fails the grep gate today)** · 48px switcher chips, active `border-primary-600 bg-primary-50` · stage cards to standard card grid (h2->h3, no body clamp, cards get an edge) · net-new stage-specific LeadCTAPanel on the 4 stage pages (sharpest intent in the corpus, zero ask today): Starting "Getting the structure right before you register saves the most." / Running "A second look at director pay and VAT usually pays for itself." / Scaling "Before you hire or restructure, model the tax." / Exiting "The 12 to 24 months before exit is where the saving is." · stage taxonomy single-sourced · `robots noindex,follow` KEPT (deliberate). GATE 10: does the noindex /blog/stage switchboard itself get a panel?

### C.7 /fundamentals index (92 lines)
Motif hero replacing the HOTLINKED Unsplash photo (third-party hotlink on a top-level route; fixed h-[350px] clips the h1 at 390px) · fix duplicate breadcrumb (:41-48 renders the page twice in its own trail) · kit RelatedArticles grid (no-op `max-w-6xl` clamp removed, h2->h3) · net-new orientation band ("Where to start: incorporate, then get the VAT and payroll rhythm right, then plan the exit.") · net-new closing panel ("Rather have someone read your position than read six guides?") · CollectionPage + BreadcrumbList JSON-LD added.

### C.8 /guides index (74 lines)
Navy motif hero, orange pill -> Eyebrow · standfirst sentence "Drop your email to get the full version" RETIRED — it advertises the DELETED email-gate arm (carve-out 2, never resurrect). GATE 11: verify what /guides/[slug] actually does; if it still gates a download behind the full LeadForm that is lead capture (fine, owner said forms stay), but the index copy must describe reality · kit card grid (gradient icon badges out, h2->h3, clamp out) · `Download` icon -> `FileText` (the link opens a page, not a download) · net-new closing panel.

### C.9 /glossary index (90 lines)
Navy motif hero · per-category groups restyled (clamp out, 48px chips at 550+ terms — cards too heavy at that count) · net-new alphabet/category jump rail (`scroll-mt-24` anchors; no wayfinding today above a very long scroll) · net-new closing panel · DefinedTermSet + CollectionPage + BreadcrumbList JSON-LD added.

---

## F. CATEGORY -> CTA COPY MAP (keyed on slugifyCategory output; guard asserts coverage)

| Slug | Heading | Body | Button |
|---|---|---|---|
| limited-company-tax | Want your company's tax position checked? | An accountant runs the numbers on the company: profit extraction, allowances, timing. Free call, no hard sell. | Book a company tax review |
| sole-trader-and-self-employment | Sole trader, and wondering if that is still right? | We model self assessment against a limited company on your actual figures, and tell you if the switch is worth it or not. | Book a structure review |
| vat-and-making-tax-digital | Get your VAT and MTD setup checked | Registration timing, the right scheme, digital links and software. We check it before HMRC does. | Book an MTD readiness call |
| payroll-and-paye | Payroll, PAYE and pensions, off your desk | RTI, auto-enrolment, statutory pay and the director's own payroll. Run properly, filed on time. | Book a payroll call |
| corporation-tax | Corporation tax bill bigger than you expected? | We look at the allowances, the timing and the reliefs before the return is filed, not after. | Book a corporation tax review |
| randd-tax-credits | Not sure whether you actually qualify for R&D relief? | A straight answer on eligibility before you spend a day on a claim, and a properly evidenced claim if you do. | Book an R&D eligibility call |
| incorporation-and-structure | Thinking about incorporating? | Incorporation is one of the more consequential decisions an owner makes. We model the tax, the timing and the running cost on your figures. | Book an incorporation review |
| exit-and-capital-gains | Selling or winding down in the next two years? | BADR, MVL against strike-off, earn-outs. The saving is made 12 to 24 months out, not at completion. | Book an exit planning call |
| bookkeeping-and-compliance | Behind on the books, or dreading year end? | We take the records as they are, get them straight, and keep the deadlines off your calendar. | Book a compliance call |
| director-pay-and-dividends | Is your salary and dividend split still the right one? | Thresholds move every year and most splits are set once and never revisited. We check yours against this year's numbers. | Book a director pay review |
| business-finance | Want a second pair of eyes on the numbers? | Cash, margin, funding and forecasting, read alongside the tax rather than separately. Practical recommendations, no hard sell. | Book a finance review |

Same map feeds: `#enquiry-form` heading/body/button, BlogSidebarCta, and the category hub LeadCTAPanel.

---

## G. KIT-VS-LOCAL SOURCING (slice 1)

Generalist imports NOTHING from `packages/web-shared/design` today (grep-verified) — this port is the kit's first consumer.

KIT (consume): SiteHeader, SiteFooter (+additive `newsletterSlot`), PageShell, nav.ts, BlogCategoryHub, HubArticleList, BlogListWithSearch (projected items only), BlogSidebarCta, TableOfContents, ReadingProgress, RelatedArticles, NumberedPagination, FaqSection + accordion, Breadcrumb (emits BreadcrumbList — remove page-level duplicates), page-blocks (Prose/Eyebrow/InlineLink/CardStack), EyebrowRule, ExampleFigureNote, PromptMarquee, ProblemStatement, StatsCounter, LeadCTAPanel, TestimonialsSection, CoverageCards, ComparisonTable, NumberedReasons, WhyUsList, DrawnTickList, TopicSection, ProcessTimeline, ScrollGlowGroup + the four guard tests.
LOCAL build: BlogPostRenderer rewrite (+ pillar variant), MarketingSections (shared homepage + /contact, lift never copy), wordmark, GeneralistBackdrop motif SVG, lib/page-summaries.ts. StickyCTA stays LOCAL (intent-personalised beyond the kit version).
LOCAL retire: FundamentalsRenderer, BlogPostCard, AuthorByline (absorbed), CTASection, blog/ExitIntentModal, local BlogListWithSearch, local Breadcrumb, local accordion, StatsBar call sites.

## H. SLICE 1 OWNER GATES
1 wordmark raster vs typographic · 2 header data-cta id renames · 3 footer Services column children · 4 hero badge subject · 5 "100+ served" stat · 6 ServiceTiers pricing-vs-services · 7 testimonials existence · 8 CalcPromoCard experiment · 9 NextStepOffer keep/retire · 10 stage-switchboard panel · 11 guides gate status · 12 motif subject.
