# V1 — phase 1 verification, pharmacies

Server: `http://localhost:3111` (`next start`). Title asserted first and matches
brief: "Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners".
No server start/stop, no build, no git changes, no subagents.

## Blockers (2)

| # | Check | Result |
|---|---|---|
| B1 | Skip-link focused ground (P1-C item 8) | **FAIL.** Rendered `a[href="#main"]:focus` background is `rgb(28,143,182)` (`primary-600`), not the declared `#0f3a4a` (`primary-950`). White-on-background = **3.71:1**, below the 4.5:1 text floor (link carries visible text "Skip to main content"). Cause: the kit's hardcoded `focus:bg-primary-600` Tailwind utility (`@layer utilities`) always outranks the site's own `a[href="#main"]:focus{background-color:var(--color-primary-950)}` rule in `@layer components` (`globals.css:217`) — Tailwind v4 cascade-layer order is base < components < utilities regardless of source order. Classic T30 (DESIGN_PORT_PLAYBOOK §15). P1-A's and P1-C's claimed 12.18 was never rendered-checked; it is the source value, not the painted one. |
| B2 | Grounds / dark-on-footer (`--grounds`, part of browser_check) | **REGRESSION vs baseline.** P0D baseline: 0 breaches, `darkOnDark:false` on every entry. Phase-1 build: **darkOnDark true on 17/35 routes** (`/services` + its 8 detail pages, `/for` + its 5 detail pages, both `/research/*`, `/about`) and **adjacentSame (white-on-white) on 5 routes** (`/services`, both `/research/*`, both long-tail `/blog/nhs-contract-and-income/*` articles). Cause: the footer is now `bg-slate-900` (`#0f172a`) and several pages' last content band before it is already dark (`primary-950` CTA band), so a genuinely dark band now runs straight into a genuinely dark footer — the exact shape the fixture's `/dark-on-dark` case exists to catch. |

## Twelve P1-C checks

| # | Check | Command / method | Result |
|---|---|---|---|
| 1 | CTA diff vs `cta_baseline.json` | `cta_snapshot.mjs` + per-route set diff, script | PASS — 0 unexpected deltas on 55/55 routes. Only permitted change present: `header_contact` `goal: null → "form"`, everywhere. |
| 2 | `main=1` on 7 routes | `curl \| grep -c "<main"` | PASS — all 7 report 1. |
| 3 | Skip link markup present on `/` | `curl -s / \| grep -c 'href="#main"'` | PASS — 1. |
| 4 | Embed route chrome-free | `curl -s /embed/pharmacy-purchase-affordability \| grep -o "<header\|<footer\|sticky_cta" \| wc -l` | PASS — 0. |
| 5 | `header_contact_mobile`/`header_mobile_menu` in shipped bundle | `grep -rl` over `.next/static/chunks/**` | PASS — both tokens present in `app/layout-7f7d27183595ad48.js`. |
| 6 | Every chrome href → 200 | `curl -o /dev/null -w "%{http_code}"` on all 11 named hrefs | PASS — 11/11 return 200 (`/calculators` included). |
| 7 | Link floor ≥ baseline, every route | `sweep.mjs` compare + script diff vs `sweep_baseline.json` | PASS — 52/55 routes rose, 3 unchanged (the five legal/contact pages + 8 `/services/*` tied at baseline's own floor — expected, per P0D), **0 drops**. 865 vs 813 total links. |
| 8 | Skip link focused ground | puppeteer-core script, `getComputedStyle` after `Tab` | **FAIL — see B1.** |
| 9 | Header CTA `display` at 390/768/1023/1024/1280 | same script | PASS, matches declared change: `header_contact` = `none` at 390/768/1023, `flex` at 1024/1280 (breakpoint moved `xl:`→`lg:`, declared). Contact nav link stays visible (`inline`/`block`) at every width, never `none` — matches declared item 2 (no `xl:hidden`, since no `ctaSecondary`). |
| 10 | `scrollWidth === clientWidth` at 390 on `/`, `/blog`, `/research/pharmacy-openings-closures-index` | same script | PASS — 390/390 on all three. |
| 11 | Body `fontFamily` | same script | PASS — `"Plus Jakarta Sans", "Plus Jakarta Sans Fallback"`. |
| 12 | Gate §9.1 rows (layout-utils, backdrop, kit-chrome-consumer) | static check | Backdrop mounted and rendering (`pharmacies-dispensary-shelving` pattern id present in served HTML, 1 hit); `PageShell.tsx` is now a kit `web-shared/design/chrome` consumer (row 2 off 0, confirmed by the mount itself). Not independently re-run as a numeric gate tally — descriptive only. |

## Built-CSS checks (P1-A handoff)

| Check | Result |
|---|---|
| Primary ramp present | PASS — `bg-primary-50` (7), `primary-950` (5), `text-primary-400` (1), `text-primary-600` (1) in built CSS. |
| `9999px` count | 8 (record only, per brief). |
| Four glow markers | PASS — `--brand-glow` (9), `-deep` (6), `-edge` (4), `-faint` (3), all present. |
| Brace-depth walk, built CSS, utf-8-sig, canonical script from `DESIGN_PORT_PLAYBOOK.md` §15 | 1,173 rules; 149 report `*** UNLAYERED ***`. All are either (a) `@font-face`/`@property` declarations — Next font-loader and Tailwind v4 engine output, not author selectors, or (b) selectors traced to `@import "@accounting-network/web-shared/design/globals-standard.css"` (`globals.css:37`) — the shared kit motion-layer file, not touched by P1-A and explicitly "none of it mounted" per its own receipt. **0 unlayered rules from pharmacies' own authored `globals.css`** (P1-A's source-file walk already showed this: 0 unlayered, two historical ones now layered). No new author-rule regression. |

