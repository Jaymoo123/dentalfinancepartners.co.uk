# Report 02 — Component inventory (designer redesign port)

Written 2026-08-22. Brief: complete inventory of every file the designer added, modified or
deleted under `Property_zip/web/src/components/`, so the plan can sequence porting.

**Method / evidence status.** Everything below is **verified** unless labelled `[INFERRED]`.
Verified means I ran the git command or opened the file. Authoritative file list came from
`git -C tmp/design_migration/Property_zip diff --name-status 8041183 eb745e1 -- web/src/components`
and the matching `--numstat`. Monorepo state came from
`git -C . diff --name-status 1d68a570 HEAD -- Property/web/src/components` plus `ls`/`grep`
against the working tree. I did not run a typecheck or a build; every typecheck claim is
labelled.

---

## 0. Headline numbers

| Metric | Count |
|---|---|
| Component files touched by designer | **88** |
| NEW (A) | 43 |
| MODIFIED (M) | 44 |
| DELETED (D) | 1 (`calculators/CalcResultCta.tsx`) |
| Absent from our monorepo today | **43** (the 43 NEW, minus `resources/ResourceGate.tsx` which we deleted, plus that one — see §6) |
| Files both sides changed (real conflicts) | **13** |
| Files importing `@accounting-network/web-shared` | **9** of the 88 |
| Shared imports that would **fail** against the real package | **0** |
| Shared imports that **behave differently** against the real package | **3 modules** (see §7) |

The single most useful structural finding: **~24 of the 44 MODIFIED files are a mechanical
design-token sweep, not logic changes.** See §3.

---

## 1. The design-token sweep (do this as one commit, not 24)

Verified by reading the full diff of 22 small-diff files at once. The designer's "MODIFIED,
+1/-1 to +6/-6" files are almost entirely three find-and-replace rules plus a copy rule:

| Rule | Old | New |
|---|---|---|
| R1 corner radius | `rounded-lg` / `rounded-md` / `rounded-2xl` | `rounded-xl` |
| R2 accent bar removal | `border-l-4 border-emerald-600` (+ often `border-slate-300`) | dropped entirely |
| R3 button chrome removal | `border-b-4 border-emerald-800 active:border-b-2 active:translate-y-0.5` | `active:bg-emerald-800` |
| R4 copy | em-dash `—` in user-facing strings | `:` or `,` |

Evidence, one citation per rule:
- R1: `Property_zip/web/src/components/ui/input.tsx:10` (`rounded-md` → `rounded-xl`); `ui/chart.tsx`; `ui/accordion.tsx`.
- R2: `Property_zip/web/src/components/property/MTDCountdown.tsx:~30`; `blog/InlineMiniLeadForm.tsx`; `resources/GateOrForm.tsx`; `ui/CTASection.tsx`; `calculators/premium/MobileToolSlot.tsx`.
- R3: `Property_zip/web/src/components/embed/EmbedCta.tsx`; `calculators/PageResultCta.tsx`; and the root definition in `ui/layout-utils.ts`.
- R4: `Property_zip/web/src/components/property/ProblemSolutionSplit.tsx` (`—` → `:`); `property/TestimonialSlider.tsx` (2 testimonials); `brand/BrandLogoHero.tsx` (sr-only text).

R4 is worth flagging to the owner: the designer independently applied our no-em-dash rule to
existing copy. Those two edits are safe to take verbatim.

**Files that are R1–R4 only (24):** `analytics/ConsentBanner.tsx`, `blog/InlineMiniLeadForm.tsx`,
`brand/BrandLogoHero.tsx`, `calculators/PageResultCta.tsx`, `calculators/premium/MiniGrid.tsx`,
`calculators/premium/MobileToolSlot.tsx`, `embed/EmbedCta.tsx`, `forms/DetailsForm.tsx`,
`forms/LeadForm.tsx`, `forms/MiniCapture.tsx`, `intent/DeepScrollModal.tsx`,
`property/CalculatorPreviewGrid.tsx`, `property/MTDCountdown.tsx`,
`property/ProblemSolutionSplit.tsx`, `property/TestimonialSlider.tsx`,
`resources/GateOrForm.tsx`, `resources/ResourceGate.tsx`, `ui/CTASection.tsx`,
`ui/StickyCTA.tsx`, `ui/accordion.tsx`, `ui/chart.tsx`, `ui/input.tsx`,
`calculators/CalculatorClient.tsx` (comment only), `blog/TableOfContents.tsx` (R1 + focus ring).

---

## 2. NEW components (43)

`C` = client (`"use client"`), `S` = server. `LOC` = file length at `eb745e1`.
"Shared" column = imports from `@accounting-network/web-shared`.
Port risk for all 43 is **CLEAN** unless noted (none of these paths exist in our monorepo, so
there is no both-sides conflict — verified by `[ -f Property/web/src/components/<path> ]`).

### 2.1 Leaf primitives (no local component deps) — port first

