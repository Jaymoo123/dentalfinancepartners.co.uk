# pharmacies (Pharmacy Tax) site state

## PICKUP BLOCK (read this first) - design port

**Where it stands.** PORT COMPLETE 2026-10-07 (commit: see tag port-pharmacies-complete; tags
phase1..phase6, uplift and complete all on that commit). NOT deployed. NEXT: owner walk on
next start -p 3111, owner decisions bundle below, then care. Storage prefix for
this site is **pfp** (confirmed in `layout.tsx` and in every W7 key, not `phfp`). Local dev
server for this port runs on port **3111**.

| phase | tag | commit |
|---|---|---|
| 0 | `port-pharmacies-phase0` | `d2f6677fe` |
| 1 | `port-pharmacies-phase1` | `8b25aaa60` |
| 2 | `port-pharmacies-phase2` | `8b25aaa60` |
| 3 | `port-pharmacies-phase3` | `8b25aaa60` |
| 4 | `port-pharmacies-phase4` | `8b25aaa60` |
| 5 | `port-pharmacies-phase5` | `8b25aaa60` |
| 6 | `port-pharmacies-phase6` | `8b25aaa60` |
| uplift | `port-pharmacies-uplift` | `8b25aaa60` |
| complete | `port-pharmacies-complete` | `8b25aaa60` |

## 2026-10-07 design port, phases 1 to 6 (one wave) plus phase 0 close

Phases 1 through 6 were built today as one concurrent wave on the owner's instruction
(ultracode-style parallelism: the playbook allows non-sequential phases, sites stay serial,
phases do not). All six tags (`port-pharmacies-phase1` through `phase6`) land on the same wave
commit (commit: see tags port-pharmacies-phase1..phase6). Reviews R2 and R3 and the wave
verification V1 are running now; results below are marked pending. Full detail:
`docs/pharmacies/_port/` (PHASE1_PACKAGES.md, PHASE2-6_PACKAGES.md, every P1x/Wx/Gx/K9/M1a
receipt, R1_PHASE1_REVIEW.md, V1_PHASE1_VERIFICATION.md).

### Package table, one-line result each

