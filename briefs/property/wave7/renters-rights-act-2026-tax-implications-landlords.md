# Wave 7 brief: renters-rights-act-2026-tax-implications-landlords

**Site:** property
**Bucket:** A (Regulatory / compliance — RRA 2025 cluster — LEAD PAGE)
**Session:** A
**Pick ID:** A1 — **same-slug depth rewrite** of the existing lead page; **SHIPS LAST in Bucket A**
**Brief type:** Same-slug depth rewrite (existing slug grandfathered per §26.1 naming discipline — body copy must use "Renters' Rights Act 2025")
**Source markdown path on launch:** `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md` (existing path — rewrite-in-place)
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/regulatory-and-compliance/renters-rights-act-2026-tax-implications-landlords (existing URL — preserved)

---

## Manager pre-decisions

- **Suggested slug:** `renters-rights-act-2026-tax-implications-landlords` (**existing slug grandfathered** per §26.1 — body copy uses "Renters' Rights Act 2025"; slug retains the legacy "2026" form)
- **Suggested category:** `regulatory-and-compliance`
- **Bucket:** A (Regulatory / compliance — RRA 2025 cluster — LEAD PAGE)
- **Framing differentiator (Stage 2, 2026-05-24):**

> **Same-slug depth rewrite** of the existing lead page per the f1 brief at `docs/property/f1_rra_lead_page_rewrite_brief.md`. The existing page predates Royal Assent and uses Bill-stage framing throughout; rewrite must restate the entire page against the enacted Renters' Rights Act 2025 (2025 c. 26; Royal Assent 27 October 2025) with §20 cross-references, plus the §26 surrounding regulatory cluster (BSA 2022 / MEES / Decent Homes Standard / Redress / PRS Database) for tax-side hooks. This is the **lead page** of the RRA cluster — it sits ABOVE the operational sub-pages (A2/A3/A5/A6) and must forward-link to them cleanly. (a) **Enacted-Act restatement** — what the Act actually does, statutory section-by-section (s.1 assured tenancies recast; s.3 periodic default; s.4 s.21 abolition; ss.6 + 99 re-letting restriction + penalty; s.8 s.13 rent reform; ss.64-74 redress scheme architecture); (b) **Commencement chain** — SI 2025/1354 (No.1 commencement preliminary) + SI 2026/421 (No.2 commencement 1 May 2026); verify any subsequent commencement SIs at write time; (c) **§26 regulatory cluster overview** — BSA 2022 Sch 8 leaseholder protections (forward-link A10); MEES current floor SI 2015/962 vs EPC C aspiration (forward-link A8 + A9); landlord redress plural-schemes regime per §26.5 + §20.5 (forward-link A6); PRS Database under RRA 2025 (cross-link existing `prs-database-landlord-ombudsman-registration-requirements`); Decent Homes Standard extension to PRS via RRA 2025 (cross-link); HMO licensing under HA 2004 Pt 2/3 (forward-link A4); (d) **Tax-side hooks** — s.24 finance cost interaction under restructure-pressure (§4); CGT on portfolio rationalisation under sale-ground use (§22.5 spouse exemption interaction for portfolio restructure); rental-income deductibility of regulatory compliance spend; CGT base-cost reduction for grants received; (e) **What this page is NOT** — NOT writing the operational tenancy mechanics in depth (those are A2/A3/A5); NOT writing the redress-scheme enrolment depth (A6); NOT writing the MEES or BSA depth (A8/A9/A10). Lead page = orchestration + tax-side hooks + forward-link orchestration to the sub-pages.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** **A1 ships LAST in Bucket A** so it absorbs the forward-links to all the Bucket A sub-pages (A2/A3/A4/A5/A6/A8/A9/A10) plus any cross-bucket forward-links. The existing slug is grandfathered per §26.1 naming discipline — the body copy MUST use "Renters' Rights Act 2025" throughout (not 2026); only the slug retains the legacy form. The live page exists; this rewrite-in-place replaces it.

