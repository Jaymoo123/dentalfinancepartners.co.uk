# Wave 3 brief: ated-late-filing-penalty-appeal-reasonable-excuse

**Site:** property
**Bucket:** ATED (Annual Tax on Enveloped Dwellings)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/ated-late-filing-penalty-appeal-reasonable-excuse.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ated-late-filing-penalty-appeal-reasonable-excuse

---

## Manager pre-decisions

- **Suggested slug:** `ated-late-filing-penalty-appeal-reasonable-excuse`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** ATED (Annual Tax on Enveloped Dwellings)
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Appeals procedure page for ATED penalties. The penalty schedule (100 / 200 / 300 / 300 escalation) is covered in existing `ated-late-filing-penalties-mechanics`; this page is what happens AFTER. Covers FA 2009 Sch 55 reasonable-excuse test, the FTT appeal route, key tribunal decisions on what counts as reasonable excuse for ATED specifically (distinct from VAT and IT case law), special circumstances reduction, and the practical decision tree: when to appeal, when to accept and just file. Anchored on tribunal precedent rather than just policy.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/ated-late-filing-penalty-failed-reasonable-excuse-or-special-circumstances-appeal/ (Stage 2 verified live 2026-05-22; on-topic). Built around the **Conchri Investments Limited v HMRC [2025] UKFTT 600 (TC)** decision — appellant lost on reasonable-excuse grounds (ignorance of law; reliance on accountants; HMRC has no notification duty) and on special-circumstances (no tax due / RDR still required). Penalties spanned 193 to 3,773 days totalling £15,700. Excellent case-law anchor.
- https://www.ukpropertyaccountants.co.uk/ated-penalties-and-appeals/ (Stage 2 verified live 2026-05-22; on-topic — second source confirmed in candidates_selected.md merge note). Covers ATED deadlines, penalty cascade (£100 + £900 daily cap + £300/5% at 6m and 12m), 30-day appeal window, HMRC postal address (HMRC ATED Penalty Appeals, Stamp Taxes, BX9 1HD), reasonable-excuse categories (bereavement, hospitalisation, serious illness, misunderstanding obligations). NOTE: this page lacks Schedule 55 FA 2009 statutory references and lacks FTT case citations — session should compensate with deeper legal grounding.
- https://www.legislation.gov.uk/ukpga/2009/10/schedule/55 (FA 2009 Sch 55 — the statutory penalty regime; cite at the cascade section).
- https://www.legislation.gov.uk/ukpga/2009/10/schedule/56 (FA 2009 Sch 56 — late-payment penalty regime; cite where the brief discusses late-payment penalties alongside late-filing).
- https://www.gov.uk/tax-and-chancery-tribunal-decisions (HMCTS Tax Tribunal decisions search — session can locate additional ATED reasonable-excuse cases for variety beyond Conchri; suggested search terms: "ATED" + "reasonable excuse", "ATED" + "Schedule 55", "ATED" + "special circumstances").
- https://www.gov.uk/hmrc-internal-manuals/compliance-handbook (HMRC Compliance Handbook — CH71500 onwards covers reasonable excuse for Schedule 55 / 56; cite where the brief discusses HMRC's own treatment of the test).

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

1. `ated-late-filing-penalties-mechanics` (Incorporation & Company Structures). **Tight pairing.** Existing page covers the penalty cascade, the £15,700 trap reference, and headline reasonable-excuse mechanics in FAQ form. *Differentiation:* the existing page is the penalty-cascade mechanic (what the cascade looks like and what bites when). This new page is the **appeal procedure deep-dive**: how to file the appeal, the 30-day deadline, what evidence to file, FTT case-law citations (Conchri Investments Ltd v HMRC [2025] UKFTT 600 TC as anchor; sessions to add 2-3 further ATED-relevant FTT decisions found at write-time), what arguments succeed vs fail, what to do after an HMRC review refusal (notify the FTT directly under TMA 1970 s.49D-equivalent for ATED). Cross-link bilaterally; raise F-XX INTERNAL_LINK suggesting the penalties-mechanics page's FAQ "How do I appeal an ATED penalty?" links forward to this page.
2. `ated-complete-guide-2026-27`. Pillar mentions appeals in FAQ. *Differentiation:* one-paragraph cross-link.
3. Sibling A5 (amendment). Adjacent — sometimes amendment avoids the need to appeal (the inaccuracy correction route). Cross-link in the "consider amendment first" section.
4. Sibling A8 (overseas OTM). Adjacent — overseas companies who received OTM letters and faced penalties post-disclosure are a natural audience for this page. Cross-link.
5. `sdlt-refund-scams-how-to-avoid` (Wave 1) and `sdlt-five-percent-surcharge-refund-claim-process` (Wave 1). Lateral — different tax, same FTT appeals process discipline. Cross-link in the "wider tax appeal landscape" closing section only if relevant.