| Path | +/− | C/S | Renders | Props | Imports | Used by (designer) |
|---|---|---|---|---|---|---|
| `ui/EyebrowRule.tsx` | +61/0 | C | 24px emerald rule that draws L→R on first scroll-in; sets `data-draw`, keyframes live in `globals.css` | `{ onDark?: boolean }` | react only | `ui/page-blocks.tsx` only |
| `ui/ExampleFigureNote.tsx` | +30/0 | S | Fine-print disclaimer stamped on every figure carrying numbers | `{ className?: string }` | none | 5 pages + `FilingCadence`, `PenaltyLadder`, `RateWedge`, `RentalProfitStack`, `LandlordIndexCharts` |
| `layout/HeroBrickBackdrop.tsx` | +43/0 | S | Etched-brick decorative layer for hero bands; `tone` navy or cream | `{ tone?: "navy" \| "cream" }` | none | 19 pages + `SiteFooter`, `BlogPostRenderer`, `LeadCTAPanel`, `TestimonialsSection`, `BlogCategoryHub` |
| `property/ScrollGlowGroup.tsx` | +86/0 | C | Wrapper that runs a staggered emerald glow across children on first view; publishes `--glow-delay` | `{ children, className?, delay?: number, as?: "div"\|"ol" }` | react only | `/services` + `CoverageCards`, `SchemeFlow` |
| `property/DrawnTickList.tsx` | +87/0 | C | Checklist whose ticks stroke-draw in sequence on first view | `{ items: string[]; className? }` | react only | `/section-24`, `/services/property-tax-advice` |
| `property/NumberedReasons.tsx` | +78/0 | C | Numbered argument list, numerals light emerald in sequence | `{ items: {title;body}[] }` | react only | `/about` |
| `property/WhyUsList.tsx` | +71/0 | C | Numbered "why choose us" list with staggered glow | `{ items: {title;body}[] }` | react only | `/` |
| `property/StatsCounter.tsx` | +92/0 | C | Count-up stat row, starts at 60% of target | `{ stats: StatItem[] }`, `StatItem = {target:number; decimals?; prefix?; suffix?; label}` | react only | **12 pages** |
| `property/ProcessTimeline.tsx` | +133/0 | C | Vertical onboarding timeline; emerald rail fills on scroll | `{ steps: {n;title;body}[] }` | react only | 6 pages |
| `property/PromptMarquee.tsx` | +98/0 | S | Vertical continuous marquee of first-person reader prompts | `{ prompts: Prompt[]; tone?: "white"\|"slate" }`, `Prompt = {tag;text;icon:LucideIcon}` | lucide | 7 pages (via `ProblemStatement` too) |
| `property/LocationChips.tsx` | +38/0 | S | "Across the UK" chip row linking to location pages | `{ className? }` | next/link, lucide, `@/config/site` | `/` |
| `calculators/resultGateStorage.ts` | +28/0 | — | `sessionStorage` helpers `wasRevealed(campaign)` / `rememberRevealed(campaign)` | n/a | none | `ResultGate`, `PremiumCalculator` |
| `ui/page-blocks.tsx` | +104/0 | S | Four shared primitives: `Prose`, `Eyebrow`, `InlineLink`, `CardStack` | `Prose{children,onDark?}`, `Eyebrow{children,onDark?}`, `InlineLink{href,children,onDark?}`, `CardStack{items:{title;body}[],tone?,columns?}` | next/link, `EyebrowRule` | **17 pages** + `BlogPostRenderer`, `FaqSection`, `LeadCTAPanel`, `TestimonialsSection`, `ProblemStatement`, `PremiumUpgrade`, 4 calculators |

### 2.2 Storytelling figures — `components/property/*` (see §5 for page grouping)

All CLEAN, all zero-prop or data-prop, none touch shared.

