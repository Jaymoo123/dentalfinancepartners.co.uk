# W7B receipt — R2 gap-fix on the capture layer (pharmacies)

Package: W7B. Model: Opus. **No subagents. No `next build`, no `next dev`, no
server start, no curl against :3111 (it serves a pre-fix build, so it could only
mislead), no git command.** Files touched are W7's own plus the capture and
noscript regions of `layout.tsx`. Nothing under `packages/**`, `globals.css`,
`Property/**`, the hub/detail templates, or any other package's files.

## 1. Files touched

| file | change | lines |
|---|---|---|
| `src/components/ui/StickyCTA.tsx` | B1 width gate + clamp, `capture-sticky` hook, note 5 | +23 |
| `src/components/intent/DeepScrollModal.tsx` | B2 surface flag + widget-panel gate, focus-return moved to open, exclusion note | +27 |
| `src/app/layout.tsx` | S4 noscript lines, B2 exclusion rule, `capture-widget` on the widget mount | +12 |
| `src/tests/capture-exclusion.test.ts` | NEW, 11 tests | 86 |

`ReturningBar.tsx`, `NextStepOffer.tsx`, `SupportProvider.tsx`, `lib/intent/*`
and `lib/assistant/opener.ts` needed no change; the rules they own already hold
(§3 row 3, §3 row 4). No visitor-facing string was added, removed or reworded
anywhere in this package.

## 2. B1 — the 390 sticky bar and the launcher

**Finding (R2 B1):** bar `h=188` at 390x900 (21% of the viewport) because the
personalised heading wrapped one word per line; the kit launcher
(`fixed bottom-24 right-4 z-[55]`, y=752..804) sat inside the bar's rectangle
(y=712..900) over the primary button and half the dismiss.

**Fix, two lines of real change:**

- `StickyCTA.tsx:77-82` — a `wide` state from
  `window.matchMedia("(min-width: 640px)")`, and `StickyCTA.tsx:131`
  `const offer = wide && visible && action && !isConverted() ? action.offer : null;`
  Below 640 the bar renders the **pre-wave generic copy verbatim**
  (`niche.cta.sticky_primary` / `_secondary` / `_button`), so its box model is
  the pre-wave box model: `border-t-4` + `py-3`×2 + the `min-h-[44px]` button =
  **72px**, with the secondary line already `hidden sm:block`. The bar can
  therefore never be taller at 390 than it was before the wave.
- `StickyCTA.tsx:153` — `line-clamp-1` on the heading `<p>`, so no future copy,
  at any width, can grow the bar by wrapping. The text column keeps its existing
  `min-w-0 flex-1` (unchanged), so it still cannot collapse either.

**The launcher: offset kept, not hidden.** `bottom-24` = **96px** > the bar's
capped **72px**, so the launcher clears the bar's rectangle by 24px at every
width and stays keyboard-reachable — which is why this is the offset route and
not the hide route R2 offered as the alternative. No change to
`widget-config.ts` was needed and none was made; the kit widget's own footer
observer (`packages/web-shared/support/SpecialistWidget.tsx:131-195`) continues
to lift it clear of the footer, and the bar's own footer retreat (W7 §7) is
untouched.

**Manager verification on the build:** at **390**, scroll a blog post past 30%:
the bar's `getBoundingClientRect().height` is **72** (was 188), its heading is
one line and reads the generic `niche.cta.sticky_primary`, and the launcher's
rect bottom (viewportHeight − 96) is above the bar's top (viewportHeight − 72).
At **1440** the heading is the personalised `offer.title` on one line and the
bar is 2 lines of text, same height as the pre-wave bar.

## 3. B2 — mutual exclusion, rule table with the Property source lines

