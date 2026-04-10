# Issue Log

Last updated: 9 April 2026 (Property safe fixes applied)

Historical audit (32 items, 2 April 2026): `Admin/PLATFORM_AUDIT_2026-04-02.md`

---

## Quick Lookup by Site

- **Property**: P-007, P-008, X-001, X-003, X-004
- **Dentists**: D-001, D-002, X-001, X-002, X-003, X-004
- **Medical**: M-001, M-002, M-003, M-004, M-005, X-001, X-002, X-003, X-004
- **Solicitors**: S-001, S-002, S-003, X-001, X-002, X-003, X-004
- **Infrastructure**: I-001, I-002

---

## Open Issues

### Critical

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| M-001 | 2026-04-02 | SEO | All 46 Medical posts have empty canonical URLs — relies on runtime fallback | `Medical/web/content/blog/*.md` |
| S-001 | 2026-04-02 | Bug | Solicitors location pages double-JSON.stringify LocalBusiness schema — invalid structured data | `Solicitors/web/src/app/locations/[slug]/page.tsx` |
| X-001 | 2026-04-02 | Config | 3 sites (Property, Medical, Solicitors) have placeholder Google verification tokens — cannot verify in GSC | `{Property,Medical,Solicitors}/niche.config.json` |
| X-002 | 2026-04-02 | Config | 3 sites (Dentists, Medical, Solicitors) use Ofcom-reserved 7946 phone numbers — placeholder contact info | `{Dentists,Medical,Solicitors}/niche.config.json` |

### High

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| P-007 | 2026-04-09 | Bug | IncorporationCostCalculator hardcodes corporation tax at 19% — UK rate is 25% for profits over £250k in 2026; tool overstates company-side savings on a YMYL site | `Property/web/src/components/calculators/IncorporationCostCalculator.tsx` (line 29) |
| P-008 | 2026-04-09 | Content | CGT rate inconsistency: some posts cite 18%/28% residential rates while others use the current 18%/24% — contradictory tax advice on same site | `Property/web/content/blog/london-property-accountant.md`, `cgt-payment-deadlines-property-sales-2026.md` |
| M-002 | 2026-04-02 | Content | "GP Tax & Accounts" category has 30 posts (65%) — severely overloaded | `Medical/web/content/blog/*.md` front matter |
| M-003 | 2026-04-02 | Config | "Consultant Tax" category defined in config but has 0 posts and no hub page | `Medical/niche.config.json`, `Medical/web/src/app/blog/` |
| M-004 | 2026-04-02 | SEO | Medical has no Twitter card metadata on any non-blog page | `Medical/web/src/app/*/page.tsx` |
| S-002 | 2026-04-02 | Bug | Solicitors blog index links to `/blog/structure-incorporation` but no hub page exists for that category — 404 | `Solicitors/web/src/app/blog/page.tsx` |
| D-001 | 2026-04-02 | SEO | 8 Dentists posts have stale year references in metaTitle (2024) | See audit item #11 for full list |
| X-003 | 2026-04-02 | SEO | BlogPosting schema sets `dateModified` = `datePublished` on all 236 posts — Google cannot detect content freshness | `*/web/src/lib/schema.ts` |
| X-004 | 2026-04-02 | SEO | `image` field empty on all 236 posts — BlogPosting schema has no image, blocks rich result eligibility | `*/web/content/blog/*.md`, `*/web/src/lib/schema.ts` |