| Path | +/− | C/S | Renders | Props | Imports (non-react) | Used by |
|---|---|---|---|---|---|---|
| `property/AgencyBooks.tsx` | +94 | S | An agency's own books vs client money, two panels | none | lucide | `/services/landlord-accountant` |
| `property/ComparisonTable.tsx` | +201 | S | Neutral "general practice vs specialist" table (dash, never a red cross) | `{rows: ComparisonRow[]; generalLabel; generalCaption; ourCaption; cta?{href,label,note?}}` | next/link, lucide, `layout-utils`, `@/config/site` | 3 pages |
| `property/CoverageCards.tsx` | +104 | S | "What the advice covers" card grid, icon badge + outcome line | `{items: CoverageItem[]; columns?: 2\|3; tone?: "slate"\|"white"; glow?: boolean}` | lucide, `ScrollGlowGroup` | **8 pages** |
| `property/DecisionWindow.tsx` | +77 | S | Two windows: where tax is decided vs where it is reported | none | lucide | `/services/property-tax-advice` |
| `property/DepartureWindow.tsx` | +122 | S | Leaving-the-UK planning window drawn as a boarding pass | none | lucide | `/services/non-resident-landlord` |
| `property/DisposalFigures.tsx` | +90 | S | 60-day clock, CGT rates, three gain computations; rebasing optional | `{showRebasing?: boolean}` | none | 2 pages |
| `property/FilingCadence.tsx` | +109 | S | One annual return becoming four quarterly updates plus a final declaration | none | `ExampleFigureNote` | `/making-tax-digital-landlords` |
| `property/FilingDates.tsx` | +130 | S | Filing calendar: recurring dates vs one-off coming dates | none | none | `/services/non-resident-landlord` |
| `property/PenaltyLadder.tsx` | +101 | C | Penalty escalation rail, steps land at 220ms stagger | `{steps: readonly PenaltyStep[]}`, `PenaltyStep = {when;penalty;note}` | `ExampleFigureNote` | 2 pages |
| `property/PortfolioPooling.tsx` | +108 | S | Per-property profit/loss against a shared zero line; shows what pooling hides | none (data is module-const) | `@/lib/research/landlord-index` (`fmtGBP`) | `/services/landlord-accountant` |
| `property/ProblemStatement.tsx` | +111 | S | Homepage self-identification block: argument left, `PromptMarquee` right | none | next/link, lucide, `layout-utils`, `page-blocks`, `PromptMarquee` | 4 pages |
| `property/RateWedge.tsx` | +147 | C | Two-year wedge: reducer 20%→22% vs property rates 40→42, gap unchanged | none | `ExampleFigureNote`, react | `/section-24` |
| `property/RentalProfitStack.tsx` | +215 | C | Salary + rental profit on one bar, higher-rate threshold arriving mid-profit | none | `ExampleFigureNote`, `fmtGBP`, react | `/landlord-tax` |
| `property/SchemeFlow.tsx` | +177 | S | NRL scheme: what the agent can and cannot see when computing the 20% | none | lucide, `ScrollGlowGroup` | `/services/non-resident-landlord` |
| `property/Section24Wedge.tsx` | +91 | S | Banked profit vs taxed profit stacked, phantom interest slice | none | `fmtGBP` | `/services/landlord-accountant` |
| `property/TaxYearGap.tsx` | +71 | S | Decisions across the year vs the return where they get typed up (78/22, no axis) | none | lucide | `/services/property-accountant` |
| `property/LocationMap.tsx` | +124 | S | Hand-built GB+NI coastline (≈130 points, equirect projection) with city pins | `{className?}` | next/link, `@/config/site` | `/services/landlord-accountant` |
| `property/LeadCTAPanel.tsx` | +176 | S | Closing conversion panel: pitch left, real `LeadForm` right | `{eyebrow?; title; description; proofPoints: {title;detail}[]; formTitle?; submitLabel?; footnote?: ReactNode; contained?: boolean; ground?: "slate"\|"white"; redirectOnSuccess?: boolean}` | lucide, `LeadForm`, `page-blocks`, `HeroBrickBackdrop`, `layout-utils` | **21 pages** |
| `property/TestimonialsSection.tsx` | +89 | S | Navy testimonial band with stars | `{eyebrow?; title?; description?}` | lucide, `HeroBrickBackdrop`, `layout-utils`, `page-blocks` | **13 pages** |

### 2.3 New UI / blog / calculator components

| Path | +/− | C/S | Renders | Props | Imports | Used by |
|---|---|---|---|---|---|---|
| `ui/CardCarousel.tsx` | +278 | C | Horizontally scrolling `CardStack`; optional autoplay, optional numbering | `{items: CarouselItem[]; tone?; label: string; numbered?; autoplay?}` | next/link, lucide, react | `/section-24`, `/services/landlord-accountant` |
| `ui/FaqSection.tsx` | +47 | S | Single-open Q&A accordion, pairs with `buildFaqPageJsonLd()` | `{eyebrow?; title?; faqs: FaqEntry[]; className?; tone?}` | `@/lib/faq-page-schema`, `layout-utils`, `ui/accordion`, `page-blocks` | **10 pages** |
| `blog/BlogCategoryHub.tsx` | +229 | S | Shared template for the nine `/blog/<category>` hubs | `{categoryName; categorySlug; description; intro; essentialsTitle?; sections: HubSection[]; cta: HubCta}` | next/link, lucide, `HubArticleList`, `@/lib/blog`, `@/config/site`, `Breadcrumb`, `page-blocks`, `HeroBrickBackdrop`, `LeadCTAPanel`, `layout-utils` | **9 blog hub pages** |
| `blog/HubArticleList.tsx` | +95 | C | Paginated article list inside a hub | `{posts: HubArticle[]; categorySlug; postsPerPage?}` | next/link, lucide, `layout-utils`, `NumberedPagination` | `BlogCategoryHub` |
| `blog/NumberedPagination.tsx` | +88 | C | Numbered pager with chevrons | `{currentPage; totalPages; onPageChange(page)}` | lucide, `layout-utils` | `HubArticleList`, `BlogListWithSearch` |
| `blog/BlogSidebarCta.tsx` | +38 | S | Navy sidebar conversion card anchoring to `#enquiry-form`; headings are `<p>` so they stay out of the ToC | `{copy: BlogSidebarCtaCopy}` = `{heading; body}` | `layout-utils` | `BlogPostRenderer` |
| `calculators/CalculatorTabs.tsx` | +211 | C | Tab bar over the five free calculators, lazy-loaded per tab | `{tabs?: TabKey[]}`, `TabKey = "section24"\|"incorporation"\|"mtd"\|"portfolio"\|"stampduty"` | next/dynamic, react, lucide | **11 pages** |
| `calculators/CalculatorLinkCards.tsx` | +57 | S | Crawlable link-card grid to the calculators ("Free tools" section) | `{items: {href;title;body}[]}` | next/link, lucide | none in `app/` yet `[INFERRED: staged for service pages]` |
| `calculators/HeldResult.tsx` | +90 | C | The real result rendered but held behind navy frosted glass with the capture prompt on top | `{children; onReveal(); ground?: "navy"\|"light"; contentClassName?; minHeightClass?; buttonLabel?; dataCta?}` | react | `ResultGate`, `PremiumCalculator` |
| `calculators/ResultGate.tsx` | +103 | C | Wraps a result panel; holds the figure until submit or skip. Inputs stay live; embeds never gated | `{campaign: string; enabled?: boolean; children}` | **shared:** `analytics/visitMemory` (`isConverted`), `analytics/track` (`track`); local: `ResultGateModal`, `HeldResult`, `layout-utils`, `resultGateStorage` | `/services`, `/services/non-resident-landlord` + all 5 calculators |

