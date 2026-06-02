# Track 2 Batch 2 — Sub-bucket B discovery log

Append-only. Sub-bucket B sub-agent appends discoveries (insights worth surfacing but not blocking). Manager reads at batch end + feeds into future batches.

**Format:** `D-N | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

**Tags:** `ADJACENT_TOPIC`, `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `EXISTING_PAGE_STALE`, `EXISTING_PAGE_LINK_OPPORTUNITY`, `AUTHORITY_GAP`, `CROSS_TRACK_LINK` (e.g., Wave 6/7 page), `HOUSE_POSITION_GAP` (suggests new position needed).

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_discovery_log_batch2_sub_b.md` only.

**Sub-bucket B focus:** CGT reliefs cluster (PRR + Rollover + Lettings). The Lettings Relief brief (B2-B3) is the strongest candidate for surfacing site-wide F-9-pattern stale framings (pre-April-2020 Lettings Relief positioning). Expect to surface `EXISTING_PAGE_STALE` flags on adjacent rental-property + main-residence pages that still carry the pre-2020 framing. Cross-track link opportunities to Wave 5 C7 (joint-ownership PRR) and Wave 6 C8 (FHL grandfathered CGT BADR) are likely.

---

<no discoveries yet; sub-agent appends as they arise>

## Batch 2 Sub-bucket B discoveries — 2026-05-24

`D-1 | 2026-05-24 PM | EXISTING_PAGE_STALE | The current site-wide cross-link from B2-B1 PRR brief to `furnished-holiday-let-tax-rules-exemptions` (line 99 in source) likely carries pre-abolition FHL framing. The Wave 6 close added §6 LOCKED FHL abolition + W6 C8 grandfathered-BADR. Recommend a maintenance pass on internal links from any cgt-* / ppr-* / capital-gains-tax-* page that references FHL — re-route to W6 C8 or to a post-abolition explainer. Scope: cross-residual; not Batch 2 work.`

`D-2 | 2026-05-24 PM | CROSS_TRACK_LINK | W5 C7 (cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics) should be back-patched with a reciprocal forward-link to B2-B1 PRR (when B2-B1 is executed). C7 currently links INTO PRR territory generally but doesn't name a specialist back-link target; B2-B1 will be the right back-link once executed. Flag for Wave 5 back-patch opportunity post-Batch-2-execution.`

`D-3 | 2026-05-24 PM | AUTHORITY_GAP | Brief drafting surfaced strong dependency on HMRC manual pages CG64200 / CG64710 / CG64985 (PRR) and CG60250 / CG60280 / CG60290 (Rollover). All 6 manual URLs verified live 2026-05-24. None of the legacy pages (PRR / Rollover / Lettings) cite any HMRC manual. Recommend: as the Track 2 program scales, every CGT-reliefs page should have ≥3 HMRC manual citations. Phase 2 manager: build a CG-manual link library (verified URLs + content summaries) so sub-agents can cite without re-fetching.`

`D-4 | 2026-05-24 PM | AUTHORITY_GAP | Brief drafting hit 4 of 5 third-party UK competitor WebFetch attempts blocked (permission-denied) or 404. Pattern is consistent with F-12 lesson (broader User-Agent rotation needed at execution). Recommend: Phase 2 / Phase 3 fetch budget includes a re-attempt pass with User-Agent rotation for competitor pages. Statute + gov.uk + HMRC manual pages were 100% successful — the block pattern is third-party only.`

`D-5 | 2026-05-24 PM | HOUSE_POSITION_GAP | Wave 6 close added §25 CAA 2001 cluster but the Lettings Relief / PRR / Rollover briefs surface a separate position need: case-law spine for the trade-vs-investment line (Salisbury House Estates v Fry [1930], Griffiths v Jackson [1983], Marson v Morton [1986], Iswera v IRC [1965]). Recommend Wave 7+ HP-lock to add a "§5.X Trade-vs-investment case-law spine" subsection under §5 CGT, citing the badges-of-trade framework. This would let future briefs cite the case-law without independent verification.`

`D-6 | 2026-05-24 PM | COMPONENT_IDEA | The post-2020 Lettings Relief lower-of-three computation is naturally suited to a small interactive calculator: input PRR-period months + total ownership months + chargeable gain + let-portion gain → output [lower of (PRR-already-given / £40,000 / chargeable-gain-on-let-portion) = Lettings Relief]. Adjacent to existing CGT calculator components. Manager flag: B2-B3 page is the natural home for this calc if execution-side resource is available.`

`D-7 | 2026-05-24 PM | EXISTING_PAGE_LINK_OPPORTUNITY | The B2-B1 PRR brief's worked example (Mark + Sarah Leeds 4-property accidental-landlord pattern) is a strong cross-link target for B1-C3 (cgt-property-transfer-spouse) and B1-C1 (cgt-divorce-property-transfer-tax-implications) — both Batch 1 briefs that touch separating-spouse PRR. The s.225B post-separation extension + Finance (No. 2) Act 2023 angle ties the three pages together cleanly. At execution, ensure the cross-link triangle (B2-B1 ↔ B1-C1 ↔ B1-C3) is reciprocal.`