**Cannibalisation judgement:** clear differentiation by procedural angle (cascade vs appeal). No CANNIBAL flag, but session must DISCIPLINE itself not to re-cover the penalty cascade in the body — point at the existing mechanics page and dive into appeal procedure + case law.

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
- **Final slug:** ated-late-filing-penalty-appeal-reasonable-excuse
- **Final category:** incorporation-and-company-structures (overridden per F-2)
- **H1 chosen:** "Appealing an ATED Late-Filing Penalty: Reasonable Excuse, Special Circumstances, and the First-tier Tribunal Route"
- **Meta title chosen:** "ATED Penalty Appeals: Reasonable Excuse and FTT Route" (53 chars)
- **Why these vs other options:** Title leads with the high-search query "ATED penalty appeals", anchors on the two statutory grounds (reasonable excuse + special circumstances per Sch 55 paras 23 and 16), and signals the FTT route as the procedural destination. Distinguishes from the existing penalty-cascade mechanic page.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/ated-late-filing-penalty-failed-reasonable-excuse-or-special-circumstances-appeal/ — full extract on Conchri Investments Ltd v HMRC [2025] UKFTT 600 (TC). Confirmed facts (193-3,773 days late, £15,700 total penalties, 10-year non-compliance, overseas-incorporated co, rental-relief claim), the three failed reasonable-excuse grounds, and the special-circumstances dismissal.
- https://www.ukpropertyaccountants.co.uk/ated-penalties-and-appeals/ — full extract on procedural mechanics (30-day appeal window, BX9 1HD postal address, HMRC's four reasonable-excuse categories, postal vs FTT routes).

### Existing-page review (from "Closest existing pages")
- ated-late-filing-penalties-mechanics: tight pairing. Existing covers the cascade; this is the appeal procedure that comes after. Discipline held: this page does NOT re-cover the cascade in body, only references it.
- ated-complete-guide-2026-27: pillar; one-paragraph cross-link.
- A5 sibling (amendment): adjacency where amendment is the better fix; cross-link in decision tree.
- A8 sibling (OTM): adjacency where penalty arose from OTM-triggered filing; cross-link in decision tree.

### Citations added (external authority)
1. Schedule 55 FA 2009 (legislation.gov.uk) — paragraph 23 reasonable excuse + paragraph 16 special circumstances + paragraph 22 late appeal
2. Schedule 56 FA 2009 (legislation.gov.uk) — parallel late-payment regime
3. First-tier Tax Tribunal decisions database (gov.uk)
4. HMRC Compliance Handbook CH71500 (gov.uk)
5. HMRC ATED Manual (gov.uk)
6. FTT appeal guidance (gov.uk)
- Plus: Conchri Investments Limited v HMRC [2025] UKFTT 600 (TC) cited throughout as the modern controlling authority.

### Internal links added
- ated-late-filing-penalties-mechanics (cascade pillar)
- ated-return-amendment-corrections-procedure (A5)
- ated-overseas-companies-voluntary-compliance-otm-letters (A8)
- ated-complete-guide-2026-27

### Inline CTA placements
- Aside 1: after opening framing, before "When the Right Move Is to Appeal" H2 — peak-intent moment for a recipient holding a fresh penalty notice
- Aside 2: after the decision tree section — peak-intent moment for a multi-period stack reader

### Build attempts
- Single build pass at 2026-05-23T00:50Z, clean.

### Verification
- FAQ schema count: 14 = 14
- Em-dashes: 0 (initially 1 in FAQ #11, removed to comma)
- Tailwind classes: 0
- Meta title length: 53
- Meta description length: 154
- Internal links resolve: yes (4 unique, all existing siblings/pillar)
- monitored_pages row inserted: yes
- Body word count: 2,615

### Flags raised to wave3_site_wide_flags.md
- None new. F-4 already anticipates the back-link patches from the penalty cascade page to A9.

### 2-3 sentence summary
A9 is the appeals-procedure deep-dive anchored on Conchri Investments Limited v HMRC [2025] UKFTT 600 (TC) and the Schedule 55 FA 2009 statutory framework. Covers the 30-day window, the statutory reasonable-excuse test at paragraph 23 with the three express exclusions, the special-circumstances discretion at paragraph 16, the four HMRC-listed grounds with realistic FTT success rates table, the HMRC review vs FTT direct-notification routes, the evidence pack, and a 4-tier decision tree on whether to appeal or pay. Discipline held: does not re-cover the cascade itself, points to the existing mechanics page.
