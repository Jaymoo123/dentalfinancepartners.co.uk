# Property design migration — PLAN

Version 1, 2026-08-22. Written from the 14 investigation reports in `reports/`.

**Read `CONTEXT.md` first.** It holds Rule Zero, the carve-outs, the ground rules and the
map of where everything lives. This file holds the phases. Neither replaces the other.

**If you are an agent picking up work:** read `CONTEXT.md`, then find your phase below,
then read the reports named in that phase's *Evidence* line. Do not read all 14 reports.

---

## 0. The plan in one page

The designer rebuilt the Property site across 11 sessions: a design system, ~40 bespoke
storytelling components, a rebuilt blog, and reworked chrome, homepage, services and
calculators. 252 files. We kept shipping in parallel: 644 files, Waves 8 to 12, the
cluster coverage programme.

**Rule Zero (owner, 2026-08-22): take their design. Copy and paste it across wherever we
can.** Diverge only on the seven carve-outs in `CONTEXT.md` §2, which are all cases where
their July fork would undo something factual, legal, security-related or SEO-load-bearing
that we changed after they forked.

The investigation says this is more tractable than it first looked:

- Their pages are a **re-presentation of our prose**, not competing content. Whole data
  arrays are character-identical; every FAQ set is byte-identical.
- **Zero cases of their copy being factually stale.** One case of it being ahead of ours.
- **Zero import-path blockers.** All 36 of their shared-package imports resolve against
  our real 99-entry exports map. Two one-line signature fixes.
- **Zero code coupling** on the seven forked pillar pages. No test asserts them.
- The whole `vendor/web-shared` and quarantined-backend problem is **discardable**: 21 of
  22 backend originals are byte-identical to what we sent, and all 31 vendored files are
  stubs they wrote to work around our incomplete handover.

And harder than it first looked in exactly three places:

1. **Their layout drops internal links.** 135 → 52 on the pillar pages, 749 → 108 on the
   blog hubs, and every `CalculatorTabs` page loses its crawlable calculator links. This
   is one recurring defect class, not four separate problems, and carve-out 5 governs it.
2. **The test suite gives this migration no cover.** 1484 tests, all green, and **none of
   them assert page JSX, copy or metadata**. Green CI after a re-skin proves nothing.
3. **The measurement calendar collides with the redesign.** 70 monitored rows are armed
   to 2026-11-19 and `monitored_pages` cannot detect a rewrite. See §1, DECISION A.

Total build estimate: **19 to 26 working days** of agent time, excluding owner review
cycles and excluding Phase 9 (deploy). Phases 0 to 3 deliver most of the visible change
and are about a third of that.

---

## 1. Decisions the owner must make

Nothing below Phase 0 starts until DECISION A is answered. The rest are gates inside
their own phase and can be answered as that phase comes up.

### DECISION A — ANSWERED 2026-08-22: **A1, and wider.**

Owner's words: *"they're early stage anyway, so include them in everything and we can
rebaseline them to continue to monitor, as well as anything else in the monitor."*

**Settled.** The 70 monitored rows are in scope for every phase like any other page. No
page is held back for measurement reasons. Nothing below is blocked any more.

Two consequences to carry:

1. **Phase 9 re-baselines the whole monitor, not just the 70 cluster rows.** Every
   monitored Property row gets re-baselined post-deploy so monitoring continues from the
   redesigned site rather than drifting against a pre-redesign baseline. Scope it from the
   live `monitored_pages` table at the time, not from this document.
2. Re-baselining is a **production action** and therefore owner-triggered in the turn it
   happens, same as the deploy. It does not happen early and it does not happen
   automatically.

The original analysis is kept below for the record.

### DECISION A — the measurement window (ORIGINAL ANALYSIS, now settled as A1)

70 monitored rows from the cluster coverage programme are armed to **2026-11-19**. Our own
rule is one change per page per measurement window. `monitored_pages` has no content hash,
no title check and no DOM diff (`detectors.py:1170-1403`), so a re-skin triggers nothing
and emails nobody — but it also means no safety net, and damage would surface four to
eight weeks later with attribution destroyed.

Report 10 proposed shipping the chrome now and leaving the 70 monitored slugs byte-stable.
**On review that option does not survive contact with the work**: the header, footer,
button system and `globals.css` render on every page, monitored ones included. A design
system is a site-wide intervention by construction. There is no version of this that
leaves 70 pages byte-stable while the redesign ships.

So the real choice is:

| | Option | Consequence |
|---|---|---|
| **A1** | **Ship the redesign, re-baseline the cluster measurement, annotate the window.** | Lose clean attribution on the 70 cluster rows for this window. Redesign lands now. **Recommended.** |
| **A2** | Hold the entire migration until 2026-11-19. | Attribution preserved. Redesign sits on the shelf for 13 weeks; the designer's work goes further out of date against a site that keeps shipping. |
| **A3** | Ship Phases 0 to 2 only (defects + foundation + chrome), hold page-level work. | Worst of both: the chrome change already contaminates the window, and you get a half-redesigned site for 13 weeks. |

**Recommendation: A1.** The cluster measurement is telling us about content coverage, and
a redesign is a different kind of intervention that will dominate any signal in that
window anyway. Re-baselining costs one measurement cycle. Holding costs a quarter.

*Blast radius:* attribution only, no production change. *Revert path:* none needed, this
is a scheduling decision, not a code change.

### The rest, by phase

