# R6: independent re-review of the startups-tech DESIGN UPLIFT gap-fix round

Read-only. No source edited, no commit, no tag, no build, no server started or
stopped, no subagent launched. The reviewer did not build this wave and did not
write the gap-fix. Measured against the running production server at
`http://localhost:3201` (`next start` from HEAD `db2fa147`, the gap-fix commit on
top of `86997252`), asserted first:

```
$ curl -s localhost:3201 | grep -o '<title>[^<]*'
<title>Founder Tax Partners | Accountants for Funded and Scaling UK Startups
$ git log --oneline -2
db2fa147 uplift(startups-tech): gap-fix after the R5 review
86997252 uplift(startups-tech): U1 homepage, U2 hubs and detail, U3 blog and lead kit
```

Instruments, screenshots and raw JSON are in the session scratchpad under `r6/`
(`sweep_r6.json`, `browser_r6.json`, `r6_instrument.json`, `r6b_instrument.json`,
`r6c.json`, `home_1280.png`, `home_390.png`, `testimonials_1280.png`). The scratch
scripts were deleted at close.

---

## A. VERDICT

**PASS-WITH-GAPS.** Six of the seven R5 items are closed and measured closed. One
is **not closed and is now worse than it was**: the no-JavaScript FAQ release
(R5-B3). The fix pass wrote a `<noscript>` rule whose selector matches nothing on
the rendered page, and in the same pass converted 30 blog posts and 2 research
pages from always-visible markup to the same accordion, so **32 pages that DID
show their answers without JavaScript no longer do**. Everything else the pass
touched is clean: zero new contrast problems, zero console errors, zero overflow,
zero dead links, zero prose drift, all eight §9.1 rows pass, and no fix leaked
into a neighbouring surface.

**Counts.** R5 items cleared **6 of 7**. New items found: **1 blocker, 1 low, 1
nit.** Regression sweep: `66/66` URLs clean, `0` new browser problems over 152
page-loads, `0` console errors on 6 routes, `0` sentences only-before or
only-after. §9.1 gate: **8 of 8 rows pass** (kit adoption up from 8 distinct / 56
call sites to **9 / 60**; four-marker row `ping=1 stats=3 backdrop=4
rounded-full=3`).

### The homepage against Holloway Davies, from the screenshot, in plain English

**The proof band was the weakest thing on the page and is now one of the
strongest.** Where R5 saw three quotes as plain paragraphs in a bare white strip,
the page now carries a dark navy band with the stepped-ladder motif behind it and
three properly set cards, and it breaks up what was an unrelieved run of white and
pale-grey blocks through the middle of the page. No star rating was invented; the
composite-accounts note sits under the heading exactly as before.

**Corners are now right across the whole page.** Buttons, cards, form fields and
the FAQ rows all carry the house 4px radius that was painting as 0px before, which
was the single most visible thing separating this page from the standard at a
glance. It is a small measurement and a large impression.

**The length complaint stands, unchanged.** This is still fourteen bands against
Holloway Davies's nine, and it still renders over 10,000px tall at 1280. The new
dark band helps the rhythm but adds nothing to the reading. That remains a copy
and IA question for the owner, not a design defect, and it is recorded as such.

---

## B. REMAINING AND NEW ITEMS, most severe first

### B1. BLOCKER, NEW: the no-JS FAQ release does not fire, and 32 pages regressed into it

`startups-tech/web/src/app/layout.tsx:112` | expected: with JavaScript off, every
FAQ answer visible on every page that emits FAQPage JSON-LD | measured: **0 of 28
answers visible across 5 routes, `display: none` on every one**, at HEAD | **BLOCKER**
| fix: one selector, delete `[hidden]`.

The gap-fix added, inside the existing `<noscript>` style block:

```
[data-state="closed"][hidden][role="region"] { display: block !important; }
```

The force-mounted Radix content element **does not carry a `hidden` attribute**,
in the server HTML or in the DOM, so the rule never matches. Measured on the
served markup and again in the browser:

```
served HTML, homepage, first FAQ answer:
  <div data-state="closed" id="radix-_R_27qltqlb_" role="region"
       aria-labelledby="radix-_R_7qltqlb_" data-orientation="vertical"
       class="... data-[state=closed]:animate-accordion-up
              data-[state=open]:animate-accordion-down data-[state=closed]:hidden">
  -- no `hidden` attribute anywhere on the element
```

