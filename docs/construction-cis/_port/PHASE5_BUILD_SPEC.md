# TRADE DESIGN PORT, PHASE 5 BUILD SPEC

Site: `construction-cis/web` (Trade Tax Specialists). Port FROM: `Property/web`. Shared kit:
`packages/web-shared/design/`.

**Status of this document.** It supersedes `_port/PHASE5_PLAN.md` as the thing a builder executes.
PHASE5_PLAN was written BEFORE `72fe3261` (phases 3 and 4) landed; large parts of it are now done,
and six of its statements are false against the current tree. PHASE5_PLAN remains worth reading for
its reasoning, never for its numbers.

**How this was derived.** Read-only. No file edited, no build run, no server started, no git write.
Every git command path-scoped to `construction-cis/` and `docs/construction-cis/` from the repo
root. `git status --porcelain -- construction-cis/ docs/construction-cis/` returns **empty**: the
tree is clean for this site, so every line number below is the committed truth at `72fe3261`.
Nothing here was measured against a running server (another agent holds port 3167); every figure
that needs a server is labelled as inherited from PHASE5_PLAN's :3261 run and marked NOT RE-VERIFIED.

---

## 0. THE HEADLINE, BEFORE THE DESIGN WORK

> **SECTION 0 IS WITHDRAWN, 2026-09-11. It is wrong and nothing in it should be executed.** It read "A false
> authorship credit is live on all 246 routes, and this port introduced it" and treated the credit as a
> violation of a TAKEN decision. The decision it cites had already been REVERSED by the owner earlier the
> same day: `6966c1f1`, 2026-09-11 **10:42** (`git log -1 --format='%ad%n%B' 6966c1f1`), "the owner wants
> the Double Wired Creative credit estate-wide, not only on the site the studio designed". `72fe3261`
> landed at **18:39** (`git log -1 --format=%ad 72fe3261`), i.e. AFTER the reversal and consistent with
> it. The followed outbound link is accepted estate-wide by that same decision. `DESIGN_DELTA.md:229` and
> `STATE.md` owner-item 5, both quoted below, were corrected in place on 2026-09-11. The text below is
> kept unedited as the record of the error. **Do not delete the credit.**

**A false authorship credit is live on all 246 routes, and this port introduced it.**

`construction-cis/web/src/components/layout/SiteFooter.tsx:147-160` ships:

```
title="Website design and build by Double Wired Creative"
href="https://www.doublewiredcreative.com/"   target="_blank" rel="noopener noreferrer"
```

with the source comment *"Build credit, ported verbatim from Property's SiteFooter"*.

1. It is **false**. That studio designed and built Property. It did not design or build Trade.
2. It **violates a TAKEN owner decision**, recorded at `DESIGN_DELTA.md:229` and repeated in
   `STATE.md` owner-decision 5: *"Trade's footer is LOCAL, so the absence is structural ... Trade
   was not designed by them, so the credit is correctly absent."* The decision was taken on
   2026-09-11 and the code contradicting it was committed the same day.
3. `rel` is `noopener noreferrer`, **not** `nofollow`, so it is a followed outbound link: we are
   passing link equity while publishing a false statement of authorship. Playbook **T27** is the
   trap; the kit-default mechanism it describes is not even the cause here, because the block was
   hand-written into the local footer.
4. Introduced by `72fe3261` (`git log -S 'doublewiredcreative' -- .../SiteFooter.tsx` returns
   exactly that one commit). It was not there before the port.

`SiteFooter.tsx` is Phase 1's file. **Per trap T34, phase ownership does not govern a false
published statement.** Fix it in Phase 5, in WP-E0, as a deletion of lines 147-160. **[WITHDRAWN, see the box at the top of §0.]** Blast radius:
one `<li>` in a flex row with `sm:ml-auto`; the three legal links either side are unaffected.
Revert: restore the block.

---

## 1. REALITY CHECK PER SURFACE