| # | Decision | Phase | Recommendation |
|---|---|---|---|
| B | ~~Double Wired Creative footer credit~~ **ANSWERED 2026-08-22: ship it, DOFOLLOW, sitewide.** Owner: *"ship it as do follow sitewide as it's the company that built the site."* Build per their spec in `DESIGN_GUIDELINES.md` §1.1: exact gradient `from-[#818cf8] to-[#fb923c]`, always on, dual-colour glow on hover only, hyperlinked to `https://www.doublewiredcreative.com/` with `target="_blank" rel="noopener noreferrer"` and **no `nofollow`**. Canonical markup is their `SiteFooter.tsx`. The two gradient colours are reserved for the credit and are not palette members. | 2 | Settled. |
| C | ~~Calculator soft-gate~~ **ANSWERED 2026-08-22: C2, ship the gate as designed.** Owner chose C2 over the recommended C1 after the trade-off was put to him in writing. All five sub-decisions ship: extend the gate to the 5 bespoke calculator pages, hold the real result behind frosted glass, persist reveals per calculator in sessionStorage, delete `CalcResultCta`, drop the calculator-page `GateOrForm`. Full Rule Zero fidelity. **Two consequences are now accepted, not open questions:** (1) it is an unvalidated conversion change on the primary lead surface, and (2) the existing `calc_result` series breaks, so before/after comparison against history is lost. **Mandatory paired change:** deleting `CalcResultCta` kills the `calc_result` form ID, which is still in `MINIFORM_FORM_IDS` and inside `deploy-watch`'s baseline of 15. Dropping one without restating the other **fires a false ACTION-NEEDED email at the owner.** Never ship one half. | 4 | Settled. Build it. |
| D | Blog hub pagination: their client pagination cuts 749 crawlable links to 108. | 3 | Keep their template, set posts-per-page to the full count. Design intact, crawl path intact. |
| E | Seven-field `LeadForm`. Their named biggest conversion lever; their fix is staging, not deleting. | 6 | Out of scope for this migration. Log it as its own experiment. |
| F | `SpecialistWidget` auto-open after 600ms, covering ~⅓ of a 1440px viewport. The one genuinely interruptive surface on the site. Not the designer's. | 2 | Raise it, do not change it in this migration. |
| G | ATED as a sixth tax card on `/landlord-tax`. Designer states you never signed the tax claim off. Correct against house positions; we are missing it. | 6 | Adopt it. It is right and we are the ones who are wrong. |
| H | ~~`StatsCounter` asterisk scope / substantiation~~ **ANSWERED 2026-08-22: signed off.** The owner was shown the four claims verbatim and confirmed they are reliable. The claims, from `src/lib/site-stats.ts:11-16`, now rendering on 12 pages (was 2 before the redesign): **100+ Landlords served · 24hr Response time · £2.4M+ Tax savings identified · 100% Property-only focus**. Consistent with the "inside 24 hours" wording we kept over the designer's "one working day". **One residual, raised and not blocking:** £2.4M+ is the only one of the four not trivially reconstructable from records, so if it is ever challenged the derivation needs to exist. Owner to note where it lives, once. The asterisk itself was applied in Phase 6 gap closure via `ExampleFigureNote`, with seven components deliberately left bare and reasons recorded. | 6 | Settled. |
| I | Two content facts the designer asked for across six sessions and never received: a fee figure on `/services/property-accountant` and an `/incorporation` FAQ answer. | 6 | Needs you. Nothing else unblocks them. The fee element is currently absent cleanly, not stubbed. |
| L-RESULT | **DATA IN, 2026-08-22. The defensible figure is a COUNT, not a value.** Full working: `reports/15_property_value_claim.md`. **Recommended tile: `280+` / "Properties enquired about".** Property VALUE fails on evidence: 10 of 158 enquiries ever stated one (6.3% coverage), one enquiry is 28% of the £12.3M total, top 3 are 63%, and one is arguably self-identifying. Averaging to ~£72M is **97% estimated** - rejected. The COUNT is sound: `leads.role` is a self-declared portfolio band on **158/158 rows**; counting every band at its bottom edge with developers at zero gives a guaranteed-understated floor of **280** (qualified-only: 162). 0% estimated, one SQL statement, no row above 11%, monotonic, rises ~30/month, and a rounded "+" survives a year on 12 pages with no maintenance. Wording is binding: say **enquiries**, never *clients*, *advise* or *manage*. | 8 | **APPROVED by owner 2026-08-22. Build it in Phase 8.** Replace `site-stats.ts:14` with the count tile: target `280`, suffix `+`, label `Properties enquired about`, no `£` prefix, no decimals. Re-derive the 280 from live data at build time of the change (it rises ~30/month, so confirm the floor still holds), record the SQL in the file's docstring so it is re-runnable, and confirm the rendered tile reads correctly on a sample of the 12 pages. Decision M ("Landlords served") is SEPARATE and still open - do not touch that tile in the same commit. |
| M | **NEW, RAISED 2026-08-22, owner decision needed. "100+ Landlords served" may be unevidenced.** The L investigation established that **no client records exist anywhere in the estate** - Property is lead-gen, enquiries are handed to a partner firm, nothing reports back. Decision H signed the four stats off as reliable BEFORE this was known, so this is new information against an answered question, not a re-ask. "Served" reads as a client claim we cannot currently evidence. Supportable alternatives at n=158: "Landlord enquiries handled", or keep "100+" and change only the label. Same file, same 12 pages, one line. **Do not change it without the owner.** | 8 | Owner's call. Recommend re-wording the label, keeping the number. |
| L | **NEW 2026-08-22. Replace the "£2.4M+ Tax savings identified" stat.** Owner: the figure is not reconstructable from records, so swap it for one that is. His framing, chosen after review: **property value represented by enquiries we have handled** - derived from properties people have actually told us about, averaging where values are missing. Feasibility and the honest candidate figures are in `reports/15_property_value_claim.md` (read-only investigation, run 2026-08-22). **Label agreed: "Property enquired about"** (matches the two-to-three word register of the other three tiles; avoids any verb implying work performed or advice given). Alternatives considered and not chosen: "Enquiry property value", "Property value handled". **Conditions:** the figure must exclude test leads, spam and duplicates; no single client may dominate the total (aggregate must not be identifying); if averaging materially drives it, the tile carries "Est." or the `ExampleFigureNote` substantiation note; and the derivation query is written down so it can be re-run. **If the data does not support a defensible figure, the tile comes out and the strip runs with three** - a defensible small number beats an impressive unsupportable one, and three honest tiles beat four with a soft one. One-line change to `src/lib/site-stats.ts:14`, rendering on 12 pages. | 8 | Settled framing and label; figure pending the data. |
| J | Toggle `field.help` fix — 13 sites, 95 toggles, 48 with help text never shown. | Separate | Not part of this port. Its own change, its own gate. |
| K | Second competing redesign spec: `docs/Property/REDESIGN_ARCHITECTURE.md`, internal, 2026-07-03, never signed off, targets the same five core pages. | 1 | Confirm it is dead, then archive it so it cannot be picked up by a future session. |

---

## 2. Standing rules for every phase

1. **One phase, one branch, one tag.** Branch from `expansion/new-sites-2026-08`. Tag at
   phase end. Rollback = revert the tagged range, re-run the Tier 2 gate, confirm every
   number is back to baseline.
2. **Never deploy.** Every phase ends local. Production is Phase 9 and it is
   owner-triggered in the turn it happens.
3. **Every file taken from their tree gets a facts pass** against
   `docs/Property/house_positions.md` before it is committed. The golden tests do not
   catch copy figures — their `£6,250` first-time-buyer error is the proof.
