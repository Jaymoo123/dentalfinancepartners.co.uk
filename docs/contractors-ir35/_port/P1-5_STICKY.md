# P1-5 -- StickyCTA restyle

File lease: `contractors-ir35/web/src/components/ui/StickyCTA.tsx` (only file touched).

Build/serve note: coordinator stopped concurrent `next build`/`next start` in this
site (shared `.next`, four agents in this wave). Everything below is a **static**
check (source read, character comparison). Nothing in this receipt was verified in
a rendered DOM. Marked UNVERIFIED where that matters; the coordinator will run one
serialised build at wave close and execute the verification list at the bottom of
this file.

## 1. The three attributes, before and after, character for character

| Attribute | Before (git blob, same file) | After (this edit) | Match |
|---|---|---|---|
| `data-cta` | `"sticky_cta"` | `"sticky_cta"` | unchanged, byte-identical |
| `data-cta-placement` | `"sticky"` | `"sticky"` | unchanged, byte-identical |
| `data-cta-goal` conditional | `` offer.href.startsWith("/contact") ? "form" : undefined `` | `` offer.href.startsWith("/contact") ? "form" : undefined `` | unchanged, byte-identical |

Diff of the `<a>` element (only `className` changed):

```diff
   <a
     href={offer.href}
     data-cta="sticky_cta"
     data-cta-placement="sticky"
     data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
     onClick={() => { if (intentAction) trackPersonalization("clicked", intentAction); }}
-    className={`${btnPrimary} shrink-0 whitespace-nowrap`}
+    className={`${btnPrimary} shrink-0 whitespace-nowrap`}
   >
```

No change at all to that element's attributes -- confirmed by re-reading both the
pre-edit and post-edit file: only the wrapping `<div>` and copy-block `<div>`
classNames, and the dismiss `<button>` classNames, changed. The `<a>` carrying the
three tracked attributes was not touched.

## 2. Listener check

`packages/web-shared/analytics/autoCapture.ts` (not edited -- read only, trap-12
respected):

```
100:  const cta = target.closest("[data-cta]");
102:    const goal = cta.getAttribute("data-cta-goal");
104:      cta_id: cta.getAttribute("data-cta") || "",
106:      placement: cta.getAttribute("data-cta-placement") || nearestSection(cta),
```

Listener reads exactly three attribute names: `data-cta`, `data-cta-goal`,
`data-cta-placement`. All three appear on the CTA `<a>` in this file, spelled
identically, before my edit and after it. No hyphen, no plural, no case
difference. **Listener match: YES**, checked both before and after the edit by
re-reading the file's `<a>` block against the grep above.

## 3. Measured contrast

Button: unchanged `btnPrimary` from `layout-utils.ts` -- `bg-cyan-700` (`#0e7490`)
ground, white text. Per `DESIGN_DELTA.md` §2 measured table: **5.36:1** (white
text on cyan-700 ground), floor 4.5, PASS. `layout-utils.ts` is outside my lease
and was not edited; I did not need to touch the button recipe because it already
binds to the 700 step, not 600 (design delta's binding-step rule already
satisfied there).

New decorative accents I added (`border-t-4 border-cyan-700`, `border-l-2
border-cyan-700`) are non-text, non-button-ground uses (a rule/border), so the
4.5:1 text/ground floor does not apply to them; not scored.

Self-test of method: not re-run here (no new text/ground pairing introduced --
the only text-bearing surface, the CTA button, is the pre-existing, already-
measured `btnPrimary` recipe). Delta doc's own self-test (slate-500/white = 4.76,
slate-400/white = 2.56) stands as the source verification.

## 4. Trigger / behaviour: current component vs. kit component (static read)

Read both `contractors-ir35/web/src/components/ui/StickyCTA.tsx` (this file,
pre- and post-edit) and `packages/web-shared/design/marketing/StickyCTA.tsx`
(kit, read-only).

| Behaviour | This site (before AND after this edit) | Kit component | Kept current? |
|---|---|---|---|
| Show trigger | `scrollY >= min(500px, 25% of scrollHeight)` | `scrollPercent > 30` (of scrollable range) | YES -- kit's 30%-of-scrollable differs from this site's 500px/25% cap; kit is NOT imported, current threshold code is untouched |
| Dismiss persistence | `sessionStorage` key `cfp_sticky_dismissed`, survives navigation within the session | in-memory `useState` only, resets on route change (no storage read/write in kit source) | YES -- sessionStorage logic untouched |
| Route exclusion | hides on `/admin`, `/embed` prefixes | no route exclusion in kit source (only a `packagesMode` + `/pricing` check, which this site does not use) | YES -- exclusion logic untouched |
| Converted-visitor suppression | `isConverted()` from `visitMemory`, checked in the paint gate and the final render gate | not present in kit source | YES -- untouched |
| Mount/SSR gate | renders `null` until `mounted` | no equivalent SSR gate visible in kit source | YES -- untouched |
| Personalisation ("shown"/"clicked" tracking, once per rule) | `useIntent`/`trackPersonalization`, own `IntentProvider` | kit exposes `offer`/`onOfferShown`/`onOfferClick` props for the same idea, but the caller (this file) still owns the actual intent source | YES -- untouched, own `IntentProvider` wiring kept exactly |

