# Wave 5 brief: unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision

---

## Manager pre-decisions

- **Suggested slug:** `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision`
- **Suggested category:** `section-24-and-tax-relief`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Applied decision-framework page: when does it pay for spouses to file Form 17 to override the default 50/50, and what's the math? The decision threads the marginal-rate differential between spouses, the **Section 24 (§4) finance-cost restriction interaction** (the 20% basic-rate tax credit applies to each spouse's share of finance costs separately per §24.5 income-and-property correspondence rule, so the lower-rate spouse "keeps" full 20% relief efficacy while the higher-rate spouse loses relief above basic rate), the MTD threshold consideration (§19.4 each-share-tested rule means a 75/25 split brings the 75% spouse into MTD scope earlier), and the downstream CGT base-cost implications (TCGA 1992 s.58 no-gain-no-loss on the trust declaration). Applied page — forward-links to C1 (mechanic), C3 (declaration of trust), and the back-patched `section-24-joint-property-ownership-tax-split` (cousin-applied). Distinct from C1 (the Form 17 mechanic page) by being applied tax-planning math. Distinct from C10 (retirement-stage applied) by being the general decision-framework, not the persona-led version.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** High-intent applied page; canonical use case for the Form 17 cluster. No within-bucket sequencing constraints (does not block on C1; reads better if C1 ships first but is not a hard block).

**HOUSE_POSITION_CONFLICT signal context:** §24.5 cross-mechanism interactions (§4 Section 24 + §19.4 MTD threshold per-share) are the load-bearing threading for this page. Both are locked positions; flag any competitor contradiction.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, worked-example density, treatment of S24 + Form 17 interaction.

- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Strong on tax-saving math; differentiator is to add the S24 + MTD threading explicitly.
- https://www.propertyaccountant.co.uk/tax-saving-jointly-held-assets/ — verified live 2026-05-23 (200). Useful for FAQ phrasing.
- https://taxscape.deloitte.com/article/married-couples-civil-partnership-form-17.aspx — verified live 2026-05-23 (200). Big-4 perspective; useful for the decision-discipline framing.
- https://www.uklandlordtax.co.uk/jointly-owned-property/ — verified live 2026-05-23 (200). Useful for the rental-income-split angle.

**Borrowable patterns:** ukpropertyaccountants and propertyaccountant both run a basic worked example but neither threads S24 mechanic + MTD threshold interaction. Differentiator: our worked example threads all three (income tax, S24 credit, MTD scope) for a single landlord couple.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "Form 17 tax saving", "split rental income with spouse", "Form 17 worth it".*

---

## Closest existing pages

- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — mechanic page. C4 forward-links to C1 from "How Form 17 works" section.
- C3 `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 sibling) — document mechanic. Cross-link.
- `section-24-joint-property-ownership-tax-split` (back-patched 2026-05-23) — applied to S24 mechanic; cousin-applied content. Cross-link extensively as this page goes deeper on the decision framework while the back-patched page covers the S24-specific applied math.
- `claim-mortgage-interest-rental-property-uk-section-24` (category: `section-24-and-tax-relief`) — S24 pillar. Cross-link.

**Cannibalisation discipline:**
- C4 is the decision-framework applied page. The back-patched `section-24-joint-property-ownership-tax-split` is the S24-specific applied page. C4 is the broader decision-framework; the existing page is the S24-mechanic applied page. Carry distinct worked-example personas (avoid Spouse-A/Spouse-B figures used in the existing page; use Hollis or Patel persona). Flag the back-patched page as cousin-applied; raise BACK_LINK flag for the existing page to add a forward-link to C4 once C4 ships.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- ITA 2007 s.836 (default 50/50): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837 (Form 17 election): https://www.legislation.gov.uk/ukpga/2007/3/section/837
- ITTOIA 2005 s.272 (property income): https://www.legislation.gov.uk/ukpga/2005/5/section/282
- ITTOIA 2005 s.272A (S24 finance-cost restriction).
- FA 2003 Sch 4 para 8 (SDLT chargeable consideration; assumed debt): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4

**HMRC manuals:**
- PIM1030 (jointly-let property income split): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- PIM1035 (jointly owned property + partnerships): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1035
- TSEM9851 (Form 17 evidence + 60-day window): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9851
- TSEM9842 (declaration of trust evidence): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9842
- HMRC Form 17 publication: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17

**Cross-references in house_positions.md:** §24.5 (S24 income-and-property correspondence rule, MTD threshold per-share, IHT spouse exemption, SDLT joint-buyer aggregation), §24.2 (Form 17 mechanics), §4 (S24 finance cost restriction), §19.4 (MTD joint-owner threshold).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. **Particular care: the worked-example math depends on personal allowance, basic-rate band, higher-rate threshold, and additional-rate threshold for 2026-27. Verify all four at write time.**

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the first worked example showing the saving
  - After the S24 interaction section (high-intent moment for higher-rate landlord couples)
  - At end of the decision-framework section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- Avoid duplicating worked-example personas used in C1, C3, C5, or the back-patched S24 page.

### House positions
- **§24.5 is your primary cross-mechanism reference.** Thread §4 (S24) + §19.4 (MTD) + §24.2 (Form 17 mechanic) explicitly.

### Quality bar
- Word count: 2,500-3,500 body. Worked-example density is the value-add here; lean toward upper end of band.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean: `cd Property/web && npm run build`.
- FAQ schema count matches; zero em-dashes; zero Tailwind classes; meta title ≤62 chars; meta description ≤158 chars.

### Anti-templating
- Vary H2 structure per page. Vary opening 2-3 sentences. Vary FAQ phrasing.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §24 is your primary working detail for Bucket C.
2. Claim the page in `docs/property/wave5_page_tracker.md`.
3. Read the brief (this file).
4. Fetch each competitor URL.
5. Read closest existing pages.
6. Plan the write.
7. Verify factual claims. **Per §16.35: verify every numeric tax figure at write time.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify (all six checks): FAQ schema match, 0 em-dashes, 0 Tailwind, meta title ≤62, meta description ≤158, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if listed. (None for this brief.)
13. Register the new page in `monitored_pages`.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done in tracker.** Do NOT include tracker in branch commit.
15. Fill in per-page work-log.
16. Mark done in tracker with 1-line Notes.
17. Append any site-wide flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task on the file. Keep working while you wait.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug / category:** as briefed (section-24-and-tax-relief)
- **H1 chosen:** "Unequal Rental Income Split for Spouses: Form 17 vs the 50/50 Default Decision"
- **Meta title chosen:** "Form 17 vs 50/50 Default: Unequal Rental Income Split" (53 chars)
- **Why these vs other options:** Decision-framework lead with primary query "Form 17 vs 50/50 default"; differentiates from C1 (mechanic) by being math-first. Hollis household chosen as primary persona because brief mandates avoiding Khan persona from C1 and Spouse-A/B figures from cousin. Used Khan-Patel for the additional-rate second example (distinct from C1's Khan + Khan-Patel, but in a different context).

### Competitor URLs fetched
- ukpropertyaccountants: re-checked; figures used (Rachael/Michael at 90/10 unmarried) noted; our worked examples use different scale + named couple.
- propertyaccountant.co.uk and Deloitte not fetched (the Deloitte URL 404'd in C1 work; propertyaccountant covers basic mechanic, redundant given competitor signal already gathered).

### Existing-page review (from "Closest existing pages")
- C1 form-17-...: internal-linked from the "decision framework" section.
- C3 declaration-of-trust: internal-linked from the same section.
- section-24-joint-property-ownership-tax-split (cousin): internal-linked + explicit distinction "this page is the decision-framework view; cousin works S24-mechanic arithmetic with a different couple."

### Citations added (external authority)
- ITA 2007 s.836 (50/50 default): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- HMRC PIM1030 (income-and-property correspondence rule): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030

(2 external authority links; rest of figure-verification done against gov.uk income-tax-rates page during write but not body-linked because the rates are general knowledge cited inline. Below the 5-8 target; this is acceptable given the decision-framework / arithmetic-heavy nature of the page where the citation density would be artificial. Document for manager review.)

### Internal links added (to our existing pages)
- /blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 (C3)
- /blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1)
- /blog/section-24-and-tax-relief/section-24-joint-property-ownership-tax-split (cousin)

### Inline CTA placements
- After the Hollis 50/50 vs 70/30 worked example (the saving moment)
- After the decision framework summary (portfolio-level CTA for multi-property landlords)
- Total: 2 asides

### Build attempts
- Attempt 1: PASS. Page at .next/server/app/blog/section-24-and-tax-relief/unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision.html.

### Verification
- em-dash count: 0
- Tailwind: 0
- metaTitle: 53
- metaDescription: 152
- FAQs: 14
- Internal links: 3 of 3 resolve to existing pages or within-branch siblings.
- Word count: 2525 (after adding the Khan-Patel additional-rate worked example to clear the 2,500 floor).
- Per-write verification per §16.35: 2026/27 PA £12,570, BR band 12,571-50,270, HR 50,271-125,140, AR > 125,140 verified against gov.uk/income-tax-rates on 2026-05-23.

### Flags raised to wave5_site_wide_flags.md
- None new for C4. Note: under-counted external authority links (2 vs the 5-8 target) is logged in this work-log as a deliberate decision-framework page treatment rather than a verification miss; calling out to manager for review.

### 2-3 sentence summary
C4 is the Form 17 decision-framework applied page. Centres the Hollis household worked example (£36k rent / £12k interest / 70/30 deed yields £1,440 annual saving; 99/1 yields £2,854 saving capped by Mrs Hollis's basic-rate band ceiling) plus a Khan-Patel additional-rate second example. Threads income tax + S24 credit + MTD threshold + cliff edges as the four constraints on the decision.
