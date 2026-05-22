# Wave 2 brief: foreign-tax-credit-uk-property-overseas-landlords

**Site:** property
**Bucket:** Double Taxation Agreements (DTAs)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/foreign-tax-credit-uk-property-overseas-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/foreign-tax-credit-uk-property-overseas-landlords

---

## Manager pre-decisions

- **Suggested slug:** `foreign-tax-credit-uk-property-overseas-landlords`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Double Taxation Agreements (DTAs)
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> UK foreign tax credit (FTC) rules for landlords with overseas property: claim mechanics on the foreign pages of self-assessment, TIOPA 2010 ss.18-25 framework, credit limited to the lower of foreign tax paid and UK tax on the same income. Worked example: UK-resident landlord with a Portuguese rental — Portuguese IRS withholding, UK assessment, FTC offset. The arising-basis treatment post-April-2025 (no more remittance-basis).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm161000 — HMRC INTM161000 (DT relief for UK residents with foreign income or gains); the canonical UK manual chapter for treaty credit, unilateral credit, and the limit calculation. Primary authority for this whole brief.
- https://www.legislation.gov.uk/ukpga/2010/8/section/9 — TIOPA 2010 s.9 (unilateral relief mechanism for foreign tax). The statutory anchor for non-treaty credit; also confirms the source-rule carve-out for Isle of Man and Channel Islands.
- https://www.legislation.gov.uk/ukpga/2010/8/contents — TIOPA 2010 contents; map for s.18 (treaty credit), s.25 (limit of credit), and the wider Part 2 framework.
- https://www.gov.uk/government/publications/self-assessment-foreign-sa106 — HMRC SA106 (Foreign pages); the practical form on which the UK landlord with overseas property declares foreign income and claims FTC.
- https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet — HS304 helpsheet; gives the step-by-step claim mechanics that supplement the SA106 form.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned AIA / capital allowances / accountant-services pages with no foreign-income / FTC angle. Note: this brief covers the reverse direction to most DTA siblings — UK-resident landlords with overseas property — so the closest existing pages are the UK rental-income pillars (which the brief should NOT cannibalise on UK mechanics) plus the Wave 2 non-dom sibling.*

- `rental-income-tax-uk-complete-guide-landlords` (Section 24 & Tax Relief) — [reasoning: the UK rental-income pillar; UK residents are assessed to UK income tax on worldwide rental income on the arising basis (post-April-2025 non-dom reform), so this page is the upstream "how UK rental income is taxed" parent the FTC page references for the UK-side computation.]
  - title: Rental Income Tax UK: Complete Guide for Landlords 2026
- `how-to-complete-landlord-self-assessment-filing-step-by-step-guide` (Landlord Tax Essentials) — [reasoning: SA105 filing step-by-step page; SA106 (foreign pages) sits alongside SA105, so this page is the natural neighbour — link out for the SA105 side and explain the SA106 differences in this brief.]
  - title: How to File Landlord Self Assessment 2025/26 (SA105 Step-by-Step)
- `non-resident-landlord-self-assessment-filing-requirements` (Non-Resident Landlord Tax) — [reasoning: the SA106 / non-resident SA page; mirror-image scenario (non-resident landlord using SA106) — this brief is the resident-landlord-with-foreign-property version. Cross-link both ways so readers in either direction reach the right page.]
  - title: Non-Resident Landlord Self Assessment: UK Filing Requirements (2026/27)
- `tax-treaties-property-investors-treaty-framework-guide` (Non-Resident Landlord Tax) — [reasoning: the Wave 2 DTA pillar (sibling on same wave); FTC is one of the two elimination methods Art 23 allows, so this brief is the deep operational FTC chapter of that framework page — link up.]
  - title: Tax Treaties for Property Investors: Treaty Framework Guide
