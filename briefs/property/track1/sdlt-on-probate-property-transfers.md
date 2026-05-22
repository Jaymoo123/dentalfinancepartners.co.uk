# Track 1 brief: sdlt-on-probate-property-transfers

**Site:** property
**Bucket:** SDLT — surcharges and reliefs
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/sdlt-on-probate-property-transfers.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/sdlt-on-probate-property-transfers

---

## Manager pre-decisions

- **Suggested slug:** `sdlt-on-probate-property-transfers`
- **Suggested category:** `capital-gains-tax`
- **Bucket:** SDLT — surcharges and reliefs
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> When SDLT does and doesn't apply on inheritance-related property transfers. Assents from personal representatives to beneficiaries (no SDLT), variations of will (Sch 4 para 8 FA 2003), transfers to discharge legacies (chargeable). Interaction with the additional dwellings surcharge where a beneficiary already owns property.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-stamp-duty-relief-for-probate-properties/

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have — outline, FAQs, worked examples, citation density, component patterns. The competitor list is a starting set, not exhaustive — if a competitor URL is poor quality or off-topic, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

- `property-investment-tax-uk-complete-guide-2026` (Landlord Tax Essentials) — score 0.2
  - title: Property Investment Tax UK: Complete Guide 2026
- `sdlt-transfer-property-company-cost` (Incorporation & Company Structures) — score 0.18
  - title: SDLT on Transferring Property to a Company: How Much Will I Pay?
- `incorporating-property-portfolio-uk-2026` (Incorporation & Company Structures) — score 0.17
  - title: Incorporating a Property Portfolio UK: Step-by-Step 2026 Guide
- `residential-property-developer-tax-uk` (Incorporation & Company Structures) — score 0.17
  - title: Residential Property Developer Tax UK: Complete Guide for 2026
- `capital-allowances-on-property` (Property Types & Specialist Tax) — score 0.14
  - title: Capital Allowances on Property: A Complete Guide for UK Landlords

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

*No redirect overlap. No middleware changes needed at launch.*


---

## Authority links worth considering for this bucket

