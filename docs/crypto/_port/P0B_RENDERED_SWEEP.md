# P0-B — crypto rendered-HTML claims and integrity sweep

Date: 2026-09-14. Read-only. Source of truth: server HTML fetched from
`http://localhost:3171`, identity re-asserted before every quote below
(`<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>`).

**58 URLs swept** (51 in the sitemap + `/book`, `/complete`, `/thank-you`,
+ 4 `/embed/<slug>`). All 58 returned HTTP 200 with 0 redirects, so no empty-grep
redirect trap applies here. Saved pages:
`…\scratchpad\p0b\pages\*.html` (58 files); stylesheet `…\scratchpad\p0b\css_07d9ad03298607c6.css`.

**Counting method, stated per finding.** Page findings are **per-page presence**
(`grep -l` / Python `in` over the saved file, one vote per file, max 58) — never
`grep -c`, which double-counts the RSC flight payload. Stylesheet findings are
`grep -o … | wc -l` on the one-line built CSS.

Headline: **6 serious, 4 minor.** JSON-LD parses on 58/58 pages (0 failures, 0
`[object Object]`). Zero em-dashes and zero en-dashes in rendered body text.
No testimonial, star rating, client count, PI-insurance or regulator claim
anywhere. Crawlability is clean. The damage is concentrated in three places:
FAQ schema with no on-page counterpart, FAQ answers rendering as raw markup,
and two indexable hubs canonicalised to the homepage.

---

## Findings

### R1 — SERIOUS — 132 FAQ pairs asserted to crawlers that appear nowhere on the page

**URLs:** all 19 blog posts (19 of 58).

**Published verbatim (example, `/blog/crypto-cgt-and-disposals/how-crypto-is-taxed-uk`):**
JSON-LD `FAQPage` carries 7 pairs including
`"Do I pay tax just for holding crypto?"` →
`"No. Tax arises only when you dispose of crypto (sell, swap, …"`.
Neither the question nor the answer occurs in the page's visible text.

**Why it is a defect.** This is the exact class the last port caught: content
asserted to Google that a human visitor can never see. Google's FAQ policy
requires the Q&A to be visible on the page; the rich result is at risk and the
page is publishing an answer nobody has reviewed in situ. Cause is structural,
not per-post: `crypto/web/src/app/blog/[category]/[slug]/page.tsx:65` emits the
`FAQPage` block from `post.faqs`, and the template renders **no** FAQ section.

**Deriving command** (per-page presence, whitespace-insensitive containment,
`<script>` stripped from the body before reading text):
`python …\scratchpad\p0b\jsonld.py` — reports
`FAQ pairs total 222 on 35 pages / questions not in body text: 132 / answers not in body text: 149`.

**Severity:** serious. **Proposed verdict:** render the FAQ block in the blog
post template (the `<details>` pattern already used on `/services/[slug]`), or
drop the `FAQPage` emission. Do not leave the schema unpaired.

---

### R2 — SERIOUS — FAQ answers on all 5 service pages render literal HTML markup as visible text

**URLs:** `/services/crypto-cgt-planning`, `/services/crypto-self-assessment`,
`/services/hmrc-disclosure`, `/services/investor-vs-trader-status`,
`/services/koinly-recap-reconciliation` (5 of 58).

**Published verbatim** (what a visitor reads on
`/services/crypto-cgt-planning`):

```
<a href="https://www.gov.uk/capital-gains-tax/allowances">CGT annual exempt
amount is £3,000 per person for 2026/27</a>. It is a use-it-or-lose-it
allowance: …
```

The angle brackets and `href=` are on screen. `crypto/web/src/app/services/[slug]/page.tsx:84`
renders `{faq.answer}` as a React text child, so a string containing HTML is
escaped rather than parsed. Nine of nine answers on that page are affected.

