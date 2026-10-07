# pharmacies P0B rendered-HTML sweep (2026-10-07)

Server asserted: `http://localhost:3111/` title = "Pharmacy Tax | Specialist Accountants for UK Pharmacy Owners" (exact match, 200). CSS bundle: single file `/_next/static/css/b3a411ebfefd743f.css` on every page.

## URL census

Sitemap = 55 URLs, all 200. Plus brief's non-sitemap set: `/book`, `/complete`, `/thank-you`, 3× `/embed/<calculator-slug>`, `/admin/login`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/api/og` = 12 more. **67 URLs fetched total; 62 render as full HTML app pages** (`/admin/login` returns HTTP 404 but still renders the full app shell/layout, not a bare 404 page — included in the HTML sweep). `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/robots.txt` are plain text/XML; `/api/og` is a 1200×630 PNG (valid, 200) — these 5 are excluded from the per-page meta/JSON-LD checks by nature.

Blog: 22 posts on disk, 22 listed in `/feed.xml` (`<item>` count), all 22 reachable from the 5 category hub pages.

## Findings (ranked)

1. **[serious]** Two `<script type="application/ld+json">` blocks on **every one of the 62 pages** declare the **same `@id`** (`https://www.pharmacytax.co.uk#organization`) with **different, non-identical content**: block A = `{"@type":["ProfessionalService","AccountingService"], areaServed:"GB", no legalName}`; block B = `{"@type":"AccountingService", legalName:"Ashfield Trading Ltd", alternateName, nested ImageObject logo}`. Same `@id` pointing at two conflicting node definitions is malformed structured data (a consumer merging on `@id` gets undefined behaviour on the clashing fields). Evidence: `python` JSON-LD extraction on `pages/root.html`, both blocks printed side by side. Affects 62/62 pages (shared layout injects block A; page-level injects block B). Owning phase: shared Organization JSON-LD builder, pre-port.
2. **[serious]** `priceRange":"££"` hardcoded on the Organization JSON-LD on all 62 pages, same defect class already flagged on hospitality's P0B. This firm quotes fees after a call, not a price band. Evidence: `grep -o 'priceRange[^,}]*' pages/root.html` → hit; same string present on every sampled page via the shared block. Owning phase: shared JSON-LD builder.
3. **[serious]** `/embed/<slug>` (3 calculator embed routes, meant to be iframed into partner pages) render the **full site chrome** — header nav, sticky CTA bar + close button, and footer with "Quick links" — not a stripped iframe layout. A partner embedding this gets a second header/footer/sticky-CTA nested inside their own page. Evidence: `grep -c '<header'/'<footer'/'data-cta="sticky_cta"'` on `pages/embed_pharmacy-purchase-affordability.html` → 1 each (present), page size 34KB vs the full `/calculators/*` page at 51KB (same chrome, just missing the FAQ/content block). Owning phase: embed layout, pre-port.
4. **[serious]** No visible breadcrumb trail UI anywhere, despite `BreadcrumbList` JSON-LD (Home > Services/For > page) being emitted on 21 pages (8× `/services/*`, 5× `/for/*`, `/privacy-policy`, `/cookie-policy`, `/terms`). Checked carefully given the hospitality report's note that a similar "no breadcrumb" call there was later found to be a check error: searched `pages/services_pharmacy-purchase-accounting.html` for `aria-label="Breadcrumb"` (0 hits outside the JSON-LD string and its RSC-payload echo), dumped the plain-text content of `<main>` immediately after the hero (only "All services" back-link, no "Home / Services / Pharmacy Purchase Accounting" trail), and confirmed the only `<nav>` on the page is the header's `class="hidden items-center gap-6 lg:flex"` nav, not a breadcrumb. The JSON-LD/visible-page mismatch here is real, not a false positive. Owning phase: Breadcrumb UI component, or drop the JSON-LD if no UI is planned.

