# DENTISTS PORT — PHASE 4, 5, 6 SCOPING PLAN

Sizing and sequencing, deliberately lighter than a file-by-file spec. Built on
`DISPOSITION_SLICE2.md`, `DISPOSITION_SLICE3.md`, `FUNNEL_BASELINE.md`, `LIVE_DEFECTS.md`,
`docs/dentists/DESIGN_DELTA.md`, playbook §2/§6/§14 and `PORT_FIELD_NOTES.md`.

Written 2026-09-11. READ-ONLY pass: no application code was changed, nothing was built, no git
write command was run. Every count below was re-derived in this session unless labelled
ESTIMATE or attributed to a source document.

Working tree at survey time: `git status --porcelain Dentists/` is EMPTY. Latest Dentists work
is `f1197d7a feat(dentists): phase 1 brand layer + locked-rule content remediation`, and the
phase-1 gap-fix that a sibling swept into `f75438bf` (field notes §8). Production SHA for the
link floor remains `18b4f25f`.

---

## 0. THE HEADLINE, BEFORE THE DETAIL

**The playbook's default weighting is wrong for this site, and it is wrong in a specific,
correctable way.** The phase map calls phase 5 "the big one" because the homepage is a 15-16
section rebuild. On Dentists the homepage drew **17 sessions in 19 days out of 450**, produced
**zero form starts and zero CTA clicks of any kind**, and both of its CTA ids have never fired
in 92 days of recorded evidence. Meanwhile `/contact` drew **6 sessions and produced 2 of the
site's 2 leads**, and blog articles drew **374 sessions and 24 of the 30 form starts**.

