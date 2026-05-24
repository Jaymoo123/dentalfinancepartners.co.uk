# Wave 7 brief: tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B4 — FTT appeal process for landlords — Tax Chamber
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber

---

## Frontmatter header

- **Slug:** `tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber`
- **Bucket:** B
- **Section ID:** §27.4 (FTT appeal route paragraph)
- **Framing differentiator (~50 words):** First-tier Tribunal (Tax Chamber) procedure for landlord appeals under TCEA 2007 + Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009 (SI 2009/273) — standard vs complex case categorisation, costs-shifting in complex cases, ADR engagement alongside (not replacing) FTT, onward UT (Tax + Chancery) for points of law per TCEA 2007 s.11. NOT writing closure-notice mechanics (B2) or penalty bands (B8).
- **Locked HP anchors:**
  - §27.4 (FTT appeal route — verbatim)
  - §27.9 (do-not-write list — reinforcing 30-day window per s.31A and ADR-as-option-not-replacement)
- **monitored_pages stub:** Register at launch; primary monitored queries include "First-tier Tribunal tax appeal", "FTT Tax Chamber landlord", "complex case costs tribunal", "tribunal appeal procedure rules 2009", "Upper Tribunal tax appeal".

---

## Manager pre-decisions

- **Suggested slug:** `tribunal-appeal-process-landlords-first-tier-tribunal-tax-chamber`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B
- **Framing differentiator (Stage 2, 2026-05-24):**

> Most landlord enquiries that escalate beyond closure notice end at the FTT — typically on penalty assessment, discovery-assessment validity, or substantive treatment of rental-income facts. The page is the procedural-framework reference for that journey. Three readers in scope: (i) landlord with closure-notice appeal pending and Notice-of-Appeal deadline approaching; (ii) accountant considering whether to push a complex case categorisation (costs-shifting trade-off); (iii) landlord at FTT decision stage considering UT onward appeal on point of law. Page walks five layers: (1) statutory framework — TCEA 2007 ss.3-5 (FTT establishment + chambers) and the **Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009 (SI 2009/273)**; (2) **case categorisation** — default, basic, standard, complex — with the costs-shifting consequence (costs follow event ONLY in complex cases unless taxpayer opts out under rule 10(1)(c)); (3) **the appeal lifecycle** — Notice of Appeal within 30 days under TMA s.31A (NOT 60 days per §27.9); HMRC review request alternative; case-management directions; document exchange; hearing; decision; (4) **ADR alongside, not replacing, FTT** — HMRC ADR is a parallel option that does NOT pause the FTT clock; many disputes settle at ADR but Notice of Appeal must still be lodged within 30 days to preserve rights; (5) **onward UT (Tax and Chancery Chamber) appeal under TCEA 2007 s.11** — permission required, limited to points of law; further onward to Court of Appeal then Supreme Court. Brief cross-references to B2 (closure-notice triggers FTT route) and B9 (Martland late-appeal framework where 30-day window missed). Two worked scenarios: (i) landlord appealing £18k discovery assessment — standard case, no costs-shifting, ADR engaged in parallel, settles at ADR within 6 months; (ii) portfolio landlord appealing £450k disputed-deductibility case — complex categorisation, costs-shifting accepted, 18-month FTT timeline plus UT appeal on point of law.

**Stage 1 manager note:** Pool-thinness disclosure — FTT procedure is well-documented by specialist tax-litigation firms but rarely landlord-flavoured at this depth. Brief generator pulls from TCEA 2007 + SI 2009/273 verbatim + §27.4 + HMRC ARTG2000+. **B2 → B4 reciprocal forward-link**; B4 cross-refs B9 for reasonable-excuse late-appeal grounds.

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BS4. Extract treatment of (a) case categorisation (most omit the four-category framework — default / basic / standard / complex); (b) costs-shifting in complex cases; (c) ADR-vs-FTT positioning; (d) UT onward appeal route under TCEA s.11.

- https://www.ukpropertyaccountants.co.uk/first-tier-tribunal-tax-appeal/ — mid-market specialist.
- https://www.uklandlordtax.co.uk/ftt-tax-chamber-appeal-process/ — landlord-flavoured.
- https://www.shipleys.com/insights/ftt-appeals-landlord-procedure/ — Top-50 firm; specialist tax-litigation depth.
- https://www.haines-watts.com/insight/first-tier-tribunal-tax-procedure/ — Top-30 firm.

**Borrowable patterns:** Shipleys' case-categorisation walk is the cleanest competitor framing.

---

## GSC data