**Pool-thinness disclosure:** This is the lead page of the cluster — its value is in orchestration and tax-side hooks, not in depth on any single sub-topic. The differentiator is the enacted-Act-verbatim restatement plus the §26 regulatory cluster overview plus the cross-cluster tax hooks.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract orchestration patterns (most competitor "RRA 2025 tax implications" pages are themselves orchestration-style), forward-link patterns, tax-side framings, and check Bill-stage vs enacted language (drift risk high).

- https://www.ukpropertyaccountants.co.uk/renters-rights-act-tax-implications/
- https://www.uklandlordtax.co.uk/renters-rights-act-2025-landlord-tax-guide/
- https://www.landlordstax.co.uk/renters-rights-act-tax/
- https://www.shipleys.com/insights/renters-rights-act-2025-impact/

**Borrowable patterns:** competitor section-heading orchestration patterns; tax-side hook framings. Avoid propagating any Bill-stage language or any pre-Royal-Assent date assumptions.

---

## GSC data

*EXISTING page — has pre-existing GSC history. Primary topical queries expected: "Renters Rights Act tax implications", "RRA 2025 landlord tax", "Section 21 abolition tax implications", "Renters Rights Act landlord guide", "RRA 2025 changes for landlords". monitored_pages registration must track the same-slug rewrite takeover for any GSC regression vs the pre-rewrite baseline.*

---

## Closest existing pages (cannibalisation context)

- `landlords-considering-selling-portfolio-rra-2025-tax-implications` (cannibal score 0.27 — adjacent sale-context page; clean separation — that page is portfolio-sale-tax, A1 is lead orchestration)
- `renters-rights-act-2026-tax-implications-landlords` ITSELF (same slug — the rewrite target; cannibal score 1.0 because it IS the rewrite target)
- `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence` (0.19 — adjacent enforcement page; cross-link)
- `tenancy-agreement-template-rra-2025-compliant-clauses` (existing — adjacent template page; cross-link)
- `section-21-abolition-uk-landlord-possession-guide-2026` (existing — rule-of-law page; cross-link as the rule-of-law companion)
- `prs-database-landlord-ombudsman-registration-requirements` (existing — adjacent operational; cross-link)
- A2/A3/A4/A5/A6/A8/A9/A10 — all forward-link targets

**Cannibalisation discipline:**
- **CRITICAL** — read the existing live page (which may have been further drift-corrected mid-program after HP-lock per §26.1 in-place text update); diff the Wave 6 close state against the rewrite target at step 5.
- This rewrite REPLACES the existing page body in place — same slug, same URL, fresh body.
- Vary worked examples and personas from A2-A10.

---

## Redirect overlap (on launch)

**Same-slug rewrite — NO new redirect required.** The existing page at the slug stays live continuously through the rewrite. No middleware edit. The rewrite preserves the URL and replaces the body.

---

## Authority links worth considering (Stage 2 populated 2026-05-24, session selects 8-10 for lead page)

**Statutory (RRA 2025 — primary cluster):**
- RRA 2025 contents (Royal Assent 27 October 2025): https://www.legislation.gov.uk/ukpga/2025/26/contents
- RRA 2025 Part 2 (redress + database framework): https://www.legislation.gov.uk/ukpga/2025/26/part/2
- RRA 2025 s.1 (assured tenancies recast)
- RRA 2025 s.3 (periodic default)
- RRA 2025 s.4 (s.21 abolition)
- RRA 2025 s.6 (re-letting restriction)
- RRA 2025 s.8 (s.13 rent reform)
- RRA 2025 Sch 1 (reformed Sch 2 grounds — for orientation, depth at A5)
- SI 2025/1354 (No.1 commencement): https://www.legislation.gov.uk/uksi/2025/1354
- SI 2026/421 (No.2 commencement; s.74 + adjacent 1 May 2026): https://www.legislation.gov.uk/uksi/2026/421

