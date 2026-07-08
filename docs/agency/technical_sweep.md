# Agency Founder Finance — technical + AI-surface sweep, 2026-07-08

Site: https://www.agencyfounderfinance.co.uk  
Deploy audited: live at time of sweep (dpl_AFps7iHZPMpvhtevsSiPqb9x7Vka per page HTML comment)  
Method: 9 audit lanes — llms.txt/llms-full.txt, sitemap source + live, canonicals, redirects, blog SSR depth, schema/JSON-LD, content-quality greps, og-images/favicon, robots.ts vs live. Read-only. Structured artifacts in .cache/agency_diag/technical_sweep.json.

---

## Overall verdict: FIXABLE-GAPS

The site is live, structurally sound, and the conversion path is intact. There are no hard outages, no phantom-domain contamination, no mojibake, no broken canonicals. Four meaningful defects suppress crawlability, knowledge-graph authority, and PageRank consolidation — none blocks conversion today, all are cheap to fix.

---

## Summary table

| ID | Severity | Area | One-line description |
|----|----------|------|----------------------|
| AG-T-001 | **HIGH** | blog-ssr | 306 blog post links are JS-only — 0 SSR'd on /blog index |
| AG-T-002 | **HIGH** | sitemap | 118 of 433 URLs use `new Date()` lastmod — churn on every deploy |
| AG-T-003 | **HIGH** | schema | Organization sameAs missing — no Companies House / LinkedIn link |
| AG-T-004 | **HIGH** | redirects | apex → www is 307 Temporary, not 308 Permanent — leaks PageRank |
| AG-T-005 | MEDIUM | og-images | og:image absent on all 19 agency pages + all 8 calculator pages |
| AG-T-006 | MEDIUM | sitemap | Blog post sitemap lastmod uses publish date, ignores updatedDate (271 posts affected) |
| AG-T-007 | MEDIUM | llms | llms-full.txt not tracked in source control (built artifact, unverified) |
| AG-T-008 | LOW | llms | llms.txt header claims 2025/26 rates; FA 2026 dividend/BADR rates are now 2026/27 |
| AG-T-009 | INFO | canonical | Canonicals clean — self-referencing, www-consistent, no trailing-slash issues |
| AG-T-010 | INFO | robots | robots.ts matches live robots.txt; full AI allowlist; disallow list correct |
| AG-T-011 | LOW | blog-ssr | Blog category pages may share the same BlogListWithSearch JS-only pattern |
| AG-T-012 | INFO | content-quality | Clean: no duplicate titles, no mojibake, no missing metaDescriptions |
| AG-T-013 | INFO | og-images | favicon OK (icon.png), blog og:image OK, home og:image OK |
| AG-T-014 | INFO | llms | llms.txt domain-clean; external citations in llms-full.txt are legitimate |
| AG-T-015 | INFO | sitemap | 433 URLs live (matches expected); 315 of 433 use real pinned dates |

**By severity: HIGH 4 · MEDIUM 3 · LOW 2 · INFO 6**

---

## Findings by area

### 1. llms.txt + llms-full.txt

**PASS with one low flag.**

- `llms.txt` exists in source (`digital-agency/web/public/llms.txt`), live 200 OK, 126 lines. All 100+ URLs use the correct domain `www.agencyfounderfinance.co.uk`. No phantom-domain residue.
- `llms-full.txt` live at `/llms-full.txt` (200 OK, 4.1 MB). External citation URLs (ICAEW, ACCA, EY, Deloitte etc.) are legitimate body references, not wrong-domain contamination.
- `llms-full.txt` is **not tracked in source control** — `digital-agency/web/public/` contains no `llms-full.txt` file. It appears to be a build-time generated asset. Low risk while build is controlled, but unverified if it diverges from source content. **(AG-T-007 MEDIUM)**
- **LOW (AG-T-008):** llms.txt header states "All figures use 2025/26 UK tax rates." The FA 2026 dividend rates (10.75%/35.75%/39.35% from 6 Apr 2026) and BADR rate (14% rising to 18%) are 2026/27 changes that are already referenced inside the file body. The header claim is misleading for an AI verifier. Update to acknowledge 2026/27 figures are included.

