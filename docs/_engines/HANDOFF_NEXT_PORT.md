# Handoff: port the next estate site to the Property design standard

Port the next estate site to the Property design standard.

FIRST, in this order, before anything else:
1. Load the `standard_terms` skill. It governs everything and wins on conflict.
2. Run `python scripts/port_preflight.py`. It must exit 0 before you plan or measure
   anything. It checks for stray dev servers, a STATE.md that contradicts its git tags,
   uncommitted port artefacts, and the instrument fixture test. If it fails, fix what it
   names first. Every one of those has failed on a previous port, including at the end,
   when three servers were left listening and a pickup block claimed phase 2 while git
   had tags to phase 6.
3. Read the STOP block on screen one of `docs/_engines/DESIGN_PORT_PLAYBOOK.md`, then
   section 2.1, then section 8 item 11 (the SIX kit-chrome props), then section 13. Read
   `docs/_engines/PORT_FIELD_NOTES.md` sections 4, 5, 6, 10, 11, 12 and **13**. Section 13
   is the newest (crypto) and is the one to read twice: it carries the no-chrome case, four
   briefs that were themselves the defect, a fix that propagated its own error, and three
   tooling traps that each return a clean-looking false answer.
4. **The playbook's own STOP block is STALE at this writing.** It says six sites are ported
   and charities is in progress. Eight are ported. Trust `git tag -l 'port-*'`, and fix the
   STOP block before you plan.

STATE OF PLAY. **Eight sites are ported: generalist, solicitors, dentists, medical,
construction-cis, contractors-ir35, charities and crypto.** All phases built, independently
reviewed, gap-fixed and tagged. Verify with `git tag -l 'port-*'`, which is the only
authority; STATE.md files narrate, tags record. **NOTHING IS PUSHED AND NOTHING IS
DEPLOYED. Production serves the pre-port SHA on every site, and 125 commits sit unpushed**
(`git log --oneline origin/main..HEAD | wc -l`, re-derived 2026-09-14). Push and deploy are
both owner-triggered, and the walk happens at the end once everything is done.

## READ THIS BEFORE YOU CHECK ANYTHING OUT: THE TAGGING TRAP

**A phase tag is not the end of a port.** crypto carries seven phase tags plus a
`port-crypto-complete` tag, and they point at three different commits:

| tag | commit | what it is |
|---|---|---|
| `port-crypto-phase0` | `f480c7ec` | baseline, claims audit, serious tier fixed |
| `port-crypto-phase1` … `phase6` (six tags, ONE commit) | `666ab0a2` | phases 1 to 6, one wave |
| *(untagged)* | `f9a96c30` | **the gap-fix wave: every review fix lives here** |
| *(untagged)* | `cb87416b` | manager verification record, post-port link artefact |
| `port-crypto-complete` | `6f48570a` | state doc and field notes reconciled |

Deriving command:
`for t in $(git tag -l 'port-crypto*'); do echo "$t -> $(git rev-list -n1 --abbrev-commit $t)"; done`

**A checkout of `port-crypto-phase6` is missing every review fix**: the two blocking
arithmetic defects, the invisible focus ring, the eyebrow rule, the ground convergence.
Check out `port-crypto-complete`, never a phase tag.

RULE: **tag the FINAL commit of the port, not just the phases.** `port-<site>-complete` is
now the contract. The seven other ported sites have phase tags only, so for those the last
commit touching `<site>/` is the end of the port, not `phase6`
(`git log --oneline -5 -- <site>/`). Note also that only crypto, charities,
construction-cis and solicitors have a `phase0` tag at all; generalist, dentists, medical
and contractors-ir35 do not.

## THE SHAPE THAT WORKED, TWICE NOW. THIS IS THE DEFAULT

charities and crypto both ran all seven phases in ONE session, in this shape:

1. **Phase 0 alone and gated** (`f480c7ec` on crypto): five parallel audit packages
   (source claims, rendered sweep, CSS/token, instrument baseline, structural inventory),
   then a serious-tier FIX wave, committed BEFORE phase 1 starts.
2. **Phases 1 to 6 as concurrent packages on strictly disjoint file sets**
   (`docs/crypto/_port/PHASE0_PACKAGES.md` is the template: seven packages, file sets
   written down before launch). The token ramp runs ALONE and first on any site that has
   never mounted kit chrome, because every visual package blocks on it.
