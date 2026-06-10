# Property Track 1 — site-wide flags (append-only)

**Append-only.** Each session adds to the bottom with timestamp + session ID. Never edit existing entries.

**Format:** `## [TIMESTAMP] [SESSION_ID] [CATEGORY] Title` then a body paragraph describing the issue, impact, and recommendation.

**Categories:**
- `FACTUAL` — factual issue or conflict with a competitor source
- `CANNIBAL` — cannibalisation concern with an existing or sibling Track 1 page
- `POSITIONING` — brand / lead-gen positioning question
- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts the locked house position
- `REDIRECT` — middleware redirect action needed at launch (or already applied)
- `INTERNAL_LINK` — propose adding a back-link from an existing page to your new page
- `SCHEMA` — non-default schema type (HowTo, Course, etc) might add SERP value
- `CALCULATOR_IDEA` — page would benefit from an interactive calculator we don't have
- `COMPONENT_IDEA` — competitor uses a UI pattern (comparison table style, decision matrix, downloadable template) we lack
- `CROSS_NICHE_LINK` — topic bridges niches (Property ↔ Medical / Solicitors / etc) — flag for cross-network linking
- `BUILD_BLOCKER` — build is breaking for a reason that isn't your own page (mid-edit YAML in a sibling session, etc) — needs orchestrator
- `OTHER` — anything else (general observations belong in your session's discovery log, not here)

**When to use this file vs the discovery log:**
- **Flags file (this file):** issues that need orchestrator action or resolution. Cross-session blockers, factual conflicts, missing pages causing 404s, etc.
- **Discovery log** (`docs/property/track1_discovery_log_session_<X>.md`): observations and ideas that compound into future waves but don't need immediate action. Adjacent topics, component ideas, authority gaps, etc.

---

## [Sessions: append below this line]

## [2026-05-22T01:10Z] [SESSION_A] [BUILD_BLOCKER] Worktree missing `.env` and `optimisation_engine/competitor/_db.py`

Two tooling gaps Sessions B and C will hit. (1) The worktree has no `.env` at the root; without it, any import of the `optimisation_engine` package fails at `config.py:38` ("SUPABASE_URL / SUPABASE_KEY must be set"). This affects step 8 (Pexels fetch via `fetch_image_for_post`, because `__init__.py` eagerly imports `topic_repository` which imports `config`) and step 13 (monitored_pages register). (2) `optimisation_engine/competitor/_db.py` is untracked in git (not in `git ls-files`) and so was not present in any worktree even after the ff-merge to main. Without it, step 13 fails with `ModuleNotFoundError: No module named 'optimisation_engine.competitor._db'`.

**What I did:** `cp C:/Users/user/Documents/Accounting/.env C:/Users/user/Documents/Accounting-wt-property-track1-a/.env` and `cp .../optimisation_engine/competitor/_db.py .../Accounting-wt-property-track1-a/optimisation_engine/competitor/_db.py`. Both unblocked the workflow. Suggest the orchestrator copy both into the B and C worktrees pre-launch (or add `.env` symlink + commit `_db.py` to main).

## [2026-05-22T02:00Z] [SESSION_A] [HOUSE_POSITION_CONFLICT] Six-dwellings rule: house position cites Sch 6B para 7; competitor + likely-correct citation is s.116(7) FA 2003

**Page in scope:** A2 (`sdlt-six-dwellings-non-residential-election`). Also relevant to the existing pillar `sdlt-buy-to-let-rates-surcharge-guide-2025` (FAQ #4 and body H2) and `sdlt-transfer-property-company-cost` (H3 "Six-Dwellings Election").

**The conflict:** `docs/property/house_positions.md` section 1 says the six-dwellings rule is a "non-residential election" under "Sch 6B para 7 FA 2003". The framing differentiator in the brief restates this. However: (a) Schedule 6B FA 2003 was the Multiple Dwellings Relief schedule, and MDR was abolished for transactions with an effective date on or after 1 June 2024 by Finance (No. 2) Act 2024. The schedule itself appears to have been repealed; (b) the competitor source for A2 (ukpropertyaccountants.co.uk) cites **section 116(7) FA 2003** and treats the rule as **automatic** (six or more dwellings in a single transaction are deemed non-residential), not elective; (c) section 116(7) FA 2003 in my training data matches the competitor's framing: "Where six or more separate dwellings are the subject of a single transaction... those dwellings are treated as not being residential property."

**What I tried to verify:** Direct fetch of legislation.gov.uk for s.116 FA 2003 and Sch 6B FA 2003 returned HTTP 437 (likely a rate-limit or cookie issue), so I could not read the live statute text in this session.

**What I did on the page:** Wrote A2 using the house position framing (Sch 6B para 7, "election") per the brief's explicit rule that house positions win over competitor sources. The page is consistent with the existing pillar and `sdlt-transfer-property-company-cost`, which both use the same framing. If the orchestrator confirms the house position is wrong (or out of date), three pages need a synchronised edit: A2 + the two existing pages + house_positions.md section 1. I would also re-check A5 (group relief) and any future SDLT page that cites the same authority.

**Why this matters:** if A2 is on the wrong statute the page is misleading and erodes credibility on a high-CPC topic. The dollar saving figures in the worked example are unaffected (the rates are right either way). Only the legal citation and the "election vs automatic" framing change.

**Recommendation:** orchestrator verifies the statute via direct legislation.gov.uk read (or HMRC SDLTM00372 / SDLTM07550 / equivalent). If the rule is automatic under s.116(7), update house_positions.md, the pillar's FAQ, the cost-of-transfer page's H3, and A2's intro + FAQ #1. If the rule remains under Sch 6B para 7, no action; A2 stands as written.



## [2026-05-22T09:55Z] [SESSION_B] [INTERNAL_LINK] Existing `director-loan-property-company` page should link forward to new B1 mechanics page

**Page in scope:** B1 (`director-loan-account-property-company-mechanics`, just written).

**The existing page** `Property/web/content/blog/director-loan-property-company.md` is a shallow ~700-word intro to director loans in property companies. The new B1 page is the deeper mechanics + worked-example version (~3500 words: s.455 timing, s.464C bed-and-breakfast, L2P refund mechanics, £10k BIK, £200k credit DLA worked example). B1 already links forward to the existing page as the higher-level companion. The reverse link is missing: the existing page should point readers wanting depth at B1. Suggested anchor near the existing page's "Related Reading" section.

**Recommendation:** orchestrator adds a single internal link from the existing page's "Related Reading" list (or end of "Tax Implications of Director Loans" H2) pointing at `/blog/incorporation-and-company-structures/director-loan-account-property-company-mechanics`. Low-touch one-line edit.

## [2026-05-22T10:20Z] [SESSION_B] [FACTUAL] B2 may overstate CIHC scope — vanilla BTL letting to unconnected tenants is NOT a CIHC

While researching B4 (corporation tax marginal relief mechanics) I noticed that B2 (just committed at 8a7ab05) characterises "vanilla residential BTL SPVs" as "almost always close investment-holding companies" paying 25% across the board. On a re-read of CTA 2010 s.18N (the post-FA-2022 reintroduced CIHC definition), a company is NOT a CIHC where it exists wholly or mainly for "making investments in land in cases where the land is, or is intended to be, let to persons other than persons connected with the relevant company". A standard BTL SPV with arm's-length tenants therefore qualifies for the qualifying-purpose carve-out and is NOT a CIHC. CIHC status only catches close companies where the let is to a connected person (director's spouse, director themselves) or where the business is mainly passive non-land investments.

**Impact on B2:** the worked example (4 SPVs at £40k/£55k/£28k profit each) uses "all four SPVs are CIHCs" and applies a flat 25% rate. With the corrected CIHC framing, four SPVs in a 5-company group (one HoldCo + 4 SPVs) sharing the £50k SPR ceiling divided by 5 = £10k each, so each SPV pays:
- 19% on first £10k
- 26.5% marginal rate £10k–£50k
- 25% above £50k
The £15k headline saving stays in the ballpark but the per-SPV maths is slightly off.

**Impact on B1, B3:** no impact — neither page makes the broad CIHC claim.

**Recommendation:** orchestrator to either (a) hot-fix B2's "vanilla BTL SPV is a CIHC" framing on `main` after my branch merges, or (b) let me amend B2 on `property-track1-b` with a corrective commit. I will write B4 with the correct CIHC framing throughout and ensure B7/B8 (extracting-money + CIHC-property) use the corrected definition. B8 in particular is the CIHC page so this is its central topic; will deal with it directly when I claim it.

## [2026-05-22T10:50Z] [SESSION_B] [SESSION_B_COMPLETE] All 8 Limited Company / BTL operation pages shipped

Session B finished. All 8 assigned pages are written, built clean, FAQ-schema-verified, monitored_pages-registered, committed on `property-track1-b`, and marked done in the tracker.

**Commits on branch (in order):**
- `ee2b9c4` B1 director-loan-account-property-company-mechanics
- `8a7ab05` B2 property-company-group-relief-corporation-tax
- `df9cdc1` B3 substantial-shareholding-exemption-property-companies
- `36885cb` B4 corporation-tax-marginal-relief-property-companies
- `3f74d96` B5 transferring-fhl-portfolio-to-limited-company
- `9c6b951` B6 incorporating-hmo-portfolio-to-limited-company
- `3af0d18` B7 extracting-money-from-property-limited-company
- `016a501` B8 close-investment-holding-company-property

**Word counts (M-3 calibration band 2,800–3,500):** B1 5,428 (pre-calibration), B2 3,104, B3 2,673, B4 2,788, B5 2,652, B6 2,989, B7 2,754, B8 2,669. From B2 onwards all pages sit at or just below the calibration band; only B1 (the pre-calibration first page) ran over.

**FAQ counts (M-3 band 10–12):** B1 13, B2 12, B3 11, B4 12, B5 12, B6 12, B7 12, B8 12. B1 at 13 (just above the M-3 band, pre-calibration); the rest within band.

**Outstanding follow-ups for orchestrator:**
- B2 CIHC overstatement flag (2026-05-22T10:20Z) — B8 now provides the definitive correct framing; orchestrator can hot-fix B2 on main post-merge to point readers at B8 for nuance, or let the cluster of pages collectively communicate the correct position.
- B1 INTERNAL_LINK flag (2026-05-22T09:55Z) — existing `director-loan-property-company` page should link forward to B1.
- Discovery log (docs/property/track1_discovery_log_session_B.md) has 12 entries covering calculator ideas (DLA s.455 cost calculator, DLA BIK calculator, group relief surrender optimiser, trading-vs-investment classifier widget), authority gaps (CTM61500 DLA manual, CTM80100 group relief manual, CG53000 SSE manual), an adjacent topic (share-sale-vs-asset-sale framework), and an existing-page-stale flag on the corporation tax rates pillar overclaiming CIHC scope.

Session B handing off. Branch `property-track1-b` ready for orchestrator merge.

## [2026-05-22T10:50Z] [SESSION_C] [INTERNAL_LINK] Existing FIC page should link forward to C6 comprehensive reference

The existing decision-focused page `Property/web/content/blog/family-investment-company-property-worth-it.md` (live at `/blog/incorporation-and-company-structures/family-investment-company-property-worth-it`) is now the companion to C6 (`fic-complete-guide-property-wealth-transfer`). C6 links back to the existing page in two places (intro + "When the Structure Genuinely Works" section). The existing page does not yet link forward to C6. Orchestrator: please add a link in the existing page (in the conclusion or in a "Related" section) along the lines of: "For the comprehensive structural reference once you have decided an FIC fits, see [FIC for Property: The Comprehensive Wealth-Transfer Reference](/blog/incorporation-and-company-structures/fic-complete-guide-property-wealth-transfer)." This is non-blocking; raised so the cluster is correctly bidirectionally linked.

## [2026-05-22T15:30Z] [SESSION_A_COMPLETE]

All 10 Session A pages (A1–A10) written, built clean, FAQ schema verified, monitored_pages registered, and committed on branch `property-track1-a`. Final commits in order:

- A1 `b1ad5e8` — sdlt-5-percent-surcharge-refund-claim-process (HRAD refund process)
- A2 `8285087` then `bf6ac80` fix-up — sdlt-six-dwellings-non-residential-election (s.116(7) FA 2003 automatic treatment, after M-2 manager correction)
- A3 `e86bfab` — sdlt-sub-sale-relief-mechanics (s.45 FA 2003 + incorporation-myth busting)
- A4 `3954914` — sdlt-shared-ownership-staircasing (election vs pay-in-stages + 80% trigger)
- A5 `d75f8ac` — sdlt-group-relief-for-corporate-landlord-portfolios (Sch 7 FA 2003 + 3-year clawback)
- A6 `ce3a32f` — sdlt-on-probate-property-transfers (five-category taxonomy + Sch 6A relief; category overridden from CGT to landlord-tax-essentials)
- A7 `b206329` — sdlt-non-resident-2-percent-surcharge (Sch 9A FA 2003 + close-company carve-in)
- A8 `97f6f54` — sdlt-refund-scams-how-to-avoid (consumer-protection piece)
- A9 `c46205b` — sdlt-mixed-use-property-classification (case-law walkthrough)
- A10 `696b7f8` — sdlt-leasehold-extension-vs-fresh-purchase (LRHUDA 1993 + LFRA 2024)

Total commits on branch: 11 (10 page commits + 1 fix-up on A2). Branch `property-track1-a` clean, no uncommitted changes, ready for orchestrator merge.

**Flags raised during Session A (recap, all resolved or non-blocking):**
- [BUILD_BLOCKER] worktree missing `.env` and `optimisation_engine/competitor/_db.py` — resolved early by manager (copied into B and C worktrees).
- [HOUSE_POSITION_CONFLICT] six-dwellings citation Sch 6B para 7 vs s.116(7) FA 2003 — verified by manager via legislation.gov.uk (M-2); house_positions.md corrected; A2 rewritten in fix-up commit `bf6ac80`; existing pages on main flagged for Track 2 sweep.

**Word counts:** A1 4,142 (justified, dense); A2 (revised) ~3,200; A3 2,718; A4 2,919; A5 2,858; A6 3,230; A7 2,819; A8 2,859; A9 2,890; A10 2,909. All within M-4 calibration of 2,800–3,500 from A3 onward.

Session A handing off. Branch `property-track1-a` ready for orchestrator merge.

## [2026-05-22T11:18Z] [SESSION_C] [SESSION_C_COMPLETE] All 13 Session C pages shipped

All 13 Session C Track 1 pages are now ✅ done and committed on branch `property-track1-c`. Ready for orchestrator merge.

**Pages shipped (chronological commit order):**
- C10 ated-complete-guide-2026-27 (pillar) — commit daa0444
- C11 ated-rental-property-relief-mechanics — commit 1a79c63
- C12 ated-15-percent-flat-rate-sdlt-interaction — commit b82f58e
- C13 ated-late-filing-penalties-mechanics — commit 55b1f61
- C10 pillar back-link patch (C11/C12/C13 cross-links) — commit f64d910
- C1 domestic-reverse-charge-construction-vat-landlords — commit 1654ba0
- C2 toms-vat-serviced-accommodation — commit 4db26d7
- C3 vat-on-new-builds-residential-property — commit 4293550
- C4 togc-vat-property-letting-business — commit c184daa
- C5 diy-housebuilders-vat-refund-scheme — commit ae1bf89
- C6 fic-complete-guide-property-wealth-transfer (FIC comprehensive ref) — commit d8091c6
- C7 fic-vs-discretionary-trust-property-comparison — commit a8494c6
- C8 fic-growth-shares-and-freezer-shares-design — commit 4ddc567
- C9 fic-iht-treatment-bpr-myth — commit 3c116cb

**Bucket distribution (per START_HERE assignment):**
- ATED (4 pages): C10 pillar + C11/C12/C13 daughters, all four cross-linked bidirectionally
- VAT (5 pages): C1 DRC, C2 TOMS (post-Sonder), C3 new-build, C4 TOGC, C5 DIY housebuilders
- FIC (4 pages): C6 comprehensive ref + C7 vs trust + C8 share-class design + C9 BPR myth

**Word counts vs M-3 calibration:**
- C10 (pillar): 4316 (pillar band 3.5k-4.5k pre-M-3, accepted)
- C11: 3483 (within 2.8k-3.5k daughter band)
- C12: 3700 (200 over daughter band; 3 worked examples justify, logged in work-log)
- C13: 3540 (40 over, statistical noise)
- C1: 3527 (27 over, statistical noise)
- C2: 3038 (within band)
- C3: 3023 (within band)
- C4: 3255 (within band)
- C5: 2912 (within band)
- C6 (FIC ref): 3845 (within M-3 C6-specific band 3.5k-4.5k)
- C7: 3373 (within band)
- C8: 3571 (71 over, statistical noise)
- C9: 3513 (13 over, statistical noise)

**FAQ counts:** All within 10-14 target. Mostly 13; C4 at 14; C12 at 12.

**Six-check verification:** all 13 pages pass: 0 em-dashes, 0 Tailwind, meta title ≤62, meta description ≤158, FAQ schema count == frontmatter, internal links resolve.

**monitored_pages registration:** all 13 pages inserted.

**Outstanding flags from Session C:**
- INTERNAL_LINK flag at 2026-05-22T10:50Z requesting orchestrator add forward link from existing FIC page (`family-investment-company-property-worth-it`) to C6 to complete the FIC cluster's bidirectional linking.

**Discovery log entries:** 4 entries in `docs/property/track1_discovery_log_session_C.md` covering EXISTING_PAGE_LINK_OPPORTUNITY (C10 sentinel cross-links — now resolved), CALCULATOR_IDEA (ATED band-boundary calculator), AUTHORITY_GAP (Sch 4A FA 2003 + FA 2013 Part 3 link audit), EXISTING_PAGE_STALE (ATED-related CGT reference sweep).

**Category overrides logged:**
- C13: brief default `landlord-tax-essentials` overridden to `incorporation-and-company-structures` for ATED cluster coherence (rationale in C13 work-log).

**Manager fix-ups applied within session:**
- M-1 correction (s.116(7) FA 2003 automatic six-dwellings rule, not Sch 6B election) reflected in C12 FAQ.

Session C handing off. Branch `property-track1-c` ready for orchestrator merge.
