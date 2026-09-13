# P6-1 — secondary, post-submit and legal routes

Package P6-1, phase 6. Eight routes brought onto the standard:
`/about`, `/contact`, `/book`, `/complete`, `/thank-you`, `/privacy-policy`,
`/cookie-policy`, `/terms`.

File lease honoured exactly. `globals.css`, blog, research, resources, glossary,
locations, calculators and `src/lib/` untouched. `packages/web-shared/` not
edited (trap 12); two findings about it are reported below instead.

## Instrument identity, asserted before any served claim

```
curl -s http://localhost:3611/ | grep -o -i "fixed[- ]fee" | wc -l   -> 17   (pre-port)
curl -s http://localhost:3641/ | grep -o -i "fixed[- ]fee" | wc -l   -> 0    (current build)
```

Both servers read-only. `next build` and `next start` were NOT run. Every served
figure below is from **3641, which does not contain this package's edits**, so
served numbers are the BEFORE and the AFTER is measured at source. Marked
UNVERIFIED where only a build can settle it.

Static checks that WERE run and passed, because they start no server and touch
no `.next`:

- `npx tsc --noEmit -p tsconfig.json` -> **exit 0**, whole project.
- `npx eslint` over all eight leased files -> **clean, no output**.

---

## The one thing that had to be verified before any id was added

The brief said a site-wide `h2/h3/h4[id]` scroll-offset rule had already landed
and that added ids would inherit it. **Verified, not assumed**, in the emitted
stylesheet on 3641:

```
curl -s http://localhost:3641/_next/static/css/226f67dec972778a.css \
  | grep -o "[^}]\{0,120\}scroll-margin-top:6rem}"
-> :where(h2[id],h3[id],h4[id]){scroll-margin-top:6rem}
```

`:where()` keeps specificity at 0, so an explicit `scroll-mt-*` utility still
wins where one is wanted. The 29 heading ids added by this package therefore
need no utility of their own. Source: `globals.css:392-396`, outside this lease.

## The footer "Do not track me" toggle

The cookie policy names it twice as the reader's opt-out route, so if it stopped
rendering the policy would become false.

- Rendered on 3641: `curl -s http://localhost:3641/cookie-policy | grep -c "Do not track me"` -> **5 hits** (`ConsentToggle` mounted through the footer).
- Mount point is `src/components/analytics/ConsentToggle.tsx` reached via
  `SiteFooter`, wired in the shell. **No file in this package's lease touches the
  shell, the footer or the toggle.** This package cannot affect whether it
  renders, and it renders now.
- Both sentences in the cookie policy that name it are byte-identical to the
  pre-edit file (attestation below).

---

## Per page

### `/about`

| | |
|---|---|
| Anatomy followed | **B1**, in full |
| Closing ask added? | **YES**, `LeadCTAPanel` |
| Before (served, 3641) | 25 raw internal `href="/..."`; baseline `links["/about"]` = 10 |
| After (source) | 1 in-body internal `href="/..."` (the panel footnote to `/contact`), plus `LeadForm`'s `/privacy-policy` consent link, plus unchanged chrome. **Net +1 in-body internal link**, zero removed |
| Anchors added | 1 (`#book`) |

Built to B1 section for section: dark hero with a hand-rolled mono eyebrow, h1,
standfirst and a primary CTA the page did not have; white "who we are" section
as two columns; `neutral-50` "what specialism means in practice" card grid
promoting the third paragraph's list out of prose so the section carries a
visual; `LeadCTAPanel` as the closing ask; footer.

**Why a closing ask.** B1 and §0.5 both require one, and today the page's only
ask left the page for `/contact`. The panel is `contained` so no dark band
touches the dark footer, and `ground="white"` so it does not share the
`neutral-50` ground of the section above it. `proofPoints={[]}`, never the kit's
defaults, which are a fee claim and a turnaround promise this site may not
publish. `footnote` is passed as an inline fragment (text plus a `<Link>`),
never a `<div>`, because `PanelBody` renders it inside a `<p>`.

**The clamp.** `max-w-3xl` came off the prose body. §0.1's answer to "prose
reads badly at full width" is to put something useful beside it, so the body is
now `lg:grid-cols-[1.6fr_1fr]` with the "you deal with specialist accountants,
not a call centre" line as a card in the second column. Existing copy, moved.

