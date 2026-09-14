# Design gap diagnosis, 2026-09-14

Read-only. No code changed, no server started, no git write, no subagent.
Everything below is derived from source and from committed port artefacts. Every
claim carries its deriving command.

---

## The finding in three lines

The gap is **not** Property's bespoke art direction, and it is **not** corpus depth.
It is **kit adoption**. generalist re-exports the shared design kit's button, container
and section primitives wholesale and clones Property's homepage anatomy component for
component; crypto hand-rolled its own primitives and built an original homepage that
never touches the kit's marketing layer. Same playbook, same phase tags, 4.5x
difference in work done.

**Decision: bring crypto up to generalist, not up to Property. It is a mechanical job
an agent can do, it needs no designer, and it is roughly a day.**

---

## 1. The control case settles it: four markers, and they sort perfectly

```
for s in Property crypto generalist charities Solicitors Dentists Medical construction-cis contractors-ir35; do
  p=$s/web/src/app/page.tsx
  echo "$s: ping=$(grep -c 'animate-ping' $p) statscounter=$(grep -c 'StatsCounter' $p) backdrop=$(grep -c 'Backdrop' $p) roundedfull=$(grep -o 'rounded-full' $p|wc -l)"
done
```

| site | live-dot pill | StatsCounter | hero backdrop SVG | rounded-full | owner's verdict |
|---|---|---|---|---|---|
| Property | 1 | 2 | 3 | 4 | "wow" |
| **generalist** | **1** | **2** | **3** | **4** | **"looks good"** |
| Solicitors | 0 | 1 | 3 | 3 | not rated |
| Medical | 0 | 2 | 4 | 1 | not rated |
| Dentists | 0 | 0 | 4 | 1 | not rated |
| construction-cis | 0 | 0 | 4 | 0 | not rated |
| contractors-ir35 | 0 | 0 | 0 | 0 | not rated |
| charities | 0 | 0 | 0 | 0 | not rated |
| **crypto** | **0** | **0** | **0** | **0** | **"not there"** |

generalist's homepage hero is a line-for-line clone of Property's, down to the
`animate-ping` status dot and the identical class string
`text-3xl font-bold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl`
(`generalist/web/src/app/page.tsx:267` against `Property/web/src/app/page.tsx:250`, byte-identical).
crypto's hero is original work: a square chip, no dot, a CSS gradient in place of artwork,
`lg:text-6xl` instead of `lg:text-7xl`.

### The mechanism, stated once

```
grep -rho "web-shared/design/\(marketing\|primitives\)/[A-Za-z-]*" <site>/web/src | sort | uniq -c
```

| site | distinct kit design components | call sites | kit `layout-utils` re-exported |
|---|---|---|---|
| generalist | **16** | **138** | **yes** |
| Medical | 13 | 65 | yes |
| Solicitors | 8 | 37 | yes |
| contractors-ir35 | 4 | 37 | no |
| charities | 6 | 25 | partial (21 files) |
| Dentists | 5 | 8 | yes |
| **crypto** | **5** | **20**, of which **1** is a marketing component | **no** |
| construction-cis | **0** | **0** | no |
| Property | n/a (it is the source) | | n/a |

`generalist/web/src/components/ui/layout-utils.ts:6-19` re-exports
`siteContainer, siteContainerLg, siteContainerXl, contentNarrow, sectionY, sectionYLoose,
focusRing, btnPrimary, btnSecondary, btnOnDark, btnOnCream, heroCreamSurface` from the kit,
with the header comment "these strings are the estate's; only the tokens are generalist's".

`crypto/web/src/components/ui/layout-utils.ts` declares all of them locally. Its `btnPrimary`
(`:20`) is `bg-[#0e1a3a] px-7 py-3.5 text-base font-medium`, square, no `min-w`. The kit's
(`packages/web-shared/design/layout-utils.ts:31`) is
`min-w-[10rem] rounded-xl px-8 py-3.5 text-base font-bold`. The most-repeated element on
every page is the one that diverged.

crypto's own `globals.css:52-55` declares `--btn-ground`, `--btn-ground-hover`,
`--btn-ground-active` with the comment "Declared so the navy button ground survives adoption
of the kit recipe". **The tokens were declared for an adoption that never happened.**

---

