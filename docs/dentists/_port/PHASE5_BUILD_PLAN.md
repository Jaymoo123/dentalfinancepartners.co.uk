# DENTISTS PORT — PHASE 5 BUILD PLAN

**Scope: the homepage, the four `/for-*` pillars, the two locations pages plus their index, and
`/services` plus its 5 child pages.**

File-by-file, executable without re-reading the blueprint. Written 2026-09-11.

READ-ONLY pass. No application code was changed, nothing was built, no `next dev` was started,
no git write command was run. Every count below was re-derived in this session with the command
stated beside it. Where a source document disagrees with the disk, the disk wins and the
disagreement is recorded in §11.

**Crawl instrument assertion (playbook §13, field notes §5).** Every HTTP figure in this plan
came from `http://localhost:3146`, and the served `<title>` was asserted to contain "Dental"
before any of it was trusted:

```
curl -s http://localhost:3146/ | grep -o '<title>[^<]*</title>'
# <title>Dental Accountants | Accountants for Dentists UK</title>
```

All 14 in-scope routes returned HTTP 200 on that server.

---

## 0. THE HEADLINE, BEFORE THE FILE LIST

**Three things a builder must know before reading anything else.**

**(a) `PHASE456_SCOPE.md` is right and the playbook's default is wrong for this site.** The phase
map calls phase 5 "the big one". On Dentists it is not. By volume phase 6 is ≈5,723 lines against
phase 5's ≈3,083. By traffic the homepage drew 17 sessions in 19 days out of 450, produced zero
form starts and zero CTA clicks of any kind, while blog articles drew 374 sessions and 24 of the
30 form starts. **Review depth is set by traffic, not by the phase map.** This plan therefore
spends its deepest review on the surfaces with crawl value and content-rule exposure
(`/services/[slug]/data.ts`, the pillar copy), and treats the homepage as a rebuild-to-standard
that is reviewed for correctness and crawl paths, NOT for conversion lift.

**(b) Do not justify any of this on head terms.** The homepage holds 5,106 impressions for 8
clicks at average position 44.6 over 90 days. At position 45 no redesign wins a click. The owner
has parked that as an authority problem. Any acceptance test, receipt or owner note that promises
a ranking or click movement from this phase is wrong and must be struck.

**(c) The working tree is NOT clean and a manager edit is in flight.** At survey time:

```
git status --porcelain Dentists/
 M Dentists/web/src/app/page.tsx
 M Dentists/web/src/components/layout/PageShell.tsx
```

`Dentists/web/src/app/page.tsx` measured **681 lines** on the first read of this session and
**679** on the second, sixty seconds apart. The diff is the manager restoring `StickyCTA` to
`PageShell` (site-wide) and removing its phase-2 homepage mount. That matches the locked decision
in this brief. **Consequence for WP5.1: `StickyCTA` is NOT mounted in `app/page.tsx`. Do not add
it back.** Re-read `git status Dentists/` before starting and do not build on a stale copy.

---

## 1. REALITY CHECK PER SURFACE — what phases 1 and 2 already satisfy

Nobody rebuilds any of this. Each row was re-derived this session.

| Thing the phase-5 spec asks for | State on disk today | Phase-5 work |
|---|---|---|
| Navy `primary-*` ramp, `btnPrimary`, `btnSecondary`, `focusRing` | **DONE, phase 1.** `globals.css:152-162`, `layout-utils.ts:35-39,48-49` | none |
| `btnGold` (navy label on gold, 6.23) | **DONE, phase 1.** `layout-utils.ts:55-56` | consume it |
| **The navy-on-navy hero button defect** | **ALREADY FIXED.** `app/page.tsx:271` renders `className={`${btnGold} min-w-0`}` on the `.hero-brand` navy ground. Navy label on gold = 6.23, correct per the locked rule | verify it survives the rebuild |
| Warning ladder D-W1 tokens | DONE, phase 1 | phase 5 renders no warning colour |
| Font transitional no-op (`--font-serif` → survivor) | DONE, phase 1 | each phase-5 file deletes its OWN serif classes (T26) |
| `DentistsBackdrop` component | **DONE, phase 2.** `components/layout/DentistsBackdrop.tsx` | the hero consumes it; `.hero-brand` CSS retires from `page.tsx` |
| Kit header + footer + shell, nav IA | **DONE, phase 2** (`51a2c3bc`) | do not touch chrome |
| `ctaContactGoal="contact"`, `ctaMobilePlacement="header_mobile"` | **DONE, phase 2.** LOCKED, T22 | not phase 5's to revisit |
| **The 5 `/services/<slug>` pages linked from the chrome** | **DONE, phase 2.** Footer Services column derives from nav children of `/services` | phase 5 must not undo it, and must not double-count it (T14) |
| `/embed` chrome bypass | DONE, phase 2 (kit shell) | none |
| `StickyCTA` site-wide | **In flight, uncommitted.** Being restored to `PageShell` | **do not mount in `page.tsx`** |
| Pricing / turnaround removal on these files | **PARTIAL.** Held on 4 of 13 files, breached on 3. See §9 | WP5.2 and WP5.5 finish it |
| Four homepage stat cards replaced with house-position figures | **HELD** where checked; the `/services` index `siteStats` (`config/service-tiers.ts:64-69` = `13`, `5`, `6`, `96%`) contains two claims about our own scope, not tax facts. See §9 | WP5.4 |

**Two things the phase-5 spec asks for that are NOT needed, and building them would be a
regression.** Both are in §10.

---

## 2. THE SMALLEST EDIT POINT PER SURFACE

| Surface | Public routes | Smallest edit point | Lines |
|---|---|---|---|
| Homepage | 1 | `Dentists/web/src/app/page.tsx` | 679 |
| The four `/for-*` pillars | 4 | **`Dentists/web/src/components/audience/AudienceStageLayout.tsx`** — one component edit restyles all four. The four page files are pure data and are touched for COPY only | 251 (+4 × ~135 data) |
| Locations | 3 | `locations/[slug]/page.tsx` + `locations/page.tsx`, and **restyle `components/ui/CTASection.tsx` in place** rather than replacing it | 214 + 72 + 54 |
| `/services` index | 1 | `app/services/page.tsx` | 400 |
| The 5 service children | 5 | **`app/services/[slug]/page.tsx`** for design (one template, 5 pages) and **`app/services/[slug]/data.ts`** for copy. Plus a 6-line edit to `app/sitemap.ts` | 254 + 507 |

Verified with `wc -l`. **14 public routes, 8 source files, ~2,971 lines.**

Nothing else is in scope. Do not propose a sweep across the 309 routes; the chrome is phase 2's
and it has landed.

---

## 3. SECTION-BY-SECTION HOMEPAGE MAP

### 3.1 Property's order, re-derived

`grep -nE '<section|<StickyCTA|<[A-Z][A-Za-z]*Section|CalculatorTabs' Property/web/src/app/page.tsx`
against `Property/web/src/app/page.tsx` (537 lines):

| # | Property section | Line |
|---|---|---|
| 0 | `<StickyCTA />` as an early child | :227 |
| P1 | Hero, `bg-slate-900`, min-h-700 | :239-274 |
| P2 | Trust strip, white, bordered | :279-283 |
| P3 | `<WhoWeAreSection />` | :289 |
| P4 | `<WhyChooseUsSection />` | :292 |
| P5 | Focus band, `bg-sky-50/60` | :295-321 |
| P6 | `<WhatWeCoverSection />` | :325 |
| P7 | `<section id="calculators">` + `<CalculatorTabs />` + crawl-safe literal links | :328-357 |
| P8 | `<TestimonialsSection />` | :361 |
| P9 | Blog teaser, `bg-slate-50` | :364-413 |
| P10 | `<section id="book">` closing panel, dark, `scroll-mt-24` | :420-514 |
| P11 | FAQ, white | :517-534 |

### 3.2 Dentists today, mapped onto it

Anchors re-derived this session from the working-tree copy (679 lines). They sit ~2 lines off
`DISPOSITION_SLICE3.md` §B because phases 1 and 2 edited the file.

