# P3-PREP: recorded route anatomies, the 14 routes with no template

Package: P3-PREP (documentation only, no code, no content, no config touched).
Site: `contractors-ir35`. Date: 2026-09-12.

**What this file is.** `PHASE_PLAN.md` §C found template coverage of 15 of 29 public
routes (51.7%). The other 14 map to no template in the design system. The rule is that a
page type with no template gets its anatomy written down BEFORE its build package starts,
derived from the closest template plus `docs/property/DESIGN_SYSTEM.md` §0, and the
fidelity reviewer then reviews against the recorded anatomy rather than against nothing.
This file is that record for all 14. A route whose anatomy block is empty when its package
launches is a blocked package; none of the 14 is blocked after this file.

**What this file is not.** It is not a licence to change copy, claims or data. Where a
route carries a live defect it is FLAGGED and left alone; fixing it is the builder's
decision inside its own phase, with its own evidence.

## Sources read

| Source | Role |
|---|---|
| `docs/property/DESIGN_SYSTEM.md` §0 | the ten-part page contract, estate-wide, verbatim, never forked |
| `docs/contractors-ir35/DESIGN_DELTA.md` | this site's sanctioned deviations; anything not in it is a defect, not a flavour choice |
| `docs/contractors-ir35/_port/PHASE_PLAN.md` §C.1, §C.2 | the coverage census and the phase that owns each route |
| `docs/contractors-ir35/_port/P0A_INVENTORY.md` | route inventory |
| `docs/contractors-ir35/_port/sweep_baseline.json` | the internal-link floor, 157 URLs / 2755 links, sha `18b4f25f39cd0c4aa084e582d69a87c8a10710ac` |

## Instrument identity, asserted before any served claim below

Per the standing rule, the served page title was asserted before either server was
trusted. No server was started by this package and nothing was written to either.

```
curl -s http://localhost:3621/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>   (phase 1 build)
curl -s http://localhost:3611/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>   (pre-port)
```

Both are this site and not a sibling. `next build` and `next start` were NOT run: six
agents share one `.next`.

---

## §A. The constraints that bind every one of the 14 anatomies

Written once here and referenced by every section, because repeating them fourteen times
invites one of them being quietly dropped in the fourteenth.

1. **One radius: `rounded-xl` with a hairline ring, `ring-1 ring-slate-200/70`.**
   `rounded-2xl` with `border border-slate-200` is the pre-redesign recipe and is a
   defect. Census today across the site: `rounded-xl` 33, `rounded-2xl` 30,
   `rounded-full` 25, `rounded-lg` 24 (`grep -roh "rounded-[a-z0-9]*" src | sort | uniq -c`,
   quoted from DESIGN_DELTA §1). Eight of the 14 routes carry a `rounded-2xl` or
   `rounded-lg` surface today; each is named in its section.
2. **The page measure IS the container. No body clamps.** `siteContainerLg`
   (`max-w-6xl`). No `max-w-3xl`, `max-w-4xl` or `max-w-5xl` wrapper round a body, a
   table, an FAQ or a link list. The one narrow measure allowed is hero copy and a
   standfirst above a full-width grid. If a form looks lost at full width the fix is a
   two-column section, never a clamp (§0.1).
3. **No em-dashes in user-facing copy.** Baseline dash count for all 14 routes is 0
   (`sweep_baseline.json` `dashes`), so this is a floor to hold, not a fix to make.
4. **No published price for our own services**, and no fee promise. See the `/about`
   flag.
5. **No turnaround or response-time promise.** "Shortly", "within X hours", "same day"
   are all out. Present copy on `/thank-you` and `/complete` says "shortly": flagged.
6. **No claim to a qualification, a regulator, professional indemnity insurance or
   regulated work** for us. Naming Aswatax as Chartered Tax Advisers on a POST-SUBMIT
   surface is a statement about a third party and is the estate's sanctioned pattern; it
   stays exactly where it is and never moves pre-submit.
7. **First-person "we do the work" voice STAYS**, per the owner's positioning ruling of
   2026-09-12. Do not rewrite these pages into a referral/introducer voice.
8. **Every call to action keeps `data-cta`, `data-cta-placement` and `data-cta-goal`,
   attribute names included.** They feed `vw_cta_performance`; dropping one silently kills
   a funnel row and nothing goes red.
   **Measured state, and it is worse than "keep them":** `grep -rl "data-cta" src --include=*.tsx`
   returns exactly 8 files, all of them chrome or intent surfaces (`SiteHeader`,
   `StickyCTA`, `SpecialistWidget`, `ReturningBar`, `DeepScrollModal`, `NextStepOffer`,
   `PremiumCalculator`, `ResultGateModal`). `LeadForm`, `MiniCapture` as mounted by
   `ResourceGate`, `BookingPicker`, `DetailsForm` and every in-body `<Link>` on these 14
   routes emit NO `data-cta` at all. Served proof: every one of the 14 renders exactly
   `data-cta="header_book"` plus `data-cta="specialist_widget"` and nothing else
   (`curl -s http://localhost:3621<route> | grep -o 'data-cta="[^"]*"' | sort | uniq -c`).
   So the rule binds two ways here: keep the two chrome attributes, and where the port
   replaces an in-body ask with the kit's `LeadCTAPanel`, the kit's triple arrives with
   it. Do not strip it to "match the page".
9. **Section grounds oscillate and are set explicitly.** Two touching sections never
   share a ground. Navy never touches navy: the footer is dark, so a full-bleed dark band
   can never be the last thing on a page. Canonical tail: panel, FAQ, footer (§0.1, §9).
10. **Every body section carries a visual** (§0.2). A wall of paragraphs is the
    pre-redesign template. The legal three and `/about` are the routes this bites.
11. **`ExampleFigureNote` on every visual carrying figures** (§0.3). The research three
    are the routes this bites, and see the carve-out there: their figures are sourced
    official data, not examples, so the note's wording is an owner call, not a builder's.
12. **Per DESIGN_DELTA §3 N5**, section rhythm moves from this site's
    `sectionY` = `py-16 sm:py-20 lg:py-28` / `sectionYLoose` = `py-20 sm:py-28 lg:py-36`
    to the standard `py-12 sm:py-16 lg:py-20`. Every section on every one of these routes
    gets shorter. That is expected, not a regression.
13. **Colour recipes bind one step darker on this site.** cyan-600 `#0891b2` measures
    3.68:1 as text on white AND as a ground under a white label, so every `primary-600`
    recipe binds at cyan-700 `#0e7490` (5.36:1). DESIGN_DELTA §2.
14. **Instrument rule for `var()`-themed files**: `browser_check.mjs` cannot resolve
    `var()` chains and falls back to white, reporting a pass it did not measure. Of these
    14 routes, `/resources/[topic]` is a `var()`-themed file (DESIGN_DELTA §6 H2). No
    contrast claim about it may cite instrument output; hand-compute against the resolved
    hex in `:root`.

### The link floor, and what the baseline number means

`sweep_baseline.json` was taken against port 3611 at sha `18b4f25f`. It holds 157 URLs,
2755 internal links, 219 CTAs, 14 em-dashes. The per-route `links` value is the floor each
route must still meet after the port: **never delete a crawlable internal link to make a
layout work** (§0.6, carve-out 5).

Five of the 14 are ABSENT from the baseline, because all five are `noindex` and out of the
sitemap the sweep walks: `/book`, `/complete`, `/thank-you`, `/embed`, `/embed/[slug]`.
For those, this file records the raw served `href="/..."` count from 3621 as an advisory
number only. It is NOT comparable to a baseline figure (the baseline de-duplicates and
does not count chrome the same way: `/about` reads 10 in the baseline and 25 raw hrefs
served). Treat the advisory number as "do not visibly lose links", not as a gate.

---

## §B. Route anatomies

### B1. `/about`

| | |
|---|---|
| Phase | 6 (package P6-1) |
| Closest template | **pillar, minus the lead panel.** Named in PHASE_PLAN §C.2 and it holds: the page is a dark eyebrow-and-h1 hero over a single prose body and one button, which is a pillar with its proof, scope and panel sections removed. |
| Link floor | **10** (`sweep_baseline.json` `links["/about"]`) |
| Source | `contractors-ir35/web/src/app/about/page.tsx`, 51 lines |

**What it renders today.** `sed -n '1,51p' src/app/about/page.tsx`. Two sections. Section
one: `bg-neutral-900` + `border-b border-neutral-200`, `py-16 sm:py-20`, inside
`siteContainerLg` an `.eyebrow` in `text-cyan-400` reading "About us", an h1 at
`max-w-3xl` ("We only work with contractors."), a standfirst at `max-w-2xl` in
`text-neutral-300`. Section two: `bg-white`, `siteContainerLg` + `sectionYLoose`, a
`max-w-3xl space-y-8` block of four paragraphs, then a single `btnPrimary` Link to
`/contact` labelled "Book a free call". Served confirmation:
`curl -s http://localhost:3621/about | grep -o "<title>[^<]*</title>"` returns
`About | Specialist Contractor Accountants | Contractor Tax Accountants`, HTTP 200.

**Anatomy under §0.**

