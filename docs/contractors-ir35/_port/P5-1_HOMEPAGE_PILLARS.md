# P5-1 — homepage, /services, the IR35 pillar and the contractor-type family

Phase 5 of the `contractors-ir35` design port. Covers packages P5-1 to P5-5 of
`PHASE_PLAN.md` §H as a single lease.

File lease actually edited:

- `src/app/page.tsx` (rewritten)
- `src/app/services/page.tsx`
- `src/app/ir35-status/page.tsx` (rewritten)
- `src/app/for/page.tsx` (rewritten)
- `src/app/for/[slug]/page.tsx` (rewritten)
- `src/config/service-tiers.ts` (two CTA hrefs + one label)
- `src/data/contractor-types.ts` — **NOT edited, deliberately.** It is data, it
  carries no styling, and a banned-copy sweep over it (fee claims, timed
  promises, qualification/regulator/PII/regulated-work claims, em-dashes)
  returned nothing that is a claim about us. The three professional-indemnity
  hits at lines 513, 540 and 637 are about the *reader's* own cover as an IR35
  indicator, not a claim that this firm holds PII. Authoring the persona copy is
  P5-7 (F-7), a separate content package.

Servers used, read-only, asserted before any edit:
`curl -s <base>/ | grep -o -i "fixed[- ]fee" | wc -l` returned **17 on :3611**
(pre-port) and **0 on :3641** (current build, without these edits). Both correct,
so :3641 is the "before" for every measurement below.

---

## 1. Funnel order per route

§0.5 order is hook, problem, proof, scope, ask. Sections may merge, never
reorder into an ask-first page. Every hero primary CTA is `#book` on-page; only
the header CTA and the sticky banner still leave for `/contact`.

### `/` (homepage)

| Before | After |
|---|---|
| hero (CTA to `/contact`) | **hook** hero, CTA `#book` |
| key stats | key stats |
| intro strip | intro strip |
| testimonials | **problem** pain points |
| pain points | **proof** composite snapshots |
| services grid | **proof** specialist comparison table |
| StatsBar | editorial break |
| contractor types | **scope** services grid |
| comparison table | StatsBar |
| editorial break | **scope** contractor types (10 links) |
| service tiers | **scope** service tiers |
| **contact CTA (bare LeadForm in a navy card)** | FAQ |
| FAQ | guides |
| blog CTA | **ask** `LeadCTAPanel` in `<div id="book">` |

The two moves that matter: proof now follows problem instead of preceding it,
and the ask is last instead of sitting three sections from the bottom with FAQ
and a blog promo after it.

### `/services`

hook (hero, `#book`) → proof (`StatsBar`) → scope (six service cards) → scope
(`ServiceTiers` + the `/for` cross-link) → ask (`LeadCTAPanel`).

The page has no authored problem section and I did not invent one: the only
honest material available would have had to carry a figure or a fee claim.

### `/ir35-status`

Before: hero → service block → three tests → inside/outside table → timeline →
CTA. That is scope before problem.

After: hook (hero, `#book`) → **problem** (the three tests) → **proof**
(inside vs outside tax table) → **proof** (off-payroll timeline + the small
company exemption note) → **scope** (what the review covers, what you get back)
→ ask (`LeadCTAPanel`).

### `/for`

Before: hero → type grid → why sector knowledge matters. That is scope before
problem, and the grid sat on `bg-neutral-900` directly under a `bg-neutral-900`
hero, so two touching sections shared a ground.

After: hook (hero, `#book`) → **problem** (why sector knowledge matters, now two
cards rather than a prose wall) → **scope** (the ten persona cards) → ask.

### `/for/[slug]`

hook (hero, `#book`) → proof (sector stats) → **problem** (challenges) →
**proof** (composite snapshot) → **scope** (how we help) → FAQ → sibling
personas → ask (`LeadCTAPanel`).

---

## 2. Internal link counts, before and after

Method matches `docs/_engines/instruments/sweep.mjs:156`: unique root-relative
`<a href="/…"` targets per route, fragments and queries stripped. "Before" is
measured off the running :3641 build. "After" is derived from source, because
this package runs under a no-build rule; it is **UNVERIFIED until the manager's
serialised build** and item 1 of the verification list re-runs it.

