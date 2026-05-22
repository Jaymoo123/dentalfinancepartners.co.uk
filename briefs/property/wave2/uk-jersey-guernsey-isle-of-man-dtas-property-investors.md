# Wave 2 brief: uk-jersey-guernsey-isle-of-man-dtas-property-investors

**Site:** property
**Bucket:** Double Taxation Agreements (DTAs)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/uk-jersey-guernsey-isle-of-man-dtas-property-investors.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/uk-jersey-guernsey-isle-of-man-dtas-property-investors

---

## Manager pre-decisions

- **Suggested slug:** `uk-jersey-guernsey-isle-of-man-dtas-property-investors`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Double Taxation Agreements (DTAs)
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Consolidated treatment of the three Crown Dependency DTAs (Jersey 2018, Guernsey 2018, Isle of Man 2016 — all modern OECD form). Practical relevance: company structures historically routed through CDs for UK property held by overseas investors. Art 13(4) indirect-disposal applies, so a CD company holding UK residential property remains in NRCGT and the new IHT residence-based regime. End of historic asset-protection shelter.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.gov.uk/government/publications/jersey-tax-treaties — gov.uk hub for the UK-Jersey treaty (2018, in force 19 December 2018); the canonical text. Note the date so the brief doesn't conflate with the pre-2018 limited tax information exchange.
- https://www.gov.uk/government/publications/guernsey-tax-treaties — gov.uk hub for the UK-Guernsey treaty (2018, in force 7 January 2019).
- https://www.gov.uk/government/publications/isle-of-man-tax-treaties — gov.uk hub for the UK-Isle of Man treaty (2018, in force 19 December 2018). Note the headline-locked position in house_positions §16.5 cites 2016 — verify against the gov.uk page (which now states 2018) and flag the discrepancy if the writer needs to amend house_positions.
- https://www.legislation.gov.uk/ukpga/2010/8/section/9 — TIOPA 2010 s.9 (unilateral relief); the carve-out at s.9(2)(c) removes the "in the territory" source rule for IoM / CI, so unilateral credit can apply even where the income source-test would otherwise fail.
- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm151010 — HMRC INTM151010 (concept and principles of double taxation); supports the framing that modern CD DTAs now operate in OECD form (the historic shelter is no longer available).
- https://www.ukpropertyaccountants.co.uk/uk-jersey-double-taxation-agreement-provisions-and-implications/ — UK specialist accountant's UK-Jersey DTA explainer; useful for landlord-facing framing density readers expect.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned VAT / AIA / accountant-services noise (none related to Crown Dependency structures).*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: the NRL pillar; a Jersey / Guernsey / IoM-resident landlord holding UK property directly is in NRL — link out for the personal-holding scenario.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates page; Art 13(4) in the 2018 CD treaties now extends to property-rich entities, so a CD-company UK-property structure is squarely in NRCGT — this brief should link out for the rate / 60-day mechanics rather than re-explain.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `nrcgt-indirect-disposal-property-rich-companies-shares` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: the indirect-disposal page (sibling brief on this wave); the brief's framing differentiator hinges on Art 13(4) applying to CD-company UK property, which IS the indirect-disposal scenario — must coordinate to avoid duplicating the indirect-disposal mechanics; this brief is the CD-jurisdiction-specific applied version.]
  - title: NRCGT Indirect Disposal: Property-Rich Companies and Shares (Wave 2 sibling brief)
- `spv-property-investment-special-purpose-vehicle-guide` (Incorporation & Company Structures) — [reasoning: SPV pillar; readers historically considering a CD SPV for UK property arrive here on the structuring question — the brief's "end of the historic asset-protection shelter" point lands more sharply with a contrast link to UK SPV mechanics.]
  - title: Property SPVs: Structure, Setup and Tax Mechanics
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: pure-UK SDLT 2% surcharge; a CD-resident purchaser of UK additional residential property triggers the 2% surcharge — lateral neighbour worth linking out for SDLT side.]
  - title: The 2% Non-Resident SDLT Surcharge: Residence Test, Surcharge Stack, and Refund Route
