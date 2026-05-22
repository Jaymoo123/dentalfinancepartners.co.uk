# Wave 3 brief: rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence

**Site:** property
**Bucket:** Renters Rights Act 2025 + Tenancies
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence

---

## Manager pre-decisions

- **Suggested slug:** `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** Renters Rights Act 2025 + Tenancies
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Operational compliance and defence page for landlords facing or anticipating enforcement action under the Renters Rights Act 2025. The Act extends the civil-penalty regime introduced by the Housing and Planning Act 2016 (financial penalties up to 30,000 GBP, banning orders, rogue-landlord database entry) into the new RRA-2025 obligations: PRS database non-registration, PRS Ombudsman non-enrolment, Decent Homes Standard breaches, unlawful possession attempts during the Section 21 transition. Covers the local-authority enforcement process, representations + First-Tier Tribunal Property Chamber appeal routes, the practical compliance checklist that reduces enforcement risk, and the firm's defence angle for landlords post-notice. Distinct from C6 (PRS Database + Ombudsman REGISTRATION mechanics) by being post-breach not pre-enrolment; distinct from C5 (Decent Homes COMPLIANCE) by covering the enforcement layer above specific obligations. High-intent commercial moment: landlords facing financial-penalty notices need defence guidance, this is a lead-form-conversion page. **Manager swap-in note:** this brief replaces the earlier `renters-rights-act-2025-tax-implications-comprehensive-update` C1 slot, which was reframed as a rewrite of the existing `renters-rights-act-2026-tax-implications-landlords` page (legacy-rebuild track, not Wave 3 net-new) given the citation-staleness of the existing page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

Validated 2026-05-22 by Stage 2 sub-agent. Statutory guidance has bifurcated since 1 May 2026: the original HP Act 2016 civil-penalty guidance now reads "for offences committed before 1 May 2026", with newer RRA-2025 offences sitting under a parallel "Civil penalties under the Renters' Rights Act 2025 guidance" page. Both branches need to be cited because landlords face pre-1-May-2026 enforcement (HP Act 2016 + Housing Act 2004 baseline) AND post-1-May-2026 enforcement (RRA 2025 s.15-16 + Sch.5 + amended Sch.4) in the transitional window.

- https://www.legislation.gov.uk/ukpga/2025/26/contents (Renters' Rights Act 2025 contents page; primary statutory text; sections 15, 16, Schedule 5, and Part 4 enforcement provisions are the load-bearing references; verified live)
- https://www.legislation.gov.uk/ukpga/2016/22/part/2 (Housing and Planning Act 2016 Part 2; civil penalties + banning orders + rogue-landlord database baseline; verified live; still operative for pre-1-May-2026 offences)
- https://www.gov.uk/government/publications/civil-penalties-under-the-housing-and-planning-act-2016 (gov.uk statutory guidance, 20-page PDF; verified live; expressly scoped to offences committed before 1 May 2026; banning-order amendment from 6 April 2018 noted)
- https://www.gov.uk/government/publications/database-of-rogue-landlords-and-property-agents-under-the-housing-and-planning-act-2016 (gov.uk database guidance; for repeat-offender database inclusion criteria; sessions should also cite the RRA 2025 PRS Database (pending commencement) as the distinct, separate national register)
- https://www.gov.uk/government/organisations/first-tier-tribunal-property-chamber (FTT Property Chamber; appeals route under HP Act 2016 Sch.13 and RRA 2025 s.16; verified live)
- https://www.legislation.gov.uk/uksi/2026/421/made (Commencement No. 2 + Transitional and Saving Provisions Regulations 2026; appointed-day 1 May 2026; key for the bifurcation timeline)

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml. Read what they actually have. Session may add ukpropertyaccountants.co.uk landlord-defence content if a specific competitor angle emerges during research.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Reasoned 2026-05-22 by Stage 2 sub-agent against the full 346-page Property blog inventory. Token-similarity matcher NOT used (§16.11 Wave 2 lesson). The Property inventory has no existing dedicated page on civil-penalty defence, banning orders, rogue-landlord-database inclusion, or local-authority housing enforcement; this brief is genuinely net-new.

Neighbours (closest by topical adjacency, written-from-this-angle still distinct):

1. **`renters-rights-act-2026-tax-implications-landlords`** (category: landlord-tax-essentials; framing: tax-implications-of-the-Act as a whole). Background reference, not topical overlap. The page treats RRA as a regime shift on tax cash flow, NOT as an enforcement framework. **Stage 2 note:** this page is queued for rewrite under F-1 (legacy-rebuild track) because of stale "2026 / in-passage / May 2026" citations. C1 should link forward to it as the post-rewrite tax companion AND should NOT duplicate any of its tax-cash-flow framing. No cannibalisation flag, complementary scopes.

2. **`hmo-licensing-fees-tax-deductible-uk-landlords`** (category: property-types-and-specialist-tax; framing: tax deductibility of HMO + selective licensing fees, late-application penalty deductibility). Closest existing for the *deductibility-of-enforcement-costs* question. C1 should reference it briefly when discussing the deductibility of legal fees defending a financial-penalty notice and link out for the deeper licensing-fee deductibility treatment.

3. **`hmrc-penalties-late-landlord-tax-returns-2026`** (category: landlord-tax-essentials; framing: HMRC late-filing penalty mechanics under FA 2009 Sch.55 / 56). Useful contrast page only: C1 is local-authority civil penalties under HP Act 2016 + RRA 2025; the HMRC page is the tax-administration penalty regime. Link out as "the tax-side penalty equivalent". No overlap.

4. **`hmo-landlord-accounting-multi-tenant-property-tax`** (category: landlord-tax-essentials). Sibling for the HMO-licensing enforcement context (council enforcement parallel). Mention as adjacent reading; no content overlap.

5. **`first-time-landlord-tax-guide-everything-you-need-to-know`** (category: landlord-tax-essentials). Background pillar where a new landlord might first encounter RRA compliance obligations. Suitable as a "next reading" downstream link; no overlap.

**Differentiation move for this page:** sit one layer ABOVE the compliance pages (C5 Decent Homes compliance, C6 PRS Database registration, C8 tenancy agreement clauses). Frame as the post-breach enforcement / defence layer, anchored on local-authority financial-penalty notices, appeals to FTT Property Chamber under HP Act 2016 Sch.13 (pre-1-May-2026 offences) and RRA 2025 s.16 (post-1-May-2026 offences), banning-order regime, rogue-landlord-database listing, and the tax-deductibility / capital-vs-revenue question on associated legal fees.

No cannibalisation flag raised.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 2 validation (2026-05-22): grepped `Property/web/src/middleware.ts` against the slug tokens (renter, civil, penalty, banning, rogue, enforcement, eviction, possession, housing-act). No legacy redirect entries match this slug's token set. The only RRA-adjacent middleware entry is `"renters-rights-act-2026-tax-implications-landlords": "landlord-tax-essentials"`, which points at the existing page (not relevant to this brief's redirect handling). No redirect repointing required on launch.

---

## Authority links worth considering for this bucket

- [Renters Rights Act 2025 (legislation.gov.uk, 2025 c. 26)](https://www.legislation.gov.uk/ukpga/2025/26/contents)
- [Housing and Planning Act 2016 Part 2 (civil penalties + banning orders + rogue landlord database)](https://www.legislation.gov.uk/ukpga/2016/22/part/2)
- [Housing Act 1988 (legislation.gov.uk, ss.5 / 8 / 13 / 21 baseline)](https://www.legislation.gov.uk/ukpga/1988/50/contents)
- [First-Tier Tribunal Property Chamber decisions (gov.uk)](https://www.gov.uk/government/organisations/first-tier-tribunal-property-chamber)
- [gov.uk civil penalties guidance for local housing authorities](https://www.gov.uk/government/publications/civil-penalties-under-the-housing-and-planning-act-2016)
- [gov.uk database of rogue landlords and property agents](https://www.gov.uk/government/publications/database-of-rogue-landlords-and-property-agents-under-the-housing-and-planning-act-2016)
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
- **Final slug:** rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence (no override)
- **Final category:** landlord-tax-essentials (no override)
- **H1 chosen:** "Civil Penalty Notices and Banning Orders: Landlord Defence Under the Renters' Rights Act 2025"
- **Meta title chosen:** "Civil Penalty + Banning Order Defence: RRA 2025 Landlords" (57 chars)
- **Why these vs other options:** Lead with the two operational artefacts a landlord sees in practice (civil penalty notice, banning order) and the defence frame, ahead of the regime label. RRA 2025 in title positions for the post-1-May-2026 cohort searches. "Landlords" rather than "for landlords" to save characters.

### Competitor URLs fetched
- https://www.legislation.gov.uk/ukpga/2025/26/contents (via WebFetch due to httpx 437 block) — confirmed Part 4 enforcement architecture, ss.15-17 + Sch.5 penalty framework, ss.91-92 database offences, s.67 ombudsman membership offences, s.58 unlawful eviction, s.90 possession bar for unregistered properties.
- https://www.legislation.gov.uk/ukpga/2016/22/part/2 (via WebFetch) — HP Act 2016 Part 2: s.14 banning order definition, s.17 min 12-month duration, s.21 criminal breach, s.23 financial penalty for breach (£40k post-2026), s.28 database, ss.29-30 mandatory + discretionary inclusion, s.32 appeal route, s.40 banning offence list.
- https://www.gov.uk/government/publications/civil-penalties-under-the-housing-and-planning-act-2016 (httpx 200) — confirmed gov.uk has rescoped to pre-1-May-2026 offences only since 1 May 2026. Banning-order amendment from 6 April 2018 noted.
- https://www.gov.uk/government/publications/database-of-rogue-landlords-and-property-agents-under-the-housing-and-planning-act-2016 (httpx 200) — mandatory inclusion after banning order; discretionary after conviction or 2 penalties in 12 months.
- https://www.legislation.gov.uk/uksi/2026/421/made (via WebFetch) — confirmed 1 May 2026 appointed day, Reg 2 covers Chapter 1 Part 1 + Sch 1 + Sch 2 (tenancy reform), Reg 3 covers s.25(3), Ch.3, Ch.6, ss.58/62/74/97-109. Confirmed Student Ground 4A transitional reduction to 2 months May-Jul 2026.

### Existing-page review (from "Closest existing pages")
- `renters-rights-act-2026-tax-implications-landlords` — existing tax-implications page, queued for legacy-rebuild rewrite under F-1. Read; this defence page does NOT duplicate the tax-cash-flow framing. Forward-linked from this page; back-link to be raised as F-XX after the legacy rewrite lands.
- `hmo-licensing-fees-tax-deductible-uk-landlords` — read for the deductibility-of-enforcement-costs treatment; forward-linked from this page on the deductibility section.
- `hmrc-penalties-late-landlord-tax-returns-2026` — contrast page only, not linked (HMRC tax penalty is a different regime from local-authority civil penalty); referenced implicitly in the tax-side discussion.
- `first-time-landlord-tax-guide-everything-you-need-to-know` — background pillar; forward-linked at end.
- `landlord-tax-deductions-uk-2026-complete-list` — forward-linked at the deductibility section for the wider repair-versus-improvement boundary.

### Citations added (external authority)
- Renters' Rights Act 2025 (2025 c. 26) — ss.15-17, Schedule 5, ss.67, 75-96 (PRS Database), s.90 possession bar, s.91-92 database offences, Ch.6 Pt.1 marketing offences.
- Housing and Planning Act 2016 — Part 2, ss.14, 17, 21, 23, 28, 29, 30, 32, 35, 40 (banning order + database baseline preserved).
- SI 2026/421 (Commencement No. 2 and Transitional and Saving Provisions Regulations 2026) — appointed-day 1 May 2026.
- SI 2025/1354 (Commencement No. 1 Regulations 2025) — 27 December 2025 preparatory.
- gov.uk civil-penalties statutory guidance (HP Act 2016 branch, pre-1-May-2026 scoped).
- gov.uk rogue-landlord database guidance.
- HMRC BIM38500 (deductibility of regulatory fines).
- ITTOIA 2005 s.272 (property business deduction framework).
- Tribunal Procedure (First-Tier Tribunal) (Property Chamber) Rules 2013 Rule 13 (costs).
- Housing Act 2004 (deposit protection, HMO licensing baseline — referenced).
- Protection from Eviction Act 1977 s.1 (illegal eviction trigger for banning order offence).

### Internal links added (to our existing pages)
- /blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords (intro + closing)
- /blog/landlord-tax-essentials/landlord-tax-deductions-uk-2026-complete-list (deductibility section)
- /blog/landlord-tax-essentials/hmo-licensing-fees-tax-deductible-uk-landlords (closing adjacent reading)
- /blog/landlord-tax-essentials/first-time-landlord-tax-guide-everything-you-need-to-know (closing pillar)
- 3 forward-references to forthcoming siblings C5 (Decent Homes), C6 (PRS Database / Ombudsman), C9 (portfolio disposal) — written as in-text mentions WITHOUT hyperlinks because the target markdown files do not yet exist on this branch at commit time. Will back-patch as hyperlinks once those siblings are written later in this session (raised as F-7 below).

### Inline CTA placements
- Aside 1: after the notice-of-intent procedural section, at the moment a landlord realises the 28-day clock is running and that documentary evidence preparation is the immediate task.
- Aside 2: after the rogue-landlord-database vs PRS Database section, at the pre-emption moment where landlords are concerned about a pending inspection rather than an active notice.

### Build attempts
- 1st attempt: clean. `npm install` ran first (worktree fresh), then `npm run build` generated 382 static pages including the new C1 page at `/blog/landlord-tax-essentials/rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`. No warnings or errors related to this page.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 == 14 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 57 (≤62 ✓)
- Meta description length: 148 (≤158 ✓)
- Internal links resolve: 5 of 5 link to existing markdown files ✓
- monitored_pages row inserted: id 123 ✓
- Body word count: 3,816 (slightly above the 3,500 non-pillar ceiling. Justification: this page covers a bifurcated regime (HP Act 2016 + RRA 2025) running in parallel, with three distinct procedural artefacts (civil penalty, banning order, database listing), three worked enforcement scenarios, a tax-deductibility section spanning three expenditure categories, and a compliance checklist. Compression below 3,500 would require dropping either a regime branch or the worked scenarios, both of which are load-bearing for the defence frame. Below the 4,000 hard ceiling.)

### Flags raised to wave3_site_wide_flags.md
- F-7 forthcoming: forward-link back-patches once C5, C6, C9 land on branch — see appended F-7.

### 2-3 sentence summary
Wrote the C1 enforcement / civil-penalty defence page at 3,816 body words covering the 1 May 2026 RRA 2025 + HP Act 2016 bifurcation, the Schedule 5 procedural framework (notice of intent + 28-day representations + final notice + Tribunal appeal), the banning-order track, the two parallel registers (rogue-landlord database vs PRS Database), three anonymised enforcement scenarios, the tax-deductibility position on legal fees / penalties / RROs / remediation, and a 10-item compliance checklist. All six verifications passed; monitored_pages row 123 inserted; 14 FAQs (top of the band) given the breadth of operational and statutory ground covered. F-7 raised to back-patch forward-links to C5, C6, C9 once those siblings exist on branch later in this session.