*Net-new page. Primary topical queries expected: "First-tier Tribunal tax appeal", "FTT Tax Chamber landlord", "tribunal procedure rules 2009 tax", "complex case costs tax tribunal", "Upper Tribunal Tax and Chancery", "ADR HMRC tax dispute landlord".*

---

## Closest existing pages (cannibalisation context)

- `ated-late-filing-penalty-appeal-reasonable-excuse` (0.26 — adjacent ATED-specific procedural; this is general FTT framework)
- `pre-letting-expenses-landlord-claim-before-first-tenant` (0.13 — false-positive)

**Cannibalisation discipline:**
- No on-site duplication; B4 is the canonical FTT-procedure page.
- `ated-late-filing-penalty-appeal-reasonable-excuse` is ATED-specific procedural; B4 is the general FTT framework that the ATED page sits within. Distinct readers; B4 forward-links to ATED page as a worked example, not duplicate.
- B2 owns the statutory closure-notice mechanic; B4 owns the FTT procedural framework downstream.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "tribunal-appeal" or "first-tier-tribunal" slugs. No middleware edit on initial launch.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**Statutory:**
- TCEA 2007 s.3 (First-tier Tribunal establishment): https://www.legislation.gov.uk/ukpga/2007/15/section/3
- TCEA 2007 s.11 (UT onward appeal on point of law): https://www.legislation.gov.uk/ukpga/2007/15/section/11
- SI 2009/273 (Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009): https://www.legislation.gov.uk/uksi/2009/273
- TMA 1970 s.31A (30-day Notice of Appeal window): https://www.legislation.gov.uk/ukpga/1970/9/section/31A

**HMRC manuals:**
- ARTG2000+ (Appeals Reviews and Tribunals Guidance): https://www.gov.uk/hmrc-internal-manuals/appeals-reviews-and-tribunals-guidance/artg2000
- ARTG4000+ (HMRC review process): https://www.gov.uk/hmrc-internal-manuals/appeals-reviews-and-tribunals-guidance/artg4000

**gov.uk public:**
- Tax tribunal procedure: https://www.gov.uk/tax-tribunal
- Notice of Appeal form: https://www.gov.uk/tax-appeals/notice-of-appeal

**Case law (verify at write time):**
- **Martland v HMRC [2018] UKUT 178 (TCC)** — late-appeal framework; cross-ref B9
- Costs-shifting authority for complex cases under rule 10 — verify recent UT authorities at write time

**Cross-references in house_positions.md:** §27.4 (primary anchor); §27.9 (do-not-write list — 30-day window not 60-day; ADR not replacing FTT).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** (i) Verify SI 2009/273 number + full title ("Tribunal Procedure (First-tier Tribunal) (Tax Chamber) Rules 2009") at write time; (ii) verify case-categorisation thresholds and costs-shifting rule (rule 10 of SI 2009/273) verbatim — these have been amended since 2009; (iii) Martland [2018] UKUT 178 citation; (iv) confirm 30-day Notice of Appeal under s.31A (not 60).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Procedure-rule references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer.
- `<aside>` styled by global CSS.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the case-categorisation walk (high-intent: reader has just learned complex-case costs-shifting trade-off)
  - After the ADR-alongside-FTT framing (reader considering settlement track)
  - Optionally after the UT onward-appeal section (substantial-sum readers)
- Vary opening; do NOT lead with "The First-tier Tribunal (Tax Chamber)...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read `ated-late-filing-penalty-appeal-reasonable-excuse` once before writing for clean separation (ATED-specific procedural vs general FTT framework).
- B2 owns closure-notice mechanic; B4 owns FTT procedure. Forward-link to B2 for closure-notice trigger.

### House positions
- §27.4 is the primary anchor.
- §27.9 do-not-write list: 30-day (NOT 60) appeal window; ADR-as-option-not-replacement.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the case-categorisation + costs-shifting depth + ADR-alongside framing. Write to it.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.4 primary; §27.9 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages.
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify SI 2009/273 title + rule 10 costs-shifting framework; verify TCEA s.3 + s.11 unchanged; verify Martland citation**.
8. Fetch Pexels hero image.
9. Write markdown at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify six checks.
12. No middleware edit on initial launch.
13. Register in `monitored_pages`.
14. Commit on branch (BEFORE marking done; do NOT include tracker file).
15. Fill work-log below.
16. Mark done in tracker with 1-line Notes.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Spawn Monitor on Q&A file; keep working while waiting.

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

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave7_site_wide_flags.md
- 

### 2-3 sentence summary