**Note on `calculators/ResultGate.tsx` vs `resources/ResourceGate.tsx`.** Different files,
confusingly similar names. The first is NEW and live. The second is the old email-download gate,
which we have already deleted (§6).

---

## 3. MODIFIED components — the 20 that are not just the token sweep

| Path | +/− | Ours since `1d68a570` | What changed | Port risk |
|---|---|---|---|---|
| `layout/SiteHeader.tsx` | +197/−23 | **+170/−16** | Full nav rebuild | **CONFLICT** |
| `layout/SiteFooter.tsx` | +134/−28 | untouched | Footer rebuild, mirrors header nav; adds `HeroBrickBackdrop`; **adds the "Built by Double Wired Creative" credit** at `SiteFooter.tsx:134,137,140` | CLEAN code / **owner gate on the credit** |
| `layout/PageShell.tsx` | +18/−6 | untouched | Threads server-built `nav?: NavItem[]` through to header and footer so the footer columns mirror the header | CLEAN |
| `blog/BlogPostRenderer.tsx` | +96/−68 | **+17/−86** | Article template rebuild; adds `BlogSidebarCta`, `HeroBrickBackdrop`, `page-blocks`, `TableOfContents`; **fixes the invisible-`LeadForm`-labels bug (CONTEXT §6.1)** | **CONFLICT** |
| `blog/BlogListWithSearch.tsx` | +38/−42 | untouched | Adds `NumberedPagination`, restyles cards | CLEAN |
| `research/LandlordIndexCharts.tsx` | +225/−141 | untouched | Chart rebuild + `ExampleFigureNote` on every figure | CLEAN |
| `ui/Breadcrumb.tsx` | +16/−6 | untouched | Adds `onDark?: boolean` for use over dark heroes | CLEAN |
| `brand/BrandWordmarkHomeLink.tsx` | +38/−19 | untouched | Adds `size?: "header" \| "footer"` | CLEAN |
| `ui/layout-utils.ts` | +33/−6 | untouched | **Design-system root.** Adds `siteContainerXl`, `heroCreamSurface` (`#fbfaf7`), `btnOnCream`; rewrites `btnPrimary`/`btnSecondary`/`btnOnDark` from sharp `border-b-4` to `rounded-xl` | CLEAN file, **site-wide blast radius** |
| `property/ServiceTiers.tsx` | +7/−6 | untouched | Restyle | CLEAN |
| `calculators/Section24Calculator.tsx` | +9/−12 | untouched | **Drops `CalcResultCta`, wraps result in `ResultGate`**; navy pill badge → `Eyebrow` | **BLOCKED — owner decision** |
| `calculators/IncorporationCostCalculator.tsx` | +9/−12 | untouched | Same swap | **BLOCKED** |
| `calculators/MTDCheckerCalculator.tsx` | +13/−14 | untouched | Same swap | **BLOCKED** |
| `calculators/PortfolioProfitabilityCalculator.tsx` | +10/−13 | untouched | Same swap | **BLOCKED** |
| `calculators/StampDutyCalculator.tsx` | +16/−12 | **+4/−4** | Same swap | **CONFLICT + BLOCKED** |
| `calculators/premium/PremiumCalculator.tsx` | +48/−55 | untouched | Adds `HeldResult` + `resultGateStorage` gating to the premium tools | **BLOCKED** (same decision) |
| `calculators/premium/PremiumUpgrade.tsx` | +45/−14 | untouched | Adds `mobileFallback?: "capture" \| "link"`; calculator pages pass `"link"` so mobile does not get a third form. Emerald pill badge → `Eyebrow` | CLEAN (behaviour change worth flagging: removes a `MiniCapture` from calculator mobile) |
| `calculators/ResultGateModal.tsx` | +4/−9 | **+29/−88** | Designer: token sweep. Ours: heavy rework | **CONFLICT** |
| `resources/CalculatorPageResources.tsx` | +29/−56 | **+6/−12** | Designer passes `mobileFallback="link"` and prunes | **CONFLICT** |
| `support/SpecialistWidget.tsx` | +24/−17 | **+2/−2** | Restyle. CONTEXT §6.4 flags an undiagnosed failure mode here | **CONFLICT** |

---

## 4. The 13 real conflicts (both sides changed the same component)

Derived by intersecting the two `--name-status` outputs. Verified.

