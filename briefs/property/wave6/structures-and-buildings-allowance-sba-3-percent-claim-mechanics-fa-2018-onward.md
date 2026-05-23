# Wave 6 brief: structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (no existing SBA-dedicated page on-site despite SBA being live since 29 October 2018)
**Source markdown path on launch:** `Property/web/content/blog/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward

---

## Manager pre-decisions

- **Suggested slug:** `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> SBA depth page — closes a structural authority gap on the site (no SBA-dedicated page exists despite SBA being a live relief since 29 October 2018). Walks the CAA 2001 Part 2A regime end-to-end: s.270AA gate (construction begun on or after **29 October 2018**, qualifying expenditure incurred from that date, first use after qualifying expenditure is non-residential), 3% straight-line writing-down over 33⅓ years (uplifted from 2% by Finance Act 2020 with effect from 1 April 2020 CT / 6 April 2020 IT — every claim now uses 3%, no transitional residual at 2%), 10% special tax site (Freeport / Investment Zone) enhanced rate over 10 years per s.270AA(2A)/(5). Qualifying expenditure scope per s.270BA (construction or acquisition); land-acquisition exclusion at s.270BG; market-value rule at s.270BH; plant-and-machinery overlap blocked at s.270BI (P&M sits under Part 2 not Part 2A — no double-claim). **Residential exclusion at s.270CF** (NOT s.270BG which is the land-acquisition exclusion — manager-corrected brief-instruction drift): residential use covers dwelling-house + student accommodation (165-day test) + armed-forces accommodation + care homes + prisons + the gardens-and-grounds extension at s.270CF(2); s.270CF(5) mixed-use trap — any part of a building used as a dwelling-house is not in qualifying use, even if also used for other purposes. **Allowance statement requirement at s.270IA** — qualifying expenditure is treated as nil unless an allowance statement is created BEFORE the first claim; statement must identify the building, the earliest construction contract date, the qualifying expenditure amount, the date first brought into non-residential use, and any post-first-use qualifying expenditure (s.270IA(4)). The successor-owner provision continues claim continuity but inherits the allowance-statement requirement. **No balancing event on SBA disposal** (contrasts with P&M per C2) — disposal does NOT trigger balancing allowance / balancing charge; instead, **TCGA 1992 s.37B** requires cumulative SBA claimed to be added back into CGT base cost on disposal (the SBA effectively converts to an increased CGT cost; framing SBA as a "free" allowance is wrong). Two worked claims: (a) £2m office acquired and constructed in 2017 — pre-2018, grandfathered, no SBA available; (b) £4m purpose-built commercial unit first used January 2026 — £120k per year SBA for 33⅓ years, allowance statement evidence at acquisition.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. Standalone SBA depth page.

**Drift-catch carryover:** The brief-instruction errata in NETNEW_PROGRAM §3 specifically flag **SBA residential exclusion is CAA 2001 s.270CF (NOT s.270BG which is land-acquisition)** — this is the single load-bearing citation drift to avoid. House_positions.md §25.4 contains the verbatim s.270CF + s.270BG distinction. Confirm at write time.

**Pool-thinness disclosure:** Native pool §1121 SBA had 2 direct competitor slugs — sparse. Lean on the §25.4 verbatim walk and the ICAEW + Deloitte + Lovell references for outline density.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the allowance statement requirement (s.270IA — most competitors mention but few quote verbatim), treatment of the residential exclusion at s.270CF (drift-catch — many competitors miscite as s.270BG), 3% rate post-FA 2020 framing, no-balancing-event-on-disposal + s.37B TCGA contrast.

- https://taxscape.deloitte.com/article/structures-and-buildings-allowance.aspx — verified live 2026-05-23 (200). Big-4 SBA reference; useful for the 29 October 2018 gate + allowance statement framing.
- https://www.icaew.com/technical/tax/capital-allowances/structures-and-buildings-allowance — verified live 2026-05-23 (200). Professional body technical reference; good for citation density on s.270AA through s.270IA.
- https://www.lovellconsulting.com/services/structures-and-buildings-allowance/ — verified live 2026-05-23 (200). Specialist CA boutique; useful for the practical-claim-process framing.

**Borrowable patterns:** ICAEW citation density is gold. Deloitte's worked-example structure is clean. Lovell's allowance-statement walkthrough is the cleanest of the three.

---

