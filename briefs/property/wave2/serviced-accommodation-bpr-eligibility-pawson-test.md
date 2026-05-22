# Wave 2 brief: serviced-accommodation-bpr-eligibility-pawson-test

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/serviced-accommodation-bpr-eligibility-pawson-test.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/serviced-accommodation-bpr-eligibility-pawson-test

---

## Manager pre-decisions

- **Suggested slug:** `serviced-accommodation-bpr-eligibility-pawson-test`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> When a serviced-accommodation business clears the Pawson 'wholly or mainly trading' threshold and qualifies for BPR. The fact-pattern checklist from the line of cases (Pawson, Brander, Personal Representatives of Pawson): managed kitchen, daily cleaning, breakfast, concierge, on-site management. Why most Airbnb-style short-lets fail the test. Worked example for a 6-unit serviced-accommodation operation.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/maximising-business-relief-to-reduce-inheritance-tax/ — specialist firm's BPR explainer; useful for the eligibility framing readers expect and for how a competitor positions "active business" without being precise about Pawson; this page must do better.
- https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/ — same firm's coverage of the £1m cap; sibling commentary explaining why BPR eligibility matters even more post-April-2026 (capped relief is still better than no relief).
- https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc — Pawson UKUT decision itself; cite the "wholly or mainly trading" reasoning by paragraph rather than via secondary summaries; this is the leading authority and any page that doesn't cite it directly is incomplete.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25278 — HMRC IHTM25278 (BPR for hotels, guest houses, holiday lets); HMRC's published view of where the trading line falls; the fact-pattern checklist this brief needs lives here.
- https://www.gov.uk/tax-and-chancery-tribunal-decisions/personal-representatives-of-grace-joyce-graham-deceased-v-the-commissioners-for-her-majesty-s-revenue-and-customs-2018-ukftt-306-tc — Graham (Carnwethers Guesthouse) FTT 2018; the more recent positive BPR case for an active guesthouse operation; counterweight to Pawson and useful for the "what does qualify" worked example.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch. The Graham / Carnwethers citation in particular needs verification because tribunal URL paths sometimes change; if 404 search GOV.UK tribunal decisions for "Graham deceased BPR guesthouse".

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list caught the serviced-accommodation cluster but missed the IHT / BPR / FHL-tax neighbours that are at least as semantically close.*

- `business-property-relief-rental-property-iht` (Landlord Tax Essentials) — [reasoning: this page's load-bearing question (when does the Pawson threshold flip to "trading") is the inverse of what business-property-relief-rental-property argues (Pawson disqualifies pure investment); the two pages are sibling sides of one decision.]
  - title: Does Business Property Relief Apply to Rental Property Inheritance?
- `serviced-accommodation-tax-fhl-abolition-april-2025` (Property Types & Specialist Tax) — [reasoning: post-FHL-abolition landscape page; this page assumes that reader and answers "even if you lose FHL, can you still claim BPR by clearing Pawson"; direct continuation.]
  - title: How Does Serviced Accommodation Tax Work After FHL Abolition in April 2025?
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; the Pawson page is a mechanism-level deeper and must link back to the pillar for readers who arrived not yet understanding why the trading test matters.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `furnished-holiday-let-tax-rules-exemptions` (Section 24 & Tax Relief) — [reasoning: the FHL-abolition specific page; serviced-accommodation BPR readers are former FHL operators in the majority of cases; this is the contextual entry point.]
  - title: Furnished Holiday Let Tax: Rules, Abolition and What Happens Now
- `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` (Property Types & Specialist Tax) — [reasoning: structural-decision sibling for the income-tax half; the BPR-Pawson page is the IHT half of the same decision (is SA enough of a business for tax treatment X).]
  - title: Serviced Accommodation vs Buy-to-Let Tax: Which Strategy Costs Less in 2026?
- `iht-april-2026-bpr-apr-cap-property-impact` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief on the cap reform; Pawson-eligible operators still get capped relief from April 2026 and the cap page is the next hop after this page confirms eligibility.]
  - title: IHT April 2026 BPR/APR Cap (Wave 2 sibling)
- `airbnb-tax-uk-short-term-rental-income-taxed` (Property Types & Specialist Tax) — [reasoning: most short-let landlords come through the Airbnb-tax page first; this page must address "why my Airbnb almost certainly fails the Pawson test" and the Airbnb-tax page is the right back-link target.]
  - title: Airbnb Tax UK: How Is Short-Term Rental Income Taxed?

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
- **Final slug:** unchanged
- **Final category:** unchanged (Property Types & Specialist Tax)
- **H1 chosen:** "Serviced Accommodation and BPR: Clearing the Pawson Trading Threshold"
- **Meta title chosen:** "Serviced Accommodation BPR: The Pawson Trading Test" (51 chars)
- **Why these vs other options:** Lead with the case-law spine. The Pawson line is the single most-load-bearing reference in the topic and naming it in the title disambiguates from generic "BPR for serviced accommodation" pages competitors offer.

### Competitor URLs fetched
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25278 — Authoritative HMRC summary of Pawson, including Henderson J's quoted holding and the activities-on-investment-side list; also flags Green [2015] confirming scale isn't decisive.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25277 — HMRC view on hotels/B&Bs (Vinelott J in Griffiths v Jackson); presumptively trading.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25279 — George (caravan sites) and Farmer (looking at business in the round).
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25280 — McCall (NI CA 2009) on other lettings, agistment as investment.
- https://www.ukpropertyaccountants.co.uk/maximising-business-relief-to-reduce-inheritance-tax/ — fetched (200 OK) but extremely thin on Pawson; competitor framing is generic "active business" without the case-law specificity this page provides.
- gov.uk/tax-and-chancery-tribunal-decisions/...nicolette-vivian-pawson... — confirmed canonical URL after the brief's quoted URL 404'd; flagged.
- gov.uk/tax-and-chancery-tribunal-decisions/...maureen-vigne... — Vigne [2018] UKUT 0357 (livery case) used as the post-Pawson "what does qualify" counterweight, replacing the brief's suggested Graham/Carnwethers reference (which the brief itself flagged as needing verification and which did not surface on gov.uk search).

