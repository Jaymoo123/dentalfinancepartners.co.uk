# crypto (Crypto Tax Partners) site state

<!-- PICKUP BLOCK: derived from git on 2026-09-14. Everything below the horizontal rule
     at the end of this block is older history. Do not trust a prose claim in it over
     `git log` / `git tag -l 'port-crypto*'`. -->

## PICKUP — design port + design uplift, 2026-09-14

**DEPLOYED to production 2026-09-16 from `90fbea9c`.** (the full design port, the design
uplift, and everything else committed by that date.)

**State in one line: the port is COMPLETE and a DESIGN UPLIFT has been run on top of it —
phase 0, phases 1-6, two independent adversarial reviews, the gap-fix wave that answered
them, and the uplift (`7dfe04b3`) are all committed, and pushed and DEPLOYED 2026-09-16
(`90fbea9c`).**

**CORRECTED 2026-09-14: the tags DID move, and this block said they had not.** Re-derived
with `for t in $(git tag -l 'port-crypto*'); do echo "$t -> $(git rev-list -n1
--abbrev-commit $t)"; done`: **`port-crypto-complete` and `port-crypto-uplift` both point at
`c3824681`**, the commit that recorded the uplift and wrote the §9.1 gate. An earlier
edition of this block said the tag pointed at `f9a96c30`, a later line said `780ee0fe`, and
both said no tag had been moved or created. **Check out `c3824681`. It is the end of
crypto's work and it carries the uplift.**

**crypto is no longer `HEAD`.** Three sibling uplifts landed on top of it the same day:
charities `ba7b184a`, contractors-ir35 `569d3304`, construction-cis `48312e2c`. crypto's
own source is unchanged by all three. **DEPLOYED 2026-09-16 (`90fbea9c`)**; `main` is no
longer ahead of `origin/main`.

### Push / deploy status, stated plainly

- `origin/main` is `7b5c0ce8` (`git rev-parse --short origin/main`, re-derived
  2026-09-14 after the design uplift landed — unchanged as of that date). **PUSHED and
  DEPLOYED 2026-09-16 from `90fbea9c`**; `main` is no longer ahead of `origin/main`. An
  earlier revision of this block said "ahead by the three crypto port commits plus
  `e25412d7`", which counted only this site's work and read as the whole delta. It is not:
  the charities, estate and generalist ports were on the same branch, and shipped together.
- **Pushed. Deployed 2026-09-16 (`90fbea9c`). Production serves the ported design.**
- **The tree carries four uncommitted DOC edits and no uncommitted code**: this file,
  `docs/_engines/PORT_FIELD_NOTES.md`, `docs/_engines/DESIGN_PORT_PLAYBOOK.md` and
  `docs/_engines/HANDOFF_NEXT_PORT.md`, all written in the pass that recorded the uplift.
  All crypto source is committed at `7dfe04b3`. Check with `git status --porcelain`.

### Phase commits and tags, DERIVED FROM GIT (not from prose)

The port is **six commits, plus the uplift and its record on top, eight in all**.
`git tag -l 'port-crypto*'` returns **nine** tags: six phase tags on one commit, plus
`port-crypto-phase0`, and `port-crypto-complete` and `port-crypto-uplift` both on
`c3824681`. A checkout of `port-crypto-phase6` is missing every review fix AND the uplift.
**Check out `c3824681`.**

| commit | tag(s) | subject | committed |
|---|---|---|---|
| `f480c7ec` | `port-crypto-phase0` | `fix(crypto): phase 0 baseline, claims audit, and the serious tier fixed` | 2026-09-14 10:17 +0100 |
| `666ab0a2` | `port-crypto-phase1` … `phase6` (six tags, one commit) | `feat(crypto): phases 1 to 6 - the Property design standard on a site with no chrome` | 2026-09-14 10:53 +0100 |
| `f9a96c30` | **none — UNTAGGED** | `fix(crypto): gap-fix wave - two independent adversarial reviews, then the fixes` | 2026-09-14 11:55 +0100 |
| `cb87416b` | none | `docs(crypto): manager verification record and the post-port link artefact` | 2026-09-14 |
| `6f48570a` | none | `docs(crypto,engines): state doc and field notes reconciled to the finished port` | 2026-09-14 |
| `780ee0fe` | none | `docs(engines,crypto): handoff rewritten for crypto, and two stale claims corrected` | 2026-09-14 |
| `7dfe04b3` | none, UNTAGGED | `feat(crypto): design uplift - adopt the kit the port reimplemented by hand` | 2026-09-14 13:03 +0100 |
| `c3824681` | **`port-crypto-complete`, `port-crypto-uplift`** | `docs(engines,crypto): the kit-adoption gate, and the uplift recorded` | 2026-09-14 |

Re-derived 2026-09-14 after the uplift was recorded:
`for t in $(git tag -l 'port-crypto*'); do echo "$t -> $(git rev-list -n1 --abbrev-commit $t)"; done`
returns `port-crypto-complete -> c3824681`, `port-crypto-uplift -> c3824681`, and the six
phase tags on `666ab0a2`. An earlier edition of this line said `780ee0fe`.

Deriving commands:
`for t in $(git tag -l 'port-crypto*'); do echo "$t -> $(git rev-list -n1 --abbrev-commit $t)"; done`
`git log --oneline -8` (`HEAD` is `48312e2c`, the construction-cis uplift; crypto's last
commit is `c3824681`)

**Two things to read literally.** First, phases 1 to 6 are ONE commit, not six: they ran
as one wave with disjoint file sets (`docs/crypto/_port/PHASE0_PACKAGES.md`) and the six
tags were applied to the same SHA at wave close, so a fresh agent looking for six
distinct diffs will not find them. Second, **`port-crypto-phase6` is missing every review
fix listed below, and `7dfe04b3` (the uplift itself) is untagged.** The tag to check out is
`port-crypto-complete` / `port-crypto-uplift`, both on `c3824681`.

Scale, from `git show --stat`:

| commit | files | insertions | deletions |
|---|---|---|---|
| `f480c7ec` (phase 0) | 41 | 34,619 | 167 |
| `666ab0a2` (phases 1-6) | 38 | 1,749 | 675 |
| `f9a96c30` (gap-fix) | 32 | 1,438 | 93 |
| `7dfe04b3` (design uplift) | 24 | 916 | 310 |

`7dfe04b3`'s 24 files include one doc, `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md`
(326 lines), which is the diagnosis the uplift was built from. The other 23 are crypto
source.

`f9a96c30` also committed `R1_DESIGN_REVIEW.md` (332 lines) and `R2_CONTENT_REVIEW.md`
(397 lines), which were untracked until then, plus this state doc and field-notes
section 13.

`e25412d7` is **not** a crypto commit. It is
`docs(engines): carry the charities port's handoff rewrite into the repo`
(1 file, `docs/_engines/HANDOFF_NEXT_PORT.md`). It is the SHA the pre-port build was
made from, which is why P0-D quotes it, and it is the correct baseline SHA to read in
`link_baseline.json` / `browser_baseline.json` despite their `sha` field saying
`7b5c0ce8` (P0-D defect D0).

### The verification numbers actually measured

**Three separate wave-close verifications, over different URL sets and different builds.
They have been conflated into one imaginary run more than once, so each is given here
with its source. Do not merge them.**

Phase 0 close (`f480c7ec` commit body, corroborated by `P0B_RENDERED_SWEEP.md`):

| metric | value |
|---|---|
| URLs verified | **51** (the sitemap) |
| JSON-LD blocks | **95**, **0 parse failures**, 0 `[object Object]` |
| FAQ answers asserted vs on-page | **222 asserted, 222 counterparts** |
| canonicals | correct on every family, embed point-away preserved |
| turnaround promises | 0 |
| tests | **36 green**, `tsc` clean |

Phases 1-6 close (`666ab0a2` commit body):

| metric | value |
|---|---|
| URLs verified | **55** (51 sitemap + `/book`, `/complete`, `/thank-you`, and the funnel/embed set the wave touched) |
| contrast findings at 390/768/1024/1440 | **0**, against a pre-port baseline that carried a finding on **all 204 page-loads** (P0-D D4: the footer trading-name disclaimer, 3.61 at 12px, 51 routes x 4 widths) |
| horizontal overflow | **0** |
| anchor gaps | **0** |
| `<main>` | exactly 1 per page, no nesting |
| undeclared custom properties in built CSS | claimed **0** — **false as stated at this commit**; see the R1 correction below, and the gap-fix close where it became true |
| turnaround / fee / qualification claims | 0 |
| em-dashes in user-facing copy | 0 |
| tests | **38 green**, `tsc` clean |

Gap-fix close (`f9a96c30` commit body, against the final build):

| metric | value |
|---|---|
| navy focus rings remaining in source | **0** |
| off-white ground residue in source | **0** |
| `--focus-ring` | declared once, used everywhere it is needed |
| `.eyebrow-rule` | shipping (a rule now exists for the class) |
| site-local chrome rules | all three present |
| bare custom properties with no declaration | **0** — this is the check that makes the phase 1-6 claim true, and it was run as a bare-`var()`-without-declaration probe rather than asserted |
| `.prose` selectors in the built sheet | **34** |
| tests | **38 green**, `tsc` clean |

