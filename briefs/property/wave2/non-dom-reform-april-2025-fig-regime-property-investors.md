# Wave 2 brief: non-dom-reform-april-2025-fig-regime-property-investors

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/non-dom-reform-april-2025-fig-regime-property-investors.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/non-dom-reform-april-2025-fig-regime-property-investors

---

## Manager pre-decisions

- **Suggested slug:** `non-dom-reform-april-2025-fig-regime-property-investors`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> The April 2025 abolition of the non-domiciled regime and the 4-year Foreign Income and Gains (FIG) regime that replaces it for new UK arrivals. Eligibility: not UK-resident in any of the preceding 10 tax years. The 12% Temporary Repatriation Facility (TRF) for 2025/26 and 2026/27 to bring pre-April-2025 foreign income onshore. CGT rebasing election to 5 April 2017 for pre-existing remittance-basis users. Implications for property: foreign rental on arising basis from year 5.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.landlordstax.co.uk/reform-of-the-non-dom-regime/ — UK specialist landlord-tax firm; explicitly framed for the non-dom-with-property cohort, useful for the property-investor angle on the reform.
- https://www.ukpropertyaccountants.co.uk/remittance-basis-of-taxation-in-the-uk/ — competitor's remittance-basis explainer; useful baseline for how transition from remittance-basis users is being handled.
- https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals — gov.uk policy paper announcing the end of domicile-based taxation from 6 April 2025; treat as the primary authority for the reform timeline.
- https://www.gov.uk/government/publications/changes-to-the-taxation-of-non-uk-domiciled-individuals — gov.uk follow-on policy paper with the operative changes effective 6 April 2025; this is the FIG-regime, TRF and rebasing source.
- https://www.gov.uk/government/publications/spring-budget-2024-non-uk-domiciled-individuals-policy-summary — Spring Budget 2024 policy summary; sets out the 4-year FIG window, the 12% TRF for 2025/26 and 2026/27, and the CGT rebasing election to 5 April 2017.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned AIA / VAT / accountant pages that share only the "property investor" vocabulary.*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: NRL pillar; the FIG regime applies to a new UK arrival who may also become an inbound landlord, so the FIG page must clarify the NRL-vs-FIG boundary (FIG is for foreign income only; UK rental income is UK source so always taxed arising regardless of FIG).]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; inbound non-doms with foreign property need to understand the source-by-source treatment, with FIG covering foreign rentals but never UK rentals.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: IHT pillar for landlords; non-dom reform changes IHT from domicile-based to residence-based (10-year long-term resident test), so this page is the IHT-side neighbour for the FIG cohort.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT page; the 5 April 2017 CGT rebasing election for ex-remittance-basis users is the FIG transition mechanic most aligned to UK property disposals, so this page is the operational neighbour.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `returning-to-uk-after-non-residence-property-portfolio` (Non-Resident Landlord Tax) — [reasoning: the re-arrival page; the 4-year FIG window applies to returners too (anyone with 10+ years of non-UK residence qualifies), so the FIG page and the return page are tightly coupled.]
  - title: Returning to the UK After a Period of Non-Residence with a Property Portfolio

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
- **Final slug:** unchanged (non-dom-reform-april-2025-fig-regime-property-investors)
- **Final category:** Non-Resident Landlord Tax (unchanged; sits alongside C6/C7 pathway pages)
- **H1 chosen:** Non-Dom Reform April 2025: The FIG Regime for Property Investors
- **Meta title chosen:** Non-Dom Reform April 2025: FIG Regime for Investors (51 chars)
- **Why these vs other options:** Meta title leads on "Non-Dom Reform April 2025" (primary date-anchored query) plus FIG (instrument shorthand). H1 mirrors for set-coherence and includes "Property Investors" qualifier.

### Competitor URLs fetched
- https://www.landlordstax.co.uk/reform-of-the-non-dom-regime/ — competitor specialist landlord-tax firm; reasonable on the policy framing but materially outdated on the TRF: claims "three years from 5th April 2025" without distinguishing rates (12%/12%/15%). Misses the FIG 4-year window with 10-year lookback specificity, the 5 April 2017 CGT rebasing, and the property-investor scope split (FIG covers foreign property income, never UK).
- https://www.gov.uk/government/publications/changes-to-the-taxation-of-non-uk-domiciled-individuals — Spring Budget 2024 technical note; primary source for the original two-year TRF design (12% rate) and the FIG 4-year/10-year mechanics. Used as primary authority for the FIG eligibility wording.
- https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals — Autumn Budget 2024 (30 October 2024) policy paper; primary source for the TRF extension to a third year at 15% and the residence-based IHT transition.

