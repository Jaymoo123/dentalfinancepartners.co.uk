# PHASE 1 — tokens and chrome — pharmacies design port (build plan)

Read-only planning pass, 2026-10-07. Site `pharmacies/web`, brand "Pharmacy Tax",
brand hex `#0f3a4a`, Plus Jakarta Sans, storage prefix **`pfp`** (P0-E §0.1 — never
`phfp`). Kit `packages/web-shared/design/`. Worked example copied end to end:
hospitality phase 1 (`hospitality/web/src/app/layout.tsx`,
`hospitality/web/src/components/layout/PageShell.tsx`,
`hospitality/web/src/app/globals.css`), reviewed in
`docs/hospitality/_port/R1_PHASE1_REVIEW.md`.

**Owner decisions already taken. Do not re-ask.**
1. All four capture surfaces (SpecialistWidget, DeepScrollModal, ReturningBar, a kit
   sticky) are mounted in **phase 6 (W7)**, not phase 1.
2. Phase 1 restyles the existing `StickyCTA` **only if it is in P1-C's way**. It is:
   its mount point is the local `PageShell` that P1-C deletes, and its focus ring
   measures 1.47 on its own `neutral-900` ground. P1-C owns the file for those two
   reasons and changes nothing else about it.
3. The uplift is part of the port and is budgeted from the start (owner ruling 5,
   `docs/_engines/ESTATE_PARITY_HANDOFF_2026-09-29.md:176`).

---

## 0. REALITY CHECK PER SURFACE — verified, do not invent work

Verified against source and the running phase-0-fixed build on `:3111` (curl only).

| surface | state today | verified by | phase-1 work |
|---|---|---|---|
| Webfont | Plus Jakarta Sans really loads; `plusJakarta.variable` + `.className` are on **`<body>`**, which resolves by class-vs-element specificity today. | `layout.tsx:31`; P0-C webfont section | P1-A moves the variable class to `<html>` and binds `--font-sans`. The ONE rendered check (`getComputedStyle(document.body).fontFamily`) is still required (T-H1). |
| Nested `<main>` | **CLOSED by phase 0.** `grep -rn "<main" src` = 1 hit (the local `PageShell`). Curl on `/`, `/services`, `/blog`, `/research/pharmacy-openings-closures-index`, `/contact` = `main=1` each. | `grep`, curl `:3111` | NONE. P0-F2's "handoff: blog/research still nested" is **stale**; another phase-0 package closed them. Do not re-sweep. |
| Skip link | absent (`curl :3111/ \| grep -c 'href="#main"'` = 0) | curl | P1-C: the kit `PageShell` renders it. |
| `/embed/*` chrome | already bare (`curl :3111/embed/pharmacy-purchase-affordability \| grep -o "<header\|<footer"` = 0), via the phase-0 local `PageShell`. One embed family only, `/embed/[slug]` — **no suffix embeds, so `bypassWhen` is NOT needed here** (unlike hospitality). | curl, `find src/app -path "*embed*"` | P1-C: the kit's built-in `/embed/` prefix reproduces this exactly. |
| Organization JSON-LD | already the shared builder: `layout.tsx:31` calls `buildOrganizationJsonLd()` from `src/lib/schema.ts`, which calls `buildOrganization` from `packages/web-shared/schema` (= `packages/web-shared/schema/organization.ts`, re-exported by `schema/index.ts`) and **already passes `parentOrganization`**. | `src/lib/schema.ts:17-52`; P0-F2 §1-2 | NONE but one assertion. Do not re-plumb, do not add `priceRange` back. |
| Local chrome | `components/layout/SiteHeader.tsx` (81 lines), `SiteFooter.tsx` (56), `PageShell.tsx` (31, phase-0) — all hand-rolled, zero `web-shared/design` imports site-wide. | `grep -rn "web-shared/design" src` = 0 | P1-C replaces all three. |
| Header CTAs | `header_contact\|header\|null` → `/contact` on 55/55 routes; `header_contact_mobile\|header_mobile_menu\|null` in the client bundle only. Desktop CTA is `xl:inline-flex`. | `cta_baseline.json`; P0-D "what phase 1 must reproduce" | P1-C: `ctaIds`, `ctaMobilePlacement`. Two deliberate changes declared below. |
| Sticky CTAs | `sticky_cta\|sticky\|null` → `/contact` and `sticky_cta_close\|sticky\|null` on 55/55. | `cta_baseline.json` | P1-C must RE-MOUNT or they vanish with the local shell. |
| `ConsentToggle` | **does not exist on this site.** `components/analytics/` is absent; zero "Do not track" control anywhere, under `posture="opt-out"`. The kit `SiteFooterProps.consentToggle` is a REQUIRED prop. | `ls`, `grep` | P1-C creates it from `hospitality/web/src/components/analytics/ConsentToggle.tsx`. See the manager decision. |
| `layout-utils.ts` | 100% hand-rolled fork, `#0f3a4a` literal in 4 recipes, `btnOnDark = btnSecondary` (a `neutral-900` outline for a dark ground). Gate row 1 = **0**. | `components/ui/layout-utils.ts` | P1-B |
| `@theme` ramp | absent. `bg-primary-50`/`text-primary-600`/`ring-primary-100` compile to 0 rules. **No live defect today** (`LeadCTAPanel` is not imported) — but the moment P1-C mounts the kit chrome it becomes live: the kit footer lockup paints `text-primary-400`/`bg-primary-400`, the kit skip link `focus:bg-primary-600`, `btnSecondary` `border-primary-600`. | P0-C | P1-A, and it is now a blocker, not optional. |
| `globals-standard.css` | NOT imported. `tw-animate-css` not a dependency of this site (resolvable at the monorepo root). | `globals.css:1-6`; `package.json` | P1-A |
| Grey ramps | `neutral-*` in **30 files, 457 occurrences**; `slate-*` in 7 (6 are `/admin/analytics/*`). | P0-C; per-file counts in P1-D | P1-D (26 files), P1-B (1), P1-C (3) |
| Backdrop | none. Gate row 4 = **0**. | `ls components/layout/` | P1-E |
| Ring guard test | none. Gate row 8 = `walks=0 gtg=0`. 5 test files exist (3 calc, 2 lead). | `ls src/tests`, `package.json` `test: vitest run` | P1-F |
| `.prose table` carve-out | one deliberate unlayered rule, dated `35a23f5cb`. | `globals.css:33-39` | P1-A keeps it, layered. |
| `--calc-result-accent` | already `#88cde7` (10.14 on slate-900). | `globals.css:22` | KEEP. Do not repoint. |

### Gate §9.1 baseline, run on the current tree (2026-10-07)

```
1  layout-utils  : 0
2  kit adopted   : 0 distinct / 0 call sites
2a kit declined  : 0
2b homepage mktg : adopted=0 declined=0
3  webfont       : next/font/google
4  backdrop      : 0
5  eyebrow ratio : Eyebrow=0 section-label=10
6  rings not the token: (empty — every ring is a bracketed literal the regex cannot see)
7  gradient grounds: (to be re-run by the manager at phase close)
8  ring guard    : walks=0 guards-the-guard=0
```

Rows 1, 4 and 8 are blockers today and are closed by P1-B, P1-E and P1-F. Row 6 reads
empty **because** the rings are `outline-[#0f3a4a]` literals — the same shape R1 caught
on startups-tech. Never report row 6 empty as a pass without that sentence. Rows 2, 2a,
2b, 5 are phase 2-6 work; report, do not chase.

---

## PACKAGE TABLE

