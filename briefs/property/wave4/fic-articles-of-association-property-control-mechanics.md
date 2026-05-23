# Wave 4 brief: fic-articles-of-association-property-control-mechanics

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/fic-articles-of-association-property-control-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/fic-articles-of-association-property-control-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `fic-articles-of-association-property-control-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Articles of Association as the **drafting layer** of a property FIC. The mechanic this page owns is the clause-by-clause translation of family + tax + control goals into CA 2006 s.18 articles: bespoke share-class design (voting / non-voting / preference / growth), founder-protection mechanics (casting vote, reserved-matters list requiring founder consent for life, weighted-vote provisions on specified resolutions), pre-emption rights on transfer, drag-along + tag-along for downstream exits, dividend-control mechanics by class, preference-share redemption / amortisation provisions, deadlock-breaking arrangements. This page is the **articles drafting** sub-thread of the Bucket A FIC group; it is NOT the corporate-governance discipline (defer to A7), NOT the retirement-income drawdown mechanic (defer to A8), NOT the share-gift PET mechanic (defer to A9), and NOT the blended-family use case (defer to A10). The page demonstrates what bespoke articles actually contain, with clause-name + purpose + drafting-trap commentary, distinct from any "what is a FIC" pillar.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** FIC sub-thread, structural / control angle. Distinct from existing FIC-comparison and FIC-pillar pages by focussing on the articles drafting layer.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

**Stage 1 seed URL note:** the same tlpi `protecting-a-late-husbands-property-legacy-with-a-fic` URL was also used as A10's seed (blended-family). Stage 2 retains it here for the "control mechanics protect against unintended downstream beneficiaries" angle BUT shifts the primary references to articles-of-association-specific firms. A10 keeps the case study as its primary; A6 cites it as a colour link only.

- https://www.tlpi.co.uk/key-pillars-to-the-family-investment-company — **NEW PRIMARY.** VERIFIED ALIVE 2026-05-23. TLPI's structural breakdown of FIC pillars; useful for the control-mechanics outline.
- https://www.tlpi.co.uk/what-is-a-family-investment-company — VERIFIED ALIVE 2026-05-23. The FIC intro page; useful for opening-section pattern and the "what makes articles bespoke" framing.
- https://www.tlpi.co.uk/insights/why-you-need-a-family-investment-company — VERIFIED ALIVE 2026-05-23. Use as colour for the "why articles design matters" framing.
- https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ — VERIFIED ALIVE 2026-05-23. Discusses share-class design + retained-control mechanics in articles drafting context.
- https://www.taxaccountant.co.uk/family-investment-companies-fics-protecting-family-wealth/ — VERIFIED ALIVE 2026-05-23. Family-wealth angle on FIC articles; useful for the reserved-matters list use case.
- https://www.ukpropertyaccountants.co.uk/freezer-shares-and-growth-shares-in-family-investment-companies/ — VERIFIED ALIVE 2026-05-23. Direct on share-class taxonomy used in articles drafting.
- https://www.tlpi.co.uk/case-studies/protecting-a-late-husbands-property-legacy-with-a-fic — STAGE 1 SEED, retained as colour. VERIFIED ALIVE 2026-05-23. Useful as illustration but primary use-case angle belongs to A10.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline patterns for articles-drafting sections (reserved matters, pre-emption, drag / tag, dividend control, redemption), how competitors describe each clause's purpose, FAQ density. Borrow outline-shape, NOT clause language (the page must not read like a precedent firm's marketing copy). Cross-check every clause description against CA 2006 + house position §21.2 / §21.5.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `fic-vs-discretionary-trust-property-comparison` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `fic-complete-guide-property-wealth-transfer` (Jaccard 0.15, category: `Incorporation & Company Structures`)
- `foreign-tax-credit-uk-property-overseas-landlords` (Jaccard 0.15, category: `Non-Resident Landlord Tax`)
- `property-investment-tax-uk-complete-guide-2026` (Jaccard 0.14, category: `Landlord Tax Essentials`)
- `spv-property-investment-special-purpose-vehicle-guide` (Jaccard 0.13, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite. Articles drafting is a Companies-Act-led page; legislation citations dominate over HMRC manuals.

- [CA 2006 s.18 (articles of association, requirement to have)](https://www.legislation.gov.uk/ukpga/2006/46/section/18)
- [CA 2006 s.20 (default model articles application)](https://www.legislation.gov.uk/ukpga/2006/46/section/20)
- [CA 2006 s.21 (amendment of articles — special resolution)](https://www.legislation.gov.uk/ukpga/2006/46/section/21)
- [CA 2006 s.22 (entrenched provisions)](https://www.legislation.gov.uk/ukpga/2006/46/section/22)
- [CA 2006 s.284 (votes on resolutions — one vote per share unless articles vary)](https://www.legislation.gov.uk/ukpga/2006/46/section/284)
- [CA 2006 s.561 (existing shareholders' right of pre-emption — disapplied or shaped by articles)](https://www.legislation.gov.uk/ukpga/2006/46/section/561)
- [CA 2006 s.629 (classes of shares: defined)](https://www.legislation.gov.uk/ukpga/2006/46/section/629)
- [Companies Act 2006 (Model Articles) Regulations 2008 SI 2008/3229 (the default starting point)](https://www.legislation.gov.uk/uksi/2008/3229/contents/made)
- [HMRC ERSM110000+ (Employment-Related Securities Manual, applies where founder + family members receive shares connected to office)](https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm110000)
- [HMRC CTM (Company Taxation Manual) on dividend declaration mechanics, intersection with articles-controlled class-rights](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual)
- [STEP / ICAEW technical guidance on FIC articles (commentary only, not primary authority)](https://www.step.org/)

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