## 2. The corpus-depth hypothesis: tested hard, and it fails at the surface the owner judges

```
find <site>/web/content -name '*.md*' | wc -l
```
crypto **19**, charities 24, generalist **505**, Property **814**.

The correlation is real, so I tested whether it shows on the homepage. It does not:

```
grep -c '<section' <site>/web/src/app/page.tsx ; wc -l <site>/web/src/app/page.tsx
```

| | Property | generalist | crypto |
|---|---|---|---|
| homepage `<section>` (inline) | 7 | 5 + 4 in `HomeSections.tsx` + `LeadCTAPanel` + `FaqSection` = **~11** | **13** |
| homepage `<h2>` | 6 | 3 + 4 = 7 | **11** |
| homepage source lines | 537 | 471 | **793** |
| largest grid on the page | 4 service cards | 4 service cards | **6 segment cards** |

**crypto's homepage is the longest of the three, has the most sections, and has the fullest
grids.** It is not thin above the fold. The corpus-depth hypothesis is falsified for the
homepage.

Where corpus depth genuinely bites, and it is real but secondary:

```
grep -rho 'category: *"[^"]*"' crypto/web/content/blog | sort | uniq -c | sort -rn
  8 Crypto CGT & Disposals / 4 HMRC Disclosure / 2 Staking / 2 DeFi / 2 Business / 1 Trader Status
```
`/blog/trader-status-day-trading` renders **one card into a three-column grid**. Six category
indexes, four of them with two posts or fewer. That reads as unfinished, and no amount of CSS
fixes it. But it is a category-page problem, not the homepage the owner forms his impression on.

**Also note against the hypothesis:** crypto's homepage closes with a text-only "Browse all
guides" block (`page.tsx:764-791`) where Property and generalist render a real list of recent
posts with category rails (`Property/web/src/app/page.tsx:364-418`). crypto has 19 posts, which
is plenty for five cards. That band is empty by choice, not by scarcity.

---

## 3. The palette-weight hypothesis: also fails

Dark bands on the homepage, counted from the `<section>` ground classes:

- Property: `bg-slate-900` hero, `TestimonialsSection` navy, `bg-slate-900` CTA = **3**
- crypto: `bg-[#0e1a3a]` hero, `bg-[#0e1a3a]` flagship lane, `bg-[#0e1a3a]` CTA = **3**

`slate-900` is `#0f172b`; crypto's brand navy is `#0e1a3a`. Perceptually the same ground at
the same count. The palette is not the variable.

The one real weight difference is qualitative, not chromatic: crypto's second dark band
(`page.tsx:386-461`) is a wall of dense body copy on navy, roughly 200 words plus four
bordered sub-panels, where Property's second dark band is three short testimonial cards.
That reads heavy. It is a copy-density call, not a palette call.

---

## 4. Was the generalist port actually different? Yes, by 4.5x

```
for t in generalist solicitors dentists medical construction-cis contractors-ir35 charities crypto; do
  a=$(git rev-list -n1 port-$t-phase1); b=$(git rev-list -n1 port-$t-phase6)
  git diff --shortstat $a^ $b -- <dir>/web/src
done
```

| site | files | insertions | deletions |
|---|---|---|---|
| Medical | 98 | 9,567 | 5,076 |
| **generalist** | **108** | **7,831** | **6,515** |
| construction-cis | 112 | 6,802 | 3,306 |
| Dentists | 106 | 5,741 | 4,030 |
| Solicitors | 81 | 5,598 | 4,518 |
| contractors-ir35 | 60 | 4,024 | 2,210 |
| **crypto** | **37** | **1,727** | **675** |
| charities | 10 | 204 | 99 |

generalist deleted 6,515 lines of source. crypto deleted 675. The pilot **replaced** its
homepage and primitives with Property's; crypto **added a design layer on top of its own**.

Two aggravating factors specific to crypto, both documented:

- `PORT_FIELD_NOTES.md` §13: crypto "shipped no header, no `<nav>`, no mobile drawer, no
  `<main>` landmark and no skip link on any of 51 routes... A port of a site with no chrome is
  not a restyle, it is net-new construction." The whole phase-1 budget went on building chrome
  that every other site already had.
