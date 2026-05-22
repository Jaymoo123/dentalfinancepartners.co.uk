# Wave 3 brief: ated-six-step-compliance-walkthrough-uk-non-natural-persons

**Site:** property
**Bucket:** ATED (Annual Tax on Enveloped Dwellings)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/ated-six-step-compliance-walkthrough-uk-non-natural-persons.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ated-six-step-compliance-walkthrough-uk-non-natural-persons

---

## Manager pre-decisions

- **Suggested slug:** `ated-six-step-compliance-walkthrough-uk-non-natural-persons`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** ATED (Annual Tax on Enveloped Dwellings)
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Process-walkthrough page (six steps: chargeable-person check, dwelling valuation, return preparation, payment by 30 April, relief claim if applicable, ongoing-year monitoring). HowTo schema candidate (flag in work-log; orchestrator decides). Designed for the first-time filer who has just become aware of ATED (typical scenario: company purchases a 700k flat as director housing, year 1 ATED return due). Distinct from A1 (strategic positioning) by being step-by-step; distinct from A5 (amendment) by being first-filing only.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://uklandlordtax.co.uk/tax-guide/annual-tax-on-enveloped-dwellings-ated/ (manager-pre-filled primary; Stage 2 could not fetch directly due to permission restriction on the uklandlordtax host. Documented in `wave3_candidates_selected.md` as a verified competitor signal. Session should attempt direct fetch on the day; if it 404s or returns no content, fall back to the gov.uk + UKPA primaries below).
- https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics (gov.uk primary; verified live 2026-05-22). Walks through the same six operational stages this page builds (who is in scope, valuation, return, payment, reliefs, ongoing). Authoritative.
- https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-returns (gov.uk official returns guidance — the operational backbone for steps 3-4 of the walkthrough).
- https://www.gov.uk/hmrc-internal-manuals/annual-tax-on-enveloped-dwellings (HMRC ATED Manual — authority for any step-specific HMRC procedural detail).
- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-annual-tax-on-enveloped-dwellings/ (verified live 2026-05-22; on-topic — see A1 brief). Useful as a competitor structural cross-reference because their "registration / submission / payment / reliefs" sub-headings map closely to the six-step framing.
- https://www.legislation.gov.uk/ukpga/2013/29/part/3 (FA 2013 Part 3 — statutory anchor; cite at step 1).

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

1. `ated-complete-guide-2026-27`. Pillar — most-comprehensive existing ATED page. **Highest cannibalisation watch.** *Differentiation:* the pillar is the substantive deep-dive (statute, scope, reliefs, mechanics, penalty cascade). This page is the **process walkthrough** — a step-by-step operational sequence for a first-time filer: (1) determine scope, (2) value the property, (3) prepare the return (RDR vs ATED return), (4) submit by 30 April, (5) claim relief / pay tax, (6) ongoing monitoring + clawback discipline. HowTo schema candidate (flag SCHEMA in work-log). Cross-link densely; cite the pillar for substance and link out at every step for the deep mechanic.
2. Sibling A1 (overview / strategic). Co-equal — A1 is the "should you care" page; A10 is the "here is how you operationally comply" page. Cross-link bilaterally.
3. Sibling A2 (rates), A5 (amendment), A7 (valuation), A9 (appeals). Each maps to a step in the walkthrough: A2 supports step 3 (charge calculation), A7 supports step 2 (valuation), A5 supports step 6 (ongoing monitoring / amendments), A9 supports the contingent path if step 4 deadline missed. Cross-link explicitly at each step.
4. `buy-to-let-limited-company-complete-guide-uk` (Incorporation & Company Structures). Adjacent — directors arriving here from BTL Ltd Co context. One-paragraph cross-link in step 1.
5. `incorporating-property-portfolio-uk-2026`. Adjacent — newly-incorporated holders are the prime first-time-filer audience. Cross-link in step 1.
6. `non-resident-landlord-scheme-uk-complete-guide`. Lateral — overseas-company-held ATED dwellings also have NRL obligations. One-line cross-link.

**Cannibalisation judgement:** highest-risk page in the bucket alongside A2. **CANNIBAL flag candidate** if the session reproduces pillar narrative. Discipline: each step is one short paragraph + a cross-link to the relevant Wave 3 sibling or existing pillar for depth. Word count should be moderate (not maximalist) because the value proposition is the SEQUENCE, not the depth. SCHEMA flag: HowTo schema is a strong candidate for SERP differentiation — session to raise SCHEMA flag for orchestrator decision on whether to inject HowTo schema in the template.

**Category note:** override to `incorporation-and-company-structures`.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

no redirect overlap (middleware.ts checked 2026-05-22).

---

## Authority links worth considering for this bucket

