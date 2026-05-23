# Wave 6 brief: hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property

**Site:** property
**Bucket:** C (Capital allowances + SBA + FYA — CAA 2001 cluster)
**Session:** C
**Brief type:** Net-new page (supersedes shallow legacy `hmo-capital-allowances-multi-tenant-landlords-claim`)
**Source markdown path on launch:** `Property/web/content/blog/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property

---

## Manager pre-decisions

- **Suggested slug:** `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** C (Capital allowances + SBA + FYA)
- **Framing differentiator (Stage 2, 2026-05-23):**

> HMO-specific capital-allowances depth — operationally the most valuable narrow page in the cluster for the HMO landlord readership. **CAA 2001 s.35** establishes the dwelling-house restriction (P&M allowances are barred for plant in a dwelling-house used for a property business), with the narrow carve-out for **common parts of a multi-let building**. The carve-out is the ONLY crack in the residential-exclusion rule for ordinary BTL / HMO operations. The page walks: (a) the s.35 statutory text + the "dwelling-house" definition trail (CA20020 HMRC manual + property-law definition: a building or part of a building suitable for occupation as a separate dwelling); (b) the **common-parts boundary** — corridors, stairwells, communal kitchens, communal bathrooms, communal lounges, fire-safety equipment, lifts (lift = integral feature s.33A so claimable in common parts at special rate 6%), communal heating systems (integral feature, 6%), shared washing machines (general P&M 18%); en-suite bathrooms in private bedrooms are NOT common parts (they form part of the dwelling-house portion); (c) the **fire-safety equipment uplift post-Grenfell + Building Safety Act 2022** — fire alarms, smoke detectors, sprinklers, emergency lighting, fire-resistant doors (where claimable as P&M rather than building shell): all qualifying in common parts; the BSA 2022 has accelerated landlord spend in this category; (d) **integral features in common parts** — lifts, communal heating, ventilation, electrical systems, cold water systems (s.33A list): claimable at the 6% special rate within the common-parts envelope; (e) the **NACE-test issue for HMO portfolios under common control** — the s.51E + s.51G related-companies single-AIA rule (cross-ref C4) bites because all HMO SPVs satisfy the similar-activities NACE test. One worked 5-bed HMO renovation: £45k claimable spend across common parts (£15k integral features in common parts at 6%, £30k general P&M at 18% — covered by AIA up to £1m cap subject to associated-co allocation per C4). Sister pages: existing `hmo-capital-allowances-multi-tenant-landlords-claim` (shallow, pre-MEES, pre-BSA 2022); `hmo-tax-guide-rental-income-deductions-multi-tenant` (rental income side, not CA); Wave 1 B6 `incorporating-hmo-portfolio-to-limited-company` (incorporation side, already cites s.35 in passing).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** No cross-bucket dependencies. C7 supersedes the legacy `hmo-capital-allowances-multi-tenant-landlords-claim` (which is in middleware at line 337 as category-routed: `property-types-and-specialist-tax`). Recommend post-launch redirect from the legacy slug to C7; flag in `wave6_site_wide_flags.md` for manager merge decision.

**Pool-thinness disclosure:** Native HMO competitor coverage on the s.35 common-parts carve-out is sparse. The §25.2 verbatim s.35 framing + the BSA 2022 fire-safety uplift angle are the defensible points.

---

## Competitor URLs (Stage 2 populated + URL liveness verified 2026-05-23 per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of s.35 carve-out (most competitors mention HMO CAs but few quote s.35 verbatim), common-parts boundary cases, fire-safety post-Grenfell framing, integral-features-in-common-parts at 6%.

- https://www.lovellconsulting.com/news/hmo/ — verified live 2026-05-23 (200). Specialist CA boutique HMO page; the closest competitor to C7's differentiator.
- https://www.icaew.com/technical/tax/capital-allowances/hmo — verified live 2026-05-23 (200). Professional body technical reference.
- https://www.uklandlordtax.co.uk/capital-allowances/ — verified live 2026-05-23 (200). Reader-friendly framing on the landlord-side restriction.

**Borrowable patterns:** Lovell's worked-example structure is the cleanest competitor pattern. ICAEW citation density. uklandlordtax FAQ pattern for the dwelling-house question is reader-friendly.

---

## GSC data

*Net-new page (replacement for the legacy slug); primary topical queries expected: "HMO capital allowances", "HMO common parts s35", "HMO fire safety capital allowances", "HMO integral features", "HMO renovation tax relief". The legacy page has some GSC history; C7 monitored_pages registration tracks the takeover.*

