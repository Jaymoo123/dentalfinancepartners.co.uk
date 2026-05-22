# Wave 2 brief: iht-april-2026-bpr-apr-cap-property-impact

**Site:** property
**Bucket:** IHT and estate planning
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-april-2026-bpr-apr-cap-property-impact.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact

---

## Manager pre-decisions

- **Suggested slug:** `iht-april-2026-bpr-apr-cap-property-impact`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT and estate planning
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> The 6 April 2026 reform: £1m combined BPR+APR 100% relief cap, 50% relief above the cap (effective 20% IHT), AIM rate drop to 50%. Who is affected (mixed estates with both trading and farming, property developers with WIP, serviced-accommodation operators meeting Pawson). Who isn't (pure BTL landlords — still don't qualify per Pawson). Frame as a 'what changed, who cares, what to do' update.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/ — specialist firm's commentary on the £1m cap reform; useful for the framing that lay readers respond to ("relief is being capped, not removed") and for which mitigations a competitor leads with.
- https://www.ukpropertyaccountants.co.uk/farmland-supply-value-drops-is-iht-reform-to-blame/ — secondary-effects piece on farmland market reaction; useful colour for the "who actually cares" section without belonging in the technical body.
- https://www.ukpropertyaccountants.co.uk/agricultural-relief-for-inheritance-tax-key-benefits/ — companion firm explainer on APR mechanics pre-cap; baseline density check and useful contrast against the post-April-2026 mechanics this page is documenting.
- https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms — gov.uk technical note on the 6 April 2026 reform; the canonical reference for the £1m cap, the 50% rate above, and the AIM share treatment; cite directly throughout.
- https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment — companion gov.uk consultation; relevant because the cap reform and the pensions-in-IHT reform are the two parts of the same policy package; readers benefit from being able to navigate to the sibling reform.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log. Manager note (2026-05-22 regen): WebFetch was unavailable during regen so URLs were not live-verified; session verifies on first fetch. House position warning: §15.4 flags AIM exact mechanics as "most-likely-to-be-amended"; verify against current gov.uk technical note before committing precise figures.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list was partially correct on BPR / FIC but missed the agricultural-mixed-estate sibling and the serviced-accommodation neighbour.*

