# P0C — CSS, token and contrast audit — hospitality (pre-port)

Read-only audit. Site: `hospitality/web`. Reference: `Property/web`. Kit: `packages/web-shared/design/`.
Kit HEAD at audit time: `4a267372 feat(web-shared): TestimonialsSection showRating, footnote and optional item fields, every default byte-identical` (`git log -1 --format='%h %s' -- packages/web-shared`).

## Findings table

| finding | severity | file:line | evidence command | recommended phase-1 action |
|---|---|---|---|---|
| `LeadCTAPanel` badge (`bg-primary-50 text-primary-600 ring-primary-100`) has zero matching rules in the compiled CSS on all 4 call sites | serious | `packages/web-shared/design/marketing/LeadCTAPanel.tsx:171`; consumed at `hospitality/web/src/app/about/page.tsx`, `app/for/[slug]/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx` | `grep -o "bg-primary-50\|text-primary-600\|ring-primary-100" hospitality/web/.next/static/css/c3a5006751273922.css` → 0/0/0 | declare a `@theme`/`:root` `--color-primary-50..950` ramp in `globals.css` before phase-1 touches these pages |
| Two grey ramps painted on the same screens: `neutral-*` (23 files, 97 hits of `neutral-900` alone) vs `slate-*` (6 files, up to 40 hits of `slate-500`) | serious | 23 files incl. `app/page.tsx`, `components/forms/LeadForm.tsx` vs 6 files incl. `app/admin/analytics/login/page.tsx` | `grep -rl "neutral-[0-9]" hospitality/web/src --include=*.tsx --include=*.ts --include=*.css \| wc -l` = 23; same for `slate-` = 6 | pick one ramp (kit paints `slate-*`); reassign the 23 `neutral-*` files in phase 1 — this is the named "plain jane" cause from startups-tech |
| `layout-utils.ts` is a 100% hand-rolled fork, no re-export from the kit, no deviation comment | serious | `hospitality/web/src/components/ui/layout-utils.ts:1-24` | `grep -n "web-shared" hospitality/web/src/components/ui/layout-utils.ts` → 0 hits | every button/focus recipe (`btnPrimary`, `btnSecondary`, `btnOnTeal`, `focusRing`, `linkArrow`) hardcodes `#b0532f`/`#8f421f`/`#6e3118`; port to kit `siteContainer*`/`btn*`/`focusRing` and drop the literal hexes |
| `btnOnDark` is aliased straight to `btnSecondary` (`neutral-900` border/text) | serious | `hospitality/web/src/components/ui/layout-utils.ts:24` (`export const btnOnDark = btnSecondary;`) | `grep -n "btnOnDark" hospitality/web/src/components/ui/layout-utils.ts` | not dark-ground-safe; if any phase-1 page puts this on a dark section it under-contrasts; replace with a real on-dark recipe or drop the alias |
| `Eyebrow`/`section-label` ratio is inverted from the kit's intent: 0 `Eyebrow` uses, 8 `.section-label` uses | minor | `hospitality/web/src` | `grep -rn "Eyebrow" hospitality/web/src --include=*.tsx \| wc -l` = 0; `grep -rn "section-label" ... \| wc -l` = 8 | phase-1: adopt kit `Eyebrow` component where these 8 sites currently hand-roll `.section-label` |
| No webfont pairing gap found — Plus Jakarta Sans genuinely loaded (brief premise CONFIRMED, not a finding) | n/a | `hospitality/web/src/app/layout.tsx:2,17` | `grep -rn "font" hospitality/web/src/app/layout.tsx` | none needed |
| `outline-none` used 3x, only 1 of which is a genuine ring-defeat risk | minor/serious (mixed) | `app/admin/analytics/login/page.tsx:39` (internal admin login, `focus:border-cyan-700 focus:outline-none`, no ring at all); `app/error.tsx:47` (has a compensating `focus:ring-2 focus:ring-[#b0532f] focus:ring-offset-2`, not a real defect); `components/forms/LeadForm.tsx:322` (`tabIndex={-1}` programmatic-focus heading, not a real interactive control, `outline-none` here is conventional not a defect) | `grep -rn "outline-none" hospitality/web/src` | fix the admin login field in phase 1 (add a focus-visible ring); leave the other two |
| Hardcoded hex in `.tsx`, worst offenders `app/page.tsx` (48), `for/[slug]/page.tsx` (16), `services/[slug]/page.tsx` (14) | minor | see command | `grep -rloE "#[0-9a-fA-F]{3,8}" hospitality/web/src --include=*.tsx \| xargs -I{} sh -c 'grep -oE "#[0-9a-fA-F]{3,8}" "{}" \| wc -l'` | phase-1 token sweep, not phase-0 blocking |
| 16 inline `style={{...}}` attributes across `src` | minor | see command | `grep -rn "style={{" hospitality/web/src --include=*.tsx \| wc -l` = 16 | audit individually in phase 1 |
| The one unlayered selector rule in `globals.css` (`.prose table:not(.not-prose *)`) is intentional and documented, same shape as startups-tech's `.prose table` fix | none (informational) | `hospitality/web/src/app/globals.css:33-42` | manual read | no action |
| `globals.css` does **not** import `@accounting-network/web-shared/design/globals-standard.css` at all — only `tailwindcss` and `packages/site-styles/prose-standard.css` | informational, changes the brief's assumed trap | `hospitality/web/src/app/globals.css:1-6` | `grep -n "@import" hospitality/web/src/app/globals.css` | the `--radius`/`--brand-glow*` collapse trap named in the brief does not apply to this site as it stands today — see False premises below; phase 1 should decide whether to import `globals-standard.css` or keep the hand-rolled `:root` |
| No `@theme` block anywhere in the site's own CSS | serious (root cause of the LeadCTAPanel defect above) | `hospitality/web/src/app/globals.css` (absent); kit has one at `packages/web-shared/design/globals-standard.css:37` | `grep -n "@theme" hospitality/web/src/app/globals.css packages/web-shared/design/globals-standard.css` | add the ramp in phase 1 |

