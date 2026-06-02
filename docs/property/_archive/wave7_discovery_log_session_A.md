# Wave 7 discovery log — Session A

**Created:** 2026-05-24 PM.

Discovery log format (one block per discovery):
```
## D-N {DISCOVERY_TYPE} — {one-line headline}
**Surfaced at:** {timestamp + which page you were writing}
**Detail:** {what you found / what is interesting}
**Recommendation:** {what should happen with it — future wave bucket idea? site-wide back-patch? calculator? component? cross-site link?}
```

Discovery types per NETNEW_PROGRAM §13.4:
- ADJACENT_TOPIC — competitor covers something we do not, not in topic_gaps
- CALCULATOR_IDEA, COMPONENT_IDEA — interactive tool / UI component idea
- EXISTING_PAGE_STALE — existing page with stale figures/framing
- EXISTING_PAGE_LINK_OPPORTUNITY — existing page should link to your new page
- AUTHORITY_GAP — HMRC manual / legislation never cited on our site
- CROSS_NICHE_LINK — opportunity to cross-link to dentists/medical/solicitors/agency
- OTHER — anything else worth recording

Discoveries are FYI for future-wave bucket planning. Never block.

---

(Sessions append D-N entries below this line.)

---

## D-1 EXISTING_PAGE_STALE — `hmo-licensing-fees-tax-deductible-uk-landlords` carries no s.249A figure (clean)
**Surfaced at:** 2026-05-24, A4 write, step 5 (closest-existing review)
**Detail:** The tax-side companion page does not reference the s.249A civil-penalty figure (£30k or £40k), so the §26.9 / F-1 uplift does not require a back-patch on that page. Recommended cross-link is now live on A4. Page itself is current as at 2026-05-21 commit and reads cleanly against post-1-May-2026 statute.
**Recommendation:** No back-patch. Track 2 STALE-sweep cohort should still grep all blog/* content for the literal `£30,000` in HMO / s.249A contexts before Wave 7 close (recommendation already logged on F-1).

## D-2 AUTHORITY_GAP — SI 2026/319 Financial Penalties (Housing Offences) Regulations not previously cited
**Surfaced at:** 2026-05-24, A4 write, step 7 (per-write verification)
**Detail:** SI 2026/319 (Financial Penalties (Housing Offences and Breach of Banning Orders) Regulations 2026) is the first appearance of this SI in any Property Tax Partners content. It uplifts the s.249A civil-penalty cap from £30,000 to £40,000 and broadens to cover banning-order breaches under HPA 2016. URL: https://www.legislation.gov.uk/uksi/2026/319 (effective 1 May 2026). A4 cites it. Future RRA / housing-enforcement pages should also cite where the £40k figure appears (A6 redress scheme, A1 lead page, A10 BSA cladding cost recovery may all need the cross-reference).
**Recommendation:** Add SI 2026/319 to the standard authority-link roster for Wave 7 Bucket A. Mention in inter-wave §26.9 back-patch commit.

## D-3 ADJACENT_TOPIC — Banning-order legal-defence costs deductibility nuance underexplored
**Surfaced at:** 2026-05-24, A4 write, step 6 (planning)
**Detail:** The tax treatment of legal fees defending a banning-order application is genuinely nuanced (partial-success cases warrant apportionment; full-success cases may be revenue-deductible as preservation of income-earning capacity; full-failure cases follow penalty into non-deductibility). No existing PTP page addresses this directly. A4 surfaces the issue but does not exhaust it.
**Recommendation:** Candidate Wave 8+ pick. Slug suggestion: `banning-order-legal-defence-costs-tax-deductibility-landlords`. Pool-thinness: low competitor coverage; potential authority gap to fill.

## D-4 EXISTING_PAGE_LINK_OPPORTUNITY — `hmo-tax-guide-rental-income-deductions-multi-tenant` should backlink to A4
**Surfaced at:** 2026-05-24, A4 write, step 5
**Detail:** A4 forward-links to the HMO tax guide; the HMO tax guide page does not currently mention selective licensing / s.249A penalty stack. The hmo-tax-guide page would benefit from a "for the licensing-mechanics side, see [A4]" cross-reference. Same applies to `hmo-landlord-accounting-multi-tenant-property-tax` and `incorporating-hmo-portfolio-to-limited-company`.
**Recommendation:** Inter-wave back-patch — 3 pages should receive a 1-line cross-link to A4. Low-effort, high cross-graph-density value.

## D-5 EXISTING_PAGE_STALE — `section-21-abolition-uk-landlord-possession-guide-2026` may carry pre-1-May-2026 framing
**Surfaced at:** 2026-05-24, A2 write, step 5 (closest-existing review)
**Detail:** Did not deep-read the existing s.21 abolition page during A2 work (cross-link added in body and forward-link from A2 is sufficient for cannibal avoidance). However, the page predates 1-May-2026 commencement and may still use forward-looking language ("Section 21 will be abolished", "when the RRA 2025 commences", etc.) that needs back-patching to present tense. Slug grandfathered (2026 date in slug is intentional; body should now say "1 May 2026" or "post-commencement").
**Recommendation:** Schedule for next Track 2 STALE sweep. Grep regex: `will be abolished|when.*commences|RRA 2025 will`. Replacement: present-tense framing keyed to the 1-May-2026 commencement date.

## D-6 EXISTING_PAGE_LINK_OPPORTUNITY — `renters-rights-act-2026-tax-implications-landlords` should forward-link to A2 (will be done at A1)
**Surfaced at:** 2026-05-24, A2 write, step 6 (planning)
**Detail:** A1 (existing slug, same-slug depth rewrite) will absorb forward-links to A2's operational mechanics — this is in-scope for A1 work which ships LAST in Bucket A per sequencing. No action needed now; logging for tracking.
**Recommendation:** Confirm forward-link from A1 to A2 (and A3/A5/A6) is in the A1 rewrite scope. Mark this discovery resolved when A1 ships.

## D-7 AUTHORITY_GAP — RRA 2025 ss.15-17 enforcement architecture (HA 1988 s.16E + s.16J + s.16K) underexposed in current content
**Surfaced at:** 2026-05-24, A2 write, step 7
**Detail:** The new enforcement layer inserted by RRA 2025 s.15 (creating HA 1988 ss.16I-16L) is the operational backbone of the post-RRA possession regime: s.16J criminal offences, s.16K £40,000 civil penalty, s.16L interpretation. No existing PTP page yet sets out this architecture in detail. A2 covers the £40k/s.16E re-letting restriction subset; broader enforcement coverage would benefit a future page.
**Recommendation:** Candidate Wave 8+ pick. Slug suggestion: `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence-architecture` (or refresh existing same-slug page if it exists per F-2 STALE-sweep list — yes it does: `rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md`). Combine refresh of existing page with new architectural exposition. Cross-link to A2's operational content.