**The four specialism cards carry labels only.** The source paragraph says
nothing more about them, and authoring a description each would be inventing
copy. Labels are derived from the paragraph verbatim.

**Nothing re-introduced.** No client-scale claim, no fixed-fee sentence, no
replacement claim of scale. First-person voice kept. "Free call" kept.

### `/contact`

| | |
|---|---|
| Anatomy followed | **NONE RECORDED.** `/contact` is absent from P3_ROUTE_ANATOMIES.md, which records 14 routes and does not include it. Built to §0 directly, with B1's hero shape as the sibling pattern |
| Closing ask added? | **NO**, and deliberately |
| Before (served, 3641) | 25 raw internal `href="/..."`; baseline 10 |
| After (source) | unchanged; nothing removed |
| Anchors added | 1 (`#book`) |

Hero rebuilt to the standard shape and rhythm with a hero CTA at `#book`; the
form column now carries `<div id="book" className="scroll-mt-24">`; the form
card moves from `border border-neutral-200` square to `rounded-xl ring-1
ring-neutral-200/70`; `sectionYLoose` to `py-12 sm:py-16 lg:py-20`; step
numerals re-ramped from `text-cyan-700` to `text-primary-600` (same resolved
hex, see contrast below).

**Why no closing ask.** The page IS the capture surface. A `LeadCTAPanel` under
the form would ask a reader to do the thing they are in the middle of doing, and
adding a second capture surface is an owner decision this package does not take
(DESIGN_DELTA §5b: the port adds zero capture surfaces). The existing two-column
body already satisfies §0.1 without a clamp.

### `/book`

| | |
|---|---|
| Anatomy followed | **B2**, in full |
| Closing ask added? | **NO.** B2: "Do NOT add a `LeadCTAPanel` here: it would ask a second time for something the reader is in the middle of giving" |
| Before (served, 3641) | 25 raw internal hrefs, all chrome. ABSENT from `sweep_baseline.json` (noindex, out of sitemap), so there is no floor to measure against, only an advisory not-visibly-fewer test |
| After (source) | 1 in-body internal link (`/contact` escape), unchanged |

`SlimHero` adopted. `max-w-2xl` clamp removed; the picker fills the container.
The no-token fallback becomes the kit's `NoticeCard tone="slate"`, replacing
`border-2 border-neutral-300 bg-neutral-50` square. `robots: { index: false,
follow: false }` kept. The `?t=` handling, the docstring and the "use the contact
form" escape are untouched. Dead `siteConfig` import removed.

No `data-cta` added: the fallback keeps a plain `<Link>`, so no funnel row is
invented.

### `/complete`

| | |
|---|---|
| Anatomy followed | **B3**, except its response-time flag, see below |
| Closing ask added? | **NO.** B3, and the reader has already converted |
| Before (served, 3641) | 25 raw internal hrefs. ABSENT from baseline (noindex) |
| After (source) | unchanged: `/contact` in two failure branches, `/book?t=` in the all-set branch |

`SlimHero` adopted. `max-w-2xl` clamp removed. All **four branches preserved**
(no token, invalid/expired token, all-set, `DetailsForm`): no token ->
`NoticeCard tone="slate"`; expired -> `NoticeCard tone="slate"`; all set ->
`NoticeCard tone="primary" title="You are all set"`; otherwise `DetailsForm`
unchanged. `computeMissingContact`, the best-effort `catch` around
`adminSelect`, the `mintLeadToken` try/catch and the button suppression on a
mint failure are all untouched.

**The "shortly" sentence is untouched and byte-identical.** See the anatomy
corrections section.

### `/thank-you`

| | |
|---|---|
| Anatomy followed | **B4**, with one recorded divergence |
| Closing ask added? | **NO.** B4: the reader has just submitted |
| Before (served, 3641) | 27 raw internal hrefs. ABSENT from baseline (`index:false, follow:true`) |
| After (source) | unchanged: `/blog`, `/`, `/contact` |

`SlimHero` adopted (`eyebrow="Received"`, `title="Thank you."`), replacing the
hand-rolled mono eyebrow so the pair matches `/book` and `/complete`.
`max-w-2xl` body clamp removed. Picker card moves from `border` + `shadow-sm`
square to `rounded-xl ring-1 ring-neutral-200/70`, and its ground moves to
`bg-neutral-50` so a white card is not sitting on a white section. The
three-step endowed-progress `<ol>` is structurally unchanged, `aria-hidden`
connectors included. The Aswatax paragraph is unchanged and stays post-submit.
`isSafeReturnPath` and the `void returnPath` guard stay. `robots:
{ index: false, follow: true }` kept, asymmetry intact. `/blog` stays a real
`<a href>`.

