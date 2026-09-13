# G1 — radius shadow + footer credit comment

File lease: `contractors-ir35/web/src/app/globals.css` and
`contractors-ir35/web/src/components/layout/SiteFooter.tsx`. No other file touched.
No build run (tree shared with parallel agents). Both servers asserted before any
work: `curl -s <base>/ | grep -o -i "fixed[- ]fee" | wc -l` = **0** on :3651,
**17** on :3611, identical `<title>` on both.

## Defect 1 — `rounded-xl` rendered 4px site-wide

### Mechanism, confirmed from the shipped stylesheet not from the source

`/_next/static/css/e2fc5c841fee2c83.css` (served by :3651) contains, verbatim:

```
.rounded-xl{border-radius:var(--radius-xl)}
--radius-xl:.75rem                  <- Tailwind v4 theme default, LAYERED :root
--radius-xl:calc(var(--radius) + 4px)  <- globals.css:60, plain UNLAYERED :root
--radius:0rem
--btn-radius:var(--radius-xl)
```

An unlayered declaration beats a layered one regardless of source order, so every
`rounded-xl` call site resolved to `calc(0rem + 4px)` = **4px**. `.rounded-lg` is
`.5rem` = 8px, so the scale was inverted: the site's single standard radius was
the squarest step in the file. Pre-port production (:3611) serves the same
`.rounded-xl` rule with only the `.75rem` theme value and no shadow, which is the
12px measurement the brief reports.

The comment above line 60 asserted "nothing here reads it directly". `.rounded-xl`
reads it. Third comment on this site that describes code it does not describe.

Why no sweep caught it: F10 swept for unlayered **rules** (`^selector {`). This is
an unlayered custom **property** inside a `:root` block F10 correctly classified as
a token block. The sweep's shape cannot see it.

### Resolution chosen: delete the shadowing declaration, keep `--btn-radius`

`--btn-radius` exists because this site does not import `globals-standard.css`, so
without it the kit's `btnPrimary` arbitrary utility
`rounded-[var(--btn-radius,9999px)]` (`packages/web-shared/.../layout-utils.ts:43`)
falls back to a 9999px pill (P1-1_TOKENS.md). That is preserved.

Line 60 deleted. Line 61 becomes `--btn-radius: var(--radius-xl, 0.75rem);`.

Rejected alternative: setting `--radius-xl: 0.75rem` in the same unlayered block.
It produces the same 12px today, but it keeps an unlayered shadow of a Tailwind
theme variable alive in the file — the exact class of bug being fixed — and it
duplicates a value the theme already owns, so the next change to the standard
radius silently desynchronises. Deleting leaves one source of truth (the theme).

The literal `0.75rem` fallback on `--btn-radius` covers the one residual risk of
deleting: Tailwind v4 tree-shakes `@theme` variables, so `--radius-xl` is only
emitted while some `rounded-xl` utility is generated. 146 site call sites plus 42
kit ones make that safe today; the fallback makes the pill regression impossible
even if that ever went to zero.

`--radius: 0rem` is now read by nothing. Left in place (removing tokens is not this
package's job) with an inline note not to re-derive `--radius-xl` from it.

### Resolved values

| Token | Before | After |
|---|---|---|
| `--radius` | `0rem` | `0rem` (unchanged, now unreferenced) |
| `--radius-xl` | `calc(0rem + 4px)` = **4px**, unlayered shadow | `0.75rem` = **12px**, from the layered Tailwind theme |
| `--btn-radius` | **4px** | **12px** |
| `.rounded-xl` computed | **4px** | **12px** |
| `.rounded-lg` computed | 8px | 8px (scale no longer inverted) |

## Shadowed-property sweep, whole file

Every custom property declared in `globals.css`, checked against the Tailwind v4
theme namespaces (`--color-*`, `--font-*`, `--text-*`, `--leading-*`, `--spacing-*`,
`--radius-*`, `--shadow-*`, plus `--tracking-*`, `--breakpoint-*`, `--container-*`,
`--ease-*`, `--animate-*`, `--blur-*`, `--perspective-*`, `--aspect-*`).

Only the `:root` block at lines 20-92 is unlayered. Everything else lives inside
`@theme inline` (95-105), `@theme` (140-152) or `@layer base`/`@layer components`,
where a same-named declaration is a *deliberate, correctly layered* theme override,
not a shadow.

| Declaration | Where | Namespace collision | Verdict |
|---|---|---|---|
| `--radius-xl` | unlayered `:root` | YES, `--radius-*` | **accidental shadow — removed (defect 1)** |
| `--radius` | unlayered `:root` | no (`--radius` bare is a shadcn convention; v4 uses `--radius-xs..4xl`) | safe, now unused |
| `--btn-radius` | unlayered `:root` | no (kit-private name) | deliberate, required |
| `--chart-1..5` | unlayered `:root` | no (shadcn convention, not a v4 namespace) | deliberate |
| `--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`, `--brand-primary-text`, `--brand-primary-ground` | unlayered `:root` | no | deliberate |
| `--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--border`, `--input`, `--ring`, `--muted`, `--destructive`, `--success` | unlayered `:root` | no (shadcn semantic names; the v4-visible names are the `--color-*` aliases in `@theme inline`) | deliberate |
| `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--ink-whisper`, `--hairline`, `--accent`, `--accent-strong`, `--accent-whisper`, `--highlight`, `--highlight-on-dark` | unlayered `:root` | no (site-private) | deliberate |
| `--color-background/foreground/primary/primary-foreground/border/input/ring`, `--font-sans`, `--font-mono` | `@theme inline` (95-105) | by design | deliberate, layered override |
| `--color-primary-50..950` | `@theme` (140-152) | by design | deliberate, layered override (P1-7 ramp, untouched) |

**One accidental shadow in the file. No second instance of the class.**

Settled work explicitly left intact: the `@source "../../../../packages/web-shared"`
line, `--color-primary-600` = cyan-700 `#0e7490`, the `--chart-3` off-ramp step, the
layered `header a[data-cta-placement="header"]` rule, the zero-specificity
`:where(h2[id],h3[id],h4[id])` scroll-margin rule, and all 25 rules F10 moved into
`@layer base` / `@layer components`. No `data-cta` attribute touched.

### Contrast-method calibration

No new contrast ratio was needed for G1, but the method was self-tested against the
**Tailwind v4** table as instructed, not the v3 one: slate-500 `#62748e` on white =
**4.76**, slate-400 `#90a1b9` on white = **2.63**. Both reproduce the brief's v4
figures (4.77 is the same number at one more decimal, 4.764). The v3 hexes `#64748b`
/ `#94a3b8` measure 4.76 / 2.56 under the same code, confirming the two tables are
genuinely different at slate-400 and that the v4 table was the one used.

## Defect 2 — the comment, not the behaviour

`SiteFooter.tsx` omits `showBuilderCredit`; the kit default is `true`; "Built by
Double Wired Creative" renders. **Verified rendering on :3651** (the anchor is
present in the served HTML). That is correct and unchanged.

