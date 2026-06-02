# Track 2 Phase 3 — Worktree A discovery log

Append-only. Worktree A sub-agent appends execution-time discoveries (not blocking, but worth surfacing) here. Manager reads at Phase 3 close + feeds into post-Phase-3 backlog.

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_phase3_discovery_log_a.md` only.

**Format:** `D-A<N> | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

**Tags:** `EXISTING_PAGE_STALE` (adjacent residual page surfaced drift while reading for cross-link), `ADJACENT_TOPIC` (a topic gap surfaced that's worth a future net-new brief), `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `INTERNAL_LINK_OPPORTUNITY` (sibling page would benefit from a forward-link to your fresh rewrite), `AUTHORITY_GAP` (a citation source the brief didn't surface), `CROSS_TRACK_LINK` (Wave 5/6/7 page should cross-link in or out), `HOUSE_POSITION_GAP` (suggests new house position needed), `BUILD_QUIRK` (npm run build edge case worth noting for future executions).

**monitored_pages staging entries:** append separately to discovery log at brief completion:
`monitored_pages row needed: slug=<slug>, tracking_type=rewrite_post, baseline_imp=<X>, baseline_clicks=<Y>, window=90d, brief_id=<row id>`

## Discoveries

`D-A1 | 2026-05-24 PM | INTERNAL_LINK_OPPORTUNITY | cgt-property-sold-loss-claim-capital-losses (B1-A3, just executed @ dd01015) is the new authoritative on-site destination for the 4-year claim deadline (TMA 1970 s.43) + the joint-ownership loss split + the s.58-does-not-transfer-loss point. Other rewritten siblings that would benefit from a one-paragraph forward-link back to this page once Phase 3 lands: (a) cgt-calculation-selling-buy-to-let-property-step-by-step.md (in the "What if I sell at a loss" or "Can I offset capital losses" FAQ — the current FAQ #9 mentions losses but does not forward-link to the loss specialist); (b) cgt-payment-deadlines-property-sales-2026.md (in the existing FAQ #1 "Do I have to file a 60-day return if no tax is due" — could add cross-link to the loss page for the case where the disposal IS a loss); (c) cgt-property-transfer-spouse.md (B1-C3 in flight on Worktree B — should add an explicit "transferring a property to a spouse does NOT transfer a carried-forward loss" FAQ with a forward-link here). Manager: not blocking; flagged for post-Phase-3 backlog or for Worktree B's B1-C3 sub-agent if they want to coordinate.`

`D-A2 | 2026-05-24 PM | INTERNAL_LINK_OPPORTUNITY | cgt-deferral-strategies-property-investors-uk (B1-A1, just executed @ 003cc15) introduces the EIS-shares-held-to-death extinguishment-planning angle + the s.162 incorporation-relief depth + the s.169B settlor-interested-trust holdover block clarifier as the on-site authority for these deferral mechanics. Cross-link opportunities for shipped or upcoming rewrites: (a) cgt-gifting-property-family-members-uk.md (rewritten 2026-05-21) — its current holdover treatment would benefit from a forward-link to this page for the deferral-framework context; (b) W6 B4 settlor-interested-trust page — explicit reciprocal back-link to this page's s.169B FAQ; (c) W6 A1 extraction sequence pillar — cross-link from "Post-incorporation extraction" perspective. Not blocking.`

## monitored_pages staging

