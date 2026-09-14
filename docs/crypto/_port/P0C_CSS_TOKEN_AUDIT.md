# P0-C — CSS, token and contrast audit (crypto)

Package: phase 0, work package C. **Read-only.** No file outside this one was written.
Site: `crypto/web`. Kit: `packages/web-shared/`. Shared prose: `packages/site-styles/prose-standard.css`.

## Provenance

Server identity asserted before anything was quoted from it:

```
$ curl -s http://localhost:3171/ | grep -o '<title>[^<]*</title>'
<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>
```

Served stylesheet: `crypto/web/.next/static/css/07d9ad03298607c6.css`, 76,705 bytes, **0 newlines**
(`wc -l` = 0, i.e. one line). This is why every line-based CSS walk in circulation returns nothing here.

---

## C.1 — The unlayered-rule sweep

### The walk (reusable; character stream, `utf-8-sig`, layer stack derived not guessed)

```python
import re, sys, glob
# Brace-depth walk over a CHARACTER STREAM. Works on minified one-line CSS.
# Reports every rule with its stack of enclosing at-blocks, so "unlayered" is derived, not guessed.
def walk(path):
    src = open(path, encoding='utf-8-sig').read()
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)   # strip comments
    out, buf, stack = [], '', []
    i = 0
    while i < len(src):
        c = src[i]
        if c == '{':
            sel = buf.strip(); buf = ''
            layers = [s for s in stack if s.startswith('@layer')]
            if not sel.startswith('@'):
                out.append((sel, list(stack), layers))
            stack.append(sel)
        elif c == '}':
            buf = ''
            if stack: stack.pop()
        elif c == ';' and buf.strip().startswith('@'):
            buf = ''            # at-statement e.g. @import / bare @layer a,b;
        else:
            buf += c
        i += 1
    return out
for p in sys.argv[1:]:
    for f in sorted(glob.glob(p)):
        rules = walk(f)
        un = [r for r in rules if not r[2]]
        print(f"\n=== {f}  rules={len(rules)} unlayered={len(un)}")
        for sel, stack, layers in un:
            print("  UNLAYERED:", repr(sel[:160]), "| enclosing:", stack)
```

Run:

```
$ python walk.py crypto/web/src/app/globals.css packages/site-styles/prose-standard.css \
                 'crypto/web/.next/static/css/*.css'

=== crypto/web/src/app/globals.css               rules=2   unlayered=2
  UNLAYERED: ':root' | enclosing: []
  UNLAYERED: 'body'  | enclosing: []

=== packages/site-styles/prose-standard.css      rules=28  unlayered=0

=== crypto/web/.next/static/css/07d9ad03298607c6.css  rules=938 unlayered=2
  UNLAYERED: ':root' | enclosing: []
  UNLAYERED: 'body'  | enclosing: []
```

Layers present in the served sheet: `@layer properties, theme, base, components, utilities`
(`grep -o '@layer [a-z, ]*' <css> | sort -u`).

### C1 — `:root` is unlayered. INFORMATIONAL.

`crypto/web/src/app/globals.css:6-10`. Declarations only, no paint. It beats nothing because nothing
else declares these names. Correct as-is; a custom-property block must not be layered or a later
`@layer theme` reset could win.

### C2 — `body` is unlayered and beats every future body-level utility. **MEDIUM** (latent, not live).

`crypto/web/src/app/globals.css:11`

```css
body { background: var(--background); color: var(--ink); font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
```

Consumers: the single `<body>` in `crypto/web/src/app/layout.tsx:24`, rendered as
`<body class="antialiased">` (verified against the running site).

What it currently beats: **nothing**. `antialiased` sets `-webkit-font-smoothing`, which does not
collide with `background`, `color` or `font-family`.

What it *will* beat the moment phase 1 touches the body, on the ground that a v4 utility lives in
`@layer utilities` and an unlayered element rule outranks every layer:

| Utility a port would add to `<body>` | Silently dead against | Ground |
|---|---|---|
| `bg-[var(--background)]` / any `bg-*` | `background:` | unlayered `body` wins |
| `text-[var(--ink)]` / any `text-*` colour | `color:` | unlayered `body` wins |
| `font-sans` / a `next/font` variable class | `font-family:` | unlayered `body` wins |