- `tax-treaties-property-investors-treaty-framework-guide` (Non-Resident Landlord Tax) — [reasoning: the Wave 2 DTA pillar (sibling on same wave); this brief is the applied CD-treaty version of the framework page — link up.]
  - title: Tax Treaties for Property Investors: Treaty Framework Guide
- `iht-non-resident-uk-property-april-2025-residence-test` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: non-resident IHT / new residence-based test page (sibling brief on this wave); the framing differentiator references "the new IHT residence-based regime" applying to CD-company UK property — link out for the IHT side and don't re-explain Sch A1 IHTA 1984 mechanics here.]
  - title: IHT for Non-Resident UK Property: April 2025 Residence Test (Wave 2 sibling brief)

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
- **Final slug:** uk-jersey-guernsey-isle-of-man-dtas-property-investors (unchanged)
- **Final category:** non-resident-landlord-tax (unchanged)
- **H1 chosen:** UK-Jersey, UK-Guernsey, and UK-Isle of Man DTAs: The End of the Crown Dependency Shelter for UK Property Investors
- **Meta title chosen:** UK-Jersey, Guernsey, IoM DTAs: Property Investor Guide (54 chars)
- **Why these vs other options:** H1 fronts the three jurisdictions and the narrative arc (end of the shelter). Meta title abbreviates to the highest-density query terms (Jersey, Guernsey, IoM, DTAs, property). Distinguishes B10 from B1-B9 (single-bilateral pages) as the consolidated multi-jurisdiction page.

