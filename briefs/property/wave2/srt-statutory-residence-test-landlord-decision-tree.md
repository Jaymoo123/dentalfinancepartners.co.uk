# Wave 2 brief: srt-statutory-residence-test-landlord-decision-tree

**Site:** property
**Bucket:** Leaving the UK / expat landlord tax
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/srt-statutory-residence-test-landlord-decision-tree.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/srt-statutory-residence-test-landlord-decision-tree

---

## Manager pre-decisions

- **Suggested slug:** `srt-statutory-residence-test-landlord-decision-tree`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Leaving the UK / expat landlord tax
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> FA 2013 Sch 45 SRT decision tree applied to a landlord scenario: the three automatic overseas tests, three automatic UK tests, then the five sufficient ties test. Decision tree with worked numerical examples for a landlord-emigrant. Specific traps: the 'only home' test misread, day-counting deeming rules, exceptional circumstances cap.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/non-resident-directors-in-a-uk-company/ — UK property accountants firm; useful adjacent angle on the SRT applied to non-resident directors who also hold rental property.
- https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt — HMRC RDR3; the canonical SRT guidance (introduced in FA 2013), primary authority for the automatic overseas, automatic UK and sufficient-ties tests.
- https://www.legislation.gov.uk/ukpga/2013/29/schedule/45 — FA 2013 Sch 45 itself; the statutory anchor with the day-counting deeming rules and the exceptional-circumstances cap (60 days).
- https://www.gov.uk/tax-right-retire-abroad-return-to-uk — gov.uk leaving-the-UK hub; the operational landing point for the SA109 residence pages that codify the SRT outcome on the return.
- https://www.gov.uk/tax-uk-income-live-abroad — gov.uk overview; sets the SRT in the broader context of UK income tax exposure for non-residents, useful for the landlord audience.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned incorporation / SDLT pages that share the "decision" / "guide" vocabulary but not the SRT topic.*

- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-obligations pillar; the SRT decision tree is the gate that the obligations pillar implicitly assumes, so this page is the upstream determining page.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: NRL pillar; SRT outcome determines whether the NRL scheme even applies, so the SRT tree is the precondition page.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: SDLT non-resident surcharge has its own residence test (183 days in the 2-year window centred on the effective date), distinct from SRT; the SRT page should reference this as a "different test, different purpose" callout to prevent reader confusion.]
  - title: The 2% Non-Resident SDLT Surcharge: Residence Test, Surcharge Stack, and Refund Route
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT page; SRT outcome triggers NRCGT applicability on UK property disposals, so this is the downstream operational page.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `non-resident-landlord-self-assessment-filing-requirements` (Non-Resident Landlord Tax) — [reasoning: NRL SA filing page; SA109 is where the SRT outcome is declared on the return, so this is the operational filing-mechanic neighbour.]
  - title: Non-Resident Landlord Self Assessment: UK Filing Requirements (2026/27)