**Why it is a defect.** Visible, published gibberish on five indexable
money pages, plus the intended gov.uk citations are dead (they are text, not
links) — so the pages lose the authority signal they were written for. This is
the same defect the charities port fixed on 2026-09-12
(`922d1105 fix(charities): review gaps — unrendered FAQ answers …`); it was
never swept for on crypto.

**Deriving command** (per-page presence; escaped-tag count is `grep -o … | wc -l`
on a multi-line HTML file, so it counts occurrences within the page, not pages):

```
for f in services__*.html; do echo "$f $(grep -o '&lt;/\?[a-z]\+&gt;' $f | wc -l)"; done
# crypto-cgt-planning 17 | crypto-self-assessment 21 | hmrc-disclosure 17
# investor-vs-trader-status 22 | koinly-recap-reconciliation 15
```

`/for/*` and the homepage return 0 — the defect is confined to the services
template.

**Severity:** serious. **Proposed verdict:** fix at the template
(`dangerouslySetInnerHTML` on a sanitised answer, matching whatever the `/for`
template does), not per-answer.

---

### R3 — SERIOUS — two indexable hubs canonicalise to the homepage

**URLs:** `/services` and `/for` (2 of 58) — both are in the sitemap, both carry
no `robots` meta, so both are indexable.

**Published verbatim:**
`<link rel="canonical" href="https://www.cryptotaxpartners.co.uk"/>` on
`/services` and on `/for`.

**Why it is a defect.** Identical to the sibling-site incident: a root-layout
`alternates: { canonical: siteUrl }` is inherited by every route that does not
override it, and it tells Google the hub is a duplicate of the homepage. The
two hubs are the only entry points that link the 5 service pages and the 6 `/for`
pages; de-indexing them costs the whole sub-tree its hub signal. Every other
indexable route overrides correctly (`/blog`, all 6 categories, all 19 posts,
`/calculators`, all 4 calculators, all 5 services, all 6 `/for` children,
`/about`, `/contact`, `/research/crypto-tax-gap-index`, the three policy pages).

`/book`, `/complete`, `/thank-you` inherit the same homepage canonical but are
`noindex, nofollow`, so they are harmless. The 4 `/embed/<slug>` pages point at
`/calculators/<slug>` — a **deliberate point-away and not a defect**.

**Deriving command:**

```
for f in *.html; do echo "$f -> $(grep -o 'rel="canonical" href="[^"]*"' $f | head -1)"; done
```

**Severity:** serious. **Proposed verdict:** add an explicit canonical to the
`/services` and `/for` page metadata.

---

### R4 — SERIOUS — a turnaround promise, injected from config, on 32 of 58 URLs

**URLs:** 32 of 58 — 19 blog posts, 6 `/for` pages, 5 service pages, `/contact`,
`/blog`.

**Published verbatim** (visible body text, two variants):

- `"Tell us about your situation and we will come back within 24 hours."`
  — from `crypto/niche.config.json` → `blog.cta_body`; 19 of 58 URLs.
- `"… and we will reply within 24 hours."` — 13 of 58 URLs.

**Why it is a defect.** It is a service-delivery promise the business has not
committed to and cannot be held to, published on the majority of the estate.
It is also the config-injection class this package exists to catch: the blog
variant is in no page's source, it is one JSON string fanned out to 19 URLs.

Related, and worth noting as the inverse: `cta.sticky_secondary` =
`"Free, no-obligation reply within 24 hours"` appears on **0 of 58** URLs, so
that config key is dead copy (see R9).

**Deriving command** (per-page presence over `<script>`-stripped body text):

```
python …\scratchpad\p0b\text.py
# 'come back within 24 hours' 19/58 ; 'reply within 24 hours' 13/58 ; 'within 24 hours' 32/58
```

**Severity:** serious. **Proposed verdict:** owner decision on wording. The
lazy fix is one edit to `niche.config.json` + the `/for` and services CTA
strings; drop the time commitment or soften to "we read every enquiry".

---

### R5 — SERIOUS — an "accountants" claim published to crawlers on all 58 URLs that appears on no page

