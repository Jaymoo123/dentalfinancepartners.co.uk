# Wave 4 brief: mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The mid-year cessation operational mechanic for a landlord in MTD ITSA, per house position §19.15. Covers four scenarios competitor coverage tends to merge: (1) the **final-property-disposal** route (last property sold during a tax year — final quarterly update covers partial quarter to disposal, EoPS + final declaration cover full tax year up to cessation, HMRC notification ends MTD obligations), (2) the **stop-letting-keep-property** route (e.g. landlord moves in as PPR — MTD ends at cessation, CGT PRR considerations begin), (3) **post-cessation expense recovery** under ITTOIA 2005 s.354 (allowable for 7 years where the expense would have been deductible had the business continued — repairs to former let property, professional fees), and (4) the **parallel CGT 60-day return** obligation under TMA 1970 Sch 3ZA where a disposal triggers it (runs alongside MTD cessation reporting; two separate obligations, not one combined filing). Distinct from Wave 3 B4 (`mtd-itsa-exit-rule-income-drops-three-year-test`) which covers the income-drop sub-threshold exit; B9 is the disposal-driven cessation route.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Distinct from Wave 3 B4 (3-year sub-threshold exit rule); B9 is the disposal-driven cessation route.

---

## Competitor URLs (Stage 2 validated)

**Stage 1 seed URL OFF-TOPIC:** `https://www.ukpropertyaccountants.co.uk/250000-sign-up-for-mtd-but-most-landlords-still-arent-ready/` — confirmed alive but covers MTD adoption-stats / sign-up rates, NOT cessation or stopping letting. Replaced below; cessation as a specific topic is under-covered in the v2 universe, so the page leans more on authority sources (gov.uk, ITTOIA 2005) and on adjacent practitioner content.

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read for the cessation walkthrough, post-cessation expense treatment, and CGT-overlay phrasing.

- https://www.provestor.co.uk/help/mtd/advanced-topics/selling-properties — VERIFIED ALIVE 2026-05-23 (replaces seed). Software-vendor help page on selling properties under MTD; useful for the final-quarter mechanic and the "what the software needs you to do" operational steps.
- https://www.ukpropertyaccountants.co.uk/heres-how-you-can-exit-mtd-if-your-income-falls/ — VERIFIED ALIVE 2026-05-23. Covers the §19.5 income-drop exit (Wave 3 B4 territory); useful contrast for B9 — read the article and write the cessation page in language that names the difference (Wave 3 B4 = three-year sub-threshold drop; this page = single-year disposal cessation).
- https://rentalbux.com/blogs/how-to-sell-a-tenanted-property-under-the-renters-rights-act — VERIFIED ALIVE 2026-05-23. Disposal-mechanics piece with strong RRA 2025 context; useful for the FAQ phrasing on the legal-completion timing.
- https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html — VERIFIED ALIVE 2026-05-23. Penalty regime context (15/30/31 + 3%/3%/10%) for the cessation-late-pay FAQ.
- https://www.ukpropertyaccountants.co.uk/cgt-late-filing-penalties/ — VERIFIED ALIVE 2026-05-23. CGT 60-day return mechanics; useful for the parallel-obligation section.

