# P1-8 — Adversarial fidelity review of phase 1 (contractors-ir35 design port)

**Date:** 2026-09-12
**Reviewer:** independent; built none of phase 1.
**Method:** rendered DOM only. Every claim below carries the command or the measurement that produced it.
**Mode:** read-only. No code, content or config changed. No git command that changes state. No build. No server started, restarted or killed.

---

## VERDICT: FAITHFUL-WITH-GAPS

**2 blocking, 2 major, 2 minor.** Phase 1 does not close on this build.

The kit is *genuinely* adopted, not reimplemented — I went looking specifically for silent
substitution and did not find it. Header, footer and breadcrumb are all thin wrappers over
`@accounting-network/web-shared/design/*`; the primary ramp has exactly one answer; the
analytics triples are byte-identical; no capture surface was added or removed; breadcrumb
JSON-LD survives on every route family. That is the bulk of the phase and it is sound.

It is not FAITHFUL because the phase's single headline claim — that the 640-767px
CTA-and-burger window is gone — is **false in the rendered DOM, and the window is now
wider than it was before the port**, and because a new horizontal-overflow regression at
390px shipped on three routes that were clean pre-port.

It is not DILUTED: nothing was quietly rebuilt locally while appearing to adopt the kit.

---

## 0. Instrument integrity

Asserted before trusting either server, per the standing rule:

```
curl -s http://localhost:3621/ | grep -o '<title>[^<]*</title>'
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
curl -s http://localhost:3611/ | grep -o '<title>[^<]*</title>'
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
```

Both are this site. Neither is a sibling. Re-asserted inside every browser run
(`p18.mjs` prints `TITLE:` on launch).

My contrast method self-tests against the two published anchors before any ratio below was
trusted, and refuses to report otherwise:

```
slate-500 #64748b on white = 4.7588  (required 4.76)
slate-400 #94a3b8 on white = 2.5640  (required 2.56)
```

Reproduced identically in both the Node path and the Python path.

**One instrument caveat that is itself a finding — see M1: the server on 3621 is STALE
relative to the working tree.** `.next/BUILD_ID` is 22:22; `BlogPostRenderer.tsx` was
modified at 22:33:51. Every finding below was checked against a file whose mtime predates
the build, *except* the TOC item, which is explicitly flagged.

---

## 1. The builders' seven claims, tested

### Claim 1 — kit header, footer and breadcrumb genuinely adopted, not reimplemented. **TRUE.**

| Surface | Evidence |
|---|---|
| Header | `src/components/layout/SiteHeader.tsx` is 41 lines, zero markup, imports `design/chrome/SiteHeader`. Rendered `<header>` is the kit's (`sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm`, `max-w-7xl`, kit wordmark lockup). |
| Footer | `SiteFooter.tsx` is 47 lines, zero markup, imports `design/chrome/SiteFooter`. Rendered footer is the kit's derived-column structure, not the old flat list. |
| Breadcrumb | 13 files import `design/primitives/Breadcrumb`; **0** still import `@/components/ui/Breadcrumb`; all 13 mounts pass `siteUrl` (checked multi-line, not by grep line). The 14th site, `blog/[category]/page.tsx`, now renders the kit's `BlogCategoryHub`, which emits its own breadcrumb. |

I checked and found no locally re-implemented chrome.

Two housekeeping notes, not defects:
- `src/components/ui/Breadcrumb.tsx` is now **dead** — its only remaining referrer is a
  `import type { BreadcrumbItem }` in `src/lib/schema.ts`. This is the same shape as the
  `ExitIntentModal` corpse the delta condemned and this port deleted. Worth the same
  treatment.
- P1-6 reports "14 files swapped" including `src/app/blog/[category]/page.tsx`. That file
  contains no `Breadcrumb` at all in the current tree; it was replaced wholesale by
  `BlogCategoryHub` (a much larger, phase-2-shaped change) by a different package. The
  outcome is correct; the receipt's file list is not.

---

### Claim 2 — nav, CTA, burger and drawer all at one breakpoint; the 640-767px window is gone. **FALSE. BLOCKING (B1).**

Measured with `getComputedStyle` + `getBoundingClientRect` on the rendered header at every
width the brief named, on both servers.

**Phase 1 build (3621), homepage:**