3. **ONE build at wave close.** Agents never build and never serve. Each returns a WRITTEN
   VERIFICATION LIST (URL, command, expected result), and the manager executes every list
   against that one build **before tagging** (`docs/crypto/_port/V1_GAPFIX_VERIFICATION.md`
   is the record of doing it, three separate runs, deliberately not merged).
4. **Two independent adversarial reviews against the rendered DOM**, one design, one
   content (`R1_DESIGN_REVIEW.md`, `R2_CONTENT_REVIEW.md`).
5. **A gap-fix wave answering both** (`f9a96c30`, 32 files).

Phases do NOT have to run sequentially. **"One SITE at a time" still stands**; it is
concurrency across sites that cost us, never concurrency within one. Both reviews found
real defects that no package's verification list contained. That is the whole reason the
review gate exists, and on crypto two of them were BLOCKING arithmetic.

## BUDGET A MOP-UP PACKAGE FROM THE START. NEWEST STRUCTURAL LESSON

Disjoint file ownership stops agents colliding and **strands defects at the seams**. Three
separate packages on this port measured a real defect correctly and could not fix it,
because the file belonged to another package. They reported it instead, which is the only
reason it survived to the gap-fix wave rather than shipping. One of them, **a second
cascade race** (`min-h-10` and `min-w-0` both losing to the recipe they are composed over,
so the header CTA rendered 160x48 instead of shrink-to-fit, `R1_DESIGN_REVIEW.md:112-122`),
was nearly lost: both packages that found it were fenced out of its only fix point.

On crypto the mop-up was DISCOVERED at the end, after two reviews, and needed its own
commit over 32 files.

RULE: **the package table gets a final row from the start** - a mop-up package that owns
every cross-seam finding, whose input is the "reported, could not reach" list every other
package returns. Make "report what you cannot reach" an explicit DELIVERABLE of every
package, not an act of initiative. A defect a package saw and could not touch is the
cheapest defect in the port; one nobody wrote down is the most expensive.

Its second half: **list the files the wave CREATED and give each one an owner.**
`git diff --stat --diff-filter=A <phase0-tag> HEAD -- <site>/web/src`. Package file sets
are disjoint over the files that EXISTED; created files are outside the table by
construction. crypto's `_parts/PageHero.tsx` is net-new, in no package row, and now serves
nine route families and eighteen URLs, owned by nobody.

## WHICH SITE IS NEXT. DERIVE IT, NEVER READ IT FROM A DOC

A doc naming the next site goes stale, and a stale doc naming a site is the same defect as
a STATE.md contradicting its tags. Derive it:

