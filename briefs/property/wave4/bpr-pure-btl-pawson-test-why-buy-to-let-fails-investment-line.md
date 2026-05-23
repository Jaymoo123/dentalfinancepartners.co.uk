# Wave 4 brief: bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line

---

## Manager pre-decisions

- **Suggested slug:** `bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The negative-case page for the pure buy-to-let cohort. Pawson v HMRC [2013] UKUT 050 (TCC) draws the investment / trading line at s.105(3) IHTA 1984 "mainly investment": passive rent collection plus the standard letting-agent overlay (tenant find, maintenance arranging, rent collection) lands on the investment side, and BPR is denied. Lead with "Why your BTL doesn't qualify" and stay short and sharp; defer the serviced-accommodation boundary case to Wave 2's `serviced-accommodation-bpr-eligibility-pawson-test` and the general rule to Wave 2's `business-property-relief-rental-property-iht`. The page is for the 90%-of-readers pure-BTL cohort who reach for BPR + 7-year planning and need to understand the relief is not available before they design around it.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Core IHT myth-buster. Distinct from Wave 2 by being the negative case for pure BTL, not the qualifying-case for serviced accommodation.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ pattern, worked examples, internal citation density. Note where competitor leads with general BPR rule vs landlord-specific framing; our differentiator is the negative-case for pure BTL.

- https://www.djh.co.uk/latest-news/news-insights/iht-planning-review-protecting-your-business-assets-with-br/ — Stage 1 seed, verified live 2026-05-23 (200). Mid-market accountant BPR overview, useful for general-rule framing to contrast against.
- https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/ — Verified live 2026-05-23 (200). Covers the April 2026 £1m BPR/APR cap from a property-tax-specialist angle; useful for Pawson-context framing within the wider IHT-relief landscape.
- https://www.ukpropertyaccountants.co.uk/business-property-relief-on-landlord-portfolio/ — Sibling page, likely live (same domain working set). Pure-BTL eligibility content matches our negative-case framing; session to verify at write time and borrow FAQ phrasing where it covers "Does my BTL qualify?".
- https://www.tlpi.co.uk/services/inheritance-tax/ — Specialist FIC firm in v2 working set with retirement-and-legacy case studies; useful for the "what to do instead" forward-link section after the negative answer.

**Borrowable patterns:** competitor outlines tend to put "Does BPR apply to property?" as H2 then meander into APR. Our discipline: lead H1/H2 with negative answer, then deliver the *Pawson* mechanic, then a tight comparison block (BTL = no / SA-with-services = boundary / property dev WIP = yes for trading element), then forward-link to alternative IHT routes (FIC value-freeze, lifetime gifting, charity legacy).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `serviced-accommodation-bpr-eligibility-pawson-test` (Jaccard 0.18, category: `Property Types & Specialist Tax`)
- `close-investment-holding-company-property` (Jaccard 0.16, category: `Incorporation & Company Structures`)
- `buy-to-let-limited-company-complete-guide-uk` (Jaccard 0.15, category: `Incorporation & Company Structures`)
- `should-i-incorporate-buy-to-let-portfolio-2026` (Jaccard 0.14, category: `Incorporation & Company Structures`)
- `what-services-buy-to-let-accountant` (Jaccard 0.14, category: `Property Accountant Services`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- *Pawson v HMRC* [2013] UKUT 050 (TCC) decision: https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc (anchor case for the investment line; non-optional citation).
- *Brander v HMRC* [2010] UKUT 300 (TCC) decision: https://www.gov.uk/tax-and-chancery-tribunal-decisions/brander-v-hmrc-2010-ukut-300-tcc (contextualises the trading-vs-investment continuum; useful for the SA boundary mention).
- IHTA 1984 s.105 (BPR — "relevant business property"): https://www.legislation.gov.uk/ukpga/1984/51/section/105 (s.105(3) "mainly investment" exclusion is the statutory pin).
- IHTA 1984 contents: https://www.legislation.gov.uk/ukpga/1984/51/contents
- HMRC IHTM25260+ (mainly-investment determination): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25260 (HMRC's published approach to the s.105(3) test).
- HMRC IHTM25000 (BPR overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000
- gov.uk APR/BPR reforms 6 April 2026: https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms (£1m cap context, even though pure BTL doesn't reach BPR in the first place).
- HMRC IHT400 (estate return): https://www.gov.uk/government/publications/inheritance-tax-inheritance-tax-account-iht400 (BPR claim box; useful where readers ask about claim mechanics).
- Autumn Budget 2024: https://www.gov.uk/government/publications/autumn-budget-2024 (BPR/APR cap announcement).

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
- **Final slug:** `bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line` (no override)
- **Final category:** `Landlord Tax Essentials` (Wave 2 sibling pillar `business-property-relief-rental-property-iht` and decision-framework page both sit there; consistent with the pure-BTL 90%-of-readers cohort framing)
- **H1 chosen:** "Why Your Buy-to-Let Doesn't Qualify for Business Property Relief"
- **Meta title chosen:** "Why Pure Buy-to-Let Fails BPR: The Pawson Test" (46 chars)
- **Why these vs other options:** H1 leads directly with the negative answer ("doesn't qualify"), addresses the reader in the second person, and names the asset class (BTL). Meta title is shorter and harder than the H1 (the user's likely SERP click-decision is "BPR pure buy-to-let pawson" and the title compresses that). Considered alternatives: "Pure BTL and BPR: Why Pawson Closes the Door" (rejected, too oblique); "BPR Pure Buy-to-Let: Why BTL Fails the Pawson Test" (rejected, repeated "buy-to-let" + "BTL"); current chosen leads with the question word "Why" which works better for the cohort.

### Competitor URLs fetched
- `https://www.djh.co.uk/latest-news/news-insights/iht-planning-review-protecting-your-business-assets-with-br/` — fetched, 200. ~2,000 words. General BR framework, leads with the £1m cap rather than the BPR-eligibility question. Useful as a contrast for the framing differentiator (most competitor BR content jumps to the cap mechanics; ours leads with "you don't qualify in the first place"). No legislation citations.
- `https://www.ukpropertyaccountants.co.uk/business-property-relief-on-landlord-portfolio/` — 404 at fetch time. Stage 2 brief listed it as "Sibling page, likely live"; URL appears stale. Logged to discovery log as `AUTHORITY_GAP` (competitor universe v2 contains stale URLs).
- `https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/` — fetched, 200. ~1,200 words. £1m cap focus. Explicitly notes "the article does not address pure buy-to-let landlords" because BPR excludes investment properties; that confirms our differentiator is correct (the competitor universe genuinely under-serves the pure-BTL-and-BPR question).
- `https://www.tlpi.co.uk/services/inheritance-tax/` — 404 at fetch time. Discovered alternate URL set on tlpi.co.uk: `/inheritance-tax-what-business-owners-need-to-know`, `/insights/why-you-need-a-family-investment-company`. Forward-link to FIC pillar absorbed into the "what works instead" section instead of citing tlpi directly (commercial bias).