| Surface | What PHASE5_PLAN claims | What is actually true now | Deriving command / file:line |
|---|---|---|---|
| **WP-D0, the fabricated 30% director penalty** | 4 live surfaces + 2 in the calculator tool file, "STILL LIVE" | **DONE. Zero live instances site-wide.** The only hits are a doc-comment in the guard and a test title. Phase 3/4 closed it. | `grep -rn '30% of the tax' construction-cis/web/src` → 1 hit, `src/tests/design/penalty-figures.test.ts:12`, a comment |
| **WP-D0, "Finance Bill 2026"** | 3 live page surfaces | **DONE in the pages. Zero live instances.** One hit remains, and it is the *title string of the guard itself*. | `grep -rn 'Finance Bill 2026' .../src` → 1 hit, `src/tests/assistant-journey-opener.test.ts:706` |
| **TD-07, the wrong-surface guard** | repoint `assistant-journey-opener.test.ts:706-711` at the page's own `faqs` array | **Still mis-pointed** (`faqForTopic("gross-payment-status")`, the registry, at `:700-711`). **But that file is a locked tripwire and may NEVER be modified.** PHASE5_PLAN's instruction to edit it is unexecutable. | `sed -n '700,712p' src/tests/assistant-journey-opener.test.ts` |
| **`house_positions.md` fix** | owner gate 8 | Unchanged, still self-contradicting. Outside any design phase. Owner decision, carried forward. | `STATE.md` owner decisions 1 and 2 |
| **Homepage anatomy** | 15 sections today → 13 after | **Confirmed exactly. 15 `<section>` today**, at `:166, 222, 236, 245, 252, 283, 304, 347, 363, 403, 445, 466, 483, 566, 600`. Every line anchor in PHASE5_PLAN §3 still resolves. | `grep -c '<section' src/app/page.tsx` = 15 |
| **Property's homepage** | 7 `<section>`, 12 F.2 content blocks, 5 of them imports | **Confirmed.** Sections at `239, 279, 295, 328, 364, 420, 517`; imports `ProblemStatement` `:286`, `WhoWeAreSection` `:289`, `WhyChooseUsSection` `:292`, `WhatWeCoverSection` `:325`, `TestimonialsSection` `:361`. | `grep -n '<section\|<Who\|<Why\|<What\|<Problem\|<Testimonials' Property/web/src/app/page.tsx` |
| **The "45 trades twice" duplicate** | already resolved, do not fix | **Confirmed resolved.** `siteStats` = `12 / 7 / 80+ / 45` at `src/config/service-tiers.ts:72-77`, with a derivation comment at `:59-71`. Rendered once, `page.tsx:247`. | `sed -n '59,77p' src/config/service-tiers.ts` |
| **`--accent` glyph sweep, 16 instances** | includes `page.tsx:330`, `cis-refund:198`, `gps:130` as `text-orange-600` failures | **Those three are already fixed** and now read `text-[var(--accent-strong)]`. The real remaining set is **15 instances**, enumerated in §3. | `grep -n 'orange-' src/app/page.tsx src/app/cis-refund/page.tsx src/app/gross-payment-status/page.tsx`; `sed -n '330,332p' src/app/page.tsx` |
| **`TopicHero` cream hero for the 3 pillars** | "`TopicHero` + `Breadcrumb` + `Eyebrow`" in WP-D2 and WP-D3 scope | **`TopicHero` DOES NOT EXIST**, in the kit or locally. The kit has `SlimHero.tsx` and `TopicSection.tsx` under `primitives/` and `marketing/`. A builder given this brief builds nothing or invents a component. | `ls packages/web-shared/design/primitives packages/web-shared/design/marketing` |
| **`.section-label`, 21 Phase-5 consumers** | 7 / 3 / 6 / 5 | **Confirmed exactly**, 21 of 39 site-wide. | `grep -rc 'section-label'` on the four files |
| **`service-tiers.ts` fixed-fee line** | `:38` | **`:35`.** File is 77 lines. | `sed -n '35p' src/config/service-tiers.ts` |
| **TD-18 in scope: "7 lines across 4 files"** | 4 files | **7 lines across 5 files**: `page.tsx:214,355,532`, `services/page.tsx:176`, `cis-refund:231`, `gps:241`, `service-tiers.ts:35`. | `grep -rni 'fixed fee\|fixed-fee\|fixed fees' src` |
| **The dormant price list's pound signs are mojibake `Â£`, invisible to a literal grep** | "any no-pricing sweep that greps for £ will report this file clean" | **FALSE for this file.** `grep -c '£' niche.config.json` = **5**; `grep -c 'Â£'` = **0**. The estate trap is real elsewhere; it does not apply here. Everything else about TD-02 holds: variant is `leadgen` at `:293`, and `/pricing` does not exist. | `grep -c '£' construction-cis/niche.config.json` |
| **`niche.cta.variant === "leadgen"` guard** | add one line to `src/tests/design/` | **Genuinely absent.** No design test mentions the variant. Net-new, ~3 lines, cheap. | `grep -n 'variant\|leadgen' src/tests/design/niche-config-port.test.ts` → nothing |
| **`/services` has no capture at all** | two bare `/contact` links, no form, no JSON-LD, no breadcrumb | **Confirmed.** 5 sections `:111,124,131,168,184`; `:193` and `:196` both `href="/contact"`; no `LeadForm`, no `JsonLd`, no `Breadcrumb`. `ServiceTiers ... featuredBadge="Most Popular"` at `:179`. | `grep -n '<section\|<Link\|<LeadForm\|JsonLd\|Breadcrumb' src/app/services/page.tsx` |
| **The two pillars' dark tail (§3a.1)** | last band navy on both | **Confirmed.** `cis-refund/page.tsx:216` and `gross-payment-status/page.tsx:226` are both `bg-[#1e293b]` and both last. Both carry `buildHowToJsonLd` and a `LeadForm` (`:249`, `:266`). Neither has a breadcrumb or a `#book` anchor. | `grep -n '<section\|<LeadForm\|buildHowTo' ` on both |
| **`/services` white-on-white (§3a.2)** | `:168` and `:184` both `bg-white` | **Confirmed**, both also `border-t border-neutral-200`. | same grep |
| **Homepage `#fafaf9` adjacency (§3a.2)** | `:236` and `:245` | **Confirmed**, back to back. | same grep |
| **`hero_primary` is the site's one-route CTA series** | 1 route, frozen literal at `page.tsx:206` | **Confirmed.** `cta_baseline.json.per_route["/"]` = exactly 3 CTAs. `page.tsx:206` carries the literal triple. `home_cta_primary` `:501` / `home_cta_secondary` `:510` sit inside the `packagesMode` branch opened at `:489` and have never rendered. | `grep -n 'data-cta' src/app/page.tsx` |
| **Both hotlinked Pexels images** | hero `:168`, mid-page `:447` | **Confirmed, both still live**, both `w=2000`. | `grep -rn 'pexels' src/app/page.tsx` |
| **Phase 3 holds `lib/schema.ts` uncommitted** | risk 5: do not reach into `schema.ts` | **Stale. Phase 3 is committed.** The tree is clean for this site and both pillars already import `buildHowToJsonLd` from `@/lib/schema`. WP-E1 may use it freely. | `git status --porcelain -- construction-cis/` → empty |

### Corrections to the brief I was given