1. `git tag -l 'port-*'` for what is done.
2. `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §2 for the estate map and §9 for the
   sequencing rules.
3. Confirm with the owner in one plain-language message before you start.

**Eight sites remain**, derived as: 18 site directories, minus the 8 tagged as ported,
minus Property (the reference, never a port target), minus ashfield (family E,
owner-locked, excluded from Track 1). That leaves **digital-agency, wills-probate,
divorce-finances, startups-tech, pharmacies, care, hospitality, ecommerce**. (The previous
handoff said "ten remain" with seven ported; it was counting ashfield and one other as
targets. Re-derive rather than subtracting from the old number.)

Selection principle: **`digital-agency` is the outlier at 90 routes and 306 posts, and its
bottleneck is indexing, not design - leave it late.** `wills-probate` and
`divorce-finances` have never launched, so they carry no cutover risk and are the safest
ports in the estate. The four remaining family-D sites are the cheapest.

## WHERE THE BAR SITS. ANSWERED 2026-09-14. READ THIS BEFORE YOU PORT ANYTHING

**This section used to say the question was open and told you not to port anything until
the owner ruled. He has now ruled. The answer is below; the history is kept under it
because the reasoning is what stops it recurring.**

The answer, in three lines:

1. **The gap was kit ADOPTION, not art direction and not content.** The owner named
   generalist - also a ported site - as one that looks good. Two sites through the same
   playbook, one over the bar and one under, and the variable between them was that
   generalist re-exported the shared design kit and crypto hand-rolled its own copies.
   Full working: `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md`.
2. **The fix was mechanical and took one session.** Six packages: a webfont, the kit
   layout and button recipes, the kit `Eyebrow`, the kit `LeadCTAPanel`, a `CryptoBackdrop`
   and the neutral ramp converted to slate. Commit `7dfe04b3`. The owner's verdict on the
   result is **"much better"**. No designer was involved, and no content changed.
3. **The playbook now has a gate for it: `DESIGN_PORT_PLAYBOOK.md` §9.1.** Run it at
   phase 6 close. It asks the one question no other gate asked - did this site adopt the
   kit, or reimplement it - and it comes with a counter-rule, because six kit components
   were correctly DECLINED on crypto and a gate that forced blind adoption would have
   shipped all six as defects. Read §9.1 whole, not just the command.

**The consequence for the sites already built, and it is the reason this is the first
thing in the handoff:**

```
DIR=<site>; P=$DIR/web/src/app/page.tsx
echo "ping=$(grep -c 'animate-ping' $P) stats=$(grep -c 'StatsCounter' $P) backdrop=$(grep -c 'Backdrop' $P) rounded-full=$(grep -o 'rounded-full' $P|wc -l)"
```

Property **1/2/3/4** ("wow"), generalist **1/2/3/4** ("looks good"), crypto pre-uplift
**0/0/0/0** ("not there"). **charities and contractors-ir35 are both 0/0/0/0 today, and
construction-cis is 0/0/4/0** - it has a `TradeBackdrop`, so it is one marker up on the
other two and still nowhere near the bar. On the §9.1 gate proper they are worse:
construction-cis re-exports nothing from the kit (**0 distinct kit components, 0 call
sites**) and ships **10 `section-label` against 0 `<Eyebrow>`** on its homepage; charities
loads **no webfont at all** and has **no backdrop**. **All three will read exactly the way
crypto did when the owner looks at them.**

**Whether to uplift those three is an OWNER DECISION. It has been put to him and he has
not answered. Do not start one, and do not record it as approved.** What you may do
without asking is run §9.1 on any site you are about to port and report the table.

The rule that replaces "do not port anything until the owner rules": **no port closes
without §9.1 passing.** Fix the gate before the next port, not after.

---

### The history, kept because it is the reasoning

The owner walked the finished crypto site next to Property and said:

> "I suppose when I look at Property, and then look at those sites, with Property I think
> wow, that's well designed. With these sites, that's not the case. However it could be
> because the UX designer designed Property and put effort into designing it for that
> niche."

**This is not a defect report and must not be written up as one. The ports met every gate
they were given.** It is a question about where the bar sits, and the owner has already
named the likely cause himself.

The mechanism, and it is consistent with the playbook's own scope: a port moves Property's
design **SYSTEM** - tokens, chrome, templates, components, spacing, card recipes - and
that transfers mechanically and provably. It does not move Property's **ART DIRECTION**:
which sections exist and in what order, what the hero is actually doing, the motif, the
section rhythm, the density, the decisions a designer made for one specific audience.
`DESIGN_PORT_PLAYBOOK.md` §0 says so in as many words: *"A port moves a site's chrome,
templates and page anatomy onto Property's design system. It is **not** a content
programme, an IA change, or a rewrite. Content, URLs and forms stay unless the owner says
otherwise,"* and every phase brief carries "ALL content and URLs stay" as a locked
decision (§ prompt templates). **So a ported site can be fully correct against every gate
in this playbook and still read as flat, because the thing that makes Property read as
"designed" was never in the port's scope.** If that holds, the method is working exactly
as specified and it is the DESIGN BRIEF that needs to change, not the execution.

**The consequence, stated plainly: seven other sites are already built to this same target
and not one of them has been seen by a visitor.** If the target is set too low, every
further port compounds the cost at zero benefit, because nothing is deployed yet and
nothing has to be unwound.

RULE: **do not start another port until the owner has ruled on what the target actually
is.** That ruling is the next session's first action, not a port.

**SUPERSEDED 2026-09-14, and the reasoning above is half wrong.** The owner ruled, and the
answer was not "the design brief needs to change". It was that the port's own scope had
been under-delivered: phase 1 lists "backdrop/motif" and phase 5 is "a 15-16 section
rebuild", both were delivered on generalist and neither was delivered on crypto. The method
was **not** working as designed on the fast ports. The execution gate is what changed
(§9.1), not the brief. The rule that replaces this one is at the top of this section.

A read-only diagnosis comparing Property against crypto on section anatomy, bespoke
components, art direction, type scale, density and copy shape - splitting the gap into
what the port should have carried and did not, what is genuinely bespoke and needs a
designer, and what is really content rather than design - was commissioned on 2026-09-14
and lands at `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md`. It did not exist when this
handoff was first written. **It exists now**, committed in `7dfe04b3` (326 lines), and its
§1, §10 and §12 are the three worth reading first: the four markers, the proposed gate, and
the nine false premises it found.

## THE ONE CHANGE THAT MATTERS MOST

Phase 0 is baseline capture AND a claims and ground-truth audit, gated, with the serious
tier fixed and committed BEFORE phase 1 starts. crypto's phase 0 alone fixed **six wrong
figures handed to users** (a CGT estimator measuring the basic-rate band against gross
income; a staking estimator starting the 45% rate £12,570 too low; a disclosure estimator
pricing reasonable care at the careless band, with a unit test pinning the wrong value; a
trader checker omitting Class 4 NIC; two worked examples), **132 FAQPage answers asserted
to crawlers across 19 posts with no on-page counterpart at all**, 17 authored gov.uk
citations per service page rendering as literal escaped markup, two canonical defects, a
duplicate Organization node, `priceRange: "££"` on a site that publishes no prices, a
Google Analytics opt-out section on a site with no GA id, and turnaround promises in **21
source locations reaching 38 of 51 URLs** against the 5 the audit first listed.

Third consecutive port where the design work was the smaller half. **Budget a third of
every port for live defects that are not design work, and report that list to the owner as
the port's headline OUTPUT, not as overhead.**

## RULES THAT ARE NOT NEGOTIABLE

- **ONE SITE AT A TIME.** Within that site, parallel packages on disjoint file sets are
  fine and fast, with a mop-up package booked from the start.
- **SWEEP BY THE RULE AND THE WHOLE SITE, never by the list you were handed.** Every list
  has undercounted: 5 turnaround sites were 21; a canonical defect on 1 route family was on
  5; an unlayered-CSS audit reported 3 rules where there were 26; a claims ledger's 26
  serious rows became 34. **And verify the list's POSITIVES**: on crypto four briefs named
  the wrong element (below).
- **GREP THE RENDERED HTML OF A SERVED BUILD, not only the repo.** A fee claim sat in
  `niche.config.json` and rendered in the footer and the Organization JSON-LD on every URL
  while appearing in no page's source.
- **PUT THE PUSHBACK CLAUSE IN EVERY AGENT BRIEF, VERBATIM** (playbook 10.1): "Verify
  against source. If this brief is wrong, say so and trust the source." Every package on
  crypto that did this caught a mis-aimed instruction.
- **THE MANAGER IS THE ONLY ONE WHO BUILDS.** Ban builds and servers in every agent brief.
  One build at wave close, every written list executed against it BEFORE tagging.
- **PROVE A SERVER'S IDENTITY AND ITS AGE before quoting it.** Assert the served page
  title, then diff a string whose commit date you know.
- **DEFAULT TO WHAT PROPERTY DOES, unless Property is evidently wrong.** Copy Property's
  ANSWER, not its DEFECTS. Known defects not to copy: `WhatToExpectCard` default props
  publish a fee line no page authored; `FaqSection` is a Radix accordion with no
  `forceMount`; `NumberedReasons` animates off keyframe classes its siblings lack; its
  `LeadCTAPanel` call site passes "Fixed fees, quoted upfront" and "24-hour response".
  Pass `proofPoints={[]}` and never invent replacements. crypto declined `FaqSection`,
  `RelatedArticles`, `BlogSidebarCta`, `BlogCategoryHub`, `LeadCTAPanel` and `SlimHero`,
  each with a written reason at the call site. That is the pattern.
- **NEVER CHANGE PROPERTY, including indirectly via `packages/web-shared/`** (trap 12).
  crypto fixed the header-CTA cascade defect site-locally with a layered rule keyed on the
  CTA data attributes. The kit-level fix crosses 18 sites and stays an owner decision.
- **POSITIONING: match what the site's own terms page already says.** The first-person "we
  do the work" voice STAYS. "Free call" STAYS. What goes is any claim to a qualification, a
  regulator, professional indemnity insurance, or performing regulated work.
- **Write the phase's work-package list down before you launch it and tick it off at close.**
- **Cap agent fan-out sensibly and say in every brief whether that agent may delegate.**
  The default line is "Do NOT launch subagents."
- No new monitor, alert, cron, email, digest, popup, modal or banner, and no change to an
  existing one's timing, trigger or cadence. Ask first, every time. This includes adding a
  capture surface to a page that had none.

## TRAPS ADDED BY THE CRYPTO PORT, read these before phase 1

- **A SITE CAN HAVE NO CHROME AT ALL.** crypto shipped **no header, no `<nav>`, no mobile
  drawer, no `<main>` landmark and no skip link on any of 51 routes**. No header component
  existed in the repo. Every phase-1 brief written for this port assumed one existed and
  four of its questions were unanswerable. It was visible in the link baseline: **608
  internal links over 51 routes, per-route floor 8, and the floor of 8 was exactly the
  footer** (post-port: min 27, total 1,497). RULE: **phase 0 must establish whether chrome
  EXISTS** before anyone plans to restyle it, and say so in one line at the top of the
  structural inventory. A port of a site with no chrome is net-new construction and the
  phase order changes. Deriving command:
  `for p in / /blog /contact /services; do curl -s <base>$p | grep -c '<header\|<nav\|<main'; done`
  Corollary: crypto carried **one `data-cta` on the whole site**, so every kit CTA is
  net-new analytics with no baseline. Record the phase-1 CTA set as a decision with its
  reason, and name the one id that must survive byte-identical.
- **THE BRIEF'S OWN DEFECT CAN BE THE DEFECT. Four times on one port.** (a) A warn-tone
  contrast failure named in a brief was **passing at 10.9 on its real ground**; the real
  failure in the same component was a brand colour at **1.06** (calculator headline labels
  rendered navy inside the navy result panel, invisible, on four calculators and four
  embeds). (b) "Six `neutral-400` research elements": the audit locates three, and the real
  research failure was a different colour at 3.73 on navy. (c) "17 gov.uk citations per
  page": the measured range across five service pages was **15 to 22**. (d) "One text-child
  field": **four**, and the fix belonged at the template. RULE: a builder's first act is to
  re-derive the brief's own number at the element the brief names, and report the
  correction as a numbered false premise before fixing anything. Cost: one grep.
- **A FIX CAN PROPAGATE THE ERROR IT WAS FIXING.** Phase 0 correctly fixed a calculator for
  measuring the basic-rate band against **gross** income, then "corrected" a band figure in
  prose **using the same gross-income method**, publishing 12,700 where the answer is
  25,270. The site's own calculator printed 25,270 on identical inputs on the next URL.
  Only the independent content review caught it. RULE: when a wave fixes a METHOD error,
  **re-derive every sibling with the correct method** rather than pattern-matching the fix,
  and where a site ships both a tool and prose about the same calculation, run the tool
  against the article's worked example. A disagreement is free evidence.
- **A SWEEP FINDS ONLY THE CLASS IT WAS SENT FOR.** The phase-0 arithmetic sweep read all
  19 posts and fixed two worked examples. **In files it had open** it missed a £2,136
  figure on a £2,400 gain (true answer £432), an expired deadline, and an inverted tense.
- **STALE TIME IS ITS OWN DEFECT CLASS and no figure sweep finds it.** An expired 5 April
  2026 claim deadline published as live guidance, and "the registration deadline **was** 5
  October 2026" for a deadline three weeks in the FUTURE, telling readers they had missed
  something they had not. RULE: sweep `must ... by <date>` / `from <date>` / `will` as its
  own pass, with today's date in hand, and re-run it every time a port crosses a tax year.
- **A GROUNDS SCAN KEYED TO NAMED TAILWIND SCALES IS BLIND TO ARBITRARY-VALUE GROUNDS.**
  The `--grounds` capture reported **0 section bands on 27 of 51 routes, homepage included**,
  and a brief then told a builder there was no section rhythm to preserve. The homepage runs
  **13 deliberate `bg-[#fafaf9]` bands**. RULE: a zero from a grounds scan means "the scan
  found nothing it knows how to name". Run
  `grep -o 'bg-\[#[0-9a-fA-F]\{3,8\}\]' <served html> | sort | uniq -c` alongside it and say
  which you measured.
- **AUDITING FROM THE SITEMAP MISSES SERVED PAGES.** crypto's sitemap lists 51 URLs; **54
  are served.** `/book`, `/complete` and `/thank-you` carry published copy including "free
  review call" and the site's only authored `data-cta`, and sat outside every claims audit.
  The sitemap was RIGHT to omit them (all three are `noindex, nofollow`): this is an
  audit-scope defect, not a sitemap defect. RULE: enumerate the content audit from the
  routes on disk (`find <site>/web/src/app -name page.tsx`), diff against `sitemap.xml`, and
  dispose of every difference explicitly.
- **A BRAND COLOUR CAN NEED THREE ROLES AND A FOURTH TOKEN.** Navy `#0e1a3a` is 17.11 on
  white and cleared every floor as a GROUND, but sits at **1.04 against the body ink**, so
  it carries no semantic signal and cannot mark an action. Burnt orange `#8f421f` (7.08) and
  `#6e3118` (9.93) became the action ramp, both already in the codebase as the site's own
  hover/active, so nothing was minted. Then **neither ramp step cleared 3.0 on navy**
  (2.42 and 1.72), so the focus ring needed its own colour: `--focus-ring: #b86c42` clears
  3.0 on all five grounds the site paints (3.99 / 3.82 / 4.29 / 4.47 / 3.79). Literal hex,
  not the v4 ramp utility, which emits `oklch()` and would not render the colour the sRGB
  ratios were measured on. RULE: measure the brand hex on every ground the site paints
  before assigning it a role, and expect ground, action and focus to be three decisions.
- **THE PORT'S OWN NEW COPY IS UNREVIEWED COPY.** Two of the worst claims found on this
  port were **written by this port**, replacing banned ones: "Read by a specialist, not a
  call centre" (contradicted by our own privacy policy: up to three firms plus three in
  related professions, with an LLM grading step) and "We confirm your exact figures" on four
  calculator pages (against `/terms` §2 and §3). RULE: the content review's scope explicitly
  includes **the port's own new headings, standfirsts, proof points and CTA labels**. Hand
  the reviewer the diff of new copy as a named input.