Property mounts the three surfaces side by side
(`Property/web/src/app/layout.tsx:144-146`) with **no cross-surface gate at all**:
its separation is (a) the engine handing one surface at a time
(`evaluate(surface, ctx)`, `packages/web-shared/support/engine.ts:88-138`;
Property's fork is `Property/web/src/components/intent/IntentProvider.tsx:80-84`),
(b) the module session flag at `Property/web/src/components/intent/DeepScrollModal.tsx:33`,
and (c) the z-stack `z-50` bar / `z-40` returning bar / `z-50` modal
(`Property StickyCTA.tsx:80`, `ReturningBar.tsx:39`, `DeepScrollModal.tsx:79`).
That is precisely what let three surfaces publish one offer here at 1440, so the
gate is made explicit — stated plainly because it is a **deviation from
Property**, in Property's direction of intent but not its code.

| rule | implemented as | file:line | Property source |
|---|---|---|---|
| modal open → sticky bar hidden | `data-surface-open` on `<html>`, one CSS rule hides `.capture-sticky` | `DeepScrollModal.tsx:106-110`, `layout.tsx:65-66`, hook at `StickyCTA.tsx:147` | none (Property has no gate; `StickyCTA.tsx:80` z-50 vs `DeepScrollModal.tsx:79` z-50) |
| modal open → widget launcher + panel hidden | same flag, same rule, `.capture-widget` on the widget **mount** in `layout.tsx` (kit file not edited) | `layout.tsx:65-66`, `layout.tsx:83` | none |
| modal never opens while the widget panel is open | `if (document.querySelector('.capture-widget [role="dialog"]')) return;` — the panel is the only `[role="dialog"]` the widget renders, and only while open | `DeepScrollModal.tsx:82` | kit `SpecialistWidget.tsx:641-645` |
| ReturningBar and sticky bar never both show | `const returning = useIntent("returning_bar")`; `if (dismissed \|\| bare \|\| returning) return null;` | `StickyCTA.tsx:74, 128` | `Property/.../ReturningBar.tsx:13` (dismiss key); the bar gate itself is W7's, Property has none |
| ONE deep-scroll offer per page-load session, across topics | module-level `let shownThisSession = false` | `DeepScrollModal.tsx:67, 79` | `Property/.../DeepScrollModal.tsx:33` |
| 30-day per-topic suppress | `localStorage` `pfp_deepscroll_<topic>`, 30d | `DeepScrollModal.tsx:47-63` | `Property/.../DeepScrollModal.tsx:13-29` |
| modal keeps the keyboard while up | focus trap + Escape, untouched | `DeepScrollModal.tsx:113-142` | none (added by W7, neither source copy has one) |

The flag is set in an effect and **removed in that effect's cleanup**, so an
unmount, a route change or a close all release it; nothing can strand the sticky
bar or the widget hidden.

**Manager verification on the build:** at **1440**, scroll one post to 80% so the
modal fires. `document.documentElement.hasAttribute("data-surface-open")` is
`true`; `document.querySelectorAll('[class*="fixed"]')` filtered to painted fixed
overlays yields **1**, not 3; the sticky bar and the widget container both
compute `display: none` (`getComputedStyle(...).display`). Close the modal: the
attribute is gone and both re-appear. Then, on a fresh load, open the widget
panel first and scroll to 80%: the modal does **not** appear and the conversation
survives. At **390** repeat the 80% scroll: same single overlay.

## 4. Focus return (V1's unverified half of H8-9)

The pre-open element was being captured in the trap effect, which runs **after**
the panel has rendered, so on some paths `document.activeElement` had already
moved. It now stores it in the **open** effect, immediately before `setOpen(true)`
(`DeepScrollModal.tsx:83-85` (between the gate and `setOpen(true)` at `:86`)), and `close()` still calls
`returnFocusRef.current?.focus?.()` (`DeepScrollModal.tsx:100`).

V1's observed "focus after Escape landed on BODY" is consistent with a correct
implementation when the reader scrolled without ever focusing anything (there is
no pre-open element to return to); the fix removes the one real ordering hole.
Covered by the test in §6 (the capture sits inside the open effect, pinned by
slicing the source between the gate and `setOpen(true)`).

**Manager verification:** at 1440, click a link or press Tab once to put focus on
a known element, then scroll to 80%; when the modal fires, press Escape and read
`document.activeElement` — it is the element focused before the modal opened.

## 5. S4 — the noscript release for `.story-numeral`

`globals.css:303,308` collapse `.story-numeral` to `slate-200` (1.18 on the
band's `slate-50`) and `.story-numeral-rule` to `scaleX(0)` under
`[data-draw="off"]`, and `NumberedReasons` ships `data-draw="off"` in the server
HTML, so with JS off the six numerals were ghosts and the six rules were absent.
Two lines added to the **existing** `<noscript>` block, beside K4's
(`layout.tsx:52-56`):

```css
[data-draw="off"] .story-numeral { color: var(--color-primary-700) !important; }
[data-draw="off"] .story-numeral-rule { transform: none !important; }
```

`!important` is required: the collapsed state lives inside a `@layer` **and** a
`prefers-reduced-motion: no-preference` query, so specificity alone would lose.
`primary-700` is the lit resting value from `globals.css:284-285` (5.1 on slate-50),
not a new colour.

**Manager verification:** `nojs.mjs` again (or puppeteer
`setJavaScriptEnabled(false)`) on `/`: all six `.story-numeral` compute
`rgb(23,115,146)` and all six `.story-numeral-rule` compute `matrix(1,0,0,1,0,0)`.
Screenshot shows 01…06 in brand teal with their rules drawn.

## 6. Acceptance, run now

```
$ cd pharmacies/web && npx tsc --noEmit
(no output, exit 0)

$ cd pharmacies/web && npx vitest run
 Test Files  8 passed (8)
      Tests  83 passed (83)
```

Baseline was 7 files / 72 tests; the delta is `src/tests/capture-exclusion.test.ts`
(**11 tests**) covering: the `data-surface-open` set AND its removal, both CSS
targets plus both class hooks, the widget-panel gate, the returning-bar gate, the
session flag, the focus trap + the focus-return capture **position**, the 640
offer gate, `line-clamp-1`, `min-w-0 flex-1`, and the two noscript lines. It runs
in the `node` environment with no DOM and no testing-library (as
`vitest.config.ts` dictates), so like `focus-ring.test.ts` it pins each rule at
its source line: deleting any one of them fails the suite. The behavioural proof
is the manager's build walk above, not this file. `focus-ring.test.ts` is green
with the three edited `.tsx` files in its corpus.

## 7. Other R2 items naming W7 files

| R2 item | verdict |
|---|---|
| **B1** | fixed, §2 |
| **B2** | fixed, §3 |
| **S4** (`layout.tsx` `<noscript>`) | fixed, §5 |
| H8-9 focus return (V1 "unverified") | fixed, §4 |
| **M-f** — the widget launcher renders and looks clickable with JS off | kit behaviour, in `web-shared` (manager-only). Not fixable from here and R2 logs it as log-only. Unchanged. |
| **S1, S3, S6, S7, M-b** | none of these name a W7 file (W5/W6/W2/G3/M1 own them). Not touched. |
| §5 item 6, "retire the forked `StickyCTA`" | uplift, explicitly. The fork is still 1 file; this package made it smaller in behaviour (the swap is now width-gated), not larger. |

## 8. What did not move

`sticky_cta|sticky|null` and `sticky_cta_close|sticky|null`: unchanged, ids,
placements, absent `data-cta-goal` and the `/contact` `href` in server HTML. The
offer swap is still gated on `visible` (a client scroll) **and now also** on a
client `matchMedia`, so the server HTML carries strictly less personalisation
than before, never more — `cta_snapshot.mjs` cannot move. No new `data-cta` id,
no new storage key, no new disclosure, banner, popup or cadence
(`clarity_removed_pecr_decision` holds). `leadConsentText` untouched. Link floor
cannot move: every change is client-only or a hidden-state CSS rule. No em-dash
in any string a visitor can see.
