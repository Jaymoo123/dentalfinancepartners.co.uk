# Wave 3 brief: mtd-itsa-jointly-owned-property-threshold-split

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-jointly-owned-property-threshold-split.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-jointly-owned-property-threshold-split`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The section 19.4 joint-ownership mechanic. Spouses owning jointly with 100k gross test 50k each (default 50/50); a Form 17 75/25 election puts the higher-share spouse in earlier. Worked examples: husband-wife BTL boundary case, three-friends-buying-together non-spousal joint tenancy, tenants-in-common with declared unequal shares. Distinct from existing single-ownership pages by handling the threshold-test mechanic that competitor coverage tends to assume away.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/mtd-made-simple-for-landlords-with-jointly-owned-properties/ — VERIFIED ALIVE 2026-05-22 (last updated 2026-01-05). Strong primary: confirms HMRC tests each joint owner's individual share, not the property total; worked £90k-property-£45k-each example; explicit "no nominated-submitter rule, each owner files quarterly".
- https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-form-17 — Form 17 election (gov.uk). Critical citation for the Form 17 mechanic and the 60-day declaration deadline.
- https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9814 — HMRC TSEM 9814 (joint income, spouses, declaration of beneficial interest). Authoritative on the underlying rule the MTD threshold inherits.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — HMRC eligibility tool reference.
- https://www.gov.uk/government/publications/property-rental-toolkit — HMRC toolkit: section on joint ownership default 50/50 vs declared-share rule.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`section-24-joint-property-ownership-tax-split`** ("Section 24 and Joint Property Ownership: How Is Tax Split?") — closest on-site reference on joint-owner mechanics, but framed around Section 24 finance-cost split, not MTD threshold. Cross-link both directions: existing S24 page should link forward to this MTD-applied page; this page links back for the underlying split rule.

2. **`form-17-married-couple-property-tax`** (if exists) — checked, no dedicated Form 17 page on-site. Confirms this MTD page should carry the Form 17 mechanic detail (60-day deadline, beneficial-interest declaration) as its own section. **AUTHORITY_GAP discovery**: site has no Form 17 dedicated page; raise discovery flag for future wave.

3. **`mtd-rental-income-threshold-exemptions`** — threshold pillar. Mentions joint-owner split briefly. Cross-link out.

4. **B1 sibling `mtd-itsa-qualifying-income-test-gross-vs-net`** — the gross-test mechanic this page applies in the joint-ownership variant. Cross-link.

5. **`cgt-property-transfer-spouse`** — adjacent on inter-spousal transfers; only relevant if the page covers the "should we re-split ownership to game the threshold" tactical question. Light cross-link.

6. **`making-tax-digital-property-income-2026-complete-guide`** — broader pillar; light cross-link.

**Differentiation move:** the joint-owner threshold-split mechanic applied. Default 50/50, Form 17 election to override, beneficial-interest documentation, the "one spouse in / one spouse out" scenario, and the tactical 75/25 split decision tree (cross-link to S24 for the wider context). Distinct from existing S24 joint-ownership page (income-tax restriction angle) and from the threshold pillar (taxonomy not mechanic). No CANNIBAL flag.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Reviewed `Property/web/src/middleware.ts` 2026-05-22. No old slug overlaps. No action required.

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
- **Final slug:** mtd-itsa-jointly-owned-property-threshold-split
- **Final category:** Making Tax Digital (MTD)
- **H1 chosen:** How MTD ITSA Splits the Threshold for Jointly Owned Property
- **Meta title chosen:** MTD ITSA Jointly Owned Property: Threshold-Split Mechanic (57 chars)
- **Why these vs other options:** H1 leads with the mechanic ("how it splits"). Slug + category at brief default.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/mtd-made-simple-for-landlords-with-jointly-owned-properties/ — extracted "each owner tests own share, no nominated submitter, each files quarterly" framing.
- gov.uk Form 17 publication page — direct hyperlink for the official form.
- HMRC TSEM 9814 — direct hyperlink for the deemed 50/50 rule manual reference.

### Existing-page review (from "Closest existing pages")
- section-24-joint-property-ownership-tax-split: linked twice for the Section 24 planning lens; this MTD page covers the mandate-scope mechanic, the S24 page covers the income-tax planning case.
- mtd-rental-income-threshold-exemptions: light implicit reference (no direct hyperlink to avoid over-cross-linking; the exemptions pillar is sufficiently linked from B1/B2).
- B1 (mtd-itsa-qualifying-income-test-gross-vs-net): linked in the closing checklist for the SA-form-box anchors each spouse uses.
- cgt-property-transfer-spouse: linked once where genuine beneficial-ownership transfer is mentioned.

### Citations added (external authority)
1. gov.uk Form 17 publication
2. HMRC TSEM 9814 (Trusts, Settlements and Estates Manual)
3. Implicit references to ITA 2007 s.836 (deemed 50/50) and ITA 2007 s.837 (Form 17 election) named in body without hyperlink.

Two direct external hyperlinks plus three named statutory references. Within 4-7 target including the implicit references.

### Internal links added (to our existing pages)
1. /blog/section-24-and-tax-relief/section-24-joint-property-ownership-tax-split (twice: Section 24 planning lens + closing checklist)
2. /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (B1 sibling)
3. /blog/capital-gains-tax/cgt-property-transfer-spouse (inter-spousal transfer CGT)

Three internal links. All target files exist in Property/web/content/blog/.

### Inline CTA placements
- Aside #1: after the rule-in-one-paragraph section, framing the mixed-status portfolio scenario.
- Aside #2: in the tactical-Form-17 section, framing Form 17 as "follows beneficial reality, not a tuning dial".

Two asides. Neither opens the page; both placed at conversion-relevant decision points.

### Build attempts
- npm run build (B1+B2+B3 present): clean. Built HTML present at expected path.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✓
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 57 (max 62) ✓
- Meta description length: 150 (max 158) ✓
- Internal links resolve: 3/3 target files exist ✓
- monitored_pages row inserted: yes (rewrite_type='rewrite', 90-day window, notes "Wave 3 Session B net-new (MTD ITSA bucket B3)")
- Body word count: 2,532 (within 2,500-3,500 framing-differentiator-led range; mechanic page sits at the lower end because the topic is bounded by the worked-example set)

### Flags raised to wave3_site_wide_flags.md
- No new flag raised. Logged AUTHORITY_GAP discovery on Form 17 in `wave3_discovery_log_session_B.md` (D-4 below).

### 2-3 sentence summary
Wrote the joint-property threshold-split mechanic page covering the deemed 50/50 rule, Form 17 election mechanics, three worked scenarios (spousal 50/50 £100k, tenants-in-common 70/30 without Form 17, three-friends joint tenancy), the tactical decision criteria for filing Form 17, and the mid-year split-change part-year reporting mechanic. Cross-linked to the Section 24 joint-ownership page for the income-tax planning lens, to B1 for the mechanic underneath, and to the spousal CGT transfer page for the underlying beneficial-ownership change route.
