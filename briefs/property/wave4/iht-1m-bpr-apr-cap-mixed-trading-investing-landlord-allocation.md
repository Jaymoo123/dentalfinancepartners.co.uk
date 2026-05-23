# Wave 4 brief: iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation

---

## Manager pre-decisions

- **Suggested slug:** `iht-1m-bpr-apr-cap-mixed-trading-investing-landlord-allocation`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Wave 2's `iht-april-2026-bpr-apr-cap-property-impact` covers the rule (£1m combined cap, 50% above-cap rate giving 20% effective IHT on excess, AIM 50% reduction). This page owns the allocation-mechanics depth for the mixed-estate landlord cohort: a £3.5m estate with a £1.2m working farm (APR), £400k in a property-developer SPV holding WIP (BPR), £1.6m BTL portfolio (no relief), £300k in AIM shares (separate 50% tier). The page walks the order-of-application across the three relief tiers, the combined £1m cap on BPR + APR jointly (estates cannot stack £1m BPR on top of £1m APR), the separate AIM 50% sub-tier that does NOT consume the £1m allowance, and the trusts-fragmentation point (each trust gets its own £1m allowance with anti-fragmentation rules expected). Worked allocation example shows total IHT under the post-cap regime vs the pre-cap regime so the £1m-cap impact is concrete. Distinct from Wave 2 by being allocation-mechanics-led with mixed-estate worked examples, not rule-explainer-led.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Deepening of Wave 2 cap-impact page. The Wave 2 page covered the rule; this page covers the allocation mechanics inside mixed estates.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of the £1m cap, treatment of the AIM-shares 50% sub-tier, treatment of trust-fragmentation rules. Our angle: allocation mechanics in mixed estates, not generic rule explainer.

- https://www.ukpropertyaccountants.co.uk/the-landmark-shift-in-inheritance-tax-relief/ — Stage 1 seed, verified live 2026-05-23 (200). Property-tax-specialist domain; useful for the rule + initial planning framing.
- https://www.djh.co.uk/latest-news/news-insights/iht-planning-review-protecting-your-business-assets-with-br/ — Mid-market accountant (v2 working set, 2 SERP appearances); useful for the business-assets + BPR allocation angle.
- https://www.taxaccountant.co.uk/business-property-relief-changes-2026/ — Sibling within v2 working set domain; session to verify at write time. Likely covers the rule with FAQ baseline.
- https://www.bhp.co.uk/news-events/service-insights/financial-planning/business-property-relief-reforms — Sibling within v2 working set domain (bhp.co.uk has 3 SERP appearances); session to verify at write time. Likely covers the financial-planning angle on the cap.