**URLs:** 58 of 58.

**Published verbatim**, in `<meta name="description">` (homepage) and in the
`AccountingService` JSON-LD `description` on **every** URL including the four
`noindex` embeds:

> "Specialist UK tax accountants for crypto investors, traders and businesses.
> CGT and s104 pooling, staking and mining income, DeFi, HMRC disclosure and
> nudge letters, and Self Assessment filing."

Source: `crypto/niche.config.json` → `description`. Body-text presence of that
string: **0 of 58**.

**Why it is a defect.** Crypto is a lead-gen handoff site (memory:
"Five niche sites = lead-gen handoffs"; `partner.name` = *"regulated firms in
our specialist partner network"*), and the JSON-LD additionally declares
`"@type": ["ProfessionalService","AccountingService"]` on all 58 URLs. The
string asserts to every crawler that we *are* the accountants doing the filing.
It is a qualification/regulated-work claim under P0-A's rules, and it reaches
crawlers on every URL while appearing on no page — the precise pattern a
repo-source grep of page files cannot see.

The visible footer tagline is the softer, defensible form and is on all 58:
`"UK cryptoasset tax specialists: CGT on disposals, staking and mining income,
DeFi, HMRC nudge letters and disclosure, and Self Assessment"` (from
`niche.config.json` → `tagline`).

**Deriving command:** per-page presence of the description string in the file
(58/58) vs in `<script>`-stripped body text (0/58) —
`python …\scratchpad\p0b\` inline check in this package's transcript.

**Severity:** serious. **Proposed verdict:** cross-check against P0-A's ruling
on the same string; align the meta/JSON-LD description with the tagline's
"specialists, partner network" framing, and decide `AccountingService` vs plain
`Organization` in the same pass.

---

### R6 — SERIOUS — duplicate conflicting Organization node with the same `@id` on the homepage

**URLs:** `/` (1 of 58).

**Published verbatim:** two separate `ld+json` blocks, both
`"@id": "https://www.cryptotaxpartners.co.uk#organization"`, both
`"@type": ["ProfessionalService","AccountingService"]`. One carries only
`name/url/description/logo/areaServed: "GB"`; the other carries `legalName`,
`address`, `areaServed: ["United Kingdom"]`, `priceRange`, `knowsAbout`,
`sameAs`. They disagree on `areaServed`.

**Why it is a defect.** Two nodes claiming the same `@id` with conflicting
property values; a consumer takes whichever it parses last. The thin one is
emitted by the layout on all 58 URLs, the rich one by the homepage, and they
collide only on `/`.

**Deriving command:** duplicate-`@id` detector in this package —
`pages with duplicate @id: 1 → ('__home.html', '…#organization', 2)`.

**Severity:** serious (correctness), low blast radius (one URL).
**Proposed verdict:** merge into one node, or give the page-level node a
distinct `@id`.

---

### R7 — MINOR — `priceRange: "££"`

**URLs:** `/` only (1 of 58). *(Not 68 nodes as on the last port — this site
emits it once.)*

**Published verbatim:** `"priceRange":"££"` inside the homepage Organization
node.

**Why it is a defect.** An unsubstantiated price signal for our own services on
a site that publishes no prices; it is meaningless to a reader and asserts a
band we have never set.

**Deriving command:** `grep -l priceRange pages/*.html` → 1 file;
`grep -ho 'priceRange[^,}]*' pages/*.html | sort -u` → `priceRange":"££"`.

**Severity:** minor. **Proposed verdict:** delete the property.

---

### R8 — MINOR — `"offers": {"price": "0"}` on the four calculator pages

**URLs:** the 4 `/calculators/<slug>` pages (4 of 58).

**Published verbatim:** `"offers":{"@type":"Offer","price":"0","priceCurrency":"GBP"}`
on a `WebApplication` node.

**Why it is a defect.** A price assertion for a thing we ship. It is defensible
(the calculators genuinely are free) but it is a price claim, so it belongs in
the ledger for an explicit ruling rather than being waved through.

**Deriving command:** `grep -l '"offers"' pages/*.html` → 4 files.

**Severity:** minor. **Proposed verdict:** keep, but record the ruling.

---

### R9 — MINOR — three config CTA / contact keys render on zero URLs

**URLs:** 0 of 58 for each.

| `niche.config.json` key | value | per-page presence |
|---|---|---|
| `cta.sticky_secondary` | `Free, no-obligation reply within 24 hours` | 0/58 |
| `contact.email` | `hello@cryptotaxpartners.co.uk` | 0/58 |
| `contact.phone` | `+44 20 0000 0000` | 0/58 |

**Why it matters.** The phone number is a **placeholder** (`20 0000 0000`) and
the email is not published anywhere. Reaching zero URLs is the good outcome
here — a placeholder phone number rendering would be a serious defect — but the
config is carrying dead and fake values that a later template change would
publish silently. `partner.name` renders on exactly 1 of 58 (`/privacy-policy`),
which is correct and intended.

**Deriving command:** per-page presence, `grep -rlF "<string>" pages/ | wc -l`.

**Severity:** minor. **Proposed verdict:** null the placeholder phone in config,
or set a real one. Do not leave `+44 20 0000 0000` in a file a template can read.

---

### R10 — MINOR — one dead class name, `prose-neutral`

**URLs:** emitted on the blog post pages.

**Result.** 367 distinct class names across all 58 pages; **5** have no selector
in the served stylesheet:

| class | verdict |
|---|---|
| `prose-neutral` | dead — the Tailwind Typography modifier is not installed; the class does nothing |
| `lucide`, `lucide-arrow-right`, `lucide-quote`, `lucide-shield-check` | benign — emitted by `lucide-react` SVGs as identifiers, never styled |

**`.prose` and `.section-label` both ship** — the estate-wide
`packages/site-styles/prose-standard.css` fix of today is live on crypto:

```
grep -o '\.prose[ {,:.]'        css_07d9ad03298607c6.css | wc -l   # 34  (SELECTOR count)
grep -o '\.not-prose[ {,:.]'    …                                  #  4
grep -o '\.prose-blog[ {,:.]'   …                                  #  0  (class not emitted either)
grep -o '\.section-label[ {,:.]'…                                  #  1
```

**Counting note, and the trap this package nearly fell into.** A naive
`re.escape` selector probe reported **165** dead classes, including
`sm:py-4`, `bg-[#0e1a3a]`, `mt-0.5`. That was a **false positive**: Tailwind
writes those selectors CSS-escaped (`.sm\:py-4`, `.mt-0\.5`,
`.bg-\[\#0e1a3a\]`), so the probe must allow an optional backslash before every
non-word character. With that fixed the count drops to 5. Anyone re-running
this must use `…\scratchpad\p0b\dead.py`, not a plain grep.

**Severity:** minor. **Proposed verdict:** drop `prose-neutral` from the blog
template when that file is touched; do not open a change for it alone.

---

## Rendered-text banned-claim sweep — result

`<script>` and `<style>` stripped before reading body text; per-page presence.

| class | pages | verdict |
|---|---|---|
| fee/price for our own services | 0/58 | **clean** (two regex hits were `£Y profit` and `swaps per month` inside tax prose) |
| turnaround promise | **32/58** | **R4** |
| qualification claim | 1/58 | `/thank-you`: *"we work closely with Aswatax, a firm of Chartered Tax Advisers"* — attributed to a named third party, not claimed for us. Clean, but flag to P0-A for the ruling on record. |
| regulator / FCA / AML supervision | 0/58 | clean |
| PI insurance | 0/58 | clean |
| testimonial / star rating | 0/58 | clean |
| client count | 0/58 | clean |
| guarantee | 2/58 | all four occurrences are **negations** (*"no deduction is guaranteed"*, *"does not guarantee a particular status"*). Clean. |

**Em-dash / en-dash metric (rendered body text, all 58 URLs):**

- em-dash `—`: **0 pages, 0 occurrences**
- en-dash `–`: **0 pages, 0 occurrences**

---

## Served-URL inventory (58)

| family | URLs | note |
|---|---|---|
| `/` | 1 | |
| `/services` hub + `/services/<slug>` | 1 + 5 | hub canonical = homepage (R3) |
| `/for` hub + `/for/<slug>` | 1 + 6 | hub canonical = homepage (R3) |
| `/blog` + `/blog/<category>` + posts | 1 + 6 + 19 | |
| `/calculators` + `/calculators/<slug>` | 1 + 4 | |
| `/research/crypto-tax-gap-index` | 1 | |
| `/about`, `/contact` | 2 | |
| `/privacy-policy`, `/cookie-policy`, `/terms` | 3 | |
| `/book`, `/complete`, `/thank-you` | 3 | `noindex, nofollow`; not in sitemap. Correct. |
| `/embed/<slug>` | 4 | `noindex, nofollow`, canonical → `/calculators/<slug>`. Deliberate, correct. |
| **total** | **58** | 51 of them in `sitemap.xml` |

All 58 returned `200`, `num_redirects=0`. No route family carries a redirect, so
no empty-grep-on-a-62-byte-body risk arose. `/admin/*` (5 `page.tsx` files) is
excluded: gated, not public, not in the sitemap.

---

## JSON-LD parse result

| metric | result |
|---|---|
| pages with ≥1 `application/ld+json` block | **58 / 58** |
| blocks that fail `json.loads` | **0** |
| blocks containing the literal `[object Object]` | **0** |
| pages with zero JSON-LD | **0** |

Node types by page count (a page may carry several):

| `@type` | pages |
|---|---|
| `["ProfessionalService","AccountingService"]` | 58 |
| `FAQPage` | 35 |
| `WebApplication` | 4 |
| `HowTo` | 3 |
| `WebSite` | 1 |
| `Dataset` | 1 |

- `aggregateRating`: **0 pages**. `review`: **0 pages**. Clean.
- `priceRange`: 1 page (R7). `offers`: 4 pages (R8).
- Locality/address claim: one `PostalAddress` (20 Ashfield Avenue, Shipley,
  Bradford BD18 3AL) on `/` only — the genuine registered office. `areaServed`
  is `"GB"` / `["United Kingdom"]`. No fabricated local presence anywhere.
- crypto declares **`["ProfessionalService","AccountingService"]`**, not plain
  `Organization` — see R5.

### FAQ question/answer presence against the same URL's server HTML

| page group | pages | FAQ pairs | Q absent from page | A absent from page |
|---|---|---|---|---|
| blog posts | 19 | 132 | **132** | **132** (R1) |
| service pages | 5 | 40 | 0 | 22 — present but rendered as escaped markup (R2) |
| `/for` pages | 6 | 34 | 0 | 0 |
| calculators | 4 | 8 | 0 | 0 |
| homepage | 1 | 8 | 0 | 0 |
| **total** | **35** | **222** | **132** | **154** |

---

## Canonical map per route family

| family | canonical | verdict |
|---|---|---|
| `/` | `…co.uk` | correct |
| `/services` | `…co.uk` | **DEFECT (R3)** |
| `/services/<slug>` ×5 | self | correct |
| `/for` | `…co.uk` | **DEFECT (R3)** |
| `/for/<slug>` ×6 | self | correct |
| `/blog` | `…/blog` | correct |
| `/blog/<category>` ×6 | self | correct |
| `/blog/<category>/<slug>` ×19 | self | correct |
| `/calculators` | `…/calculators` | correct |
| `/calculators/<slug>` ×4 | self | correct |
| `/research/crypto-tax-gap-index` | self | correct |
| `/about`, `/contact` | self | correct |
| `/privacy-policy`, `/cookie-policy`, `/terms` | self | correct |
| `/book`, `/complete`, `/thank-you` | `…co.uk` | inherited, but `noindex` — harmless |
| `/embed/<slug>` ×4 | `…/calculators/<slug>` | deliberate point-away — **not** a defect |

---

## Index crawlability

Server-HTML `href` counts vs corpus on disk (`crypto/web/content/blog/*.md` = 19).

| index / hub | article hrefs in server HTML | expected | verdict |
|---|---|---|---|
| `/blog` → posts | 19 | 19 | **complete** |
| `/blog` → categories | 6 | 6 | complete |
| `/blog/crypto-cgt-and-disposals` | 8 | 8 | complete |
| `/blog/hmrc-disclosure-and-compliance` | 4 | 4 | complete |
| `/blog/defi-and-complex-transactions` | 2 | 2 | complete |
| `/blog/crypto-for-business` | 2 | 2 | complete |
| `/blog/staking-mining-and-airdrops` | 2 | 2 | complete |
| `/blog/trader-status-and-day-trading` | 1 | 1 | complete |
| `/services` | 5 | 5 | complete (but R3) |
| `/for` | 6 | 6 | complete (but R3) |
| `/calculators` | 4 | 4 | complete |

Category links sum to 19 = the whole corpus. **No pagination-behind-a-button
trap.** The homepage links 0 blog posts, which is a design choice, not a
crawlability defect — `/blog` is in the nav and in the sitemap.

---

## False premises in the brief

1. **"`find crypto/web/src/app -name 'page.tsx'`"** — there are 25 `page.tsx`
   files, but 5 are under `/admin/analytics/*` (gated, not in the sitemap, not
   public). Route-file count is not a served-URL count; the served set is 58.
2. **"Use `curl -L` on any route family that carries a redirect … a 301 returns
   a ~62-byte body."** No crypto route redirects. All 58 URLs returned 200 with
   `num_redirects=0`. The precaution was taken and cost nothing, but the
   premise it guards against does not hold on this site.
3. **"`priceRange "££"` on 68 nodes."** That was the previous port. Crypto emits
   `priceRange` on exactly **1** of 58 URLs (R7).
4. **"Three posts published the literal string `[object Object]`."** Also the
   previous port. Crypto: **0** occurrences, and all JSON-LD parses on 58/58
   pages. The check was run as specified and passed.
5. **"Derive the stylesheet path from the page HTML"** implies plural
   stylesheets. Crypto serves exactly **one**, `/_next/static/css/07d9ad03298607c6.css`
   (76,705 bytes), linked identically from all 58 pages, with zero inline
   `<style>` blocks.
6. **"e.g. `curl -s <cssurl> | grep -o '\.prose[ {,:]' | wc -l`"** — the given
   character class misses `.prose.`, `.prose>` and `.prose:where(…)` forms and
   would still undercount. More importantly, the same naive-escaping approach
   applied to Tailwind classes produces a **165-item false-positive dead-class
   list** (every `sm:`, `hover:`, `[#hex]` and `0.5` utility), because Tailwind
   CSS-escapes those selectors. The correct probe allows an optional `\` before
   every non-word character; see R10.
7. **"`.prose` and `.section-label` were fixed estate-wide today"** — confirmed
   true on crypto (34 and 1 selector occurrences respectively). Recorded here
   because the brief asked for confirmation, not as a correction.
8. **"A single `alternates: { canonical: siteUrl }` in a root layout … told
   Google five route families were duplicates"** — on crypto the blast radius is
   **two** indexable families (`/services`, `/for`) plus three `noindex` pages,
   not five. The mechanism is identical; the scale is smaller.
9. **The brief frames the config sweep as looking for injected copy that is a
   banned claim.** The larger crypto finding is the inverse as well: three
   config keys — including a **placeholder phone number** — render on zero URLs
   and sit in the file waiting for a template to publish them (R9). Worth adding
   to the standing rule.