## GSC data

*Net-new page; primary topical queries expected: "structures and buildings allowance", "SBA 3%", "SBA claim mechanics", "SBA allowance statement", "SBA disposal CGT", "SBA residential exclusion", "Freeport SBA 10%". No existing on-site page so GSC starts at zero; monitored_pages registration in step 13 establishes baseline.*

---

## Closest existing pages (cannibalisation context)

- `capital-allowances-commercial-property-what-can-claim` (category: `landlord-tax-essentials`) — entry-level commercial CA page; C3 deepens with SBA-specific mechanic. Cross-link.
- C1 pillar (forward-link to cluster spine).

**Cannibalisation discipline:**
- No on-site SBA-dedicated content exists; C3 is the canonical SBA page.
- Cross-link to C1 for the decision-tree framing of when SBA is the right vehicle (commercial structure expenditure that does NOT qualify as P&M under Part 2 because it's part of the building shell, list A / list B per ss.21-22).

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap with `structures-and-buildings-allowance-sba-3-percent...`. No middleware edit required on launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.270AA (SBA primary mechanic; 29 October 2018 gate, 3% / 10% rates, 33⅓ / 10-year periods): https://www.legislation.gov.uk/ukpga/2001/2/section/270AA
- s.270BA (qualifying expenditure definition): https://www.legislation.gov.uk/ukpga/2001/2/section/270BA
- s.270BG (land-acquisition exclusion — NOT the residential exclusion): https://www.legislation.gov.uk/ukpga/2001/2/section/270BG
- s.270CF (residential exclusion — the load-bearing citation): https://www.legislation.gov.uk/ukpga/2001/2/section/270CF
- s.270IA (allowance statement requirement; verbatim s.270IA(2) treats expenditure as nil without statement): https://www.legislation.gov.uk/ukpga/2001/2/section/270IA

**Other statutory:**
- TCGA 1992 s.37B (SBA cumulative-add-back into CGT base cost on disposal): https://www.legislation.gov.uk/ukpga/1992/12/section/37B
- Finance Act 2020 (rate uplift from 2% to 3% effective 1 April 2020 CT / 6 April 2020 IT)
- Finance Act 2018 Sch 6 (SBA introduction)

**HMRC manuals:**
- CA90000 (SBA chapter): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca90000

**gov.uk public:**
- SBA detail: https://www.gov.uk/capital-allowances/structures-and-buildings

**Cross-references in house_positions.md:** §25.4 (SBA primary anchor — full Part 2A walk with verbatim s.270CF + s.270IA + the no-balancing-event-on-disposal + s.37B TCGA add-back framing), §25.1 (qualifying activity gateway via s.270CA), §25.6 (disposal mechanics — note that SBA disposal is NOT a balancing event), §25.10 (do-not-write list: "SBA is at 2%" false, "SBA is available on residential property" false, "SBA generates a balancing allowance on disposal" false, "SBA can be claimed without an allowance statement" false).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the 3% rate (post-FA 2020), the 29 October 2018 gate, and the s.270CF residential exclusion citation at write time. The s.270CF vs s.270BG distinction is the single most-likely drift point; confirm both sections directly on legislation.gov.uk.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Property developer + Portfolio owner (commercial-property readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the allowance-statement requirement section (high-intent: buyer of commercial property realising they need the statement at acquisition or claim is barred)
  - After the no-balancing-event-on-disposal + s.37B TCGA add-back section (defuses the "free allowance" misconception)
  - Optionally after the residential exclusion section (mixed-use building owner needs structural review)
- Vary opening; do NOT lead with "The Structures and Buildings Allowance is...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- No on-site SBA content exists; C3 owns the topic.
- Vary worked figures from C4 and C5.

### House positions
- §25.4 is primary; verbatim Part 2A walk + s.270CF (NOT s.270BG) for residential exclusion + s.270IA allowance statement.
- §25.10 do-not-write list — memorise the four SBA false-framings.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is SBA depth + allowance-statement requirement + the s.270CF (not s.270BG) residential exclusion + the no-balancing-event-on-disposal contrast. Write to it.
- Vary H2s from C1, C4, C5.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.4 primary; §25.1 + §25.6 + §25.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify s.270CF vs s.270BG distinction + 3% rate post-FA 2020 + 29 October 2018 gate**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. No middleware edit on launch.
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Standard.

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

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
