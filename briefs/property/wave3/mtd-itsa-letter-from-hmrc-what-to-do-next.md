# Wave 3 brief: mtd-itsa-letter-from-hmrc-what-to-do-next

**Site:** property
**Bucket:** MTD for ITSA
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-letter-from-hmrc-what-to-do-next.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-letter-from-hmrc-what-to-do-next

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-letter-from-hmrc-what-to-do-next`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD for ITSA
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Action-oriented process page for landlords who receive the HMRC pre-mandate outreach letter. The letter is not an assessment; it is an information notice that you appear in scope. Covers the recipient options (verify, register, get software, claim exemption if applicable, dispute the scope determination), the timeline pressure (typically 3-6 months before mandate date), and the cost of inaction (mandate becomes effective whether or not the recipient responded). Distinct framing: this is the 'I just got a letter' page, not the 'I am planning ahead' page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/received-hmrcs-mtd-letter-mtd-compliance-for-landlords/ — VERIFIED ALIVE 2026-05-22 (Trustpilot 410+ reviews block confirms current page; content body confirmed sparse via WebFetch but page exists). Persona anchor: HMRC's pre-mandate outreach letter campaign. Treat as the keyword/intent capture; competitor body is thin, your page can be the deeper one.
- https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax — HMRC eligibility tool to verify the letter's claim. Critical: many letter recipients should run the gross test themselves before accepting the letter at face value.
- https://www.gov.uk/government/publications/making-tax-digital-for-income-tax-letter-template — gov.uk letter examples (if alive on session fetch; session to verify).
- https://www.gov.uk/guidance/sign-up-as-an-individual-for-making-tax-digital-for-income-tax — the action the letter prompts. Operational landing point.
- https://www.gov.uk/government/organisations/hm-revenue-customs/contact — HMRC contact details for the "I think this is wrong, who do I call" sub-question.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

Inventory scanned 2026-05-22 across all 346 Property posts. Closest neighbours topically:

1. **`how-to-register-mtd-landlord-step-by-step-guide`** — the registration workflow the letter prompts. Distinct angle: this page leads with the trigger event (letter arriving) and the verification decision (am I really in?), then hands off to the registration pillar for the workflow. Cross-link forward.

2. **`mtd-rental-income-threshold-exemptions`** — verification reference. The letter may misclassify (HMRC works off CY-2 SA returns; exemption categories may apply). Cross-link.

3. **B1 sibling `mtd-itsa-qualifying-income-test-gross-vs-net`** — the gross-test mechanic the verification uses. Cross-link as primary technical reference.

4. **B9 sibling `mtd-itsa-pilot-trial-volunteer-2025-26-experience`** — the early-opt-in alternative if the letter recipient wants to get ahead of the mandate. Cross-link.

5. **`making-tax-digital-landlords-april-2026-deadline`** — the deadline anchor. Cross-link.

6. **`mtd-penalties-landlords-miss-deadline`** — penalty consequences of inaction post-letter. Cross-link in the "what if I ignore" section.

7. **`landlord-tax-return-complete-guide-2026`** — existing SA framing; useful for the "I am not in MTD scope, I keep filing SA" branch.

**Differentiation move:** trigger-event persona page. Lead with "you received an HMRC letter", then the three-route decision tree: verify-and-register, verify-and-dispute-classification, verify-and-confirm-exemption. Each route gets a worked path. Distinct from registration pillar (process) and threshold pillar (taxonomy). No CANNIBAL flag.

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
- **Final slug:** mtd-itsa-letter-from-hmrc-what-to-do-next (as briefed; no override)
- **Final category:** making-tax-digital-mtd (as briefed)
- **H1 chosen:** "You Received an MTD ITSA Letter From HMRC: What It Is, What It Isn't, and What to Do Next" (signals the trigger event in second-person from the start; sets up the page's distinctive framing as a reaction page rather than a planning page)
- **Meta title chosen:** "MTD ITSA Letter From HMRC: What It Means and Next Steps" (55 chars)
- **Why these vs other options:** Page is a trigger-event persona/action page distinct in format from the mechanic / comparison / persona pages already shipped this bucket. Lead with "the letter arrives" sets up second-person reading immediately. Outline deliberately diverges from the prior B-bucket pages: no mechanic table opening, no cohort-comparison opening, instead a "what the letter says vs doesn't say" frame. Body 1,964w (intentional reference-floor per §16.16); the substantive value sits in the 3-check verification + 4-route decision tree + 10-day action plan + 7-mistake list, all of which are checklists rather than long prose. 14 FAQs deliberately rich and operational (most over 100 words) to cover the cohort-specific letter scenarios. Padding the body to 2,800 would dilute the action-oriented clarity. HowTo schema candidate flagged below (the 10-day action plan table has step structure).

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/received-hmrcs-mtd-letter-mtd-compliance-for-landlords/ , attempted; same gated-content pattern as B4 and B5 (no extractable article body, page exists). Relied on brief stage 2 reasoning + house position §3 / §19.1-19.3 / §19.6-19.7 directly.
- gov.uk MTD ITSA collection (https://www.gov.uk/government/collections/making-tax-digital-for-income-tax), alive 200, canonical entry point for the gov.uk resources the letter references.
- gov.uk sign-up flow (https://www.gov.uk/guidance/sign-up-for-making-tax-digital-for-income-tax), alive 200 after redirect from the brief's URL, this is the operational landing the letter prompts.

### Existing-page review (from "Closest existing pages")
- `how-to-register-mtd-landlord-step-by-step-guide` , confirmed exists; cross-linked outbound as the registration pillar this page hands off to.
- `mtd-rental-income-threshold-exemptions` , confirmed exists; cross-linked outbound as the structural-exemption reference (despite the F-7/F-9 errors on that page, the cross-link is the right pointer; the post-merge cleanup queue will fix the errors).
- Wave 3 sibling B1 `mtd-itsa-qualifying-income-test-gross-vs-net` , confirmed shipped (70a303e); cross-linked as the figure-verification mechanic the page asks the reader to run.
- `making-tax-digital-landlords-april-2026-deadline` , confirmed exists; cross-linked as the deadline anchor.
- `mtd-penalties-landlords-miss-deadline` , confirmed exists; cross-linked in the cost-of-inaction section.
- `landlord-tax-return-complete-guide-2026` , confirmed exists; not cross-linked because the "I am out of scope, I keep filing SA" branch is implicit in the routes rather than a substantive section that warrants a dedicated outbound link. Could be added on a maintenance pass.
- Wave 3 sibling B9 `mtd-itsa-pilot-trial-volunteer-2025-26-experience` , NOT YET SHIPPED (still ⬜ todo for me to write this session); cross-link deferred.
- Wave 3 sibling B8 pillar `mtd-itsa-overview-six-changes-residential-landlords` , confirmed shipped (053af20); cross-linked.
- Wave 3 sibling B2 `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` , confirmed shipped (ed595db); cross-linked.
- Wave 3 sibling B3 `mtd-itsa-jointly-owned-property-threshold-split` , confirmed shipped (dff42ad); cross-linked.
- Wave 3 sibling B4 `mtd-itsa-exit-rule-income-drops-three-year-test` , confirmed shipped (9d52572); cross-linked.
- Wave 3 sibling B5 `mtd-itsa-vs-limited-company-cohort-different-rules` , confirmed shipped (0c511b2); cross-linked.

10 internal cross-links total. Heaviest internal link density of any B-bucket page so far, deliberate because the trigger-event page is the natural front-door to the MTD bucket and benefits from a comprehensive hand-off to every onward route.

### Citations added (external authority)
- FA 2017 Sch A1 (named in body for the structural exclusion of Ltd Cos).
- FA 2021 Sch 24 (named for the points-based late-submission regime).
- Spring Statement 2025 (named for the 15/30/31 + 3%/3%/10% late-payment regime in the cost-of-inaction section).
- gov.uk MTD ITSA collection (referenced as the letter's pointed-to resources).
- gov.uk MTD ITSA sign-up flow (referenced as the operational landing).
- HMRC business tax account / Agent Services Account (named operationally in the routes section).

### Internal links added (to our existing pages)
1. /blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net (B1, figure-verification)
2. /blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions (structural-exemption pillar)
3. /blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide (registration pillar)
4. /blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords (B8 bucket pillar)
5. /blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split (B3 joint-owner case)
6. /blog/making-tax-digital-mtd/mtd-itsa-accidental-landlords-do-i-need-to-file-digitally (B2 accidental cohort)
7. /blog/making-tax-digital-mtd/mtd-itsa-vs-limited-company-cohort-different-rules (B5 Ltd Co route)
8. /blog/making-tax-digital-mtd/mtd-itsa-exit-rule-income-drops-three-year-test (B4 cessation/exit route)
9. /blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline (deadline anchor)
10. /blog/making-tax-digital-mtd/mtd-penalties-landlords-miss-deadline (penalty consequences)

All 10 resolve.

### Inline CTA placements
- Aside 1: after the "Verify before you act, the three things to check" H2, at the moment the reader has been told that 1 in 6 letters has a fact issue and is forming the "should I get help running this check?" question. Conversion moment.
- Aside 2: after the "The cost of inaction" H2, at the moment the reader has seen the £600+ first-year penalty scenario and is thinking about the dispute / structural-exemption routes. Conversion moment.
- 2 asides total. No opening aside, no aside inside a worked example. Disciplined per the brief.

### Build attempts
- Build 1: clean. 0 errors, 0 warnings related to this page.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14/14
- Em-dashes in markdown: 0 (also 0 en-dashes)
- Tailwind classes in markdown: 0
- Meta title length: 55 chars (limit 62)
- Meta description length: 151 chars (limit 158)
- Internal links resolve: 10/10
- monitored_pages row inserted: yes (id 143, rewrite_type='rewrite' per the table's CHECK constraint, notes flag NETNEW Wave 3 Session B B6)
- Body word count: 1,964 (intentionally below the 2,500 typical floor per §16.16 reference-page exception; action page where substantive value is in checklists not prose. Reasoning in Decisions block.)

### Flags raised to wave3_site_wide_flags.md
- HowTo schema flag: the "Timeline pressure" H2 contains a 5-row action-plan table with sequential day-bands (Day 0-2, 3-5, 6-10, 11-30, 30+) that maps naturally to HowTo schema. Recommend the orchestrator assess whether to add HowTo schema to the template for action-oriented pages of this kind (NOT in body). Filed as SCHEMA flag (not blocking; the page works without it).

### 2-3 sentence summary
B6 ships the trigger-event action page for landlords who receive the HMRC pre-mandate MTD ITSA outreach letter. Distinct format from the mechanic / comparison / persona siblings: leads with "the letter arrives" in second-person, lays out 3-check verification + 4-route decision tree (verify-and-register, dispute the classification, claim exemption, post-reference-year change) + 10-day action-plan table + 7-mistake list + cost-of-inaction quantification (~£600 first-year penalty scenario). 1,964 body words (intentional reference-floor per §16.16; substance in checklists not prose) with 14 rich operational FAQs and the heaviest internal cross-link density of any B-bucket page so far (10 cross-links across the full MTD bucket lattice). HowTo schema candidate flagged for the action-plan table.
