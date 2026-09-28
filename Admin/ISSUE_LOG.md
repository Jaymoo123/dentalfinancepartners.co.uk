# Issue Log

Last updated: 23 September 2026 (estate-wide content audit, all 17 sites)

Historical audit (32 items, 2 April 2026): `Admin/PLATFORM_AUDIT_2026-04-02.md`
Property commercial investigation (21 September 2026): `Admin/PROPERTY_COMMERCIAL_INVESTIGATION_2026-09-21.md`

**Scope correction, 23 September 2026.** Earlier entries in this log describe a four-site estate
of 236 posts. The estate is **17 sites carrying 2,582 blog posts**. Every count below was
re-measured against the files on disk on 23 September 2026, not carried forward.

| Site | Posts | Domain |
|---|---:|---|
| Property | 806 | propertytaxpartners.co.uk |
| generalist | 475 | hollowaydavies.co.uk |
| digital-agency | 306 | agencyfounderfinance.co.uk |
| Dentists | 223 | dentalfinancepartners.co.uk |
| Solicitors | 196 | accountsforlawyers.co.uk |
| wills-probate | 146 | **placeholder domain** |
| Medical | 88 | medicalaccounts.co.uk |
| construction-cis | 82 | tradetaxspecialists.co.uk |
| contractors-ir35 | 62 | contractortaxaccountants.co.uk |
| divorce-finances | 45 | **placeholder domain** |
| startups-tech | 32 | foundertaxpartners.co.uk |
| charities | 24 | trusteetax.co.uk |
| hospitality | 23 | hospitalitytax.co.uk |
| pharmacies | 22 | pharmacytax.co.uk |
| care | 19 | carehometax.co.uk |
| crypto | 19 | cryptotaxpartners.co.uk |
| ecommerce | 14 | ecommercefinance.co.uk |

Last post written anywhere in the estate: **2026-09-11**. Content generation has been unscheduled
since the optimisation engine was retired on 2026-09-09 (I-004).

---

## Quick Lookup by Site

- **Property**: P-015, P-016, P-017, P-018, P-019, X-001, X-005, X-007, X-008, X-010
- **Dentists**: D-001, D-003, X-002, X-005, X-006, X-007, X-008, X-010
- **Medical**: M-003, M-005, X-001, X-002, X-005
- **Solicitors**: S-004, G-001, D-003, X-001, X-002, X-005, X-006, X-007, X-008, I-002
- **generalist**: G-001, X-005, X-006, X-007, X-008, X-009
- **digital-agency**: X-005, X-006, X-007, X-009
- **wills-probate**: W-001, X-008
- **divorce-finances**: W-001, X-008
- **charities**: X-009
- **contractors-ir35**: X-008
- **Infrastructure**: I-001, I-002, I-003, I-004

---

Superseded IDs still cited inside open rows: D-002 (re-opened as X-007) and S-005 (folded into G-001).

## Open Issues

**Verification standard, 23 September 2026.** Every item below was re-checked against the code or
the files on disk. Four were additionally checked against the **live sites**, and the evidence is
quoted in the row: X-005 (a live page whose title and H1 both read 2025/26), X-006 / S-004 (a live
page reporting `dateModified` 2026-06-03 where the file says 2026-07-08), G-001 (two live URLs
carrying the same question as their H1), and X-002 (live pages showing the placeholder phone number
is never rendered, which is why it was downgraded).

**Performance data, checked 2026-09-23. An earlier draft of this entry wrongly said none existed.**
Supabase holds `gsc_page_performance` (88,819 rows, through 2026-09-19), `gsc_query_data` (117,820
rows, through 2026-09-19) and `bing_query_data` (475,436 rows, through 2026-09-21). I-004 stopped
the *schedule*, not the history: the tables are two to four days behind, not empty. Every item below
that could be priced against traffic now has been, using the 28 days to 2026-09-23.