- `docs/crypto/STATE.md`: phases 1 to 6 are **one commit** (`666ab0a2`), built in a single day
  as concurrent packages. generalist ran over weeks as the O.8 pilot with per-phase review.

**This is a process finding, not a taste one.** The pilot did the work; the fast ports did not.

---

## 5. Bucket (a): should have been ported, was not. Ranked, all mechanical.

| # | What | Evidence | Why it reads worse | What would have to happen |
|---|---|---|---|---|
| a1 | **No webfont at all.** crypto and charities render in `ui-sans-serif, system-ui`. | `crypto/web/src/app/globals.css:116`; `grep -rn "next/font\|GeistSans" <site>/web/src/app/layout.tsx` returns nothing for crypto and charities, `Plus_Jakarta_Sans` for Property/Solicitors/Dentists/Medical, `GeistSans` for generalist/construction-cis/contractors-ir35 | System font is the single loudest "unfinished template" signal a non-technical eye reads. Nothing else on this list is as cheap or as visible. | Agent, 10 minutes. Add `geist/font` to the layout and point `--font-sans` at it, exactly as `generalist/web/src/app/layout.tsx:2-3,80`. |
| a2 | **The kit `btnPrimary` recipe was declined.** crypto's buttons are square, `font-medium`, no `min-w`. | `crypto/web/src/components/ui/layout-utils.ts:20` vs `packages/web-shared/design/layout-utils.ts:31`. crypto's `globals.css:52-55` already declares the `--btn-ground` trio the kit recipe reads. | Every CTA on 53 routes. Square + medium-weight reads as a default UI kit; rounded-xl + bold reads as designed. | Agent, under an hour. Re-export the kit's layout-utils the way `generalist/web/src/components/ui/layout-utils.ts:6-19` does. The tokens are already declared, so the navy ground survives. |
| a3 | **Phase 1 of the playbook lists "backdrop/motif" and crypto has none.** Six of eight ports built one. | `docs/_engines/DESIGN_PORT_PLAYBOOK.md` §2, phase 1 row: "Header, footer, shell, tokens, **backdrop/motif**". `ls <site>/web/src/components/layout/` gives `SolicitorsBackdrop`, `DentistsBackdrop`, `MedicalBackdrop`, `TradeBackdrop`, `GeneralistBackdrop`, Property's `HeroBrickBackdrop`. `grep -rn Backdrop crypto/web/src` returns nothing. | Property and generalist heroes carry drawn texture behind the copy. crypto's is a flat `bg-gradient-to-br`. It is the difference between art-directed and a div with a colour on it. | Mostly agent. `GeneralistBackdrop.tsx` is **60 lines** of SVG pattern and it is the honest template: 28px rules plus three column rules plus three ticks, masked out toward the copy. A crypto motif (block grid, ledger chain) is the same shape of work. A human designer would do it better; an agent following that file gets 80% of the effect. |
| a4 | **The rejected eyebrow recipe is what crypto shipped.** | `grep -rho 'section-label' <site>/web/src | wc -l` vs `<Eyebrow`: Property **1 / 139**, generalist **0 / 87**, crypto **12 / 7**, construction-cis **50 / 0**. The kit's own comment at `packages/web-shared/design/primitives/page-blocks.tsx:27-30`: "The older recipe (bold + widest tracking + saturated brand on the text itself) **shouted louder than the heading it was introducing**." `.section-label` is exactly that: a solid brand-filled uppercase chip (`packages/site-styles/prose-standard.css:255`). | Eight solid orange caps chips down crypto's homepage, each competing with the h2 under it. It is the specific mistake the kit was written to stop. | Agent, one afternoon. Swap `<div className="section-label">` for `<Eyebrow>` across crypto (12 sites) and construction-cis (50). construction-cis is the worse offender and is unrated by the owner only because he has not looked. |
| a5 | **`StatsCounter` not adopted.** Property and generalist run an animated count-up strip directly under the hero. crypto's key-figures bar is static text. | `grep -c StatsCounter <site>/web/src/app/page.tsx`: Property 2, generalist 2, crypto 0. Component exists at `packages/web-shared/design/marketing/StatsCounter.tsx`. | The first motion a visitor sees. Its absence is not noticed; its presence is what "feels built". | Agent, one hour. crypto already has four key figures with sources; feed them to the kit component. |
| a6 | **Motion layer absent.** Property's `globals.css` is **832 lines** with ten keyframe systems (`hero-reveal`, `logo-draw`, `marquee-y`, `num-glow`, `card-glow`, `story-numeral`, `penalty-ladder-rail`, `rate-wedge-fill`, `live-pulse-ring`, `eyebrow-rule`) plus `tw-animate-css`. generalist's is 327. **crypto's is 117**, with one (`eyebrow-rule`, and even that was dead until the gap-fix wave). | `wc -l <site>/web/src/app/globals.css`; `grep -n "^@keyframes" Property/web/src/app/globals.css` | Cumulative. Each is small; together they are most of the "someone cared" impression. | Partly agent (adopt `globals-standard.css` or declare the handful crypto's components would use), partly a judgement call. Note the port's own recorded reason for declining: importing `globals-standard.css` "drags in Property's emerald and cream... on a sibling site that import was banned for exactly that reason and left 64 pages with invisible marks" (`crypto/web/src/app/globals.css:82-95`). That reasoning was correct at the time; it is not a reason to ship zero motion. |
| a7 | **Zero border radius on the homepage.** | `grep -o 'rounded-[a-z0-9]*' <site>/web/src/app/page.tsx | wc -l`: Property 10, charities 11, contractors-ir35 11, construction-cis 10, Solicitors 9, Medical 7, generalist 6, Dentists 6, **crypto 0**. Site-wide crypto is not square (74 occurrences across 39 tsx files), so this is a homepage-only divergence. | Square-everything is a legitimate design language, but it is not this estate's, and it is applied on exactly the page the owner judges. | Falls out of a2 for free. |
| a8 | **Marketing components untouched.** crypto uses one (`WhatToExpectCard`, once). generalist uses `LeadCTAPanel` 24x, `FaqSection` 12x, `DrawnTickList` 5x, `ProcessTimeline` 3x, `CoverageCards` 3x, `PromptMarquee` 2x, `NumberedReasons` 2x, `ScrollGlowGroup`, `StatsCounter`. | the grep in §1 | crypto's homepage renders its FAQ as raw `<details>` with a hand-drawn plus-sign SVG (`page.tsx:695-715`) where the kit ships an accordion. Every such substitution is a small step down. | Agent, one to two days for the full sweep. Highest-value first: `LeadCTAPanel`, `FaqSection`, `Eyebrow`. |

