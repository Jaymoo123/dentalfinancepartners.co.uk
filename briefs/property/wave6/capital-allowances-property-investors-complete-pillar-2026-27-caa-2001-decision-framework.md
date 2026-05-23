# Wave 6 brief: capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new pillar page (supersedes legacy `landlord-capital-allowances-tax-relief`; recommend redirect at post-launch hygiene)
**Source markdown path on launch:** `Property/web/content/blog/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework

---

## Manager pre-decisions

- **Suggested slug:** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Cluster pillar organised as a four-axis decision framework: claimant type (investor-individual / individual-FHL-grandfathered / LtdCo-investor / LtdCo-developer-trading) crossed with property type (residential / commercial / HMO / mixed-use / former-FHL) crossed with expenditure type (P&M / integral features / SBA structure / land-remediation / FYAs). Frames the four primary vehicles (AIA s.51A £1m permanent, Main Pool WDA 18% reducing balance, Special Rate Pool WDA 6% reducing balance, SBA s.270AA 3% straight-line over 33⅓ years) plus the in-force FYAs (full expensing s.45S company-only 100%, 50% special-rate FYA companion, EV charging point s.45EA, low-emission car s.45D, special tax site s.45O). The single most-load-bearing reader insight: residential lets do NOT qualify for plant and machinery allowances (CAA 2001 s.35 dwelling-house restriction), except in narrowly defined common parts of multi-let buildings — this is the cluster's central misconception and the page must establish it early. Pillar role: every other C-bucket page (C2 disposal mechanics, C3 SBA depth, C4 AIA + association rules, C5 full expensing, C6 fixtures + s.198, C7 HMO common parts, C8 FHL post-abolition, C9 LRR 150%, C10 super-deduction clawback) links back here for the decision-tree spine. Replaces legacy `landlord-capital-allowances-tax-relief` (which is pre-FA-2025, pre-FA(No.2)2023 permanent AIA, and pre-full-expensing-permanence).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pillar is the cluster spine — write FIRST in C-branch so C2 through C10 can forward-link to it cleanly. §16.32 sequencing: no upstream dependency. Recommend the post-launch hygiene queue includes a redirect rebuild for the 12 legacy CA-named blog files (the existing `landlord-capital-allowances-tax-relief` is already in middleware at line 53; recommend repointing to C1 + adding new redirects from the other 11 CA-named slugs to C1 — manager decision deferred to post-launch).

**Pool-thinness disclosure:** Bucket C synthesises from CAA 2001 architecture (Parts 2 + 2A + 6A) rather than mirroring sparse competitor slugs. C1 is the cluster's organising frame, so synthesis quality matters more than competitor coverage. Do not back-fill with weak competitor patterns; lean on §25.1-§25.10 of house_positions.md as the working detail.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL, fetch with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})`, parse with `BeautifulSoup(html, "lxml")`. Extract H2/H3 outline, treatment of the s.35 dwelling-house restriction (most competitors omit it), treatment of FYA vs AIA vs SBA decision pathways, worked example density. Pillar differentiator value is on the decision framework completeness + the s.35 misconception correction + the up-to-date 2026/27 figures (£1m AIA permanent, 3% SBA, full expensing permanent, FHL abolition reflected).

- https://www.uklandlordtax.co.uk/capital-allowances/ — verified live 2026-05-23 (200). Mid-market accountant; useful for typical reader framing on landlord-side capital allowances and the dwelling-house question.
- https://www.icaew.com/technical/tax/capital-allowances/full-expensing — verified live 2026-05-23 (200). Professional body technical pages; good for citation density and the company-only framing on s.45S.
- https://www.icaew.com/technical/tax/capital-allowances/structures-and-buildings-allowance — verified live 2026-05-23 (200). Useful for SBA rate history, the 29 October 2018 gate, and the allowance-statement requirement framing.
- https://www.icaew.com/technical/tax/capital-allowances/annual-investment-allowance — verified live 2026-05-23 (200). Useful for the £1m permanent positioning post-FA(No.2)2023.
- https://www.evelyn.com/insights-and-events/insights/capital-allowances/ — verified live 2026-05-23 (200). Big-firm advisory perspective; useful for the overarching decision framework framing.

**Borrowable patterns:** ICAEW citation density is the gold standard; mirror their statutory-cite discipline. Evelyn's decision-framework framing supports the four-axis structure of this pillar. uklandlordtax FAQ pattern is reader-friendly for the s.35 misconception correction. Do not duplicate any competitor's worked example figures verbatim; we use anonymised personas across all C-bucket pages and vary figures.

---

## GSC data