| Path | Designer | Ours | Recommended handling |
|---|---|---|---|
| `layout/SiteHeader.tsx` | M +197/−23 | M +170/−16 | Hand-reconcile. Highest-effort single component. |
| `blog/BlogPostRenderer.tsx` | M +96/−68 | M +17/−86 | Take theirs, re-apply our deletions. Carries the invisible-labels fix. |
| `forms/MiniCapture.tsx` | M +6/−6 (token sweep only) | M +30/−739 | **Ours wins outright.** Re-apply R1 by hand. Their file is 751 lines; ours is ~740 lines shorter. |
| `calculators/ResultGateModal.tsx` | M +4/−9 | M +29/−88 | Ours wins; re-apply R1. |
| `calculators/CalcResultCta.tsx` | **D** | M +29/−25 | See §6.4 — do not delete. |
| `calculators/StampDutyCalculator.tsx` | M +16/−12 | M +4/−4 | Blocked on gate decision; our 4 lines are the fact patch. |
| `calculators/premium/MobileToolSlot.tsx` | M +1/−1 | M +26/−16 | Ours wins; re-apply R1/R2. |
| `resources/CalculatorPageResources.tsx` | M +29/−56 | M +6/−12 | Reconcile; theirs adds `mobileFallback`. |
| `resources/GateOrForm.tsx` | M +1/−1 | M +7/−10 | Ours wins; re-apply R1/R2. |
| `resources/ResourceGate.tsx` | M +4/−4 | **D (we deleted)** | **Discard theirs.** See §6. |
| `support/SpecialistWidget.tsx` | M +24/−17 | M +2/−2 | Theirs, re-apply our 2 lines. Widget failure mode still undiagnosed. |
| `ui/StickyCTA.tsx` | M +2/−2 | M +21/−9 | Ours wins; re-apply R1/R3. |
| `analytics/useFormTracking.ts` / `analytics/ConsentToggle.tsx` | untouched | M | Not conflicts. Listed for completeness: they moved under us but the designer never touched them. |

---

## 5. The `components/property/*` blocks, grouped by the page story they serve

The designer built these as **per-page arguments**, not a reusable kit. Twelve of the nineteen
new `property/*` figures are used on exactly one page. Grouping by story:

**Story A — "Section 24 costs you money you never banked"** (`/section-24`, `/landlord-tax`)
`Section24Wedge` (banked vs taxed profit), `RateWedge` (2027 reducer rises but so do rates, gap
unchanged), `RentalProfitStack` (profit sits on top of salary, crosses the threshold),
`DrawnTickList`, `CardCarousel`.

**Story B — "MTD replaces one filing with five"** (`/making-tax-digital-landlords`)
`FilingCadence` (1 return → 4 updates + 1 final declaration), `PenaltyLadder` (points escalation),
`ProcessTimeline`, `CoverageCards`.

**Story C — "Tax is decided across the year, not at the return"** (`/services/property-tax-advice`, `/services/property-accountant`)
`TaxYearGap` (78/22 illustrative split), `DecisionWindow` (decided vs reported), `DrawnTickList`,
`ComparisonTable`, `ProcessTimeline`.

**Story D — "Non-resident landlords have a departure window"** (`/services/non-resident-landlord`)
`DepartureWindow` (boarding-pass framing), `SchemeFlow` (what the agent can see when computing
the 20%), `FilingDates` (recurring vs one-off), `DisposalFigures` (60-day clock, rebasing).

**Story E — "Pooling hides your loss-making property"** (`/services/landlord-accountant`)
`PortfolioPooling` (shared zero line, one property below it), `Section24Wedge`, `AgencyBooks`
(own money vs client money), `LocationMap`, `ComparisonTable`, `CardCarousel`.

**Story F — homepage self-identification** (`/`)
`ProblemStatement` + `PromptMarquee` (first-person reader prompts), `WhyUsList`, `LocationChips`,
`StatsCounter`.

**Story G — trust furniture, used everywhere**
`LeadCTAPanel` (21 pages), `TestimonialsSection` (13), `StatsCounter` (12), `CoverageCards` (8),
`ProcessTimeline` (6), `HeroBrickBackdrop` (19), `FaqSection` (10), `page-blocks` (17),
`CalculatorTabs` (11).

Practical read for the plan: **Story G is the port. Stories A–F are page work.** Nine components
carry 8+ pages each; the other nineteen are single-page figures that only make sense once the
page they argue for is ported, and four of those six pages are on the disputed-forked list
(CONTEXT §4).

---

## 6. Dead / owner-decision components — resolved against our monorepo

Verified against the working tree, not inferred.

| Component | In designer repo | In our monorepo | Verdict |
|---|---|---|---|
| `resources/ResourceGate.tsx` | exists, 354 lines, edited (+4/−4 token sweep), **imported by nothing in `app/`** | **DELETED by us** (`git diff --name-status 1d68a570 HEAD` shows `D`, −354). Only surviving mentions are explanatory comments: `Property/web/src/components/resources/GateOrForm.tsx:8`, `Property/web/src/lib/resources/registry.ts:8`, `Property/web/src/lib/leads/submit-client.ts:13` | **Do not port. Question already closed on our side.** |
| `resources/ResourceGateLazy.tsx` | exists, imports `ResourceGate`, referenced by nothing in `app/` | **DELETED by us** (−37) | **Do not port.** |
| `resources/ExcelPreview.tsx` | exists (472+ lines), only consumer is `ResourceGate.tsx:35,210` | **DELETED by us** (−535) | **Do not port.** |
| `ui/page-blocks.tsx → CardStack` | exported at `page-blocks.tsx:82`; **zero JSX call sites**. Only mentions are the designer's own comments recording its removal (`app/making-tax-digital-landlords/page.tsx:218`, `ui/CardCarousel.tsx:42`, `ui/EyebrowRule.tsx:10`) | does not exist at all | **Port `page-blocks.tsx` for `Prose`/`Eyebrow`/`InlineLink`; drop `CardStack`.** Dead on both sides. |
| `ui/CTASection.tsx` | exists, token sweep applied, **removed from all four designer pages** (comments at `app/about/page.tsx:220`, `app/landlord-tax/page.tsx:1239`, `app/making-tax-digital-landlords/page.tsx:1170`, `app/section-24/page.tsx:904` all read "Was a … CTASection …") | **ALIVE on 16 pages**, including 4 of the 6 pages the designer has never seen (`/cost-of-selling-a-property`, `/landed-estates`, `/landlord-compliance`, `/leasehold`) | **Not dead. Keep the file.** Porting the designer's pages removes 4 call sites; the other 12 stay. Deleting it would break four of our newest pages. |