```
JS DISABLED, [role="region"][data-orientation], HEAD:
  /                                               regions= 8 visible=0 hidden=8 hiddenAttr=False
  /services/rd-tax-claims                         regions= 4 visible=0 hidden=4 hiddenAttr=False
  /blog/.../founder-salary-vs-dividends-2026-27   regions= 5 visible=0 hidden=5 hiddenAttr=False
  /research/tech-startup-survival-index           regions= 6 visible=0 hidden=6 hiddenAttr=False
  /research/uk-tech-formations-index              regions= 5 visible=0 hidden=5 hiddenAttr=False
  strayClosedHiddenRegion = 0 on all five  (the selector matches nothing at all)
```

What actually hides them is the Tailwind utility, which does not involve `hidden`:

```
$ curl -s localhost:3201/_next/static/css/608133a0ac3dbf7b.css \
    | grep -o '[^}{]*state=closed[^}{]*{[^}]*display:none[^}]*}'
.data-\[state\=closed\]\:hidden[data-state=closed]{display:none}
```

**This is now a regression, not just an unfixed gap.** At `86997252` the 30 blog
posts rendered a native `<details>` block and the two research pages rendered a
flat `h3`/`p` list; all 32 showed every answer with JavaScript off. The same
gap-fix commit moved all 32 onto the kit accordion (correctly, B4 and B6 below)
and relied on a release that does not work, so 32 pages lost a behaviour they had.
The homepage, six service slugs, five audience slugs and four calculator slugs
were already in this state at R5 and are unchanged.

`browser_check.mjs` sees the same thing from the other side: subtrees unrendered
at every width, and therefore unchecked for contrast, rose from **95** at R5 to
**117** here, and the listed elements are exactly these answer panels.

**Minimal fix:** drop `[hidden]` from the selector. Measured safe: on `/`, a post
and a research page there are **zero** `[role="region"]` elements outside the FAQ
accordions (regions counted = FAQ items counted, 8/8, 5/5, 6/6, 5/5), and zero
`[hidden]` elements of any kind that carry `role="region"`.

```
[data-state="closed"][role="region"] { display: block !important; }
```

### B2. LOW, NEW: the new comment on both blog panels states an attribution the code does not provide

`startups-tech/web/src/app/blog/page.tsx:88` and
`startups-tech/web/src/app/blog/[category]/page.tsx:108` | expected: a comment that
matches the file | measured: the claim is false and the two new A.7 surfaces now
carry no per-surface attribution at all | **LOW** | fix: correct the comment, or
give `LeadForm` a `formId` prop and pass one.

Both comments end "the LeadForm inside carries its own formId attribution
instead, same as every other LeadCTAPanel on site." Measured:

```
$ grep -n "formId" startups-tech/web/src/components/forms/LeadForm.tsx
(no output — the component has no formId prop)

rendered, /blog and /blog/seis-and-eis:   data-form-id="lead_form"
rendered, / :                             data-form-id="lead_form"
```

`lead_form` is a site-wide constant on every form on every route, so it
distinguishes nothing. Removing the wrapper ids was the right call and B2 of R5 is
genuinely closed; the consequence is simply that the two new blog capture surfaces
report as an unattributed `lead_form` like all the others, and the comment says
otherwise. This is the same class of defect as R5-B5, which this pass fixed
elsewhere in the same commit.

### B3. NIT, NEW: the blog post FAQ pays its top padding twice

`startups-tech/web/src/app/blog/[category]/[slug]/page.tsx:265` | expected: one gap
below the article rule | measured: `mt-12 border-t pt-8` on the wrapper and
`className="pt-8"` on the `FaqSection` inside it | **NIT** | fix: drop one of the
two, or pass `className=""`.

`FaqSection`'s `className` replaces its default section padding wholesale, so
passing `pt-8` also drops the kit's `bg-white py-12 sm:py-16 lg:py-20`. Layout is
otherwise correct: the section measures `left 88 width 768` at 1280, exactly the
article column (`left 88 width 768`), so nothing is misaligned. Visual only, no
copy involved.

### B4. OPEN, owner (carried from R5, unchanged): three routes have no enquiry form

