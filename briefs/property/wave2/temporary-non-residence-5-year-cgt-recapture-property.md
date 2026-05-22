# Wave 2 brief: temporary-non-residence-5-year-cgt-recapture-property

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/temporary-non-residence-5-year-cgt-recapture-property.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/temporary-non-residence-5-year-cgt-recapture-property

---

## Manager pre-decisions

- **Suggested slug:** `temporary-non-residence-5-year-cgt-recapture-property`
- **Suggested category:** `capital-gains-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> TCGA 1992 s.10A applied to landlord-emigrants: the 5-year-or-less period of non-residence test (verified HMRC CG26540 wording), 4-of-7-years prior-residence pre-condition, deemed return-year accrual. What's caught (assets held at departure + disposed in non-residence period) and what isn't (assets acquired and disposed entirely in the non-residence period). Interaction with NRCGT — UK property gains caught by NRCGT regardless of s.10A.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://uklandlordtax.co.uk/tax-guide/are-you-leaving-the-uk-permanently/ — landlord-facing summary of the leaving-the-UK arc; useful for how the 5-year clock is framed for a non-specialist reader.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26500 — HMRC CG26500 contents page; the entry point to the s.10A manual chain.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26540 — HMRC CG26540 verifies the "5 years or less" wording (and the 4-of-7-years prior-residence condition); use this as the citation that pins the test.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg26580 — HMRC CG26580 covers s.10A application detail for individuals; useful for the deemed-return-year accrual mechanics.
- https://www.legislation.gov.uk/ukpga/1992/12/section/10A — TCGA 1992 s.10A itself; substituted by FA 2019, the statutory anchor for any worked example.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list retained where reasoning agreed.*

- `non-resident-cgt-selling-uk-property-overseas-guide` (Non-Resident Landlord Tax) — [reasoning: the NRCGT-on-sale page; the framing differentiator explicitly contrasts s.10A (caught only on return) with NRCGT (caught regardless), so this page is the operational sibling that must be linked out as the UK-property-disposal exception.]
  - title: Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates page; the s.10A page needs to reference NRCGT rates for the worked example showing that UK property disposals during non-residence don't escape via s.10A.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `cgt-inherited-rental-property-calculation-uk` (Capital Gains Tax) — [reasoning: adjacent CGT base-cost mechanics page; useful for the framing differentiator's "what's caught at departure vs acquired-in-non-residence" boundary because base-cost questions sit underneath both.]
  - title: How Is CGT Calculated on an Inherited Rental Property?
- `capital-gains-tax-selling-rental-property-uk` (Capital Gains Tax) — [reasoning: CGT-on-sale pillar; readers who arrive on the s.10A page often need the underlying CGT mechanics page once they realise the return-year deeming brings the gain into ordinary CGT scope.]
  - title: Capital Gains on Selling a Rental Property: 2025/26 UK Guide
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; s.10A is one of the four pillars of the leaving-the-UK story (SRT, split-year, s.10A, NRCGT) so this page must hang off the expat hub.]
  - title: UK Property Income for Expats: Tax Obligations Explained

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
- **Final slug:** unchanged (`temporary-non-residence-5-year-cgt-recapture-property`)
- **Final category:** unchanged (`capital-gains-tax`)
- **H1 chosen:** Temporary Non-Residence: The 5-Year CGT Recapture Rule for Property Investors
- **Meta title chosen:** Temporary Non-Residence: 5-Year CGT Recapture for Property (58 chars)
- **Why these vs other options:** H1 leads with the topical noun phrase and the 5-year rule, qualified for property investors. Meta title compresses to retain "5-Year CGT Recapture" + "Property" in the SERP window. Slug verbatim from brief.

### Competitor URLs fetched
- HMRC CG26540 — verified the "5 years or less" wording (per house positions §17.3, verified 2026-05-22).
- HMRC CG26500 contents page — entry chain to the s.10A manual.
- HMRC CG26580 — application detail for individuals + deemed-return-year accrual mechanics.
- legislation.gov.uk TCGA 1992 s.10A (substituted by FA 2019) — statutory anchor.
- uklandlordtax.co.uk leaving-the-UK page — landlord-facing summary; gap = no NRCGT-vs-s.10A delineation, no pre-rebasing portion treatment.

### Existing-page review (from "Closest existing pages")
- `non-resident-cgt-selling-uk-property-overseas-guide` — NRCGT-on-UK-property pillar; linked from the "interaction with NRCGT" section. This page is the s.10A layer that sits ON TOP of NRCGT for the pre-rebasing portion + non-UK assets, not a duplicate.
- `non-resident-cgt-uk-property-rates-reporting` — NRCGT rates pillar; linked from the interaction section. This page references NRCGT rates indirectly via the Tariq worked example.
- `cgt-inherited-rental-property-calculation-uk` — adjacent CGT base-cost mechanics; not directly linked (one step removed from s.10A specifically).
- `capital-gains-tax-selling-rental-property-uk` — CGT-on-sale pillar; linked from the SA reporting section as the underlying base-cost mechanic for the disposal computation.
- `uk-property-income-expats-tax-obligations-explained` — expat-obligations pillar; linked from the SA reporting section as the expat hub.
- `leaving-uk-landlord-12-month-pre-departure-checklist` (C1, same branch) — linked from the planning levers section as the operational sequencing companion.

### Citations added (external authority)
- TCGA 1992 section 10A (substituted by Finance Act 2019) — the rule itself.
- HMRC Capital Gains Manual CG26500 to CG26770 — the s.10A manual chain.
- HMRC CG26540 — "5 years or less" wording (verified 2026-05-22).
- TCGA 1992 section 1A + Schedules 1A / 1B / 4AA — the NRCGT regime (FA 2019 rewrite).
- Section 264 ITTOIA 2005 — UK source rule for rental income.
- Section 812 Income Tax Act 2007 — income tax parallel to s.10A.
- Sections 18 and 130 TIOPA 2010 — unilateral foreign tax credit relief.
- HMRC RDR3 — Statutory Residence Test guidance.
- FA 2013 Schedule 45 — SRT statutory anchor.

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — NRCGT rates pillar.
- `/blog/non-resident-landlord-tax/non-resident-cgt-selling-uk-property-overseas-guide` — NRCGT operational pillar.
- `/blog/non-resident-landlord-tax/leaving-uk-landlord-12-month-pre-departure-checklist` — pre-departure operational sequencing.
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — expat obligations hub.
- `/blog/capital-gains-tax/capital-gains-tax-selling-rental-property-uk` — CGT-on-sale base-cost mechanics.

### Inline CTA placements
- After section "UK land owned at departure, the pre-rebasing portion only" — high-intent right after the &pound;150k pre-rebasing-portion arithmetic showing how s.10A doubles the CGT bill on a long-held UK rental flat sold during non-residence.
- After section "Tariq: pre-2015 UK property holding, returns in year 3" — high-intent after the worked example showing the &pound;31,200 of additional CGT, the converted-prospect moment for landlord-emigrants in the s.10A window.

### Build attempts
- Attempt 1 — pass (clean Next.js 15 build, FAQ schema count 13 matching frontmatter, but one em-dash discovered in FAQ 8 post-build).
- Attempt 2 — pass after replacing the em-dash with a comma; rebuild clean, FAQ count still 13.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 == 13)
- Em-dashes in markdown: 0 (one in FAQ 8 found post-build, replaced with comma)
- Tailwind classes in markdown: 0
- Meta title length: 58 chars
- Meta description length: 151 chars
- Internal links resolve: yes (5 internal links, all to existing files in the worktree)
- monitored_pages row inserted: yes
- Body word count: approximately 3,150

### Flags raised to wave2_site_wide_flags.md
- none new this page

### 2-3 sentence summary
C4 ships as the focused s.10A landlord-emigrant treatment. Pins the test as "5 years or less" of non-residence plus the 4-of-7-prior-years pre-condition (per house positions §17.3, verified HMRC CG26540), distinguishes what s.10A actually catches (non-UK situs assets owned at departure + the pre-2015/pre-2019 rebasing portion of UK land gains) from what NRCGT catches anyway (post-rebasing UK land gains), and walks three contrast scenarios (Olivia, US ETFs + post-2015 UK flat, year-4 return; Tariq, pre-2015 UK flat, year-3 return; the Lawrences, 6-year non-residence escaping both layers). Distinct from C1 (timeline), C2 (SRT cascade), and C3 (split-year cases) by being a single-statute deep-dive on the recapture rule with the NRCGT interaction clarified.

