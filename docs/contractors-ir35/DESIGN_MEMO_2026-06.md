# Contractor Finance Partners — brand colour shift design memo

Date: 2026-06-12
Status: SPEC — ready for an implementing agent. This memo is the source of truth for the colour shift. No site code is changed by this document.
Scope: token and colour shift + OG/imagery treatment only. No layout restructuring. No typography change (see "Typography: no change" below for the check that confirms this).
UK English throughout.

---

## 1. Decision summary

The site currently uses Tailwind `teal-*` (primary `teal-600 #0d9488`, strong `teal-700 #0f766e`) across 17 files. The user has decided to shift the primary into a cooler petrol/cyan family so the site reads clearly distinct from Property's warm emerald `#059669`.

This memo specifies that shift precisely, with one calibration adjustment driven by the competitor pass:

- Primary moves from `teal-*` to `cyan-*`. New primary = **`cyan-700 #0e7490`**, strong/hover = **`cyan-800 #155e75`**, active = **`cyan-900 #164e63`**, deep section bands = `cyan-900 #164e63` / `cyan-950 #083344`.
- A distinctive **warm metallic amber accent** is introduced (it does not exist on the site today): on-white CTAs/emphasis = **`amber-700 #b45309`**, on-dark highlights = **`amber-400 #fbbf24`**. This is the single most important differentiator. The competitor pass (section 2) found the category leader (Caroola, formerly SJD) is already teal/cyan + navy, and the rest of the SERP is corporate blue/navy. A pure cyan recolour would have walked the site straight into the market leader's palette. A cool petrol body plus a warm amber accent is the gap in this SERP.
- Hero and dark-section text highlights move to a sharper, more "digital" **`cyan-400 #22d3ee`** (replacing the muted `teal-400`), which reads as engineered/technical, fitting the tech and consulting contractor audience.
- Neutrals (off-white `#fafaf7`, ink `#0a0a0a`, the `neutral-*` scale) are KEPT unchanged. They are estate-standard and carry no collision.
- Typography KEPT unchanged: Geist Sans + Geist Mono (see section "Typography: no change").

Why `cyan-700` and not the user's stated `#0e7490` "range" verbatim as a one-off hex: `#0e7490` IS Tailwind `cyan-700` exactly, so we adopt the named scale wholesale. That keeps the whole ramp (50/100/200/.../950) internally consistent, lets the find→replace be a clean class swap, and gives us correct hover/active/tint steps for free. Custom hexes are only used in the three `:root` accent tokens and the config files, where named classes are not available.

Net brand statement: deep petrol-cyan body, near-black structural sections, a warm amber call-to-action accent, electric-cyan highlights on dark. Cool, sharp, digital — and unmistakably not Property's warm emerald, not the navy professional-services sites, and not the market leader's softer teal.

---

## 2. Competitor calibration (SERP positioning)

Four real competitors were fetched on 2026-06-12. One line each:

- **Caroola / SJD Accountancy** (`caroola.com`, the category leader; SJD rebranded April 2023): teal/cyan plus dark navy, clean professional digital. This is the key finding — the biggest brand in the niche already owns soft teal+navy, so our shift must go cooler/deeper (petrol cyan) and lean hard on a non-blue accent to avoid reading as a Caroola clone.
- **inniAccounts** (`inniaccounts.co.uk`): white/grey with blue accents, "corporate but human", award-winning-tech positioning. Generic professional blue.
- **Brookson** (formerly intouch accounting; `brookson.co.uk`): navy + white with blue accents, geometric, corporate-but-approachable. Generic professional navy.
- **Crunch** (`crunch.co.uk`): hot pink/magenta primary with navy, playful and digitally-native. The one outlier — proves a brighter accent can work in the niche, but pink is overtly playful and off-brief for an IR35-compliance specialist.

Conclusion: the SERP is a wall of cool blue/teal/navy with one playful-pink outlier. The defensible, on-brief gap is **deep petrol-cyan + near-black + a warm metallic amber accent**. The amber gives instant SERP and OG-thumbnail recognition against an otherwise monochromatic-blue field, while staying serious enough for a tax-compliance audience (amber reads as "premium/metallic/highlight", not "fun"). Electric `cyan-400` highlights on dark sections reinforce the engineered, technical feel that suits tech/consulting contractors.