- **Hero shape.** Dark full-bleed band, `siteContainerLg`, eyebrow rule + eyebrow,
  h1 at `max-w-3xl`, standfirst at `max-w-2xl`, and **a primary CTA that this page does
  not have today**. §0.5: "a page a reader can scroll to the bottom of without meeting an
  ask is not finished", and the hero carries the primary CTA. Add it.
- **Section order and rhythm.** hero (dark) → who we are and what we only do (white) →
  what specialism means in practice, as a card or status set, not prose (slate-50) →
  closing ask (`LeadCTAPanel`, full-bleed) → FAQ if authored (white) → footer. Grounds
  oscillate; nothing dark touches the footer.
- **Funnel order.** hook = hero ("we only work with contractors"). problem = the
  generalist-versus-specialist paragraph, which is already written. proof = the IR35 /
  salary-and-dividend / PSC-pension list, promoted out of prose into a card grid or a
  status set so the section carries a visual (§0.2). scope = "these are the core of what
  we do", as a deliverables band. ask = the panel.
- **Primary CTA.** Hero primary points at the on-page form: `href="#book"`, anchored on
  `<div id="book" className="scroll-mt-24">`. `scroll-mt-24` is load-bearing. Only the
  header CTA and the sticky banner leave for `/contact`.
- **Closing ask.** `LeadCTAPanel`, the full-bleed panel. Not a bare button, not a bare
  `LeadForm` in a coloured card.
- **Components.** dark hero band; `RelatedArticles` is NOT owed here; a card grid or
  status set for the proof section; `LeadCTAPanel`; `FaqSection` +
  `buildFaqPageJsonLd(faqs)` on the same array only if FAQs are authored.

**Carve-outs that must survive the port.**

- The **"we only work with contractors"** positioning sentence. It is the whole page and
  it is the owner's 2026-09-12 first-person voice ruling in one line.
- The **April 2021 off-payroll reference** and the "a generalist can read the guidance, we
  work with the rules as applied" distinction. That is the page's differentiator, not
  filler.
- The **`.eyebrow` set in Geist Mono** (DESIGN_DELTA §3 N3, recommendation: keep). It is
  this site's most distinctive typographic move.

**Live defects, FLAGGED not fixed.**

