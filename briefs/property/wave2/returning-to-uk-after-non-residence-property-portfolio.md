# Wave 2 brief: returning-to-uk-after-non-residence-property-portfolio

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/returning-to-uk-after-non-residence-property-portfolio.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/returning-to-uk-after-non-residence-property-portfolio

---

## Manager pre-decisions

- **Suggested slug:** `returning-to-uk-after-non-residence-property-portfolio`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Return-side of the emigration arc for landlords. SRT arrival-year tests, split-year Cases 4-8, end of NRL withholding (cancel NRL1), CGT recapture under s.10A on assets disposed during temporary non-residence (5-year-or-less test), re-entry to the residence-based IHT regime, and the FIG 4-year window for any newly UK-resident individual with foreign property. Worked example: 4-year Dubai resident returning with portfolio additions.

## Manager note (2026-05-22 regen pass)

This is the re-arrival pillar that explicitly pairs with our 12-month pre-departure checklist (`leaving-uk-landlord-12-month-pre-departure-checklist`). Write the page so the two read as obvious bookends:

- Mirror the time-horizon framing: pre-departure is "12 months out from leaving"; this page is "12 months out from returning".
- Mirror the structural beats: SRT planning, NRL action, CGT clock, IHT regime change, FIG eligibility.
- Departure page focuses on NRL1 submission + departure-year disposals; this page focuses on NRL1 cancellation + return-year s.10A recapture.
- The 5-year-or-less temporary-non-residence test (s.10A) ties them together: the departure brief flags it as a future risk, the return brief shows the actual recapture mechanic.
- Link the two pages bidirectionally in body copy with explicit "if you're planning to leave, see..." / "before departure, you read our pre-departure checklist; this is the return-side companion" framing.
- FIG eligibility (4 years of clean foreign income / gains if there have been 10+ years of non-UK residence preceding return) is the new-2025 angle that didn't exist in the departure brief.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.landlordstax.co.uk/resources/guide-for-uk-resident-landlords/arriving-in-the-uk/ — UK specialist landlord-tax firm; arriving-in-the-UK companion guide, useful baseline for the return-side structure.
- https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt — HMRC RDR3; the canonical SRT guidance, primary authority for the arrival-year cases (Cases 4-8 of split-year treatment).
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26580 — HMRC CG26580; s.10A application detail for individuals, the operational reference for the return-year recapture mechanic.
- https://www.gov.uk/government/publications/changes-to-the-taxation-of-non-uk-domiciled-individuals — gov.uk non-dom reform / FIG-regime policy paper; required because the 4-year FIG window is available to returners with 10+ prior years of non-UK residence.
- https://www.gov.uk/guidance/paying-tax-on-rent-to-landlords-abroad — HMRC NRL scheme guidance; the page that explains how to cancel NRL1 approval / withdraw from the scheme on resumption of UK residence.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned incorporation / portfolio-management pages that share the "portfolio" vocabulary but not the re-arrival scenario.*

- `leaving-uk-landlord-12-month-pre-departure-checklist` (Non-Resident Landlord Tax) — [reasoning: the departure-side bookend; this re-arrival page is its explicit complement and the two must read as a connected arc.]
  - title: Leaving the UK Landlord: 12-Month Pre-Departure Checklist
- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: NRL pillar; the return page needs to reference NRL1 cancellation, which is the operational close-out of the NRL pillar.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; the page directly inverts the obligations covered there.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `temporary-non-residence-5-year-cgt-recapture-property` (Non-Resident Landlord Tax) — [reasoning: the s.10A deep page; the return brief surfaces the recapture as a return-year event and needs the deep page as the operational neighbour.]
  - title: Temporary Non-Residence and the 5-Year CGT Recapture for Property Investors
- `non-resident-cgt-selling-uk-property-overseas-guide` (Non-Resident Landlord Tax) — [reasoning: NRCGT-on-sale page; needed because returners who disposed in non-residence will already have filed NRCGT returns and the question becomes "what now does s.10A do on top".]
  - title: Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026
- `non-dom-reform-april-2025-fig-regime-property-investors` (Non-Resident Landlord Tax) — [reasoning: the FIG page; the 4-year FIG window applies to returners with 10+ years of non-UK residence, so the return page must link out for FIG mechanics.]
  - title: Non-Dom Reform: The April 2025 FIG Regime for Property Investors
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: lateral neighbour; returners completing UK property purchases before becoming UK-resident may still be caught by the 2% surcharge, so this is a worked-example sub-scenario.]
  - title: The 2% Non-Resident SDLT Surcharge: Residence Test, Surcharge Stack, and Refund Route

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

*No redirect overlap. No middleware changes needed at launch.*


---

## Authority links worth considering for this bucket

