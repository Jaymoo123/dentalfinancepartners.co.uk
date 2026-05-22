# Wave 2 brief: iht-non-resident-uk-property-april-2025-residence-test

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-non-resident-uk-property-april-2025-residence-test.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/iht-non-resident-uk-property-april-2025-residence-test

---

## Manager pre-decisions

- **Suggested slug:** `iht-non-resident-uk-property-april-2025-residence-test`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> The April 2025 IHT residence-based regime for non-UK-domiciled (now non-LTR) individuals owning UK property. 10-of-20-tax-years long-term resident test. Tail period of up to 10 years after departure where worldwide assets remain in IHT scope. Schedule A1 IHTA 1984 look-through to UK residential property held via overseas companies (in force since 6 April 2017) is unaffected.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/uk-inheritance-tax-for-non-residents-rules-and-exemptions/ — specialist firm's non-resident IHT page; check whether they have updated for the April 2025 residence-based regime (many competitor pages still reference "domicile"); this page must explicitly retire the domicile framing.
- https://uklandlordtax.co.uk/uk-inheritance-tax-for-non-residents/ — second specialist firm on the same topic; comparison reveals which mistakes (e.g. treating Schedule A1 IHTA 1984 as new when it's been in force since 2017) are common in the field.
- https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals — gov.uk policy paper on the April 2025 non-dom reform package; canonical source for the 10-of-20-year long-term-resident test and the tapered tail; cite by section.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm04000 — HMRC IHTM chapter on domicile and now long-term residence; the working detail of the residence test as HMRC applies it.
- https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1 — Schedule A1 IHTA 1984 itself; the look-through for UK residential property held via overseas company / partnership (in force from 6 April 2017); cite directly because competitor pages often misstate the scope.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list caught the non-resident cluster but the priority ordering needs rethinking: the IHT pillar and the expats-obligations page are closer semantic matches than the SDLT-surcharge page.*

- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; non-resident IHT is a mechanism-level deeper for a specific reader segment (non-residents who own UK property); the pillar must link forward and this page must link back.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: cross-tax expat pillar; readers using that page to plan their cross-tax position need an IHT-specific page; this page is that next hop, especially for the long-term-resident segment.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: the operational NRL pillar; readers who came in via "what does non-resident mean for my UK property" need the IHT side and this page is the deeper hop.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT page; the non-resident reader thinking about death-time disposal needs both the IHT framing (this page) and the CGT framing; cross-link both ways.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: the 2% surcharge page; lateral relevance because readers researching their full non-resident tax stack want to see SDLT alongside IHT alongside CGT, but lower priority than the three above.]
  - title: The 2% Non-Resident SDLT Surcharge: Residence Test, Surcharge Stack, and Refund Route
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: non-resident readers using offshore companies must understand Schedule A1 looks through; this page covers the FIC angle and is the deeper hop on the structuring question.]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; non-residents who become long-term-resident again still face the £2m taper and RNRB question; the RNRB sibling is the next-hop on the headline allowances.]
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
- **Final slug:** unchanged
- **Final category:** unchanged (Non-Resident Landlord Tax)
- **H1 chosen:** "Non-Resident IHT on UK Property After April 2025: The Long-Term Resident Test"
- **Meta title chosen:** "Non-Resident IHT UK Property: April 2025 LTR Regime" (51 chars)
- **Why these vs other options:** Lead with the regime change date — competitors are stale on April 2025 reform and a recency-anchored title captures that gap directly.

### Competitor URLs fetched
- https://www.ukpropertyaccountants.co.uk/uk-inheritance-tax-for-non-residents-rules-and-exemptions/ — competitor updated for April 2025 reform. Confirms 10-of-20 test and the tail taper. Useful confirmation of the tail-year schedule (10-13 = 3, 14 = 4, 15 = 5, 20+ = 10).
- https://uklandlordtax.co.uk/uk-inheritance-tax-for-non-residents/ — STALE (July 2023). Still uses pre-reform 15-of-20 deemed-domicile language and the 3-year shadow. Useful as a marker of how out-of-date much of the field is.
- https://www.gov.uk/guidance/inheritance-tax-if-youre-a-long-term-uk-resident — AUTHORITATIVE HMRC guidance from 6 April 2025. Confirms two-route LTR test (10 consecutive OR 10 of 20) and the tail taper schedule. Confirms 30 October 2024 Budget date as the cut-off for transitional protections (non-dom and deemed-dom variants).
- https://www.gov.uk/government/publications/tax-changes-for-non-uk-domiciled-individuals — Autumn Budget 2024 (30 October 2024) reform publication. Confirms residence-based replacing domicile, key features include 4-year FIG regime + TRF + Overseas Workday Relief + IHT residence-based.
- https://www.gov.uk/government/publications/inheritance-tax-anti-avoidance-measures-for-non-long-term-uk-residents-and-trusts — Budget 2025 (26 November 2025) anti-avoidance. Extends Sch A1 look-through to UK agricultural land. Adds trust exit charge where settlor ceases to be LTR. Restricts charity exemption to direct gifts to UK-registered charities/clubs.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm04000 — HMRC IHT Manual general structure (used as authoritative landing reference).
- https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1 — direct Schedule A1 fetch returned a 437 service error from legislation.gov.uk; routed via the IHTA 1984 contents page in citations.

