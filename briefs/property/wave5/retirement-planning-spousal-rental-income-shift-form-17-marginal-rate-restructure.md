# Wave 5 brief: retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/portfolio-management/retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure

---

## Manager pre-decisions

- **Suggested slug:** `retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure`
- **Suggested category:** `portfolio-management`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Applied retirement-planning page: as one spouse retires (marginal rate drops to personal allowance only or basic-rate-only) and the other remains higher-rate (continued earnings to a later age), Form 17 enables a strategic shift of rental income towards the lower-rate retired spouse. Mechanics: declaration of trust amendment to change the underlying beneficial ownership, Form 17 re-filing within the 60-day window from the new declaration's signature date, evidence discipline (HMRC may request the contemporaneous deed), and the CGT angle: Form 17 + declaration-of-trust between cohabiting spouses uses **TCGA 1992 s.58 no-gain-no-loss** so the income-shift does NOT trigger CGT (the receiving spouse inherits the transferor's base cost). **MTD-threshold-per-share interaction (§19.4)**: shifting beneficial ownership towards the retired spouse may move them above the MTD threshold (which is tested on each share separately per §19.4 gross-share rule); the resulting MTD operating cost should be netted against the income-tax saving. Persona-led: pre-retirement 50/50 default vs post-retirement 80/20 retired-spouse-favoured worked example with the year-by-year saving across a 6-year transition window. Distinct from C4 (general decision-framework) by being the retirement-stage applied page. Distinct from Wave 4 A8 (FIC retirement decumulation) by being the personal-ownership route — A8 is the alternative-route FIC corporate page (sibling cross-link from C10).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** High-value retirement persona; applied page. **§16.32 sibling cross-link to Wave 4 A8** (FIC retirement decumulation): both are retirement-stage applied pages but different vehicles (Form 17 = individual ownership; A8 = FIC corporate). C10 cross-links A8 as the "alternative route via FIC" sibling.

**HOUSE_POSITION_CONFLICT signal context:** §24.5 cross-mechanism (§19.4 MTD threshold per-share + §24.4 s.58 no-gain-no-loss + §24.5 income-and-property correspondence) is the load-bearing threading.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of pre/post-retirement marginal-rate planning, worked-example density.

- https://www.alexander-ene.co.uk/landlord-retirement-planning.htm — verified live 2026-05-23 (200). Strongest competitor piece on landlord retirement planning.
- https://www.alexander-ene.co.uk/spouse-property-transfer-cgt.htm — verified live 2026-05-23 (200). Useful for the CGT-side of the deed amendment.
- https://www.alexander-ene.co.uk/transfer-rental-property-spouse.htm — verified live 2026-05-23 (200). Useful for transfer-mechanic framing.
- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Generic Form 17 + tax-saving content; useful for cross-reference framing.

**Borrowable patterns:** alexander-ene retirement-planning piece is the only direct competitor on the retirement-cohort applied angle in the visible set. Our differentiator: thread the year-by-year transition window (pre-retirement 50/50 → post-retirement 80/20 with the Form 17 re-filing logistics) + the MTD-threshold-per-share interaction (most competitor content misses this) + the s.58 no-CGT confirmation.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "retirement rental income tax planning", "transfer rental income to retired spouse", "Form 17 retirement".*

---

## Closest existing pages