---

## 3. Find → replace table (literal, execute in order)

Every current colour token mapped to its replacement. The implementing agent can run these as scoped string replacements within `contractors-ir35/web/src/`. Order matters only in that the longer/qualified strings (e.g. `border-l-teal-600`, `outline-teal-600`) are covered by the base `teal-600 → cyan-700` rule because the swap is on the `teal-N` fragment, not the whole class — so a simple per-fragment replace of `teal-<shade>` → `cyan-<shade>` handles every compound class (`bg-`, `text-`, `border-`, `border-l-`, `decoration-`, `outline-`, `accent-`, `from-`, `hover:`, `group-hover:`, `focus:`, `active:`, `/20`, `/40`, `/82` opacity suffixes) automatically.

### 3a. Tailwind class fragments (apply as fragment swaps)

| Current fragment | Replace with | Notes |
|---|---|---|
| `teal-50` | `cyan-50` | tint surfaces (success box bg) |
| `teal-100` | `cyan-100` | on-primary-band labels, quote marks, success box |
| `teal-200` | `cyan-200` | quote glyphs, success box border |
| `teal-300` | `cyan-300` | on-dark hover text |
| `teal-400` | `cyan-400` | hero/dark-section highlight text + icons |
| `teal-600` | `cyan-700` | PRIMARY — buttons, icon tiles, borders, focus rings, links-on-light, checkbox accent. Note shade STEP-UP 600→700 to hold contrast (see 3c). |
| `teal-700` | `cyan-800` | strong — hover states, prose-ish links on light, stat band bg, mid-page overlay parent. Note STEP-UP 700→800. |
| `teal-800` | `cyan-900` | active state (`active:bg-teal-800`) and deepest link hover. |
| `teal-900` | `cyan-900` | dark overlay (`bg-teal-900/82`) and dark gradient (`from-teal-900/30`). Map to `cyan-900`; keep the `/82` and `/30` opacity suffixes. |

Important nuance on the 600→700 / 700→800 step-up: the current site uses `teal-600` as the primary fill and `teal-700` as the band/hover. `teal-600 #0d9488` on white is only ~3.0:1 (large-text-only). Moving the primary to `cyan-700 #0e7490` lifts white-on-primary to 5.36:1 (full AA) while keeping a near-identical perceived darkness to the old teal band, so the visual weight of buttons and the stat band is preserved. This is deliberate, not a drift. The hover then becomes `cyan-800` and active `cyan-900`, giving a clean three-step interaction ramp.

### 3b. Custom hex values (CSS + config — these are NOT Tailwind classes)

| File | Current | Replace with | Token |
|---|---|---|---|
| `globals.css` `:root` | `--accent: #0d9488;` | `--accent: #0e7490;` | primary (cyan-700) |
| `globals.css` `:root` | `--accent-strong: #0f766e;` | `--accent-strong: #155e75;` | strong (cyan-800) |
| `globals.css` `:root` | `--accent-whisper: #f0fdfa;` | `--accent-whisper: #ecfeff;` | whisper tint (cyan-50) |
| `globals.css` header comment (line 7) | `Teal accent (#0d9488), ...` | `Petrol-cyan accent (#0e7490) with warm amber highlight, ...` | comment only |
| `globals.css` comment (line 20) | `/* Brand accent (teal family) */` | `/* Brand accent (petrol-cyan family) + amber highlight */` | comment only |
| `niche.config.json` | `"primary_color": "#0d9488"` | `"primary_color": "#0e7490"` | brand.primary_color |
| `niche.config.json` | `"theme_color": "#0d9488"` | `"theme_color": "#0e7490"` | seo.theme_color (browser chrome) |

Note: `niche.config.json` lives at `contractors-ir35/niche.config.json` (repo root for the site, NOT under `web/src`), and feeds `themeColor` via `niche.seo.theme_color` in `layout.tsx`. It is in scope and MUST be changed or the mobile browser chrome stays teal.

### 3c. New accent token additions (additive — there is no current accent to replace)

Add to `globals.css` `:root`, after the existing accent block:

```css
  /* Warm amber highlight (CTA emphasis, OG, key numbers) */
  --highlight: #b45309;        /* amber-700 — AA on white */
  --highlight-on-dark: #fbbf24; /* amber-400 — AA on ink/dark sections */
```

The amber accent is introduced sparingly and deliberately (it is a highlight, not a second primary). Recommended initial placements, to be applied by the implementing agent during the recolour (these are net-new accent touches, low risk, reversible):
- The hero trust line `ShieldCheck` icon (`page.tsx` line 188) MAY move from highlight-cyan to `text-amber-400` to introduce the accent above the fold. Optional; cyan-400 is also fine. Implementer's call, keep it to one or two touches.
- Key numeric stats in the `bg-cyan-800` stat band: the big `font-mono` figures MAY use `text-amber-300`/`text-amber-400` to make the headline metrics pop (`amber-300 #fcd34d` on `cyan-900` = 6.32:1, `amber-400` on `cyan-800`-class background also passes). This is the highest-value, lowest-risk accent placement.
- OG image accent rule (see section 5).
Do NOT repaint primary CTAs amber — primary action stays petrol-cyan; amber is the secondary visual spark only. This keeps a single clear primary action colour.

---

## 4. Token block (exact `:root` after change)

The full intended `:root` brand block in `contractors-ir35/web/src/app/globals.css`:

```css
:root {
  /* Neutral surface and ink — UNCHANGED */
  --surface: #fafaf7;
  --surface-elevated: #ffffff;
  --ink: #0a0a0a;
  --ink-soft: #525252;
  --ink-whisper: #a3a3a3;
  --hairline: #e5e5e5;

  /* Brand accent (petrol-cyan family) + amber highlight */
  --accent: #0e7490;          /* was #0d9488 (cyan-700) */
  --accent-strong: #155e75;   /* was #0f766e (cyan-800) */
  --accent-whisper: #ecfeff;  /* was #f0fdfa (cyan-50) */

  /* Warm amber highlight (NEW — CTA emphasis, key numbers, OG) */
  --highlight: #b45309;         /* amber-700 — AA on white */
  --highlight-on-dark: #fbbf24; /* amber-400 — AA on dark */

  /* Status — UNCHANGED */
  --destructive: #dc2626;
  --success: #10b981;

  /* Tailwind v4 semantic tokens — UNCHANGED (they reference --accent) */
  --background: var(--surface);
  --foreground: var(--ink);
  --card: var(--surface-elevated);
  --card-foreground: var(--ink);
  --primary: var(--accent);
  --primary-foreground: #ffffff;
  --border: var(--hairline);
  --input: var(--hairline);
  --ring: var(--accent);
  --radius: 0rem;
  --muted: var(--ink-soft);

  /* Canonical brand tokens for shared components — UNCHANGED (reference --accent) */
  --brand-primary: var(--accent);
  --brand-primary-strong: var(--accent-strong);
  --brand-on-primary: #ffffff;
}
```

Because `--primary`, `--ring`, `--brand-primary` etc. all reference `var(--accent)`, changing the three `--accent*` hexes automatically re-colours: the `@theme inline` `--color-primary`/`--color-ring`, the `.eyebrow` text, the `.section-label` chip background, the `.prose-blog` `h2` left border, the `.prose-blog a` link colour (uses `--accent-strong`) and its hover (`--accent`), and any shared `@accounting-network/web-shared` component that reads `--brand-primary*`. No edits are needed to those CSS rules themselves — only the three hex values at the top.

No Tailwind config file change is required for the named-colour swaps: `cyan-*` and `amber-*` are built into Tailwind's default palette (this is Tailwind v4, `@import "tailwindcss"`), so the find→replace of class fragments is sufficient. There is no `tailwind.config` colour extension to edit.

### `.section-label` chip
The chip (`globals.css` lines 159-168) uses `background: var(--accent)` with `color: white`. After the token change it becomes `cyan-700 #0e7490` on white text = 5.36:1, AA pass. No rule change needed. It currently appears on dark heroes/CTAs and on light sections; both contexts hold (white text on the cyan chip is fixed regardless of surrounding surface).

