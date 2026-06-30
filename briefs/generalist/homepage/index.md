# Implementation brief — generalist homepage (Holloway Davies)

**Page:** https://www.hollowaydavies.co.uk/
**Source file (hand-edit):** `generalist/web/src/app/page.tsx`
**Engine:** corepage Phase 1, run 2026-06-29 against same-day GSC (90d). Analysis pack: `briefs/generalist/homepage/_analysis_pack.md`.
**Status:** Wave 1 deliverable (the brief). The actual page edit ships in **Wave 2** (Sonnet writer → Opus QA → deploy gated). This is a TSX commercial landing page, not a blog post.

---

## Diagnosis (reasoned, not restated)

The homepage owns **1 of 440** head-family queries it could plausibly catch (2,503 impressions/90d). The instinct is "cannibalisation" but that is the wrong read here. Looking at the catcher table, almost every head query is **city-qualified** (small business accountant *cannock*, self assessment accountant *cannock*, chartered accountants *bangor*, new business accountant *croydon*) or **industry-qualified** (cis accountant, plumbers accountant, veterinary accountants, company formation accountant). Those are correctly caught by the location pages and the niche `/blog/...accountant-for-X` pages. The homepage is not losing a fight with a sibling page — it simply is **not relevant enough to rank for the pure national generic terms** ("small business accountant", "online accountant", "limited company accountant"), so it never surfaces and the impression pool for those terms is tiny.

Two hard facts confirm it:
- **H1 is a slogan** ("UK business accounting, done with conviction.") with no head keyword. Title is brand-led ("Holloway Davies | ICAEW chartered accountants for UK business"), also no head keyword.
- **Thin page:** 482 words vs competitor median 1,202 (max 2,675); 4 H2s vs 6.5; schema is `FAQPage, ProfessionalService, WebSite` only.

So the job is **make the homepage own the national generic head family** (relevance: title, H1, intro, depth, schema), and **route local/niche intent down** to the pages that already (deep-)rank for it, with a few exact-match links **up** to pass relevance. Local intent stays on `/locations/*` and `/accountant-near-me`; niche-industry intent stays on the `/blog/...accountant-for-X` pages (those are Wave 4 rewrite candidates given pos 30-75, not homepage business).

Expectation setting: the site ranks ~pos 29 nationally. This pass is necessary but not sufficient on its own. It pairs with content depth, GEO (Wave 3) and the rewrite/authority work to actually move position. Do not promise a page-1 jump from a title change alone.

---

## Recommended title / meta

- **Title (<=60 chars), leads with the head token:**
  `Small Business Accountants UK | Holloway Davies` (47)
  - Alt A: `Online Accountants for UK Small Businesses | Holloway Davies` (60)
  - Alt B: `Small Business & Limited Company Accountants | Holloway Davies` (61, trim if needed)
- **Meta description (natural, keyword-bearing, ~150 chars):**
  `Fixed-fee accountants for UK small businesses — limited companies, sole traders and contractors. Corporation tax, VAT, payroll, self assessment and MTD, all year round.`
- Update OG/Twitter title + description to match.

**Head family this page should own (priority order):** small business accountant · accountant for small business · online accountant · limited company accountant · accountant for limited company · contractor accountant · sole trader accountant · fixed fee accountant.

## 3 H1 options (keyword-bearing; demote the slogan to a sub-headline `<p>`)

1. `Small business accountants for UK limited companies, sole traders and contractors` (recommended — covers the four lead-form segments + head term)
2. `UK small business accountants. Fixed fees, support all year.`
3. `Online accountants for UK small businesses and limited companies`

Keep "done with conviction" only as a sub-headline tagline beneath the new H1 (do not delete the brand voice, just demote it below the keyword H1).

---

## On-page sections + entity coverage (grow ~482 → ~1,200-1,500 words; stay a landing page, not a blog)