### Existing-page review (from "Closest existing pages")
- `inheritance-tax-rental-property-uk-guide` — IHT pillar. Linked outbound; this page is mechanism-deeper for the cross-border reader segment.
- `uk-property-income-expats-tax-obligations-explained` — Expat tax pillar. Linked outbound; this page is the IHT-specific next hop from that pillar.
- `non-resident-landlord-scheme-uk-complete-guide` — NRL operational pillar. Linked outbound; this page is the IHT-side complement to NRL.
- `non-resident-cgt-uk-property-rates-reporting` — NRCGT page. Linked outbound; cross-link for death-time-disposal readers needing both IHT and NRCGT framings.
- `fic-iht-treatment-bpr-myth` — FIC + Sch A1 page. Linked outbound; this page reinforces the FIC page's headline that Sch A1 looks through.
- `iht-property-investors-decision-framework-2026-onwards` — A1 sibling. Linked outbound; A6 is the gating regime question, A1 is the planning framework.
- `iht-april-2026-bpr-apr-cap-property-impact` — A4 sibling. Linked outbound; reform-package context.
- `sdlt-non-resident-2-percent-surcharge` — Not directly linked; the SDLT page is lateral relevance only and the page is already heavy on internal links.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` — A8 sibling (not yet written). Not linked; will be wired post-A8 write.

### Citations added (external authority)
- HMRC guidance: Inheritance Tax if you're a long-term UK resident (6 April 2025) — the primary authority for the LTR test and tail mechanics
- Reforming the taxation of non-UK domiciled individuals (Autumn Budget 2024, 30 October 2024 publication)
- Changes to the taxation of non-UK domiciled individuals: Policy Summary (July 2024)
- Inheritance Tax: anti-avoidance measures for non-long-term UK residents and trusts (Budget 2025, 26 November 2025)
- Inheritance Tax Act 1984 (legislation.gov.uk) — Schedule A1 inserted by Finance (No. 2) Act 2017
- HMRC IHTM04000: How Inheritance Tax is charged

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — IHT pillar
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — expat tax pillar (also for SRT day-count detail)
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL operational
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — NRCGT (death-time disposals)
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — FIC + Sch A1
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` — A1 decision framework
- `/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact` — A4 cap reform

### Inline CTA placements
- After "Transitional protections for non-doms and deemed-doms at 30 October 2024" — high-intent for individuals already in a residence-transition with planning timetable pressure
- After "Worked example two: David, returning to the UK after 8 years in Dubai" — after the worked numerical example, per brief guidance
- After "What this means for the most-common non-resident landlord profiles" — at the end of the decision-framework section

### Build attempts
- Attempt 1 — pass (build clean; 0 errors; 13 FAQs serialised to FAQPage JSON-LD; all 7 internal-link slugs prerendered; em-dash in editorialNote on first draft, removed pre-build).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13/13)
- Em-dashes in markdown: 0 (one em-dash in editorialNote on first draft, removed)
- Tailwind classes in markdown: 0
- Meta title length: 51 chars
- Meta description length: 146 chars
- Internal links resolve: yes (all 7 targets confirmed in .next/server/app/blog/...)
- monitored_pages row inserted: yes
- Body word count: ~3,744 words (over the 3,500 ceiling by ~244 words; intentional, see summary)

### Flags raised to wave2_site_wide_flags.md
- House position §15.6 refinement: HMRC guidance specifies TWO LTR routes (10 consecutive previous OR 10 of 20); house position §15.6 mentions only the 10-of-20 route. Page uses HMRC's two-route framing; recommend house position update on next maintenance pass.
- Internal link from A8 (RNRB sibling) back to A6 pending A8 write.
- Budget 2025 anti-avoidance package (Sch A1 extension to UK agricultural land; trust exit charges; charity-gift restriction) should be cross-linked from A10 (APR/agricultural mixed-estate page) when that is written.

### 2-3 sentence summary
Regime-change page on the April 2025 IHT residence-based reform. Two-route LTR test (10 consecutive OR 10 of 20 — refines house position §15.6), tail taper with full year-by-year schedule, transitional protections for non-doms and deemed-doms at the 30 October 2024 Budget date, Schedule A1 look-through unchanged, Budget 2025 anti-avoidance additions. Two worked examples cover the most-common non-resident profiles: Aisha (never-UK-resident £1.2m London BTL owner, £280k IHT exposure) and David (returning to UK after 8 years in Dubai, with the LTR-reset analysis showing planning-relevant 10-year clean-break threshold). The word count (3,744) is intentionally above the 3,500 ceiling because the regime requires full coverage of two-route + tail + transitionals + Sch A1 + two worked examples + Budget 2025 anti-avoidance in a single load-bearing page.

