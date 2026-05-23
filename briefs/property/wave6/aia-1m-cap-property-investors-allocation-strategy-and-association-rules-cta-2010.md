# Wave 6 brief: aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (supersedes 6 legacy AIA-named pages on quality + currency)
**Source markdown path on launch:** `Property/web/content/blog/aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010

---

## Manager pre-decisions

- **Suggested slug:** `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> AIA depth page focused on the operationally hardest mechanic: the **single-AIA-per-associated-companies-group rule**. CAA 2001 s.51A fixes the cap at £1m (permanent from 1 April 2023, made permanent by Finance (No. 2) Act 2023 s.8 — removing the prior temporary-uplift framework). Most landlord-facing competitor content treats £1m as a per-company entitlement, which is wrong for portfolio SPVs sitting under a HoldCo or under common-control individuals. The page walks the four layers of restriction: (1) s.51B — single AIA across all qualifying activities of one company; (2) s.51C — parent + subsidiaries share a single AIA (allocable as they think fit); (3) s.51E — two or more companies under common control AND **related** to one another share a single AIA, where "related" is defined at s.51G via the **shared premises condition** OR the **similar activities condition** (NACE first-level classification, >50% turnover overlap test); (4) s.51K allocation mechanics within a shared-AIA group. The "related" test is the trap most BTL SPV portfolios miss because property SPVs almost always satisfy the similar-activities NACE test (all rental letting) AND often the shared-premises condition (same accountant address, same registered office). Three worked allocations: (i) solo SPV £400k AIA-claim (clean, no association); (ii) five-SPV group all owned by individual H Patel, £1m must be shared across the five (Patel chooses allocation; integral features in SPV2 take priority); (iii) HoldCo group of four SPVs under PropCo HoldCo Ltd, single £1m AIA across the group, election under s.51A(3) to allocate against special-rate-pool first. Critical for the FIC / HoldCo readership.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C4 has an **A↔C seam at A7** (HoldCo group extraction). Per cross-bucket coordination notes: **C4 and A7 land on different branches in any order; each must cite the other**. Manager applies back-link at wave merge per §16.32 (bidirectional cross-reference). When C4's "HoldCo single-AIA allocation" section is drafted, link forward to A7's HoldCo group page. If A7 has not yet landed on main at C4 write time, log the forward-link as a TODO in the work-log.

**Pool-thinness disclosure:** AIA competitor coverage is large in volume but shallow on the associated-companies rule. Synthesise from CAA 2001 ss.51A-51N + CTA 2010 ss.18N + ss.25-34 (associated companies framework — note the FA 2021 reintroduction of "associated company" for marginal-relief purposes; the CAA 2001 "control + related" test is the CA-specific test, not the CTA 2010 marginal-relief test, even though they share statutory terminology). Distinguish carefully.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of associated-companies AIA (most competitors omit), £1m permanence framing (some still cite £200k or £1m-temporary), worked allocation examples, FAQ density on "do I get £1m per company".

- https://taxscape.deloitte.com/article/annual-investment-allowance.aspx — verified live 2026-05-23 (200). Big-4; useful for the £1m permanence framing and the associated-companies treatment.
- https://www.icaew.com/technical/tax/capital-allowances/annual-investment-allowance — verified live 2026-05-23 (200). Professional body technical reference; good for citation density on ss.51A-51N and the single-AIA rules.
- https://www.ukpropertyaccountants.co.uk/annual-investment-allowance/ — verified live 2026-05-23 (200). Mid-market specialist; useful for landlord-flavoured FAQ patterns.
- https://www.uklandlordtax.co.uk/capital-allowances/ — verified live 2026-05-23 (200). Reader-friendly framing; useful for the "what is AIA" reader-entry framing.

**Borrowable patterns:** ICAEW citation density is gold. Deloitte's allocation-strategy worked example is clean. Mid-market sources are weak on the associated-companies rule — defensible point of differentiation.

---

## GSC data

*This is a net-new page; primary topical queries expected: "AIA £1m permanent", "AIA associated companies", "AIA allocation between companies", "AIA property landlords", "AIA HoldCo group", "AIA buy-to-let SPV". The 6 legacy AIA pages on site have some GSC history but C4 is a structural replacement, not a rebuild.*

---

## Closest existing pages (cannibalisation context)

