# Wave 2 brief: moving-to-australia-uk-rental-property-tax-pathway

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/moving-to-australia-uk-rental-property-tax-pathway.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/moving-to-australia-uk-rental-property-tax-pathway

---

## Manager pre-decisions

- **Suggested slug:** `moving-to-australia-uk-rental-property-tax-pathway`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Pathway for a UK landlord relocating to Australia with UK rental retained. UK-Australia DTA (2003) framework. Australian Income Tax Assessment Act 1997 inclusion of worldwide income for tax residents; ATO foreign income tax offset (FITO) for UK tax paid. Capital gains: ATO assessment plus UK NRCGT — credit relief. Worked timeline with permanent residency and tax residency under the ATO 'resides' test.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://uklandlordtax.co.uk/moving-to-australia-from-the-uk/ — UK specialist landlord-tax firm; the Australia-specific landlord pathway page that competes directly for this query.
- https://www.gov.uk/government/publications/australia-tax-treaties — gov.uk UK-Australia DTA hub; the 2003 Convention text is here, supporting the Art 4 tie-breaker and Art 6/13 (immovable property + capital gains) analysis.
- https://www.gov.uk/guidance/paying-tax-on-rent-to-landlords-abroad — HMRC NRL scheme guidance; the operational regime for the UK-side rent withholding once Australia-resident.
- https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet — HMRC HS304; the practical claim helpsheet for treaty relief, important because Australia-resident landlords can claim FITO for UK tax paid.
- https://www.gov.uk/tax-uk-income-live-abroad — gov.uk overview of UK income tax when living abroad; Personal Allowance entitlement is preserved for Commonwealth citizens and so applies for many Australia movers (UK or EU/EEA national status check).

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned IHT / portfolio / incorporation pages that share landlord vocabulary but not the leaving-the-UK-with-rental scenario.*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: NRL pillar; Australia-resident landlords with UK rent are NRL-regime subjects on day one, so the pillar must be the linked-out canonical for the scheme mechanics.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; the Australia page is the country-specific applied version of the obligations pillar, distinct because Australia DOES tax worldwide income (unlike UAE) so the credit-relief arithmetic actually runs both ways.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `nrl-approval-receive-rent-gross-hmrc-guide` (Non-Resident Landlord Tax) — [reasoning: NRL1 mechanic; Australia-movers benefit from gross approval (cashflow + ATO timing) so the operational form-application page is the natural follow-on.]
  - title: How to Apply for NRL Approval to Receive Rent Gross: Complete HMRC Guide
- `non-resident-cgt-selling-uk-property-overseas-guide` (Non-Resident Landlord Tax) — [reasoning: NRCGT operational page; Australia-resident landlords realising UK gains face NRCGT + ATO CGT with credit relief, so the UK-side mechanics page must be linked.]
  - title: Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026
- `leaving-uk-landlord-12-month-pre-departure-checklist` (Non-Resident Landlord Tax) — [reasoning: generic 12-month pre-departure checklist; Australia-pathway readers should action the SRT timing + P85 + NRL1 in the checklist before the Australia-specific overlay.]
  - title: Leaving the UK Landlord: 12-Month Pre-Departure Checklist
- `moving-to-dubai-uk-rental-property-tax-pathway` (Non-Resident Landlord Tax) — [reasoning: the sibling country-pathway page; the Australia page should explicitly contrast the symmetric DTA (Australia taxes worldwide so FITO credit applies) with the asymmetric UAE position (no UAE tax so no symmetric credit) as a comparison cue.]
  - title: Moving to Australia from the UK with UK Rental Property: Tax Pathway

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
- **Final slug:** unchanged (moving-to-australia-uk-rental-property-tax-pathway)
- **Final category:** Non-Resident Landlord Tax (unchanged)
- **H1 chosen:** Moving to Australia with a UK Rental Property: The Tax Pathway
- **Meta title chosen:** Moving to Australia with a UK Rental: Tax Pathway (49 chars)
- **Why these vs other options:** H1 mirrors the C6 Dubai sibling for set-coherence; meta title kept short for the SERP truncation budget while leading on the primary "moving to Australia" + "UK rental" query word order.

### Competitor URLs fetched
- https://uklandlordtax.co.uk/moving-to-australia-from-the-uk/ — outdated (2023, pre-non-dom-reform), thin, no FITO mechanics, no 50% CGT discount denial treatment; useful only to confirm the surface-level competitor framing.
- https://www.gov.uk/government/publications/australia-tax-treaties — confirms 2003 Convention in force, MLI modifications effective from 1 Jan 2019 (WHT) and 6 Apr 2020 (Income Tax + CGT); used to anchor the treaty section.
- https://www.gov.uk/guidance/paying-tax-on-rent-to-landlords-abroad — NRL operational mechanics (NRL4 letting agent reg, £100/week tenant threshold, NRLY by 5 July, NRL6 to landlord by 5 July, 30-day quarterly payment, 4-year record retention); confirmed the UK-side mechanics referenced in the page.
- https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet — HS304 helpsheet; confirms the practical claim mechanism for treaty relief, useful for setting expectations on the Australian FITO claim cycle.
- https://www.gov.uk/tax-uk-income-live-abroad — confirms personal allowance entitlement framework for UK / EEA nationals; used to justify the personal-allowance retention claim for British expats in Australia.

