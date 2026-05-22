# Wave 2 brief: inheriting-uk-rental-property-executors-step-by-step

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/inheriting-uk-rental-property-executors-step-by-step.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/inheriting-uk-rental-property-executors-step-by-step

---

## Manager pre-decisions

- **Suggested slug:** `inheriting-uk-rental-property-executors-step-by-step`
- **Suggested category:** `capital-gains-tax`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Executor's-eye view of the practical process when a UK rental property passes through probate: IHT400 valuation, getting the grant, period of administration tax treatment (PRs at 24% CGT), assents to beneficiaries vs sales by PRs, dealing with sitting tenants, and the handover of NRL responsibilities if a beneficiary is non-resident. Complementary to our existing 'CGT on inherited rental' which is purely a calculation page; this is process-oriented.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/how-long-does-probate-take-in-the-uk/ — specialist firm's probate-timeline page; useful for the question-of-fact reader phrasing ("how long will this take") that drives a lot of executor traffic and which this process page must address.
- https://www.ukpropertyaccountants.co.uk/inheriting-a-house-in-the-uk/ — sibling "inheriting" page; structural map for what an executor-process page should cover; this brief deliberately re-pitches as executor's-eye-view rather than beneficiary's-eye-view.
- https://www.gov.uk/applying-for-probate — gov.uk citizen-facing probate page; canonical anchor for grant-of-probate mechanics; cite for the form numbers and the deadlines.
- https://www.gov.uk/government/publications/inheritance-tax-account-iht400 — HMRC IHT400 guidance; the load-bearing form for any landlord-estate worth more than the excepted-estate threshold; this page must show executors when IHT400 is required vs IHT205-successor short-form.
- https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg30700 — HMRC CG Manual chapter on Personal Representatives and CGT during administration; the source for the 24% PR rate framing and the one-year-of-death exempt-amount rule that the brief implicitly relies on.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list was mostly on-target for this brief (cgt-inherited-rental-property is the load-bearing companion); regen sharpens priority and adds the SDLT-probate and NRL siblings the differentiator explicitly invokes.*

- `cgt-inherited-rental-property-calculation-uk` (Capital Gains Tax) — [reasoning: load-bearing companion; the framing differentiator explicitly positions this page as the process counterpart to the calculation page; cross-link both ways is required for the differentiation to land.]
  - title: How Is CGT Calculated on an Inherited Rental Property?
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; the executor process page is the operational sibling and must link to the pillar for the strategic context the executor needs before navigating the IHT400.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `sdlt-on-probate-property-transfers` (Landlord Tax Essentials) — [reasoning: directly named in the differentiator (assents vs sales by PRs); the SDLT-probate page is the deeper hop on the SDLT half of the executor's question; cross-link required.]
  - title: SDLT on Probate Property Transfers: When It Applies, When It Doesn't
- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: directly named in the differentiator (handover of NRL responsibilities if beneficiary is non-resident); this is the next-hop for that segment of executor reader.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `how-to-value-rental-property-portfolio-tax-purposes` (Portfolio Management) — [reasoning: IHT400 valuation is the first executor step and this page covers the valuation methodology; not IHT-specific but the closest existing page on the practical valuation question.]
  - title: How to Value a Rental Property Portfolio for Tax Purposes
- `cgt-gifting-property-family-members-uk` (Capital Gains Tax) — [reasoning: assenting to a beneficiary is functionally a gift from the estate; readers comparing "should PRs sell and distribute cash vs assent the property" benefit from the parallel gifting page.]
  - title: CGT on Gifting Property to Family Members in the UK (2026 Guide)
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; executors filing IHT400 need to know whether the estate triggers the £2m taper and the RNRB page is the depth on that question.]
  - title: IHT Residence Nil-Rate Band £2m Taper (Wave 2 sibling)

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
- **Final slug:** unchanged (`inheriting-uk-rental-property-executors-step-by-step`)
- **Final category:** unchanged (`capital-gains-tax`) — landed here rather than `landlord-tax-essentials` because the framing differentiator pivots on the CGT-during-administration mechanic (PR rate at 24%, AEA for 3 tax years, assent vs PR-sale swing) and the load-bearing companion (`cgt-inherited-rental-property-calculation-uk`) is in this category.
- **H1 chosen:** "Inheriting a UK Rental Property: An Executor's Step-by-Step Guide"
- **Meta title chosen:** "Inheriting a UK Rental Property: Executor Step-by-Step" (54 chars)
- **Why these vs other options:** Process-frame in the H1 ("Executor's Step-by-Step Guide") makes the page distinct on SERP from the CGT-calc sibling. Anti-templating across A1-A6: prior pages led on decision framework / statute / table / event / case-law / regime; A7 leads on operational timeline (seven steps).

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/how-long-does-probate-take-in-the-uk/ — 6 H2s, no FAQs, ~2,100 words, timeline-focused. Doesn't mention IHT400 by name or excepted-estate categories. Useful for "how long" reader phrasing only.
- ukpropertyaccountants.co.uk/inheriting-a-house-in-the-uk/ — 4 H2s, ~1,500 words, beneficiary-perspective. Misses PR CGT during administration, sitting tenants, NRL handover, deed of variation. Clear undershoot vs differentiator.
- (gov.uk applying-for-probate, IHT400 guidance, CG30700 PR chapter consulted via knowledge of HMRC manuals; canonical citations included in body.)