`/calculators`, `/research` and `/research/startup-formation-survival-index` still
render zero `<form>`. Explicitly outside this pass's scope per the brief. See E1.

### B5. RECORDED, not a gap (carried from R5, unchanged): homepage length

Fourteen bands, 10,328px at 1280 measured on this build. Content and IA, frozen
copy, owner's call. See E2.

---

## C. CLEARED, per check, with the command and the decisive line

**C1. R5 blocker 1, the radius scale. CLEARED.** `/` at 1280, browser:

```
--radius       0rem            --radius-lg   0rem
--radius-sm    calc(0rem - 4px) --radius-xl   calc(0rem + 4px)
--radius-md    calc(0rem - 2px) --btn-radius  calc(0rem + 4px)

elements carrying a rounded-* class (rounded-full excluded): 34
   of those with a non-zero computed border-radius:          24     (was 0 of 31)
hero CTA border-radius: 4px      card border-radius: 4px     pill: 3.35544e+07px
```

Every token now resolves; none is the empty string. The 10 that still compute 0px
are `rounded-md` (`calc(0rem - 2px)`, clamped to 0) and `rounded-lg` (`0rem`),
which is the house radius working as designed and exactly what generalist does at
`generalist/web/src/app/globals.css:71`. Screenshots `r6/home_1280.png` and
`r6/home_390.png`: buttons, service cards, comparison table, FAQ rows and form
fields all render with the 4px corner; the hero pill and the avatar dots stay fully
round.

**C2. R5 blocker 2, the wrapper `data-cta`. CLEARED.** Browser, both routes:

```
/blog              document.querySelector('[data-cta^="blog_index"]') -> null
/blog/seis-and-eis document.querySelector('[data-cta^="blog_index"]') -> null
```

Capture surfaces per route unchanged at one panel each: `forms=1`,
`data-form-id="lead_form"` present on both, `#blog-lead-panel` still on `/blog`.
Site-wide `data-cta` total moves 149 -> 143, which is exactly the 1 `blog_index_book`
+ 5 `blog_index_articles` removed and nothing else. Attribution consequence = B2.

**C3. R5 gap, the accordion with JavaScript ON. CLEARED** (the OFF half is B1).
Homepage, real mouse click and real `keyboard.press`, 400ms+ settle, eight triggers:

```
before      false false false false false false false false
click #1    TRUE  false false false false false false false
click #1    false false false false false false false false     (closes)
Enter on #2 false TRUE  false false false false false false     (one open at a time)
Space on #3 false false TRUE  false false false false false
```

Opens and closes on click, opens on Enter and on Space, never more than one open.
Eyebrow marks with JavaScript OFF are visible on every route that has them
(`/` 9 of 9 visible, `/services/rd-tax-claims` 1 of 1); the `<noscript>` rules for
`.eyebrow-rule` and `.tick-draw` are the two that do work.

**C4. R5 gap, 30 posts on the kit FaqSection. CLEARED (markup and schema).**
All 32 published posts fetched from the server:

```
posts 32   FAQPage mainEntity == rendered accordion regions on 32 of 32
acceptedAnswer texts checked 205, missing from served HTML: 0
hand-rolled FAQ <summary class="... px-4 py-4 font-semibold ...">: 0 on all 32
```

The brief's `grep -c '<details'` = 0 is a false premise (D1): 3 `<details>` remain
on every post and should — the table of contents and two form disclosures. The FAQ
ones are gone. Answers are force-mounted and present in the server HTML, so the
JSON-LD asserts nothing the page does not carry; they are invisible without JS,
which is B1 and not a schema defect.

**C5. R5 gap, the two research pages. CLEARED, link and text byte-identical.**

```
$ grep -o 'href="/research/startup-formation-survival-index"[^>]*>[^<]*' <served>
  tech-startup-survival-index : ...>UK Startup Formation and Survival Index
  uk-tech-formations-index    : ...>UK Startup Formation and Survival Index
```

Both render the kit accordion (`regions` 6 and 5, matching `mainEntity` 6 and 5),
both keep the internal anchor inside the last answer, and the anchor text is the
same string as the JSX `<Link>` child at `git show 86997252:` on both files. The
JSON-LD strips the tag, so schema text and rendered text still agree (verified by
entity-decoded comparison, 0 mismatches). Keyboard focus on a new trigger returns
`rgb(79, 70, 229) 2px solid` on the slate-50 item, the site token, 6.29.