- `non-dom-reform-april-2025-fig-regime-property-investors` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: the non-dom reform / FIG regime page (sibling brief on this wave); from 6 April 2025 the remittance basis is replaced with the FIG (Foreign Income and Gains) regime, which changes when overseas property income falls into UK assessment in the first place. Cross-link: this brief assumes arising basis (post-FIG-window or non-electors); the FIG page covers the pre-FTC-needed scenario.]
  - title: Non-Dom Reform April 2025: FIG Regime for Property Investors (Wave 2 sibling brief)
- `uk-france-dta-property-rental-income-cgt` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: bilateral UK-France brief (sibling on same wave); the French-property-UK-landlord leg of that brief uses the FTC mechanics this page describes — useful cross-link.]
  - title: UK-France DTA: Property Rental Income and CGT (Wave 2 sibling brief)
- `uk-spain-dta-property-uk-resident-spanish-holiday-home` (Non-Resident Landlord Tax — Wave 2 sibling) — [reasoning: bilateral UK-Spain brief (sibling on same wave); the Spanish-holiday-let-UK-landlord leg also uses FTC — useful cross-link.]
  - title: UK-Spain DTA: UK Resident with Spanish Holiday Home (Wave 2 sibling brief)

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
- **Final slug:** foreign-tax-credit-uk-property-overseas-landlords (unchanged)
- **Final category:** non-resident-landlord-tax (unchanged)
- **H1 chosen:** Foreign Tax Credit for UK Landlords with Overseas Property: TIOPA 2010 Claim Mechanics
- **Meta title chosen:** Foreign Tax Credit: UK Landlords with Overseas Property (55 chars)
- **Why these vs other options:** H1 fronts audience (UK landlords with overseas property), relief (foreign tax credit), and statutory anchor (TIOPA 2010). Meta title strips to highest-density query terms. Distinguishes B9 structurally from B1-B8 (which all framed UK property + non-resident landlord); B9 is the inverse (UK resident + overseas property).

### Competitor URLs fetched
- HMRC INTM161000 — contents page; mapped the structural framework (INTM161020 DTA relief, INTM161030 unilateral, INTM161100 six principles, INTM161210 credit limit).
- HMRC INTM161100 — the six basic principles. Used as the operational core of the page.
- HMRC INTM161210 — credit-limit calculation per TIOPA 2010 s.36, ss.40-42. Reconciled with the brief's s.18-25 reference (s.18 is entitlement; s.36/40-42 is the limit calc).
- HMRC INTM161020 — DTA-based credit framework. Cited inline for the s.18 route.
- HMRC INTM161030 — unilateral credit framework + US state tax example. Cited inline for the s.9 route.
- HMRC SA106 publication page — confirmed 2026 version published 6 April 2026. Anchored the box-by-box section.
- legislation.gov.uk (TIOPA 2010 s.9, s.18, s.25) — returned error 437 (anti-bot block). Bypassed; relied on INTM and house position §10 statutory wording.

### Existing-page review (from "Closest existing pages")
- `tax-treaties-property-investors-treaty-framework-guide` (B1) — framework pillar; B9 is the deeper FTC operational chapter; linked up.
- `how-to-complete-landlord-self-assessment-filing-step-by-step-guide` — SA105 sibling; SA106 sits alongside; linked as the natural neighbour.
- `non-resident-landlord-self-assessment-filing-requirements` — mirror-image (non-resident filing SA106 for UK source); not linked inline (would invert framing); flagged for orchestrator post-merge back-link via F-20.
- `uk-france-dta-property-rental-income-cgt` (B3), `uk-spain-dta-property-uk-resident-spanish-holiday-home` (B4), `uk-italy-dta-tie-breaker-property-residence-disputes` (B7) — bilateral applied pages where the same FTC mechanics fire; all linked from B9's closing "what to do next" list.
- `non-dom-reform-april-2025-fig-regime-property-investors` (C8) — referenced descriptively in the FIG overlay section but not hyperlinked (C8 not yet written; would not resolve in worktree).

