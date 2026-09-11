# Dentists site: live defects (Phase 0)

Read-only sweep, 2026-09-11. **Nothing was fixed.** Site: `Dentists/web` (Dental Finance
Partners, `www.dentalfinancepartners.co.uk`). Ground truth: `docs/dentists/house_positions.md`
(513 lines, lock-dated 2026-06-03, extended through Wave 5 2026-07-09).

All line numbers are from the working tree at the time of the sweep. Paths are relative to
`Dentists/web/` unless stated (`../niche.config.json` = `Dentists/niche.config.json`).

Corpus measured on disk, not taken from STATE.md: **235 markdown files** (223 `content/blog`,
6 `content/dental-guides`, 6 `content/resources`), **34 static app routes**, 255 concrete
dynamic routes.

---

## 0. Instrument caveat, established before any search (T6)

**How the pound sign is represented, per data-file family.** Probed before searching, because
the representation differs per site and generalist's was a unicode escape.

| family | probe | result |
|---|---|---|
| `content/blog` (223 .md) | `grep -rl '£' content/blog \| wc -l` | **186 files, literal `£` (U+00A3)** |
| `content/dental-guides` (6) | same | **6 files, literal** |
| `content/resources` (6) | same | **5 files, literal** |
| `src/lib` (tool configs, compute, FAQ) | same | **37 files, literal** |
| `src/app`, `src/components` | same | **9 + 6 files, literal** |
| `Dentists/niche.config.json` | same | **literal** (3 lines, all in the dormant `packages` CTA variant) |
| `src/data/*.json` + `.csv` (5 research datasets) | python byte scan for `\xc2\xa3` and `u00a3` | **0 hits: bare numbers only.** Money is formatted at render time by `fmtGBP`/`fmtGBPChange` in `src/app/research/nhs-dentist-earnings-index/page.tsx:15-16`. **A `£` grep cannot see research-page money at all.** |

Negative probes, all run: `grep -rl '£'` (JSON escape form) -> **0 files**;
`grep -rl '&pound;'` -> **0 files**. One ASCII outlier: `GBP 1m` / `GBP 1,000,000` written out
in `content/blog/how-much-of-dental-practice-price-is-goodwill.md:33,87,95` — renders as the
literal string "GBP 1m" to a visitor, inconsistent with every other page.

**Conclusion: on Dentists the pound sign is the literal character everywhere it is stored as
text; the research data layer stores no pound sign at all.** A literal `£` grep is sound for
`content/` and `src/`, and is blind to `src/data/`.

**A second instrument lie, recorded so the next agent does not repeat it.** My first pass read
`niche.config.json` with `python -c "json.load(open(...))"`. On Windows `open()` defaults to
cp1252, so the file's real UTF-8 em-dashes came back as `â€"` and its `£` as `Â£`. **This
looked exactly like live mojibake in the config and it is not.** A byte-level check
(`b.count(b'\xc3\xa2')` = 0, `b'\xc3\x82'` = 0) proved the file is clean UTF-8. Always pass
`encoding='utf-8'` explicitly when reading this repo's JSON from python on Windows.

---

## 1. Defect table

Ordered most severe first. False statements to a visitor, and claims that breach a locked
estate rule, outrank cosmetics.