**C6. Testimonials band on `/`. CLEARED on every sub-check.** Browser at 1280 and
390 after a full scroll and settle, composited on the parent ground, oklch parsed
by canvas round-trip:

```
quotes: 3        five-star row [aria-label="Rated 5 out of 5"]: 0
quote 1/2/3 and all three attributions: byte-identical to git show 86997252:.../page.tsx
standfirst: "Composite accounts based on patterns across our client base. Names,
             amounts and specific details anonymised. The compliance situations
             described are real."                        (verbatim)
backdrop: mounted, patternId "startups-round-ladder-proof", 1 svg in the section
section ground: oklch(0.208 0.042 265.755) -> composited rgb(15,23,43)
worst text contrast, 1280: 10.55  (quote body, card ground rgb(27,35,54))
worst text contrast,  390: 10.55  (same)     nodes below 4.5: 0 of 8 at both widths
```

Screenshot `r6/testimonials_1280.png`. Ground is dark and does not collide with a
neighbour: `browser_check`'s grounds pass lists no homepage entry under either
"dark band touching the footer" (21, none on `/`) or "adjacent bands sharing a
ground" (9, none on `/`).

**C7. Regression sweep. CLEARED.** Both instruments run in the foreground from the
monorepo root, each diffing its own baseline internally:

```
$ node docs/_engines/instruments/sweep.mjs --site=startups-tech \
    --base=http://localhost:3201 --article-depth=3 --out=<scratch>/r6/sweep_r6.json
66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1806 links total),
0 data-cta regressions (143 total), 0 dash regressions (0 total)

$ node docs/_engines/instruments/browser_check.mjs --site=startups-tech \
    --base=http://localhost:3201 --grounds --out=<scratch>/r6/browser_r6.json
self-test OK (slate-500/white 4.76, slate-400/white 2.56)
grounds self-test OK
152 page-loads, 0 with NEW problems
coverage: 117 subtree(s) unrendered at every width tested, so unchecked; 0 unparseable colour(s)
```

Link total unchanged at 1806, so the two research pages kept their internal link
and nothing else moved. Console errors measured separately on `/`, `/blog`, a
category, a post and both research pages: **0 on all six**. `scrollWidth ==
innerWidth` on all six at 1280. The 117 unchecked subtrees are B1.

**C8. §9.1 gate, eight rows, comment-stripped, corrected block, `DIR=startups-tech`:**

```
1  layout-utils  : 6                              PASS (>=1)
2  kit adopted   : 9 distinct / 60 call sites     PASS   (R5: 8 / 56)
2a kit declined  : 121 comment references         report only   (R5: 123)
2b homepage mktg : adopted=4 declined=5           PASS   (R5: adopted=3)
3  webfont       : geist/font/mono geist/font/sans  PASS
4  backdrop      : 1                              PASS
5  eyebrow ratio : Eyebrow=7 section-label=0      PASS   (R5: 8/0; one Eyebrow moved inside the kit band)
6  rings not token: (none)                        PASS
7  gradients     : app/page.tsx, components/layout/StartupsBackdrop.tsx
8  ring guard    : walks=1 guards-the-guard=1     PASS
MARKERS ping=1 stats=3 backdrop=4 rounded-full=3          (R5: 1/3/3/3)
```

Distinct adoptions: Breadcrumb 17, page-blocks 10, FaqSection 9, LeadCTAPanel 8,
ScrollGlowGroup 7, NoticeCard 4, SlimHero 3, TestimonialsSection 1, StatsCounter 1.

**C9. Prose freeze. CLEARED.** Every quoted literal and JSX text run of 20
characters or more on a `+` or `-` line of `git diff 86997252 -- startups-tech/web/src`,
comments and class strings excluded, differenced as multisets. **No user-facing
sentence, figure, FAQ or label is only-before or only-after.** The whole residue is
the three expected movements: `"Frequently asked questions"` and the
composite-accounts standfirst moved from JSX text to a prop; the three testimonial
quotes and attributions moved from JSX text to `items`; and the two research
answers gained an `<a href="/research/startup-formation-survival-index">` around
the identical phrase the `<Link>` wrapped before. Nothing authored, nothing lost.