| pkg | scope | model | depends on | runs with | status | result |
|---|---|---|---|---|---|---|
| **P1-A** | tokens: `globals.css`, `layout.tsx` font/noscript, `package.json` | Sonnet | nothing | **ALONE, FIRST** | **DONE** | brand ramp pinned at the 950 step, button-ground trio, focus ring, motion layer and glow channels declared; webfont moved to `<html>` |
| **P1-B** | `components/ui/layout-utils.ts` → kit re-export | Sonnet | P1-A | P1-D, P1-E | **DONE** | kit re-exports adopted for every symbol with a consumer, `linkArrow` deleted, every recipe ends `outline-[var(--focus-ring)]` |
| **P1-C** | kit `PageShell` + `SiteHeader` + `SiteFooter` + nav; `ConsentToggle`; `StickyCTA` re-mount | **Opus** | P1-A, P1-B, P1-E | last of the builders | **DONE** | kit shell mounted, `ConsentToggle` created new, all three CTA triples preserved on 55/55 routes; R1 found a skip-link cascade loss and a thin footer, both closed by G2/G1 |
| **P1-D** | `neutral-*` → `slate-*` in 26 files | Sonnet | nothing | P1-B, P1-E | **DONE** | 444 occurrences swapped, mechanical, same numeric step, zero other changes proven by diff |
| **P1-E** | `components/layout/PharmaciesBackdrop.tsx` (new) | **Opus** | P1-A | P1-B, P1-D | **DONE** | dispensary-shelf motif SVG, zero JS, zero overflow at any width; R1 called the render graph-paper-like, not shelving (cosmetic) |
| **P1-F** | `src/tests/focus-ring.test.ts` (new) | Sonnet | P1-B, and P1-C for a clean run | after P1-C | **DONE** | ring-guard test built, corpus walk plus guards-the-guard assertion |
| **R1** | adversarial review of the rendered DOM | **Opus** | all | after the manager's build | **DONE** | 2 blockers, 5 serious, 5 minor found; all closed or handed off, see Close block below |

Every package: **Do NOT launch subagents.** Builders never build and never run a server
(T1); the manager does. Every git command from the monorepo ROOT (T3). Receipt at
`docs/pharmacies/_port/P1<X>_RECEIPT.md`.

---

## P1-A. TOKENS — Sonnet — runs ALONE, first

**OWNS (sole owner, exact paths):**
- `pharmacies/web/src/app/globals.css`
- `pharmacies/web/src/app/layout.tsx`
- `pharmacies/web/package.json`
- root `package-lock.json`

**OFF LIMITS (ls-verifiable):** everything under `pharmacies/web/src/components/`,
`pharmacies/web/src/app/**/page.tsx`, `pharmacies/web/src/tests/`,
`pharmacies/web/src/lib/`, `pharmacies/niche.config.json`, and `packages/**`.

### A1. The `@theme` brand ramp, `primary-50..950`

**Method, reproducible, not eyeballed.** `#0f3a4a` in OKLCH is
`oklch(0.3273 0.0538 -133.00)`. Tailwind's `cyan` ramp is the shape donor (nearest hue
family): take each cyan step's L and C, **hold the hue fixed at -133.00 degrees**, convert
back to sRGB. `#0f3a4a` lands on the **950** step, not the 600 — re-deriving L 0.327 at
the scaled chroma returns `#0f3a4a` to the byte, and cyan-950's own chroma (0.0541) and
hue (-130.3) sit within rounding of the brand's. **The brand hex is this site's 950 step,
pinned there unchanged** (owner ruling 1: never shift a designer-set colour).

That fact drives every other decision in this phase and must be written into the file: the
brand hex here is a NEAR-BLACK, so `primary-600` is **not** the brand colour, it is a mid
teal the kit will paint on surfaces this site has never shown.

```css
@theme {
  --color-primary-50:  #edfdff;
  --color-primary-100: #d3f7ff;
  --color-primary-200: #acefff;
  --color-primary-300: #77e2ff;
  --color-primary-400: #45cdff;
  --color-primary-500: #30b2e0;
  --color-primary-600: #1c8fb6;
  --color-primary-700: #177392;
  --color-primary-800: #185d76;
  --color-primary-900: #164e63;
  --color-primary-950: #0f3a4a; /* THE BRAND HEX, unchanged. 12.18 on white */

  /* Undeclared, every calc() in globals-standard.css:37-42 is invalid and the kit
     buttons collapse to a 9999px pill (the generalist port shipped that defect; see
     Medical/web/src/app/globals.css:93-98). 0rem preserves this site's shipped square
     button shape exactly: layout-utils.ts carries no rounded-* class today. Adopting
     the kit btnPrimary in P1-B brings rounded-xl = calc(0rem + 4px) = 4px, a small
     deliberate shape change, recorded rather than left to ride silently. */
  --radius: 0rem;
}
```

Repeat these measured ratios as a comment in the file (sRGB, on white `#ffffff` / on
slate-900 `#0f172a`): 100 `#d3f7ff` 1.13 / 15.74 · 400 `#45cdff` 1.84 / 9.72 ·
500 `#30b2e0` 2.45 / 7.29 · 600 `#1c8fb6` 3.71 / 4.81 · 700 `#177392` 5.38 / 3.32 ·
800 `#185d76` 7.33 / 2.44 · 900 `#164e63` 9.11 / 1.96 · **950 `#0f3a4a` 12.18 / 1.47**.

### A2. Item 11 — one ratio, three verdicts

`#0f3a4a` measures **12.18:1** on white: 3:1 graphic PASS, 4.5:1 text PASS, 4.5:1
ground-under-white-text PASS (white on `#0f3a4a` is the same pair). **Therefore
`--brand-primary-text` and `--brand-primary-ground` are NOT declared.** Write that
reasoning in the file so the next agent does not add them.

The slate-900 question is already answered and must not be reopened: `#0f3a4a` on
slate-900 is **1.47**, failing both floors, which is what `--calc-result-accent: #88cde7`
(10.14) exists for — keep that line as it is. Same fact for every later phase:
brand-coloured TEXT on a dark ground uses the 300/400 step, never the brand hex.

Keep unchanged: `--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`,
`--background`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`,
`--border`, `--calc-result-accent`.

### A3. Button ground trio

```css
--btn-ground: #0f3a4a;        /* 950, the brand hex. white label 12.18, PASS */
--btn-ground-hover: #0a3342;  /* same hue, L 0.300. 13.48 */
--btn-ground-active: #072f3d; /* same hue, L 0.285. 14.20 */
```

**Must be declared, and the reason is the inverse of every prior port.** The kit's
`btnPrimaryBase` falls back to `--color-primary-600` `#1c8fb6`, whose white label is
**3.71, FAILING the 4.5 floor**; leaving the trio undeclared would break contrast AND
repaint every live button from near-black teal to mid teal. Hover and active are derived
on the brand's own hue line (the site uses `hover:opacity-90`/`active:opacity-80` today,
so there is no hex to adopt) — two darker steps of the brand, no new hue.

### A4. Focus ring, two-valued, and the ONE dark ground phase 1 paints

```css
--focus-ring-on-light: var(--color-primary-950); /* #0f3a4a, 12.18 on white */
--focus-ring-on-brand: #ffffff;
--focus-ring: var(--focus-ring-on-light);
--kit-focus-ring: var(--focus-ring-on-light);
```

`--kit-focus-ring` must **not** be written as `var(--focus-ring)`: a custom property whose
value is a `var()` reference resolves at computed-value time on the declaring element and
would freeze at the light value (hospitality `globals.css`, same comment). Both point at
the ground tokens directly. Inside `@layer components`:

```css
.ground-dark { --focus-ring: var(--focus-ring-on-brand); --kit-focus-ring: var(--focus-ring-on-brand); }
footer       { --focus-ring: var(--focus-ring-on-brand); --kit-focus-ring: var(--focus-ring-on-brand); }
```

The `footer` ELEMENT rule exists because the kit `SiteFooter` renders a bare `<footer>` on
`bg-slate-900` with **no `className` prop**
(`packages/web-shared/design/chrome/SiteFooter.tsx:138`), so the class cannot be attached.
Brand on slate-900 is 1.47; white is 15+. Custom properties inherit and no Tailwind utility
sets these two, so layer order is irrelevant here.