**Conclusion: I did not adopt the kit component.** Importing it as-is would have
changed the show-trigger threshold, dropped sessionStorage persistence, dropped
the `/admin`/`/embed` exclusion, and dropped the converted-visitor gate -- four
behaviour changes the brief (§3) forbids without an explicit owner yes I do not
have. It would also have rendered `border-primary-600`/`bg-primary-600`/
`text-primary-400`, Tailwind classes with no matching scale on this site (this
site defines only a single `--color-primary` var, not a `primary-50..950` ramp
-- confirmed by `grep -n "primary-600\|--primary" globals.css` returning no
numbered-step definitions), so those classes would generate no CSS and silently
no-op. I restyled the existing component in place instead: kit-style border
accents (`border-t-4`/`border-l-2` in cyan-700, matching this site's actual
brand-700 binding rather than the kit's unusable 600 literal) and a
`rounded-lg` dismiss-button hit target, with every visibility/persistence/
personalisation code path byte-for-byte unchanged. **Trigger unchanged: YES**
(static read of both files; not exercised in a browser -- UNVERIFIED in the
literal sense that no page was loaded).

## 5. Anchor-overlay check (P0D_CSS_A11Y, §5 of the brief)

Not my lease and not fixed here. `P0D_CSS_A11Y.md` already recorded 0/6 anchor
route families with `scroll-mt-*`, `#main` included. This edit changes only the
sticky bar's border/padding classes, not its `fixed bottom-0` positioning, its
height-affecting classes (`py-3`, `gap-4`, `max-w-5xl` all unchanged), or when it
mounts. **Does my change make the overlay worse? No** -- the bar's rendered
footprint is unchanged (a 4px top border adds visually inside the existing
shadow, not extra height budget beyond antialiasing), so it does not close more
of the viewport than before. UNVERIFIED in a live browser; asserted from the
unchanged layout classes.

## 6. Verification list for the coordinator's serialised build

Run against `next start` on a **new** port (never 3611, never `next dev`):

```
cd contractors-ir35/web
npm run build
npm run start -- -p <free-port>      # read the bound port from the server log
```

1. `curl -s http://localhost:<port>/ | grep -o "<title>[^<]*</title>"` -- assert
   it is contractors-ir35's real title (not a stale/other-site page) before
   trusting anything else.
2. Load any page long enough to scroll, e.g. `/` or a services page. Scroll past
   500px (or 25% of page height, whichever is smaller). Expect: the bar appears,
   `bg-neutral-900` ground, `border-t-4 border-cyan-700` top rule visible,
   `border-l-2 border-cyan-700` rule on the left of the copy block.
3. Inspect the CTA `<a>` in devtools: expect `data-cta="sticky_cta"`,
   `data-cta-placement="sticky"`, and `data-cta-goal="form"` when
   `offer.href` starts with `/contact` (the default offer does; a personalised
   `tool`/`guide` offer should have `data-cta-goal` ABSENT since its href does
   not start with `/contact`).
4. Click the CTA and confirm (via `read_network_requests` or console) an
   analytics event fires with `cta_id: "sticky_cta"`, `placement: "sticky"` --
   proof the listener is actually reading these attributes end to end, not just
   that the strings match by inspection.
5. Dismiss the bar, reload the same page: expect it stays hidden (sessionStorage
   `cfp_sticky_dismissed` = `"1"`). Navigate to `/admin` or `/embed` in the same
   session: expect it stays hidden regardless of scroll or dismiss state.
6. Visit a route with no intent topic, confirm the fallback offer
   (`niche.cta.sticky_*` from `niche.config.json`) renders; visit a route with a
   matched intent topic, confirm the personalised offer swaps in with label
   "Open calculator" / "Get free guide" / "Book a free call" per `offer.kind`.
7. Hand-measure the CTA button (white text, `bg-cyan-700`) with a contrast
   picker: expect ~5.36:1, matching the delta doc's table.

## Receipt

- Attributes preserved: **YES** (character for character, only the `<a>`'s
  `className` changed, not its tracked attributes).
- Listener match: **YES** (`autoCapture.ts` reads `data-cta`, `data-cta-goal`,
  `data-cta-placement` -- exact names, verified before and after the edit).
- Contrast ratio: **5.36:1** (white on `bg-cyan-700`, unchanged recipe, PASS
  against the 4.5 floor; new decorative borders are non-text/non-button-ground
  and out of scope for the ratio).
- Trigger unchanged: **YES** (static source comparison; the kit component was
  deliberately NOT imported because its default trigger, persistence, route
  exclusion and converted-gate all differ from this site's shipped behaviour --
  brief §3 requires keeping current behaviour in that case).
- Live-DOM verification: **NOT DONE**, on coordinator instruction (shared
  `.next`, concurrent builds forbidden this wave). Everything above is a static
  source-level check; the numbered list in §6 is what still needs a real
  `next start` pass.
- Brief accuracy: the brief's instruction to "move the sticky CTA to the kit
  component" is the one place I did not follow it literally --
  `DESIGN_DELTA.md` line 272 itself only says "RESTYLE to the kit sticky
  recipe. Keeps `data-cta="sticky_cta"` + `data-cta-placement="sticky"`", not
  "import the kit component", and the kit component as written would have
  broken three behaviours (trigger, persistence, route exclusion) and one
  colour recipe (no `primary-*` scale on this site) that the brief itself says
  not to touch without an owner yes. I restyled in place instead of importing.
  Everything else in the brief checked out against source.
