# Wave 4 brief: mtd-itsa-choosing-software-by-landlord-scenario-decision-tree

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> A scenario-led decision framework, NOT a product comparison or "best of" list. The page owns the **decision-tree mechanic**: given the landlord's facts (number of properties, joint ownership, HMO / multi-let split, foreign-property element, mixed self-employment), the framework outputs the software class fit (full property-specific SaaS / general bookkeeping suite / spreadsheet plus bridging / free-tier for one-property only) plus the evaluation-criteria checklist (foreign-income support, joint-owner split mechanic, ASA agent access, bank-feed integration, digital-link compliance per house position §19.14). Deliberately does NOT recommend specific products by name; cites the gov.uk compatible-software register as the authoritative list and explains why a tax firm shouldn't curate product picks. Distinct from the existing legacy `best-mtd-software-landlords-2026` and `landlord-accounting-software-uk-best-options-2026` pages, which are product-comparison content this page actively differentiates from.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Decision-tree framing distinguishes from existing 'best MTD software' product-listicle pages. We are a tax firm, not a software reseller; framing matters.

---

## Competitor URLs (Stage 2 validated)

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read these as the "best-of" product-recommendation pattern this page deliberately departs from; extract evaluation criteria competitors use, then build a scenario-led framework that does not name product winners.

- https://www.ukpropertyaccountants.co.uk/experts-pick-5-mtd-software-for-small-businesses-landlords/ — VERIFIED ALIVE 2026-05-23 (Stage 1 seed). Classic "top 5 list" framing. Useful for the evaluation-criteria the listicle implicitly uses (price, foreign-income support, bank feeds) which the decision-tree should make explicit. Do NOT replicate the product picks.
- https://www.ukpropertyaccountants.co.uk/best-mtd-software-for-landlords-sole-traders-your-complete-guide-for-2025/ — VERIFIED ALIVE 2026-05-23. Longer listicle covering the same domain; useful for FAQ phrasing ("Which is best for a one-property landlord?") that this page reframes as decision-tree branches.
- https://www.ukpropertyaccountants.co.uk/best-mtd-compatible-software-for-landlords-in-2025/ — VERIFIED ALIVE 2026-05-23. Another sibling listicle. Note how all three of these pages converge on the same 5-6 names; the framework lets the reader pick by fact pattern instead.
- https://rentalbux.com/blogs/quickbooks-vs-freeagent-for-mtd-ai-native-or-bank-tied — VERIFIED ALIVE 2026-05-23. Single-comparison piece (commercial bias to flag); useful for the "bank-feed integration" evaluation-criterion branch.
- https://rentalbux.com/blogs/freeagent-vs-sage-for-mtd-two-genuine-free-routes-compared — VERIFIED ALIVE 2026-05-23. Free-tier comparison; supports the "one-property single-landlord can run on free-tier" branch of the decision tree.
- https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax — VERIFIED ALIVE 2026-05-23. Cited in body as the authoritative software register the page defers to instead of picking favourites.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (Jaccard 0.23, category: `Making Tax Digital (MTD)`)
- `srt-statutory-residence-test-landlord-decision-tree` (Jaccard 0.23, category: `Non-Resident Landlord Tax`)
- `best-mtd-software-landlords-2026` (Jaccard 0.20, category: `Making Tax Digital (MTD)`)
- `how-to-register-mtd-landlord-step-by-step-guide` (Jaccard 0.18, category: `Making Tax Digital (MTD)`)
- `landlord-accounting-software-uk-best-options-2026` (Jaccard 0.18, category: `Making Tax Digital (MTD)`)

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

- [HMRC compatible-software list for MTD ITSA (gov.uk — the authoritative register, cite directly)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (digital reporting obligations, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [HMRC notice 700/22 (digital links, the rule the bridging-software branch defers to)](https://www.gov.uk/government/publications/vat-notice-70022-making-tax-digital-for-vat)
- [HMRC Property Income Manual (PIM) overview](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [HMRC ASA registration (relevant where the framework branches on "agent files for me")](https://www.gov.uk/guidance/get-an-hmrc-agent-services-account)
- [Spring Statement 2025 HTML (cite once to anchor the 15/30/31 + 3%/3%/10% penalty acceleration that makes software choice non-trivial)](https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html)
- House position §19.6 (software requirements) and §19.14 (digital-link rule) — internal tie-breakers.

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
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave4_site_wide_flags.md

### 2-3 sentence summary
