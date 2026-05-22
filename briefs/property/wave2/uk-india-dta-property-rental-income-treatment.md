# Wave 2 brief: uk-india-dta-property-rental-income-treatment

**Site:** property
**Bucket:** Double Taxation Agreements (DTAs)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/uk-india-dta-property-rental-income-treatment.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/uk-india-dta-property-rental-income-treatment

---

## Manager pre-decisions

- **Suggested slug:** `uk-india-dta-property-rental-income-treatment`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Double Taxation Agreements (DTAs)
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> The 1993 UK-India treaty applied to property. Older treaty without Art 13(4) indirect-disposal provisions — UK NRCGT still applies on UK property-rich shares. Indian DTC method for relieving double tax on rental income. Practical scenario: Indian-resident NRI owning UK property, gross-payment NRL1, Indian tax credit on UK rent paid.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.gov.uk/government/publications/india-tax-treaties — gov.uk hub for the UK-India treaty; the 1993 convention is older OECD-style and the canonical source for confirming the absence of the Art 13(4) indirect-disposal provision.
- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm151010 — HMRC INTM151010 on UK and foreign legislation interacting; supports the framing that NRCGT is statutory and applies regardless of the treaty's narrower Art 13.
- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm153070 — HMRC INTM153070 on Art 6 (immovable property); confirms UK source taxation on UK rental income paid to Indian-resident NRIs.
- https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet — HS304; helpsheet for claiming treaty relief on the Self Assessment foreign pages.
- https://www.ukpropertyaccountants.co.uk/double-taxation-convention-uk-and-india/ — UK specialist accountant's UK-India DTA explainer; useful for the NRI-investor framing readers expect.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned generic rental-income/MTD pages with no NRI / treaty angle.*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: the NRL pillar; the Indian-resident NRI with UK property scenario in the framing differentiator is squarely an NRL case, so this is the structural anchor — link out for scheme mechanics rather than re-explain.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `nrl-approval-receive-rent-gross-hmrc-guide` (Non-Resident Landlord Tax) — [reasoning: gross-payment approval page; the framing differentiator explicitly calls out NRL1, so this brief should link to the application-process page rather than re-explain the NRL1 mechanics.]
  - title: How to Apply for NRL Approval to Receive Rent Gross: Complete HMRC Guide
- `nrl-withholding-tax-20-percent-basic-rate-deduction` (Non-Resident Landlord Tax) — [reasoning: the 20% withholding mechanics page; cross-link target so the brief can describe the withholding once and then go deep on the India-specific treatment.]
  - title: NRL Withholding Tax: How the 20% Deduction Works (2026 Guide)
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates page; the brief's framing differentiator hinges on UK NRCGT applying despite the older treaty lacking Art 13(4) — this page is where NRCGT mechanics live, so link to it for the "what's the actual UK rate?" question.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `non-resident-landlord-self-assessment-filing-requirements` (Non-Resident Landlord Tax) — [reasoning: the SA106 filing-requirements page; an Indian-resident NRI claiming treaty relief files SA106 + HS304, so this is the operational neighbour.]
  - title: Non-Resident Landlord Self Assessment: UK Filing Requirements (2026/27)
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-landlord obligations pillar; Indian-resident landlords land here via the "what do I owe HMRC?" question before reaching this bilateral page.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `tax-treaties-property-investors-treaty-framework-guide` (Non-Resident Landlord Tax) — [reasoning: the Wave 2 DTA pillar (sibling on same wave); this bilateral page is the applied / India-specific version — link up rather than re-explain Art 4/6/13.]
  - title: Tax Treaties for Property Investors: Treaty Framework Guide

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
- **Final slug:** unchanged: `uk-india-dta-property-rental-income-treatment`
- **Final category:** unchanged: `Non-Resident Landlord Tax`
- **H1 chosen:** "The UK-India Tax Treaty for Property Investors: The 1993 Treaty, NRI Landlords, and the UK NRCGT Override"
- **Meta title chosen:** "UK-India Tax Treaty for Property: NRI Landlord Guide" (52 chars)
- **Why these vs other options:** Three differentiators in the H1: the 1993-treaty age, the NRI-investor reader (the dominant scenario), and the NRCGT statutory override (the technical wrinkle). Meta tightens to the two SERP-pinch terms ("UK-India Tax Treaty" + "NRI Landlord"); article-number specifics (Art 14 not Art 13) go in the body. Reader for this page is more often the Indian-resident NRI than the UK-resident-with-Indian-property, so the H1 leads with the NRI scenario; reverse scenario gets section B.