**§26 cluster (forward-link cited):**
- BSA 2022 Sch 8 (A10 forward-link).
- SI 2015/962 (MEES current floor — A8 forward-link).
- HA 2004 Pt 2/3 (A4 forward-link).
- ITTOIA 2005 s.272A (s.24 finance cost restriction — tax-side hook).
- TCGA 1992 s.58 (spouse exemption interaction).

**Tax-side hooks:**
- PIM2120 (allowable expenses).
- BIM38000+ (penalties / fines non-deductibility).
- BIM40450+ (grants and subsidies).

**Government guidance:**
- gov.uk RRA 2025 landlord guidance (check at write time for evolving operational guidance).

**Cross-references in house_positions.md:** §20 (full cluster — enacted state — primary anchor); §26.1 (naming discipline — body uses "2025", slug uses "2026"); §26.7 (tax-side hooks across the regulatory cluster); §4 (s.24 finance cost interaction); §22.5 (spouse exemption interaction for portfolio restructure under RRA pressure); §16.45 — drift catches "Renters' Rights Act 2025" not 2026 throughout body, slug grandfathered.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** **HIGH PRIORITY** — (i) check no in-flight SI has commenced further RRA provisions between HP-lock 2026-05-24 and write date; (ii) verify the slug-vs-body "2025" / "2026" naming convention per §26.1 — slug retains legacy "2026", body uses "Renters' Rights Act 2025"; (iii) the existing live page may have been further drift-corrected mid-program; diff the merged Wave 6 close state against the rewrite target before drafting; (iv) verify all forward-link targets (A2/A3/A4/A5/A6/A8/A9/A10) are live on launch — if any sub-page is not yet shipped, hold the forward-link or stub it.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Individual landlord + Portfolio owner.

### CTA placement guidance (per this page — LEAD PAGE)
- 3 inline `<aside>` CTAs (more than sub-pages — lead-page convention):
  - After the §20 enacted-Act overview (high-intent: landlord realising scope of change)
  - After the §26 regulatory cluster overview
  - After the tax-side hooks section
- Vary opening; do NOT lead with "The Renters' Rights Act 2025 is now law...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 12-14 for lead page.

### Cannibalisation
- Read existing live page before writing — DIFF against Wave 6 close state.
- Vary persona figures from A2-A10.

### House positions
- §20 cluster primary; verbatim from §20.
- §26 cluster overview.
- §26.1 naming-discipline — body "2025", slug "2026".
- §16.45 drift catches — slug grandfathering, body-2025 discipline non-negotiable.

### Quality bar
- Word count: 3,200-3,800 (lead page slightly longer).
- FAQs: 12-14.
- New external authority links: 8-10.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is enacted-Act orchestration + §26 cluster overview + tax-side hooks + forward-link orchestration. Write to it.
- Vary H2s from A2-A10.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §20 cluster primary; §26 cluster + §26.1 + §26.7 + §4 + §22.5 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. **Read existing live page from `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md` — DIFF against Wave 6 close state for any drift corrections applied mid-program**. Read sub-page briefs (A2/A3/A4/A5/A6/A8/A9/A10) and confirm forward-link slugs.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: HIGH PRIORITY — check no in-flight commencement SI laid post-HP-lock; verify slug-vs-body naming discipline; confirm all forward-link targets are live**.
8. Fetch Pexels image (or retain existing if appropriate).
9. Write markdown with full frontmatter — **rewrite-in-place at the existing path**.
10. Build.
11. Verify six checks.
12. **No middleware edit required** (same-slug rewrite).
13. Register in `monitored_pages` (track GSC regression vs pre-rewrite baseline).
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags to `wave7_site_wide_flags.md` if any drift / forward-link gap.
18. Log discoveries.
19. **A1 is the LAST page in Bucket A — confirm bucket close.**

## Session-side watcher pattern

Standard. **Plus:** lead-page convention — forward-link integrity check (all A2-A10 links resolve on the live site at launch).

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug (grandfathered):**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review (DIFF against pre-rewrite state)
- 

### Citations added
- 

### Internal links added (forward to A2-A10 + adjacent cluster)
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