4. **Every file taken from their tree gets a "did we change this after 16 July?" check**
   (`git log --oneline 1d68a570..HEAD -- <path>`). Their tree is a July fork, so anything
   we deliberately deleted or fixed since is sitting in it, restyled and looking current.
5. **The link-count check is binding.** Unique outbound internal links per page must be
   **≥ the current live count**, on every page the phase touches. One grep. It protects
   the only thing in this migration that is genuinely hard to rebuild.
6. **No new monitor, alert, cron, email, digest, popup, modal, toast or banner**, and no
   change to an existing one's cadence or recipients. This includes on-site interruptive
   UI. The verification scripts must never be scheduled or promoted into CI.
7. **Update `reports/14_completeness_audit.md`** whenever a phase changes a file's
   disposition. That table is the coverage proof; a stale table is a broken promise.
8. No em-dashes in user-facing copy. Code, commits and PRs exempt.

### The gate

Defined in full in `reports/11_verification_harness.md`, with today's measured baselines.

- **Tier 1, ~75s, every commit:** `npx tsc --noEmit` (baseline **0 errors** — any failure
  in a ported file is a defect, not noise), targeted `eslint`, `npx vitest run` (1484
  pass), em-dash grep.
- **Tier 2, ~4m30s, per phase:** full lint (baseline 0 errors / 32 warnings), `next build`
  (902 static pages), `check_dependency_closure.py` (19 sites), `predeploy_gate.py`,
  `scripts/sweep.mjs` (98 URLs, 712 links), `scripts/browser_check.mjs` (0 overflow at
  390px, contrast baselined).
- Both new scripts are regression-baselined. Re-baselining requires a written note in the
  phase log saying why.

---

## Phase 0 — Live defect fixes

**Independent of the migration. Nothing here depends on the design system, and every item
is live in production today.** Ship as its own branch so it can go out ahead of everything
else, or fold into Phase 1 if you would rather batch. Each item is revertible in a line.

**Evidence:** reports 04, 05, 06, 09, 11, 13.
**Estimate:** 0.5 day. **Entry:** none. **Owner decision:** none required.

| # | Defect | Fix | Verified how |
|---|---|---|---|
| 0.1 | **Invisible form labels on ~783 articles.** `BlogPostRenderer.tsx:290-304` renders a bare `LeadForm` on `bg-slate-900`; labels are `text-slate-900`. Contrast ratio measured at **1.00**. Reads as nine unlabelled white boxes. | White card around the form (their fix). Call site, not component — 20 of 21 Property `LeadForm` sites are already light, and inheritance would still leave the consent copy and privacy link unreadable. | Production HTML fetched; contrast measured by `browser_check.mjs` |
| 0.2 | **Same bug live on two sibling sites.** `generalist/BlogPostRenderer.tsx:323`, `generalist/FundamentalsRenderer.tsx:176`, `digital-agency/BlogPostRenderer.tsx:290`. | Same one-line fix ×3. | Source read |
| 0.3 | **`/blog/property-accountant-services` has never rendered.** Slug keyed in both `SLUG_TO_CATEGORY_MAP` and `DUPLICATE_REDIRECTS`; the redirect wins. A 197-line hub with 63 crawlable links, in our sitemap, 301'd away since it shipped. | Delete the two shadowing entries (`middleware.ts:165`, `:423`) + a dev-only collision assert. | 301 verified live |
| 0.4 | **57 posts serve the wrong enquiry CTA; 7 MTD posts lose their countdown.** `CTA_BY_CATEGORY` is keyed on raw frontmatter and 3 categories carry a 2-way spelling split. | Re-key the map on `categorySlug`. Fixes all three symptoms at once. `categoryDisplayName()` does **not** fix this. | Causation proven live on one hub |
| 0.5 | **`/embed` gallery renders with no header or footer.** `PageShell.tsx:17` tests `startsWith("/embed")`, catching the public gallery itself. We made that page explicitly indexable. | Trailing slash: `"/embed/"`. Their fix. | Source read, found by 3 agents independently |
| 0.6 | **Wrong-brand icons live on Property.** `icon.png` and `apple-icon.png` are byte-identical to each other and are the Dental Finance Partners tooth mark. | Take their green-house set (this is also Phase 2 work; do it here if Phase 0 ships alone). | Binary compared |
| 0.7 | **Site-wide em-dash in user-facing copy** — brand wordmark `sr-only` tagline, `BrandWordmarkHomeLink.tsx:35`, `BrandLogoHero.tsx:24`. One per page, 103 across the sweep. | Replace with a comma. | Sweep output |
| 0.8 | **`journeyModel.ts:74`** casts `JSON.parse(sessionStorage)` to a type without validating. The widget mounts above `app/error.tsx`, so a throw gives the visitor a full-screen Application Error. Never fired. | One line in the shared `load()` gate all four callers route through, plus a vitest feeding it corrupt values. | Traced; 90d telemetry shows zero occurrences |
| 0.9 | **`niche.content_strategy` dereferenced unguarded in 5 client components.** 21 production `client_error` rows show `niche` genuinely undefined in some bundles. In the widget it sits inside the async submit handler, so it does not break the page — **it leaves the button stuck on "Sending..." and costs a lead.** | Guard the 5 call sites. | Telemetry |
| 0.10 | **Duplicate `BreadcrumbList`** emitted on all five pillar pages (inline block + `<Breadcrumb>` component). | Remove the inline block. | Source read |

| 0.11 | **`/embed` breadcrumb invisible.** `app/embed/page.tsx:53-60` renders `<Breadcrumb>` on `bg-slate-900`; terminal crumb `text-slate-900` measures ratio **1.00**, Home link 2.35. Pre-existing, same class as 0.1, on the surface 0.5 just restored. Found by the Phase 0 fidelity review, not by the builder. | Same treatment as 0.1: light surface, or the dark-surface breadcrumb variant if one exists. **Audit every other `<Breadcrumb>` on a dark surface in the same pass - fix the class, not the instance.** | `browser_check.mjs` contrast measurement |

**Gate:** Tier 1 + Tier 2. Plus: re-fetch the three affected article surfaces and confirm
label contrast is no longer 1.00; confirm `/blog/property-accountant-services` returns 200
and its 63 links resolve; confirm the 57 posts now render their category CTA.

**Rollback:** each item is an independent commit. Revert individually.

### Phase 0 closure record

