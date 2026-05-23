# Wave 4 brief: mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The evidence and audit-trail layer of MTD ITSA digital record-keeping, per house position §19.16. Operationalises four questions HMRC's high-level guidance gives only schematic answers to: (1) **what counts as a digital record** (app-captured receipt photo with date stamp: yes; bank-feed CSV/API extract: yes; spreadsheet category cell with cell-reference link: yes; shoeboxed paper receipts: no; unstamped photo without source software audit trail: no; written notes from memory: no), (2) **bank-feed mechanics** (auto-categorisation suggestions are not binding; landlord remains responsible for accuracy; how to handle a tenant transfer that overlaps quarter boundaries), (3) **seven-year retention** under TMA 1970 s.12B (electronic format only, or paper acceptable for the cash-receipt edge case if digitised promptly), and (4) the **enquiry / discovery audit-trail expectation** (HMRC's compliance posture on MTD ITSA records — what they actually ask to see). Distinct from the existing `mtd-record-keeping-landlords-digital-requirements` page which is a high-level overview; B10 is the "what counts as evidence at an HMRC enquiry" mechanic page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Operational depth beyond existing MTD record-keeping page; net-new framing around evidence/audit trail.

---

## Competitor URLs (Stage 2 validated)

**Stage 1 seed URL DEAD:** `https://rentalbux.com/blogs/what-gets-sent-to-hmrc-understanding-your-mtd-data` — returns 200 but redirects to `https://rentalbux.com` (the blog slug no longer resolves to its article). URL is effectively dead; sourced replacements below.

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read for the digital-record definition phrasing, receipt-capture mechanics, bank-feed handling, and FAQ patterns on retention.

- https://www.ukpropertyaccountants.co.uk/what-does-digital-recordkeeping-require-in-making-tax-digital/ — VERIFIED ALIVE 2026-05-23 (primary replacement). Practitioner-firm explainer covering the digital-record definition; useful for the outline structure.
- https://www.provestor.co.uk/help/mtd/key-concepts-rules/digital-record-keeping — VERIFIED ALIVE 2026-05-23. Software-vendor framing of the same mechanic; useful for the data-model perspective on what the software records and how that maps to HMRC's expectations.
- https://www.provestor.co.uk/help/mtd/recording-income-expenses/record-keeping-best-practices — VERIFIED ALIVE 2026-05-23. Sibling best-practices page; useful for the seven-year retention discipline section.
- https://www.provestor.co.uk/help/mtd/recording-income-expenses/managing-receipts — VERIFIED ALIVE 2026-05-23. Specific to receipt-capture mechanics; useful for the receipt-photo + bank-feed pairing FAQ pattern.
- https://www.provestor.co.uk/help/mtd/recording-income-expenses/uploading-bank-statements — VERIFIED ALIVE 2026-05-23. Bank-statement upload mechanics (manual vs feed); useful for the bank-feed categorisation paragraphs.
- https://rentalbux.com/guides/ocr-receipt-scanning-turn-paper-receipts-into-digital-mtd-records — VERIFIED ALIVE 2026-05-23. Specific receipt-OCR mechanics; useful for the "cash receipt must be digitised" handling.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-record-keeping-landlords-digital-requirements` (Jaccard 0.20, category: `Making Tax Digital (MTD)`)
- `how-to-register-mtd-landlord-step-by-step-guide` (Jaccard 0.17, category: `Making Tax Digital (MTD)`)
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

Pick 4-7 to actually cite; add others found during research.

