# P3-1: glossary and locations onto the standard

Package: P3-1. Site: `contractors-ir35`. Date: 2026-09-13.
Files edited, and nothing else:

```
src/app/glossary/page.tsx
src/app/glossary/[slug]/page.tsx
src/app/locations/page.tsx
src/app/locations/[slug]/page.tsx
```

`src/app/glossary/[slug]/data.ts` and `src/app/locations/[slug]/data.ts` were READ and
left untouched: no copy authoring was in scope and the glossary's canonical 6-category
order already matches the `CATEGORIES` constant in the index exactly (F-8 is P3-3's).
`packages/web-shared/` was read, never edited. No `Property/` file was touched. No git
command that changes state was run. No server was started; nothing was written to either
running server. `next build` and `next start` were NOT run.

## Instrument identity, asserted before any served number below

```
curl -s http://localhost:3611/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
curl -s http://localhost:3641/ | grep -o "<title>[^<]*</title>"
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>

age discriminator (the brief's, corrected: the copy is hyphenated "fixed-fee",
so a literal "fixed fee" grep returns 0 on BOTH ports and proves nothing):
curl -s http://localhost:3611/about | grep -o -i "fixed[- ]fee" | wc -l   -> 12   (pre-port)
curl -s http://localhost:3641/about | grep -o -i "fixed[- ]fee" | wc -l   ->  0   (current build)
curl -s http://localhost:3611/       | grep -o -i "fixed[- ]fee" | wc -l  -> 17
curl -s http://localhost:3641/       | grep -o -i "fixed[- ]fee" | wc -l  ->  0
```

3611 is pre-port, 3641 is the current build. **Neither contains this package's edits**, so
every "after" number below is static (read off the source and the data files), and every
served number is labelled "before".

---

## 1. Entry-link counts in server HTML, per family

Hub pages must emit the whole corpus server-side. Measured on both servers, then proved
statically for the after state because no server carries these edits.

| Family | On disk | Server HTML before (3611) | Server HTML before (3641) | After (static proof) |
|---|---|---|---|---|
| `/glossary` entries (`href="/glossary/<slug>"`, unique) | **38** | **38** | **38** | **38** |
| `/locations` entries (`href="/locations/<slug>"`, unique) | **10** | **10** | **10** | **10** |

Commands:

```
grep -c "^    slug:" 'src/app/glossary/[slug]/data.ts'                       -> 38
grep -cE '^  "[a-z0-9-]+": \{' 'src/app/locations/[slug]/data.ts'            -> 10
curl -s http://localhost:36NN/glossary  | grep -o 'href="/glossary/[a-z0-9-]*"'  | sort -u | wc -l
curl -s http://localhost:36NN/locations | grep -o 'href="/locations/[a-z0-9-]*"' | sort -u | wc -l
```

**Proof that the full set is reachable after the edit, not just that a number matched.**
Both hubs are server components (`grep -c "use client"` = 0 on all four files) and neither
slices its link list:

- `/glossary` renders `categories = [...canonicalCats, ...extraCats]`, where `canonicalCats`
  is every key of `byCategory` that appears in `CATEGORIES` and `extraCats` is every key that
  does not. The union is therefore every key of `byCategory`, and `byCategory` is built by a
  bare `for` over `Object.values(GLOSSARY)` with no filter. Every entry lands in exactly one
  group and every group is rendered: 38 of 38.
- `/locations` renders `priorityAvailable` (the 10 `PRIORITY_SLUGS` that exist in `CITIES`)
  plus `restSlugs` (every key not in `PRIORITY_SLUGS`, currently 0). Union = every key of
  `CITIES`: 10 of 10.
- The only `.slice()` on either hub is `city.keySectors.slice(0, 3)`, which trims a card's
  sector blurb. It touches no link.

This is the check the link floor cannot make, because the pre-port floor was captured from
the same page. `sweep_baseline.json` floors for reference: `/glossary` 48, `/locations` 20,
`/glossary/<slug>` 14 to 23, `/locations/<slug>` 16 to 17. Unique served `href="/..."` on
3641 today: `/glossary` 53, `/locations` 25, `/glossary/ir35` 28, `/locations/london` 21, so
every route sits 4 to 5 links above its floor before this package.

**Link changes made by this package, all positive or neutral:**

| Change | Effect on the unique internal-link set |
|---|---|
| Hero CTA `href="#book"` added on all four routes | neutral (fragment, not a path) |
| `/locations/[slug]` gains a **Related articles** block, 4 real `<a href="/blog/...">` | **+4 unique paths per city page, 10 cities** |
| `/locations/[slug]` closing panel: the old section held two `/contact` links (a "Contact us" text link and a `btnPrimary`), the new panel footnote holds one | **0**. `/contact` already appears 6 times on that page; the unique set is unchanged |
| `/glossary/[slug]` closing panel: the old box's only ask was a `btnPrimary` to `/contact`; the footnote keeps a `/contact` link | **0**, same reasoning (`/contact` appears 5 times) |
| `/glossary/[slug]` related terms moved from the page tail into a sidebar rail | **0**, same 3 links, same hrefs |
| No link was deleted anywhere | |

---

## 2. `data-cta` triples, before and after

Before, served on 3641 (`grep -o 'data-cta[a-z-]*="[^"]*"' | sort | uniq -c`), identical on
all four routes:

```
1 data-cta="header_book"          1 data-cta-placement="header"   1 data-cta-goal="contact"
1 data-cta="specialist_widget"    (no placement, no goal: that is its live shape)
```

On 3611 (pre-port) the header triple does not exist yet; only `data-cta="specialist_widget"`
is emitted. Neither page family emitted a single `data-cta` of its own, on either build.
`LeadForm` emits none either (`grep -c "data-cta" src/components/forms/LeadForm.tsx` = 0),
which matches `P3_ROUTE_ANATOMIES.md` §A.8.

After (static, from source):

```
unchanged, attribute names included:
  data-cta="header_book"  data-cta-placement="header"  data-cta-goal="contact"
  data-cta="specialist_widget"

added, once per route, on the new hero CTA of all four routes:
  data-cta="hero_book"    data-cta-placement="hero"    data-cta-goal="form"
```

Nothing was renamed, reordered or dropped. `hero_book` is a new value in the existing
naming convention (`sticky_cta`/`sticky`, `next_step`, `returning_bar`, `deep_scroll_modal`),
added because the hero ask is a real ask and an unmeasured ask is how a funnel row goes
quietly missing. It is one new `vw_cta_performance` value, not a new surface: no modal, no
banner, no interruptive element was added anywhere in this package.

---

## 3. Measured contrast, hand-computed

Method: WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`. The
calculator self-tests against the two published anchors and asserts on mismatch, and both
reproduced exactly before any row was written:

```
slate-500 #64748b on white = 4.76   (asserted)
slate-400 #94a3b8 on white = 2.56   (asserted)
```

Per DESIGN_DELTA §6 H2 the instrument is not cited for any `var()`-themed file; none of the
four files edited here is one, and every ratio below is hand-computed anyway.

| Colour | Role | Ground | Ratio | Verdict |
|---|---|---|---|---|
| `primary-600` #0e7490 | link/label text | white | **5.36** | PASS |
| `primary-600` #0e7490 | button ground under a white label | n/a | **5.36** | PASS |
| `primary-400` #22d3ee | mono hero eyebrow, h1 city accent | neutral-900 #0a0a0a | **10.96** | PASS |
| white | h1, panel labels | neutral-900 #0a0a0a | **19.80** | PASS |
| neutral-300 #d4d4d4 | hero standfirst, population line | neutral-900 #0a0a0a | **13.36** | PASS |
| neutral-900 #0a0a0a | h2/h3, card titles | white | **19.80** | PASS |
| neutral-600 #525252 | body, card detail, region label | white | **7.81** | PASS |
| neutral-600 #525252 | body on the alternate band | slate-50 #f8fafc | **7.47** | PASS |
| slate-900 #0f172a | panel h2 (kit) | slate-100 #f1f5f9 | **16.30** | PASS |
| slate-600 #475569 | panel eyebrow + description (kit) | slate-100 #f1f5f9 | **6.92** | PASS |
| slate-600 #475569 | panel form subtitle (kit) | white | **7.58** | PASS |

**Two live failures found and fixed by this package:**

| Was | Where | Ratio | Now |
|---|---|---|---|
| `bg-cyan-600` #0891b2 pill under a **white** label | `/glossary` hero, `/glossary/[slug]` hero | **3.68**, floor 4.5 | mono eyebrow in `primary-400` on the navy ground, 10.96 |
| `text-neutral-500` #737373 on `bg-stone-50` #fafaf9 | `/locations` card region + sector lines | **4.54**, 0.04 of headroom | `text-neutral-600` on white, 7.81 |

The `bg-cyan-600` pill is DESIGN_DELTA §2's headline measurement landing on a real surface:
cyan-600 fails the ground role as well as the text role on this site. The locations hero's
equivalent pill was already `bg-cyan-700` (5.36) and did not fail; it is replaced anyway so
the two families share one eyebrow.

**One live failure NOT introduced, and the reason:** the site's `.eyebrow` class is the
obvious component for a mono eyebrow (DESIGN_DELTA §3 N3 keeps it), but it is **unlayered**
in `globals.css:211` and pins `color: var(--accent)` = #0e7490, which measures **3.69** on
the neutral-900 hero ground. An unlayered rule beats every Tailwind utility, so
`className="eyebrow text-primary-400"` would have shipped a 3.69 eyebrow while looking
correct in the diff. The eyebrow is therefore hand-rolled from utilities
(`font-mono text-xs font-medium uppercase tracking-[0.1em] text-primary-400`), which keeps
the Geist Mono face N3 asks for and clears the floor. `.font-mono` at `globals.css:206` is
also unlayered but only sets the family, so it cannot fight the colour.

---

## 4. What changed, per route

### `/locations` and `/locations/[slug]`: the reference site's answer, copied

Source read: `Property/web/src/app/locations/[slug]/page.tsx`. Its answer is navy hero,
white body with **no inner measure** (its own comment records removing a `max-w-4xl mx-auto`
clamp for exactly this reason), `rounded-xl` + `ring-1 ring-slate-200/70` cards, a
`RelatedArticles` block, and `<div id="book" className="scroll-mt-24">` wrapping a
`contained` `LeadCTAPanel` whose form is the page's on-page form. Applied here:

- Hero keeps its photograph. N4 (replace the Pexels heroes with the SVG motif) is an **open
  owner decision** and a design package does not pre-empt it.
- Hero gains the primary CTA at `#book`, which the page did not have: every ask on the page
  previously left for `/contact`.
- Body clamps removed: four `max-w-4xl mx-auto` wrappers. `.prose-blog` already pins its own
  `max-width: 65ch` in `globals.css:267`, so the clamp narrowed the page without widening the
  prose. The grids now run two-up at the real container width.
- Section rhythm `py-16 sm:py-20` to the standard `py-12 sm:py-16 lg:py-20` (DESIGN_DELTA N5).
- Alternate band `bg-stone-50` (an off-ramp literal) to `bg-slate-50`, which is also the kit
  panel's ground, so the page has one alternate.
- Sector cards, FAQ `<details>`, sector chips: `border`/`border-l-4` to `rounded-xl` +
  `ring-1 ring-neutral-200/70`, with a real `focus-visible` ring on every interactive one.
- The FAQ stays **native `<details>`**. Every answer is in server HTML, so the `FAQPage`
  JSON-LD built from the same array is truthful. The kit's Radix `FaqSection` is not adopted
  (DESIGN_DELTA §4 P2).
- **Related articles** added, 4 posts from the IR35 Status category, as real `<a href>` cards.
  The kit `RelatedArticles` is deliberately NOT used: it sets `focus-visible:outline-none` and
  hands the ring to a `.related-card:focus-within` rule in `globals-standard.css`, which this
  site does not import. That already bit the blog renderer (its comment at
  `BlogPostRenderer.tsx:440`); the recipe is matched by hand with a real ring instead.
- Closing ask: the full-bleed navy band sitting directly on the dark footer becomes a
  `contained` `LeadCTAPanel` on `ground="white"` (the section above it is slate-50), carrying
  the same `LeadForm`. Navy no longer touches navy.
- `/locations` index: same hero treatment, `bg-stone-50` body to white, the no-op
  `max-w-6xl mx-auto` inside a `max-w-6xl` container deleted, cards onto the one radius, and
  a `contained` panel at `#book` where the hub previously offered no ask at all.

### `/glossary` and `/glossary/[slug]`: built to the recorded anatomy, with one correction

- Index: navy hero with mono eyebrow, hero CTA at `#book`, white body at container measure,
  38 entries in 6 canonical categories, one `rounded-xl` + ring card recipe, closing panel.
- Entry: navy hero, mono eyebrow carrying the category, hero CTA at `#book`. The
  `max-w-3xl mx-auto` body clamp is gone and the freed width becomes the **second column**
  §0.1 asks for rather than dead space: the related terms are promoted out of the tail into
  a sticky rail. Same three links, same hrefs.
- Raw-HTML bodies are still injected through `dangerouslySetInnerHTML` into
  `article-body prose-blog` (E17: nothing escapes them).
- The tail's square `bg-neutral-900 p-8` box, whose only ask was a `btnPrimary` to `/contact`,
  becomes a `contained` `LeadCTAPanel` with the real form on the page.

### `proofPoints` is EMPTY on all four panels, deliberately

`LeadCTAPanel` renders nothing when `proofPoints` is `[]` (`proofPoints.length ? ... : null`),
which is the honest option. Property's own call site passes
`{"Fixed fees, quoted upfront"}` and `{"24-hour response", "Usually the same working day"}`.
**Both are forbidden here**: the first is a commercial promise about our fees, the second is
a response-time promise. Copying them would have reproduced, in one paste, the two claim
families this site spent phase 0 removing. No substitute proof copy was invented.

Claim sweep over everything the four files emit:

```
grep -niE "fixed[ -]?fee|£|per (hour|month)|within [0-9]|same day|shortly|24[- ]hour|
           response time|turnaround|chartered|qualified|regulated|indemnity|ICAEW|ACCA|
           guarantee" <the four files>     -> no matches
grep -o "—" <the four files> | wc -l       -> 0
```

The first-person "we do the work" voice is kept throughout ("We will review your IR35
position", "We act for {city} contractors entirely remotely"), and "free call" is kept, per
the owner rulings of 2026-09-12.

### Static checks run

```
npx tsc --noEmit -p tsconfig.json                                   -> clean
npx eslint "src/app/glossary/**/*.tsx" "src/app/locations/**/*.tsx" -> clean
```

---

## 5. Verification list for the serialised build

Run after `next build && next start` on one port. Substitute `PORT`. Assert identity first.

| # | URL / command | Expected |
|---|---|---|
| 0 | `curl -s http://localhost:PORT/ \| grep -o "<title>[^<]*</title>"` | `<title>Specialist Contractor Accountants \| IR35 Advice UK</title>` |
| 0b | `curl -s http://localhost:PORT/glossary \| grep -c "More in "` | `0` on `/glossary`; the phrase is the entry-page rail, so this proves the build is the new one when combined with row 3 |
| 1 | `curl -s http://localhost:PORT/glossary \| grep -o 'href="/glossary/[a-z0-9-]*"' \| sort -u \| wc -l` | **38** |
| 2 | `curl -s http://localhost:PORT/locations \| grep -o 'href="/locations/[a-z0-9-]*"' \| sort -u \| wc -l` | **10** |
| 3 | `curl -s http://localhost:PORT/glossary \| grep -o 'data-cta[a-z-]*="[^"]*"' \| sort \| uniq -c` | exactly `header_book`, `header`, `contact`, `specialist_widget`, `hero_book`, `hero`, `form` (7 lines, 1 each) |
| 4 | same as 3 for `/glossary/ir35`, `/locations`, `/locations/london` | identical 7 lines on each |
| 5 | `curl -s http://localhost:PORT/locations/london \| grep -c 'id="book"'` | **1** |
| 6 | same as 5 for `/glossary`, `/glossary/ir35`, `/locations` | **1** each |
| 7 | `curl -s http://localhost:PORT/locations/london \| grep -o 'href="/blog/[^"]*"' \| sort -u \| wc -l` | **>= 4** (the new Related articles block; 0 before) |
| 8 | `curl -s http://localhost:PORT/locations/london \| grep -o 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 21** (was 21; must not fall) |
| 9 | `curl -s http://localhost:PORT/glossary/ir35 \| grep -o 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 28** (was 28) |
| 10 | `curl -s http://localhost:PORT/glossary \| grep -o 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 53** (was 53) |
| 11 | `curl -s http://localhost:PORT/locations \| grep -o 'href="/[^"]*"' \| sort -u \| wc -l` | **>= 25** (was 25) |
| 12 | `for u in /glossary /glossary/ir35 /locations /locations/london; do curl -s http://localhost:PORT$u \| grep -c "rounded-2xl"; done` | **0 0 0 0** |
| 13 | `for u in ...(as 12); do curl -s http://localhost:PORT$u \| grep -c "bg-stone-50"; done` | **0 0 0 0** |
| 14 | `for u in ...(as 12); do curl -s http://localhost:PORT$u \| grep -c "bg-cyan-600"; done` | **0 0 0 0** (the 3.68 pill) |
| 15 | `for u in ...(as 12); do curl -s http://localhost:PORT$u \| grep -o "—" \| wc -l; done` | **0 0 0 0** |
| 16 | `curl -s http://localhost:PORT/locations/london \| grep -o -iE "fixed[- ]fee\|24[- ]hour\|shortly\|chartered"` | no output |
| 17 | `curl -s http://localhost:PORT/locations/london \| grep -c "<details"` | equal to that city's `localFaqs` length, and every `faq.answer` string appears in the HTML (`grep -c` on a distinctive answer fragment = 1) |
| 18 | `curl -s http://localhost:PORT/locations/london \| python -c "import sys,re,json; [json.loads(m) for m in re.findall(r'application/ld\+json\"[^>]*>(.*?)</script>', sys.stdin.read(), re.S)]"` | no exception: all three JSON-LD blocks still parse |
| 19 | `for s in $(grep -oE '^  "[a-z0-9-]+"' 'src/app/locations/[slug]/data.ts' \| tr -d ' "'); do echo -n "$s "; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/locations/$s; done` | **200** x10, no path changed |
| 20 | same as 19 over the 38 glossary slugs (`grep -oE '^    slug: "[a-z0-9-]+"'`) | **200** x38, no path changed |
| 21 | Browser, `/glossary` at 1280px: Tab to a term card | a visible cyan focus ring (this is the `globals-standard.css` trap; rows 1 to 20 cannot see it) |
| 22 | Browser, `/locations/london`: click the hero "Book a free call" | scrolls to the panel form with clearance under the header (`scroll-mt-24`) |
| 23 | Browser, `/glossary/ir35` at 1280px | prose left at a ~65ch measure, related-terms rail right; at <1024px the rail drops under the prose |
| 24 | Browser, all four routes | no dark band touches the dark footer: the last band before the footer is light |

Rows 21 to 24 are **UNVERIFIED** by this package: they need a build and a browser, and this
package started no server and ran no build.

Also UNVERIFIED: the exact post-build values of rows 8 to 11. They are stated as floors from
the 3641 measurement plus the four link-neutral or link-positive changes in §1, not as
predicted totals.

---

## 6. Receipt

**Counts.** Glossary 38 of 38 entries in server HTML, before and after, proved statically as
well as measured. Locations 10 of 10, same. Four files edited, zero files created outside
`docs/`, zero shared-package edits, zero `Property/` edits, zero data or content edits.
Two live contrast failures fixed (3.68 and 4.54). Four hero CTAs added, each with the full
`data-cta` triple. Forty crawlable blog links added across the ten city pages. No link
deleted anywhere. `tsc` and `eslint` clean.

**Anatomy recordings that were wrong.**

1. **The brief says the glossary's anatomy is recorded in `P3_ROUTE_ANATOMIES.md`. It is not,
   and it never should have been.** That file records the **14 routes with no template**, all
   14 of them phase 6, and its own §E receipt lists them: `/about`, `/book`, `/complete`,
   `/thank-you`, `/embed`, `/embed/[slug]`, the three research articles and their hub,
   `/resources/[topic]`, and the legal three. Glossary is not among them. `PHASE_PLAN.md`
   §C.1 lines 225-226 put `/glossary` and `/glossary/[slug]` in the **MAPPED** list, with
   templates "index + `NumberedPagination`" and "glossary entry", phase 3. So the glossary is
   not a no-template route at all: it is a mapped one whose template was never written down
   in prose. **No recording was edited.** The correction belongs in the brief, not in the
   anatomy file, which is internally consistent and correct as it stands.
2. **`NumberedPagination` is the wrong template row for `/glossary`.** §C.1 names it, and it
   does not apply: the page renders all 38 entries grouped by category with no pagination at
   all, and adding pagination to a 38-item list would be adding a hide-not-slice mechanism to
   a page that already has no slice. The template that actually fits is the one §C.1 gives
   `/locations`: a `CoverageCards` index. That is what was built. Flagged, not silently
   diverged from.

**Things in this brief that were wrong.**

1. **The instrument discriminator does not work as given.** The brief says `"fixed fee"`
   returns 0 on 3641 and 1 on 3611. It returns **0 on both**, because the live copy is
   hyphenated. The working discriminator is `grep -o -i "fixed[- ]fee"`, which returns 17 on
   3611 and 0 on 3641 for `/`, and 12 versus 0 for `/about`. Both servers were still
   identified by title and by this corrected test before any number above was trusted.
2. **Locations is phase 5 in the plan, not phase 3.** `PHASE_PLAN.md` §C.1 lines 223-224 put
   `/locations` and `/locations/[slug]` in phase 5, and §H prices them as package **P5-6**
   with the copy as **P5-8**. The brief bundles them into P3-1. The work was done as
   instructed, and it is recorded here so the phase ledger is not silently out by one family:
   **P5-6 is now complete, P5-8 (authoring the 10 location copy blocks) is untouched.**
3. **"Glossary has no template" reads as a licence to invent one.** It is not one. The
   locations template, which the brief itself names as a real template with Property's answer
   to copy, covers the glossary hub exactly (coverage index over N children) and was used for
   both, so the two families now share one hero, one card recipe and one closing panel rather
   than two similar dialects.
4. **The kit component the brief warns about is the one to avoid, and so is one it does not
   name.** The brief flags `RelatedArticles` (correct: its ring is delegated to
   `globals-standard.css`, which this site does not import). It does not flag that
   `LeadCTAPanel`'s **`Eyebrow`** and grounds are hardcoded `slate-*` while this site is a
   `neutral-*` site (DESIGN_DELTA N1, PENDING). The panel was still adopted, because the
   difference is confined to the panel's own band and the alternative was hand-rolling a
   fourth copy of it; the slate/neutral mix is pre-existing (`SiteFooter`,
   `BlogPostRenderer`) and is the owner's N1 question, not a builder's.

**Open, for the owner or a later package, none actioned here.**

- **N1 (slate vs neutral) is now visible on these four routes**, because the kit panel and the
  alternate band are slate while the heroes and body text are neutral. Answering N1 "A"
  resolves it site-wide; answering "B" means the panel's slate should be overridden.
- **N4 (the Pexels hero photographs on `/locations/[slug]`)** is untouched and still open.
- `btnPrimary` in `src/components/ui/layout-utils.ts` is still the pre-port box
  (`px-7 py-3.5 text-sm font-medium`, square) and is **outside this package's lease**. Each of
  the four new hero CTAs appends `rounded-xl` locally to reach the one radius. When the
  button constants are ported, those four local `rounded-xl` suffixes become redundant and
  should be removed.