### Focus rings
`focusRing` in `layout-utils.ts` is `outline-teal-600` → `outline-cyan-700`. Plus the `--ring` token (used by shared components) follows `--accent` automatically. Focus indicator colour stays in-family and visible on both light and dark surfaces.

### Link colours in prose
`.prose-blog a` uses `--accent-strong` (now `cyan-800 #155e75`, 7.27:1 on white, AAA) with hover `--accent` (`cyan-700`, 5.36:1). Both pass comfortably; prose links get slightly MORE contrast than before. The inline Tailwind prose-style links elsewhere (`text-teal-700 ... hover:text-teal-800`) map to `text-cyan-800 ... hover:text-cyan-900` via the fragment swap.

### Gradients
Two gradient/overlay treatments exist and both stay in-family:
- Hero overlay `bg-gradient-to-r from-neutral-950/97 via-neutral-950/90 to-neutral-900/60` — NO colour change (neutral, not teal). Keep as-is.
- CTA section `bg-gradient-to-br from-teal-900/30 ...` → `from-cyan-900/30 ...` (fragment swap, opacity preserved).
- Mid-page editorial overlay `bg-teal-900/82` → `bg-cyan-900/82` (fragment swap, opacity preserved).

---

## 5. Imagery + OG direction

The site uses two Pexels photos (hero `photos/7433839`, mid-page editorial `photos/7433853`), both warm-neutral desk/consultation stock currently sitting under teal/neutral overlays. To make them cohesive with the new petrol identity, apply a consistent **petrol duotone-style overlay** rather than swapping the photos: keep the existing hero `from-neutral-950` gradient (it is neutral and reads as premium), but where a brand-tinted overlay already exists (mid-page `bg-teal-900/82`, CTA `from-teal-900/30`) it becomes `cyan-900` so the brand tint reads as deep petrol, not muddy teal. For a stronger duotone feel the implementer may add a low-opacity `mix-blend-multiply` `bg-cyan-950/40` layer over the photo behind the existing gradient, which pulls the warm stock tones toward petrol without replacing the asset (cheap, reversible, no new image sourcing). Crop and `object-cover object-center` stay unchanged. The single warm amber accent should NOT appear inside photo overlays — it lives only in type/icons/OG so it stays a deliberate spark.

OG image template spec (the site currently has NO dynamic OG route — `layout.tsx` serves `siteConfig.publisherLogoUrl` only; building a real OG template is a recommended follow-up but is implementation, not this memo). Target template when built:
- Canvas 1200x630, background = deep petrol vertical gradient `#0e7490 → #083344` (cyan-700 to cyan-950), or flat `#083344` for maximum text contrast.
- Type: Geist Sans, white headline (`#ffffff`, AAA on the petrol ground), Geist Mono eyebrow/label in `cyan-200 #a5f3fc`.
- Accent: a single warm amber element — a short `#fbbf24` (amber-400) underline rule or the wordmark mark — to carry the brand spark into social/Slack/search thumbnails and stand out against the all-blue competitor OGs. amber-400 on `#083344` is high-contrast (well above AA).
- The square `bg-cyan-700` brand mark from `BrandWordmarkHomeLink` (recoloured by the fragment swap) reused top-left for continuity.

---

## 6. File-by-file change inventory

17 files contain colour fragments/hex; 78 class/hex occurrences in `web/src` plus 2 in `niche.config.json`. All are simple swaps per section 3. Grouped:

### CSS / config (hex swaps — section 3b)
- `contractors-ir35/web/src/app/globals.css` — 4 hits: `--accent`, `--accent-strong`, `--accent-whisper` hexes + 2 comment lines (lines 7, 20). Also ADD the two `--highlight*` tokens (section 3c/4).
- `contractors-ir35/niche.config.json` — 2 hits: `brand.primary_color` (line 9) and `seo.theme_color` (line 74).