- `leaving-uk-landlord-12-month-pre-departure-checklist` (Non-Resident Landlord Tax) — [reasoning: the SRT-planning step inside the pre-departure checklist; the decision-tree page is the deeper hop for any reader who arrived via the checklist's "nail the residence year" item.]
  - title: Leaving the UK Landlord: 12-Month Pre-Departure Checklist

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
- **Final slug:** unchanged (`srt-statutory-residence-test-landlord-decision-tree`)
- **Final category:** unchanged (`non-resident-landlord-tax`)
- **H1 chosen:** SRT Statutory Residence Test: A Decision Tree for Landlords
- **Meta title chosen:** SRT Statutory Residence Test: Landlord Decision Tree (53 chars)
- **Why these vs other options:** H1 leads with the acronym + expanded name + the action concept (Decision Tree). Meta title compresses to keep "Landlord" + "Decision Tree" both visible. Slug kept verbatim.

### Competitor URLs fetched
- gov.uk RDR3 + legislation.gov.uk FA 2013 Sch 45 fetched indirectly via cached/recent knowledge; legislation.gov.uk page renders inconsistently in the httpx + BS4 stack (table content omitted). Day-band detail verified against house_positions §17.1 and the standard published HMRC RDR3 tables.
- gov.uk leaving-the-UK + UK-income-living-abroad pages were already fetched during C1 prep; the content overlaps and was not refetched.
- ukpropertyaccountants.co.uk non-resident-directors page noted as an adjacent angle but not the page's focus.

### Existing-page review (from "Closest existing pages")
- `uk-property-income-expats-tax-obligations-explained` — descriptive obligations pillar; SRT is the upstream gate, so linked at the top.
- `non-resident-landlord-scheme-uk-complete-guide` — NRL pillar; the SRT outcome decides NRL applicability. Not directly linked (avoids over-linking; C1 already links to NRL pillar from the adjacent expat page).
- `sdlt-non-resident-2-percent-surcharge` — different residence test (Sch 9A FA 2003 vs FA 2013 Sch 45); linked in the "what the SRT does not decide" section as a contrast.
- `non-resident-cgt-uk-property-rates-reporting` — downstream operational page; not directly linked from this page (would over-link in a single document; deferred to dedicated NRCGT pages).
- `non-resident-landlord-self-assessment-filing-requirements` — SA109 mechanic page; not directly linked (SA109 referenced inline by name).
- `leaving-uk-landlord-12-month-pre-departure-checklist` (C1, sibling, same branch) — linked from the intro as the operational planning companion.

### Citations added (external authority)
- FA 2013 Schedule 45 (the SRT statute) — para 23 (deeming rule), Part 1 (automatic tests + sufficient ties), Part 3 (split-year cases).
- HMRC RDR3 (Statutory Residence Test guidance) — primary HMRC interpretation, including day-counting and exceptional circumstances rules.
- Section 264 ITTOIA 2005 — UK source rule for rental income, cited in FAQ on whether SRT decides UK tax on rental income.
- Schedule 9A FA 2003 — SDLT non-resident surcharge residence test (different from SRT), cited in the "what SRT does not decide" section.
- TCGA 1992 s.10A — temporary non-residence 5-year rule, cited as a downstream consequence of SRT outcomes.

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — descriptive pillar; SRT is the upstream gate.
- `/blog/non-resident-landlord-tax/leaving-uk-landlord-12-month-pre-departure-checklist` — C1 sibling (now on this branch); SRT planning step inside the 12-month timeline.
- `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge` — contrasting residence test for SDLT.

### Inline CTA placements
- After section "Step 2: The three automatic overseas tests" — high-intent after the Imran worked example showing how narrow the workday cap is.
- After section "Joelle scenario" within sufficient ties — high-intent after the retiree-pattern trap; matches the segment most likely to convert.

### Build attempts
- Attempt 1 — pass (clean Next.js 15 build, FAQ schema count 13 matching frontmatter).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 == 13)
- Em-dashes in markdown: 0 (one introduced em-dash found mid-edit and replaced with comma)
- Tailwind classes in markdown: 0
- Meta title length: 53 chars
- Meta description length: 152 chars (initial draft was 159 chars; trimmed)
- Internal links resolve: yes (3 links all resolve to existing files)
- monitored_pages row inserted: yes
- Body word count: approximately 3,200 (total file ~4,800 minus ~1,600 frontmatter incl. 13 FAQs)

### Flags raised to wave2_site_wide_flags.md
- none new this page

### 2-3 sentence summary
C2 ships as the SRT decision-tree applied to landlord-emigrant scenarios. Walks the statutory cascade in order: day counting + deeming rules, three automatic overseas tests, three automatic UK tests, five sufficient ties with day-band tables for arrivers and leavers, the only-home trap deep dive, the 60-day exceptional circumstances cap, three worked landlord walkthroughs (Imran/Singapore, Hendersons/Frankfurt, Joelle/Portugal), and a clarifying "what the SRT does not decide" section that calls out the SDLT-non-resident, IHT 10-of-20, domicile, and treaty-residence contrasts. Anti-templating: distinct personas, distinct H2s, distinct opening to C1; the C1-vs-C2 split is action-led timeline vs decision-tree mechanics.

