# F10 — Unlayered rule sweep, `contractors-ir35/web/src/app/globals.css`

Date: 2026-09-13. Lease: `globals.css` only. No other file edited.
Source quoted: **WORKING TREE** unless marked `HEAD:`. The build behind
`localhost:3641` (and `web/.next/`) is older than the tree; where that matters
it is called out explicitly.

---

## 0. Headline

| | |
|---|---|
| Unlayered rule blocks previously reported (P0D_CSS_A11Y.md) | **3** |
| Unlayered rule blocks actually present | **26** |
| Rules moved into a layer | **25** |
| Rules recoloured | **0** |
| Rules deliberately left unlayered | **1** (`:where(h2[id],h3[id],h4[id])`, F9, already zero-specificity) |
| Named defects in the brief that reproduce | **2 of 4** |

P0D_CSS_A11Y.md line 24 states: *"Verdict: no unlayered colour-on-shared-class
hazard found in this file."* That verdict is wrong. `.eyebrow`,
`.section-label` and the whole 14-rule `.prose-blog` family are exactly that
hazard, and two of them were painting measured contrast failures.

---

## 1. Why phase 1 missed it, and why the brief's replacement also undercounts

The field-notes command is

```
grep -nE "^[a-zA-Z][^{]*\{" globals.css
```

`^[a-zA-Z]` requires a letter in column 1, so it cannot match `.`, `#`, `[`,
`*` or `:`. It returned four lines (`html`, `body`, `select`,
`select:disabled` — the last two are the tail lines of two multi-line selector
lists, not rules of their own), which is how the audit arrived at "three
inert blocks".

The brief's corrected command

```
grep -nE "^[a-zA-Z.#\[][^{]*\{" globals.css
```

is better but still undercounts. It misses:

* multi-line selector lists — it reports only the final line, so
  `.font-mono,` / `.prose-blog ul,` / `input[type="text"], …` are each seen as
  one rule named after their last selector, and `*,` / `*::before,` are missed
  entirely;
* selectors starting `*` or `:` — `*, *::before, *::after` and
  `:where(h2[id], …)` are both invisible to it;
* it has no notion of `@layer` boundaries at all, so it cannot tell an
  unlayered rule from a layered one. Run against the file as it stands *after*
  this fix it returns the identical line set, all of which are now layered.

**Command actually used**, and the one to put in the field notes — a real
brace-depth walk that strips comments and reports each rule's enclosing layer:

```
python - <<'PY'
import re
s=open('src/app/globals.css',encoding='utf8').read()
s=re.sub(r'/\*.*?\*/',lambda m:''.join(c if c=='\n' else ' ' for c in m.group()),s,flags=re.S)
lines=s.split('\n'); stack=[]
for i,l in enumerate(lines,1):
    for j,ch in enumerate(l):
        if ch=='{':
            k=i-2; pre=[]
            while k>=0 and lines[k].strip().endswith(','): pre.insert(0,lines[k].strip()); k-=1
            sel=(' '.join(pre)+' '+l[:j].strip()).strip()
            lay=[x for x in stack if x.startswith('@layer')]
            if not sel.startswith(('@layer','@media','@theme','@keyframes')) and sel!=':root':
                print(f"{i:>5}  {lay[0] if lay else '*** UNLAYERED ***':<18} {sel[:70]}")
            stack.append(sel)
        elif ch=='}':
            stack and stack.pop()
PY
```

Empirical confirmation that this is not theory — in the **built** stylesheet
`web/.next/static/css/226f67dec972778a.css`, whose layer order is
`@layer properties, theme, base, components, utilities`, a brace-depth walk to
`.prose-blog a{`, `.eyebrow{` and `.section-label{` returns an enclosing-layer
list of `[]` for all three. They sat outside every layer and therefore beat
every Tailwind utility regardless of specificity.

---

## 2. Complete unlayered inventory (state BEFORE this fix)

All line numbers are pre-fix. "Utility-controlled" = a Tailwind utility exists
for at least one declaration, so the unlayered position inverts the cascade.

