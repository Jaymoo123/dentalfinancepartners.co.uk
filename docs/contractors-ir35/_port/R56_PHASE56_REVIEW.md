# R56 — independent adversarial fidelity review, phases 5 and 6

`contractors-ir35` design port. Reviewer built none of this. Both phases were
tagged without a review; this is that review.

**Read-only.** No code, content or config changed. No state-changing git command.
No `next build`. One file written: this one.

## Verdict

| Phase | Verdict |
|---|---|
| **Phase 5** (`/`, `/services`, `/ir35-status`, `/for`, `/for/[slug]`) | **FAITHFUL-WITH-GAPS** |
| **Phase 6** (`/about`, `/contact`, `/book`, `/complete`, `/thank-you`, 3 legal) | **FAITHFUL** |

**Compliance-substance verdict: PASS.** The corrected prose on `/privacy-policy`,
`/cookie-policy` and `/terms` survived the restyle **word for word**. Not one word
changed. Evidence in §1.

**Gap count: 0 high, 1 medium, 3 low.** Plus 4 items I could not check, named in §11.

---

## 1. Claim 1 — compliance substance unchanged (HIGHEST STAKES)

### The brief's method does not work, and why

The brief says to diff "`git show HEAD:` against what 3651 serves". **That
comparison tests nothing.** `HEAD` is `f6d948c2`, whose ancestor `7bcab0e8`
("phases 3 to 6") *contains the restyle*. The working tree is clean and 3651
builds `HEAD`, so the brief's diff compares the restyled source against itself.

The load-bearing comparison is **`1340c74d` (phase 0 claims audit — the commit
that made the corrections) against `HEAD`**. `git log` on all three files
confirms `1340c74d` is the immediately preceding commit to touch privacy and
cookie, and that nothing between them touched the prose. I ran that instead.

### Result: word-identical

Method: strip JSX tags and `{…}` interpolations from both revisions, tokenise to
words, `difflib` opcode diff. Full output reproduced:

| Page | Pre-restyle | Post-restyle | Changed runs |
|---|---|---|---|
| `/privacy-policy` | 1639 words | 1760 | 3 |
| `/cookie-policy` | 516 words | 625 | 3 |
| `/terms` | 826 words | 942 | 3 |

The three changed runs are **the same three on every page**:

1. `insert` — the `SlimHero` import.
2. `insert` — the new `SectionIndex` array (nav labels + ids; not prose).
3. `delete` — the h1 text (`Privacy policy` / `Cookie policy` / `Terms of use`),
   removed from the body because it moved into `SlimHero`'s `title` attribute,
   which my tag-stripper discards. Confirmed rendered: each page serves exactly
   one `<h1>` carrying that exact text.

**Zero changes inside the prose body on any of the three.** No word, no
punctuation, no ordering, no numbering, no link target.

### Element census — reproduced exactly

The builder's `/privacy-policy` census reproduces, **but only when the section-index
rail is excluded from the prose block**. Whole-document counts are different and the
receipt does not say which it used. Stating both so the next reader is not misled:

| | Builder claimed (prose) | I measured (prose, rail excluded) | Whole document |
|---|---|---|---|
| `<p>` | 23 | **23** | 31 |
| `<h2>` | 11 | **11** | 11 |
| `<li>` | 22 | **22** (33 in block − 11 rail) | 48 |
| `<strong>` | 36 | **36** | 36 |
| links | 6 | **6** (17 in block − 11 anchors) | — |

The 6 prose links are, in DOM order: `/contact`, `/cookie-policy`, `/contact`,
`https://ico.org.uk/make-a-complaint/`, `/cookie-policy`, `/contact`. Matches the
claimed "5 `<Link>` + the ICO `<a>`".

`/cookie-policy`: 5 prose links (4 external browser-help + `/contact`) — matches.
`/terms`: 2 prose links, both `/contact` — matches.

### Corrections still intact (checked on the served page, not the repo)

- `"google analytics"` on `/privacy-policy`: **0 occurrences**. The removed
  opt-out section has not returned.