- [HMRC ATED Manual (gov.uk Internal Manuals)](https://www.gov.uk/hmrc-internal-manuals/annual-tax-on-enveloped-dwellings)
- [ATED return guidance (gov.uk)](https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-returns)
- [ATED rates and bands (gov.uk current-year table)](https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-technical-guidance)
- [FA 2013 Part 3 (ATED introduction, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2013/29/part/3)
- [Schedule A1 IHTA 1984 (IHT look-through for enveloped UK residential property)](https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1)
- [Register of Overseas Entities (gov.uk)](https://www.gov.uk/guidance/register-an-overseas-entity)
- [FA 2009 Sch 55 (penalties for failure to make returns)](https://www.legislation.gov.uk/ukpga/2009/10/schedule/55)
- [HMRC ATED-CGT abolition guidance (FA 2019 transitional)](https://www.gov.uk/government/publications/non-resident-companies-chargeable-gains-on-uk-immovable-property)

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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 2 (headline ATED position)** AND **section 18 (Wave 3 ATED extension)** which gives you the 2026/27 band figures (verified 2026-05-22), the relief catalogue with statutory citations, the 30 April return mechanic, the five-yearly + acquisition valuation rules, the ATED-CGT abolition framing, the RoE interaction, and the OTM compliance campaign signal. Section 18 is the working detail; section 2 is the headline tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave3_site_wide_flags.md`.

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
- **Final slug:** ated-six-step-compliance-walkthrough-uk-non-natural-persons
- **Final category:** Incorporation & Company Structures (override per F-2)
- **H1 chosen:** "ATED Compliance in Six Steps: A Walkthrough for First-Time Filers (UK Non-Natural Persons)"
- **Meta title chosen:** "ATED Compliance Walkthrough: Six Steps for First-Time Filers" (60 chars)
- **Why these vs other options:** the page is the operational map for the bucket; the title leads with "ATED Compliance Walkthrough" because that is the query a first-time filer types, and the "Six Steps" framing previews the structure on the SERP. Category overridden to incorporation-and-company-structures per F-2 to keep the ATED cluster on a single category index (the four existing ATED pages and all nine Wave 3 siblings all sit there).

### Competitor URLs fetched
- gov.uk "ATED: the basics" — confirmed the six-stage lifecycle skeleton, 5-yearly revaluation, registration-then-return sequence.
- gov.uk "ATED returns" guidance — RDR vs standard ATED return distinction; online service + agent route; amendment via paper or online.
- ukpropertyaccountants.co.uk full guide — operational structure validated; their 30-day acquisition window and 90-day new-build window confirmed; ATED1 form name for overseas companies without UTR confirmed; 60-day draft save period confirmed; Government Gateway + UTR registration requirements confirmed.
- (uklandlordtax.co.uk attempted; restricted, fell back to gov.uk + UKPA as primaries per brief instruction.)

### Existing-page review (from "Closest existing pages")
- Pillar `ated-complete-guide-2026-27` — read for cannibalisation discipline. Pillar is body-only HTML, substantive treatment of all four limbs; the F-3 watchpoint held by writing each of the six steps as one short paragraph + forward-link to the sibling that goes deeper. The pillar's operational sections are not reproduced.
- Sibling A1 (overview): linked from step 1 (strategic framing).
- Sibling A2 (rates): linked from step 3 (band charge + day-apportionment maths).
- Sibling A3 (clawback): linked from step 6 (ongoing-year monitoring).
- Sibling A4 (related-persons test): linked from step 5 (relief claim hardest call).
- Sibling A5 (amendment): linked from step 6 + FAQ on missed relief.
- Sibling A6 (mixed-use): linked from step 2 (mixed-use apportionment).
- Sibling A7 (valuation): linked from step 2 (valuation date) + FAQ on 2027 revaluation.
- Sibling A8 (OTM letters): linked from FAQ on overseas-company UTR.
- Sibling A9 (penalty appeal): linked from step 4 (cascade if 30 April missed) per launch-prompt direction.
- Existing pillar pages on rental-business relief mechanics, late-filing-penalties mechanics, SDLT 15% interaction all forward-linked from the closing "Where these sit alongside" panel.

### Citations added (external authority)
6 in the closing Authority Sources block: gov.uk "the basics", gov.uk "returns", HMRC ATED Internal Manual, FA 2013 Part 3, FA 2009 Schedule 55, Register of Overseas Entities. In-body citations include s.94 FA 2013 (chargeable persons), s.133 FA 2013 (rental-business relief), Schedule 55 FA 2009 (penalty cascade), and the Conchri Investments Limited v HMRC [2025] UKFTT 600 (TC) reference in the FAQ on the biggest first-filer mistake.

### Internal links added (to our existing pages)
13 distinct internal links to ATED siblings + pillars within the incorporation-and-company-structures category. Each link is one click from the relevant step; no link is repeated more than twice (intro + closing panel for the two anchors A1 and the pillar, single occurrence for all others).

### Inline CTA placements
2 asides: one after step 6 (end of the six-step decision-framework section); one after the worked mini-walkthrough (after the numerical example). No opening aside; no aside inside the worked example.

### Build attempts
1. `cd Property/web && npm run build` — clean. Only pre-existing unrelated warnings in calculators / Image element / unused-vars elsewhere in the codebase; nothing in the new file.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 ✓
- Em-dashes in markdown: 0 (body + FAQs) ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 60 (≤62) ✓
- Meta description length: 141 (≤158) ✓
- Internal links resolve: 13/13 ✓ (also category-URL verified per F-12: all 13 targets carry frontmatter category "Incorporation & Company Structures")
- monitored_pages row inserted: id 154 ✓
- Body word count: 2,274 (moderate per F-3 discipline; the value of this page is the SEQUENCE not the depth, sibling pages carry the depth)

### Flags raised to wave3_site_wide_flags.md
- F-14 (SCHEMA): HowTo schema candidate for this page; orchestrator decision post-merge per brief instruction.

### 2-3 sentence summary
A10 closes Wave 3. The page is the operational map across the ATED bucket: chargeable-person check, valuation at the correct date, return type and preparation, submission and payment by 30 April, relief claim on the return itself, and ongoing-year monitoring. Each step is one short paragraph with a forward-link to the sibling page that goes deeper, holding the F-3 cannibalisation discipline against the pillar; the worked £700,000 London flat mini-walkthrough ties the six steps to one concrete first-year scenario.
