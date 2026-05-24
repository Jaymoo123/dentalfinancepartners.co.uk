# Wave 7 brief: renters-rights-act-possession-grounds-reform-section-8-landlords

**Site:** property
**Bucket:** A (Regulatory / compliance — RRA 2025 cluster)
**Session:** A
**Pick ID:** A5
**Brief type:** Net-new page (Schedule 1 grounds-reform deep-dive — sub-page to A2)
**Source markdown path on launch:** `Property/web/content/blog/renters-rights-act-possession-grounds-reform-section-8-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/regulatory-and-compliance/renters-rights-act-possession-grounds-reform-section-8-landlords

---

## Manager pre-decisions

- **Suggested slug:** `renters-rights-act-possession-grounds-reform-section-8-landlords`
- **Suggested category:** `regulatory-and-compliance`
- **Bucket:** A (Regulatory / compliance — RRA 2025 cluster)
- **Framing differentiator (Stage 2, 2026-05-24):**

> Schedule 1 RRA 2025 (2025 c. 26) deep-dive — full walk-through of the **reformed Schedule 2 grounds of the Housing Act 1988 as amended by RRA 2025 Schedule 1**: (a) **landlord-sale ground** — new ground for possession where landlord intends to sell, statutory declaration of intent, 4-month notice period (verify verbatim from Schedule 1 as enacted, do not paraphrase), evidential requirements; (b) **landlord-occupation ground** — landlord-or-close-family-member occupation, statutory declaration of intent, dependant evidence where applicable, 4-month notice period; (c) **anti-social-behaviour ground reforms** — narrowed/widened scope under Sch 1 RRA 2025 (verify verbatim), evidential threshold reforms, interim possession order interaction; (d) **rent-arrears threshold reforms** — the new mandatory rent-arrears ground threshold (extract from Sch 1 verbatim — pre-Bill drafts varied between 2 months and 3 months; confirm enacted figure); discretionary rent-arrears ground continues for sub-threshold arrears; (e) **12-month re-letting restriction** under s.6 RRA 2025 — applies to landlord-sale and landlord-occupation grounds, operational consequences when sale falls through or landlord-occupation plans change (s.6 sanctions including financial penalty under s.99 RRA 2025 + RRO route per §20.10); (f) **notice-period table** by ground — extracted verbatim from Sch 1 (not from secondary commentary); (g) interaction with the abolished s.21 framework — what was previously achievable under s.21 and now requires a Sch 1 ground. NOT writing the s.21 abolition operational mechanics (A2) or periodic-conversion mechanics (A3).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A5 ↔ A2 reciprocal; A5 → A1 forward-link target. A5 must extract Sch 1 verbatim — paraphrase risk is the single biggest §16.45 drift watchpoint for this brief.

**Pool-thinness disclosure:** Specialist competitor coverage is thin on enacted-Act-verbatim Sch 1 extraction (most coverage at HP-lock is Bill-stage). The verbatim ground-by-ground walk-through plus s.6 re-letting restriction depth is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract verbatim Sch 1 quotes where any (cross-check against legislation.gov.uk Sch 1 source — paraphrase risk is high in competitor pieces), notice-period tables, treatment of re-letting restriction.

- https://www.uklandlordtax.co.uk/section-8-grounds-reform-rra-2025/
- https://www.ukpropertyaccountants.co.uk/possession-grounds-rra-2025/
- https://www.shipleys.com/insights/possession-mechanics-rra/
- Cross-check NRLA / RLA practitioner notes at write time for evidential-pack treatment of new grounds.

**Borrowable patterns:** competitor notice-period tables (cross-check against Sch 1 verbatim, do NOT propagate paraphrased figures); evidential framing where pre-existing.

---

## GSC data

*Net-new page; primary topical queries expected: "section 8 grounds RRA 2025", "landlord sale ground notice period", "Schedule 1 Renters Rights Act 2025", "12-month re-letting restriction landlord sale", "anti-social behaviour ground reform RRA".*

---

## Closest existing pages (cannibalisation context)

- `landlords-considering-selling-portfolio-rra-2025-tax-implications` (cannibal score 0.29 — adjacent sale-context page; clean separation — that page is tax-side, A5 is grounds-mechanics)
- `renters-rights-act-2026-tax-implications-landlords` (0.29 — A1 same-slug rewrite target)
- `pet-rights-tenancy-landlord-refusal-reasonable-grounds` (0.28 — adjacent RRA topic)
- `section-21-abolition-uk-landlord-possession-guide-2026` (rule-of-law page on s.21 abolition — cross-link)
- A2 (operational notice mechanics — reciprocal)
- A1 (lead page — forward-link target)

**Cannibalisation discipline:**
- Read `landlords-considering-selling-portfolio-rra-2025-tax-implications` to ensure tax-side coverage stays at A1/that page, not at A5.
- Vary worked examples and personas from A1, A2, A3, A6.

---

## Redirect overlap (on launch)

No existing slug matches A5's Schedule 1 grounds-reform depth. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-24, session selects 6-8)

**Statutory (RRA 2025 + amended HA 1988):**
- RRA 2025 Schedule 1 (reformed Section 8 grounds — verbatim source, all extractions must come from here): https://www.legislation.gov.uk/ukpga/2025/26/schedule/1
- RRA 2025 s.6 (re-letting restriction provisions — 12-month restriction on landlord-sale + landlord-occupation grounds): https://www.legislation.gov.uk/ukpga/2025/26/section/6
- RRA 2025 s.99 (financial penalty for breach of re-letting restriction — verify section number at write time): https://www.legislation.gov.uk/ukpga/2025/26/section/99
- Housing Act 1988 Sch 2 as amended by RRA 2025 Sch 1 (operative consolidated text): https://www.legislation.gov.uk/ukpga/1988/50/schedule/2
- SI 2026/421 (No.2 commencement; check at write time for any subsequent commencement SI affecting Sch 1 grounds): https://www.legislation.gov.uk/uksi/2026/421

**Procedural:**
- Civil Procedure Rules Part 55 (possession proceedings — for the post-notice court procedure): https://www.justice.gov.uk/courts/procedure-rules/civil/rules/part55

**Government guidance:**
- gov.uk RRA 2025 possession-grounds landlord guidance (check at write time for any operational guidance published).

**Cross-references in house_positions.md:** §20.2 (s.21 abolition + reformed s.8 grounds, including 12-month re-letting restriction — primary anchor); §20.10 (enforcement + RRO 2-year window via RRA 2025); §16.45 drift catches — Sch 1 verbatim, 12-month re-letting restriction scope, notice-period figures from Sch 1 not secondary commentary.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** **HIGH PRIORITY** — extract every Sch 1 ground description and every notice-period figure VERBATIM from legislation.gov.uk Sch 1 at write time. Paraphrase is the single biggest drift risk for this brief per §16.45.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, verbatim Sch 1 quotes where the operative test depends on the exact wording.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Individual landlord + Portfolio owner.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the landlord-sale ground section (high-intent: landlord planning sale)
  - After the 12-month re-letting restriction section (silent-risk surfacing)
  - Optionally after the rent-arrears threshold reform section
- Vary opening; do NOT lead with "The Renters' Rights Act 2025 reforms...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Vary persona figures from A1, A2, A3, A6.
- Do not duplicate evidential-pack content from A2; cross-reference A2 for that detail.

### House positions
- §20.2 primary; verbatim Sch 1 RRA 2025.
- §20.10 (RRO 2-year window — referenced briefly).
- §16.45 — VERBATIM extraction is non-negotiable; flag any uncertainty in work-log.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is Sch 1 ground-by-ground verbatim walk-through plus s.6 re-letting restriction depth. Write to it.
- Vary H2s from A1, A2, A3, A6.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §20.2 primary; §20.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: extract every Sch 1 ground description and every notice-period figure VERBATIM from legislation.gov.uk Sch 1 at write time. Verify s.6 re-letting restriction scope. Verify s.99 financial-penalty mechanic. Check any subsequent commencement SI laid after HP-lock 2026-05-24**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.**
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags to `wave7_site_wide_flags.md` if any paraphrase-risk surfaced.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `renters-rights-act-possession-grounds-reform-section-8-landlords` (as brief)
- **Final category:** `Landlord Tax Essentials` — same brief→tracker category override pattern as A2 (brief suggested `regulatory-and-compliance` which does not exist)
- **H1 chosen:** "Possession Grounds Reform Under the RRA 2025: Schedule 1 Walk-Through for Landlords"
- **Meta title chosen:** "RRA 2025 Schedule 1 Grounds Reform: Section 8 Landlord Guide" (60 chars; tightened from first-draft 63)
- **Why these vs other options:** H1 differentiates from A2 ("Operational Mechanics") by foregrounding "Schedule 1 Walk-Through" — the architectural framing. Body opens with the 7 structural changes Schedule 1 makes, not with grounds-by-ground content (architecture-first).

### Competitor URLs fetched
- All three brief-listed URLs (uklandlordtax.co.uk, ukpropertyaccountants.co.uk, shipleys.com) untested given the A4/A2 pattern of brief URLs being stale; live legislation.gov.uk verification (already done for A2) provided sufficient grounding.

### Existing-page review
- `section-21-abolition-uk-landlord-possession-guide-2026` — cross-linked from body (cannibal-avoidance via framing differentiator: rule-of-law vs grounds architecture).
- `renters-rights-act-2026-tax-implications-landlords` — cross-linked (will be A1's same-slug rewrite target).
- `renters-rights-act-section-21-abolition-landlord-operational-mechanics` (A2, just shipped) — reciprocal cross-link added.

### Citations added
- RRA 2025 s.3 (introduces Schedule 1)
- RRA 2025 Schedule 1 (verbatim Sch 2 HA 1988 amendments)
- RRA 2025 s.4 (relevant-factors test for ASB grounds)
- RRA 2025 s.5 (form of notice of proceedings)
- RRA 2025 s.15 inserting HA 1988 ss.16I-16L (financial penalties)
- HA 1988 s.16E (12-month re-letting restriction) + s.16J (criminal offence) + s.16K (£40,000 civil penalty)
- HA 1988 Schedule 2 (reformed grounds catalogue)
- HA 1988 Sch 1 para 3D inserted by RRA 2025 s.31 (21+ year fixed-term carve-out)
- SI 2026/421 reg.2 (Commencement No.2 — 1 May 2026 effective date)

### Internal links added
- `/blog/landlord-tax-essentials/renters-rights-act-section-21-abolition-landlord-operational-mechanics` (A2 reciprocal — A2 should be back-patched to forward-link A5 at A1's same-time edit window)
- `/blog/landlord-tax-essentials/section-21-abolition-uk-landlord-possession-guide-2026`
- `/blog/landlord-tax-essentials/renters-rights-act-2026-tax-implications-landlords`

### Inline CTA placements
- After Ground 1 amended section (mid-stream: choice between Ground 1 vs Ground 1A modelling)
- After old-s.21-toolkit-mapping table (portfolio sequencing decisions review)
- (2 asides; brief allowed 2-3)

### Build attempts
- Build clean on first attempt after metaTitle/metaDescription tightening + em-dash scrub.

### Verification
- em-dash count: **0 (14 caught + scrubbed at verification gate)** — first draft had 12 em-dashes in body + 2 in frontmatter; Python scrub replaced `</strong> — ` with `</strong>: ` and other ` — ` with `; `
- Tailwind utility classes: 0
- metaTitle length: 60 chars (initial draft was 63; tightened to fit ≤62)
- metaDescription length: 144 chars (initial draft was 161; tightened to fit ≤158)
- FAQ count: 12 (within 10-12 brief target)
- Internal links resolve: 3/3 verified
- Body word count: 2,885 (within 2,800-3,500 brief target)

### Flags raised to wave7_site_wide_flags.md
- No new flags. F-3 BRIEF_DRIFT (raised at A2 write) continues to apply: A5 brief authority links cite "RRA 2025 s.6" for re-letting restriction and "RRA 2025 s.99" for the financial penalty; both incorrect. A5 used corrected citations (s.15 inserting HA 1988 s.16E + s.16J + s.16K). No additional flag needed because F-3 already covers the pattern.

### 2-3 sentence summary
Third Wave 7 Bucket A page. Schedule 1 architectural walk-through differentiated from A2's operational focus by foregrounding the 7 structural changes the Schedule makes to HA 1988 Sch 2, ground-by-ground substantive coverage, and the old-Section-21-toolkit-to-new-grounds mapping table. Used corrected citations per F-3 (s.2, s.15, HA 1988 s.16E) inherited from A2 verification.
