# Wave 7 brief: hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B2 — Closure notice mechanics — TMA 1970 s.28A partial + final + s.28A(4) tribunal-direction
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a

---

## Frontmatter header

- **Slug:** `hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a`
- **Bucket:** B
- **Section ID:** §27.4
- **Framing differentiator (~50 words):** Partial vs final closure notice mechanics under TMA 1970 s.28A; **s.28A(4) taxpayer's right to apply to FTT for direction requiring HMRC to issue a closure notice** within specified period (the working anti-stalling lever where HMRC has dragged an enquiry beyond 9-12 months); s.28A(6) HMRC reasonable-grounds threshold; s.31A 30-day appeal window (NOT 60-day per §27.9). NOT writing FTT procedure (B4) or penalty regime (B8).
- **Locked HP anchors:**
  - §27.4 (closure notices + FTT appeal route — verbatim)
  - §27.9 (do-not-write list — "closure-notice appeals within 60 days" + "closure notices at HMRC discretion with no remedy" both forbidden)
- **monitored_pages stub:** Register at launch; primary monitored queries include "HMRC closure notice s.28A", "tribunal direction closure notice", "partial closure notice landlord", "30 day appeal closure notice", "s.28A(4) application".

---

## Manager pre-decisions

- **Suggested slug:** `hmrc-closure-notice-mechanics-landlord-enquiries-tma-1970-s28a`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B
- **Framing differentiator (Stage 2, 2026-05-24):**

> Most landlord enquiries stall at the information-exchange stage — HMRC requests records, the taxpayer responds, HMRC requests more, time passes. Months become years. The page sets out the operational mechanic for breaking the stall and forcing closure. Three readers in scope: (i) landlord with an open s.9A enquiry beyond 9 months and an officer who keeps requesting "just one more thing"; (ii) accountant managing a multi-year complex enquiry on a portfolio; (iii) landlord who has just received a closure notice and needs to know the appeal mechanic. The page walks five layers: (1) closure-notice statutory hook under s.28A — the closure notice either states no amendment OR makes the amendments the officer considers necessary; (2) **partial vs final closure notices** — s.28A allows partial closure notices on specific matters (each independently appealable; final closure ends the enquiry); (3) **s.28A(4) tribunal-direction application** — taxpayer applies to FTT for direction requiring HMRC to issue closure notice within specified period; the tribunal MUST grant the direction unless HMRC has "reasonable grounds for not issuing it" under s.28A(6); the threshold flips the burden onto HMRC; (4) **30-day appeal window under TMA 1970 s.31A** (NOT 60 days — this is one of the §27.9 do-not-write items); late appeals require reasonable-excuse application under the Martland framework (see B9); (5) **ADR alongside (not replacing) FTT** — ADR engagement does NOT pause appeal time limits, so 30-day discipline applies regardless. Two worked scenarios: (i) landlord with 14-month enquiry where officer keeps requesting bank statements — s.28A(4) application to FTT, tribunal grants direction requiring HMRC to issue closure notice within 60 days, enquiry closes; (ii) landlord receives partial closure notice on rental-income limb but enquiry continues on capital-allowances limb — partial notice triggers 30-day appeal window on the rental limb but enquiry continues on capital allowances. The page is the operational reference for closure-notice strategy across landlord enquiries; **B2 → B4 reciprocal forward-link** (B4 covers the FTT appeal process triggered by closure notice).

**Stage 1 manager note:** Pool-thinness disclosure — most landlord-flavoured competitor pages cover closure notices descriptively but skip the s.28A(4) tribunal-direction lever (the operationally critical mechanic). Defensible point of differentiation. Brief generator pulls from s.28A + s.28A(4) + s.28A(6) + s.31A verbatim + §27.4 + HMRC EM1500+ / ARTG2000+ manual.

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BS4. Extract treatment of (a) partial vs final closure notice distinction; (b) s.28A(4) tribunal-direction (most omit); (c) 30-day appeal window framing (some incorrectly cite 60 days).