This is the Trade shape exactly (field notes §7: homepage 4 sessions in 19 days against the
blog's 110). The rebuild still happens, because the standard requires it and it is the brand's
front door, but **review depth is set by traffic, not by the phase map**.

Where the review money goes on Dentists, in order:

| Rank | Surface | Phase | Why |
|---|---|---|---|
| 1 | `LeadForm.tsx` (448 lines) and the in-article capture path | **6** (restyle) | The site's entire leak is start-to-complete: 6.9% against Property's 17.9%. Every completion on the site came through this component. |
| 2 | `/contact` (71 lines) | **6** | 6 sessions, 2 leads, 100% of the site's conversions. Highest value per session on the site by an order of magnitude. |
| 3 | `/calculators/*` (13 pages, 38 sessions) | **4** | Not for lift, for REGRESSION. Dentists converts calc-viewer to calc-user at 20.6% against Property's 13.3%. This is the one thing the site does better than the reference. A phase-4 rebuild can only damage it. |
| 4 | The four `/for-*` pillars + `/services/[slug]` | **5** | Almost no traffic, but 165 inbound content links between them and 5 pages missing from the sitemap. Crawl value, not session value. |
| 5 | Homepage | **5** | 17 sessions. Rebuild to standard, review for correctness and crawl paths, not for conversion. |

**And the second field note applies here too.** "No capture on this family" is false on Dentists:
blog articles produced 24 form starts. The capture is there and people are starting it. Nobody
should propose adding a lead surface to the blog family; the question is why 24 starts produced
0 completions, and that question is answered in `LeadForm.tsx`, not in a design phase.

---

## 1. SIZE ESTIMATES PER PHASE

Work package = one builder-agent's brief. Playbook §3 caps this at 3-6 packages per phase and
one package per builder. Confidence is mine, and it is about the SIZE, not about whether the
work is right.

### Phase 4 — calculators

| WP | Scope | Files | Lines | Model | Notes |
|---|---|---|---|---|---|
| 4.1 | `/calculators/[slug]` template restyle | 1 | 172 | Opus | Carries the white-on-gold WCAG fix ×13 pages and the `data-cta` attribute completion |
| 4.2 | `/calculators` index restyle + closing panel | 1 | 101 | Opus | Two-tier decision lives here, see §2 |
| 4.3 | `/embed/[slug]` + `/embed` chrome bypass verification | 2 | 111 | Sonnet | Delivered by phase 1's `PageShell`; this WP only PROVES it. Fold into 4.1 if agent budget is tight |
| 4.4 | 5 dead calculator routes, 20 hrefs, 16 content files | 16 | — | Sonnet | Mechanical slug remap. See §7 |
| 4.5 | Re-verify every rate in 13 tool configs + 15 compute modules against `house_positions.md` | 28 | 4,206 | **Opus** | Not design work. The largest single unknown in the phase |
| 4.6 | `CalcResultCta` convergence | 2 | 55 | Sonnet | Both copies are live, see §2 |

**Size: 6 work packages, 4-5 builder-agents** (4.3 folds into 4.1, 4.6 folds into 4.2).
**Confidence: HIGH on 4.1-4.4 and 4.6, LOW on 4.5.** 4.5 is 4,206 lines of tax logic to be read
against a 513-line ground-truth file by an Opus agent. It could be a half-day or it could be
three packages. It is the item most likely to blow this phase's estimate, and it is also the
item most likely to be quietly skipped because it does not look like design work. Price it
separately and do not let it ride inside 4.1.

### Phase 5 — homepage, pillars, locations, services

The brief assigns `/services` and its 5 children to phase 5. **SLICE2 assigned `/services/[slug]`
to phase 3a and SLICE3 assigned the `/services` index to phase 3b.** That is a real conflict
between the brief and the disposition slices, it is worth about 1,161 lines of work, and it needs
one word from the orchestrator. I size them in phase 5 below, as the brief instructs, and flag
the conflict in §9.

| WP | Scope | Files | Lines | Model | Notes |
|---|---|---|---|---|---|
| 5.1 | Homepage rebuild to the 15-16 section standard | 1 | 677 | **Opus** | Section-by-section map in §3 |
| 5.2 | `AudienceStageLayout` restyle + copy fixes in the 4 `for-*` data files | 5 | 791 | Opus | One component edit covers 4 pages. Cheapest pillar port in the estate |
| 5.3 | `/locations/[slug]` + `/locations` index + `CTASection` retirement | 3 (+2 call sites) | 340 | Opus | `CTASection` is imported by `locations/[slug]`, `locations/page.tsx:65` and `about/page.tsx:74`; the third is a phase-6 file, so this WP crosses a phase boundary. See §6 |
| 5.4 | `/services` index | 1 | 400 | Opus | 3 turnaround promises; links to ZERO of its 5 children (verified) |
| 5.5 | `/services/[slug]` template + `data.ts` | 2 | 761 | Opus | 5 pages, 1 turnaround promise ×5, 136 inbound links, absent from the sitemap |
| 5.6 | `TestimonialSlider` provenance check, then restyle or omit | 1 | 114 | Opus | Gate 9. If the quotes were invented the band is omitted, never fabricated |

**Size: 6 work packages, 5-6 builder-agents. Confidence: MEDIUM-HIGH.** The homepage is the
only genuine unknown, and its unknown is copy, not structure: 6 of the 32 live defects in
`LIVE_DEFECTS.md` are homepage copy lines that must be rewritten rather than restyled (defects
7, 10, 12, plus the two turnaround promises at `:544` and `:573` and the em-dash count of 12).

`/locations` is smaller than it looks: **zero `text-[var(--gold)]` instances in either locations
file**, against SLICE3's expectation of a standard gold sweep. Verified.

### Phase 6 — contact, post-submit, about, research, magnets, legal, interruptive, retirements

| WP | Scope | Files | Lines | Model | Notes |
|---|---|---|---|---|---|
| 6.1 | `/contact` + `LeadForm` + `InlineMiniLeadForm` restyle | 3 | 544 | **Opus, deepest review on the port** | Consent wording is NEVER touched (T19). Rank-1 and rank-2 surfaces from §0 |
| 6.2 | Post-submit: `/thank-you`, `/complete`, `/book` | 3 | 366 | Opus | Branch logic and `isSafeReturnPath` preserved exactly |
| 6.3 | `/about` + `/research` index + 4 research pages | 6 | **1,728** | Opus | **The real size surprise, see below** |
| 6.4 | `/free-practice-health-check` + `Wizard.tsx` | 2 | 1,140 | Opus | Restyle the shell and the steps. Change no step, no field, no branch |
| 6.5 | Legal: privacy, terms, cookie + the 4 cookie-policy defects | 3 | 561 | Opus | Compliance copy checked against code that runs (T18) |
| 6.6 | Error surfaces + OG image routes | 5 | ~250 | Sonnet | `global-error.tsx` (90 lines) renders outside the shell and needs inline styling |
| 6.7 | Interruptive restyle: `StickyCTA`, `DeepScrollModal`, `ReturningBar`, `NextStepOffer`, `SpecialistWidget`, `ResultGateModal` | 6 | 1,134 | Opus | **RESTYLE ONLY.** See §5 for the exact line |
| 6.8 | Retirements, after the owner's word | varies | — | Sonnet | See §4 |

**Size: 8 work packages, 6-7 builder-agents. Confidence: MEDIUM.**

**The size surprise, and it is a correction to SLICE3.** SLICE3 §A records the four `/research/*`
pages as "62-232 each". They are **391, 393, 407 and 419 lines**, 1,610 lines for the four, plus
118 for the index. Re-derived this session with `wc -l`. That single row is a ~1,400-line
underestimate and it lands in the phase that was already the largest by file count.

**Phase 6 is the biggest phase on this site, not phase 5.** By raw volume: phase 4 ≈ 4,645
lines, phase 5 ≈ 3,083 lines, phase 6 ≈ **5,723 lines**. And phase 6 owns rank-1 and rank-2 from
§0, every interruptive surface, and every route retirement.

---

## 2. PHASE 4 — THE CALCULATORS, IN DETAIL

### 2.1 What the capture gate IS on this site, and where it renders

Re-derived, because the brief's framing ("capture gate" as a thing phase 4 introduces) is not
what is on disk.

**A capture gate already exists and is live.** `src/components/tools/premium/ResultGateModal.tsx`
(150 lines) is rendered by `PremiumCalculator.tsx:676-677`, which is rendered by
`PremiumUpgrade.tsx:109`, which is rendered by `BlogPostRenderer.tsx:236`. So:

- It renders **in blog articles only**, and only for the 7 mapped topics in
  `lib/tools/premium/resources.ts`.
- It renders **desktop only** (`hidden sm:block`; phones get `MobileToolSlot` instead) and
  **client only** (`dynamic(..., { ssr: false })`), so no server-rendered crawl will ever see it.
- It is **placement-gated in code**: `PremiumCalculator.tsx:500` `const gated = placement ===
  "blog" && !isConverted()`. Calculator pages and embeds are structurally ungated today.
- It is capped at **one per session** (`gateModalShownThisSession`, `:43-44`) and every dismiss
  path reveals the result.
- It is **live in the data**: `result_gate_skip` fired 34 times in 90 days, 19 in 30. It is the
  site's second-busiest instrumented interaction.

**The 13 public calculators at `/calculators/[slug]` are NOT gated.** They render
`CalculatorClient variant="page"`, which wraps the shared `Calculator` and injects a
`CalcResultCta` into the result slot. The visitor sees the figure immediately.

### 2.2 Gating a public calculator result IS a capture-surface change, and it IS an owner gate

**Stated explicitly, as the brief requires: YES.** Today a visitor to
`/calculators/uda-value` types their numbers and sees the answer with nothing asked of them.
Under Property's pattern (`Property/web/src/components/calculators/ResultGate.tsx`) the answer
is held behind frosted glass until they press "See my result", which opens a modal asking for
their details before revealing it. That changes what a visitor must give to see something they
see free today. It is a capture-surface change under playbook §1 and it requires the owner's
approval before a line is written.

It is **also** an interruptive-surface addition, because the reveal step opens a modal. The
fact that the visitor's own click triggers it does not exempt it: the modal intercepts a result
they currently get for free. Treat it as needing approval on both counts.

**`docs/dentists/DESIGN_DELTA.md:129` says "Capture-surface scope: No new lead surface proposed,
so no gate needed". That is inconsistent with `DISPOSITION_SLICE2.md` §H items 6 and 7, which
propose exactly two new capture surfaces.** One of the two documents is wrong and the
orchestrator has to settle which before phase 4 briefs go out. My reading: SLICE2 is the later
and more specific document, the DELTA row was written before SLICE2 existed, and the correct
state is "two capture-surface gates OPEN, not yet asked".

**My recommendation on the gate itself: do NOT adopt it in this port.** Reasoning, in the site's
own numbers rather than by analogy to Property. The 13 calculator routes drew 38 sessions and 4
form starts in 19 days. The upside is small and slow. The downside is that Dentists converts
calc-viewers into calc-users at **1.55x Property's rate**, which is the single metric where this
site beats the reference, and a gate is the intervention most likely to damage it. If the owner
wants the gate, take it as a separate, isolated change after the port, so its effect is
attributable (standard terms §2, isolate variables).

### 2.3 The T7 exposure, named precisely

Playbook T7: a sibling's phase-4 fix pass gated one page and left the same component ungated in
the tab strip on the two highest-traffic surfaces. **Where that can happen on Dentists:**

`CalculatorClient` is imported by exactly two call sites today:
`app/calculators/[slug]/page.tsx:96` (`variant="page"`) and `app/embed/[slug]/page.tsx:32`
(`variant="embed"`). If the `#calculators` tab strip proposed for the homepage in SLICE3 §B.4
follows Property's pattern, it adds a **third** call site: Property's `CalculatorTabs.tsx:57-60`
renders registry tools through a dynamically imported `CalculatorClient`.

So the failure mode is concrete: **a builder adds the gate in
`app/calculators/[slug]/page.tsx` instead of inside `CalculatorClient.tsx`, and the homepage
tab strip and the 13 embed widgets then behave differently from the 13 calculator pages.**

The rule that prevents it, and it belongs in the builder brief verbatim: **the gate goes inside
`CalculatorClient.tsx`, keyed off `variant`, never in a page file.** Property does exactly this
(`enabled={variant !== "embed"}` on every one of its five bespoke calculators). Acceptance test:
grep for the gate component and assert exactly one import site.

Second T7 exposure, already live and already a divergence:
**`components/calculators/CalcResultCta.tsx` (28 lines) and `components/tools/CalcResultCta.tsx`
(27 lines) are BOTH imported.** SLICE2 §E.4 and SLICE3 §H both say to establish which is
imported and delete the other. Verified this session: `components/calculators/` is imported by
`CalculatorClient.tsx:16` (the public calculator pages), `components/tools/` is imported by
`PremiumCalculator.tsx:37` (the in-blog premium islands). **Neither is dead. SLICE2's "RETIRE
one" premise is FALSE.** They have already diverged in three ways: different heading, different
blurb, different surface token (`--surface` vs `--surface-elevated`), and only one of them uses
the `calculatorMessagePrefix` helper for the lead message. Converge them into one component with
props, or accept the fork deliberately and document why.

### 2.4 The premium tools have no routes. Do not list them.

Verified: `src/lib/tools/premium/registry.ts` exports `PREMIUM_TOOLS` with **6** entries
(`associate-take-home-premium`, `associate-incorporation-premium`, `principal-extraction-premium`,
`practice-purchase-premium`, `practice-sale-premium`, `uda-nhs-premium`). Its own header comment
says it "does NOT affect the indexable calculator pages, gallery, sitemap or embeds". Its only
non-test consumer is `PremiumUpgrade.tsx:28`. There is no `app/` route for any of them.

**A "two-tier index" on `/calculators` that lists free and premium tools would emit 6 dead
links.** Solicitors nearly shipped 5 of exactly this shape (field notes §4). The brief itself
flags it and it is right to.

What a two-tier index CAN legitimately be, without inventing routes: tier 1 = the 13 registry
tools with their real hrefs; tier 2 = a section that links to the **blog articles** where the
premium islands render, so the crawl path to them is an article URL that exists. That is a
content decision, cheap, and it is the only version I would build.

### 2.5 Live defects phase 4 inherits

| Defect | Scale | Source |
|---|---|---|
| `bg-[var(--gold)] ... text-white` closing CTA = **2.75:1**, a WCAG failure | 13 pages | SLICE2 §E.1, DESIGN_DELTA §2 |
| `calculator-page-cta` carries no `data-cta-placement` and no `data-cta-variant` | 13 pages | FUNNEL_BASELINE §A row 8 |
| 5 calculator routes that do not exist, 20 hrefs, 16 content files, **hard 404s** | see §7 | re-derived this session |
| `/calculators` index has no capture surface and no closing panel | 1 page | SLICE2 §E.2 |
| Gold-as-text in phase-4 files | 13 lines across 9 files | re-derived this session |
| 13 tool configs + 15 compute modules unverified against house positions | 4,206 lines | SLICE2 §G |

---

## 3. PHASE 5 — THE HOMEPAGE, MAPPED

### 3.1 Property's homepage section order, as the target

Re-derived from `Property/web/src/app/page.tsx` (537 lines) this session. Line anchors verified.

| # | Property section | Line |
|---|---|---|
| 0 | `<StickyCTA />` as an early child | :227 |
| 1 | Hero, `bg-slate-900` + `HeroBrickBackdrop` | :239-278 |
| 2 | Trust strip, white, bordered | :279-291 |
| 3 | `<WhoWeAreSection />` | :289 |
| 4 | `<WhyChooseUsSection />` | :292 |
| 5 | Focus band, `bg-sky-50/60` | :295-324 |
| 6 | `<WhatWeCoverSection />` | :325 |
| 7 | `<section id="calculators">` + `<CalculatorTabs />` + "See all N calculators" | :328-359 |
| 8 | `<TestimonialsSection />` | :361 |
| 9 | Blog teaser, `bg-slate-50` | :364-419 |
| 10 | `<section id="book">` closing panel, dark, `scroll-mt-24` | :420-516 |
| 11 | FAQ, white | :517-536 |

### 3.2 Dentists' 15 sections mapped onto it

| Dentists today | Line | Maps to | Disposition |
|---|---|---|---|
| JSON-LD block | :244-252 | — | KEEP, already conforming |
| `.hero-brand` navy hero, `BrandLogoHero` + 2 CTAs | :253-290 | P1 | Rebuild on `DentistsBackdrop`. `BrandLogoHero` retires |
| Proof strip | :291-298 | P2 | Restyle |
| Band on `--background` | :299-318 | P3 | Restyle as the who-we-are band |
| `TestimonialSlider` band | :319-330 | P8 | **MOVES DOWN.** Gate 9 first: real quotes or omit |
| Band | :331-373 | P4 | Restyle |
| Band | :374-394 | P5 | Restyle |
| Band | :395-411 | P6 | Restyle |
| Band | :412-430 | P6 | Merge with the above or keep as a second cover band |
| `#how-we-work` `scroll-mt-24` | :431-464 | P5/P6 | Keep the id: it is the hero secondary CTA's target |
| Band ending in a comparison `<table>` | :465-510 | P6 | Table → kit `ComparisonTable`, **mirrored locally** (T12) |
| Closing panel A, packages variant | :510-551 | — | Stays under the branch, unrendered |
| Closing panel B, leadgen variant, the live one | :553-589 | P10 | Becomes `#book`, the site-wide scroll target it does not have today |
| Navy band, `!packagesMode` | :590-641 | P3/P4 | Restyle |
| FAQ, hand-rolled | :642-676 | P11 | Kit `FaqSection`, single array binding (T17) |
| — | — | **P7 NET-NEW** | `#calculators` band. No calculator surface on the homepage today |
| — | — | **P9 NET-NEW** | Latest-insights band: 3 posts + view-all. The homepage links to a 223-post corpus **zero** times today |

Navy adjacency rule stands: the ported footer is navy, so the FAQ band goes last so navy never
touches navy.

### 3.3 The never-fired CTA ids: the trade-off, stated, NOT decided

Twelve of twenty `data-cta` ids have zero recorded clicks in 92 days. Four of them live on
phase-5 surfaces:

| Id | File:line | Why it has never fired |
|---|---|---|
| `hero_primary` | `page.tsx:272` | Unknown. The homepage row agrees from the other side: 17 sessions, 17 page views, **zero CTA clicks of any kind** |
| `hero_secondary` | `page.tsx:281` | Same |
| `home_cta_primary` | `page.tsx:526` | **Explained.** Renders only inside the `packagesMode` branch and the live variant is `leadgen`. Zero is correct |
| `home_cta_secondary` | `page.tsx:535` | Same |
| `cta-section-primary` | `ui/CTASection.tsx:45` | Renders on `/locations/[slug]`, `/locations`, `/about`. Those three drew 4 sessions in 19 days between them |

Also on phase-5 and phase-6 surfaces: `contact_pricing_link` (packages branch, correct zero),
`thankyou-return-article`, `returning_bar`, `returning_bar_close`, and the three JS-only ids
that carry no `data-cta` attribute at all (`result_gate_skip`, `assistant_question`,
`assistant_calculator` — all three LIVE and all three invisible to any attribute diff).

**The trade-off, for the orchestrator, not for a builder:**

- The port is the cheapest moment to fix instrumentation, because we are already inside those
  files and a separate instrumentation pass would be a second full sweep of the same surfaces.
- **Changing an id breaks its history.** `vw_cta_performance` groups by `(site_key, country,
  cta_id, goal)`. A renamed id starts a new series and the old one flatlines, which reads as a
  regression that never happened. This is the T22 shape that already bit two sibling ports.
- The asymmetry that makes this decidable: **an id with zero recorded clicks has no history to
  break.** Renaming `hero_primary` costs nothing because nothing was ever recorded under it.
  Renaming `sticky_cta` (5 clicks, 4 in 30 days) or `deep_scroll_close` (101 clicks) costs real
  continuity.
- The separate, non-optional half: `ctaContactGoal="contact"` and
  `ctaMobilePlacement="header_mobile"` must be passed to the kit `SiteHeader` from the Dentists
  call site. Those are LOCKED in `DESIGN_DELTA.md` §5 and in `FUNNEL_BASELINE.md` §A. They are
  not a style choice and they are not the orchestrator's to revisit.

I am not deciding this. My read, offered as a read: touch ids freely in the never-fired set,
never in the live set, and add `data-cta-placement`/`data-cta-goal` to the JS-only trio only
after reading `autoCapture.ts:106`, because that fallback currently derives placement from the
nearest section heading and adding an explicit attribute will itself split those series.

---

## 4. PHASE 6 — RETIREMENTS

**Deleting a route is an owner gate, every time, even an orphan** (playbook §1, T14). Nothing
below is deleted on a builder's judgement. A separate agent is pulling GSC evidence; the column
below says only WHICH routes need it.

Link counts re-derived this session with `grep -rhoE 'href="/<path>"' src content`, which counts
literal hrefs in source, not rendered occurrences. Where a link sits in a template, the rendered
count is the literal count times the pages that template renders.

| Candidate | Literal inbound links | Rendered on | Unique-link cost of removal, on a real page | In chrome? | Needs GSC? | Recommendation |
|---|---:|---|---|---|---|---|
| `components/blog/ExitIntentModal.tsx` (176) | 0 imports | nothing | **0** | no | **No** — it is a component, not a route | **DELETE.** Already unmounted; only a comment in `PageShell.tsx:4-5` refers to it. The one no-gate item |
| `components/ui/CTASection.tsx` (54) | 3 call sites | `/locations/[slug]` ×2, `/locations`, `/about` | 0 (the CTA links to `/contact`, already in the nav) | no | **No** | **DELETE after** all 3 call sites move to kit `LeadCTAPanel`. Note the call sites straddle phases 5 and 6 |
| `components/ui/Breadcrumb.tsx` (84) | many | most routes | 0 | no | **No** | **DELETE after** migration to kit `primitives/Breadcrumb`. Watch for double `BreadcrumbList` emission |
| One of the two `CalcResultCta.tsx` | — | — | 0 | no | **No** | **DO NOT DELETE EITHER.** Both are imported (§2.3). Converge or document the fork |
| `/book` (58) | **0** | — | 0 | no | **YES** | **KEEP the route, do not link it.** It is the booking destination for nurture email and the Telegram lead-ops flow, which are outside this repo's link graph. `noindex, nofollow`. Deleting it breaks those. The GSC read is a formality but take it |
| `/complete` (128) | **0** | — | 0 | no | No (`noindex, nofollow`) | **KEEP.** Token-gated post-submit top-up, reached by email link. Zero links is correct by design |
| `/thank-you` (180) | **0** literal | — | 0 | no | No (`noindex, follow`) | **KEEP.** Form redirect target |
| `/embed` + `/embed/[slug]` (14 routes) | **0** | — | 0 | no | No (`robots: index:false`) | **KEEP.** Partner distribution surface. The port fixes the chrome leak, it does not retire the surface |
| `/about` (81) | **1**, at `BlogPostRenderer.tsx:317` | **223 blog pages** | **See note** | **no** | **YES** | **KEEP and PROMOTE into the footer Company column.** T14 consequence, and it is the whole point of T14: once `/about` is in the chrome, that byline link adds **zero** unique internal links to an article. Promoting it does not raise the link floor on 223 pages, it only makes the page reachable |
| `/research` index (118) | **0** | — | 0 | no | **YES** | **KEEP and PROMOTE.** Four original data assets with their own JSON APIs, invisible from the chrome |
| `/research/*` ×4 (1,610 lines) | **11** across 4 content files | 4 articles | 11 | no | **YES** | **KEEP.** These are the site's only original data assets |
| `/resources/[topic]` ×6 (166-line template) | **3** (`/resources/associate` ×2, `/resources/principal` ×1); **4 of 6 have zero** | 3 articles | 3 | no | **YES** | **KEEP, and build the missing `/resources` index.** `ls src/app/resources` = `[topic]` only; there is no hub. Largest orphan cluster on the site. Do not delete content that has no hub; give it one |
| `/for-locum-dentists` (134) | **4** | 4 articles | 4 | no | **YES** | **KEEP.** All four `for-*` pillars are absent from the nav. That is an IA question for the owner, not a port decision |
| `/for-associates` / `/for-principals` / `/for-practice-buyers` | **10 / 9 / 6** | content | 10 / 9 / 6 | no | YES, as a set | **KEEP.** 29 inbound links across the four pillars. Nothing here is orphaned enough to discuss deleting |
| `/locations` + 2 city pages | `/locations` is in `footer_links` → chrome, every page; city pages **0** literal | — | 0 for `/locations` (already chrome) | yes (index only) | **YES** for the 2 city pages | **KEEP.** Two cities is thin, but expansion is a content decision |
| The 5 static blog hub files | each is the canonical `/blog/<slug>` | blog index grid | n/a | reachable | **YES** | **KEEP the routes.** SLICE1 §F.5 converges the TEMPLATE while preserving the hand-written prose. No URL changes. Deleting the files without moving the prose loses real content |
| `header_nav_secondary`, `header_mobile_secondary` ids | — | nothing under `leadgen` | 0 | — | No | **RETIRE the ids**, record as orphaned analytics ids in STATE.md. Nothing is lost: nothing was ever recorded |
| `home_cta_primary`, `home_cta_secondary`, `contact_pricing_link` | — | packages branch only | 0 | — | No | **KEEP under the branch.** Not dead code, an unused variant |

**Routes needing a search-traffic read, consolidated for the GSC agent:** `/book`, `/about`,
`/research` and its 4 children, `/resources/[topic]` ×6, the 4 `/for-*` pillars, `/locations`
and its 2 city pages, and the 5 static blog hubs. **21 routes.** None of them is a
delete-recommendation from me; the read is to confirm that keeping them is right and to
prioritise which get promoted into the chrome.

---

## 5. INTERRUPTIVE SURFACES — INVENTORY AND THE RESTYLE/BEHAVIOUR LINE

**The rule, first, because it is absolute.** Any change to an interruptive surface's timing,
trigger, cadence or audience is a hard owner gate, and so is adding one (playbook §1, standard
terms §7). **An in-flow panel at the end of a page is NOT interruptive** and must not be filed
as a gate.

### 5.1 What exists, where it mounts, what fires it

| Component | Lines | Mounted at | Trigger / cadence / audience | Recorded activity, 90d / 30d |
|---|---:|---|---|---|
| `ui/StickyCTA.tsx` | 186 | **`PageShell.tsx:26` → SITE-WIDE** | Appears after ~500px or 25% of page height. Dismiss persists to `sessionStorage` (`dfp_sticky_dismissed`). Suppressed on `/admin`, `/embed`, and for `isConverted()` visitors | `sticky_cta` **5 / 4 — LIVE** |
| `intent/DeepScrollModal.tsx` | 137 | `layout.tsx:99` → site-wide | Deep-scroll topic offer, modal overlay. One per session, sharing a `dfp_modal_shown` cap with `ExitIntentModal`. Not-yet-converted readers only | `deep_scroll_close` **101 / 56**, `deep_scroll_modal` **2 / 1** — the site's busiest surface |
| `intent/ReturningBar.tsx` | 78 | `layout.tsx:98` → site-wide | Bottom bar, returning + not-yet-converted visitors only, topic-aware, dismiss persists for the session (`dfp_returning_bar_dismissed`) | `returning_bar` **0 / 0**, `returning_bar_close` **0 / 0** — NEVER FIRED |
| `tools/premium/ResultGateModal.tsx` | 150 | `PremiumCalculator.tsx:677`, in-blog only | Opens on "See your result", at most once per session, desktop only, never for converted visitors, every dismiss path reveals | `result_gate_skip` **34 / 19 — LIVE**, and it carries **no `data-cta` attribute** |
| `support/SpecialistWidget.tsx` | 536 | `layout.tsx:102` → site-wide | Fixed bottom-right widget | `specialist_widget` **10 / 3**, `assistant_question` **4 / 2**, `assistant_calculator` **1 / 1** — LIVE |
| `intent/NextStepOffer.tsx` | 47 | `BlogPostRenderer.tsx:323` | End-of-article in-flow offer | `next_step` **1 / 1** — LIVE |
| `blog/ExitIntentModal.tsx` | 176 | **nowhere** | Unmounted | n/a |

### 5.2 The line, drawn precisely

**RESTYLE ONLY — no gate needed, and a builder must not be allowed to widen it:**
token swaps, the gold-as-text fixes (`DeepScrollModal` 1 line, `NextStepOffer` 1 line), border
radii, typography, focus rings, `aria` corrections, button classes. The component's `useEffect`
blocks, storage keys, thresholds, suppression predicates and `isConverted()` checks are
untouchable. The storage key prefix `dfp` is FROZEN and changing it silently re-shows every
dismissed surface to every returning visitor, which is a cadence change wearing a rename.

**NOT restyle — hard owner gate before a line is written:**

1. **Moving `StickyCTA` from site-wide to homepage-only.** SLICE1 §A.3 proposes exactly this,
   because Property mounts it at `page.tsx:227` and nowhere else. On Dentists it is mounted in
   `PageShell` and therefore renders on every route. **This is an audience change on a LIVE
   surface**: it would remove the bar from the 83% of sessions that land on a blog article, and
   `sticky_cta` is one of only 7 `data-cta` ids on this site that fires at all. Property removed
   it from its blog on 2026-07-09 after a 586-shown / 1-click readout; Dentists has no equivalent
   readout. **Recommendation: keep it site-wide. Ask, do not port the mount point by analogy.**
2. **Adding a result gate to the 13 public calculators** (§2.2). Capture-surface change AND a new
   modal on 13 routes.
3. **Any change to `DeepScrollModal`'s one-per-session cap or its shared `dfp_modal_shown` key.**
   That cap was a wave-2 QA finding. It also has a live experiment history (memory
   `property_behaviour_analytics`): an all-time aggregate once condemned it as dead and the
   post-lock window showed 11% offer acceptance. **Do not remove it on an aggregate read.**
4. **Anything that would make `ReturningBar` fire.** It has never fired in 92 days. That is an
   absence, which is a question, not a finding (standard terms §5). Do not "fix" it into
   appearing more often as a side effect of a restyle; establish first whether its
   returning-visitor predicate is simply rarely true.
5. **`SpecialistWidget`'s trigger, timing or audience.** Restyle the 536 lines, change no
   condition.

**Explicitly NOT interruptive, and not a gate:** the new `LeadCTAPanel` closing panels proposed
for `/calculators`, `/calculators/[slug]`, `/dental-guides`, and the homepage `#book` panel.
These are in-flow panels at the end of a page. They ARE new capture surfaces where none exists
today, which is a different gate (playbook §1 row "Capture-surface scope"), but they are not
modals and must not be filed as interruptive ones.

---

## 6. CROSS-PHASE DEPENDENCY MAP AND RUNNING ORDER

### 6.1 Hard dependencies

```
phase 1 (chrome, tokens, DentistsBackdrop, kit lockup)
  └─> EVERYTHING. Phases 4/5/6 all consume the token layer and the motif hero.
      Already COMMITTED + TAGGED as of f1197d7a. Not a blocker.

phase 2 (blog subsystem)  ──> phase 4, weakly
      BlogPostRenderer mounts PremiumUpgrade -> PremiumCalculator -> ResultGateModal.
      If phase 2 touched that injection, phase 4's gate reasoning changes.

phase 3a/3b (templates, hubs)  ──> phase 5, if /services stays in 3
      SLICE2/3 put /services and /services/[slug] in 3a/3b. The brief puts them in 5.
      Settle this BEFORE either phase starts (see §9 risk 1).

kit primitives (Breadcrumb, FaqSection, LeadCTAPanel, ComparisonTable)
  └─> phases 4, 5 and 6 all migrate to them. The kit is a manager-direct carve-out
      (playbook §3) and a mid-port kit edit changes up to 19 sites. Any kit gap found
      in phase 4 must be mirrored locally, never fixed in the kit.

CTASection retirement  ── straddles phase 5 (locations x2) and phase 6 (about)
      T23 shape: fix every consumer in the same commit, or leave the component
      standing until the last consumer moves. Do NOT delete it in phase 5.

LeadCTAPanel adoption  ── phases 4, 5, 6 all add closing panels
      One owner decision covers all of them. Ask ONCE, bundled (standard terms §1).

owner GSC read (21 routes)  ──> phase 6 retirements ONLY
      Does not block 6.1-6.7. Only WP6.8 waits on it.
```

### 6.2 Recommended running order

**Serial, at the phase level, for one reason only: builds.** Playbook T1 — concurrent builds
corrupt a shared `.next`, and the manager builds serially. Everything below assumes builders
never build and the manager builds between phases.

```
NOW    Settle the /services phase assignment (§9 risk 1). One decision, blocks two phases.
NOW    Bundle and send the owner questions in §8. They gate work in all three phases.

STEP 1   PHASE 4, all six work packages CONCURRENT.
         4.1 / 4.2+4.6 / 4.3 / 4.4 / 4.5 are on disjoint file sets. Verified disjoint:
         4.1 touches only app/calculators/[slug], 4.2 only app/calculators/page.tsx +
         the two CalcResultCta files, 4.3 only app/embed/**, 4.4 only content/blog/*.md,
         4.5 only src/lib/tools/**.
         4.5 is the long pole. Start it FIRST and let it run alongside the others.

STEP 2   PHASE 5 and PHASE 6 can OVERLAP, with two carve-outs.
         5.1 (homepage) / 5.2 (pillars) / 5.3 (locations) / 5.4+5.5 (services) /
         5.6 (testimonials) are disjoint from
         6.2 (post-submit) / 6.3 (about+research) / 6.4 (health check) /
         6.5 (legal) / 6.6 (error+OG).
         CARVE-OUT A: 6.1 (contact + LeadForm) must run ALONE and be reviewed alone.
           It is rank-1 and rank-2 from §0, it touches the component every completion
           on this site passed through, and T19 applies. Do not bury it in a batch.
         CARVE-OUT B: CTASection cannot be deleted until 5.3 AND 6.3 have both landed.
           Whoever goes second deletes it.

STEP 3   PHASE 6 remainder: 6.7 (interruptive restyle) and 6.8 (retirements).
         6.7 runs after everything else in 6, so a token change made late does not
         land on a surface nobody re-reviewed.
         6.8 runs LAST and only after the owner's word on each route.
```

**What must be serial and why, stated plainly:**

| Must be serial | Why |
|---|---|
| Every `next build` | T1, shared `.next` |
| 6.1 against everything else | Highest-value surface on the site; needs an isolated review |
| 6.8 against 6.1-6.7 | A retirement decided before the pages are ported is decided on the wrong page |
| CTASection deletion against its 3 call sites | T23 |
| Any kit edit against everything | Manager-direct, 19 sites |

**What can run concurrently:** everything else. Playwright of the concurrency incident in field
notes §8 applies throughout: stage and commit as ONE command, never as two steps with a check in
between, and after every commit verify what YOU committed with
`git show --name-only --format="" HEAD | grep -c "^Dentists/"`.

---

## 7. THE LEFTOVERS LEDGER

Everything known-but-deferred, attributed to the phase that should own it. A leftover with no
owner is how a port ships a half-swept rule.

### 7.1 Gold-as-text, attributed

**The brief's figure of ~649 gold-as-text instances is NOT REPRODUCIBLE and I believe it is
wrong.** Measured this session in `Dentists/web/src`:

| measure | command | result |
|---|---|---|
| `text-[var(--gold*)]` occurrences | `grep -rnoE 'text-\[var\(--gold[a-z-]*\)\]' src \| wc -l` | **117** |
| + inline `style={{ color: "var(--gold…)" }}` | `grep -rnoE 'color: *"var\(--gold' src \| wc -l` | **7** |
| **gold-as-text total** | sum | **124 occurrences across 40 files** |
| ALL gold class tokens incl. `bg`/`border`/`ring`/`from` | broader regex | 296 |
| all `--gold` references anywhere in `src` | `grep -rn -e '--gold' src \| wc -l` | 277 |
| in `content/**` | `grep -rn 'text-\[var(--gold' content` | **0** |

`DESIGN_DELTA.md` says 152 across 42 files. Mine says 124 across 40. Both are the same order;
649 is not. Someone should reconcile the delta's method before a builder is handed a target
number, because field notes §5 records a builder corrupting two correct figures when handed an
underived dash target. **State the target as a number with its deriving command.**

Attribution of the 124, by owning phase:

| Phase | Files | Gold-as-text lines | Notable |
|---|---|---|---|
| 1 (already done, leftovers) | `ui/Breadcrumb.tsx`, `layout/SiteFooter.tsx` | 2 | Both retire into kit primitives anyway |
| 2 (blog) | `BlogPostRenderer.tsx`, 5 static hubs, `blog/page.tsx`, `blog/[category]/page.tsx` | 10 | — |
| 3a/3b | `dental-guides/page.tsx` 4, `dental-guides/[slug]` 4, `resources/[topic]` 1 | 9 | — |
| **4** | `calculators/page.tsx` 4, `calculators/[slug]` 1, `CalculatorPageResources` 2, 6 premium configs 1 each | **13** | The premium configs store gold classes in DATA, not JSX. A JSX-only sweep misses them |
| **5** | `app/page.tsx` 13, `AudienceStageLayout` 9, `services/page.tsx` 5, `services/[slug]` 5, `TestimonialSlider` 1 | **33** | Locations files have **ZERO**. Verified |
| **6** | 4 research pages 5 each = 20, `research/page.tsx` 1, `free-practice-health-check` 6, `thank-you` 3, `Wizard` 1, `DetailsForm` 1, `ExcelPreview` 3, `NextStepOffer` 1, `DeepScrollModal` 1, `ExitIntentModal` 1 | **38** | Largest share, consistent with phase 6 being the largest phase |

### 7.2 Dead internal links — a correction to LIVE_DEFECTS

`LIVE_DEFECTS.md` §2 reports "**Total: 1 hard 404, 2 soft (one latent)**" and describes the link
floor as enforced. **That is incomplete.** Re-derived this session:

```
grep -rhoE 'href="/calculators/[a-z0-9-]+"' content src | sort | uniq -c
```

| href | occurrences | exists? |
|---|---:|---|
| `/calculators/practice-valuation-calculator` | 8 | **NO** |
| `/calculators/nhs-uda-value-calculator` | 4 | **NO** |
| `/calculators/practice-profit-extraction-calculator` | 3 | **NO** |
| `/calculators/associate-take-home-calculator` | 3 | **NO** |
| `/calculators/locum-cost-benefit-calculator` | 2 | **NO** |
| `/calculators/uda-value` | 1 | yes |
| `/calculators/practice-valuation` | 1 | yes |
| `/calculators/associate-take-home` | 1 | yes |

**20 hrefs to 5 non-existent calculator routes, across 16 content files.** There is no redirect:
`grep -n calculator next.config.ts src/middleware.ts` returns one unrelated blog-slug rule.
`app/calculators/[slug]/page.tsx:12` sets `dynamicParams = false` and `:54` calls `notFound()`.
**These are HARD 404s.** The brief's "6 dead internal links: 5 calculator routes linked from 16
content files, 1 wrong-category blog link" is CORRECT and `LIVE_DEFECTS.md` missed it, because
`scripts/track2_link_audit.py` resolves content links against content frontmatter and the
route-model script covered `src/**` hrefs, not `content/**` hrefs against app routes. Neither
instrument covered this intersection.

**Owner: phase 4, WP4.4.** Fix at the link, never by deleting the link (field notes §6). The
target slugs are in `lib/tools/registry.ts`: the intended destinations are almost certainly
`practice-valuation`, `uda-value`, `principal-extraction`, `associate-take-home` and
`locum-structure`, but each of the 20 must be read in context, not sed-replaced.

### 7.3 `/services/<slug>` absent from the sitemap — CONFIRMED

`src/app/sitemap.ts` emits: 21 static paths, locations, blog categories, all blog posts, all 13
calculators, all dental guides, all published resource topics. `grep -n services src/app/sitemap.ts`
returns exactly one line, `:13 "/services"`. **The 5 `/services/<slug>` pages are not in it**,
despite carrying **136 literal inbound internal links** (`dental-accountants` 44,
`practice-accounting` 25, `practice-valuation` 24, `locum-dentist-tax` 23, `associate-tax` 20)
and each targeting a named GSC query cluster. They are indexable (no `robots` export on the
template), so they are crawlable-but-unsubmitted, not blocked.

**Owner: phase 5, WP5.5** — or phase 3b if the `/services` assignment goes the other way. It is
a 6-line edit to `sitemap.ts` and it is the highest value-per-line item in this whole document.

### 7.4 The rest of the ledger

| Item | Scale | Owning phase | Source |
|---|---|---|---|
| 21 turnaround promises across 18 files | site-wide | **split**: 4.x (none), 5 (`page.tsx` ×2, `services` ×3, `services/[slug]` ×1, `for-*` ×4), 6 (`contact` ×2, `LeadForm:191`, `SpecialistWidget:375`, `ResultGateModal:132`, `faq.ts:31`, `service-tiers.ts:50`) | LIVE_DEFECTS #5 |
| 15 pricing-model claims across 7 files | 15 files total incl. content | 5 (`page.tsx`, `services`, `services/[slug]/data.ts`, 4 `for-*`) | LIVE_DEFECTS #12 |
| Client-count / aggregate-performance claims | 5 | 5 (`page.tsx:439,476`, `for-associates:17,29`, `data.ts:248,285`) | LIVE_DEFECTS #7-11 |
| `prose-dental` defined nowhere → 6 guides render unstyled | 6 pages | **3a**, NOT 4/5/6 | SLICE2 §B.1 |
| `prose prose-slate` no-ops → 6 resource guides unstyled | 6 pages | **3a** | SLICE2 §C.1 |
| Cookie-policy defects 14-17 (wrong GA cookie list, unevidenced IP anonymisation, metadata) | 1 file | **6**, WP6.5 | LIVE_DEFECTS #14-17 |
| 665 anchor targets / 505 in-page links with no scroll offset under a `sticky top-0` header | 42 content files | **2** (the stylesheet fix) + verification in 6 | LIVE_DEFECTS #22 |
| 350 duplicate `id` attributes across 32 content files | 32 files | **2** | LIVE_DEFECTS #23 |
| `PremiumBarChart.tsx:93` `aria-hidden` wrapper hides all chart values | premium islands | **4** (it is a tools component) or 2 (it renders in blog) — assign explicitly | LIVE_DEFECTS #21 |
| `site.ts:8` unguarded `registered_office` read (7 prod `client_error` rows on a sibling) | 1 line | **6**, WP6.6 | LIVE_DEFECTS #28 |
| `components/analytics/GoogleAnalytics.tsx` dead, zero importers | 1 file | **6**, WP6.8 | LIVE_DEFECTS #29 |
| Em-dash in `niche.config.json:19` tagline → the `<title>` of every page | 1 line, widest blast radius on the site | **1 leftover**; fix in whichever phase runs next | LIVE_DEFECTS #30 |
| 48 em-dash lines in `content/dental-guides/*` | 6 files | **3a** | LIVE_DEFECTS §3 |
| 52 em-dash lines in rendered `src` copy, worst `page.tsx` (12), `about` (8) | 13 files | **5** and **6** | LIVE_DEFECTS §3 |
| LEL £6,708 vs £6,500: two house documents contradict each other, 12 live lines follow HP | 2 content files | **NOT A PORT ITEM.** Needs a human to read gov.uk | LIVE_DEFECTS §5.1 |
| `/services/[slug]` vs `/blog/[category]` slug collision on `associate-tax`, `practice-accounting` | 2 pairs | Surfaced by the port, resolved OUTSIDE it. Cannibalisation, not design | SLICE2 §D.3 |
| `/resources` index does not exist; 4 of 6 topic guides have zero inbound links | 6 pages | **6** if the owner says build it; otherwise it stays a leftover | SLICE3 §H |
| `#calculators` and latest-insights bands: the homepage links to the 223-post corpus zero times | 1 page | **5**, WP5.1 | SLICE3 §B.4-5 |
| 3 JS-only `cta_click` ids invisible to any attribute diff | 2 files | **6**, WP6.7; read `autoCapture.ts:106` first | FUNNEL_BASELINE §A |
| Deploy-watch may be hardcoded to `site_key: "eq.property"` | unknown | Pre-deploy check, not a build phase | FUNNEL_BASELINE UNVERIFIED |
| `form_id` vocabulary vs `MINIFORM_FORM_IDS` never pulled | unknown | Pre-deploy check | FUNNEL_BASELINE UNVERIFIED |

---

## 8. THE OWNER QUESTIONS, IN PLAIN ENGLISH

Bundled, because he decides in ten seconds from his phone and a drip of questions is worse than
a list (standard terms §1). Technical detail is in the sections above, not here.

**About what we ask visitors for**

1. **Free calculators: make people give us their email to see the answer?** Right now anyone can
   use our 13 dental calculators and see their number straight away. Our property site holds the
   number back behind a short form, with a "no thanks" link that shows it anyway. We could copy
   that here. **My recommendation: no, not now.** This site is already better than the property
   site at getting people to actually use a calculator, and a gate is the change most likely to
   break that. If you want it, let us do it on its own after the redesign, so we can tell whether
   it helped or hurt.

2. **Add a short enquiry form at the bottom of each calculator page?** Today the bottom of those
   pages just links off to another page. Every other site in the estate ends with a form.
   **Recommendation: yes.** It is at the end of the page, it interrupts nobody, and it costs a
   visitor nothing unless they want it.

3. **Add a short enquiry form at the bottom of the calculator index and the guides index?** Same
   shape, same reasoning. **Recommendation: yes.**

**About the bar that follows people down the page**

4. **Keep the "talk to a specialist" bar on every page, or only on the front page?** Our property
   site shows it only on the homepage. This site shows it everywhere, and it is one of only seven
   buttons on the whole site that anyone actually clicks. 83% of our visitors arrive on an
   article, so moving it to the homepage would hide it from nearly everyone.
   **Recommendation: leave it exactly as it is.** I am only asking because the redesign plan
   proposed copying the property site here and I am not willing to change how we interrupt
   visitors without your word.

**About pages we might remove**

5. **21 pages need a search check before anyone decides anything.** None of them is a
   delete-recommendation from me. The list is the four "for dentists like you" pages, our four
   research reports, six downloadable guides, the booking page, the about page, our two city
   pages and five blog section pages. Most are good pages that are simply not linked from the
   menu, and the fix is to link them, not to delete them. **No decision needed from you today**,
   beyond a yes to running the search check.

6. **Two of those are worth promoting into the site menu now: the About page and the Research
   section.** The about page is linked from all 223 articles but appears in no menu; the four
   research reports are linked from four articles and no menu at all. **Recommendation: put both
   in the footer.**

**Things that are NOT questions, recorded so you know they are handled**

- Removing the "we reply within 24 hours" promises and our fee lists: you already said yes on
  2026-09-11. That is 21 promise lines and 15 pricing lines, and each page gets its own wording.
- The colour decision (navy buttons, gold stays decorative): you already said yes.
- Deploy: never without you asking for it in that moment.

---

## 9. RISKS, WITH MY RECOMMENDED RESOLUTION

| # | Risk | Likelihood | My resolution |
|---|---|---|---|
| 1 | **`/services` is assigned to two different phases.** The brief puts `/services` + 5 children in phase 5; SLICE2 puts `/services/[slug]` in 3a and SLICE3 puts the index in 3b. ~1,161 lines and 6 pages | **Certain, it is already true** | **Move both into phase 5** and amend SLICE2/SLICE3 with a one-line note. Reason: the 5 child pages are marketing surfaces with 136 inbound links targeting GSC clusters, they belong with the pillars, and the sitemap fix (§7.3) should land in the same commit as the template port |
| 2 | **`DESIGN_DELTA.md:129` says no capture-surface gate is needed; SLICE2 §H proposes two.** A builder reading the DELTA will build a new capture surface without the owner's word | High | **Correct the DELTA row to "two gates OPEN"** before any phase-4 brief goes out. Then ask both questions in the §8 bundle |
| 3 | **A builder gates `CalculatorClient` in a page file and misses the embed and tab-strip call sites (T7)** | Medium-high; it is exactly what bit the sibling | **The gate lives in `CalculatorClient.tsx`, keyed off `variant`, never in a page file.** Acceptance test: exactly one import site for the gate component. Put both lines in the brief verbatim |
| 4 | **Phase 4 damages the one metric this site beats Property on** (calc-use per viewer, 1.55x) | Medium | Record calc-use-per-viewer and form-start rate as the pre-cutover numbers to re-read (FUNNEL_BASELINE §B). **Do not credit or blame the design for a lead-count move at n=2**; read it off the 34 and 29 observation metrics |
| 5 | **Phase 5 gets the deep review and phase 6 does not**, because the phase map says phase 5 is the big one | High if nobody says otherwise | This document says otherwise, in §0. **6.1 gets the deepest review on the port** and runs alone |
| 6 | **`LeadForm.tsx` consent wording changes as a side effect of a restyle (T19)** | Medium; it is 448 lines and the consent text sits inside it | **`leadConsentText` is quoted verbatim in the brief as untouchable**, with the 2026-08-24 incident attached (mini-form leads ~10/wk → 3.9/wk, reverted). Acceptance test: diff the consent string, assert byte-identical |
| 7 | **Retiring `CalcResultCta` deletes a live component**, because two documents say to | Medium | **Neither is dead.** §2.3. Corrected here; put the correction in the brief |
| 8 | **A sibling port's repo-wide `git add` sweeps Dentists files again.** It already happened today (`f75438bf`) | Medium; four ports are live in this tree | Field notes §8: stage and commit as ONE command, verify with `git show --name-only --format="" HEAD \| grep -c "^Dentists/"` after every commit, **never rebase or amend to tidy it up** |
| 9 | **The 18 armed `monitored_pages` rows re-baseline at cutover** (16 of them on the blog-article family, the family the port most needs to fix). Last expires 2026-10-07 | Certain on deploy | Owner already took this on 2026-09-11: proceed now, accept the re-baseline, because deploy is separately gated and the reset only lands on deploy day |
| 10 | **A before/after read is taken on Google only.** Bing delivers ~15x Google's clicks on this domain (1,682 vs 109 over 28 days) | Medium | **Any after-reading pulls both feeds** and states both data-through dates. A Google-only read measures the minority channel |
| 11 | **WP4.5 (4,206 lines of tax logic vs house positions) is silently skipped** because it does not look like design work | **High.** It is the least glamorous package in the port | Make it its own work package with its own reviewer and its own acceptance line. It is the only thing standing between the "UK 2026/27 rates" eyebrow on 13 pages and a false statement |
| 12 | **A two-tier calculator index emits 6 dead premium links** | Low now that it is written down, high if it is not | §2.4. Tier 2 links to the ARTICLES that host the premium islands, never to `/calculators/<premium-slug>` |
| 13 | **The gold-as-text target handed to a builder is a number nobody derived** (649 vs 152 vs 124) | Medium | §7.1. Hand each builder its own per-file count with the deriving command, not a site-wide total |
| 14 | **A phase-6 builder "fixes" `ReturningBar` into firing** | Low-medium | It has never fired in 92 days. Absence is a question. Restyle only; investigate the predicate as a separate read |
| 15 | **`global-error.tsx` renders outside the shell and ships unstyled after the token port** | Medium | 90 lines, needs its own inline styling. Named explicitly in WP6.6 so it is not assumed covered by the shell |

---

## 10. WHAT I RE-VERIFIED, AND WHAT I FOUND FALSE

### Verified TRUE this session

| Claim | How |
|---|---|
| 13 routed tools | `registry.ts` lists 13 configs; 13 files in `lib/tools/configs/` |
| 6 premium tools with NO routes | `premium/registry.ts` `PREMIUM_TOOLS` has 6 keys; only non-test consumer is `PremiumUpgrade.tsx:28`; no `app/` route |
| `/services/<slug>` ×5 absent from `sitemap.xml` | `grep -n services src/app/sitemap.ts` → one line, `"/services"` |
| 6 dead internal links: 5 calculator routes from 16 content files | 20 hrefs, 16 files, no redirect, `dynamicParams = false` |
| 12 of 20 `data-cta` ids never fired incl. both heroes, both homepage CTAs, `header-mobile-cta` | FUNNEL_BASELINE §A, source lines re-checked |
| 3 further ids fire from JS with no `data-cta` attribute | `ResultGateModal.tsx:60` tracks manually and the buttons deliberately carry no `data-cta` |
| `app/page.tsx` is 677 lines | `wc -l` |
| Property homepage order, 11 blocks, `StickyCTA` at `:227` | `grep -n` on `Property/web/src/app/page.tsx` (537 lines) |
| Property mounts `StickyCTA` on the homepage ONLY | 2 references in `Property/web/src`, one import one mount, plus a comment recording its 2026-07-09 removal from the blog |
| Dentists mounts `StickyCTA` SITE-WIDE via `PageShell.tsx:26` | grep |
| The result gate is in-blog only, desktop only, once per session | `PremiumCalculator.tsx:500,542-544`; `PremiumUpgrade.tsx:13,60` |
| `/services` index links to zero of its 5 children | `grep -c 'href="/services/' src/app/services/page.tsx` → 0 |
| Nav has no `/services` children, so the kit footer's Services column would render empty | `niche.config.json:30-55` |
| `prose-dental` is defined nowhere | SLICE2 §B.1, consistent with `grep` returning only the class attribute |
| Working tree clean for Dentists; production SHA `18b4f25f` | `git status --porcelain Dentists/` empty |

### Found FALSE, or materially wrong

1. **"~649 gold-as-text instances."** Not reproducible by any measure I could construct. Gold
   carrying text = **124 occurrences across 40 files**; all gold class tokens including
   backgrounds and borders = 296; all `--gold` references anywhere in `src` = 277.
   `DESIGN_DELTA.md` says 152/42. See §7.1.

2. **SLICE2 §E.4 and SLICE3 §H: "one of the two `CalcResultCta.tsx` is unimported, delete it."**
   **Both are imported and both are live**, and they have already diverged in heading, blurb,
   token and lead-message helper. Deleting either would break a live surface.

3. **SLICE3 §A: `/research/*/page.tsx` ×4 are "62-232 each".** They are **391, 393, 407 and 419**.
   A ~1,400-line underestimate in the largest phase.

4. **`LIVE_DEFECTS.md` §2: "Total: 1 hard 404, 2 soft."** There are **21 hard 404 links**: the 1
   wrong-category blog link plus 20 hrefs to 5 non-existent calculator routes across 16 content
   files. Neither of that document's two instruments covered the `content/**` → app-route
   intersection. This is not a criticism of the sweep; it is a gap in the instrument pair, and
   the next site's phase 0 should close it.

5. **`DESIGN_DELTA.md:129`: "Capture-surface scope: No new lead surface proposed, so no gate
   needed."** SLICE2 §H proposes two new capture surfaces (a result gate on the 13 calculators, a
   closing form replacing the link-out) and SLICE3 §J item 13 proposes two more on the homepage.
   The DELTA row is stale.

