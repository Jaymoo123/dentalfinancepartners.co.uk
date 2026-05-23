# Wave 5 brief: second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules

**Site:** property
**Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules

---

## Manager pre-decisions

- **Suggested slug:** `second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** C (Form 17 + joint ownership + spouse-mechanics)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> SDLT 5% additional dwellings surcharge (rate from 31 October 2024 per §1) with joint owners triggers two interlocking rules. (i) **Joint-buyer trigger** (FA 2003 Sch 4ZA para 2(3)): if any joint buyer meets the additional-dwellings conditions, the whole transaction is at the higher rate. (ii) **Spousal aggregation** (FA 2003 Sch 4ZA para 9 + Sch 4ZA para 3): a buyer married to or civil-partnered to someone with another residential property anywhere in the world treats that as their own for the surcharge test. Joint owners (married + non-married) each test the surcharge separately, but the spousal aggregation always brings additional properties of the other spouse into scope, including overseas-held property. Distinct from existing `sdlt-5-percent-surcharge-refund-claim-process` (refund mechanic) by being the joint-owner application mechanic at acquisition. Distinct from C1 (Form 17 income-tax) by being SDLT-applied (one-off charge) not income-tax (annual).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note: §16.32 SEQUENCING CONSTRAINT.** **B2 (Welsh LTT higher rates) + B7 (Scottish LBTT ADS) cover the devolved equivalents of the spousal-aggregation question; verify both are committed before C9, or include forward-link placeholders for manager hyperlink at merge.** C9 is England-SDLT-applied; B2 + B7 are devolved equivalents. C9 includes forward-link placeholders to B2 + B7 from the "Welsh equivalent" + "Scottish equivalent" sections. If sessions launch concurrently, placeholders will be plain text at write time and the manager will hyperlink at bucket-merge.

**HOUSE_POSITION_CONFLICT signal context:** §24.5 SDLT joint-buyer sub-section (FA 2003 Sch 4ZA para 2(3) + para 9) is the load-bearing threading. §1 (SDLT 5% from 31 October 2024) is the rate; locked. §23.5 (Scottish ADS 8% from 5 December 2024) is the devolved equivalent referenced.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, treatment of spousal aggregation, treatment of overseas-property trigger.

- https://www.ukpropertyaccountants.co.uk/how-owning-property-abroad-leads-higher-stamp-duty-rates/ — verified live 2026-05-23 (200). Strongest competitor piece on the overseas-property + spousal aggregation angle.
- https://www.alexander-ene.co.uk/sdlt-on-second-properties.htm — verified live 2026-05-23 (200). Boutique London accountant perspective.
- https://www.ukpropertyaccountants.co.uk/ltt-higher-rates-for-spouses-minor-children-and-trust-interests/ — verified live 2026-05-23 (200). Welsh LTT parallel (useful for the cross-jurisdictional contrast).
- https://www.uklandlordtax.co.uk/jointly-owned-property/ — verified live 2026-05-23 (200). Useful for joint-buyer + spouse FAQ phrasing.

**Borrowable patterns:** ukpropertyaccountants overseas-property piece is the clearest on the spousal-aggregation mechanic; we lean on this for FAQ phrasing while adding the joint-buyer-trigger thread + the worked devolved-jurisdiction parallels.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "SDLT surcharge joint buyer", "second home SDLT married couple", "stamp duty surcharge spouse owns property abroad".*

---

## Closest existing pages

- `sdlt-5-percent-surcharge-refund-claim-process` (category: `landlord-tax-essentials`) — refund mechanic (3-year replacement window). C9 forward-links from "When can the surcharge be refunded" section.
- `sdlt-buy-to-let-rates-surcharge-guide-2025` (category: `landlord-tax-essentials`) — SDLT pillar. C9 forward-links as the pillar.
- `sdlt-non-resident-2-percent-surcharge` (category: `landlord-tax-essentials`) — adjacent non-resident surcharge mechanic. Cross-link for non-resident joint buyers.
- C1 `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` (Wave 5 sibling) — Form 17 income-tax contrast. Cross-link.
- **B2 `welsh-ltt-higher-rates-residential-second-homes-additional-properties-surcharge-mechanics`** (Wave 5 cross-bucket sibling) — Welsh equivalent. **§16.32: forward-link placeholder; manager hyperlinks at merge.**
- **B7 `scottish-lbtt-additional-dwelling-supplement-ads-mechanics-second-home-buyers`** (Wave 5 cross-bucket sibling) — Scottish equivalent. **§16.32: forward-link placeholder; manager hyperlinks at merge.**

**Cannibalisation discipline:**
- C9 is the SDLT-applied joint-owner page. Existing refund-claim page is the post-acquisition refund mechanic. Different acquisition-vs-post-acquisition lanes.
- C9 cross-jurisdictional sections (Welsh + Scottish parallels) should be 1-2 paragraphs each linking to B2 + B7 for depth; do not re-walk devolved mechanics in C9.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no old-slug redirect overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- FA 2003 Sch 4ZA para 2(3) (joint-buyer trigger): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA
- FA 2003 Sch 4ZA para 3 (the additional-dwellings conditions).
- FA 2003 Sch 4ZA para 9 (spousal aggregation rule).
- FA 2003 Sch 4 para 8 (chargeable consideration, including assumed debt): https://www.legislation.gov.uk/ukpga/2003/14/schedule/4
- LTTA 2017 Sch 5 (Welsh LTT higher rates equivalent).
- LBTT(S)A 2013 Sch 2A (Scottish ADS equivalent).

**HMRC manuals:**
- SDLTM07750 (assumed-debt as consideration): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm07750
- SDLTM09800 (additional dwellings surcharge): https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual/sdltm09800

**Cross-references in house_positions.md:** §1 (SDLT 5% rate from 31 October 2024), §23.5 (Scottish ADS 8% from 5 December 2024, joint-buyer rule mirrors SDLT), §23.2 (Welsh LTT higher rates 5%/8.5%/10%/12.5%/15%/17% from 11 December 2024, joint-buyer rule mirrors SDLT), §24.5 SDLT joint-buyer + spousal-aggregation sub-section.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify every numeric tax figure (thresholds, allowances, rates, deadline-days) against current gov.uk at write time per §16.35. Particular care: SDLT 5% surcharge rate (in force 31 October 2024), SDLT bands 2026/27, Scottish ADS 8% (5 December 2024), Welsh LTT higher rates (11 December 2024). All four may shift via Autumn Budgets / devolved budgets; re-verify.

### Voice
- **No em-dashes.** Practical, specific. Anonymised personas.

### Lead-gen architecture
- LeadForm auto-injected. Never duplicate.
- `<aside>` styled by global CSS; no classes.

### CTA placement guidance (per this page)
- 1-3 inline `<aside>` CTAs. Conversion moments:
  - After the joint-buyer trigger explanation (high-intent for first-time-buyer marrying landlord)
  - After the overseas-property worked example
  - At end of the devolved-jurisdiction comparison section
- Avoid: opening with an aside; aside inside a worked example; >3 total.

### Schema
- FAQs in frontmatter (10-14). Template auto-emits FAQPage JSON-LD.

### Cannibalisation
- Avoid duplicating the refund-claim mechanic (sibling existing page's lane).
- Forward-link B2 + B7 for devolved depth; do not re-walk.

### House positions
- **§1 + §24.5 SDLT sub-section are your primary working detail.** §23.2 + §23.5 cross-jurisdictional context.

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