**C10. Nothing the fix pass introduced leaked.** Every hunk of the 8-file diff read.
The `<noscript>` rule cannot leak to other `hidden` elements for the reason that it
is also broken: it matches nothing. Searched the served DOM of `/`, a post and
`/research/uk-tech-formations-index` — `[data-state="closed"][hidden][role="region"]`
returns **0** on all three, `[hidden][role="region"]` returns **0**, and the only
`[hidden]` element on any of the three is one unrelated `DIV` with no class. With
the `[hidden]` removed from the selector as B1 proposes, the match set is exactly
the FAQ answers and nothing else, measured. No unused import was left behind
(`Link` and `focusRing` both still used 8 and 4-5 times in each research page,
`focusRing` 3 times in the post template, `Quote` correctly dropped from the
homepage). Zero TypeScript-visible dead code; the server built and serves all 68
sitemap routes.

---

## D. FALSE PREMISES IN THE BRIEF

**D1. "`grep -c '<details'` = 0 on three posts."** It is 3 on every one of the 32
posts, and that is correct: the table of contents and two form disclosures are
native `<details>` and always were. The FAQ ones are gone, which is what the check
meant; count `px-4 py-4 font-semibold` summary rows instead — that is 0 on all 32.
Also note `grep -c` counts matching LINES, not occurrences; on this minified
server HTML both figures need `grep -o | wc -l` to be read safely.

**D2. "Count elements whose computed border-radius is non-zero among those
carrying a `rounded-*` class."** A pass is not 34 of 34. With `--radius: 0rem` the
house scale makes `rounded-md` and `rounded-lg` legitimately 0px, on this site and
on generalist alike; only `rounded-xl` and `--btn-radius` are 4px. **24 of 34 is
the correct pass**, and the decisive evidence is that no token resolves to the
empty string any more, not the element count.

**D3. `.animate-accordion-up` is not a class token.** The class on the element is
the Tailwind variant `data-[state=closed]:animate-accordion-up`, one token. A
`grep` for the substring over-reports (it matches the variant), and a CSS class
selector `.animate-accordion-up` under-reports to zero, which is a silent false
PASS on check 3. The reliable handle is `[role="region"][data-orientation]`, which
returns exactly the FAQ answer panels and nothing else on every route tested.

**D4. "Confirm the noscript rule cannot leak to other `hidden` elements."** The
premise assumes the rule works. It matches nothing at all, which is B1. The leak
question only becomes real once the selector is corrected, so it was answered for
the corrected selector instead.

**D5. `docs/startups-tech/_port/sweep_baseline.json` records `totalCtas: 0`.**
So "0 data-cta regressions" from `sweep.mjs` is not evidence about this change; the
same empty-baseline defect R5 recorded as D4 for `cta_baseline.json` is present in
the sweep baseline too. The real, measured movement is 149 -> 143, derived from the
served HTML rather than the baseline. Both baseline artefacts should be regenerated
before anyone trusts either.

**D6. "The gap-fix diff, 8 files."** Correct, and worth stating precisely: 8 files,
108 insertions, 194 deletions, and it is a NET DELETION — it removes hand-rolled
markup rather than adding surface area. That is why the regression sweep is so
quiet and why B1 is the only thing that could have gone wrong.

---

## E. OWNER QUESTIONS

**E1. Three pages still have no way to get in touch.** The calculators index, the
research hub and the Startup Formation and Survival Index offer nothing but the
button in the header. This was raised at R5 and was deliberately left alone,
because adding a form means adding a new place to ask for a lead and you had ruled
those are yours to approve. Unchanged by this pass. Do you want the standard
closing panel and short form added on those three, using wording that already
exists elsewhere on the site?

**E2. Page length.** Still fourteen bands against Holloway Davies's nine, still
over 10,000px tall on a desktop screen. The new proof band improves the rhythm but
adds to the reading. Nothing can be cut without changing published copy, which is
frozen. Do you want a pass that proposes what to shorten or move to a second page,
for your sign-off, or leave it?

**E3. Do the FAQ answers need to work without JavaScript?** B1 is a one-line fix
and should just be made. The question behind it is whether anyone should be
spending effort on this at all: the answers are in the server HTML either way, so
search engines and AI crawlers read them, and the schema is honest. It matters for
the small share of readers with scripts blocked, and for any renderer that does
not execute JavaScript. Worth confirming you want it held to that standard before
the same rule is copied to the next site.

