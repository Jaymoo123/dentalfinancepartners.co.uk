# Property Wave 2 — site-wide flags (append-only)

Sessions append flags here when they encounter cross-session or post-merge issues. **Never blocks** a session — flag and continue.

## Flag categories

- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts a house position (sessions trust the doc by default; flag if you believe the doc is wrong)
- `CANNIBAL` — two sibling Wave 2 pages overlap such that one shouldn't ship
- `INTERNAL_LINK` — existing Property page should be edited to link to your new page
- `SCHEMA` — non-default schema type (HowTo, Course) might help SERP
- `REDIRECT` — redirect action taken (or not taken) and why
- `POSITIONING` — brand or lead-gen model question
- `BUILD_BLOCKER` — build failing for a non-own-page reason
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `CROSS_NICHE_LINK`, `FACTUAL` — also valid

## Format

```
## [F-N] [YYYY-MM-DDThh:mmZ] [CATEGORY] Title
- **Session:** A / B / C
- **Page:** <slug if relevant>
- **Detail:** <2-4 lines>
- **Action taken (if any):** <text>
- **Authorisation needed?** <yes / no — manager fills>
```

---

## [F-1] [2026-05-22T13:30Z] [INTERNAL_LINK] Forward-links from C1 to sibling Wave 2 pages (C4, C10, B4) pending sibling write
- **Session:** C
- **Page:** leaving-uk-landlord-12-month-pre-departure-checklist (C1)
- **Detail:** C1 drafted contextual links to three Wave 2 sibling pages (C4 temporary-non-residence-5-year-cgt-recapture-property, C10 nrcgt-indirect-disposal-property-rich-companies-shares, B4 uk-spain-dta-property-uk-resident-spanish-holiday-home). Sibling pages not yet written. Links replaced with inline text to keep verify-internal-links clean.
- **Action taken (if any):** Forward links removed; equivalent statutory citations or inline detail substituted. Add hyperlinks post-merge when siblings land.
- **Authorisation needed?** no (manager wires links post-wave)

