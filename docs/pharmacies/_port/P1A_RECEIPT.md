# P1-A receipt — tokens (pharmacies)

Package: P1-A. Model: Sonnet. No subagents launched.

## Files changed (exactly the OWNS list)
- `pharmacies/web/src/app/globals.css` — rewritten per A1-A11.
- `pharmacies/web/src/app/layout.tsx` — font/noscript region only: moved
  `plusJakarta.variable` from `<body>` to `<html>`, kept `.className` on
  `<body>`, added the `<noscript>` release inside `<body>` (copied from
  hospitality).
- `pharmacies/web/package.json` — added `"tw-animate-css": "^1.4.0"` to
  `dependencies` (same slot as hospitality's).
- root `package-lock.json` — `npm install --package-lock-only` from repo
  root; `pharmacies/web`'s manifest now lists `tw-animate-css: ^1.4.0`.

Nothing under `components/`, `page.tsx`, `tests/`, `lib/`, `niche.config.json`
or `packages/**` was touched.

## A1/A3/A4 derived values (as specified by the brief, not re-derived — brief's
numbers checked against the hex and accepted)
- Ramp: 50 `#edfdff` … 950 `#0f3a4a` (brand hex, unchanged, 12.18/1.47).
- `--radius: 0rem`.
- Button trio: `--btn-ground:#0f3a4a` (12.18) / `-hover:#0a3342` (13.48) /
  `-active:#072f3d` (14.20).
- Focus ring: `--focus-ring-on-light: var(--color-primary-950)`,
  `--focus-ring-on-brand:#ffffff`; `--kit-focus-ring` bound directly to the
  ground token (not `var(--focus-ring)`), per A4's computed-value-time
  warning.
- Glow channels (RGB triplets): 500/600/400/100 steps — `48 178 224`,
  `28 143 182`, `69 205 255`, `211 247 255`.
- Warning/info: `--warning-ground:#d97706` (amber-600, 3.35 — brief's own
  caveat that a later white-on-amber pass must step to amber-700 `#b45309`
  4.92), `--info-ground:#0284c7` (sky-600, 4.07, same caveat); collision note
  (sky vs primary-600) written into the file.

## Acceptance — ran now (no build/server needed)
```
cd pharmacies/web && npx tsc --noEmit
-> clean, no output

grep -c "color-primary-950: #0f3a4a" src/app/globals.css       -> 1
grep -c "radius: 0rem" src/app/globals.css                     -> 1
grep -c "brand-glow" src/app/globals.css                       -> 10 total lines
  (4 real declarations at :root; 6 are the A7 comment block's prose
  mentions — same shape the brief itself flags for this grep, confirmed by
  reading the matched lines: declarations are exactly
  --brand-glow/-deep/-edge/-faint, once each)
grep -c "brand-primary-text\|brand-primary-ground" src/app/globals.css -> 2
  (both are comment mentions — "...are therefore NOT declared" / "No ...
  override" — 0 actual declarations, matches the brief's "comment mentions
  fine")
grep -n "@layer base" src/app/globals.css                      -> 1 (line 115), contains `body`
grep -c "plusJakarta.variable" src/app/layout.tsx               -> 1, on <html> (line 29)
cd ../.. && python scripts/check_dependency_closure.py          -> "dependency closure OK across 19 sites"
```

Brace-depth walk (utf-8-sig, character-stream, layer-stack-aware, from
`DESIGN_PORT_PLAYBOOK.md` §15), run on the SOURCE `globals.css` (the built
CSS does not exist yet — no build was run, per T1):
```
   202  @layer base        body
   217  @layer components  a[href="#main"]:focus
   226  @layer components  .ground-dark
   241  @layer components  footer
   254  @layer components  .prose table:not(.not-prose *)
```
Zero `*** UNLAYERED ***` rows. Baseline was two unlayered rules (`body`,
`.prose table`); both are now layered (`body` in `@layer base`, the table
carve-out moved into `@layer components`, comment kept verbatim per A11).
**The manager must re-run this same walk against the BUILT CSS after the
single build** — only the built CSS decides layer order per the playbook.

## For the manager to run (needs build/server)
```
grep -o "bg-primary-50\|text-primary-400\|text-primary-600" pharmacies/web/.next/static/css/*.css | wc -l   # expect >0
grep -o "9999px" pharmacies/web/.next/static/css/*.css | wc -l                                               # record only
```
Rendered, on `next start`: `getComputedStyle(document.body).fontFamily`
should report a quoted `"Plus Jakarta Sans"` (T-H1). Also re-run the
brace-depth walk against the built CSS.

## A5 (skip-link contrast rule) and A7 (glow/emerald) status
Both rules are written into the file now (`a[href="#main"]:focus` in
`@layer components`; the four `--brand-glow*` declarations at `:root`). Per
the brief both are **dead until P1-C mounts the kit shell** — nothing in this
package renders them. Not verified rendered; that is P1-C's/R1's job.

## Handoffs (OFF LIMITS territory, found incidentally, not touched)
- None beyond what the brief already names for other packages (layout-utils.ts
  for P1-B, neutral-* for P1-D, PharmaciesBackdrop for P1-E, etc.) — nothing
  new surfaced while reading `src/app/layout.tsx` or `globals.css`.

## False premises in the brief, checked against source
None found. Every A1-A11 instruction matched what was in the repo when
checked (hospitality's `globals.css`/`layout.tsx` as the worked example,
`globals-standard.css`'s existence and path, `tw-animate-css` absent from
`pharmacies/web/package.json` and present in hospitality's at `^1.4.0`, the
kit `PageShell.tsx` skip-link hardcoding — not independently re-grepped since
A5 instructs writing the rule regardless, not re-verifying the kit source,
and P1-A owns no kit file to check it against safely without risking scope
creep into `packages/**`).

## Motion layer / A6
`globals-standard.css` import chain added in the exact order specified
(tailwindcss source → @source → tw-animate-css → globals-standard.css →
prose-standard.css). The motion-layer table comment was reproduced at the top
of the file (A6) stating phase 1 mounts none of it — true: no
`.eyebrow-rule`/`.tick-draw`/`[data-glow]`/`.num-glow`/`.hero-reveal`/
`.marquee-*`/`.related-card` consumer exists under `pharmacies/web/src`
today (not re-grepped exhaustively here since that is explicitly "say so,"
not "sweep for," in the brief — flagging as a light verification gap, not a
false premise).
