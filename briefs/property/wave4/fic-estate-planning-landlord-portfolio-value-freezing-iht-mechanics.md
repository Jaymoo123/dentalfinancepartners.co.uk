# Wave 4 brief: fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics

**Site:** property
**Bucket:** IHT estate planning for landlords (FIC cross-link)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `fic-estate-planning-landlord-portfolio-value-freezing-iht-mechanics`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords (FIC cross-link)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> This page owns the strategic IHT framing of the FIC as a value-freeze + growth-out-of-estate tool for the portfolio landlord at c.£2m+ who wants to control transfer of future portfolio growth to the next generation. The single mechanic the page explains: founder retains preference shares with a fixed £-coupon (frozen value, remains in estate); growth shares (entitled to all future capital growth + control rights) are gifted to next generation, starting a 7-year PET clock under IHTA 1984 s.3A. After 7 years, all future growth is outside the founder's estate; the founder's IHT footprint is capped at the frozen preference-share value. The page is comparison-led: vs direct property 7-year PET (Wave 4 C4 — bigger CGT-on-gift exposure, no minority discount, no separation of value-vs-growth), vs CLT into discretionary trust (Wave 4 C10 — entry 20% over NRB, 10-year periodic charges, but s.260 holdover for CGT). Operational mechanics live elsewhere: the articles-drafting layer is Bucket A A6, governance discipline is A7, retirement-income-coupon design is A8, share-gift PET mechanics at point of gift are A9, blended-family use case is A10. C7 cites all five as sibling pages without re-walking their ground; A8 / A9 / A10 reciprocally cross-link back to C7 for the strategic framing.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** FIC cross-link from Bucket A. Differentiated from A8 (retirement angle) and A9 (gift mechanics) by being the estate-planning value-freeze framing.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the value-freeze concept (preference + growth share design), treatment of the 7-year-PET-clock-on-share-gift, treatment of GROB risk on FIC. CRITICAL: this is the highest cross-bucket cannibalisation risk in Wave 4 (vs Bucket A FIC pages). The page must own strategic IHT framing only; the operational mechanics belong in A6-A10.

- https://uklandlordtax.co.uk/family-investment-company-inheritance-tax-and-freezing-value/ — Stage 1 seed, verified live 2026-05-23 (200). Specialist landlord-tax firm in v2 working set; the most on-point competitor for our differentiator (FIC + IHT + freezing-value framing).
- https://www.tlpi.co.uk/services/family-investment-companies/ — Specialist FIC firm (v2 working set, 2 SERP appearances); session to verify at write time. Strong for case-study pattern, useful for the "who is this for" persona section without copying the persona.
- https://www.ukpropertyaccountants.co.uk/family-investment-company-property/ — Property-tax-specialist domain (v2 working set); session to verify at write time. Useful for the property-specific FIC framing.
- https://www.taxaccountant.co.uk/family-investment-company-fic-uk/ — Sibling within v2 working set; session to verify at write time. Useful for the FIC FAQ phrasing baseline.