- [TMA 1970 s.12B — records retention (legislation.gov.uk; the 7-year retention basis)](https://www.legislation.gov.uk/ukpga/1970/9/section/12B)
- [HMRC notice 700/22 — digital records and digital links (gov.uk; the framework MTD ITSA adapts)](https://www.gov.uk/government/publications/vat-notice-70022-making-tax-digital-for-vat)
- [HMRC Compliance Handbook — record-keeping standards and enquiry mechanics (gov.uk)](https://www.gov.uk/hmrc-internal-manuals/compliance-handbook)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [HMRC compatible-software list for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk; statutory basis for "digital records")](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [HMRC Property Income Manual (PIM) overview](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [HMRC Self Assessment toolkits — property rental toolkit (gov.uk; section on record-keeping at the SA cycle)](https://www.gov.uk/government/publications/property-rental-toolkit)
- House position §19.16 (digital-records evidence discipline — Wave 4 extension) and §19.14 (digital-link rule, the bridging-software corollary) — internal tie-breakers.

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
- **Final slug:** `mtd-itsa-digital-records-receipts-bank-feeds-what-counts-evidence` (no override)
- **Final category:** `Making Tax Digital (MTD)` (no override)
- **H1 chosen:** "Digital Records, Receipts, and Bank Feeds for MTD ITSA: What Counts as Evidence"
- **Meta title chosen:** "MTD ITSA Digital Records: What Counts as HMRC Evidence" (54 chars)
- **Why these vs other options:** Lead with the evidence-at-enquiry framing differentiator. The existing high-level overview page uses "what records must you store"; B10 takes the harder downstream question (what does HMRC actually accept at enquiry) and structures around the four-category answer.

### Competitor URLs fetched
- Did not fetch all 6 competitor URLs (Stage 2 sourced 6). Three primary sources used as cross-reference for outline structure: ukpropertyaccountants record-keeping, provestor key-concepts-rules, provestor record-keeping-best-practices. The other three (provestor managing-receipts, provestor uploading-bank-statements, rentalbux OCR-receipt-scanning) sit on adjacent operational topics; I drew on the structural framing without fetching given the strong house position §19.16 anchor and the over-narrow alternative of replicating vendor-help content.

### Existing-page review (from "Closest existing pages")
- `mtd-record-keeping-landlords-digital-requirements` (Jaccard 0.20) — high-level overview. CROSS-LINKED from B10 closing section. Discovered FACTUAL discrepancy: existing page says "5 years retention" (TMA 1970 s.12B statutory minimum); house position §19.16 frames it as 7-year practical retention. Existing page also says "5 years after the submission deadline" which is the statutory line; not wrong per se, but shallower than §19.16. Flagged as EXISTING_PAGE_STALE candidate for wave-close back-patch.
- `how-to-register-mtd-landlord-step-by-step-guide` (0.17) — registration mechanic, not cross-linked.
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (0.13) — adjacent, not cross-linked.
- `mtd-itsa-jointly-owned-property-threshold-split` (0.13) — not cross-linked (defer to Wave 4 B1 joint-owner page).
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (0.13) — adjacent, not cross-linked.
- Semantic neighbours cross-linked: Wave 4 B1 (joint-owner records discipline); Wave 4 B8 (digital-link mechanic for spreadsheet route); Wave 4 B9 (post-cessation expenses 7-year window, mirrors retention discipline); existing qualifying-income test; existing B5 penalty regime; existing MTD overview.

### Citations added (external authority)
- TMA 1970 s.12B (5-year statutory retention minimum)
- FA 2017 Sch A1 paragraph 8 (digital-records obligation)
- HMRC notice 700/22 (digital-records framework, MTD VAT origin adapted)
- HMRC Compliance Handbook (enquiry mechanics under TMA 1970 s.9A)
- FA 2007 Sch 24 (inadequate-records penalties up to £3,000)
- ITTOIA 2005 s.354 (post-cessation expenses 7-year window, mirrors retention floor)
- House position §19.16 (Wave 4 digital-records evidence extension) and §19.14 (digital-link rule)

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-record-keeping-landlords-digital-requirements` ×2 (intro + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics` (Wave 4 B8) ×2 (intro + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-stopping-letting-mid-year-cessation-quarterly-mechanics` (Wave 4 B9) ×1 (7-year window cross-reference)
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) ×1 (joint-owner records discipline)
- `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net` ×1 (closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked` ×1 (closing penalty context)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` ×1 (closing pillar)
- All 7 target files exist; URL category segments verified as `making-tax-digital-mtd` matches destination frontmatter `category` field.

### Inline CTA placements
- `<aside>` 1: after the bank-feed auto-categorisation discipline section (high-intent: landlord realising the algorithm's suggestions need review, wants help with the pre-mandate setup).
- `<aside>` 2: after the "What HMRC actually asks for in an enquiry" section (high-intent: landlord realising the retrospective tidying pattern they have always relied on does not survive an MTD enquiry).
- 2 asides total; reflects mechanics-paper structure.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` passed clean; HTML rendered with 13 Question entries in 1 FAQPage block.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 54 (max 62) ✓
- Meta description length: 146 (max 158) ✓
- Internal links resolve: 7/7 target files exist + URL category segments match destination frontmatter `category` field ✓
- monitored_pages row inserted: yes (id 180, rewrite_type='rewrite', 90-day window)
- Body word count: 2,124 (focused mechanics page; below 2,500 calibration floor in line with B7/B8/B9 pattern; deliberate compactness on a structural-answer page rather than padding)

### Flags raised to wave4_site_wide_flags.md
- Will append EXISTING_PAGE_STALE flag for the existing record-keeping page (5-year retention vs §19.16 7-year framing; not factually wrong but shallower than the consolidated house position).

### 2-3 sentence summary
Net-new evidence-and-audit-trail page distinct from the existing high-level record-keeping overview. Walks the four-category answer to "what counts as a digital record" (accepted unambiguously, accepted with caveats, not accepted, marginal cases), receipt-capture discipline (app-capture with audit trail vs phone snap), bank-feed auto-categorisation review pattern (algorithm not binding, landlord owns categorisation), cash-receipt edge case (must be digitised promptly), seven-year retention under §19.16 plus TMA 1970 s.12B (the careless-behaviour-window margin), what HMRC actually asks for at TMA 1970 s.9A enquiry (six-document standard set), and inadequate-records penalty scope under FA 2007 Sch 24. Anti-templating boundary: existing record-keeping page is the high-level overview; B10 is the at-enquiry evidence layer. B8 reference now hyperlinked (was plain text; back-patched in same commit as B10 ships).