6. **The brief's framing that phase 4 introduces "the capture gate".** A capture gate already
   exists, is live, and is the site's second-busiest instrumented interaction (34 skips in 90
   days). Phase 4's question is not whether to build one, it is whether to EXTEND it to a
   surface that is free today.

7. **`SLICE3 §D`: "`/locations/[slug]` needs the standard gold sweep."** Both locations files
   contain **zero** `text-[var(--gold)]` instances. The gold work there is nil.

8. **The playbook's "phase 5 is the big one" for this site.** By raw volume phase 6 is larger
   (≈5,723 lines against ≈3,083), and by traffic and conversion value phase 6 owns the top two
   surfaces on the site while the phase-5 homepage drew 17 sessions and zero form starts.

---

## 11. WHAT I COULD NOT VERIFY, AND WHY

| Item | Why not |
|---|---|
| Whether the 12 never-fired `data-cta` ids are unwired or merely unclicked | Needs a click test on a live page. Read-only brief, no dev server (playbook §13 and field notes §5: a mis-bound port made three sibling baselines measure the wrong site) |
| Whether the `#calculators` tab strip would actually add a third `CalculatorClient` call site | Depends on a design decision nobody has taken. I sized the T7 exposure from Property's implementation (`CalculatorTabs.tsx:57-60`), which does exactly that. If Dentists' tabs are built differently, re-check |
| Which of the 20 dead calculator hrefs maps to which real slug | Requires reading each of the 20 in its surrounding sentence. That is WP4.4's job, not a sizing job, and a sed-replace here would be a defect |
| Whether the 13 tool configs' rates are correct | The whole point of WP4.5. 4,206 lines against a 513-line ground truth, and it is judgement work |
| GSC evidence for the 21 routes in §4 | A separate agent owns this. Deliberately not duplicated |
| Rendered-DOM figures of any kind (contrast, em-dash body counts, anchor offsets) | No server started. `DESIGN_DELTA` records that `browser_check.mjs` cannot resolve this site's `var()` colours (T25), so contrast is hand-computed there and inherited here |
| Whether `TestimonialSlider`'s quotes are real | Gate 9. It needs the source of the copy, which is not in the repo |
| Whether `deploy-watch` covers `site_key='dentists'` | Flagged unverified in FUNNEL_BASELINE and still unverified. A pre-deploy check, not a phase |
| Line-exact section boundaries inside `app/page.tsx` | Taken from SLICE3 §B, which surveyed the file. I verified the total (677) and the section count, not each anchor |