| # | Line | Selector | Declarations | Layer before | Utility-controlled | Verdict |
|---|---|---|---|---|---|---|
| 1 | 158 | `*, *::before, *::after` | `box-sizing` | none | yes (`box-border`/`box-content`) | moved → `base`; 0 consumers of `box-content` |
| 2 | 164 | `html` | `-webkit-text-size-adjust`, `text-size-adjust`, `-webkit-font-smoothing`, `-moz-osx-font-smoothing` | none | no | moved → `base` (tidiness) |
| 3 | 171 | `@media (prefers-reduced-motion: no-preference) html` | `scroll-behavior` | none | yes (`scroll-smooth`) | moved → `base`; 0 consumers |
| 4 | 177 | `body` | `margin`, `padding`, `min-height`, **`background`**, **`color`**, `font-family`, `font-size`, `line-height`, `font-feature-settings` | none | **yes, firing** | moved → `base`, see §3 |
| 5 | 206 | `.font-mono, .font-geist-mono` | `font-family` | none | yes (`font-mono`) | moved → `components` |
| 6 | 211 | `.eyebrow` | `display`, `font-family`, `font-size`, `font-weight`, `text-transform`, `letter-spacing`, **`color`** | none | **yes, firing — DEFECT** | moved → `components`, see §3 |
| 7 | 221 | `.hairline` | `border-top` (colour) | none | yes (`border-t`, `border-*`) | moved → `components`; 0 class consumers |
| 8 | 240 | `.hero-reveal` | `animation` | none | yes (`animate-*`) | moved → `components`; 0 conflicts |
| 9 | 244 | `.hero-reveal-delay` | `animation` | none | yes (`animate-*`) | moved → `components`; 0 conflicts |
| 10 | 252 | `.section-label` | `display`, **`background`**, **`color`**, `padding`, `font-size`, `font-weight`, `text-transform`, `letter-spacing` | none | yes, dormant | moved → `components`, see §3 |
| 11 | 267 | `.prose-blog` | `max-width`, **`color`**, `font-size`, `line-height` | none | **yes, firing** | moved → `components` |
| 12 | 274 | `.prose-blog h2` | `margin-top/bottom`, `padding-left`, **`border-left` (colour)**, `font-size`, `font-weight`, **`color`**, `letter-spacing` | none | **yes, firing** | moved → `components` |
| 13 | 285 | `.prose-blog h3` | margins, `font-size`, `font-weight`, **`color`**, `letter-spacing` | none | **yes, firing** | moved → `components` |
| 14 | 294 | `.prose-blog p` | margins, **`color`** | none | **yes, firing** | moved → `components` |
| 15 | 300 | `.prose-blog a` | **`color`**, `font-weight`, `text-decoration`, thickness, offset, `transition` | none | **yes, firing — DEFECT** | moved → `components`, see §3 |
| 16 | 309 | `.prose-blog a:hover` | **`color`** | none | **yes, firing** | moved → `components` |
| 17 | 313 | `.prose-blog ul, .prose-blog ol` | margins, `padding-left`, **`color`** | none | **yes, firing** | moved → `components` |
| 18 | 321 | `.prose-blog li` | margins | none | yes (`my-*`) | moved → `components` |
| 19 | 326 | `.prose-blog strong` | `font-weight`, **`color`** | none | **yes, firing** | moved → `components` |
| 20 | 331 | `.prose-blog table` | `width`, margins, **`border-top/bottom` (colour)**, `border-collapse`, `font-size` | none | **yes, firing** | moved → `components` |
| 21 | 341 | `.prose-blog th` | **`background`**, **`color`**, `padding`, `text-align`, `font-weight`, `font-size`, `text-transform`, `letter-spacing`, **`border-bottom`** | none | **yes, firing** | moved → `components` |
| 22 | 353 | `.prose-blog td` | `padding`, **`border-top`**, **`color`** | none | **yes, firing** | moved → `components` |
| 23 | 359 | `.prose-blog tr:nth-child(even)` | **`background`** | none | **yes, firing** | moved → `components` |
| 24 | 367 | `input[type=text/email/tel/number], textarea, select` | `font-family`, `font-size` | none | yes (`text-*`, `font-*`) | moved → `base` |
| 25 | 377 | `button:disabled, input:disabled, select:disabled` | `opacity`, `cursor` | none | **yes, firing** (see §3) | moved → `base` |
| 26 | 395 | `:where(h2[id], h3[id], h4[id])` | `scroll-margin-top` | none | yes (`scroll-mt-*`) | **LEFT UNLAYERED — deliberate**, F9_OVERFLOW_ANCHORS.md. `:where()` already pins specificity at 0,0,0 so any `scroll-mt-*` utility wins on source order. Layering it would change nothing and would churn settled work. |

