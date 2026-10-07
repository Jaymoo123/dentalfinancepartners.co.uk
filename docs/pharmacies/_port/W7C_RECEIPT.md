# W7C receipt — gap-fix after V2 final verification (pharmacies)

Package: W7C. Model: Opus. **No subagents. No `next build`, no `next dev`, no
server start or stop, no git state change (no stash, add or commit).** 3111 was
read only (curl for markup, and one read-only puppeteer band measurement against
the build already running, the same method V2 used). Nothing under `packages/**`,
`Property/**`, `globals.css` or `content/` was edited.

## 1. Files touched

| file | change | why |
|---|---|---|
| `src/components/intent/DeepScrollModal.tsx` | open-state gate + close retry, docstring | V2 blocker B1 |
| `src/tests/capture-exclusion.test.ts` | +3 tests (11 -> 14) | new guard covered, old check pinned out |
| `src/app/blog/[category]/[slug]/page.tsx` | key-takeaways band `bg-slate-50` -> `bg-white` | V2 adjacentSame |
| `src/app/calculators/page.tsx` | **nothing** | measured clean, see section 3 |

No visitor-facing string was added, removed or reworded. No href changed. No new
`data-cta` id, storage key, disclosure, banner or cadence.

## 2. Fix 1 (blocker B1) — the guard, exactly before and after

**Before** (`DeepScrollModal.tsx:82`, W7B):

```ts
    // Never open over an open widget panel (B2).
    if (document.querySelector('.capture-widget [role="dialog"]')) return;
```

**After** (`DeepScrollModal.tsx:94-98` helper, `:118-131` gate):

```ts
function widgetPanelOpen(): boolean {
  const launcher = document.querySelector(".capture-widget button[aria-expanded]");
  if (launcher) return launcher.getAttribute("aria-expanded") === "true";
  const panel = document.querySelector('.capture-widget [role="dialog"]');
  return !!panel && panel.getClientRects().length > 0;
}
```

```ts
    if (widgetPanelOpen()) {
      const mount = document.querySelector(".capture-widget");
      if (!mount) return;
      const obs = new MutationObserver(() => {
        if (!widgetPanelOpen()) setPanelClosed((n) => n + 1);
      });
      obs.observe(mount, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-expanded"],
      });
      return () => obs.disconnect();
    }
```

with `const [panelClosed, setPanelClosed] = useState(0);` (`:108`) and the open
effect's deps now `[action, open, panelClosed]` (`:142`).

**What the kit actually exposes, read line by line (read-only).**
`packages/web-shared/support/SpecialistWidget.tsx`:

- `:79` `const [open, setOpen] = useState(false)` — panel state is React-local.
- `:641-652` `{open && (<div role="dialog" aria-modal={isModal ? "true" : undefined} ...>)}`
  — **the panel is MOUNTED ONLY WHILE OPEN**. No `data-state`, no `hidden`, no
  `aria-hidden`. `aria-modal` is NOT an open signal: it only appears once the
  visitor focuses into the panel (`isModal`, see `:88, 467`), so an auto-opened
  untouched panel has no `aria-modal` at all.
- `:852-857` the launcher `<button>` carries `onClick`, `data-cta` and
  `className` and **no `aria-expanded`**.
- `:416-478` the auto-open: a `setTimeout(..., AUTO_OPEN_DELAY_MS)` that runs on
  every pageview at `innerWidth >= 768`, `setOpen(true)` at `:469`, suppressed
  per session only in `NODE_ENV === "production"` (`:421-422`). V2's claim that
  it auto-opens on desktop is confirmed in source.

So the most reliable signal the kit exposes today is **mount + paint**, and the
guard prefers an explicit `aria-expanded` the moment the kit grows one. That is
why `widgetPanelOpen()` reads the launcher attribute first and falls through to
mount-and-paint. **Kit handoff diff, manager-only, one line** — landing it needs
no change here, the guard picks it up automatically:

```diff
--- a/packages/web-shared/support/SpecialistWidget.tsx
+++ b/packages/web-shared/support/SpecialistWidget.tsx
@@ (the launcher <button>, around :852-857)
         <button
           ref={launcherRef}
           type="button"
+          aria-expanded={open}
           onClick={() => (open ? closePanel() : handleOpen(false))}
           data-cta={config.ctaId}
           className={c.launcher}
         >
```