### Citations added (external authority)
- HMRC INTM161000 contents (DT Relief: UK residents with foreign income or gains)
- HMRC INTM161020 (relief under DTA)
- HMRC INTM161030 (unilateral relief)
- HMRC INTM161100 (six basic principles)
- HMRC INTM161110 (source rule)
- HMRC INTM161120 (exceptions to source rule, including Crown Dependencies)
- HMRC INTM161150 (repayment / amendment)
- HMRC INTM161210 (limit of tax credit relief)
- HMRC INTM161240 (UK measure of income)
- HMRC INTM161250 (minimum foreign tax rule)
- HMRC INTM161300/310 (qualifying foreign taxes lists)
- TIOPA 2010 s.9 (unilateral); s.18 (treaty); s.27 (deduction alternative); s.36 + ss.40-42 (credit limit); ss.73-76 (limited carry-forward)
- ITTOIA 2005 ss.272-290 (Schedule A computation under UK rules)
- ITA 2007 s.24 (finance cost restriction)
- TMA 1970 Sch 1AB (overpayment relief)
- FA 2013 Sch 45 (Statutory Residence Test)
- FA 2025 (FIG regime introduction)
- HMRC HS304 + SA106 (foreign pages)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/tax-treaties-property-investors-treaty-framework-guide` (B1) — framework pillar upstream
- `/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide` — SA105 sibling
- `/blog/non-resident-landlord-tax/uk-france-dta-property-rental-income-cgt` (B3) — bilateral applied (France situs)
- `/blog/non-resident-landlord-tax/uk-spain-dta-property-uk-resident-spanish-holiday-home` (B4) — bilateral applied (Spain situs)
- `/blog/non-resident-landlord-tax/uk-italy-dta-tie-breaker-property-residence-disputes` (B7) — bilateral applied (Italy situs)
- `/blog/non-resident-landlord-tax/dta-tie-breaker-test-dual-residence-property-owners` (B8) — Article 4 cascade upstream for residence determination
- `/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree` (C2, on property-wave2-c) — SRT upstream; resolves post-merge per F-19

### Inline CTA placements
- After "HMRC's six basic principles for FTC" — high-intent moment after the framework walk; readers ready to engage on their own credit-limit calc.
- After the Helen worked example with mortgage counterfactual — high-intent for mortgage-financed overseas landlords because the s.24/FTC interaction is where the largest avoidable cost sits.

### Build attempts
- Attempt 1 — PASS. Next.js 15.5.18 compiled successfully. 360 static pages generated (one more than B8 build, reflecting B9 added). 0 errors.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries in HTML; 13 in frontmatter)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 55 chars (≤62 ✓)
- Meta description length: 148 chars (≤158 ✓)
- Internal links resolve: 6 of 7 in this worktree (SRT C2 link on property-wave2-c branch, resolves post-merge — already covered by F-19 raised at B8 commit).
- monitored_pages row inserted: yes
- Body word count: ~4,352 words. Above the 2,500-3,500 typical range; comparable to B8's 4,691. Justified by the six-principles walk + credit-limit cap calc in detail + SA106 box-by-box + FIG regime overlay + worked example with mortgage counterfactual.

### Flags raised to wave2_site_wide_flags.md
- F-19 (raised at B8 commit) already covers the SRT (C2) cross-link; no new SRT flag needed.
- F-20: existing `non-resident-landlord-self-assessment-filing-requirements` page is the mirror-image (non-resident filing SA106 for UK-source); should back-link to B9 as the resident-with-foreign-property counterpart. Mechanical post-merge back-patch.

### 2-3 sentence summary
B9 is the FTC operational page — the first page in the DTA bucket that frames UK residents with foreign property (inverting B1-B8's non-resident-with-UK-property framing). Walks the TIOPA 2010 Part 2 framework, HMRC's six basic principles from INTM161100, the credit-limit calculation in detail, SA106 box-by-box, the FIG regime overlay from 6 April 2025, and a Helen UK-resident Lisbon-flat worked example with a mortgage counterfactual that surfaces the s.24/FTC interaction for leveraged overseas residential property. Anti-templating: this page is operational/computational; not a treaty walk (B1), not a bilateral applied (B2-B7), not a cascade (B8).

