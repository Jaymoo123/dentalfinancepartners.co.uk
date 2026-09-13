# P0-D — CSS & Accessibility Hazards, contractors-ir35/web

Report-only. No files edited except this one.

## 1. Unlayered rules

Command: `grep -nE "^[a-zA-Z][^{]*\{" contractors-ir35/web/src/app/globals.css`

Result:
```
75:html {
88:body {
283:select {
```
(plus `290:select:disabled` from the same block start)

| Line | Selector | Declares | Beats which utilities |
|---|---|---|---|
| 75 | `html` | `-webkit-text-size-adjust`, `text-size-adjust`, font smoothing | none color/layout-relevant; no hazard |
| 88 | `body` | `margin:0; padding:0; min-height:100dvh; background:var(--surface); color:var(--ink); font-family; font-size:16px; line-height:1.7; font-feature-settings` | `background` and `color` are unlayered and would beat a `bg-*`/`text-*` utility placed directly on `<body>` — but nothing in the codebase puts a Tailwind background/text utility on the `body` element itself (grep confirmed no `<body className=...bg-...>` in `layout.tsx`), so this is dormant, not firing. Flag as latent risk, not an active hazard. |
| 278-286 | `input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, select` | `font-family: inherit; font-size: inherit;` | No color, no radius, no border — the exact "radius trap" pattern from the brief does NOT reproduce here. This block is inert for visual hazards. |
| 288-293 | `button:disabled, input:disabled, select:disabled` | `opacity:0.5; cursor:not-allowed;` | Layer-neutral (opacity/cursor rarely fought by utilities); no hazard found. |

~~**Verdict: no unlayered colour-on-shared-class hazard found in this file.**~~ **CORRECTION (F10 sweep, 2026-09-13): FALSE.** The command above only matches selectors starting with a letter, so it cannot see class selectors (`.eyebrow`, `.prose-blog`, etc.) at all — it was structurally incapable of finding the hazard it was asked to find. A brace-depth walk found **26** unlayered rule blocks, not 3, of which 25 have since been moved into `@layer base`/`@layer components`. Two were firing, live: `.prose-blog a` beat `text-white` on the ToolIsland CTA across all 62 blog posts at **1.38**, and `.eyebrow` beat `text-cyan-400` on `/about` and `/contact` at **3.35**. Full inventory, method and consumer-by-consumer verification: `_port/F10_UNLAYERED_SWEEP.md`. The paragraph above is left in place, struck, rather than deleted, so the error is visible alongside the correction.

~~The brief's premise (bare `a { color }` beating every anchor utility) does **NOT hold on this site** — there is no bare `a` rule in `globals.css` at all. This is a real difference from prior ports; flagging per the pushback clause: the brief's specific example does not reproduce here, only its general risk pattern was checked and cleared.~~ **CORRECTION: also false**, for the same reason — `.prose-blog a` is a class selector and was invisible to the grep used. It existed, was unlayered, and was firing at 1.38. See F10_UNLAYERED_SWEEP.md §1 and §3.2.

## 2. Theming method

Evidence:
- `:root` in `globals.css` defines hex-literal custom properties (`--accent: #0e7490`, `--ink: #0a0a0a`, etc — lines 11-51).
- The majority of component `className`s use **named Tailwind utilities** resolved against Tailwind's own palette (`cyan-700`, `cyan-800`, `neutral-500/600/900`, etc.) — see `layout-utils.ts` (`btnPrimary`, `focusRing`, `linkArrow`) and `SiteFooter.tsx`. These do NOT route through the CSS custom properties at all; `cyan-700` is Tailwind's own `#0e7490`, coincidentally matching `--accent`.
- **But** a second, materially-sized set of components uses `text-[var(--x)]` / `bg-[var(--x)]` / `border-[var(--x)]` arbitrary-value utilities that DO route through the custom properties. Confirmed via `grep -rn "text-\[var(--\|bg-\[var(--\|border-\[var(--"` — 13 files, concentrated in:
  - `app/resources/[topic]/page.tsx`
  - `components/support/SpecialistWidget.tsx`
  - `components/calculators/premium/PremiumCalculator.tsx` (heaviest user — ~40 occurrences)
  - `components/calculators/premium/PremiumUpgrade.tsx`, `MobileToolSlot.tsx`, `ResultGateModal.tsx`
  - `components/resources/CalculatorPageResources.tsx`

**This is a mixed-method site: named-utility majority + a var()-arbitrary-value minority concentrated in the calculators/resources surfaces.** Per the brief's own warning, `browser_check.mjs` cannot resolve `var()` chains and falls back to white. That means **any automated contrast check on `PremiumCalculator.tsx`, `PremiumUpgrade.tsx`, `SpecialistWidget.tsx`, `MobileToolSlot.tsx`, `ResultGateModal.tsx`, `CalculatorPageResources.tsx`, and `app/resources/[topic]/page.tsx` is UNTRUSTABLE** and must be hand-verified against the resolved hex values in `:root`, not read off instrument output. All other surfaces (header, footer, forms, blog, homepage) use named Tailwind utilities and CAN be trusted from the instrument.

