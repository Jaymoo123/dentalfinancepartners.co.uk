# P0D — CSS layering, theme-variable collisions, `@source` coverage, contrast

Site: `charities/web` (Trustee Tax, `www.trusteetax.co.uk`). Phase 0 preparation
for the Property-standard design port. **Read-only: no site code or CSS edited.**

Build used: `charities/web/.next/static/css/699ba6ca7c8185a8.css`, BUILD_ID
`jaF71fH3nr76RmvBIlRHq`, written 2026-09-13 21:25, i.e. AFTER both
`src/app/globals.css` (2026-07-19) and `src/app/page.tsx` (2026-08-25).
`git status --porcelain charities/` is clean. The served build on
`http://localhost:3117` links that exact hash. **The artefacts are fresh; every
finding below is measured on what this site actually ships.**

Tailwind resolved: **4.3.0** (see §4.1).

---

## 0. Headline

| Task | Verdict |
|---|---|
| 1 Unlayered sweep | **2 unlayered rules**, in source and in the shipped CSS: `:root` (tokens only, benign) and `body` (3 declarations, all utility-controlled, **live inversion**). Brief's "23 lines, no `@layer` blocks at all" is CORRECT. |
| 2 Theme-variable collisions | **ZERO.** No `--radius-*`/`--color-*`/`--font-*`/`--spacing-*`/`--text-*`/`--leading-*`/`--shadow-*` declared outside `@theme` anywhere charities pulls in. The `--radius-*` family in `web-shared` is correctly inside `@theme`. |
| 3 `@source` coverage | **ABSENT, confirmed.** Already causing a silent miss: the kit design tokens are 0-occurrence in the shipped CSS. Line to add is in §3.3. |
| 4 Contrast | `#1a5c4a` measures **7.85** against white in all three roles and clears all three floors. **Charities needs NEITHER `--brand-primary-text` NOR `--brand-primary-ground`.** Two real defects found: §4.5. |
| 5 Header CTA cascade race | **CONFIRMED on a built stylesheet** (`.inline-flex{` is 79 bytes AFTER `.hidden{`, same layer, same specificity). charities has **no header component at all** — confirmed. |

---

## 1. Unlayered CSS sweep, by brace-depth walk

### 1.1 Method

The playbook command `grep -nE "^[a-zA-Z][^{]*\{"` cannot match a class
selector (`.`), an attribute selector (`[`), `*` or `:`, and has no concept of
`@layer` boundaries. Reused instead: the brace-depth walk from
`docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md` §1, with two changes that
were required here and should go back into the playbook:

* **character-stream, not line-based.** The F10 walk splits on `\n` and derives
  the selector from `l[:j]`. The shipped Tailwind stylesheet is **one single
  line with no trailing newline** (`wc -l` returns `0`), so the line-based
  version silently returned nothing at all on it. Verified: `wc -l
  699ba6ca7c8185a8.css` → `0`.
* **`encoding='utf-8-sig'`.** Several sibling `globals.css` files carry a BOM
  (`generalist/web/src/app/globals.css` line 1 begins `﻿`). Plain `utf-8`
  misparses the first selector.

Script (`/tmp/lw2.py`, scratch, deleted):

```python
import re,sys
s=open(sys.argv[1],encoding='utf-8-sig').read()
s=re.sub(r'/\*.*?\*/',lambda m:''.join(c if c=='\n' else ' ' for c in m.group()),s,flags=re.S)
stack=[]; buf=[]; line=1; out=[]
for ch in s:
    if ch=='\n': line+=1
    if ch=='{':
        sel=' '.join(''.join(buf).split())
        lay=[x for x in stack if x.startswith('@layer')]
        if not sel.startswith(('@layer','@media','@theme','@keyframes','@supports','@property','@font-face','@container','@scope','@starting')):
            out.append((line,lay[0] if lay else '*** UNLAYERED ***',sel))
        stack.append(sel); buf=[]
    elif ch in '};':
        if ch=='}' and stack: stack.pop()
        buf=[]
    else: buf.append(ch)
for l,lay,sel in out: print(f"{l:>5}  {lay:<22} {sel[:110]}")
```

### 1.2 `charities/web/src/app/globals.css`

Brief's claim verified first:

| Claim | Proof command | Decisive output | Verdict |
|---|---|---|---|
| 23 lines | `wc -l charities/web/src/app/globals.css` | `23` | TRUE |
| no `@layer` blocks at all | `grep -n '@layer' charities/web/src/app/globals.css` | *(no output, exit 1)* | TRUE |
| no `@theme` block either | `grep -n '@theme' charities/web/src/app/globals.css` | *(no output, exit 1)* | TRUE (not claimed, but load-bearing for §2 and §3) |

