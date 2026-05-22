# Wave 3 brief: ated-relief-related-persons-market-rent-test

**Site:** property
**Bucket:** ATED (Annual Tax on Enveloped Dwellings)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/ated-relief-related-persons-market-rent-test.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ated-relief-related-persons-market-rent-test

---

## Manager pre-decisions

- **Suggested slug:** `ated-relief-related-persons-market-rent-test`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** ATED (Annual Tax on Enveloped Dwellings)
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The s.133 FA 2013 unconnected-tenant-on-commercial-terms test in the context where the tenant IS a related person. Specific scenarios: director adult-children tenancy at full market rent; portfolio company letting to associated trading company relocation pool; family trust occupying via lease structured commercially. Covers what 'commercial terms' means when the parties are related (HMRC view: independent valuation evidence, monthly rent demonstrably received, same terms an unconnected tenant would accept). Highly practical advisory page; distinct from A3 (clawback after relief granted) because this is about whether relief is granted at all.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/ated-relief-for-related-persons-and-market-rent-a-complete-guide/ (Stage 2 verified live 2026-05-22; on-topic). Covers what counts as a related/non-qualifying person, that market rent does NOT cure the connection, factors signalling non-commercial intent (no public advertising, unusual lease terms, sub-market pricing, lax enforcement), and a £2m / £30,550 worked example contrasting related vs unrelated tenant.
- https://www.gov.uk/hmrc-internal-manuals/annual-tax-on-enveloped-dwellings (HMRC ATED Manual — find the pages on non-qualifying individual / connected person / market-rent guidance; cite at the "market rent does not cure connection" section).
- https://www.legislation.gov.uk/ukpga/2010/4/section/1122 (s.1122 CTA 2010 — the connected-persons statutory test).
- https://www.legislation.gov.uk/ukpga/2013/29/section/133 (FA 2013 s.133 — the rental relief; the unconnected-tenant requirement).

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

1. `ated-rental-property-relief-mechanics` (Incorporation & Company Structures). **HIGH overlap risk.** Existing page covers s.1122 CTA 2010, commercial-terms test, and the director's-adult-child-at-market-rent FAQ already. *Differentiation:* the existing page is the relief-mechanics deep-dive across all dimensions (connection, commercial terms, voids, refurbishment). This new page is the **narrow market-rent-test scenario** for directors' family arrangements: it lives or dies on detailed worked examples of who is and is not "related", what evidence HMRC seeks for the market-rent test, and the specific family-letting scenarios (parent-to-child, child-to-parent, sibling-to-sibling, divorced-spouse, civil-partner-cohabitant, in-laws). **CANNIBAL flag candidate** — if the session finds itself re-writing the relief-mechanics page's connected-persons section, that is the alarm. Resolution: keep this page entirely scenario-driven (8-12 worked family scenarios with HMRC's likely answer); link out for the wider relief mechanic. Cross-link bilaterally.
2. `ated-complete-guide-2026-27`. Pillar. *Differentiation:* one-paragraph cross-link only.
3. Sibling A3 (clawback). Lateral — A4 deals with the connection test as a barrier to claim; A3 deals with the connection-by-occupation event as a clawback trigger. Same s.1122 substrate, different operational moment. Cross-link.
4. `buy-to-let-limited-company-complete-guide-uk`. Adjacent — directors who buy through a Ltd Co for family use often arrive here without knowing about ATED. Cross-link to send them to the ATED pillar.
5. `incorporating-property-portfolio-uk-2026` and `transferring-fhl-portfolio-to-limited-company`. Adjacent — both contexts where a family-member tenant might appear post-incorporation. One-line cross-links only.

**Cannibalisation judgement:** raised as a watchpoint but resolvable through scenario-density discipline. Session should structure body as: short statutory intro -> 8-12 family scenarios with HMRC stance -> evidence checklist -> what to do if HMRC enquires. No re-coverage of the connected-persons statutory test in narrative form; bullet it and link to existing relief mechanics page.

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

## Per-page work-log

### Decisions
- Slug / category: as briefed; category overridden to incorporation-and-company-structures (F-2).
- H1: "ATED Relief and Related Persons: When Market Rent Does Not Cure Connection"
- Meta title: "ATED Relief & Related Persons: The Market-Rent Test" (51 chars)
- Structural discipline: 10 scenarios with HMRC's stance (per F-3 cannibalisation discipline against `ated-rental-property-relief-mechanics`), short statutory framing only.

### Competitor URLs fetched
- Stage 2 validation; ukpropertyaccountants + HMRC ATED Manual + FA 2013 ss.133, 145 + CTA 2010 s.1122 confirmed.

### Existing-page review
- `ated-rental-property-relief-mechanics`: claim-side mechanics. A4 differentiated by scenario density; statutory test bullet-only.
- A3 sibling clawback: lateral; cross-link.

### Citations added
- HMRC ATED Manual (ATED20100)
- FA 2013 s.133
- FA 2013 s.145 (Employee Accommodation Relief)
- CTA 2010 s.1122
- FA 2009 Sch 24

### Internal links added
- A1, A2, A3, ated-rental-property-relief-mechanics, ated-complete-guide-2026-27, ated-late-filing-penalties-mechanics, A9 (appeals cross-link)

### Inline CTA placements
- Two asides: (1) after Scenario 6 (the family-letting connection-extension cluster); (2) after Evidence Discipline section (enquiry response moment).

### Build attempts
- Build 1 clean.

### Verification
- FAQ schema count: 14 / 14 ✓
- Em-dashes: 0 ✓
- Tailwind: 0 ✓
- Meta title: 51 ≤ 62 ✓
- Meta description: 149 ≤ 158 ✓
- Internal links resolve: 7 unique targets ✓
- monitored_pages: id 130 ✓
- Body word count: 2,523 (low end of 2,500-3,500 — scenario density carries the page; further word count would dilute the per-scenario clarity)

### Flags raised
- None new; existing F-4 / F-7 back-patch suggestions already capture the cross-link batch.

### 2-3 sentence summary
A4 is the scenario-driven family-letting page: 10 fact patterns (director's adult child / parent / sibling / ex-spouse / cohabitant / mother-in-law / co-shareholder's child / group-relocation employee / family-trust beneficiary / lease-and-sublease chain), each with HMRC's likely stance and the statutory hook. The five-anchor evidence discipline + HMRC enquiry response sequence closes. F-3 cannibalisation discipline against `ated-rental-property-relief-mechanics` held by scenario density; no narrative re-statement of the connected-persons test.
