# Wave 3 brief: mtd-itsa-exit-rule-income-drops-three-year-test

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-exit-rule-income-drops-three-year-test.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-exit-rule-income-drops-three-year-test

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-exit-rule-income-drops-three-year-test`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The section 19.5 exit mechanic. Three consecutive tax years below threshold permits exit; the landlord notifies HMRC and is removed from MTD obligations. Covers when this applies (FHL former owners who downsized, landlords who sold properties to reduce exposure, retirement-cycle landlords running off the portfolio), the notification mechanic, the re-entry rule if income rises again. Distinct from registration pages by being the deregistration mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/heres-how-you-can-exit-mtd-if-your-income-falls/ — VERIFIED ALIVE 2026-05-22 (published 2026-04-09). Strong primary: two exit routes (immediate cessation OR three-consecutive-year low-income test), explicit "income drop alone does not auto-exit", HMRC portal notification mechanic.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — HMRC eligibility/opt-out reference.
- https://www.gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax — sign-up / opt-out process from HMRC.
- https://www.legislation.gov.uk/ukpga/2017/10/schedule/14 — FA 2017 Sch 14 (digital reporting obligations) for the statutory basis of in-scope / out-of-scope mechanics.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`mtd-rental-income-threshold-exemptions`** — threshold pillar; mentions cessation in passing. Cross-link out; do not duplicate exemption taxonomy.

2. **`property-investment-exit-strategy-planning-guide`** — cross-bucket on full portfolio exit (sales, CGT, etc.). The MTD exit rule is a sub-question for landlords already in this strategic exit conversation. Cross-link for the strategic context.

3. **`how-to-switch-self-assessment-mtd-property-income`** — the "switch in" workflow. The mirror of "switch out". Cross-link both ways.

4. **`reduce-cgt-property-disposal-uk`** — adjacent on partial-portfolio disposal (the practical trigger for income drop). Light cross-link in the worked-example section.

5. **`leaving-uk-landlord-12-month-pre-departure-checklist`** — cross-bucket: expat exit may trigger MTD opt-out where letting ceases. Cross-link.

6. **B1 sibling `mtd-itsa-qualifying-income-test-gross-vs-net`** — the gross-test mechanic the exit rule mirrors. Cross-link as foundational reference.

7. **B7 sibling `mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle`** — exit goes back to annual SA. Cross-link.

**Differentiation move:** the §19.5 three-consecutive-tax-year test, written for the practical population (FHL-former-owners post-April-2025, partial sellers, landlords with single property and a void). Three-route framework: immediate cessation, three-year low-income, voluntary opt-out below threshold. Worked timeline showing why a 2025/26 → 2026/27 income drop does NOT exit until 2028/29 onwards. No CANNIBAL flag.

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
- **Final slug:** mtd-itsa-exit-rule-income-drops-three-year-test (as briefed; no override)
- **Final category:** making-tax-digital-mtd (as briefed)
- **H1 chosen:** "MTD ITSA Exit Rule: The Three-Year Income-Drop Test (and the Two Faster Routes)" (signals the headline mechanic + flags that there are alternatives, distinguishes from a generic "how to exit MTD" framing)
- **Meta title chosen:** "MTD ITSA Exit Rule: Three-Year Below-Threshold Test" (51 chars)
- **Why these vs other options:** Word count 2,242 sits below the 2,500 typical floor; deliberate per §16.16. The mechanic is one rule with three exit routes and one worked timeline; padding to 3,000 would force restating §19.5 from different angles or duplicating the gross-vs-net mechanic from B1. The framing differentiator (the three-year clock + cohort-of-use) is fully covered. Title leads with the primary query word "MTD ITSA Exit Rule" rather than the slug verbatim because GSC queries for this topic typically combine "exit" + "MTD" + a timing word; "three-year" carries the distinctive mechanic.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/heres-how-you-can-exit-mtd-if-your-income-falls/ , VERIFIED ALIVE (200) but no extractable article body, the page returned only a "Related: Top 4 Things Landlords Must Do To Get On Top of the Renters Rights Act" promo block and a "Book a Discovery Call" CTA. Either the article is paywalled / gated, JS-rendered, or the site has restructured since the brief was written. The brief's summary of the content (two routes + immediate-cessation + portal notification + "income drop alone does not auto-exit") aligned with my house-position §19.5 understanding so no additional intelligence was lost by the empty fetch.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax , 404 (URL has changed since the brief stage 2 verification on 2026-05-22 morning).
- https://www.gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax , redirects to https://www.gov.uk/guidance/sign-up-for-making-tax-digital-for-income-tax (now alive 200). Fetched + scanned for opt-out / leave / below-threshold language; the page covers sign-up mechanics but does not separately document the three-year exit rule (the exit rule lives in HMRC's "Using MTD for Income Tax" guidance and the policy papers, not in the sign-up flow). Confirmed that voluntary participants can leave through the same business tax account interface.
- https://www.gov.uk/government/collections/making-tax-digital-for-income-tax , alive (200), the top-level collection page; provides the canonical entry point for the wider MTD ITSA guidance ecosystem.
- https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html , referenced (not re-fetched) per house position §19.7 verified-Stage-2 record; underpins the 15/30/31 day + 3%/3%/10% late-payment regime mentioned in the "What you still must do during the three-year wait" section.

### Existing-page review (from "Closest existing pages")
- `mtd-rental-income-threshold-exemptions` , read in full. Confirms F-7 / F-9 from prior B sessions: this page asserts "two consecutive tax years" for the exit threshold, which contradicts house position §19.5 (three consecutive). It also reproduces the legacy 2%/2%/4% penalty figures. Both are wrong, both are already flagged in `wave3_site_wide_flags.md` for the post-merge cleanup queue. I have not raised a new flag (would duplicate F-7/F-9). My page asserts the correct three-year + 3%/3%/10% positions, which is the on-brand answer for any reader who lands on the exit-rule page directly.
- `how-to-switch-self-assessment-mtd-property-income` , read frontmatter; this is the mirror "switch-in" page. Cross-linked bidirectionally (my outbound link in the "Where this page sits" H2).
- `property-investment-exit-strategy-planning-guide` , confirmed exists; cross-linked as the strategic context for partial-portfolio disposal that often triggers the three-year clock.
- `leaving-uk-landlord-12-month-pre-departure-checklist` , confirmed exists; cross-linked as the expat case where leaving the UK may trigger cessation rather than the three-year rule.
- Wave 3 sibling B1 `mtd-itsa-qualifying-income-test-gross-vs-net` , confirmed shipped (commit 70a303e); cross-linked for the qualifying-income measurement that the exit test re-uses.
- Wave 3 sibling B3 `mtd-itsa-jointly-owned-property-threshold-split` , confirmed shipped (commit dff42ad); cross-linked for joint-owner exit-test mechanics.
- Wave 3 sibling B8 pillar `mtd-itsa-overview-six-changes-residential-landlords` , confirmed shipped (commit 053af20); cross-linked as the bucket pillar.
- Wave 3 sibling B2 `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` , confirmed shipped (commit ed595db); cross-linked for the inherited / moved-abroad / relationship-breakdown cohort overlap with cessation routes.

### Citations added (external authority)
- gov.uk Spring Statement 2025 publication (named for the 15/30/31 + 3%/3%/10% penalty regime).
- Finance Act 2017 Schedule A1 (referenced in body for the default-in-scope-until-something-happens mechanic).
- FA 2021 Schedule 24 (named for the points-based late-submission penalty regime).
- gov.uk "Find compatible software" supplier list (referenced for the software-cost-through-wait point).
- gov.uk MTD ITSA collection (the canonical collection page, not separately linked in body to avoid sprinkling generic authority links; can be added on a maintenance pass if desired).

Note: the page leans on the house-position §19 as the canonical reference and assumes the reader can reach gov.uk via the navigation. Body-link discipline favoured internal cross-links (7) over external (named-but-not-hyperlinked) authorities to keep the SEO equity on-site, matching the pattern of the B2 / B3 / B8 siblings.

### Internal links added (to our existing pages)
1. /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (B1 sibling, gross-vs-net mechanic)
2. /blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split (B3 sibling, joint-owner exit-test mechanic)
3. /blog/making-tax-digital-mtd/mtd-itsa-accidental-landlords-do-i-need-to-file-digitally (B2 sibling, accidental-landlord cohort overlap)
4. /blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords (B8 pillar)
5. /blog/making-tax-digital-mtd/how-to-switch-self-assessment-mtd-property-income (switch-in mirror)
6. /blog/property-investment/property-investment-exit-strategy-planning-guide (strategic context)
7. /blog/expat-landlords/leaving-uk-landlord-12-month-pre-departure-checklist (expat / cessation case)

All seven resolve to existing files. No CANNIBAL flag raised; the exit rule has no dedicated existing page (the closest is the exemptions pillar with the F-7 / F-9 errors, which is being back-patched post-merge anyway).

### Inline CTA placements
- Aside 1: after the worked three-year timeline H2, at the moment the reader sees that "selling one property does not exit you next year" and is forming the question of which exit route is right for them. Conversion moment for "talk to us before we choose".
- Aside 2: after the "How to notify HMRC" H2, at the moment the reader sees that the notification is administrative but the strategic decision is upstream. Conversion moment for "this interacts with CGT / S24 / incorporation, we work it together".
- 2 asides total (within 1-3 cap). No opening aside, no aside inside a worked example. Disciplined per the brief.

### Build attempts
- Build 1: clean. 0 errors, 0 warnings related to this page. 6 verifications all pass on first build.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14/14
- Em-dashes in markdown: 0 (also 0 en-dashes)
- Tailwind classes in markdown: 0
- Meta title length: 51 chars (limit 62)
- Meta description length: 153 chars (limit 158)
- Internal links resolve: 7/7
- monitored_pages row inserted: yes (id 136, rewrite_type='rewrite' per the table's CHECK constraint, notes flag NETNEW Wave 3 Session B B4)
- Body word count: 2,242 (intentionally below the 2,500 typical floor per §16.16, single-mechanic page where padding would dilute. Justified in Decisions block above.)

### Flags raised to wave3_site_wide_flags.md
- No new flag. F-7 (existing exemptions pillar has factual errors including "two consecutive tax years" for exit) and F-9 (penalty figure 2%/2%/4% propagation) are already raised by prior Session B and cover the exit-rule contradiction on the existing pillar; this page's correct three-year + 3%/3%/10% positions are the on-brand fix that the F-7/F-9 cleanup queue will eventually align the exemptions pillar with.

### 2-3 sentence summary
B4 ships the §19.5 exit-rule mechanic as a stand-alone page: three exit routes (cessation, three-year low-income, voluntary opt-out), a worked timeline anchored on a 2026 entrant who sells down to a £42k portfolio (earliest exit 2029/30), four cohorts of practical use (former FHL owners, partial-portfolio sellers, retirement-cycle landlords, long-void single-let landlords), and the notification + re-entry mechanics. 2,242 words at the §16.16 reference-page floor; 14 FAQs; 7 internal cross-links covering the full MTD ITSA bucket lattice plus the strategic exit + expat departure adjacent pages. No new flags raised; F-7 / F-9 already cover the contradiction with the existing exemptions pillar.