## 3. Hand-computed contrast ratios

Method: WCAG relative-luminance formula, sRGB→linear per channel, contrast = (L1+0.05)/(L2+0.05).

**Self-test (required by brief):** slate-500 `#64748b` on white → computed **4.76**. slate-400 `#94a3b8` on white → known **2.56**. My slate-500 computation reproduced 4.76 exactly. **Check passed.**

| Element | Fg | Bg | Ratio | Floor | Result |
|---|---|---|---|---|---|
| Primary CTA label (`btnPrimary`, white text on `bg-cyan-700` #0e7490) | #ffffff | #0e7490 | **5.36** | 4.5 | PASS |
| Footer nav link (`text-neutral-600` #525252 on `#fafaf7`) | #525252 | #fafaf7 | **7.49** | 4.5 | PASS |
| Footer "Contact us" link (`text-cyan-800` #155e75 on `#fafaf7`) | #155e75 | #fafaf7 | **6.95** | 4.5 | PASS |
| Footer fine print (`text-neutral-500` #737373 on `#fafaf7`) | #737373 | #fafaf7 | **4.54** | 4.5 | PASS, but **borderline** — 0.04 above floor, no margin for a future palette tweak |
| Article body link (`.prose-blog a`, `var(--accent-strong)` = #155e75, on white prose background) | #155e75 | #ffffff | **~7.0** (marginally higher than the #fafaf7 case above since white bg) | 4.5 | PASS |
| LeadForm Privacy Policy link (`text-cyan-800` #155e75, form is `bg-white`) | #155e75 | #ffffff | **~7.0** | 4.5 | PASS |

No contrast failures found among the load-bearing combinations named in the brief. The one item worth carrying forward is the footer fine-print margin (4.54 vs 4.5 floor) — not a defect, but zero headroom.

General trap noted per brief: `--accent` (#0e7490) is used both as a **text/label colour on white** (passes 4.5, verified via cyan-800 which is close in family) and as **background under white text** (passes via the 5.36 CTA calc above) — no single-role collision found; the site avoids the "one brand token, three roles" trap by using the darker `cyan-800`/`--accent-strong` for text-on-light and the base `cyan-700`/`--accent` for background-under-white, i.e., two tokens for two roles. Not verified: any usage of `--accent` (#0e7490) as flat text-on-white (would need its own check; not found in the surfaces audited above — UNVERIFIED beyond what's listed in this table).

## 4. Header breakpoint set (`SiteHeader.tsx`)

| Element | Breakpoint | Line |
|---|---|---|
| Desktop nav (`<nav aria-label="Primary">`) | `md:flex` (hidden below) | 60 |
| Primary CTA (`btnPrimary` link) | `sm:inline-flex` (hidden below) | 80 |
| Burger button | `md:hidden` | 87 |
| Mobile drawer overlay | `md:hidden` | 100 |

**Burger and drawer agree at `md`** (both `md:hidden`), so the previous port's "burger renders, drawer doesn't open" dead-zone does NOT reproduce here — pushback noted: the brief's failure pattern does not apply to this file.

**But the CTA breaks the set of four.** CTA appears at `sm` (640px), nav appears at `md` (768px). Between 640px and 767px: CTA is visible AND the burger is still visible (burger hides only at `md`) — so there is no navigation gap (burger+drawer still work in that range), but the header shows both a persistent CTA button and a burger simultaneously in that ~128px window, which is a design inconsistency rather than a broken-nav defect. Flagging as a real but lower-severity finding than the brief's example.

## 5. Anchor scroll offsets

Command: `grep -rn "scroll-mt-" contractors-ir35/web/src` → **0 matches anywhere in the codebase.**

Command: `grep -rln "id=\"main\"" contractors-ir35/web/src` → 6 files carry an anchor target:
- `app/research/uk-contractor-survival-index/page.tsx`
- `app/research/uk-contractor-insolvency-index/page.tsx`
- `app/research/uk-contractor-index/page.tsx`
- `app/services/page.tsx`
- `components/layout/PageShell.tsx`
- `app/calculators/[slug]/page.tsx`

None of the 6 have a `scroll-mt-*` class on the target (0 `scroll-mt-*` occurrences confirmed above). `PageShell.tsx` is the shared layout wrapper, so `#main` there is the skip-link target used site-wide.

**Result: N=6 anchor targets found across 6 route families (research ×3, services, calculators, and the global PageShell `#main`), 0 of 6 carry a scroll offset.** No route family has the offset — this is a uniform gap, not a partial one. Header height is a sticky header per `SiteHeader.tsx` (`fixed`/sticky classes not fully re-verified in this pass — UNVERIFIED whether header is `sticky` or `fixed`; recommend confirming positioning before treating this as a confirmed visual defect, since a non-sticky header would make `scroll-mt` moot).

## 6. Accessibility defects hiding data

`grep -rn "role=\"img\"\|aria-hidden" contractors-ir35/web/src` — full hit list reviewed. Relevant chart/data wrappers:

| File | Wrapper | Local or shared | Notes |
|---|---|---|---|
| `components/research/SurvivalIndexCharts.tsx` (lines 60, 140) | `<svg role="img" aria-label="Survival curve: contractor SIC groups vs all industries">` | **Local** (`src/components/research/`) | `role="img"` collapses the whole chart to one label — the underlying data points (year/value pairs) are not exposed to the accessibility tree. `aria-label` names the chart but doesn't carry values. |
| `components/research/ContractorIndexCharts.tsx` (lines 62, 167, 272) | same pattern, 3 charts | **Local** | Same defect, ×3 instances |
| `components/research/ContractorInsolvencyCharts.tsx` (lines 56, 147, 233) | same pattern, 3 charts | **Local** | Same defect, ×3 instances |
| `components/calculators/premium/PremiumBarChart.tsx` (line 96, `role="img"`; line 89, `aria-hidden="true"` on the wrapping `<div>`) | Bar chart **double-hidden**: outer `<div aria-hidden="true">` removes the whole chart from the tree, then the inner `<svg>` also carries `role="img"`. | **Local** | Most severe of the four — the outer `aria-hidden="true"` means even the `role="img"` label is unreachable; screen reader users get nothing for this chart, not even a name. |

All four are under `src/components/`, none under `packages/web-shared/` — **all are local and in scope for a future fix** (not proposing one here per brief). Total: **9 chart instances across 4 files** hide numeric data from the accessibility tree; the `PremiumBarChart.tsx` case is worse than the other three because it is `aria-hidden` first, `role="img"` second, removing even the label.

Non-data `aria-hidden` usage (decorative icons, dividers, dot separators in `SpecialistWidget.tsx`, `Breadcrumb.tsx`, `BrandWordmarkHomeLink.tsx`, `BlogPostRenderer.tsx`, `page.tsx` icons, `thank-you/page.tsx` dividers, `VisitorTabs.tsx` dots) reviewed and judged correctly decorative — not flagged.

## Receipt

- ~~Unlayered rules found: 3 selector blocks (`html`, `body`, `input/textarea/select` group, `button/input/select:disabled`); **0 are active colour/radius hazards** — the brief's bare-`a`-rule and radius-trap patterns do not reproduce on this site.~~ **CORRECTED (F10, 2026-09-13): 26 unlayered blocks, not 3; 2 were live colour hazards** (`.prose-blog a` at 1.38 on 62 blog posts, `.eyebrow` at 3.35 on `/about` + `/contact`). The undercount was caused by the audit command (`grep -nE "^[a-zA-Z][^{]*\{"`), which cannot match a class selector — see `_port/F10_UNLAYERED_SWEEP.md` §1. 25 of 26 have since been moved into a layer; 1 is deliberately left unlayered (`:where(h2[id],h3[id],h4[id])`, zero-specificity, F9).
- Contrast failures found: **0** against the 4.5/3.0 floors; one borderline pass (footer fine print, 4.54:1, effectively no headroom).
- Header breakpoint verdict: burger/drawer agree (`md:hidden`/`md:hidden`, nav `md:flex`) — no dead-zone. CTA is out of step at `sm:inline-flex`, producing a ~128px window (640-767px) with both CTA and burger visible simultaneously — real but lower-severity than the brief's example.
- Brief items that were wrong for this site: (1) no bare unlayered colour rule exists in `globals.css`, so finding #1's headline example does not apply; (2) burger/drawer breakpoints already match, so finding #4's headline failure mode does not apply — the real breakpoint defect here is the CTA, not the drawer.
- New finding not anticipated by the brief: theming is **mixed**, not single-method — named Tailwind utilities dominate, but 13 files (heaviest: `PremiumCalculator.tsx`) use `var()`-arbitrary utilities that will break the automated contrast instrument; those files must be hand-checked, not instrument-checked.
- Anchor offsets: 0 of 6 `#main`/anchor-target route families have `scroll-mt-*`, uniformly.
- A11y data-hiding: 9 chart instances across 4 local files (`SurvivalIndexCharts.tsx`, `ContractorIndexCharts.tsx`, `ContractorInsolvencyCharts.tsx`, `PremiumBarChart.tsx`) hide data via `role="img"`; `PremiumBarChart.tsx` additionally wraps in `aria-hidden="true"`, hiding even the label. None are in `packages/web-shared/`.