Non-rules also present at top level and correctly untouched: `:root` (custom
properties only), `@theme inline`, `@theme`, `@keyframes fadeInUp` (keyframes
are not cascade-resolved; left outside any layer deliberately).

Already layered before this fix, untouched: `@layer base { h1..h6 }`,
`@layer base { h1 }`, and the two `@layer utilities` header-CTA rules from P1-9.

---

## 3. Consumer-and-ground table for every rule that sets a colour or a
   utility-controlled property

### 3.1 `.eyebrow` — consumers disagree about ground → LAYER, not a hex

| Consumer | File:line | Ground | Own colour utility? | Before | After |
|---|---|---|---|---|---|
| About hero | `src/app/about/page.tsx:18` | `bg-neutral-900` `#171717` | **yes — `text-cyan-400`** | `.eyebrow` forced `#0e7490` → **3.35** FAIL | `text-cyan-400` wins → **9.90** PASS |
| Contact hero | `src/app/contact/page.tsx:18` | `bg-neutral-900` `#171717` | **yes — `text-cyan-400`** | **3.35** FAIL | **9.90** PASS |
| 404 eyebrow | `src/app/not-found.tsx:8` | `bg-white` | **no** | `#0e7490` → 5.36 PASS | unchanged **5.36** PASS |
| Blog category chip | `src/components/blog/BlogPostRenderer.tsx:136` | `bg-neutral-50` `#fafafa` card | **no** | `#0e7490` → 5.13 PASS | unchanged **5.13** PASS |

This is precisely the sibling-site trap the brief names. Recolouring
`.eyebrow` toward the dark-ground reading (e.g. cyan-400) would have fixed
about/contact and thrown not-found and the blog chip to `#00d3f2` on white =
**1.81**, a fresh FAIL on two surfaces. Moving the rule into
`@layer components` serves all four: the two consumers that declare a utility
get it, the two that do not keep the rule's own colour.

Ground note: Tailwind v4 emits `--color-neutral-900: oklch(20.5% 0 0)` =
`#171717` and `--color-cyan-400: oklch(78.9% .154 211.53)` = `#00d3f2`. Ratios
above are against those painted values, not the v3 hex table.

### 3.2 `.prose-blog a` — the 62-blog-post defect

| Consumer | File:line | Ground | Own colour utility? | Before | After |
|---|---|---|---|---|---|
| ToolIsland CTA "Run the numbers" | `src/components/blog/ToolIsland.tsx:26` (rendered inside the prose wrapper at `BlogPostRenderer.tsx:305`) | `bg-cyan-700` = `oklch(52% .105 223.128)` = `#007595` | **yes — `text-white`** | `.prose-blog a` forced `var(--accent-strong)` `#155e75` → **1.38** FAIL | `text-white` wins → **5.28** PASS |
| Authored prose links in the 62 post bodies | raw HTML from `post.body`, no classes | `bg-white` | no | `#155e75` → 7.27 PASS | unchanged **7.27** PASS |
| Glossary definition bodies | `src/app/glossary/[slug]/page.tsx:135` (38 routes) | `bg-white` | no | 7.27 PASS | unchanged |
| Location scene bodies | `src/app/locations/[slug]/page.tsx:181` | light | no | 7.27 PASS | unchanged |
| Policy pages | `cookie-policy:29`, `privacy-policy:31`, `terms:29` | light | no | 7.27 PASS | unchanged |