Link floor. Pre-port, from `P0D_BASELINE.md` §2 and `link_baseline.json`:
**608 unique internal links across 51 routes, per-route floor 8**, and the floor of 8
was exactly the footer — ten routes had footer-only internal linking. At port close:
**all 51 routes at or above their phase-0 floor, the minimum rising 8 to 27 and the
total 608 to 1,497.** That is the chrome arriving: a nav and a populated footer on every
route. Any future per-route decrease against `link_baseline.json` is still a blocker.
**Caveat: `link_baseline.json` in `docs/crypto/_port/` is still the PRE-PORT capture
(51 routes, 608 links, unchanged since 10:02).** No post-port sweep artefact was
committed, so the 1,497 / 27 figures are wave-close reporting with no file behind them
in the repo. Re-run `sweep.mjs` against a served build if you need to prove them.

Independent re-derivations by the two reviewers, which are the numbers to trust over
the commit bodies:

- R2 V1/V2: **147 JSON-LD blocks over 54 pages, 0 unparseable**; **222 of 222** FAQ
  answers present verbatim in the server HTML. R2's first automated pass reported 4
  misses and all 4 were artefacts of its own whitespace normalisation.
  **The FAQ figure reconciles at 222 answers across 35 pages.** R1 V8's rival "236" is a
  count of `acceptedAnswer` *fragments*, a different metric over a slightly wider page
  set, not a different result. Both runs found zero absent. Do not treat them as a
  contradiction.
- R1 V3: **53/53 routes, zero horizontal overflow at all four widths**,
  `scrollWidth == clientWidth` exactly.
- R1 V5: text contrast clean at 1440 and 390; **exactly one flagged row, 54x, and it is
  a gradient artefact** (the `bg-clip-text` builder credit; its two stops measure 6.0
  and 8.0 on the footer ground).
- R1 V11, which **contradicted the phase 1-6 commit body and was right**: 222 `var(--x)`
  names used, 224 declared, **10 used-but-undeclared**. Every one of the 10 carried an
  inline fallback, so nothing rendered blank and the conclusion was safe, but "zero
  undeclared" was false as written at `666ab0a2`.
  **Now resolved: the gap-fix wave verified it properly** with a bare-`var()`-without-a-
  declaration probe against the final build, and the answer is genuinely zero at
  `f9a96c30`. The lesson survives the fix: the defensible claim is "every undeclared name
  is fallback-guarded, checked at the element", or else run the probe and say you ran it.

### The design uplift, `7dfe04b3` — a distinct phase AFTER the port

The port closed against every gate it was given and the owner still said it did not look
as good as Property. He also said **generalist**, which is another ported site, does look
good. That control case is what made the gap diagnosable: the ported sites that look good
**adopted** the shared design kit, and crypto hand-rolled its own copies of everything.
Full working in `docs/_engines/DESIGN_GAP_DIAGNOSIS_2026-09-14.md` (committed in
`7dfe04b3`). generalist used 16 distinct kit components across 138 call sites; crypto used
5 across 20, one of them a marketing component. **The owner's verdict on the result is
"much better".**

Both starting hypotheses were falsified before any code was written: crypto's homepage is
**longer** than generalist's (793 source lines against 471, 13 sections against ~11), and
crypto and Property both run **three dark bands** at effectively the same ground
(`#0e1a3a` against `#0f172b`). It was neither bespoke art direction nor thin content.

**What was done, six packages:**

| package | what landed |
|---|---|
| webfont | crypto loaded **none** and rendered in `ui-sans-serif, system-ui`. `layout.tsx:2-3` now loads `geist/font/sans` and `geist/font/mono` through `next/font`, which emits the `@font-face` rules and binds `--font-geist-sans` / `--font-geist-mono`, consumed by the `globals.css` base rule. |
| kit layout and button recipes | `components/ui/layout-utils.ts` now imports from `@accounting-network/web-shared/design/layout-utils` instead of declaring everything locally. Square `font-medium` buttons with no `min-w` became the estate's `rounded-xl` / `font-bold` / `min-w-[10rem]`. The homepage went from **0 rounded elements to 13**. |
| kit `Eyebrow` | Replaced the solid brand-filled `.section-label` chip — the exact recipe the kit's own comment at `packages/web-shared/design/primitives/page-blocks.tsx:27-30` was written to stop — on all **10** homepage instances. Homepage is now `<Eyebrow> 10 / section-label 0`. |
| kit `LeadCTAPanel` | Adopted for the closing ask, carrying crypto's own four proof points across verbatim rather than taking the component's defaults. **This supersedes the "Kit `LeadCTAPanel` declined" row in the deliberate-calls table below**: the objection was its default `proofPoints` publishing unauthored fee claims, and passing crypto's own points answers it. |
| `CryptoBackdrop` | `components/layout/CryptoBackdrop.tsx`, 74 lines: a pooled-ledger lattice behind the hero and the closing panel. The piece of art direction phase 1's own scope line lists ("Header, footer, shell, tokens, **backdrop/motif**") and the port skipped. Six of the estate's design components of this kind now exist across the ported sites and Property. |
| neutral ramp to slate | **98 classes across 10 files**, closing STATE item 10. Zero `neutral-*` classes remain in live markup (`grep -rn 'neutral-[0-9]' crypto/web/src` returns 7 hits, all prose inside comments recording retired pairs). Plus local motion rules so the kit's tick draw works without importing `globals-standard.css`, which leaks Property's emerald and cream. |

**What was DECLINED, and why. This is as important as what was adopted.**

| component | reason it was not adopted |
|---|---|
| **`StatsCounter`** | It takes one number and renders no links. Adopting it would have mangled "18% / 24%" and "1 Jan 2027", stripped the separator from "£3,000", and **deleted four gov.uk source links** (`app/page.tsx:23-43`). **Owner decision — see open item 11.** |
| **`FaqSection`** (again) | Radix with no `forceMount` strips closed answers from the server HTML while the JSON-LD keeps asserting them. That is the defect phase 0 had just closed on 222 answers. Recorded at both call sites: `app/page.tsx:727`, `app/blog/[category]/[slug]/page.tsx:160`. |
| **`CoverageCards`**, **`CardStack`** | Both render authored bodies as text children, so they would print escaped markup and kill the gov.uk citations on the service pages. |
| **`ProcessTimeline`** | Needs content this site does not publish. |
| **`StickyCTA`** | An interruption. Banned. |

**Three of the six briefs were themselves wrong, and the agents executing them caught it:**
the kit's button recipes **embed** `focus-visible:outline-primary-600`, so keeping crypto's
local `focusRing` constant was not enough (`src/tests/focus-ring.test.ts`, 28 lines, now
pins it); `GeneralistBackdrop` uses a fixed `viewBox`, the exact shape that causes
horizontal overflow, so Trade's mechanism was used instead and `CryptoBackdrop` carries no
`viewBox`; and the `story-numeral` rules are not in the kit at all but in Property's own
stylesheet, where they light emerald, a token crypto does not declare.

**Verification, against one build at the uplift close** (`7dfe04b3` commit body):

| metric | value |
|---|---|
| pages | **54** |
| JSON-LD blocks | **147**, **0 parse failures** |
| FAQ answers asserted vs on-page | **222 of 222 present** |
| contrast findings at 390/768/1024/1440 | **0** |
| horizontal overflow | **0** |
| anchor gaps at four widths | **0** |
| routes holding their link count | **51 of 51**, 0 dead links |
| dependency closure | OK across 19 sites |
| tests | **44 green**, `tsc` clean |

**The kit-adoption gate this produced is now in the playbook at
`DESIGN_PORT_PLAYBOOK.md` §9.1**, and it runs at phase 6 close on every future port. Its
counter-rule is the table above: adopt the kit unless adopting it breaks something, and
record the reason at the call site.

### Live defects found that were NOT design work

This is the port's most valuable output. Reported as output, not overhead.

Fixed in phase 0 (`f480c7ec`):

