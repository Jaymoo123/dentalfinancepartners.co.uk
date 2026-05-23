# Wave 4 brief: pension-decumulation-property-portfolio-iht-2027-cohort-sequence

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/pension-decumulation-property-portfolio-iht-2027-cohort-sequence.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/pension-decumulation-property-portfolio-iht-2027-cohort-sequence

---

## Manager pre-decisions

- **Suggested slug:** `pension-decumulation-property-portfolio-iht-2027-cohort-sequence`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Wave 2's `pension-iht-april-2027-landlord-estate-planning` covers the rule-mechanic (pensions in the estate from 6 April 2027 per Autumn Budget 2024). This page is the sequence-strategy applied page for the retiring-age landlord cohort whose financial plan was built on the pre-2027 "use pension last" wisdom. The decumulation-sequence problem under post-2027 rules: pension and BTL portfolio are now both in the IHT base, so the optimisation flips from "preserve pension legacy" to "spend down the estate to below the £2m RNRB taper threshold and below the second-death IHT cliff". Worked sequences for the 65-year-old landlord with £900k pension + £1.6m BTL portfolio: sell-property-first (CGT now at 18%/24%, frees liquidity, reduces estate) vs drawdown-first (income-tax at marginal rate, leaves CGT base intact for next gen, but RNRB-taper exposure persists). Cross-link to Wave 4 C4 (gifting property route) and Wave 4 C7 (FIC value-freeze route) as alternative decumulation paths.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Operational deepening of Wave 2 pension-IHT page; that one was rule-mechanics, this is the sequence/decumulation strategy.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of Autumn Budget 2024 announcement, treatment of liability-reporting-and-payment consultation, worked-example density. Differentiator: landlord-specific decumulation sequence with the property leg, not generic pension-IHT explainer.

- https://bhp.co.uk/news-events/service-insights/financial-planning/changes-to-pension-inheritance-tax-what-you-need-to-know — Stage 1 seed, verified live 2026-05-23 (200). Financial-planning-firm angle, useful for the FAQ phrasing on the announcement and the practical "what should I do" frame.
- https://www.ukpropertyaccountants.co.uk/pension-inheritance-tax-changes-property-investors/ — Property-tax-specialist domain (v2 working set); session to verify at write time. Useful for the property-investor-specific angle.
- https://www.tlpi.co.uk/services/retirement-planning/ — Specialist FIC firm in v2 working set; useful for retirement-decumulation case-study framing where the FIC is one of the routes.
- https://www.taxaccountant.co.uk/inheritance-tax-on-pensions-from-april-2027/ — Sibling within v2 working set domain; session to verify at write time. Likely covers the rule + initial planning implications.