## Baseline deltas (sweep / browser_check)

**Contrast failures below floor**: baseline 29 (confined to two `/research/*` chart-caption blocks); **phase 1: 0**. Fixed — improvement, not flagged further.

**Horizontal overflow**: baseline 0, phase 1 0 at every width (140/140 entries clean). No change.

**Missing `scroll-margin-top`**: baseline 8 (both `#ref-1`/`#ref-2` anchors, one blog route, all 4 widths); **phase 1: 0**. Fixed.

**SVG `<rect>` NaN render errors**: baseline 8 (`/research/pharmacy-openings-closures-index`, all widths); **phase 1: 0**. Fixed.

**Console/page noise, grouped by cause**:
- CSP frame-src (AdSense/DoubleClick): 140 baseline → **140 phase 1**. Unchanged, pre-existing, not a port defect.
- Navigation timeouts: 3 baseline (scattered, no repeat) → **11 phase 1** (scattered across 11 distinct route/width pairs, still no repeated pair). Higher count; still "record only" per P0D's own treatment — plausible local machine contention from concurrent instrument runs this session, not reproduced as a code defect. Worth an isolated rerun before R1 if the count holds.
- `csi.gstatic.com` telemetry ping: present in both, benign.

**Grounds**: see B2 above — the one real regression.

**h1 weight inconsistency (600 vs 700 at matching size)**: same pattern as baseline (`30px/36px/48px` both weights appear); unchanged, still "watch, not defect."

**CTA triples**: see check 1 above — exactly the one declared delta, nothing else.

**Link floor**: see check 7 — holds/rises everywhere, 0 drops.

## For R1

1. Fix B1: the author's skip-link focus rule needs to win over the kit's `focus:bg-primary-600` utility — move the rule into `@layer utilities` (or an equivalent higher-specificity, same-layer placement), not just `@layer components`. Re-verify the rendered ratio after, not just the source value.
2. Fix or accept-and-document B2: either give the footer a lighter immediate predecessor band on the 17 affected routes, or change the footer ground, or add a one-off divider/border at the dark-dark seam. This is new in phase 1, not inherited.
3. Re-run the 11 navigation timeouts in isolation (one route at a time, nothing else hitting the server) before trusting the count; if they reproduce 1:1 they are a defect, if they do not they are session contention.
4. Confirm whether the 149 built-CSS "unlayered" kit-motion-layer rules (hero-reveal, marquee, related-card, eyebrow-rule, tick-draw, data-glow) are deliberately unlayered estate-wide (likely, since P1-A explicitly mounts none of them) — not this port's problem to fix, but worth a one-line confirmation so a future phase doesn't "discover" it as new.

## Instrument-failure honesty check

No instrument failed. `browser_check.mjs` was moved to background by the Bash tool past 600s exactly as P0D predicted; polled via Monitor until its `--out` file existed, no second run started. Self-tests all passed (`slate500OnWhite=4.76`, `slate400OnWhite=2.56`; grounds discovery self-test; near-identical/dark-on-dark fixture pairs). `sweep.mjs` and `cta_snapshot.mjs` ran once each, clean, exit 0.
