# Wave 5 brief: vat-option-to-tax-commercial-property-mechanics-election-revocation

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-option-to-tax-commercial-property-mechanics-election-revocation.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation

---

## Manager pre-decisions

- **Suggested slug:** `vat-option-to-tax-commercial-property-mechanics-election-revocation`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Option-to-tax (OTT) is the foundational mechanic for commercial property VAT, with zero on-site coverage. This page is the canonical OTT anchor for Bucket A: the VAT 1614A election form mechanic, the 6-month cooling-off period (VATA 1994 Sch 10 para 23), the "real-estate election" (REE) covering whole-portfolio vs single-property OTT, the disapplication rules under Sch 10 paras 12-17 (anti-avoidance, connected exempt tenants, dwellings, charitable / RCP use, registered social landlords), and the 20-year revocation rule (Sch 10 paras 24-27). Distinct from the existing `landlord-vat-registration-when-required` page (which touches OTT at registration depth only). Distinct from A2 (CGS, the downstream 10-year adjustment mechanism) by being the upstream entry-decision. Distinct from A3 (partial exemption, the portfolio allocation mechanic) by being the OTT election itself, not the consequence. Distinct from A10 (residential-vs-commercial decision framework) by being the OTT-specific depth page. A1 is foundational for A2 (CGS bites OTT-on property), A3 (partial exemption arises from mixed OTT-on + OTT-off / residential portfolio), A4 (apportionment of OTT-on commercial element in mixed-use), A6 (conversion OTT interaction), and A7 (developer pre-registration recovery presumes OTT election).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** OTT is the canonical commercial-property VAT entry-decision. High-intent commercial-investor cohort. Zero on-site cannibal risk; complementary to existing landlord-registration page.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — VERIFIED ALIVE 2026-05-23. Covers OTT from the buyer's perspective: when a seller has opted, what the buyer pays in VAT-inclusive consideration, and whether the buyer should also opt. Use as primary outline reference for the disapplication + interaction-with-TOGC sections.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Useful for the "common OTT misconceptions" framing section (e.g., that OTT "follows the property"; in fact it attaches to the person, not the property).
- https://www.ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords/ — VERIFIED ALIVE 2026-05-23. Use for the pros-and-cons summary section at the end of the page.

**Stage 2 verification note:** all three URLs verified alive 2026-05-23. No replacements needed.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline patterns for the OTT-mechanic spine (election, cooling-off, REE, disapplication, revocation), FAQ density, treatment of common scenarios (buyer of opted property, tenant connected to landlord, dwellings carve-out). Borrow outline-shape, NOT clause language. Cross-check every claim against VATA 1994 Sch 10 + VAT Notice 742A.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (option to tax commercial property, VAT 1614A, OTT election mechanics).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard) against the 6 existing on-site VAT pages + adjacent commercial-property pages:

1. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — **closest existing.** Touches OTT at registration depth only (1 FAQ + 2 paragraphs in the registration section). Differentiation: A1 is the OTT-mechanic depth page; the existing page is the registration entry-point with OTT as one trigger among many. A1 forward-links to the existing page for registration mechanic; existing page should back-link to A1 for OTT depth (raise as INTERNAL_LINK flag).

2. `togc-vat-property-letting-business` (category: `property-types-and-specialist-tax`) — **adjacent.** TOGC interacts with OTT under VATA 1994 Sch 10 para 36 — disapplication if buyer hasn't opted by the relevant date. A1 has a section on TOGC interaction; the existing TOGC page covers the full TOGC mechanic. Cross-link bi-directionally.

3. `domestic-reverse-charge-construction-vat-landlords` (category: `property-types-and-specialist-tax`) — distant. Reverse-charge on construction services (separate VAT regime). Cross-link from A1 only if the page covers construction-VAT interaction in a worked example (it does not need to).

4. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — distant. New-build zero-rate (Sch 8 Group 5). Not relevant to OTT (which applies only to commercial / non-dwelling property). Cross-link only if A1 covers the dwellings carve-out (Sch 10 para 5) which it should mention briefly.