- `"rubric"`: **0 occurrences**. The cited-but-nonexistent grading rubric is gone.
- The corrected IP sentence `"which we do not store"`: **present**.
- The processor list and §8 first-party-analytics wording are inside the
  word-identical block, so they are unchanged by construction.

**Nothing to report. Checked and found nothing.**

---

## 2. Claim 2 — the "Do not track me" toggle

The cookie policy names the footer toggle **twice** as the reader's opt-out route
(3611 named it once; the second mention was added by the phase 0 rewrite —
correct direction).

**It renders.** Server HTML on every page in scope carries a real control:

```html
<button type="button" class="text-xs text-slate-400 hover:text-white …">Do not track me</button>
```

**It toggles both ways.** `src/components/analytics/ConsentToggle.tsx:17-21`:
`const next = optedOut ? "granted" : "denied"` — both directions, with the label
flipping to "Enable analytics" when opted out. The client chunk is referenced in
the RSC payload, so the component is wired for hydration.

**Not checked: an actual click in a live browser.** See §11.

### A false instrument in the receipt (LOW)

`P6-1_SECONDARY_LEGAL.md` states:
`grep -c "Do not track me"` on `/cookie-policy` → **"5 hits"**.

`grep -c` counts **matching lines**, and the served HTML is a single line. The
same command on 3651 returns `1`. The real occurrence count (`grep -o | wc -l`)
is **5 on 3651** (2 prose, 1 button, 2 in the RSC payload) and **3 on 3611**.
The builder's conclusion is right; the instrument named to support it is wrong,
and a later reader re-running it will get `1` and think the toggle died. I did.

---

## 3. Claim 3 — no banned claim reappeared

Swept **by rule**, on the rendered HTML of all 13 routes in scope (both servers),
with four regex families: our fees/prices, turnaround or response-time promises,
qualification/regulator/PI/regulated-work claims, client-scale claims.

`curl … | grep -o -i "fixed[- ]fee" | wc -l` re-asserted before quoting:
**0 on 3651 for every route in scope; 17 on 3611 homepage** (and 6–12 on the rest).

**Three hits, all legitimate, none a claim about us:**

| Route | Hit | Why it is not a defect |
|---|---|---|
| `/services` | "professional indemnity insurance" | Listed as a *deductible expense the reader may claim*, not a claim this firm holds cover. |
| `/thank-you` | "Aswatax, a firm of Chartered Tax Advisers" | A statement about a named third party on a post-submit surface. Recorded and allowed. |
| `/privacy-policy` | "within 48 hours" | The lead-pool internal re-offer window in the compliance text, not a promise of response to the reader. Inside the word-identical block. |

**No fee, no price, no turnaround promise, no qualification or regulator claim,
no client-scale claim anywhere in scope.**

The reverse check confirms the earlier removals held. Sentences present on 3611
and genuinely absent from 3651, by page — every one is a banned claim:

- `/` — "We work on fixed monthly fees so you always know what you're paying", "Fixed monthly fee, quoted after a call", "You will hear back within 24 hours", "We do not work with generalist clients", "We quote after a short discovery call rather than publishing a price list…"
- `/about` — "We work on a fixed-fee basis", "You know what you are paying before we start", "You hear back within one working day", "Every client we work with operates through a PSC…", "…across a large contractor client base every week" (the client-scale claim)
- `/for/[slug]` — "Fixed fees, quoted before we start", "You will hear back within 24 hours"
- `/contact` — the `<h2>` "You hear back within 24 hours" → now "A specialist gets in touch"
- `/` — the `<h2>` "What we have done for contractors" → now "The situations contractors bring us" (the composite-snapshot correction, intact)

### The untimed pattern is intact

My first pass returned 0 for "shortly" on `/complete` and `/thank-you`. **That was
my error, not a regression** — I had stripped `<head>` and both sentences are
branch-gated or in metadata:

- `/complete:95-96` — "will be in touch shortly", in the **all-set branch**, which
  needs a valid `?t=` token. Absent from a bare GET on 3611 too.
- `/thank-you:77` — "An accountant will call you then", in the **picker branch**.
- `/thank-you:11` — "will be in touch shortly" in the meta description. Byte-identical
  on 3611 and 3651.

**Untimed pattern preserved. Nothing to fix.**

---

