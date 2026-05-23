# Wave 5 brief: form-17-declaration-beneficial-interest-property-mechanics-filing-revocation

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation

---

## Manager pre-decisions

- **Suggested slug:** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> This is the canonical Form 17 mechanic page, closing the Wave 2 Stage 2 AUTHORITY_GAP (no Form 17 dedicated page on-site). The page owns the full mechanic in one place: ITA 2007 s.836 default 50/50 spousal income rule, ITTOIA 2005 s.282 property-income parallel, s.837 election to actual-beneficial-interest split via the prescribed form, the **60-day filing window from the date the last spouse signs** (TSEM9851, strict), revocation mechanic (only on change of beneficial interest, end of joint ownership, separation, or death — Form 17 cannot be voluntarily revoked), the **joint-tenancy bar** (only tenants-in-common can use it), and the evidence requirements (declaration of trust or Land Registry record of unequal shares). Distinct from the existing applied pages: the back-patched `section-24-joint-property-ownership-tax-split` (applied to S24 finance-cost restriction, references this page as the mechanic), `mtd-itsa-jointly-owned-property-threshold-split` (applied to MTD threshold), and `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (applied to MTD quarterly operations). This page is the mechanic that all applied pages link back to.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Closes Wave 2 AUTHORITY_GAP. Foundational mechanic page; sibling C2 (joint-tenancy vs TIC structural choice), C3 (declaration of trust document), C4 (applied decision framework), C5 (civil-partner-applied) all forward-link here. §16.32 sequencing: **C1 MUST ship BEFORE C5** because C5 cites this page as the upstream mechanic. C1 has no sequencing dependencies of its own.

**HOUSE_POSITION_CONFLICT signal context:** §24 was locked 2026-05-23 (today). The existing `section-24-joint-property-ownership-tax-split` page was back-patched 2026-05-23 to align with the correct framing (Form 17 elects to ACTUAL beneficial interest, NOT arbitrary split). C1 cites §24 directly and should reference the back-patched page as cousin-applied content.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})`, parse with `BeautifulSoup(html, "lxml")`. Extract H2/H3 outline, FAQ density, treatment of the 60-day window, treatment of the joint-tenancy bar, worked-example density. Differentiator value is on the mechanic completeness + the joint-tenancy bar (most competitors miss it) + the strict 60-day window framing.

- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Stage 1 seed; deep on Form 17 + declaration-of-trust + worked example.
- https://www.uklandlordtax.co.uk/jointly-owned-property/ — verified live 2026-05-23 (200). Useful for FAQ phrasing on common reader questions about default 50/50 + Form 17 override.
- https://www.farnellclarke.co.uk/blog/property-investors-letting-jointly-owned-property-form-17/ — verified live 2026-05-23 (200). Mid-market accountant; useful for the procedural-mechanic walkthrough framing.
- https://taxscape.deloitte.com/article/married-couples-civil-partnership-form-17.aspx — verified live 2026-05-23 (200). Big-4 perspective; useful for the joint-tenancy bar treatment + evidential discipline.

**Borrowable patterns:** ukpropertyaccountants worked example is generic; we use Khan / Patel persona with explicit 60-day window dates. uklandlordtax FAQ pattern is reader-friendly; farnellclarke procedural pattern is the cleanest mechanic walkthrough. Deloitte's evidence-discipline framing supports the HMRC enquiry-pattern angle.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is "Form 17", with adjacent reader queries on "60-day rule", "declaration of trust HMRC", and "married couples rental income split".*

---

## Closest existing pages

- `section-24-joint-property-ownership-tax-split` (category: `section-24-and-tax-relief`) — **BACK-PATCHED 2026-05-23** to align with correct Form 17 framing. C1 is the upstream mechanic page that this applied page references. Link as cousin-applied content from C1's "When Form 17 saves tax" section.
- `mtd-itsa-jointly-owned-property-threshold-split` (Wave 3 B3, category: `making-tax-digital-mtd`) — applied to MTD threshold testing per gross-share rule (§19.4). Sibling-applied; cross-link from C1's "Where Form 17 leverages appear" section.
- `mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1, category: `making-tax-digital-mtd`) — applied to MTD quarterly operational mechanics. Sibling-applied.
- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — covers TCGA 1992 s.58 no-gain-no-loss; relevant to the CGT-side of declaration-of-trust transfers between spouses. Cross-link.

**Cannibalisation discipline:**
- The four pages above are applied / scenario pages. C1 owns the mechanic. C1's role is to be the page they all link back to.
- Do not duplicate the Khan persona figures used here in C3 / C4 / C5; vary personas across C-bucket.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` (line 288): only `section-24-joint-property-ownership-tax-split` references this slug-token cluster; no old-slug redirect overlap for `form-17-declaration-beneficial-interest...`. No middleware edit required on launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- ITA 2007 s.836 (default 50/50 income split for spouses living together): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837 (declaration of unequal beneficial interests, the Form 17 statutory anchor): https://www.legislation.gov.uk/ukpga/2007/3/section/837
- ITTOIA 2005 s.282 (property-income 50/50 default): https://www.legislation.gov.uk/ukpga/2005/5/section/282
- Law of Property Act 1925 s.53(1)(b) (declaration of trust formalities, writing requirement): https://www.legislation.gov.uk/ukpga/1925/20/section/53
- Law of Property Act 1925 s.36(2) (joint tenancy severance to TIC): https://www.legislation.gov.uk/ukpga/1925/20/section/36

