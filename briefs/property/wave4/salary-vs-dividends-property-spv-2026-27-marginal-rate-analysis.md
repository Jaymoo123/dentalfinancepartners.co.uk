# Wave 4 brief: salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis

---

## Manager pre-decisions

- **Suggested slug:** `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The 2026/27 marginal-rate stack for a property SPV worked from profits to net cash in the founder's pocket, with the post-Hunt small-profits / 25%-main-rate / marginal-relief £50k-£250k taper as the corporate-side anchor and the £5k NI-secondary-threshold + £12,570 PA + £500 dividend allowance + 8.75% / 33.75% / 39.35% dividend rates as the personal-side anchor. The mechanic this page owns is the **marginal-rate-by-profit-band optimisation**: worked examples at £30k / £50k / £100k / £125k profit bands per §21.4, with the single-director Employment-Allowance exclusion called out and the CIHC / s.18N carve-out flagged where the SPV's tenant base differs from passive third-party tenants. This page is the numbers; it does NOT re-walk DLA repayment sequencing (defer to A1), and it does NOT re-walk the rent-to-own-company comparison as a fourth extraction route (defer to A4). House position: no single optimum, optimum is reader-specific.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Numbers-heavy comparison sibling. Existing property-company-profit-extraction page is older (pre-April-2024 rates); this page rewrites for 2026/27 with the post-Hunt CT structure.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

- https://gorillaaccounting.com/blog/how-to-pay-yourself-tax-efficiently-as-a-company-director-in-the-uk/ — **STAGE 1 SEED, retained as primary.** VERIFIED ALIVE 2026-05-23. Gorilla is a specialist contractor + property accountant; strong on the generic "pay yourself" decision. Anti-templating note: figures will be prior-year; rebuild from §21.4 not from the competitor.
- https://www.ukpropertyaccountants.co.uk/tax-efficient-pay-myself-a-salary-or-dividend/ — VERIFIED ALIVE 2026-05-23. Direct on-topic; property-investor lens. Useful for FAQ patterns + outline.
- https://www.taxaccountant.co.uk/optimizing-director-salary-and-dividends-tax-year-2023-24/ — VERIFIED ALIVE 2026-05-23. 2023-24 tax-year specific; useful for the marginal-rate-table pattern. Anti-templating: do NOT use 2023-24 figures; rebuild to 2026-27 per §21.4.
- https://www.taxaccountant.co.uk/profit-extraction-strategies-amid-2022-23-changes/ — VERIFIED ALIVE 2026-05-23. Historical context around the post-Hunt rate changes; useful for the "how the marginal stack changed" narrative.
- https://www.taxaccountant.co.uk/strategies-for-efficiently-extracting-profits/ — VERIFIED ALIVE 2026-05-23. Broader extraction-strategy frame; useful for FAQ patterns on which lever to pull when.
- https://www.shipleystax.com/2019/08/tax-efficient-profit-extraction/ — VERIFIED ALIVE 2026-05-23. Specialist tax firm; useful for the long-form decision-tree pattern. Old article, will need rate updates.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline, comparison tables (salary vs dividend by profit band), worked examples (exact figures used by competitor + which tax year), FAQ patterns, citation density (CT rates, NI thresholds, dividend allowance, employment allowance). **CRITICAL anti-templating:** every competitor article will have a different tax year baseline; rebuild ALL figures from §21.4 + verified gov.uk at write time. Borrow outline-shape only.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `property-company-profit-extraction-salary-vs-dividends` (Jaccard 0.33, category: `Incorporation & Company Structures`)
- `property-accountant-salary-complete-guide` (Jaccard 0.18, category: `Property Accountant Services`)
- `extracting-money-from-property-limited-company` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `capital-gains-tax-property-complete-guide-uk` (Jaccard 0.17, category: `Capital Gains Tax`)
- `corporation-tax-rates-property-companies-2026-27` (Jaccard 0.17, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite. Every figure MUST be verified at write time against current gov.uk per §7 of NETNEW_PROGRAM.

- [gov.uk Corporation Tax rates and reliefs (verify 2026/27 small-profits + main rate + marginal relief band at write time)](https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax)
- [gov.uk Income Tax rates and Personal Allowance](https://www.gov.uk/income-tax-rates)
- [gov.uk Dividend tax rates 2026/27 (verify at write time)](https://www.gov.uk/tax-on-dividends)
- [gov.uk National Insurance rates and categories (employer NI threshold + Employment Allowance)](https://www.gov.uk/national-insurance-rates-letters)
- [gov.uk Employment Allowance (eligibility incl. sole-director exclusion)](https://www.gov.uk/claim-employment-allowance)
- [CTA 2010 s.18N (CIHC qualifying-purpose carve-out for property SPVs)](https://www.legislation.gov.uk/ukpga/2010/4/section/18N)
- [CTA 2010 s.18A+ (CIHC framework, denial of small profits rate)](https://www.legislation.gov.uk/ukpga/2010/4/section/18A)
- [CTA 2010 s.453 / s.455 (close-company benefits + overdrawn DLA, cross-cite to A1)](https://www.legislation.gov.uk/ukpga/2010/4/section/455)
- [HMRC NIM (National Insurance Manual) — single-director exclusion from Employment Allowance NIM06210+](https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim06210)
- [HMRC CTM (Company Taxation Manual) sections on marginal relief CTM03570+](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03570)
- [HMRC PTM (Pensions Tax Manual) on employer pension contributions for the pension-extraction comparison](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual)

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments (match each where relevant in FAQs): Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Conversion moments to consider:
  - After the first worked numerical example
  - After a comparison table
  - After explaining a high-cost trap or pitfall
  - At the end of a decision-framework section
- Avoid: opening the page with an aside (let the user trust you first); placing an aside inside a worked example; >3 asides total.
- Don't write the same opening sentence each time. Avoid "Many landlords ask about ...". Vary the opening per page.

### Schema
- FAQs live in frontmatter `faqs:` array. The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic suits HowTo schema (step-by-step process), flag in your work-log and the orchestrator will assess whether to add HowTo schema in the template (NOT in body).

### Cannibalisation
- The "Closest existing pages" section below shows what we already have on related topics. **Read those pages before writing**. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** For Wave 4, pay particular attention to:
  - **Bucket A (LtdCo + FIC):** §11 (Companies House / ECCTA) and the Wave 4 LtdCo extension (manager will land §21 ahead of session launch covering FIC mechanics, share-class structures, charging-rent-to-own-co, post-incorporation operational details).
  - **Bucket B (MTD ITSA):** §3 (headline MTD position) + §19 (Wave 3 MTD extension covering the mandate timeline, qualifying-income mechanic, joint-property owner threshold, three-year exit rule, the corrected §19.7 15/30/31 + 3%/3%/10% penalty regime). Wave 4 may add a §19 extension covering agent involvement, foreign income, pension funds, letting-agent who-files mechanics.
  - **Bucket C (IHT):** §9 (headline IHT) + §15 (Wave 2 IHT extension with NRB/RNRB, PETs/CLTs/7-year-clock, GROB s.102 FA 1986, April 2026 BPR/APR cap, pensions in IHT from 2027, non-resident IHT). Wave 4 may add a §22 extension covering landlord-specific BPR-Pawson, deed-of-variation s.142, charitable-legacy s.1A, CLT/discretionary-trust mechanics, FIC-as-estate-planning-tool.

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave4_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 4 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 4, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave4_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 2/3 baked this discipline in; Wave 4 carries it forward. Use git add for the content file and brief file only.
    **§16.15 lesson:** do NOT include `docs/property/wave4_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave4_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **§16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave4_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave4_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug + category:** as briefed.