| # | Dentists today | Line | Ground | Maps to | Disposition | Kit component |
|---:|---|---|---|---|---|---|
| 1 | JSON-LD (`AccountingService`, `Service`, `FAQPage`, `BreadcrumbList`) | :244-252 | — | — | **KEEP**, already conforming | — |
| 2 | `.hero-brand` navy hero: `BrandLogoHero` + h1 + `btnGold` primary + underlined secondary | :253-289 | navy | P1 | Rebuild on `DentistsBackdrop`. `BrandLogoHero` retires. `display-serif` deleted. **`btnGold` stays** | `DentistsBackdrop` (local, phase 2) |
| 3 | Proof strip, one paragraph | :291-297 | `--surface` | P2 | Restyle | — |
| 4 | Band, standfirst + cards | :299-317 | `--background` | P3 | Restyle as who-we-are | `NumberedReasons` or `WhyUsList` |
| 5 | `TestimonialSlider` band | :319-329 | white | P8 | **MOVES DOWN to P8's slot. GATE FIRST** (§10.3) | kit `TestimonialsSection` only if the quotes clear the gate |
| 6 | Band | :331-372 | `--background` | P4 | Restyle | `WhyUsList` |
| 7 | Band | :374-393 | `--background` | P5 | Restyle | `TopicSection` |
| 8 | Band | :395-410 | `--surface` | P6 | Restyle | `CoverageCards` |
| 9 | Band | :412-429 | `--background` | P6 | Merge with #8 or keep as a second cover band | `CoverageCards` |
| 10 | `#how-we-work`, `scroll-mt-24` | :431-463 | `--background` | P5/P6 | **KEEP THE ID.** It is the hero secondary CTA's target | `ProcessTimeline` |
| 11 | Band ending in a comparison `<table>` | :465-508 | `--surface` | P6 | Table → **mirrored locally (T12)**, never the kit one | see §3.3 |
| 12 | Closing panel A, `packagesMode` branch | :510-552 | `--surface` | — | **Stays under the branch, unrendered.** Keep `home_cta_primary` / `home_cta_secondary` ids | — |
| 13 | Closing panel B, `leadgen` branch, THE LIVE ONE, `<LeadForm submitLabel="Send enquiry" />` | :554-587 | `--surface` | P10 | Becomes **`<section id="book" className="scroll-mt-24">`**, the site-wide scroll target this site does not have today | `LeadCTAPanel` (see §10.2 before adopting) |
| 14 | Navy band, `!packagesMode` at :600 | :590-640 | navy | P3/P4 | Restyle | — |
| 15 | FAQ "Frequently asked.", hand-rolled `<details>` | :642-674 | `--background` | P11 | **Restyle in place. DO NOT adopt kit `FaqSection`** (§10.1) | **none — keep native `<details>`** |
| — | — | — | — | **P7 MISSING** | **NET-NEW `#calculators` band.** There is no calculator surface on the homepage today | `CalculatorTabs` + literal `<a>` fallback |
| — | — | — | — | **P9 MISSING** | **NET-NEW latest-insights band**, 3 posts + view-all. The homepage links to a 223-post corpus **zero** times today | — |