| defect | source |
|---|---|
| CGT estimator measured the basic-rate band against **gross** income; £37,700 is a taxable-income ceiling. A £30,000 earner with a £20,000 gain was told £3,618 against a true £3,060 | P0-A M3, `lib/calculators/tools/crypto-cgt-estimator.ts:23` |
| Staking estimator started the **45% additional rate £12,570 too low** and applied the personal allowance flat, hiding the 60% taper band | P0-A M6, `staking-mining-income-estimator.ts:6,13` |
| Disclosure estimator priced **reasonable care at 0-30%**, which is the *careless* band; reasonable care attracts no penalty. A unit test pinned the wrong value | P0-A S3, `crypto-disclosure-estimator.ts:5` + `.test.ts:6-15` |
| Trader checker omitted **Class 4 NIC**, the cost that makes trader status worse | P0-A M4 |
| Staking worked example charged **£670 where £470 is due** (the £1,000 allowance is a deduction, not a threshold) | P0-A S1, `staking-rewards-tax-two-step.md:130` |
| Swaps worked example claimed **£1,400 exposed where its own table derives £1,200** | P0-A S4, `crypto-to-crypto-swaps-are-disposals.md:156` |
| **132 FAQPage answers** asserted to crawlers across all 19 blog posts with **no on-page counterpart at all** | P0-B R1 / P0-E E3, `blog/[category]/[slug]/page.tsx:65-73` |
| **17 authored gov.uk citations per service page rendered as literal escaped markup** — visible as text, dead as links, on all 5 service pages | P0-B R2, `services/[slug]/page.tsx:84` |
| `/services` and `/for` **canonicalised to the homepage** (root-layout `alternates` inheritance) | P0-B R3 |
| **Duplicate Organization node** sharing one `@id` with the layout's, disagreeing on `areaServed` | P0-B R6 |
| `priceRange: "££"` on a site that publishes no prices and says so | P0-B R7 |
| **A Google Analytics opt-out section on a site with no GA id**, contradicting the same page two paragraphs earlier | P0-A S5, `cookie-policy/page.tsx:141-153`; `google_analytics_id` is `""` |
| The cookie policy **published one section twice** | phase 0 commit body; R2 V27 confirms the de-duplication held |
| The cookie policy **understated what is stored from the IP address** (country, region, city and timezone, not country alone) | phase 0 commit body |
| Research page claimed an **annual update cadence we do not operate**, plus an unsourced growth trend | P0-A S7 |
| **Turnaround promises in 21 source locations reaching 38 of 51 URLs** — against the 5 the audit first listed | phase 0 commit body; P0-A S6 listed 12 source sites, P0-B R4 measured 32 of 58 URLs |

Fixed in phases 1-6 (`666ab0a2`):

| defect | note |
|---|---|
| **Calculator headline labels rendered navy inside the navy result panel at 1.06:1** — invisible, on all four calculators and all four embeds | The brief sent the package after a different element that was passing at 10.9 |
| **Article tables overflowed at 390px.** Root cause was `.prose table{width:100%}` treating `width` as a minimum, so **all 39 tables** carried the bug, not the 11 that happened to show it | P0-D §3b measured 11 posts; the fix was at the rule |
| The homepage hero ran navy into a navy stats shelf | |
| Research citations at **3.73 on navy** | P0-C C11 / P0-D D5 had measured the same elements at 2.48-2.58 on white pre-port |
| A dead class name (`prose-neutral`) on 19 pages | P0-B R10 |
| Privacy policy understated IP derivation and claimed **cookies and an opt-out control this site does not have** | |

Fixed in the gap-fix wave (`f9a96c30`), after two independent adversarial reviews.
**Both reviews found real defects that no package's verification list contained, which
is the whole reason the review gate exists.**

Content review (R2), two blocking arithmetic defects:

| id | defect | fix |
|---|---|---|
| R2 C1 | `crypto-backed-loans-collateral-disposals.md:153` published **"total CGT = £2,136"** on a gain its own table derives as **£2,400**, by splitting an £11,400 gain that exists nowhere in the scenario | The whole £2,400 sits inside the £10,000 of remaining band: **£432** |
| R2 C2 | The staking worked example measured the basic-rate band against **GROSS salary**. £37,700 is a taxable-income ceiling, so the band remaining is **£25,270, not £12,700** | Both the line and its downstream figure recomputed |

**C2 is the entry to read twice.** It is the *same* error phase 0 fixed in the CGT
calculator, and **phase 0's own fix to the downstream band figure used the same wrong
gross-income method and propagated the error**. The site's calculator had it right while
its prose had it wrong, on adjacent URLs, and only the independent review caught it. A
wave that fixes a method error and does not re-derive every figure that method touches
will ship the error it just fixed.

Four claims defects, **two of which THIS PORT introduced** — the worst kind, because
nobody had reviewed them:

| id | defect | fix |
|---|---|---|
| R2 C5 **(port-introduced)** | "Read by a specialist, not a call centre", written to replace a banned turnaround promise, is contradicted by our own `/privacy-policy`: an enquiry may be offered to up to three firms plus three in related professions, with an LLM grading step first | Replaced with a process fact the code does guarantee: **"Anonymous until a firm takes it on — firms are first shown a summary with your name and contact details removed"**, verified in `offer-send.ts` and the release path |
| R2 C6 **(port-introduced)** | "We confirm your exact figures / what you need to file" on four calculator pages, against `/terms` §2 (no accountant-client relationship on enquiry submission) and §3 (no accuracy warranty) | Rewritten |
| R2 C3 | "No sign-up, no data stored" beside pages carrying two lead forms | Scoped to what is true: the calculator **inputs** genuinely never persist |
| R2 C4 | A "penalty estimator" advertised on a tool that deliberately asserts **no** penalty figure at all (house position 31) | Naming aligned with the tool |

Stale time, **a defect class no arithmetic sweep looks for**:

| id | defect | fix |
|---|---|---|
| R2 C11 | An **expired 5 April 2026 claim deadline** published as live guidance | Restated as closed |
| — | **"the registration deadline was 5 October 2026"** for a deadline **three weeks in the future**, telling readers they had missed something they had not (`crypto-to-crypto-swaps-are-disposals.md`) | Tense corrected to "is" / "if you miss it" |
| R2 C7 | Negligible-value backdating published **six times, and inside `HowTo` JSON-LD, as a four-year window**. **TCGA 1992 s.24(2) limits it to two years**; four years is the separate loss-claim limit | Both rules now stated and explicitly distinguished, with a `legislation.gov.uk` citation |

Design review (R1): **no blocking, five majors, all fixed.**

| id | defect | fix |
|---|---|---|
| R1 D1 | The focus ring was hardcoded to `#0e1a3a`, **which IS the navy band ground**, so keyboard focus painted navy-on-navy at **1.00** and was invisible on every navy surface — header, blog, calculators and both forms | **Neither action-ramp step works as a ring** (`#8f421f` is 2.42 on navy, `#6e3118` is 1.72), so a dedicated `--focus-ring: #b86c42` was derived that clears the 3.0 graphic floor on **all five grounds the site paints** (3.99 white, 3.82 off-white, 4.29 navy, 4.47 slate-900, 3.79 neutral-800). Literal hex, not the v4 ramp utility, because that emits `oklch()` and would not render the colour these sRGB ratios were measured on |
| R1 D2 | `/research/crypto-tax-gap-index` had **zero `focus-visible` anywhere** | 14 elements now covered |
| R1 D3 | `.eyebrow-rule` emitted **24 times across the 51 sitemap routes** (26 counting `/book` and `/thank-you`) with no rule in any served stylesheet | Fixed with a **local rule, not the kit import**: importing `globals-standard.css` drags in Property's emerald and cream and every other collapsed `[data-draw="off"]` state, which on a sibling site left 64 pages with invisible marks and needed a `<noscript>` override. Six lines beat 250. `(scripting: enabled)` replaces the `<noscript>` |
| R1 D4 | **Three different off-white grounds** split by route family against Property's one | Converged on `slate-50`, every affected colour re-measured |
| R1 D5 | A navy hero running into a near-identical `neutral-800` band on **12 pages** | Fixed |
| R1 D6 | **A second cascade race**: `min-h-10` and `min-w-0` both lose to the recipe they are composed over, so the header CTA rendered 160x48 instead of shrink-to-fit | Fixed site-locally beside its `display` sibling; **kit-level fix `017cea0e` landed in `packages/web-shared` and is live [deployed 2026-09-16, 90fbea9c]; no site-local override remains** |

**Correction to an earlier revision of this block:** it recorded the 5 October 2026
inverted tense as unevidenced. **It is real.** It is evidenced by the gap-fix package
report and directly in the diff
(`git show f9a96c30 -- crypto/web/content/blog/crypto-to-crypto-swaps-are-disposals.md`,
"the registration deadline **was** 5 October 2026" → "**is**"). The earlier note was
right that no phase-0 `_port` document carried it — that is precisely the point: it was
found by a package reading for a different class, in a file the arithmetic sweep had
already passed over.

### Deliberate calls, with the reason