| Width | nav | **CTA** | burger | burger box |
|---|---|---|---|---|
| 390 | hidden | **VISIBLE 171x48 @ x=147** | visible | 48x48 |
| 640 | hidden | **VISIBLE 171x48 @ x=389** | visible | 48x48 |
| 700 | hidden | **VISIBLE 171x48 @ x=449** | visible | 48x48 |
| 767 | hidden | **VISIBLE 171x48 @ x=516** | visible | 48x48 |
| 768 | hidden | **VISIBLE 171x48 @ x=517** | visible | 48x48 |
| 1023 | hidden | **VISIBLE 171x48 @ x=772** | visible | 48x48 |
| 1024 | visible | visible | `display:none` | — |
| 1440 | visible | visible | `display:none` | — |

**Pre-port build (3611), same measurement:** CTA visible 148x48 at *every* width from 390
up; burger visible 390-767, `display:none` from 768.

So the true before-and-after is:

| | CTA-and-burger overlap window |
|---|---|
| Pre-port | **0-767px** |
| Phase 1 | **0-1023px** |

The port did not close the window. It **widened it by 256px**, because the burger moved
from `md:hidden` to `lg:hidden` while the CTA remained permanently visible.

`DESIGN_SYSTEM.md` §0.8 / §7a: "Below `lg:` the burger owns navigation. One navigation
system per breakpoint band, never two. The header is wordmark plus burger." What renders
below `lg:` is wordmark **plus a 171px button** plus burger.

**§0.8's wordmark rule is also breached, and visibly.** At 390px the wordmark is squeezed
to **118.97px wide and 62px tall** (it wraps), against 337px wide and 38px tall at 640px.
`DESIGN_SYSTEM.md` §0.8: "Nothing in the header bar may overlap or crowd the wordmark...
it never gets squeezed, clipped or overlapped by a CTA, a nav item or a burger."

**Root cause — a class collision, not a breakpoint mistake.** The classes P1-2 reports are
all present and correct; they never fire.

