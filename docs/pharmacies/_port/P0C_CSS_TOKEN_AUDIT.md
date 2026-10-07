# P0C — CSS, token and contrast audit — pharmacies (pre-port)

Read-only audit. Site: `pharmacies/web`. Kit: `packages/web-shared/design/`. Kit HEAD referenced: `6bc25f606 fix(estate): pre-live gate fix round from the rendered read, 17 sites` (`git log -1 --format='%h %s' -- packages/web-shared`).
Built CSS used: `pharmacies/web/.next/static/css/b3a411ebfefd743f.css` (86,458 bytes, present on first check, no retry needed).

## Findings table

| finding | severity | file:line | evidence command | which phase owns the fix |
|---|---|---|---|---|
| Two grey ramps on one screen: `neutral-*` in 30 files (dominant, incl. `page.tsx`, `SiteHeader.tsx`, `layout-utils.ts`) vs `slate-*` in 7 files (6 are `/admin/analytics/*` plus `globals.css` itself) | serious | `pharmacies/web/src/components/ui/layout-utils.ts` and 29 others | `grep -rl "neutral-[0-9]" pharmacies/web/src --include=*.tsx --include=*.ts --include=*.css \| wc -l` = 30; same for `slate-` = 7 | phase 1: pick one ramp (kit paints `slate-*`); admin pages already on it, public pages are not |
| `layout-utils.ts` hand-rolled, not a re-export of the kit's version, every button/focus recipe hardcodes `#0f3a4a` instead of a `var()` indirection | serious | `pharmacies/web/src/components/ui/layout-utils.ts:1-24` | `grep -n "web-shared" pharmacies/web/src/components/ui/layout-utils.ts` → 0 hits | phase 1: port to kit `siteContainer*`/`btn*`/`focusRing`, drop literal hex |
| `btnOnDark` is a bare alias of `btnSecondary` (`neutral-900` border/text, built for a light ground) | serious | `pharmacies/web/src/components/ui/layout-utils.ts:24` | `grep -n "btnOnDark" pharmacies/web/src/components/ui/layout-utils.ts` | phase 1: if any page puts this on a dark section it under-contrasts; replace with a real on-dark recipe or confirm no dark-ground consumer exists |
| No `primary-*` Tailwind ramp declared anywhere (`@theme` absent in site CSS) — but no live defect found because `LeadCTAPanel` (the kit component that needs it) is never imported on this site | informational, differs from hospitality's live defect | `pharmacies/web/src/app/globals.css` (no `@theme`); `grep -rln "LeadCTAPanel" pharmacies/web/src` → 0 hits | phase 1: if a future kit component needing `primary-*` is adopted, add the ramp first; not a current defect |
| `globals.css` does **not** import the kit's `globals-standard.css` — only `tailwindcss` and `packages/site-styles/prose-standard.css` | informational | `pharmacies/web/src/app/globals.css:1-6`; `grep -rn "globals-standard" pharmacies/web/src` → 0 hits | phase 1: decide whether to adopt it (brings `--radius`/`--brand-glow*` channels, heading rhythm); not required today, nothing reads those tokens |
| Admin login field (`/admin/analytics/login`) kills the focus ring with no compensating ring | minor | `pharmacies/web/src/app/admin/analytics/login/page.tsx:39` (`focus:border-cyan-700 focus:outline-none`, no `focus:ring-*`) | `grep -rn "outline-none" pharmacies/web/src --include=*.tsx` | phase 1: add a focus-visible ring; internal-only surface, low priority |
| Hardcoded hex in `.tsx`, worst offenders `app/page.tsx` (44), `research/pharmacy-openings-closures-index/page.tsx` (35), `research/pharmacy-density-and-workload-index/page.tsx` (19), `PharmacyIndexCharts.tsx` (10) | minor | see command | `grep -rnoE "#[0-9a-fA-F]{6}" pharmacies/web/src --include=*.tsx \| wc -l` = 159 | phase 1 token sweep, not phase-0 blocking; research/chart pages are data-viz colour, lower priority than UI chrome |
| 19 inline `style={{...}}` attributes across `src` | minor | `grep -rn "style={{" pharmacies/web/src --include=*.tsx \| wc -l` = 19 | phase 1: audit individually |
| The one unlayered selector in `globals.css`, `.prose table:not(.not-prose *)`, is intentional and dated (`35a23f5cb`, 2026-09-28, "phase 0 Opus read: closers rewritten per audience, visible focus rings, residual wording and contrast fixes") — same shape as every other ported site's table-overflow fix | none (informational) | `pharmacies/web/src/app/globals.css:33-39`; `git log -S'.prose table' --oneline -- pharmacies/web/src/app/globals.css` → `35a23f5cb` | no action |
| Webfont (Plus Jakarta Sans) genuinely resolves on `<body>` despite the unlayered `body{font-family:ui-sans-serif,...}` rule, because next/font's generated class (`.__className_a11773`, specificity 0,1,0) beats the element selector (0,0,1) regardless of layer — both land in the browser's unlayered bucket, so ordinary specificity decides | none (brief's T-H1 risk checked, not present) | built CSS: `.__className_a11773{font-family:Plus Jakarta Sans,Plus Jakarta Sans Fallback;font-style:normal}` vs `body{background:...;font-family:ui-sans-serif,...}`; `layout.tsx:28` applies `className={plusJakarta.className}` directly on `<body>` (not `<html>`, unlike hospitality's T-H1 bug) | phase 1 should still do the one rendered-DOM check (`getComputedStyle(document.body).fontFamily`) per T-H1's rule before calling this closed |
| `.section-label` and bare `.prose` both resolve via `packages/site-styles/prose-standard.css`, `@layer components` wrapped, no unlayered collision | none | `packages/site-styles/prose-standard.css:255` (`.section-label` inside `@layer components`); built CSS: `.section-label{background:var(--accent,var(--brand-primary,#0f172a));...}` | no action |
| No bare `card`/`eyebrow` class tokens used in `.tsx` — the "card" hits found by a loose grep were all `twitter.card = "summary_large_image"` metadata strings, not CSS classes; `Eyebrow` component unused (0 hits) | none, false lead | `grep -rno "[a-zA-Z-]*card[a-zA-Z-]*" pharmacies/web/src --include=*.tsx` — all 7 hits are metadata | no action |

