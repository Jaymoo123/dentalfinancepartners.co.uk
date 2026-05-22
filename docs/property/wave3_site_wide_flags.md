# Wave 3 site-wide flags

Append-only. Each flag uses format `F-N | YYYY-MM-DD HH:MMZ | TAG | session | summary` plus optional sub-bullets.

Tags: HOUSE_POSITION_CONFLICT, CANNIBAL, INTERNAL_LINK, SCHEMA, REDIRECT, POSITIONING, BUILD_BLOCKER, CALCULATOR_IDEA, COMPONENT_IDEA, CROSS_NICHE_LINK, FACTUAL.

---

## F-1 | 2026-05-22 22:00Z | REDIRECT + INTERNAL_LINK | manager (Stage 1 review) | Existing `renters-rights-act-2026-tax-implications-landlords` page rewrite + site-wide RRA 2026 citation back-patch

Two coupled hygiene items, **NOT Wave 3 net-new** (do these on the legacy-rebuild track between Wave 3 close and Wave 4 launch, or as a standalone pass when the user authorises):

1. **Rewrite the existing page** `Property/web/content/blog/renters-rights-act-2026-tax-implications-landlords.md` to reflect the actual RRA 2025 (2025 c. 26, Royal Assent 27 October 2025). The current page uses "in-passage" / "implementation from May 2026" framings that are now superseded. Depth target: anchor on house_positions §20 (RRA Wave 3 extension). Citation must use 2025 c. 26. Frontmatter slug stays at `renters-rights-act-2026-tax-implications-landlords` to preserve any organic signal (no redirect needed for the existing page itself); inside the page, the title + h1 + body update to RRA 2025.
   - Optional: 301-redirect `/renters-rights-act-2026-tax-implications-landlords` -> a new `/renters-rights-act-2025-tax-implications-landlords` slug if a clean-citation slug is preferred. Trade-off: redirect preserves equity at cost of one extra middleware entry. Defer the slug decision to whoever picks up the rewrite.

2. **Site-wide RRA-2026 citation back-patch sweep.** Other existing Property pages (city pages, landlord-essentials pillars, tax-essentials guides) may reference "RRA 2026" or "Renters Rights Act 2026" in body copy. Run a `grep -rn "Renters Rights Act 2026\|RRA 2026\|renters' rights act 2026"` across `Property/web/content/blog/*.md` and replace with the correct citation (RRA 2025, 2025 c. 26, Royal Assent 27 October 2025). One commit batch.

Why this is parked here, not in Wave 3 net-new: both items are LEGACY rewrites against existing pages, distinct from Wave 3's net-new-page mandate. The original C1 brief (`renters-rights-act-2025-tax-implications-comprehensive-update`) was swapped out to free that slot for a genuine net-new (`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence`). See `docs/property/wave3_candidates_selected.md` C1 entry for the swap rationale.

---

(further flags appended below as sessions discover items during write-up)