`not-prose` on the ToolIsland `<aside>` is a Tailwind Typography plugin
concept. This site does not use that plugin, so `not-prose` is an inert class
name and did nothing to stop `.prose-blog a` reaching the link.

Same inversion, same rule family, same fix, **not named in the brief** but
found by the sweep: `.prose-blog p` was also beating `text-cyan-700`,
`text-neutral-900` and `text-neutral-600` on ToolIsland's three `<p>` elements
(`ToolIsland.tsx:19,22,23`), forcing all three to `var(--ink-soft)` `#525252`
on `bg-cyan-50`. That measured 6.71 so it never showed as a contrast failure,
but it was silently discarding the component's intended colour hierarchy on
all 62 posts. Fixed by the same move.

### 3.3 `.section-label` — self-grounded, dormant

19 consumers: `for/page.tsx:21,58`, `for/[slug]/page.tsx:54,92,113,200`,
`ir35-status/page.tsx:48,67,112,133,170`, `page.tsx:172,231,261,372,448,520`,
`services/page.tsx:101,135`. Every one adds layout utilities only (`mb-4`,
`mb-6`) and none adds a `bg-*` or `text-*`. The rule paints both its own
ground (`var(--accent)` `#0e7490`) and its own ink (`white`), so the pair is
self-consistent at **5.36** wherever it lands. No defect. Layered for
consistency: a future colour utility on one of these must win.

### 3.4 `.hairline`

Zero class consumers site-wide. Grep across `contractors-ir35/web/src` and
`packages/web-shared` finds only `var(--hairline)` reads in the three research
chart components (`ContractorIndexCharts.tsx:20`,
`ContractorInsolvencyCharts.tsx:20`, `SurvivalIndexCharts.tsx:12`), which
consume the **custom property**, not the class. The class rule is dead. Left
in place and layered rather than deleted — deleting is outside the remit of a
contrast fix, and the blog/resource body HTML is not fully enumerable from
source. Flagged for a later cleanup.

### 3.5 `.font-mono, .font-geist-mono`

`.font-geist-mono` has zero consumers. `.font-mono` collides by name with
Tailwind's own `font-mono` utility, which this rule was beating. Both resolve
to `var(--font-geist-mono)` — the site's `@theme inline` binds
`--font-mono: var(--font-geist-mono)` (globals.css:104) — so the resolved face
was identical and nothing was visibly wrong. After the move Tailwind's utility
wins, same face, only the fallback stack differs. No visual change expected.

### 3.6 `body`

Single consumer: `src/app/layout.tsx:70`, `<body className="antialiased font-sans">`.
`font-sans` was losing to the unlayered `body { font-family: … }`. Both resolve
to `var(--font-geist-sans)` so nothing was visibly wrong, but this is the
"latent risk" P0D_CSS_A11Y.md:20 and P1-1_TOKENS.md:103 both flagged and
declined to migrate. Migrated now: it costs nothing, it removes a real
inversion, and `background`/`color` on `<body>` are now beatable by a utility
if anyone ever adds one.

### 3.7 `button:disabled, input:disabled, select:disabled`

Was firing. `src/components/support/SpecialistWidget.tsx:474` carries
`disabled:opacity-60`; the unlayered reset's `opacity: 0.5` beat it, so the
disabled state painted 0.5. `layout-utils.ts:18,21` both ask for
`disabled:opacity-50`, which matched by coincidence. After the move all three
render what they ask for. Not a contrast defect; fixed for free by the same
move and worth noting because it is evidence the inversion was live in more
than one place.

---

## 4. What moved versus what was recoloured

**Recoloured: nothing.** Not one hex, token or `var()` changed. `git diff` on
this file contains no colour-value edit. Every fix is a cascade-position move.

**Moved into `@layer base`** (element-level resets — every utility on the same
element now wins):