The chrome (header + footer) contributes a fixed 13 targets on every route:
`/`, `/about`, `/blog`, `/book`, `/calculators`, `/contact`, `/cookie-policy`,
`/for`, `/ir35-status`, `/locations`, `/privacy-policy`, `/services`, `/terms`.

| Route | Before | After | Body-unique targets after |
|---|---|---|---|
| `/` | 23 | 23 | the 10 `/for/*` personas (every one kept) |
| `/services` | 13 | 13 | none beyond chrome |
| `/ir35-status` | 13 | 13 | none beyond chrome |
| `/for` | 23 | 23 | the 10 `/for/*` personas |
| `/for/[slug]` (sampled `it-contractors`, `nhs-locum-doctors`) | 18 | 18 | 5 sibling personas |

**Link floor verdict: HELD on all five routes, zero decrease.**

Two things could have breached it and did not:

- The homepage's old "Contact CTA" section and the `/services` CTA block both
  linked `/contact`; replacing them with `LeadCTAPanel` keeps a `/contact` link
  in each panel footnote, and `/contact` is in the chrome set regardless.
- `service-tiers.ts` moved two `ctaHref`s from `/contact` to `#book`. A `#book`
  href is not a root-relative target and does not count either way, and
  `/contact` survives in the chrome and in the panel footnote. The DIY tier's
  `/calculators` href is untouched.

Net addition: the homepage guides section now links `/calculators` in the body
(already in the chrome set, so the count is unchanged but the crawl path is
stronger).

Baseline cross-check against `_port/sweep_baseline.json` (SHA `18b4f25f`,
pre-port): `/` 21, `/services` 11, `/ir35-status` 10, `/for` 20,
`/for/it-contractors` 15. Every route is **above** its pre-port baseline by the
+2/+3 the wave-1 chrome added. Nothing here spends that headroom.

---

## 3. `data-cta` triples, before and after

Attribute names preserved exactly: `data-cta`, `data-cta-placement`,
`data-cta-goal`. Names match glossary, locations, research and calculators:
`hero_book` / `hero` / `form`. One name per thing.

| Route | Before (page-owned) | After (page-owned) |
|---|---|---|
| `/` | none | `hero_book` / `hero` / `form` |
| `/services` | none | `hero_book` / `hero` / `form` |
| `/ir35-status` | none | `hero_book` / `hero` / `form` |
| `/for` | none | `hero_book` / `hero` / `form` |
| `/for/[slug]` | none | `hero_book` / `hero` / `form` |

Not one of these five routes carried a page-owned triple before. Confirmed on
the live :3641 HTML: each route emitted exactly two, `header_book` (chrome) and
`specialist_widget` (intent surface), both outside this lease and both
untouched. So nothing was preserved-by-rewrite; five triples are new, none are
lost. Estate `data-cta` total rises by 5 from the baseline 219.

---

## 4. Contrast, hand-measured

Method: WCAG relative luminance, sRGB to linear per channel,
`(L1+0.05)/(L2+0.05)`. Self-test reproduced exactly before trusting any figure:
**slate-500 `#64748b` on white = 4.76**, **slate-400 `#94a3b8` on white = 2.56**.

Ramp steps per `_port/P1-7_RAMP.md`: `primary-600` = cyan-700 `#0e7490`,
`primary-700` = cyan-800 `#155e75`, `primary-800` = cyan-900 `#164e63`,
`primary-400` = cyan-400 `#22d3ee`, `primary-300` = cyan-300 `#67e8f9`. True
cyan-600 `#0891b2` is `primary-500` here and measures 3.68, so it is used
nowhere.