## `globals.css` walked rule by rule (43 lines)

1. `@import "tailwindcss" source("..")` — layered by Tailwind itself, not a site rule.
2. `@source "../../../../packages/web-shared"` — makes Tailwind scan the kit dir for class strings so kit components compile; **this is why arbitrary-value utilities like `bg-[var(--color-primary-600)]` compile even though the site never imports the kit's `layout-utils.ts`** (they're generated from scanning `LeadCTAPanel.tsx`/`SiteHeader` directly).
3. `@import "../../../../packages/site-styles/prose-standard.css"` — NOT `@accounting-network/web-shared/design/globals-standard.css`. Confirmed: `grep -n "globals-standard\|web-shared/design" globals.css` returns nothing.
4. `:root` block: 10 custom properties — `--background`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--border`, `--brand-primary`, `--brand-primary-strong`, `--brand-primary-clarity` (note: file actually declares `--brand-on-primary`, not a "clarity" token — corrected), `--font-sans`. All resolve to literal hex/values, none read an undeclared upstream token.
5. `body { background; color; font-family }` — reads three of the above tokens, all declared.
6. One unlayered selector rule, `.prose table:not(.not-prose *)` (lines 33-42), dated and commented 2026-09-28, scoped deliberately to keep wide blog tables inside 390px. No `@layer` block exists anywhere in this file (confirmed: `grep -n "@layer" globals.css` = 0 hits) — everything here is process-level (`@import`/`@source`) or `:root`/`body`, so there is nothing else to rank against Tailwind utilities on specificity.
7. `--radius` and `--brand-glow*`: **not declared, not read** anywhere in this file — irrelevant here because `globals-standard.css` (the file that needs them) is never imported. `@keyframes`: 0. `@source` lines: 1.
8. Composed-override order: `tailwindcss` → kit-scan `@source` → `prose-standard.css` → `:root`/`body` → the one dated override rule. No conflicting cascade found.

## Brand colour contrast — `#b0532f`

`niche.config.json` `brand.primary_color` states `#b0532f` — **verified**, matches `hospitality/niche.config.json:38` and `globals.css` `--brand-primary`/`--brand-primary-strong`.