```
packages/web-shared/design/chrome/SiteHeader.tsx:473
  className={`${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`}

packages/web-shared/design/layout-utils.ts:30
  export const btnPrimary = "inline-flex min-h-12 min-w-[10rem] ..."
```

`btnPrimary` opens with `inline-flex`. The element therefore carries both `inline-flex` and
`hidden`, two unmodified, equal-specificity utilities. The cascade resolves on stylesheet
order, and in the served CSS:

```
.hidden{display:none}          at byte 14874
.inline-flex{display:inline-flex}  at byte 14953
```

`.inline-flex` wins. `hidden` is a dead no-op and `lg:inline-flex` is redundant. Confirmed
via CDP `CSS.getMatchedStylesForNode` at 700px:

```
RULE: .hidden       => ["none","none"]
RULE: .inline-flex  => ["inline-flex","inline-flex"]
COMPUTED display: flex
```

(`flex` rather than `inline-flex` because the element is a child of a flex container, which
blockifies inline-level children. Immaterial — both are visible.)

**What the standard says vs what renders:** §7a's table says 0-1023 carries "wordmark +
burger"; 0-1023 renders wordmark + CTA + burger.

**Where the fix belongs:** `packages/web-shared`, not this site. The right shape is for the
kit header to strip the leading `display` utility out of `btnPrimary` for this call site, or
to use `hidden lg:inline-flex` on a wrapper rather than on the button itself.

**A warning the coordinator should act on separately, and which I did NOT verify:**
`Property/web/src/components/layout/SiteHeader.tsx:310` composes the identical string
against a local `btnPrimary` that also opens with `inline-flex`. If that reproduces, the
§7a "the CTA is now `lg:inline-flex`" fix recorded on 2026-08-23 never actually took effect
on Property either, and the estate has been carrying this since. **UNVERIFIED — I did not
measure Property's rendered DOM** (no server, and building one is outside this package).

**Everything else in the header contract passes.** Burger is `h-12 w-12` (measured 48x48,
up from the pre-port 44x44) with `touch-manipulation` and `rounded-xl`; nav is `lg:flex`;
drawer overlay is `lg:hidden`; nav has `min-w-0`, the CTA/burger group has `shrink-0`; the
drawer's last element is the primary CTA (`header_book_mobile`, measured at 390). Nav
renders exactly the same five destinations as pre-port, no more, no fewer.

---

### Claim 3 — the primary ramp's 600 step is bound to cyan-700 consistently. **TRUE.**

Checked what computes, not what the CSS says.

Served stylesheet (`/_next/static/css/61e256408a55e1ea.css`), **one definition each, no
duplicates, no second answer:**

```
--color-primary-50 :#ecfeff   --color-primary-500:#0891b2   (cyan-600)
--color-primary-100:#cffafe   --color-primary-600:#0e7490   (cyan-700)  <- the brand hex
--color-primary-200:#a5f3fc   --color-primary-700:#155e75   (cyan-800)
--color-primary-400:#22d3ee   --color-primary-800:#164e63   (cyan-900)
                              --color-primary-900:#083344   (cyan-950)
```

`grep -oE '\-\-color-primary-[0-9]+:' | sort | uniq -c` returns **1** for every step. One
stylesheet, one answer.

Hand-computed, self-tested against both anchors first:

| | ratio | floor | verdict |
|---|---|---|---|
| white on `primary-600` `#0e7490` (button ground) | **5.36** | 4.5 | PASS |
| `#0e7490` as text on white | **5.36** | 4.5 | PASS |
| cyan-600 `#0891b2` on white (the step this replaces) | 3.68 | 4.5 | would FAIL |

Rendered CTA ground resolves through `bg-[var(--btn-ground,var(--color-primary-600))]`;
`--btn-ground` is set nowhere on this site, so the fallback is taken and the ground is
`#0e7490`. Measured on the painted pixel: **5.36**. The wordmark icon and rule carry an
inline `style="color:#0e7490"` / `background-color:#0e7490` from the explicit
`wordmarkAccentColor`, so wordmark and CTA are the same cyan — the Solicitors defect is not
repeated here.

Two things I checked and found clean:
- `--color-primary-300` is not defined. No `primary-300` utility appears anywhere in the
  served CSS or HTML, so nothing paints nothing. Not a defect.
- `.focus-visible\:outline-primary-600:focus-visible{outline-color:var(--color-primary-600)}`
  **does** exist in the served CSS. I initially suspected the kit's focus ring was a no-op
  because Tailwind had not scanned the workspace package; it had. Negative evidence.

---

### Claim 4 — ConsentToggle still renders and still works. **TRUE.**

It is load-bearing (the cookie policy names it as the opt-out route), so I exercised it
rather than looking at it.

Rendered in the footer on every page as
`<button type="button">Do not track me</button>`. Driven in a real browser:

| step | button label | `localStorage` |
|---|---|---|
| initial | `Do not track me` | no `cfp_consent` key |
| after 1 click | `Enable analytics` | `cfp_consent: "denied"` |
| after 2 clicks | `Do not track me` | `cfp_consent: "granted"` |

Writes the key the SDK reads, both directions, and the label tracks state. The compliance
page's claim is true.

Note the kit footer *replaces* the local component by slot rather than by reimplementation:
`SiteFooter.tsx` passes `consentToggle={<ConsentToggle .../>}` and the site's own
`analytics/ConsentToggle.tsx` is still the thing doing the work. That is the correct
adoption shape and I confirmed the kit does not carry a rival implementation.

---

### Claim 5 — the sticky CTA's three tracked attributes are byte-identical to pre-port. **TRUE.**

Diffed the *rendered triples*, not the counts, on five routes, after scrolling to 60% so the
client-rendered bar mounts:

```
3621:  {"cta":"sticky_cta","placement":"sticky","goal":"form","href":"/contact"}
3611:  {"cta":"sticky_cta","placement":"sticky","goal":"form","href":"/contact"}
```

Identical on `/`, `/blog`, `/services`, `/calculators`, `/ir35-status`. Source confirms the
same: `src/components/ui/StickyCTA.tsx:171-173` against `18b4f25f:...:159-161`, character
for character including the conditional `data-cta-goal`.

`specialist_widget` is likewise unchanged (carries `data-cta` only, no placement or goal, on
both builds).

The only new triple anywhere is the header's, which is expected and documented:
`header_book` / `header` / `contact`, plus `header_book_mobile` / `header_mobile` /
`contact` in the drawer. Pre-port the site had zero `data-cta-goal` attributes, so this is a
new series, not a renamed one — nothing to regress.

---

### Claim 6 — the four global capture-surface mounts are unchanged in identity and count. **TRUE.**

`PageShell.tsx`, diffed against `18b4f25f`, mounts the same four at the same lines —
`SiteHeader` (20), `SiteFooter` (24), `StickyCTA` (25), `SpecialistWidget` (26). The entire
diff of that file is one class:

```
- 21:      <main id="main" className="flex-1">
+ 21:      <main id="main" className="flex-1 scroll-mt-24">
```

The two root-layout surfaces (`ReturningBar`, `DeepScrollModal`) are unchanged in identity
and order; only the line numbers shift by two. Rendered DOM on `/` confirms exactly one
`<header>`, one `<footer>`, one `<main id="main">` (computed `scroll-margin-top: 96px`), one
`specialist_widget`, one `sticky_cta`.

The deleted `blog/ExitIntentModal.tsx` had **0** importers and **0** JSX mounts before
deletion, re-verified. Nothing reachable was removed. No interruptive surface was added.

---

### Claim 7 — the breadcrumb swap did not drop BreadcrumbList JSON-LD on any of its 14 sites. **TRUE.**

Every route family, both builds, `curl -L`:

| route | new | old |
|---|---|---|
| `/blog` | 1 | 1 |
| `/blog/ir35-status` (category) | 1 | 1 |
| `/blog/<cat>/<slug>` (3 sampled) | 2 | 2 |
| `/calculators` | 1 | 1 |
| `/calculators/outside-ir35-take-home-calculator` | 1 | 1 |
| `/embed` | 2 | 2 |
| `/glossary` | 1 | 1 |
| `/glossary/ir35` | 2 | 2 |
| `/locations` | 1 | 1 |
| `/locations/london` | 1 | 1 |
| `/research` | 1 | 1 |
| `/research/uk-contractor-index` | 1 | 1 |
| `/research/uk-contractor-insolvency-index` | 1 | 1 |
| `/research/uk-contractor-survival-index` | 1 | 1 |

I also diffed the **JSON-LD payloads**, not just the counts. Byte-identical on every route
checked — same `@context`, same `itemListElement`, same positions, same names, same absolute
`item` URLs. Only the surrounding presentational classes changed (`text-white/70` ->
`text-slate-300`, plus the kit's `inline-block py-0.5` hit-area fix for WCAG 2.5.8, which is
an improvement).

---

## 2. The additional checks

### 2.1 Horizontal overflow at 390px — **1 template family fails. BLOCKING (B2). NEW REGRESSION.**

23 templates swept at 390x844, one representative per route shape plus every standalone
page. 22 clean. The three research index pages overflow:

| route | 3621 (phase 1) | 3611 (pre-port) |
|---|---|---|
| `/research/uk-contractor-index` | **+227px** | 0 |
| `/research/uk-contractor-insolvency-index` | **+213px** | 0 |
| `/research/uk-contractor-survival-index` | **+291px** | 0 |
| `/research` (hub) | 0 | 0 |
| all other 22 templates | 0 | 0 |

The standard is zero. This is a regression introduced by the build under review.

**Cause:** `src/components/research/ChartDataTable.tsx:23` renders
`<table className="sr-only">`. `sr-only` sets `width:1px`, but on a `display:table` element
the CSS table layout algorithm treats a specified width as a *minimum* and expands to
content. The tables' computed widths in the rendered DOM:

```
/research/uk-contractor-index                396.41px, 419.97px, 585.16px
/research/uk-contractor-insolvency-index     405.50px, 571.44px, 531.34px
/research/uk-contractor-survival-index       649.17px, 455.59px
```

Eight tables, all `position:absolute`, all far wider than the 390px viewport.

**Fix:** move the class to a wrapper — `<div className="sr-only"><table>…</table></div>` —
which is the standard workaround and leaves the accessible content untouched.

This arrived with the phase-0 F6 chart-a11y fix that `DESIGN_DELTA.md` §6 H3 says the port
inherits. It is inside the build being reviewed, so it is phase 1's to clear.

### 2.2 Internal link floor — **no route lost a link. PASS.**

Swept all 157 baseline routes on both servers and compared the set of unique internal hrefs
per route. My method reproduces the baseline exactly, which validates it:

```
sum of unique internal links, pre-port = 2755
sweep_baseline.json totalLinks         = 2755   (exact match)
sum of unique internal links, phase 1  = 3260   (+505)
routes losing a unique internal link   = 1
```

The single "loss" is a repair, not a regression: `/glossary/ir35` no longer links
`/blog/ir35-basics`, which **404s on both servers**. It was replaced with
`/blog/ir35-status/what-is-ir35`, which is live. Verified in the diff of
`app/glossary/[slug]/data.ts`.

### 2.3 Chrome links to routes that do not exist — **none. PASS.**

Every distinct href emitted by the header and footer, resolved with `curl -L`:

```
/ 200   /about 200   /blog 200   /book 200   /calculators 200   /contact 200
/cookie-policy 200   /for 200   /ir35-status 200   /locations 200
/privacy-policy 200   /services 200   /terms 200
```

All 200. The footer newly emits `/`, `/book`, `/calculators`, `/locations` (from the kit's
`DEFAULT_COMPANY_ITEMS` and derived columns) and all four resolve on this site. `/resources`
404s but nothing in the chrome links to it.

`curl -L` was used throughout, so no redirecting family returned a stub body and faked an
absent component.

### 2.4 Contrast — **no new failure I can substantiate. PASS.**

2,300 text elements across 23 routes, measured against the **real painted pixel** (full-page
screenshot rasterised and sampled, which resolves gradients, photographs, `oklch()` and
`var()` chains that a parser cannot). Failure signatures diffed between the two builds.

Seven failure *pairs* appear on 3621 and not on 3611. I chased all seven. **None is a real
regression:**

| signature | verdict |
|---|---|
| `rgb(0,0,0)` on slate-900, 1.18, x21 routes | **Artefact of my method.** The element is the builder credit, whose computed `color` is `rgba(0,0,0,0)` (`text-transparent` + `bg-clip-text`); painting that string yields black. Hand-computed the real gradient stops on slate-900: indigo-400 `#818cf8` = **5.98**, orange-400 `#fb923c` = **7.89**. Both PASS. |
| `rgb(23,23,23)` on slate-900, 1.01 | **Not reproducible.** No element on that route computes that colour against that ground on direct DOM inspection. Sampler artefact. |
| `rgb(23,23,23)` on cyan-700, 3.35, `/calculators` h3 | **Artefact.** Direct inspection: those h3s are neutral-900 on a **white** card (`bg-white`, ~16:1). The mode pixel under the box was a decorative strip. |
| `rgb(115,115,115)` on slate-900, 3.76 | Same neutral-500 fine print that measures 3.78 on the pre-port build's neutral-900 ground. Pre-existing, ground merely changed hue. |
| `rgb(202,213,226)` on 63-69,107-139, 3.62-3.86, x3 | Breadcrumb links on the **photographic** blog hero. Sample share 0.03-0.07, i.e. a busy background where the mode pixel is not meaningful. Hand-composited, `text-white/70` (old) and `text-slate-300` (new) land within ~6 units of each other on that ground — the change is neutral. Both builds are below 4.5 in that region. This is the pre-existing hazard of text on hot-linked photography that `DESIGN_DELTA.md` §3 N4 already proposes removing. |

The footer, which is entirely new markup on every page, was hand-computed in full and passes
everywhere:

| footer role | colour | on slate-900 | verdict |
|---|---|---|---|
| column links, description | slate-300 `#cbd5e1` | **12.02** | PASS |
| legal row, registered office, copyright, consent toggle (12px) | slate-400 `#94a3b8` | **6.96** | PASS |
| column headings | cyan-400 `#22d3ee` | **9.88** | PASS |
| wordmark | white | **17.85** | PASS |

§0.7's "slate-500 on light grounds, never slate-400" is about light grounds; slate-400 on
navy at 6.96 is compliant.

### 2.5 The known instrument blind spot — **I agree with the conclusion, but the stated mechanism is wrong.**

The brief says `browser_check.mjs` reports the homepage hero h2 at 1.00 and a paragraph at
1.12, that these are false, and that the cause is text sitting on "stacked near-opaque
overlays (neutral-950/97, neutral-950/90, cyan-900/82) over a photograph, which the tool
cannot resolve, so it falls back to white."

**Agreed that the failures are false.** Measured against the real painted pixel, the hero
text passes comfortably:

```
hero paragraph  fg rgb(212,212,212) on bg rgb(26,26,26)  = 11.74
hero fine print fg rgb(161,161,161) on bg rgb(18,17,16)  =  7.30
hero CTA label  white on rgb(0,117,149)                  =  5.28
```

**But the overlay stack described does not exist on this build.** Enumerated in the DOM,
the homepage hero has exactly **one** overlay child, not three, and no cyan layer at all:

```
<div class="absolute inset-0 bg-gradient-to-r
     from-neutral-950/97 via-neutral-950/90 to-neutral-900/60">
```

Composited arithmetically over the worst possible photograph pixel (pure white) at the
90%-opacity end where the copy sits: `0.90*10 + 0.10*255 = 34.5` -> white text at **15.8:1**.
The photograph is essentially irrelevant to the result, which is the real reason the tool's
answer is safe to discard.

So: the reasoning holds, the layer list does not. A reviewer who trusts the stated stack
would be describing a hero this build does not have.

### 2.6 The known real defect — confirmed, and **wider than logged.**

`/blog` read-time metadata, neutral-400 `rgb(161,161,161)` on cream, **2.47**. Confirmed,
not re-reported as new.

**Scope correction, because the logged item names only `/blog` read-time:** the identical
colour fails on four further routes, in components that are not read-time metadata, and
identically on both builds (so pre-existing, not phase 1's doing):

```
2.47  14px  /blog/ir35-status              <span> "13 min read"
2.48  14px  /for                           <p>    "Finance contractors (interim FDs, CFOs, ..."
2.48  12px  /for/it-contractors            <p>    "Composite snapshot based on client patte..."
2.58  12px  /research                      <p>    "Updated Apr 2026"
```

Hand-computed: neutral-400 `#a3a3a3` = **2.52** on white, **2.41** on cream `#fafaf7`.

This matters because **P1-1's audit of this hazard checked the wrong thing.** It reports
`--ink-whisper` has "zero call sites anywhere in the codebase" and concludes "no illegal
2.38:1 text colour is currently rendered by this token." Literally true about the *token*,
and false about the *colour*: the same grey is live as the `text-neutral-400` utility on
five routes. The audit searched the token name, not the value. Recorded as m2 below.

---

## 3. The coordinator's two mid-task items

The coordinator's message addressed me as the holder of the `BlogPostRenderer.tsx` lease.
**I do not hold that lease** — P1-8 is the read-only fidelity review — so I made no edit. I
verified both items instead and record them here, which is the only action available to me.

### ITEM 1 — nested sticky containers in the article sidebar. **CONFIRMED IN THE SERVED BUILD. MAJOR (M1).**

Measured at 1440x900 on a 14,982px article, scrolled to 6,000px:

```
outer  class="sticky top-24"                     max-height: none    overflow-y: visible
inner  class="hidden lg:block rounded-lg ..."    max-height: 772px   overflow-y: auto
scroll containers in that column: 2
```

`772px` is `calc(100vh - 8rem)` at a 900px viewport — the `TableOfContents` component's own
clamp, i.e. `stickyDesktop` is defaulting to `true`. This is exactly the first bad
arrangement the coordinator described: a sticky wrapper with no clamp around a component
that clamps itself, two scroll containers, inner sticky anchored to the wrapper.

**But the source on disk is already correct**, and is not what the server is running:

```
BlogPostRenderer.tsx:476-479
  <aside className="hidden lg:block">
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
      <TableOfContents headings={headings} stickyDesktop={false} />
    </div>
  </aside>
```

One clamp, on the direct child of the tall column, inner clamp off. That is the arrangement
the coordinator prescribed, and `calc(100vh-7rem)` at 900px = 788px, giving top 96 /
bottom 884 — the exact passing read they specified.

**So the item is fixed in source and unfixed in the build.** `.next/BUILD_ID` is timestamped
22:22; `BlogPostRenderer.tsx` has mtime **22:33:51**, eleven minutes later.

**This is the finding that matters most beyond the item itself: the server at 3621 does not
serve the current working tree.** Phase 1 cannot be certified from it. Everything else in
this review was checked against files whose mtimes predate 22:22 (`globals.css` 22:19,
`SiteHeader.tsx` 22:10, `ChartDataTable.tsx` 22:01), so those findings stand; the TOC
arrangement is **UNVERIFIED in a rendered DOM** and needs re-measuring on a fresh build
before phase 1 closes.

### ITEM 2 — contents jump targets carry no scroll-margin. **CONFIRMED.** MAJOR (M2).

Measured `getComputedStyle(el).scrollMarginTop` on every in-page anchor target of a real
article:

```
#main                                                      MAIN  96px   (correct)
#the-penalty-regime-a-contractor-is-actually-signing-up-to  H2    0px
#first-question-is-a-contractor-in-scope-at-all             H2    0px
#what-changes-for-a-limited-company-contractor-...          H2    0px
#the-sole-trader-contractor-software-only-or-an-accountant  H2    0px
#sizing-the-quarterly-workload-honestly-for-a-contractor    H2    0px
#what-a-contractor-accountant-does-that-software-cannot     H2    0px
#a-decision-framework-for-contractors                       H2    0px
```

7 of 7 heading targets at `0px` under a `sticky` header that is 96px of offset. Every
contents click hides its own heading. The ids come from `addHeadingIds()` in
`src/lib/markdown-utils.ts`, outside both that package's lease and mine.

**Confirming the coordinator's record correction:** `P0D_CSS_A11Y.md`'s "0 of 6 anchor route
families carry offsets" is stale. `#main` now computes 96px. I did not independently audit
all six families, so I can confirm the figure is no longer 0 but not that it is exactly 4.

---

## 4. Gap register

| # | Sev | Finding | File / line | Standard | What renders |
|---|---|---|---|---|---|
| **B1** | **BLOCKING** | Header CTA never hides at any width; CTA-and-burger overlap widened from 0-767px to 0-1023px; wordmark squeezed to 119x62 at 390px | `packages/web-shared/design/chrome/SiteHeader.tsx:473` + `packages/web-shared/design/layout-utils.ts:30` | §7a: below `lg:` the bar carries wordmark + burger, one nav system per band; §0.8: nothing crowds the wordmark | wordmark + 171x48 CTA + 48px burger at 390, 640, 700, 767, 768, 1023. `.hidden` loses the cascade to `btnPrimary`'s leading `inline-flex` |
| **B2** | **BLOCKING** | Horizontal overflow at 390px on all three research index routes (+227 / +213 / +291px); pre-port was 0 on all three | `contractors-ir35/web/src/components/research/ChartDataTable.tsx:23` | §0.8: zero horizontal overflow at 390 | `<table className="sr-only">` computes 396-649px wide; table layout treats `width:1px` as a minimum |
| **M1** | Major | Served build is 11 minutes older than the working tree, so the phase cannot be certified from it; in the served build the article TOC ships the two-clamp / two-scroll-container arrangement | `.next/BUILD_ID` 22:22 vs `BlogPostRenderer.tsx` mtime 22:33:51 | one clamp on the direct child, inner clamp off | served: outer `max-height:none`, inner `max-height:772px`, 2 scroll containers. Source is already correct; needs a rebuild to verify |
| **M2** | Major | Article heading jump targets carry `scroll-margin-top: 0px` under a 96px sticky header | ids stamped by `src/lib/markdown-utils.ts` | §7 / §0.5: jump targets clear the sticky header | 7 of 7 h2 targets at 0px; every contents click hides its heading |
| **m1** | Minor | `SiteFooter.tsx` comment and the P1-3 receipt both assert the exact opposite of what ships and of what the phase plan instructs | `contractors-ir35/web/src/components/layout/SiteFooter.tsx:7-13`; `P1-3_FOOTER.md` lines 11-14 and verification step 5 | `PHASE_PLAN.md` §B.3: "`SiteFooter.showBuilderCredit`: pass nothing. Default is `true` and the 2026-09-11 owner ruling made the credit estate-wide" | The credit **does** render, on all 21 routes checked — which is correct. But the comment says it was omitted *so that it would not render*, and P1-3's step 5 says "expect NO match". Anyone running that check will conclude the build is broken and pass `false`, deleting an owner-ruled estate-wide credit |
| **m2** | Minor | P1-1's `--ink-whisper` audit searched the token name, not the colour; the 2.4:1 grey is live via `text-neutral-400` on five routes | `P1-1_TOKENS.md` "0 call sites"; renders on `/blog`, `/blog/ir35-status`, `/for`, `/for/it-contractors`, `/research` | §0.7: 4.5:1 for all text including 11px fine print | 2.41-2.58 measured. Pre-existing on both builds, so not a phase-1 regression — but the already-logged phase-2 item names only `/blog` read-time and is therefore scoped too narrowly |

Housekeeping, no severity: `src/components/ui/Breadcrumb.tsx` is now dead (only a
`import type` referrer in `src/lib/schema.ts`); P1-6's file list names
`blog/[category]/page.tsx` as a breadcrumb swap when that file now renders `BlogCategoryHub`
instead.

---

## 5. What I checked and found nothing wrong

Stated explicitly so it is distinguishable from what I did not check.

- Kit adoption of header, footer and breadcrumb — real, not reimplemented. No local chrome markup survives.
- Primary ramp: one definition per step, `primary-600` = cyan-700 `#0e7490`, 5.36:1 in both roles, wordmark and CTA the same cyan.
- `primary-300` undefined but also unused; `outline-primary-600` utility is generated and resolves.
- ConsentToggle: renders, toggles both ways, writes `cfp_consent` denied/granted.
- Sticky CTA triples: byte-identical across five routes and in source.
- `specialist_widget` triple: unchanged.
- Capture surfaces: same four in `PageShell` at the same lines, same two in root layout, zero added, zero reachable removed.
- `ExitIntentModal` deletion: 0 importers, 0 mounts before removal.
- BreadcrumbList JSON-LD: present on all 14 route families, payloads byte-identical to pre-port.
- Internal link floor: +505 unique links, one route "lost" a link that was a 404 on both builds and is now a live URL.
- Chrome link targets: all 13 resolve 200.
- Horizontal overflow at 390: 22 of 23 templates clean.
- Footer contrast: all four roles hand-computed on slate-900, 6.96 to 17.85, all pass.
- Builder-credit gradient text on navy: 5.98 and 7.89, passes.
- Hero contrast: passes at 5.28 to 11.74 against real painted pixels.
- Nav destinations: identical five, no route family newly exposed or hidden in the header.
- Burger: raised from 44x44 to the contract's 48x48, `rounded-xl`, `touch-manipulation`.
- Drawer ends in the primary CTA (`header_book_mobile`), measured at 390.
- `#main` scroll offset: computes 96px.

## 6. What I did NOT check

- **Property's rendered header.** The B1 class collision exists identically in
  `Property/web/src/components/layout/SiteHeader.tsx:310` against a local `btnPrimary` that
  also opens with `inline-flex`. Whether it reproduces there is **unverified** — it needs
  its own server and that is outside this package.
- **The other sibling ports.** Not measured, not inferred.
- **A rebuilt phase 1 server.** Building is forbidden here, so the TOC arrangement, and
  anything else touched after 22:22, is unverified in a rendered DOM.
- **Whether exactly four of six anchor route families now carry offsets.** I confirmed
  `#main` does and that article headings do not; I did not enumerate all six.
- Section grounds (§9), heading typography, motion gating, the ten capture surfaces'
  restyle state against `DESIGN_DELTA.md` §5a, and the `var()`-themed 13 files. All outside
  the seven claims and the named additional checks.

---

## 7. Corrections to this brief

Per the pushback clause. Source beat the brief in four places.

1. **The hero overlay stack is wrong.** The brief describes three stacked overlays
   (`neutral-950/97`, `neutral-950/90`, `cyan-900/82`). The homepage hero has **one**
   gradient child, `bg-gradient-to-r from-neutral-950/97 via-neutral-950/90
   to-neutral-900/60`, and no cyan layer at all. The conclusion the brief draws from it is
   nonetheless correct (§2.5).
2. **`link_baseline.json` does not exist for this site.** The baseline is
   `docs/contractors-ir35/_port/sweep_baseline.json`. `link_baseline.json` exists for
   construction-cis, generalist and medical. The substantive point in the brief was right
   anyway — that file stores counts only — so I diffed the rendered triples, and separately
   confirmed my link-sweep method reproduces its 2755 exactly before trusting it.
3. **"The 640-767px window where CTA and burger both rendered" understates the pre-port
   defect.** It was 0-767px: the pre-port CTA was visible at 390 too, because the same
   `inline-flex` / `sm:inline-flex` collision defeated its hide as well. `P0D_CSS_A11Y.md`
   and `DESIGN_DELTA.md` §6 H1 both describe it as a ~128px window, which is what the class
   names imply and not what the browser does.
4. **Claim 7 says "14 sites" and P1-6 says 14 files.** There are 13 direct kit-breadcrumb
   call sites; the 14th route family gets its breadcrumb from `BlogCategoryHub`. JSON-LD
   coverage is 14 route families, so the claim as tested holds.

Also, for the coordinator: your mid-task message assigned me the `BlogPostRenderer.tsx`
lease. That is not this package — P1-8 is read-only. I verified both items rather than
editing, and item 1 turns out to be already fixed in source and only live in the stale
build (§3).

---

## 8. Recommended disposition

**Cross-reference, found after this review's measurements were complete:** a parallel
package has independently reproduced B2 and M2 and is writing
`docs/contractors-ir35/_port/F9_OVERFLOW_ANCHORS.md`. Its measurement of
`/research/uk-contractor-index` (`scrollWidth 617, clientWidth 390`, `table.sr-only
right=428`) agrees with mine exactly. Two instruments, two agents, same numbers. **Do not
double-fix those two;** B1 and M1 are not covered by it.

Both blocking items are small, mechanical and low-risk:

- **B1** is a web-shared change (strip the leading `display` utility from the header call
  site, or move `hidden lg:inline-flex` onto a wrapper). It touches every consuming site, so
  it wants its own package and a re-measure at 390/640/700/768/1023/1024 on this site *and*
  on Property.
- **B2** is one line in `ChartDataTable.tsx` — wrap the table in an `sr-only` div.

M1 needs a serialised rebuild and a re-run of the §3 measurement. M2 needs a `lib/` package
the coordinator sequences. m1 and m2 are documentation corrections.

Re-review after the gap-fix package should re-run only §1 claim 2, §2.1 and §3 — the rest of
this review's evidence is unaffected by those fixes.