**Additional finding — the reason `ResourceGate` was dead in the designer's repo.** It imports
`@accounting-network/web-shared/lib/supabase-client` (`ResourceGate.tsx:22`) and that module has
**no vendored stub** — `Property_zip/web/vendor/web-shared/` has 31 files and `lib/supabase-client`
is not one of them (verified by `find vendor -type f`). So the component could not have compiled
in their snapshot. Its "dead" status is an artefact of the cut-down handoff, not a design
judgement. It does not matter, because we deleted it independently, but it means the designer's
five-item dead list should not be read as five design decisions.

### 6.4 `calculators/CalcResultCta.tsx` — the one DELETE, and it is not safe

The designer deleted this file and rewired `CalculatorClient.tsx:16` to mention only
`PageResultCta`. In our monorepo it is **live on five surfaces**:

- `Property/web/src/components/calculators/IncorporationCostCalculator.tsx:5,179`
- `Property/web/src/components/calculators/MTDCheckerCalculator.tsx:5,136`
- `Property/web/src/components/calculators/PortfolioProfitabilityCalculator.tsx:5,227`
- `Property/web/src/components/calculators/Section24Calculator.tsx:5,144`
- `Property/web/src/components/calculators/premium/PremiumCalculator.tsx:51,665`

and we modified it (+29/−25) since the snapshot. The designer's deletion is not a cleanup: it is
the **soft-gated calculator results** decision (CONTEXT §7, unvalidated). Taking their calculator
files takes the gate; leaving `CalcResultCta` in place keeps ours. These cannot be separated
file-by-file — the five calculators are one atomic decision.

---

## 7. `@accounting-network/web-shared` — cross-check against the real package

**This is the most load-bearing section.** Nine of the 88 touched components import from the
shared package. I read the real `packages/web-shared/package.json` exports map and every real
module involved, then diffed each against the vendored stub at
`Property_zip/web/vendor/web-shared/`.

### 7.1 Every shared import in the 88 touched files

| Importing component | Specifier | Symbols | Real export exists? |
|---|---|---|---|
| `calculators/CalculatorClient.tsx:19` | `.../tools/components/Calculator` | `Calculator` | Yes (`packages/web-shared/tools/components/Calculator.tsx`) |
| `calculators/ResultGate.tsx:32` | `.../analytics/visitMemory` | `isConverted` | Yes (`visitMemory.ts:120`) |
| `calculators/ResultGate.tsx:33` | `.../analytics/track` | `track` | Yes (`track.ts:98`) |
| `calculators/ResultGateModal.tsx:14` | `.../analytics/track` | `track` | Yes |
| `calculators/premium/PremiumCalculator.tsx:49,50,54` | `.../analytics/track`, `.../analytics/useInViewOnce`, `.../analytics/visitMemory` | `track`, `useInViewOnce`, `isConverted` | Yes |
| `forms/LeadForm.tsx:12,13` | `.../analytics/ids`, `.../analytics/visitMemory` | `getVisitorId`, `getSessionId`, `setBookingNudge` | Yes (`ids.ts:101,118`; `visitMemory.ts:131`) |
| `forms/MiniCapture.tsx:25,26,27,28` | `.../analytics/ids`, `useInViewOnce`, `visitMemory`, `track` | `getVisitorId`, `getSessionId`, `useInViewOnce`, `setBookingNudge`, `flush` | Yes (`track.ts:154` for `flush`) |
| `resources/ResourceGate.tsx:22,24,25,26` | `.../lib/supabase-client`, `ids`, `track`, `useInViewOnce` | `submitLead`, `getSupabaseConfig`, … | Yes (`supabase-client.ts:35,86`) — **but this component is being discarded, §6** |
| `support/SpecialistWidget.tsx:32,33,34,35` | `.../analytics/ids`, `track`, `bus`, `visitMemory` | `getVisitorId`, `getSessionId`, `track`, `onAnalyticsEvent`, `isConverted`, `getBookingNudge` | Yes (`bus.ts:22`; `visitMemory.ts:120,142`) |

**Every path in the exports map. Zero unresolvable imports.** Verified against the exports map
in `packages/web-shared/package.json`.

### 7.2 Where the stub differs from the real module — the three that matter

**(a) `analytics/track` — `track()` is name-checked in the real package, not in the stub.**
Stub: `track(name: string, props?: Record<string, unknown>)` (`vendor/.../analytics/track.ts:4`).
Real: `track(eventName: EventName, props: EventProps = {})` (`packages/web-shared/analytics/track.ts:98`),
where `EventName` is a 40-member union from `EVENT_NAMES` (`analytics/types.ts:13-56`) and
`EventProps = Record<string, string | number | boolean | null | undefined>` (`types.ts:101`).

I extracted all 25 `track("…")` call sites in the designer's `src/components`. **All 25 names are
members of `EVENT_NAMES`** — `form_start`, `form_field_focus`, `form_field_abandon`, `form_error`,
`form_submit`, `lead_submitted`, `form_step_view`, `form_step_complete`, `form_step_back`,
`calc_view`, `calc_input_change`, `calc_result_viewed`, `calc_computed`, `cta_click`,
`gate_view`, `resource_unlocked`, `personalization_shown`, `support_opened`. Verified name by
name. **No new event names were invented.** This is the single biggest risk in the brief and it
does not fire.