| call | reason |
|---|---|
| **Navy `#0e1a3a` stays the ground identity; burnt orange `#8f421f` becomes the action hue, `#6e3118` the strong step.** Owner-approved in session | P0-C §C.5: navy is 17.11:1 on white but **1.04:1 against `--ink`**, so it is legible and carries no semantic signal — it cannot mark an action. `#8f421f` is 7.08:1 and `#6e3118` 9.93:1, clearing the text, ground and graphic floors, and both were **already in the codebase** as the site's own CTA hover/active, so this promoted an existing colour rather than minting a new one. `orange-500` (2.89) and `orange-600` (3.60) were disqualified on measurement |
| **`/about` closes on a link to `/contact`, not a form** | Property does use a form there. A new lead-capture surface is an owner gate, so the port did not add one. `about/page.tsx:119-130` |
| **A dedicated `--focus-ring: #b86c42` token, rather than reusing an action-ramp step** | No declared ramp step clears the 3.0 graphic floor on all five grounds the site paints: `#8f421f` is 7.08 on white but **2.42 on navy** and 2.14 on neutral-800; `#6e3118` is **1.72 on navy**; `#a85427` is 5.30 on white but 2.86 on neutral-800; `#c9835c` is 5.61 on navy but 2.92 on off-white. One token beats a per-surface flip because the same constant is reused on both grounds by the same components. Rationale is written into `globals.css` above the declaration |
| **`.eyebrow-rule` fixed with a local rule, not by importing the kit stylesheet** | `globals-standard.css` carries Property's emerald and cream (`--brand-glow*`, `--hero-cream`) and every collapsed `[data-draw="off"]` state the kit ships, each needing an observer to release. On a sibling site that import left 64 pages with invisible marks and required a `<noscript>` override. crypto has one consumer, so six local lines beat 250 plus five token declarations |
| Kit **`FaqSection`** declined | It is a Radix accordion with no `forceMount` (`primitives/FaqSection.tsx:34-43`). crypto's native `<details>` keeps answers in the server HTML. Adopting it would have re-opened the asserted-but-absent FAQ defect phase 0 had just closed, on four surfaces that were correct |
| Kit **`RelatedArticles`** declined | It carries `focus-visible:outline-none` (`blog/RelatedArticles.tsx:106`) whose replacement indicator `.related-card:focus-within` lives in `globals-standard.css`, which crypto does not import. It would have shipped invisible keyboard focus. Substituted `HubArticleList` (R1 V4 confirms) |
| Kit **`BlogSidebarCta`** and **`BlogCategoryHub`** declined | Each would have added a capture surface. Owner gate |
| ~~Kit **`LeadCTAPanel`** declined~~ **SUPERSEDED by the uplift (`7dfe04b3`): it is now ADOPTED on the closing ask, with crypto's own four proof points passed explicitly.** The original reason, kept because it is why the adoption had to pass `proofPoints` rather than take the defaults | Its `proofPoints` default publishes claims no page authored ("Fixed fees, quoted upfront"), and it is a further capture surface. R1 V9 confirms `proofPoints` appears in crypto only inside two comments explaining the avoidance |
| Kit **`SlimHero`** declined | Recorded at its call site with the others; the site uses its own `_parts/PageHero` |
| Kit **`WhatToExpectCard`** defaults overridden | `DEFAULT_ITEMS` ends "Fixed fee quote if you decide to proceed" and crypto publishes no fees. `contact/page.tsx` passes `items` explicitly; R2 V9 measures "fixed fee" on **0 of 54** pages |
| **Header-CTA cascade defect fixed site-locally, not in the kit** | The estate-wide defect reproduces here and was confirmed by byte offset. A layered rule in `app/layout.tsx` keyed on the CTA data attributes fixes it without touching `packages/web-shared/` — the durable kit fix crosses 18 sites and is an owner decision (trap 12). R1 V1 measures the override working: `none/none/none/flex/flex` at 390/768/1023/1024/1440 on all 53 routes |
| `tw-animate-css` **not added** | A new dependency is an owner call |

### Open owner decisions

1. **The composite testimonials block** on `/` ("Real outcomes / What clients say", three
   attributed quotes under a composite disclosure). Estate house style, pre-dates the
   port (`git blame` -> `a516e497e`). Open question: can "our client base" and "the
   compliance situations described are real" be stood behind on a site whose first
   client is not evidenced. (P0-A M2, R2 O2)
2. **The three homepage behaviour claims**, all three pre-dating the port by two months:
   "Many DIY returns omit hundreds of swap events entirely"; "The four errors most DIY
   crypto returns contain"; "We work with them every week" — the last being a claim
   about our own trading volume. (R2 O3)