| Pair | Ratio | Floor | Verdict |
|---|---|---|---|
| `text-primary-600` on white (card "Learn more", FAQ plus icon) | 5.36 | 4.5 | PASS |
| `text-primary-600` on `#fafaf7` | 5.12 | 4.5 | PASS |
| `text-primary-600` on `neutral-50` | 5.13 | 4.5 | PASS |
| `text-primary-700` eyebrows on white | 7.27 | 4.5 | PASS |
| `text-primary-700` eyebrows on `#fafaf7` | 6.95 | 4.5 | PASS |
| `text-primary-700` eyebrows on `neutral-50` | 6.96 | 4.5 | PASS |
| white on `bg-primary-600` (`btnPrimary` ground) | 5.36 | 4.5 | PASS |
| white on `bg-primary-700` (key-stat and sector-stat bands) | 7.27 | 4.5 | PASS |
| `text-cyan-100` stat labels on `bg-primary-700` | 6.49 | 4.5 | PASS |
| white on `bg-primary-800` (editorial break overlay) | 9.11 | 4.5 | PASS |
| `text-cyan-100` on `bg-primary-800` | 8.14 | 4.5 | PASS |
| `text-primary-400` on `neutral-900` (dark eyebrows, hero accent, type-grid links) | 9.92 | 4.5 | PASS |
| `text-primary-300` on `neutral-900` (table header "Outside IR35") | 12.37 | 4.5 | PASS |
| `text-neutral-300` on `neutral-900` (hero body, dark standfirsts) | 12.09 | 4.5 | PASS |
| `text-neutral-600` body on white | 7.81 | 4.5 | PASS |
| `text-neutral-600` body on `neutral-50` | 7.49 | 4.5 | PASS |
| `text-neutral-600` body on `#fafaf7` | 7.47 | 4.5 | PASS |
| `text-neutral-700` intro strip on `#fafaf7` | 9.92 | 4.5 | PASS |
| `text-neutral-800` quote body on white | 15.13 | 4.5 | PASS |
| `text-neutral-900` headings on white | 17.93 | 4.5 | PASS |
| white on `neutral-900` (headings, table head) | 17.93 | 4.5 | PASS |
| `LeadCTAPanel` `contained`: slate-900 title on slate-100 card | 16.30 | 4.5 | PASS |
| `LeadCTAPanel` `contained`: slate-600 description/footnote on slate-100 | 6.92 | 4.5 | PASS |

**Lowest measured text ratio anywhere in this package: 5.12** (`primary-600` on
the warm `#fafaf7` ground).

Two readings that are deliberately not "fixed":

- **The homepage hero photograph.** It sits under
  `bg-gradient-to-r from-neutral-950/97 via-neutral-950/90 to-neutral-900/60`.
  The automated tool cannot resolve a gradient over an image and reports a false
  1.00 there. A reviewer measuring real pixels got 11.74 (body) and 7.30
  (accent). Do not treat the 1.00 as a finding.
- **The editorial-break band** is the same shape: `bg-primary-800/90` over a
  photograph. The figures above are the opaque-ground measurement, which is the
  conservative direction only if the photo behind is darker than `#164e63`;
  where it is lighter the ratio rises. Flagged as the one genuinely approximate
  row in this table.

### Two contrast defects fixed in passing

| Where | Before | Ratio | After | Ratio |
|---|---|---|---|---|
| `/for/[slug]` composite-snapshot disclaimer | `text-neutral-400` on `neutral-50` | **2.42 FAIL** | `text-neutral-600` | 7.49 |
| `/` hero trust line, `/for/[slug]` back-link | `text-neutral-400` on `neutral-900` | 7.11 PASS but thin | `text-neutral-300` | 12.09 |

The first is a real 4.5-floor breach on live copy, not a design preference.

---

## 5. Design-standard changes applied

- **One radius.** Every `border border-neutral-200` card, table wrapper and
  `<details>` becomes `rounded-xl` with `ring-1 ring-neutral-200/70`. Zero
  `rounded-2xl` remain in the five files (grep-verified). Icon tiles and buttons
  pick up `rounded-xl` to match.
- **The container is the measure.** `siteContainerLg` everywhere, no body
  clamp. The surviving `max-w-3xl` / `max-w-2xl` are hero copy blocks and
  section heads/standfirsts only; nothing clamps a grid, a table, a list or a
  form.
- **Grounds oscillate, set explicitly per section, and no card shares its
  section's ground.** Pain points and challenges are `neutral-50` cards on
  white; snapshots are white cards on `neutral-50`; service cards are white on
  `#fafaf7`; `/for` persona cards are white on `#fafaf7`; sibling personas are
  `neutral-50` on white.
- **Navy never touches navy.** Two breaches removed: `/for` had a
  `bg-neutral-900` grid directly under a `bg-neutral-900` hero, and the
  homepage's old navy "Contact CTA" ran toward the navy footer. Every page now
  ends light: the closing `LeadCTAPanel` is `contained`, so the tail is
  panel-on-light then footer.