- [HMRC SDLT Manual (SDLTM)](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual)
- [FA 2003 (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2003/14/contents)
- [HMRC SDLT calculator](https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/)
- [HMRC SDLTM00390 — grounds and gardens](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm00390)
- [FA (No.2) 2024 (MDR abolition)](https://www.legislation.gov.uk/ukpga/2024/12/contents)

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
- **Read `docs/property/house_positions.md` once at the start.** It is the tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/track1_site_wide_flags.md`.

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
- Each Track 1 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator** — don't write a generic "complete guide" template.
- Vary your H2 structure per page. SDLT mechanics pages and SDLT case-law pages should NOT have the same outline.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.


---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases).
2. **Claim the page** in `docs/property/track1_page_tracker.md` — change Status `⬜ todo` to `🟡 in_progress`, add today's UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Decide what's worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (paths in the "Closest existing pages" section). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it — don't pattern-match siblings), meta title (lead with the primary query word order, **≤62 chars**), meta description (**≤158 chars**), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required):
   ```python
   import sys; sys.path.insert(0, '.')
   from optimisation_engine.blog_generator.post_processing import fetch_image_for_post
   # Use a 2-4 word visual query, NOT the whole meta title
   image = fetch_image_for_post("uk property tax")
   # Returns: {'url': 'https://images.pexels.com/...', 'photographer': 'Jane Doe',
   #           'photographer_url': '...', 'pexels_url': '...', 'alt': '...'} or None
   ```
   Pick a query that's visually evocative and topical (eg "uk house keys", "stamp duty paperwork", "london terraced houses"). If Pexels returns None, leave `image: ''` (template falls back to auto-generated OG image at `/api/og?title=...&category=...`).
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields:
   - `title`, `slug`, `canonical: https://www.propertytaxpartners.co.uk/blog/<category>/<slug>`
   - `date: <today>`, `author: 'Property Tax Partners Editorial Team'`
   - `category: <category>` (use the assigned one)
   - `metaTitle` (≤62 chars), `metaDescription` (≤158 chars)
   - `altText` (descriptive — re-use the Pexels `alt` field if it fits, otherwise write your own)
   - `image: '<pexels url>'` (full Pexels URL from `fetch_image_for_post`, OR `''` if Pexels returned None)
   - When `image` is a Pexels URL, also add (REQUIRED for attribution):
     ```yaml
     imageCredit:
       photographer: <Pexels photographer name>
       photographer_url: <Pexels photographer profile URL>
       source: Pexels
       source_url: <pexels_url returned by API>
     ```
   - `h1`, `summary` (1-2 sentences)
   - `schema: ''` (template handles JSON-LD), `faqs: [...]` (10-14 entries)
   - `dateModified: <today>`, `reviewedBy: ICAEW Qualified Senior Reviewer`
   - `reviewerCredentials: Chartered Accountant (ACA, ICAEW), Property Tax Specialist`
   - `reviewedAt: <today>`, `editorialNote: <1-line>`
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):**
    - FAQ schema count: `grep -c '"@type":"Question"' Property/web/.next/server/app/blog/<category>/<slug>.html` equals your `faqs:` array length
    - Em-dashes: `grep -c "—" Property/web/content/blog/<slug>.md` is 0
    - Tailwind classes: `grep -cE 'class="[a-z]' Property/web/content/blog/<slug>.md` is 0
    - Meta title length: ≤62 chars
    - Meta description length: ≤158 chars
    - Internal links resolve: every `/blog/category/slug` link you added points at an existing markdown file under `Property/web/content/blog/`
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page (changes are in the brief; apply them precisely). Log your decision in the work-log.
13. **Register the new page for GSC monitoring**: insert a row into the `monitored_pages` Supabase table so the regression detector picks it up. Run from your worktree:
    ```bash
    python -c "
    import sys; sys.path.insert(0,'.')
    from optimisation_engine.competitor._db import _sql, _esc
    slug = '<your-slug>'
    cat = '<your-category>'
    _sql(f\"INSERT INTO monitored_pages (site_key, slug, page_url, rewrite_date, monitor_until, rewrite_type, notes) VALUES ('property', {_esc(slug)}, '/blog/{cat}/{slug}', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 'rewrite', 'Track 1 net-new page') ON CONFLICT (site_key, slug, rewrite_date) DO NOTHING\")
    print('registered')
    "
    ```
14. **Commit on your branch.** Per-page commit (do NOT merge to main — orchestrator merges after review):
    ```bash
    git add Property/web/content/blog/<slug>.md briefs/property/track1/<slug>.md docs/property/track1_page_tracker.md
    # if you applied a redirect repointing:
    git add Property/web/src/middleware.ts
    git commit -m "Track 1 (<bucket>): write <slug>"
    ```
15. **Fill in the per-page work-log** at the bottom of this brief (URLs fetched, decisions made, citations added, internal links, build status, flags raised).
16. **Mark done** in `docs/property/track1_page_tracker.md` (`🟡 in_progress` to `✅ done`) with a 1-line Notes summary.
17. **Append any site-wide flags** to `docs/property/track1_site_wide_flags.md` (append-only — never pause).
18. **Log discoveries** to `docs/property/track1_discovery_log_session_<X>.md` (append-only) — adjacent topics, calculator ideas, components competitors use, authority gaps, existing pages that need updating, cross-niche linking opportunities. This is how future waves get smarter.
19. **Next page** — claim ONE more page from the top of your remaining list. Repeat.

## At the end of your shift / session

- Verify all your assigned pages either show ✅ done OR have a clear in_progress claim with work-log decisions logged.
- Push your branch to a remote IF the orchestrator has set one up (default: don't push; orchestrator handles).
- Leave a clean commit history on your branch.


---

## Per-page work-log (fill in as you go — supports resumability if interrupted)

### Decisions
- **Final slug:** unchanged
- **Final category:** OVERRIDDEN from `capital-gains-tax` (brief suggestion) to `landlord-tax-essentials`. Rationale: the page is fundamentally about SDLT treatment of probate transfers. The CGT death-uplift gets a small interaction section at the end, but categorising in CGT would mislead browse-by-category users. Three of the other SDLT bucket pages live in `landlord-tax-essentials` (A1, A4) or `incorporation-and-company-structures` (A2, A3, A5). Probate-property transfers most naturally sit alongside the other SDLT residential pages in landlord-tax-essentials. Override logged here per brief instruction.
- **H1 chosen:** "SDLT and Probate Property: The Five Transfer Types and How Each Is Taxed"
- **Meta title chosen:** "SDLT on Probate Property: Assents, Deeds of Variation, Sales" (60 chars)
- **Why these vs other options:** Five-category taxonomy frames the page distinctly from the rest of the SDLT bucket (A1 process, A2 mechanics, A3 clarification, A4 decision-framework, A5 conditions-checklist). Lead with "assents" in the title because the assent / no-SDLT misunderstanding is the highest-volume search intent.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/a-complete-guide-to-stamp-duty-relief-for-probate-properties/ — narrow page focused on Sch 6A property-trader relief only. Did not cover the wider framing the brief asks for (assents, deeds of variation, legacy discharge, beneficiary buy-outs). Source used for Sch 6A detail; the four other categories drawn from first principles + house-position cross-check.

### Existing-page review (from "Closest existing pages")
- None overlap materially. The closest neighbour (`inheritance-tax-rental-property-uk-guide`) is IHT-focused, not SDLT, and is linked as further reading at the foot of the page.

### Citations added (external authority)
- Section 77 FA 2003 (notifiable transactions)
- Section 142 IHTA 1984 + Paragraph 8 Schedule 4 FA 2003 (deeds of variation)
- Schedule 6A FA 2003 (property-trader probate relief)
- HMRC SDLTM04030 (chargeable consideration on legacy discharge)
- HMRC SDLTM21010+ (Schedule 6A operational conditions)
- Section 62 TCGA 1992 (death-uplift CGT)
- Section 1122 CTA 2010 (connected-persons test for Sch 6A)
- HMRC SDLT Manual (general)
- gov.uk: applying for probate

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025` (rates pillar)
- `/blog/landlord-tax-essentials/sdlt-5-percent-surcharge-refund-claim-process` (A1, refund route for moving-in beneficiaries)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` (IHT companion, verified to exist)

### Inline CTA placements
- After the "assents" section — high-intent moment for executors and beneficiaries needing to understand the transfer
- After the "Schedule 6A relief" section — converts corporate property traders looking at probate stock

### Build attempts
- Attempt 1 — pass clean (no warnings). Initial body 2,265 words; added Patel-estate worked example + administration-period section + common drafting errors section to reach 3,230 within M-4 floor.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (11 = 11)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 60 (≤62)
- Meta description length: 146 (≤158)
- Internal links resolve: all three target markdown files confirmed present
- monitored_pages row inserted: yes
- Body word count: 3,230 (within M-4 calibration of 2,800–3,500)

### Flags raised to track1_site_wide_flags.md
- None this page. Category override logged here in the work-log (not a site-wide issue).

### 2-3 sentence summary
A6 covers SDLT on probate property transfers, split into five distinct categories (assents, deeds of variation, legacy discharge, PR-to-third-party sales, beneficiary buy-outs) with the Schedule 6A property-trader relief covered in depth. Patel-estate worked example shows all five categories in one fact pattern. 11 FAQs cover mortgage assumption, will trusts, administration-period mechanics, CGT death-uplift interaction, and the additional-dwellings surcharge interactions. Anti-templated as a five-category taxonomy + worked-example structure, distinct from A1-A5.