Add/strengthen, in this order under the existing hero (keep the visual design):
1. **Keyword intro paragraph** (2-3 sentences) using "small business accountant" naturally + the segments served.
2. **Who we help** — four cards mapped to the lead-form segments: limited companies, sole traders, contractors/freelancers, partnerships/LLPs (and "just starting out"). One line each, linking to the matching `/fundamentals` pillar.
3. **What we handle** — corporation tax, VAT (registration + returns), payroll/PAYE, self assessment, Making Tax Digital for Income Tax, R&D tax credits, Companies House filing, exit/BADR. Each links to its pillar where one exists.
4. **A comparison/decision element** (competitors carry a `decision_matrix`; we lack one) — a small `<table>`: limited company vs sole trader at a glance, or "what's included" by package. Link to `/fundamentals/limited-company-vs-sole-trader`.
5. **How fixed fees work** — short, concrete, transparent (the firm's differentiator vs hourly rivals).
6. **Areas we serve** — national coverage line + link to `/locations` and `/accountant-near-me`. Do NOT enumerate term+city combos here (that is the location pages' job).
7. **Trust** — software (Xero/QuickBooks), all-year support, response commitment, anonymised outcomes. No fabricated ratings.
8. **FAQs** grown to **8-10** targeting the zero-click head queries (see analysis pack): "how much does a small business accountant cost", "do I need an accountant for a limited company", "can you switch my accountant mid-year", "online vs local accountant", "what does a fixed-fee accountant include", "accountant for a sole trader vs limited company".

Entity coverage to hit (for AI/topical relevance): corporation tax, VAT threshold, PAYE, self assessment, MTD ITSA, R&D credits, BADR, IR35, Companies House, dividend vs salary. Use 2026/27 figures only (no "2025/26").

External authority links (4-7): HMRC CTM, BIM, VAT registration, PAYE for employers, MTD ITSA checker, Companies House filing (full list in scaffold).

---

## Schema additions (one `#organization` @id graph; use existing shared builders)

Current: `FAQPage`, `ProfessionalService` (the Organization typed via `organization_type`), `WebSite`. Add:
- **AccountingService / LocalBusiness** — national instance, `areaServed: GB`, `priceRange`, `openingHoursSpecification`, `parentOrganization` → `#organization`. Reuse the builder already used by `locations/[slug]/page.tsx`.
- **Service** with `provider` → `#organization` and a `hasOfferCatalog` listing the core services (corporation tax, VAT, payroll, self assessment, R&D, MTD).
- **BreadcrumbList** (missing vs competitors; ≥2 competitors have it) via `buildBreadcrumb` from `@/lib/schema`.
- Keep `FAQPage` (feed it from the grown `faqs` array — do not hand-write FAQ JSON-LD).
- **No `AggregateRating` / `Review`** unless there are genuine, attributable reviews. Never fabricate.
- **Credential guard:** the Organization/AccountingService node must NOT assert `memberOf` ICAEW or any chartered/ACA credential (see Risks). Emit accurate descriptors only.

This doubles as part of Wave 3's homepage schema parity (3 → 7 nodes), so do it once here.

---

## Internal-linking / cannibalisation actions (conservative, reversible)

The homepage is not being cannibalised; it needs relevance + inbound link equity. Actions:
- **Link DOWN** from the homepage: "Areas we serve" → `/locations` + `/accountant-near-me`; "Who we help"/"What we handle" → the `/fundamentals` pillars.
- **Link UP** to the homepage with exact-match anchor ("small business accountants") from a handful of the strongest catcher pages, to pass national relevance — pick the highest-impression ones only:
  - Locations: `/locations/putney`, `/locations/cannock`, `/locations/croydon`, `/locations/norwich`, `/locations/exeter`, `/locations/derby`, `/locations/st-albans`.
  - Niche blogs (also Wave 4 rewrite candidates): `/blog/payroll-and-paye/accountant-for-construction-subcontractors-cis`, `/blog/limited-company-tax/accountant-for-vets-uk`.
- **Do NOT** pull city-qualified or industry-qualified queries onto the homepage, and **do NOT** de-optimise the location pages — they rank locally and that is correct (`geo_keep_local`).
- The niche `/blog/...accountant-for-X` pages ranking pos 30-75 (cis, plumbers, vets, company-formation, photographers, schools) are **Wave 4 rewrite candidates**, not homepage cannibalisation. Note them for that wave; do not collapse them.

---

## Geo angle

National head family on the homepage; local intent funnels to `/locations/*` and `/accountant-near-me`. The "Areas we serve" section is the only geo surface on the homepage. Location pages stay untouched.

---

## Risks / decisions

1. **Credential claim on the homepage (decision needed).** The current title, H1 area and brand tagline assert "ICAEW chartered accountants". This is a prominent, machine- and human-readable professional-credential claim, and it conflicts with the estate credential-risk position (firm not confirmed ICAEW-qualified) and the locked rule "no new credential claims anywhere". The Wave 0 sweep handled the blog JSON-LD; the owner chose to keep the *blog byline*. The **homepage brand claim is a bigger, separate exposure.** Recommendation: drop "ICAEW / chartered" from the homepage title, H1/tagline, description and Organization schema, replacing with accurate descriptors ("accountants for UK small businesses", "fixed-fee", "national"). This is also an SEO win (head keyword reclaims the title slot the credential currently occupies). **Flag to owner before shipping Wave 2** — do not silently keep or silently strip the chartered claim; confirm the brand-copy decision. The same applies to `niche.config.json` tagline/description.
2. **Don't over-promise ranking** from a meta/H1 change at pos ~29; pair with depth + GEO + rewrites.
3. **Keep calculators lazy-loaded** (no CWV regression); SEO content/structure/schema only, no hero redesign.
4. **2026/27 figures only** — no "2025/26" anywhere (ties to the Wave 0 freshness fixes).

## Acceptance criteria
- Title leads with a head token; H1 contains a head keyword (slogan demoted to sub-headline).
- Page grown to ~1,200-1,500 words; FAQs 8-10; FAQPage schema count matches the array.
- Schema set: Organization, AccountingService/LocalBusiness, Service, FAQPage, BreadcrumbList on one `#organization` graph; no fabricated ratings; no ICAEW/chartered claim.
- Conservative link-ups applied to the named catcher pages; location pages untouched.
- `cd generalist/web && npm run build` passes; calculators stay lazy-loaded.
- No em-dashes; 2026/27 figures only.
- Credential decision (Risk 1) confirmed with owner before deploy.