## 4. Claim 4 — `LeadCTAPanel`, `proofPoints`, `footnote`

**`proofPoints={[]}` on every call site in scope.** Verified at source (13 call
sites site-wide, all empty) and in the rendered HTML: the strings
`"Fixed fees, quoted"`, `"quoted upfront"` and `"24-hour response"` return
**0 occurrences on every page in scope**. Property's defaults never reached this site.

**Every `footnote` is a `<span>`, and the hydration condition is clean.** Rather
than trust the source, I tested the failure directly: parsed every `<p>…</p>` in
the rendered HTML of all six panel pages and searched for a block-level child.

| Page | Block elements inside a `<p>` |
|---|---|
| `/`, `/services`, `/ir35-status`, `/for`, `/for/[slug]`, `/about` | **0** each |

The specific mismatch the `<span>` rule exists to prevent cannot occur in this
server HTML.

### GAP 1 (MEDIUM) — four pages gained a lead-capture form without an owner yes

Rendered `<form>` count, 3611 → 3651:

| Route | Before | After | Phase | Declared? |
|---|---|---|---|---|
| `/services` | 0 | **1** | 5 | Ordering declared; the *addition* is not flagged as an owner decision |
| `/ir35-status` | 0 | **1** | 5 | same |
| `/for` | 0 | **1** | 5 | P5-1 §6 notes "the page previously had no on-page form at all" — and adds one anyway |
| `/about` | 0 | **1** | 6 | P6-1 gives reasons, but does not route it to the owner |
| `/contact`, `/`, `/for/[slug]` | 1 | 1 | — | unchanged |
| `/book`, `/complete`, `/thank-you`, 3 legal | 0 | 0 | — | correctly refused |

`DESIGN_DELTA.md:287` states, in bold: **"The port adds zero capture surfaces"**.
The builder quotes that exact clause in `P6-1` as its reason to refuse an ask on
`/contact` — then adds four elsewhere.

In fairness: §5b's surrounding paragraph is about the *interruptive* set
(`SpecialistWidget`, `DeepScrollModal`, `StickyCTA`, `ReturningBar`), and that set
is **untouched** — I checked per page, 3611 vs 3651, and all three markers appear
exactly once on both. A static closing panel is arguably not what §5b means.

**But the sentence is literal and the builder applied it literally to `/contact`
and not to the other four.** Either §5b bars all four, or `/contact`'s refusal
rests on its own (good) reason — "the page IS the capture surface" — and the §5b
citation is wrong. Both readings need one owner line.

- **File/line:** `docs/contractors-ir35/DESIGN_DELTA.md:287` vs
  `contractors-ir35/web/src/app/{services,ir35-status,for,about}/page.tsx`
- **Standard:** the port adds zero capture surfaces; adding one is an owner decision.
- **Actual:** four added, none signed off.
- **Actionable:** one owner yes/no covering all four, or revert the four.

Only 1 of the 8 secondary pages gained an ask, as claimed. **The gap is in phase 5,
which the brief's framing did not cover.**

---

## 5. Claim 5 — `FaqSection` not adopted

**Confirmed, and the reason it matters is confirmed too.**

- `data-radix*` / `data-state` attributes on `/` and `/for/[slug]`: **0**.
- Native `<details>`: 5 on `/`, 4 on `/for/[slug]`.
- Source carries the written decision at `src/app/page.tsx:469` and
  `src/app/for/[slug]/page.tsx:189`.

**The JSON-LD does not over-assert.** Homepage emits 4 `Question` nodes; I
extracted each `acceptedAnswer.text`, unescaped it, and searched the server HTML:
**4 of 4 present, 0 missing**. The 5th `<details>` is the LeadForm's "Optional: a
bit more detail" disclosure, not an FAQ — so 4 FAQs, 4 questions, exact match.

---

## 6. Claim 6 — canonicals

**Confirmed in both directions, measured on both servers.**

| Route | 3611 (before) | 3651 (after) |
|---|---|---|
| `/` | homepage | homepage (correct) |
| `/services` | **homepage** | `/services` |
| `/ir35-status` | **homepage** | `/ir35-status` |
| `/for` | **homepage** | `/for` |
| `/for/it-contractors` | **homepage** | `/for/it-contractors` |
| `/about` | **homepage** | `/about` |
| `/contact` | **homepage** | `/contact` |
| `/privacy-policy`, `/cookie-policy`, `/terms` | — | each self-canonical |

