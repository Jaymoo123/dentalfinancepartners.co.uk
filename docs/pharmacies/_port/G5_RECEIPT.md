# G5 — gap-fix after R4 (N2 regression, S1, S7, m1)

Scope held exactly: **three files touched**, all inside the lease —
`pharmacies/web/src/app/globals.css`,
`pharmacies/web/src/app/research/pharmacy-density-and-workload-index/page.tsx`,
`pharmacies/web/src/app/research/pharmacy-openings-closures-index/page.tsx`.
`src/components/research/PharmacyIndexCharts.tsx` was read and deliberately
**not** changed (reason in Fix 3). No build, no server start/stop, no subagent,
**no git command that changes state** — the only git calls made were
`git diff --stat` and `git stash list` (stash list empty before and after, i.e.
G4's stash incident is not repeated here). The whole port is still one
uncommitted working tree, so `git diff` cannot isolate G5; the diff below is the
hand-written before/after of every line G5 changed.

The port's own diff totals are unchanged in shape: `globals.css` and the two
research pages are the only files whose content moved in this task.

---

## FIX 1 — N2, the G4 ring regression (serious)

### What G4 actually shipped, and why it broke

G4 added a light-card reset so a focusable inside a white card inside a dark
band would not paint a white ring on the white card. The selector was
unscoped:

```css
.ground-dark .bg-white,
.bg-slate-900 .bg-white,
.bg-primary-950 .bg-white,
.bg-primary-800 .bg-white { --focus-ring: var(--focus-ring-on-light); … }
```

`.bg-white` matches **any** descendant painted white — including a white CTA
*link*, which on this site is the dominant white element on a dark band.
R4's `probe3.json` ringScan, read directly, is unambiguous on all four it
sampled:

```
/            "Speak to a pharmacy accountant"  ring #0f3a4a  ringRatio 1  parentGround [15,58,74]  ownBg rgb(255,255,255)  cls "inline-flex min-h-12 … rounded-xl bg-white p…"
/            "FP34 reconciliation service"     ring #0f3a4a  ringRatio 1  parentGround [15,58,74]  ownBg rgb(255,255,255)
/services/pharmacy-sale-cgt-badr  "Get in touch"  ring #0f3a4a  ringRatio 1  parentGround [15,58,74]  ownBg rgb(255,255,255)
/for/buying-a-pharmacy            "Get in touch"  ring #0f3a4a  ringRatio 1  parentGround [15,58,74]  ownBg rgb(255,255,255)
```

Sources confirm each is an `<a>`/`<Link>` with solid `bg-white` painted
directly on a `bg-primary-950` section, no card between them:
`page.tsx:371` (hero), `page.tsx:513` (NHS-contract band),
`services/[slug]/page.tsx:125`, `for/[slug]/page.tsx:106`. 8 service slugs +
5 audience slugs + 2 on `/` = the 15 rings on 14 routes R4 counted.

### The reasoning that decides the scope

Every ring recipe on this site carries `outline-offset-2`. **The ring does not
paint on the control — it paints two pixels outside it, on whatever the control
is sitting on.** That single fact separates the two cases cleanly:

- A white **control** on a dark band: the ring lands on the **dark band**. It
  must stay the dark-band ring (white). The control's own white fill is
  irrelevant — nothing paints there.
- A white **container** on a dark band: the ring of a child focusable lands on
  the **white container**. That child must get the light ring (navy). Only a
  container changes the ground its children's rings land on.

So the reset belongs on containers only. Chosen scope:
`:not(a):not(button)` appended to the existing four selectors — smaller than an
element whitelist (`div.bg-white, section.bg-white, …`) and checked rather than
assumed. Grepped every solid `bg-white` (excluding `bg-white/*` opacity tints)
in `packages/web-shared/design` and `pharmacies/web/src`: **every focusable one
is an `<a>`/`<Link>` or a `<button>`**. No `input`, `select`, `textarea`,
`summary` or `label` carries a solid `bg-white` in either tree.

`input` is deliberately **not** excluded, against R4's suggested
`:not(a):not(button):not(input)`. A white input *is its own white ground* — a
ring at +2px offset on a white input inside a white card lands on white either
way — so it must keep the navy ring, which is exactly what matching it here
gives it. Excluding it would have re-opened the invisible-ring case G4 was
right to guard.

### Diff

```diff
-  .ground-dark .bg-white,
-  .bg-slate-900 .bg-white,
-  .bg-primary-950 .bg-white,
-  .bg-primary-800 .bg-white {
+  .ground-dark .bg-white:not(a):not(button),
+  .bg-slate-900 .bg-white:not(a):not(button),
+  .bg-primary-950 .bg-white:not(a):not(button),
+  .bg-primary-800 .bg-white:not(a):not(button) {
     --focus-ring: var(--focus-ring-on-light);
     --kit-focus-ring: var(--focus-ring-on-light);
   }
```
(plus a comment block above it recording the regression, the offset reasoning,
the grep that bounds the scope, and why `input` stays matched.)

### Expected computed ratios, case by case

Luminances used: `#0f3a4a` = [15,58,74], L 0.0363. `#ffffff` L 1.0.
`slate-900` [15,23,43], L 0.0160.

| case | element | ring token after fix | ring colour | ground the ring lands on | ratio |
|---|---|---|---|---|---|
| white CTA link on dark band (R4's 15) | `a.bg-white` child of `.bg-primary-950` — reset no longer matches, so it inherits on-brand from the band | `--focus-ring-on-brand` | `#ffffff` | `[15,58,74]` | **12.17** (was **1.00**) |
| same, if ever painted on `bg-slate-900` | `a.bg-white` | on-brand | `#ffffff` | `[15,23,43]` | **17.83** |
| plain link inside a white card on a dark band | `a` inside `div.bg-white` inside `.bg-slate-900` — the **div** matches the reset, the link inherits navy | `--focus-ring-on-light` | `#0f3a4a` | white card | **12.18** |
| LeadCTAPanel's form inputs (G4's real case, `LeadCTAPanel.tsx:103`/`192`) | `input` inside `div.bg-white` inside `section.bg-slate-900` | on-light | `#0f3a4a` | white card | **12.18** |
| a white-filled link *nested inside* a white card on a dark band | `a.bg-white` inside `div.bg-white` — `:not(a)` skips the link, but the card already rebound to navy, so it inherits navy | on-light | `#0f3a4a` | white card | **12.18** |

The last row is why `:not(a):not(button)` is safe rather than merely smaller:
excluding the control from the reset never strands it, because the nearest
matching **ancestor** already carries the right token for the ground the ring
will land on.

---

## FIX 2 — S1, the 10 rings at 1.56 (serious, open since R2)

### Per-element determination of all 10

R4's diagnosis is correct and is the reason this is *not* a selector-list gap:
`--focus-ring` on the parent already resolves to `#fff` on each (G4 works).
The element simply has **no ring recipe at all**, so it falls through to the UA
`outline-style: auto`, 1px, `rgb(16,16,16)` = 1.56 on `[15,58,74]`.

| # | route | link | ground | why it was 1.56 | closed by |
|---|---|---|---|---|---|
| 1 | `/` | "reimbursement and remuneration…" (`page.tsx:482`) | `bg-primary-950` | prose `<a>`, `className` = `underline underline-offset-2 text-teal-200 hover:text-white`, no `focusRing` | Fix 2 |
| 2 | `/` | "FP34 submission cycle" (`:493`) | `bg-primary-950` | same | Fix 2 |
| 3 | `/` | "Drug Tariff and Category M clawbacks" (`:503`) | `bg-primary-950` | same | Fix 2 |
| 4 | research-density | "NHSBSA Contractor Details" (`:155`) | `bg-primary-950` hero | `underline hover:text-white transition-colors`, no recipe | Fix 2 |
| 5 | research-density | "NHSBSA dispensing data" (`:168`) | same | same | Fix 2 |
| 6 | research-density | "Open Government Licence v3.0" (`:186`) | same | `underline hover:text-white/70`, no recipe | Fix 2 |
| 7 | research-density | "Download CSV" (`:190`) | same | same | Fix 2 |
| 8 | research-openings | "NHSBSA's Pharmacy Openings and Closures dataset" (`:160`) | same | same | Fix 2 |
| 9 | research-openings | "Open Government Licence v3.0" (`:191`) | same | same | Fix 2 |
| 10 | research-openings | "Download CSV" (`:196`) | same | same | Fix 2 |

**None of the 10 is a missing ground utility** — every one sat on
`bg-primary-950`, which G4's selector list already covers, and R4 measured the
parent token as `#fff`. **None is a kit-painted ground** either: all 10 are
site-authored prose anchors. The gap is on the *consumer* side, not the token
side: the token had **no default consumer**.

### Why this is fixed at the token level, not per element

Three of the ten live in `src/app/page.tsx`, outside this task's edit boundary,
so a per-element fix cannot close the row at all. And R4, R3 and R2 have each
re-filed this same finding against a *different* set of hand-authored links —
the eleventh unringed link, written next week, is broken the day it lands.
So: bind the token once at the element level.

```diff
   footer {
     --focus-ring: var(--focus-ring-on-brand);
     --kit-focus-ring: var(--focus-ring-on-brand);
   }
+
+  /* G5 (R2/R3/R4 S1): … (full rationale in the file) */
+  a:focus-visible,
+  button:focus-visible {
+    outline: 2px solid var(--focus-ring);
+    outline-offset: 2px;
+  }
```

Specificity is the lowest thing that can work, **(0,1,1)**, which is the whole
safety argument:

- Every `focus-visible:outline-[var(--focus-ring)]` utility is **(0,2,0)** and
  sits in `@layer utilities`, so every control carrying the `focusRing` /
  `btnPrimary` / `btnSecondary` / `btnOnDark` recipe still wins — and declares
  the same token, same 2px width, same 2px offset, so **nothing repaints**.
- The few controls that pair `focus:outline-none` with their own ring
  (`StickyCTA.tsx:164`'s close button, `BlogListWithSearch.tsx:123,136`'s
  inputs) are also **(0,2,0)** and keep their own treatment unchanged.
- `:focus-visible`, not `:focus`, so mouse and touch see no change at all.

Resulting ratio for all 10: `--focus-ring` on `bg-primary-950` resolves to
`--focus-ring-on-brand` `#ffffff` → **12.17** (was 1.56). On any light ground an
unringed link now gets `#0f3a4a` → **12.18** on white, **11.60** on `slate-50`
(`[248,250,252]`, L 0.9443) — both well clear. Inside the footer and every
kit dark band the existing rebinds apply unchanged, so **17.83** there.

Side effect, stated rather than hidden: this also rings every other prose and
inline link on the site that was authored without the recipe (the reason it is
the root-cause fix). That is strictly an accessibility gain, keyboard-only, and
changes no painted pixel until a link is focused by keyboard.

---

## FIX 3 — S7, the 4.29 captions (serious, open since R2)

Verified the actual failing nodes from R4's `probe.json` rather than taking the
description: every 4.29 node is `color: oklab(0.999994 … / 0.5)` — i.e.
`text-white/50` — on `ground [15,58,74]`, 14px, floor 4.5. Five on the density
page ("Data pulled", "2026-07-23", ". Published under", "Open Government
Licence v3.0", "Download CSV"), three on the openings page.

**No chart caption fails, and `PharmacyIndexCharts.tsx` is therefore
untouched.** Checked, not assumed: every `text-slate-500` / `fill-slate-500`
caption, legend and axis label in that component sits on `bg-white` or
`bg-slate-50` — `slate-500` `#64748b` measures **4.76** on white and **4.62** on
`slate-50`, both over the floor, and none appears in `probe.json`'s sub-floor
list. Editing it would have been a change with no finding behind it.

### Step chosen

Composite of `white/α` over `[15,58,74]`, ratio against the same ground:

| step | composite | ratio | verdict |
|---|---|---|---|
| `white/50` | [135, 156.5, 164.5] | **4.25** | fails (R4 measured 4.29; 0.04 is the ramp, not the maths) |
| `white/55` | [147, 166, 173] | ~4.82 | passes, but 0.32 of headroom on a 14px caption |
| **`white/60`** | **[159, 176.2, 182.6]** | **5.42** | **taken** — the lightest step on the default 10-increment ramp that passes |
| `white/70` | [183, 196.9, 200.7] | 6.87 | R4's suggestion; one step lighter than needed |

`white/60` is the lightest passing step for the real ground. `white/55`
computes as passing but was rejected: a third of a point of headroom on 14px
text is not a floor I would sign off, and it is off the default ramp.

### Diff (caption/source classes only)

```diff
# research/pharmacy-density-and-workload-index/page.tsx:184  (hero source/CSV caption)
-          <p className="mt-3 text-sm text-white/50">
+          <p className="mt-3 text-sm text-white/60">

# research/pharmacy-density-and-workload-index/page.tsx:210  (stat-card caption, bg-primary-950)
-              <p className="mt-3 text-sm text-white/50">The best-served NHS region in England.</p>
+              <p className="mt-3 text-sm text-white/60">The best-served NHS region in England.</p>

# research/pharmacy-openings-closures-index/page.tsx:189  (hero source/CSV caption)
-          <p className="mt-3 text-sm text-white/50">
+          <p className="mt-3 text-sm text-white/60">

# research/pharmacy-openings-closures-index/page.tsx:216  (stat-card caption, bg-primary-950)
-              <p className="mt-3 text-sm text-white/50">
+              <p className="mt-3 text-sm text-white/60">
```

Four lines, not the two R4 named. The extra two are the `mt-3 text-sm
text-white/50` captions inside the `bg-primary-950` headline stat cards
(`:207` and `:213` respectively) — identical class, identical ground
`[15,58,74]`, identical 14px size, so identically 4.25 and identically fixed.
They are not in R4's node list (its sweep did not surface them), which is
exactly why they would have survived a two-line fix and been re-filed at R5.
Both are caption text, nothing else in either file was touched.

The nested `<a className="underline hover:text-white/70">` source links inherit
the paragraph colour, so they lift from 4.25 to 5.42 with it; their `/70` hover
still reads as a lift (5.42 → 6.87).

---

## FIX 4 — R4 minor items

| item | in a G5 file? | action |
|---|---|---|
| **m1** — kit `eyebrow="FAQ"` renders on both research pages, a label this site does not publish | **yes**, both research `page.tsx` | **FIXED.** `eyebrow=""` on both `FaqSection` call sites. `FaqSection.tsx:41` renders `{eyebrow ? <Eyebrow>…</Eyebrow> : null}`, so `""` removes the node entirely; the `h2` default "Frequently asked questions" is unchanged, which is the heading the page keeps. |
| **m4** — `confirm where you stand</p>` with no terminal full stop | **no** — `src/lib/widget-config.ts:106` | **UNTOUCHED**, outside the lease. One character, still open. |

```diff
       <FaqSection
         faqs={faqs}
+        /* G5 (R3 m1): the kit default is eyebrow="FAQ". "FAQ" is a label this
+           site does not publish (same ruling as calculators/[slug]), and the
+           h2 below already says "Frequently asked questions". */
+        eyebrow=""
         alwaysRenderAnswers
         tone="slate"
         className="bg-white border-t border-slate-200 py-12 sm:py-16"
       />
```
(identical in both files — `pharmacy-density-and-workload-index/page.tsx:414`,
`pharmacy-openings-closures-index/page.tsx:512`.)

---

## Checks

```
$ cd pharmacies/web && npx tsc --noEmit
EXIT=0
(no output)
```

```
$ cd pharmacies/web && npx vitest run src/tests/focus-ring.test.ts
The CJS build of Vite's Node API is deprecated. …

 RUN  v2.1.9 C:/Users/user/Documents/Accounting/pharmacies/web

 ✓ src/tests/focus-ring.test.ts (3 tests) 12ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  14:03:22
   Duration  441ms (transform 53ms, setup 0ms, collect 58ms, tests 12ms, environment 0ms, prepare 110ms)
```

The focus-ring guard still passes, and correctly so: it bans hand-rolled
non-token outlines in `.tsx`, and Fix 2 adds a **token-valued** outline in
`globals.css`, which is the shape the guard wants rather than the shape it
bans. No test asserted the old unscoped `.bg-white` selector, so nothing
needed updating.

## Not verified, and honestly

Every ratio in this receipt is **computed** from the measured grounds in R4's
`probe.json` / `probe3.json`, not re-measured in a browser: the task forbids a
build, and `:3111` serves the pre-G5 build, so the new CSS is not in any
servable artefact yet. The next build is where Fix 1's 12.17, Fix 2's 12.17 and
Fix 3's 5.42 become measurements. The three inputs those computations rest on
are all read directly from R4's JSON, not from its prose: ground `[15,58,74]`,
`ringRatio 1` with `ring #0f3a4a`, and `color oklab(… / 0.5)` at 14px.

## Still open after G5 (not in the lease)

- **N1, the blocker** — the widget panel auto-opens with no interaction, on
  every route. `layout.tsx`, off limits here, and it is an owner question
  before it is a code change (nothing that interrupts gets created unasked).
- **S1's three homepage links** are closed by Fix 2's CSS, but `page.tsx` still
  does not carry the recipe on them; if a later round wants the recipe explicit
  there, it is three `${focusRing}` appends.
- **m4** (one full stop, `widget-config.ts:106`), **N3** (un-grounded
  `NextStepOffer` mount), **N4** (STATE.md overstates the adopted component
  set), **S2**, **M-d** — all outside the three files.
