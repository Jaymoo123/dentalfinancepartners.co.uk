# PORT BLUEPRINT — SLICE 1: CHROME, HOMEPAGE, BLOG SUBSYSTEM

Trade Tax Specialists (`construction-cis/web`) to the Property standard. Binding spec: `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §A (tokens, A.1 colour, A.8 floors), §B header contract, §C footer contract, §D.2/D.3 capture + CTA rules, §E component inventory, §F.1/F.2/F.3/F.4 templates, §I copy rules; `docs/property/DESIGN_SYSTEM.md` §0, §2, §4, §4e, §5, §7, §7a, §9; traps T1-T27 (`docs/_engines/DESIGN_PORT_PLAYBOOK.md` §6 + §14). Binding site inputs: `BRAND_LAYER.md`, `LIVE_DEFECTS.md` (TD-nn), `FUNNEL_BASELINE.md`, `link_baseline.json`, `sweep_baseline.json`. Investigated 2026-09-11 with every source file opened on both sides, and every `data-cta` triple read off the running production server at `http://localhost:3177`.

**Sizing, stated up front because it governs the work packages.** Post-bot-gate 19 days: blog articles = 110 of 203 sessions (54%), 42 form views, 1 form start, 0 completions (`FUNNEL_BASELINE.md` §B table, line 169). Homepage = 4 sessions (line 177). So the blog subsystem carries effectively all of this slice's traffic and all of its upside; the chrome carries all 203 sessions; **the homepage carries almost none and is rebuilt because it is the brand's front door and F.2 requires it, not because it converts.** WP-1/WP-2 (chrome) and WP-4/WP-5 (blog) are where the money is. WP-3 (homepage) is last.

