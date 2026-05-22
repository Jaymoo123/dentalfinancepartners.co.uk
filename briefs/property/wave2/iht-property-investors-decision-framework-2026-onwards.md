# Wave 2 brief: iht-property-investors-decision-framework-2026-onwards

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-property-investors-decision-framework-2026-onwards.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards

---

## Manager pre-decisions

- **Suggested slug:** `iht-property-investors-decision-framework-2026-onwards`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Decision framework for a UK landlord's IHT exposure given the April 2026 BPR/APR cap + April 2027 pension inclusion + April 2030 NRB/RNRB freeze. Walk through the key questions: how much exposure, which mitigations remain available (lifetime giving without GROB, life cover, FIC share dilution), and the trigger events to reassess. Complementary to our existing rental-property IHT pillar, which is descriptive; this is decision-led.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/tips-for-avoiding-inheritance-tax-in-uk/ — specialist firm's tactical-list IHT page; useful for reader-language patterns ("avoiding" is the top organic phrase even though "mitigating" is the technical word) and to see which mitigations a competitor leads with for a property audience.
- https://www.ukpropertyaccountants.co.uk/uk-government-contemplates-inheritance-tax-reform/ — same firm's commentary on the 2024-25 reform package (BPR/APR cap + pension inclusion); read for how a specialist frames the cumulative effect rather than treating each change in isolation.
- https://www.ukpropertyaccountants.co.uk/why-more-families-pay-inheritance-tax-now/ — frozen-thresholds explainer; lifts the structural "this is a problem of fiscal drag, not new tax" angle that belongs in the framing of any landlord-targeted decision page.
- https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms — gov.uk technical note on the 6 April 2026 £1m BPR+APR cap; treat as the canonical reference, not the competitor framing.
- https://www.gov.uk/government/publications/changes-to-the-tax-treatment-of-pensions-on-death — gov.uk consultation outcome / technical note on pensions in IHT from 6 April 2027; canonical source for the decumulation-order question.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified by the manager; session must verify on first fetch and flag any 404 / redirect via the discovery log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned unrelated AIA/VAT pages with no semantic relationship to IHT.*

- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar for rental property; this brief's framing differentiator explicitly positions itself as the decision-led counterpart to that descriptive pillar, so the link relationship is the load-bearing differentiation.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: directly addresses one of the three mitigations this decision framework mentions (FIC share dilution) and disposes of the parallel BPR myth; the framework page must link to FIC-IHT as the deeper page on that option rather than re-arguing the BPR point.]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `business-property-relief-rental-property-iht` (Landlord Tax Essentials) — [reasoning: the BPR / rental-property page; the decision framework triages "does BPR help me" as one of the early questions, and this is the page that answers it for the pure-BTL reader.]
  - title: Does Business Property Relief Apply to Rental Property Inheritance?