**One false-positive I checked and cleared:** section padding and container widths are identical
across all three sites (`py-12 sm:py-16 lg:py-20`, `max-w-6xl px-4 sm:px-6 lg:px-8`). Density and
rhythm are **not** the gap. crypto's `sectionY`/`sectionYLoose` constants are actually looser than
Property's (`py-16 sm:py-20 lg:py-28` vs `py-12 sm:py-16 md:py-20`), though neither homepage uses them.

---

## 6. Bucket (b): genuinely bespoke, cannot be ported mechanically

| # | What | Evidence | Honest cost |
|---|---|---|---|
| b1 | **Property's 47 niche components.** `AgencyBooks`, `PenaltyLadder`, `RateWedge`, `Section24Wedge`, `RentalProfitStack`, `SchemeFlow`, `TaxYearGap`, `IncorporationReliefGates`, `DisposalFigures`, `LocationMap`... | `ls Property/web/src/components/property/` = 47 files. Consumer count derived by grepping each basename outside `components/`: 13 have exactly one call site, 12 have zero (`WhyUsList`, `TestimonialSlider`, `StatsBar`, `ServiceTiers`, `ServiceIconGrid`, `ROIMetrics`, `ProblemSolutionSplit`, `LocationChips`, `EyebrowRule`, `CalculatorPreviewGrid`, `BrandWordmarkHomeLink`, `BrandLogoHero`). | These are (c) in the brief's taxonomy: bespoke to property tax. A "Section 24 wedge" has no crypto analogue. **But note the 12 dead components: Property's own count is inflated, and the 13 single-use ones are per-page illustrations, not a system.** Building crypto equivalents is a per-niche art brief, a designer plus a content pass. Do not start here. |
| b2 | **Per-niche hero motif.** See a3. The *mechanism* is portable (a masked SVG pattern in a fixed viewBox); the *motif* is a design decision. | `GeneralistBackdrop.tsx` header comment states the host contract explicitly: "same as Property's HeroBrickBackdrop". | An agent can ship a competent geometric motif from the generalist template. A designer would give crypto something with meaning. Worth a designer's half-day across the remaining sites, not per site. |
| b3 | **Brand palette.** crypto's navy-plus-burnt-orange was derived under contrast constraints and is documented at length in `crypto/web/src/app/globals.css:15-79`, including the `--focus-ring: #b86c42` choice measured against five grounds. | that file | Leave it. The reasoning is sound and it is not the gap (see §3). |

