# Wave 4 brief: iht-charitable-legacy-property-portfolio-36-percent-reduced-rate

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-charitable-legacy-property-portfolio-36-percent-reduced-rate.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-charitable-legacy-property-portfolio-36-percent-reduced-rate

---

## Manager pre-decisions

- **Suggested slug:** `iht-charitable-legacy-property-portfolio-36-percent-reduced-rate`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Net-new on our site. The page owns the Sch 1A IHTA 1984 mechanics applied to landlord estates: where 10% or more of the relevant "components of the estate" (general / survivorship / settled, per Sch 1A) pass to qualifying charity, the IHT rate on that component drops from 40% to 36%. For a portfolio landlord at £2m+, the maths often makes the gift "self-funding" because the 36% saving on the bigger residue net of the charity gift is close to (and at some break-points exceeds) the size of the charity gift itself. The page walks the components-test, the merger election (Sch 1A para 7) where a testator wants to apply the 10% threshold across combined components rather than each separately, specific-property bequests (gifting the £200k BTL to charity) vs residue-share bequests (gifting 10% of residue), and the break-point worked example. Cross-link to Wave 4 C5 (deed of variation) which can be used post-death to trigger the 36% rate where the original will did not.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Net-new on our site; specific Sch 1A mechanic applied to landlord estates.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the 10% threshold (per component or combined?), treatment of the merger election (Sch 1A para 7), treatment of the break-point maths. Differentiator: landlord-portfolio worked example at £2m+ rather than will-writer-generic explainer.

- https://www.boltburdon.co.uk/blogs/charity-begins-at-home-how-including-a-charitable-gift-in-your-will-can-reduce-inheritance-tax — Stage 1 seed. **Verification note: 2026-05-23 fetch returned connection-reset (CDN bot protection at TCP layer). URL is in Stage 1 selection and in v2 working set; session to verify in-browser at write time.** Legal-services firm, strong charity-legacy content.
- https://www.taxaccountant.co.uk/charitable-legacy-inheritance-tax/ — Sibling within v2 working set domain; session to verify at write time. Likely covers the Sch 1A mechanic from a tax-accountant angle.
- https://www.mytaxaccountant.co.uk/post/iht-reduced-rate-charitable-giving — Sibling within v2 working set; session to verify at write time. Useful for the FAQ phrasing baseline.
- https://www.ukpropertyaccountants.co.uk/inheritance-tax-planning-for-property-investors/ — Property-tax-specialist domain; useful for the portfolio-context framing.

**Borrowable patterns:** Bolt Burdon (when accessible) leads with the "charity begins at home" angle on rate-reduction. Our differentiator: a worked break-point example on a specific landlord estate. E.g. £2.0m estate with no charity gift = £600k IHT (40% on £1.5m above £500k spousal NRB+RNRB position); with a £200k gift to charity, the chargeable component is £1.3m at 36% = £468k; net to family from £2.0m moves from £1.4m to £1.332m. Show readers the actual cost to family of triggering the 36% rate, and the inflection above which charity gift is self-funding for the family.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `incorporating-property-portfolio-uk-2026` (Jaccard 0.20, category: `Incorporation & Company Structures`)
- `how-to-value-rental-property-portfolio-tax-purposes` (Jaccard 0.17, category: `Portfolio Management`)
- `incorporation-case-study-5-property-portfolio-analysis` (Jaccard 0.15, category: `Incorporation & Company Structures`)
- `property-portfolio-review-checklist-landlords-2026` (Jaccard 0.15, category: `Portfolio Management`)
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Jaccard 0.15, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- IHTA 1984 Sch 1A (reduced rate of tax where 10% or more of net estate left to charity): https://www.legislation.gov.uk/ukpga/1984/51/schedule/1A
- IHTA 1984 s.23 (gifts to charities — full exemption on the gift): https://www.legislation.gov.uk/ukpga/1984/51/section/23
- IHTA 1984 s.142 (deed of variation, to retro-engineer the 36% trigger): https://www.legislation.gov.uk/ukpga/1984/51/section/142
- HMRC IHTM43000+ (charitable rate overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm43001
- HMRC IHTM44000+ (10% test mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm44000
- HMRC IHT430 (claim for charitable rate reduction): https://www.gov.uk/government/publications/inheritance-tax-reduced-rate-of-inheritance-tax-iht430
- gov.uk reduced rate guidance: https://www.gov.uk/government/publications/inheritance-tax-reduced-rate-calculator-iht430
- IHTA 1984 s.7 (rate of charge, baseline for 40% comparison): https://www.legislation.gov.uk/ukpga/1984/51/section/7
- Charity Commission "find a charity" register (for qualifying-charity verification): https://www.gov.uk/find-charity-information
- Sch 1A para 7 (merger election to combine components): https://www.legislation.gov.uk/ukpga/1984/51/schedule/1A (sub-paragraph 7)

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
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave4_site_wide_flags.md

### 2-3 sentence summary