### Existing-page review (from "Closest existing pages")
- `non-resident-landlord-scheme-uk-complete-guide` (NRL pillar) — covers landlord-side NRL mechanics; not directly competing. C8 references the UK-source distinction (UK rentals always outside FIG, NRL applies if owner becomes non-resident later) but does not duplicate NRL mechanics.
- `uk-property-income-expats-tax-obligations-explained` (expats obligations pillar) — descriptive companion; cleanly different angle (C8 is regime-change page on the April 2025 reform, not a generic obligations explainer). Not directly linked from C8 body to avoid linking inflation; the relationship is descriptive only.
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials IHT pillar) — the IHT side overlaps tangentially via the residence-based IHT transition; descriptive reference only in C8 body, no link (the more aligned page is Session A's A6 IHT residence test page on the A branch).
- `non-resident-cgt-uk-property-rates-reporting` (NRCGT operational) — NRCGT mechanics are alongside but distinct (NRCGT for UK property non-resident disposal, FIG/rebasing for foreign-situs assets). Distinct mechanics, no linking needed.
- `returning-to-uk-after-non-residence-property-portfolio` — C9 on this Session C plan, not yet written. C8 originally linked to it but removed (not present on branch).

### Citations added (external authority)
- HMT/HMRC 'Reforming the taxation of non-UK domiciled individuals' policy paper (30 October 2024)
- HMT 'Changes to the taxation of non-UK domiciled individuals' technical note (6 March 2024, updated 23 April 2024)
- Spring Budget 2024 non-dom policy summary (FIG 4-year window, original 2-year TRF at 12%, 5 April 2017 CGT rebasing)
- Autumn Budget 2024 (30 October 2024) extension of the TRF to a third year at 15%
- Finance Act 2025 Schedule 9 (FIG regime mechanics), Schedule 10 (TRF), Schedule 11 (CGT rebasing election to 5 April 2017)
- Section 264 ITTOIA 2005 (UK property income source rule)
- TCGA 1992 sections 1A and 10A
- HMRC RDR3 (SRT guidance)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree` — for SRT mechanics in the arrival year (C2)
- `/blog/non-resident-landlord-tax/split-year-treatment-cases-1-8-landlord-departure-arrival` — for Case 4 / 6 / 8 arrival mechanics (C3)

Three internal links removed before commit because the target pages live on other branches and not visible in this worktree:
- `/blog/inheritance-tax-planning/iht-non-resident-uk-property-april-2025-residence-test` (A6, on property-wave2-a branch) — replaced with descriptive reference
- `/blog/non-resident-landlord-tax/uk-india-dta-property-rental-income-treatment` (B5, on property-wave2-b branch) — replaced with inline citation to the 1993 treaty articles
- `/blog/non-resident-landlord-tax/returning-to-uk-after-non-residence-property-portfolio` (C9, not yet written) — substituted with C2/C3 links

These three back-patches flagged for Wave-2 merge.

### Inline CTA placements
- After "What FIG covers for property investors (and what it does not)" — high-intent moment (FIG election cost-benefit modelling)
- After "The Temporary Repatriation Facility: 12% / 12% / 15%" — high-intent moment (existing non-dom with offshore accumulations facing the closing window)

### Build attempts
- Attempt 1 — pass (after pre-flight em-dash sweep caught 2 em-dashes in worked-example bullet points; corrected before npm build)

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries match 13 frontmatter FAQs)
- Em-dashes in markdown: 0 (2 caught in pre-flight, replaced with full stops / commas)
- Tailwind classes in markdown: 0
- Meta title length: 51 chars
- Meta description length: 149 chars
- Internal links resolve: yes (2 of 2; 3 cross-branch links removed before commit)
- monitored_pages row inserted: yes
- Body word count: ~3,094

### Flags raised to wave2_site_wide_flags.md
- F-19: House position §17.6 lists only 2 years of TRF at 12%; Autumn Budget 2024 extended to 3 years (12%/12%/15%). Recommend §17.6 refinement to add the 15% third year.
- F-20: Three cross-branch internal-link back-patches required at Wave-2 merge: C8 → A6 (IHT residence test), C8 → B5 (UK-India DTA), C8 → C9 (returning to UK, sequential).

### 2-3 sentence summary
C8 covers the April 2025 non-dom abolition from the property-investor angle. Structural wedge against generic non-dom reform explainers is the UK-source vs foreign-source split: FIG covers foreign rental income but never UK property rental; the TRF covers pre-April-2025 accumulated foreign income/gains at 12%/12%/15% across three years; the 5 April 2017 CGT rebasing applies only to foreign-situs assets, never UK property. Anika / Mumbai-born surgeon / NHS Manchester arrival from September 2026 worked example shows the FIG election as marginal at best for modest foreign portfolios because the personal-allowance surrender quickly outweighs the foreign-income shield.