---

## 7. Bucket (c): reads as design, is actually content or IA

| # | What | Evidence |
|---|---|---|
| c1 | **Empty category indexes.** Four of crypto's six blog categories have two posts or fewer; one has one. | §2 |
| c2 | **The blog band shows nothing.** crypto closes with centred text and two buttons where Property and generalist list five real posts with category rails. | `crypto/web/src/app/page.tsx:764-791` vs `Property/web/src/app/page.tsx:364-418` |
| c3 | **Dense-text dark band.** crypto's flagship lane is ~200 words plus four sub-panels on navy. | `crypto/web/src/app/page.tsx:386-461` |
| c4 | **Copy shape is NOT the gap, and the brief's premise is wrong here.** crypto's headings are the *most* specific of the three: "Six holder types, each with a different tax picture.", "The four errors most DIY crypto returns contain.", "A generalist handles your bookkeeping. We handle the parts of crypto tax that need specialist knowledge." Property's include the plain "Common questions" and Eyebrow "Our services". crypto's one weak heading is `<h2>Services</h2>` at `page.tsx:490`. | `grep -n '<h2' <site>/web/src/app/page.tsx` and reading the strings |

---

## 8. What the port RULES prevented, fairly stated

`DESIGN_PORT_PLAYBOOK.md` §0: "It is **not** a content programme, an IA change, or a rewrite.
Content, URLs and forms stay unless the owner says otherwise."

That constraint fully explains bucket (c) and nothing else. c1 and c2 are content decisions the
port was right not to take. **It explains none of bucket (a).** Phase 1's own scope line reads
"Header, footer, shell, tokens, **backdrop/motif**", and phase 5 is described as "Homepage,
pillars, locations. The big one. **Homepage is a 15-16 section rebuild**". A homepage rebuild and
a backdrop were both in scope, were both delivered on generalist, and were not delivered on crypto.

**So the method is not working as designed on the fast ports.** The brief is not what needs
changing; the *execution gate* is. The playbook has no check that asks "did this site adopt the
kit, or reimplement it?" Every existing gate is a contrast, overflow, link-floor or claims gate.
A site can pass all of them, as crypto did, while sharing almost nothing with the standard it
was ported to.

---

## 9. Known defects that read as cheap, separate from taste

From `docs/crypto/_port/R1_DESIGN_REVIEW.md` and `docs/crypto/STATE.md`, still open at `f9a96c30`:

1. **Homepage runs a `neutral` type and border ramp on a now-`slate` ground** (STATE item 10),
   same on `/about`, `/contact`, `/research`. Logged as "drift, not a defect" and deferred to the
   owner. This is exactly the inconsistency a non-technical eye reads as sloppy. **It should be
   closed, and it falls out of a2 for free.**
2. **Kit footer wordmark focuses at 2.52 on the footer ground**, under the 3.0 graphic floor, on
   every page (R1 D9). Deferred because the fix is in a file shared with Property, so it is an
   owner decision under trap 12.
3. **Header CTA cascade race** (R1 D6): `min-h-12 min-w-[10rem]` from `btnPrimary` beats the
   header's `min-h-10 min-w-0`, live on all 53 pages. Estate-wide, same class as the shared header
   defect in memory.
4. **Heading level skipped h1 to h3 on 11 pages** (R1 D7): `/blog`, six category pages, four
   calculator pages.