Walk result — `python /tmp/lw2.py charities/web/src/app/globals.css`:

```
    4  *** UNLAYERED ***      :root
   19  *** UNLAYERED ***      body
```

| # | Line | Selector | Declarations | Enclosing layer | Tailwind utility it beats | Verdict |
|---|---|---|---|---|---|---|
| 1 | 4 | `:root` | 10 custom properties (`--background`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--border`, `--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`) | **none** | none — custom-property declarations are not utility-generated, and no name here collides with a v4 theme namespace (§2) | **BENIGN.** Same position F10 treats as correct (`:root` excluded from its report by design). |
| 2 | 19 | `body` | `background: var(--background)`, `color: var(--ink)`, `font-family: ui-sans-serif, system-ui, -apple-system, sans-serif` | **none** | `background` → **`bg-*`**; `color` → **`text-*`**; `font-family` → **`font-sans` / `font-mono` / `font-serif`** | **LIVE INVERSION.** Any `bg-*`, `text-*` or `font-*` utility written on `<body>` loses. Unlike contractors-ir35, charities' font-family is a **literal stack**, not `var(--font-…)`, so `font-sans` would resolve to a genuinely different list — this is not a cosmetically-identical no-op here. |

### 1.3 Shipped stylesheet `charities/web/.next/static/css/699ba6ca7c8185a8.css`

```
$ python /tmp/lw2.py charities/web/.next/static/css/699ba6ca7c8185a8.css | grep UNLAYERED
    1  *** UNLAYERED ***      :root
    1  *** UNLAYERED ***      body
$ python /tmp/lw2.py ... | wc -l          # total rules walked
577
$ python /tmp/lw2.py ... | cut -c8-29 | sort | uniq -c
      2 *** UNLAYERED ***
     44 @layer base
      1 @layer properties
      1 @layer theme
    529 @layer utilities
```

Source and build agree exactly: **2 unlayered rules, 575 layered.** No third
rule is introduced by the build, and nothing charities authors leaks into
`@layer components` (the emitted `@layer components;` is an empty ordering
declaration only).

Position proof — both unlayered rules are emitted at the very end, after
`@layer utilities` closes:

```
$ python -c "s=open('charities/web/.next/static/css/699ba6ca7c8185a8.css',encoding='utf-8').read(); \
print('len',len(s)); print('@layer base',s.find('@layer base')); print('@layer utilities',s.find('@layer utilities')); \
print('own :root',s.find(':root{--background')); print('body',s.find('body{background'))"
len 46635
@layer base 5640
@layer utilities 9071
own :root 42988
body 43199
```

Shipped rule verbatim:

```
$ grep -o 'body{[^}]*}' charities/web/.next/static/css/699ba6ca7c8185a8.css
body{background:var(--background);color:var(--ink);font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}
```

Unlayered author CSS outranks every layered rule regardless of specificity or
source order, so position is belt-and-braces here: `body` wins twice over.

### 1.4 Port action

Move `body` into `@layer base` when the port authors the token block. Leave
`:root` where it is. One-line diff, zero visual change today (no `bg-*`/`text-*`
/`font-*` utility is currently written on `<body>` — `charities/web/src/app/layout.tsx`
carries `className="antialiased"` only), and it removes the inversion before the
kit's chrome starts writing utilities onto `<body>`.

---

## 2. Tailwind v4 theme-variable collisions

Swept by **name collision** across the three surfaces charities pulls in.
A v4 utility such as `.rounded-xl` emits `border-radius:var(--radius-xl)`, so a
same-named property in an unlayered `:root` shadows the layered `@theme` value
and inverts the scale, regardless of whether the utility "looks literal".

| Surface | Proof command | Decisive output | Verdict |
|---|---|---|---|
| `charities/web/src/app/globals.css` | `grep -nE '^\s*--(radius\|color\|font\|spacing\|text\|leading\|shadow)-' charities/web/src/app/globals.css` | *(no output, exit 1)* | **CLEAN.** The 10 tokens declared are `--background`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--border`, `--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`. None is a v4 namespace prefix. `--border` is NOT `--color-*` and does not collide. |
| Shipped CSS, charities' own `:root` | `grep -o ':root{--background[^}]*}' charities/web/.next/static/css/699ba6ca7c8185a8.css` | `:root{--background:#fff;--surface:#f8fafc;--surface-elevated:#fff;--ink:#0f172a;--ink-soft:#334155;--muted:#475569;--border:#e2e8f0;--brand-primary:#1a5c4a;--brand-primary-strong:#1a5c4a;--brand-on-primary:#fff}` | **CLEAN.** Confirms the source sweep survived the build byte-for-byte. The only other `:root` in the file is Tailwind's own, and the walk reports it inside `@layer theme`. |
| `packages/web-shared/design/globals-standard.css` | `grep -nE '^\s*--(radius\|color\|font\|spacing\|text\|leading\|shadow)-' packages/web-shared/design/globals-standard.css` | `38:  --radius-sm: …` `39:  --radius-md: …` `40:  --radius-lg: …` `41:  --radius-xl: calc(var(--radius) + 4px);` | **NOT A COLLISION.** `grep -n '@theme' packages/web-shared/design/globals-standard.css` → `37:@theme {`; the block closes at line 43. All four sit **inside** `@theme`, which is the correct home. |
| `packages/web-shared`, any other CSS | `find packages/web-shared -name '*.css'` | `packages/web-shared/design/globals-standard.css` *(the only file)* | **NOTHING ELSE TO SWEEP.** |