- **No canonical of its own.** `src/app/about/page.tsx` metadata sets no
  `alternates.canonical`. Served on 3621 the page still emits
  `rel="canonical" href="https://www.contractortaxaccountants.co.uk"`, i.e. the homepage,
  which excludes `/about` from Google exactly as `/for` is excluded. The root-layout fix
  is already in the working tree (`src/app/layout.tsx:32-35` now carries a
  `ponytail:` comment saying a root canonical "made /for, /about, /services, /contact and
  /ir35-status all canonicalise to the homepage and drop out of the index"), so 3621 is a
  build from before that fix. After it lands `/about` emits no canonical at all. **An
  indexable page owes a self-canonical**; P6-1 should confirm one exists rather than
  assume the other agent's fix covered it.
- **A fee claim.** Line 39: "We work on a fixed-fee basis. You know what you are paying
  before we start." No number is published, so this is not a published price, but it is a
  commercial promise about our fees and it is the same family as the Property `P1`
  `WhatToExpectCard` defect the delta forbids copying. **Owner call, not a builder's.**
  Do not silently keep it and do not silently delete it.
- **The only ask leaves the page** (`/contact`), and there is no on-page form. Fixed by
  the anatomy above, listed here because it is a live conversion defect today.
- **`sectionYLoose` and a `max-w-3xl` body clamp** on the prose block. The clamp is on a
  body, not a hero, so §0.1 removes it.

---

### B2. `/book`

| | |
|---|---|
| Phase | 6 (package P6-2) |
| Closest template | **capture page; `BookingPicker` is the body.** Named in PHASE_PLAN §C.2. The nearest shipped relative is `/contact` (`SlimHero` + capture), with the form swapped for the picker. |
| Link floor | **ABSENT from baseline** (noindex, not in sitemap). Advisory raw served count: 24 internal hrefs, all chrome. |
| Source | `src/app/book/page.tsx`, 58 lines |

**What it renders today.** One `bg-white py-16 sm:py-20` section, `siteContainerLg` then a
`mx-auto max-w-2xl` clamp, a centred h1 "Book your free IR35 review call", a centred
standfirst, then either `<BookingPicker token={token} />` when `?t=` carries a signed lead
token, or a `border-2 border-neutral-300 bg-neutral-50` fallback card telling the reader
the page needs the personal link from their email, with a `btnPrimary` to `/contact`.
Metadata sets `robots: { index: false, follow: false }`. Served:
`curl -s -o /dev/null -w "%{http_code}" http://localhost:3621/book` = 200, and the page
emits `<meta name="robots" content="noindex, nofollow">`.

**Anatomy under §0.**

- **Hero shape.** `SlimHero`: one dark band, eyebrow, h1, one-line standfirst. No stat
  strip, no photo, no motif hero. This is a transactional surface reached from an email,
  not a page anyone lands on cold.
- **Section order and rhythm.** slim hero (dark) → the picker, on white, at container
  measure with the picker itself two-column from `lg:` if it needs the width → nothing
  else. No related reading, no FAQ, no marketing band. A page whose whole content is a
  tool already satisfies §0.2 and needs nothing further.
- **Funnel order.** This route is the ask. hook and ask collapse into the h1; there is no
  problem/proof/scope stage and adding one would be padding a surface the reader has
  already converted on. §0.5 permits merging, never reordering.
- **Primary CTA.** The picker's own submit IS the primary CTA. There is no second ask on
  the page and no `#book` anchor, because the page is the anchor.
- **Closing ask.** None beyond the picker. Do NOT add a `LeadCTAPanel` here: it would ask
  a second time for something the reader is in the middle of giving.
- **Components.** `SlimHero`, `BookingPicker` (unchanged behaviour), the no-token
  fallback card as a white card with a hairline ring.

**Carve-outs that must survive the port.**

- **`?t=<signed lead token>` handling, and the no-token fallback.** The docstring at
  lines 7-12 is load-bearing: "nobody on our side attends a calendar: the lead is telling
  us when an accountant should call, and the act of booking is the contactability signal
  that promotes them for handoff." The picker is a lead-scoring instrument, not a
  calendar integration. Restyle it; do not re-model it.
- **`robots: { index: false, follow: false }`.** Keep. A token-gated page in the index is
  a leak.
- **The fallback's "use the contact form and we will arrange your review" escape.** A
  reader who lost their link must not hit a dead end.
- **No `data-cta` exists on the picker today.** If the port gives the fallback card a kit
  CTA, that CTA arrives with the full triple.

**Live defects, FLAGGED not fixed.**

- `border-2 border-neutral-300` on the fallback card: double-weight border, pre-redesign
  recipe, and square (`--radius: 0rem`, no `--radius-xl` derived). §A rule 1.
- `mx-auto max-w-2xl` is a body clamp inside `siteContainerLg`. §A rule 2.
- `siteConfig` is imported at line 4 and never used. Dead import, not design work, listed
  so the builder does not read it as meaningful.
- The h1 promises "An accountant will call you then" with no time qualifier, which is
  fine; the sibling copy on `/complete` and `/thank-you` says "shortly", which is not. See
  B3 and B4.

---

### B3. `/complete`

| | |
|---|---|
| Phase | 6 (package P6-2) |
| Closest template | **post-submit confirmation.** Named in PHASE_PLAN §C.2. Its shipped sibling is `/thank-you`; the two must be built together and must not diverge. |
| Link floor | **ABSENT from baseline** (noindex). Advisory raw served count: 24 internal hrefs, all chrome. |
| Source | `src/app/complete/page.tsx`, 127 lines |

**What it renders today.** One `bg-white py-16 sm:py-20` section, `siteContainerLg` then
`mx-auto max-w-2xl`, centred h1 "Complete your details" and standfirst, then a
four-way branch on the `?t=` profile token: no token → `NeedsLinkCard`; invalid or expired
token → an expired-link card; valid token and contact details already complete → a
`border-cyan-200 bg-cyan-50` "You are all set" card with a minted `/book?t=` link; valid
token and something missing → `<DetailsForm token missing={["name"|"phone"]} />`, which
only ever asks for the field(s) below floor and never for email. Metadata
`robots: { index: false, follow: false }`. Served: 200, `noindex, nofollow`.

**Anatomy under §0.**

- **Hero shape.** `SlimHero`, same recipe as `/book`. One dark band, eyebrow, h1,
  one-line standfirst.
- **Section order and rhythm.** slim hero (dark) → the branch body on white → nothing
  else. Whatever the branch resolves to is the page's only body section and it is a tool,
  so §0.2 is satisfied.
- **Funnel order.** hook and ask collapse, as on `/book`. The reader has converted; this
  page repairs one missing field.
- **Primary CTA.** Whatever the branch renders: `DetailsForm`'s submit, or the "Book a
  callback" link in the all-set card, or the `/contact` escape in the two failure cards.
  Exactly one ask per branch. Never two.
- **Closing ask.** None beyond the branch. No `LeadCTAPanel`.
- **Components.** `SlimHero`; `DetailsForm` unchanged; the three states as white cards
  with a hairline ring, differentiated by an icon and an eyebrow rather than by a tinted
  ground, so the `bg-cyan-50` / `bg-neutral-50` pair collapses into one card recipe.

**Carve-outs that must survive the port.**

- **All four branches.** A restyle that renders only the happy path ships a page that dead
  ends for an expired link. The reviewer checks all four by visiting `?t=` empty, `?t=junk`,
  and a valid token.
- **"the page only ever asks for the field(s) still below floor, never email"** (docstring
  lines 10-16). This is a data-minimisation position. `computeMissingContact` decides;
  the page must not start asking for everything because a two-field form looks tidier.
- **The minted `book` token handoff.** `mintLeadToken(verdict.leadId, "book")` inside a
  try/catch, with the button suppressed when minting fails. Keep the suppression: a
  "Book a callback" button that 404s on a missing token is worse than no button.
- **The best-effort `catch` around `adminSelect`** that falls through to asking for both
  fields. A restyle must not turn a database blip into an error page.

**Live defects, FLAGGED not fixed.**

- **A response-time promise.** Line 95-96: "An accountant from our partner network will be
  in touch **shortly**", and line 119-120 repeats it in the standfirst. §A rule 5 forbids
  a turnaround or response-time promise. Two instances on this page. Owner call on the
  replacement wording; the builder does not invent it.
- `mx-auto max-w-2xl` body clamp (§A rule 2).
- Square cards with plain `border`, no ring, no radius (§A rule 1), three instances.
- `siteConfig` imported at line 4, unused.
- **Voice check, not a defect:** "an accountant from our partner network" is a
  handoff/introducer voice, and the owner's 2026-09-12 ruling keeps the first-person "we
  do the work" voice. These two sentences are the only place on the 14 routes where the
  network framing surfaces pre-handoff. Flagged for the owner, NOT to be rewritten by the
  builder, because the lead-gen model's anonymised-handoff rules cut the other way and a
  design package is not the place to adjudicate it.

---

### B4. `/thank-you`

| | |
|---|---|
| Phase | 6 (package P6-2) |
| Closest template | **post-submit confirmation**, the same one as `/complete`, and the pair are built together. |
| Link floor | **ABSENT from baseline** (`robots: index:false, follow:true`, not in sitemap). Advisory raw served count: 26 internal hrefs. |
| Source | `src/app/thank-you/page.tsx`, 112 lines |

**What it renders today.** One `sectionY bg-white` section, `siteContainerLg`, a
`max-w-2xl` block containing: an endowed-progress `<ol>` of three steps (1 Enquiry
received, 2 Details received, both amber-500 filled; 3 Pick your callback time, neutral),
a `font-mono text-xs uppercase tracking-widest text-cyan-700` eyebrow "Received", an h1
"Thank you.", a paragraph naming Aswatax, then a branch on `?bt=`: with a booking token, a
bordered card wrapping `BookingPicker`; without, a "browse our IR35 guides" pair of links
(`/blog` primary, `/` secondary) and a `/contact` follow-up line. `?rt=` is validated by
`isSafeReturnPath` and then deliberately discarded (`void returnPath`). Metadata
`robots: { index: false, follow: true }`. Served: 200, `noindex, follow`.

**Anatomy under §0.**

- **Hero shape.** `SlimHero`, matching `/complete` exactly. The progress indicator sits
  INSIDE the hero, above the eyebrow, because it is orientation, not content.
- **Section order and rhythm.** slim hero with progress indicator (dark) → the branch body
  on white (picker, or the guides offer) → related reading on slate-50 in the no-token
  branch only → footer. No `LeadCTAPanel`: the reader has just submitted.
- **Funnel order.** The funnel has completed. What remains is the NEXT step: book a time,
  or read while you wait. hook = "Thank you.", ask = the picker. Do not re-run a problem
  or proof stage on a converted reader.
- **Primary CTA.** With `?bt=`: the picker. Without: "Browse IR35 guides" to `/blog`, and
  it stays a real `<a href>` so the link floor holds.
- **Closing ask.** The `/contact` follow-up line in the no-token branch. Keep it as a
  sentence, not a second button.
- **Components.** `SlimHero`; the three-step `<ol>` as-is structurally; `BookingPicker`;
  `RelatedArticles` is the right component for the "you might find our guides useful"
  branch if the port wants real cards there, and it emits `<a href>`, so it is
  link-positive.

**Carve-outs that must survive the port.**

- **The three-step endowed-progress indicator.** No template covers it. It is a
  deliberate behavioural device (steps 1 and 2 shown complete, step 3 pending) and
  dropping it is exactly the fidelity failure no gate catches, because it is not a link.
  Its `aria-hidden` connector rules stay `aria-hidden`.
- **The Aswatax paragraph, and its placement.** Naming Aswatax as "a firm of Chartered Tax
  Advisers" is a claim about a third party on a POST-SUBMIT surface. Per the estate rule
  this message is post-submit only and never pre-submit. It stays on this page, in this
  position, and does not migrate to any pre-submit surface during the port.
- **`isSafeReturnPath` validation of `?rt=`.** It is an open-redirect guard. It is
  currently `void`ed, so nothing consumes it; the guard stays even so, because the next
  person to use `rt` will reach for the existing helper.
- **`robots: { index: false, follow: true }`.** `follow: true` differs deliberately from
  `/book` and `/complete`: this page emits real links into the blog. Keep the asymmetry.

**Live defects, FLAGGED not fixed.**

- **A response-time promise.** Line 10, in the meta description: "a specialist contractor
  accountant will be in touch **shortly**". §A rule 5.
- `max-w-2xl` body clamp (§A rule 2).
- The picker card is square with a plain `border` and `shadow-sm` (§A rule 1).
- A hand-rolled mono eyebrow (`font-mono text-xs uppercase tracking-widest`) instead of
  the `.eyebrow` class every other page uses. Cosmetic divergence; the port unifies it.
- The page's whole body is `max-w-2xl` and left-aligned while `/book` and `/complete` are
  `max-w-2xl` and centred. The pair must not diverge; pick one in P6-2.

---

### B5. `/embed`

| | |
|---|---|
| Phase | 6 (package P6-3) |
| Closest template | **tool index, no chrome CTA.** Named in PHASE_PLAN §C.2. Its shipped relative is `/calculators` (the calculator index, phase 4), with the tool cards replaced by copyable snippets. |
| Link floor | **ABSENT from baseline.** Advisory raw served count: 36 internal hrefs, the highest of the five unswept routes, because it links every one of the 10 tools to `/calculators/<slug>`. |
| Source | `src/app/embed/page.tsx`, 155 lines |

**What it renders today.** Four sections. (1) `bg-neutral-900 py-14 sm:py-20` hero with an
`onDark` `Breadcrumb`, h1, a `max-w-2xl` standfirst, and a `text-neutral-400` condition
line requiring the "Powered by" attribution to stay. (2) `bg-white py-12 sm:py-16`, a
`max-w-3xl` "How to embed (2 steps)" ordered list plus the resize-script
`EmbedSnippet`. (3) `bg-[#fafaf7] py-12 sm:py-16`, one `rounded-2xl border-2` card per
tool from `allTools()` (10 tools), each with the tool name, a "Preview the full page"
link to `/calculators/<slug>`, the one-liner, and an `EmbedSnippet` of the iframe. (4)
`bg-white py-12 sm:py-16` containing a `mx-auto max-w-3xl bg-neutral-900 p-8` centred
partnership panel with a `btnPrimary` to
`/contact?utm_source=embed-gallery&utm_medium=site&utm_campaign=partnerships`. Served:
200, canonical `/embed`, no robots meta (so indexable), `data-cta="header_book"` only, and
notably NO `specialist_widget`, because `SpecialistWidget` and `StickyCTA` both no-op on
`/embed*` (`src/components/ui/StickyCTA.tsx:103`,
`src/components/support/SpecialistWidget.tsx:263`).

**Anatomy under §0.**

- **Hero shape.** Dark band, breadcrumb `onDark`, eyebrow, h1, standfirst at `max-w-3xl`,
  attribution condition as fine print. No hero CTA pointing at a lead form: this page's
  reader is a partner site, not a lead, and the ask is a partnership, not a review. This
  is the one route among the 14 where §0.5's "the hero carries a primary CTA to the
  on-page form" is deliberately not honoured, and the reason is recorded here so the
  reviewer does not read it as an omission.
- **Section order and rhythm.** hero (dark) → how to embed, two steps + resize snippet
  (white) → the tool list (slate-50) → partnership ask (white section, panel inside) →
  footer. Grounds oscillate; nothing dark touches the footer, because the panel sits
  inside a white section.
- **Funnel order.** hook = "add our free IR35 calculators to your site". problem = the
  implicit one, your readers leave to find a calculator. proof = the ten real tools, each
  with a live preview link. scope = the two-step instructions and the attribution
  condition. ask = the partnership panel.
- **Primary CTA.** The partnership panel's button, to `/contact` with its UTMs. It is the
  one on-page CTA that legitimately leaves the page, because there is no partnership form.
- **Closing ask.** The partnership panel, restyled to the `LeadCTAPanel` recipe but
  retaining its own copy and its `/contact` destination with UTMs intact.
- **Components.** `Breadcrumb` (`onDark`), `EmbedSnippet` (site-specific, keep), a card
  grid for the tools at `rounded-xl` + ring, `LeadCTAPanel` recipe for the tail.

**Carve-outs that must survive the port.**

- **`EmbedSnippet` and its copy affordance.** The page's entire value is copyable code.
  Whatever the restyle does to the card, the code block stays selectable, scrollable on a
  narrow screen (`overflow-x: auto` on its own container, never a body scroll), and
  monospaced.
- **The resize script, byte for byte.** `RESIZE_SNIPPET` listens for
  `ir35-embed-height` postMessages and sizes `iframe[src*="<domain>/embed/"]`. It is
  running in third-party pages today. Changing the message name or the selector breaks
  every live embed on the internet. Do not "tidy" it.
- **`iframeSnippet()` and `c.embedHeight` per tool.** The height comes from the registry.
- **The attribution condition** ("the only condition is that you leave the small Powered
  by line in place"). It is the licence. It pairs with the attribution link in B6 and
  neither survives without the other.
- **Ten `/calculators/<slug>` preview links.** This page is a meaningful internal-link
  emitter into the tools. §0.6.
- **The `utm_source=embed-gallery` UTMs** on the partnership CTA.
- **The no-op of `StickyCTA` and `SpecialistWidget` on `/embed*`.** Deliberate and it
  stays deliberate. Restyling the sticky must not accidentally re-enable it here.

**Live defects, FLAGGED not fixed.**

- `rounded-2xl border-2 border-neutral-200` on all ten tool cards (§A rule 1), plus
  `max-w-3xl` clamps on the instructions block and on the partnership panel (§A rule 2).
- The partnership panel is a dark box inside a white section, which is the correct shape,
  but `bg-neutral-900` on this site is the neutral-ramp near-black, not the estate navy.
  DESIGN_DELTA §3 N1 (adopt slate) resolves it; recorded here so P6-3 does not hand-pick a
  colour.
- A hard-coded `bg-[#fafaf7]` literal for the slate-50 band. DESIGN_DELTA §3 N2 moves the
  body ground to white and reserves `#fafaf7` for hero surfaces; this section is a body
  band, so it becomes the standard alternate ground, not cream.

---

### B6. `/embed/[slug]` (10 instances)

| | |
|---|---|
| Phase | 6 (package P6-3) |
| Closest template | **bare iframe document; chrome DELIBERATELY absent.** PHASE_PLAN §C.2 carries a standing warning on this route and requires its recorded anatomy to state "no PageShell" as a POSITIVE REQUIREMENT. This section states it. |
| Link floor | **ABSENT from baseline** (`noindex, nofollow`). Advisory raw served count: 24 internal hrefs, and see the defect below, because that number is itself the evidence of the defect. |
| Source | `src/app/embed/[slug]/page.tsx`, 51 lines. `dynamicParams = false`; `generateStaticParams` from `genericTools()`, 10 slugs (`grep -rhn "slug:" src/lib/calculators/tools/*.ts` = 10). |

**What it renders today.** A single `div.bg-white.p-3.sm:p-4` holding
`<CalculatorClient slug variant="embed" />`, a centred attribution `<a>` to
`<siteUrl>/calculators/<slug>?utm_source=partner-embed&utm_medium=iframe&utm_campaign=<slug>`
reading "Powered by **Contractor Tax Accountants** · specialist UK contractor accountants",
and `<EmbedAutoResize />`. Metadata: `robots: { index: false, follow: false }` and
`alternates.canonical` pointing at the indexable twin `/calculators/<slug>`.

**Anatomy under §0. This route is the documented exception to most of it.**

- **No PageShell. POSITIVE REQUIREMENT.** No `SiteHeader`, no `SiteFooter`, no skip link,
  no `StickyCTA`, no `SpecialistWidget`, no `ReturningBar`, no `DeepScrollModal`. This
  document renders inside a third party's iframe, and shipping our chrome into someone
  else's page is the failure this route exists to avoid.
- **Hero shape.** None. There is no hero. The tool is the first and only thing.
- **Section order.** tool → attribution → resize script. Nothing else, ever.
- **Funnel order.** The page runs NO funnel. Its single conversion mechanism is the
  attribution link, which carries the reader back to our own `/calculators/<slug>` where
  the funnel lives. §0.5's contract is satisfied by the canonical twin, not by this
  document.
- **Primary CTA.** The attribution link. It is a plain `<a target="_blank" rel="noopener">`
  and it must stay a real anchor: `target="_blank"` because we are inside someone's
  iframe and must not navigate their page.
- **Closing ask.** None. Do not add a `LeadCTAPanel`, a mini capture, or a sticky.
  Adding one here would be adding an interruptive surface inside a third party's page.
- **Components.** `CalculatorClient` with `variant="embed"`, `EmbedAutoResize`, the
  attribution anchor.
- **Measure.** The container is the partner's iframe width. `p-3 sm:p-4` is the whole
  layout. No `siteContainerLg`, no clamps.

**Carve-outs that must survive the port.**

- **`variant="embed"`** on `CalculatorClient`. There is a second rendering mode behind
  that prop and the full-page tool is not it.
- **`EmbedAutoResize`**, which posts the `ir35-embed-height` message the `/embed` page's
  resize script listens for. The two are one mechanism across two files.
- **The attribution link's exact UTMs** (`partner-embed` / `iframe` / `<slug>`). They are
  how partner traffic is attributed at all.
- **`dynamicParams = false`** and the 10-slug `generateStaticParams`.
- **`robots: noindex, nofollow` plus a canonical at `/calculators/<slug>`.** Two tools at
  one URL each is the point; the embed must never compete with its twin.
- **`noTrackPrefixes: ["/admin", "/embed"]`** in `src/app/layout.tsx`. Analytics do not
  run inside a partner's page. Keep.

**Live defect, FLAGGED not fixed. This is the largest single finding in this package.**

**The chrome is NOT absent today. It is shipped into every partner iframe.**
`PageShell` is mounted in the ROOT layout (`src/app/layout.tsx`, inside
`IntentProvider`), and there is exactly one layout file on the site:
`find src/app -name "layout.tsx"` returns `src/app/layout.tsx` only. There is no
`src/app/embed/layout.tsx`. So `/embed/[slug]` inherits the site header, the site footer
and the skip link. Only `StickyCTA` and `SpecialistWidget` opt out, by pathname.

Served proof, on the phase 1 build, title asserted first:

```
curl -s http://localhost:3621/embed/corporation-tax-calculator -o /tmp/e -w "%{http_code}"  -> 200
grep -o "<title>[^<]*</title>" /tmp/e   -> <title>Corporation Tax Calculator | Contractor Tax Accountants</title>
grep -o 'Skip to content' /tmp/e        -> Skip to content   (twice: sr-only link + focus copy)
grep -o '<footer' /tmp/e | wc -l        -> 1
grep -o 'data-cta="[^"]*"' /tmp/e       -> data-cta="header_book"
grep -o 'href="/[^"]*"' /tmp/e | wc -l  -> 24
```

Twenty-four internal links and a lead-generation CTA, rendering inside a recruitment
agency's page. PHASE_PLAN §C.2 assumes chrome is deliberately absent here; **it is not,
and the phase plan's premise is wrong on this one point.** P6-3 inherits this rather than
rediscovering it. The lazy fix is one file, `src/app/embed/layout.tsx`, rendering
`{children}` and nothing else, which takes the route out of `PageShell` without touching
`PageShell` or any sibling. Not done in this package: this package writes documentation
only.

---

### B7. `/research`

| | |
|---|---|
| Phase | 6 (package P6-4) |
| Closest template | **hub index over 3 children.** Named in PHASE_PLAN §C.2. Its shipped relatives are `/locations` and `/for`, both `CoverageCards` indexes, and the locations template is the one to follow for the chrome (see the locations rule in §C below). |
| Link floor | **13** (`sweep_baseline.json` `links["/research"]`) |
| Source | `src/app/research/page.tsx`, 91 lines |

**What it renders today.** Two sections. (1) `bg-neutral-900 py-12 sm:py-16` hero with an
`onDark` `Breadcrumb` (Home / Research), h1 "Contractor economy research and data", a
`max-w-3xl` standfirst ending "Free to read and cite with attribution". (2)
`bg-white py-10 sm:py-14`, a `grid gap-6 sm:grid-cols-2` of three `rounded-2xl border`
Link cards, each carrying a large derived stat in `text-cyan-700`, a stat label, the report
title, a blurb, and an "Updated <month>" line. Every stat and every blurb is INTERPOLATED
from the three JSON snapshots at build time
(`@/data/uk-contractor-index.json`, `-survival-`, `-insolvency-`), not typed. Served: 200,
canonical `/research`, no robots meta.

**Anatomy under §0.**

- **Hero shape.** Locations-template chrome: navy hero, breadcrumb `onDark`, eyebrow rule
  + eyebrow, h1, standfirst at `max-w-3xl`, and a hero primary CTA to the on-page form
  (`href="#book"`, `scroll-mt-24`), which this page does not have today.
- **Section order and rhythm.** navy hero → white body carrying the three report cards at
  container measure → a closing CTA panel pointing at the on-page form → footer. The
  locations template's "related articles" slot has no natural content on a three-child
  hub; if P6-4 wants one, it is `RelatedArticles` over the blog's IR35 category, and it is
  link-positive, so it is permitted but not required.
- **Funnel order.** hook = the hero promise, original sourced data. problem = implicit,
  the contractor market is changing under you. proof = the three cards, each led by a real
  derived number. scope = merged into the cards. ask = the closing panel.
- **Primary CTA.** Hero primary to `#book`. Header CTA and sticky are the only asks that
  leave for `/contact`.
- **Closing ask.** `LeadCTAPanel`, full-bleed, inside the page so the navy-never-touches-
  navy tail holds: panel, then footer.
- **Components.** `Breadcrumb`, a three-up card grid at `rounded-xl` + `ring-1`,
  `LeadCTAPanel`. The stat on each card is a direct-labelled value, satisfying §0.3's
  direct-labelling rule without a chart.

**Carve-outs that must survive the port.**

- **Every card stat is DERIVED from the snapshot JSON at build time**, never typed
  (§0.2 "derive, never type"). `cti.headline.all_contractor_cos_ttm`,
  `survival.headline.latest_5yr_contractor_pct`,
  `insolvency.headline.captured_share_pct`. A restyle that hard-codes a number to make a
  card fit is a claims defect, not a design defect, and it is the exact failure the estate
  claims-integrity programme exists for.
- **The "Updated <month>" line on each card**, also derived (`meta.incorporations_settled_through`,
  `meta.release_date`, `meta.data_through`). A data asset without a currency stamp is a
  liability.
- **"Free to read and cite with attribution."** It is the licence under which these pages
  earn citations, which is the whole reason the research estate exists.
- **Three internal links to the three children.** The hub is these pages' only navigational
  parent: `/research` appears in NEITHER `navigation[]` NOR `footer_links[]`
  (DESIGN_DELTA §7), so these three links plus the sitemap are the entire crawl path.

**Live defects, FLAGGED not fixed.**

- `rounded-2xl border border-neutral-200` on all three cards (§A rule 1).
- **`text-neutral-400` on the "Updated" line**, which is `--ink-whisper`'s ramp step and
  measures 2.38:1 on `#fafaf7` / about 2.5:1 on white. **This is a live contrast failure
  and it is one of the UNVERIFIED `--ink-whisper` call sites DESIGN_DELTA §2 asked a later
  phase to find.** Recorded here as FOUND: `src/app/research/page.tsx:83`. The floor is
  4.5:1 and the estate answer is slate-500, never slate-400 (§0.7).
- No hero CTA and no on-page ask anywhere. A reader can scroll the whole hub without
  meeting one (§0.5).
- `/research` is absent from both nav lists (DESIGN_DELTA §7). Not design work for P6-4;
  the fix is the phase 2 Tools nav group.

---

### B8. `/research/uk-contractor-index`

| | |
|---|---|
| Phase | 6 (package P6-4) |
| Closest template | **data-journalism article.** Named in PHASE_PLAN §C.2. The nearest shipped relative is the blog post template (`BlogPostRenderer`), which is where the always-open `<dl>` FAQ pattern and the mid-article capture rhythm already live. |
| Link floor | **14** (`sweep_baseline.json`) |
| Source | `src/app/research/uk-contractor-index/page.tsx`, 544 lines. Charts: `src/components/research/ContractorIndexCharts.tsx` (3 chart instances). Data: `src/data/uk-contractor-index.json`. Also owns a child route `src/app/research/uk-contractor-index/data` (CSV download). |

**What it renders today.** Three JSON-LD blocks emitted first (`buildArticleJsonLd`,
`buildDatasetJsonLd`, `buildFaqJsonLd`, all over the same arrays the page renders). Then a
`bg-neutral-900 py-12 sm:py-16` hero: `onDark` breadcrumb (Home / Research / UK Contractor
Index), a cyan-300 eyebrow, an h1 built from `HEADLINE_SENTENCE`, a `max-w-3xl` standfirst,
a conditional amber placeholder-build warning, and a 4-up `Stat` grid of derived headline
figures in `rounded-xl bg-white/5 ring-1 ring-white/10` tiles. Then a
`bg-white py-10 sm:py-14` body clamped to `max-w-4xl`: a "Key facts" panel, then a run of
`<Section id>` blocks (each `scroll-mt-24`, separated by `border-t`, h2 + content) carrying
the charts, SIC-code tables (`DivisionRows`), a sources list with `rel="nofollow"`
outbounds, a "Download the incorporation data (CSV)" link to `<PAGE_PATH>/data`, a
citation-licence line, then a conversion card and an FAQ block. Served: 200, canonical
`/research/uk-contractor-index`, no robots meta, `data-cta="header_book"` +
`specialist_widget` only.

**Anatomy under §0.**

- **Hero shape.** Navy hero, breadcrumb `onDark`, eyebrow, h1 (the headline sentence, and
  it is derived), standfirst, the derived stat strip, and a hero primary CTA to `#book`
  which the page does not have today. The stat tiles are already `rounded-xl` + ring and
  are the correct recipe; they are the one surface on this route that needs no change.
- **Section order and rhythm.** navy hero with stat strip → key facts → the numbered
  `<Section>` run, alternating grounds white / slate-50 rather than the current unbroken
  white with hairline rules → charts and tables inside their sections → method and sources
  → the ask → FAQ → footer. Canonical tail: panel, FAQ, footer.
- **Funnel order.** hook = the headline sentence and the stat strip. problem = the reform
  overlay, what the two off-payroll reforms did to formations. proof = the charts, the
  tables and the sources, which is the strongest proof section on the site. scope = the
  conversion card's "whether that is right for you turns on your IR35 status". ask = the
  panel.
- **Primary CTA.** Hero primary to `#book`. The conversion card's form is the on-page
  form; its anchor is `<div id="book" className="scroll-mt-24">`. Every `<Section>` on
  this page already sets `scroll-mt-24`, so the pattern is established here, not imported.
- **Closing ask.** `LeadCTAPanel` replacing the present gradient card. §0.5 is explicit:
  **no bare `LeadForm` in a coloured card, ever**, and that is exactly what line 489 is.
- **Components.** `Breadcrumb`, `Stat` tiles, `ContractorIndexCharts` (3 instances) each
  with its `ChartDataTable`, `DivisionRows` tables, `LeadCTAPanel`, `FaqSection` +
  `buildFaqPageJsonLd` on the same `faqs` array (the page already builds its FAQ JSON-LD
  from that array, so this is a component swap, not a data change).

**Carve-outs that must survive the port.**

- **The data and the charts stay.** Per the established research rule: a research
  data-asset page KEEPS its data and its chart components. The port restyles the frame.
- **The charts re-ramp through `--chart-1..5`, never by hand-recolouring SVGs.**
  `--chart-1..5` do not exist in `globals.css` today (DESIGN_DELTA §1: "chart tokens
  ABSENT"), so defining them is port work, and the hand-picked hexes in
  `ContractorIndexCharts.tsx` lines 16-21 (`#0e7490`, `#67e8f9`, `#b45309`, `#e5e7eb`,
  `#737373`) are what they replace.
- **The nine charts' screen-reader data tables are DONE and must not be undone.**
  `grep -rn "ChartDataTable" src/components/research/*.tsx` returns 8 call sites across
  the three research files (ContractorIndex 3, Insolvency 3, Survival 2), plus the
  component itself at `src/components/research/ChartDataTable.tsx`. The ninth chart of
  DESIGN_DELTA §6 H3 is `calculators/premium/PremiumBarChart.tsx`, which is phase 4's, not
  P6-4's. A restyle that re-wraps a chart in `role="img"` and drops the `sr-only` table
  re-opens a closed fix.
- **All three JSON-LD blocks**, and the invariant that each is built from the SAME array
  the page renders. Article, Dataset and FAQPage. The Dataset block is what makes this a
  citable data asset.
- **The `/data` CSV child route** and its in-body link. It is a crawlable link and a
  deliverable.
- **`rel="nofollow"` on the outbound sources list.** Deliberate.
- **The citation licence line** ("free to cite and republish with attribution") and the
  **"this page is a data summary and does not constitute tax advice"** disclaimer. The
  second is a compliance line: it stays, and it is the reason this page can publish
  figures without them reading as advice.
- **The placeholder-build warning band.** It renders only when `isPlaceholder`. It is the
  guard that stops preview figures being cited as real. Keep the condition, restyle the
  band.
- **Derived everything.** The h1, the stats, the key facts, the table rows and the blurb
  are all interpolated from the snapshot. Nothing on this page is typed. Keep it that way.

**Live defects, FLAGGED not fixed.**

- **A bare `LeadForm` in a coloured gradient card**
  (`rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white`), which
  §0.5 forbids by name, and which also breaks §A rules 1 and 8 (no `data-cta` triple).
- **A hand-rolled FAQ** (h2 + h3/p pairs) while `buildFaqJsonLd(faqs)` asserts the same
  content to crawlers. The JSON-LD is truthful here, because the answers ARE in server
  HTML, so this is not the Property `P2` defect; it is the "never a hand-rolled `dl`"
  half of §0.1. Swapping to `FaqSection` must NOT introduce a Radix accordion without
  `forceMount`: DESIGN_DELTA §4 P2 makes the always-open pattern binding on this site.
- `max-w-4xl` body clamp on the whole article (§A rule 2), and `rounded-2xl` on the key
  facts panel and the conversion card (§A rule 1).
- **No `ExampleFigureNote`** on any of the three charts or the tables. §0.3 requires it on
  every visual carrying figures, including statutory ones. **But these figures are neither
  examples nor statutory: they are sourced counts from Companies House.** Captioning
  sourced open data as "example figures displayed" would be false. This is a real conflict
  between §0.3 and the research carve-out, it is NOT resolvable by a builder, and it is
  raised as an owner question in §D below.
- No hero CTA (§0.5).

---

### B9. `/research/uk-contractor-insolvency-index`

| | |
|---|---|
| Phase | 6 (package P6-4) |
| Closest template | **data-journalism article**, the same as B8, and the three research articles are built as one family in one pass. |
| Link floor | **14** (`sweep_baseline.json`) |
| Source | `src/app/research/uk-contractor-insolvency-index/page.tsx`, 427 lines. Charts: `src/components/research/ContractorInsolvencyCharts.tsx`, 3 instances, 3 `ChartDataTable` call sites. Data: `src/data/uk-contractor-insolvency-index.json`, sourced from Insolvency Service open data. |

**What it renders today.** Structurally the same shape as B8: JSON-LD, navy hero with
breadcrumb and derived stat strip, white clamped body of `<Section>` blocks carrying charts
and tables, sources, conversion card, FAQ. Served: 200, canonical
`/research/uk-contractor-insolvency-index`, no robots meta.

**Anatomy under §0.** Identical to B8, section for section. The three research articles
share one anatomy and any divergence between them after the port is itself the fidelity
failure. Hero: navy, breadcrumb `onDark`, eyebrow, derived h1, standfirst, derived stat
strip, hero primary to `#book`. Body: alternating grounds, container measure, charts with
their data tables, method and sources, `LeadCTAPanel`, `FaqSection` +
`buildFaqPageJsonLd`, footer.

**Carve-outs that must survive the port.**

- All of B8's carve-outs apply verbatim: data and charts stay, `--chart-1..5` re-ramp
  only, the three `ChartDataTable`s stay, the JSON-LD trio stays over the same arrays,
  `rel="nofollow"` sources, citation licence, "not tax advice" line, derive-never-type.
- **Route-specific: the captured-share framing.** The page's headline figure is the share
  of SIC Section J+M insolvencies sitting in the specific IT, consultancy and engineering
  divisions this site tracks. That narrowing IS the page's original contribution over the
  raw official release, and the sentence that explains the narrowing must survive. Without
  it the page is a re-publication of someone else's statistic.
- **Route-specific: insolvency is the site's one genuinely negative subject.** §0.3's
  colour rule binds hardest here: red for a criminal track, amber where a duty bites,
  slate for neutral. Do not paint rising insolvencies in the brand cyan because it matches
  the page.

**Live defects, FLAGGED not fixed.** Same family as B8: bare `LeadForm` in a coloured
card, hand-rolled FAQ beside its JSON-LD, `max-w-4xl` body clamp, `rounded-2xl` panels, no
`ExampleFigureNote` and the §D conflict behind it, no hero CTA. Each verified by reading
the file; none fixed here.

---

### B10. `/research/uk-contractor-survival-index`

| | |
|---|---|
| Phase | 6 (package P6-4) |
| Closest template | **data-journalism article**, as B8 and B9. |
| Link floor | **14** (`sweep_baseline.json`) |
| Source | `src/app/research/uk-contractor-survival-index/page.tsx`, 415 lines. Charts: `src/components/research/SurvivalIndexCharts.tsx`, **2** instances, 2 `ChartDataTable` call sites. Data: `src/data/uk-contractor-survival-index.json`, sourced from ONS Business Demography birth-cohort data. |

**What it renders today.** The same family shape: JSON-LD, navy hero with derived stat
strip, clamped white body of `<Section>` blocks, two charts, cohort tables, sources,
conversion card, FAQ. Served: 200, canonical `/research/uk-contractor-survival-index`, no
robots meta.

**Anatomy under §0.** Identical to B8 and B9. Two charts rather than three; the section
rhythm absorbs that without a layout change, because sections are ordered by argument, not
by chart count.

**Carve-outs that must survive the port.**

- All of B8's carve-outs apply verbatim.
- **Route-specific: the against-all-industries comparison.** The page's claim is
  comparative, contractor-sector survival against the all-industries average, and §0.2's
  "the shape comes from the claim" binds: a comparison is not a grid of equivalent things.
  Whatever the two charts are today, the restyle must not flatten a comparison into a
  card grid.
- **Route-specific: the birth-cohort framing.** "Of the <year> birth cohort still active
  after 5 years" is a precise statistical statement. It is easy to restyle into "survival
  rate" and lose the cohort, which would make the number wrong. It stays exact.

**Live defects, FLAGGED not fixed.** Same family as B8. No route-specific additions found.

---

### B11. `/resources/[topic]` (3 instances: `ir35`, `structure`, `pay-planning`)

| | |
|---|---|
| Phase | 6 (package P6-5) |
| Closest template | **gated long-form guide.** Named in PHASE_PLAN §C.2, and the name is now historical: the email gate was retired 2026-07-18 estate-wide. The nearest shipped relative is the blog post template. |
| Link floor | **11 each** (`sweep_baseline.json`: `/resources/ir35` 11, `/resources/structure` 11, `/resources/pay-planning` 11) |
| Source | `src/app/resources/[topic]/page.tsx`, 139 lines. Content: `content/resources/{ir35,structure,pay-planning}.md`. Capture: `src/components/resources/ResourceGate.tsx` wrapping `MiniCapture` with `formId="resource_block"`. |

**What it renders today.** One `<article className="bg-white py-12 sm:py-16">`,
`siteContainerLg` then a `mx-auto max-w-3xl` clamp. Inside: a guide header (a
`var(--accent)` eyebrow "Contractor Tax Accountants guide", h1 from the guide title, a
summary, a tax-year and last-reviewed line, and a direct `download` anchor to the model
xlsx where one is enabled), a bordered "Contents" table-of-contents `<nav>` built from the
guide's own headings, the guide body injected via `dangerouslySetInnerHTML` into a
`prose prose-slate max-w-none` block, and at the foot `<ResourceGate topic>`, which renders
`MiniCapture` in a `rounded-2xl border-l-4 border-cyan-700 bg-neutral-50` card. Served:
200, canonical `/resources/ir35`, **and `<meta name="robots" content="noindex, follow">`**.

**Anatomy under §0.**

- **Hero shape.** Navy hero band with an eyebrow, the guide title as h1, the summary as
  standfirst, and the currency stamp (tax year, last reviewed) as hero fine print. Today
  there is no hero at all: the page opens on white with a bordered header block. The xlsx
  download button is a hero secondary action.
- **Section order and rhythm.** navy hero → contents nav (slate-50, and it is a real
  in-page visual, satisfying §0.2 for that band) → guide body on white at container
  measure → the capture block → footer. The body is injected HTML, so the alternating
  grounds apply to the frame, not to the injected markup.
- **Funnel order.** hook = the guide title and summary. problem and proof = the guide body
  itself, which is authored content this package does not touch. scope = the
  `MiniCapture` blurb ("a specialist will confirm the numbers for your contract and the
  most efficient next step"). ask = `ResourceGate`.
- **Primary CTA.** `ResourceGate` at the foot is the on-page form and therefore the
  `#book` target. A hero primary pointing at it is owed (§0.5) and absent today.
- **Closing ask.** `ResourceGate` / `MiniCapture`, restyled to the tiered mid-article
  capture recipe (DESIGN_DELTA §5a: RESTYLE, one of the ten live surfaces; the port adds
  none).
- **Components.** navy hero, ToC `<nav>`, `prose` body, `ResourceGate`. The xlsx anchor
  keeps its `download` attribute.

**Carve-outs that must survive the port.**

- **The `var()` token theming is a HAZARD, not a style.** This file is one of
  DESIGN_DELTA §6 H2's thirteen `var()`-themed files (`--accent`, `--accent-strong`,
  `--border`, `--surface-elevated`, `--ink`, `--ink-soft`, `--muted`, and the file's own
  header comment at lines 13-15 records a past token-hardening pass). **No contrast claim
  about this route may cite `browser_check.mjs`**: it cannot resolve `var()` chains and
  falls back to white, reporting a pass it did not measure. Hand-compute against the
  resolved hex in `:root`. A phase log that quotes the instrument for this file is
  rejected.
- **`dynamicParams = false` + `publishedGuideTopicsWithFile()`**: only guides both enabled
  in the registry AND present on disk are pre-rendered; anything else 404s. That is a
  deliberate guard against publishing an empty guide.
- **The xlsx download**, gated on `isXlsxEnabled(resource)` and `resource.xlsx`. Where a
  model exists it downloads direct, with no gate. The de-gate decision of 2026-07-18 is
  the reason; do not re-gate it as a conversion idea.
- **The ToC built from `guide.headings`**, derived from the content, never hand-listed.
  It is also the page's only in-body link cluster below chrome.
- **The version / last-reviewed stamp.** A tax guide without a currency stamp is a
  liability.
- **`formId="resource_block"` and the `[Resource block: <topic>]` message prefix.** They
  are how these leads are attributed at all. Note for the builder: the estate has a
  standing watch on `resource_block` producing zero leads on a sibling site, so this form
  id is exactly the thing not to rename during a restyle.
- **`MiniCapture` reads `--brand-primary-text`.** DESIGN_DELTA §5a: six of the ten capture
  surfaces wrap `MiniCapture`, so that token is load-bearing on this site. Bound to
  cyan-800 it measures 7.27:1; bound to cyan-600 the consent link and the "Step N of 2"
  eyebrow would fail.

**Live defects, FLAGGED not fixed.**

- **`noindex, follow` is CORRECT and current, not a defect.** Verified served on 3621:
  `curl -s http://localhost:3621/resources/ir35 | grep -o '<meta name="robots"[^>]*>'`
  returns `<meta name="robots" content="noindex, follow"/>`. The parallel package F5
  landed the fix: the frontmatter `noindex` flag is now modelled and honoured
  (`generateMetadata` line 44) and the three URLs are out of the sitemap. DESIGN_DELTA §6
  H5 described the pre-fix state. **P6-5 must not "tidy" this in either direction**; the
  owner confirmation is question 6 of the delta.
- **The three guides' link floor of 11 each is now measured against `noindex` pages.**
  They are still `follow`, so they still pass equity, but a crawler reaching them depends
  entirely on in-body links from elsewhere, because **`/resources` does not exist**:
  `curl -s -o /dev/null -w "%{http_code}" http://localhost:3621/resources` returns
  **404**, and `/resources` appears in neither `navigation[]` nor `footer_links[]`
  (DESIGN_DELTA §7). Building the missing hub is priced in the delta at 0.25 day and is
  GATED on owner question 6, because a hub pointing at noindexed pages is a contradiction.
  Not P6-5's call to make unasked.
- `mx-auto max-w-3xl` body clamp (§A rule 2), `rounded-2xl` + `border-l-4` on the capture
  card and `rounded-lg` on the ToC (§A rule 1).
- `text-[var(--muted)]` on the currency stamp. `--muted` is not in DESIGN_DELTA §2's
  measured table; it is adjacent to `--ink-whisper` (2.38:1, a text failure). **UNVERIFIED:
  the resolved hex of `--muted` and its ratio on this page's ground were not measured by
  this package.** P6-5 hand-computes it before shipping, per the H2 rule above.
- The whole page is one `<article>` with no `<section>` structure, so §0.1's ground
  oscillation has nothing to oscillate between. The anatomy above supplies the sections.

---

### B12. `/privacy-policy`

| | |
|---|---|
| Phase | 6 (package P6-6) |
| Closest template | **legal prose.** Named in PHASE_PLAN §C.2. No template covers it and none should: the nearest relative is the `/contact` `SlimHero`, used for chrome only. |
| Link floor | **10** (`sweep_baseline.json`) |
| Source | `src/app/privacy-policy/page.tsx`, 241 lines, 11 numbered `<h2>` sections |

**What it renders today.** One `<section className="bg-white">` wrapping
`contentNarrow` (`mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0`) plus
`sectionYLoose`, an h1 "Privacy policy", a `text-neutral-500` "Last updated: 10 August
2026" line, then a `prose-blog mt-10 space-y-6` block of 11 numbered sections: who we are
(data controller), what we collect, why, lawful basis, who we share with, retention,
your rights, cookies and analytics, security and international transfers, changes, contact.
Served: 200, canonical `/privacy-policy`, no robots meta.

**Anatomy under §0. The legal three are the documented exception to §0.2 and §0.5.**

- **Hero shape.** `SlimHero`: navy band, eyebrow ("Legal"), h1, and the last-updated date
  as hero fine print rather than as a line stranded above the body. No CTA in the hero.
- **Section order and rhythm.** slim hero (dark) → the numbered prose at container
  measure on white → footer. The eleven `<h2>`s keep their numbering and their order,
  which is a legal reading order, not a design one.
- **Funnel order. This page runs NO funnel, deliberately.** §0.5 says a page that informs
  and does not convert is half-built; a privacy policy that converts is a dark pattern.
  Recorded as a positive exception so the fidelity reviewer does not file "no hero CTA"
  as a defect on the legal three.
- **Primary CTA.** None. The only asks on the page are the chrome's (`header_book`,
  sticky, specialist widget), and the in-body `/contact` link in section 11, which is a
  rights-request route, not a conversion.
- **Closing ask.** None. **Do not add a `LeadCTAPanel` to a privacy policy.** The page
  ends on section 11 and then the footer.
- **§0.2 "every section carries a visual" does not apply.** Legal prose is prose by
  design; a figure beside a lawful-basis clause would be decoration, and §0.3's colour
  rule says colour is meaning, never decoration. The one permitted structure is a table
  where the source content is already tabular (retention periods, cookie categories,
  recipients), because a table is the shape of that claim.
- **Components.** `SlimHero`, the `prose-blog` block, optional tables. Nothing else.

**Carve-outs that must survive the port.**

- **Every word of the eleven sections, and their numbering.** This is a published legal
  notice under UK GDPR and the DPA 2018. A design port does not edit it, reorder it,
  summarise it or "tighten" it. If the restyle cannot accommodate a clause, the restyle
  changes.
- **The last-updated date, unchanged.** Do not touch it: the date asserts when the policy
  last changed, and a restyle is not a change to the policy. Re-dating it would be a false
  claim.
- **The data-controller identification** (`siteConfig.company.legalName` trading as
  `siteConfig.name`), interpolated from config, never typed.
- **The `/contact` link in section 11.** It is the rights-request route and its removal
  would be a compliance defect as well as a link-floor breach.
- **The cookies and analytics section (8).** It must stay consistent with the live
  opt-out posture (`posture="opt-out"`, `storagePrefix="cfp"` in `src/app/layout.tsx`) and
  with the estate's locked rule that no new disclosures are added to sites that lack them.
  Restyle only; do not add a new consent surface to make the page look complete.

**Live defects, FLAGGED not fixed.**

- **`contentNarrow` is a `max-w-3xl` body clamp** and it is the §0.1 violation in its
  purest form: the container IS the measure. Note the counter-argument the builder will
  meet, and the answer: long legal prose genuinely reads better at a narrow measure, and
  §0.1's answer is that the fix is a two-column section (prose plus a sticky section
  index), never a clamp. A ToC rail built from the eleven `<h2>`s is the lazy version of
  that and it is link-positive.
- `sectionYLoose` on a page whose rhythm is already long (§A rule 12).
- No `<h2>` anchors and no `scroll-mt-24`: an eleven-section legal document with no
  linkable clauses. DESIGN_DELTA's appendix records "the uniform absence of `scroll-mt-*`
  across all 6 anchor targets" as UNVERIFIED pending whether the header is sticky or
  fixed; this route adds eleven more headings with no id at all.

---

### B13. `/terms`

| | |
|---|---|
| Phase | 6 (package P6-6) |
| Closest template | **legal prose**, identical to B12, and the legal three are built as one family in one pass. |
| Link floor | **10** (`sweep_baseline.json`) |
| Source | `src/app/terms/page.tsx`, 136 lines, 13 numbered `<h2>` sections |

**What it renders today.** The same frame as B12: `<section className="bg-white">`,
`contentNarrow` + `sectionYLoose`, h1 "Terms of use", a last-updated line, a
`prose-blog mt-10 space-y-6` block of 13 numbered sections: about us, no advice provided
on the Site, accuracy and changes, acceptable use, intellectual property, third-party
links, limitation of liability, disclaimer of warranties, indemnity, governing law,
changes, severability, contact us. Two in-body `/contact` links (sections 1 and 13), both
`text-cyan-800 underline`. Served: 200, canonical `/terms`, no robots meta, title
`Terms of use | Contractor Tax Accountants`.

**Anatomy under §0.** Identical to B12, section for section, including the positive
exception that this page runs no funnel and carries no closing ask. Slim navy hero,
numbered prose at container measure, footer. The thirteen `<h2>`s keep their numbering and
order.

**Carve-outs that must survive the port.**

- **All of B12's carve-outs**, with the legal text untouched and the date unchanged.
- **Section 2, "No advice provided on the Site", is load-bearing and route-specific.**
  It is the disclaimer that lets every calculator, every research figure and every guide on
  this site publish numbers without them reading as advice to an individual. It pairs with
  the "this page is a data summary and does not constitute tax advice" line on the research
  articles (B8). Deleting or softening it during a restyle would change the site's risk
  position, silently, on a page nobody reviews.
- **Sections 7, 8 and 9** (limitation of liability, disclaimer of warranties, indemnity).
  Same reasoning.
- **Both `/contact` links**, sections 1 and 13.
- **Whatever this page says about qualifications and regulated work.** §A rule 6 forbids
  claiming a qualification, a regulator, professional indemnity insurance or regulated
  work. **UNVERIFIED by this package: the full body text of sections 1, 2 and 8 was read
  only at heading level and by grep, not line by line for claim content.** P6-6 reads all
  136 lines against the claims ledger (`P0C1_CLAIMS_LEDGER.md`, `P0C2_CLAIMS_LEDGER.md`)
  before restyling. This is the one place among the 14 where a claims defect would be most
  at home and least looked for.

**Live defects, FLAGGED not fixed.** Same as B12: `contentNarrow` body clamp,
`sectionYLoose`, no heading anchors, no `scroll-mt-24`, no hero. No route-specific
additions found at heading level.

---

### B14. `/cookie-policy`

| | |
|---|---|
| Phase | 6 (package P6-6) |
| Closest template | **legal prose**, identical to B12 and B13. |
| Link floor | **10** (`sweep_baseline.json`) |
| Source | `src/app/cookie-policy/page.tsx`, 144 lines |

**What it renders today.** The same frame again: `<section className="bg-white">`,
`contentNarrow` + `sectionYLoose`, h1 "Cookie policy", "Last updated: 18 June 2026", a
`prose-blog mt-10 space-y-6` body opening on "This policy describes how
<legalName> (trading as <siteName>) uses cookies and similar technologies", then numbered
sections from "1. What cookies we use". Exactly one in-body `Link`
(`grep -c "Link href" src/app/cookie-policy/page.tsx` = 1), the fewest of the legal three.
Served: 200, canonical `/cookie-policy`, no robots meta.

**Anatomy under §0.** Identical to B12 and B13. Slim navy hero, numbered prose at
container measure, footer, no funnel, no closing ask.

**One route-specific structural note.** Of the three legal pages this is the one whose
source content is genuinely tabular: cookie name, purpose, category, duration. §0.2's
permitted exception for the legal three (a table where the content is already tabular)
applies here more than anywhere, and a cookie table is both better-looking and more
readable than the same content as prose. It is the only place P6-6 should be adding a
visual to a legal page.

**Carve-outs that must survive the port.**

- **All of B12's carve-outs.**
- **Consistency with the live analytics posture.** `src/app/layout.tsx` runs
  `posture="opt-out"` with `storagePrefix="cfp"` (FROZEN, phase 2 adoption 2026-06-12) and
  `ConsentedScripts` gating GA4, which currently renders nothing because
  `seo.google_analytics_id` is empty. Whatever this page says about which cookies run must
  stay true to that. **The estate rule is locked: GA4 stays opt-out and no new disclosures
  are added to sites that lack them.** A restyle must not add a cookie banner, a consent
  modal or a preferences popup to make the page feel modern. That would also breach the
  standing rule against adding anything interruptive without asking.
- **The "Do not track me" footer opt-out route** that the policy describes. If the page
  names it, the mechanism must still exist after the port.
- **The last-updated date, unchanged.**

**Live defects, FLAGGED not fixed.** Same as B12: `contentNarrow` body clamp,
`sectionYLoose`, no heading anchors. **UNVERIFIED, same as B13: the body was read at
heading level, not line by line.** If the policy enumerates specific cookie names, P6-6
verifies each against what the site actually sets before restyling a table around a list
that may be stale.

---

## §C. The two established rules, applied

**LOCATIONS pages follow the reference site's locations template** (navy hero, white body,
related articles, closing CTA panel pointing at the on-page form), treated as a real
template. None of the 14 routes in this file is a locations page: `/locations` and
`/locations/[slug]` are both in PHASE_PLAN §C.1's MAPPED list, template "location", phase
5. The rule is applied here indirectly, as the source of the hub chrome recorded for
`/research` (B7), which is the closest thing among the 14 to a coverage index.