### Existing-page review (from "Closest existing pages")
- `serviced-accommodation-bpr-eligibility-pawson-test` (Wave 2 A5) — read in full. The case-law deep-dive: Henderson J's full Pawson analysis, post-Pawson Green / Vigne, IHTM25277-25280, Helena 6-unit Edinburgh worked example. **C1 explicitly defers case-law depth to this page** to honour the "shorter and sharper" framing differentiator. One forward-link in the "Pawson in one paragraph" section + one in "Where the BPR line genuinely sits".
- `business-property-relief-rental-property-iht` (Wave 2 general-rule pillar) — read in full. Shallower DeepSeek-era piece (~1,500 body words) covering generic BPR rules + a brief FHL aside. C1 forward-links to it as the general-rule pillar and is positioned as the deeper landlord-cohort-specific page on top of it. Considered raising INTERNAL_LINK flag for a back-link from the pillar to C1; pillar already has a Wave 2 reciprocal block linking to SA-Pawson and other neighbours, so add C1 to the pillar's Related Reading is a Wave-close back-patch (flagged below).
- `iht-april-2026-bpr-apr-cap-property-impact` (Wave 2 A4) — read in full. C1's "April 2026 cap is not your problem" section forward-links here. No content overlap because A4 is for affected segments and C1 explicitly says BTL cohort is NOT affected.
- `iht-property-investors-decision-framework-2026-onwards` — read in full. Perfect "what works instead" companion. Forward-linked from the final body section.
- `fic-iht-treatment-bpr-myth` — read in full. Corporate-wrapper companion that uses the same Pawson logic. Forward-linked from the "limited company doesn't unlock BPR" sub-section.