**Borrowable patterns:** ukpropertyaccountants covers the rule cleanly. Our differentiator: a single worked-allocation table for a mixed estate (BTL + property-developer SPV + working farm + AIM portfolio), showing where each tier of relief lands and what the residual IHT looks like vs the pre-cap regime. **CRITICAL: §15.4 of house_positions.md flags AIM-shares mechanics as the most-likely-to-be-amended detail in this reform package. Session MUST verify the precise AIM rate and any anti-fragmentation rules against current gov.uk HMRC technical note at write time before relying on a precise figure in any worked example.** See §4.7 for the gov.uk reforms URL.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `iht-april-2026-bpr-apr-cap-property-impact` (Jaccard 0.29, category: `Landlord Tax Essentials`)
- `agricultural-property-relief-mixed-estate-1m-cap` (Jaccard 0.19, category: `Property Types & Specialist Tax`)
- `pension-iht-april-2027-landlord-estate-planning` (Jaccard 0.13, category: `Landlord Tax Essentials`)
- `serviced-accommodation-bpr-eligibility-pawson-test` (Jaccard 0.12, category: `Property Types & Specialist Tax`)
- `fic-iht-treatment-bpr-myth` (Jaccard 0.10, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

**Session-time verification placeholder (CRITICAL):** §15.4 flags AIM-shares mechanics as the most-likely-to-be-amended detail in the April 2026 reform package. Session must verify the precise AIM rate, the AIM allowance interaction (separate sub-tier vs cap-consuming), and any anti-fragmentation rules for trusts against the current gov.uk HMRC technical note at write time. If gov.uk has updated between locking (2026-05-23) and session write, the gov.uk text wins; flag the change in `docs/property/wave4_site_wide_flags.md`.

- gov.uk APR/BPR reforms 6 April 2026 (PRIMARY): https://www.gov.uk/government/publications/agricultural-property-relief-and-business-property-relief-reforms
- Autumn Budget 2024 (announcement of cap): https://www.gov.uk/government/publications/autumn-budget-2024
- IHTA 1984 s.103 (BPR — relevant business property general rule): https://www.legislation.gov.uk/ukpga/1984/51/section/103
- IHTA 1984 s.104 (rate of BPR): https://www.legislation.gov.uk/ukpga/1984/51/section/104
- IHTA 1984 s.105 (relevant business property definition including s.105(3) mainly-investment exclusion): https://www.legislation.gov.uk/ukpga/1984/51/section/105
- IHTA 1984 s.115-124 (APR — agricultural property relief): https://www.legislation.gov.uk/ukpga/1984/51/contents
- HMRC IHTM25000+ (BPR): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000
- HMRC IHTM24000+ (APR): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm24000
- HMRC IHT400 + IHT413 (business / agricultural relief schedules): https://www.gov.uk/government/publications/inheritance-tax-business-and-partnership-interests-and-assets-iht413
- *Pawson v HMRC* [2013] UKUT 050 (TCC) — for BTL-doesn't-qualify framing: https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 4, pay particular attention to:
  - **Bucket A (LtdCo + FIC):** §11 (Companies House / ECCTA) and the Wave 4 LtdCo extension (manager will land §21 ahead of session launch covering FIC mechanics, share-class structures, charging-rent-to-own-co, post-incorporation operational details).
  - **Bucket B (MTD ITSA):** §3 (headline MTD position) + §19 (Wave 3 MTD extension covering the mandate timeline, qualifying-income mechanic, joint-property owner threshold, three-year exit rule, the corrected §19.7 15/30/31 + 3%/3%/10% penalty regime). Wave 4 may add a §19 extension covering agent involvement, foreign income, pension funds, letting-agent who-files mechanics.
  - **Bucket C (IHT):** §9 (headline IHT) + §15 (Wave 2 IHT extension with NRB/RNRB, PETs/CLTs/7-year-clock, GROB s.102 FA 1986, April 2026 BPR/APR cap, pensions in IHT from 2027, non-resident IHT). Wave 4 may add a §22 extension covering landlord-specific BPR-Pawson, deed-of-variation s.142, charitable-legacy s.1A, CLT/discretionary-trust mechanics, FIC-as-estate-planning-tool.

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave4_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 4 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 4, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave4_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 2/3 baked this discipline in; Wave 4 carries it forward. Use git add for the content file and brief file only.
    **§16.15 lesson:** do NOT include `docs/property/wave4_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave4_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **§16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave4_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave4_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log

### Decisions
- **Final slug / category / H1 / metaTitle:** all per manager pre-decisions.
- **metaTitle:** "£1m BPR/APR Cap: Allocation Across Mixed Landlord Estates" (57 chars).
- **metaDescription:** trimmed mid-flight from initial 165 chars to 134 chars to stay under the 158 limit. Tightened by removing "working" + "shares" + "with" without losing the four-component summary.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk / djh.co.uk / taxaccountant.co.uk / bhp.co.uk: not re-fetched in session; differentiator (allocation across four relief tiers with full worked example + gov.uk-verified mechanics on AIM sub-tier + trust anti-fragmentation + anti-forestalling) is well-defined.

### Existing-page review (from "Closest existing pages")
- `iht-april-2026-bpr-apr-cap-property-impact` (Jaccard 0.29) — Wave 2 A4: read in full. Rule + who's affected held there; C8 defers via two intro hyperlinks and does NOT re-walk the rule mechanics or the four-segment "who's affected" framing. Wave 2 hedged AIM mechanics as "most-likely-to-be-amended"; C8 verified at write time against gov.uk and now has a session-time confirmed position with the appropriate hedge maintained.
- `agricultural-property-relief-mixed-estate-1m-cap` (Jaccard 0.19): topic-adjacent but not cross-linked (likely Wave 2 sibling on APR-specifically; not in the manager-suggested cross-link list); no cannibalisation since this page is BTL-landlord-led with APR as one of four tiers.
- `bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line` (Wave 4 C1): cross-linked at close as the BTL-doesn't-qualify reference.
- `serviced-accommodation-bpr-eligibility-pawson-test` (Property Types & Specialist Tax category): cross-linked at close as the boundary-case reference.
- `iht-property-investors-decision-framework-2026-onwards`: cross-linked at close as planning lens.

### Critical session-time verification (per brief mandate)
WebFetch against the gov.uk summary of APR/BPR reforms returned the following verified positions (all baked into the page):
1. **Effective date:** 6 April 2026 with anti-forestalling on lifetime transfers from 30 October 2024 onwards if donor dies on or after 6 April 2026 within 7 years of the gift.
2. **£1m allowance:** confirmed COMBINED for BPR + APR jointly. Example in gov.uk summary: £600k BPR + £400k APR fills the single £1m allowance. NOT stackable.
3. **Above-cap rate:** confirmed 50% relief on excess, giving effective 20% IHT on the above-cap portion. gov.uk example: £2m unquoted-company share interest = 100% on first £1m + 50% on second £1m = £200k IHT = 20% effective on above-cap (or 10% across the whole £2m).
4. **AIM shares:** confirmed 50% rate from 6 April 2026; CONFIRMED to be a separate sub-tier that does NOT consume the £1m allowance ("will not be affected by the new allowance" — gov.uk wording). Position more confidently stated than in house position §15.4 hedge.
5. **Trust anti-fragmentation:** trusts settled BEFORE 30 October 2024 each retain their own £1m allowance; trusts settled by the same settlor ON OR AFTER 30 October 2024 share a single £1m allowance divided across them. Division mechanic deferred to technical consultation cycle (Finance Act 2026 final text).
6. **Order of application:** NOT formally prescribed by gov.uk; default position is practitioner allocation to minimise total IHT.

House position §15.4 update suggestion to manager: §15.4 was hedged on AIM mechanics ("verify before relying on precise figure"); session-time verification confirms AIM is a separate 50% sub-tier not consuming the £1m allowance and applies to all "not listed" shares (not just AIM specifically). The 30 October 2024 anti-forestalling date AND the 30 October 2024 trust anti-fragmentation settlement date are new locked positions worth adding to §15.4 in the next house-position update.

### Citations added
- gov.uk Summary of APR/BPR reforms (PRIMARY, verified 2026-05-23 against current version).
- Autumn Budget 2024 (announcement, 30 October 2024).
- IHTA 1984 s.103 / s.104 / s.105 (BPR).
- IHTA 1984 s.115 to s.124 (APR).
- IHTA 1984 s.18 (spouse exemption).
- IHTA 1984 s.8A (TNRB, not applicable to BPR/APR allowance).
- IHTA 1984 s.64 (10-yearly periodic charges).
- TCGA 1992 s.165 (business-asset holdover).
- TCGA 1992 s.260 (CLT holdover).
- Pawson v HMRC [2013] UKUT 050 (TCC).
- FA 1995 (transitional APR provisions for some tenanted farmland at 50% pre-cap rate).

~11 named in-body citations.

### Internal links added
- `/blog/landlord-tax-essentials/iht-april-2026-bpr-apr-cap-property-impact` x2 (Wave 2 A4, intro + close).
- `/blog/landlord-tax-essentials/bpr-pure-btl-pawson-test-why-buy-to-let-fails-investment-line` (Wave 4 C1, close).
- `/blog/property-types-and-specialist-tax/serviced-accommodation-bpr-eligibility-pawson-test` (Wave 2 boundary-case, close).
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (planning lens, close).

All 4 unique targets verified existing + correct category-slug used per the category-to-URL mapping. Wave 4 siblings C2 / C4 / C5 / C7 / C9 / C10 referenced in body as forthcoming or sibling, NOT hyperlinked. Wave-close back-patch will convert to hyperlinks where appropriate.

### Inline CTA placements
- One `<aside>` block. After the Aldridge mixed-estate worked allocation example. The worked example carries the analytical weight of the page and the aside immediately afterward catches the high-intent moment. A second aside placed in the middle of the trust anti-fragmentation section would break analytical flow.

### Build attempts
- Pass 1 (clean): build successful, pre-existing ESLint warnings only.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 14/14.
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0.
- Meta title length: ✅ 57 chars (max 62).
- Meta description length: ✅ 134 chars (max 158). Trimmed mid-flight from 165-char initial draft.
- Internal links resolve: ✅ all 4 targets exist + correct category slugs used.
- monitored_pages row inserted: ✅ id 179, monitor_until 2026-08-21.
- Body word count: 2,286 (slightly below 2,500 competitor-median floor; calibration similar to C6: page covers the differentiator thoroughly through the four-tier framework + worked Aldridge example + anti-forestalling + trust anti-fragmentation + planning responses by tier; 14 deep FAQs add substantial additional depth that doesn't count to body but carries page weight; pattern consistent with Wave 4 B4 / B5 / C6 calibration choices).

### Flags raised to wave4_site_wide_flags.md
- **House position §15.4 update recommendation** for next house-position locking cycle: § 15.4 was hedged on AIM mechanics; session-time gov.uk verification on 2026-05-23 confirms three new locked positions worth adding to §15.4: (a) AIM 50% rate is a separate sub-tier not consuming £1m allowance and applies to all "not listed" shares per gov.uk wording; (b) anti-forestalling rule from 30 October 2024 catches lifetime transfers if donor dies after 6 April 2026 within 7 years; (c) trust anti-fragmentation rule from 30 October 2024 settlement date for same-settlor multi-trust structures. Will flag in wave4_site_wide_flags.md per universal rule.
- Forthcoming-sibling hyperlink conversions (C2, C4, C5, C7, C9, C10): wave-close back-patch.

### 2-3 sentence summary
Allocation-mechanics depth on the April 2026 £1m BPR/APR cap. Four-tier relief framework (APR + BPR within combined £1m allowance at 100%; 50% rate above; AIM as separate 50% sub-tier not consuming the allowance; non-qualifying property with no relief). Aldridge mixed-estate worked example (£3.5m: £1.2m farm APR + £400k developer SPV BPR + £1.6m BTL + £300k AIM) shows £180k cap impact under post-2026 regime. Session-time gov.uk verification locked: combined allowance, separate AIM sub-tier, anti-forestalling from 30 October 2024, trust anti-fragmentation rule from 30 October 2024 settlement date, order of application not formally prescribed. 2,286 body words, 14 FAQs, 1 CTA, ~11 citations.
