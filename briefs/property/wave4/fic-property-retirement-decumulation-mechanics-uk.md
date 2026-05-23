# Wave 4 brief: fic-property-retirement-decumulation-mechanics-uk

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/fic-property-retirement-decumulation-mechanics-uk.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/fic-property-retirement-decumulation-mechanics-uk

---

## Manager pre-decisions

- **Suggested slug:** `fic-property-retirement-decumulation-mechanics-uk`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The FIC as a **retirement income engine during life** for a property-portfolio founder, with three coordinated mechanics: (i) preference-share dividend coupons producing a predictable £-coupon income stream (frozen value, no upside to founder), (ii) redeemable-share amortisation returning capital tax-free to the share-redemption-extent, (iii) DLA credit-balance repayment as tax-free runway from the s.162 incorporation transfer. The mechanic this page owns is the **sequencing**: how these three strands are layered with state pension and any private-pension drawdown to keep marginal rate below the 33.75% / 39.35% dividend cliffs across the founder's life. Anti-templating boundary: this page is income-now during the founder's life. It is NOT the IHT value-freeze framing (that's C7); it does NOT walk the share-gift PET at point of gift (that's A9); it does NOT cover the blended-family use case (that's A10); it does NOT walk articles-drafting (that's A6). If session-time drafting drifts into "and this also saves IHT because growth accrues to children", pull back: cross-link to C7 and stay on the income mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** FIC sub-thread, retirement angle. Cross-bucket coordination flag: differentiate clearly from C7 (FIC as estate-planning tool).

---

## Competitor URLs (Stage 2 validated 2026-05-23)