Residual risk, `[INFERRED]`: `EventProps` is narrower in the real package. If any props object
passed to `track()` carries a nested object or array it will fail typecheck. I did not typecheck.
The call sites I read pass flat scalars only.

**(b) `analytics/visitMemory` — `setBookingNudge` / `getBookingNudge` have real signatures the
stub does not enforce.**
Stub: `setBookingNudge(value?: unknown)`, `getBookingNudge(): unknown` (`vendor/.../visitMemory.ts:38,42`).
Real: `setBookingNudge(token: string, expiresAtMs: number)`, `getBookingNudge(): {token: string} | null`
(`packages/web-shared/analytics/visitMemory.ts:131,142`).

The designer's call sites are **already correct against the real signature**:
`LeadForm.tsx:165` and `MiniCapture.tsx:357` both call
`setBookingNudge(result.bookingToken, Date.now() + 14 * 24 * 3600000)`. Verified. No fix needed.

**(c) `analytics/useInViewOnce` — the stub returns a ref OBJECT, the real one returns a CALLBACK
ref.**
Stub (`vendor/.../useInViewOnce.ts:6-27`): builds `useRef`, attaches in a mount `useEffect`,
returns the ref object.
Real (`packages/web-shared/analytics/useInViewOnce.ts:20-22`): returns `(el: T | null) => void`,
a callback ref that re-attaches whenever the element appears — deliberately, per the comment
citing a live generalist bug on 2026-06-11.

Three call sites: `MiniCapture.tsx:146→462`, `PremiumCalculator.tsx:502→561`,
`ResourceGate.tsx:75→191`. **All three use the result only as `ref={x}` in JSX** and never touch
`.current`. Verified by grep. Both shapes are valid JSX refs, so all three work against the real
package — and behave *better*, because the real version handles late-mounting elements.

### 7.3 Lower-risk divergences (not hit by any touched component, recorded so nobody trips later)

- `analytics/consent`: stub `ConsentState = "granted"|"denied"|"pending"`; real is
  `"undecided"|"granted"|"denied"` (`packages/web-shared/analytics/consent.ts:17`). Different
  third member. Only `analytics/ConsentToggle.tsx` imports it, and the designer did not touch it.
- `analytics/autoCapture`: stub exports only `getMaxScrollPct`/`getEngagedMs`; real also exports
  `installAutoCapture` and `resetForNavigation` (`autoCapture.ts:342,381`). Imported by
  `intent/IntentProvider.tsx:20`, untouched by the designer.
- `analytics/bus`: real `onAnalyticsEvent` is typed `(eventName: EventName, props: EventProps)`;
  stub is `(name: string, props?: Record<string, unknown>)`. `SpecialistWidget.tsx:34` uses it —
  `[INFERRED]` low risk, the listener is structurally compatible, but worth a typecheck.
- The real exports map lists `"./analytics/react/Clarity"` but
  `packages/web-shared/analytics/react/Clarity.tsx` **does not exist** (we deleted Clarity;
  `Property/web/src/components/analytics/Clarity.tsx` shows `D`, −35). Pre-existing dead entry in
  the exports map, unrelated to this port, but someone should tidy it.
- **`tools/components/Field.tsx`**: this is the one item CONTEXT §5 already gates. Real is 140
  lines, stub is 78. It lives in `packages/web-shared/` and is estate-wide across 15 sites. Not
  touched by any of the 88 component files in this inventory; it reaches Property only through
  `calculators/fields/Field.tsx`, which is a bare re-export the designer did not modify.

### 7.4 Verdict

**No shared import in the 88 files would fail to resolve, and none of the three behavioural
divergences bites in practice.** The designer wrote against the real semantics even where the
stub was looser. The "expect typecheck failures" warning in CONTEXT §5 is, on the evidence of
the component layer, over-cautious. `[INFERRED]` — I did not run `tsc`; the plan should still
schedule one typecheck gate, but should not budget days for shared-API reconciliation.

---

## 8. Dependency graph and build order

Arrows point from dependency to dependent. Derived from the `import` lines of all 88 files.

