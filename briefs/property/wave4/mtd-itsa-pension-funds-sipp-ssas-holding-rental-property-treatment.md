# Wave 4 brief: mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The exclusion mechanic for SIPP / SSAS-held rental property in MTD ITSA, per house position §19.12. Pension trustees are outside MTD ITSA entirely (§19.3 excluded categories); property held inside the pension wrapper is taxed within the scheme (typically 0% on rental income within a registered pension scheme) and reported via the pension trustee return, not the personal MTD ITSA cycle. The page works the common confusion: a landlord with a £40k personal residential portfolio plus a £30k SIPP-held commercial property tests personal portfolio only against the §19.2 threshold (the £30k SIPP rental is NOT the landlord's income for that test). Covers the parallel-streams scenario (personal portfolio in MTD plus SIPP-held property outside) and the trustee-reporting routes (small self-administered scheme via SSAS practitioner, SIPP via SIPP provider). Distinct from C6 (pension decumulation IHT 2027) which is about post-death pension treatment; B7 is about the live-time MTD-exclusion mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Edge case but high-search-intent for portfolio landlords. Net-new on our site.

---

## Competitor URLs (Stage 2 validated)

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read for the SIPP / SSAS commercial-property-holding mechanics, MTD-exclusion phrasing, and FAQ patterns on the parallel-streams scenario.