- https://www.tlpi.co.uk/case-studies/hands-off-retirement-income-and-family-legacy-fic — **STAGE 1 SEED, retained as primary.** VERIFIED ALIVE 2026-05-23. TLPI is a specialist FIC firm; this case study is the canonical hands-off-retirement-income FIC scenario. Anti-templating note: TLPI commercial bias to flag; do NOT replicate TLPI's "FIC is best for everyone" positioning, stay on the mechanic.
- https://www.tlpi.co.uk/case-studies/fic-for-income-returns-and-protected-legacy — VERIFIED ALIVE 2026-05-23. Complementary case study; income-returns angle.
- https://www.tlpi.co.uk/insights/why-you-need-a-family-investment-company — VERIFIED ALIVE 2026-05-23. The pitch page; useful as a reference for how TLPI orders the income mechanics.
- https://uklandlordtax.co.uk/tax-guide/property-family-investment-company-and-inheritance-tax/ — VERIFIED ALIVE 2026-05-23. Has a section on income-during-life vs IHT-on-death framing; useful for the boundary the page must police vs C7.
- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/ — VERIFIED ALIVE 2026-05-23. Comprehensive FIC explainer; useful for the outline pattern + FAQ density.
- https://uklandlordtax.co.uk/family-investment-companies-faqs/ — VERIFIED ALIVE 2026-05-23. Direct FAQ source; useful for FAQ phrasing parity on retirement-income questions.
- https://uklandlordtax.co.uk/disadvantages-of-family-investment-companies-fics/ — VERIFIED ALIVE 2026-05-23. Useful to balance: the page must acknowledge FIC retirement-decumulation downsides (CT-25% at corporate level, dividend tax on extraction, no BPR).

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: outline structure for the income-during-life sub-thread (preference-share coupon, redemption, DLA repayment), case-study structure (TLPI's anonymised personas + numbers — DO NOT reproduce, rebuild), FAQ density on retirement-specific questions ("can my children take the rental income", "what happens to the rental income at age 75", "do I still need a SIPP if I have a FIC"). Borrow outline-shape, NOT figures or sentences.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `fic-vs-discretionary-trust-property-comparison` (Jaccard 0.20, category: `Incorporation & Company Structures`)
- `fic-complete-guide-property-wealth-transfer` (Jaccard 0.17, category: `Incorporation & Company Structures`)
- `foreign-tax-credit-uk-property-overseas-landlords` (Jaccard 0.17, category: `Non-Resident Landlord Tax`)
- `property-investment-tax-uk-complete-guide-2026` (Jaccard 0.17, category: `Landlord Tax Essentials`)
- `incorporating-property-portfolio-uk-2026` (Jaccard 0.14, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite. Retirement-decumulation is a Companies-Act + dividend-tax + DLA + pension page.

- [CA 2006 s.684+ (redeemable shares — power to issue, terms of redemption)](https://www.legislation.gov.uk/ukpga/2006/46/section/684)
- [CA 2006 s.687 (financing of redemption out of profits)](https://www.legislation.gov.uk/ukpga/2006/46/section/687)
- [CA 2006 s.831 (distributions out of profits — load-bearing for preference-share coupon)](https://www.legislation.gov.uk/ukpga/2006/46/section/831)
- [CTA 2010 s.455 (loans to participators — anchors why DLA debit balances are not a retirement-income route)](https://www.legislation.gov.uk/ukpga/2010/4/section/455)
- [CTA 2010 s.18N (CIHC qualifying-purpose carve-out, anchors §21.5 boundary)](https://www.legislation.gov.uk/ukpga/2010/4/section/18N)
- [gov.uk Dividend tax rates 2026/27 (verify at write time)](https://www.gov.uk/tax-on-dividends)
- [HMRC PTM (Pensions Tax Manual) main index — for the SIPP-comparison context](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual)
- [HMRC EIM26101+ (beneficial loans, official rate of interest, relevant to DLA-credit-balance interest paid to founder)](https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim26101)
- [HMRC CTM (Company Taxation Manual) on share redemption and distributable profits](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual)
- [HMRC SAIM5070+ (income from redemption of shares — savings and investment income)](https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual/saim5070)
- [HMRC IHTM (Inheritance Tax Manual) — for the *Pawson* / BPR cross-reference to C7 boundary](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual)

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

## Per-page work-log

### Decisions
- **Slug / category:** per brief, no override.
- **H1:** "Using a Property FIC for Retirement Income: Three-Strand Sequencing Across Decumulation"
- **Meta title (48 chars):** "FIC Retirement Income for Property Founders (UK)"
- **Meta desc (146 chars):** trimmed twice from initial draft to land within 158-char limit.
- **Why these:** title leads with "FIC Retirement Income for Property Founders" + "UK" qualifier. H1 specifies "Three-Strand Sequencing" as the framing-differentiator-naming token. The sequencing frame distinguishes from a generic FIC-explainer page.

### Competitor outline takeaway
TLPI's hands-off-retirement-income case study uses the "three-strand" pattern implicitly but as marketing case-study, not as a sequencing walkthrough. UKLandlordTax's FIC + IHT guide blurs the income-now vs IHT-on-death framing; A8 deliberately polices the boundary by repeatedly cross-referencing C7 (FIC-as-IHT-tool) and A9 (share-gift PET) as out-of-scope, then walking the strand mix as an income-now exercise. UKPropertyAccountants comprehensive FIC explainer was the FAQ-density reference.

### Cannibalisation
- Closest sibling A6 (articles drafting) and A7 (governance) shipped same session; A8 forward-links to both for the operational mechanics that the income strands depend on.
- fic-complete-guide-property-wealth-transfer (pillar) covers FIC income at high level; A8 goes deeper specifically on the retirement-decumulation phase with the 4-age sequencing.
- A8's BOUNDARY against C7 (FIC IHT value-freeze, Wave 4 Session C bucket) is policed in opening, mid-body, and the closing dedicated "boundary" section. Both will cross-link at wave merge.
- A8's BOUNDARY against A9 (FIC share-gift PET) is policed by cross-referencing "share-gift PET at point of gift covered separately" pattern throughout.

### Citations
1. TCGA 1992 s.162 (incorporation relief) — legislation.gov.uk
2. CA 2006 s.684 (redeemable shares) — legislation.gov.uk
3. CA 2006 s.830 (distributable reserves) — legislation.gov.uk
4. CTA 2010 s.1000 (distributions definition) — legislation.gov.uk
5. HMRC EIM26101 (beneficial loans, official rate of interest) — gov.uk
6. Plus narrative references: CTA 2010 s.453 (close-company interest), CA 2006 ss.687-688 (redemption funding sources), ITTOIA 2005 s.624/s.626 (settlements + spouse exception via cross-link), CTA 2010 s.18-19 + s.18N (CT rates and CIHC).
Total: 5 hyperlinked authority citations.

### Internal links (body, distinct)
1. /blog/incorporation-and-company-structures/fic-articles-of-association-property-control-mechanics (A6, shipped same session) — articles drafting reference (2 in-body references)
2. /blog/incorporation-and-company-structures/fic-property-corporate-governance-board-meetings-resolutions-discipline (A7, shipped same session) — governance discipline reference
3. /blog/incorporation-and-company-structures/alphabet-shares-property-spv-dividend-splitting-spouse-children — alphabet-share/s.624 cross-reference for spouse-class allocation
Plus 1 FAQ reference to alphabet-shares page in the discretionary-class-by-class FAQ.
4 distinct internal links in body; all targets verified existing on disk.

### Inline CTAs
- Aside 1: after strand-two preference coupon section
- Aside 2: after sequencing 4-age section
Two asides this page (the page is more sequencing-and-figures than the A6/A7 structural pages; brief allows 1-3 asides).

### Build attempts
Single run, passed clean.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 ↔ 14 ✓
- Em-dashes: 0 ✓
- Tailwind classes: 0 ✓
- Meta title length: 48 (≤62) ✓
- Meta description length: 146 (≤158) ✓ (trimmed from initial 160-char draft)
- Internal links resolve: 3 distinct in-body targets all verified ✓
- monitored_pages row inserted: id 181 ✓
- Body word count: 2,577 (solid mid-band, target was ~3,000 for FIC sub-thread; came in slightly below because the 3-strand-walking + 4-age-sequencing structure is naturally compact; satisfies brief expectation)

### Flags raised
- No new flags. A8's cross-link to C7 (FIC-as-IHT-tool) referenced inline; the wave-close back-patch will hyperlink once C7 ships in Session C bucket.

### Summary
A8 walks FIC as a retirement income engine through three FIC strands (DLA credit-balance tax-free runway; preference share coupon as predictable dividend strand; preference share redemption with split capital + distribution treatment) layered with state pension and SIPP drawdown. Default sequencing worked at four founder ages (65 / 70 / 75 / 85) against the three marginal-rate cliffs (£50,270 / £100,000 PA taper / £125,140). Boundary explicitly policed against C7 (IHT value-freeze) and A9 (share-gift PET) by repeated in-body cross-references and a dedicated closing "boundary" section. Anti-templating against A6 + A7 by income-strand-led structure rather than clause-text or operational-rhythm structure.