### Shared UI / layout (fragment swaps)
- `web/src/components/ui/layout-utils.ts` — 4 hits: `focusRing` (`outline-teal-600`→`outline-cyan-700`), `btnPrimary` (`bg-teal-600`/`hover:bg-teal-700`/`active:bg-teal-800`/`outline-teal-600` → `cyan-700`/`cyan-800`/`cyan-900`/`cyan-700`), `btnSecondary` (`outline-teal-600`→`outline-cyan-700`), `linkArrow` (`outline-teal-600`→`outline-cyan-700`). Note `btnOnTeal` (line 20) is named for the band but its classes are neutral/black — rename the export to `btnOnPetrol` is OPTIONAL/cosmetic; if renamed, update its single import site. Safer to leave the export name and only swap colours (there are none in it). Leave name as-is to avoid import churn.
- `web/src/components/forms/LeadForm.tsx` — 5 hits: input `focus:border-teal-600`→`focus:border-cyan-700`; checkbox `accent-teal-600`→`accent-cyan-700`; privacy link `text-teal-700`→`text-cyan-800`; success box `border-teal-200 bg-teal-50`→`border-cyan-200 bg-cyan-50`; success text `text-teal-900`→`text-cyan-900`.
- `web/src/components/layout/SiteHeader.tsx` — 3 hits: active nav `text-teal-700`→`text-cyan-800` (x2 patterns) and mobile-panel label `text-teal-600`→`text-cyan-700`; hover `hover:text-teal-700`→`hover:text-cyan-800`.
- `web/src/components/layout/SiteFooter.tsx` — 2 hits: label `text-teal-600`→`text-cyan-700`; links `text-teal-700 hover:text-teal-800`→`text-cyan-800 hover:text-cyan-900`.
- `web/src/components/layout/PageShell.tsx` — 1 hit: skip-link `focus:bg-teal-600`→`focus:bg-cyan-700`.
- `web/src/components/brand/BrandWordmarkHomeLink.tsx` — 2 hits: brand square `bg-teal-600`→`bg-cyan-700`; wordmark hover `group-hover:text-teal-700`→`group-hover:text-cyan-800`.

### Pages (fragment swaps)
- `web/src/app/page.tsx` — 23 hits (homepage; the heaviest file). Hero highlight span + ShieldCheck `text-teal-400`→`text-cyan-400` (line 169, 188; see 3c for optional amber on the icon); stat band `bg-teal-700`→`bg-cyan-800` + `text-teal-100`→`text-cyan-100` (lines 197, 203); testimonial quote `text-teal-200`→`text-cyan-200` (237); card left-border `border-l-teal-600`→`border-l-cyan-700` (261); service cards hover `hover:border-teal-600`, icon tile `bg-teal-600`/`group-hover:bg-teal-700`, heading hover `group-hover:text-teal-700`, link `text-teal-600` (289-298) → cyan-700/800; contractor-types dark grid label `bg-teal-600`, card `hover:bg-teal-600/20 hover:border-teal-400/40`, text `group-hover:text-teal-300`, arrow `group-hover:text-teal-400`, see-all link `text-teal-400 hover:text-teal-300` (318-345) → cyan equivalents; comparison highlight `text-teal-700`→`text-cyan-800` (360); mid-page overlay `bg-teal-900/82`→`bg-cyan-900/82` (404); editorial copy `text-teal-100`→`text-cyan-100` (410); CTA gradient `from-teal-900/30`→`from-cyan-900/30` (419); CTA numbered tile `bg-teal-600`→`bg-cyan-700` (438); FAQ summary hover `hover:text-teal-700`→`hover:text-cyan-800` (470); FAQ plus icon `text-teal-600`→`text-cyan-700` (473); blog CTA link `text-teal-700 hover:text-teal-800`→`text-cyan-800 hover:text-cyan-900` (508).
- `web/src/app/for/[slug]/page.tsx` — 14 hits: back link `hover:text-teal-400`→`hover:text-cyan-400` (47); stat band `bg-teal-700`/`text-teal-100`→`cyan-800`/`cyan-100` (74, 80); card `border-l-teal-600`→`cyan-700` (98); service card `hover:border-teal-600`→`cyan-700` (119); services link `text-teal-700 hover:text-teal-800`→`cyan-800/900` (127, 252); quote `text-teal-100`→`cyan-100` (141); FAQ summary hover (171), plus icon `text-teal-600` (174), checkmark tile `bg-teal-600` (212), related-card hover `hover:border-teal-600` + `group-hover:text-teal-700` + arrow `group-hover:text-teal-600` (240-245) → cyan-700/800.
- `web/src/app/services/page.tsx` — 3 hits: card hover `hover:border-teal-600`→`cyan-700` (118); icon tile `bg-teal-600`→`cyan-700` (121); back link `decoration-teal-600`→`decoration-cyan-700` (160).
- `web/src/app/ir35-status/page.tsx` — 5 hits: hero highlight `text-teal-400`→`text-cyan-400` (50); test border `border-teal-600`→`border-cyan-700` (75); table "Outside IR35" header `text-teal-300`→`text-cyan-300` (96); mono label `text-teal-600`→`text-cyan-700` (132); back link `decoration-teal-600`→`decoration-cyan-700` (161).
- `web/src/app/for/page.tsx` — 3 hits: card hover `hover:bg-teal-600/20 hover:border-teal-400/40`→cyan (37); text `group-hover:text-teal-300`→`cyan-300` (39); arrow `group-hover:text-teal-400`→`cyan-400` (45).
- `web/src/app/contact/page.tsx` — 3 hits: eyebrow `text-teal-400`→`text-cyan-400` (17); phone figure `text-teal-600`→`text-cyan-700` (51); email link `text-teal-700 hover:text-teal-800`→`cyan-800/900` (68).
- `web/src/app/blog/page.tsx` — 2 hits: eyebrow `text-teal-400`→`text-cyan-400` (27); read link `text-teal-700 ... hover:text-teal-800`→`cyan-800/900` (82).
- `web/src/app/thank-you/page.tsx` — 2 hits: accent bar `bg-teal-600`→`bg-cyan-700` (15); back link `decoration-teal-600`→`decoration-cyan-700` (31).
- `web/src/app/about/page.tsx` — 1 hit: eyebrow `text-teal-400`→`text-cyan-400` (16).
- `web/src/app/not-found.tsx` — 1 hit: link `decoration-teal-600`→`decoration-cyan-700` (15).

