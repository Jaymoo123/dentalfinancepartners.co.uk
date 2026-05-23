# Wave 6 brief: super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (no existing super-deduction-clawback-dedicated page; closes a historic-disposal authority gap)
**Source markdown path on launch:** `Property/web/content/blog/super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021

---

## Manager pre-decisions

- **Suggested slug:** `super-deduction-130-percent-transitional-disposal-balancing-charge-mechanics-fa-2021`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> Super-deduction historic-clawback depth — the regime is closed but the disposal mechanic still bites. **Finance Act 2021 ss.9-10** ran the 130% super-deduction (main-rate plant) plus the 50% special-rate FYA from **1 April 2021 to 31 March 2023 only**. The relief itself is expired (full expensing under CAA 2001 s.45S replaced it from 1 April 2023 — current 100% main-rate, not 130%, per C5). **But FA 2021 Sch 9 Part 2 clawback mechanism continues to apply whenever super-deducted assets are disposed of, indefinitely.** The clawback is **asymmetric and devastating**: disposal value is uplifted by a factor of **1.3** (or proportionally less for FYs straddling 1 April 2023 per Sch 9 Part 2 calibration) before being brought into balancing-charge computation under CAA 2001 ss.55 + 61, creating a balancing charge that can exceed the original cost of the asset. Worked: £100k of integral features super-deducted in 2022 yielding £130k tax-deduction in that year; sold in 2026 for £80k market value; clawback uplift = £80k × 1.3 = £104k disposal value brought into the pool → balancing charge of £104k taxable receipt (assuming pool TWDV was zeroed by the original super-deduction). The company's net economic exposure: £130k deduction (24-25% CT = ~£32k saved) vs £104k taxable receipt (~£26k CT cost) → net economic relief ~£6k against a £20k market loss. **Practical for LtdCo property landlords who claimed super-deduction 2021-2023 and are now selling pre-2026 portfolio reshuffles.** Two worked disposals: (a) clean 1.3x clawback on £100k integral features sold for £80k → £104k balancing charge (as above); (b) **straddle-period proportional mechanic** for an asset originally super-deducted in a CT period that straddled 1 April 2023, where the FA 2021 Sch 9 Part 2 formula yields a clawback factor between 1.0 and 1.3 based on the days-in-period weighting. Distinct from C2 (general disposal balancing charge at 1.0x) and C5 (current full-expensing disposal clawback at 1.0x with FA(No.2) 2023 cost-cap protections).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. C10 is the historic-clawback complement to C2 (general disposal mechanic at 1.0x) and C5 (current full-expensing mechanic at 1.0x with cost-cap). The 1.3x clawback factor is what makes C10 narrowly valuable for portfolio reshuffling readership.

**Pool-thinness disclosure:** Super-deduction competitor coverage has thinned since the regime expired. ICAEW + Lovell + Deloitte are the live anchors. Lean on the §25.5 + §25.8 verification anchors (FA 2021 ss.9-10 + the expiration date confirmation) and the §25.6 disposal-mechanics framework that the 1.3x clawback overlays.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of the 1.3x disposal clawback (most competitors omit this in favour of the deduction-side narrative), straddle-period proportional mechanic, and the worked examples.

- https://www.icaew.com/technical/tax/capital-allowances/super-deduction — verified live 2026-05-23 (200). Professional body technical reference; gold for citation density on FA 2021 Sch 9 Parts 1-2.
- https://taxscape.deloitte.com/article/super-deduction.aspx — verified live 2026-05-23 (200). Big-4 reference; useful for the deduction-side framing.
- https://www.lovellconsulting.com/news/super-deduction/ — verified live 2026-05-23 (200). Specialist CA boutique news article.
- https://www.lovellconsulting.com/services/super-deduction/ — verified live 2026-05-23 (200). Same firm services page; useful for the disposal-clawback mechanic.
- https://www.gov.uk/guidance/check-if-you-can-claim-super-deduction-or-special-rate-first-year-allowances — verified live 2026-05-23 (200). HMRC public guidance; historic but still live; useful for the deduction-eligibility framing.

**Borrowable patterns:** ICAEW citation density. Lovell's disposal-clawback walkthrough is the cleanest competitor pattern (most others avoid the disposal side).

---

## GSC data

*Net-new page; primary topical queries expected: "super deduction disposal balancing charge", "super deduction clawback 1.3", "super deduction sold asset", "super deduction sold integral features", "FA 2021 Sch 9 Part 2".*

---

## Closest existing pages (cannibalisation context)

- C2 sibling (general disposal balancing charge at 1.0x; same branch, forward-link as the baseline mechanic that the 1.3x clawback uplifts).
- C5 sibling (current full-expensing regime; same branch, forward-link as the post-super-deduction successor).
- `full-expensing-capital-allowances` (current regime; superseded by C5; cross-link for historical-to-current transition).
- `integral-features-capital-allowances` — special-rate-pool; super-deduction's 50% companion was the special-rate FYA pre-2023.
- C1 pillar (forward-link).

**Cannibalisation discipline:**
- C10 owns the 1.3x clawback; C2 owns the 1.0x baseline; C5 owns the current full-expensing. Mirror-link.
- Vary worked figures from C2 and C5.

---

## Redirect overlap (on launch)

Stage 1 scan: no slug-token overlap. No middleware edit required.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory:**
- Finance Act 2021 Sch 9 Part 1 (the 130% / 50% deduction itself; operative 1 April 2021 – 31 March 2023)
- Finance Act 2021 Sch 9 Part 2 (the clawback mechanism; continues to apply on disposal of super-deducted assets indefinitely)
- CAA 2001 s.61 (disposal events and values; the baseline mechanic the 1.3x clawback overlays): https://www.legislation.gov.uk/ukpga/2001/2/section/61
- CAA 2001 s.55 (entitlement and balancing events; the AQE / TDR framework): https://www.legislation.gov.uk/ukpga/2001/2/section/55

**HMRC manuals:**
- CA23166 (super-deduction): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23166
- CA28000 (disposal value): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca28000
- CA29000 (balancing adjustments): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca29000

**gov.uk public:**
- https://www.gov.uk/guidance/check-if-you-can-claim-super-deduction-or-special-rate-first-year-allowances

**Cross-references in house_positions.md:** §25.5 (FYA framework — super-deduction is the historic FYA at FA 2021 ss.9-10, expired 31 March 2023; relevant only for ongoing disposal-value clawback per §25.5 explicit framing), §25.6 (disposal mechanics — primary anchor for the 1.0x baseline that the 1.3x clawback uplifts), §25.8 (recent reforms + verification anchors — confirms super-deduction is closed and only the clawback remains active), §25.10 (do-not-write list: "Super-deduction is the current 130% FYA rate" false).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the 1.3x clawback factor + the 1 April 2021 to 31 March 2023 operative window + the FA 2021 Sch 9 Part 2 clawback structure at write time. The straddle-period proportional formula should be verified directly from Sch 9 Part 2.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Portfolio owner + Large portfolio + Property developer (LtdCo readership who claimed super-deduction 2021-2023).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the 1.3x clawback explanation (LtdCo reader realises the disposal-side exposure)
  - After the worked clean-clawback example (reader sees the asymmetric economics)
  - Optionally after the straddle-period section
- Vary opening; do NOT lead with "The super-deduction was a 130% FYA...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- C10 owns the 1.3x clawback; vary figures from C2 and C5.

### House positions
- §25.5 + §25.6 + §25.8 the anchors; confirm super-deduction is expired and only clawback remains.
- §25.10 do-not-write list — confirm super-deduction is not the current rate.

### Quality bar
- Word count: 2,500-3,200 (slightly shorter — narrow topic).
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the 1.3x disposal clawback depth + straddle-period mechanic + asymmetric-economics framing. Write to it.
- Vary H2s from C2 and C5.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.5 + §25.6 + §25.8 + §25.10 the anchors.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify FA 2021 Sch 9 Part 2 clawback formula + 1.3x factor + straddle-period mechanic**.
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