**What is missing:** P7 and P9 only.
**What is extra:** nothing that has no Property counterpart; Dentists carries four mid-page bands
(#6-#9) where Property carries two components (P4, P6), so the extra is redundancy inside one
slot, not a section Property lacks. Merging #8 and #9 is permitted; merging any others is not,
because each carries distinct copy.
**What merely differs in order:** the testimonial band (#5) sits at position 5 where Property puts
it at P8, and the FAQ sits last on both.

**Navy adjacency rule.** The ported footer is navy. Section #14 is navy. The FAQ band (#15) must
stay last so navy never touches navy. If #14 is moved or deleted, re-check the adjacency.

### 3.3 Kit components that are UNUSABLE here, and must be mirrored locally (T12)

**Never edit the kit to fix these. Editing the kit changes Property and up to 18 other sites.**
Log each as a kit gap in the receipt; do not fix it.

| Kit component | Why it is unusable on Dentists | What to do |
|---|---|---|
| `marketing/ProblemStatement.tsx` | Hardcodes Property's landlord copy with no copy props. `:38` reads "landlords felt the tax bill rise without ever being told why". `:11-23` document that the component and its prompt data are **Property-only** | **Mirror locally** into `Dentists/web/src/components/dentists/` with dental copy |
| `marketing/ComparisonTable.tsx` | Prop-driven for rows and labels, **but `Pill()` at `:67-73` hardcodes the literal "Most recommended" and is called UNCONDITIONALLY at `:135` and `:185`.** There is no prop to suppress it. On Dentists that is an unevidenced superlative about our own service and falls under the locked no-aggregate-claims rule | **Mirror locally**, omit the pill. Re-derived: `grep -n '<Pill' ComparisonTable.tsx` → `:135`, `:185`, both unguarded |
| `primitives/FaqSection.tsx` | Radix collapsible: closed answers are **not in the server HTML**, and it renders answers as escaped text | **Do not adopt.** See §10.1 |
| `chrome/SiteFooter.tsx` defaults | `resourcesHref` → Property's `/landlord-tax`; `companyItems` includes `/book` | already overridden in phase 2; phase 5 must not touch it |

**Kit components that ARE safe to adopt here:** `marketing/CoverageCards`, `NumberedReasons`,
`WhyUsList`, `TopicSection`, `ProcessTimeline`, `DrawnTickList`, `WhatToExpectCard`,
`primitives/EyebrowRule`, `NoticeCard`, `SlimHero`, `page-blocks`. Each takes its copy as props;
each was checked for a hardcoded reference-site string this session.

---

## 4. WORK PACKAGES

**Five packages, one builder each.** Playbook §3 caps this at 3-6. Every package's acceptance
tests include, without exception:

```
cd Dentists/web && npx tsc --noEmit
python scripts/check_dependency_closure.py        # playbook T24, EVERY brief, no exceptions
```

and the concurrency discipline from field notes §8:

```
# stage and commit as ONE command, never two steps with a check between them
git add <explicit paths> && git commit -m "..."
git show --name-only --format="" HEAD | grep -c "^Dentists/"   # verify what YOU committed
```

**Every git command runs from the monorepo root (T3). NEVER a repository-wide `git add`.** Four
ports are live in this checkout and a sibling's repo-wide stage already swept this port's files
into the wrong commit once today (`f75438bf`). **Builders never run `next build` (T1).** The
manager builds, serially, between packages.

**Every builder brief carries this line verbatim:** *"Correct this brief if its premise is false,
and say so in your receipt. An agent that never contradicts the brief is not reading it."*
(playbook T11; eleven instances behind it in the field notes.)

**The locked content rules go in every brief verbatim:** no pricing for our services, no
turnaround promises, no client-count or aggregate-performance claims, no "most businesses
qualify", no em-dashes in user-facing copy, every figure re-derivable from
`docs/dentists/house_positions.md` and used within its stated scope, British English.

---

### WP5.1 — Homepage rebuild

**Model: Opus.** The largest single file in the phase and the only genuine structural unknown.

**Files owned exclusively:**
```
Dentists/web/src/app/page.tsx                                  (679 lines)
Dentists/web/src/components/dentists/TestimonialSlider.tsx     (114 lines)
Dentists/web/src/components/dentists/ComparisonTable.tsx       (NEW, local mirror, T12)
Dentists/web/src/components/brand/BrandLogoHero.tsx            (DELETE, last consumer)
```

**Reference to port from, read as it is NOW:**
- `Property/web/src/app/page.tsx` — hero `:239-274`, trust strip `:279-283`, focus band
  `:295-321`, `#calculators` `:328-357` (note the crawl-safe literal-link carve-out documented at
  `:340`), blog teaser `:364-413`, `#book` `:420-514`, FAQ `:517-534`.
- `packages/web-shared/design/marketing/ComparisonTable.tsx` — the STRUCTURE to mirror. Copy the
  markup, **omit `Pill()`**, supply dental copy.

**Build:**
1. Rebuild sections in the §3.2 order. Keep the JSON-LD block byte-identical.
2. Hero onto `DentistsBackdrop`; retire `BrandLogoHero` and the `.hero-brand` class usage; delete
   all 16 `display-serif` and 3 `font-serif` classes in this file (T26).
3. **`btnGold` stays on the hero primary.** Measure every button against its SECTION ground, never
   its own label: dark ground → `btnGold` (6.23), light ground → `btnPrimary` (17.15).
4. `#how-we-work` keeps its id and `scroll-mt-24`.
5. Closing panel B becomes `<section id="book" className="... scroll-mt-24">`.
6. Panel A stays under `packagesMode`, unrendered, ids intact.
7. **NET-NEW P7 `#calculators`**: a crawl-safe block carrying at minimum a literal
   `<a href="/calculators/uda-value">` and a "See all 13 calculators" link to `/calculators`.
   If `CalculatorTabs` is introduced, it becomes a THIRD `CalculatorClient` call site — flag it in
   the receipt for phase 4 (T7), and do not gate anything.
8. **NET-NEW P9 latest-insights**: 3 posts + view-all, four crawl links into the 223-post corpus.
9. FAQ restyled **in place as native `<details>`** (§10.1). The `homeFaqs` single binding at
   `:164`/`:238`/`:647` is preserved exactly (§8).
10. Clear this file's 13 gold-as-text occurrences.
11. **Do NOT mount `StickyCTA`.** It lives in `PageShell`, site-wide.
12. Never-fired CTA ids: see §7. Ids stay byte-identical; the missing `data-cta-goal` is added.

**Acceptance tests:**
- `tsc`, closure check.
- `grep -c 'StickyCTA' src/app/page.tsx` → **0**.
- `grep -oE 'text-\[var\(--gold' src/app/page.tsx | wc -l` → **0** (was 13).
- `grep -oE 'display-serif|font-serif' src/app/page.tsx | wc -l` → **0** (was 19).
- `grep -oE '—|–' src/app/page.tsx | wc -l` → **0** (is already 0; keep it there).
- `grep -c 'id="how-we-work"' src/app/page.tsx` → **1**; `grep -c 'id="book"' src/app/page.tsx` → **1**.
- The five ids `hero_primary`, `hero_secondary`, `home_cta_primary`, `home_cta_secondary` appear
  byte-identical to today.
- `curl -s http://localhost:3146/ | grep -o '<details' | wc -l` → **≥9** (answers stay in the
  server HTML).
- Homepage unique internal links **≥ 34** (§6), and never below the production floor of 13.
- `grep -c 'Most recommended' src/components/dentists/ComparisonTable.tsx` → **0**.

**OFF LIMITS:** `components/audience/**` and `app/for-*` (WP5.2); `app/locations/**` and
`components/ui/CTASection.tsx` (WP5.3); `app/services/page.tsx` (WP5.4); `app/services/[slug]/**`
and `app/sitemap.ts` (WP5.5); `components/layout/**` and `app/layout.tsx` (phase 2, landed);
`packages/web-shared/**` (manager-direct carve-out, 19 sites); `components/forms/LeadForm.tsx`
(phase 6, and T19 applies).

---

### WP5.2 — The four `/for-*` pillars

**Model: Opus.** One component edit covers four pages. The cheapest pillar port in the estate.

**Files owned exclusively:**
```
Dentists/web/src/components/audience/AudienceStageLayout.tsx   (251)
Dentists/web/src/app/for-associates/page.tsx                   (134)
Dentists/web/src/app/for-principals/page.tsx                   (138)
Dentists/web/src/app/for-locum-dentists/page.tsx               (134)
Dentists/web/src/app/for-practice-buyers/page.tsx              (134)
```

**Reference:** `Property/web/src/app/page.tsx` band rhythm (`:295-321` focus band, `:364-413`
teaser) and `packages/web-shared/design/marketing/*` for the card treatments.

**Anatomy of the layout, verified, with line anchors:**

| Lines | Band | Ground | Note |
|---|---|---|---|
| :40-50 | schema: `buildFaqPage(data.faqs…)` at `:44-46`, `buildBreadcrumbJsonLd` at `:47` | — | **single binding, both** |
| :54 | `<JsonLd>` | — | — |
| :57-75 | Hero | `bg-[var(--navy)]` | h1 `:67`, badge `:61`, eyebrow `:64` |
| :78-93 | Stats strip | `bg-[var(--navy-soft)]` | value `:83`, label `:86`. **Static JSX, no counter** |
| :96-125 | Concerns | `bg-[var(--surface)]` | h2 `:99`, cards `:108-121` |
| :128-158 | How we work | `bg-[var(--background)]` | rows `:136` `border-l-4 border-[var(--gold)]` |
| :161-180 | Inline health-check CTA | white, inner card `bg-[var(--gold-soft)]` | **`<LeadForm>` at `:176` — EXISTING surface, restyle only** |
| :183-206 | FAQ `<dl>` | `bg-[var(--background)]` | render loop `:190` |
| :209-248 | Related guides, conditional | `bg-[var(--navy)]` | `btnGold` at `:241` |

**Build:**
1. Restyle, **do not rebuild**. The anatomy already matches the standard.
2. Delete the 12 `font-serif` classes and clear the 9 gold-as-text occurrences
   (`:61, :64, :86, :112, :141, :165, :214, :228, :231`). `:86` is `text-[var(--gold)]/90` and
   `:112, :141, :165` are `--gold-strong`; a `text-[var(--gold)]`-exact grep misses four of the
   nine. Sweep by rule (T6), with this pattern: `text-\[var\(--gold`.
3. Gold on the navy hero and navy closing band **passes at 6.23 and may stay**. Gold as text on
   `bg-[var(--surface)]`, white or `--gold-soft` fails (2.75 / 2.43) and must go. Measure against
   the SECTION ground.
4. `:241` `btnGold` sits on navy — correct, keep.
5. **FAQ `<dl>` stays a `<dl>`. Do not adopt kit `FaqSection`** (§10.1). The single binding at
   `:44`/`:190` is already correct (§8); make it structurally impossible to fork.
6. **Copy remediation, the real work in this package** (§9): the two remaining aggregate claims at
   `for-associates:89` and `for-principals:93`, and the four own-scope stat tiles. Each page gets
   its own wording; **no two pages may read the same** (owner decision 2026-09-11).
7. Every surviving stat value must be re-derivable from `docs/dentists/house_positions.md` with a
   section reference in the receipt, and used within its stated scope.

**Acceptance tests:**
- `tsc`, closure check.
- `grep -oE 'text-\[var\(--gold' src/components/audience/AudienceStageLayout.tsx | wc -l` → **0**.
- `grep -oc 'font-serif' …AudienceStageLayout.tsx` → **0** (was 12).
- `grep -rniE 'within 24 hours|one working day|same day|typically takes|most switches|every month' src/app/for-*/page.tsx` → **0**.
- All four routes ≥ **32** unique internal links (§6), never below the production floor of 14.
- Each of the four routes still emits exactly one `FAQPage` and one `BreadcrumbList` block.
- A receipt table: stat value → house-positions section reference, for every tile that survives.

**OFF LIMITS:** `app/page.tsx` and `components/dentists/**` (WP5.1); `app/locations/**` and
`components/ui/CTASection.tsx` (WP5.3); `app/services/**` and `app/sitemap.ts` (WP5.4, WP5.5);
`components/layout/**`; `packages/web-shared/**`; `components/forms/LeadForm.tsx`.

---

### WP5.3 — Locations, and `CTASection` restyled in place

**Model: Sonnet.** The smallest package in the phase, and smaller than `DISPOSITION_SLICE3.md` §D
expects: **both locations files contain ZERO gold-as-text. Verified, and confirmed independently
this session.** The "standard gold sweep" SLICE3 anticipates here is nil work.

**Files owned exclusively:**
```
Dentists/web/src/app/locations/page.tsx          (72)
Dentists/web/src/app/locations/[slug]/page.tsx   (214)
Dentists/web/src/components/ui/CTASection.tsx    (54)
```

**Reference:** `Property/web/src/app/locations/[slug]/page.tsx` (1,006 lines). **Port its anatomy,
never its scale.** Property has many cities; Dentists has two.

**Build:**
1. `locations/[slug]` is wrapped in `contentNarrow` (max-w-3xl) for its whole length. A location
   page is a marketing surface: give it the standard section rhythm and full-width bands, not a
   prose column.
2. Delete the 6 `font-serif` classes in `[slug]` (`:144, :151, :163, :170, :180, :192`) and the 2
   in the index (`:39, :52`).
3. **`telephone` stays omitted from the `AccountingService` JSON-LD.** The comment at `:108-110`
   records it as a considered compliance decision. Do not "complete" the schema.
4. `[slug]:187` renders a `btnPrimary` "Book your free consultation" link carrying **no `data-cta`
   attribute at all**. Add `data-cta`, `data-cta-placement` and `data-cta-goal`. This is a new id
   with no history, so nothing can break (§7).
5. `CTASection.tsx:48` — the secondary link carries no `data-cta` while the primary at `:45` does.
   Same treatment.
6. **`CTASection.tsx` is RESTYLED IN PLACE and NOT DELETED.** Its three call sites are
   `app/locations/page.tsx:65`, `app/locations/[slug]/page.tsx:207` and **`app/about/page.tsx:74`,
   which is a phase-6 file.** T23: fix every consumer in the same commit, or leave the component
   standing until the last consumer moves. Restyling in place does both — all three consumers get
   the new look and `/about` is not left broken across a phase boundary. **Deletion is phase 6's,
   after `/about` moves.**
7. **Do NOT replace `CTASection` with kit `LeadCTAPanel` in this phase.** See §10.2.

**Acceptance tests:**
- `tsc`, closure check.
- `grep -oE 'font-serif' src/app/locations/page.tsx "src/app/locations/[slug]/page.tsx" | wc -l` → **0**.
- `grep -rn 'CTASection' src/` still returns **3 call sites**, one of them `app/about/page.tsx`.
- `/locations` ≥ **34** links, `/locations/london` and `/locations/manchester` ≥ **35** each (§6);
  never below the production floor of 13 / 14 / 14.
- `grep -c 'telephone' "src/app/locations/[slug]/page.tsx"` unchanged from today.
- `/about` still renders (spot-curl `http://localhost:3146/about`, title contains "Dental").

**OFF LIMITS:** `app/page.tsx`, `components/dentists/**` (WP5.1); `components/audience/**`,
`app/for-*` (WP5.2); `app/services/**`, `app/sitemap.ts` (WP5.4, WP5.5);
**`app/about/page.tsx` — read it, never edit it** (phase 6); `components/layout/**`;
`packages/web-shared/**`.

---

### WP5.4 — The `/services` index

**Model: Opus.** 400 lines, and it carries the phase's worst internal-linking defect.

**Files owned exclusively:**
```
Dentists/web/src/app/services/page.tsx      (400)
Dentists/web/src/config/service-tiers.ts    (the siteStats array, :62-69)
```

**Anatomy, verified:**

| Lines | Band | Ground | Heading |
|---|---|---|---|
| :186 | `<JsonLd>` | — | — |
| :189-215 | Hero | `bg-[var(--navy)]` | h1 `:196-198`, eyebrow `:193` |
| :218-220 | Stats bar (a plain `<div>`, not a `<section>`) | none | `<StatsBar stats={siteStats} />` at `:219` |
| :224-238 | Service tiers | `bg-[var(--surface)]` | h2 `:227` "Three service tiers" |
| :241-294 | Service detail cards | `bg-[var(--background)]` | h2 `:244` |
| :297-326 | What's included | white | h2 `:300` |
| :329-351 | FAQ | `bg-[var(--background)]` | h2 `:332`, render loop `:336` |
| :354-397 | CTA + `<LeadForm>` | `bg-[var(--navy)]` | h2 `:361`, h3 `:389` |

**Build:**
1. **THE HEADLINE DEFECT.** `grep -c 'href="/services/' src/app/services/page.tsx` → **0**. The
   index links to three of its five children only through the `services` array's `href:` property
   (`:44` practice-accounting, `:83` associate-tax, `:96` practice-valuation). It **never links to
   `/services/dental-accountants` or `/services/locum-dentist-tax`**, and two of its six cards
   point at `/blog/practice-finance` (`:57`, `:70`) and one at `/contact` (`:109`) — while `:248`
   tells the reader "Click any heading to read the deep-dive page for that service." That sentence
   is false for three of six cards. **Add an explicit children block listing all five, and correct
   `:248`.** `data.ts:5-7` calls `dental-accountants` "the single most important landing page on
   the site" and the index does not link to it.
2. Clear the 6 gold-as-text occurrences (`:193, :257, :274, :284, :358` — 5 lines, 6 occurrences)
   and the 10 `font-serif` classes.
3. **T17 defect, and it is real here (§8):** the FAQ array is a single binding, but `:340` and
   `:344` render it through `dangerouslySetInnerHTML` while `buildFaqPage(faqs)` at `:179` receives
   the raw string. `:139` stores `doesn&apos;t`. The page shows "doesn't"; the JSON-LD ships
   `doesn&apos;t`. **One binding is not enough when the two consumers decode differently.** Fix by
   storing the literal character and dropping `dangerouslySetInnerHTML`, unless a real HTML need is
   proven per-entry.
4. `siteStats` (`config/service-tiers.ts:64-69` = `13`, `5`, `6`, `96%`): `13` and `6` are claims
   about our own scope, not tax facts, and `6` is silently coupled to the length of the `services`
   array in `page.tsx` (comment at `service-tiers.ts:62`) — it breaks without warning if step 1
   changes that array. Re-derive all four against `house_positions.md` or replace them.
5. `:248` "our book of dental clients" is an aggregate client-base claim. Rewrite.
6. **`StatsBar` is static and safe** — `packages/web-shared/components/StatsBar.tsx:22` prints
   `{s.value}` directly, no animation. Do not "fix" it and do not swap it for a counter (§7, T15).

**Acceptance tests:**
- `tsc`, closure check.
- `grep -c 'href="/services/' src/app/services/page.tsx` → **≥5**, and all five slugs present.
- `grep -oE 'text-\[var\(--gold' src/app/services/page.tsx | wc -l` → **0** (was 6).
- `grep -oc 'font-serif' src/app/services/page.tsx` → **0** (was 10).
- `grep -c 'dangerouslySetInnerHTML' src/app/services/page.tsx` → **0**, or one documented
  exception per surviving entry.
- **The T17 test:** extract the `FAQPage` JSON-LD from the served page and assert every
  `acceptedAnswer.text` and `name` string appears verbatim in the rendered body text.
- `grep -rniE 'book of .* clients|within 24 hours|one working day' src/app/services/page.tsx` → **0**.
- `/services` ≥ **33** unique internal links and rising (step 1 adds at least 2 new destinations);
  never below the production floor of 15.

**OFF LIMITS:** `app/services/[slug]/**` and `app/sitemap.ts` (WP5.5); `app/page.tsx` (WP5.1);
`components/audience/**`, `app/for-*` (WP5.2); `app/locations/**`, `components/ui/CTASection.tsx`
(WP5.3); `components/layout/**`; `packages/web-shared/**` — including `components/StatsBar.tsx`.

---

### WP5.5 — The 5 service child pages, and the sitemap

**Model: Opus. This package gets the deepest review in the phase**, and not for its design. It is
761 lines of marketing copy carrying the heaviest concentration of content-rule breaches left on
the site, and it owns the highest value-per-line edit in the whole port.

**Files owned exclusively:**
```
Dentists/web/src/app/services/[slug]/page.tsx   (254)
Dentists/web/src/app/services/[slug]/data.ts    (507)
Dentists/web/src/app/sitemap.ts                 (the 6-line children edit ONLY)
```

**The 5 slugs, verified as keys in `data.ts`:** `dental-accountants` `:39`,
`practice-accounting` `:138`, `associate-tax` `:224`, `practice-valuation` `:315`,
`locum-dentist-tax` `:414`. Exported as `SERVICE_SLUGS` at `:507`.

**Template anatomy, verified:** JsonLd `:74` → navy hero `:77-103` → body+sidebar grid `:106-202`
(section loop `:110-131`, worked example `:133-147` on `bg-[var(--gold-soft)]`, three sidebar
cards `:152-198`) → FAQ `:205-225` → navy CTA + `<LeadForm>` `:228-251`.
`generateStaticParams` at `:16-18`; **no `robots` export, `dynamicParams` unset, no `revalidate`**.

**Build:**
1. **THE SITEMAP FIX — do this first and commit it with the template port.** `app/sitemap.ts:13`
   emits `"/services"` and nothing else; the file has explicit loops for locations `:50-59`, blog
   categories `:61-71`, posts `:73-84`, calculators `:86-95`, guides `:98-108` and resources
   `:111-120`, and **no loop for service children**. Import `SERVICE_SLUGS` and emit the five.
   These pages carry 136 literal inbound internal links, are indexable, and three of five are
   already picking up impressions. Six lines.
2. Set `dynamicParams = false`. Today any `/services/<anything>` is server-rendered before
   `notFound()` at `:51` catches it. `generateStaticParams` already enumerates the real five.
3. Restyle the template. Clear the 7 gold-as-text occurrences (`:81, :135, :175, :194, :232` — 5
   lines, 7 occurrences) and the 10 `font-serif` classes.
4. The worked-example band `:133-147` and sidebar card `:184-198` sit on `bg-[var(--gold-soft)]`,
   a LIGHT ground. Gold text there measures 2.43. Every one must move to navy or `--ink-soft`.
5. Add `data-cta`, `data-cta-placement` and `data-cta-goal` to the three uninstrumented `<Link>`s
   at `:91`, `:94` and `:192`. New ids, no history, nothing can break (§7).
6. **COPY REMEDIATION IN `data.ts` — the largest single item in the phase.** Verified breaches
   remaining after phase 1, each rewritten individually and no two alike:
   - `:95` "Within 30 days we produce a baseline management report" — turnaround promise.
   - `:196` "We deliver the report within 15 working days of the month-end close" — turnaround.
   - `:97` and `:182` "inside the deadline" / "not in the last week" — turnaround framing.
   - `:96` the invented worked-example saving ("missing roughly £4,200/year in NI", "we file the
     amendment for the recoverable years"), framed as typical by the heading at `:92`. **The
     single strongest remaining claim on these pages.**
   - `:94` "£180,000 per year… around £140,000" — a specific claimed client practice.
   - `:211` "inside the standard fee, not as an add-on" — a pricing/scope commitment about OUR fee.
   - `:56`, `:79`, `:362` aggregate experience and delivery-model claims.
   - `:6-7` header comment quoting impressions and positions — not rendered, but delete it;
     pipeline artefacts in source are how they reach copy.
   - Three near-duplicate `£80,000–£100,000` incorporation thresholds at `:292`, `:441`, `:478`.
     These are en-dashes in a numeric range and are ALLOWED; the duplication is the issue. The
     em-dash at `:6` is in the comment being deleted anyway.
7. Third-party pricing (`:493` umbrella fees) and statutory thresholds (`:287` AMAP 55p, `:354`
   BADR 14%→18%) are **retained by design**, but every one must be re-derived against
   `house_positions.md` and used within its stated scope. `:354` is the BADR 18%-from-6-Apr-2026
   ground truth; check it reads correctly.
8. `locum-dentist-tax` is titled for a three-way comparison (`data.ts:416`) and delivers it as
   three bullet strings at `:433-435`. If a comparison table is wanted, it is the **locally
   mirrored** one from WP5.1 — coordinate, do not build a second.

**Acceptance tests:**
- `tsc`, closure check.
- `curl -s http://localhost:3146/sitemap.xml | grep -c '/services/'` → **≥6** (the index plus 5).
- All five child routes still 200, each with a `<title>` containing "Dental" or the brand.
- `grep -oE 'text-\[var\(--gold' "src/app/services/[slug]/page.tsx" | wc -l` → **0** (was 7).
- `grep -oc 'font-serif' "src/app/services/[slug]/page.tsx"` → **0** (was 10).
- `grep -rniE 'within [0-9]+ (days|working days)|inside the deadline|standard fee|book of' "src/app/services/[slug]/data.ts"` → **0**.
- `grep -oE '—' "src/app/services/[slug]/data.ts" | wc -l` → **0** (en-dashes in `£x–£y` ranges stay).
- **The T17 test**, as WP5.4: every `FAQPage` string in the JSON-LD appears verbatim in the
  rendered body on all five routes.
- **Link floor on all five: see §6.2**, because these routes have no baseline row.
- A receipt table: every retained figure → its `house_positions.md` section reference.

**OFF LIMITS:** `app/services/page.tsx` and `config/service-tiers.ts` (WP5.4); `app/page.tsx`
(WP5.1); `components/audience/**`, `app/for-*` (WP5.2); `app/locations/**`,
`components/ui/CTASection.tsx` (WP5.3); `components/layout/**`; `packages/web-shared/**`;
**`app/sitemap.ts` beyond the service-children loop** — touch no other emitter in that file.

---

## 5. DEPENDENCIES AND WHAT MUST BE SERIAL

```
phase 1 (tokens, btnGold, ramp)  ──> ALL of phase 5.   LANDED. Not a blocker.
phase 2 (kit chrome, nav IA)     ──> ALL of phase 5.   LANDED (51a2c3bc). Not a blocker.
   └─ EXCEPT the uncommitted StickyCTA restore. WP5.1 must start from a tree
      where that has landed, or it will re-add a mount that is being removed.

WP5.1 ── WP5.5 : SOFT. Only if a comparison table is wanted on locum-dentist-tax.
                 WP5.1 owns the local mirror; WP5.5 consumes it. Resolve BEFORE
                 briefing, or drop the table from WP5.5 and keep the bullets.

WP5.4 ── WP5.5 : SOFT, and in one direction only. WP5.4 step 1 changes the
                 `services` array length, which `service-tiers.ts:62` couples the
                 "6 service areas" stat to. WP5.4 owns both files, so this is
                 internal to WP5.4 and is NOT a cross-package dependency. Noted so
                 nobody invents one.

WP5.3 ── phase 6 : CTASection deletion straddles the boundary (about/page.tsx:74).
                 T23. WP5.3 RESTYLES and does NOT delete. Phase 6 deletes, after
                 /about moves. This is the carve-out, and it is resolved by not
                 deleting rather than by sequencing.

kit primitives ── ALL packages. Manager-direct carve-out. A mid-port kit edit changes
                 up to 19 sites. Any kit gap found in phase 5 is MIRRORED LOCALLY
                 and logged; never fixed in the kit.
```

**All five packages are on disjoint file sets. Verified, file by file, against the OFF LIMITS
lists. They can run CONCURRENTLY.**

**What must be serial, and why:**

| Must be serial | Why |
|---|---|
| Every `next build` | T1, shared `.next`. Builders never build; the manager builds between packages |
| The `StickyCTA` restore before WP5.1 starts | Otherwise WP5.1 re-adds a mount the manager is removing |
| Any kit edit against everything | Manager-direct, up to 19 sites |
| The comparison-table decision before WP5.1 and WP5.5 are briefed | One mirror, two possible consumers |

**Recommended order:** brief all five at once. Start **WP5.5 first** — it is the long pole (761
lines of copy remediation plus the sitemap fix) and it is the item most likely to be quietly
under-done because it does not look like design work. WP5.3 is a half-day and can finish first
without blocking anyone.

**After every commit, every builder runs:**
`git show --name-only --format="" HEAD | grep -c "^Dentists/"` and reports the number. Never
rebase or amend to tidy a sibling's sweep.

---

## 6. LINK FLOORS

### 6.1 The routes that HAVE a baseline

Two floors apply, and a builder must not confuse them.

**Floor A — production safety.** From `docs/dentists/_port/sweep_baseline.json`, captured at
production SHA `18b4f25f39cd0c4aa084e582d69a87c8a10710ac`, 283 URLs, 5,537 unique internal links,
808 `data-cta` attributes. **Any route below its Floor A number is a blocker** (DESIGN_DELTA §5).

**Floor B — the working floor.** Phase 2's chrome added roughly 21 unique destinations to every
route (13 calculator tools in the header dropdown, 5 service sub-pages and 6 guides in the footer
columns, `/about`, `/research`). **A phase-5 route must not fall below its post-phase-2 number
either**, and that number is higher than Floor A everywhere. Measured this session against the
running build.

| Route | Floor A (pre-port, `18b4f25f`) | Floor B (measured on :3146, post-phase-2) | CTAs on :3146 |
|---|---:|---:|---:|
| `/` | 13 | **34** | 4 |
| `/services` | 15 | **33** | 2 |
| `/for-associates` | 14 | **32** | 2 |
| `/for-principals` | 14 | **32** | 2 |
| `/for-locum-dentists` | 14 | **32** | 2 |
| `/for-practice-buyers` | 14 | **32** | 2 |
| `/locations` | 13 | **34** | 3 |
| `/locations/london` | 14 | **35** | 3 |
| `/locations/manchester` | 14 | **35** | 3 |

Floor B deriving command (run per URL, after asserting the title):

```bash
curl -s http://localhost:3146<route> \
  | grep -oE 'href="(/[^"#?]*)"' | sed 's/href="//;s/"//' | sort -u | wc -l
```

**T14 applies to the plus side too.** A link to a destination already in the chrome adds ZERO
unique links. `/contact` in a body CTA adds nothing; it is already a nav item. Do not "improve" a
page by adding links to destinations the chrome already carries, and do not count them as a gain.

### 6.2 The five `/services/<slug>` routes, which have NO baseline row

**Why there is no row, stated so nobody treats it as an instrument failure.**
`docs/_engines/instruments/sweep.mjs` derives its URL list from `sitemap.xml`
(`sitemapUrls()`). `app/sitemap.ts:13` emits `"/services"` and never enumerates the children, so
the five child URLs were never crawled and never baselined. The absence is a consequence of the
very defect WP5.5 fixes. It is not a missing measurement; it is the measurement of a missing
sitemap entry.

**How a builder proves no harm on those five without a baseline. Three steps, in order.**

**Step 1 — capture the missing row BEFORE touching the files.** This is already done, this
session, from the running pre-WP5.5 build. Treat these as the Floor B row for the five:

| Route | Unique internal links | `data-cta` | HTTP |
|---|---:|---:|---|
| `/services/dental-accountants` | **32** | 2 | 200 |
| `/services/practice-accounting` | **32** | 2 | 200 |
| `/services/associate-tax` | **32** | 2 | 200 |
| `/services/practice-valuation` | **32** | 2 | 200 |
| `/services/locum-dentist-tax` | **32** | 2 | 200 |

Same command as §6.1. If the builder starts from a different tree, re-capture before editing;
do not inherit these five numbers blindly.

**Step 2 — after the sitemap fix, the instrument covers them for free.** Once `sitemap.ts` emits
the five, `sweep.mjs` picks them up automatically. Run it, and **re-baseline deliberately with a
written reason in the phase log** (the instrument requires this; §4.5 of the rollout doc). The
reason is: "five routes entered the sitemap for the first time; their first sweep row is their
baseline." That is a legitimate re-baseline and must be recorded as one, not slipped in.

**Step 3 — the source-side floor, which needs no server at all.** Count the literal inbound links
to each child across `src/` and `content/` before and after:

```bash
for s in dental-accountants practice-accounting associate-tax practice-valuation locum-dentist-tax; do
  printf '%-24s %s\n' "$s" "$(grep -rhoF "\"/services/$s\"" Dentists/web/src Dentists/content | wc -l)"
done
```

The after-count must be **greater than or equal to** the before-count for all five, and strictly
greater for `dental-accountants` and `locum-dentist-tax`, which WP5.4 step 1 adds links to.

**The `data-cta` count must not fall on any of the five.** Field notes §3 records a case where a
stale Next incremental cache silently dropped a live `data-cta` id while every route stayed above
its link floor, so the gate passed. If a rendered page contradicts source you have just read,
`rm -rf .next/cache && npx next build` and re-check before blaming the builder.

---

## 7. T15 — ANIMATED AND COUNTED NUMBERS

**The rule:** any animated or counted number must server-render its TRUE final value. Crawlers
and LLM scrapes read the pre-hydration HTML. A sibling shipped a counter that server-rendered 60%
of its target, so the HTML said "12%" where the answer was 20%.

**Status on the phase-5 surfaces, re-derived this session:**

| Surface | Numeric display | Animated? | Verdict |
|---|---|---|---|
| `/services` stats bar, `page.tsx:219` | `packages/web-shared/components/StatsBar.tsx` | **No.** `:22` prints `{s.value}` directly. Pure server component, no `useState`, no `requestAnimationFrame` | **Safe. Do not "fix" it** |
| `/for-*` stats strip, `AudienceStageLayout.tsx:78-93` | plain JSX, value at `:83` | **No** | Safe |
| `/services/[slug]` | no stats band, no `StatsBar` import, no `"use client"`, async server component | **No** | Safe |
| Homepage today | no counter | **No** | Safe |
| `packages/web-shared/design/marketing/StatsCounter.tsx` | the kit counter | **Yes, and it is ALREADY CORRECT.** `:36` `useState(target)` holds the TRUE value until the count-up starts, with a comment recording exactly this defect | Safe to adopt |

**The rules for a builder, and they are the whole of T15 on this site:**

1. **There is no T15 defect in phase-5 scope today.** Do not go looking for one to fix, and do not
   report one that is not there (field notes: three ports "fixed" a counter defect that did not
   exist on their site).
2. **If WP5.1 introduces a counted number** on the homepage proof strip or the new bands, import
   the KIT `StatsCounter` — it SSRs the true value. Do not hand-roll one.
3. **Never import Property's fork.** `Property/web/src/components/property/StatsCounter.tsx` is a
   separate copy with five Property consumers (T5). The kit component currently has **zero**
   consumers in either `Dentists/web/src` or `Property/web/src`; Dentists would be its first.
   Deriving command: `grep -rn 'StatsCounter' --include=*.tsx Dentists/web/src Property/web/src`.
4. **Acceptance test, for any counted number that ships:** fetch the route with `curl` (no JS) and
   assert the final figure appears in the raw HTML. Not a proxy for it — the figure itself.

---

## 8. T17 — STRUCTURED DATA MUST MATCH WHAT RENDERS, FROM ONE BINDING

**The rule:** the array that feeds the rendered markup is the same array that feeds the schema.
One binding, passed to both. Never two `.map()` calls over two arrays.

**Status, re-derived file by file:**

| Surface | Schema call | Render loop | Single binding? |
|---|---|---|---|
| Homepage FAQ | `page.tsx:238` `buildFaqPage(homeFaqs.map(…))` | `page.tsx:647` `homeFaqs.map(…)` | **YES.** `homeFaqs` declared once at `:164`. Already correct — preserve it |
| `/for-*` FAQ | `AudienceStageLayout.tsx:44-46` `buildFaqPage(data.faqs…)` | `:190` `data.faqs.map(…)` | **YES.** Preserve |
| `/for-*` breadcrumb | `:47` `buildBreadcrumbJsonLd(breadcrumbItems)` | `:59` `<Breadcrumb>` | **YES**, `breadcrumbItems` declared at `:40` |
| `/services/[slug]` FAQ | `[slug]/page.tsx:67` `buildFaqPage(page.faqs)` | `:212` `page.faqs.map(…)` | **YES.** Preserve |
| **`/services` index FAQ** | `services/page.tsx:179` `buildFaqPage(faqs)` | `:336` `faqs.map(…)` | **ONE ARRAY, TWO RENDERINGS — see below** |
| **`/locations/[slug]` breadcrumb** | **none** | `:137` `<Breadcrumb>` | **INVERSE GAP — see below** |

**The `/services` defect, and it is the one that matters, because a one-binding check passes it.**
The array is single. But `:340` and `:344` render it through `dangerouslySetInnerHTML`, while
`buildFaqPage(faqs)` at `:179` receives the raw string. `:139` stores the question as
`"What does a specialist dental accountant do that a generalist accountant doesn&apos;t?"`. The
page decodes that and shows an apostrophe. The JSON-LD ships the literal six characters
`&apos;`. **The structured data does not match what renders, from one binding.** T17's rule as
written does not catch this; the acceptance test below does.

Fix: store the literal character in the array and drop `dangerouslySetInnerHTML`, unless a real
per-entry HTML need is proven. Owned by WP5.4.

**The inverse gap on `/locations/[slug]`:** it renders a visible `<Breadcrumb>` at `:137` and emits
no `BreadcrumbList` schema. Its only builder is `buildAccountingService` at `:112`. Markup without
schema is the same drift in the other direction. Owned by WP5.3. (Its `description` IS correctly
single-bound: `content.intro` feeds both `:114` schema and `:148` markup.)

**The acceptance test, and it goes in WP5.4 and WP5.5 verbatim.** Do not test that "one array
exists"; test the output:

```
For each route: fetch it, parse every application/ld+json block, and assert that
every FAQPage `name` and `acceptedAnswer.text` string appears VERBATIM in the
rendered body text of the same page, and vice versa. Any string that differs by
so much as an HTML entity is a failure.
```

Also assert **exactly one** `FAQPage` and **at most one** `BreadcrumbList` per route. The
`/for-*` pages emit both from the layout; if a page file later adds its own, the page emits two
and a crawler picks one.

---

## 9. CONTENT-RULE STATUS — what phase 1 fixed, and what it did NOT

**Phase 1 held on the four `for-*` data files' headline copy, on the `[slug]` template, on both
locations files and on `CTASection`.** A full sweep of the eight in-scope files for pricing
figures, "within 24 hours", "one working day", "same day", client counts and "most businesses
qualify" returns **zero hits** on those.

**It did not hold in three places.** Each is assigned:

| Breach | File:line | Class | Owner |
|---|---|---|---|
| "The handover typically takes two weeks… We do this every month." | `for-associates/page.tsx:89` | turnaround + volume | WP5.2 |
| "Most switches happen seamlessly; the few that have had hiccups…" | `for-principals/page.tsx:93` | aggregate performance about our own record | WP5.2 |
| "our book of dental clients" / "Click any heading to read the deep-dive page" (false for 3 of 6) | `services/page.tsx:248` | aggregate client base + a false statement | WP5.4 |
| "Within 30 days we produce a baseline management report" | `services/[slug]/data.ts:95` | turnaround | WP5.5 |
| "We deliver the report within 15 working days of the month-end close" | `data.ts:196` | turnaround | WP5.5 |
| "inside the deadline" / "not in the last week" | `data.ts:97`, `:182` | turnaround framing | WP5.5 |
| Invented worked-example saving: "missing roughly £4,200/year in NI… we file the amendment" | `data.ts:96`, framed typical by `:92` | fabricated outcome. **The strongest remaining claim** | WP5.5 |
| A specific claimed practice: "£180,000 per year… around £140,000" | `data.ts:94` | client detail | WP5.5 |
| "inside the standard fee, not as an add-on" | `data.ts:211` | **pricing/scope commitment about our own fee** | WP5.5 |
| "We deliberately stay small enough…", "We see the second deal go better…" | `data.ts:79`, `:362`, `:56` | aggregate experience | WP5.5 |
| Impressions and positions quoted in a source comment | `data.ts:6-7` | pipeline artefact | WP5.5 |

**Four stat tiles are claims about our own scope, not tax facts.** They pass a pricing grep and
fail the rule: `for-associates:18` ("5 IR35 status factors we test"), `for-principals:17` ("13
categories of dental tax we cover"), `for-principals:20` ("60+ posts on NHS contract economics"),
`for-locum-dentists:17` ("3 structures we compare"). Plus `service-tiers.ts:64-69` "13" and "6".
Every surviving tile needs a `house_positions.md` section reference in the receipt.

**Em-dashes in phase-5 scope: 4 occurrences, all in `data.ts`.** One at `:6` (an em-dash, in the
comment being deleted) and three en-dashes at `:292`, `:441`, `:478` inside `£80,000–£100,000`.
**En-dashes in numeric ranges are allowed and must not be "fixed".** Every other in-scope file is
at zero. `DISPOSITION_SLICE3.md`'s "em-dash count of 12" on `page.tsx` is FALSE today (§11).

**Gold-as-text in phase-5 scope: 36 occurrences across 5 files.** Deriving command:

```bash
grep -ohE 'text-\[var\(--gold' <the 5 files> | wc -l     # 36
```

`page.tsx` 13, `AudienceStageLayout.tsx` 9, `services/[slug]/page.tsx` 7, `services/page.tsx` 6,
`TestimonialSlider.tsx` 1. Both locations files and all four `for-*` data files are at **zero**.
**Use the occurrence count, not the line count** — `services/page.tsx` is 5 lines but 6
occurrences, `services/[slug]/page.tsx` is 5 lines but 7. A line-based figure under-reports by 3
and a builder handed it will leave three behind. Each package clears its OWN files (T26).

**Gold that may STAY:** gold as an accent on a navy ground measures 6.23 and passes. Gold as text
on white (2.75), on `--surface-elevated` (2.43) or on `--gold-soft` fails. **Measure against the
SECTION ground, never the label.**

---

## 10. THREE THINGS THE BLUEPRINT ASKS FOR THAT WOULD BE REGRESSIONS

### 10.1 Do NOT adopt kit `FaqSection` on the homepage or the pillars

`DISPOSITION_SLICE3.md` §B item 6 says "FAQ → kit `FaqSection`". **Do not.**

The kit component is a Radix collapsible. Field notes §2 record it precisely: *"a Radix
collapsible whose closed answers are NOT in the server HTML, and it renders answers as escaped
text."* Field notes §4 record the near-miss: on Solicitors it *"would have STRIPPED answer text
from 196 posts"*.

**Dentists' homepage FAQ uses native `<details>`** (`page.tsx:648`), and the answers ARE in the
server HTML. Verified:

```bash
curl -s http://localhost:3146/ | grep -o '<details' | wc -l     # 9
```

Nine answers, server-rendered, crawlable, on the site's highest-authority page. Swapping to the
kit component removes them from the HTML. That is a crawl regression traded for a style change,
on a page the owner has already parked as an authority problem.

**Same reasoning for `AudienceStageLayout`'s `<dl>`** at `:183-206`: plain markup, fully in the
server HTML, four pages.

**Recommendation: restyle the native `<details>` and the `<dl>` in place.** Both already satisfy
T17. This is also the smaller diff.

### 10.2 Do NOT swap `CTASection` for kit `LeadCTAPanel` in this phase

`DISPOSITION_SLICE3.md` §D says `CTASection` "retires into kit `LeadCTAPanel` across all its call
sites". `CTASection` renders a heading, a paragraph and **two links** (`:44-51`). `LeadCTAPanel`
takes a `form` ReactNode and renders a **capture form**.

**That swap adds a lead-capture surface to three routes where none exists today.** Under playbook
§1 that is a capture-surface change and a hard owner gate. It is not interruptive and must not be
filed as one — but it is still a gate, and it has not been asked.

**Recommendation: restyle `CTASection` in place in WP5.3.** It also resolves the T23 straddle for
free (§4, WP5.3 step 6). If the owner later says yes to closing panels, adopting `LeadCTAPanel`
is a clean separate change on three small files.

### 10.3 Do NOT restyle `TestimonialSlider` until its quotes are sourced

`components/dentists/TestimonialSlider.tsx` (114 lines) renders the homepage testimonial band at
`page.tsx:319-329`. **Gate 9 is open:** are the quotes real and anonymisable?

The source of the copy is not in the repo, so this cannot be settled by reading code. **If the
quotes were invented, the band is OMITTED, never fabricated and never "improved".** Do not assume
either way, and do not let a restyle launder an unsourced claim into a better-looking unsourced
claim. WP5.1 either restyles it against a confirmed source or drops the band and says so.

The band's `text-[var(--gold)]` occurrence at `:1` is cleared either way if the band ships.

---

## 11. WHAT I RE-VERIFIED, AND WHAT I FOUND FALSE

### Verified TRUE this session

| Claim | Command |
|---|---|
| The served site is Dentists, not a sibling | `curl -s :3146/ \| grep -o '<title>…'` → "Dental Accountants \| Accountants for Dentists UK" |
| All 14 in-scope routes return 200 | per-route `curl -w '%{http_code}'` |
| 4 `/for-*` pillars, all rendering via `AudienceStageLayout.tsx` | `ls src/app/for-*`; each page returns `<AudienceStageLayout data={data} />` |
| 2 locations + index | `ls src/app/locations` |
| `/services` + 5 children via `[slug]/page.tsx` and a **507-line** `data.ts` | `wc -l`; 5 keys at `data.ts:39,138,224,315,414` |
| The 5 `/services/<slug>` are ABSENT from `sitemap.xml` | `grep -n services src/app/sitemap.ts` → one line, `:13 "/services"` |
| The 5 are now linked from the chrome (phase 2 footer Services column) | `PHASE2_BUILD_PLAN.md` §5.3; and the measured Floor B rise from 13-15 to 32-35 |
| Three of five are already picking up impressions | `SEARCH_EVIDENCE.md` §5: practice-valuation, practice-accounting (Google), associate-tax (Bing) |
| Phase 1's pricing/turnaround removal HELD on 4 of 13 in-scope files | zero-hit sweep, §9 |
| **The navy-on-navy hero button is already fixed** | `page.tsx:271` renders `btnGold` on `.hero-brand` |
| Homepage FAQ single binding (T17 already correct) | `homeFaqs` at `:164` → `:238` schema, `:647` render |
| Homepage FAQ answers ARE in the server HTML | `curl \| grep -o '<details' \| wc -l` → 9 |
| Kit `StatsCounter` already SSRs its TRUE value | `StatsCounter.tsx:36` `useState(target)`, with the defect named in its own comment |
| Property runs its OWN `StatsCounter` fork (T5) | `Property/web/src/components/property/StatsCounter.tsx`, 5 consumers |
| Kit `ComparisonTable` forces "Most recommended" | `:67-73` defines `Pill()`, called unguarded at `:135` and `:185` |
| Kit `ProblemStatement` hardcodes Property's landlord copy | `:11-23`, `:38` |
| Both locations files have ZERO gold-as-text | `grep -ohE 'text-\[var\(--gold'` → 0, 0 |
| `/services` links to ZERO of its children via `href="/services/…"` | `grep -c 'href="/services/' services/page.tsx` → 0 |
| 12 of 20 `data-cta` ids never fired; 5 of the 12 are on phase-5 surfaces | `FUNNEL_BASELINE.md` §A rows 9-20 |
| `locations/[slug]` deliberately omits `telephone` from schema | comment at `:108-110` |

### Found FALSE, or materially changed since the source documents were written

1. **`app/page.tsx` is NOT 677 lines.** It is **679** in the working tree and **681** at HEAD.
   `DISPOSITION_SLICE3.md` §A, §B and `PHASE456_SCOPE.md` §1 all say 677. Phases 1 and 2 edited the
   file. Every line anchor in those documents is ~2 lines off; §3.2 above carries re-derived ones.

2. **The working tree is NOT clean for Dentists.** `PHASE456_SCOPE.md` §0 records
   `git status --porcelain Dentists/` as EMPTY and HEAD as `f1197d7a`. Today HEAD is `51a2c3bc`
   (phase 2) and two files are modified. The file changed length **during this session**.

3. **`DISPOSITION_SLICE3.md` §A assigns `app/services/page.tsx` to phase 3b.** The scope ruling in
   this brief moves it and the 5 children into phase 5. Recorded here as the resolution;
   `PHASE456_SCOPE.md` §9 risk 1 flagged the conflict and recommended exactly this.

4. **"The em-dash count of 12" on `page.tsx`** (`PHASE456_SCOPE.md` §1, phase-5 paragraph) is FALSE
   today: `grep -oE '—|–' src/app/page.tsx | wc -l` → **0**. The only em-dash in phase-5 scope is
   `data.ts:6`, inside a comment.

5. **Gold-as-text in phase-5 scope is 36 occurrences, not 33.** `PHASE456_SCOPE.md` §7.1 gives
   `services/page.tsx` 5 and `services/[slug]` 5; the true occurrence counts are **6** and **7**.
   The 33 figure is a line count presented as an occurrence count.

6. **`DISPOSITION_SLICE3.md` §B item 6, "FAQ → kit `FaqSection`", would be a crawl regression.**
   §10.1. The homepage uses native `<details>` and its answers are in the server HTML today.

7. **`DISPOSITION_SLICE3.md` §D, "`CTASection` retires into kit `LeadCTAPanel`", is an unasked
   owner gate**, not a restyle. §10.2.

8. **`DISPOSITION_SLICE3.md` §E, "It does not link to its own 5 sub-pages in any obvious block.
   Verify."** Verified, and it is worse than stated: it links to **three** of five through
   `href:` object properties, never to `dental-accountants` or `locum-dentist-tax`, and `:248`
   tells the reader to click headings that do not lead to those pages for three of six cards.

9. **The kit `ComparisonTable` is otherwise fully prop-driven**, contrary to the flat "hardcodes
   Property's copy" framing. Rows, labels, trading name and CTA are all props. **Only the pill is
   unsuppressable** — which is still enough to force a local mirror, but a builder told the whole
   component is Property-specific will rebuild more than necessary.

10. **`PHASE456_SCOPE.md` §1 sizes phase 5 at six work packages.** Five is enough: WP5.6
    (`TestimonialSlider`) is a provenance gate on one 114-line component inside a homepage band,
    and it folds into WP5.1 as a gated sub-task (§10.3) rather than consuming a builder.

---

## 12. THE NEVER-FIRED CTA IDS — the trade-off, stated, NOT decided

Twelve of twenty `data-cta` ids have zero recorded clicks in 92 days. **Five of the twelve are on
phase-5 surfaces:**

| Id | file:line | `data-cta-goal` today | Why it has never fired |
|---|---|---|---|
| `hero_primary` | `page.tsx:272` | **absent** | Unknown. The homepage drew 17 sessions and produced zero CTA clicks of any kind |
| `hero_secondary` | `page.tsx:281` | **absent** | Same |
| `home_cta_primary` | `page.tsx:526` | absent | **Explained.** `packagesMode` branch only; the live variant is `leadgen`. Zero is CORRECT |
| `home_cta_secondary` | `page.tsx:535` | absent | Same |
| `cta-section-primary` | `ui/CTASection.tsx:45` | **absent** | Renders on `/locations`, `/locations/[slug]` and `/about`, which drew 4 sessions in 19 days between them |

Three further phase-5 CTAs carry **no `data-cta` attribute at all**:
`locations/[slug]/page.tsx:187`, `CTASection.tsx:48`, and the three `<Link>`s at
`services/[slug]/page.tsx:91,94,192`. Those surfaces are not merely unmeasured; they are
uninstrumented.

**The trade-off:**

- The port is the cheapest moment to fix instrumentation. A separate pass would be a second full
  sweep of the same files.
- **Renaming an id breaks its history.** `vw_cta_performance` groups on
  `(site_key, country, cta_id, goal)`. A renamed id starts a new series and the old one flatlines,
  which reads as a regression that never happened. This is T22, and it has bitten two sibling ports.
- **The asymmetry that makes it decidable: an id with zero recorded clicks has no history to
  break.** Renaming `hero_primary` costs nothing. Renaming `sticky_cta` (5 clicks, 4 in 30 days)
  or `deep_scroll_close` (101 clicks) costs real continuity — and neither is in phase-5 scope.
- **But renaming these five buys nothing either.** `hero_primary` did not fail to fire because of
  its name. The homepage produced zero clicks of any kind on 17 sessions. A rename changes the
  label on an empty series.
- **The gap that DOES cost something is the missing `data-cta-goal`.** All five carry no goal, so
  even when they do fire they land ungrouped in `vw_cta_performance`.

**My recommendation, offered as a recommendation:** **keep all twenty ids byte-identical, and add
the missing `data-cta-goal` to the five phase-5 ids plus the five uninstrumented links.** Adding a
goal where none existed splits a series in principle; with zero recorded events there is no series
to split. Zero risk, real gain, smallest diff. **Do not touch any id or attribute on the seven
ids that DO fire.** And read `lib/analytics/autoCapture.ts:106` before adding an explicit
placement anywhere, because that fallback currently derives placement from the nearest section
heading and an explicit attribute will itself split those series.

**This is the orchestrator's call, not a builder's. Bring it to the owner.**

---

## 13. RISKS, WITH MY RECOMMENDED RESOLUTION

| # | Risk | Likelihood | My resolution |
|---|---|---|---|
| 1 | **A builder starts from the pre-`StickyCTA`-restore tree** and re-adds a homepage mount the manager is removing | **High.** The edit is uncommitted right now | WP5.1 does not start until `git status --porcelain Dentists/` is clean. Put "do not mount `StickyCTA`" in the brief verbatim |
| 2 | **A sibling port's repo-wide `git add` sweeps these files again.** It already happened today (`f75438bf`) | Medium; four ports live in this tree | Field notes §8: stage and commit as ONE command with explicit paths, verify with `git show --name-only --format="" HEAD \| grep -c "^Dentists/"`, never rebase or amend to tidy |
| 3 | **A builder adopts kit `FaqSection`** because the disposition slice says to, and strips answers from the homepage server HTML | **High if nobody says otherwise** — the blueprint instructs it | §10.1 in the brief verbatim, with the `curl \| grep -o '<details'` count as an acceptance test |
| 4 | **A builder swaps `CTASection` for `LeadCTAPanel`** and ships an unasked capture surface on 3 routes | Medium; the blueprint instructs it | §10.2. Restyle in place. If the owner wants panels, ask once, bundled |
| 5 | **`CTASection` is DELETED in phase 5**, breaking `/about` (a phase-6 file) | Medium; two documents recommend deletion | T23. **Do not delete.** Restyle in place; phase 6 deletes after `/about` moves |
| 6 | **`data.ts` copy remediation is under-done** because it does not look like design work | **High.** It is 507 lines of prose in the least glamorous package | Its own work package, its own reviewer, its own acceptance line. §9 lists every breach with a line anchor so "I did not find any" is not available |
| 7 | **The T17 entity mismatch on `/services` passes a one-binding check** and ships | High without the right test | §8. Test the OUTPUT strings, not the binding. Same test on both services packages |
| 8 | **A builder "fixes" a T15 counter defect that does not exist here** | Medium; three ports have done this | §7. There is no animated number in scope. `StatsBar` is static and the kit counter is already correct |
| 9 | **The gold target handed to a builder is a line count, not an occurrence count**, leaving 3 behind | Medium | §9. Hand each builder its own per-file OCCURRENCE count with the deriving command (field notes §5) |
| 10 | **The 5 `/services/<slug>` routes ship with no proof of no-harm** because they have no baseline row | High if §6.2 is not in the brief | §6.2, three steps. The pre-edit row is already captured in this document |
| 11 | **The sitemap re-baseline is slipped in silently** when five new URLs enter the sweep | Medium | The instrument requires a written reason. §6.2 step 2 supplies it; it goes in the phase log |
| 12 | **`TestimonialSlider`'s quotes are restyled without being sourced**, laundering an unevidenced claim | Medium | §10.3. Gate 9. Omit the band rather than fabricate |
| 13 | **A stale `.next` cache makes a correct build look like a builder regression** | Low-medium; it happened on Solicitors phase 4 | Field notes §3: prove the artefact contains a string changed in THIS build before blaming anyone; `rm -rf .next/cache && npx next build` |
| 14 | **A `#calculators` band adds a third `CalculatorClient` call site** and phase 4's gate reasoning silently changes | Medium | T7. WP5.1 flags it in its receipt. Phase 5 gates nothing and must not |
| 15 | **`globals.css` has ZERO `@layer` declarations and ~28 unlayered rules**, including `.hero-brand`, `.card-flat`, `.card-premium`, `.display-serif` and `.section-label`. An unlayered rule beats EVERY Tailwind utility whatever the specificity | **Certain — it is already true.** It is the T30 / Medical hazard, and phase 5 is the first phase to restyle the surfaces these classes paint | **Report to the manager before WP5.1 starts.** A builder who replaces `.hero-brand` with utilities on the hero may find the utilities silently losing, blame the component, and patch the symptom. Deriving command: `grep -nE '^[a-zA-Z.\[][^{]*\{' Dentists/web/src/app/globals.css` and `grep -c '@layer' …` → **0**. This is NOT phase 5's to fix — it is a site-level one-`@layer base`-wrapper change with a blast radius across every utility it currently beats — but phase 5 must not proceed in ignorance of it |
| 16 | **A before/after read is taken on Google only** | Medium | Both feeds, both data-through dates. And note `SEARCH_EVIDENCE.md` §1 corrected the "Bing 15x" premise: Google is AHEAD on clicks on both windows (131 v 109 on 28d) |
| 17 | **Someone justifies this phase on head terms** | Medium | §0(b). Position 44.6 on 5,106 impressions. Strike any such line from a receipt |

---

## 14. OPEN QUESTIONS FOR THE OWNER

Bundled, because a drip of questions is worse than a list. Everything already decided —
navy/gold, `StickyCTA` site-wide, no new interruptive surface, no pricing or turnaround promises,
deploy never autonomous — is **excluded** and is not re-asked here.

1. **The five buttons on these pages that have never been clicked.** Adding the missing tracking
   labels to them now costs nothing, because there is no history to lose. The alternative is
   leaving them as they are and continuing not to know whether nobody clicks them or we simply
   never recorded it. **Recommendation: add the labels, change no button name.**

2. **Three pages currently end with two links where every other site in the estate ends with a
   short enquiry form** (our two city pages and the locations index). Adding a form there is a new
   place we ask people for their details, so it needs your word. **Recommendation: not in this
   piece of work.** Those three pages drew four visits in nineteen days between them; it is not
   where the gain is. Ask again if we expand beyond two cities.

3. **The customer quotes on the front page.** We cannot tell from the code whether they came from
   real clients. **If they are real we will restyle them; if nobody can say where they came from
   we will remove the section rather than dress it up.** We need someone who knows their origin.

4. **Our "Services" page tells readers to click each heading for a detailed page, and three of the
   six headings do not lead to one.** Two of our five service pages, including the one our own
   notes call the most important page on the site, are not linked from it at all. We are fixing
   the links. **No decision needed — flagged because it is the kind of thing worth knowing was
   live.**

---

## 15. WHAT I COULD NOT VERIFY, AND WHY

| Item | Why not |
|---|---|
| Whether the five never-fired phase-5 ids are unwired or merely unclicked | Needs a click test on a live page with the analytics pipeline attached. Read-only brief; I curl the server, I do not drive it |
| Whether `TestimonialSlider`'s quotes are real | Gate 9. The source of the copy is not in the repo and cannot be established by reading code |
| Whether `page.tsx` will still be 679 lines when a builder starts | It changed length during this session. An uncommitted manager edit is in flight. Re-derive at start |
| Rendered-DOM contrast figures | No browser driven. `DESIGN_DELTA.md` records that `browser_check.mjs` cannot resolve this site's `var()` colours (T25), so every ratio here is inherited from its hand-computed table |
| Whether the `#calculators` band would actually add a third `CalculatorClient` call site | Depends on a design decision nobody has taken. Sized from Property's implementation, which does exactly that |
| Whether every retained figure in `data.ts` is correct against `house_positions.md` | That is WP5.5's job and it is judgement work across 507 lines. I verified the breaches, not the survivors |
| Indexation status of `/services/dental-accountants` and `/services/locum-dentist-tax` | Zero impressions cannot distinguish "not indexed" from "indexed, no demand". Needs a GSC URL Inspection call per URL. Recorded as open in `SEARCH_EVIDENCE.md` §7 |
| Whether the unlayered-`globals.css` hazard (risk 15) is currently causing a visible defect | Would need rendered-DOM measurement of specific surfaces. I verified the MECHANISM is present (zero `@layer`, ~28 unlayered rules); I did not enumerate which utilities are losing today |
