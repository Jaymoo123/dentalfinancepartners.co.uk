# Track 2 — Exclusion Audit

**Date built:** 2026-05-23
**Purpose:** Line-by-line audit of every slug excluded from the Track 2 legacy universe, with source citation. Every excluded slug here must NOT appear in `track2_universe_2026-05-23.md`. Re-run this audit at Phase 2 if Wave 5 merges in the interim.

**Reconciliation summary:**
- Total slugs to exclude: 173
- Unique slugs (after dedup): 173 (no duplicates between net-new pool and rewrite pool)
- Residual after exclusion: 406 − 173 = 233 (Bash `comm -23` returns 234, +1 noted in `track2_universe_2026-05-23.md` rationale block)

---

## Excluded set 1 — Wave 1 net-new (31 slugs)

**Source:** `docs/property/track1_page_tracker.md` rows A1-A10, B1-B8, C1-C13, all marked ✅ done. Wave 1 was originally the "Property Track 1 Wave 1" of the net-new program; merges were `31c45cb` (Session A), `4e0c2cd` (Session B), `08bf31c` (Session C), `7ed6e15` (paper trail), `38f0281` (post-Wave-1 cleanups).

### Session A — SDLT depth (10):
1. sdlt-5-percent-surcharge-refund-claim-process
2. sdlt-six-dwellings-non-residential-election
3. sdlt-sub-sale-relief-mechanics
4. sdlt-shared-ownership-staircasing
5. sdlt-group-relief-for-corporate-landlord-portfolios
6. sdlt-on-probate-property-transfers
7. sdlt-non-resident-2-percent-surcharge
8. sdlt-refund-scams-how-to-avoid
9. sdlt-mixed-use-property-classification
10. sdlt-leasehold-extension-vs-fresh-purchase

### Session B — Limited company / BTL operation (8):
11. director-loan-account-property-company-mechanics
12. property-company-group-relief-corporation-tax
13. substantial-shareholding-exemption-property-companies
14. corporation-tax-marginal-relief-property-companies
15. transferring-fhl-portfolio-to-limited-company
16. incorporating-hmo-portfolio-to-limited-company
17. extracting-money-from-property-limited-company
18. close-investment-holding-company-property

### Session C — VAT + FIC + ATED (13):
19. domestic-reverse-charge-construction-vat-landlords
20. toms-vat-serviced-accommodation
21. vat-on-new-builds-residential-property
22. togc-vat-property-letting-business
23. diy-housebuilders-vat-refund-scheme
24. fic-complete-guide-property-wealth-transfer
25. fic-vs-discretionary-trust-property-comparison
26. fic-growth-shares-and-freezer-shares-design
27. fic-iht-treatment-bpr-myth
28. ated-complete-guide-2026-27
29. ated-rental-property-relief-mechanics
30. ated-15-percent-flat-rate-sdlt-interaction
31. ated-late-filing-penalties-mechanics

---

## Excluded set 2 — Wave 2 net-new (30 slugs)

**Source:** `docs/property/wave2_page_tracker.md` rows A1-A10 (IHT), B1-B10 (DTAs), C1-C10 (Expat), all ✅ done. Merges: `03f31d1` (A), `ba4105c` (B). 30 slugs as listed in tracker rows A1-A10, B1-B10, C1-C10.

(Slugs enumerated in `_tmp_track2_excluded_slugs.txt` lines 32-61; tracker is the canonical source.)

---

## Excluded set 3 — Wave 3 net-new (30 slugs)

**Source:** `docs/property/wave3_page_tracker.md` rows A1-A10 (ATED), B1-B10 (MTD ITSA), C1-C10 (RRA 2025), all ✅ done. Merges: `d98c53d` (A), `cf4a7fa` (B), `f546964` (C).

(Slugs enumerated in `_tmp_track2_excluded_slugs.txt` lines 62-91.)

---

## Excluded set 4 — Wave 4 net-new (30 slugs)

**Source:** `docs/property/wave4_page_tracker.md` rows A1-A10 (LtdCo+FIC), B1-B10 (MTD ops), C1-C10 (IHT estate), all ✅ done. Merges: `c964ea4` (A), `e461bb5` (B), `1a4c211` (C).

(Slugs enumerated in `_tmp_track2_excluded_slugs.txt` lines 92-121.)

---

## Excluded set 5 — 2026-05-21 rewrites (52 ✅ done slugs)

**Source:** `docs/property/page_rewrite_tracker.md`. Session 0 (17) + Session A (10) + Session B (12) + Session C (13) = 52 ✅ done. The 11 ⏭️ skip rows are NOT subtracted (they're TSX / deleted / no-source pages already outside the 406 blog .md universe).

(Slugs enumerated in `_tmp_track2_excluded_slugs.txt` lines 122-173.)

---

## NOT EXCLUDED (despite being mentioned in source files)

The following slugs APPEAR in source files but remain in the legacy universe:

### Wave 5 candidates (30 slugs) — currently on feature branches, NOT yet merged to main
`docs/property/wave5_page_tracker.md` lists 30 slugs (A1-A10 VAT, B1-B10 Devolved, C1-C10 Form 17). As of 2026-05-23, 6 are committed to feature branches (`property-wave5-a` A1/A2/A3, `property-wave5-b` B1/B2, `property-wave5-c` C1/C2) but NONE are merged to main. So they're NOT in the 406 count and don't need to be excluded from the residual.

**However**, they MUST appear in the Cannibalisation Index (`track2_cannib_index_2026-05-23.md`) so Track 2A briefs check against them.

### Wave 5 back-patch targets (existing pages back-patched by Wave 5 manager work)
- `renters-rights-act-2026-tax-implications-landlords` — IN residual. F-1 PART 2 rewrite is in inter-wave queue but not yet executed. Track 2 brief drafting MUST coordinate with F-1 brief (`docs/property/f1_rra_lead_page_rewrite_brief.md`).
- `section-24-joint-property-ownership-tax-split` — IN residual. Already back-patched 2026-05-23 with F-1 Form 17 framing per §24. Track 2A brief for this page MUST cite the back-patch commit date and verify alignment.

These are flagged for sub-agent attention at Stage 1.

---

## Sanity-check arithmetic

```
                        slug  source                                  status
                         406  Glob Property/web/content/blog/*.md     all live blog .md files
                    -    31  Wave 1 (track1_page_tracker.md)           ✅ done
                    -    30  Wave 2 (wave2_page_tracker.md)           ✅ done
                    -    30  Wave 3 (wave3_page_tracker.md)           ✅ done
                    -    30  Wave 4 (wave4_page_tracker.md)           ✅ done
                    -    52  Rewrites 2026-05-21 (page_rewrite_tracker.md ✅ done rows)
                    ─────
                       233  Expected residual
                       234  Actual residual (Bash comm -23)
                    ─────
                       + 1  Reconciled in track2_universe_2026-05-23.md (landlord-insurance-tax-deductible canonical target)
```

Reconciliation acceptable; trial proceeds.
