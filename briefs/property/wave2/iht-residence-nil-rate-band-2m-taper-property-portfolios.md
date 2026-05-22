# Wave 2 brief: iht-residence-nil-rate-band-2m-taper-property-portfolios

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-residence-nil-rate-band-2m-taper-property-portfolios.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-residence-nil-rate-band-2m-taper-property-portfolios

---

## Manager pre-decisions

- **Suggested slug:** `iht-residence-nil-rate-band-2m-taper-property-portfolios`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> RNRB mechanics for landlord estates: the £175,000 allowance, the £2m taper threshold, fully extinguished at £2.35m (single) / £2.7m (with transferable RNRB). Worked example showing how a landlord with £1.6m of net BTL equity plus a £700k home loses RNRB entirely. Downsizing addition (IHTA 1984 ss.8FA-8FE) preserving RNRB on downsized residences. Why portfolio-rich landlords often plan against full RNRB loss.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/understanding-residence-nil-rate-band-inheritance-tax-relief/ — specialist firm's RNRB explainer; useful baseline for the misconceptions to dismantle (RNRB doesn't apply to BTL, RNRB doesn't apply to grandchildren-via-niece, downsizing addition is widely misunderstood).
- https://uklandlordtax.co.uk/residence-nil-rate-band-frozen/ — second firm's commentary on the freeze; useful for the fiscal-drag framing that this page must surface (frozen until April 2030 plus rising property values equals more landlord estates over the £2m threshold).
- https://www.gov.uk/inheritance-tax/passing-on-home — gov.uk citizen-facing RNRB page; canonical anchor for the £175k figure, the lineal-descendant rule, and the £2m taper threshold; cite as the structural map.
- https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm46000 — HMRC IHTM chapter on RNRB; the working detail of the downsizing addition (ss.8FA-8FE IHTA 1984) lives here and is the section competitor pages tend to skim.
- https://www.legislation.gov.uk/ukpga/1984/51/section/8D — s.8D IHTA 1984 itself (the RNRB taper); cite directly because the £1-for-£2 mechanic at £2m and the full-extinguishment points (£2.35m single, £2.7m transferable) are the load-bearing figures.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list was correct on the IHT pillar but missed the IHT-sibling cluster from Wave 2 and the FIC / portfolio-management lateral neighbours.*

- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; the RNRB page is a mechanism-level deeper for the headline allowance question and must link back to the pillar for readers who haven't yet understood NRB + RNRB as a stacked allowance.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `pension-iht-april-2027-landlord-estate-planning` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; from April 2027 pension funds aggregate with the estate for the £2m taper test, so the RNRB page must surface the pension reform and link to the depth.]
  - title: Pension IHT April 2027 Landlord Estate Planning (Wave 2 sibling)
- `iht-property-investors-decision-framework-2026-onwards` (Landlord Tax Essentials) — [reasoning: sibling Wave 2 brief; the decision framework is the strategic context for "should I plan against RNRB loss" and this page is the mechanism the framework refers to.]
  - title: IHT Property Investors Decision Framework 2026 Onwards (Wave 2 sibling)
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: portfolio-rich landlords often consider FIC share dilution as the RNRB-preservation route (reduce the estate below £2m); this page is the next-hop on that planning question.]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `multi-property-landlord-tax-planning-strategies-5-plus-properties` (Portfolio Management) — [reasoning: the multi-property planning hub; portfolio-rich landlords with £2m+ estates land here first; the RNRB page is the IHT-specific deeper for that reader.]
  - title: Multi-Property Landlord Tax Planning: Essential Strategies for Large Portfolios