```
$ awk '/^@layer base/,/^}$/' globals.css | grep -E '^  [^ }]' | grep '{'
  *::after {
  html {
  @media (prefers-reduced-motion: no-preference) {
  body {
  h1, h2, h3, h4, h5, h6 {      <- pre-existing, untouched
  h1 {                           <- pre-existing, untouched
  select {
  select:disabled {
```

(`*::after` and `select` / `select:disabled` are the final lines of the three
multi-line selector lists — `*, *::before, *::after`,
`input[type=…], textarea, select`, and `button:disabled, input:disabled,
select:disabled`. Same undercount trap as §1, shown here deliberately.)

**Moved into `@layer components`** (component recipes — every utility now wins):

```
$ awk '/^@layer components/,/^}$/' globals.css | grep -E '^\s+\.'
  .font-mono,
  .font-geist-mono {
  .eyebrow {
  .hairline {
  .hero-reveal {
  .hero-reveal-delay {
  .section-label {
  .prose-blog {
  .prose-blog h2 {
  .prose-blog h3 {
  .prose-blog p {
  .prose-blog a {
  .prose-blog a:hover {
  .prose-blog ul,
  .prose-blog ol {
  .prose-blog li {
  .prose-blog strong {
  .prose-blog table {
  .prose-blog th {
  .prose-blog td {
  .prose-blog tr:nth-child(even) {
```

`components` rather than `utilities`: Tailwind v4's layer order is
`theme, base, components, utilities`, so a rule in `components` loses to every
utility — which is the whole point. The existing `@layer utilities` block
(P1-9 header CTA) is the opposite case and stays where it is.

### Blast radius of the `.prose-blog` move

It is **every** utility inside a `.prose-blog` wrapper that this 14-rule family
was previously beating, not only the link the ticket named:
`color`, `background`, `border-*`, `margin`, `padding`, `max-width`,
`font-size`, `font-weight`, `line-height`, `text-align`, `text-transform`,
`letter-spacing`, `text-decoration`.

Elements in scope on the 62 blog posts: `ToolIsland`, three
`InlineMiniLeadForm` slots, four `PremiumUpgrade` slots, the in-body `figure`
and its `figcaption`. On the 38 glossary routes and the location scenes:
the rendered definition body only. Policy pages: the `space-y-6` wrapper's
own children.

**What does NOT change, and this is the load-bearing part:** the authored
prose itself. The markdown-rendered body HTML carries no class attributes at
all, so `.prose-blog h2/h3/p/a/ul/ol/li/strong/table/th/td/tr` still govern it
exactly as before — nothing in the reading experience of any post, definition
or policy page moves. Only the React islands that explicitly asked for their
own colours stop being overridden.

### Blast radius of the `base` moves

`html`, `body`, `*` box-sizing, the input font reset and the disabled reset now
lose to any utility on the same element. Verified consumers: `box-content` 0
uses, `scroll-smooth` 0 uses, `font-sans` 1 use (same resolved face),
`disabled:opacity-*` 3 uses (one of which, SpecialistWidget:474, now renders
correctly). No other element-level utility collides.

---

## 5. Re-measured ratios

Method: sRGB relative luminance per WCAG 2.x, computed by hand against the
**painted** values — Tailwind v4 emits oklch, so the oklch was converted to
sRGB rather than assuming the v3 hex table. The automated tool was not used on
the `var()`-themed files.

Method self-test, required by the brief:

| Check | Computed | Expected |
|---|---|---|
| slate-500 `#64748b` on white | **4.76** | 4.76 ✔ |
| slate-400 `#94a3b8` on white | **2.56** | 2.56 ✔ |
| cyan-600 `#0891b2` on white | **3.68** | 3.68 (P1-1_TOKENS.md) ✔ |
| cyan-700 `#0e7490` on white | **5.36** | 5.36 (P1-1_TOKENS.md) ✔ |

