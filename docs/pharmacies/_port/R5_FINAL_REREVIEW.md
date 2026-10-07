# R5 — final re-review of the pharmacies port, after the round-2 fixes

Read-only on the site. This file is the only thing written. No git command, no
build, no server start or stop, no subagent.

**Build under test.** `curl -s http://localhost:3111/` returns 200 with
`<title>Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners</title>`;
`pharmacies/web/.next/BUILD_ID` = `801zguJK8uYBM7SWcRtcN`, as briefed. The
built CSS carries G5's `:not(a):not(button)` scope and its `a:focus-visible`
element rule (`.next/static/css/77834cf94edcda99.css`), so the round-2 fixes are
in the artefact I measured, not only in the tree.

**Instruments**, all in `…/scratchpad/r5/`: `probe.mjs` (bands and grounds, full
text-contrast sweep, overflow, JSON-LD, `data-cta` census, counts),
`ringsettle.mjs` (focus-ring walk), `walk.mjs` (W7C's 7 steps at 1440),
`sticky390.mjs`, `sess.mjs`, `embed.mjs`, `misc.mjs`, `shots.mjs` — with
`p1440b.json`, `p390.json`, `rings.json` and 9 full-page 1440 screenshots.

**Colour resolver, self-tested on four pairs before anything was quoted** (the
trap R4 declared). Canvas path: `clearRect` with **no opaque base fill**,
un-premultiplied `getImageData`, alpha folded by an explicit `over()`. Measured
on every launch, identical every run:

```
slate-500/white 4.76   slate-400/white 2.56
oklch(0.208 0.042 265.755) -> [15,23,43], white on it 17.83
oklch(0.985 0.001 106.423) -> luminance 0.955 (the near-white stone that the
                              naive parser scored DARK)
```

`unparsed = 0` on all 30 page-measurements. Nothing below comes from a run whose
self-test did not pass.

**Instrument incident, declared.** My first ring scan read `outline-color`
immediately after `el.focus()` and reported **six rings at ratio 1.00 per route**
— including the exact four R4 named. That is **an artefact, not a finding**:
every one of those controls carries Tailwind's `transition-colors`, whose
property list **includes `outline-color`**, so an immediate read catches the
start of a 150ms transition from `currentcolor`, not the settled ring. Proved
three ways before I discarded it: `getComputedStyle(el).getPropertyValue
("--focus-ring")` on the R4 elements returns `#fff`; a probe span appended inside
the same element resolves `outline-color: var(--focus-ring)` to
`rgb(255,255,255)`; and `CSS.getMatchedStylesForNode` over CDP shows **no rule
matching those elements that can produce navy** — only
`a:focus-visible{outline:2px solid var(--focus-ring)}` (layer `components`) and
`.focus-visible\:outline-\[var\(--focus-ring\)\]` (layer `utilities`), both
white there. `ringsettle.mjs` waits 320ms per control before reading. **Every
ring ratio below is from the settled read. R4's own 1.00 figures are very likely
the same artefact, which is why N2 closes on measurement rather than on faith in
the fix.**

---

## 1. FINDINGS, ranked

| # | sev | route(s) | measured evidence | minimal fix |
|---|---|---|---|---|
| **R5-1** | **serious** | all 22 blog posts, ≥1024 only | **New, and no prior review caught it.** The in-article sidebar CTA "Get in touch" paints **white 16px bold on `rgb(28,143,182)` = 3.71**, against the 4.5 floor (16px bold is below the 18.66px large-text threshold). It is the kit `BlogSidebarCta` default `bg-primary-600 text-white` (`packages/web-shared/design/blog/BlogSidebarCta.tsx:69-71`) and this site's `primary-600` is `#1c8fb6` — light. The call site (`blog/[category]/[slug]/page.tsx:181-184`) passes `copy` and `buttonLabel` but **not `buttonClassName`**, so the default stands. `grep -c blog_sidebar_book` = 2 on every post sampled, so it is template-wide. Invisible to R4 because the card is `hidden lg:block` and the sweep's sub-floor list at 390 is empty. | One prop at the call site: `buttonClassName="bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]"` — the brand-950 trio already declared in `globals.css`, white on it **12.18**. No copy, no link, no new token. |
| **R5-2** | minor | 35 routes | **m4, STILL OPEN.** `confirm where you stand</p>` with no terminal stop, measured live on `/services/pharmacy-sale-cgt-badr`, `/for/buying-a-pharmacy` and the post template. `src/lib/intent/widget-config.ts:106`; G5 declared it outside its lease. | Add `.` |
| **R5-3** | minor | 8 `/services/*` + 5 `/for/*` | **N3, STILL OPEN.** `adjacentSame = 1` at **both** 390 and 1440 on all 13 detail routes: band 5 (FAQ, white) is followed by the bare `mx-auto w-full max-w-6xl px-4 … min-w-0` div — the `NextStepOffer` mount, no `<section>`, no ground, also white. Every other route on the site measures 0. | Wrap the mount in `<section className="bg-slate-50 py-12">`, an already-measured ground on those routes. |
| **R5-4** | minor | receipts | **N4, STILL OPEN.** `STATE.md:251-259` still lists `DrawnTickList`, `WhatToExpectCard` and `CardStack` as adopted. `grep -rhoE '<(DrawnTickList\|WhatToExpectCard\|CardStack)' pharmacies/web/src --include=*.tsx` = **0** for all three. The true illustrative set is **4 distinct / 11 call sites** (`CoverageCards` 5, `StatsCounter` 3, `NumberedReasons` 2, `TestimonialsSection` 1) — up from R4's 7 call sites, so round 2 did move it. | Correct the three lines before tagging. |
| **R5-5** | minor | `/book`, `/thank-you` | **M-d, STILL OPEN as logged.** 0 `nav[aria-label="Breadcrumb"]`, 0 `BreadcrumbList` on both, against 1 on all 12 other templates measured. `/thank-you` is noindex; `/book` is a real page. | Owner question, unchanged. |

**BLOCKER 0 · serious 1 · minor 4.**

**Accepted, not findings.** N1 (widget panel auto-opens once per session on
desktop) — owner ruling of 2026-09-30, Property's own behaviour, parity; verified
below and left as the owner's walk question. S2 (four distinct darks) — needs a
kit prop. Eyebrow density and the illustrative-component count — routed to the
owner because closing them needs authored copy the 28 Sep wording ruling forbids.
M-a, M-e, M-f, m2, m3 — logged by earlier rounds, re-confirmed unchanged.

---

## 2. CLOSURE TABLE — every R4 finding and every R4 must-change line

| R4 item | verdict | measured evidence |
|---|---|---|
| **N1** widget panel auto-opens unprompted (blocker) | **ACCEPTED (parity, owner ruling)** | Confirmed live: panel up `1` dialog after 11s idle at 1440, `0` at 390 (desktop-only, correct). `sessionStorage.pfp_assistant_autoopened = "1"`; a reload in the same tab and a soft nav to `/services` both leave `panels = 0`, so the **once-per-session** claim in STATE.md holds as written. Per the 2026-09-30 estate ruling this is Property's behaviour, not a pharmacies defect. Still the owner's walk question. |
| **N2** G4 ring regression, ~12 white CTAs at 1.00 | **CLOSED** | `ringsettle.mjs`, **315 focusables across 5 routes, 0 below 3.0.** The four R4 named measure: `/` "Speak to a pharmacy accountant" **12.18**, `/` "FP34 reconciliation service" **12.18**, `/services/pharmacy-sale-cgt-badr` "Get in touch" **12.18**, `/for/buying-a-pharmacy` "Get in touch" **12.18** — each `2px solid rgb(255,255,255)` offset 2px on `[15,58,74]`, exactly G5's predicted 12.17. Site-wide minimum ring = **3.71** (header CTA, `rgb(28,143,182)` on white — a non-text UI component, floor 3.0, PASS). Footer rings **17.83**. The "Built by Double Wired Creative" credit, which the naive read scored 1.00 on a transparent outline, settles at **17.83**. |
| **S1** 10 prose anchors at 1.56 | **CLOSED** | All three homepage citations measured: "reimbursement and remuneration…" **12.18**, "FP34 submission cycle" **12.18**, "Drug Tariff and Category M clawbacks" **12.18**, each `2px solid rgb(255,255,255)` offset 2px on `[15,58,74]`. The same three measure **12.18** again in their light-ground duplicate (navy ring on white). Closed by G5's `a:focus-visible` element rule, which is the root-cause fix: no unringed focusable exists anywhere in the 315 scanned. |
| **S7** `text-white/50` captions at 4.29 | **CLOSED** | Full text-contrast sweep on both research pages at 1440 **and** 390: `subFloor = 0` nodes on each, at both widths. G5 took `white/60` (5.42 computed) rather than R4's `/70`, and fixed **four** nodes rather than the two R4 named. |
| **S2** four brand darks on one site | **STILL OPEN (owner / kit ask)** | Re-measured across 14 routes: `[15,58,74]` primary-950 ×11, `[24,93,118]` primary-800 ×1, `[29,41,61]` slate-800 ×2, `[15,23,43]` slate-900 footer ×17. Needs `sectionClassName` on `TestimonialsSection` / `LeadCTAPanel`. Not a tag gate. |
| **m1** kit `FAQ` eyebrow on the research pages | **CLOSED** | `>FAQ<` = **0** on both research pages (and on all 14 routes measured). The `h2` "Frequently asked questions" is unchanged, as G5 intended. |
| **m4** missing full stop | **STILL OPEN** | §1 R5-2. |
| **N3** `adjacentSame = 1` on 13 detail routes | **STILL OPEN** | §1 R5-3. |
| **N4** STATE.md overstates the adopted set | **STILL OPEN** | §1 R5-4. |
| **M-d** no breadcrumb on `/book`, `/thank-you` | **STILL OPEN (owner)** | §1 R5-5. |
| **N5** network-idle timeouts on the blocked ad frame | **not a page defect** | Zero `pageerror` on all 30 measurements; I navigate on `domcontentloaded`, so the blocked `pagead2` frame never gated a run. Known-and-accepted F3. |
| **R4 line 1** — gate the widget opener, or get the owner's word | **ACCEPTED, parity** | STATE.md's KNOWN AND ACCEPTED block is that word, under the 2026-09-30 estate ruling. Not a tag gate. |
| **R4 line 2** — `:not(a):not(button)` in `globals.css` | **DONE** | In the source (`globals.css:302-305`) and in the served CSS. Measured result: N2 closed. |
| **R4 line 3** — `${focusRing}` on the ten prose anchors | **DONE, differently and better** | G5 bound the token once at the element level instead of appending ten strings. Measured result: S1 closed, and no unringed focusable remains anywhere. |
| **R4 line 4** — `text-white/50` → lighter | **DONE** | Four nodes, `white/60`. Measured result: S7 closed. |
| **W7C** — modal guard re-arms after the panel closes (7 steps at 1440) | **CLOSED, walked** | **1:** 11s idle, panel up, `data-surface-open` **false**, dialogs **1** — the modal correctly stands down. At 80% with the panel still up, unchanged. **2:** close the panel → `.capture-widget [role=dialog]` **0**, and the modal fires **immediately**: `data-surface-open` **true**, `.capture-sticky` and `.capture-widget` both `display: none`, dialogs **1** (the modal). This is the step that fails on the pre-W7C build; the `MutationObserver` re-arm works. **3:** Escape → flag gone, sticky back to `block`, dialogs **0**. **4:** reload, close the panel, scroll to 85% → modal does **not** reappear; the 30-day `pfp_deepscroll_nhs-income` suppress holds. **5:** visitor-opened panel at 85% → still exactly 1 dialog (the widget's), modal absent. **6:** 390 at 30/45/80% → bar `h=72`, `y=772..844`; launcher `y=696..748`, `x=174..374`; **24px clearance, zero overlap at all three depths**; `scrollWidth == clientWidth`. **7:** grounds — `darkOnDark = 0` on all 16 routes; `adjacentSame = 0` everywhere except the 13 detail routes (R5-3). |
| **grounds on the three calculator slugs** | **CLOSED** | All three now serve `ground-dark bg-[var(--brand-primary)]` → `bg-slate-50` → `bg-white` → `bg-[var(--surface)]`. `adjacentSame = 0` measured at 390 and 1440. UB2 applied W7C's handoff. |
| **the two over-long post breadcrumbs** | **STILL OPEN (owner, as logged)** | Unchanged since R4; neither receipt claimed it. R4's own verdict stands: one `breadcrumbLabel` frontmatter line on the two posts over 45 chars. Not a tag gate. |
| **blog key-takeaways band** | **CLOSED** | The `Key takeaways` `<aside>` measures `bg-white` (`rgb(255,255,255)`), W7C's `bg-slate-50 → bg-white` landed. The post measures `adjacentSame = 0` at **both** 390 and 1440, so the 390 `RelatedArticles` residual W7C logged does not reproduce either. |

---

## 3. PART B — regressions introduced by round 2

**None.** Each check below is a command whose result I measured on this build.

- **Links.** No floor moved and none dropped: `/blog` **68** ≥ 37, `/services`
  **52** ≥ 18, `/for` **46** ≥ 15, `/calculators` **45** ≥ 13; the post **94**,
  `/` **83**. Matches R4's counts exactly.
- **CTA triples.** `header_contact` / `sticky_cta` / `sticky_cta_close` =
  **1/1/1** plus `specialist_widget` = 1 on **all 14** routes measured. No
  `data-cta` id added, removed or duplicated.
- **Wording.** The only new visible string anywhere is `Browse by category` on
  `/blog`, and it is **verbatim the band's own existing accessible name**:
  `main nav[aria-label]` on `/blog` returns `["Breadcrumb","Browse by category",
  "Pagination"]`, and the rendered eyebrow reads `BROWSE BY CATEGORY` (the
  uppercase is `text-transform`, not authored text). UA2's claim checks out.
  Eyebrow counts now measure `/blog` **2**, `/services` **1**, `/for` **1**,
  `/calculators` **1**, `/` **12**. Em-dash **0** and en-dash **0** in rendered
  text on all 16 routes at both widths.
- **Overflow at 390.** `scrollWidth == clientWidth` on **all 16 routes**,
  including both research pages and the post.
- **Consent toggle.** "Do not track me" present on all 16 routes at both widths.
- **Embed chrome.** `/embed/locum-take-home-comparator` serves 200 with
  `<header>` 0, `<footer>` 0, one visually-hidden `h1`, `.capture-sticky`
  **absent**, `.capture-widget` a 0-height empty wrapper, **zero painted fixed
  elements**, zero dialogs after 12s. Bare, as designed.
- **JSON-LD.** Every `ld+json` block parses on all 14 routes. `BreadcrumbList`
  exactly once on the 12 that carry one, absent on `/` and `/book` as before.
  `Dataset` on both research pages, `BlogPosting` once on the post,
  `WebApplication` on the calculator, `FAQPage` where expected.
- **Calculator pages.** Exactly **one** `<form>` under the result on each of the
  three slugs (`mini_capture_submit`), unchanged.
- **Page errors.** Zero `pageerror` across all 30 measurements.

---

## 4. PART C — parity verdict, in plain language

**Stated plainly, as R4 did: no reference server was running and I did not start
one**, so this compares pharmacies' measured DOM at 1440 against generalist's
**source** for the same templates. That is weaker than a true side-by-side, and
the screenshots are pharmacies-only.

| | pharmacies (measured, 1440) | generalist (source) |
|---|---|---|
| `/services` hero | **345px** (was 281) | `min-h-[360/420]` |
| `/for` hero | **345px** (was 281) | no `/for` route |
| `/blog` hero | 309px, 2 eyebrows, 4 sections | `min-h-[300/350]`, 5 eyebrow, 5 sections |
| `/calculators` hero | 353px, 1 eyebrow, 3 sections | `min-h-[300/350]`, 3 eyebrow, 3 sections |
| h1 ramp | 60px on all four hubs, 72px on `/` | `lg:text-6xl` |
| illustrative kit components | **4 distinct / 11 call sites** | **7 distinct / 20 call sites** |

**Verdict: pharmacies now reads at the Property/generalist standard on structure,
and falls short only on decoration.** Every hub has a real dark hero with an
eyebrow, the band rhythm alternates with zero adjacent repeats outside the 13
detail routes, every route ends light into the navy footer, the type ramp reaches
the third step everywhere, and the whole focus-ring system is now correct — 315
focusables, none below 3.0, which is better than most of the estate. `/blog` and
the post template are genuinely good (`blog-1440.png`). `/calculators` is clean.
The two hubs that were thinnest are now within 15px of the reference.

What still falls short, sorted:

1. **The `/services` "All services" wall is still eight paragraph boxes** — no
   icon, no arrow, no hover affordance (`services-1440.png`). `/for` got the
   arrow and a 3-column grid in round 2 and reads materially better
   (`for-1440.png`), but its row 2 is 2 cards in a 3-slot row, so a half-row of
   white remains. → **designer work, next round.** The cheapest unlock is the
   two kit props UA2 and UB2 both named (`CoverageCards` `titleAs` and a
   per-item trailing slot).
2. **Eyebrow density, 1–2 per hub against the reference's 3–5.** Both uplift
   rounds declined correctly rather than mint copy. Four short band labels from
   the owner closes it in one pass. → **needs authored copy (owner decision).**
3. **Illustrative components, 4 against 7.** Six candidates were checked at
   source across two rounds; each needs copy this site has never published.
   `entity.howItWorks` in `niche.config.json` is the nearest thing to step copy
   and no route renders it. → **needs authored copy (owner decision).**
4. **Four distinct dark grounds where Property paints one** (S2). → **next
   round**, and it needs a kit prop.
5. **The sidebar CTA at 3.71 on every post** (R5-1) and **the un-grounded
   `NextStepOffer` band on 13 routes** (R5-3). → **one-line fixes, before tag.**

Not a parity gap but the thing that will dominate the owner's walk: the widget
panel and the sticky bar both paint over the hub content before he has scrolled
(visible in all three hub screenshots). That is the accepted parity behaviour and
the question STATE.md already routes to him — walk it and say whether four
surfaces on one page reads as pushy.

---

## 5. TAG NOW?

**No. Three lines, then tag.** Two of them are one token each.

1. `pharmacies/web/src/app/blog/[category]/[slug]/page.tsx:181` — add
   `buttonClassName="bg-[var(--btn-ground)] text-white hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)]"`
   to the `BlogSidebarCta` call. **(R5-1, serious: 3.71 → 12.18 on 22 posts.)**
2. `pharmacies/web/src/lib/intent/widget-config.ts:106` — add `.`. **(R5-2.)**
3. `docs/pharmacies/STATE.md:251-259` — drop `DrawnTickList`,
   `WhatToExpectCard` and `CardStack` from the adopted list; the real set is 4
   distinct / 11 call sites. **(R5-4.)**

Take R5-3 while a file is open if you want it — one `<section className="bg-slate-50 py-12">`
wrap on the `NextStepOffer` mount closes `adjacentSame` on 13 routes — but it is
a cosmetic band boundary, not a gate.

**Owner questions, not tag gates:** the auto-opening panel plus sticky bar on
first load (walk `:3111`), S2's four darks, `/book`'s breadcrumb, the four hub
eyebrow labels, the two over-long post breadcrumbs, and whether to publish
`entity.howItWorks` so `ProcessTimeline` can mount.

**Next uplift round:** icons and a hover affordance on the `/services` card wall,
the `/for` half-row, the two `CoverageCards` kit props, `ProcessTimeline` /
`TopicSection` / `BlogCategoryHub`, and the kit `glow`'s hardcoded green.