| # | file:line | what it says or does | why that is a defect | severity |
|---|---|---|---|---|
| 1 | `content/dental-guides/practice-purchase-financial-due-diligence.md:15` and `src/app/for-practice-buyers/page.tsx:73` | "**Our fixed** buy-side financial due diligence fee **starts at around £2,500-£4,000** for a single-practice acquisition" (near-identical text in both) | **Our own price, published, twice.** Locked rule: these lead-gen sites carry no pricing for our services. This is not a third-party figure or a market range; the copy says "our fixed ... fee". The `.md` one is inside a frontmatter `answer:`, so it is also emitted into the page's FAQ schema. | banned-claim (pricing) |
| 2 | `content/blog/dental-accountant-london-how-to-choose-specialist.md:10, 20, 26, 104` | `metaDescription:` "what fees to expect (**£1,500 for associates to £8,000 plus** for practice owners)"; FAQ: "Fees typically range from **£1,500-£3,000** annually for associates and **£3,000-£8,000+** for practice owners ... London rates are generally **10-20% higher** than national averages"; body: "Dental accountant fees in London typically range from **£1,500 to £5,000+** annually" | A full fee schedule for the service this site sells, with a comparative regional uplift. Also **internally contradictory**: line 20 says £3,000-£8,000+ for practice owners, line 104 says £1,500-£5,000+ for associates, line 10 says £1,500-£8,000+. The metaDescription form puts our price list **in the SERP snippet**, where no page render is needed to see it. | banned-claim (pricing) |
| 3 | `content/blog/accountants-for-dental-practices.md:25, 51` | FAQ: "According to the **British Dental Journal**, the dental associate package costs **£450 per year or £37.50 per month**, while practice fees start from **£600 per year or £50.00 per month**"; body line 51 attributes the **same four figures** to "**The British Dental Association**" | Three defects in one. (a) A published monthly price list for dental accountancy. (b) **The two attributions contradict each other** and both point at `#ref-1`, which is `nature.com` (a BDJ piece), not the BDA. (c) The figures are not a BDA/BDJ benchmark at all: `#ref-1` is a profile of one named firm, so this is **a competitor's advertised prices republished as an industry statistic**. | banned-claim (pricing) + unsourced-statistic |
| 4 | `content/blog/accountants-for-dental-practices.md:107` | "**Remote Accounting LTD** is an accounting firm specialising in the dental industry, **led by Luke**. The firm uses cloud accounting software ... allow preparation of accounts **within a two-week turnaround period**" | A **named competitor firm promoted by name on our own site**, with its principal's first name and a turnaround promise attached. Nobody decided to ship this. Same shape as the kit-footer designer credit (playbook T27): outward-facing third-party content nobody audited. | live-false-framing + banned-claim (turnaround) |
| 5 | `src/app/services/page.tsx:119, 120, 384, 390`; `src/app/contact/page.tsx:38, 59`; `src/app/page.tsx:544, 573`; `src/app/dental-guides/[slug]/page.tsx:177`; `src/app/services/[slug]/page.tsx:244`; `src/app/services/[slug]/data.ts:109`; `src/app/for-associates/page.tsx:18, 63`; `src/app/for-principals/page.tsx:18`; `src/app/for-locum-dentists/page.tsx:67`; `src/components/blog/InlineMiniLeadForm.tsx:20`; `src/components/forms/LeadForm.tsx:191`; `src/components/support/SpecialistWidget.tsx:375`; `src/components/tools/premium/ResultGateModal.tsx:132`; `src/lib/support/faq.ts:31`; `src/config/service-tiers.ts:50`; `content/dental-guides/associate-tax-survival-guide.md:180` | "**Response within 24 hours**"; "We respond **inside 24 hours, usually the same working day**"; "we will be in touch **within one working day**" (x4); "a dental accountant will **reply within one working day**"; "**24h** / Response time **guarantee**" (x2, stat cards); "We produce them **inside 48 hours** of request" (x3); "**Priority same-day response**"; "**Within one working day, and usually sooner**" | **21 turnaround promises across 18 files.** Banned outright by the locked rules (identical defect found on Solicitors' `/contact` and Medical's). Two are framed as a **guarantee**. Worse, **they are false under this site's own pool model**: `src/app/privacy-policy/page.tsx:125-160` says the enquiry goes to **up to six independent partner firms** who each contact the visitor, that a firm has **48 hours** to take it up before it is re-offered, and that an unconfirmed enquiry may be batched **after seven days**. We do not respond at all, so no response window is ours to promise. | live-false-statement + banned-claim |
| 6 | `content/blog/nhs-uda-rates-2026-27-practice-finances.md:9, 14-16, 20, 22, 28, 41, 45, 53` | "**The standard UDA rate for 2026/27 is £25.20**"; "The **Department of Health has confirmed** the NHS UDA rates for 2026/27, with the standard rate set at £25.20 per UDA" | **Directly contradicts a locked house position.** `house_positions.md:148` writing rule: "**always say 'there is no national UDA value; use the per-UDA value of the specific contract'**". The page asserts a national rate nine times, including in the **title, H1, metaDescription and the FAQ schema**, and attributes it to DHSC **with no citation anywhere in the file**. Every downstream number on the page (£201,600 contract value, £12.60 associate pay, £75.60 per Band 2) is derived from it. | live-false-statement + unsourced-statistic |
| 7 | `src/app/page.tsx:476` | "That breadth of exposure — **across hundreds of dental clients** — means we can spot issues before they become problems" | **Client-count claim**, banned by the locked rules, unevidenced, and **false under the pool model**: we do not have dental clients, the partner firms do. On the homepage. | banned-claim + live-false-statement |
| 8 | `src/app/for-associates/page.tsx:29` and `src/app/services/[slug]/data.ts:248` | "**Most associates we onboard** are claiming roughly **half** of what they should be" | Client-behaviour assertion **plus** an aggregate-performance claim about our own client base, in two places. Both banned. Not derivable from `house_positions.md`. Same shape as Medical defect 17 ("Most doctors we onboard"). | banned-claim |
| 9 | `src/app/services/[slug]/data.ts:285-287` | Q: "**How much can a dental associate typically save** by switching to a specialist accountant?" A: "**We have seen four-figure refunds** on amended returns where the previous claims were under-stated." | Aggregate-performance / savings claim about our own book. Banned. | banned-claim |
| 10 | `src/app/page.tsx:439` | "**Most clients come to us** with a specific problem" | Client-behaviour assertion, homepage. | banned-claim |
| 11 | `src/app/for-associates/page.tsx:17` | Stat card: "**100%** / Dental-only **client base**" | Claim about the composition of our client base. Under the pool model we do not hold the client base. Unevidenced either way. | banned-claim |
| 12 | `src/app/page.tsx:134-135, 151, 183`; `src/app/services/page.tsx:15, 26, 123-124, 146`; `src/app/for-associates/page.tsx:10, 20`; `src/app/for-principals/page.tsx:19`; `src/app/for-practice-buyers/page.tsx:20`; `src/app/for-locum-dentists/page.tsx:20`; `src/app/services/[slug]/data.ts:44, 119` | "**Transparent pricing** / **Fixed fees**" (homepage feature card); "We work on **fixed fees with no hidden charges and no long-term contracts, so you know exactly what you are paying for**"; "**Fixed fees, no surprises** ... **No hourly billing, no scope creep** ... before any additional fee applies"; "We work on **fixed monthly fees. You agree the scope and price before you sign**"; "**£0** / Hidden fees"; "**Fixed** / Monthly fees, no scope creep"; "**Fixed monthly fees scaled by practice size and service tier**" | **15 pricing-model claims across 7 files.** The locked rule covers **comparative claims**, not just numbers: an explicit pricing model ("fixed monthly, no hourly billing, agreed before you sign") is our commercial terms published on a site that must not publish them. It is also **false under the pool model** — we never invoice the visitor, so there is no scope, price or contract to agree. The word "**pricing**" is a homepage feature heading (`page.tsx:134`). | banned-claim (pricing) + live-false-statement |
| 13 | `../niche.config.json:148, 156, 163` | `cta.variants.packages`: "See plans **from £29/mo**"; "Fixed monthly plans **from £29**"; "**Plans start at £29 a month** for associate self assessment and **£59** for associates trading through a limited company" — and `src/app/contact/page.tsx:51` "Our fixed monthly plans **start at £29 a month**" | **NOT LIVE**: `niche.config.json:140` sets `cta.variant: "leadgen"`, so `isPackagesMode()` is false and none of this renders today. Recorded as a **latent** breach: flipping one string publishes our price list in one commit. Identical to Medical defect 25 — the shape recurs, so it is a config-layer rule, not a one-off. | banned-claim (latent) |
| 14 | `src/app/cookie-policy/page.tsx:63-69` | Lists Google Analytics cookies as `_ga`, **`_gid`**, **`_gat_gtag_*`** | **Premise check done first, because the same audit had opposite answers on generalist and Solicitors.** GA **does** run on Dentists: `src/app/layout.tsx:101` mounts `<ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />` with `G-273RJY0LZQ` (`niche.config.json` `seo.google_analytics_id`). So the GA sections belong here. But `_gid` and `_gat_gtag_*` are **Universal Analytics** cookies. GA4 sets `_ga` and `_ga_273RJY0LZQ`. The policy names two cookies that are never set and omits the one that is. | live-false-statement |
| 15 | `src/app/cookie-policy/page.tsx:71` | "**IP addresses are anonymised.** Data is retained for **14 months**." | `grep -rn 'anonymize\|anonymizeIp\|anonymize_ip' src ../../packages/web-shared` returns **zero hits**. GA4 has no site-side setting this could refer to, and nothing in the codebase evidences it. The 14-month figure is a GA4 property setting no page can evidence. Same T18 shape as Medical defect 10. | live-false-statement |
| 16 | `src/app/cookie-policy/page.tsx:8, 12, 20` | `metadata.description`: "**Google Analytics cookies explained.**" | Repeats the wrong cookie list into the SERP snippet. Flagged separately because fixing the body list alone leaves this live. | live-false-statement |
| 17 | `src/app/cookie-policy/page.tsx:43` | "We do **not** currently use any strictly necessary cookies. Our Site functions **without requiring cookies for basic operation**." | The page is titled "cookies **and similar technologies**" and the site does write to browser storage (visitor id, session id, consent state — the page itself admits the first two at line 50). PECR reg 6 covers storage as well as cookies, and the consent record is exactly the "strictly necessary" case. Milder than Medical defect 12 because lines 50-52 **do** disclose the two identifiers; the blanket first sentence is what is wrong. | live-false-statement (by omission) |
| 18 | `content/blog/nhs-uda-rates-2026-27-practice-finances.md:14-16` and 24 other posts | Frontmatter `schema:` asserts `"publisher":{...,"legalName":"Dental Finance **Partners Ltd**"}` | **No such company.** The legal entity is **Ashfield Trading Ltd (16358723)**, and `src/config/site.ts:42` carries the correct value with the comment `// "Ashfield Trading Ltd"`. Derived by whitespace-normalised scan (the string is line-folded in YAML, so a plain `grep` returns 0 — do not conclude "clean" from a literal grep here): **25 posts** name a company that does not exist, in machine-readable structured data. | live-false-statement (structured data) |
| 19 | 48 posts, e.g. `content/blog/nhs-uda-rates-2026-27-practice-finances.md:15` | Schema asserts `"reviewedBy":{"@type":"Person","name":"Dental Finance Partners Editorial Team","jobTitle":"Reviewed against legislation.gov.uk and HMRC guidance"}` | **T17: a schema claim with no rendered counterpart.** `grep -rn 'reviewedBy\|Reviewed by' src/components src/app --include=*.tsx` returns exactly one hit, `services/page.tsx:372`, unrelated. No blog template renders a reviewer byline, a review date, or the credentials. Also a `Person` whose `name` is a team. | structured-data mismatch |
| 20 | `src/components/blog/BlogPostRenderer.tsx:56-58` | `const jsonLd = post.schema?.trim() \|\| buildBlogPostingJsonLd(post, ...)` | **The raw frontmatter string always wins.** 223 of 235 posts carry a `schema:` field, so the generated JSON-LD — which is built from the same `post.faqs` array the DOM renders at `:291-297` — is **overridden on 223 pages**. 48 of those raw strings embed their own `FAQPage` with a **second, independently maintained copy of the FAQ text**. This is the T17 two-map shape. **Honest limit: I checked the 5 files where question sets appeared to diverge and each difference was a parsing artefact of my own script, not real drift — the copies currently agree.** The defect is structural (two sources, one silently authoritative), not yet a live mismatch. | structured-data (latent) |
| 21 | `src/components/tools/premium/PremiumBarChart.tsx:93` + `:100-101` | Wrapper `<div aria-hidden="true">` containing `<svg role="img" aria-label="Bar chart comparing values across groups">` | **T16, byte-identical to Medical defect 16.** The `aria-hidden` parent removes the whole chart from the accessibility tree, so the `role="img"` label never reaches anyone. This is the payoff panel of the premium calculators and there is **no adjacent data table or text alternative**. A screen-reader user gets zero access to the comparison values. | a11y (hides data) |
| 22 | `content/**/*.md` (42 files) + `src/app/globals.css` | **665 `id="..."` anchor targets** and **505 `href="#..."` in-page links** across 42 content files. `grep -n 'scroll' src/app/globals.css` returns **nothing** — no `scroll-padding-top`, no `scroll-behavior`. Only **6** `scroll-mt-24` classes exist site-wide, all on `<section>` wrappers in `src/app/page.tsx:431` and the four `/research` pages. The header is `sticky top-0` (`src/components/layout/SiteHeader.tsx:58`). | **Every in-page jump in the blog and guide corpus lands with its target hidden under the sticky header.** That is all 505 links, including every `[1]`-style citation jump and every back-link from the references block. Solicitors had the same defect at 428 targets across 80 routes. | a11y |
| 23 | `content/**/*.md` (32 files) | **350 duplicate `id` attributes.** e.g. `content/blog/accountants-for-dental-practices.md` uses `id="cite-1"` on three separate `<sup>` anchors (lines 51, 107 twice) | Duplicate ids are invalid HTML; `href="#cite-1"` resolves to whichever the browser finds first, so the return-jump from the references list is wrong on 32 pages. Derived by `collections.Counter` over every `id="..."` in `content/`. | a11y + broken-anchor |
| 24 | `src/app/page.tsx:46-49` + `:208` | `PRACTICAL_SLUGS = ["associate-dentist-tax-self-assessment-uk", ...]` then `PRACTICAL_SLUGS.map(getPostBySlug).filter(Boolean)` | **`content/blog/associate-dentist-tax-self-assessment-uk.md` does not exist on disk.** The slug was merged away — `src/middleware.ts:81` redirects it to `associate-dentist-tax-guide-uk`. The `.filter()` swallows the miss, so **the homepage renders two cards where the code intends three**, silently, with no error. | live-content-gap |
| 25 | `src/app/about/page.tsx:66` | `href="/blog/associate-tax/associate-dentist-tax-self-assessment-uk"` | Same dead slug. Not a 404 — `middleware.ts:81` catches it with a 301 — so this is a **soft** link that costs a hop. An internal link should point at the destination. | broken-link (soft) |
| 26 | `content/blog/nhs-dentist-earnings-expenses-gross-net-breakdown.md` | `/blog/practice-finance/how-much-of-dental-practice-price-is-goodwill` | **The one HARD 404 in the corpus.** Wrong category: the file's `category` slugifies to `goodwill-and-practice-sale`, and `/blog/[category]/[slug]` sets `dynamicParams = false`, so a correct slug under the wrong category 404s. Command: `python scripts/track2_link_audit.py --site dentists` -> `HARD 404 ISSUES: 1`, `SOFT: 0`. | broken-link (hard) |
| 27 | `src/app/contact/page.tsx:53` | `href="/pricing"` | `/pricing` has **no route** (`ls src/app/pricing` -> no such directory). It resolves only via a 308 in `next.config.ts:24` to `/services`. Sits inside the **dormant** `isPackagesMode(niche)` branch (defect 13), so not live today. | broken-link (soft, latent) |
| 28 | `src/config/site.ts:8` | `const office = niche.company.registered_office;` — unguarded | Property guards the identical read: `Property/web/src/config/site.ts:23` `const office = (company.registered_office ?? {}) as Partial<...>`. The unguarded form produced **7 production `client_error` rows on Solicitors** from partial chunk loads. Same code, same exposure. | live-error risk |
| 29 | `src/components/analytics/GoogleAnalytics.tsx` (whole file) | A local GA4 mounting component | **Zero importers.** `grep -rn 'GoogleAnalytics' src` returns only the file's own two lines and `layout.tsx:91`, which is a **comment** saying the inline tag was replaced. The live mount is `packages/web-shared/analytics/react/ConsentedScripts`. T5: a per-site fork kept alive by a comment; a future "fix GA consent" edit lands here and changes nothing. | dead-code |
| 30 | `../niche.config.json:19` -> `src/config/site.ts:25` -> `src/app/layout.tsx:40` | `"tagline": "Accounting for UK dentists **—** nothing else"`, consumed as `title.default: \`${siteConfig.name} \| ${siteConfig.tagline}\`` | An em-dash **in the default `<title>` of every page on the site**, so it reaches search results estate-wide for this domain, not just body text. Also in `niche.config.json:20` `description` and read aloud by two `sr-only` spans (`BrandLogoHero.tsx:22`, `BrandWordmarkHomeLink.tsx:38`). Highest-leverage single em-dash on the site. | banned-claim (style rule) |
| 31 | 20 files, 102 lines (see §3) | Em-dashes in rendered copy | Locked rule: no em-dashes in user-facing copy. **STATE.md's count is stale and its scope is wrong** — see §3 and §5. | banned-claim (style rule) |
| 32 | `content/blog/how-much-of-dental-practice-price-is-goodwill.md:33, 87, 95` | "subject to the **GBP 1m** lifetime limit"; "**GBP 1m per year**" | Renders the literal string "GBP 1m" to the visitor. Every other page in the corpus uses `£`. Cosmetic, but it is the only file in 235 that does this, so it reads as a broken character. | copy-inconsistency |