Five route families were excluded from Google by one inherited line. All now
self-canonicalise. **This is the highest-value fix in the whole port.**

---

## 7. Claim 7 — link floor

Measured on 3651 with the receipt's own command (unique root-relative `href`,
fragments and queries stripped), against
`docs/contractors-ir35/_port/sweep_baseline.json` (SHA `18b4f25f`).

| Route | Baseline | P5-1 predicted | **I measured** | Floor |
|---|---|---|---|---|
| `/` | 21 | 23 | **23** | HELD (+2) |
| `/services` | 11 | 13 | **13** | HELD (+2) |
| `/ir35-status` | 10 | 13 | **13** | HELD (+3) |
| `/for` | 20 | 23 | **23** | HELD (+3) |
| `/for/it-contractors` | 15 | 18 | **18** | HELD (+3) |

Every prediction reproduces exactly. The 10 persona links survive: `grep -o
'href="/for/[a-z-]*"' | sort -u | wc -l` returns **10 on `/` and 10 on `/for`**.

**What I measured and against what:** the five swept routes above, plus the three
legal pages and `/about`/`/contact` (baseline 10 each, all still ≥10 — the legal
pages *gained* 11/5/13 in-page anchors, which are `#` targets and do not count
either way). `/book`, `/complete` and `/thank-you` are `noindex` and **absent from
`sweep_baseline.json`**, so there is no floor to measure; I confirmed only that
their rendered internal-link sets are unchanged 3611 → 3651.

---

## 8. Claim 8 — the three legal pages' new layout

All three confirmed on the served HTML:

- **Prose is first in the DOM.** In the rendered `<main>`, the prose `<a href>`
  targets all precede the first `href="#…"` index anchor on every page. Content
  order is unchanged for a reader without CSS.
- **The rail is `hidden lg:block`.** Actual class:
  `<nav aria-label="Sections of this page" class="hidden min-w-0 lg:block">` —
  `display:none`, so all 11/5/13 anchors stay in the server HTML at every width.
  Inner wrapper is `sticky top-24 rounded-xl … ring-1 ring-neutral-200/70`.
- **Two-column layout.** `grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14`
  on all three. The `contentNarrow` clamp is gone.
- **34 heading ids.** 11 + 10 + 13 = **34**. Exactly as claimed.
- **The scroll-offset rule applies.** Re-derived from the *current* build's
  stylesheet (`/_next/static/css/e2fc5c841fee2c83.css`, not the builder's older
  hash): `:where(h2[id],h3[id],h4[id]){scroll-margin-top:6rem}`. `:where()` keeps
  specificity 0, and none of the 34 ids carries a competing `scroll-mt-*` utility,
  so the rule binds.

---

## 9. Claims 9 and 10 — contrast, radius, overflow, personas

### Contrast

Self-test reproduced before trusting anything: slate-500 `#64748b` on white =
**4.76**; slate-400 `#94a3b8` on white = **2.56**. Both match the brief.

**The ramp binding is now VERIFIED, and it was the port's standing blocker.**
`P5-1` item 7 marked every contrast figure UNVERIFIED pending proof that `@source`
took. Read from the emitted stylesheet on 3651:

```
--color-primary-600:#0e7490   (cyan-700, 5.36 on white)
--color-primary-500:#0891b2   (true cyan-600, 3.68 — used nowhere)
```

The brief's own figures are right, and **P5-1's UNVERIFIED blocker now resolves
PASS**. Every ratio in P5-1 §4 and P6-1's table rests on a binding that holds.

**The real failure was really fixed.** `/for/[slug]` composite-snapshot disclaimer:

- 3611: `class="mt-4 text-center text-xs text-neutral-400"` → **2.42, FAIL**
- 3651: `class="mt-4 text-xs text-neutral-600"` → **7.49, PASS**

I did **not** re-report the homepage hero photo/gradient readings, per the brief.

