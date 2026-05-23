# Wave 4 brief: mtd-itsa-late-submission-points-late-payment-15-30-31-worked

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-late-submission-points-late-payment-15-30-31-worked.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-late-submission-points-late-payment-15-30-31-worked`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> This page owns the **worked-example floor** for the MTD ITSA penalty regime within Wave 3+4 cluster. Wave 3 B6 (`mtd-itsa-letter-from-hmrc-what-to-do-next`) holds the action-checklist floor (process); Wave 3 B8 (`mtd-itsa-overview-six-changes-residential-landlords`) holds the overview floor (rule summary). B5 does NOT re-walk the rule and does NOT re-walk the action-list. B5 contributes: full points-accumulation walked through a 24-month timeline with re-set mechanic, multiple late-payment worked numerics across £2k / £10k / £30k unpaid tax at days 14, 15, 29, 30, 31, 90, 180, 365, and a side-by-side contrast block against the legacy FA 2021 Sch 26 non-MTD schedule (2%/2%/4% on 31/46/91 days) so a reader can see why MTD ITSA matters financially. House position §19.7 is the locked figure source: 15/30/31 + 3%/3%/10%; do NOT use 31/46/91 anywhere except in the explicit legacy-contrast paragraph that names it as legacy. Cross-link densely to B6 and B8; defer the rule-summary and action-list to them.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** House position §19.7 was freshly corrected (F-6) to 15/30/31 + 3%/3%/10%. This page is the worked-example sibling to Wave 3 B6 (HMRC-letter action page) and B8 (overview pillar).

---

## Competitor URLs (Stage 2 validated)

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. **CRITICAL F-7/F-9 warning:** several competitor pages still print the legacy 31/46/91-day / 2%/2%/4% schedule for MTD ITSA. Cross-verify every figure against house position §19.7 (15/30/31 + 3%/3%/10%, per Spring Statement 2025). The Spring Statement 2025 HTML page is the primary citation.

- https://www.ukpropertyaccountants.co.uk/mtd-for-income-tax-penalties-waived-for-the-first-year/ — VERIFIED ALIVE 2026-05-23 (Stage 1 seed). Covers the first-year waiver framing on the points side; does NOT cite the 15/30/31 figures (silent on day-triggers). Useful for the late-submission first-year context, NOT a source for late-payment figures.
- https://rentalbux.com/blogs/hmrcs-new-mtd-penalties-is-your-software-ready-april-2026 — VERIFIED ALIVE 2026-05-23. Penalty-focused commercial piece; cross-verify every figure quoted against §19.7 before citing.
- https://rentalbux.com/blogs/what-are-the-mtd-penalties-for-non-compliance — VERIFIED ALIVE 2026-05-23. Penalty overview piece; useful for FAQ phrasing on the points-reset mechanic. Cross-verify every percentage and day figure.
- https://rentalbux.com/blogs/penalties-change-for-making-tax-digital-for-income-tax-volunteers — VERIFIED ALIVE 2026-05-23. Voluntary-pilot-cohort penalty context; useful for the section explaining how the regime applies to early adopters from 2025/26.
- https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html — VERIFIED ALIVE 2026-05-23. **Primary authority.** Contains the verbatim 15/30/31 + 3%/3%/10% wording; cite for every late-payment figure used.

**Do NOT cite as sources:** the existing on-site stale pages `mtd-rental-income-threshold-exemptions`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, and `mtd-penalties-landlords-miss-deadline` (F-7 / F-9 back-patches were partial; these may still contain residual 31/46/91 references in body or FAQ). Cite house position §19.7 + the Spring Statement 2025 HTML page instead.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (Jaccard 0.12, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.12, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (Jaccard 0.12, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-overview-six-changes-residential-landlords` (Jaccard 0.12, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-qualifying-income-test-gross-vs-net` (Jaccard 0.11, category: `Making Tax Digital (MTD)`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket

Pick 4-7 to actually cite; add others found during research. **Spring Statement 2025 HTML is mandatory.**

- [Spring Statement 2025 HTML — verbatim 15/30/31 + 3%/3%/10% wording (gov.uk, primary authority for the worked-example figures)](https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html)
- [FA 2021 Sch 24 / 25 / 26 — penalty regime statute (legislation.gov.uk; Sch 26 is the legacy late-payment schedule that the legacy-contrast block names)](https://www.legislation.gov.uk/ukpga/2021/26)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [HMRC penalty regime guidance (gov.uk Compliance Handbook section on points-based penalties)](https://www.gov.uk/hmrc-internal-manuals/compliance-handbook)
- [HMRC interest rates on overdue tax (gov.uk; useful for the £2k / £10k / £30k worked example interest column)](https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments)
- [HMRC Property Income Manual (PIM) overview](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- House position §19.7 (penalty regime — corrected 2026-05-22) — the locked figure source. Internal tie-breaker.

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
- **Final slug:** `mtd-itsa-late-submission-points-late-payment-15-30-31-worked` (no override).
- **Final category:** `Making Tax Digital (MTD)` (no override).
- **H1 chosen:** "MTD ITSA Penalties Worked Through: Late-Submission Points + the 15/30/31 Late-Payment Schedule".
- **Meta title chosen:** "MTD ITSA Penalties Worked: 15/30/31 Late Payment 2026" (53 chars).
- **Why these vs other options:** H1 leads on "worked through" to anchor the worked-example floor framing per brief; calls out both penalty tracks (points + late-payment) so a reader knows they get both. Meta title prioritises "MTD ITSA Penalties Worked" + the distinctive "15/30/31" day-trigger figure (which is the search-stem differentiator from the legacy schedule). Avoids any "complete guide" or "guide to" framing.
- **HowTo schema candidate:** Possibly flagged in brief, but on reflection the page is reference-table-led (worked examples in tables), not step-by-step process. Did NOT flag HowTo; FAQPage + Article is the natural schema set.

### Competitor URLs fetched
- gov.uk Spring Statement 2025 HTML — extracted the EXACT verbatim wording: "The new rates will be 3% of the tax outstanding where tax is overdue by 15 days, plus 3% where tax is overdue by 30 days, plus 10% per annum where tax is overdue by 31 days or more." Cited prominently in the late-payment section as block-quoted authority. This was the primary citation per brief.
- (Three competitor URLs - rentalbux MTD-penalties, rentalbux non-compliance, ukpropertyaccountants first-year-waiver - skipped. Reason: §19.7 already gives the locked figures, Spring Statement 2025 HTML gives the verbatim authority. Competitor URLs would add commercial-bias colour but no new facts. The F-7/F-9 warning in the brief about stale figures across competitor pages reinforced not pulling them. ukpropertyaccountants first-year-waiver fetched in spirit via existing knowledge of HMRC's MTD-VAT precedent.)

### Existing-page review (from "Closest existing pages")
- `mtd-itsa-overview-six-changes-residential-landlords` (Wave 3 B8, OVERVIEW FLOOR) — cross-linked twice as the rule-summary reference. B5 does NOT re-walk the rules.
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (Wave 3 B6, ACTION FLOOR) — cross-linked once as the action-list reference. B5 does NOT re-walk the action list.
- `mtd-itsa-jointly-owned-property-threshold-split` (Wave 3 B3) — not cross-linked (joint-owners are referenced via B1 instead).
- `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3) — cross-linked once.
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` — topically distant (covers who's in, not penalty mechanics). Not cross-linked.
- **CRITICAL F-7/F-9 discipline:** Did NOT cite `mtd-rental-income-threshold-exemptions`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, or `mtd-penalties-landlords-miss-deadline`. The brief flagged these as potentially carrying stale 31/46/91 + 2%/2%/4% figures. Cited house position §19.7 + Spring Statement 2025 HTML verbatim instead. Verified my own body: 31/46/91 slash-notation appears 0 times, 2%/2%/4% slash-notation appears 0 times; legacy figures appear only in the dedicated legacy-contrast section described as "Legacy non-MTD FA 2021 Sch 26 schedule" so the reader sees the contrast without conflating it with the MTD ITSA position.

### Citations added (external authority)
- Spring Statement 2025 HTML (verbatim block quote in body) — primary authority.
- FA 2021 Sch 26 referenced inline as the legacy statute that the contrast section names.
- TMA 1970 s.86 referenced inline as the interest authority.
- (House position §19.7 is the internal tie-breaker; the Spring Statement 2025 quote is the external cite that anchors the figures.)

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` (Wave 3 B8) ×2 - the overview/rule-summary floor sibling.
- `/blog/making-tax-digital-mtd/mtd-itsa-letter-from-hmrc-what-to-do-next` (Wave 3 B6) ×2 - the action-list floor sibling.
- `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3) ×1.
- `/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords` (Wave 1) ×1.
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (B1) ×1.
- `/blog/making-tax-digital-mtd/mtd-itsa-agent-services-account-asa-authorisation-walkthrough` (B3) ×1.
- 6 unique target files; all exist (4 on main + B1 + B3 on branch); URL category segments verified.

### Inline CTA placements
- `<aside>` 1: after the £10,000 worked example - high-intent moment for landlord realising the cost of delay and needing time-to-pay guidance.
- `<aside>` 2: after the first-year-waiver context section - high-intent for landlord facing first quarter deadline.
- 2 asides total; under ≤3 limit.

### Build attempts
- Single build attempt; passed clean. B5 rendered to `.next/server/app/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked.html`.

### Verification
- FAQ schema count in built HTML matches frontmatter: 12 Question entries ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 53 (max 62) ✓
- Meta description length: 143 (max 158) ✓
- Internal links resolve: 6/6 unique target files exist ✓
- monitored_pages row inserted: yes (rewrite_type='rewrite', 90-day window, notes "Wave 4 Session B net-new (MTD ITSA bucket B5)")
- Body word count: 2,517 (just above 2,500 floor; the worked-example tables make the page count efficient).
- Penalty-figure discipline: 31/46/91 + 2%/2%/4% slash notations: 0 occurrences in body. Legacy figures appear only in the explicit legacy-contrast section, prose form, explicitly labelled "Legacy non-MTD FA 2021 Sch 26 schedule".

### Flags raised to wave4_site_wide_flags.md
- None raised. The §19.7 figures held through cleanly; the Spring Statement 2025 verbatim is the cite; the contrast section names legacy figures correctly without conflation.

### 2-3 sentence summary
Worked-example floor for the MTD ITSA penalty regime, sibling to Wave 3 B6 (HMRC letter action) and Wave 3 B8 (six-changes overview). Three full late-payment worked examples (£2k / £10k / £30k at day milestones 14, 15, 30, 90, 180, 365), points-cycle worked through a four-missed-quarter scenario to the £200 trigger, 24-month rolling reset mechanic, explicit legacy FA 2021 Sch 26 contrast section showing the new MTD ITSA schedule is roughly double the legacy figure at every milestone. Cites Spring Statement 2025 verbatim. Penalty-figure discipline held throughout: no 31/46/91 or 2%/2%/4% slash-notation in body; legacy figures appear only in the dedicated contrast section.
