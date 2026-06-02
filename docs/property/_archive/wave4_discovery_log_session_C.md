# Wave 4 Session C (IHT estate planning) — discovery log

Append-only. Per-entry format: `D-N | YYYY-MM-DD HH:MMZ | TAG | brief | observation`.

Tags: ADJACENT_TOPIC, CALCULATOR_IDEA, COMPONENT_IDEA, EXISTING_PAGE_STALE, EXISTING_PAGE_LINK_OPPORTUNITY, AUTHORITY_GAP, CROSS_NICHE_LINK, COMPETITOR_URL_DRIFT.

---

D-1 | 2026-05-23 08:34Z | COMPETITOR_URL_DRIFT | C1 | 2 of 4 Stage 2 competitor URLs returned HTTP 404 at C1 write time: `ukpropertyaccountants.co.uk/business-property-relief-on-landlord-portfolio/` (Stage 2 brief annotated as "Sibling page, likely live (same domain working set)") and `tlpi.co.uk/services/inheritance-tax/`. The remaining two (djh and the alternate ukpropertyaccountants article on the £1m cap shift) were live and useful for outline contrast. Pattern observation for future-wave Stage 2 sub-agent: per-URL liveness check is a cheap step that would catch ~50% noise in this bucket. The v2 competitor universe is genuinely useful; the per-URL freshness is not.

D-2 | 2026-05-23 08:34Z | EXISTING_PAGE_LINK_OPPORTUNITY | C1 | Wave 2 BPR-rental general-rule pillar (`business-property-relief-rental-property-iht.md`) is the obvious back-link target for C1 (see flag F-1 raised). Beyond F-1: the pillar itself is a shallow DeepSeek-era piece (~1,500 body words, no Pawson case citation in body, just a reference to "HMRC's criteria for trading"). Quality-lift candidate for a future legacy-rebuild track pass, but not in scope for Wave 4. Note for the legacy-rebuild track planner.

D-3 | 2026-05-23 08:34Z | AUTHORITY_GAP | C1 | HMRC manual page `IHTM25260` (listed in C1 brief as "mainly-investment determination") returned 404 at WebFetch verification. The wider IHTM25xxx series is alive (IHTM25000 BPR overview, IHTM25277-25280 hotels-and-holiday-lets pages used in the Wave 2 SA-Pawson companion both verified live during Wave 2). Possible HMRC manual page rename or removal; worth a future-wave verification pass on the brief's authority-list URLs before they propagate into later C-bucket pages.

D-4 | 2026-05-23 08:34Z | EXISTING_PAGE_LINK_OPPORTUNITY | C1 | The existing `fic-iht-treatment-bpr-myth.md` page (Wave 2 incorporation-bucket) and C1 are companion pages: C1 covers the pure-BTL-individual-landlord cohort, the FIC-BPR-myth page covers the corporate-wrapper version of the same Pawson question. C1 forward-links to the FIC-BPR-myth page in the "limited company doesn't unlock BPR" sub-section. The FIC-BPR-myth page does not yet reciprocally link back to C1; that's a reasonable wave-close back-patch (not blocking).

D-5 | 2026-05-23 09:05Z | EXISTING_PAGE_STALE | C2 | Stage 2 brief framing differentiator cited `iht-nrb-rnrb-landlord-portfolio-allocation` as the existing comparator (the page C2 must be "distinct from"). That page does NOT exist on the site (verified via Glob across `Property/web/content/blog/`). The real comparator is the Wave 2 `iht-residence-nil-rate-band-2m-taper-property-portfolios.md`, which C2 holds the boundary against cleanly. Pattern observation: Stage 2 sub-agents writing the framing differentiator should be required to verify any cited "existing comparator" slug against the actual blog content list rather than relying on the brief-builder's token-Jaccard output.

D-6 | 2026-05-23 09:05Z | EXISTING_PAGE_LINK_OPPORTUNITY | C2 | Wave 2 `iht-residence-nil-rate-band-2m-taper-property-portfolios.md` has a "Planning against the £2m wall" section listing 5 strategic options including spouse-equalisation, but does not currently forward-link to a second-death-window mechanics page (because none existed pre-C2). Wave-close back-patch: add C2 to the RNRB-taper page's relevant section as the procedural-mechanics companion. Reciprocal hook: C2 forward-links to the RNRB-taper page 3 times so the cross-link is already 1-directional.

D-7 | 2026-05-23 09:05Z | EXISTING_PAGE_LINK_OPPORTUNITY | C2 | C2 body references the slugs of Wave 4 siblings C5 (`deed-of-variation-property-estate-redirecting-inheritance-iht-saving`) and C9 (`iht-charitable-legacy-property-portfolio-36-percent-reduced-rate`) as code-blocks rather than hyperlinks, because those pages do not yet exist. Wave-close cross-link back-patch needed: convert these code-block references to anchor tags once C5 and C9 ship. Similar pattern likely from C5/C9 sessions when they reference back to C2. Not flagged in `wave4_site_wide_flags.md` (it's a wave-close mechanical sweep, not a session-actionable item).

---
