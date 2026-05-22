# Wave 3 brief: mtd-itsa-pilot-trial-volunteer-2025-26-experience

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-pilot-trial-volunteer-2025-26-experience.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-pilot-trial-volunteer-2025-26-experience

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-pilot-trial-volunteer-2025-26-experience`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Voluntary opt-in cohort page (section 19.5). Real-world signal from 2025/26 pilot participants for landlords considering early-mover testing. Covers what the pilot captures (full MTD cycle for a tax year before mandate), the practical benefits (software learning, error-finding without late-filing risk), the practical risks (committed to the cycle once in), and the persona who genuinely benefits (slightly-over-50k landlord who would be in at mandate anyway and wants the trial year). Distinct from mandate pages by being the opt-in mechanic.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/what-you-need-to-know-about-hmrcs-mtd-trial/ — VERIFIED ALIVE 2026-05-22 (last updated 2024-04-26, somewhat dated but content still valid). Strong primary: pilot launched 22 April 2024; identifies 14 excluded categories (HICBC, jointly-owned property, partnerships, FHL, variable profits etc.); restrictive accounting period rules (April 1 to March 31 or April 6 to April 5 only); cannot carry back losses or switch methods during trial.
- https://www.gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax — HMRC sign-up route for voluntary participants (the pilot's natural extension).
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — eligibility for the voluntary cohort.
- https://www.gov.uk/government/publications/making-tax-digital-for-income-tax-self-assessment-pilot — the official HMRC pilot landing (session to verify URL on fetch; if redirected, follow).
- https://www.gov.uk/government/news/making-tax-digital-for-income-tax-pilot-expanded — HMRC news on the 2025/26 pilot expansion (session to verify).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`how-to-register-mtd-landlord-step-by-step-guide`** — mandatory-registration workflow. The pilot is the **voluntary** counterpart, sharing registration steps but with eligibility carve-outs. Distinct angle: this page is the voluntary opt-in route + 14 exclusion categories + trade-offs. Cross-link forward.

2. **`best-mtd-software-landlords-2026`** — software for pilot participants. Cross-link as the operational reference (pilot needs the same software).

3. **B6 sibling `mtd-itsa-letter-from-hmrc-what-to-do-next`** — the involuntary route in. This page is the voluntary route in. Cross-link both ways.

4. **B8 sibling `mtd-itsa-overview-six-changes-residential-landlords`** — overview pillar. Cross-link for the "what am I signing up to" reference.

5. **`making-tax-digital-property-income-2026-complete-guide`** — broader pillar. Cross-link.

6. **`mtd-quarterly-reporting-landlords-step-by-step-guide`** — operational reference for the pilot's quarterly cycle. Cross-link.

7. **B4 sibling `mtd-itsa-exit-rule-income-drops-three-year-test`** — pilot participants who later drop below threshold. Cross-link.

**Differentiation move:** voluntary cohort page. Lead with three reasons to opt in early (test software, get familiar with cycle, sit ahead of the curve before mandate), then the 14 exclusion categories from the HMRC pilot scope, then the trade-offs (cannot carry back losses, cannot switch methods, accounting period restrictions). Worked persona: a landlord on £75k gross who opts in for 2025/26 voluntary year to test their stack before April 2026 mandate. Distinct from registration pillar (mandatory) and from letter page (involuntary trigger). No CANNIBAL flag.

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
- **Final slug:** mtd-itsa-pilot-trial-volunteer-2025-26-experience (as briefed; no override)
- **Final category:** making-tax-digital-mtd (as briefed)
- **H1 chosen:** "The Voluntary MTD ITSA Pilot for 2025/26: Worth Opting In, or Wait for the Mandate?" (signals the genuine decision the page answers, "or wait for the mandate" is the framing differentiator distinguishing this page from a "register for the pilot now!" promotional take)
- **Meta title chosen:** "MTD ITSA Voluntary Pilot 2025/26: Should Landlords Opt In?" (58 chars)
- **Why these vs other options:** Word count 2,341 — mid-depth, in the 2,500-3,500 band. Topic supports natural depth because the pilot is a real cohort decision with practical trade-offs (3 reasons for + 3 reasons against + 14-item eligibility carve-out list + 3 specific pilot-only restrictions + worked persona). 14 rich FAQs. The page deliberately positions the pilot as a narrow-use-case decision rather than a universal recommendation, which is the genuine professional advice; the framing differentiator from the brief asks for the "persona who genuinely benefits" approach. Caught meta description at 166 chars on first verification (over the 158 limit) and trimmed to 149 chars on build-2.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/what-you-need-to-know-about-hmrcs-mtd-trial/ , attempted; same gated-content pattern. Relied on brief stage 2 summary (pilot launched 22 April 2024; 14 excluded categories including HICBC, jointly-owned property, partnerships, FHL, variable profits, etc.; restrictive accounting periods; cannot carry back losses or switch methods during trial).
- gov.uk MTD ITSA collection (alive 200), authoritative reference.
- gov.uk MTD sign-up flow (alive 200 after redirect), confirms the voluntary opt-in route via the business tax account.

### Existing-page review (from "Closest existing pages")
- `how-to-register-mtd-landlord-step-by-step-guide` , confirmed exists; cross-linked. Mandatory-registration workflow. Distinct angle: this page is the voluntary opt-in route + 14 exclusion categories + trade-offs. No CANNIBAL flag.
- `best-mtd-software-landlords-2026` , confirmed exists; cross-linked as the operational reference.
- Wave 3 sibling B6 `mtd-itsa-letter-from-hmrc-what-to-do-next` , confirmed shipped (9bba702); cross-linked. The involuntary route in.
- Wave 3 sibling B8 pillar `mtd-itsa-overview-six-changes-residential-landlords` , confirmed shipped (053af20); cross-linked.
- `making-tax-digital-property-income-2026-complete-guide` , confirmed exists; cross-linked as the broader pillar.
- `mtd-quarterly-reporting-landlords-step-by-step-guide` , confirmed exists; cross-linked as the operational quarterly-cycle reference.
- Wave 3 sibling B4 `mtd-itsa-exit-rule-income-drops-three-year-test` , confirmed shipped (9d52572); cross-linked for the "leaving the pilot if it doesn't work" case.
- Wave 3 sibling B7 `mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle` , confirmed shipped (da1ec7c); cross-linked.
- Wave 3 sibling B1 `mtd-itsa-qualifying-income-test-gross-vs-net` , confirmed shipped (70a303e); cross-linked.

9 internal cross-links total. All resolve AND map to correct category URLs (category-aware verifier applied per F-12 lesson from B7).

### Citations added (external authority)
- HMRC pilot guidance (named in body, referenced for the 22 April 2024 launch date and 14-item exclusion list).
- FA 2017 Sch A1 (named for the structural basis of MTD ITSA).
- FA 2021 Sch 24 (named for the points-based late-submission regime that applies identically to voluntary participants).
- gov.uk Spring Statement 2025 (named for the 15/30/31 + 3%/3%/10% late-payment regime that applies from 6 April 2026 forward).
- gov.uk software supplier list (named operationally in the opt-in flow section).

### Internal links added (to our existing pages)
1. /blog/making-tax-digital-mtd/mtd-itsa-letter-from-hmrc-what-to-do-next (B6 involuntary route)
2. /blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide (mandatory registration workflow)
3. /blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords (B8 bucket pillar)
4. /blog/making-tax-digital-mtd/mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle (B7 cycle comparison)
5. /blog/making-tax-digital-mtd/mtd-itsa-exit-rule-income-drops-three-year-test (B4 exit/leave-pilot pointer)
6. /blog/making-tax-digital-mtd/best-mtd-software-landlords-2026 (software reference)
7. /blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide (pillar)
8. /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (B1 qualifying-income mechanic)
9. /blog/making-tax-digital-mtd/mtd-quarterly-reporting-landlords-step-by-step-guide (operational quarterly-cycle reference)

All 9 resolve and map to correct category URLs.

### Inline CTA placements
- Aside 1: after the "Three reasons to opt in early" H2, at the moment the reader has the three arguments for and is forming the question of whether they personally fit the narrow persona. Conversion moment.
- Aside 2: after the worked persona for the slightly-over-£50k landlord, at the moment the reader has the contrast between the qualifying-persona case and the £42k sub-threshold counter-case. Conversion moment for "talk through your specific portfolio shape".
- 2 asides total. No opening aside, no aside inside a worked example.

### Build attempts
- Build 1: clean, but verification caught meta description at 166 chars (over the 158 limit).
- Build 2: clean after meta description trim to 149 chars. All six verifications pass.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14/14
- Em-dashes in markdown: 0 (also 0 en-dashes)
- Tailwind classes in markdown: 0
- Meta title length: 58 chars (limit 62)
- Meta description length: 149 chars (limit 158, after build-2 trim from initial 166)
- Internal links resolve: 9/9 (all map to correct category URLs per F-12 verifier)
- monitored_pages row inserted: yes (id 148, rewrite_type='rewrite' per the table's CHECK constraint, notes flag NETNEW Wave 3 Session B B9)
- Body word count: 2,341 (mid-depth, in the 2,500-3,500 band on the lower side)

### Flags raised to wave3_site_wide_flags.md
- No new flag. The meta-description-over-limit issue was caught at session-time by the standard 6-check verifier (which does correctly check this); no verifier gap surfaced beyond what F-12 already covers.

### 2-3 sentence summary
B9 ships the voluntary pilot opt-in decision page. Mid-depth at 2,341 body words; 14 rich FAQs; lays out 3 reasons to opt in + 3 reasons not to + the 14-item pilot exclusion list (HICBC, jointly-owned property, partnerships, FHL, etc., narrower than eventual mandate scope) + 3 specific pilot restrictions (accounting period, cash-vs-accruals lock-in, no loss carry-back) + worked persona contrast (slightly-over-£50k landlord pilot makes sense, £42k sub-threshold doesn't) + opt-in/opt-out mechanics. 9 internal cross-links, all category-URL-verified per F-12 hardening. No new flags raised.