**Standing conversions applied in every row below** (stated once, not repeated):
- Brand ramp: `orange-*` literals become `primary-*` (`#f97316` IS orange-500 exactly, `BRAND_LAYER.md` §1). Button/text grounds move off the 500 step: `btnPrimary` ground → `var(--btn-ground)` = primary-700 `#c2410c` (white label 5.18 PASS; orange-500 measures **2.80 FAIL**, live on every page, §2.2). Orange as TEXT on light → primary-700 (5.18); `--accent-strong` `#ea6c07` (3.16 FAIL) → primary-700. Orange on navy → primary-300/400.
- Warning/duty semantics never use the brand: the 4-step T-W1 ladder red-600 / pink-700 / blue-700 / indigo-900 with on-dark twins red-400 / pink-400 / blue-400 / indigo-300, plus `--form-error` red-700 (`BRAND_LAYER.md` §4.3, §5.2). NET-NEW; no existing usage is re-coloured by it in this slice.
- Radius: `rounded-xl` = 4px is the only card/button radius once `globals-standard.css` is imported (it supplies `--radius-xl` and `--btn-radius`, absent today, so `rounded-xl` currently renders Tailwind's 12px default). Trade's square idiom (`btnPrimary` has no radius class) and its `rounded-lg`/`rounded-2xl` instances are A.2 defects.
- Grounds: single dark ground = `slate-900` (`--dark` is mislabelled `#1e293b` = slate-800, and is written as a literal in 55 places plus 22 `bg-neutral-900`; `BRAND_LAYER.md` §6.2). Light oscillation white / `#fafaf9`; cream `#fafaf7` kept and tokenised `--hero-cream`. Navy never touches navy (DS §9).
- Spacing: `sectionY` `py-16 sm:py-20 lg:py-28` → canonical `py-12 sm:py-16 lg:py-20`; `sectionYLoose` retires; blog/hub sections `py-16 sm:py-20`.
- Fonts: Geist Sans + Geist Mono KEPT (`BRAND_LAYER.md` §6.3). Body line-height 1.7 → 1.6; headings 600 → 700; heading `line-height: 1.2` moved OUT of `@layer base`. Mono is for figures only.
- Copy: no em-dashes (slice-1 routes measure **0** today, `sweep_baseline.json.dashes`; keep it at 0). No pricing. No claim of clients served, advised or counted (§I; DS §10) — this bites the homepage, see §B rows 5 and 10.
- Anchors: every CTA target div carries `scroll-mt-24` (TD-22: 30 anchor targets have no offset under a `sticky top-0` header).

---

## A. SITE CHROME

### A.1 SiteHeader.tsx (199 lines, client, nav at `lg:`, burger `lg:hidden`, drawer `md:hidden`, cream bar)

| # | New (standard classes) | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Bar `sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm` + `paddingTop: max(0px, env(safe-area-inset-top))` | `SiteHeader.tsx:59-60` cream `bg-[#fafaf9]/95 backdrop-blur` | ADOPT-STANDARD | §B exact; translucent cream over a white body reads as a seam, and the `supports-[backdrop-filter]` fallback gives two different bar colours | none |
| 2 | Inner `siteContainerXl flex min-h-[3.25rem] sm:min-h-16 items-center justify-between gap-3 sm:gap-4 py-3` | `:62` `siteContainerLg` + `min-h-14` | ADOPT-STANDARD | header bar is the one `max-w-7xl` surface (A.4); `siteContainerXl` does not exist in `layout-utils.ts` today and is NET-NEW there | add `siteContainerXl` export |
| 3 | Nav list `hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1`; item `px-3 py-2 text-sm font-bold border-b-2 xl:px-4`; active `border-primary-600 text-primary-700`; idle `border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300` | `:65-80` `gap-4 lg:flex xl:gap-6`, `text-sm font-medium`, active `text-orange-600`, no underline rail | ADOPT-STANDARD | active state currently orange-600 as text on the cream bar = **3.41 FAIL** (`BRAND_LAYER.md` §3.1 table); primary-700 = 4.96 PASS. Rail gives the state a non-colour carrier | none |
| 4 | Burger `h-12 w-12 touch-manipulation rounded-xl border-2 border-slate-200 bg-white lg:hidden` | `:105` `h-11 w-11`, `border`, square | ADOPT-STANDARD | 44px under the 48px primary floor (A.8) | none |
| 5 | Drawer wrapper `fixed inset-0 z-50 **lg:hidden**`; scrim `bg-slate-900/50 backdrop-blur-[2px]`; panel `absolute right-0 top-0 h-[100dvh] w-[min(20rem,92vw)] border-l-4 border-primary-600 bg-white shadow-2xl` | `:118` wrapper is **`md:hidden`** while the burger that opens it is `lg:hidden` (`:105`); panel `w-[min(22rem,92vw)]`, no brand border | ADOPT-STANDARD | **live defect, rendered-DOM verified**: between `md` and `lg` the burger is visible and the drawer it opens is `display:none`, so the nav is unreachable at 768-1023px. Exactly the 08-23 breakpoint-collision class (DS §7a) | none |
| 6 | Drawer items: active `border-l-4 border-primary-600 bg-primary-50 text-primary-900`; groups `ml-4 border-l border-slate-200`; group labels `text-[11px] font-bold uppercase tracking-wider text-slate-500` | `:157-168` `border-b` per item, active `text-orange-600` | ADOPT-STANDARD | §B drawer contract; orange-600 text on white = 3.56 FAIL | flat nav, so group machinery is dormant until §A.8 |
| 7 | Drawer close `h-11 w-11 rounded-xl border-2` | `:144` `h-10 w-10 border` | ADOPT-STANDARD | §B exact | none |
| 8 | Mono orange "Menu" eyebrow | `:139-141` `font-mono ... text-orange-600` | RETIRE | mono is reserved for figures (A.3); orange-600 on white 3.56 FAIL | header row keeps close + wordmark |
| 9 | Primary CTA `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm **lg:inline-flex**`, id/placement/goal UNCHANGED | `:93-101` `sm:inline-flex`, `text-xs`, `px-5` | ADOPT-STANDARD | `sm:` is the exact incident breakpoint (DS §7a): the CTA appears 2 bands before the burger leaves, crowding the wordmark. `text-xs` is below the §B box | **id stays `header_nav_primary`, placement `header`, goal `contact` — see §D** |
| 10 | Secondary "Contact" at `xl:` only + nav's own Contact item `xl:hidden` | `:83-92` already `xl:inline-flex`, but the whole block is inside `{activeCta.header_secondary ? ...}` and `cta.variants.leadgen` has NO `header_secondary` | KEEP | rendered-DOM verified: **never renders** under the live `leadgen` variant (TD-23). Duplicate-Contact defect therefore does not exist here. Keep the branch, add the `xl:hidden` guard so it is correct if the variant flips | no id change |
| 11 | Nav from `niche.config.json navigation[]` via `getActiveNav(niche)` | `:13` | KEEP | already config-driven and correct | see §A.8 for the IA change |
| — | `focusRing` `outline-orange-600` | `layout-utils.ts:14-15` | KEEP | 3.56 passes the 3:1 graphics floor (`BRAND_LAYER.md` §5.1) | rename token to primary-600 only |

### A.2 SiteFooter.tsx (88 lines, LIGHT `bg-[#fafaf9]`, 13-item thirds-split, Union Jack strip)

| # | New (standard classes) | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | `relative overflow-hidden bg-slate-900 text-white` + `<TradeBackdrop/>`; `siteContainerLg relative z-10 py-12 sm:py-16`; `grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16` | `SiteFooter.tsx:17,29-30` light cream `border-t`, `md:grid-cols-[1.4fr_1fr_1fr_1fr]`, `pt-16 pb-10 sm:pt-20 sm:pb-12` | ADOPT-STANDARD (**= GATE 3**) | §C exact. Trade's footer is the estate's only light one; the flip is what makes "navy never touches navy" (DS §9) a real constraint on every page tail, and `BRAND_LAYER.md` §6.2 flags it as undecided | GATE: owner signs the ground flip before any page tail is re-grounded |
| 2 | Left: footer-variant wordmark (HardHat primary-400 + rule, white text) + `siteConfig.description` in `max-w-md text-sm text-slate-300` | `:32-40` mono legalName eyebrow + name + description | ADOPT-STANDARD | §C; the mono orange eyebrow is a retired idiom and measures 3.41 on `#fafaf9` | footer currently has NO wordmark (`BRAND_LAYER.md` §6.5) |
| 3 | Right `<nav aria-label="Footer"> grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4`, columns DERIVED: Services = children of `/services`, Resources = `/blog` + `/glossary` + `/research`, Calculators = first tool of each of the first 5 registry categories + "All calculators", Company = About / Contact / Locations / Book. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` | `:10-14,51-66` `Math.ceil(links.length/3)` thirds-split of the flat `siteConfig.footer`, no headings | ADOPT-STANDARD | §C; a flat split goes stale silently and a blind `slice` reorders columns whenever the array changes length. Derivation renders only routes that exist. Raises, never lowers, the footer link count (T14 safe: every route's floor is chrome-dominated, see §F) | nav prop threaded from `PageShell` so header and footer cannot drift |
| 4 | Legal row `mt-10 pt-6 border-t border-white/10 space-y-4`: Privacy / Terms / Cookies at `text-xs text-slate-400`, `legalDisclosure`, `© {year} … t/a …`, `ConsentToggle` | `:69-84` | ADOPT-STANDARD + KEEP payload | §C. Two fixes ride along: `--ink-whisper`/`text-neutral-400` on `#fafaf9` = **2.42 FAIL** (`BRAND_LAYER.md` §5.3) becomes slate-400 on navy (ratio comfortable), and the duplicate "Specialist CIS accountants. Editorial content only." sentence at `:77-79` folds into `legalDisclosure` | no wording change to consent (T19 carve-out) |
| 5 | "Proudly British" strip + `UnionJack` | `:18-28`, `UnionJack.tsx` | KEEP-PAYLOAD-RESTYLE | owner-visible brand asset, not a Property concept; keep it as the footer's top hairline row restyled to navy (`border-b border-white/10`, copy `text-xs text-slate-400`). The SVG itself is correct and `role="img" aria-label` is right here (T16 applies to value-bearing charts, not flags) | the duplicate homepage strip is handled in §B row 12 |
| 6 | Inline "Contact us" orange link | `:41-48` `text-orange-600` on `#fafaf9` = **3.41 FAIL** | RETIRE | it duplicates the derived Company column; deleting it removes a failing link rather than re-colouring a redundant one | zero link loss (`/contact` is in the derived column and in the header) |
| — | `siteConfig.footer` flat array | `src/config/site.ts` | KEEP in config | still the Services/Resources source for derivation; it stops being rendered flat | |
| — | Designer credit | n/a | N/A (T27) | Trade runs a LOCAL footer and imports nothing from `web-shared/design` (`grep -rn "web-shared/design" construction-cis/web/src` = **0**), so the kit's followed outbound credit cannot arrive by accident. If §E's sourcing call ever changes, `showBuilderCredit={false}` | recorded, not actioned |

### A.3 PageShell.tsx (29 lines) + layout.tsx

| # | New | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | `/embed/` bare-children bypass, trailing slash exactly (`pathname?.startsWith("/embed/")`), `/embed` index keeps chrome | `PageShell.tsx:11-28` (no bypass) | ADOPT-STANDARD | live defect: `src/app/embed/[slug]/page.tsx` exists, so partner iframes currently get the full header, footer, StickyCTA and SpecialistWidget. Property's `PageShell.tsx:25-27` is the reference |
| 2 | `nav` prop threaded to `SiteHeader` + `SiteFooter` | `PageShell.tsx:20,24` | ADOPT-STANDARD | §C derived columns need it; Property `PageShell.tsx:15,37,41` |
| 3 | Skip link focus ground `focus:bg-primary-700` | `:16` `focus:bg-orange-500` | ADOPT-STANDARD | white on orange-500 = 2.80 FAIL (`BRAND_LAYER.md` §5.3) |
| 4 | `StickyCTA` moved OFF `PageShell` and mounted on `app/page.tsx` only | `:25` site-wide mount | GATE (**= GATE 4**) | Property mounts it on the homepage only (`Property/web/src/app/page.tsx:227`). But Trade's homepage gets 4 sessions / 19 days, so a homepage-only mount is a de-facto removal of the bar from 203 sessions. Recommend: keep the site-wide mount on THIS site as a sanctioned deviation, and take the id fix in §A.5. Owner decides |
| 5 | `SpecialistWidget`, `ReturningBar`, `DeepScrollModal`, `IntentProvider`, `AnalyticsProvider`, `ConsentProvider` | `PageShell.tsx:26`, `layout.tsx:92-104` | KEEP | D.2 "port all, add none"; `deep_scroll_close` is the site's **busiest** live CTA (14 window clicks, `FUNNEL_BASELINE.md` §C) and `specialist_widget` is live. No threshold or cadence may change (standing rule) |
| 6 | A.7 `<noscript>` `data-draw="off"` release block | absent (`grep noscript src/app/layout.tsx` = 0) | NET-NEW | load-bearing for every draw-on-scroll kit component this port lands (EyebrowRule, DrawnTickList, ProcessTimeline) |
| 7 | `@import "@accounting-network/web-shared/design/globals-standard.css"` after `tw-animate-css`, before `:root` | `globals.css:1-4` | NET-NEW | supplies `--radius-xl` (4px), `--btn-radius`, glow + motion rules. Without it the first kit button renders as a 9999px pill beside Trade's square ones (`BRAND_LAYER.md` §6.4) |

### A.4 Wordmark (BrandWordmarkHomeLink.tsx, 33 lines)

| # | New | Replaces | Verdict | Why |
|---|---|---|---|---|
| 1 | §B two-line lockup: HardHat icon + `TRADE TAX SPECIALISTS` `text-[0.65rem] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em]` / 2px primary rule / `CIS ACCOUNTANTS` `text-[0.6rem] sm:text-[0.65rem] tracking-[0.32em] sm:tracking-[0.38em]`; cap `max-w-[13rem] sm:max-w-none`; `size="footer"` one step larger | `:19-30` bare `h-7 w-7` orange-500 square + one line `text-sm sm:text-base font-semibold` | ADOPT-STANDARD (**= GATE 1**) | §B exact; `BRAND_LAYER.md` §6.5 proposes the icon and the descriptor and both are BLOCKER/PROPOSED rows in its §10 |
| 2 | Icon `text-primary-600` on light (3.56, graphics floor), `text-primary-300` on navy (8.67); wordmark TEXT never orange | `:20` orange-500 block | ADOPT-STANDARD | `BRAND_LAYER.md` §3, §5.1 |
| 3 | `aria-label` = the visible strings | `:16` `${name} · ${tagline}` | KEEP | already WCAG 2.5.3-correct; diff before replacing (`BRAND_LAYER.md` §6.5). The tagline must not survive into the label once line 2 is "CIS ACCOUNTANTS" |

### A.5 StickyCTA.tsx (176 lines) — the attribute anomaly

| # | New | Replaces | Verdict | Why |
|---|---|---|---|---|
| 1 | `data-cta="sticky_cis_refund"` ADDED alongside the existing `data-cta-id`, plus `data-cta-placement="sticky"`; keep `data-cta-goal` and `data-cta-variant` as-is | `StickyCTA.tsx:147-149` `data-cta-id` only, no placement | ADOPT-STANDARD (id = GATE, **= GATE 5**) | `vw_cta_performance` reads `data-cta`, so this button has been invisible to CTA analytics for its whole life: `FUNNEL_BASELINE.md` §C lists all 8 ids the database has ever seen and `sticky_cis_refund` is not among them — a grep-verified zero, not a thin count. **Adding** the attribute cannot split history (there is none); **renaming** `data-cta-id` would break nothing measured but is not needed. Recommend add-not-rename, keeping the id string byte-identical |
| 2 | Dismiss `<button>` gains `data-cta="sticky_cis_refund_close" data-cta-placement="sticky"` | `:157-161` no attributes | NET-NEW | D.3 canonical pair; `returning_bar_close` and `deep_scroll_close` already instrument their closes on this site, so the bar is the odd one out |
| 3 | Bar ground `bg-slate-900`, button `${btnPrimary}` on `--btn-ground` | `:131,151` | KEEP-PAYLOAD-RESTYLE | already slate-900 (correct under §6.2); only the button ground moves (2.80 → 5.18) |
| 4 | Intent personalisation, thresholds, session suppression | `:68-116` | KEEP | richer than the kit version; no cadence change permitted |

### A.6 Breadcrumb.tsx (84 lines)

| # | New | Replaces | Verdict | Why |
|---|---|---|---|---|
| 1 | Chevron `text-slate-500`, light-variant link hover `hover:text-primary-300`, default hover `hover:text-primary-700` | `:26-34` `hover:text-orange-700` (5.18, fine) / `text-neutral-300` chevron (1.7 on white) | KEEP-PAYLOAD-RESTYLE | §E: chevron slate-500; neutral-300 is below the 3:1 graphics floor |
| 2 | Emits its own `BreadcrumbList` JSON-LD | `:21,38-41` already does | KEEP | correct as shipped. Every consumer must therefore NOT also emit one — checked: `/blog`, `/blog/[category]` and `BlogPostRenderer` each render `<Breadcrumb>` exactly once and emit no page-level copy. No duplicate to fix in this slice |

### A.7 TradeBackdrop.tsx — NET-NEW

| # | New | Verdict | Why |
|---|---|---|---|
| 1 | `src/components/layout/TradeBackdrop.tsx`: setting-out / scaffold grid, ~26 SVG lines, `aria-hidden`, `absolute inset-y-0 right-0 w-[55%] hidden sm:block`; navy `stroke-primary-300` opacity .18 mask `to left, black 35% → transparent 92%`; cream `stroke-primary-600` opacity .10, 45%/97%. Host `relative overflow-hidden`, content `relative z-10` | NET-NEW (**= GATE 2**) | Trade has no SVG backdrop; two CSS keyframes only (`globals.css:152-169`). Geometry, strokes and the rejected-motif audit are fixed by `BRAND_LAYER.md` §6.6; the subject is a BLOCKER/PROPOSED row in its §10. Consumers in this slice: footer, homepage hero, `#book`, blog `#enquiry-form`, hub heroes |

### A.8 Nav IA (`construction-cis/niche.config.json → navigation[]`, 7 flat items)

| # | New | Replaces | Verdict | Why |
|---|---|---|---|---|
| 1 | Keep all 7 labels and hrefs | `navigation[]` | KEEP | "Content, URLs and forms stay." 7 items fit the §B bar; nothing is orphaned |
| 2 | Calculators becomes a click-toggled grouped dropdown built server-side by `buildPrimaryNav()` from the tool registry, with a self-referential "All calculators" first child; panel `w-[38rem] max-h-[70vh] columns-2 rounded-xl border bg-white p-4 shadow-lg` | flat `<Link href="/calculators">` | ADOPT-STANDARD | §B: never hand-list calculators, and the same prop feeds the footer's Calculators column. Trade has zero dropdowns today, so there is no hover-only trigger to fix (the tablet-hover defect that bit generalist does not reproduce here) |
| 3 | Active-state: top-level PREFIX, dropdown/drawer children EXACT | `SiteHeader.tsx:67,155` prefix on both | ADOPT-STANDARD | §B, guarded by the kit `nav-active-state` test. Latent today (no children), load-bearing after row 2 |

---

## B. HOMEPAGE (`src/app/page.tsx`, 627 lines)

**Trade has 15 sections today** (`:166, 222, 236, 245, 252, 283, 304, 347, 363, 403, 445, 466, 483, 566, 600`). They map onto F.2's 15-16 as: 5 ADOPT in place, 4 merge down to 2, 3 RETIRE, 4 NET-NEW. Final render order, 16 sections:

1. `<StickyCTA/>` first child **only if GATE 4 resolves "homepage-only"**; otherwise it stays in `PageShell` and this slot is empty.
2. JSON-LD set. Today only `buildFaqJsonLd(faqs)` (`:162`) on a 15-section homepage. ADD WebPage, AccountingService, Service, BreadcrumbList (Organization + WebSite are site-wide). Same-array rule already holds: `faqs` feeds both the schema at `:163` and the render at `:571` (T17 satisfied, verified).
3. NAVY MOTIF HERO `relative flex items-center py-10 sm:py-12 lg:py-14 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-slate-900` + `<TradeBackdrop/>`, content `relative z-10 max-w-3xl`. Replaces `:166-174` — a **hotlinked Pexels photo at `w=2000`** behind a `from-neutral-950/97` gradient, i.e. a third-party hotlink and an LCP image on the site's front door, reduced to 3% visible by its own scrim. h1 KEEPS its copy, classes → `text-3xl leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl` (`:181`). Standfirst `mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/90` (`:187`). `.section-label` eyebrow (`:178`) → `<Eyebrow onDark>`: its ground is `--btn-ground` after the token swap, which fixes all **38** `.section-label` usages in one line (7 of them on this page).
4. Hero CTA row: `<HeroOffer fallback=…>` KEEP (`:190-197`, client intent slot, `data-cta="hero_cta"`); "Gross payment status" secondary → `${btnOnDark}` (`:198-203`); the third link KEEPS `data-cta="hero_primary" / hero / lead` and becomes the `${btnPrimary}` primary pointing at `#book` instead of `/contact` (§D row 2). 5 trust badges replace the single `:210-213` line, sourced from existing claims only: "Fixed fees, agreed before we start" / "CIS specialists only" / "Plain English, no jargon" / "UK-based, UK-regulated" / "One named accountant". **"24-hour response" is excluded here and everywhere on this page: TD-13 and TD-14 catalogue it as an unevidenced guarantee contradicted by "one working day" elsewhere.**
5. STATS STRIP `border-b border-slate-200 bg-white py-5 sm:py-7` + kit `StatsCounter`, MERGING the two duplicate proof bands: the hand-rolled navy `keyStats` grid (`:222-233`, and its `font-mono` figures are correct per A.3) and the shared `StatsBar` (`:245-249`). **T15 does NOT reproduce**: `StatsBar` is a server component printing literal strings — verified, do not "fix" it; the kit `StatsCounter` must SSR its true value. MANDATORY copy fixes before this renders: drop `"24h / Response guarantee"` (`:46`, TD-13) and `"57+ CIS guides and articles"` (`config/service-tiers.ts:64,70`, TD-29).
6. `ProblemStatement` + `PromptMarquee` on `#fafaf9`, mirrored LOCALLY (T12: the kit component hardcodes Property's landlord copy with no copy props; never edit the kit). Replaces the `painPoints` card grid (`:283-301`) whose four bodies are the argument already written, reduced to 4 prose cards with an orange left rule.
7. `WhoWeAre` — NET-NEW band, lifted into a local `MarketingSections.tsx` so `/contact` shares it (§E; DS §4c). Trade has no "who we are" band on the homepage at all today.
8. `WhyChooseUs` — the "Why specialist matters" argument (`:403-417`) re-set as Eyebrow + h2 + Prose + `DrawnTickList` (`tickClassName` REQUIRED on light, §E). **Copy GATE 6**: `:414` "every week across a large CIS client base" is a client-base claim, banned by §I / DS §10 and the same family as TD-10 and TD-12.
9. SERVICES GRID on `bg-primary-50/60`, 6 glow cards `rounded-xl border border-primary-100 bg-white p-6` + icon badges `h-14 w-14 rounded-xl bg-[var(--btn-ground)]`. Restyles `:304-344` in place; all 6 hrefs and the "View all services" link KEPT (link floor).
10. `ServiceTiers` KEEP with **`featuredBadge=""`** — `:358` passes `featuredBadge="Most Popular"` on a site that publishes no pricing. T13: dropping the prop would leave the shared default rendering, so it must be passed empty, which suppresses the badge and keeps the featured tier's emphasis. "Most Popular" is an aggregate claim about client behaviour and is banned (§I). **Sibling noted, not touched: `src/app/services/page.tsx:179` passes the same string — slice 2.**
11. TRADE VERTICALS band, navy → `bg-slate-900` + backdrop, cards `bg-white/5 ring-1 ring-white/15`, solid-orange pill (`:367`) → `<Eyebrow onDark>`. **KEEP ALL 45 LINKS: `:381-396` renders 45 of the 47 `data/trade-types.ts` slugs and they are 45 of the homepage's 59 unique internal links (both grep-verified). T14 — this band is the floor.** Plus the "See all trade types" link (`:399`).
12. WhatWeCover — the `comparisonRows` table (`:419-440`) re-set as the kit `ComparisonTable` figure (stacked `<md`, `min-w-[36rem]` in `overflow-x-auto`, our column primary-edged) + `ExampleFigureNote` (mandatory on every figure, §E). Mirror locally, T12. The navy table header (`:425`) → slate-900.
13. `#calculators` white + `CalculatorTabs` (explicit HOME_TABS literal) + a literal `<a href="/calculators/…">` then "See all N calculators" `data-cta="home_calculators_all"`. NET-NEW: the homepage has no calculator surface today and `CalculatorTabs` emits no crawlable link, so the literal anchor is required (DS §0.6).
14. `TestimonialsSection` navy, mirrored locally. The three quotes at `:49-65` are KEEP-PAYLOAD — they are already anonymised trade+region with no names — **but `:104` "Composite snapshots based on patterns across our CIS clients" and the h2 "What we have done for CIS subcontractors" are client-outcome claims (GATE 6 again).** `highlight` must appear verbatim in `quote` if used.
15. LATEST INSIGHTS `bg-slate-50` `divide-y` row list, 3 posts + View-all, replacing the copy-only "Blog CTA" band (`:600-625`). NET-NEW crawl links from the site's highest-authority page into the 83-post corpus; the existing `/blog` and `/cis-refund` links are preserved inside it.
16. `#book` NAVY CLOSING `scroll-mt-24` + backdrop, `grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`: Eyebrow onDark, h2, the 4 proof rows (`:528-545`) with `h-12 w-12 rounded-xl` check badges, white `rounded-xl p-6 sm:p-8 lg:p-10` card holding `<LeadForm submitLabel="Request a callback"/>`. Restyles `:483-563` in place, which is already the right anatomy; ground `#1e293b` → slate-900, and the packages branch keeps `home_cta_primary/secondary` untouched (§D rows 6-7). **LeadForm ground re-verified rendered: it sits on the white card, labels `text-neutral-900` — the invisible-label bug does not reproduce (D.1).**
17. FAQ white, last (keeps the navy `#book` off the navy footer, DS §9). Hand-rolled `<details>` (`:566-597`) → kit `FaqSection` on the SAME `faqs` array that feeds `:163`. The `<details>` idiom is crawlable today, so this is a style adoption, not a crawl fix — and the kit accordion must not reintroduce T8 (`hidden` is the attribute to verify).

RETIRED: the intro strip (`:236-242`, one paragraph that restates the hero standfirst); the mid-page image break (`:445-463`, a second hotlinked Pexels photo carrying 2 sentences and no link); the homepage "Proudly British" strip (`:466-479`, the identical asset renders in the footer on every page, §A.2 row 5 — **this is the one duplicate of the pair to cut**).

---

## C. BLOG SUBSYSTEM — 54% of all sessions, 1 form start, 0 leads

### C.1 BlogPostRenderer.tsx (341 lines, 83 articles)

New reading order (F.3), keeping Trade's 3-moment capture split, which is ahead of Property and must not be flattened:

| # | New | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | `ReadingProgress` (kit) | `:12,69` already kit | KEEP | conforming |
| 2 | `<article bg-white py-12 sm:py-16>` → `siteContainerLg` → `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12` | `:165-167` | KEEP | already the F.3 grid verbatim |
| 3 | HEADER CARD `rounded-xl bg-slate-50 p-8 mt-6` on white: Eyebrow = category, h1 `text-3xl sm:text-4xl md:text-5xl`, meta pills (`inline-flex min-h-7 rounded-full bg-white px-3 py-1 text-xs font-semibold ring-1 ring-slate-200`, Updated pill primary-tinted), summary `mt-5 text-base leading-7 text-slate-600` | `:81-163` a **420-520px photo hero** with `blur-[2px] scale-105` image, a `from-slate-950/95` scrim and the breadcrumb inside it | ADOPT-STANDARD | the single largest change in the slice by traffic: a half-viewport deliberately-blurred LCP image above the fold on the surface carrying 54% of sessions. `post.image` becomes an in-body `rounded-xl` figure; the photo-credit block (`:129-162`) moves with it, keeping `rel="noopener nofollow"` |
| 4 | Breadcrumb on white, default variant, category href keyed on `categorySlug` | `:97-105` light variant inside the hero, already keyed on `categorySlug` | KEEP-PAYLOAD-RESTYLE | keying is already correct (Property's 57-post raw-frontmatter bug does not reproduce) |
| 5 | Skip link `data-cta="blog_skip_to_form"` → `#enquiry-form` | absent | NET-NEW | F.3; there is no in-page route to the ask today at all |
| 6 | Mobile TOC (kit) | `:214-216` | KEEP | conforming |
| 7 | keyTakeaways box KEPT VERBATIM as the `#answer-box` GEO surface, restyled from `rounded-lg border-l-4 border-orange-500 bg-orange-50` to the standard card + `EyebrowRule` | `:191-212` | KEEP-PAYLOAD-RESTYLE | content carve-out; `text-orange-700` on orange-50 is the one orange-on-tint pairing that passes, so only radius and rule change |
| 8 | Author + sources-verified block demoted to header-card pill + end aside | `:169-189` top-of-article block pushing the answer down | ADOPT-STANDARD | F.3 puts the answer first; E-E-A-T is preserved twice |
| 9 | `.prose-blog` body with the 3-moment injection logic UNCHANGED (`splitContentEarly` → `ToolIsland` → `splitRemainderForGate` → `InlineMiniLeadForm` + `PremiumUpgrade`; else `splitContentAtMidScroll`) | `:218-261` | KEEP | this is the site's best capture architecture and it is not the defect: 42 form views prove the blocks render and are seen (`FUNNEL_BASELINE.md` §B). Restyle only: `.prose-blog a` colour `#ea6c07` → primary-700 (3.16 → 5.18 FAIL→PASS, site-wide on every article link), h2 4px primary left border, 17px/1.75/65ch |
| 10 | `<section id="enquiry-form" class="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" aria-labelledby="enquiry-form-heading">` + backdrop, white `mt-8 rounded-xl bg-white p-6 sm:p-8` card holding `<LeadForm redirectOnSuccess={false}/>` | `:297-307` `border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white rounded-2xl`, **no id, no `scroll-mt`, no `aria-labelledby`** | ADOPT-STANDARD | the mechanism behind 42 views / 1 start: nothing on the page can link to this block, and its h2 is `text-orange-900` on an orange tint. D.3 requires the anchor + `scroll-mt-24` |
| 11 | Per-category CTA copy map `CTA_BY_CATEGORY` keyed on the `slugifyCategory` output, 8 keys, falling back to `getActiveCta(niche).blog.*`; guard test asserts every category has a key | `:25,299-305` ONE generic block for all 8 categories, copy from `niche.config.json` | NET-NEW | F.3. The single copy is the refund pitch; it is served to `software-and-tools` and `vat-and-mtd` readers unchanged. Keys: `cis-basics`, `cis-refunds`, `cis-compliance`, `cis-advanced`, `limited-company`, `expenses`, `vat-and-mtd`, `software-and-tools` (grep-verified from `link_baseline.json`) |
| 12 | Kit `FaqSection` + `buildFaqJsonLd` on the same array | `:263-277` hand-rolled `<dl>`, schema from the same `post.faqs` at `:45-46` | ADOPT-STANDARD | same-array rule already holds (T17 satisfied); verify `hidden`, not answer presence (T8) |
| 13 | Author aside `rounded-xl` with a reviewer branch when both reviewer fields are present | `:279-293` | KEEP-PAYLOAD-RESTYLE | `rounded-lg` → `rounded-xl`; `text-orange-600` eyebrow on `bg-neutral-50` = 3.41 FAIL → primary-700 |
| 14 | Kit `RelatedArticles` (the only article-card grid, §E) | `:309-328` bespoke `border-l-4` row list | ADOPT-STANDARD | E; link count unchanged (same `related` array) |
| 15 | SIDEBAR: ONE `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` wrapper holding `BlogSidebarCta` (navy `rounded-xl bg-slate-900 p-6`, anchors `#enquiry-form`, headings as `<p>` so they stay out of the TOC, `data-cta="blog_sidebar_book"`) then `TableOfContents` | `:331-335` TOC only, `sticky top-24` unclamped | ADOPT-STANDARD | F.3 / §E. Same `CTA_BY_CATEGORY` object as the form so they cannot drift |
| 16 | `NextStepOffer` | `:295` | GATE (**= GATE 7**) | a second closing offer immediately above the form, and `next_step` is DORMANT: 1 click ever, 2026-07-14, 0 in the window (`FUNNEL_BASELINE.md` §C). Recommend RETIRE from articles, KEEP on `/for/[slug]` (its other consumer, `app/for/[slug]/page.tsx:206`, slice 3). Owner decides |

### C.2 /blog index (`app/blog/page.tsx`, 103 lines; 2 CTAs, 34 links)

1. Navy motif hero (min-h 300/350) replacing `:40` `bg-neutral-900` (the second dark ground, §6.2) + breadcrumb + CTA row `#book` / `#articles`. `font-semibold` h1 (`:52`) → `font-bold` per A.3.
2. Category band: 8 cards (`:61-87`) → 48px `rounded-xl border` chips on `#fafaf7`, merged into ONE filter band with the search/sort row.
3. Library: kit `BlogListWithSearch` (projected item type) + `HubArticleList` + `NumberedPagination`. **Two defects fixed here.** (a) `:31-34` spreads `{...p}` into a client component for all 83 posts, shipping every post's full `contentHtml` into the flight payload; the projected type is `{slug,title,summary,category,categorySlug,date,readTime}`. (b) `BlogListWithSearch.tsx` **slices** (`paginatedPosts`) behind `<button>` pagination, so 71 of 83 articles are absent from the server HTML of the site's main index — DS §4e: hide with the `hidden` attribute, never `slice()`, guarded by a crawl-path test. Fixing (b) RAISES `/blog` well above its floor of 34.
4. `#book` `LeadCTAPanel` NET-NEW. Highest-traffic non-article route in the slice with zero capture today.
5. `CollectionPage` + `BreadcrumbList` JSON-LD — the latter already comes from `<Breadcrumb>`; add `CollectionPage`.

### C.3 /blog/[category] x8 (`app/blog/[category]/page.tsx`, 99 lines; floors 16-26)

Becomes a data-only page over the kit `BlogCategoryHub` (F.4):
1. Cream motif hero (`--hero-cream` + backdrop) replacing `:59` `bg-neutral-900`; `{count} articles` eyebrow KEPT; CTA row `#enquiry-form` / `#articles`.
2. ESSENTIALS BRIEFING NET-NEW — the largest content deliverable in the slice: 8 hubs x 3-4 ruled sections (the duty / when it bites / what a contractor or subbie gets wrong / what we would look at). FT-plain, second person. Figures only if re-derivable from `house_positions.md` with a section reference. **This is where the T-W1 ladder first renders**: CIS300 deadlines = `--warn-1`, the 30% unverified rate and the 5% geared element = `--warn-2`, the fixed penalty ladder and GPS withdrawal = `--warn-3`, deliberate withholding = `--warn-4` (`BRAND_LAYER.md` §4.2 sources every tier to this site's own content).
3. Library `#articles scroll-mt-24` on `#fafaf9` via `HubArticleList` (12 visible, rest `hidden`). Filter at `:50` already uses `slugifyCategory(p.category) === category`, which is correct — the raw-label-equality bug does not reproduce. Add the guard that every post lands in exactly one hub.
4. `#enquiry-form` `LeadCTAPanel` with the same `CTA_BY_CATEGORY` entry as the articles in that hub, so hub and post always agree.
5. Other-topics tail LAST on `#fafaf9`, 48px chips, absorbing the bare "Back to all articles" link (`:90-94`).

### C.4 components/blog/*

| File | Verdict | Why |
|---|---|---|
| `BlogListWithSearch.tsx` (201) | RETIRE → kit `BlogListWithSearch` + `HubArticleList` + `NumberedPagination` | 2 importers, both in scope (`app/blog/page.tsx:7`, `app/blog/[category]/page.tsx:13`), grep-verified. The slice + full-spread payload defects are structural, not stylistic |
| `BlogPostRenderer.tsx` (341) | KEEP-PAYLOAD-RESTYLE, rewritten in place | 1 importer (`app/blog/[category]/[slug]/page.tsx:82`). Local, because the 3-moment injection is site-specific and ahead of the kit |
| `InlineMiniLeadForm.tsx` (25) | KEEP-PAYLOAD-RESTYLE | thin `MiniCapture` wrapper, a sanctioned D.2 surface; `className` → `my-12 rounded-xl bg-slate-50 p-6 sm:p-8` with the rule in primary-700 |
| `ToolIsland.tsx` (32) | KEEP-PAYLOAD-RESTYLE | pure server link card, no kit equivalent. `rounded-lg` → `rounded-xl`; button `bg-orange-600` (white label 3.56 FAIL) → `${btnPrimary}`; add `data-cta="blog_tool_island"` + placement so moment 1 stops being invisible to `vw_cta_performance` |
| `ExitIntentModal.tsx` (182) | DELETE | **zero importers** (grep across `construction-cis/web/src`: only comments in `SpecialistWidget.tsx:15,18,141` and `DeepScrollModal.tsx:43` reference it). D.2: deleted estate-wide 2026-07-09 on 162 shows / 0 leads; do not port, do not rebuild. Its `bfp_assistant_active` stand-down key is read by live code, so the KEY stays |

---

## D. `data-cta` PRESERVATION (T22 — the costliest trap in this slice)

Measured, not read: every row below was curled off `http://localhost:3177` on 2026-09-11 and cross-checked against `sweep_baseline.json.ctas` (**620 occurrences over 246 routes**, per-route 3 on 128 routes and 2 on 118). After the port every triple is byte-identical.

| id | placement before | goal before | placement after | goal after | == | evidence |
|---|---|---|---|---|---|---|
| `header_nav_primary` | `header` | `contact` | `header` | `contact` | YES | rendered on `/`, `/blog`, `/blog/cis-refunds`, `/blog/cis-basics/what-is-cis`. Goal is conditional on `href.startsWith("/contact")`; leadgen `header_primary.href` = `/contact` → `contact`. **Property renders `header_book` / `header` / `form` for the same button — adopting Property's id or goal is the T22 defect. Do neither.** |
| `hero_primary` | `hero` | `lead` | `hero` | `lead` | YES | rendered on `/` only. The href moves `/contact` → `#book`; the goal is a hardcoded literal `lead`, not derived, so the href change does not move it (`page.tsx:206`, verified) |
| `hero_cta` | (none) | conditional `form`/undefined | (none) | unchanged | YES | `HeroOffer.tsx:33-34`, client intent slot, renders only in the treatment arm. No placement today; **do not add one** — adding an attribute the view groups on would split its series |
| `specialist_widget` | (per widget) | (per widget) | unchanged | unchanged | YES | rendered on every route; LIVE (8 clicks all-time). Untouched by this slice |
| `next_step` | (none) | conditional | unchanged | unchanged | YES, if kept | `NextStepOffer.tsx:39`. GATE 7 decides keep/retire; a retire is a deliberate deletion of a DORMANT series (1 click ever), and D.3 requires it paired with a baseline restatement in the same commit |
| `header_nav_secondary` | `header` | `contact` | `header` | `contact` | YES (both unrendered) | `SiteHeader.tsx:87`. **Never renders**: `cta.variants.leadgen` has no `header_secondary` key (TD-23). Code-present, DOM-absent |
| `header_mobile_primary` | `header_mobile` | `contact` | `header_mobile` | `contact` | YES | `SiteHeader.tsx:176-177`. Drawer-only, so no SSR crawl sees it; read out of the shipped client bundle per T22 (`grep` over `/_next/static/chunks/*` → present). **Property renders placement `mobile_menu` here; Trade must keep `header_mobile`.** Renders only below `md` today because of the §A.1 row-5 defect; after the fix it renders below `lg`, which MOVES VOLUME from the desktop CTA to this one at 768-1023px — say so in the commit (§B analytics note) |
| `header_mobile_secondary` | `header_mobile` | `contact` | `header_mobile` | `contact` | YES (both unrendered) | `SiteHeader.tsx:187`, same missing-key branch as `header_nav_secondary` (TD-23) |
| `home_cta_primary` | `home_cta` | `lead` | `home_cta` | `lead` | YES (both unrendered) | `page.tsx:501`. Inside `{packagesMode ? …}`; `cta.variant` is `leadgen`, so **it does not render today** and must not start rendering (TD-24 family). The brief's inventory lists it as live; it is not |
| `home_cta_secondary` | `home_cta` | `contact` | `home_cta` | `contact` | YES (both unrendered) | `page.tsx:510`, doubly gated: packages branch AND `activeCta.home_cta.secondary`, which the packages variant does define but leadgen does not (TD-24) |
| `sticky_cis_refund` | **absent** (`data-cta-id`) | `form`/undefined | `sticky` | `form`/undefined | n/a — no history to split | `StickyCTA.tsx:147`. Zero rows in `web_events` ever (`FUNNEL_BASELINE.md` §C lists all 8 recorded ids; this is not one). See §A.5 row 1 |

**Could not verify against the running server:** `header_mobile_primary` (drawer state, verified from the client bundle instead, as T22 prescribes) and the four variant-gated ids above (`header_nav_secondary`, `header_mobile_secondary`, `home_cta_primary`, `home_cta_secondary`) — for those the verification is that they are ABSENT from the rendered DOM today and must remain absent. Every id that renders today renders with an identical triple after the port.

NET-NEW ids this slice introduces, none colliding with a recorded series: `blog_skip_to_form`, `blog_sidebar_book`, `blog_tool_island`, `home_calculators_all`, `sticky_cis_refund_close`. Per-route `data-cta` counts therefore RISE; the baseline is a floor.

---

## E. KIT-VS-LOCAL SOURCING

**Call: BUILD LOCAL for the chrome; consume the kit for primitives, marketing blocks and the blog list/hub machinery.** Reasons, in order. (1) T22: Trade's live CTA triples differ from the kit's defaults in id AND placement AND goal on the header's primary and mobile buttons, and the kit chrome is the exact component that flipped them on Solicitors; rebuilding locally to §B keeps the triples under this site's control instead of depending on a shared default. (2) T23/T5: the kit chrome has **two** importers (`generalist/web/src/components/layout/PageShell.tsx`, `Solicitors/web/src/components/layout/PageShell.tsx` — grep-verified, repo-wide) and Property is NOT one of them (Property runs `Property/web/src/components/layout/SiteHeader.tsx`, 458 lines). So "the kit default protects Property" is false, and any prop Trade would need added to the kit lands on a 2-consumer component mid-port, which is how Solicitors broke. (3) Trade keeps a warm neutral ramp while the kit hardcodes `slate-*` (`BRAND_LAYER.md` §6.1, sanctioned deviation A1); the chrome is the largest surface where that mix would be visible. (4) `grep -rn "web-shared/design" construction-cis/web/src` = **0** today, so nothing regresses by staying local, and T27's footer credit cannot arrive by accident.

- **ADOPT KIT (consume verbatim):** `page-blocks` (Prose / Eyebrow / InlineLink / CardStack), `EyebrowRule`, `ExampleFigureNote`, `FaqSection` + accordion, `NumberedPagination`, `SlimHero`, `NoticeCard`, `TopicSection`, `TopicHero`, `LeadCTAPanel`, `StatsCounter`, `CoverageCards`, `NumberedReasons`, `WhyUsList`, `DrawnTickList`, `ProcessTimeline`, `ScrollGlowGroup`, `RelatedArticles`, `TableOfContents` (already consumed), `ReadingProgress` (already consumed), `BlogSidebarCta`, `HubArticleList`, `BlogCategoryHub`, `BlogListWithSearch` (projected items only), `CalculatorTabs`, plus the four guard tests and `globals-standard.css`.
- **BUILD LOCAL (genuinely site-specific):** `SiteHeader`, `SiteFooter`, `PageShell`, `BrandWordmarkHomeLink`, `TradeBackdrop`, `BlogPostRenderer`, `MarketingSections` (new, shared by homepage + `/contact`, lifted never copied), `StickyCTA` (intent-personalised beyond the kit version), `InlineMiniLeadForm`, `ToolIsland`, `UnionJack`, `CTA_BY_CATEGORY`, and LOCAL MIRRORS of `ProblemStatement`, `ComparisonTable`, `TestimonialsSection`, `PromptMarquee` (T12: the first two hardcode Property's copy with no copy props; never edit the kit).
- **RETIRE:** local `BlogListWithSearch` (2 importers, both in scope), `blog/ExitIntentModal.tsx` (**0 importers**), `sectionYLoose` (3 importers in this slice: `app/blog/page.tsx:3`, `app/blog/[category]/page.tsx:4`), `btnOnTeal` (dead-brand fossil whose ground is `neutral-900`; `btnOnDark = btnSecondary` renders ink-on-navy and is replaced by the real A.5 recipe). T26: `btnOnTeal` and `sectionYLoose` keep aliased exports pointing at their survivors until every consumer outside this slice is swept.

---

## F. PER-ROUTE LINK FLOORS (`link_baseline.json`, 92 of 246 routes are in this slice)

| Route(s) | Count | Floor rule |
|---|---:|---|
| `/` | **59** | 45 of the 59 are the trade-verticals grid (`page.tsx:381-396`, 45 `/for/*` anchors, grep-verified). The band is non-negotiable (§B row 11) |
| `/blog` | **34** | rises once slicing becomes hiding (DS §4e) |
| `/blog/cis-basics` | 26 | hub; rises with `HubArticleList` |
| `/blog/cis-compliance` | 26 | " |
| `/blog/software-and-tools` | 24 | " |
| `/blog/vat-and-mtd` | 22 | " |
| `/blog/cis-advanced` | 22 | " |
| `/blog/cis-refunds` | 19 | " |
| `/blog/expenses` | 16 | " |
| `/blog/limited-company` | 16 | " |
| 83 x `/blog/{category}/{slug}` | **min 20, max 33, median 24** | one template. Lowest: `what-is-a-cis-accountant` 20, `how-long-does-cis-refund-take` 20, `cis-and-mortgages` 21. The template must not drop a link on the 20-link floor: the skip link, sidebar CTA and `#enquiry-form` anchors are in-page (`#`) and count for nothing, and `RelatedArticles` carries the same `related` array as the list it replaces |

Verification command for the whole slice: the §5 sweep over these 92 routes, asserting `links >= baseline`, `ctas >= baseline`, `dashes == 0`.

---

## G. SLICE 1 OWNER GATES

1. **Wordmark** — HardHat icon + two-line lockup with descriptor "CIS ACCOUNTANTS". Blocks: header, footer, drawer, every page.
2. **Backdrop motif** — the setting-out / scaffold grid. Blocks: footer, homepage hero, `#book`, blog `#enquiry-form`, all 8 hub heroes.
3. **Footer ground light → navy.** Blocks: the footer rebuild and the ground-oscillation pass on every page tail in the slice (DS §9).
4. **StickyCTA mount: site-wide (today) or homepage-only (Property).** Recommend site-wide on this site, because the homepage gets 4 sessions in 19 days and the bar would effectively be deleted. Blocks: `PageShell`.
5. **`sticky_cis_refund`: add `data-cta` alongside `data-cta-id`.** No history exists to split (0 recorded rows), so recommend ADD. Blocks: nothing, but it is the only way the bar ever appears in `vw_cta_performance`.
6. **Client-outcome copy on the homepage** — "a large CIS client base" (`page.tsx:414`), "What we have done for CIS subcontractors" + "across our CIS clients" (`:102,104`). §I and DS §10 ban claims about clients served. Recommend rewrite to mechanics ("we see these every week"), quotes retained. Blocks: homepage sections 8 and 14.
7. **`NextStepOffer` on articles** — retire from the renderer (recommended; 1 click ever, sits immediately above the form) or keep. Blocks: nothing downstream, but the decision must be recorded with a baseline restatement if retired.

---

## H. WORK PACKAGES

**WP-1 — Token layer + plumbing.** Files: `construction-cis/web/src/app/globals.css`, `src/components/ui/layout-utils.ts`. Source: `Property/web/src/app/globals.css`, `Property/web/src/components/ui/layout-utils.ts`. Spec: §A.1-A.8, `BRAND_LAYER.md` §§1-6. Deliver: `@theme` `--color-primary-50..950`; `--btn-ground/-hover/-active` = primary-700/800/900; `--accent-strong` → primary-700; T-W1 + `--form-error`; `--hero-cream`; `--dark` → `#0f172a`; `--ink-whisper` → `#737373`; `globals-standard.css` import; A.3 font fixes incl. the `@layer base` line-height split; `siteContainerXl`; canonical `sectionY`; `btnPrimary/btnSecondary/btnOnDark` on the A.5 box; `btnOnTeal`/`sectionYLoose` as aliases (T26). Accept: `python scripts/check_dependency_closure.py` (T24); every `btnPrimary` render measures white-on-`#c2410c` 5.18; the `niche-config` guard pinning `brand.primary_color` ↔ `--brand-primary` stays green. **Depends on: nothing. Blocks all others.**

**WP-2 — Chrome.** Files: `src/components/layout/{SiteHeader,SiteFooter,PageShell}.tsx`, `src/components/brand/BrandWordmarkHomeLink.tsx`, NEW `src/components/layout/TradeBackdrop.tsx`, `construction-cis/niche.config.json` (nav grouping only). Source: `Property/web/src/components/layout/{SiteHeader,SiteFooter,PageShell}.tsx`. Spec: §B, §C, §A.1-A.8. Accept: the §D table re-derived by curling 6 routes (`/`, `/blog`, a hub, an article, `/contact`, `/calculators`) — every rendered triple byte-identical, and the drawer button read out of the client bundle; burger and drawer both `lg:hidden`; nav unreachable-at-md defect gone at 800px; `/embed/[slug]` renders chrome-free; link counts on all 6 at or above floor. **Depends on WP-1. Gates 1, 2, 3, 4.**

**WP-3 — Blog article template.** Files: `src/components/blog/BlogPostRenderer.tsx`, NEW `src/lib/blog-cta-map.ts`, `src/components/blog/{InlineMiniLeadForm,ToolIsland}.tsx`, DELETE `src/components/blog/ExitIntentModal.tsx`. Source: `Property/web/src/components/blog/BlogPostRenderer.tsx` (F.3). Spec: §C.1, F.3, D.3. Accept: `#enquiry-form` present with `scroll-mt-24` and `aria-labelledby` on all 83 routes; skip link resolves; the 3-moment split still fires on a mapped category (`cis-refunds`) and an unmapped one; guard test proves all 8 category keys exist; `/blog/cis-basics/what-is-a-cis-accountant` holds its 20-link floor; 0 em-dashes. **Depends on WP-1, WP-2 (backdrop). Highest traffic value in the slice.**

**WP-4 — Blog index + 8 hubs.** Files: `src/app/blog/page.tsx`, `src/app/blog/[category]/page.tsx`, DELETE `src/components/blog/BlogListWithSearch.tsx`. Source: `Property/web/src/app/blog/page.tsx`, `Property/web/src/app/blog/[category]/page.tsx`. Spec: §C.2, §C.3, F.4, DS §4e. Accept: all 83 article anchors present in `/blog`'s server HTML with 71 carrying `hidden`; the projected item type carries no `contentHtml` (grep the flight payload for a body string); crawl-path guard test present; every hub at or above its §F floor; 8 essentials briefings land with their T-W1 tiers. **Depends on WP-1, WP-3 (shares the CTA map).**

**WP-5 — Homepage.** Files: `src/app/page.tsx`, NEW `src/components/marketing/MarketingSections.tsx`, local mirrors of `ProblemStatement`/`ComparisonTable`/`TestimonialsSection`/`PromptMarquee`, `src/config/service-tiers.ts` (TD-13, TD-29 copy only). Source: `Property/web/src/app/page.tsx` (F.2). Spec: §B, F.2. Accept: 16 sections in F.2 order; `/` holds **59** links with the 45-item trade grid intact; `featuredBadge=""` renders no badge (T13, read the rendered DOM not the prop); `hero_primary` triple unchanged while its href is `#book`; both hotlinked Pexels images gone; FAQ array feeds schema and render once. **Depends on WP-1, WP-2. Last by value (4 sessions / 19 days). Gates 6.**

Sequence: WP-1 → WP-2 → WP-3 → WP-4 → WP-5. WP-3 and WP-4 may run concurrently after WP-3 lands the CTA map. One builder per package; the manager builds, serially (T1).