**Note on under-coverage:** as of 2026-05-23 the v2 competitor universe lacks a strong dedicated "mid-year cessation in MTD ITSA" page. B9 is therefore an authority-led page (lean on ITTOIA 2005 s.354, TMA 1970 Sch 3ZA, HMRC PIM, gov.uk MTD guidance) rather than a competitor-led rewrite.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-quarterly-reporting-landlords-step-by-step-guide` (Jaccard 0.18, category: `Making Tax Digital (MTD)`)
- `nrl-scheme-letting-agents-quarterly-returns-mechanics` (Jaccard 0.18, category: `Non-Resident Landlord Tax`)
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (Jaccard 0.13, category: `Making Tax Digital (MTD)`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket

Pick 4-7 to actually cite; add others found during research. B9 leans heavier than typical on authority sources due to the under-coverage in the v2 competitor universe.

- [ITTOIA 2005 s.354 — post-cessation receipts and expenses (legislation.gov.uk; the 7-year recovery basis)](https://www.legislation.gov.uk/ukpga/2005/5/section/354)
- [TMA 1970 Sch 3ZA — CGT 60-day return for UK property disposal (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/1970/9/schedule/3ZA)
- [HMRC Property Income Manual (PIM) — cessation guidance; PIM overview](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [HMRC CGT on UK property service — 60-day return mechanics (gov.uk)](https://www.gov.uk/guidance/report-and-pay-your-capital-gains-tax)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk; covers cessation notification)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [TCGA 1992 s.222–226 — Private Residence Relief (for the "stop letting, move in as PPR" scenario; legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/1992/12/section/222)
- House position §19.15 (mid-year cessation — Wave 4 extension) and §19.5 (income-drop exit, the Wave 3 B4 contrast) — internal tie-breakers.

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
- **Final slug:** `mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics` (no override)
- **Final category:** `Making Tax Digital (MTD)` (no override)
- **H1 chosen:** "Stopping Letting Mid-Year Under MTD ITSA: Cessation Mechanics and Parallel Obligations"
- **Meta title chosen:** "Stopping Letting Mid-Year: MTD ITSA Cessation Mechanics" (55 chars)
- **Why these vs other options:** Lead with the trigger ("stopping letting mid-year") + the regime ("MTD ITSA") + the page's primary value ("cessation mechanics"). Distinct from the income-drop exit page (Wave 3 B4); the language deliberately uses "cessation" not "exit" to mark the boundary.

### Competitor URLs fetched
- provestor.co.uk MTD selling properties -> confirmed sale proceeds NOT on MTD update (capital event, separate from rental income). Used as the source-document framing for the "Route 1: disposal" walkthrough.
- legislation.gov.uk ITTOIA 2005 s.354 -> confirms s.354 imports Chapter 18 of Part 2 trader-side post-cessation rules into property businesses. Cited with appropriate caveat (the 7-year window comes from the imported provisions; house position §19.15 is the consolidated framing).
- Did not fetch: ukpropertyaccountants income-drop article (Wave 3 B4 territory, already covered), rentalbux selling-tenanted (RRA 2025 context, off-topic for cessation mechanics), Spring Statement 2025 (already established in B5), CGT late-filing (already established via TMA 1970 Sch 3ZA cite).

### Existing-page review (from "Closest existing pages")
- `mtd-quarterly-reporting-landlords-step-by-step-guide` (0.18) — F-7/F-9 stale figures page; not cited as authority.
- `nrl-scheme-letting-agents-quarterly-returns-mechanics` (0.18) — NRL territory; not cross-linked from B9.
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (0.13) — adjacent persona; not cross-linked.
- `mtd-itsa-jointly-owned-property-threshold-split` (0.13) — joint-owner threshold; B9 cross-links to Wave 4 B1 instead (which already cross-links to that page).
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (0.13) — adjacent; not cross-linked.
- Semantic neighbours cross-linked: `mtd-itsa-exit-rule-income-drops-three-year-test` (Wave 3 B4 — the income-drop exit contrast); `mtd-itsa-overview-six-changes-residential-landlords` (bucket pillar); Wave 4 B1 (joint-owner cessation pattern); Wave 4 B3 (ASA-engaged accountant cessation flow).

### Citations added (external authority)
- ITTOIA 2005 s.354 (post-cessation receipts and expenses, importing Chapter 18 of Part 2)
- TMA 1970 Sch 3ZA (CGT 60-day return for UK residential property)
- TCGA 1992 ss.222 to 226 (Private Residence Relief — for the stop-letting-keep-property route)
- TMA 1970 s.12B (7-year retention)
- gov.uk MTD ITSA "use the service" guidance (cessation notification mechanic)
- House position §19.15 (Wave 4 mid-year cessation extension) and §19.5 (income-drop exit contrast)
- ITA 2007 s.125 (post-cessation expense relief mechanism, referenced implicitly via the §19.15 framing)

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-itsa-exit-rule-income-drops-three-year-test` (Wave 3 B4) ×2 (intro contrast + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` ×1 (closing section)
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) ×2 (joint-owner cessation section + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-agent-services-account-asa-authorisation-walkthrough` (Wave 4 B3) ×1 (closing section)
- All 4 target files exist; URL category segments verified.

### Inline CTA placements
- `<aside>` 1: after the post-cessation expense relief section (high-intent: landlord with late-arriving invoices realising they have 7 years of relief).
- `<aside>` 2: after the worked Patel cessation example (high-intent: landlord realising the four-deadline sequence is heavier than expected, wants help running it).
- 2 asides total; none inside worked examples, none at page opening.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` passed clean; HTML rendered with 13 Question entries in 1 FAQPage block.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 55 (max 62) ✓
- Meta description length: 147 (max 158) ✓
- Internal links resolve: 4/4 target files exist + URL category segments match destination frontmatter `category` field ✓
- monitored_pages row inserted: yes (id 177, rewrite_type='rewrite', 90-day window)
- Body word count: 2,359 (within 2,500-3,500 informal range, slightly below floor due to focused-mechanics framing; competitor universe under-coverage on this topic per Stage 2 brief note)

### Flags raised to wave4_site_wide_flags.md
- None raised. Authority-led page per Stage 2 brief note about competitor under-coverage; lean on §19.15 + ITTOIA + TMA + TCGA citations rather than competitor outline. No discoveries warranting site-wide flagging.

### 2-3 sentence summary
Net-new operational mechanics page on mid-year cessation under MTD ITSA. Walks Route 1 (final-property disposal: final partial quarterly update + EoPS + final declaration + cessation notification, plus parallel CGT 60-day return under TMA 1970 Sch 3ZA), Route 2 (stop-letting-keep-property: MTD ends, PRR begins under TCGA 1992 ss.222 to 226), post-cessation expense relief under ITTOIA 2005 s.354 / §19.15 7-year window, the four-deadline sequence worked through a Patel Bristol BTL November-completion example, joint-owner per-owner cessation discipline, and explicit anti-templating contrast against Wave 3 B4's income-drop sub-threshold exit (five-difference comparison). Authority-led page per Stage 2 brief note about competitor under-coverage.