Painted-value conversions used: `bg-cyan-700` `oklch(52% .105 223.128)` →
`#007595`; `text-cyan-400` `oklch(78.9% .154 211.53)` → `#00d3f2`;
`bg-neutral-900` `oklch(20.5% 0 0)` → `#171717`.

### The four named classes

| # | Class | Routes | Before | After | Floor | Verdict |
|---|---|---|---|---|---|---|
| 1 | `a` "Run the numbers" (`.prose-blog a` over `text-white`) | 62 blog posts | **1.38** | **5.28** | 4.5 | **FIXED** — brief's 1.38 reproduced exactly |
| 2 | Glossary lead-CTA `h2` | 38 routes | 1.11 **in the stale build only** | **16.28** in the current tree | 4.5 | **NOT MY DEFECT — see §7** |
| 3 | `/about` + `/contact` eyebrows | 2 routes | **3.35** | **9.90** | 4.5 | **FIXED** — brief's 3.35 reproduced exactly |
| 4 | `neutral-400` metadata | `/research`, `/for/*`, DeepScrollModal | 2.52 | 2.52 on 1 remaining consumer | 4.5 | **NOT A GLOBALS.CSS RULE — see §7, referred out** |

### Collateral measurements after the move

| Surface | Ratio | Floor | Verdict |
|---|---|---|---|
| `.eyebrow` on white (`not-found.tsx:8`) | 5.36 | 4.5 | unchanged PASS |
| `.eyebrow` on `bg-neutral-50` (`BlogPostRenderer.tsx:136`) | 5.13 | 4.5 | unchanged PASS |
| `.section-label` white on `var(--accent)` | 5.36 | 4.5 | unchanged PASS |
| ToolIsland `text-cyan-700` on `bg-cyan-50` (now honoured) | 5.07 | 4.5 | PASS |
| Authored prose links `#155e75` on white | 7.27 | 4.5 | unchanged PASS |
| `.prose-blog p` `var(--ink-soft)` `#525252` on white | 7.81 | 4.5 | unchanged PASS |

No surface regressed.

---

## 6. Settled work verified untouched

All six confirmed present and byte-identical after the edit:

1. `--color-primary-600: #0e7490` (cyan-700), globals.css:147 — and
   `--color-primary-500: #0891b2` (true cyan-600, 3.68). Ramp shift intact.
2. `--chart-1..5`, with `--chart-3: #0891b2` and its note that it is
   deliberately not the natural ramp step. Intact, globals.css:85-92.
3. `--radius-xl: calc(var(--radius) + 4px)` and `--btn-radius: var(--radius-xl)`,
   globals.css:60-61. Intact.
4. `@source "../../../../packages/web-shared"`, globals.css:10. Intact and in
   position — without it none of the kit's utilities are generated.
5. `@layer utilities { header a[data-cta-placement="header"][data-cta="header_book"] }`
   plus its `min-width: 64rem` partner, P1-9. Intact, still in `utilities`,
   still the only rule in this file that is supposed to beat a utility.
6. `:where(h2[id], h3[id], h4[id]) { scroll-margin-top: 6rem }`, F9. Intact,
   still unlayered, still zero specificity. Deliberately the one rule not moved.

`@keyframes fadeInUp` left outside any layer: keyframe blocks are not resolved
through the cascade, and moving them in would be churn with no effect.

---

## 7. Referred to other agents — do not let these drop

Each is a real finding outside my lease. File and line given so the owning
agent can act without re-deriving.

**R1 — `src/components/intent/DeepScrollModal.tsx:104`. GENUINE, OPEN.**
The close button is `className="text-neutral-400 hover:text-neutral-700"`
painting a `&times;` glyph on the modal's `bg-white` card (line 95).
`#a3a3a3` on white = **2.52**. It is a text glyph, so the floor is 4.5.
`text-neutral-500` `#737373` gives 4.74 and matches the repair already applied
on `/research` and `/for/[slug]`. This is the only surviving member of the
brief's defect class 4 — every other `text-neutral-400` named in the brief has
already been fixed by another agent while I was working
(`research/page.tsx:89` is now `text-neutral-500` with a comment recording the
2.52 → 4.76 repair; `for/[slug]` now uses `text-neutral-500` and
`text-neutral-600`; `for/page.tsx:44`'s `text-neutral-400` sits on
`bg-neutral-900` = **7.11**, a pass, and needs nothing). Not editable by me:
lease is globals.css only.