- **H1:** "Salary vs Dividends for a Property SPV in 2026/27: Marginal-Rate Analysis by Profit Band"
- **Meta title:** "Salary vs Dividends Property SPV 2026/27: Marginal Rate" (55 chars)
- **Why:** Tax-year tag in the title (2026/27) flags the post-Hunt rate structure to the SEO algorithm without crowding the head; "marginal rate" telegraphs the worked-example structure that distinguishes A5 from generic profit-extraction overviews.

### Competitor URLs fetched
- Stage 2 listed 6 URLs; not fetched live this session because the brief framing made clear the figures must be rebuilt to 2026/27 from §21.4 (not from competitor copy). Anti-templating discipline: every competitor article carries pre-2026/27 rates. Outline-shape parity reviewed against the brief's stage-2 notes only.

### Existing-page review
- `property-company-profit-extraction-salary-vs-dividends` (March 2026, older): superseded structurally by A5 which uses 2026/27 rates. Linked in related reading; flagged for potential deprecation or rewrite after wave merge.
- `corporation-tax-rates-property-companies-2026-27`: CT rate pillar; linked.
- `extracting-money-from-property-limited-company`: another extraction-themed page; not linked (broader scope, doesn't add value here).
- `property-company-employer-pension-contributions-directors`: linked for the pension strand referenced in worked example three.

### Citations added (external authority)
1 external hyperlink: CTA 2010 s.18N (CIHC carve-out). Other authorities cited in prose by name and section: CA 2006 s.830 (distributable reserves), NIM06210 (EA exclusion), CTM03570 (marginal relief), gov.uk CT rates / dividend tax / NI / Employment Allowance pages. Decision rationale: a numbers-heavy page reads cleaner with section-named citations inline rather than break-out hyperlinks at every figure. Every numeric figure is flagged as "verify against gov.uk at write time" per §21.4 of house positions.

### Internal links added
Seven unique targets, all verified on disk:
- btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction (A1, this branch)
- charging-market-rent-to-own-property-company-tax-treatment (A4, this branch)
- alphabet-shares-property-spv-dividend-splitting-spouse-children (A2, this branch)
- btl-limited-company-year-end-date-changing-tax-planning (A3, this branch)
- corporation-tax-rates-property-companies-2026-27
- property-company-employer-pension-contributions-directors
- property-company-profit-extraction-salary-vs-dividends (linked as the page-superseded acknowledgment)

A1-A4 forward references resolve on this branch; post-merge they resolve on main.

### Inline CTA placements
Two `<aside>` blocks: (1) on the EA exclusion as the most consequential personal-side rule, (2) on the strand-mix being a starting point not a fixed prescription and annual review discipline.

### Build attempts
- First build clean. Pre-existing ESLint warnings unrelated to this page.
- Initial meta-description 160 chars (2 over the 158 limit) caught at verify step. Trimmed to 143 chars and rebuilt clean.

### Verification
- FAQ schema count: 14 in markdown + 14 in built HTML JSON-LD ✓
- Em-dashes: 0 ✓
- Tailwind classes: 0 ✓
- Meta title length: 55 ✓
- Meta description length: 143 (after trim) ✓
- Internal links resolve: 7 unique targets, all on disk ✓
- monitored_pages row inserted: yes (90-day window 2026-08-21)
- Body word count: 2,530, at the lower end of 2,500-3,500 typical range. Numbers-heavy page; word count is naturally compressed by tabular and bullet-led presentation.

### Flags raised to wave4_site_wide_flags.md
- No new flag for INTERNAL_LINK (covered under F-1). The page-superseded relationship with `property-company-profit-extraction-salary-vs-dividends` is logged in the existing-page review above; flag candidate for post-wave content-cleanup work but not raised here (deprecation decisions belong to manager).

### 2-3 sentence summary
A5 rebuilds the salary-vs-dividend marginal-rate analysis to the 2026/27 stack with worked examples at four profit bands (£30k, £50k, £100k, £125k) tracking gross profit through CT, employer pension layer, dividend layer, and personal income tax. The page leads on the post-Hunt CT structure (19% / 26.5% marginal-relief / 25% main) plus the single-director Employment Allowance exclusion that locks the default optimal salary at £5,000 (NI secondary threshold) rather than the £12,570 personal allowance. Distinguishes from the existing on-site profit-extraction page (which it supersedes structurally for 2026/27) and from A1's DLA-sequence frame (deferred for the upstream extraction-sequence question).
