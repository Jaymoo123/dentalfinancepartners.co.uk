# P1-1 — Token foundation, contractors-ir35/web/src/app/globals.css

File lease: exactly `contractors-ir35/web/src/app/globals.css`. No other file touched.

## Method

WCAG relative luminance, sRGB→linear per channel, `(L1+0.05)/(L2+0.05)`. Self-test
reproduced the required anchors exactly: slate-500 `#64748b` on white = **4.7588**
(reports as 4.76), slate-400 `#94a3b8` on white = **2.5640** (reports as 2.56). Both
match before any token ratio below was trusted.

## Tokens added

| Token | Value | Role | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|---|
| `--radius-xl` | `calc(var(--radius) + 4px)` = 4px | radius chain | n/a | n/a | n/a | added, see note below |
| `--btn-radius` | `var(--radius-xl)` = 4px | button radius | n/a | n/a | n/a | added, see note below |
| `--brand-primary-text` | `var(--accent-strong)` = cyan-800 `#155e75` | text on white | white | 7.27 | 4.5 | PASS |
| `--brand-primary-text` | cyan-800 `#155e75` | text on site surface | `#fafaf7` | 6.95 | 4.5 | PASS |
| `--brand-primary-ground` | `var(--accent)` = cyan-700 `#0e7490` | ground under white label | n/a | 5.36 | 4.5 | PASS |
| `--chart-1` | cyan-700 `#0e7490` | value label / fill | white | 5.36 | 3.0/4.5 | PASS both |
| `--chart-2` | cyan-800 `#155e75` | value label / fill | white | 7.27 | 3.0/4.5 | PASS both |
| `--chart-3` | cyan-600 `#0891b2` | fill only (not text) | white | 3.68 | 3.0 | PASS graphics floor, FAILS 4.5 (by design — see below) |
| `--chart-4` | cyan-900 `#164e63` | value label / fill | white | 9.11 | 3.0/4.5 | PASS both |
| `--chart-5` | slate-600 `#475569` | value label / fill | white | 7.58 | 3.0/4.5 | PASS both |

**Chart-3 correction from a first draft:** the ramp's natural next step after
cyan-700/cyan-800/cyan-900 for a fifth-ish tone would have been cyan-400
`#22d3ee`, matching the delta's "on-navy accent" step. Measured on white it is
**1.81:1** — fails even the 3.0 non-text floor, so it cannot be a chart fill on
a white chart background. Swapped to cyan-600 `#0891b2` (3.68, the exact value
the delta already flags as the failing 600 step for text/button use) — here it
is used only as a graphical fill with the value direct-labelled in ink text
beside it, per the Property standard's "every value is direct-labelled" rule,
so the 3.0 non-text floor is the correct one and it passes. Every value drawn
in chart-3 must carry its own text label; the fill colour is never the only
way to read the number.

No chart component in this package reads these tokens yet (confirmed:
`grep -rn "chart-" src/components/research src/components/calculators` = 0
hits). Wiring `SurvivalIndexCharts.tsx` / `ContractorIndexCharts.tsx` /
`ContractorInsolvencyCharts.tsx` / `PremiumBarChart.tsx` to them is
chart-component work, out of this file's lease — reporting so the manager can
sequence it.

## `--radius-xl` / `--btn-radius` — a correction to the brief

The brief frames this as "the standard derives `--radius-xl` and pins
`--btn-radius`... neither exists here, supply them so the radius system
binds," implying the missing piece is these two custom properties. **That's
half the picture.** This site's `globals.css` does not import
`@accounting-network/web-shared/design/globals-standard.css` at all (no
`@import`, no `@source` for `packages/web-shared`) — every other ported
sibling checked (dentists, medical) does both. That import is what turns
`--radius` into a Tailwind `@theme` chain (`--radius-sm/md/lg/xl`) usable as
`rounded-xl` etc. across the whole codebase.

It does not block this package's specific target, though: web-shared's
`btnPrimary` (`packages/web-shared/components/ui/layout-utils.ts:43`) reads
`--btn-radius` through a raw arbitrary utility —
`rounded-[var(--btn-radius,9999px)]` — which resolves from any `--btn-radius`
custom property in scope, with or without the kit's `@theme` derivation. So
defining `--radius-xl` and `--btn-radius` directly in `:root`, as this package
does, is sufficient to stop web-shared buttons rendering as 9999px pills,
which is the concrete defect item 3 named. ~~Confirmed the site's own `rounded-xl` (33 call sites per the delta's census) is
unaffected either way since that's a literal Tailwind utility, not an arbitrary
`var()` read.~~