Commit `6966c1f1` read directly, not taken on trust. It records the owner decision
of 2026-09-11: the credit is wanted estate-wide, the kit default was already `true`,
and it states that "a future port that passes nothing is correct".

The wrapper's comment still carried the pre-decision phase 1 rationale ("this site
did not commission Double Wired Creative, so the credit link would be neither earned
nor on-brand"), which is why two reviewers independently filed the rendered credit
as a defect. The comment now states the decision, its date and its commit, and tells
the next reader not to pass `false`. **Zero behaviour change.**

## Verification list for the serialised build

1. `grep -n "radius" contractors-ir35/web/src/app/globals.css` — expect no
   `--radius-xl:` declaration, and `--btn-radius: var(--radius-xl, 0.75rem);`.
2. Built CSS carries exactly one `--radius-xl`:
   `curl -s http://localhost:<new>/_next/static/css/*.css | grep -o -- '--radius-xl:[^;]*' | sort -u`
   → one line, `.75rem`. (Before: two lines.)
3. **Computed style, the load-bearing check.** On the homepage, in the browser
   console:
   ```js
   const el = document.querySelector('.rounded-xl');
   [getComputedStyle(el).borderTopLeftRadius,
    getComputedStyle(document.documentElement).getPropertyValue('--radius-xl').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--btn-radius').trim()]
   ```
   → expect `["12px", "0.75rem", "0.75rem"]`. On :3651 today this returns
   `["4px", "calc(0rem + 4px)", "calc(0rem + 4px)"]`.
4. Scale not inverted: same check on a `.rounded-lg` element → `8px`, i.e. strictly
   less than the `rounded-xl` 12px.
5. Kit button is not a pill:
   `getComputedStyle(document.querySelector('a[data-cta-placement="header"]')).borderTopLeftRadius`
   → `12px`, never `9999px`.
6. Parity against pre-port production: the same computed check on :3611 returns
   `12px`. New build must match.
7. Footer credit still renders:
   `curl -s http://localhost:<new>/ | grep -c "Built by Double Wired Creative"` → ≥1.
8. No `showBuilderCredit` prop appeared:
   `grep -rn "showBuilderCredit" contractors-ir35/web/src` → 0 hits outside comments.
9. Nothing settled moved:
   `git diff --stat` → two files, and `git diff` shows no change to the `@source`
   line, the ramp, the chart tokens or any `@layer` block.

## Receipt

- **Radius before:** `--radius` `0rem`, `--radius-xl` `calc(0rem + 4px)` = 4px,
  `--btn-radius` 4px, `.rounded-xl` 4px (squarer than `rounded-lg` 8px).
  **After:** `--radius` `0rem` (unused), `--radius-xl` `0.75rem` = 12px from the
  layered theme, `--btn-radius` 12px, `.rounded-xl` 12px. 146 site call sites + 42
  kit call sites corrected by a one-line deletion.
- **Shadowed properties found:** one, `--radius-xl`. Full file enumerated above; no
  other unlayered declaration collides with a v4 theme namespace.
- **Comment corrected:** `SiteFooter.tsx` header comment now records the owner
  decision and commit `6966c1f1` and warns against passing `false`. No behaviour
  change; credit verified rendering.
- **Wrong in the brief:** nothing. Both defects, the mechanism, the blast radius,
  the `6966c1f1` decision and the v4 calibration figures all reproduced against
  source. The only nuance is 4.77 vs my 4.76 for slate-500 v4, which is rounding of
  4.764, not a disagreement.
- **Wrong elsewhere:** `P1-1_TOKENS.md` states "the site's own `rounded-xl` ... is
  unaffected either way since that's a literal Tailwind utility, not an arbitrary
  `var()` read". That sentence is the origin of this defect and is false — in v4
  `.rounded-xl` *is* `var(--radius-xl)`. Not corrected here (not my lease to rewrite
  another phase's record); flagging for the manager.
- **Nothing needed** from the calculators, resources pages or location data.
  `packages/web-shared/` not touched.