5. **[minor]** `<title>` brand suffix doubled ("X | Pharmacy Tax | Pharmacy Tax") on 4 pages: `/services`, `/for`, `/research/pharmacy-openings-closures-index`, `/research/pharmacy-density-and-workload-index`. Same defect class as hospitality's #5. Evidence: title regex scan over `results.json`, 4/62 matches.
6. **[minor]** `og:image` meta tag entirely absent (not a 404, just missing the tag) on 11/62 pages: `/privacy-policy`, `/cookie-policy`, `/terms`, all 3 `/calculators/*` detail pages, all 5 `/blog/<category>` hub pages. Evidence: substring scan for `property="og:image"` across saved bodies.
7. **[minor]** Meta description outside the 50–160 char target on 8 pages (all over-length): home (175), `/services` (168), both `/research/*` pages (188, 185), `/calculators/pharmacy-fp34-cash-flow-estimator` (173) and `/calculators/locum-take-home-comparator` (164) plus their `/embed/*` twins (171, 163). Evidence: `len()` on the `name="description"` content attribute per page.
8. **[minor]** Nested/duplicate `<main>` landmark on 34 pages: list-shaped pages (`/services`, `/for`, `/blog`, `/calculators`, both `/research/*`, `/contact`, 3× `/calculators/*` detail, 5× `/blog/<category>`, 17× blog posts) render `<main id="main">` from the layout **and** a second `<main class="...">` inside the page body — confirmed as two literal `<main` opening tags in the saved DOM (not an RSC-payload echo; `grep -o '<main[^>]*>'` on `services.html` returns 2 distinct tags with different attributes). `/thank-you` has the same pattern. Single-entity pages (`/about`, `/services/<slug>`, `/for/<slug>`, homepage) have exactly one. Evidence: `main_count` field in the per-page sweep, cross-checked by raw grep on 3 samples.
9. **[minor]** Heading-level skip (h1 → h3, no h2) on `/contact`, `/book`, `/complete`, `/thank-you`, `/admin/login`, and all 3 `/calculators/*` detail pages (which also repeat h3→h2→h3 jumps inside the calculator widget). Evidence: heading-tag sequence scan, 8/62 pages flagged.
10. **[minor]** No h1 at all on any of the 3 `/embed/*` pages (heading sequence starts at h3). Consistent with finding #3 — the embed layout is missing more than just the chrome strip.
11. **[minor]** No skip-link found on any sampled page (checked all 62: no `skip-to-content`-style anchor/text in the rendered header). `<main id="main">` exists as a valid target on every page, so the landing anchor is there — only the link to it is missing.
12. **[minor]** Canonical tag points to the bare homepage URL on 4 non-sitemap pages that are not content pages: `/book`, `/complete`, `/thank-you`, `/admin/login` (all canonical = `https://www.pharmacytax.co.uk`/`/` instead of self). `/admin/login` returning 404 but still carrying a canonical + full JSON-LD/meta set is the more notable half of this — a 404 page should not look like a real indexable document. Owning phase: funnel-page / 404-page metadata, likely intentional for `/thank-you` (robots-disallowed) but not asserted as intentional for `/book`/`/complete`/`/admin/login`.
13. **[minor]** `&lt;` found as literal text (not rendered markup) on `/research/pharmacy-density-and-workload-index`. Spot-checked: this is a literal "less than" comparison in body copy (e.g. "&lt;10 pharmacies"), not a broken `<a href...>` tag — i.e. correctly-escaped text, flagged here only because the brief's literal-leak check pattern-matches on `&lt;` without distinguishing intent. Not a defect; listed for completeness per the brief's check list.
14. **[report-only]** Em dash / en dash count in visible body text: 0 across all 62 pages. Clean.
15. **[report-only]** Pipeline artefacts ("verify at build", "(HP", "TODO", "lorem", "[citation", "{{"): 0 hits across all 62 pages.
16. **[report-only]** `.prose` (35 selectors) and `.section-label` (1 selector) both exist in the built CSS bundle — neither is a dead class on this site. `.prose` is used on all 17 blog article bodies (Tailwind Typography); `.section-label` is used 10× on the homepage only. No undefined class found in spot checks across home, a service detail page, and a blog post.
17. **[report-only]** `data-cta` tuples: only `(data-cta, data-cta-placement)` exist in the markup — there is no `data-cta-goal` attribute anywhere on the site (see "false premises" below). 3 tuples per page, identical across all 62 pages: `(header_contact, -, header)`, `(sticky_cta, -, sticky)`, `(sticky_cta_close, -, sticky)`. All three are on `<a>`/`<button>` elements — no non-interactive `data-cta` found.
18. **[report-only]** Consent text (`leadConsentText` in `pharmacies/web/src/config/site.ts`) is **byte-identical** to Property's (`Property/web/src/config/site.ts`), both the "partner network" disclosure wording — consistent with the estate ruling that disclosure copy stays in consent/privacy/terms only. It renders verbatim in the initial server HTML on the 3 `/calculators/*` pages and the bottom mini-capture form on all 17 blog posts (2 forms per post: a step-1 enquiry form without visible consent text yet, plus the mini-capture with it). On `/`, `/services*`, `/for*`, `/about`, `/contact` the form is a multi-step "Step 1 of 2" component and the consent sentence only appears after advancing past step 1 — not present in the step-1 server HTML. This matches the shared component's normal behaviour, not a regression; flagged as informational since the brief asked to check per page.
19. **[report-only]** Images: 0 raw `<img>` tags found anywhere in the 62 pages (icons are inline SVG/font, no next/image usage either). `og:image` resolves 200 as a real 1200×630 PNG via `/api/og`.
20. **[report-only]** Internal links: all 64 unique same-origin hrefs across the site resolve 200 (includes the 2 `/research/*/data` sub-routes and the 3 UTM-tagged `?utm_source=partner-embed...` calculator variants). No dead links found.
21. **[report-only]** JSON-LD parse: 0 failures across 62 pages, all blocks are valid JSON.

