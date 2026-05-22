# Wave 3 brief: mtd-itsa-qualifying-income-test-gross-vs-net

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-qualifying-income-test-gross-vs-net.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-qualifying-income-test-gross-vs-net`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The gross-vs-net qualifying-income mechanic from section 19.2. The question landlords actually ask: 'my rental income is 52k but my net profit is 8k, am I in?' Answer: yes, gross is the test. Worked examples by persona (net-low / gross-high landlord, mixed self-employment + rental, multi-property net-low after S24 finance costs). Distinct from existing `mtd-rental-income-threshold-exemptions` (which covers exemption categories) by being the mechanic at the threshold boundary itself.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/what-is-qualifying-income-for-mtd/ — VERIFIED ALIVE 2026-05-22. Strong primary: explicit gross-test framing, CY-2 rule explained (April 2026 cohort tested on 2024/25 return), what counts / what does not (PAYE, dividends, partnership excluded), self-assessment box references (SA103F box 15-16, SA105 box 20, SA106 box 14). Has the gross-vs-net mechanic plus the SA-form-box anchors that competitors miss.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — HMRC eligibility tool and definition page. Use as the primary authority anchor for "qualifying income" definition and gross-test wording.
- https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax — supplier list; cite as the operational landing point if the page leads with "I'm above the threshold, what next".
- https://www.legislation.gov.uk/ukpga/2017/10/schedule/14 — FA 2017 Sch A1/14 digital reporting obligations. Cite once for statutory basis of the qualifying-income test.

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`mtd-rental-income-threshold-exemptions`** ("MTD for Rental Income: Thresholds, Exemptions and What Landlords Must Do") — closest pillar. Already touches gross-vs-net in passing, but lead framing is **threshold schedule + exemption categories** (Ltd Co, partnerships, trusts, digital exclusion). Your differentiation: this page IS the gross-test mechanic deep-dive, written from the boundary case (£52k rent, £8k net) outward. Cite the exemptions page as the broader pillar; link out to it once and to B5 (Ltd Co cohort) for the limited-company carve-out. Do NOT repeat the exemption taxonomy.

2. **`making-tax-digital-property-income-2026-complete-guide`** — broader pillar guide. Covers thresholds at headline level but not the gross-vs-net mechanic in mechanic-depth. Treat as pillar; link out once.

3. **`making-tax-digital-landlords-april-2026-deadline`** — date-anchored explainer; minimal mechanic depth. Light cross-link only.

4. **`how-to-switch-self-assessment-mtd-property-income`** — process page (the switching workflow). Distinct angle (process not threshold mechanic). Cross-link for the "I am in scope, what now" CTA.

5. **`mtd-quarterly-reporting-landlords-step-by-step-guide`** — quarterly process. Cross-link for the after-the-threshold-test workflow.

6. **B8 sibling `mtd-itsa-overview-six-changes-residential-landlords`** — bucket overview. Sibling reference; reverse cross-link from B8.

7. **B3 sibling `mtd-itsa-jointly-owned-property-threshold-split`** — applies the gross test to joint-owner split; your page is the general mechanic, B3 is the joint-ownership applied version. Cross-link.

**Differentiation move:** this page is the **operational mechanic** of the gross-income test at the boundary. Lead with the £52k-gross-£8k-net worked persona; develop the three-persona variant (gross-high-net-low landlord, mixed self-employment + rental, multi-property net-low after S24). The exemptions pillar covers WHO is excluded; this page covers HOW the test works for those WHO are not excluded. No CANNIBAL flag — clean differentiation.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Reviewed `Property/web/src/middleware.ts` 2026-05-22. No old slug overlaps with `mtd-itsa-qualifying-income-test-gross-vs-net`. The closest legacy redirect (`mtd-10000-threshold-when-does-it-apply` → `mtd-rental-income-threshold-exemptions`) belongs to B10 (policy-history page). No action required for this brief.

---

## Authority links worth considering for this bucket

- [HMRC Making Tax Digital for Income Tax guidance (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [Find software compatible with MTD for Income Tax (gov.uk supplier list)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 (digital reporting obligations, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [FA 2021 Sch 24 / 25 / 26 (new penalty regime as adapted for MTD ITSA)](https://www.legislation.gov.uk/ukpga/2021/26)
- [HMRC MTD overview (gov.uk)](https://www.gov.uk/government/publications/making-tax-digital/overview-of-making-tax-digital)
- [Spring Statement 2025 (penalty doubling for MTD ITSA late payments)](https://www.gov.uk/government/topical-events/spring-statement-2025)
- [Original 2018 MTD consultation outcome (gov.uk context)](https://www.gov.uk/government/consultations/making-tax-digital)

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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 3 (headline MTD ITSA position)** AND **section 19 (Wave 3 MTD extension)** which gives you the mandate timeline (50k April 2026, 30k April 2027, 20k April 2028), the qualifying-income gross-vs-net mechanic, the excluded categories (Ltd Cos out, partnerships deferred), joint-property owner threshold split, the three-year exit rule, software requirements, quarterly cycle dates, the points-based late-submission regime, the Spring Statement 2025 doubled late-payment regime (3%/3%/10%), and the abandoned 10k threshold history. Section 19 is the working detail; section 3 is the headline tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave3_site_wide_flags.md`.

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
- **Final slug:** mtd-itsa-qualifying-income-test-gross-vs-net
- **Final category:** Making Tax Digital (MTD)
- **H1 chosen:** How MTD ITSA Tests Your Qualifying Income (Gross, Not Net)
- **Meta title chosen:** MTD ITSA Qualifying Income: Gross-vs-Net Test Explained (55 chars)
- **Why these vs other options:** Lead with the user-question framing in the H1 (gross-vs-net) because that is the boundary-case search intent. Slug kept as brief-default (slug already named the mechanic). Category routed to Making Tax Digital (MTD) to cluster with the existing MTD pillar and daughter pages.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/what-is-qualifying-income-for-mtd/ — extracted SA-form-box anchors (SA103F box 15/16, SA103S box 9/10, SA105 box 20/22/23, SA106 box 14/16) and CY-2 mechanic. Used as primary competitor scaffold for the form-box section.
- gov.uk Spring Statement 2025 HTML (referenced from house positions §19.7 verification) — anchor for the 15/30/31 day-trigger penalty figures.
- legislation.gov.uk FA 2017 Sch 14 — statutory basis citation.