**Write the rule for phases 2-6 into the file, in these words:** any section that paints a
dark ground carries `.ground-dark`, and **the phase that paints the ground owns the
class**. R1's blocker B1 on a sibling site came from declaring this and never mounting it.
Phase 1 mounts it twice: the `footer` rule, and `.ground-dark` on the `StickyCTA` bar
(P1-C).

### A5. The kit skip link's ground — a real contrast failure P1-A must pre-empt

`packages/web-shared/design/chrome/PageShell.tsx:43` hardcodes
`focus:bg-primary-600 focus:text-white` on the skip link and exposes no prop. White on
`#1c8fb6` measures **3.71 against the 4.5 floor**. One layered rule closes it:

```css
@layer components {
  /* Kit PageShell.tsx:43 pins focus:bg-primary-600 on the skip link with no prop to
     override it. White on primary-600 #1c8fb6 = 3.71, under the 4.5 text floor.
     The brand 950 step carries white at 12.18. One selector, no kit edit. */
  a[href="#main"]:focus { background-color: var(--color-primary-950); }
}
```

P1-A writes it; **P1-C verifies it in the rendered DOM** (tab once from the top of `/`).
Serialise on that: the rule is dead until P1-C mounts the shell.

### A6. Import order and the motion layer (U4 foundation)

Exactly as `globals-standard.css:11-18` specifies:

```css
@import "tailwindcss" source("..");          /* keep */
@source "../../../../packages/web-shared";   /* keep, MANDATORY */
@import "tw-animate-css";                    /* NEW */
@import "@accounting-network/web-shared/design/globals-standard.css";  /* NEW */
@import "../../../../packages/site-styles/prose-standard.css";  /* keep, unchanged */
```

`globals-standard.css` exists at `packages/web-shared/design/globals-standard.css`
(confirmed). `tw-animate-css` is **not** bundled by it (its own header, line 23) and is
not in `pharmacies/web/package.json` today; it resolves at the monorepo root. Add
`"tw-animate-css": "^1.4.0"` (the version hospitality pins), then
`npm install --package-lock-only` and `python scripts/check_dependency_closure.py`.
Do NOT add `@radix-ui/react-accordion`: no `FaqSection` adoption in phase 1.

Reproduce the motion-layer table at the top of `globals.css` the way
`hospitality/web/src/app/globals.css:1-14` does (`.eyebrow-rule`, `.tick-draw`,
`[data-glow="on"] > *`, `.num-glow`, `.hero-reveal`, `.marquee-*`, `.related-card`, the
`prefers-reduced-motion` guards, the `--radius-*` derivations). **Phase 1 mounts none of
them**; say so.

### A7. Glow channels — and the emerald claim stated honestly

```css
--brand-glow:       48 178 224;  /* primary-500 #30b2e0 */
--brand-glow-deep:  28 143 182;  /* primary-600 #1c8fb6 */
--brand-glow-edge:  69 205 255;  /* primary-400 #45cdff */
--brand-glow-faint: 211 247 255; /* primary-100 #d3f7ff */
```

RGB triplets because the kit's `rgb(var(--token) / alpha)` syntax cannot take a hex custom
property. Every channel is a step declared in A1, so no new colour enters; the brand 950
step is deliberately NOT used (at 12.18 on white it reads as grime, not glow).

**The checkable proof is the DECLARATION, not an absence** (hospitality R1 G4 corrected
this): `grep -c "16 185 129" packages/web-shared/design/globals-standard.css` returns 7
lines / 9 occurrences, all `var(--brand-glow*, 16 185 129)` fallback arguments, and a
minifier never deletes a fallback argument. So assert the four declarations in the built
CSS and assert `outline-emerald` and the emerald triplet are absent from the rendered DOM.
Do not write "0 in the built CSS".

### A8. `@theme inline` — font aliases

```css
--font-sans: var(--font-plus-jakarta), ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
```

Then move `body { background; color; font-family: var(--font-sans) }` **into `@layer
base`**, and move the `plusJakarta.variable` class from `<body>` to `<html>` in
`layout.tsx`. Reason (hospitality R1 B1): `@theme inline` emits `--font-sans` on `:root`
(`<html>`), and a custom property containing `var()` resolves at computed-value time on the
declaring element — with the variable class on `<body>`, `--font-plus-jakarta` does not
exist on `:root`, `--font-sans` computes to invalid and every page falls back to
`ui-sans-serif`. Keep `plusJakarta.className` wherever the font needs it and **prove the
outcome, do not reason about it**.

`font-mono`: alias the stack, load no second webfont (the face is Plus Jakarta Sans, so
GeistMono is not the automatic answer). Owner question Q4.

### A9. Warning ramp semantics

**Amber and orange are AVAILABLE here**, unlike hospitality: the brand family is teal/cyan
(hue -133), so an amber chip cannot read as brand decoration. Declare, mount nothing:
`--warning-ground: #d97706` (amber-600), `--warning-on-ground: #ffffff`,
`--info-ground: #0284c7` (sky-600), `--info-on-ground: #ffffff`.

**State the measured white-label ratios in the file**: amber-600 is **3.35, under 4.5**, so
a later phase putting white text on `--warning-ground` must use `amber-700 #b45309` (4.92);
sky-600 is 4.07, same caveat. Declaring a token with an unmeasured ratio is how two prior
ports shipped a sub-floor chip. Write the collision too: sky-600 is 0.3 L from
`--color-primary-600`, so informational notes here use `slate` or a border, never sky.

### A10. The `<noscript>` release

`.eyebrow-rule[data-draw="off"]` and `[data-draw="off"] .tick-draw` ship a COLLAPSED state
in the server HTML with no `(scripting: enabled)` guard. No element carries those classes
here **today**, so this is pre-emptive, not a live fix — say so in the receipt. Add inside
`<body>` (React cannot render `<noscript>` as a direct child of `<html>`), copying
`hospitality/web/src/app/layout.tsx`:

```jsx
<noscript>
  <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
    [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }
    [data-state="closed"][role="region"] { display: block !important; }`}</style>