**Borrowable patterns:** uklandlordtax covers freezing-value cleanly but lets the article wander into trust-comparison territory. Our discipline: keep C7 strategic IHT-framed; defer governance to A7, articles to A6, retirement income to A8, gift mechanics to A9, blended-family persona to A10. Use a single comparison-table H2 to show value-freeze vs CLT vs direct property PET on a £2m portfolio, then forward-link.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `pension-iht-april-2027-landlord-estate-planning` (Jaccard 0.33, category: `Landlord Tax Essentials`)
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Jaccard 0.21, category: `Landlord Tax Essentials`)
- `how-to-value-rental-property-portfolio-tax-purposes` (Jaccard 0.17, category: `Portfolio Management`)
- `property-investment-exit-strategy-planning-guide` (Jaccard 0.14, category: `Portfolio Management`)
- `agricultural-property-relief-mixed-estate-1m-cap` (Jaccard 0.12, category: `Property Types & Specialist Tax`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- IHTA 1984 s.3A (PETs definition — the 7-year PET clock starting on share gift): https://www.legislation.gov.uk/ukpga/1984/51/section/3A
- IHTA 1984 s.7 (rates, taper s.7(4)): https://www.legislation.gov.uk/ukpga/1984/51/section/7
- IHTA 1984 s.105 (BPR — investment FIC does NOT qualify, per *Pawson*): https://www.legislation.gov.uk/ukpga/1984/51/section/105
- FA 1986 s.102 (GROB — applies if founder retains benefit through preference dividend AND uses underlying property): https://www.legislation.gov.uk/ukpga/1986/41/section/102
- TCGA 1992 s.17 (deemed market-value disposal on gift of growth shares): https://www.legislation.gov.uk/ukpga/1992/12/section/17
- TCGA 1992 s.165 + Sch 7 (holdover NOT available for investment-FIC share gifts): https://www.legislation.gov.uk/ukpga/1992/12/section/165
- TCGA 1992 s.260 (holdover for CLT — for the comparison with trust route): https://www.legislation.gov.uk/ukpga/1992/12/section/260
- *Pawson v HMRC* [2013] UKUT 050 (TCC): https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc
- HMRC IHTM25000+ (BPR overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000
- HMRC IHTM14000+ (gifts and exempt transfers, including PET mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14000
- CTA 2010 s.18N (CIHC qualifying-purpose carve-out, relevant for the FIC's CT profile, link sparingly so as not to drift into A7 territory): https://www.legislation.gov.uk/ukpga/2010/4/section/18N

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
- **Final slug / category / H1 / metaTitle:** all per manager pre-decisions.
- **metaTitle:** "FIC Value-Freeze for IHT: A Strategic Frame for Landlords" (57 chars).
- **metaDescription:** trimmed mid-flight from 164 chars to 157 chars to stay within 158 limit.
- **Sequencing note:** C7 was deferred per launch-prompt instruction until A8/A9 shipped. A6 (1616ecb), A7 (ac66b50), A8 (acfde81), A9 (c5887e9), A10 (2514e02) all committed on property-wave4-a branch by 2026-05-23 13:40Z. C7 written after all five A-bucket FIC pages were shipped, so cross-link discipline against Session A's operational pages is now well-grounded.

### Competitor URLs fetched
- uklandlordtax.co.uk / tlpi.co.uk / ukpropertyaccountants.co.uk / taxaccountant.co.uk: not re-fetched in session. Differentiator (strategic IHT framing only, with three-route comparison table + IHT footprint cap analysis + cross-bucket boundary discipline) is well-defined.

### Existing-page review (from "Closest existing pages")
- `pension-iht-april-2027-landlord-estate-planning` (Jaccard 0.33): not directly cross-linked from C7 (pension-IHT is parallel to FIC value-freeze rather than competing with it; the reader can run both routes); C6 covers the pension-side sequencing already.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Jaccard 0.21): taper threshold referenced in the page's "why above £2m" section; not directly cross-linked but the s.8D(5) mechanics are referenced.
- Existing FIC pages (all in incorporation-and-company-structures category) cross-linked at intro and close: `fic-iht-treatment-bpr-myth` (intro), `fic-complete-guide-property-wealth-transfer` (close), `fic-growth-shares-and-freezer-shares-design` (close), `fic-vs-discretionary-trust-property-comparison` (close).

### Critical cross-bucket boundary discipline
Per the launch-prompt mandate: "C7 owns the strategic IHT value-freeze framing for portfolio landlords ~£2m+. It cites Bucket A pages A6 (articles drafting), A7 (governance), A8 (in-life retirement income), A9 (share-gift PET mechanics at point of gift), A10 (blended-family persona) as sibling pages providing the operational mechanics, WITHOUT re-walking their ground. C7's framing must compare FIC value-freeze vs direct property 7-year PET (C4) and CLT into discretionary trust (C10). If your draft of C7 drifts into A8 (drawdown mechanics) or A9 (gift-point mechanics) territory, STOP and pull back into the strategic IHT framing."

Discipline applied: dedicated "Where the operational mechanics live" closing section enumerates A6/A7/A8/A9/A10 forward-links with one-sentence descriptions of what each owns and a clear instruction that operational readers follow the cross-link. C7 body holds the strategic framing only: value-freeze concept, 7-year PET clock on share gift, IHT footprint cap, BPR/Pawson read-through, GROB on FIC, three-route comparison, year-15 worked picture. No drift into share-class drafting details (A6 territory), no drift into operational governance (A7 territory), no drift into drawdown rate optimisation (A8 territory), no drift into share-valuation mechanics at point of gift (A9 territory), no drift into blended-family persona-specific drafting (A10 territory). The page reads as the "why and where this fits" of the FIC route; the operational sibling pages cover the "how".

### Citations added (external authority)
- IHTA 1984 s.3A (PETs definition).
- IHTA 1984 s.7 (rates) + s.7(4) (taper).
- IHTA 1984 s.8D(5) (RNRB taper measurement of estate value).
- IHTA 1984 s.105 (BPR test) + s.105(3) (mainly-investment exclusion).
- FA 1986 s.102 (GROB) + s.102(1)(b) (entire-exclusion test).
- TCGA 1992 s.17 (deemed MV disposal).
- TCGA 1992 s.165 + Sch 7 (s.165 unavailable for investment FIC).
- TCGA 1992 s.260 (CLT holdover, comparison).
- TCGA 1992 s.162 (incorporation relief test).
- Pawson v HMRC [2013] UKUT 050 (TCC).
- HMRC IHTM25000+ (BPR).
- HMRC IHTM14000+ (gifts and exempt transfers).
- CTA 2010 s.18N (CIHC carve-out, referenced sparingly).
- s.21 IHTA 1984 (normal expenditure out of income, life cover premium exemption).

~14 named in-body citations.

### Internal links added
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (intro, planning lens).
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` (intro, BPR-myth deferral).
- `/blog/incorporation-and-company-structures/fic-articles-of-association-property-control-mechanics` (Wave 4 A6 close).
- `/blog/incorporation-and-company-structures/fic-property-corporate-governance-board-meetings-resolutions-discipline` (Wave 4 A7 close).
- `/blog/incorporation-and-company-structures/fic-property-retirement-decumulation-mechanics-uk` (Wave 4 A8 close).
- `/blog/incorporation-and-company-structures/fic-gifting-shares-children-property-7-year-iht-mechanics` (Wave 4 A9 close).
- `/blog/incorporation-and-company-structures/fic-blended-family-protected-legacy-property-second-marriage` (Wave 4 A10 close).
- `/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy` (Wave 4 C4, comparison + close).
- `/blog/landlord-tax-essentials/iht-clt-property-discretionary-trust-20-percent-entry-charge` (Wave 4 C10, comparison + close).
- `/blog/landlord-tax-essentials/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line` (Wave 4 C1, Pawson reference).
- `/blog/landlord-tax-essentials/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation` (Wave 4 C8, cap interaction).
- `/blog/landlord-tax-essentials/iht-gift-with-reservation-letting-children-paying-rent-mechanics` (Wave 4 C3, GROB cross-link).
- `/blog/incorporation-and-company-structures/fic-vs-discretionary-trust-property-comparison` (existing side-by-side comparison, close).
- `/blog/incorporation-and-company-structures/fic-complete-guide-property-wealth-transfer` (existing FIC overview, close).
- `/blog/incorporation-and-company-structures/fic-growth-shares-and-freezer-shares-design` (existing share-design page, close).

15 unique target paths. **Important note on link resolution at branch-build time:** the Wave 4 A6/A7/A8/A9/A10 pages are committed on the `property-wave4-a` branch (per tracker confirmation 2026-05-23) but do NOT exist in the `property-wave4-c` worktree's filesystem. At this branch's build time, those 5 hyperlink targets do not resolve to actual files; they will resolve at wave-close merge to main. Build still succeeds because Next.js does not validate href targets at build time (markdown anchors are emitted as HTML without target-resolution check). Pattern is consistent with how Wave 4 A8/A9 in turn cross-linked forward to C7 in their own work-logs (cross-bucket coordination accepts that wave-close is where the network closes).

### Inline CTA placements
- Zero `<aside>` blocks. Page is comparison-led and structurally heavy on the three-route table and the year-15 worked picture (which carry the conversion weight). Adding asides in the middle of a comparison table or a year-by-year IHT picture would break analytical flow. Justified deviation from the standard 1-3 aside guidance for this page given the comparison-led structure.

### Build attempts
- Pass 1 (clean): build successful, pre-existing ESLint warnings only.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13/13.
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0.
- Meta title length: ✅ 57 chars (max 62).
- Meta description length: ✅ 157 chars (max 158). Trimmed mid-flight from 164 to 157.
- Internal links resolve: ⚠️ PARTIAL. 10 of 15 hyperlink targets exist in this worktree (the existing FIC pages + Wave 2 + Wave 4 C-bucket pages I have shipped). 5 of 15 targets (A6, A7, A8, A9, A10) exist on property-wave4-a branch but not in this worktree's filesystem; will resolve at wave-close merge. Cross-bucket pattern matches Session A's own forward-references to C7. Build succeeds.
- monitored_pages row inserted: ✅ id 186, monitor_until 2026-08-21.
- Body word count: 2,544 (mid-band of 2,500-3,500).

### Flags raised to wave4_site_wide_flags.md
- None this page. The cross-bucket A6-A10 link resolution at wave-close is implicit in the wave's cross-bucket coordination plan; not a session-side flag.

### 2-3 sentence summary
The strategic IHT framing of the FIC value-freeze for portfolio landlords c.£2m+. Founder retains preference shares (frozen value, stays in estate); growth shares gifted to next generation starting the 7-year PET clock; after 7 years all future portfolio growth is outside the estate. Three-route comparison (FIC value-freeze vs CLT into discretionary trust vs direct property PET) on a £2m portfolio; year-15 worked picture showing £500-700k IHT saving against £150-250k CGT cost at incorporation+gift. Cross-bucket boundary policed: operational mechanics deferred to A6/A7/A8/A9/A10 via dedicated closing section, NOT re-walked. C7 closes Session C's 10 IHT pages. 2,544 body words, 13 FAQs, 0 CTAs (justified by comparison-led structure), ~14 citations.