## `globals.css` walked rule by rule (39 lines)

1. `@import "tailwindcss" source("..")` — Tailwind-layered, not a site rule.
2. `@source "../../../../packages/web-shared"` — makes Tailwind scan the kit dir so kit-component utility classes compile.
3. `@import "../../../../packages/site-styles/prose-standard.css"` — resolves (file exists, 7,740 bytes, last touched 2026-09-13); NOT `@accounting-network/web-shared/design/globals-standard.css`.
4. `:root` block, 10 tokens, all literal: `--background #fff`, `--surface #f8fafc`, `--surface-elevated #fff`, `--ink #0f172a`, `--ink-soft #334155`, `--muted #475569`, `--border #e2e8f0`, `--brand-primary #0f3a4a`, `--brand-primary-strong #0f3a4a` (identical to `--brand-primary`, not a separate darker step), `--brand-on-primary #fff`, `--calc-result-accent #88cde7` (comment documents the derivation: brand 1.47 on slate-900 → same-hue 300-step tint 10.14).
5. `body { background; color; font-family }` — unlayered, reads three declared tokens; see webfont finding above for why this does not break the Plus Jakarta Sans application.
6. One unlayered selector rule, `.prose table:not(.not-prose *)` (lines 33-39) — scroll-container fix for blog tables, dated and commented. `@layer` count in this file: 0.
7. `@theme` blocks: 0. `@keyframes`: 0. `@source` lines: 1.
8. Cascade order: `tailwindcss` → kit-scan `@source` → `prose-standard.css` (layered internally) → `:root`/`body` (unlayered) → the one dated table fix (unlayered). No conflicting rule found between the two unlayered site rules and anything Tailwind emits, because neither targets a class Tailwind also generates.