**Builder:** 11 commits, all 10 items DONE, Tier 1 and Tier 2 pass. Every delta an
improvement: label-contrast findings 14 → 0, rendered em-dashes 103 → 6, internal link
targets 712 → 761, tests 1484 → 1495 (two new safety checks, both verified to fail when
their fix is reverted). No baseline re-saved. Log: `logs/phase_0.md`.

**Fidelity review:** FAITHFUL-WITH-GAPS. 4 of 4 design-touching items delivered faithfully
(white form card character-identical to theirs; icons sha256-identical; `/embed/` prefix
fix identical). 0 diluted. 1 dropped: `favicon.ico`. All designer standing rules held.
Carve-out 5 confirmed honest on 0.3 and 0.10 — the combined diff contains no JSX, className
or copy change, so it was not used as cover for keeping our old design.
Log: `logs/fidelity_0.md`.

**GATE EXCEPTION, recorded not waived.** `EXECUTION.md` §9.4 requires FAITHFUL before a tag.
Phase 0 is tagged at FAITHFUL-WITH-GAPS because **the sole gap is `favicon.ico`, which the
owner deferred to Phase 2 by explicit decision on 2026-08-22**, after the builder finished
and before the review reported. The gap is an owner scheduling choice, not unfinished work,
and Phase 2 item 5 carries it with the 256px regeneration requirement attached. No other
phase may borrow this precedent: a gap is only deferrable if the owner has already chosen
to defer it, in writing, to a named later phase.

