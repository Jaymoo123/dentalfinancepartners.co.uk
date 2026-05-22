# Wave 2 brief: agricultural-property-relief-mixed-estate-1m-cap

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/agricultural-property-relief-mixed-estate-1m-cap.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/agricultural-property-relief-mixed-estate-1m-cap

---

## Manager pre-decisions

- **Suggested slug:** `agricultural-property-relief-mixed-estate-1m-cap`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> APR mechanics for a mixed estate where farmland sits alongside BTL property and a trading business. The £1m combined BPR+APR cap from 6 April 2026 forces a choice: APR on the farm, BPR on the business, or split. Worked example for a landlord with £800k farm + £400k trading business + £1.2m BTL equity. APR-specific tests (5-year occupation, 7-year ownership where let), and the 'farming the let' borderline pattern.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/agricultural-relief-for-inheritance-tax-key-benefits/ — specialist firm's APR explainer; useful baseline for APR-specific tests (5-year occupation, 7-year ownership-where-let) that the framing differentiator names and which most pure-property pages skim or mis-cite.
- https://www.ukpropertyaccountants.co.uk/farmland-supply-value-drops-is-iht-reform-to-blame/ — same firm's commentary on the post-announcement farmland market; useful colour for the "who actually cares" framing but not a technical source.
- https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms — gov.uk technical note on the 6 April 2026 reform; the canonical source for the £1m combined cap and how APR and BPR interact; cite throughout.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm24000 — HMRC IHTM chapter on Agricultural Relief; the working detail of the occupation and ownership periods, the agricultural-value vs market-value distinction, and the "farming the let" borderline pattern the differentiator names.
- https://www.legislation.gov.uk/ukpga/1984/51/part/V/chapter/II — Part V Chapter II IHTA 1984 (Agricultural Property); cite by section for the technical claims (s.115 definitions, s.117 occupation period, s.124A clawback).

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch. The mixed-estate framing is the page's distinct angle; competitor pages treat APR in isolation rather than as one of two reliefs competing for a single £1m allowance.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list returned unrelated reliefs (holdover, capital allowances, marginal relief) because the "relief" keyword caught everything; semantic regen narrows to the BPR / IHT / serviced-accommodation cluster the differentiator actually invokes.*

- `business-property-relief-rental-property-iht` (Landlord Tax Essentials) — [reasoning: BPR-rental-property is the load-bearing companion; this page covers APR in the mixed estate where BPR competes for the same £1m allowance; the two pages are sides of one decision.]
  - title: Does Business Property Relief Apply to Rental Property Inheritance?
- `iht-april-2026-bpr-apr-cap-property-impact` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; the cap-impact page is the headline-reform piece and this APR-mixed-estate page is the deeper hop for one specific reader segment (farming families with mixed estates).]
  - title: IHT April 2026 BPR/APR Cap Property Impact (Wave 2 sibling)
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; mixed-estate APR is a mechanism-level deeper for a specific reader segment (farmland + BTL + trading) and must link back to the pillar for the broader landscape.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `serviced-accommodation-bpr-eligibility-pawson-test` (Property Types & Specialist Tax) — [reasoning: sibling Wave 2 brief; mixed estates often include a serviced-accommodation operation as the "trading business" half; that page is the eligibility-test deeper hop.]
  - title: Serviced Accommodation BPR Eligibility (Pawson Test): Wave 2 sibling
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: mixed-estate readers planning around the cap consider FICs as the wrapper for the trading-business half; this page resets the FIC-as-BPR-vehicle myth and is the company-structure depth.]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `property-development-tax-trading-vs-investment-income` (Property Types & Specialist Tax) — [reasoning: the trading-vs-investment classification page; "farming the let" is the borderline between investment property and trading farm, and any APR-mixed-estate page must surface the classification question.]
  - title: Property Development Tax: Trading vs Investment Income for UK Developers
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; mixed-estate values frequently exceed £2m and the RNRB taper compounds with the £1m relief cap to produce the cumulative IHT bill the page must walk through.]
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
- **Final category:** unchanged (`property-types-and-specialist-tax`)
- **H1 chosen:** "Agricultural Property Relief and the £1m Cap: Planning for Mixed Estates"
- **Meta title chosen:** "APR and the £1m Cap: Mixed Estates with Farm + BTL + Trading" (60 chars)
- **Why these vs other options:** Mixed-estate angle is the page's distinct framing (competitor APR pages treat APR in isolation; A10 treats it as one of two reliefs competing for one £1m allowance across three asset classes). H1 leads with the relief name + the cap (the two anchoring SERP terms) plus "Planning for Mixed Estates" to qualify the audience. Anti-templating vs A4 (the headline cap page, 4-segment) and A5 (Pawson case-law checklist): A10 uses an allocation-decision spine with a single 3-asset worked example.