</noscript>
```

### A11. Keep untouched

The `@source` line, the `prose-standard.css` import, `--calc-result-accent`, and the
`.prose table:not(.not-prose *)` carve-out — **keep the carve-out, move it inside `@layer
components`**, dated comment verbatim. It is the site's only intentional unlayered author
rule and the brace-depth check below requires zero. `storagePrefix="pfp"` is FROZEN: do not
touch it, do not read it from config.

### Acceptance (P1-A)

```bash
cd pharmacies/web && npx tsc --noEmit                                    # expect: no output
grep -c "color-primary-950: #0f3a4a" src/app/globals.css                 # expect: 1
grep -c "radius: 0rem" src/app/globals.css                               # expect: 1
grep -c "brand-glow" src/app/globals.css                                 # expect: 4 declarations
grep -c "brand-primary-text\|brand-primary-ground" src/app/globals.css   # expect: 0 DECLARATIONS (comment mentions fine)
grep -n "@layer base" src/app/globals.css                                # expect: 1, containing body
grep -c "plusJakarta.variable" src/app/layout.tsx                        # expect: 1, on <html>
cd ../.. && python scripts/check_dependency_closure.py                   # expect: PASS
```
After the manager's single build:
```bash
grep -o "bg-primary-50\|text-primary-400\|text-primary-600" pharmacies/web/.next/static/css/*.css | wc -l   # expect: >0 (was 0)
grep -o "9999px" pharmacies/web/.next/static/css/*.css | wc -l                                              # record; must not be a button radius
```
Rendered, on the manager's `next start`: `getComputedStyle(document.body).fontFamily`
reports a **quoted** `"Plus Jakarta Sans"` family (T-H1, the one check P0-C left open).
Brace-depth walk on the built CSS (the playbook's corrected `utf-8-sig`, character-stream,
layer-stack-aware version — the file is ONE physical line, T30): **zero author-level
unlayered rules**, excluding `@font-face`, Tailwind's `@property` registrations and Next's
two `__className`/`__variable` rules by name. Baseline was two (`body`, `.prose table`),
both layered by this package.

**Receipt:** `docs/pharmacies/_port/P1A_RECEIPT.md`. **Model: Sonnet. Do NOT launch subagents.**

---

## P1-B. LAYOUT-UTILS — Sonnet

**OWNS (sole owner):** `pharmacies/web/src/components/ui/layout-utils.ts`.
**OFF LIMITS:** every other file in the repo. This package edits exactly one file.
**Depends on:** P1-A (the ramp, `--focus-ring` and the button trio must exist first).

### What the site actually imports, measured

21 files import this module. Symbol usage across `src` excluding the module itself:

| export | consumers | kit has it | disposition |
|---|---|---|---|
| `siteContainerLg` | 68 | yes | **re-export** |
| `btnPrimary` | 24 | yes | **local, ring wrapped** |
| `focusRing` | 23 | yes | **local, points at `--focus-ring`** |
| `sectionY` | 8 | yes | **re-export** (rhythm change, declared below) |
| `contentNarrow` | 6 | yes | **re-export** |
| `sectionYLoose` | 2 | yes | **re-export** (rhythm change) |
| `siteContainer` | 0 | yes | **re-export** (P1-E/P1-C create consumers) |
| `btnSecondary` | 0 | yes | **local, ring wrapped** |
| `btnOnDark` | 0 | yes | **re-export wrapped.** Today it is `= btnSecondary`: a `neutral-900` border and `neutral-900` text for a dark ground. Real defect (P0-C), zero consumers, fixed by taking the kit's. |
| `linkArrow` | 0 | no kit equivalent | **DELETE.** Zero consumers. |

The kit's module is at **`packages/web-shared/design/layout-utils.ts`** (not under
`primitives/` — the prompt's guess was wrong, confirmed by `ls`). It also offers
`siteContainerXl`, `heroCreamSurface`, `btnOnCream`, `btnPrimaryBase`: no consumer in
phase 1, so do not re-export them.

**No API break:** every symbol with a consumer survives with the same name and `string`
type. The one deletion, `linkArrow`, has zero consumers — prove it before deleting.

**The rhythm change, declared not smuggled.** Local `sectionY` `py-16 sm:py-20 lg:py-28`
vs kit `py-12 sm:py-16 md:py-20`; local `sectionYLoose` `py-20 sm:py-28 lg:py-36` vs kit
`py-16 sm:py-20 md:py-24 lg:py-28`. Tightens vertical rhythm on 10 call sites. **Adopt it**
— the Property rhythm is the point of the port — and say so in the receipt.

**`focusRing` wrapping.** The kit's `focusRing` reads
`var(--kit-focus-ring, var(--color-primary-600))`, but `btnPrimaryBase`, `btnSecondary` and
`btnOnDark` each hardcode a literal `focus-visible:outline-primary-600` / `-primary-400` a
call site cannot override — and here `primary-600` measures **1.42 against the brand-950
button ground**, invisible. Keep ONE mechanism and one grep: **every recipe in this file
ends in `focus-visible:outline-[var(--focus-ring)]`.**

- `focusRing` — local string, `focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]`, with the
  decline comment **naming the kit FILE PATH**
  (`packages/web-shared/design/layout-utils.ts:50`) — row 2a counts paths, not names.
- `btnPrimary`, `btnSecondary`, `btnOnDark` — local, every character the kit's except that
  ring. Grounds come from A3. **No literal hex survives: all four `#0f3a4a` go.**
- `btnOnDark`'s kit ring is `outline-primary-400` `#45cdff`, unmounted in phase 1, so the
  comment says the measurement belongs to the phase that mounts it. Quote no figure nobody
  took.
- The 4 `neutral-*` (in `btnSecondary`/`linkArrow`) go to `slate-*` **here**, not in P1-D.

### Acceptance (P1-B)

```bash
cd pharmacies/web
grep -c 'web-shared/design/layout-utils' src/components/ui/layout-utils.ts  # gate row 1, expect >= 2
grep -coE '#[0-9a-fA-F]{3,8}' src/components/ui/layout-utils.ts             # expect: 0
grep -c 'outline-\[var(--focus-ring)\]' src/components/ui/layout-utils.ts   # expect: 4
grep -c 'neutral-' src/components/ui/layout-utils.ts                        # expect: 0
grep -rn 'linkArrow' src                                                    # expect: no hits
npx tsc --noEmit                                                            # expect: no output
```

**Receipt:** `docs/pharmacies/_port/P1B_RECEIPT.md`. **Model: Sonnet. Do NOT launch subagents.**

---

## P1-C. CHROME — Opus

**OWNS (sole owner):**
- `pharmacies/web/src/components/layout/PageShell.tsx` (REWRITE — the phase-0 local shell
  becomes the per-site wiring of the kit shell)
- `pharmacies/web/src/app/layout.tsx` — **chrome region only** (the `primaryNav` const and
  the `<PageShell>` mount). P1-A owns the font class, the `<noscript>` and metadata.
  **SERIALISE: P1-A first, P1-C second. Never concurrent.**
- DELETE `pharmacies/web/src/components/layout/SiteHeader.tsx`
- DELETE `pharmacies/web/src/components/layout/SiteFooter.tsx`
- NEW `pharmacies/web/src/components/analytics/ConsentToggle.tsx`
- `pharmacies/web/src/components/ui/StickyCTA.tsx` (two one-liners only: the ring and the
  dark-ground class; plus its 4 `neutral-*` → `slate-*`)

**OFF LIMITS:** `globals.css`, `layout-utils.ts`, `PharmaciesBackdrop.tsx` (import it, do
not edit it), `src/tests/`, `src/lib/schema.ts`, `packages/**`, every `app/**/page.tsx`,
`niche.config.json`.

**Depends on:** P1-A, P1-B, P1-E.

### C1. The shell

Build `components/layout/PageShell.tsx` on
`hospitality/web/src/components/layout/PageShell.tsx`: a `"use client"` wrapper around
`@accounting-network/web-shared/design/chrome/PageShell`. Client by necessity — the kit
takes an icon COMPONENT (`wordmarkIcon`) and ReactNode slots (`consentToggle`, `backdrop`),
neither of which crosses the RSC boundary from a server layout.

`nav` is built **server-side in `layout.tsx`** and passed as plain data, so nothing
server-only reaches the client bundle through the shell:
`const primaryNav: NavItem[] = siteConfig.nav.map((i) => ({ label: i.label, href: i.href }));`

`siteConfig.nav` IS `niche.navigation` (`src/config/site.ts:27`) — P0-E flagged these as
"not independently diffed"; confirmed the same object. Six items: Services `/services`, For
`/for`, Research `/research/pharmacy-openings-closures-index`, Blog `/blog`, About
`/about`, Contact `/contact`. **Ship the labels verbatim**; rewording the nav is a copy
change on 55 pages, not a chrome change (owner question Q2).

**`bypassWhen` is NOT passed**: one embed family, `/embed/[slug]`, which the kit's built-in
prefix covers. Record the decision; do not copy hospitality's suffix predicate.

### C2. Header props, every one explicit

| prop | value | source / reason |
|---|---|---|
| `nav` | forwarded by the kit shell to header AND footer | they cannot drift |
| `ctaPrimary` | `{ label: niche.cta.sticky_button, href: "/contact" }` = "Get in touch" | `niche.config.json`; unchanged from `SiteHeader.tsx:32` |
| `ctaIds` | **`{ primary: "header_contact", mobilePrimary: "header_contact_mobile" }`** | MANDATORY. Kit defaults are `header_book` / `header_book_mobile`. `cta_baseline.json` has `header_contact` on 55/55 routes and P0-D confirms `header_contact_mobile` in the client bundle. Taking the defaults would rename both live `vw_cta_performance` series. |
| `ctaMobilePlacement` | **`"header_mobile_menu"`** | the site's own value (`SiteHeader.tsx:69`), NOT the kit default `"mobile_menu"`. Placement rides the same `cta_click` payload as goal. |
| `ctaContactGoal` | **`"form"`** — passed explicitly, and this is an ADDITIVE CHANGE, declared | the site emits **no `data-cta-goal` anywhere** (`grep` = 0; `cta_baseline.json` goal `null` on all three triples). The kit always emits the attribute and its parameter default is `"form"`, so `undefined` cannot reproduce "absent". There is no live goal series to split, so the kit default is safe — but it is a NEW dimension value appearing on 55 routes and the receipt says so in one line. |
| `ctaSecondary` | **not passed** | would mint a THIRD header CTA. Note the consequence the kit's own comment describes (`SiteHeader.tsx:466-473`): with no `ctaSecondary`, the "Contact" nav item stays visible at `xl:` instead of being hidden behind the CTA. That is a visible nav change; measure it at 1280 and record it. |
| `ctaVariant` | not passed | `niche.config.json` declares no `cta.variant`, so no `data-cta-variant` attribute is emitted |
| phone | **no such prop exists** on `SiteHeaderProps` | the "no phone" ruling is satisfied structurally. `niche.contact.phone` is the `+44 20 0000 0000` placeholder and stays unrendered. |
| `wordmarkIcon` | a lucide pharmacy mark — **`Pill`** (`lucide-react ^1.17.0` is a declared dep) | the site renders `siteConfig.name` as plain text today, no icon, no `<img>`. `public/brand/` does not exist, so `niche.config.json brand.logo_path` is stale — owner question Q3. Confirm `Pill` is exported by the installed lucide version before wiring; if not, use `Cross`. |
| `wordmarkTop` / `wordmarkBottom` | `"PHARMACY"` / `"TAX"` as two LITERALS | the display name is "Pharmacy Tax"; literals stop a display-name edit silently renaming the wordmark |
| `wordmarkAccentColor` | `niche.brand.primary_color` (`#0f3a4a`), read from config, not retyped | MANDATORY here. The kit default is `primary-600` `#1c8fb6`, which after P1-A is **not** the brand colour on this site (the brand is the 950 step), so the default would paint a mid-teal wordmark next to a near-black CTA. 12.18 on the white header. |