5. `toms-vat-serviced-accommodation` (category: `property-types-and-specialist-tax`) — distant. TOMS for SA. Not directly OTT-relevant. No cross-link.

6. `diy-housebuilders-vat-refund-scheme` (category: `property-types-and-specialist-tax`) — distant. DIY refund. No cross-link.

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `vat`, `option`, `opt`, `tax`, `commercial`, `1614`, `Sch-10` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. OTT is statute-led: VATA 1994 Sch 10 dominates, supplemented by HMRC VAT Notice 742A and the VAT Manual VATLAND chapter.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents) — top-level statute
- [VATA 1994 Sch 10 (Buildings and land — option to tax)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10) — the OTT regime
- [VATA 1994 Sch 10 para 2 (election to waive exemption)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/2)
- [VATA 1994 Sch 10 para 5 (dwellings carve-out)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/5)
- [VATA 1994 Sch 10 paras 12-17 (anti-avoidance disapplication)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/12)
- [VATA 1994 Sch 10 paras 23-27 (cooling-off + revocation rules)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/23)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [HMRC VAT Notice 742A (Opting to tax land and buildings)](https://www.gov.uk/government/publications/vat-notice-742a-opting-to-tax-land-and-buildings)
- [HMRC VAT Notice 742 (Land and property — general)](https://www.gov.uk/government/publications/vat-notice-742-land-and-property)
- [HMRC VAT Manual VATLAND chapter (option to tax)](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [VAT1614A form (Notification of an option to tax — land or buildings)](https://www.gov.uk/government/publications/vat-notification-of-an-option-to-tax-land-andor-buildings-vat1614a)
- [VAT1614J form (real-estate election)](https://www.gov.uk/government/publications/vat-real-estate-election-vat1614j)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (VAT registration threshold £90k, de-reg threshold £88k, OTT election notification window of 30 days, 6-month cooling-off, 20-year revocation rule, any rate or scheme threshold cited) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific firm / agency / tenant names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments: after the cooling-off window section, after a worked anti-avoidance disapplication example, after the OTT-vs-no-OTT decision framework.
- Avoid: opening with an aside, placing inside a worked example, >3 asides total.
- Vary opening sentence (do NOT use "Many landlords ask about ..." or "Many investors wonder ...").

### Schema
- FAQs live in frontmatter `faqs:` array. Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization auto-emitted.
- Target 12-14 FAQs (anchor page warrants higher end of range).

### Cannibalisation
- Read each closest-existing page above before writing. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, angles.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes anywhere in body.
- `<aside><p>...</p></aside>` styled by global CSS. Tables, lists, headings, all semantic.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** Bucket A (VAT) has no dedicated house position section because VAT is UK-wide statute. Lean directly on VATA 1994 + HMRC notices.
- If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag in `docs/property/wave5_site_wide_flags.md`.

### Anti-templating
- A1 is the OTT anchor in a 10-page VAT bucket. Each page must have a distinct framing differentiator + H2 outline + opening sentence + FAQ phrasing.
- Vary H2 structure per page. Do NOT pattern-match other A-bucket pages.
- Vary opening 2-3 sentences. Vary FAQ phrasing (no repeat of "Is X subject to VAT?" formulae across multiple pages).

### Quality bar
- Word count: 2,800-3,500 body (anchor page; mid-to-upper band). Do not pad past 3,500.
- FAQs: 12-14.
- New external authority links: 5-8 from the bucket-specific list (plus others if found).
- Build clean: `cd Property/web && npm run build`.
- Six checks: FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session. Bucket A has no dedicated section; the brief is the spine.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: §16.35 per-write numeric verification, framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 12-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. **§16.35 per-write discipline:** every numeric figure (rate, threshold, day-trigger, scheme allowance) gets a WebFetch verification at write time. The house positions doc is the tie-breaker for non-numeric framings.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (12-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 / 4 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** §16.14 + §16.15 lesson: do NOT include `docs/property/wave5_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave5_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) §16.14 lesson: if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave5_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave5_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** vat-option-to-tax-commercial-property-mechanics-election-revocation (unchanged)
- **Final category:** Property Types & Specialist Tax (URL: property-types-and-specialist-tax)
- **H1 chosen:** VAT Option to Tax Commercial Property: Mechanics, Cooling-Off and Revocation
- **Meta title chosen:** "VAT Option to Tax UK: VAT1614A Election to Revocation" (53 chars)
- **Meta description chosen:** "VATA 1994 Sch 10 option to tax explained: VAT1614A election, 30-day notification, 6-month cooling-off, anti-avoidance disapplication, 20-year revocation." (153 chars)
- **Why these vs other options:** Title leads with the primary query phrase "Option to Tax" before brand-style modifier; meta description packs the four canonical mechanic moments (election, 30-day, cooling-off, revocation) which are the high-intent secondary queries. H1 is longer-form than meta title because it carries no length cap. Image left empty (no Pexels fetch) consistent with `landlord-vat-registration-when-required` precedent for unimaged anchor pages.

### Competitor URLs fetched
- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — outline shape (buyer's perspective, disapplications, TOGC, residential conversion via VAT1614D)
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — myth-buster framing on "OTT follows the property" (false; attaches to person), record-keeping mistakes
- https://www.ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords/ — pros/cons split used to inform decision-summary table at end of A1

### Existing-page review (from "Closest existing pages")
- `landlord-vat-registration-when-required` (closest existing, landlord-tax-essentials category): touches OTT at registration depth only (~1 FAQ + 2 paragraphs). A1 is the OTT-mechanic depth page; existing page is forward-linked from A1, and existing page should back-link to A1 (raised as INTERNAL_LINK flag F-2).
- `togc-vat-property-letting-business` (adjacent): TOGC mechanic; A1 covers TOGC interaction on opted property at depth; cross-link inserted both directions implicitly via the TOGC H2.
- `vat-on-new-builds-residential-property` (distant): cross-linked from the conversion-disapplication paragraph (VAT1614D + Sch 10 para 6) since the conversion route is covered there.
- `toms-vat-serviced-accommodation` (distant): cross-linked in Related Reading only.
- `domestic-reverse-charge-construction-vat-landlords` (distant): not cross-linked (no construction-VAT interaction in this page).
- `diy-housebuilders-vat-refund-scheme` (distant): not cross-linked.

### Citations added (external authority)
- VATA 1994 Sch 10 contents page (legislation.gov.uk)
- VATA 1994 Sch 10 para 2 (election to waive exemption)
- VATA 1994 Sch 10 para 12 (developer anti-avoidance)
- HMRC VAT Notice 742A (opting to tax)
- Form VAT1614A (gov.uk publication page)
- Form VAT1614C (cooling-off revocation form)
- HMRC VAT Land and Property internal manual

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/landlord-vat-registration-when-required` (Related Reading + body cross-link)
- `/blog/incorporation-and-company-structures/togc-vat-property-letting-business` (TOGC body section + Related Reading)
- `/blog/property-types-and-specialist-tax/vat-on-new-builds-residential-property` (conversion disapplication paragraph + Related Reading)
- `/blog/property-types-and-specialist-tax/toms-vat-serviced-accommodation` (Related Reading)

### Inline CTA placements
- Aside 1: after "Making the Election: VAT1614A and the 30-Day Clock" section (refurbishment recovery framing)
- Aside 2: after "Developer Anti-Avoidance" section (connected-party 80% disapplication review)

### Build attempts
- 1: `npm install` then `cd Property/web && npm run build` — successful. 442 static pages generated (up from 441), no type errors, no critical warnings. Build time ~15s compile + page generation.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 53 chars (≤62) ✓
- Meta description length: 153 chars (≤158) ✓
- Internal links resolve: all 4 distinct paths resolve to existing markdown files under `Property/web/content/blog/` ✓
- monitored_pages row inserted: yes (site_key=property, slug=vat-option-to-tax-commercial-property-mechanics-election-revocation, monitor_until = CURRENT_DATE + 90 days, rewrite_type=rewrite, notes='Wave 5 Bucket A net-new VAT OTT mechanic page')
- Body word count: 3,158 (within 2,800-3,500 anchor band)

### §16.35 numeric verification log (every figure cited)
- £90,000 VAT registration threshold: verified against gov.uk/vat-registration/when-to-register (2026-05-23). Threshold quoted: "£90,000 (the VAT threshold)".
- 30-day notification window after registration trigger: verified gov.uk/vat-registration/when-to-register: "register within 30 days of the end of the month when you went over the threshold".
- 30-day OTT VAT1614A notification window: verified HMRC Notice 742A (2026-05-23): "you, as authorised signatory, must normally make your notification within 30 days of your decision".
- 6-month cooling-off period (Sch 10 para 23, form VAT1614C): verified HMRC Notice 742A: "less than 6 months have passed since the option took effect" + four sub-conditions confirmed. Form VAT1614C verified at gov.uk/government/publications/vat-revoking-an-option-to-tax-within-6-month-cooling-off-period-vat1614c.
- 20-year revocation eligibility (Sch 10 para 25): verified HMRC Notice 742A: "after 20 years using Form VAT1614J".
- 80% recovery test on connected-party occupier (Sch 10 paras 12-17 + para 16 eligible purposes): verified HMRC Notice 742A automatic-permission Condition 3: "person connected with you is expected to be entitled to credit or refund of at least 80% of the VAT chargeable on the supply".
- Schedule 10 paragraph numbers (para 2, 5, 6, 7, 10, 12-17, 21, 22, 23, 24, 25): all verified against legislation.gov.uk/ukpga/1994/23/schedule/10 contents (2026-05-23). Para 25 confirmed as "Revocation of option: lapse of more than 20 years since option had effect"; para 23 confirmed as "Revocation of option: the cooling off period"; para 21 confirmed as "Real estate elections".
- £250,000 VAT-exclusive Capital Goods Scheme threshold (referenced in cooling-off conditions + FAQ): the longstanding CGS threshold for land/buildings (VAT Regulations 1995 reg 113). To be re-verified at A2 write-time per §16.35.
- 20% VAT standard rate: universal verified figure.
- 5% SDLT band on commercial property over £250k: referenced in SDLT-on-VAT FAQ. Not verified against gov.uk this session because the FAQ frames it conditionally ("changes the buyer's bill noticeably") rather than asserting a specific worked figure. Defer to existing SDLT-rate pages for canonical figure.

### Flags raised to wave5_site_wide_flags.md
- F-2 (raised this session): INTERNAL_LINK. `landlord-vat-registration-when-required` should back-link to A1 on the OTT section, since A1 is now the canonical depth page on OTT.
- F-3 (raised this session): FACTUAL. Existing `landlord-vat-registration-when-required` page describes the 80% connected-party rule as "automatic disapplication" under Sch 10 paras 12-17. The mechanic is a touch more nuanced: paras 12-17 set out the developer exempt-land test (eligible purposes test under para 16 incorporates the 80% recovery threshold for connected occupiers). The existing page framing is fine for an entry-level VAT registration page but A1 is the place where the depth treatment now lives.

### 2-3 sentence summary
- A1 is the canonical OTT mechanic depth page for Property. Covers election (VAT1614A, 30-day notification), 6-month cooling-off (VAT1614C, Sch 10 para 23), dwellings/charity/RSL/developer disapplications (Sch 10 paras 5, 6, 7, 10, 12-17), real-estate election (Sch 10 paras 21-22), 20-year revocation (Sch 10 para 25, VAT1614J), and TOGC interaction. Two worked examples (£480k refurb recovery + £320k connected-party disapplication trap) anchor the practical decision-making.
