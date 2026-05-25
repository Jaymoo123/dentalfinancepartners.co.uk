# Wave 8 discovery log — Session B

**Created:** 2026-05-25.

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

## D-1 AUTHORITY_GAP — RPDT FA 2022 Part 2 confirmed IN FORCE; existing site coverage may carry stale framing

**Surfaced at:** 2026-05-25T12:50Z; B1 PILLAR write step (§16.35 per-write verification).
**Detail:** WebFetch of https://www.legislation.gov.uk/ukpga/2022/3/part/2 returned "There are currently no known outstanding effects for the Finance Act 2022, PART 2." RPDT is operative for accounting periods beginning on or after 1 April 2022 (s.51 commencement) and has not been repealed. Existing page `residential-property-developer-tax-uk` on the site warrants a sweep for stale "repealed" framing if it predates this verification.
**Recommendation:** flag F-3 already raised on the §28 internal inconsistency. For Wave 8 close, a sub-agent STALE sweep on RPDT-repeal tokens would close any contamination across pre-Wave-8 inventory. Confirm with manager whether the existing `residential-property-developer-tax-uk` page sits on the canonical chain or has been superseded; B1 cross-links to it but did not edit.

## D-2 EXISTING_PAGE_LINK_OPPORTUNITY — `property-development-tax-trading-vs-investment-income` should back-link to B1 PILLAR

**Surfaced at:** 2026-05-25T12:50Z; B1 PILLAR cannibalisation context review (step 5).
**Detail:** Existing page `property-development-tax-trading-vs-investment-income` is the practical intro on trading-vs-investment classification (badges of trade + Marson + statutory backstop). B1 PILLAR is the statutory deep-dive on Part 8ZB / Part 9A with the verbatim Conditions A-D + symmetric corporate/individual section table + worked CGT-vs-trading comparison. B1 forward-links to the existing page; the reciprocal back-link from the existing page is missing.
**Recommendation:** at Wave 8 close, edit `property-development-tax-trading-vs-investment-income` to add a "For the statutory deep-dive: see <a href=B1>...</a>" reference near the existing "statutory backstop: transactions in UK land" H2. Single-line edit; existing page voice unchanged.


## D-3 EXISTING_PAGE_STALE — Wave 7 LRR page section-range drift (1143-1181 vs verified 1143-1175)

**Surfaced at:** 2026-05-25T15:40Z by Session B at B9 step 5 cannibalisation context review.
**Detail:** Existing page `land-remediation-relief-150-percent-claim-mechanics-ltdco-developer-investor.md` cites CTA 2009 Part 14 range as "sections 1143 to 1181". Stage 1 drift catch instruction + HP §25.12.1 confirm range is ss.1143-1175. The 1143-1181 cite appears in two places (summary block + FAQ-1 answer).
**Recommendation:** flag F-4 raised with recommended back-patch at wave close. Sub-agent dispatch per §16.43 for site-wide STALE sweep on "1143 to 1181" / "1143-1181" / "to s.1181" tokens would close any contamination across pre-Wave-8 inventory.


## D-4 OTHER — Session B bucket close-out summary

**Surfaced at:** 2026-05-25T16:05Z; end of Session B B1-B10 run.
**Detail:** All 10 B-track pages shipped across 12 commits on `property-wave8-b` (B1-B10 + B4 fix + B9 fix). Total body words: 28,458 (B1 pillar 3,578; B2-B10 range 2,808-2,957). All six checks pass on all 10 pages: 0 em-dashes, FAQ counts 10 or 12, metaTitle 54-60 chars (all ≤62), metaDesc 147-157 chars (all ≤158), 0 Tailwind classes, body words within target range. Build not run (no node_modules in worktree; markdown structure conforms to existing Wave 7 conventions; all forward-links to siblings within the same wave or to existing live pages on main).

**RPDT verification anchor:** Session B's WebFetch of https://www.legislation.gov.uk/ukpga/2022/3/part/2 on 2026-05-25 returned "There are currently no known outstanding effects for the Finance Act 2022, PART 2." This locks the IN FORCE position across B1 + B3 + B10 pages. HP §28.9 + §28.11 stale "repealed FA 2024 s.81" text flagged at F-3 for manager close-out.

**Bucket B cross-pillar pattern:** B1 pillar anchors the architecture; B2-B7 deep-dives reference back; B8 non-resident overlay; B9 LRR adjacent corporate-only relief; B10 partnership three-regime pull-together. Forward-link mesh fully closed at end of session (B1→B2,B3,B4,B5,B6,B7,B8,B9,B10; B2→B7,B4,pillar; etc).

**Drift catches captured for manager close:** F-3 §28 RPDT inconsistency (HP §28.9 + §28.11 vs §28.7); F-4 existing LRR page bare-shorthand framing + 1143-1181 range drift. Both non-blocking; for wave-close back-patches.

**Files touched only on session branch (no main commits):** 10 blog markdown files in Property/web/content/blog/. All tracker / flags / discovery edits via absolute paths to main per §16.15 + §16.37.