**The real defect was not the selector, it was the one-shot `return`.** W7B's
check is in fact *correct* about whether the panel is open (the panel cannot be
in the DOM while closed). What killed the modal on desktop is that the effect's
deps were `[action, open]`, so the gate was evaluated once, while the kit's
auto-opened panel was up, and never again for that page load. The fix is both
halves: an explicit open-state read, and a `MutationObserver` on the
`.capture-widget` mount that re-runs the gate when the panel closes.

**Recorded decision — auto-opened, untouched panel.**

| state | modal behaviour | reason |
|---|---|---|
| kit panel auto-opened, visitor has not touched it | **counts as OPEN**, modal does not fire | the panel is painting; do not fight the kit's auto-open, it is estate-wide behaviour (`SpecialistWidget.tsx:416-478`) |
| that panel then closed (by the visitor, or by the kit) | modal **can fire**, once, at the next scroll-depth evaluation | the observer re-arms the gate; the offer is delayed, not lost |
| visitor opened the panel themselves and it is still open | modal does not fire | unchanged from W7B, and the one direction V2 proved PASS (its check b2) |
| panel closed at the moment the depth rule fires | modal fires immediately | unchanged |

**The rest of the W7B exclusion table is intact**, verified by reading each line
after the edit:

| rule | still implemented as | file:line |
|---|---|---|
| modal open -> sticky bar hidden | `data-surface-open` on `<html>` + the one CSS rule | `DeepScrollModal.tsx:156-159`, `layout.tsx:65-66`, `StickyCTA.tsx:147` |
| modal open -> widget launcher + panel hidden | same flag, same rule, `.capture-widget` on the mount | `layout.tsx:65-66, 83` |
| modal never opens while the panel is genuinely open | **changed, section above** | `DeepScrollModal.tsx:94-98, 118-131` |
| ReturningBar and sticky bar never both show | `returning` gate | `StickyCTA.tsx:74, 128` |
| ONE deep-scroll offer per page-load session | module `shownThisSession` | `DeepScrollModal.tsx:67, 111, 136` |
| 30-day per-topic suppress | `localStorage pfp_deepscroll_<topic>` | `DeepScrollModal.tsx:47-63` |
| focus trap, Escape, focus return | untouched; the capture still sits inside the open effect, before `setOpen(true)` | `DeepScrollModal.tsx:133-136, 161-190` |

The flag is still set in an effect and removed in its cleanup, and the observer
is disconnected in the gate branch's cleanup, so an unmount or a route change
strands nothing.

## 3. Fix 2 (cosmetic) — adjacent bands

**Measured first, on the running 3111 build**, with the instrument's own
`bandEls`/`groundOf` logic (`docs/_engines/instruments/browser_check.mjs:396-422`)
at 390 / 768 / 1440. V2 reported "`/calculators` x3 widths + 2 blog posts"; the
measurement names the actual elements:

| route | band sequence (768) | the shared-ground pair |
|---|---|---|
| `/blog/<cat>/<slug>` | slate-200 rule, **slate-50**, **slate-50**, primary-50, slate-50 | key-takeaways `<aside>` (`bg-slate-50`) against `MiniCapture`'s `bg-[var(--surface)]` (= `#f8fafc`, `src/components/calculators/MiniCapture.tsx:68`) |
| `/calculators` (the hub) | primary-950, slate-50, white | **none — this route is clean at every width** |
| `/calculators/<slug>` x3 | primary-950, **white**, **white**, slate-50 | two `bg-white py-12 sm:py-16` sections, `src/app/calculators/[slug]/page.tsx:111` and `:135` |

**Blog, fixed here.** `src/app/blog/[category]/[slug]/page.tsx` — the
key-takeaways band moves `bg-slate-50` -> `bg-white`, keeping `border-slate-200`
so the box still has an edge. Sequence becomes
white -> slate-50 -> primary-50 -> slate-50: no two adjacent bands match, and
the last band before the navy footer is still the light `LeadCTAPanel`
(`contained`, `ground="slate"`). Contrast on the new white ground:
`text-slate-900` 17.74, `text-slate-700` 9.70, both PASS. This is template-wide,
so it closes the pair on all 22 posts, not only the two V2 sampled. No wording,
no link, no new ground token.

