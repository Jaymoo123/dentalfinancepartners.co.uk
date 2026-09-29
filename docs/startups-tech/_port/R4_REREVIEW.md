# R4: independent RE-REVIEW of the gap-fix round, startups-tech design port, phases 2 to 6

Reviewer: R4. Did not build and did not fix. Read-only: nothing edited, committed, tagged, built,
started or stopped. Scratch scripts were written to the session scratchpad and deleted; the two
instrument JSONs were kept.

Tree: wave commit `331725dc` plus the uncommitted gap fixes in 11 files.
Server: `next start` on http://localhost:3201, built from that tree.
Identity asserted before any number was quoted:
`curl -s localhost:3201 | grep -o '<title>[^<]*'` -> `<title>Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.

Instrument self-test, every browser run: Tailwind v4 `slate-500` `#62748e` on white = **4.7644**,
`slate-400` `#90a1b9` on white = **2.6301**. `browser_check.mjs` self-test: `slate-500/white 4.76`.
Compositing walks the ancestor chain through a 1x1 canvas, so `oklab()`/`oklch()` are read correctly;
every ring is read against the PARENT ground (every recipe carries `outline-offset-2`); every focus
read is taken after a 400ms settle reached by a real `keyboard.press('Tab')`, never `.focus()`.

---

## A) VERDICT

**PASS-WITH-GAPS.**

| severity | count |
|---|---|
| blocker | 1 (R2 blocker 2, still open, NEW cause) |
| gap | 1 |
| nit | 2 |

Closed and proved on the rebuilt server: R2 blocker 1 (form focus rings), R2 blocker 3 (calculator
result headline), R2 gap 4 (mobile TOC), R2 gap 5 (anchor scroll-margin), R2 gap 6 (homepage hex),
R3 G1 and G2 (Article JSON-LD), G4 (placeholder), G5 (FAQ acceptedAnswer HTML). Nine of ten items.

The tenth, **R2 blocker 2, is NOT closed**, and the fix pass introduced a new cause for it. The
`.related-card` rules are now in the served CSS, but they were copied into `@layer components`
while the kit's original is UNLAYERED. In Tailwind v4 `@layer utilities` beats `@layer components`
regardless of specificity, so the `border-color` half of the affordance never paints, and the only
remaining indicator is a 3px box-shadow ring at 22% alpha which composites to **1.41:1** on the
white card ground. Floor 3:1. The comment written above the rule asserts the opposite
("Both clear the 3:1 graphic floor on the white card ground") because it grades the solid hex
`#4f46e5` (6.29:1) and not the `/ 0.22` its own rule applies. That is the same class of false
claim-at-the-call-site that R2 recorded as its false premise D2 against the previous round.

Regression sweep is clean: 0 link-floor breaches, 0 dead internal links, 0 dash regressions, 0
contrast failures, 0 overflow, 0 console errors, and `anchorGaps` 80 -> 0 against the wave run.

---

## B) REMAINING AND NEW GAPS

### BLOCKER 1 (R2 blocker 2 still open, NEW cause). The related-card focus ring measures 1.41:1, and its border half never paints.

`startups-tech/web/src/app/globals.css:184-236` (the copied `.related-card` block, inside `@layer components`)

| | |
|---|---|
| expected | a focus indicator >= 3:1 on the card ground, on all 3 related links of 30 posts |
| measured | ring `rgba(79,70,229,0.22)` composited on `rgb(255,255,255)` = `rgb(216,214,249)` = **1.4088:1**, identical on all three links; element `outline: rgb(16,16,16) none 1px` (nothing painted); card `border-color` stays `oklch(0.929 0.013 255.508)` at `:focus-within` AND at `:hover`, unchanged from resting |
| severity | blocker |

Command and decisive lines:

```
node c2_related.mjs    (real Tab, 400ms settle, canvas composite, /blog/seis-and-eis/eis3-certificate-explained)
-> link 1 "Where UK Startup Equity Money Actually Goes"  outline 'rgb(16,16,16) none 1px'
   cardShadow rgba(79,70,229,0.22) 0 0 0 3px, rgba(67,56,202,0.6) 0 18px 40px -10px
   cardBorder oklch(0.929 0.013 255.508)   ringComposited rgb(216,214,249)   cr 1.4088
-> link 2 and link 3: byte-identical, cr 1.4088
```