**Two divergences recorded as acceptable, both with a downstream consequence:**
- 0.7 used a comma where the designer used a colon (`BrandLogoHero.tsx:24`), and the
  designer additionally deleted the `sr-only` span entirely in `BrandWordmarkHomeLink.tsx`
  as part of an aria-label rebuild. The comma is permitted by their own copy rule (report
  12 §3.3 #25). **Phase 2 must NOT treat `BrandWordmarkHomeLink.tsx` as already ported.**
- `middleware.ts:541-552` hand-types 10 hub slugs. `lib/blog.ts` imports `fs`, so no
  edge-safe registry exists to derive them from. Defensible, but it is a drift point:
  a new category means a manual edit here. Revisit if an edge-safe registry ever lands.

---

## Phase 1 — Foundation: tokens, CSS, layout primitives

The clean core. **Zero monorepo conflicts across the whole phase.** Report 02 measured
Tier 0 + Tier 1 at 12 files and ~700 lines. Everything downstream depends on this.

**Evidence:** reports 01, 02, 14. **Estimate:** 1.5 days.
**Entry:** DECISION A answered. Phase 0 merged or explicitly deferred.

**Work**

1. **`globals.css` delta — 3 hunks, 391 diff lines.** The +367 appended lines are purely
   additive animation utilities (11 groups, all `data-draw`/`data-glow` scoped).
   - **CARVE-OUT 6, do not port:** their deletion of
     `@source "../../../../packages/web-shared";`. They had no such package; we do. Losing
     it stops Tailwind generating classes for every shared component, and it fails
     *silently* — the build stays green and the styling goes.
2. **The `<noscript>` block, `layout.tsx:90-102`** — 10 CSS rules keyed on
   `[data-draw="off"]` that release the storytelling animations when JS is off. Seven
   components set `data-draw`. **Porting those components without this block renders every
   animated section collapsed for no-JS users and non-JS crawlers.** Found only by the
   completeness audit. Port it in the same commit as the first animated component.
3. **`layout-utils.ts`** — the button system. Their flat `rounded-xl` treatment replaces
   our chunky `border-b-4` press-down buttons on every CTA on the site. Cannot be ported
   incrementally. Orphans the `border-blue-800` overrides on the homepage hero
   (`page.tsx:331`) — clean those in the same commit.
4. **`page-blocks.tsx`, `EyebrowRule.tsx`, `HeroBrickBackdrop.tsx`, `ExampleFigureNote`,
   `ScrollGlowGroup`, `FaqSection`, `CardCarousel`, `accordion` alignment.** Straight
   ports, no conflicts. `HeroBrickBackdrop` alone unlocks 19 pages at 43 lines and no deps.
5. **Radius decision.** `--radius: 0rem` with `--radius-xl: calc(var(--radius) + 4px)`,
   identical in both trees, so **`rounded-xl` renders at 4px and `rounded-lg` renders at
   0px.** Their entire rounded-corner sweep across 24 files is a 0px → 4px change. Eleven
   handoff docs never mention the radius scale, so they may not have known. Port the sweep
   as-is (Rule Zero), and raise with the owner separately whether `--radius` should move —
   it is a one-line change and it is the actual lever.
6. **NOT in this phase: the `h1..h6` `@layer base` fix.** `globals.css:155-159` is
   unlayered and beats every Tailwind heading utility site-wide; we already carry 76
   heading tags with utilities that have never rendered. Fixing it shifts headings on every
   route. It goes in Phase 8, alone, so the shift is attributable.
7. Confirm and archive `docs/Property/REDESIGN_ARCHITECTURE.md` (DECISION K).

**Gate:** Tier 1 + Tier 2. Plus: `browser_check.mjs` confirms no layout regression at
390px; confirm shared-component classes still generate (spot-check a `web-shared` button
renders styled — this is what the `@source` line protects); confirm animated blocks render
released with JS disabled.

---

## Phase 2 — Chrome and brand

Everything that renders on every page. High blast radius, low content risk.

**Evidence:** reports 01, 04, 07, 12, 14. **Estimate:** 2 days.
**Entry:** Phase 1 tagged. **Owner decisions:** B (footer credit), F (widget auto-open, raise only).

**Work**

1. **`SiteHeader`.** Both sides built a dropdown from the same 26-line base, so neither can
   be taken whole. Base on ours — the CTA-variant machinery and `data-cta-*`
   instrumentation are live and reversible by one flag. Port in their registry-derived
   Calculators `groups`, the `nav` prop, and the `md:` → `lg:` breakpoint. Merged nav tree
   is in `reports/04_heavy_conflicts.md` §2.1: our 10 Resources children plus their
   Landlord tax index, self-referential first children per group (required because our
   trigger is a `<button>`, not a `<Link>`), Contact restored top-level **only if** the
   `lg:` breakpoint comes with it.
   - **Keep our click-toggle. Their hover-only trigger is a touch trap at tablet width.**
     This is the one place a design decision is being overridden, and the reason is
     accessibility, not taste.
   - The mega-menu spans 5 files (report 14 §7). Port them together.
2. **`SiteFooter`.** Take theirs. Two constraints: theirs assumes `footer_links` is
   legal-only and ours has 18 entries; and it carries the Double Wired Creative credit
   (DECISION B — dofollow sitewide external link on 800+ pages, `rel="noopener noreferrer"`
   only).
3. **`PageShell`** — includes defect 0.5 if Phase 0 did not ship.
4. **`layout.tsx`** — manual merge.
   - **CARVE-OUT 3, do not port:** their `layout.tsx:117-119` still passes
     `clarityProjectId`. Microsoft Clarity is a locked PECR decision. Found independently
     by reports 04, 07 and 09. It would also fail typecheck, so the gate catches it — but
     do not rely on that.
   - Port the `<noscript>` block if Phase 1 did not.
5. **Brand assets.** Take their green-house `icon.png`, `apple-icon.png`, `favicon.ico`
   (ours are the wrong brand entirely), plus `specialist-avatar.jpg`. Their files are ~100x
   smaller; that is a correct optimisation, not a downgrade.
   - **`favicon.ico` deferred here from Phase 0 by owner decision, 2026-08-22.** Phase 0
     took `icon.png` and `apple-icon.png` and left the favicon as the old black-circle
     placeholder, so **the tab icon and the app icon are currently different marks.** That
     is a known temporary state between Phase 0 and here, and closing it is this phase's
     job.
   - Their `favicon.ico` is brand-correct but **drops the 256px entry**. Regenerate a 256
     from their green-house mark rather than shipping a downgraded icon set. Verify the
     finished `.ico` carries the full size ladder and that all three marks are visually the
     same logo at 16px, 32px, 180px and 256px.
6. **`.logo-house`** — the lucide house in the wordmark plus its self-drawing stroke
   animation live in `BrandWordmarkHomeLink.tsx` and `globals.css:387+`. Port as a pair.
7. **`niche.config.json` and `src/config/site.ts`.** Key by key, ours wins everything
   except navigation.
   - **CARVE-OUT 3, two hard blocks:** their `partner` block is the pre-`4107b377` DJH
     snapshot and would name DJH in rendered consent text; their
     `enquiry_retention_months: 3` would undo the 24-month legal decision. Three separate
     reports independently called this the most dangerous file in the port.

**Gate:** Tier 1 + Tier 2. Plus: nav tree walked at 390px, 768px, 1024px, 1440px;
every header and footer link resolves (sweep covers 712); `grep -r clarity` returns nothing
in Property; `niche.config.json` diffed key by key against the pre-phase version and every
change explained in the phase log.

---

## Phase 3 — Blog subsystem

**The highest-leverage phase in the migration.** One template renders ~783 articles, so a
correct port here changes the whole content estate in one commit.

**Evidence:** report 05. **Estimate:** 2.5 days.
**Entry:** Phase 1 tagged (needs `Eyebrow`/`page-blocks`, `HeroBrickBackdrop`,
`BlogSidebarCta`, `LeadCTAPanel` — all four are in the no-conflict set).
**Owner decision:** D (hub pagination).

**Work**

1. **`BlogPostRenderer` — take theirs wholesale, re-apply our four changes.** Our −86 lines
   are entirely non-visual (three split helpers extracted to `web-shared` in `ec38f821`,
   a `GateOrForm` prop change, the packages-mode CTA fork). Zero markup conflict.
   - **TRAP:** their file still carries the pre-extraction split functions locally. A
     verbatim port silently forks logic that now lives in the shared package.
2. **`/blog` index, `BlogListWithSearch`, `NumberedPagination`, `HubArticleList`,
   `BlogSidebarCta`, `TableOfContents` sticky restructure** — take theirs.
   - The blog `aside-cta` CSS/renderer pair and the sticky TOC pair each span two files
     (report 14 §7). Port each as a pair.
3. **The nine topic hubs onto `BlogCategoryHub`.** Their copy-verbatim claim holds for
   prose on all nine (paragraph counts match, entities decoded, JSON-LD graph shape
   preserved). Three things to restore: `CollectionPage.name` degrades on seven hubs,
   per-article dates disappear, and `LeadCTAPanel` adds three unsigned-off proof points.
   Re-apply our post-snapshot metadata titles on all nine and seven punctuation choices;
   keep theirs on two en-dash rewrites we never made.
4. **DECISION D — CARVE-OUT 5.** Their `HubArticleList` paginates client-side with no
   `<a href>`, capping each hub at 12 in the DOM. Verified live: our hubs currently
   server-render 163 / 160 / 54 links. That is **749 → 108 across nine hubs**, and since
   `/blog` only exposes 24, the hubs are the only full HTML crawl path to 783 articles.
   **Keep the template, set posts-per-page to the full count.**
5. **`lib/blog.ts` `categoryDisplayName()`** — take it, extend their 9-category map to our
   10 (`property-finance`, 34 posts, missing from theirs). It is total, so adoption breaks
   nothing, but **five of the sixteen `post.category` call sites must not be converted** —
   listed with reasons in report 05.
6. **Property Finance — bring the whole category to designer parity.** Owner decision,
   2026-08-22: *"the property finance posts we will want to bring up to the designers
   parity."* This is no longer a one-hour hub port. The category is our 10th, 34 posts,
   shipped after the snapshot and therefore **invisible to the designer** — it is the one
   part of the blog they never designed. Treat it as the tenth sibling and give it
   everything the other nine have:
   - `/blog/property-finance` as a 10th `BlogCategoryHub` call site.
   - Hub copy in their established pattern: cream brick hero (breadcrumb, h1, standfirst,
     CTA pair), the "The essentials" ruled-rows block with `intro` + `sections[]`, and the
     "Browse other topics" chip band. Model the structure on their nine, do not invent a
     tenth layout.
   - **`CTA_BY_CATEGORY` entry** — the 34 posts currently have no entry at all and fall
     through to the generic CTA. Phase 0 fixed the keying bug; it could not invent copy.
     Needs a heading, body line and button label.
   - `CANONICAL_CATEGORY_NAMES` entry (their map has 9, we have 10).
   - `CATEGORY_ICONS` entry for the topic card on `/blog`.
   - Inclusion in the "Browse other topics" band on all nine existing hubs, so the parity
     is two-way.
   - **Copy is Opus-written, in the designer's established voice, following the pattern of
     their nine.** Do not ask the owner to draft it. Do surface the finished CTA copy and
     hub standfirst in the handback for his review, since it is the one piece of net-new
     brand voice in this phase.
   - Facts pass applies: the category covers property finance, so any figure in the hub
     copy must be re-derivable against `docs/Property/house_positions.md`.
7. **`font-serif`** — zero in theirs, **34 in ours across 6 files**. Their sweep covered
   five of the six. `src/app/page.tsx:590` (a decorative `aria-hidden` quote glyph) is not
   in their manifest: keep-or-replace decision, one line either way.
8. City posts: **ours wins outright.** We deleted all five in `bbfe0437` and they 301
   correctly to `/locations/<city>`. Their edit is a single `href` swap per file pointing
   at the very page our consolidation created.

**Not a risk, measured:** client payload. The worst hub is 170 KB against the 19 MB
`FALLBACK_BODY_TOO_LARGE` ceiling — 0.9% of budget. `dynamicParams = false` already set.

**Post delta is +91 / −5**, not 86. No post breaks under their template. `dateModified` is
absent on 31 of the 91, guarded, so they render fine but can never show the new "Updated"
recency pill.

**Gate:** Tier 1 + Tier 2. Plus: crawlable-link count per hub ≥ live baseline (this is the
binding check for DECISION D); all 10 hubs 200; sample 20 articles across all 10 categories
and confirm the correct category CTA renders; confirm the split helpers resolve to the
shared package and not to a local fork.

---

## Phase 4 — Calculators

**Evidence:** reports 13, 09, 07. **Estimate:** 2.5 days.
**Entry:** Phase 1 tagged. **Owner decision:** C (five separable gating decisions).

**Work**

1. **Take their presentation. `CalculatorTabs`, `HeldResult`, `CalculatorLinkCards`,
   `CalculatorPageResources` rewrite, premium components, the 24-file token sweep.**
2. **CARVE-OUT 5 — `CalculatorTabs` renders `<button role="tab">`, not `<a href>`.** It
   ships on 11 pages and every one loses its crawlable links to `/calculators/*`. **The
   designer wrote `CalculatorLinkCards` to fix exactly this, argued it in the docstring,
   and never wired it.** Wire it. Their own unshipped fix, and it makes the link-count
   check pass without fighting their design.
3. **CARVE-OUT 1 — the facts pass matters most here.** Their
   `first-time-buyer-stamp-duty-calculator.ts` still says relief is "up to £6,250". The
   correct figure is £5,000 (fixed in `f7794767`, confirmed against `house_positions.md`).
   **The golden suite does not catch it, because it is copy, not computation.**
   Otherwise: **the designer changed no calculation logic at all** — all nine of their tool
   edits are em-dash removals inside copy strings. Verified across the full diff.
4. **CARVE-OUT 5 — keep our page bodies.** Their `[slug]` page loses our worked-examples
   and related-reading blocks (7 tools use them); their SDLT page loses 7 of our 8 `<h2>`s
   plus the FAQPage schema. Take their component-level changes into our pages.
5. **DECISION C — the gating model, five separable calls.** Today we do not gate the five
   bespoke calculators at all; premium tools gate on blog only, once per session, nothing
   persisted. Theirs gates every on-site calculator every time, holds the real result
   behind frosted glass, persists reveals per calculator in sessionStorage, deletes
   `CalcResultCta`, and drops the calculator-page `GateOrForm`.
   - **Recommendation: take the visual treatment, defer the behaviour change.** It is an
     unvalidated conversion decision by the designer's own admission, and it breaks the
     `calc_result` / `calc_result_gate` series.
   - **NOISE RISK, paired change:** deleting `CalcResultCta` kills the `calc_result`
     form ID, which is still in `MINIFORM_FORM_IDS` and inside `deploy-watch`'s baseline
     of 15. **Dropping one without restating the other fires a false ACTION-NEEDED email
     at the owner.** Never ship one half of this.
6. **`nav.ts:40` signature fix** — theirs calls `toolPath(tool)` where ours takes a slug,
   which would emit `/calculators/[object Object]` across their whole nav. Their own test
   file contradicts it. One line.
7. **Registry counts self-correct** — their "16 calculators" band interpolates
   `TOOLS.length`. Ours is 26 and correct. Their test file asserts 16; do not port that
   assertion.
8. **Embeds — treat as outward-facing.** No positive evidence of any live embedder (zero
   partner-embed click-throughs across 734,921 events since 5 June), **but `/embed` is on
   the analytics no-track list, so that is inference, not proof.** The `ptp-embed-height`
   wire contract is untouched; the exposure is cosmetic drift inside iframes on other
   people's sites. **Before Phase 9 ships anything that changes embed output, run a Vercel
   referrer-log check.** Breaking a widget on someone else's site is not reversible from
   our end.

**Gate:** Tier 1 + Tier 2. Plus: goldens (241 cases in that file — 1484 is the whole
suite); crawlable calculator links ≥ baseline on all 11 `CalculatorTabs` pages; facts pass
on every tool copy string; `deploy-watch` baseline count reconciled against
`MINIFORM_FORM_IDS` in the same commit; embed height postMessage verified locally.

**Noted gap, not this phase's job:** premium tools have zero golden coverage.

---

## Phase 5 — Secondary pages

Everything that is neither chrome, blog, calculators nor a forked pillar page.

**Evidence:** report 04. **Estimate:** 3 days. **Entry:** Phases 1 and 2 tagged.

| Page | Verdict |
|---|---|
| `/` homepage | TAKE THEIRS + reapply our delta |
| `/services` (index) | TAKE THEIRS + reapply |
| `/incorporation` | TAKE THEIRS + reapply |
| `/about` | TAKE THEIRS + reapply |
| `/contact` | TAKE THEIRS + reapply |
| `/property-tax-rates` | TAKE THEIRS + reapply |
| `/locations` and `/locations/[slug]` | KEEP OURS + their styling (we added 766 lines here) |
| `/embed` | KEEP OURS + their fix |
| `sitemap.ts` | **KEEP OURS OUTRIGHT** — strict superset, and theirs lost our `if (post.noindex) continue` guard |
| Legal pages (privacy, terms, cookie) | TAKE THEIRS (font-serif sweep) + reapply our privacy edits |
| `lib/nav.ts`, `site-stats.ts`, `calculators/nav.ts`, `essential-guides.ts` | Clean take-theirs, zero monorepo commits |
| `content/resources/stamp-duty.md` | 18 of 20 lines are em-dash removal (take); 2 rewrite FAQ `<h3>`s out of natural-query form (carve-out 5: keep the query shape, take only the em-dash fix) |

**Verify first (report 12):** the designer claims our *live* homepage runs four inline
calculators each carrying a duplicate capture form. If true, that is four extra forms in
production and it changes how the homepage port is scoped. Check before starting.

**Gate:** Tier 1 + Tier 2, plus the link-count check per page and a facts pass on
`/property-tax-rates`.

---

## Phase 6 — The seven forked pillar pages

`/landlord-tax` · `/making-tax-digital-landlords` · `/section-24` ·
`/services/property-accountant` · `/services/landlord-accountant` ·
`/services/non-resident-landlord` · `/services/property-tax-advice`

**Seven, not eight** — `/services` is Phase 5.

**Evidence:** report 03. **Estimate:** 43-57h for the pages + 12-18h once for 29 missing
shared components (~3,300 lines, none currently in the monorepo).
**Entry:** Phases 1, 2, 4 tagged. **Owner decisions:** G, H, I.

**The shape.** Their pages are a re-presentation of our prose — whole data arrays
character-identical, every FAQ set byte-identical, every worked example carrying our
arithmetic unchanged. So the instruction is not "choose a side", it is:

> **Keep our content and our head, take their layout and their genuine additions, restore
> every link they dropped.**

The trade is symmetrical and the merge takes both halves:

| | Ours | Theirs |
|---|---|---|
| Unique outbound internal links | 135 | 52 |
| Deep links into blog clusters | 72 | **0** |
| JSON-LD types | Article, BreadcrumbList, Service, FAQPage | FAQPage only |
| hreflang / twitter card | 3 / 6 pages | 0 / 0 |
| On-page lead forms + `data-cta` | 0 | **7 forms, ~30 CTAs** |

Our own audit from 17 August put our internal links per page at 22-55 against the ranking
competitor's 158-193, with **zero** links from all 760 blog posts into `/landlord-tax`,
`/section-24` or `/making-tax-digital-landlords`. These seven pages are the only authored
equity flowing outward into the clusters. Carve-out 5 is why the link floor is binding.

**Sub-phases, one page each, in this order:**

| Order | Route | Base | Notes | Hours |
|---|---|---|---|---|
| 6.1 | `/services/property-accountant` | **theirs** | The one page to build from their version: better funnel, near-identical copy. Port our metadata + `hasOfferCatalog` + Related reading back in. DECISION I (fee figure). | 4-6 |
| 6.2 | `/section-24` | ours | Take their before/after mechanism panel. **Reject `CardCarousel` here** — it hides our 4 route cards' 10 blog links. | 6-8 |
| 6.3 | `/services/property-tax-advice` | ours | Take their section ordering, keep both their prompts and our scenarios. | 5-7 |
| 6.4 | `/services/landlord-accountant` | ours | Their rewritten buy-to-let/portfolio prose is better than ours; adopt the strings, re-insert the 11 links. | 7-9 |
| 6.5 | `/landlord-tax` | ours | 3 fact patches + DECISION G (adopt ATED). Loses 12 anchors and the wave-11 `/landlord-compliance` wiring if taken raw. | 8-10 |
| 6.6 | `/making-tax-digital-landlords` | ours | Worst link ratio, 14 → 3, on the hub the head-asset map calls most time-sensitive. Adopt their new specialist-comparison table. | 7-9 |
| 6.7 | `/services/non-resident-landlord` | ours | **Ship last and alone.** Our only HAVE-WINNING asset (124,800/mo, GSC pos 7.2). 23 → 8 links, deletes the whole NRL blog rail. Only page where theirs is factually *thinner* — the April 2015/2019 rebasing dates are gone. | 6-8 |

**Before 6.1: the component-placement map.** 14 bespoke components are consumed only by
these seven pages. "Keep ours, re-skin" leaves them homeless, and report 14 names this the
largest silent-loss risk in the migration. Write the map first: for each of the 14, which
of our sections it replaces on which page. If a component has no home, that is a decision,
not an oversight — record it.

**Facts.** Zero cases of their copy being stale. Six cheap back-patches in report 03 §8.4,
**four of which are defects on both sides**: unqualified 60-day CGT rule; s.162 relief now
claim-only under FA 2026; MTD £20,000/2028 step missing outside the MTD page; "3%
surcharge" wording against a do-not-write rule.

**Re-check before adopting their retitles:** `expansion_research/_prop_audit_2026_08_05/
wave_brief_shared.md` (commit `bbfe0437`) mandates the three schema types they dropped,
mandates "link 4-8 relevant existing blog posts in-body", and states our titles were set
against a cannibalisation matrix the designer never saw.

**Gate, per sub-phase:** Tier 1 + Tier 2. Plus, and these are hard: unique outbound
internal links ≥ live baseline; all four JSON-LD types present; hreflang and twitter card
preserved; facts pass against house positions; and for 6.7 a manual read against the
head-asset map before it is tagged.

**Six open questions** in report 03 §9 — titles vs the collision matrix, tabs-vs-links, a
changed service promise ("24 hours" → "one working day"), `StatsCounter` claims landing on
seven more pages, and a hand-set `live: true` flag on the MTD calendar tiles that expires
6 April 2027 with nothing deriving it from the clock.

---

## Phase 7 — The pages and calculators they never saw

**Evidence:** report 10. **Estimate:** 1.5 days + calculator sweep.
**Entry:** Phases 1-6 tagged.

1. **Six pages:** `/cost-of-selling-a-property`, `/leasehold`, `/landed-estates`,
   `/landlord-compliance`, `/for-letting-agents`, `/blog/property-finance`.
   Five of the six are one template written five times, and they already import
   `btnPrimary`/`btnSecondary`/`siteContainerLg`, `CTASection` and `Breadcrumb` — **so
   Phase 1 re-skins them for free.** This phase is the deliberate pass to confirm that and
   close the gaps. `/blog/property-finance` was done in Phase 3.
2. **Ten unseen calculators.** They have 16, we have 26. Bring the ten post-snapshot tools
   into the new presentation.
3. ~~**`CTASection` is live on 16 pages, including four of these six. Do not delete it** —
   the designer's dead-component list was written without sight of them.~~
   **SUPERSEDED, and the premise was wrong.** "16 pages" came from reports 02/06 and was
   already stale when written. Measured at the start of Phase 7 it was **four** pages, and
   all four were inside Phase 7's own scope. Phase 7 moved all four to `LeadCTAPanel`,
   leaving zero consumers; Phase 8.8 deleted the file (`be18008f`), with the designer's own
   tree (zero `<CTASection` consumers) as the Rule Zero (b) evidence and git history as the
   undo. Do not "restore" it. See `reports/14_completeness_audit.md` row 194.

**Gate:** Tier 1 + Tier 2, plus a visual walk of all six at 390px and 1440px against the
Phase 1 design system, and the link-count check.

---

## Phase 8 — Cleanup and the deferred structural fix

**Evidence:** reports 01, 02, 12. **Estimate:** 1.5 days. **Entry:** Phases 1-7 tagged.

1. **The `h1..h6` `@layer base` fix.** `globals.css:155-159` is unlayered and beats every
   Tailwind heading utility for weight, line-height and letter-spacing, site-wide,
   silently. Measured empirically: every h1/h2/h3 on the site renders exactly 700 / 1.2 /
   -0.02em. We already carry **76 heading tags with utilities that have never rendered**
   (53 `font-semibold`, 21 `leading-*`, 3 `tracking-*` — a lower bound).
   **Own commit, own gate, after everything else**, so the heading shift on every route is
   attributable to one change. Verify with `getComputedStyle`, not screenshots.
2. **Dead components** — `CardStack` (dead both sides) and the residue of the designer's
   list. `ResourceGate`/`ResourceGateLazy`/`ExcelPreview` are already gone and stay gone
   (carve-out 2). ~~`CTASection` stays.~~ **`CTASection` was DELETED in Phase 8.8
   (`be18008f`)**: the "live on 16 pages" premise behind "stays" was stale even when
   written (four consumers at the start of Phase 7, all four in Phase 7's scope), Phase 7
   moved all four to `LeadCTAPanel`, and the deletion is faithful to the designer, whose
   tree also has zero consumers. Git history at `be18008f^` is the undo.
3. **Doc corrections found during the investigation, all currently wrong:**
   - `docs/Property/PROACTIVE_ASSISTANT_BRIEF.md` says "DESIGN-ONLY, no code written" for
     a surface that opened **16,814 times** last quarter.
   - `docs/Property/LEAD_CAPTURE_MAP.md` — three stale claims (ResourceGate live,
     MiniCapture path, exit_intent live; the last was removed 2026-07-09).
   - `packages/web-shared/package.json:42` exports `./analytics/react/Clarity` pointing at
     a file that does not exist. Inert (nobody imports it) but it fails at **build**, not
     lint, for whoever imports it first. The dependency closure check skips those
     specifiers by design, so only a real build catches it.
   - Confirm whether the Weekly Optimisation Engine is running — our records say disabled
     2026-07-13, report 10 found evidence it is live. **Verify before acting.**
4. **Middleware hygiene.** 95 of 112 `DUPLICATE_REDIRECTS` keys shadow
   `SLUG_TO_CATEGORY_MAP` entries. Safe today and **match order is load-bearing
   (`:559`, `:580`) — do not reorder.** Add the collision assert, leave the maps alone.
5. Update `docs/Property/STATE.md`. Archive the closed migration docs. Delete
   `tmp/design_migration/scripts/` scratch output. Correct the memory index.

---

## Phase 9 — Deploy

**Owner-triggered, in the turn it happens. Never autonomous.**

**Entry:** Phases 0-8 tagged, every Tier 2 gate green, DECISION A honoured.

1. `python scripts/check_dependency_closure.py` — mandatory, 19 sites.
2. `python scripts/predeploy_gate.py --site property`.
3. **Vercel referrer-log check for live calculator embedders** (Phase 4 item 8) before
   anything that changes embed output ships.
4. Deploy from a **clean git worktree at a pushed SHA**, never the working tree.
   `.vercelignore` is an allowlist that re-includes all of `<site>/web`, so untracked files
   ship to production. Use a short path (`C:/dep`); long paths break the checkout on
   Windows.
5. Post-deploy: route sweep against production, link-count check against the pre-deploy
   baseline, label-contrast check on a live article, `data-cta` presence check.
6. **Re-baseline the cluster measurement and annotate the window** (DECISION A1).
7. IndexNow submission only if the owner asks in that turn.
8. Count and report any failed CI run or failed deploy. They land in his inbox.

**Rollback:** Vercel instant rollback to the previous production deployment, then revert
the phase range locally and re-run Tier 2.

---

## 3. Estimate summary

| Phase | Days | Owner-gated |
|---|---|---|
| 0 Live defect fixes | 0.5 | no |
| 1 Foundation | 1.5 | A, K |
| 2 Chrome and brand | 2.0 | B, F |
| 3 Blog subsystem | 2.5 | D |
| 4 Calculators | 2.5 | C |
| 5 Secondary pages | 3.0 | no |
| 6 Seven pillar pages | 7.0-9.0 | G, H, I |
| 7 Unseen pages + calculators | 1.5 | no |
| 8 Cleanup + heading fix | 1.5 | no |
| 9 Deploy | 0.5 | yes, entirely |
| **Total** | **22.5-26.5 days** | |

Excludes owner review cycles. Phases 0-3 deliver most of the visible change in about 6.5
days.

## 4. Report index

| # | Report | Read it for |
|---|---|---|
| 01 | `01_design_system.md` | tokens, type scale, structural rules, globals.css delta, radius finding |
| 02 | `02_component_inventory.md` | per-component dispositions, build order, shared-API resolution |
| 03 | `03_forked_core_pages.md` | the seven pillar pages, per-page verdicts, link and schema counts |
| 04 | `04_heavy_conflicts.md` | chrome, config, middleware, secondary-page merge verdicts, nav tree |
| 05 | `05_blog_subsystem.md` | article template, hubs, pagination, the three live blog defects |
| 06 | `06_forms_and_backend.md` | 43-item reconnection checklist, ResourceGate flag, endpoint map |
| 07 | `07_analytics_and_dashboard.md` | data-cta diff, the aggregation trap, preservation checklist |
| 08 | `08_specialist_widget.md` | widget verdict (not at risk), the journeyModel guard |
| 09 | `09_shared_package.md` | vendored-file dispositions, exports map, the toggle help defect |
| 10 | `10_unseen_pages_and_seo.md` | six unseen pages, monitored-window collision, 30-item SEO checklist |
| 11 | `11_verification_harness.md` | measured baselines, the two new scripts, gate tiers, rollback |
| 12 | `12_designer_decision_register.md` | 51 decisions, 60 standing rules, 29 open items, 37 non-actions |
| 13 | `13_calculators.md` | gating models, embed exposure, goldens, the £6,250 fact error |
| 14 | `14_completeness_audit.md` | **the 252-row disposition table — the coverage proof** |