| pkg | scope | result |
|---|---|---|
| P1-A | tokens: `globals.css`, `layout.tsx` font/noscript, `package.json` | brand ramp pinned at the 950 step (`#0f3a4a`, the brand hex, never shifted), button-ground trio, two-valued focus ring, motion layer and glow channels declared; webfont moved to `<html>`; DONE |
| P1-B | `layout-utils.ts` -> kit re-export | kit re-exports adopted for every symbol with a consumer, one dead export (`linkArrow`) deleted, every recipe ends `outline-[var(--focus-ring)]`; DONE |
| P1-C | kit `PageShell` + `SiteHeader` + `SiteFooter` + nav; `ConsentToggle`; `StickyCTA` re-mount | kit shell mounted, `ConsentToggle` created new (first opt-out affordance on this site), all three pre-port CTA triples preserved on 55/55 routes; DONE, footer thinness and skip-link cascade loss found by R1 and closed by G1/G2 |
| P1-D | `neutral-*` -> `slate-*` in 26 files | 444 occurrences swapped, mechanical, same numeric step, zero other changes proven by diff; DONE |
| P1-E | `PharmaciesBackdrop.tsx` (new) | dispensary-shelf motif SVG, zero JS, zero overflow at any width; DONE, R1 called the render "graph paper" not shelving (cosmetic, M2) |
| P1-F | `focus-ring.test.ts` (new) | ring-guard test built, corpus walk + guards-the-guard assertion; DONE |
| W2 | blog subsystem, 28 routes | kit `Breadcrumb`/`HubArticleList`/`TableOfContents`/`ReadingProgress`/`RelatedArticles`/`BlogSidebarCta`/`FaqSection`/`LeadCTAPanel` adopted, nothing authored, one behaviour fix in `getRelatedPosts`; DONE |
| W3 | templates and hubs, 15 routes + 2 data files | `SlimHero`, `Breadcrumb`, `FaqSection`, `LeadCTAPanel`, `ScrollGlowGroup`, `StatsCounter`, `CardStack`, `CoverageCards` adopted (two stale declines re-derived and taken); `/for` hub gets its first form; local `Breadcrumb.tsx` retired to a delegation shim; DONE |
| W4 | calculators + embed surface | `Breadcrumb`, `Eyebrow`, `FaqSection`, `NoticeCard`, `ExampleFigureNote`, `LeadCTAPanel` (new on `/calculators` index) adopted; embed surface stays bare, visually-hidden `h1` added; DONE |
| W5 | homepage + `/about` | four-marker row moved 0/0/0/0 -> 1/2/4/3 (Property and generalist read 1/2/3/4); 14 bands (brief's "15" was a miscount) rebuilt with `StatsCounter`/`CoverageCards`/`ScrollGlowGroup`/`NumberedReasons`/`Eyebrow`/backdrop; one wording deletion found and flagged; DONE |
| W6 | contact, funnel, legal, research, forms | `LeadCTAPanel` added to `/contact` and both research pages (+2 forms on the two highest-authority surfaces), `leadConsentText` and `MiniCapture`'s prop signature frozen, the one pre-existing `tsc` error closed, vitest 6 files/40 tests green; DONE |
| W7 | capture surfaces (owner decision 1) | all four surfaces (SpecialistWidget, DeepScrollModal, ReturningBar, StickyCTA) built and mounted with Property's suppression rules copied as data; a focus trap, Escape handler and focus return added to `DeepScrollModal` that neither Property's nor construction-cis's source has; sticky-bar-over-footer-consent-control fixed with an `IntersectionObserver`; DONE |
| G1 | gap-fix after R1 | homepage focus rings already closed in the tree (stale-build artefact); thin 5-column footer fixed with a footer-only nav override (9 links to 27); DONE |
| G2 | globals.css gap-fix | skip-link focus rule moved unlayered so it beats the kit's utility-layer trap (closes B1); inherited kit `line-height:1.2` documented as a deliberate handoff, not edited; DONE |
| G3 | grounds fix | 17 dark-on-dark routes and 5 adjacent-white-on-white routes fixed via `LeadCTAPanel`'s `contained`/`ground` props, no wording/form/link/adoption touched; DONE |
| K9 | `lib/schema.ts` + `globals.css`, manager-direct | FAQ answers stripped to plain text for JSON-LD (5 of 61 carried markup, entity-decoded too); DONE |
| M1a | pre-build wiring mop-up | `BlogPosting` JSON-LD wired, `NextStepOffer` mounted on 3 pages, `data-cta` added to 2 of 4 enquiry forms (2 post-submit forms deliberately skipped), W5's band-10 wording deletion restored; one W6 finding (`consentText` "dead code") disproved and left alone; DONE, residuals listed below |

### Gate table (manager's result, recorded verbatim)

```
1  layout-utils  : 7
2  kit adopted   : 12 distinct / 83 call sites (final tree, re-run at tag time; 69 at the wave build) (CoverageCards, LeadCTAPanel, NumberedReasons,
                   ScrollGlowGroup, StatsCounter, TestimonialsSection, Breadcrumb,
                   ExampleFigureNote, FaqSection, NoticeCard, SlimHero, page-blocks)
2a kit declined  : 62 comment references
2b homepage mktg : adopted=6 declined=6
3  webfont       : next/font/google
4  backdrop      : 1
5  eyebrow ratio : Eyebrow=9 section-label=0
6  rings not the token: no off-token rings
7  gradient grounds: app/page.tsx and PharmaciesBackdrop.tsx (measured in G2/R1 receipts)
8  ring guard    : walks=1 guards-the-guard=1
```

**Four-marker thermometer** (`animate-ping` / `StatsCounter` / `Backdrop` / `rounded-full`),
measured on `app/page.tsx`: **ping 1, stats 3, backdrop 5, rounded-full 3** (was 0/0/0/0 at
phase 0).

**Build:** `tsc` clean. `vitest` 7 files / 72 tests green. Dependency closure OK across 19
sites. Build green, 72 static pages. `BUILD_ID LsrdJDbZT1Ws9SYqZ_m_c`.

### Review results

**V1 (wave verification).** 0 blockers. `sweep.mjs`: 55/55 URLs clean, 0 link-floor breaches,
links 813 before the wave to 1723 after (+910), 0 `data-cta` regressions. The shared
acceptance table (tsc, vitest, dependency closure, em-dashes, hex literals, `neutral-*`,
`section-label`, nested shells, `data-cta` on a `<div>`) all pass, with one gap flagged for
R2/R3: `error.tsx:64`'s hex carries no reasoning comment. Grounds delta vs the phase-1
baseline: darkOnDark improved 17 to 8, adjacentSame regressed 5 to 8, both localised to
`/blog` and its five category hubs plus two sampled posts (reported, not fixed, by V1's remit).
Four-marker thermometer re-derived at **1/2/4/3**, matching Property's own row order
(1/2/3/4); the brief's 3/5 was a mis-transcription, not a later commit.

**R2 (design fidelity).** 2 blockers, 7 serious, 6 minor. Not ready to tag at the time it
ran. Disposition:

| finding | severity | disposition | closed by |
|---|---|---|---|
| B1: 390 sticky bar at 188px height, overlapping the widget launcher | blocker | fixed | W7B |
| B2: three capture surfaces publish one offer with no mutual exclusion | blocker | fixed | W7B |
| S1: 11 unringed links on dark grounds, 1.56 ratio | serious | **open, for R4** (a TSX `className` fix, not W7B's lease) |
| S2: two brand darks plus a borrowed kit dark on the same page | serious | **open, for R4** (needs a kit `sectionClassName` prop; logged as a kit ask) |
| S3: `.ground-dark` missing from every kit-painted dark band | serious | fixed | G4 |
| S4: homepage numerals/rules do not paint with JS off | serious | fixed | W7B |
| S5: `/calculators`, `/blog`, `/blog/[category]` have no hero band; `/services`/`/for` heroes are thin | serious | fixed | UA (named by R2 as shape, sent to the uplift rather than to a fixer) |
| S6: `/blog` and its five category routes end dark-on-dark against the footer | serious | fixed | UA |
| S7: research-hero captions at `white/50` measure 4.29, under the 4.5 floor | serious | **open, for R4** (not in any uplift package's OWNS set) |
| M-a: `#fafaf9` normalised to `slate-50` with nobody asking | minor | logged, owner's line, not re-opened |
| M-b: `error.tsx:64` raw hex with no ring | minor | fixed | UC |
| M-c: footer credit gradient hex, instrument blind spot | minor | not a finding, logged so it is not re-filed |
| M-d: `/book` and `/thank-you` carry no breadcrumb | minor | logged, owner question |
| M-e: disabled pagination controls at 2.53 | minor | logged, outside the WCAG floor that applies to disabled controls |
| M-f: widget launcher looks clickable with JS off | minor | kit behaviour, log only |

**R3 (content and claims).** 0 blockers, 2 serious, 4 minor (two of the four pre-existing,
not wave regressions). Disposition:

| finding | severity | disposition | closed by |
|---|---|---|---|
| S1: homepage band 10 lost its sr-only table caption | serious | fixed | M1b |
| S2: blog-post breadcrumb carries the full post title (worst case 83 chars) | serious | fixed | M1b |
| m1: two research pages ship the kit's default FAQ eyebrow/heading | minor | **open, for R4** (one `eyebrow=""` line each, not in any uplift package's OWNS set) |
| m2: `tool.intro` renders twice on two calculators | minor | pre-existing, not a wave regression, left as is |
| m3: `pound-sterling` literal in `llms.txt` | minor | pre-existing, not a wave regression, left as is |
| m4: `NextStepOffer` review line missing a full stop | minor | **open, for R4** (one character, W7's lease) |

Of 2,501 phase-0 prose sentences, exactly one was lost (R3's S1, now restored). Zero
em-dashes, zero invented identity or rating, zero fee/turnaround claims beyond the standing
line, every figure reconciled to `rates_ledger.json`. R3's process finding (the wave was
uncommitted with no phase tags) is resolved by this close: tag before the next change lands.

### Uplift (same day)

Section 0 of `docs/pharmacies/_port/UPLIFT_PACKAGES.md` re-derived the section 9.1 gate and
**deleted two of the four session-plan packages before either was built**: **U4** (motion,
tokens, foundations) because everything in its scope (`globals-standard.css`, the four glow
channels, `tw-animate-css`, `--radius`, `.story-numeral` rules, the `<noscript>` release, grey
ramp at 0 `neutral`/0 `stone`) had already landed in phase 1/G2/G3, so there was nothing left
for it to do and nothing for U1-U3 to wait on; **U1** (a homepage rebuild) because the homepage
already measured at the reference level (14 bands, 11 eyebrows, 3 glow groups, thermometer
1/2/4/3) and stayed in scope only as a review row. U2 survived, promoted and split into UA
(thin hubs) and UB (detail templates) because the two families needed different judgement on
disjoint files.

**The three surviving packages, one line each:**

- **UA (thin hubs, Opus).** `/blog`: 1 section to 4, eyebrow 0 to 1, glow 0 to 1. `/blog/[category]`:
  1 section to 3, eyebrow 0 to 1, glow 0 to 1. `/calculators`: 1 section to 3, eyebrow 0 to 1, glow
  0 to 1, and its one `sameAdjacent` ground collision closed. `/services`: sections held at 4,
  eyebrow 0 to 1, glow 0 to 1. `/for`: sections held at 3, eyebrow 0 to 1, glow held at 1.
- **UB (detail templates, Sonnet).** H1 type step raised on all four templates (`services/[slug]`,
  `for/[slug]`, `calculators/[slug]`, `blog/[category]/[slug]`). `calculators/[slug]`'s one
  `sameAdjacent` ground collision closed (the wrapper section moved to `bg-white`).
  `blog/[category]/[slug]` gained its first eyebrow (0 to 1) and its closing panel moved off the
  navy-on-navy ending onto `contained ground="slate"`, closing R2's finding on all 22 post routes.
- **UC (standalone, funnel, legal, error, Sonnet).** `error.tsx`'s one real paint defect fixed
  (raw hex to `text-primary-700` plus a focus ring). `/contact` gained its first eyebrow.
  Both research pages gained a glow group (0 to 1 each) and two new `data-cta` ids each. A KIT
  ASK was logged, not shipped: `layout-utils.ts` has no `chip*` or `input*` recipe for
  `BookingPicker.tsx`/`DetailsForm.tsx` to adopt.

**Gap-fixers.** **W7B** closed R2's two blockers (B1, the 390 sticky-bar/widget collision; B2,
the three-surface mutual-exclusion gap) plus S4 (the JS-off numeral release) and the unverified
half of the H8-9 focus-return fix, adding 11 new tests. **G4** closed S3 by keying the
dark-ground ring token off the ground utility classes themselves
(`.bg-slate-900`/`.bg-primary-950`/`.bg-primary-800`), a `globals.css`-only change. **M1b**
closed both of R3's serious items: the homepage's sr-only table caption restored verbatim, and
the blog-post breadcrumb's final crumb truncated to its first clause, hard-capped at 60 chars.

**Tests.** 8 files / 83 tests, up from the 7/72 baseline the uplift started from (the delta is
W7B's new `capture-exclusion.test.ts`, 11 tests).

**New eyebrow labels.** Every eyebrow UA added repeats a string the route already prints
elsewhere on the same page: `"Blog"` on both `/blog` and `/blog/[category]` (the route's own
breadcrumb crumb label), `"Calculators"` (the breadcrumb crumb), `"Services"` (the route/nav
label, printed above the different heading "Service tiers"), and `"Who we help"` (the
crumb/nav label, printed above five different card headings). UB and UC's eyebrows follow the
same rule: `post.category` on the blog-post template (already the breadcrumb's second-to-last
crumb) and the existing nav labels "Contact"/"About".

**Authored lines: none.** No sentence, heading, FAQ question, FAQ answer, figure, label or
button text was written, rewritten or deleted anywhere in the uplift. Every new visible string
is a second occurrence of one the route already renders.

**Final verification (V2) and R4, run.** 1 blocker each.

V2: the DeepScrollModal guard (B2) tested only whether the kit widget's dialog exists in the
DOM, not whether it is open, so on desktop the widget's own auto-opened panel pre-empts the
modal in normal browsing. Everything else clean: 55/55 routes, 0 overflow, 0 dark-on-dark, CTA
ids held, sticky bar 72px at 390, skip link first on Tab, FAQ text and numerals survive JS off,
the gate table and the four-marker thermometer both pass.

R4: 1 blocker, 4 serious, 5 minor. Closure table: R2's B1, B2, S3, S4, S6 and M-b, and R3's S1
and S2, are CLOSED. R2's S5 is partly closed (three hubs fixed, two heroes still thin). Still
open: S1 (unringed links, 1.56 ratio), S2 (four distinct darks), S7 (research captions at
4.29), M-d (`/book`/`/thank-you` breadcrumb), m1, m4. New this pass is the G4 regression: the
light-card ring reset also matched white CTA buttons, so 15 rings across 14 routes now measure
1.00. Parity verdict: heroes and the type ramp sit at the standard reference level; the gap is
card-wall affordance (no icon, arrow or hover on the hub grids), 1 eyebrow per hub against the
reference's 4 to 6, and 4 distinct illustrative kit components against Property's 12.

**Fix round after V2/R4 (done).**

- **W7C** — the modal guard now re-arms via a `MutationObserver` when the widget panel closes;
  the real defect was the one-shot gate, not the selector. Blog takeaways band ground fixed.
  No prose changed; V2's "rewording" finding was its own hyphen-stripping normaliser.
- **G5** — ring reset scoped with `:not(a):not(button)`. 10 prose-anchor rings closed at the
  token level with one base rule. Captions moved to `white/60`. m1 fixed (empty FAQ eyebrow).
- **UA2** — hero padding raised on `/services` and `/for`; `/for` card wall gets at-rest
  affordance; `/blog` gets a second eyebrow. Four or more eyebrows per hub is unreachable
  without owner-written labels.
- **UB2** — `CoverageCards` and `NumberedReasons` adopted on the service detail template,
  `CoverageCards html` on the hub detail template, kit `Prose` on the calculators template.
  V2's white/white ground pair closed. Eyebrows land at 3/1/1.

Tests now 8 files / 86.

**Final verification (V3), 0 blockers.** B1 (V2's blocker) closed: W7C's 7-step walk at 1440
proved live, the deep-scroll modal now re-arms itself once the auto-opened widget panel is
dismissed, no second manual scroll pass needed. sweep.mjs 55/55 clean, 1723 links, 0 link-floor
breaches. cta_snapshot.mjs 362 tags / 31 triples, byte-identical to V2. `tsc` clean, vitest
86/86 green, dependency closure OK. darkOnDark 0. adjacentSame narrowed to 2 routes (4
occurrences, 390 only, the two blog posts' key-takeaways band). JS-off FAQ check 10/10 answers
visible (closes V2's note 4 outright, correct Radix selector this time). Gate table and
four-marker thermometer both pass, unchanged from V2. Tooling caveat, not a site defect: the
headless Edge instance used for this pass could not independently re-measure two ring/caption
ratios live (an `outline-color` transition and alpha-compositing artefact in the harness
itself); both are confirmed correct at the code level instead.

**Re-review (R5), 0 blockers, 1 serious, 4 minor.** The serious finding is new and no prior
round caught it: the kit `BlogSidebarCta`'s default button paints white on `primary-600` at
3.71 contrast, on all 22 blog posts, invisible to earlier sweeps because the card is
`hidden lg:block`. Fixed by adding one `buttonClassName` prop at the call site, no copy or
link change. The 4 minor findings: a missing full stop in `widget-config.ts` (still open since
R4), an un-grounded `NextStepOffer` mount producing `adjacentSame=1` on 13 detail routes
(still open since R4's N3), STATE.md's adopted-component list overstating what actually
renders (corrected below, see R5), and the `/book`/`/thank-you` breadcrumb gap (owner question,
unchanged). R5 also surfaced and discarded an instrument incident: an immediate
`outline-color` read after `.focus()` caught Tailwind's `transition-colors` mid-transition and
reported six rings at 1.00; a 320ms settle before reading showed every one of those rings at
12.18. R4's own 1.00 figures are very likely the same artefact. On that corrected measurement
R5 closed N2, S1, S7, m1, the three calculator-slug grounds, and the blog key-takeaways band.
Accepted as parity or routed to the owner, not findings: the widget's auto-open, the four
distinct dark grounds, eyebrow density, and the illustrative-component count. R5's parity
verdict: pharmacies now reads at the Property/generalist standard on structure; what is left
is decoration (the services card wall needs a designer, the eyebrow and illustrative-component
gaps need owner-authored copy).

**Final fix (FINAL_FIX_RECEIPT.md):** `BlogSidebarCta` `buttonClassName`, `widget-config.ts`
full stop, `NextStepOffer` grounded on 13 routes.

**Agents used, this port end to end: about 68** (manager's own count of every launch: 5 programme research and planning, 10 phase 0, 11 phase 1, 16 wave, 4 reviews and verifications on the wave, 12 uplift and fix rounds, 4 final verifications and re-reviews, 6 docs). The 39 counted below was package names only. Counting every named package/review agent across
phases 0 to 6 and the gap/ground fixes (`P1-A` through `P1-F`, `W2` through `W7`, `W7B`, `G1`
through `G4`, `K9`, `M1a`, `M1b`, `V1`, `R1` through `R4`, `UA`, `UC`), plus `V2`, `R4`'s fix
round (`W7C`, `G5`, `UA2`, `UB2`), `V3`, `R5`, the final fixer, and the four docs agents that
wrote up this afternoon's record. The owner was told spend is not a constraint on this port.

### Owner decisions needed, bundled (2026-10-07)

Plain language, one line each, merging the open items from `PHASE1_PACKAGES.md` "Owner
questions", `PHASE2-6_PACKAGES.md` section G, `UPLIFT_PACKAGES.md` owner questions, R4 Part B
and UA2/UB2. Recommendation given for each.

1. **Copy pass to reach Property's density.** Four to six band labels per hub and template,
   plus the section intros the kit components want, written by Opus or Fable and listed
   verbatim for review. Versus holding the 28 Sep "wording stays" ruling and accepting 1 to 3
   eyebrows per page. Recommendation: hold the ruling for now.
2. **Four capture surfaces on one page.** Walk the local server and say if it reads pushy.
   Recommendation: owner must walk, no default.
3. **Footer Resources column target.** Research page versus blog. Recommendation: research
   page, already shipped.
4. **Nav label "For".** Recommendation: leave it, no rewording.
5. **Logo file missing.** Text wordmark versus a designed logo. Recommendation: keep text
   wordmark.
6. **Numeral typeface.** A safe system-font list versus loading the estate's numeral font.
   Recommendation: the system-font list.
7. **Button corner radius.** Adopt the kit's 4px versus keep square. Recommendation: adopt
   the kit's 4px.
8. **Per-category blog CTA copy.** One CTA per category versus the shared one. Recommendation:
   keep the shared one.
9. **A `/research` hub page.** Build one versus leave the two pages unhubbed. Recommendation:
   leave it for the estate-wide round.
10. **Claims and wording residuals from P0A/P0G:** the "fixed-fee basis" promise, the "Most
    popular" badge, "Pharmacy clients only" and "never discuss one client's position", "the
    ranges we see most often" wording, the uncited "1.25x" lender-cover claim, corporation tax
    computed before loan interest, and `llms.txt` currency rendering. Recommendation: owner
    review each, no single default.

**KNOWN AND ACCEPTED, 2026-10-07.** The widget panel auto-opens once per session on desktop
(768px and up) after a timer. R4 called this a blocker. It is Property's own behaviour
(`Property/web/src/components/support/SpecialistWidget.tsx`, `AUTO_OPEN_KEY`, once per session,
desktop only) carried into the kit under the estate ruling of 2026-09-30, so it is parity, not
a defect. Owner question G5 stands: walk the local server and say whether four surfaces on one
page reads as pushy.

### Kit components adopted, per template family

- Blog (W2): `Breadcrumb`, `HubArticleList`, `TableOfContents`, `ReadingProgress`,
  `RelatedArticles`, `BlogSidebarCta`, `FaqSection`, `LeadCTAPanel`.
- Services/for templates (W3, UB2): `SlimHero`, `Breadcrumb`, `Eyebrow`, `FaqSection`,
  `LeadCTAPanel`, `ScrollGlowGroup`, `StatsCounter`, `CoverageCards` (service and hub detail,
  UB2), `NumberedReasons` (service detail, UB2).
- Calculators/embed (W4, UB2): `Breadcrumb`, `Eyebrow`, `FaqSection`, `NoticeCard`,
  `ExampleFigureNote`, `LeadCTAPanel`, kit `Calculator` (already adopted, `headingLevel` set),
  kit `Prose`.
- Homepage/about (W5): `StatsCounter`, `TestimonialsSection`, `FaqSection`, `LeadCTAPanel`,
  `ScrollGlowGroup`, `Eyebrow`, `PharmaciesBackdrop`, `CoverageCards`, `NumberedReasons`,
  `SlimHero`.
- Contact/funnel/legal/research (W6): `LeadCTAPanel`, `Breadcrumb`,
  `Eyebrow`, `SlimHero`, `NoticeCard`, `FaqSection`.
- Chrome (P1-C): kit `PageShell`, `SiteHeader`, `SiteFooter`.
- Capture (W7): kit `SpecialistWidget` + kit `support/IntentProvider` behind a local
  `SupportProvider`.

**Corrected per R5 (R5-4): the list above previously named `DrawnTickList`, `WhatToExpectCard`
and `CardStack` as adopted. `grep` on the built tree returns 0 call sites for all three; they
were declined or dropped, not shipped.** The illustrative kit components that actually render
are **4 distinct / 11 call sites**: `CoverageCards` x5, `StatsCounter` x3, `NumberedReasons`
x2, `TestimonialsSection` x1. W3 declined several it had originally listed; UB2 is the round
that landed `CoverageCards` and `NumberedReasons` on the service detail template, `CoverageCards`
on the hub detail template, and kit `Prose` on the calculators template.

### Declines, each with its one-line reason

- `BlogListWithSearch.tsx`: hardcoded `postsPerPage=12`, slices before render; this site has
  22 posts, floor 37 (locked rule 15, the 12-post cap).
- `NumberedPagination.tsx` (direct import): brief premise corrected: it ships anyway via
  `HubArticleList`'s own mount when posts exceed the page size; not a separate decline.
- `BlogCategoryHub.tsx`: requires six copy blocks (`sections`, `intro`, `description`,
  `essentialsTitle`, `cta`, `libraryNote`) this site does not author; adopting would author new
  prose.
- Any kit prose component taking `post.contentHtml` as a text child: the body is authored raw
  HTML; a text child renders escaped tags.
- `ProcessTimeline.tsx` (W3/W5): neither data file publishes numbered staged steps; inventing
  the `n` labels would author copy.
- `ProblemStatement.tsx` (W3/W5/W6): hardcodes Property's landlord copy and its own CTA
  button with no copy props.
- `ComparisonTable.tsx` (W3/W5): forces a general-vs-specialist row shape and a "Most
  recommended" pill the pages do not publish.
- `CoverageCards` on W5 band 7: one `href` per card would drop 6 links to 3; declined at that
  call site only (adopted elsewhere).
- `CardStack`/`ProcessTimeline`/`CoverageCards html` on W5 band 8: no matching list to feed
  without authoring one.
- `DrawnTickList` on W5 band 6: declined, no claims list to feed without authoring one.
- `MobileToolSlot.tsx` (W4): opened and evaluated per the brief; recorded in `W4_RECEIPT.md`.
- `AccordionTrigger`'s hardcoded `outline-primary-600` (K3): not required; decides whether
  gate row 6 lists the kit FAQ trigger, left open as a kit gap, not a site defect.

### AUTHORED copy, published verbatim (owner's record, 2026-09-28 wording ruling)

**W7: topic labels and CTA copy** (`lib/intent/taxonomy.ts`):

| topic | label | ctaCopy |
|---|---|---|
| buying | buying a pharmacy | Check what a pharmacy purchase looks like on your numbers |
| selling | selling a pharmacy | Check where you stand on a pharmacy sale |
| nhs-income | NHS contract income and FP34 cash flow | Map your FP34 cash flow month by month |
| vat-retail | VAT and retail schemes | Check your VAT retail scheme is the right one |
| locum | locum pharmacist pay and tax | Compare your locum take-home pay |
| structure | pharmacy structure, payroll and benchmarking | Check your pharmacy structure and payroll are right |

**W7: offer copy** (`lib/intent/widget-config.ts`): tool blurb "Run your own numbers on
{label} in a couple of minutes." / tool reason "Most-used tool for this topic" / review blurb
"A no-obligation look at your position with a pharmacy accountant." / review reason (default)
"You have spent real time on this. A quick look will confirm where you stand" / specialist
title "Speak to a pharmacy accountant" / specialist blurb "Get your position on {label} checked
by a pharmacy accountant." / specialist reason "You have spent real time here. An accountant
can confirm your position" / returning reason "Pick up where you left off. Get your position
looked at".

**W7: surface labels and buttons:** ReturningBar "Welcome back. {offer.reason}." (aria-label
"Welcome back", dismiss aria-label "Dismiss"); DeepScrollModal buttons "Open the calculator",
"Speak to a pharmacy accountant", "Open the calculator instead", "Get the free guide"
(unreachable today, no topic has a guide offer), close aria-label "Close"; StickyCTA
personalised button "Open the calculator" or "Speak to a pharmacy accountant" (un-personalised
it renders the existing `niche.cta.sticky_*` unchanged); NextStepOffer button "Open the
calculator" / "Speak to a pharmacy accountant" / "Get the free guide".

**W7: widget copy** (`lib/intent/widget-config.ts` `copy`): "Ask an accountant" (launcher and
ask button); "Close"; header title = `siteConfig.name`; "We reply within 24 hours"; "Dismiss";
"See your numbers"; contact chip = `niche.cta.sticky_button` ("Get in touch"); "Send to an
accountant"; "Sending..."; email placeholder = `niche.lead_form.placeholders.email`; "Your
email"; "Your question for an accountant"; "Your question"; "Enter a valid email address.";
"Add a short message so the accountant knows how to help."; "Something went wrong. Please try
again."; "Thanks, we have your message. One of our accountants will reply by email within 24
hours. Please keep an eye on your inbox, and your spam or junk folder, so the reply is not
missed."; consent prefix = `siteConfig.leadConsentText` (frozen, unmodified).

**W7: opener lines** (`lib/assistant/opener.ts`). Topic nouns: "buying a pharmacy", "selling
your pharmacy", "your NHS contract income", "your VAT retail scheme", "your locum pay and tax",
"your pharmacy structure". Three hooks per topic (curious / helpful / direct):

- buying: "Looking at buying a pharmacy? We can pull up the affordability calculator." / "Want
  a hand checking whether the numbers on a pharmacy purchase stack up?" / "Speak to a pharmacy
  accountant about the purchase, shall we point you to the form?"
- selling: "Thinking about selling? We can show you how a pharmacy sale is usually taxed." /
  "Want a hand working out what a sale leaves you with after tax?" / "Speak to a pharmacy
  accountant about the sale, want us to set that up?"
- nhs-income: "Following your NHS contract income? We can pull up the FP34 cash flow
  estimator." / "Want a hand reconciling what the FP34 statement actually pays you?" / "Speak
  to a pharmacy accountant about your NHS income, shall we point you to the form?"
- vat-retail: "Working out which VAT retail scheme fits? We can point you to the right page." /
  "Want a hand checking your retail scheme and your zero-rated split?" / "Speak to a pharmacy
  accountant about your VAT, want us to set that up?"
- locum: "Comparing locum pay? We can pull up the take-home comparator." / "Want a hand
  comparing locum take-home pay across the usual options?" / "Speak to a pharmacy accountant
  about your locum tax, shall we point you to the form?"
- structure: "Anything we can help you find on pharmacy structure or payroll?" / "Want a hand
  checking your structure and payroll are set up the right way?" / "Speak to a pharmacy
  accountant about your structure, want us to set that up?"

Combination (buying + selling): "Buying one pharmacy while selling another takes care on both
sides. Want us to line them up?" / "A purchase and a sale together change the tax on each. Want
us to show you why?" / "Speak to a pharmacy accountant about both together, want us to set that
up?" Used-calculator: "You have already run the numbers. Want a second pair of eyes on them?" /
"A calculator gives a picture. An accountant confirms it fits your pharmacy, want a check?" /
"Ready to sanity-check those results? An accountant goes further than any calculator." Generic:
"Not sure what you are looking for? We can point you to the right tool." / "Happy to help you
find what you need. What is the main thing on your mind?" / "Speak to a pharmacy accountant and
get a straight answer. Want us to set that up?" Friction: "Send a question about {noun} here
instead, we reply within 24 hours." (no topic: "Send a question here instead, we reply within
24 hours.") Exit: "Before you go: send a question about {noun} and one of our accountants will
come back to you." (no topic: "Before you go: send a question and one of our accountants will
come back to you.")

W7 flagged one line to the owner: "A no-obligation look at your position with a pharmacy
accountant" reuses the site's already-published "no obligation" (`app/book/page.tsx:76`).
Nothing in the above promises a free consultation, a fixed fee or a call.

No M1a-authored visitor-facing copy; M1a's wiring work touched mounts and ids, not new
sentences.

### The one wording change

W5's band 10 ("why specialist matters") moved a 6-row `<table>` to `NumberedReasons`, a list
component, in doing so the receipt deleted a lead-in sentence that described the table. M1a
restored that sentence as visible lead-in text directly above the `NumberedReasons` list and
left the band as the list (not back as a table). No other wording in the wave changed; every
other adoption carried existing copy byte-identical.

### Four capture surfaces and their suppression rules, as implemented (W7 receipt)

All four: SpecialistWidget, DeepScrollModal, ReturningBar, StickyCTA: mount in `layout.tsx`.
Suppression, copied from Property as data (nothing under `Property/` was edited):

| rule | implemented as |
|---|---|
| one deep-scroll offer per page-load session, across topics | module-level `shownThisSession` flag |
| 30-day per-topic suppress | `localStorage` key `pfp_deepscroll_<topic>`, 30-day window |
| returning bar, session-dismissible | `sessionStorage` key `pfp_returning_bar_dismissed` |
| sticky dismissal | `sessionStorage` key `pfp_sticky_dismissed` |

No-op on `/embed/*`, `/admin/*`, and consent `=== "denied"` for all four. Posture stays
`opt-out`; no new disclosure, banner, popup or cadence was added. Personalisation is hardcoded
default-ON, no experiment-assign block. The pre-port CTA triples (`header_contact`,
`sticky_cta`, `sticky_cta_close`) are preserved byte-identical on all 55 routes, including
`href`; the personalised sticky offer is gated on a client-only `visible` flag so the SSR
markup always carries the generic offer. R1's serious finding that the sticky bar covered the
footer's only consent control was closed with an `IntersectionObserver` on the footer that
retreats the bar.

### Phase 1 review findings and how each was closed

R1 found 2 blockers, 5 serious, 5 minor.

- **B1** (skip-link focused ground 3.71, under the 4.5 floor: the A5 rule lost the cascade to
  the kit's utility-layer `focus:bg-primary-600`): **CLOSED**, G2 moved the rule unlayered.
- **B2** (the reviewed tree held phase 2/4/5 work no phase-1 receipt accounted for, so a tag
  from that tree was not cleanly "phase 1"): **RESOLVED BY PLAN**: the wave builds phases 1-6
  concurrently by owner instruction, so the tags land together on the wave commit, not tagged
  silently over later work.
- **S1** (`.ground-dark` half-mounted, 11 sub-floor focus rings measured on the stale build):
  **CLOSED IN SOURCE**, G1 confirmed the worktree's `page.tsx` already carries `.ground-dark` on
  all three dark homepage bands; still needs a render-verification row, not a wiring fix.
- **S2** (gate row 6 read "zero unlayered rules"; six ship, all inherited from the kit's own
  `globals-standard.css`): **RESTATED HONESTLY**: zero unlayered rules authored by pharmacies,
  six inherited from the kit, all intentional; the gate-row sentence (above) carries that.
- **S3** (undeclared rendered typography change: inherited `h1..h6{line-height:1.2}` beats the
  homepage h1's `leading-[1.1]` utility, 72px rendered vs 66px intended): **HANDOFF, not
  edited**: G2 fix 2 documents it as adopting the kit's house 1.2 rhythm and leaves the diff on
  file if the owner later wants 66px.
- **S4** (fixed StickyCTA bar covering the footer's only consent control): **CLOSED**, W7 added
  an `IntersectionObserver` on the footer that retreats the bar.
- **S5** (thin 5-column footer, four columns a heading over one self-link, `/for` absent
  entirely): **CLOSED**, G1 fix 2 added a footer-only nav override (9 links to 27).
- **M1-M5** (minor: kit header CTA ring at 3.71 passes the 3:1 indicator floor but bypasses the
  site's one-mechanism rule; the backdrop reads as graph paper not shelving; a stale mount
  instruction in a since-superseded receipt; `/calculators` is a new 200 chrome link; the nav
  label "For" stands alone): recorded, none blocking; M2/M3 are receipt-wording notes, M4/M5
  are owner-visible notes, not defects.

### Owner questions, bundled (merged from PHASE1_PACKAGES.md and PHASE2-6_PACKAGES.md, plain language)

1. **Footer "Resources" column.** It only has one real target, the pharmacy openings-and-
   closures research page. The alternative is the blog. We shipped the research page. Agree?
2. **The six nav labels.** They are the raw route names: Services, For, Research, Blog, About,
   Contact. "For" doesn't read as a word on its own. We changed nothing. Want a wording pass?
3. **The missing logo file.** The config points at a logo that has never existed; the site has
   always shown text. Delete the stale config line, or get a logo designed?
4. **A second typeface for numbers.** Figures fall back to whatever the visitor's device has.
   We can name a safe system-font list (free) or load the estate's numeral font (one extra
   download). We recommend the list.
5. **Button corners.** The shared button recipe rounds corners very slightly (4px); this site's
   buttons are square today. We recommend adopting the shared one. Agree?
6. **Per-category blog CTA copy.** Every blog category currently shares one CTA heading and
   body. Writing one per category means five new sentences we would author. We recommend
   keeping the shared one. Agree?
7. **A `/research` index page.** Two research pages exist and no hub; nav and footer point at
   one directly. We recommend not adding a hub this wave. Agree?
8. **An `h1` on the three partner embed pages.** They are iframed with no heading today. We
   recommend adding a visually-hidden one.
9. **`data-cta-goal` on the two existing sticky ids.** The site has never emitted it; we added
   it only on the six new capture-surface ids and left the two existing sticky ids exactly as
   they were. Agree with leaving them alone?
10. **The sticky bar and the help widget together.** After this wave a visitor can see a sticky
    bottom bar, a scroll-triggered modal, a returning-visitor bar and a floating widget, all at
    once on the same page. All four were the owner's 7 October decision. **We recommend walking
    the local server (`:3111`) before going further**: four surfaces together is the thing
    that reads as pushy, and the suppression rules above are the only thing stopping it.
11. **The 10 homepage section labels.** Existing wording, moved into the shared label component
    unchanged. Say which, if any, reads badly and we change that one line.

### Kit gaps for the manager

- **K3/K4: the accordion focus ring and the `<noscript>` FAQ-hiding trap.** `AccordionTrigger`
  may hardcode `outline-primary-600` (K3, not required, decides a gate-row-6 line only). K4 is
  required: `alwaysRenderAnswers` hides every FAQ answer with JS off on ~30 pages unless the
  existing `<noscript>` block in `layout.tsx` releases `[data-state="closed"]`: a manager-only
  edit, one line, because `layout.tsx` is off limits to every builder.
- **K9: raw-HTML FAQ answers fed to `buildFaqJsonLd`.** Closed manager-direct (see package
  table); not a kit edit.
- **Stale declines corrected mid-port:** `SlimHero.sectionClassName` and `CoverageCards`'
  `href`/`html` both shipped in the kit since the hospitality-era decline; W3/W5 re-derived and
  adopted both. R2 is asked to re-check every decline in the wave against the kit at review
  time, since a kit SHA in a ledger goes stale within the day.
- **P1-C/P1-G handoffs still open:** `app/admin/analytics/login/page.tsx:39`'s one genuine ring
  defeat (internal, password-gated, outside the port's lease); `MiniCapture`/`BookingPicker`/
  `DetailsForm` fork-vs-shared against kit `leads/capture-steps`, resolved in writing by W6
  (adopted, see W6 receipt) rather than left open.

### Residuals pending review (M1a, not yet closed)

- **M10**: `og:image` absent on 9 `Metadata` exports; mechanical but needs a per-route copy
  decision (`/api/og` title).
- **M11**: lowercased "VAT" in 5 machine-built hub descriptions; fixing means authoring 5
  descriptions.
- **M12**: `ReadingProgress`'s z-index vs the kit header; a `packages/**` kit-gap, out of lease.
- **M14**: the phase tagging scope decision; resolved by this wave's plan (tags land together).
- **M19**: two receipt-wording corrections (unlayered-rule count, the inherited line-height
  line); already handed off in G2.
- **M20**: 11 scattered navigation timeouts from local load contention; needs a re-run in
  isolation, not a code edit.
- **M08/M09**: two findings M1a investigated and found should NOT be acted on: the second
  `leadConsentText` in `lib/calculators/site.ts` is not a true duplicate (two different rendered
  consent strings on a live lead path: unifying them is an owner-visible consent diff, not a
  mop-up edit); `LeadForm.tsx`'s `consentText` local is not dead code, it feeds the lead payload's
  audit field, W6's finding calling it dead was wrong.
- Breadcrumb delegation shim (`components/ui/Breadcrumb.tsx`) still has 3 live consumers;
  switching them to the kit import directly and deleting the shim is left for the manager.

### Agents used in the port so far

Phase 0: 9 builders/auditors + 1 planner = 10. Phase 1: 6 builders + 1 ring fix (P1-F2) + 2
cavecrew + V-P1 + R1 + 1 planner = 12. The phase 2-6 wave: 7 builders (W2-W7) + G1 + G2 + G3 +
K9 + M1_INPUT compiler + M1a + 1 planner = 14.

**Uplift stage, 16 agents:** UA, UB, UC (the three builders), W7B, G4, M1b (the three
gap-fixers), the uplift planner, two STATE.md drafting passes, a handoff drafter, a playbook
fixer, the M1_INPUT compiler, and the V1/R2/R3 review passes.

**Total: 10 + 12 + 14 + 16 = 52 agents used on this port to the wave close (final figure about 68, see the pickup section)**, plus final verification
and the R4 re-review running now and not yet counted.

## 2026-10-07 design port, phase 0 (audit, fixes, recheck)

Production SHA `981a604e` (deployed 2026-09-23) vs working tree `110643de7` (7 commits ahead;
production is older than this build). Phase 0 committed and tagged `port-pharmacies-phase0`
(commit: see tag port-pharmacies-phase0). Full detail: `docs/pharmacies/_port/` (P0A-P0G,
PHASE0_PACKAGES.md).

### Agents used: 9 in phase 0 (5 audit, 3 fix, 1 recheck), plus 1 planner for phase 1

### Five audit packages, one line each

- **P0-A (claims and ground-truth ledger).** 9 serious-tier rows found across 6 rule classes
  (testimonials, turnaround promises, llms.txt vs code, a stale refresh promise, three calculator
  method errors, cookie/privacy copy vs AdSense and the dormant retention purge); every core tax
  rate (BADR, CGT, dividends, NIC, FA 2026 allowances) verified against `rates_ledger.json` and
  found correct everywhere it appears.
- **P0-B (rendered-HTML sweep, 67 URLs fetched, 62 full pages).** 4 serious findings: a duplicate
  Organization JSON-LD node sharing one `@id` with conflicting content on every page, a hardcoded
  `priceRange` on every page, `/embed/*` leaking full site chrome into what should be a bare
  iframe, and `BreadcrumbList` schema with no matching visible breadcrumb on 21 pages.
- **P0-C (CSS, token and contrast audit).** 2 serious findings: a `neutral-*` vs `slate-*` grey-ramp
  split (30 files vs 7, public site vs admin) and a hand-rolled `layout-utils.ts` that hardcodes
  `#0f3a4a` instead of a kit token indirection; brand colour contrast verified PASS everywhere it
  is used, including the documented `#88cde7` tint fix on dark grounds.
- **P0-D (instrument baseline: sweep, browser_check, cta_snapshot).** 2 serious, 4 minor live
  defects: 8 SVG NaN render errors and 29 contrast failures, both confined to the two `/research/*`
  pages; baseline otherwise clean (0 overflow, 0 dead links, 0 em-dashes, 0 pipeline artefacts, 0
  grounds breaches on the sampled set, 165 `data-cta` tags in 3 triples).
- **P0-E (structural and disposition inventory).** Nested `<main>` confirmed on 10 of 14 probed
  routes (worse than any prior port), no skip-link anywhere, zero `web-shared/design/**` imports,
  and two brief errors corrected: storage prefix is `pfp` not `phfp`, and the real record counts
  are 8 services / 5 hubs, not the naive grep's 10/7.

### Nine serious ledger rows and disposition

1. Locum calculator charges Class 2 NIC that was abolished 6 Apr 2024 - **fixed** (P0-F1).
2. Purchase-affordability calculator charges SDLT on the whole price including goodwill - **fixed**
   (P0-F1).
3. FP34 cash-flow calculator ignores the payment-lag input in its headline gap - **fixed** (P0-F1).
4. Purchase-affordability calculator quotes an uncited 5%-8% lending-rate range as fact - **fixed**
   (P0-F1).
5. A blog post promises a monthly refresh nothing performs - **fixed** (P0-F1).
6. `llms.txt`/`llms-full.txt` describe the affordability calculator backwards (models an affordable
   price; it actually takes a price and returns a repayment) - **fixed** (P0-F1).
7. Reply-time promise reads "within 24 hours" on 8+ surfaces and "within one working day" on 4,
   including both AI-retriever files - **fixed**, all surfaces now read "within 24 hours" (P0-F1
   fixed the 2 machine files; P0-F2 fixed the remaining 3: `about/page.tsx`, `CalcResultCta.tsx`,
   `MiniCapture.tsx`).
8. Homepage "What clients say" prints three first-person quotes, then a standfirst below them
   calling the same quotes composites - **left as is by owner, same 29 Sep ruling** applied to the
   identical block on hospitality and startups; raised here only because that ruling was per site.
9. Cookie policy says no advertising cookies while the site loads Google AdSense; privacy policy
   says enquiry data is deleted after 24 months while the deletion cron is deliberately disarmed -
   **left as is by owner, same 29 Sep ruling**, both estate-wide and identical on Property.

### Every changed sentence, receipts P0-F1/F2/F3 (owner's record, wording ruling 2026-09-28)

**P0-F1 (`locum-take-home-comparator.ts`):**
- note sentence, before: "Sole trader uses Class 2 NIC at £3.45/week and Class 4 NIC at 6%
  (£12,570-£50,270) / 2% above." After: "Sole trader uses Class 4 NIC at 6% (£12,570-£50,270) / 2%
  above; Class 2 NIC is not charged where profits exceed the Small Profits Threshold."
- doc comment, before: "Sole-trader take-home: income - expenses = profit; income tax + Class 2 +
  Class 4 NIC." After: "Sole-trader take-home: income - expenses = profit; income tax + Class 4
  NIC."
- result row "Class 2 NIC (£3.45/week)" deleted entirely.

**P0-F1 (`pharmacy-purchase-affordability.ts`):**
- row label, before: "Asset deal: SDLT non-residential (est.)". After: "Asset deal: SDLT on the
  premises element (est.)".
- row label, before: "SDLT premium over share duty". After: "SDLT less share duty (difference)".
- note sentence, before: "SDLT applies the non-residential bands (0% to £150,000, 2% from £150,001
  to £250,000, 5% above)." After: "SDLT applies the non-residential bands (0% to £150,000, 2% from
  £150,001 to £250,000, 5% above) to the premises figure you entered only, because goodwill and the
  NHS contract are outside SDLT; on a leasehold deal with no property that figure is nil."
- help text, before: "The rate quoted by the lender. Commercial pharmacy finance rates in 2026 have
  varied between approximately 5% and 8% depending on lender, term and loan-to-value." After: "The
  rate quoted by the lender. The rate you are offered depends on lender, term and loan-to-value."

**P0-F1 (`pharmacy-fp34-cash-flow-estimator.ts`):**
- note sentence, before: "The working-capital gap shown is the portion of monthly claim value not
  covered by the advance while you wait for full settlement." After: "The working-capital gap shown
  is the portion of monthly claim value not covered by the advance, accumulated across the
  ${lag} month(s) you wait for full settlement."

**P0-F1 (`drug-tariff-changes-explained.md`):**
- before: "As at: July 2026. This slot is refreshed monthly. Check the NHSBSA Drug Tariff portal
  for the current edition..." After: "As at: July 2026. Check the NHSBSA Drug Tariff portal for the
  current edition..." (refresh promise removed, date kept).

**P0-F1 (`public/llms.txt`):**
- before: "Models the affordable purchase price for a community pharmacy based on EBITDA, debt
  service, and working capital." After: "Takes an agreed purchase price, deposit and loan terms and
  returns the estimated monthly repayment, the post-tax cash cover ratio, and the stamp duty or SDLT
  cost of a share deal against an asset deal."
- before: "Specialist advice for pharmacy owners and buyers. Reply within one working day." After:
  "Specialist advice for pharmacy owners and buyers. Reply within 24 hours."

**P0-F1 (`src/app/llms-full.txt/route.ts`):**
- before: "(affordable purchase price from EBITDA, debt service, and working capital)". After:
  "(monthly loan repayment, post-tax cash cover ratio, and share-deal against asset-deal acquisition
  tax, from an agreed purchase price)".
- before: "No phone lines or walk-ins; every enquiry gets a specialist reply within one working
  day." After: "No phone lines or walk-ins; every enquiry gets a specialist reply within 24 hours."

**P0-F1 (`pharmacy-dispensing-workload-and-density.md`, not-serious D2, attribution only, no
figure changed):**
- before: "The number of dispensing pharmacies fell from 11,764 to 10,382, a decrease of 11.7%."
  After: "The number of pharmacies actively dispensing in the month fell from 11,764 to 10,382, a
  decrease of 11.7%."
- before: "England as a whole sits at 18.11 pharmacies per 100,000 population, from 10,617
  pharmacies and 58,620,101 people." After: "England as a whole sits at 18.11 pharmacies per 100,000
  population, from the 10,617 registered pharmacy contractors on NHSBSA Contractor Details (a wider
  count than the 10,382 actively dispensing in a single month above) and 58,620,101 people."

**P0-F2 (`about/page.tsx`):** "reply within one working day" -> "reply within 24 hours".

**P0-F2 (`CalcResultCta.tsx`):** "...we reply within one working day." -> "...we reply within 24
hours."

**P0-F2 (`MiniCapture.tsx`):** default success text "within one working day" -> "within 24 hours".

**P0-F2 (`services/page.tsx`):** title "Services | Pharmacy Tax" -> "Services" (layout template
already appends the suffix); meta description trimmed from 168 to 150 chars by deleting the
trailing ", and benchmarking." clause only, no new or reworded copy.

**P0-F2 (`for/page.tsx`):** title "Who We Help | Pharmacy Tax" -> "Who We Help" (same doubled-suffix
fix).

**P0-F3:** no further sentence-level wording changes; its fixes were a NaN data-key mismatch, two
contrast colour-class swaps, a scroll-margin CSS rule, a noindex metadata export and five
`<main>`-to-`<div>` landmark changes (code/markup, not copy).

### Calculator corrections, hand-derived

**Locum take-home, Class 2 NIC removed** (base case £400/day x 4 days x 46 weeks, £3,000 expenses):
profit £70,600; income tax £15,672; Class 4 £2,668.60; Class 2 £0 (was £179.40). Net take-home
£52,259.40 (was £52,080, pinned test value). Delta +£179.

**Purchase affordability, SDLT scoped to the premises element**: leasehold (premises £0), £400,000
price: SDLT £0 (was £9,500). Freehold, premises element £400,000: band 1 0% on £150,000 = £0; band
2 2% on £100,000 = £2,000; band 3 5% on £150,000 = £7,500; SDLT £9,500. Premises element £200,000:
band 2 2% on £50,000 = £1,000.

**FP34 cash-flow, gap now multiplies the monthly shortfall by the payment lag**: 2,000 items x £10
claim £20,000, 50% advance £10,000, shortfall £10,000, lag 2 -> gap £20,000 (was £10,000). 1,000 x
£8 claim £8,000, 40% advance £3,200, shortfall £4,800, gap £9,600 (was £4,800). 500 x £20 claim
£10,000, 0% advance, shortfall £10,000, gap £20,000 (was £10,000). 100% advance case unchanged at
£0 (0 x lag = 0).

### Recheck result (P0-G)

0 blockers. Instruments reproduced the P0D baseline byte-for-byte on everything not targeted by the
fix wave: 55/55 URLs clean, 813 internal links, 165 `data-cta` tags in the same 3 triples
(`header_contact`/`sticky_cta`/`sticky_cta_close`), 0 dead links, 0 em-dashes, 0 pipeline artefacts,
0 link-floor breaches across all 23 URL families. Defects that went to **zero**: contrast failures
29 -> 0, anchor-gap (`scroll-margin-top`) failures 8 -> 0, SVG `<rect>` NaN console errors 8 -> 0.
11/11 curl proofs passed (single Organization JSON-LD node, no `priceRange`, no chrome leak on
`/embed/*`, no nested `<main>` on 18 sampled URLs, no doubled title suffix, self-referential
canonicals on `/book`/`/complete`/`/thank-you`, noindex on the 404 shell, correct llms.txt
calculator description, "within 24 hours" everywhere, 0 "within one working day" hits, chart
captions re-checked in context).

### Residuals for phase 1

Skip-to-content link (none anywhere); breadcrumb UI component (21 pages carry `BreadcrumbList`
schema with no matching visible trail); the `neutral-*`/`slate-*` grey-ramp split (30 files vs 7);
porting `layout-utils.ts` onto the kit version and replacing the hardcoded `#0f3a4a`; the
`btnOnDark = btnSecondary` alias (built for a light ground); the one rendered-DOM
`getComputedStyle(document.body).fontFamily` check for the webfont, per the T-H1 rule, before
calling it closed; 159 hardcoded hex values in `.tsx` (concentrated in `page.tsx` and the two
research/chart pages); the dark-navy CTA band meeting an equally dark footer on 17 routes plus 3
adjacent-same-ground routes, found only because this phase's full 35-route `--grounds` sweep went
wider than P0D's sample; the `SiteFooter.resourcesHref` owner call (no obvious single hub); the
missing `public/brand/logo.png` asset; carrying `storagePrefix=pfp` forward correctly; the
one-line `page.tsx:69` follow-up (`r["47730"] ?? ... .count ?? 0` -> `r.count ?? 0`) once that file
is back in scope; the client-only mobile-drawer CTA (`header_contact_mobile`) that no instrument
can see and must be hand-checked.

### Residuals for the owner

`about/page.tsx`'s "fixed-fee basis" promise (only this site makes it, not an estate string); the
"Most popular" badge on the middle service tier; "Pharmacy clients only" and "we never discuss one
client's position with another" (claims about the client book, unsourced); "the ranges we see most
often" wording on the affordability calculator (implies an observed deal population); "Most lenders
want to see at least 1.25x" debt-service-cover claim (unsourced, twice in one file); corporation tax
computed before deducting loan interest (overstates CT, understates the cover ratio); "pound-sterling
1 million" style currency rendering in `llms.txt`'s key-facts block (11 lines, cosmetic); five locum
income-tax constants with no entry in `rates_ledger.json` (now appended, append-only, 0 deletions).

Last updated 2026-07-15 (HARDENED + PARITY + WAVE-2 BUILT, deploy held). Generated by
`optimisation_engine.ops.spinup_site`. Tranche: **2**.

brand_locked: true

> **DEPLOYED TO PRODUCTION 2026-07-16** at https://www.pharmacytax.co.uk (Vercel CLI, prod). Live battery passed (all key routes 200, apex 308 to www, brand clean). sites.active=true; sitemap submitted to IndexNow. Remaining external: GSC property + Request Indexing, Bing import, GA4 id, real phone, brand logo assets.

> **FINAL BRAND LOCKED 2026-07-16: "Pharmacy Tax" @ pharmacytax.co.uk** (owner-purchased domain; built under working brand "Pharmacy Finance Partners", all references swapped repo-wide 2026-07-16).

> **Working brand, NOT final. Deploy held.** Locked under the working brand
> **Pharmacy Tax** (`www.pharmacytax.co.uk`) so the
> launch core can be built under the medical-trap brand-lock guard. Owner picks
> the FINAL brand + registers the domain at gate G1 (a 3-file config swap:
> `pharmacies/niche.config.json`, `sites/pharmacies.json`, this file). RDAP
> re-verify `pharmacytax.co.uk` before buying. See
> `expansion_research/tier1_pharmacies/BRAND_SHORTLIST.md` (fallback: Pharmacy
> Tax Partners, which sidesteps the lending-adjacent "pharmacy finance" SERP).

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **19 commits** were on
the branch and not in `origin/main`.

**All 19 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'pharmacies/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'pharmacies/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Identity

- site_key `pharmacies` | display **"Pharmacy Tax"** | intended domain `www.pharmacytax.co.uk`
- Storage prefix **`phfp` FROZEN** (added to the SITE_SPINUP.md registry at scaffold time; never change after first deploy)
- Tranche id: `2`
- Vercel project id: `prj_t2p8zJKl4PgBSpsnTanv0kQ5Whyk` (filled by scripts/vercel_create_site.py)
- Brand: NOT LOCKED. No content generation until this flag reads `brand_locked: true` (owner gate G1).

## Launch state

- [x] S1 brand lock under WORKING brand (final brand = owner gate G1): `brand_locked: true` set 2026-07-14; legal_name fixed to Ashfield Trading Ltd
- [x] S2 scaffold DONE 2026-07-14: spinup_site run (prefix phfp, tranche 2, --skip-db); wiring emitted (workspaces, indexing key, site_config, routing_safety prefix, tranche-2 migration pair, CI matrix, sites/pharmacies.json)
- [x] S3 research pack finalised (R3 dossier + LAUNCH_CORE + HOUSE_POSITIONS_OUTLINE + CALCULATORS + DATA_ASSET, expansion_research/tier1_pharmacies/); blog_topics seeding deferred to deploy (launch core is brief-driven, not generator-loop)
- [x] S4/S5 machinery + niche build DONE 2026-07-14: infra mirrored to crypto/web parity; house_positions.md (28 positions, load-bearing figures re-verified at source: BADR 18% 2026/27, employer NIC 15%/£5,000, Employment Allowance £10,500, dividends 10.75/35.75/39.35, FA2026 WDA 14%+40% FYA) + rates_ledger.json (26 entries); 3 golden-tested calculators (purchase affordability, FP34 cash-flow, locum take-home comparator, vitest 21/21); UK Community Pharmacy Openings & Closures Index (REAL NHSBSA + Companies House SIC 47730 data, zero fabricated figures)
- [x] S6 LAUNCH CORE BUILT 2026-07-14: 27-page core (home + 5 /for hubs + 8 services + 13 blogs) via Opus briefs + Sonnet workers (batch size 1); brand-agnostic corpus; build green (53 static pages, tsc clean); internal-link audit clean; Opus adversarial fact-review passed (0 HP-contradictions / 0 open-flag-figure / 0 fabrication / 0 em-dash / 0 positioning-wall, 2 minor findings fixed manager-direct). DEPLOY HELD.
- [x] S6b hardening + parity + wave-2 DONE 2026-07-15 (see section below); build + vitest GREEN, predeploy_gate --brand-only PASS
- [ ] S7 Vercel project + preview an01 pass + live battery (gates G3/G4)
- [ ] S8 domain-ready close-out: `sites.active=true`, tracker updated

## 2026-07-15 hardening + parity + wave-2 (branch expansion/phase-0, nothing deployed)

- **Phase 0 audit defects fixed:** broken internal links corrected, HP-code artefacts stripped, metaDescriptions trimmed to ≤155, breadcrumbs added.
- **Lead capture end-to-end:** /api/leads/submit route CREATED (was missing); `.env.local.example` added. Tranche-2+3 Supabase migrations APPLIED to prod 2026-07-15 (15 site keys verified live in `sites_site_key_check` + `leads_source_valid`; generator-emitted t2 files hand-fixed to the full key union before applying; new rows `active=false`); **blog_topics seeded: 1,227 rows**; lead-source constraint smoke-tested (insert+rollback). Property /api/leads/notify allowlist addition still pending at tranche G1 deploy.
- **Legal/crawl parity (Property-grade):** privacy-policy + cookie-policy + terms pages; robots.ts 40-bot AI allowlist; static `public/llms.txt` (figures from rates_ledger, verified 2026/27-current); not-found.tsx + error.tsx; NEW SiteFooter component with legal links (site previously had no footer); sitemap additions; embed backlinks verified present.
- **AI/GEO parity-or-greater:** HowTo schema (howToSteps frontmatter) on procedural posts; WebApplication schema on all calculators; Dataset schema on the Openings & Closures Index (exceeds Property); Article dateModified; Organization enrichment (legalName Ashfield Trading Ltd, knowsAbout, sameAs = Companies House 16358723 only); BLUF/FAQ audits patched.
- **Wave-2 content:** 7 blogs (Opus briefs in `briefs/pharmacies/wave2/` + Sonnet workers + 2-track Opus QA).
- **QA gate findings all fixed manager-direct:** locum Class 2 NIC factual error corrected; HP-code artefacts stripped (incl. wave-1 leaks); broken internal links corrected; metaDescriptions rewritten ≤155; em-dashes purged.
- **Admin analytics:** full suite (leads/trends/login/visitor) ported from charities.
- **DONE 2026-07-16:** blog_topics wave-2 head keywords marked used=true (explicit ids, scripts/_wave2_mark_used.py; non-pool-sourced briefs skipped). Deploy held on owner G1.

## Data layer

- Tranche migration pair emitted at scaffold time (see supabase/migrations/); rows insert `active=false`
- Lead notify allowlist: add `pharmacies` to Property /api/leads/notify allowlist in the per-tranche Property deploy (the sole sanctioned live-site touch)

## External steps (HUMAN ONLY, gate the site going live)

- [ ] Buy the domain `pharmacytax.co.uk` and point DNS at Vercel (A/CNAME per Vercel domain UI)
- [ ] **Pre-attach refresh (same day the domain is bought):** run the rates-ledger lint + dated-reference sweep (tax-year mentions) over the corpus and patch stale figures BEFORE DNS attach
- [ ] Google Search Console: add property `sc-domain:pharmacytax.co.uk`, verify (DNS TXT), submit `/sitemap.xml`, Request Indexing on key pages (discovery failure is the number 1 new-site risk)
- [ ] Bing Webmaster Tools: import the site from GSC, add Bing verification code to niche.config.json
- [ ] GA4: create property, copy measurement id into `pharmacies/niche.config.json` -> seo.google_analytics_id, add to `optimisation_engine/clients/ga4_config.py`, redeploy
- [ ] Real phone number into `pharmacies/niche.config.json` -> contact.phone (placeholder ships as +44 20 0000 0000)
- [ ] Brand assets: `public/brand/primary-logo.png` + `public/brand/icon-alt.png` (OG image route depends on them)
- [ ] Resend routing ONLY if a partner firm is signed (partner CC only on partnered sites; otherwise leads route to owner inbox)

## 2026-09-28 phase 0 parity

Built against `docs/_engines/ESTATE_PARITY_PHASE0_BRIEF_2026-09-28.md` and this site's
`PARITY_RESEARCH_2026-09-28.md`. Not deployed; local-only, awaiting the manager's serialised
build + owner deploy word. Full detail: `docs/pharmacies/PHASE0_2026-09-28.md`.

- Positioning: post-submit `/complete` and `/thank-you` copy, and every "a specialist will..."
  lead-nurture/booking string, now speak as the firm ("one of our accountants"). Privacy policy's
  data-sharing disclosure (sections 3-5, 7) and the `leadConsentText`/calculator consent sentence
  are UNCHANGED: this site genuinely operates a multi-firm data-sharing pool on the backend
  (`lib/leads/handoff.ts`, `contactability.ts`, the 3+3=6-recipient compliance cap), so that
  wording is accurate legal disclosure, not marketing caveat, and was left alone per the brief's
  exemption for the data-sharing paragraph and consent sentence.
- Added `entity` key to `niche.config.json` (Property's shape, pharmacy wording).
- `/for/*` and `/services/*` pages: `item.body` and `faq.answer` now render via
  `dangerouslySetInnerHTML` instead of as literal text, fixing the raw `<a href=...>` markup
  visible on all 5 segment pages. `/for/locum-pharmacists` no longer skips the lead form
  (`noLeadForm: true` removed from `pharmacies-hubs.ts`).
- Added `SiteHeader` (CTA visible ≥1280, hidden <1024, nav ≥1024) and `StickyCTA` (no intent
  dependency, generic `niche.config.json` `cta` copy), mounted in root `layout.tsx` for every page.
  Full mega-nav port is NOT done (out of phase-0 scope per the brief: "chat and intent are phase 1").
- Nurture `delayHours` was cumulative totals in a gap field; reset to Property's real gaps
  `0,0,4,20,24,48,72,96`. The separate 4-step `DETAIL_CAPTURE_STEPS` array was left alone
  (different shape, not named in the research finding).
- Fixed the double-full-stop h1 (`pharmacies-services.ts` headline) and the double-brand
  calculator title (`title: tool.metaTitle` -> `{ absolute: tool.metaTitle }`).
- `lib/schema.ts` `buildOrganizationJsonLd` now wraps the shared `packages/web-shared/schema`
  `buildOrganization` builder (Medical's `organization-schema.ts` is the reference); every prior
  field survives (diffed field-by-field), plus `parentOrganization` (Ashfield Trading Ltd) added.
  Added `buildServiceJsonLd` wrapping the shared `buildService`, wired onto all 5 `/for/*` and 8
  `/services/*` pages alongside a `BreadcrumbList`.
- `public/llms.txt`: every internal link now carries `?utm_source=chatgpt&utm_medium=llms`, plus
  the attribution note. Not rewritten to Property's full entity-first structure (not named in
  decision 3's list; UTM was the specific gap flagged).
- Added `pharmacies/pipeline/submit_indexnow.py` (Property's shim, `SITE_KEY = "pharmacies"`;
  central config already had a `pharmacies` entry in `optimisation_engine/indexing/config.py`).
- AdSense wired per the Solicitors pattern: `layout.tsx` metadata `google-adsense-account`,
  `ConsentedScripts adsenseClientId`, `public/ads.txt`, and `next.config.ts` `headers()` via
  `buildSecurityHeaders({ ga: true, supabase: true, ads: true, embedPrefix: "embed" })` — this
  site had NO security-headers block before, so `embedPrefix: "embed"` was added deliberately to
  keep the live `/embed/*` partner-iframe route framable (would otherwise have gone from no CSP
  to frame-ancestors denied-everywhere in the same diff).
- Body font: added `next/font/google` `Plus_Jakarta_Sans` (Property's font), one file, no new
  dependency.
- `sitemap.ts`: removed build-time `lastModified: now` from every static/service/for/tool/category
  route (omitted, Property's pattern); blog post routes already carried a real
  `post.updatedDate || post.date` and are unchanged.
- Segment/service page closers: added a one-sentence, per-page-parameterised closer under the
  form (Sonnet-plain, flagged for the Opus read below).
- `tsc --noEmit` clean, `vitest run` 35/35 passing throughout.

**Needs the shared agent:** the calculator's first input has no visible focus ring
(`outline-style: none`, transparent box-shadow) — this is `packages/site-styles`/shared form-style
territory per brief section 8, not touched here.

**Needs the Opus read:** the 13 segment/service closers written above are plain Sonnet copy, not
audience-bespoke; Aswatax intro wording on `/thank-you` was left as-is (already correct per the
research reader pass); `house_positions.md` (last touched 2026-07-14) was not re-checked against
current ground-truth memory in this pass.

- 2026-10-02 Phase 0 pre-live gate (GEO programme): firm-voice, em-dash, pipeline-leak and engagement-claim sweep plus a rendered read at 1280/390 with fixes; local, committed, not deployed. Detail and open owner items: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` section 14.