The font case is the live risk: **crypto loads no webfont at all** (no `next/font` import anywhere in
`crypto/web/src/app/layout.tsx`). A port that adds Geist via `next/font` and applies its class to
`<body>` will render the system stack and every visual test will pass. Fix is one of: wrap this rule
in `@layer base`, or drop the properties the port intends to set as utilities.

### C3 — `prose-standard.css` is fully layered. GOOD.

All 28 rules sit inside `@layer components {` (`packages/site-styles/prose-standard.css:60`), with the
reason stated in its own header comment. Nothing to do. The 34 `.prose` rule occurrences and the 1
`.section-label` rule in the served sheet are all inside that layer.

**Unlayered-rule count for this site: 2 — `:root` and `body`.** Neither is currently beating a utility.

---

## C.2 — Bare `var()` reads with no declaration

Method: classify every `var(--x` in `packages/web-shared/**/*.{ts,tsx}` as **bare** (`var(--x)`) or
**fallback-guarded** (`var(--x, …)`), then check the bare names against crypto's `:root`. Then prove
the result against the *served* sheet rather than the source.

### Kit sweep

Bare reads that crypto **does** declare (safe): `--border`, `--brand-on-primary`, `--brand-primary`,
`--brand-primary-strong`, `--ink`, `--muted`, `--surface`.

Bare reads crypto does **not** declare — **3 names, all from one recipe**:

| Name | Site | Severity |
|---|---|---|
| `--color-primary-600` | `packages/web-shared/design/layout-utils.ts:31` | HIGH if adopted |
| `--color-primary-700` | `packages/web-shared/design/layout-utils.ts:31` | HIGH if adopted |
| `--color-primary-800` | `packages/web-shared/design/layout-utils.ts:31` | HIGH if adopted |

### C4 — the kit's `design/layout-utils.ts` `btnPrimary` is an invisible-button landmine here. **HIGH (latent).**

```
bg-[var(--btn-ground,var(--color-primary-600))] … text-white
```

The outer name is fallback-guarded, but the *fallback itself* is a bare read of a Tailwind theme
variable crypto never mints. Proof from the served sheet (script `deadvar.py`: collect every
`var(--x)` with no comma, subtract every `--x:` declared anywhere in the same sheet):

```
crypto/web/.next/static/css/07d9ad03298607c6.css  declared: 208
  BARE READS WITH NO DECLARATION ANYWHERE IN THE SERVED SHEET:
    --color-primary-600 -> .bg-\[var\(--btn-ground\,var\(--color-primary-600\)\)\]{background-color:var(--btn-ground,var(--color-primary-600))}
    --color-primary-700 -> .hover\:bg-…{background-color:var(--btn-ground-hover,var(--color-primary-700))}
    --color-primary-800 -> .active\:bg-…{background-color:var(--btn-ground-active,var(--color-primary-800))}
```

Both names in each chain are undefined, so the whole `background-color` declaration is **invalid** —
not black, *no background*. With the recipe's hardcoded `text-white` that is white-on-white, the exact
shape of the sibling-site launch defect.

**It is NOT live on crypto.** Verified two ways:
1. Crypto imports its own `@/components/ui/layout-utils`, never the kit's `design/layout-utils`
   (`grep -rn "layout-utils" crypto/web/src` — every hit is the local path).
2. The class string appears on zero rendered elements:
   `for p in / /services /about /contact /blog /book; do curl -s localhost:3171$p | grep -c 'btn-ground'; done` → `0 0 0 0 0 0`.

It is emitted into the sheet only because `@source "../../../../packages/web-shared"` scans the whole
kit. **Phase 1 must not adopt `packages/web-shared/design/layout-utils.ts` `btnPrimary` without first
declaring `--btn-ground` / `--btn-ground-hover` / `--btn-ground-active` (or the three `--color-primary-*`).**

### C5 — fallback-guarded kit reads: 14 names, all safe. INFORMATIONAL.

`--accent-strong`, `--brand-primary-ground`, `--brand-primary-ground-hover`, `--brand-primary-text`,
`--btn-radius`, `--calc-warn-accent/-bg/-fg`, `--hero-cream`, `--primary`, plus the guarded copies of
`--brand-primary` / `--brand-primary-strong`. Each terminates in a literal, so an undeclared name
degrades rather than blanking. `prose-standard.css` is the same: every one of its
`--accent` / `--accent-strong` / `--primary` reads ends `…, #0f172a)` (lines 138, 146, 155, 238, 257).

**Verified on the running site: zero elements currently paint nothing for an undeclared custom property.**