Why the border half is dead, measured not inferred:

```
python  (served sheet /_next/static/css/e598a9df987f40d2.css)
-> last @layer opened before `.related-card{`        : @layer components{
-> last @layer opened before `.border-slate-200{`    : @layer utilities{
grep -n '@layer' packages/web-shared/design/globals-standard.css
-> 74:@layer base {   (the ONLY @layer in that file; the kit's `.related-card` rules at :227-254
                      are UNLAYERED, which is what lets them beat the utility)
```

The block's own header says it was "Copied verbatim from globals-standard.css:227-254". The rule text
is verbatim; its cascade position is not, and the cascade position is the whole of the effect.

Minimal fix: move the three `.related-card` rules OUT of `@layer components` in
`startups-tech/web/src/app/globals.css` so they sit unlayered, exactly as the kit sheet has them
(this is the Medical port's recorded trap: an unlayered rule beats every Tailwind v4 utility). That
restores the `border-color: rgb(79,70,229)` change, which is `#4f46e5` on white = **6.29:1** on the
card's 1px edge and is the indicator the kit relies on. Then re-measure the rendered `borderColor`
at `:focus-within` and quote it. Do NOT raise the 0.22 alpha to chase 3:1 on the glow: the glow is
decoration in the kit's own design and is not the indicator.

Also correct the claim at `globals.css:214-217`: 6.29 is the solid hex, the rendered ring is 1.41.

### GAP 2. `--calc-result-accent` fixes the four calculators here; the kit fallback still renders 2.84 on every site that does not declare the token.

`packages/web-shared/tools/components/Calculator.tsx:163`

| | |
|---|---|
| expected | the kit's default-tone result label clears 4.5:1 on its own `bg-slate-900` ground |
| measured | startups-tech: **8.9442:1** on all four tools (fixed). The fallback path `var(--calc-result-accent, var(--brand-primary))` is unchanged, so any estate site that does not declare the token still renders its raw brand hex on `rgb(15,23,43)` |
| severity | gap (estate scope, not this site) |

The fix is correct and deliberately byte-identical for non-declaring sites, which is the right call
for this wave. Recorded so the estate sweep is not skipped: the same 2.84-class defect is live on
every other site whose `--brand-primary` is a 600 step, and nothing now detects it.

Minimal fix: none in this wave. Add one row to the estate design sweep that reads the rendered
result-label contrast on `/calculators/*` per site.

### NIT 3. The MiniCapture placeholder is a hand-copied duplicate of the config string, not a read of it.

`startups-tech/web/src/components/calculators/MiniCapture.tsx:152` vs `startups-tech/niche.config.json:116`

Both now read, character for character:
`"e.g. We are raising a seed round and want to check our SEIS eligibility, or we need to set up an EMI scheme..."`
Served and confirmed on `/calculators/rd-relief-estimator` (x2) and on
`/blog/seis-and-eis/eis3-certificate-explained` (x2). The words are right and are the site's own.
The duplication means the next edit to `niche.config.json:116` will silently not reach the page.
Minimal fix: import it, or leave it and note the duplication in STATE.md. Not worth a change now.

### NIT 4. `invoicing/generate_invoice.py` is inside `git diff 331725dc` and is not part of this port.

`git diff 331725dc --stat` lists 12 files, not 11: `invoicing/generate_invoice.py` (+13 -8). It is a
pre-existing working-tree modification unrelated to startups-tech (it is already in the git-status
snapshot that predates the wave). Flagged only so it is not swept into the port commit.

---

## C) CLEARED: one line per mandatory check, with the command and the decisive output

**Check 1 - real Tab onto the form fields. R2 BLOCKER 1: CLOSED.**

```
node c1_rings.mjs / c1b.mjs   (real keyboard Tab, 400ms settle, ring composited on the PARENT ground)
/contact  SELECT name=role       (stop 12)  outline-style solid  2px  rgb(79,70,229)  offset 2px
                                            box-shadow none          parent rgb(255,255,255)  cr 6.2875
/contact  TEXTAREA name=message  (stop 13)  solid 2px rgb(79,70,229) box-shadow none   cr 6.2875
/calculators/rd-relief-estimator  TEXTAREA name=message (stop 21)
                                            solid 2px rgb(79,70,229) offset 2px
                                            parent rgb(248,250,252)  cr 6.0094
                                            box-shadow = shadow-sm only (4 fully transparent layers
                                            plus 0 1px 3px rgba(0,0,0,.1)); the `focus:ring-2` layer
                                            that measured 1.46 is GONE. No competing ring.
```

All measured stops: `outline-style: solid`, width 2px, ring >= 3:1 on the parent ground. Floor 3:1.

`/complete` **could not be measured**: `DetailsForm` needs the personal link token from the email
(the served body reads "This page needs the personal link from your email or text message");
`/complete` and `/complete?ref=TEST123` both render zero `input/select/textarea`. Source-verified
only: the `DetailsForm.tsx:29` recipe is now byte-identical in the changed respect to
`LeadForm.tsx:31`, which IS measured above at 6.2875. Stated as unproven in the DOM, not claimed
as proved.

**Check 2 - related-article links. R2 BLOCKER 2: NOT CLOSED.** See BLOCKER 1 above.

```
curl -s localhost:3201/_next/static/css/e598a9df987f40d2.css | grep -o 'related-card' | wc -l  -> 4
  .related-card{--brand-glow:79 70 229;--brand-glow-edge:79 70 229;--brand-glow-deep:67 56 202;transition:...}
  .related-card:hover{...}           (inside @media (hover:hover))
  .related-card:focus-within{...}
  .related-card{transition:none}     (inside @media (prefers-reduced-motion:reduce))
```

Hover affordance IS present and IS new: real `el.hover()`, 400ms settle, first card:
`box-shadow` before `none` -> after `rgba(79,70,229,0.22) 0 0 0 3px, rgba(67,56,202,0.6) 0 18px 40px -10px`.
`transform` stays `none` before and after (no lift; the kit has no lift either, only the shadow).
`border-color` does NOT change on hover either, the same layer defect as the focus case.
Focus indicator on all three links: **1.4088:1**, floor 3:1. FAIL.

**Check 3 - calculator result headline, all four tools. R2 BLOCKER 3: CLOSED.**

```
node c3_calc.mjs   (result state reached on each tool, label composited against the panel ground)
/calculators/rd-relief-estimator              "Estimated merged-scheme net benefit"
/calculators/seis-eis-relief-calculator       "Worst-case net loss (capital genuinely at risk)"
/calculators/emi-vs-unapproved-calculator     "EMI vs unapproved: employee tax saving"
/calculators/founder-dividend-vs-salary-calculator  "Combined tax: salary + dividend route"
-> all four: color rgb(165,180,252) on ground rgb(15,23,43) = 8.9442:1  (was 2.84), 14px / 700
curl .../e598a9df987f40d2.css | grep -oE '\-\-calc-result-accent:[^;}]*'
-> --calc-result-accent:var(--color-primary-300)          (token resolves; #a5b4fc = rgb(165,180,252))
```

The four labels are the exact four R2 quoted, so the rendered panel is the same live surface.
Floor 4.5. PASS.

**Check 4 - R2 gaps 4, 5 and 6. ALL CLOSED.**

```
node c4.mjs
mobile TOC at 390:  wrapper class "mt-8 lg:hidden [&_.sticky]:!static [&_.sticky]:!top-auto"
                    inner  class "lg:hidden sticky top-16 z-30 mb-6 -mx-4 sm:-mx-6"
                    computed position = static , top = auto        -> no sticky in effect
                    (scroll walk unchanged, as expected for a static block:
                     y=1100 tocTop=-85 / y=1500 -485 / y=2500 -1485, headerBottom 73)
TOC click at 1280:  href #what-an-seis3-or-eis3-certificate-is
                    target scroll-margin-top = 96px
                    after click: headerBottom 65 , targetTop 96 , clear +31px  (at or below: yes)
homepage bands:     5 x section.bg-stone-50 , computed oklch(0.985 0.001 106.423) = rgb(250,250,249)
                    = #fafaf9 exactly, identical to before;  sections matching [class*=fafaf9] = 0
hex census (comment-stripped, src --include=*.tsx):
  api/og/route.tsx  #0f172a #4f46e5 #334155 #64748b   (OG image, not markup)
  page.tsx          #0f0e2a        reason written directly above at :464-466
  PageShell.tsx     #4f46e5        reason written at :86-92
  StartupsBackdrop  #818cf8 x2     reason written at :20-29 and :38-43
  -> the five #fafaf9 lines are GONE. Every surviving hex has a reason within one line.
```

**Check 5 - R3 gaps. ALL CLOSED.**

```
python c5.py
Article JSON-LD, 3 posts, exactly 1 Article node each:
  /blog/seis-and-eis/seis-vs-eis-explained   (the post R3-G1 named; h1 differs from title)
    headline "SEIS vs EIS Explained: Which Scheme Fits Your Company and Your Raise?"
    rendered <h1> "SEIS vs EIS Explained: Which Scheme Fits Your Company and Your Raise?"  MATCH
    datePublished "2026-07-15"  dateModified "2026-07-15"  (both present, ISO 8601 date form)
    author    {"@type":"Organization","@id":"https://www.foundertaxpartners.co.uk#organization"}
    publisher {"@type":"Organization","@id":"https://www.foundertaxpartners.co.uk#organization"}
  /blog/seis-and-eis/eis3-certificate-explained                          headline == h1  MATCH
  /blog/research-and-development/rd-claim-notification-6-month-deadline  headline == h1  MATCH
FAQPage acceptedAnswer.text, 6 /services/* + 5 /for/*, 51 answers total:
  '<' characters inside acceptedAnswer.text:  0 on all 11   (was 12/10/14/10/8/8/10/14/8/4/4)
  answers absent from the normalised body text: 0 on all 11
MiniCapture placeholder, served:
  /calculators/rd-relief-estimator              x2
  /blog/seis-and-eis/eis3-certificate-explained x2
  "e.g. We are raising a seed round and want to check our SEIS eligibility, or we need to set up an EMI scheme..."
  == startups-tech/niche.config.json:116 character for character (see NIT 3)
```

**Check 6 - regression sweep. CLEAN.**

```
node docs/_engines/instruments/sweep.mjs --site=startups-tech --base=http://localhost:3201 --article-depth=3 --out=<scratch>/r4/sweep_r4.json
-> 66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1803 links total),
   0 data-cta regressions (66 total), 0 dash regressions (0 total)
   vs the wave run sweep_wave.json: 1796 -> 1803 links (+7), fails 0 -> 0, dashes 0 -> 0
The two posts that sat on their baseline floor, after the related-posts date reorder:
   rd-claim-notification-6-month-deadline  baseline floor 8   wave 27 -> R4 28   clear
   rd-claim-collapse-hmrc-clampdown        baseline floor 13  wave 30 -> R4 30   clear
node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201 --grounds --out=<scratch>/r4/browser_r4.json
-> self-test OK (slate-500/white 4.76, slate-400/white 2.56)
-> 152 page-loads, 0 with NEW problems
-> per-category totals, R4 vs the wave run (browser_wave.json, same 152 rows):
     overflow    0  vs 0
     contrast    0  vs 0
     anchorGaps  0  vs 80   (wave: 28 on founder-salary-vs-dividends-2026-27,
                             52 on rd-additional-information-form-guide)   R2 GAP 5 CLOSED
     noise       0  vs 1
     unparsed    0  vs 0
     unrendered 92  vs 91   (+1; the run's own coverage line reads
                             "0 subtree(s) unrendered at every width tested", so nothing is unchecked)
-> grounds: 15 dark-band-touches-dark-footer rows and 5 adjacent-same-ground rows, identical shape
   to the wave run, all pre-existing and not contrast failures
```

`sweep_baseline.json` carries no per-URL rows (it is a `links`/`ctas`/`dashes` map, totalLinks 476 at
a pre-port sha), so it supplies the per-post floors quoted above and nothing else.

**Check 7 - prose still frozen. ONE change, the expected one.**

```
python  (string-literal set-difference, comment-stripped, `git show 331725dc:<path>` vs the working
         tree, over all 12 files in the diff)
-> the ONLY prose delta in the whole fix pass:
     MiniCapture.tsx  -"e.g. pub with 12 staff, need help with tronc setup and food VAT"
                      +"e.g. We are raising a seed round and want to check our SEIS eligibility, or
                        we need to set up an EMI scheme..."
-> every other delta is a className string (5 x bg-[#fafaf9] -> bg-stone-50, the two ring recipes,
   the TOC wrapper, the article scroll-margin, the InlineMiniLeadForm ground)
-> the three apparent page.tsx "changes" (BADR / EMI option value / Maximum SEIS raise) are a
   POUND-SIGN READER ARTEFACT in my extractor, not a change:
   `git diff 331725dc -- .../page.tsx | grep -iE 'BADR|SEIS raise|EMI option value'` prints NOTHING,
   and the sentence is still served: `curl -s localhost:3201/ | grep -c 'BADR rate on qualifying
   gains from 6 April 2026'` -> 1.  (This is the recorded estate trap: the pound sign is stored as a
   unicode escape in these files and a literal read misses or mangles it.)
Scope note: the pre-fix server no longer exists and this review may not build, so check 7 is a
SOURCE diff over the 12 changed files, not a served-text diff against a pre-fix render. Everything
outside those 12 files is byte-identical by construction.
```

**Check 8 - what the fix pass introduced.**

```
git diff 331725dc --stat        -> 12 files, 180 insertions, 39 deletions (11 port files + invoicing/, NIT 4)
git diff 331725dc -- startups-tech packages | grep -E '^[+-]' \
  | grep -iE 'data-cta|formId|name=|submitLabel|leadConsent|consent|redirectOnSuccess|href='
-> 8 matched lines, ALL of them className-only pairs (the TOC wrapper, the article scroll-margin,
   the 5 bg-stone-50 sections, the InlineMiniLeadForm ground). ZERO changes to any data-cta value,
   field `name`, `formId`, consent text, submit label, or link href. No link removed.
`!important` audit, served sheet, every rule containing !important:
  .[&_.sticky]:!static .sticky{position:static!important}
  .[&_.sticky]:!top-auto .sticky{top:auto!important}
  .font-bold!  .leading-snug!  .tracking-normal!  [hidden]:where(...)   (all pre-existing)
-> the two new ones are DESCENDANT-SCOPED to the wrapper that carries the class; they cannot reach
   anything outside it. Proved in the DOM:
   node c8.mjs  at 1280: elements with class `sticky` but computed position static = exactly ONE,
     "lg:hidden sticky top-16 z-30 mb-6 -mx-4 sm:-mx-6" (the mobile TOC inside the wrapper).
     Still position:sticky and unaffected: the header ("sticky top-0 z-40 ...") and the desktop
     aside ("hidden lg:order-2 lg:block lg:sticky lg:top-24 lg:max-h-[calc...]").
   at 390: same single static element; header still sticky. No leak.
InlineMiniLeadForm ground swap is colour-neutral, measured not assumed:
  border-[var(--brand-primary)] -> border-primary-600 : computed borderLeftColor rgb(79,70,229)
  bg-[var(--surface)] -> bg-slate-50 : globals.css:64 declares `--surface: #f8fafc`, and the
  computed background is oklch(0.984 0.003 247.858) = rgb(248,250,252) = #f8fafc. Identical.
`getRelatedPosts` reorder (lib/blog.ts): the behaviour change is real and intended (candidates are
now collected, sorted by date, then sliced, instead of sliced then sorted). Link counts above show
the only measurable effect: +1 link on one of the two floor-sitting posts, 0 breaches.
```

---

## D) FALSE PREMISES

1. **`startups-tech/web/src/app/globals.css:214-217`, written by the fix pass: "Both clear the 3:1
   graphic floor on the white card ground."** They do not, as rendered. The rule applies the triplet
   at `/ 0.22`, and `rgb(79,70,229)` at 22% over white composites to `rgb(216,214,249)` = **1.41:1**.
   6.29 is the contrast of the SOLID hex, which the rule never paints. Same shape as R2's false
   premise D2: a measurement-flavoured claim written as settled at the call site, which would stop
   the next reviewer looking.

2. **The same block's header: "Copied verbatim from globals-standard.css:227-254 rather than
   importing the whole file."** The declarations are verbatim; the CASCADE POSITION is not. The kit's
   copy is unlayered, this copy is inside `@layer components`, and in Tailwind v4 that is the
   difference between the border half winning and losing to `.border-slate-200` in `@layer utilities`.
   Measured: `borderColor` unchanged at `:focus-within` and at `:hover`.

3. **This review's brief: "one DetailsForm field on `/complete` (if reachable without a token)".**
   Not reachable: the page renders zero form controls without the emailed link. Reported, not faked.

4. **This review's brief: "the calculator MiniCapture placeholder now reads the site's config
   string".** It does not READ it; it is a second hand-written copy of the same string. The words
   match `niche.config.json:116` exactly, so the user-facing outcome is right, but "reads" is wrong
   and the two can drift. NIT 3.

5. **R2's GAP 6 minimal fix was "write one shared comment above the first occurrence".** The fix pass
   instead DELETED the hex and used `bg-stone-50`. That is a better fix and it is colour-identical
   (`rgb(250,250,249)` both before and after, measured), but it means the census now shows 8 hex
   lines in 4 files rather than 13 in 5, so anyone re-running R2's expected-survivor list will see a
   mismatch that is an improvement, not a regression.

6. **This review's brief: "the CURRENT working tree (wave commit `331725dc` plus the uncommitted gap
   fixes in 11 files)".** The gap fixes were committed during this review as `64750aa0`
   ("port(startups-tech): gap-fix round after the R2 design and R3 content reviews"); the working
   tree is now clean for `startups-tech/` and `packages/`. Nothing measured here changes (the
   content is identical, and `git diff 331725dc` reads the same either way), but the wave is already
   on `main` with BLOCKER 1 in it.

---

## E) OPEN QUESTIONS FOR THE OWNER

1. **The "related reading" cards at the foot of every article still do not show a keyboard user where
   they are.** The fix put the styling in, but it landed in the wrong slot in the stylesheet, so the
   half that draws the coloured edge round the card is being overruled and never appears. What is
   left is a faint purple haze you cannot really see. It is a one-line move of the same block, no new
   colours and no new wording. Shall we finish it?

2. **Everything else from both reviews is done and measured.** The enquiry boxes now light up when
   you tab into them, the purple label on the calculator results is readable (was well below
   standard, now comfortably above), the contents list on a phone no longer pretends to pin, clicking
   a contents item now lands on the heading instead of under the top bar, and the calculator example
   text now talks about seed rounds and share schemes instead of a pub and its tips. No sentence you
   wrote has changed.

3. **One thing that is not this site's problem but is worth knowing.** The readable-purple fix was
   made safe for every other site by leaving them exactly as they were. That means the same
   hard-to-read calculator label is still live on the other sites that use the shared calculator. Do
   you want that added to the next estate-wide tidy-up, or left alone for now?

---

## Not run, and why

- `npx tsc --noEmit`, `npm test`, `python scripts/check_dependency_closure.py`: this review is
  read-only against an already-running build and may not build. Still owed before the wave closes.
- A served-text diff of `/`, `/contact`, a post and a calculator against a PRE-FIX render: the
  pre-fix server is gone and rebuilding is out of scope. Substituted with a source-literal
  set-difference over the 12 changed files, stated as such in check 7.
- The `/complete` DetailsForm ring in the DOM: token-gated, see false premise 3.