- https://www.ukpropertyaccountants.co.uk/hmrc-closure-notice-mechanics/ — mid-market specialist; landlord-flavoured.
- https://www.uklandlordtax.co.uk/closure-notice-landlord-appeal/ — reader-friendly.
- https://www.shipleys.com/insights/closure-notices-when-and-how/ — Top-50 firm.

**Borrowable patterns:** Shipleys' partial-vs-final framing is clean. Most competitor pages skip s.28A(4) — defensible point of differentiation.

---

## GSC data

*Net-new page. Primary topical queries expected: "HMRC closure notice", "TMA 1970 s.28A", "tribunal direction closure notice", "s.28A(4) application", "partial closure notice", "final closure notice landlord", "30 day appeal closure notice".*

---

## Closest existing pages (cannibalisation context)

- `hmrc-penalties-late-landlord-tax-returns-2026` (0.14 — adjacent; procedural late-filing penalty)
- `prs-database-landlord-ombudsman-registration-requirements` (0.10 — false-positive)

**Cannibalisation discipline:**
- No on-site duplication; B2 is the canonical closure-notice mechanics page.
- B4 will cover the broader FTT appeal process; B2 owns the closure-notice mechanic itself (statutory framework + s.28A(4) lever).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "closure-notice" slugs. No middleware edit on initial launch.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**Statutory:**
- TMA 1970 s.28A (closure notice — full provision including s.28A(4) tribunal direction and s.28A(6) reasonable-grounds threshold): https://www.legislation.gov.uk/ukpga/1970/9/section/28A
- TMA 1970 s.31A (30-day appeal window): https://www.legislation.gov.uk/ukpga/1970/9/section/31A
- TMA 1970 s.9A (enquiry power — for context on what gets closed): https://www.legislation.gov.uk/ukpga/1970/9/section/9A
- TCEA 2007 (FTT framework — for the tribunal-direction venue): https://www.legislation.gov.uk/ukpga/2007/15

**HMRC manuals:**
- EM1500+ (Enquiry Manual on closure): https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em1500
- ARTG2000+ (Appeals Reviews and Tribunals Guidance): https://www.gov.uk/hmrc-internal-manuals/appeals-reviews-and-tribunals-guidance/artg2000

**Case law (verify at write time):**
- **Martland v HMRC [2018] UKUT 178 (TCC)** — controlling authority on late-appeal applications (the three-stage framework drawing on Denton CA); cited for late-appeal route where 30-day window missed
- s.28A(4) FTT direction case law — verify any recent UT/CA authorities at write time

**Cross-references in house_positions.md:** §27.4 (primary anchor — closure notices + FTT appeal route); §27.1 (discovery framework for the underlying assessment in the closure notice); §27.9 (do-not-write list — 30-day window).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** (i) Verify s.28A(4) tribunal-direction power verbatim against legislation.gov.uk (the language is "the tribunal must give the direction unless satisfied that HMRC has reasonable grounds for not issuing the notice within a specified period"); (ii) Martland v HMRC [2018] UKUT 178 citation; (iii) 30-day appeal window under s.31A — sessions MUST NOT cite 60 days per §27.9.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Statutory paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer.
- `<aside>` styled by global CSS.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the s.28A(4) tribunal-direction walk (high-intent: reader has stalled enquiry and needs lever)
  - After the partial-vs-final distinction (reader has just received partial notice)
  - Optionally after the 30-day appeal walk
- Vary opening; do NOT lead with "Closure notices under TMA 1970 s.28A...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read `hmrc-penalties-late-landlord-tax-returns-2026` once before writing for clean separation (procedural late-filing vs substantive closure-notice mechanics).
- B4 will cover the broader FTT procedure; B2 owns the statutory closure-notice mechanic.

### House positions
- §27.4 is the primary anchor.
- §27.9 do-not-write list is critical: confirm 30-day (NOT 60-day) appeal window; confirm s.28A(4) as taxpayer remedy.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the s.28A(4) tribunal-direction lever depth. Write to it.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.4 primary; §27.1 + §27.9 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages.
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify s.28A(4) language verbatim; verify s.31A 30-day window (not 60); verify Martland citation**.
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