### GAP 2 (LOW) — an undeclared layout change rode along with the contrast fix

The same disclaimer lost `text-center`. Cosmetic, defensible, but it is not in
P5-1 §6's "copy that changed" table and not in §5's design-standard list.

- **File:** `contractors-ir35/web/src/app/for/[slug]/page.tsx`, snapshot disclaimer
- **Standard:** declare what changed.
- **Actual:** `text-center` dropped silently.

### One radius

Across all 13 files in scope: `rounded-2xl` = **0**, `rounded-lg` = **0**,
`border border-neutral-200` on a card = **0**. Every card is `rounded-xl` +
`ring-1 ring-*/70`, or the kit's `NoticeCard`, which is that recipe. Clean.

### Personas: 10, not 12

`src/data/contractor-types.ts` has **exactly 10 entries** (lines 17, 94, 166, 238,
300, 357, 424, 486, 548, 610). Rendered: 10 on `/`, 10 on `/for`.
**The brief is right and `PHASE_PLAN.md`'s "12" is wrong.**
(Note: a naive `grep -c "slug:"` returns 12 — it catches the interface field and
the type declaration. That is the trap that produces the "12".)

### Em-dashes

**0** in all 13 files in scope.

### Unlayered-CSS trap

`className="eyebrow"` / `className="section-label"` in scope: **0**. Every eyebrow
is hand-rolled from utilities, so the unlayered `globals.css` rules that pin
`var(--accent)` cannot win. Correct.

---

## 10. Other findings

### GAP 3 (LOW) — "verbatim" is overstated on `/about`

`P6-1` states the four specialism card labels are "derived from the paragraph
verbatim". The source paragraph (read on 3611) lists: *"salary and dividend
planning, contractor expenses, PSC pension strategy, and the mechanics of the
off-payroll rules"*.

Three labels are verbatim. The fourth ships as **"IR35 and the off-payroll rules"**,
which is not in that sentence. The substance is right and IR35 is the page's own
subject, but it is authored, not lifted, and the receipt says otherwise.

- **File:** `contractors-ir35/web/src/app/about/page.tsx`, specialism card array
- **Standard:** labels verbatim from source copy, or declared as authored.
- **Actual:** 3 of 4 verbatim; 1 authored and claimed as verbatim.

### GAP 4 (LOW) — the opt-out control has no programmatic state

`ConsentToggle` renders a bare `<button>` with no `aria-pressed` and no live
region; the only signal of state is the label swapping to "Enable analytics".
A screen-reader user toggling it gets no confirmation.

**Not a phase 5/6 defect** — the file is in the shell, outside both leases, and
`packages/web-shared` is trap 12. Recorded because a compliance page names this
control as the reader's opt-out route, so its accessibility is load-bearing.

### `/contact` genuinely has no recorded anatomy

Verified: `P3_ROUTE_ANATOMIES.md` records **14** routes, B1–B14, and `/contact` is
not among them. `P6-1`'s claim is **true**. So are, by the same check, all five
phase 5 routes — `/`, `/services`, `/ir35-status`, `/for`, `/for/[slug]` are
absent from the anatomies too, so **phase 5 had no recorded anatomy to be
faithful to** and was reviewable only against §0 and `DESIGN_DELTA`.

On the brief's "7 entries reported stale": the document's staleness self-report is
at line 1082 and is a single scoped warning about B14's cookie list, not a count
of 7. **I could not find a "7 stale entries" statement in the document.** The two
staleness findings that do exist are in `P6-1` §"Where the recorded anatomies were
wrong" (B1's dead fixed-fee line, B3's overcount of "shortly"), and I confirmed
both: `/about` has no fee claim, and `/complete` carries "shortly" once, not twice.

---

## 11. What I did NOT check