*This is a net-new pillar; the legacy `landlord-capital-allowances-tax-relief` page has GSC history but C1 is a structural replacement, not a rebuild. Primary topical queries expected: "capital allowances property", "landlord capital allowances", "do landlords qualify for capital allowances", "capital allowances residential property", "capital allowances commercial property uk 2026". GSC monitoring on C1 begins at launch via monitored_pages registration in step 13.*

---

## Closest existing pages (cannibalisation context)

- `landlord-capital-allowances-tax-relief` (category: `section-24-and-tax-relief`) — legacy pillar predecessor. C1 supersedes structurally. Recommend post-launch redirect from this slug to C1.
- `capital-allowances-on-property` (category: `landlord-tax-essentials`) — partial pillar overlap; older framing. C1 absorbs.
- `capital-allowances-commercial-property-what-can-claim` — commercial-only entry-level. C1 cross-links as the commercial-specific entry; C6 (fixtures) is the deeper sibling.
- `aia-capital-allowances` + `aia-capital-allowance-property-landlords` + `aia-allowance-uk-property-investors` + `capital-allowance-aia-property-landlords` + `what-is-aia-in-tax` + `can-you-claim-aia-on-second-hand-assets` — six legacy AIA-named pages, all pre-FA(No.2)2023 framing. C4 supersedes for AIA depth; C1 links to C4 for the £1m permanent + associated-companies mechanic.
- `full-expensing-capital-allowances` (category: `property-types-and-specialist-tax`) — current-regime predecessor. C5 supersedes with property-specific carve-outs; C1 links to C5.
- `integral-features-capital-allowances` — special-rate-pool 6% page. C1 links as the special-rate sub-mechanic anchor.
- `capital-allowances-examples` — examples-only; C1 absorbs via worked decision-tree examples.

**Cannibalisation discipline:**
- C1 is the pillar; the closest-existing pages above are applied/scenario or single-mechanic legacy content. C1's role is to be the decision-tree anchor that ALL related pages reference.
- Do not duplicate the AIA £1m worked figures from `aia-capital-allowances` verbatim; C1 uses one summary worked decision-tree example, and C4 owns the AIA-depth worked allocations.
- Do not duplicate the fixtures worked example from `capital-allowances-commercial-property-what-can-claim`; that is C6's territory.
- Do not duplicate the integral features list from `integral-features-capital-allowances`; cite s.33A and link out.

---

## Redirect overlap (on launch)