`layout.tsx` itself needs NO direct colour edit — it reads `niche.seo.theme_color` (fixed via `niche.config.json`) and serves OG from `siteConfig.publisherLogoUrl`.

Note on the `text-teal-700 → cyan-800` choice for on-light text links: the current `teal-700 #0f766e` on white is ~4.3:1. Moving on-light text links to `cyan-800 #155e75` (7.27:1) raises them comfortably to AAA. On-light non-text fills/borders/icon-tiles use `cyan-700` (the primary). Where `teal-700` was a background fill (stat band) it maps to `cyan-800` to keep the band visibly darker than the buttons.

---

## 7. Contrast table (verified, sRGB WCAG 2.x)

All ratios computed, not estimated. Key pairs:

| Pair | Ratio | Verdict |
|---|---|---|
| White on `cyan-700 #0e7490` (primary buttons, chip, tiles) | 5.36:1 | AA pass (normal text) |
| White on `cyan-800 #155e75` (hover, stat band) | 7.27:1 | AAA |
| White on `cyan-900 #164e63` (active, deep bands) | 9.11:1 | AAA |
| `cyan-700 #0e7490` on white (icons, borders, on-light primary) | 5.36:1 | AA pass |
| `cyan-800 #155e75` on white (prose + text links) | 7.27:1 | AAA |
| `cyan-700` on `cyan-50 #ecfeff` (whisper tint surfaces) | 5.15:1 | AA pass |
| `cyan-900` on `cyan-50` (success-box text) | 8.76:1 | AAA |
| Accent `amber-700 #b45309` on white (on-light emphasis/CTA text) | 5.02:1 | AA pass |
| Accent `amber-400 #fbbf24` on ink `#0a0a0a` (on-dark highlight) | 11.86:1 | AAA |
| Accent `amber-400` on `cyan-900 #164e63` (highlight on petrol band) | 5.46:1 | AA pass |
| Accent `amber-300 #fcd34d` on `cyan-900` (stat-band numbers) | 6.32:1 | AA pass |
| `cyan-400 #22d3ee` on ink (hero highlight text) | 10.96:1 | AAA |
| `cyan-400` on `neutral-900 #171717` (dark-section highlight) | 9.92:1 | AAA |
| `cyan-300 #67e8f9` on `neutral-900` (on-dark hover text) | 12.37:1 | AAA |
| `cyan-100 #cffafe` on `cyan-700` (on-band labels) | 4.79:1 | AA pass |
| `cyan-200 #a5f3fc` on `cyan-700` (band sub-labels, large) | 4.29:1 | AA-large pass |