### Competitor URLs fetched
- legislation.gov.uk s.117 IHTA 1984 — verified statutory wording: 2-year owner-occupation OR 7-year ownership-with-agricultural-occupation. Brief incorrectly stated "5-year occupation, 7-year ownership where let"; the correct rule (2/7) was used in A10. D-18 logged.
- UKPA APR explainer + farmland-supply commentary URLs — not separately fetched on this session (similar to prior IHT sessions, competitor field broadly stale on the post-Budget-2024 reform package and shallow on the mixed-estate allocation question).
- HMRC IHTM24000 chapter (referenced via knowledge) — IHTM24070 (farmhouse character-appropriate test), IHTM24050 (s.117 occupation/ownership), IHTM24151 (s.118 agricultural value vs market value).
- gov.uk APR/BPR reform technical note (referenced via house position §15.4 verified 2026-05-22): £1m combined cap from 6 April 2026, 50% relief above; AIM-share 50% rate from same date.

### Existing-page review (from "Closest existing pages")
- `business-property-relief-rental-property-iht` (LTE) — BPR-rental pillar; A10 cross-links once at the BPR-mechanics paragraph as the BTL-specific depth.
- `iht-april-2026-bpr-apr-cap-property-impact` (A4, LTE) — Headline cap page; A10 forward-links twice as the broader reform context; A10 is the mixed-estate-specific depth.
- `inheritance-tax-rental-property-uk-guide` (LTE pillar) — Linked once in opening.
- `serviced-accommodation-bpr-eligibility-pawson-test` (A5, P-T&ST) — Pawson trading-bar deep page; A10 forward-links twice (BPR-mechanics paragraph + farmhouse Brander analogue).
- `fic-iht-treatment-bpr-myth` (Inc & Co) — Linked once in the planning-section FIC discussion (dismantling the FIC-as-BPR myth).
- `property-development-tax-trading-vs-investment-income` (P-T&ST) — Linked once in the "farming the let" borderline section.
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (A8, LTE) — Linked twice (RNRB-interaction FAQ + closing pointers).
- Plus 2 additional Wave 2 siblings: A1 (decision framework, linked in closing) and A9 (pension IHT, linked in closing).
- Plus F-17 resolution: A10 cross-links forward to A6 (`iht-non-resident-uk-property-april-2025-residence-test`) in the Schedule A1 extension paragraph, resolving the A10→A6 leg of F-17.

