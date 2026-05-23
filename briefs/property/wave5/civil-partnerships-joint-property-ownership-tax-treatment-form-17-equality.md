# Wave 5 brief: civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality

---

## Manager pre-decisions

- **Suggested slug:** `civil-partnerships-joint-property-ownership-tax-treatment-form-17-equality`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Civil partners are treated identically to married spouses for property income-tax purposes under the Civil Partnership Act 2004 (and the consequential amendments to ITA 2007 s.836, ITTOIA 2005 s.282, TCGA 1992 s.58, IHTA 1984 s.18). This page covers the equality-of-treatment cluster: the default 50/50 income split for civil partners living together, the Form 17 mechanic identically available (with the same 60-day window, same joint-tenancy bar, same evidence requirements per C1), the TCGA 1992 s.58 no-gain-no-loss on inter-partner transfers, the IHTA 1984 s.18 spouse exemption identically applicable, and the persona-led edge cases: CPA 2004 dissolution mechanics (parallel to divorce, including the FA 2023 s.58(1A)-(1B) 3-tax-year extension for transfers in accordance with a court order); historical context (pre-2005 same-sex partners did NOT have this treatment, hence why older competitor content sometimes treats this as a special case); same-sex marriage (since Marriage (Same Sex Couples) Act 2013 same-sex marriages are recognised parallel to civil partnerships); overseas civil partnerships (recognised under the CPA 2004 Sch 20 list and consequential amendments). Distinct from C1 (which is the general spouse + civil-partner Form 17 mechanic) by being civil-partner-cohort applied content with the CPA-specific framing + edge cases.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note: §16.32 SEQUENCING CONSTRAINT.** **C1 is the upstream mechanic page; verify C1 is committed before launching C5 session, or include forward-link placeholder for manager hyperlink at merge.** C5 is the civil-partner-cohort applied page that cites C1 as the mechanic. If sessions launch concurrently, C5's "How Form 17 works" forward-link will be plain text at write time and the manager will hyperlink at bucket-merge.

**HOUSE_POSITION_CONFLICT signal context:** §24.1 + §24.2 explicitly cite "spouses / civil partners" throughout. No conflict signal at brief generation.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of CPA 2004 equality, treatment of dissolution mechanics.

- https://www.alexander-ene.co.uk/civil-partnership-tax.htm — verified live 2026-05-23 (200). Boutique accountant; strongest competitor piece on the CP-equality angle.
- https://www.alexander-ene.co.uk/civil-partner-property-tax.htm — verified live 2026-05-23 (200). Sibling within alexander-ene set.
- https://www.alexander-ene.co.uk/civil-partnership-property.htm — verified live 2026-05-23 (200). Triple-sibling within alexander-ene set; useful for verifying competitor coverage scope.
- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Generic Form 17 + spouse content; useful for cross-checking general framing.

**Borrowable patterns:** alexander-ene has the strongest CP-specific framing in the visible competitor set; we lean on equality-of-treatment messaging while threading the CPA 2004 anchor explicitly. Our differentiator: the dissolution mechanics + FA 2023 s.58(1A)-(1B) 3-year extension + overseas civil partnership recognition.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "civil partnership rental income tax", "Form 17 civil partners", "civil partnership property tax UK".*

---

## Closest existing pages

- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling, **C5 sequencing dependency**) — Form 17 mechanic. C5 forward-links to C1 from "How Form 17 works for civil partners" section. **§16.32: C1 must ship before C5, or include forward-link placeholder for manager hyperlink at merge.**
- C3 `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 sibling) — declaration of trust mechanic. Cross-link.
- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — TCGA 1992 s.58 inter-spouse / civil-partner no-gain-no-loss. Cross-link.
- `iht-spouse-exemption-second-death-property-portfolio-window-mechanics` (Wave 4 C2, category: `landlord-tax-essentials`) — IHT spouse / civil-partner exemption depth. Cross-link.

**Cannibalisation discipline:**
- C5 ↔ C1: close sibling; flagged at Stage 1. Content-boundary discipline: C1 is general spouse + civil-partner Form 17 mechanic; C5 is civil-partner-specific applied content covering the cohort + CPA-specific edge cases. C5 should NOT walk the full Form 17 mechanic (forward-links to C1 instead).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- Civil Partnership Act 2004 (CPA 2004): https://www.legislation.gov.uk/ukpga/2004/33/contents
- ITA 2007 s.836 (default 50/50, expressly cites civil partners): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837 (Form 17 election, civil partners covered): https://www.legislation.gov.uk/ukpga/2007/3/section/837
- TCGA 1992 s.58 (no-gain-no-loss, FA 2023 extension to s.58(1A)-(1B) 3-year window): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- IHTA 1984 s.18 (spouse / civil-partner exemption): https://www.legislation.gov.uk/ukpga/1984/51/section/18
- Marriage (Same Sex Couples) Act 2013 (consequential amendments).

**HMRC manuals:**
- HMRC Form 17 publication: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17
- PIM1030 (jointly-let property income split, applies to civil partners): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- TSEM9810 (Form 17 mechanics, civil partners covered): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810
- TSEM9842 (declaration of trust evidence): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9842

**Cross-references in house_positions.md:** §24.1 (default 50/50 for civil partners), §24.2 (Form 17 mechanic; civil partners equally bound by joint-tenancy bar + 60-day window), §24.4 (TCGA s.58 + FA 2023 3-year extension), §22.5 (IHT spouse / civil-partner exemption), §1 (SDLT on dissolution transfers).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure against current gov.uk at write time per §16.35. Particular care: FA 2023 s.58(1A)-(1B) 3-year separation window dates; verify the in-force date (6 April 2023).

### Voice
- **No em-dashes.** Anonymised personas. Practical, specific.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the equality-of-treatment overview
  - After the dissolution + 3-year window section (high-intent for dissolving CPs)
  - At end of overseas-civil-partnership section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- C5 cites C1 for mechanic depth. Do NOT walk the Form 17 mechanic in detail; the role of C5 is the cohort-applied page.

### House positions
- **§24 is your primary working detail.** Particular threading: §24.1 (default 50/50 expressly includes civil partners); §24.2 (Form 17 mechanic identically applicable); §24.4 (s.58 + FA 2023); §22.5 (IHT spouse exemption); §24.10 (do-not-write: "civil partners have different rights" is FALSE).

### Quality bar
- Word count: 2,500-3,500 body.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean.
- FAQ schema match; zero em-dashes; zero Tailwind; meta title ≤62; meta description ≤158.

### Anti-templating
- Vary H2 structure. Vary opening. Vary FAQ phrasing.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start; §24 is your primary working detail for Bucket C.
2. Claim the page in `docs/property/wave5_page_tracker.md`.
3. Read the brief (this file).
4. Fetch each competitor URL using httpx + BeautifulSoup.
5. Read closest existing pages.
6. Plan the write.
7. Verify factual claims. **Per §16.35: verify every numeric tax figure at write time.** (FA 2023 in-force date is the load-bearing fact here.)
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify all six checks.
12. Apply redirect repointing if listed. (None for this brief.)
13. Register the new page in `monitored_pages`.
14. Commit on your branch. Per-page commit. **CRITICAL: commit BEFORE marking done.**
15. Fill in per-page work-log.
16. Mark done in tracker.
17. Append any site-wide flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task on the file. Keep working while you wait.

---

## Per-page work-log (fill in as you go)

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

### Flags raised to wave5_site_wide_flags.md

### 2-3 sentence summary