## Built CSS brace-depth walk

Ran the playbook's corrected walk (`utf-8-sig`, character-stream, layer-stack aware) on `pharmacies/web/.next/static/css/b3a411ebfefd743f.css` (one physical line, confirmed — the old line-split grep would have returned nothing, per the T30 correction). 98 raw hits, almost all `@font-face` (21, one per font weight/style) and Tailwind's own `@property` custom-property registrations (framework noise, not author rules). After excluding those, exactly two author-level unlayered rules survive, both already covered above:
- `body{...}` (line 24 of source; appears at char-offset equivalent to "line 3" in the one-line built file)
- `.prose table:not(.not-prose *){...}`
- plus the two next/font classes `.__className_a11773` / `.__variable_a11773`, which are expected to be unlayered (they come from Next's own injected stylesheet, not Tailwind).

No undefined-class defect found: `bg-primary-50`/`text-primary-600`/`ring-primary-100` (the hospitality defect) return 0/0/0 here too, but there is no live consumer expecting them (`LeadCTAPanel` is not imported on this site), so this is a non-finding rather than a repeat of the hospitality bug.

## Brand colour contrast — `#0f3a4a`

Verified against `pharmacies/niche.config.json:38` (`brand.primary_color`) and `globals.css` `--brand-primary`/`--brand-primary-strong` (same value, not a separate darker step — note this for phase 1, there is no distinct "strong" tone).

Computed via WCAG relative-luminance formula (node one-liner, sRGB → linear → 0.2126R+0.7152G+0.0722B, ratio = (L1+0.05)/(L2+0.05)):

| context | ratio | floor | verdict |
|---|---|---|---|
| `#0f3a4a` as text on white `#ffffff` | 12.18:1 | 4.5:1 text | PASS (large margin) |
| `#0f3a4a` as text on slate-50 `#f8fafc` | 11.64:1 | 4.5:1 text | PASS |
| `#0f3a4a` as text on slate-900 `#0f172a` | 1.47:1 | 4.5:1 text / 3.0:1 UI | **FAIL both floors** — matches the CSS comment's own cited figure exactly |
| `#0f3a4a` as a button ground with white text | 12.18:1 (same pair, inverted) | 3.0:1 UI | PASS |
| `--calc-result-accent #88cde7` on slate-900 `#0f172a` (the documented tint fix for the 1.47 failure) | 10.14:1 | 4.5:1 text | PASS, matches the comment's cited 10.14 |
| `--brand-primary-strong` | identical to `--brand-primary` (`#0f3a4a`), so identical ratios — not a separate token in practice despite the name | — | — |

No focus-ring token exists as a CSS variable; `focusRing` in `layout-utils.ts` hardcodes `outline-[#0f3a4a]` directly (12.18:1 on white, well clear of the 3:1 non-text floor).

## Grey ramp census

| family | files | notes |
|---|---|---|
| `neutral-*` | 30 | every public-facing page and component; includes `layout-utils.ts` itself |
| `slate-*` | 7 | 6 of 7 are `/admin/analytics/*` internal pages; 7th is `globals.css` (tokens only, not a utility class) |
| `gray-*` / `zinc-*` / `stone-*` | 0 each | none found |

Kit paints `slate-*`. Public site is 100% `neutral-*`; the only `slate-*` surface is the internal admin dashboard, which reads as a separate build already diverged from the public site's ramp — same two-ramp pattern flagged on hospitality, inverted population (there `neutral-*` was 23 files to `slate-*`'s 6; here it's 30 to 7, same shape).

## Hardcoded hex in `.tsx` (top files)

`app/page.tsx` 44, `research/pharmacy-openings-closures-index/page.tsx` 35, `research/pharmacy-density-and-workload-index/page.tsx` 19, `components/research/PharmacyIndexCharts.tsx` 10, `services/[slug]/page.tsx` 8, `for/[slug]/page.tsx` 8, `SiteHeader.tsx` 6, `privacy-policy/page.tsx` 6, `cookie-policy/page.tsx` 5, `api/og/route.tsx` 4, `StickyCTA.tsx` 3, `services/page.tsx` 3, remainder 1-2 each. Total 159 across `src`. The two research/chart pages and `PharmacyIndexCharts.tsx` account for 64 of 159 (40%) and are data-visualisation colour scales, not chrome — lower priority than the public marketing pages. Inline `style={{...}}`: 19 occurrences.

## Classes used but check against CSS

`.section-label` (10 hits, 1 file) and bare `"prose` (1 hit) both resolve via `prose-standard.css`, `@layer components`. `Eyebrow` (kit component): 0 uses. No bare `.card`/`.eyebrow` literal class strings in `.tsx` — the loose grep hits were all `twitter.card` metadata, a false lead, corrected above.

## `@theme` / kit-token wiring

- `@theme` blocks in site CSS: 0.
- `@layer base` usage in site CSS: 0 (the kit's heading-rhythm `@layer base` block lives in `globals-standard.css`, which this site does not import).
- `@source` directives: 1 (`packages/web-shared`).
- `packages/web-shared/design/globals-standard.css` exists (confirmed via Glob) but is **not imported** by `pharmacies/web/src/app/globals.css`. Consequence: the kit's documented `--radius`/`--brand-glow*` channel tokens and the `@layer base` heading rhythm (`font-weight`/`letter-spacing` layered, `line-height` deliberately unlayered) are absent here. Since nothing in this site's own code reads those tokens, there is no collapse today — this only becomes live if phase 1 adds the import without also declaring the per-site overrides it expects.

## Webfont chain (T-H1 check)

`layout.tsx:2` imports `Plus_Jakarta_Sans`; `layout.tsx:10-14` binds `variable: "--font-plus-jakarta"`; `layout.tsx:28` applies `className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}` **directly on `<body>`**, not on `<html>` (the exact defect hospitality had). Built CSS confirms `.__className_a11773{font-family:Plus Jakarta Sans,...}` is a real rule, and because it is a class selector it outranks the unlayered `body{font-family:ui-sans-serif,...}` element rule on ordinary specificity even though both are unlayered. Source + built CSS both say the font applies; phase 1 should still run the one rendered-DOM check the playbook requires (`getComputedStyle(document.body).fontFamily`) rather than take this as fully proven, per T-H1's rule that "loaded in source" is not sufficient on its own.

## Phase 1 must-fix list

1. Resolve the `neutral-*` vs `slate-*` split — pick one ramp for the public site (kit default is `slate-*`); 30 files affected.
2. Port `layout-utils.ts` to the kit version or add `web-shared` re-exports; replace hardcoded `#0f3a4a` with a `var(--brand-primary)` indirection throughout.
3. Fix or remove the `btnOnDark = btnSecondary` alias before any dark-ground consumer uses it.
4. Add a focus-visible ring to the admin login field.
5. Run the one rendered-DOM `getComputedStyle(document.body).fontFamily` check per T-H1 before marking the webfont closed.
6. Decide on `globals-standard.css` import (optional, no current defect either way).
7. Token-sweep the 159 hardcoded hexes in `.tsx`, prioritising `page.tsx`/chart components last since they're decorative/data-viz, not chrome.

## False premises / could-not-do

1. The brief's implicit expectation (by analogy to hospitality) that the `LeadCTAPanel` undefined-ramp defect repeats here is **not true**: `LeadCTAPanel` is never imported on pharmacies, so the missing `primary-*` ramp has no live consumer and is not a current defect.
2. The brief's T-H1 webfont-risk pattern does not reproduce: `plusJakarta.className` is applied on `<body>` (not `<html>` as in hospitality's bug), and the built CSS confirms resolution via ordinary class-vs-element specificity.

Scratch used and deleted: none created outside the repo — all checks ran as direct `grep`/`node`/`python` one-liners with no intermediate files, and this file is the only artefact written.