| # | Brief statement | Verdict |
|---|---|---|
| 1 | "FLAT blog URLs (`/blog/<slug>`). The kit blog components hardcode Property's NESTED href and would publish dead links." | **FALSE for this site.** Trade's blog is **NESTED**: `src/app/blog/[category]/[slug]/`. `blog/page.tsx:63` builds `${url}/blog/${p.categorySlug}/${p.slug}`. `sweep.mjs:61` defaults `--article-depth=3`, which is the nested depth; the flat-depth note in that file names *Medical*, not Trade. Consequence for this phase: the "latest insights" band emits `/blog/{categorySlug}/{slug}`, exactly as PHASE5_PLAN §3 row 12 says, and no href rewriting is needed. |
| 2 | "`src/tests/intent-engine.test.ts` does not exist; the real tripwires are `assistant-journey-opener.test.ts` and `lead-payload.test.ts`, and neither may ever be modified." | **Correct, and it kills PHASE5_PLAN's WP-D0.** That package's only remaining task was an edit to `assistant-journey-opener.test.ts:706-711`. Resolution in WP-E0: leave the tripwire alone and put the corpus-wide rule in `penalty-figures.test.ts`, which already walks 200+ files and has no "Finance Bill" rule. |
| 3 | "Property does NOT consume the kit chrome; Trade runs its own local `SiteHeader`/`SiteFooter`." | **Correct**, and it is why §0's credit block is a hand-written defect rather than a kit default. |
| 4 | "`StatsBar` is a pure server component printing a literal string." | **Correct, do not touch.** Note Property's equivalent is a *different* component, `StatsCounter` (`Property/web/src/app/page.tsx:281`), which is the one with the count-up. Do not port it. |
| 5 | "every primary button is white on orange at ~2.80" | **Correct as the live-site statement**, but `--btn-ground` is already `#c2410c` (orange-700, 5.18) at `globals.css:87` and `btnPrimary` is mapped to it at `:128`. What remains is the per-instance `bg-orange-500` utilities listed in §3, not the token layer. |
| 6 | "`StickyCTA.tsx:147` ships `data-cta-id` which `autoCapture.ts` does not match." | Not re-verified here (out of Phase 5's files, Phase 1 owns `StickyCTA`). Left open and reported, not scheduled. |
| 7 | "the homepage anatomy is 12 blocks, not 16" | **Correct.** Property renders 12 content blocks plus `StickyCTA` and the JSON-LD set. |

---

## 2. THE SMALLEST EDIT POINT

| Surface | Pages rendered | Files to edit |
|---|---:|---|
| Homepage | 1 | `src/app/page.tsx` (+1 new component file) |
| `/services` | 1 | `src/app/services/page.tsx` |
| `/cis-refund`, `/gross-payment-status` | 2 | one file each, no shared template |
| **The footer credit (§0)** | **246** | **1** (`src/components/layout/SiteFooter.tsx`, one `<li>`) |
| `featuredBadge="Most Popular"` | 2 | 2 call sites (`page.tsx:358`, `services/page.tsx:179`). **Never** the kit component: `packages/web-shared/components/ServiceTiers.tsx` serves 16 sites and its default IS the banned string (T12, T13) |
| Service tier copy + `siteStats` | 2 routes | `src/config/service-tiers.ts`, one file, rendered by `/` and `/services` |

Phase 5 touches **7 source files plus 3 test files**. There is no N-page template in this phase
except the footer, which is the one place a single edit reaches all 246 routes.

---

## 3. THE `--accent` GLYPH SWEEP, RE-DERIVED (15 instances)

Contract (`DESIGN_DELTA.md:229`): `--accent` (orange-500) is permitted for **grounds and decorative
motif strokes only**. Any icon, glyph, numeral or meaning-bearing border takes `--accent-strong` /
`--btn-ground` (`#c2410c`, 5.18 on white).

**Label every ratio by SOURCE.** A Tailwind **utility** (`bg-orange-500`) renders `oklch()` →
`#ff6900` → **2.89** on white. The **token** `--accent: #f97316` renders the literal hex → **2.80**.
Never quote a v3 hex table.

| File:line | Instance | Class today | Action |
|---|---|---|---|
| `page.tsx:293` | 4 pain-point cards, left rule | `border-l-4 border-l-orange-500` | → `border-l-[var(--btn-ground)]` |
| `page.tsx:323` | 6 service icon tiles, white glyph | `bg-orange-500` | → `bg-[var(--btn-ground)]` |
| `page.tsx:366` | trade-verticals pill, white label | `bg-orange-500` | → on-dark eyebrow treatment (see §5 warning) |
| `page.tsx:408` | heading span on white | `text-orange-600` (3.60) | → `text-[var(--accent-strong)]` |
| `page.tsx:536` | 4 process numeral badges, white numeral | `bg-orange-500` | → `bg-[var(--btn-ground)]` |
| `page.tsx:581` | FAQ toggle glyph | `text-orange-500` | → `text-[var(--accent-strong)]` |
| `services/page.tsx:143` | 7 service icon tiles | `bg-orange-500` | → `bg-[var(--btn-ground)]` |
| `cis-refund:113` | card top rule | `border-t-4 border-t-orange-500` | → `--btn-ground` |
| `cis-refund:138` | card left rule | `border-l-4 border-l-orange-500` | → `--btn-ground` |
| `cis-refund:161` | numbered step badges, white numeral | `bg-orange-500` | → `--btn-ground` |
| `cis-refund:234` | tick glyph, white `✓` | `bg-orange-500 text-white` | → `--btn-ground` |
| `gps:155` | process rule `01/02/03` | `border-orange-500` | → `--btn-ground` |
| `gps:156` | process numeral label | `text-orange-500` | → `text-[var(--accent-strong)]` |
| `gps:204` | card left rule | `border-l-4 border-l-orange-500` | → `--btn-ground` |
| `gps:244` | tick glyph, white `✓` | `bg-orange-500 text-white` | → `--btn-ground` |

**Correctly left alone, do not "fix" (8 + 4):** on-dark accents `page.tsx:205, 213, 228, 269, 383,
386, 393, 458` and `gps:117`, `cis-refund:241`, `gps:251, 258` (orange-200/300/400 on navy,
6.15-10.47, PASS); already-passing `page.tsx:326, 616`, `services:205`, `cis-refund:207`
(orange-700, 5.18); decorative-only hover and underline `page.tsx:321, 381`, `services:140, 198`
(no contrast floor applies to a hover border or an underline decoration).

**Already done, do not re-fix:** `page.tsx:330`, `cis-refund:198`, `gps:130` all read
`text-[var(--accent-strong)]` today. PHASE5_PLAN and `BRAND_LAYER.md:211-212` both still list them.

---

## 4. LINK FLOORS AND CTA TRIPLES

### 4.1 Link floors

`link_baseline.json` is the **pre-port** snapshot at production SHA
`18b4f25f39cd0c4aa084e582d69a87c8a10710ac` (5,301 links, 620 CTAs, 36 dashes). Its floors are
binding as `>=`. **Never "correct" it to live numbers: its whole value is that it predates the port.**

| Route | Recorded floor (binding) | Live at plan time, NOT RE-VERIFIED | Chrome | Body-unique | What holds it |
|---|---:|---:|---:|---:|---|
| `/` | **59** | 65 | 20 | 45 | **All 45 `/for/*` anchors, `page.tsx:377-396`.** Every other body link on the page is a chrome destination and scores 0 under T14 (unique destinations, not anchors) |
| `/services` | **14** | 20 | 20 | **0** | Nothing. Both `/contact` links and `/for` are chrome |
| `/cis-refund` | **14** | 20 | 20 | **0** | Nothing |
| `/gross-payment-status` | **14** | 20 | 20 | **0** | Nothing |

The +6 on every route is the Phase-1 chrome growth (14 → 20 destinations) and nothing else.

**Binding consequences.**
1. The homepage floor **is** the trade grid. A rebuild that turns `:363-400` into a carousel, a
   filter or anything conditional sheds 45 destinations in one edit. **Assert the count of
   `/for/` anchors in the served HTML per build, not by eye.**
2. The three pillars cannot rise without a new destination family. A literal calculator anchor adds
   **zero** (the chrome already emits `/calculators` plus 4 calculator slugs). Only `/blog/*`,
   `/for/*`, `/glossary/*` or `/locations/*` can lift a pillar.
3. The homepage's only available lift is the latest-insights band: +3 `/blog/{cat}/{slug}`.

### 4.2 CTA triples, read verbatim from `cta_baseline.json.per_route`

| Route | Count | Triples (`id｜placement｜goal｜href`) |
|---|---:|---|
| `/` | **3** | `header_nav_primary｜header｜contact｜/contact` · `hero_primary｜hero｜lead｜/contact` · `specialist_widget｜null｜null｜null` |
| `/services` | **2** | `header_nav_primary｜header｜contact｜/contact` · `specialist_widget｜null｜null｜null` |
| `/cis-refund` | **2** | same two |
| `/gross-payment-status` | **2** | same two |

Site-wide locked series: `header_nav_primary｜header｜contact` 246, `specialist_widget｜null｜null`
246, `next_step｜null｜null` 109, `next_step｜null｜form` 18, `hero_primary｜hero｜lead` **1**.

**Never diff a live CTA total against `cta_baseline.json`.** The baseline is 620 over 246 routes;
the live site now returns ~798 because Phases 2, 3 and 4 added additive ids. Both numbers are
correct and they are not comparable.

**T22, the shape of the mistake.** Property renders `hero_book｜hero｜form` for the button Trade
calls `hero_primary｜hero｜lead` (`Property/web/src/app/page.tsx:255`), and Property renders
`header_book｜header｜form` for Trade's `header_nav_primary｜header｜contact`. **Adopting Property's
id or goal IS the defect. Do neither.** A builder porting faithfully from Property will do exactly
this; the id lives on one route, so a single character deletes the whole series.

---

## 5. WORK PACKAGES

Four. One runs **alone and first**. The other three run concurrently after it.

**Why E0 runs alone and first, and nothing else does.** In the pilot, the brand-layer package
blocked everything because kit components emitted classes that rendered as nothing until the ramp
landed. **That does not reproduce here: Phase 1 shipped the whole token layer and Phase 5 adds
nothing to it. No package in this phase may edit `src/app/globals.css`.** E0 runs alone for a
different reason: it edits the site-wide footer (246 routes) and a shared guard, and a restyle
package rebasing on top of a changed footer is a merge conflict at best.

---

### WP-E0 — correctness, chrome, and the guards. RUNS ALONE AND FIRST.

| | |
|---|---|
| **OWNS** | `src/tests/design/penalty-figures.test.ts` (add rules only); `src/tests/design/niche-config-port.test.ts` (add one assertion). **`src/components/layout/SiteFooter.tsx` is NO LONGER owned by this package and must not be touched** |
| **OFF LIMITS** | `src/app/page.tsx` (E1), `src/app/services/page.tsx` + `src/config/service-tiers.ts` (E2), `src/app/cis-refund/page.tsx` + `src/app/gross-payment-status/page.tsx` (E3), **`src/tests/assistant-journey-opener.test.ts` and `src/tests/lead-payload.test.ts` (NEVER, either file, any line)**, `src/app/globals.css`, `packages/web-shared/**`, `src/components/forms/**`, **`src/components/layout/SiteFooter.tsx` (ALL of it, every line)** |
| **Property source** | none. This is not design work |
| **Spec** | `DESIGN_DELTA.md:229`; playbook **T27**, **T34**, **T9**; `house_positions.md` §3; `LIVE_DEFECTS.md` TD-02, TD-05, TD-06, TD-07 |
| **Scope** | ~~1. Delete the Double Wired Creative build credit, `SiteFooter.tsx:147-160`.~~ **TASK REMOVED 2026-09-11: the credit is deliberate. Owner decision `6966c1f1` (2026-09-11 10:42) put the Double Wired Creative credit estate-wide, not only on the site the studio designed; `72fe3261` added Trade's at 18:39, after that decision and consistent with it. Do not delete it. §0 of this document is superseded, and `DESIGN_DELTA.md:229` / `STATE.md` owner-item 5 were corrected in place the same day.** 1. Add a corpus-wide **"Finance Bill 2026"** ban to `penalty-figures.test.ts`, which already enumerates every `.ts`/`.tsx` under `src/` (minus tests), every `.md` under `content/` and `niche.config.json`. This is the durable replacement for TD-07's mis-pointed guard, which sits in a file that may never be edited. 2. Add `expect(niche.cta.variant).toBe("leadgen")` to `niche-config-port.test.ts` so flipping TD-02's dormant price list fails a test instead of passing review (owner gate 5 below) |
| **Acceptance** | ~~`grep -rn 'doublewiredcreative' ... == 0`~~ **(removed with the task above; the credit stays, and `git diff --stat -- construction-cis/web/src/components/layout/SiteFooter.tsx` must be EMPTY at the end of this package)**; `grep -rn '30% of the tax' src` == **0** (already true, assert it stays); `grep -rn 'Finance Bill 2026' src/app src/lib src/components src/config` == **0**; **the new "Finance Bill" rule FAILS when the string is injected into a page file and passes on revert** (T9, prove the bite, do not merely watch it pass); the new variant assertion FAILS when the config is flipped to `packages` and passes on revert; `npx vitest run src/tests/design/` green; `npx vitest run src/tests/assistant-journey-opener.test.ts src/tests/lead-payload.test.ts` green **and both files byte-unchanged** (`git diff --stat -- construction-cis/web/src/tests/assistant-journey-opener.test.ts src/tests/lead-payload.test.ts` empty); `python scripts/check_dependency_closure.py` |
| **Depends on** | nothing |
| **Blocks** | E1, E2, E3 (all three render the footer) |

---

### WP-E1 — the homepage

| | |
|---|---|
| **OWNS** | `src/app/page.tsx` (627 lines); NEW `src/components/marketing/MarketingSections.tsx`; `src/tests/design/cta-attribute-diff.test.ts` (**extend only**) |
| **OFF LIMITS** | `src/config/service-tiers.ts` (**E2 owns it, and `/` renders both its arrays — read freely, never edit**), `src/app/services/page.tsx`, `src/app/cis-refund/page.tsx`, `src/app/gross-payment-status/page.tsx`, `src/components/layout/**`, `src/components/forms/**`, `src/app/globals.css`, `niche.config.json`, `packages/web-shared/**`, both locked tripwire tests |
| **Property source** | `Property/web/src/app/page.tsx`: JSON-LD set `:227-236`, hero `:239-277`, stats strip `:279-283`, `ProblemStatement` `:286`, `WhoWeAreSection` `:289`, `WhyChooseUsSection` `:292`, services grid `:295-323`, `WhatWeCoverSection` `:325`, `#calculators` `:328-359`, `TestimonialsSection` `:361`, blog band `:364-418`, `#book` `:420-515`, FAQ `:517-536`. `Property/web/src/components/property/MarketingSections.tsx`: `WhoWeAreSection` `:71-106`, `WhyChooseUsSection` `:108-133`, `WhatWeCoverSection` `:135-181` |
| **Spec** | rollout §F.2, §A.1-A.8, §D.3, §I; DESIGN_SYSTEM §4, §5, §7, §9; `DESIGN_DELTA` §1, §3a.2 |
| **Section map** | §6 below, in full. 15 sections in, **13** out |
| **Acceptance** | See §7.E1 |
| **Depends on** | WP-E0 |
| **Concurrency** | with E2 and E3 |

---

### WP-E2 — `/services` and the shared tier data

| | |
|---|---|
| **OWNS** | `src/app/services/page.tsx` (214 lines); `src/config/service-tiers.ts` (77 lines) |
| **OFF LIMITS** | `src/app/page.tsx` (**E1 owns it and it renders both `service-tiers.ts` arrays — any change to that file is serialised through the manager**), `packages/web-shared/components/ServiceTiers.tsx` and `StatsBar.tsx` (**T12, 16 consumers, read freely, never edit**), E1's and E3's OWNS columns, `globals.css`, `SiteFooter.tsx`, both locked tripwire tests |
| **Property source** | `Property/web/src/app/services/page.tsx` (454 lines) and `Property/web/src/app/services/property-accountant/page.tsx` |
| **Spec** | rollout §F.1, §H, §I; DESIGN_SYSTEM §4b, §9 |
| **Scope** | Replace the navy hero `:111` with a cream hero + `Breadcrumb` (**local `src/components/ui/Breadcrumb.tsx`; there is no `TopicHero` anywhere, build the hero inline as Property's pillar does**). Keep `StatsBar` at `:124` untouched. Restyle the 7 service cards at `:139-143` with **all 7 `id=` + `scroll-mt-24` anchors preserved** — inbound links resolve to them. `featuredBadge=""` at `:179` (T13: the kit default at `ServiceTiers.tsx:37` **is** the banned `"Most Popular"`, so the prop must be passed empty, not omitted; `service-tiers.ts:39` `featured: true` still keeps the tier's emphasis). Oscillate `:184` off `bg-white` to close the §3a.2 pair. Replace the two bare `/contact` links at `:193`/`:196` with a `#book` `scroll-mt-24` band holding `LeadCTAPanel` — this is the only pillar with no capture at all. Add `Service` + `OfferCatalog` (**no pricing**) + `BreadcrumbList` JSON-LD |
| **Acceptance** | See §7.E2 |
| **Depends on** | WP-E0; owner gate 1 (FAQ commission); owner gate 2 (TD-18) |
| **Concurrency** | with E1 and E3 |

**Do not copy Property's `LeadCTAPanel` props.** Property's `proofPoints` are *"Fixed fees, quoted
upfront"* and *"24-hour response"* — TD-18 and TD-13 verbatim, and Phase 2 spent its larger half
removing 23 instances of that family across 19 files. Trade has its own panel at
`src/components/marketing/LeadCTAPanel.tsx`. **Copy the component, never the props.**

---

### WP-E3 — `/cis-refund`, `/gross-payment-status`, and the dark tail

| | |
|---|---|
| **OWNS** | `src/app/cis-refund/page.tsx` (256 lines); `src/app/gross-payment-status/page.tsx` (273 lines) |
| **OFF LIMITS** | E1's and E2's OWNS columns; **`src/components/forms/LeadForm.tsx` and `DetailsForm.tsx`** (the consent wording is the most expensive surface in the programme — see `consent_wording_conversion_incident`; do not touch); `globals.css`; `SiteFooter.tsx`; `src/lib/calculators/**`; both locked tripwire tests |
| **Property source** | `Property/web/src/app/section-24/page.tsx` (1,113 lines) — the topic-pillar anatomy. **Property has no `/cis-refund` sibling** |
| **Spec** | rollout §F.1, §D.1, §D.3; DESIGN_SYSTEM §4a, §4b, §9; `DESIGN_DELTA` §3a.1 |
| **Scope** | Cream hero + `Breadcrumb` replacing both `bg-[#1e293b]` heroes (`cis-refund:84`, `gps:85`). **Rate tables KEPT** — a reference page is citable because of its table and is never replaced by a figure (§4a); header rows `bg-[#1e293b]` → `slate-900` (`cis-refund:184`, `gps:115,169`); the figure cells are already `var(--accent-strong)`, leave them. Delete the `border-b border-neutral-200` dividers and let the grounds oscillate. Convert the closing band (`cis-refund:216`, `gps:226`) to a `#book` + `scroll-mt-24` `LeadCTAPanel` wrapping the existing `LeadForm`, and **put a light band after it on both** — that is the §3a.1 fix and it is this package's headline. Keep `buildHowToJsonLd`. §3 glyph rows for both files |
| **Acceptance** | See §7.E3 |
| **Depends on** | WP-E0; owner gate 1 |
| **Concurrency** | with E1 and E2 |

---

### Sequencing

```
WP-E0  (ALONE, FIRST, committed on its own)
   |
   +--> WP-E1  (homepage)          \
   +--> WP-E2  (/services + tiers)  >  fully concurrent, zero shared files
   +--> WP-E3  (two pillars)       /
                                      |
                                      v
                       manager builds, SERIALLY (T1/T2), then commits
```

**Builders never build (T1). The manager builds, serially, and checks `BUILD_ID` mtime against the
newest source file before trusting a green run (T2). Builders never commit. A `next build` replaces
`.next` under a running server, so serialise builds against in-flight crawls, not just against
other builds.**

The only cross-package coupling is `service-tiers.ts`: E2 owns it, E1 renders both its arrays and is
read-only on it. If E1 needs a tier or stat changed, it goes through the manager, never a second
edit.

---

## 6. THE HOMEPAGE SECTION MAP (WP-E1)

Today **15** sections. F.2 is **12** content blocks. After Phase 5: **13** (12 + `ServiceTiers`, a
sanctioned addition).

| # | F.2 block | Trade today | Verdict | Notes |
|---:|---|---|---|---|
| — | StickyCTA | mounted site-wide in `PageShell` | **LEAVE** | Slice-1 gate 4 chose site-wide over Property's homepage-only. Do not move it |
| — | JSON-LD set | `:163` `buildFaqJsonLd(faqs)` only | **EXTEND** | Add `WebPage`, `AccountingService`, `Service`, `BreadcrumbList`. Organization + WebSite are site-wide. `lib/schema.ts` is now committed and free to use. T17: `faqs` already feeds both `:163` and `:571` from one array — **keep it that way** |
| 1 | navy motif hero | `:166-220` | **ADOPT-RESTYLE** | Today a hotlinked `images.pexels.com` photo at `w=2000` (`:168`) under a `from-neutral-950/97` scrim: a third-party hotlink, the LCP image on the front door, ~97% hidden by its own gradient. → `bg-slate-900` + `<TradeBackdrop/>` (`src/components/layout/TradeBackdrop.tsx`, Phase 1). H1 and standfirst copy **KEEP**. `.section-label` at `:178` → on-dark eyebrow. **`data-cta` at `:206` is a FROZEN LITERAL, see §7 and risk 1.** Trust badges `:213` carry no response-time claim and must not gain one (TD-13/TD-14, both closed) |
| 2 | white stats strip | **two bands**: `:222` navy `keyStats`, `:245` `#fafaf9` `StatsBar` | **MERGE 2 → 1** | F.2 gives one. Keep `StatsBar` + `siteStats` (the derived, guarded array) on a white `py-5 sm:py-7 border-b` strip. Retire the navy `keyStats` band; relocate its four facts (`4 years`, `1.4m+`, `20%`, `55p`) into the comparison band as prose, where they read as mechanics not as a proof-count. No fact lost, no new data file. **This also dissolves the §3a.2 `#fafaf9`/`#fafaf9` adjacency for free** |
| — | intro strip `:236-242` | | **RETIRE** | One paragraph restating the hero standfirst. Not in F.2 |
| 3 | ProblemStatement | `:283-301` `painPoints` grid | **ADOPT-RESTYLE IN PLACE** | The four card bodies **are** the argument F.2 asks for, already written and compliant. Prose cards, `--btn-ground` left rule on `#fafaf9`. **Do NOT mirror the kit `ProblemStatement`**: it hardcodes Property's landlord copy with no copy props (T12), so mirroring imports a new file to render copy the page already has. Skip `PromptMarquee` entirely: no link, no fact, no ask |
| 4 | WhoWeAre | **absent** | **NET-NEW** | The only genuinely missing F.2 block. **Source the copy from `/about`; author no new claims.** Lives in the new `MarketingSections.tsx` so Phase 6's `/contact` shares it rather than copying it |
| 5 | WhyChooseUs | `:403-417` | **MOVE INTO `MarketingSections.tsx`** | Re-set as eyebrow + h2 + prose + tick list. **Copy gate 3**: `:411` says *"across a large CIS client base"* |
| 6 | services grid | `:304-344` | **ADOPT-RESTYLE** | Ground → `bg-primary-50/60`; 6 cards `rounded-xl border border-primary-100 bg-white p-6`; icon tiles `:323` → `bg-[var(--btn-ground)]`. **All 6 service hrefs and the "View all services" link KEPT** |
| — | `ServiceTiers` `:347-360` | | **KEEP, `featuredBadge=""`** | Not an F.2 block; a sanctioned addition, live kit on 16 sites. `"Most Popular"` is an aggregate claim about client behaviour, banned by §I, and it is the kit **default** — pass the empty string, never omit the prop |
| 7 | WhatWeCover | `:419-440` `comparisonRows` | **ADOPT-RESTYLE IN PLACE** | The table is what makes a reference surface citable. Header row `bg-[#1e293b]` → `slate-900`, our column primary-edged, `min-w-[36rem]` inside `overflow-x-auto`, stacked below `md`. **Do NOT mirror the kit `ComparisonTable`.** No `ExampleFigureNote`: §E makes it mandatory on figures, not on comparison tables |
| — | trade verticals `:363-400` | | **ADOPT-RESTYLE, LINK FLOOR** | Not an F.2 block and **non-negotiable**: `:377-396` renders **45 `/for/*` anchors, which are 45 of the homepage's 45 unique body links.** Navy → `bg-slate-900` + backdrop; cards `bg-white/5 ring-1 ring-white/15`; the solid-orange pill `:366` gets an on-dark treatment. Keep "See all trade types". **Losing one anchor here is a link-floor breach** |
| 8 | `#calculators` | **absent** | **NET-NEW, MINIMAL** | F.2 requires the block. `CalculatorTabs` does not exist on this site (it is Property's, `Property/web/src/app/page.tsx:339`) and a literal calculator anchor adds **0** unique destinations because the chrome already emits four calculator slugs. **Minimum that meets F.2: a white band of 4 literal `<a href="/calculators/…">` cards read from the existing registry. No tabs component, no client JS, ~15 lines** |
| 9 | Testimonials | `:252-281`, currently **second** | **ADOPT-RESTYLE + REPOSITION** | Move to F.2's position (after `#calculators`), ground → navy. The three quotes at `:49-65` are **KEEP-PAYLOAD**: anonymised trade + region, no names. **Copy gate 3**: `:255` "Real outcomes", `:257` "What we have done for CIS subcontractors", `:260` "composite snapshots based on patterns across our CIS clients" |
| 10 | latest insights | `:600-625` is copy-only | **NET-NEW — and this is where the value is** | 3 real `/blog/{categorySlug}/{slug}` row links + view-all, slate-50 `divide-y`. **+3 unique body destinations** and three crawl paths from the highest-authority page into the 82-post corpus that carries 54% of sessions. **This is the highest-value single item in the phase.** Preserve the existing `/blog` and `/cis-refund` links inside it |
| 11 | `#book` navy closing | `:483-563` | **ADOPT-RESTYLE IN PLACE** | Already the right anatomy. Ground `#1e293b` → `slate-900`, add `scroll-mt-24`, `grid lg:grid-cols-[1fr_2fr]`, the 4 proof rows `:528-545` with `h-12 w-12 rounded-xl` badges (numerals off `--accent`, §3), white card holding `<LeadForm submitLabel="Request a callback"/>`. **The `packagesMode` branch at `:489` stays structurally intact and silent** |
| 12 | FAQ white, last | `:566-597` hand-rolled `<details>` | **ADOPT-RESTYLE, KEEP `<details>`** | **Do not adopt the kit `FaqSection`.** Phase 2 §1d established that the kit wraps answers in Radix `AccordionContent` with **no `forceMount`**, so closed answers leave the server HTML. Phase 3 reached the same verdict independently. The `<details>` idiom is already crawlable and it keeps the light tail the footer needs |
| — | mid-page image break `:445-463` | | **RETIRE** | A **second** hotlinked Pexels photo (`:447`) carrying two sentences and no link |
| — | "Proudly British" strip `:466-479` | | **RETIRE** | The identical asset renders in the footer on every page |

**Split: 4 restyle in place, 3 restyle with a move or ground change, 2 merge, 3 net-new, 3 retire,
2 leave. 15 in, 13 out.** This is a net reduction of two sections, not a 16-section build.

---

## 7. ACCEPTANCE, DERIVED FROM PHASE 5's OWN SCOPE (T35)

### The dash metrics, and which one this phase can move

Four different numbers exist and they are not interchangeable. State which you mean, always:

| Metric | Scope | Value | Can Phase 5 move it? |
|---|---|---:|---|
| raw source | whole repo, all chars | 39 (pre-port) | n/a |
| user-facing source | narrower scope | 35 (pre-port) | n/a |
| rendered body | the DOM | 34 (pre-port) | n/a |
| **sweep** (`sweep.mjs:72`, `/[—–]\|&mdash;\|&ndash;/g`, counts **en** dashes too) | rendered body, 246 routes | **2 today** | **NO** |
| **`em-dash.test.ts`** (`src/app`, `src/components`, `src/lib`, `src/config`, comments blanked) | source | **0 em + 2 en** | **NO** |

**The site-wide sweep target is 2, not 0**, and the 2 survivors are protected numeric ranges
(`cis-self-assessment-calculator.ts:125`, `cis-vs-paye-comparison.ts:113`, TD-28). **Both sit in
`src/lib/calculators/**`, which no Phase 5 package owns.** Phase 5 therefore **cannot** move this
number and must not write `totalDashes == 0` as an acceptance test. Phase 3's plan carried
`totalDashes == 2` when all 36 dashes sat on Phase 4's pages, which was unsatisfiable by 34;
builders silently substituted a weaker assertion. **The Phase 5 assertion is: the count does not
rise, and `npx vitest run src/tests/design/em-dash.test.ts` is green.**

### 7.E1 — homepage

1. 13 sections in F.2 order (§6).
2. `/` renders **≥ 59** unique internal destinations (binding recorded floor) and **≥ 65** live
   (the post-Phase-1 reality). **Assert `grep -o 'href="/for/' | wc -l` == 45 in the served HTML**
   (note: `grep -c` counts LINES and rendered Next.js HTML is one line — use `grep -o … | wc -l`).
3. The rendered `data-cta` set on `/` is **byte-identical to `cta_baseline.json.per_route["/"]`**:
   exactly three, including `hero_primary｜hero｜lead`.
4. `home_cta_primary` and `home_cta_secondary` **absent from the rendered DOM** (they are today).
5. `featuredBadge=""` renders **no badge, verified in the rendered DOM, not the prop** (T13).
6. `grep -rn 'pexels' src/app/page.tsx` == **0**.
7. `faqs` feeds `buildFaqJsonLd` and the render from **one array** (T17).
8. FAQ `<details>` retained and present in the server HTML.
9. Last band under `<main>` is **light**; **0 adjacent same-ground pairs on `/`**.
10. `npx vitest run src/tests/design/` green; dash count does not rise; `python
    scripts/check_dependency_closure.py`.

### 7.E2 — `/services`

1. **≥ 14** unique internal destinations (recorded floor), **≥ 20** live.
2. All **7** service anchors present with `id=` and `scroll-mt-24`.
3. `featuredBadge=""` renders no badge **in the DOM**.
4. A `#book` form present on the page; the D.1 ground invariant (dark band, white card,
   `text-neutral-900` labels) **measured on the rendered page, not assumed**.
5. Last band light; **0 adjacent same-ground pairs on `/services`**.
6. `grep -rn '57+\|24h' src/config/service-tiers.ts` == **0** (already true, assert it stays).
7. CTA set on `/services` unchanged at the baseline two unless an **additive new id** is agreed
   (risk 1); `npx vitest run src/tests/design/cta-attribute-diff.test.ts` green.
8. `npx vitest run src/tests/design/` green; dependency closure.

### 7.E3 — the two pillars

1. **The grounds gate, and it is this phase's tracked blocking item.** Run, verbatim, from the repo
   root with the phase's own server port substituted and the title asserted first:

   ```bash
   curl -s http://localhost:<PORT>/ | grep -o '<title>[^<]*</title>'   # must read: CIS Accountants & Construction Tax Specialists | UK

   MSYS_NO_PATHCONV=1 node docs/_engines/instruments/browser_check.mjs --site=construction-cis \
     --base=http://localhost:<PORT> --grounds --sample=200 --widths=1440 --out=<scratch>/grounds_after_phase5.json
   ```

   Read three lines in order: the **grounds self-test line** (if the classifier fails the mode exits
   2 and the run does not count), `SECTION GROUNDS, 246 route(s) measured` (a lower number means
   routes were dropped), and the two metric lines raw.

   **Expected after Phase 5:**
   ```
     dark band touching the footer: 2  [/cis-invoice-template 1, /cis-payment-deduction-statement-template 1]
     adjacent bands sharing a ground: 0
   ```
   Down from 4 and 2. **The two survivors are Phase 6's template pages and Phase 5 cannot close
   them.** Do not write an acceptance test that demands 0 on the first metric.
2. Both routes render **≥ 14** unique destinations (recorded floor), **≥ 20** live.
3. D.1 form-ground invariant **measured rendered on both**.
4. `grep -rn '30% of the tax\|Finance Bill 2026' src/app/cis-refund/page.tsx
   src/app/gross-payment-status/page.tsx` == **0** — E0's work, asserted here so a restyle cannot
   reintroduce it and the failure lands on the package that caused it.
5. Rate tables still present, with the same rows and figures.
6. `npx vitest run src/tests/design/` green; dependency closure.

### Phase-level, manager-run, after all four land

- `node docs/_engines/instruments/sweep.mjs --site=construction-cis --base=http://localhost:<PORT>`:
  **246 of 246 routes clean, 0 dead internal links, 0 link-floor breaches, dashes still 2.**
- Full suite: **422 tests across 26 files** was the count at `72fe3261`; the number will rise as E0
  adds rules. It must not fall, and no test may be deleted or weakened.
- `python scripts/check_dependency_closure.py` before any deploy discussion.
- `git diff --stat` on the two locked tripwire tests must be **empty**.

---

## 8. RISKS AND AMBIGUITIES, WITH MY RECOMMENDED RESOLUTION

1. **The one-route CTA series, and a taxonomy conflict PHASE5_PLAN missed.**
   PHASE5_PLAN says: freeze the triple, move `hero_primary`'s href from `/contact` to `#book`,
   because the goal is a hardcoded literal and does not derive from the href. That is
   mechanically true. But `cta-attribute-diff.test.ts` documents this site's own taxonomy, set by
   Phases 3 and 4: **`goal="form"` is an on-page form anchor, `goal="lead"` is a CTA that leaves
   the page**, and both phases solved exactly this problem by minting an **additive new id**
   (`for_hero_book｜hero｜form` on 45 routes, `calc_hero_help` on 12) rather than repurposing a
   locked one. Pointing `hero_primary｜hero｜lead` at `#book` makes the homepage the single route
   where `lead` means the opposite of what it means everywhere else.
   **Recommendation: leave `hero_primary` completely untouched, href `/contact` included, and give
   the hero SECONDARY (`page.tsx:205`, today a plain text link) the `#book` anchor under a new
   additive id `home_hero_book｜hero｜form`.** Matches the precedent twice established, gives the
   page an on-page ask, and puts zero risk on a series that cannot be rebuilt. Record the new id in
   `cta-attribute-diff.test.ts` in the same commit, and prove the guard bites (T9).

2. **`.eyebrow` is guarded by a pinned file:line list, and a builder will trip it.**
   `src/tests/design/eyebrow-ground.test.ts` enumerates every `className="eyebrow"` occurrence by
   grepping the shipped source and **fails on any new or moved one**, because the class's default
   `--accent-strong` measures 5.18 on white but ~3.43 on `bg-neutral-900`. Eight occurrences are
   pinned today. Phase 5 is about to add on-dark eyebrows to a navy hero and two navy `#book` bands.
   **Recommendation: reach eyebrows through `LeadCTAPanel`, which already carries both spellings at
   the two pinned lines, wherever the band is a capture panel. Where a page genuinely needs a bare
   one, write the literal `className="eyebrow text-orange-400"` on dark (7.54, known-safe), add the
   entry to `KNOWN_EYEBROW_CONSUMERS` with a comment giving the measured ratio, and never a
   template-string className — the guard greps for the literal and a template string is invisible
   to it.** Do not edit the test to make it pass.

3. **`TopicHero` does not exist.** Two of PHASE5_PLAN's four packages are scoped around it.
   **Recommendation: build the pillar heroes inline on each page, taking the anatomy from
   `Property/web/src/app/section-24/page.tsx`, and use the local `src/components/ui/Breadcrumb.tsx`.
   Do not create a shared hero component for three pages.**

4. **T30 and `.section-label`.** The rule at `globals.css:289` is **unlayered**, so a consumer's
   Tailwind utility silently loses to it. It renders correctly today (5.18) on all 39 consumers, 21
   of them in Phase 5's own files. **Recommendation: do not re-layer it in this phase.** The other
   18 consumers belong to Phases 3 and 6 and nobody in this phase can test them. Phase 5 replaces
   its own 21 usages where the ground calls for it and **leaves the class defined**. Re-layering, if
   wanted, is one manager-owned edit after Phase 6.

5. **`service-tiers.ts` is rendered by two routes owned by two packages.**
   **Recommendation: E2 owns the file, E1 is read-only, the manager serialises any change.**

6. **A restyle can silently reintroduce E0's corrections.** **Resolution: E3's acceptance asserts
   the greps in its own files (§7.E3 item 4), so a reintroduction fails the package that caused it
   rather than a sweep three days later.** This is the direct lesson of T34 and of the GPS
   calculator that was fenced off from three sweeps.

7. **`browser_baseline.json` is oklch-blind and is being re-captured by another agent right now.**
   Until that lands, **a "NEW" contrast finding derived from a diff against that file must be
   checked against the source before it is believed.** Absence from the baseline is not evidence
   that a colour was passing. Do not read, write or reason from that file in this phase.

8. **The homepage is being rebuilt for four people.** 19 days post bot-gate, strict both-flags
   clean: **203 clean sessions site-wide, 3 leads in the site's entire history.** The homepage drew
   **4** sessions; the three pillars drew **1 between them**; the blog drew **110**. The rebuild
   still happens, because the standard is the contract and it is the brand's front door. **It is
   not the centrepiece.** Size the review accordingly: spend it on (1) the CTA attribute diff on
   `/`, 30 seconds and the only irreversible thing in the phase; (2) the 45 trade anchors counted in
   served HTML; (3) the grounds instrument run; (4) the latest-insights band, which is the only item
   here that touches the surface carrying 54% of traffic. Everything else is normal review.

9. **Gold-plating to skip, explicitly.** Mirroring four kit components locally
   (`ProblemStatement`, `ComparisonTable`, `TestimonialsSection`, `PromptMarquee`) to render copy
   the page already has; `PromptMarquee` at all; porting `CalculatorTabs`; commissioning FAQ sets
   for all three pillars; commissioning `related[]` arrays so the pillars can carry a
   `RelatedArticles` row; tracking a third §3a row for the 1-RGB-unit `#fafaf9`/`#fafafa`
   near-adjacency, which resolves for free when the stats bands merge.

---

## 9. LOCKED CONTENT RULES FOR EVERY BUILDER IN THIS PHASE

No pricing for our services, including comparative claims. No contingent or no-win-no-fee offers.
No turnaround promises. No client-behaviour assertions. No client-count or aggregate-performance
claims. No "most businesses qualify" framing. Every figure re-derivable from
`docs/construction-cis/house_positions.md` and used within its stated scope. **No em-dashes in
user-facing copy** (en-dashes are fine in numeric ranges). British English.

`"Most Popular"` is an aggregate claim about client behaviour and is banned by §I. It is the kit
default, so it arrives unless you pass `featuredBadge=""`.

**Do not cite `house_positions.md:82` (the CIS300 12-month penalty row), `:11`, `:57`, `:61`
(the SI 2026/289 commencement vehicle) or `:221` (the "Finance Bill 2026" watch item).** The file
contradicts itself in those places and the owner has been asked to settle them. Everything else in
it is ground truth.

---

## 10. OWNER DECISIONS THIS PHASE NEEDS

Four, in plain English. The four carried over from PHASE5_PLAN that are **not** needed to start are
listed after.

1. **Our website footer says another company designed and built our site. It did not. Remove it?**
   The line is a link to a design studio that built a different site of ours. It appears at the
   bottom of every one of our 246 pages, and it passes search credit to them.
   *Recommendation: remove it. One deletion, nothing else moves.* — **This is the one genuinely new
   decision, and it is a yes/no.**

2. **Seven places on these pages promise "fixed fees, quoted before we start". Change them?**
   The enquiry goes to up to six independent accountancy firms who set their own fees. We do not
   quote at all, so the promise is not ours to make.
   *Recommendation: reword all seven to describe what the partner firm does. One line each, inside
   work already open in those files, so it costs nothing now and is awkward later.*

3. **Three lines on the homepage claim results for "our clients". Rewrite them?**
   "What we have done for CIS subcontractors", "composite snapshots based on patterns across our
   CIS clients", "we deal with them every week across a large CIS client base". We hold no client
   records anywhere.
   *Recommendation: rewrite to describe the mechanics ("we see these every week"), and keep the
   three anonymised quotes, which are fine.*

4. **The standard wants a questions-and-answers block at the bottom of each of the three service
   pages. None has one. Write them?**
   *Recommendation: do it for the main Services page only. The two others got one visit between
   them in nineteen days and they already carry a step-by-step block search engines read.*

**Carried over, not blocking, already recommended and safe to default:** the two hotlinked stock
photographs (remove both, use the drawn scaffold background from phase 1); the dormant second
homepage closing block (leave it switched off and do not tidy it); the dormant price list in the
settings file (leave it, add the one-line check in WP-E0 so flipping it fails a test); the two stats
strips (merge to one, keep the site facts, move the tax facts into the comparison section as
sentences). The `house_positions.md` self-contradictions are owner work and belong to no design
phase.
