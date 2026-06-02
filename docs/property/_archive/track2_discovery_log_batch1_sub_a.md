# Track 2 Batch 1 — Sub-bucket A discovery log

Append-only. Sub-bucket A sub-agent appends discoveries (insights worth surfacing but not blocking). Manager reads at batch end + feeds into future batches.

**Format:** `D-N | YYYY-MM-DD HH:MMZ | TAG | summary` plus optional sub-bullets.

**Tags:** `ADJACENT_TOPIC`, `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `EXISTING_PAGE_STALE`, `EXISTING_PAGE_LINK_OPPORTUNITY`, `AUTHORITY_GAP`, `CROSS_TRACK_LINK` (e.g., Wave 6 page), `HOUSE_POSITION_GAP` (suggests new position needed).

**Critical:** edits via ABSOLUTE PATH only.

---

`D-1 | 2026-05-23 21:00Z | EXISTING_PAGE_STALE | UKPA competitor page https://www.ukpropertyaccountants.co.uk/capital-gains-tax-on-buy-to-let-property-in-2024-25/ carries stale "Higher-rate taxpayers (>£50,270): 28% CGT" figure (the pre-30-Oct-2024 rate; current is 24%). Signals that several established competitors in the BTL-CGT space have not back-patched the Autumn-Budget-2024 rate change. Implication: our rewritten cluster with correct 18%/24% framing already has a credibility moat. Worth amplifying in cluster meta-descriptions over the next 6 months while competitors lag.`

`D-2 | 2026-05-23 21:00Z | AUTHORITY_GAP | gov.uk EIS helpsheet HS341 (https://www.gov.uk/government/publications/enterprise-investment-scheme-income-tax-relief-hs341-self-assessment-helpsheet) is a landing page that lists per-tax-year HTML helpsheets but does not contain the operative helpsheet content directly. Execution session citing EIS deferral mechanics should cite the underlying HTML helpsheet (e.g., HS341 for 2025-26) directly, not the landing page URL. Also: TCGA 1992 Sch 5B is the harder statutory anchor (verified live + operative 2026-05-23) and should be the primary cite for EIS deferral.`

`D-3 | 2026-05-23 21:00Z | EXISTING_PAGE_LINK_OPPORTUNITY | Rewritten gifting page (cgt-gifting-property-family-members-uk, Session B #46) has well-formed FAQ #2 covering s.165 + s.260 holdover with statute anchors. B1-A1 (deferral) brief recommends forward-linking from the new deferral page's "Holdover via Gift" subsection into this gifting page rather than restating s.165 / s.260 depth. This pattern (specialist depth in one place, survey-with-router-links elsewhere) is the right architecture for the broader Track 2A residual cluster — consider naming it explicitly in TRACK2_PROGRAM as the "survey-as-router" pattern.`

`D-4 | 2026-05-23 21:00Z | CROSS_TRACK_LINK | Wave 6 Bucket B item B18 (gifting-property-to-adult-children-decision-tree-cgt-iht-occupancy-mechanics, currently ⬜ todo per cannib snapshot §4) will overlap with B1-A1's holdover-on-gift section. Recommend execution session for B1-A1 either delays publishing until Wave 6 B18 ships (so the forward-link is live) or publishes with a TODO-comment marker for the link. Tracker convention permits the latter; the link can be filled at Wave 6 B18 ship.`

`D-5 | 2026-05-23 21:00Z | CROSS_TRACK_LINK | Wave 6 Bucket C item C2 (balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics, ✅ done on feature branch per cannib snapshot §4) will interact with B1-A3's loss-calc framework — claimed capital allowances on the disposed property reduce the CGT base cost, potentially shifting a CGT gain to loss or vice versa. Recommend B1-A3 execution session cross-references the Wave 6 C2 page once merged to main, noting "base cost is reduced by prior CA claims, which can affect the loss calculation".`

`D-6 | 2026-05-23 21:00Z | COMPONENT_IDEA | All 3 Batch 1 Sub-bucket A briefs would benefit from a shared "CGT Reduction vs Deferral vs Loss Claim — Decision Table" component. Concept: a TSX component rendering a 3-column compare-table (Reduce / Defer / Loss-Claim) with the user able to click into specialist depth pages. Currently the 3 briefs each propose their own internal decision-tables which is correct for the specialist depth but the cluster-level summary is missing. Consider for Phase 2: a CGT-cluster index page that hosts this component as a navigational hub. Not blocking for Batch 1 execution; surfaced for cluster planning.`

`D-7 | 2026-05-23 21:00Z | HOUSE_POSITION_GAP | No locked position on TMA 1970 s.43 (the 4-year claim time limit for capital-loss claims) anywhere in house_positions.md. §5 covers the 60-day reporting cycle and AEA but does not lock the 4-year loss-claim deadline. Recommend a future Wave manager lock a one-line position: "Loss claims must be made within 4 years of the end of the tax year of disposal per TMA 1970 s.43; no time limit on using the loss once claimed." Currently the position is implicit / scattered across HMRC manuals + gov.uk; an explicit lock would unblock back-patches on multiple residual pages (per F-10).`

`D-8 | 2026-05-23 21:00Z | ADJACENT_TOPIC | "Negligible value claims on BTL-SPV shares" is a genuine specialist niche (post-MVL / liquidation of a property SPV) currently uncovered on-site. B1-A3 brief recommends a 200-300 word section + cross-link to taxaccountant.co.uk competitor for the shares-side depth. Stronger move: consider a dedicated future Track 2A or Wave 7 page on "negligible-value claims on property company shares" — search-volume cyclical with distressed-asset cycles, decent depth available. Park for now; surface at Phase 2 prioritisation.`