**Estate totals, 28 days:** Google 315,000 impressions / 2,866 clicks (CTR 0.91%); Bing 373,000
impressions / 36,744 clicks (CTR 9.85%). Bing produces **13x the clicks on comparable impressions**,
which matches the 2026-09-21 Property investigation. **1,503 of 2,582 posts earned impressions**;
1,079 earned none, of which 191 are the unlaunched placeholder sites (W-001).


### Critical

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| X-005 | 2026-09-23 | Content | **Tax-year currency, estate-wide.** The UK tax year in force is 2026/27. **97 posts assert 2025/26 in their title, H1 or metaTitle** (generalist 55, Solicitors 20, Dentists 8, digital-agency 8, Property 6) and **379 posts discuss 2025/26 in the body with no mention of 2026/27** (generalist 167, Solicitors 58, digital-agency 54, Dentists 46, Property 42). Superseded tax advice on a YMYL estate, and the largest single content liability. **Live-verified 2026-09-23**: `hollowaydavies.co.uk/blog/limited-company-tax/accountant-cost-limited-company-2025-26` serves `<title>Accountant Cost Limited Company 2025/26</title>` and an H1 of "What Does an Accountant Cost for a Limited Company in 2025/26?". **Priced 2026-09-23: these 97 posts took 71,816 impressions and 5,476 clicks in the last 28 days - 12% of estate impressions and 16% of estate clicks.** They are not dead pages being ignored; they are among the best earners, and each one shows a superseded tax year to every visitor who arrives. The 379 body-only posts add a further 92,602 impressions and 5,133 clicks | `*/web/content/blog/*.md` |
| W-001 | 2026-09-23 | Config | **191 finished posts are blocked on a domain-name decision.** wills-probate (146 posts) is configured as `www.probate-compass-placeholder.co.uk`, divorce-finances (45 posts) as `placeholder-divorce-domain.example`. **Checked 2026-09-23: the wills-probate placeholder does not resolve, so these are unlaunched sites rather than broken live ones.** Canonical, OpenGraph and JSON-LD all build from `siteConfig.url`, so the real domain has to be set before either can go live, and the two sites are finished content sitting idle until it is | `{wills-probate,divorce-finances}/niche.config.json` |
| I-003 | 2026-09-21 | Security | Bing Webmaster API key passed as a URL query parameter, so every httpx error logs it in plaintext, including in retained GitHub Actions logs. Rotate `BING_WEBMASTER_API_KEY` and strip `apikey` from logged URLs | `optimisation_engine/clients/bing_query_client.py` |
| P-015 | 2026-09-21 | Bug | Lead value scoring dead since ~2026-08-14: `tier` and `est_value_gbp` NULL on all rows. `anthropicConfigured()` returns false because production has `AI_GATEWAY_API_KEY` but no `ANTHROPIC_API_KEY`. Fails silently, `case_tier` still written so no error surfaces | `Property/web/src/lib/leads/value-score.ts` (line 115), `Property/web/src/lib/ai/anthropic.ts` (line 41) |
| X-001 | 2026-04-02 | Config | Property, Medical and Solicitors carry an **empty** Google verification token (Dentists has a real one) - cannot verify in GSC. Re-confirmed 2026-09-23 | `{Property,Medical,Solicitors}/niche.config.json` |