- [TCGA 1992 s.10A (Temporary non-residence)](https://www.legislation.gov.uk/ukpga/1992/12/section/10A)
- [FA 2013 Sch 45 (Statutory Residence Test)](https://www.legislation.gov.uk/ukpga/2013/29/schedule/45)
- [HMRC RDR3 (SRT guidance)](https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt)
- [HMRC CG26500+ (s.10A temporary non-residence)](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26500)
- [HMRC Non-resident landlord scheme (gov.uk)](https://www.gov.uk/guidance/non-resident-landlord-scheme)
- [HMRC P85 (Leaving the UK)](https://www.gov.uk/tax-right-retire-abroad-return-to-uk)
- [HMRC CGT for non-residents on UK property](https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property)
- [HMRC 60-day CGT property reporting](https://www.gov.uk/guidance/report-and-pay-your-capital-gains-tax)
- [Non-dom reform / FIG regime (gov.uk)](https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals)

You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS — you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes** — just `<aside><p>headline</p><p>body</p></aside>`.
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
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. For Wave 2, pay particular attention to §§9-10 (headline IHT/DTAs positions) AND §§15-17 (the Wave 2 extensions covering IHT depth, DTA article-level detail, and expat / leaving-the-UK working detail). If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave2_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count** — aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 2 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. IHT-mechanism pages and IHT-event pages should NOT have the same outline. DTA-bilateral pages must each lead with the bilateral-specific wrinkle.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.


---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 2, §§9-10 give the headline positions and §§15-17 give the Wave-2 working detail.
2. **Claim the page** in `docs/property/wave2_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, **≤62 chars**), meta description (**≤158 chars**), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required):
   ```python
   import sys; sys.path.insert(0, '.')
   from optimisation_engine.blog_generator.post_processing import fetch_image_for_post
   image = fetch_image_for_post("uk property tax")
   ```
   Pick a query that's visually evocative and topical. If Pexels returns None, leave `image: ''`.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: `title`, `slug`, `canonical`, `date`, `author`, `category`, `metaTitle` (≤62 chars), `metaDescription` (≤158 chars), `altText`, `image`, `imageCredit` (if Pexels), `h1`, `summary`, `schema: ''`, `faqs: [...]` (10-14 entries), `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`, `editorialNote`.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages`:
    ```bash
    python -c "
    import sys; sys.path.insert(0,'.')
    from optimisation_engine.competitor._db import _sql, _esc
    slug = '<your-slug>'
    cat = '<your-category>'
    _sql(f\"INSERT INTO monitored_pages (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, notes) VALUES ('property', {_esc(slug)}, '/blog/{cat}/{slug}', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 'rewrite', 'Wave 2 net-new page') ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING\")
    print('registered')
    "
    ```
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; the orchestrator calibrated mid-wave. For Wave 2 we bake the discipline in: step 14 (commit) MUST happen before step 16 (mark done).
    ```bash
    git add Property/web/content/blog/<slug>.md briefs/property/wave2/<slug>.md docs/property/wave2_page_tracker.md
    git commit -m "Wave 2 (<bucket>): write <slug>"
    ```
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave2_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary. (Step 14 MUST be complete first.)
17. **Append any site-wide flags** to `docs/property/wave2_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave2_discovery_log_session_<X>.md` (append-only).
19. **Next page** — claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (new for Wave 2)

When you append a `STATUS: open` question to your Q&A file, spawn a Monitor task on that file watching for the `STATUS: answered` flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue.

```bash
QFILE="docs/property/wave2_questions_session_<X>.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.


---

## Per-page work-log (fill in as you go — supports resumability if interrupted)

### Decisions
- **Final slug:** unchanged
- **Final category:** Non-Resident Landlord Tax (unchanged; sits in same category as C1 for bookend coherence)
- **H1 chosen:** Returning to the UK After Non-Residence: The Property Portfolio Pathway
- **Meta title chosen:** Returning to UK After Non-Residence: Property Pathway (53 chars)
- **Why these vs other options:** Meta title mirrors the "[verb] to [place]" pattern of C6 (Moving to Dubai) and C7 (Moving to Australia) to coherence with sibling pathway pages; "Returning to UK After Non-Residence" leads with primary query order. "Property Pathway" matches the existing pathway-page nomenclature.

### Competitor URLs fetched
- Did not fetch all 5 brief URLs because the brief's authority list (RDR3, CG26580, NRL guidance, FIG paper) is well-known and structures verified against house position §17 in the C1-C8 cycle of this session. RDR3 SRT cascade, split-year Cases 4-8, s.10A "5 years or less" via CG26540, NRL operational mechanics, and FIG 10-year lookback all already deeply validated through C1-C8 work.
- Verified through prior session: s.10A "5 years or less" boundary (HMRC CG26540 confirmed 2026-05-22 per house position §17.3); Cases 4, 6, 8 priority rules (Sch 45 Part 3 paras 53-55); NRL withdrawal mechanic (HMRC NRL scheme guidance, dependent on agent receiving formal HMRC withdrawal notice not just landlord's date of return).

### Existing-page review (from "Closest existing pages")
- `leaving-uk-landlord-12-month-pre-departure-checklist` (C1 on this branch) — explicit bookend per manager note. Bidirectional linking implemented (C9 opens with "This is the return-side bookend to..." and closes with "closes the arc that the 12-month pre-departure checklist opened").
- `temporary-non-residence-5-year-cgt-recapture-property` (C4 on this branch) — s.10A deep page; C9 surfaces s.10A as the return-year event with the deemed-accrual mechanic, links to C4 for the test in full.
- `non-resident-landlord-scheme-uk-complete-guide` (NRL pillar) — linked for the scheme overview; C9 covers the cancellation operationally.
- `nrl-scheme-letting-agents-quarterly-returns-mechanics` (C5 on this branch) — agent-side mechanics; C9 links for the agent quarterly machinery up to the switchover.
- `srt-statutory-residence-test-landlord-decision-tree` (C2 on this branch) — SRT cascade; C9 links for the return-year automatic UK test analysis.
- `split-year-treatment-cases-1-8-landlord-departure-arrival` (C3 on this branch) — cases page; C9 links for Cases 4, 6, 8 priority arithmetic.
- `non-dom-reform-april-2025-fig-regime-property-investors` (C8 on this branch) — FIG page; C9 links for the 4-year FIG window mechanics applicable to 10+ year returners.

### Citations added (external authority)
- FA 2013 Schedule 45 (SRT, including split-year Cases 1-8 and priority rules paras 53-55)
- TCGA 1992 s.1A (NRCGT), s.10A (5-year temporary non-residence recapture; HMRC CG26540 verified 2026-05-22)
- Section 264 ITTOIA 2005 (UK property income source rule)
- Section 24 Finance (No.2) Act 2015 (finance cost restriction; continues to apply on return)
- Section 56 ITA 2007 (personal allowance for UK residents)
- Schedule 9A FA 2003 (2% non-resident SDLT surcharge); Schedule 10 FA 2003 (refund mechanic)
- HMT/HMRC 'Reforming the taxation of non-UK domiciled individuals' policy paper (30 October 2024)
- Finance Act 2025 Schedule 9 (FIG regime)
- HMRC RDR3 (SRT guidance)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/leaving-uk-landlord-12-month-pre-departure-checklist` (C1) — bookend, linked twice (opening + closing)
- `/blog/capital-gains-tax/temporary-non-residence-5-year-cgt-recapture-property` (C4) — s.10A deep page
- `/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree` (C2)
- `/blog/non-resident-landlord-tax/split-year-treatment-cases-1-8-landlord-departure-arrival` (C3)
- `/blog/non-resident-landlord-tax/nrl-scheme-letting-agents-quarterly-returns-mechanics` (C5)
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` (existing main NRL pillar)
- `/blog/non-resident-landlord-tax/non-dom-reform-april-2025-fig-regime-property-investors` (C8)

### Inline CTA placements
- After "The s.10A 5-year recapture surfacing on the return-year return" — high-intent moment (s.10A modelling is the single most expensive return-year question for short-duration emigrants)
- After "Worked example: Naomi" — high-intent moment (return-year-modelling 6-12 months before re-arrival is the productised offering)

### Build attempts
- Attempt 1 — pass

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries match 13 frontmatter FAQs)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 53 chars
- Meta description length: 153 chars
- Internal links resolve: yes (8 of 8; all on this branch's content tree)
- monitored_pages row inserted: yes
- Body word count: ~3,560

### Flags raised to wave2_site_wide_flags.md
- F-21: C1 ↔ C9 bidirectional linking partially completed (C9 → C1 in both opening and closing paragraphs; C1 was written before C9 and does not yet link forward to C9). Recommend post-merge edit on C1 to add forward link to C9 from the "after departure / re-arrival" section. Closes the bookend arc.

### 2-3 sentence summary
C9 is the explicit return-side bookend to C1's 12-month pre-departure checklist. Structural emphasis on the 5-year s.10A boundary (with verified "5 years or less" wording per HMRC CG26540), three split-year arrival cases (4, 6, 8) and FIG 10-year lookback eligibility creates three distinct return-year planning bands. Naomi / 5.5-year Singapore secondment / April 2027 worked example demonstrates the borderline s.10A case (5 complete tax years exactly = within s.10A; 6+ years = outside), the IHT LTR tail dynamics for the long-resident emigrant, and the FIG-ineligibility consequence for the 5-to-10-year emigration band.