### 2. Sitemap

**TWO defects: churn bug + blog lastmod ignores updatedDate.**

**AG-T-002 HIGH — Churn bug.** `sitemap.ts` uses `lastModified: new Date()` for:
- All 49 static paths (homepage, /services, /agencies/*, relocation pages etc.)
- All calculator tool entries (8 tools)
- All category pages
- All location city pages
- All glossary entries
- All founder-stories entries
- All guide entries
- All team entries

Live evidence: 118 of 433 sitemap entries carry `2026-07-06T11:39:30.801Z` (or .802Z) — all identical timestamps from a single deploy. Google will treat every deploy as a fresh update to 118 pages. Fix: pin lastModified to a hardcoded ISO string per group (e.g., `"2026-07-06"` or a real last-edited date).

Blog posts (306) and fundamentals use real `post.date` / `guide.date` values — these 315 are correct.

**AG-T-006 MEDIUM — Blog sitemap ignores updatedDate.** `sitemap.ts` line 118 uses `post.date` for blog lastmod. However, 271 of 306 posts have `updatedDate` frontmatter (e.g., a post published `2026-05-16` but updated `2026-05-17`). The sitemap will always report the older publish date, under-signalling freshness to Google. Fix: `lastModified: post.updatedDate ? new Date(post.updatedDate) : new Date(post.date)`.

**Live sitemap count: 433 URLs** (matches expected). No URL count discrepancy.

### 3. Canonicals

**PASS.** Live probes on four page types:
- Home: `<link rel="canonical" href="https://www.agencyfounderfinance.co.uk"/>` — correct, www, no trailing slash
- Blog post (`/blog/tax-and-compliance/corporation-tax-agency-founders`): canonical self-references full path including category — correct
- Agency page (`/agencies/digital-agencies`): canonical present, self-referencing
- Calculator (`/calculators/salary-dividend-optimiser`): canonical present, self-referencing

No www/apex inconsistency. No trailing-slash mismatch.

### 4. Redirects

**One defect (307 vs 308).**

- `https://agencyfounderfinance.co.uk` → `https://www.agencyfounderfinance.co.uk/` returns **307 Temporary** redirect. **(AG-T-004 HIGH)** Should be 308 Permanent to consolidate PageRank. Fix: change in Vercel project settings (same as medical).
- `http://www.agencyfounderfinance.co.uk` → HTTPS: not directly testable via Invoke-WebRequest but Vercel enforces HTTPS at CDN — assumed correct.
- `https://www.agencyfounderfinance.co.uk/blog/` (trailing slash) → 308 → `/blog` — correct, permanent, strips slash.

### 5. Blog index SSR depth

**HIGH defect — matches the medical pattern exactly.**

`/blog/page.tsx` server-renders:
- 9 category tile `<Link>` elements (Browse by topic grid) — these appear in SSR HTML
- Blog post list entirely inside `<BlogListWithSearch>` which is a `"use client"` component (line 1 of BlogListWithSearch.tsx confirms this)

Live verification: `https://www.agencyfounderfinance.co.uk/blog` HTML contains **12** `href="/blog/..."` links — these are the 9 category tiles plus 3 breadcrumb/nav links. **Zero individual blog post links are server-rendered.** All 306 posts are JS-only.

This is the same crawlability defect as medical (12/73 SSR). Googlebot's first pass sees only category links; posts require JS execution. Fix: server-render the first 12 posts (sorted by date) as static `<a>` links above the `BlogListWithSearch` client component, same approach as the medical fix.

Category pages (AG-T-011 LOW): the pattern is likely the same; `digital-agency/web/src/app/blog/[category]/page.tsx` warrants a targeted check.

### 6. Schema / JSON-LD

**One HIGH gap (sameAs), otherwise good.**

**Home page:** Two JSON-LD blocks:
1. `ProfessionalService` (typed as Organization entity) — includes name, legalName (Ashfield Trading Ltd), url, address, areaServed, knowsAbout. **No `sameAs` array.** (AG-T-003 HIGH)
2. `WebSite` — present.

**Blog post (`corporation-tax-agency-founders`):** Two JSON-LD blocks:
1. `BlogPosting` — includes `datePublished: "2026-05-16"`, `dateModified: "2026-05-17"` (correctly reads `updatedDate` from frontmatter)
2. `BreadcrumbList`

**Agency page (`/agencies/digital-agencies`):** `Service` schema present.

**dateModified is correctly wired** in blog post schema via `post.updatedDate || post.date` in `src/lib/schema/blog-posting.ts`. The 35 posts without `updatedDate` will emit `dateModified = datePublished` — acceptable, not a defect.

**Fix for AG-T-003:** Add to `buildOrganization()` in `src/lib/schema/`:
```
sameAs: [
  "https://find-and-update.company-information.service.gov.uk/company/16358723",
  "https://www.linkedin.com/company/agency-founder-finance"
]
```

### 7. Content-quality greps (306 blog posts)

**CLEAN.**

- **Duplicate metaTitles:** None found
- **Em-dashes in title/metaTitle/metaDescription frontmatter:** None. The 35 files with em-dash characters use them only in body content as range notation (e.g., "£400–£700") — not a policy violation
- **Mojibake (Â£, â€™ etc.):** Zero files
- **Missing metaDescription:** Zero — all 306 posts use `metaDescription:` field (not `description:`)

### 8. OG images + favicon

**Partial — agency and calculator pages missing og:image.**

- **Favicon:** `src/app/icon.png` exists — OK
- **Homepage:** og:image present (`/brand/icon-alt.png`)
- **Blog posts:** og:image present (per-post image, e.g. `/blog/corporation-tax-agency-founders.jpg`)
- **Agency pages (`/agencies/digital-agencies`):** og:image **absent** in live HTML **(AG-T-005 MEDIUM)**
- **Calculator pages (`/calculators/salary-dividend-optimiser`):** og:image **absent** in live HTML **(AG-T-005 MEDIUM)**

Impact: 27 pages (19 agency + 8 calculator) with no social card image. Weakens AI rich-result snippets and unfurl previews.

Fix: add `openGraph: { images: [{ url: siteConfig.publisherLogoUrl }] }` to the metadata export in `src/app/agencies/[slug]/page.tsx` and `src/app/calculators/[slug]/page.tsx` as a fallback, or wire per-page images.

### 9. robots.ts vs live robots.txt

**PASS — source and live match exactly.**

- Source `robots.ts`: wildcard `*` rule + 45 named AI/search bots, all `Allow: /`, four `Disallow` paths: `/thank-you`, `/api/og`, `/api/health-check/submit`, `/api/nurture/`
- Live `robots.txt`: identical content
- Sitemap URL in robots.txt: `https://www.agencyfounderfinance.co.uk/sitemap.xml` — correct

---

## FIX-NOW list (ordered by impact, precise)

1. **Blog SSR (HIGH, AG-T-001).** In `src/app/blog/page.tsx`, server-render the first 12 blog posts as a static grid of `<a>` links before the `<BlogListWithSearch>` section. Pattern: call `getAllPosts().slice(0, 12)` and render as SSR HTML. The full searchable list remains JS-powered below. This gives Googlebot links to all recent posts without breaking the search UX.

2. **Sitemap churn (HIGH, AG-T-002).** In `sitemap.ts`, replace `new Date()` for static/location/glossary/story/guide/team entries with a hardcoded string: `new Date("2026-07-06")`. Add a comment noting this should be bumped on next structural site update.

3. **Apex 307 → 308 (HIGH, AG-T-004).** In Vercel project settings for this domain, ensure the apex redirect rule is Permanent (308). No code change.

4. **sameAs on Organization schema (HIGH, AG-T-003).** In `src/lib/schema/` wherever `buildOrganization` is defined, add `sameAs` array with Companies House URL for 16358723 and LinkedIn.

5. **Blog sitemap lastmod (MEDIUM, AG-T-006).** In `sitemap.ts` line ~118: change `post.date ? new Date(post.date)` to `post.updatedDate ? new Date(post.updatedDate) : post.date ? new Date(post.date) : new Date()`.

6. **og:image on agencies + calculators (MEDIUM, AG-T-005).** Add fallback `openGraph.images` to the two dynamic page metadata exports.