## [F-2] [2026-05-22T13:30Z] [INTERNAL_LINK] Back-link request from existing expat-obligations page to new C1
- **Session:** C
- **Page:** existing `uk-property-income-expats-tax-obligations-explained.md` (on main) ← new C1
- **Detail:** C1 is the action-led companion to the descriptive expat-obligations page already on `main`. The descriptive page should back-link to C1 as the pillar timeline. C1 already forward-links to it.
- **Action taken (if any):** None on existing page (sessions don't touch `main`-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing page post-wave)

## [F-3] [2026-05-22T14:30Z] [INTERNAL_LINK] Existing IHT pillar should back-link to new A1 decision framework
- **Session:** A
- **Page:** existing `inheritance-tax-rental-property-uk-guide.md` (on main) ← new A1 `iht-property-investors-decision-framework-2026-onwards`
- **Detail:** A1 is positioned as the decision-led companion to the existing descriptive IHT pillar. A1 already forward-links to the pillar in its opening paragraph; the pillar should add a reciprocal "for a decision-led companion that walks the same material as planning steps, see ..." link near the top or in the planning section. Bidirectional crosslink reinforces both pages' SERP signals and gives pillar readers a planning hop.
- **Action taken (if any):** None on existing page (Session A does not touch main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing page post-wave)

## [F-4] [2026-05-22T14:30Z] [INTERNAL_LINK] Existing BPR-rental-property page should forward-link to new A1
- **Session:** A
- **Page:** existing `business-property-relief-rental-property-iht.md` (on main) ← new A1
- **Detail:** The existing BPR page is shallow and ends with a generic "professional advice is essential" close. Readers landing on it for the BPR-for-BTL question would benefit from a forward link to A1's planning lens (since BPR-doesn't-work for them is one of A1's "what doesn't work" sections, and A1 then gives them what DOES work).
- **Action taken (if any):** None on existing page.
- **Authorisation needed?** yes (manager edit post-wave)

## [F-5] [2026-05-22T14:30Z] [INTERNAL_LINK] Forward-link from A1 to sibling A2 pending A2 write
- **Session:** A
- **Page:** A1 `iht-property-investors-decision-framework-2026-onwards` → A2 `iht-gifts-with-reservation-of-benefit-property`
- **Detail:** A1 originally linked to A2 at the GROB-discussion paragraph in the "lifetime gifting outside the GROB rules" mitigation section. A2 not yet written (next on Session A's list). Link removed pre-build to keep "internal links resolve" verification clean. To be re-added during the A2 write step or as a Session-A post-A2 micro-edit.
- **Action taken (if any):** Link removed pre-build; placeholder mention retained inline. Will re-add during A2's write step (A2 writes its sibling-link block first, then a one-line back-patch in A1).
- **Authorisation needed?** no (sibling-write cleanup, Session A handles)

## [F-6] [2026-05-22T14:35Z] [INTERNAL_LINK] Existing NRL pillar should back-link to new B1 treaty framework
- **Session:** B
- **Page:** existing `non-resident-landlord-scheme-uk-complete-guide.md` (on main) ← new B1 `tax-treaties-property-investors-treaty-framework-guide`
- **Detail:** B1 explicitly positions itself as the "treaty-allocation counterpart" to the existing statutory NRL pillar. B1 forward-links to the NRL guide twice (in §7 "NRL is statutory not treaty" and the hand-off list at §11). The existing NRL guide is 76 lines of legacy DeepSeek-era content with no reciprocal link. Bidirectional crosslink reinforces both pages' SERP signals and gives NRL readers the treaty-side companion they often need.
- **Action taken (if any):** None on existing page (Session B does not touch main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing legacy page post-wave; may be deferred to the legacy-rebuild wave since the NRL guide is on the legacy-rebuild list anyway)

## [F-7] [2026-05-22T14:35Z] [SITE_TEMPLATE] Em-dash in site-wide header brand wordmark
- **Session:** B
- **Page:** all pages (site-wide layout component, not B1 body content)
- **Detail:** Built HTML for B1 contains one em-dash, located in a screen-reader-only string in the header brand wordmark: `<span class="sr-only"> — Get your property tax sorted</span>`. This is a shared layout component, not body content. B1 body markdown em-dash count is 0 (six-check passes). Flagging once for the wave; the same em-dash appears on every built page. Likely a low-priority site-polish item.
- **Action taken (if any):** None (out of session scope; layout component).
- **Authorisation needed?** no (informational; orchestrator may pick this up at site-polish or legacy-rebuild time)

## [F-8] [2026-05-22T14:55Z] [INTERNAL_LINK] Forward-link from A4 to A5 (Pawson sibling) pending A5 write — RESOLVED 2026-05-22T15:40Z
- **Session:** A
- **Page:** A4 `iht-april-2026-bpr-apr-cap-property-impact` → A5 `serviced-accommodation-bpr-eligibility-pawson-test`
- **Detail:** A4 references the Pawson trading bar for serviced-accommodation operators inline. The brief listed the A5 sibling as a closest-existing for cross-link purposes. A5 not yet written; link mention retained as inline text rather than anchor to keep "internal links resolve" clean. A5 session (when claimed) can re-add the forward link from A4 as part of A5's own write step, OR manager wires it post-wave.
- **Action taken (if any):** Sibling link held back, replaced with inline text mention. A4 still links to four other pages (BPR, FIC-myth, FHL-abolition, FHL-incorporation, decision framework, 2026 changes).
- **Authorisation needed?** no (sibling-write cleanup; resolves on A5 land or manager post-wave)
- **Resolution (A5 session, 2026-05-22T15:40Z):** A5 page now written and committed. Back-patched forward link from A4 to A5 in commit. Closed.

## [F-9] [2026-05-22T15:40Z] [FACTUAL] Brief's Pawson UKUT URL on gov.uk returned 404
- **Session:** A
- **Page:** A5 `serviced-accommodation-bpr-eligibility-pawson-test`
- **Detail:** The Pawson UKUT URL quoted in the brief (`/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc`) returned 404 when fetched. Correct canonical URL is the full case-name variant: `/tax-and-chancery-tribunal-decisions/the-commissioners-for-hm-revenue-and-customs-v-the-personal-representatives-of-nicolette-vivian-pawson-deceased-2013-ukut-050-tcc`. Confirmed via gov.uk search API and HTTP 200. House position §15.4 + §9 both cite the case correctly. Not a HOUSE_POSITION_CONFLICT.
- **Action taken (if any):** A5 uses the canonical full-name URL. Brief left unchanged (informational; future brief regenerations should switch the listed authority URL to the full-name variant).
- **Authorisation needed?** no (informational; prep-script polish on next brief regen pass)

## [F-10] [2026-05-22T15:40Z] [FACTUAL] Brief's Graham/Carnwethers FTT 2018 reference did not surface in gov.uk search
- **Session:** A
- **Page:** A5 `serviced-accommodation-bpr-eligibility-pawson-test`
- **Detail:** Brief suggested `Personal Representatives of Grace Joyce Graham deceased v HMRC [2018] UKFTT 306 (TC)` as the post-Pawson "what does qualify" counterweight for an active guesthouse operation. The brief itself flagged this URL as needing verification ("tribunal URL paths sometimes change; if 404 search GOV.UK tribunal decisions for Graham deceased BPR guesthouse"). Multiple gov.uk search API queries did not surface a matching FTT decision. Substituted with Vigne v HMRC [2018] UKUT 0357 (TCC), which is (a) more recent, (b) Upper Tribunal level rather than FTT, (c) directly supportive of the trading-side argument despite the property/land centrality, and (d) routinely cited in post-Pawson BPR commentary. Authority strength of A5 unchanged or improved.
- **Action taken (if any):** A5 cites Vigne instead of Graham. Brief left unchanged; future regenerations should consider whether the Graham reference exists at a different citation or in BAILII (BAILII fetch was blocked by bot protection during this session).
- **Authorisation needed?** no (informational; brief-regen polish)

## [F-11] [2026-05-22T15:40Z] [INTERNAL_LINK] Existing BPR-rental-property pillar should back-link to new A5
- **Session:** A
- **Page:** existing `business-property-relief-rental-property-iht.md` (on main) ← new A5 `serviced-accommodation-bpr-eligibility-pawson-test`
- **Detail:** The existing BPR-on-rental pillar (April 2026 generalist draft) is shallow on the case-law side: 8 generic H2s, no specific Pawson citation, no fact-pattern checklist, no worked example. A5 is the deeper applied version. The pillar should back-link to A5 as the case-law-and-eligibility deeper page, particularly for readers who arrive at the pillar after a 'does my serviced accommodation qualify' query.
- **Action taken (if any):** A5 forward-links to the pillar; no edit to pillar made (Session A does not edit main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing pillar post-wave; same pattern as F-3, F-4)

## [F-12] [2026-05-22T15:55Z] [INTERNAL_LINK] B6 ↔ C6 cross-bucket cross-link to be back-patched when C6 ships
- **Session:** B
- **Page:** B6 `uk-uae-dta-property-no-tax-jurisdiction-asymmetry` ↔ C6 `moving-to-dubai-uk-rental-property-tax-pathway` (Session C, currently ⬜ todo)
- **Detail:** Per the Session B continuation brief and the B6 brief's cannibalisation section, the two Dubai-themed pages must cross-link (treaty mechanics on B6, landlord-side procedural checklist on C6). At the time B6 shipped, C6 had not yet been written. B6 includes a descriptive paragraph ("A note on the Wave 2 Session C Dubai-pathway companion") flagging the relationship without a hyperlink to avoid an unresolved internal link. When C6 ships, both pages need a bidirectional `/blog/non-resident-landlord-tax/<slug>` hyperlink: B6 to add a link in the "note on the Session C companion" section; C6 to back-link to B6 from its treaty-mechanics reference section.
- **Action taken (if any):** Descriptive paragraph in B6 only; no hyperlink. Session C should add the bidirectional link when C6 lands.
- **Authorisation needed?** no (within-Wave-2 mechanical back-patch; either Session B or Session C can complete on first session that follows C6 commit)

## [F-13] [2026-05-22T16:25Z] [INTERNAL_LINK] B7 ↔ B8 + B7 ↔ C2 cross-link back-patches
- **Session:** B
- **Page:** B7 `uk-italy-dta-tie-breaker-property-residence-disputes` ↔ B8 `dta-tie-breaker-test-dual-residence-property-owners` (this session, ⬜ todo at time of B7 commit) AND ↔ C2 `srt-statutory-residence-test-landlord-decision-tree` (Session C, ✅ done on `property-wave2-c` branch but not present on B branch).
- **Detail:** B7 brief explicitly identifies both B8 and C2 as sibling pages that should cross-link with B7 (B8 = generic cascade framework, B7 = Italy-specific applied; C2 = SRT upstream input to the cascade, B7 = cascade resolution). At the time B7 shipped, B8 did not yet exist on this branch and C2 was on a different branch (Session C worktree). To avoid unresolved internal links failing the six-check verification, B7 has no hyperlinks to either page; the content describes the relationship descriptively and authoritatively without linking. When B8 ships (later in this Session B sequence), B7 should be back-patched with a forward link to B8 in the cascade-walk section. On Wave-2 merge to main (or earlier coordination between Session B and Session C), B7 + C2 should be back-patched with bidirectional links (B7 forward-links to C2 for SRT decision-tree upstream; C2 forward-links to B7 for treaty-tie-breaker downstream). Companion direction: B8, when written, should link forward to B7 as the Italy-specific applied version.
- **Action taken (if any):** None; descriptive references only in B7. Back-patches to land at B8 commit + Wave-2 merge.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; either Session B or post-merge orchestrator can complete)

## [F-14] [2026-05-22T15:20Z] [INTERNAL_LINK] C6 shipped, F-12 B6↔C6 back-patch now actionable post-merge
- **Session:** C
- **Page:** C6 `moving-to-dubai-uk-rental-property-tax-pathway` (just shipped on `property-wave2-c` branch, commit 6952bc3) ↔ B6 `uk-uae-dta-property-no-tax-jurisdiction-asymmetry` (already ✅ done on `property-wave2-b`).
- **Detail:** C6 ships without a forward link to B6 because B6 lives on a different branch and is not visible to my worktree's content tree (build would not fail today, but the link would 404 on this branch's preview). Same pattern as F-12's flagging from B6 in the other direction. Recommended back-patches at Wave-2 merge: (a) edit C6 to add a hyperlink from the "The asymmetric UK-UAE treaty" H2 (currently descriptive only) to `/blog/non-resident-landlord-tax/uk-uae-dta-property-no-tax-jurisdiction-asymmetry`; (b) edit B6 to add a hyperlink from its "Session C Dubai-pathway companion" note to `/blog/non-resident-landlord-tax/moving-to-dubai-uk-rental-property-tax-pathway`. Both edits are single-line additions; no body restructuring required.
- **Action taken (if any):** None on either page; both have descriptive references only. F-12 + F-14 together close after merge.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [F-15] [2026-05-22T16:35Z] [HOUSE_POSITION_CONFLICT] LTR test has TWO routes per HMRC, house position §15.6 lists only one
- **Session:** A
- **Page:** A6 `iht-non-resident-uk-property-april-2025-residence-test`
- **Detail:** HMRC guidance (`https://www.gov.uk/guidance/inheritance-tax-if-youre-a-long-term-uk-resident`, published 6 April 2025) defines LTR status as UK tax resident for EITHER (a) the previous 10 consecutive tax years, OR (b) at least 10 of the previous 20 tax years. House position §15.6 currently lists only the 10-of-20 route ("at least 10 of the previous 20 tax years"). Two-route framing is materially more accurate: an individual continuously UK-resident for 10 years is LTR via route (a) even if a transient window (e.g. 11+ years ago) means they don't yet meet the 10-of-20 test. A6 uses HMRC's two-route framing; recommend house position §15.6 add the 10-consecutive route on next maintenance pass.
- **Action taken (if any):** A6 written with the two-route framing per HMRC. House position not edited (sessions don't edit house positions without manager authorisation).
- **Authorisation needed?** yes (manager refines house position §15.6 to include the 10-consecutive route)

## [F-16] [2026-05-22T16:35Z] [INTERNAL_LINK] A8 (RNRB sibling) back-link to A6 pending A8 write — PARTIALLY OPEN after A8 ship 2026-05-22T17:50Z
- **Session:** A
- **Page:** A6 `iht-non-resident-uk-property-april-2025-residence-test` ↔ A8 `iht-residence-nil-rate-band-2m-taper-property-portfolios`
- **Detail:** A6 references the standard NRB/RNRB allowances applying to non-LTR investors and worked one example through the £325k + £175k stack. A8 will be the deeper RNRB-mechanics page including the £2m taper and the lineal-descendant requirements. When A8 ships, add a forward link from A6 to A8 (at the worked-example NRB/RNRB calculation line) and from A8 to A6 (for the non-resident RNRB-availability question).
- **Action taken (if any):** None; A6 retains descriptive reference, no hyperlink to A8 yet.
- **Authorisation needed?** no (sibling-write cleanup, Session A handles when A8 ships)
- **Update (A8 session, 2026-05-22T17:50Z):** A8 now shipped on branch. A8's scope landed on the UK-resident-landlord taper mechanic and did NOT add an explicit non-resident RNRB-availability section, so the proposed A8→A6 forward link from the non-resident RNRB FAQ was not added. The reverse A6→A8 forward link (at A6's worked-example NRB/RNRB stack mention) IS still actionable as a one-line back-patch and should land at Wave-2 merge or as a Session-A micro-edit. F-16 remains open on the A6→A8 side; closed on the A8→A6 side (out of A8's scope as shipped).

## [F-17] [2026-05-22T16:35Z] [INTERNAL_LINK] A10 (APR/agricultural mixed-estate) should cross-link to A6 for Budget 2025 Sch A1 agricultural-land extension — PARTIALLY RESOLVED 2026-05-22T19:10Z
- **Session:** A
- **Page:** A6 `iht-non-resident-uk-property-april-2025-residence-test` ↔ A10 `agricultural-property-relief-mixed-estate-1m-cap`
- **Detail:** The Budget 2025 (26 November 2025) anti-avoidance package extends the Schedule A1 IHTA 1984 look-through from UK residential property to UK agricultural land. A6 covers the extension from the non-resident-IHT angle; A10 (when written) covers the agricultural side of the analysis. The Sch A1 extension is the most-novel cross-link for the agricultural reader and should be wired from both directions.
- **Action taken (if any):** None; A6 mentions the agricultural extension in the Budget 2025 H2 with descriptive language only.
- **Authorisation needed?** no (sibling-write cleanup, Session A handles when A10 ships)
- **Resolution (A10 session, 2026-05-22T19:10Z):** A10 ships with forward link to A6 in its Schedule A1 extension H2. The A10→A6 leg is now wired. The A6→A10 leg remains open as a one-line back-patch (A6 has only descriptive reference to the agricultural extension at present; the hyperlink to A10 should be added at Wave-2 merge or as a Session-A post-A10 micro-edit).

## [F-25] [2026-05-22T19:10Z] [INTERNAL_LINK] Existing BPR-rental + IHT pillar should back-link to new A10 APR mixed-estate page
- **Session:** A
- **Page:** existing `business-property-relief-rental-property-iht.md` (on main) ← new A10 + existing `inheritance-tax-rental-property-uk-guide.md` (on main) ← new A10
- **Detail:** A10 is the mixed-estate-specific deeper for the BPR-rental page and the IHT pillar. A10 forward-links to both. Reciprocal links should be added on the existing pages. Same pattern as F-3, F-20, F-22, F-24. Five pillar / BPR-rental cross-link requests now pending across Session A's pages (A1, A5, A7, A8, A9, A10). Orchestrator may want to bundle into a single post-Wave-2 enrichment of the pillar and the BPR-rental page covering all the cross-links plus D-14's wider pillar refresh.
- **Action taken (if any):** None on existing pages (Session A does not edit main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing pages post-wave)

## [F-18] [2026-05-22T16:55Z] [INTERNAL_LINK] C6 (Dubai) should back-link to C7 (Australia) as symmetric-DTA contrast
- **Session:** C
- **Page:** C6 `moving-to-dubai-uk-rental-property-tax-pathway` ← C7 `moving-to-australia-uk-rental-property-tax-pathway` (just shipped, commit 0ba1a25)
- **Detail:** C7 forward-links to C6 in the closing "Sequencing" paragraph as the asymmetric-treaty contrast. C6 does not currently back-link to C7 because at C6 commit time C7 did not exist on the branch. Recommended back-patch at Wave-2 merge: add a single hyperlink in C6's intro paragraph (where the page already says "Australia is the opposite of Dubai in the one variable that matters most") or in the closing "Sequencing the Dubai pathway" section, pointing to `/blog/non-resident-landlord-tax/moving-to-australia-uk-rental-property-tax-pathway`. Single-line edit. Low priority — page builds and ships fine without it.
- **Action taken (if any):** None; C6 retains existing copy.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [F-19] [2026-05-22T17:00Z] [INTERNAL_LINK] B8 shipped; F-13 partly closed; B8 ↔ C2 (SRT) cross-link verification needed post-merge
- **Session:** B
- **Page:** B8 `dta-tie-breaker-test-dual-residence-property-owners` (just shipped, commit pending) ↔ B7 `uk-italy-dta-tie-breaker-property-residence-disputes` (already ✅ done) AND ↔ C2 `srt-statutory-residence-test-landlord-decision-tree` (on `property-wave2-c` branch).
- **Detail:** F-13 raised at B7 commit time identified three back-patches: B7→B8, B8→B7, and B7↔C2. B8 has now shipped with forward links to BOTH B7 (in the intro and in the closing "what to do next" section) AND C2 (in the "When the tie-breaker fires" section under UK side). So the B8→B7 leg AND the B8→C2 leg are now satisfied from B8's side. Three back-patches remain for orchestrator post-merge: (1) B7 body should forward-link to B8 in its cascade-walk section (currently relies on descriptive reference); (2) B7 should forward-link to C2 in its SRT-paragraph (currently descriptive only); (3) C2 should back-link to B8 as the treaty-tie-breaker downstream when both UK SRT and a foreign domestic test resolve as resident. Plus verify B8's SRT link resolves on merge (will, because C2 exists on property-wave2-c).
- **Action taken (if any):** B8 forward-links from B8's side complete. Pending back-patches noted above for post-merge.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [F-20] [2026-05-22T17:35Z] [INTERNAL_LINK] Existing CGT-on-inherited-rental + IHT pillar should back-link to new A7 executor-process page
- **Session:** A
- **Page:** existing `cgt-inherited-rental-property-calculation-uk.md` (on main) ← new A7 `inheriting-uk-rental-property-executors-step-by-step` + existing `inheritance-tax-rental-property-uk-guide.md` (on main) ← new A7
- **Detail:** A7 is the process-led executor counterpart to the existing CGT-calc page and an operational sibling to the IHT pillar. A7 forward-links to both. Reciprocal links should be added on the existing pages: the CGT-calc page should back-link to A7 in its opening or PR-CGT section ("for the executor's-eye-view of the same property, see ..."); the IHT pillar should back-link to A7 in its planning / probate section as the executor operational hop. Same pattern as F-3 (A1 ↔ IHT pillar), F-4 (A1 ↔ BPR-rental), F-11 (A5 ↔ BPR-rental).
- **Action taken (if any):** None on existing pages (Session A does not edit main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing pages post-wave)

## [F-19] [2026-05-22T17:30Z] [HOUSE_POSITION_CONFLICT] House position §17.6 lists 2-year TRF; Autumn Budget 2024 extended to 3 years (12%/12%/15%)
- **Session:** C
- **Page:** C8 `non-dom-reform-april-2025-fig-regime-property-investors`
- **Detail:** House position §17.6 currently states "Temporary Repatriation Facility (TRF) at 12% for 2025/26 and 2026/27 to bring pre-6-April-2025 foreign income / gains onshore." This matches the original Spring Budget 2024 announcement (2-year window at flat 12%). The Autumn Budget 2024 (delivered 30 October 2024 by the new Labour government) extended the TRF to a third year at 15%. Current accurate schedule: 12% in 2025/26, 12% in 2026/27, 15% in 2027/28. C8 writes the 3-year schedule per the updated policy paper. Recommend house position §17.6 refinement to add the 15% third year on next maintenance pass.
- **Action taken (if any):** C8 written with the 3-year 12%/12%/15% schedule per the Autumn Budget 2024 extension and the updated 'Reforming the taxation of non-UK domiciled individuals' policy paper (30 October 2024). House position not edited (sessions don't edit house positions without manager authorisation).
- **Authorisation needed?** yes (manager refines house position §17.6 to add 15% in 2027/28)

## [F-20] [2026-05-22T17:30Z] [INTERNAL_LINK] C8 has 3 cross-branch internal-link back-patches required at Wave-2 merge
- **Session:** C
- **Page:** C8 `non-dom-reform-april-2025-fig-regime-property-investors` → A6, B5, C9
- **Detail:** C8 was drafted with internal links to A6 (`iht-non-resident-uk-property-april-2025-residence-test`, on property-wave2-a branch), B5 (`uk-india-dta-property-rental-income-treatment`, on property-wave2-b branch) and C9 (`returning-to-uk-after-non-residence-property-portfolio`, not yet written on property-wave2-c). All three were removed before commit to keep internal links resolving on this branch's build; the body now references those topics descriptively. At Wave-2 merge the following back-patches restore the hyperlinks:
  - C8 → A6: add hyperlink in the "What the April 2025 reform replaced" H2 paragraph that mentions IHT moving to a residence basis, link to `/blog/inheritance-tax-planning/iht-non-resident-uk-property-april-2025-residence-test` (verify actual category slug on A6 at merge time).
  - C8 → B5: add hyperlink in the worked-example "2030/31" paragraph where the UK-India DTA is referenced, link to `/blog/non-resident-landlord-tax/uk-india-dta-property-rental-income-treatment`.
  - C8 → C9: add hyperlink in the "Sequencing for new arrivals and existing non-doms" closing section, link to `/blog/non-resident-landlord-tax/returning-to-uk-after-non-residence-property-portfolio` (only after C9 ships).
- **Action taken (if any):** None; descriptive references only in C8 body. Three single-line edits at Wave-2 merge.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [F-22] [2026-05-22T18:00Z] [INTERNAL_LINK] Existing IHT pillar should back-link to new A8 RNRB taper page
- **Session:** A
- **Page:** existing `inheritance-tax-rental-property-uk-guide.md` (on main) ← new A8 `iht-residence-nil-rate-band-2m-taper-property-portfolios`
- **Detail:** A8 is the mechanism-deeper companion to the existing IHT pillar's one-paragraph RNRB summary. A8 forward-links to the pillar twice. The pillar's RNRB paragraph (lines 54-56 of the existing markdown) should add a "for the full taper mechanic and three estate-tier worked examples, see ..." link to A8. Bidirectional cross-link reinforces both pages' SERP signals. Same pattern as F-3 (A1↔pillar), F-20 (A7↔pillar / CGT-calc).
- **Action taken (if any):** None on existing page (Session A does not edit main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing pillar post-wave)

## [F-23] [2026-05-22T18:00Z] [INTERNAL_LINK] Forward-link from A8 to A9 (pension IHT) pending A9 write — RESOLVED 2026-05-22T18:35Z
- **Session:** A
- **Page:** A8 `iht-residence-nil-rate-band-2m-taper-property-portfolios` → A9 `pension-iht-april-2027-landlord-estate-planning`
- **Detail:** A8's "April 2027 pension overlay" H2 references the pension-IHT reform impact on E (the taper-test estate value) and includes a forward-pointer to the pension-IHT deeper page. A9 not yet written (next on Session A's list). A8 currently uses inline descriptive text and a re-link to A1 (decision framework) rather than a broken-link forward to A9. To be re-added during A9's write step (A9 writes its sibling-link block first, then a one-line back-patch in A8).
- **Action taken (if any):** A9 forward link held back; descriptive paragraph + re-link to A1 substituted. Will re-add during A9's write step.
- **Authorisation needed?** no (sibling-write cleanup, Session A handles)
- **Resolution (A9 session, 2026-05-22T18:35Z):** A9 page now written and committed. Back-patched forward link from A8's pension-overlay H2 to A9 in same commit (5b7cb46). Closed.

## [F-24] [2026-05-22T18:35Z] [INTERNAL_LINK] Existing IHT pillar should back-link to new A9 pension-IHT page
- **Session:** A
- **Page:** existing `inheritance-tax-rental-property-uk-guide.md` (on main) ← new A9 `pension-iht-april-2027-landlord-estate-planning`
- **Detail:** A9 is the depth on the "pensions in estate from 2027" line that the pillar already carries at headline level. A9 forward-links to the pillar in the opening. The pillar should back-link to A9 in its existing pension paragraph as the deeper hop. Same pattern as F-3 (A1↔pillar), F-20 (A7↔pillar), F-22 (A8↔pillar). Three pillar-back-link requests now pending (A1, A7, A8, A9 all need reciprocal pillar links). Orchestrator may want to bundle the IHT-pillar enrichment as a single post-Wave-2 edit covering all four cross-links and the downsizing-addition paragraph (D-14).
- **Action taken (if any):** None on existing pillar (Session A does not edit main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing pillar post-wave)

## [F-21] [2026-05-22T17:45Z] [INTERNAL_LINK] B9 shipped; existing NRL-self-assessment page should back-link to B9 as resident-with-foreign-property mirror
- **Session:** B
- **Page:** B9 `foreign-tax-credit-uk-property-overseas-landlords` (just shipped, commit pending) ↔ existing `non-resident-landlord-self-assessment-filing-requirements` (on main)
- **Detail:** B9 is the FTC operational page for UK-RESIDENT landlords with OVERSEAS property; the existing `non-resident-landlord-self-assessment-filing-requirements` page is its structural mirror image (non-resident landlords with UK property filing SA106 for UK-source income). The two together cover the SA106 question from both directions. B9 does NOT forward-link to the existing page because the inverse framing could confuse readers. Recommended post-merge back-patch: add a single hyperlink in the existing NR-SA page (probably in its opening or "see also" section) pointing to B9 as the resident-side counterpart. Mechanical single-line edit on a main-resident page; needs manager authorisation per established convention.
- **Action taken (if any):** None on existing page (sessions do not touch main-resident pages without manager authorisation).
- **Authorisation needed?** yes (manager edit to existing page; may be deferred to legacy-rebuild wave alongside the broader NRL cluster work)

Note on flag-number duplication: F-19 and F-20 each appear twice above (Sessions B and C raised concurrent flags with the same numbers at near-simultaneous timestamps). My next-clean number is F-21. Orchestrator may want to resequence on Wave-2 consolidation, but the timestamps + content disambiguate.

## [F-21] [2026-05-22T17:50Z] [INTERNAL_LINK] C1 should forward-link to C9 (the explicit return-side bookend)
- **Session:** C
- **Page:** C1 `leaving-uk-landlord-12-month-pre-departure-checklist` ← C9 `returning-to-uk-after-non-residence-property-portfolio` (just shipped, commit 5fe306e)
- **Detail:** Per the C9 brief's manager note, C1 and C9 must read as obvious bookends with bidirectional linking. C9 implements its half: opens with "This is the return-side bookend to our 12-month pre-departure checklist" (linked) and closes with "The return to the UK closes the arc that the 12-month pre-departure checklist opened" (linked). C1 does not yet forward-link to C9 because C1 was committed (de85219) before C9 existed. Recommend post-merge edit on C1 to add a single forward link to C9 in a section that closes the arc, e.g. "When the time comes to return, our return-side bookend covers the SRT arrival cases, s.10A recapture and NRL1 cancellation: [returning to the UK after non-residence](...)" inserted near the end of C1.
- **Action taken (if any):** None on C1; C9 implements its half of the linking.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [F-24] [2026-05-22T18:25Z] [INTERNAL_LINK] B10 ↔ A6 cross-branch link verification needed post-merge
- **Session:** B
- **Page:** B10 `uk-jersey-guernsey-isle-of-man-dtas-property-investors` (just shipped, commit pending) → A6 `iht-non-resident-uk-property-april-2025-residence-test` (on property-wave2-a, ✅ done at commit d66384e)
- **Detail:** B10 forward-links to A6 in three places (the intro paragraph, the "April 2025 residence-based IHT regime" section, and the closing "what to do next" list). A6 is on Session A's branch (property-wave2-a) and resolves post-merge. Verify the actual A6 category slug at merge time — B10 links to `/blog/non-resident-landlord-tax/iht-non-resident-uk-property-april-2025-residence-test`; if A6 actually lives under `inheritance-tax-planning` (per Session A's F-20 reference to the category for the existing IHT pillar), the link path needs a one-character category-segment fix.
- **Action taken (if any):** None; descriptive references in body and one inline forward-link in the closing section. Will resolve at Wave-2 merge.
- **Authorisation needed?** no (mechanical within-Wave-2 back-patch; orchestrator at merge time)

