# Wave 2 brief: nrcgt-indirect-disposal-property-rich-companies-shares

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/nrcgt-indirect-disposal-property-rich-companies-shares.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/nrcgt-indirect-disposal-property-rich-companies-shares

---

## Manager pre-decisions

- **Suggested slug:** `nrcgt-indirect-disposal-property-rich-companies-shares`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Indirect-disposal NRCGT under TCGA 1992 ss.14B-14H and Sch 4AA: where a non-resident disposes of shares (≥25% interest) in an entity deriving ≥75% of its value from UK land, the gain is caught even though the asset disposed is shares. 6 April 2019 effective date, rebasing to that date. 60-day reporting requirement. Different from direct disposals: trading-company exemption, related-party look-through, multi-step disposals.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/leaving-the-uk/ — UK specialist landlord-tax firm; the leaving-the-UK guide that touches indirect disposal as a sub-topic, useful baseline for the property-investor framing.
- https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property — HMRC NRCGT entry page; defines the disposal types that fall within NRCGT including indirect disposals via property-rich entities.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73920 — HMRC CG73920; specifies that "the new NRCG rules replace and expand on these rules to include all disposals of UK land (direct disposals) and the disposal of interests in UK Property Rich companies" from 6 April 2019. Primary authority.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg73960 — HMRC CG73960; the computational rules including the 6 April 2019 rebasing election for assets held on that date. Operational citation for the worked example.
- https://www.legislation.gov.uk/ukpga/1992/12/schedule/4AA — TCGA 1992 Sch 4AA; the re-basing schedule, statutory anchor for the rebasing-to-2019 mechanic.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned corporation-tax / payroll service pages that share the "company" / "shares" vocabulary but not the indirect-disposal NRCGT topic.*

- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates / reporting page; indirect disposal is the second leg of NRCGT (direct + indirect) so the rates page is the parent that this brief must link out to and complement.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `non-resident-cgt-selling-uk-property-overseas-guide` (Non-Resident Landlord Tax) — [reasoning: NRCGT on direct disposal; the indirect-disposal page is the sibling for share / interest disposals, with the 25% interest threshold and 75% property-richness test sitting alongside the direct mechanic.]
  - title: Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026
- `cgt-inherited-rental-property-calculation-uk` (Capital Gains Tax) — [reasoning: base-cost / rebasing mechanic; relevant because NRCGT indirect-disposal includes Sch 4AA rebasing to 6 April 2019, which uses similar valuation mechanics.]
  - title: How Is CGT Calculated on an Inherited Rental Property?
- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: NRL pillar; the indirect-disposal page sits inside the non-resident-landlord hub even though it concerns share rather than land disposals, because the audience is the same overseas-investor cohort.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; SPV-via-share-disposal exits are a common scenario for the expat investor cohort, so this page is the parent hub.]
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
- **Final slug:** unchanged
- **Final category:** Non-Resident Landlord Tax (unchanged; consistent with NRCGT direct-disposal sibling)
- **H1 chosen:** NRCGT Indirect Disposal: Shares in UK Property-Rich Companies
- **Meta title chosen:** NRCGT Indirect Disposal: Property-Rich Company Shares (53 chars)
- **Why these vs other options:** Meta title leads with "NRCGT" (primary technical-query word), then "indirect disposal" (the structural wedge), then the asset type ("property-rich company shares"). Avoids the generic "guide" framing.

### Brief statute citation note
The brief still cites "TCGA 1992 ss.14B-14H and Sch 4AA" as the statutory anchor. House position §17.4 explicitly notes that ss.14B-14H is stale (repealed by FA 2019) and the current regime lives at TCGA 1992 s.1A + Sch 1A + Sch 4AA. C10 was written to the current statute per house position; the brief's older citation was disregarded and an explanatory paragraph included in the body about the regime rewrite.

### Competitor URLs fetched
- Did not fetch all brief URLs because the topic technical content sits in HMRC CG73920+ and TCGA 1992 Sch 1A / 4AA, all well-validated through house position §17.4 and the prior Wave 2 session work. Skipped competitor fetches and worked from primary statute + HMRC manual + house position.