### Medium

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| D-002 | 2026-04-02 | Content | 11/55 Dentists posts have zero outbound internal blog links | Dentists blog content |
| S-003 | 2026-04-02 | Content | Solicitors "Structure & Incorporation" category has only 1 post | `Solicitors/web/content/blog/` |
| M-005 | 2026-04-02 | Config | Medical `globals.css` primary is navy but `niche.config.json` says teal (#0891b2) — visual/config drift | `Medical/web/src/app/globals.css`, `Medical/niche.config.json` |
| I-001 | 2026-04-02 | Infrastructure | `sync_shared_components.py` only syncs lib/config/types — does NOT sync components despite `shared/README.md` claiming it does | `scripts/Monitoring/sync_shared_components.py`, `shared/README.md` |
| I-002 | 2026-04-02 | Config | Solicitors `last_sync: null` — shared components have never been synced via the automated script | `Solicitors/niche.config.json` |

### Low

No open low-severity issues.

---

## Resolved

| ID | Date Found | Date Resolved | Description | Resolution |
|----|-----------|---------------|-------------|------------|
| P-001 | 2026-04-09 | 2026-04-09 | `getRelatedPosts` stopped after finding N posts in filesystem order instead of scanning all category posts | Rewrote to scan all same-category posts, sort by date desc, then slice to limit |
| P-002 | 2026-04-02 | 2026-04-09 | "Portfolio Management" category had 37 posts (44%) — severely overloaded catch-all | Recategorised: now 1 post in Portfolio Management; Property Accountant Services (23), Incorporation (19), Section 24 (16), Landlord Tax Essentials (13), CGT (8), MTD (5) |
| P-003 | 2026-04-02 | 2026-04-09 | 6 Property posts had stale year references (2024, 2025) in metaTitle | All metaTitle fields now use 2026 |
| P-004 | 2026-04-02 | 2026-04-09 | `property-accountant-services.md` linked to `/mtd` which does not exist | Link no longer present in current content |
| P-005 | 2026-04-09 | 2026-04-09 | `addHeadingIds` did not deduplicate — identical heading text produced duplicate `id` attributes | Added `Set` to track seen IDs; appends `-2`, `-3` suffix for duplicates |
| P-006 | 2026-04-02 | 2026-04-09 | Brand mismatch: SiteFooter, About, Contact, Homepage OG/Twitter used hardcoded names instead of `siteConfig.name` | Replaced hardcoded strings with `siteConfig.name` template literals; kept SEO keyword title on homepage |
| P-009 | 2026-04-09 | 2026-04-09 | PortfolioProfitabilityCalculator ID collision after row deletion | Replaced `properties.length + 1` with monotonic `useRef` counter |
| P-010 | 2026-04-09 | 2026-04-09 | StickyCTA divide-by-zero on short pages | Added `Math.max(1, ...)` guard on denominator |
| P-011 | 2026-04-09 | 2026-04-09 | IncorporationCostCalculator: unused `mortgageBalance` input; negative tax values | Removed unused `mortgageBalance` state/input; added `Math.max(0, ...)` on gain and profit |
| P-012 | 2026-04-09 | 2026-04-09 | `rental-income-tax-uk-complete-guide-landlords.md` title/h1 said "2025" while metaTitle said "2026" | Updated `title` and `h1` to "2026" to match `metaTitle` |
| P-013 | 2026-04-09 | 2026-04-09 | Legal pages missing OpenGraph; blog index missing Twitter card | Added OpenGraph to privacy/terms/cookie pages; added Twitter card to blog index |
| P-014 | 2026-04-09 | 2026-04-09 | `RentalYieldCalculator` and `MiniSection24Calculator` were dead code — no imports | Deleted both files |
| — | 2026-04-02 | 2026-04-03 | Medical `gp-accountant-services.md` filename did not match front matter slug — 404 + 14 broken internal links | Renamed to `gp-accountant-services-complete-guide.md` |
| — | 2026-04-02 | 2026-04-03 | Property: 36 `SLUG_TO_CATEGORY_MAP` entries pointed to wrong categories + 63 `DUPLICATE_REDIRECTS` targets caused double-301 chains | Corrected all map entries in middleware.ts |
| — | 2026-04-02 | 2026-04-03 | Solicitors: 11 `DUPLICATE_REDIRECTS` used wrong category slugs (had `and` instead of stripped `&`) | Fixed to match Solicitors slugifyCategory behaviour |
| — | 2026-04-02 | 2026-04-03 | Dentists: 86 flat `/blog/{slug}` links across 38 posts + missing middleware entry for student loan guide | Converted to canonical nested format; added middleware entry |
| — | 2026-04-02 | 2026-04-03 | Property: broken static link `/making-tax-digital-property` | Redirected to `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` |
| — | 2026-04-02 | 2026-04-03 | Dentists: 1 empty canonical URL on `dentist-student-loan-repayment-tax-planning-guide.md` | Populated canonical in front matter |