### Existing-page review (from "Closest existing pages")
- `business-property-relief-rental-property-iht` — Shallow pillar from April 2026. Generic Q&A format, no specific case-law citation, no fact-pattern checklist. This page is the deeper applied version. Flagged for orchestrator backlink (raise the cross-link back from the pillar to this page).
- `serviced-accommodation-tax-fhl-abolition-april-2025` — Income-tax-side companion. Linked outbound; intentionally not duplicating income-tax mechanics here.
- `inheritance-tax-rental-property-uk-guide` — IHT pillar. Linked outbound for headline reliefs; this page is mechanism-deeper.
- `iht-april-2026-bpr-apr-cap-property-impact` — Sibling Wave 2 (A4) reform-impact page. Linked outbound; this page is the upstream eligibility question, A4 is the downstream cap question.
- `airbnb-tax-uk-short-term-rental-income-taxed` — Backlink target; explicitly addressed the "why Airbnb-style operations fail Pawson" angle the brief requested.
- `serviced-accommodation-vs-buy-to-let-tax-comparison-2026` — Income-tax decision sibling. Linked outbound.
- `furnished-holiday-let-tax-rules-exemptions` — Not directly linked from this page (FHL-abolition specifics are out of scope); the SA-FHL-abolition page is the more natural bridge.

### Citations added (external authority)
- s.105 IHTA 1984 (legislation.gov.uk)
- Pawson v HMRC [2013] UKUT 050 (TCC) — full gov.uk decision URL
- Vigne v HMRC [2018] UKUT 0357 (TCC) — full gov.uk decision URL
- IHTM25277 (HMRC hotels, B&Bs, residential homes)
- IHTM25278 (HMRC holiday lettings; Pawson + Green)
- IHTM25279 (HMRC caravan sites; George approach)
- IHTM25280 (HMRC other lettings; McCall)
- APR/BPR reform from 6 April 2026 (gov.uk policy publication)

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` — pillar BPR-on-rental page (link out to pillar; this page is the deeper applied version)
- `/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact` — sibling A4, downstream cap mechanics
- `/blog/property-types-and-specialist-tax/serviced-accommodation-vs-buy-to-let-tax-comparison-2026` — income-tax side companion
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — IHT pillar
- `/blog/landlord-tax-essentials/iht-lifetime-gifts-7-year-rule-property-taper` — for lifetime-gift mechanics of qualifying BPR property
- `/blog/property-types-and-specialist-tax/airbnb-tax-uk-short-term-rental-income-taxed` — backlink target for Airbnb-fails-Pawson section

### Inline CTA placements
- After "What Pawson actually decided" H2 — first high-intent moment after the load-bearing legal explanation; reader has now understood the threshold and is asking "where do I sit?".
- After "Helena, a 6-unit operation in central Edinburgh" worked-example H2 — after the worked numerical example, per brief guidance.
- After "Evidencing the trading case: the documentation file" H2 — at the end of the decision-framework section, before the closing summary; high-intent for operators ready to engage on the documentation question.

### Build attempts
- Attempt 1 — pass (build clean; 0 errors; 13 FAQs serialised to FAQPage JSON-LD; all six internal-link slugs prerendered).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13/13)
- Em-dashes in markdown: 0 (one em-dash in editorialNote on first draft, removed)
- Tailwind classes in markdown: 0
- Meta title length: 51 chars
- Meta description length: 147 chars
- Internal links resolve: yes (all 6 built HTML targets confirmed in .next/server/app/blog/...)
- monitored_pages row inserted: yes
- Body word count: ~3,049 words (above 2,500 floor, below 3,500 ceiling)

### Flags raised to wave2_site_wide_flags.md
- The brief's quoted Pawson URL on gov.uk (`/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc`) returned 404; correct URL is the full case-name variant (`the-commissioners-for-hm-revenue-and-customs-v-the-personal-representatives-of-nicolette-vivian-pawson-deceased-2013-ukut-050-tcc`). Not a HOUSE_POSITION_CONFLICT — house position §15.4 and §9 both cite the case correctly and the brief itself warned URLs needed verification.
- The brief's suggested Graham/Carnwethers FTT 2018 reference did not surface in gov.uk tribunals search. Substituted with Vigne [2018] UKUT 0357 (TCC), which is more recent (Upper Tribunal level), provides the same "what does qualify" counterweight, and is directly authoritative. The brief flagged the Graham URL as one that "needs verification".
- Suggested backlink: the existing `business-property-relief-rental-property-iht` pillar (April 2026 generalist draft) is shallower than this deeper applied page warrants. Orchestrator should consider adding a backlink from the pillar to this Pawson page on next maintenance pass.

### 2-3 sentence summary
Case-law-spined Pawson page distinct from A4's cap-reform framing. Anchors on Pawson [2013] UKUT 050 + Vigne [2018] UKUT 0357 + the IHTM25277-25280 series, with a Helena/Edinburgh 6-unit worked example quantifying the £0 / £280k / £760k swing across pre-cap, post-cap-qualifying and post-cap-Airbnb-fail scenarios. Fact-pattern checklist supplies the operational decision tool the brief asked for.

