# Wave 2 brief: dta-tie-breaker-test-dual-residence-property-owners

**Site:** property
**Bucket:** Double Taxation Agreements (DTAs)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/dta-tie-breaker-test-dual-residence-property-owners.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/dta-tie-breaker-test-dual-residence-property-owners

---

## Manager pre-decisions

- **Suggested slug:** `dta-tie-breaker-test-dual-residence-property-owners`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Double Taxation Agreements (DTAs)
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Generic Article 4 OECD tie-breaker mechanics. Four-stage cascade (permanent home, centre of vital interests, habitual abode, nationality), then mutual agreement as final fallback. Why it matters for property: source-state UK taxation is unchanged, but residence-state credit relief depends on which country wins the tie-breaker. Worked example with the SRT failed-on-both-sides scenario.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm154020 — HMRC INTM154020 on dual-resident individuals; the authoritative UK manual page for the Art 4 cascade (permanent home → centre of vital interests → habitual abode → nationality → MAP). Anchor citation for every step.
- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm154040 — HMRC INTM154040 on residence claims under DTAs; covers HS302 and the practical claim-making side of the tie-breaker.
- https://www.gov.uk/government/publications/dual-residents-hs302-self-assessment-helpsheet — HMRC HS302 (Dual residents); the practitioner-facing claim helpsheet, useful as a structural reference for what the page should equip the reader to do.
- https://www.oecd.org/tax/treaties/model-tax-convention-on-income-and-on-capital-condensed-version-20745419.htm — OECD Model Tax Convention 2017; the source of the cascade language UK treaties broadly follow, and the Commentary on Art 4 is the interpretive backstop.
- https://www.ukpropertyaccountants.co.uk/uk-italy-double-taxation-agreement-dual-residence-tie-breaker-rules/ — UK specialist accountant's tie-breaker walkthrough (in an Italian context); useful for the worked-example structure even though this brief is the generic / pillar version.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because the very low scores (0.11-0.15) returned unrelated SDLT / ATED / accountant-services pages that share none of the tie-breaker / dual-residence concept.*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: the NRL pillar; for the property reader, the tie-breaker matters because once it resolves to non-UK residence, the property income lands in NRL — link to this page as the operational downstream.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-landlord obligations pillar; the upstream framing question ("what do I owe HMRC?") often involves an implicit tie-breaker resolution — link as natural neighbour.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `tax-treaties-property-investors-treaty-framework-guide` (Non-Resident Landlord Tax) — [reasoning: the Wave 2 DTA pillar (sibling on same wave); this generic tie-breaker page is the deeper Art 4-specific section of that framework page — link up and out to it for the wider treaty context.]
  - title: Tax Treaties for Property Investors: Treaty Framework Guide
- `uk-italy-dta-tie-breaker-property-residence-disputes` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: bilateral Italy-specific version of this same topic (sibling brief on this wave). CANNIBAL risk: this brief is the generic pillar, that brief is the bilateral worked example. Coordinate so this page covers the generic cascade + UK SRT-resolved persona, and the Italy page covers Italian Agenzia delle Entrate-specific practice. Both should link to each other.]
  - title: UK-Italy DTA Tie-Breaker: Property Residence Disputes (Wave 2 sibling brief)
- `srt-statutory-residence-test-landlord-decision-tree` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: the SRT page (sibling brief on this wave); the tie-breaker only fires after both states' domestic rules say "resident", so SRT is the upstream input. Link out for the UK-side residence test.]
  - title: SRT Statutory Residence Test: Landlord Decision Tree (Wave 2 sibling brief)
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates page; an Art 4 tie-breaker that resolves a UK property owner as non-UK resident lands their disposals in NRCGT — link out for the operational consequence on a sale.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: pure-UK SDLT 2% surcharge; lateral neighbour worth one nod because the 2% SDLT surcharge has its own (different, statutory) residence test that does NOT use treaty tie-breaker — useful clarification, link out so the brief doesn't drift into SDLT mechanics.]
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

