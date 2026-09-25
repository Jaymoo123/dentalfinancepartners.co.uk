# P0B — Rendered-HTML sweep (ecommerce)

Date: 2026-09-25. Source of truth: the running production server at `http://localhost:3191`
(`next start`). Identity asserted before any quote below:

```
$ curl -s http://localhost:3191/ | grep -o '<title>[^<]*</title>'
<title>Ecommerce and marketplace seller accountants UK</title>
```

## Counting method (read this before any number)

- **Rendered HTML is measured as PER-PAGE PRESENCE**, never `grep -c`. Next.js serialises the DOM
  text a second time into the RSC flight payload, so `grep -c` roughly doubles every body-text
  count. Every "N pages" figure below is `grep -l` / count of files where present, out of a
  stated corpus.
- **The built stylesheet is one line**, so `grep -c` is useless there. CSS rule counts use
  `grep -o '<selector>' | wc -l`, and the literal probes use `grep -boF` (no regex) because
  Tailwind CSS-escapes `\`, `[` and `:`.
- **Corpus: 58 URLs fetched** (51 sitemap + `/book` + `/complete` + `/thank-you` + 4 `/embed/*`),
  saved to disk and analysed offline. **114 JSON-LD blocks parsed. 179 FAQ pairs checked.
  59 unique same-origin hrefs resolved.** Every zero below is against one of those stated corpora.

---

## Findings

| File or URL | What renders | Rule breached | Severity | Deriving command and decisive line |
|---|---|---|---|---|
| `/services`, `/for`, `/vat` (3 indexable hub pages) | `<link rel="canonical" href="https://www.ecommercefinance.co.uk"/>` — each hub declares itself a duplicate of the homepage | A canonical must be self-referential unless the page is a deliberate duplicate. Three indexable hubs are handed to Google as the homepage. Root cause: `ecommerce/web/src/app/layout.tsx:54` `canonical: siteUrl`, inherited because `services/page.tsx`, `for/page.tsx` and `vat/page.tsx` set no `alternates.canonical` of their own (every other family does — see `grep -rn canonical ecommerce/web/src/app --include=*.tsx`) | **SERIOUS** | `curl -s http://localhost:3191/services \| grep -o '<link rel="canonical"[^>]*>'` → `<link rel="canonical" href="https://www.ecommercefinance.co.uk"/>` (identical on `/for` and `/vat`; all 58 corpus URLs checked) |
| `/` (homepage) + 5 others → `/calculators/seller-take-home` | Link to a calculator slug that does not exist. Real slug is `/calculators/seller-take-home-calculator` | Internal link must resolve 200. Linked from the homepage, `/research/online-seller-index` and 4 blog posts = 6 pages | **SERIOUS** | resolver over all 59 unique same-origin hrefs → `('/calculators/seller-take-home', 404, ['/', '/blog/bookkeeping-and-inventory/cogs-inventory-basics', ...])` |
| `/blog/business-structure-and-tax/online-seller-formation-trends` and `.../online-seller-survival-odds` → `/blog/sole-trader-vs-ltd-online-sellers`; `.../online-seller-survival-odds` → `/blog/vat-threshold-gross-vs-payout`; `/research/online-seller-index` → `/blog/blog-platform-reporting-rules` | 3 more 404s: blog links written without the `[category]` segment, and one with a doubled `blog/` prefix | Internal link must resolve 200. These are NOT 301s — the resolver followed redirects and still got 404 | **SERIOUS** | same resolver → `NON-200 4`, entries `('/blog/sole-trader-vs-ltd-online-sellers', 404, ...)`, `('/blog/vat-threshold-gross-vs-payout', 404, ...)`, `('/blog/blog-platform-reporting-rules', 404, ...)` |
| `/terms`, `/privacy-policy`, `/cookie-policy` | `class="prose-blog mt-8 space-y-6"` on the legal body — and the built stylesheet contains **zero** `.prose-blog` rules. The three legal pages render with no typography beyond `space-y-6` | Dead class emitted by a live page | **SERIOUS** | `curl -s http://localhost:3191/_next/static/css/93927b945ac87065.css \| grep -o '\.prose-blog[ {,:]' \| wc -l` → `0`; literal probe `grep -boF '.prose-blog' \| wc -l` → `0`. Emitting pages: `grep -lF 'prose-blog' *.html` → 3 of 58 (`_terms`, `_privacy-policy`, `_cookie-policy`). Control: `grep -o '\.prose[ {,:]' \| wc -l` → `34`, so `.prose` IS live and the zero is specific |
| `/about` | "We work on a **fixed-fee** basis and **reply within one working day**." — rendered on a page whose own preceding sentence is "This page is being prepared and will set out our approach in more detail." | Unqualified pricing-model claim and a turnaround promise, published on an admitted placeholder page, and contradicting the 24-hour promise the rest of the site renders | **SERIOUS** | `grep -lF 'fixed-fee' *.html` → 1 of 58 (`_about.html`); visible-text context: `...will set out our approach in more detail. We work on a fixed-fee basis and reply within one working day.` |
| 28 of 58 pages | "...we will come back **within 24 hours**." (14 blog posts, injected from `ecommerce/niche.config.json` → `blog.cta_body`, present in no page source) + the service-hub CTA on 8 `/for/*` and `/services/*` pages + `/contact` `<meta name="description" content="...We reply within 24 hours.">` | Config-injected turnaround promise, invisible to a repo-based claims audit — the sibling-site failure mode exactly. Inconsistent with `/about` ("one working day"). No SLA is evidenced anywhere on the site | **SERIOUS** | `grep -lF 'within 24 hours' *.html \| wc -l` → `28` (per-page presence, corpus 58). Config-string match: `cfg.blog_cta_body: 14/58 pages`; `cfg.sticky_primary ("Speak to an ecommerce tax specialist"): 8/58 pages` |
| 14 blog posts | `class="prose prose-neutral mt-10 max-w-none"` — `.prose` has 34 rules, `.prose-neutral` has **zero** | Dead modifier class. Cosmetic only (base `.prose` still applies), unlike `prose-blog` | Minor | `grep -boF '.prose-neutral' \| wc -l` → `0`; emitting pages `grep -lF 'prose-neutral' *.html \| wc -l` → `14` of 58 |
| `/research`, `/research/online-seller-survival-index` | `<title>Ecommerce and online-retail research \| Ecommerce Finance \| Ecommerce Finance</title>` — brand suffix duplicated | Source sets a plain `title:` string that already contains the suffix, so the root `title.template` appends it again (`research/page.tsx:10`, `research/online-seller-survival-index/page.tsx:28`). The `/for`, `/services`, `/vat` detail pages avoid this with `title: { absolute: ... }` | Minor | scan of `<title>` across 58 pages for `Ecommerce Finance` occurring more than once → 2 hits, both printed above |
| All 58 URLs | No `BreadcrumbList` in any JSON-LD block, on any route family, including 3-deep `/blog/[category]/[slug]` | Breadcrumb markup absent site-wide | Minor | @type set per family from 114 parsed blocks: `blog => ['Article', 'FAQPage', 'HowTo', ['ProfessionalService','AccountingService']]` — no `BreadcrumbList` in any family |
| All 58 URLs | `cta.sticky_secondary` ("Free, no-obligation reply within 24 hours") and `cta.sticky_button` render on **0** pages; the sticky CTA bar is not rendered anywhere | Dead config, not a live claim. Recorded because the string IS a turnaround + "free" claim that goes live the moment the component is wired up | Minor | `cfg.sticky_secondary: 0/58 pages` (corpus 58) |
| `/thank-you` | "...we work closely with Aswatax, a firm of **Chartered Tax Advisers**." | Third-party qualification claim. Consistent with the signed Aswatax referral pack, so evidenced — flagged only so phase 0 has it on the ledger | Minor | `grep -lF 'Chartered' *.html` → 1 of 58 (`_thank-you.html`) |
| `/privacy-policy` | Only page rendering `partner.name` ("regulated firms in our specialist partner network"); also the only page carrying "within 48 hours" (enquiry re-offer window) | Not a defect. Recorded so a later audit does not read the 48h figure as a second, contradictory response SLA — it is a data-sharing term, not a customer promise | Minor | `cfg.partner: 1/58 pages ['/privacy-policy']` |

**Serious count: 5.**

### Checks that came back clean, with the corpus that makes the zero mean something

- **JSON-LD parses.** 114 blocks across 58 pages, `json.loads` after `html.unescape`: **0 parse
  failures**. Literal `[object Object]` occurs on **0 of 58** pages. @type sets: root and the
  `/services`, `/for`, `/vat` hubs = `FAQPage` + `[ProfessionalService, AccountingService]`;
  `/blog/*` adds `Article` and `HowTo`; `/calculators/*` adds `WebApplication` + `FAQPage`;
  `/research/*` adds `Dataset` + `Article`; legal, `/book`, `/complete`, `/thank-you` and
  `/embed/*` carry the organisation node only. No block was found disagreeing with its visible page.
- **FAQ pairs: 179 of 179 present.** Normalising to alphanumerics after entity decode raised 2
  misses, both on `/blog/bookkeeping-and-inventory/cogs-inventory-basics`. Re-checked by eye, both
  are **false**. "How do I value my closing stock?" — the page says "HMRC BIM33115 requires closing
  stock to be valued at the lower of cost and net realisable value (NRV) under accruals
  accounting", the schema reorders the clause. "How do I calculate COGS?" — the page writes the
  formula with a U+2212 MINUS SIGN where the schema uses ASCII `-`. Both answers are on the page.
  **True misses: 0.**
- **Canonical, inverse check.** All 4 `/embed/[slug]` pages point at their `/calculators/<slug>`
  parent, which is correct and must not be "fixed":
  `curl -s http://localhost:3191/embed/vat-threshold-tracker | grep -o '<link rel="canonical"[^>]*>'`
  → `href="https://www.ecommercefinance.co.uk/calculators/vat-threshold-tracker"`.
- **Index crawlability: no truncation anywhere.** Server-HTML child-link counts vs disk corpus —
  `/blog` 14 vs 14 `.md` files in `ecommerce/web/content/blog`; the 6 category hubs 3+2+3+2+2+2 = 14;
  `/services` 4 vs 4 slugs in `src/data/services.ts`; `/for` 4 vs 4 in `for.ts`; `/vat` 5 vs 5 in
  `vat.ts`; `/calculators` 4 vs 4 tool modules in `src/lib/calculators/tools/`; `/research` 2 vs 2
  page directories. No button pagination, no slice.
- **Our own pricing: none rendered.** A regex for a GBP figure attached to per month/year/hour over
  58 pages returned 0 pages. Every pound sign on the site is a tax threshold (£1,000 trading
  allowance, £90,000 VAT, £135 import rule), including in `<title>` and `<meta name="description">`.
- **Noindex hygiene.** `/book`, `/complete` and `/embed/*` are `noindex, nofollow`; `/thank-you` is
  `noindex, follow`. Their homepage canonical is therefore inert and is not counted as a defect.

---

## Check 1 — served-URL inventory, disposition of every difference

`find ecommerce/web/src/app -name page.tsx` → 29 route files.
`curl -s http://localhost:3191/sitemap.xml | grep -o '<loc>...'` → **51 URLs.**
Audit corpus = **58 URLs**: what the server serves, not what the sitemap advertises.

| Route family (from `page.tsx`) | In sitemap? | Served? | Disposition |
|---|---|---|---|
| `/` | yes | 200 | In corpus |
| `/about`, `/contact`, `/terms`, `/privacy-policy`, `/cookie-policy` | yes (5) | 200 | In corpus |
| `/blog`, `/blog/[category]` (6), `/blog/[category]/[slug]` (14) | yes (21) | 200 | In corpus. 14 = the full disk corpus |
| `/services`, `/services/[slug]` (4) | yes (5) | 200 | In corpus |
| `/for`, `/for/[slug]` (4) | yes (5) | 200 | In corpus |
| `/vat`, `/vat/[slug]` (5) | yes (6) | 200 | In corpus |
| `/calculators`, `/calculators/[slug]` (4) | yes (5) | 200 | In corpus |
| `/research`, `/research/online-seller-index`, `/research/online-seller-survival-index` | yes (3) | 200 | In corpus |
| **`/book`** | **NO** | **200, 21,584 bytes** | **Added to corpus.** A sitemap-driven audit misses it. It renders "Book your free review call... A specialist will call you then, no obligation." `noindex,nofollow`; canonical points at the homepage (inert) |
| **`/complete`** | **NO** | **200, 21,654 bytes** | **Added to corpus.** Renders "Add the last detail we need to arrange your free review call." `noindex,nofollow` |
| **`/thank-you`** | **NO** | **200, 27,137 bytes** | **Added to corpus.** Carries the only qualification claim on the site (Aswatax, Chartered Tax Advisers). `noindex,follow` |
| **`/embed/[slug]`** (4: `seller-take-home-calculator`, `side-hustle-tax-checker`, `sole-trader-vs-ltd-sellers`, `vat-threshold-tracker`) | **NO** | **200** | **Added to corpus.** Correctly excluded from the sitemap: `noindex,nofollow` and canonical to the `/calculators/<slug>` parent. Publicly reachable, so fetched and swept like any other page |
| `/admin/analytics`, `/admin/analytics/leads`, `/admin/analytics/login`, `/admin/analytics/trends`, `/admin/analytics/visitor/[visitorId]` (5 `page.tsx`) | no | 307 to login | **EXCLUDED — console, out of scope** for a public-claims sweep. Not publicly rendered content |

**Sitemap URLs with no served counterpart: none.** 51 of 51 sitemap URLs returned 200.
**Served URLs outside the sitemap: 7** (`/book`, `/complete`, `/thank-you`, 4 `/embed/*`), all
swept above. **No slug redirect map exists** — `ecommerce/web/next.config.ts` declares exactly one
redirect, the apex-to-www host rule — so check 8's "listing renders a redirected slug" has no
subject on this site.

---

## False premises in the brief (numbered, as required)

1. **"Check the slugs any redirect map names against what the listings render."** There is no slug
   redirect map. `ecommerce/web/next.config.ts` has a single `redirects()` entry: apex host to
   `https://www.ecommercefinance.co.uk/:path*`, 308. Nothing to cross-check. The 4 dead links found
   are plain 404s, not redirected slugs.
2. **"A sibling index carried 12 of 82 articles... the list sliced behind button pagination."** Not
   reproduced here. Every index and hub renders its full corpus (figures in the clean-checks list).
3. **"A YAML mapping was interpolated and published as the literal `[object Object]`."** Not
   present: 0 of 58 pages, and 114 of 114 JSON-LD blocks parse.
4. **"A naive FAQ check reported 4 false misses."** The same class of false miss occurred here
   (2 of them) and the instruction to re-check by eye was correct: both were false. Real FAQ
   defects: none.
5. **`/embed/[slug]` canonical.** The warning was right, and is recorded here as a *non*-defect:
   all 4 embeds point at their parent and must be left alone.
6. **"The site emits `prose-blog` on the three legal pages."** Correct, verified. Noting only that
   the legal pages emit `prose-blog` *alone* — they do not also carry `prose`, so they inherit
   nothing from the 34 live `.prose` rules either. The dead class is total, not partial.