**HMRC manuals + forms:**
- HMRC Form 17 publication: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17
- PIM1030 (jointly-let property income split): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- PIM1035 (jointly owned property and partnerships): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1035
- TSEM9810 (Form 17 general mechanics): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810
- TSEM9842 (declaration of trust evidence): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9842
- TSEM9851 (Form 17 evidence requirement + 60-day window): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9851
- TSEM9852 (Form 17 effective-date mechanics): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9852

**Cross-references in house_positions.md:** §24.1 (default rule), §24.2 (Form 17 mechanics + joint-tenancy bar), §24.3 (declaration of trust), §24.5 (cross-mechanism interactions, S24 + PRR + IHT + SDLT + MTD), §24.8 (HMRC enquiry pattern), §24.10 (do-not-write list).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. F-19 (employer NI 13.8% → 15%) + F-20 (dividend basic+higher 8.75%/33.75% → 10.75%/35.75%) are the most recent locked-figure drifts; assume any numeric carried from prior locked positions may be stale.

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
  - After explaining a high-cost trap or pitfall (the joint-tenancy bar is a strong candidate)
  - At the end of a decision-framework section
- Avoid: opening the page with an aside (let the user trust you first); placing an aside inside a worked example; >3 asides total.
- Don't write the same opening sentence each time. Avoid "Many landlords ask about ...". Vary the opening per page.

### Schema
- FAQs live in frontmatter `faqs:` array. The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic suits HowTo schema (step-by-step process), flag in your work-log and the orchestrator will assess whether to add HowTo schema in the template (NOT in body). The 60-day filing window IS a HowTo candidate; flag.

### Cannibalisation
- The "Closest existing pages" section above shows what we already have on related topics. **Read those pages before writing**. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** For Wave 5 Bucket C, **§24 is your primary locked position** (locked 2026-05-23). Threading:
  - §24.1 — default 50/50 + application limits (NOT living together, NOT joint legal title, three-party joint ownership).
  - §24.2 — Form 17 mechanics: both spouses sign, 60-day strict window from last signature, declared split must match underlying beneficial interest, effective date, persistence, joint-tenancy bar.
  - §24.3 — declaration of trust as the underlying ownership document + the SDLT/LTT/LBTT assumed-debt trap.
  - §24.4 — TCGA 1992 s.58 no-gain-no-loss on the trust declaration itself.
  - §24.5 — cross-mechanism interactions (S24, PPR s.222(5), IHT, SDLT/LTT/LBTT, MTD threshold).
  - §24.8 — HMRC enquiry pattern + defence pack.
  - §24.10 — do-not-write list (memorise; competitor content frequently breaches these).