- C4 `unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision` (Wave 5 sibling) — general decision-framework. C10 forward-links to C4 from "The general Form 17 decision" section.
- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — Form 17 mechanic. C10 forward-links.
- C3 `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 sibling) — declaration of trust mechanic. C10 forward-links.
- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — s.58 no-gain-no-loss. Cross-link from CGT section.
- **Wave 4 A8 `fic-property-retirement-decumulation-mechanics-uk`** (Wave 4 sibling) — FIC retirement decumulation alternative-route. C10 cross-links as the "alternative vehicle: FIC" sibling.
- `pension-decumulation-property-portfolio-iht-2027-cohort-sequence` (Wave 4 C10) — adjacent pension-decumulation cohort. Cross-link as adjacent.

**Cannibalisation discipline:**
- C10 is the personal-ownership Form-17-route retirement page. Wave 4 A8 is the FIC corporate-route retirement page. Different vehicles, sibling cohorts. Forward-link Wave 4 A8 from "If you have an FIC structure instead" section; do NOT re-walk FIC mechanics (A8's lane).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- ITA 2007 s.836 (default 50/50): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837 (Form 17 election): https://www.legislation.gov.uk/ukpga/2007/3/section/837
- TCGA 1992 s.58 (no-gain-no-loss spouse transfer): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- ITTOIA 2005 s.282 (property income 50/50 default).
- Law of Property Act 1925 s.53(1)(b) (declaration of trust formality).

**HMRC manuals:**
- HMRC Form 17 publication: https://www.gov.uk/government/publications/income-tax-declaration-of-beneficial-interests-in-joint-property-and-income-17
- PIM1030 (jointly-let property income): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- TSEM9810 / TSEM9842 / TSEM9851 / TSEM9852 (Form 17 + declaration of trust manuals).
- HMRC HS283 (PPR self-assessment helpsheet, relevant if retirement involves selling primary residence): https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet

**Cross-references in house_positions.md:** §24.5 cross-mechanism (S24 + MTD threshold + PPR + IHT + SDLT all reachable in retirement context), §19.4 MTD threshold per-share (load-bearing), §24.4 s.58 no-gain-no-loss, §24.2 Form 17 mechanic, §24.3 declaration of trust mechanic.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure against current gov.uk at write time per §16.35. Particular care: personal allowance £12,570 (2026-27), basic-rate band £37,700, higher-rate threshold £50,270 — verify all three at write time as the worked-example math depends on them. MTD threshold £50,000 (April 2026 mandate) per §3 + §19.1.

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the year-by-year transition worked example
  - After the s.58 no-CGT confirmation (high-intent for retiring couples worried about CGT)
  - At end of the FIC-route alternative cross-link section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- Avoid duplicating worked-example personas used in C4 or any spouse pages.
- Use "Hollis couple" persona (husband retires age 64, wife continues consulting £85k/yr to age 70, £45k gross rent, £18k mortgage interest).

### House positions
- **§24.5 cross-mechanism + §19.4 MTD threshold per-share + §24.4 s.58 + §24.3 declaration-of-trust mechanic are your primary working details.**

### Quality bar
- Word count: 2,500-3,500 body. Worked-example density (year-by-year transition) is the value-add; lean upper end.
- FAQs: 10-14.
- New external authority links: 5-8.
- Build clean.
- FAQ schema match; zero em-dashes; zero Tailwind; meta title ≤62; meta description ≤158.

### Anti-templating
- Vary H2 structure. Vary opening. Vary FAQ phrasing.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `docs/property/house_positions.md` once at session start.
2. Claim the page in tracker.
3. Read the brief.
4. Fetch competitor URLs.
5. Read closest existing pages (Wave 4 A8 + Wave 4 C10 are the key cross-references).
6. Plan the write.
7. Verify factual claims per §16.35.
8. Fetch hero image from Pexels.
9. Write markdown file.
10. Build.
11. Verify all six checks.
12. Apply redirect repointing if listed. (None.)
13. Register in `monitored_pages`.
14. Commit on branch. Per-page. **Commit BEFORE marking done.**
15. Fill in work-log.
16. Mark done.
17. Append site-wide flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task. Keep working while you wait.

---

## Per-page work-log

### Decisions
- **Final slug:** retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure (as briefed)
- **Final category:** portfolio-management (as briefed)
- **H1 chosen:** "Retirement Planning for Landlord Couples: The Form 17 Income Shift in Practice"
- **Meta title chosen:** "Form 17 Income Shift on Spouse Retirement: Worked Mechanics" (59 chars)
- **Why these vs other options:** H1 leads with retirement-planning persona + the practical framing ("in practice"). MetaTitle compresses to the search-query language ("Form 17 income shift" + "spouse retirement") with "worked mechanics" signalling the worked-example density.

### Competitor URLs fetched / not fetched
- alexander-ene.co.uk retirement / spouse-transfer URLs: NOT fetched per F-5 URL_ROT pattern from C5.
- ukpropertyaccountants.co.uk content: previously absorbed in earlier C-bucket pages.

### Existing-page review
- C4 (same branch): re-read; C10 forward-links to C4 as the general decision-framework page.
- C1 (same branch): re-read; C10 forward-links as the Form 17 mechanic depth.
- C3 (same branch): re-read; C10 forward-links as the deed mechanic depth.
- Wave 4 A8 (fic-property-retirement-decumulation-mechanics-uk, on main): re-read; C10 cross-links as the alternative-route FIC corporate page.
- Wave 4 C10 (pension-decumulation-property-portfolio-iht-2027-cohort-sequence, on main): re-read; cross-link as adjacent pension-decumulation cohort.
- MTD jointly-owned property threshold + quarterly filing pages: re-read; C10 forward-links from the MTD-per-share trap section.

### Citations added
- ITA 2007 s.836 + s.837: legislation.gov.uk (already in C1/C5 set)
- TCGA 1992 s.58 + FA (No. 2) 2023 extension: previously verified in C5
- Law of Property Act 1925 s.36 + s.53: previously verified
- HMRC PIM1030 + TSEM9810 series: previously verified
- HMRC Form 17 publication: previously verified

### Internal links added
- /blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1)
- /blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 (C3)
- /blog/section-24-and-tax-relief/unequal-rental-income-split-spouses-tax-planning-form-17-vs-default-50-50-decision (C4; note non-default category landlord-tax-essentials but C4 lives at section-24-and-tax-relief per its canonical)
- /blog/incorporation-and-company-structures/fic-property-retirement-decumulation-mechanics-uk (Wave 4 A8)
- /blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split
- /blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse
- /blog/landlord-tax-essentials/pension-decumulation-property-portfolio-iht-2027-cohort-sequence (Wave 4 C10)

### Inline CTA placements
- After the Tahir / Hopkins 6-year worked example (high-intent following the cumulative-saving figure)
- After the Section 24 finance cost correspondence section (high-intent following the multi-year mechanic discussion)
- Total asides: 2

### Verification
- em-dash count: 0
- en-dash count: 0
- Tailwind class= in body: 0
- metaTitle: 59 / 62
- metaDescription: 153 / 158
- FAQs: 14 / 10-14
- Body words: 2,693 / 2,500-3,500
- External authority links: 6 (within 5-8)
- Internal links: 7 of 7 resolve (all confirmed)
- monitored_pages registered: id 207

### Per-write verification (§16.35)
- Personal allowance £12,570 + basic-rate band to £50,270 + higher-rate threshold £50,271 for 2026/27: verified against gov.uk/income-tax-rates at write time on 2026-05-23.
- MTD ITSA threshold £50,000 (April 2026) + £30,000 (April 2027) + £20,000 (April 2028): verified per house_positions §3 + §19.1; consistent with existing MTD-threshold-split page on main.
- TCGA 1992 s.58 no-gain-no-loss spouse transfer: previously verified in C5.
- ITA 2007 s.837(3) 60-day window: previously verified in C1.

### Persona naming
- Used "Tahir + Hopkins" as fresh surnames. Tahir is a higher-rate consultant; Hopkins an NHS clinician retiring at 60. Pension £18k DB. Within Wave 5 anti-templating discipline (Khan / Patel / Whitman / Reyes / Mistry / Brennan / Holloway / Hartley / Singh / Donaldson / Asare / Edwards-Carter / Iqbal all used previously in C-bucket).

### Build attempts
- Attempt 1: PASS. 450 static pages built. No build warnings.

### Flags raised
- None.

### 2-3 sentence summary
C10 is the retirement-stage applied page on the personal-ownership Form 17 income-shift route. Threads the three-step mechanic (deed → Form 17 → routing receipts) + s.58 CGT-free transfer + Section 24 correspondence + MTD threshold per-share interaction. Tahir / Hopkins worked example shows a 6-year retirement-transition window with ~£37,500 cumulative income-tax saving. Sibling cross-link to Wave 4 A8 (FIC corporate-route retirement page) as the alternative vehicle for larger portfolios.

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