### High

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| X-006 | 2026-09-23 | Bug | **`dateModified` frontmatter is dead on 305 posts.** Four sites write `dateModified:` into frontmatter but their loader reads `updatedDate`, so the value never reaches the page: generalist 129, Dentists 74, Solicitors 52, digital-agency 50. The freshness signal is silently lost. **Live-verified 2026-09-23**: `abortive-conveyancing-transactions-vat-and-wip.md` carries `dateModified: 2026-07-08`, and the live page emits `"dateModified":"2026-06-03"`, its publish date. One field name has to win estate-wide | `{generalist,Dentists,digital-agency,Solicitors}/web/src/lib/blog.ts` (line ~23) |
| S-004 | 2026-09-23 | SEO | Solicitors `buildBlogPostingJsonLd` **hardcodes** `dateModified: post.date`, so all 196 posts report `dateModified == datePublished` regardless of frontmatter. Every other site uses a fallback expression. Compounds X-006 on the same site | `Solicitors/web/src/lib/schema.ts` (line 106) |
| X-007 | 2026-04-02 | Content | **367 posts carry no outbound internal blog link at all** (Dentists 92, generalist 82, Solicitors 79, digital-agency 46, Property 35, remainder 33). This is D-002 re-measured estate-wide: logged as 11 Dentists posts in April, now 92 on that site alone. **Priced 2026-09-23: those 367 posts took 99,352 impressions and 5,351 clicks in 28 days, so they are earning despite the defect.** Adding links is upside on pages that already work, not a rescue of dead ones | `*/web/content/blog/*.md` |
| X-008 | 2026-09-23 | SEO | **248 posts exceed the 155-character `metaDescription` limit** (generalist 57, wills-probate 48, Solicitors 46, Dentists 43, contractors-ir35 18, remainder 36) and **77 exceed the 60-character `metaTitle` limit** (Solicitors 29, Property 16, generalist 15, Dentists 7, remainder 10). The pipeline's own truncation guardrail (`EDITORIAL_PIPELINE_LESSONS.md` F-001) was never applied retroactively | `*/web/content/blog/*.md` |
| P-016 | 2026-09-21 | SEO | `sitemap.ts` sets `lastModified: new Date()` for all static routes (lines 48, 61, 72, 84), so 60 URLs share a build-time stamp that rewrites every deploy. Commercial pages last crawled 2026-08-05 to 08-21 while blog posts (using real `post.date`) are crawled every 3 to 18 days. Strong hypothesis, not proven. Still present 2026-09-23 | `Property/web/src/app/sitemap.ts` |
| P-017 | 2026-09-21 | SEO | `/incorporation` never served in search since creation 2026-03-29: zero GSC impressions on both hosts. Apex record reads `Crawled - currently not indexed`, fetch SUCCESSFUL, robots ALLOWED. Not a block; Google declined to index | `Property/web/src/app/incorporation/page.tsx` |
| P-019 | 2026-09-21 | SEO | `/locations` hub in same non-indexed limbo as `/incorporation`, zero impressions since March, throttling crawl reach to all 14 `/locations/<city>` pages (avg position 34.4) | `Property/web/src/app/locations/page.tsx` |
| D-001 | 2026-04-02 | SEO | **10** Dentists posts carry a superseded tax year in `metaTitle` (logged as 8 in April; re-counted 23 September). Nine say 2025/26, one says 2024/25. Subset of X-005 | `Dentists/web/content/blog/`: aia-allowance-dental-equipment-uk, annual-allowance-tapering-nhs-dentists-pension, annual-investment-allowance-2025, annual-investment-allowance-dental-practice-2024-25, dental-associate-self-assessment-step-by-step, dental-associate-spouse-employment-tax, dental-foundation-training-pay-scales-uk-2026, ir35-dentists-associate-agreements-uk, locum-dentist-vat-registration-when-required, nhs-dentist-earnings-expenses-gross-net-breakdown |