- Adjacent: §19.4 (MTD joint-owner gross-share threshold), §22.5 (IHT spouse exemption), §23.5 (ADS joint-buyer trigger), §1 (SDLT England + NI).

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave5_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 5-8 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 5 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 5, §24 is your primary working detail for Bucket C, with §19.4 + §22.5 + §23.5 + §1 as adjacent.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (especially the back-patched `section-24-joint-property-ownership-tax-split`). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker. **Per §16.35: verify every numeric tax figure at write time.**
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log. (None for this brief.)
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3+ briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** §16.15 lesson: do NOT include `docs/property/wave5_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave5_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) §16.14 lesson: if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave5_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave5_discovery_log_session_C.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (as briefed)
- **Final category:** landlord-tax-essentials (as briefed)
- **H1 chosen:** "Form 17 Declaration of Beneficial Interest: Filing, Mechanics, Revocation"
- **Meta title chosen:** "Form 17: Beneficial Interest Declaration Filing Mechanics" (57 chars)
- **Why these vs other options:** Lead with primary query "Form 17" then the disambiguator "Beneficial Interest Declaration" (the form's own title language). Avoids the cousin section-24 page's framing which leads with Section 24. Title emphasises mechanics (the brief's framing differentiator). H1 expanded to include all three subject areas (filing, mechanics, revocation) to land long-tail queries.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties: fetched. Has a 60-day rule mis-statement ("60 days before the filing"); we set the record straight by quoting s.837 statute. Good for confirming joint-tenancy vs TIC distinction.
- uklandlordtax.co.uk/jointly-owned-property: fetched. Standard FAQ pattern; correctly states the 60-day window.
- farnellclarke.co.uk/blog/property-investors-letting-jointly-owned-property-form-17: 301 redirect to tc-group.com (Farnell Clarke now part of TC Group). Did not chase redirect; the other three sources gave enough coverage.
- taxscape.deloitte.com/article/married-couples-civil-partnership-form-17.aspx: 404. Logged in discovery (URL rot since brief Stage 2 verification on 2026-05-23 morning).

### Existing-page review (from "Closest existing pages")
- section-24-joint-property-ownership-tax-split: read in full. Cousin page for Section 24-applied numbers. Linked from "Where Form 17 sits in the wider joint-ownership picture" section. Note that the cousin page already has the corrected Form 17 framing per back-patch on 2026-05-23.
- mtd-itsa-jointly-owned-property-threshold-split: linked from the MTD threshold paragraph in the wider picture section.
- mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse: linked from the same paragraph for quarterly mechanics.
- cgt-property-transfer-spouse: linked from the CGT paragraph in the wider picture section.
- declaration-of-trust-... (C3): forward-link from joint-tenancy bar section; resolves when C3 ships on this branch.

### Citations added (external authority)
- ITA 2007 s.836 (default 50/50): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837 (declaration of unequal beneficial interests + 60-day window in statute): https://www.legislation.gov.uk/ukpga/2007/3/section/837
- TCGA 1992 s.58 (no-gain-no-loss spouse transfer): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- LPA 1925 s.36 (joint tenancy severance): https://www.legislation.gov.uk/ukpga/1925/20/section/36
- LPA 1925 s.53 (declaration of trust formalities): https://www.legislation.gov.uk/ukpga/1925/20/section/53
- IHTA 1984 s.18 (spouse exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18
- FA 2003 Sch 4 (chargeable consideration including assumed debt): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4
- HMRC PIM1030 (jointly-let property income split): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- HMRC TSEM9851 (Form 17 evidence requirement): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9851
- Form 17 GOV.UK publication: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17

### Internal links added (to our existing pages)
- /blog/section-24-and-tax-relief/section-24-joint-property-ownership-tax-split
- /blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split
- /blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse
- /blog/capital-gains-tax/cgt-property-transfer-spouse
- /blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 (forward-link to C3, same branch)

### Inline CTA placements
- After "What Form 17 does, and what it does not do" (high-intent moment after the misconception is corrected; reader is ready to consider professional review)
- After "How a Form 17 declaration ends" (after the sequencing trap is explained, before the wider-picture summary)
- Total asides: 2 (within the 1-3 guideline; chose 2 not 3 because the page is already dense with mechanics)

### Build attempts
- Attempt 1 after `npm install` in worktree: PASS. Page generated at .next/server/app/blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation.html (+ .meta + .rsc).

### Verification
- em-dash count: 0
- Tailwind utility classes in markdown: 0
- metaTitle length: 57 (max 62)
- metaDescription length: 158 (max 158, trimmed by 1 char from initial draft)
- FAQ count: 14 (within 10-14)
- Internal links resolve: 4 of 5 to existing files; 5th is forward-link to C3 (same branch, ships same session)
- Body word count: 3445 (within 2,500-3,500 target)

### Flags raised to wave5_site_wide_flags.md
- F-21 (HOUSE_POSITION_CORRECTION): §24.1 cites ITTOIA 2005 s.282 as the "property-income parallel for jointly owned dwellings" but legislation.gov.uk verification on 2026-05-23 confirms s.282 is "Assignments for profit of lease granted at undervalue", unrelated to spouse joint-ownership. The operating provision for jointly held property income is ITA 2007 s.836 alone. C1 cites only s.836 and s.837. Recommend manager remove the ITTOIA 2005 s.282 reference from §24.1 in next house_positions update.

### 2-3 sentence summary
C1 is the canonical Form 17 mechanic page closing the Wave 2 AUTHORITY_GAP. Centres the four distinguishing details that competitor content commonly misses or muddles: the statutory 60-day window (in s.837, not just TSEM), the "declares not creates" rule, the joint-tenancy bar, and the absence of a voluntary revocation route. Forward-links to within-session C3 (declaration of trust) and back-links to four applied joint-ownership pages already on site.