- **Eyebrows hand-rolled.** `.section-label` (globals.css:252) and `.eyebrow`
  (globals.css:211) are unlayered rules that pin their own colour from
  `var(--accent)`; a utility cannot beat them. Every eyebrow in these five files
  is now `font-mono text-xs font-medium uppercase tracking-[0.1em]` plus
  `text-primary-400` on dark or `text-primary-700` on light.
- **`FaqSection` NOT adopted.** Both FAQ blocks stay native `<details>`, which
  keep every answer in the server HTML, so `buildFaqJsonLd(faqs)` on the
  homepage asserts nothing the HTML does not contain. Banned here by written
  decision; the Radix component has no `forceMount`.
- **`LeadCTAPanel` adopted on all five routes**, copied from the working call
  site at `src/app/locations/page.tsx`: `contained`, `ground` alternating with
  the section above, `eyebrow="Free call"`, `formTitle="Book your free call"`,
  wrapped in `<div id="book" className="scroll-mt-24">`.
  - `proofPoints={[]}` on every one. Property's own call site passes
    "Fixed fees, quoted upfront" and "24-hour response": a fee claim and a
    turnaround promise, both banned on this site. Not inherited, not replaced.
  - `footnote` content is a `<span>`, never a `<div>`. `PanelBody`
    (`LeadCTAPanel.tsx:185`) renders `footnote` inside a `<p>`, so a block there
    is a hydration mismatch.
  - `ground` per route: `/` slate (white above), `/services` slate (white
    above), `/ir35-status` white (`#fafaf7` above), `/for` white (`#fafaf7`
    above), `/for/[slug]` slate (white above).

---

## 6. Copy: what was preserved, what changed

Preserved exactly, because it was fixed on 2026-09-12 and must not regress:

- The homepage testimonial heading "The situations contractors bring us" with
  the "Composite snapshots" eyebrow and the "composite snapshots… names and
  figures anonymised" disclaimer. No "Real outcomes" style heading restored.
- Every figure. `~£2k` keeps its scenario in its own label
  ("outside IR35 vs umbrella at £500 a day"); the FAQ keeps the full
  "£1,900 to £2,000 a year at £500 a day over 240 days (£6,000 of company
  expenses, a £1,200 umbrella margin)" derivation. **No figure was added,
  moved away from its scenario, rounded or re-derived anywhere in this
  package.**
- First-person "we do the work" voice, and "free call".
- Zero fee claims, zero timed promises, zero qualification/regulator/PII/
  regulated-work claims introduced. Grep-verified across all seven leased files.
- Zero em-dashes (grep count 0 in all seven files).

Copy that changed, and why:

| Where | Before | After | Reason |
|---|---|---|---|
| Homepage guides section, second link | "IR35 status explained" → `/ir35-status` | "Free contractor calculators" → `/calculators` | `/ir35-status` is already the hero's secondary CTA on the same page; the calculators had no body link from the most linked page on the site. No link lost, one crawl path gained. |
| Homepage closing block | four proof rows in a bespoke navy card | the same four claims compressed into the panel footnote | `proofPoints` is empty by rule; the claims themselves ("contractor specialists only", "a specialist picks it up", "scope agreed up front", "confidential") are unchanged in substance and none is a fee or a time. |
| `/services` CTA | "Ready to talk through your situation?" + two `/contact` buttons, one of them a duplicate "Get in touch" | same heading and standfirst inside `LeadCTAPanel`, one on-page form | the duplicate second button pointed at the same URL as the first. |
| `/for` problem section | one two-paragraph prose block | the same two paragraphs as two titled cards | §0.2: no section ships as prose alone. Wording unchanged; two headings added. |
| `/for` closing ask | "Book a free call" button mid-page | `LeadCTAPanel` with a new two-sentence description | the page previously had no on-page form at all. |
| `service-tiers.ts` Done-for-you CTA | "Get a quote" | "Talk through the scope" | "Get a quote" reads as a price promise on a site that publishes no fees; the tier's own description already says "scope agreed after a call". |
| `service-tiers.ts` two `ctaHref`s | `/contact` | `#book` | §0.5: only the header CTA and the sticky banner leave for `/contact`. Both call sites (`/` and `/services`) now carry the anchor. |

