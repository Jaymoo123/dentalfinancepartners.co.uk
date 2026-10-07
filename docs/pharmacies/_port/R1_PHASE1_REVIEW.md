# R1 — adversarial review, pharmacies phase 1 (tokens + chrome)

Reviewer: R1 (Opus). Read-only on code. No subagents, no builds, no servers started/stopped,
no git state changed. One file written: this one.

**Instrument.** `curl` on `http://localhost:3111` (title asserted:
`Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners`) plus `puppeteer-core` driving the
installed Edge the way `docs/_engines/instruments/browser_check.mjs` launches it. Ring walks use a
**340ms settle** before `getComputedStyle` and composite every colour through a 1x1 canvas, so
`oklch()` and `oklab()` values are read correctly. Screenshots in
`C:\Users\user\AppData\Local\Temp\claude\C--Users-user-Documents-Accounting\36a8d5f8-aec5-4bb3-82fe-6b097e0885de\scratchpad\r1\`
(`home_390.png`, `home_390_drawer.png`, `footer_390.png`, `home_1440.png`, `footer_1440.png`);
probe scripts `probe.mjs` … `probe4.mjs` in the same directory.

**Scope warning, read B2 first.** The build serving `:3111` is `.next/BUILD_ID` @ **11:44:27**.
Four source files in the working tree are **newer than the build** (11:55–12:02). Every rendered
measurement below is therefore of the phase-1 build, and is **not** a statement about the tree as
it stands now.

---

## FINDINGS

| # | sev | finding | evidence | package | minimal fix |
|---|---|---|---|---|---|
| **B1** | **BLOCKER** | **The skip link's focused ground is `primary-600`, not the brand 950. White on `#1c8fb6` = **3.71**, under the 4.5 text floor.** A5's rule exists in the built CSS but **loses the cascade**: it sits in `@layer components`, Tailwind's `focus:bg-primary-600` sits in `@layer utilities`, and utilities outrank components. The rule is dead on arrival. | `probe.mjs` → `skip.bg = "rgb(28, 143, 182)"`, `skipRatio = 3.71`, `isFocused: true`; built CSS carries both `a[href=\#main]:focus{background-color:var(--color-primary-950)}` (in `@layer components`) and `.focus\:bg-primary-600:focus{…}` (in `@layer utilities`) | P1-A (A5), asserted by P1-C | Take the rule **out of the layer** (one deliberate unlayered carve-out, the same mechanism the kit uses for `h1..h6`), or `background-color: var(--color-primary-950) !important` inside the layer. One line either way. |
| **B2** | **BLOCKER (for tagging, not for the build)** | **The working tree contains phase 2/4/5 page work that no phase-1 receipt accounts for**, and it post-dates the reviewed build. `app/blog/**` adopts `HubArticleList` + `LeadCTAPanel` + the backdrop; `app/services/[slug]` adopts kit `Breadcrumb`/`Eyebrow`/`FaqSection`; `app/calculators/**` + `components/calculators/**` + `lib/calculators/site.ts` are fully ported; `app/page.tsx` is rewritten to `bg-primary-950` with 7 `.ground-dark` mounts. A tag taken from this tree is not "phase 1". | `stat .next/BUILD_ID` = 11:44:27 vs `src/app/page.tsx` 12:02:34, `blog/page.tsx` 11:57:34, `calculators/[slug]/page.tsx` 11:55:56; `git diff --name-status port-pharmacies-phase0 -- pharmacies/web/src` lists 39 files, 12 of them outside every phase-1 OWNS list; these packages are specified in `PHASE2-6_PACKAGES.md` (W2/W3/W4) | none (manager / later waves) | Decide explicitly: either tag phase 1 from a tree holding only the phase-1 OWNS files, or retire the phase-1 tag and record the combined scope. Do not tag silently over W2–W5. |
| **S1** | serious | **`.ground-dark` is declared and only half-mounted, and the gap is measurable.** On `/` in the reviewed build the three brand-dark bands carry no `.ground-dark`, so `--focus-ring` stays `#0f3a4a` and the ring paints **brand on brand: ratio 1.00** on the two hero CTAs, **2.54** on the four stat-band links (`#1a5c6e` ground) and **1.56** on the five NHS-band links. Same shape on `/calculators/[slug]`'s brand hero breadcrumb (1.56). | `probe3.mjs` Tab-walk, 70 stops on `/`: 11 sub-floor rows, worst `ratio: 1`, `ringVar: "#0f3a4a"`, `ground: "15,58,74"` | P1-A declared it, phase 5 mounts it | Not a regression — phase 0's `outline-[#0f3a4a]` literal measured the same 1.00 — but gate row 7 must be reported as **11 sub-floor rings live**, not as a deferral footnote. The worktree's newer `page.tsx` already fixes it; the tagged build does not. |
| **S2** | serious | **Six unlayered author rules in the built CSS, not zero.** `h1,h2,h3,h4,h5,h6{line-height:1.2}`, `.hero-reveal`, `.hero-reveal-delay`, `.marquee-track` (+ its hover/focus-within pair), `.related-card` (+ `:focus-within`), `.eyebrow-rule`. All arrive with P1-A's new `globals-standard.css` import; all are the kit's own deliberate rules (documented at `globals-standard.css:50-73`), so the fix is the claim, not the CSS. | layer-stack-aware brace walk over `pharmacies/web/.next/static/css/7be6e3b81ebf88f6.css` (utf-8-sig, character stream), excluding `@font-face`, `@property` and Next's `__className`/`__variable` | P1-A | Restate the gate row honestly: **0 unlayered rules authored by pharmacies, 6 inherited from the kit, all intentional.** P1-A ran the walk on the SOURCE `globals.css` only, where the import's contents are invisible. |
| **S3** | serious | **Undeclared rendered typography change.** The inherited unlayered `h1..h6{line-height:1.2}` beats the homepage h1's `leading-[1.1]` utility: computed `font-size 60px / line-height 72px` where phase 0 rendered 66px. Exactly the Medical trap ("an unlayered rule beats every Tailwind v4 utility"). | `probe2.mjs` `type["/"].h1 = {fs:"60px", lh:"72px"}`; served `<h1 class="… leading-[1.1] …">`; `curl` shows this is the **only** heading on the site carrying a leading utility | P1-A | Either accept it as adopting the house 1.2 rhythm (Property's standard) and write the line in the receipt, or `leading-[1.1]!`. Do not leave it undeclared. |
| **S4** | serious | **The fixed StickyCTA bar covers the last footer row**, including the site's only consent control. Scrolled to the end at 1440: bar occupies y 820–900, the "Do not track me" button occupies 811.75–835.75 → overlapping. Same at 390 (`footer_390.png`: the copyright line and the toggle are behind the bar). | `probe4.mjs` `overlap = {bar:{top:820,bottom:900}, consent:{top:811.75,bottom:835.75}, covered:true}`; `footer_390.png`, `footer_1440.png` | P1-C (it mounts both) | Add bottom padding to the shell's footer region equal to the bar height while the bar is mounted (`pb-24` on the wrapper, or the kit's own spacer). One class. |
| **S5** | serious | **The footer reads thin and broken next to Property.** Four of the five columns are a heading over a single self-link: SERVICES → "Services", RESOURCES → "Research", CALCULATORS → "All calculators", BLOG → "Blog". At 1440 the right ~60% of the column grid is empty. `/for` reaches the footer not at all. The `footerLinks` row renders empty as predicted. | `footer_1440.png`; rendered footer text: `Services\|Services\|Resources\|Research\|Calculators\|All calculators\|Blog\|Blog\|Company\|About\|Contact\|Privacy Policy\|Terms\|Cookie Policy` | P1-C / `niche.config.json` | Kit fallback is working as written (`childrenOf` self-links a childless nav item), so the fix is data, not code: give `navigation` children for Services (8 `/services/*` exist) and point `resourcesHref` at a hub with children. Owner question Q1/Q3 territory; do not ship the 5-wide empty grid as "the Property look". |
| **M1** | minor | The header CTA's own focus ring is the kit's hardcoded `outline-primary-600`, not `--focus-ring`: `rgb(28,143,182)` at **3.71** against the white header. Passes the 3:1 indicator floor, so not a defect — but P1-B's "one mechanism and one grep" does not reach kit chrome, and the receipt reads as if it does. | `probe.mjs` `headerCtaRing = {col:"rgb(28, 143, 182)", ground:"255,255,255", ratio:3.71}` | P1-B / kit | Record the exception. A kit prop is the only real fix; not phase 1's. |
| **M2** | minor | P1-E's motif claim does not survive the render: the backdrop reads as **graph paper**, not a horizontal shelving rhythm. Subordinate and harmless, but the receipt's design sentence is not what ships. | `footer_1440.png`, right 55% of the footer | P1-E | Reword the receipt, or widen the pitch. Cosmetic. |
| **M3** | minor | P1-E's mount instruction (still on file) tells P1-C to mount the backdrop in `components/layout/SiteFooter.tsx` — a file P1-C **deletes**. P1-C caught it and mounted via `footer={{ backdrop: … }}`; the stale instruction is still the first thing a later agent reads. | `P1E_RECEIPT.md` §MOUNT INSTRUCTION vs `P1C_RECEIPT.md` false-premise 1 | P1-E | Strike the path from P1-E's receipt. |
| **M4** | minor | `/calculators` is a brand-new chrome link on 55 pages (the kit's Calculators column cannot be suppressed). Route returns **200**, so it is a note, not a 404 — recording it because it is a new internal link target that no phase-1 package chose. | `curl -o /dev/null -w %{http_code} /calculators` → 200 | P1-C handoff 1 | None. Owner-visible. |
| **M5** | minor | The nav label **"For" stands alone** in the header next to Services / Research / Blog / About / Contact. Next to Property's nav it reads as a truncation. Copy is frozen, so this is an owner question, not a bug. | `home_1440.png` header | config | Owner decision (Q2). |

**Count: 2 BLOCKER, 5 serious, 5 minor.**

---

## CLAIMS IN THE RECEIPTS THAT THE DOM CONTRADICTS

1. **P1-C, acceptance item 8** — "The skip link's focused ground measured (A5): white on `#0f3a4a` = 12.18."
   The DOM says `rgb(28,143,182)` and **3.71**. The A5 rule is present and outranked. (Finding B1.)
2. **P1-A, brace-depth walk** — "Zero `*** UNLAYERED ***` rows… both are now layered."
   True of the source file, false of the built CSS, which is the only thing that decides layer order:
   **six** unlayered author rules ship. P1-A said the manager must re-run the walk against the built
   CSS; it was not re-run, and the row has been carried as a pass. (Finding S2.)
3. **P1-A, A6** — "Phase 1 mounts none of [the motion layer]."
   True of the classes, false of the import's side effects: the unlayered `h1..h6` rule from the same
   file is live on 55 routes and changes the hero h1's leading. (Finding S3.)
4. **P1-E, design rationale** — "a pitch chosen so the rhythm reads horizontal rather than as a grid."
   The render is a grid. (Finding M2.)
5. **P1-B, false-premise section** — the brief's "21 importers" was corrected to 19; correct, and the
   per-symbol counts hold. No contradiction, recorded because the correction is load-bearing for row 1.
6. **P1-F/P1-F2** — "the only remaining offender is `StickyCTA.tsx`". `StickyCTA`'s ring was fixed by
   P1-C after those runs; the guard has **not been re-run since**, so phase 1 closes with no green
   test run on record. Not re-run here (read-only). The manager owes one `npm test` line.

**Claims that held, checked against the DOM, not the source:** body font computes to a quoted
`"Plus Jakarta Sans"`; ramp present and consumed in the built CSS (`bg-primary-50` ×7,
`text-primary-400`, `text-primary-600`; `--color-primary-950: #0f3a4a`, `--radius: 0rem`,
`--btn-ground: #0f3a4a`, four `--brand-glow*` triplets); **zero `neutral-*` classes in the rendered
DOM**; `main=1` on 7 routes; one skip link, focusable; `/embed/[slug]` has 0 header/footer/sticky;
exactly **one `#organization` node** per route carrying `legalName "Ashfield Trading Ltd"`,
`alternateName "Pharmacy Tax"`, `parentOrganization` with the CH number, **no `priceRange`**;
CTA id set identical to baseline on **55/55** routes (`header_contact`, `sticky_cta`,
`sticky_cta_close`, placements `header`/`sticky`/`sticky`); link floor **≥ `sweep_baseline.json` on
55/55**; em-dashes **0 on 55/55**; `scrollWidth === clientWidth` at 390 on `/`, `/blog`, `/services`,
`/contact`, `/research/pharmacy-openings-closures-index`; every chrome href **200** (11/11, including
`resourcesHref` → `/research/pharmacy-openings-closures-index`); wordmark = lucide `Pill` computing
`rgb(15,58,74)`; builder credit present (gradient-clipped text, stops measure 5.98 / 7.89 on
slate-900 and 4.96 / 6.54 composited over the backdrop — above the 4.5 floor at 12px); consent
toggle present and **operable** (label flips "Do not track me" ↔ "Enable analytics", `pfp_consent`
writes `denied`/`granted`); footer and sticky-bar rings are white at **17.83** on slate-900
(`.ground-dark` + the `footer` element rule both live); backdrop `aria-hidden="true"`,
`pointer-events: none`, `hidden sm:block`, one mount per route, composited `#14293f` = 14.80 vs
white / 9.97 vs slate-300; both gradient grounds measured stop by stop over `bg-[#0f3a4a]` —
hero `#0f3a4a` / `#175263` / `#071f28` → white 12.18 / 8.67 / 16.99, teal-200 9.66 / 6.87 / 13.48,
white/80 8.41 / 6.20 / 11.14; CTA band `#114151` → white 11.06, slate-300 7.45. **All text stops pass.**
Copy unchanged: every prose string from `git show port-pharmacies-phase0:` for `app/page.tsx`,
`app/contact/page.tsx` and `app/about/page.tsx` is present verbatim in the rendered pages.

---

## KNOWN AND ACCEPTED (declared deltas, verified as intended)

- **Header CTA breakpoint `xl:` → `lg:`.** Computed `display` on `header [data-cta="header_contact"]`:
  `none` at 390 / 768 / 1023, `flex` at 1024 / 1280 / 1440. Burger is `flex` below 1024 and `none`
  above. Measured as display, not DOM presence. As declared.
- **`goal: null → "form"`.** `data-cta-goal="form"` on `header_contact` (and on
  `header_contact_mobile` in the drawer). One new dimension value on 55 routes, no existing series
  split. As declared.
- **"Contact" visible in the nav at `xl:`.** `display: block` at 1280 and 1440 alongside the CTA —
  the consequence of not passing `ctaSecondary`. As declared.
- **Mobile drawer.** Opens on the burger, `role="dialog"`, `aria-modal="true"`,
  `aria-expanded` flips to `true`, focus lands inside the panel, and the drawer CTA is
  `header_contact_mobile` / `header_mobile_menu` / `goal=form` → `/contact`, label "Get in touch".
- The brief's own accepted list (AdSense CSP frame-src line, research-page SVG `NaN`, the 29 caption
  failures, scattered navigation timeouts, `304`s, the `nav.hidden.lg:flex` flag below 1024,
  `admin/analytics/login`'s ring, the h1 600-vs-700 split — reconfirmed: `/` 700, `/blog` 600).

---

## VERDICT

**Not ready to tag.** Two things must close first, and only one of them is code. **B1** is a real,
rendered, 3.71 contrast failure on the first interactive element of every page, and it is a
one-line cascade fix, not a redesign — the receipts assert 12.18 because nobody tabbed into it. **B2**
is bigger than phase 1: the working tree has already run W2, W3, W4 and the homepage wave on top of
this phase, all of it newer than the build I reviewed, so a tag taken now would label four waves of
page work as "tokens and chrome" and would also be the first tag whose rendered state nobody has
measured. Decide the tag's scope before cutting it. Beyond those: **S2 and S3** are receipt
corrections plus one declared typography change (the gate's "zero unlayered" row is false in the
built CSS and must be restated, not re-run until it reads the way someone wants); **S4** is a class
of padding that stops the sticky bar sitting on top of the only PECR control the site has; **S1** is
on the record as 11 live sub-floor rings that phase 5 closes, which is acceptable only if it is
written down rather than carried as a footnote; and **S5** is the one thing an owner will see first
— a five-column footer that is four headings over four self-links and a lot of empty slate. The
chrome itself is correctly adopted: ids, placements, landmarks, embed bypass, JSON-LD, link floors,
em-dashes, overflow, drawer, consent, backdrop and both gradient grounds all hold under measurement.
Fix B1, decide B2, write S2/S3, pad S4, and the phase is tagworthy.