---

*R6, 2026-09-29. Independent read-only re-review of the gap-fix round. Nothing in
this repository was changed by this pass except the creation of this file.*

---

## Re-measure after the selector fix (2026-09-29, same session)

B1 was fixed by the coordinator: `startups-tech/web/src/app/layout.tsx:113` now
reads `[data-state="closed"][role="region"] { display: block !important; }`, with
the `[hidden]` gone. Site rebuilt and re-served on `http://localhost:3201`, title
asserted first. Only check 3 was re-run; nothing else was re-measured and nothing
was changed by this pass.

**B1 is CLOSED.**

**JavaScript DISABLED, `[role="region"][data-orientation]`, computed `display` and
rendered text, five routes:**

| route | FAQ answers | visible | hidden | computed display | eyebrow marks visible |
|---|---|---|---|---|---|
| `/` | 8 | **8** | 0 | `block` | 9 of 9 |
| `/services/rd-tax-claims` | 4 | **4** | 0 | `block` | 1 of 1 |
| `/calculators/rd-relief-estimator` | 6 | **6** | 0 | `block` | 1 of 1 |
| `/blog/saas-and-tech-finance/founder-salary-vs-dividends-2026-27` | 5 | **5** | 0 | `block` | n/a (0 marks) |
| `/research/tech-startup-survival-index` | 6 | **6** | 0 | `block` | n/a (0 marks) |

29 of 29 answers visible, 0 hidden, every one with real text rendered (for example
`/` answer 1 begins "A generalist firm can file accounts and a Corporation T…",
the post begins "For dividends received on or after 6 April 2026, the or…"). Was
0 of 28 visible before the fix.

**Note on the calculator route.** The earlier R6 run used
`/calculators/rd-tax-credit-calculator`, which is a **404** and has no FAQ; it was
reported as `regions=0` and carried no information either way. The re-measure uses
`/calculators/rd-relief-estimator` (200, 6 answers), so the calculator row is now a
real check. That was a reviewer error in the first pass, not a site defect, and it
did not change the verdict: the four other routes already carried it.

**JavaScript ENABLED, same five routes: the rule does not leak into the JS-on
state.** All 29 answers computed `display: none` while closed, exactly as before
the fix. Behaviour on `/`, real mouse click and real `keyboard.press`, 600ms settle,
tracking both `aria-expanded` and the rendered visibility of each panel:

```
before            expanded [f f f f f f f f]   visible panels []
click #1          expanded [T f f f f f f f]   visible panels [0]
click #1 again    expanded [f f f f f f f f]   visible panels []
Enter on #2       expanded [f T f f f f f f]   visible panels [1]
Space on #3       expanded [f f T f f f f f]   visible panels [2]
```

Opens and closes on click, opens on Enter and on Space, exactly one open at a time,
and the visible-panel set tracks the open item rather than staying open.

**Leak check, `[data-state="closed"][role="region"]` outside the FAQ accordions.**
Measured on `/`, the post and `/research/tech-startup-survival-index` (and on the
other two routes as well), with JS off and with JS on:

```
/                                        selector matches 8   outside accordions: 0
/services/rd-tax-claims                  selector matches 4   outside accordions: 0
/calculators/rd-relief-estimator         selector matches 6   outside accordions: 0
/blog/.../founder-salary-vs-dividends    selector matches 5   outside accordions: 0
/research/tech-startup-survival-index    selector matches 6   outside accordions: 0
```

On every route the match count equals the FAQ answer count exactly, and every
match is a `radix-*` panel inside a `[data-orientation="vertical"]` accordion.
Nothing else on any page carries `role="region"` with a `data-state`.

**FINAL VERDICT: PASS.** All seven R5 items are now closed and measured closed. The
two items left open are B2 (the blog-panel comment claims a `formId` attribution
that `LeadForm` does not provide; low, comment-vs-code) and B3 (the blog post FAQ
pays its top padding twice; nit). Neither blocks. B4 and B5 remain owner questions,
carried to section E.

*Re-measure appended 2026-09-29. Read-only; only check 3 was re-run.*