- https://rentalbux.com/blogs/pension-funds-with-rental-portfolios-are-they-caught-by-making-tax-digital — VERIFIED ALIVE 2026-05-23 (Stage 1 seed). Commercial bias. Useful for the exclusion confirmation and FAQ phrasing on whether SIPP rental counts toward the personal £50k threshold.
- https://www.ukpropertyaccountants.co.uk/sipp-buy-commercial-property-guide/ — VERIFIED ALIVE 2026-05-23. Authoritative practitioner explainer on SIPP commercial-property ownership; useful for the wrapper-mechanics paragraphs and worked-example structure on the SIPP-property income flow.
- https://www.ukpropertyaccountants.co.uk/commercial-property-strategy-for-business-owners-a-practical-ssas-route/ — VERIFIED ALIVE 2026-05-23. SSAS-specific equivalent; useful for the SSAS-versus-SIPP distinction and the small self-administered scheme reporting route.
- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-the-ssas-pension-scheme-in-the-uk/ — VERIFIED ALIVE 2026-05-23. Foundational SSAS overview; useful for the trustee-reporting context.
- https://www.ukpropertyaccountants.co.uk/investing-in-property-using-your-pension-funds/ — VERIFIED ALIVE 2026-05-23. General overview; useful for the FAQ phrasing on whether personal portfolio and pension-held property need to be combined for the threshold test (answer: no, per §19.12).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.20, category: `Making Tax Digital (MTD)`)
- `inheritance-tax-rental-property-uk-guide` (Jaccard 0.17, category: `Landlord Tax Essentials`)
- `how-to-value-rental-property-portfolio-tax-purposes` (Jaccard 0.15, category: `Portfolio Management`)
- `inheriting-uk-rental-property-executors-step-by-step` (Jaccard 0.15, category: `Capital Gains Tax`)
- `moving-to-australia-uk-rental-property-tax-pathway` (Jaccard 0.15, category: `Non-Resident Landlord Tax`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket

Pick 4-7 to actually cite; add others found during research.

- [HMRC Pensions Tax Manual (PTM) — registered pension scheme taxation overview (gov.uk)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual)
- [HMRC PTM121000 — taxation of property within a registered pension scheme (gov.uk)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm121000)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk; confirms trustees are excluded)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [Finance Act 2004 Part 4 — registered pension schemes regime (legislation.gov.uk; the statutory home of SIPP / SSAS tax treatment)](https://www.legislation.gov.uk/ukpga/2004/12/part/4)
- [HMRC scheme administrator obligations (gov.uk PTM section on reporting)](https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm160000)
- [HMRC Property Income Manual (PIM) overview](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- House position §19.12 (pension funds + rental property — Wave 4 extension) and §19.3 (excluded categories) — internal tie-breakers.

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
- **Final slug:** `mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment` (no override)
- **Final category:** `Making Tax Digital (MTD)` (no override)
- **H1 chosen:** "SIPP and SSAS-Held Rental Property in MTD ITSA: The Trustee Exclusion"
- **Meta title chosen:** "SIPP / SSAS Property + MTD ITSA: The Trustee Exclusion" (54 chars)
- **Why these vs other options:** Lead with the structural answer (trustee exclusion) rather than the question, because the answer is unequivocal. H1 + meta both name SIPP, SSAS, MTD, and the exclusion mechanic in the first six words. Distinct from C6's IHT-2027-decumulation framing.

### Competitor URLs fetched
- rentalbux.com "pension funds with rental portfolios" -> outline (8 H2s), explicit exclusion confirmation, FAQ phrasing on the threshold-aggregation question (answer: does not aggregate). Cited as a structural confirmation, not authority; used FAQ phrasing as a starting point but rewrote.
- ukpropertyaccountants.co.uk SIPP commercial-property guide -> page returned navigation-hub content; no usable worked example in the WebFetch excerpt. Did NOT rely on for citations.
- ukpropertyaccountants.co.uk SSAS practical route / SSAS complete guide / investing-using-pension-funds -> SSAS-versus-SIPP structural framing used for FAQ phrasing on the SSAS-loanback / SSAS-pooling distinctions; no specific figures used.
- gov.uk PTM121000 -> verbatim cited in body: commercial property let to sponsoring employer or member requires market rent; failure triggers unauthorised payment charge plus scheme sanction charge (40% + typically 15%). Strongest authority on this page.

### Existing-page review (from "Closest existing pages")
- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.20, Wave 3 B3) — joint-owner threshold mechanic; not directly relevant to B7's pension exclusion. Not cross-linked from B7.
- `inheritance-tax-rental-property-uk-guide` (0.17) — IHT pillar; B7 is live-time MTD mechanic, not IHT. Not cross-linked.
- `how-to-value-rental-property-portfolio-tax-purposes` (0.15) — portfolio valuation; tangential. Not cross-linked.
- `inheriting-uk-rental-property-executors-step-by-step` (0.15) — post-death mechanic; B7 is live-time mechanic. Not cross-linked.
- `moving-to-australia-uk-rental-property-tax-pathway` (0.15) — expat angle; tangential. Not cross-linked.
- Semantic neighbours (not Jaccard top-5) cross-linked: `mtd-itsa-overview-six-changes-residential-landlords` (bucket pillar); `mtd-itsa-qualifying-income-test-gross-vs-net` (the parallel-streams threshold mechanic page); Wave 4 B1 joint-owner quarterly filing (joint-owner scenario with one spouse in pension property). C6 IHT-2027 cohort decumulation referenced as forthcoming sibling in text (no hyperlink — page does not exist yet, flagged for wave-close back-patch).

### Citations added (external authority)
- HMRC Pensions Tax Manual PTM121000 (commercial property held by registered pension schemes — verbatim cited)
- Finance Act 2004 Part 4 (the registered pension schemes regime)
- FA 2004 s.186 (income tax exemption for income arising from investments in a registered pension scheme)
- FA 2004 Sch 29A (taxable property rules for investment-regulated schemes — residential property restriction)
- gov.uk MTD ITSA eligibility check (confirms trustees outside scope)
- House position §19.12 (Wave 4 pension extension) + §19.3 (excluded categories) — internal tie-breakers

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` ×1 (closing section)
- `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net` ×1 (closing section)
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) ×1 (closing section)
- All 3 target files exist; URL category segments verified as `making-tax-digital-mtd` matches destination frontmatter `category` field.
- C6 reference left as plain text rather than hyperlink (page not yet written; wave-close back-patch flag in tracker notes).

### Inline CTA placements
- `<aside>` 1: after the residential-property restriction section (high-intent: landlord realising their personal residential portfolio cannot move into a SIPP and needs alternative planning).
- `<aside>` 2: after the parallel-streams worked example for Patel (high-intent: landlord realising they need someone to handle the personal MTD side while the SIPP provider handles the scheme side).
- 2 asides total; the lower density reflects the niche nature of the page and avoids over-pitching on what is a structural-clarification page.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` from worktree root — passed clean; page rendered to `.next/server/app/blog/making-tax-digital-mtd/mtd-itsa-pension-funds-sipp-ssas-holding-rental-property-treatment.html` (133,528 bytes).

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 Question entries in 1 FAQPage block = frontmatter 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 54 (max 62) ✓
- Meta description length: 154 (max 158) ✓
- Internal links resolve: 3/3 target files exist + URL category segments match destination frontmatter `category` field ✓ (C6 reference is plain text, not a hyperlink)
- monitored_pages row inserted: yes (id 173, rewrite_type='rewrite', site_key='property', 90-day window 2026-05-23 → 2026-08-21)
- Body word count: 2,218 (below 2,500-3,500 informal range; calibration note: this is a structural-clarification page with a binary answer; competitor median was short and the topic is a niche edge case. Padding the page would weaken its primary value: a clean, definite answer to a question that produces operationally important follow-on decisions. The reduced length is deliberate.)

### Flags raised to wave4_site_wide_flags.md
- Will append INTERNAL_LINK flag F-2: B7 references C6 (pension decumulation property portfolio IHT 2027 cohort sequence) as a forthcoming sibling. Wave-close back-patch should convert the plain-text reference into a hyperlink once C6 ships.

### 2-3 sentence summary
Net-new operational page explaining the SIPP / SSAS trustee exclusion mechanic for MTD ITSA. Walks the trustee-outside-MTD position (house position §19.3 + §19.12), the SIPP-versus-SSAS distinction, PTM121000 arm's-length / market-rent discipline for connected-tenant arrangements, the residential-property taxable-property restriction under FA 2004 Sch 29A, and the parallel-streams scenario (Patel worked example: £40k personal portfolio + £35k SIPP commercial, with the SIPP rent NOT aggregating to the personal threshold test). Anti-templating boundary: this is the live-time MTD-exclusion page; C6 (forthcoming) covers post-death IHT 2027 decumulation sequence.