### C3. Footer props, every one explicit

| prop | value | check |
|---|---|---|
| `description` | `siteConfig.description` | — |
| `footerLinks` | `siteConfig.footer` (5 items) | **expect the row to render EMPTY**: the kit dedupes `footerLinks` against every column href, and Contact/Privacy/Cookie/Terms are in `companyItems` while Blog is an extra column. Verify, record; it is a dedupe, not a dropped link. |
| `legalDisclosure` / `legalName` / `tradingName` | `siteConfig.company.*` | built in `config/site.ts:36-42` |
| `wordmarkIcon/Top/Bottom` | the same three as the header | — |
| `resourcesHref` | **`"/research/pharmacy-openings-closures-index"`** | **There is no `/resources` route, no `/landlord-tax` (the kit default, which would 404), and no hub whose children are reference material.** The kit derives the Resources column from `childrenOf(resourcesHref)`, and a nav item with no children falls back to a single self-link — so this value yields a "Resources" column containing one link, "Research", pointing at a route that exists and is in the sitemap. That is the smallest honest column. **Probe it 200 before wiring.** If the owner prefers `/blog` there instead, it is a one-line change — owner question Q1. Do NOT pass nothing. |
| `companyItems` | `[{About,/about},{Contact,/contact},{Privacy Policy,/privacy-policy},{Terms,/terms},{Cookie Policy,/cookie-policy}]` | the kit default includes `/locations`, which 404s (`niche.config.json locations: []`). **Probe every href you pass.** |
| `extraNavHrefs` | `["/blog"]` | `/blog` has no fixed slot (Services/Resources/Calculators/Company are fixed), so it would otherwise never reach the footer. `/calculators` is not a nav item, so the Calculators column renders its "All calculators" fallback link — expected, record it. |
| `showBuilderCredit` | **omit** (kit default `true`) | owner standing rule 2026-09-11, estate-wide. Never pass `false`. It is a NEW visible line and a new followed outbound link on 55 pages; say so in the receipt. |
| `backdrop` | `<PharmaciesBackdrop />` from P1-E | the kit footer is already `relative overflow-hidden` with `relative z-10` content, which is the backdrop's host contract |
| `consentToggle` | `<ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />` | **NEW FILE.** See C4. `text-slate-400` on `bg-slate-900` = 6.78. |
| `newsletterSlot` | not passed | owner ruling: no newsletter |

### C4. `ConsentToggle` — a required prop with no existing component

`consentToggle` is not optional on `SiteFooterProps`, and this site has no such control:
`components/analytics/` does not exist and there is no "Do not track" affordance anywhere,
while `layout.tsx` runs `posture="opt-out"`. Create
`pharmacies/web/src/components/analytics/ConsentToggle.tsx` as a **byte-for-byte copy** of
`hospitality/web/src/components/analytics/ConsentToggle.tsx` (it imports `getConsent` /
`setConsent` from `@accounting-network/web-shared/analytics/consent` plus the local
`focusRing`). Change nothing in its wording. Keep the ring INSIDE the component, appended
after the caller's `className`, as hospitality does (R1 B2: the only footer control that is
not a link, and without the recipe it falls to the UA outline, 1.07 on slate-900).

A new visible control on 55 pages, but not an interruption (no popup, modal, banner or
cadence) — a footer link that closes a PECR gap. Flagged to the manager, not the owner.

### C5. `StickyCTA` — must be re-mounted or three CTA triples vanish

The local `PageShell` mounts `<StickyCTA />`; the kit shell renders only header/main/footer,
so dropping it deletes `sticky_cta` and `sticky_cta_close` from 55/55 routes. Mount it as a
sibling in the wrapper, gated by the SAME bypass the kit applies so embed routes stay bare:

```tsx
const pathname = usePathname();
const bare = pathname?.startsWith("/embed/") ?? false;
return (
  <>
    <KitPageShell nav={nav} header={{...}} footer={{...}}>{children}</KitPageShell>
    {!bare && <StickyCTA />}
  </>
);
```

Two one-liners inside `StickyCTA.tsx`, and nothing else (owner decision 2):
1. The close button carries `focus:outline-none focus:ring-2 focus:ring-[#0f3a4a]` on a
   `neutral-900` ground = **1.47, under the 3:1 indicator floor**. Replace with the
   `focusRing` recipe from P1-B and add `ground-dark` to the bar's wrapper `div`, so
   `--focus-ring` rebinds to white (15+ on slate-900). Measure and write the row.
2. Its 4 `neutral-*` classes → `slate-*`, same numeric step.

Do not restyle the bar, its trigger, its copy or its layout. The owner has not walked it.

### C6. Landmarks, and the Organization JSON-LD assertion

The kit shell supplies the skip link and the single `<main id="main" className="flex-1
scroll-mt-24">`. Remove the local `<main>` in the same edit that mounts the kit shell, so
there is never a moment with two. **No page-template `<main>` sweep is needed** — phase 0
closed it (`grep -rn "<main" src` = 1, curl-confirmed on 5 routes).

Organization JSON-LD already routes through the shared builder with `parentOrganization`
(`src/lib/schema.ts:17-52` → `packages/web-shared/schema/organization.ts`, re-exported by
`schema/index.ts`). **Nothing to move.** P1-C's only job is one assertion, because that
change is a commit old and the head `<script>` sits in the file P1-C edits: exactly one
`#organization` node per route, carrying `legalName`, `alternateName`,
`parentOrganization`, and **no `priceRange`**.

### Acceptance (P1-C)