---

## 2. Per-rule sweep proof

Scope for all sweeps unless stated: `Dentists/web/src`, `Dentists/web/content`,
`Dentists/niche.config.json`. `*.test.ts` excluded from banned-claim rules (not user-facing).
Code comments are exempt from the em-dash rule by the working agreement and are excluded where
stated.

### Rule: no pricing for our services, including comparative claims
Searched **by rule, not by symbol**. Patterns run: `hourly rate`, `our fees?`, `retainer`,
`fixed[- ]fee`, `price list`, `priceRange`, `accountancy fee`, `accounting fee`,
`accountant.{0,20}fee`, `per hour`, `cost of our`, `we charge`, `our pricing`,
`(from|starting at|starts at)\s*£`, `£[0-9,]+\s*(per|a|/)\s*(month|hour|year)`, and a proximity
sweep `(accountan(t|cy|ts)|bookkeep\w*|our (fees|service)).{0,120}£[0-9]` in both directions.

**Live breaches: defects 1, 2, 3, 12 (15 lines / 7 files), and the fee ranges below. Latent:
defect 13.** `priceRange` in structured data: **0 hits** (`grep -rn priceRange src content` ->
empty), so the generalist structured-data pricing defect does not recur here.
`src/config/service-tiers.ts` read in full: **no £ figures**; tiers are named, not priced (its
only breach is the `Priority same-day response` line, counted under turnaround).