5. **Three interaction states never measured** (R1's server died mid-review): mobile drawer open,
   calculator warn branch, booking day strip. Flagged for the owner walk.

R1 D4 (three off-white grounds) and D5 (dark into dark) were fixed in the gap-fix wave;
verification is recorded in `V1_GAPFIX_VERIFICATION.md` Run C.

---

## 10. If the owner wants crypto to feel like generalist, here is the cheapest path

Ranked by impact per unit of effort. Steps 1 to 4 need no designer.

| order | action | effort | who |
|---|---|---|---|
| 1 | **Add a webfont.** Geist, wired exactly as generalist. | 10 min | agent |
| 2 | **Re-export the kit `layout-utils`.** Kills the square/medium-weight buttons and closes STATE item 10 and part of R1 D6 in the same move. Tokens already declared. | 1 hr | agent |
| 3 | **Swap `.section-label` for `<Eyebrow>`** on crypto (12) and construction-cis (50). | half day | agent |
| 4 | **Adopt `StatsCounter`, `LeadCTAPanel`, `FaqSection`** on the homepage and contact surfaces. | 1 day | agent |
| 5 | **Build `CryptoBackdrop`** from `GeneralistBackdrop.tsx`'s 60-line template. | half day agent, or half a designer-day for something with meaning | agent gets 80%, designer gets the rest |
| 6 | **Fill the blog band** with five real posts, and decide what to do about one-post categories. | content call, owner gate | owner |
| 7 | Per-niche illustrative components in Property's `components/property/` style. | weeks, per niche | **needs a designer.** Do not attempt mechanically. Property's own set is 47 files of which 12 are dead. |

**Add one gate to the playbook**, because this will recur on the eight remaining sites:

> Phase 6 does not close until the site's `layout-utils.ts` re-exports the kit's, the
> homepage `<Eyebrow>` count exceeds its `section-label` count, and a `Backdrop` component
> exists. Report the four-marker grep from §1 as a phase-6 verification row.

construction-cis (0 kit components, 50 `section-label`, 0 `<Eyebrow>`) and charities and
contractors-ir35 (both 0 on all four markers) will read the same way crypto does when the
owner looks at them. Fix the gate before the next port, not after.

---

## 11. What I could not measure without a browser

- Rendered whitespace, actual line lengths, and optical density. Everything in §5 is derived
  from class strings, which is sound for comparison but not for absolute judgement.
- Whether the `animate-ping` dot and count-up actually fire on generalist in production
  (source says yes; nobody has watched it).
- The three interaction states R1 could not reach: mobile drawer open, calculator warn branch,
  booking day strip.
- Perceived weight of crypto's dark bands. §3 counts them and measures the hexes; it does not
  measure how heavy they feel at 1440.
- Font loading behaviour and any FOUT, which affects first impression directly.

## 12. False premises found, numbered

1. **"The gap is bespoke art direction versus mechanical porting."** Falsified by the control
   case. generalist is mechanically ported and clears the bar. The variable is kit adoption.
2. **"Corpus depth is the leading cause."** Falsified at the homepage: crypto's homepage has
   more sections (13 vs ~11), more h2s (11 vs 7), more source lines (793 vs 471) and fuller
   grids than generalist's. Corpus depth is real on category indexes only.
3. **"crypto is a simpler version."** It is not simpler. It is *different*: original work of
   comparable volume that shares almost nothing with the standard. That is worse than simpler,
   because it cannot be improved by turning a dial.
4. **"A section headed 'Our services' looks worse than one that makes a claim."** True as a
   rule, but backwards here. crypto's headings are the most specific of the three; Property
   ships "Common questions" and an "Our services" eyebrow.
5. **"Density and rhythm."** No difference. Section padding and container widths are identical
   across Property, generalist and crypto.
6. **"Brand palette weight."** No difference. Both crypto and Property run three dark bands on
   the homepage at effectively the same ground (`#0e1a3a` vs `#0f172b`).
7. **"crypto finished today, the freshest and smallest."** Freshest yes; smallest port by
   source diff is **charities** (10 files, 204 insertions), not crypto (37 / 1,727).
8. **"Property's bespoke components are the wow."** Partly, but 12 of the 47 have zero call
   sites and 13 have exactly one. Property's component library is less of a system than its
   file count suggests.
9. **The port method "is working as designed."** Not on the fast ports. A backdrop and a
   homepage rebuild were both inside phase 1 and phase 5 scope, were delivered on generalist,
   and were not delivered on crypto. The constraint in §0 does not cover the miss.