---

## Closest existing pages (cannibalisation context)

- `hmo-capital-allowances-multi-tenant-landlords-claim` (category: `property-types-and-specialist-tax`) — legacy predecessor; C7 supersedes. Recommend post-launch redirect.
- `hmo-tax-guide-rental-income-deductions-multi-tenant` — rental-income-side HMO page; cross-link as the rental-side companion.
- `hmo-landlord-accounting-multi-tenant-property-tax` — generic HMO accounting page; cross-link.
- `incorporating-hmo-portfolio-to-limited-company` (Wave 1 B6) — incorporation-side; cites s.35 in passing.
- C1 pillar (forward-link).
- C4 (AIA + associated-companies allocation; relevant for HMO portfolios under common control — same branch, forward-link).

**Cannibalisation discipline:**
- C7 supersedes the legacy HMO CA page; the rental-income and accounting pages stay live as adjacent companions.
- Vary worked figures from C4 and C6.

---

## Redirect overlap (on launch)

Stage 1 scan of middleware: `hmo-capital-allowances-multi-tenant-landlords-claim` at line 337 → category-routed to `property-types-and-specialist-tax`. Recommend post-launch redirect from the legacy slug to C7. Flag in `wave6_site_wide_flags.md` for manager merge decision; do NOT edit middleware on initial C7 launch (legacy page stays live until manager arbitrates at wave-end per the redirect-cleanup pattern used for the legacy CA cluster).

---

## Authority links worth considering (Stage 2 populated 2026-05-23, session selects 5-8)

**Statutory (CAA 2001):**
- s.35 (dwelling-house exclusion; common-parts carve-out): https://www.legislation.gov.uk/ukpga/2001/2/section/35
- s.33A (integral features special-rate 6%): https://www.legislation.gov.uk/ukpga/2001/2/section/33A
- s.51A (AIA £1m): https://www.legislation.gov.uk/ukpga/2001/2/section/51A

**Other statutory:**
- Housing Act 2004 Part 2 (HMO definition; ss.254-260): https://www.legislation.gov.uk/ukpga/2004/34/contents
- Building Safety Act 2022 (post-Grenfell fire-safety framework)

**HMRC manuals:**
- CA22030 (common parts): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca22030
- CA22020 (integral features list): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca22020
- CA21010 (P&M general): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca21010
- CA20020 (dwelling-house definition): https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca20020

**Case law (optional):**
- *Lawson v Hosemaster Machine Co Ltd* [1965] (commentary on common parts; older but cited in HMRC manual context).

**Cross-references in house_positions.md:** §25.2 (P&M primary anchor — verbatim s.35 dwelling-house restriction + integral features s.33A), §25.3 (AIA associated-companies rule for HMO portfolios under common control), §25.10 (do-not-write list: "Plant in a residential dwelling is claimable under AIA" false — except the common-parts carve-out C7 is built on).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.35 verbatim text + the common-parts carve-out scope + s.33A integral-features list at write time.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no classes.
- Lead-form role segments emphasise Portfolio owner + Individual landlord (HMO landlord readership).

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the s.35 common-parts carve-out explanation (high-intent: HMO landlord realises which parts of their property qualify)
  - After the BSA 2022 fire-safety uplift section (reader has post-2022 spend to claim)
  - Optionally after the worked example
- Vary opening; do NOT lead with "Houses in Multiple Occupation...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- Read legacy `hmo-capital-allowances-multi-tenant-landlords-claim` before writing; C7 supersedes.
- Vary worked figures from C4, C6, and the legacy HMO page.

### House positions
- §25.2 primary; verbatim s.35 dwelling-house restriction.
- §25.10 do-not-write list — confirm common-parts carve-out is the only exception.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is HMO-specific common-parts depth + BSA 2022 uplift + integral-features-in-common-parts framing. Write to it.
- Vary H2s from C1, C3, C4, C6.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §25.2 primary; §25.3 + §25.10 adjacent.
2. Claim in tracker.
3. Read brief.
4. Fetch competitor URLs.
5. Read closest existing pages.
6. Plan rewrite/write.
7. Verify factual claims; **per §16.35: re-verify s.35 verbatim + s.33A integral-features list**.
8. Fetch Pexels image.
9. Write markdown with full frontmatter.
10. Build.
11. Verify six checks.
12. **No middleware edit on initial launch.** Flag legacy-HMO-redirect question.
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
