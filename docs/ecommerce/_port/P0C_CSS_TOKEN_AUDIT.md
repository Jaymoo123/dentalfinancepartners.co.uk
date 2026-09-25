# P0C - CSS, token and contrast audit (ecommerce port, phase 0)

Report only. No site file, no kit file and no `packages/web-shared/` file was touched.

Provenance asserted before any claim was quoted:

- Server: `curl -s http://localhost:3191/` returns 200 and `<title>Ecommerce and marketplace seller accountants UK</title>`.
- The served page links exactly one stylesheet, `href="/_next/static/css/93927b945ac87065.css"`, which is the single file in `ecommerce/web/.next/static/css/` (74,893 bytes). Every "built CSS" statement below is that file.
- Tailwind banner at byte 0 of the bundle: `tailwindcss v4.3.0`. All ramp reasoning is v4 oklch, not v3 hex.

---

## 1. Findings table

| # | What | Where | Evidence command and decisive line | Severity | What it blocks in the port |
|---|---|---|---|---|---|
| F1 | `body` IS unlayered in the built CSS and sits after `@layer utilities` closes. It is beating nothing today because no `bg-*`, `text-*` or font utility is on `<body>`, but it will beat the first one added. | `ecommerce/web/src/app/globals.css:23-27`; bundle byte 70220 | brace-depth walk over the character stream, `utf-8-sig`: `UNLAYERED rules: 2 / line1 off70010 ctx=[] sel=':root' / line1 off70220 ctx=[] sel='body'` | HIGH (latent) | Any phase-1 step that puts `bg-*`/`text-*`/`next/font` on `<body>` or `<html>` renders dead with green tests |
| F2 | White text on the brand ground is 3.04:1. Live today in `btnPrimary` and in the kit `ServiceTiers` badge and CTA. | `ecommerce/web/src/components/ui/layout-utils.ts:18`; `packages/web-shared/components/ServiceTiers.tsx:51,73`; served `/services` | `contrast.py` -> `white on brand ground: 3.04`; `curl -s http://localhost:3191/services` returns `bg-[var(--brand-primary-ground,var(--brand-primary))] ... text-white` | HIGH | Every primary CTA and the "most popular" badge fail the 4.5 text floor. Blocks any phase-1 sign-off that claims AA |
| F3 | `${btnPrimary} text-base` loses. `.text-base{` is at byte 36727, `.text-sm{` (inside `btnPrimary`) at 36917 - equal specificity, later wins, so these buttons render at `text-sm`. | `book/page.tsx:47`, `complete/page.tsx:31,59,99`, `components/forms/BookingPicker.tsx:106`, `components/forms/DetailsForm.tsx:120` (6 sites) | `grep -boF '.text-base{'` -> `36727`; `grep -boF '.text-sm{'` -> `36917` | MEDIUM | A composed-override race already live. Phase 1 must compose from a base recipe, not append over a complete one |
| F4 | `.prose-blog` is defined in no stylesheet this site loads. Three legal pages emit it. | `cookie-policy/page.tsx:28`, `privacy-policy/page.tsx:30`, `terms/page.tsx:28` | `grep -boF '.prose-blog'` on the bundle -> **zero matches** (`.prose` matches 29 selectors) | MEDIUM | Three legal pages render unstyled. Dead class, not a styling bug |
| F5 | `.prose-neutral` is also dead. The blog article body emits `prose prose-neutral`. | `blog/[category]/[slug]/page.tsx:50` | `grep -boF '.prose-neutral'` on the bundle -> zero matches | LOW | Harmless today (`.prose` carries it), but do not treat `prose-neutral` as a styling lever |
| F6 | Kit `btnPrimary` in `packages/web-shared/design/layout-utils.ts:37` reads `--color-primary-600/700/800` **bare**, with no site declaration and no fallback. Also `--radius`, `--radius-xl` bare in `packages/web-shared/design/globals-standard.css:38-41`. | kit only - the site does **not** import either file today | `vars.py` -> `BARE UNDECLARED COUNT: 8 ['--accent','--accent-strong','--color-primary-600','--color-primary-700','--color-primary-800','--primary','--radius','--radius-xl']` | HIGH if adopted | Adopting kit `layout-utils`/`globals-standard` in phase 1 without declaring `--color-primary-50..950` and `--radius` produces an invisible button (invalid declaration, not black) |
| F7 | `--brand-primary-ground` and `--brand-primary-text` are read by the kit and declared nowhere on this site, so both silently fall back to `#c9861b`. | `ServiceTiers.tsx:51,73`; `MiniCapture.tsx` | bundle contains `--brand-primary-ground` 4x and `--brand-primary-text` 2x, all as reads; `--accent:`/`--primary:`/`--radius:` declaration count = 0 | HIGH | This is the exact hook phase 1 needs for F2. It exists and is unused |
| F8 | 244 hardcoded hex literals under `ecommerce/web/src`. `#c9861b` alone appears at 60 file:line positions across 14 files; the token `--brand-primary` that should own it is declared once and read by zero site files. | see section 3 | `grep -rhoE '#[0-9a-fA-F]{3,8}\b' ecommerce/web/src --include=*.tsx --include=*.ts --include=*.css \| wc -l` -> `244` | MEDIUM | A brand change is a 244-site edit, not a token edit |
| F9 | No single colour can serve as a focus ring on every ground this site paints. Proof in section 4. | `layout-utils.ts:15,18,21,24` use `outline-[#c9861b]`, which is 1.00:1 against the brand button it rings | analytic, section 4 | MEDIUM | Phase 1 must accept a two-value ring (light/dark), not "restore the brand colour" |

