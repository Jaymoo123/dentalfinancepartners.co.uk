# P0F2 receipt — pharmacies phase 0, package F2

`cd pharmacies/web && npx tsc --noEmit` → clean, zero errors.

## Files changed

- `pharmacies/web/src/app/layout.tsx`
- `pharmacies/web/src/lib/schema.ts`
- `pharmacies/web/src/app/page.tsx`
- `pharmacies/web/src/components/layout/PageShell.tsx` (new)
- `pharmacies/web/src/app/services/page.tsx`
- `pharmacies/web/src/app/for/page.tsx`
- `pharmacies/web/src/app/calculators/page.tsx`
- `pharmacies/web/src/app/calculators/[slug]/page.tsx`
- `pharmacies/web/src/app/contact/page.tsx`
- `pharmacies/web/src/app/thank-you/page.tsx`
- `pharmacies/web/src/app/book/page.tsx`
- `pharmacies/web/src/app/complete/page.tsx`
- `pharmacies/web/src/app/about/page.tsx`
- `pharmacies/web/src/components/calculators/CalcResultCta.tsx`
- `pharmacies/web/src/components/calculators/MiniCapture.tsx`

## Changes

### 1–2. Organization JSON-LD @id clash + priceRange (ledger #1, #2)

- Before: `layout.tsx` emitted a hand-rolled Organization block (no legalName,
  no alternateName, no parentOrganization) in `<head>` on every page; `page.tsx`
  (home only) additionally emitted `buildOrganizationJsonLd()` from
  `lib/schema.ts` (richer: legalName "Ashfield Trading Ltd", alternateName,
  address, parentOrganization, `priceRange: "££"`). Same `@id`
  (`#organization`), conflicting content, home page got both.
- After: `layout.tsx` now calls `buildOrganizationJsonLd()` (the richer
  builder) for the one `<head>` block on every page. `page.tsx` no longer
  imports or calls `buildOrganizationJsonLd()` (removed the duplicate
  `<script>` + import), keeps `buildWebsiteJsonLd()`/`buildFaqJsonLd()`.
  `lib/schema.ts`: removed the `priceRange: "££"` line from the builder call —
  this firm quotes after a call, not a price band. Net: one Organization block,
  richer field set, on every page; no priceRange anywhere.
- Did not add `parentOrganization` — it was already present in the richer
  builder before this edit; left untouched.

### 3. `/embed/<slug>` full chrome leak (ledger #3)

- Read-only check of `Property/web/src/app/embed` confirmed Property has no
  `embed/layout.tsx`; the chrome-suppression happens in a client
  `PageShell.tsx` (in `components/layout/`) that calls `usePathname()` and
  returns `children` bare when the path starts with `/embed/`.
- Pharmacies had no such shell — `layout.tsx` rendered `SiteHeader`, `<main>`,
  `SiteFooter`, `StickyCTA` directly and unconditionally. Copied Property's
  shape (smaller than restructuring every route into a route group): new
  `pharmacies/web/src/components/layout/PageShell.tsx`, a client component
  that returns `<>{children}</>` for `/embed/*` and the full
  header/main/footer/StickyCTA chrome otherwise. `layout.tsx` now renders
  `<PageShell>{children}</PageShell>` in place of the four chrome elements.
  Calculator and its embed result form in `embed/[slug]/page.tsx` untouched.

### 4. Nested `<main>` (ledger #8 / P0E structural §7)

Switched the page-level `<main>` to `<div>` (root layout's `<main id="main">`,
now inside `PageShell`, stays the sole landmark) on the 6 in-scope files that
had it:

- `services/page.tsx`, `for/page.tsx`, `calculators/page.tsx`,
  `contact/page.tsx`: outer `<main className="...">` → `<div className="...">`.
- `calculators/[slug]/page.tsx`: `<main>` → `<div>`.
- `thank-you/page.tsx`: all three branches' `<main className="...">` →
  `<div className="...">`.

Handoff (not mine): `/blog`, `/blog/[category]`, `/blog/[category]/[slug]`,
`/research/pharmacy-openings-closures-index`,
`/research/pharmacy-density-and-workload-index` also have nested `<main>` per
P0E §7 — all out of scope (blog/research excluded from my file set).

### 5. Title doubling + over-long meta description (ledger #5)

- `services/page.tsx:10` title `"Services | Pharmacy Tax"` →
  `"Services"` (layout's template already appends `| Pharmacy Tax`; the old
  string doubled it).
- `for/page.tsx:7` title `"Who We Help | Pharmacy Tax"` → `"Who We Help"`,
  same fix.