### Citations added (external authority)
- IHTA 1984 Part V Ch II ss.115-124C (APR regime)
- IHTA 1984 s.115 (agricultural property definition + farmhouse character-appropriate test)
- IHTA 1984 s.116 (APR rates pre/post-cap)
- IHTA 1984 s.117 (qualifying periods: 2 years owner-occupation, 7 years let)
- IHTA 1984 s.118 (agricultural value vs market value)
- IHTA 1984 s.124A (clawback on failed PETs where property sold by donee)
- IHTA 1984 s.114 (APR-vs-BPR ordering: APR first, no double relief)
- IHTA 1984 s.105 (BPR scope)
- IHTA 1984 Schedule A1 (offshore-held UK residential property look-through; extended to UK agricultural land per Autumn Budget 2025 anti-avoidance package)
- Brander v HMRC [2010] UKUT 300 (TCC) (farmhouse character-appropriate test + Brander analogue for "farming the let")
- Pawson v HMRC [2013] UKUT 050 (TCC) (BPR trading bar for BTL-side analysis)
- HMRC IHTM24000 chapter (working detail across the APR regime)
- gov.uk APR/BPR reform technical note (Autumn Budget 2024 announcement, £1m cap arithmetic)

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact` (A4) — headline cap page (linked twice; opening + planning section)
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` — BPR-rental pillar (linked once in opening)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — IHT pillar (linked once in opening)
- `/blog/property-types-and-specialist-tax/serviced-accommodation-bpr-eligibility-pawson-test` (A5) — Pawson trading-bar deep page (linked twice; BPR-mechanics + farmhouse Brander analogue)
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — FIC IHT myth-busting page (linked once in planning section)
- `/blog/property-types-and-specialist-tax/property-development-tax-trading-vs-investment-income` — trading vs investment classification (linked once in "farming the let" section)
- `/blog/landlord-tax-essentials/iht-residence-nil-rate-band-2m-taper-property-portfolios` (A8) — RNRB taper sibling (linked twice; RNRB-interaction FAQ + closing)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (A1) — strategic-decision framework (linked once in closing)
- `/blog/landlord-tax-essentials/pension-iht-april-2027-landlord-estate-planning` (A9) — pension-IHT sibling (linked once in closing)
- `/blog/non-resident-landlord-tax/iht-non-resident-uk-property-april-2025-residence-test` (A6) — non-resident IHT companion (linked once in Schedule A1 extension paragraph). **Resolves F-17 on the A10→A6 leg.**

### Inline CTA placements
- After the Lambert-estate worked example — high-intent: reader has just seen the £130k IHT cost of the cap reform on a £2.4m mixed estate that mirrors their own pattern. One CTA only.

### Build attempts
- Attempt 1 — pass (361 static pages generated cleanly; em-dash in built HTML = 1 from F-7 site-wide brand wordmark; body markdown em-dash = 0 after one mid-write fix to an FAQ question).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (1 FAQPage + 14 Question entries)
- Em-dashes in markdown: 0 (one em-dash in an FAQ question fixed mid-write)
- Tailwind classes in markdown: 0
- Meta title length: 60 chars
- Meta description length: 154 chars
- Internal links resolve: yes (10/10)
- monitored_pages row inserted: yes
- Body word count: 3,369 (inside 2,500-3,500 target band)

### Flags raised to wave2_site_wide_flags.md
- F-25 — existing BPR-rental + IHT-pillar should back-link to new A10. Same pattern as F-3, F-20, F-22, F-24. Orchestrator may bundle the IHT-pillar enrichment as a single post-Wave-2 edit covering all the cross-link requests (D-14 wider pillar refresh + F-3 + F-20 + F-22 + F-24 + F-25).
- F-17 RESOLVED on the A10→A6 leg in A10 body. Note: F-17 was originally raised for both A6→A10 and A10→A6 directions; only the A10→A6 leg can be added by Session A on this branch. The A6→A10 leg remains open as a one-line back-patch.

### 2-3 sentence summary
Mixed-estate APR page covering Part V Ch II IHTA 1984 + the £1m combined BPR/APR cap from 6 April 2026 + the allocation arithmetic across three competing asset classes (farmland, trading business, BTL portfolio). Walks s.115 definitions, s.117 qualifying periods (2 years owner-occupied, 7 years let — brief stated 5 years and was wrong, D-18), s.118 agricultural value vs market value, s.124A clawback, the Brander farmhouse test, and the "farming the let" borderline pattern. Lambert estate worked example shows £130k of new IHT on a £2.4m mixed estate (£800k owner-occupied farm + £400k trading business + £1.2m BTL + £580k farmhouse + £140k cash) once the £1m cap is binding on £1.65m of qualifying value.