### Citations added (external authority)
- *Pawson v HMRC* [2013] UKUT 050 (TCC) (gov.uk decisions index) — anchor case.
- Section 105 IHTA 1984 (legislation.gov.uk) — statutory carve-out at s.105(3); verbatim text quoted in body.
- IHTM25000 (HMRC manual BPR overview) — HMRC's published view entry point.
- gov.uk APR/BPR reforms 6 April 2026 — context for "the cap is not your problem" section.
- Autumn Budget 2024 (gov.uk) — announcement of the reform package.

(5 citations, in target 4-7 range. Did not cite IHTM25260 — URL 404'd at verification. Did not cite Brander v HMRC — deferred to SA-Pawson companion page per "shorter and sharper" framing. Did not cite IHTM25277-IHTM25280 series — also deferred to SA-Pawson page since those are the SA boundary-case manual pages.)

### Internal links added (to our existing pages)
- `/blog/property-types-and-specialist-tax/serviced-accommodation-bpr-eligibility-pawson-test` × 2 (SA boundary case)
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` × 1 (general-rule pillar)
- `/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact` × 1 (cap mechanics, for those who qualify)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` × 1 (what works instead, planning lens)
- `/blog/landlord-tax-essentials/iht-lifetime-gifts-7-year-rule-property-taper` × 1 (PET mechanics)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` × 1 (IHT pillar)
- `/blog/incorporation-and-company-structures/fic-complete-guide-property-wealth-transfer` × 1 (FIC route)
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` × 1 (corporate-wrapper companion)

All 8 unique targets verified as existing markdown files in `Property/web/content/blog/`.

### Inline CTA placements
- 1 aside after the Pawson one-paragraph section ("Reviewing the IHT position on a BTL portfolio?") — pivots from "no BPR" to "here's what cheap planning looks like for your cohort"
- 1 aside after "The genuine exceptions" section ("Mixed-estate planning is meaningfully different") — captures the mixed-estate reader who came in expecting pure-BTL framing but actually has a trading-mix exposure

Total 2 asides (in the 1-3 range; deliberately fewer to keep the page tight per "shorter and sharper" framing).

### Build attempts
- Attempt 1: `next` not on PATH (worktree missing node_modules). Ran `npm install` (clean install from package-lock; ~150s).
- Attempt 2: `npm run build` — clean (exit 0). 377 blog static pages prerendered, C1 page generated at `.next/server/app/blog/landlord-tax-essentials/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line.html`.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13 Questions in 1 FAQPage, matches the 13 entries in `faqs:`
- Em-dashes in markdown: ✅ 0
- Tailwind classes in markdown: ✅ 0 `class="` attributes
- Meta title length: ✅ 46 chars (≤62)
- Meta description length: ✅ 150 chars (≤158)
- Internal links resolve: ✅ all 8 unique `/blog/...` targets verified as existing markdown files
- monitored_pages row inserted: ✅ id 155, monitor_until 2026-08-21
- Body word count: 2,818 (at floor of 2,800-3,500 non-pillar target; intentional per "shorter and sharper" framing differentiator)

### Flags raised to wave4_site_wide_flags.md
- F-1 (INTERNAL_LINK): the Wave 2 BPR-rental general-rule pillar (`business-property-relief-rental-property-iht.md`) has a "Related reading" block that links to SA-Pawson + IHT decision-framework + APR mixed-estate pages; C1 should be added to that block as the new pure-BTL negative-case companion. Wave-close back-patch (not blocking C1).

### 2-3 sentence summary

C1 ships the anchor negative-case page for the 90% pure-BTL cohort: section 105(3) IHTA 1984 plus *Pawson v HMRC* [2013] UKUT 050 (TCC) close the BPR door, and the page is deliberately shorter and sharper (2,818 body words) than the Wave 2 SA-Pawson case-law deep-dive it forward-links to. It debunks the three planning instincts that look like they should unlock BPR (limited company wrapper, scale, intensive landlord effort), confirms that the 6 April 2026 £1m cap is not the pure-BTL cohort's problem, and forward-links to the planning-lens IHT decision framework + lifetime gifting + FIC value-freeze + life-cover-in-trust routes that do work for investment-side landlord estates.