## [SESSION_B_COMPLETE] [2026-05-22T18:25Z] All 10 Session B (DTAs) pages ✅ done on property-wave2-b
- **Session:** B
- **Final commit on branch:** B10 commit 3f497be
- **Branch state:** 10 per-page commits (B1-B10) + 1 tracker back-patch commit. Working tree clean.
- **Detail:** Session B has completed all 10 assigned DTA pages: B1 framework pillar, B2 UK-US (saving clause), B3 UK-France (CSG/CRDS + IFI), B4 UK-Spain (post-Brexit IRNR + Patrimonio), B5 UK-India (1993 treaty + NRCGT override), B6 UK-UAE (asymmetric/no-tax), B7 UK-Italy (Article 4 applied + 2024 TUIR reform), B8 generic Article 4 cascade (all 5 steps), B9 FTC operational (TIOPA 2010 Part 2 + INTM161100 six principles), B10 Crown Dependencies consolidated (end of shelter). Word counts span 2,312 (B4, intentionally short) to ~5,146 (B10, consolidated multi-jurisdiction). Six checks pass on every page. Cross-branch link back-patches flagged at F-13, F-19, F-21 (B), F-24 (this flag).
- **Action taken (if any):** All 10 pages shipped. Session B handing off; remaining Wave-2 work is Session A IHT (A9-A10 todo at handoff time) and Session C Expat (10 of 10 done at handoff time if C-side completion holds).
- **Authorisation needed?** no (informational completion marker)