### C6 — the two-copy kit components: crypto imports NEITHER family. INFORMATIONAL.

`ReadingProgress.tsx` and `TableOfContents.tsx` exist in both `packages/web-shared/design/blog/` and
`packages/web-shared/content/`. `grep -rn "ReadingProgress\|TableOfContents" crypto/web/src` → **no hits**.
Crypto also does not import the kit's `MiniCapture` (it has a local
`crypto/web/src/components/calculators/MiniCapture.tsx`) and imports no kit `SiteHeader`.

The only kit UI components crypto actually imports are:
`web-shared/components/ServiceTiers` (`crypto/web/src/app/services/page.tsx:3`) and
`web-shared/tools/components/Calculator`. Both read only fallback-guarded names. Confirmed rendered:
`/services` emits `bg-[var(--brand-primary-ground,var(--brand-primary))]`, which resolves to `#0e1a3a`.

Whichever family a port adopts, both are fallback-safe — but note `packages/web-shared/content/*`
reads `var(--brand-primary, var(--primary, …))` while `design/blog/BlogListWithSearch.tsx:171,180`
reads `var(--accent-strong, var(--brand-primary-strong, …))`. Crypto declares `--brand-primary-strong`
identical to `--brand-primary`, so the `design/blog` family renders **no hover delta** (see C13).

---

## C.3 — The composed-override cascade race

Crypto's `btnPrimary` is **local and fully hardcoded**, not the kit recipe
(`crypto/web/src/components/ui/layout-utils.ts:17`):

```
inline-flex min-h-12 items-center justify-center bg-[#0e1a3a] px-7 py-3.5
text-sm font-medium text-white tracking-wide transition-colors duration-150
hover:bg-[#8f421f] active:bg-[#6e3118] … focus-visible:outline-[#0e1a3a]
```

Every composition site (`grep -rn '\${btn[A-Za-z]*} ' crypto/web/src`):

