# Wave 3 brief: mtd-itsa-vs-limited-company-cohort-different-rules

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-vs-limited-company-cohort-different-rules.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-vs-limited-company-cohort-different-rules

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-vs-limited-company-cohort-different-rules`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Comparison page between the MTD ITSA cohort (sole trader / landlord, in scope from April 2026) and the limited company cohort (outside MTD ITSA entirely, on annual CT600 cycle). Critical bridging page because the incorporation question for a landlord ('should I move my BTL into a Ltd Co?') now has an MTD compliance dimension as well as the tax-rate dimension. Covers what stays the same (digital record-keeping best practice), what is different (annual vs quarterly cycle, deadline pattern, software pick). Bridges the MTD bucket and the incorporation cluster.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/how-making-tax-digital-affects-limited-companies/ — VERIFIED ALIVE 2026-05-22 (last updated 2025-10-15). Strong primary: confirms Ltd Cos outside MTD ITSA, MTD for VAT applies to VAT-registered companies, MTD for CT is a future cycle (no confirmed date), AND the critical detail that directors with personal side income above £50k are caught in MTD ITSA via their personal SA. Use as the cohort-comparison anchor.
- https://www.gov.uk/guidance/check-if-you-must-follow-making-tax-digital-rules-for-vat — MTD for VAT applies to Ltd Cos; cite once for the "Ltd Cos already touch MTD for VAT" framing.
- https://www.gov.uk/government/publications/making-tax-digital-for-corporation-tax — MTD for CT consultation outcome (gov.uk); cite as the "future cycle, no confirmed date" anchor.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — confirms Ltd Cos are not in scope of MTD ITSA.
- https://www.gov.uk/limited-company-formation — adjacent reference for the "should I incorporate to avoid MTD" decision-tree section.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`limited-company-vs-personal-ownership-tax-comparison-2026`** — the closest cohort-comparison page. Side-by-side Ltd Co vs personal ownership tax framing. The MTD angle is one column of that comparison. Treat as the broader decision framework; this page narrows to the MTD-specific cohort wrinkle. Cross-link both directions.

2. **`should-i-incorporate-buy-to-let-portfolio-2026`** — the decision page on whether to incorporate. The MTD-avoidance angle is a likely-asked sub-question. Cross-link.

3. **`buy-to-let-limited-company-complete-guide-uk`** — incorporation pillar. Cross-link out for the corporation-tax / structural detail.

4. **`corporation-tax-rates-property-companies-2026-27`** — the "what Ltd Cos pay instead" reference. Cross-link for the cohort comparison's CT side.

5. **`landlord-incorporation-step-by-step-guide-uk`** — process page. Cross-link only if the page reaches the "I am moving to a Ltd Co partly to escape MTD" decision branch.

6. **B8 sibling `mtd-itsa-overview-six-changes-residential-landlords`** — bucket overview. Cross-link.

7. **B1 sibling `mtd-itsa-qualifying-income-test-gross-vs-net`** — for the gross-test mechanic when both Ltd Co rents and personal property rents are held by the same individual director (Ltd Co income does not count in personal threshold; the director's personal property does). Cross-link.

**Differentiation move:** the cohort comparison applied. Two side-by-side compliance regimes (Ltd Co outside MTD ITSA but inside MTD VAT and a future MTD CT; sole-trader landlord inside MTD ITSA from April 2026). Director's personal income still triggers personal MTD ITSA. Worked decision-tree for the "should I incorporate to escape MTD" question (answer: rarely the deciding factor on its own; CGT + SDLT + S162 cost dominates). Distinct from existing incorporation pillars (decision framework includes MTD as one factor; this page IS the MTD factor explained). No CANNIBAL flag.

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
- **Final slug:** mtd-itsa-vs-limited-company-cohort-different-rules (as briefed; no override)
- **Final category:** making-tax-digital-mtd (as briefed; deliberate to keep this in the MTD bucket lattice rather than the incorporation cluster, since the primary readership intent is "do I escape MTD by incorporating?" rather than "should I incorporate generally?". The wider incorporation question is owned by the incorporation pillar pages, which this page cross-links.)
- **H1 chosen:** "MTD ITSA vs Limited Company Landlords: Two Cohorts, Two Compliance Regimes" (signals the comparison + names the two regimes + uses 'cohort' as the framing word from the brief, distinguishing from a generic "MTD vs CT600" framing)
- **Meta title chosen:** "MTD ITSA vs Limited Company: Cohort Comparison Explained" (56 chars)
- **Why these vs other options:** Word count 1,990 sits well below the typical 2,500-3,500 range. Justification: the framing differentiator is a comparison-cohort page anchored on (a) drawing the cohort line cleanly between sole-trader landlord and Ltd Co landlord and (b) the "should I incorporate to escape MTD?" decision-tree answer. The substantive mechanic (Ltd Cos structurally outside MTD ITSA, MTD VAT exception, future MTD CT) is short, and the decision-tree answer is essentially "no, the maths don't support it except in a narrow combination" — which is a definitive answer that does not benefit from padding. The 14 FAQs are deliberately rich (averaging 80-130 words each, far above the typical 40-60), adding ~1,500 effective reader-words on top of the body. Total page surface is comfortably within the 2,500-3,500 effective range when FAQs are counted; §16.16 reference-page floor allowance applies. Padding the body to hit 3,000 would dilute the cohort-line clarity that is the page's value proposition.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/how-making-tax-digital-affects-limited-companies/ , attempted; same pattern as B4 (the site returned only the "Related: Top 4 Things Landlords Must Do To Get On Top of the Renters Rights Act" promo block, no extractable article body). Likely JS-rendered or paywall-gated. Aligned with brief's stage-2 summary by relying on house position §3 + §19.3 directly.
- gov.uk MTD ITSA collection (https://www.gov.uk/government/collections/making-tax-digital-for-income-tax), alive 200, confirms Ltd Cos are excluded from MTD ITSA.
- gov.uk MTD for VAT eligibility check (https://www.gov.uk/guidance/check-if-you-must-follow-making-tax-digital-rules-for-vat), confirms MTD VAT applies to all VAT-registered businesses since April 2022.
- gov.uk MTD for Corporation Tax publication (https://www.gov.uk/government/publications/making-tax-digital-for-corporation-tax), confirms MTD CT is a future cycle with no confirmed start date as of mid-2026.

### Existing-page review (from "Closest existing pages")
- `limited-company-vs-personal-ownership-tax-comparison-2026` , confirmed exists; the broader cohort-decision framework. Cross-linked outbound. This page narrows to the MTD-specific cohort wrinkle and stays out of the tax-rate comparison territory (which is the existing page's value). Treated as the broader pillar; my page is the applied MTD angle. No CANNIBAL flag.
- `should-i-incorporate-buy-to-let-portfolio-2026` , confirmed exists; the incorporation decision page. Cross-linked outbound for the wider decision-tree.
- `buy-to-let-limited-company-complete-guide-uk` , confirmed exists; the Ltd Co pillar. Cross-linked outbound for the structural detail.
- `corporation-tax-rates-property-companies-2026-27` , confirmed exists; cross-linked outbound for the "what Ltd Cos pay instead" reference.
- `landlord-incorporation-step-by-step-guide-uk` , confirmed exists; not cross-linked because my page does not reach the "I am moving to a Ltd Co partly to escape MTD" full procedural branch (the brief flagged this as conditional). Left out to keep cross-link density disciplined.
- Wave 3 sibling B8 pillar `mtd-itsa-overview-six-changes-residential-landlords` , confirmed shipped (053af20); cross-linked.
- Wave 3 sibling B1 `mtd-itsa-qualifying-income-test-gross-vs-net` , confirmed shipped (70a303e); cross-linked for the qualifying-income mechanic (which the page references when explaining that Ltd Co income does not count in the personal threshold).
- Wave 3 sibling B4 `mtd-itsa-exit-rule-income-drops-three-year-test` , confirmed shipped this session (9d52572); cross-linked for the "if I move most of the portfolio into a Ltd Co, the personal MTD obligation continues on the residual" link.

### Citations added (external authority)
- FA 2017 Sch A1 (named in body and FAQs for the structural exclusion of Ltd Cos from MTD ITSA).
- TCGA 1992 s.162 (incorporation relief, named in the decision-tree section).
- FA 2021 Sch 24 (named for the points-based late-submission regime).
- gov.uk Spring Statement 2025 publication (referenced for the 15/30/31 + 3%/3%/10% MTD ITSA late-payment regime, contrasted with the 5%/5%/5% CT600 surcharge schedule).
- CTM93000 series (named loosely for the CT600 late-filing penalty regime).
- gov.uk MTD for VAT guidance (named for the April 2022 / April 2019 timeline).
- gov.uk MTD for Corporation Tax publication (named for the "future cycle, no confirmed date" anchor).

### Internal links added (to our existing pages)
1. /blog/incorporation-and-company-structures/limited-company-vs-personal-ownership-tax-comparison-2026 (cohort-decision framework)
2. /blog/incorporation-and-company-structures/should-i-incorporate-buy-to-let-portfolio-2026 (incorporation decision page)
3. /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk (Ltd Co pillar)
4. /blog/incorporation-and-company-structures/corporation-tax-rates-property-companies-2026-27 (CT side)
5. /blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords (B8 bucket pillar)
6. /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (B1 mechanic)
7. /blog/making-tax-digital-mtd/mtd-itsa-exit-rule-income-drops-three-year-test (B4 exit mechanic, this session)

All seven resolve. Heavy cross-link density toward the incorporation cluster (4 of 7) is deliberate; this is the bridging page between the MTD bucket and the incorporation cluster.

### Inline CTA placements
- Aside 1: after the "What is materially different" H2, at the moment the reader has the 5-dimension comparison in front of them and is forming the "should I incorporate?" question. Conversion moment for "model the full trade-off rather than treating MTD as the headline".
- Aside 2: after the "Should I incorporate to escape MTD?" decision-tree H2 with the worked CGT + SDLT + S162 maths. Conversion moment at the end of the decision-framework section, before the wider-context "Where this page sits" section.
- 2 asides total. No opening aside, no aside inside a worked example. Disciplined per the brief.

### Build attempts
- Build 1: clean. 0 errors, 0 warnings related to this page.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14/14
- Em-dashes in markdown: 0 (also 0 en-dashes)
- Tailwind classes in markdown: 0
- Meta title length: 56 chars (limit 62)
- Meta description length: 156 chars (limit 158)
- Internal links resolve: 7/7
- monitored_pages row inserted: yes (id 141, rewrite_type='rewrite' per the table's CHECK constraint, notes flag NETNEW Wave 3 Session B B5)
- Body word count: 1,990 (intentionally below the 2,500 typical floor per §16.16 reference-page exception; comparison-cohort page where the substantive mechanic is short and the decision-tree answer is definitive. Reasoning in Decisions block above.)

### Flags raised to wave3_site_wide_flags.md
- No new flag. The page does not introduce a new house-position conflict, cannibalisation issue, internal-link gap, or build blocker that isn't already tracked. The existing `limited-company-vs-personal-ownership-tax-comparison-2026` page does not yet have an MTD column in its comparison table, but that is a back-patch opportunity (could be raised as INTERNAL_LINK for the post-merge queue, deferred to keep mid-wave flag-noise low).

### 2-3 sentence summary
B5 ships the cohort-comparison bridging page between the MTD bucket and the incorporation cluster: side-by-side table on 7 dimensions, 5-point "what is materially different" breakdown, director-with-personal-property trap (Ltd Co rents are invisible to the personal MTD test, but personal property is not), worked decision-tree showing that CGT + SDLT + S162 costs of incorporating dwarf the lifetime cost of MTD compliance in most cases, and the MTD-touching-Ltd-Co exceptions via MTD VAT + future MTD CT. 1,990 body words (intentional reference-page floor per §16.16) with 14 rich FAQs adding ~1,500 effective reader-words; 7 internal cross-links (4 incorporation cluster + 3 MTD bucket). No new flags; the existing cohort-comparison page could optionally be back-patched with an MTD column post-merge.