```bash
cd pharmacies/web
grep -rn "<main" src --include=*.tsx                                  # expect: 0 (kit owns it)
grep -rn "components/layout/SiteHeader\|components/layout/SiteFooter" src  # expect: 0
grep -c "web-shared/design/chrome/PageShell" src/components/layout/PageShell.tsx  # expect: 1
grep -c "header_contact\"" src/components/layout/PageShell.tsx        # expect: 1
grep -c "header_mobile_menu" src/components/layout/PageShell.tsx      # expect: 1
grep -coE '#[0-9a-fA-F]{3,8}' src/components/layout/PageShell.tsx     # expect: 0
npx tsc --noEmit                                                      # expect: no output
```
Rendered, on the manager's `next start` (port 3111):
```bash
for r in / /services /for /blog /research/pharmacy-openings-closures-index /contact /calculators; do
  echo -n "$r main="; curl -s localhost:3111$r | grep -o "<main" | wc -l; done   # expect: 1 each
curl -s localhost:3111/ | grep -c 'href="#main"'                                  # expect: 1
curl -s localhost:3111/embed/pharmacy-purchase-affordability | grep -o "<header\|<footer\|data-cta=\"sticky_cta\"" | wc -l  # expect: 0
```
- `cta_snapshot.mjs` diffed against `cta_baseline.json`: **the same three ids and
  placements on all 55 routes** (`header_contact|header`, `sticky_cta|sticky`,
  `sticky_cta_close|sticky`). The ONLY permitted delta is `goal: null → "form"` on
  `header_contact`, declared in C2.
- `header_contact_mobile` + `header_mobile_menu` read from the **shipped client bundle**:
  `grep -o "header_contact_mobile\|header_mobile_menu"
  pharmacies/web/.next/static/chunks/app/layout-*.js`. P0-D records the brief's suggested
  glob misses it; widen to `.next/static/chunks/**` if the layout chunk is empty.
- Every chrome href probed: **0 internal 404s**. Paste the status line per href.
- Link floor per route `>=` `sweep_baseline.json`, new number reported. Tightest: `/about`,
  `/contact`, `/privacy-policy`, `/cookie-policy`, `/terms` and all 8 `/services/*` at 10;
  `/` 25; `/blog` 37.
- The skip link's focused ground measured (A5): white on `#0f3a4a` = 12.18.
- Header CTA visibility at 390 / 768 / 1023 / 1024 / 1280, measured as `display: none`,
  **not** "absent from the DOM" (R1 false premise 3). Declare the breakpoint change
  (`xl:` → `lg:`, so the desktop CTA now appears from 1024 and tablet volume shifts to the
  mobile row); do not fix it.
- Drawer focus trap present at the kit SHA this port builds against (playbook §8, last
  entry). Verify, do not re-implement, do not edit `packages/**`.

**Receipt:** `docs/pharmacies/_port/P1C_RECEIPT.md`. **Model: Opus. Do NOT launch subagents.**

---

## P1-D. GREY RAMP — Sonnet

**OWNS (sole owner): exactly these 26 files**, and nothing else in the repo. Paths
relative to `pharmacies/web/src/`, `neutral-*` hit count in brackets:

`app/research/pharmacy-openings-closures-index/page.tsx` (94),
`app/page.tsx` (78), `app/research/pharmacy-density-and-workload-index/page.tsx` (71),
`app/for/[slug]/page.tsx` (19), `app/services/[slug]/page.tsx` (17),
`app/terms/page.tsx` (16), `components/forms/LeadForm.tsx` (14),
`app/privacy-policy/page.tsx` (14), `components/forms/BookingPicker.tsx` (13),
`components/forms/DetailsForm.tsx` (11), `app/thank-you/page.tsx` (11),
`app/cookie-policy/page.tsx` (11), `app/complete/page.tsx` (11),
`app/blog/[category]/[slug]/page.tsx` (10), `app/services/page.tsx` (8),
`app/blog/page.tsx` (8), `components/research/PharmacyIndexCharts.tsx` (6),
`app/error.tsx` (6), `app/for/page.tsx` (5), `app/book/page.tsx` (5),
`app/blog/[category]/page.tsx` (4), `app/about/page.tsx` (4),
`components/ui/Breadcrumb.tsx` (3), `app/not-found.tsx` (2),
`app/contact/page.tsx` (2), `app/calculators/page.tsx` (1).

**444 occurrences across 26 files.**

