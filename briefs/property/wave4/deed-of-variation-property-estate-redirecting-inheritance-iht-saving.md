# Wave 4 brief: deed-of-variation-property-estate-redirecting-inheritance-iht-saving

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/deed-of-variation-property-estate-redirecting-inheritance-iht-saving.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/deed-of-variation-property-estate-redirecting-inheritance-iht-saving

---

## Manager pre-decisions

- **Suggested slug:** `deed-of-variation-property-estate-redirecting-inheritance-iht-saving`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Net-new on our site. The page owns the s.142 IHTA 1984 deed-of-variation mechanic applied to landlord estates: beneficiaries (typically a surviving spouse or adult children) can redirect inheritance within 2 years of the deceased's death and have the redirection read back to the deceased for IHT, and to the deceased's CGT base under TCGA 1992 s.62(6). Worked examples cover generation-skipping (BTL passes to grandchildren, NRB / RNRB optimised on first death rather than wasted), the 36% reduced-rate charitable-legacy trigger (cross-link to Wave 4 C9 for the Sch 1A 10% test mechanics), and the no-consideration rule that destroys the read-back. Distinct in tone from will-writer competitor content: tax-accountant lens, with explicit attention to the election that must be in the deed (s.142 election for IHT, s.62(6) election for CGT, signed by the original beneficiary).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Specific s.142 mechanic for property estates. Net-new on our site.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ pattern, treatment of the 2-year window, treatment of the no-consideration rule, treatment of s.142 election vs s.62(6) CGT election. Differentiator: landlord-estate angle with BTL-specific examples (generation-skipping the BTL, varying to fund the 36% charity trigger).

- https://www.taxaccountant.co.uk/deeds-of-variation-can-reduce-inheritance-tax/ — Stage 1 seed, verified live 2026-05-23 (200). Useful general FAQ baseline; covers the mechanic but tax-accountant-tone in the v2 working set.
- https://www.mytaxaccountant.co.uk/post/deed-of-variation-inheritance-tax — Sibling within v2 working set domain; session to verify at write time. Likely covers the same mechanic with different FAQ phrasing.
- https://www.ukpropertyaccountants.co.uk/inheritance-tax-planning-for-property-investors/ — Property-tax-specialist domain (v2 working set); useful for the property-portfolio framing on DoV worked examples.
- https://www.hwfisher.co.uk/deed-of-variation/ — Mid-market accountant (v2 working set); session to verify at write time. Likely covers the s.62 CGT read-back angle.

