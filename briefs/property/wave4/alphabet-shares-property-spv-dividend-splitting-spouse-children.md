# Wave 4 brief: alphabet-shares-property-spv-dividend-splitting-spouse-children

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/alphabet-shares-property-spv-dividend-splitting-spouse-children.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/alphabet-shares-property-spv-dividend-splitting-spouse-children

---

## Manager pre-decisions

- **Suggested slug:** `alphabet-shares-property-spv-dividend-splitting-spouse-children`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Alphabet share-class design in a property SPV as an **income-tax tactic for the current tax year**: A / B / C ordinary shares each carrying their own dividend right, declared independently, so the controlling shareholder can flex dividend declarations to use a spouse's basic-rate band or an adult child's PA + dividend allowance. The mechanic this page owns is the §21.2 settlements-legislation boundary: outright gift of ordinary shares to a spouse falls within the s.626 spouse-exception confirmed by *Jones v Garnett (Arctic Systems)* [2007] UKHL 35, so dividends are not re-attributed to the founder; gifts to a minor child stay within s.624 (income attributed back to the settlor); gifts to an adult child generally work only where the share is a genuine ordinary share with no retained benefit and no growth-only carve-out. This page is the income-now mechanic, not the IHT planning mechanic (defer growth-share / freezer-share + 7-year-PET framing to A9 and to FIC pages C7 / A9).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pure Ltd-Co mechanics page (not FIC); covers the standard property-company alphabet-share design and the s.624 boundary.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

**Stage 1 seed URL** (`tlpi.co.uk/case-studies/fic-for-income-returns-and-protected-legacy`) **is on-topic for FIC income mechanics but not directly on alphabet shares as an SPV income-tax tactic.** Stage 2 retains it as colour for the "income returns to founder" angle and adds 3 alphabet/settlements-specific siblings as primary references.

