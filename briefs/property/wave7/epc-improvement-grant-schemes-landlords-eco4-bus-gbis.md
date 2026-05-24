# Wave 7 brief: epc-improvement-grant-schemes-landlords-eco4-bus-gbis

**Site:** property
**Bucket:** A (Regulatory / compliance — MEES grant-schemes cluster)
**Session:** A
**Pick ID:** A9
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/epc-improvement-grant-schemes-landlords-eco4-bus-gbis.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/regulatory-and-compliance/epc-improvement-grant-schemes-landlords-eco4-bus-gbis

---

## Manager pre-decisions

- **Suggested slug:** `epc-improvement-grant-schemes-landlords-eco4-bus-gbis`
- **Suggested category:** `regulatory-and-compliance`
- **Bucket:** A (Regulatory / compliance — MEES grant-schemes cluster)
- **Framing differentiator (Stage 2, 2026-05-24):**

> Landlord eligibility (partial) across the four current energy-improvement grant schemes. (a) **ECO4 (Energy Company Obligation 4)** — April 2022 to March 2026 under SI 2022/875; verify successor scheme status at write time (ECO5 / equivalent successor); LA Flex route allows landlord-led referrals where LA designates eligible properties; targets low-income / vulnerable households (landlord access partial); fuel-poverty objective; (b) **Boiler Upgrade Scheme (BUS)** — £7,500 grant for air-source heat pump / ground-source heat pump / biomass boiler installation; gov.uk-administered direct; landlord-eligible (private rentals included); installer-claims-grant mechanism (not landlord-claims); MCS certification requirement; current scheme runs through 2028 (verify duration at write time); (c) **Great British Insulation Scheme (GBIS)** — insulation-focused; lower-income properties + EPC D-G; landlord access via LA Flex where designated; reduced scope vs ECO4; (d) **Home Upgrade Grant 2 (HUG2)** — off-gas-grid properties; ended March 2025 (verify replacement scheme at write time); (e) **Operational reality** — landlords typically access via LA Flex referral path; direct private-landlord eligibility most accessible via BUS; ECO4/GBIS rarely accessible without LA designation; (f) **Tax treatment of grants** per §26.7 — grant receipts against capital expenditure reduce CGT base cost (HMRC general grants-against-expenditure principle); grant receipts against revenue expenditure reduce the deductible revenue expense; the landlord cannot claim the grant amount itself as expenditure; (g) cross-ref to A8 for the EPC C 2030 trajectory context (policy aspiration not enacted). NOT writing the EPC C 2030 trajectory (A8 covers); NOT writing the wider homeowner-grant landscape (out of scope — landlord only).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A9 ↔ A8 reciprocal forward-links. ECO4 March 2026 end-date + HUG2 March 2025 end-date are the two scheme-status watchpoints — successor scheme status MUST be verified at write time.

**Pool-thinness disclosure:** Competitor coverage is reasonable on landlord access to BUS but tends to over-state ECO4/GBIS landlord-direct access. The LA-Flex-referral-reality plus tax treatment of grant receipts is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of landlord-direct vs LA-Flex-referral routes, grant figures (verify against gov.uk landing pages), tax treatment (most competitors miss the base-cost-reduction mechanic).

- https://www.ukpropertyaccountants.co.uk/landlord-energy-grants-eco4/
- https://www.uklandlordtax.co.uk/boiler-upgrade-scheme-landlord/
- https://www.landlordstax.co.uk/landlord-insulation-grants/

**Borrowable patterns:** competitor grant-comparison tables (verify figures); LA-Flex-referral framings.

---

## GSC data

*Net-new page; primary topical queries expected: "ECO4 landlord eligibility", "boiler upgrade scheme rental property", "GBIS landlord", "landlord insulation grant 2026", "BUS heat pump grant landlord".*

---

## Closest existing pages (cannibalisation context)

- `rental-income-tax-uk-complete-guide-landlords` (cannibal score 0.10 — false-positive)
- `annual-investment-allowance-landlords-uk` (0.09 — false-positive)
- `capital-allowances-on-property` (0.09 — false-positive)
- A8 (EPC C 2030 — reciprocal forward-link)
- A10 (BSA 2022 — adjacent regulatory)

**Cannibalisation discipline:**
- Vary persona figures from A8.

---

## Redirect overlap (on launch)

No existing slug matches A9's grant-schemes scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-24, session selects 6-8)

**Statutory (parent powers + scheme SIs):**
- Electricity and Gas (Energy Company Obligation) Order 2022 (SI 2022/875 — ECO4): https://www.legislation.gov.uk/uksi/2022/875
- Electricity Act 1989 / Gas Act 1986 (parent powers for ECO regime).

**Government guidance (scheme landings):**
- BUS landing: https://www.gov.uk/apply-boiler-upgrade-scheme
- GBIS landing: https://www.gov.uk/government/publications/great-british-insulation-scheme
- ECO4 landing: https://www.ofgem.gov.uk/eco4
- HUG2 (or successor — verify at write time): https://www.gov.uk/government/publications/home-upgrade-grant
- LA Flex (Local Authority Flexible Eligibility) guidance.

**Tax-side (grants against expenditure):**
- BIM40450+ (grants and subsidies — general HMRC manual).
- PIM2120 (allowable rental expenses — interaction with grant receipts).
- TCGA 1992 s.50 / CG12700+ (grant treatment in CGT base-cost calculations).

**Cross-references in house_positions.md:** §26.3 (MEES regime — grant schemes paragraph — primary anchor); §26.7 (tax-side: ECO4 / GBIS / BUS grant receipts reduce CGT base cost — HMRC general grants-against-expenditure principle).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Re-verify ECO4 March 2026 end-date + successor scheme status at write time; re-verify HUG2 March 2025 end-date + replacement scheme; verify BUS £7,500 figure against gov.uk landing; verify GBIS eligibility scope; verify tax treatment of grants per §26.7.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Individual landlord + Portfolio owner.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the BUS landlord-eligible section (highest-intent — direct landlord access)
  - After the LA-Flex-referral-reality section
  - Optionally after the tax treatment section
- Vary opening; do NOT lead with "Several grant schemes are available...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Vary persona figures from A8.

### House positions
- §26.3 primary (grant-schemes paragraph).
- §26.7 (tax-side base-cost-reduction).
- §16.45 drift catches — scheme end-dates + successor scheme verification.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is LA-Flex reality + tax treatment of grant receipts. Write to it.
- Vary H2s from A8.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §26.3 primary (grant-schemes paragraph); §26.7 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify ECO4 end-date + successor, HUG2 end-date + replacement, BUS £7,500, GBIS eligibility, tax treatment per §26.7**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.**
13. Register in `monitored_pages`.
14. Commit (BEFORE marking done; do NOT include tracker).
15. Fill work-log.
16. Mark done.
17. Append flags to `wave7_site_wide_flags.md` if scheme-state movement.
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