- [OECD Model Tax Convention 2017](https://www.oecd.org/tax/treaties/model-tax-convention-on-income-and-on-capital-condensed-version-20745419.htm)
- [HMRC INTM (International Manual)](https://www.gov.uk/hmrc-internal-manuals/international-manual)
- [HMRC INTM150000 (Double Taxation Treaties)](https://www.gov.uk/hmrc-internal-manuals/international-manual/intm150000)
- [UK tax treaties hub (gov.uk)](https://www.gov.uk/government/collections/tax-treaties)
- [TIOPA 2010 (Taxation International and Other Provisions Act)](https://www.legislation.gov.uk/ukpga/2010/8/contents)
- [HMRC HS304 (Non-residents — relief under DTAs)](https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet)
- [HMRC Self Assessment Foreign pages (SA106)](https://www.gov.uk/government/publications/self-assessment-foreign-sa106)

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
- **Final slug:** dta-tie-breaker-test-dual-residence-property-owners (unchanged)
- **Final category:** non-resident-landlord-tax (unchanged)
- **H1 chosen:** How the Article 4 Tie-Breaker Cascade Resolves Dual Residence for UK Property Owners
- **Meta title chosen:** DTA Article 4 Tie-Breaker: Dual-Resident Property Owners (56 chars)
- **Why these vs other options:** H1 names the mechanism (Article 4 cascade), the outcome (resolves dual residence), and the audience (UK property owners) in declarative form. Meta title fronts "DTA Article 4" for query alignment and keeps the audience qualifier. Both avoid the generic "Tie-Breaker Test Guide" framing that would collapse into B7's title space.

### Competitor URLs fetched
- HMRC INTM154020 — authoritative UK manual on the Article 4 cascade. Anchor citation for every step.
- HMRC INTM154040 — claim-handling mechanics; HS304/HS302 distinction; proportioning rules where UK and foreign tax years diverge.
- HMRC HS302 helpsheet — confirms HS302 current to 2026 tax year (last updated 6 April 2026). Structural reference for SA109 dual-resident reporting.
- OECD Model Tax Convention 2017 Commentary — relied on via paragraph references (13 for permanent home, 15 for vital interests, 17-19 for habitual abode) cited inline.
- ukpropertyaccountants.co.uk Italy tie-breaker page — fetched but returned near-empty (JS-rendered). Discarded; relied on HMRC INTM + OECD instead.

### Existing-page review (from "Closest existing pages")
- `tax-treaties-property-investors-treaty-framework-guide` (B1) — framework pillar covering all OECD articles; B8 is the deeper Article 4 sub-pillar; linked up.
- `uk-italy-dta-tie-breaker-property-residence-disputes` (B7) — UK-Italy applied, Step 2 resolution. B8 is the generic counterpart walking all 5 steps with Step 3 Daniel/UK-Portugal example. Cross-linked bidirectionally.
- `srt-statutory-residence-test-landlord-decision-tree` (C2, on property-wave2-c) — upstream domestic input; link resolves post-merge.
- `non-resident-landlord-scheme-uk-complete-guide` — operational downstream once cascade resolves to non-UK.
- `non-resident-cgt-uk-property-rates-reporting` — NRCGT downstream on disposals.
- `uk-property-income-expats-tax-obligations-explained` — descriptive expat pillar.

### Citations added (external authority)
- HMRC INTM154020 (International Manual, Dual residents)
- HMRC INTM154040 (International Manual, Individuals: residence claims under DTAs)
- HMRC HS302 (Dual residents Self Assessment helpsheet, 2026 version)
- OECD Model Tax Convention 2017 Commentary on Article 4 (paragraphs 13, 15, 17-19)
- FA 2013 Sch 45 (Statutory Residence Test)
- TCGA 1992 s.1A and Schedules 1A/1B/4AA (NRCGT)
- FA 1995 Sch 23 + SI 1995/2902 (Non-Resident Landlord scheme)
- TIOPA 2010 ss.18 and 130 (foreign tax credit)
- Article 25 OECD Model (Mutual Agreement Procedure) + MLI Article 16

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/uk-italy-dta-tie-breaker-property-residence-disputes` — sibling bilateral (B7); B8 is the generic pillar
- `/blog/non-resident-landlord-tax/tax-treaties-property-investors-treaty-framework-guide` — framework pillar (B1); B8 is the Article-4 sub-pillar
- `/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree` — SRT page (C2); upstream domestic input; link resolves post-merge from property-wave2-c
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL operational downstream
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — NRCGT downstream on disposals
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — descriptive expat pillar

### Inline CTA placements
- After "Step 1: permanent home available" — high-intent moment for advisers helping with the permanent-home analysis before SA109 filing; this is where most disputes are misanalysed.
- After "Worked example: Daniel UK-Portugal" — post-example moment with Step 3 resolution shown; high-intent for solo retirees needing help documenting their own multi-year pattern.

### Build attempts
- Attempt 1 — PASS. Next.js 15.5.18 compiled successfully in 15.3s. 359 static pages generated. 0 errors. Only pre-existing unrelated warnings (BlogListWithSearch unused vars, BlogPostRenderer img tag).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries in HTML, 13 in frontmatter)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 56 chars (≤62 ✓)
- Meta description length: 146 chars (≤158 ✓)
- Internal links resolve: 5 of 6 in this worktree (SRT C2 page on property-wave2-c branch, resolves post-merge). Flagged F-14.
- monitored_pages row inserted: yes
- Body word count: ~4,691 words. Higher than the 2,500-3,500 typical range but justified: B8 walks all 5 cascade steps with depth (B7 walked Step 2 in detail; B1 framework pillar shipped at 3,939). Generic Article 4 sub-pillar across all UK treaties is broader in scope than a single bilateral applied page.

### Flags raised to wave2_site_wide_flags.md
- F-14: bidirectional back-patch B8↔SRT (C2) — once property-wave2-c merges, verify B8's SRT link resolves and consider back-linking SRT to B8 as the treaty-residence downstream when SRT and a foreign domestic test both say resident.
- F-15: bidirectional back-patch B8↔B7 — B8 forward-links to B7 (UK-Italy applied as Step-2 example); B7's editorial note already references B8 as the generic counterpart but B7 body should also contain a forward link to B8 (currently relies on the framework-pillar route). Verify and back-patch post-merge.

### 2-3 sentence summary
B8 is the generic Article 4 cascade page — the deeper sub-pillar within the DTA bucket, walking all four cascade stages plus MAP fallback with a Daniel/UK-Portugal retired-landlord worked example that resolves at Step 3 (habitual abode) on regularity grounds. Differentiator vs B7 is structural: B7 is one bilateral applied to one persona with a Step 2 resolution; B8 walks the full mechanism generically with depth on each step. The page reinforces the house-position invariant: the cascade does not change UK source taxation under Articles 6/13, does not displace NRCGT, and does not displace NRL withholding — what changes is residence-state taxation and foreign tax credit allocation.