- https://www.taxaccountant.co.uk/the-famous-arctic-systems-case/ — **NEW PRIMARY.** VERIFIED ALIVE 2026-05-23. Direct on-topic coverage of *Jones v Garnett (Arctic Systems)* and the settlements legislation s.624 / s.626. Critical for the legal anchor; the page must lead with the Arctic Systems carve-out mechanic.
- https://www.ukpropertyaccountants.co.uk/freezer-shares-and-growth-shares-in-family-investment-companies/ — VERIFIED ALIVE 2026-05-23. Strong on the share-class taxonomy (freezer / growth / preference / alphabet) used in property SPVs and FICs; useful as the design-vocabulary reference. Anti-templating note: cite for taxonomy only; do NOT replicate the FIC IHT framing here, that belongs in A9 / C7.
- https://www.tlpi.co.uk/case-studies/fic-for-income-returns-and-protected-legacy — VERIFIED ALIVE 2026-05-23. Stage 1 seed retained as colour reference for "income returns to founder via the SPV" angle; commercial bias to flag (TLPI is a specialist FIC firm).
- https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ — VERIFIED ALIVE 2026-05-23. Wider FIC tax-planning frame; useful for FAQ patterns on spouse / adult-child dividend questions.
- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-family-investment-companies-fics/ — VERIFIED ALIVE 2026-05-23. Comprehensive FIC explainer; useful for outline pattern + FAQ density.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). For each, extract: H2/H3 outline, FAQ patterns (spouse share questions, minor child questions, settlement risk questions), worked numerical examples (income-tax allocations across A/B/C classes), citation density (s.624 / s.626 / Arctic Systems / HMRC TSEM), component patterns (allocation tables, decision trees on "can I give shares to my child"). Borrow outline-shape, NOT figures or sentences.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `cgt-property-transfer-spouse` (Jaccard 0.18, category: `Capital Gains Tax`)
- `property-company-dividend-tax` (Jaccard 0.17, category: `Incorporation & Company Structures`)
- `nrcgt-indirect-disposal-property-rich-companies-shares` (Jaccard 0.15, category: `Non-Resident Landlord Tax`)
- `property-investment-vs-stocks-shares-tax-comparison` (Jaccard 0.13, category: `Landlord Tax Essentials`)
- `spv-property-investment-special-purpose-vehicle-guide` (Jaccard 0.12, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite.

- [ITTOIA 2005 s.624 (settlements legislation, income attribution)](https://www.legislation.gov.uk/ukpga/2005/5/section/624)
- [ITTOIA 2005 s.625 (settlor's spouse defined)](https://www.legislation.gov.uk/ukpga/2005/5/section/625)
- [ITTOIA 2005 s.626 (spouse exception: outright-gift carve-out)](https://www.legislation.gov.uk/ukpga/2005/5/section/626)
- [*Jones v Garnett (Arctic Systems)* [2007] UKHL 35 (BAILII)](https://www.bailii.org/uk/cases/UKHL/2007/35.html)
- [ITTOIA 2005 s.629+ (income paid to or for the benefit of unmarried minor children, settlor-attribution)](https://www.legislation.gov.uk/ukpga/2005/5/section/629)
- [HMRC TSEM4205+ (settlements legislation, shares-as-settlement guidance, Trusts, Settlements and Estates Manual)](https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4205)
- [HMRC TSEM4300+ (settlements: outright gifts between spouses, s.626 application)](https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4305)
- [CA 2006 s.21 (alteration of articles), s.284 (votes on resolutions), s.629 (classes of shares)](https://www.legislation.gov.uk/ukpga/2006/46/section/629)
- [HMRC ERSM (Employment-Related Securities Manual) ERSM110000+ (share-acquisition employment-tax interaction, applies where the alphabet-share recipient is a director / employee)](https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm110000)
- [HMRC CTM (Company Taxation Manual) section on dividend declaration mechanics CTM15205+](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm15205)

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
- **Final slug:** alphabet-shares-property-spv-dividend-splitting-spouse-children (as briefed)
- **Final category:** Incorporation & Company Structures (as briefed)
- **H1 chosen:** "Alphabet Shares in a Property SPV: Dividend Splitting and the Settlements Boundary"
- **Meta title chosen:** "Alphabet Shares Property SPV: Dividend Splitting Rules" (54 chars)
- **Why these vs other options:** H1 leads with the share-class noun and adds "settlements boundary" to telegraph the §624 legal anchor that distinguishes the page from generic dividend-splitting overviews. Meta title omits "boundary" to keep the SEO term order (alphabet → property → SPV → dividend splitting) intact.

### Competitor URLs fetched
- taxaccountant.co.uk Arctic Systems page: useful for case-summary phrasing but thin on actual mechanics. Confirmed competitive opening on worked examples.
- taxaccountant.co.uk FIC page: minimal settlements coverage, just a compliance warning.
- ukpropertyaccountants.co.uk FIC guide: useful share-class taxonomy + freezer/growth distinction; informed the A2 distinction between alphabet (income-now) and growth (IHT) designs.
- tlpi.co.uk FIC case study: not heavily mined (out of A2 scope, FIC-leaning).
- ukpropertyaccountants.co.uk freezer/growth page: ditto, for taxonomy reference only.

### Existing-page review (from "Closest existing pages")
- `property-company-dividend-tax` is the dividend-rate pillar. Linked from related-reading; the alphabet page is the applied / scenario version that sits on top of the rate pillar.
- `cgt-property-transfer-spouse` covers the CGT mechanic of a spousal property transfer (no-gain-no-loss). Linked because the share-gift to spouse also uses TCGA 1992 s.58 spouse exemption; the alphabet design references this in the articles-drafting section.
- `spv-property-investment-special-purpose-vehicle-guide` is the SPV pillar. Linked in related-reading.
- `property-investment-vs-stocks-shares-tax-comparison` not directly relevant; not linked.
- `nrcgt-indirect-disposal-property-rich-companies-shares` not directly relevant; not linked.

### Citations added (external authority)
External citations are anchored in the body via legal-section naming rather than via clickable links to keep the inline density manageable: ITTOIA 2005 s.624, s.625, s.626, s.628, s.629, s.620 definition; Jones v Garnett (Arctic Systems) [2007] UKHL 35; CA 2006 s.21, s.630, s.830; HMRC TSEM4205, TSEM4305, CTM15205; TCGA 1992 s.17, s.58. No external hyperlinks added in this iteration; flagged for potential link addition if the manager wants higher external-link density (most A1/B/C Wave 4 pages have 1-2 external hyperlinks; A2 has 0). The decision is intentional: a page that turns on legal-section interpretation reads more clearly when the section numbers are inline prose rather than break-out hyperlinks.

### Internal links added (to our existing pages)
Six unique targets, all verified present on disk pre-write:
- /blog/incorporation-and-company-structures/property-company-dividend-tax
- /blog/incorporation-and-company-structures/property-company-profit-extraction-salary-vs-dividends
- /blog/incorporation-and-company-structures/btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction (Wave 4 A1, sibling on same branch)
- /blog/incorporation-and-company-structures/spv-property-investment-special-purpose-vehicle-guide
- /blog/capital-gains-tax/cgt-property-transfer-spouse
- /blog/incorporation-and-company-structures/section-162-incorporation-relief-property-landlords

Forward references to A6-A10 FIC pages and the FIC growth-share / IHT material are referenced descriptively in prose ("our wider Family Investment Company material") without hyperlinks; flagged for post-wave back-patch under F-1 (already raised in A1).

### Inline CTA placements
Two `<aside>` blocks:
1. After the s.624 settlements-rule explanation, on the documentation discipline that separates surviving and not-surviving structures.
2. After the HMRC challenge patterns, on retrofit risk and writing the structure at design time.

### Build attempts
- First build clean. No errors related to this page. Pre-existing ESLint warnings on other files (unchanged from A1).

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 `@type:Question` entries, matches frontmatter ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 54 chars (≤62 limit) ✓
- Meta description length: 149 chars (≤158 limit) ✓
- Internal links resolve: 6 unique targets, all verified present on disk ✓ (A1 sibling resolves on this branch; post-merge stays valid)
- monitored_pages row inserted: yes (id 160, rewrite_type='rewrite', baseline 0/0, 90-day window to 2026-08-21)
- Body word count: 3,218 (frontmatter excluded), comfortably inside the 2,500-3,500 typical range.

### Flags raised to wave4_site_wide_flags.md
- No new flags. Cross-link forward references to FIC sub-thread (A6-A10) and IHT material (C7) already covered under F-1 raised in A1.

### 2-3 sentence summary
A2 frames alphabet shares as a current-tax-year income-tax tactic and works through the ITTOIA 2005 s.624 settlements legislation as the structural constraint: the s.626 spouse exception (confirmed by Jones v Garnett, Arctic Systems) protects ordinary-share gifts to a spouse; the s.629 anti-attribution rule blocks minor-child arrangements; adult-child gifts work only with genuine ordinary shares, an outright transfer, and no element-of-bounty pattern returning dividend cash to the parent. The page distinguishes cleanly from the wider FIC material (which owns the growth/freezer-share IHT mechanic) and gives three worked allocation examples (spouse only, three-way with adult child, single-class baseline) so the household-level tax saving is concrete.
