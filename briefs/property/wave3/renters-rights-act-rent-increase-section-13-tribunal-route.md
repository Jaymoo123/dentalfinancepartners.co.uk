# Wave 3 brief: renters-rights-act-rent-increase-section-13-tribunal-route

**Site:** property
**Bucket:** Renters Rights Act 2025 + Tenancies
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/renters-rights-act-rent-increase-section-13-tribunal-route.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/renters-rights-act-rent-increase-section-13-tribunal-route

---

## Manager pre-decisions

- **Suggested slug:** `renters-rights-act-rent-increase-section-13-tribunal-route`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** Renters Rights Act 2025 + Tenancies
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Rent-increase mechanics page (section 20.6). Section 13 is the only route; once per 12-month period; 2 months notice; tenant-tribunal challenge at FTT-Property Chamber. The tribunal cannot now set rent above the landlord proposed amount (the procedural tweak that protects tenants from challenge backfiring). Covers the workflow: notice, tenant response options, tribunal application route, market-rent evidence requirements. Practical for landlords managing index-linked rent rises against the 12-month cap.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs, to validate in Stage 2

- https://www.ukpropertyaccountants.co.uk/new-rent-increase-rules-under-the-renters-rights-act/ (manager-identified primary; Stage 2 must verify the URL is alive, read it, and reason about whether it is the right reference, and add 2-4 more URLs if the candidate is weak).

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Stage 2 fills additional URLs after live verification.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages, Opus reasoning needed (Stage 2)

*Manager pre-fills only a 1-line hint of expected neighbours below. Stage 2 reads the actual existing post titles + slugs on the full Property inventory (316 pages including the 61 Wave 1 and Wave 2 outputs on main) and reasons about the 3-7 closest pages topically. The token-similarity matcher is NOT used (section 16.11 lesson from Wave 2).*

**Manager hint:** expected neighbours: C1 (pillar), C10 (asking-rent / bidding-wars, pre-tenancy sibling), existing `rental-income-tax-uk-complete-guide-landlords`, existing `claim-mortgage-interest-rental-property-uk-section-24` (interaction: S24 + capped rent rises).

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

none obvious; Stage 2 to validate.

---

## Authority links worth considering for this bucket

- [Renters Rights Act 2025 (legislation.gov.uk, 2025 c. 26)](https://www.legislation.gov.uk/ukpga/2025/26/contents)
- [Housing Act 1988 (legislation.gov.uk, ss.5 / 8 / 13 / 21 baseline)](https://www.legislation.gov.uk/ukpga/1988/50/contents)
- [First-Tier Tribunal Property Chamber decisions (gov.uk)](https://www.gov.uk/government/organisations/first-tier-tribunal-property-chamber)
- [Decent Homes Standard (gov.uk MHCLG / DLUHC)](https://www.gov.uk/government/publications/a-decent-home-definition-and-guidance)
- [HMRC Property Income Manual (PIM) for deductibility framings](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [gov.uk private renting / landlord pages](https://www.gov.uk/browse/housing-local-services/renting-property)
- [Renters Rights Act commencement orders (legislation.gov.uk SI lookup)](https://www.legislation.gov.uk/all?title=Renters%20Rights)

You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.

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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 12 (the original in-passage framing, retained for audit) AND section 20 (Wave 3 RRA extension, the post-Royal-Assent locked detail)**. Section 20 reflects the actual Renters Rights Act 2025 (2025 c. 26, Royal Assent 27 October 2025): Section 21 abolition, reformed Section 8 grounds, periodic-tenancy default + AST phase-out, Decent Homes Standard extension to PRS, landlord database + PRS Ombudsman, Section 13 rent-rise mechanics, pet rights, bidding-wars prohibition, transition for existing tenancies, enforcement / penalty regime, and the firm-specific tax-implications angle. Section 20 supersedes section 12 where they conflict; section 12 stays as audit trail. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave3_site_wide_flags.md`.

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
- Each Wave 3 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page. ATED pillar pages and ATED penalty-appeal pages should NOT have the same outline. MTD persona pages must each lead with the persona-specific wrinkle. RRA mechanic pages and tax-implication pages should diverge clearly.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 3, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave3_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (Stage 2 will fill the precise list during your worktree session). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 2 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; Wave 2 baked in the discipline; Wave 3 carries it forward. Use git add for the content file and brief file only.
    **Wave 2 section 16.15 lesson:** do NOT include `docs/property/wave3_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave3_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **Wave 2 section 16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave3_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave3_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (from Wave 2)

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:** ( chars)
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

### Flags raised to wave3_site_wide_flags.md

### 2-3 sentence summary
