# Wave 6 brief: fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (no existing FHL-CA-specific page; existing FHL pages are rental-side or incorporation-side)
**Source markdown path on launch:** `Property/web/content/blog/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Post-FHL-abolition capital-allowances depth — what happens to **existing FHL plant-and-machinery pools** after the regime ends. The FHL regime was abolished by **Finance Act 2025 Schedule 5** (NOT FA 2024 Sch 5 — manager-corrected brief-instruction drift; FA 2024 Sch 5 is the unrelated museums-and-galleries Schedule). FA 2025 Sch 5 Part 3 omitted CAA 2001 s.15(1)(c) (UK FHL) and s.15(1)(da) (EEA FHL) from the qualifying-activity list with effect from **1 April 2025 (CT) / 6 April 2025 (IT)** per Part 5 paragraph 12 commencement. The page walks the four operational consequences: (1) **grandfathered pool balances continue** — pre-commencement P&M expenditure incurred for the FHL business remains live; pool balances transfer into the corresponding ordinary property business pool (UK or overseas) under the FA 2025 Sch 5 Part 3 transitional provisions, and writing-down continues at 18% main / 6% special rate as before; (2) **no new FHL P&M expenditure qualifies** post-commencement — any new expenditure on a former-FHL property must satisfy the ordinary property business rules, which means the **s.35 dwelling-house restriction bites in full** (cross-ref C7 for the common-parts exception, but FHL properties typically don't have HMO-style communal areas, so the s.35 restriction effectively closes off P&M claims on new spend); (3) **the balancing-charge trap on sale post-2025** — because the grandfathered pools are still active, disposing of the property triggers disposal-value computation per CAA 2001 s.61 against the pool TWDV, potentially generating a balancing charge clawing back previously-claimed allowances (worked example: £45k of pre-2025 FHL P&M with £18k TWDV at sale date in 2026, sale apportionment to fixtures = £35k, balancing charge = £17k taxable); (4) **the loss-relief transitional** — FA 2025 Sch 5 Parts 1-2 treat unutilised pre-abolition FHL losses under the property-business loss rules post-commencement; CGT-side preservation for BADR / Investors' Relief on qualifying pre-abolition trading-period disposals per Sch 5 Part 4 (operationally complex; pages on FHL exit planning must surface Part 4 transitional without generalising "FHL CGT advantages are gone"). **CRITICAL CITATION DISCIPLINE: FHL abolition is FA 2025 Sch 5, not FA 2024 Sch 5.** This is the seventh consecutive Bill-vs-enacted-Act drift catch in the program (NETNEW_PROGRAM §3 errata). Sister page to Wave 1 B5 (`transferring-fhl-portfolio-to-limited-company`): B5 is the incorporation route as an FHL-abolition response; C8 is the keep-as-FHL but lose-regime route, specifically on the CA side.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. C8 is sister to Wave 1 B5 (incorporation route) and Wave 3 `serviced-accommodation-tax-fhl-abolition-april-2025` (already on-site). Cross-link both.

**Drift-catch carryover:** The single most-load-bearing citation drift in Bucket C. Cite **FA 2025 Sch 5** (not FA 2024 Sch 5). Confirm at write time.

**Pool-thinness disclosure:** Competitor coverage on FHL abolition is volume-heavy but most pages frame the income-tax / loss-relief side; the CA-side transitional is C8's defensible point.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the CA-side transitional (most competitors focus on income tax), confirmation of FA 2025 Sch 5 (drift-catch — many competitor pages still say FA 2024), commencement-date framing (1 April 2025 CT / 6 April 2025 IT).

- https://www.icaew.com/insights/tax-news/2024/oct-2024/furnished-holiday-lettings-tax-regime-abolition — verified live 2026-05-23 (200). Professional body news; useful for the abolition-framework confirmation. **Note: this page is from October 2024 and may pre-date Royal Assent of FA 2025; verify the page's citation accuracy at write time and confirm with legislation.gov.uk if there's a Bill-vs-Act drift.**
- https://www.icaew.com/technical/tax/capital-allowances/fhl — verified live 2026-05-23 (200). Professional body technical reference; should be the cleanest source for the CA-side transitional.
- https://www.gateley.com/insights/articles/legal-insight/fhl-abolition-from-april-2025-what-it-means-for-furnished-holiday-let-owners — verified live 2026-05-23 (200). Law firm overview; useful for the structural abolition framing.
- https://www.ukpropertyaccountants.co.uk/fhl-abolition/ — verified live 2026-05-23 (200). Mid-market specialist; useful for landlord-flavoured FAQ patterns.
- https://www.uklandlordtax.co.uk/furnished-holiday-lets/ — verified live 2026-05-23 (200). Reader-friendly framing.

**Borrowable patterns:** ICAEW citation density. Gateley's structural-abolition walkthrough is clean. ukpropertyaccountants and uklandlordtax for reader-friendly FAQ patterns. **All sources must be cross-checked against legislation.gov.uk for FA 2025 vs FA 2024 framing.**

---

## GSC data

*Net-new page; primary topical queries expected: "FHL capital allowances after abolition", "FHL pool balance transitional", "FHL balancing charge on sale 2025", "FA 2025 Sch 5 FHL", "former FHL plant and machinery". The on-site `serviced-accommodation-tax-fhl-abolition-april-2025` has some GSC; C8 is the CA-specific complement.*

---

## Closest existing pages (cannibalisation context)

- `transferring-fhl-portfolio-to-limited-company` (Wave 1 B5; category: `incorporation-and-company-structures`) — incorporation-route response to FHL abolition. C8 is the keep-FHL CA-specific complement. Cross-link.
- `furnished-holiday-let-tax-rules-exemptions` (category: `section-24-and-tax-relief`) — base FHL page; needs updating post-abolition. Cross-link as the base reference.
- `serviced-accommodation-tax-fhl-abolition-april-2025` (Wave 3) — abolition overview; cross-link.
- `holiday-let-tax-calculator-fhl-changes` — calculator page; cross-link.
- C1 pillar (forward-link).

**Cannibalisation discipline:**
- C8 owns the CA-specific transitional; the existing FHL pages cover income tax, incorporation, and overview. Mirror-link.
- Vary worked figures from B5 and the existing FHL abolition page.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.15 (qualifying activities; post-FA-2025 omission of s.15(1)(c) and (da)): https://www.legislation.gov.uk/ukpga/2001/2/section/15
- s.35 (dwelling-house restriction; bites in full on post-2025 FHL spend): https://www.legislation.gov.uk/ukpga/2001/2/section/35
- s.61 (disposal events and values; balancing-charge trap on post-2025 sale): https://www.legislation.gov.uk/ukpga/2001/2/section/61

**Other statutory:**
- **Finance Act 2025 Schedule 5** (FHL abolition; commencement 1 April 2025 CT / 6 April 2025 IT per Part 5 paragraph 12): https://www.legislation.gov.uk/ukpga/2025/8/schedule/5
  - **CRITICAL: confirm at write time that the URL resolves to the FHL Schedule, not the museums-and-galleries Schedule of a different Finance Act.**
- ITTOIA 2005 ss.322-328 (pre-2025 FHL rental income — superseded but historical reference for grandfathered context)

**HMRC manuals:**
- PIM4100 (FHL chapter — pre-abolition; check for HMRC update): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4100
- PIM4105 (FHL conditions — pre-abolition): https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4105
- CA20020 (dwelling-house definition): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca20020

**Cross-references in house_positions.md:** §25.7 (FHL transitional FA 2025 Sch 5 — primary anchor with verbatim commencement + Part 3 grandfathering + Part 4 CGT preservation), §25.1 (s.15 qualifying activity gateway; the omission mechanic), §25.6 (disposal mechanics — balancing-charge trap on post-2025 sale), §25.10 (do-not-write list: "FHL is still a separate qualifying activity for capital allowances" false, "FHL abolition is in Finance Act 2024 Schedule 5" false — the load-bearing drift catch), §6 (FHL abolition transition narrative for cross-reference).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** **The single most-important verification on this brief: confirm FA 2025 Sch 5 (NOT FA 2024 Sch 5) for the FHL abolition citation.** Also verify the 1 April 2025 (CT) / 6 April 2025 (IT) commencement dates per Part 5 paragraph 12, and the transitional pool-balance treatment under Part 3.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Individual landlord + Portfolio owner (former-FHL operator readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the grandfathered-pool transitional explanation (former-FHL operator realises they still have live pool balances)
  - After the balancing-charge-trap-on-post-2025-sale section (operator planning sale needs urgent review)
  - Optionally after the Part 4 CGT preservation section
- Vary opening; do NOT lead with "Following the abolition of the FHL regime...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read B5 + existing FHL pages before writing.
- Vary worked figures.

### House positions
- §25.7 primary; verbatim FA 2025 Sch 5 Part 3 + commencement framing.
- §25.10 do-not-write list — confirm FA 2025 not FA 2024.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is post-abolition CA-side transitional + grandfathered-pool mechanic + balancing-charge trap on post-2025 sale. Write to it.
- Vary H2s from C1 through C7.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.7 primary; §25.1 + §25.6 + §25.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify FA 2025 Sch 5 (not FA 2024 Sch 5) + commencement dates + Part 3 grandfathering text on legislation.gov.uk**.
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