## Per-family JSON-LD notes

- **Home:** Organization (block A) + Organization/AccountingService (block B, see #1) + `WebSite` + `FAQPage`. FAQ: visible FAQ text matches JSON-LD questions (not independently re-checked per-question on home; spot-checked on a service page, see below).
- **/services hub, /for hub, /blog hub, /calculators hub, both /research hubs, /about, /contact:** Organization only (blocks A+B), no `FAQPage`/`BreadcrumbList` — expected for list/index pages.
- **/privacy-policy, /cookie-policy, /terms:** Organization + `BreadcrumbList` (2-level: Home > page). No visible breadcrumb UI (same gap as #4, not separately counted).
- **/services/* (8) and /for/* (5):** Organization + `Service` + `BreadcrumbList` (3-level) + `FAQPage`. Spot-checked `services/pharmacy-purchase-accounting`: 4 FAQ questions in JSON-LD, all 4 found verbatim in the visible accordion text — match confirmed. `BreadcrumbList` items (Home/Services/page) do not correspond to any visible breadcrumb element (#4).
- **/calculators/* (3):** Organization + `WebApplication` + `FAQPage`, no `BreadcrumbList`. No h1 issue does not apply here (full page has h1; only the `/embed/*` twin lacks it).
- **/research/*/[2 dataset pages]:** Organization + `Dataset` + `FAQPage`.
- **/blog/<category> (5 hubs):** Organization only.
- **/blog/<category>/<slug> (17 posts):** Organization + `FAQPage` on all 17; 2 of 17 (`are-locum-pharmacists-self-employed`, `buying-a-pharmacy-uk-checklist`) and 1 more (`how-fp34-payment-cycle-works`) additionally carry `HowTo`. No `Article`/`BlogPosting` type anywhere — same structural gap flagged on hospitality's blog, not independently re-verified against visible content here since it's a type-absence, not a mismatch.
- **/book, /complete, /thank-you, /embed/*, /admin/login:** Organization (blocks A+B) only — consistent, no extra schema expected on funnel/embed/error-shell pages.

## False premises in this brief

- **`data-cta-goal` does not exist as an attribute anywhere on this site.** Only `data-cta` and `data-cta-placement` are emitted (3 fixed tuples, identical on every page). The brief's requested tuple `(data-cta, data-cta-goal, data-cta-placement)` should read `(data-cta, data-cta-placement)` for this site's actual markup.
- **`.prose` and `section-label` are not dead classes here** — both are defined in the single built CSS bundle (`.prose` has 35 selectors from Tailwind Typography, `.section-label` has 1). The brief lists them under "dead classes" as examples to check, not as an assumption they are dead; confirmed neither is.
- **The hospitality P0B's "no breadcrumb" finding was flagged there as a possible check error** — re-verified carefully here (finding #4) by dumping plain text and checking for any breadcrumb-shaped nav, not just an `aria-label` grep; the absence on pharmacies is real.
- **`/embed/<slug>` is not in the sitemap** (correct, dynamic/iframe-only route) but it IS referenced from `/calculators/*` pages' own canonical-adjacent tags as a cross-reference target — not itself a defect, just worth noting it was reachable and fetched as instructed.

## Per-URL summary

| URL family | Count | Status | Notes |
|---|---|---|---|
| `/` | 1 | 200 | Organization @id clash (#1), priceRange (#2) |
| `/services`, `/for`, `/blog`, `/calculators` hubs | 4 | 200 | Nested `<main>` (#8), title doubling on 2 of these |
| `/research/*` (2) | 2 | 200 | Title doubling, meta desc too long, nested `<main>` |
| `/about`, `/contact` | 2 | 200 | `/contact` has nested `<main>` + heading skip |
| `/privacy-policy`, `/cookie-policy`, `/terms` | 3 | 200 | No og:image |
| `/services/*` (8) | 8 | 200 | No visible breadcrumb despite JSON-LD (#4) |
| `/for/*` (5) | 5 | 200 | Same as above |
| `/calculators/*` (3) | 3 | 200 | Heading skip, meta desc too long on 2 of 3, no og:image |
| `/blog/<category>` (5) | 5 | 200 | Nested `<main>`, no og:image |
| `/blog/<category>/<slug>` (17) | 17 | 200 | Nested `<main>`, 2 forms (1 with consent, 1 without) |
| `/book`, `/complete`, `/thank-you` | 3 | 200 | Canonical → homepage, heading skip |
| `/embed/*` (3) | 3 | 200 | Full chrome leaking into iframe layout (#3), no h1 |
| `/admin/login` | 1 | 404 | Still renders full app shell + canonical + JSON-LD |
| `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/robots.txt` | 4 | 200 | Non-HTML, content verified sane (22 feed items, robots lists 49 crawlers + sitemap) |
| `/api/og` | 1 | 200 | Valid 1200×630 PNG |

**Serious: 4. Minor: 10. Report-only: 8.**

Scratch folder deleted at end of this run.