**Zero collisions. The Medical `--radius-xl` class of defect does not exist on
charities today.**

### 2.1 Related trap the port WILL hit (flagged, not a collision)

`packages/web-shared/design/globals-standard.css:38-42` defines the whole radius
family as `calc(var(--radius) ± Npx)` and `--btn-radius: var(--radius-xl)`.
**`--radius` is a per-site token and charities does not declare it** (§2 row 1
lists all 10 of its tokens). If the port adopts `globals-standard.css` without
adding `--radius`, every `calc()` is invalid at computed-value time and
`rounded-sm/md/lg/xl` and `--btn-radius` all fall back to `0`. Not a collision,
so it is out of this task's scope, but it is the adjacent failure and it is
silent in exactly the same way.

---

## 3. `@source` coverage

### 3.1 Confirmed absent

| Claim | Proof command | Decisive output | Verdict |
|---|---|---|---|
| charities has no `@source` | `grep -n '@source' charities/web/src/app/globals.css` | *(no output, exit 1)* | **ABSENT — brief is TRUE** |
| every other site has it | `grep -rn '@source' --include=globals.css .` | `./construction-cis/web/src/app/globals.css:3`, `./contractors-ir35/…:10`, `./Dentists/…:3`, `./generalist/…:3`, `./Medical/…:3`, `./Property/…:3`, `./Solicitors/…:3` (+ `console/…:10`, a different path) | charities is the **only** marketing site in the estate without it |

### 3.2 What breaks, precisely

A class naming a token that does not exist is not an error in Tailwind v4 — the
class is simply never generated, the element keeps its inherited paint, and
every unit test, type check and build stays green. Without `@source`, Tailwind
never scans `packages/web-shared`, so **every utility that appears only in kit
component source is missing from the built CSS.** Adopted kit chrome would ship
structurally correct and visually unstyled.

Already measurable on the current build — the kit's own token vocabulary is
completely absent:

```
$ f=charities/web/.next/static/css/699ba6ca7c8185a8.css
$ for c in primary-600 primary-700 btn-ground section-label eyebrow marquee related-card hero-reveal; \
  do printf "%-16s %s\n" "$c" "$(grep -c "$c" $f)"; done
primary-600      0
primary-700      0
btn-ground       0
section-label    0
eyebrow          0
marquee          0
related-card     0
hero-reveal      0
```

`btnPrimary` in `packages/web-shared/design/layout-utils.ts:30` is
`bg-[var(--btn-ground,var(--color-primary-600))] … text-white … focus-visible:outline-primary-600`.
On charities none of `primary-600`, `primary-700`, `primary-800` or `btn-ground`
exists in the shipped CSS, so the kit button would render as an unpainted
`inline-flex` box with white text on white. That is the failure mode in one
concrete object.

**Live consequence today, not only after the port:** `charities/web/src/app`
already imports real components from `@accounting-network/web-shared` on the
admin/console routes (`admin/analytics/page.tsx:43-46` — `SnapshotCard`,
`DashboardTabs`, `CountrySelect`, `VisitorsTable`). Their classes are not being
generated. Console-only, so no public surface is affected, but it is proof the
mechanism is already firing rather than a prediction.

### 3.3 The exact line to add

Path derivation from the file's real location: `charities/web/src/app/globals.css`
→ `..` = `src`, `../..` = `web`, `../../..` = `charities`, `../../../..` = repo
root. Four levels, identical to the six sibling sites that use depth-4. Copied
from the working form in `generalist/web/src/app/globals.css:3` and
`Solicitors/web/src/app/globals.css:3` (byte-identical on both):

```css
@source "../../../../packages/web-shared";
```

It belongs on **line 3**, immediately after `@import "tailwindcss" source("..");`
and before the site token block, per the ordering contract documented at
`packages/web-shared/design/globals-standard.css:11-23`:

```css
@import "tailwindcss" source("..");
@source "../../../../packages/web-shared";
@import "tw-animate-css";
@import "@accounting-network/web-shared/design/globals-standard.css";
:root { … per-site tokens … }
```

(`tw-animate-css` is not bundled by the shared file; the port must add it to
`charities/web/package.json` as the other sites do.)

### 3.4 Verification command for AFTER the port adds it

**Do not use the shape in the brief.** `grep -c` counts matching *lines*, and a
production Tailwind stylesheet is a single line with no trailing newline
(`wc -l` → `0`). `grep -c "primary-600" …` can therefore only ever return `0`
or `1`. Proof that it is uninformative rather than merely imprecise:

```
$ grep -c "primary-600" charities/web/.next/static/css/*.css
0
$ grep -c "primary-600" generalist/web/.next/static/css/*.css
1
$ grep -o "primary-600" generalist/web/.next/static/css/*.css | wc -l
42
```

`1` and `42` are the same `grep -c` answer. Use the occurrence count:

```bash
grep -o "primary-600" charities/web/.next/static/css/*.css | wc -l
```

| Expected | Meaning |
|---|---|
| `0` | `@source` still not working — port not effective |
| a two-digit count (generalist ships **42**) | kit utilities are being generated |

Companion check, one command, the same failure in the other direction:

```bash
for c in primary-600 primary-700 btn-ground eyebrow related-card hero-reveal; do \
  printf "%-14s %s\n" "$c" "$(grep -o "$c" charities/web/.next/static/css/*.css | wc -l)"; done
```

Every row must be non-zero after the port adopts the kit chrome.

---

## 4. Contrast self-test and measurement

### 4.1 Resolved Tailwind version — from the lockfile and the installed package, not the range

| Source | Proof command | Decisive output |
|---|---|---|
| `package.json` range (NOT authoritative) | `grep -n 'tailwind' charities/web/package.json` | `23: "@tailwindcss/postcss": "^4",` / `29: "tailwindcss": "^4",` |
| Lockfile | `python -c "import json;[print(k,v['version']) for k,v in json.load(open('package-lock.json'))['packages'].items() if k.endswith('node_modules/tailwindcss')]"` | `node_modules/tailwindcss 4.3.0` |
| Installed package | `python -c "import json;print(json.load(open('node_modules/tailwindcss/package.json'))['version'])"` | `4.3.0` |
| The shipped CSS itself | `head -c 60 charities/web/.next/static/css/699ba6ca7c8185a8.css` | `/*! tailwindcss v4.3.0 | MIT License | https://tailwindcss.com */` |

**Resolved version: 4.3.0.** There is one hoisted `tailwindcss` at the monorepo
root; `charities/web/node_modules/tailwindcss` does not exist.

### 4.2 Table used

**`node_modules/tailwindcss/theme.css` from the installed 4.3.0** — the actual
oklch values this build paints, read directly:

```
$ python -c "import re;s=open('node_modules/tailwindcss/theme.css',encoding='utf-8').read();\
print(re.search(r'--color-slate-400:\s*([^;]+);',s).group(1))"
oklch(70.4% 0.04 256.788)
```

Converted oklch → Oklab → linear sRGB → gamma-encoded sRGB, then WCAG 2.x
relative luminance and `(L1+0.05)/(L2+0.05)`. Not the v3 hex table.

### 4.3 Method self-test — the brief's calibration figures are v3

| Colour | v4.3.0 painted hex | On white (computed) | Brief / circulated figure | Verdict |
|---|---|---|---|---|
| `slate-500` `oklch(55.4% .046 257.417)` | `#62748e` | **4.77** | 4.76 | **Brief's 4.76 is the v3 hex `#64748b`** — I compute `#64748b` on white at exactly **4.76**. v4 is 4.77. Difference immaterial, both clear 4.5. |
| `slate-400` `oklch(70.4% .04 256.788)` | `#90a1b9` | **2.63** | v3 2.56 / v4 2.63 | **Brief is CORRECT.** v3 hex `#94a3b8` computes to exactly **2.56**; v4 to **2.63**. Both fail 4.5. |
| `neutral-400` `oklch(70.8% 0 0)` | `#a1a1a1` | **2.59** | — | used below |
| `neutral-500` `oklch(55.6% 0 0)` | `#737373` | **4.73** | — | the standard repair step |
| `neutral-900` `oklch(20.5% 0 0)` | `#171717` | **17.91** | — | matches F10 §3.1's painted value |

The method reproduces both the v3 and the v4 figures to the second decimal from
the same code, so the converter is calibrated in both directions.

### 4.4 Brand `#1a5c4a` in the three roles

`charities/niche.config.json:26` → `"primary_color": "#1a5c4a"`, and
`:113` → `"theme_color": "#1a5c4a"`.