**`/calculators` hub: no edit, because there is no defect.** V2's label was the
URL prefix, not the hub route. The hub measures navy -> slate-50 -> white at 390,
768 and 1440: already alternating.

**`/calculators/[slug]`: NOT FIXED, out of this package's edit scope.** The file
is `src/app/calculators/[slug]/page.tsx`, which W7C was not allowed to touch.
The whole fix is one class, and UB's own comment at `:95-110` explains it chose
`bg-white` for the wrapping section specifically to differ from the inner result
section — it moved the clash rather than closing it, because the explainer
section two below is also `bg-white`. Handoff:

```diff
--- a/pharmacies/web/src/app/calculators/[slug]/page.tsx
+++ b/pharmacies/web/src/app/calculators/[slug]/page.tsx
@@ -111 +111 @@
-        <section className="bg-white py-12 sm:py-16">
+        <section className="bg-slate-50 py-12 sm:py-16">
```

giving navy -> slate-50 -> white -> slate-50 on all three tool routes. `slate-50`
is already a measured ground on that route (the last band uses it via
`bg-[var(--surface)]`), so no new contrast row is needed; the calculator card
inside is white and keeps its edge.

**Residual, kit-owned, 390 only.** On a blog post at 390 the three
`RelatedArticles` cards (`bg-white`, `w-full`) collapse to one column and the
instrument counts them as three adjacent same-ground bands. They are sibling
cards in a kit grid (`packages/web-shared/.../RelatedArticles.tsx`), not page
bands, and closing it needs a kit change. Logged, not a defect this package can
reach.

## 4. Fix 3 — the "editorial rewording on one blog post" is an instrument artifact

V2's prose section flagged `/blog/nhs-contract-and-income/pharmacy-closures-independents-vs-multiples`
("Small group pharmacies grew" -> "Small-group pharmacies ... between January 2021
and May 2026"). **No prose changed. Nothing to restore.** Three independent
proofs:

1. `git diff --stat port-pharmacies-phase0 -- pharmacies/web/content/blog/` is
   **empty**, and so is `git diff --name-only port-pharmacies-phase0 -- pharmacies/web/content/`.
   Not one content file has moved since phase 0.
2. `diff` of the post against `git show port-pharmacies-phase0:...` is identical
   once CRLF is normalised (`tr -d '\r'`): `IDENTICAL_AFTER_EOL_NORMALISE`.
   The raw `1,107c1,107` V2-style whole-file diff is a line-ending artifact of
   `git show` emitting LF against a CRLF working tree, nothing more.
3. The cause is in V2's own script. `prose_check.mjs:29` builds its source text
   with `.replace(/[#*_`>\-]/g, " ")` — it **strips hyphens from the source**, so
   the phase-0 literal "Small-group pharmacies grew..." became
   "Small group pharmacies grew..." and could not match the rendered HTML, which
   `curl` confirms still reads **"Small-group pharmacies grew from 4,024 to 5,075
   over the period"**, hyphen intact. The "date-anchored" variant V2 quoted is a
   *different, also-unchanged* string: the FAQ answer in the same file's
   frontmatter ("...grew from 4,024 to 5,075 between January 2021 and May 2026").
   V2 compared a body sentence against a FAQ sentence from the same untouched file.

So this is neither M1b's breadcrumb truncation nor K9's FAQ plain-text: it is a
hyphen-stripping normaliser in the check. The FAQ strings ARE newly *visible* on
22 posts (K9's `FaqSection`, already flagged for the owner in UB's receipt), but
they are the frontmatter's own words, unchanged. **Left as is.**

## 5. Acceptance, run now

```
$ cd pharmacies/web && npx tsc --noEmit
(no output, exit 0)

$ cd pharmacies/web && npx vitest run
 Test Files  8 passed (8)
      Tests  86 passed (86)