**DIVERGENCE, and B4's recording is at fault, not the build.** B4 says the
progress indicator "sits INSIDE the hero, above the eyebrow". The shared
`SlimHero` exposes `eyebrow`, `title`, `children` and `backdrop` and has **no
slot above the eyebrow**, so the recording is not buildable against it, and
`packages/web-shared` may not be edited (trap 12). Worse, `SlimHero`'s ground is
`slate-900` and the indicator's colours are light-ground (`text-neutral-900`,
`border-neutral-300`, `bg-neutral-200`), so honouring the recording literally
would have shipped a low-contrast indicator. **It now opens the white body
section**, which is the first thing under the hero and preserves its orientation
role. Reported rather than silently diverged.

### `/privacy-policy`, `/terms`, `/cookie-policy`

| | `/privacy-policy` | `/terms` | `/cookie-policy` |
|---|---|---|---|
| Anatomy followed | **B12** | **B13** | **B14**, with one refusal |
| Closing ask added? | **NO** | **NO** | **NO** |
| Baseline `links` | 10 | 10 | 10 |
| Served before (3641) | 29 raw internal hrefs | 26 | 25 |
| In-body internal links after (source) | 5 `<Link>` + 1 external `<a>`, **unchanged** | 2 `<Link>`, **unchanged** | 1 `<Link>` + 4 external `<a>`, **unchanged** |
| Heading anchors added | **11** (`h2`) | **13** (`h2`) | **10** (5 `h2`, 5 `h3`) |
| Section-index links added | 11 | 13 | 5 |

All three now: `SlimHero` with `eyebrow="Legal"`, the h1 as the hero title, and
the last-updated date as hero fine print rather than a line stranded above the
body. The date itself is **unchanged on all three** (10 August 2026, 18 June
2026, 18 June 2026): a restyle is not a change to the document and re-dating it
would be a false claim. Body ground white, rhythm `py-12 sm:py-16 lg:py-20`.

**Both recorded defects fixed.**

1. **The `contentNarrow` body clamp is gone.** B12's own note says the answer is
   a two-column section with a sticky section index, never a clamp, and that the
   rail is the lazy version of that and is link-positive. Built:
   `siteContainerLg` > `grid lg:grid-cols-[minmax(0,1fr)_260px]`, prose first in
   the DOM, `SectionIndex` second, so content order is unchanged for a reader
   without CSS. The rail is `hidden lg:block`, which is `display:none`, so its
   anchors stay in the server HTML at every width.
2. **Every numbered clause now has an id**, 34 across the three, and inherits the
   site-wide `scroll-margin-top: 6rem` verified above.

**Why no closing ask on any of the three.** B12 is explicit: a privacy policy
that converts is a dark pattern, and the page runs no funnel deliberately. The
only in-body asks are the rights-request `/contact` links, which stay. B13 and
B14 inherit it. This is a recorded positive exception, not an omission.

**The cookie table was NOT built, deliberately.** B14 says the cookie policy is
the one legal page whose content is genuinely tabular and the one place a visual
belongs. It is also one of the two pages whose substance was rewritten today and
is now locked word for word. Turning prose into a table means re-cutting the
sentences into cells, which is reflowing copy non-byte-identically. **The
substance lock beats the optional visual**, so the page ships as restyled prose
with a section index. If the owner wants the table, it is a copy decision with a
re-read of what the site actually sets, not a restyle.

---

## Byte-identical-copy attestation, the two policy pages

The two policies rewritten today (`/privacy-policy`, `/cookie-policy`) and, on
the same standard, `/terms`.

**What changed in the prose block on each: nothing but `id` attributes on
headings.** No word, no sentence, no ordering, no punctuation, no numbering, no
link target.

**Machine attestation, `/terms` and `/cookie-policy`.** The rewrite was applied
by a script that captured the prose block before the edit, applied the edit, then
asserted:

```
stripped = re.sub(r'<(h2|h3) id="[^"]*">', r'<\1>', prose_after)
assert stripped == prose_before
```