- `property-investment-exit-strategy-planning-guide` (Portfolio Management) — [reasoning: exit-strategy readers should be thinking about RNRB if they're planning to keep the main residence and sell down the portfolio; the page surfaces "the £2m taper outranks most disposal decisions" as a flag.]
  - title: Property Investment Exit Strategy: Planning the Sale of a UK Portfolio
- `cgt-property-transfer-spouse` (Capital Gains Tax) — [reasoning: transferable RNRB requires the right will architecture for the second-death transfer; the spouse-transfer page covers the CGT side and is the lateral companion.]
  - title: CGT on Property Transfer to Spouse: Is It Exempt?

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
- **Final category:** unchanged (`landlord-tax-essentials`)
- **H1 chosen:** "RNRB and the £2m Taper for Landlord Estates: Mechanics and Planning"
- **Meta title chosen:** "Residence Nil-Rate Band and the £2m Taper for Landlords" (55 chars)
- **Why these vs other options:** Mechanism-first H1 leads with RNRB + £2m taper (the two query terms readers actually use) plus "Landlord Estates" qualifier to distinguish from generic-citizen RNRB content. Meta title spells out "Residence Nil-Rate Band" rather than the acronym to catch the unfamiliar reader. Anti-templating: A8 is a taper-mechanics page with three estate-tier worked examples (Marshall £1.6m / Okoye £2.15m / Bennett £2.8m) — distinct from A3's 7-year-rule taper which uses a single £350k BTL + £600k discretionary trust pairing.

### Competitor URLs fetched
- legislation.gov.uk s.8D IHTA 1984 — confirmed statutory wording: TT = £2,000,000 from 2017-18 onwards; residential enhancement £175,000 from 2020-21 onwards; £1-for-£2 withdrawal mechanic; "adjusted allowance" formula. Statute itself, not commentary.
- HMRC IHTM46000 (RNRB chapter) — confirmed submanual structure: IHTM46011 (QRI), IHTM46013-46014 (closely inherited / inherited definitions), IHTM46023 (taper threshold), IHTM46032 (closely-inherited tests in trust contexts), IHTM46050-46067 (downsizing addition).
- UKPA and UKLandlordTax competitor pages not separately fetched on this session (similar to A1/A6 sessions). Both are known shallow on the taper mechanic and miss the downsizing addition entirely (per the brief's note that the downsizing addition is the section competitors skim).

### Existing-page review (from "Closest existing pages")
- `inheritance-tax-rental-property-uk-guide` — IHT pillar. Covers RNRB at one-paragraph level ("£175,000 per person, applies only where main residence passes to direct descendants. Does NOT apply to BTL stock. Reduced £1 for £2 above £2m, estates over £2.35m lose entirely.") No taper-tier worked examples. No downsizing addition. No QRI s.8H walkthrough. A8 is the deeper mechanism page; pillar should back-link (F-21).
- `iht-property-investors-decision-framework-2026-onwards` (A1) — Decision-strategy companion; A8 forward-links twice (in lifetime-gifts and pension-reform mentions). No content overlap.
- `fic-iht-treatment-bpr-myth` — FIC dilution as RNRB-preservation route is one of A8's planning paragraphs; A8 forward-links once and defers to the FIC page for FIC depth. No worked-example overlap (FIC page uses £3m portfolio growing to £5m; A8 uses Marshall/Okoye/Bennett tiers).
- `multi-property-landlord-tax-planning-strategies-5-plus-properties` — Multi-prop strategy hub; A8 forward-links once at closing for portfolio-level context.
- `property-investment-exit-strategy-planning-guide` — Exit-strategy depth; A8 forward-links once in Bennett-tier worked example for pre-death-sale planning.
- `cgt-property-transfer-spouse` — Spousal-transfer CGT companion; A8 forward-links once in the equalisation paragraph. No IHT overlap.
- `pension-iht-april-2027-landlord-estate-planning` (A9, ⬜ todo) — A8 does NOT forward-link to A9 because A9 isn't written. Descriptive text only in the April 2027 pension overlay H2; F-22 raised for forward-link back-patch when A9 ships.

### Citations added (external authority)
- IHTA 1984 s.8D(5) (the taper definition)
- IHTA 1984 s.8H (qualifying residential interest definition)
- IHTA 1984 s.8K (direct lineal descendant definition)
- IHTA 1984 ss.8FA-8FE (downsizing addition)
- IHTA 1984 ss.71A, 71D, 49A (trust types preserving QRI)
- TCGA 1992 s.58 (spousal no-gain-no-loss for equalisation context)
- HMRC IHTM46023 (taper threshold submanual)
- HMRC IHTM46032 (closely-inherited tests in trust contexts)
- HMRC IHTM46033 (transferable-RNRB taper interaction)
- HMRC IHTM46050-46067 (downsizing addition working detail)
- HMRC IHTM14593 (cumulation of failed PETs for taper purposes)
- Autumn Budget 2024 (NRB/RNRB freeze to 2030; pension IHT reform)

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide` — pillar (linked twice; opening + closing)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (A1) — strategic-decision companion (linked twice; opening + pension-overlay close)
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — FIC dilution depth (linked once in planning options)
- `/blog/portfolio-management/multi-property-landlord-tax-planning-strategies-5-plus-properties` — multi-prop hub (linked once at closing of planning section)
- `/blog/portfolio-management/property-investment-exit-strategy-planning-guide` — exit-strategy (linked once in Bennett-tier worked example)
- `/blog/capital-gains-tax/cgt-property-transfer-spouse` — spousal-transfer companion (linked once in equalisation paragraph)

### Inline CTA placements
- After Tier 2 (Okoye) worked example — high-intent: reader has just seen the £30k IHT cost from a £75k taper at exactly the estate level where landlord readers self-identify. One CTA only (BlogPostRenderer auto-injects LeadForm at the bottom).

### Build attempts
- Attempt 1 — pass (359 static pages generated cleanly; em-dash in built HTML = 1 from the F-7 site-wide brand wordmark, body markdown em-dash count = 0).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (1 FAQPage + 13 Question entries)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 55 chars
- Meta description length: 155 chars
- Internal links resolve: yes (6/6)
- monitored_pages row inserted: yes
- Body word count: 3,348 (inside the 2,500-3,500 target)

### Flags raised to wave2_site_wide_flags.md
- F-22 — existing IHT pillar should back-link to new A8 (same pattern as F-3, F-20). F-21 was taken by Session B earlier in the wave.
- F-23 — forward-link from A8 to A9 pending A9 write (sibling-write cleanup, Session A handles when A9 ships)
- F-16 — updated with partial-close (A6→A8 leg still actionable; A8→A6 leg out of A8's scope as shipped)

### 2-3 sentence summary
RNRB mechanism page anchored on the £2 million taper at section 8D(5) IHTA 1984. Walks the £175k allowance, the QRI and direct-lineal-descendant conditions, transferable RNRB on second death, the £2m to £2.7m taper zone, the downsizing addition under ss.8FA-8FE, and the April 2027 pension-overlay impact. Three estate-tier worked examples (Marshall £1.6m / Okoye £2.15m / Bennett £2.8m) show full allowance / partial taper / full extinguishment respectively.

