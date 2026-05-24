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
- **Final slug:** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` (no override)
- **Final category:** `property-types-and-specialist-tax` (no override)
- **H1 chosen:** "Capital Allowances for UK Property Investors 2026/27: The Four-Axis Decision Framework Under CAA 2001"
- **Meta title chosen:** "Capital Allowances for Property Investors 2026/27: CAA 2001" (60 chars)
- **Why these vs other options:** The four-axis framework framing is the differentiator vs every other "complete guide" page in the legacy CA cluster. H1 names "Four-Axis Decision Framework Under CAA 2001" explicitly so the framing is the first thing the reader sees and so the page is structurally distinct from the closest-existing `capital-allowances-on-property` (Wave 5, 2026-05-20) and `landlord-capital-allowances-tax-relief` (legacy). MetaTitle leads with the primary query word order ("Capital Allowances for Property Investors 2026/27") and ends with the structural anchor ("CAA 2001") to capture both query types. Trimmed by 2 chars off the 62-cap to give breathing room on subsequent revisions.

### Competitor URLs fetched
- https://www.uklandlordtax.co.uk/capital-allowances/ — fetched 200; case-study page on camping pods, not a CA pillar. Useful only as a reminder that competitor coverage of CAA 2001 framework is genuinely thin.
- https://www.icaew.com/technical/tax/capital-allowances/full-expensing — **404** at write time (Stage 2 URL liveness verification was stale; logged in discovery D-1).
- https://www.icaew.com/technical/tax/capital-allowances/structures-and-buildings-allowance — **404** at write time.
- https://www.icaew.com/technical/tax/capital-allowances/annual-investment-allowance — **404** at write time.
- https://www.evelyn.com/insights-and-events/insights/capital-allowances/ — redirected (301) to https://www.swgroup.com/insights-events/insights/capital-allowances/. The S&W article is a stud-farm-bloodstock-specialist case study, not a CA pillar; the article is also outdated on AIA / SBA rates (mentions £1m "sunset 31 Dec 2020" framing). Borrowed nothing.

Net usable competitor coverage: zero out of five. C1 relied on §25.1-§25.10 of house_positions.md as the working detail (the brief's pool-thinness disclosure anticipated this).

### Existing-page review (from "Closest existing pages")
- `landlord-capital-allowances-tax-relief` — read. The page is structurally wrong for residential lets (tells landlords kitchens and boilers are AIA-claimable; misses s.35 dwelling-house restriction entirely). Flagged at F-6 + F-7 in wave6_site_wide_flags.md. C1 is the structural replacement.
- `capital-allowances-on-property` — read. Wave 5 era (2026-05-20). Correctly framed on s.35 dwelling-house restriction. Mid-quality. C1 can become the pillar this page links up to (recommended in D-3).
- `capital-allowances-commercial-property-what-can-claim` — sampled. Commercial-only entry-level. C1 cross-links as the commercial-specific entry; C6 (fixtures) is the deeper sibling.
- Six legacy AIA-named pages and `full-expensing-capital-allowances` — sampled (also flagged at D-5 + F-7). All pre-FA(No.2)2023 framing. C4 in this wave is the AIA depth replacement; C5 is the full-expensing carve-outs replacement; C1 links to both.
- `integral-features-capital-allowances` — sampled. Single-mechanic legacy page. C1 cites s.33A and links out.
- `capital-allowances-examples` — sampled. Examples-only legacy page. C1 absorbs via the worked decision-tree walkthrough.

### Citations added (external authority)
- CAA 2001 s.15 (qualifying activities; post-FA-2025 omissions)
- CAA 2001 s.35 (dwelling-house exclusion)
- CAA 2001 s.33A (integral features special-rate)
- CAA 2001 s.45S (full expensing for companies)
- CAA 2001 s.51A (AIA £1m permanent)
- CAA 2001 s.270AA (SBA 3% / 33⅓ years / 29 October 2018 gate)
- CAA 2001 s.270CF (SBA residential exclusion, NOT s.270BG)
- Finance Act 2025 Schedule 5 (FHL abolition)
- HMRC Capital Allowances Manual CA21010, CA21210, CA90000

Plus inline mentions of: CAA 2001 ss.21-23 + Lists A/B/C; s.51E + s.51G associated-companies test; s.38B cars-out-of-AIA; s.45D / s.45DA / s.45EA / s.45O / s.45K (FYA section identities, NOT shuffled); s.196 fixtures table; s.198 fixtures election; s.270IA allowance statement requirement; s.61 disposal events; s.83 short-life asset election; TCGA 1992 s.37B; CTA 2009 Part 14 (LRR sister regime); FA 2021 ss.9-10 (super-deduction historic); F(No.2)A 2023 ss.7-8 (AIA permanent + s.45S insertion); FA 2012 Sch 10 (fixtures pooling-and-election gates); FA 2020 (SBA uplift from 2% to 3%); ITTOIA 2005 s.311A (replacement of domestic items relief, the actual residential-let relief).

§16.35 per-write verification anchors: every cited rate (AIA £1m, SBA 3%, full expensing 100% / 50%, super-deduction 130% expiry, FHL abolition dates) and every cited statutory section identity re-verified against legislation.gov.uk on 2026-05-23.

### Internal links added (to our existing pages)
- `/blog/property-types-and-specialist-tax/capital-allowances-on-property` — verified resolves
- `/blog/property-types-and-specialist-tax/integral-features-capital-allowances` — verified resolves
- `/blog/property-types-and-specialist-tax/full-expensing-capital-allowances` — verified resolves
- `/blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim` — verified resolves

Plus 9 forward-link mentions of bucket siblings C2-C10 (as prose references with named slug topics, not `<a href>` because those slugs are not yet on-site; manager back-patches at wave merge per §16.32).

### Inline CTA placements
Three asides total at conversion moments:
1. After §1 (s.35 dwelling-house misconception correction) — strong intent for portfolio review.
2. After §6 (decision-tree walkthrough) — reader ready to act on their specific scenario.
3. After §8 (FHL post-abolition reality) — former-FHL operators urgent for transitional pool review.

No aside in opening; no aside inside worked example; ≤3 asides total. Matches CTA placement guidance in brief.

### Build attempts
- `npm install --workspace=Property/web --include-workspace-root` in worktree (worktree had no node_modules; one-time install added 359 packages in 15s).
- `cd Property/web && npm run build` — Compiled successfully in 4.4s; 472 static pages generated (up from 471, my new page included); C1 confirmed in `.next/server/app/blog/property-types-and-specialist-tax/`.

### Verification
- em-dash count (in source markdown): 0
- en-dash count (in source markdown): 0
- em-dash count in built HTML body (offset >1000): 1, located in SiteHeader sr-only span ("Accountants UK [em-dash] Get your property tax sorted"), template chrome NOT content — flagged at F-8
- Tailwind utility classes in markdown: 0
- metaTitle length: 60 chars (≤62 ✓)
- metaDescription length: 151 chars (≤158 ✓)
- FAQ count: 14 (in 12-14 target) ✓
- FAQ schema count in built HTML: 14 (matches frontmatter array) ✓
- FAQPage + BreadcrumbList + Organization + BlogPosting JSON-LD all present in built HTML ✓
- Internal links resolve: all 4 existing-page slugs verified present in `Property/web/content/blog/`
- Body word count: ~4,918 (above 3,000-3,800 target ceiling; pillar density justified per §16.16 because (a) cluster spine for 9 sibling pages, (b) four-axis decision framework requires depth on each axis, (c) common-mistakes section operates as a reference layer that the rest of the cluster forward-links to)

### Flags raised to wave6_site_wide_flags.md
- F-6: EXISTING_PAGE_STALE — `landlord-capital-allowances-tax-relief` tells residential landlords kitchens and boilers are AIA-claimable (s.35 misframing).
- F-7: EXISTING_PAGE_STALE — middleware redirect chain `landlord-capital-allowances-maximizing-tax-relief` → `landlord-capital-allowances-tax-relief` needs repoint to C1 (post-launch hygiene).
- F-8: EXISTING_PAGE_STALE — SiteHeader sr-only span contains a literal em-dash in template chrome.

### Discoveries logged to wave6_discovery_log_session_C.md
- D-1 OTHER — three ICAEW tax-technical URLs in C1 brief returned 404 at write time (Stage 2 verification stale).
- D-2 ADJACENT_TOPIC — LRR examples-led page deserves separate future-wave bucket beyond C9 mechanics.
- D-3 EXISTING_PAGE_LINK_OPPORTUNITY — Wave 5 `capital-allowances-on-property` should link forward to C1 as pillar.
- D-4 AUTHORITY_GAP — TCGA 1992 s.37B (SBA cumulative add-back into CGT) is rarely cited on our site.
- D-5 EXISTING_PAGE_STALE — six legacy AIA-named blog files all pre-date the £1m permanent regime (overlaps with F-7).
- D-6 CALCULATOR_IDEA — AIA-vs-full-expensing-vs-50%-FYA-vs-special-rate-pool allocation calculator.

### 2-3 sentence summary
C1 is the CAA 2001 pillar for the Bucket C cluster, organised as a four-axis decision framework (claimant × property type × expenditure type × vehicle) anchored on the locked §25 house position. The page opens with the s.35 dwelling-house misconception (the cluster's central error in legacy guidance), walks the in-force vehicles for 2026/27 including AIA £1m permanent, full expensing s.45S (companies only), the 50% special-rate FYA companion, main and special-rate pools, SBA 3% straight-line, and the targeted FYAs at s.45D / s.45EA / s.45O, and reflects the FA 2025 Schedule 5 FHL abolition (commencement 1 April / 6 April 2025). Forward-links nine bucket sibling pages C2-C10 for depth on disposal mechanics, SBA, AIA allocation, full expensing carve-outs, fixtures s.198 election, HMO common parts, FHL post-abolition pools, land remediation relief, and historic super-deduction clawback.