- `aia-capital-allowances` (category: `landlord-tax-essentials`) — legacy AIA pillar. C4 supersedes structurally on depth.
- `aia-capital-allowance-property-landlords` — duplicate-ish legacy page; C4 absorbs.
- `aia-allowance-uk-property-investors` — duplicate-ish legacy page; C4 absorbs.
- `capital-allowance-aia-property-landlords` — duplicate-ish legacy page; C4 absorbs.
- `what-is-aia-in-tax` — generic AIA-entry page; C4 absorbs.
- `can-you-claim-aia-on-second-hand-assets` (category: `landlord-tax-essentials`) — narrow Q&A page on second-hand assets; this is a useful narrow companion and should stay live; C4 links to it as the second-hand-asset detail.
- C1 pillar (forward-link to cluster spine).
- C5 (full expensing sibling; same branch, forward-link to the £1m-+-100% interaction).

**Cannibalisation discipline:**
- The five duplicate-ish AIA pages above represent legacy on-site duplication. C4 is the new canonical AIA page. Recommend post-launch redirect rebuild from the four obvious duplicates to C4; flag in `wave6_site_wide_flags.md` for manager merge decision.
- Do not duplicate C5's full-expensing worked figures; C4 owns the AIA mechanic, C5 owns the FYA s.45S mechanic, and the £1m-+-100% interaction is covered in a single paragraph in each page (mirror-link, not duplicate-detail).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: the 6 legacy AIA slugs do NOT appear as middleware redirect targets (they are live category-routed pages). No middleware edit on initial launch. Flag for manager merge decision: should the 5 duplicate AIA-named pages be redirected to C4 at post-launch hygiene? Add to `wave6_site_wide_flags.md`.

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.51A (£1m maximum permanent from 1 April 2023): https://www.legislation.gov.uk/ukpga/2001/2/section/51A
- s.51B (single AIA per company across all qualifying activities): https://www.legislation.gov.uk/ukpga/2001/2/section/51B
- s.51C (parent + subsidiary single shared AIA): https://www.legislation.gov.uk/ukpga/2001/2/section/51C
- s.51E (common-control + related companies single AIA): https://www.legislation.gov.uk/ukpga/2001/2/section/51E
- s.51F (control definition): https://www.legislation.gov.uk/ukpga/2001/2/section/51F
- s.51G (related definition; shared premises / similar activities NACE test): https://www.legislation.gov.uk/ukpga/2001/2/section/51G
- s.51K (allocation within shared-AIA groups): https://www.legislation.gov.uk/ukpga/2001/2/section/51K

**HMRC manuals:**
- CA23080 (AIA general): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23080
- CA20070 (transitional / period straddling): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca20070

**gov.uk public:**
- AIA detail: https://www.gov.uk/capital-allowances/annual-investment-allowance

**Cross-references in house_positions.md:** §25.3 (AIA primary anchor — full ss.51A-51N walk), §21.5 (FIC mechanics, including FIC-level AIA availability where the FIC owns commercial property), §25.2 (P&M general framework AIA sits within), §25.10 (do-not-write list: "AIA cap is £200,000" false, "AIA is £1m temporarily" false, "Plant in a residential dwelling is claimable under AIA" false, "Cars are AIA-qualifying" false).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify the £1m permanence and the FA(No.2)2023 s.8 effective date (1 April 2023) at write time. The AIA history is littered with temporary uplifts and any carried figure may be stale.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer. Never duplicate.
- `<aside>` styled by global CSS; you add no classes.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the associated-companies rule explanation (high-intent: reader has just learned their portfolio may be sharing one £1m, not multiple)
  - After the HoldCo group worked allocation (reader needs structural review)
  - Optionally after the "AIA does NOT extend to residential dwellings" misconception correction
- Vary opening; do NOT lead with "The Annual Investment Allowance is...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read the 6 legacy AIA pages before writing. C4 is the new pillar; legacy pages will be redirect candidates at post-launch hygiene.
- Vary worked figures from C5 and C1 worked-example figures.

### House positions
- §25.3 is the primary anchor (full s.51A + ss.51B-51N walk verbatim).
- §25.10 do-not-write list is critical for AIA: confirm £1m permanent, confirm dwelling-house bar, confirm cars excluded.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the associated-companies / single-AIA-per-related-group depth. Write to it.
- Vary H2s from C1 and C5.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.3 primary; §25.2 + §25.10 + §21.5 adjacent.
2. Claim in `wave6_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages (especially the 6 legacy AIA pages).
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify £1m permanence at write time**.
8. Fetch Pexels hero image.
9. Write markdown at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify six checks.
12. **No middleware edit on initial launch.** Flag legacy-AIA-redirect question in `wave6_site_wide_flags.md`.
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

### Flags raised to wave6_site_wide_flags.md
- 

### 2-3 sentence summary
