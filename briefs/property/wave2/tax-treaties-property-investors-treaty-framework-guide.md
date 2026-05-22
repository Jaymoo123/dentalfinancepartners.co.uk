# Wave 2 brief: tax-treaties-property-investors-treaty-framework-guide

**Site:** property
**Bucket:** Double Taxation Agreements (DTAs)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/tax-treaties-property-investors-treaty-framework-guide.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/tax-treaties-property-investors-treaty-framework-guide

---

## Manager pre-decisions

- **Suggested slug:** `tax-treaties-property-investors-treaty-framework-guide`
- **Suggested category:** `non-resident-landlord-tax`
- **Bucket:** Double Taxation Agreements (DTAs)
- **Framing differentiator (READ THIS CAREFULLY — defines what makes this page distinct):**

> Pillar page for how Double Taxation Agreements (DTAs / tax treaties) interact with UK property ownership by non-residents. OECD Model 2017 framework: Art 4 residence tie-breaker, Art 6 immovable property (situs state has primary taxing rights), Art 13 capital gains (NRCGT applies as statutory override regardless of treaty), Art 23 elimination methods. Critical clarification: treaties don't eliminate UK tax on UK property; they allocate taxing rights and provide credit relief. Distinct from our existing NRL-scheme guide which covers the statutory withholding regime — this is the treaty-framework counterpart.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (use as primary research starting points; fetch + read yourself)

- https://uklandlordtax.co.uk/tax-guide/double-tax-agreements-dtas/ — landlord-facing DTA guide; useful for the article-allocation framing readers expect.
- https://www.landlordstax.co.uk/dont-pay-twice-an-introduction-to-tax-treaties/ — short introduction; sets a useful baseline of explanation density for the pillar.
- https://www.gov.uk/government/collections/tax-treaties — the gov.uk treaty hub itself; treat as a structural map (the country list) and link to it as the canonical "find your treaty" reference.
- https://www.gov.uk/hmrc-internal-manuals/international-manual/intm150000 — HMRC INTM entry to the double-taxation-agreements chapter; the authoritative outline of how the UK applies its treaties.
- https://www.gov.uk/government/publications/non-residents-relief-under-double-taxation-agreements-hs304-self-assessment-helpsheet — HMRC HS304; the practical claim helpsheet, useful both as authority and as a structural reference for what the page should equip the reader to do.

> Fetch each one with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read what they actually have. If a URL is poor quality, do your own targeted search and document what you used in the work log.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages on our site (cannibalisation context)

*Identified by Opus reasoning on the full 316-page Property inventory (2026-05-22 regen pass), not by token similarity. Token-scored list discarded because it returned unrelated AIA/VAT pages.*

- `non-resident-landlord-scheme-uk-complete-guide` (Non-Resident Landlord Tax) — [reasoning: the NRL pillar; the framing differentiator for this page explicitly positions it as the "treaty-allocation counterpart" to the NRL statutory withholding regime, so this page must link out to NRL and clarify the boundary.]
  - title: Non-Resident Landlord Scheme UK: Complete Guide for Overseas Property Investors
- `uk-property-income-expats-tax-obligations-explained` (Non-Resident Landlord Tax) — [reasoning: expat-landlord obligations pillar; the framework page on tax treaties is the natural deeper hop for any reader who arrived via the "I'm an expat, what do I owe?" question.]
  - title: UK Property Income for Expats: Tax Obligations Explained
- `non-resident-cgt-uk-property-rates-reporting` (Non-Resident Landlord Tax) — [reasoning: NRCGT rates page; this brief covers Art 13 capital gains, which treaty allocates to UK but UK statute imposes regardless, so the framework page references NRCGT as the operational reality.]
  - title: Non-Resident CGT on UK Property: What Are the Rates and Reporting Requirements?
- `non-resident-cgt-selling-uk-property-overseas-guide` (Non-Resident Landlord Tax) — [reasoning: NRCGT applied / scenario version; readers using this framework page to plan a sale need the operational deeper page.]
  - title: Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026