- Middleware line 53: `landlord-capital-allowances-maximizing-tax-relief` → `landlord-capital-allowances-tax-relief` (category-routed). Recommend POST-LAUNCH manager-arbitrated update of this chain to point at C1. Flag in `wave6_site_wide_flags.md` for manager merge decision; do NOT edit middleware on initial C1 launch (the legacy page should stay live until manager arbitrates the legacy-redirect cleanup at wave-end).
- No other middleware overlap requires edit on this page's initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.15 (qualifying activities; post-FA-2025 omission of s.15(1)(c) and (da) for FHL): https://www.legislation.gov.uk/ukpga/2001/2/section/15
- s.35 (dwelling-house exclusion; the cluster's central misconception): https://www.legislation.gov.uk/ukpga/2001/2/section/35
- s.33A (integral features, special-rate 6%): https://www.legislation.gov.uk/ukpga/2001/2/section/33A
- s.39 (FYA gateway): https://www.legislation.gov.uk/ukpga/2001/2/section/39
- s.45S (full expensing for companies, 100% main-rate from 1 April 2023, permanent): https://www.legislation.gov.uk/ukpga/2001/2/section/45S
- s.51A (AIA £1m permanent from 1 April 2023): https://www.legislation.gov.uk/ukpga/2001/2/section/51A
- s.270AA (SBA 3% straight-line, 29 October 2018 gate): https://www.legislation.gov.uk/ukpga/2001/2/section/270AA

**HMRC manuals:**
- CA21010 (P&M general): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca21010
- CA22020 (integral features list): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca22020
- CA23080 (AIA): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23080
- CA23230 (full expensing): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23230
- CA90000 (SBA): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca90000

**gov.uk public:**
- Capital allowances landing: https://www.gov.uk/capital-allowances
- AIA detail: https://www.gov.uk/capital-allowances/annual-investment-allowance
- SBA detail: https://www.gov.uk/capital-allowances/structures-and-buildings
- FYAs detail: https://www.gov.uk/capital-allowances/first-year-allowances

**Cross-references in house_positions.md:** §25.1 (qualifying activity gateway; post-FA-2025 FHL absorption), §25.2 (P&M, integral features, fixtures), §25.3 (AIA £1m), §25.4 (SBA), §25.5 (FYAs including s.45S full expensing), §25.6 (disposal mechanics), §25.7 (FHL transitional FA 2025 Sch 5), §25.8 (recent reforms verification anchors), §25.10 (do-not-write list — memorise).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (rates, allowances, deadline-days, thresholds) against current gov.uk and legislation.gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. The CAA 2001 cluster has multiple time-sensitive figures (£1m AIA permanent 1 April 2023, 3% SBA from 1 April 2020, full expensing permanence Autumn Statement 2023 confirmation, FHL abolition 1 April / 6 April 2025) — re-verify each.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific landlord / portfolio / tribunal names.

### Lead-gen architecture (global CSS; you write placement, not styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments (match where relevant in FAQs): Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 2-3 inline `<aside>` CTAs at high-intent moments. Pillar-specific conversion moments:
  - After the s.35 dwelling-house misconception correction (reader has just learned residential lets do NOT qualify — strong intent for portfolio review)
  - After the decision-tree section (reader is ready to act on their specific scenario)
  - After the FHL post-abolition section (former-FHL operators need professional review urgently)
- Avoid: opening the page with an aside; placing an aside inside a worked example; >3 asides total.
- Vary the opening sentence per page; do NOT pattern-match prior C-bucket openings or generic "Capital allowances are a valuable relief..." templates.

### Schema
- FAQs live in frontmatter `faqs:` array. Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 12-14 FAQs (pillar deserves the full range).

### Cannibalisation
- The "Closest existing pages" section above shows the legacy CA cluster. **Read each before writing**. Decide that C1 is the new pillar and the legacy pages become applied / single-mechanic citations from C1.
- Do not duplicate worked numerical examples verbatim across the C-bucket; vary figures, scenarios, personas.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** For Wave 6 Bucket C, **§25.1-§25.10 is your primary locked position** (locked 2026-05-23). Threading for the pillar:
  - §25.1 — qualifying activity s.15 / s.270CA (FHL absorption from 1 April / 6 April 2025)
  - §25.2 — plant and machinery allowances (s.21 buildings exclusion, s.22 structures exclusion, s.23 + List C carve-back, s.33A integral features, s.198 fixtures election, s.83 short-life asset election, s.35 dwelling-house restriction)
  - §25.3 — AIA £1m permanent (s.51A), associated-company sharing (ss.51B-51N)
  - §25.4 — SBA 3% straight-line, 29 October 2018 gate, s.270CF residential exclusion, s.270IA allowance statement, no-balancing-event-on-disposal + TCGA s.37B add-back
  - §25.5 — FYAs (s.45D low-emission cars, s.45EA EV charging, s.45O special tax sites, s.45S full expensing companies, s.46 general exclusions including leasing carve-out)
  - §25.6 — disposal mechanics (ss.55, 61, 196)
  - §25.7 — FHL transitional (FA 2025 Sch 5, commencement 1 April 2025 CT / 6 April 2025 IT)
  - §25.8 — recent reforms + verification anchors
  - §25.10 — do-not-write list (memorise)
- Adjacent: §21.5 (FIC mechanics including FIC-level CA availability), §6 (FHL abolition transition narrative).

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave6_site_wide_flags.md`.

### Quality bar
- Word count: 3,000-3,800 (pillar size; do not pad past 3,800).
- FAQs: 12-14.
- New external authority links: 7-9 from the bucket list above (plus others found during research).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to all 9 C-bucket sibling pages (where they exist on the same branch; otherwise log forward-link).

### Anti-templating
- The pillar's framing differentiator is the four-axis decision tree (claimant × property type × expenditure type × vehicle). Write to the differentiator, not a generic "complete guide" template.
- Vary your H2 structure from prior pillar pages on the site (incorporation pillar, MTD pillar, CGT pillar).
- Vary your opening 2-3 sentences. Do NOT pattern-match "Capital allowances reduce taxable profits..." or similar.
- Vary FAQ phrasing. Do NOT reuse "Can a landlord claim capital allowances on..." across every FAQ.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 6, §25 is your primary working detail for Bucket C, with §21.5 + §6 as adjacent.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (especially the legacy CA cluster). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 12-14 FAQs covering competitor patterns + reader queries + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker. **Per §16.35: verify every numeric tax figure at write time.**
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (12-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap requiring action on initial launch:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. (NO middleware edit on initial C1 launch; legacy-redirect cleanup is post-launch hygiene per the redirect-overlap section above.)
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3+ briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** §16.15: do NOT include `docs/property/wave6_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave6_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.)
17. **Append any site-wide flags** to `docs/property/wave6_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave6_discovery_log_session_C.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then keep working on another step / another page while you wait. Persistent false; timeout 1 hour; do NOT block on the watcher.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review (from "Closest existing pages")
- 

### Citations added (external authority)
- 

### Internal links added (to our existing pages)
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes in markdown:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