3. **The site-identity claim in titles and meta.** 54 of 54 pages carry an "accountants"
   string, `<title>` says "Specialist UK Crypto Tax Accountants", the JSON-LD declares
   `["ProfessionalService","AccountingService"]`, and `/terms` §2 says no
   accountant-client relationship is created. **This is an open estate-wide item**, not
   a crypto regression (Property's own config reads "Specialist property accountants").
   (P0-B R5, R2 O1)
4. **`tw-animate-css` is absent from `crypto/web/package.json`.** Confirmed by grep.
   Adding a dependency is an owner call.
5. **The kit footer's required `consentToggle` is passed `null`**
   (`components/ui/PageShell.tsx:85`) while `app/layout.tsx:66` mounts
   `AnalyticsProvider … posture="opt-out"`. The site ships an opt-out posture with no
   opt-out control.
6. **`robots.ts` inconsistency:** `src/app/robots.ts:80` disallows `["/thank-you", "/admin"]`
   but not `/book` or `/complete`, which are served, carry published copy, and are
   `noindex, nofollow` by metadata only.
7. **`monitored_pages` has zero crypto rows** (P0-D §6, scan verified against 1,000 rows
   across 18 site/status pairs). crypto has no rewrite-decay detector. Arm at cutover?
8. Phase-0 owner items carried forward: the disclosure-penalty presentation under house
   position 31, the FCA Wave 6 refresh on `/research/crypto-tax-gap-index`, the
   "fixed-fee basis" pricing-model claim on `/about`, and the IP understatement that
   remains in 13 other cookie policies **including Property**.
9. **The kit footer wordmark focuses at 2.52 on the footer ground, under the 3.0 graphic
   floor, on every page** (R1 D9). The site's own focus rings were all fixed in the
   gap-fix wave; this one was not, because the fix is in a file shared with Property.
   **It is the same class as the header-CTA cascade defect**: a real defect whose durable
   fix crosses the estate, so it is an owner decision under trap 12, not a site call.
   These two are now the port's only known-unfixed defects and they are both kit-level.
10. ~~**The homepage still runs a neutral type and border ramp on a now-`slate` ground**~~
    **CLOSED by the design uplift (`7dfe04b3`).** 98 classes converted across 10 files.
    Zero `neutral-*` classes remain in live markup; the 7 remaining `neutral-` hits in
    `crypto/web/src` are prose inside comments recording retired pairs.
    Deriving command: `grep -rn 'neutral-[0-9]' crypto/web/src`.
11. **The key-figures strip is static text, because `StatsCounter` was declined.** Property
    and generalist both run the kit's animated count-up directly under the hero; it is the
    first motion a visitor sees. crypto's strip stays static because the component takes
    one number and renders no links, so adopting it as-is would mangle "18% / 24%" and
    "1 Jan 2027", strip the separator from "£3,000", and **delete four gov.uk source
    links** (`app/page.tsx:23-43`). **The owner may want the motion.** The cost is either
    those four source links or new copy written so the figures are single plain numbers.
    This is a content-and-evidence call, not a design one, which is why it was not taken
    unilaterally.
12. **crypto's form input border is `border-slate-300`, which measures 1.49:1 on white and
    fails the 3.0 graphic floor** — on `LeadForm.tsx:15`, `DetailsForm.tsx:20` and
    `BookingPicker.tsx:26`, so on every capture surface. **Property fails the same floor
    with the same colour** (`Property/web/src/components/forms/LeadForm.tsx:19`); it
    differs only by drawing it at `border-2`, which is a thicker failure, not a passing
    one. So this is an estate-wide floor question, not a crypto regression, and fixing
    crypto alone would make it the only site in the estate with a different input border.
    Owner call. (Same class as items 9 and the header-CTA cascade defect: real, and the
    durable fix crosses sites.)

### Orphaned or unowned files

- **`crypto/web/src/app/_parts/PageHero.tsx`** (new in `666ab0a2`, 56 lines) **had no
  declared owner in the phase-0 package table.** It is now imported by seven page files
  (`/about`, `/book`, `/complete`, `/contact`, `/for`, `/services`, `/thank-you`) plus
  `components/templates/TopicPageLayout.tsx`, which serves `/services/[slug]` (5) and
  `/for/[slug]` (6) — **nine route families, eighteen URLs**. A shared hero created
  inside a disjoint-file-set wave and owned by nobody.
  Deriving command: `grep -rln "_parts/PageHero" crypto/web/src`
- Also net-new and unowned by the package table: `components/ui/PageShell.tsx`,
  `components/ui/nav.ts`, `components/templates/TopicPageLayout.tsx`,
  `components/blog/wrapWideTables.ts` (+ its test).

### Leftovers ledger — reported, STILL not fixed

Each with the document that raised it. **Rows closed by the gap-fix wave have been
removed from this table** (R1 D4, D5, D6; R2 C7, C10, C13) and appear in the gap-fix
section above. What remains below is genuinely outstanding at `f9a96c30`.

| item | file:line | source |
|---|---|---|
| UTF-8 BOM on a source file | `src/app/about/page.tsx:1` (`ef bb bf`) | P0-A M8 |
| `--surface-elevated` declared, read by nothing | `src/app/globals.css` | P0-C C14 |
| v3 hex literals retained (`#64748b` x12, a v3 `slate-500`; v4 emits `#62748e`) | across `src/` | P0-C §C.9 step 7 |
| Dead `text-base` appends on 6 CTAs. (`error.tsx`'s button class string was rewritten in the gap-fix wave to carry `focusRing`; re-check whether its dead `inline-flex` survived) | `src/app/error.tsx:33` + 6 call sites | P0-C C7, C9 |
| Placeholder phone `+44 20 0000 0000` and an unpublished email sitting in config | `crypto/niche.config.json` `contact.phone`, `contact.email` | P0-B R9 |
| `cta.sticky_secondary` = "Free, no-obligation reply within 24 hours" renders on 0 URLs — dead copy still carrying a banned promise | `crypto/niche.config.json` | P0-B R9 / P0-A "could not settle" |
| Research data table has no `<caption>` | `src/app/research/crypto-tax-gap-index/page.tsx:181` | P0-E E4 |
| `/embed/[slug]` inherits the root-layout footer, so an embedded iframe ships the whole site footer | `src/app/embed/[slug]/page.tsx` | P0-D D6 |
| `storagePrefix="datp"` matches no crypto brand string; every other site derives it from its brand. Property's is annotated FROZEN, so changing crypto's is a decision | `src/app/layout.tsx:66` | P0-D D9 |
| Local `MiniCapture` shadows the kit's by name; two mounts per calculator page (pre-existing, deliberately unchanged) | `src/components/calculators/MiniCapture.tsx`; mounts at `calculators/[slug]/page.tsx:107` and `CalcResultCta.tsx:8` | P0-E E7 |
| `cta_snapshot.mjs` hardcodes `EXPECT_TITLE = "CIS Accountants"` (line 25) and exits 2 on every site but Trade | `docs/_engines/instruments/cta_snapshot.mjs:25` | P0-D D8 |
| `browser_check.mjs --save-baseline` exits at line 726 before printing the self-test verdict, the unparseable-colour count and the whole `--grounds` summary | `docs/_engines/instruments/browser_check.mjs:726` | P0-D D10 |
| `link_baseline.json` / `browser_baseline.json` carry `sha: 7b5c0ce8`; the measured build is `e25412d7` | `docs/crypto/_port/*.json` | P0-D D0 |
| R1 D7: heading level skipped h1 -> h3 on 11 pages (`/blog`, 6 category hubs, 4 calculators) | | R1 D7 |
| R1 D8/D10: the `#main` scroll-offset comment asserts "zero in-page anchors today" (false: 19 posts and `/about` carry them, all covered elsewhere), and quotes byte offsets that no longer match the served sheet (`.hidden` 16552, `.inline-flex` 16631) | `app/layout.tsx:18,38` | R1 D8, D10 |
| R1 D9: focus ring on the dark footer measures 2.52, under the 3.0 graphic floor, on all 53 pages. **Not a leftover by omission — it is owner decision 9**, because the fix is in a file shared with Property | kit footer wordmark, `packages/web-shared/design/chrome/` | R1 D9 |
| R2 C8: a named commercial product's defaults asserted as fact and inside a testimonial. Pre-dates the port (`a516e497e`) | `app/page.tsx:105,204` | R2 C8 |
| R2 C14: the cETN / Innovative Finance ISA dated claims are load-bearing and sit outside `house_positions.md` and `rates_ledger.json`. Add ledger keys | `content/blog/crypto-isa-etn-uk-tax.md:10,13,15,23,27` | R2 C14 |

### R1 design review

**Available, complete, committed and ANSWERED.** `docs/crypto/_port/R1_DESIGN_REVIEW.md`,
332 lines, reviewer R1, against the rendered DOM at 390/768/1024/1440 over 53 routes plus
`/book` and `/thank-you`, at `666ab0a2` with the server identity and age both proven.
Committed in `f9a96c30` alongside the fixes it caused.

- **BLOCKING: none.** No new interruption, modal, banner, toast, timed promise or extra
  capture surface (R1 §3 carries the positive proof).
- MAJOR: D1-D5, **all five fixed in `f9a96c30`**. MINOR: D6-D10 — D6 fixed, D9 is owner
  decision 9 (kit-shared), D7/D8/D10 outstanding in the leftovers ledger.
  Verified-as-fixed, do not churn: V1-V12.
- **Three checks are NOT MEASURED** because the server R1 was using stopped answering at
  roughly 60% through the review (R1 did not start or stop it): the **mobile drawer open
  state** at 390/768 (contrast, focus trap, tab order, Escape, scroll lock), the
  **calculator result panel's warn/edge branches**, and the **booking picker's day strip
  at 390** in its populated state. Nothing in R1 clears these. Re-run them once a server
  is up.
- R1's F3 is the one to carry: **`getComputedStyle` lies about outlines in this
  environment** (it reported a white 3px ring where the painted ring was burnt orange
  2px at offset 2, under a real `:focus-visible`). Every focus-ring number not backed by
  a screenshot is suspect, and a gap-fix wave that trusts computed `outlineColor` will
  chase ghosts.

R2, the content review, is at `docs/crypto/_port/R2_CONTENT_REVIEW.md`: 2 blocking,
6 major, 6 minor, 4 owner decisions, 31 verified-correct checks. **Both blocking and
four of the major rows were fixed in `f9a96c30`**; the rest are owner decisions (O1-O4)
or sit in the leftovers ledger.

**What is still unmeasured at port close.** R1's three NOT-MEASURED checks were never
re-run, because the server died during the review and the gap-fix wave did not stand one
back up for them. The mobile drawer open state, the calculator warn/edge branches and the
populated booking strip at 390 are **the only part of this site no review has covered**.
They are interaction states, so they are also where a focus-ring or contrast fix is most
likely to have been missed — and the focus-ring work in `f9a96c30` touched the drawer's
components without anyone opening the drawer. Re-run these first next time a server is up.

### The port's own source documents

`docs/crypto/_port/`: `PHASE0_PACKAGES.md` (the package table, written before launch),
`P0A_CLAIMS_LEDGER.md` (7 serious, 8 minor), `P0B_RENDERED_SWEEP.md` (6 serious, 4 minor
over 58 served URLs), `P0C_CSS_TOKEN_AUDIT.md` (17 findings, the token ramp spec),
`P0D_BASELINE.md` (10 defects, the instrument baselines), `P0E_STRUCTURAL_INVENTORY.md`
(8 defects, 1 critical), `R1_DESIGN_REVIEW.md`, `R2_CONTENT_REVIEW.md`, plus
`link_baseline.json`, `browser_baseline.json`, `cta_snapshot.json` and the raw runs.

---

Last updated 2026-07-15 (HARDENED + PARITY + WAVE-2 BUILT, deploy held). Generated by
`optimisation_engine.ops.spinup_site`. Tranche: **2**.

brand_locked: true

> **DEPLOYED TO PRODUCTION 2026-07-16** at https://www.cryptotaxpartners.co.uk (Vercel CLI, prod). Live battery passed (all key routes 200, apex 308 to www, brand clean). sites.active=true; sitemap submitted to IndexNow. Remaining external: GSC property + Request Indexing, Bing import, GA4 id, real phone, brand logo assets.

> **FINAL BRAND LOCKED 2026-07-16: "Crypto Tax Partners" @ cryptotaxpartners.co.uk** (owner-purchased domain; built under working brand "Digital Asset Tax Partners", all references swapped repo-wide 2026-07-16).

> **Working brand, NOT final. Deploy held.** Locked under the working brand
> **Crypto Tax Partners** (`www.cryptotaxpartners.co.uk`) so the
> launch core can be built under the medical-trap brand-lock guard. Owner picks
> the FINAL brand + registers the domain at gate G1 (a 3-file config swap:
> `crypto/niche.config.json`, `sites/crypto.json`, this file). RDAP re-verify
> `cryptotaxpartners.co.uk` before buying. See
> `expansion_research/tier1_crypto/BRAND_SHORTLIST.md` (fallback: Cryptoasset
> Tax Partners).

## 2026-08-25 TRACK 2 STAGE 0 DIAGNOSIS: cluster-coverage discovery pass (research only, nothing built)

**Headline: crypto does not need more pages. It needs the pages it already has rewritten
against the market's vocabulary.** 25 of 332 of the market's top phrasings (7.5%) appear
verbatim anywhere in the site's 74,611-word corpus. Every cluster with real demand already
has a page. The binding constraint is phrase coverage and discovery, not corpus size.

Method: `REWRITE_PROGRAM.md` §9.2 (six steps) + §9.7 (source union, reconciliation ledger),
run per `PROPERTY_STANDARD_ROLLOUT.md` §5.0 Stage 0 and §5.1 steps 2-4. Nothing deployed,
nothing published, nothing committed by the pass itself.

### Spend, measured not estimated

| Item | Value |
|---|---|
| Endpoint for balance | `GET https://api.dataforseo.com/v3/appendix/user_data`, field `tasks[0].result[0].money.balance` |
| Balance before | **$4.017324** (NOT the $4.78 recorded at 2026-08-21 in the rollout doc; $0.76 had already gone) |
| Actual spend | **$1.1947** (sum of `body["cost"]` over 39 saved responses; reconciles exactly to the balance delta) |
| Balance after | **$2.822604** |
| Documented model | `DISCOVERY_ENGINE_V2.md` §4 says ~$2.30/site. The real Labs prices are lower: `competitors_domain` cost $0.0180 against a $0.05 estimate; `ranked_keywords` at 1,000 rows cost $0.1320; `serp/google/organic/live/advanced` cost $0.0020 each. |

Budget was never the constraint. The pass fitted with $2.82 to spare.

### What crypto is today (read from the repo 2026-08-25)

36 substantive pages: **19 blog posts**, **6 `/for` hubs** (investors, day-traders,
defi-and-staking, nft-creators-and-flippers, miners, businesses), **5 `/services`**
(hmrc-disclosure, crypto-self-assessment, koinly-recap-reconciliation, crypto-cgt-planning,
investor-vs-trader-status), **4 calculators** (crypto-cgt-estimator, crypto-disclosure-estimator,
investor-vs-trader-checker, staking-mining-income-estimator), **1 research asset**
(crypto-tax-gap-index), homepage. Plus index/legal/utility routes.

Coverage is structurally complete: every cluster the data found already has at least one
page, except four (below).

### Both engines, pulled fresh (§9.7 makes these mandatory)

- **Google (GSC, `sc-domain:cryptotaxpartners.co.uk`, 2026-05-27 to 2026-08-23):** 47 queries,
  **174 impressions, 0 clicks**. Best average positions are day-trader terms: "day trader tax uk"
  17 impressions at 17.8, "day trading uk tax" 23 at 27.3, "day trader status" 2 at 18.5.
  Everything commercial sits at position 60-90.
- **Bing (`GetQueryStats`):** 8 queries, **11 impressions, 0 clicks**.
- Site went live 2026-07-16, so this is ~38 days of real history. Young-data rules apply
  (§5.0): grade REFRAME-heavy, label every artefact with this window.

### Sources harvested (named, with row counts, per §9.7)

`ranked_keywords/live` UK (location 2826, `en`), ordered by volume desc, limit 1,000/domain:
koinly.io 1,000 of 1,741 · coinledger.io 1,000 of 1,323 · mmba.co.uk 1,000 of 5,215 ·
blockpit.io 670 of 670 · cryptotaxation.co.uk 407 of 407 · recap.io 361 of 361 ·
hodgebakshi.com 125 of 125 · cryptocountancy.co.uk 54 · mycryptotax.co.uk 32 ·
ukcryptocurrencyaccountant.co.uk 10 · hashtax.io 8 · crypto-tax-accountant.co.uk 6 ·
cryptotaxcalculator.io 5 · cryptotaxpartners.co.uk (ours) 5.
Plus `keyword_ideas` 1,000, `keyword_suggestions` on three seeds (1,000 + 756 + 267),
`competitors_domain` 50, and 18 live SERPs.

**Stated limitation:** three domains were capped at 1,000 rows rather than paginated to
exhaustion as §9.7 requires (koinly 741 rows unseen, coinledger 323, mmba 4,215). The client
wrapper exposes no offset parameter, and adding one is a code change this pass was not
authorised to make. The unseen rows are the lowest-volume tail, which is exactly the tail
§9.2 says carries the phrasings, so this is a real gap, not a formality.

### The reconciliation ledger (§9.7, must balance)

| Bucket | Count | Note |
|---|---|---|
| assigned | 1,828 | in the crypto-tax term family, one cluster each |
| excluded | 408 | 362 foreign-jurisdiction, 28 news-cycle, 11 adjacent-not-crypto-tax, 7 off-niche |
| deferred | 4,165 | pulled but outside the crypto-tax family (generic crypto, generic accountancy) |
| **universe** | **6,401** | 1,828 + 408 + 4,165 = 6,401 ✓ |

Named exclusions with their volume, never dropped silently: "mining pools" (320), "mining pool
stats" (210), "miner pool stats" (210), "stake pools" (140) are mining infrastructure, not its
tax. "trading allowance" (1,300) and "trading income allowance" (880) are the generic £1,000
self-employment allowance and belong to a generalist cluster. "is kraken liable for your losses"
(170) is consumer redress. Together 3,630/mo of demand that would have flattered this niche.

### TRAP: never sum a cluster's keyword volumes

Google Ads reports one volume for a whole close-variant group. "crypto uk tax", "cryptocurrency
and uk tax", "tax for cryptocurrency uk", "tax on cryptocurrency uk" and "cryptocurrency tax uk"
all report 880. Summed that is 4,400 of demand that does not exist. Measured inflation across
this family: **2.32x**. Raw-sum 39,400/mo deduplicates to **17,010/mo**. Every figure below is
deduplicated (one row per close-variant group, carrying the group's max volume).

### 1. The clusters, ranked by peer-winnable volume

Peer-winnable = the volume of groups that at least 2 of the 14 harvested competitor domains
actually rank for. §9.3 prioritises on that number, never raw volume.

| # | Cluster | Groups | Vol/mo | Peer-winnable | Median KD | Max CPC | Head term (vol, KD, CPC) |
|---|---|---|---|---|---|---|---|
| 1 | core-primer | 395 | 5,870 | **2,720** | 18 | £20.78 | crypto uk tax (880, KD 19, £7.03) |
| 2 | hmrc-disclosure-enforcement | 35 | 2,330 | **2,060** | 11 | £7.13 | hmrc cryptocurrency information sharing (480, KD 9) |
| 3 | calculator-tool | 56 | 1,920 | **1,270** | 7 | £18.19 | crypto tax calculator (880, KD 0, £14.20) |
| 4 | accountant-commercial | 50 | 1,440 | **950** | 0 | £34.12 | accountant cryptocurrency (320, KD 0) |
| 5 | cgt-disposals | 75 | 1,410 | **840** | 15 | £28.21 | crypto capital gains tax (170, KD 6) |
| 6 | software-reconciliation | 49 | 690 | 210 | 21 | £8.46 | crypto tax software (110, KD 21, £5.25) |
| 7 | planning-mitigation | 42 | 460 | 210 | 1 | £2.49 | how to avoid tax on crypto uk (110, KD 0, £1.75) |
| 8 | rates-allowances | 66 | 820 | 100 | 16 | £15.17 | how much crypto is tax-free uk (50, KD 10) |
| 9 | income-side | 19 | 210 | 100 | 12 | - | crypto passive income (50, KD 12) |
| 10 | jurisdiction-relocation | 73 | 740 | 90 | 5 | £0.03 | crypto tax free countries (90, KD 5) |
| 11 | filing-self-assessment | 33 | 370 | 70 | 33 | - | crypto reporting (70, KD 33) |
| 12 | trader-status | 12 | 420 | 0 | 0 | **£59.38** | cfd trading uk tax (170, KD 0) |
| 13 | staking-mining-airdrops | 22 | 150 | 0 | 39 | - | crypto staking tax uk (20, KD 39) |
| 14 | losses-reliefs | 19 | 140 | 0 | 13 | - | tax deduction crypto losses (10) |
| 15 | defi | 6 | 30 | 0 | 55 | £5.04 | liquidity pools vs staking (10, KD 55) |
| 16 | nft | 2 | 0 | 0 | - | - | nft tax (0) |
| 17 | business-corporate | 2 | 10 | 0 | - | - | corporation tax cryptocurrency (10) |

**Total addressable UK crypto-tax demand: 17,010/mo, of which 8,620/mo is peer-winnable.**
This is a small niche won on breadth of long tail, not on head terms. The largest single
head term in the whole niche is 880/mo.

**Difficulty is the story.** The entire commercial layer is KD 0: "crypto accountants uk"
(320, KD 0, CPC £18.59), "crypto tax accountant uk" (110, KD 0, CPC £11.61), "crypto tax
calculator" (880, KD 0, CPC £14.20), "crypto tax calculator uk" (390, KD 2, CPC £7.56).

### 1a. SERP screen (§9.2 step 3): zero clusters are locked out

18 live SERPs pulled (`serp/google/organic/live/advanced`, depth 10, UK). Every one has
between 3 and 7 peer-authority organic slots. **Not one is owned end-to-end by gov.uk or a
national brand**, so §9.2 step 3's structural exclusion fires on nothing.

Two findings that change the plan:

- **`ai_overview` appears on 12 of 18 SERPs; `people_also_ask` on all 18.** AI-surface and
  answer-block readiness is a first-order lever in this niche, not garnish.
- **`local_pack` appears on all three commercial accountant SERPs** ("crypto accountants uk",
  "crypto tax accountant uk", "crypto tax accountant london"). That surface needs Google
  Business Profile, which is a standing NO estate-wide (suspension risk). We compete for the
  6 to 7 organic slots below it and must not plan around the pack.

The harvest was seeded on mycryptotax.co.uk, which turned out to rank for only 32 UK keywords.
The live SERPs corrected that: **mmba.co.uk appears in 8 of 18 SERPs** and was missing from the
first harvest. It was added ($0.132) and is the real content leader. Recurring peer domains
worth watching: mmba.co.uk, hodgebakshi.com, litrg.org.uk, taxfix.com, alexander.co.uk,
bkl.co.uk, charltonbaker.co.uk, mjkane.co.uk, uk.andersen.com, crunch.co.uk, theaccountancy.co.uk.

### 2. The diagnosis: 7.5% phrase coverage

Same measurement Property's SDLT audit ran. Corpus = 19 blog `.md` + hub/service data files +
calculator definitions + every non-admin `page.tsx`, 74,611 words across 45 files.

**25 of the 332 top-25-per-cluster phrasings appear verbatim. 7.5%.**

Spot-checked by direct grep, because the claim is load-bearing: `"crypto accountants uk"` appears
in **0** files. `"crypto uk tax"` appears in **0** files. `"crypto tax accountant"` appears in 2.
A site whose entire business is being a UK crypto tax accountant does not say so in the words
the market searches.

Worst offenders, by missing volume: core-primer 2,600/mo missing, hmrc-disclosure 2,070,
accountant-commercial 1,180, cgt-disposals 850, calculator-tool 780, rates-allowances 560
(0 of 25 present), jurisdiction-relocation 410 (0 of 25), trader-status 420 (0 of 12).

### 3. Page inventory: 16 pages, 4 net-new, 12 rewrites

Estate rule applied throughout: if a page already covers a query it is a rewrite candidate,
never a new page. Never collapse, never duplicate.

**REWRITES (12).** Grade is REFRAME for all of them under §9.2 step 5: Google impressions are
under 300 and Bing clicks are 0 on every page, so metaTitle, H1, H2s, body and FAQ are all in
scope. No URL changes.

| # | Page | Cluster | Missing phrasings to place (vol, KD) |
|---|---|---|---|
| R1 | `can-hmrc-track-crypto-wallets` | hmrc | hmrc cryptocurrency information sharing (480, 9); hmrc cryptocurrency data collection (90, 19); do coinbase report to hmrc (70, 0); do binance report to hmrc (50, 0). **Biggest single miss on the site.** |
| R2 | `how-crypto-is-taxed-uk` | core-primer | crypto uk tax (880, 19); do you pay tax on crypto (170, 18); crypto tax rules uk (110, 15); is crypto taxable in uk (110, 20); is crypto taxed in uk (110, 19) |
| R3 | homepage | accountant-commercial | crypto accountants uk (320, 0, £18.59); accountant cryptocurrency (320, 0); crypto tax accountant uk (110, 0, £11.61) |
| R4 | `calculators/crypto-cgt-estimator` | calculator-tool | crypto tax calculator uk (390, 2); crypto capital gains tax calculator (40, 7, £18.19); hmrc crypto tax calculator (30, 7). Retitle to own the 880/mo head. |
| R5 | `carf-crypto-reporting-2026-explained` | hmrc | hmrc mandatory crypto disclosure (260, 13); crypto asset reporting framework (90, 20) |
| R6 | `hmrc-crypto-crackdown-2026` | hmrc | hmrc crypto tax (390, 24); hmrc crypto tax crackdown (90, 0); hmrc crypto tax rules 2026 (90, 3); uk crypto tax crackdown 2026 (90, 7) |
| R7 | `crypto-to-crypto-swaps-are-disposals` | cgt-disposals | capital gains tax on crypto uk (140, 13); cryptocurrency capital gains uk (110, 15); cgt on crypto uk (90, 9) |
| R8 | `crypto-same-day-30-day-rules-worked-example` | cgt-disposals | taxes on crypto gains (90, 15); do you pay tax on crypto gains (70, 3); tax on crypto gains uk (50, 15) |
| R9 | `day-trader-forex-spread-betting-tax-uk` | trader-status | cfd trading uk tax (170, 0); is cfd trading tax free in uk (70, 0, **£59.38**); cfd trading and tax (70, 0); tax for day trading (70, 6). Already our best-positioned page (17.8 on Google). |
| R10 | `legitimate-ways-reduce-crypto-cgt-uk` | planning-mitigation | how to avoid tax on crypto uk (110, 0); how to avoid capital gains tax on cryptocurrency uk (70, 1); can you gift crypto tax free uk (20) |
| R11 | `services/crypto-self-assessment` | accountant-commercial | crypto tax advisor (40, 0); crypto tax advisory (40); crypto tax advisor uk (30, 0); crypto tax advice uk (30, 32) |
| R12 | `services/koinly-recap-reconciliation` | software-reconciliation | best crypto tax software (50, 8); crypto accounting software (50, 26); recap crypto tax (50, 7); crypto tax software uk (40, 4) |

**NET-NEW (4).** Only clusters where no page of ours scores at all (§9.2 step 4, NO-PAGE).

| # | Proposed page | Type | Cluster | Target query (vol, KD) | Why new |
|---|---|---|---|---|---|
| N1 | How much tax do you pay on crypto in the UK: rates, allowances and thresholds 2026/27 | supporting article | rates-allowances (66 groups, 820/mo) | how much crypto is tax-free uk (50, 10); how much tax do you pay on crypto uk (50, 13); crypto tax free allowance uk (20, 16) | **0 of our pages serve it and 0 of 25 phrasings present.** Largest uncovered cluster. |
| N2 | Crypto tax-free countries, and what actually happens to your UK tax if you move | supporting article | jurisdiction-relocation (73 groups, 740/mo) | crypto tax free countries (90, 5); thailand/cyprus/malta/switzerland crypto tax (20-40 each, KD 0-5) | 0 pages, 0 of 25 phrasings. UK-resident searchers, so a UK-rules answer is the honest angle. |
| N3 | How to declare crypto on your Self Assessment: SA100 and SA108 walkthrough | supporting article | filing-self-assessment (33 groups, 370/mo) | crypto reporting (70, 33); how to declare crypto on tax return (10, 17); crypto tax deadline (10) | Only the service page touches it; no procedural page exists. |
| N4 | Crypto passive income and UK tax: staking, lending and yield | supporting article | income-side (19 groups, 210/mo) | crypto passive income (50, 12); passive income from cryptocurrency (50, 8) | 0 pages. Bridges the staking corpus to how people actually phrase it. |

No pillar pages proposed: the pillars exist. No location pages proposed (see §5 below).

### 4. Calculators: build zero new ones

`PROPERTY_STANDARD_ROLLOUT.md` §6.2 requires the fleet size to be data-derived, never a round
number. The data derives **zero**.

The calculator-tool cluster is 56 groups and 1,920/mo, and it is the highest-CPC winnable
surface on the site (head £14.20, max £18.19, KD 0-2). But every group in it is a variant of
two intents the existing fleet already serves: whole-liability estimate and CGT-specific
estimate. The only calculator query that is not is "crypto return calculator" (70/mo, KD 11),
which is an investment-return tool, off-brief for a tax firm.

Action is a **reframe, not a build**: `crypto-cgt-estimator` is retitled and rewritten to own
"crypto tax calculator uk" (390, KD 2) and "crypto tax calculator" (880, KD 0). Our own GSC
already shows this is what Google surfaces us for ("crypto capital gains tax calculator" 15
impressions at 62.9, "crypto tax calculator uk" 11 at 63.9, our two biggest impression earners).
§9.12's lever board rates page shape (a working tool) as a live lever; the tool exists and is
mis-titled, which is the cheapest version of that lever.

### 5. Honest gaps: what the data killed

| Killed | Number | Why |
|---|---|---|
| **NFT expansion** | 2 keywords, **0/mo** combined ("crypto nft tax software", "best crypto nft tax software", both 10/mo and both software queries) | There is no UK NFT-tax search demand in this dataset. The site has a whole `/for/nft-creators-and-flippers` hub plus a blog post for it. Keep both as differentiators and as sales surfaces; do not write more, and do not expect traffic. |
| **DeFi expansion** | 6 keywords, **30/mo**, median KD 55 | Same shape. Three pages already exist. DeFi is a service differentiator and a credibility signal, not a traffic channel. |
| **Location pages** | 21 keywords, **310/mo total** | 13 of them are "near me" variants, which resolve to the local pack, and Google Business Profile is a standing estate-wide NO. The only real city term is "crypto accountant london" (40/mo). Not worth a page, let alone a fleet. |
| **Business/corporate expansion** | 2 keywords, **10/mo** | "corporation tax cryptocurrency" at 10/mo. Two pages and a hub already exist. Sales asset, not a content target. |
| **Staking and mining expansion** | 22 groups, **150/mo** after excluding mining-infrastructure terms | The headline 1,030/mo was 880 of "mining pools" and "stake pool stats", which are people running mining rigs, not people paying tax on them. Three pages already cover the real 150/mo. |
| **Losses and reliefs expansion** | 19 groups, **140/mo** after excluding "is kraken liable for your losses" (170) | One page already covers it. |
| **"Crypto tax software" as a content play** | 690/mo, median KD 21, SERP is 5 of 10 software vendors | We are not a software vendor. Serve it from the existing reconciliation service page only. |

### 6. Where the method did not match reality (report, do not work around)

1. **`sites/crypto.discovery.json` does not exist.** Eight sites have one; crypto is not among
   them. `candidate_pool.py` / `lane_map.py` / `competitor_watch.py` cannot run for crypto as
   `DISCOVERY_ENGINE_V2.md` describes, and `lane_map._blog_dir()` would silently fall back to
   Property's blog directory. §5.1 step 1 calls this out; it is still true. The cluster-coverage
   method (§9) needs no such config, which is why this pass used it directly.
2. **The $2.30/site cost model is stale and high.** Real prices measured above. Good news, but
   the rollout doc's estate-sweep arithmetic is built on the wrong number.
3. **The $4.78 balance recorded at 2026-08-21 was $4.017324 by 2026-08-25.** Balance figures in
   the doc decay; re-read before planning spend.
4. **§9.2 step 2's page-node merge degenerates on this niche.** Merging competitor URLs at 30%
   keyword overlap produced one blob of 105 keywords across 12 domains plus six singletons,
   because crypto competitor pages are thin (only 40 of 648 harvested pages carry 3+ tax-family
   keywords). The method assumes competitors give each topic a page; here most rank a handful of
   pages for everything. Clustering fell back to the estate's own `assign_lane` marker-substring
   primitive, keeping per-keyword domain count as the confidence score. Recorded so the next
   small niche does not rediscover it.
5. **`ranked_keywords()` has no offset parameter**, so §9.7's "paginate to exhaustion" is not
   reachable through the existing client. See the stated limitation above.
6. **Marker false-positive caught in-flight:** an unbounded `defi` token matched "definition"
   and pulled "tax rebate definition" (590/mo) into the crypto family. Same class of trap
   `DISCOVERY_ENGINE_V2.md` §2.3 documents for lane tokens. Word-bounded in this pass.

### 7. What to do next, in order

1. **R1 through R4 first** (HMRC-tracking rewrite, core primer, homepage, calculator retitle).
   Together they carry 2,930/mo of missing phrasings at KD 0-19, and three of the four are the
   commercial surfaces. One change class per page per window (§9.3), Bing read at 14 and 28 days.
2. Author `docs/crypto/house_positions.md` currency check before any writing (it exists; verify).
3. Author `sites/crypto.discovery.json` with a lane taxonomy if the discovery engine is ever to
   run here. Not required for the rewrites.
4. Do NOT spend the remaining $2.82 on more crypto discovery. The cluster picture is settled;
   the next dollar is better spent on a sibling site's Stage 0.

Raw responses for this pass ARE retained, at `expansion_research/crypto/raw_2026-08-25.tar.gz`
(2.2 MB gzipped, 38 MB expanded), with the deduplicated cluster map alongside at
`clusters_dedup_2026-08-25.json.gz` (gzipped because `.gitignore:52` excludes raw `.json` under
`expansion_research/`). Re-deriving them would cost about $1.19, but the reason to
keep them is that re-analysis is free and has already paid twice: the close-variant inflation
trap and the September-peak effect were both found by re-reading saved responses, not by
buying new ones.

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **18 commits** were on
the branch and not in `origin/main`.

**All 18 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'crypto/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'crypto/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Identity

- site_key `crypto` | display **"Crypto Tax Partners"** | intended domain `www.cryptotaxpartners.co.uk`
- Storage prefix **`datp` FROZEN** (added to the SITE_SPINUP.md registry at scaffold time; never change after first deploy)
- Tranche id: `2`
- Vercel project id: `prj_wWh5RmHySCrlJs4XEXJnXHfwsawG` (filled by scripts/vercel_create_site.py)
- Brand: NOT LOCKED. No content generation until this flag reads `brand_locked: true` (owner gate G1).

## Launch state

- [x] S1 brand lock under WORKING brand (final brand = owner gate G1): `brand_locked: true` set 2026-07-14
- [x] S2 scaffold DONE 2026-07-14: spinup_site run (prefix datp, tranche 2, --skip-db); wiring emitted (workspaces, indexing key, site_config, routing_safety prefix, tranche-2 migration pair, CI matrix, sites/crypto.json)
- [x] S3 research pack DONE: R3 dossier + LAUNCH_CORE + HOUSE_POSITIONS_OUTLINE + CALCULATORS + DATA_ASSET all verified (expansion_research/tier1_crypto/); blog_topics seeding deferred to deploy (launch core is brief-driven, not generator-loop)
- [x] S4/S5 machinery + niche build: infra mirrored to hospitality/web parity (see Phase C); calculators (golden-figure vitest), Crypto Tax Gap Index asset, house_positions.md, rates_ledger.json
- [x] S6 LAUNCH CORE BUILT 2026-07-14 under working brand: 24 assets (home + 6 /for hubs + 5 /services + 12 blogs) written by Opus briefs + Sonnet workers (batch size 1) atop the hospitality-parity infra; 4 golden-tested calculators + Crypto Tax Compliance Index research asset. Build GREEN (35 static pages, vitest 12/12, tsc clean). Brand-agnostic body corpus; internal-link audit + adversarial fact-review (Opus) done, 0 HP-contradictions / 0 fabrication / 0 em-dash, 4 minor findings fixed manager-direct. DEPLOY HELD (G1 owner brand + domain).
- [x] S6b hardening + parity + wave-2 DONE 2026-07-15 (see section below); build + vitest GREEN, predeploy_gate --brand-only PASS
- [ ] S7 Vercel project + preview an01 pass + live battery (gates G3/G4)
- [ ] S8 domain-ready close-out: `sites.active=true`, tracker updated

## 2026-07-15 hardening + parity + wave-2 (branch expansion/phase-0, nothing deployed)

- **Phase 0 audit defects fixed:** broken internal links corrected, HP-code artefacts stripped, metaDescriptions trimmed to ≤155, breadcrumbs added.
- **Lead capture end-to-end:** /api/leads/submit route CREATED (was missing); `.env.local.example` added. Tranche-2+3 Supabase migrations APPLIED to prod 2026-07-15 (15 site keys verified live in `sites_site_key_check` + `leads_source_valid`; the generator-emitted t2 files had AGAIN dropped sibling keys and were hand-fixed to the full union before applying; new rows `active=false`); **blog_topics seeded: 1,418 rows**; lead-source constraint smoke-tested (insert+rollback). Property /api/leads/notify allowlist addition still pending at tranche G1 deploy.
- **Legal/crawl parity (Property-grade):** privacy-policy + cookie-policy + terms pages; robots.ts 40-bot AI allowlist; static `public/llms.txt` (figures from rates_ledger, verified 2026/27-current); not-found.tsx + error.tsx; NEW SiteFooter component with legal links (site previously had no footer); sitemap additions; embed backlinks verified present.
- **AI/GEO parity-or-greater:** HowTo schema (howToSteps frontmatter) on procedural posts; WebApplication schema on all calculators; Dataset schema on the Crypto Tax Compliance Index (exceeds Property); Article dateModified; Organization enrichment (legalName Ashfield Trading Ltd, knowsAbout, sameAs = Companies House 16358723 only); BLUF/FAQ audits patched.
- **Wave-2 content:** 7 blogs (Opus briefs in `briefs/crypto/wave2/` + Sonnet workers + 2-track Opus QA).
- **QA gate findings all fixed manager-direct:** cETN date corrected to 8 Oct 2025; HP-code artefacts stripped (incl. wave-1 leaks); broken internal links corrected; metaDescriptions rewritten ≤155; em-dashes purged.
- **Admin analytics:** full suite (leads/trends/login/visitor) ported from charities.
- **DONE 2026-07-16:** blog_topics wave-2 head keywords marked used=true (explicit ids, scripts/_wave2_mark_used.py; non-pool-sourced briefs skipped). Deploy held on owner G1.

## Data layer

- Tranche migration pair emitted at scaffold time (see supabase/migrations/); rows insert `active=false`
- Lead notify allowlist: add `crypto` to Property /api/leads/notify allowlist in the per-tranche Property deploy (the sole sanctioned live-site touch)

## External steps (HUMAN ONLY, gate the site going live)

- [ ] Buy the domain `cryptotaxpartners.co.uk` and point DNS at Vercel (A/CNAME per Vercel domain UI)
- [ ] **Pre-attach refresh (same day the domain is bought):** run the rates-ledger lint + dated-reference sweep (tax-year mentions) over the corpus and patch stale figures BEFORE DNS attach
- [ ] Google Search Console: add property `sc-domain:cryptotaxpartners.co.uk`, verify (DNS TXT), submit `/sitemap.xml`, Request Indexing on key pages (discovery failure is the number 1 new-site risk)
- [ ] Bing Webmaster Tools: import the site from GSC, add Bing verification code to niche.config.json
- [ ] GA4: create property, copy measurement id into `crypto/niche.config.json` -> seo.google_analytics_id, add to `optimisation_engine/clients/ga4_config.py`, redeploy
- [ ] Real phone number into `crypto/niche.config.json` -> contact.phone (placeholder ships as +44 20 0000 0000)
- [ ] Brand assets: `public/brand/primary-logo.png` + `public/brand/icon-alt.png` (OG image route depends on them)
- [ ] Resend routing ONLY if a partner firm is signed (partner CC only on partnered sites; otherwise leads route to owner inbox)