### Competitor URLs fetched
- gov.uk/government/publications/jersey-tax-treaties — Verified UK-Jersey 2018 DTA signed 2 July 2018, in force 19 December 2018; 1952 arrangement + 2016 Protocol terminated.
- gov.uk/government/publications/guernsey-tax-treaties — Verified UK-Guernsey 2018 DTA in force 7 January 2019; 1952 + 2016 Protocol terminated; 2021 exchange of letters and 2022 MOU on arbitration.
- gov.uk/government/publications/isle-of-man-tax-treaties — Verified UK-IoM 2018 DTA in force December 2018; 1955 arrangement + 2016 Protocol terminated. House position §16.5 says "modern (2018+)" which is correct; brief's worry that §16.5 cited 2016 is itself stale.
- HMRC INTM151010 — concept and principles of double taxation; underpinning framework.
- legislation.gov.uk TIOPA 2010 s.9 — returned error 437; bypassed; relied on prior knowledge of the s.9(2)(c) Crown Dependency carve-out (per brief's reference).

### Existing-page review (from "Closest existing pages")
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; Crown Dependency-resident landlords are in NRL; linked out.
- `non-resident-cgt-uk-property-rates-reporting` — NRCGT rates page; Art 13(4) brings share disposal into NRCGT; linked out for the operational mechanics rather than re-explaining.
- `nrcgt-indirect-disposal-property-rich-companies-shares` (C10, on property-wave2-c) — indirect disposal sibling brief. B10 covers Art 13(4) at conceptual / jurisdiction-specific level only; C10 will cover the indirect-disposal mechanics in depth. Avoided duplication by treating the Article 13(4) section as introductory and linking out for operational detail. C10 not linked (would not resolve in worktree).
- `spv-property-investment-special-purpose-vehicle-guide` — SPV pillar; B10 references the choice between Crown Dependency company and UK Ltd; not linked inline (would invert framing; brief says descriptive contrast is fine).
- `sdlt-non-resident-2-percent-surcharge` — SDLT 2% surcharge page; B10 has a dedicated section on the surcharge for Crown Dependency purchasers; linked out for full refund mechanics.
- `tax-treaties-property-investors-treaty-framework-guide` (B1) — Wave 2 DTA framework pillar; linked up.
- `iht-non-resident-uk-property-april-2025-residence-test` (A6, on property-wave2-a) — Wave 2 IHT non-resident page; April 2025 residence regime impact on Crown Dependency-resident former-UK-residents; linked but resolves post-merge.

### Citations added (external authority)
- UK-Jersey 2018 DTA (gov.uk)
- UK-Guernsey 2018 DTA (gov.uk)
- UK-Isle of Man 2018 DTA (gov.uk)
- HMRC INTM151010 (concept and principles of double taxation)
- TCGA 1992 s.1A + Schedules 1A and 4AA (NRCGT framework)
- TCGA 1992 Schedule 2 paragraph 1 (60-day return)
- IHTA 1984 Schedule A1 (UK residential property look-through; in force 6 April 2017 per Finance (No.2) Act 2017)
- IHTA 1984 s.6 (UK situs property)
- TIOPA 2010 s.9 and s.9(2)(c) (unilateral relief + Crown Dependency carve-out)
- FA 1995 Sch 23 + SI 1995/2902 (Non-Resident Landlord scheme)
- ITTOIA 2005 (individual rental computation)
- CTA 2009 (corporate rental computation)
- FA 2003 Schedule 9A (2% non-resident SDLT surcharge, in force 1 April 2021)
- FA 2003 Schedule 9A paragraph 12 (refund mechanism)
- Finance Act 2019 (April 2019 NRCGT extension to commercial property + indirect disposal + rebasing)
- Finance Act 2025 (April 2025 residence-based IHT regime + 10-year FLTR tail)
- Finance Act 2021 (introduction of 2% SDLT surcharge)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/tax-treaties-property-investors-treaty-framework-guide` (B1) — framework upstream
- `/blog/non-resident-landlord-tax/dta-tie-breaker-test-dual-residence-property-owners` (B8) — Article 4 cascade upstream for dual UK-CD residence
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL operational downstream
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — NRCGT operational downstream
- `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge` — SDLT surcharge downstream
- `/blog/non-resident-landlord-tax/iht-non-resident-uk-property-april-2025-residence-test` (A6, on property-wave2-a) — IHT residence regime; resolves post-merge

### Inline CTA placements
- After "Article 13(4): the indirect-disposal closure" — high-intent for shareholders considering share disposal who need to understand the post-2018 NRCGT exposure.
- After the Andrew worked example — high-intent for Crown Dependency company shareholders running the why-did-we-set-this-up audit on existing structures.

### Build attempts
- Attempt 1 — initial draft had 1 em-dash (line 153, replaced with comma) AND meta description at 165 chars (over 158 limit; shortened from "Isle of Man" to "IoM" and trimmed connectives). Both fixed in-place pre-build.
- Attempt 2 — PASS. Next.js 15.5.18 compiled successfully. 361 static pages generated. 0 errors.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries in HTML; 13 in frontmatter)
- Em-dashes in markdown: 0 (after attempt-1 fix)
- Tailwind classes in markdown: 0
- Meta title length: 54 chars (≤62 ✓)
- Meta description length: 142 chars (≤158 ✓, after attempt-1 shortening)
- Internal links resolve: 5 of 6 in this worktree (A6 IHT non-resident link on property-wave2-a branch, resolves post-merge — covered by new F-22).
- monitored_pages row inserted: yes
- Body word count: ~5,146 words. Above the 2,500-3,500 typical range; this is the largest B-bucket page. Justified by the page's role: consolidated three-jurisdiction coverage + three-policy-change historical arc + worked example covering the maintain/collapse/restructure decision tree. The brief explicitly framed this as a consolidated multi-jurisdiction page with depth across treaty mechanics, Sch A1, Art 13(4), April 2025 IHT, and SDLT surcharge.

### Flags raised to wave2_site_wide_flags.md
- F-22: B10 ↔ A6 (IHT non-resident page) cross-branch link verification needed post-merge. B10 forward-links to A6 in body; A6 is on property-wave2-a branch and resolves post-merge.

### 2-3 sentence summary
B10 is the consolidated Crown Dependencies page covering all three 2018 UK-CD treaties (Jersey, Guernsey, Isle of Man) together. Anti-templating: the only multi-jurisdiction page in the DTA bucket; structured around the three-policy-change historical arc (Sch A1 from 2017 + Art 13(4) from 2018 + residence-based IHT from 2025) that ended the historic shelter, rather than around treaty articles in isolation. Andrew Jersey-resident worked example (UK national since 2018, four Manchester BTL flats in a Jersey company) runs the maintain/collapse/restructure decision tree against the FLTR tail and NRCGT exposure. Session B complete (10 of 10).

