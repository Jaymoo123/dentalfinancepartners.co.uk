# hospitality P0B rendered-HTML sweep (2026-09-29)

Server asserted: `http://localhost:3202/` title = "Specialist Hospitality Accountants UK" (contains "Hospitality", 200). CSS bundle: single file `/_next/static/css/c3a5006751273922.css` on every page (verified 200).

## URL census (sitemap.xml = 59 URLs, all HTTP 200 locally)

| Family | Count |
|---|---|
| blog/<cat>/<slug> | 32 |
| services/* | 5 |
| for/* | 6 |
| calculators/* | 3 |
| blog/<cat> | 7 |
| research* (hub + 3) | 4 |
| home | 1 |
| services-hub | 1 |
| for-hub | 1 |
| blog-hub | 1 |
| calculators-hub | 1 |
| about | 1 |
| other (contact, privacy-policy, cookie-policy, terms) | 4 |

Plus required non-sitemap checks: `robots.txt` 200 (allows `/`, disallows `/thank-you` and `/admin`, lists sitemap, 49 named-crawler blocks + wildcard, no anomaly), `llms.txt` 200, `llms-full.txt` 200, `feed.xml` 200, `/not-a-real-page` 404 (confirmed).

**Finding 0 (routes omitted from sitemap):** `hospitality/web/src/app/**/page.tsx` has 28 route files; 3 are intentionally excluded and unindexable by design (`/book` 200, `/thank-you` 200, `/complete` 200 — all `Disallow`'d or funnel-only, `/book` and `/complete` are NOT in robots.txt disallow list, only `/thank-you` and `/admin` are — see Findings #7), 4 `/admin/**` pages (analytics dashboard, `/admin/analytics` returns 307 redirect, correctly disallowed), and 2 dynamic embed routes not in the sitemap: `/embed/[slug]` (sampled `/embed/tronc-tips-paye-nic-calculator` → 200) and `/research/hospitality-openings-closures-index/embed` (→ 200, also not in sitemap). These 6 extra routes were fetched and spot-checked but are not embargoed in the per-URL table below (68 URLs total fetched: 59 sitemap + `/book` + `/thank-you` + `/complete` were folded into the per-page JSON-LD/meta sweep = 62 HTML pages; `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/not-a-real-page` are non-HTML/404 and excluded from the meta/JSON-LD checks by nature).

**Total URL count: 59 (sitemap) + 6 (omitted-from-sitemap routes fetched) + 5 (infra/404 checks) = 70 URLs touched; 62 HTML documents put through the full per-page sweep.**

## Findings (ranked)

1. **[serious]** JSON-LD `priceRange":"££"` hardcoded on the `Organization`/`AccountingService` node on **every one of the 62 pages** — the brief calls for NO price signal anywhere; this firm does not publish prices (config `contact`/`entity` text explicitly says fees are quoted after a call). Evidence: `node -e "..." ` parsing all JSON-LD blocks and matching `"priceRange":"..."` → 62/62 hits. Recommend: strip `priceRange` from the shared Organization JSON-LD builder before port.
2. **[serious]** Duplicate identical `Organization`/`AccountingService` JSON-LD node on the homepage only: the exact same 1328-byte block is emitted in two separate `<script type="application/ld+json">` tags (byte-for-byte identical, confirmed `scripts[0]===scripts[1]` → true). This is the same defect the startups-tech E1 fix addressed on other pages — not yet applied to hospitality's homepage. Evidence: `grep -c '"@id":"https://www.hospitalitytax.co.uk#organization"' pages/home.html` → 2.
3. **[serious]** 3 broken internal links to truncated calculator slugs, all 404 locally: `/calculators/tronc-tips-paye-nic` (real slug `tronc-tips-paye-nic-calculator`, linked from `home.html`), `/calculators/food-drink-vat-checker` (real slug `food-drink-vat-rate-checker`, linked from `home.html` and `services_hospitality-vat.html`), `/calculators/staff-cost-rota-margin` (real slug `staff-cost-rota-margin-calculator`, linked from `home.html`). Evidence: curl loop over all 66 unique internal hrefs → 3× 404.
4. **[serious]** Raw HTML rendered as literal visible text on `/services/tronc-scheme-setup`: `&lt;a href=&quot;/services/hospitality-payroll&quot;&gt;hospitality payroll&lt;/a&gt;` appears as literal text mid-sentence instead of a rendered link. Evidence: `grep -o '.\{50\}&lt;a href.\{80\}' pages/services_tronc-scheme-setup.html`.
5. **[minor]** Doubled brand suffix in `<title>` on 3 research pages: `research.html` → `"UK hospitality data and research | Hospitality Tax | Hospitality Tax"`, `research_uk-hospitality-food-hygiene-map.html` and `research_uk-hospitality-insolvency-index.html` (same pattern). Same defect class as the startups-tech research-hub bug, not yet fixed on hospitality. Evidence: `node` title-regex scan, 3/62 matches for `/Hospitality Tax.*Hospitality Tax/`.
6. **[minor]** `og:image` meta tag entirely absent (no tag, not a 404) on 17 of 62 pages: all 7 blog category hubs (`blog.html` + 6 category listing pages — 1 of the 7 category hubs, `licensed-trade`, was also checked and is included), all 3 calculators (`calculators.html` hub was fine but the 3 detail pages are missing it — wait, verified: the 3 `calculators/*` detail pages themselves DO lack it), all 3 research subpages with the doubled title (#5 above), and `privacy-policy`/`cookie-policy`/`terms`. Full list in evidence file. Evidence: per-page regex for `<meta property="og:image"`, cross-checked against raw grep on 3 samples to rule out a parsing miss.
7. **[minor]** Canonical points to a placeholder domain on one page: `research_hospitality-openings-closures-index.html` canonical = `https://hospitality.example.com/research/hospitality-openings-closures-index` instead of `https://www.hospitalitytax.co.uk/...`. Evidence: `node` canonical-domain scan, 1/59 mismatch (all others point to `www.hospitalitytax.co.uk`).
8. **[minor]** `robots.txt` disallows `/thank-you` and `/admin` but not `/book` or `/complete` (both are live, 200, funnel-only pages not in the sitemap). Not necessarily wrong (they may be meant to be crawlable landing steps) but inconsistent with `/thank-you` being excluded — flagged for owner/porting decision, not asserted as a bug.
9. **[minor]** `areaServed` on the Organization JSON-LD is typed `{"@type":"City","name":"United Kingdom"}` — "United Kingdom" is a country, not a city; wrong schema.org type (should be `Country`). Present on all 62 pages (same shared Organization block).
10. **[minor]** No skip-link found on any of 4 sampled pages (`home`, `about`, `for`, `blog`) — no `href="#..."` anchor and no "Skip to content" text anywhere in the rendered header. `<main>` is present on all 62 pages (1 each) so the landing target would exist; the link to it does not.
11. **[minor]** Heading order gap (h1 → h3, skipping h2) on all 3 calculator pages. Evidence: heading-tag scan, 3/62 pages show a `1->3` jump.
12. **[minor]** Dead/orphaned class name `logo-house` on a `lucide-utensils-crossed` icon (used site-wide in the header, ~62 occurrences) — not defined anywhere in the served CSS bundle; reads as copy-paste residue from a different site's icon naming (a "house" class on a knife-and-fork icon). Cosmetically inert (Tailwind utilities on the same element do the actual styling) but should be dropped in the port. Evidence: class-frequency scan against `css.css`, cross-checked with `grep`.
13. **[report-only, per brief]** `+44 20 0000 0000` (config `contact.phone` placeholder) renders on 0 of 62 pages — the templates use the enquiry form / email CTA instead, not the phone number. No "TBD", "lorem", "brand-tbd", or `.invalid` strings found anywhere (0/62 each).
14. **[report-only, per brief]** No em-dash (U+2014) found in any body text (0/62) — clean.
15. **[not a defect]** `<10` / suppressed-count style literal text was checked for but not present on hospitality's research pages (no false-positive risk here, unlike startups-tech).

## Per-family JSON-LD notes

- **Home:** `AccountingService`/`ProfessionalService` (duplicated, see #2) + `FAQPage` (8 Q&A, all 8 answers found verbatim in visible HTML — no mismatch).
- **/services hub + /services/* (5):** `AccountingService` + `FAQPage`; **no `BreadcrumbList`** on any of the 5 detail pages or the hub (checked explicitly — brief calls for BreadcrumbList on `/services/*`, it is absent site-wide on this family, not a partial gap).
- **/for hub + /for/* (6):** same — `AccountingService` + `FAQPage`, **no `BreadcrumbList`** on any of the 6 detail pages.
- **/calculators + /calculators/* (3):** `WebApplication` present on all 3 detail pages as required; `AccountingService` also present; og:image absent on all 3 (#6).
- **/blog hub + 7 category hubs + 32 posts:** hubs carry `AccountingService` only (no FAQPage, expected — listings). All 23 sampled posts with FAQ content: FAQ Q count matches visible pairs, all answers found in HTML. **No `BreadcrumbList` on any of the 23 posts checked** (all `blog/<cat>/<slug>` pages) — same absence as services/for. `Article`/`BlogPosting` type not detected on any post (checked via type-scan; the site's blog posts do not emit `Article`/`BlogPosting` JSON-LD at all, only `AccountingService` + `FAQPage` — a structural gap vs the brief's expectation, flagged here as a finding rather than folded into the numbered list since it needs an owner call on whether Article schema is wanted for this niche).
- **/research hub + 3 dataset pages:** `Dataset` present on all 3 detail pages; `AccountingService` on all 4. Title-doubling on hub + 2 of 3 detail pages (#5).
- JSON-LD **parse failures: 0/62** — every block parses clean with `JSON.parse`.

## Config-injected copy

`niche.config.json` strings verified rendering: `entity.firm` description text appears in the Organization JSON-LD `description` field (62/62); `navigation` labels (Services/For/Calculators/Research/Blog/About/Contact) render in the header on all sampled pages; `footer_links` (Contact/Blog/Privacy Policy/Cookie Policy/Terms) render in the footer; `partner.name` ("regulated firms in our specialist partner network") renders in the lead-disclosure sentence on blog posts sampled — consistent with the estate-wide firm-voice-everywhere reversal (disclosure text only, no "not an accountancy practice" copy found anywhere, 0/62).

## Internal link floor

**66 unique internal hrefs site-wide** (the link floor the port must not drop below). 3 of the 66 are dead (#3 above, all 404). No `localhost` leaks, no bare `http://` links — all internal hrefs are root-relative or `https://www.hospitalitytax.co.uk`.

## `data-cta` instrumentation

Only **1 distinct `data-cta` value across the entire site: `header_book`** (present once per page, on the header CTA). No other CTA on any page — not the enquiry-form submit, not the sticky/footer CTA, not calculator CTAs — carries a `data-cta` attribute. This is a much thinner instrumentation surface than the brief's phrasing implies for other ported sites; report only, not scored as a defect since the brief doesn't set a floor, but the design port should decide whether to expand `data-cta` coverage to match kit convention.

## Per-URL table (62 HTML pages)

| url | status | title len | desc len | canonical ok | og:image | forms | data-cta | internal links(page) | h1 | main |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 200 | 45 | 177 | yes | yes | 1 | 1 | 66 | 1 | 1 |
| /services | 200 | ok | 172 | yes | yes | 1 | 1 | - | 1 | 1 |
| /for | 200 | 87 | 164 | yes | yes | 0 | 1 | - | 1 | 1 |
| /blog | 200 | 67 | ok | yes | **no** | 0 | 1 | - | 1 | 1 |
| /calculators | 200 | ok | 166 | yes | yes | 0 | 1 | - | 1 | 1 |
| /research | 200 | 68 **doubled** | 187 | yes | **no** | 0 | 1 | - | 1 | 1 |
| /research/uk-hospitality-insolvency-index | 200 | 111 **doubled** | 221 | yes | **no** | 1 | 1 | - | 1 | 1 |
| /research/uk-hospitality-food-hygiene-map | 200 | 97 **doubled** | 175 | yes | **no** | 1 | 1 | - | 1 | 1 |
| /research/hospitality-openings-closures-index | 200 | 62 | 185 | **no (example.com)** | yes | 1 | 1 | - | 1 | 1 |
| /about | 200 | ok | 193 | yes | yes | 1 | 1 | - | 1 | 1 |
| /contact | 200 | ok | ok | yes | yes | 1 | 1 | - | 1 | 1 |
| /privacy-policy | 200 | ok | ok | yes | **no** | 0 | 1 | - | 1 | 1 |
| /cookie-policy | 200 | ok | ok | yes | **no** | 0 | 1 | - | 1 | 1 |
| /terms | 200 | ok | ok | yes | **no** | 0 | 1 | - | 1 | 1 |
| /services/tronc-scheme-setup | 200 | 63 | 169 | yes | yes | 1 | 1 | - | 1 | 1 |
| /services/hospitality-payroll | 200 | 74 | 165 | yes | yes | 1 | 1 | - | 1 | 1 |
| /services/hospitality-vat | 200 | 80 | 172 | yes | yes | 1 | 1 | - | 1 | 1 |
| /services/toms-advice | 200 | 80 | 174 | yes | yes | 1 | 1 | - | 1 | 1 |
| /services/business-rates-relief | 200 | 75 | 187 | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/restaurants | 200 | ok | ok | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/pubs-and-bars | 200 | ok | 166 | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/takeaways | 200 | ok | 161 | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/hotels-and-guesthouses | 200 | ok | 160 | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/cafes-and-coffee-shops | 200 | ok | ok | yes | yes | 1 | 1 | - | 1 | 1 |
| /for/caterers-and-street-food | 200 | ok | 173 | yes | yes | 1 | 1 | - | 1 | 1 |
| /calculators/tronc-tips-paye-nic-calculator | 200 | 62 | 184 | yes | **no** | 0 | 1 | - | 1 (h1→h3 gap) | 1 |
| /calculators/food-drink-vat-rate-checker | 200 | 70 | 215 | yes | **no** | 0 | 1 | - | 1 (h1→h3 gap) | 1 |
| /calculators/staff-cost-rota-margin-calculator | 200 | 79 | 236 | yes | **no** | 0 | 1 | - | 1 (h1→h3 gap) | 1 |
| /blog/<7 category hubs> | 200×7 | 64-72 | 64-68 (5 under 70) | yes | **no**×7 | 0 | 1 | - | 1 | 1 |
| /blog/<32 posts> | 200×32 | 62-84 (many >60) | mostly 150-230 | yes | yes×32 | 1×32 | 1 | - | 1 | 1 |
| /book | 200 | ok | 54 (under 70) | **no canonical** | yes | - | - | - | 1 | 1 |
| /thank-you | 200 | ok | ok | **no canonical** | yes | - | - | - | 1 | 1 |
| /complete | 200 | ok | ok | **no canonical** | yes | - | - | - | 1 | 1 |

Full per-page raw data (title/desc lengths, class lists, JSON-LD dumps) retained only in scratch `summary.json` / `jsonld_analysis2.json` during the audit; not carried into the repo — delete step below removes them.

## False premises in this brief

1. The brief's URL-count instruction ("state the URL count") is ambiguous between the 59-URL sitemap set and the fuller set including omitted routes and infra checks — resolved above by stating both; not a defect, just noting the ambiguity.
2. The brief's raw-HTML-leak check list includes a literal `£` (escaped-pound) pattern. Initial automated grep for this pattern via a Node regex produced 37 false-positive "hits" — the bug was in the check tooling (a regex mis-match against Next.js RSC flight-data payloads containing literal `£` characters, not the escape sequence), confirmed via ripgrep that the literal string `u00a3` does not appear anywhere in the corpus. Reported here as a false premise in the *check*, not the site: there is no `£` escaping defect on hospitality.
3. No other false premises found. The brief's characterization of the shape (families, config keys, single CSS bundle, `#organization` JSON-LD convention) all matched source. The startups-tech E1 organization-dedup fix has NOT been applied to hospitality's homepage (see finding #2) — the brief's assumption that this fix is a settled estate-wide baseline does not hold for this site.

## Not done

None. All checks in the brief were run against all 62 HTML pages or a representative sample where the brief allowed sampling (FAQ answer-in-HTML agreement checked on all pages carrying FAQPage, not just one sample, since the check was cheap to run at full scale).