No `/for/[slug]` persona copy was touched: that is P5-7's lease.

---

## 7. Canonicals

`/for` and `/for/[slug]` both had their canonical fixed on 2026-09-12, from the
homepage to self. Verified surviving these edits:

- `src/app/for/page.tsx`: `alternates: { canonical: `${siteConfig.url}/for` }`,
  now carrying a comment saying why.
- `src/app/for/[slug]/page.tsx`:
  `alternates: { canonical: `${siteConfig.url}/for/${type.slug}` }` inside
  `generateMetadata`, likewise commented. `generateStaticParams` untouched, so
  all 10 personas still prerender.

`/`, `/services` and `/ir35-status` self-canonicals are unchanged.

---

## 8. Verification list for the manager's serialised build

Run `npm run build` then `npm run start` in `contractors-ir35/web` once. Items
1-4 are the ones that can only be settled by a build.

1. **Link floor.** Re-run the sweep, or:
   `for p in / /services /ir35-status /for /for/it-contractors; do curl -s
   http://localhost:3000$p | grep -oiE '<a\b[^>]*\shref="(/[^"#?]*)' | sed -E
   's/.*href="//' | sort -u | wc -l; done` — expect **23, 13, 13, 23, 18**, and
   no route below its `sweep_baseline.json` entry (21, 11, 10, 20, 15).
2. **The 10 persona links survive on `/` and `/for`.**
   `curl -s http://localhost:3000/ | grep -o 'href="/for/[a-z-]*"' | sort -u |
   wc -l` — expect **10** (plus `/for` itself).
3. **`data-cta` triples.** Each of the five routes emits exactly three
   page-owned attributes with `data-cta="hero_book"`,
   `data-cta-placement="hero"`, `data-cta-goal="form"`, alongside the untouched
   chrome `header_book` and `specialist_widget`.
   `curl -s http://localhost:3000/ | grep -c 'data-cta="hero_book"'` — expect 1
   per route.
4. **No hydration mismatch from the panel footnote.** Load `/`, `/services`,
   `/ir35-status`, `/for` and one `/for/<slug>` with the console open; expect
   zero "cannot be a descendant of `<p>`" warnings. This is the specific failure
   the `<span>` rule exists to prevent, and it cannot be seen in source.
5. **`#book` actually resolves.** Click each hero CTA and each `ServiceTiers`
   CTA on `/` and `/services`: the form heading must land clear of the sticky
   header (`scroll-mt-24` doing its job), not underneath it.
6. **Canonicals.** `curl -s http://localhost:3000/for | grep canonical` →
   `/for`; `curl -s http://localhost:3000/for/it-contractors | grep canonical` →
   `/for/it-contractors`. Neither may be the homepage.
7. **The ramp resolved (inherited from P1-7, still the blocker).** The hero
   button ground must compute to `rgb(14, 116, 144)` and the key-stat band to
   `rgb(21, 94, 117)`. If `@source` did not take, these render transparent and
   every ratio in §4 is moot.
8. **Grounds alternate and nothing navy touches the footer.** Scroll each of
   the five routes: the last band before the footer is the light
   `LeadCTAPanel`.
9. **Typecheck.** `npx tsc --noEmit` was clean across these five files at the
   time of writing; the only errors in the workspace were in
   `src/app/thank-you/page.tsx`, which a parallel agent held mid-edit and which
   is not in this lease.

### Marked UNVERIFIED

- **Every "after" link count in §2.** Derived from source under the no-build
  rule. Item 1 settles it.
- **Every contrast ratio in §4 as rendered.** The arithmetic is exact and the
  self-test reproduced, but whether the emitted CSS binds `primary-600` to
  `#0e7490` is P1-7's `@source` question and needs the build (item 7).
- **The editorial-break overlay ratio**, measured against an opaque `#164e63`
  rather than the composite of a 90% overlay on a photograph.
- **Homepage hero ratios**, which are a reviewer's pixel measurement carried
  forward from the brief, not re-measured here.
- **That `#book` anchors scroll correctly** (item 5) and **that no hydration
  warning fires** (item 4): both need a running page.
