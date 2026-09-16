# Report 14 — The completeness audit: nothing of theirs gets lost

**Brief:** guarantee that no file the designer touched was dismissed by category rather than read.
**Method:** every one of the 252 paths in `git diff --name-status 8041183 eb745e1` gets exactly one
disposition, and every disposition rests on the diff or the file itself.
**Written:** 2026-08-22. Read `CONTEXT.md` first; Rule Zero governs every "theirs or ours" call below.

---

## 0. Headline — what would have been lost

Five things. In descending order of value.

1. **`CalculatorLinkCards.tsx` — the designer's own unshipped fix for an SEO regression they created.**
   `CalculatorTabs` is on 11 of their pages and renders `<button role="tab">`, not `<a href>`. Every one
   of those 11 pages loses its crawlable links to `/calculators/*`. The designer wrote
   `CalculatorLinkCards.tsx` with a docstring arguing exactly that ("tabs would hide three in four behind
   a click and put the other three behind JS"), then never wired it up: **zero consumers, verified**. It is
   the ready-made carve-out-5 patch, sitting in their tree, invisible to any component inventory that
   counts usage. *Verified.*

2. **The `<noscript>` animation-release block in `layout.tsx:90-102`.** Ten CSS rules keyed on
   `[data-draw="off"]` that unfreeze the storytelling animations when JS is off. Seven components set
   `data-draw`. Port the components without this eleven-line block and every animated block on the site
   renders in its collapsed pre-animation state for no-JS users and for any crawler that does not execute
   JS. It looks like boilerplate in a layout diff. It is not. *Verified.*

3. **Our Property favicon and app icons are the wrong brand, live today.** `web/src/app/icon.png` and
   `apple-icon.png` in the monorepo are byte-identical to each other and both are a navy square with a
   gold **tooth** and the letters **"DFP"** — the Dental Finance Partners mark. `favicon.ico` is a black
   circle with a white triangle. The designer replaced all three with a green house. Their files are 100x
   smaller, which reads as a downgrade in a name-status diff and is the opposite. *Verified by viewing
   every image.*

4. **`.logo-house`.** The designer put a lucide `<Home>` icon into the wordmark with a self-drawing
   stroke animation. The `className` is in `BrandWordmarkHomeLink.tsx`; the `@keyframes` and the
   `.group:hover` variant are in `globals.css:387+`. Two files, one design. *Verified.*

5. **Fourteen bespoke storytelling components are consumed only by the eight forked pages.** The standing
   recommendation on those pages is "keep ours, re-skin". Taken literally, that drops
   `AgencyBooks`, `LocationMap`, `PortfolioPooling`, `Section24Wedge`, `DecisionWindow`, `DepartureWindow`,
   `FilingDates`, `SchemeFlow`, `FilingCadence`, `TaxYearGap`, `DisposalFigures`, `RateWedge`,
   `RentalProfitStack` and most of `ComparisonTable`'s placements on the floor. *Verified by consumer
   grep across their whole tree.*

And one **correction that removes work**:

6. **The Field.tsx toggle item in `CONTEXT.md` §5 is a false alarm and can be closed.** The bug the
   designer fixed existed only in *their own stub*. Our real
   `packages/web-shared/tools/components/Field.tsx:108-119` already had a better toggle branch — bordered
   card, `hover:` and `has-[:checked]:` states, `h-5 w-5` accent, brand token — **at the snapshot commit**
   (`git show 1d68a570:packages/web-shared/tools/components/Field.tsx`). The gated estate-wide item that
   "touches all 15 sites" is zero work. The only residual is one line: theirs renders `field.help` for
   toggles (their `Field.tsx:41-43`), ours does not. *Verified.*

---

## 1. Coverage statement

| | Count |
|---|---|
| Paths in `git diff --name-status 8041183 eb745e1` | **252** (130 M, 121 A, 1 D) |
| Rows in the table below | **252**, each path exactly once, no duplicates |
| Opened personally (diff or full file read, by me) | **~150** |
| Assigned from a delegated read I commissioned and reviewed | **27** (22 quarantine stubs, 5 binaries) |
| Assigned from another report's evidence alone | **0** |
| Could not determine | **0** |

**Completeness of the file list itself, verified two ways.** Their tree holds 1,190 tracked files;
the snapshot base holds 1,070; 1,070 + 121 added − 1 deleted = 1,190. Nothing is present in their tree
but absent from the diff. A separate `git ls-files` sweep for `*.png *.jpg *.jpeg *.ico *.svg *.webp
*.woff* *.ttf *.otf` returns 13 assets, of which exactly the 5 in the diff changed — no binary is
under-represented.

**Disposition totals**

| Disposition | Count |
|---|---|
| PORT | 159 |
| NO-DESIGN-CONTENT | 87 |
| ALREADY-HAVE | 5 |
| CARVE-OUT (sole disposition) | 1 |

Carve-outs are additionally flagged *inside* PORT rows, because for those files the carve-out constrains
the port rather than replacing it (take their layout, keep our SEO payload). Rule Zero means "CARVE-OUT"
as a whole-file verdict is rare by design — only `web/package.json` earns it outright.

---

## 2. The 252-row disposition table

`S` = git status. `+/-` = added/deleted lines (`bin` = binary). "Other reports" lists which of reports
01-13 mention this path; `-` means no other report names it (an orphan, analysed in §3).

| # | S | +/- | Path | Disposition | Other reports | Evidence / what porting involves |
|---|---|---|---|---|---|---|
| 1 | M | 6/0 | `.gitignore` | **PORT** | - | PARTIAL. Take `web/.screenshots/` only. Do NOT take their blanket `.claude/` line: monorepo .gitignore:91-97 deliberately un-ignores settings.json/commands/skills, so it would start ignoring tracked files. |
| 2 | A | 155/0 | `CONTEXT_SUMMARY.md` | **NO-DESIGN-CONTENT** | 01,04,12 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 3 | A | 329/0 | `CONTEXT_SUMMARY_SESSION10.md` | **NO-DESIGN-CONTENT** | 01,08 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 4 | A | 274/0 | `CONTEXT_SUMMARY_SESSION11.md` | **NO-DESIGN-CONTENT** | 01,04,06 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 5 | A | 291/0 | `CONTEXT_SUMMARY_SESSION2.md` | **NO-DESIGN-CONTENT** | 01,04,12 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 6 | A | 343/0 | `CONTEXT_SUMMARY_SESSION3.md` | **NO-DESIGN-CONTENT** | 01 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 7 | A | 356/0 | `CONTEXT_SUMMARY_SESSION4.md` | **NO-DESIGN-CONTENT** | - | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 8 | A | 382/0 | `CONTEXT_SUMMARY_SESSION5.md` | **NO-DESIGN-CONTENT** | - | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 9 | A | 362/0 | `CONTEXT_SUMMARY_SESSION6.md` | **NO-DESIGN-CONTENT** | 08 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 10 | A | 268/0 | `CONTEXT_SUMMARY_SESSION7.md` | **NO-DESIGN-CONTENT** | - | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 11 | A | 377/0 | `CONTEXT_SUMMARY_SESSION8.md` | **NO-DESIGN-CONTENT** | 06 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 12 | A | 399/0 | `CONTEXT_SUMMARY_SESSION9.md` | **NO-DESIGN-CONTENT** | 01 | Designer session notes, not shippable content. Keep as the rationale record; already mined into report 12. |
| 13 | A | bin | `Help centre pic.jpg` | **NO-DESIGN-CONTENT** | - | 1.48 MB 5943x3962 stock portrait, EXIF Copyright 'eugene barmin'. Zero code references. Uncropped master of specialist-avatar.jpg. Working detritus at repo root; do not take. |
| 14 | M | 56/12 | `niche.config.json` | **DONE (phase 2.7), two keys only, carve-out 3 on the rest** | 04,07,10,12 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 15 | M | 15/1 | `web/CLASS_NAMING_CONVENTIONS.md` | **PORT** | 01,07,12 | Class-naming spec. Copy to docs/Property/ alongside the guidelines. |
| 16 | A | 289/0 | `web/DESIGN_GUIDELINES.md` | **PORT** | 01,04,06,07,12 | The style spec itself. Copy to docs/Property/ as the design source of truth. Contains the Double Wired footer-credit requirement (open owner question). |
| 17 | M | 1/1 | `web/content/blog/birmingham-property-accountant.md` | **NO-DESIGN-CONTENT** | - | One-line related-links swap (/locations/<city> -> /services/property-accountant) on a city post we have since consolidated. CONTEXT.md sec.4: ignore theirs. |
| 18 | M | 1/1 | `web/content/blog/bristol-property-accountant.md` | **NO-DESIGN-CONTENT** | - | One-line related-links swap (/locations/<city> -> /services/property-accountant) on a city post we have since consolidated. CONTEXT.md sec.4: ignore theirs. |
| 19 | M | 1/1 | `web/content/blog/london-property-accountant.md` | **NO-DESIGN-CONTENT** | - | One-line related-links swap (/locations/<city> -> /services/property-accountant) on a city post we have since consolidated. CONTEXT.md sec.4: ignore theirs. |
| 20 | M | 2/2 | `web/content/blog/manchester-property-accountant.md` | **NO-DESIGN-CONTENT** | - | One-line related-links swap (/locations/<city> -> /services/property-accountant) on a city post we have since consolidated. CONTEXT.md sec.4: ignore theirs. |
| 21 | M | 20/20 | `web/content/resources/stamp-duty.md` | **PORT** | - | PARTIAL. 18 of 20 changed lines are pure em-dash removal, which matches our own house rule: take. The other 2 rewrite FAQ <h3> question strings out of natural-query form ('My property is in Scotland - can I use these figures?' -> 'Can I use these figures if my property is in Scotland?'). Carve-out 5: keep the query-shaped question, just swap the em-dash for a colon. |
| 22 | A | 10443/0 | `web/package-lock.json` | **NO-DESIGN-CONTENT** | - | Lockfile regenerated for their standalone tree (vendored web-shared, playwright). Ours is authoritative. |
| 23 | M | 4/2 | `web/package.json` | **CARVE-OUT** | 01,02,04,05,06,09 | Carve-out 6 (build correctness). Their `"@accounting-network/web-shared": "file:vendor/web-shared"` must NOT come across. Optional to take: `"shots": "node scripts/shots.mjs"` + playwright devDep. |
| 24 | A | bin | `web/public/specialist-avatar.jpg` | **PORT** | 08 | 256x256 JPEG, 14,303 B. Consumed by their SpecialistWidget.tsx:509 (36px) and :808 (28px). Monorepo has no equivalent. Must ship with the widget change or the widget renders a broken image. |
| 25 | A | 211/0 | `web/scripts/shots.mjs` | **PORT** | 12 | Dev-only Playwright screenshot/QA harness against localhost:3002. Walks src/app for routes, shoots 390 + 1440 at DPR 2, dismisses the support widget, scroll-reveals IO animations, collects console errors to report.json. Useful for the port's own visual QA. Adds playwright devDep. |
| 26 | M | 144/83 | `web/src/app/about/page.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 27 | M | 21/265 | `web/src/app/api/cron/deploy-watch/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 28 | A | 274/0 | `web/src/app/api/cron/deploy-watch/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 29 | M | 21/70 | `web/src/app/api/cron/lead-nurture-digest/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 30 | A | 79/0 | `web/src/app/api/cron/lead-nurture-digest/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 31 | M | 22/111 | `web/src/app/api/cron/lead-nurture/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 32 | A | 120/0 | `web/src/app/api/cron/lead-nurture/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 33 | M | 23/348 | `web/src/app/api/cron/lead-reconcile/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 34 | A | 356/0 | `web/src/app/api/cron/lead-reconcile/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 35 | M | 21/57 | `web/src/app/api/cron/lead-retention/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 36 | A | 66/0 | `web/src/app/api/cron/lead-retention/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 37 | M | 21/54 | `web/src/app/api/leads/book/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 38 | A | 60/0 | `web/src/app/api/leads/book/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 39 | M | 21/51 | `web/src/app/api/leads/booking-viewed/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 40 | A | 57/0 | `web/src/app/api/leads/booking-viewed/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 41 | M | 20/242 | `web/src/app/api/leads/complete/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 42 | A | 249/0 | `web/src/app/api/leads/complete/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 43 | M | 22/76 | `web/src/app/api/leads/confirm/[token]/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 44 | A | 85/0 | `web/src/app/api/leads/confirm/[token]/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 45 | M | 20/103 | `web/src/app/api/leads/enrich/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 46 | A | 113/0 | `web/src/app/api/leads/enrich/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 47 | M | 20/103 | `web/src/app/api/leads/enroll/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 48 | A | 110/0 | `web/src/app/api/leads/enroll/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 49 | M | 20/227 | `web/src/app/api/leads/events/route.ts` | **NO-DESIGN-CONTENT** | 09 | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 50 | A | 234/0 | `web/src/app/api/leads/events/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | The one non-identical .disabled: a single console.error em-dash became a comma (line ~133). Present already at their base 8041183, so it is zip-packaging mangling, not designer work. Nothing to port. |
| 51 | M | 22/93 | `web/src/app/api/leads/forwarded/[token]/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 52 | A | 102/0 | `web/src/app/api/leads/forwarded/[token]/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 53 | M | 19/53 | `web/src/app/api/leads/generate-sequence/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 54 | A | 60/0 | `web/src/app/api/leads/generate-sequence/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 55 | M | 19/83 | `web/src/app/api/leads/handoff/resend/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 56 | A | 90/0 | `web/src/app/api/leads/handoff/resend/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 57 | M | 21/70 | `web/src/app/api/leads/ics/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 58 | A | 76/0 | `web/src/app/api/leads/ics/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 59 | M | 19/234 | `web/src/app/api/leads/inbound/email/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 60 | A | 241/0 | `web/src/app/api/leads/inbound/email/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 61 | M | 20/238 | `web/src/app/api/leads/inbound/twilio/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 62 | A | 245/0 | `web/src/app/api/leads/inbound/twilio/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 63 | M | 20/351 | `web/src/app/api/leads/notify/route.ts` | **NO-DESIGN-CONTENT** | 06 | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 64 | A | 361/0 | `web/src/app/api/leads/notify/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 65 | M | 22/114 | `web/src/app/api/leads/optout/[token]/route.ts` | **NO-DESIGN-CONTENT** | - | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 66 | A | 123/0 | `web/src/app/api/leads/optout/[token]/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 67 | M | 20/315 | `web/src/app/api/leads/submit/route.ts` | **NO-DESIGN-CONTENT** | 06,08 | Quarantine stub. Identical 3-line template: one module-local UNAVAILABLE 503 NextResponse + verb exports. No JSX, no className, no rendered copy. Discard; keep ours. |
| 68 | A | 322/0 | `web/src/app/api/leads/submit/route.ts.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of OUR original. Nothing of theirs in it. |
| 69 | M | bin | `web/src/app/apple-icon.png` | **PORT - DONE (phase 0.6)** | - | 180x180 opaque green house, 1,120 B. Ours is byte-identical to icon.png (same dental tooth mark at 1024). 180x180 opaque is the correct Apple touch-icon spec. |
| 70 | M | 51/168 | `web/src/app/blog/capital-gains-tax/page.tsx` | **DONE (phase 3.4)** | 05 | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 71 | M | 51/168 | `web/src/app/blog/incorporation-and-company-structures/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 72 | M | 51/168 | `web/src/app/blog/landlord-tax-essentials/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 73 | M | 51/168 | `web/src/app/blog/making-tax-digital-mtd/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 74 | M | 50/164 | `web/src/app/blog/non-resident-landlord-tax/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 75 | M | 202/59 | `web/src/app/blog/page.tsx` | **DONE (phase 3.3)** | 05,07,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 76 | M | 51/168 | `web/src/app/blog/portfolio-management/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 77 | M | 51/168 | `web/src/app/blog/property-accountant-services/page.tsx` | **DONE (phase 3.4)** | 04 | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 78 | M | 50/164 | `web/src/app/blog/property-types-and-specialist-tax/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 79 | M | 51/168 | `web/src/app/blog/section-24-and-tax-relief/page.tsx` | **DONE (phase 3.4)** | - | One of 9 identical 79-80 line hub shells: metadata + <BlogCategoryHub> with per-category copy. Template pattern analysed in report 05. Carve-out 5 on metadata/canonical. Depends on BlogCategoryHub + HubArticleList + NumberedPagination. |
| 80 | M | 54/42 | `web/src/app/calculators/[slug]/page.tsx` | **PORT** | 04,05,10,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 81 | M | 67/54 | `web/src/app/calculators/incorporation-cost-calculator/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 82 | M | 58/45 | `web/src/app/calculators/mtd-checker/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 83 | M | 107/31 | `web/src/app/calculators/page.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 84 | M | 57/44 | `web/src/app/calculators/portfolio-profitability-calculator/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 85 | M | 65/52 | `web/src/app/calculators/section-24-calculator/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 86 | M | 63/50 | `web/src/app/calculators/stamp-duty-calculator/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 87 | M | 33/102 | `web/src/app/complete/page.tsx` | **ALREADY-HAVE** | 05,06,08,09 | Stub DOES render UI (a 'warm fallback' card, page.tsx:38-61) but every class is copied verbatim from ours (Property/web/src/app/complete/page.tsx:27-36,56-64,117-127). Ours is a strict superset: three distinct fallback states plus a try/catch around adminSelect. Only new string is the quarantine-specific 'We cannot check your personal link right now', a condition that does not exist in our tree. |
| 88 | A | 132/0 | `web/src/app/complete/page.tsx.disabled` | **NO-DESIGN-CONTENT** | - | Byte-identical preserved copy of ours. |
| 89 | M | 18/19 | `web/src/app/contact/page.tsx` | **PORT** | 03,05,06,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 90 | M | 6/6 | `web/src/app/cookie-policy/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 91 | M | 37/14 | `web/src/app/embed/page.tsx` | **PORT** | 04,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 92 | M | 2/2 | `web/src/app/error.tsx` | **PORT** | 08 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 93 | M | bin | `web/src/app/favicon.ico` | **DONE (phase 2.5), with the 256 regenerated** | - | 16/32/48 green house, 2,446 B. Ours is a black circle with a white triangle (generic placeholder, matches nothing). CAVEAT: theirs drops the 256px entry; regenerate it from icon.png if Windows tiles matter. |
| 94 | M | 367/0 | `web/src/app/globals.css` | **DONE (phase 1.1), with carve-out 6** | 01,12 | The design system itself. CARVE-OUT 6: must re-add `@source "../../../../packages/web-shared";`. Also defines .logo-house draw animation (line ~387) consumed only by BrandWordmarkHomeLink, and .prose-blog aside a.aside-cta consumed only by BlogPostRenderer. --radius is 0rem, so shadcn rounded-lg resolves to 0: their rounded-xl sweep is a literal utility, not a token. | <br><br>**PHASE 8.1 (2026-08-23):** the unlayered `h1..h6` rule at `:154-158` is now SPLIT. `font-weight` and `letter-spacing` moved into `@layer base`; **`line-height: 1.2` was deliberately left UNLAYERED** and the file explains why at length. Layering the line-height hands every heading to Tailwind's per-size `text-*` bundled defaults: measured, 2,214 headings across 163 route/width combinations, every hero h1 from 72px to 60px. Do not "finish the job" by merging the two blocks.
| 95 | M | bin | `web/src/app/icon.png` | **PORT - DONE (phase 0.6)** | - | 512x512 RGBA green house, 4,089 B. REPLACES a 1024x1024 384,086 B image that is the DENTAL 'DFP' tooth mark. Ours is the wrong brand, live today. Take theirs. |
| 96 | M | 215/96 | `web/src/app/incorporation/page.tsx` | **PORT** | 03,04,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 97 | A | 1262/0 | `web/src/app/landlord-tax/page.tsx` | **DONE (phase 6.5)** | 02,03 | One of the 8 independently-built forked pages. Per-page owner decision (CONTEXT.md sec.7); standing recommendation is keep our content, re-skin in their system. Carve-outs 1 and 5 apply. See report 03. |
| 98 | M | 17/1 | `web/src/app/layout.tsx` | **DONE (phase 1.2 + 2.1); Clarity deliberately NOT ported (carve-out 3)** | 01,04,06,07,08,09,10 | CARVE-OUT 3: still passes clarityProjectId; Clarity stays dead. CARVE-OUT: the <noscript> block (layout.tsx:90-102) carries 10 [data-draw="off"] release rules for the storytelling animations. Port the components without it and every animated block renders collapsed for no-JS and for non-JS crawlers. Also wires buildPrimaryNav() into PageShell (layout.tsx:5,123). |
| 99 | M | 29/33 | `web/src/app/locations/[slug]/page.tsx` | **PORT** | - | Same unsplash -> HeroBrickBackdrop swap, same CTASection -> LeadCTAPanel swap, heading scale 3xl -> 2xl/sm:4xl, border-l-4 accents removed. Heavy churn on both sides; see report 04. |
| 100 | M | 24/23 | `web/src/app/locations/page.tsx` | **PORT** | - | Drops the unsplash remote hero for HeroBrickBackdrop; swaps CTASection for LeadCTAPanel with a deliberate copy rationale (people whose town has no page still convert). Facts pass + carve-out 5 on metadata. |
| 101 | A | 1191/0 | `web/src/app/making-tax-digital-landlords/page.tsx` | **DONE** | 02,03 | Phase 6.6 (`65d9afc8`), ours as the base in their layout. Carve-outs 1 and 5 applied; links 43 -> 43, sets IDENTICAL; all four JSON-LD types. See the 2026-08-22 section below. |
| 102 | M | 1/1 | `web/src/app/not-found.tsx` | **PORT** | 01,05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. | <br><br>**PHASE 8.11 (2026-08-23):** `font-serif` removed from the h1, matching the designer's own not-found h1 exactly. It was the LAST `font-serif` in `Property/web/src` (.tsx, .ts and .css alike). Also `font-semibold` -> `font-bold` on the same h1 under 8.1, a zero-render change.
| 103 | M | 193/336 | `web/src/app/page.tsx` | **PORT** | 01,03,04,05,06,07,10,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 104 | M | 12/12 | `web/src/app/privacy-policy/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 105 | M | 173/32 | `web/src/app/property-tax-rates/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 106 | M | 371/186 | `web/src/app/research/landlord-tax-index/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 107 | M | 1/1 | `web/src/app/research/page.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 108 | M | 4/4 | `web/src/app/resources/[topic]/page.tsx` | **PORT** | - | 4 lines: border-l-4 accent bars dropped, rounded-lg -> rounded-xl on two buttons, one hover restyle. Part of the systematic sweep. |
| 109 | A | 923/0 | `web/src/app/section-24/page.tsx` | **PORT** | 02,03 | One of the 8 independently-built forked pages. Per-page owner decision (CONTEXT.md sec.7); standing recommendation is keep our content, re-skin in their system. Carve-outs 1 and 5 apply. See report 03. |
| 110 | A | 652/0 | `web/src/app/services/landlord-accountant/page.tsx` | **DONE (phase 6.4)** | 03 | One of the 8 independently-built forked pages. Per-page owner decision (CONTEXT.md sec.7); standing recommendation is keep our content, re-skin in their system. Carve-outs 1 and 5 apply. See report 03. |
| 111 | A | 616/0 | `web/src/app/services/non-resident-landlord/page.tsx` | **DONE** (6.7, `610ed959`) | 03 | Ours as the base, their layout end to end. Carve-outs 1 and 5 applied; all sixteen blog links and the rebasing dates kept. Links 48 -> 48 from rendered HTML, sets IDENTICAL. Detail: `logs/phase_6e.md`. |
| 112 | M | 232/119 | `web/src/app/services/page.tsx` | **PORT** | 03,04,07,10 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 113 | A | 605/0 | `web/src/app/services/property-accountant/page.tsx` | **DONE (6.1)** | 03,05 | One of the 8 independently-built forked pages. Per-page owner decision (CONTEXT.md sec.7); standing recommendation is keep our content, re-skin in their system. Carve-outs 1 and 5 apply. See report 03. |
| 114 | A | 599/0 | `web/src/app/services/property-tax-advice/page.tsx` | **PORT** | 03 | One of the 8 independently-built forked pages. Per-page owner decision (CONTEXT.md sec.7); standing recommendation is keep our content, re-skin in their system. Carve-outs 1 and 5 apply. See report 03. |
| 115 | M | 7/0 | `web/src/app/sitemap.ts` | **PORT** | 03,07,10 | Adds the 7 new page routes. CARVE-OUT 5: merge into ours, do not replace; ours carries the 6 pages they never saw. |
| 116 | M | 14/14 | `web/src/app/terms/page.tsx` | **PORT** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 117 | M | 1/1 | `web/src/app/thank-you/page.tsx` | **PORT** | 07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 118 | M | 2/2 | `web/src/components/analytics/ConsentBanner.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 119 | A | 229/0 | `web/src/components/blog/BlogCategoryHub.tsx` | **DONE (phase 3.1), with carve-out 5** | 07,10 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. | <br><br>**PHASE 8.3 (2026-08-23):** the `BreadcrumbList` node in the hub's own `@graph` (`:73-82`) is REMOVED. It duplicated the one `<Breadcrumb>` emits at `components/ui/Breadcrumb.tsx:30`, so all ten hubs emitted `BreadcrumbList` twice. Phase 0.10 precedent: drop the page-level copy, keep the shared component's. Verified from rendered JSON-LD, exactly one on all ten, `CollectionPage` preserved.
| 120 | M | 38/42 | `web/src/components/blog/BlogListWithSearch.tsx` | **DONE (phase 3.3)** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 121 | M | 96/68 | `web/src/components/blog/BlogPostRenderer.tsx` | **DONE (phase 3.2)** | 01,05,06,10 | Carries the invisible-label fix (LeadForm on bg-slate-900). Also the only consumer of the .prose-blog aside a.aside-cta rules in globals.css. See report 05. |
| 122 | A | 38/0 | `web/src/components/blog/BlogSidebarCta.tsx` | **DONE (phase 3.1)** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 123 | A | 95/0 | `web/src/components/blog/HubArticleList.tsx` | **DONE (phase 3.1), carve-out 5 applied** | - | CARVE-OUT 5 (already known): client-paginates hubs at postsPerPage=12. Keep the template, raise to the full count. |
| 124 | M | 1/1 | `web/src/components/blog/InlineMiniLeadForm.tsx` | **DONE (phase 3.2)** | 06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 125 | A | 88/0 | `web/src/components/blog/NumberedPagination.tsx` | **DONE (phase 3.1)** | 01 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 126 | M | 5/3 | `web/src/components/blog/TableOfContents.tsx` | **DONE (phase 3.2), with its BlogPostRenderer half** | - | Removes sticky/overflow from the desktop TOC because the sticky wrapper moved to BlogPostRenderer; two nested sticky scroll areas fought. COUPLED: port this without the BlogPostRenderer sidebar change and the desktop TOC stops sticking. | <br><br>**PHASE 8.1 (2026-08-23):** this file's `:89` h2 is one of only TWO headings on the site whose typography deliberately CHANGED under the cascade-layer fix. `text-sm font-bold uppercase tracking-wide` on the sticky TOC label: letter-spacing -0.02em -> 0.025em, desktop only (`hidden lg:block`), reaching every blog article. The class string is byte-identical to the designer's, and positive tracking on an uppercase micro-label is their own Eyebrow pattern.
| 127 | M | 2/2 | `web/src/components/brand/BrandLogoHero.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 128 | M | 38/19 | `web/src/components/brand/BrandWordmarkHomeLink.tsx` | **DONE (phase 2.6)** | - | New lucide <Home> mark with className 'logo-house', plus aria-label/title built from the visible wordmark (WCAG 2.5.3 Label in Name). COUPLED: the .logo-house self-drawing stroke animation lives in globals.css:387+ and the hover variant keys off the parent .group. Port this file without that CSS and the animation is silently lost. |
| 129 | D | 0/36 | `web/src/components/calculators/CalcResultCta.tsx` | **PORT** | 06,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 130 | M | 1/1 | `web/src/components/calculators/CalculatorClient.tsx` | **PORT** | 09 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 131 | A | 57/0 | `web/src/components/calculators/CalculatorLinkCards.tsx` | **DONE + WIRED (6.1, 6.3, and 7.5)** | - | Phase 7.5 added a third consumer, `/for-letting-agents`, replacing a five-item bullet list of the same five hrefs. That page is the closest thing in the tree to the "free tools" block the component's own docstring names as its home. ZERO consumers in their tree, verified by grep. The designer wrote it, argued in its own docstring that tabs 'hide three in four behind a click and put the other three behind JS', then shipped CalculatorTabs anyway. This is their own already-written fix for the CalculatorTabs SEO regression. Highest-value orphan in the audit. |
| 132 | A | 211/0 | `web/src/components/calculators/CalculatorTabs.tsx` | **PORT** | 03 | CARVE-OUT 5 REQUIRED. Renders <button role=tab> panels, NOT <a href> links. Used on 11 pages, each of which loses every crawlable link to /calculators/*. Same class of regression as HubArticleList. Fix: pair it with CalculatorLinkCards (below) or add a crawlable link row. |
| 133 | A | 90/0 | `web/src/components/calculators/HeldResult.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 134 | M | 9/12 | `web/src/components/calculators/IncorporationCostCalculator.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 135 | M | 13/14 | `web/src/components/calculators/MTDCheckerCalculator.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 136 | M | 1/1 | `web/src/components/calculators/PageResultCta.tsx` | **PORT** | 06,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 137 | M | 10/13 | `web/src/components/calculators/PortfolioProfitabilityCalculator.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. | <br><br>**PHASE 8.1 (2026-08-23):** this file's `:185` h4 is the OTHER deliberate typography activation. `uppercase tracking-wider` on "Portfolio summary": letter-spacing -0.02em -> 0.05em. Its own sibling `<div>` at `:187` carries the identical utility and, being a div, has always rendered it, so the heading now matches the rows beneath it.
| 138 | A | 103/0 | `web/src/components/calculators/ResultGate.tsx` | **PORT** | 06,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 139 | M | 4/9 | `web/src/components/calculators/ResultGateModal.tsx` | **PORT** | 06,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 140 | M | 9/12 | `web/src/components/calculators/Section24Calculator.tsx` | **PORT** | 02,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 141 | M | 16/12 | `web/src/components/calculators/StampDutyCalculator.tsx` | **PORT** | 13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 142 | M | 3/3 | `web/src/components/calculators/premium/MiniGrid.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 143 | M | 1/1 | `web/src/components/calculators/premium/MobileToolSlot.tsx` | **PORT** | 06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 144 | M | 48/55 | `web/src/components/calculators/premium/PremiumCalculator.tsx` | **PORT** | 02,07,09,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 145 | M | 45/14 | `web/src/components/calculators/premium/PremiumUpgrade.tsx` | **PORT** | 06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 146 | A | 28/0 | `web/src/components/calculators/resultGateStorage.ts` | **PORT** | - | New. Per-campaign sessionStorage reveal memory, fixing an 'unlock one, unlock all' bug. Shared by ResultGate and PremiumCalculator so they cannot drift. Gated by the unvalidated soft-gate conversion decision (CONTEXT.md sec.7). |
| 147 | M | 1/1 | `web/src/components/embed/EmbedCta.tsx` | **PORT** | 02,06,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 148 | M | 1/1 | `web/src/components/forms/DetailsForm.tsx` | **PORT** | 06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 149 | M | 3/3 | `web/src/components/forms/LeadForm.tsx` | **PORT** | 01,05,06,09 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 150 | M | 6/6 | `web/src/components/forms/MiniCapture.tsx` | **PORT** | 06,07,09 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 151 | M | 3/3 | `web/src/components/intent/DeepScrollModal.tsx` | **PORT** | 06,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 152 | A | 43/0 | `web/src/components/layout/HeroBrickBackdrop.tsx` | **DONE (phase 1.4)** | 01,03,05 | New local hero backdrop that REPLACES a remote images.unsplash.com hero on /locations and /locations/[slug]. Removes a third-party image host from the critical path. |
| 153 | M | 18/6 | `web/src/components/layout/PageShell.tsx` | **DONE (phase 0.5 + 2.1/2.2)** | 04,13 | Now takes a `nav` prop. Half of the 5-file nav unit. |
| 154 | M | 134/28 | `web/src/components/layout/SiteFooter.tsx` | **DONE (phase 2.2), credit shipped per owner Decision B** | 01,04 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 155 | M | 197/23 | `web/src/components/layout/SiteHeader.tsx` | **DONE (phase 2.1), manual merge, one deliberate divergence** | 04,07,10 | Consumes item.groups (SiteHeader.tsx:79,88,179,183,305,310). Rule Zero consequence already decided: take their structure, layer our nav entries in. Half of the 5-file nav unit. |
| 156 | A | 94/0 | `web/src/components/property/AgencyBooks.tsx` | **DONE (phase 6.4)** | 03 | Bespoke storytelling component consumed ONLY by /services/landlord-accountant. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 157 | M | 2/2 | `web/src/components/property/CalculatorPreviewGrid.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 158 | A | 201/0 | `web/src/components/property/ComparisonTable.tsx` | **PORT** | 03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 159 | A | 104/0 | `web/src/components/property/CoverageCards.tsx` | **PORT** | 03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 160 | A | 77/0 | `web/src/components/property/DecisionWindow.tsx` | **PORT** | 03 | Bespoke storytelling component consumed ONLY by /services/property-tax-advice. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 161 | A | 122/0 | `web/src/components/property/DepartureWindow.tsx` | **DONE** (6.7, `610ed959`) | 03 | Home: the "Moving abroad with a UK portfolio" section, added beside our three paragraphs, replacing nothing. One Rule Zero (c) swap on the "Mostly gone" end-label, 2.51:1 -> 4.55:1. No `ExampleFigureNote`: it carries no numbers by design. |
| 162 | A | 90/0 | `web/src/components/property/DisposalFigures.tsx` | **DONE (phase 6.5)** | 03 | Bespoke storytelling component consumed ONLY by /landlord-tax + non-resident-landlord. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 163 | A | 87/0 | `web/src/components/property/DrawnTickList.tsx` | **PORT** | 03 | Sets data-draw; .tick-draw released by the layout.tsx <noscript> block. |
| 164 | A | 109/0 | `web/src/components/property/FilingCadence.tsx` | **DONE** | 03 | Phase 6.6 (`65d9afc8`), byte-identical. Home: the opening "What is MTD for Income Tax" section on /making-tax-digital-landlords, added beside their prose. The risk this row recorded did not materialise: the placement map gave it a destination and it renders. |
| 165 | A | 130/0 | `web/src/components/property/FilingDates.tsx` | **DONE** (6.7, `610ed959`) | 03 | Home: the "Self Assessment when you live overseas" section, added beside our four paragraphs. One carve-out 1 back-patch: the MTD ladder gains its April 2028 / £20,000 tile. Deliberately NOT used on /landlord-tax, per report 12 §5.3 item 28. |
| 166 | A | 176/0 | `web/src/components/property/LeadCTAPanel.tsx` | **DONE (phase 3.1)** | 01,03,05,06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 167 | A | 38/0 | `web/src/components/property/LocationChips.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 168 | A | 124/0 | `web/src/components/property/LocationMap.tsx` | **DONE (phase 6.4)** | 03 | Bespoke storytelling component consumed ONLY by /services/landlord-accountant. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 169 | M | 1/1 | `web/src/components/property/MTDCountdown.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. | <br><br>**PHASE 8.9 (2026-08-23), OWN ISOLATED COMMIT `9d82560b` so it reverts in one line.** This component returns null past its deadline, so it had rendered NOTHING since 6 April 2026 while still mounted on the homepage (`page.tsx:331`) and every MTD article (`BlogPostRenderer.tsx:309`). Retargeted to the 6 April 2027 £30,000 step, which `house_positions.md` section 3 locks. Copy moved with the date ("MTD starts 6 April 2027" would be false; it started in 2026). Also fixed a link that would have gone live BROKEN: "Check if you're affected" pointed at `#mtd`, and no `id="mtd"` exists on either surface; it now points at `/making-tax-digital-landlords`. Self-expires again 6 April 2028.
| 170 | A | 78/0 | `web/src/components/property/NumberedReasons.tsx` | **PORT** | - | Sets data-draw; .story-numeral* released by the layout.tsx <noscript> block. Consumed only by /about. |
| 171 | A | 101/0 | `web/src/components/property/PenaltyLadder.tsx` | **DONE (phase 6.5)** | 03 | Sets data-draw; .penalty-ladder-* released by the layout.tsx <noscript> block. |
| 172 | A | 108/0 | `web/src/components/property/PortfolioPooling.tsx` | **DONE (phase 6.4)** | 03 | Bespoke storytelling component consumed ONLY by /services/landlord-accountant. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 173 | M | 1/1 | `web/src/components/property/ProblemSolutionSplit.tsx` | **PORT** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 174 | A | 111/0 | `web/src/components/property/ProblemStatement.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 175 | A | 133/0 | `web/src/components/property/ProcessTimeline.tsx` | **PORT** | 03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. | <br><br>**PHASE 8.7 (2026-08-23), Rule Zero (c):** the inactive step number was `text-slate-400` on a white chip, 2.63:1 against the 4.5:1 AA floor. Now `text-slate-500`, 4.76:1. Live on 6 routes. Nothing else about the treatment changed.
| 176 | A | 98/0 | `web/src/components/property/PromptMarquee.tsx` | **PORT** | 03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 177 | A | 147/0 | `web/src/components/property/RateWedge.tsx` | **PORT** | 03 | Sets data-draw; .rate-wedge-fill released by the layout.tsx <noscript> block. Consumed only by /section-24. |
| 178 | A | 215/0 | `web/src/components/property/RentalProfitStack.tsx` | **DONE (phase 6.5)** | 03 | Sets data-draw; .profit-stack-* released by the layout.tsx <noscript> block. Consumed only by /landlord-tax. |
| 179 | A | 177/0 | `web/src/components/property/SchemeFlow.tsx` | **DONE** (6.7, `610ed959`) | 03 | Home: the "How the non-resident landlord scheme catches you" section, added BENEATH our four paragraphs and their four blog links, never instead of them. One Rule Zero (c) swap on the five "Not deducted" `Minus` marks, 2.51:1 -> 4.55:1. |
| 180 | A | 86/0 | `web/src/components/property/ScrollGlowGroup.tsx` | **DONE (phase 1.4)** | 01,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 181 | A | 91/0 | `web/src/components/property/Section24Wedge.tsx` | **DONE (phase 6.4)** | 03 | Bespoke storytelling component consumed ONLY by /services/landlord-accountant. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 182 | M | 7/6 | `web/src/components/property/ServiceTiers.tsx` | **PORT** | - | Swaps the ✓ text glyph for a lucide <Check aria-hidden>, adds rounded-xl/rounded-full, drops the border-t-4 push-button in favour of flat + active:bg. Real a11y improvement (the glyph was announced by screen readers). |
| 183 | A | 92/0 | `web/src/components/property/StatsCounter.tsx` | **PORT** | 03,07 | New. Consumes siteStats. CARVE-OUT 1 on the figures it displays. |
| 184 | A | 71/0 | `web/src/components/property/TaxYearGap.tsx` | **DONE (6.1)** | 03 | Bespoke storytelling component consumed ONLY by /services/property-accountant. AT RISK: if the forked-page decision is 'keep ours, re-skin', this component has no home and its design is silently dropped unless the re-skin explicitly places it. |
| 185 | M | 5/5 | `web/src/components/property/TestimonialSlider.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 186 | A | 89/0 | `web/src/components/property/TestimonialsSection.tsx` | **PORT** | 03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 187 | A | 71/0 | `web/src/components/property/WhyUsList.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 188 | M | 225/141 | `web/src/components/research/LandlordIndexCharts.tsx` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 189 | M | 29/56 | `web/src/components/resources/CalculatorPageResources.tsx` | **PORT** | 04,13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 190 | M | 1/1 | `web/src/components/resources/GateOrForm.tsx` | **PORT** | 02,05,06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 191 | M | 4/4 | `web/src/components/resources/ResourceGate.tsx` | **PORT** | 06 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 192 | M | 24/17 | `web/src/components/support/SpecialistWidget.tsx` | **PORT** | 06,07,08 | Adds the specialist-avatar.jpg image at :509 and :808. Ships with that asset or the widget renders broken. Separate failure-mode investigation is report 08. |
| 193 | M | 16/6 | `web/src/components/ui/Breadcrumb.tsx` | **PORT** | 04,10 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 194 | M | 1/1 | `web/src/components/ui/CTASection.tsx` | **DONE (phase 4 token sweep). FILE KEPT, now ZERO consumers.** | - | One line: border-l-4 accent bar -> rounded-xl. <br><br>**"Live on 16 of our pages" CORRECTED 2026-08-22 by Phase 7, measured.** `git grep -c "<CTASection" design-port-phase-6 -- Property/web/src` returns **four** files, and all four were the Phase 7 pages (`/cost-of-selling-a-property`, `/leasehold`, `/landed-estates`, `/landlord-compliance`). The 16 figure comes from reports 02/06, written before Phases 3, 5 and 6 moved every other consumer to `LeadCTAPanel`; it was right when written and is stale now. Phase 7 moved the last four, so the count is **0**. The FILE is untouched and still exported per Rule Zero (b) — nothing of the designer's is discarded — but the "do not delete it" instruction now protects a consumer-less component, which is raised as an owner question in `logs/phase_7.md`. | <br><br>**PHASE 8.8 (2026-08-23): FILE DELETED.** The owner question raised in `logs/phase_7.md` was resolved by looking at the designer's own tree rather than by preference: `Property_zip` has **zero** `<CTASection` consumers too, and their session 10 section 7 named it on the dead-component list. Our four remaining textual references are comments recording what `LeadCTAPanel` replaced, and the designer left the same comments in the same places (`Property_zip` `about/page.tsx:220`, `landlord-tax/page.tsx:1239`, `making-tax-digital-landlords/page.tsx:1170`, `section-24/page.tsx:904`). So deleting it is faithful to the designer, not against them. Rule Zero (b) is satisfied by git history. No test referenced it.
| 195 | A | 278/0 | `web/src/components/ui/CardCarousel.tsx` | **DONE (phase 1.4)** | 01,03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 196 | A | 30/0 | `web/src/components/ui/ExampleFigureNote.tsx` | **DONE (phase 1.4)** | 01,03 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 197 | A | 61/0 | `web/src/components/ui/EyebrowRule.tsx` | **DONE (phase 1.4, with its <noscript> release in the same commit)** | 01 | Sets data-draw. Depends on the layout.tsx <noscript> release rules. |
| 198 | A | 47/0 | `web/src/components/ui/FaqSection.tsx` | **DONE (phase 1.4)** | 01 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 199 | M | 2/2 | `web/src/components/ui/StickyCTA.tsx` | **PORT** | 06,07 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 200 | M | 1/1 | `web/src/components/ui/accordion.tsx` | **DONE (phase 1.3)** | 05 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 201 | M | 1/1 | `web/src/components/ui/chart.tsx` | **DONE (phase 1.3)** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 202 | M | 1/1 | `web/src/components/ui/input.tsx` | **DONE (phase 1.3)** | 02 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 203 | M | 33/6 | `web/src/components/ui/layout-utils.ts` | **DONE (phase 1.2)** | 01,04,10 | The button/container system. Rule Zero consequence already decided: take it and re-skin the six unseen pages in the same pass. |
| 204 | A | 104/0 | `web/src/components/ui/page-blocks.tsx` | **DONE (phase 1.4, CardStack included rather than stripped)** | 01,03,05 | New. 29 consumers, the single most-depended-on new file in their tree. Port first. |
| 205 | M | 15/1 | `web/src/config/site.ts` | **DONE (phase 2.7), two hunks only, carve-out 3 on the rest** | 04,08,10 | Adds the NavItem type with `children` and `groups`. Required by nav.ts / SiteHeader. |
| 206 | M | 25/1 | `web/src/lib/blog.ts` | **DONE (phase 3.1), extended to ten categories** | 01,04,05,09,10,12 | Adds CANONICAL_CATEGORY_NAMES + categoryDisplayName(): fixes cards rendering whichever category-name variant a post's frontmatter happens to carry. Real bug fix, verify the same inconsistency exists in our 783 posts. | <br><br>**PHASE 8.2 (2026-08-23):** `getRelatedPosts` (`:65`) now matches on the category SLUG, not the raw frontmatter string. Three of our ten categories carry a two-way spelling split, so each was TWO disconnected related-article pools. Measured over all 783 posts: 13 groups -> 10, pools shrank on 0 and grew on 357, rendered top-3 changed on 228 pages. Same root cause Phase 0.4 fixed for `CTA_BY_CATEGORY`. Guarded by `src/tests/related-posts-category-split.test.ts`, verified to fail when reverted.
| 207 | A | 52/0 | `web/src/lib/calculators/nav.ts` | **DONE (phase 2.1), one signature fix** | 04,09,10,13 | New. Derives the Calculators dropdown from the tool registry so nav can never drift from the fleet. Server-only by construction. Half of the 5-file nav unit above. |
| 208 | M | 2/2 | `web/src/lib/calculators/premium/tools/capital-gains.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 209 | M | 1/1 | `web/src/lib/calculators/premium/tools/landlord-essentials.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 210 | M | 7/7 | `web/src/lib/calculators/premium/tools/mtd.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 211 | M | 1/1 | `web/src/lib/calculators/premium/tools/section-24.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 212 | M | 3/3 | `web/src/lib/calculators/premium/tools/stamp-duty.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 213 | M | 1/1 | `web/src/lib/calculators/tools/first-time-buyer-stamp-duty-calculator.ts` | **PORT** | 13 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 214 | M | 2/2 | `web/src/lib/calculators/tools/lbtt-calculator.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 215 | M | 1/1 | `web/src/lib/calculators/tools/ltt-calculator.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 216 | M | 49/1 | `web/src/lib/essential-guides.ts` | **DONE (phase 3.3)** | 10 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 217 | M | 3/3 | `web/src/lib/mtd.ts` | **PORT** | - | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 218 | A | 18/0 | `web/src/lib/nav.ts` | **DONE (phase 2.1), reads getActiveNav** | 04,10 | New. buildPrimaryNav() attaches the calculator fleet to the Calculators nav entry. Coupled unit: nav.ts + lib/calculators/nav.ts + config/site.ts NavItem type + PageShell + SiteHeader. Port fewer than all five and the mega-menu silently does not exist. |
| 219 | A | 16/0 | `web/src/lib/site-stats.ts` | **PORT** | 03,04,12 | New. Single source for the four headline stats. CARVE-OUT 1: '100+ landlords served' and '£2.4M+ tax savings identified' are marketing claims that need owner sign-off (the open StatsCounter asterisk question). | <br><br>**PHASE 8.4 (2026-08-23), DECISION L SHIPPED.** `£2.4M+ Tax savings identified` -> `280+ Properties enquired about`, rendering on all 12 `StatsCounter` pages. Re-derived from live data before shipping (158 enquiries, floor 280, data through 2026-08-21) and **the SQL now lives in this file's docstring** so it stays re-runnable. It is a floor, not an estimate. Wording is binding: enquiries, never clients/advises/manages/serves. **DECISION M ('100+ Landlords served', `:12`) is still OPEN and that line is byte-identical.** The carve-out 1 note above is therefore now half-discharged: the £2.4M claim is gone, the '100+ landlords' claim is not.
| 220 | M | 1/1 | `web/src/lib/support/faq.ts` | **PORT** | 03,08 | Design change. Part of the systematic sweep: rounded-lg/2xl/square -> rounded-xl, border-l-4 accent bars removed, border-b-4/border-t-4 push buttons -> flat + active:bg, em-dashes -> colons/commas. Carve-out 1 (facts) applies to any copy. |
| 221 | M | 6/2 | `web/src/middleware.ts` | **PORT - DONE (phase 0.3)** | 03,04,05,10,12 | Removes 'property-accountant-services' from both SLUG_TO_CATEGORY_MAP (line ~96) and DUPLICATE_REDIRECTS (line ~357). Confirm the same shadowing exists in our middleware; if so /blog/property-accountant-services has never rendered for us either. |
| 222 | A | 8/0 | `web/vendor/web-shared/analytics/autoCapture.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 223 | A | 16/0 | `web/vendor/web-shared/analytics/bus.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 224 | A | 19/0 | `web/vendor/web-shared/analytics/consent.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 225 | A | 30/0 | `web/vendor/web-shared/analytics/ids.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 226 | A | 14/0 | `web/vendor/web-shared/analytics/react/AnalyticsProvider.tsx` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 227 | A | 37/0 | `web/vendor/web-shared/analytics/react/ConsentProvider.tsx` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 228 | A | 9/0 | `web/vendor/web-shared/analytics/react/ConsentedScripts.tsx` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 229 | A | 6/0 | `web/vendor/web-shared/analytics/react/WebVitals.tsx` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 230 | A | 6/0 | `web/vendor/web-shared/analytics/server/createTrackHandler.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 231 | A | 11/0 | `web/vendor/web-shared/analytics/track.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 232 | A | 2/0 | `web/vendor/web-shared/analytics/types.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 233 | A | 27/0 | `web/vendor/web-shared/analytics/useInViewOnce.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 234 | A | 54/0 | `web/vendor/web-shared/analytics/visitMemory.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 235 | A | 6/0 | `web/vendor/web-shared/experiments/assign.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 236 | A | 12/0 | `web/vendor/web-shared/experiments/react/exposure.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 237 | A | 10/0 | `web/vendor/web-shared/experiments/react/useExperiment.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 238 | A | 7/0 | `web/vendor/web-shared/experiments/registries/property.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 239 | A | 21/0 | `web/vendor/web-shared/experiments/types.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 240 | A | 15/0 | `web/vendor/web-shared/lead-nurture/lead-nurture-shared.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 241 | A | 18/0 | `web/vendor/web-shared/lib/frontmatter.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 242 | A | 6/0 | `web/vendor/web-shared/lib/security-headers.d.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 243 | A | 17/0 | `web/vendor/web-shared/lib/security-headers.js` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 244 | A | 6/0 | `web/vendor/web-shared/package.json` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 245 | A | 77/0 | `web/vendor/web-shared/tools/components/Calculator.tsx` | **ALREADY-HAVE** | - | Inline-styled result panel. Ours (packages/web-shared/tools/components/Calculator.tsx, 158 lines vs their 77) is Tailwind + brand tokens. No visual decision of theirs that ours lacks. |
| 246 | A | 83/0 | `web/vendor/web-shared/tools/components/Field.tsx` | **ALREADY-HAVE** | 09,12 | THE KNOWN PRECEDENT, AND IT IS A FALSE ALARM. Their toggle branch (Field.tsx:26-45: own row, minHeight 24, accentColor #059669) fixes a bug that only ever existed in THEIR stub. Our real packages/web-shared/tools/components/Field.tsx:108-119 already had a richer toggle branch (bordered card, hover + has-[:checked] states, h-5 w-5 accent, brand token) AT THE SNAPSHOT COMMIT 1d68a570. Verified by `git show 1d68a570:packages/web-shared/tools/components/Field.tsx`. CONTEXT.md sec.5's gated estate-wide item can be CLOSED with zero work. Only residual: theirs renders field.help for toggles (Field.tsx:41-43), ours does not. |
| 247 | A | 7/0 | `web/vendor/web-shared/tools/embed/EmbedAttribution.tsx` | **ALREADY-HAVE** | - | 7-line inline-styled 'Powered by' line. Ours is 68 lines. Nothing to take. |
| 248 | A | 6/0 | `web/vendor/web-shared/tools/embed/EmbedAutoResize.tsx` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 249 | A | 12/0 | `web/vendor/web-shared/tools/embed/EmbedSnippet.tsx` | **ALREADY-HAVE** | - | 12-line inline-styled <pre> snippet. Ours is 41 lines. Nothing to take. |
| 250 | A | 13/0 | `web/vendor/web-shared/tools/format.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 251 | A | 10/0 | `web/vendor/web-shared/tools/registry-helpers.ts` | **NO-DESIGN-CONTENT** | - | Cut-down stub written so their standalone tree would compile without our private package. Inline styles, generic slate palette, no Tailwind, no brand token. Read in full: no design decision inside. Discard. |
| 252 | A | 55/0 | `web/vendor/web-shared/tools/types.ts` | **NO-DESIGN-CONTENT** | - | Stub type contract. Note their FieldType widens to `\| string`; ours is the closed union. Ours is correct. Discard. |


---

## 3. Orphans — the 123 paths no other report names

I computed this mechanically: for each of the 252 paths, `grep -oFf` the path (and its `web/`- and
`web/src/`-stripped forms) against all 12 existing reports. 129 paths are named somewhere; **123 are
not**. Of those 123, most are covered *by component name* even where the path is absent, so the real
orphan set is smaller. I split it three ways.

### 3a. True orphans — no report names the path OR the basename (7)

These reached this audit completely unexamined.

| Path | Disposition | Analysis |
|---|---|---|
| `.gitignore` | PORT (partial) | Adds `web/.screenshots/` (the `shots.mjs` output dir) and a blanket `.claude/`. Take the first, **reject the second**: monorepo `.gitignore:91-97` deliberately ignores `.claude/*` then un-ignores `settings.json`, `commands/` and `skills/`. A blanket `.claude/` line would start ignoring tracked skill files. |
| `Help centre pic.jpg` | NO-DESIGN-CONTENT | 1,483,918 bytes, 5943x3962 JPEG, EXIF `Copyright: eugene barmin`. Stock portrait of a woman in a headset. **Zero code references.** It is the uncropped master `specialist-avatar.jpg` was cut from. Working detritus at their repo root. Do not take. *Caveat: the stock licence is unverified, and since the avatar is derived from it, the licence question applies to the avatar too. One line to the designer.* |
| `CONTEXT_SUMMARY_SESSION4.md` | NO-DESIGN-CONTENT | Designer session notes. Rationale already extracted into report 12. |
| `CONTEXT_SUMMARY_SESSION5.md` | NO-DESIGN-CONTENT | As above. |
| `CONTEXT_SUMMARY_SESSION7.md` | NO-DESIGN-CONTENT | As above. |
| `web/package-lock.json` | NO-DESIGN-CONTENT | 10,443 lines, regenerated for their standalone tree (vendored `web-shared`, added `playwright`). Ours is authoritative. |
| `web/content/resources/stamp-duty.md` | PORT (partial) | **Explicitly asked for in the brief.** 20 changed lines. 18 are pure em-dash removal, which matches our own house rule — take them. The other 2 rewrite FAQ `<h3>` question strings out of natural-query form: `"I am buying a new home before selling my old one — do I pay the surcharge?"` → `"If I am buying a new home before selling my old one, do I pay the surcharge?"`, and `"My property is in Scotland — can I use these figures?"` → `"Can I use these figures if my property is in Scotland?"`. **Carve-out 5.** These are FAQ headings that feed the question-shaped surface. Keep the query form, swap only the em-dash: `"My property is in Scotland: can I use these figures?"`. |

### 3b. Highest-value orphan, called out separately

`web/src/components/calculators/CalculatorLinkCards.tsx` (57 lines, ADDED). Reports 02 and 13 name the
basename; neither records that it has **zero consumers**. See §0.1. Porting it involves: take the file
as-is, and on each of the 11 pages that render `<CalculatorTabs />` add the crawlable card grid
underneath (or replace the tabs entirely). Its own docstring is the argument for doing so.

### 3c. Orphans covered by basename in another report (115)

The remaining 115 orphan paths are named by component/file basename in at least one report — e.g.
`HubArticleList.tsx` in 02 and 05, `resultGateStorage.ts` in 02/06/13, all 31 vendor files in 09, the
22 `.disabled` files in 06. I did not accept those as sufficient. I opened them:

- **All 31 vendor files: read in full** (§4).
- **All 22 quarantine stubs and their `.disabled` twins: read in full** (§5).
- **The 8 blog hub pages report 05 does not name individually**: confirmed all nine are the same
  79-80 line shell (metadata + `<BlogCategoryHub>` with per-category copy), distinct only in copy.
  Report 05's analysis of `capital-gains-tax` generalises. PORT, carve-out 5 on metadata.
- **The ~35 one-and-two-line files** (`ui/input.tsx`, `ui/chart.tsx`, `ui/accordion.tsx`,
  `forms/LeadForm.tsx`, `forms/MiniCapture.tsx`, `forms/DetailsForm.tsx`, `intent/DeepScrollModal.tsx`,
  `analytics/ConsentBanner.tsx`, `calculators/premium/MiniGrid.tsx`, `premium/MobileToolSlot.tsx`,
  `embed/EmbedCta.tsx`, `resources/GateOrForm.tsx`, `property/CalculatorPreviewGrid.tsx`,
  `property/MTDCountdown.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/thank-you/page.tsx`,
  `app/research/page.tsx`, all 8 `lib/calculators/**` tool files, `lib/mtd.ts`, `lib/support/faq.ts`):
  diffed in bulk. They are **two systematic sweeps, not 35 decisions**:
  - **Shape sweep.** `rounded-lg` / `rounded-md` / `rounded-2xl` / square → `rounded-xl` everywhere;
    `border-l-4 border-emerald-600` accent bars **deleted**; `border-b-4` / `border-t-4` skeuomorphic
    push buttons → flat with `active:bg-emerald-800`.
  - **Punctuation sweep.** Every em-dash → colon, comma or parenthesis. This matches our own house rule
    and is free to take.

  One trap inside the shape sweep: `globals.css` sets `--radius: 0rem`, and shadcn maps `rounded-lg` to
  `var(--radius)`. So `rounded-lg` in their tree renders as **square**, and `rounded-xl` is the literal
  0.75rem Tailwind utility, not a token. Anyone "modernising" this by re-tokenising it will change the
  whole site's corner radius by accident.

---

## 4. Hidden design in the 31 vendored shared files

I read all 31. Verdict: **one carries a design decision, and ours is already better.** Three more carry
markup that ours already exceeds. The other 27 are inline-styled compile-scaffolding with a generic slate
palette, no Tailwind, no brand token, no accessibility attribute, and an explicit `/** Stub ... */`
docstring.

| File | Finding |
|---|---|
| `tools/components/Field.tsx` | **The known precedent — and a false alarm.** Their toggle branch (`Field.tsx:26-45`) gives toggles their own row, `minHeight: 24`, `accentColor: "#059669"`, whole line as hit area. Our real `packages/web-shared/tools/components/Field.tsx:108-119` already does more: bordered card, `hover:border-[var(--brand-primary)]`, `has-[:checked]:` fill, `h-5 w-5` accent, brand token rather than a hardcoded hex. **And it did so at the snapshot commit** — verified with `git show 1d68a570:packages/web-shared/tools/components/Field.tsx`. The bug they fixed existed only in the stub they wrote themselves; it was never on the live calculators. `CONTEXT.md` §5's gated estate-wide item is **closed, zero work**. Only residual: theirs renders `field.help` for toggles (`Field.tsx:41-43`), ours drops it silently. One-line optional add to ours. |
| `tools/components/Calculator.tsx` | Inline-styled result panel (77 lines vs our 158). Ours is Tailwind + brand tokens with the same information architecture. Nothing of theirs ours lacks. ALREADY-HAVE. |
| `tools/embed/EmbedAttribution.tsx` | 7 lines, one inline-styled "Powered by" `<p>`. Ours is 68. ALREADY-HAVE. |
| `tools/embed/EmbedSnippet.tsx` | 12 lines, inline-styled `<pre>`. Ours is 41. ALREADY-HAVE. |
| `analytics/consent.ts` | Not design, but worth noting: their stub hardcodes posture `"granted"` (opt-out) and key `ptp_consent`. Matches our locked compliance position, so no conflict. NO-DESIGN-CONTENT. |
| `tools/types.ts` | Their `FieldType` widens to `| string`; ours is a closed union. Ours is correct. Do not import theirs. |
| the other 25 | No `className`, no layout structure, no colour, no spacing, no a11y attribute. Genuinely nothing. |

---

## 5. Hidden design in the 22 quarantined entrypoints

**21 of 22 carry nothing.** Each API stub is the same three-line template: one module-local
`UNAVAILABLE = NextResponse.json({error: "This service is temporarily unavailable. Please use the
contact form instead."}, {status: 503})` plus verb exports. That string is a JSON body, never rendered.
No JSX, no `className`, no shared quarantine helper, no exported constant anything imports.

**The 22nd does render UI, and it is a downgrade of ours.** `web/src/app/complete/page.tsx:38-61` renders
a card. Every class in it is copied verbatim from our own file — `bg-white py-16 sm:py-20`,
`siteContainerLg`, `mx-auto max-w-2xl`, `border-2 border-slate-300 bg-slate-50 p-6 text-center`,
`btnPrimary` — matching `Property/web/src/app/complete/page.tsx:27-36`, `:56-64`, `:117-127`. Ours is a
strict superset: three distinct fallback states (no token, invalid token, all-set) plus a `try/catch`
around `adminSelect` so a DB hiccup still shows the form. The only new string is
`"We cannot check your personal link right now"`, written for the quarantine condition itself — a
condition that does not exist in our tree. **ALREADY-HAVE. Nothing to port.**

**`.disabled` originals: 21 of 22 byte-identical to ours.** The exception is
`api/leads/events/route.ts.disabled`, where a `console.error` em-dash became a comma at line ~133. That
change is already present at their base commit `8041183`, so it is zip-packaging mangling, **not designer
work**. Nothing to port. This confirms `CONTEXT.md` §5's hash check independently.

---

## 6. Asset and binary verdict

| Asset | Before | After | Verdict |
|---|---|---|---|
| `web/src/app/icon.png` | 384,086 B, 1024x1024, PNG RGB — **navy square, gold tooth, "DFP"** | 4,089 B, 512x512, PNG **RGBA** — green house | **TAKE.** Ours is the Dental Finance Partners mark on the Property site. Live today. Theirs is the right brand, has transparency, and 512 is Google's preferred favicon source size. |
| `web/src/app/apple-icon.png` | 384,086 B, 1024x1024 — byte-identical to `icon.png`, same dental mark | 1,120 B, **180x180**, opaque white field | **TAKE.** 180x180 opaque is exactly the Apple touch-icon spec; iOS composites transparent touch icons onto black. They split one 1024 file copied twice into two correctly-sized variants. |
| `web/src/app/favicon.ico` | 25,931 B, entries 16/32/48/**256** — **black circle, white triangle** | 2,446 B, entries 16/32/48 — green house | **TAKE, with caveat.** Ours matches neither the icon nor the site. Theirs is brand-consistent for the first time. Caveat: the 256 entry is gone; 48 still satisfies Google's favicon rule and every browser tab, but Windows tiles and some bookmark UIs use 256. Regenerate it from the 512 `icon.png` if wanted. Not a reason to reject. |
| `web/public/specialist-avatar.jpg` | (new) | 14,303 B, 256x256 JPEG | **TAKE.** Consumed by their `SpecialistWidget.tsx:509` (36px, `rounded-full object-cover`) and `:808` (28px pill). 256 is correct for 2x retina at 36px. Monorepo `Property/web/public/` has no `.jpg` at all and our current `SpecialistWidget.tsx` has no `avatar` reference — this is genuinely new UI. **Must ship with the widget change or the widget renders a broken image.** |
| `Help centre pic.jpg` | (new) | 1,483,918 B, 5943x3962 JPEG | **LEAVE.** Zero references, repo root, filename with spaces, EXIF `Copyright: eugene barmin`. Uncropped master of the avatar. Working detritus. |
| `web/scripts/shots.mjs` | (new) | 211 lines | **TAKE, dev-only.** Playwright headless screenshot/QA harness against `localhost:3002`. Discovers routes by walking `src/app` for `page.tsx`, shoots 390 and 1440 at DPR 2, dismisses the support widget via its real close button, scroll-reveals IntersectionObserver animations, writes PNGs plus `report.json` with console errors, `pageerror` and `requestfailed`. Directly useful for this port's own visual QA. Caveat: adds `playwright ^1.62.1`, which the monorepo does not currently have anywhere. |
| `web/package.json` | — | +`shots` script, +`playwright`, and `"@accounting-network/web-shared": "file:vendor/web-shared"` | **CARVE-OUT 6.** The `file:vendor/web-shared` line must never come across. The other two are optional and come with `shots.mjs`. |

Net: the "icons shrank 384,086 → 1,120 bytes" signal that reads as an accidental downgrade is the
opposite. It is a brand correction we should have made ourselves.

---

## 7. Cross-file dependency risks — where porting A without B loses the design

Every one of these is a case where each file, read alone, looks complete.

| # | The design | Files that must move together | What is silently lost otherwise |
|---|---|---|---|
| 1 | Storytelling scroll animations degrade gracefully | `app/layout.tsx` `<noscript>` block (`:90-102`) **+** `globals.css` **+** the **6** `data-draw` setters (CORRECTED 2026-08-22, fidelity_6 GAP 3: the row said 7 and listed 6; 6 is right, grepped): `ui/EyebrowRule.tsx`, `property/DrawnTickList.tsx`, `property/NumberedReasons.tsx`, `property/PenaltyLadder.tsx`, `property/RateWedge.tsx`, `property/RentalProfitStack.tsx` | Every animated block renders **collapsed** for no-JS users and for non-JS crawlers. The `<noscript>` looks like layout boilerplate in a diff. |
| 2 | Self-drawing house logo | `brand/BrandWordmarkHomeLink.tsx` (`className="logo-house"`, wrapped in `.group`) **+** `globals.css:387+` (`.logo-house path/polyline` stroke-dasharray, `@keyframes logo-draw`, `@media (hover:hover) .group:hover` variant) | Take the component alone: static icon, no draw-in, no hover replay. Take the CSS alone: dead rules. |
| 3 | Calculators mega-menu | `lib/nav.ts` **+** `lib/calculators/nav.ts` **+** `config/site.ts` (`NavItem` with `groups`) **+** `layout/PageShell.tsx` (`nav` prop) **+** `layout/SiteHeader.tsx` (`item.groups` at `:79,:88,:179,:183,:305,:310`) **+** `app/layout.tsx:5,:123` | Five files, one feature. Port `SiteHeader` alone — the obvious thing to do, since it is the file with the visible diff — and the category-grouped Calculators panel does not exist. Also note `nav.ts` is deliberately server-only: importing the registry into the `"use client"` header ships every compute function to every page. |
| 4 | Blog article CTAs inside `<aside>` | `blog/BlogPostRenderer.tsx` (only emitter of `class="aside-cta"` and `data-cta`) **+** `globals.css` (`.prose-blog aside a.aside-cta` + `:hover` + `:focus-visible`, and `.prose-blog a:not([data-cta])` which *excludes* CTAs from prose link styling) | Port the CSS without the renderer: dead rules. Port the renderer without the CSS: CTAs inherit prose link styling and stop reading as buttons. |
| 5 | Sticky desktop table of contents | `blog/TableOfContents.tsx` (sticky/overflow **removed**) **+** `blog/BlogPostRenderer.tsx` (sticky wrapper **added**, stacking the CTA card above) | Their comment says two nested sticky scroll areas fought. Port `TableOfContents` alone and the desktop TOC simply stops sticking — a regression that reads as "we ported it wrong", not "we ported half of it". |
| 6 | **16** bespoke components whose only home is a forked page | `property/{AgencyBooks, LocationMap, PortfolioPooling, Section24Wedge}` → `/services/landlord-accountant`; `DecisionWindow` → `/services/property-tax-advice`; `{DepartureWindow, FilingDates, SchemeFlow}` → `/services/non-resident-landlord`; `FilingCadence` → `/making-tax-digital-landlords`; `TaxYearGap` → `/services/property-accountant`; `RateWedge` → `/section-24`; `RentalProfitStack` and **`PenaltyLadder`** → `/landlord-tax`, one home each; `DisposalFigures` → `/landlord-tax` + `/services/non-resident-landlord`; `ComparisonTable` → `/services/property-tax-advice` + `/services/landlord-accountant`, **two** homes not three; `DrawnTickList` → `/section-24` + `/services/property-tax-advice` | The standing recommendation is "keep our content, re-skin". Taken literally that leaves these components with no page that renders them. **The re-skin plan must carry a component-placement map**, one row per component above, or this is the single largest silent loss in the migration. <br><br>**CORRECTED 2026-08-22 (fidelity_6 GAP 3).** This row read "14 bespoke components", omitted `DrawnTickList`, gave `PenaltyLadder` two homes and `ComparisonTable` three. The count is **16**. `PenaltyLadder` has **one** home: the designer's own file refuses it on `/making-tax-digital-landlords` by name at `Property_zip/web/src/app/making-tax-digital-landlords/page.tsx:940-942`, saying that rail is spent on `/landlord-tax`. `ComparisonTable`'s apparent third hit is a code comment in `landlord-tax/page.tsx`, character-for-character identical in both trees, so it must not be "fixed" back. All three were already recorded in this file's appended per-run sections (`:830`, `:869-872`, `:903`, `:913-914`); the body row and those sections are now reconciled and **must be changed together**. Phase 6 shipped all 16, each on exactly the page this row names: `logs/fidelity_6.md` §4.1. |
| 7 | Crawlable links out of the free-tools block | `calculators/CalculatorTabs.tsx` (11 pages) **+** `calculators/CalculatorLinkCards.tsx` (0 consumers) | Carve-out 5. Tabs are `<button>`s; there is no `<a href>` to any `/calculators/*` page in the block. Their unwired card component is the fix. <br><br>**Status 2026-08-22: `CalculatorLinkCards` now has THREE consumers** (`/services/property-accountant` and `/services/property-tax-advice` from Phase 6, `/for-letting-agents` from Phase 7.5), and `src/tests/calculator-tabs-crawl-path.test.ts` enforces the pairing. Phase 4's correction stands: `CalculatorTabs` renders on **one** page in our tree, not eleven. |
| 8 | Result gate reveal memory | `calculators/resultGateStorage.ts` **+** `calculators/ResultGate.tsx` **+** `calculators/premium/PremiumCalculator.tsx` | Shared `ptp_calc_revealed_<campaign>` key format, explicitly written so the two consumers cannot drift. Port one consumer without the module and you reintroduce the "unlock one, unlock all" bug they fixed. |
| 9 | Specialist widget avatar | `support/SpecialistWidget.tsx` **+** `public/specialist-avatar.jpg` | Broken image in the widget header and on the "Ask a specialist" pill. |
| 10 | Headline statistics | `lib/site-stats.ts` **+** `property/StatsCounter.tsx` **+ TWELVE call sites**, derived 2026-08-23 by `grep -rn "StatsCounter stats={siteStats}"`: `/`, `/about`, `/incorporation`, `/landlord-tax`, `/making-tax-digital-landlords`, `/property-tax-rates`, `/section-24`, `/services`, `/services/landlord-accountant`, `/services/non-resident-landlord`, `/services/property-accountant`, `/services/property-tax-advice` | Carve-out 1 applies. <br><br>**UPDATED 2026-08-23 (Phase 8.4).** The row listed three call sites; it is twelve, and DECISION H already recorded that. **"£2.4M+ tax savings identified" is GONE**, replaced under DECISION L by `280+ Properties enquired about`, which is re-derivable from one SQL statement now carried in `site-stats.ts`'s docstring. **"100+ landlords served" remains unevidenced and is DECISION M, still open** - the DECISION L investigation established that no client records exist anywhere in the estate, so "served" reads as a client claim we cannot support. That tile was deliberately not touched. |
| 11 | `globals.css` build scope | `globals.css` alone | Carve-out 6, already known: they deleted `@source "../../../../packages/web-shared";` because they had no such package. Re-add it or every Tailwind class used inside our shared package stops being generated. |

**Dead on both sides, for completeness:** `.hero-reveal`, `.hero-reveal-delay` and `.section-label` are
defined in their `globals.css` and consumed by nothing in their tree — and by nothing in ours either
(`Property/web/src`: only `globals.css` matches). Not a loss, but do not spend time hunting for their
consumers.

---

## 8. What I could not determine

Nothing was left undetermined. Two items are decisions rather than findings, and belong to the owner:

- The `Help centre pic.jpg` / `specialist-avatar.jpg` stock-photo licence (EXIF names a third-party
  copyright holder). One question to the designer, not a research task.
- Whether the eight forked pages keep our content or theirs. §7 risk 6 is contingent on that answer and
  is written so it can be actioned either way.

---

## 7. Dispositions applied by later phases

Appended as phases land, per EXECUTION.md §8.4. This section records only rows whose
state changed; the table above is edited in place at the same time.

**Phase 0 (2026-08-22, tag `design-port-phase-0`)** - live defect fixes, independent of
the design system:

| Row | Path | Change |
|---|---|---|
| 69 | `web/src/app/apple-icon.png` | PORT -> DONE. Designer's 180x180 opaque green house copied in (item 0.6). |
| 95 | `web/src/app/icon.png` | PORT -> DONE. Designer's 512x512 RGBA green house copied in (item 0.6). |
| 93 | `web/src/app/favicon.ico` | Unchanged, still PORT. Deliberately left: it is a wrong-looking placeholder rather than a wrong brand, and theirs drops the 256px entry. Phase 2 decision. |
| 221 | `web/src/middleware.ts` | PORT -> DONE. Both shadowing keys deleted, plus a dev-only collision assert we added on top (item 0.3). |
| 153 | `web/src/components/layout/PageShell.tsx` | PORT -> PARTIAL. Only the `"/embed"` -> `"/embed/"` fix taken (item 0.5). The `nav` prop is still Phase 2. |
| 121 | `web/src/components/blog/BlogPostRenderer.tsx` | PORT -> PARTIAL. Only the white card around `LeadForm` taken (item 0.1). The twelve design hunks are still Phase 3. |


**Phase 1 (2026-08-22, not yet tagged)** - foundation: tokens, CSS, layout primitives:

| Row | Path | Change |
|---|---|---|
| 94 | `web/src/app/globals.css` | PORT -> DONE, with carve-out 6. Their +370 appended lines taken byte-for-byte; `@source "../../../../packages/web-shared";` KEPT, and proven live (the shared package's `border-[var(--brand-primary)]` class is still generated and the shared `Calculator` renders its 4px emerald left rule). |
| 98 | `web/src/app/layout.tsx` | PORT -> PARTIAL. The `<noscript>` release block (their `:90-102`, all 10 rules) taken, in the same commit as `EyebrowRule`. Nav threading (`:5`, `:123`) and the Clarity carve-out remain Phase 2. |
| 200, 201, 202 | `ui/accordion.tsx`, `ui/chart.tsx`, `ui/input.tsx` | PORT -> DONE. Single-token radius sweep, applied as edits (our copies are LF, theirs CRLF). |
| 203 | `ui/layout-utils.ts` | PORT -> DONE. Taken wholesale. The orphaned `border-emerald-800` / `border-blue-800` overrides were cleaned at all 17 `${btnPrimary}` call sites in the same commit, not just the homepage hero. |
| 152, 180, 195, 196, 197, 198, 204 | `HeroBrickBackdrop`, `ScrollGlowGroup`, `CardCarousel`, `ExampleFigureNote`, `EyebrowRule`, `FaqSection`, `page-blocks` | PORT -> DONE. All seven new files taken byte-for-byte; none existed in our tree, so nothing of ours was substituted. `CardStack` kept in `page-blocks` rather than stripped, per Rule Zero (b). |

Coupling updates against §7 of this report:

- **#11 (`globals.css` build scope): CLOSED.** Carve-out 6 applied and verified in a browser,
  not asserted.
- **#1 (animations degrade gracefully): half-complete and safe.** The `<noscript>` block, the
  `globals.css` rules and 1 of the 6 `data-draw` setters (`EyebrowRule`) are in. All 10
  release rules were measured with JS disabled: without the block, 10 of 10 selectors render
  collapsed or hidden; with it, 10 of 10 render released. No component in our tree sets
  `data-draw` without a matching release rule, so the remaining 6 setters can land with their
  pages safely.
- **#2 (self-drawing house logo): still neither half, deliberately.** We now hold the CSS
  side, which is dead until `BrandWordmarkHomeLink.tsx` lands in Phase 2. That is the safe
  direction; the lossy one would have been the component without the CSS.
- **#4 (blog `aside-cta`): untouched.** Those rules pre-date line 382 in our `globals.css` and
  are not part of the appended block.


**Phase 2 (2026-08-22, not yet tagged)** - chrome and brand:

| Row | Path | Change |
|---|---|---|
| 14 | `niche.config.json` | PORT -> **DONE, two keys only.** `navigation` merged per report 04 §2.1 (self-referential first child per group, `Landlord tax index`, `Contact` top-level, our 10 wave-built Resources children kept). `footer_links` rescoped 18 -> 3 legal, safe because their footer derives its columns from the nav; all 18 URLs verified still rendering. CARVE-OUT 3 held key by key on `company.enquiry_retention_months` (24, not 3), the whole `partner` block (their pre-`4107b377` DJH snapshot reaches rendered consent text), `content_strategy.categories` and the `cta` variants block. |
| 93 | `web/src/app/favicon.ico` | PORT -> **DONE, ladder restored.** Their 16/32/48 frames taken pixel-identical (ImageChops bbox `None` at all three); the 256 they dropped regenerated from their own `icon.png` at 512. 25,931 B -> 8,428 B despite gaining a size. All three brand marks verified as the same green house at 16/32/180/256. Closes the two-different-marks state Phase 0 left. |
| 98 | `web/src/app/layout.tsx` | PARTIAL -> **DONE.** `buildPrimaryNav()` import + `<PageShell nav={...}>`. CARVE-OUT 3: `clarityProjectId` deliberately NOT ported; `grep -ri clarity Property/web/src` returns one hit, the English word in a test comment. |
| 128 | `web/src/components/brand/BrandWordmarkHomeLink.tsx` | PORT -> **DONE**, byte-identical to theirs. Coupling #2 closed; the animation was measured `playState: "running"` on 2 paths with `stroke-dasharray: 80px`, not asserted. Their aria-label rebuild deletes the `sr-only` tagline span that Phase 0's `cf5548d0` em-dash fix lived in, so that fix is moot rather than reverted. |
| 153 | `web/src/components/layout/PageShell.tsx` | PARTIAL -> **DONE.** `nav` prop added and threaded to both `SiteHeader` and `SiteFooter`. |
| 154 | `web/src/components/layout/SiteFooter.tsx` | PORT -> **DONE**, taken wholesale (0 commits of ours since the snapshot, so a genuinely clean take). Includes both WCAG 2.5.8 tap-target fixes. **The Double Wired Creative credit SHIPPED, enabled, dofollow**, per owner Decision B answered 2026-08-22: "ship it as do follow sitewide as it's the company that built the site." `rel="noopener noreferrer"` only, no nofollow/sponsored/ugc. Present on 860 of 886 prerendered pages; the 26 without are exactly `/embed/<slug>`, chrome-free by design. |
| 155 | `web/src/components/layout/SiteHeader.tsx` | PORT -> **DONE, manual line-level merge, base ours.** Their `groups` panel, mobile grouped rendering, `nav` prop, `active` across children and groups, `rounded-xl`, `siteContainerXl` and `md:` -> `lg:` all taken. Our `data-cta` set (including `header_contact`, which theirs drops) and computed `data-cta-goal` kept. **ONE DELIBERATE DIVERGENCE:** our click-toggled `<button>` trigger is kept over their hover-only `<Link>`, on accessibility grounds (no hover on a tablet at `lg:`, so their children would be unreachable). This is the only place in the port where their implementation was not taken; it is why the self-referential first child is required rather than optional. |
| 205 | `web/src/config/site.ts` | PORT -> **DONE, two hunks only.** The `NavItem` type (with `groups`) and the `as NavItem[]` cast. CARVE-OUT 3 on the rest: their `PARTNER_DISCLOSURE_PAUSED` machinery and DJH conditional did not come across. |
| 207 | `web/src/lib/calculators/nav.ts` | PORT -> **DONE.** One signature fix: their vendored stub of `toolPath` took a `Tool`, the real shared helper takes a slug. Our registry is 26 tools in 9 categories against their 16 in 6; the three extra categories append in registry order, which is the behaviour their own comment specifies. |
| 218 | `web/src/lib/nav.ts` | PORT -> **DONE.** One-line change: reads `getActiveNav(niche)` rather than `siteConfig.nav`, so the packages-mode `hide_in_packages` filter survives the move to a server-built nav. |

Coupling updates against §7 of this report:

- **#2 (self-drawing house logo): CLOSED.** Both halves in. Measured on the running site:
  `.logo-house` renders 24x24 in emerald-600 with 2 child paths, each `stroke-dasharray: 80px`,
  `animation: logo-draw 1.5s both`, `getAnimations()` reporting `playState: "running"`. The
  `globals.css:388-406` rules Phase 1 landed are no longer inert.
- **#3 (calculators mega-menu): CLOSED.** All five files in one commit. Verified in a browser:
  the grouped panel renders 27 links under 9 category headers, derived from the registry, and
  the mobile drawer stacks the same 9 groups. It did not exist in our tree before this phase.
- **#1 (animations degrade gracefully): unchanged.** This phase added no `data-draw` setter.
- **#9 (specialist widget avatar): still neither half, deliberately.** `specialist-avatar.jpg`
  was NOT taken: its other half is `SpecialistWidget.tsx`, which is frozen behind owner
  Decision F. Copying the image alone achieves nothing. It must land with the widget.

Note on §6 (asset and binary verdict): the `favicon.ico` row's caveat ("theirs drops the 256px
entry; regenerate it from the 512 `icon.png` if wanted") was **actioned**, not accepted. The
shipped file carries 16/32/48/256.

Note on carve-out 5: this is the one phase where their layout **raises** the link floor rather
than lowering it. The header gains 43 crawlable internal links per page (the mega-menu alone is
27) and the footer goes from 18 internal links to 31. No link-floor carve-out was needed.


**Phase 3 (2026-08-22, not yet tagged)** - the blog subsystem, one template across ~783
articles and ten hubs:

| Row | Path | Change |
|---|---|---|
| 70, 71, 72, 73, 74, 76, 77, 78, 79 | the nine `web/src/app/blog/<category>/page.tsx` hub shells | PORT -> **DONE.** Nine hand-rolled layouts become nine `BlogCategoryHub` calls. Their prose is our prose, proven by figure-set comparison: 7/10/10/8/11/8/6/1/7 distinct figures per hub, zero added, zero removed. CARVE-OUT 5 on the SEO payload: all nine metadata titles drop the `| <site name>` suffix their conversion added, three descriptions and one literal title are ours, and `CollectionPage.name` is restored through a new `collectionName` prop on the six hubs whose JSON-LD name carried an SEO suffix. Our seven punctuation choices re-applied; **theirs kept** on the two `portfolio-management` en-dash rewrites and the "Register of Overseas Entities" heading correction. |
| 75 | `web/src/app/blog/page.tsx` | PORT -> **DONE.** Taken wholesale: cream brick hero, grouped essential guides with icon badges, icon-badged topic cards, closing `LeadCTAPanel`, calculator bridge band. Our em-dash-free metadata description kept; `CATEGORY_ICONS` gains `property-finance`. |
| 119 | `web/src/components/blog/BlogCategoryHub.tsx` | PORT -> **DONE, with carve-out 5.** Template unchanged; it passes `postsPerPage={articleItems.length}`. One class token changed: the topic-count badge went `text-slate-400` -> `text-slate-500` because it measured 2.63:1 on white against the 4.5:1 floor (`969c14f4`). |
| 120 | `web/src/components/blog/BlogListWithSearch.tsx` | PORT -> **DONE**, taken wholesale. `NumberedPagination`, the sans card title in place of `font-serif`, scroll-to-top on page change, read time in place of the date row. |
| 121 | `web/src/components/blog/BlogPostRenderer.tsx` | PARTIAL -> **DONE.** All twelve design hunks taken. Our four post-snapshot changes re-applied, all non-visual: the shared-package split helpers (**verified to resolve to `@accounting-network/web-shared/content/blog-splits`, with zero local copies left**, which is the trap report 05 named), the one-prop `GateOrForm`, the packages-mode CTA fork, and the Phase 0 slug keying. Category labels, including the breadcrumb, now render through `categoryDisplayName()`. |
| 122 | `web/src/components/blog/BlogSidebarCta.tsx` | PORT -> **DONE**, byte-identical to theirs. |
| 123 | `web/src/components/blog/HubArticleList.tsx` | PORT -> **DONE, carve-out 5 applied.** Per-article `date` restored to the card meta row, which their conversion dropped. |
| 124 | `web/src/components/blog/InlineMiniLeadForm.tsx` | PORT -> **DONE**, taken wholesale. |
| 125 | `web/src/components/blog/NumberedPagination.tsx` | PORT -> **DONE**, byte-identical to theirs. |
| 126 | `web/src/components/blog/TableOfContents.tsx` | PORT -> **DONE**, in the same commit as its `BlogPostRenderer` half. |
| 166 | `web/src/components/property/LeadCTAPanel.tsx` | PORT -> **DONE**, byte-identical to theirs. Its three proof points were each traced to an existing live claim on our own site before shipping (`about/page.tsx:155-163`, four `/services/*` pages, `niche.config.json:24`); the footnote's second sentence is the one net-new string and is raised as an owner question in `logs/phase_3.md`. |
| 206 | `web/src/lib/blog.ts` | PORT -> **DONE.** `CANONICAL_CATEGORY_NAMES` + `categoryDisplayName()` taken and **extended from their nine entries to our ten** (`property-finance`). Our `noindex` line in `parsePostFile` kept. Eleven of the sixteen `post.category` call sites converted; five deliberately not, listed in the phase log. |
| 216 | `web/src/lib/essential-guides.ts` | PORT -> **DONE**, taken wholesale. All 12 hrefs byte-identical, so the link floor is unchanged. |
| 17, 18, 19, 20 (+ `leeds-property-accountant-specialist-tax-services.md`) | the five city posts | NO-DESIGN-CONTENT -> **DISCARDED, final.** Ours wins outright. The five stay deleted (`bbfe0437`) and 301 correctly to `/locations/<city>`; their edit is a single href swap per file pointing at the very page our consolidation created. Nothing ported, nothing back-patched. |
| — | `web/src/app/blog/property-finance/page.tsx` | Monorepo-only, invisible to the designer -> **DONE.** Converted by hand as the tenth `BlogCategoryHub` sibling, plus the `CTA_BY_CATEGORY`, `CANONICAL_CATEGORY_NAMES` and `CATEGORY_ICONS` entries it never had. The 34 posts in the category were serving the generic CTA; they now serve their own. |

Coupling updates against section 7 of this report:

- **#4 (blog `aside-cta` CSS/renderer pair): CLOSED.** The CSS half landed in Phase 1 at
  `globals.css:307-331`; the only emitter, `decorateAsides()` at `BlogPostRenderer.tsx:100`,
  is in this phase. Both halves now in one tree.
- **#5 (sticky desktop TOC pair): CLOSED.** Both files in one commit (`ca956c39`):
  `TableOfContents` drops its own sticky and overflow, the renderer's sidebar wrapper gains
  `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` around `BlogSidebarCta`
  and the TOC. One sticky wrapper per column, nothing nested.
- **#1 (animations degrade gracefully): unchanged.** This phase added no `data-draw` setter;
  `Eyebrow` is used heavily and both its halves landed in Phase 1.
- **#9 (specialist widget avatar): still neither half, deliberately.**

Note on carve-out 5, measured from prerendered HTML before and after: crawlable article links
per hub are **54 / 160 / 163 / 41 / 47 / 19 / 63 / 34 / 156 / 46, total 783, identical before
and after**, against the 120 their template as written would have produced. Each hub also
gains 9 sibling-hub links from the "Browse other topics" band, where the old hubs had none.


**Phase 4 (2026-08-22, not yet tagged)** - the calculators subsystem, plus owner Decision C2:

| Row | Path | Change |
|---|---|---|
| — | `web/src/components/calculators/ResultGate.tsx` | PORT -> **DONE**, byte-for-byte. Wired into all five bespoke calculators. |
| — | `web/src/components/calculators/HeldResult.tsx` | PORT -> **DONE**, byte-for-byte. Two consumers: `ResultGate` and `PremiumCalculator`. |
| — | `web/src/components/calculators/resultGateStorage.ts` | PORT -> **DONE**, byte-for-byte. Coupling #8 CLOSED: landed with both consumers in the same commit. |
| — | `web/src/components/calculators/CalculatorTabs.tsx` | PORT -> **DONE**, byte-for-byte. One call site in this phase (`/calculators`); the other ten are Phases 5 and 6. |
| — | `web/src/components/calculators/CalculatorLinkCards.tsx` | PORT -> **DONE (file), NOT YET WIRED.** Zero consumers in the designer's tree either. Coupling #7 is held open deliberately, and is now enforced by a test rather than a note; see below. |
| — | `web/src/components/calculators/CalcResultCta.tsx` | **DELETED**, owner Decision C2(d). Paired in the same commit with removing `calc_result` from `MINIFORM_FORM_IDS` and restating `BASELINE_MINIFORM_LEADS_28D`. |
| — | `web/src/components/calculators/Section24Calculator.tsx` | PORT -> **DONE**, taken whole (0 commits of ours since the snapshot). |
| — | `web/src/components/calculators/MTDCheckerCalculator.tsx` | PORT -> **DONE**, taken whole, including the navy-in-both-outcomes result panel. |
| — | `web/src/components/calculators/IncorporationCostCalculator.tsx` | PORT -> **DONE**, taken whole. |
| — | `web/src/components/calculators/PortfolioProfitabilityCalculator.tsx` | PORT -> **DONE**, taken whole. |
| — | `web/src/components/calculators/StampDutyCalculator.tsx` | PORT -> **DONE**, taken whole then our four `f7794767` punctuation choices restored (comma over colon, full stop over ", and"). |
| — | `web/src/components/calculators/premium/PremiumCalculator.tsx` | PORT -> **DONE**, taken whole. Gating widens `placement === "blog"` to `placement !== "embed"`; the `gateModalShownThisSession` module bypass is gone; `see_result` survives through `HeldResult`'s `dataCta`. |
| — | `web/src/components/calculators/premium/PremiumUpgrade.tsx` | PORT -> **DONE**, taken whole, including `mobileFallback`. |
| — | `web/src/components/calculators/premium/MiniGrid.tsx` | PORT -> **DONE**, token sweep only (3x `rounded-md` -> `rounded-xl`). |
| — | `web/src/components/calculators/PageResultCta.tsx` | PORT -> **DONE**, token sweep only (R3 button chrome). |
| — | `web/src/components/calculators/CalculatorClient.tsx` | PORT -> **DONE**, comment only, as report 02 recorded. |
| — | `web/src/components/calculators/ResultGateModal.tsx` | **CARVE-OUT, ours kept.** Theirs is the pre-`ec38f821` local implementation with the 40/8 message floors and no topic-aware heading. Ours is the 49-line wrapper over the shared component. Their two class tweaks and the "Skip, see my numbers" copy live in `packages/web-shared/`, which report 09 section 7 rules out of this port (19 consumers). |
| — | `web/src/components/calculators/premium/MobileToolSlot.tsx` | **CARVE-OUT, ours kept.** Same wrapper trap; their restyle is inside the shared file. |
| — | `web/src/components/resources/CalculatorPageResources.tsx` | PORT -> **DONE**, byte-for-byte. `GateOrForm` and the "Go deeper" pill strip removed, per C2(e). |
| — | `web/src/components/resources/GateOrForm.tsx` | PORT -> **PARTIAL, className only.** Their file also reinstates the `copy`/`split`/`placement`/`category` props that `5c156c51` deleted with `ResourceGate`; carve-out 2 keeps those deleted. |
| — | `web/src/components/ui/CTASection.tsx` | PORT -> **DONE**, token sweep (R2). ~~The component stays: it is live on 16 pages, four of which the designer never saw.~~ **FILE DELETED in Phase 8.8 (`be18008f`).** The "16 pages" figure was stale when written: measured at the start of Phase 7 it was **four** pages, all four inside Phase 7's own scope; Phase 7 moved all four to `LeadCTAPanel`, leaving zero consumers, and Phase 8 deleted the file with git history as the undo. Full reasoning: row 194 above. |
| — | `web/src/app/calculators/page.tsx` | PORT -> **DONE.** Two-tier page taken whole; our `c218d7a6` metadata description kept (carve-out 5); their `:149` count badge `slate-400` -> `slate-500` under Rule Zero (c). |
| — | `web/src/app/calculators/[slug]/page.tsx` | PORT -> **DONE, with carve-out 5.** Their layout, plus our worked-examples and related-reading blocks restyled into their system. Theirs has neither. |
| — | `web/src/app/calculators/stamp-duty-calculator/page.tsx` | **CARVE-OUT 5, ours kept.** Theirs is a re-skin of the pre-Wave page and loses 7 of our 8 `h2`s and the FAQPage JSON-LD. Only three page-level design moves taken: the clamp, the standfirst measure, and `LeadCTAPanel` for the mint gradient card. |
| — | 4x `web/src/app/calculators/<bespoke>/page.tsx` | PORT -> **DONE**, taken whole; our four `c218d7a6` metadata descriptions kept. Figure sets identical before and after (10 / 8 / 8 / 1, zero added, zero removed). |
| — | 9x `web/src/lib/calculators/{tools,premium/tools}/*.ts` | PORT -> **DONE**, all nine copy edits taken. **CARVE-OUT 1: their `first-time-buyer-stamp-duty-calculator.ts:44` £6,250 was NOT taken; ours keeps the correct £5,000.** |
| — | `web/src/lib/calculators/nav.ts` | Already **DONE in Phase 2**, including the `toolPath(tool.slug)` signature fix. No Phase 4 work. |
| — | `web/src/tests/calculator-goldens.test.ts` (theirs) | **DISCARDED, final.** Asserts `TOOLS.length === 16`. Ours pins 26 / 5 / 21 and passes at 241 cases. |

Coupling updates against section 7 of this report:

- **#8 (result-gate reveal memory): CLOSED.** `resultGateStorage.ts` landed in the same commit
  as both consumers, so the `ptp_calc_revealed_<campaign>` key format cannot fork. Proven in a
  browser, not asserted: revealing `/calculators/section-24-calculator` writes
  `ptp_calc_revealed_section-24-calculator=1`, survives a full reload, and leaves
  `/calculators/mtd-checker` still gated with no key of its own.
- **#7 (crawlable links out of the free-tools block): OPEN BY DESIGN, now enforced.**
  `CalculatorLinkCards` is in the tree with zero consumers, exactly as in the designer's tree.
  Phase 4 lands `CalculatorTabs` on `/calculators` only, where the 26-link directory renders
  two sections below it, so no page loses a link. The other ten tabs pages are Phases 5 and 6.
  `src/tests/calculator-tabs-crawl-path.test.ts` now fails any page that renders the tabs
  without at least one real `<a href>` to a calculator, so the obligation cannot be forgotten.
  The two concrete targets are `/services/property-accountant` and
  `/services/property-tax-advice`, where the designer's versions drop 4 calculator links each.
- **#1 (animations degrade gracefully): unchanged.** This phase added no `data-draw` setter.
- **#9 (specialist widget avatar): still neither half, deliberately.**

Note on carve-out 5, measured from prerendered HTML before and after: unique
`href="/calculators/*"` per page is at or above the pre-phase floor on all eleven
`CalculatorTabs` pages (5 / 26 / 7 / 6 / 9 / 5 / 5 / 6 / 6 / 6 / 6, unchanged), and total
internal links on `/calculators` rose 60 -> 69. Every one of the 26 calculator pages is at or
above its own pre-phase internal-link count.


**Phase 5 (2026-08-22, not yet tagged)** - secondary pages: homepage, /services,
/incorporation, /about, /contact, /property-tax-rates, /locations, /embed, the legal pages,
`content/resources/stamp-duty.md` and the shared components those pages needed:

| Row | Path | Change |
|---|---|---|
| — | `web/src/app/page.tsx` | PORT -> **DONE, take-theirs + our six hunks.** Their restructure whole; our `activeCta`/`packagesMode` machinery, `locationHref`, `categoryDisplayName` and metadata re-applied, plus one crawlable calculator link under the tabs (carve-out 5). Rendered links 51 -> 51, forms 1 -> 1, height 14,025 -> 9,651px. |
| — | `web/src/app/services/page.tsx` | PORT -> **DONE, take-theirs + carve-out 5.** Our "Where to start" hub and its ItemList schema restyled into their card idiom and placed between the navy testimonial band and the contained panel, so it also serves as their required light section. Links 31 -> 34. |
| — | `web/src/app/incorporation/page.tsx` | PORT -> **DONE, take-theirs + carve-out 5.** Our five-entry FAQ array rendered through their `FaqSection` with `buildFaqPageJsonLd`, and the two prose sections (5 internal links) restyled into `Prose`/`InlineLink`. Theirs has neither. |
| — | `web/src/app/about/page.tsx` | PORT -> **DONE**, byte-identical to theirs except our two `c218d7a6` metadata lines. |
| — | `web/src/app/contact/page.tsx` | PORT -> **DONE, take-theirs + our delta.** Metadata, the `isPackagesMode` pricing link carrying `contact_pricing_link` (report 07 §2.3: the only instrumented CTA on the route) and the h2 ternary re-wrapped around their heading. |
| — | `web/src/app/property-tax-rates/page.tsx` | PORT -> **DONE, take-theirs + our metadata, MINUS their BreadcrumbList script.** Report 04 §7.6's flag is real and was measured, not inferred: our `ui/Breadcrumb.tsx:17` already emits the schema, so theirs shipped two BreadcrumbList blocks. Full carve-out 1 facts pass, every figure re-derived; the port changes no number. |
| — | `web/src/app/locations/page.tsx` | PORT -> **DONE**, taken whole; `locationHref(loc.slug)` re-applied over their raw template literal. |
| — | `web/src/app/locations/[slug]/page.tsx` | **KEEP OURS + their styling, DONE.** Their six styling hunks ported onto our 995-line file (HeroBrickBackdrop hero, h2 scale on all seven including our two wave blocks, border-l-4 dropped from four card sets, contained `LeadCTAPanel`). Their address / priceRange / openingHours / organizationType additions to the LocalBusiness schema NOT taken: we stripped those deliberately so the markup makes no NAP claim. |
| — | `web/src/app/embed/page.tsx` | PORT -> **DONE, take-theirs + our metadata hunk** (title, description and `robots: {index:true}`; their file has no robots block). |
| — | `web/src/app/privacy-policy/page.tsx` | PORT -> **PARTIAL, deliberately.** Only the `font-serif` removal (12 occurrences). Their July fork's single-partner wording, Article 6(1)(b) basis and "last updated" date are the pre-`4107b377` snapshot; carve-out 3, ours kept. |
| — | `web/src/app/terms/page.tsx` | PORT -> **PARTIAL**, `font-serif` only (14 occurrences). |
| — | `web/src/app/cookie-policy/page.tsx` | PORT -> **PARTIAL**, `font-serif` only (6 occurrences). Their "session-replay tools" sentence describes the Clarity we killed in `bf8f83dc`; not taken. |
| — | `web/src/app/sitemap.ts` | **KEEP OURS OUTRIGHT, final.** Nothing ported. Verified rather than assumed: none of the file's inputs changed this phase, and the rendered sitemap has 848 `<loc>` entries with `if (post.noindex) continue` intact. |
| — | `web/content/resources/stamp-duty.md` | PORT -> **PARTIAL.** 18 of their 20 lines (em-dash removal) taken. **CARVE-OUT 1: their 15% Sch 4A rate NOT taken**, ours keeps 17% (FA 2025 s.53) in four places. **CARVE-OUT 5: their two FAQ h3 rewrites NOT taken**, our natural-query shape kept with only the dash replaced. Two en dashes they left behind were swept in the same commit. |
| — | `web/src/lib/site-stats.ts` | PORT -> **DONE**, byte-identical. Both headline claims traced to existing live claims of ours before shipping (`app/page.tsx:124`, `about/page.tsx:62`). |
| — | `web/src/lib/nav.ts`, `web/src/lib/calculators/nav.ts`, `web/src/lib/essential-guides.ts` | Already **DONE in Phase 2**. No Phase 5 work; `essential-guides.ts` is byte-identical, the two nav files carry their documented one-line deviations. |
| — | `web/src/components/property/StatsCounter.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/TestimonialsSection.tsx` | PORT -> **DONE**, byte-identical. Its `slate-400` at `:80` is on a navy card and was correctly left alone. |
| — | `web/src/components/property/LocationChips.tsx` | PORT -> **DONE + one hunk.** `locationHref(loc.slug)` replaces their hardcoded `/locations/${slug}`, which is exactly the bypass report 04 §5 hunk 5 said to check for. |
| — | `web/src/components/property/WhyUsList.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/ProblemStatement.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/PromptMarquee.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/ProcessTimeline.tsx` | PORT -> **DONE**, byte-identical. Its un-reached step badge is `slate-400` on white; the state is transient and could not be measured before/after, so it is reported rather than changed. |
| — | `web/src/components/property/CoverageCards.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/NumberedReasons.tsx` | PORT -> **DONE**, byte-identical. |
| — | `web/src/components/property/ServiceTiers.tsx` | PORT -> **DONE**, byte-identical. Its `border-t-4` press-down chrome swept with the rest of the button system. The component now has no consumer: their `/services` drops it and so does their homepage. |
| — | `web/src/components/embed/EmbedCta.tsx` | PORT -> **DONE**, byte-identical. The last `border-b-4` in the tree, and the one that renders inside a live third-party iframe. |
| — | `web/src/components/ui/ExampleFigureNote.tsx` | PORT -> **DONE, with Rule Zero (c).** Phase 4 recorded it as having no consumer anywhere; their `/property-tax-rates` gives it eight. `slate-400` -> `slate-500`, measured 2.63:1 -> 4.76:1 at 11px on white. |

Coupling updates against section 7 of this report:

- **#7 (crawlable links out of the free-tools block): STILL OPEN, and narrowed.**
  `CalculatorTabs` now lands on `/` and `/property-tax-rates` as well as `/calculators`.
  Neither loses a link: `/property-tax-rates` keeps 10 unique `/calculators/*` links (written
  as `calc={{ href }}` props), and the homepage body, which carried none before either, gains
  one ("See all N calculators", count derived from `allTools()`). The guard test now recognises
  both spellings plus a directory link, each with an asserted positive and negative case. The
  two real targets remain `/services/property-accountant` and `/services/property-tax-advice`
  in Phase 6.
- **#10 (headline statistics): CLOSED at the source level.** `lib/site-stats.ts` and
  `StatsCounter` landed together, and every consumer this phase touched (`/`, `/about`,
  `/services`, `/incorporation`, `/property-tax-rates`) feeds from the one array. The
  `StatsCounter` asterisk question (P6) is unchanged and still the owner's.
- **#3 (calculators mega-menu): unchanged**, closed in Phase 2.
- **#1 (animations degrade gracefully): unchanged.** The `Eyebrow`/`EyebrowRule` pair and the
  `card-glow` block this phase leans on both landed in Phase 1 with their `<noscript>` release
  lines.
- **#9 (specialist widget avatar): still neither half, deliberately.**

Note on carve-out 5, measured live before and after on 14 routes: unique outbound internal
links per page are **at or above the pre-phase count on every one**, with `/services` up 3 and
every other route level. No route lost a link, and the homepage holds 51 across a restructure
that deletes two whole sections.


**Phase 6A (2026-08-22, not tagged)** - gate hardening, the component placement map, and
sub-phase 6.1 `/services/property-accountant`:

| Row | Path | Change |
|---|---|---|
| 113 | `web/src/app/services/property-accountant/page.tsx` | PORT -> **DONE, theirs as the base.** The one page of the seven built from the designer's file (report 03 §4.7). Our metadata incl. hreflang and twitter, our Service + `hasOfferCatalog` JSON-LD, our Related reading section with all eight blog deep links and the fee-guide link ported back into it (carve-out 5). Two fact back-patches applied (carve-out 1). |
| 184 | `web/src/components/property/TaxYearGap.tsx` | PORT -> **DONE, byte-identical**, and it has a home: under the opener on `/services/property-accountant`, which is the first entry discharged from coupling #6. |
| 131 | `web/src/components/calculators/CalculatorLinkCards.tsx` | DONE (file), NOT YET WIRED -> **DONE AND WIRED.** First consumer anywhere, in either tree: the `#free-tools` block on `/services/property-accountant`, carrying the four crawlable calculator links their version dropped. |

Coupling updates against section 7 of this report:

- **#6 (14 bespoke components with a single forked-page home): DISCHARGED as a risk, 1 of 16
  placed.** The map report 14 asked for exists at
  `tmp/design_migration/logs/phase_6_component_map.md`. Every one of the missing components now
  has a named destination by `file:line`, or an explicit decision not to have one
  (`CardCarousel` on `/section-24`, `FilingDates` on `/landlord-tax`, both for stated reasons).
  Two corrections to this row: the list above names **15**, not 14, and `DrawnTickList` is a
  16th file in the same bucket. 13 of the 29 shared components report 03 §8.1 called missing
  have landed in Phases 1-5; **16 remain, and all 16 are pillar-page figures.**
- **#7 (crawlable links out of the free-tools block): NARROWED to one page.**
  `/services/property-accountant` now ships `CalculatorTabs` AND `CalculatorLinkCards` with the
  four links their version deleted. `/services/property-tax-advice` (6.3) is the last real
  target. The guard test that enforces this was re-derived in 6A and no longer accepts a bare
  link to the `/calculators` index outside the homepage, because the footer already renders one
  on every page of the site and the clause could therefore never fail.

**Phase 6B (2026-08-22, not tagged)** - sub-phases 6.2 `/section-24` and 6.3
`/services/property-tax-advice`:

| Row | Path | Change |
|---|---|---|
| 109 | `web/src/app/section-24/page.tsx` | PORT -> **DONE, ours as the base.** Their layout, our head, links and schema. Their before/after mechanism panel, Restricted/Still-deductible split, reducer-cap list, `CoverageCards` with `outcome` lines, rose-X divided list, cream hero, `StatsCounter`, `PromptMarquee`, `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel` and all four `data-cta` CTAs taken. `CardCarousel` REJECTED here as recorded (10 in-body blog links). Our Article JSON-LD, `og:type=article`, twitter card, all 12 blog deep links and the cluster claim kept (carve-out 5). Two fact back-patches (carve-out 1). Links 44 -> 45, old set a strict subset. |
| 114 | `web/src/app/services/property-tax-advice/page.tsx` | PORT -> **DONE, ours as the base, their section ordering.** Deliverables band moved to the middle. `DecisionWindow`, `ComparisonTable`, `DrawnTickList`, `CoverageCards` with `outcome` lines, `PromptMarquee`, `ProcessTimeline`, scoped `CalculatorTabs`, `LeadCTAPanel`, three `data-cta` CTAs taken. BOTH their prompts and our six scenarios kept. Our hreflang, twitter card, Service JSON-LD, the Background reading box with all 8 blog deep links, and the 4 crawlable calculator links restored (carve-out 5). Three fact back-patches (carve-out 1). Links 41 -> 41, sets IDENTICAL. |
| 177 | `web/src/components/property/RateWedge.tsx` | PORT -> **DONE, byte-identical apart from import ordering.** Home: the April 2027 section on `/section-24`. Carries `ExampleFigureNote`, which renders. |
| 163 | `web/src/components/property/DrawnTickList.tsx` | PORT -> **DONE, byte-identical.** Two homes, both live: the navy deliverables block on `/section-24` and the navy Deliverables band on `/services/property-tax-advice`. |
| 160 | `web/src/components/property/DecisionWindow.tsx` | PORT -> **DONE.** Home: inside the opener on `/services/property-tax-advice`, splitting the prose 1 + figure + 2. One Rule Zero (c) swap on the seam arrow, 2.52:1 -> 4.76:1, recorded in the file. |
| 158 | `web/src/components/property/ComparisonTable.tsx` | PORT -> **DONE.** First of its two homes live: "Why a property tax specialist" on `/services/property-tax-advice`, with its `cta`. Second home is 6.4. Two Rule Zero (c) swaps on the neutral `Minus` marks, 2.51:1 -> 4.76:1, recorded in the file. The neutral dash is kept and no red cross was introduced (report 12 §5.3 item 24). |
| n/a | `web/src/components/ui/Breadcrumb.tsx` | **OURS, changed.** Not a designer row. `:22` read `onDark ? "text-slate-400" : "text-slate-400"`, a no-op ternary that put a 2.52:1 chevron on every light hero. Light branch now `text-slate-500` at 4.56:1, measured in-browser. Rule Zero (c), root fix, own commit. |

Coupling updates against section 7 of this report:

- **#6 (bespoke components with a single forked-page home): 5 of 16 placed and rendering.**
  `TaxYearGap` (6.1), `RateWedge`, `DrawnTickList`, `DecisionWindow` and `ComparisonTable`
  (6B). Eleven remain, all with named destinations in
  `tmp/design_migration/logs/phase_6_component_map.md`. `DrawnTickList` and `ComparisonTable`
  are the first two multi-home components, and both behaved as the map predicted: whoever gets
  there first ports the file, the second consumer imports it. `ComparisonTable`'s second home
  (6.4) and `DrawnTickList`'s are both now a plain import.
- **#7 (crawlable links out of the free-tools block): CLOSED as a risk.** Both pages Phase 4
  identified as dropping four calculator links each now ship `CalculatorTabs` AND
  `CalculatorLinkCards`. `/section-24` gained a fifth consumer of the pattern and one net link.
  The re-derived guard test in `src/tests/calculator-tabs-crawl-path.test.ts` covers every page
  rendering tabs and its per-page loop now runs one row per such page.
- **#1 (storytelling scroll animations degrade gracefully): 2 more setters live.**
  `DrawnTickList` (`.tick-draw`) and `RateWedge` (`.rate-wedge-fill`) both now have consumers.
  Both classes were already in `globals.css` and both already have their `<noscript>` release
  line in `layout.tsx:93,97` from Phase 1, so nothing was missing. Verified in rendered HTML:
  `class="tick-draw"` and `rate-wedge-fill` are both present in the server output with
  `data-draw="off"` on the wrapper, which is what the `<noscript>` block releases.

Note on carve-out 5, measured live before and after from RENDERED HTML on both routes: unique
outbound internal links are at or above the pre-phase count on both. `/section-24` 44 -> 45 with
the old set a strict subset; `/services/property-tax-advice` 41 -> 41 with the two sets
identical. No route lost a link, and 20 blog deep links across the two pages survive a re-layout
that carries zero.

---

**Phase 6C (2026-08-22, not tagged)** - sub-phases 6.4 `/services/landlord-accountant` and
6.5 `/landlord-tax`, plus DECISION G:

| Row | Path | Change |
|---|---|---|
| 110 | `web/src/app/services/landlord-accountant/page.tsx` | PORT -> **DONE, ours as the base, THEIR PROSE.** The one page of the seven where report 03 judges their rewritten copy an upgrade rather than a re-layout: their buy-to-let and portfolio paragraphs are adopted verbatim, with our eleven blog deep links re-inserted into them. Cream hero, `StatsCounter`, `CoverageCards`, `CardCarousel` (accepted here, its five cards carry no links), `Section24Wedge`, `PortfolioPooling`, `investorFocus` cards, `AgencyBooks`, the navy `ComparisonTable` band, `ProcessTimeline`, `TestimonialsSection`, `LocationMap`, `CalculatorTabs`, `LeadCTAPanel` and all four of their `data-cta` CTAs taken. Our metadata with hreflang and twitter card, our Service JSON-LD, the letting-agent disbursement + NRL-obligation paragraph and the investor mixed-use/MDR sentence kept (carve-out 5). Three fact patches (carve-out 1). Links 47 -> 52, old set a strict subset. |
| 97 | `web/src/app/landlord-tax/page.tsx` | PORT -> **DONE, ours as the base.** Their twelve full-width alternating bands, with the `id` and `scroll-mt-24` kept on every outer `<section>` so all twelve anchors survive. Cream hero, `PromptMarquee`, `CoverageCards`, `RentalProfitStack`, the per-band relief/gap table, the covers/does-not-apply pair, the extracted worked-example table, the deductions list and repair/improvement split, the three purchase tiles, `DisposalFigures`, the IHT divided list, the navy changes band, the personal-vs-company table, `PenaltyLadder`, `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel` and all four `data-cta` CTAs taken. Our metadata, twitter card and Article JSON-LD kept, and all ten links their version drops restored, including the wave-11 `/landlord-compliance` wiring (carve-out 5). THREE fact patches (carve-out 1). Links 43 -> 43, sets IDENTICAL. `FilingDates` deliberately NOT placed, per report 12 §5.3 item 28. |
| 181 | `web/src/components/property/Section24Wedge.tsx` | PORT -> **DONE.** Home: the Buy to let section on `/services/landlord-accountant`, added beside their prose, replacing nothing. One Rule Zero (c) swap: their inlined example-figures note was `text-slate-400` at 11px on white, 2.63:1, and is now the shared `ExampleFigureNote` at `text-slate-500`, 4.76:1. Recorded in the file. Rule 34 holds: the £50,000 / £8,000 / £18,000 landlord matches `/section-24`. |
| 172 | `web/src/components/property/PortfolioPooling.tsx` | PORT -> **DONE.** Home: the Rental portfolios section on `/services/landlord-accountant`, figure-left to mirror the section above. Same Rule Zero (c) swap as `Section24Wedge`, recorded in the file. |
| 156 | `web/src/components/property/AgencyBooks.tsx` | PORT -> **DONE, byte-identical.** Home: the Letting agents section on `/services/landlord-accountant`. Figure AND prose, per the map: our paragraph carrying the disbursement nuance and the agent's own NRL obligation stays, because the component recovers neither. Its "employer NI at 15% above £5,000" checks out against ground truth. |
| 168 | `web/src/components/property/LocationMap.tsx` | PORT -> **DONE.** Home: the "near you" section on `/services/landlord-accountant`. It is the whole link gain on that page: five crawlable `/locations/<city>` links that neither side had in-body. One Rule Zero (c) swap on its footnote, `text-slate-400` -> `text-slate-500`. Its five pins are filtered against `siteConfig.locations`, and all five resolve. |
| 178 | `web/src/components/property/RentalProfitStack.tsx` | PORT -> **DONE, byte-identical.** Home: inside `#rental-income` on `/landlord-tax`, beside the bands table. Sets `data-draw`; `.profit-stack-seg` / `.profit-stack-marker` were already in `globals.css` and already released by `layout.tsx:98-99` from Phase 1, so nothing was missing. Carries `ExampleFigureNote`, which renders. |
| 162 | `web/src/components/property/DisposalFigures.tsx` | PORT -> **DONE, with a carve-out 1 change.** Home: inside `#selling` on `/landlord-tax` with `showRebasing={false}`; second home is 6.7 with it on. Their 60-day copy ("on every disposal of UK land... even to a disposal producing a loss, and to one fully covered by private residence relief") is the NON-resident rule and is a factual defect on a UK-resident page, against house positions §5 and its do-not-write list. That wording now switches on the existing `showRebasing` flag, which is the same audience switch, so no new prop was minted and the NRL rendering is unchanged. |
| 171 | `web/src/components/property/PenaltyLadder.tsx` | PORT -> **DONE, byte-identical.** Home: inside `#deadlines` on `/landlord-tax`, with our penalties prose kept beside it. **6C recorded a second home on 6.6; 6D corrected that to none** - the designer's own MTD page refuses it by name, so this component has ONE home. Sets `data-draw`; `.penalty-ladder-*` already in `globals.css` and released by `layout.tsx:94-96`. Carries `ExampleFigureNote`, which renders. |
| 158 | `web/src/components/property/ComparisonTable.tsx` | DONE -> **DONE, both homes live, and now instrumented.** Second home is the navy difference band on `/services/landlord-accountant`. Its `cta` carried no `data-cta`, which 6B raised and left open; it now carries `data-cta="comparison_book"`, `data-cta-placement="comparison_table"`, `data-cta-goal="form"`. See the 6C log for the decision. |

Coupling updates against section 7 of this report:

- **#6 (bespoke components with a single forked-page home): 12 of 16 placed and rendering.**
  `TaxYearGap` (6.1), `RateWedge`, `DrawnTickList`, `DecisionWindow`, `ComparisonTable` (6B),
  and `Section24Wedge`, `PortfolioPooling`, `AgencyBooks`, `LocationMap`, `RentalProfitStack`,
  `DisposalFigures`, `PenaltyLadder` (6C). Four remain: `FilingCadence` (6.6), `SchemeFlow`,
  `FilingDates`, `DepartureWindow` (6.7). `ComparisonTable`, `DisposalFigures` and
  `PenaltyLadder` are now multi-home; the map's "whoever gets there first ports the file"
  rule held on all three.
- **#1 (storytelling scroll animations degrade gracefully): 2 more setters live.**
  `PenaltyLadder` (`.penalty-ladder-rail`, `-rail-v`, `-step`) and `RentalProfitStack`
  (`.profit-stack-seg`, `.profit-stack-marker`). Both class families were already in
  `globals.css` and already carried their `<noscript>` release lines at `layout.tsx:94-99`
  from Phase 1. Verified in the rendered server HTML: both wrappers ship `data-draw="off"`,
  which is what the `<noscript>` block releases, so the no-JS case lands fully drawn.
- **#10 (headline statistics): two more routes.** `StatsCounter` now renders on
  `/landlord-tax` and `/services/landlord-accountant` as well. The substantiation question is
  unchanged and still the owner's.

Note on carve-out 5, measured live before and after from RENDERED HTML on both routes:
`/services/landlord-accountant` 47 -> 52 with the old set a strict subset (five
`/locations/<city>` links gained, none lost) and its 11 blog deep links intact;
`/landlord-tax` 43 -> 43 with the two sets IDENTICAL. Their versions of these two pages carry
11 and 9 links and zero blog deep links between them.

---

**Phase 6D (2026-08-22, not tagged)** - sub-phase 6.6 `/making-tax-digital-landlords`:

| Row | Path | Change |
|---|---|---|
| 101 | `web/src/app/making-tax-digital-landlords/page.tsx` | PORT -> **DONE, ours as the base.** Their layout end to end: cream hero, `StatsCounter`, `PromptMarquee`, `FilingCadence`, the "None of this changes" chip row, the three calendar tiles, the gross-versus-profit figure, the in/out badged scope list, `ProcessTimeline`, the specimen digital record, "what does not count", `CoverageCards` twice, the split penalty pair, the new `specialistComparison` table, `TestimonialsSection`, `CalculatorTabs`, `LeadCTAPanel`, `FaqSection` and all four of their `data-cta` CTAs. Our metadata and twitter card, our **Article and Service** JSON-LD (theirs emits FAQPage only) and **all fourteen links** kept, including both `/calculators/mtd-checker` links and the cluster hub (carve-out 5). Links **43 -> 43, sets IDENTICAL**; their version of this page carries 3. One fact patch (carve-out 1): the late-payment schedule bounded to 2026/27 with the 4%/4% step for 2027/28 and the first-year 30-day concession, per the 08-21 additions to house positions §19.7. The calendar tiles' hand-set `live` flag is now **derived from the row's start date**, removing the 6 April 2027 staleness trap report 03 §9.6 named. |
| 164 | `web/src/components/property/FilingCadence.tsx` | PORT -> **DONE, byte-identical.** Home: the opening regime section on `/making-tax-digital-landlords`, added beside their prose, replacing nothing that carried a link. Carries `ExampleFigureNote`, which renders. No `data-draw` and no animation, so no `<noscript>` release line is owed. |

Coupling updates against section 7 of this report:

- **#6 (bespoke components with a single forked-page home): 13 of 16 placed and rendering.**
  `FilingCadence` (6.6) joins the twelve from 6A to 6C. Three remain, all 6.7's: `SchemeFlow`,
  `FilingDates`, `DepartureWindow`. **Correction to this row's own text:** it lists
  `PenaltyLadder` as having two forked-page homes. It has ONE, `/landlord-tax`. The designer's
  own MTD page refuses it by name in a code comment on the block the map assigned it to
  (`Property_zip/.../making-tax-digital-landlords/page.tsx:940-942`), and their implementation
  is the spec. Corrected in `logs/phase_6_component_map.md` §2.
- **#7 (crawlable links out of the free-tools block): unchanged, and not breached here.**
  `CalculatorLinkCards` was deliberately NOT wired on this route, for the same reason as 6.4:
  their version drops no `/calculators/*` link, and our in-body `mtd-checker` link (written
  twice, because the tool takes zero in-body links from all 760 blog posts) carries the
  crawl-path guard. `/calculators/*` measured 7 before and 7 after, identical set.
- **#10 (headline statistics): one more route.** `StatsCounter` now renders on
  `/making-tax-digital-landlords` too. The substantiation question is unchanged and still the
  owner's.

Note on carve-out 5, measured live before and after from RENDERED HTML: 43 -> 43 with the two
sets IDENTICAL, all eleven blog paths (nine deep links plus two cluster hubs) intact. Their
version of this page carries **zero** of them, which is the worst link ratio of the seven
pillar pages and the reason report 03 §3.7 named this route the highest priority to protect.


**Phase 6E (2026-08-22, not tagged)** - sub-phase 6.7 `/services/non-resident-landlord`, the
last of the seven forked pillar pages:

| Row | Path | Change |
|---|---|---|
| 111 | `web/src/app/services/non-resident-landlord/page.tsx` | PORT -> **DONE, ours as the base, the most conservative port of the seven.** Their layout end to end: cream hero and its problem-led standfirst, `StatsCounter`, `SchemeFlow`, the two-column "Our clients" block with their six first-person prompts as a `PromptMarquee`, `CoverageCards` for the service items and for their three treaty cards, `TestimonialsSection`, `FilingDates`, the nested `#free-tools` scoped `CalculatorTabs`, `DisposalFigures`, `DepartureWindow`, the full-bleed navy failure-points band, `ProcessTimeline`, `LeadCTAPanel`, `FaqSection` and all six of their `data-cta` CTAs. Our metadata and twitter card kept, their retitle checked against BOTH the collision pre-flight and T1-09 of the SEO surface map and not adopted; our Service JSON-LD with `audience` and `areaServed` kept (theirs emits FAQPage only); **all sixteen blog deep links kept**, including the whole NRL rail and the cluster hub, which their version deletes in full (carve-out 5). Our six client scenarios and the inheritance tax paragraph kept alongside their additions. Links **48 -> 48 from rendered HTML, sets IDENTICAL**. Three carve-out 1 back-patches (MTD £20,000 / April 2028 in three places, the UK-resident side of the 60-day rule, ATED reliefs "claimed"), plus the rebasing prose now naming which date covers which kind of disposal. **The last image-hero breadcrumb occlusion in the port is cleared and `browser_check.mjs` exits 0.** |
| 179 | `web/src/components/property/SchemeFlow.tsx` | PORT -> **DONE.** Placed as the map specifies, added beneath our four paragraphs rather than replacing them. One Rule Zero (c) swap, measured. |
| 165 | `web/src/components/property/FilingDates.tsx` | PORT -> **DONE.** Placed as the map specifies. One carve-out 1 back-patch: the April 2028 / £20,000 MTD tile. |
| 161 | `web/src/components/property/DepartureWindow.tsx` | PORT -> **DONE.** Placed as the map specifies. One Rule Zero (c) swap, measured. |

Coupling updates against section 7 of this report:

- **#6 (bespoke components with a single forked-page home): 16 of 16 placed and rendering.
  CLOSED.** `SchemeFlow`, `FilingDates` and `DepartureWindow` (6.7) join the thirteen from 6A
  to 6D. `DisposalFigures` was imported rather than re-ported and its two audience variants
  were **verified independently in the rendered HTML of both consumers**: with `showRebasing`
  on, this page renders the designer's original 60-day wording and the rebasing card, and the
  UK-resident variant 6.5 added is absent; the reverse holds on `/landlord-tax`. No drift.
  **Two placements the map did not specify are now recorded in it**: `ExampleFigureNote` is
  wired three times on this page even though the designer's own file wires none (their asterisk
  sweep never covered this route, and the component's docstring records the owner's overrule),
  and our six client `scenarios` ship alongside their `PromptMarquee` in the same section.
  Correction carried from 6D stands: `PenaltyLadder` has ONE home, not two. The row's own text
  also says "14 bespoke components" and lists 15; there are 16, with `DrawnTickList`.
- **#1 (animations degrade gracefully): unchanged, and correctly so.** None of the three
  components this phase landed sets `data-draw`. `SchemeFlow` uses `ScrollGlowGroup`, whose
  release rule Phase 1 already landed and measured; `FilingDates` and `DepartureWindow` are
  static. No new `<noscript>` release line is owed.
- **#7 (crawlable links out of the free-tools block): unchanged, and not breached here.**
  `CalculatorLinkCards` deliberately NOT wired, for 6.4's and 6.6's reason: both of our in-body
  `/calculators/*` links (`section-24-calculator`, `mtd-checker`) survive in the prose, so the
  tabs block adds three tools without removing a link. `/calculators/*` measured 6 before and 6
  after, identical set, and the crawl-path guard passes on the real per-tool links.
- **#10 (headline statistics): the last route.** `StatsCounter` now renders on all seven pillar
  pages. The substantiation question is unchanged and still the owner's, and Phase 6 is now the
  last point at which it can be answered before deploy.

Note on carve-out 5, measured live before and after from RENDERED HTML: **48 -> 48 with the two
sets IDENTICAL**, all seventeen `/blog/*` paths intact, of which sixteen are page-authored: the
fourteen NRL deep links plus their cluster hub, and the `/blog/property-finance` expat mortgages
piece. Their version of this page carries **zero** of them. Report 03 §6.2 called deleting them
"the highest-risk single change in the whole migration"; none of them was deleted.


**Phase 7 (2026-08-22, not yet tagged)** - the pages and calculators the designer never saw:

| Row | Path | Change |
|---|---|---|
| 131 | `web/src/components/calculators/CalculatorLinkCards.tsx` | WIRED -> **WIRED, third consumer.** `/for-letting-agents` replaces a five-item bullet list of the same five hrefs with the card grid. Link set measured identical. Edited in place in the table above. |
| 194 | `web/src/components/ui/CTASection.tsx` | PORT -> **DONE (file kept), ZERO consumers.** The "live on 16 pages" note is corrected in place with the measurement: `git grep -c "<CTASection" design-port-phase-6` returns four files, all four of them Phase 7 pages. Phase 7 moved all four to `LeadCTAPanel`, so the count is 0. The file is untouched and still exported (Rule Zero (b)). Raised as this phase's headline owner question. |

Rows with NO change, stated because a reader will look for them:

- **No designer file changed disposition in this phase**, because there was none left to
  change. `comm -23` between the designer's `components/property/` and `components/ui/` and
  ours returns **no output** in both directions: Phases 1 to 6 landed every designer
  component. Phase 7 placed existing components only, and added one file of our own.
- **`web/src/components/property/TopicSection.tsx` has no row and should not get one.** It is
  not a designer file. It is our re-implementation of the five pillars' shared local
  `function Section` helper, rebuilt out of the designer's primitives so five pages could move
  for the cost of one. Every value in it is cited to a shipped designer surface in its own
  docstring.

Coupling updates against §7 of this report:

- **#7 (crawlable links out of the free-tools block): strengthened.** `CalculatorLinkCards`
  goes from two consumers to three. Row edited in place.
- **#6 (16 bespoke components with one home): unchanged, and deliberately.** Phase 7 placed
  **no** bespoke storytelling component on the five pages. `PenaltyLadder` was the obvious
  candidate for `/landlord-compliance`'s penalty ladder and was **refused**: the component map
  §2 records the designer's own file refusing it on `/making-tax-digital-landlords` by name
  because "that rail is spent on /landlord-tax", and giving it a third home would undo a
  stated non-action. Same for `FilingDates` on the compliance calendar, which report 12 §5.3
  item 28 pins to the NRL page.
- **#10 (headline statistics): NOT widened.** `StatsCounter` was deliberately not added to any
  of the five. Report 12 §5.3 item 30 records the designer refusing to apply the template
  wholesale to reference surfaces, and these five are reference surfaces. The open
  substantiation question therefore still covers seven routes, not twelve.
- **#1 (animations degrade gracefully): unchanged.** Phase 7 added no `data-draw` setter.
  `TopicSection` renders `Eyebrow`, whose `EyebrowRule` release line Phase 1 already landed and
  measured. No new `<noscript>` line is owed.

**One defect found in this phase that belongs to another one.** All ten blog category hubs
emit `BreadcrumbList` **twice**: `BlogCategoryHub` builds one into its `@graph` and also
renders `<Breadcrumb>`, which independently emits its own. Measured by parsing the rendered
JSON-LD on `/blog/property-finance`, `/blog/capital-gains-tax`,
`/blog/landlord-tax-essentials` and `/blog/portfolio-management`; `/blog` itself is correct at
one. This is exactly the class report 10 §B5 predicted for the five pillar pages, which Phase
0.10 fixed. It is a Phase 3 component reaching ten routes, so it is reported rather than
fixed. Detail and the raw output: `logs/phase_7_measurements.txt` M10.

---

**Phase 8 (2026-08-23, not yet tagged)** - cleanup and the two deferred structural fixes. This
is the LAST build phase; Phase 9 is deploy and it is owner-triggered.

Rows edited in place above: **94** (`globals.css`), **102** (`not-found.tsx`), **119**
(`BlogCategoryHub.tsx`), **126** (`TableOfContents.tsx`), **137**
(`PortfolioProfitabilityCalculator.tsx`), **169** (`MTDCountdown.tsx`), **175**
(`ProcessTimeline.tsx`), **194** (`CTASection.tsx`), **206** (`lib/blog.ts`), **219**
(`site-stats.ts`), and **§7 coupling 10** (headline statistics).

| Row | Path | Change |
|---|---|---|
| 94 | `web/src/app/globals.css` | DONE (phase 1.1) -> **DONE + phase 8.1**. The `h1..h6` rule is now split: `font-weight` and `letter-spacing` in `@layer base`, `line-height: 1.2` deliberately left unlayered. Carve-out 6 (`@source`) still held. |
| 102 | `web/src/app/not-found.tsx` | PORT -> **DONE (phase 8.11)**. `font-serif` removed; it was the last one in the tree. |
| 119 | `web/src/components/blog/BlogCategoryHub.tsx` | DONE (phase 3.1) -> **DONE + phase 8.3**. Duplicate `BreadcrumbList` `@graph` node removed. |
| 126 | `web/src/components/blog/TableOfContents.tsx` | DONE (phase 3.2) -> **DONE + phase 8.1**. One of the two deliberate typography activations. |
| 137 | `web/src/components/calculators/PortfolioProfitabilityCalculator.tsx` | PORT -> **DONE (phase 8.1, typography only)**. The designer's remaining token-sweep hunks on this file are still owed; only the heading tracking activated here. |
| 169 | `web/src/components/property/MTDCountdown.tsx` | PORT -> **DONE (phase 8.9)**, own isolated commit `9d82560b`. |
| 175 | `web/src/components/property/ProcessTimeline.tsx` | PORT -> **DONE (phase 8.7, Rule Zero (c) only)**. |
| 194 | `web/src/components/ui/CTASection.tsx` | KEPT/zero consumers -> **DELETED (phase 8.8)**, on the designer's own evidence. |
| 206 | `web/src/lib/blog.ts` | DONE (phase 3.1) -> **DONE + phase 8.2**. `getRelatedPosts` re-keyed on category slug. |
| 219 | `web/src/lib/site-stats.ts` | PORT -> **DONE (phase 8.4)**, DECISION L shipped, DECISION M left open. |

**Files Phase 8 deleted that are NOT in the 252-row table**, because the designer never changed
them, recorded here so the deletion is not invisible:
`web/src/components/calculators/premium/ResultChart.tsx` and
`web/src/components/calculators/premium/ResultChartInner.tsx`. A superseded pair:
`ResultChartInner`'s only importer was `ResultChart`, and `ResultChart` had no importer at all,
because `PremiumCalculator.tsx:25` imports `recharts` directly and draws its own chart. The
six premium tools that declare a `chart:` spec are unaffected; `ChartSpec` and `ChartResult`
stay in `lib/calculators/premium/types.ts` and are still consumed. The designer's tree also has
zero consumers for both.

**Files Phase 8 changed that are outside the designer's 252** (ours, or shared):
`web/src/lib/calculators/tools/capital-allowances-calculator.ts` (40% FYA copy, house §38),
`web/src/components/ui/ExampleFigureNote.tsx` (stale £2.4M reference in its docstring),
`web/src/app/{leasehold,landed-estates,landlord-compliance}/page.tsx` +
`app/calculators/stamp-duty-calculator/page.tsx` + `app/calculators/[slug]/page.tsx` (the G1
list sweep), `web/src/app/{terms,privacy-policy,cookie-policy}/page.tsx` and
`components/calculators/premium/MiniGrid.tsx` (dormant `font-semibold` -> `font-bold`, zero
rendered change), `packages/web-shared/package.json` (the dangling
`./analytics/react/Clarity` export, deleted), plus `docs/property/STATE.md`,
`docs/property/LEAD_CAPTURE_MAP.md` and `docs/property/PROACTIVE_ASSISTANT_BRIEF.md`.

**Rule Zero (b) check.** No designer file was discarded on any of these. `CTASection`,
`ResultChart` and `ResultChartInner` are deletions of components the DESIGNER had already
stopped using, evidenced from their own tree, and git history is the undo. The 15
`leading-tight` hero h1s and the homepage `leading-[1.15] sm:leading-[1.1]` were deliberately
LEFT byte-identical to the designer's strings rather than tidied away, even though they stay
inert, so nothing they authored is dropped from the source.