`monitored_pages row needed: slug=cgt-property-sold-loss-claim-capital-losses, tracking_type=rewrite_post, baseline_imp=0, baseline_clicks=0, window=180d (foundational, no baseline), brief_id=B1-A3`
`monitored_pages row needed: slug=cgt-deferral-strategies-property-investors-uk, tracking_type=rewrite_post, baseline_imp=0, baseline_clicks=0, window=180d (foundational, no baseline), brief_id=B1-A1`
`monitored_pages row needed: slug=reduce-cgt-property-disposal-uk, tracking_type=rewrite_post, baseline_imp=0, baseline_clicks=0, window=180d (foundational, no baseline), brief_id=B1-A2`
`monitored_pages row needed: slug=principal-private-residence-relief-landlords, tracking_type=rewrite_post, baseline_imp=4, baseline_clicks=0, baseline_avg_pos=53, window=180d (4 imp/90d intrinsic-low-volume + 2 wrong-intent Irish queries), brief_id=B2-B1`
`monitored_pages row needed: slug=rollover-relief-property-landlords, tracking_type=rewrite_post, baseline_imp=0, baseline_clicks=0, window=180d (foundational, no baseline), brief_id=B2-B2`
`monitored_pages row needed: slug=letting-relief-landlords-2026-changes, tracking_type=rewrite_post, baseline_imp=2, baseline_clicks=0, baseline_avg_pos=3, window=90d (page holds SERP slot at pos 3 for "lettings relief"; intrinsic-low-volume topic post-restriction), brief_id=B2-B3`

## Additional Phase 3 closing discoveries

`D-A3 | 2026-05-24 PM | INTERNAL_LINK_OPPORTUNITY | All 6 Worktree A rewrites are now densely cross-linked into each other + into the Wave 5/6 cluster. Suggested back-patches at Manager's discretion (NOT done in this Phase 3 — flagged for post-Phase-3 backlog): (a) Wave 5 C7 joint-ownership PRR page should reciprocal back-link to B2-B1 PRR general theory + B2-B3 Lettings Relief specialist; (b) Wave 6 C8 FHL grandfathered claims page should reciprocal back-link to B2-B2 rollover (former-FHL section) + B1-A1 deferral (post-FHL trap section); (c) Wave 6 B4 settlor-interested trust page should reciprocal back-link to B1-A1 deferral (s.169B clarifier); (d) Wave 5 C1 Form 17 page should reciprocal back-link to B1-A3 capital losses (joint-ownership loss split section). These would close the loop and increase intra-cluster link density.`

`D-A4 | 2026-05-24 PM | CROSS_TRACK_LINK | The 4-year claim deadline (TMA 1970 s.43) is now anchored authoritatively at B1-A3 (capital losses canonical). The legacy 2026-05-21 rewrite-cohort canonicals at cgt-calculation-selling-buy-to-let-property-step-by-step (where D-12 lift landed) and cgt-payment-deadlines-property-sales-2026 (where D-11 lift landed) both reference loss-claim mechanics in passing but neither now points to B1-A3 explicitly. Manager: consider a back-patch adding 1-sentence forward-link from each of those 2026-05-21 canonicals to B1-A3. Not blocking; flagged for post-Phase-3 back-patch cohort.`

`D-A5 | 2026-05-24 PM | HOUSE_POSITION_GAP | The s.222(5) joint-signing precision (s.222(5)(a) election + s.222(6)(a) joint-signing for couples, NOT s.222(5)(b) which was repealed FA 1996) noted in F-27 was applied consistently in this worktree's B2-B1 PRR rewrite. F-27 still flags the manager-side back-patch needed in house_positions.md §24.5 + §24.9 + the Wave 5 C7 FAQ #3. Manager: F-27 fix on house_positions.md not done in this Phase 3 worktree (out of scope per do-not-touch rules); flagged for separate manager session.`

`D-A6 | 2026-05-24 PM | EXISTING_PAGE_STALE | Spot-check on the 5 closest-existing pre-rewrite canonicals (cgt-payment-deadlines-property-sales-2026, cgt-calculation-selling-buy-to-let-property-step-by-step, cgt-rates-property-2026-27-current-rates-explained, cgt-annual-exempt-amount-3000-allowance-2026-27, cgt-property-transfer-spouse) confirms none of them carry the F-9 pre-2020 Lettings Relief framing or the unhedged April 2027 §7 assertion. The 2026-05-21 rewrite cohort + the post-Wave-6 lifts (commits dcf504f, da7dbe8, 5d9259a) appear clean. Worktree A rewrites therefore consistent with the rewritten siblings and the W6 close state.`