**OFF LIMITS (ls-verifiable):** `app/globals.css` and `app/layout.tsx` (P1-A);
`components/ui/layout-utils.ts`, 4 hits (P1-B); `components/layout/SiteHeader.tsx` 4 and
`components/layout/SiteFooter.tsx` 1 (deleted by P1-C); `components/ui/StickyCTA.tsx`, 4
hits (P1-C); `components/layout/PharmaciesBackdrop.tsx` (P1-E); `src/tests/` (P1-F);
`app/admin/**` (already `slate-*`, not in the port's lease); `packages/**`.

Together: 444 + 4 + 4 + 1 + 4 = **457**, which is the measured site total. The sets are
disjoint and complete.

**The mapping is mechanical, one-to-one, SAME numeric step:** `neutral-50→slate-50`,
`100→100`, `200→200`, `300→300`, `400→400`, `500→500`, `600→600`, `700→700`, `800→800`,
`900→900`. The kit paints `slate-*`.

**Exceptions checked before replacing, not after.** No warm-neutral semantic surface
exists on this site: there is no `bg-[#fafaf9]`-style warm literal and every `neutral-*`
hit is body copy, a border, a heading or a chart label. The two research pages and
`PharmacyIndexCharts.tsx` (171 of the 444) are data-visualisation greys — swap them the
same way, but **re-read the two research pages' chart captions after the swap**: P0-D
records 29 contrast failures at 2.48/2.58 in exactly those footnotes, and a step swap must
not make them worse. Report the ratio before and after; **fixing them is NOT in this
package** (they are a phase-0 finding owned by a later content pass).

**No other class changes.** Not a colour, not a spacing utility, not a word of copy. If a
file needs anything else, write it in the receipt as a handoff.

### Acceptance (P1-D)

```bash
cd pharmacies/web
grep -rn "neutral-" <the 26 files>                 # expect: no hits
git diff -U0 -- <the 26 files> | grep -E '^[+-]' | grep -vcE 'neutral-|slate-'   # expect: 0
npx tsc --noEmit                                   # expect: no output
```
The second command is the load-bearing one: it proves **no line changed for any other
reason**. Paste its output, not a verdict.

**Receipt:** `docs/pharmacies/_port/P1D_RECEIPT.md`. **Model: Sonnet. Do NOT launch subagents.**

---

## P1-E. BACKDROP — `PharmaciesBackdrop` — Opus

**OWNS (sole owner):** NEW
`pharmacies/web/src/components/layout/PharmaciesBackdrop.tsx`.
**OFF LIMITS:** everything else. Do not mount it — P1-C does.
**Depends on:** P1-A (for the ramp step it names). **Blocks P1-C** (footer `backdrop` slot).

Take the TEMPLATE of `generalist/web/src/components/layout/GeneralistBackdrop.tsx`: its
`<defs><pattern>` + `<rect fill="url(#id)">` structure, `aria-hidden`,
`pointer-events-none absolute inset-y-0 right-0 w-[55%] hidden sm:block`, left-fading
`maskImage`, per-instance `patternId`, zero JS, zero animation, zero dependency, identical
server and client, and its stated host contract (parent `relative overflow-hidden`,
content `relative z-10`).

**Two deliberate deviations, both measured:**
1. **No fixed `viewBox`, no `preserveAspectRatio="slice"`.** Use
   `patternUnits="userSpaceOnUse"` painted into a `width="100%" height="100%"` rect.
   generalist's fixed-viewBox shape is what produces horizontal overflow at 390, and a
   phase-1 brief has recommended copying it before. Baseline here is **0 overflow at every
   width**; this package must not break that.
2. `patternId` as a prop with a default — a DOM id must be unique per document.

**Motif brief, pharmacy's own:** a repeating dispensary-shelf rhythm, a horizontal rule at
a fixed pitch with short vertical dividers reading as the edge of a run of shelving, with
an occasional longer vertical where a bay ends. Pill capsules, mortar-and-pestle glyphs,
green crosses and prescription-pad clip art are rejected for the same reason startups-tech
rejected rockets: the wordmark already carries the pharmacy mark, and the backdrop must be
structure, not iconography.

**Colour: the `primary-400` step `#45cdff`, written as a LITERAL**, not
`var(--color-primary-400)` — an undefined custom property invalidates the whole declaration
and the element then paints nothing with every test still green, and Tailwind v4 emits the
ramp as oklch rather than the sRGB these ratios were measured on. Both reasons go in the
file. No new colour enters: it is a declared step of A1. The brand `#0f3a4a` is NOT used
(1.47 on slate-900, invisible there).

**Contrast rows, one per ground, written into the file.** Phase 1 mounts it on the kit
footer's `bg-slate-900` only, so phase 1 writes exactly ONE row and later phases add
theirs. Measure the bare ground and the ground composited at the opacity you ship, against
white (footer headings) and `text-slate-300` `#cbd5e1` (footer links). `#45cdff` on
slate-900 is 9.72 at full strength — report the **composited** figure, not that one.

### Acceptance (P1-E)

```bash
cd pharmacies/web
ls src/components/layout/ | grep -ci backdrop                                  # gate row 4, expect: 1
grep -c "viewBox" src/components/layout/PharmaciesBackdrop.tsx                 # expect: 0
grep -c "userSpaceOnUse" src/components/layout/PharmaciesBackdrop.tsx          # expect: 1
grep -c "use client\|useEffect\|useState" src/components/layout/PharmaciesBackdrop.tsx  # expect: 0
npx tsc --noEmit                                                               # expect: no output
```
Rendered (after P1-C mounts it, on the manager's build): at 390,
`document.documentElement.scrollWidth === clientWidth` on `/`, `/blog` and
`/research/pharmacy-openings-closures-index`. Baseline is 0 overflow at every width; any
new offender is a blocker on this package.

**Receipt:** `docs/pharmacies/_port/P1E_RECEIPT.md`. **Model: Opus. Do NOT launch subagents.**

---

## P1-F. RING GUARD — Sonnet

**OWNS (sole owner):** NEW `pharmacies/web/src/tests/focus-ring.test.ts`.
**OFF LIMITS:** every source file. If the guard finds offenders, this package **lists them
for P1-B and P1-C and fixes none of them.**
**Depends on:** P1-B (the recipes) and P1-C (the chrome), so it runs last.

Copy the SHAPE of `contractors-ir35/web/src/tests/focus-ring.test.ts` — named by the
playbook as the one to copy — with R1's S3 correction already applied:

- A `readdirSync` walk enumerating every `.tsx` under `src`, **excluding `src/app/admin`**
  (staff analytics behind a password, not in the port's lease). Do not pin the five shared
  recipes: that is the defect that let 29 hand-rolled rings through on contractors-ir35.
- The guards-the-guard assertion (gate row 8). Its message must contain the literal string
  **`guards the guard`**, which is what the gate greps for. Assert `corpus.length > 25`,
  assert `app/page.tsx` is in the corpus, assert at least one body contains
  `focus-visible:outline-[var(--focus-ring)]` (so a silently-empty read fails), and assert
  no corpus path contains `/admin/`.
- **Ban both shapes**: any bare `focus-visible:outline-primary-` AND any
  `focus-visible:outline-[` whose bracketed value is not `var(--focus-ring)`. A regex that
  bans only the first is what let four startups-tech forms through — and on this site
  every pre-port ring is a bracketed `#0f3a4a` literal, so the bracketed ban is the one
  that does the work. Also ban `focus:ring-[` with a hex (the `StickyCTA` close-button
  shape) and bare `focus:outline-none` with no sibling ring token on the same element.
- Assert `btnPrimary` is the kit recipe, not a local square one: contains `rounded-xl`,
  `font-bold`, `min-w-[10rem]`, `var(--btn-ground,`.
- **Prove the guard bites:** reintroduce `outline-[#0f3a4a]` in a scratch string, watch it
  fail, remove it. Report that you did.
- Write no sentence in the file you have not measured. R1's S3 was a true-sounding comment
  that was false.

Known offender at plan time, which P1-B and P1-C must have already closed:
`app/admin/analytics/login/page.tsx:39` (`focus:outline-none`, no compensating ring) — it
is **excluded by the admin carve-out**, so the guard will not see it. Record that in the
file and in P1-G rather than letting a later agent think it was fixed.

### Acceptance (P1-F)

```bash
cd pharmacies/web && npm test                                 # expect: all pass; report N/N (baseline: 5 test files, vitest run)
grep -rl 'readdirSync' src/tests | wc -l                      # expect: 1
grep -rl 'guards the guard' src/tests | wc -l                 # expect: 1
```
If the run fails, the receipt's deliverable is **the offender list with file:line and the
owning package** (P1-B for a recipe, P1-C for chrome, P1-D for a page), not a fix.

**Receipt:** `docs/pharmacies/_port/P1F_RECEIPT.md`. **Model: Sonnet. Do NOT launch subagents.**

---

## P1-G. DEFERRED, on purpose — state it, do not do it

- `app/admin/analytics/login/page.tsx:39`, the one genuine ring defeat P0-C found. Internal
  password-gated surface, outside the port's lease and outside P1-F's corpus. Phase 6.
- 8 SVG `<rect>` `NaN` render errors on `/research/pharmacy-openings-closures-index` at
  every width (P0-D serious 1). A live chart defect, not chrome. Phase 4 or a data pass.
- 29 chart-caption contrast failures (2.48/2.58) on the two `/research/*` pages (P0-D
  serious 2). P1-D touches those files but **must not fix them** — report the ratios
  unchanged.
- 8 missing `scroll-margin-top` anchors on one blog article. Phase 2.
- `MiniCapture` / `BookingPicker` / `DetailsForm` fork-vs-shared against kit
  `leads/capture-steps`: unresolved in P0-E, and they are form files, not chrome. Phase 6.
- `components/ui/Breadcrumb.tsx` → kit `primitives/Breadcrumb.tsx` with its `tone` prop:
  P0-E says ADOPT-KIT, but only one route renders a breadcrumb today. Phase 3.
- `niche.config.json`: the stale `brand.logo_path`, the 175-char `description`, and the
  7-vs-5 blog-category drift. Config file, owner-visible, phase 6.
- The 10 `section-label` call sites → `<Eyebrow>`: phase 5 owns `app/page.tsx`. Gate row 5
  stays 0/10 at phase-1 close and that is expected.
- 159 hardcoded hexes in `.tsx` (44 on `app/page.tsx`, 54 on the two research pages). Page
  phases. "No hex outside `globals.css`" cannot hold at phase-1 close and must not be
  claimed; the scoped proof is `layout-utils.ts` + `PageShell.tsx` = 0, plus
  `PharmaciesBackdrop.tsx`'s one deliberate reasoned literal.

---

## R1. ADVERSARIAL REVIEW — Opus

**OWNS:** `docs/pharmacies/_port/R1_PHASE1_REVIEW.md` only. **Read-only on code.**
**Runs after** the manager's single build and `next start`.

**"Finding nothing is a failed review."** Six builders touched 30+ files, mounted a shared
shell for the first time on this site, pinned a ramp whose brand step is the 950 not the
600, and added a control the site never had. A clean sheet means you have not looked.
Review against the **rendered DOM**, not the source.

**KNOWN AND ACCEPTED, do not re-report:** the AdSense CSP `frame-src` console line on every
route; the 8 research-page SVG `NaN` errors; the 29 research-caption contrast failures; the
3 scattered 60s navigation timeouts; `304` statuses under repeated local crawling; the
`unrendered nav.hidden.lg:flex` flag at non-desktop widths; `app/admin/analytics/login`'s
ring; the h1 `600`-vs-`700` weight split P0-D flagged to watch.

**The eight gate rows**, re-run and diffed against §0's baseline. Expected: row 1 `>= 2`
(was 0); row 2 report the number, no floor; row 3 non-empty; row 4 `1` (was 0); row 5
`Eyebrow=0 section-label=10`, unchanged and expected; row 6 empty, or every printed line
reasoned AT that line — never reported as a pass without the bracketed-literal sentence;
row 7 every gradient file's ring measured stop by stop, composited; row 8
`walks=1 guards-the-guard=1` (was 0/0).

Method, non-negotiable:
1. Ring walk on the real `:focus-visible` state with a **320ms settle** before
   `getComputedStyle` (`transition-colors` animates `outline-color`; an immediate read
   returns a mid-transition value). Composite through a 1x1 canvas — Tailwind v4 returns
   `oklab(...)` and an `rgba?\(` regex silently yields the wrong ground. `outline-offset-2`
   paints on the PARENT's ground, so read the ancestor's fill.
2. `browser_check` vs `browser_baseline.json`: **deltas only**. New sub-floor rows and any
   new overflow offender (baseline 0 at every width) are blockers.
3. CTA triple diff vs `cta_baseline.json`: three ids and placements unchanged on 55 routes
   plus the one declared `goal` addition; the mobile pair from the **shipped client bundle**.
4. Link floor per route `>=` `sweep_baseline.json`. Chrome adds links, never removes.
5. Landmarks on 10 sampled routes: one `<main id="main">`, one skip link, one `<header>`,
   one `<footer>`. `/embed/[slug]`: all four = 0, and no sticky bar.
6. Em-dash sweep on the rendered chrome: 0 (baseline 0 across 55 URLs).
7. The four-marker row, comment-stripped, for `docs/pharmacies/STATE.md`.
8. Challenge the three declared changes: `goal: null → "form"`, the CTA breakpoint `xl:` →
   `lg:`, and "Contact" no longer hiding at `xl:`. Verify each is what actually shipped.

**Receipt:** the review file itself. **Model: Opus. Do NOT launch subagents.**

---

## MANAGER BLOCK — build, test and tag order

```
P1-A tokens          (ALONE, FIRST: globals.css + layout.tsx font/noscript + package.json + lockfile)
      |
      +-- P1-B layout-utils --+
      +-- P1-E backdrop ------+--> P1-C chrome (kit shell, ConsentToggle, StickyCTA re-mount, layout.tsx chrome region)
      +-- P1-D grey ramp -----+                 |
                                                +--> P1-F ring guard
                                                      |
                                                      +--> MANAGER BUILD --> R1
```

1. **P1-A runs alone and first.** Everything else reads its tokens, and it owns the
   lockfile, so nothing else may run `npm install`.
2. **P1-B, P1-D and P1-E run concurrently** after A, on disjoint files.
3. **P1-C runs after B and E** (needs the backdrop for the footer slot and the wrapped
   recipes for its rings). It shares `layout.tsx` with P1-A and must never overlap it.
4. **P1-F runs last of the builders**, after C, so a failure names real offenders.
5. **The manager runs the ONE build and the ONE server. Builders never build, never start a
   server, never run `git` (T1, T3).** A `next start` is already running on **3111** on
   the phase-0-fixed build; kill it before the new build or the `.next` read is stale.
6. Close order: `npx tsc --noEmit` → `npm test` (report N/N against the baseline 5 test
   files) → build → `next start :3111` → the §9.1 gate block → each package's grep proofs
   → `sweep.mjs`, `cta_snapshot.mjs`, `browser_check.mjs` vs the three baselines → R1.
7. Instrument traps: `sweep.mjs`'s `--out` does not land alongside `--save-baseline`, run
   it twice; `cta_snapshot.mjs` has no `--save-baseline`, copy its `--out` by hand;
   `browser_check.mjs` gets moved to background past 600s — poll it, never start a second.
8. Tag/commit only after R1's gaps are fixed and re-reviewed: `port-pharmacies-phase1`.
   `docs/pharmacies/STATE.md`'s pickup block updates **in the same commit** (§9), and this
   plan file is committed with the phase. Nothing is deployed. Count and report any CI
   noise created.

### Decisions the manager must take before launch

1. **`resourcesHref`.** The footer's Resources column has no natural target: there is no
   `/resources`, and the kit default `/landlord-tax` 404s. P1-C's brief wires
   `/research/pharmacy-openings-closures-index` (a real 200 route, label "Research"). The
   alternative is `/blog`. **This is the one owner question that blocks P1-C**; everything
   else in the phase can proceed while it is answered. Recommendation: ship the research
   route, raise it as Q1 for a later one-line change.
2. **The new `ConsentToggle`.** It is a new visible footer control on 55 pages, required by
   the kit footer's prop contract and closing a PECR gap on a site running `posture="opt-out"`
   with no opt-out affordance at all. It is not an interruption. Recommendation: ship it;
   tell the owner it appeared, do not ask first.

### Owner questions, bundled, one decision each (do not block on these)

1. **Footer "Resources" column.** It derives from one hub page. We recommend the pharmacy
   openings-and-closures research index; the alternative is the blog. Agree?
2. **The six nav labels.** They are the raw route names: Services, For, Research, Blog,
   About, Contact. "For" is not a word a reader understands on its own. We changed nothing.
   Do you want a separate wording pass on the nav?
3. **The missing logo file.** The config says there is a logo at `/brand/logo.png`; no such
   file has ever existed and the site has always shown text. We recommend deleting the
   stale line. Do you want a logo designed, or is the text wordmark the answer?
4. **A second typeface for numbers.** Figures currently fall back to whatever the visitor's
   machine has. We can name a safe list (free) or load the estate's numeral font (one extra
   download per visit). We recommend the list.
5. **Button corners.** The shared button recipe gives a very slight 4px rounding; this
   site's buttons are square today. One line either way. We recommend adopting the shared
   one. Agree?

---

## Close (2026-10-07, manager)

**What landed.** All six phase-1 packages (P1-A through P1-F) plus the adversarial review
R1 are done. The kit brand ramp, button trio, focus-ring mechanism, grey-ramp swap, the kit
chrome (`PageShell`/`SiteHeader`/`SiteFooter`), a new `ConsentToggle`, a new
`PharmaciesBackdrop`, and a ring-guard test are all in the tree. Phases 2 through 6 were then
built as one concurrent wave on the owner's instruction, so this phase's tag,
`port-pharmacies-phase1`, lands on the same wave commit as `phase2`..`phase6` (commit: see
tags port-pharmacies-phase1..phase6).

**Gate result.** `tsc` clean. `vitest` 7 files / 72 tests green. Dependency closure OK. Build
green, 72 static pages, `BUILD_ID LsrdJDbZT1Ws9SYqZ_m_c`. Full gate table and the four-marker
thermometer are recorded in `docs/pharmacies/STATE.md`'s 2026-10-07 wave section (they are a
whole-port measurement taken after the wave, not a phase-1-only number).

**Residuals pending review.** R1 found 2 blockers and 5 serious findings. Both blockers and
three of the five serious findings are closed (G1/G2/G3 gap-fix receipts); one serious finding
(S2, the unlayered-rule count) is restated honestly rather than fixed (6 rules are inherited
from the kit, intentional, zero are authored by this site); one (S3, the inherited
`line-height: 1.2` beating the hero's own leading utility) is a documented handoff, not an
edit, so the owner can choose either rhythm later. R2, R3 and the wave verification V1 are
running now and have not reported back; see `docs/pharmacies/STATE.md`'s "Review results
(pending)" placeholder.