| context | ratio | floor | verdict |
|---|---|---|---|
| `#b0532f` as text on white `#ffffff` | 5.09:1 | 4.5:1 text | PASS |
| `#b0532f` as a button ground with white text | 5.09:1 (same pair) | 3.0:1 UI | PASS |
| `#b0532f` as text on slate-900 `#0f172a` | 3.51:1 | 4.5:1 text | **FAIL** (passes only the 3.0:1 graphic/UI floor, not the text floor) |

No `primary-*` Tailwind colour ramp is declared anywhere (`@theme` or `:root`) in the site's own CSS — confirmed above. The only "`primary-*`" strings that compile are arbitrary-value `var()` reads embedded in kit components scanned via `@source` (`bg-[var(--color-primary-600)]` etc. in `SiteHeader`/focus rings), not a declared scale. Buttons in this site's own `layout-utils.ts` use the literal hex `#b0532f`/`#8f421f`/`#6e3118` directly, never `primary-700`/`primary-800` class names — so "where does the site use `primary-700`/`primary-800` for buttons" has the answer **nowhere; it uses hardcoded hex instead of the ramp**, which is itself a finding (see table).

## Grey ramps

Family counts (files containing at least one utility hit) across `hospitality/web/src`, `--include=*.tsx --include=*.ts --include=*.css`:

| family | files | notable hits |
|---|---|---|
| `neutral-*` | 23 | `neutral-900` 97, `neutral-600` 49, `neutral-200` 46, `neutral-500` 32, `neutral-50` 21, `neutral-800` 12, `neutral-400` 10, `neutral-300` 8, `neutral-100` 5, `neutral-700` 4 |
| `slate-*` | 6 | `slate-500` 40, `slate-900` 26, `slate-200` 26, `slate-400` 25, `slate-100` 21, `slate-50` 15, `slate-700` 13, `slate-800` 10, `slate-600` 9, `slate-300` 8 |
| `stone-*` | 0 | — |
| `zinc-*` | 0 | — |
| `gray-*` | 0 | — |

The kit paints `slate-*`. `neutral-*` dominates by file count (23 vs 6) and by top-token volume (`neutral-900` 97 vs `slate-900` 26). This is the same "two grey ramps on one screen" cause flagged on startups-tech as the "plain jane" driver.

## `layout-utils.ts`

File exists at `hospitality/web/src/components/ui/layout-utils.ts` (24 lines). It does **not** re-export from `packages/web-shared/design/layout-utils.ts` (`grep -n "web-shared"` = 0 hits). It exports `siteContainer`, `siteContainerLg`, `contentNarrow`, `sectionY`, `sectionYLoose`, `focusRing`, `btnPrimary`, `btnOnTeal`, `btnSecondary`, `linkArrow`, `btnOnDark`. It does export `focusRing`, `btnOnDark`, `btnSecondary`, `siteContainer` (all four named in the brief) — but every colour in every one of these is a literal hex (`#b0532f`, `#8f421f`, `#6e3118`, `neutral-900`/`black`/`white`), never a `var()` indirection, and `btnOnDark` is a bare alias of `btnSecondary` (see findings table).

## Focus rings

`outline-none` hits: 3 total (`app/admin/analytics/login/page.tsx:39`, `app/error.tsx:47`, `components/forms/LeadForm.tsx:322`). Only the admin login field is a real ring-defeat (no compensating ring at all); `error.tsx` pairs it with an explicit `focus:ring-2`; `LeadForm.tsx`'s hit is on a `tabIndex={-1}` heading used for programmatic scroll-focus, not an interactive control. `focus-visible` recipes exist and are used in 4 files (`layout-utils.ts` plus 3 consumers), all routed through the site's own hardcoded-hex `focusRing`/`btnPrimary` strings, not the kit's token-based one.

## Webfont