- `nrl-withholding-tax-20-percent-basic-rate-deduction` (Non-Resident Landlord Tax) — [reasoning: the 20% statutory withholding page; framing differentiator says treaties don't displace NRL, so this page is the concrete demonstration of that point.]
  - title: NRL Withholding Tax: How the 20% Deduction Works (2026 Guide)
- `non-resident-landlord-self-assessment-filing-requirements` (Non-Resident Landlord Tax) — [reasoning: the self-assessment side of NRL; the framework page lands the reader on SA106 / HS304 territory and this is the operational neighbour.]
  - title: Non-Resident Landlord Self Assessment: UK Filing Requirements (2026/27)
- `sdlt-non-resident-2-percent-surcharge` (Non-Resident Landlord Tax) — [reasoning: pure-UK SDLT surcharge for non-resident purchasers; lateral neighbour worth one nod because some readers arrive thinking treaties might displace SDLT (they don't).]
  - title: The 2% Non-Resident SDLT Surcharge: Residence Test, Surcharge Stack, and Refund Route

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
- **Final slug:** unchanged: `tax-treaties-property-investors-treaty-framework-guide`
- **Final category:** unchanged: `Non-Resident Landlord Tax` (URL segment `non-resident-landlord-tax`)
- **H1 chosen:** "UK Tax Treaties for Property Investors: The Framework Guide"
- **Meta title chosen:** "UK Tax Treaties for Property Investors: Framework Guide" (55 chars)
- **Why these vs other options:** Pillar framing is the explicit differentiator vs the NRL statutory guide. Title leads with "UK Tax Treaties for Property Investors" (primary query stem) and tags "Framework Guide" to claim pillar status. Avoided "Complete Guide" which is the legacy DeepSeek template phrase.

### Competitor URLs fetched
- uklandlordtax.co.uk/tax-guide/double-tax-agreements-dtas/ — 1,931 words but only "Overview" + nav cruft. Useful confirmation that competitors don't go deep on the OECD article framework. No worked examples, no NRCGT override note.
- landlordstax.co.uk/dont-pay-twice... — 943 words. Cleanly states "UK always has first taxing rights on income and gains from Land and Buildings situated in the UK". Useful baseline plain-English framing but no article-level detail.
- gov.uk/government/collections/tax-treaties — canonical country directory. Linked as the place to find your specific bilateral text.
- gov.uk/hmrc-internal-manuals/international-manual/intm150000 — INTM150000 index page. Useful as "if you want to go deeper read the manual". Linked.
- gov.uk HS304 helpsheet — practical claim form for non-resident relief. Linked as the operational claim mechanism.

### Existing-page review (from "Closest existing pages")
- `non-resident-landlord-scheme-uk-complete-guide` — 76-line legacy DeepSeek page on the statutory NRL withholding scheme. Framing differentiator separates cleanly: this page is the treaty-allocation counterpart. Linked bidirectionally; no body overlap.
- `non-resident-cgt-uk-property-rates-reporting` — 138-line legacy page on NRCGT rates and 60-day reporting. This page references it from §5 (Article 13) and links once.
- `nrl-withholding-tax-20-percent-basic-rate-deduction` — applied 20% withholding page. Linked from §7 (Why NRL is statutory).
- `uk-property-income-expats-tax-obligations-explained` — broad expat overview; linked from final hand-off section.
- `non-resident-landlord-self-assessment-filing-requirements` — operational SA filing page; linked from §10.
- `sdlt-non-resident-2-percent-surcharge` — different tax, lateral reference for the "treaty does not displace SDLT" point in FAQ 11.
- `non-resident-cgt-selling-uk-property-overseas-guide` — applied disposal page; not directly linked (siblings have it covered); flagged as a back-link candidate.

### Citations added (external authority)
- OECD Model Tax Convention 2017 (oecd.org)
- gov.uk tax treaties hub
- HMRC International Manual INTM150000
- HMRC HS304 helpsheet
- TIOPA 2010 (legislation.gov.uk)
- TCGA 1992 (legislation.gov.uk, for s.1A / Sch 1A-1B-4AA reference)

### Internal links added (to our existing pages)
- `/blog/non-resident-landlord-tax/non-resident-cgt-uk-property-rates-reporting` — operational NRCGT rates from §5
- `/blog/non-resident-landlord-tax/non-resident-landlord-scheme-uk-complete-guide` — NRL statutory pillar from §7 and the hand-off list
- `/blog/non-resident-landlord-tax/nrl-withholding-tax-20-percent-basic-rate-deduction` — 20% withholding mechanics from §7
- `/blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements` — SA filing from §10
- `/blog/non-resident-landlord-tax/uk-property-income-expats-tax-obligations-explained` — broad expat overview from hand-off
- `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge` — SDLT layer from hand-off

### Inline CTA placements
- After §1 (What a tax treaty actually does) — landed the central "treaty answers happen in two places" point; high-intent moment for readers realising they need framework-level help.
- After §4 (Article 6 immovable property) — landed the situs-state allocation; this is where overseas-resident readers turn to needing UK-side help.
- After §10 (How to claim treaty relief: HS304, SA106, MAP) — MAP time-limit framing is high urgency; ideal terminal CTA before the hand-off section.

### Build attempts
- Attempt 1 — pass. `next build` clean. Required `npm install` first in worktree (missing node_modules).

### Verification
- FAQ schema count in built HTML matches frontmatter: yes (13/13)
- Em-dashes in markdown: 0
- Tailwind classes in markdown: 0
- Meta title length: 55 chars
- Meta description length: 146 chars
- Internal links resolve: yes (all six)
- monitored_pages row inserted: yes
- Body word count: 3,939 (pillar range 3,500-4,500 per §9 NETNEW_PROGRAM)

### Flags raised to wave2_site_wide_flags.md
- INTERNAL_LINK candidate: existing `non-resident-landlord-scheme-uk-complete-guide` could add a forward-link to this new framework page in its "Related guides" area. Defer to orchestrator (not a session-side fix on legacy page).
- SITE_TEMPLATE em-dash: built HTML has one em-dash in the header brand-wordmark area ("Accountants UK — Get your property tax sorted"). Affects every site page, not this page's content. Flagging once for the wave; not blocking.

### 2-3 sentence summary
B1 framework pillar shipped at 3,939 body words / 13 FAQs covering the OECD Model 2017 article map (Art 4 / 6 / 13 / 23 / 24 / 25), the UK statutory overrides (NRCGT under TCGA 1992 s.1A and Schedules 1A/1B/4AA, NRL withholding under FA 1995 Sch 23 and SI 1995/2902), the credit-vs-exemption methods under TIOPA 2010, and the practical HS304 / SA106 / MAP claim routes. A Marco-in-Dubai worked example illustrates the no-tax-jurisdiction asymmetry without overlapping the dedicated UK-UAE bilateral page (B6). The page positions itself as the head of the bilateral cluster (B2-B10) and links bidirectionally with the statutory NRL guide to enforce the "treaty allocates, statute charges" frame.