| Role | Pair measured | Ratio | Floor | Verdict |
|---|---|---|---|---|
| **Graphic against white** (icon, rule, border, bar) | `#1a5c4a` vs `#ffffff` | **7.85** | 3.0 | **PASS**, 2.6× the floor |
| **TEXT on white** | `#1a5c4a` on `#ffffff` | **7.85** | 4.5 | **PASS**, 1.7× the floor |
| **GROUND under white text** | `#ffffff` on `#1a5c4a` | **7.85** | 4.5 | **PASS**, 1.7× the floor |

**A correction to the brief's framing, and it matters for how this is read:**
WCAG contrast is **symmetric** — `cr(a,b) == cr(b,a)`. The three roles do not
produce three ratios; they produce **one ratio, 7.85, against three different
floors** (3.0 / 4.5 / 4.5). What the playbook §8 item 11 rule actually encodes
is that a mid-tone hex can land *between* 3.0 and 4.5 and so clear the graphic
floor while failing the two text floors. `#1a5c4a` is not mid-tone — it is dark
(relative luminance 0.083) and clears the highest floor by a wide margin.

**Verdict: charities needs NEITHER `--brand-primary-text` NOR
`--brand-primary-ground`.** Leaving both undeclared makes
`packages/web-shared/leads/MiniCapture.tsx` and
`packages/web-shared/components/ServiceTiers.tsx` fall back to
`var(--brand-primary)` and render correctly. This is the Property case, not the
Medical case (Medical's copper `#b87333` measures 3.79 on white, which is
exactly the between-the-floors band charities avoids).

### 4.5 Every pair in `charities/web/src/app/globals.css`

| Text / mark | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|
| `--ink` `#0f172a` | `--background` `#ffffff` | **17.85** | 4.5 | PASS |
| `--ink` `#0f172a` | `--surface` `#f8fafc` | **17.06** | 4.5 | PASS |
| `--ink-soft` `#334155` | `#ffffff` | **10.35** | 4.5 | PASS |
| `--ink-soft` `#334155` | `--surface` `#f8fafc` | **9.90** | 4.5 | PASS |
| `--muted` `#475569` | `#ffffff` | **7.58** | 4.5 | PASS |
| `--muted` `#475569` | `--surface` `#f8fafc` | **7.24** | 4.5 | PASS |
| `--brand-on-primary` `#ffffff` | `--brand-primary` `#1a5c4a` | **7.85** | 4.5 | PASS |
| `--border` `#e2e8f0` | `#ffffff` | **1.23** | 3.0 (non-text, only if it conveys meaning) | **ADVISORY.** Decorative hairline; fails 3.0 but WCAG 1.4.11 exempts purely decorative boundaries. Flag only if the port makes it a form-field boundary, where it becomes a real failure. |

`--brand-primary-strong` is `#1a5c4a`, byte-identical to `--brand-primary`, so
it adds no distinct pair. `--surface-elevated` is `#ffffff`.

### 4.6 Homepage hardcoded hexes

Inventory — `grep -rhoE '#[0-9a-fA-F]{6}' charities/web/src --include=*.tsx | sort | uniq -c | sort -rn`:

```
     95 #1a5c4a      19 #154a3b      13 #fafaf9       6 #f0f7f4
      5 #fafaf7       4 #2d7a62       3 #0f2e24       1 #64748b
      1 #334155       1 #0f172a       1 #0a1f19
```

Both hexes the brief names are present: `#1a5c4a` (95×) and `#0f2e24` (3×,
`page.tsx:259,260,685`).

| Text / mark | Ground | Where | Ratio | Floor | Verdict |
|---|---|---|---|---|---|
| `#1a5c4a` text | `#ffffff` | `page.tsx:387,588,600,740,780` etc. | **7.85** | 4.5 | PASS |
| `#1a5c4a` text | `#fafaf9` | `page.tsx:361,551,573,765` sections | **7.52** | 4.5 | PASS |
| `#1a5c4a` text | `#f0f7f4` | `page.tsx:358` hover ground | **7.22** | 4.5 | PASS |
| `#154a3b` text | `#ffffff` | hover states, `page.tsx:780` | **10.12** | 4.5 | PASS |
| `#154a3b` text | `#fafaf9` | `page.tsx:389` group-hover | **9.69** | 4.5 | PASS |
| `#ffffff` text | `#1a5c4a` | `page.tsx:298,389,434,600,706` | **7.85** | 4.5 | PASS |
| `#ffffff` text | `#154a3b` | `page.tsx:455` table head | **10.12** | 4.5 | PASS |
| `#ffffff` text | `#0f2e24` | hero `page.tsx:259`, CTA `page.tsx:685` | **14.62** | 4.5 | PASS |
| `#ffffff` text | `#0a1f19` | hero gradient terminus `page.tsx:260` | **17.17** | 4.5 | PASS |
| `emerald-200` `#a4f4cf` | `#1a5c4a` | hero chip `page.tsx:263`, table links `:466` | **6.13** | 4.5 | PASS |
| `emerald-200` `#a4f4cf` | `#0f2e24` | hero | **11.42** | 4.5 | PASS |
| `emerald-100` `#d0fae5` | `#1a5c4a` | table body `page.tsx:476` | **6.92** | 4.5 | PASS |
| `#1a5c4a` graphic | `#ffffff` / `#fafaf9` | icon tiles, borders | **7.85** / **7.52** | 3.0 | PASS |
| `#2d7a62` border | `#1a5c4a` | `page.tsx:452,462,482` table rules | **1.52** | 3.0 | **ADVISORY** — see below |
| `#2d7a62` border | `#0f2e24` | `page.tsx:263` chip border | **2.83** | 3.0 | **ADVISORY** — see below |