**CORRECTION 2026-09-13 (G1). THE STRUCK SENTENCE ABOVE IS FALSE, AND IT IS WHY A
SITE-WIDE REGRESSION SHIPPED.** In Tailwind v4 `.rounded-xl` IS
`border-radius: var(--radius-xl)`, so declaring `--radius-xl` in an unlayered
`:root` shadows the layered theme value and repaints every call site. Measured:
`rounded-xl` rendered 4px here against 12px pre-port, inverting the scale so
`rounded-xl` was squarer than `rounded-lg` (8px), across 146 site call sites plus
42 in the kit and 44 elements on the homepage alone.
It survived every sweep because F10 hunted unlayered RULES and this is an
unlayered custom PROPERTY, which that sweep structurally cannot see.
Fixed by DELETING the shadowing declaration rather than pinning it to `0.75rem`:
pinning keeps an unlayered shadow of a theme variable alive, which is the bug
class itself. `--btn-radius: var(--radius-xl, 0.75rem)` preserves the anti-pill
guard. Detail: `G1_RADIUS_FOOTER.md`.
RULE: never declare a custom property whose name collides with a Tailwind v4
theme variable (`--radius-*`, `--color-*`, `--font-*`, `--spacing-*`, `--text-*`,
`--leading-*`, `--shadow-*`) outside `@theme`. Sweep for the collision by NAME,
not by whether a utility "looks literal".

**Reporting, not fixing:** whether to add the `@import`/`@source` pair for
`globals-standard.css` estate-wide parity is a bigger structural change than
one file's token additions and is not this package's file lease to make
unilaterally — flagging for the manager to sequence as a follow-up if the
port wants full kit-chain parity (e.g. `--radius-sm`/`--radius-md` derived
utilities, if anything in this codebase ever needs them; nothing does today).

## `--ink-whisper` — call-site audit (brief item 5)

`grep -rn "ink-whisper" contractors-ir35/web/src --include=*.tsx --include=*.ts --include=*.css`
→ **one hit, the definition itself** (`globals.css:17`). Also checked
`var(--ink-whisper` directly for arbitrary-utility usages (`text-[var(--ink-whisper)]`
etc.) — zero hits.

**Resolution: the token has zero call sites anywhere in the codebase.** It is
not used for text, or for anything else. The delta's "UNVERIFIED" is now
verified: no illegal 2.38:1 text colour is currently rendered by this token
because nothing reads it. Left the token defined as-is (not a `:root` risk by
itself, and removing an unused token is not this package's job); no
call-site fix was needed because none exist.

## Unlayered-rule decision

Command: `grep -nE "^[a-zA-Z][^{]*\{" contractors-ir35/web/src/app/globals.css`
→ `75:html {`, `88:body {`, `283:select {` (start of the
`input/textarea/select` block), `290:select:disabled {` (start of the
`button:disabled` block). Same four hits P0D_CSS_A11Y.md reported.

**Decision: left all three blocks unlayered, no migration.** Confirmed the
P0D disposition myself rather than trusting it verbatim, since the brief
explicitly asks for that:

- `html` (line 75-80): font smoothing + `text-size-adjust` only. No colour, no
  radius, no layout property a Tailwind utility would ever target. Inert.
- `body` (line 88-98): sets `background`/`color` unlayered, which *would* beat
  a `bg-*`/`text-*` utility placed directly on `<body>` — but
  `grep -n "className" src/app/layout.tsx` shows the `<body>` tag carries no
  Tailwind colour utility today. Dormant, not firing. Left as a documented
  latent risk, not migrated: migrating it into `@layer base` would be a
  needless-risk change for a hazard that isn't live, and the brief itself
  warns a needless migration is its own risk.
- `input[type=...], textarea, select` (line 278-286) and
  `button:disabled, input:disabled, select:disabled` (line 288-293): checked
  specifically for the sibling-site radius trap ("unlayered `input, textarea,
  select { border-radius: 8px }` silently beat the entire radius system").
  **Does not apply here** — this block sets only `font-family: inherit` and
  `font-size: inherit`; no `border`, `border-radius`, or colour property
  anywhere in it. The disabled-state block sets only `opacity`/`cursor`. Both
  confirmed harmless by direct read of the rule bodies, not by trusting the
  phase-0 label.

No blast radius to report because nothing was migrated.

## Receipt

- Tokens added: `--radius-xl`, `--btn-radius`, `--brand-primary-text`,
  `--brand-primary-ground`, `--chart-1..5` (7 new custom properties, all in
  `:root`).
- Tokens changed: none (existing `--accent`, `--accent-strong`,
  `--brand-primary`, `--brand-primary-strong` were already correct per the
  delta and untouched).
- Ratios measured: 9 (see table above), self-test passed against both
  published anchors before trusting any of them.
- Unlayered blocks: 3 found, 0 migrated (all judged genuinely inert or
  dormant-and-unfired), reasoning recorded per block above.
- `--ink-whisper`: 0 call sites anywhere in the codebase — verified, not a
  live text-contrast defect. Token left in place, unused.
- Wrong in the brief: item 3 undersold the gap. `globals.css` doesn't import
  `packages/web-shared/design/globals-standard.css` at all (unlike dentists
  and medical), so the kit's `@theme`-derived radius chain doesn't exist here
  regardless of these two tokens. It didn't block this package's target
  (web-shared's button reads `--btn-radius` via a raw `var()` arbitrary
  utility, not through that chain), but full kit-chain parity is a bigger,
  separate decision — reported to the manager, not fixed here.
- chart-3's first-draft value (cyan-400) measured 1.81 on white and would have
  failed even the 3.0 graphics floor; corrected to cyan-600 (3.68) before
  shipping, noted inline in the CSS and above.
- P0D_CSS_A11Y.md's unlayered findings independently re-verified and confirmed
  correct; no correction needed to that document.