**RESEARCH data-asset pages keep their data and their chart components, and their charts
re-ramp through `--chart-1..5`, never by hand-recolouring SVGs.** Applied in B8, B9 and
B10, with two facts recorded so P6-4 does not rediscover them: `--chart-1..5` do not exist
in `globals.css` yet, so defining them is port work; and the accessible data tables are
DONE (8 `ChartDataTable` call sites across the three research chart files, plus
`PremiumBarChart` in phase 4's territory for the ninth chart) and must not be undone.

---

## §D. Open questions this package could not answer

Neither is a builder's call.

1. **`ExampleFigureNote` on sourced official data.** §0.3 requires the note on every
   visual carrying figures, including statutory ones, as an explicit owner decision not to
   re-split it into illustrative-only. The three research articles carry figures that are
   neither illustrative nor statutory: they are counts from Companies House, ONS and the
   Insolvency Service, published under a citation licence. Captioning them "Example
   figures displayed" would be false, and would undercut the citability that is the whole
   point of the research estate. Property's own exception exists for `StatsCounter` on
   exactly this reasoning (claims about us, not tax figures, and captioning them would read
   as an admission they are invented). Recommendation: extend that exception to sourced
   open data, with the existing source line and currency stamp serving the same function.
   **Owner call. P6-4 must not ship either way unasked.**
2. **The `/about` fixed-fee sentence.** "We work on a fixed-fee basis. You know what you
   are paying before we start." No number is published, so it is not a published price,
   but it is a commercial promise about our fees, and it is the same family as the Property
   `WhatToExpectCard` defect DESIGN_DELTA §4 forbids copying. Keep, soften or cut is an
   owner call, not P6-1's.

---

## §E. Receipt

**Routes recorded: 14 of the 14 claimed.** Full list, each with a source file read, a
served assertion against port 3621 (title asserted first), a named closest template, a §0
anatomy, carve-outs, a link floor and an owning phase: `/about`, `/book`, `/complete`,
`/thank-you`, `/embed`, `/embed/[slug]`, `/research`,
`/research/uk-contractor-index`, `/research/uk-contractor-insolvency-index`,
`/research/uk-contractor-survival-index`, `/resources/[topic]` (3 instances, one anatomy),
`/privacy-policy`, `/terms`, `/cookie-policy`. Phase ownership matches PHASE_PLAN §C.2
exactly: all 14 in phase 6, packages P6-1 to P6-6.

**Routes carrying a live defect: 14 of 14.** Every one carries at least a radius or
body-clamp defect. The ones whose defects go beyond styling:

| Route | Defect beyond styling |
|---|---|
| `/embed/[slug]` | **Ships the full site header, footer, skip link and lead CTA into third-party iframes.** No `src/app/embed/layout.tsx` exists; `PageShell` is mounted in the root layout. 24 internal links served inside a partner's page. |
| `/about` | Canonicalises to the homepage on the current build (same family as the `/for` defect); has no self-canonical of its own in source; publishes a fixed-fee commercial promise; has no on-page ask at all. |
| `/complete` | Two response-time promises ("in touch shortly"); partner-network voice pre-handoff. |
| `/thank-you` | Response-time promise in the meta description. |
| `/research` | **`text-neutral-400` on every card's "Updated" line = 2.38:1**, a live contrast failure, and it is one of the `--ink-whisper` call sites DESIGN_DELTA §2 left UNVERIFIED. Now found and named: `src/app/research/page.tsx:83`. |
| `/research/*` (3) | Bare `LeadForm` in a coloured gradient card, which §0.5 forbids by name; hand-rolled FAQ beside its own JSON-LD; charts hand-pick hexes with no `--chart-1..5` to ramp through; no hero CTA. |
| `/resources/[topic]` | `var()`-themed file, so no instrument may be cited for its contrast; `/resources` hub returns 404 and the route is in neither nav list, so three `noindex, follow` pages depend on in-body links from elsewhere for discovery. |
| legal three | `contentNarrow` body clamp on all three; no heading anchors on 24+ numbered clauses; claim content UNVERIFIED at line level. |

**Things in the brief that were wrong.**

1. **"`/embed/[slug]`, bare iframe document, chrome DELIBERATELY absent" is false today.**
   The brief inherited this from PHASE_PLAN §C.2, which states it as a premise and asks the
   anatomy to record "no PageShell" as a positive requirement. The requirement is recorded,
   but it is a requirement to CREATE, not to preserve: there is exactly one layout file on
   the site and it mounts `PageShell` for every route. Only `StickyCTA` and
   `SpecialistWidget` opt out by pathname. Verified in source and served (§B6).
2. **"The three `resources` pages are now `noindex, follow` and out of the sitemap" was
   given as a known defect.** It is not a defect, it is the completed F5 fix, and the
   phase 1 server already serves it. Recorded so P6-5 does not "fix" it back.
3. **"This site has no redirect map at all" could not be confirmed as relevant to these
   14.** No route among the 14 changes URL under the recorded anatomies, so none of them
   needs a redirect. The absence of a redirect map is real and remains an estate-level
   item; it is not a P3-PREP finding. UNVERIFIED here.
4. **"14 routes" counts `/resources/[topic]` as one row covering three instances**, which
   is how PHASE_PLAN §C.2 counts it. Recorded so the arithmetic is not re-litigated: 14
   rows, 16 rendered URL instances, plus the 10 `/embed/[slug]` instances behind row 6.
5. **Five of the 14 have no baseline link floor at all**, because they are `noindex` and
   outside the sitemap the sweep walks: `/book`, `/complete`, `/thank-you`, `/embed`,
   `/embed/[slug]`. The brief treats `sweep_baseline.json` as the floor for all 14. For
   those five the floor does not exist and this file records advisory served counts
   instead, explicitly marked as not comparable to baseline figures.

**What this package changed: nothing.** No code, no content, no config, no existing
document. No git command that changes state was run. No subagents were launched. No server
was started and nothing was written to either running server. One file written:
`docs/contractors-ir35/_port/P3_ROUTE_ANATOMIES.md`.