Emerald values are the **painted v4.3.0** conversions (`emerald-200`
`oklch(90.5% .093 164.15)` → `#a4f4cf`; `emerald-100`
`oklch(95% .052 163.051)` → `#d0fae5`), not the v3 hex table.

`#2d7a62` advisory: these are table row separators and a decorative chip
outline, not the sole indicator of a control's boundary, so 1.4.11 does not
bite. Noted because the ratios are low enough that if the port promotes any of
them to a real UI boundary it becomes a failure.

### 4.7 Two REAL defects found while measuring — not asked for, do not let them drop

**D1 — `.section-label` is a dead class name, used 8× on the homepage, and one
use is invisible.**

```
$ grep -rn 'section-label' charities/web/src | wc -l
8
$ grep -rn '\.section-label' charities/ packages/web-shared/ --include=*.css
(no output, exit 1)
$ grep -c 'section-label' charities/web/.next/static/css/699ba6ca7c8185a8.css
0
```

`page.tsx:333,415,533,557,585,656,690` carry `className="section-label mb-4"`
(`:690` uses `mb-6`). **No CSS rule for it exists anywhere in the estate** — not
in charities, not in `packages/web-shared`. It is not a Tailwind class, so
nothing is generated and nothing warns. The elements therefore inherit `body`'s
`color: var(--ink)` `#0f172a`.

| Use | Section ground | Ratio | Floor | Verdict |
|---|---|---|---|---|
| `page.tsx:333,585` | `bg-white` | 17.85 | 4.5 | passes, but renders as unstyled body text, not a label |
| `page.tsx:415,533,557,765` | `bg-[#fafaf9]` | 17.09 | 4.5 | same |
| `page.tsx:656` | `bg-neutral-50` | ~17.1 | 4.5 | same |
| **`page.tsx:690`** ("Get started", inside `<section class="… bg-[#0f2e24]">` at `:685`) | `#0f2e24` | **1.22** | 4.5 | **FAIL — effectively invisible on the live site** |

This is the exact "names a token that does not exist, emits nothing, every test
green" failure §3.2 describes, already shipped. The port fixes it for free when
it adopts the kit — but only if the kit actually defines `.section-label`, and
`grep` above shows `packages/web-shared` does **not**. The port must either add
the rule or replace all 8 call sites.

**D2 — `text-neutral-400` on light grounds, 2.59 against a 4.5 floor.**

```
$ grep -rhoE 'text-(neutral|slate|gray)-(300|400)' charities/web/src --include=*.tsx | sort | uniq -c
      1 text-neutral-300
      8 text-neutral-400
      6 text-slate-300
     24 text-slate-400
```

Public-route instances of `text-neutral-400`: `app/page.tsx:361,551,573`,
`app/guides/page.tsx:36`, `app/for/[slug]/page.tsx:60`,
`app/services/[slug]/page.tsx:62`, `components/forms/DetailsForm.tsx:19`,
`components/forms/LeadForm.tsx:29`; plus `components/ui/Breadcrumb.tsx:43`
(`text-neutral-300`, `#d4d4d4`, ~1.9). Standard repair is `text-neutral-500`
`#737373` = **4.73**. The `slate-400`/`slate-300` instances need their grounds
enumerated individually — several are on dark grounds where they pass — and that
is a phase-5 sweep, not phase 0. Recorded here so the port budgets for it.

Neither D1 nor D2 is fixed by anything in tasks 1-3.

---

## 5. The header CTA cascade race

### 5.1 charities has no header — confirmed

