# Wave 4 brief: charging-market-rent-to-own-property-company-tax-treatment

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/charging-market-rent-to-own-property-company-tax-treatment.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/charging-market-rent-to-own-property-company-tax-treatment

---

## Manager pre-decisions

- **Suggested slug:** `charging-market-rent-to-own-property-company-tax-treatment`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Charging rent to your own property company as an **extraction route compared head-on against salary and dividends**, with the connected-party defence pack as the load-bearing operational mechanic. Rent received is property-income for the individual under ITTOIA 2005 s.272 (s.24 finance-cost restriction applies as for any landlord), deductible for the SPV under CTA 2009 s.54. The mechanic this page owns is the §21.3 evidence-pack discipline that survives an HMRC enquiry: independent valuer letter, comparable local listings dated at lease start, formal written lease, periodic annual review minuted, payment trail through the company bank account. Transfer-pricing risk under TIOPA 2010 Pt 4 is usually parked by the SME exemption (s.166) but the page must flag the threshold (250 staff or €50m turnover) and the consequences if breached. This page is the rent-vs-salary-vs-dividend marginal comparison; it does NOT recompute generic salary-vs-dividend mix (defer to A5).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Operational mechanic specific to property SPVs; common question without dedicated coverage on our site.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

**Stage 1 seed URL status:** `boltburdon.co.uk/blogs/sweet-deal-corporate-wrappers-property-investors-structuring-investments-spv` could not be verified at Stage 2 (TLS handshake blocked, probable Cloudflare bot-protection variance, not a confirmed 404). Stage 2 retains it as a session-time fetch candidate (browser User-Agent should succeed) and adds 3 verified siblings as primary references.

- https://www.boltburdon.co.uk/blogs/sweet-deal-corporate-wrappers-property-investors-structuring-investments-spv — **STAGE 1 SEED retained, verification deferred to session.** Bolt Burdon is a London property law firm; per v2 universe + dispatch brief, strong on corporate-wrapper + SPV structuring; useful for the lease-formality angle this page leads with. If the URL stays blocked at session-time fetch, drop and substitute with another taxaccountant.co.uk or ukpropertyaccountants.co.uk sibling.
- https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ — VERIFIED ALIVE 2026-05-23. Has a section on intra-group / connected-party transactions relevant to the SPV-rent scenario; useful for FAQ patterns on "can I let my own house to my company".
- https://www.ukpropertyaccountants.co.uk/how-to-set-up-and-manage-a-family-investment-company/ — VERIFIED ALIVE 2026-05-23. Covers connected-party transactions inside the FIC framework, including the connected-tenancy question that overlaps the s.18N CIHC carve-out.
- https://www.ukpropertyaccountants.co.uk/how-much-tax-will-i-pay-if-i-buy-a-property-through-a-family-investment-company/ — VERIFIED ALIVE 2026-05-23. Useful for the "company owns it" vs "I own it, let to company" decision-comparison context. Anti-templating note: this competitor leans into the FIC-purchase angle; do NOT replicate. Stay on the personal-let-to-own-company mechanic.
- https://uklandlordtax.co.uk/your-btl-limited-company-and-directors-loan-account/ — VERIFIED ALIVE 2026-05-23. Cross-link for the rent-as-DLA-credit interaction (rent paid to founder personally is not DLA, but rent paid to a credit-balance DLA is a useful comparison the page should disambiguate).

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline, FAQ block, worked examples (rent amount + s.24 impact on individual + corporation-tax saving for company), citation density (s.272, s.54, TIOPA Pt 4, transfer-pricing manual), component patterns (comparison tables between rent / salary / dividend extraction). Borrow outline-shape, NOT figures or sentences. If Bolt Burdon stays blocked, log in `wave4_site_wide_flags.md` and continue.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `family-investment-company-property-worth-it` (Jaccard 0.20, category: `Incorporation & Company Structures`)
- `how-to-transfer-property-into-limited-company-uk` (Jaccard 0.20, category: `Incorporation & Company Structures`)
- `cgt-property-transfer-limited-company-calculate` (Jaccard 0.18, category: `Capital Gains Tax`)
- `how-to-choose-right-property-company-structure-uk-landlords-2026` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `how-to-set-up-property-investment-company-uk-guide` (Jaccard 0.18, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite.

- [ITTOIA 2005 s.272 (rental income basis)](https://www.legislation.gov.uk/ukpga/2005/5/section/272)
- [CTA 2009 s.54 (deductions: wholly and exclusively rule)](https://www.legislation.gov.uk/ukpga/2009/4/section/54)
- [TIOPA 2010 Pt 4 (transfer pricing framework)](https://www.legislation.gov.uk/ukpga/2010/8/part/4)
- [TIOPA 2010 s.166 (SME exemption from transfer pricing)](https://www.legislation.gov.uk/ukpga/2010/8/section/166)
- [HMRC INTM412050+ (transfer-pricing, connected-party transactions, International Manual)](https://www.gov.uk/hmrc-internal-manuals/international-manual/intm412050)
- [HMRC INTM412080 (the SME exemption test, head-count + balance-sheet)](https://www.gov.uk/hmrc-internal-manuals/international-manual/intm412080)
- [HMRC PIM2068 (rent paid by a connected party — landlord's perspective)](https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2068)
- [CTA 2010 s.18N (CIHC qualifying-purpose carve-out, applies because connected-tenancy is the boundary)](https://www.legislation.gov.uk/ukpga/2010/4/section/18N)
- [HMRC BIM37000+ (BIM coverage of close-investment-holding-company test, Business Income Manual)](https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim37000)
- [HMRC SDLTM (Stamp Duty Land Tax Manual) on lease consideration — relevant if the personal-to-company lease attracts SDLT](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual)

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

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted:
- Body word count:

### Flags raised to wave4_site_wide_flags.md

### 2-3 sentence summary