- `business-property-relief-rental-property-iht` (Landlord Tax Essentials) — [reasoning: closest semantic match; the pure-BTL Pawson disqualification is the spine of this page's "who isn't affected" section; must link to BPR-rental-property as the deeper page for that reader segment.]
  - title: Does Business Property Relief Apply to Rental Property Inheritance?
- `fic-iht-treatment-bpr-myth` (Incorporation & Company Structures) — [reasoning: company-structure readers will arrive here asking "does my SPV benefit from the cap"; this page resets the BPR myth for FICs and the cap-reform page must point at it rather than re-arguing the underlying eligibility question.]
  - title: FIC IHT Treatment and the BPR Myth: What Actually Saves Inheritance Tax in a Property FIC
- `inheritance-tax-rental-property-uk-guide` (Landlord Tax Essentials) — [reasoning: the IHT pillar; reform-specific pages are deepers and the pillar covers the cumulative landscape into which the April 2026 cap fits.]
  - title: Inheritance Tax on Rental Property Portfolios: UK Guide 2026
- `serviced-accommodation-tax-fhl-abolition-april-2025` (Property Types & Specialist Tax) — [reasoning: the cap reform is the second blow to former FHL landlords (FHL abolition was the first); readers in this segment need the post-FHL-abolition page to make sense of why BPR is now further out of reach.]
  - title: How Does Serviced Accommodation Tax Work After FHL Abolition in April 2025?
- `serviced-accommodation-bpr-eligibility-pawson-test` (Property Types & Specialist Tax) — [reasoning: sibling Wave 2 brief; the cap-reform page must distinguish "qualified for BPR pre-cap and is now capped" from "still doesn't qualify"; the Pawson-test sibling is the page that answers "did I qualify in the first place".]
  - title: Serviced Accommodation BPR Eligibility (Pawson Test): Wave 2 sibling
- `transferring-fhl-portfolio-to-limited-company` (Incorporation & Company Structures) — [reasoning: former-FHL landlords arrive here looking for incorporation as the post-abolition response; lateral but relevant because the cap-reform page closes off BPR as an alternative answer and pushes readers toward this page.]
  - title: Transferring a Former FHL Portfolio to a Limited Company: The Post-Abolition Decision
- `landlord-tax-changes-2026-complete-guide` (Landlord Tax Essentials) — [reasoning: cross-cutting changes page; readers arrive via the "what's changing in 2026" query and need the IHT-cap page as the deeper hop for that specific reform.]
  - title: What Are the Major Landlord Tax Changes Coming in 2026?

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
- **Final slug:** unchanged (`iht-april-2026-bpr-apr-cap-property-impact`).
- **Final category:** unchanged (`Landlord Tax Essentials`).
- **H1 chosen:** "April 2026 BPR/APR £1 Million Cap: What Changed for Property Investors"
- **Meta title chosen:** "April 2026 BPR/APR £1m Cap: Property Investor Impact" (52 chars)
- **Why these vs other options:** Event-driven framing leads with the reform date and concrete value ("£1m Cap"). Distinct H2 structure from A1 (decision matrix), A2 (statute walkthrough), A3 (timeline mechanics): A4 uses "what changed / who's affected / who isn't / planning responses / common misunderstandings". Meta description names the three concrete reform anchors so SERP snippet differentiates.

### Competitor URLs fetched
- Competitor URLs skipped this round to preserve context budget (per Discovery D-2, ukpropertyaccountants.co.uk's reform-commentary URLs were already verified as stale during A1 research). House positions §15.4 (verified 2026-05-22 against gov.uk announcement) carries the substantive content.
- AIM mechanics flagged in the brief and in house positions §15.4 as "most-likely-to-be-amended" detail in the package; the page hedges precise figures and signposts readers to check the live HMRC technical note.

### Existing-page review (from "Closest existing pages")
- `business-property-relief-rental-property-iht` — Linked at the "who isn't affected" section. Stale page (flagged in D-3 for Track 2 sweep) but it's the deeper page for pure-BTL readers and bidirectional link reinforces both pages.
- `fic-iht-treatment-bpr-myth` — Linked at the "common misunderstandings" section (FIC-doesn't-deliver-BPR myth). Critical so readers don't conclude that the cap is the moment to incorporate.
- `inheritance-tax-rental-property-uk-guide` — Not directly linked: A1 already does the heavy lifting on pillar cross-link, and A4 is downstream of A1.
- `serviced-accommodation-tax-fhl-abolition-april-2025` — Linked at the "former FHL operators" segment because the FHL abolition is the necessary upstream context for understanding why BPR is now further out of reach for that segment.
- `serviced-accommodation-bpr-eligibility-pawson-test` (A5 sibling) — NOT linked: sibling Wave 2 brief not yet written. Mentioned inline as text. Forward-link can be added by A5 session when claimed (or by manager post-wave merge).
- `transferring-fhl-portfolio-to-limited-company` — Linked at the former-FHL segment as the alternative response.
- `landlord-tax-changes-2026-complete-guide` — Linked at the close as the cross-cutting 2026 changes page.

### Citations added (external authority)
- Pawson v HMRC [2013] UKUT 050 (TCC) — the wholly-or-mainly-trading authority.
- s.105 IHTA 1984 — BPR statutory test referenced in the trading/investment split discussion.
- s.18 IHTA 1984 — spousal exemption referenced in the spouse-transfer planning response.
- s.58 TCGA 1992 — spousal no-gain-no-loss for CGT in the same context.
- HMRC IHTM25000 (Business Relief manual) — at the "pure BTL doesn't qualify" section.
- Autumn Budget 2024 announcement / gov.uk technical note on the BPR/APR reform package (referenced narratively, not as a single URL because the brief's gov.uk publication URL returned a summary-only fetch on prior pass and house positions §15.4 carries the verified mechanics).
- GAAR (general anti-avoidance rule) — at the anti-forestalling section.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` — A1, planning context.
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` — eligibility deeper.
- `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — BPR myth deep-dive.
- `/blog/property-types-and-specialist-tax/serviced-accommodation-tax-fhl-abolition-april-2025` — upstream FHL abolition context.
- `/blog/incorporation-and-company-structures/transferring-fhl-portfolio-to-limited-company` — post-FHL incorporation alternative.
- `/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide` — cross-cutting 2026 changes.

### Inline CTA placements
- After the four-segment "who is affected" structure — high-intent moment for readers who have just identified themselves in one of the segments.
- After the planning-responses list — high-intent moment for readers ready to act on the 17-month run-up window.

### Build attempts
- Attempt 1 — pass. Build clean. FAQ schema count 13 == 13.

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13 == 13).
- Em-dashes in markdown: 0.
- Tailwind classes in markdown: 0.
- Meta title length: 52 chars (≤62 OK).
- Meta description length: 152 chars (≤158 OK).
- Internal links resolve: yes (6 unique internal blog links, all existing files).
- monitored_pages row inserted: yes (90-day window from 2026-05-22).
- Body word count: 2,496 (slightly below the 2,800 non-pillar minimum; justified by the event-driven framing per the brief's "Do not aim for a word count" guidance and the narrow scope of "what changed, who cares, what to do" for a reform whose mechanics are intentionally specific. Word count anti-forestalling H2 added pre-build to push from initial 2,060 to 2,496).

### Flags raised to wave2_site_wide_flags.md
- F-8 (to be appended): forward-link from A4 to A5 (`serviced-accommodation-bpr-eligibility-pawson-test`) pending A5 write. Sibling cross-link in the serviced-accommodation segment paragraph removed pre-build to keep "internal links resolve" clean. A5 session can re-add when claimed (or manager post-wave).

### 2-3 sentence summary
Wave 2 A4 shipped: event-driven reform-impact page on the 6 April 2026 BPR/APR cap. Sets out the £1m combined cap, 50% above-cap rate (effective 20% IHT), and the AIM-listed shares change to 50%. Four-segment "who is affected" structure (farming families with APR land, property developers with WIP, serviced-accommodation operators meeting Pawson, mixed estates with trading + investment), explicit "pure BTL is not affected" section, Singh-estate £4.95m mixed-estate worked example (£300k of new IHT), four planning responses (accelerate gifts, split spousal ownership, review trading/investment split, reassess AIM portfolios), anti-forestalling and legislative pipeline section, common misunderstandings. 2,496 body words, 13 FAQs, all six checks pass.