## 2. False premises in the brief (numbered, as asked)

1. **Line numbers wrong.** The brief says the `body` rule is at `globals.css:24-28`. The file is 27 lines; `body` is at **23-27**. `cat -n` line 23 = `body {`, line 27 = `}`.
2. **"An unlayered element rule OUTRANKS every Tailwind v4 utility" - true, but the sibling-site defect does not exist here.** There is no bare `a { }` and no `input, textarea, select { }` in this site's `globals.css`. The only two unlayered rules in the whole built bundle are `:root` and `body`. Do not fix a footer-link or input-radius defect here; there isn't one. F1 is a latent trap, not a live one.
3. **"`grep -nE "^[a-zA-Z][^{]*\{"` ... reported 3 where the truth was 26."** Not applicable to this file - the truth here is 2. I did not use that grep; I used the brace-depth walk as instructed, and it found 2 in source and 2 in the bundle, consistent.
4. **The walk has a trap the brief does not mention, and it bites silently.** A naive character walk desynchronises at byte 51,019 of the bundle on the selector `.after\:content-\[\'\'\]:after` - the CSS-escaped `\'` is read as an opening string quote and the parser swallows the remaining 24 KB, reporting **0 unlayered rules** with no error. That is exactly the "every test green" failure mode the brief warns about elsewhere. The quote scanner must honour a preceding backslash. Before the fix: 662 rules, 0 unlayered. After: 922 rules, 2 unlayered. Anyone re-running this must apply the same fix or they will falsely clear `body`.
5. **"`--brand-primary` hardcoded AGAIN at `SiteNav.tsx:25,33`"** - correct, verified. But the brief undercounts by two orders of scale: `#c9861b` appears at 60 file:line positions, and `SiteFooter.tsx:14` is a third nav-chrome instance the brief missed.
6. **"`#c9861b` on white is 3.04"** - **you are right.** Independently derived: 3.04. See the self-test line in section 4.
7. **"`slate-500` `#62748e` = 4.77"** - my converter gives **4.76**, not 4.77, for both the v4 oklch and the v4 hex. The `2.63` for `slate-400` matches exactly. The v3 comparison in the brief is also slightly off: v3 `slate-500` is `#64748b` (4.76, coincidentally identical) and v3 `slate-400` is `#94a3b8` (2.56, matching the brief's 2.56). So the brief's v4/v3 split is right in substance; only the 4.77 figure is a rounding artefact. I used 4.76 throughout.
8. **"The kit's `btnPrimary` hardcodes its own text colour and ground."** Half true and the important half is false. The kit `btnPrimary` reads its ground from `var(--btn-ground, var(--color-primary-600))`; it hardcodes only `text-white`. More importantly, **this site does not use the kit `btnPrimary` at all** - it has its own `ecommerce/web/src/components/ui/layout-utils.ts`, which hardcodes `bg-[#c9861b]` and `text-white` directly. The composed-override race is real here (F3) but it is a *size* race, not a colour race: no call site appends a competing colour class. There is no white-on-white hero button on this site.
9. **"`.prose` ... expect rules to exist - verify, do not assume."** Verified: 29 `.prose*` selectors, all inside `@layer components`, first at byte 10040. The import works.
10. **"three explanatory comments about `@source` and the prose import" - all three verified, one is loosely worded.** (a) `source("..")` scans from `src/` - correct, the `@source` path resolves to the repo root `packages/web-shared`. (b) "without this line every utility used only inside packages/web-shared compiles to nothing" - **true**, proven positively: `.bg-\[var\(--brand-primary-ground\,var\(--brand-primary\)\)\]{` (a class that exists only in `ServiceTiers.tsx`) is emitted at byte 27456, and `.-translate-x-1\/2{` at 18800. (c) "nothing in the estate defines `.prose`" - **false as written**. `packages/site-styles/prose-standard.css` is in the estate and defines it; the comment means "nothing this site loads by default". Harmless, but it is a claim, so it is logged.

## 3. Hardcoded hex census (`ecommerce/web/src`)

Total literals: **244**. Split by role, because only the first group is a rendering surface:

| Role | Count | Notable |
|---|---|---|
| Rendered page/component UI (`app/**/page.tsx`, `components/**`) | 187 | `page.tsx` alone carries 38; `research/online-seller-index/page.tsx` 47 |
| Email and OG templates (`lib/emails/`, `lib/leads/`, `api/leads/*/route.ts`, `api/og/`) | 47 | out of CSS scope - inline styles in generated HTML |
| `globals.css` token declarations | 10 | the only legitimate ones |

`#c9861b` positions (60): `app/page.tsx` x28, `research/online-seller-index/page.tsx` x7, `for/[slug]/page.tsx` x4, `services/[slug]/page.tsx` x4, `vat/[slug]/page.tsx` x4, `for/page.tsx` x3, `services/page.tsx` x3, `vat/page.tsx` x3, `blog/[category]/[slug]/page.tsx` x3, `components/ui/layout-utils.ts` x5 (lines 15, 18 x2, 21, 24), `components/ui/SiteNav.tsx` x2 (lines 25, 33), `components/ui/SiteFooter.tsx` x1 (line 14), `components/research/*` x2, `lib/emails/lead-service-template.ts` x5.

Brand-adjacent hexes that are *not* the brand and have no token at all: `#8a5e1a` (6 uses), `#b5761a` (3), `#9e6615` (1 declaration, 3 rendered occurrences), `#1a3a5c` (41), `#1a2942` (2), `#0f1c30`/`#243550` (gradient stops), `#fafaf9` (5), `#fafaf7` (3).

## 4. Contrast

Converter self-test, printed as required:

```
SELF-TEST slate-500 oklch(55.4% .046 257.417) -> #62748e (expect 62748e) ratio 4.76 (expect 4.77)
SELF-TEST slate-400 oklch(70.4% .04 256.788)  -> #90a1b9 (expect 90a1b9) ratio 2.63 (expect 2.63)
v3 comparison: #64748b 4.76 / #94a3b8 2.56
```

Hex reproduction is exact for both. The 4.77 in the brief is a rounding artefact; 4.76 is the value.

`#c9861b` has **one** luminance-derived ratio against each ground, and three verdicts follow from it. Grounds below are those this site actually paints, enumerated from `ecommerce/web/src` and cross-checked against the served HTML of `/`. **Source** distinguishes a Tailwind ramp utility (v4 oklch, resolved through the converter) from a CSS custom property or an arbitrary-value hex.

| Ground | Source | Resolved hex | Ratio vs `#c9861b` | as graphic (3:1) | as text (4.5:1) | as ground under `#c9861b` text (4.5:1) | white on it |
|---|---|---|---|---|---|---|---|
| `#ffffff` | token `--background` + `bg-white` (48 in served HTML) | `#ffffff` | **3.04** | PASS | FAIL | FAIL | 1.00 |
| `neutral-50` | utility (38 served) | `#fafafa` | 2.91 | FAIL | FAIL | FAIL | 1.04 |
| `neutral-100` | utility (2 served) | `#f5f5f5` | 2.79 | FAIL | FAIL | FAIL | 1.09 |
| `slate-50` | utility (18 in src) | `#f8fafc` | 2.90 | FAIL | FAIL | FAIL | 1.05 |
| `slate-100` | utility (9 in src) | `#f1f5f9` | 2.77 | FAIL | FAIL | FAIL | 1.10 |
| `slate-200` | utility (2 in src) | `#e2e8f0` | 2.47 | FAIL | FAIL | FAIL | 1.23 |
| `slate-300` | utility (1 in src) | `#cad5e2` | 2.04 | FAIL | FAIL | FAIL | 1.49 |
| `slate-400` | utility (1 in src) | `#90a1b9` | 1.16 | FAIL | FAIL | FAIL | 2.63 |
| `--surface` | token | `#f8fafc` | 2.90 | FAIL | FAIL | FAIL | 1.05 |
| `#fafaf9` | arbitrary (10 served) | `#fafaf9` | 2.91 | FAIL | FAIL | FAIL | 1.04 |
| `#fafaf7` | arbitrary (3 in src) | `#fafaf7` | 2.91 | FAIL | FAIL | FAIL | 1.05 |
| `neutral-800` | utility (3 in src) | `#262626` | 4.98 | PASS | PASS | PASS | 15.13 |
| `neutral-900` | utility (9 in src) | `#171717` | 5.90 | PASS | PASS | PASS | 17.93 |
| `--ink` | token | `#0f172a` | 5.87 | PASS | PASS | PASS | 17.85 |
| `#1a3a5c` | arbitrary (8 in src) | `#1a3a5c` | 3.83 | PASS | FAIL | FAIL | 11.64 |
| `#1a2942` | arbitrary (4 served, gradient `from`) | `#1a2942` | 4.80 | PASS | PASS | PASS | 14.59 |
| gradient `via-[#243550]/80` over `#1a2942` | arbitrary, composited | `#22334d` | 4.19 | PASS | FAIL | FAIL | 12.74 |
| `#0f1c30` | arbitrary, gradient `to` | `#0f1c30` | 5.62 | PASS | PASS | PASS | 17.09 |
| `#8a5e1a` | arbitrary (6 in src) | `#8a5e1a` | 1.87 | FAIL | FAIL | FAIL | 5.68 |
| `#b5761a` | arbitrary (5 served, `hover:` on the CTA) | `#b5761a` | 1.24 | FAIL | FAIL | FAIL | **3.77** |
| `#9e6615` | arbitrary (3 served, `active:` on the CTA) | `#9e6615` | 1.00 | FAIL | FAIL | FAIL | **4.81** |
| `#c9861b` | brand itself | `#c9861b` | 1.00 | FAIL | FAIL | FAIL | **3.04** |

The single gradient (`app/page.tsx:220`, `bg-gradient-to-br from-[#1a2942] via-[#243550]/80 to-[#0f1c30]`) has no one colour, so each stop is composited and the worst - the `via` stop at `#22334d`, 4.19 - is the governing value. It clears the graphic floor and fails the text floor.

Two consequences the port must carry:

- **Brand as text on any light ground: fails everywhere.** Best case is white at 3.04. `text-[#c9861b]` appears at 39227 in the bundle and is used across nav hover, links and headings. It is decorative-grade only.
- **White as text on brand ground: 3.04, fails.** The hover step `#b5761a` is worse-for-white at 3.77; only the `active` step `#9e6615` clears 4.5, at 4.81. So the darkest state of the button is the only accessible one, which is backwards.

### Does this site need `--brand-primary-text` and `--brand-primary-ground`?

**Yes, both, and this is the Medical copper case exactly.** Medical's `#b87333` sat at 3.79 and needed the split; `#c9861b` sits at 3.04, worse.

- `--brand-primary-ground` is needed because white-on-brand is 3.04. `#9e6615` (already in the codebase as the `active` step) carries white at **4.81** and is the minimal change: one token declaration, no new colour invented.
- `--brand-primary-text` is needed because brand-on-white is 3.04. `#8a5e1a` (already in the codebase, 6 uses) carries **5.68** on white and **5.44** on `#fafaf9`. Also minimal: no new colour.

Both names are already read by the kit with fallbacks (`ServiceTiers.tsx:51,73`, `MiniCapture.tsx`) and declared nowhere, so declaring them in `:root` changes behaviour with zero component edits. That is the whole phase-1 fix for F2 and F7.

### Focus ring: proof that no single colour works

The site paints, in the served HTML: `#ffffff`, `#fafafa` (neutral-50), `#f5f5f5` (neutral-100), `#fafaf9`, `#1a2942`, `#c9861b`, `#b5761a`, `#9e6615`. Relative luminances: 1.00000, 0.95597, 0.91310, 0.95535, 0.02199, 0.29547, 0.22855, 0.16826.

For a candidate ring of luminance `L` to clear 3.0 against a ground of luminance `g`, it must be either darker (`L <= (g+0.05)/3 - 0.05`) or lighter (`L >= 3(g+0.05) - 0.05`). Taking each painted ground in turn:

- vs `#ffffff` (g=1.0): lighter needs `L >= 3.10`, impossible. So **`L <= 0.30000`**.
- vs `#1a2942` (g=0.02199): darker needs `L <= -0.026`, impossible. So **`L >= 0.16597`**.
- vs `#9e6615` (g=0.16826): **`L <= 0.02275` or `L >= 0.60478`**.

Combine the first two: `0.16597 <= L <= 0.30000`. Intersect with the third: `L <= 0.02275` is excluded by the lower bound, and `L >= 0.60478` is excluded by the upper bound. **The intersection is empty.** A brute-force sweep of the sRGB cube at step 17 (4,096 candidates) returns `None`, agreeing with the analytic result.

So: `#c9861b` as the ring is doubly wrong - it is 1.00:1 against the very button it rings - and no replacement single colour exists. The ring must be **two-valued**, selected by ground:

- On light grounds (`#ffffff`, `neutral-50/100`, `#fafaf9`): `#8a5e1a` (`--brand-primary-text`), 5.68 on white.
- On brand and dark grounds (`#c9861b`, `#b5761a`, `#9e6615`, `#1a2942`): `#ffffff`, 3.04 / 3.77 / 4.81 / 14.59 - all clear 3.0.

If a future agent wants one value, the only way is to stop painting either the light grounds or the brand grounds, which is a design change, not a token change.

## 5. `var()` sweep result

49 files scanned across `packages/web-shared/design/**`, `packages/web-shared/leads/MiniCapture.tsx`, `packages/web-shared/components/ServiceTiers.tsx`, `packages/site-styles/prose-standard.css`. 28 distinct custom-property names read.

The defensible claim, stated as the brief requires:

> For the files this site **actually loads today** - `packages/site-styles/prose-standard.css` (imported at `globals.css:6`) and `packages/web-shared/components/ServiceTiers.tsx` (imported at `services/page.tsx:3`) - **every undeclared name is fallback-guarded, checked at the element.** There are zero bare undeclared reads on the live surface.

Detail:

| Name | Status against `ecommerce/web/src/app/globals.css` | Where read |
|---|---|---|
| `--background`, `--surface`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, `--border`, `--brand-primary`, `--brand-primary-strong`, `--brand-on-primary` | declared | site + kit |
| `--accent`, `--accent-strong`, `--primary` | undeclared, **fallback-guarded at every read** (4/1/1 guarded, 0 bare after comment-stripping) | `prose-standard.css` |
| `--brand-primary-ground`, `--brand-primary-text` | undeclared, fallback-guarded | `ServiceTiers.tsx:51,73`, `MiniCapture.tsx` - **declare these in phase 1**, see section 4 |
| `--btn-ground`, `--btn-ground-hover`, `--btn-ground-active`, `--hero-cream`, `--brand-glow*`, `--glow-delay`, `--token` | undeclared, fallback-guarded | kit files this site does **not** import |
| `--color-primary-600`, `--color-primary-700`, `--color-primary-800` | **undeclared and bare** | `packages/web-shared/design/layout-utils.ts:37` - not loaded today, lethal on adoption |
| `--radius`, `--radius-xl` | **undeclared and bare** | `packages/web-shared/design/globals-standard.css:38-41` - not loaded today, lethal on adoption |

Note the trap in the sweep itself: a naive regex counts `--accent-strong`, `--primary` and `--accent` as bare because `prose-standard.css:40-42` documents the fallback chain **inside a comment**. Comments must be stripped before the sweep, or the audit invents three defects that do not exist.

## 6. Recommended token set for phase 1

Minimal, additive, and every value already exists in the codebase - no new colour is invented, which is what stops the next agent from re-litigating art direction.

```css
:root {
  /* existing, unchanged */
  --brand-primary: #c9861b;         /* 3.04 on white: graphic only, never text */
  --brand-primary-strong: #c9861b;
  --brand-on-primary: #ffffff;

  /* ADD - the accessible split */
  --brand-primary-text: #8a5e1a;    /* 5.68 on white, 5.44 on #fafaf9 */
  --brand-primary-ground: #9e6615;  /* white on it = 4.81 */
  --brand-primary-ground-hover: #8a5e1a;  /* white on it = 5.68 */
  --focus-ring-on-light: #8a5e1a;
  --focus-ring-on-brand: #ffffff;

  /* ADD - name the greys the site already paints, so they stop being literals */
  --ground-subtle: #fafaf9;         /* 10 occurrences in served HTML */
  --ink-navy: #1a2942;              /* white on it = 14.59 */
}
```

Reasoning, in order of what it buys:

1. `--brand-primary-ground` / `--brand-primary-text` are already read by the kit with fallbacks. Declaring them fixes the live `ServiceTiers` badge and CTA on `/services` (F2, F7) with **zero component edits**. That is the highest ratio of defect-closed to diff in the whole port.
2. Keeping `--brand-primary` at `#c9861b` preserves every decorative use (borders, icons, rules, `border-l-[#c9861b]`) at its passing 3.04 graphic rating. Nothing visually "loses the brand", which is the objection this token set is designed to pre-empt.
3. The focus ring must be two-valued; section 4 proves one value is impossible. Naming both halves is the only way the proof survives the next agent.
4. `--radius` and `--color-primary-50..950` must be declared **before** any kit `layout-utils.ts` or `globals-standard.css` adoption (F6), or the primary button renders with no background and every test stays green. If phase 1 does not adopt those kit files, skip this - but say so explicitly in the phase-1 plan rather than leaving it unstated.
5. Not recommended for phase 1: migrating the 244 hex literals (F8). It is a large mechanical diff with real regression surface and it closes no accessibility defect on its own. Do it after the token set is proven, one file at a time, starting with the three nav-chrome instances (`SiteNav.tsx:25,33`, `SiteFooter.tsx:14`) and `components/ui/layout-utils.ts`.
6. Not a token problem, but must ride the same wave: `.prose-blog` on the three legal pages (F4) and the `${btnPrimary} text-base` race at six call sites (F3).

## 7. Scripts used

All scratch scripts were written to the session scratchpad and are not in the repo: `walk.py` (brace-depth layer walk, with the CSS-escaped-quote fix), `find.py`, `vars.py` (comment-stripping `var()` sweep), `contrast.py` (oklch to sRGB, WCAG ratio, self-test).