Both passed. That is an exact byte comparison of the entire prose body with the
added ids removed, so the only possible difference is the ids themselves.

```
ok terms/page.tsx        | 13 h2 ids, 0 h3 ids | prose byte-identical modulo ids: YES
ok cookie-policy/page.tsx |  5 h2 ids, 5 h3 ids | prose byte-identical modulo ids: YES
```

**`/privacy-policy` was edited by hand**, so the same before/after capture was
not available. It was attested two other ways instead, both against the
pre-edit build on 3641:

- **Element census of the prose block, served vs source.** `p` 23/23, `h2`
  11/11, `h3` 0/0, `ul` 5/5, `li` 22/22, `strong` 36/36, links 6/6 (5 `<Link>`
  plus the ICO `<a>`; the one apparent mismatch in the raw run was a regex that
  missed a `<a` opened on its own line, confirmed by hand). No element added,
  removed or re-nested.
- **Text-run containment.** Every maximal run of six or more consecutive
  non-interpolated words in the source appears verbatim in the served text.
  Zero missing, on all three pages. Served word counts exceed source word counts
  by exactly the expansion of the `siteConfig` interpolations (26 words on
  privacy, 24 on terms, 5 on cookie), which is the expected direction.

**Copy that was moved rather than left in place, and moved byte-identically:**

- All three: the h1 text, into `SlimHero`'s `title`.
- All three: the "Last updated: <date>" line, from above the body into the hero.
  Character for character, date included.

Nothing else moved. The eleven, thirteen and five numbered sections are in their
original order with their original numbering.