- Handoff: `/research/pharmacy-openings-closures-index` and
  `/research/pharmacy-density-and-workload-index` have the same doubled-suffix
  bug — out of scope (research excluded).
- `services/page.tsx` meta description was 168 chars (over 160). Trimmed by
  deleting the trailing ", and benchmarking." clause only — no new or reworded
  copy, per the owner's wording-stays rule — now 150 chars.
- Handoff: home page description (175 chars) comes from `niche.description` in
  `pharmacies/niche.config.json`, outside my file set. Both `/research/*`
  descriptions (188/185) are out of scope. The two over-length calculator
  descriptions (`pharmacy-fp34-cash-flow-estimator` 173,
  `locum-take-home-comparator` 164) and their `/embed/*` twins pull
  `tool.metaDescription`/`tool.oneLiner` from `src/lib/calculators/tools/*.ts`
  data files, explicitly off-limits — handoff.

### 6. Funnel canonical (ledger #12)

`/book`, `/complete`, `/thank-you` had no `alternates.canonical` in their own
metadata, so they inherited the root layout's `canonical: siteUrl` (the bare
homepage). Added `alternates: { canonical: \`${siteConfig.url}/<path>\` }` to
each page's `metadata` export (imported `siteConfig` from `@/config/site` into
`book/page.tsx` and `complete/page.tsx`; `thank-you/page.tsx` already had other
imports, added `siteConfig` there too).

Handoff: `/admin/login` has the same bare-homepage canonical (P0B #12) —
`src/app/admin/**` is off-limits.

### 7. Reply-time wording (ledger row 7)

Grepped `Property/web/src` for the reply-time promise: "within 24 hours" /
"24-hour response" is the overwhelming, dominant wording across Property
(40+ hits, including every `LeadCTAPanel`/stat-tile instance); "within one
working day" appears only in a handful of spots, and one of Property's own
code comments (`services/property-accountant/page.tsx:232`) explicitly flags
"one working day" as a different, unintended service promise that crept in
without sign-off and should have stayed "24 hours." Treated "within 24 hours"
as the firm's actual standing promise.

Pharmacies already uses "within 24 hours" almost everywhere, but 3 files in my
scope had the stray "within one working day" variant, each inconsistent with
the rest of the same site (and in `about/page.tsx`'s case, with itself two
lines later):

- `about/page.tsx:26` "reply within one working day" → "reply within 24
  hours" (line 45 on the same page already says 24 hours).
- `components/calculators/CalcResultCta.tsx` "...we reply within one working
  day." → "...we reply within 24 hours."
- `components/calculators/MiniCapture.tsx` default `successText` "within one
  working day" → "within 24 hours".

Handoff (not mine — `src/components/forms` is off-limits): `LeadForm.tsx` was
not checked/touched; P0E flagged its posting endpoint as unconfirmed too, so
a phase-1 pass on forms should re-grep this same phrase there.

## Not done (explicitly out of scope per brief)

- No breadcrumb UI added (phase 3).
- No skip link added (phase 1).
- StickyCTA design untouched.
- No wording changes beyond the pure-deletion trim (#5) and the reply-time
  normalisation (#7, matched to Property's dominant/this-site's-own-dominant
  wording, not a new phrase).
- No kit-chrome adoption, no shared-builder `parentOrganization` addition (it
  pre-existed), no design-token changes.

## Handoffs (outside my file set)

- `src/app/blog/**`, `src/app/research/**`: nested `<main>` (5 routes, P0E §7).
- `src/app/research/*`: title doubling (2 pages) + over-long meta description
  (2 pages, 188/185 chars).
- `pharmacies/niche.config.json` (`description` key): home page meta
  description 175 chars, feeds `layout.tsx` title/description defaults.
- `src/lib/calculators/tools/*.ts`: `metaDescription`/`oneLiner` fields behind
  the over-length descriptions on `/calculators/pharmacy-fp34-cash-flow-
  estimator`, `/calculators/locum-take-home-comparator`, and their `/embed/*`
  twins.
- `src/app/admin/login`: bare-homepage canonical, same defect class as #6,
  plus the odd 404-with-full-app-shell behaviour P0B flagged separately.
- `src/components/forms/LeadForm.tsx`: not grepped/fixed for the reply-time
  wording under this package; check for "one working day" there in phase 1.
- `src/components/ui/Breadcrumb.tsx` coverage and `src/components/ui/layout-
  utils.ts` kit-parity: both flagged ADOPT-KIT/RETIRE in P0E §3, phase 1 work,
  untouched here.