### Medium

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| I-004 | 2026-09-21 | Infrastructure | GSC/Bing ingestion no longer scheduled. `weekly-optimisation.yml` cron disabled 2026-09-09 when the optimisation engine was retired; nothing replaced the ingestion step, so tables go stale silently until someone runs it by hand. **Correction 2026-09-23: the history is intact and only two to four days behind** (`gsc_page_performance` to 2026-09-19, `bing_query_data` to 2026-09-21), so per-post decisions ARE evidenced today. The risk is forward-looking: with nothing scheduled, the gap widens silently from here | `.github/workflows/weekly-optimisation.yml` |
| P-018 | 2026-09-21 | Infrastructure | `BingQueryFetcher.fetch_and_store` makes one API call per page (1,715 for property alone). ~46,000 calls exhausts the Bing daily quota; `GetUserSites` then returns 400 and remaining sites fail. hospitality, medical, pharmacies, startups-tech stale at 2026-09-07 | `optimisation_engine/clients/bing_query_client.py` |
| D-003 | 2026-09-23 | Config | **176 posts sit in categories `niche.config.json` does not declare**: Dentists 87 (capital-allowances-and-equipment 19, nhs-contracts 17, goodwill-and-practice-sale 16, nhs-pension 15, locum-tax 11, general 7, specialist-services 2) and Solicitors 89 across 10 slugs. They render, because hubs derive from posts via `getAllCategories()` rather than from config, so this is drift and not a 404 - but the config no longer describes either site | `{Dentists,Solicitors}/niche.config.json` |
| M-003 | 2026-04-02 | Config | "Consultant Tax" category defined in config but has 0 posts and no hub page. Re-confirmed 2026-09-23: the only config category estate-wide with nothing behind it | `Medical/niche.config.json` |
| X-009 | 2026-09-23 | Content | **24 posts carry no `faqs` block** (digital-agency 12, generalist 9, charities 3) and **23 posts are under 800 words** (Dentists 11, Solicitors 5, wills-probate 4, generalist / charities / startups-tech 1 each; shortest is a 287-word charities post). Every other post in the estate has FAQs, so these omit FAQ schema their siblings emit | `{digital-agency,generalist,charities}/web/content/blog/*.md` |
| X-002 | 2026-04-02 | Config | Dentists, Medical and Solicitors carry Ofcom drama-reserved 7946 phone numbers in `contact.phone` (`+44 20 7946 0321 / 0482 / 0157`). **Downgraded from Critical 2026-09-23 after checking the live sites: the value is never rendered to a visitor.** The live homepages and `/contact` pages of all three carry no phone number, no `tel:` link and no `telephone` property in JSON-LD; the only `phone` in the components is the lead form asking the visitor for theirs. Stale config data, no customer-facing impact. Fix before any surface starts displaying it | `{Dentists,Medical,Solicitors}/niche.config.json` |
| M-005 | 2026-04-02 | Config | Medical `globals.css` primary is navy but `niche.config.json` says teal (#0891b2) - visual/config drift | `Medical/web/src/app/globals.css`, `Medical/niche.config.json` |
| I-001 | 2026-04-02 | Infrastructure | `sync_shared_components.py` only syncs lib/config/types - does NOT sync components despite `shared/README.md` claiming it does | `scripts/Monitoring/sync_shared_components.py`, `shared/README.md` |
| I-002 | 2026-04-02 | Config | Solicitors `last_sync: null` - shared components have never been synced via the automated script. Re-confirmed 2026-09-23 | `Solicitors/niche.config.json` |

### Low

| ID | Date | Type | Description | Files |
|----|------|------|-------------|-------|
| G-001 | 2026-09-23 | Content | **17 duplicate-title pairs (34 posts): 16 on generalist, 1 on Solicitors.** Each pair shares an identical `title`, category and publish date on near-identical slugs. Live-verified: both `/blog/bookkeeping-and-compliance/bookkeeping-records-limited-company-6-years-hmrc` and `.../bookkeeping-records-limited-company-6-years` return 200 and carry the same question as their H1, differing only in capitalisation. **Downgraded from High to Low 2026-09-23 on traffic evidence: all 34 posts together took 2,009 impressions and 95 clicks in 28 days, and only 4 of the 17 pairs have both pages earning anything at all.** Real duplication, but it is costing almost nothing, so it is tidy-up work rather than a priority. S-005 is folded in here | `{generalist,Solicitors}/web/content/blog/*.md` |
| X-010 | 2026-09-23 | Content | Category name casing drift inside one slug: Property carries both "Incorporation & Company Structures" and "Incorporation and Company Structures", plus two more pairs; Dentists has five pairs ("Practice Finance" / "Practice finance" and similar). No routing impact - `slugifyCategory()` collapses them and `getAllCategories()` picks the title-cased variant for display in every case - but the frontmatter is inconsistent and the next writer copies whichever they see | `{Property,Dentists}/web/content/blog/*.md` |

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

### Closed at the 2026-09-23 estate audit

Each of these was re-checked against the code or the files on disk on 23 September 2026 and found
already fixed. They had sat in the Open tables since 2 or 9 April.

| ID | Date Found | Date Resolved | Description | Evidence checked 2026-09-23 |
|----|-----------|---------------|-------------|------------------------------|
| P-007 | 2026-04-09 | by 2026-09-23 | IncorporationCostCalculator hardcoded corporation tax at 19% | `Property/web/src/lib/corpTax.ts` now implements the full regime: `SMALL_PROFITS_RATE 0.19`, `MAIN_RATE 0.25`, limits 50,000 / 250,000 and marginal relief at 3/200. The calculator no longer holds a rate at all; it calls `computeIncorporation()` which calls `corporationTax()` |
| P-008 | 2026-04-02 | by 2026-09-23 | CGT rate inconsistency: some posts cited 18%/28% residential | All 29 Property posts mentioning 28% were scanned in context. Every one is a historical or foreign reference (the 2024 reduction, Spanish rates, a combined 28-48% extraction rate). One of the two posts named in the original entry, `london-property-accountant.md`, no longer exists |
| M-001 | 2026-04-02 | by 2026-09-23 | All 46 Medical posts had empty canonical URLs | Medical now has 88 posts and **0** blank canonicals. Separately, the 488 posts on the newer sites that carry no `canonical` key are not this bug: the key is absent rather than empty, so `post.canonical ?? <built URL>` fires correctly |
| M-002 | 2026-04-02 | by 2026-09-23 | "GP Tax & Accounts" category held 30 of 46 Medical posts (65%) | Now 18 of 88 (20%). Largest Medical category is GP Practice Management at 20 |
| M-004 | 2026-04-02 | by 2026-09-23 | Medical had no Twitter card metadata on any non-blog page | 21 of 42 `page.tsx` files now carry it, and the 21 without are admin, embed, book, complete and thank-you routes, which should not have social metadata |
| S-001 | 2026-04-02 | by 2026-09-23 | Solicitors location pages double-JSON.stringify LocalBusiness schema | The page now renders `<JsonLd data={localBusinessSchema} />`; `schema/serialize.ts` stringifies once and escapes `</`. No `JSON.stringify` remains in the page |
| S-002 | 2026-04-02 | by 2026-09-23 | Blog index linked to `/blog/structure-incorporation` with no hub page | The static hub `Solicitors/web/src/app/blog/structure-incorporation/` exists and 9 posts sit in that category. A `[category]` dynamic route also covers every category without a static hub, on Solicitors and Dentists |
| S-003 | 2026-04-02 | by 2026-09-23 | Solicitors "Structure & Incorporation" category had only 1 post | Now 9 |
| X-003 | 2026-04-02 | superseded 2026-09-23 | BlogPosting schema set `dateModified` = `datePublished` on all posts | No longer true estate-wide: Property and Medical use `post.dateModified ?? post.date`, and ten further sites use `post.updatedDate || post.date`. What remains is narrower and is now tracked as **S-004** (Solicitors hardcodes it) and **X-006** (305 posts whose `dateModified` the loader never reads) |
| X-004 | 2026-04-02 | by 2026-09-23 | `image` empty on all posts, so BlogPosting carried no image | Every one of the 17 sites falls back to `buildOgImageUrl()` when `post.image` is blank, and every site has a live `/api/og` route to serve it. The 923 posts with a blank `image` field therefore still emit an image in schema |
| D-002 | 2026-04-02 | superseded 2026-09-23 | 11 of 55 Dentists posts had zero outbound internal blog links | Re-measured as 92 of 223 on Dentists and 367 estate-wide. Re-opened at the correct scope as **X-007** |