```
TIER 0 — no local component deps. Nothing ships until these land.
  ui/layout-utils.ts  (MODIFIED, design-system root)
  ui/EyebrowRule.tsx  (NEW)
  ui/ExampleFigureNote.tsx  (NEW)
  layout/HeroBrickBackdrop.tsx  (NEW)
  property/ScrollGlowGroup.tsx  (NEW)
  calculators/resultGateStorage.ts  (NEW)
  ui/accordion.tsx, ui/input.tsx, ui/chart.tsx  (MODIFIED, token sweep)

TIER 1 — depend only on Tier 0.
  ui/page-blocks.tsx  <- EyebrowRule                      [Eyebrow, Prose, InlineLink]
  ui/Breadcrumb.tsx   <- layout-utils
  property/PromptMarquee.tsx
  property/CoverageCards.tsx  <- ScrollGlowGroup
  property/SchemeFlow.tsx     <- ScrollGlowGroup
  property/PenaltyLadder.tsx, FilingCadence.tsx, RateWedge.tsx,
  property/RentalProfitStack.tsx  <- ExampleFigureNote
  calculators/HeldResult.tsx
  blog/NumberedPagination.tsx <- layout-utils
  brand/BrandWordmarkHomeLink.tsx, brand/BrandLogoHero.tsx <- layout-utils

TIER 2 — depend on Tier 1.
  ui/FaqSection.tsx           <- accordion + page-blocks + layout-utils
  property/TestimonialsSection.tsx <- HeroBrickBackdrop + page-blocks + layout-utils
  property/ProblemStatement.tsx    <- PromptMarquee + page-blocks + layout-utils
  property/LeadCTAPanel.tsx        <- LeadForm + page-blocks + HeroBrickBackdrop + layout-utils
  blog/HubArticleList.tsx          <- NumberedPagination
  blog/BlogListWithSearch.tsx      <- NumberedPagination
  blog/BlogSidebarCta.tsx          <- layout-utils
  calculators/ResultGate.tsx       <- HeldResult + ResultGateModal + resultGateStorage + layout-utils
  layout/SiteFooter.tsx            <- HeroBrickBackdrop + layout-utils
  layout/SiteHeader.tsx            <- BrandWordmarkHomeLink + layout-utils

TIER 3 — page-level composites.
  blog/BlogCategoryHub.tsx    <- HubArticleList + Breadcrumb + page-blocks + HeroBrickBackdrop + LeadCTAPanel + layout-utils
  blog/BlogPostRenderer.tsx   <- BlogSidebarCta + page-blocks + HeroBrickBackdrop + accordion + Breadcrumb + TableOfContents + LeadForm
  calculators/{Section24,Incorporation,MTD,Portfolio,StampDuty}  <- ResultGate + page-blocks
  calculators/premium/PremiumCalculator.tsx  <- HeldResult + resultGateStorage + ResultGateModal + MiniGrid
  layout/PageShell.tsx        <- SiteHeader + SiteFooter
  All 19 property/* single-page figures  (leaves; port with their page)
```

### The four leaf primitives that unblock the most downstream work

Ranked by transitive dependents plus direct page usage:

1. **`ui/layout-utils.ts`** — imported by 15 of the 88 components and effectively every page.
   Also the highest-blast-radius single file in the port: it changes `btnPrimary` from the
   current sharp `border-b-4` treatment to `rounded-xl`, which restyles **every button on every
   page including the six pages the designer has never seen**. Port it first, and expect the
   whole site to change appearance in one commit. There is no partial version of this.
2. **`ui/page-blocks.tsx`** (needs `ui/EyebrowRule.tsx`) — `Eyebrow` alone appears on 17 pages and
   inside 8 other components. It is the designer's replacement for every filled pill badge on the
   site. Nothing in Tier 2 or 3 compiles without it.
3. **`layout/HeroBrickBackdrop.tsx`** — 19 pages plus 5 components. Zero dependencies, 43 lines,
   no monorepo conflict. Cheapest large unlock in the whole port.
4. **`ui/ExampleFigureNote.tsx` + `property/ScrollGlowGroup.tsx`** — 30 and 86 lines, no
   dependencies, and between them they gate 8 of the storytelling figures. Trivial to port.

Suggested sequencing consequence for the plan: **Tier 0 + Tier 1 is 12 files, ~700 lines, and
carries zero monorepo conflicts.** That is the whole clean core, and it unblocks everything
except the four conflicted layout/blog files and the five gate-blocked calculators.

---

## 9. Open questions this brief raises for the plan

Not guesses. Recording them per CONTEXT §7 discipline.

1. **The calculator result gate is one decision, not five files.** Porting any one of the five
   calculators takes `ResultGate` and drops `CalcResultCta`. Owner has not validated soft-gating
   (CONTEXT §7). Until he does, all five calculators plus `PremiumCalculator` are BLOCKED.
2. **`ui/layout-utils.ts` cannot be ported incrementally.** It restyles the six pages the designer
   never saw. Does the owner want those six re-skinned in the same pass, or a temporary split?
3. **`PremiumUpgrade`'s `mobileFallback="link"`** removes a `MiniCapture` from calculator pages on
   mobile. That is a lead-capture surface being deleted. It was shipped from the
   `mobile_tool_capture` experiment. Needs a data check before it goes.
4. **The Double Wired Creative footer credit** is live in the designer's `SiteFooter.tsx:134-140`.
   Already on the owner's list; it will arrive attached to a file we otherwise want.
5. `calculators/CalculatorLinkCards.tsx` is NEW, complete and imported by nothing in the
   designer's `app/`. `[INFERRED]` staged for a service-page section they did not finish. Port it
   or drop it — no evidence either way.

---

## 10. Files I did not open

For honesty about coverage: I read the full text of the leaf primitives, all NEW `property/*`
signatures and doc comments, the complete diff of the 22 token-sweep files, both versions of
`ui/layout-utils.ts`, the real `packages/web-shared` exports map, and the six real shared modules
in §7. I did **not** read in full: `support/SpecialistWidget.tsx` (818 lines),
`forms/MiniCapture.tsx` (751), `calculators/premium/PremiumCalculator.tsx` (668),
`blog/BlogPostRenderer.tsx` (490), `layout/SiteHeader.tsx` (357),
`research/LandlordIndexCharts.tsx` (354), `ui/chart.tsx` (374). For those seven I worked from
their import lists, diff stats and diff hunks. Any claim about their internals above is drawn
from the diff, not from a full read.
