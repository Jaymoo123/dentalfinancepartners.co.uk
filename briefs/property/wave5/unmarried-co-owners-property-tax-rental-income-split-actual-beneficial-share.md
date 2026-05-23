# Wave 5 brief: unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share

---

## Manager pre-decisions

- **Suggested slug:** `unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Unmarried co-owners (cohabiting partners, siblings, parent-and-adult-child, friends, business partners not in formal partnership) do NOT have access to Form 17. The statute (ITA 2007 s.836 + ITTOIA 2005 s.282) is spouse / civil-partner-only; non-spouse co-owners are outside the 50/50 default and outside the Form 17 election mechanism. Their rental income split follows **actual beneficial ownership from the start**, evidenced by declaration of trust (same instrument as C3 but without the Form 17 follow-up) or sufficient documentary evidence (mortgage contributions, deposit contributions, conveyancing records). The page covers: the contrast with the spouse default (no 50/50 presumption either way for unmarried), HMRC enquiry pattern for purported splits that don't match the deed (TSEM9821), the joint-tenancy bar applying equally (joint-tenant non-spouses cannot show a "share" either), and the **CGT contrast**: a cohabitee-to-cohabitee 50% beneficial transfer is a market-value disposal under TCGA 1992 s.17 + connected-persons rules s.286, NOT no-gain-no-loss (which is s.58 spouse-only). Distinct from C1 (spouse-only Form 17 mechanic) by being the non-spouse cohort. Distinct from C3 (declaration of trust document mechanic) by being the cohort-specific applied page covering how income-tax + CGT work without the spouse exemptions.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Real cohort with no on-site coverage. No within-bucket sequencing constraints (independent of C1; siblings C3 / C7 readable in either order).

**HOUSE_POSITION_CONFLICT signal context:** §24.6 (unmarried co-owners) is freshly locked 2026-05-23. C6 cites §24.6 directly. The CGT contrast (s.17 + s.286 connected persons vs s.58 spouse no-gain-no-loss) is the load-bearing point most competitor content misses.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of "no Form 17 for unmarried", treatment of the CGT contrast.

- https://www.alexander-ene.co.uk/unmarried-couples-property.htm — verified live 2026-05-23 (200). Boutique accountant; strongest competitor piece on the unmarried-cohort framing.
- https://www.alexander-ene.co.uk/cohabitee-property-tax.htm — verified live 2026-05-23 (200). Sibling within alexander-ene set.
- https://www.alexander-ene.co.uk/co-ownership-rental-property.htm — verified live 2026-05-23 (200). Useful for the actual-beneficial-share angle (covers spouse + unmarried together).
- https://www.ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/ — verified live 2026-05-23 (200). Generic but useful for cross-reference framing.

**Borrowable patterns:** alexander-ene has the strongest unmarried-cohort coverage in the visible competitor set; we lean on the absence-of-Form-17 + CGT contrast as the value-add. Most competitor content frames the unmarried question as "you just split based on ownership" without thread the actual-evidence requirement nor the s.17 + s.286 CGT contrast.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "unmarried couples rental income tax", "cohabiting partners property tax", "joint owners not married Form 17", "siblings own rental property tax".*

---

## Closest existing pages

- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — Form 17 mechanic (spouse + civil-partner only). C6 forward-links to C1 as the contrast page.
- C3 `declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17` (Wave 5 sibling) — declaration of trust mechanic; applicable for unmarried co-owners (without the Form 17 follow-up). Cross-link.
- `cgt-property-transfer-spouse` (category: `capital-gains-tax`) — s.58 spouse no-gain-no-loss; C6's CGT-contrast section forward-links here as the spouse-only exemption.

**Cannibalisation discipline:**
- C6 is the non-spouse cohort applied page. C1 + C3 are the mechanic pages. Different lanes. No cannibalisation risk.
- C6 should NOT walk the Form 17 mechanic; clearly state it's not available and forward-link C1.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- ITA 2007 s.836 (50/50 default — NOT applicable to unmarried co-owners): https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITTOIA 2005 s.282 (property income 50/50 default for spouses only): https://www.legislation.gov.uk/ukpga/2005/5/section/282
- TCGA 1992 s.17 (market-value disposal): https://www.legislation.gov.uk/ukpga/1992/12/section/17
- TCGA 1992 s.286 (connected persons rules): https://www.legislation.gov.uk/ukpga/1992/12/section/286
- TCGA 1992 s.58 (spouse no-gain-no-loss, contrast for cohabitees): https://www.legislation.gov.uk/ukpga/1992/12/section/58
- Law of Property Act 1925 s.36 (joint tenancy + severance for non-spouses too): https://www.legislation.gov.uk/ukpga/1925/20/section/36

**HMRC manuals:**
- PIM1030 (jointly-let property income for non-spouses, actual beneficial share): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030
- PIM1035 (jointly owned property + partnerships): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1035
- TSEM9810 (joint ownership general): https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem9810
- HMRC CG65000 (connected persons + CGT): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65000

**Cross-references in house_positions.md:** §24.6 (unmarried co-owners), §24.1 (default 50/50 application limits, NOT applicable here), §24.3 (declaration of trust mechanic, applicable but without Form 17 follow-up), §24.4 (s.58 spouse-only; contrast).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35.

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas (e.g., "Davies + Patel cohabitees", "Khan siblings").

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the "no Form 17 for unmarried" overview
  - After the CGT contrast section (high-intent for transferring co-owners)
  - At end of the HMRC enquiry-pattern section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- Avoid duplicating personas used in C1 / C3 / C4 / C5.

### House positions
- **§24.6 is your primary working detail.** §24.1 application-limits (spouse / CP only) and §24.4 (s.58 contrast) are adjacent. §24.7 covers adult-child + minor-child applied; non-overlapping but related cohort.

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

1. Read `docs/property/house_positions.md` once at session start.
2. Claim the page in tracker.
3. Read the brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan the write.
7. Verify factual claims per §16.35.
8. Fetch hero image from Pexels.
9. Write markdown file at `Property/web/content/blog/<slug>.md`.
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

When you append a STATUS open question, spawn a Monitor task on the file. Keep working while you wait.

---

## Per-page work-log

### Decisions
- **Final slug:** unmarried-co-owners-property-tax-rental-income-split-actual-beneficial-share (as briefed)
- **Final category:** landlord-tax-essentials (as briefed)
- **H1 chosen:** "Unmarried Co-Owners and UK Property Tax: The Actual Beneficial Share Rule"
- **Meta title chosen:** "Unmarried Co-Owners: Property Tax and Income Split" (50 chars)
- **Why these vs other options:** Lead H1 with "Unmarried Co-Owners" (primary cohort identifier) + "Property Tax" (subject) + "Actual Beneficial Share Rule" (the framing differentiator that distinguishes from the spouse 50/50 default). Avoided "Form 17" in H1/metaTitle on purpose because the page's value proposition is that Form 17 doesn't apply; leading with it would risk competitor cannibal signal against C1.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/top-tax-saving-tips-for-jointly-owned-properties/: previously fetched in C1/C5; section "What About Joint Owners Other than Married Couples (e.g. Unmarried Couples)?" confirms the actual-beneficial-share framing.
- alexander-ene.co.uk/unmarried-couples-property.htm, /cohabitee-property-tax.htm, /co-ownership-rental-property.htm: NOT fetched again because the F-5 URL_ROT pattern established from C5 confirmed alexander-ene URLs serve generic homepage content. Forward note in discovery log already covers this.

### Existing-page review
- C1 (same branch): re-read for the contrast framing; C6 forward-links to C1 as the spouse-only mechanic.
- C3 (same branch): re-read; the deed mechanic applies equally to unmarried co-owners; C6 forward-links to C3.
- cgt-property-transfer-spouse (existing on main): re-read for the s.58 contrast.
- joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords (C2, same branch): the JT vs TIC analysis applies to unmarried co-owners equally; C6 forward-links.

### Citations added
- ITA 2007 s.836: https://www.legislation.gov.uk/ukpga/2007/3/section/836
- ITA 2007 s.837: https://www.legislation.gov.uk/ukpga/2007/3/section/837
- TCGA 1992 s.17: https://www.legislation.gov.uk/ukpga/1992/12/section/17
- TCGA 1992 s.58: https://www.legislation.gov.uk/ukpga/1992/12/section/58
- TCGA 1992 s.286: https://www.legislation.gov.uk/ukpga/1992/12/section/286
- Law of Property Act 1925 s.36 + s.53: https://www.legislation.gov.uk/ukpga/1925/20/section/36 + s.53
- HMRC PIM1030: https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030

### Internal links added
- /blog/landlord-tax-essentials/form-17-declaration-beneficial-interest-property-mechanics-filing-revocation (C1)
- /blog/landlord-tax-essentials/declaration-of-trust-property-beneficial-ownership-mechanics-evidence-form-17 (C3)
- /blog/landlord-tax-essentials/joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords (C2)
- /blog/capital-gains-tax/cgt-property-transfer-spouse
- /blog/making-tax-digital-mtd/mtd-itsa-jointly-owned-property-threshold-split

### Inline CTA placements
- After Brennan / Holloway worked example (high-intent for cohabitees without a deed)
- After "Connected persons under s.286: who is, who is not" (high-intent for inter-co-owner transfer planning)
- Total asides: 2 (under the 3 max; the third planned CTA on HMRC enquiry-pattern was dropped because the section already converted readers via the inferred cost of dispute)

### Verification
- em-dash count: 0
- en-dash count: 0
- Tailwind class= in body: 0
- metaTitle: 50 / 62
- metaDescription: 155 / 158
- FAQs: 14 / 10-14
- Body words: 2,805 / 2,500-3,500
- External authority links: 7 (within 5-8)
- Internal links: 5 of 5 resolve
- monitored_pages registered: id 201

### Per-write verification (§16.35)
- TCGA 1992 s.286 connected-persons definition (cohabitees NOT connected; siblings connected via s.286(8) "relative"): verified against legislation.gov.uk at write time on 2026-05-23.
- TCGA 1992 s.58 spouse / CP no-gain-no-loss + FA (No. 2) 2023 s.41 extension: previously verified during C5 write on 2026-05-23.
- ITA 2007 s.836 / s.837 spouse-only scope: previously verified during C1 write on 2026-05-23.
- Law of Property Act 1925 s.36(2) joint-tenancy severance + s.53(1)(b) declaration-of-trust formalities: previously verified during C1 / C3 writes on 2026-05-23.

### Build attempts
- Attempt 1: PASS. 447 static pages built. No build warnings on this page.

### Flags raised
- None (the alexander-ene URL_ROT pattern is already captured in F-5 from C5; no new flag).

### 2-3 sentence summary
C6 is the non-spouse cohort applied page. Threads the absence of Form 17 + the absence of the 50/50 default + the actual-beneficial-ownership rule (PIM1030), the joint-tenancy bar that applies equally, and the CGT contrast (no s.58 no-gain-no-loss, with the s.286 connected-persons distinction working differently for siblings vs cohabitees vs friends). Worked examples cover Brennan / Holloway (cohabitee 90/10 split via contribution evidence), Mistry siblings (s.17 deemed market value because connected), and the friend / co-investor cohort. Forward-links to C1 (Form 17 contrast), C3 (deed mechanic), C2 (JT vs TIC), and the existing CGT property transfer spouse page.

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