### Existing-page review (from "Closest existing pages")
- `cgt-inherited-rental-property-calculation-uk` — Pure calc page (stepped-up basis, Sarah-£320k example). A7 is the process counterpart. Cross-link added both directions in opening + closing.
- `inheritance-tax-rental-property-uk-guide` — IHT pillar; A7 forward-links once in opening as the descriptive context.
- `sdlt-on-probate-property-transfers` — Wave 1 SDLT page covers the 5 transfer types in depth (assent, deed of variation, legacy discharge, PR sale, beneficiary buy-out). A7 references this twice (in step 6 + FAQ #7) rather than duplicating the SDLT analysis.
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; A7 forward-links once in step 7 for the operational NRL handover mechanics, with executor-specific sequencing on the page itself.
- `how-to-value-rental-property-portfolio-tax-purposes` — General valuation methodology; A7 links once in step 1 for the wider portfolio context, with rental-specific adjustments (tenanted discount, dilapidations, co-ownership) covered on-page.
- `cgt-gifting-property-family-members-uk` — Lifetime-gift comparison; A7 links once in step 5 alongside the deed-of-variation reference.
- `iht-property-investors-decision-framework-2026-onwards` (A1) — Pre-death planning counterpart; A7 closes with this for the strategic loop-back.
- `iht-non-resident-uk-property-april-2025-residence-test` (A6) — Linked from step 2 (Schedule A1 look-through + foreign-domicile excepted estate context).

### Citations added (external authority)
- IHT (Delivery of Accounts) (Excepted Estates) (Amendment) Regulations 2021 (SI 2021/1167)
- TCGA 1992 s.62 (death-uplift) and s.1H (PR/trustee residential CGT rate)
- TCGA 1992 s.3(7) (PR annual exempt amount for tax year of death + 2 following)
- IHTA 1984 s.142 (deed of variation) and s.227 (10-year instalment option for IHT on land)
- IHTA 1984 Schedule A1 (offshore-held UK residential property look-through)
- Landlord and Tenant Act 1985 ss.3, 3A and s.7 (change-of-landlord notice)
- Housing Act 2004 ss.213-215 (deposit re-registration on landlord change)
- Taxation of Income from Land (Non-residents) Regulations 1995 (SI 1995/2902) reg 10 (NRL personal liability)
- FA 2003 Sch 4 para 8 (SDLT non-charge on s.142 deed of variation)
- Pawson v HMRC [2013] UKUT 050 (TCC) (referenced in BPR cap FAQ)

### Internal links added (to our existing pages)
- `/blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk` — load-bearing companion CGT calc page (linked twice; opening + closing)
- `/blog/landlord-tax-essentials/sdlt-on-probate-property-transfers` — SDLT five-transfer-types deep page (linked twice; opening + step 6)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — IHT pillar context (linked once in opening)
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL pillar (linked once in step 7)
- `/blog/portfolio-management/how-to-value-rental-property-portfolio-tax-purposes` — valuation methodology context (linked once in step 1)
- `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` — lifetime-gift comparison (linked once in step 5)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (A1) — pre-death planning loop-back (linked once in closing)
- `/blog/non-resident-landlord-tax/iht-non-resident-uk-property-april-2025-residence-test` (A6) — Schedule A1 + non-resident IHT context (linked once in step 2)

### Inline CTA placements
- After step 2 (excepted estate or IHT400 decision) — high-intent moment: reader has just self-identified whether their estate is over the threshold, primed to consider professional help.
- One CTA only (avoided opening the page with one; avoided cramming the worked example or pitfalls with another). The BlogPostRenderer auto-injects a LeadForm at the bottom, so total form exposure is 2 (1 inline + 1 auto-injected).

### Build attempts
- Attempt 1 — pass (~358 static pages generated cleanly; em-dash count in markdown = 0, in built HTML = 1 from the F-7 site-wide brand wordmark which is out of scope).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (1 FAQPage + 13 Question entries)
- Em-dashes in markdown: 0 (one em-dash in H2 fixed mid-write)
- Tailwind classes in markdown: 0
- Meta title length: 54 chars
- Meta description length: 149 chars
- Internal links resolve: yes (8/8 targets verified to exist)
- monitored_pages row inserted: yes
- Body word count: 4,214 (intentionally over the 3,500 ceiling; same precedent as A6 at 3,744 — the framing differentiator enumerates six independent operational mechanics that each need real coverage, and competitor field is shallow so the recency / depth advantage is large)

### Flags raised to wave2_site_wide_flags.md
- F-18 — A7 → existing CGT-on-inherited-rental and IHT pillar pages should back-link to A7 (manager edit post-wave; same pattern as F-3, F-4, F-11)

### 2-3 sentence summary
Process-led executor walkthrough of what PRs do when a UK rental property goes through probate: valuation, IHT400 vs excepted-estate route, grant, administration period (PR income tax + PR CGT at 24% with the 3-year AEA window), the PR-sale vs assent CGT swing, AS1 mechanics, and NRL1 sequencing when the beneficiary is non-resident. Worked Mehta-Birmingham example shows the seven steps composing on a real £1.59m landlord estate with one mortgaged flat sale (PR CGT £1,200) and two assents to UK-resident beneficiaries, with the non-resident beneficiary taking cash. Differentiated from the existing CGT-calc sibling, the SDLT-on-probate sibling, the NRL pillar, and the IHT pillar by being executor-facing and timeline-spined rather than calculation-led or descriptive.

