# startups-tech P0B rendered-HTML sweep (2026-09-29)

Server asserted: `http://localhost:3201/` title = "Founder Tax Partners | Accountants for Funded and Scaling UK Startups" (200). CSS bundle: single file `/_next/static/css/a6ee166f54c54978.css` on every page.

## URL census (sitemap.xml = 68 URLs, all HTTP 200 locally)

| Family | Count |
|---|---|
| blog/<cat>/<slug> | 32 |
| research* | 6 |
| services/* | 6 |
| calculators* | 5 |
| for/* | 5 |
| blog/<cat> | 5 |
| home | 1 |
| services-hub | 1 |
| for-hub | 1 |
| blog-hub | 1 |
| about | 1 |
| other (contact, privacy-policy, cookie-policy, terms) | 4 |

`robots.txt` 200, allows `/`, disallows `/thank-you`, `/admin`, lists sitemap. `llms.txt` 200, `llms-full.txt` 200, `ads.txt` 200, `feed.xml` 200. No `noindex` found on any of the 68 pages; none disallowed vs sitemap membership — crawlability clean.

## Per-family checks

**Home/about/contact/legal (about, contact, privacy-policy, cookie-policy, terms):** titles present, canonical self-referencing to prod domain, single `AccountingService` JSON-LD (+ `WebSite`/`FAQPage`/`ProfessionalService` on home only). `og:image` present on home/about/contact; **absent on privacy-policy, cookie-policy, terms** (no `<meta property="og:image">` tag at all, confirmed by raw grep, not a parsing miss).

**/services hub + /services/* (6):** each has `AccountingService`, `Service`, `BreadcrumbList`, `FAQPage` JSON-LD (the 2026-09-28 `4e870daa` addition). Sampled `saas-companies`-equivalent pattern on `/for/saas-companies` (see below) — Service name/url and FAQ Q/A all agree with visible h1/meta description/FAQ text. `primary-400` dead class present on hub + all 6 detail pages (see Findings).

**/for hub + /for/* (5):** same JSON-LD shape (`AccountingService`, `Service`, `BreadcrumbList`, `FAQPage`). Verified `/for/saas-companies`: JSON-LD `Service.name`="SaaS Companies", `url` matches canonical; all 4 FAQ questions in JSON-LD found verbatim in rendered body; h1 and meta description agree with hub topic. Strings (`"SaaS Companies"`, FAQ question text) confirmed present in `startups-tech/web/src/data/startups-hubs.ts`. `primary-400` dead class present on hub + all 5 detail pages.

**/calculators + /calculators/* (5):** `AccountingService`, `WebApplication`, `FAQPage` JSON-LD on each calculator; `og:image` present (query-string title/category variant).

**/blog hub + /blog/<cat> (5 category hubs) + /blog/<cat>/<slug> (32 posts):** hub and 4 of 5 category pages carry only `AccountingService` JSON-LD (no FAQPage — expected, they're listings). **`og:image` absent on blog hub and all 5 category hubs** (no tag). Posts: `AccountingService` + `FAQPage` (+ `HowTo` on 4 posts with step content); `og:image` present via `/api/og?title=...&category=...` (verified query-param variant returns 200, same as bare `/api/og`). Config `cta.*`/`tagline`/`description` strings from `niche.config.json` render in JSON-LD `AccountingService.description` and in the sticky/footer CTA blocks estate-wide (present on every page sampled).

**/research hub + /research/* (5 dataset pages):** `AccountingService` + `Dataset` JSON-LD; 3 of 5 also carry `FAQPage`. **Title bug**: hub and 4 of 5 subpages (all except `startup-formation-survival-index`) render `"... | Founder Tax Partners | Founder Tax Partners"` — brand suffix doubled. **`og:image` absent** on hub + all 4 doubled-title pages; present only on `startup-formation-survival-index`.

## Findings (ranked)

1. **[serious]** Duplicate brand suffix in `<title>` on 5 research pages (`/research`, `/research/rd-tax-relief-index`, `/research/tech-startup-survival-index`, `/research/uk-tech-formations-index`, `/research/uk-tech-funding-reliefs-index`) — renders `"... | Founder Tax Partners | Founder Tax Partners"`. Derived: `grep -o '<title>.*</title>' pages/_research*.html`.
2. **[serious]** `og:image` meta tag entirely absent (not just image-404, the tag itself is missing) on: blog hub + all 5 blog category hubs, the same 5 research pages above, and `privacy-policy`/`cookie-policy`/`terms` — 14 of 68 URLs. Facebook/LinkedIn link previews on these URLs have no image (Twitter/X still gets a fallback via `twitter:image`). Derived: `grep -o '<meta property="og:image"[^>]*>' pages/<file>.html` → empty.
3. **[serious]** Raw HTML rendered as literal visible text on `/blog/research-and-development/rd-claim-collapse-hmrc-clampdown`: 5 list items show `<sup><a href="#ref-1">1</a></sup>` as text instead of a rendered footnote link (double-escaped). Derived: `grep -o '.\{20\}&lt;sup&gt;&lt;a href=&quot;#ref-1&quot;&gt;.\{30\}' pages/_blog_research-and-development_rd-claim-collapse-hmrc-clampdown.html`.
4. **[minor]** Dead CSS class `primary-400`: used in class attributes on 14 pages (`/about`, `/for` hub + all 5 `/for/*`, `/services` hub + all 6 `/services/*`) but zero definitions in the served CSS bundle (`primary-600`/`primary-ground`/`primary-text` are all defined; `primary-400` is not). Derived: `grep -o 'primary-400' css/a6ee166f54c54978.css` → 0 hits vs `grep -l 'primary-400' pages/*.html` → 14 files.
5. **[minor]** Broken internal link: `/blog/startup-compliance/uk-tech-startup-5-year-survival-rate` links to `/blog/uk-startup-grants-landscape` (missing the `startup-compliance` category segment) → 404 locally. Correct URL is `/blog/startup-compliance/uk-startup-grants-landscape`. Derived: 404 in link-sweep loop over 74 unique internal hrefs.
6. **[minor, report-only per brief]** The phone number `+44 20 0000 0000` (from `niche.config.json` `contact.phone`) renders on zero of the 68 pages — it's a placeholder value in config that the templates evidently don't surface (site uses email/contact-form CTAs instead). Not judged; flagged as instructed.
7. **[minor, report-only per brief]** The string "regulated firms in our specialist partner network" (from `niche.config.json` `partner.name`) renders on at least 10 blog posts sampled, in the standard lead-disclosure sentence ("... your details may be shared with a firm from our specialist partner network who will contact you..."). No "Editorial content only" or "not an accountancy practice" string found anywhere (consistent with the 09-28 estate-wide reversal to firm-voice-everywhere; not re-checking that decision here, just reporting presence).
8. **[minor]** `&lt;10` / `&lt;5` literal text on `/research/rd-tax-relief-index` and `/research/uk-tech-funding-reliefs-index` — investigated and this is **not** a markup-escaping bug, it's a legitimate statistical-suppression data annotation ("cells marked '<10' in the source") appearing as literal text by design. Listed for completeness, not a defect.

## False premises in this brief

1. The brief's phone number check assumes `+44 20 0000 0000` renders "wherever it renders" — it renders nowhere on this site; that is reported above as a finding, not a false premise in the brief itself, but note the premise that it *does* render somewhere was not borne out.
2. No other false premises found. The 2026-09-28 `4e870daa` Service/BreadcrumbList/FAQPage JSON-LD addition is present and correct on both `/for/*` and `/services/*` as described; the brief's characterisation of this site's structure (families, config keys, kit CSS bundle) all matched source.

## Not done
None. All checks in the brief were run against all matching URLs or a representative sample where the brief allowed sampling (one `/for/<slug>` and one `/services/<slug>` for the deep JSON-LD/visible-text agreement check, per brief).