```

Baseline was 83 (V2). The delta is +3 in `src/tests/capture-exclusion.test.ts`
(11 -> 14), and one existing test was rewritten rather than added to:

| test | pins |
|---|---|
| "the modal never opens over an open widget panel" (rewritten) | `if (widgetPanelOpen()) {` and the helper's signature |
| "the open-state signal is aria-expanded first, mount-AND-paint second" (new) | both branches of `widgetPanelOpen()`, so the preference order cannot be reversed and the paint check cannot be dropped |
| "REGRESSION PIN: the old bare presence check must not come back" (new) | `expect(modal).not.toContain("if (document.querySelector('.capture-widget [role=\"dialog\"]')) return;")` — the V2 blocker cannot be reintroduced |
| "a closed panel re-arms the gate..." (new) | the `MutationObserver`, its `attributeFilter`, its `disconnect()`, and `}, [action, open, panelClosed]);` — the deps line is the half that actually fixes the blocker, so it is pinned explicitly |

Suite still runs in the `node` environment with no DOM, so like
`focus-ring.test.ts` these pin each rule at its source line. The behavioural
proof is the walk below.

## 6. How the manager verifies this on the next build, at 1440

Needs a fresh `next build` + `next start` (3111 serves the pre-W7C build;
these steps will NOT pass against it). Run in a real desktop window at 1440x900,
on `/blog/nhs-contract-and-income/category-m-clawbacks-explained`.

**Step 1 — the auto-open still wins first, and the modal correctly stands down.**
Load the page, do nothing for ~10s. The kit panel auto-opens.
`widgetPanelOpen` equivalent in the console:

```js
document.querySelectorAll('.capture-widget [role="dialog"]').length  // 1
```

Now scroll to 80% and wait 5s.
`document.documentElement.hasAttribute("data-surface-open")` is **false** and
`document.querySelectorAll('[role="dialog"]').length` is **1**. This is correct
and unchanged: an auto-opened panel counts as open.

**Step 2 — the fix. Close the panel and keep scrolling.** Click the launcher (or
the panel's close button) so the panel unmounts:

```js
document.querySelectorAll('.capture-widget [role="dialog"]').length  // 0
```

Scroll down a little more (or back up and past 70% again) and wait ~3s. **The
deep-scroll modal now opens** — this is the step that fails on the pre-W7C
build, where the modal never fires again for the page load:

```js
document.documentElement.hasAttribute("data-surface-open")                 // true
getComputedStyle(document.querySelector(".capture-sticky")).display        // "none"
getComputedStyle(document.querySelector(".capture-widget")).display        // "none"
document.querySelectorAll('[role="dialog"]').length                       // 1 (the modal)
```

**Step 3 — Escape releases everything.** Press Escape:
`data-surface-open` is gone, `.capture-sticky` is back to `display: block`,
0 dialogs remain, and `document.activeElement` is whatever was focused before
the modal opened (press Tab once before step 2 to have a known element).

**Step 4 — one offer only.** Reload (same tab, same session). Scroll to 80% with
the panel closed. The modal does **not** reappear: the 30-day per-topic suppress
holds. Clear `localStorage.removeItem("pfp_deepscroll_<topic>")` to repeat.

**Step 5 — the visitor-opened direction, unchanged.** Fresh load, open the panel
yourself, scroll to 80%, wait 3s: still exactly 1 dialog (the widget's), modal
absent, conversation intact. This is V2's check b2 and must stay PASS.

**Step 6 — 390, the W7B geometry, must not have moved.** At 390 scroll a post
past 30%: `document.querySelector(".capture-sticky").getBoundingClientRect().height`
is **72**, heading one line. Nothing in W7C touches `StickyCTA.tsx`.

**Step 7 — the grounds.** Re-run
`node docs/_engines/instruments/browser_check.mjs --site=pharmacies --base=<new base> --grounds`.
Expect `darkOnDark 0` (unchanged) and `adjacentSame` down from 5 to the two
residual classes named in section 3: the three `/calculators/<slug>` routes
(until the one-line handoff lands) and the 390-only `RelatedArticles` card grid
on blog posts. Every blog post's slate-50/slate-50 pair at 390 and 768 is gone.

## 7. What did not move

`cta_snapshot.mjs` cannot move: no `data-cta` id, placement or goal changed, and
every W7C change is either client-only logic or one Tailwind ground class.
Link floor cannot move: no `href` touched. `sweep.mjs` dash counts cannot move:
no visitor-facing string touched, and no em- or en-dash was added to `src`.
`leadConsentText`, `niche.config.json`, `overrides.csv` and everything under
`content/` are untouched. No new monitor, alert, cron, email, digest, popup or
banner, and no change to an existing one's cadence or recipients.

## 8. Agents used: 0 (hard rule, no subagents launched)