Accent shades NOT to use as on-white text (fail or large-only — for reference so the implementer does not reach for them): `amber-500 #f59e0b` on white 2.15:1 (FAIL), `amber-600 #d97706` on white 3.19:1 (large only), `lime-600 #65a30d` on white 3.09:1 (large only). On-white amber TEXT must be `amber-700`. `amber-400`/`amber-300` are for DARK grounds only.

Every pair in the planned system passes its required level. The recolour is a net contrast IMPROVEMENT over the current teal (current white-on-`teal-600` is ~3.0:1, large-only; new white-on-`cyan-700` is 5.36:1, full AA).

---

## 8. Acceptance checks

Run after implementation. All must pass before deploy.

Contrast probe (automated):
- [ ] White-on-primary-button >= 4.5:1. Expect `cyan-700` = 5.36:1.
- [ ] All text links on white >= 4.5:1. Expect `cyan-800` = 7.27:1.
- [ ] Any amber TEXT on white uses `amber-700` only (>= 4.5:1); no `amber-400/500/600` text on white surfaces anywhere.
- [ ] On-dark highlight text (`cyan-400`, `amber-400`, `cyan-100/200/300`) >= 4.5:1 against its actual dark ground.
- [ ] Focus-ring colour visible on both light and dark surfaces (`cyan-700` outline).

Grep / completeness probe:
- [ ] Zero `teal-` fragments remain in `contractors-ir35/web/src/`: `grep -r "teal-" contractors-ir35/web/src` returns nothing.
- [ ] Zero `#0d9488`, `#0f766e`, `#f0fdfa` (old accent hexes) remain anywhere under `contractors-ir35/` including `niche.config.json`.
- [ ] `niche.config.json` `theme_color` and `primary_color` both `#0e7490`.
- [ ] No `emerald-` introduced (no accidental drift toward Property's family).

Visual pass (manual, light + dark sections):
- [ ] Homepage hero: highlight span and trust icon read petrol-cyan (or amber on icon if chosen), not green; gradient unchanged.
- [ ] Stat band: petrol-cyan ground, white figures legible; if amber numbers applied, they pop and pass contrast.
- [ ] Service cards: icon tiles and hover borders are petrol-cyan; no teal tinge.
- [ ] Contractor-types dark grid: hover tint `cyan-600/20`, text `cyan-300/400` legible on near-black.
- [ ] Mid-page editorial overlay and CTA gradient read deep petrol, not muddy teal.
- [ ] `.section-label` chip white-on-petrol on both dark heroes and light sections.
- [ ] Prose blog: h2 left-border, links, link-hover all petrol; links visibly AAA.
- [ ] Header active/hover nav, footer label/links, brand square mark, skip-link, lead form focus/checkbox/success box all petrol; success box tint not green.
- [ ] Mobile browser chrome (theme-color) is petrol, not teal.
- [ ] Side-by-side against Property (emerald) and against Caroola (soft teal): contractors reads as clearly cooler/deeper petrol with a warm amber spark — distinct from both.

---

## Typography: no change (collision check)

Checked all eight estate `layout.tsx` files. Font usage across the estate:
- Property, Dentists, Medical, Solicitors, Agency: **Plus Jakarta Sans** (Dentists/Medical/Solicitors add Cormorant Garamond display).
- Generalist: **Geist Sans + Geist Mono**.
- Contractors-ir35: **Geist Sans + Geist Mono** (current).

Contractors shares Geist only with Generalist, which sits in a completely different visual world (off-white + ink + orange design system) and a different niche. Geist is the modern, neutral, engineered-feeling typeface — exactly the "sharper, more digital" identity the brief calls for, and the most distinct choice from the Plus-Jakarta professional-services cohort. There is no collision that warrants a change, and a typeface swap would be neither trivial nor clearly better. KEEP Geist Sans + Geist Mono. Typography is explicitly out of scope per this finding.