- **TOOLING TRAPS THAT RETURN A CLEAN-LOOKING FALSE ANSWER:**
  - **`grep -ql` prints nothing**, because `-q` suppresses `-l`. A verification harness
    built on it returned 0 for every row and read as a clean pass. RULE: **every harness
    carries a self-test row with one known-present and one known-absent string**, and
    refuses to report if the known-present row does not fire. Two lines.
  - **`getComputedStyle` misreports outlines in this environment, cause unexplained.**
    Under a real `:focus-visible` it reported `rgb(255,255,255) solid 3px, offset 0` for a
    ring that painted burnt-orange 2px at offset 2, with no such rule in any served sheet.
    A reviewer nearly filed a false BLOCKING. RULE: for outlines, reason from the emitted
    rule and confirm by screenshot; treat any focus number that is neither rule-derived nor
    screenshot-backed as unmeasured, and say so.
  - **Use `grep -boF`, never a regex, for any selector containing a backslash, bracket or
    colon.** Tailwind emits `.lg\:inline-flex{`, `.mt-0\.5{`, `.bg-\[\#0e1a3a\]{`. A regex
    probe matches nothing and reads as "not emitted". The same mistake at scale produced a
    **165-item dead-class list where the true answer was 5**. Byte offsets settle ORDER
    between two rules you have proved exist; only the matched-rule list settles EXISTENCE.
  - **Counting corrections, both directions, re-confirmed.** `grep -c` UNDERcounts against a
    one-line built stylesheet (crypto's served sheet is 76,705 bytes on zero newlines), so
    use `grep -o ... | wc -l`. `grep -c` OVERcounts against Next.js HTML, which serialises
    text again into the RSC flight payload, so report rendered findings as **per-page
    presence** and always say which of the two you measured.
- **"ZERO UNDECLARED CUSTOM PROPERTIES" IS THE WRONG CLAIM, AND IT WAS MADE.** The phase
  1-6 commit body asserted it; R1 re-derived 222 used, 224 declared, **10
  used-but-undeclared**, every one fallback-guarded. The conclusion was safe, the stated
  check was false. RULE: claim "every undeclared name is fallback-guarded, checked at the
  element", or run a bare-`var()`-without-declaration probe and say you ran it. An undefined
  custom property with **no** fallback invalidates the whole declaration and renders
  nothing with every test green - that shipped live on Dentists.
- **A `@theme` RAMP MUST BE MINTED BEFORE ANY KIT COMPONENT IS MOUNTED.** crypto had no
  `@theme` block and no `primary-*` ramp while every kit component styles off
  `text-primary-600` / `bg-primary-600` / `btnPrimary`. Token ramp is package one, alone, on
  any site that has never mounted kit chrome. Prove it after:
  `grep -o "primary-600" <site>/web/.next/static/css/*.css | wc -l` is non-zero.
- **AN UNLAYERED `body` RULE IS A LATENT TRAP THAT ONLY FIRES WHEN THE PORT TOUCHES THE
  BODY.** `globals.css:11` set `background`, `color` and `font-family` on a bare `body`,
  beating nothing until a later package added a `bg-*`, `text-*` or `next/font` class, which
  it would then have silently beaten (a v4 utility lives in `@layer utilities`; an unlayered
  element rule outranks every layer). Move `body` into `@layer base` in the token package.
- **FIXING `.eyebrow-rule` BY IMPORTING THE KIT STYLESHEET IS THE EXPENSIVE ANSWER.** It
  was emitted 26 times with no rule anywhere. Importing `globals-standard.css` drags in
  Property's emerald and cream and every collapsed `[data-draw="off"]` state, which on
  charities left 64 pages with invisible marks and needed a `<noscript>` override. crypto
  used six local lines with `(scripting: enabled)` instead. Either answer is defensible;
  choose it deliberately and write the reason down.
- Still live from earlier ports, do not rediscover them: **never declare a custom property
  whose name collides with a Tailwind v4 theme variable outside `@theme`**; the
  **calibration figures in circulation are v3** (v4 `slate-500` is 4.77, `slate-400` 2.63),
  and contrast is symmetric, so a hex has ONE ratio and THREE floors (3.0 graphic, 4.5 text,
  4.5 ground); **agreement between agents is not evidence**, only a measurement on the
  CURRENT build; **a composed override ties on specificity and loses on source order**;
  **there are two copies of several kit components** (`design/blog/` and `content/`);
  **kit chrome default props ship dead links** (playbook §8 item 11, SIX props);
  `wordmarkIcon` cannot cross the RSC boundary so the thin client shell wrapper is the
  required pattern; **a site can be missing `@source` for `packages/web-shared`**; the
  unlayered-CSS sweep must walk a character stream read `utf-8-sig`; `sr-only` on a
  `<table>` does not work; **a comment is a claim, never evidence**; **a site-local grep
  proves nothing about an estate-central mechanism** (three privacy disclosures were
  wrongly called false on charities and two had to be restored); and **the instrument must
  assert the JSON-LD PARSES per URL**.

## OWNER DECISIONS ALREADY OPEN. Do not re-ask them and do not act on them

**crypto closed none of these.** It widened three of them and added five.

1. The shared header cascade defect. Crosses 18 sites including Property. **Widened by
   crypto: `display` was not the whole race - `min-h-10` and `min-w-0` lose the same way,
   so the kit fix is larger than recorded** (R1 D6).
2. `packages/web-shared/leads/MiniCapture.tsx` publishes a timed promise under six mounts
   per site.
3. ZeroBounce receives enquirer emails from the live submit path and is not disclosed in
   the privacy policy.
4. `packages/web-shared` hardcodes an `AccountingService` schema type and a local-business
   locality. Property uses plain `Organization` and is right.
5. The dormant `packages` CTA variant in six niche.config.json files. The shared validator
   requires the key, so it cannot be removed per-site.
6. Site titles, H1s and meta still assert firm identity while `/terms` §2 disclaims the
   relationship. **On crypto this is 54 of 54 pages in three independent layers.**
7. Solicitors IR35 size test: house_positions says £10.2m/£5.1m, three pages say £15m/£7.5m
   with the lag explained correctly. THE PAGES LOOK RIGHT. Do not "correct" them.
8. Estate-wide retention: the purge cron is dry-run unless an env flag is set, and even
   armed it anonymises rather than deletes. One cron governs about twenty sites and arming
   it is irreversible across all of them. Partly narrowed by charities (wording now accurate,
   `docs/_engines/RETENTION_PROMISE_RECONCILIATION_2026-09-13.md`); the arming is untouched.
9. Property's own `niche.config.json` description publishes "Fixed fees, 24hr response".
10. Both umbrella workbooks on contractors-ir35 cite an "HMRC list" of compliant umbrella
    companies that does not exist. Report-only by owner ruling.
11. **Deploy ordering.** charities, crypto, Dentists' one-line `--primary` fix and the ten
    sites carrying the new shared prose stylesheet are four blast radii riding one decision,
    and none of them is pushed.
12. 43 blog FAQ answers on charities are asserted to Google in wording that does not match
    the page, 9 of them barely present. Needs a content pass, not a design one.
13. Fifteen sites publish that up to six firms may receive an enquiry with a 48-hour cascade
    to related professions. The coded cap is three and no adjacency step exists.
14. Property's own privacy policy claims a "published grading rubric" that does not exist.
15. `/calculators` and `/calculators/[slug]` on charities still run a pre-port hero.
16. **`tw-animate-css` is absent from `package.json` on charities, Dentists AND crypto**, so
    the kit accordion's keyframes resolve to nothing. Ten sites carry it. Adding a dependency
    is an owner call (T24).
17. The footer studio credit is a dofollow sitewide outbound link on every chromed page.
18. **NEW: the kit footer wordmark focuses at 2.52 on the footer ground, under the 3.0
    graphic floor, on every page of every chromed site** (R1 D9). crypto's own focus rings
    were all fixed; this one was not, because the fix is in a file shared with Property.
    **Same class as item 1: real defect, estate-wide fix, trap 12.** These two are crypto's
    only known-unfixed defects and both are kit-level.
19. **NEW: crypto's homepage, `/about`, `/contact` and `/research` still run a neutral type
    and border ramp on now-`slate` grounds** after R1 D4 converged the off-white grounds.
    Nothing fails a floor: this is drift, and re-ramping four surfaces is a visible design
    change, so it is an owner call, not a gap-fix.
20. **NEW: the kit footer requires a `consentToggle` and crypto passes `null`**
    (`components/ui/PageShell.tsx:85`) while `app/layout.tsx:66` mounts
    `AnalyticsProvider … posture="opt-out"`. The site ships an opt-out posture with no
    opt-out control.
21. **NEW: `crypto/web/src/app/robots.ts:80` disallows `/thank-you` and `/admin` but not
    `/book` or `/complete`**, which are served, carry published copy, and are
    `noindex, nofollow` by metadata only.
22. **NEW, crypto site-level and carried from its STATE.md:** the composite testimonials
    block on `/` and the three homepage behaviour claims (all pre-dating the port by two
    months), and `monitored_pages` has zero crypto rows, so crypto has no rewrite-decay
    detector. Arm at cutover?

## STILL UNMEASURED ON CRYPTO

R1's server died roughly 60% through the review and three interaction states were never
reached: **the mobile drawer open state** at 390/768 (contrast, focus trap, tab order,
Escape, scroll lock), **the calculator result panel's warn and edge branches**, and **the
booking picker's day strip at 390** populated. The focus-ring work in `f9a96c30` touched
the drawer's components and nobody has opened the drawer since. These are the only part of
the site no review has covered, and interaction states are exactly where a focus or
contrast fix gets missed. Re-run them first, next time a server is up.

BACKGROUND: `docs/_engines/PORT_FIELD_NOTES.md` (section 13 is crypto, section 12
charities), `docs/_engines/PROPERTY_REFERENCE_ANSWERS.md` for what the central lead
machinery actually does, `docs/_engines/ESTATE_PROSE_SWEEP_2026-09-13.md`, and
`docs/crypto/_port/` for worked examples of every artefact: the package table written
before launch, five phase-0 audits, the two independent adversarial reviews, and
`V1_GAPFIX_VERIFICATION.md`, which is the template for the manager's own verification
record.

Report to the owner like he is the CEO: recommendation in the first three lines, one
decision at the end, plain language, no file paths in the question itself.