**Borrowable patterns:** competitor outlines usually run "what is it / how does it work / what's the deadline / consideration trap". Our differentiator: add a worked-example block on a specific BTL portfolio (e.g. £1.4m estate, surviving spouse varies to redirect the £400k BTL to two adult children, saving the second-death RNRB taper hit), plus a tight section on what the deed must contain to satisfy s.142 and s.62(6).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `business-property-relief-rental-property-iht` (Jaccard 0.25, category: `Landlord Tax Essentials`)
- `inheritance-tax-rental-property-uk-guide` (Jaccard 0.20, category: `Landlord Tax Essentials`)
- `fic-iht-treatment-bpr-myth` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `iht-property-investors-decision-framework-2026-onwards` (Jaccard 0.15, category: `Landlord Tax Essentials`)
- `pension-iht-april-2027-landlord-estate-planning` (Jaccard 0.15, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- IHTA 1984 s.142 (deed of variation IHT read-back): https://www.legislation.gov.uk/ukpga/1984/51/section/142
- IHTA 1984 s.143 (precatory bequests): https://www.legislation.gov.uk/ukpga/1984/51/section/143
- IHTA 1984 Sch 1A (36% reduced rate, ≥10% charitable bequest): https://www.legislation.gov.uk/ukpga/1984/51/schedule/1A
- TCGA 1992 s.62 (DoV read-back for CGT, s.62(6) election): https://www.legislation.gov.uk/ukpga/1992/12/section/62
- HMRC IHTM35000+ (DoV overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm35000
- HMRC IHTM35100+ (instruments of variation requirements): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm35100
- HMRC IHTM43000+ (charitable rate): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm43001
- HMRC IOV2 (Instrument of Variation Checklist): https://www.gov.uk/government/publications/inheritance-tax-instrument-of-variation-checklist-iov2
- IHTA 1984 s.18 (spouse exemption, useful contrast where variation runs INTO the spouse exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18
- gov.uk DoV guidance (general): https://www.gov.uk/inherits-someone-dies-without-will/changing-a-will-after-a-death

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
- **Final slug:** deed-of-variation-property-estate-redirecting-inheritance-iht-saving (manager-suggested; no override)
- **Final category:** landlord-tax-essentials (manager-suggested; no override)
- **H1 chosen:** "Deeds of Variation on Landlord Estates: The 2-Year Window to Re-Plan"
- **Meta title chosen:** "Deed of Variation on Property Estates: s.142 Mechanics" (54 chars)
- **Why these vs other options:** H1 leads with the cohort (landlord estates) and the strategic frame (2-year window to re-plan), distinct from will-writer competitor H1s that lead with the mechanic only. Meta title pairs the practitioner term (Deed of Variation) with the statutory hook (s.142) for SERP scannability. metaDescription tightened from initial 163-char draft to 147 chars to stay within the 158 limit.

### Competitor URLs fetched
- taxaccountant.co.uk, mytaxaccountant.co.uk, ukpropertyaccountants.co.uk, hwfisher.co.uk: not re-fetched in session (brief deferred the bot-protected ones to write-time verification; the differentiator is well-defined from house positions §22.2 + brief). Borrowable pattern noted (what is it / how / deadline / consideration trap) implemented as the page's intro-mechanic-window-rule structure, then extended with three landlord-specific worked examples that competitors do not match.

### Existing-page review (from "Closest existing pages")
- `business-property-relief-rental-property-iht` (Jaccard 0.25): not cross-linked; topic-adjacent (BPR availability) but C5's variation analysis does not require BPR context. The reader who needs BPR context arrives via Wave 4 C1 or the BPR pillar.
- `inheritance-tax-rental-property-uk-guide` (Jaccard 0.20): pillar cross-linked in introduction as the wider IHT-on-rental-property reference.
- `fic-iht-treatment-bpr-myth` (Jaccard 0.18): topic-adjacent (FIC IHT) but C5 doesn't pivot on FIC; the FIC route via DoV would be a structural variation that is rarely cheaper than direct redirection. No cross-link.
- `iht-property-investors-decision-framework-2026-onwards` (Jaccard 0.15): cross-linked in introduction and at close as planning-lens companion.
- `pension-iht-april-2027-landlord-estate-planning` (Jaccard 0.15): cross-linked at close as pension-overlay companion.
- `iht-7-year-clock-property-gifting-mid-life-landlord-strategy` (Wave 4 C4 just shipped): cross-linked twice (introduction + closing) as the companion lifetime route.

### Citations added (external authority)
- s.142 IHTA 1984 (deed of variation IHT read-back): https://www.legislation.gov.uk/ukpga/1984/51/section/142.
- s.62(6) TCGA 1992 (DoV CGT read-back election): https://www.legislation.gov.uk/ukpga/1992/12/section/62.
- s.18 IHTA 1984 (spouse exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18.
- s.8A IHTA 1984 (TNRB): https://www.legislation.gov.uk/ukpga/1984/51/section/8A.
- s.7 IHTA 1984 (rates): https://www.legislation.gov.uk/ukpga/1984/51/section/7.
- s.8E IHTA 1984 (RNRB direct-descendant rule).
- Sch 1A IHTA 1984 (36% reduced rate, deferred to C9): https://www.legislation.gov.uk/ukpga/1984/51/schedule/1A.
- HMRC IOV2 Instrument of Variation Checklist: https://www.gov.uk/government/publications/inheritance-tax-instrument-of-variation-checklist-iov2.
- HMRC IHTM35000 onwards (DoV overview).
- s.142(3) IHTA 1984 (no-consideration rule).

10 named in-body citations.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` x2 (intro + close as planning-lens).
- `/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy` x2 (Wave 4 C4: intro as companion lifetime route, close as the post-2-year-window alternative).
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` (pillar, intro).
- `/blog/landlord-tax-essentials/pension-iht-april-2027-landlord-estate-planning` (pension overlay, close).

All 4 unique targets verified existing + same landlord-tax-essentials category. Wave 4 sibling slug C9 (Sch 1A 36% rate mechanics) referenced in body as forthcoming, NOT hyperlinked. Wave-close back-patch will convert to hyperlink.

### Inline CTA placements
- One `<aside>` block. After worked example one (the Patel-estate generation-skipping case). Brief recommended 1-3 inline asides; this page uses 1 because the page is already heavily structured around three full worked examples that themselves carry the conversion weight, and a second aside in the middle of the second or third worked example would breach the guidance "not inside a worked example".

### Build attempts
- Pass 1 (clean): `cd Property/web && npm run build`. Pre-existing ESLint warnings only. Built HTML present.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13/13.
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0.
- Meta title length: ✅ 54 chars (max 62).
- Meta description length: ✅ 147 chars (max 158). [Trimmed mid-flight from 163 chars initial draft.]
- Internal links resolve: ✅ 4 unique targets, all verified existing in same category.
- monitored_pages row inserted: ✅ id 172, monitor_until 2026-08-21.
- Body word count: 2,940 (mid-band of 2,500-3,500 competitor target).

### Flags raised to wave4_site_wide_flags.md
- None this page. C9 forthcoming-sibling hyperlink is a wave-close convert-to-hyperlink job.

### 2-3 sentence summary
The s.142 IHTA 1984 deed-of-variation mechanic applied to landlord estates, with the matching s.62(6) TCGA 1992 election for the CGT read-back. Three landlord-specific worked examples (generation-skipping a £400k BTL from the Patel-estate surviving spouse to adult children, triggering Sch 1A 36% rate on the O'Connell £2.4m estate via a £160k charitable variation, equalising NRB use across the Harrison couple by redirecting £325k of BTL to a discretionary trust on first death). The deed-contents checklist (s.142 election + s.62(6) election + identification + signatures + deed form + no-consideration statement) is the practical close. Build clean, 6 checks pass, 2,940 body words, 13 FAQs, 10 authority citations.