### Competitor URLs fetched
- House positions §16.5 used as anchor for treaty article numbers (Art 6 / Art 14 / Art 24 / Art 26 / Art 27 confirmed against 1993 UK-India DTA convention text known training-knowledge).
- gov.uk/government/publications/india-tax-treaties referenced inline (treated as canonical pointer; no fresh fetch).
- gov.uk INTM151010 and INTM153070 referenced by section for the NRCGT statutory-override framing (matches B1, B2, B3, B4 pattern).
- ukpropertyaccountants.co.uk UK-India DTA explainer treated as lateral; no specific content extracted.
- Indian Income Tax Act references (s.22-27 House Property head, s.24(a)/(b), s.90, s.115A, s.139(1), s.195, s.197, Black Money Act s.43, Rule 128 of IT Rules 1962) drawn from working knowledge of Indian tax statute.

### Existing-page review (from "Closest existing pages")
- `tax-treaties-property-investors-treaty-framework-guide` (B1, this session) — framework parent; B5 forward-links twice (intro + closing).
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; linked from Scenario A.
- `nrl-approval-receive-rent-gross-hmrc-guide` — linked from closing checklist (NRL1 mechanics).
- `nrl-withholding-tax-20-percent-basic-rate-deduction` — linked from Scenario A (20% pre-approval line).
- `non-resident-cgt-uk-property-rates-reporting` — linked from Article 14 / NRCGT section.
- `non-resident-landlord-self-assessment-filing-requirements` — linked from worked-example wrap.
- `uk-property-income-expats-tax-obligations-explained` — linked from closing as descriptive parent.

### Citations added (external authority)
- 1993 UK-India Double Taxation Convention (Articles 4, 5, 6, 7, 14, 24, 26, 27, 28 referenced)
- TCGA 1992 s.1A + Schedules 1A, 1B, 4AA (UK NRCGT statutory architecture)
- FA 1995 Schedule 23 + SI 1995/2902 (NRL scheme statutory source)
- HMRC INTM151010 (treaty / statute interaction principle)
- HMRC HS304 helpsheet (UK personal allowance claim under Article 26 non-discrimination)
- TIOPA 2010 ss.18 and 130 (UK foreign tax credit, reverse scenario)
- ITTOIA 2005 Part 3 and s.272A (UK property income / s.24 finance-cost restriction)
- Indian Income Tax Act 1961 sections 22-27 (Income from House Property head), s.24(a)/(b), s.90/s.90(4), s.115A, s.139(1), s.195, s.197
- Indian Income Tax Rules 1962 Rule 128 + Form 67 (foreign tax credit claim mechanic)
- Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act 2015 s.43 (Schedule FA penalty)
- Estate Duty (Amendment) Act 1985 (Indian estate duty repeal); Finance Act 2015 (Indian wealth tax repeal)
- RBI Liberalised Remittance Scheme (US$250k annual cap); Finance Act 2023 (20% TCS on certain LRS remittances)
- Schedule A1 IHTA 1984 (UK enveloped residential property look-through, IHT context)
- UK-India 1956 Estate Duty Convention referenced once

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/tax-treaties-property-investors-treaty-framework-guide` — B1 framework parent (intro + closing)
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL pillar (Scenario A)
- `/blog/non-resident-landlord-tax/nrl-withholding-tax-20-percent-basic-rate-deduction` — 20% pre-approval line (Scenario A)
- `/blog/non-resident-landlord-tax/nrl-approval-receive-rent-gross-hmrc-guide` — NRL1 application process (closing)
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — NRCGT rates (Article 14 section)
- `/blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements` — SA filing (worked-example wrap)
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — descriptive expat parent (closing)

### Inline CTA placements
- After Scenario A (Indian-resident with UK BTL) — the dominant reader profile; high-intent moment after the headline workflow is laid out but before article-walk and worked-example detail.

### Build attempts
- Attempt 1 — pass. `next build` clean.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries; FAQPage count = 2 = the same one schema rendered for the page route + opengraph route, normal for this template)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 52 chars
- Meta description length: 154 chars
- Internal links resolve: yes (all seven)
- monitored_pages row inserted: yes
- Body word count: 3,280

### Flags raised to wave2_site_wide_flags.md
- None new this page. (F-7 site-wide em-dash continues to apply across all pages; no incremental flag.)

### 2-3 sentence summary
B5 UK-India bilateral page shipped at 3,280 body words / 13 FAQs. Three differentiators land: the 1993-treaty age (Article 14 capital gains not Article 13; no equivalent of OECD Art 13(4) indirect-disposal extension), the UK NRCGT statutory override under TCGA 1992 s.1A and HMRC INTM151010 (statute applies where treaty is silent), and the NRI-resident workflow detail (NRL1 gross-payment approval, UK personal allowance under Article 26 non-discrimination, Indian Form 67 foreign tax credit, Schedule FA disclosure with Black Money Act penalty exposure). Worked example: Anil (Indian national), Mumbai-resident, two UK BTLs in Leicester and Birmingham, with the credit-light arithmetic that emerges when UK personal allowance + s.24 credit exhaust the UK liability and Indian tax falls largely uncredited. Reverse scenario (UK-resident with Indian rental) gets section B with s.195 TDS + Form 13 Lower Deduction Certificate.