The Chrome extension is not connected (`tabs_context_mcp` returns "Browser
extension is not connected"), so four items are **unverified by me**. For each I
substituted the strongest static evidence and say so plainly.

| Not checked | Substitute evidence | Strength |
|---|---|---|
| Clicking the "Do not track me" toggle both ways in a live browser | Source logic reads both directions; the `<button>` is in server HTML on every page; the client chunk is in the RSC payload | Strong, not conclusive |
| Console hydration warnings (`cannot be a descendant of <p>`) | **0** block elements inside any `<p>` across all six panel pages in the served HTML — the exact precondition | Strong |
| Horizontal overflow measured at 390px | Both `<table>`s (`/`, `/ir35-status`) wrapped in `overflow-x-auto`; **0** fixed-px widths in all 13 files; `min-w-0` guards present on every grid column | Strong, not a render |
| `#book` anchor landing clear of the sticky header | `id="book"` present once per route on all 7 CTA routes, each with `scroll-mt-24`; `href="#book"` resolves | Strong, not a scroll |

**These four should be closed by whoever next runs a browser against 3651.**
Everything else in this review was measured.

---

## Receipt

**Verdict: phase 5 FAITHFUL-WITH-GAPS, phase 6 FAITHFUL.**

**Gaps: 0 high, 1 medium, 3 low.**
- MEDIUM — four routes gained a lead-capture form with no owner sign-off, against
  `DESIGN_DELTA` §5b's literal wording, which the builder cited to refuse a fifth.
- LOW — `text-center` dropped undeclared on the `/for/[slug]` disclaimer.
- LOW — one `/about` card label authored but claimed verbatim.
- LOW — the opt-out control a compliance page names has no `aria-pressed`
  (pre-existing, outside lease).

**Compliance substance: PASS.** `/privacy-policy`, `/cookie-policy` and `/terms`
are word-identical across the restyle — 3 changed runs per page, all three being
the import, the nav array, and the h1 moving into the hero. The census reproduces
exactly (23 `<p>`, 11 `<h2>`, 22 `<li>`, 36 `<strong>`, 6 links). The removed GA
opt-out, the removed rubric and the corrected IP sentence are all still correct on
the served page.

**Builder claims that were false or overstated:**
1. `P6-1` — `grep -c "Do not track me"` → "5 hits". `grep -c` counts lines; the
   command returns **1**. Conclusion right, instrument wrong and reproducibly
   misleading.
2. `P6-1` — `/about` specialism labels "verbatim": 3 of 4.
3. `P6-1`/`P5-1` — the `/about` and `/for` capture surfaces are presented as
   settled design calls; they are owner decisions.
4. `P5-1` — the `/for/[slug]` contrast fix omits the `text-center` removal.

**Builder claims that held under attack:** every link count (23/13/13/23/18), the
10 persona links, the 5 new `data-cta` triples, the 34 heading ids, prose-first DOM
order, `hidden lg:block` on the rail, the `scroll-margin-top` rule binding,
`proofPoints={[]}`, `<span>` footnotes, `FaqSection` not adopted with JSON-LD 4/4
matched, one radius, zero em-dashes, zero `.eyebrow` use, the untimed pattern on
`/complete` and `/thank-you`, and the 2.42 → 7.49 contrast fix.

**P5-1's standing UNVERIFIED blocker is now closed:** the emitted stylesheet binds
`--color-primary-600` to `#0e7490`, so every contrast figure in both receipts rests
on a real binding.

**What was wrong in the R56 brief:**
1. **The prescribed diff method is inert.** `git show HEAD:` already contains the
   phase 6 restyle, so it compares the restyled source against itself. The correct
   baseline is `1340c74d`. I used that; the result is a pass either way, but the
   brief as written would have proved nothing.
2. **The census figures are prose-block counts, not document counts.** Whole-document
   values are 31/11/48/36 and do not match. The brief does not say which.
3. **"7 of its entries reported as already stale"** — I could not find that
   statement in `P3_ROUTE_ANATOMIES.md`. It carries one scoped staleness warning
   (line 1082). Two anatomy errors are recorded elsewhere, in `P6-1`, and both are
   real.
4. **The brief scopes the capture-surface rule to the 8 secondary pages.** Three of
   the four pages that actually gained one are phase 5 routes, which that framing
   would have missed.
5. The brief is **correct** on: 10 personas not 12, the cyan ramp figures
   (5.36 / 3.68), the slate self-tests (4.76 / 2.56), the 2.42 disclaimer failure,
   the homepage hero false 1.00 readings, and the `<span>`-not-`<div>` contract.