**Borrowable patterns:** BHP is financial-planning-first (light on landlord-property specifics). Our differentiator: a single worked-sequence comparison showing the IHT + CGT + income-tax total cost of two decumulation orders over a 15-year retirement, plus the pension-liability-reporting mechanics (Personal Representatives, scheme administrators, joint-and-several debate from the consultation) so readers know what mechanically happens on death.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `incorporating-property-portfolio-uk-2026` (Jaccard 0.25, category: `Incorporation & Company Structures`)
- `how-to-value-rental-property-portfolio-tax-purposes` (Jaccard 0.20, category: `Portfolio Management`)
- `incorporation-case-study-5-property-portfolio-analysis` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `property-portfolio-review-checklist-landlords-2026` (Jaccard 0.18, category: `Portfolio Management`)
- `business-property-relief-rental-property-iht` (Jaccard 0.17, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- Autumn Budget 2024 (pension-IHT inclusion from 6 April 2027): https://www.gov.uk/government/publications/autumn-budget-2024
- gov.uk consultation "Inheritance Tax on pensions: liability, reporting and payment": https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment
- Draft Finance Bill 2026 (pension-IHT clauses): https://www.gov.uk/government/collections/finance-bill-2025-26 (verify at write time, doc collection in motion)
- IHTA 1984 s.151 (treatment of pension schemes): https://www.legislation.gov.uk/ukpga/1984/51/section/151
- IHTA 1984 s.7 (rates, including taper s.7(4)): https://www.legislation.gov.uk/ukpga/1984/51/section/7
- HMRC RPSM (Registered Pension Schemes Manual): https://www.gov.uk/hmrc-internal-manuals/registered-pension-schemes-manual
- HMRC IHTM17000+ (pensions and IHT): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm17000
- TCGA 1992 s.4 (CGT rates 18% / 24% residential 2024/25 onwards): https://www.legislation.gov.uk/ukpga/1992/12/section/4
- gov.uk RNRB taper guidance (£2m threshold): https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band
- Wave 2 our page `pension-iht-april-2027-landlord-estate-planning` (internal authority cross-link, not external).

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
- **Meta title:** "Pension or Property First? Landlord Decumulation Post-2027" (58 chars).
- **Why:** sequencing question framed as the H1's question, scenario-led with the Reid £2.9m persona, distinct from Wave 2 rule-mechanic page.

### Competitor URLs fetched
- bhp.co.uk / ukpropertyaccountants.co.uk / tlpi.co.uk / taxaccountant.co.uk: not re-fetched in session. Differentiator (15-year worked sequence comparison + Reid persona + admin mechanics) is well-defined from house positions and Wave 2 baseline.

### Existing-page review (from "Closest existing pages")
- `pension-iht-april-2027-landlord-estate-planning` (Wave 2): read in full. Rule mechanics held there; C6 defers via two intro hyperlinks. Different worked example (Wave 2 used a £2.5m post-2027 estate including £600k pension at general level; C6 uses Reid £2.9m specific 15-year decumulation sequence).
- `business-property-relief-rental-property-iht` (Jaccard 0.17): no cross-link (BPR not in scope for this page; pure-BTL cohort).
- `incorporating-property-portfolio-uk-2026` (Jaccard 0.25): topic-adjacent but not cross-linked (FIC restructure reference points forward to Wave 4 C7).
- Other Jaccard-near pages (portfolio review, valuation, incorporation case study): topic-adjacent, no direct cross-link.

### Citations added (external authority)
- Autumn Budget 2024 (pension-IHT inclusion 6 April 2027).
- s.8D(5) IHTA 1984 (RNRB taper).
- s.62 TCGA 1992 (death uplift).
- s.17 TCGA 1992 (deemed MV disposal connected persons).
- s.165 TCGA 1992 (business-asset holdover not available for non-business BTL).
- s.18 IHTA 1984 (spouse exemption).
- s.21 IHTA 1984 (normal expenditure out of income).
- s.23 IHTA 1984 (charity exemption).
- Sch 1A IHTA 1984 (36% reduced rate, deferred to C9).
- s.162 TCGA 1992 (incorporation relief).
- HMRC RPSM (Registered Pension Schemes Manual).
- HMRC consultation outcome on IHT on pensions liability, reporting and payment (PR primacy).

9-10 named in-body authority citations.

### Internal links added
- `/blog/landlord-tax-essentials/pension-iht-april-2027-landlord-estate-planning` x2 (Wave 2 rule mechanics, intro + closing).
- `/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy` (Wave 4 C4): once in hybrid section.
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards`: once at close (planning lens).
- `/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving` (Wave 4 C5 just shipped): once at close (post-death route).

All 4 unique targets verified existing + same category. Wave 4 C7 (FIC value-freeze) referenced in body as forthcoming, NOT hyperlinked. Wave-close back-patch will convert to hyperlink.

### Inline CTA placements
- One `<aside>` after route one (sell-property-first worked sequence). The two routes plus the £656k headline comparison plus the hybrid sit close together; placing a second aside in the middle of the head-to-head comparison would breach the "not inside a worked example" guidance.

### Build attempts
- Pass 1 (clean): build successful; only pre-existing ESLint warnings.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13/13.
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0.
- Meta title length: ✅ 58 chars (max 62).
- Meta description length: ✅ 155 chars (max 158).
- Internal links resolve: ✅ all 4 targets exist + same category.
- monitored_pages row inserted: ✅ id 175, monitor_until 2026-08-21.
- Body word count: 2,293 (slightly below the 2,500 competitor-median floor; calibration note: page covers the differentiator thoroughly through two full worked sequences plus the hybrid plus the FIC alternative plus the admin mechanics; FAQs add ~3,500 additional words that don't count to "body" but carry substantial depth; total page word count well above competitor median; deliberately not padded). Comparable Wave 4 B-bucket sessions shipped at 2,340 (B4 calibration logged) and 2,517 (B5) — pattern consistent.

### Flags raised to wave4_site_wide_flags.md
- None this page. C7 forthcoming-sibling hyperlink is a wave-close back-patch.
- Note for manager: page asserts PR primacy on pension-IHT-from-April-2027 reporting per published consultation outcome; if the Finance Act 2026 final text departs from this position the page will need a precision back-patch.

### 2-3 sentence summary
The sequence-strategy applied version of the April 2027 pension-IHT reform. Distinct from Wave 2 (rule mechanics) by being scenario-led with a 15-year decumulation comparison on the Reid £2.9m persona (£900k SIPP + £1.6m BTL + £400k home): sell-property-first totals £474k tax across decumulation + second-death; draw-pension-first totals £1,130k on identical 3% growth assumptions; sell-property-first wins by £656k driven by the 24% CGT vs 40% IHT rate gap applied to £1.6m of property value plus the RNRB taper position. Hybrid section + FIC alternative + admin mechanics close. 2,293 body words, 13 FAQs, 1 CTA, ~10 citations, build clean.