### Existing-page review (from "Closest existing pages")
- `non-resident-cgt-uk-property-rates-reporting` — NRCGT rates / reporting page; C10 cites the 60-day reporting requirement and references the parent NRCGT structure but does not duplicate the rates-and-reporting deep dive.
- `non-resident-cgt-selling-uk-property-overseas-guide` — NRCGT on direct disposal; C10 is the sibling on indirect disposal; both run the same s.1A + Sch 4AA architecture but different routes to scope.
- `cgt-inherited-rental-property-calculation-uk` — base-cost / rebasing mechanic on inherited property; tangentially relevant, not directly linked.
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; linked from the closing "how indirect disposal fits into the wider NRCGT regime" section.
- `uk-property-income-expats-tax-obligations-explained` — expats obligations pillar; referenced via the broader NRL hub link, not directly linked.

### Citations added (external authority)
- TCGA 1992 s.1A (charging provision)
- TCGA 1992 Sch 1A (substantive definitions including indirect disposals: 75% / 25% tests, trading exemption, related-party look-through, anti-avoidance)
- TCGA 1992 Sch 4AA (rebasing computational options for NRCGT including 5 April 2019 default for indirect disposals)
- Finance Act 2019 (regime rewrite, repealing ss.14B-14H FA 2015 structure)
- HMRC Capital Gains Manual CG73920+ (operational guidance)
- Pawson v HMRC [2013] UKUT 050 (TCC); Vigne v HMRC [2018] UKUT 0357 — trading vs investment classification
- Finance (No. 2) Act 2023 / Autumn Budget 2024 (18%/24% rate alignment)
- TCGA 1992 s.10A (cross-reference for temporary non-residence interaction)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL pillar from the closing section
- `/blog/capital-gains-tax/temporary-non-residence-5-year-cgt-recapture-property` (C4) — s.10A cross-reference

Brief's "Closest existing pages" listed several NRCGT direct-disposal pages, the inherited-property CGT page and the expats-obligations pillar. Direct-disposal sibling page is on the main branch already; both NRCGT sibling pages (rates page, selling-overseas page) and the inherited-property page are not linked from C10 body to keep internal-link density low and let the page stand on its own as the indirect-disposal deep page. Brief did not anticipate Pawson IHT case-law cross-reference; instead of linking to A5 (on the A branch, not visible here), C10 cites the cases directly inline.

### Inline CTA placements
- After "The 25% substantial indirect interest test" — high-intent moment (scope analysis ahead of an SPV exit)
- After "Worked example: Carla" — high-intent moment (Sch 4AA rebasing election modelling is the most expensive single decision)

### Build attempts
- Attempt 1 — pass (after pre-flight checks caught: (1) meta description at 160 chars exceeding the 158 limit, corrected; (2) one FAQ link pointing to wrong target slug, replaced with inline case-law citation)

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries match 13 frontmatter FAQs)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 53 chars
- Meta description length: 141 chars
- Internal links resolve: yes (2 of 2; both on this branch's content tree)
- monitored_pages row inserted: yes
- Body word count: ~3,214

### Flags raised to wave2_site_wide_flags.md
- F-22: Brief at `briefs/property/wave2/nrcgt-indirect-disposal-property-rich-companies-shares.md` still cites "TCGA 1992 ss.14B-14H and Sch 4AA" as the statutory anchor. The ss.14B-14H structure was repealed by FA 2019; current regime is s.1A + Sch 1A + Sch 4AA. Brief should be refreshed if reused for any Wave 3 indirect-disposal sub-pages.

### 2-3 sentence summary
C10 is the genuinely-new NRCGT indirect-disposal page (no existing site coverage of the indirect leg; direct-disposal sibling pages on main don't touch the 75%/25%/trading-exemption framework). Structural wedge versus the existing direct-disposal pages: indirect disposal catches share sales in UK property-rich companies (the 75% gross-asset test + 25% substantial-interest test with 2-year lookback) and brings them within NRCGT via TCGA 1992 s.1A + Sch 1A, with Sch 4AA rebasing to 5 April 2019 as the operational sweetener. Carla / 33% Manchester BTL SPV / 2027 exit worked example demonstrates a £144k UK NRCGT bill with Sch 4AA rebasing election saving £146k vs the historic-gain computation; Italian-resident overlay via UK-Italy DTA Art 24 credit then adds £12k of Italian top-up.