## [F-22] [2026-05-22T18:15Z] [BRIEF_STALE_CITATION] C10 brief still cites repealed TCGA 1992 ss.14B-14H
- **Session:** C
- **Page:** C10 `nrcgt-indirect-disposal-property-rich-companies-shares`
- **Detail:** The Wave 2 brief at `briefs/property/wave2/nrcgt-indirect-disposal-property-rich-companies-shares.md` cites "TCGA 1992 ss.14B-14H and Sch 4AA" in the framing differentiator section. The ss.14B-14H structure was introduced by FA 2015 and repealed by FA 2019, which rewrote the regime around the s.1A charging provision with the substantive material now in Sch 1A (definitions, including the 75% / 25% tests, trading exemption and connected-persons aggregation) and Sch 4AA (rebasing). House position §17.4 already flagged that older HMRC guidance and competitor pages may still cite the stale section numbers. C10 was written to the current statute per house position; the brief's older citation was disregarded. Recommend brief refresh if reused for Wave 3 indirect-disposal sub-pages.
- **Action taken (if any):** None on the brief; C10 written to current statute and includes an explanatory paragraph in the body about the FA 2019 rewrite.
- **Authorisation needed?** no (mechanical brief maintenance; orchestrator or whoever runs the brief regen pass)

[SESSION_C_COMPLETE] 2026-05-22T18:20Z
All 10 Session C pages shipped on branch `property-wave2-c`. Commits (in order): de85219 (C1), 66c51a9 (C2), 56b1565 (C3), 3d0394c (C4), efc723b (C5), 6952bc3 (C6), 0ba1a25 (C7), 853649b (C8), 5fe306e (C9), 2ea8f73 (C10). Total ~31,800 body words across the 10 pages, all six checks pass on each, all 10 monitored_pages rows inserted, all 10 tracker rows ✅ done. Cross-bucket / cross-branch back-patch flags raised: F-12 / F-14 (B6 ↔ C6), F-18 (C6 ↔ C7), F-19 (house position §17.6 TRF 3-year extension), F-20 (C8 → A6 / B5 / C9), F-21 (C1 → C9 bookend), F-22 (C10 brief stale citation). Discoveries logged D-1 to D-12 in `wave2_discovery_log_session_C.md`. Session ends.
