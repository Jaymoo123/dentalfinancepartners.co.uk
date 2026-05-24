# Wave 7 brief: renters-rights-act-periodic-tenancy-switch-landlord-obligations

**Site:** property
**Bucket:** A (Regulatory / compliance — RRA 2025 cluster)
**Session:** A
**Pick ID:** A3
**Brief type:** Net-new page (operational mechanics page distinct from headline-rule periodic-default coverage)
**Source markdown path on launch:** `Property/web/content/blog/renters-rights-act-periodic-tenancy-switch-landlord-obligations.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/regulatory-and-compliance/renters-rights-act-periodic-tenancy-switch-landlord-obligations

---

## Manager pre-decisions

- **Suggested slug:** `renters-rights-act-periodic-tenancy-switch-landlord-obligations`
- **Suggested category:** `regulatory-and-compliance`
- **Bucket:** A (Regulatory / compliance — RRA 2025 cluster)
- **Framing differentiator (Stage 2, 2026-05-24):**

> Operational mechanics for the AST-to-periodic conversion under the Renters' Rights Act 2025 (2025 c. 26): (a) **conversion date sequencing** — when SI 2026/421 (and any successor commencement SI) brings s.1 (assured tenancies recast) and s.3 (periodic default) into force, and how that interacts with in-flight fixed-term ASTs (the practical question every landlord asks: does my fixed-term to October 2027 still survive the conversion, or does it convert on the commencement date?); (b) **contractual clause carve-outs** — which existing AST clauses survive into the converted periodic tenancy (rent obligation, deposit terms, repairing obligations, permitted-occupiers list) and which are voided by the periodic default (fixed-term break clauses, fixed-term renewal mechanics, fixed-term rent-review clauses that conflict with s.8 reform of HA 1988 s.13); (c) **rent-review clause interaction with s.13 mechanics under s.8 RRA 2025** — the new s.13 process for periodic tenancies (annual maximum, tribunal challenge route per §20.6) and how existing contractual rent-review clauses are constrained; (d) **deposit + Right-to-Rent compliance after conversion** — Tenancy Deposit Scheme prescribed-information re-service triggers, RTR re-check obligation on conversion (or confirmation that no re-check is required if the tenant remains the same), Section 21 historic protections becoming irrelevant; (e) practical action list for landlords with portfolios of ASTs straddling commencement: audit-clause review, tenant-communication template, rent-review-clause amendment offer; (f) NO tax-side hooks (tax-side covered at A1). NOT writing the headline-rule "periodic tenancy is default" page (separate adjacent territory).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A3 is internally consistent with A2/A5 (RRA cluster). No cross-bucket dependencies. A3 forward-cited from A1 (lead page) but A1 ships last.

**Pool-thinness disclosure:** Specialist competitor coverage of the **contractual-clause carve-out** territory is sparse. The clause-by-clause survival analysis combined with rent-review interaction is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract transitional framing, conversion-date treatment, treatment of rent-review clauses, deposit re-service treatment. Cross-check Bill-stage vs enacted language.

- https://www.uklandlordtax.co.uk/periodic-tenancy-conversion-landlord-guide/
- https://www.ukpropertyaccountants.co.uk/ast-periodic-tenancy-rra-transition/
- No specialist competitor coverage identified for full contractual-clause-carve-out depth at HP-lock; check NRLA/RLA practitioner notes at write time.

**Borrowable patterns:** competitor transitional-table patterns; clause-survival tables (rare in competitor coverage — defensible territory).

---

## GSC data

*Net-new page; primary topical queries expected: "AST to periodic RRA 2025", "fixed-term tenancy conversion 2026", "rent review clause periodic tenancy", "deposit re-service periodic conversion", "tenancy clauses survive RRA conversion".*

---

## Closest existing pages (cannibalisation context)

- `tenancy-agreement-template-rra-2025-compliant-clauses` (cannibal score 0.31 — adjacent template page; A3 differentiates on operational conversion mechanics not template content)
- `renters-rights-act-2026-tax-implications-landlords` (0.29 — A1 same-slug rewrite target; tax-side not operational)
- `pet-rights-tenancy-landlord-refusal-reasonable-grounds` (0.35 top score is false-positive token overlap; topic distinct per cannibal audit decision)
- A2 (operational notice mechanics for s.8 grounds — adjacent in cluster)
- A5 (Schedule 1 grounds-reform sub-page — adjacent)
- A6 (Redress Scheme — adjacent)

**Cannibalisation discipline:**
- Cross-link `tenancy-agreement-template-rra-2025-compliant-clauses` as the **template companion** (not a duplicate).
- Vary worked examples and personas from A1, A2, A5, A6.

---

## Redirect overlap (on launch)

No existing slug matches A3's operational conversion scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-24, session selects 6-8)

**Statutory (RRA 2025 + amended HA 1988):**
- RRA 2025 s.1 (assured tenancies recast): https://www.legislation.gov.uk/ukpga/2025/26/section/1
- RRA 2025 s.3 (periodic default): https://www.legislation.gov.uk/ukpga/2025/26/section/3
- RRA 2025 s.8 (s.13 rent-increase mechanic — the new tribunal-challenge route): https://www.legislation.gov.uk/ukpga/2025/26/section/8
- Housing Act 1988 s.13 as amended (operative consolidated text — rent-increase machinery for periodic tenancies): https://www.legislation.gov.uk/ukpga/1988/50/section/13
- SI 2026/421 (No.2 commencement; check at write time for any subsequent commencement SI affecting s.1/s.3): https://www.legislation.gov.uk/uksi/2026/421
- SI 2025/1354 (No.1 commencement; preliminary): https://www.legislation.gov.uk/uksi/2025/1354

**Deposit + RTR:**
- Housing Act 2004 Pt 6 Ch 4 (Tenancy Deposit Schemes — re-service of prescribed information context): https://www.legislation.gov.uk/ukpga/2004/34/part/6
- Immigration Act 2014 s.22 (Right to Rent — interaction with existing-tenant conversion): https://www.legislation.gov.uk/ukpga/2014/22/section/22

**Government guidance:**
- gov.uk RRA 2025 landlord guidance (check at write time for periodic-conversion specific guidance).

**Cross-references in house_positions.md:** §20.3 (periodic-tenancy default + AST phase-out — primary anchor); §20.6 (Section 13 rent reform + tribunal challenge); §20.9 (transition for existing tenancies); §20.2 (s.21 abolition mechanic — periodic is what's left); §20.12 Welsh ss.43-49 carve-out under SI 2026/6 — out of England-only scope, EXCLUDE.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.1/s.3 RRA 2025 verbatim language; verify commencement-date sequencing under SI 2026/421 and any subsequent commencement SI; verify the new s.13 mechanics under RRA 2025 s.8.

### Voice
- **No em-dashes.**
- Practical, specific.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Individual landlord + Portfolio owner.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the contractual-clause carve-out section (high-intent: landlord auditing AST portfolio)
  - After the deposit + RTR re-service section
  - Optionally after the practical action list
- Vary opening; do NOT lead with "Periodic tenancies are now the default...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Cross-link `tenancy-agreement-template-rra-2025-compliant-clauses` as the template companion.
- Vary persona figures from A1, A2, A5, A6.

### House positions
- §20.3 primary; verbatim s.3 RRA 2025.
- §20.6 (s.13 rent-review reform).
- §16.45 drift catches — commencement date verification; Welsh carve-out exclusion.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is contractual-clause-carve-out depth + rent-review interaction. Write to it.
- Vary H2s from A1, A2, A5, A6.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §20.3 primary; §20.6 + §20.9 + §20.2 adjacent; confirm §20.12 Welsh carve-out exclusion.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify s.1/s.3/s.8 RRA 2025 verbatim + commencement SI status at write time + s.13 HA 1988 amended text**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.**
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags to `wave7_site_wide_flags.md`.
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

### Flags raised to wave7_site_wide_flags.md
- 

### 2-3 sentence summary
