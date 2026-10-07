# DONE_E: the owner's rule, made executable (Property)

Read-only audit, 2026-10-07. Live site checked with a normal browser UA. Google
state checked with the URL Inspection API. Supabase read-only.

**Headline.** The sitemap itself is clean: all 888 URLs return 200, no chains, no
loops, no 404s. The rule is being broken in four places instead: the hand-written
`public/llms.txt` (4 redirected URLs), `feed.xml` and `llms-full.txt` (3 noindexed
pages listed), `monitored_pages` (19 stale rows), and the gap between the repo and
production (the 30 Sep copy revert is still undeployed, so live commercial pages
carry wording the repo already removed).

---

## PART 1, the dependency map

Everything below knows about a Property page URL, title, link or schema.

| # | Artefact | Path | What it knows | Derived or hand-kept |
|---|---|---|---|---|
| 1 | Sitemap | `Property/web/src/app/sitemap.ts` | 29 hard-coded static paths (L10-36), then derived: `siteConfig.locations` (L69), `allTools()` (L80), `audiences` (L88), `getAllCategories()` (L96), `getAllPosts().filter(!noindex)` (L45, L107). `lastModified` only where a real date exists (`/blog`, category indexes, posts); omitted elsewhere by design. hreflang per URL is self-referential `en-GB` + `x-default` (L38). Excluded: `/book`, `/thank-you`, `/complete`, `/for-letting-agents` is present but `/book` is deliberately out (owner ruling 09-30). | HYBRID. The 29 static paths are hand-kept. |
| 2 | Middleware | `Property/web/src/middleware.ts` | `BLOG_TO_LOCATION` 5 city posts to `/locations/<slug>` (L8-14). `SLUG_TO_CATEGORY_MAP` 372 flat slugs to nested (L16-408). `DUPLICATE_REDIRECTS` 116 keys incl. the 5 cities (L410-538). Flat handler: `/blog/<slug>` checks DUPLICATE first, then SLUG_TO_CATEGORY (L582-593). Nested handler: `/blog/*/<slug>` matches on SLUG ONLY, so a slug key redirects from any category (L604-617). `/blog/category/<x>` to `/blog/<x>` (L597). Host: bare apex 308s to `www.propertytaxpartners.co.uk`, apex only, previews untouched (L574-580). `CATEGORY_HUB_SLUGS` (L543-554) plus a dev-only `throw` guard (L556-565) stops a hub slug being keyed as an article and shadowed into a permanent 301. Matcher is site-wide minus `_next` (L623-627). | HAND-KEPT. 389 distinct legacy slugs. |
| 3 | Robots | `Property/web/src/app/robots.ts` | One `disallow: ["/thank-you"]` repeated for `*` plus ~60 named bots; sitemap pointer. No per-page knowledge beyond `/thank-you`. | Derived from one list. |
| 4 | llms.txt | `Property/web/public/llms.txt` (146 lines, 85 distinct URLs) | A hand-curated index: services, cornerstone guides, calculators, locations, city blog posts. Every URL carries `utm_source=chatgpt&utm_medium=llms`. Carries a hard-coded "Facts current as at 2026-09-27". | **FULLY HAND-KEPT. The highest-risk artefact in the repo.** |
| 5 | llms-full.txt | `Property/web/src/app/llms-full.txt/route.ts` + `packages/web-shared/content/llmsFull.ts` | Reads **every** `.md` in `Property/web/content/blog` (`readMarkdownDir`, llmsFull.ts L62-64). URL built as `/blog/<slugifyCategory(category)>/<slug>`. 806 URLs live. **No noindex filter, no redirect awareness.** Header repeats the 2026-09-27 date. | Derived from the filesystem, unfiltered. |
| 6 | feed.xml | `Property/web/src/app/feed.xml/route.ts` | `getAllPosts()` with **no noindex filter** (L23). Honours `post.canonical` if set, else `/blog/<cat>/<slug>`. 806 items. | Derived, unfiltered. |
| 7 | Organization schema | `Property/web/src/lib/organization-schema.ts` to `packages/web-shared/schema/organization.ts` | `knowsAbout` = the 15 `/for/[slug]` page titles (L9) plus 8 fixed topics. `sameAs` = Companies House filing + 4 sister-brand homepages (L14-19). `description` = `niche.entity.firm`. `@type` AccountingService. No `@id` to a page that can move. | Derived from `audiences` + niche config. |
| 8 | City LocalBusiness | `Property/web/src/app/locations/[slug]/page.tsx` L21 (`buildCityLocalBusinessJsonLd`), used L822 | Per-city AccountingService node. Driven by the slug and `siteConfig.locations`. | Derived. |
| 9 | Service schema | `packages/web-shared/schema/service.ts` (`buildService`); callers: `for/[slug]/page.tsx` L47, `page.tsx` L154-169, `making-tax-digital-landlords/page.tsx` L497, `services/landlord-accountant/page.tsx` L286 | Service name + `hasOfferCatalog` offer labels, hand-written per page. A retired offer named here is a stale schema node. | HAND-KEPT per page. |
| 10 | Breadcrumb + BlogPosting + FAQ | `Property/web/src/lib/schema.ts` | Breadcrumbs from the rendered `BreadcrumbItem[]`; BlogPosting falls back when the `.md` has no `schema` frontmatter; OG image URL built as `/api/og?title=&category=`. | Derived from frontmatter. |
| 11 | Header nav | `Property/niche.config.json` L46-139, read via `config/niche-loader.ts` to `config/site.ts` (`nav`), assembled in `lib/nav.ts` with `calculatorNavGroups()` | 5 top items, ~17 child hrefs, all commercial. | HAND-KEPT in JSON. |
| 12 | Footer | TWO sources. `Property/niche.config.json` `footer_links` L140-152 (legal only) and `Property/web/src/components/layout/SiteFooter.tsx` L38-46 (calculators, About, Contact, `/locations`, `/contact#book`) | Footer link lists. | HAND-KEPT in two places. |
| 13 | Locations list | `Property/niche.config.json` `locations` L154-176 (slug + title, 5 cities) | Feeds `/locations/<slug>` generation, the sitemap loop, the city schema. | HAND-KEPT. |
| 14 | Location href resolver | `Property/web/src/lib/locations.ts` (8 lines) | Single source of truth: `locationHref(slug) = /locations/<slug>`. Exists so no generator links at a 301. | Derived. |
| 15 | Audience data | `Property/web/src/data/audiences.ts` (15 rows) | slug, title, metaTitle, metaDescription, stats, FAQs. Feeds `/for/[slug]`, the sitemap and Organization `knowsAbout`. | HAND-KEPT. |
| 16 | Calculator registry | `Property/web/src/lib/calculators/registry.ts` (`allTools()`), nav at `lib/calculators/nav.ts` | Every `/calculators/<slug>` plus the nav panel. | HAND-KEPT. |
| 17 | Homepage + landing links | `Property/web/src/app/page.tsx`, `components/property/LocationChips.tsx` L34, `LocationMap.tsx` L111, `services/landlord-accountant/page.tsx` L709 | Inline commercial hrefs. | HAND-KEPT, scattered. |
| 18 | `monitored_pages` (prod Supabase) | Writers: `scripts/register_monitored_batch.py`, `scripts/insert_monitored_pages.py`, `scripts/populate_monitored_pages.py`. Reader: `optimisation_engine/analysis/detectors.py`. Registered automatically at step 5b of `scripts/deploy-and-index.ps1` when `-QaBatch` is passed. | `slug`, `page_url`, `rewrite_type`, `redirect_target`, Google + Bing baselines, `monitor_until`. 639 property rows. | HAND/batch-kept. Nothing reconciles it against middleware. |
| 19 | IndexNow | `optimisation_engine/indexing/submit_indexnow.py`, host + key in `indexing/config.py` L49-50. Queue file `.indexnow_queue_property.txt` (gitignored). Drained at step 6 of `scripts/deploy-and-index.ps1`. | A URL list. `--enqueue` adds, `--from-queue` drains, `--from-sitemap` submits everything. | Queue, owner-triggered. |
| 20 | Frozen pages | `docs/_engines/property_frozen_pages.md` | 10 top click-drivers + 11 conversion surfaces + 1 component-level sign-off. The meta analysis script hard-fails if the file is missing or empty. **Nothing here may be edited without a per-page `signoff:` line.** | HAND-KEPT. |
| 21 | Commercial baseline | `scripts/property_commercial_baseline.py` | GSC site totals (empty-dimension aggregate only), Bing `GetRankAndTrafficStats`, per-page via `GetPageStats`, leads, keywords. Writes one JSON so a 28-day read is a diff. | Derived at run time. |
| 22 | Pre-deploy gate | `scripts/predeploy_gate.py` | Hard-gates on: internal `/blog` link 404s (via `track2_link_audit.py`), QA verdicts; warns on em-dashes and pricing. | Tooling. |
| 23 | Link auditor | `scripts/track2_link_audit.py` | HARD = 404, SOFT = resolves via a 301 hop. Encodes `dynamicParams=false`, so a right slug under a wrong category 404s. **Scans only `Property/web/content/blog/*.md`.** | Tooling, with a scope gap (see below). |
| 24 | Console reports keyed on URL | `web_events.page_path`; `gsc_page_performance`; consumers `scripts/meta_property_ledger.py`, `scripts/state_check.py`, `scripts/analyze_gsc_property.py`, `scripts/property_honest_scorecard.sql` | A URL change splits a page's history in two across these. It does not break a build, it breaks the trend line. | Prod data. |
| 25 | OG image | `Property/web/src/app/api/og/route.tsx` (dynamic, takes `title` + `category`) and `Property/web/src/app/opengraph-image.png` (static, root) | A changed title changes the generated card. | Derived. |
| 26 | Bing | No direct Bing URL-submission script exists for Property. Bing is reached only via IndexNow (#19) and read via `bing_query_client`. | | |

**Not a dependency, to stop the sweep flagging them.** `/book` is out of the
sitemap deliberately (owner ruling 09-30). `/thank-you` and `/complete` are out
of the sitemap and `/thank-you` is robots-disallowed, by design. `/resources`
404s because `public/resources/` is an asset directory, not a route, and nothing
links to it.

---

## PART 1b, DEFINITION OF DONE

### (a) Change an existing commercial page's title, H1, copy or schema

| Artefact | Path | Must be true | Verify |
|---|---|---|---|
| Frozen check | `docs/_engines/property_frozen_pages.md` | The URL is absent, or carries a `signoff:` line that covers this exact change | `grep "<url>" docs/_engines/property_frozen_pages.md` |
| Page renders | the route file | Build passes, new copy visible in the server HTML, not only the client bundle | `npm run build`, then `curl -s localhost:3000<path> \| grep "<new text>"` |
| Title echoes | `metadata` export on the page | metaTitle and the H1 agree; no other page now duplicates the title | `grep -rn "<old title>" Property/web/src Property/web/content` returns nothing |
| Schema | the page's `buildService` / JSON-LD block | Offer labels and Service name match the new copy; no offer named that no longer exists | `node -e` parse of the `application/ld+json` block, or paste into validator.schema.org |
| Organization `knowsAbout` | `Property/web/src/lib/organization-schema.ts` | If a `/for/*` title changed, `knowsAbout` follows automatically; confirm it did | `curl -s localhost:3000/ \| grep knowsAbout` |
| llms.txt | `Property/web/public/llms.txt` | The page's one-line description still matches the page; the `Facts current as at` date moved if facts moved | hand read; `grep "<path>" Property/web/public/llms.txt` |
| OG card | `/api/og` | Renders with the new title | `curl -o /tmp/og.png "localhost:3000/api/og?title=<new>"` and open it |
| Sitemap `lastModified` | `sitemap.ts` | A blog post edit bumped `dateModified` in frontmatter; a static page carries no lastmod by design, so nothing to do | `grep dateModified <file>.md` |
| Internal links | repo-wide | No link text still describes the old offer | `python scripts/track2_link_audit.py` plus a manual `grep` of `src/**/*.tsx` |
| Gate | | Pre-deploy gate green | `python scripts/predeploy_gate.py` |
| IndexNow | queue | URL enqueued, not yet submitted | `python -m optimisation_engine.indexing.submit_indexnow --site property --enqueue <url>` |
| `monitored_pages` | prod | Owner-triggered. A copy or title rewrite is a `rewrite` row with a fresh baseline | `python scripts/register_monitored_batch.py --slugs <slug>` (dry-run first) |

### (b) Add a new commercial page

| Artefact | Path | Must be true | Verify |
|---|---|---|---|
| Route exists | `Property/web/src/app/<path>/page.tsx` or a `.md` under `content/blog` | 200 with a real H1 and metadata | `curl -o /dev/null -w "%{http_code}" localhost:3000<path>` |
| Sitemap | `sitemap.ts` | A static page needs a line added to `staticPaths` (L10-36). A blog post, calculator, `/for/*`, location or category needs **nothing**, it is derived | `curl -s localhost:3000/sitemap.xml \| grep "<path>"` |
| Nav | `Property/niche.config.json` `navigation` | Reachable in two clicks from the homepage, or deliberately not, and the decision recorded | `curl -s localhost:3000/ \| grep 'href="<path>"'` |
| Footer | `SiteFooter.tsx` **and** `niche.config.json` `footer_links` | Both checked; they are separate lists | `grep -n "<path>" Property/web/src/components/layout/SiteFooter.tsx Property/niche.config.json` |
| Internal links in | existing pages | At least one contextual link from an indexed page. A page only in the sitemap is what left `/locations` unknown to Google | `grep -rn 'href="<path>"' Property/web/src Property/web/content` |
| llms.txt | `public/llms.txt` | Listed under the right heading, with the `utm_source=chatgpt&utm_medium=llms` suffix | `grep "<path>" Property/web/public/llms.txt` |
| llms-full / feed | derived | Blog posts appear automatically. **If `noindex: true`, it must NOT, and today it does. See Part 2.** | `curl -s localhost:3000/feed.xml \| grep "<slug>"` |
| Schema | the page | Breadcrumb + the right primary type; `/for/*` gets `buildService` + `buildFaqPage` | validator.schema.org on the rendered block |
| `/for/*` only | `src/data/audiences.ts` | Row added, which also extends Organization `knowsAbout` | `curl -s localhost:3000/ \| grep "<title>"` |
| Calculator only | `lib/calculators/registry.ts` + `nav.ts` | In the registry, so sitemap and nav panel both pick it up | `curl -s localhost:3000/sitemap.xml \| grep calculators/<slug>` |
| Location only | `niche.config.json` `locations` | Slug + title added; never hard-code the href, use `locationHref()` | `curl -o /dev/null -w "%{http_code}" localhost:3000/locations/<slug>` |
| Hub collision | `middleware.ts` `CATEGORY_HUB_SLUGS` | A new category hub is added to that array, or the dev guard will not protect it | `NODE_ENV=development npm run dev` starts without the guard throwing |
| Gate | | Green | `python scripts/predeploy_gate.py` |
| IndexNow | queue | Enqueued | `--enqueue <url>` |
| `monitored_pages` | prod | Owner-triggered `net_new` row | `register_monitored_batch.py --slugs <slug>` |

### (c) Redirect or retire a commercial page

| Artefact | Path | Must be true | Verify |
|---|---|---|---|
| Redirect rule | `middleware.ts` | Key added to `DUPLICATE_REDIRECTS` (nested + flat both covered by one key) or `SLUG_TO_CATEGORY_MAP` for a recategorisation. Target is a 200, never another key | `python` check: target's last slug segment is not itself a key |
| No chain, no loop | | `curl -IL` ends in exactly one 301 then a 200 | `curl -sIL -A "<browser UA>" <old url> \| grep -E "HTTP/|location:"` |
| Googlebot parity | | Same 301, same target, for `Googlebot` UA | repeat the above with `-A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"` |
| Source file gone | `content/blog/<slug>.md` | Deleted, or the route 200s and shadows the redirect | `ls Property/web/content/blog/<slug>.md` must fail |
| Hub not shadowed | `CATEGORY_HUB_SLUGS` | The new key is not a hub slug. The dev guard enforces this | `npm run dev` does not throw |
| Sitemap | `sitemap.ts` | Static path line removed; derived entries drop out with the source. **Zero redirected URLs in the sitemap** | `curl -s <site>/sitemap.xml \| grep -c "<old>"` is 0 |
| llms.txt | `public/llms.txt` | Entry removed or repointed at the target | `grep "<old slug>" Property/web/public/llms.txt` is empty |
| feed + llms-full | derived | Drop out once the `.md` is deleted | `curl -s <site>/feed.xml \| grep -c "<old slug>"` is 0 |
| Internal links | repo-wide | Every link repointed at the target, not left on the 301 | `python scripts/track2_link_audit.py` reports 0 HARD and 0 SOFT, **plus** `grep -rn "<old slug>" Property/web/src` |
| Schema | target page | No `@id`, `sameAs`, `itemOffered` or `knowsAbout` entry naming the retired page or offer | `grep -rn "<old slug>" Property/web/src/**/page.tsx` |
| `monitored_pages` | prod | New `redirect` row with `redirect_target` = the final 200, and **any existing row for the old URL updated**, not left pointing at the old target | `select * from monitored_pages where slug='<old slug>'` |
| IndexNow | queue | Submit the **target**, not the retired URL | `--enqueue <target url>` |
| Google | | Re-inspect the old URL after deploy; expect "Page with redirect" | `python gsc_inspect_urls.py urls.txt out.csv` |
| Frozen list | `property_frozen_pages.md` | If the retired URL was listed, the entry is removed or moved to the target | `grep "<old url>" docs/_engines/property_frozen_pages.md` |

---

## PART 2, what is stale right now

### Verified clean, so the sweep does not chase them

- **Sitemap: 888 URLs, all 200.** Fetched live, swept with a browser UA. No 301s, no 404s, no redirected URL listed. The live sitemap matches `tools/sitemap.txt` exactly.
- **No redirect chains or loops.** All 116 `DUPLICATE_REDIRECTS` targets were checked: none is itself a redirect key, and none lands in a category that `SLUG_TO_CATEGORY_MAP` would then move again.
- **No shadowed redirects.** None of the 116 keys still has a `.md` file (810 files checked), so no redirect is overridden by a live route.
- **hreflang is safe.** Every sitemap entry's `alternates` is self-referential (`en-GB` + `x-default` = the same URL), so no alternate can point at a redirect.
- **The 389 legacy flat `/blog/<slug>` URLs all 301 cleanly and are not an indexation problem.** A 12-URL random inspection: 8 unknown to Google, 2 "Crawled, currently not indexed", 1 "Page with redirect", 0 indexed.
- **The internal link auditor passes:** 0 HARD 404s, 1 SOFT 301-hop.

### Violations

**V1. `llms.txt` lists four URLs that 301.** `Property/web/public/llms.txt` links the London, Manchester, Birmingham and Bristol **blog** posts. All four 301 to `/locations/<city>`. Verified live, e.g.

```
301 -> /locations/bristol   <= /blog/property-accountant-services/bristol-property-accountant
```

This is the single hand-kept artefact that the 2026-08-05 city consolidation never reached.

**V2. Google still holds two of those redirected city posts as indexed.** URL Inspection, today:

| URL | Coverage | Google canonical | Last crawl |
|---|---|---|---|
| `/blog/property-accountant-services/london-property-accountant` | Submitted and indexed | itself | 2026-07-31 |
| `/blog/property-accountant-services/bristol-property-accountant` | Submitted and indexed | itself | 2026-07-25 |

They 301 live. Google has not re-crawled them in over two months, and V1 is still feeding them to AI crawlers.

**V3. `/blog/property-accountant-services` hub: Google holds it as a redirect.** Coverage "Page with redirect", Google canonical `.../what-does-a-property-accountant-do`, last crawled 2026-05-29. The hub renders 200 live and is in the sitemap. Confirmed as the owner described. The middleware no longer redirects it (it is in `CATEGORY_HUB_SLUGS` and keyed nowhere), so the only fix left is a re-crawl.

**V4. `/locations` is unknown to Google.** Coverage "URL is unknown to Google", no crawl date, despite being in the sitemap since L34 of `sitemap.ts` and linked from `SiteFooter.tsx` L45, `LocationChips.tsx` L34 and `LocationMap.tsx` L111. The live homepage HTML does carry 2 `href="/locations"` links, so this is not a rendering failure, it is a crawl-budget starvation.

**V5. Three noindexed pages are listed in `feed.xml` and `llms-full.txt`.** `feed.xml/route.ts` L23 calls `getAllPosts()` with no noindex filter, and `llmsFull.ts` reads every `.md` unfiltered. Both carry 806 entries while the sitemap correctly carries 803 posts. The three:

- `property-accountant-jobs-uk`
- `property-accountant-salary-complete-guide`
- `how-to-become-property-accountant` (Google already reports "Excluded by noindex tag")

**V6. Middleware 301s point into noindexed pages.** `DUPLICATE_REDIRECTS` sends 7 legacy slugs (e.g. `property-accountant-job-description`, `property-accountant-jobs`, `property-accountant-salary-london`, `how-much-do-property-accountants-make`) into `property-accountant-jobs-uk` / `property-accountant-salary-complete-guide`, both `noindex: true`. Verified live: `/blog/property-accountant-job-description` 301s to a noindexed page. The three noindexed pages only link to each other inside the corpus, so nothing else leaks, but the redirects do.

**V7. Two internal links still point at a legacy flat URL.** Both resolve via a 301 rather than directly:

- `Property/web/content/blog/cheltenham-property-accountant-landlord-tax-services.md` to `/blog/buy-to-let-limited-company-complete-guide-uk`
- `Property/web/content/blog/director-living-in-property-owned-by-limited-company.md` to `/blog/principal-private-residence-relief-landlords`

**V8. Nineteen stale `monitored_pages` rows.** Four have a wrong redirect target, fifteen are being monitored at a URL that now 301s.

Wrong target:

| slug | row `redirect_target` | reality |
|---|---|---|
| `property-specialist-accountant-london` | `/blog/property-accountant-services/london-property-accountant` | middleware now sends it to `/locations/london`; the row's target itself 301s |
| `best-property-accountant-london` | same | same |
| `property-accountant-services` | `/blog/.../what-does-a-property-accountant-do` | **no middleware rule exists any more; the URL is a live 200 hub.** The row still types it `redirect`, `status=active` |
| `mtd-10000-threshold-when-does-it-apply` | `/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions` | middleware now sends it to `mtd-itsa-major-tax-reform-context-policy-history` |

Fifteen rows typed `rewrite` or `net_new`, still `active`/`flagged`, whose `page_url` 301s, so the monitor is watching a URL that no longer serves the page: the 5 city blog posts, `section-24-mortgage-interest-restriction-uk-landlords`, `landlord-insurance-tax-deductible-what-can-you-claim`, `accountant-bookkeeping-services`, `limited-company-vs-personal-ownership-tax-comparison-2026`, `mortgage-interest-tax-relief-changes-landlords`, `property-accountant-job-description`, `property-accountant-london-expert-services`, `property-accountant-services-expert-solutions`, `property-tax-accountant-birmingham`, `property-tax-accountant-london`. Three more rows (`property-accountant-jobs-uk`, `property-accountant-salary-complete-guide`, `how-to-become-property-accountant`) monitor noindexed pages, which can never recover a Google baseline.

Also minor: two duplicate homepage rows (`slug='homepage'` and `slug='__home'`, both `page_url='/'`, both `flagged`), and one row keyed on an absolute URL (`landlord-expenses-allowable-uk-2026`) while every other row uses a path. Nothing reconciles this table against `middleware.ts`.

**V9. Retired-offer copy: the live site is behind the repo, not the other way round.** The 30 Sep revert exists in the repo as commit `535843985` ("revert(estate): 'free first call, then a fixed fee in writing' back to 'free consultation' on every lead surface") but is **not deployed**. Live HTML today:

- `https://www.propertytaxpartners.co.uk/services` renders "We will come back within 24 hours with where the money is leaking and **a fixed fee in writing** if you want us to fix it."
- `https://www.propertytaxpartners.co.uk/services/property-accountant` renders it twice.
- A repo-wide grep for `fixed fee in writing` across `Property/` and `packages/` returns **nothing**, confirming the repo is already correct and only production is stale.

**V10. `free first call` survives in the repo, in the assistant openers.** `Property/web/src/lib/assistant/opener.ts` L70, L77, L110 still say "free first call". The 30 Sep revert reached the page copy but not this file. These strings are served by the on-site assistant rather than in page HTML, which is why a rendered-HTML sweep missed them.

**V11. `site_flags.calc_pdf_offer.enabled` is still `true` in prod.** Verified:

```
calc_pdf_offer  {'link': 'https://buy.stripe.com/aFaeVe...', 'enabled': True, 'price_gbp': 29, 'started_at': '2026-09-14T16:15:36Z'}
```

The offer block was removed on 28 Sep. The flag is read by `Property/web/src/app/api/calc/pdf-offer/route.ts` via `PDF_FLAG_KEY` in `lib/calculators/premium/pdfRequest.ts`, so the API still reports the offer as live. No visible leak found: the three premium calculator routes named in the frozen list (`/calculators/section-24-premium`, `capital-gains-premium`, `incorporation-premium`) all **404** on production, and no commercial page I fetched contains "pdf" or "£29".

**V12. The frozen-pages list is itself stale.** `docs/_engines/property_frozen_pages.md` carries a component-level sign-off for "PremiumCalculator (capital-gains-premium, incorporation-premium, section-24-premium) | paid PDF offer block ... flag-gated via site_flags.calc_pdf_offer | signoff: owner 2026-09-14". The offer is retired and all three routes 404. The entry guards something that no longer exists.

**V13. Scope gaps in the tooling that is supposed to enforce the rule.**

- `scripts/track2_link_audit.py` scans only `Property/web/content/blog/*.md` (L292). It never sees `src/**/*.tsx` commercial pages, `public/llms.txt`, `niche.config.json` nav, or `SiteFooter.tsx`. V1 and the nav hrefs are invisible to it, and so to `predeploy_gate.py`, which delegates to it.
- Its own docstring (L12-19) still describes `LOCATION_TO_BLOG`, the pre-08-05 direction, while the identifier no longer exists in the file. The comment is wrong about which way the city redirects run.
- `DeepScrollModal` is still mounted in `Property/web/src/app/layout.tsx` L145. Disabled on 26 Sep, so the gating now lives somewhere other than the mount; the component is not removed.

---

## PART 3, the verification kit

Run in this order after any commercial-page change. Local-first: nothing here deploys.

**1. Build.** `cd Property/web && npm run build`. Catches a `staticPaths` entry for a route that does not exist, and a `/blog/<cat>/<slug>` pair that `dynamicParams=false` will 404.

**2. Hub-shadow guard.** `npm run dev` once. The dev-only `throw` at `middleware.ts` L556-565 fires if a category hub slug has been keyed as an article slug.

**3. Link sweep.** `python scripts/track2_link_audit.py`. Expect `HARD 404 ISSUES: 0` and `SOFT: 0`. Today's baseline is 0 HARD / 1 SOFT. **Then cover its blind spot by hand**, because no tool does: `grep -rnE 'href="/(blog|services|locations|for|calculators)' Property/web/src Property/web/public/llms.txt Property/niche.config.json` and check each against the middleware maps.

**4. Sitemap diff.** `curl -s localhost:3000/sitemap.xml | grep -o '<loc>[^<]*' | sed 's|<loc>||' | sort > new.txt`, diff against the live sitemap. Every added line must be a 200, every removed line must be an intended retirement.

**5. Redirect chains.** For every URL you touched:

```
curl -sIL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126" <url> | grep -E "^HTTP/|^location:"
```

Pass = exactly one `301` then one `200`. Repeat with `-A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"` and confirm an identical chain. Then re-run the programmatic chain check used for this audit: no `DUPLICATE_REDIRECTS` target's final slug segment may itself be a key.

**6. Feed and llms parity.** `curl -s localhost:3000/feed.xml | grep -c "<item>"` and `curl -s localhost:3000/llms-full.txt | grep -c "^URL: "` must equal the blog-post count in the sitemap. They are 806 / 806 against 803 today, and that 3 is V5.

**7. Schema validation.** No local validator is installed in this repo. The honest options are: `node -e "JSON.parse(...)"` over each `application/ld+json` block to prove it parses, then paste into `validator.schema.org` by hand, or run the vitest suite that already exercises the shared builders, `npx vitest run packages/web-shared/schema/schema.test.ts`. **There is no repo script that validates a rendered page's JSON-LD. Do not claim one.**

**8. Pre-deploy gate.** `python scripts/predeploy_gate.py`. Hard-gates on link 404s and QA verdicts. With `--strict` it also hard-gates em-dashes and pricing. Note its link check inherits the blind spot in step 3.

**9. Inspection re-sweep, after deploy only.** Put every touched URL plus every URL that 301s to one into a file and run `python <scratchpad>/tools/gsc_inspect_urls.py urls.txt out.csv`. Expect a changed page to stay "Submitted and indexed" with `googleCanonical` = itself; expect a retired page to read "Page with redirect". A retired URL still reading "Submitted and indexed" after 2 weeks is the rule broken.

**10. IndexNow, owner-triggered.** `python -m optimisation_engine.indexing.submit_indexnow --site property --enqueue <url>` during the change; drain only as part of an owner-asked deploy, which `scripts/deploy-and-index.ps1` does at step 6. Never `--from-sitemap`. There is no separate Bing submission path: IndexNow is it.

**11. `monitored_pages`, owner-triggered.** Register the batch, never a bare `INSERT`: `python scripts/register_monitored_batch.py --batch <name>` dry-run, then `--commit`. A changed page gets a `rewrite` row; a new page a `net_new` row; a retired page a `redirect` row whose `redirect_target` is the final 200. **The missing piece: nothing reconciles existing rows when a redirect target later moves, which is V8. A reconciliation query is the gap, and no such tool exists today.**

---

## Could not verify

- **Whether the live production build is behind the repo by one commit or by the whole ~120-commit local backlog.** V9 proves `/services` predates `535843985`. I did not establish the deployed commit SHA; that needs a Vercel deployment read, which is outside read-only scope here.
- **Whether `/locations` has ever been submitted to IndexNow.** The queue file `.indexnow_queue_property.txt` is gitignored and not present in the working tree.
- **Whether the `/blog/property-accountant-services` hub appears in a sitemap Google has fetched since 22 Aug.** Inspection says "Submitted", but the submitting sitemap and its fetch date are not exposed by the API.
- **Whether the three noindexed pages are listed on the live `/blog/property-accountant-services` category index.** I checked the corpus `.md` links and the middleware, not the rendered hub listing.
- **Whether the assistant openers in V10 are actually reachable by a visitor.** The strings exist in `lib/assistant/opener.ts`; I did not drive the widget to see one rendered.
- **An authoritative count of redirected Property URLs Google still holds as indexed.** I inspected 27 URLs. A full sweep of all 389 legacy slugs plus the 116 duplicate keys was not run; at the sampled rate most are unknown to Google, but that is an estimate, not a count.
- **The exact number of em-dashes or other house-style breaches on live commercial pages.** Out of scope here and `predeploy_gate.py` covers it.