**Corrections made today are intact.** `/privacy-policy` §8 still reads as the
first-party-analytics wording with no Google Analytics opt-out section and no
third-party analytics claim; §2 still carries the corrected IP ingest sentence
("an approximate location and timezone derived from your IP address, which we do
not store"); §5's processor list is the four that are actually used.
`/cookie-policy` still names the footer "Do not track me" toggle in both places.

---

## Measured contrast

Method: WCAG relative luminance, sRGB to linear per channel, `(L1+0.05)/(L2+0.05)`.
Self-test run first and reproduced exactly: slate-500 `#64748b` on white =
**4.76**, slate-400 `#94a3b8` on white = **2.56**. Script asserts on mismatch.

Per `_port/P1-7_RAMP.md`, this site binds `--color-primary-600` to cyan-700
`#0e7490` (5.36) and `--color-primary-400` to cyan-400 `#22d3ee`. True cyan-600
is `primary-500` and is not used here.

| Class / token | Hex | Role | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|---|
| `text-primary-400` (hero eyebrow, `/about`, `/contact`) | `#22d3ee` | text | neutral-900 `#171717` | **9.92** | 4.5 | PASS |
| `text-neutral-300` (hero standfirst) | `#d4d4d4` | text | neutral-900 `#171717` | **12.09** | 4.5 | PASS |
| `text-neutral-300` (SlimHero standfirst) | `#d4d4d4` | text | slate-900 `#0f172a` | **12.04** | 4.5 | PASS |
| `text-slate-300` (kit `Eyebrow onDark` inside `SlimHero`) | `#cbd5e1` | text | slate-900 `#0f172a` | **12.02** | 4.5 | PASS |
| `text-neutral-400` (last-updated, hero fine print) | `#a3a3a3` | fine print | slate-900 `#0f172a` | **7.08** | 4.5 | PASS |
| `text-primary-600` (section-index eyebrow, `/about` card eyebrow) | `#0e7490` | text | neutral-50 `#fafafa` | **5.13** | 4.5 | PASS |
| `text-primary-600` (`/about` card numerals, aria-hidden) | `#0e7490` | graphic | white | **5.36** | 3.0 | PASS |
| `text-primary-600` (`/contact` step numerals) | `#0e7490` | graphic | `#fafaf7` | **5.12** | 3.0 | PASS |
| `text-primary-600` (panel footnote link) | `#0e7490` | text | slate-100 panel | **5.36** vs white, **5.12** vs slate-50 | 4.5 | PASS |
| `hover:text-primary-700` (section-index link hover) | `#155e75` | text | neutral-50 `#fafafa` | **7.27** vs white | 4.5 | PASS |
| `text-neutral-600` (section-index link, body prose) | `#525252` | text | neutral-50 `#fafafa` | **7.49** | 4.5 | PASS |
| `text-neutral-600` (body prose) | `#525252` | text | white | **7.81** | 4.5 | PASS |
| `text-neutral-700` (NoticeCard body) | `#404040` | text | neutral-50 / slate-50 | **9.93** | 4.5 | PASS |
| `text-neutral-500` (`/thank-you` fine print) | `#737373` | fine print | white | **4.74** | 4.5 | PASS |
| `text-neutral-900` (card headings) | `#171717` | text | neutral-50 `#fafafa` | **17.18** | 4.5 | PASS |

**Lowest ratio on anything this package renders: 4.74**, the `/thank-you`
follow-up fine print on white, which is pre-existing and unchanged. Lowest on
anything newly written: **5.12**. Nothing is below its floor.

No instrument output is cited: none of the eight files is `var()`-themed, but
every figure here is hand-computed against a resolved hex anyway (DESIGN_DELTA
§6 H2 standing rule).

`.eyebrow` is **not used on any of the eight pages**
(`grep -c 'className="eyebrow'` = 0). It is unlayered at `globals.css:211` and
pins `color: var(--accent)`, which no utility can override, so both dark heroes
hand-roll the eyebrow from `font-mono text-xs font-medium uppercase
tracking-[0.1em] text-primary-400`, the same recipe `/locations` uses. The
`SlimHero` pages take the kit's own `Eyebrow`, which is a component and not that
class.

---

## Binding constraints, checked

| Constraint | Result |
|---|---|
| `data-cta` triples, attribute NAMES included | 2 new hero CTAs (`/about`, `/contact`), both with all three: `data-cta="hero_book"`, `data-cta-placement="hero"`, `data-cta-goal="form"`. **No existing triple touched, moved or dropped**; the chrome's `header_book` and `specialist_widget` are untouched |
| Link floor (`_port/sweep_baseline.json`) | **Zero internal links removed on any of the eight.** The five swept routes (floor 10 each) gained: `/about` +1 in-body, `/privacy-policy` +11 anchors, `/terms` +13, `/cookie-policy` +5, `/contact` +1 anchor. `/book`, `/complete` and `/thank-you` are **noindex and absent from the baseline**, so nothing there is measured against a floor; their raw served counts (24/24/26 chrome-dominated) are unchanged in the source, which is the only claim available |
| Em-dashes | **0** in all eight files, before and after |
| No published price | none added; none present |
| No timed promise | none added. Existing untimed copy preserved exactly, see below |
| No qualification / regulator / PI / regulated-work claim for us | none added. The Aswatax Chartered Tax Advisers line is a statement about a third party on a post-submit surface and stays exactly where it was |
| First-person voice | kept everywhere, nothing rewritten to an introducer voice |
| "free call" | kept: `/about` hero CTA, `/contact` h1 and hero CTA, panel eyebrow and form title |
| `FaqSection` | **not adopted** anywhere in this package |
| `proofPoints={[]}` | the one `LeadCTAPanel` call passes it empty |
| `footnote` as inline, not `<div>` | the one call passes a fragment of text plus a `<Link>`; no block element inside the `<p>` |
| One radius | `rounded-2xl` count 0 in all eight; `border border-*` on a card surface count 0 in all eight; every card is `rounded-xl` + `ring-1 ring-*/70`, or the kit's `NoticeCard`, which is that recipe |
| Body clamps removed | `contentNarrow` gone from all three legal pages; `max-w-2xl` gone from `/book`, `/complete`, `/thank-you`; `max-w-3xl` gone from `/about`'s prose body. The only `max-w-*` left is on hero copy and standfirsts, which §0.1 permits |

---

## Where the recorded anatomies were wrong

Reported rather than silently built around, per the brief.

1. **B1 records a live fixed-fee claim on `/about` at line 39, and §D open
   question 2 asks the owner to adjudicate it. It is no longer there.** The
   sentence was removed earlier today, along with a client-scale claim. The
   recording and the open question are both stale. Nothing was reintroduced.
2. **B3 says `/complete` carries the "shortly" promise twice, "Line 95-96 ...
   and line 119-120 repeats it in the standfirst". It appears once.** The
   standfirst reads "an accountant from our partner network will be in touch to
   arrange your free IR35 review, no obligation", with no time word. B3
   overcounted by one.
3. **§A rule 5, B3 and B4 all flag "shortly" as a defect to fix. The brief
   supersedes them**: `/complete` and `/thank-you` carry the correct untimed
   pattern and must keep it. Verified and kept: `/complete` body says "will be in
   touch shortly" (one instance, byte-identical), `/thank-you` says "An
   accountant will call you then" in the picker branch and carries "shortly" only
   in its meta description (line 10, untouched). No timed promise was added and
   none was rewritten.
4. **B4's "the progress indicator sits INSIDE the hero, above the eyebrow" is
   not buildable** against the shared `SlimHero` and would fail contrast if it
   were. Full reasoning under `/thank-you` above.
5. **`/contact` has no recorded anatomy at all.** P3_ROUTE_ANATOMIES.md covers
   14 routes and `/contact` is not one of them, although B2 and B12 both cite it
   as the nearest shipped relative for other routes. A gap in the recording, not
   an error in it. Built to §0 directly.
6. **The package labels in the anatomies are stale.** B1 says P6-1, B2/B3/B4 say
   P6-2, B12/B13/B14 say P6-6. All eight are in P6-1's lease. Packaging changed;
   the anatomies themselves are unaffected.
7. **B2 attributes "An accountant will call you then" to the `/book` h1.** It is
   in the standfirst. Cosmetic.

Everything else in B1, B2, B3, B4, B12, B13 and B14 held.

## Findings reported, not fixed (outside this lease)

1. **`prose-blog` sets `max-width: 65ch` in `globals.css:268`.** Removing
   `contentNarrow` takes off the wrapper clamp, but the prose block still clamps
   itself, inside the two-column grid. At the built column width that reads as a
   typographic measure rather than a page clamp, and `globals.css` is explicitly
   outside this lease, so it is reported. If the fidelity reviewer wants §0.1
   satisfied to the letter it is a one-line change in a file this package may not
   open.
2. **`SlimHero` is `bg-slate-900` while this site's content heroes are
   `bg-neutral-900`.** `#0f172a` against `#171717`. The kit component cannot be
   themed without editing `packages/web-shared` (trap 12), and the shared footer
   is already `slate-900`, so the post-submit and legal heroes now match the
   footer rather than the content heroes. This is the N1 neutral-vs-slate
   deviation surfacing, still PENDING in DESIGN_DELTA §3. Reported, not worked
   around.
3. **`.prose-blog a` is a class rule in `globals.css` and sets
   `color: var(--accent-strong)`.** The in-body `text-cyan-800` utilities on the
   legal pages therefore already paint nothing, layered utilities losing to an
   unlayered class rule. They were left exactly as they are: removing them is
   churn in a byte-locked file for no visual change.
4. **Indentation inside the three legal prose blocks is now two spaces shallower
   than its grid parent.** Deliberate: reindenting 150 lines of legal markup
   would have destroyed the exact byte comparison that is this package's main
   safety property. Cosmetic only.

---

## Verification list for the serialised build

Run `npm run build` then `npm run start` in `contractors-ir35/web` **once**.
Everything here is **UNVERIFIED** by this package: no build was run.

1. **All eight routes still 200.** `/about`, `/contact`, `/book`, `/complete`,
   `/thank-you`, `/privacy-policy`, `/cookie-policy`, `/terms`.
2. **The legal ids are served.**
   `curl -s <base>/privacy-policy | grep -o 'id="[a-z-]*"' | wc -l` -> **11**;
   `/terms` -> **13**; `/cookie-policy` -> **10**. Then click a rail link and
   confirm the heading lands **below** the sticky header, not under it.
3. **The section rail is in the server HTML at every width.**
   `curl -s <base>/terms | grep -c 'href="#'` -> **13**. It is `display:none`
   below `lg`, not conditionally rendered, so the count must not change with
   viewport.
4. **`/cookie-policy` still names the footer toggle, and the toggle still
   renders.** `curl -s <base>/cookie-policy | grep -c "Do not track me"` -> the
   same count as on 3641 (**5**). If this drops, the policy has become false.
5. **The two policies are word-identical to 3641.** Diff the stripped text:
   `curl -s <base>/privacy-policy | sed 's/<[^>]*>/ /g' | tr -s ' \n' ' '`
   against the same command on 3641. Expect **no textual difference**; the only
   differences should be markup. Repeat for `/cookie-policy`.
6. **`/complete` all four branches.** Visit `?t=` empty (slate NoticeCard),
   `?t=junk` (slate NoticeCard, "expired or is not valid"), a valid token for a
   complete lead (primary NoticeCard, "You are all set", **and** the "shortly"
   sentence still present), and a valid token for an incomplete lead
   (`DetailsForm` asking only for the missing field, never email).
7. **`/book` both branches.** No `?t=` -> slate NoticeCard with the `/contact`
   escape. Valid `?t=` -> `BookingPicker` at container width, no `max-w-2xl`.
8. **`/thank-you` both branches, and the progress indicator.** With `?bt=` ->
   the picker in a `neutral-50` ringed card. Without -> the guides pair with
   `/blog` as a real `<a href>`. The three-step `<ol>` renders in both, step 3
   still neutral and steps 1 and 2 still amber.
9. **noindex intact.** `/book` and `/complete` emit `noindex, nofollow`;
   `/thank-you` emits `noindex, follow`. The asymmetry is deliberate.
10. **`/about` hero CTA fires a funnel row.**
    `curl -s <base>/about | grep -o 'data-cta[a-z-]*="[^"]*"'` -> the chrome's
    two plus `data-cta="hero_book"`, `data-cta-placement="hero"`,
    `data-cta-goal="form"`. Same on `/contact`.
11. **Clicking the `/about` and `/contact` hero CTA scrolls to the form**, and
    the form heading is not under the sticky header (`scroll-mt-24` on the
    `#book` wrapper).
12. **The `/about` panel publishes no proof points.** The left column must show
    eyebrow, title, description and footnote, and **no tick list**. A tick list
    appearing means `proofPoints` inherited a default, which is a fee claim and a
    turnaround promise.
13. **No hydration mismatch in the console on `/about`.** The panel `footnote`
    is inline-only; a block element inside `PanelBody`'s `<p>` is what caused one
    earlier today.
14. **Link floor.** Re-run the sweep. `/about`, `/contact`, `/privacy-policy`,
    `/cookie-policy` and `/terms` must each still be **>= 10**. `/book`,
    `/complete` and `/thank-you` are not in the swept set and have no floor.
15. **Grounds oscillate on `/about`.** navy hero -> white -> `neutral-50` ->
    white (panel section) -> slate-100 panel card -> `slate-900` footer. No two
    touching sections share a ground and nothing dark touches the footer.

---

## Receipt

- **Pages restyled: 8.** `/about`, `/contact`, `/book`, `/complete`,
  `/thank-you`, `/privacy-policy`, `/cookie-policy`, `/terms`.
- **Closing asks added: 1**, on `/about`, which is the only one of the eight
  that should have one. Seven pages deliberately have none, each with its
  reason recorded above. **No capture surface was added to a page that had
  none.**
- **Body clamps removed: 7** (`contentNarrow` x3, `max-w-2xl` x3, `max-w-3xl`
  x1). Heading ids added: **34**. Section-index links added: **29**.
- **Internal links removed: 0.** Link floor held on all five swept routes.
- **Lowest measured contrast: 4.74** (pre-existing fine print). Lowest on new
  work: **5.12**. Self-test reproduced both published anchors exactly.
- **Policy substance unchanged: YES.** Machine byte-comparison for `/terms` and
  `/cookie-policy`; element census plus text-run containment against the live
  pre-edit build for `/privacy-policy`. The only change inside any prose block is
  `id` attributes on headings.
- **`packages/web-shared` not edited.** Two constraints it imposed
  (`SlimHero`'s missing slot, `SlimHero`'s slate ground) are reported, not
  worked around.
- **`tsc --noEmit` exit 0; `eslint` clean** across all eight files.
- **Anatomy recordings found wrong: 7**, listed above. The load-bearing two are
  B1's stale fixed-fee flag and B4's unbuildable hero placement.
- **Wrong in the brief: one thing, and it is small.** The brief says `/complete`
  and `/thank-you` "say 'will be in touch shortly' and 'will call you then'".
  Only `/complete`'s body carries "shortly"; on `/thank-you` that word survives
  **only in the meta description**, and its body carries "will call you then".
  Both are the untimed pattern the brief wants and both were kept. Everything
  else in the brief held on inspection, including the corrected privacy and
  cookie copy, the removed `/about` claims, and the site-wide heading-anchor rule.