- `cgt-gifting-property-family-members-uk` (Capital Gains Tax) — [reasoning: lifetime giving is one of the three mitigations; this CGT-side page covers the disposal trigger that any IHT decision framework must surface so the reader doesn't see only the IHT half of a gifting decision.]
  - title: CGT on Gifting Property to Family Members in the UK (2026 Guide)
- `family-investment-company-property-worth-it` (Incorporation & Company Structures) — [reasoning: framework-level FIC page; complements fic-iht-treatment-bpr-myth as the "is FIC the right mitigation for me" decision aid rather than the mechanism explainer.]
  - title: Family Investment Company for Property: Is It Worth It?
- `landlord-tax-changes-2026-complete-guide` (Landlord Tax Essentials) — [reasoning: the cross-cutting changes page; readers arriving via "what's changing in 2026" search land here first and need the IHT-specific decision page as a deeper hop.]
  - title: What Are the Major Landlord Tax Changes Coming in 2026?
- `property-investment-exit-strategy-planning-guide` (Portfolio Management) — [reasoning: estate-planning is the unstated long horizon of any portfolio exit-strategy decision; lateral link worth one nod for portfolio-owner readers who treat "exit" and "succession" as the same question.]
  - title: Property Investment Exit Strategy: Planning the Sale of a UK Portfolio

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response — UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

*No redirect overlap. No middleware changes needed at launch.*


---

## Authority links worth considering for this bucket

- [IHTA 1984 (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/1984/51/contents)
- [HMRC IHT Manual (IHTM)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual)
- [HMRC IHT400 guidance](https://www.gov.uk/guidance/how-to-complete-form-iht400-inheritance-tax-account)
- [FA 1986 s.102 (Gifts with Reservation)](https://www.legislation.gov.uk/ukpga/1986/41/section/102)
- [Pawson v HMRC [2013] UKUT 050 (TCC)](https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc)
- [Brander v HMRC [2010] UKUT 300 (TCC)](https://www.gov.uk/tax-and-chancery-tribunal-decisions/brander-v-hmrc-2010-ukut-300-tcc)
- [HMRC IHTM25000 (Business Relief)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000)
- [HMRC IHTM24000 (Agricultural Relief)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm24000)
- [APR/BPR reforms from 6 April 2026 (gov.uk)](https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms)

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
- **Final slug:** unchanged from assignment (`iht-property-investors-decision-framework-2026-onwards`).
- **Final category:** unchanged (`Landlord Tax Essentials`).
- **H1 chosen:** "An IHT Decision Framework for UK Landlords: 2026 Onwards"
- **Meta title chosen:** "UK Landlord IHT Decision Framework: 2026 Onwards" (48 chars)
- **Why these vs other options:** Decision-led phrasing leads with reader's question ("framework" not "guide" to differentiate from the descriptive pillar). "2026 Onwards" anchors the temporal frame for the reform package (April 2026 BPR/APR cap, April 2027 pension inclusion, April 2030 freeze end). Meta description (145 chars) names the three concrete reform anchors so SERP snippet signals the page's distinct angle vs the existing IHT-on-rental-property pillar.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/tips-for-avoiding-inheritance-tax-in-uk/ — numbered tactical list (10 mitigations) but content truncated after item 8; useful for "what reader-language do specialist firms use" (settles on "avoiding"/"reduce"/"save" not "mitigating"). No statute citations.
- https://www.ukpropertyaccountants.co.uk/uk-government-contemplates-inheritance-tax-reform/ — predates the actual 2024-25 reform package (Sep 2023 article); does NOT cover BPR/APR cap or pension inclusion. Not directly useful for this page; discovery-log angle: competitors haven't refreshed for post-Budget-2024 reality.
- https://www.ukpropertyaccountants.co.uk/why-more-families-pay-inheritance-tax-now/ — strong fiscal-drag framing with worked example showing a £900k-to-£1.5m couple now pays £200k IHT (versus £0 ten years prior). Useful confirmation of the "more landlords now in scope" thesis but light on landlord-specific angle.
- https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms — gov.uk summary page only; the underlying HMRC technical note links out separately. House positions §15.4 (verified 2026-05-22) has the locked mechanics; relied on house positions over what the gov.uk summary page exposed.
- https://www.gov.uk/government/publications/changes-to-the-tax-treatment-of-pensions-on-death — returned 404 on fetch. Discovery log: gov.uk URL needs a fresh search for the pension-IHT publication. House positions §15.5 (verified 2026-05-22) covered the mechanics; not blocking.

### Existing-page review (from "Closest existing pages")
- `inheritance-tax-rental-property-uk-guide` — THE descriptive IHT pillar. This page is positioned as its decision-led counterpart per the brief's framing differentiator. Outlines are deliberately structurally different: pillar uses descriptive labels ("The IHT mechanics: what applies to a landlord's estate"), this page uses decision-led questions ("Have you actually got an IHT problem?", "Which mitigations still work for a BTL landlord?"). FAQs are decision-oriented (sizing, age, trigger events) not descriptive (rates, mechanics). Bidirectional link in body.
- `fic-iht-treatment-bpr-myth` — referenced as the deep page on the FIC+BPR myth; this page mentions the myth and points readers there rather than re-arguing Pawson at length.
- `business-property-relief-rental-property-iht` — older shallow BPR page; linked in the "what doesn't work" section. INTERNAL_LINK flagged: this older page should add a forward link to the decision framework.
- `cgt-gifting-property-family-members-uk` — comprehensive CGT side of gifting; linked at the point in this page where the CGT cost of PETs is mentioned, so reader can hop without re-explaining s.17 mechanics.
- `family-investment-company-property-worth-it` — FIC framework decision page; linked at the FIC-share-dilution mitigation paragraph.
- `landlord-tax-changes-2026-complete-guide` — cross-cutting "what's changing" page; linked at the closing "lateral reading" paragraph.
- `property-investment-exit-strategy-planning-guide` — disposal-side page; linked at the closing paragraph as the lateral exit lens.

### Citations added (external authority)
- s.102 Finance Act 1986 (Gifts with Reservation; legislation.gov.uk) — for GROB anchor.
- IHTA 1984 (legislation.gov.uk) — for RNRB downsizing addition (ss.8FA-8FE) and Schedule A1 (look-through for offshore corporate envelopes).
- HMRC IHTM25000 (Business Relief manual) — for the wholly-or-mainly-trading test reference.
- Pawson v HMRC [2013] UKUT 050 — for the BPR-rental-property settled position.
- Autumn Budget 2024 (announcement context for BPR/APR cap and pension inclusion) — referenced narratively, not as a single URL because house positions §§15.4 + 15.5 carry the verified mechanics.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — descriptive pillar; opening directs readers there for mechanics first.
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` — BPR-for-BTL detail; linked from the "what doesn't work" section.
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — FIC + BPR myth deep dive.
- `/blog/incorporation-and-company-structures/family-investment-company-property-worth-it` — FIC framework decision.
- `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` — CGT side of gifting (s.17 + holdover).
- `/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide` — cross-cutting 2026 changes.
- `/blog/portfolio-management/property-investment-exit-strategy-planning-guide` — lateral exit lens.
- Forward-link to A2 (`iht-gifts-with-reservation-of-benefit-property`) removed pre-build because the target doesn't exist yet; will be added back as part of the A2 write step.

### Inline CTA placements
- After the Khan-estate sizing worked example — "Worried your sizing looks bigger than expected?" — high-intent moment because the reader has just seen a £760k bill they may not have expected.
- After the decision matrix — "The matrix gets you to a starting hypothesis, not a final plan." — converts readers who have used the matrix to find their band.
- After the closing "When to act" paragraph — converts readers who reach the end actively engaged with the framework.

### Build attempts
- Attempt 1 — pass. `cd Property/web && npm run build` succeeded after running `npm install` in the worktree (node_modules absent on freshly-created worktree, expected).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 Question entries in JSON-LD, 13 faqs in frontmatter).
- Em-dashes in markdown: 0.
- Tailwind classes in markdown: 0.
- Meta title length: 48 chars (≤62 OK).
- Meta description length: 145 chars (≤158 OK).
- Internal links resolve: yes (8 unique internal blog links, all targets exist; forward-link to A2 was removed pre-build).
- monitored_pages row inserted: yes (90-day window from 2026-05-22).
- Body word count: 3,240.

### Flags raised to wave2_site_wide_flags.md
- INTERNAL_LINK: existing `business-property-relief-rental-property-iht` should add a forward link to this decision framework so BTL readers landing on the BPR page have a route to the planning lens. The BPR page is shallow on planning; this framework gives the action steps.
- INTERNAL_LINK: existing `inheritance-tax-rental-property-uk-guide` (descriptive pillar) should add a back-link to this decision framework as the "decision-led companion" so pillar readers can hop to the planning lens after the mechanics.
- DISCOVERY (logged in discovery log, not flag): the gov.uk pensions-on-death publication URL from the brief returned 404; needs a fresh search for the canonical URL. Not blocking because house positions §15.5 carries the verified mechanics.

### 2-3 sentence summary
Wave 2 A1 pillar shipped: decision-led IHT framework for UK landlords positioned as the counterpart to the existing descriptive pillar. Page sizes exposure on a 2027/28 basis (post-pension-inclusion), walks four surviving mitigations (lifetime gifting outside GROB, life cover in trust, FIC share dilution, downsize-and-gift), names the three that don't work for pure BTL (BPR, pension shelter post-2027, offshore corporate envelopes), provides an age x estate-band decision matrix, and closes with a worked decision (Mark and Priya, Bristol, £2.8m estate). 3,240 body words, 13 FAQs, all six verifications pass, monitored_pages registered.