| Claim | Proof command | Decisive output | Verdict |
|---|---|---|---|
| no header component | `ls charities/web/src/components/layout/` | `SiteFooter.tsx` *(only entry)* | **TRUE** |
| layout renders no header | `grep -n '<header\|<nav\|SiteHeader' charities/web/src/app/layout.tsx` | *(no output; the only chrome import is `:9 import { SiteFooter }`, rendered at `:98`)* | **TRUE** |
| kit chrome not imported | `grep -rn 'web-shared/design' charities/web/src --include=*.tsx` | *(no output, exit 1)* | **TRUE** — all 10 `web-shared` imports are `/console/*` on admin routes |
| kit CTA classes absent from the build | `grep -c 'primary-600' charities/web/.next/static/css/699ba6ca7c8185a8.css` | `0` | **TRUE** — charities cannot be carrying the defect today |

charities also has its **own local** `btnPrimary`
(`charities/web/src/components/ui/layout-utils.ts:17-18`,
`"inline-flex min-h-12 … bg-[#1a5c4a] …"`), hard-coded hexes rather than the
kit's `primary-*` ramp. It is used at `page.tsx:278,775` on body content, never
in a header, and never with a `hidden … lg:inline-flex` pairing. **charities is
clean on this defect only because it has no header to carry it.**

### 5.2 The cascade order claim, verified in a BUILT stylesheet

Not inferred from the class list. Byte offsets of the two rules in four shipped
stylesheets from already-ported sites:

| Site | Built stylesheet | `.hidden{` offset | `.inline-flex{` offset | Later wins |
|---|---|---|---|---|
| generalist | `.next/static/css/1487733c3b9dd0c2.css` | 15641 | **15720** | `inline-flex` |
| Solicitors | `.next/static/css/5b04c1be5e3cf6ca.css` | 19264 | **19343** | `inline-flex` |
| Dentists | `.next/static/css/47e5c3a7f0ed19c3.css` | 13784 | **13863** | `inline-flex` |
| Property | `.next/static/css/3e47daae61d1adc7.css` | 14722 | **14801** | `inline-flex` |

Same 79-byte gap on all four — it is Tailwind's fixed `display` utility ordering,
not a per-site accident. Verbatim context from generalist:

```
$ python -c "s=open('generalist/web/.next/static/css/1487733c3b9dd0c2.css',encoding='utf-8').read();print(repr(s[15600:15760]))"
'ts}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.table{'
```

Both are single-class selectors (specificity 0,1,0) and the brace-depth walk puts
both inside `@layer utilities`, so **source order decides and `.inline-flex` wins.**

The consumer:

```
packages/web-shared/design/chrome/SiteHeader.tsx:473
  className={`${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`}

packages/web-shared/design/layout-utils.ts:30
  export const btnPrimary = "inline-flex min-h-12 … "
```

`btnPrimary` opens with the unconditional `inline-flex`. The element therefore
carries `inline-flex`, `hidden` and `lg:inline-flex` at once. Below 1024px the
`lg:` variant is inert, but the unconditional `.inline-flex` still beats
`.hidden` on source order. **`hidden` is a dead no-op and the header CTA never
hides below 1024px on any site that imports the kit header.** Confirmed no site
patches it:

```
$ grep -rn 'data-cta-placement="header"\|header_book' \
    generalist/web/src/app/globals.css Property/web/src/app/globals.css Solicitors/web/src/app/globals.css
(no output, exit 1)
```

(`contractors-ir35/web/src/app/globals.css` is the only site carrying such an
`@layer utilities` override — the P1-9 rule recorded at
`docs/contractors-ir35/_port/F10_UNLAYERED_SWEEP.md:377-381`. Every other ported
site is unpatched.)

### 5.3 What the charities port must do differently

The port adopts the kit header at a moment when charities has **no** header to
preserve, which is the cheapest possible position to fix this from. Do not
adopt-then-patch.

1. **Fix the source, not the consumer.** `btnPrimary` is a general button recipe
   and its unconditional `inline-flex` is correct for its other ~6 consumers
   (`BlogCategoryHub.tsx:207`, `ComparisonTable.tsx:96`, `ProblemStatement.tsx:50`,
   `StickyCTA.tsx:156`, `SiteHeader.tsx:615` mobile drawer). The defect is that
   `SiteHeader.tsx:473` composes a display-toggling variant on top of a recipe
   that already fixes `display`. The one-line fix is at `SiteHeader.tsx:473`:
   strip the recipe's `display` before composing, e.g.
   `btnPrimary.replace("inline-flex ", "")` plus the existing
   `hidden … lg:inline-flex`. That is trap 12 territory — `packages/web-shared`
   is shared — so it is an **owner decision**, not a port decision.
2. **If the owner will not touch `web-shared`**, charities adds a site-local
   `@layer utilities` rule keyed on the header CTA's data attributes, exactly as
   contractors-ir35 did. Second-best: it repairs one site and leaves five broken.
3. **Either way the port must NOT copy an already-ported site's globals.css and
   assume the CTA hides.** None of generalist, Solicitors, Dentists or Property
   carries a fix (grep above), so copying them inherits the defect silently.
4. **Verification, at 390px, after the port builds:** the header primary CTA must
   not be in the accessibility tree. Static proxy, runnable without a browser:
   confirm the site's built CSS contains a rule that re-hides the header CTA
   below `64rem`, i.e. `grep -o '@media[^{]*64rem[^}]*display:none[^}]*}'
   charities/web/.next/static/css/*.css` returns a match, or the fix in (1)
   landed and `SiteHeader.tsx:473` no longer emits a bare `inline-flex`.

---

## 6. Where this brief was wrong, and what I could not do

### Wrong

| # | Brief said | Actually |
|---|---|---|
| W1 | *"slate-500 on white = 4.76, slate-400 = 2.56 are TAILWIND V3 hexes; v4 paints slate-400 at 2.63"* | **Right on slate-400** (v3 `#94a3b8` = 2.56, v4 `#90a1b9` = 2.63). **Imprecise on slate-500**: v3 `#64748b` = 4.76, v4 `#62748e` = **4.77**, not 4.76. Both pass 4.5; the correction is cosmetic but the figure in circulation should say 4.77 for v4. |
| W2 | *"a mid-tone brand hex can clear one floor and fail another"* — implying three ratios for `#1a5c4a` | WCAG contrast is **symmetric**. There is **one** ratio (7.85) measured against **three different floors** (3.0/4.5/4.5). Playbook §8 item 11 encodes the *floor* difference, not a ratio difference. Stated so the manager does not go looking for three numbers. |
| W3 | *"give the exact verification command … of the shape `grep -c "primary-600" …`"* | `grep -c` counts **lines**, and a production Tailwind stylesheet is one line with no trailing newline. It returns only `0` or `1` and cannot distinguish "one utility slipped in" from "42 utilities generated" — generalist returns `1` for 42 occurrences. Replaced with `grep -o … \| wc -l` in §3.4, with the `0` vs `42` proof. |
| W4 | *"`globals.css` reported to be 23 lines with no `@layer` blocks at all - verify"* (implying the sweep would find more) | **The brief's figure is exactly right.** 23 lines, zero `@layer`, and the walk finds only 2 unlayered rules of which 1 is benign. Unlike contractors-ir35 (3 reported vs 26 present), charities has **no undercount** — the file is genuinely tiny. The corrected method was still required to establish that, and it caught a second thing the F10 version could not: the F10 walk is line-based and returns **nothing at all** on a minified single-line stylesheet, so the shipped-CSS half of task 1 would have silently reported "clean". That is a real bug in the documented method and should be fixed in the playbook. |
| W5 | *"`#1a5c4a`, `#0f2e24` are reported present"* on the homepage | True, and the inventory is larger: `#154a3b` (19×), `#fafaf9` (13×), `#f0f7f4` (6×), `#fafaf7` (5×), `#2d7a62` (4×), `#0a1f19`, `#64748b`, `#334155`, `#0f172a`. All measured in §4.6. |
| W6 | Task 2 framed as *"check … `packages/web-shared` for anything charities pulls in"* | charities pulls in **nothing** from `packages/web-shared/design` today — all 10 shared imports are `/console/*` on admin routes. `globals-standard.css` is not imported. The sweep was run against it anyway as the port's future surface, and is clean. |

### Could not do

| # | Item | Why |
|---|---|---|
| C1 | Rendered-DOM contrast verification | Served build is read-only to me and I did not run a browser. All ratios are computed from source hexes and the v4.3.0 oklch table against the grounds established by reading the JSX section wrappers. The one that most deserves eyes is D1 (`.section-label` at `page.tsx:690` on `#0f2e24`, 1.22) — it is a source-level certainty (no rule exists anywhere, so it inherits `--ink`) but a 5-second look at `http://localhost:3117/` would confirm it. |
| C2 | Ground enumeration for the 24 `text-slate-400` and 6 `text-slate-300` instances | Out of phase-0 scope; several sit on dark grounds and pass. Listed in §4.7 D2 for the phase-5 sweep rather than measured half-way. |
| C3 | Fixing anything | Brief is explicit: no site code or CSS edited. §1.4, §2.1, §3.3, §4.7 and §5.3 are the port's work list, not applied changes. |

### Scratch cleanup

`/tmp/lw.py`, `/tmp/lw2.py`, `/tmp/ship.txt` were scratch only. Nothing was
written into the repo except this file.
