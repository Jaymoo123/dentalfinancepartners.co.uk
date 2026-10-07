# G2 receipt — globals.css gap-fix after R1 + V-P1

Package: G2. Model: Sonnet. No subagents, no build, no server, no git state
changed. One file edited: `pharmacies/web/src/app/globals.css`.

## Fix 1 (blocker, R1 B1 / V1 B1) — DONE, in this file

Moved the skip-link focus rule out of `@layer components` to an unlayered
position, immediately after `@import "../../../../packages/site-styles/prose-standard.css"`
and before the ramp comment block (i.e. right after all the `@import`/`@source`
lines, still before `@theme`). Tailwind v4 layer order is
`base < components < utilities` regardless of source order, so the kit's
hardcoded `focus:bg-primary-600` (`packages/web-shared/design/chrome/PageShell.tsx`,
emitted into `@layer utilities`) always beat the site's rule in
`@layer components`. An unlayered author rule outranks every layer, including
utilities, so this wins unconditionally.

Diff:
```diff
@@ after the four @import lines, before the ramp comment @@
+/* G2 FIX (R1 B1 / V1 B1): deliberate unlayered exception, kit skip link focus
+   utility trap. Tailwind v4 cascade-layer order is base < components <
+   utilities regardless of source order, so the rule below ALWAYS lost to the
+   kit's hardcoded `focus:bg-primary-600` (packages/web-shared/design/chrome/
+   PageShell.tsx), which Tailwind puts in @layer utilities. Moved out of
+   @layer components (where A5 originally placed it) to here, unlayered,
+   after the @import "tailwindcss" line: an unlayered author rule outranks
+   every layer, including utilities. Scoped tightly to the one selector so
+   nothing else escapes layering. Rendered white-on-#0f3a4a = 12.18:1. */
+a[href="#main"]:focus { background-color: var(--color-primary-950); }

@@ inside @layer components, where A5 used to live @@
-  a[href="#main"]:focus { background-color: var(--color-primary-950); }
-
+  (comment kept, rule removed — see note added to the comment: "G2: the
+  actual rule moved out of this layer... a copy here would be dead weight.")
```

Chose the unlayered carve-out over `!important` because R1 named it
explicitly ("one deliberate unlayered carve-out, the same mechanism the kit
uses for h1..h6") and it keeps the brace-depth walk reporting exactly one
new, commented, deliberate unlayered row — same shape as the kit's own
motion-layer exception, not a surprise.

Not rendered-verified here (no build/server, per the G2 brief). Source-level
contrast is unchanged from P1-A's original figure: white on `#0f3a4a` =
**12.18:1**. A later phase (or R2) needs one Tab-and-measure pass to close
the loop V1 flagged ("re-verify the rendered ratio after, not just the
source value").

## Fix 2 (S3, inherited `h1..h6{line-height:1.2}`) — HANDOFF, not edited

Source is **not** this file. Confirmed by grep:
```
packages/web-shared/design/globals-standard.css:82:  line-height: 1.2;
```
It is the kit's own unlayered rule (`globals-standard.css` lines 80-83,
grouped with the `h1..h6{font-weight:700}` rule inside `@layer base` — the
`line-height` line itself sits outside that block, unlayered, by design).
Per the brief's own constraint, a hero-only layered override in this file is
not permitted (no new per-element rule), and the shared file is off-limits
to this package. No edit made.

**Measured effect (KNOWN AND ACCEPTED):** homepage h1 computes
`font-size 60px / line-height 72px` from the kit's unlayered `1.2`, beating
the hero's own `leading-[1.1]` utility (which would compute to 66px). This is
the same mechanism as the Medical trap R1 cites: an unlayered rule beats
every Tailwind v4 utility, by design, regardless of source order.

**Handoff diff, if the owner/manager later wants the 66px line-height
restored** (not applied — out of scope for a shared-package edit):
```diff
--- packages/web-shared/design/globals-standard.css
@@
-h1, h2, h3, h4, h5, h6 {
-  line-height: 1.2;
-}
+@layer base {
+  h1, h2, h3, h4, h5, h6 {
+    line-height: 1.2;
+  }
+}
```
Layering it would let a per-site `leading-[1.1]` utility (in `@layer
utilities`) win again, on every site that imports this kit file — an
estate-wide behaviour change, not a pharmacies-only one, which is why it is a
handoff and not a fix made here.

## Fix 3 (S2, "6 unlayered author rules") — reconciled, no edit needed

Grep across `globals.css`, `packages/site-styles/*.css`,
`packages/web-shared/**/*.css` for R1's six named rules:

| rule | source | layered? |
|---|---|---|
| `h1..h6{line-height:1.2}` | `packages/web-shared/design/globals-standard.css:82` | unlayered |
| `.hero-reveal` | `globals-standard.css:96` | unlayered |
| `.hero-reveal-delay` | `globals-standard.css:100` | unlayered |
| `.marquee-track` (+hover/focus-within) | `globals-standard.css:119,124-125` | unlayered |
| `.related-card` (+`:focus-within`) | `globals-standard.css:227,235,243,251` | unlayered |
| `.eyebrow-rule` | `globals-standard.css:265,270,274` | unlayered |

All six originate in the shared kit file, none in
`pharmacies/web/src/app/globals.css`. **0 unlayered rules authored by this
file; 6 inherited from the kit, all pre-existing and deliberate** (the file's
own header says consuming sites import it knowing these are unlayered).
Nothing to layer here, nothing to edit — matches V1's conclusion, not R1's
raw framing.

**Reconciling 149 (V1) vs 6 (R1): V1 is the right number, R1's 6 is a
subset.** V1's brace-depth walk ran on the *built* CSS and counted everything
the walker flags, including Next's font-loader `@font-face` blocks and
Tailwind v4's own `@property` declarations — neither is an author selector,
and both are unlayered by the frameworks that emit them, not by any site or
kit decision. Strip those out and what's left is the kit's own motion-layer
selectors (`h1..h6` line-height, `hero-reveal`, `marquee-*`, `related-card`,
`eyebrow-rule`, plus the few duplicated by responsive/pseudo-class variants
V1 also folds in, e.g. `.marquee-viewport:hover .marquee-track`). R1's "6"
is a hand-count of the distinct *rule families* in that same bucket, not a
different rule set. Both receipts agree on the load-bearing fact: **zero
unlayered rules come from pharmacies' own `globals.css`.**

## tsc check

```
cd pharmacies/web && npx tsc --noEmit
-> clean, no output
```

## Scope

Only `pharmacies/web/src/app/globals.css` touched. No build, no server, no
git command run. `layout.tsx` (W7) and `packages/**` (kit, manager-only) not
touched — Fix 2's kit diff above is a handoff for the manager to decide on,
not applied.