| Call site | Appended | Competes with | Verdict |
|---|---|---|---|
| `crypto/web/src/app/book/page.tsx:47` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/app/complete/page.tsx:31` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/app/complete/page.tsx:59` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/app/complete/page.tsx:99` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/components/forms/BookingPicker.tsx:106` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/components/forms/DetailsForm.tsx:120` | `mt-4 text-base` | `text-sm` | **race, recipe wins** |
| `crypto/web/src/app/error.tsx:33` | `inline-flex` | `inline-flex` (already in recipe) | no-op, dead class |
| `crypto/web/src/app/not-found.tsx:12` | `w-full max-w-xs sm:w-auto` | — (recipe has no width) | clean |
| `crypto/web/src/components/forms/BookingPicker.tsx:158` | `w-full sm:w-auto` | — | clean |
| `crypto/web/src/components/forms/DetailsForm.tsx:194` | `w-full sm:w-auto` | — | clean |

### C7 — `${btnPrimary} … text-base` is silently discarded on 6 CTAs. **MEDIUM.**

Settled by byte offset in the served stylesheet, not by the class string:

```
$ CSS=crypto/web/.next/static/css/07d9ad03298607c6.css
$ grep -bo '.text-base{' $CSS   ->  37790
$ grep -bo '.text-sm{'   $CSS   ->  37980
```

`.text-base` is emitted at byte **37790**; `.text-sm` at byte **37980**. Equal specificity, same layer,
`.text-sm` is **190 bytes later**, so `text-sm` wins and the appended `text-base` does nothing. Six
conversion-path buttons (booking, booking-complete, details-form) render at 14px where the author
asked for 16px. Fix is to strip `text-sm` from the recipe or to mint a `btnPrimaryLg`, not to reorder
the class string — the string has no effect on the outcome.

### C8 — `w-full` composition is safe. INFORMATIONAL.

```
$ grep -bo '.w-full{' $CSS -> 18040   (single occurrence; recipe declares no width)
```
Crypto's local recipe, unlike the kit's, carries **no `min-w-[10rem]`**, so `w-full` has nothing to
race. This differs from the kit recipe and would regress if phase 1 swapped in the kit's.

### C9 — `${btnPrimary} inline-flex` at `crypto/web/src/app/error.tsx:33` is a dead class. LOW.
`.inline-flex` at byte 16224; the recipe already opens with it. Harmless, but it is the tell that the
author believed appended classes win. They do not.

### C10 — the brief's header-CTA race does not exist on this site. **FALSE PREMISE (see §8.3).**
Crypto renders **no `<header>` and no `<nav>` element at all**:
`curl -s http://localhost:3171/ | grep -o '<header[^>]*>'` → empty; `'<nav[^>]*>'` → empty.
`crypto/web/src/app/layout.tsx` imports `SiteFooter` and nothing else chrome-shaped. There is no
`SiteHeader` in `crypto/web/src`, and the kit's `SiteHeader.tsx` is not imported. The
`hidden` vs `lg:inline-flex` race is therefore not reachable here. (Structural finding — P0-E's lane —
but it falsifies this package's brief, so it is recorded.)

---

## C.4 — Contrast

Contrast is symmetric: **one ratio, three verdicts** (3.0 as a graphic, 4.5 as text, 4.5 as a ground
under text). Every row is labelled by source. Utility rows were derived by converting the `oklch()`
value **emitted in the served sheet**, never from a v3 hex table.

### Converter self-test (both directions)

```python
assert abs(ratio('#62748e', '#ffffff') - 4.77) <= 0.02   # exact 4.764
assert abs(ratio('#90a1b9', '#ffffff') - 2.63) <= 0.02   # exact 2.630
assert oklch_to_hex(0.554, 0.046, 257.417) == '#62748e'  # v4 slate-500
assert oklch_to_hex(0.704, 0.040, 256.788) == '#90a1b9'  # v4 slate-400
-> self-tests PASS
```

Note on the calibration figure: v4 `slate-500` `#62748e` on white measures **4.764**, which rounds to
**4.76**, not 4.77. Immaterial (both clear 4.5) but recorded as a rounding correction.

### v4 ramp steps as actually emitted (`grep -o -- "--color-<name>:[^;]*" <css>`)

| Utility | emitted | sRGB |
|---|---|---|
| `neutral-200` | `oklch(92.2% 0 0)` | `#e5e5e5` |
| `neutral-300` | `oklch(87% 0 0)` | `#d4d4d4` |
| `neutral-400` | `oklch(70.8% 0 0)` | `#a1a1a1` |
| `neutral-500` | `oklch(55.6% 0 0)` | `#737373` |
| `neutral-600` | `oklch(43.9% 0 0)` | `#525252` |
| `neutral-900` | `oklch(20.5% 0 0)` | `#171717` |
| `orange-600` | `oklch(64.6% .222 41.116)` | `#f54900` |
| `orange-700` | `oklch(55.3% .195 38.402)` | `#ca3500` |
| `orange-800` | `oklch(47% .157 37.304)` | `#9f2d00` |

### The load-bearing rows

| # | Source | Colour | Against | Ratio | graphic 3.0 | text 4.5 | ground 4.5 |
|---|---|---|---|---|---|---|---|
| 1 | token | `--brand-primary` `#0e1a3a` | white | **17.11** | PASS | PASS | PASS |
| 2 | token | `#0e1a3a` | `--surface` `#f8fafc` | 16.35 | PASS | PASS | PASS |
| 3 | token (literal) | primary CTA ground `#0e1a3a` + `text-white` | — | 17.11 | PASS | PASS | PASS |
| 4 | token (literal) | CTA **hover** `#8f421f` under white | — | **7.08** | PASS | PASS | PASS |
| 5 | token (literal) | CTA **active** `#6e3118` under white | — | 9.93 | PASS | PASS | PASS |
| 6 | token | `.section-label` `#fff` on `var(--accent,var(--brand-primary))`=`#0e1a3a` | — | 17.11 | PASS | PASS | PASS |
| 7 | utility | footer link `text-neutral-300` `#d4d4d4` on footer ground `#0e1a3a` | — | 11.54 | PASS | PASS | PASS |
| 8 | utility | footer link hover `white` on `#0e1a3a` | — | 17.11 | PASS | PASS | PASS |
| 9 | utility | footer rule `border-neutral-200` `#e5e5e5` on `#0e1a3a` | — | 13.58 | PASS | PASS | PASS |
| 10 | token | consent/footer **Privacy Policy** link `text-neutral-300` on `#0e1a3a` | — | 11.54 | PASS | PASS | PASS |
| 11 | token | `--ink` `#0f172a` on `--background` `#ffffff` | — | 17.85 | PASS | PASS | PASS |
| 12 | token | `--ink-soft` `#334155` on white | — | 10.35 | PASS | PASS | PASS |
| 13 | token | `--muted` `#475569` on white | — | 7.58 | PASS | PASS | PASS |
| 14 | token (literal) | `#64748b` (a v3 `slate-500` hex, 12 uses in src) on white | — | 4.76 | PASS | PASS | PASS |
| 15 | **utility** | **`text-neutral-400` `#a1a1a1` on white** | — | **2.58** | **FAIL** | **FAIL** | **FAIL** |
| 16 | utility | `text-neutral-500` `#737373` on white | — | 4.74 | PASS | PASS | PASS |
| 17 | utility | `text-neutral-600` `#525252` on white | — | 7.81 | PASS | PASS | PASS |

Footer ground is read from the running site:
`curl -s http://localhost:3171/ | grep -o '<footer[^>]*>'` →
`<footer class="border-t border-neutral-200 bg-[#0e1a3a] text-neutral-300">`.
The Privacy Policy link renders `class="text-neutral-300 transition-colors hover:text-white"`, i.e.
row 10 = row 7. Crypto's consent UI is the kit `ConsentProvider` (`crypto/web/src/app/layout.tsx:3`);
its Privacy link inherits the same neutral-300-on-navy treatment in the footer, which is the only
place the notice's policy link is rendered on the served pages checked.

### C11 — `text-neutral-400` fails all three floors. **HIGH.** 2.58:1.

`crypto/web/src/app/blog/page.tsx:33` (empty-state copy),
`crypto/web/src/app/for/[slug]/page.tsx:37` (**stat labels**, `text-xs sm:text-sm font-semibold uppercase`),
`crypto/web/src/app/research/crypto-tax-gap-index/page.tsx:115, 122, 212` (source/footnote copy),
`crypto/web/src/app/page.tsx:377, 570, 594` (`ArrowRight` icons — graphic floor, also failed).

Rule `.text-neutral-400{` is emitted at byte 42022 of the served sheet, so these are live. The stat
labels and the research footnotes are the serious ones: small, informational, and below even the
graphic floor. `neutral-500` (4.74) is the minimum swap; `neutral-600` (7.81) is the safe one.

### C12 — eyebrow / section-label is the strongest element on the page. INFORMATIONAL.

`.section-label` renders `background:var(--accent,var(--brand-primary,#0f172a));color:#fff` — white on
`#0e1a3a`, 17.11:1, 16 instances on the homepage. It is a filled chip, not tinted text, so it clears
the ground floor comfortably. No action.

### C13 — every hover state that reads `--brand-primary-strong` is a no-op. **MEDIUM.**

`crypto/web/src/app/globals.css:9` sets `--brand-primary-strong: #0e1a3a`, **identical** to
`--brand-primary`. Consequences on rendered surfaces:
- `packages/site-styles/prose-standard.css:138/146` — in-text prose links are `#0e1a3a` at rest and
  `#0e1a3a` on hover. Delta 1.00:1. (Links remain identifiable: line 140 sets `text-decoration:underline`.)
- `packages/web-shared/components/ui/layout-utils.ts:43` `btnPrimary` hover → same colour
  (not reached by crypto, which uses its local recipe, but reached by `ServiceTiers`).
- Prose link vs body text: `#0e1a3a` against `--ink` `#0f172a` is **1.04:1**. Without the underline
  the two would be indistinguishable. Phase 1 must not remove that underline while the hues are equal.

Crypto's own CTA does not have this problem — it moves navy → burnt orange on hover (row 4).

### The burnt-orange action hue: it exists.

`crypto/web/src/components/ui/layout-utils.ts:17` — **`#8f421f`** (hover) and **`#6e3118`** (active).
One occurrence of each in the whole of `crypto/web/src`; they exist *only* as CTA hover/active states
and have no token, no resting use, and no presence anywhere else in the palette. This matches the
rollout doc's record (`docs/_engines/PROPERTY_STANDARD_ROLLOUT.md:1119`, "a second burnt-orange action hue").

---

## C.5 — Verdict on the brand mapping

`--brand-primary: #0e1a3a` measures **17.11:1 against white — one ratio**, and therefore:

- **(a) as a graphic** (rules, icons, chart marks, borders): **YES.** Clears 3.0 by 5.7x.
- **(b) as text on white**: **YES** technically (17.11 ≥ 4.5) — but it is 1.04:1 against `--ink`
  `#0f172a`, so it carries **no semantic signal**. Navy-as-text reads as body text. It is a
  legibility pass and an information-design fail.
- **(c) as a ground under white text**: **YES.** 17.11:1. The footer and `.section-label` already do it.

So the rollout doc's mapping holds against the source: **`#0e1a3a` is a ground hue, not an action
hue.** It cannot mark an action, because on white it is indistinguishable from body copy, and on the
standard's navy panels it is navy-on-navy.

### Does crypto need `--brand-primary-text` / `--brand-primary-ground` minted?

**Not for correctness today — yes as the phase-1 mechanism.** Both kit reads are fallback-identical:

- `packages/web-shared/leads/MiniCapture.tsx:440,483,555` — `text-[var(--brand-primary-text,var(--brand-primary))]`
- `packages/web-shared/components/ServiceTiers.tsx:51,73` — `bg-[var(--brand-primary-ground,var(--brand-primary))]`

Crypto declares neither, so both resolve to `#0e1a3a` and the site renders byte-identically to a site
that declares them equal. Verified: `/services` emits
`bg-[var(--brand-primary-ground,var(--brand-primary))]` and both names appear as utility classes in
the served sheet (`brand-primary-ground` at bytes 27378/27450/53650/53741, `brand-primary-text` at
40613/40672), so the split is already wired and costs nothing to use.

They are the *only* way to split this brand without touching `--brand-primary` itself. Recommended
phase-1 shape:

```css
--brand-primary:        #0e1a3a;   /* unchanged — ground identity */
--brand-primary-ground: #0e1a3a;   /* explicit; navy stays the ground */
--brand-primary-text:   <action>;  /* the action hue, for text/link semantics */
--brand-primary-strong: <action-dark>;  /* so hover finally moves — fixes C13 */
--accent:               <action>;  /* prose links + blockquote rules pick this up free */
--accent-strong:        <action-dark>;
```

### What an action ramp would have to be

It must clear all three floors on white, because the same hue is asked to be a link colour (text
4.5), a button ground under white (ground 4.5) and an icon/rule (graphic 3.0). Measured candidates,
in the burnt-orange family the brand already implies:

| Candidate | Source | Ratio vs white | graphic | text | ground |
|---|---|---|---|---|---|
| `#8f421f` (**crypto's own CTA hover**) | already in source | **7.08** | PASS | PASS | PASS |
| `#6e3118` (crypto's CTA active) | already in source | 9.93 | PASS | PASS | PASS |
| `orange-800` `#9f2d00` | v4 utility | 7.37 | PASS | PASS | PASS |
| `orange-700` `#ca3500` | v4 utility | 5.22 | PASS | PASS | PASS |
| `orange-600` `#f54900` | v4 utility | 3.60 | PASS | **FAIL** | **FAIL** |
| `orange-500` `#ff6900` | v4 utility | 2.89 | **FAIL** | **FAIL** | **FAIL** |

`orange-500` and `orange-600` are both disqualified. Note this is exactly the case the kit comments
warn about at `packages/web-shared/design/layout-utils.ts:26` ("orange-600 is 3.56:1") — measured here
at 3.60 from the emitted `oklch()`, confirming the kit's note.

### OWNER GATE — the action hex is a brand swatch decision.

**Recommendation: `#8f421f`, with `#6e3118` as its `-strong` step.**
Rationale, with the measurements behind it: it is 7.08:1 (clears all three floors with headroom for a
darker hover at 9.93:1); it is **already in the codebase** as the site's own CTA hover, so it is not a
new brand colour, it is the existing one promoted from a hover state to a token; and it is a
mid-saturation burnt orange, which is the mapping the rollout doc recorded for this brand
(`docs/_engines/PROPERTY_STANDARD_ROLLOUT.md:1119`). The v4 `orange-700`/`orange-800` steps are
viable alternates if the owner wants a brighter ramp, but they are more saturated than anything
currently on the site.

**Do not pick this hex without owner sign-off.** Everything above is measurement; the choice is his.

---

## C.6 — Token inventory

### Declared by crypto (10) — `crypto/web/src/app/globals.css:6-10`

| Token | Value | Read by crypto src | Read by kit | Read by prose |
|---|---|---|---|---|
| `--background` | `#ffffff` | 1 | — | — |
| `--surface` | `#f8fafc` | 3 | 10 | 5 |
| `--surface-elevated` | `#ffffff` | **0** | **0** | **0** |
| `--ink` | `#0f172a` | 53 | 18 | 8 |
| `--ink-soft` | `#334155` | 7 | — | 3 |
| `--muted` | `#475569` | 10 | 13 | — |
| `--border` | `#e2e8f0` | 3 | 11 | 6 |
| `--brand-primary` | `#0e1a3a` | 21 | 61 | 7 |
| `--brand-primary-strong` | `#0e1a3a` | **0** | 4+2 | 2 |
| `--brand-on-primary` | `#ffffff` | **0** | 1 | — |

### C14 — declared but read by nothing anywhere: `--surface-elevated`. LOW.
Dead token. Either delete it or make the port use it; leaving it invites a future reader to assume
an elevation system exists.

### C15 — read but not declared (the difference in the other direction). Already covered.
- **Hard** (no fallback, would blank): `--color-primary-600/700/800` → **C4**, HIGH if adopted.
- **Soft** (fallback-guarded, degrade silently): `--accent`, `--accent-strong`, `--primary`,
  `--btn-ground`, `--btn-ground-hover`, `--btn-ground-active`, `--btn-radius`,
  `--brand-primary-ground`, `--brand-primary-ground-hover`, `--brand-primary-text`,
  `--calc-warn-fg`, `--calc-warn-bg`, `--calc-warn-accent`, `--hero-cream`.
  `--accent` / `--accent-strong` are the interesting ones: declaring them is a free, one-line way to
  give prose links, blockquote rules and table accents a real action hue (C13).

### C16 — Tailwind v4 theme-namespace collisions outside `@theme`: **NONE.** GOOD.
Checked all 10 declared names against `--radius-*`, `--color-*`, `--font-*`, `--spacing-*`, `--text-*`,
`--leading-*`, `--shadow-*`. No prefix matches. Crypto has no `@theme` block at all, so the known
estate trap (a namespaced name declared in `:root` instead of `@theme`, generating nothing while
looking like it should) is not present. Worth noting for phase 1: **these 10 tokens are NOT in
`@theme`, so no `bg-brand-primary`-style utilities exist** — every use must stay an arbitrary value
(`bg-[var(--brand-primary)]`), which is what the codebase does today.

---

## C.7 — Does the kit compile here?

```
$ grep -o 'primary-600' crypto/web/.next/static/css/07d9ad03298607c6.css | wc -l
2
```

**2.** Both are the escaped-and-unescaped halves of the single rule
`.bg-\[var\(--btn-ground\,var\(--color-primary-600\)\)\]{background-color:var(--btn-ground,var(--color-primary-600))}`.

That count alone is a weak signal, so the `@source` line was confirmed on two stronger ones —
utilities that exist **only** inside `packages/web-shared` and nowhere in `crypto/web/src`:

```
$ grep -bo 'brand-primary-ground' <css>  -> 27378 27450 53650 53741
$ grep -bo 'brand-primary-text'   <css>  -> 40613 40672
```

`brand-primary-ground` comes solely from `packages/web-shared/components/ServiceTiers.tsx`;
`brand-primary-text` solely from `packages/web-shared/leads/MiniCapture.tsx`, which crypto does not
even import. Both compiled.

### C17 — `@source "../../../../packages/web-shared"` works. GOOD.
The kit compiles, and it compiles *the whole kit*, including components crypto never renders. That is
why the C4 landmine is sitting in the served sheet with no element on it. Implication for phase 1: a
port can adopt any kit component and its utilities will be there — which also means **a broken kit
recipe will arrive fully compiled and look correct in the stylesheet while rendering nothing.**

---

## C.8 — False premises found in this brief

1. **`btnPrimary` for this site is not `packages/web-shared/design/layout-utils.ts`.** Crypto has its
   own `crypto/web/src/components/ui/layout-utils.ts:17`, with every colour hardcoded as a hex and
   **no `var()` at all**. Every one of the 10 composition sites imports the local module. The kit
   recipe is compiled into the sheet but applied to zero elements.
2. **"`btnPrimary` hardcodes `text-white` and its own ground" is true of only one of the three
   `btnPrimary`s in play.** The kit's `design/layout-utils.ts:31` does (`text-white`);
   `packages/web-shared/components/ui/layout-utils.ts:43` uses `text-[var(--brand-on-primary)]` and a
   token ground; crypto's local one hardcodes both. The three must not be discussed as one recipe.
3. **The header-CTA cascade race (`SiteHeader.tsx:473`, `hidden` vs `lg:inline-flex`) is unreachable
   on crypto.** The site renders no `<header>` and no `<nav>`; `layout.tsx` mounts a footer only. There
   is also no "header CTA label" to measure for contrast (§C.4 row 10 substitutes the footer/consent
   Privacy Policy link, which is the link the brief names and which does render).
4. **The calibration figure is 4.76, not 4.77.** v4 `slate-500` `#62748e` on white is exactly
   4.76397. `slate-400` `#90a1b9` = 2.63030 is correct as stated. Immaterial to any verdict.
5. **"the line-based brace-depth walk returns NOTHING against a built stylesheet because that file is
   one line" — confirmed, and the same is true of `globals.css` for a different reason.**
   `globals.css` is 11 lines but begins with a UTF-8 BOM (`ef bb bf`, verified by `xxd`), so a reader
   opened `utf8` gets `﻿@import` as its first token. Both hazards confirmed; not false, recorded
   because the fix (`utf-8-sig` + character stream) is load-bearing for anyone reusing the walk.
6. **The brief's implied unlayered-rule count is wrong in both directions.** It cites a prior audit
   finding "26 rules where the bad grep reported 3". The correct answer for crypto is **2**
   (`:root`, `body`), in both the source and the built sheet, and **0** in `prose-standard.css`
   (all 28 of its rules are inside `@layer components`, by design, per its own line 29 comment).
7. **Not a premise error, but a scoping correction worth carrying forward:** the brief asks to check
   whether the two-copy kit components (`design/blog/` vs `content/`) are the ones crypto imports.
   Crypto imports **neither family**, and imports only two kit UI components in total
   (`ServiceTiers`, `Calculator`). The port's exposure to the kit is far smaller than the brief assumes.

---

## C.9 — What a phase 1 token ramp must do

Executable, in order. Nothing here is a design decision except step 1, which is gated.

1. **[OWNER GATE] Fix the action hex.** Recommend `#8f421f` (7.08:1) with `#6e3118` (9.93:1) as the
   strong step. Both are already in `crypto/web/src/components/ui/layout-utils.ts:17`. Alternates:
   `orange-700` `#ca3500` (5.22) or `orange-800` `#9f2d00` (7.37). **`orange-500` and `orange-600` are
   disqualified — 2.89 and 3.60, they fail the text and ground floors.**
2. **Mint six tokens in `crypto/web/src/app/globals.css:6-10`**, leaving `--brand-primary` untouched:
   `--brand-primary-ground: #0e1a3a`, `--brand-primary-text: <action>`,
   `--brand-primary-strong: <action-dark>` (changing it from its current no-op duplicate),
   `--accent: <action>`, `--accent-strong: <action-dark>`. This alone fixes C13 across prose links,
   blockquote rules and `ServiceTiers` hover, with no component edits.
3. **Wrap the `body` rule in `@layer base`** (`globals.css:11`), or the port's first body-level
   `bg-*` / `text-*` / font class will silently do nothing (C2). Do this *before* adding `next/font`.
4. **Replace every `text-neutral-400`** at `blog/page.tsx:33`, `for/[slug]/page.tsx:37`,
   `research/crypto-tax-gap-index/page.tsx:115,122,212`, `page.tsx:377,570,594` with `neutral-500`
   (4.74) or `neutral-600` (7.81). 2.58:1 fails all three floors including the graphic one (C11).
5. **Decide the CTA text size once.** Either strip `text-sm` from the local `btnPrimary` or add a
   `btnPrimaryLg`; then delete the six dead `text-base` appends and the dead `inline-flex` at
   `error.tsx:33`. Appended classes do not win — `.text-sm` sits 190 bytes after `.text-base` (C7/C9).
6. **If, and only if, the port adopts `packages/web-shared/design/layout-utils.ts`:** declare
   `--btn-ground` / `--btn-ground-hover` / `--btn-ground-active` in the same commit. Undeclared, the
   recipe renders an invisible white-on-white button and every test stays green (C4).
7. **Retire the v3 hex literals.** `#64748b` (12 uses) is a v3 `slate-500`; the v4 emitted value is
   `#62748e`. Same ratio to two places (4.76), so this is hygiene, not a defect — but it is how a v3
   hex table gets trusted next time.
8. **Delete `--surface-elevated`** or give it a consumer (C14).
9. **Do not remove the prose link underline** while `--brand-primary` and `--ink` sit 1.04:1 apart.
   Step 2 is the prerequisite for ever touching it (C13).