### Existing-page review (from "Closest existing pages")
- mtd-rental-income-threshold-exemptions: closest pillar. Differentiated by leading with the gross-vs-net mechanic at the boundary (£52k/£8k persona) rather than threshold schedule + exemption taxonomy. Linked out to it twice as the pillar.
- making-tax-digital-property-income-2026-complete-guide: cross-linked once at the end as the wider mandate overview.
- how-to-switch-self-assessment-mtd-property-income: cross-linked once at the end as the process page.
- buy-to-let-limited-company-complete-guide-uk: cross-linked once in the exclusion section (limited company income outside MTD entirely).
- B3 sibling page on joint-property threshold split: avoided direct link since B3 not yet written; pointed back to the exemptions pillar for joint-ownership headline rule. Will back-link from B3 when B3 ships.

### Citations added (external authority)
1. legislation.gov.uk FA 2017 Sch 14 (statutory basis)
2. gov.uk "Check if you're eligible to use Making Tax Digital for Income Tax" (eligibility checker)
3. gov.uk "Find software that's compatible with Making Tax Digital for Income Tax" (software list)
4. Spring Statement 2025 HTML (penalty mechanics — referenced verbally rather than direct hyperlink to keep authority count manageable)

Four direct authority hyperlinks in body. Within the 4-7 target.

### Internal links added (to our existing pages)
1. /blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions (twice: intro framing + joint-ownership sub-section)
2. /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk (Ltd Co exclusion)
3. /blog/making-tax-digital-mtd/how-to-switch-self-assessment-mtd-property-income (closing process pointer)
4. /blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide (closing pillar pointer)

All four resolve to existing content/blog/*.md files.

### Inline CTA placements
- Aside #1: after the persona-mechanic intro, before the three-persona drill-down (HMRC outreach letter triage offer).
- Aside #2: inside the reference-year section, framing the late-filed-return + accelerated penalty risk.
- Aside #3: in the "what to do if in scope" section, framing the qualifying income calculation service.

Three asides total (within the 1-3 guidance). No aside opens the page, none placed mid-worked-example.

### Build attempts
- npm install (worktree first build) + npm run build: clean. Static + dynamic routes generated; new page appears under ƒ /blog/[category]/[slug] route.
- Built HTML present at .next/server/app/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net.html.

### Verification
- FAQ schema count in built HTML matches frontmatter: 12 Questions in FAQPage JSON-LD = 12 in frontmatter ✓
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0 (no class= attributes anywhere in body)
- Meta title length: 55 (max 62) ✓
- Meta description length: 155 (max 158) ✓
- Internal links resolve: 4/4 target files exist in Property/web/content/blog/ ✓
- monitored_pages row inserted: yes (rewrite_type='rewrite', 90-day window, notes "Wave 3 Session B net-new (MTD ITSA bucket B1)")
- Body word count: 3,196 (within 2,500-3,500 framing-differentiator-led range)

### Flags raised to wave3_site_wide_flags.md
- F-7 EXISTING_PAGE_STALE: mtd-rental-income-threshold-exemptions has incorrect exit-period figure ("two consecutive tax years" in one FAQ vs the correct three-year rule), incorrect quarterly deadlines (cites 5 Aug / 5 Nov / 5 Feb / 5 May; gov.uk + house position §19.6 give 7 Aug / 7 Nov / 7 Feb / 7 May), and incorrect late-payment penalty rates (cites 2% at 15 days + 2% at 30 days; Spring Statement 2025 corrected to 3% / 3% / 10% on 15/30/31 day-triggers for MTD ITSA filers). Needs a back-patch.

### 2-3 sentence summary
Wrote the mechanic-deep gross-vs-net qualifying-income page anchored on three boundary personas (leveraged BTL £52k/£8k, mixed self-employment + rental £56k, multi-property £82k with Section 24 bite). Differentiated from the existing exemptions pillar by leading with the operational mechanic and the SA-form-box anchors rather than threshold schedule + exemption taxonomy. Flagged three factual errors in the existing exemptions pillar (exit period, quarterly deadlines, post-Spring-Statement penalty rates) for back-patch via wave3_site_wide_flags F-7.