### Existing-page review (from "Closest existing pages")
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; linked out from operational sequencing section. Not duplicated.
- `uk-property-income-expats-tax-obligations-explained` — expats obligations pillar; linked out from the "Sequencing" wrap-up paragraph. The C7 page is the Australia-specific applied version.
- `nrl-approval-receive-rent-gross-hmrc-guide` — NRL1 mechanic; not directly linked in body (kept tight to 6 internal links to avoid linking inflation); the operational sequence references NRL1 directly.
- `non-resident-cgt-selling-uk-property-overseas-guide` — NRCGT operational page; the C7 page references the NRCGT mechanics inline without linking out (the 60-day clock detail is brief and tactical).
- `leaving-uk-landlord-12-month-pre-departure-checklist` — C1 pillar; linked out from pre-departure phase paragraph.
- `moving-to-dubai-uk-rental-property-tax-pathway` — sibling pathway page; linked out from the closing "Sequencing" paragraph to enable asymmetric vs symmetric DTA contrast.

### Citations added (external authority)
- 2003 UK-Australia Double Tax Convention (in force 17 Dec 2003; effective UK 6 Apr 2004 IT/CGT; MLI from 6 Apr 2020 IT/CGT)
- TCGA 1992 section 1A (NRCGT charging provision) + section 10A (temporary non-residence 5-year recapture)
- Section 264 ITTOIA 2005 (UK property income source rule)
- Section 24 Finance (No.2) Act 2015 (finance cost restriction)
- Income Tax Assessment Act 1997 (Australia): Division 770 (FITO), Section 768-910 (temporary resident concession), Section 115-25 and 115-105 (50% CGT discount and apportionment for non-resident periods), Section 104-10 (CGT event A1), Section 104-160 (CGT event I1)
- Income Tax Assessment Act 1936 (Australia) section 6(1) (residence tests)
- Tax Laws Amendment (2012 Measures No. 4) Act 2013, Schedule 7 (50% CGT discount denial for non-resident periods from 8 May 2012)
- FA 2013 Schedule 45 (SRT and split-year)
- SI 1995/2902 (NRL scheme regulations)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree` — UK residence test cascade (C2)
- `/blog/non-resident-landlord-tax/split-year-treatment-cases-1-8-landlord-departure-arrival` — Case 1 split-year departure mechanics (C3)
- `/blog/capital-gains-tax/temporary-non-residence-5-year-cgt-recapture-property` — s.10A 5-year rule (C4)
- `/blog/non-resident-landlord-tax/leaving-uk-landlord-12-month-pre-departure-checklist` — C1 pillar checklist
- `/blog/non-resident-landlord-tax/moving-to-dubai-uk-rental-property-tax-pathway` — C6 sibling pathway, for asymmetric-treaty contrast
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — closing pillar pointer

### Inline CTA placements
- After "The four ATO residency tests" — high-intent moment (visa-status / temporary resident concession is a binary expensive decision)
- After "CGT: UK NRCGT, Australian CGT, and the 50% discount denial" — high-intent moment (discount apportionment needs modelling)

### Build attempts
- Attempt 1 — fail (build clean but internal link to s.10A page had wrong category slug: used /blog/non-resident-landlord-tax/temporary-non-residence-5-year-cgt-recapture-property; correct is /blog/capital-gains-tax/temporary-non-residence-5-year-cgt-recapture-property)
- Attempt 2 — pass

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (14 Question entries match 14 frontmatter FAQs)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 49 chars
- Meta description length: 146 chars
- Internal links resolve: yes (6 of 6)
- monitored_pages row inserted: yes
- Body word count: ~3,490

### Flags raised to wave2_site_wide_flags.md
- F-16: C7 ↔ C6 bidirectional sibling-link confirmed (C7 links to C6 in closing; C6 already links to C7-shaped pages via wider expats pillar but no specific C7 backlink). Suggest post-merge edit on C6 to add a "for the symmetric Australia case see [Australia pathway]" sibling pointer. Low priority.

### 2-3 sentence summary
C7 anchors on the symmetric UK-Australia DTA as the structural wedge against C6's asymmetric Dubai treaty. FITO mechanics, the temporary resident concession (s.768-910 ITAA 1997), and the 50% CGT discount denial trap under TLA (2012 Measures No. 4) Act 2013 are the three distinct mechanics that carry the page; Helen / six-year Sydney secondment worked example carries the figures through pre-departure, concession period, post-concession permanent visa transition, and post-return CGT timing.