`layout.tsx:2` imports `Plus_Jakarta_Sans` from `next/font/google`; `layout.tsx:17` sets `variable: "--font-plus-jakarta"`; `globals.css` binds `--font-sans: var(--font-plus-jakarta), ui-sans-serif, system-ui, -apple-system, sans-serif`, with a code comment dating the parity fix to 2026-09-28. **The brief's premise is CONFIRMED**: Plus Jakarta Sans is genuinely wired, not just commented as done. Kit's own `layout-utils.ts` does not itself set a font (`grep -rn "font" packages/web-shared/design/layout-utils.ts` returns only className strings containing `font-bold`/`font-medium`, no font-family declarations); the kit's font expectation lives in `globals-standard.css` instead, which this site does not import — no conflict found because the site defines its own equivalent token (`--font-sans`) directly.

## Hardcoded hex in `.tsx` (count by file)

`app/page.tsx` 48, `app/for/[slug]/page.tsx` 16, `app/services/[slug]/page.tsx` 14, `app/privacy-policy/page.tsx` 12, `components/brand/UnionJack.tsx` 11, `app/cookie-policy/page.tsx` 10, `app/services/page.tsx` 6, `app/for/page.tsx` 5, `components/layout/SiteFooter.tsx` 4, `app/terms/page.tsx` 4, `app/api/og/route.tsx` 4, `components/forms/LeadForm.tsx` 3, `app/error.tsx` 3, `components/research/HospitalityInsolvencyCharts.tsx` 2, `app/about/page.tsx` 1. Inline `style={{...}}` attributes: 16 total across `src`.

## Dead class names / served-CSS selector counts

Compiled stylesheet `hospitality/web/.next/static/css/c3a5006751273922.css` (86,616 bytes):
- `.section-label` rule: 1, resolves to `background:var(--accent,var(--brand-primary,#0f172a))` — reads `--brand-primary` (declared) with a fallback chain, no undefined read.
- `bg-primary-50` / `text-primary-600` / `ring-primary-100`: **0 / 0 / 0** — confirms the LeadCTAPanel badge finding live in the compiled build (not just source inspection).
- Arbitrary-value `primary-600/700/800` var() reads: 4 / 2 / 2 occurrences, all from kit components scanned via `@source`, not from anything this site's own code imports directly.
- No class defined in the site's own `globals.css` goes unused: the file defines exactly one selector rule (`.prose table:not(.not-prose *)`) and it is a deliberate structural fix, not a component class, so "used/unused" doesn't apply to it the way it would to a component stylesheet.

## Kit import census

Files under `hospitality/web/src` importing `web-shared/design`: `app/about/page.tsx`, `app/for/[slug]/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `components/layout/SiteHeaderWrap.tsx` (5 files).

Full `@accounting-network/web-shared` import census (`grep -rn 'from "@accounting-network/web-shared' hospitality/web/src | sed 's/.*from //' | sort | uniq -c | sort -rn`), 38 distinct import paths, led by `lead-nurture/tokens` (12), `lead-nurture/config` (10), `lead-nurture/send` (9), `console/consoleAuth` (7); design-surface imports are `design/marketing/LeadCTAPanel` (4) and `design/chrome/SiteHeader` (1) — the rest is nurture/console/analytics plumbing, not design.

## False premises / could-not-do

1. The brief states the `--radius`/`--brand-glow*` collapse trap applies "here" (i.e. to hospitality) because importing `globals-standard.css` needs those channels declared. **Verified wrong for this site as it stands**: `hospitality/web/src/app/globals.css` does not import `globals-standard.css` at all (only `tailwindcss` and `packages/site-styles/prose-standard.css`), so that specific collapse cannot occur today. It becomes live only if/when phase 1 adds that import — flagging as a forward-looking risk, not a current defect, and correcting the brief's implicit premise that the import already exists.
2. The brief asks to check `hospitality/web/src/lib/layout-utils.ts` "or wherever the site keeps its button/container recipes" — the actual path is `hospitality/web/src/components/ui/layout-utils.ts`, not under `lib/`. Brief's suggested path is wrong; found via search, not a blocker.
3. No other false premises found. Brand colour, webfont, and the `--brand-primary` token all matched the brief's stated values exactly.

Scratch used and deleted: none created outside the repo — all checks ran as direct `grep`/`node -e` one-liners with no intermediate files.