**Fee-range hits additional to defects 1-3**, each read in context. All are ranges for the
service we sell, and the rule covers comparative claims:
- `content/blog/dental-accountant-manchester-specialist-knowledge.md:31` "Fees typically range
  from **£200-400 per month** ... up to **£1,000+ monthly**"
- `content/blog/dental-accountants-scotland.md:20` "Typical annual fees for a single-handed
  principal range from **£1,500 to £4,000**"
- `content/blog/dental-accounting.md:25` "For associates, annual fees typically range from
  **£450 to £1,200** per year. For practice owners, fees start around **£600** and can reach
  **£3,000** or more"
- `content/blog/dentist-accountants-near-me.md:22` "**£800 to £2,000**"
- `content/blog/specialist-dental-accountants.md:29` "A general accountant might charge **£500
  to £1,500** per year. A specialist dental accountant typically charges **£1,500 to £5,000**
  or more" (also a comparative claim against generalists)
- `content/blog/dental-accountants.md:27` (fee framing, no figure — borderline, not counted)

**Total pricing breaches: 6 files with explicit fee figures + 7 files with pricing-model
claims + 1 with our own quoted fee (defect 1, 2 files) = 15 files.** STATE.md said "**3 legacy
posts carry hourly-rate mentions**". That is **wrong in kind and in scale**: the live problem
is fee *ranges and models*, not hourly rates, and it is 15 files not 3. The only genuine
hourly-rate line is `dental-accountant-london-how-to-choose-specialist.md:108` ("Good
accountants provide fixed fees ... with **hourly rates** for additional advice"), which is
advice about third parties and is the least of that file's problems.

**Modelling assumptions that mention accountancy cost, read and NOT counted as breaches**
(they are inputs to a tax calculation, not our price): `src/lib/tools/configs/locum-structure.ts:82`
and `src/lib/tools/premium/configs/associate-incorporation.ts:232` ("A fixed **£1,800** admin
cost covers accountancy and filing"), `content/resources/associate-incorporation.md:37`. Flagged
for the owner's eye anyway: £1,800 is a number a visitor will read as what we charge.

### Rule: no contingent or no-win-no-fee offers
Pattern: `no win|no.win.no.fee|contingent fee|success fee|only pay if|money.back guarantee|guarantee`
**Breaches: 0 of the contingent-offer kind.** All `guarantee` hits read in context and cleared:
personal guarantees on practice loans (`100-percent-dental-practice-finance.md`), the CARE
scheme's *guaranteed* pension (`superannuation-contributions.ts`), "Does the BDA agreement
*guarantee* self-employed status" (a question the page answers "no"), and sessional
*guaranteed* arrangements. **Two hits are NOT cleared and are counted under defect 5**:
`for-associates/page.tsx:18` and `for-principals/page.tsx:18`, "24h / Response time
**guarantee**".

### Rule: no turnaround promises
Pattern: `same[- ]day|within (24|48|72) hours|next working day|one working day|turnaround|respond within|get back to you within|inside (24|48) hours`
**21 breaches across 18 files** (defect 5) **plus** defect 4's third-party "two-week turnaround
period". Non-breaches excluded after reading each in context: cron-job windows
(`aux-cron.ts`, `send-window.ts`, `booking.ts`), nurture health thresholds
(`nurture-health.ts:104,141`), admin dashboard headings (`admin/analytics/trends/page.tsx:84`),
the `_gid` cookie lifetime, the privacy policy's **48-hour pool re-offer disclosure**
(`privacy-policy/page.tsx:153` — that is a factual disclosure about the model, the opposite of
a promise), the 72-hour ICO breach deadline (`dentistry-compliance.md:10`), and every
"same day" in a tax sense (mileage between practices on the same day, payments on account due
the same day).

### Rule: no client-behaviour, client-count or aggregate-performance claims
Pattern: `most (of our )?clients|clients we|we onboard|hundreds of|thousands of (clients|dentists|practices)|we have (helped|saved|seen)|typically save|average (saving|client)|most (dentists|practices|businesses) (qualify|prefer|choose)`
**Breaches: 5** — defects 7, 8 (x2 files), 9, 10, 11. **No "most businesses qualify" framing
exists** (0 hits). The `hundreds of` hits in blog bodies were read and cleared: they are about
SDR treatment codes and the cost of bad due diligence, not about us.

### Rule: stale tax facts (checked against `house_positions.md` + the estate ground truths)
Every ground truth in the brief was swept. **The corpus is in far better shape than STATE.md
implies.**

| ground truth | sweep | result |
|---|---|---|
| Dividend 10.75 / 35.75 / 39.35 from 6 Apr 2026 | `grep -rn '8\.75\|33\.75' content src` | **0 stale.** 41 hits, every one either the current 2026/27 rate or an explicitly year-tagged historic comparison ("rose from 8.75% to 10.75%"). |
| AMAP 55p first 10k miles from 6 Apr 2026 | `grep -rniE '45p\|45 pence'` | **0 stale.** 14 `45p` hits, all in the correct "up from 45p" / "45p applied to 5 April 2026" form. `dentist-self-assessment-filing-guide-2026.md:172` explicitly warns against using 45p. The 3 stale-45p pages recorded in STATE.md Wave 5 were fixed. |
| Employer NIC 15% / £5,000 threshold | `grep -rn '13\.8\|9,100'` | **0 stale in user-facing copy.** The only `13.8`/`9,100` hits are code comments documenting the change (`locum-structure.ts:36,39`, `principal-extraction.ts:31,34`), a guard test (`src/tests/assistant-journey-opener.test.ts:794-797` asserts the NHS FAQ does **not** contain "13.8%"), and unrelated numbers (`£89,100` of expenses in a research table, a `2020-09,100,100` CSV row). **STATE.md's "2 pages carry stale 13.8%/9,100 employer NIC" is now FALSE — it was fixed and the note was not retired.** |
| WDA 18% -> 14% (FA 2026) | `grep -rniE 'writing.down allowance[^.]{0,80}18\|18% (wda\|main.rate\|main pool)'` | **0 stale.** All main-pool references say 14%, or date-tag the 18% correctly (`dental-surgery-fit-out-capital-allowances-pool-split.md:65` "18% for relief up to 31 March 2026 ... " is the correct straddle framing). The 2 deepseek AIA pages STATE.md flagged as citing the old 18% now read 14% (`aia-allowance-dental-equipment-uk.md:72`, `aia-capital-allowances-dental-practices.md:18,20`). |
| BADR 18% from 6 Apr 2026 | `grep -rniE 'badr\|business asset disposal' \| grep -E '10%\|14%'` | **0 stale.** Every hit carries the three-step ladder (10% to 5 Apr 2025, 14% to 5 Apr 2026, 18% after). `capital-gains-tax-selling-dental-practice-uk.md:33` explicitly rebuts the old 10%. |
| VAT registration £90,000 | `grep -rn '85,000'` | **0 stale.** All 12 threshold references say £90,000; the £85,000 mentions are all in the correct "raised from £85,000 on 1 April 2024" form. Other £85,000 hits are worked-example incomes. |
| BR/APR combined allowance £2.5m | `grep -rniE '(business relief\|BPR\|agricultural).{0,90}(£1 ?m\|£1,000,000\|1 million)'` | **0 hits — clean.** `house_positions.md:198` §4.B locks £2.5m and explicitly records that "the announcement-era £1m figure is WRONG". No page repeats it. |
| s455 charge rate | `src/lib/support/faq.ts:70`, `directors-loan-account-dental-company-overdrawn-tax.md:73` | **Correct.** Both give 33.75% for 2025/26 loans and 35.75% from 6 Apr 2026, matching `house_positions.md:36` §5.A. |

**The one open stale-fact item, and it is a document conflict, not a corpus error:** the
**Lower Earnings Limit**. `house_positions.md:36, 228, 457` locks **LEL £6,708**. STATE.md's
"Known content debt" says "**HP LEL figure 6,708 is stale (verified correct = 6,500 for
2025/26)**". Two house documents disagree, and the corpus follows HP: **£6,708 appears 12 times
across 2 files** (`content/blog/dental-company-salary-dividend-split-2026-27.md:19,20,76,79,87,92,129`
— including in an **H2 heading** and a **FAQ question** — and
`content/blog/dental-practice-profit-extraction-uk.md:24,58,70`). The whole "£6,708 versus
£12,570" section of the first post is built on it. **I could not resolve which is right**
(see §5); it needs the gov.uk 2026/27 NI rates page read by a human, and whichever way it
falls, one of the two house documents must be corrected.

### Rule: compliance copy must describe code that actually runs
Premise verified first, because generalist and Solicitors had opposite correct answers.
`grep -rn 'ConsentedScripts\|GoogleAnalytics' src/app/layout.tsx` ->
`:101 <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />`, and
`niche.config.json` `seo.google_analytics_id = "G-273RJY0LZQ"`. **GA4 genuinely runs on
Dentists**, so the cookie policy is right to have a Google Analytics section. Defects 14-17 are
what is wrong *inside* it. Defect 29 is the dead local fork.

**The "we don't share your details" class: clean, and better than expected.** Sweep:
`we (do ?n.t|never) (share|sell|pass)|your (details|data) (are\|is) (never\|not) (shared\|sold)|kept (private\|confidential)`.
**No page claims we keep the enquiry to ourselves.** The only two hits are
`privacy-policy/page.tsx:180` "We do not **sell** your personal data" and
`cookie-policy/page.tsx:52` "we do not sell or share **this data**" — the latter scoped to
first-party *analytics* events, not to enquiries, which is accurate.
`privacy-policy/page.tsx:125-165` discloses the pool honestly: up to three same-profession
firms plus up to three adjacent-profession firms, "**at most six firms**", each an independent
controller, the 48-hour re-offer, the seven-day batch, and "**We may be paid a fee by a firm
your enquiry is passed to**". `src/components/resources/ResourceGate.tsx:16` correctly notes
resource downloads are **not** shared with a partner firm. **The privacy policy is the accurate
document; it is `/contact`, `/services` and the homepage (defects 5 and 12) that contradict
it.**

`/complete` (`src/app/complete/page.tsx`) read in full: it only asks for a missing phone
number and says "use the contact form and we will arrange your review" — **no turnaround
promise, no pricing, no sharing claim. Clean.**

### Rule: no dead internal links
Two independent instruments, because one does not cover the other's scope.
1. Corpus links: `python scripts/track2_link_audit.py --site dentists` ->
   **`HARD 404 ISSUES: 1`** (defect 26), **`SOFT (301-hop / self-loop) ISSUES: 0`**.
2. App-route links: a route-model script comparing every `href="/..."` in `src/**/*.tsx|ts`
   (API and admin excluded) against 34 static routes + 255 derived concrete routes
   (blog category/slug pairs from frontmatter, dental-guides, resources, locations from the
   niche config, calculator and embed slugs from `src/lib/tools/registry.ts`, service slugs
   from `src/app/services/[slug]/data.ts`) + `next.config.ts` redirect sources.
   **Result: 1 unmatched href**, `about/page.tsx:66` (defect 25), which turns out to be caught
   by `middleware.ts:81` and is therefore soft, not a 404.

**No hub is linked from many pages with no route** — the Solicitors `/resources` shape does not
recur; `/resources/[topic]` exists and resolves. **Total: 1 hard 404, 2 soft (one latent).**
That is a much cleaner result than Solicitors' 10 + a routeless hub, and it is consistent with
STATE.md's claim that the link floor has been enforced per wave.

### Rule: unsourced statistics presented as fact
| statistic | where | in `house_positions.md`? | verifiable? |
|---|---|---|---|
| "standard UDA rate for 2026/27 is **£25.20**", "**the Department of Health has confirmed**" | `nhs-uda-rates-2026-27-practice-finances.md` (9 places, incl. title/H1/meta/schema) | **No — contradicted.** HP:148 says there is no national UDA value. | **No.** No national standard UDA rate is published; contract values are per-contract. There is no DHSC source to cite because the claim's shape is wrong. **Delete the claim, do not source it.** |
| "England average UDA values sit around **£25 to £35**, individual contracts **£15 to £45**" | `dental-accountants.md:17`, `dental-accounting.md:17,56`, `dentist-accountants-near-me.md:42`, `uda-value-benchmarking...md:26`, `accountants-for-dental-practices.md:63` | Partially. HP §3 permits per-contract framing but locks no national range. | **Yes, with work.** NHS BSA publishes contract-level UDA data; the range is derivable and should carry the vintage and the source URL. Today it is stated bare in 6 files. |
| dental accountancy fees "**£450/yr, £37.50/mo**", "**£600/yr, £50/mo**" attributed to the BDJ then the BDA | `accountants-for-dental-practices.md:25,51` | No. | **Yes — and verifying it disproves it.** `#ref-1` is a nature.com BDJ profile of one firm, not a BDA fee survey. The attribution is wrong regardless of the pricing rule (defect 3). |
| "**Over 56,000** DCPs work across the UK, **87%** do clinical work", "nearly half work 30-40 hours", "dental nurses **more than three-quarters** of respondents" | `accountants-for-dental-practices.md:~118-122` | No. | **Yes — already sourced.** `#ref-6` is the GDC's Oct 2025 DCP working-patterns release. This one is fine; recorded so it is not swept away with the rest of that file. |
| "goodwill is typically **60-80%** of total practice price" | `for-practice-buyers/page.tsx:17` and ~6 blog posts | **Yes.** HP:169 locks "typically 60 to 80%". | Cleared. |
| "NPE = **43.9%** of contract value" | `superannuation-contributions.ts:98,127`, 2 blog posts | **Yes**, resolved at the Wave 3 gate to NHSBSA KA-02063. | Cleared, **but** STATE.md's own deploy-review list still flags it for manager re-verification and that has not been recorded as done. |
| "**hundreds of** dental clients" | `page.tsx:476` | No. | **No.** Unverifiable and false under the pool model (defect 7). |
| "Most associates we onboard claim roughly **half** of what they should" | defect 8 | No. | **No.** No dataset exists. |
| "**0.6-1.4x** EBITDA multiple range", "**24-month** BADR lead time" | `for-practice-buyers/page.tsx:18-19` | **Yes.** HP:169 indicative multiples; HP §4 BADR 2-year holding. | Cleared. |
| "**60+** Posts on NHS contract economics" | `for-principals/page.tsx:20` | No. | Trivially checkable and probably true, but it is an unaudited count that will drift. |

### Provenance / quality debt (the 88-post claim)
`grep -rh '^generator:' content/blog | sort | uniq -c`:
`deepseek-chat/legacy-bulk` **76**, `deepseek-chat/unverified` **19**, `claude/legacy-supabase`
**55**, `opus-4.8/netnew-wave` **59**, `opus-4.8/finance-expansion` 2,
`opus-4.8/dental-finance-cluster` 1, `claude-sonnet-4-6/wave5-netnew` 4.
**95 deepseek-authored posts remain on disk**, not 88 — STATE.md's 88 was the zero-traction
*subset* at 2026-06-12, and the number to plan against is 95 of 223 (43% of the blog corpus).
Every defect in this report that sits in a blog body (3, 4, 6, and most of the fee ranges) is in
a `deepseek-chat/*` or `claude/legacy-supabase` file. **No opus-wave or wave5 file produced a
defect in any sweep above.** That is the strongest signal in this document about where the
remaining risk is.

---

## 3. Em-dashes: three metrics, stated separately

They disagree, and the disagreement is the point.

**Metric A — rendered user-facing copy: 102 lines across 20 files.**
`src` non-comment, non-test, non-`/admin/`, non-`/api/`, JSX comments excluded = **52 lines /
13 files**; `content/**/*.md` **body** text = **48 lines / 6 files** (all six are
`content/dental-guides/*`); `niche.config.json` = **2 lines** (`tagline`, `description`).
Command:
`grep -rn -- '—' src | grep -vE '^\S+:[0-9]+: *(//|\*|/\*)' | grep -vE '\.test\.ts|\{/\*|/admin/|/api/' | wc -l` -> `52`.
Worst offenders: `src/app/page.tsx` (12), `src/app/about/page.tsx` (8),
`content/dental-guides/nhs-contract-essentials-for-dentists.md` (15).
**This is an approximation, not a crawl** — no dev server was started (read-only brief), so a
rendered-HTML dash count could differ. It is the metric the sweep script would measure.

**Metric B — raw file bytes across `src` + `content` + `niche.config.json`: 217 lines across
60 files.**
Command: `grep -rn -- '—' src content ../niche.config.json | wc -l` -> `217`; `-rl | wc -l` ->
`60`. The 115-line gap to metric A is **code comments and test files**, which the working
agreement exempts: `src/lib/tools/compute/compute.test.ts` alone has 24,
`src/lib/tools/compute/associate-take-home.ts` 8 (all header comments).

**Metric C — metadata that never reaches body text but does reach users in search results: 12
lines across 4 route files, plus 6 frontmatter lines, plus the site-wide title.**
- **12** `metadata.description` lines: `src/app/about/page.tsx:11,16,24`,
  `src/app/blog/page.tsx:12,17,25`, `src/app/contact/page.tsx:12,16,23`,
  `src/app/locations/page.tsx:10,14,21` (each route repeats the same string across `metadata`,
  `openGraph` and `twitter`).
- **6** `content/**/*.md` **frontmatter** lines, across 3 guide files, all inside FAQ `answer:`
  fields — which reach users twice, through the rendered FAQ block and through `FAQPage` schema.
- **0** em-dashes in any `metaTitle` or `metaDescription` in the 235 markdown files. Command:
  a per-file frontmatter/body splitter (not a flat grep, which cannot tell them apart).
- **Plus defect 30**: one em-dash in `niche.config.json:19` `tagline`, consumed by
  `layout.tsx:40` as `title.default`, i.e. **in the `<title>` of every page that does not set
  its own**. One line, the widest blast radius on the site.

**STATE.md is wrong on this item and should not be trusted by the port.** It says "**181 lines
across the legacy 150 posts** contain em-dashes" and that the rewrite pass took it "181->139".
On disk today: `grep -rn -- '—' content/blog | wc -l` -> **0**. **The 223-post blog corpus has
no em-dashes at all.** Every surviving em-dash is in `content/dental-guides/` (48), in `src/`
(52 rendered + 113 in comments/tests), or in the config (2). A port that budgets an em-dash
sweep of the blog corpus would be sweeping a clean tree.

---

## 4. What in the Phase 0 brief turned out to be FALSE

Recorded because the field notes say every agent that corrected its brief was right.

1. **"STATE.md already flags 3 legacy posts carry hourly-rate mentions."** True as written but
   the wrong shape and the wrong scale. The live pricing problem is **fee ranges and an
   explicit pricing model across 15 files**, including two places where the copy says "**our
   fixed ... fee**" with a number, and one in a `metaDescription`. Only one genuine hourly-rate
   line exists.
2. **"181 lines across the legacy 150 posts contain em-dashes" (stale count, re-measure).**
   The brief expected the count to have grown with the corpus. It went to **zero** in the blog
   corpus. The remaining 102 rendered lines are somewhere the brief did not point:
   `dental-guides` and the app shell.
3. **"2 pages carry stale 13.8%/9,100 employer NIC."** **No longer true.** Zero stale
   employer-NIC figures in user-facing copy; the only hits are comments, a guard test that
   asserts the absence, and unrelated numbers. The STATE.md note was never retired.
4. **"88 zero-traction deepseek-authored posts."** **95** deepseek-authored posts are on disk
   (76 `legacy-bulk` + 19 `unverified`). 88 was the zero-traction subset at 2026-06-12.
5. **"Check FAQ arrays fed to schema and to the DOM through two separate maps."** The two-map
   structure **does** exist (defect 20) but on the files I checked the two copies **agree**, so
   there is no live mismatch to report. I am flagging the structure, not asserting a defect
   that is not there.
6. **"`priceRange` asserted on a site that publishes no prices."** **0 hits.** This generalist
   defect does not recur on Dentists. (It has the opposite problem: it publishes prices in prose
   and asserts none in schema.)
7. **The brief listed `/complete` as a compliance-copy surface to check.** It is clean. The
   surfaces that actually carry false compliance-adjacent copy are `/contact`, `/services`,
   `/cookie-policy` and the homepage.
8. **Reference artefacts.** The brief pointed at `docs/generalist/_port/` for shape; that
   directory has **no `LIVE_DEFECTS.md`** (only DISPOSITION slices and baseline JSON). This
   document follows `docs/medical/_port/LIVE_DEFECTS.md`.

---

## 5. What I could not check, and why

1. **Whether the LEL is £6,708 or £6,500 for 2026/27.** Needs the gov.uk NI rates page read at
   source. `house_positions.md` and `docs/dentists/STATE.md` **contradict each other** and 12
   live lines across 2 posts follow HP. Not resolvable from the repo, and resolving it wrongly
   would push a false figure into an H2 heading. **Owner or a human must read the source.**
2. **Rendered-HTML measurements.** No dev server was started (read-only brief, and the field
   notes record that a mis-bound port made three previous baselines measure the wrong site
   entirely). So: the em-dash body-text metric is derived from source, not from a crawl; the
   anchor-offset finding (defect 22) is derived from the absence of `scroll-padding-top` and
   `scroll-mt` plus the `sticky top-0` header, not from a measured jump; and I did not verify
   that `_ga_273RJY0LZQ` is the cookie GA4 actually sets on this domain.
3. **Whether any `data-cta` id on this site has ever fired.** The field notes (§1) say this is
   Stage 0 work and that Solicitors found 15 of 22 ids had never fired. It needs an analytics
   pull against `vw_cta_performance`, which is outside a read-only code sweep. **Not checked —
   flagging it so it is not assumed done.**
4. **Animated counters that SSR a fraction of their target (T15).** Swept
   (`countup|animatedcounter|useCountUp|requestAnimationFrame|setInterval` over
   `src/components`) and found **three** `setInterval` uses: `TestimonialSlider.tsx:47`
   (rotation), `IntentProvider.tsx:56`, `SpecialistWidget.tsx:161`. **None is a counter**, so
   T15 does not appear to apply. I did not confirm this by viewing the SSR output.
5. **The four `/research` chart components** (`src/components/research/*.tsx`) render via
   `recharts` through `@/components/ui/chart`. They carry **no** `aria-hidden` and no
   `role="img"`, so they do not have the defect-21 shape, but I did not trace whether the
   recharts wrapper emits an accessible name or whether a data table accompanies them. **Worth
   a look in the a11y phase; not asserted either way here.**
6. **Whether the 25 posts naming "Dental Finance Partners Ltd" are indexed with that claim.**
   Needs GSC / a live fetch. The defect in the source is certain; its search-visible effect is
   not measured.