**R2 — eight stale source comments, now wrong.** Eight files carry comments
explaining that they avoid the `.eyebrow` class *because it is unlayered*.
That reason no longer holds; they can adopt `.eyebrow` if their owners want the
consistency, and at minimum the comments should stop asserting something false:
`src/app/calculators/page.tsx:57`, `src/app/calculators/[slug]/page.tsx:72`,
`src/app/embed/page.tsx:53`, `src/app/glossary/page.tsx:56`,
`src/app/glossary/[slug]/page.tsx:91-92`, `src/app/locations/page.tsx:117`,
`src/app/locations/[slug]/page.tsx:383`,
`src/components/blog/BlogPostRenderer.tsx:132`. Cosmetic, not a defect.

**R3 — `packages/web-shared` (trap 12), report only, no action taken.**
`design/marketing/LeadCTAPanel.tsx:157` and `:195` are the components behind
the brief's defect 2. They are **already correct** in both `HEAD` and the
working tree: line 157 is
`` `text-2xl font-bold sm:text-4xl ${dark ? "text-white" : "text-slate-900"}` ``
and line 195 hard-codes `text-slate-900`. No edit needed, and none made.

**R4 — the phase 1 audit doc is wrong and should be corrected, not deleted.**
`docs/contractors-ir35/_port/P0D_CSS_A11Y.md:24` ("no unlayered
colour-on-shared-class hazard found in this file") and `:110` item (1) ("no
bare unlayered colour rule exists in `globals.css`") are both false. The
field-notes regex that produced them is the root cause and should be replaced
estate-wide with the brace-depth walk in §1 — this regex is in the shared
playbook, so **every site audited with it has the same undercount**. That is a
playbook change (`docs/_engines/DESIGN_PORT_PLAYBOOK.md`), outside my lease.

---

## 8. Where the brief was wrong

**Defect 2, the glossary lead-CTA `h2` at 1.10 on 38 routes, does not exist in
the working tree and was never an unlayered-CSS defect.** Three independent
checks:

* The ratio is right but the cause is not. 1.10 is `var(--ink)` `#0a0a0a` on
  `bg-slate-900` `#0f172a`; I measure that pair at **1.11**. The rule that
  paints `var(--ink)` on an `h2` is `@layer base { h1, h2, … { color: var(--ink) } }`
  at globals.css:202 — which is **already layered**, and has been since before
  the port. P0D_CSS_A11Y.md:24 gets this part right. Moving unlayered rules
  cannot touch it. It fires only against an **inherited** value on an `h2` that
  declares no colour utility of its own, which is exactly the case the brief's
  point 4 warns is not fixable by layering.
* It was measured on the stale build. The built artefact
  `web/.next/server/app/glossary/24-month-rule.html` contains
  `<h2 class="text-xl font-bold sm:text-2xl">Not sure how this applies to your
  IR35 position?</h2>` — no colour utility, hence 1.11. That markup does not
  exist in the current source. The panel is now the kit's `LeadCTAPanel`
  (`glossary/[slug]/page.tsx:185`) whose `h2` carries an explicit colour, and
  `git status` shows `packages/web-shared/design/marketing/LeadCTAPanel.tsx`
  clean, so `HEAD` and the working tree agree.
* The current tree measures 16.28. The glossary panel is called
  `contained ground="slate"`, which renders `bg-slate-100` `#f1f5f9` with
  `text-slate-900` `#0f172a` — **16.28**, a comfortable pass. The `1.10`
  figure is an artefact of measuring `localhost:3641`, which the brief itself
  warns is behind the tree.

**Defect 4, the `neutral-400` metadata, is not a `globals.css` rule.** There is
no `neutral-400` declaration anywhere in this file — the token appears once as
`--ink-whisper: #a3a3a3`, which nothing consumes. Those failures are Tailwind
`text-neutral-400` utilities written directly in component markup. No layer
move can affect them, and three of the four named surfaces have already been
repaired by other agents. One remains: R1 above.

**Defect 1's ratio is exactly right** (1.38) and **defect 3's is exactly right**
(3.35) — both reproduced to the second decimal once the painted oklch values
are used rather than the v3 hex table.

**The brief's corrected grep is an improvement but still undercounts**, by the
three mechanisms in §1. Handed a file with a multi-line selector list it
silently renames the rule; handed `*` or `:where` it drops the rule entirely;
and it has no concept of layer boundaries, which is the actual question being
asked. Replacement given in §1.

**Net on the count:** the brief predicted the real list "undercounted by about
twenty". It undercounted by **23** — 3 reported against 26 present.

---

## 9. Verification list for the serialised build

No `next build` or `next start` was run; four agents are editing this tree.
Everything below is for the manager's serialised build. Checks 1-3 are static
and were run by me; they are listed so they can be re-run after the merge.

**Already run, static, passing:**

1. Brace balance on `globals.css`: 47 `{` / 47 `}`.
2. Layer walk (§1 command) reports **zero** `*** UNLAYERED ***` rules except
   `:where(h2[id], h3[id], h4[id])`, which is intended, and the `from`/`to`
   blocks inside `@keyframes fadeInUp`, which are not cascade rules.
3. `git diff` of `globals.css` contains no colour-value change — indentation,
   `@layer` wrappers and comments only.

**To run after the build:**

4. **Build succeeds at all.** A malformed `@layer` is a hard Lightning CSS
   parse error, so a green build is itself the syntax check.
5. **Layer order in the emitted stylesheet.** Expect
   `@layer properties, theme, base, components, utilities;` near the top of
   `.next/static/css/*.css` — unchanged from the current build.
6. **The three defect rules are now layered.** Re-run the brace-depth walk in
   §1 against the built CSS: `.prose-blog a{`, `.eyebrow{` and
   `.section-label{` must report an enclosing layer of `components`, not `[]`.
   This is the single highest-value check: it is the exact probe that caught
   the defect.
7. **`/about` and `/contact` eyebrows.** Confirm the rendered eyebrow paints
   cyan-400 on the neutral-900 hero, not petrol. 9.90.
8. **`/not-found` and a blog post header.** Confirm both eyebrows still paint
   petrol `#0e7490` on their light grounds — 5.36 and 5.13. This is the
   regression the sibling-site recolour caused; it must not appear here.
9. **Any blog post carrying a ToolIsland.** "Run the numbers" must be white on
   the cyan-700 button, 5.28; the island's three `<p>` lines must show their
   own colours (cyan-700 label, neutral-900 title, neutral-600 blurb) rather
   than a uniform `#525252`.
10. **The same blog post's authored prose is visually unchanged** — headings,
    body copy, links, tables, zebra rows. This is the assertion that the
    `.prose-blog` move was safe, and the only one that needs eyes rather than a
    ratio.
11. **A glossary route, a location route and one policy page.** Same check as
    10 on the other three `.prose-blog` consumers.
12. **Header CTA still hides below 1024px** (P1-9). It lives in
    `@layer utilities` and was not touched, but it is the one rule in the file
    that depends on beating a utility, so confirm it at 390px and at 1280px.
13. **In-page anchors still clear the sticky header** (F9) — click a blog TOC
    link and confirm 96px of clearance.
14. **`<body>` font.** `font-sans` now wins over the base rule. Same resolved
    face expected; confirm no fallback-stack flash.
15. **SpecialistWidget disabled button** now renders `opacity: 0.6`, not 0.5.
    Cosmetic, listed only because it is the proof the base move took effect.
16. **R1 is still open** — DeepScrollModal's close button at 2.52 is not fixed
    by this package and needs its owning agent.
